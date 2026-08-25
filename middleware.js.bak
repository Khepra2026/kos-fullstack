import { NextResponse } from 'next/server';
export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options','DENY');
  response.headers.set('X-Content-Type-Options','nosniff');
  response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co");
  return response;
}
export const config = { matcher: '/:path*' };
