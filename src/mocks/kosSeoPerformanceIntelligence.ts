// KOS SEO Performance Intelligence™ — Big Four Audit Unifié
// Diagnostic complet khepraexperts.com — Trafic · SERP · AEO/GEO · Core Web Vitals · Sécurité · Multilingue · KPIs

export interface OrganicTrafficSnapshot {
  mois: string;
  sessions: number;
  pages_vues: number;
  taux_rebond: number;
  duree_moyenne: number;
  conversions: number;
  taux_conversion: number;
}

export interface SerpKeyword {
  id: string;
  mot_cle: string;
  position: number;
  position_precedente: number;
  volume_mensuel: number;
  difficulte: number;
  cluster: string;
  langue: 'FR' | 'EN' | 'PT';
  featured_snippet: boolean;
  evolution: number;
}

export interface AIOVisibility {
  plateforme: string;
  visibilite: number;
  citations: number;
  featured_snippets: number;
  knowledge_panels: number;
  people_also_ask: number;
  score_geo: number;
  tendance: number;
}

export interface CoreWebVitalMetric {
  mois: string;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  speed_index: number;
  performance_mobile: number;
  performance_desktop: number;
}

export interface SecurityAuditItem {
  id: string;
  domaine: string;
  statut: 'conforme' | 'surveillance' | 'critique';
  score: number;
  details: string;
  recommandation: string;
  priorite: 'P0' | 'P1' | 'P2' | 'P3';
  iso_27001_controle: string;
}

export interface MultilingualSEOStats {
  langue: 'FR' | 'EN' | 'PT';
  pages_indexees: number;
  mots_cles_top10: number;
  trafic_mensuel: number;
  hreflang_ok: boolean;
  score_localisation: number;
  gap_pages: number;
  gap_trafic: number;
}

export interface CorrectiveAction {
  id: string;
  axe: string;
  action: string;
  priorite: 'P0' | 'P1' | 'P2' | 'P3';
  budget_fcfa: number;
  responsable: string;
  echeance: string;
  kpi_succes: string;
  valeur_actuelle: number;
  cible: number;
  statut: 'a_faire' | 'en_cours' | 'termine';
  etapes: string[];
  impact_estime: string;
}

export interface MonthlyKPI {
  mois: string;
  sessions_organiques: number;
  taux_conversion: number;
  score_performance: number;
  score_securite: number;
  score_geo: number;
  mots_cles_top10: number;
  backlinks_acquis: number;
  articles_publies: number;
  score_global: number;
  commentaire: string;
}

export interface GlobalMetrics {
  domain_rating: number;
  domain_authority: number;
  trafic_organique_mensuel: number;
  mots_cles_top3: number;
  mots_cles_top10: number;
  featured_snippets: number;
  pages_indexees: number;
  backlinks_actifs: number;
  domaines_referents: number;
  score_performance_mobile: number;
  score_performance_desktop: number;
  score_securite: number;
  score_geo: number;
  score_multilingue: number;
  score_global: number;
  certification: string;
  dernier_audit: string;
  prochain_audit: string;
  uptime_percent: number;
  temps_chargement_moyen: number;
  iso_27001_readiness: number;
}

// === TRAFIC ORGANIQUE — 12 mois (juillet 2025 → juin 2026) ===
export const ORGANIC_TRAFFIC_HISTORY: OrganicTrafficSnapshot[] = [
  { mois: '2025-07', sessions: 42600, pages_vues: 178920, taux_rebond: 52.3, duree_moyenne: 195, conversions: 1278, taux_conversion: 3.0 },
  { mois: '2025-08', sessions: 41800, pages_vues: 175560, taux_rebond: 51.8, duree_moyenne: 198, conversions: 1254, taux_conversion: 3.0 },
  { mois: '2025-09', sessions: 45200, pages_vues: 194360, taux_rebond: 50.4, duree_moyenne: 203, conversions: 1446, taux_conversion: 3.2 },
  { mois: '2025-10', sessions: 47100, pages_vues: 207240, taux_rebond: 49.2, duree_moyenne: 210, conversions: 1554, taux_conversion: 3.3 },
  { mois: '2025-11', sessions: 49500, pages_vues: 222750, taux_rebond: 48.5, duree_moyenne: 215, conversions: 1732, taux_conversion: 3.5 },
  { mois: '2025-12', sessions: 51200, pages_vues: 235520, taux_rebond: 47.8, duree_moyenne: 218, conversions: 1843, taux_conversion: 3.6 },
  { mois: '2026-01', sessions: 53800, pages_vues: 258240, taux_rebond: 46.5, duree_moyenne: 225, conversions: 2098, taux_conversion: 3.9 },
  { mois: '2026-02', sessions: 56400, pages_vues: 276360, taux_rebond: 45.2, duree_moyenne: 230, conversions: 2312, taux_conversion: 4.1 },
  { mois: '2026-03', sessions: 59200, pages_vues: 296000, taux_rebond: 44.1, duree_moyenne: 235, conversions: 2486, taux_conversion: 4.2 },
  { mois: '2026-04', sessions: 61800, pages_vues: 315180, taux_rebond: 43.5, duree_moyenne: 240, conversions: 2657, taux_conversion: 4.3 },
  { mois: '2026-05', sessions: 65200, pages_vues: 339040, taux_rebond: 42.8, duree_moyenne: 245, conversions: 2934, taux_conversion: 4.5 },
  { mois: '2026-06', sessions: 68500, pages_vues: 363050, taux_rebond: 42.0, duree_moyenne: 250, conversions: 3151, taux_conversion: 4.6 },
];

// === SERP KEYWORDS — Top 30 ===
export const SERP_KEYWORDS: SerpKeyword[] = [
  { id: 'kw-001', mot_cle: 'conformité BCEAO banque', position: 1, position_precedente: 2, volume_mensuel: 8800, difficulte: 72, cluster: 'BCEAO', langue: 'FR', featured_snippet: true, evolution: 1 },
  { id: 'kw-002', mot_cle: 'audit COBAC microfinance', position: 2, position_precedente: 4, volume_mensuel: 5400, difficulte: 65, cluster: 'COBAC', langue: 'FR', featured_snippet: false, evolution: 2 },
  { id: 'kw-003', mot_cle: 'gouvernance OHADA entreprise', position: 1, position_precedente: 1, volume_mensuel: 7200, difficulte: 68, cluster: 'OHADA', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-004', mot_cle: 'ESG reporting Afrique', position: 3, position_precedente: 7, volume_mensuel: 6200, difficulte: 58, cluster: 'ESG', langue: 'FR', featured_snippet: false, evolution: 4 },
  { id: 'kw-005', mot_cle: 'LCB-FT UEMOA 2026', position: 1, position_precedente: 1, volume_mensuel: 4800, difficulte: 70, cluster: 'LCB-FT', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-006', mot_cle: 'prix de transfert Afrique', position: 2, position_precedente: 3, volume_mensuel: 3900, difficulte: 62, cluster: 'Fiscalité', langue: 'FR', featured_snippet: false, evolution: 1 },
  { id: 'kw-007', mot_cle: 'digitalisation SFD BCEAO', position: 1, position_precedente: 2, volume_mensuel: 3500, difficulte: 55, cluster: 'Microfinance', langue: 'FR', featured_snippet: true, evolution: 1 },
  { id: 'kw-008', mot_cle: 'stress test bancaire UEMOA', position: 4, position_precedente: 6, volume_mensuel: 2800, difficulte: 60, cluster: 'Banque', langue: 'FR', featured_snippet: false, evolution: 2 },
  { id: 'kw-009', mot_cle: 'contrôle interne circulaire 01-2017', position: 1, position_precedente: 1, volume_mensuel: 4200, difficulte: 45, cluster: 'Contrôle Interne', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-010', mot_cle: 'agrément SFD BCEAO conditions', position: 2, position_precedente: 5, volume_mensuel: 3100, difficulte: 48, cluster: 'Microfinance', langue: 'FR', featured_snippet: false, evolution: 3 },
  { id: 'kw-011', mot_cle: 'African banking compliance', position: 8, position_precedente: 12, volume_mensuel: 4500, difficulte: 75, cluster: 'BCEAO', langue: 'EN', featured_snippet: false, evolution: 4 },
  { id: 'kw-012', mot_cle: 'OHADA corporate governance', position: 5, position_precedente: 9, volume_mensuel: 3800, difficulte: 68, cluster: 'OHADA', langue: 'EN', featured_snippet: false, evolution: 4 },
  { id: 'kw-013', mot_cle: 'BCEAO regulatory framework 2026', position: 6, position_precedente: 11, volume_mensuel: 5200, difficulte: 78, cluster: 'BCEAO', langue: 'EN', featured_snippet: false, evolution: 5 },
  { id: 'kw-014', mot_cle: 'ESG Africa reporting standards', position: 12, position_precedente: 18, volume_mensuel: 2800, difficulte: 62, cluster: 'ESG', langue: 'EN', featured_snippet: false, evolution: 6 },
  { id: 'kw-015', mot_cle: 'West African microfinance regulation', position: 7, position_precedente: 14, volume_mensuel: 2100, difficulte: 55, cluster: 'Microfinance', langue: 'EN', featured_snippet: false, evolution: 7 },
  { id: 'kw-016', mot_cle: 'transfer pricing Africa advisory', position: 15, position_precedente: 22, volume_mensuel: 1800, difficulte: 60, cluster: 'Fiscalité', langue: 'EN', featured_snippet: false, evolution: 7 },
  { id: 'kw-017', mot_cle: 'conformidade BCEAO SFD', position: 22, position_precedente: 35, volume_mensuel: 1200, difficulte: 40, cluster: 'BCEAO', langue: 'PT', featured_snippet: false, evolution: 13 },
  { id: 'kw-018', mot_cle: 'governança OHADA Africa', position: 18, position_precedente: 28, volume_mensuel: 1500, difficulte: 42, cluster: 'OHADA', langue: 'PT', featured_snippet: false, evolution: 10 },
  { id: 'kw-019', mot_cle: 'auditoria COBAC bancos', position: 25, position_precedente: 40, volume_mensuel: 900, difficulte: 38, cluster: 'COBAC', langue: 'PT', featured_snippet: false, evolution: 15 },
  { id: 'kw-020', mot_cle: 'due diligence Afrique francophone', position: 1, position_precedente: 1, volume_mensuel: 5600, difficulte: 52, cluster: 'Due Diligence', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-021', mot_cle: 'cartographie risques BCEAO', position: 3, position_precedente: 3, volume_mensuel: 2400, difficulte: 48, cluster: 'Risques', langue: 'FR', featured_snippet: false, evolution: 0 },
  { id: 'kw-022', mot_cle: 'ratio solvabilite UEMOA 2026', position: 1, position_precedente: 2, volume_mensuel: 3800, difficulte: 58, cluster: 'Banque', langue: 'FR', featured_snippet: true, evolution: 1 },
  { id: 'kw-023', mot_cle: 'cybersecurite bancaire COBAC', position: 4, position_precedente: 8, volume_mensuel: 3100, difficulte: 62, cluster: 'Cybersécurité', langue: 'FR', featured_snippet: false, evolution: 4 },
  { id: 'kw-024', mot_cle: 'African fintech regulation 2026', position: 10, position_precedente: 19, volume_mensuel: 4200, difficulte: 72, cluster: 'Fintech', langue: 'EN', featured_snippet: false, evolution: 9 },
  { id: 'kw-025', mot_cle: 'consultant conformité UEMOA', position: 1, position_precedente: 1, volume_mensuel: 6500, difficulte: 55, cluster: 'Conformité', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-026', mot_cle: 'cabinet audit CEMAC', position: 2, position_precedente: 2, volume_mensuel: 4800, difficulte: 50, cluster: 'CEMAC', langue: 'FR', featured_snippet: false, evolution: 0 },
  { id: 'kw-027', mot_cle: 'Khepra Experts avis', position: 1, position_precedente: 1, volume_mensuel: 2200, difficulte: 25, cluster: 'Marque', langue: 'FR', featured_snippet: true, evolution: 0 },
  { id: 'kw-028', mot_cle: 'GAFI recommandation Afrique', position: 3, position_precedente: 4, volume_mensuel: 2800, difficulte: 65, cluster: 'GAFI', langue: 'FR', featured_snippet: false, evolution: 1 },
  { id: 'kw-029', mot_cle: 'AML compliance francophone Africa', position: 9, position_precedente: 16, volume_mensuel: 3500, difficulte: 68, cluster: 'LCB-FT', langue: 'EN', featured_snippet: false, evolution: 7 },
  { id: 'kw-030', mot_cle: 'formação conformidade bancária África', position: 28, position_precedente: 42, volume_mensuel: 800, difficulte: 35, cluster: 'Conformité', langue: 'PT', featured_snippet: false, evolution: 14 },
];

// === VISIBILITÉ IA — AEO / GEO ===
export const AEO_VISIBILITY: AIOVisibility[] = [
  { plateforme: 'Google AI Overviews', visibilite: 68, citations: 142, featured_snippets: 47, knowledge_panels: 3, people_also_ask: 89, score_geo: 72, tendance: 18 },
  { plateforme: 'ChatGPT / Bing Copilot', visibilite: 52, citations: 98, featured_snippets: 0, knowledge_panels: 0, people_also_ask: 0, score_geo: 45, tendance: 22 },
  { plateforme: 'Perplexity AI', visibilite: 45, citations: 76, featured_snippets: 0, knowledge_panels: 0, people_also_ask: 0, score_geo: 38, tendance: 28 },
  { plateforme: 'Claude / Anthropic', visibilite: 38, citations: 52, featured_snippets: 0, knowledge_panels: 0, people_also_ask: 0, score_geo: 32, tendance: 35 },
  { plateforme: 'Google Gemini', visibilite: 62, citations: 115, featured_snippets: 42, knowledge_panels: 2, people_also_ask: 0, score_geo: 58, tendance: 15 },
];

// === CORE WEB VITALS — 12 mois ===
export const CORE_WEB_VITALS_HISTORY: CoreWebVitalMetric[] = [
  { mois: '2025-07', lcp: 4.8, fid: 85, cls: 0.18, ttfb: 920, speed_index: 5.2, performance_mobile: 48, performance_desktop: 72 },
  { mois: '2025-08', lcp: 4.5, fid: 78, cls: 0.16, ttfb: 850, speed_index: 4.9, performance_mobile: 52, performance_desktop: 75 },
  { mois: '2025-09', lcp: 4.2, fid: 72, cls: 0.15, ttfb: 800, speed_index: 4.6, performance_mobile: 55, performance_desktop: 78 },
  { mois: '2025-10', lcp: 3.8, fid: 65, cls: 0.14, ttfb: 750, speed_index: 4.3, performance_mobile: 58, performance_desktop: 82 },
  { mois: '2025-11', lcp: 3.5, fid: 58, cls: 0.12, ttfb: 700, speed_index: 4.0, performance_mobile: 62, performance_desktop: 85 },
  { mois: '2025-12', lcp: 3.2, fid: 52, cls: 0.11, ttfb: 650, speed_index: 3.7, performance_mobile: 65, performance_desktop: 87 },
  { mois: '2026-01', lcp: 2.9, fid: 45, cls: 0.10, ttfb: 580, speed_index: 3.4, performance_mobile: 68, performance_desktop: 89 },
  { mois: '2026-02', lcp: 2.7, fid: 40, cls: 0.09, ttfb: 520, speed_index: 3.1, performance_mobile: 72, performance_desktop: 91 },
  { mois: '2026-03', lcp: 2.5, fid: 35, cls: 0.08, ttfb: 480, speed_index: 2.9, performance_mobile: 75, performance_desktop: 93 },
  { mois: '2026-04', lcp: 2.3, fid: 30, cls: 0.07, ttfb: 420, speed_index: 2.6, performance_mobile: 78, performance_desktop: 94 },
  { mois: '2026-05', lcp: 2.1, fid: 25, cls: 0.06, ttfb: 380, speed_index: 2.4, performance_mobile: 82, performance_desktop: 96 },
  { mois: '2026-06', lcp: 1.9, fid: 22, cls: 0.05, ttfb: 340, speed_index: 2.2, performance_mobile: 85, performance_desktop: 98 },
];

// === SÉCURITÉ — AUDIT DÉTAILLÉ ===
export const SECURITY_AUDIT: SecurityAuditItem[] = [
  { id: 'sec-001', domaine: 'Certificat SSL/TLS', statut: 'conforme', score: 100, details: 'TLS 1.3, HSTS preload, certificat EV', recommandation: 'Maintenir la configuration actuelle', priorite: 'P3', iso_27001_controle: 'A.10.1' },
  { id: 'sec-002', domaine: 'Headers de sécurité HTTP', statut: 'conforme', score: 95, details: 'CSP, X-Frame-Options, X-Content-Type-Options présents', recommandation: 'Ajouter Referrer-Policy: strict-origin-when-cross-origin', priorite: 'P2', iso_27001_controle: 'A.14.1.2' },
  { id: 'sec-003', domaine: 'Protection DDoS / WAF', statut: 'conforme', score: 90, details: 'Netlify Edge + rate limiting actifs', recommandation: 'Configurer alertes au-delà de 1000 req/s', priorite: 'P2', iso_27001_controle: 'A.12.2.1' },
  { id: 'sec-004', domaine: 'Authentification & MFA', statut: 'conforme', score: 88, details: 'Supabase Auth + MFA admin activé', recommandation: 'Étendre MFA à tous les comptes éditeurs', priorite: 'P1', iso_27001_controle: 'A.9.4.2' },
  { id: 'sec-005', domaine: 'Gestion des vulnérabilités', statut: 'surveillance', score: 78, details: 'Scan OWASP automatisé, 2 vuln medium détectées', recommandation: 'Corriger vulnérabilités npm audit (2 medium)', priorite: 'P1', iso_27001_controle: 'A.12.6.1' },
  { id: 'sec-006', domaine: 'Journalisation & Monitoring', statut: 'surveillance', score: 75, details: 'Logs Supabase + Netlify, pas de SIEM', recommandation: 'Déployer SIEM léger (Wazuh ou équivalent)', priorite: 'P1', iso_27001_controle: 'A.12.4.1' },
  { id: 'sec-007', domaine: 'Sauvegarde & PCA/PRA', statut: 'surveillance', score: 72, details: 'Backups Supabase quotidiens, PRA non testé > 6 mois', recommandation: 'Test PRA trimestriel + backup hors-site', priorite: 'P0', iso_27001_controle: 'A.12.3.1' },
  { id: 'sec-008', domaine: 'Conformité ISO 27001', statut: 'surveillance', score: 65, details: '12 contrôles conformes sur 28, gap analysis réalisé', recommandation: 'Plan certification ISO 27001:2022 — 18 mois', priorite: 'P1', iso_27001_controle: 'A.5.1.1' },
  { id: 'sec-009', domaine: 'Protection données (RGPD/UA)', statut: 'surveillance', score: 70, details: 'Cookie consent, privacy policy OK. Registre traitements partiel.', recommandation: 'Compléter registre traitements + DPO externe', priorite: 'P1', iso_27001_controle: 'A.18.1.4' },
  { id: 'sec-010', domaine: 'Sécurité API & Edge Functions', statut: 'conforme', score: 92, details: 'JWT vérification, rate limiting, CORS configuré', recommandation: 'Audit penetration test externe annuel', priorite: 'P2', iso_27001_controle: 'A.14.1.2' },
];

// === SEO MULTILINGUE ===
export const MULTILINGUAL_SEO: MultilingualSEOStats[] = [
  { langue: 'FR', pages_indexees: 312, mots_cles_top10: 847, trafic_mensuel: 58500, hreflang_ok: true, score_localisation: 95, gap_pages: 0, gap_trafic: 0 },
  { langue: 'EN', pages_indexees: 78, mots_cles_top10: 142, trafic_mensuel: 8200, hreflang_ok: true, score_localisation: 72, gap_pages: 234, gap_trafic: 42300 },
  { langue: 'PT', pages_indexees: 12, mots_cles_top10: 8, trafic_mensuel: 1800, hreflang_ok: false, score_localisation: 28, gap_pages: 300, gap_trafic: 48200 },
];

// === ACTIONS CORRECTIVES — Plan 12 mois ===
export const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: 'cor-001', axe: 'Performance', action: 'Compression images automatique — WebP/AVIF avec lazy loading natif',
    priorite: 'P0', budget_fcfa: 2500000, responsable: 'Équipe KOS Web Ops', echeance: '2026-07-31',
    kpi_succes: 'LCP', valeur_actuelle: 1.9, cible: 1.2, statut: 'en_cours',
    etapes: ['Audit images > 100 Ko', 'Pipeline auto-compression WebP/AVIF', 'Intégration CDN Netlify Edge', 'Test LCP < 1.5s sur 3G'],
    impact_estime: 'LCP -37%, Mobile +10pts Lighthouse, Réduction bande passante -45%',
  },
  {
    id: 'cor-002', axe: 'Performance', action: 'Optimisation Core Web Vitals — Cache headers, code splitting, preload critiques',
    priorite: 'P0', budget_fcfa: 3500000, responsable: 'Équipe KOS Fullstack Dev', echeance: '2026-08-15',
    kpi_succes: 'CWV Score', valeur_actuelle: 85, cible: 98, statut: 'en_cours',
    etapes: ['Cache-Control headers (1 an assets)', 'Code splitting par page', 'Preload fonts + CSS critiques', 'Inline critical CSS above fold'],
    impact_estime: 'CWV Mobile 85→98, Desktop 98→100, TTFB -40%',
  },
  {
    id: 'cor-003', axe: 'Performance', action: 'Migration CDN Global — Netlify Edge + Cloudflare pour Afrique',
    priorite: 'P0', budget_fcfa: 4500000, responsable: 'Équipe KOS Web Ops', echeance: '2026-09-30',
    kpi_succes: 'TTFB Afrique', valeur_actuelle: 340, cible: 120, statut: 'a_faire',
    etapes: ['Benchmark TTFB par région', 'Config CDN Edge nodes Afrique', 'Cache stratégique pages statiques', 'Test TTFB < 150ms depuis Dakar/Abidjan'],
    impact_estime: 'TTFB -65% depuis Afrique, expérience utilisateur ×3',
  },
  {
    id: 'cor-004', axe: 'SEO Multilingue', action: 'Stratégie contenu EN — 150 pages ciblées secteurs prioritaires',
    priorite: 'P0', budget_fcfa: 12000000, responsable: 'Équipe SEO Content', echeance: '2026-12-31',
    kpi_succes: 'Trafic EN', valeur_actuelle: 8200, cible: 25000, statut: 'a_faire',
    etapes: ['Keyword research EN (marchés Nigeria, Ghana, Kenya)', 'Création 150 pages EN avec hreflang', 'Blog EN — 2 articles/semaine', 'Link building EN (.org, .edu, médias)'],
    impact_estime: 'Trafic EN ×3, Mots-clés Top 10 EN ×4, 150→350',
  },
  {
    id: 'cor-005', axe: 'SEO Multilingue', action: 'Stratégie contenu PT — 80 pages ciblées PALOP + Brésil',
    priorite: 'P1', budget_fcfa: 8000000, responsable: 'Équipe SEO Content', echeance: '2026-12-31',
    kpi_succes: 'Trafic PT', valeur_actuelle: 1800, cible: 8000, statut: 'a_faire',
    etapes: ['Keyword research PT (Angola, Mozambique, Cap-Vert)', 'Création 80 pages PT', 'hreflang FR↔PT correct', 'Partenariats médias PALOP'],
    impact_estime: 'Trafic PT ×4, Mots-clés Top 10 PT 8→50, Ouverture marché PALOP',
  },
  {
    id: 'cor-006', axe: 'SEO Multilingue', action: 'Correction hreflang + balises langues alternées — toutes pages',
    priorite: 'P0', budget_fcfa: 1500000, responsable: 'Équipe KOS Fullstack Dev', echeance: '2026-07-15',
    kpi_succes: 'Pages hreflang OK', valeur_actuelle: 312, cible: 402, statut: 'a_faire',
    etapes: ['Audit hreflang (402 pages)', 'Correction x-default + alternates', 'Validation GSC International Targeting'],
    impact_estime: 'Élimination erreurs GSC, meilleur ciblage linguistique SERP',
  },
  {
    id: 'cor-007', axe: 'Contenu Expert', action: 'Production mensuelle — 12 white papers sectoriels en 12 mois',
    priorite: 'P1', budget_fcfa: 18000000, responsable: 'Direction Research & Thought Leadership', echeance: '2026-12-31',
    kpi_succes: 'Backlinks .edu/.org', valeur_actuelle: 8, cible: 50, statut: 'en_cours',
    etapes: ['Sélection 12 thématiques prioritaires', 'Rédaction Big Four (20 pages/paper)', 'Design professionnel + landing page', 'Promotion LinkedIn + outreach institutionnel'],
    impact_estime: 'Backlinks +500%, DR +8pts, Citations académiques ×10',
  },
  {
    id: 'cor-008', axe: 'Contenu Expert', action: 'Baromètre trimestriel BCEAO — publication régulière',
    priorite: 'P1', budget_fcfa: 6000000, responsable: 'Direction Research & Thought Leadership', echeance: '2026-12-31',
    kpi_succes: 'Featured Snippets', valeur_actuelle: 47, cible: 80, statut: 'en_cours',
    etapes: ['Template baromètre standardisé', 'Collecte données trimestrielles', 'Publication + communiqué presse', 'Soumission Google Dataset Search'],
    impact_estime: 'Featured snippets +70%, Autorité thématique BCEAO renforcée',
  },
  {
    id: 'cor-009', axe: 'Sécurité', action: 'Plan certification ISO/IEC 27001:2022 — Démarrage gap analysis',
    priorite: 'P1', budget_fcfa: 25000000, responsable: 'Direction Conformité & RSSI', echeance: '2027-06-30',
    kpi_succes: 'ISO 27001 Readiness', valeur_actuelle: 65, cible: 95, statut: 'a_faire',
    etapes: ['Gap analysis ISO 27001:2022 (28 contrôles)', 'SMSI — Politique + périmètre', 'Traitement risques + plan action', 'Audit interne → certification externe'],
    impact_estime: 'Crédibilité institutionnelle, exigibilité appels d\'offres internationaux',
  },
  {
    id: 'cor-010', axe: 'Sécurité', action: 'Déploiement SIEM + SOC 24/7 externalisé',
    priorite: 'P1', budget_fcfa: 8500000, responsable: 'Équipe KOS Cyber Security', echeance: '2026-10-31',
    kpi_succes: 'Score Sécurité', valeur_actuelle: 75, cible: 95, statut: 'a_faire',
    etapes: ['Sélection SIEM (Wazuh cloud)', 'Déploiement agents + dashboard', 'Configuration alertes temps réel', 'Test incident response'],
    impact_estime: 'Détection incidents temps réel, conformité ISO 27001 A.12.4',
  },
  {
    id: 'cor-011', axe: 'Performance', action: 'Optimisation images hero + progressive loading',
    priorite: 'P2', budget_fcfa: 1500000, responsable: 'Équipe KOS Fullstack Dev', echeance: '2026-07-31',
    kpi_succes: 'Poids moyen page', valeur_actuelle: 2.8, cible: 0.8, statut: 'a_faire',
    etapes: ['Analyse pages > 2 Mo', 'Compression hero images', 'Lazy loading below fold', 'Responsive srcset'],
    impact_estime: 'Poids page -65%, LCP -30%, bande passante mobile -60%',
  },
  {
    id: 'cor-012', axe: 'AEO/GEO', action: 'Optimisation contenu pour AI Overviews — structure Q&A + Schema FAQ',
    priorite: 'P1', budget_fcfa: 4000000, responsable: 'Équipe SEO Content', echeance: '2026-09-30',
    kpi_succes: 'Score GEO', valeur_actuelle: 58, cible: 78, statut: 'a_faire',
    etapes: ['Analyse requêtes AI Overviews cibles', 'Structure Q&A 200 articles', 'Schema.org FAQPage sur pages clés', 'Suivi citations AI platforms'],
    impact_estime: 'Visibilité AI Overviews +25%, GEO score +20pts',
  },
];

// === KPIs MENSUELS — Suivi 12 mois ===
export const MONTHLY_KPIS: MonthlyKPI[] = [
  { mois: '2025-07', sessions_organiques: 42600, taux_conversion: 3.0, score_performance: 52, score_securite: 68, score_geo: 42, mots_cles_top10: 1280, backlinks_acquis: 34, articles_publies: 28, score_global: 65, commentaire: 'Baseline initiale — diagnostic complet réalisé' },
  { mois: '2025-08', sessions_organiques: 41800, taux_conversion: 3.0, score_performance: 55, score_securite: 68, score_geo: 44, mots_cles_top10: 1320, backlinks_acquis: 28, articles_publies: 32, score_global: 67, commentaire: 'Début compression images + lazy loading' },
  { mois: '2025-09', sessions_organiques: 45200, taux_conversion: 3.2, score_performance: 58, score_securite: 70, score_geo: 46, mots_cles_top10: 1380, backlinks_acquis: 42, articles_publies: 35, score_global: 70, commentaire: '+8% trafic, pipeline WebP déployé' },
  { mois: '2025-10', sessions_organiques: 47100, taux_conversion: 3.3, score_performance: 62, score_securite: 72, score_geo: 48, mots_cles_top10: 1420, backlinks_acquis: 38, articles_publies: 30, score_global: 73, commentaire: 'Cache headers optimisés, TTFB -25%' },
  { mois: '2025-11', sessions_organiques: 49500, taux_conversion: 3.5, score_performance: 65, score_securite: 74, score_geo: 50, mots_cles_top10: 1480, backlinks_acquis: 45, articles_publies: 38, score_global: 76, commentaire: 'Code splitting déployé, LCP -30%' },
  { mois: '2025-12', sessions_organiques: 51200, taux_conversion: 3.6, score_performance: 68, score_securite: 75, score_geo: 52, mots_cles_top10: 1520, backlinks_acquis: 52, articles_publies: 42, score_global: 78, commentaire: 'Premier white paper BCEAO publié, +52 backlinks' },
  { mois: '2026-01', sessions_organiques: 53800, taux_conversion: 3.9, score_performance: 72, score_securite: 78, score_geo: 55, mots_cles_top10: 1580, backlinks_acquis: 48, articles_publies: 40, score_global: 81, commentaire: 'MFA admin activé, score sécu +3pts' },
  { mois: '2026-02', sessions_organiques: 56400, taux_conversion: 4.1, score_performance: 75, score_securite: 80, score_geo: 57, mots_cles_top10: 1640, backlinks_acquis: 55, articles_publies: 45, score_global: 83, commentaire: 'Premières pages EN publiées, trafic EN +35%' },
  { mois: '2026-03', sessions_organiques: 59200, taux_conversion: 4.2, score_performance: 78, score_securite: 82, score_geo: 60, mots_cles_top10: 1700, backlinks_acquis: 62, articles_publies: 48, score_global: 85, commentaire: 'Début stratégie PT, 5 pages publiées' },
  { mois: '2026-04', sessions_organiques: 61800, taux_conversion: 4.3, score_performance: 82, score_securite: 85, score_geo: 62, mots_cles_top10: 1750, backlinks_acquis: 58, articles_publies: 50, score_global: 87, commentaire: 'CDN Edge Afrique configuré, TTFB -40%' },
  { mois: '2026-05', sessions_organiques: 65200, taux_conversion: 4.5, score_performance: 85, score_securite: 88, score_geo: 65, mots_cles_top10: 1800, backlinks_acquis: 68, articles_publies: 52, score_global: 89, commentaire: 'Gap analysis ISO 27001 terminé' },
  { mois: '2026-06', sessions_organiques: 68500, taux_conversion: 4.6, score_performance: 88, score_securite: 90, score_geo: 68, mots_cles_top10: 1850, backlinks_acquis: 72, articles_publies: 55, score_global: 91, commentaire: 'État actuel — Plan correctif Q3-Q4 activé, cible 95/100' },
];

// === MÉTRIQUES GLOBALES ===
export const SEO_PERFORMANCE_GLOBAL_METRICS: GlobalMetrics = {
  domain_rating: 85,
  domain_authority: 72,
  trafic_organique_mensuel: 68500,
  mots_cles_top3: 612,
  mots_cles_top10: 1850,
  featured_snippets: 47,
  pages_indexees: 402,
  backlinks_actifs: 2850,
  domaines_referents: 342,
  score_performance_mobile: 85,
  score_performance_desktop: 98,
  score_securite: 90,
  score_geo: 68,
  score_multilingue: 65,
  score_global: 91,
  certification: 'AA — Big Four Advanced 91/100 — SEO Performance Intelligence — LEADER SEO AFRIQUE FRANCOPHONE',
  dernier_audit: '2026-06-17',
  prochain_audit: '2026-07-17',
  uptime_percent: 99.97,
  temps_chargement_moyen: 1.9,
  iso_27001_readiness: 65,
};





