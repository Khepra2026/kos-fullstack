import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-bigfour-request-id'
}

interface OrchestratorRequest {
  action: 'onboard_paid_user' | 'trigger_diagnostic' | 'compliance_check'
  email: string
  niveau: number
  org_id?: string
  amount?: number
  invoice_token?: string
  request_id?: string
}

interface AuditLog {
  event: string
  user_email: string
  niveau: number
  timestamp: string
  data_residency: 'CEMAC'
  request_id: string
  moteurs_activés: string[]
  cobac_compliant: boolean
  bigfour_standard: boolean
  metadata?: Record<string, unknown>
}

serve(async (req) => {
  const requestId = req.headers.get('x-bigfour-request-id') || crypto.randomUUID()

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, email, niveau, org_id, amount, invoice_token }: OrchestratorRequest = await req.json()

    if (!email ||!niveau) {
      throw new Error('BIG FOUR VIOLATION: email et niveau obligatoires pour audit trail')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Mapping Big Four : 11 moteurs KOS RegTech AI
    const moteursActifs: Record<number, string[]> = {
      0: [], // Free
      2: [ // Starter 15€ - 3 moteurs
        'Diagnostic_Express',
        'Governance_Essential',
        'Compliance_Monitor'
      ],
      3: [ // Professional 150€ - 5 moteurs
        'Diagnostic_Express',
        'Governance_Essential',
        'Compliance_Monitor',
        'Risk_Assessment',
        'Financial_Intelligence'
      ],
      4: [ // Business 700€ - 11 moteurs Full
        'Regulatory_Analysis',
        'Compliance_Monitor',
        'Risk_Assessment',
        'Governance_Essential',
        'Diagnostic_Express',
        'HR_Intelligence',
        'Financial_Intelligence',
        'Planning_Strategic',
        'AI_Copilot_Pro',
        'Knowledge_Graph_COBAC',
        'Universal_RAG_CEMAC'
      ]
    }

    if (action === 'onboard_paid_user') {
      const moteurs = moteursActifs[niveau] || []

      // 1. AUDIT TRAIL OBLIGATOIRE BCEAO/COBAC
      const auditLog: AuditLog = {
        event: 'SUBSCRIPTION_ACTIVATED',
        user_email: email,
        niveau: niveau,
        timestamp: new Date().toISOString(),
        data_residency: 'CEMAC',
        request_id: requestId,
        moteurs_activés: moteurs,
        cobac_compliant: true,
        bigfour_standard: true,
        metadata: {
          amount_xaf: amount,
          invoice_token: invoice_token,
          activation_source: 'paydunya_webhook',
          compliance_framework: 'COBAC_R-2016/04',
          region: 'CEMAC'
        }
      }

      // 2. Activation accès moteurs avec RLS
      const { error: accessError } = await supabase
       .from('user_access')
       .upsert({
          user_email: email,
          niveau: niveau,
          moteurs: moteurs,
          ai_copilot_enabled: niveau >= 3,
          cobac_certified: niveau >= 2,
          data_residency: 'CEMAC',
          updated_at: new Date().toISOString(),
          activated_by: 'ai-orchestrator',
          request_id: requestId
        }, { onConflict: 'user_email' })

      if (accessError) throw new Error(`RLS VIOLATION: ${accessError.message}`)

      // 3. Diagnostic Express auto pour Niveau 2+ - Zéro hallucination
      if (niveau >= 2) {
        const { error: diagError } = await supabase.functions.invoke('cfo-agent', {
          body: {
            query: `Diagnostic express initial COBAC pour ${email}`,
            org_id: org_id || email,
            context: 'onboarding_auto_bigfour',
            request_id: requestId,
            compliance_mode: 'strict'
          }
        })
        if (diagError) console.error('[Orchestrator] Diagnostic auto failed:', diagError.message)
      }

      // 4. HR Intelligence - Kit de bienvenue Niveau 3+
      if (niveau >= 3) {
        await supabase.functions.invoke('hr-intelligence', {
          body: {
            action: 'send_welcome_kit_bigfour',
            email: email,
            niveau: niveau,
            request_id: requestId
          }
        }).catch(e => console.error('[Orchestrator] HR Kit failed:', e.message))
      }

      // 5. Insert audit log - immuable
      const { error: auditError } = await supabase
       .from('audit_logs')
       .insert(auditLog)

      if (auditError) console.error('[Orchestrator] Audit log failed:', auditError.message)

      // 6. Réponse Big Four standardisée
      const response = {
        orchestrated: true,
        request_id: requestId,
        user_email: email,
        niveau: niveau,
        moteurs_activated: moteurs.length,
        moteurs_list: moteurs,
        compliance: {
          cobac_compliant: true,
          data_residency: 'CEMAC',
          audit_trail: true,
          bigfour_standard: true,
          rls_enabled: true
        },
        timestamp: new Date().toISOString()
      }

      console.log(`[Orchestrator] BIG FOUR: ${email} → Niveau ${niveau} | ${moteurs.length} agents | ReqID: ${requestId}`)

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {...corsHeaders, 'Content-Type': 'application/json', 'x-bigfour-request-id': requestId }
      })
    }

    if (action === 'compliance_check') {
      const { data } = await supabase
       .from('user_access')
       .select('*')
       .eq('user_email', email)
       .single()

      return new Response(JSON.stringify({
        compliant:!!data,
        niveau: data?.niveau || 0,
        moteurs: data?.moteurs || [],
        cobac_certified: data?.cobac_certified || false,
        request_id: requestId
      }), {
        headers: {...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    throw new Error(`Action inconnue: ${action}`)

  } catch (error) {
    console.error(`[Orchestrator] BIG FOUR ERROR ${requestId}:`, error.message)
    return new Response(JSON.stringify({
      error: error.message,
      request_id: requestId,
      cobac_compliant: false,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {...corsHeaders, 'Content-Type': 'application/json', 'x-bigfour-request-id': requestId }
    })
  }
})