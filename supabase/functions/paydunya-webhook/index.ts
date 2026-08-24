import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, paydunya-signature',
}

// Vérification signature HMAC Paydunya - sécurité BCEAO
async function verifyPaydunyaSignature(payload: string, signature: string, masterKey: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(masterKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
  const sigBytes = new Uint8Array(signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
  return await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(payload))
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const rawBody = await req.text()
    const body = JSON.parse(rawBody)
    const signature = req.headers.get('paydunya-signature') || ''
    const masterKey = Deno.env.get('PAYDUNYA_MASTER_KEY')!

    // 1. Sécurité : vérifier signature
    if (masterKey && masterKey.startsWith('live_')) {
      const isValid = await verifyPaydunyaSignature(rawBody, signature, masterKey)
      if (!isValid) {
        console.error('[Paydunya] Signature invalide')
        return new Response('Unauthorized', { status: 401, headers: corsHeaders })
      }
    }

    // 2. Traitement paiement confirmé
    if (body.status === 'completed' || body.data?.status === 'completed') {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )

      const email = body.customer?.email || body.data?.customer?.email
      const amount = Number(body.invoice?.total_amount || body.data?.invoice?.total_amount || 0)
      const invoiceToken = body.invoice?.token || body.data?.invoice?.token

      if (!email ||!amount) throw new Error('Email ou montant manquant')

      // 3. Mapper montant -> Niveau KOS
      let niveau = 0
      if (amount >= 700) niveau = 4 // Business 700€
      else if (amount >= 150) niveau = 3 // Professional 150€
      else if (amount >= 15) niveau = 2 // Starter 15€

      // 4. Activer abonnement
      const { error: subError } = await supabase
       .from('subscriptions')
       .upsert({
          user_email: email,
          niveau: niveau,
          paydunya_invoice_token: invoiceToken,
          status: 'active',
          activated_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }, { onConflict: 'user_email' })

      if (subError) throw subError

      // 5. Déclencher Orchestrateur IA KOS
      const { error: orchError } = await supabase.functions.invoke('ai-orchestrator', {
        body: {
          action: 'onboard_paid_user',
          email: email,
          niveau: niveau,
          amount: amount
        }
      })

      if (orchError) console.error('[Orchestrator] Error:', orchError.message)

      console.log(`[Paydunya] User ${email} upgraded to Niveau ${niveau}`)

      return new Response(JSON.stringify({ success: true, niveau }), {
        headers: {...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('[Paydunya Webhook] Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})