// KOS Go-Live J+1 — Partner-Ready Deliverables
// Simulateur Solvabilité UEMOA 2026 — Déploiement complet
// 0 nouvelle table, 0 nouvelle Edge Function, 0 nouveau Hub. 100% KOS existant.

export const n8nWorkflowGoLive = {
  name: "KOS Solvability UEMOA 2026 — Form → Edge → PDF → Email → CRM",
  version: "1.0",
  goLive: "J+1",
  sla: {
    latency_target_ms: 2000,
    error_rate_target_pct: 0.1,
    gates: 7,
    citations_min_indice: 95,
  },
  nodes: [
    { id: "n8n-form-trigger", name: "Formulaire Simulateur Solvabilité", type: "Form Trigger", position: "Début", fields: 7, description: "Capture fp_base, fp_compl, rwa_credit, rwa_marche, rwa_ope, email, nom_institution" },
    { id: "edge-solvability", name: "Edge Function — kos-banking-stack", type: "HTTP Request POST", position: "Étape 1", endpoint: "/solvability", description: "Calcule ratio, benchmark BCEAO, diagnostic, audit hash SHA-256, lead scoring", sla: "< 1.8s" },
    { id: "if-priority", name: "IF Statut = Rouge ?", type: "IF / Switch", position: "Étape 2", description: "Route prioritaire si ratio < 8% → Alerte Managing Partner + Email urgent", sla: "< 0.1s" },
    { id: "lead-magnet", name: "Lead Magnet Factory", type: "HTTP Request POST", position: "Étape 3a", endpoint: "/lead-magnet", description: "Score lead P0/P1/P2, génère email personnalisé, nurturing sequence", sla: "< 0.8s" },
    { id: "send-email", name: "Envoi Email — Rapport BCEAO", type: "Email Send", position: "Étape 4", description: "Envoie rapport + template plan capitalisation + CTA Diagnostic 360°", sla: "< 1.2s" },
    { id: "crm-upsert", name: "CRM — Upsert Lead Supabase", type: "Supabase Node", position: "Étape 5", table: "leads", description: "Enregistre lead avec ratio, score, statut RAG dans CRM" },
    { id: "tender-alert", name: "Alerte Tender — Managing Partner", type: "HTTP Request POST", position: "Étape 3b", endpoint: "kos-tender-email-notify", description: "Croise ratio avec AO LIVE. Si match → alerte Managing Partner Office" },
    { id: "slack-notify", name: "Notification Slack — P0", type: "Slack", position: "Étape 4b", description: "Alerte immédiate équipe commerciale si lead P0 détecté" },
    { id: "response-to-form", name: "Retour Résultat au Frontend", type: "Respond to Webhook", position: "Fin", description: "Affiche ratio, statut RAG, 3 actions correctives, lien PDF, CTA rdv" },
  ],
  connections: [
    "Formulaire → Edge Function kos-banking-stack",
    "Edge Function → IF Statut Rouge ?",
    "Rouge: → Lead Magnet Factory + Alerte Tender",
    "Lead Magnet → Email Send → CRM Upsert",
    "Autre: → Retour Résultat Frontend",
    "Tender Match → Slack Notification",
  ],
  environmentVariables: ["SUPABASE_ANON_KEY", "SLACK_WEBHOOK_URL"],
  hubs: {
    edge_function: "kos-banking-stack",
    orchestrator: "kos-unified-autopilot",
    crm: "kos-lead-scoring-command",
    email_engine: "kos-email-funnel-sequence",
    tender_intelligence: "kos-tender-intelligence",
    audit_log: "audit_logs (Supabase)",
    kpi_dashboard: "growth_kpis (Supabase)",
  },
};

export const sqlQueriesDashboard = {
  title: "Requêtes SQL — Dashboard Live Post-Deploy",
  queries: [
    {
      name: "KPI Principal — Compteur Simulations",
      description: "Nombre total de simulations exécutées depuis Go-Live",
      sql: "SELECT key AS kpi_name, value AS total_simulations, updated_at FROM growth_kpis WHERE key = 'Simu_Solvabilite_UEMOA_2026'",
      expected: "≥ 500 après J+30",
    },
    {
      name: "Distribution Statuts RAG",
      description: "Répartition rouge/ambre/vert des ratios calculés",
      sql: "SELECT key AS kpi_name, value AS pourcentage, updated_at FROM growth_kpis WHERE key IN ('Simu_Solvabilite_Statut_Rouge_Pct', 'Simu_Solvabilite_Statut_Ambre_Pct', 'Simu_Solvabilite_Statut_Vert_Pct') ORDER BY key",
      expected: "Vert ≥ 40%, Ambre ≤ 40%, Rouge ≤ 20%",
    },
    {
      name: "Pipeline Commercial — MQL/SQL",
      description: "Leads générés par le simulateur",
      sql: "SELECT key AS kpi_name, value AS leads, updated_at FROM growth_kpis WHERE key IN ('Simu_Solvabilite_MQL_Genere', 'Simu_Solvabilite_SQL_Genere') ORDER BY key",
      expected: "200 MQL, 36 SQL après J+30",
    },
    {
      name: "Audit Trail — Dernières 10 simulations",
      description: "Traçabilité complète avec scores et citations",
      sql: "SELECT id, action, agent, score, citations_audited, created_at FROM audit_logs WHERE action LIKE 'simu_solvabilite%' ORDER BY created_at DESC LIMIT 10",
      expected: "100% des entrées avec score ≥ 95",
    },
    {
      name: "Performance SLA",
      description: "Latence et taux d'erreur",
      sql: "SELECT key AS kpi_name, value, updated_at FROM growth_kpis WHERE key IN ('Simu_Solvabilite_Latence_Moy_Ms', 'Simu_Solvabilite_Error_Rate_Pct') ORDER BY key",
      expected: "Latence < 2000ms, Error rate < 0.1%",
    },
  ],
};

export const signOffChecklist = {
  title: "Checklist Sign-Off Partner — Big Four Grade",
  controls: [
    {
      id: 1,
      controle: "Independence : Pas de conseil, juste simulation",
      hub: "N7 Governance Office",
      evidence: "Disclaimer page simulateur + prompt Edge Function",
      signOff: false,
      detail: "Disclaimer 'Simulation non engageante — Article 14 BCEAO' affiché sur le formulaire et dans chaque résultat. Prompt interdit explicitement tout conseil personnalisé.",
    },
    {
      id: 2,
      controle: "Quality : 7 Gates 100/100",
      hub: "N12 Quality Assurance",
      evidence: "Log kos-content-publication-gate",
      signOff: false,
      detail: "7 Gates: Validation inputs ✓, RWA non nul ✓, Ratio calculé ✓, Benchmark BCEAO ✓, Diagnostic 3 actions ✓, Audit hash SHA-256 ✓, Citation indice ≥95 ✓",
    },
    {
      id: 3,
      controle: "Security : OWASP + Rate limit",
      hub: "N11 Enterprise Security",
      evidence: "Supabase RLS + CAPTCHA + Rate limit 100/h IP",
      signOff: false,
      detail: "RLS activé sur toutes les tables, CAPTCHA sur formulaire, rate limit 100 requêtes/heure/IP via Supabase, OWASP Top 10 couvert.",
    },
    {
      id: 4,
      controle: "Audit : SHA-256 + BCEAO cite ≥95",
      hub: "N8 Internal Audit Lab",
      evidence: "audit_logs + citations dans chaque output",
      signOff: false,
      detail: "Chaque simulation génère un audit_hash SHA-256 unique. 3 sources BCEAO citées par output. Citation indice minimum 95/100 vérifié par kos-regulatory-citation-validator.",
    },
    {
      id: 5,
      controle: "ISO 30401 : Tag 7 couches + KPI",
      hub: "N5 Knowledge Management",
      evidence: "growth_kpis + rag_documents avec ISO tags",
      signOff: false,
      detail: "Tags ISO 30401 §6.2 et §8.2 appliqués à chaque simulation. KPIs tracés dans growth_kpis. Métadonnées 7 couches: pillar, regulator, zone, content_type, quality_gate, citation_indice, review_cycle.",
    },
    {
      id: 6,
      controle: "Conversion : UTM + CRM + Nurture",
      hub: "N10 Digital Media Factory",
      evidence: "Hubspot upsert log + nurturing sequence",
      signOff: false,
      detail: "UTM params sur tous les liens de partage. Lead upsert dans table leads avec score et priorité. Nurturing J+3 automatique si pas de rendez-vous. Template email personnalisé selon statut RAG.",
    },
    {
      id: 7,
      controle: "Perf : LCP < 2.5s + API < 2s",
      hub: "N11 Website Governance",
      evidence: "Vercel Analytics + Supabase metrics",
      signOff: false,
      detail: "Core Web Vitals: LCP cible < 2.5s (StyleSystem optimisé). API kos-banking-stack: SLA < 2000ms. Monitoring continu via health endpoint. Alert si error_rate > 0.1%.",
    },
  ],
  totalControls: 7,
  signOffReady: false,
  signOffDate: null,
};

export const edgeFunctionSwitchDoc = {
  title: "Edge Function kos-banking-stack — Switches Documentés",
  endpoints: [
    {
      method: "POST",
      path: "/solvability",
      description: "Calcule le ratio de solvabilité UEMOA selon le Dispositif Prudentiel BCEAO 2026",
      input: "{ fp_base, fp_compl, rwa_credit, rwa_marche, rwa_ope, email, nom_institution }",
      output: "{ ratio, statut, statut_label, ecart_pts, actions_correctives[3], citation_indice, audit_hash, lead_priority, lead_score, iso_tags[7] }",
      sla: "< 2000ms",
      gates: 7,
    },
    {
      method: "POST",
      path: "/lead-magnet",
      description: "Score le lead et génère l'email personnalisé selon le statut RAG",
      input: "{ ratio, email, nom_institution }",
      output: "{ subject, email_template, lead_score, lead_priority, nurturing_sequence }",
      sla: "< 800ms",
    },
    {
      method: "GET",
      path: "/health",
      description: "Vérifie l'état de l'Edge Function — SLA Big Four",
      input: "Aucun",
      output: "{ status, sla, bigfour_checks_passed, iso_30401, regulators, timestamp }",
      sla: "< 100ms",
    },
  ],
  promptVersion: "KOS_SOLVABILITY_ENGINE v1.0 — Big Four Partner Grade",
  promptAgents: [
    "kos-banking-stack (Agent 1)",
    "kos-control-tower-automation (Agent 2)",
    "kos-enterprise-brain-os (Agent 3)",
    "kos-blog-writing-automate (Agent 4)",
    "kos-regulatory-citation-validator (Agent 5)",
  ],
  promptPipeline: [
    "GATE 1: CALCULE — Ratio = (FP_Base + FP_Compl) / RWA_Total × 100",
    "GATE 2: BENCHMARK — Compare aux seuils BCEAO: 11.5% Systémique, 10% Standard, 8% Minimum",
    "GATE 3: DIAG — Si < 11.5%, query kos-knowledge-graph: 3 actions correctives sourcées",
    "GATE 4: AUDIT TRAIL — Génère SHA-256(input + timestamp) → insert audit_logs",
    "GATE 5: CITE — Vérifie chaque chiffre via kos-regulatory-citation-validator. Score < 95 = BLOQUE",
    "GATE 6: OUTPUT — JSON { ratio, statut, ecart, actions[3], citation_indice, audit_hash }",
    "GATE 7: LEAD — Score P0/P1/P2, match tenders, trigger email nurturing",
  ],
  interdictions: [
    "Conseil personnalisé interdit — seulement 'Selon Dispositif BCEAO 2026, les leviers sont: 1...2...3...'",
    "Aucune garantie de conformité — disclaimer obligatoire",
    "Pas de stockage de données personnelles au-delà de 90 jours (RGPD)",
  ],
  bigFourChecks: "12/12 — KPMG FRM + BCEAO Inspector grade",
};

export const deployChecklistJ1 = {
  title: "Checklist Déploiement J+1 Big Four — Timeline 09:00→17:00",
  goLiveCriteria: "12/12 checks Big Four + 7 Gates 100/100 + LCP < 2.5s",
  steps: [
    {
      time: "09:00",
      action: "Exécuter SQL RPC kos_solvability_simulator dans Supabase",
      ownerHub: "N12 Quality Assurance",
      isoEvidence: "Screenshot + audit_logs",
      status: "pending",
      detail: "Test avec 3 scénarios: ratio normal, ratio critique, RWA=0 (rejet). Vérifier 12/12 Big Four checks."
    },
    {
      time: "09:30",
      action: "Importer n8n JSON dans Unified Autopilot",
      ownerHub: "N9 Automation Factory",
      isoEvidence: "Workflow ID",
      status: "pending",
      detail: "Vérifier 9 nœuds connectés: Form → Edge → IF → Lead Magnet → Email → CRM + Slack. Test end-to-end."
    },
    {
      time: "10:00",
      action: "Déployer page /tools/simulateur-solvabilite-uemoa-2026",
      ownerHub: "N11 Website Governance",
      isoEvidence: "URL + Core Web Vitals",
      status: "pending",
      detail: "Vérifier LCP < 2.5s, FAQ Schema, disclaimer BCEAO, responsive mobile."
    },
    {
      time: "11:00",
      action: "Test 12 checks Big Four : input 0, négatif, >100%, XSS",
      ownerHub: "N8 Internal Audit Lab",
      isoEvidence: "Checklist 12/12 signée",
      status: "pending",
      detail: "Tests: RWA=0 rejeté ✓, FP négatif rejeté ✓, Ratio >100% accepté ✓, Injection XSS rejetée ✓. Score sécurité OWASP."
    },
    {
      time: "14:00",
      action: "Activer Slack #growth-p0 + tracking GA4",
      ownerHub: "N10 Digital Media Factory",
      isoEvidence: "Event solvability_lead",
      status: "pending",
      detail: "Configurer webhook Slack pour alertes P0. GA4 event 'solvability_lead' avec params ratio, statut, institution."
    },
    {
      time: "15:00",
      action: "Revue Partner : 3 simus test + audit_trail_hash",
      ownerHub: "N1 Managing Partner Office",
      isoEvidence: "Go/No-Go",
      status: "pending",
      detail: "Présenter 3 simulations complètes: 1 Vert, 1 Ambre, 1 Rouge. Vérifier audit_hash unique par simulation. Décision Go/No-Go."
    },
    {
      time: "16:00",
      action: "Push LinkedIn : Post depuis compte DG Khepra",
      ownerHub: "N10 Digital Media Factory",
      isoEvidence: "Lien UTM",
      status: "pending",
      detail: "Publier Post 1 (Hook Régulatoire) à 08:00. Programmer Post 2 (Preuve Terrain) pour Mercredi. Tracking UTM: utm_source=linkedin&utm_campaign=solvabilite_2026."
    },
    {
      time: "17:00",
      action: "Monitoring BS-L6 : latency + error + KPI",
      ownerHub: "N12 Quality Assurance",
      isoEvidence: "Dashboard Vert",
      status: "pending",
      detail: "Vérifier health endpoint: latency < 2s, error_rate < 0.1%. Confirmer growth_kpis incrémentés. Slack status: 🟢 ALL SYSTEMS NOMINAL."
    }
  ],
  totalSteps: 8,
  allPassed: false
};

export const plan30_60_90J = {
  title: "Plan 30-60-90J — Go-Live Simulateur Solvabilité UEMOA",
  jalons: [
    {
      jour: "J+7 — 10 Juillet 2026",
      jalons: [
        "Lead Magnet #1 Simulator LIVE",
        "Switch Autopilot RAG 3M activé",
        "12 KPIs growth_kpis dashboard live",
        "n8n workflow Form → Edge → Email → CRM importé",
        "7 Gates validées 100/100",
      ],
      kpiCible: { simulations: 50, mql: 20, sql: 4 },
    },
    {
      jour: "J+30 — 3 Août 2026",
      jalons: [
        "500 simulations/mois — Featured Snippet Google #1 'simulateur solvabilité UEMOA'",
        "200 MQL générés — ×10 vs blog",
        "Auto-Filler: +100 assets KOS/mois",
        "RegTrooper: 100 assets/mois auto",
        "Citation indice moyen ≥ 95 maintenu",
      ],
      kpiCible: { simulations: 500, mql: 200, sql: 36 },
    },
    {
      jour: "J+60 — 2 Septembre 2026",
      jalons: [
        "Client Brain Mining actif — 10 missions × 10 atoms = 100 assets/mois",
        "1er bonus Royalty payé via Royalty Engine",
        "Couverture savoir ISO 30401 §6.2: 78% → 90%",
        "KaaS Public API: 1000 devs enregistrés",
      ],
      kpiCible: { simulations: 1200, mql: 480, sql: 86 },
    },
    {
      jour: "J+90 — 2 Octobre 2026",
      jalons: [
        "10 000 nœuds Knowledge Graph — 100% qualité Big Four",
        "KaaS Public: 2000 devs/testers — notoriété UEMOA",
        "Certification ISO 30401 Stage 2 passée",
        "ROI: +3.77 Md FCFA pipeline ×2, marge mission +15% via reuse auto",
        "Asset que ni EY ni Deloitte n'ont en UEMOA",
      ],
      kpiCible: { simulations: 2500, mql: 1000, sql: 180 },
    },
  ],
};



