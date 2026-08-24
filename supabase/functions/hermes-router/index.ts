import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RouterRequest {
  query: string
  context?: Record<string, unknown>
}

serve(async (req: Request) => {
  try {
    const { query, context } = (await req.json()) as RouterRequest

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 1. Load Hermes config
    const { data: hermes, error: hermesError } = await supabaseAdmin
      .from('kos_agents')
      .select('metadata')
      .eq('agent_code', 'hermes-orchestrator')
      .single()

    if (hermesError || !hermes?.metadata) {
      return new Response(
        JSON.stringify({
          error: 'Hermes orchestrator not configured',
          output: 'Hermes indisponible. Contactez votre administrateur.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const routing = (hermes.metadata as Record<string, unknown>).routing_rules as Record<string, string> | undefined

    // 2. Classification par keywords
    let targetCode = 'kos-research-lead'
    if (/bilan|p&l|cashflow|runway|ifrs|finance/i.test(query)) {
      targetCode = routing?.finance ?? 'genora-cfo'
    } else if (/soc2|iso\s*27001|audit|controle|rgpd/i.test(query)) {
      targetCode = routing?.compliance ?? 'bigfour-iso27001'
    } else if (/faille|hsts|csp|rls|incident|security/i.test(query)) {
      targetCode = routing?.security ?? 'bigfour-soc2'
    } else if (/iso\s*42001|ia\b|ai\b|hallucination|biais/i.test(query)) {
      targetCode = 'bigfour-iso42001'
    }

    // 3. Get target agent
    const { data: agent, error: agentError } = await supabaseAdmin
      .from('kos_agents')
      .select('*')
      .eq('agent_code', targetCode)
      .single()

    if (agentError || !agent) {
      return new Response(
        JSON.stringify({
          agent_name: 'Hermes',
          reason: 'Aucun agent cible trouve',
          output:
            'Aucun agent disponible pour cette requete. Escalade au Centre de Recherches KOS.',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    const riskLevel = (agent.metadata as Record<string, unknown>)?.risk_level as string | undefined

    // 4. ISO 42001: Human oversight if critical
    if (riskLevel === 'critical') {
      await supabaseAdmin.from('kos_human_reviews').insert({
        agent_code: targetCode,
        query,
        context: context ?? {},
        status: 'pending',
      })

      return new Response(
        JSON.stringify({
          agent_name: agent.name,
          reason: 'Escalade humaine requise — ISO 42001 Article 5.7.2',
          output:
            'Demande soumise a validation humaine. SLA: 4h. Reference: ' + targetCode,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 5. Log decision in kos_audit_trail
    const sessionId = crypto.randomUUID()
    await supabaseAdmin.from('kos_audit_trail').insert({
      session_id: sessionId,
      query,
      traces: {
        routing: {
          from: 'hermes-orchestrator',
          to: targetCode,
          reason: 'keyword_classification',
        },
        agent_metadata: {
          name: agent.name,
          role: agent.agent_role,
          risk_level: riskLevel,
        },
      },
      metadata: context ?? {},
    })

    // 6. Return routing decision
    return new Response(
      JSON.stringify({
        agent_name: agent.name,
        agent_code: targetCode,
        reason: 'Routage automatique par Hermes — classification par mots-cles',
        output: 'Requete routee vers ' + agent.name + ' (' + agent.agent_role + '). Pret pour execution.',
        routing_decision: {
          from: 'hermes-orchestrator',
          to: targetCode,
          method: 'keyword_classification',
        },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({
        error: message,
        output: 'Erreur interne Hermes. Escalade manuelle recommandee.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})