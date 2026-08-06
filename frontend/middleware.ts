import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload')
  res.headers.set('X-Content-Type-Options','nosniff')
  res.headers.set('X-Frame-Options','DENY')
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()')
  res.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline' https://*.supabase.co https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co")
  return res
}
export const config = { matcher: '/:path*' }
