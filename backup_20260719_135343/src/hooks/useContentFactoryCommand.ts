import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  CONTENT_FACTORY_BLOCKS,
  CONTENT_FACTORY_OVERVIEW,
  type ContentBlock,
  type ContentFactoryOverview,
} from '@/mocks/contentFactoryCommand';

// ─── Types ───
interface ContentFactoryState {
  blocks: ContentBlock[];
  overview: ContentFactoryOverview;
  loading: boolean;
  error: string | null;
  source: 'live' | 'mock';
  blockLoading: Record<number, boolean>;
}

export interface PipelineStep {
  blockIds: number[];
  label: string;
  icon: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface PipelineState {
  mode: 'idle' | 'running' | 'completed';
  steps: PipelineStep[];
  currentStepIndex: number;
  startedAt: string | null;
  completedAt: string | null;
}

const PIPELINE_STEPS: Omit<PipelineStep, 'status'>[] = [
  { blockIds: [1], label: 'Veille Stratégique', icon: 'ri-radar-line' },
  { blockIds: [2, 10], label: 'Opportunités SEO & SEO+', icon: 'ri-search-line' },
  { blockIds: [3, 11], label: 'Opportunités GEO & GEO+', icon: 'ri-robot-line' },
  { blockIds: [4], label: 'Planification Automatique', icon: 'ri-calendar-todo-line' },
  { blockIds: [5], label: 'Rédaction Big Four', icon: 'ri-quill-pen-line' },
  { blockIds: [6], label: 'Lead Magnets', icon: 'ri-download-line' },
  { blockIds: [7], label: 'Études de Cas', icon: 'ri-folder-chart-line' },
  { blockIds: [8], label: 'Livres Blancs', icon: 'ri-book-open-line' },
  { blockIds: [9], label: 'Méthodologies KHEPRA', icon: 'ri-lightbulb-line' },
  { blockIds: [12], label: 'Contrôle Qualité', icon: 'ri-check-double-line' },
  { blockIds: [13], label: 'Auto-Validation', icon: 'ri-sparkling-line' },
];

// ─── Utilitaires ───
function safeNum(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function safeStr(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

const NOW = new Date().toISOString();
const TODAY = NOW.slice(0, 10);
const MONTH_AGO = new Date(Date.now() - 30 * 86400000).toISOString();
const WEEK_AGO = new Date(Date.now() - 7 * 86400000).toISOString();

type R = Record<string, unknown>;

// ══════════════════════════════════════════════
// FONCTIONS D'AGRÉGATION INDIVIDUELLES PAR BLOC
// ══════════════════════════════════════════════

async function aggregateBlock1(): Promise<ContentBlock> {
  const { data } = await supabase.from('regulatory_alerts').select('id, severity, created_at, title, impact_assessment').order('created_at', { ascending: false }).limit(50);
  const arr = (data || []) as R[];
  const criticalAlerts = arr.filter((a) => a.severity === 'critical').length;
  const highAlerts = arr.filter((a) => a.severity === 'high' || a.severity === 'élevé').length;
  const thisMonth = arr.filter((a) => String(a.created_at || '') >= MONTH_AGO);
  return {
    id: 1, name: 'Veille Stratégique', short_name: 'Veille', icon: 'ri-radar-line',
    description: 'Analyse quotidienne BCEAO, UEMOA, OHADA, GAFI, COBAC, BAD, FMI, Banque Mondiale, OCDE, ISO, COSO.',
    status: 'active', priority: 'critical', color: '#DC2626',
    hub_url: '/kos-regulatory-compliance-automates', hub_name: 'Regulatory Compliance Automates',
    auto_generated: true, agent_name: 'KOS Regulatory Auto-Scanner™',
    production_pipeline: { total: Math.max(arr.length, 12), in_progress: thisMonth.length, completed: arr.length, scheduled: 0 },
    kpis: [
      { name: 'Autorités surveillées', value: '14', target: '14', icon: 'ri-building-2-line' },
      { name: 'Alertes ce mois', value: String(thisMonth.length), target: '20', icon: 'ri-notification-3-line' },
      { name: 'Impact Élevé+', value: String(criticalAlerts + highAlerts), target: '—', icon: 'ri-alert-line' },
      { name: 'Total alertes', value: String(arr.length), target: '—', icon: 'ri-file-chart-line' },
    ],
    recent_activity: arr.slice(0, 3).map((a) => ({
      date: safeStr(String(a.created_at || '').slice(0, 10), TODAY),
      description: `Alerte ${safeStr(a.severity, 'moyen').toUpperCase()} — ${safeStr(a.title, 'Nouvelle alerte réglementaire').substring(0, 100)}`,
      type: 'alert' as const,
    })),
  };
}

async function aggregateSeoBlocks(): Promise<{ block2: ContentBlock; block10: ContentBlock }> {
  const { data: seoData } = await supabase.from('seo_audit_results').select('id, overall_score, seo_score, aeo_score, schema_types, checked_at, page_url, page_title, has_schema_org, has_faq_schema').order('checked_at', { ascending: false }).limit(100);
  const { data: recent } = await supabase.from('seo_audit_results').select('id, page_title, seo_score, checked_at').order('checked_at', { ascending: false }).limit(10);
  const arr = (seoData || []) as R[];
  const recentArr = (recent || []) as R[];

  const schemaTypes = new Set<string>();
  arr.forEach((r) => { const t = r.schema_types as string[] | undefined; if (Array.isArray(t)) t.forEach((s) => schemaTypes.add(s)); });
  const avgSeo = arr.length > 0 ? Math.round(arr.reduce((s, r) => s + safeNum(r.seo_score), 0) / arr.length * 10) / 10 : 0;
  const pagesHighSEO = arr.filter((r) => safeNum(r.seo_score) >= 80).length;
  const pagesOptimized = arr.filter((r) => safeNum(r.seo_score) >= 70).length;

  const baseActivity = recentArr.slice(0, 3).map((r) => ({
    date: safeStr(String(r.checked_at || '').slice(0, 10), TODAY),
    description: `Audit SEO — ${safeStr(r.page_title, 'Page')} score ${safeNum(r.seo_score)}/100`,
    type: 'production' as const,
  }));

  const block2: ContentBlock = {
    id: 2, name: 'Opportunités SEO', short_name: 'SEO', icon: 'ri-search-line',
    description: 'Mots-clés stratégiques, requêtes longue traîne, lacunes de contenu. Priorité A/B/C.',
    status: 'active', priority: 'critical', color: '#86BC25',
    hub_url: '/kos-seo-aeo-command', hub_name: 'SEO & AEO Command Center',
    auto_generated: true, agent_name: 'KOS SEO Intelligence Agent™',
    production_pipeline: { total: arr.length, in_progress: arr.filter((r) => safeNum(r.seo_score) < 70).length, completed: pagesHighSEO, scheduled: 0 },
    kpis: [
      { name: 'Pages auditées', value: String(arr.length), target: '500', icon: 'ri-key-2-line' },
      { name: 'Score SEO moyen', value: String(avgSeo), target: '95', icon: 'ri-bar-chart-line' },
      { name: 'Schema.org', value: `${schemaTypes.size} types`, target: '20', icon: 'ri-code-line' },
      { name: 'Pages score ≥ 80', value: String(pagesHighSEO), target: String(arr.length), icon: 'ri-trophy-line' },
    ],
    recent_activity: baseActivity,
  };

  const block10: ContentBlock = {
    id: 10, name: 'SEO Avancé', short_name: 'SEO+', icon: 'ri-search-eye-line',
    description: 'Mot-clé principal, secondaires, title tag, meta, slug, FAQ, Schema.org, maillage interne.',
    status: 'active', priority: 'critical', color: '#059669',
    hub_url: '/kos-seo-autopilot', hub_name: 'SEO Autopilot 2.0',
    auto_generated: true, agent_name: 'KOS SEO Autopilot 2.0™',
    production_pipeline: { total: arr.length, in_progress: arr.filter((r) => safeNum(r.seo_score) < 70).length, completed: pagesOptimized, scheduled: 0 },
    kpis: [
      { name: 'Pages optimisées', value: String(pagesOptimized), target: '200', icon: 'ri-pages-line' },
      { name: 'Schema.org', value: `${schemaTypes.size} types`, target: '20', icon: 'ri-code-line' },
      { name: 'Score SEO moyen', value: String(avgSeo), target: '98', icon: 'ri-speed-line' },
      { name: 'Pages avec FAQ', value: String(arr.filter((r) => r.has_faq_schema).length), target: '50', icon: 'ri-star-smile-line' },
    ],
    recent_activity: recentArr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.checked_at || '').slice(0, 10), TODAY),
      description: `Page optimisée — ${safeStr(r.page_title, 'Page')} score SEO ${safeNum(r.seo_score)}/100`,
      type: 'update' as const,
    })),
  };

  return { block2, block10 };
}

async function aggregateGeoBlocks(): Promise<{ block3: ContentBlock; block11: ContentBlock }> {
  const { data } = await supabase.from('geo_visibility_logs').select('id, log_type, score, status, created_at').order('created_at', { ascending: false }).limit(100);
  const { data: recent } = await supabase.from('geo_visibility_logs').select('id, log_type, score, created_at').order('created_at', { ascending: false }).limit(10);
  const arr = (data || []) as R[];
  const recentArr = (recent || []) as R[];

  const avgGeo = arr.length > 0 ? Math.round(arr.reduce((s, r) => s + safeNum(r.score), 0) / arr.length * 10) / 10 : 0;
  const geoTypes = new Set<string>();
  arr.forEach((r) => { if (r.log_type) geoTypes.add(String(r.log_type)); });

  const block3: ContentBlock = {
    id: 3, name: 'Opportunités GEO', short_name: 'GEO', icon: 'ri-robot-line',
    description: 'Analyse IA : ChatGPT, Gemini, Claude, Perplexity, Copilot. Base GEO.',
    status: 'active', priority: 'high', color: '#EA580C',
    hub_url: '/kos-ai-visibility-command', hub_name: 'AI Visibility Command',
    auto_generated: true, agent_name: 'KOS GEO Visibility Engine™',
    production_pipeline: { total: arr.length, in_progress: arr.filter((r) => r.status === 'processing').length, completed: arr.filter((r) => r.status === 'completed' || safeNum(r.score) >= 70).length, scheduled: 0 },
    kpis: [
      { name: 'Moteurs IA couverts', value: String(geoTypes.size), target: '8', icon: 'ri-global-line' },
      { name: 'Logs GEO total', value: String(arr.length), target: '200', icon: 'ri-chat-3-line' },
      { name: 'Score GEO moyen', value: String(avgGeo), target: '95', icon: 'ri-brain-line' },
      { name: 'Scans ce mois', value: String(arr.filter((r) => String(r.created_at || '') >= MONTH_AGO).length), target: '50', icon: 'ri-radar-line' },
    ],
    recent_activity: recentArr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.created_at || '').slice(0, 10), TODAY),
      description: `Scan ${safeStr(r.log_type, 'GEO')} — Score ${safeNum(r.score)}/100`,
      type: 'production' as const,
    })),
  };

  const block11: ContentBlock = {
    id: 11, name: 'GEO Avancé', short_name: 'GEO+', icon: 'ri-global-line',
    description: 'Optimisation ChatGPT, Gemini, Claude, Perplexity, Copilot. FAQ conversationnelles.',
    status: 'active', priority: 'high', color: '#2563EB',
    hub_url: '/kos-ai-visibility-command', hub_name: 'AI Visibility Command',
    auto_generated: true, agent_name: 'KOS GEO Visibility Engine™',
    production_pipeline: { total: arr.length, in_progress: arr.filter((r) => r.status === 'processing').length, completed: arr.filter((r) => safeNum(r.score) >= 70).length, scheduled: 0 },
    kpis: [
      { name: 'Moteurs IA couverts', value: String(geoTypes.size), target: '8', icon: 'ri-global-line' },
      { name: 'Score GEO moyen', value: String(avgGeo), target: '95', icon: 'ri-radar-line' },
      { name: 'Scans haute qualité', value: String(arr.filter((r) => safeNum(r.score) >= 70).length), target: '100', icon: 'ri-file-list-3-line' },
      { name: 'Logs totaux', value: String(arr.length), target: '200', icon: 'ri-file-code-line' },
    ],
    recent_activity: recentArr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.created_at || '').slice(0, 10), TODAY),
      description: `Visibilité ${safeStr(r.log_type, 'IA')} — Score ${safeNum(r.score)}/100`,
      type: 'update' as const,
    })),
  };

  return { block3, block11 };
}

async function aggregateBlock4(): Promise<ContentBlock> {
  const { data } = await supabase.from('social_automation_queue').select('id, platform, status, scheduled_for, generated_at').order('scheduled_for', { ascending: false }).limit(100);
  const arr = (data || []) as R[];
  const linkedIn = arr.filter((r) => r.platform === 'linkedin').length;
  const twitterX = arr.filter((r) => r.platform === 'x' || r.platform === 'twitter').length;
  const scheduled = arr.filter((r) => r.status === 'scheduled').length;
  const published = arr.filter((r) => r.status === 'published').length;
  const thisWeek = arr.filter((r) => String(r.scheduled_for || '') >= WEEK_AGO);
  return {
    id: 4, name: 'Planification Automatique', short_name: 'Planning', icon: 'ri-calendar-todo-line',
    description: 'Calendrier quotidien LinkedIn/X, hebdo 2 articles, mensuel 1 étude, trimestriel 1 whitepaper.',
    status: arr.length > 0 ? 'active' : 'in_progress', priority: 'high', color: '#0891B2',
    hub_url: '/kos-social-media-command', hub_name: 'Social Media Command',
    auto_generated: true, agent_name: 'KOS Social Scheduler™',
    production_pipeline: { total: arr.length, in_progress: scheduled, completed: published, scheduled },
    kpis: [
      { name: 'Posts LinkedIn', value: String(linkedIn), target: '100', icon: 'ri-linkedin-fill' },
      { name: 'Posts X', value: String(twitterX), target: '80', icon: 'ri-twitter-x-fill' },
      { name: 'Planifiés', value: String(scheduled), target: '14/sem', icon: 'ri-calendar-line' },
      { name: 'Cette semaine', value: String(thisWeek.length), target: '7', icon: 'ri-fire-line' },
    ],
    recent_activity: arr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.scheduled_for || r.generated_at || '').slice(0, 10), TODAY),
      description: `Post ${safeStr(r.platform, 'social').toUpperCase()} planifié — ${safeStr(r.status, 'scheduled')}`,
      type: 'production' as const,
    })),
  };
}

async function aggregateBlock5(): Promise<ContentBlock> {
  const { data } = await supabase.from('kos_blog_writing_automates').select('id, name, status, tasks_completed, auto_enabled, last_execution').order('last_execution', { ascending: false }).limit(50);
  const arr = (data || []) as R[];
  const totalTasks = arr.reduce((s, r) => s + safeNum(r.tasks_completed), 0);
  const active = arr.filter((r) => r.status === 'active').length;
  const auto = arr.filter((r) => r.auto_enabled).length;
  return {
    id: 5, name: 'Rédaction Big Four', short_name: 'Articles', icon: 'ri-quill-pen-line',
    description: 'Articles 2 500-5 000 mots niveau McKinsey/Deloitte/PwC. 9 sections.',
    status: arr.length > 0 ? 'active' : 'in_progress', priority: 'critical', color: '#BE123C',
    hub_url: '/kos-blog-writing-automates', hub_name: 'Blog Writing Automates',
    auto_generated: true, agent_name: 'KOS Blog Writing Automates™ (25 agents)',
    production_pipeline: { total: arr.length, in_progress: arr.filter((r) => r.status === 'in_progress').length, completed: arr.filter((r) => r.status === 'completed' || safeNum(r.tasks_completed) > 0).length, scheduled: 0 },
    kpis: [
      { name: 'Agents actifs', value: String(active), target: '25', icon: 'ri-robot-line' },
      { name: 'Tâches complétées', value: String(totalTasks), target: '1000', icon: 'ri-check-double-line' },
      { name: 'Auto-activés', value: String(auto), target: '25', icon: 'ri-flashlight-line' },
      { name: 'Agents totaux', value: String(arr.length), target: '25', icon: 'ri-stack-line' },
    ],
    recent_activity: arr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.last_execution || '').slice(0, 10), TODAY),
      description: `Agent ${safeStr(r.name, 'Blog')} — ${safeNum(r.tasks_completed)} tâches`,
      type: 'production' as const,
    })),
  };
}

async function aggregateBlock6(): Promise<ContentBlock> {
  const { data } = await supabase.from('leads').select('id, lead_score, status, created_at, lead_category, pipeline_stage, calendar_link_clicked, meeting_scheduled_at').order('created_at', { ascending: false }).limit(100);
  const arr = (data || []) as R[];
  const converted = arr.filter((r) => r.calendar_link_clicked || r.meeting_scheduled_at).length;
  const avgScore = arr.length > 0 ? Math.round(arr.reduce((s, r) => s + safeNum(r.lead_score), 0) / arr.length) : 0;
  const qualified = arr.filter((r) => r.status === 'qualified' && safeNum(r.lead_score) >= 50).length;
  return {
    id: 6, name: 'Lead Magnets', short_name: 'Leads', icon: 'ri-download-line',
    description: 'Checklists, guides, questionnaires, outils d\'auto-évaluation, matrices, scorecards.',
    status: 'active', priority: 'high', color: '#7C3AED',
    hub_url: '/lead-magnets', hub_name: 'Lead Magnets',
    auto_generated: true, agent_name: 'KOS Lead Magnet Converter™',
    production_pipeline: { total: Math.max(arr.length, 15), in_progress: arr.filter((r) => r.pipeline_stage === 'nurturing').length, completed: converted, scheduled: 0 },
    kpis: [
      { name: 'Leads totaux', value: String(arr.length), target: '1000', icon: 'ri-user-line' },
      { name: 'Score moyen', value: String(avgScore), target: '85', icon: 'ri-percent-line' },
      { name: 'Qualifiés', value: String(qualified), target: '500', icon: 'ri-user-star-line' },
      { name: 'Convertis', value: String(converted), target: '100', icon: 'ri-calendar-check-line' },
    ],
    recent_activity: arr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.created_at || '').slice(0, 10), TODAY),
      description: `Lead ${safeStr(r.lead_category, 'général')} — Score ${safeNum(r.lead_score)} — ${safeStr(r.status, 'nouveau')}`,
      type: 'production' as const,
    })),
  };
}

function buildBlock7(): ContentBlock {
  return {
    id: 7, name: 'Études de Cas', short_name: 'Cas', icon: 'ri-folder-chart-line',
    description: 'Cas réels ou pédagogiques niveau HBR. Diagnostic → Méthodologie Khepra → Résultats.',
    status: 'active', priority: 'medium', color: '#0D7B5F',
    hub_url: '/case-studies', hub_name: 'Case Studies',
    auto_generated: false, agent_name: 'KOS Case Study Factory™ (supervisé)',
    production_pipeline: { total: 8, in_progress: 3, completed: 5, scheduled: 0 },
    kpis: [
      { name: 'Études publiées', value: '5', target: '200', icon: 'ri-folder-line' },
      { name: 'Cas en pipeline', value: '3', target: '10', icon: 'ri-timer-line' },
      { name: 'Vues moyennes', value: '1.2K', target: '5K', icon: 'ri-eye-line' },
      { name: 'Conversion', value: '22%', target: '35%', icon: 'ri-user-add-line' },
    ],
    recent_activity: [{ date: TODAY, description: 'Pipeline études de cas actif — 5 publiées, 3 en rédaction', type: 'production' }],
  };
}

async function aggregateBlock8(): Promise<ContentBlock> {
  const { data } = await supabase.from('research_reports').select('id, title, report_type, score, status, created_at').order('created_at', { ascending: false }).limit(20);
  const arr = (data || []) as R[];
  const completed = arr.filter((r) => r.status === 'completed' || r.status === 'published').length;
  const avgScore = arr.length > 0 ? Math.round(arr.reduce((s, r) => s + safeNum(r.score), 0) / arr.length) : 0;
  return {
    id: 8, name: 'Livres Blancs', short_name: 'Whitepapers', icon: 'ri-book-open-line',
    description: '20-50 pages. Benchmark international, Afrique francophone, impacts réglementaires.',
    status: arr.length > 0 ? 'active' : 'in_progress', priority: 'high', color: '#9B7B2C',
    hub_url: '/kos-research-institute', hub_name: 'Research Institute',
    auto_generated: false, agent_name: 'KOS Research Institute™ (supervisé)',
    production_pipeline: { total: Math.max(arr.length, 6), in_progress: arr.filter((r) => r.status === 'in_progress' || r.status === 'draft').length, completed, scheduled: 0 },
    kpis: [
      { name: 'Livres blancs', value: String(arr.length), target: '100', icon: 'ri-book-line' },
      { name: 'Publiés', value: String(completed), target: '100', icon: 'ri-pages-line' },
      { name: 'Score moyen', value: String(avgScore), target: '95', icon: 'ri-star-line' },
      { name: 'En rédaction', value: String(arr.filter((r) => r.status === 'in_progress').length), target: '5', icon: 'ri-quill-pen-line' },
    ],
    recent_activity: arr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.created_at || '').slice(0, 10), TODAY),
      description: `Rapport ${safeStr(r.report_type, 'recherche')} — ${safeStr(r.title, 'Sans titre').substring(0, 80)}`,
      type: 'production' as const,
    })),
  };
}

async function aggregateBlock9(): Promise<ContentBlock> {
  const { data } = await supabase.from('methodologies').select('id, methodology_name, category, usage_count, quality_score, last_updated').order('usage_count', { ascending: false });
  const arr = (data || []) as R[];
  const totalUsage = arr.reduce((s, r) => s + safeNum(r.usage_count), 0);
  const avgQuality = arr.length > 0 ? Math.round(arr.reduce((s, r) => s + safeNum(r.quality_score), 0) / arr.length) : 0;
  return {
    id: 9, name: 'Méthodologies KHEPRA', short_name: 'Frameworks', icon: 'ri-lightbulb-line',
    description: 'KHEPRA RISK™, ESG™, GOVERNANCE™, INTERNAL CONTROL™, COMPLIANCE™, DIGITAL RISK™.',
    status: arr.length > 0 ? 'active' : 'in_progress', priority: 'high', color: '#D97706',
    hub_url: '/kos-knowledge-graph', hub_name: 'Knowledge Graph',
    auto_generated: true, agent_name: 'KOS Methodology Factory™',
    production_pipeline: { total: Math.max(arr.length, 12), in_progress: 0, completed: arr.length, scheduled: 0 },
    kpis: [
      { name: 'Frameworks actifs', value: String(arr.length), target: '50', icon: 'ri-stack-line' },
      { name: 'Utilisations totales', value: String(totalUsage), target: '50K', icon: 'ri-flashlight-line' },
      { name: 'Qualité moyenne', value: String(avgQuality), target: '95', icon: 'ri-trophy-line' },
      { name: 'Catégories', value: String(new Set(arr.map((r) => r.category)).size), target: '10', icon: 'ri-folder-line' },
    ],
    recent_activity: arr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.last_updated || ''), TODAY),
      description: `${safeStr(r.methodology_name, 'Framework')} — ${safeNum(r.usage_count)} utilisations — Score ${safeNum(r.quality_score)}`,
      type: 'production' as const,
    })),
  };
}

async function aggregateBlock12(): Promise<ContentBlock> {
  const [{ data: qReport }, { data: qAgents }] = await Promise.all([
    supabase.from('kos_quality_global_report').select('*').order('created_at', { ascending: false }).limit(1),
    supabase.from('kos_quality_agents').select('id, agent_name, status, score, last_scan_at').order('last_scan_at', { ascending: false }),
  ]);
  const latest = ((qReport || []) as R[])[0] || {};
  const agents = (qAgents || []) as R[];
  const totalErrors = safeNum(latest.total_errors);
  const errorsFixed = safeNum(latest.errors_fixed);
  const globalScore = safeNum(latest.global_score, agents.length > 0 ? Math.round(agents.reduce((s, r) => s + safeNum(r.score), 0) / agents.length * 10) / 10 : 9.8);
  return {
    id: 12, name: 'Contrôle Qualité', short_name: 'Qualité', icon: 'ri-check-double-line',
    description: '8 points avant publication. Score ≥ 95/100 requis.',
    status: 'active', priority: 'critical', color: '#BE123C',
    hub_url: '/kos-quality-excellence-command', hub_name: 'Quality Excellence Command',
    auto_generated: true, agent_name: 'KOS Quality Assurance Authority™',
    production_pipeline: { total: Math.max(totalErrors, 10), in_progress: Math.max(totalErrors - errorsFixed, 0), completed: errorsFixed, scheduled: 0 },
    kpis: [
      { name: 'Score qualité global', value: String(globalScore), target: '9.5', icon: 'ri-star-fill' },
      { name: 'Erreurs totales', value: String(totalErrors), target: '0', icon: 'ri-error-warning-line' },
      { name: 'Erreurs corrigées', value: String(errorsFixed), target: String(totalErrors), icon: 'ri-check-line' },
      { name: 'Agents qualité', value: String(agents.filter((r) => r.status === 'active').length), target: '12', icon: 'ri-shield-check-line' },
    ],
    recent_activity: agents.slice(0, 3).map((r) => ({
      date: safeStr(String(r.last_scan_at || '').slice(0, 10), TODAY),
      description: `Agent ${safeStr(r.agent_name, 'Qualité')} — Score ${safeNum(r.score)}/100`,
      type: 'production' as const,
    })),
  };
}

async function aggregateBlock13(): Promise<ContentBlock> {
  const [{ data: tickets }, { data: siData }] = await Promise.all([
    supabase.from('kos_auto_correction_tickets').select('id, status, auto_fix_success, resolution_type, created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('self_improvement').select('id, target_system, implementation_status, created_at').order('created_at', { ascending: false }).limit(20),
  ]);
  const tArr = (tickets || []) as R[];
  const sArr = (siData || []) as R[];
  const resolved = tArr.filter((r) => r.status === 'resolved').length;
  const autoFixed = tArr.filter((r) => r.auto_fix_success).length;
  const pending = tArr.filter((r) => r.status === 'open' || r.status === 'in_progress').length;
  return {
    id: 13, name: 'Auto-Validation', short_name: 'Validation', icon: 'ri-sparkling-line',
    description: 'Conformité → Score ≥ 95 → APPROUVÉ. Sinon corrections auto jusqu\'à validation.',
    status: 'active', priority: 'critical', color: '#059669',
    hub_url: '/kos-corrective-execution-engine', hub_name: 'Corrective Execution Engine',
    auto_generated: true, agent_name: 'KOS Self-Improvement Engine™',
    production_pipeline: { total: tArr.length, in_progress: pending, completed: resolved, scheduled: 0 },
    kpis: [
      { name: 'Tickets totaux', value: String(tArr.length), target: '—', icon: 'ri-ticket-line' },
      { name: 'Résolus', value: String(resolved), target: String(tArr.length), icon: 'ri-check-double-line' },
      { name: 'Auto-fixés', value: String(autoFixed), target: String(tArr.length), icon: 'ri-tools-line' },
      { name: 'Boucles self-improve', value: String(sArr.length), target: '6', icon: 'ri-loop-left-line' },
    ],
    recent_activity: tArr.slice(0, 3).map((r) => ({
      date: safeStr(String(r.created_at || '').slice(0, 10), TODAY),
      description: `Ticket ${safeStr(r.status, 'ouvert')} — ${safeStr(r.resolution_type, 'En attente')} ${r.auto_fix_success ? '✅ Auto-fixé' : ''}`,
      type: (r.auto_fix_success ? 'milestone' : 'alert') as const,
    })),
  };
}

/** Reconstruit l'overview à partir des 13 blocs actuels */
function rebuildOverview(blocks: ContentBlock[]): Partial<ContentFactoryOverview> {
  const get = (id: number) => blocks.find(b => b.id === id) || blocks[0];
  const b1 = get(1), b2 = get(2), b4 = get(4), b5 = get(5), b6 = get(6), b8 = get(8), b9 = get(9), b12 = get(12), b13 = get(13);

  const alertsCritical = safeNum(b1.kpis[2]?.value);
  const totalAlerts = safeNum(b1.kpis[3]?.value);
  const qualityScore = safeNum(b12.kpis[0]?.value);
  const totalErrorsQ = safeNum(b12.kpis[1]?.value);
  const errorsFixedQ = safeNum(b12.kpis[2]?.value);

  return {
    global_kpis: [
      { name: 'Articles experts (cible 1 000)', value: b5.kpis[3]?.value || '0', target: '1 000', progress: Math.round(safeNum(b5.kpis[3]?.value) / 10) / 100, icon: 'ri-article-line' },
      { name: 'Études de cas (cible 200)', value: '5', target: '200', progress: 2.5, icon: 'ri-folder-chart-line' },
      { name: 'Livres blancs (cible 100)', value: b8.kpis[0]?.value || '0', target: '100', progress: safeNum(b8.kpis[0]?.value), icon: 'ri-book-open-line' },
      { name: 'Lead Magnets (cible 500)', value: b6.kpis[0]?.value || '0', target: '500', progress: Math.round(safeNum(b6.kpis[0]?.value) / 5) / 100, icon: 'ri-download-line' },
      { name: 'Référentiels (cible 50)', value: b9.kpis[0]?.value || '0', target: '50', progress: safeNum(b9.kpis[0]?.value) * 2, icon: 'ri-lightbulb-line' },
      { name: 'Mots-clés Top 3 (cible 10K)', value: b2.kpis[3]?.value || '0', target: '10 000', progress: 0.5, icon: 'ri-key-2-line' },
    ],
    production_velocity: { daily: 2.3, weekly: 9, monthly: 38, trend: 24 },
    quality_gate: { threshold: 95, current_avg: qualityScore, passed: errorsFixedQ, failed: totalErrorsQ - errorsFixedQ },
    cross_canal_pipeline: { blog: safeNum(b5.kpis[3]?.value), linkedin: safeNum(b4.kpis[0]?.value), x: safeNum(b4.kpis[1]?.value), newsletter: 4, lead_magnets: safeNum(b6.kpis[0]?.value) },
    alerts: { critical: alertsCritical, high: alertsCritical, medium: Math.max(totalAlerts - alertsCritical * 2, 0), low: 3 },
  };
}

// ═══════════════════════════════
// HOOK PRINCIPAL
// ═══════════════════════════════

export function useContentFactoryCommand() {
  const [state, setState] = useState<ContentFactoryState>({
    blocks: [],
    overview: CONTENT_FACTORY_OVERVIEW,
    loading: true,
    error: null,
    source: 'mock',
    blockLoading: {},
  });

  const [pipelineState, setPipelineState] = useState<PipelineState>({
    mode: 'idle',
    steps: PIPELINE_STEPS.map(s => ({ ...s, status: 'pending' as const })),
    currentStepIndex: -1,
    startedAt: null,
    completedAt: null,
  });

  /** Applique un bloc (ou paire) mis à jour dans le state */
  const applyBlockUpdate = useCallback((...newBlocks: ContentBlock[]) => {
    setState((prev) => {
      const u = [...prev.blocks];
      newBlocks.forEach((b) => {
        const i = u.findIndex(x => x.id === b.id);
        if (i >= 0) u[i] = b; else u.push(b);
      });
      const bl = { ...prev.blockLoading };
      newBlocks.forEach((b) => { delete bl[b.id]; });
      const ovPatch = rebuildOverview(u);
      return { ...prev, blocks: u, overview: { ...prev.overview, ...ovPatch }, blockLoading: bl };
    });
  }, []);

  /** Applique des blocs sur un tableau existant (version pure — retourne un nouveau tableau) */
  function applyBlocksUpdate(existing: ContentBlock[], ...newBlocks: ContentBlock[]): ContentBlock[] {
    const u = [...existing];
    newBlocks.forEach((b) => {
      const i = u.findIndex(x => x.id === b.id);
      if (i >= 0) u[i] = b; else u.push(b);
    });
    return u;
  }

  /** Exécution complète — 10 appels parallèles → 13 blocs */
  const refreshAll = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const results = await Promise.all([
        aggregateBlock1(),
        aggregateSeoBlocks(),
        aggregateGeoBlocks(),
        aggregateBlock4(),
        aggregateBlock5(),
        aggregateBlock6(),
        aggregateBlock8(),
        aggregateBlock9(),
        aggregateBlock12(),
        aggregateBlock13(),
      ]);

      const b1 = results[0];
      const { block2, block10 } = results[1];
      const { block3, block11 } = results[2];
      const b4 = results[3];
      const b5 = results[4];
      const b6 = results[5];
      const b7 = buildBlock7();
      const b8 = results[6];
      const b9 = results[7];
      const b12 = results[8];
      const b13 = results[9];

      const blocks: ContentBlock[] = [b1, block2, block3, b4, b5, b6, b7, b8, b9, block10, block11, b12, b13];
      const ovPatch = rebuildOverview(blocks);

      setState((prev) => ({
        ...prev,
        blocks,
        overview: { ...prev.overview, ...ovPatch },
        loading: false,
        error: null,
        source: 'live',
        blockLoading: {},
      }));

      try {
        await supabase.from('kos_unified_global_state').upsert({
          component: 'content_factory',
          global_score: safeNum(b12.kpis[0].value, 9.2),
          target_score: 9.5,
          layers: { blocks, overview: { ...CONTENT_FACTORY_OVERVIEW, ...ovPatch } },
          core_web_vitals: {},
          generated_at: NOW,
        }, { onConflict: 'component' });
      } catch (_) { /* silencieux */ }
    } catch (err) {
      console.warn('[useContentFactoryCommand] Full refresh failed, using mock:', (err as Error)?.message);
      setState((prev) => ({
        ...prev,
        blocks: CONTENT_FACTORY_BLOCKS,
        overview: CONTENT_FACTORY_OVERVIEW,
        loading: false,
        error: null,
        source: 'mock',
        blockLoading: {},
      }));
    }
  }, []);

  /** Rafraîchit un seul bloc (ou la paire SEO/GEO) */
  const refreshBlock = useCallback(async (blockId: number) => {
    const blockIds: number[] = [blockId];
    if (blockId === 2) blockIds.push(10);
    if (blockId === 10) blockIds.push(2);
    if (blockId === 3) blockIds.push(11);
    if (blockId === 11) blockIds.push(3);

    setState((prev) => {
      const nl = { ...prev.blockLoading };
      blockIds.forEach((id) => { nl[id] = true; });
      return { ...prev, blockLoading: nl };
    });

    try {
      switch (blockId) {
        case 1: {
          const b = await aggregateBlock1();
          applyBlockUpdate(b);
          break;
        }
        case 2: case 10: {
          const { block2, block10 } = await aggregateSeoBlocks();
          applyBlockUpdate(block2, block10);
          break;
        }
        case 3: case 11: {
          const { block3, block11 } = await aggregateGeoBlocks();
          applyBlockUpdate(block3, block11);
          break;
        }
        case 4: {
          const b = await aggregateBlock4();
          applyBlockUpdate(b);
          break;
        }
        case 5: {
          const b = await aggregateBlock5();
          applyBlockUpdate(b);
          break;
        }
        case 6: {
          const b = await aggregateBlock6();
          applyBlockUpdate(b);
          break;
        }
        case 7: {
          applyBlockUpdate(buildBlock7());
          break;
        }
        case 8: {
          const b = await aggregateBlock8();
          applyBlockUpdate(b);
          break;
        }
        case 9: {
          const b = await aggregateBlock9();
          applyBlockUpdate(b);
          break;
        }
        case 12: {
          const b = await aggregateBlock12();
          applyBlockUpdate(b);
          break;
        }
        case 13: {
          const b = await aggregateBlock13();
          applyBlockUpdate(b);
          break;
        }
        default: {
          setState((prev) => { const nl = { ...prev.blockLoading }; delete nl[blockId]; return { ...prev, blockLoading: nl }; });
        }
      }
    } catch (err) {
      console.warn(`[useContentFactoryCommand] Block ${blockId} refresh failed:`, (err as Error)?.message);
      setState((prev) => {
        const nl = { ...prev.blockLoading };
        blockIds.forEach((id) => { delete nl[id]; });
        return { ...prev, blockLoading: nl };
      });
    }
  }, [applyBlockUpdate]);

  /** Rafraîchit plusieurs blocs en parallèle (déduplication automatique) */
  const refreshMultipleBlocks = useCallback(async (blockIds: number[]) => {
    // Dédupliquer et résoudre les paires SEO/GEO
    const resolvedIds = new Set<number>();
    blockIds.forEach((id) => {
      resolvedIds.add(id);
      if (id === 2) resolvedIds.add(10);
      if (id === 10) resolvedIds.add(2);
      if (id === 3) resolvedIds.add(11);
      if (id === 11) resolvedIds.add(3);
    });

    setState((prev) => {
      const nl = { ...prev.blockLoading };
      resolvedIds.forEach((id) => { nl[id] = true; });
      return { ...prev, blockLoading: nl };
    });

    try {
      // Regrouper par source de données pour éviter les queries dupliquées
      const needsBlock1 = resolvedIds.has(1);
      const needsSeo = resolvedIds.has(2) || resolvedIds.has(10);
      const needsGeo = resolvedIds.has(3) || resolvedIds.has(11);
      const needsBlock4 = resolvedIds.has(4);
      const needsBlock5 = resolvedIds.has(5);
      const needsBlock6 = resolvedIds.has(6);
      const needsBlock7 = resolvedIds.has(7);
      const needsBlock8 = resolvedIds.has(8);
      const needsBlock9 = resolvedIds.has(9);
      const needsBlock12 = resolvedIds.has(12);
      const needsBlock13 = resolvedIds.has(13);

      const updates: ContentBlock[] = [];

      const tasks: Promise<void>[] = [];

      if (needsBlock1) tasks.push(aggregateBlock1().then(b => updates.push(b)));
      if (needsSeo) tasks.push(aggregateSeoBlocks().then(({ block2, block10 }) => { updates.push(block2, block10); }));
      if (needsGeo) tasks.push(aggregateGeoBlocks().then(({ block3, block11 }) => { updates.push(block3, block11); }));
      if (needsBlock4) tasks.push(aggregateBlock4().then(b => updates.push(b)));
      if (needsBlock5) tasks.push(aggregateBlock5().then(b => updates.push(b)));
      if (needsBlock6) tasks.push(aggregateBlock6().then(b => updates.push(b)));
      if (needsBlock7) tasks.push(Promise.resolve(buildBlock7()).then(b => updates.push(b)));
      if (needsBlock8) tasks.push(aggregateBlock8().then(b => updates.push(b)));
      if (needsBlock9) tasks.push(aggregateBlock9().then(b => updates.push(b)));
      if (needsBlock12) tasks.push(aggregateBlock12().then(b => updates.push(b)));
      if (needsBlock13) tasks.push(aggregateBlock13().then(b => updates.push(b)));

      await Promise.all(tasks);

      setState((prev) => {
        const u = [...prev.blocks];
        updates.forEach((b) => {
          const i = u.findIndex(x => x.id === b.id);
          if (i >= 0) u[i] = b; else u.push(b);
        });
        const bl = { ...prev.blockLoading };
        updates.forEach((b) => { delete bl[b.id]; });
        const ovPatch = rebuildOverview(u);
        return { ...prev, blocks: u, overview: { ...prev.overview, ...ovPatch }, blockLoading: bl };
      });
    } catch (err) {
      console.warn(`[useContentFactoryCommand] Batch refresh failed:`, (err as Error)?.message);
      setState((prev) => {
        const nl = { ...prev.blockLoading };
        resolvedIds.forEach((id) => { delete nl[id]; });
        return { ...prev, blockLoading: nl };
      });
    }
  }, []);

  /** Exécution séquentielle — lance les blocs 1→2→3→... étape par étape avec pipeline visuel */
  const refreshSequential = useCallback(async () => {
    const initialSteps: PipelineStep[] = PIPELINE_STEPS.map(s => ({ ...s, status: 'pending' as const }));
    setPipelineState({
      mode: 'running',
      steps: initialSteps,
      currentStepIndex: -1,
      startedAt: new Date().toISOString(),
      completedAt: null,
    });

    let allUpdated: ContentBlock[] = [...state.blocks];

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      const step = PIPELINE_STEPS[i];

      // Marquer l'étape comme running
      setPipelineState(prev => {
        const ns = [...prev.steps];
        ns[i] = { ...ns[i], status: 'running' };
        return { ...prev, steps: ns, currentStepIndex: i };
      });

      // Marquer visuellement les blocs en cours
      setState(prev => {
        const nl = { ...prev.blockLoading };
        step.blockIds.forEach(id => { nl[id] = true; });
        return { ...prev, blockLoading: nl };
      });

      try {
        const firstId = step.blockIds[0];
        switch (firstId) {
          case 1: {
            const b = await aggregateBlock1();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 2: {
            const { block2, block10 } = await aggregateSeoBlocks();
            allUpdated = applyBlocksUpdate(allUpdated, block2, block10);
            break;
          }
          case 3: {
            const { block3, block11 } = await aggregateGeoBlocks();
            allUpdated = applyBlocksUpdate(allUpdated, block3, block11);
            break;
          }
          case 4: {
            const b = await aggregateBlock4();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 5: {
            const b = await aggregateBlock5();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 6: {
            const b = await aggregateBlock6();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 7: {
            allUpdated = applyBlocksUpdate(allUpdated, buildBlock7());
            break;
          }
          case 8: {
            const b = await aggregateBlock8();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 9: {
            const b = await aggregateBlock9();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 12: {
            const b = await aggregateBlock12();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          case 13: {
            const b = await aggregateBlock13();
            allUpdated = applyBlocksUpdate(allUpdated, b);
            break;
          }
          default: break;
        }

        // Marquer l'étape comme completed après succès
        setPipelineState(prev => {
          const ns = [...prev.steps];
          ns[i] = { ...ns[i], status: 'completed' };
          return { ...prev, steps: ns };
        });

        // Mettre à jour le state des blocs
        const ovPatch = rebuildOverview(allUpdated);
        setState(prev => {
          const nl = { ...prev.blockLoading };
          step.blockIds.forEach(id => { delete nl[id]; });
          return { ...prev, blocks: allUpdated, overview: { ...prev.overview, ...ovPatch }, blockLoading: nl, source: 'live' };
        });

      } catch (err) {
        const firstIdFailed = step.blockIds[0];
        console.warn(`[useContentFactoryCommand] Pipeline step ${firstIdFailed} failed:`, (err as Error)?.message);
        setPipelineState(prev => {
          const ns = [...prev.steps];
          ns[i] = { ...ns[i], status: 'failed' };
          return { ...prev, steps: ns };
        });
        setState(prev => {
          const nl = { ...prev.blockLoading };
          step.blockIds.forEach(id => { delete nl[id]; });
          return { ...prev, blockLoading: nl };
        });
      }
    }

    // Pipeline terminé
    setPipelineState(prev => ({
      ...prev,
      mode: 'completed',
      completedAt: new Date().toISOString(),
    }));

    // Persister le snapshot global
    try {
      await supabase.from('kos_unified_global_state').upsert({
        component: 'content_factory',
        global_score: safeNum(allUpdated.find(b => b.id === 12)?.kpis[0]?.value, 9.2),
        target_score: 9.5,
        layers: { blocks: allUpdated, overview: rebuildOverview(allUpdated) },
        core_web_vitals: {},
        generated_at: NOW,
      }, { onConflict: 'component' });
    } catch (_) { /* silencieux */ }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.blocks]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return { ...state, pipelineState, refresh: refreshAll, refreshBlock, refreshMultipleBlocks, refreshSequential, refreshAll };
}



