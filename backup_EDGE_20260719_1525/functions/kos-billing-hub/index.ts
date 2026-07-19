import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = { 
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" 
};

// Plans KOS - BIG FOUR PRICING
const PLANS = {
  STARTER: { price: 500000, agents: 3, quota: 10000, sla: 99, name: 'KOS Starter' },
  BUSINESS: { price: 2500000, agents: 9, quota: 100000, sla: 99.5, name: 'KOS Business' },
  ENTERPRISE: { price: 15000000, agents: 17, quota: -1, sla: 99.9, name: 'KOS Enterprise' }
};

const OVERAGE_PRICE = 50; // XAF per call

// PayDunya Config
const PAYDUNYA_MASTER_KEY = Deno.env.get('PAYDUNYA_MASTER_KEY')!;
const PAYDUNYA_PRIVATE_KEY = Deno.env.get('PAYDUNYA_PRIVATE_KEY')!;
const PAYDUNYA_TOKEN = Deno.env.get('PAYDUNYA_TOKEN')!;

async function createPayDunyaInvoice(plan: string, org_id: string, email: string) {
  const planData = PLANS[plan as keyof typeof PLANS];
  
  const payload = {
    invoice: {
      total_amount: planData.price,
      description: `${planData.name} - KOS Platform CEMAC`
    },
    store: {
      name: "KOS DEV PLATFORM",
      tagline: "Plateforme IA Bancaire Souveraine CEMAC"
    },
    actions: {
      cancel_url: "https://kos-platform.com/billing/cancel",
      return_url: "https://kos-platform.com/billing/success",
      callback_url: "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-billing-hub/webhook"
    },
    custom_data: { org_id, plan, agents: planData.agents },
    customer: { email }
  };

  const res = await fetch('https://app.paydunya.com/api/v1/checkout-invoice/create', {
    method: 'POST',
    headers: {
      'PAYDUNYA-MASTER-KEY': PAYDUNYA_MASTER_KEY,
      'PAYDUNYA-PRIVATE-KEY': PAYDUNYA_PRIVATE_KEY,
      'PAYDUNYA-TOKEN': PAYDUNYA_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await res.json();
}

async function handleWebhook(req: Request, supabase: any) {
  const payload = await req.json();
  
  // PayDunya webhook : payment_success
  if (payload.status === 'completed') {
    const { org_id, plan } = payload.custom_data;
    
    // Activer l'abonnement
    await supabase.from('subscriptions').upsert({
      org_id,
      plan,
      status: 'active',
      quota: PLANS[plan as keyof typeof PLANS].quota,
      agents_allowed: PLANS[plan as keyof typeof PLANS].agents,
      started_at: new Date().toISOString(),
      paydunya_token: payload.token
    });
    
    // Audit trail 10 ans COBAC
    await supabase.from('billing_audit').insert({
      org_id, plan, amount: payload.invoice.total_amount,
      currency: 'XAF', provider: 'paydunya', event: 'payment_success'
    });
  }
  
  return new Response('OK', { status: 200 });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const action = new URL(req.url).pathname.split('/').pop();
  
  try {
    // Route 1: Créer abonnement PayDunya
    if (action === 'create-subscription') {
      const { plan, org_id, email } = await req.json();
      const invoice = await createPayDunyaInvoice(plan, org_id, email);
      
      return new Response(JSON.stringify({
        checkout_url: invoice.response_text, // URL PayDunya
        token: invoice.token,
        plan: PLANS[plan as keyof typeof PLANS],
        status: "pending"
      }), { headers: {...corsHeaders, "Content-Type": "application/json"} });
    }
    
    // Route 2: Metering 50 XAF/call
    if (action === 'meter-usage') {
      const { org_id, calls } = await req.json();
      const amount = calls * OVERAGE_PRICE;
      
      await supabase.from('usage_meter').insert({ org_id, calls, amount_xaf: amount });
      
      return new Response(JSON.stringify({ 
        billed_calls: calls, 
        amount_xaf: amount,
        currency: 'XAF'
      }), { headers: {...corsHeaders, "Content-Type": "application/json"} });
    }
    
    // Route 3: Webhook PayDunya
    if (action === 'webhook') {
      return await handleWebhook(req, supabase);
    }
    
    // Route 4: Status abonnement
    if (action === 'subscription-status') {
      const { org_id } = await req.json();
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('org_id', org_id)
        .single();
      
      return new Response(JSON.stringify(data), { 
        headers: {...corsHeaders, "Content-Type": "application/json"} 
      });
    }
    
    return new Response('kos-billing-hub ready. Routes: /create-subscription, /meter-usage, /webhook, /subscription-status', { 
      headers: corsHeaders 
    });
    
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"}
    });
  }
});
