import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new Lambda Layer Version
    const sharpLayer = new lambda.LayerVersion(this, 'SharpLayer', {
      code:  lambda.Code.fromAsset(__dirname, {
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

    const ffmpegLayer = new lambda.LayerVersion(this, 'FFmpegLayer', {
      code:lambda.Code.fromAsset(__dirname, {
          bundling: {
            image: lambda.Runtime.NODEJS_20_X.bundlingImage,
            command: [
              'bash', '-c',
              [
              'cd /',
              'dnf install wget -y',
              'wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz',
              'wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz.md5',
              'md5sum -c ffmpeg-release-amd64-static.tar.xz.md5',
              'tar xvf ffmpeg-release-amd64-static.tar.xz',
              'mkdir -p ffmpeg/bin',
              'cp ffmpeg-7.0.2-amd64-static/ffmpeg ffmpeg/bin/',
              'cp ffmpeg-7.0.2-amd64-static/ffprobe ffmpeg/bin/',
              'cd ffmpeg',
              'zip -r ../ffmpeg.zip .',
              'cp ../ffmpeg.zip /asset-output'
              ].join(' && ')
            ],
            user: 'root', // Set the correct user permissions for bundling
          },
        }),
      compatibleArchitectures: [lambda.Architecture.X86_64],
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      description: 'A Lambda Layer with FFmpeg for video processing',
    });
  }
}
