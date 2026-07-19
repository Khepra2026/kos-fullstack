import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

interface TenderAlert {
  id: string;
  title: string;
  description: string;
  source_name: string;
  region: string;
  source_url: string;
  relevance_score: number;
  relevance_class: string;
  expertise_tags: string[];
  deadline: string | null;
  tender_type: string | null;
  country: string | null;
  estimated_budget_fcfa: number | null;
  notified: boolean;
}

const RECIPIENT_EMAIL = "contact@khepraexperts.com";
const SENDER_EMAIL = "KOS Tender Intelligence <notifications@khepraexperts.com>";

function formatFCFA(val: number): string {
  if (!val) return "—";
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} Md`;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)} M`;
  return val.toLocaleString("fr-FR");
}

function escapeHtml(s: string): string {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function isValidUrl(u: string): boolean {
  return !!u && /^https?:\/\//i.test(u);
}

function buildEmailHtml(tenders: TenderAlert[], countByClass: Record<string, number>, totalBudget: number): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const highCount = countByClass["high"] || 0;
  const mediumCount = countByClass["medium"] || 0;
  const criticalCount = tenders.filter(t => t.relevance_score >= 5).length;

  const cards = tenders.map((t) => {
    const deadline = t.deadline
      ? new Date(t.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
      : "N/A";
    const budget = formatFCFA(t.estimated_budget_fcfa || 0);
    const relevanceColor = t.relevance_class === "high" ? "#dc2626" : t.relevance_class === "medium" ? "#d97706" : "#6b7280";
    const tags = (t.expertise_tags || []).slice(0, 5).map(tag =>
      `<span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:10px;background:#f3f2ef;color:#4a4a4a;margin:2px 3px 2px 0;">${escapeHtml(tag)}</span>`
    ).join(" ");
    const hasUrl = isValidUrl(t.source_url);
    const titleHtml = hasUrl
      ? `<a href="${escapeHtml(t.source_url)}" style="color:#1a1a1a;text-decoration:none;" target="_blank">${escapeHtml(t.title || "Sans titre")}</a>`
      : escapeHtml(t.title || "Sans titre");
    const ctaButton = hasUrl
      ? `<a href="${escapeHtml(t.source_url)}" target="_blank" style="display:inline-block;margin-top:10px;padding:8px 16px;background:#1a1a1a;color:#c19a6b;text-decoration:none;border-radius:5px;font-size:11px;font-weight:700;letter-spacing:0.5px;">CONSULTER LES TDR / OFFRE COMPLÈTE →</a>`
      : `<span style="display:inline-block;margin-top:10px;font-size:10px;color:#9a9a9a;font-style:italic;">Lien source non disponible</span>`;

    return `<div style="border:1px solid #e5e3df;border-left:4px solid ${relevanceColor};border-radius:8px;padding:16px 18px;margin-bottom:14px;background:#ffffff;">
<div style="display:flex;justify-content:space-between;align-items:flex-start;">
<div style="font-size:14px;font-weight:700;line-height:1.4;margin-bottom:6px;">${titleHtml}</div>
</div>
<div style="font-size:11px;color:#6b6b6b;margin-bottom:8px;">
<strong style="color:${relevanceColor};">Score ${t.relevance_score || 0}/10</strong> · ${escapeHtml(t.source_name || "—")} · ${escapeHtml(t.country || t.region || "—")}${t.tender_type ? " · " + escapeHtml(t.tender_type) : ""}
</div>
${t.description ? `<div style="font-size:12px;color:#4a4a4a;line-height:1.5;margin-bottom:8px;">${escapeHtml((t.description || "").slice(0, 260))}${(t.description || "").length > 260 ? "…" : ""}</div>` : ""}
<div style="margin-bottom:8px;">${tags}</div>
<table style="width:100%;font-size:11px;color:#6b6b6b;margin-bottom:4px;"><tr>
<td style="padding:2px 0;"><strong style="color:#1a1a1a;">Budget estimé :</strong> ${budget} FCFA</td>
<td style="padding:2px 0;text-align:right;"><strong style="color:#dc2626;">Date limite :</strong> ${deadline}</td>
</tr></table>
${ctaButton}
</div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:Helvetica Neue,Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
<div style="max-width:700px;margin:0 auto;padding:20px;">
<div style="max-width:700px;margin:0 auto;background:#faf9f7;border:1px solid #e5e3df;border-radius:8px;overflow:hidden;">
<div style="padding:24px 28px;border-bottom:3px solid #c19a6b;text-align:center;background:#1a1a1a;">
<div style="font-size:20px;font-weight:800;color:#c19a6b;letter-spacing:2px;text-transform:uppercase;">KOS TENDER INTELLIGENCE</div>
<div style="font-size:11px;color:#9a9a9a;letter-spacing:1px;margin-top:4px;">Notification automatique — ${dateStr} à ${timeStr}</div>
</div>
<div style="padding:28px;">
<h2 style="margin:0 0 6px;font-size:18px;color:#1a1a1a;">${tenders.length} AO/AMI détecté(s)</h2>
<p style="margin:0 0 20px;font-size:13px;color:#6b6b6b;">
<strong>${highCount} haute pertinence</strong> · <strong>${criticalCount} critique(s)</strong> · <strong>${mediumCount} moyenne</strong><br/>
Budget cumulé estimé : <strong>${formatFCFA(totalBudget)} FCFA</strong>
</p>
${cards}
<div style="margin-top:24px;padding:16px;background:#ffffff;border-radius:6px;border-left:4px solid #c19a6b;">
<p style="margin:0;font-size:12px;color:#6b6b6b;">
<strong>KOS Tender Intelligence Engine</strong> — Agent autonome de veille stratégique<br/>
26 sources officielles surveillées 24h/24 · Scoring AI Big Four · Qualification automatique<br/>
<a href="https://khepraexperts.com/kos-tender-intelligence" style="color:#c19a6b;text-decoration:underline;">Accéder au dashboard Tender Intelligence</a>
</p>
</div>
</div>
<div style="padding:20px 28px;background:#1a1a1a;color:#9a9a9a;text-align:center;">
<div style="font-size:13px;font-weight:700;color:#c19a6b;margin-bottom:4px;">KHEPRA EXPERTS</div>
<div style="font-size:11px;color:#6b6b6b;line-height:1.5;">
Investment &amp; ESG Advisory Boutique<br/>
contact@khepraexperts.com | +33 1 83 64 05 75
</div>
</div>
</div>
</div>
</body>
</html>`;
}

function buildPlainText(tenders: TenderAlert[], countByClass: Record<string, number>, totalBudget: number): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  let text = `KOS TENDER INTELLIGENCE — NOTIFICATION AUTOMATIQUE\n`;
  text += `${"=".repeat(50)}\n`;
  text += `${dateStr} a ${timeStr}\n`;
  text += `${tenders.length} AO/AMI detectes — ${countByClass["high"] || 0} haute pertinence\n`;
  text += `Budget cumule: ${formatFCFA(totalBudget)} FCFA\n\n`;

  tenders.forEach((t, i) => {
    const deadline = t.deadline
      ? new Date(t.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
      : "N/A";
    text += `${i + 1}. [${t.relevance_score || 0}/10] ${t.title || "Sans titre"}\n`;
    text += `   ${t.source_name || "—"} · ${t.country || t.region || "—"} · ${formatFCFA(t.estimated_budget_fcfa || 0)} FCFA · Limite: ${deadline}\n`;
    if (t.description) text += `   ${(t.description || "").slice(0, 200)}\n`;
    text += `   TDR / Offre complete: ${isValidUrl(t.source_url) ? t.source_url : "(lien non disponible)"}\n\n`;
  });

  text += `${"-".repeat(50)}\n`;
  text += `KOS Tender Intelligence Engine — KHEPRA EXPERTS\n`;
  text += `Dashboard: https://khepraexperts.com/kos-tender-intelligence\n`;
  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let body: { min_relevance?: string; limit?: number; tender_ids?: string[]; diagnostic?: boolean } = {};
  try {
    body = await req.json();
  } catch (_e) {
    // use defaults
  }

  if (body.diagnostic) {
    return new Response(JSON.stringify({
      diagnostic: true,
      resend_key_configured: !!RESEND_API_KEY,
      resend_key_length: RESEND_API_KEY ? RESEND_API_KEY.length : 0,
      recipient: RECIPIENT_EMAIL,
      sender: SENDER_EMAIL,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  if (!RESEND_API_KEY) {
    try {
      await supabase.from("email_logs").insert({
        type: "tender_intelligence",
        status: "failed",
        recipient_email: RECIPIENT_EMAIL,
        subject: "Notification AO/AMI",
        error_message: "RESEND_API_KEY not configured",
        function_name: "kos-tender-email-notify",
      });
    } catch (_e) { /* ignore */ }

    return new Response(JSON.stringify({ sent: false, error: "RESEND_API_KEY not configured", resend_key_configured: false }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const minRelevance = body.min_relevance || "high";
  const limit = body.limit || 20;

  let query = supabase
    .from("tender_alerts")
    .select("*")
    .eq("notified", false)
    .not("title", "is", null)
    .order("relevance_score", { ascending: false })
    .limit(limit);

  if (body.tender_ids && body.tender_ids.length > 0) {
    query = query.in("id", body.tender_ids);
  } else if (minRelevance === "all") {
    // all non-notified with a title
  } else if (minRelevance === "high") {
    query = query.eq("relevance_class", "high");
  } else if (minRelevance === "medium") {
    query = query.in("relevance_class", ["high", "medium"]);
  }

  const { data: tenders, error: fetchError } = await query;

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const tenderList = (tenders as TenderAlert[]) || [];

  if (tenderList.length === 0) {
    return new Response(JSON.stringify({ sent: false, message: "Aucune nouvelle alerte à notifier (avec contenu valide)", count: 0, resend_key_configured: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const countByClass: Record<string, number> = {};
  let totalBudget = 0;
  for (const t of tenderList) {
    countByClass[t.relevance_class] = (countByClass[t.relevance_class] || 0) + 1;
    totalBudget += t.estimated_budget_fcfa || 0;
  }

  const htmlBody = buildEmailHtml(tenderList, countByClass, totalBudget);
  const textBody = buildPlainText(tenderList, countByClass, totalBudget);

  const highCount = countByClass["high"] || 0;
  const dateLabel = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  const subject = `KOS Tender Intelligence — ${tenderList.length} AO/AMI (${highCount} haute pertinence) — ${dateLabel}`;

  let emailSent = false;
  let resendError = "";
  let resendId = "";

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [RECIPIENT_EMAIL],
        subject,
        html: htmlBody,
        text: textBody,
        tags: [{ name: "category", value: "tender_intelligence" }],
      }),
    });

    const resendData = await resendRes.json();

    if (resendRes.ok && resendData.id) {
      emailSent = true;
      resendId = resendData.id;
    } else {
      resendError = resendData.message || JSON.stringify(resendData) || "Unknown Resend error";
    }
  } catch (e: any) {
    resendError = e.message || "Resend request failed";
  }

  try {
    await supabase.from("email_logs").insert({
      type: "tender_intelligence",
      status: emailSent ? "sent" : "failed",
      recipient_email: RECIPIENT_EMAIL,
      subject,
      error_message: emailSent ? null : resendError,
      function_name: "kos-tender-email-notify",
    });
  } catch (_e) { /* ignore */ }

  if (emailSent) {
    const notifiedIds = tenderList.map(t => t.id);
    try {
      await supabase
        .from("tender_alerts")
        .update({ notified: true, notified_at: new Date().toISOString() })
        .in("id", notifiedIds);
    } catch (_e) { /* ignore */ }
  }

  return new Response(
    JSON.stringify({
      sent: emailSent,
      resend_id: resendId || null,
      resend_key_configured: true,
      count: tenderList.length,
      high_count: highCount,
      medium_count: countByClass["medium"] || 0,
      low_count: countByClass["low"] || 0,
      total_budget_fcfa: totalBudget,
      recipient: RECIPIENT_EMAIL,
      error: resendError || null,
      notified_ids: emailSent ? tenderList.map(t => t.id) : [],
      preview: {
        subject,
        tenders: tenderList.slice(0, 5).map(t => ({
          title: (t.title || "").slice(0, 100),
          relevance: t.relevance_score,
          source: t.source_name,
          url: t.source_url,
        })),
      },
    }),
    {
      status: emailSent ? 200 : 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    }
  );
});
