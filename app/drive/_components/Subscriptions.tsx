"use client"

import { useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export default function SubscriptionsComponent() {

    useEffect(() => {

        // Subscribe to creation of Todo
        const createSub = client.models.File.onCreate().subscribe({
            next: (data) => console.log(data),
            error: (error) => console.warn(error),
        });

        const updateSub = client.models.File.onUpdate().subscribe({
            next: (data) => console.log(data),
            error: (error) => console.warn(error),
        });

        return () => createSub.unsubscribe();
    }, []);

    return <></>;
}