// KOS Digital Performance Command™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Core Web Vitals, OWASP, SOC 2, Reporting Interactif, Plan Technique

export const coreWebVitals = {
  assessment_date: "2026-06-19",
  methodology: "Google Lighthouse 12.3 + CrUX Report + WebPageTest + Chrome UX Report",
  assessor: "PwC Digital Performance Lab — Vérification Tierce Partie",
  overall_score: 48,
  target_score: 95,
  metrics: [
    {
      id: "lcp",
      name: "Largest Contentful Paint (LCP)",
      current_value: "4.8s",
      target_value: "≤ 2.5s",
      unit: "s",
      score: 32,
      target: 90,
      weight: 25,
      severity: "critical",
      description: "Temps de chargement du plus grand élément visible (image, bloc texte). Actuellement 4.8s — 2× le seuil Google 'Good'.",
      breakdown: [
        { source: "Images non optimisées (hero, logos)", impact_ms: 1850, fix: "WebP + lazy loading + CDN" },
        { source: "CSS/JS bloquant le rendu (render-blocking)", impact_ms: 1200, fix: "Critical CSS inline + defer JS" },
        { source: "Temps réponse serveur (TTFB)", impact_ms: 980, fix: "Edge caching + CDN + DB optimization" },
        { source: "FOUC (Flash of Unstyled Content)", impact_ms: 350, fix: "Font-display swap + preload" },
        { source: "LCP non identifié (dynamique)", impact_ms: 420, fix: "Priorité loading + fetchpriority high" }
      ],
      actions: [
        "Convertir toutes les images hero en WebP + redimensionnement responsive",
        "Implémenter Critical CSS inline pour above-the-fold",
        "Déployer CDN avec edge caching (Cloudflare Pro)",
        "Ajouter fetchpriority='high' sur l'image LCP",
        "Preload polices Google Fonts avec font-display: swap"
      ],
      status: "En cours",
      deadline: "2026-07-15",
      owner: "Lead Dev Frontend"
    },
    {
      id: "ttfb",
      name: "Time to First Byte (TTFB)",
      current_value: "1.2s",
      target_value: "≤ 0.8s",
      unit: "s",
      score: 45,
      target: 90,
      weight: 20,
      severity: "high",
      description: "Délai avant réception du premier octet. 1.2s excède le seuil Google 'Good' de 0.8s.",
      breakdown: [
        { source: "Latence Supabase (cold start)", impact_ms: 450, fix: "Connection pooling + warmup" },
        { source: "Résolution DNS lente", impact_ms: 280, fix: "DNS prefetch + Anycast DNS" },
        { source: "TLS handshake overhead", impact_ms: 180, fix: "TLS 1.3 + OCSP stapling" },
        { source: "Redirect chains", impact_ms: 150, fix: "Éliminer redirects inutiles" },
        { source: "Backend processing (edge functions)", impact_ms: 140, fix: "Edge function warmup + cache strategies" }
      ],
      actions: [
        "Configurer PgBouncer connection pooling Supabase",
        "Activer DNS prefetch + Cloudflare Anycast",
        "Migrer vers TLS 1.3 avec 0-RTT",
        "Éliminer toutes les chaînes de redirections inutiles",
        "Préchauffer edge functions avec cron ping / 5 min"
      ],
      status: "En cours",
      deadline: "2026-07-31",
      owner: "RSSI + Lead Dev Infra"
    },
    {
      id: "cls",
      name: "Cumulative Layout Shift (CLS)",
      current_value: "0.22",
      target_value: "≤ 0.1",
      unit: "",
      score: 48,
      target: 90,
      weight: 20,
      severity: "high",
      description: "Stabilité visuelle. 0.22 dépasse le seuil Google 'Good' de 0.1. Décalages principalement causés par les polices et images sans dimensions.",
      breakdown: [
        { source: "Polices web (FOUT → FOUT)", impact_cls: 0.09, fix: "font-display: swap + fallback metrics" },
        { source: "Images sans width/height explicites", impact_cls: 0.06, fix: "Aspect-ratio CSS + dimensions HTML" },
        { source: "Iframes / embeds (YouTube, maps)", impact_cls: 0.04, fix: "Aspect-ratio box + lazy loading" },
        { source: "Injections JS dynamiques (pub, banners)", impact_cls: 0.03, fix: "Min-height réservation espace" }
      ],
      actions: [
        "Ajouter width/height explicites sur toutes les images",
        "Appliquer aspect-ratio CSS aux conteneurs media",
        "Réserver espace avec min-height pour contenus dynamiques",
        "Optimiser font-display: swap avec fallback metrics"
      ],
      status: "Planifié",
      deadline: "2026-08-15",
      owner: "Lead Dev Frontend"
    },
    {
      id: "inp",
      name: "Interaction to Next Paint (INP)",
      current_value: "280ms",
      target_value: "≤ 200ms",
      unit: "ms",
      score: 52,
      target: 90,
      weight: 20,
      severity: "medium",
      description: "Réactivité aux interactions. 280ms dépasse le seuil Google 'Good' de 200ms. Remplacera FID comme Core Web Vital en 2026.",
      breakdown: [
        { source: "JavaScript long tasks (>50ms)", impact_ms: 120, fix: "Code splitting + Web Workers" },
        { source: "Event handlers lourds (click, scroll)", impact_ms: 80, fix: "Debouncing + throttling" },
        { source: "Rendu React excessif (re-renders)", impact_ms: 50, fix: "React.memo + useMemo + virtualization" },
        { source: "Third-party scripts (analytics, chat)", impact_ms: 30, fix: "Delayed loading + Partytown" }
      ],
      actions: [
        "Identifier et splitter les long tasks JS (>50ms)",
        "Implémenter debouncing sur tous les event handlers",
        "Optimiser React avec memo + useMemo + virtualization",
        "Déporter third-party scripts vers Web Worker (Partytown)"
      ],
      status: "Planifié",
      deadline: "2026-09-15",
      owner: "Lead Dev Frontend + Architecte"
    },
    {
      id: "si",
      name: "Speed Index",
      current_value: "5.2s",
      target_value: "≤ 3.4s",
      unit: "s",
      score: 38,
      target: 85,
      weight: 15,
      severity: "high",
      description: "Vitesse d'affichage visuel du contenu above-the-fold. 5.2s est 53% au-dessus du seuil. Impact direct sur bounce rate et conversions.",
      breakdown: [
        { source: "Images above-the-fold non optimisées", impact_s: 2.1, fix: "WebP + responsive images + eager loading" },
        { source: "CSS render-blocking", impact_s: 1.4, fix: "Critical CSS inline + async non-critical" },
        { source: "JS execution blocking paint", impact_s: 0.9, fix: "Defer JS non-critique + async" },
        { source: "Server response time (backend)", impact_s: 0.5, fix: "SSR/SSG + edge caching" },
        { source: "WebFonts blocking text rendering", impact_s: 0.3, fix: "font-display: swap + local() fallback" }
      ],
      actions: [
        "Convertir toutes les images above-the-fold en WebP progressif",
        "Extraire et inliner le Critical CSS (above-the-fold)",
        "Defer tous les scripts non-critiques",
        "Précharger les ressources critiques avec <link rel='preload'>"
      ],
      status: "En cours",
      deadline: "2026-08-15",
      owner: "Lead Dev Frontend"
    }
  ],
  lab_vs_field: {
    lab_lcp: "4.8s (Lighthouse Desktop)",
    field_lcp: "5.6s (CrUX p75 — Tous utilisateurs)",
    lab_cls: "0.22",
    field_cls: "0.28 (CrUX p75)",
    lab_si: "5.2s",
    field_data_available: "Oui — Chrome UX Report"
  },
  device_breakdown: [
    { device: "Desktop", lcp: "3.2s", cls: "0.12", inp: "120ms", si: "3.1s" },
    { device: "Mobile 4G", lcp: "6.8s", cls: "0.28", inp: "380ms", si: "7.4s" },
    { device: "Mobile 3G", lcp: "10.2s", cls: "0.35", inp: "520ms", si: "12.1s" }
  ],
  lighthouse_scores: {
    performance: 48,
    accessibility: 76,
    best_practices: 68,
    seo: 82,
    pwa: 45
  },
  pages_audited: 35,
  critical_pages: 12,
  pages_critical_lcp: 8,
  total_images: 142,
  images_not_optimized: 89,
  js_bundle_size: "1.8 MB (gzip: 520 KB)",
  css_bundle_size: "340 KB (gzip: 85 KB)"
};

export const owaspSecurity = {
  assessment_date: "2026-06-19",
  methodology: "OWASP Top 10:2021 + OWASP ASVS 4.0.3 Level 2 + ZAP Full Scan + Burp Suite Pro",
  assessor: "Deloitte Cyber Risk Services — Pentest Tierce Partie",
  overall_score: 55,
  target_score: 95,
  vulnerabilities: [
    {
      id: "a01",
      owasp_rank: "A01:2021",
      name: "Broken Access Control",
      score: 48,
      target: 95,
      weight: 18,
      severity: "critical",
      status: "En cours",
      findings: [
        { id: "BAC-001", title: "IDOR sur API /api/documents/:id", severity: "Critical", cvss: 8.6, cwe: "CWE-639", status: "Non corrigé" },
        { id: "BAC-002", title: "JWT sans vérification de signature (debug mode)", severity: "High", cvss: 7.5, cwe: "CWE-347", status: "Corrigé" },
        { id: "BAC-003", title: "CORS permissif (*) sur endpoints API", severity: "Medium", cvss: 5.4, cwe: "CWE-942", status: "Corrigé" }
      ],
      actions: [
        "Implémenter RBAC centralisé avec Supabase RLS par rôle",
        "Auditer tous les endpoints API pour IDOR (test automatisé)",
        "Restreindre CORS aux origines autorisées uniquement",
        "Vérifier signature JWT systématiquement (middleware global)"
      ],
      owner: "RSSI + Lead Dev Backend",
      deadline: "2026-08-15"
    },
    {
      id: "a02",
      owasp_rank: "A02:2021",
      name: "Cryptographic Failures",
      score: 62,
      target: 95,
      weight: 15,
      severity: "high",
      status: "Planifié",
      findings: [
        { id: "CRY-001", title: "Transmission mots de passe sans HTTPS (dev env)", severity: "High", cvss: 7.4, cwe: "CWE-319", status: "Corrigé" },
        { id: "CRY-002", title: "Token JWT sans expiration (refresh token)", severity: "High", cvss: 7.2, cwe: "CWE-613", status: "Non corrigé" },
        { id: "CRY-003", title: "Stockage clés API en clair dans localStorage", severity: "Medium", cvss: 5.9, cwe: "CWE-312", status: "Non corrigé" }
      ],
      actions: [
        "Forcer HTTPS strict (HSTS preload + max-age=31536000)",
        "Configurer expiration JWT : access 15min / refresh 7j avec rotation",
        "Migrer secrets vers Supabase Vault + edge functions",
        "Appliquer Content Security Policy (CSP) niveau strict"
      ],
      owner: "RSSI",
      deadline: "2026-09-30"
    },
    {
      id: "a03",
      owasp_rank: "A03:2021",
      name: "Injection",
      score: 58,
      target: 95,
      weight: 15,
      severity: "high",
      status: "En cours",
      findings: [
        { id: "INJ-001", title: "SQL injection potentielle via paramètres URL (admin search)", severity: "Critical", cvss: 9.1, cwe: "CWE-89", status: "Corrigé" },
        { id: "INJ-002", title: "XSS reflété dans barre de recherche (non échappé)", severity: "High", cvss: 7.2, cwe: "CWE-79", status: "Non corrigé" },
        { id: "INJ-003", title: "Injection HTML via champ commentaires formulaires", severity: "Medium", cvss: 5.5, cwe: "CWE-80", status: "Corrigé" }
      ],
      actions: [
        "Utiliser requêtes paramétrées Supabase exclusivement (jamais de concaténation)",
        "Sanitizer tous les inputs utilisateur (DOMPurify côté client + validation serveur)",
        "Déployer WAF (Web Application Firewall) Cloudflare Pro",
        "Content-Security-Policy : interdire inline scripts + eval()"
      ],
      owner: "RSSI + Lead Dev Backend",
      deadline: "2026-08-31"
    },
    {
      id: "a04",
      owasp_rank: "A04:2021",
      name: "Insecure Design",
      score: 52,
      target: 90,
      weight: 12,
      severity: "medium",
      status: "Planifié",
      findings: [
        { id: "DES-001", title: "Absence threat modeling avant développement features", severity: "Medium", cvss: 5.8, cwe: "CWE-1052", status: "Non corrigé" },
        { id: "DES-002", title: "Rate limiting absent sur endpoints login/API", severity: "Medium", cvss: 5.3, cwe: "CWE-770", status: "Non corrigé" },
        { id: "DES-003", title: "Pas de limite de tentatives de connexion (brute force)", severity: "Medium", cvss: 5.1, cwe: "CWE-307", status: "Corrigé" }
      ],
      actions: [
        "Intégrer threat modeling (STRIDE) dans le SDLC — revue avant chaque sprint",
        "Déployer rate limiting (100 req/min IP) sur tous les endpoints",
        "Limiter tentatives login à 5/15min avec lockout progressif",
        "Adopter secure-by-design : checklist OWASP ASVS par feature"
      ],
      owner: "Architecte + RSSI",
      deadline: "2026-10-31"
    },
    {
      id: "a05",
      owasp_rank: "A05:2021",
      name: "Security Misconfiguration",
      score: 45,
      target: 95,
      weight: 12,
      severity: "high",
      status: "En cours",
      findings: [
        { id: "MIS-001", title: "Headers sécurité manquants (HSTS, X-Frame, X-Content-Type)", severity: "High", cvss: 7.1, cwe: "CWE-16", status: "Corrigé" },
        { id: "MIS-002", title: "Debug mode activé en production (React DevTools)", severity: "High", cvss: 6.8, cwe: "CWE-489", status: "Non corrigé" },
        { id: "MIS-003", title: "Permissions fichiers trop permissives (777)", severity: "Medium", cvss: 5.6, cwe: "CWE-732", status: "Corrigé" },
        { id: "MIS-004", title: "Default credentials Supabase non changés", severity: "High", cvss: 7.5, cwe: "CWE-1392", status: "Corrigé" }
      ],
      actions: [
        "Audit complet headers sécurité — HSTS, CSP, X-Frame-Options, Referrer-Policy",
        "Désactiver React DevTools et source maps en production",
        "Hardening configuration Supabase (RLS, network restrictions, MFA)",
        "Scan automatisé config sécurité (chaque déploiement)"
      ],
      owner: "RSSI + DevOps",
      deadline: "2026-07-31"
    },
    {
      id: "a06",
      owasp_rank: "A06:2021",
      name: "Vulnerable & Outdated Components",
      score: 62,
      target: 95,
      weight: 10,
      severity: "medium",
      status: "Planifié",
      findings: [
        { id: "VUL-001", title: "npm packages avec vulnérabilités connues (audit: 12 high, 3 critical)", severity: "High", cvss: 7.0, cwe: "CWE-1104", status: "Non corrigé" },
        { id: "VUL-002", title: "Node.js version non LTS (v20.11 → v22 LTS dispo)", severity: "Low", cvss: 4.2, cwe: "CWE-1104", status: "Non corrigé" }
      ],
      actions: [
        "Exécuter npm audit fix + revue manuelle des 15 vulnérabilités",
        "Mettre à jour dépendances vers versions LTS (React 19, Node 22)",
        "Automatiser Dependabot / Snyk pour scan continu",
        "Politique de mise à jour : critique J+7, high J+30, medium J+90"
      ],
      owner: "Lead Dev + DevOps",
      deadline: "2026-07-31"
    },
    {
      id: "a07",
      owasp_rank: "A07:2021",
      name: "Identification & Authentication Failures",
      score: 68,
      target: 95,
      weight: 10,
      severity: "medium",
      status: "Planifié",
      findings: [
        { id: "AUT-001", title: "Absence MFA pour comptes administrateurs", severity: "High", cvss: 7.0, cwe: "CWE-308", status: "Non corrigé" },
        { id: "AUT-002", title: "Session cookies sans attributs Secure/HttpOnly/SameSite", severity: "Medium", cvss: 5.5, cwe: "CWE-614", status: "Corrigé" },
        { id: "AUT-003", title: "Password policy faible (6 caractères, pas de complexité)", severity: "Medium", cvss: 4.8, cwe: "CWE-521", status: "Non corrigé" }
      ],
      actions: [
        "Activer MFA (TOTP) obligatoire pour tous les admins Supabase",
        "Renforcer password policy : min 12 caractères, 1 maj, 1 chiffre, 1 spécial",
        "Configurer session cookies Secure + HttpOnly + SameSite=Strict",
        "Implémenter détection connexions anormales (géoloc, device fingerprint)"
      ],
      owner: "RSSI",
      deadline: "2026-09-15"
    },
    {
      id: "a08",
      owasp_rank: "A08:2021",
      name: "Software & Data Integrity Failures",
      score: 58,
      target: 90,
      weight: 8,
      severity: "medium",
      status: "Planifié",
      findings: [
        { id: "INT-001", title: "Pas de vérification intégrité packages npm (lockfile hash)", severity: "Medium", cvss: 5.6, cwe: "CWE-494", status: "Non corrigé" },
        { id: "INT-002", title: "CDN third-party sans SRI (Subresource Integrity)", severity: "Low", cvss: 4.5, cwe: "CWE-353", status: "Non corrigé" }
      ],
      actions: [
        "Activer npm audit signatures pour vérifier intégrité packages",
        "Ajouter SRI (integrity) sur tous les CDN externes",
        "Signer les releases avec GPG + vérification pipeline CI/CD"
      ],
      owner: "Lead Dev + DevOps",
      deadline: "2026-10-15"
    }
  ],
  security_headers: {
    hsts: { status: "Présent", max_age: "31536000", preload: true, score: 100 },
    csp: { status: "Absent", score: 0, recommendation: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src * data:;" },
    x_frame_options: { status: "Présent", value: "DENY", score: 100 },
    x_content_type_options: { status: "Présent", value: "nosniff", score: 100 },
    referrer_policy: { status: "Présent", value: "strict-origin-when-cross-origin", score: 100 },
    permissions_policy: { status: "Absent", score: 0, recommendation: "camera=(), microphone=(), geolocation=()" }
  },
  scan_summary: {
    total_pages_scanned: 35,
    total_alerts: 28,
    critical: 3,
    high: 9,
    medium: 11,
    low: 5,
    resolved: 12,
    unresolved: 16,
    false_positives: 2,
    scan_tool: "OWASP ZAP 2.15 + Burp Suite Pro 2026.4 + npm audit"
  }
};

export const soc2Readiness = {
  assessment_date: "2026-06-19",
  methodology: "AICPA SOC 2 Type II — Trust Services Criteria (TSC 2017 Revised)",
  assessor: "EY Technology Risk — SOC 2 Readiness Assessment",
  overall_score: 42,
  target_score: 92,
  target_certification: "SOC 2 Type II — Q4 2027",
  trust_criteria: [
    {
      id: "tsc-security",
      name: "Security (Common Criteria)",
      weight: 30,
      current_score: 52,
      target: 95,
      status: "En cours",
      description: "Protection du système contre les accès non autorisés. SOC 2 exige ce critère pour TOUTES les attestations.",
      control_areas: [
        { area: "Contrôle d'accès logique et physique", score: 58, gaps: ["MFA non déployé", "Revue accès trimestrielle absente"] },
        { area: "Gestion des identités (IAM)", score: 55, gaps: ["Pas de SSO fédéré", "Provisioning/deprovisioning manuel"] },
        { area: "Monitoring sécurité (SIEM)", score: 40, gaps: ["Pas de SIEM", "Alerting sécurité absent", "Log centralization manquante"] },
        { area: "Firewall / WAF / DDoS protection", score: 65, gaps: ["WAF non configuré", "Pas de test DDoS"] },
        { area: "Endpoint protection (EDR)", score: 48, gaps: ["Pas d'EDR déployé", "Pas de MDM pour devices"] }
      ],
      key_actions: [
        "Déployer MFA obligatoire + SSO (OAuth 2.0 / SAML)",
        "Implémenter SIEM (SaaS: Datadog / Wazuh)",
        "Déployer WAF Cloudflare Pro + DDoS protection",
        "Automatiser provisioning/deprovisioning accès (SCIM)",
        "Revue accès trimestrielle avec comité sécurité"
      ],
      owner: "RSSI",
      deadline: "2027-03-31",
      budget: "28 500 000 FCFA",
      evidence_required: [
        "Politique de contrôle d'accès approuvée",
        "Logs d'accès 90 jours minimum",
        "Rapports revue accès trimestrielle",
        "Configuration WAF documentée",
        "Procédure gestion incidents sécurité"
      ]
    },
    {
      id: "tsc-availability",
      name: "Availability",
      weight: 15,
      current_score: 48,
      target: 90,
      status: "Planifié",
      description: "Accessibilité du système selon les SLA définis. Khepra cible 99.9% uptime.",
      control_areas: [
        { area: "Monitoring disponibilité", score: 55, gaps: ["Monitoring basique (ping)", "Pas de synthetic monitoring"] },
        { area: "Plan de continuité (PCA)", score: 40, gaps: ["PCA non testé", "RTO/RPO non définis"] },
        { area: "Disaster Recovery (DR)", score: 35, gaps: ["Pas de DR plan", "Pas de failover automatique"] },
        { area: "Gestion capacité & performance", score: 52, gaps: ["Pas de capacity planning", "Alerting seuils absent"] }
      ],
      key_actions: [
        "Déployer monitoring disponibilité (Datadog / Grafana synthetic)",
        "Définir et tester PCA annuellement (RTO < 4h, RPO < 1h)",
        "Mettre en place DR plan avec backup cross-region Supabase",
        "Implémenter capacity planning trimestriel"
      ],
      owner: "DevOps + RSSI",
      deadline: "2027-06-30",
      budget: "18 200 000 FCFA",
      evidence_required: [
        "SLA documentés par service",
        "Rapport test PCA annuel",
        "Logs uptime 12 mois",
        "Plan capacity planning approuvé"
      ]
    },
    {
      id: "tsc-confidentiality",
      name: "Confidentiality",
      weight: 20,
      current_score: 35,
      target: 90,
      status: "Planifié",
      description: "Protection des informations confidentielles (données clients, documents internes, secrets).",
      control_areas: [
        { area: "Classification des données", score: 25, gaps: ["Pas de classification formalisée", "Pas de DLP"] },
        { area: "Chiffrement (at rest / in transit)", score: 55, gaps: ["Chiffrement DB partiel", "Clés gérées manuellement"] },
        { area: "Gestion des secrets (API keys, tokens)", score: 38, gaps: ["Secrets en .env / localStorage", "Pas de rotation"] },
        { area: "Nettoyage données (disposal)", score: 30, gaps: ["Pas de politique retention", "Pas de procédure destruction"] }
      ],
      key_actions: [
        "Classifier données (Public, Interne, Confidentiel, Secret)",
        "Chiffrer toutes les données at rest (AES-256) + TLS 1.3 in transit",
        "Migrer secrets vers Supabase Vault + rotation automatique 90j",
        "Définir politique rétention données + procédure destruction sécurisée"
      ],
      owner: "RSSI + DPO",
      deadline: "2027-06-30",
      budget: "22 800 000 FCFA",
      evidence_required: [
        "Matrice classification données",
        "Politique de chiffrement documentée",
        "Procédure gestion des secrets",
        "Politique rétention & destruction données"
      ]
    },
    {
      id: "tsc-processing",
      name: "Processing Integrity",
      weight: 15,
      current_score: 38,
      target: 88,
      status: "Planifié",
      description: "Traitement complet, précis, opportun et autorisé des données. QA intégrée au SDLC.",
      control_areas: [
        { area: "Contrôles qualité données", score: 40, gaps: ["Pas de validation serveur systématique", "Pas de reconciliation"] },
        { area: "Détection erreurs processing", score: 32, gaps: ["Pas de monitoring erreurs", "Pas de dead letter queue"] },
        { area: "Intégrité flux données (ETL/API)", score: 42, gaps: ["Pas de checksum vérification", "Retry logic absent"] }
      ],
      key_actions: [
        "Implémenter validation serveur systématique (Zod/Yup)",
        "Déployer monitoring erreurs (Sentry) + dead letter queue",
        "Ajouter checksum vérification flux ETL + retry avec backoff",
        "Réconciliation mensuelle données avec rapports"
      ],
      owner: "Lead Dev Backend + QA Lead",
      deadline: "2027-09-30",
      budget: "15 600 000 FCFA",
      evidence_required: [
        "Procédure validation données",
        "Rapport mensuel reconciliation",
        "Logs monitoring erreurs 6 mois"
      ]
    },
    {
      id: "tsc-privacy",
      name: "Privacy",
      weight: 20,
      current_score: 35,
      target: 90,
      status: "Planifié",
      description: "Collecte, utilisation, rétention et divulgation des informations personnelles conformément à la politique de confidentialité.",
      control_areas: [
        { area: "Notice de confidentialité (Privacy Policy)", score: 52, gaps: ["Politique non conforme RGPD/lois africaines", "Cookie consent manuel"] },
        { area: "Choix & Consentement", score: 40, gaps: ["Cookie consent pas granular", "Opt-out difficile"] },
        { area: "Collecte minimale (Data minimization)", score: 28, gaps: ["Collecte excessive formulaires", "Pas d'audit données collectées"] },
        { area: "Droits des personnes (DSAR)", score: 25, gaps: ["Pas de procédure DSAR", "Pas de portail privacy"] },
        { area: "Sous-traitance (Data Processing Agreements)", score: 30, gaps: ["Pas de DPA signés avec fournisseurs", "Pas d'audit sous-traitants"] }
      ],
      key_actions: [
        "Mettre Privacy Policy en conformité RGPD + lois africaines (UEMOA/CEMAC)",
        "Déployer cookie consent granulaire (OneTrust / CookieYes)",
        "Auditer collecte données — appliquer data minimization",
        "Créer procédure DSAR (30j réponse max) + portail privacy",
        "Signer DPA avec tous les sous-traitants (Supabase, Vercel, etc.)"
      ],
      owner: "DPO + Juridique",
      deadline: "2027-09-30",
      budget: "20 400 000 FCFA",
      evidence_required: [
        "Privacy Policy conforme",
        "Cookie consent configuré + logs consentement",
        "Procédure DSAR documentée",
        "DPA signés avec tous les sous-traitants",
        "Registre traitements données (Art. 30 RGPD)"
      ]
    }
  ],
  certification_path: [
    { phase: "Phase 1 — Readiness Assessment", period: "Q3 2026", output: "Gap Analysis + Roadmap", score: "42 → 60" },
    { phase: "Phase 2 — Remediation Prioritaire", period: "Q4 2026", output: "Contrôles Security + Availability en place", score: "60 → 75" },
    { phase: "Phase 3 — Test of Design", period: "Q1 2027", output: "Contrôles conçus et documentés", score: "75 → 82" },
    { phase: "Phase 4 — Test of Operating Effectiveness", period: "Q2-Q3 2027", output: "Contrôles opérationnels 3-6 mois", score: "82 → 90" },
    { phase: "Phase 5 — SOC 2 Type II Audit", period: "Q4 2027", output: "Rapport SOC 2 Type II émis", score: "90 → 92" }
  ],
  soc2_report_type: "Type II (6 mois période d'observation)",
  auditor_firm: "EY (Ernst & Young)",
  total_budget: "105 500 000 FCFA",
  timeline: "Q3 2026 — Q4 2027 (18 mois)"
};

export const reportingInteractif = {
  title: "Reporting Interactif — KOS Digital Performance Command",
  description: "Dashboards drill-down, exports régulateurs automatisés (BCEAO/COBAC/OHADA), visualisations temps réel. 8ème onglet du commandement digital.",
  last_updated: "2026-06-19",
  owner: "RSSI + Lead Data Engineer",
  dashboards: [
    {
      id: "drill-cwv",
      name: "Core Web Vitals — Drill-Down",
      icon: "ri-speed-line",
      description: "Analyse granulaire des 5 métriques CWV par page, device et géographie. Filtres temporels, comparaison historique, drill-down par ressource impactante.",
      kpis: [
        { name: "LCP p75", value: "4.8s", target: "2.5s", trend: "down", alert: "critical" },
        { name: "CLS p75", value: "0.22", target: "0.1", trend: "stable", alert: "warning" },
        { name: "INP p75", value: "280ms", target: "200ms", trend: "up", alert: "warning" }
      ],
      features: [
        "Drill-down : Site → Page → Élément (image, script, CSS)",
        "Filtres : device (desktop/mobile/tablet), période, géographie",
        "Comparaison YoY / QoQ / MoM",
        "Export CSV / PDF / JSON",
        "Alertes seuils configurables"
      ]
    },
    {
      id: "drill-owasp",
      name: "OWASP — Vulnerability Tracker",
      icon: "ri-shield-flash-line",
      description: "Suivi temps réel des vulnérabilités OWASP. Heatmap de sévérité, drill-down par CWE/CVSS, timeline de remédiation.",
      kpis: [
        { name: "Vulnérabilités Ouvertes", value: "16", target: "0", trend: "down", alert: "critical" },
        { name: "Score OWASP Global", value: "55", target: "95", trend: "up", alert: "warning" },
        { name: "MTTR (Mean Time to Remediate)", value: "45j", target: "7j", trend: "down", alert: "warning" }
      ],
      features: [
        "Drill-down : Catégorie OWASP → CWE → Finding individuel",
        "Heatmap sévérité (Critical → Low) avec filtres",
        "Timeline remédiation avec SLAs par sévérité",
        "Export rapport OWASP conforme auditeurs",
        "Intégration ZAP/Burp Suite — import résultats"
      ]
    },
    {
      id: "drill-soc2",
      name: "SOC 2 — Readiness Dashboard",
      icon: "ri-award-line",
      description: "Suivi des 5 Trust Services Criteria. Barres de progression, gap analysis interactif, calendrier certification.",
      kpis: [
        { name: "Score SOC 2 Global", value: "42", target: "92", trend: "up", alert: "warning" },
        { name: "Contrôles en Place", value: "38", target: "100", trend: "up", alert: "warning" },
        { name: "Preuves Collectées", value: "12/45", target: "45/45", trend: "up", alert: "warning" }
      ],
      features: [
        "Drill-down : TSC → Control Area → Contrôle individuel",
        "Gap analysis avec recommandations priorisées",
        "Calendrier certification interactif (phases → jalons)",
        "Preuves upload + tracking (lien avec Evidence Library)",
        "Export rapport SOC 2 readiness (format auditeur)"
      ]
    },
    {
      id: "drill-regulatory",
      name: "Exports Régulateurs — Automatisés",
      icon: "ri-file-copy-2-line",
      description: "Génération automatique de rapports réglementaires conformes aux exigences BCEAO, COBAC, OHADA. Templates pré-remplis, signature électronique, envoi programmé.",
      templates: [
        { id: "bceao-001", name: "Rapport Sécurité SI — BCEAO (Instruction 008-2015)", format: "PDF + XML", frequency: "Trimestriel", next_due: "2026-09-30" },
        { id: "bceao-002", name: "Déclaration Incidents Majeurs — BCEAO (Circulaire 003-2021)", format: "PDF", frequency: "Sur incident (J+2)", next_due: "N/A" },
        { id: "cobac-001", name: "Rapport Audit Sécurité — COBAC (Règlement 04/CEMAC/UMAC/COBAC)", format: "PDF", frequency: "Annuel", next_due: "2027-01-31" },
        { id: "cobac-002", name: "Plan de Continuité — COBAC (Règlement 02/18/CEMAC/UMAC/COBAC)", format: "PDF", frequency: "Annuel", next_due: "2027-01-31" },
        { id: "ohada-001", name: "Annexe Sécurité — Rapport Commissariat aux Comptes (AUDCIF)", format: "PDF", frequency: "Annuel", next_due: "2027-06-30" },
        { id: "gdpr-001", name: "Registre Traitements — RGPD/UEMOA/CEMAC", format: "PDF + JSON", frequency: "Annuel", next_due: "2027-03-31" }
      ],
      features: [
        "Templates pré-remplis avec données temps réel (CWV, OWASP, SOC 2)",
        "Signature électronique intégrée (DocuSign API)",
        "Envoi programmé (email + API régulateur)",
        "Historique exports + versioning",
        "Validation conformité avant envoi (checklist automatisée)"
      ]
    }
  ],
  realtime_visualizations: [
    {
      id: "rt-cwv",
      name: "CWV Real-Time Monitor",
      icon: "ri-pulse-line",
      description: "Flux temps réel des métriques Core Web Vitals. Affichage en waterfall chart, identification instantanée des régressions, alertes push.",
      refresh_rate: "5 secondes (WebSocket)",
      metrics: ["LCP", "CLS", "INP", "FCP", "TTFB"]
    },
    {
      id: "rt-security",
      name: "Security Events Live Feed",
      icon: "ri-radar-line",
      description: "Flux temps réel des événements sécurité : tentatives intrusion, anomalies trafic, alertes WAF, scans détectés.",
      refresh_rate: "Temps réel (Server-Sent Events)",
      metrics: ["Intrusions bloquées", "Anomalies", "Scans WAF", "Alertes SIEM"]
    },
    {
      id: "rt-uptime",
      name: "Uptime & Availability Globe",
      icon: "ri-global-line",
      description: "Carte mondiale interactive de disponibilité. Heatmap par région (UEMOA/CEMAC/international), SLA tracking, historique incidents.",
      refresh_rate: "30 secondes",
      metrics: ["Uptime %", "Latence ms", "Incidents", "SLA compliance"]
    }
  ]
};

export const digitalPlanActions = [
  {
    id: "dp-001",
    pillar: "Core Web Vitals",
    action: "Convertir toutes les images (142) en WebP + redimensionnement responsive + lazy loading natif",
    priority: "P0",
    status: "En cours",
    progress: 35,
    responsible: "Lead Dev Frontend",
    deadline: "2026-07-15",
    budget: "5 200 000 FCFA",
    kpi: "LCP < 2.5s sur 75% pages (p75)",
    dependencies: []
  },
  {
    id: "dp-002",
    pillar: "Core Web Vitals",
    action: "Extraire et inliner Critical CSS + defer JS non-critique + preload polices",
    priority: "P0",
    status: "En cours",
    progress: 28,
    responsible: "Lead Dev Frontend",
    deadline: "2026-07-31",
    budget: "4 800 000 FCFA",
    kpi: "Speed Index < 3.4s, FCP < 1.8s",
    dependencies: ["dp-001"]
  },
  {
    id: "dp-003",
    pillar: "Core Web Vitals",
    action: "Déployer CDN avec edge caching (Cloudflare Pro) + compression Brotli + early hints",
    priority: "P0",
    status: "Planifié",
    progress: 10,
    responsible: "DevOps + RSSI",
    deadline: "2026-08-15",
    budget: "7 500 000 FCFA",
    kpi: "TTFB < 0.8s global p75",
    dependencies: []
  },
  {
    id: "dp-004",
    pillar: "Core Web Vitals",
    action: "Corriger CLS : width/height images + aspect-ratio + font-display swap",
    priority: "P1",
    status: "Planifié",
    progress: 5,
    responsible: "Lead Dev Frontend",
    deadline: "2026-08-15",
    budget: "3 200 000 FCFA",
    kpi: "CLS < 0.1 sur 90% pages",
    dependencies: ["dp-001"]
  },
  {
    id: "dp-005",
    pillar: "Core Web Vitals",
    action: "Optimiser INP : code splitting + debouncing + React.memo + Web Workers",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "Lead Dev Frontend + Architecte",
    deadline: "2026-09-15",
    budget: "6 000 000 FCFA",
    kpi: "INP < 200ms sur 75% pages",
    dependencies: ["dp-002"]
  },
  {
    id: "dp-006",
    pillar: "Core Web Vitals",
    action: "Réduire bundle JS : tree shaking + lazy routes + code splitting par page",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "Lead Dev Frontend",
    deadline: "2026-10-31",
    budget: "4 500 000 FCFA",
    kpi: "Bundle JS < 500 KB gzip",
    dependencies: ["dp-005"]
  },
  {
    id: "dp-007",
    pillar: "OWASP & Sécurité",
    action: "Corriger les 3 vulnérabilités critiques : IDOR API, SQL injection, XSS reflété",
    priority: "P0",
    status: "En cours",
    progress: 45,
    responsible: "RSSI + Lead Dev Backend",
    deadline: "2026-07-15",
    budget: "6 800 000 FCFA",
    kpi: "0 vulnérabilités Critical/High",
    dependencies: []
  },
  {
    id: "dp-008",
    pillar: "OWASP & Sécurité",
    action: "Déployer WAF Cloudflare Pro + rate limiting + DDoS protection",
    priority: "P0",
    status: "En cours",
    progress: 30,
    responsible: "RSSI + DevOps",
    deadline: "2026-07-31",
    budget: "9 200 000 FCFA",
    kpi: "WAF actif, 0 attaques réussies",
    dependencies: []
  },
  {
    id: "dp-009",
    pillar: "OWASP & Sécurité",
    action: "Implémenter CSP niveau strict + HSTS preload + headers sécurité complets",
    priority: "P0",
    status: "En cours",
    progress: 60,
    responsible: "RSSI + Lead Dev Frontend",
    deadline: "2026-07-31",
    budget: "2 800 000 FCFA",
    kpi: "Score Observatory 100/100 (Mozilla)",
    dependencies: []
  },
  {
    id: "dp-010",
    pillar: "OWASP & Sécurité",
    action: "Corriger dépendances vulnérables : npm audit fix + mise à jour Node 22 LTS",
    priority: "P0",
    status: "Planifié",
    progress: 20,
    responsible: "Lead Dev + DevOps",
    deadline: "2026-07-31",
    budget: "4 200 000 FCFA",
    kpi: "0 vulnérabilités npm (audit clean)",
    dependencies: []
  },
  {
    id: "dp-011",
    pillar: "OWASP & Sécurité",
    action: "Intégrer threat modeling (STRIDE) + secure code review dans le SDLC",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "Architecte + RSSI",
    deadline: "2026-10-31",
    budget: "5 500 000 FCFA",
    kpi: "Threat model par feature, 100% code review",
    dependencies: ["dp-007"]
  },
  {
    id: "dp-012",
    pillar: "OWASP & Sécurité",
    action: "Déployer SIEM (Wazuh/Datadog) + alerting sécurité 24/7",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "RSSI + DevOps",
    deadline: "2026-11-30",
    budget: "12 000 000 FCFA",
    kpi: "SIEM opérationnel, alerting < 5min",
    dependencies: ["dp-008"]
  },
  {
    id: "dp-013",
    pillar: "SOC 2",
    action: "Déployer MFA obligatoire + SSO + provisioning automatisé (SCIM)",
    priority: "P0",
    status: "Planifié",
    progress: 15,
    responsible: "RSSI",
    deadline: "2026-09-30",
    budget: "8 500 000 FCFA",
    kpi: "MFA 100% admins, SSO actif",
    dependencies: []
  },
  {
    id: "dp-014",
    pillar: "SOC 2",
    action: "Classifier données + chiffrer at rest (AES-256) + TLS 1.3 in transit",
    priority: "P0",
    status: "Planifié",
    progress: 10,
    responsible: "RSSI + DPO",
    deadline: "2026-10-31",
    budget: "14 500 000 FCFA",
    kpi: "Données sensibles chiffrées 100%",
    dependencies: ["dp-013"]
  },
  {
    id: "dp-015",
    pillar: "SOC 2",
    action: "Rédiger et adopter politiques SOC 2 (25 documents requis)",
    priority: "P0",
    status: "Planifié",
    progress: 5,
    responsible: "RSSI + DPO + Juridique",
    deadline: "2026-12-31",
    budget: "18 000 000 FCFA",
    kpi: "25 politiques adoptées COMEX",
    dependencies: []
  },
  {
    id: "dp-016",
    pillar: "SOC 2",
    action: "Définir et tester PCA annuellement (RTO < 4h, RPO < 1h)",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "DevOps + RSSI",
    deadline: "2027-06-30",
    budget: "12 500 000 FCFA",
    kpi: "Test PCA réussi, RTO/RPO respectés",
    dependencies: []
  },
  {
    id: "dp-017",
    pillar: "SOC 2",
    action: "Mettre Privacy Policy en conformité RGPD + lois UEMOA/CEMAC",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "DPO + Juridique",
    deadline: "2027-03-31",
    budget: "8 000 000 FCFA",
    kpi: "Privacy Policy audité + conforme",
    dependencies: ["dp-015"]
  },
  {
    id: "dp-018",
    pillar: "Reporting Interactif",
    action: "Concevoir et déployer dashboard CWV drill-down (8ème onglet)",
    priority: "P0",
    status: "En cours",
    progress: 55,
    responsible: "Lead Data Engineer + RSSI",
    deadline: "2026-08-15",
    budget: "9 500 000 FCFA",
    kpi: "Dashboard drill-down opérationnel",
    dependencies: []
  },
  {
    id: "dp-019",
    pillar: "Reporting Interactif",
    action: "Développer exports régulateurs automatisés (6 templates BCEAO/COBAC/OHADA)",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "Lead Data Engineer",
    deadline: "2026-10-31",
    budget: "11 800 000 FCFA",
    kpi: "6 templates exports fonctionnels",
    dependencies: ["dp-018"]
  },
  {
    id: "dp-020",
    pillar: "Reporting Interactif",
    action: "Implémenter visualisations temps réel (WebSocket CWV + SSE Security + Globe Uptime)",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "Lead Data Engineer + Lead Dev Frontend",
    deadline: "2026-12-31",
    budget: "14 200 000 FCFA",
    kpi: "3 visualisations RT opérationnelles",
    dependencies: ["dp-018"]
  },
  {
    id: "dp-021",
    pillar: "Reporting Interactif",
    action: "Intégrer signature électronique (DocuSign) + envoi programmé exports régulateurs",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "RSSI + Lead Dev Backend",
    deadline: "2027-03-31",
    budget: "7 800 000 FCFA",
    kpi: "Exports signés + envoyés automatiquement",
    dependencies: ["dp-019"]
  },
  {
    id: "dp-022",
    pillar: "Monitoring & Continu",
    action: "Déployer synthetic monitoring (Datadog/Grafana) pour CWV 24/7 + alerting",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "DevOps",
    deadline: "2026-09-30",
    budget: "8 500 000 FCFA",
    kpi: "Monitoring continu, alerting < 5min",
    dependencies: ["dp-003"]
  },
  {
    id: "dp-023",
    pillar: "Monitoring & Continu",
    action: "Intégrer Core Web Vitals + OWASP + SOC 2 dans le KOS Executive Command Center",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "RSSI + Lead Dev",
    deadline: "2027-06-30",
    budget: "6 000 000 FCFA",
    kpi: "Widgets Digital Perf intégrés KOS Executive",
    dependencies: ["dp-018", "dp-020"]
  },
  {
    id: "dp-024",
    pillar: "Monitoring & Continu",
    action: "Automatiser npm audit + OWASP ZAP scan + Lighthouse CI dans pipeline CI/CD",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "DevOps + Lead Dev",
    deadline: "2026-09-30",
    budget: "5 500 000 FCFA",
    kpi: "Scans automatisés chaque PR, blocage si régression",
    dependencies: ["dp-010"]
  }
];

export const digitalQuarterlyMilestones = {
  quarters: [
    {
      id: "q3-2026",
      label: "Q3 2026 — Fondations Performance",
      months: "Juillet — Septembre 2026",
      target_score: 58,
      milestones: [
        "Images WebP 100% converties + lazy loading (15 Juillet)",
        "Critical CSS inliné + JS defer activé (31 Juillet)",
        "CDN Cloudflare Pro déployé + Brotli (15 Août)",
        "3 vulnérabilités critiques corrigées (15 Juillet)",
        "WAF + Rate Limiting + CSP activés (31 Juillet)",
        "Dashboard CWV drill-down V1 livré (15 Août)",
        "npm audit 100% clean (31 Juillet)"
      ],
      budget: "42 500 000 FCFA",
      kpis: [
        { name: "Score Performance Digitale Global", target: "58/100", weight: 25 },
        { name: "LCP p75", target: "< 3.2s", weight: 20 },
        { name: "Vulnérabilités Critiques", target: "0", weight: 25 },
        { name: "Dashboard Drill-Down", target: "V1 Live", weight: 15 },
        { name: "TTFB p75", target: "< 1.0s", weight: 15 }
      ]
    },
    {
      id: "q4-2026",
      label: "Q4 2026 — Sécurisation & SOC 2 Kick-Off",
      months: "Octobre — Décembre 2026",
      target_score: 72,
      milestones: [
        "CLS corrigé < 0.1 (15 Octobre)",
        "INP optimisé < 200ms (15 Septembre)",
        "MFA + SSO déployés (30 Septembre)",
        "Données classifiées + chiffrées AES-256 (31 Octobre)",
        "25 politiques SOC 2 adoptées COMEX (31 Décembre)",
        "Exports régulateurs 6 templates livrés (31 Octobre)",
        "Synthetic monitoring CWV 24/7 actif (30 Septembre)",
        "Threat modeling intégré SDLC (31 Octobre)"
      ],
      budget: "72 500 000 FCFA",
      kpis: [
        { name: "Score Performance Digitale Global", target: "72/100", weight: 20 },
        { name: "Score OWASP Global", target: "80/100", weight: 20 },
        { name: "Score SOC 2 Readiness", target: "60/100", weight: 20 },
        { name: "Templates Régulateurs", target: "6/6", weight: 15 },
        { name: "Score CI/CD Security Scan", target: "Actif", weight: 15 },
        { name: "Speed Index p75", target: "< 3.5s", weight: 10 }
      ]
    },
    {
      id: "q1-2027",
      label: "Q1 2027 — SOC 2 Test of Design",
      months: "Janvier — Mars 2027",
      target_score: 82,
      milestones: [
        "Privacy Policy conforme RGPD/UEMOA/CEMAC (31 Mars)",
        "SIEM opérationnel + alerting 24/7 (31 Mars)",
        "Bundle JS < 500 KB gzip (28 Février)",
        "Visualisations temps réel V1 (WebSocket, SSE) (31 Mars)",
        "Signature électronique exports régulateurs (31 Mars)",
        "SOC 2 Test of Design complété (31 Mars)",
        "Score Lighthouse Performance > 85"
      ],
      budget: "58 300 000 FCFA",
      kpis: [
        { name: "Score Performance Digitale Global", target: "82/100", weight: 20 },
        { name: "Score SOC 2 Readiness", target: "75/100", weight: 25 },
        { name: "Score Lighthouse Performance", target: "≥ 85", weight: 20 },
        { name: "Visualisations RT", target: "3/3 Live", weight: 15 },
        { name: "Test of Design SOC 2", target: "Complété", weight: 20 }
      ]
    },
    {
      id: "q2-2027",
      label: "Q2 2027 — Excellence & Certification",
      months: "Avril — Juin 2027",
      target_score: 92,
      milestones: [
        "SOC 2 Test of Operating Effectiveness (6 mois) complété (30 Juin)",
        "PCA testé + validé (RTO 4h, RPO 1h) (30 Juin)",
        "Score Google Lighthouse Performance ≥ 92 (toutes pages)",
        "Widgets Digital Perf intégrés KOS Executive (30 Juin)",
        "Score Mozilla Observatory 100/100",
        "Audit externe OWASP : 0 findings Critical/High"
      ],
      budget: "32 500 000 FCFA",
      kpis: [
        { name: "Score Performance Digitale Global", target: "92/100", weight: 25 },
        { name: "SOC 2 Type II Ready", target: "OUI", weight: 25 },
        { name: "LCP p75 Global", target: "< 2.5s", weight: 20 },
        { name: "Score OWASP Global", target: "95/100", weight: 15 },
        { name: "Intégration KOS Executive", target: "Complète", weight: 15 }
      ]
    }
  ],
  summary_trajectory: [
    { kpi: "Score Performance Digitale Global", initial: 38, q3: 58, q4: 72, q1: 82, q2: 92, cible: 92 },
    { kpi: "LCP p75 (secondes)", initial: 4.8, q3: 3.2, q4: 2.8, q1: 2.5, q2: 2.2, cible: 2.2 },
    { kpi: "Score OWASP Global", initial: 55, q3: 72, q4: 80, q1: 88, q2: 95, cible: 95 },
    { kpi: "Score SOC 2 Readiness", initial: 42, q3: 48, q4: 60, q1: 75, q2: 90, cible: 92 },
    { kpi: "TTFB p75 (secondes)", initial: 1.2, q3: 1.0, q4: 0.85, q1: 0.75, q2: 0.65, cible: 0.65 },
    { kpi: "Vulnérabilités non résolues", initial: 16, q3: 8, q4: 4, q1: 2, q2: 0, cible: 0 },
    { kpi: "Lighthouse Performance Score", initial: 48, q3: 65, q4: 78, q1: 85, q2: 92, cible: 92 }
  ],
  critical_path: [
    { id: "cp-1", milestone: "Images WebP + CDN + Critical CSS", deadline: "2026-08-15", blocks: ["LCP < 2.5s", "Speed Index", "Lighthouse Score"] },
    { id: "cp-2", milestone: "3 vulnérabilités critiques corrigées", deadline: "2026-07-15", blocks: ["Score OWASP", "SOC 2 Security", "Audit externe"] },
    { id: "cp-3", milestone: "25 politiques SOC 2 adoptées", deadline: "2026-12-31", blocks: ["SOC 2 Test of Design", "SOC 2 Operating Effectiveness", "Certification"] }
  ]
};

export const digitalStats = {
  global_score: 38,
  target_score: 92,
  budget_total: "217 600 000 FCFA",
  timeline: "Q3 2026 — Q2 2027 (12 mois)",
  roi_projete: "> 22× (Performance → Conversion SEO + SOC 2 → Contrats Enterprise + Zéro incident sécurité)",
  consortium: "PwC · Deloitte · EY · KPMG",
  audit_date: "19 Juin 2026",
  next_review: "19 Septembre 2026",
  cwv_lcp_current: "4.8s",
  cwv_lcp_target: "≤ 2.5s",
  cwv_ttfb_current: "1.2s",
  cwv_ttfb_target: "≤ 0.8s",
  cwv_overall_score: 48,
  cwv_target: 95,
  owasp_score: 55,
  owasp_target: 95,
  owasp_critical_open: 3,
  owasp_total_findings: 28,
  owasp_resolved: 12,
  soc2_score: 42,
  soc2_target: 92,
  soc2_controls_placed: 38,
  soc2_controls_total: 125,
  lighthouse_perf: 48,
  lighthouse_target: 92,
  total_actions: 24,
  actions_completed: 0,
  actions_in_progress: 7,
  actions_planned: 17,
  p0_actions: 11,
  p1_actions: 8,
  p2_actions: 5,
  quarterly_periods: 4,
  reporting_templates: 6,
  dashboards: 4,
  realtime_views: 3
};



