import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BRAND = {
  primary: '#c19a6b',
  secondary: '#1a1a1a',
  text: '#1a1a1a',
  textLight: '#9a9a9a',
  textMuted: '#6b6b6b',
  border: '#e5e3df',
  surface: '#ffffff',
  background: '#faf9f7',
  accent: '#0d9488',
};

const IDENTITY = {
  name: 'KHEPRA EXPERTS',
  tagline: 'Investment & ESG Advisory Boutique',
  phone: '+33 1 83 64 05 75',
  email: 'contact@khepraexperts.com',
  website: 'khepraexperts.com',
  address: '26 Rue de la Comète, 75007 Paris',
  siren: '882 567 432',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const { leadId, proposalType, title, amount, durationDays, description, deliverables, scope, terms } = await req.json();

    if (!leadId || !proposalType || !title) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { data: lead } = await supabase
      .from('leads')
      .select('id, full_name, email, organization, phone, position, country, sector, subject, message')
      .eq('id', leadId)
      .single();

    if (!lead) {
      return new Response(JSON.stringify({ error: 'Lead not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const now = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const proposalId = crypto.randomUUID();
    const currency = 'EUR';
    const clientName = lead.full_name || 'Client';
    const clientOrg = lead.organization || 'Organisation';
    const clientEmail = lead.email || '';
    const clientPhone = lead.phone || '';
    const clientPosition = lead.position || '';
    const clientCountry = lead.country || '';
    const clientSector = lead.sector || '';

    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proposition ${title} — ${clientOrg}</title>
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: ${BRAND.text}; line-height: 1.6; max-width: 210mm; margin: 0 auto; padding: 20mm; background: ${BRAND.surface}; }
  .header { text-align: center; border-bottom: 3px solid ${BRAND.primary}; padding-bottom: 20px; margin-bottom: 30px; }
  .header h1 { font-size: 24px; color: ${BRAND.secondary}; margin: 0 0 8px; font-weight: 700; }
  .header .subtitle { font-size: 14px; color: ${BRAND.textMuted}; margin: 0; }
  .logo { font-size: 18px; font-weight: 800; color: ${BRAND.primary}; letter-spacing: 2px; margin-bottom: 12px; }
  .logo-sub { font-size: 10px; color: ${BRAND.textLight}; letter-spacing: 2px; margin-bottom: 8px; text-transform: uppercase; }
  .meta { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 13px; }
  .meta-box { background: ${BRAND.background}; padding: 15px; border-radius: 8px; flex: 1; border: 1px solid ${BRAND.border}; }
  .meta-box + .meta-box { margin-left: 15px; }
  .meta-box h3 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; color: ${BRAND.textLight}; letter-spacing: 1px; }
  .meta-box p { margin: 0; font-weight: 600; }
  h2 { font-size: 16px; color: ${BRAND.primary}; border-left: 4px solid ${BRAND.primary}; padding-left: 12px; margin: 30px 0 15px; font-weight: 700; }
  .scope { background: ${BRAND.background}; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid ${BRAND.border}; }
  .scope ul { margin: 0; padding-left: 20px; }
  .scope li { margin-bottom: 8px; }
  .deliverables { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
  .deliverable { background: ${BRAND.background}; padding: 12px; border-radius: 6px; font-size: 13px; border: 1px solid ${BRAND.border}; }
  .deliverable strong { display: block; margin-bottom: 4px; color: ${BRAND.primary}; }
  .pricing { background: ${BRAND.secondary}; color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0; }
  .pricing .amount { font-size: 36px; font-weight: 800; color: ${BRAND.primary}; }
  .pricing .detail { font-size: 13px; opacity: 0.8; margin-top: 8px; }
  .terms { font-size: 12px; color: ${BRAND.textMuted}; border-top: 1px solid ${BRAND.border}; padding-top: 20px; margin-top: 30px; }
  .signature { display: flex; justify-content: space-between; margin-top: 50px; }
  .signature-box { width: 45%; border-top: 2px solid ${BRAND.secondary}; padding-top: 15px; }
  .signature-box h4 { margin: 0 0 5px; font-size: 14px; }
  .signature-box p { margin: 0; font-size: 12px; color: ${BRAND.textMuted}; }
  .footer { text-align: center; font-size: 11px; color: ${BRAND.textLight}; margin-top: 40px; padding-top: 20px; border-top: 1px solid ${BRAND.border}; }
  .badge { display: inline-block; background: ${BRAND.primary}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-bottom: 15px; }
  .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 120px; font-weight: 900; color: rgba(193, 154, 107, 0.04); pointer-events: none; z-index: 0; letter-spacing: 8px; }
  .print-btn { display: none; }
  @media print { .print-btn { display: none !important; } }
  @media screen { .print-btn { display: block; position: fixed; bottom: 20px; right: 20px; background: ${BRAND.primary}; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; cursor: pointer; font-weight: 600; } }
</style>
</head>
<body>
  <div class="watermark">KHEPRA</div>

  <div class="header">
    <div class="logo">KHEPRA EXPERTS</div>
    <div class="logo-sub">Investment & ESG Advisory Boutique</div>
    <h1>${title}</h1>
    <p class="subtitle">Proposition commerciale — Réf. ${proposalId.slice(0, 8).toUpperCase()}</p>
  </div>

  <div class="meta">
    <div class="meta-box">
      <h3>Client</h3>
      <p>${clientName}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${clientOrg}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${clientEmail}</p>
      ${clientPhone ? `<p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${clientPhone}</p>` : ''}
      ${clientPosition ? `<p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${clientPosition}</p>` : ''}
      ${clientCountry ? `<p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${clientCountry}</p>` : ''}
      ${clientSector ? `<p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">Secteur : ${clientSector}</p>` : ''}
    </div>
    <div class="meta-box">
      <h3>Proposition</h3>
      <p>Type : ${proposalType}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">Date : ${now}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">Durée : ${durationDays || '—'} jours</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">Référence : ${proposalId.slice(0, 8).toUpperCase()}</p>
    </div>
    <div class="meta-box">
      <h3>Consultant</h3>
      <p>KHEPRA EXPERTS</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${IDENTITY.email}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${IDENTITY.phone}</p>
      <p style="font-weight:400;color:${BRAND.textMuted};margin-top:4px;">${IDENTITY.address}</p>
    </div>
  </div>

  <span class="badge">PROPOSITION CONFIDENTIELLE</span>

  <h2>1. Contexte & Objectifs</h2>
  <p>${description || 'Suite à notre échange, nous avons identifié les besoins spécifiques de ' + clientOrg + ' et élaboré une proposition de mission adaptée aux enjeux réglementaires et stratégiques de votre organisation.'}</p>

  <h2>2. Périmètre de la mission</h2>
  <div class="scope">
    <ul>
      ${scope ? scope.split('\n').map(s => `<li>${s.trim()}</li>`).join('') : `<li>Analyse diagnostique approfondie de l'environnement réglementaire</li><li>Évaluation des pratiques actuelles et identification des écarts</li><li>Élaboration de recommandations structurées et priorisées</li><li>Plan de mise en conformité avec échéancier</li>`}
    </ul>
  </div>

  <h2>3. Livrables</h2>
  <div class="deliverables">
    ${deliverables && deliverables.length > 0 ? deliverables.map((d, i) => `<div class="deliverable"><strong>Livrable ${i + 1}</strong>${d}</div>`).join('') : `<div class="deliverable"><strong>Rapport diagnostic</strong>Analyse détaillée avec cartographie des risques</div><div class="deliverable"><strong>Plan d'action</strong>Feuille de route avec échéancier et responsables</div><div class="deliverable"><strong>Recommandations</strong>Propositions structurées et priorisées</div><div class="deliverable"><strong>Présentation</strong>Restitution aux décideurs (2h)</div>`}
  </div>

  <h2>4. Méthodologie</h2>
  <p>Notre approche s'appuie sur les standards internationaux (BCEAO, COBAC, IFC, GRI, ISSB) et les meilleures pratiques du marché. Chaque phase est validée avec vos équipes pour garantir l'alignement stratégique. Notre méthodologie repose sur 4 phases : Diagnostic, Analyse, Recommandation et Déploiement.</p>

  <h2>5. Investissement</h2>
  <div class="pricing">
    <div class="amount">${amount ? amount.toLocaleString('fr-FR') : '—'} ${currency}</div>
    <div class="detail">${durationDays ? `Durée estimée : ${durationDays} jours ouvrés` : 'Hors frais de déplacement et taxes applicables'}</div>
    <div class="detail" style="margin-top:12px;">Hors frais de déplacement • Taxes applicables selon localisation</div>
  </div>

  <h2>6. Conditions</h2>
  <div class="terms">
    <p>${terms || 'Paiement : 50% à la signature, 50% à la livraison des livrables finaux. Confidentialité stricte des informations échangées. Proposition valable 30 jours à compter de la date d\'émission.'}</p>
  </div>

  <div class="signature">
    <div class="signature-box">
      <h4>Pour le client</h4>
      <p>${clientName}</p>
      <p>${clientOrg}</p>
      <p style="margin-top:15px;font-size:11px;color:${BRAND.textLight};">Date : _______________</p>
      <p style="margin-top:10px;font-size:11px;color:${BRAND.textLight};">Signature : _______________</p>
    </div>
    <div class="signature-box">
      <h4>Pour KHEPRA EXPERTS</h4>
      <p>Directeur Général</p>
      <p>KHEPRA EXPERTS</p>
      <p style="margin-top:15px;font-size:11px;color:${BRAND.textLight};">Date : _______________</p>
      <p style="margin-top:10px;font-size:11px;color:${BRAND.textLight};">Signature : _______________</p>
    </div>
  </div>

  <div class="footer">
    <p>KHEPRA EXPERTS — ${IDENTITY.address} — SIREN ${IDENTITY.siren}</p>
    <p>${IDENTITY.email} | ${IDENTITY.phone} | ${IDENTITY.website}</p>
    <p style="margin-top:8px;font-size:10px;">Proposition confidentielle — Strictement réservée à ${clientOrg}</p>
  </div>

  <button class="print-btn" onclick="window.print()">🖨️ Imprimer / Enregistrer PDF</button>
</body>
</html>`;

    const { data: proposal, error: insertError } = await supabase
      .from('proposals')
      .insert({
        id: proposalId,
        lead_id: leadId,
        title,
        client_name: clientName,
        client_email: clientEmail,
        client_organization: clientOrg,
        type: proposalType,
        status: 'draft',
        amount,
        currency,
        duration_days: durationDays,
        description,
        scope,
        deliverables: deliverables || [],
        terms,
        template_used: proposalType,
        custom_fields: { html_preview: htmlContent.slice(0, 1000), branding: 'KHEPRA Premium' },
      })
      .select()
      .single();

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    await supabase.from('lead_activities').insert({
      lead_id: leadId,
      activity_type: 'proposal_sent',
      metadata: { proposal_id: proposalId, title, amount, status: 'draft', branding: 'KHEPRA Premium' },
    });

    await supabase.from('leads').update({
      pipeline_stage: 'proposal_sent',
      last_activity_at: new Date().toISOString(),
    }).eq('id', leadId);

    return new Response(JSON.stringify({
      success: true,
      proposalId,
      htmlContent,
      lead: { full_name: clientName, organization: clientOrg, email: clientEmail },
      branding: 'KHEPRA Premium',
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
