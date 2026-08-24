// KOS Enterprise Security & Resilience Command™ — Mock Data
// Triade Gouvernance → Architecture → Sécurité — 3ème Pilier
// 5 Domaines : ISO 27001 · OWASP Top 10 · SOC 2 Type II · SecurityOps · Certifications

export interface Iso27001Control {
  id: string;
  annex: string;
  controlId: string;
  name: string;
  description: string;
  status: 'compliant' | 'partially_compliant' | 'non_compliant' | 'not_applicable';
  evidenceRefs: string[];
  lastAudited: string;
  nextAudit: string;
  automationLevel: 'fully_automated' | 'semi_automated' | 'manual';
  edgeFunctionSlug?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface OwaspVulnerability {
  id: string;
  owaspRef: string;
  category: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cvssScore: number;
  affectedSystems: string[];
  remediationStatus: 'fixed' | 'in_progress' | 'accepted_risk' | 'open';
  detectionDate: string;
  fixedDate?: string;
  wafRuleActive: boolean;
  edgeFunctionSlug?: string;
}

export interface Soc2Control {
  id: string;
  trustServiceCriteria: 'security' | 'availability' | 'confidentiality' | 'processing_integrity' | 'privacy';
  controlName: string;
  description: string;
  status: 'designed' | 'operating' | 'effective' | 'ineffective';
  testProcedure: string;
  testFrequency: 'continuous' | 'monthly' | 'quarterly' | 'annual';
  lastTested: string;
  testResult: 'pass' | 'pass_with_exceptions' | 'fail';
  evidenceCount: number;
}

export interface SecurityIncident {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'ddos' | 'intrusion' | 'data_leak' | 'misconfiguration' | 'insider_threat' | 'phishing' | 'malware' | 'other';
  title: string;
  description: string;
  detectedAt: string;
  resolvedAt?: string;
  timeToDetect: string;
  timeToResolve: string;
  status: 'resolved' | 'investigating' | 'contained' | 'open';
  rootCause: string;
  lessonsLearned: string;
}

export interface SecurityCertification {
  id: string;
  name: string;
  standard: string;
  scope: string;
  status: 'certified' | 'in_progress' | 'planned' | 'renewal_due';
  certificationBody: string;
  validUntil: string;
  progress: number;
  evidenceCount: number;
  outstandingFindings: number;
}

export interface SecurityResilienceStats {
  iso27001Controls: number;
  iso27001Compliant: number;
  owaspVulnerabilities: number;
  owaspFixed: number;
  soc2Controls: number;
  soc2Effective: number;
  incidentsTotal: number;
  incidentsResolved: number;
  certifications: number;
  certificationsActive: number;
  mttd: string;
  mttr: string;
  securityScore: string;
}

// ============================================================
// PILIER 1 : ISO 27001 — SYSTÈME DE MANAGEMENT DE LA SÉCURITÉ
// ============================================================

export const ISO27001_CONTROLS: Iso27001Control[] = [
  // A.5 — Politiques de sécurité
  {
    id: 'iso-a5-01', annex: 'A.5', controlId: 'A.5.1.1',
    name: 'Politiques de sécurité de l\'information',
    description: 'Ensemble documenté des politiques de sécurité approuvées par la direction, communiquées aux employés et parties prenantes.',
    status: 'compliant', evidenceRefs: ['POL-SEC-001_v2.3', 'COMEX-MIN-2026-03-15'], lastAudited: '2026-06-10', nextAudit: '2026-09-10',
    automationLevel: 'manual', riskLevel: 'critical',
  },
  {
    id: 'iso-a5-02', annex: 'A.5', controlId: 'A.5.1.2',
    name: 'Revue des politiques de sécurité',
    description: 'Revue planifiée des politiques à intervalles réguliers ou lors de changements significatifs.',
    status: 'compliant', evidenceRefs: ['POL-REV-2026-Q2', 'CALENDRIER-REVUE-2026'], lastAudited: '2026-05-20', nextAudit: '2026-08-20',
    automationLevel: 'semi_automated', riskLevel: 'medium',
  },
  // A.8 — Gestion des actifs
  {
    id: 'iso-a8-01', annex: 'A.8', controlId: 'A.8.1.1',
    name: 'Inventaire des actifs',
    description: 'Tous les actifs informationnels (données, systèmes, services cloud, API, edge functions) sont identifiés et un inventaire est maintenu.',
    status: 'compliant', evidenceRefs: ['ASSET-INV-2026-06-27', 'KOS-ASSET-REGISTRY'], lastAudited: '2026-06-27', nextAudit: '2026-07-27',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-scan', riskLevel: 'high',
  },
  {
    id: 'iso-a8-02', annex: 'A.8', controlId: 'A.8.2.1',
    name: 'Classification de l\'information',
    description: 'Classification des données selon 4 niveaux : Public, Interne, Confidentiel, Secret (données FCFA/KYC).',
    status: 'compliant', evidenceRefs: ['CLASS-POL-001', 'DATA-CLASS-MATRIX'], lastAudited: '2026-06-15', nextAudit: '2026-09-15',
    automationLevel: 'semi_automated', riskLevel: 'high',
  },
  {
    id: 'iso-a8-03', annex: 'A.8', controlId: 'A.8.3.1',
    name: 'Médias amovibles — Gestion',
    description: 'Politique de gestion des médias amovibles (clés USB, disques externes) : chiffrement obligatoire, registre, destruction sécurisée.',
    status: 'compliant', evidenceRefs: ['MEDIA-POL-001'], lastAudited: '2026-05-10', nextAudit: '2026-11-10',
    automationLevel: 'manual', riskLevel: 'low',
  },
  // A.9 — Contrôle d'accès
  {
    id: 'iso-a9-01', annex: 'A.9', controlId: 'A.9.1.1',
    name: 'Politique de contrôle d\'accès',
    description: "Politique d'accès basée sur les rôles (RBAC) avec principe du moindre privilège. Revue trimestrielle des droits.",
    status: 'compliant', evidenceRefs: ['ACC-POL-002_v1.5', 'RBAC-MATRIX-2026-Q2'], lastAudited: '2026-06-01', nextAudit: '2026-09-01',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'admin-auth', riskLevel: 'critical',
  },
  {
    id: 'iso-a9-02', annex: 'A.9', controlId: 'A.9.2.1',
    name: 'Enregistrement et gestion des utilisateurs',
    description: 'Processus formel d\'enregistrement et de désenregistrement des utilisateurs. Comptes inactifs désactivés après 30 jours.',
    status: 'compliant', evidenceRefs: ['USER-REG-2026-Q2', 'ADMIN-ACCESS-REVIEW'], lastAudited: '2026-06-20', nextAudit: '2026-07-20',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'admin-auth', riskLevel: 'high',
  },
  {
    id: 'iso-a9-03', annex: 'A.9', controlId: 'A.9.2.3',
    name: 'Gestion des privilèges administrateurs',
    description: 'Comptes administrateurs limités au strict nécessaire. Session privilégiée journalisée et auditable.',
    status: 'compliant', evidenceRefs: ['PRIV-ACC-LOG-2026-06', 'ADMIN-SESSION-AUDIT'], lastAudited: '2026-06-27', nextAudit: '2026-06-28',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-logger', riskLevel: 'critical',
  },
  {
    id: 'iso-a9-04', annex: 'A.9', controlId: 'A.9.4.1',
    name: 'Restriction d\'accès à l\'information',
    description: 'Accès aux données FCFA/KYC limité aux agents KOS dûment autorisés. Chaque accès est journalisé.',
    status: 'compliant', evidenceRefs: ['DATA-ACC-LOG-2026-06', 'FCFA-ACC-AUDIT'], lastAudited: '2026-06-26', nextAudit: '2026-07-26',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-logger', riskLevel: 'critical',
  },
  // A.10 — Cryptographie
  {
    id: 'iso-a10-01', annex: 'A.10', controlId: 'A.10.1.1',
    name: 'Politique d\'utilisation des contrôles cryptographiques',
    description: 'Chiffrement AES-256 at-rest, TLS 1.3 in-transit, gestion des clés via Supabase Vault. Rotation trimestrielle des clés.',
    status: 'compliant', evidenceRefs: ['CRYPTO-POL-001', 'KEY-ROTATION-LOG-2026'], lastAudited: '2026-06-15', nextAudit: '2026-09-15',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-platform-credentials', riskLevel: 'critical',
  },
  {
    id: 'iso-a10-02', annex: 'A.10', controlId: 'A.10.1.2',
    name: 'Gestion des clés cryptographiques',
    description: 'Clés stockées dans Supabase Vault, accès strictement contrôlé, journalisation de toute opération sur les clés.',
    status: 'compliant', evidenceRefs: ['KEY-MGMT-AUDIT-2026-Q2'], lastAudited: '2026-06-01', nextAudit: '2026-09-01',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-platform-credentials', riskLevel: 'critical',
  },
  // A.12 — Sécurité des opérations
  {
    id: 'iso-a12-01', annex: 'A.12', controlId: 'A.12.1.1',
    name: 'Procédures d\'exploitation documentées',
    description: 'Procédures opérationnelles documentées pour les systèmes critiques KOS. Disponibles dans le KOS Enterprise Manual.',
    status: 'compliant', evidenceRefs: ['OPS-PROC-v3.1', 'KOS-MANUAL-2026'], lastAudited: '2026-06-05', nextAudit: '2026-12-05',
    automationLevel: 'manual', riskLevel: 'medium',
  },
  {
    id: 'iso-a12-02', annex: 'A.12', controlId: 'A.12.2.1',
    name: 'Protection contre les codes malveillants',
    description: 'Antivirus/antimalware sur tous les endpoints. WAF Netlify en production. Scan automatique des fichiers uploadés.',
    status: 'compliant', evidenceRefs: ['AV-REPORT-2026-06', 'WAF-LOG-2026-06'], lastAudited: '2026-06-27', nextAudit: '2026-07-27',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-scan', riskLevel: 'high',
  },
  {
    id: 'iso-a12-03', annex: 'A.12', controlId: 'A.12.3.1',
    name: 'Sauvegarde des informations',
    description: 'Sauvegarde quotidienne automatisée Supabase + backup hebdomadaire off-site. Test de restauration trimestriel.',
    status: 'compliant', evidenceRefs: ['BACKUP-LOG-2026-06', 'RESTORE-TEST-2026-Q2'], lastAudited: '2026-06-20', nextAudit: '2026-09-20',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-backup-automation', riskLevel: 'critical',
  },
  {
    id: 'iso-a12-04', annex: 'A.12', controlId: 'A.12.4.1',
    name: 'Journalisation des événements',
    description: 'Tous les événements de sécurité sont journalisés dans kos_universal_audit_log. Horodatage UTC, immuable.',
    status: 'compliant', evidenceRefs: ['AUDIT-LOG-SAMPLE-2026-06'], lastAudited: '2026-06-27', nextAudit: '2026-07-01',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-logger', riskLevel: 'critical',
  },
  {
    id: 'iso-a12-05', annex: 'A.12', controlId: 'A.12.6.1',
    name: 'Gestion des vulnérabilités techniques',
    description: 'Scan OWASP hebdomadaire + CVE monitoring continu. Correctifs déployés selon criticité : critique < 24h, high < 72h.',
    status: 'compliant', evidenceRefs: ['VULN-SCAN-2026-06-27', 'CVE-REPORT-2026-W26'], lastAudited: '2026-06-27', nextAudit: '2026-07-04',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-scan', riskLevel: 'critical',
  },
  // A.13 — Sécurité des communications
  {
    id: 'iso-a13-01', annex: 'A.13', controlId: 'A.13.1.1',
    name: 'Sécurité des réseaux',
    description: 'Segmentation réseau, WAF en edge, rate limiting, DDoS protection Cloudflare/Netlify.',
    status: 'compliant', evidenceRefs: ['NET-SEC-ARCH-2026', 'WAF-RULES-2026-06'], lastAudited: '2026-06-15', nextAudit: '2026-09-15',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-waf', riskLevel: 'critical',
  },
  {
    id: 'iso-a13-02', annex: 'A.13', controlId: 'A.13.2.1',
    name: 'Politiques de transfert de l\'information',
    description: 'Protocoles de transfert sécurisé : SFTP, HTTPS/TLS 1.3 uniquement. Aucun transfert non chiffré autorisé.',
    status: 'compliant', evidenceRefs: ['TRANSFER-POL-001'], lastAudited: '2026-06-10', nextAudit: '2026-09-10',
    automationLevel: 'fully_automated', riskLevel: 'high',
  },
  // A.14 — Acquisition et développement
  {
    id: 'iso-a14-01', annex: 'A.14', controlId: 'A.14.2.1',
    name: 'Politique de développement sécurisé',
    description: 'SDLC sécurisé : revue de code, analyse statique (ESLint security), pas de secrets dans le code, dépendances auditées (npm audit).',
    status: 'compliant', evidenceRefs: ['SDLC-POL-v2.0', 'NPM-AUDIT-2026-06-27'], lastAudited: '2026-06-25', nextAudit: '2026-07-25',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-security-scan', riskLevel: 'high',
  },
  {
    id: 'iso-a14-02', annex: 'A.14', controlId: 'A.14.2.5',
    name: 'Principes d\'ingénierie sécurisée',
    description: 'OWASP ASVS Niveau 2 appliqué. Input validation, output encoding, parameterized queries, CORS strict.',
    status: 'partially_compliant', evidenceRefs: ['ASVS-GAP-2026-06'], lastAudited: '2026-06-20', nextAudit: '2026-08-20',
    automationLevel: 'semi_automated', edgeFunctionSlug: 'kos-security-scan', riskLevel: 'high',
  },
  // A.16 — Gestion des incidents
  {
    id: 'iso-a16-01', annex: 'A.16', controlId: 'A.16.1.1',
    name: 'Responsabilités et procédures de gestion des incidents',
    description: 'Plan de réponse aux incidents documenté. Équipe CSIRT KOS identifiée. Escalade CDO → Managing Partner.',
    status: 'compliant', evidenceRefs: ['IRP-v2.1', 'CSIRT-ROSTER-2026'], lastAudited: '2026-06-01', nextAudit: '2026-09-01',
    automationLevel: 'manual', riskLevel: 'critical',
  },
  {
    id: 'iso-a16-02', annex: 'A.16', controlId: 'A.16.1.5',
    name: 'Réponse aux incidents de sécurité',
    description: 'Procédure de réponse : détection → containment → eradication → recovery → lessons learned. Automatisée pour les incidents N1.',
    status: 'compliant', evidenceRefs: ['IR-RUNBOOK-2026', 'IR-DRILL-2026-Q2'], lastAudited: '2026-06-15', nextAudit: '2026-09-15',
    automationLevel: 'semi_automated', edgeFunctionSlug: 'kos-security-logger', riskLevel: 'critical',
  },
  // A.17 — Continuité d'activité
  {
    id: 'iso-a17-01', annex: 'A.17', controlId: 'A.17.1.1',
    name: 'Planification de la continuité de la sécurité',
    description: 'BCP/DRP documenté, testé semestriellement. RPO < 1h, RTO < 4h pour les services critiques KOS.',
    status: 'compliant', evidenceRefs: ['BCP-v3.0', 'DRP-v3.0', 'DR-TEST-2026-Q2'], lastAudited: '2026-06-01', nextAudit: '2026-12-01',
    automationLevel: 'semi_automated', edgeFunctionSlug: 'kos-backup-automation', riskLevel: 'critical',
  },
  {
    id: 'iso-a17-02', annex: 'A.17', controlId: 'A.17.2.1',
    name: 'Disponibilité des moyens de traitement',
    description: 'Redondance Supabase (HA), CDN multi-POP Netlify, architecture serverless edge functions.',
    status: 'compliant', evidenceRefs: ['HA-ARCH-2026', 'UPTIME-REPORT-2026-06'], lastAudited: '2026-06-27', nextAudit: '2026-07-27',
    automationLevel: 'fully_automated', edgeFunctionSlug: 'kos-site-health-check', riskLevel: 'critical',
  },
  // A.18 — Conformité
  {
    id: 'iso-a18-01', annex: 'A.18', controlId: 'A.18.1.1',
    name: 'Identification des exigences légales et contractuelles',
    description: 'Veille réglementaire : RGPD, CDP Sénégal, APDP Bénin, ARTCI Côte d\'Ivoire, lois sectorielles UEMOA/CEMAC.',
    status: 'compliant', evidenceRefs: ['LEGAL-REGISTER-2026-Q2', 'REGULATORY-WATCH-2026-W26'], lastAudited: '2026-06-20', nextAudit: '2026-09-20',
    automationLevel: 'semi_automated', edgeFunctionSlug: 'kos-regulatory-scout', riskLevel: 'high',
  },
  {
    id: 'iso-a18-02', annex: 'A.18', controlId: 'A.18.2.2',
    name: 'Conformité avec les politiques et normes de sécurité',
    description: 'Revue indépendante annuelle de la conformité ISO 27001. Audit interne trimestriel automatisé.',
    status: 'partially_compliant', evidenceRefs: ['COMPLIANCE-REVIEW-2026-Q2', 'AUDIT-GAPS-Q2-2026'], lastAudited: '2026-06-15', nextAudit: '2026-09-15',
    automationLevel: 'semi_automated', riskLevel: 'high',
  },
];

// ============================================================
// PILIER 2 : OWASP TOP 10 — GESTION DES VULNÉRABILITÉS
// ============================================================

export const OWASP_VULNERABILITIES: OwaspVulnerability[] = [
  {
    id: 'owasp-001', owaspRef: 'A01:2021', category: 'Broken Access Control',
    name: 'Contrôle d\'accès insuffisant sur les Edge Functions Admin',
    description: 'Certaines edge functions admin nécessitent un renforcement du JWT verification pour garantir que seuls les rôles admin authentifiés peuvent les invoquer.',
    severity: 'critical', cvssScore: 9.1,
    affectedSystems: ['supabase/functions/admin-*', 'kos-automaton-engine'],
    remediationStatus: 'fixed', detectionDate: '2026-05-15', fixedDate: '2026-05-16',
    wafRuleActive: true, edgeFunctionSlug: 'admin-auth',
  },
  {
    id: 'owasp-002', owaspRef: 'A02:2021', category: 'Cryptographic Failures',
    name: 'Transmission de données sensibles sans chiffrement — Logs',
    description: 'Identifié lors de l\'audit : certaines données PII résiduelles apparaissaient dans les logs non filtrés. Correction : masquage automatique PII dans tous les logs.',
    severity: 'high', cvssScore: 7.5,
    affectedSystems: ['kos-security-logger', 'kos-universal-audit-log'],
    remediationStatus: 'fixed', detectionDate: '2026-04-20', fixedDate: '2026-04-22',
    wafRuleActive: false, edgeFunctionSlug: 'kos-security-logger',
  },
  {
    id: 'owasp-003', owaspRef: 'A03:2021', category: 'Injection',
    name: 'SQL Injection potentielle — Requêtes dynamiques non paramétrées',
    description: 'Audit de code : 3 requêtes Supabase construites par concaténation. Correction : migration vers requêtes paramétrées et RLS.',
    severity: 'critical', cvssScore: 9.8,
    affectedSystems: ['kos-knowledge-manager', 'kos-regulatory-scout'],
    remediationStatus: 'fixed', detectionDate: '2026-03-10', fixedDate: '2026-03-12',
    wafRuleActive: true, edgeFunctionSlug: 'kos-security-scan',
  },
  {
    id: 'owasp-004', owaspRef: 'A04:2021', category: 'Insecure Design',
    name: 'Absence de rate limiting sur API publiques',
    description: 'Certaines routes API publiques n\'avaient pas de rate limiting, exposant au risque d\'épuisement de ressources.',
    severity: 'high', cvssScore: 7.2,
    affectedSystems: ['rag-semantic-search', 'kos-ai-recommend'],
    remediationStatus: 'fixed', detectionDate: '2026-04-05', fixedDate: '2026-04-06',
    wafRuleActive: true, edgeFunctionSlug: 'kos-waf',
  },
  {
    id: 'owasp-005', owaspRef: 'A05:2021', category: 'Security Misconfiguration',
    name: 'CORS trop permissif sur certaines Edge Functions',
    description: 'Headers CORS configurés avec wildcard (*) au lieu de l\'origine spécifique KOS. Risque d\'accès cross-origin non contrôlé.',
    severity: 'medium', cvssScore: 6.5,
    affectedSystems: ['kos-social-content-generator', 'og-image-proxy'],
    remediationStatus: 'fixed', detectionDate: '2026-05-01', fixedDate: '2026-05-02',
    wafRuleActive: false,
  },
  {
    id: 'owasp-006', owaspRef: 'A06:2021', category: 'Vulnerable and Outdated Components',
    name: 'Dépendances npm avec vulnérabilités connues (CVE-2025-xxxxx)',
    description: 'npm audit révèle 4 vulnérabilités de sévérité high sur des dépendances de build. Mise à jour planifiée.',
    severity: 'high', cvssScore: 8.2,
    affectedSystems: ['package.json — postcss, vite plugins'],
    remediationStatus: 'in_progress', detectionDate: '2026-06-15',
    wafRuleActive: false,
  },
  {
    id: 'owasp-007', owaspRef: 'A07:2021', category: 'Identification and Authentication Failures',
    name: 'Session JWT — Durée de validité excessive',
    description: 'Les tokens JWT avaient une durée de validité de 7 jours sans mécanisme de révocation. Réduit à 24h avec refresh token.',
    severity: 'medium', cvssScore: 5.9,
    affectedSystems: ['admin-auth', 'authGuard'],
    remediationStatus: 'fixed', detectionDate: '2026-05-20', fixedDate: '2026-05-22',
    wafRuleActive: false,
  },
  {
    id: 'owasp-008', owaspRef: 'A08:2021', category: 'Software and Data Integrity Failures',
    name: 'Absence de vérification d\'intégrité sur uploads de fichiers',
    description: 'Le formulaire de téléchargement de documents ne vérifiait pas le hash SHA-256 des fichiers uploadés.',
    severity: 'medium', cvssScore: 5.5,
    affectedSystems: ['admin-documents', 'form-submission-pipeline'],
    remediationStatus: 'in_progress', detectionDate: '2026-06-20',
    wafRuleActive: false,
  },
  {
    id: 'owasp-009', owaspRef: 'A09:2021', category: 'Security Logging and Monitoring Failures',
    name: 'Logs insuffisants sur les tentatives d\'accès échouées',
    description: 'Les tentatives de connexion échouées n\'étaient pas suffisamment détaillées (IP, user-agent, timestamp). Amélioration en cours.',
    severity: 'low', cvssScore: 4.3,
    affectedSystems: ['admin-auth', 'kos-security-logger'],
    remediationStatus: 'in_progress', detectionDate: '2026-06-25',
    wafRuleActive: false,
  },
  {
    id: 'owasp-010', owaspRef: 'A10:2021', category: 'Server-Side Request Forgery (SSRF)',
    name: 'Validation insuffisante des URLs dans kos-regulatory-scout',
    description: 'Le scraper réglementaire pouvait être redirigé vers des URLs internes. Correction : whitelist de domaines autorisés.',
    severity: 'high', cvssScore: 7.8,
    affectedSystems: ['kos-regulatory-scout'],
    remediationStatus: 'fixed', detectionDate: '2026-06-01', fixedDate: '2026-06-03',
    wafRuleActive: true, edgeFunctionSlug: 'kos-waf',
  },
  {
    id: 'owasp-011', owaspRef: 'A01:2021', category: 'Broken Access Control',
    name: 'RLS manquante sur certaines tables Supabase',
    description: '3 tables de la base de données Supabase n\'avaient pas de Row Level Security activée, exposant à des accès non autorisés.',
    severity: 'critical', cvssScore: 9.3,
    affectedSystems: ['Supabase — tables kos_*'],
    remediationStatus: 'fixed', detectionDate: '2026-04-01', fixedDate: '2026-04-02',
    wafRuleActive: false, edgeFunctionSlug: 'kos-security-scan',
  },
  {
    id: 'owasp-012', owaspRef: 'A03:2021', category: 'Injection',
    name: 'XSS potentiel dans les contenus générés par LLM',
    description: 'Les contenus générés par les LLM pouvaient contenir du HTML non échappé. Correction : sanitization automatique via DOMPurify.',
    severity: 'medium', cvssScore: 6.1,
    affectedSystems: ['kos-llm-content-generator', 'kos-blog-writing-automates'],
    remediationStatus: 'fixed', detectionDate: '2026-04-15', fixedDate: '2026-04-16',
    wafRuleActive: true,
  },
];

// ============================================================
// PILIER 3 : SOC 2 TYPE II — TRUST SERVICES CRITERIA
// ============================================================

export const SOC2_CONTROLS: Soc2Control[] = [
  // Security (Common Criteria)
  {
    id: 'soc2-cc1.1', trustServiceCriteria: 'security',
    controlName: 'CC1.1 — Intégrité et éthique',
    description: 'L\'entité démontre un engagement envers l\'intégrité et les valeurs éthiques via le Code de Conduite KHEPRA et la Charte Éthique IA.',
    status: 'operating', testProcedure: 'Revue documentaire + entretien direction',
    testFrequency: 'annual', lastTested: '2026-06-01', testResult: 'pass', evidenceCount: 4,
  },
  {
    id: 'soc2-cc3.2', trustServiceCriteria: 'security',
    controlName: 'CC3.2 — Évaluation des risques',
    description: 'COSO ERM aligned — Cartographie des risques KOS mise à jour trimestriellement. Matrice de risques avec scoring et plans de traitement.',
    status: 'effective', testProcedure: 'Revue matrice risques + entretiens risk owners',
    testFrequency: 'quarterly', lastTested: '2026-06-15', testResult: 'pass', evidenceCount: 6,
  },
  {
    id: 'soc2-cc5.1', trustServiceCriteria: 'security',
    controlName: 'CC5.1 — Contrôles internes',
    description: 'Ensemble de contrôles préventifs, détectives et correctifs documentés dans le KOS Internal Control Framework.',
    status: 'operating', testProcedure: 'Walkthrough + test operating effectiveness',
    testFrequency: 'quarterly', lastTested: '2026-06-10', testResult: 'pass_with_exceptions', evidenceCount: 8,
  },
  {
    id: 'soc2-cc6.1', trustServiceCriteria: 'security',
    controlName: 'CC6.1 — Contrôles d\'accès logique et physique',
    description: 'RBAC, MFA, JWT tokens, session management, principe du moindre privilège. Accès physique : cloud uniquement (Supabase/Netlify).',
    status: 'effective', testProcedure: 'Test d\'intrusion + revue logs accès',
    testFrequency: 'quarterly', lastTested: '2026-06-20', testResult: 'pass', evidenceCount: 12,
  },
  {
    id: 'soc2-cc7.2', trustServiceCriteria: 'security',
    controlName: 'CC7.2 — Détection et monitoring des anomalies',
    description: 'SIEM léger via kos-security-logger. Alertes en temps réel sur anomalies : tentatives échouées, accès inhabituels, modifications suspectes.',
    status: 'operating', testProcedure: 'Injection d\'anomalies simulées + vérification alertes',
    testFrequency: 'monthly', lastTested: '2026-06-25', testResult: 'pass', evidenceCount: 5,
  },
  {
    id: 'soc2-cc7.4', trustServiceCriteria: 'security',
    controlName: 'CC7.4 — Réponse aux incidents',
    description: 'Plan de réponse aux incidents documenté et testé. CSIRT dédié. Post-mortem systématique avec lessons learned.',
    status: 'operating', testProcedure: 'Simulation incident + revue post-mortem',
    testFrequency: 'quarterly', lastTested: '2026-06-15', testResult: 'pass', evidenceCount: 7,
  },
  // Availability
  {
    id: 'soc2-a1.1', trustServiceCriteria: 'availability',
    controlName: 'A1.1 — Surveillance de la disponibilité',
    description: 'Monitoring 24/7 via kos-site-health-check. Uptime SLI, SLO 99.9%. Alerte immédiate si disponibilité < 99.5%.',
    status: 'effective', testProcedure: 'Vérification dashboards + logs disponibilité',
    testFrequency: 'continuous', lastTested: '2026-06-27', testResult: 'pass', evidenceCount: 30,
  },
  {
    id: 'soc2-a1.2', trustServiceCriteria: 'availability',
    controlName: 'A1.2 — Plan de continuité et reprise',
    description: 'BCP/DRP testé. RPO 1h, RTO 4h. Backup quotidien Supabase + hebdomadaire off-site. Test de restauration trimestriel.',
    status: 'operating', testProcedure: 'Test de restauration complet',
    testFrequency: 'quarterly', lastTested: '2026-06-01', testResult: 'pass', evidenceCount: 10,
  },
  // Confidentiality
  {
    id: 'soc2-c1.1', trustServiceCriteria: 'confidentiality',
    controlName: 'C1.1 — Identification et classification des données confidentielles',
    description: 'Classification 4 niveaux : Public, Interne, Confidentiel, Secret. Données FCFA et KYC classées Secret — accès journalisé.',
    status: 'effective', testProcedure: 'Revue classification + test accès',
    testFrequency: 'quarterly', lastTested: '2026-06-15', testResult: 'pass', evidenceCount: 8,
  },
  {
    id: 'soc2-c1.2', trustServiceCriteria: 'confidentiality',
    controlName: 'C1.2 — Protection des données confidentielles',
    description: 'Chiffrement AES-256 at-rest, TLS 1.3 in-transit. Masquage automatique PII dans les logs. DLP basique sur les sorties.',
    status: 'effective', testProcedure: 'Test chiffrement + scan logs pour PII',
    testFrequency: 'monthly', lastTested: '2026-06-20', testResult: 'pass', evidenceCount: 9,
  },
  // Privacy
  {
    id: 'soc2-p3.1', trustServiceCriteria: 'privacy',
    controlName: 'P3.1 — Consentement et droits des personnes',
    description: 'Cookie consent, mentions légales, droit d\'accès/rectification/effacement. Conforme RGPD + lois africaines (12 pays).',
    status: 'operating', testProcedure: 'Revue mentions légales + test exercice droits',
    testFrequency: 'annual', lastTested: '2026-05-15', testResult: 'pass_with_exceptions', evidenceCount: 6,
  },
  {
    id: 'soc2-p4.1', trustServiceCriteria: 'privacy',
    controlName: 'P4.1 — Limitation de la collecte',
    description: 'Minimisation des données collectées. Politique de conservation alignée sur les bases légales. Purge automatique après rétention.',
    status: 'operating', testProcedure: 'Revue registre traitements + test purge',
    testFrequency: 'quarterly', lastTested: '2026-06-10', testResult: 'pass', evidenceCount: 5,
  },
  // Processing Integrity
  {
    id: 'soc2-pi1.2', trustServiceCriteria: 'processing_integrity',
    controlName: 'PI1.2 — Exactitude et exhaustivité du traitement',
    description: 'Validation des données en entrée, contrôle de cohérence, piste d\'audit complète des traitements automatisés KOS.',
    status: 'operating', testProcedure: 'Test processing complet + vérification data lineage',
    testFrequency: 'quarterly', lastTested: '2026-06-05', testResult: 'pass', evidenceCount: 7,
  },
];

// ============================================================
// PILIER 4 : SECURITY OPERATIONS — INCIDENTS & RÉSILIENCE
// ============================================================

export const SECURITY_INCIDENTS: SecurityIncident[] = [
  {
    id: 'inc-001', severity: 'critical', type: 'ddos',
    title: 'Tentative DDoS — Surcharge API kos-ai-recommend',
    description: 'Pic de 47 000 requêtes/min sur l\'endpoint kos-ai-recommend. Tentative d\'épuisement des ressources Supabase Edge Functions.',
    detectedAt: '2026-05-12T03:47:00Z', resolvedAt: '2026-05-12T04:02:00Z',
    timeToDetect: '2 min', timeToResolve: '15 min',
    status: 'resolved',
    rootCause: 'Attaque DDoS couche 7 ciblant l\'API publique de recommandation IA. IPs origine : botnet asiatique.',
    lessonsLearned: 'Rate limiting implémenté (100 req/min/IP). WAF rule anti-DDoS ajoutée. Monitoring seuil d\'alerte abaissé à 500 req/min.',
  },
  {
    id: 'inc-002', severity: 'high', type: 'misconfiguration',
    title: 'Exposition accidentelle — Variables d\'environnement dans build',
    description: 'Lors d\'un déploiement, 2 variables d\'environnement non sensibles ont été incluses dans le bundle JS client. Aucune clé secrète exposée.',
    detectedAt: '2026-04-18T14:30:00Z', resolvedAt: '2026-04-18T15:10:00Z',
    timeToDetect: '5 min', timeToResolve: '35 min',
    status: 'resolved',
    rootCause: 'Mauvaise configuration Vite define — les variables avaient le préfixe VITE_ par erreur.',
    lessonsLearned: 'Script de vérification pre-build ajouté. Règle ESLint : interdiction VITE_ pour les secrets. Audit automatique post-deploy.',
  },
  {
    id: 'inc-003', severity: 'medium', type: 'phishing',
    title: 'Tentative de phishing ciblée — Email usurpant KHEPRA',
    description: '3 clients ont signalé un email de phishing utilisant la marque KHEPRA EXPERTS. Lien vers faux portail de paiement. Aucun compte compromis.',
    detectedAt: '2026-06-05T09:00:00Z', resolvedAt: '2026-06-05T18:00:00Z',
    timeToDetect: '45 min', timeToResolve: '9h',
    status: 'resolved',
    rootCause: 'Domaine usurpé (khepra-experts.co, faux). DMARC/DKIM/SPF correctement configurés — les vrais emails KHEPRA n\'étaient pas affectés.',
    lessonsLearned: 'Alerte clients + mise en place page sécurité sur le site. Surveillance domaines similaires (typosquatting). Signalement ARTCI/ANPDP.',
  },
  {
    id: 'inc-004', severity: 'low', type: 'insider_threat',
    title: 'Accès inhabituel — Consultation données hors périmètre',
    description: 'Un compte administrateur a consulté des données de leads hors de son périmètre géographique. Investigation : erreur de navigation légitime, pas d\'intention malveillante.',
    detectedAt: '2026-05-28T11:15:00Z', resolvedAt: '2026-05-28T12:00:00Z',
    timeToDetect: '10 min', timeToResolve: '45 min',
    status: 'resolved',
    rootCause: 'Interface mal conçue — l\'utilisateur a cliqué sur un lien cross-région par erreur. Aucune donnée exfiltrée.',
    lessonsLearned: 'Renforcement RBAC avec scope géographique. Confirmation explicite pour accès cross-région. Formation sécurité trimestrielle obligatoire.',
  },
  {
    id: 'inc-005', severity: 'high', type: 'intrusion',
    title: 'Tentative d\'intrusion — Brute force admin auth',
    description: '5 200 tentatives de connexion échouées sur admin-auth en 30 minutes. Origine : 47 IPs différentes (réseau Tor).',
    detectedAt: '2026-03-22T02:15:00Z', resolvedAt: '2026-03-22T02:45:00Z',
    timeToDetect: '8 min', timeToResolve: '22 min',
    status: 'resolved',
    rootCause: 'Attaque brute force automatisée ciblant le formulaire d\'authentification administrateur KOS.',
    lessonsLearned: 'Rate limiting strict (5 tentatives/15 min). MFA obligatoire pour tous les comptes admin. IP Tor bloquées automatiquement au niveau WAF.',
  },
  {
    id: 'inc-006', severity: 'medium', type: 'misconfiguration',
    title: 'Certificat TLS — Renouvellement automatique échoué',
    description: 'Le renouvellement automatique Let\'s Encrypt a échoué sur le domaine kos.khepraexperts.com, causant une erreur de certificat pendant 12 minutes.',
    detectedAt: '2026-06-10T00:05:00Z', resolvedAt: '2026-06-10T00:17:00Z',
    timeToDetect: '3 min', timeToResolve: '12 min',
    status: 'resolved',
    rootCause: 'Challenge DNS Let\'s Encrypt échoué (timeout propagation DNS). Netlify a automatiquement retenté et résolu.',
    lessonsLearned: 'Monitoring certificat ajouté à kos-site-health-check. Alerte proactive 7 jours avant expiration.',
  },
  {
    id: 'inc-007', severity: 'low', type: 'data_leak',
    title: 'Fuite mineure — Emails visibles dans réponse API',
    description: 'L\'endpoint kos-lead-scoring renvoyait les emails des leads dans certaines réponses d\'erreur. 0 exploitation détectée.',
    detectedAt: '2026-06-18T16:00:00Z', resolvedAt: '2026-06-18T16:45:00Z',
    timeToDetect: '— (détection proactive via audit)', timeToResolve: '45 min',
    status: 'resolved',
    rootCause: 'Message d\'erreur trop verbeux dans l\'Edge Function — incluait le payload complet.',
    lessonsLearned: 'Règle : jamais logger/exposer le payload complet en erreur. Audit automatique des réponses API en pré-production.',
  },
  {
    id: 'inc-008', severity: 'medium', type: 'malware',
    title: 'Alerte malware — Fichier suspect uploadé dans admin-documents',
    description: 'Un fichier PDF uploadé via admin-documents contenait un script JavaScript caché. Détection automatique antivirus. Fichier mis en quarantaine.',
    detectedAt: '2026-05-05T10:20:00Z', resolvedAt: '2026-05-05T10:25:00Z',
    timeToDetect: '1 min', timeToResolve: '5 min',
    status: 'resolved',
    rootCause: 'Tentative d\'upload de PDF malveillant via formulaire documents. Scan automatique déclenché.',
    lessonsLearned: 'Scan antivirus automatique maintenu et renforcé. Liste blanche extensions + vérification magic bytes.',
  },
];

// ============================================================
// PILIER 5 : CERTIFICATIONS & CONFORMITÉ
// ============================================================

export const SECURITY_CERTIFICATIONS: SecurityCertification[] = [
  {
    id: 'cert-001', name: 'ISO 27001:2022 — SMSI', standard: 'ISO/IEC 27001:2022',
    scope: 'Système de Management de la Sécurité de l\'Information KOS — Plateforme SaaS, Edge Functions, APIs, Données Clients',
    status: 'in_progress', certificationBody: 'Bureau Veritas (envisagé)',
    validUntil: '—', progress: 78, evidenceCount: 24, outstandingFindings: 3,
  },
  {
    id: 'cert-002', name: 'SOC 2 Type II', standard: 'AICPA TSC 2017',
    scope: 'Trust Services Criteria : Security, Availability, Confidentiality — Plateforme KOS et infrastructure associée',
    status: 'planned', certificationBody: 'Deloitte / EY (envisagé)',
    validUntil: '—', progress: 45, evidenceCount: 12, outstandingFindings: 7,
  },
  {
    id: 'cert-003', name: 'ISO 22301 — Continuité d\'Activité', standard: 'ISO 22301:2019',
    scope: 'Système de Management de la Continuité d\'Activité — Résilience des services critiques KOS',
    status: 'planned', certificationBody: 'Bureau Veritas (envisagé)',
    validUntil: '—', progress: 35, evidenceCount: 8, outstandingFindings: 5,
  },
  {
    id: 'cert-004', name: 'Conformité RGPD + Lois Africaines', standard: 'RGPD EU 2016/679 + CDP Sénégal + APDP Bénin + ARTCI CI',
    scope: 'Protection des données personnelles — 12 juridictions UEMOA/CEMAC',
    status: 'in_progress', certificationBody: 'Auto-évaluation + Audit externe (envisagé)',
    validUntil: '—', progress: 68, evidenceCount: 18, outstandingFindings: 4,
  },
  {
    id: 'cert-005', name: 'OWASP ASVS Niveau 2', standard: 'OWASP Application Security Verification Standard 4.0.3',
    scope: 'Sécurité applicative — Tous les endpoints KOS, Edge Functions, Frontend React',
    status: 'in_progress', certificationBody: 'Auto-évaluation + Penetration Test externe',
    validUntil: '—', progress: 62, evidenceCount: 15, outstandingFindings: 8,
  },
  {
    id: 'cert-006', name: 'Certification Régulateur — APDP Bénin', standard: 'Loi 2017-20 Bénin + Décret 2018-303',
    scope: 'Traitement de données personnelles — Autorisation APDP pour traitements KOS',
    status: 'planned', certificationBody: 'Autorité de Protection des Données Personnelles (APDP)',
    validUntil: '—', progress: 25, evidenceCount: 5, outstandingFindings: 9,
  },
];

// ============================================================
// STATISTIQUES GLOBALES
// ============================================================

export const SECURITY_RESILIENCE_STATS: SecurityResilienceStats = {
  iso27001Controls: ISO27001_CONTROLS.length,
  iso27001Compliant: ISO27001_CONTROLS.filter(c => c.status === 'compliant').length,
  owaspVulnerabilities: OWASP_VULNERABILITIES.length,
  owaspFixed: OWASP_VULNERABILITIES.filter(v => v.remediationStatus === 'fixed').length,
  soc2Controls: SOC2_CONTROLS.length,
  soc2Effective: SOC2_CONTROLS.filter(c => c.status === 'effective').length,
  incidentsTotal: SECURITY_INCIDENTS.length,
  incidentsResolved: SECURITY_INCIDENTS.filter(i => i.status === 'resolved').length,
  certifications: SECURITY_CERTIFICATIONS.length,
  certificationsActive: SECURITY_CERTIFICATIONS.filter(c => c.status === 'certified').length,
  mttd: '10 minutes',
  mttr: '42 minutes',
  securityScore: 'BIG FOUR GRADE: 87/100 — Niveau "Advanced" (ISO 27001 Ready à 78%, OWASP couvert à 92%, SOC 2 préparé à 45%)',
};

// ============================================================
// LOGS LIVE INITIAUX
// ============================================================

export interface SecurityResilienceLog {
  id: string;
  timestamp: string;
  domain: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  detail: string;
  edgeFunction?: string;
}

export const INITIAL_SECURITY_LOGS: SecurityResilienceLog[] = [
  {
    id: 'sec-001', timestamp: '2026-06-27T11:00:00Z', domain: 'ISO 27001',
    action: 'Audit journalier automatique — Annexe A',
    status: 'success',
    detail: '26/26 contrôles vérifiés. 22 compliant, 2 partiellement, 2 non applicable, 0 non compliants. Score global: 91%.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'sec-002', timestamp: '2026-06-27T10:45:00Z', domain: 'OWASP',
    action: 'Scan hebdomadaire OWASP Top 10',
    status: 'success',
    detail: 'Scan terminé: 0 nouvelles vulnérabilités critiques. 3 vuln. en cours de remédiation (npm audit, upload integrity, logging). Score A (92/100).',
    edgeFunction: 'kos-security-scan',
  },
  {
    id: 'sec-003', timestamp: '2026-06-27T10:30:00Z', domain: 'SOC 2',
    action: 'Contrôle continu CC6.1 — Accès logique',
    status: 'success',
    detail: 'Vérification RBAC: 0 accès non autorisés, 0 élévation de privilèges. MFA actif sur 100% comptes admin. Logs intègres.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'sec-004', timestamp: '2026-06-27T10:15:00Z', domain: 'SecurityOps',
    action: 'Monitoring — Health Check',
    status: 'success',
    detail: 'Uptime 99.97% (30 jours). Tous les services critiques OK. Latence Edge Functions: 312ms avg. Aucune alerte en cours.',
    edgeFunction: 'kos-site-health-check',
  },
  {
    id: 'sec-005', timestamp: '2026-06-27T10:00:00Z', domain: 'Certifications',
    action: 'ISO 27001 — Gap Analysis automatique',
    status: 'warning',
    detail: 'Gap Analysis: 78% conformité. 3 findings restants (A.14.2.5, A.18.2.2, SOC 2 préparation). Plan de remédiation: 45 jours.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'sec-006', timestamp: '2026-06-27T09:45:00Z', domain: 'OWASP',
    action: 'WAF — Mise à jour règles',
    status: 'success',
    detail: '3 nouvelles règles WAF déployées: XSS filter renforcé, SQLi detection améliorée, DDoS threshold ajusté. 0 false positive en 24h.',
    edgeFunction: 'kos-waf',
  },
  {
    id: 'sec-007', timestamp: '2026-06-27T09:30:00Z', domain: 'SecurityOps',
    action: 'Backup automatique — Vérification',
    status: 'success',
    detail: 'Backup Supabase OK (2.1 GB). RPO: 1h atteint. Test de restauration: 0 erreur. Réplication off-site confirmée.',
    edgeFunction: 'kos-backup-automation',
  },
  {
    id: 'sec-008', timestamp: '2026-06-27T09:00:00Z', domain: 'ISO 27001',
    action: 'Rotation clés cryptographiques',
    status: 'success',
    detail: 'Rotation trimestrielle: 8 clés Supabase Vault renouvelées. 0 interruption de service. Audit trail complet généré.',
    edgeFunction: 'kos-platform-credentials',
  },
];





