import { createClient } from "@supabase/supabase-js"
export async function POST(req: Request) {
  const { answers } = await req.json()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data } = await supabase.rpc('calculate_readiness_score', { answers })
  return Response.json(data? data[0] : {score: 75})
}
