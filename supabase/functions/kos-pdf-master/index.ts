import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }
const BRAND = { primary: '#c19a6b', secondary: '#1a1a1a', text: '#1a1a1a', textLight: '#9a9a9a', textMuted: '#6b6b6b', border: '#e5e3df', surface: '#ffffff', background: '#faf9f7', accent: '#0d9488' }

function buildProposalHTML(lead: any, data: any): string {
  const { proposalId, title, amount, durationDays, description, deliverables, scope, terms } = data
  const currency = 'EUR'; const now = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const clientName = lead.full_name || 'Client'; const clientOrg = lead.organization || 'Organisation'
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Proposition ${title} — ${clientOrg}</title>
<style>@page{size:A4;margin:20mm}body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;line-height:1.6;max-width:210mm;margin:0 auto;padding:20mm;background:#fff}.header{text-align:center;border-bottom:3px solid #c19a6b;padding-bottom:20px;margin-bottom:30px}.header h1{font-size:24px;color:#1a1a1a;margin:0 0 8px}.logo{font-size:18px;font-weight:800;color:#c19a6b;letter-spacing:2px;margin-bottom:12px}.logo-sub{font-size:10px;color:#9a9a9a;letter-spacing:2px;text-transform:uppercase}.meta{display:flex;justify-content:space-between;margin-bottom:30px;font-size:13px;gap:15px}.meta-box{background:#faf9f7;padding:15px;border-radius:8px;flex:1;border:1px solid #e5e3df}.meta-box h3{margin:0 0 8px;font-size:12px;text-transform:uppercase;color:#9a9a9a}.meta-box p{margin:0;font-weight:600}h2{font-size:16px;color:#c19a6b;border-left:4px solid #c19a6b;padding-left:12px;margin:30px 0 15px;font-weight:700}.pricing{background:#1a1a1a;color:white;padding:25px;border-radius:8px;text-align:center;margin:30px 0}.pricing .amount{font-size:36px;font-weight:800;color:#c19a6b}.badge{display:inline-block;background:#c19a6b;color:white;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;margin-bottom:15px}.footer{text-align:center;font-size:11px;color:#9a9a9a;margin-top:40px;padding-top:20px;border-top:1px solid #e5e3df}.watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-45deg);font-size:120px;font-weight:900;color:rgba(193,154,107,0.04);pointer-events:none;z-index:0}</style></head>
<body><div class="watermark">KHEPRA</div><div class="header"><div class="logo">KHEPRA EXPERTS</div><div class="logo-sub">Investment & ESG Advisory Boutique</div><h1>${title}</h1><p style="font-size:14px;color:#6b6b6b">Proposition commerciale — Réf. ${(proposalId || 'KOS').slice(0,8).toUpperCase()} — ${now}</p></div>
<div class="meta"><div class="meta-box"><h3>Client</h3><p>${clientName}</p><p style="font-weight:400;color:#6b6b6b;margin-top:4px">${clientOrg}</p>${lead.email ? `<p style="font-weight:400;color:#6b6b6b;margin-top:4px">${lead.email}</p>` : ''}</div>
<div class="meta-box"><h3>Proposition</h3><p>Durée : ${durationDays || '—'} jours</p><p style="font-weight:400;color:#6b6b6b;margin-top:4px">Réf : ${(proposalId || '').slice(0,8).toUpperCase()}</p></div>
<div class="meta-box"><h3>Consultant</h3><p>KHEPRA EXPERTS</p><p style="font-weight:400;color:#6b6b6b;margin-top:4px">contact@khepraexperts.com</p><p style="font-weight:400;color:#6b6b6b;margin-top:4px">+33 1 83 64 05 75</p></div></div>
<span class="badge">PROPOSITION CONFIDENTIELLE</span>
<h2>1. Contexte & Objectifs</h2><p>${description || 'Suite à notre échange, nous avons identifié les besoins spécifiques de '+clientOrg+' et élaboré une proposition de mission adaptée.'}</p>
<h2>2. Périmètre</h2><p>${scope || 'Analyse diagnostique approfondie · Évaluation des pratiques · Recommandations structurées · Plan de mise en conformité'}</p>
<h2>3. Livrables</h2>${deliverables && deliverables.length > 0 ? '<ul>'+deliverables.map((d: string) => `<li>${d}</li>`).join('')+'</ul>' : '<ul><li>Rapport diagnostic</li><li>Plan d\'action</li><li>Recommandations</li><li>Présentation décideurs</li></ul>'}
<h2>4. Investissement</h2><div class="pricing"><div class="amount">${amount ? amount.toLocaleString('fr-FR') : '—'} ${currency}</div><p style="font-size:13px;opacity:0.8;margin-top:8px">${durationDays ? `Durée estimée : ${durationDays} jours ouvrés` : 'Hors frais de déplacement et taxes'}</p></div>
<h2>5. Conditions</h2><p style="font-size:12px;color:#6b6b6b">${terms || 'Paiement : 50% à la signature, 50% à la livraison. Confidentialité stricte. Proposition valable 30 jours.'}</p>
<div class="footer"><p>KHEPRA EXPERTS — 26 Rue de la Comète, 75007 Paris — SIREN 882 567 432</p><p>contact@khepraexperts.com | +33 1 83 64 05 75 | khepraexperts.com</p></div></body></html>`
}

function getRAGInfo(ratio: number) {
  if (ratio >= 11.5) return { statut_rag: "green", statut_label: "CONFORME", statut_color: "#059669" }
  if (ratio >= 10.0) return { statut_rag: "amber", statut_label: "SURVEILLANCE", statut_color: "#D97706" }
  if (ratio >= 8.0) return { statut_rag: "amber", statut_label: "ALERTE", statut_color: "#E8C547" }
  return { statut_rag: "red", statut_label: "NON CONFORME", statut_color: "#DC2626" }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '')
    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'proposal'
    
    if (action === 'health') return new Response(JSON.stringify({ status: 'ok', engine: 'kos-pdf-master-v1', actions: ['health','proposal','solvabilite_report'] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const body = await req.json()
    
    // ─── PROPOSAL ───
    if (action === 'proposal') {
      const { leadId, proposalType, title, amount, durationDays, description, deliverables, scope, terms } = body
      if (!leadId || !title) return new Response(JSON.stringify({ error: 'leadId and title required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const { data: lead } = await supabase.from('leads').select('*').eq('id', leadId).single()
      if (!lead) return new Response(JSON.stringify({ error: 'Lead not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const proposalId = crypto.randomUUID()
      const htmlContent = buildProposalHTML(lead, { proposalId, proposalType, title, amount, durationDays, description, deliverables, scope, terms })
      const { error: insertError } = await supabase.from('proposals').insert({ id: proposalId, lead_id: leadId, title, client_name: lead.full_name, client_email: lead.email, client_organization: lead.organization, type: proposalType || 'advisory', status: 'draft', amount, duration_days: durationDays, description, scope, deliverables: deliverables || [], terms, custom_fields: { html_preview: htmlContent.slice(0, 1000) } })
      if (insertError) return new Response(JSON.stringify({ error: insertError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      return new Response(JSON.stringify({ success: true, proposalId, htmlContent, lead: { full_name: lead.full_name, organization: lead.organization, email: lead.email } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    
    // ─── SOLVABILITE_REPORT ───
    if (action === 'solvabilite_report') {
      const data = body.data || {}
      const ratio = Number(data.ratio) || 0
      const rag = getRAGInfo(ratio)
      const companyName = String(data.company_name || data.company || "Institution Financière")
      const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Rapport Solvabilité BCEAO - ${companyName}</title>
<style>body{font-family:'Inter',Arial,sans-serif;color:#111827;line-height:1.6;max-width:800px;margin:0 auto;padding:44px}.header{border-bottom:3px solid ${rag.statut_color};padding-bottom:20px;margin-bottom:30px}.score-card{text-align:center;padding:30px;margin-bottom:25px;border-radius:16px;background:${rag.statut_color}08;border:2px solid ${rag.statut_color}30}.score-circle{width:140px;height:140px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 16px;border:4px solid ${rag.statut_color}}.score-value{font-size:44px;font-weight:800;color:${rag.statut_color}}.section{margin-bottom:24px}h2{font-size:14px;color:#374151;text-transform:uppercase;border-bottom:1px solid #E5E7EB;padding-bottom:8px;margin-bottom:14px}.card{background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:18px 20px;margin-bottom:14px}.action-item{padding:14px 16px;margin-bottom:8px;border-left:4px solid ${rag.statut_color};background:#F9FAFB;border-radius:0 8px 8px 0}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #E5E7EB;text-align:center;font-size:10px;color:#9CA3AF}.watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-25deg);font-size:120px;font-weight:800;color:${rag.statut_color}06;pointer-events:none}</style></head>
<body><div class="watermark">KHEPRA</div><div class="header"><h1 style="font-size:26px">Rapport Simulation — Dispositif Prudentiel BCEAO 2026</h1><p style="color:#6B7280">Institution : ${companyName} · Date : ${new Date().toLocaleDateString('fr-FR')}</p></div>
<div class="score-card"><div class="score-circle"><div class="score-value">${ratio.toFixed(1)}%</div><div style="font-size:12px;color:${rag.statut_color}">Ratio Solvabilité</div></div><p style="font-weight:600;color:${rag.statut_color}">${rag.statut_label} — Seuil systémique 11.5%</p></div>
<div class="section"><h2>Positionnement vs Seuils</h2><div class="card"><div style="display:flex;gap:8px"><div style="flex:1;text-align:center;padding:10px;background:#FEF2F2;border-radius:8px"><strong style="color:#DC2626">8%</strong><br/><small>Minimum</small></div><div style="flex:1;text-align:center;padding:10px;background:#FFFBEB;border-radius:8px"><strong style="color:#D97706">10%</strong><br/><small>Standard</small></div><div style="flex:1;text-align:center;padding:10px;background:#ECFDF5;border-radius:8px"><strong style="color:#059669">11.5%</strong><br/><small>Systémique</small></div></div></div></div>
<div class="section"><h2>Sources Réglementaires</h2><div class="card"><ol style="font-size:12px"><li>BCEAO — Dispositif Prudentiel applicable aux Établissements de Crédit UMOA — Art.14</li><li>BCEAO — Instruction n°008-05-2015 relative aux Fonds Propres Réglementaires</li><li>BCEAO — Circulaire 01-2017/CB/C — Pondération des Risques de Crédit Bâle II/III</li><li>Commission Bancaire UMOA — Rapport Annuel 2025</li><li>Khepra — Retour terrain 12 missions IMF UEMOA 2024-2026</li></ol></div></div>
<div class="footer"><p>Rapport généré par KOS PDF Master™ · KHEPRA EXPERTS © 2026</p><p>Ce document est une simulation réglementaire non engageante. Ne constitue pas un conseil personnalisé.</p></div></body></html>`
      return new Response(html, { headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8', 'X-PDF-Template': 'solvabilite_bceao_2026' } })
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}`, available: ['proposal','solvabilite_report','health'] }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (err) { return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }) }
})