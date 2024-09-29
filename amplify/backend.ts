import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { generateThumbnail } from './functions/generate-thmbnail/resource';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import 'dotenv/config'

var sharpLambdaLayerArn = process.env.SHARP_LAMBDA_LAYER_ARN;
var ffmpegLambdaLayerArn = process.env.FFMPEG_LAMBDA_LAYER_ARN;

if (!sharpLambdaLayerArn || !ffmpegLambdaLayerArn) {
  throw new Error('Missing required environment variables');
}

const backend = defineBackend({
  auth,
  data,
  storage,

  generateThumbnail
});

const scope = backend.storage.resources.cfnResources.cfnBucket.stack;

// Amplify Gen 2 enables guest access by default. To disable it, do the following changes:
const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;

// Add the Sharp Layer to the generateThumbnail function
const generateThumbnailLambda = backend.generateThumbnail.resources.lambda as lambda.Function
const sharpLambdaLayer = lambda.LayerVersion.fromLayerVersionArn(scope, "SharpLayer", sharpLambdaLayerArn)
generateThumbnailLambda.addLayers(sharpLambdaLayer)

 // Create a cloud-drive event bus
 const cloudDriveEventBus = new events.EventBus(scope, 'CloudDriveEventBus', {
  eventBusName: 'cloud-drive-event-bus'
});
