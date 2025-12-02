import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Edge-compatible UUID generator
function generateUUID(): string {
  return crypto.randomUUID();
}

const rateLimitMap = new Map();

function rateLimit(ip: string, limit = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }
  
  rateLimitMap.set(ip, record);
  return record.count <= limit;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Generate unique request ID for tracking
  const requestId = generateUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  // Rate limiting for API routes (disabled for auth to prevent session check issues)
  if (pathname.startsWith('/api/') && !pathname.includes('/auth/')) {
    if (!rateLimit(ip, 100)) {
      const response = NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      response.headers.set('x-request-id', requestId);
      return response;
    }
  }

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req: request });
    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Account route protection
  if (pathname.startsWith('/account')) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Pass request ID to the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('x-request-id', requestId);
  
  return response;
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*', '/account/:path*']
};