// KOS Publication Notifier
// Envoie des notifications email 24h avant la publication d'un nouvel article
// Déclenché par cron job quotidien

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Article {
  id: string;
  title: string;
  slug: string;
  pub_type: string;
  subtitle: string | null;
  publication_date: string;
  referentiel: string;
  keywords: string[];
  authors: { name: string }[];
  abstract: string | null;
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[DRY RUN] Would send to ${to}: ${subject}`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "KHEPRA KOS <kos@khepraexperts.com>",
        to: [to],
        subject,
        html,
        reply_to: "contact@khepraexperts.com",
      }),
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to send to ${to}:`, err);
    return false;
  }
}

function buildEmailHTML(article: Article, langue: string): string {
  const TITRES_TYPE: Record<string, string> = {
    blog: "Article",
    kbr: "KBR – Knowledge Brief Report",
    etude_flash: "Étude Flash",
    note_strategique: "Note Stratégique",
  };

  const typeLabel = TITRES_TYPE[article.pub_type] || "Publication";
  const siteUrl = "https://khepraexperts.com";
  const articleUrl = `${siteUrl}/publication/${article.slug}`;
  const keywords = article.keywords?.slice(0, 5).join(", ") || "";

  return `
<!DOCTYPE html>
<html lang="${langue}">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; margin-top: 32px; margin-bottom: 32px;">
    <tr>
      <td style="background: #0f172a; padding: 24px 32px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">KHEPRA KOS</h2>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Knowledge Operating System — Veille Réglementaire Africaine</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">📅 Publication dans 24 heures</p>
        <h1 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;">${article.title}</h1>
        <span style="display: inline-block; background: #dbeafe; color: #1e40af; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; margin-bottom: 16px;">${typeLabel} · ${article.referentiel}</span>
        ${article.subtitle ? `<p style="color: #475569; font-size: 15px; margin: 0 0 16px 0; line-height: 1.5;">${article.subtitle}</p>` : ""}
        ${article.abstract ? `<p style="color: #334155; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6; font-style: italic;">${article.abstract}</p>` : ""}
        
        <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 12px 0; margin-bottom: 20px;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            🗓 <strong>Date de publication :</strong> ${new Date(article.publication_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            ${article.authors?.length ? `&nbsp;&nbsp;✍️ <strong>Auteur(s) :</strong> ${article.authors.map(a => a.name).join(', ')}` : ''}
          </p>
          ${keywords ? `<p style="color: #94a3b8; font-size: 11px; margin: 4px 0 0 0;">🏷 ${keywords}</p>` : ''}
        </div>

        <a href="${articleUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-bottom: 24px;">Lire l&apos;article →</a>

        <p style="color: #94a3b8; font-size: 11px; margin: 0;">Vous recevez cet email car vous êtes abonné aux alertes de publication KHEPRA KOS.</p>
        <p style="color: #94a3b8; font-size: 11px; margin: 4px 0 0 0;">
          <a href="${siteUrl}/unsubscribe?token={{UNSUBSCRIBE_TOKEN}}" style="color: #94a3b8;">Se désabonner</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
        <p style="color: #64748b; font-size: 10px; margin: 0;">© ${new Date().getFullYear()} KHEPRA EXPERTS — Tous droits réservés</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action } = await req.json().catch(() => ({ action: "notify" }));
    const results: { sent: number; failed: number; articles_count: number; dry_run: boolean } = {
      sent: 0,
      failed: 0,
      articles_count: 0,
      dry_run: !RESEND_API_KEY,
    };

    if (action === "health") {
      return new Response(JSON.stringify({
        status: "operational",
        engine: "KOS Publication Notifier v1.0",
        resend_configured: !!RESEND_API_KEY,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Action: notify — check for articles publishing in 24h
    if (action === "notify" || action === "check") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split("T")[0];

      // Récupérer les articles dont la publication est prévue demain
      const { data: articles, error: articlesError } = await supabase
        .from("kos_publications")
        .select("id, title, slug, pub_type, subtitle, publication_date, keywords, authors, abstract")
        .eq("status", "scheduled")
        .eq("publication_date", dateStr);

      if (articlesError) {
        return new Response(JSON.stringify({ error: "Erreur récupération articles", detail: articlesError.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      results.articles_count = articles?.length || 0;

      if (!articles || articles.length === 0) {
        return new Response(JSON.stringify({
          success: true,
          message: "Aucun article programmé pour demain",
          date_verifiee: dateStr,
          results,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Récupérer tous les abonnés
      const { data: subscribers, error: subsError } = await supabase
        .from("publication_alert_subscribers")
        .select("id, email, referentiels, langue, unsubscribe_token")
        .eq("confirmed", true);

      if (subsError || !subscribers || subscribers.length === 0) {
        return new Response(JSON.stringify({
          success: true,
          message: "Articles trouvés mais aucun abonné à notifier",
          articles_count: articles.length,
          results,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Pour chaque article, notifier les abonnés concernés
      for (const article of articles) {
        const referentiel = article.keywords?.find((k: string) =>
          ["COBAC", "BCEAO", "OHADA", "GIABA", "GABAC"].includes(k)
        ) || "GÉNÉRAL";

        const concernedSubs = subscribers.filter(s => {
          if (!s.referentiels || s.referentiels.length === 0) return true; // abonné à tout
          return s.referentiels.includes(referentiel);
        });

        for (const sub of concernedSubs) {
          const html = buildEmailHTML(article as Article, sub.langue)
            .replace("{{UNSUBSCRIBE_TOKEN}}", sub.unsubscribe_token);

          const sujet = sub.langue === "fr"
            ? `📅 Demain sur KOS : ${article.title}`
            : `📅 Tomorrow on KOS: ${article.title}`;

          const sent = await sendEmail(sub.email, sujet, html);
          if (sent) {
            results.sent++;
            await supabase
              .from("publication_alert_subscribers")
              .update({ last_notified_at: new Date().toISOString() })
              .eq("id", sub.id);
          } else {
            results.failed++;
          }
        }
      }

      // Log dans email_logs si la table existe
      await supabase.from("email_logs").insert({
        event: "publication_24h_alert",
        recipient_count: results.sent,
        articles_count: articles.length,
        metadata: { date: dateStr, failed: results.failed },
        created_at: new Date().toISOString(),
      });

      return new Response(JSON.stringify({
        success: true,
        message: `Notifications envoyées pour ${articles.length} article(s)`,
        date_verifiee: dateStr,
        articles: articles.map(a => ({ title: a.title, slug: a.slug })),
        results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: `Action inconnue: ${action}` }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: "Erreur interne", detail: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});