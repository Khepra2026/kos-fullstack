// FIX middleware.js - CSP nonce per request + HSTS + no unsafe-inline
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export function middleware(request) {
  const nonce = crypto.randomBytes(16).toString('base64')
  const response = NextResponse.next()
  
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-KOS-Gateway', 'BigFour-Fixed-v1')
  response.headers.set('Content-Security-Policy', 
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'nonce-${nonce}'; object-src 'none'; base-uri 'self';`
  )
  response.headers.set('x-nonce', nonce)
  return response
}
