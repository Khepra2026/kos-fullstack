import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const payload = JSON.parse(Buffer.from(anon.split('.')[1], 'base64').toString())
console.log('ANON payload:', payload)
console.log('exp:', new Date(payload.exp*1000), 'now:', new Date())
console.log('role:', payload.role)
console.log('ref:', payload.ref)
