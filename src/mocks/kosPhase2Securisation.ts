// KOS Phase 2 Sécurisation & Performance™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Exécuter les 7 chantiers de la Phase 2 du Plan Consolidation
// Timeline : 7 — 21 Juillet 2026 (Semaine 3-4)
// Objectif : Score d'intégrité 85→90

export const phase2Stats = {
  execution_id: "KOS-PHASE2-SECUR-2026-07-07-001",
  launched_at: "2026-07-07T08:00:00Z",
  target_completion: "2026-07-21T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — System Security & Performance Practice",
  total_chantiers: 7,
  completed: 0,
  in_progress: 2,
  blocked: 0,
  open: 5,
  overall_progress: 12,
  starting_score: 85,
  target_score: 90,
  budget_total: "32 100 000 FCFA",
  budget_spent: "3 800 000 FCFA",
  commander_intent: "Sécuriser l'infrastructure KOS et optimiser les performances pour atteindre le score d'intégrité 90. Déploiement CSP/WAF, conversion images WebP, hardening headers sécurité, correction vulnérabilités npm, enrichissement llms.txt, finalisation SMSI ISO 27001, planification pentest externe. Aucun déploiement non sécurisé ne passe en production après cette phase."
};

export const phase2Chantiers = [
  {
    id: "P2S-001",
    chantier: "Déployer Content Security Policy (CSP) niveau strict + WAF Cloudflare Pro",
    category: "Sécurité Infrastructure",
    icon: "ri-shield-keyhole-line",
    color: "#C2410C",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 30,
    responsible: "RSSI + DevOps Lead",
    deadline: "2026-07-14",
    budget: "10 500 000 FCFA",
    kpi: "Score Mozilla Observatory ≥ 95/100 + CSP sans 'unsafe-inline'",
    effort: "18h",
    bloque: "Certification SOC 2 Type II — prérequis obligatoire pour Test of Design",
    description: "Déploiement d'une Content Security Policy niveau strict avec nonce-based scripts, interdiction de 'unsafe-inline' et 'unsafe-eval', restriction des sources à la liste blanche explicite. Couplé au déploiement du WAF Cloudflare Pro avec règles OWASP Top 10, rate limiting, DDoS protection L3/L4/L7 et bot management. Le CSP actuel est inexistant — toutes les pages sont exposées aux attaques XSS et injection de contenu.",
    actions: [
      { id: "P2S-001-A1", action: "Auditer toutes les sources de scripts inline actuelles — inventorier les 47 occurrences", status: "completed", owner: "Lead Dev Frontend", effort: "4h" },
      { id: "P2S-001-A2", action: "Implémenter CSP nonce-based — migrer tous les scripts inline vers nonce généré serveur", status: "in_progress", owner: "Lead Dev Frontend", effort: "6h" },
      { id: "P2S-001-A3", action: "Configurer WAF Cloudflare Pro — activer règles OWASP + rate limiting 100 req/min", status: "open", owner: "DevOps Lead", effort: "3h" },
      { id: "P2S-001-A4", action: "Activer DDoS protection L3/L4/L7 + bot management sur Cloudflare", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P2S-001-A5", action: "Tester CSP en mode report-only 48h — analyser les violation reports avant blocage", status: "open", owner: "RSSI", effort: "2h" },
      { id: "P2S-001-A6", action: "Basculer CSP en mode enforce — vérifier 0 erreurs console + 0 ressources bloquées", status: "open", owner: "RSSI", effort: "1h" }
    ],
    dependencies: []
  },
  {
    id: "P2S-002",
    chantier: "Convertir 89 images en WebP/AVIF + déploiement CDN global",
    category: "Performance",
    icon: "ri-image-line",
    color: "#0891B2",
    priority: "P0",
    severity: "high",
    status: "in_progress",
    progress: 15,
    responsible: "Lead Dev Frontend + Designer",
    deadline: "2026-07-18",
    budget: "4 200 000 FCFA",
    kpi: "LCP p75 ≤ 2.5s desktop, ≤ 3.5s mobile 4G — 89 images converties",
    effort: "14h",
    bloque: "Core Web Vitals au vert — LCP actuel 4.8s bloque le référencement Google",
    description: "Conversion complète du parc images KOS : 89 images non optimisées dont 12 > 5 Mo en PNG non compressé. Migration vers WebP (lossy qualité 85%) + AVIF pour navigateurs compatibles. Mise en place du lazy loading natif (loading='lazy') et responsive images (srcset 3 breakpoints). Déploiement sur CDN Cloudflare avec cache-control immutable + Brotli compression niveau 11.",
    actions: [
      { id: "P2S-002-A1", action: "Identifier les 89 images non optimisées — générer le manifest de conversion", status: "completed", owner: "Designer", effort: "1h" },
      { id: "P2S-002-A2", action: "Convertir les 12 images > 5 Mo en WebP/AVIF — qualité 85%", status: "in_progress", owner: "Designer", effort: "3h" },
      { id: "P2S-002-A3", action: "Convertir les 77 images restantes en WebP — batch processing automatisé", status: "open", owner: "Lead Dev Frontend", effort: "4h" },
      { id: "P2S-002-A4", action: "Implémenter <picture> avec srcset WebP + AVIF fallback sur tous les composants", status: "open", owner: "Lead Dev Frontend", effort: "3h" },
      { id: "P2S-002-A5", action: "Configurer CDN Cloudflare — cache-control immutable + Brotli level 11 + Polish", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P2S-002-A6", action: "Audit Lighthouse post-conversion — vérifier LCP < 2.5s sur 10 pages clés", status: "open", owner: "Lead Dev Frontend", effort: "1h" }
    ],
    dependencies: []
  },
  {
    id: "P2S-003",
    chantier: "Configurer Permissions-Policy + HSTS preload sur 100% des routes",
    category: "Sécurité Infrastructure",
    icon: "ri-lock-password-line",
    color: "#8B3040",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 5,
    responsible: "RSSI + DevOps Lead",
    deadline: "2026-07-14",
    budget: "2 800 000 FCFA",
    kpi: "HTTP Security Headers score A+ — Permissions-Policy restrictif + HSTS max-age=31536000",
    effort: "8h",
    bloque: "Score OWASP — headers sécurité absents sur 40% des routes, surface d'attaque étendue",
    description: "Configuration des headers de sécurité HTTP manquants : Permissions-Policy pour restreindre les APIs navigateur (camera, microphone, geolocation, etc.), HSTS avec preload et includeSubDomains, X-Content-Type-Options, X-Frame-Options, Referrer-Policy strict-origin-when-cross-origin. Extension de la couverture _headers Netlify de 60% à 100% des routes.",
    actions: [
      { id: "P2S-003-A1", action: "Définir la Permissions-Policy : lister les 12 APIs navigateur à restricter", status: "completed", owner: "RSSI", effort: "30 min" },
      { id: "P2S-003-A2", action: "Configurer HSTS avec max-age=31536000 + includeSubDomains + preload", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P2S-003-A3", action: "Implémenter Permissions-Policy restrictif dans _headers Netlify", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P2S-003-A4", action: "Ajouter X-Content-Type-Options, X-Frame-Options, Referrer-Policy sur 100% routes", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P2S-003-A5", action: "Soumettre le domaine au HSTS preload list Google — vérifier éligibilité", status: "open", owner: "DevOps Lead", effort: "30 min" },
      { id: "P2S-003-A6", action: "Audit Mozilla Observatory — cible score 100/100", status: "open", owner: "RSSI", effort: "1h" },
      { id: "P2S-003-A7", action: "Vérifier tous les headers sur 20 URLs tests — desktop + mobile", status: "open", owner: "RSSI", effort: "2h" }
    ],
    dependencies: ["P2S-001"]
  },
  {
    id: "P2S-004",
    chantier: "Corriger les 15 vulnérabilités npm audit (12 high + 3 critical)",
    category: "Sécurité Supply Chain",
    icon: "ri-bug-line",
    color: "#9B7B2C",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Lead Dev Frontend",
    deadline: "2026-07-11",
    budget: "1 800 000 FCFA",
    kpi: "npm audit = 0 vulnérabilités (high + critical) — clean supply chain",
    effort: "6h",
    bloque: "Déploiement sécurisé — 3 vulnérabilités critiques exposent à des attaques supply chain (prototype pollution, RCE)",
    description: "Résolution des 15 vulnérabilités npm détectées par audit : 3 critiques (dont 1 RCE via dépendance transitive lodash < 4.17.21, 1 prototype pollution via minimist, 1 path traversal via webpack-dev-server), 12 hautes (injection, DoS, bypass). Stratégie : npm audit fix pour les correctifs automatiques, résolutions manuelles dans package.json pour les dépendances imbriquées, remplacement des packages non maintenus.",
    actions: [
      { id: "P2S-004-A1", action: "Exécuter npm audit — générer le rapport complet avec chemins de dépendance", status: "open", owner: "Lead Dev Frontend", effort: "15 min" },
      { id: "P2S-004-A2", action: "Appliquer npm audit fix — corriger les 12 vulns avec patches disponibles", status: "open", owner: "Lead Dev Frontend", effort: "1h" },
      { id: "P2S-004-A3", action: "Résoudre manuellement les 3 vulns critiques sans patch — overrides dans package.json", status: "open", owner: "Lead Dev Frontend", effort: "3h" },
      { id: "P2S-004-A4", action: "Remplacer 2 packages non maintenus par des alternatives maintenues", status: "open", owner: "Lead Dev Frontend", effort: "1h" },
      { id: "P2S-004-A5", action: "Build check + test de régression sur 5 pages critiques", status: "open", owner: "Lead Dev Frontend", effort: "30 min" },
      { id: "P2S-004-A6", action: "Activer Dependabot alerts + npm audit en CI/CD — bloquer le build si vuln high+", status: "open", owner: "DevOps Lead", effort: "15 min" }
    ],
    dependencies: []
  },
  {
    id: "P2S-005",
    chantier: "Ajouter Google-Extended bot + sections OHADA dans llms.txt / llms-full.txt",
    category: "GEO & AI Visibility",
    icon: "ri-robot-2-line",
    color: "#4A7A1E",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "SEO Lead + Content Team",
    deadline: "2026-07-11",
    budget: "1 200 000 FCFA",
    kpi: "Indexation vérifiée sur Gemini + ChatGPT + Perplexity + Claude — couverture OHADA 100%",
    effort: "4h",
    bloque: "Invisibilité sur les AI search engines — 20% du trafic potentiel non capté (Gemini, ChatGPT, Perplexity)",
    description: "Correction de deux gaps majeurs de visibilité AI : 1) Le fichier robots.txt n'autorise pas le bot Google-Extended, rendant le site invisible sur Google Gemini (SGE/AI Overviews). 2) 800+ lignes de contenu OHADA sont absentes du fichier llms-full.txt, rendant KHEPRA invisible sur ChatGPT, Claude et Perplexity pour les requêtes juridiques africaines. Ajout également des sections manquantes : BCEAO, COBAC, CEMAC, GAFI.",
    actions: [
      { id: "P2S-005-A1", action: "Ajouter 'User-agent: Google-Extended' avec Allow dans robots.txt", status: "open", owner: "SEO Lead", effort: "5 min" },
      { id: "P2S-005-A2", action: "Générer les 800+ lignes OHADA pour llms-full.txt — actes uniformes + jurisprudence", status: "open", owner: "Content Team", effort: "2h" },
      { id: "P2S-005-A3", action: "Compléter les sections BCEAO/COBAC/CEMAC/GAFI dans llms-full.txt", status: "open", owner: "Content Team", effort: "1h" },
      { id: "P2S-005-A4", action: "Mettre à jour llms.txt avec les nouvelles sections + métadonnées", status: "open", owner: "SEO Lead", effort: "30 min" },
      { id: "P2S-005-A5", action: "Vérifier l'indexation via llms.txt checker sur 4 AI crawlers", status: "open", owner: "SEO Lead", effort: "25 min" }
    ],
    dependencies: []
  },
  {
    id: "P2S-006",
    chantier: "Finaliser les documents SMSI — PCA & SDLC sécurisé pour ISO 27001:2022",
    category: "Certification",
    icon: "ri-file-shield-2-line",
    color: "#5B21B6",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "RSSI + DPO + Juridique",
    deadline: "2026-07-21",
    budget: "5 600 000 FCFA",
    kpi: "2 documents SMSI finalisés + revus par auditeur externe — prêts pour certification",
    effort: "20h",
    bloque: "Certification ISO 27001:2022 — 2 documents SMSI bloquants à l'état brouillon depuis Q1",
    description: "Finalisation des 2 documents du Système de Management de la Sécurité de l'Information (SMSI) bloquant la certification ISO 27001:2022 : 1) Plan de Continuité d'Activité (PCA) — RTO 4h, RPO 1h, scénarios de crise, plan de communication, tests annuels. 2) SDLC Sécurisé — secure coding guidelines, revue de code obligatoire, SAST/DAST intégrés CI/CD, gestion des secrets, threat modeling par sprint. Ces documents sont à l'état brouillon depuis Q1 2026.",
    actions: [
      { id: "P2S-006-A1", action: "Finaliser le PCA : compléter les 4 scénarios de crise (cyberattaque, panne datacenter, perte données, indisponibilité SaaS)", status: "open", owner: "RSSI", effort: "6h" },
      { id: "P2S-006-A2", action: "Définir le plan de communication de crise — rôles, escalade, communication externe", status: "open", owner: "DPO", effort: "3h" },
      { id: "P2S-006-A3", action: "Finaliser le SDLC sécurisé : secure coding guidelines (OWASP ASVS Level 2)", status: "open", owner: "RSSI", effort: "5h" },
      { id: "P2S-006-A4", action: "Intégrer SAST (SonarQube) + DAST (OWASP ZAP) dans la CI/CD — documentation du process", status: "open", owner: "DevOps Lead", effort: "3h" },
      { id: "P2S-006-A5", action: "Revue par auditeur externe ISO 27001 — intégrer les commentaires", status: "open", owner: "RSSI", effort: "2h" },
      { id: "P2S-006-A6", action: "Soumettre les 2 documents au COMEX pour approbation formelle", status: "open", owner: "DPO", effort: "1h" }
    ],
    dependencies: ["P2S-001"]
  },
  {
    id: "P2S-007",
    chantier: "Planifier et contractualiser le pentest externe Q3 2026",
    category: "Sécurité Offensive",
    icon: "ri-sword-line",
    color: "#4F46E5",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "RSSI + Direction Générale",
    deadline: "2026-07-21",
    budget: "5 900 000 FCFA",
    kpi: "Contrat pentest signé + scope défini + date planifiée (cible : Août 2026)",
    effort: "Contrat externe",
    bloque: "Validation sécurité indépendante — requis pour SOC 2 Type II + conformité COBAC",
    description: "Planification et contractualisation du pentest externe trimestriel Q3 2026 avec un prestataire certifié CREST/OSCP. Définition du scope : tests boîte grise sur l'ensemble des APIs KOS, edge functions Supabase, interface web publique, simulation d'attaques OWASP Top 10 + tests de logique métier. Livrables attendus : rapport de pentest, matrice des risques, plan de remédiation. Obligatoire pour SOC 2 Type II et recommandé par la COBAC.",
    actions: [
      { id: "P2S-007-A1", action: "Rédiger le cahier des charges du pentest — scope technique, méthodologie, livrables", status: "open", owner: "RSSI", effort: "2h" },
      { id: "P2S-007-A2", action: "Évaluer 3 prestataires certifiés CREST/OSCP — comparer offres et références", status: "open", owner: "RSSI", effort: "3h" },
      { id: "P2S-007-A3", action: "Négocier et signer le contrat — inclure clause NDA + responsabilité", status: "open", owner: "Direction Générale", effort: "4h" },
      { id: "P2S-007-A4", action: "Définir le planning — fenêtre de pentest (Août 2026), environnement de test isolé", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P2S-007-A5", action: "Préparer l'environnement de test — sandbox isolée, credentials dédiés, rate limiting désactivé", status: "open", owner: "DevOps Lead", effort: "2h" }
    ],
    dependencies: ["P2S-001", "P2S-003"]
  }
];

export const phase2ExecutionLog = [
  { timestamp: "2026-07-07T08:00:00Z", event: "Phase 2 lancée — 7 chantiers de sécurisation identifiés, score initial 85/100", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-07-07T08:15:00Z", event: "CSP : audit des scripts inline terminé — 47 occurrences inventoriées, plan de migration établi", type: "action", icon: "ri-shield-keyhole-line" },
  { timestamp: "2026-07-07T08:30:00Z", event: "Images WebP : manifest de conversion généré — 89 images identifiées, 12 > 5 Mo prioritaires", type: "action", icon: "ri-image-line" },
  { timestamp: "2026-07-07T09:00:00Z", event: "Permissions-Policy : 12 APIs navigateur listées pour restriction — policy draft validé par le RSSI", type: "action", icon: "ri-lock-password-line" },
  { timestamp: "2026-07-07T09:30:00Z", event: "WAF Cloudflare Pro : contrat souscrit — déploiement planifié Semaine 3", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-07-07T10:00:00Z", event: "Budget Phase 2 engagé : 32 100 000 FCFA — seuil d'alerte configuré à 70%", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-07-07T10:15:00Z", event: "Notifications envoyées aux 7 responsables de chantiers — planning Semaine 3-4 confirmé", type: "notification", icon: "ri-notification-3-line" }
];

export const phase2Timeline = {
  start: "2026-07-07",
  end: "2026-07-21",
  weeks: [
    { week: 3, start: "2026-07-07", end: "2026-07-14", label: "Semaine 3 — Infrastructure & Sécurité", milestones: ["CSP déployé en mode report-only", "Permissions-Policy + HSTS configurés", "npm audit clean (0 vulns)", "Google-Extended bot activé", "WAF Cloudflare activé", "Convertir 12 images > 5 Mo"] },
    { week: 4, start: "2026-07-14", end: "2026-07-21", label: "Semaine 4 — Finalisation & Validation", milestones: ["CSP basculé en mode enforce", "89 images WebP déployées sur CDN", "PCA + SDLC finalisés", "Contrat pentest signé", "Mozilla Observatory 100/100", "Audit LCP post-optimisation < 2.5s"] }
  ]
};

export const phase2Budget = {
  total: "32 100 000 FCFA",
  spent: "3 800 000 FCFA",
  remaining: "28 300 000 FCFA",
  breakdown: [
    { item: "CSP + WAF Cloudflare Pro", amount: "10 500 000 FCFA", status: "allocated" },
    { item: "Conversion 89 images WebP + CDN", amount: "4 200 000 FCFA", status: "allocated" },
    { item: "Permissions-Policy + HSTS preload", amount: "2 800 000 FCFA", status: "allocated" },
    { item: "Correction npm audit (15 vulns)", amount: "1 800 000 FCFA", status: "allocated" },
    { item: "Google-Extended + OHADA llms.txt", amount: "1 200 000 FCFA", status: "allocated" },
    { item: "Documents SMSI PCA + SDLC", amount: "5 600 000 FCFA", status: "allocated" },
    { item: "Planification pentest externe Q3", amount: "5 900 000 FCFA", status: "allocated" },
    { item: "Contingence (3.1%)", amount: "100 000 FCFA", status: "reserved" }
  ]
};

export const phase2Dependencies = [
  { from: "P2S-001", to: "P2S-003", reason: "Permissions-Policy dépend du CSP déployé — les deux headers doivent être cohérents" },
  { from: "P2S-001", to: "P2S-006", reason: "Documents SMSI doivent référencer le CSP et les contrôles de sécurité déployés" },
  { from: "P2S-001", to: "P2S-007", reason: "Pentest externe nécessite CSP + WAF en place pour tester l'efficacité des défenses" },
  { from: "P2S-003", to: "P2S-007", reason: "Pentest doit inclure les nouveaux headers de sécurité dans le scope de test" }
];