import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

interface NotificationPayload {
  type: string;
  severity: string;
  title: string;
  message: string;
  related_lead_id?: string;
  related_proposal_id?: string;
  metadata?: Record<string, unknown>;
  action_url?: string;
  action_label?: string;
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const COLD_LEAD_DAYS = 7;
const COLD_LEAD_CRITICAL_DAYS = 14;
const PIPELINE_DAYS_COMPARE = 7;

serve(async (req: Request) => {
  const { method } = req;
  if (method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const notifications: NotificationPayload[] = [];

  const now = new Date();
  const coldThreshold = new Date(now);
  coldThreshold.setDate(now.getDate() - COLD_LEAD_DAYS);
  const coldCriticalThreshold = new Date(now);
  coldCriticalThreshold.setDate(now.getDate() - COLD_LEAD_CRITICAL_DAYS);
  const pipelineCompare = new Date(now);
  pipelineCompare.setDate(now.getDate() - PIPELINE_DAYS_COMPARE);

  // 1. Leads froids depuis 7 jours (pas d'activité)
  const { data: coldLeads, error: coldError } = await supabase
    .from("leads")
    .select("id, full_name, email, organization, last_activity_at, last_contact_at, pipeline_stage, deal_value, probability")
    .is("dismissed_at", null)
    .or(`last_activity_at.lt.${coldThreshold.toISOString()},last_contact_at.lt.${coldThreshold.toISOString()}`)
    .not("pipeline_stage", "in", "(closed_won,closed_lost)");

  if (coldError) {
    console.error("cold leads error:", coldError);
  } else if (coldLeads) {
    for (const lead of coldLeads) {
      const daysInactive = lead.last_activity_at
        ? Math.floor((now.getTime() - new Date(lead.last_activity_at).getTime()) / (1000 * 60 * 60 * 24))
        : lead.last_contact_at
        ? Math.floor((now.getTime() - new Date(lead.last_contact_at).getTime()) / (1000 * 60 * 60 * 24))
        : 999;
      
      const isCritical = lead.last_activity_at
        ? new Date(lead.last_activity_at) < coldCriticalThreshold
        : lead.last_contact_at
        ? new Date(lead.last_contact_at) < coldCriticalThreshold
        : true;

      // Check if a notification already exists for this lead
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("related_lead_id", lead.id)
        .eq("type", "cold_lead")
        .is("dismissed_at", null)
        .maybeSingle();

      if (!existing) {
        notifications.push({
          type: "cold_lead",
          severity: isCritical ? "critical" : "high",
          title: `${isCritical ? "⚠️ Lead critique" : "Lead froid"} — ${lead.full_name || "Sans nom"}`,
          message: `${lead.full_name || "Lead sans nom"} (${lead.organization || "-"}) n'a pas eu d'activité depuis ${daysInactive} jours. Pipeline : ${lead.pipeline_stage}. Valeur : ${lead.deal_value ? lead.deal_value.toLocaleString() + " €" : "Non estimée"}.`,
          related_lead_id: lead.id,
          metadata: {
            days_inactive: daysInactive,
            pipeline_stage: lead.pipeline_stage,
            deal_value: lead.deal_value,
            probability: lead.probability,
            is_critical: isCritical,
          },
          action_url: `/crm?lead=${lead.id}`,
          action_label: "Voir dans le CRM",
        });
      }
    }
  }

  // 2. Pipeline en baisse (moins de leads actifs qu'il y a 7 jours)
  const { data: currentActive, error: currError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .not("pipeline_stage", "in", "(closed_won,closed_lost,lead_generated)");

  const { data: previousActive, error: prevError } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .not("pipeline_stage", "in", "(closed_won,closed_lost,lead_generated)")
    .lt("created_at", pipelineCompare.toISOString());

  if (!currError && !prevError && currentActive && previousActive) {
    const currentCount = currentActive.length || 0;
    const previousCount = previousActive.length || 0;
    if (currentCount < previousCount * 0.9) {
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("type", "pipeline_drop")
        .gte("created_at", pipelineCompare.toISOString())
        .is("dismissed_at", null)
        .maybeSingle();
      if (!existing) {
        notifications.push({
          type: "pipeline_drop",
          severity: "high",
          title: "📉 Pipeline en baisse",
          message: `Le nombre de leads actifs dans le pipeline a diminué de ${previousCount} à ${currentCount} sur les 7 derniers jours (-${Math.round((1 - currentCount / previousCount) * 100)}%). Relancer les leads inactifs ou augmenter l'acquisition.`,
          metadata: {
            previous_count: previousCount,
            current_count: currentCount,
            drop_percent: Math.round((1 - currentCount / previousCount) * 100),
          },
          action_url: "/crm",
          action_label: "Voir le CRM",
        });
      }
    }
  }

  // 3. Nouveaux leads aujourd'hui (pas de duplicate)
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayLeads, error: todayError } = await supabase
    .from("leads")
    .select("id, full_name, email, organization, source_page, lead_score, pipeline_stage")
    .gte("created_at", todayStart.toISOString());

  if (todayError) {
    console.error("today leads error:", todayError);
  } else if (todayLeads && todayLeads.length > 0) {
    for (const lead of todayLeads) {
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("related_lead_id", lead.id)
        .eq("type", "new_lead")
        .is("dismissed_at", null)
        .maybeSingle();
      if (!existing) {
        notifications.push({
          type: "new_lead",
          severity: lead.lead_score && lead.lead_score > 70 ? "high" : "medium",
          title: `🎯 Nouveau lead ${lead.lead_score && lead.lead_score > 70 ? "chaud" : ""} — ${lead.full_name || "Sans nom"}`,
          message: `${lead.full_name || "Lead"} (${lead.organization || "-"}) a soumis un formulaire via ${lead.source_page || "page inconnue"}. Score : ${lead.lead_score || 0}. Étape : ${lead.pipeline_stage}.`,
          related_lead_id: lead.id,
          metadata: {
            source_page: lead.source_page,
            lead_score: lead.lead_score,
            pipeline_stage: lead.pipeline_stage,
          },
          action_url: `/crm?lead=${lead.id}`,
          action_label: "Voir le CRM",
        });
      }
    }
  }

  // 4. Propositions expirées (pas de réponse depuis 14 jours après envoi)
  const proposalExpiredThreshold = new Date(now);
  proposalExpiredThreshold.setDate(now.getDate() - 14);
  const { data: expiredProposals, error: propError } = await supabase
    .from("proposals")
    .select("id, title, client_name, client_organization, status, sent_at, amount, currency")
    .eq("status", "sent")
    .lt("sent_at", proposalExpiredThreshold.toISOString());

  if (propError) {
    console.error("expired proposals error:", propError);
  } else if (expiredProposals) {
    for (const prop of expiredProposals) {
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("related_proposal_id", prop.id)
        .eq("type", "proposal_expired")
        .is("dismissed_at", null)
        .maybeSingle();
      if (!existing) {
        const daysSinceSent = Math.floor((now.getTime() - new Date(prop.sent_at!).getTime()) / (1000 * 60 * 60 * 24));
        notifications.push({
          type: "proposal_expired",
          severity: "high",
          title: `⏰ Proposition expirée — ${prop.client_name || "Client"}`,
          message: `La proposition "${prop.title || "Sans titre"}" pour ${prop.client_organization || "-"} a été envoyée il y a ${daysSinceSent} jours sans réponse. Montant : ${prop.amount ? prop.amount.toLocaleString() + " " + prop.currency : "Non précisé"}.`,
          related_proposal_id: prop.id,
          metadata: {
            days_since_sent: daysSinceSent,
            amount: prop.amount,
            currency: prop.currency,
          },
          action_url: `/proposals`,
          action_label: "Voir les propositions",
        });
      }
    }
  }

  // 5. Propositions acceptées (bonne nouvelle)
  const { data: acceptedProposals, error: accError } = await supabase
    .from("proposals")
    .select("id, title, client_name, client_organization, amount, currency, accepted_at")
    .eq("status", "accepted")
    .gte("accepted_at", todayStart.toISOString());

  if (accError) {
    console.error("accepted proposals error:", accError);
  } else if (acceptedProposals) {
    for (const prop of acceptedProposals) {
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("related_proposal_id", prop.id)
        .eq("type", "proposal_accepted")
        .is("dismissed_at", null)
        .maybeSingle();
      if (!existing) {
        notifications.push({
          type: "proposal_accepted",
          severity: "medium",
          title: `🎉 Proposition acceptée — ${prop.client_name || "Client"}`,
          message: `La proposition "${prop.title || "Sans titre"}" a été acceptée par ${prop.client_organization || "-"}. Montant : ${prop.amount ? prop.amount.toLocaleString() + " " + prop.currency : "Non précisé"}.`,
          related_proposal_id: prop.id,
          metadata: {
            amount: prop.amount,
            currency: prop.currency,
          },
          action_url: `/proposals`,
          action_label: "Voir les propositions",
        });
      }
    }
  }

  // 6. Propositions vues (intérêt détecté)
  const { data: viewedProposals, error: viewError } = await supabase
    .from("proposals")
    .select("id, title, client_name, client_organization, view_count, viewed_at")
    .gt("view_count", 0)
    .gte("viewed_at", todayStart.toISOString());

  if (viewError) {
    console.error("viewed proposals error:", viewError);
  } else if (viewedProposals) {
    for (const prop of viewedProposals) {
      const { data: existing } = await supabase
        .from("admin_notifications")
        .select("id")
        .eq("related_proposal_id", prop.id)
        .eq("type", "proposal_viewed")
        .is("dismissed_at", null)
        .maybeSingle();
      if (!existing) {
        notifications.push({
          type: "proposal_viewed",
          severity: "low",
          title: `👀 Proposition consultée — ${prop.client_name || "Client"}`,
          message: `${prop.client_name || "Client"} (${prop.client_organization || "-"}) a ouvert la proposition "${prop.title || "Sans titre"}" ${prop.view_count} fois aujourd'hui.`,
          related_proposal_id: prop.id,
          metadata: {
            view_count: prop.view_count,
          },
          action_url: `/proposals`,
          action_label: "Voir les propositions",
        });
      }
    }
  }

  // Insert all notifications
  let inserted = 0;
  if (notifications.length > 0) {
    const { data: insertedData, error: insertError } = await supabase
      .from("admin_notifications")
      .insert(notifications)
      .select("id");
    if (insertError) {
      console.error("insert error:", insertError);
    } else {
      inserted = insertedData?.length || 0;
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      checked_at: now.toISOString(),
      notifications_created: inserted,
      details: {
        cold_leads: notifications.filter((n) => n.type === "cold_lead").length,
        pipeline_drop: notifications.filter((n) => n.type === "pipeline_drop").length,
        new_leads: notifications.filter((n) => n.type === "new_lead").length,
        proposal_expired: notifications.filter((n) => n.type === "proposal_expired").length,
        proposal_accepted: notifications.filter((n) => n.type === "proposal_accepted").length,
        proposal_viewed: notifications.filter((n) => n.type === "proposal_viewed").length,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});
