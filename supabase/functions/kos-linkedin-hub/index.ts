import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const url = new URL(req.url)
  const action = url.pathname.split('/').pop()

  switch(action) {
    case 'oauth':
      return new Response(JSON.stringify({msg: "TODO: paste oauth code"}), {headers: {"Content-Type": "application/json"}})
    case 'publish':
      return new Response(JSON.stringify({msg: "TODO: paste publish code"}), {headers: {"Content-Type": "application/json"}})
    case 'bridge':
      return new Response(JSON.stringify({msg: "TODO: paste bridge code"}), {headers: {"Content-Type": "application/json"}})
    case 'master':
      return new Response(JSON.stringify({msg: "TODO: paste master code"}), {headers: {"Content-Type": "application/json"}})
    default:
      return new Response('Not found', {status: 404})
  }
})
