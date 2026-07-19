import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { PDFDocument, rgb, StandardFonts } from 'https://esm.sh/pdf-lib@1.17.1'
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"

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

  // 1. Récupère les métriques
  const { data: metrics } = await supabase
    .from('kos_mrr_dashboard')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (!metrics) {
    return new Response(JSON.stringify({ error: "No dashboard data" }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 404,
    })
  }

  // 2. Génère le PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842]) // A4
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const { width, height } = page.getSize()
  let y = height - 50

  // Header
  page.drawText('KOS AUDIT REPORT BIG FOUR', { x: 50, y, size: 20, font, color: rgb(0, 0, 0) })
  y -= 30
  page.drawText('BCEAO / COBAC CERTIFIED', { x: 50, y, size: 12, font: fontRegular, color: rgb(0.2, 0.2, 0.2) })
  y -= 40

  // Métriques
  const lines = [
    `Timestamp UTC: ${metrics.timestamp}`,
    `System Status: ${metrics.system_status}`,
    `Uptime 24h: ${metrics.uptime_24h}`,
    `Uptime 7d: ${metrics.uptime_7d}`,
    `Edge Functions Active: ${metrics.edge_functions_active}`,
    `Total Accounts: ${metrics.total_accounts}`,
    `New Accounts 30d: ${metrics.new_accounts_30d}`,
    `Critical Alerts 24h: ${metrics.critical_alerts_24h}`,
    `SLA Target: ${metrics.sla_target}`,
    `Compliance: ${metrics.compliance}`,
    `Version: ${metrics.version}`,
  ]

  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 10, font: fontRegular })
    y -= 20
  }

  // Hash SHA256 du contenu
  const contentHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(metrics)))
  const hashHex = Array.from(new Uint8Array(contentHash)).map(b => b.toString(16).padStart(2, '0')).join('')
  
  y -= 20
  page.drawText(`SHA256: ${hashHex.substring(0, 64)}`, { x: 50, y, size: 8, font: fontRegular, color: rgb(0.3, 0.3, 0.3) })
  y -= 12
  page.drawText(`${hashHex.substring(64)}`, { x: 50, y, size: 8, font: fontRegular, color: rgb(0.3, 0.3, 0.3) })

  // Footer
  y = 50
  page.drawText(`Endpoint: https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-dashboard-mrr`, { 
    x: 50, y, size: 8, font: fontRegular, color: rgb(0, 0, 0.6) 
  })

  const pdfBytes = await pdfDoc.save()

  return new Response(pdfBytes, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="KOS_AUDIT_${new Date().toISOString().slice(0,10)}.pdf"`
    },
    status: 200,
  })
})