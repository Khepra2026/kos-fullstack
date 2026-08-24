import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReviewRequest {
  action?: string;
  document_type?: string;
  document_id?: string;
  document_title?: string;
  document_content?: string;
  secteur?: string;
  juridiction?: string;
  regulateur?: string;
  type_entite?: string;
  niveau_risque?: string;
  mission_ref?: string;
  scan_limit?: number;
}

const DETECTION_RULES = [
  { category: "affirmation_absolue", patterns: [/\btoujours\b/gi, /\bjamais\b/gi, /\babsolument\b/gi, /\bincontestablement\b/gi, /\bsans exception\b/gi, /\bà 100%\b/gi, /\bgaranti\b/gi, /\bcertain\b/gi, /\bimpossible\b/gi], severity: "medium", suggestion: "Nuancer l'affirmation avec des conditions ou des limites explicites." },
  { category: "generalisation", patterns: [/\btous les\b/gi, /\btoutes les\b/gi, /\bchaque\b/gi, /\bl'ensemble des\b/gi, /\bla totalité\b/gi, /\bsystématiquement\b/gi], severity: "medium", suggestion: "Préciser le champ d'application et les éventuelles exceptions." },
  { category: "raccourci_reglementaire", patterns: [/\bconformément à la réglementation\b(?!.*\b(n°|article|instruction|directive|loi|décret)\b)/gi, /\bles textes en vigueur\b(?!.*\b(référence|précis|cit)\b)/gi, /\bla réglementation applicable\b(?!.*\b(n°|article|instruction|directive)\b)/gi], severity: "high", suggestion: "Citer explicitement le texte réglementaire avec son numéro et article." },
  { category: "ambiguite", patterns: [/\bil semblerait\b/gi, /\bprobablement\b/gi, /\béventuellement\b/gi, /\bsous réserve\b/gi, /\bdans une certaine mesure\b/gi, /\bplus ou moins\b/gi, /\bà priori\b/gi], severity: "low", suggestion: "Remplacer par une affirmation ou indiquer explicitement le niveau d'incertitude." },
  { category: "approximation", patterns: [/\benviron\b/gi, /\bà peu près\b/gi, /\bapproximativement\b/gi, /\bde l'ordre de\b/gi, /\bquelques\b/gi, /\bplusieurs\b/gi], severity: "low", suggestion: "Utiliser des chiffres précis ou indiquer une fourchette avec sa source." },
  { category: "reference_obsolete", patterns: [/\b(200[0-9]|201[0-5])\b/g], severity: "medium", suggestion: "Vérifier si la référence est toujours en vigueur ou a été mise à jour." },
  { category: "bonne_pratique_as_obligation", patterns: [/\bil faut\b(?!.*\b(conformément|en application|selon|aux termes)\b)/gi, /\bon doit\b(?!.*\b(conformément|en application|selon|aux termes)\b)/gi, /\bil est recommandé\b.{0,50}\b(obligatoire|obligation|requis|imposé)\b/gi], severity: "high", suggestion: "Distinguer clairement obligation légale, recommandation et bonne pratique." }
];

function classifyConfidence(text: string, sources: string[]): { level: string; justification: string } {
  const hasOfficialSources = sources.some(s => /\b(bceao|cobac|uemoa|cemac|beac|gafi|iso|ifrs|gri|ifc|journal officiel|arrêté|décret|loi n°)\b/i.test(s));
  const hasProfessionalSources = sources.length > 0;
  const hasMultipleSources = sources.length >= 2;
  if (hasOfficialSources && hasMultipleSources) return { level: "A", justification: "Confirmé par plusieurs sources officielles." };
  if (hasOfficialSources) return { level: "B", justification: "Confirmé par une source officielle." };
  if (hasProfessionalSources) return { level: "C", justification: "Confirmé par une littérature professionnelle crédible." };
  const isHypothesis = /\b(si|supposons|hypothèse|scénario|dans l'hypothèse|en supposant)\b/i.test(text);
  if (isHypothesis) return { level: "E", justification: "Hypothèse — nécessite vérification." };
  return { level: "D", justification: "Pratique observée — non confirmée par source officielle." };
}

async function runQualityReview(req: ReviewRequest, supabaseClient: any) {
  const content = req.document_content || "";
  const findings: Record<string, any> = {};
  const scores: Record<string, number> = {};
  const allDetections: any[] = [];
  const reviewBatchId = crypto.randomUUID();
  const now = new Date().toISOString();

  const techIssues: string[] = [];
  if (content.length < 100) techIssues.push("Contenu trop court (< 100 caractères)");
  if (content.length > 50000) techIssues.push("Contenu très long — risque de verbosité");
  if (!req.document_title) techIssues.push("Titre du document manquant");
  if (!req.secteur) techIssues.push("Secteur non spécifié");
  const techScore = Math.max(0, 10 - techIssues.length * 1.5);
  findings.audit_technique = techIssues;
  scores.audit_technique = Math.round(techScore * 10) / 10;

  const regIssues: string[] = [];
  const regRefs = content.match(/\b(article|instruction|directive|loi|décret|arrêté|circulaire|règlement)\s+(n[°o]?\s*)?[\d\-\/]+/gi) || [];
  if (regRefs.length === 0 && content.length > 200) regIssues.push("Aucune référence réglementaire explicite détectée");
  if (req.juridiction && !content.toLowerCase().includes(req.juridiction.toLowerCase())) regIssues.push(`Juridiction "${req.juridiction}" non mentionnée dans le contenu`);
  const regScore = Math.max(0, 10 - regIssues.length * 2);
  findings.audit_reglementaire = regIssues;
  scores.audit_reglementaire = Math.round(regScore * 10) / 10;

  const jurIssues: string[] = [];
  const hasSanction = /\b(sanction|pénalité|amende|poursuite)\b/i.test(content);
  const hasRef = /\b(article|l[oi]|décret|code)\b/i.test(content);
  if (hasSanction && !hasRef) jurIssues.push("Mention de sanctions sans référence au texte légal applicable");
  const jurScore = Math.max(0, 10 - jurIssues.length * 2.5);
  findings.audit_juridique = jurIssues;
  scores.audit_juridique = Math.round(jurScore * 10) / 10;

  const methIssues: string[] = [];
  const hasMethod = /\b(méthodologie|approche|démarche|processus|étapes|phase)\b/i.test(content);
  if (content.length > 500 && !hasMethod) methIssues.push("Absence de description méthodologique pour un contenu substantiel");
  const methScore = Math.max(0, 10 - methIssues.length * 2);
  findings.audit_methodologique = methIssues;
  scores.audit_methodologique = Math.round(methScore * 10) / 10;

  const redIssues: string[] = [];
  if (content.includes("  ")) redIssues.push("Double espaces détectés");
  const veryLongSentences = content.match(/[^.!?]{200,}[.!?]/g);
  if (veryLongSentences && veryLongSentences.length > 0) redIssues.push(`${veryLongSentences.length} phrase(s) très longue(s) (>200 caractères)`);
  const redScore = Math.max(0, 10 - redIssues.length * 1.5);
  findings.audit_redactionnel = redIssues;
  scores.audit_redactionnel = Math.round(redScore * 10) / 10;

  const cohIssues: string[] = [];
  const mentionsBCEAO = (content.match(/\bBCEAO\b/gi) || []).length;
  const mentionsCOBAC = (content.match(/\bCOBAC\b/gi) || []).length;
  if (mentionsBCEAO > 0 && mentionsCOBAC > 0) cohIssues.push("Mention simultanée BCEAO (UEMOA) et COBAC (CEMAC) — vérifier le champ");
  const cohScore = Math.max(0, 10 - cohIssues.length * 2);
  findings.audit_coherence = cohIssues;
  scores.audit_coherence = Math.round(cohScore * 10) / 10;

  const refIssues: string[] = [];
  if (regRefs.length === 0 && content.length > 300) refIssues.push("Absence de références officielles pour un contenu substantiel");
  const bareUrls = content.match(/https?:\/\/[^\s]+/g) || [];
  if (bareUrls.length > 0) refIssues.push(`${bareUrls.length} URL(s) brute(s) — formater en référence`);
  const refScore = Math.max(0, 10 - refIssues.length * 1.5);
  findings.audit_references = refIssues;
  scores.audit_references = Math.round(refScore * 10) / 10;

  const secIssues: string[] = [];
  if (req.secteur && !content.toLowerCase().includes(req.secteur.toLowerCase())) secIssues.push(`Secteur "${req.secteur}" non référencé dans le contenu`);
  const secScore = Math.max(0, 10 - secIssues.length * 2);
  findings.audit_conformite_sectorielle = secIssues;
  scores.audit_conformite_sectorielle = Math.round(secScore * 10) / 10;

  const riskIssues: string[] = [];
  const hasRisk = /\b(risque|aléa|menace|vulnérabilité|exposition)\b/i.test(content);
  if (content.length > 500 && !hasRisk) riskIssues.push("Absence d'analyse des risques pour un contenu substantiel");
  const riskScore = Math.max(0, 10 - riskIssues.length * 2.5);
  findings.audit_risques = riskIssues;
  scores.audit_risques = Math.round(riskScore * 10) / 10;

  const hypIssues: string[] = [];
  const hypMatches = content.match(/\b(si|hypothèse|supposons|en supposant|scénario|dans le cas où)\b/gi) || [];
  if (hypMatches.length > 0 && !content.includes("hypothèse")) hypIssues.push(`${hypMatches.length} conditionnel(s) détecté(s) sans explicitation des hypothèses`);
  const hypScore = Math.max(0, 10 - hypIssues.length * 2);
  findings.audit_hypotheses = hypIssues;
  scores.audit_hypotheses = Math.round(hypScore * 10) / 10;

  for (const rule of DETECTION_RULES) {
    for (const pattern of rule.patterns) {
      const flags = pattern.flags.includes('g') ? pattern.flags : (pattern.flags + 'g');
      const globalPattern = new RegExp(pattern.source, flags);
      const matches = content.matchAll(globalPattern);
      for (const match of matches) {
        const start = Math.max(0, match.index! - 40);
        const end = Math.min(content.length, match.index! + match[0].length + 40);
        const contextSnippet = content.substring(start, end);
        allDetections.push({ source_entity_type: req.document_type, source_entity_id: req.document_id || null, detection_category: rule.category, detection_rule: pattern.source, matched_text: match[0], context_snippet: contextSnippet, severity: rule.severity, auto_fix_suggestion: rule.suggestion, linked_quality_review_id: null });
      }
    }
  }

  const scoreValues = Object.values(scores);
  const overallScore = scoreValues.reduce((a, b) => a + b, 0) / Math.max(1, scoreValues.length);
  const overallRounded = Math.round(overallScore * 10) / 10;
  let passStatus = "pending";
  if (overallRounded >= 8) passStatus = "passed";
  else if (overallRounded >= 6) passStatus = "conditional";
  else passStatus = "failed";

  const { data: reviewData, error: reviewErr } = await supabaseClient.from("kos_bigfour_quality_reviews").insert({
    document_type: req.document_type, document_id: req.document_id || null, document_title: req.document_title || "Sans titre", review_batch_id: reviewBatchId,
    audit_technique_score: scores.audit_technique, audit_technique_findings: findings.audit_technique,
    audit_reglementaire_score: scores.audit_reglementaire, audit_reglementaire_findings: findings.audit_reglementaire,
    audit_juridique_score: scores.audit_juridique, audit_juridique_findings: findings.audit_juridique,
    audit_methodologique_score: scores.audit_methodologique, audit_methodologique_findings: findings.audit_methodologique,
    audit_redactionnel_score: scores.audit_redactionnel, audit_redactionnel_findings: findings.audit_redactionnel,
    audit_coherence_score: scores.audit_coherence, audit_coherence_findings: findings.audit_coherence,
    audit_references_score: scores.audit_references, audit_references_findings: findings.audit_references,
    audit_conformite_sectorielle_score: scores.audit_conformite_sectorielle, audit_conformite_sectorielle_findings: findings.audit_conformite_sectorielle,
    audit_risques_score: scores.audit_risques, audit_risques_findings: findings.audit_risques,
    audit_hypotheses_score: scores.audit_hypotheses, audit_hypotheses_findings: findings.audit_hypotheses,
    pass_status: passStatus,
    recommendation_summary: passStatus === "passed" ? "Document conforme aux standards Big Four." : passStatus === "conditional" ? "Document partiellement conforme. Actions correctives recommandées." : "Document non conforme. Révision approfondie nécessaire.",
    version: 1
  }).select("id").single();

  if (reviewErr) { console.error("Error inserting quality review:", reviewErr); return { success: false, error: reviewErr.message }; }
  const reviewId = reviewData.id;

  if (allDetections.length > 0) {
    const detectionsToInsert = allDetections.map(d => ({ ...d, linked_quality_review_id: reviewId }));
    await supabaseClient.from("kos_auto_detection_findings").insert(detectionsToInsert);
  }

  await supabaseClient.from("kos_document_production_package").insert({
    document_type: req.document_type, document_id: req.document_id || null, document_title: req.document_title || "Sans titre",
    mission_ref: req.mission_ref || null, secteur: req.secteur || null, juridiction: req.juridiction || null,
    regulateur: req.regulateur || null, type_entite: req.type_entite || null, niveau_risque: req.niveau_risque || "modere",
    overall_completion_pct: 0, quality_gate_passed: passStatus === "passed", quality_review_id: reviewId
  });

  await supabaseClient.from("kos_universal_audit_log").insert({
    event_type: "bigfour_quality_review", entity_type: req.document_type, entity_id: req.document_id || reviewId,
    action: "QUALITY_REVIEW_COMPLETED", actor: "kos-bigfour-quality-review",
    new_state: { overall_score: overallRounded, pass_status: passStatus, review_id: reviewId, detections_count: allDetections.length },
    impact: { scores, detections_by_category: allDetections.reduce((acc: any, d) => { acc[d.detection_category] = (acc[d.detection_category] || 0) + 1; return acc; }, {}) },
    correlation_id: reviewBatchId
  });

  return { success: true, review_id: reviewId, review_batch_id: reviewBatchId, overall_score: overallRounded, pass_status: passStatus, scores, findings, detections_count: allDetections.length };
}

// === FULL SCAN — Scan all regulatory documents in the database ===
async function runFullScan(supabaseClient: any, limit: number = 50) {
  const scanBatchId = crypto.randomUUID();
  const now = new Date().toISOString();
  const results: any[] = [];
  let totalDocs = 0;
  let passedDocs = 0;
  let conditionalDocs = 0;
  let failedDocs = 0;
  let totalDetections = 0;

  // 1. Scan kb_pages
  const { data: kbPages, error: kbError } = await supabaseClient.from("kb_pages").select("id, title, content, slug, secteur, juridiction").limit(limit);
  if (!kbError && kbPages) {
    totalDocs += kbPages.length;
    for (const page of kbPages) {
      try {
        const reviewReq: ReviewRequest = {
          document_type: "kb_page",
          document_id: page.id,
          document_title: page.title || page.slug || "Sans titre",
          document_content: page.content || "",
          secteur: page.secteur || "financial_services",
          juridiction: page.juridiction || "UEMOA_CEMAC",
          regulateur: "BCEAO_COBAC",
          niveau_risque: "eleve"
        };
        const r = await runQualityReview(reviewReq, supabaseClient);
        results.push({ source: "kb_pages", id: page.id, title: page.title, ...r });
        if (r.pass_status === "passed") passedDocs++;
        else if (r.pass_status === "conditional") conditionalDocs++;
        else failedDocs++;
        totalDetections += r.detections_count || 0;
      } catch { failedDocs++; }
    }
  }

  // 2. Scan kb_docs
  const { data: kbDocs, error: kdError } = await supabaseClient.from("kb_docs").select("id, title, content, secteur").limit(limit);
  if (!kdError && kbDocs) {
    totalDocs += kbDocs.length;
    for (const doc of kbDocs) {
      try {
        const reviewReq: ReviewRequest = {
          document_type: "kb_doc",
          document_id: doc.id,
          document_title: doc.title || "Sans titre",
          document_content: doc.content || "",
          secteur: doc.secteur || "regulatory",
          juridiction: "UEMOA_CEMAC",
          regulateur: "BCEAO_COBAC",
          niveau_risque: "eleve"
        };
        const r = await runQualityReview(reviewReq, supabaseClient);
        results.push({ source: "kb_docs", id: doc.id, title: doc.title, ...r });
        if (r.pass_status === "passed") passedDocs++;
        else if (r.pass_status === "conditional") conditionalDocs++;
        else failedDocs++;
        totalDetections += r.detections_count || 0;
      } catch { failedDocs++; }
    }
  }

  // 3. Scan blog articles from kos_universal_audit_log
  const { data: auditEntries, error: aeError } = await supabaseClient.from("kos_universal_audit_log").select("entity_id, new_state").eq("event_type", "blog_article_published").order("created_at", { ascending: false }).limit(limit);
  let blogCount = 0;
  if (!aeError && auditEntries) {
    for (const entry of auditEntries) {
      blogCount++;
      totalDocs++;
      try {
        const ns = entry.new_state || {};
        const reviewReq: ReviewRequest = {
          document_type: "blog_article",
          document_id: entry.entity_id,
          document_title: ns.title || "Article de blog",
          document_content: ns.content || ns.excerpt || "",
          secteur: ns.secteur || "consulting",
          juridiction: ns.juridiction || "UEMOA_CEMAC",
          regulateur: "BCEAO_COBAC",
          niveau_risque: "modere"
        };
        const r = await runQualityReview(reviewReq, supabaseClient);
        results.push({ source: "blog_article", id: entry.entity_id, title: ns.title, ...r });
        if (r.pass_status === "passed") passedDocs++;
        else if (r.pass_status === "conditional") conditionalDocs++;
        else failedDocs++;
        totalDetections += r.detections_count || 0;
      } catch { failedDocs++; }
    }
  }

  // Scan completed — log to audit
  const overallScore = totalDocs > 0 ? Math.round((passedDocs / totalDocs) * 100) : 0;
  const summary = {
    scan_batch_id: scanBatchId,
    total_documents: totalDocs,
    passed: passedDocs,
    conditional: conditionalDocs,
    failed: failedDocs,
    total_detections: totalDetections,
    overall_pass_rate: overallScore,
    sources_scanned: { kb_pages: kbPages?.length || 0, kb_docs: kbDocs?.length || 0, blog_articles: blogCount },
    scanned_at: now
  };

  await supabaseClient.from("kos_universal_audit_log").insert({
    event_type: "bigfour_full_scan",
    entity_type: "quality_scan",
    entity_id: scanBatchId,
    action: "FULL_SCAN_COMPLETED",
    actor: "kos-bigfour-quality-review",
    new_state: summary,
    impact: { results_count: results.length, detections: totalDetections },
    correlation_id: scanBatchId
  });

  return { success: true, scan_batch_id: scanBatchId, summary, results };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body: any = await req.json();

    // === HEALTH CHECK ===
    if (body.action === "health") {
      return new Response(JSON.stringify({
        success: true,
        status: "healthy",
        version: "v5",
        capabilities: ["quality_review", "full_scan", "health"],
        timestamp: new Date().toISOString()
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
    }

    // === FULL SCAN ===
    if (body.action === "full_scan") {
      const limit = body.scan_limit || 50;
      const result = await runFullScan(supabaseClient, limit);
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
    }

    // === SINGLE DOCUMENT REVIEW (default) ===
    const result = await runQualityReview(body, supabaseClient);
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (err) {
    console.error("Big Four Quality Review error:", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});