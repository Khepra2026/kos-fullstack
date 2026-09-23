import dotenv from 'dotenv'; dotenv.config({path:'.env.local'})
const url = process.env.NEXT_PUBLIC_SUPABASE_URL+'/rest/v1/kos_regulatory_corpus?select=*&limit=1'
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const r = await fetch(url, {headers:{apikey:anon, Authorization:'Bearer '+anon}})
console.log('HTTP', r.status, await r.text())
