import type { Handler } from 'aws-lambda';
import { DynamoDBStreamEvent } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { ImageUploadedEventDetail, VideoUploadedEventDetail } from '../shared/function.helper';

const eventSource = "cloud-drive"
const ImageUploadedEvent = "ImageUploadedEvent"
const VideoUploadedEvent = "VideoUploadedEvent"

const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;

const eventBridgeClient = new EventBridgeClient();

const sendProcessingEvent = async (detailType: string, detail: any) => {

  const inputEvent = new PutEventsCommand({
    Entries: [{
      Detail: JSON.stringify(detail),
      EventBusName: EVENT_BUS_NAME,
      Source: eventSource,
      DetailType: detailType
    }]
  });

  let response = await eventBridgeClient.send(inputEvent);
}

const sendImageProcessingEvent = async (objectKey: string, userId: string) => {

  const detail: ImageUploadedEventDetail = {
    objectKey: objectKey,
    userId: userId
  };

  await sendProcessingEvent(ImageUploadedEvent, detail);
}

const sendVideoProcessingEvent = async (objectKey: string, userId: string) => {

  const detail: VideoUploadedEventDetail = {
    objectKey: objectKey,
    userId: userId
  };

  await sendProcessingEvent(VideoUploadedEvent, detail);
}

export const handler: Handler = async (event: DynamoDBStreamEvent, context) => {
  try {
    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(event.Records.map(async (record) => {

      if (record.eventName === 'INSERT') {
        await sendImageProcessingEvent('objectKey', 'userId');
        console.log("Sent successfully");
        // Uncomment and use the following code when you're ready to process actual data
        // const objectKey = record.dynamodb.NewImage.s3Key.S;
        // const userId = record.dynamodb.NewImage.userId.S;
        // if (objectKey.endsWith('.jpg') || objectKey.endsWith('.png') || objectKey.endsWith('.jpeg')) {
        //   await sendImageProcessingEvent(objectKey, userId);
        // } else if (objectKey.endsWith('.mp4') || objectKey.endsWith('.avi') || objectKey.endsWith('.mov')) {
        //   await sendVideoProcessingEvent(objectKey, userId);
        // }
      } else if (record.eventName === 'REMOVE') {
        // Handle REMOVE event if needed
      }
    }));

    console.log("All events processed successfully");
  } catch (error) {
    console.error("Error processing events:", error);
    throw error; // Rethrow the error to mark the Lambda execution as failed
  }
};
