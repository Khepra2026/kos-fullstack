import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const service = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL:', url)
console.log('ANON length:', anon?.length, 'SERVICE length:', service?.length)

const supabaseAnon = createClient(url, anon)
const tables = ['kos_regulatory_corpus','kos_vector_knowledge','regulatory_register','documents_reglementaires','vector_store','profiles','big_four_findings','audit_logs']

console.log('\n--- ANON (ce que voit app.khepraexperts.com) ---')
for (const t of tables) {
  const {count, error} = await supabaseAnon.from(t).select('*', {count:'exact', head:true})
  console.log(t + ':', error ? 'ERROR ' + error.message : count)
}

console.log('\n--- SERVICE_ROLE (bypass RLS - vraie data) ---')
const supabaseService = createClient(url, service)
for (const t of tables) {
  const {count, error} = await supabaseService.from(t).select('*', {count:'exact', head:true})
  console.log(t + ':', error ? 'ERROR ' + error.message : count)
}
