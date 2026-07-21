import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  bigFourDomains,
  qualityKPIs,
  auditTypes,
  detectionCategories,
  confidenceLevels,
  documentProductionComponents,
} from '@/mocks/bigFourQualityGovernance';
import { useKOSCompetencySeeding } from '@/hooks/useKOSCompetencySeeding';
import type { CompetencyModule, SeedResult } from '@/hooks/useKOSCompetencySeeding';
import { shadowAIDetections, trustProvenanceEntries, curiositySafeNudges } from '@/mocks/competencySeeding';

interface ReviewResult {
  success: boolean;
  review_id?: string;
  overall_score: number;
  pass_status: string;
  scores: Record<string, number>;
  findings: Record<string, string[]>;
  detections_count: number;
  detections_by_category: Record<string, number>;
  corrective_actions_triggered: boolean;
}

interface DbReview {
  id: string;
  document_title: string;
  document_type: string;
  pass_status: string;
  audit_technique_score: number;
  audit_reglementaire_score: number;
  audit_juridique_score: number;
  audit_methodologique_score: number;
  audit_redactionnel_score: number;
  audit_coherence_score: number;
  audit_references_score: number;
  audit_conformite_sectorielle_score: number;
  audit_risques_score: number;
  audit_hypotheses_score: number;
  created_at: string;
}

function ScoreGauge({ score, target }: { score: number; target: number }) {
  const pct = Math.min(100, (score / target) * 100);
  const getColor = (s: number) => {
    if (s >= 90) return 'bg-emerald-500';
    if (s >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${getColor(pct)}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-foreground-950 font-heading">{score}</span>
    </div>
  );
}

function DomainCard({ domain }: { domain: typeof bigFourDomains[0] }) {
  const hasGap = domain.ecart > 0;
  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 p-4 hover:border-background-300/60 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${domain.couleur} opacity-90`}>
          <i className={`${domain.icon} text-lg text-white`}></i>
        </div>
        {hasGap && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
            GAP {domain.ecart}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-foreground-950 mb-1 font-heading">{domain.nom}</h3>
      <p className="text-[10px] text-foreground-500 mb-3 font-body">{domain.acronyme}</p>
      <div className="flex items-center justify-between">
        <ScoreGauge score={domain.score_actuel} target={domain.score_cible} />
        <span className="text-[10px] text-foreground-400 font-body">cible {domain.score_cible}</span>
      </div>
    </div>
  );
}

function AuditTypeCard({ audit, score }: { audit: typeof auditTypes[0]; score?: number }) {
  const getScoreColor = (s: number) => s >= 8 ? 'text-emerald-600' : s >= 6 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="flex items-center gap-3 p-3 bg-background-100 rounded-lg">
      <div className="w-8 h-8 rounded-md flex items-center justify-center bg-background-200/70 flex-shrink-0">
        <i className={`${audit.icon} text-sm text-foreground-600`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground-950 font-heading whitespace-nowrap">{audit.label}</span>
          {score !== undefined && (
            <span className={`text-xs font-bold ${getScoreColor(score)} font-heading`}>{score}/10</span>
          )}
        </div>
        <p className="text-[10px] text-foreground-500 font-body line-clamp-1">{audit.description}</p>
      </div>
    </div>
  );
}

const SAMPLE_CONTENT = `Ce document établit les standards de gouvernance qualité conformément aux exigences des régulateurs BCEAO et COBAC. Tous les établissements financiers doivent obligatoirement respecter ces dispositions. La réglementation applicable impose des contrôles stricts. Il est recommandé de mettre en place un comité d'audit indépendant. L'article 42 de l'instruction BCEAO n°008-2015 précise les modalités de reporting. Selon la circulaire COBAC R-2016/01, les établissements assujettis doivent transmettre leurs rapports trimestriels. Cette exigence est toujours valable. Tous les SFD sont concernés sans exception.`;

function getAuditLabel(key: string): string {
  const map: Record<string, string> = {
    audit_technique: 'Audit Technique',
    audit_reglementaire: 'Audit Réglementaire',
    audit_juridique: 'Audit Juridique',
    audit_methodologique: 'Audit Méthodologique',
    audit_redactionnel: 'Audit Rédactionnel',
    audit_coherence: 'Audit de Cohérence',
    audit_references: 'Audit des Références',
    audit_conformite_sectorielle: 'Audit Conformité Sectorielle',
    audit_risques: 'Audit des Risques',
    audit_hypotheses: 'Audit des Hypothèses',
  };
  return map[key] || key;
}

export default function bigFourQualityGovernancePage() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'domains' | 'reviews' | 'detections' | 'kpis' | 'competencies'>('domains');
  const [dbReviews, setDbReviews] = useState<DbReview[]>([]);
  const [dbReviewsLoading, setDbReviewsLoading] = useState(false);
  const [competencyDetailOpen, setCompetencyDetailOpen] = useState<string | null>(null);

  const {
    modules: competencyModules,
    allPillars,
    seedingResult,
    seedingLoading,
    overallMaturity,
    fullSeed,
    autoEvolve,
    crossPillarAudit,
  } = useKOSCompetencySeeding();

  const loadDbReviews = useCallback(async () => {
    setDbReviewsLoading(true);
    try {
      const { data, error } = await supabase
        .from('kos_bigfour_quality_reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      setDbReviews((data || []) as DbReview[]);
    } catch {
      // silently fail — mock reviews are the fallback
    } finally {
      setDbReviewsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDbReviews();
  }, [loadDbReviews]);

  const runQualityReview = useCallback(async () => {
    setReviewLoading(true);
    setReviewResult(null);
    setReviewError(null);
    try {
      const { data: result, error } = await supabase.functions.invoke<ReviewResult>('kos-bigfour-quality-review', {
        body: {
          document_type: 'dashboard_sample',
          document_title: 'Audit Qualité Big Four — Dashboard Governance',
          document_content: SAMPLE_CONTENT,
          secteur: 'Bancaire',
          juridiction: 'UEMOA',
          regulateur: 'BCEAO',
          type_entite: 'Établissement financier',
          niveau_risque: 'élevé',
          mission_ref: 'MISSION-QUALITY-001',
        },
      });
      if (error) throw error;
      setReviewResult(result);
      loadDbReviews();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setReviewError(msg);
      setReviewResult({ success: false, overall_score: 0, pass_status: 'error', scores: {}, findings: {}, detections_count: 0, detections_by_category: {}, corrective_actions_triggered: false });
    } finally {
      setReviewLoading(false);
    }
  }, [loadDbReviews]);

  const handleLaunchReview = useCallback(() => {
    setReviewOpen(true);
    setReviewResult(null);
    setReviewError(null);
    runQualityReview();
  }, [runQualityReview]);

  const tabs = [
    { key: 'domains' as const, label: 'Domaines Big Four', icon: 'ri-building-4-line' },
    { key: 'reviews' as const, label: 'Quality Reviews', icon: 'ri-check-double-line' },
    { key: 'detections' as const, label: 'Détections Auto', icon: 'ri-radar-line' },
    { key: 'kpis' as const, label: 'KPIs Qualité', icon: 'ri-bar-chart-2-line' },
    { key: 'competencies' as const, label: 'Compétences KOS', icon: 'ri-brain-line' },
  ];

  const scoreEntries = reviewResult?.scores ? Object.entries(reviewResult.scores) : [];
  const scoreValues = scoreEntries.map(([, v]) => v);
  const avgScore = scoreValues.length > 0 ? scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length : 0;

  const mergedReviews = dbReviews.length > 0
    ? dbReviews.map(r => {
        const allScores = [
          r.audit_technique_score, r.audit_reglementaire_score, r.audit_juridique_score,
          r.audit_methodologique_score, r.audit_redactionnel_score, r.audit_coherence_score,
          r.audit_references_score, r.audit_conformite_sectorielle_score, r.audit_risques_score,
          r.audit_hypotheses_score,
        ].filter(s => s !== null && s !== undefined);
        const avg = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        return {
          id: r.id,
          document: r.document_title || 'Sans titre',
          type: r.document_type,
          score: Math.round(avg * 10) / 10,
          status: r.pass_status,
          date: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : '',
        };
      })
    : [];

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero Section */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                  BIG FOUR QUALITY GOVERNANCE
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                  MASTER PROMPT vNext
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                  14 DOMAINES · 10 AUDITS · 12 DÉTECTIONS
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3 font-heading">
                Gouvernance Qualité Big Four
              </h1>
              <p className="text-base text-foreground-600 max-w-2xl font-body">
                Moteur permanent de Gouvernance, Qualité, Conformité, Recherche, Assurance et Excellence Technique.
                Chaque contenu publié par KOS atteint un niveau comparable aux standards méthodologiques des cabinets
                PwC, Deloitte, EY et KPMG. <strong className="text-foreground-950">Exactitude factuelle, conformité réglementaire, traçabilité, vérifiabilité, reproductibilité.</strong>
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleLaunchReview}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <i className="ri-play-line text-xl" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold whitespace-nowrap">LANCER QUALITY REVIEW</span>
                  <span className="block text-[10px] text-white/70 whitespace-nowrap">10 audits automatisés</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-background-200/70 bg-background-50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-foreground-500 hover:text-foreground-700'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Domains Tab */}
        {activeTab === 'domains' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-heading">14 Domaines Big Four</h2>
              <div className="flex items-center gap-3 text-xs text-foreground-500 font-body">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Conforme</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> En progression</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> GAP détecté</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {bigFourDomains.map(domain => (
                <DomainCard key={domain.id} domain={domain} />
              ))}
            </div>

            {/* Score Global */}
            <div className="mt-8 p-6 bg-background-100 rounded-xl border border-background-200/70">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Score Global Big Four</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="oklch(var(--background-200))" strokeWidth="5" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="oklch(var(--primary-500))" strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={Math.PI * 68} strokeDashoffset={Math.PI * 68 * (1 - 0.951)} />
                  </svg>
                  <span className="absolute text-lg font-bold text-foreground-950 font-heading">9.5</span>
                </div>
                <div>
                  <div className="text-xs text-foreground-500 font-body mb-1">Score moyen /10</div>
                  <div className="text-2xl font-bold text-foreground-950 font-heading">95.1%</div>
                  <div className="text-xs text-emerald-600 font-body mt-1">10/14 domaines à la cible</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-heading">Big Four Quality Reviews</h2>
              <button
                onClick={handleLaunchReview}
                disabled={reviewLoading}
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
              >
                {reviewLoading ? (
                  <span className="flex items-center gap-2"><i className="ri-loader-4-line animate-spin"></i> Analyse en cours...</span>
                ) : '+ Nouvelle Review'}
              </button>
            </div>

            {/* Last result quick view */}
            {reviewResult && reviewResult.success && (
              <div className={`mb-6 p-4 rounded-lg border ${
                reviewResult.pass_status === 'passed' ? 'bg-emerald-50 border-emerald-200' :
                reviewResult.pass_status === 'conditional' ? 'bg-amber-50 border-amber-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    reviewResult.pass_status === 'passed' ? 'bg-emerald-500' :
                    reviewResult.pass_status === 'conditional' ? 'bg-amber-500' : 'bg-red-500'
                  }`}>
                    <i className={`text-white text-lg ${
                      reviewResult.pass_status === 'passed' ? 'ri-check-line' :
                      reviewResult.pass_status === 'conditional' ? 'ri-alert-line' : 'ri-error-warning-line'
                    }`}></i>
                  </div>
                  <div>
                    <div className="font-bold text-foreground-950 font-heading text-sm">
                      {reviewResult.pass_status === 'passed' ? 'REVIEW PASSED' :
                       reviewResult.pass_status === 'conditional' ? 'REVIEW CONDITIONAL' : 'REVIEW FAILED'}
                    </div>
                    <div className="text-xs text-foreground-600 font-body">
                      Score global : <strong>{reviewResult.overall_score.toFixed(1)}/10</strong> · {reviewResult.detections_count} anomalies · {reviewResult.corrective_actions_triggered ? 'Actions correctives créées' : 'OK'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 10 Audit Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
              {auditTypes.map(audit => {
                const scoreKey = audit.key;
                const auditScore = reviewResult?.scores?.[scoreKey];
                return <AuditTypeCard key={audit.key} audit={audit} score={auditScore} />;
              })}
            </div>

            {/* Reviews History */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">
              Revues Récentes {dbReviewsLoading && <i className="ri-loader-4-line animate-spin ml-2 text-foreground-400"></i>}
            </h3>
            {mergedReviews.length > 0 ? (
              <div className="space-y-2">
                {mergedReviews.slice(0, 10).map(review => (
                  <div key={review.id} className="flex items-center gap-4 p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      review.status === 'passed' ? 'bg-emerald-500' : review.status === 'conditional' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground-950 font-heading truncate">{review.document}</div>
                      <div className="text-xs text-foreground-500 font-body">{review.type} · {review.date}</div>
                    </div>
                    <div className={`text-sm font-bold font-heading whitespace-nowrap ${
                      review.score >= 8 ? 'text-emerald-600' : review.score >= 6 ? 'text-amber-600' : 'text-red-600'
                    }`}>{review.score}/10</div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                      review.status === 'passed' ? 'bg-emerald-100 text-emerald-700' :
                      review.status === 'conditional' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {review.status === 'passed' ? 'PASSED' : review.status === 'conditional' ? 'CONDITIONAL' : 'FAILED'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-background-100 rounded-lg border border-background-200/70">
                <i className="ri-inbox-line text-3xl text-foreground-300 mb-2 block"></i>
                <p className="text-sm text-foreground-500 font-body">Aucune review en base. Lance ta première Quality Review !</p>
              </div>
            )}
          </div>
        )}

        {/* Detections Tab */}
        {activeTab === 'detections' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6 font-heading">Moteur de Détection Automatique</h2>

            {/* Confidence Levels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {confidenceLevels.map(cl => (
                <div key={cl.level} className="bg-background-100 rounded-lg border border-background-200/70 p-4 text-center">
                  <div className={`w-8 h-8 rounded-full ${cl.color} text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold`}>
                    {cl.level}
                  </div>
                  <div className="text-lg font-bold text-foreground-950 font-heading">{cl.count}</div>
                  <div className="text-[10px] text-foreground-500 font-body">{cl.label}</div>
                </div>
              ))}
            </div>

            {/* Detection Categories */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Catégories de Détection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {detectionCategories.map(cat => (
                <div key={cat.key} className="bg-background-100 rounded-lg border border-background-200/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${
                      cat.severity === 'high' ? 'bg-red-500' : cat.severity === 'medium' ? 'bg-amber-500' : 'bg-sky-500'
                    }`} />
                    <span className="text-xs font-semibold text-foreground-950 font-heading">{cat.label}</span>
                  </div>
                  <p className="text-[10px] text-foreground-500 font-body italic">{cat.examples}</p>
                </div>
              ))}
            </div>

            {/* Last review detections */}
            {reviewResult && reviewResult.detections_count > 0 && (
              <div className="mt-8 p-6 bg-background-100 rounded-xl border border-background-200/70">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Dernière Review — {reviewResult.detections_count} anomalies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Object.entries(reviewResult.detections_by_category).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between p-2 bg-background-50 rounded-lg border border-background-200/70">
                      <span className="text-xs text-foreground-600 font-body capitalize">{cat.replace(/_/g, ' ')}</span>
                      <span className="text-xs font-bold text-foreground-950 font-heading">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KPIs Tab */}
        {activeTab === 'kpis' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6 font-heading">Indicateurs de Performance Qualité</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {qualityKPIs.map(kpi => (
                <div key={kpi.label} className="bg-background-100 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${kpi.color} opacity-90 flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-sm text-white`}></i>
                    </div>
                    <span className="text-xs text-foreground-500 font-body">{kpi.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground-950 font-heading">{kpi.value}</div>
                  <div className="text-[10px] text-foreground-400 font-body mt-1">Cible : {kpi.target}</div>
                </div>
              ))}
            </div>

            {/* Document Production Components */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Package de Production Documentaire</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {documentProductionComponents.map(comp => (
                <div key={comp.key} className="flex items-center gap-2 p-3 bg-background-100 rounded-lg border border-background-200/70">
                  <i className={`${comp.icon} text-sm text-foreground-500`}></i>
                  <span className="text-xs font-medium text-foreground-950 font-heading">{comp.label}</span>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="mt-8 p-6 bg-background-100 rounded-xl border border-background-200/70">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Règles Absolues Big Four</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  'Ne jamais inventer une source',
                  'Ne jamais inventer une référence réglementaire',
                  'Ne jamais inventer une jurisprudence',
                  'Ne jamais créer une obligation inexistante',
                  'Ne jamais transformer une bonne pratique en obligation',
                  'Toujours distinguer obligation / recommandation / pratique / interprétation / opinion',
                  'En cas d\'incertitude, signaler et recommander une vérification',
                  'Aucune affirmation publiée sans vérification préalable',
                  'Toute hypothèse doit être explicitement signalée',
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-2 p-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5"></span>
                    <span className="text-xs text-foreground-700 font-body">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Competencies Tab — KOS Auto-Development & Full Seeding */}
        {activeTab === 'competencies' && (
          <div>
            {/* Pillars Overview */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground-950 mb-2 font-heading">Piliers Fondateurs Big Four</h2>
              <p className="text-xs text-foreground-500 mb-5 font-body">Les 4 piliers que le KOS doit assimiler pour transformer l'essaim de copilotes en avantage stratégique durable.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {allPillars.map((pillar) => (
                  <div key={pillar.name} className="bg-background-100 rounded-lg border border-background-200/70 p-5 hover:border-background-300/60 transition-all">
                    <div className={`w-10 h-10 rounded-lg ${pillar.color} opacity-90 flex items-center justify-center mb-3`}>
                      <i className={`${pillar.icon} text-lg text-white`}></i>
                    </div>
                    <h3 className="text-xs font-bold text-foreground-950 mb-2 font-heading">{pillar.name}</h3>
                    <p className="text-[10px] text-foreground-500 font-body leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Development Action Bar */}
            <div className="mb-8 p-5 bg-background-100 rounded-xl border border-background-200/70">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-foreground-950 font-heading mb-1">Auto-Développement KOS</h2>
                  <p className="text-xs text-foreground-500 font-body">
                    Maturité globale : <strong className="text-foreground-950">{overallMaturity}%</strong> · {competencyModules.length} modules seedés · Infrastructure DB-driven
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={fullSeed}
                    disabled={seedingLoading}
                    className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {seedingLoading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-seedling-line"></i>}
                    Full Seed
                  </button>
                  <button
                    onClick={autoEvolve}
                    disabled={seedingLoading}
                    className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {seedingLoading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-rocket-line"></i>}
                    Auto-Evolve
                  </button>
                  <button
                    onClick={crossPillarAudit}
                    disabled={seedingLoading}
                    className="px-4 py-2 rounded-lg bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {seedingLoading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-crosshair-line"></i>}
                    Cross-Pillar Audit
                  </button>
                </div>
              </div>

              {/* Seed Result */}
              {seedingResult && (
                <div className={`mt-4 p-4 rounded-lg border ${seedingResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  {seedingResult.success ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-check-double-line text-emerald-600"></i>
                        <span className="text-xs font-bold text-emerald-700 font-heading">SEEDING RÉUSSI</span>
                      </div>
                      {seedingResult.modules && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {seedingResult.modules.map((m) => (
                            <span key={m.module_key} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                              {m.module_key} v{m.version} ({m.status})
                            </span>
                          ))}
                        </div>
                      )}
                      {seedingResult.cross_pillar_evolutions && seedingResult.cross_pillar_evolutions.length > 0 && (
                        <div className="text-[10px] text-emerald-600 font-body mt-2">
                          {seedingResult.cross_pillar_evolutions.length} évolutions cross-pillar appliquées
                        </div>
                      )}
                      {seedingResult.pillar_coverage && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {seedingResult.pillar_coverage.map((pc) => (
                            <span key={pc.pillar} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              pc.status === 'strong_coverage' ? 'bg-emerald-100 text-emerald-700' :
                              pc.status === 'weak_coverage' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {pc.status === 'strong_coverage' ? '✔' : pc.status === 'weak_coverage' ? '⚠' : '✗'} {pc.pillar.substring(0, 30)}...
                            </span>
                          ))}
                        </div>
                      )}
                      {seedingResult.evolutions && (
                        <div className="text-[10px] text-emerald-600 font-body mt-2">
                          Score de maturité mis à jour pour {seedingResult.evolutions.length} modules
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-error-warning-line text-red-600"></i>
                        <span className="text-xs font-bold text-red-700 font-heading">ERREUR</span>
                      </div>
                      <p className="text-[10px] text-red-600 font-body">{seedingResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4 Competency Modules */}
            <h2 className="text-lg font-semibold text-foreground-950 mb-5 font-heading">Modules de Compétences KOS</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {competencyModules.map((mod) => {
                const isOpen = competencyDetailOpen === mod.module_key;
                const maturityPct = Math.min(100, mod.maturite_score);
                const moduleIcons: Record<string, string> = {
                  shadow_ai_audit: 'ri-eye-2-line',
                  decision_layer: 'ri-stack-line',
                  trust_provenance: 'ri-verified-badge-line',
                  curiosity_safe: 'ri-user-heart-line',
                };
                const moduleColors: Record<string, string> = {
                  shadow_ai_audit: 'bg-red-500',
                  decision_layer: 'bg-sky-500',
                  trust_provenance: 'bg-emerald-500',
                  curiosity_safe: 'bg-amber-500',
                };
                return (
                  <div key={mod.module_key} className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden hover:border-background-300/60 transition-all">
                    {/* Module Header */}
                    <button
                      onClick={() => setCompetencyDetailOpen(isOpen ? null : mod.module_key)}
                      className="w-full p-5 flex items-start gap-4 text-left cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl ${moduleColors[mod.module_key] || 'bg-primary-500'} opacity-90 flex items-center justify-center flex-shrink-0`}>
                        <i className={`${moduleIcons[mod.module_key] || 'ri-brain-line'} text-xl text-white`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-bold text-foreground-950 font-heading">{mod.titre}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${maturityPct >= 80 ? 'bg-emerald-100 text-emerald-700' : maturityPct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {mod.maturite_score}%
                          </span>
                          <span className="text-[10px] text-foreground-400 font-body">v{mod.version}</span>
                        </div>
                        <p className="text-xs text-foreground-500 font-body line-clamp-2">{mod.objectif}</p>
                        {/* Maturity bar */}
                        <div className="mt-3 w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-700 ${maturityPct >= 80 ? 'bg-emerald-500' : maturityPct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${maturityPct}%` }} />
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {mod.pilier_bigfour.map((p) => (
                            <span key={p} className="px-1.5 py-0.5 rounded text-[9px] bg-background-200/70 text-foreground-500 font-body">{p}</span>
                          ))}
                        </div>
                      </div>
                      <i className={isOpen ? 'ri-arrow-up-s-line text-foreground-400 flex-shrink-0 mt-1' : 'ri-arrow-down-s-line text-foreground-400 flex-shrink-0 mt-1'}></i>
                    </button>

                    {/* Expanded Detail */}
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 space-y-5">
                        {/* Livrable attendu */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-950 mb-1 font-heading">Livrable Attendu</h4>
                          <p className="text-xs text-foreground-600 font-body leading-relaxed">{mod.livrable_attendu}</p>
                        </div>

                        {/* Comparative Table */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-950 mb-2 font-heading">Comparaison Approche Obsolète vs Cible KOS</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                <span className="text-[10px] font-bold text-red-700 font-heading">APPROCHE OBSOLÈTE</span>
                              </div>
                              <p className="text-[10px] text-red-600 font-body leading-relaxed">{mod.approche_obsolete}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                                <span className="text-[10px] font-bold text-emerald-700 font-heading">CIBLE KOS/DÉCISIONNELLE</span>
                              </div>
                              <p className="text-[10px] text-emerald-700 font-body leading-relaxed">{mod.approche_cible}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Protocols */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-950 mb-3 font-heading">Protocoles d'Action Immédiats</h4>
                          <div className="space-y-2">
                            {mod.protocoles_action.map((proto) => (
                              <div key={proto.etape} className="flex items-start gap-3 p-3 bg-background-50 rounded-lg border border-background-200/70">
                                <div className={`w-7 h-7 rounded-lg ${moduleColors[mod.module_key] || 'bg-primary-500'} opacity-80 flex items-center justify-center flex-shrink-0`}>
                                  <span className="text-xs font-bold text-white">{proto.etape}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-xs font-semibold text-foreground-950 font-heading">{proto.action}</span>
                                    <span className="text-[10px] text-foreground-400 font-body whitespace-nowrap ml-2">{proto.delai}</span>
                                  </div>
                                  <p className="text-[10px] text-foreground-500 font-body leading-relaxed">{proto.description}</p>
                                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] bg-accent-100 text-accent-700 font-body">{proto.outil}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extra: Shadow AI detections preview */}
                        {mod.module_key === 'shadow_ai_audit' && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground-950 mb-2 font-heading">Détections Shadow AI (exemples)</h4>
                            <div className="space-y-1.5">
                              {shadowAIDetections.map((d, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-background-50 rounded border border-background-200/70">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                  <span className="text-[10px] text-foreground-600 font-body flex-1">
                                    <strong>{d.model_signature}</strong> — {d.departement} · Impact {d.impact_score}%
                                  </span>
                                  <span className="text-[9px] text-foreground-400 font-body whitespace-nowrap">{d.divergence_type}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Extra: Trust provenance samples */}
                        {mod.module_key === 'trust_provenance' && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground-950 mb-2 font-heading">Registre de Provenance (exemples)</h4>
                            <div className="space-y-1.5">
                              {trustProvenanceEntries.map((e, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-background-50 rounded border border-background-200/70">
                                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                    e.confidence_level === 'A' ? 'bg-emerald-500' : e.confidence_level === 'B' ? 'bg-sky-500' : e.confidence_level === 'D' ? 'bg-amber-500' : 'bg-red-500'
                                  }`}></span>
                                  <span className="text-[10px] text-foreground-600 font-body flex-1">
                                    <strong>{e.artifact_type}</strong> — Niveau {e.confidence_level} · {e.source_count} sources
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                    e.validation_status === 'validated' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                  }`}>{e.validation_status}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Extra: Curiosity-safe nudges */}
                        {mod.module_key === 'curiosity_safe' && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground-950 mb-2 font-heading">Stratégies de Nudge Actives</h4>
                            <div className="space-y-1.5">
                              {curiositySafeNudges.map((n, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 bg-background-50 rounded border border-background-200/70">
                                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${n.is_active ? 'bg-emerald-500' : 'bg-foreground-300'}`}></span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                                      <span className="text-[10px] font-semibold text-foreground-950 font-heading">{n.nudge_name}</span>
                                      <span className="px-1 py-0.5 rounded text-[8px] bg-accent-100 text-accent-700 font-body">{n.nudge_type}</span>
                                    </div>
                                    <p className="text-[10px] text-foreground-500 font-body leading-relaxed">{n.alternative_offered}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* KOS Decision Layer Architecture Diagram */}
            <div className="mt-8 p-6 bg-background-100 rounded-xl border border-background-200/70">
              <h3 className="text-sm font-bold text-foreground-950 mb-5 font-heading">Knowledge Gateway — Architecture Cible</h3>
              <div className="relative">
                <div className="flex flex-col lg:flex-row items-stretch gap-0 lg:gap-0">
                  {[
                    { name: 'PROMPT\nHARMONIZER', desc: 'Normalise, complète\net sécurise', color: 'bg-sky-500', icon: 'ri-pencil-ruler-2-line' },
                    { name: 'RAG\nENRICHMENT', desc: 'Connaissances unifiées\n+ Contexte réglementaire', color: 'bg-emerald-500', icon: 'ri-database-2-line' },
                    { name: 'BUSINESS\nRULES ENGINE', desc: 'Validation conformité\n+ Politiques internes', color: 'bg-amber-500', icon: 'ri-shield-check-line' },
                    { name: 'MODEL\nROUTER', desc: 'Sélection optimale\nGPT-4o / Claude / Gemini', color: 'bg-red-500', icon: 'ri-shuffle-line' },
                    { name: 'AUDIT\nLOGGING', desc: 'Traçabilité complète\nRegistre immuable', color: 'bg-secondary-500', icon: 'ri-file-list-3-line' },
                  ].map((layer, i) => (
                    <div key={layer.name} className="flex-1 flex flex-col items-center p-4 border border-background-200/70 rounded-lg lg:rounded-none lg:border-r-0 last:lg:border-r last:lg:rounded-r-lg first:lg:rounded-l-lg bg-background-50 relative">
                      {i < 4 && (
                        <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-foreground-300 text-lg">→</div>
                      )}
                      <div className={`w-10 h-10 rounded-lg ${layer.color} opacity-90 flex items-center justify-center mb-2`}>
                        <i className={`${layer.icon} text-base text-white`}></i>
                      </div>
                      <span className="text-[10px] font-bold text-foreground-950 text-center font-heading whitespace-pre-line">{layer.name}</span>
                      <span className="text-[9px] text-foreground-500 text-center mt-1 font-body whitespace-pre-line">{layer.desc}</span>
                    </div>
                  ))}
                </div>
                {/* Input / Output labels */}
                <div className="flex items-center justify-between mt-3 text-[9px] text-foreground-400 font-body px-2">
                  <span>← Requête Utilisateur</span>
                  <span>Output Validé →</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quality Review Modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => !reviewLoading && setReviewOpen(false)}>
          <div className="bg-background-50 rounded-xl border border-background-200/70 w-full max-w-2xl max-h-[85vh] overflow-auto mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-background-200/70 sticky top-0 bg-background-50 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                  <i className="ri-check-double-line text-white"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 font-heading">
                  {reviewLoading ? 'Analyse en cours...' : reviewResult ? 'Résultat Quality Review' : 'Big Four Quality Review'}
                </h3>
              </div>
              <button
                onClick={() => setReviewOpen(false)}
                disabled={reviewLoading}
                className="w-8 h-8 rounded-lg hover:bg-background-100 flex items-center justify-center cursor-pointer disabled:opacity-30"
              >
                <i className="ri-close-line text-foreground-500"></i>
              </button>
            </div>

            <div className="p-5">
              {reviewLoading && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-background-100 rounded-lg">
                    <i className="ri-loader-4-line animate-spin text-primary-500 text-xl"></i>
                    <div>
                      <div className="text-sm font-semibold text-foreground-950 font-heading">Exécution des 10 audits automatisés</div>
                      <div className="text-xs text-foreground-500 font-body">Audit technique, réglementaire, juridique, méthodologique, rédactionnel...</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {auditTypes.map((audit, i) => (
                      <div key={audit.key} className="flex items-center gap-3 p-2 bg-background-100/50 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="w-6 h-6 rounded bg-background-200/70 flex-shrink-0"></div>
                        <div className="flex-1 h-3 bg-background-200/70 rounded"></div>
                        <div className="w-10 h-3 bg-background-200/70 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reviewError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-error-warning-line text-red-600"></i>
                    <span className="text-sm font-bold text-red-700 font-heading">Erreur lors de la review</span>
                  </div>
                  <p className="text-xs text-red-600 font-body mb-3">{reviewError}</p>
                  <button
                    onClick={runQualityReview}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {reviewResult && !reviewError && (
                <div>
                  {/* Overall Score Banner */}
                  <div className={`p-4 rounded-lg border mb-4 ${
                    reviewResult.pass_status === 'passed' ? 'bg-emerald-50 border-emerald-200' :
                    reviewResult.pass_status === 'conditional' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        reviewResult.pass_status === 'passed' ? 'bg-emerald-500' :
                        reviewResult.pass_status === 'conditional' ? 'bg-amber-500' : 'bg-red-500'
                      }`}>
                        <span className="text-xl font-bold text-white font-heading">{avgScore.toFixed(1)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground-950 font-heading uppercase">
                          {reviewResult.pass_status === 'passed' ? '✅ REVIEW PASSED' :
                           reviewResult.pass_status === 'conditional' ? '⚠️ REVIEW CONDITIONAL' : '❌ REVIEW FAILED'}
                        </div>
                        <div className="text-xs text-foreground-600 font-body mt-0.5">
                          {reviewResult.detections_count} anomalies · {reviewResult.corrective_actions_triggered ? 'Actions correctives créées' : 'Aucune action corrective nécessaire'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <h4 className="text-xs font-semibold text-foreground-950 mb-3 font-heading uppercase tracking-wide">Détail des 10 audits</h4>
                  <div className="space-y-2 mb-4">
                    {scoreEntries.map(([key, score]) => {
                      const findings = reviewResult.findings?.[key] || [];
                      const getBarColor = (s: number) => s >= 8 ? 'bg-emerald-500' : s >= 6 ? 'bg-amber-500' : 'bg-red-500';
                      return (
                        <div key={key} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-foreground-950 font-heading">{getAuditLabel(key)}</span>
                            <span className={`text-xs font-bold font-heading ${getBarColor(score).replace('bg-', 'text-')}`}>{score}/10</span>
                          </div>
                          <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                            <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(score)}`} style={{ width: `${Math.min(100, (score / 10) * 100)}%` }} />
                          </div>
                          {findings.length > 0 && (
                            <div className="space-y-0.5">
                              {findings.map((f, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></span>
                                  <span className="text-[10px] text-foreground-500 font-body">{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {findings.length === 0 && (
                            <span className="text-[10px] text-emerald-500 font-body">Aucun problème détecté</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t border-background-200/70">
                    <button
                      onClick={() => { setReviewOpen(false); setActiveTab('reviews'); }}
                      className="px-4 py-2 rounded-lg bg-background-100 hover:bg-background-200/70 text-foreground-700 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
                    >
                      Voir toutes les reviews
                    </button>
                    <button
                      onClick={runQualityReview}
                      className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold whitespace-nowrap transition-colors cursor-pointer"
                    >
                      Relancer une review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





