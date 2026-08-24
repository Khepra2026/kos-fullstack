import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
  )

  // 1. Get current metrics
  const { data: metrics } = await supabase
    .from('kos_mrr_dashboard')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (!metrics) {
    return new Response(JSON.stringify({ status: "no_data" }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  // 2. Check alert conditions Big Four
  const alerts = []
  const uptime24h = parseFloat(metrics.uptime_24h.replace('%', ''))
  
  if (metrics.system_status !== 'OPERATIONAL') {
    alerts.push({
      level: 'CRITICAL',
      message: `System Status: ${metrics.system_status}`,
      metric: 'system_status'
    })
  }
  
  if (metrics.critical_alerts_24h > 0) {
    alerts.push({
      level: 'CRITICAL', 
      message: `Critical Alerts 24h: ${metrics.critical_alerts_24h}`,
      metric: 'critical_alerts_24h'
    })
  }
  
  if (uptime24h < 99.9) {
    alerts.push({
      level: 'WARNING',
      message: `Uptime 24h: ${metrics.uptime_24h} < SLA 99.9%`,
      metric: 'uptime_24h'
    })
  }

  // 3. Send to webhooks if alerts
  const webhookUrl = Deno.env.get('ALERT_WEBHOOK_URL') // Discord/Slack URL
  let webhookStatus = 'disabled'
  
  if (alerts.length > 0 && webhookUrl) {
    const embed = {
      title: "🚨 KOS PLATFORM ALERT - BCEAO COBAC",
      color: alerts.some(a => a.level === 'CRITICAL') ? 15158332 : 16776960,
      fields: [
        { name: 'Status', value: metrics.system_status, inline: true },
        { name: 'Uptime 24h', value: metrics.uptime_24h, inline: true },
        { name: 'Uptime 7d', value: metrics.uptime_7d, inline: true },
        { name: 'Edge Functions', value: metrics.edge_functions_active.toString(), inline: true },
        { name: 'Accounts', value: metrics.total_accounts.toString(), inline: true },
        { name: 'Critical 24h', value: metrics.critical_alerts_24h.toString(), inline: true },
        { name: 'Alerts', value: alerts.map(a => `**${a.level}**: ${a.message}`).join('\n') },
        { name: 'Version', value: metrics.version, inline: true },
        { name: 'Timestamp UTC', value: metrics.timestamp, inline: true },
        { name: 'Compliance', value: metrics.compliance, inline: true }
      ],
      footer: { text: 'KOS Monitoring Big Four' },
      timestamp: new Date().toISOString()
    }

    const payload = {
      content: alerts.some(a => a.level === 'CRITICAL') ? '@everyone' : null,
      embeds: [embed]
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      webhookStatus = res.ok ? 'sent' : 'failed'
    } catch {
      webhookStatus = 'error'
    }
  }

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    alerts_count: alerts.length,
    alerts: alerts,
    webhook_status: webhookStatus,
    system_status: metrics.system_status,
    compliance: 'BCEAO_COBAC_BIG_FOUR'
  }), {
    headers: {...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})
