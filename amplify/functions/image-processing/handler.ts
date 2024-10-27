import type { Handler } from 'aws-lambda';
import sharp from 'sharp';
import { EventBridgeEvent } from "aws-lambda";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { EventType, ImageUploadedEventDetail } from '../shared/eventbridge.events';
import { Logger } from '@aws-lambda-powertools/logger';
import { configureAmplify } from '../shared/function.helper';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../data/resource';
import { getFile } from '../../graphql/queries';
import { updateFile } from '../../graphql/mutations';

const logger = new Logger({ serviceName: 'ImageProcessingFunction' });
const s3Client = new S3Client();

const THUMBNAIL_HEIGHT = 300
const THUMBNAIL_WIDTH = 300

// Configure Amplify.
configureAmplify();

// Configure appsync API client
const client = generateClient<Schema>({
  authMode: "iam",
});


async function createAndStoreThumbnail(bucket: string, fileId: string, objectKey: string, userId: string): Promise<string> {
  try {

    logger.info('Downloading image')

    // Create the GetObjectCommand
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    });

    // Send the command to S3
    const response = await s3Client.send(command);

    // Ensure we have a readable stream
    if (!response.Body) {
      throw new Error('Empty response body');
    }

    // Convert the readable stream to a buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Process the image with Sharp
    logger.info('Creating thumbnail')
    const thumbnailBuffer = await sharp(buffer)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: 'inside'
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Upload the thumbnail to S3
    const fileExtension = objectKey.split('.').pop();
    const thumbnailS3Key = `drive/${userId}/thumb/${fileId}.${fileExtension}`.toLowerCase();

    logger.info('Uploading thumbnail to S3')
    const putCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: thumbnailS3Key,
      Body: thumbnailBuffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(putCommand);
    logger.info('Thumbnail created successfully');

    return thumbnailS3Key;

  } catch (error) {
    logger.error('Error downloading or processing image:', error as Error);
    throw error;
  }
}

async function updateDatabase(fileId: string, thumbnailKey: string) {
  try {
    const { data: getFileResponse } = await client.graphql({
      query: getFile,
      variables: {
        id: fileId,
      },
      // authMode: 'iam',
    });

    if (!getFileResponse.getFile) throw new Error("File not found")

    const file = getFileResponse.getFile;

    const { data: updateFileResponse, errors: updatedFileErrors } = await client.graphql({
      query: updateFile,
      variables: {
        input: {
          // fileName: file.fileName,
          // folderId: file.folderId,
          id: file.id,
          // s3Key: file.s3Key,
          // size: file.size,
          thumbnailS3Key: thumbnailKey,
          // userId: file.userId
        }
      },
      // authMode: 'iam',
    });

    if (!updateFileResponse.updateFile) throw new Error("Update file record operation failed")

    logger.info('Database updated successfully');
  } catch (e) {
    logger.error('Error updating database:', e as Error);
    throw e;
  }
}


export const handler: Handler = async (event: EventBridgeEvent<EventType.ImageUploadedEvent, ImageUploadedEventDetail>, context) => {

  // Add lambda context and events in logs
  // Reference - https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/#capturing-lambda-context-info
  logger.addContext(context);
  logger.logEventIfEnabled(event);

  if (!process.env.BUCKET_NAME)
    throw new Error("BUCKET_NAME environment variable is not set");


  if (event['detail-type'] === EventType.ImageUploadedEvent) {

    const objectKey = event.detail.objectKey;
    const userId = event.detail.userId;
    const fileId = event.detail.fileId;

    // 1. Create a thumbnail of the image using Sharp
    const thumbnailKey = await createAndStoreThumbnail(process.env.BUCKET_NAME, fileId, objectKey, userId)

    // 2. Update the database
    await updateDatabase(fileId, thumbnailKey);

    logger.info("Image processed successfully");
  }
}