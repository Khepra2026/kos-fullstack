import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const tables = ['kos_regulatory_corpus','kos_vector_knowledge','regulatory_register','documents_reglementaires','vector_store','profiles','big_four_findings']
for (const t of tables) {
  const {count, error} = await supabase.from(t).select('*', {count:'exact', head:true})
  console.log(t + ':', error ? error.message : count)
}
