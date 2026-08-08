import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json({ user:'mock', tenant:'default', auth:'ok' }); }
