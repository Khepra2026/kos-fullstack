import { createClient } from "@supabase/supabase-js"
export async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data } = await supabase.from("funding_sources").select("*").limit(50)
  return Response.json(data)
}
