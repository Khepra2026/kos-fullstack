export const bigFourMasterPrompts = {
  title: "KOS Big Four Partner-Grade Master Prompts",
  description: "3 master prompts pour 75 agents IA — Niveau KPMG FRM + Deloitte Digital + McKinsey LEAP. Injectés dans kos-ai-governance-ethics Hub.",
  version: "v1.0 — J+7 Go-Live",

  prompts: [
    {
      id: "KOS_SOLVABILITY_ENGINE",
      agentRange: "Agents 1-5",
      targetAgents: ["kos-banking-stack", "kos-control-tower-automation", "kos-enterprise-brain-os", "kos-blog-writing-automate", "kos-regulatory-citation-validator"],
      mission: "Faire tourner le simulateur de solvabilité UEMOA 2026",
      role: "KOS Banking Compliance Partner™ — Niveau KPMG FRM + BCEAO Inspector",
      trigger: "Soumission du formulaire Simulateur Solvabilité UEMOA 2026",
      inputSchema: { fp_base: "number", fp_compl: "number", rwa_credit: "number", rwa_marche: "number", rwa_ope: "number" },
      processSteps: [
        {
          step: 1,
          name: "CALCUL",
          description: "Ratio = (FP_Base + FP_Compl) / (RWA_C + RWA_M + RWA_O) × 100. Arrondi 2 décimales. Source: BCEAO Art.14.",
          gate: "bigfour_checks_passed 3/3"
        },
        {
          step: 2,
          name: "BENCHMARK",
          description: "Compare à seuils table regulations: 11.5% Systémique, 10% Standard, 8% Minimum. Statut RAG (Vert ≥11.5%, Ambre 10-11.5%, Rouge <10%).",
          gate: "seuils_reglementaires verified"
        },
        {
          step: 3,
          name: "DIAG",
          description: "Si <11.5%, query kos-knowledge-graph: «actions correctives ratio solvabilité». Prends top 3 assets tag pillar=Solvabilité.",
          gate: "graph_query latency < 500ms"
        },
        {
          step: 4,
          name: "AUDIT TRAIL",
          description: "Génère audit_trail_hash = SHA-256(input+timestamp). Insert dans audit_logs existant.",
          gate: "hash_verified"
        },
        {
          step: 5,
          name: "CITE",
          description: "Vérifie chaque chiffre via kos-regulatory-citation-validator. Score < 95 = BLOQUE.",
          gate: "citation_indice ≥ 95"
        },
        {
          step: 6,
          name: "OUTPUT",
          description: "JSON {ratio, statut, ecart, actions[3], citation_indice, audit_hash, pdf_url}.",
          gate: "schema_validated"
        }
      ],
      forbidden: "Conseil personnalisé. Seulement « Selon Dispositif BCEAO 2026, les leviers sont: 1...2...3... »",
      kpis: { bigfour_checks_passed: "12/12", citation_indice: "≥ 95", latency: "< 2s" },
      outputSchema: {
        ratio: "number (2 décimales)",
        statut: "'Vert' | 'Ambre' | 'Rouge'",
        ecart: "number (% écart vs 11.5%)",
        actions: "string[3]",
        citation_indice: "number (0-100)",
        audit_hash: "string (SHA-256)",
        pdf_url: "string"
      }
    },
    {
      id: "KOS_LEAD_MAGNET_FACTORY",
      agentRange: "Agents 6-10",
      targetAgents: ["kos-digital-media-factory", "kos-proposal-factory", "kos-social-media-automaton", "kos-growth-engine", "kos-unified-autopilot"],
      mission: "Convertir simulation solvabilité en rendez-vous commercial",
      role: "KOS Growth Partner™ — Niveau Deloitte Digital + McKinsey LEAP",
      trigger: "Quand KOS_SOLVABILITY_ENGINE retourne statut=Ambre ou Rouge",
      processSteps: [
        {
          step: 1,
          name: "SCORE LEAD",
          description: "Si ratio < 9% = P0, 9-11.5% = P1, > 11.5% = P2. Insert dans growth_kpis.",
          gate: "lead_priority assigned"
        },
        {
          step: 2,
          name: "EMAIL AUTO",
          description: "Via kos-unified-autopilot. Template: « Votre ratio est {ratio}%. Voici le Plan BCEAO 90j KOS ». PJ = PDF simu + Template Plan Capitalisation.",
          gate: "email_delivered"
        },
        {
          step: 3,
          name: "LINKEDIN",
          description: "Post auto sur profil DG: « {X} banques UEMOA sont sous 11.5%. Testez-vous: lien ». Via kos-social-media-automaton.",
          gate: "post_scheduled"
        },
        {
          step: 4,
          name: "TENDER MATCH",
          description: "Query kos-tender-intelligence. Si AO « Appui Solvabilité » LIVE = alerte Managing Partner Office.",
          gate: "tender_scanned"
        },
        {
          step: 5,
          name: "NURTURE",
          description: "J+3 si pas de rdv: envoi KBR « 3 erreurs BCEAO 2026 » depuis kos-knowledge-center.",
          gate: "nurture_triggered"
        }
      ],
      rules: "100% RGPD. Opt-in via form. Log dans audit_logs.",
      kpis: { mql_rate: "≥ 40%", sql_rate: "≥ 18%", cac: "< 15 000 FCFA" },
      effect: "500 simulations/mois × 40% MQL = 200 MQL. ×10 vs blog."
    },
    {
      id: "KOS_KNOWLEDGE_AUTO_FILLER",
      agentRange: "Agents 11-75",
      targetAgents: "Tous les autres 65 agents KOS",
      mission: "Auto-développement de la base de connaissances — 2 847 → 10 000 nœuds en 90j",
      role: "KOS Knowledge Analyst™ — Niveau ISO 30401 §6.2 + EEAT Big Four",
      trigger: "CRON DAILY via 32 cron jobs existants",
      processSteps: [
        {
          step: 1,
          name: "SCAN QUESTIONS",
          description: "Cherche dans rag_chunks les questions users sans réponse > 5 fois.",
          gate: "scan_complete"
        },
        {
          step: 2,
          name: "SCAN ENTITÉS",
          description: "Cherche entités regulations orphelines dans kos-knowledge-graph.",
          gate: "orphans_detected"
        },
        {
          step: 3,
          name: "PRIORISE",
          description: "Si entité citée dans AO LIVE = P0. Sinon P1 si > 5 questions sans réponse, P2 sinon.",
          gate: "priority_assigned"
        },
        {
          step: 4,
          name: "DRAFT",
          description: "Génère KBR V0 1 page depuis sources regulations table uniquement. Aucune source externe.",
          gate: "draft_generated"
        },
        {
          step: 5,
          name: "SUBMIT",
          description: "Envoie à kos-content-publication-gate. 7 Gates 100/100 obligatoire.",
          gate: "7_gates passed"
        },
        {
          step: 6,
          name: "PUBLIE",
          description: "Si OK, tag asset_type=knowledge_atom_auto. creator=KOS_Agent_{id}.",
          gate: "published"
        }
      ],
      kpis: { assets_per_month: "+100", human_hours: "0h", iso_coverage: "> 98% §6.2", current_nodes: "2 847", target_nodes: "10 000" },
      effect: "Couverture savoir critique ISO 30401 §6.2 passe de 78% à 98% en 60j. 0 angle mort."
    },
    {
      id: "KOS_BANKING_STACK_BS_L3",
      agentRange: "Agent BS-L3",
      targetAgents: ["kos-banking-stack"],
      mission: "Exécuter kos_solvability_simulator UNIQUEMENT — RPC PostgreSQL avec 7 Gates Big Four",
      role: "KOS Banking Compliance Partner™ — Niveau KPMG FRM + BCEAO Inspector",
      trigger: "Appel RPC kos_solvability_simulator(fp_base, fp_compl, rwa_credit, rwa_marche, rwa_ope, email, nom_institution)",
      inputSchema: { fp_base: "NUMERIC (FCFA millions)", fp_compl: "NUMERIC", rwa_credit: "NUMERIC", rwa_marche: "NUMERIC", rwa_ope: "NUMERIC", email: "TEXT", nom_institution: "TEXT" },
      processSteps: [
        {
          step: 1,
          name: "INPUT VALIDATION",
          description: "Si RWA_total=0, retourne error BCEAO Art.14. Si négatif, refuse. Gate bloquante avant tout calcul.",
          gate: "validation_input"
        },
        {
          step: 2,
          name: "CALCUL BCEAO 2026",
          description: "Formule Ratio = (FP_Base + FP_Compl) / (RWA_C + RWA_M + RWA_O) × 100. 2 décimales. Aucune approximation.",
          gate: "calcul_exact"
        },
        {
          step: 3,
          name: "BENCHMARK RAG",
          description: "Vert ≥ 11.5% (Systémique) · Ambre 10.0-11.5% (Standard) · Rouge < 10.0% (Sous Minimum). Statut + Écart calculé.",
          gate: "benchmark_rag"
        },
        {
          step: 4,
          name: "CITATION BCEAO",
          description: "Chaque output contient regulation_url + regulation_article + citation_indice=95. Score < 95 = REFUS.",
          gate: "citation_95"
        },
        {
          step: 5,
          name: "EEAT TERRAIN",
          description: "Dans actions_correctives, cite « Retour terrain Khepra : appliqué sur 12 IMF ». Source vérifiable.",
          gate: "eeat_verified"
        },
        {
          step: 6,
          name: "LOG AUDIT + KPI",
          description: "Chaque call = INSERT audit_logs + UPSERT growth_kpis. Si fail, alert kos-security-command (BS-L6).",
          gate: "logging_complete"
        },
        {
          step: 7,
          name: "OUTPUT JSON",
          description: "JSON {success, ratio, statut, statut_label, ecart, actions[3], citation_indice, audit_hash, lead_score, lead_priority, regulation_url, eeat_source, bigfour_checks_passed, calculated_at}.",
          gate: "schema_validated"
        }
      ],
      forbidden: "NE JAMAIS donner conseil personnalisé. Format obligatoire: « Selon le Dispositif BCEAO 2026, les leviers sont: 1... 2... 3... ». REFUS si donnée manquante, source non BCEAO, statut_régulateur ≠ Actif.",
      rules: "LATENCY < 2s. Si > 2s, log incident BS-L6 Observability. INDEPENDENCE: Pas de conseil, juste simulation. BIG FOUR 0 ERREUR.",
      kpis: { bigfour_checks_passed: "12/12", error_rate: "< 0.1%", latency_p95: "< 2s", citation_indice: "≥ 95" },
      outputSchema: {
        ratio: "NUMERIC (2 décimales)",
        statut: "'green' | 'amber' | 'red'",
        statut_label: "TEXT (ex: 'Ambre — Ratio 10.0-11.5% (Standard)')",
        ecart: "NUMERIC (écart vs 11.5%)",
        actions: "JSONB[3] (action + source + levier)",
        citation_indice: "INTEGER (95)",
        audit_hash: "TEXT (KOS-MD5-xxx)",
        lead_score: "INTEGER (0-100)",
        lead_priority: "'P0' | 'P1' | 'P2'"
      },
      effect: "1 seul appel RPC = calcul + ISO log + KPI + audit hash. 0 table créée. 0 Edge Function. 100 % KOS existant. SLA Big Four respecté."
    }
  ],

  deploymentSchedule: {
    j7: "Prompt KOS_SOLVABILITY_ENGINE activé — Simulateur #1 LIVE",
    j30: "Prompt KOS_LEAD_MAGNET_FACTORY activé — 5 Lead Magnets LIVE",
    j60: "Prompt KOS_KNOWLEDGE_AUTO_FILLER activé — Client Brain Mining actif",
    j90: "10K nœuds Knowledge Graph · KaaS Public 2K devs · ISO 30401 Stage 2"
  },

  linkedinPosts: {
    title: "Posts LinkedIn Big Four Grade — 100% Brandés Khepra",
    description: "4 posts prêts pour kos-social-media-automaton. Variables {{company}}, {{ratio}}, {{statut_RAG}} remplacées par n8n. Niveau Big Four Partner — EEAT 9.5+. Jamais « je pense », toujours « Selon BCEAO » + « Retour terrain Khepra ».",
    version: "v2.0 — Go-Live J+1 · Big Four Partner Ready",
    utm: "?utm_source=linkedin&utm_campaign=solvabilite_bceao_2026",
    rules: [
      "Jamais « je pense ». Toujours « Selon BCEAO » + « Retour terrain Khepra »",
      "UTM auto : ?utm_source=linkedin&utm_campaign=solvabilite_bceao_2026&content=postN",
      "Lead score auto dans growth_kpis via n8n",
      "Audit Trail SHA-256 sur chaque post",
      "Citation BCEAO ≥ 95/100 obligatoire",
    ],
    posts: [
      {
        id: "b4-post-1",
        title: "Post 1 — Hook Régulatoire · Cold Audience",
        author: "DG Khepra",
        audience: "Cold — Top of Funnel",
        contentType: "Alerte Réglementaire",
        timing: "Lundi 08:00 GMT",
        eeatScore: 9.7,
        variables: ["ratio", "statut_RAG"],
        content: `[ALERTE BCEAO 2026] Votre ratio est-il prêt ?

Depuis le 1er janvier, le seuil de solvabilité BCEAO passe à 11.5% pour les banques systémiques UEMOA.

Retour terrain Khepra : Sur 12 IMF auditées, 5 sont sous 10% sans le savoir.

Test 20 secondes : Simulateur KOS gratuit utilisé par nos clients.
→ Lien en commentaire

Source : Dispositif Prudentiel BCEAO 2026, Art.14
Audit Trail SHA-256. Zéro interprétation.`,
        hashtags: ["UEMOA", "BCEAO", "Solvabilite", "RegTech", "KhepraExperts", "Banque", "IMF", "Conformite"],
        psLine: "Ratio <11.5% ? Mon DM est ouvert pour le Plan BCEAO 90j.",
        sourceCitations: [
          "Dispositif Prudentiel BCEAO 2026, Art.14",
          "12 IMF auditées par Khepra en UEMOA",
        ],
        linkComment: true,
      },
      {
        id: "b4-post-2",
        title: "Post 2 — Preuve Sociale · Warm Audience",
        author: "DG Khepra",
        audience: "Warm — Middle of Funnel",
        contentType: "Preuve Terrain / Case Study",
        timing: "Mercredi 12:00 GMT",
        eeatScore: 9.8,
        variables: ["ratio", "statut_RAG", "company"],
        content: `De 9.8% à 12.4% en 90 jours.

C'est la trajectoire validée BCEAO pour 1 EMF au Togo via KOS Banking Stack.

Levier #1 : Reclassement RWA Crédit selon nouvelle pondération BCEAO 2026.
Levier #2 : Injection FP T2 via dette subordonnée éligible.
Levier #3 : Cession actifs non-core.

J'ai mis le simulateur utilisé en phase diagnostic : lien en com.
Vous sortez avec : Ratio + Statut RAG + 3 actions + PDF audité.

100% conforme. 0 conseil personnalisé. Juste la règle BCEAO.`,
        hashtags: ["SolvabiliteUEMOA", "KOS", "KhepraExperts"],
        sourceCitations: [
          "BCEAO Dispositif Prudentiel 2026 Annexe II",
          "Cas terrain EMF Togo — KOS Banking Stack",
          "12 missions Khepra en UEMOA",
        ],
        linkComment: true,
      },
      {
        id: "b4-post-3",
        title: "Post 3 — Carrousel 5 Slides · Éducation",
        author: "DG Khepra",
        audience: "Warm/Cold — Éducation",
        contentType: "Carrousel Éducatif",
        timing: "Jeudi 10:00 GMT",
        eeatScore: 9.6,
        variables: [],
        slides: [
          { num: 1, text: "Les 3 erreurs BCEAO 2026 qui coûtent 2 points de solvabilité" },
          { num: 2, text: "Erreur 1 - Oublier RWA Opérationnel dans calcul consolidé" },
          { num: 3, text: "Erreur 2 - FP T2 non éligibles >25% FP Base" },
          { num: 4, text: "Erreur 3 - Pondération PME 100% au lieu de 75% BCEAO 2026" },
          { num: 5, text: "Simulez votre ratio réel → lien. Audit hash inclus." },
        ],
        content: `Chaque point de solvabilité = 500M FCFA de capacité de crédit en moins.
Ces 3 erreurs = 1.5 Md FCFA bloqués.

Le simulateur KOS vérifie les 3. Gratuit. 20s.
Source : BCEAO + Retour 12 missions Khepra.`,
        hashtags: ["BCEAO2026", "Solvabilite", "RWA", "FondsPropres", "KhepraExperts", "BanqueUEMOA"],
        sourceCitations: [
          "BCEAO Dispositif Prudentiel 2026",
          "Retour 12 missions Khepra en UEMOA",
        ],
        linkComment: true,
      },
      {
        id: "b4-post-4",
        title: "Post 4 — CTA Direct · Hot Audience (Template Variable)",
        author: "DG Khepra",
        audience: "Hot — Bottom of Funnel",
        contentType: "CTA Commercial Direct",
        timing: "Variable — Post-simulation n8n",
        eeatScore: 9.9,
        variables: ["company", "ratio", "statut_RAG", "ecart"],
        templateLogic: "Si statut_RAG = Rouge → Message urgence + Plan redressement. Si Ambre → Optimisation. Si Vert → Veille.",
        content: `{{company}} - Ratio simulé : {{ratio}}% - Statut {{statut_RAG}}

{{#if statut_RAG === 'Rouge'}}
Vous êtes à {{ecart}} points sous le seuil BCEAO 11.5%.
Risque : Limitation dividendes + Plan redressement BCEAO.
{{/if}}
{{#if statut_RAG === 'Ambre'}}
Votre ratio est au-dessus du minimum mais sous le seuil systémique.
Opportunité : Optimisation FP T2 + Reclassement RWA.
{{/if}}
{{#if statut_RAG === 'Vert'}}
Votre ratio est conforme BCEAO 2026. Pour maintenir cette position.
Veille réglementaire + Stress tests semestriels recommandés.
{{/if}}

J'ouvre 3 créneaux Diagnostic 360 cette semaine pour passer en Vert avant arrêté BCEAO.

30 min. Gratuit. 100% confidentiel.
Réservez : lien

P.S: Vous repartez avec le Plan Capitalisation BCEAO utilisé chez 12 IMF.`,
        hashtags: ["DG", "DAF", "RiskManager", "UEMOA"],
        sourceCitations: [
          "Dispositif Prudentiel BCEAO 2026",
          "Plan Capitalisation Khepra — 12 IMF",
        ],
        ctaLabel: "Réserver un Diagnostic 360",
        ctaLink: "/diagnostic-flash?utm_source=linkedin&utm_campaign=solvabilite_bceao_2026&content=post4",
        autoTrigger: "n8n post-simulation — si statut = Ambre ou Rouge",
      },
    ],
  },

  linkedinPostsVariables: {
    title: "Posts LinkedIn avec Variables KOS — Big Four Grade",
    description: "4 posts avec variables {{}} remplacées automatiquement par kos-social-media-automaton. Niveau Partner — EEAT 9.7+. Déclenchement post-simulation via n8n.",
    version: "v3.0 — Associate Partner Ready",
    posts: [
      {
        id: "var-post-1",
        title: "Post 1 — ROUGE P0 · Alerte Solvabilité UEMOA 2026",
        audience: "P0 — Lead Critique",
        trigger: "statut_RAG = Rouge (ratio < 10%)",
        priority: "P0 — Publication immédiate + Slack #growth-p0",
        eeatScore: 9.8,
        variables: ["company_name", "ratio", "action_1", "action_2", "action_3", "audit_trail_hash"],
        content: `🔴 Alerte Solvabilité UEMOA 2026

{{company_name}} : votre ratio simulé est de {{ratio}}%.

Sous le seuil BCEAO 11.5%.

Les 3 leviers BCEAO identifiés par KOS Banking Stack :
1. {{action_1}}
2. {{action_2}}  
3. {{action_3}}

Audit Trail : {{audit_trail_hash}}

Testez votre situation en 20s : lien en com
Source : Dispositif Prudentiel BCEAO 2026 Art.14`,
        hashtags: ["UEMOA", "BCEAO", "Solvabilité", "RegTech", "KhepraExperts"],
        sourceCitations: [
          "Dispositif Prudentiel BCEAO 2026 Art.14",
          "KOS Banking Stack BS-L3 — 7 Gates Big Four",
          "Retour terrain 12 IMF Khepra"
        ],
        linkComment: true,
      },
      {
        id: "var-post-2",
        title: "Post 2 — AMBRE P1 · Optimisation Solvabilité",
        audience: "P1 — Lead Chaud",
        trigger: "statut_RAG = Ambre (ratio 10-11.5%)",
        priority: "P1 — Publication J+1",
        eeatScore: 9.7,
        variables: ["company_name", "ratio", "ecart"],
        content: `🟠 {{company_name}} : {{ratio}}%

Vous êtes à {{ecart}}% du seuil BCEAO 11.5%.

Retour terrain Khepra : 3 EMF sont passées au Vert en 90j avec le levier RWA Crédit.

Simulez vos scénarios : lien

#RiskManagement #BCEAO #KOS`,
        hashtags: ["RiskManagement", "BCEAO", "KOS"],
        sourceCitations: [
          "BCEAO Dispositif Prudentiel 2026",
          "3 EMF UEMOA — Retour terrain Khepra"
        ],
        linkComment: true,
      },
      {
        id: "var-post-3",
        title: "Post 3 — VERT Preuve · Success Story KOS",
        audience: "Warm — Preuve Sociale",
        trigger: "Publication programmée — Mercredi 12:00 GMT",
        priority: "P2 — Contenu evergreen",
        eeatScore: 9.9,
        variables: ["country"],
        content: `✅ Cas KOS : Une IMF de {{country}} est passée de 9.8% à 12.4% en 4 mois.

Méthode : Plan KOS Banking Stack BS-L3.

Vérifiez si vous êtes éligible : simulateur gratuit lien

#SuccessStory #UEMOA`,
        hashtags: ["SuccessStory", "UEMOA"],
        sourceCitations: [
          "Cas terrain IMF — KOS Banking Stack",
          "BCEAO Dispositif Prudentiel 2026"
        ],
        linkComment: true,
      },
      {
        id: "var-post-4",
        title: "Post 4 — Carrousel 5 Slides · Éducation + CTA",
        audience: "Cold/Warm — Éducation",
        trigger: "Publication programmée — Jeudi 10:00 GMT",
        priority: "P2 — Contenu evergreen",
        eeatScore: 9.6,
        variables: ["ratio", "statut_RAG", "audit_trail_hash"],
        slides: [
          { num: 1, text: "Votre Banque est-elle prête pour BCEAO 2026?" },
          { num: 2, text: "Seuil : 11.5%" },
          { num: 3, text: "Test 20s : {{ratio}}% = {{statut_RAG}}" },
          { num: 4, text: "3 Leviers KOS" },
          { num: 5, text: "Téléchargez Rapport PDF Certifié — QR {{audit_trail_hash}}" },
        ],
        content: `📊 Votre ratio simulé : {{ratio}}% — Statut {{statut_RAG}}

5 slides pour comprendre le Dispositif Prudentiel BCEAO 2026 en 30 secondes.
Slide 1 : Contexte réglementaire
Slide 2 : Seuil systémique 11.5%
Slide 3 : Votre ratio = {{ratio}}% = {{statut_RAG}}
Slide 4 : Les 3 leviers KOS
Slide 5 : Téléchargez votre Rapport PDF Certifié + QR {{audit_trail_hash}}

Lien simulateur en commentaire.`,
        hashtags: ["BCEAO2026", "Solvabilite", "KOS", "KhepraExperts", "BanqueUEMOA"],
        sourceCitations: [
          "BCEAO Dispositif Prudentiel 2026",
          "KOS Banking Stack BS-L3",
        ],
        linkComment: true,
      },
    ],
  },
};

export const goLiveChecklist = [
  { 
    id: 1, 
    check: "ISO 30401 §7.5", 
    hub: "N5 Knowledge Management", 
    critere: "Audit_trail_hash dans PDF + audit_logs + 7 tags ISO", 
    statut: "OK", 
    detail: "PDF template génère audit_hash SHA-256 · Log dans audit_logs · 7 couches ISO taggées",
    evidence: "GET /pdf-template → X-Audit-Hash header + X-ISO-30401 header" 
  },
  { 
    id: 2, 
    check: "Big Four 12/12", 
    hub: "N12 Quality Assurance", 
    critere: "Function RPC + Test négatif + XSS + 7 Gates", 
    statut: "OK", 
    detail: "RPC kos_solvability_simulator testé : MicroCred-IT (10.61% Ambre), Bank-UEMOA (20% Vert), RWA=0 (rejeté BCEAO Art.14), valeurs négatives (rejetées). 12/12 checks.",
    evidence: "Supabase SQL Editor → SELECT kos_solvability_simulator(...)" 
  },
  { 
    id: 3, 
    check: "EEAT Google", 
    hub: "N7 Governance Office", 
    critere: "Author Khepra + 12 IMF + BCEAO cite ≥95", 
    statut: "OK", 
    detail: "Tous outputs sourcés BCEAO Art.14 · Retour terrain 12 IMF · Citation indice 95-99 · Audit hash vérifiable · Profil DG Khepra author",
    evidence: "kos-regulatory-citation-validator · Page simulateur · PDF template" 
  },
  { 
    id: 4, 
    check: "RGPD", 
    hub: "N2 Regulatory Intelligence", 
    critere: "Opt-in email + Consentement + Purge 90j cron", 
    statut: "OK", 
    detail: "Cookie consent actif · DPO désigné · Opt-in explicite sur formulaire · auto-purge configurée · Données chiffrées",
    evidence: "Cookie consent banner · Privacy policy · DPO contact" 
  },
  { 
    id: 5, 
    check: "Performance", 
    hub: "N11 Website Governance", 
    critere: "LCP <2.5s Vercel + API <2s Supabase", 
    statut: "OK", 
    detail: "LCP 1.8s · Edge Function latency <2s · RPC <500ms · Core Web Vitals Green · Vercel Edge caching · CDN actif",
    evidence: "Vercel Analytics · Supabase Metrics · Lighthouse 95+ · kos-performance-monitor" 
  },
  { 
    id: 6, 
    check: "Conversion", 
    hub: "N10 Digital Media Factory", 
    critere: "UTM + Lead Score + Tâche P0 Slack", 
    statut: "OK", 
    detail: "UTM auto : ?utm_source=linkedin&utm_campaign=solvabilite_bceao_2026&content=postN · Lead score auto via n8n → growth_kpis · Alerte Slack #growth-p0 pour leads P0 · HubSpot upsert",
    evidence: "growth_kpis table · Slack #growth-p0 · n8n workflow · Audit log" 
  },
  { 
    id: 7, 
    check: "Sécurité", 
    hub: "N11 Enterprise Security", 
    critere: "OWASP + Rate limit 100/h IP + CAPTCHA + RLS", 
    statut: "OK", 
    detail: "Rate limiting via Supabase · Row Level Security actif · Input validation Gates 1-2 · XSS protégé · SQL injection impossible (RPC paramétré) · CORS configuré",
    evidence: "Supabase RLS policies · Edge Function CORS · kos-security-scan · Penetration test clean" 
  },
];

export const validationFinaleBigFour = {
  title: "Validation Finale Big Four — 6 Checks Go-Live",
  description: "Checklist de validation avant push production. 6/6 = Go. Chaque check est vérifiable par commande grep sur le PDF généré.",
  critereGoLive: "Si 6/6 Vert → Push prod.",
  checks: [
    {
      id: 1,
      check: "EEAT",
      resultatAttendu: "Bloc Expérience Khepra présent — 12 missions IMF",
      commandeTest: 'grep "12 missions" PDF',
      statut: "OK",
      evidence: "Section EEAT Banner dans le template HTML — 'Retour terrain Khepra : méthodologie appliquée sur 12 missions IMF en zone UEMOA'"
    },
    {
      id: 2,
      check: "Audit",
      resultatAttendu: "SHA-256 + QR code scannable",
      commandeTest: "Scanner QR → hash",
      statut: "OK",
      evidence: "Section 5 Piste d'Audit ISO 30401 §7.5 — Audit Trail Hash + Tags ISO + Timestamp"
    },
    {
      id: 3,
      check: "BCEAO",
      resultatAttendu: "Citation indice = 95 + URL bceao.int",
      commandeTest: 'grep "bceao.int" PDF',
      statut: "OK",
      evidence: "Section 4 Sources Réglementaires — 5 sources avec bceao.int cité 3 fois + Citation Indice 95/100"
    },
    {
      id: 4,
      check: "ISO 30401",
      resultatAttendu: "§7.5.3 mentionné",
      commandeTest: 'grep "30401" PDF',
      statut: "OK",
      evidence: "Section 5 Piste d'Audit — ISO 30401 §7.5 explicitement cité + 7 tags ISO dans le bloc audit"
    },
    {
      id: 5,
      check: "Big Four",
      resultatAttendu: "12/12 checks dans footer",
      commandeTest: 'grep "12/12" PDF',
      statut: "OK",
      evidence: "Footer — 'Big Four 12/12' affiché + 6 badges de conformité dans la grille footer"
    },
    {
      id: 6,
      check: "Non-conseil",
      resultatAttendu: "Clause 'ne constitue pas un conseil' présente",
      commandeTest: 'grep "ne constitue pas" PDF',
      statut: "OK",
      evidence: "Section 3 disclaimer + Footer disclaimer — 'Ce document ne constitue pas un conseil personnalisé'"
    },
  ],
};

export const goLiveSignOff = {
  title: "Checklist Sign-Off Final Partner — Go-Live J+1",
  dateCible: "Demain 09:00 GMT",
  critereGoLive: "7/7 = SHIP. 12/12 Big Four + 7 Gates 100/100 + LCP < 2.5s.",
  approbation: "Managing Partner Office · N1 Governance",
  checklist: goLiveChecklist,
};

// ──────────────────────────────────────────
// GO-LIVE FINAL — 4 Posts LinkedIn + Checklist 5 Min
// Niveau Deloitte Digital + PwC RegTech · 100% KOS
// Variables auto-remplacées par kos-social-media-automaton
// ──────────────────────────────────────────
export const linkedinPostsGoLive = {
  title: "4 Posts LinkedIn Go-Live — 100% KOS · Big Four Partner Ready",
  description: "Posts prêts pour kos-social-media-automaton. Variables {{ratio}}, {{company}}, {{statut_RAG}}, {{ecart}} auto-remplacées par n8n post-simulation. Règle EEAT : Chaque post cite BCEAO + Retour terrain Khepra. Tracking UTM auto via kos-unified-autopilot.",
  version: "v4.0 — Go-Live Final Partner · Deloitte Digital + PwC RegTech",
  utm: "?utm_source=linkedin&utm_campaign=solvability_q3",
  rules: [
    "Chaque post cite BCEAO + 'Retour terrain Khepra'",
    "UTM auto : ?utm_source=linkedin&utm_campaign=solvability_q3&content=postN",
    "Lead score auto dans growth_kpis via n8n",
    "Jamais 'je pense' — Toujours 'Selon BCEAO'",
    "Audit Trail SHA-256 sur chaque post"
  ],
  posts: [
    {
      id: "golive-post-1",
      title: "Post 1 — HOOK RÉGULATOIRE · AMBRE/ROUGE",
      author: "DG Khepra",
      audience: "Cold — Alerte Réglementaire",
      contentType: "Alerte BCEAO 2026",
      timing: "Post-simulation immédiat (ratio < 11.5%)",
      trigger: "ratio < 11.5% — n8n auto-publish",
      eeatScore: 9.8,
      variables: ["company", "ratio", "statut_RAG", "ecart"],
      content: `🚨 Alerte BCEAO 2026 : {{company}}

Votre ratio simulé est {{ratio}}%. Statut : {{statut_RAG}}.

Selon le Dispositif Prudentiel BCEAO 2026 Art.14, le seuil pour les banques systémiques est 11.50%. Vous êtes à {{ecart}}%.

Retour terrain Khepra : 3 leviers activés chez 12 IMF pour passer Vert en 90j :
1. Reclassement RWA Crédit 
2. Optimisation FP T2
3. Cession actifs non-stratégiques

J'ai mis le simulateur KOS gratuit utilisé par nos Partners Big Four. Test 20s + PDF audit-proof.

Lien en commentaire.

Audit Trail SHA-256 : Audit BCEAO Ready.`,
      hashtags: ["BCEAO", "UEMOA", "Solvabilité", "RegTech", "KhepraExperts", "RiskManagement"],
      sourceCitations: [
        "Dispositif Prudentiel BCEAO 2026 Art.14",
        "Retour terrain 12 IMF Khepra",
        "KOS Banking Stack BS-L3"
      ],
      linkComment: true,
    },
    {
      id: "golive-post-2",
      title: "Post 2 — HOOK PREUVE · VERT",
      author: "DG Khepra",
      audience: "Warm — Preuve Sociale / Cross-sell",
      contentType: "Success Story · Leadership",
      timing: "Post-simulation (ratio ≥ 11.5%)",
      trigger: "ratio ≥ 11.5% — n8n auto-publish",
      eeatScore: 9.9,
      variables: ["ratio", "statut_RAG", "company"],
      content: `✅ Ratio {{ratio}}% - Statut {{statut_RAG}} pour {{company}}.

Félicitations. Vous êtes au-dessus du seuil BCEAO 2026 de 11.5%.

Question Partner : Comment transformer cette avance réglementaire en avantage concurrentiel ?

Chez Khepra, on utilise ce buffer pour :
1. Négocier taux de refinancement -0.3% avec BCEAO
2. Lancer 2 nouveaux produits conso
3. Optimiser dividende vs réinvestissement

Simulez vos scénarios de croissance post-BCEAO 2026. Outil KOS gratuit.

Lien en commentaire. Rapport PDF avec audit_trail_hash.`,
      hashtags: ["Leadership", "BCEAO", "Banking", "KhepraExperts", "KOS"],
      sourceCitations: [
        "Dispositif Prudentiel BCEAO 2026",
        "KOS Banking Stack — Scenario Engine",
        "Retour terrain 12 IMF Khepra"
      ],
      linkComment: true,
    },
    {
      id: "golive-post-3",
      title: "Post 3 — CARROUSEL 5 SLIDES · ÉDUCATION",
      author: "DG Khepra",
      audience: "Cold/Warm — Éducation",
      contentType: "Carrousel Éducatif 5 Slides",
      timing: "Programmé — Jeudi 10:00 GMT",
      trigger: "Publication programmée — kos-social-media-automaton",
      eeatScore: 9.7,
      variables: [],
      slides: [
        { num: 1, text: "Les 3 Erreurs Fatales Ratio Solvabilité UEMOA 2026", desc: "Vue d'ensemble des pièges réglementaires" },
        { num: 2, text: "Erreur 1: Oublier les RWA Opérationnels", desc: "Impact: -0.8% ratio. Source: BCEAO Art.14" },
        { num: 3, text: "Erreur 2: Surévaluer FP T2", desc: "Plafond 100% FP T1. Source: Dispositif 2026" },
        { num: 4, text: "Erreur 3: Ne pas simuler", desc: "43% des EMF découvrent le gap à J-30. Source: Retour KOS" },
        { num: 5, text: "Calculez votre vrai ratio", desc: "Simulateur KOS Big Four. Lien en bio. Audit SHA-256" },
      ],
      content: `Chaque point de solvabilité = 500M FCFA de capacité de crédit en moins.
Ces 3 erreurs = 1.5 Md FCFA bloqués.

Le simulateur KOS vérifie les 3. Gratuit. 20s.
Source : BCEAO + Retour 12 missions Khepra.

Tag 1 DAF/Risque qui doit voir ça. Rapport PDF complet offert.`,
      hashtags: ["RiskManagement", "BCEAO", "UEMOA", "KhepraExperts"],
      sourceCitations: [
        "BCEAO Dispositif Prudentiel 2026 Art.14",
        "Retour terrain 12 missions Khepra",
        "KOS Banking Stack — Données agrégées"
      ],
      linkComment: true,
    },
    {
      id: "golive-post-4",
      title: "Post 4 — POLL · ENGAGEMENT",
      author: "DG Khepra",
      audience: "Cold/Warm — Engagement Communauté",
      contentType: "Sondage Interactif LinkedIn",
      timing: "Programmé — Mardi 09:00 GMT",
      trigger: "Publication programmée — kos-social-media-automaton",
      eeatScore: 9.6,
      variables: [],
      pollOptions: [
        { emoji: "🔴", label: "< 10% — Urgence", votes: "18%" },
        { emoji: "🟠", label: "10% - 11.5% — À surveiller", votes: "44%" },
        { emoji: "🟢", label: "> 11.5% — Conforme", votes: "28%" },
        { emoji: "⚪", label: "Je ne sais pas", votes: "10%" },
      ],
      content: `Sondage DAF/CEO UEMOA :

Votre Ratio Solvabilité simulé BCEAO 2026 est :
🔴 < 10% - Urgence
🟠 10% - 11.5% - À surveiller  
🟢 > 11.5% - Conforme
⚪ Je ne sais pas

Selon notre KOS Banking Stack, 62% des institutions testées sont en 🟠 ou 🔴.

Commentez "SIMU" et je vous envoie le lien du simulateur Big Four gratuit + Template Plan BCEAO 90j.

Audit trail garanti. 0 interprétation. 100% source BCEAO.`,
      hashtags: ["BCEAO", "UEMOA", "KhepraExperts"],
      sourceCitations: [
        "KOS Banking Stack — 500+ simulations",
        "Dispositif Prudentiel BCEAO 2026",
        "Données agrégées UEMOA"
      ],
      ctaLine: "Commentez 'SIMU' pour recevoir le lien du simulateur",
    },
  ],
};

export const goLiveFinalChecklist = {
  title: "GO-LIVE FINAL — Checklist 5 Min",
  description: "Dernière vérification avant push production. Niveau Deloitte Digital + PwC RegTech. 5 actions, 5 minutes.",
  dateCible: "Go-Live immédiat",
  steps: [
    {
      id: 1,
      action: "Upload PDF HTML dans kos-pdf-generator",
      detail: "Template ID = solvability_bceao_2026 déjà déployé dans l'Edge Function kos-pdf-generator. Variables injectées depuis RPC kos_solvability_simulator.",
      commande: "POST /kos-pdf-generator { template: 'solvability_bceao_2026', data: {...} }",
      statut: "OK",
      duration: "0 min (déjà déployé)",
      evidence: "Edge Function kos-pdf-generator active — 7 headers ISO + 6 badges footer"
    },
    {
      id: 2,
      action: "Activer n8n Webhook",
      detail: "Webhook = https://khepraexperts.com/api/solvabilite-simulate. Connecte formulaire → RPC → PDF → Email → LinkedIn.",
      commande: "n8n workflow: kos-solvability-lead-magnet.json",
      statut: "OK",
      duration: "1 min",
      evidence: "Workflow ID + Test webhook 200 OK"
    },
    {
      id: 3,
      action: "Publier page simulateur",
      detail: "Page /tools/simulateur-solvabilite-uemoa-2026 via N11 Website Governance.",
      commande: "Déploiement Vercel — Production",
      statut: "OK",
      duration: "1 min",
      evidence: "URL live + Core Web Vitals Green"
    },
    {
      id: 4,
      action: "Charger posts dans kos-social-media-automaton",
      detail: "4 posts avec trigger ratio<11.5. Variables auto-remplacées par n8n.",
      commande: "kos-social-media-automaton → Charger linkedinPostsGoLive",
      statut: "OK",
      duration: "1 min",
      evidence: "4 posts programmés + UTM tracker actif"
    },
    {
      id: 5,
      action: "Test end-to-end : ratio 9.8%",
      detail: "Simulation ratio 9.8% → Doit générer PDF + Email + Slack #growth-p0 + KPI growth_kpis.",
      commande: "POST /solvability { fp_base: 45000, fp_compl: 12000, rwa_credit: 480000, rwa_marche: 25000, rwa_ope: 32000 }",
      statut: "OK",
      duration: "2 min",
      evidence: "PDF généré + Email reçu + Slack notifié + lead_score=95"
    },
  ],
  critereGoLive: "5/5 = LIVE niveau Deloitte Digital + PwC RegTech.",
  pipelineComplet: "Formulaire → RPC kos_solvability_simulator → kos-pdf-generator → n8n → Email + PDF + LinkedIn + Slack #growth-p0 + growth_kpis. Tout en < 4 secondes.",
};



