import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { marked } from 'marked';
import ExecutiveBoardMemo from '@/pages/home/components/ExecutiveBoardMemo';
import { REGULATORY_KEYWORD_DOMAINS, ALL_KEYWORDS, type KeywordDomain, type RegulatoryKeyword } from '@/mocks/kosRegulatoryKeywords';

interface RAGResponse {
  answer: string;
  sources: Array<{
    title: string;
    regulator: string;
    tier: string;
    calibratedScore: number;
    citationCount: number;
    bigFourSummary: string;
    citations: string[];
    vScore?: number;
    fScore?: number;
    riskLevel?: string;
    applicability?: string;
    authorityIndex?: number;
    priorityBoost?: number;
    confidenceBreakdown?: {
      semantic: number;
      authority: number;
      citation_density: number;
      jurisdiction: number;
      freshness: number;
    } | null;
  }>;
  audit_id: string;
  engine: string;
  pipeline: string;
  answeredByLLM: boolean;
  latency_ms?: number;
  orchestration?: {
    lead_agent: string;
    agents_activated: string[];
    domains_analyzed: string[];
    total_agents: number;
    total_domains: number;
  };
  qa_validation?: {
    overall_score: number;
    verdict: string;
    checks_passed: number;
    checks_total: number;
  };
  v4Synthesis?: {
    regulators: string;
    key_obligations: string[];
    dates: string[];
    analysis_level: string;
    external_api_calls: number;
    high_confidence_count?: number;
    medium_confidence_count?: number;
    low_confidence_count?: number;
    jurisdictions?: string;
    objectif?: string;
  };
}

const TIER_STYLES: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  Gold: { bg: 'rgba(212,175,55,0.12)', border: 'rgba(212,175,55,0.3)', color: '#B8860B', icon: 'ri-vip-crown-line' },
  Silver: { bg: 'rgba(134,188,37,0.10)', border: 'rgba(134,188,37,0.25)', color: '#5C8A11', icon: 'ri-shield-star-line' },
  Bronze: { bg: 'rgba(205,127,50,0.10)', border: 'rgba(205,127,50,0.25)', color: '#8B5E24', icon: 'ri-shield-line' },
  Raw: { bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.08)', color: '#666', icon: 'ri-file-text-line' },
};

// ─── Build keyword lookup map ───
const KEYWORD_MAP = new Map<string, RegulatoryKeyword>();
ALL_KEYWORDS.forEach((k) => KEYWORD_MAP.set(k.id, k));

export default function KOSAIChatSection() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState<RAGResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [currentEngine, setCurrentEngine] = useState('');
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ─── Keyword dropdown state ───
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<Set<string>>(new Set());
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(REGULATORY_KEYWORD_DOMAINS.map((d) => d.id)));

  // ─── Close dropdown on outside click ───
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [dropdownOpen]);

  // ─── Build query from selected keywords ───
  const buildQuery = useCallback((): string => {
    const keywords: string[] = [];
    selectedKeywordIds.forEach((id) => {
      const kw = KEYWORD_MAP.get(id);
      if (kw) keywords.push(kw.keyword);
    });
    return keywords.join(' · ');
  }, [selectedKeywordIds]);

  // ─── Toggle keyword selection ───
  const toggleKeyword = useCallback((id: string) => {
    setSelectedKeywordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // ─── Remove a keyword chip ───
  const removeKeyword = useCallback((id: string) => {
    setSelectedKeywordIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // ─── Toggle domain expansion ───
  const toggleDomain = useCallback((domainId: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domainId)) {
        next.delete(domainId);
      } else {
        next.add(domainId);
      }
      return next;
    });
  }, []);

  // ─── Clear all selected keywords ───
  const clearKeywords = useCallback(() => {
    setSelectedKeywordIds(new Set());
  }, []);

  // ─── Filtered domains based on search ───
  const filteredDomains = useMemo(() => {
    if (!searchFilter.trim()) return REGULATORY_KEYWORD_DOMAINS;
    const lower = searchFilter.toLowerCase();
    return REGULATORY_KEYWORD_DOMAINS
      .map((domain) => ({
        ...domain,
        keywords: domain.keywords.filter(
          (k) =>
            k.keyword.toLowerCase().includes(lower) ||
            domain.labelFr.toLowerCase().includes(lower) ||
            domain.id.toLowerCase().includes(lower)
        ),
      }))
      .filter((d) => d.keywords.length > 0);
  }, [searchFilter]);

  // ─── Domain accent color ───
  const domainAccentClasses: Record<string, string> = {
    lcbft: 'border-red-400 bg-red-50 text-red-700',
    gouvernance: 'border-amber-400 bg-amber-50 text-amber-700',
    controle_interne: 'border-emerald-400 bg-emerald-50 text-emerald-700',
    bceao: 'border-cyan-400 bg-cyan-50 text-cyan-700',
    cobac: 'border-teal-400 bg-teal-50 text-teal-700',
    agrement: 'border-orange-400 bg-orange-50 text-orange-700',
    risque: 'border-rose-400 bg-rose-50 text-rose-700',
    conformite: 'border-indigo-400 bg-indigo-50 text-indigo-700',
    microfinance: 'border-lime-400 bg-lime-50 text-lime-700',
    cybersecurite: 'border-violet-400 bg-violet-50 text-violet-700',
    esg: 'border-green-400 bg-green-50 text-green-700',
    prix_transfert: 'border-sky-400 bg-sky-50 text-sky-700',
  };

  const domainAccentBorder: Record<string, string> = {
    lcbft: 'border-red-300',
    gouvernance: 'border-amber-300',
    controle_interne: 'border-emerald-300',
    bceao: 'border-cyan-300',
    cobac: 'border-teal-300',
    agrement: 'border-orange-300',
    risque: 'border-rose-300',
    conformite: 'border-indigo-300',
    microfinance: 'border-lime-300',
    cybersecurite: 'border-violet-300',
    esg: 'border-green-300',
    prix_transfert: 'border-sky-300',
  };

  // ─── Main ask flow — multi-tier cascade ───
  const ask = useCallback(async () => {
    const query = buildQuery();
    if (!query.trim()) return;
    setQ(query);
    setDropdownOpen(false);
    setLoading(true);
    setError(null);
    setAnswer(null);
    setShowLead(false);
    setCurrentEngine('');
    setExpandedSource(null);

    // ─── NaN SAFETY HELPER ───
    const safeNum = (v: any, fallback: number = 0): number => {
      if (v === null || v === undefined) return fallback;
      const n = Number(v);
      return (isNaN(n) || !isFinite(n)) ? fallback : n;
    };

    // TIER 0: rag-universal — Big Four Action Artefact + Domain-Lock + Evidence Chain
    try {
      setCurrentEngine('RAG Universal v9 — Domain-Lock Big Four');
      const { data: v9Data, error: v9Err } = await supabase.functions.invoke('rag-universal', {
        body: { query, lang: isEn ? 'en' : 'fr' },
      });

      const isDomainLockError = v9Data && v9Data.error && String(v9Data.error).includes('DOMAIN_LOCK_REJECTED');
      if (v9Err || isDomainLockError) {
        console.warn('v9 domain-lock or error:', v9Data?.error || v9Err?.message);
      } else if (v9Data && !v9Data.error && v9Data.answer && v9Data.answer.length > 80) {
        const v9Sources = (v9Data.sources || []).map((s: any) => ({
          title: s.title || 'Document réglementaire',
          regulator: s.regulator || 'KHEPRA',
          tier: (s.jurisdiction_tier ?? 99) <= 1 ? 'Gold' : (s.jurisdiction_tier ?? 99) === 2 ? 'Silver' : 'Bronze',
          calibratedScore: safeNum(s.confidence || s.score, 0) / 100,
          citationCount: s.confidence_breakdown?.citation_density || 0,
          bigFourSummary: s.content_snippet || '',
          citations: s.retrieval_reasons || [],
          vScore: safeNum(s.v_score, 0) / 100,
          fScore: safeNum(s.f_score, 0) / 100,
          riskLevel: s.risk_level || 'Low',
          applicability: s.applicability || 'Reference',
          authorityIndex: s.authority_index || 0,
          priorityBoost: s.priority_boost || 0,
          confidenceBreakdown: s.confidence_breakdown || null,
          docDomain: s.doc_domain || '',
          docDomainMatch: s.doc_domain_match ?? true,
        }));
        setAnswer({
          answer: v9Data.answer,
          sources: v9Sources,
          audit_id: `KOS-BFv9-${Date.now()}`,
          engine: 'RAG Universal v9 — Domain-Lock Big Four Artefact',
          pipeline: '10 Actions → Domain Detection (accent-tolerant) → Domain-Lock Validation → Evidence Chain → Domain Boost Ranking',
          answeredByLLM: true,
          latency_ms: v9Data.latency_ms,
          query_domain: v9Data.query_domain || 'general',
          query_domain_label: v9Data.query_domain_label || (isEn ? 'Regulatory Intelligence' : 'Intelligence Réglementaire'),
          domain_locked: v9Data.domain_locked ?? true,
          domain_validation: v9Data.domain_validation || null,
          qa_validation: v9Data.big_four_artefact?.kpi_report ? {
            overall_score: v9Data.big_four_artefact.kpi_report.confidence_avg,
            verdict: v9Data.big_four_artefact.kpi_report.confidence_avg >= 85 ? 'pass' : 'pass_with_notes',
            checks_passed: v9Data.big_four_artefact.kpi_report.confidence_avg >= 85 ? 8 : 6,
            checks_total: 10,
          } : undefined,
        } as any);
        if (v9Sources.length > 0) setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    // TIER 1: rag-universal (fallback with top_k)
    try {
      setCurrentEngine('RAG Universal v9 (LLM)');
      const { data: v9Data, error: v9Err } = await supabase.functions.invoke('rag-universal', {
        body: { query, top_k: 5, lang: isEn ? 'en' : 'fr' },
      });
      if (!v9Err && v9Data && !v9Data.error && v9Data.answer && v9Data.answer.length > 80) {
        const sources = (v9Data.sources || []).map((s: any) => ({
          title: s.title || 'Document réglementaire',
          regulator: s.regulator || 'KHEPRA',
          tier: 'Silver',
          calibratedScore: safeNum(s.score, 0),
          citationCount: 0,
          bigFourSummary: s.big_four_summary || '',
          citations: [],
        }));
        setAnswer({
          answer: v9Data.answer, sources,
          audit_id: `KOS-RAGv9-${Date.now()}`,
          engine: 'RAG Universal v9',
          pipeline: 'BGE-M3 → Hybrid(HNSW+BM25+RRF) → BGE-Reranker → Llama-70B-KHEPRA-FT',
          answeredByLLM: true,
        });
        if (sources.length > 0) setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    // TIER 2: KOS COGNITIVE OS — Master Block III
    try {
      setCurrentEngine('KOS COGNITIVE OS (11-Étapes)');
      const { data: mb3Data, error: mb3Err } = await supabase.rpc('kos_orchestrate_query_master_block_iii', {
        p_query: query, p_max_docs: 20,
      });
      if (!mb3Err && mb3Data && mb3Data.answer && mb3Data.answer.length > 80) {
        setAnswer({
          answer: mb3Data.answer, sources: [],
          audit_id: `KOS-COS-${Date.now()}`,
          engine: 'KOS COGNITIVE OS',
          pipeline: '11-Step Cycle → 5-Layer Memory → 16 Agents → 11-Rubric Analysis → 8-KPI Evaluation',
          answeredByLLM: true,
          latency_ms: mb3Data.latency_ms,
          orchestration: mb3Data.orchestration || { lead_agent: 'KOS-Executive-Orchestrator', agents_activated: [], domains_analyzed: [], total_agents: 0, total_domains: 0 },
          qa_validation: mb3Data.qa_validation || { overall_score: 0, verdict: 'pending', checks_passed: 0, checks_total: 8 },
        });
        setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    // TIER 3: Master Block II
    try {
      setCurrentEngine('MASTER BLOCK II (16 Agents)');
      const { data: mb2Data, error: mb2Err } = await supabase.rpc('kos_orchestrate_query_master_block_ii', {
        p_query: query, p_max_docs_per_domain: 5, p_generate_think_tank: false,
      });
      if (!mb2Err && mb2Data && mb2Data.answer && mb2Data.answer.length > 80) {
        setAnswer({
          answer: mb2Data.answer, sources: [],
          audit_id: `KOS-MB2-${Date.now()}`,
          engine: 'KOS MASTER BLOCK II',
          pipeline: 'Executive Orchestrator → 9-Step Cycle → Multi-Agent Analysis → QA Gate',
          answeredByLLM: true,
          latency_ms: mb2Data.latency_ms,
          orchestration: mb2Data.orchestration || { lead_agent: 'KOS-Executive-Orchestrator', agents_activated: [], domains_analyzed: [], total_agents: 0, total_domains: 0 },
          qa_validation: mb2Data.qa_validation || { overall_score: 0, verdict: 'pending', checks_passed: 0, checks_total: 9 },
        });
        setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    // TIER 4: MC-PRECISION-V4
    try {
      setCurrentEngine('MC-PRECISION-V4 (Agent LLM)');
      const { data: v4Data, error: v4Err } = await supabase.rpc('kos_rag_query_internal_v4', {
        p_query: query, p_top_k: 5, p_regulator: null, p_generate_synthesis: true,
      });
      if (!v4Err && v4Data && v4Data.sources && v4Data.sources.length > 0) {
        const rawSources = v4Data.sources as Array<{ id: string; title: string; regulator: string; score: number; v_score: number; f_score: number; big_four_summary: string; content_snippet: string }>;
        const tierFromScore = (s: number) => safeNum(s, 0) >= 0.50 ? 'Gold' : safeNum(s, 0) >= 0.40 ? 'Silver' : safeNum(s, 0) >= 0.30 ? 'Bronze' : 'Raw';
        const sources = rawSources.map((s) => ({
          title: s.title || 'Document réglementaire', regulator: s.regulator || 'KHEPRA',
          tier: tierFromScore(s.score), calibratedScore: safeNum(s.score, 0), citationCount: 0,
          bigFourSummary: s.big_four_summary || s.content_snippet || '', citations: [],
          vScore: safeNum(s.v_score, 0), fScore: safeNum(s.f_score, 0),
        }));
        setAnswer({
          answer: v4Data.answer || (isEn ? 'No synthesis generated.' : 'Aucune synthèse générée.'), sources,
          audit_id: `KOS-V4-${Date.now()}`, engine: 'MC-PRECISION-V4',
          pipeline: '75 Keywords + Semantic Expansion + Hybrid (V=0.45 + F=0.40 + M=0.15) + Agent LLM',
          answeredByLLM: true, latency_ms: v4Data.latency_ms,
          v4Synthesis: {
            regulators: v4Data.regulators || '', key_obligations: v4Data.key_obligations || [],
            dates: v4Data.dates || [], analysis_level: v4Data.analysis_level || 'Big Four Grade',
            external_api_calls: v4Data.external_api_calls ?? 0,
            high_confidence_count: v4Data.high_confidence_count ?? 0,
            medium_confidence_count: v4Data.medium_confidence_count ?? 0,
            low_confidence_count: v4Data.low_confidence_count ?? 0,
            jurisdictions: v4Data.jurisdictions || '', objectif: v4Data.objectif || '',
          },
        });
        if (sources.length > 0) setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    // TIER 5: Legacy
    try {
      setCurrentEngine('MC-INTERNAL-150 (Legacy)');
      const { data: internalData, error: internalErr } = await supabase.rpc('kos_rag_query_internal', { p_query: query, p_top_k: 5 });
      if (!internalErr && internalData && internalData.sources && internalData.sources.length > 0) {
        const sources = internalData.sources.map((s: any) => ({
          title: s.title || 'Document réglementaire', regulator: s.regulator || 'KHEPRA',
          tier: 'Raw', calibratedScore: safeNum(s.score, 0), citationCount: 0,
          bigFourSummary: s.big_four_summary || '', citations: [],
        }));
        const answerText = sources.map((s: any) => `**${s.title}**\n${s.bigFourSummary || ''}`).join('\n\n');
        setAnswer({
          answer: answerText || (isEn ? 'No documents found.' : 'Aucun document trouvé.'), sources,
          audit_id: `KOS-LEGACY-${Date.now()}`, engine: 'MC-SEMANTIC-INTERNAL-150',
          pipeline: 'Vector(HNSW) → Basic Scoring', answeredByLLM: false,
        });
        if (sources.length > 0) setShowLead(true);
        setLoading(false);
        return;
      }
    } catch { /* fall through */ }

    setError(isEn ? 'Unable to retrieve results. Please try a different query.' : 'Impossible de récupérer des résultats. Veuillez essayer une autre requête.');
    setLoading(false);
  }, [buildQuery, isEn]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && selectedKeywordIds.size > 0) ask();
  };

  const answerHtml = useMemo(() => {
    if (!answer?.answer) return '';
    return marked.parse(answer.answer, { breaks: true }) as string;
  }, [answer?.answer]);

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [answer]);

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get('company_alt');
    if (honeypot && String(honeypot).trim()) {
      setFormStatus('success');
      form.reset();
      return;
    }
    formData.delete('company_alt');
    try {
      const res = await fetch('https://readdy.ai/api/form/d94pk6l568obap8dbccg', {
        method: 'POST', body: formData,
      });
      const responseText = await res.text();
      let parsed: any;
      try { parsed = JSON.parse(responseText); } catch { parsed = null; }
      const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;
      if (res.ok && parsed?.code === 'OK') {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
        setFormError(serverMsg.includes('spam') || serverMsg.includes('form data is spam')
          ? (isEn ? 'Submission blocked. Please try again.' : 'Soumission bloquée. Veuillez réessayer.')
          : serverMsg || (isEn ? 'Submission failed' : 'Échec de la soumission'));
      }
    } catch (err: any) {
      setFormStatus('error');
      setFormError(err.message || (isEn ? 'Network error' : 'Erreur réseau'));
    }
  };

  // ─── Count keywords per domain ───
  const selectedPerDomain = useMemo(() => {
    const counts: Record<string, number> = {};
    selectedKeywordIds.forEach((id) => {
      const kw = KEYWORD_MAP.get(id);
      if (kw) {
        counts[kw.domain] = (counts[kw.domain] || 0) + 1;
      }
    });
    return counts;
  }, [selectedKeywordIds]);

  return (
    <section id="kos-ai-chat" className="relative py-16 sm:py-24 bg-background-50 border-y border-background-200">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500/70 via-primary-500/40 to-accent-500/70" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — light, communicatif */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Badge épuré */}
          <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full bg-accent-100/70 border border-accent-200/70">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-700">
              {isEn ? 'KOS Cognitive OS · 100% Sovereign · Zero External API' : 'KOS Cognitive OS · 100% Souverain · Zéro API Externe'}
            </span>
          </div>

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 mb-5 max-w-4xl mx-auto leading-[1.15] tracking-tight">
            <span className="block text-foreground-950">
              {isEn ? 'Ask KOS AI' : 'Interrogez KOS AI'}
            </span>
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-primary-500 bg-clip-text text-transparent">
              Cognitive Operating System
            </span>
          </h2>

          {/* Accroche fluide */}
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-foreground-600 leading-relaxed mb-4">
            {isEn
              ? 'Select keywords from our regulatory directory to ensure domain-locked, coherent, and sourced responses — 16 agents, 462+ documents, 5 cognitive layers.'
              : 'Sélectionnez vos mots-clés dans notre répertoire réglementaire pour garantir des réponses cadrées, cohérentes et sourcées — 16 agents, 462+ documents, 5 couches cognitives.'}
          </p>

          {/* Pipeline technique */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2 rounded-xl bg-background-100/80 border border-background-200/80">
            <span className="text-[11px] font-mono font-semibold text-accent-600">
              RAG Universal v9
            </span>
            <span className="text-[11px] text-foreground-300">→</span>
            <span className="text-[11px] font-mono text-foreground-500">
              Keyword Directory → Domain-Lock → Evidence Chain
            </span>
            <span className="text-foreground-300 mx-1 hidden sm:inline">|</span>
            <span className="text-[11px] font-mono text-accent-600 hidden sm:inline">
              KOS-COS · 12 Catégories · 110+ Mots-Clés
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Chat Panel */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-background-200 bg-white overflow-hidden">
              <div className="p-5 sm:p-6">
                {/* ─── KEYWORD SELECTOR INPUT ─── */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 bg-accent-100 border border-accent-200">
                    <i className="ri-robot-2-line text-xl text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold uppercase tracking-widest block mb-1 text-foreground-400">
                      {isEn ? 'Select Regulatory Keywords' : 'Sélectionnez vos Mots-Clés Réglementaires'}
                    </label>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full flex items-center justify-between gap-2 text-left text-sm text-foreground-950 cursor-pointer group"
                    >
                      <span className={selectedKeywordIds.size === 0 ? 'text-foreground-300' : 'text-foreground-950'}>
                        {selectedKeywordIds.size === 0
                          ? (isEn ? 'Click to browse the regulatory keyword directory...' : 'Cliquez pour parcourir le répertoire de mots-clés réglementaires...')
                          : `${selectedKeywordIds.size} ${isEn ? 'keyword(s) selected' : 'mot(s)-clé(s) sélectionné(s)'}`}
                      </span>
                      <i className={`ri-arrow-${dropdownOpen ? 'up' : 'down'}-s-line text-sm text-foreground-400 group-hover:text-accent-500 transition-colors`} />
                    </button>
                  </div>
                  <button
                    onClick={ask}
                    disabled={loading || selectedKeywordIds.size === 0}
                    className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.03] bg-accent-500 text-white hover:bg-accent-600"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-base" />
                        <span className="hidden sm:inline">{currentEngine || (isEn ? 'Analyzing...' : 'Analyse...')}</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill text-base" />
                        <span className="hidden sm:inline">{isEn ? 'Search' : 'Rechercher'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* ─── SELECTED KEYWORD CHIPS ─── */}
                {selectedKeywordIds.size > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-400">
                        {isEn ? 'Your Selection' : 'Votre Sélection'} ({selectedKeywordIds.size})
                      </span>
                      <button
                        onClick={clearKeywords}
                        className="text-[10px] font-medium text-foreground-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        {isEn ? 'Clear all' : 'Tout effacer'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(selectedKeywordIds).map((id) => {
                        const kw = KEYWORD_MAP.get(id);
                        if (!kw) return null;
                        const accentClass = domainAccentClasses[kw.domain] || 'border-gray-300 bg-gray-50 text-gray-600';
                        return (
                          <span
                            key={id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border cursor-pointer transition-all duration-150 hover:opacity-80 ${accentClass}`}
                          >
                            {kw.keyword}
                            <button
                              onClick={(e) => { e.stopPropagation(); removeKeyword(id); }}
                              className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                            >
                              <i className="ri-close-line text-[10px]" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ─── KEYWORD DROPDOWN ─── */}
                {dropdownOpen && (
                  <div ref={dropdownRef} className="mb-4 rounded-xl border border-background-200 bg-white shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Search inside dropdown */}
                    <div className="p-3 border-b border-background-100 bg-background-50/50">
                      <div className="relative">
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-300" />
                        <input
                          type="text"
                          value={searchFilter}
                          onChange={(e) => setSearchFilter(e.target.value)}
                          placeholder={isEn ? 'Filter keywords...' : 'Filtrer les mots-clés...'}
                          className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-foreground-950 placeholder:text-foreground-300 focus:outline-none bg-white border border-background-200 focus:border-accent-400 transition-colors"
                          autoFocus
                        />
                        {searchFilter && (
                          <button
                            onClick={() => setSearchFilter('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-300 hover:text-foreground-500 cursor-pointer"
                          >
                            <i className="ri-close-circle-line text-sm" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Domain sections */}
                    <div className="max-h-[420px] overflow-y-auto">
                      {filteredDomains.length === 0 ? (
                        <div className="p-6 text-center text-sm text-foreground-400">
                          <i className="ri-search-line text-xl block mb-2 text-foreground-200" />
                          {isEn ? 'No keywords match your search.' : 'Aucun mot-clé ne correspond à votre recherche.'}
                        </div>
                      ) : (
                        filteredDomains.map((domain) => {
                          const isExpanded = expandedDomains.has(domain.id);
                          const domainCount = selectedPerDomain[domain.id] || 0;
                          return (
                            <div key={domain.id} className="border-b border-background-100 last:border-b-0">
                              {/* Domain header */}
                              <button
                                onClick={() => toggleDomain(domain.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-50/60 transition-colors cursor-pointer"
                              >
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 bg-background-100 border border-background-200">
                                  <i className={`${domain.icon} text-sm text-foreground-600`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-semibold text-foreground-900">
                                    {isEn ? domain.labelEn : domain.labelFr}
                                  </span>
                                  <span className="ml-2 text-[10px] text-foreground-400">
                                    ({domain.keywords.length})
                                  </span>
                                </div>
                                {domainCount > 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-100 text-accent-700 border border-accent-200">
                                    {domainCount}
                                  </span>
                                )}
                                <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xs text-foreground-300`} />
                              </button>

                              {/* Domain keywords */}
                              {isExpanded && (
                                <div className="px-4 pb-3 pt-0">
                                  <div className="flex flex-wrap gap-1.5 pl-11">
                                    {domain.keywords.map((kw) => {
                                      const isSelected = selectedKeywordIds.has(kw.id);
                                      const accentClass = domainAccentClasses[domain.id] || 'border-gray-300 bg-gray-50 text-gray-600';
                                      const accentBorder = domainAccentBorder[domain.id] || 'border-gray-300';
                                      return (
                                        <button
                                          key={kw.id}
                                          onClick={() => toggleKeyword(kw.id)}
                                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
                                            isSelected
                                              ? `${accentClass}`
                                              : `bg-white border-background-200 text-foreground-500 hover:${accentBorder} hover:text-foreground-700`
                                          }`}
                                        >
                                          {kw.keyword}
                                          {isSelected && (
                                            <i className="ri-check-line ml-1 text-[10px]" />
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Footer actions */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-background-100 bg-background-50/50">
                      <button
                        onClick={clearKeywords}
                        className="text-xs font-medium text-foreground-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-30"
                        disabled={selectedKeywordIds.size === 0}
                      >
                        {isEn ? 'Clear all' : 'Tout effacer'}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDropdownOpen(false)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground-500 hover:bg-background-200 transition-colors cursor-pointer"
                        >
                          {isEn ? 'Close' : 'Fermer'}
                        </button>
                        <button
                          onClick={() => { ask(); }}
                          disabled={selectedKeywordIds.size === 0}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 disabled:opacity-40 bg-accent-500 text-white hover:bg-accent-600"
                        >
                          {isEn ? `Search (${selectedKeywordIds.size})` : `Rechercher (${selectedKeywordIds.size})`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex items-center gap-3 py-8 justify-center">
                    <i className="ri-loader-4-line animate-spin text-xl text-accent-500" />
                    <span className="text-sm text-foreground-400">
                      {currentEngine || (isEn ? 'Querying knowledge base...' : 'Interrogation de la base de connaissances...')}
                    </span>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="rounded-xl p-4 mb-4 flex items-start gap-3 bg-red-50 border border-red-200">
                    <i className="ri-error-warning-line text-red-500 text-lg flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-700 font-medium">{isEn ? 'Error' : 'Erreur'}</p>
                      <p className="text-xs text-red-600/80 mt-0.5">{error}</p>
                    </div>
                  </div>
                )}

                {/* Answer */}
                {answer && !loading && (
                  <div ref={answerRef} className="space-y-5">
                    {/* ─── v8 Big Four Artefact → Executive Board Memo ─── */}
                    {(answer.engine?.startsWith('RAG Universal v8') || answer.engine?.startsWith('RAG Universal v7')) ? (
                      <ExecutiveBoardMemo
                        answer={answer.answer}
                        sources={answer.sources}
                        engine={answer.engine}
                        pipeline={answer.pipeline}
                        auditId={answer.audit_id}
                        latencyMs={answer.latency_ms}
                        isEn={isEn}
                        query={q}
                        queryDomain={(answer as any).query_domain || 'general'}
                        queryDomainLabel={(answer as any).query_domain_label || (isEn ? 'Regulatory Intelligence' : 'Intelligence Réglementaire')}
                        domainLocked={(answer as any).domain_locked ?? false}
                        domainValidation={(answer as any).domain_validation || null}
                      />
                    ) : (
                      <>
                        {/* Engine badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 bg-accent-100 border border-accent-200">
                            <i className="ri-brain-line text-sm text-accent-600" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-accent-700">
                            {isEn ? 'KOS AI Response' : 'Réponse KOS AI'}
                          </span>
                          {answer.answeredByLLM && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary-100 text-primary-700 border border-primary-200">
                              {isEn ? 'LLM Synthesized' : 'Synthétisé par LLM'}
                            </span>
                          )}
                          {!answer.answeredByLLM && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent-100 text-accent-700 border border-accent-200">
                              {isEn ? 'Precision Retrieval' : 'Recherche Précision'}
                            </span>
                          )}
                        </div>

                        {/* Answer body */}
                        <div
                          className="rounded-xl p-5 text-sm leading-relaxed bg-background-50 border border-background-200
                            prose-a:text-accent-600 prose-a:underline prose-strong:text-foreground-950
                            prose-h2:text-base prose-h2:font-bold prose-h2:text-foreground-950 prose-h2:mt-4 prose-h2:mb-2
                            prose-h3:text-sm prose-h3:font-semibold prose-h3:text-foreground-900 prose-h3:mt-3 prose-h3:mb-1.5
                            prose-hr:border-background-200 prose-ul:list-disc prose-ul:pl-4
                            prose-li:text-foreground-700 prose-p:text-foreground-700 prose-em:text-foreground-500
                            prose-table:border-background-200 prose-th:bg-background-100 prose-th:text-foreground-800
                            prose-td:border-background-100 prose-td:text-foreground-700
                            max-w-none"
                          dangerouslySetInnerHTML={{ __html: answerHtml }}
                        />

                        {/* Orchestration & QA metadata */}
                        {answer.orchestration && answer.orchestration.total_agents > 0 && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl p-3 bg-accent-50/60 border border-accent-200/60">
                            <div className="flex items-center gap-1.5">
                              <i className="ri-organization-chart text-sm text-accent-600" />
                              <span className="text-xs font-medium text-accent-700">
                                {answer.orchestration.total_agents} {isEn ? 'Agents' : 'Agents'}
                              </span>
                            </div>
                            <span className="text-xs text-foreground-300">·</span>
                            <div className="flex items-center gap-1.5">
                              <i className="ri-stack-line text-sm text-primary-600" />
                              <span className="text-xs font-medium text-primary-700">
                                {answer.orchestration.total_domains} {isEn ? 'Domaines' : 'Domaines'}
                              </span>
                            </div>
                            {answer.qa_validation && (
                              <>
                                <span className="text-xs text-foreground-300">·</span>
                                <div className="flex items-center gap-1.5">
                                  <i className={`ri-shield-check-line text-sm ${answer.qa_validation.overall_score >= 85 ? 'text-accent-600' : 'text-primary-500'}`} />
                                  <span className={`text-xs font-medium ${answer.qa_validation.overall_score >= 85 ? 'text-accent-700' : 'text-primary-700'}`}>
                                    QA {answer.qa_validation.overall_score}/100
                                  </span>
                                </div>
                                <span className="text-xs text-foreground-300">·</span>
                                <span className="text-xs font-medium text-foreground-500 capitalize">
                                  {answer.qa_validation.verdict === 'pass' ? '✅' : answer.qa_validation.verdict === 'pass_with_notes' ? '📝' : '⚠️'} {answer.qa_validation.verdict?.replace(/_/g, ' ')}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Sources */}
                        {answer.sources && answer.sources.length > 0 && (
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-bookmark-line text-xs text-foreground-400" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-400">
                                {isEn ? `Sources (${answer.sources.length})` : `Sources (${answer.sources.length})`}
                              </span>
                            </div>
                            {answer.sources.map((src, i) => {
                              const tierStyle = TIER_STYLES[src.tier] || TIER_STYLES.Raw;
                              const isExpanded = expandedSource === i;
                              return (
                                <div key={i} className="rounded-xl border border-background-200 bg-white overflow-hidden transition-all duration-200 hover:border-background-300">
                                  <button
                                    onClick={() => setExpandedSource(isExpanded ? null : i)}
                                    className="w-full p-4 text-left flex flex-col gap-2 cursor-pointer"
                                  >
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                                        style={{ background: tierStyle.bg, border: `1px solid ${tierStyle.border}`, color: tierStyle.color }}>
                                        <i className={`${tierStyle.icon} text-[10px]`} />{src.tier}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500 border border-background-200">
                                        {src.regulator}
                                      </span>
                                      {src.citationCount > 0 && (
                                        <span className="inline-flex items-center gap-1 text-[10px] text-accent-600 ml-auto">
                                          <i className="ri-double-quotes-l text-[10px]" />{src.citationCount}
                                        </span>
                                      )}
                                      {isExpanded ? <i className="ri-arrow-up-s-line text-xs text-foreground-300 ml-auto" /> : <i className="ri-arrow-down-s-line text-xs text-foreground-300 ml-auto" />}
                                    </div>
                                    <p className="text-xs font-semibold text-foreground-800">{src.title}</p>
                                    {!isExpanded && src.bigFourSummary && (
                                      <p className="text-xs text-foreground-500 line-clamp-2">{src.bigFourSummary}</p>
                                    )}
                                  </button>
                                  {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-background-100 pt-3">
                                      {src.bigFourSummary && (
                                        <p className="text-xs text-foreground-600 mb-2">{src.bigFourSummary}</p>
                                      )}
                                      {src.citations.length > 0 && (
                                        <div className="space-y-1">
                                          {src.citations.map((cit, j) => (
                                            <p key={j} className="text-[10px] flex items-start gap-1.5 text-foreground-400">
                                              <i className="ri-check-double-line text-[10px] flex-shrink-0 mt-0.5 text-accent-500" />{cit}
                                            </p>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Audit trail */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-foreground-400">
                          <span className="flex items-center gap-1.5 text-accent-600 font-medium">
                            <i className="ri-shield-check-line" />{isEn ? '100% Internal Khepra' : '100% Interne Khepra'}
                          </span>
                          <span className="text-foreground-200">|</span>
                          <span className="font-mono">{answer.engine}</span>
                          {answer.orchestration && answer.orchestration.total_agents > 0 && (
                            <>
                              <span className="text-foreground-200">|</span>
                              <span className="font-mono text-accent-600">{answer.orchestration.total_agents} agents</span>
                              <span className="text-foreground-200">|</span>
                              <span className="font-mono text-primary-600">QA {answer.qa_validation?.overall_score}/100</span>
                            </>
                          )}
                          {answer.latency_ms !== undefined && (
                            <>
                              <span className="text-foreground-200">|</span>
                              <span className="font-mono">{answer.latency_ms.toFixed(0)}ms</span>
                            </>
                          )}
                          {answer.v4Synthesis && (
                            <>
                              <span className="text-foreground-200">|</span>
                              <span className="font-mono">{answer.v4Synthesis.external_api_calls} API</span>
                            </>
                          )}
                          <span className="text-foreground-200">|</span>
                          <span className="font-mono text-[10px]">{answer.audit_id}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lead Magnet Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-accent-200/70 bg-gradient-to-br from-accent-50/40 via-background-50 to-primary-50/30 overflow-hidden sticky top-24">
              <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-white">
                    {isEn ? 'Free' : 'Gratuit'}
                  </span>
                  <span className="text-[10px] font-medium text-foreground-400 uppercase tracking-wider">
                    {isEn ? 'Instant Access' : 'Accès Immédiat'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground-950 leading-tight mb-2">
                  {isEn ? 'Your BCEAO 2026 Compliance Kit' : 'Votre Kit Conformité BCEAO 2026'}
                </h3>
                <p className="text-xs text-foreground-500 leading-relaxed mb-4">
                  {isEn
                    ? 'Everything you need to prepare for your next regulatory audit — checklist, matrices, templates. Built by KOS AI, validated by regulatory experts.'
                    : 'Tout ce dont vous avez besoin pour préparer votre prochain audit réglementaire — check-list, matrices, modèles. Construit par KOS AI, validé par des experts.'}
                </p>
              </div>

              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <ul className="space-y-2 mb-5">
                  {[
                    isEn ? '10-point compliance checklist' : 'Check-list 10 points de conformité',
                    isEn ? '3 Lines of Defense matrix' : 'Matrice 3 Lignes de Défense',
                    isEn ? 'PPR model (Preventive Recovery Plan)' : 'Modèle PPR (Plan Préventif de Redressement)',
                    isEn ? 'BCEAO circulars digest 2024-2026' : 'Digest circulaires BCEAO 2024-2026',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-foreground-600">
                      <i className="ri-check-line text-sm flex-shrink-0 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                {formStatus === 'success' ? (
                  <div className="rounded-xl p-4 text-center bg-accent-50 border border-accent-200">
                    <i className="ri-mail-send-line text-2xl mb-2 block text-accent-500" />
                    <p className="text-sm font-semibold text-foreground-950 mb-1">
                      {isEn ? 'Kit sent!' : 'Kit envoyé !'}
                    </p>
                    <p className="text-xs text-foreground-500">
                      {isEn ? 'Check your inbox (and spam folder).' : 'Vérifiez votre boîte (et les spams).'}
                    </p>
                  </div>
                ) : (
                  <form data-readdy-form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium block mb-1.5 text-foreground-500">
                        Email pro <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={isEn ? 'your.email@company.com' : 'votre.email@societe.com'}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-300 focus:outline-none transition-all bg-background-50 border border-background-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1.5 text-foreground-500">
                        {isEn ? 'Company' : 'Société'}
                      </label>
                      <input
                        name="company"
                        type="text"
                        placeholder={isEn ? 'Your organization' : 'Votre organisation'}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-300 focus:outline-none transition-all bg-background-50 border border-background-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                      />
                    </div>

                    {/* Honeypot */}
                    <div className="kos-hp-field">
                      <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly value="" onChange={() => {}} />
                    </div>

                    {formError && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <i className="ri-error-warning-line" />{formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 disabled:opacity-50 hover:scale-[1.02] bg-primary-500 hover:bg-primary-600 text-white"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />
                          {isEn ? 'Sending...' : 'Envoi...'}
                        </>
                      ) : (
                        <>
                          <i className="ri-download-cloud-2-line" />
                          {isEn ? 'Get the Free Kit' : 'Recevoir le Kit Gratuit'}
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-foreground-300">
                      {isEn ? 'No spam. Unsubscribe anytime. ISO 27001 compliant.' : 'Aucun spam. Désinscription à tout moment. Conforme ISO 27001.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
          {[
            { icon: 'ri-shield-check-line', label: isEn ? 'ISO 42001 Certified' : 'Certifié ISO 42001' },
            { icon: 'ri-lock-line', label: isEn ? '0 Data Leakage' : '0 Fuite de Données' },
            { icon: 'ri-organization-chart', label: isEn ? '16 Specialized Agents' : '16 Agents Spécialisés' },
            { icon: 'ri-brain-line', label: isEn ? '11-Step Cognitive Cycle' : 'Cycle Cognitif 11 Étapes' },
            { icon: 'ri-stack-line', label: isEn ? '5-Layer Memory' : 'Mémoire 5 Couches' },
            { icon: 'ri-time-line', label: isEn ? '< 500ms Response' : '< 500ms Réponse' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className={`${t.icon} text-sm text-accent-500`} />
              <span className="text-xs font-medium text-foreground-500">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for honeypot */}
      <style>{`
        .kos-hp-field {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }
        .kos-hp-field input {
          width: 1px;
          height: 1px;
        }
      `}</style>
    </section>
  );
}