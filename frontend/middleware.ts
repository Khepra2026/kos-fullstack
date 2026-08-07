// middleware.ts - Placer a la racine projet Next.js
import { NextResponse } from 'next/server'
export function middleware(request) {
  const res = NextResponse.next()
  res.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload')
  res.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'")
  res.headers.set('X-Content-Type-Options','nosniff')
  res.headers.set('X-Frame-Options','DENY')
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy','geolocation=(), microphone=(), camera=()')
  res.headers.set('X-KOS-Agent','HSTS-CSP-Audit-Seeded')
  return res
}
export const config = { matcher: '/:path*' }
