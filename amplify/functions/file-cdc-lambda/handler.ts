import type { Handler } from 'aws-lambda';
import { DynamoDBBatchResponse, DynamoDBStreamEvent } from 'aws-lambda';

export const handler: Handler = async (event: DynamoDBStreamEvent, context) => {

  event.Records.forEach(record => {
    console.log(record.dynamodb);
  });
  // your function code goes here
  return 'Hello, World!';
};
