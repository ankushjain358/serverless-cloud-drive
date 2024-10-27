import type { Handler } from 'aws-lambda';
import { DynamoDBStreamEvent } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { EventSource, EventType, ImageUploadedEventDetail, VideoUploadedEventDetail } from '../shared/eventbridge.events';
import { Logger } from '@aws-lambda-powertools/logger';

// process.env.POWERTOOLS_LOGGER_LOG_EVENT = 'true';
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;

const logger = new Logger({ serviceName: 'FileCDCFunction' });
const eventBridgeClient = new EventBridgeClient();

const sendProcessingEvent = async (detailType: string, eventDetail: any) => {

  const inputEvent = new PutEventsCommand({
    Entries: [{
      Detail: JSON.stringify(eventDetail),
      EventBusName: EVENT_BUS_NAME,
      Source: EventSource.CloudDrive,
      DetailType: detailType
    }]
  });

  await eventBridgeClient.send(inputEvent);
}

const sendImageProcessingEvent = async (fileId: string, objectKey: string, userId: string) => {

  logger.info("Sending image processing event")
  const eventDetail: ImageUploadedEventDetail = {
    fileId: fileId,
    objectKey: objectKey,
    userId: userId
  };

  await sendProcessingEvent(EventType.ImageUploadedEvent, eventDetail);
  logger.info("Image processing event sent")
}

const sendVideoProcessingEvent = async (fileId: string, objectKey: string, userId: string) => {

  logger.info("Sending video processing event")
  const detail: VideoUploadedEventDetail = {
    fileId: fileId,
    objectKey: objectKey,
    userId: userId
  };

  await sendProcessingEvent(EventType.VideoUploadedEvent, detail);
  logger.info("Video processing event sent")
}

export const handler: Handler = async (event: DynamoDBStreamEvent, context) => {
  try {

    // Add lambda context and events in logs
    // Reference - https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/#capturing-lambda-context-info
    logger.addContext(context);
    logger.logEventIfEnabled(event);

    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(event.Records.map(async (record) => {

      // 1. This is when a new file is uploaded
      if (record.eventName === 'INSERT') {

        // Example record for a file
        // Note: Here filename is kept same as id, and same for thumbnail
        // Just prefixes are updated.
        //
        // {
        //   "id": "1ccbc77a-a8c8-4875-9a1b-9df2db35136d",
        //   "createdAt": "2024-10-13T10:33:52.386Z",
        //   "fileName": "1718248228523.jpg",
        //   "folderId": "6729a6c4-1b97-4f4b-9e9a-fcd9ed2ad7ea",
        //   "owner": "51534d9a-f0c1-70e8-bb9a-e69b235795a9::51534d9a-f0c1-70e8-bb9a-e69b235795a9",
        //   "s3Key": "drive/51534d9a-f0c1-70e8-bb9a-e69b235795a9/1ccbc77a-a8c8-4875-9a1b-9df2db35136d.jpg",
        //   "size": 147730,
        //   "thumbnailS3Key": "drive/51534d9a-f0c1-70e8-bb9a-e69b235795a9/thumb/1ccbc77a-a8c8-4875-9a1b-9df2db35136d.jpg",
        //   "updatedAt": "2024-10-13T10:36:46.158Z",
        //   "userId": "51534d9a-f0c1-70e8-bb9a-e69b235795a9",
        //   "__typename": "File"
        //  } 

        const fileId = record?.dynamodb?.NewImage?.id?.S;
        const objectKey = record?.dynamodb?.NewImage?.s3Key?.S;
        const userId = record?.dynamodb?.NewImage?.userId?.S;

        if (fileId && objectKey && userId) {

          const imageExtensions = new Set(['.jpg', '.png', '.jpeg']);
          const videoExtensions = new Set(['.mp4', '.avi', '.mov', '.mkv']);

          const extension = objectKey.substring(objectKey.lastIndexOf('.')).toLowerCase();

          // 1.1. Process images 
          if (imageExtensions.has(extension)) {
            await sendImageProcessingEvent(fileId, objectKey, userId);
          }
          // 1.2. Process videos
          else if (videoExtensions.has(extension)) {
            await sendVideoProcessingEvent(fileId, objectKey, userId);
          }
        }
      }
      // 2. This is when a file is deleted
      else if (record.eventName === 'REMOVE') {
        // Handle REMOVE event if needed
      }
    }));

    logger.info("All events processed successfully");
  } catch (error) {
    // Log information about the error using the default "error" key
    logger.error("Error processing events:", error as Error);
    throw error; // Rethrow the error to mark the Lambda execution as failed
  }
};