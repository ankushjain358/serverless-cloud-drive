# Lambda Layer

## Lamdba layers used in the project

The following third-party libraries have been used as Lambda layer:

- **Sharp**: High performance Node.js image processing library
- **FFmpeg**: Cross-platform solution to record, convert and stream audio and video

### How Lambda layer works?

When you add a layer to a function, Lambda loads the layer content into the `/opt` directory of that execution environment. For each Lambda runtime, the `PATH` variable already includes specific folder paths within the `/opt` directory. To ensure that the PATH variable picks up your layer content, your layer .zip file should have its dependencies in the following folder paths:

![image](images/lambda-layer-paths.png)

To learn more, refer to [Layer paths for each Lambda runtime](https://docs.aws.amazon.com/lambda/latest/dg/packaging-layers.html#packaging-layers-paths)

## References

1. [Working with layers for Node.js Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-layers.html)
2. [Processing user-generated content using AWS Lambda and FFmpeg](https://aws.amazon.com/blogs/media/processing-user-generated-content-using-aws-lambda-and-ffmpeg/)