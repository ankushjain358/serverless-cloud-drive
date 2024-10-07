import { Amplify } from "aws-amplify";


export const configureAmplify = () => {

    const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
    const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || "";
    const AMPLIFY_DATA_GRAPHQL_ENDPOINT = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT || "";

    Amplify.configure(
        {
            API: {
                GraphQL: {
                    endpoint: AMPLIFY_DATA_GRAPHQL_ENDPOINT,
                    region: process.env.AWS_REGION,
                    defaultAuthMode: "iam",
                },
            },
        },
        {
            Auth: {
                credentialsProvider: {
                    getCredentialsAndIdentityId: async () => ({
                        credentials: {
                            accessKeyId: AWS_ACCESS_KEY_ID,
                            secretAccessKey: AWS_SECRET_ACCESS_KEY,
                            sessionToken: AWS_SESSION_TOKEN,
                        },
                    }),
                    clearCredentialsAndIdentityId: () => {
                        /* noop */
                    },
                },
            },
        }
    );
}

//******* Eventbridge Events *******/

export interface ImageUploadedEventDetail {
    objectKey: string;
    userId: string;
}

export interface VideoUploadedEventDetail {
    objectKey: string;
    userId: string;
}