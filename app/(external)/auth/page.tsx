"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react"
import '@aws-amplify/ui-react/styles.css';
import { AuthUser } from 'aws-amplify/auth';

export default function AuthPage() {

    return (
        <div className='flex flex-col h-full items-center justify-center'>
            <Authenticator>
                {({ user }) => <AuthRedirect user={user} />}
            </Authenticator>
        </div>
    );
}


interface AuthRedirectProps {
    user: AuthUser | undefined;
}

function AuthRedirect({ user }: AuthRedirectProps) {
    const router = useRouter();
    const [appUser, setAppUser] = useState<AuthUser | undefined>();

    useEffect(() => {
        if (appUser) {
            router.push('/drive')
            console.log("user", appUser);
        }
    }, [appUser]);

    useEffect(() => {
        if (user) {
            setAppUser(user);
        }
    }, [user]);

    if (appUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <main>
            <h1>Please sign in to continue</h1>
        </main>
    );
}
