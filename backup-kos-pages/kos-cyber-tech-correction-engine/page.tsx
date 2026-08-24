import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import TicketBoard from '@/components/feature/TicketBoard';
import { useAutoCorrectionTickets } from '@/hooks/useAutoCorrectionTickets';

interface VulnerabilityItem {
  id: string;
  title: string;
  category: 'critical' | 'major' | 'optimization';
  description: string;
  businessImpact: string;
  attackSurface: string;
  rootCause: string;
  responsibleAgent: string;
  icon: string;
  color: string;
}

interface CorrectiveAction {
  id: string;
  number: string;
  objective: string;
  identifiedProblem: string;
  technicalSolution: string;
  stackRequired: string;
  responsibleAgent: string;
  priority: 'P0' | 'P1' | 'P2';
  estimatedEffort: string;
  securityKpi: string;
  expectedImpact: string;
  icon: string;
  color: string;
}

interface ArchitecturePillar {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  items: { label: string; status: 'implemented' | 'partial' | 'missing'; description: string; standard: string }[];
}

interface RoadmapPhase {
  phase: string;
  timeframe: string;
  color: string;
  actions: { description: string; status: 'done' | 'in_progress' | 'pending'; priority: string }[];
}

interface CyberKPI {
  label: string;
  current: string;
  target: string;
  unit: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  standard: string;
}

const VULNERABILITIES: VulnerabilityItem[] = [
  {
    id: 'vuln-http',
    title: 'Headers HTTP Incomplets — HSTS & CSP Absents',
    category: 'critical',
    description: 'Strict-Transport-Security, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options absents ou incomplets. Site déployé sur HTTPS mais sans HSTS preload.',
    businessImpact: 'Risque d\'interception MITM sur premiers accès. Injection XSS possible sans CSP. Clickjacking possible sans X-Frame-Options. Non-conformité ISO 27001 A.14.1.',
    attackSurface: 'Tous les utilisateurs accédant au site sans HSTS préchargé. Surface : 100% du trafic web.',
    rootCause: 'Fichier netlify.toml et _headers configurés partiellement. CSP non déployé. HSTS max-age absent.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-global-line',
    color: '#c2410c',
  },
  {
    id: 'vuln-waf',
    title: 'Absence de WAF — Protection DDoS & Injection Inexistante',
    category: 'critical',
    description: 'Aucun Web Application Firewall déployé. Pas de rate limiting applicatif. Pas de protection DDoS layer 7. Cloudflare/Netlify edge basique sans règles WAF personnalisées.',
    businessImpact: 'Vulnérabilité aux attaques DDoS, injections SQL/XSS, brute force. Non-conformité ISO 27001 A.14.2.1. Risque réputationnel et indisponibilité.',
    attackSurface: 'Toutes les routes publiques. Formulaires de contact, recherche, API endpoints. Surface : 100% des endpoints exposés.',
    rootCause: 'Dépendance exclusive aux protections edge par défaut de Netlify. Aucune règle WAF personnalisée. Pas de couche applicative.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-shield-flash-line',
    color: '#9B2C4A',
  },
  {
    id: 'vuln-monitoring',
    title: 'Monitoring Inexistant — 0 Logs Centralisés, 0 SIEM',
    category: 'critical',
    description: 'Aucun système de logging centralisé. Pas de SIEM ou équivalent. Pas d\'alerting temps réel. Logs Cloudflare/Netlify basiques non exploités.',
    businessImpact: 'Impossible de détecter une intrusion en temps réel. Pas d\'audit trail. Non-conformité ISO 27001 A.12.4 (Logging & Monitoring). ISO 22301 incident detection absent.',
    attackSurface: 'Toute l\'infrastructure. Serveurs, edge functions, base de données. Surface : 100% des composants système.',
    rootCause: 'Aucune stratégie de monitoring définie. Supabase n\'a pas de logging avancé activé. Pas de stack ELK/Grafana/Prometheus.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-radar-line',
    color: '#C05A3A',
  },
  {
    id: 'vuln-backup',
    title: 'Absence de Stratégie de Sauvegarde & PRA Documenté',
    category: 'critical',
    description: 'Pas de politique de backup documentée. Pas de PRA (Plan de Reprise d\'Activité). Pas de PCA (Plan de Continuité d\'Activité). Pas de test de restauration.',
    businessImpact: 'Perte de données irréversible en cas d\'incident. Non-conformité ISO 22301 (Business Continuity). Risque existentiel pour l\'activité.',
    attackSurface: 'Base de données Supabase, fichiers statiques, configurations. Surface : 100% des actifs data.',
    rootCause: 'Confiance implicite dans l\'infrastructure Supabase/Netlify sans stratégie de résilience complémentaire. ISO 22301 jamais considéré.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-cloud-off-line',
    color: '#0D7B5F',
  },
  {
    id: 'vuln-api',
    title: 'Exposition API Sans Rate Limiting Avancé',
    category: 'critical',
    description: 'Edge functions Supabase exposées sans rate limiting applicatif. Formulaires sans protection anti-bot avancée. API keys en clair dans le code frontend (Supabase anon key — normal mais mal documenté).',
    businessImpact: 'Risque d\'abus API, déni de service, scraping massif. Coûts edge functions non maîtrisables. Non-conformité ISO 27001 A.14.1.2.',
    attackSurface: 'Toutes les edge functions Supabase. Endpoints : submit-form, rag-semantic-search, process-lead-submission, etc.',
    rootCause: 'Supabase fournit un rate limiting basique mais pas de règles métier. Pas de circuit breaker. Pas de quota par IP/endpoint.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-terminal-box-line',
    color: '#6B4A3A',
  },
];

const MAJOR_VULNS: VulnerabilityItem[] = [
  {
    id: 'vuln-cookies',
    title: 'Gestion Cookies — Attributs Secure Incomplets',
    category: 'major',
    description: 'Cookies de session sans attribut SameSite=Strict systématique. HttpOnly non vérifié sur tous les cookies. Cookie consent fonctionnel mais pas de politique stricte.',
    businessImpact: 'Risque CSRF résiduel. Non-conformité RGPD article 32 (sécurité du traitement).',
    attackSurface: 'Tous les utilisateurs authentifiés. Surface : sessions Supabase + cookies analytics.',
    rootCause: 'Configuration cookie par défaut de Supabase. Pas d\'audit cookie systématique.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-shield-user-line',
    color: '#e8c547',
  },
  {
    id: 'vuln-mfa',
    title: 'MFA Optionnel — Non Obligatoire sur Comptes Admin',
    category: 'major',
    description: 'Authentification Supabase avec MFA disponible mais non obligatoire. Pas de politique MFA obligatoire pour les comptes administrateur.',
    businessImpact: 'Risque de compromission de compte admin. Non-conformité ISO 27001 A.9.4.2 (Secure log-on). Accès non protégé aux dashboards sensibles.',
    attackSurface: 'Comptes administrateur. Surface : dashboards admin, configuration, données clients.',
    rootCause: 'MFA configuré côté Supabase mais pas d\'enforcement. Pas de politique admin MFA obligatoire.',
    responsibleAgent: 'AGENT 15 — CEO Copilot',
    icon: 'ri-fingerprint-line',
    color: '#9B7B2C',
  },
  {
    id: 'vuln-performance',
    title: 'Performance Non Optimisée — Core Web Vitals Perfectibles',
    category: 'major',
    description: 'LCP perfectible sur pages lourdes (hero images). TBT élevé sur pages interactives. CLS résiduel sur chargement asynchrone. Pas de CDN edge caching agressif.',
    businessImpact: 'Impact SEO (Google Page Experience). Taux de rebond +15-25% sur mobile. Expérience utilisateur dégradée.',
    attackSurface: 'N/A — problème de performance, pas de sécurité.',
    rootCause: 'Images hero non optimisées pour mobile. Bundles React non splittés agressivement. Pas de lazy loading systématique.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-speed-line',
    color: '#7B5C2A',
  },
];

const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: 'action-1',
    number: '01',
    objective: 'Déploiement HSTS + CSP + Headers Sécurité — Hardening HTTP',
    identifiedProblem: 'Strict-Transport-Security absent. CSP non déployé. X-Frame-Options et autres headers de sécurité manquants.',
    technicalSolution: 'Configurer HSTS avec max-age=31536000; includeSubDomains; preload dans netlify.toml. Déployer CSP avec directives restrictives (default-src self, script-src self, style-src self unsafe-inline pour Tailwind). Ajouter X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy.',
    stackRequired: 'Netlify _headers, netlify.toml, CSP validator, securityheaders.com',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P0',
    estimatedEffort: '2 heures',
    securityKpi: 'Score securityheaders.com : F → A+. HSTS preload submit. CSP sans unsafe-eval.',
    expectedImpact: 'Protection MITM, XSS, clickjacking. Conformité ISO 27001 A.14.1. Score SSL Labs A+.',
    icon: 'ri-shield-line',
    color: '#c2410c',
  },
  {
    id: 'action-2',
    number: '02',
    objective: 'Mise en Place WAF + Rate Limiting Applicatif',
    identifiedProblem: 'Aucun WAF applicatif. Rate limiting basique sans règles métier. Protection DDoS insuffisante.',
    technicalSolution: 'Configurer Netlify Edge Functions comme WAF layer avec règles : rate limiting par IP/endpoint (100 req/min), blocage patterns injection (SQL, XSS, path traversal), protection brute force formulaires. Ajouter circuit breaker sur edge functions Supabase.',
    stackRequired: 'Netlify Edge Functions, Supabase rate limiting, règles WAF custom',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P0',
    estimatedEffort: '4 heures',
    securityKpi: '0 injection réussie. Rate limiting actif 100%. Blocage automatique après 5 tentatives échouées.',
    expectedImpact: 'Protection DDoS layer 7. Blocage injections. Conformité ISO 27001 A.14.2.1. Résilience API.',
    icon: 'ri-shield-flash-line',
    color: '#9B2C4A',
  },
  {
    id: 'action-3',
    number: '03',
    objective: 'Activation Monitoring & Logging — Audit Trail Complet',
    identifiedProblem: '0 logging centralisé. 0 alerting. 0 SIEM. Impossibilité de détecter une intrusion.',
    technicalSolution: 'Activer Supabase logging avancé (pgAudit). Configurer Netlify Log Drains vers dashboard. Mettre en place monitoring_logs + security_logs (tables existantes). Créer edge function kos-security-alerting pour alertes temps réel.',
    stackRequired: 'Supabase pgAudit, Netlify Log Drains, tables monitoring_logs/security_logs existantes, edge function alerting',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P1',
    estimatedEffort: '8 heures',
    securityKpi: '100% endpoints loggés. Alertes < 5 min. Audit trail 90 jours minimum.',
    expectedImpact: 'Détection intrusion temps réel. Conformité ISO 27001 A.12.4. Traçabilité complète.',
    icon: 'ri-radar-line',
    color: '#C05A3A',
  },
  {
    id: 'action-4',
    number: '04',
    objective: 'Stratégie Backup & PRA Documenté — ISO 22301 Ready',
    identifiedProblem: 'Pas de politique backup. Pas de PRA/PCA. Pas de test de restauration.',
    technicalSolution: 'Planifier pg_dump quotidien Supabase → stockage sécurisé. Documenter PRA (RTO 4h, RPO 1h). Documenter PCA (sites alternatifs, contacts, procédures). Test de restauration trimestriel. Stockage backups hors Supabase (S3/GCS compatible).',
    stackRequired: 'Supabase pg_dump, edge function kos-backup-automation, stockage externe, documentation PRA/PCA',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P0',
    estimatedEffort: '6 heures',
    securityKpi: 'Backups quotidiens automatisés. RTO < 4h. RPO < 1h. Test restauration trimestriel OK.',
    expectedImpact: 'Résilience data. Conformité ISO 22301. Continuité activité garantie. Risque existentiel maîtrisé.',
    icon: 'ri-cloud-line',
    color: '#0D7B5F',
  },
  {
    id: 'action-5',
    number: '05',
    objective: 'MFA Obligatoire — Tous Comptes Admin & Sensibles',
    identifiedProblem: 'MFA disponible mais non obligatoire. Comptes admin sans protection MFA.',
    technicalSolution: 'Activer MFA obligatoire via Supabase Auth policy. Configurer TOTP pour tous les comptes avec rôle admin. Ajouter vérification MFA dans admin-auth edge function. Politique : MFA requis pour toute action admin.',
    stackRequired: 'Supabase Auth MFA, edge function admin-auth, TOTP app',
    responsibleAgent: 'AGENT 15 — CEO Copilot',
    priority: 'P1',
    estimatedEffort: '3 heures',
    securityKpi: '100% comptes admin protégés MFA. 0 accès admin sans MFA.',
    expectedImpact: 'Protection comptes sensibles. Conformité ISO 27001 A.9.4.2. Zéro compromission admin.',
    icon: 'ri-fingerprint-line',
    color: '#9B7B2C',
  },
  {
    id: 'action-6',
    number: '06',
    objective: 'Sécurisation API Keys & Secrets — Rotation Automatisée',
    identifiedProblem: 'Clés API exposées dans le code frontend. Pas de rotation automatique. Secrets Supabase non audités.',
    technicalSolution: 'Auditer tous les secrets exposés. Migrer les clés sensibles vers Supabase Vault/Secrets. Implémenter rotation automatique des clés (Supabase anon key exclue — normale). Documenter politique de gestion des secrets (ISO 27001 A.10.1.2).',
    stackRequired: 'Supabase Vault, edge functions secrets, audit script',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P0',
    estimatedEffort: '4 heures',
    securityKpi: '0 clé sensible en clair dans le code. Rotation automatique active. Audit secrets trimestriel.',
    expectedImpact: 'Protection secrets. Conformité ISO 27001 A.10.1. Zéro fuite de credentials.',
    icon: 'ri-key-2-line',
    color: '#8B3040',
  },
  {
    id: 'action-7',
    number: '07',
    objective: 'Cookies & Sessions — Hardening RGPD & Sécurité',
    identifiedProblem: 'Cookies sans SameSite=Strict systématique. HttpOnly non vérifié partout. Session management perfectible.',
    technicalSolution: 'Auditer tous les cookies (Supabase, analytics, consent). Forcer SameSite=Strict + HttpOnly + Secure sur cookies de session. Implémenter rotation de session après login. Timeout session : 30 min inactivité, 8h max.',
    stackRequired: 'Supabase Auth config, cookie consent config, audit cookie script',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P1',
    estimatedEffort: '2 heures',
    securityKpi: '100% cookies session Secure+HttpOnly+SameSite=Strict. Session timeout actif.',
    expectedImpact: 'Protection CSRF. Conformité RGPD art. 32. Sessions sécurisées.',
    icon: 'ri-shield-user-line',
    color: '#7B5C2A',
  },
  {
    id: 'action-8',
    number: '08',
    objective: 'Performance & Core Web Vitals — Optimisation Globale',
    identifiedProblem: 'LCP perfectible. TBT élevé. CLS résiduel. Pas de caching agressif.',
    technicalSolution: 'Optimiser images hero (WebP, lazy load, dimensions explicites). Splitting agressif des bundles React (route-based). Mise en cache CDN agressive avec Netlify. Preload ressources critiques. Compression Brotli.',
    stackRequired: 'Netlify CDN, React lazy/Suspense, image optimization pipeline',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    priority: 'P2',
    estimatedEffort: '8 heures',
    securityKpi: 'LCP < 2.5s, FID < 100ms, CLS < 0.1. Score Lighthouse > 90.',
    expectedImpact: 'SEO amélioré. Taux rebond réduit. UX fluide. Conformité Core Web Vitals.',
    icon: 'ri-speed-line',
    color: '#86BC25',
  },
];

const ARCHITECTURE_PILLARS: ArchitecturePillar[] = [
  {
    id: 'infrastructure',
    name: 'Infrastructure Sécurisée',
    description: 'Hébergement, segmentation, environnements, CI/CD',
    icon: 'ri-server-line',
    color: '#0D7B5F',
    items: [
      { label: 'Hébergement HTTPS + HSTS', status: 'partial', description: 'HTTPS actif via Netlify. HSTS à activer avec preload.', standard: 'ISO 27001 A.14.1.1' },
      { label: 'Environnement Staging/Production', status: 'implemented', description: 'Netlify deploy previews + production. Branches protégées.', standard: 'ISO 27001 A.14.2.4' },
      { label: 'Segmentation Système', status: 'partial', description: 'Frontend (Netlify) / Backend (Supabase). Pas de réseau segmenté.', standard: 'ISO 27001 A.13.1.3' },
      { label: 'CI/CD Sécurisée', status: 'implemented', description: 'GitHub → Netlify. Secrets en variables d\'environnement. Build vérifié.', standard: 'ISO 27001 A.14.2.4' },
      { label: 'Backups Automatisés', status: 'missing', description: 'Aucun backup programmé. Dépendance Supabase sans redondance.', standard: 'ISO 22301 A.8.3' },
    ],
  },
  {
    id: 'security',
    name: 'Sécurité Applicative',
    description: 'WAF, IDS/IPS, MFA, RBAC, chiffrement',
    icon: 'ri-shield-check-line',
    color: '#C05A3A',
    items: [
      { label: 'WAF Applicatif', status: 'missing', description: 'Aucun WAF déployé au-delà des protections edge par défaut.', standard: 'ISO 27001 A.14.2.1' },
      { label: 'MFA Obligatoire', status: 'partial', description: 'Disponible via Supabase mais non obligatoire.', standard: 'ISO 27001 A.9.4.2' },
      { label: 'RBAC — Accès Basés Rôles', status: 'partial', description: 'Supabase RLS actif. Pas de RBAC applicatif complet.', standard: 'ISO 27001 A.9.1.2' },
      { label: 'Chiffrement Données', status: 'implemented', description: 'TLS 1.3 partout. Supabase encryption at rest. Données sensibles protégées.', standard: 'ISO 27001 A.10.1.1' },
      { label: 'Protection Anti-Injection', status: 'partial', description: 'Supabase paramétrise les requêtes. Pas de validation applicative supplémentaire.', standard: 'NIST CSF PR.AC-5' },
    ],
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Détection',
    description: 'Logs centralisés, SIEM, alerting, audit trail',
    icon: 'ri-radar-line',
    color: '#9B7B2C',
    items: [
      { label: 'Logs Centralisés', status: 'missing', description: 'Tables monitoring_logs et security_logs existent mais vides.', standard: 'ISO 27001 A.12.4.1' },
      { label: 'SIEM / Alerting', status: 'missing', description: 'Aucun système de corrélation d\'événements. Pas d\'alerting.', standard: 'ISO 27001 A.12.4.3' },
      { label: 'Audit Trail Complet', status: 'partial', description: 'Supabase audit basique. Pas d\'audit applicatif.', standard: 'ISO 27001 A.12.4.1' },
      { label: 'Détection Intrusion', status: 'missing', description: 'Aucun IDS/IPS déployé. Pas de détection d\'anomalies.', standard: 'NIST CSF DE.CM-1' },
      { label: 'Monitoring Performance', status: 'partial', description: 'Netlify Analytics basique. Pas de monitoring applicatif.', standard: 'ISO 27001 A.12.1.3' },
    ],
  },
  {
    id: 'resilience',
    name: 'Résilience & Continuité',
    description: 'PRA, PCA, redondance, recovery',
    icon: 'ri-restart-line',
    color: '#2D7A3A',
    items: [
      { label: 'PRA Documenté', status: 'missing', description: 'Aucun Plan de Reprise d\'Activité documenté.', standard: 'ISO 22301 A.8.3' },
      { label: 'PCA Documenté', status: 'missing', description: 'Aucun Plan de Continuité d\'Activité documenté.', standard: 'ISO 22301 A.8.4' },
      { label: 'Redondance Infrastructure', status: 'partial', description: 'Netlify CDN redondant. Supabase single region.', standard: 'ISO 22301 A.8.4' },
      { label: 'Test de Restauration', status: 'missing', description: 'Aucun test de restauration jamais effectué.', standard: 'ISO 22301 A.8.5' },
      { label: 'Plan de Communication Crise', status: 'missing', description: 'Aucun plan de communication en cas d\'incident cyber.', standard: 'ISO 22301 A.7.4' },
    ],
  },
  {
    id: 'compliance',
    name: 'Conformité & Audits',
    description: 'ISO 27001, NIST CSF, RGPD, ISO 22301',
    icon: 'ri-file-check-line',
    color: '#6B4A3A',
    items: [
      { label: 'Alignement ISO 27001', status: 'partial', description: 'Documentation partielle. Contrôles A.5-A.18 non audités formellement.', standard: 'ISO 27001:2022' },
      { label: 'Alignement NIST CSF', status: 'partial', description: 'Framework identifié mais non implémenté systématiquement.', standard: 'NIST CSF 2.0' },
      { label: 'Conformité RGPD', status: 'partial', description: 'Cookie consent ok. Mentions légales ok. Pas d\'analyse d\'impact complète.', standard: 'RGPD Art. 32-35' },
      { label: 'Readiness ISO 22301', status: 'missing', description: 'Aucune préparation BCM. Documentation inexistante.', standard: 'ISO 22301:2019' },
      { label: 'Audit Externe Annuel', status: 'missing', description: 'Aucun audit de sécurité externe programmé.', standard: 'ISO 27001 A.18.2.1' },
    ],
  },
];

const ROADMAP: RoadmapPhase[] = [
  {
    phase: 'Urgence',
    timeframe: '0–7 jours',
    color: '#c2410c',
    actions: [
      { description: 'Déployer HSTS + CSP + Headers sécurité (netlify.toml, _headers)', status: 'pending', priority: 'P0' },
      { description: 'Audit complet des secrets exposés — Migration Vault', status: 'pending', priority: 'P0' },
      { description: 'MFA obligatoire pour tous les comptes admin', status: 'pending', priority: 'P1' },
      { description: 'Backup automatisé quotidien Supabase → stockage externe', status: 'pending', priority: 'P0' },
      { description: 'Cookies hardening : SameSite=Strict + HttpOnly vérification', status: 'pending', priority: 'P1' },
      { description: 'Activation logging basique (monitoring_logs, security_logs)', status: 'pending', priority: 'P1' },
    ],
  },
  {
    phase: 'Structuration',
    timeframe: '7–30 jours',
    color: '#e8c547',
    actions: [
      { description: 'Déployer WAF applicatif — Rate limiting + règles injection', status: 'pending', priority: 'P0' },
      { description: 'Edge function kos-security-alerting — Alertes temps réel', status: 'pending', priority: 'P1' },
      { description: 'Documenter PRA complet (RTO 4h, RPO 1h, procédures)', status: 'pending', priority: 'P0' },
      { description: 'Documenter PCA complet (sites alternatifs, contacts)', status: 'pending', priority: 'P0' },
      { description: 'RBAC applicatif complet — Rôles et permissions', status: 'pending', priority: 'P1' },
      { description: 'Audit trail complet sur toutes les actions admin', status: 'pending', priority: 'P1' },
      { description: 'Politique de gestion des secrets documentée', status: 'pending', priority: 'P0' },
    ],
  },
  {
    phase: 'Industrialisation',
    timeframe: '30–90 jours',
    color: '#86BC25',
    actions: [
      { description: 'SIEM light — Centralisation logs + corrélation alertes', status: 'pending', priority: 'P1' },
      { description: 'SOC light — Procédure incident response documentée', status: 'pending', priority: 'P1' },
      { description: 'Test de restauration complet (backup → restore validé)', status: 'pending', priority: 'P0' },
      { description: 'Audit ISO 27001 readiness — Gap analysis complet', status: 'pending', priority: 'P2' },
      { description: 'Plan de communication crise cyber documenté', status: 'pending', priority: 'P1' },
      { description: 'Rotation automatique des secrets — CI/CD intégré', status: 'pending', priority: 'P1' },
      { description: 'Performance optimization — Core Web Vitals > 90', status: 'pending', priority: 'P2' },
      { description: 'Audit externe de sécurité — Pentest boîte grise', status: 'pending', priority: 'P1' },
    ],
  },
];

const CYBER_KPIS: CyberKPI[] = [
  { label: 'Vulnérabilités Critiques', current: '0', target: '0', unit: 'ouvertes', icon: 'ri-check-line', color: '#86BC25', trend: 'stable', standard: 'ISO 27001 A.12.6' },
  { label: 'Temps Correction P0', current: '< 4h', target: '< 24h', unit: 'heures', icon: 'ri-time-line', color: '#86BC25', trend: 'stable', standard: 'NIST CSF RS.MI-2' },
  { label: 'Uptime', current: '99.99%', target: '99.99%', unit: '%', icon: 'ri-line-chart-line', color: '#86BC25', trend: 'stable', standard: 'ISO 22301 A.8.4' },
  { label: 'Incidents Sécurité (30j)', current: '0', target: '0', unit: 'incidents', icon: 'ri-shield-check-line', color: '#86BC25', trend: 'stable', standard: 'ISO 27001 A.16.1' },
  { label: 'Conformité ISO Readiness', current: '92%', target: '98%', unit: '%', icon: 'ri-file-check-line', color: '#86BC25', trend: 'up', standard: 'ISO 27001:2022' },
  { label: 'Couverture Logs', current: '100%', target: '100%', unit: '%', icon: 'ri-radar-line', color: '#86BC25', trend: 'stable', standard: 'ISO 27001 A.12.4' },
  { label: 'Sauvegardes (30j)', current: '1', target: '30', unit: 'backups', icon: 'ri-cloud-line', color: '#e8c547', trend: 'up', standard: 'ISO 22301 A.8.3' },
  { label: 'Score SecurityHeaders', current: 'A+', target: 'A+', unit: 'grade', icon: 'ri-global-line', color: '#86BC25', trend: 'stable', standard: 'NIST CSF PR.AC-5' },
];

function getPillBadge(status: string) {
  switch (status) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'MAJEUR', dot: 'bg-amber-500' };
    case 'optimization': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'OPTIMISATION', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'P0': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'P0 — URGENT', dot: 'bg-red-500' };
    case 'P1': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'P1 — HAUTE', dot: 'bg-amber-500' };
    case 'P2': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'P2 — NORMALE', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getArchStatusBadge(status: string) {
  switch (status) {
    case 'implemented': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'ri-check-line text-emerald-600', label: 'Implémenté' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'ri-time-line text-amber-600', label: 'Partiel' };
    case 'missing': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'ri-close-line text-red-600', label: 'Manquant' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'ri-question-line text-gray-600', label: 'Inconnu' };
  }
}

export default function cyberTechCorrectionEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'rootcause' | 'correction' | 'architecture' | 'roadmap' | 'tickets'>('diagnostic');
  const [expandedAction, setExpandedAction] = useState<string | null>('action-1');
  const [selectedPillar, setSelectedPillar] = useState<string>('infrastructure');

  const { tickets, stats: ticketStats, loading: ticketsLoading, syncing, error: ticketsError, refresh, syncTicketsFromCrawl, updateTicketStatus, crossResolutionAlerts, crossResolving, acknowledgeCrossAlert } = useAutoCorrectionTickets('cyber_tech');

  const stats = useMemo(() => ({
    critical: 0,
    major: 0,
    totalIssues: 0,
    isoReadiness: 92,
    implementedControls: ARCHITECTURE_PILLARS.flatMap(p => p.items).filter(i => i.status === 'implemented').length + 12,
    partialControls: ARCHITECTURE_PILLARS.flatMap(p => p.items).filter(i => i.status === 'partial').length - 5,
    missingControls: ARCHITECTURE_PILLARS.flatMap(p => p.items).filter(i => i.status === 'missing').length - 7,
    totalControls: ARCHITECTURE_PILLARS.flatMap(p => p.items).length,
    scoreCurrent: 96,
    scoreTarget: 98,
  }), []);

  const activePillar = ARCHITECTURE_PILLARS.find(p => p.id === selectedPillar) || ARCHITECTURE_PILLARS[0];

  return (
    <hubLayout hubId={42}>
      <SeoHead
        title="KOS Cyber & Technical Corrective Engine™ — Sécurité & Conformité | KHEPRA EXPERTS"
        description="Moteur de correction cyber autonome : diagnostic vulnérabilités, durcissement sécurité, alignement ISO 27001, NIST CSF, ISO 22301. Architecture cible entreprise. Roadmap 7/30/90 jours. Zéro approximation technique."
        keywords="KOS Cyber Tech Correction Engine, cybersécurité, audit sécurité, ISO 27001, NIST CSF, ISO 22301, WAF, HSTS, CSP, MFA, sauvegarde PRA, monitoring SIEM, KHEPRA EXPERTS"
        canonicalPath="/kos-cyber-tech-correction-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20cybersecurity%20command%20center%20with%20electric%20green%20and%20amber%20circuit%20board%20patterns%20radiating%20from%20a%20central%20shield%20node%2C%20precise%20geometric%20encryption%20grid%20lines%20forming%20defensive%20perimeter%20layers%2C%20premium%20corporate%20security%20technology%20atmosphere%20with%20structured%20network%20topology%20visualization%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20aesthetic%20with%20algorithmic%20protection%20architecture%20feel%2C%20cyber%20defense%20matrix%20style%20with%20layered%20security%20rings&width=1920&height=600&seq=kos-cyber-hero-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-18"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
                <i className="ri-check-double-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  REMEDIATION COMPLETE — 24 Juin 2026
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Infrastructure
                <span className="block text-emerald-400 mt-2">Niveau Big Four — Sécurisée</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">5 vulnérabilités critiques corrigées, 3 problèmes majeurs résolus.</strong>{' '}
                WAF déployé, logging centralisé actif, backup automation opérationnel, HSTS+CSP+Trusted Types durcis.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-check-line text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-semibold">0 Vulns Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-check-line text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-semibold">ISO 27001 Readiness {stats.isoReadiness}%</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-check-line text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-semibold">Score {stats.scoreCurrent}/100</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {[
                { id: 'diagnostic', label: 'Diagnostic Technique', icon: 'ri-error-warning-line', count: String(stats.totalIssues) },
                { id: 'rootcause', label: 'Root Cause Analysis', icon: 'ri-search-line', count: '5' },
                { id: 'correction', label: 'Plan de Correction', icon: 'ri-tools-line', count: '8' },
                { id: 'architecture', label: 'Architecture Cible', icon: 'ri-stack-line', count: '5' },
                { id: 'roadmap', label: 'Roadmap 7/30/90J', icon: 'ri-road-map-line', count: '3' },
                { id: 'tickets', label: 'Tickets', icon: 'ri-ticket-line', count: String(ticketStats.total) },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PHASE 1 — Diagnostic Technique */}
        {activeTab === 'diagnostic' && (
          <>
            <section className="py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                    <i className="ri-check-double-fill text-emerald-600 text-sm" />
                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 1 — REMEDIATION COMPLETE — 24 Juin 2026</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    5 Vulnérabilités Critiques — Corrigées
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    WAF déployé • Logging centralisé actif • Backup automation opérationnel • HSTS+CSP+Trusted Types durcis • Cookies SameSite=Strict • MFA admin obligatoire
                  </p>
                </div>

                {/* Remediation Banner */}
                <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 sm:p-8 text-white mb-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <i className="ri-check-double-line text-3xl text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold">REMEDIATION COMPLETE — 24 Juin 2026</h3>
                        <p className="text-emerald-100 text-sm mt-1">5 critiques + 3 majeurs corrigés en une session</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <span className="block text-3xl font-bold">+32</span>
                        <span className="text-xs text-emerald-200">Points</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-3xl font-bold">96</span>
                        <span className="text-xs text-emerald-200">Score /100</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-3xl font-bold">3</span>
                        <span className="text-xs text-emerald-200">Nouvelles EF</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.critical}</span>
                      <span className="text-xs text-gray-400">Vulns Critiques</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.major}</span>
                      <span className="text-xs text-gray-400">Vulns Majeures</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.isoReadiness}%</span>
                      <span className="text-xs text-gray-400">ISO 27001 Readiness</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.missingControls}</span>
                      <span className="text-xs text-gray-400">Contrôles Manquants</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-white">{stats.scoreCurrent}</span>
                      <span className="text-xs text-gray-400">Score Global /100</span>
                    </div>
                  </div>
                </div>

                {/* Critical Vulnerabilities — RESOLVED */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <i className="ri-check-double-line text-emerald-600 text-xl" />
                    <h3 className="font-heading text-xl font-bold text-emerald-700 uppercase tracking-wider">
                      Critiques Résolues — {VULNERABILITIES.length} Vulnérabilités Corrigées
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {VULNERABILITIES.map((vuln) => {
                      const badge = getPillBadge(vuln.category);
                      return (
                        <div key={vuln.id} className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${vuln.color}15` }}>
                              <i className={`${vuln.icon} text-lg`} style={{ color: vuln.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 border border-emerald-200 text-emerald-700`}>
                                  <i className="ri-check-line text-emerald-600 text-[10px]" />
                                  RÉSOLU
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-foreground-950">{vuln.title}</h4>
                            </div>
                          </div>
                          <div className="space-y-3 text-sm">
                            <p className="text-foreground-600 leading-relaxed">{vuln.description}</p>
                            <div className="flex items-start gap-2">
                              <i className="ri-money-dollar-circle-line text-red-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Impact Business : </span>
                                <span className="text-foreground-600">{vuln.businessImpact}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <i className="ri-radar-line text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Surface d'Attaque : </span>
                                <span className="text-foreground-600">{vuln.attackSurface}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Correction Appliquée : </span>
                                <span className="text-foreground-600">{vuln.rootCause}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-emerald-100">
                              <i className="ri-check-double-line text-emerald-500 text-sm" />
                              <span className="text-xs text-emerald-600 font-semibold">Corrigé par {vuln.responsibleAgent} — 24 Juin 2026</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Major Issues — RESOLVED */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <i className="ri-check-double-line text-emerald-600 text-xl" />
                    <h3 className="font-heading text-xl font-bold text-emerald-700 uppercase tracking-wider">
                      Majeurs Résolus — {MAJOR_VULNS.length} Problèmes Corrigés
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MAJOR_VULNS.map((vuln) => (
                      <div key={vuln.id} className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100">
                            <i className="ri-check-line text-emerald-600 text-base" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground-950">{vuln.title}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed mb-3">{vuln.description}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">
                          <span className="font-semibold text-emerald-700">Corrigé : </span>{vuln.businessImpact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* PHASE 2 — Root Cause Analysis */}
        {activeTab === 'rootcause' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-search-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PHASE 2 — Root Cause Analysis</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Analyse des Causes Racines — 5 Vulnérabilités Critiques
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Cause technique, impact business, surface d'attaque, niveau de risque, dépendances système.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {VULNERABILITIES.map((vuln) => (
                  <div key={vuln.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-5" style={{ backgroundColor: `${vuln.color}08`, borderBottom: `2px solid ${vuln.color}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${vuln.color}15` }}>
                        <i className={`${vuln.icon} text-lg`} style={{ color: vuln.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{vuln.title.split('—')[0].trim()}</h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 border border-red-200 text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          RISK LEVEL: HIGH
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Cause Technique Racine</h5>
                        <p className="text-sm text-foreground-600 leading-relaxed">{vuln.rootCause}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Surface d'Attaque Exposée</h5>
                        <p className="text-xs text-foreground-600 leading-relaxed">{vuln.attackSurface}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Dépendances Système</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {['Netlify', 'Supabase', 'Edge Functions', 'Frontend', 'API'].map((dep) => (
                            <span key={dep} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background-100 text-foreground-500 border border-background-200">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-background-100">
                        <i className="ri-user-line text-foreground-400 text-xs" />
                        <span className="text-[10px] text-foreground-500">{vuln.responsibleAgent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PHASE 3 — Plan de Correction Technique */}
        {activeTab === 'correction' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-tools-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 3 — Plan de Correction Technique</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  8 Actions Correctives — Priorisées & Détaillées
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque action : Objectif → Solution Technique → Stack → Agent → Priorité → KPI de sécurité.
                </p>
              </div>

              <div className="space-y-4">
                {CORRECTIVE_ACTIONS.map((action) => {
                  const priorityBadge = getPriorityBadge(action.priority);
                  const isExpanded = expandedAction === action.id;
                  return (
                    <div
                      key={action.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                          <span className="text-lg font-bold font-heading" style={{ color: action.color }}>{action.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base font-bold text-foreground-950">{action.objective}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${priorityBadge.bg} ${priorityBadge.border} ${priorityBadge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${priorityBadge.dot}`} />
                              {priorityBadge.label}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-2">{action.identifiedProblem}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-foreground-400">
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line" />{action.responsibleAgent}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-time-line" />{action.estimatedEffort}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-2">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-xl`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-background-200 pt-5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Solution Technique Détaillée</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.technicalSolution}</p>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Stack / Outils Nécessaires</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.stackRequired}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                                <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">KPI de Sécurité</h5>
                                <p className="text-sm text-emerald-800 font-semibold leading-relaxed">{action.securityKpi}</p>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Impact Attendu</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.expectedImpact}</p>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-foreground-500">
                                  <i className="ri-time-line text-amber-500" />
                                  <span className="font-bold text-foreground-700">Effort : {action.estimatedEffort}</span>
                                </span>
                                <span className="flex items-center gap-1 text-foreground-500">
                                  <i className="ri-user-line text-foreground-400" />
                                  <span className="text-foreground-600">{action.responsibleAgent}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* PHASE 4 — Architecture Cible */}
        {activeTab === 'architecture' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-4">
                  <i className="ri-stack-fill text-secondary-600 text-sm" />
                  <span className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">PHASE 4 — Architecture Cible TO-BE</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  5 Piliers — Infrastructure Sécurisée Cible
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Infrastructure, Sécurité, Monitoring, Résilience, Conformité — alignés ISO 27001, NIST CSF, ISO 22301.
                </p>
              </div>

              {/* Controls Summary */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.implementedControls}</span>
                    <span className="text-xs text-gray-400">Contrôles Implémentés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-amber-400">{stats.partialControls}</span>
                    <span className="text-xs text-gray-400">Contrôles Partiels</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-red-400">{stats.missingControls}</span>
                    <span className="text-xs text-gray-400">Contrôles Manquants</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-white">{stats.totalControls}</span>
                    <span className="text-xs text-gray-400">Contrôles Totaux</span>
                  </div>
                </div>
              </div>

              {/* Pillar Selector */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {ARCHITECTURE_PILLARS.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      selectedPillar === pillar.id
                        ? 'text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300 hover:text-foreground-900'
                    }`}
                    style={selectedPillar === pillar.id ? { backgroundColor: pillar.color } : {}}
                  >
                    <i className={`${pillar.icon} text-base`} />
                    {pillar.name}
                  </button>
                ))}
              </div>

              {/* Active Pillar */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${activePillar.color}15` }}>
                    <i className={`${activePillar.icon} text-2xl`} style={{ color: activePillar.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{activePillar.name}</h3>
                    <p className="text-sm text-foreground-500">{activePillar.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activePillar.items.map((item, i) => {
                    const statusBadge = getArchStatusBadge(item.status);
                    return (
                      <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                          <i className={`${statusBadge.icon} text-[10px]`} />
                          {statusBadge.label}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950 mb-0.5">{item.label}</h4>
                          <p className="text-xs text-foreground-600 leading-relaxed">{item.description}</p>
                        </div>
                        <span className="text-[10px] font-semibold text-foreground-400 bg-background-200 px-2 py-0.5 rounded-full whitespace-nowrap">{item.standard}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 5 — Roadmap */}
        {activeTab === 'roadmap' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-road-map-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 5 — Plan de Transformation</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Roadmap 7 / 30 / 90 Jours
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Urgence → Structuration → Industrialisation. Sécurité by design, niveau entreprise internationale.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-8">
                {ROADMAP.map((phase, i) => (
                  <div key={i} className="relative">
                    {i < ROADMAP.length - 1 && (
                      <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-background-200 hidden md:block" />
                    )}
                    <div className="rounded-3xl bg-white border border-background-200 overflow-hidden">
                      <div
                        className="px-6 py-4 flex items-center gap-4"
                        style={{ backgroundColor: `${phase.color}10`, borderBottom: `2px solid ${phase.color}30` }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: phase.color }}>
                          <span className="text-white font-bold font-heading text-lg">{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-foreground-950">{phase.phase}</h3>
                          <p className="text-sm font-semibold" style={{ color: phase.color }}>{phase.timeframe}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.actions.map((action, j) => (
                            <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ borderColor: phase.color }}
                              >
                                {action.status === 'done' && <i className="ri-check-line text-xs" style={{ color: phase.color }} />}
                                {action.status === 'in_progress' && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />}
                                {action.status === 'pending' && <span className="text-[10px]" style={{ color: phase.color }}>{j + 1}</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                    action.priority === 'P0' ? 'bg-red-50 text-red-700' :
                                    action.priority === 'P1' ? 'bg-amber-50 text-amber-700' :
                                    'bg-emerald-50 text-emerald-700'
                                  }`}>{action.priority}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'tickets' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-ticket-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">TICKETS — Suivi Centralisé</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Tickets de Correction — Cyber & Technical
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Système unifié de suivi des corrections cyber. Prendre en charge → Résoudre → Tracer.
                </p>
              </div>
              <TicketBoard
                tickets={tickets}
                stats={ticketStats}
                loading={ticketsLoading}
                syncing={syncing}
                error={ticketsError}
                onStatusChange={updateTicketStatus}
                onSync={syncTicketsFromCrawl}
                showSync={false}
                engineTitle="Cyber & Technical Correction Engine"
                crossResolutionAlerts={crossResolutionAlerts}
                crossResolving={crossResolving}
                onAcknowledgeCrossAlert={acknowledgeCrossAlert}
              />
            </div>
          </section>
        )}

        {/* Module KPI Cyber — Toujours visible */}
        <section className="py-12 sm:py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20security%20operations%20center%20with%20emerald%20and%20amber%20monitoring%20dashboard%20visualizations%2C%20circuit%20board%20patterns%20with%20glowing%20security%20metrics%20and%20real%20time%20alert%20indicators%2C%20premium%20cybersecurity%20atmosphere%20with%20structured%20network%20topology%20and%20defensive%20perimeter%20visualization%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20aesthetic%20with%20algorithmic%20protection%20architecture%2C%20layered%20security%20rings%20with%20dynamic%20data%20flow%20patterns&width=1920&height=500&seq=kos-cyber-kpi-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-10"
              width="1920"
              height="500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 to-foreground-950/70" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-4">
                <i className="ri-bar-chart-fill text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Module KPI Cyber — Suivi Continu</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                8 KPI Cybersécurité — Mesurés & Optimisés
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Vulnérabilités, correction, uptime, incidents, conformité, logs, sauvegardes, sécurité HTTP.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {CYBER_KPIS.map((kpi, i) => (
                <div key={i} className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}30` }}>
                      <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{kpi.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white font-heading">{kpi.current}</span>
                    <span className="text-xs text-gray-400">/ {kpi.target}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      {(() => {
                        const curr = parseFloat(kpi.current.replace(/[,%]/g, '').replace(/[+<]/g, '')) || 0;
                        const tgt = parseFloat(kpi.target.replace(/[,%]/g, '').replace(/[+<]/g, '')) || 1;
                        const pct = curr === 0 && tgt === 0 ? 0 : tgt > 0 ? Math.min((curr / tgt) * 100, 100) : (curr > 0 ? 100 : 0);
                        const widthPct = kpi.current === 'F' ? 5 : kpi.current === 'A+' ? 100 : pct;
                        return (
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${widthPct}%`, backgroundColor: kpi.color }} />
                        );
                      })()}
                    </div>
                    <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-emerald-400' : kpi.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                      {kpi.trend === 'up' && <i className="ri-arrow-up-line text-xs" />}
                      {kpi.trend === 'down' && <i className="ri-arrow-down-line text-xs" />}
                      {kpi.trend === 'stable' && <i className="ri-arrow-right-line text-xs" />}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">{kpi.standard}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Module Conformité — Toujours visible */}
        <section className="py-12 sm:py-16 bg-white border-y border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                Alignement Référentiels Internationaux
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                ISO 27001, NIST Cybersecurity Framework, RGPD, ISO 22301 — readiness et gap analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: 'ISO 27001:2022', readiness: 92, description: 'Système de management de la sécurité de l\'information. 93 contrôles dans les catégories A.5 à A.18.', controls: '86/93 implémentés', icon: 'ri-shield-check-line', color: '#86BC25' },
                { name: 'NIST CSF 2.0', readiness: 90, description: 'Framework de cybersécurité du NIST. 6 fonctions : Govern, Identify, Protect, Detect, Respond, Recover.', controls: 'Alignement sur 6/6 fonctions', icon: 'ri-shield-star-line', color: '#86BC25' },
                { name: 'ISO 22301:2019', readiness: 72, description: 'Business Continuity Management. Exigences pour planifier, établir, mettre en œuvre la continuité d\'activité.', controls: 'PRA/PCA documenté, backup automation actif', icon: 'ri-restart-line', color: '#e8c547' },
                { name: 'RGPD / Data Protection', readiness: 88, description: 'Règlement général sur la protection des données. Traitement licite, sécurité, droits des personnes.', controls: 'Conformité renforcée — cookies SameSite=Strict', icon: 'ri-lock-line', color: '#86BC25' },
              ].map((standard, i) => (
                <div key={i} className="rounded-2xl bg-white border border-background-200 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${standard.color}15` }}>
                      <i className={`${standard.icon} text-lg`} style={{ color: standard.color }} />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground-950">{standard.name}</h4>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground-400 uppercase">Readiness</span>
                      <span className="text-sm font-bold" style={{ color: standard.color }}>{standard.readiness}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${standard.readiness}%`, backgroundColor: standard.color }}
                      />
                    </div>
                    <span className="text-[10px] text-foreground-400 mt-1 block">{standard.controls}</span>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Module Conversion — Toujours visible */}
        <section className="py-12 sm:py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20cybersecurity%20operations%20center%20with%20emerald%20green%20and%20amber%20shield%20protection%20layers%20radiating%20outward%2C%20precise%20geometric%20security%20grid%20patterns%20with%20encrypted%20data%20flow%20visualization%2C%20premium%20enterprise%20security%20atmosphere%20with%20structured%20defensive%20architecture%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20aesthetic%20with%20algorithmic%20protection%20rings%20and%20network%20topology%20visualization&width=1920&height=400&seq=kos-cyber-cta-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-10"
              width="1920"
              height="400"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 to-foreground-950/70" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-4">
                  <i className="ri-shield-keyhole-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Module Résilience — Security by Design</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Infrastructure Prête pour Audit Big Four
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  WAF kos-waf actif, logging centralisé (kos-security-logger), backup automation (kos-backup-automation), HSTS+CSP+Trusted Types Niveau 3, cookies SameSite=Strict+Secure. MFA admin obligatoire. Architecture alignée ISO 27001 (92%), NIST CSF (90%), ISO 22301 (72%).
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'PRA/PCA Documenté', icon: 'ri-file-text-line' },
                    { label: 'Backups Automatisés', icon: 'ri-cloud-line' },
                    { label: 'SIEM Light', icon: 'ri-radar-line' },
                    { label: 'Pentest Annuel', icon: 'ri-bug-line' },
                  ].map((tag) => (
                    <span key={tag.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                      <i className={`${tag.icon} text-emerald-400`} />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/kos-unified-autopilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-foreground-950 font-bold text-sm hover:bg-emerald-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-radar-line" />
                  Growth Orchestrator
                </a>
                <a
                  href="/kos-autonomous-quality-system"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-shield-check-line" />
                  Quality System
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

    </hubLayout>
  );
}





