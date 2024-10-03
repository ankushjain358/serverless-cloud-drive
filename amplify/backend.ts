import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import 'dotenv/config'
import { Duration } from 'aws-cdk-lib';
import { DynamoEventSource, SqsDlq } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// Required lambda layers
var sharpLambdaLayerArn = process.env.SHARP_LAMBDA_LAYER_ARN;
var ffmpegLambdaLayerArn = process.env.FFMPEG_LAMBDA_LAYER_ARN;

if (!sharpLambdaLayerArn || !ffmpegLambdaLayerArn) {
  throw new Error('Missing required environment variables');
}

const backend = defineBackend({
  auth,
  data,
  storage,
});


// Amplify Gen 2 enables guest access by default. To disable it, do the following changes:
const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;

// 1. Create secondary stack
const secondarySatck = backend.createStack("secondary-stack");

// 2.1 Dead letter queue - for lambda failure destination
const processingFailureDLQ = new sqs.Queue(secondarySatck, 'ProcessingFailureDLQ');

// 2.2 Dead letter queue - for eventbridge delivery failure
const deliveryFailureDLQ = new sqs.Queue(secondarySatck, 'DeliveryFailureDLQ');


// 3.1. Lambda function (CDC) for File table
const fileTableCDCFunction = new NodejsFunction(secondarySatck, 'file-cdc-function', {
  entry: path.join(__dirname, 'functions/file-cdc-lambda/handler.ts'),
  runtime: Runtime.NODEJS_20_X,
  handler: 'handler',
  bundling: {
    externalModules: ['@aws-sdk/*'],
    minify: false,
    sourceMap: true
  },
  timeout: Duration.seconds(60),
  memorySize: 1024
});

// 3.2. Lambda function (CDC) for Folder table
const folderTableCDCFunction = new NodejsFunction(secondarySatck, 'folder-cdc-function', {
  entry: path.join(__dirname, 'functions/folder-cdc-lambda/handler.ts'),
  runtime: Runtime.NODEJS_20_X,
  handler: 'handler',
  bundling: {
    externalModules: ['@aws-sdk/*'],
    minify: false,
    sourceMap: true
  },
  timeout: Duration.seconds(60),
  memorySize: 1024
});


// 4.1.1. Lambda function (EventBridge target) for the image processing
const imageProcessingFunction = new NodejsFunction(secondarySatck, 'image-processing-function', {
  entry: path.join(__dirname, 'functions/image-processing/handler.ts'),
  runtime: Runtime.NODEJS_20_X,
  handler: 'handler',
  bundling: {
    externalModules: ['@aws-sdk/*'],
    minify: false,
    sourceMap: true
  },
  timeout: Duration.seconds(60),
  memorySize: 1024,
  retryAttempts: 2,
  maxEventAge: Duration.hours(6),
  onFailure: new SqsDlq(processingFailureDLQ),
  layers: [lambda.LayerVersion.fromLayerVersionArn(secondarySatck, "SharpLayer", sharpLambdaLayerArn)],
  environment: {
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: backend.data.graphqlUrl
  }
});

// 4.1.2. Grant this lamdba permission to call graphql api
backend.data.resources.graphqlApi.grantMutation(imageProcessingFunction.role!)

// 4.2.1. Lambda function (EventBridge target) for the video processing
const videoProcessingFunction = new NodejsFunction(secondarySatck, 'video-processing-function', {
  entry: path.join(__dirname, 'functions/video-processing/handler.ts'),
  runtime: Runtime.NODEJS_20_X,
  handler: 'handler',
  bundling: {
    externalModules: ['@aws-sdk/*'],
    minify: false,
    sourceMap: true
  },
  timeout: Duration.seconds(60),
  memorySize: 1024,
  retryAttempts: 2,
  maxEventAge: Duration.hours(6),
  onFailure: new SqsDlq(processingFailureDLQ),
  layers: [lambda.LayerVersion.fromLayerVersionArn(secondarySatck, "FFmpegLayer", ffmpegLambdaLayerArn)],
  environment: {
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: backend.data.graphqlUrl
  }
});

// 4.2.2. Grant this lamdba permission to call graphql api
backend.data.resources.graphqlApi.grantMutation(videoProcessingFunction.role!)


// 5. Configure lambda functions to consume DynamoDB streams

// 5.1. Get the DynamoDB table resources
const fileTable = backend.data.resources.tables["File"];
const folderTable = backend.data.resources.tables["Folder"];

// 5.2. Create a reusable filter
const insertFilter = lambda.FilterCriteria.filter({
  eventName: lambda.FilterRule.isEqual('INSERT'),
});

const deleteFilter = lambda.FilterCriteria.filter({
  eventName: lambda.FilterRule.isEqual('REMOVE'),
});

// Note: 'addEventSource' automatically create the mapping, and will also modify the Lambda's execution role 
// so it can consume messages from the stream.

// 5.3. Add DynamoDB stream (file table) as event source 
fileTableCDCFunction.addEventSource(new DynamoEventSource(fileTable, {
  startingPosition: lambda.StartingPosition.LATEST,
  filters: [insertFilter, deleteFilter],
  batchSize: 10,
  retryAttempts: 3,
  onFailure: new SqsDlq(processingFailureDLQ) // An Amazon SQS queue destination for discarded records.
}));

// 5.3. Add DynamoDB stream (folder table) as event source 
folderTableCDCFunction.addEventSource(new DynamoEventSource(folderTable, {
  startingPosition: lambda.StartingPosition.LATEST,
  filters: [deleteFilter],
  batchSize: 10,
  retryAttempts: 3,
  onFailure: new SqsDlq(processingFailureDLQ) // An Amazon SQS queue destination for discarded records.
}));


// 6. EventBridge events for image and video processing
const cloudDriveEventBus = new events.EventBus(secondarySatck, 'CloudDriveEventBus', {
  eventBusName: 'cloud-drive-event-bus',
});


// 6.1. Add target to event bus for image processing
const targetImageProcessingLambda = new targets.LambdaFunction(imageProcessingFunction, {
  deadLetterQueue: deliveryFailureDLQ, // Optional: add a dead letter queue
  maxEventAge: Duration.hours(2), // Optional: set the maxEventAge retry policy
  retryAttempts: 3 // Optional: set the max number of retry attempts
});

// 6.2. Add target to event bus for video processing
const targetVideoProcessingLambda = new targets.LambdaFunction(videoProcessingFunction, {
  deadLetterQueue: deliveryFailureDLQ,
  maxEventAge: Duration.hours(2),
  retryAttempts: 3
});

// 6.3. Add event bus rules for image uploaded event
new events.Rule(secondarySatck, 'ImageUploadedEventRule', {
  eventBus: cloudDriveEventBus,
  eventPattern: {
    source: ["clouddrive"],
    detailType: ['Image_Uploaded']
  },
  targets: [targetImageProcessingLambda]
});

// 6.3. Add event bus rules for video uploaded event
new events.Rule(secondarySatck, 'VideoUploadedEventRule', {
  eventBus: cloudDriveEventBus,
  eventPattern: {
    source: ["clouddrive"],
    detailType: ['Video_Uploaded']
  },
  targets: [targetVideoProcessingLambda]
});
