import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supa = createClient(url, service);
    const { error } = await supa.from("user_tokens").select("user_id").limit(1);
    if (error) return NextResponse.json({ ok: false, connection: `RED: ${error.message}` });
    return NextResponse.json({ ok: true, connection: "GREEN - app.khepraexperts.com ↔ kos Regteck", project_ref: url.split(".")[0].replace("https://","•••••") });
  } catch (e: any) {
    return NextResponse.json({ ok: false, connection: `RED: ${e.message}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, fcfa, description } = await req.json();
    const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data, error } = await supa.rpc("recharge_tokens_manual", { p_user_id: user_id, p_fcfa: fcfa, p_description: description });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
