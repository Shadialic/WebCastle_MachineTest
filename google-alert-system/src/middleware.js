import { NextResponse } from 'next/server';

const publicPaths = ['/', '/api/auth'];

function middleware(request) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get('access_token');
  if (!authCookie && !publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authCookie && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export { middleware }; 