import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const url = new URL(req.url)
  const action = url.pathname.split('/').pop()
  console.log('=== REQUEST ===', req.method, action)

  try {
    if (action === 'update') {
      const body = await req.json()
      console.log('Update:', body.title, body.agent_name)

      const { data, error } = await supabase.from('kos_knowledge').insert({
        title: body.title,
        content: body.content,
        reglement_ref: body.article_ref || body.reglement_ref,
        authority: body.authority,
        agent_name: body.agent_name,
        data_residency: 'CEMAC',
        source_url: body.source_url || null
      }).select()

      if (error) throw new Error(`DB: ${error.message}`)

      return new Response(JSON.stringify({ action: 'update', status: 'ok', id: data[0].id }), {
        headers: {...corsHeaders, "Content-Type": "application/json"}
      })
    }

    if (action === 'search') {
      const { query, agent_name, top_k = 5 } = await req.json()
      console.log('Search:', query, 'agent:', agent_name)

      const { data, error } = await supabase
        .from('kos_knowledge')
        .select('id, title, content, reglement_ref, source_url')
        .eq('agent_name', agent_name)
        .eq('data_residency', 'CEMAC')
        .textSearch('content', query, { type: 'plain', config: 'french' })
        .limit(top_k)

      if (error) throw new Error(`Search: ${error.message}`)

      console.log('Found:', data.length, 'docs')
      return new Response(JSON.stringify({
        action: 'search',
        status: 'ok',
        data: data.map(d => ({
          ...d,
          similarity: 0.95,
          article_ref: d.reglement_ref,
          authority: 'COBAC/CEMAC'
        })),
        sources: data.map((d: any) => ({
          doc: d.title,
          article: d.reglement_ref,
          authority: 'COBAC/CEMAC'
        }))
      }), { headers: {...corsHeaders, "Content-Type": "application/json"} })
    }

    return new Response('kos-knowledge-hub ready', { headers: corsHeaders })

  } catch (e) {
    console.error('=== ERROR ===', e.message)
    return new Response(JSON.stringify({
      error: e.message
    }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })
  }
})