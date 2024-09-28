import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { generateThumbnail } from './functions/generate-thmbnail/resource';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,

  generateThumbnail
});

// Amplify Gen 2 enables guest access by default. To disable it, do the following changes:
const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;


//********* START: Secondary Stack ***************/

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Create a secondary stack for additional resources
const secondaryStack = backend.createStack("secondary-stack");

// Define the path for the pre-built Sharp layer ZIP file
const sharpLayerPath = path.join(__dirname, 'layers/sharp-layer.zip');

// Create a new Lambda Layer Version
const sharpLayer = new lambda.LayerVersion(secondaryStack, 'SharpLayer', {
  // Conditionally use pre-built layer or build from scratch
  code: fs.existsSync(sharpLayerPath)
    ? lambda.Code.fromAsset(sharpLayerPath)
    : lambda.Code.fromAsset(__dirname, {
      bundling: {
        image: lambda.Runtime.NODEJS_20_X.bundlingImage,
        command: [
          'bash', '-c',
          [
            'cd /',
            'mkdir sharp-layer && cd /sharp-layer',
            'npm install sharp',
            'cd /',
            'mkdir -p nodejs/node20',
            'cp -r /sharp-layer/node_modules nodejs/node20',
            'zip -r layer_content.zip nodejs',
            'cp layer_content.zip /asset-output'
          ].join(' && ')
        ],
        user: 'root', // Set the correct user permissions for bundling
      },
    }),
  compatibleArchitectures: [lambda.Architecture.X86_64],
  compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
  description: 'A Lambda Layer with sharp for image processing',
});

const ffmpegLayerPath = path.join(__dirname, 'layers/ffmpeg-layer.zip');

const ffmpegLayer = new lambda.LayerVersion(secondaryStack, 'FFmpegLayer', {
  code: lambda.Code.fromAsset(ffmpegLayerPath),
  compatibleArchitectures: [lambda.Architecture.X86_64],
  compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
  description: 'A Lambda Layer with FFmpeg for video processing',
});

//********* END: Secondary Stack ***************/


// Add the Sharp Layer to the generateThumbnail function
const generateThumbnailLambda = backend.generateThumbnail.resources.lambda as lambda.Function
generateThumbnailLambda.addLayers(sharpLayer)
