import type { Handler } from 'aws-lambda';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { EventBridgeEvent } from "aws-lambda";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { EventType, VideoUploadedEventDetail } from '../shared/eventbridge.events';
import { Logger } from '@aws-lambda-powertools/logger';
import { configureAmplify } from '../shared/function.helper';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../data/resource';
import { getFile } from '../../graphql/queries';
import { updateFile } from '../../graphql/mutations';
import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path'

const logger = new Logger({ serviceName: 'VideoProcessingFunction' });
const s3Client = new S3Client();

// Set the path to the FFmpeg binary
ffmpeg.setFfmpegPath('/opt/bin/ffmpeg');

// Configure Amplify.
configureAmplify();

// Configure appsync API client
const client = generateClient<Schema>({
  authMode: "iam",
});

async function downloadFileFromPresignedUrl(presignedUrl: string, fileName: string): Promise<string | null> {
  try {
    // Send a GET request to the presigned URL
    const response = await axios.get(presignedUrl, {
      responseType: 'arraybuffer'
    });

    // Construct the full path for the file in /tmp
    const tmpFilePath = path.join('/tmp', fileName);

    // Write the content to a file in /tmp
    fs.writeFileSync(tmpFilePath, response.data);

    logger.info(`File downloaded successfully to ${tmpFilePath}`);
    return tmpFilePath;
  } catch (error) {
    logger.error('Error downloading file:', error as Error);
    return null;
  }
}

async function createAndStoreThumbnail(bucket: string, fileId: string, objectKey: string, userId: string): Promise<string> {
  try {

    logger.info('Generating presigned URL of the video')

    // Create the GetObjectCommand
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    });

    // Generate presigned URL
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    // Download the file in /tmp directory
    logger.info('Generating thumbnail using ffmpeg')

    const fileName = objectKey.split('/').pop();
    if (fileName)
      await downloadFileFromPresignedUrl(presignedUrl, fileName)
    else
      throw new Error("Invalid file name")

    // Create path for temporary screenshot
    const videoFilePath = path.join('/tmp', fileName);
    const screenshotFilePath = path.join('/tmp', `${fileId}.jpeg`);
    const thumbnailS3Key = `drive/${userId}/thumb/${fileId}.jpeg`.toLowerCase();

    // Use ffmpeg to generate screenshot
    logger.info('Generating thumbnail using ffmpeg')

    // Create and execute the FFmpeg command
    //
    // => scale=w=300:h=300:force_original_aspect_ratio=decrease: 
    // => Scales the screenshot to fit within a 300x300 box while maintaining the aspect ratio. It will only scale down if necessary.
    // 
    // => pad=300:300:(ow-iw)/2:(oh-ih)/2: 
    // => Pads the scaled image to fit exactly within 300x300. 
    // => The padding is centered, creating an "object-fit" effect similar to CSS.
    await new Promise((resolve, reject) => {
      ffmpeg(videoFilePath)
        .inputOptions(['-ss 00:00:01'])
        .outputOptions([
          '-vframes 1',
          '-vf scale=w=300:h=300:force_original_aspect_ratio=decrease,'
          + 'pad=300:300:(ow-iw)/2:(oh-ih)/2'
        ])
        .output(screenshotFilePath)
        .on('end', () => {
          console.log('Screenshot taken successfully');
          resolve(screenshotFilePath);
        })
        .on('error', (err) => {
          console.error('Error taking screenshot:', err);
          reject(err);
        })
        .run();
    });

    // Upload the thumbnail to S3
    // Read the generated screenshot
    logger.info('Reading generated thumbnail')
    const screenshotBuffer = await new Promise<Buffer>((resolve, reject) => {
      const buffer = require('fs').readFileSync(screenshotFilePath);
      resolve(buffer);
    });

    logger.info('Uploading thumbnail to S3')
    const putCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: thumbnailS3Key,
      Body: screenshotBuffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(putCommand);
    logger.info('Thumbnail created successfully');

    return thumbnailS3Key;

  } catch (error) {
    logger.error('Error downloading or processing video:', error as Error);
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
      authMode: 'iam',
    });

    if (!updateFileResponse.updateFile) throw new Error("Update file record operation failed")

    logger.info('Database updated successfully');
  } catch (e) {
    logger.error('Error updating database:', e as Error);
    throw e;
  }
}


export const handler: Handler = async (event: EventBridgeEvent<EventType.VideoUploadedEvent, VideoUploadedEventDetail>, context) => {

  // Add lambda context and events in logs
  // Reference - https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/#capturing-lambda-context-info
  logger.addContext(context);
  logger.logEventIfEnabled(event);

  if (!process.env.BUCKET_NAME)
    throw new Error("BUCKET_NAME environment variable is not set");


  if (event['detail-type'] === EventType.VideoUploadedEvent) {

    const objectKey = event.detail.objectKey;
    const userId = event.detail.userId;
    const fileId = event.detail.fileId;

    // 1. Create a thumbnail of the video using ffmpeg
    const thumbnailKey = await createAndStoreThumbnail(process.env.BUCKET_NAME, fileId, objectKey, userId)

    // 2. Update the database
    await updateDatabase(fileId, thumbnailKey);

    logger.info("Video processed successfully");
  }
}