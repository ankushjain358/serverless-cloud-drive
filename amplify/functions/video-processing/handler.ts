import type { Handler } from 'aws-lambda';
import { DynamoDBBatchResponse, DynamoDBStreamEvent } from 'aws-lambda';

export const handler: Handler = async (event, context) => {

  console.log("Start: Hello from testing");
  console.log(event);
  console.log("End: Hello from testing");

  return 'Hello, World!';
};
