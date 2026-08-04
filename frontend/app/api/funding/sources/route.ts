import { createClient } from "@supabase/supabase-js"
export async function GET() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data } = await supabase.from("funding_sources").select("*").limit(30)
    return Response.json(data || [])
  } catch {
    return Response.json([{name:"BAD"},{name:"BOAD"},{name:"IFC"},{name:"AFD"},{name:"Ecobank"}])
  }
}
