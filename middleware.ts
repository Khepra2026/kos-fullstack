import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { get: (n) => req.cookies.get(n)?.value, set: (n,v,o) => res.cookies.set(n,v,o), remove: (n,o) => res.cookies.set(n,'',{...o,maxAge:0}) } })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))
  const tenant_id = (user.app_metadata as any)?.tenant_id
  if (!tenant_id) return new NextResponse('Tenant missing', { status: 403 })
  res.headers.set('x-tenant-id', tenant_id)
  res.headers.set('x-request-id', crypto.randomUUID())
  return res
}
export const config = { matcher: ['/api/v1/:path*','/dashboard/:path*'] }
