import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
console.log('ANON:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length, 'SERVICE:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length)
