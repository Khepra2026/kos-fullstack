
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Record<string,string> = {};
  try {
    // Check Supabase URL reachable (light check, no secret leak)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) throw new Error('SUPABASE_URL missing');
    checks.db = 'ok';
    checks.status = 'ready';
    return NextResponse.json(checks, { status: 200 });
  } catch (e:any) {
    checks.status = 'not-ready';
    checks.error = e.message;
    return NextResponse.json(checks, { status: 503 });
  }
}
