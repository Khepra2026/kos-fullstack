import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'
const supabaseAnon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const supabaseService = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

for (const client of [{name:'ANON', c: supabaseAnon}, {name:'SERVICE', c: supabaseService}]) {
  const {count: total} = await client.c.from('kb_docs').select('*', {count:'exact', head:true})
  const {count: withEmb} = await client.c.from('kb_docs').select('*', {count:'exact', head:true}).not('embedding_bge','is',null)
  const {count: withoutEmb} = await client.c.from('kb_docs').select('*', {count:'exact', head:true}).is('embedding_bge', null)
  console.log(client.name + ' kb_docs total:', total, 'with emb:', withEmb, 'without:', withoutEmb)
}
