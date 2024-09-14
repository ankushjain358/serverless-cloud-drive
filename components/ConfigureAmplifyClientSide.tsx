"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useRouter } from 'next/navigation';
import { Hub } from "aws-amplify/utils";

Amplify.configure(outputs, {
    ssr: true // required when using Amplify with Next.js
});


export default function ConfigureAmplifyClientSide() {

    const router = useRouter()

    const SubscribeAuthEvents = () => {
        // Listen to the auth events
        Hub.listen('auth', ({ payload }) => {

            switch (payload.event) {
                case 'signedIn':
                    console.log('user have been signedIn successfully.');
                    router.push('/drive');
                    break;
                case 'signedOut':
                    console.log('user have been signedOut successfully.');
                    router.push('/auth');
                    break;
                case 'tokenRefresh':
                    console.log('auth tokens have been refreshed.');
                    break;
                case 'tokenRefresh_failure':
                    console.log('failure while refreshing auth tokens.');
                    break;
                case 'signInWithRedirect':
                    console.log('signInWithRedirect API has successfully been resolved.');
                    break;
                case 'signInWithRedirect_failure':
                    console.log('failure while trying to resolve signInWithRedirect API.');
                    break;
                case 'customOAuthState':
                    console.log('custom state returned from CognitoHosted UI');
                    break;
            }
        });
    }

    SubscribeAuthEvents();

    return null;
}