// Authentication middleware for API routes


import authService  from './services/authService'; // Adjust the import path as necessary
import { NextRequest, NextResponse } from 'next/server';

interface Session {
    userId: string;
    email: string;
    roles: string[];
}

export function middleware(request: NextRequest): NextResponse {
    // Check if the request is for an API route that requires authentication
    if (request.nextUrl.pathname.startsWith('/api') && 
            !request.nextUrl.pathname.startsWith('/api/auth')) {
        const token = request.headers.get('authorization')?.split(' ')[1];
        
        if (!token) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Authentication required' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            );
        }
        
        const session: Session | null = authService.validateSession(token);
        if (!session) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Invalid or expired session' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            );
        }
        
        // Add user information to the request
        (request as any).user = session;
    }
    
    return NextResponse.next();
}

// Match the middleware to run on API routes
export const config = {
  matcher: '/api/:path*',
};
