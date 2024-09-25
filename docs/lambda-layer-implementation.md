# Lambda Layer implementation

## Creating sharp layer

1. Open Cloudhsell, and create a new directory.

    ```bash
    cd /
    sudo mkdir <dirname>
    cd <dirname>
    ```

2. First, clone this repo on Amazon Cloudshell (Amazon Linux 2023).

    ```bash
    sudo git clone https://github.com/ankushjain358/serverless-cloud-drive.git
    ```

3. Run the following commands.

    ```bash
    cd serverless-cloud-drive/amplify/layers/sharp-layer
    ```

4. Ensure that you have shell permission to run the scripts in the layer directory.

    ```bash
    sudo chmod 744 install.sh && sudo chmod 744 package.sh
    ```

5. Run the `sudo ./install.sh` script to install npm packages.
6. Run the `sudo ./package.sh` script to package the layer.
7. Now, run below command to create the layer.

    ```bash
    aws lambda publish-layer-version --layer-name node-sharp-layer \
        --zip-file fileb://layer_content.zip \
        --compatible-runtimes nodejs20.x \
        --compatible-architectures "x86_64"
    ```

8. Copy the ARN, and update wherever required.

## References

- [Working with layers for Node.js Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-layers.html)
- [Using Lambda layers to simplify your development process](https://aws.amazon.com/blogs/compute/using-lambda-layers-to-simplify-your-development-process/)
