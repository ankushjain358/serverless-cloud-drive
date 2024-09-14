import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from './utils/amplifyServerUtils';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    console.log(request.nextUrl.pathname)

    // Only run this middleware for paths that start with '/drive'
    if (request.nextUrl.pathname.startsWith('/drive')) {

        try {
            await runWithAmplifyServerContext({
                nextServerContext: { request, response },
                operation: async (contextSpec) => {
                    const user = await getCurrentUser(contextSpec);

                    // If user is authenticated, allow the request to proceed
                    if (user) {
                        return NextResponse.next();
                    }

                    // If user is not authenticated, redirect to the auth page
                    return NextResponse.redirect(new URL('/auth', request.url));
                },
            });
        } catch (error) {
            console.error('Error in middleware:', error);
            // If there's an error, redirect to the auth page as a fallback
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }

    // For all other paths, allow the request to proceed
    return response;
}

// Configure the middleware to run only for paths starting with '/drive'
export const config = {
    matcher: '/drive/:path*',
};
