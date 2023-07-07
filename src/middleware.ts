import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = [
        '/login',
        '/signup',
        '/verifyemail',
        '/forgot-password',
        '/forgot-password/sendmail'
    ]
    const isPublicPath = publicPaths.filter(publicPath => path === publicPath).length > 0

    const token = request.cookies.get('token')?.value;

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgot-password',
        '/forgot-password/sendmail'
    ]
}