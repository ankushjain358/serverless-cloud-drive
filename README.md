# Serverless Cloud Drive

A fully serverless cloud drive application built with modern web technologies, providing secure and scalable storage, user authentication, and seamless file management.

## Tech Stack

### AWS Serverless services

- AWS AppSync
- Amazon DynamoDB
- AWS Lambda
- Amazon Cognito
- Amazon S3
- AWS Amplify Gen2
- AWS CDK

### UI

- Next.js (React)
- TypeScript
- Shadcn UI

## Deployment steps

Follow below steps to deploy the application on AWS account.

### 1. Deploy Lambda layers

1. Run `cd cdk` to navigate to `cdk` directory.
2. Run `cdk deploy` to deploy the stack.
3. Once the deployment finishes, note down the layer ARNs for below layers.
    - Sharp
    - FFmpeg

### 2.1. Run application locally

1. Create a `.env.local` file on the root directory.

    ```env
    SHARP_LAMBDA_LAYER_ARN='<Sharp Layer ARN>'
    FFMPEG_LAMBDA_LAYER_ARN='<FFmpeg Layer ARN>'
    ```

2. Run the following command to create new sandbox environment.

    ```bash
    npx ampx sandbox
    ```

3. After successful deployment, run Next.js app.

    ```bash
    npm run dev
    ```

### 2.2. Run application on AWS Amplify Hosting

## Architecture

## Design

## Lamdba layers used in the project

The following third-party libraries have been used as Lambda layer:

- **Sharp**: High performance Node.js image processing library
- **FFmpeg**: Cross-platform solution to record, convert and stream audio and video

### How Lambda layer works?

When you add a layer to a function, Lambda loads the layer content into the `/opt` directory of that execution environment. For each Lambda runtime, the `PATH` variable already includes specific folder paths within the `/opt` directory. To ensure that the PATH variable picks up your layer content, your layer .zip file should have its dependencies in the following folder paths:

![image](./docs/images/lambda-layer-paths.png)

To learn more, refer to [Layer paths for each Lambda runtime](https://docs.aws.amazon.com/lambda/latest/dg/packaging-layers.html#packaging-layers-paths)

## Considerations for Upgrades and Maintainence (Runbook)

### 1. How to update Sharp lambda layer?

Redeploy the CDK stack located at `cdk` directory. This creates a new version of Lambda layer with the latest `Sharp` version.

### 2. How to update FFmpeg lambda layer?

Redeploy the CDK stack located at `cdk` directory. This creates new version of Lambda layer with the latest `FFmpeg` version.

> Note: Here, the deployment might fail, and the you have to update the version hardcoded in the command.

### 3. How to update Lambda functions when new Node.js runtime releases?
