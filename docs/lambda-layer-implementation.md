# Lambda Layer implementation

## Creating sharp layer

1. First, clone this repo on Amazon Cloudshell (Amazon Linux 2023).
2. Run `cd amplify\layers\sharp-layer`.
3. Ensure that you have shell permission to run the scripts in the layer directory.

    ```bash
    chmod 744 1-install.sh && chmod 744 2-package.sh
    ```

4. Run the `install.sh` script to install npm packages.
5. Run the `package.sh` script to package the layer.
6. Now, run below command to create the layer.

    ```bash
    aws lambda publish-layer-version --layer-name node-sharp-layer \
        --zip-file fileb://layer_content.zip \
        --compatible-runtimes nodejs20.x \
        --compatible-architectures "x86_64"
    ```

7. Copy the ARN, and update wherever required.

## References

- [Working with layers for Node.js Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-layers.html)
- [Using Lambda layers to simplify your development process](https://aws.amazon.com/blogs/compute/using-lambda-layers-to-simplify-your-development-process/)
