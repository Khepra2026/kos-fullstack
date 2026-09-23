import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const service = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL:', url)
console.log('ANON len:', anon?.length, 'SERVICE len:', service?.length)

const supabaseAnon = createClient(url, anon)
const supabaseService = createClient(url, service)

const tables = ['kos_regulatory_corpus','kos_vector_knowledge','regulatory_register','kb_docs','profiles','audit_logs','bigfour_pipeline_log']

for (const role of [{name:'ANON', client: supabaseAnon}, {name:'SERVICE', client: supabaseService}]) {
  console.log('\n---', role.name, '---')
  for (const t of tables) {
    try {
      const { count, error } = await role.client.from(t).select('*', {count:'exact', head:true})
      if (error) console.log(t + ': ERROR', error.message, '| code', error.code)
      else console.log(t + ':', count)
    } catch (e) {
      console.log(t + ': EXCEPTION', e.message)
    }
  }
}
