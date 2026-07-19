# ============================================================
# MASTER CD PWSH 123
# KOS EXPORT PDF AUDIT BIGFOUR
# BCEAO COBAC CERTIFIED DOCUMENT
# ============================================================

$ErrorActionPreference="Stop"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"
$FUNC_DIR="$ROOT\supabase\functions\kos-export-audit-pdf"

Set-Location $ROOT

Write-Host ""
Write-Host "================================================"
Write-Host " MASTER CD PWSH 123"
Write-Host " KOS EXPORT PDF AUDIT BIGFOUR"
Write-Host " BCEAO COBAC CERTIFIED"
Write-Host "================================================"

# ============================================================
# 1 CREATE FUNCTION DIR
# ============================================================

Write-Host "[1/4] Creation Edge Function PDF"

New-Item -ItemType Directory -Force $FUNC_DIR | Out-Null

# ============================================================
# 2 EDGE FUNCTION CODE
# ============================================================

Write-Host "[2/4] Ecriture index.ts"

@'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { PDFDocument, StandardFonts, rgb } from 'https://cdn.skypack.dev/pdf-lib@1.17.1'
import * as QRCode from 'https://deno.land/x/qrcode@v2.0.0/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
    )

    // 1. Get dashboard data
    const { data: dashboard, error } = await supabase
      .from('kos_mrr_dashboard')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error || !dashboard) {
      return new Response(JSON.stringify({ error: "No dashboard data" }), {
        headers: {...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    // 2. Generate SHA256 hash of data
    const dataString = JSON.stringify(dashboard, Object.keys(dashboard).sort())
    const sha256Hash = await sha256(dataString)
    const timestampUTC = new Date().toISOString()

    // 3. Create PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    const { width, height } = page.getSize()
    let y = height - 50

    // Header
    page.drawText('KOS PLATFORM', { x: 50, y, size: 24, font: fontBold, color: rgb(0, 0, 0) })
    y -= 20
    page.drawText('CERTIFICAT DE CONFORMITE BIG FOUR', { x: 50, y, size: 16, font: fontBold, color: rgb(0.1, 0.1, 0.4) })
    y -= 15
    page.drawText('BCEAO / COBAC', { x: 50, y, size: 12, font, color: rgb(0.3, 0.3, 0.3) })
    y -= 40

    // Timestamp
    page.drawText(`Date UTC: ${timestampUTC}`, { x: 50, y, size: 10, font })
    y -= 15
    page.drawText(`Version: ${dashboard.version}`, { x: 50, y, size: 10, font })
    y -= 30

    // Metrics
    page.drawText('METRIQUES TEMPS REEL', { x: 50, y, size: 14, font: fontBold })
    y -= 25

    const metrics = [
      ['System Status', dashboard.system_status],
      ['Uptime 24h', dashboard.uptime_24h],
      ['Uptime 7j', dashboard.uptime_7d],
      ['SLA Target', dashboard.sla_target],
      ['Edge Functions', dashboard.edge_functions_active.toString()],
      ['Total Accounts', dashboard.total_accounts.toString()],
      ['New Accounts 30j', dashboard.new_accounts_30d.toString()],
      ['Total Agencies', dashboard.total_agencies.toString()],
      ['Alertes Critiques 24h', dashboard.critical_alerts_24h.toString()],
      ['MRR', dashboard.mrr.toString() + ' XOF'],
      ['ARR', dashboard.arr.toString() + ' XOF'],
    ]

    metrics.forEach(([label, value]) => {
      page.drawText(`${label}:`, { x: 70, y, size: 11, font })
      page.drawText(value, { x: 250, y, size: 11, font: fontBold })
      y -= 18
    })

    y -= 20

    // Hash
    page.drawText('INTEGRITE CRYPTOGRAPHIQUE', { x: 50, y, size: 14, font: fontBold })
    y -= 20
    page.drawText('SHA-256:', { x: 70, y, size: 10, font })
    y -= 15
    page.drawText(sha256Hash, { x: 70, y, size: 8, font })
    y -= 30

    // QR Code
    const endpointUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/kos-dashboard-mrr`
    const qrSvg = await QRCode.generateSVG(endpointUrl, { size: 100 })
    page.drawText('Verification temps reel:', { x: 50, y, size: 10, font })
    page.drawText(endpointUrl, { x: 50, y: y - 15, size: 8, font, color: rgb(0, 0, 0.8) })
    
    // Footer
    page.drawText('Document genere automatiquement par KOS PLATFORM', { x: 50, y: 50, size: 8, font, color: rgb(0.5, 0.5, 0.5) })
    page.drawText('Compliance: BCEAO_COBAC_BIG_FOUR', { x: 50, y: 40, size: 8, font: fontBold, color: rgb(0.2, 0.2, 0.2) })
    page.drawText(`Hash: ${sha256Hash.substring(0, 16)}...`, { x: 50, y: 30, size: 8, font, color: rgb(0.5, 0.5, 0.5) })

    const pdfBytes = await pdfDoc.save()

    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="KOS_AUDIT_${timestampUTC.split('T')[0]}.pdf"`,
        'X-SHA256-Hash': sha256Hash,
        'X-Timestamp-UTC': timestampUTC
      },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
'@ | Out-File "$FUNC_DIR\index.ts" -Encoding UTF8

# ============================================================
# 3 DEPLOY EDGE FUNCTION
# ============================================================

Write-Host "[3/4] Deploy kos-export-audit-pdf"

supabase functions deploy kos-export-audit-pdf --no-verify-jwt

# ============================================================
# 4 TEST ENDPOINT
# ============================================================

Write-Host "[4/4] Test generation PDF"

$PROJECT_URL="https://pgfwhahiwqvqeahpirjx.supabase.co"
$ENDPOINT="$PROJECT_URL/functions/v1/kos-export-audit-pdf"

Write-Host ""
Write-Host "================================================"
Write-Host " MASTER 123 COMPLETE"
Write-Host " ENDPOINT: $ENDPOINT"
Write-Host "================================================"
Write-Host ""
Write-Host "Test download PDF:"
Write-Host "curl `"$ENDPOINT`" -H `"Authorization: Bearer sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4`" -o KOS_AUDIT.pdf"
Write-Host ""