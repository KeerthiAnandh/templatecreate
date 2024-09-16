import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

async function verifyToken(token: string): Promise<boolean> {
    try {
        const response = await fetch('https://your-backend-url/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to verify token:', response.statusText);
            return false;
        }

        const data = await response.json();
        return data.isValid;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}

export async function middleware(request: NextRequest) {
   
    const pathName = request.nextUrl.pathname;
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '');

    console.log('Path:', pathName);
    console.log('Auth Token:', authToken);
    if (!authToken && pathName.startsWith('/template')) {
        console.log('Redirecting to /login because no token');
        return NextResponse.redirect(new URL('/login', request.url));
    }
    const isAuth = authToken ? await verifyToken(authToken) : false;
    console.log('Authenticated:', isAuth);
    
    if (pathName.startsWith('/template') && !isAuth) {
        console.log('Redirecting to /login because token is invalid');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathName.startsWith('/login') && isAuth) {
        console.log('Redirecting to /template because already authenticated');
        return NextResponse.redirect(new URL('/template', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
