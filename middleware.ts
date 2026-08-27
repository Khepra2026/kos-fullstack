import { NextResponse } from 'next/server'
export function middleware(req: Request){
  const res = NextResponse.next()
  res.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload')
  res.headers.set('X-Content-Type-Options','nosniff')
  res.headers.set('X-Frame-Options','DENY')
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin')
  res.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline' https://*.supabase.co; connect-src 'self' https://*.supabase.co https://api.khepraexperts.com")
  res.headers.delete('X-Powered-By')
  // CORS - NE PAS echo *
  const origin = req.headers.get('origin')
  const allowed = ['https://kos.khepraexperts.com','https://khepraexperts.com']
  if(origin &&!allowed.includes(origin)){
    // evil.com => ne pas set ACAO
  } else if(origin && allowed.includes(origin)){
    res.headers.set('Access-Control-Allow-Origin', origin)
  }
  return res
}