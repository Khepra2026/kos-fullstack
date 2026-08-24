import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// ─── KHEPRA BRAND CONFIG ───
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
  website: 'https://khepraexperts.com',
  address: '26 Rue de la Comète, 75007 Paris',
  siren: '882 567 432',
};

function wrapEmail(htmlBody: string, options: { includeUnsubscribe?: boolean; unsubscribeUrl?: string; includeCalendar?: boolean } = {}): string {
  const { includeUnsubscribe = true, unsubscribeUrl = '', includeCalendar = true } = options;
  const calendarLink = 'https://calendly.com/khepra-experts/diagnostic-strategique';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 640px) {
    .khepra-wrapper { width: 100% !important; }
    .khepra-content { padding: 24px 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${BRAND.background};font-family:Helvetica Neue,Arial,sans-serif;line-height:1.6;color:${BRAND.text};">
  <div class="khepra-wrapper" style="max-width:640px;margin:0 auto;padding:20px;">
    <div style="max-width:640px;margin:0 auto;background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      <div style="padding:28px 32px;border-bottom:3px solid ${BRAND.primary};text-align:center;background:${BRAND.secondary};">
        <div style="font-size:22px;font-weight:800;color:${BRAND.primary};letter-spacing:3px;text-transform:uppercase;">${IDENTITY.name}</div>
        <div style="font-size:11px;color:${BRAND.textLight};letter-spacing:2px;margin-top:4px;">${IDENTITY.tagline}</div>
      </div>
      <div style="padding:36px 32px;">
        ${htmlBody}
        ${includeCalendar ? `<div style="margin:28px 0;padding:20px;background:#f5f3f0;border-left:4px solid ${BRAND.primary};border-radius:0 8px 8px 0;">
          <p style="margin:0 0 12px;font-size:15px;color:${BRAND.text};font-weight:600;">Planifiez un appel stratégique de 15 minutes</p>
          <a href="${calendarLink}" style="display:inline-block;padding:12px 24px;background:${BRAND.primary};color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">Réserver un créneau</a>
        </div>` : ''}
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid ${BRAND.border};">
          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:${BRAND.secondary};">KHEPRA EXPERTS</p>
          <p style="margin:0 0 4px;font-size:13px;color:${BRAND.textMuted};">${IDENTITY.tagline}</p>
          <p style="margin:0 0 4px;font-size:13px;color:${BRAND.textMuted};">${IDENTITY.phone} | ${IDENTITY.email}</p>
          <p style="margin:0;font-size:13px;color:${BRAND.textMuted};">${IDENTITY.website}</p>
        </div>
      </div>
      <div style="padding:24px 32px;background:${BRAND.secondary};color:${BRAND.textLight};text-align:center;">
        <div style="font-size:14px;font-weight:700;color:${BRAND.primary};margin-bottom:8px;">${IDENTITY.name}</div>
        <div style="font-size:12px;color:${BRAND.textMuted};line-height:1.6;">
          ${IDENTITY.address} — SIREN ${IDENTITY.siren}<br/>
          ${IDENTITY.email} | ${IDENTITY.phone} | ${IDENTITY.website}
        </div>
        <div style="margin-top:12px;font-size:10px;color:${BRAND.textLight};line-height:1.5;">
          Ce message et toutes les pièces jointes sont confidentiels et établis à l'intention exclusive de leur destinataire.
        </div>
        <div style="margin-top:8px;font-size:10px;color:${BRAND.textLight};line-height:1.5;">
          Conformément au RGPD, vos données sont traitées avec la plus stricte confidentialité.
        </div>
        ${includeUnsubscribe && unsubscribeUrl ? `<div style="margin-top:12px;font-size:11px;"><a href="${unsubscribeUrl}" style="color:${BRAND.textLight};text-decoration:underline;">Se désinscrire</a></div>` : ''}
      </div>
    </div>
  </div>
</body>
</html>`;
}

function wrapText(textBody: string, unsubscribeUrl?: string): string {
  let text = textBody;
  text += `\n\n---\nKHEPRA EXPERTS | ${IDENTITY.tagline}\n${IDENTITY.phone} | ${IDENTITY.email}\n${IDENTITY.website}`;
  text += `\n${IDENTITY.address} — SIREN ${IDENTITY.siren}`;
  if (unsubscribeUrl) text += `\nSe désinscrire : ${unsubscribeUrl}`;
  return text;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SEQUENCE_CONFIG: Record<string, { prefix: string; totalSteps: number }> = {
  'checklist-conformite-bceao-cobac': { prefix: 'funnel_checklist', totalSteps: 7 },
  'guide-levee-fonds-afrique': { prefix: 'funnel_guide_fonds', totalSteps: 7 },
  'simulation-risque-reglementaire': { prefix: 'funnel_simulation', totalSteps: 7 },
  'template-audit-gouvernance': { prefix: 'funnel_governance', totalSteps: 7 },
  'mini-rapport-due-diligence': { prefix: 'funnel_dd', totalSteps: 7 },
  'diagnostic-esg-maturite': { prefix: 'funnel_esg', totalSteps: 7 },
};

const CALENDAR_LINK = 'https://calendly.com/khepra-experts/diagnostic-strategique';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const results = {
      sequencesProcessed: 0,
      emailsSent: 0,
      errors: [] as { leadId: string; error: string }[],
    };

    const { data: enrollments, error: enrollError } = await supabase
      .from('email_sequence_enrollments')
      .select('*, leads:lead_id(*)')
      .eq('status', 'active')
      .lte('next_send_at', now.toISOString())
      .limit(100);

    if (enrollError) {
      console.error('Erreur récupération enrollments:', enrollError);
      return new Response(
        JSON.stringify({ error: enrollError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!enrollments || enrollments.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Aucun email à envoyer', results }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    for (const enrollment of enrollments) {
      const lead = enrollment.leads;
      if (!lead) {
        results.errors.push({ leadId: enrollment.lead_id, error: 'Lead introuvable' });
        continue;
      }

      const config = SEQUENCE_CONFIG[enrollment.lead_magnet_slug];
      if (!config) {
        results.errors.push({ leadId: lead.id, error: `Séquence inconnue: ${enrollment.lead_magnet_slug}` });
        continue;
      }

      const nextStep = enrollment.current_step + 1;
      if (nextStep > config.totalSteps) {
        await supabase
          .from('email_sequence_enrollments')
          .update({
            status: 'completed',
            completed_at: now.toISOString(),
            updated_at: now.toISOString(),
          })
          .eq('id', enrollment.id);

        await supabase.from('lead_activities').insert({
          lead_id: lead.id,
          activity_type: 'email_sequence_completed',
          metadata: { sequence_id: enrollment.sequence_id, total_steps: config.totalSteps },
        });

        results.sequencesProcessed++;
        continue;
      }

      const templateKey = `${config.prefix}_step${nextStep}`;

      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('template_key', templateKey)
        .eq('language', 'fr')
        .eq('is_active', true)
        .maybeSingle();

      if (templateError || !template) {
        results.errors.push({ leadId: lead.id, error: `Template non trouvé: ${templateKey}` });
        continue;
      }

      const unsubscribeUrl = `${supabaseUrl}/functions/v1/unsubscribe?email=${encodeURIComponent(lead.email)}&sequence=${enrollment.sequence_id}`;
      let htmlBody = template.html_body
        .replace(/\{\{full_name\}\}/g, lead.full_name || '')
        .replace(/\{\{name\}\}/g, lead.full_name || '')
        .replace(/\{\{email\}\}/g, lead.email || '')
        .replace(/\{\{organization\}\}/g, lead.organization || 'votre organisation')
        .replace(/\{\{position\}\}/g, lead.position || '')
        .replace(/\{\{country\}\}/g, lead.country || '')
        .replace(/\{\{download_url\}\}/g, `https://khepraexperts.com/lead-magnets/${enrollment.lead_magnet_slug}`)
        .replace(/\{\{report_url\}\}/g, `https://khepraexperts.com/lead-magnets/${enrollment.lead_magnet_slug}`)
        .replace(/\{\{diagnostic_url\}\}/g, 'https://khepraexperts.com/diagnostic-flash')
        .replace(/\{\{case_study_url\}\}/g, 'https://khepraexperts.com/case-studies')
        .replace(/\{\{methodology_url\}\}/g, 'https://khepraexperts.com/services/due-diligence-acquisition')
        .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl)
        .replace(/\{\{calendar_link\}\}/g, CALENDAR_LINK);

      let textBody = (template.text_body || '')
        .replace(/\{\{full_name\}\}/g, lead.full_name || '')
        .replace(/\{\{name\}\}/g, lead.full_name || '')
        .replace(/\{\{email\}\}/g, lead.email || '')
        .replace(/\{\{organization\}\}/g, lead.organization || 'votre organisation')
        .replace(/\{\{position\}\}/g, lead.position || '')
        .replace(/\{\{country\}\}/g, lead.country || '')
        .replace(/\{\{download_url\}\}/g, `https://khepraexperts.com/lead-magnets/${enrollment.lead_magnet_slug}`)
        .replace(/\{\{report_url\}\}/g, `https://khepraexperts.com/lead-magnets/${enrollment.lead_magnet_slug}`)
        .replace(/\{\{diagnostic_url\}\}/g, 'https://khepraexperts.com/diagnostic-flash')
        .replace(/\{\{case_study_url\}\}/g, 'https://khepraexperts.com/case-studies')
        .replace(/\{\{methodology_url\}\}/g, 'https://khepraexperts.com/services/due-diligence-acquisition')
        .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl)
        .replace(/\{\{calendar_link\}\}/g, CALENDAR_LINK);

      htmlBody = wrapEmail(htmlBody, { unsubscribeUrl });
      textBody = wrapText(textBody, unsubscribeUrl);

      let emailSent = false;
      if (resendApiKey) {
        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: 'KHEPRA EXPERTS <contact@khepra-experts.com>',
              to: [lead.email],
              subject: template.subject.replace(/\{\{full_name\}\}/g, lead.full_name || '').replace(/\{\{organization\}\}/g, lead.organization || 'votre organisation'),
              html: htmlBody,
              text: textBody,
            }),
          });

          if (!emailResponse.ok) {
            throw new Error(await emailResponse.text());
          }
          emailSent = true;
        } catch (emailErr) {
          console.error(`Erreur envoi email pour ${lead.id}:`, emailErr);
          results.errors.push({ leadId: lead.id, error: `Email: ${emailErr.message}` });
        }
      } else {
        console.log(`SIMULATION — Email à ${lead.email}: ${template.subject}`);
        emailSent = true;
      }

      if (emailSent) {
        const nextDelayHours = template.send_delay_hours || 24;
        const nextSendAt = new Date(now.getTime() + nextDelayHours * 60 * 60 * 1000);

        await supabase
          .from('email_sequence_enrollments')
          .update({
            current_step: nextStep,
            last_sent_at: now.toISOString(),
            next_send_at: nextSendAt.toISOString(),
            updated_at: now.toISOString(),
          })
          .eq('id', enrollment.id);

        await supabase.from('lead_activities').insert({
          lead_id: lead.id,
          activity_type: 'email_sent',
          metadata: {
            sequence_id: enrollment.sequence_id,
            step: nextStep,
            template_key: templateKey,
            subject: template.subject,
            branding: 'KHEPRA Premium',
          },
        });

        await supabase.from('email_logs').insert({
          type: 'sequence',
          status: 'sent',
          recipient_email: lead.email,
          subject: template.subject,
          function_name: 'email-funnel-sequence',
        });

        results.emailsSent++;
      }

      results.sequencesProcessed++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        results,
        timestamp: now.toISOString(),
        branding: 'KHEPRA Premium',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur générale:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
