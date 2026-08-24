import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const SITE_URL = 'https://khepraexperts.com'
const PUBLICATION_NAME = 'KHEPRA EXPERTS'
const PUBLICATION_LANG = 'fr'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

// 18 langues — 10 pilotes africaines + FR/EN + 6 communautaires — KOS i18n v2.0
const ALL_LANGS = ['fr', 'en', 'sw', 'ha', 'ig', 'am', 'wo', 'ln', 'mos', 'ewo', 'dua', 'fmp']

// ... (keep the rest of the code identical, just update ALL_LANGS)
