import { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SeoHead from '@/components/feature/SeoHead';
import KOSPublicHubCrossLinks from '@/components/feature/KOSPublicHubCrossLinks';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { ComplianceScoreResultSkeleton, ComplianceScoreQuizSkeleton } from '@/components/feature/ComplianceScoreSkeleton';
import { useComplianceScoreLazy } from '@/hooks/useComplianceScoreLazy';
import type { ComplianceQuestion, ComplianceScoreResult } from '@/mocks/khepraComplianceScore';
import { complianceDomains, complianceQuestions, calculateComplianceScore, complianceScoreStats } from '@/mocks/khepraComplianceScore';

const DOMAIN_COLORS: Record<string, string> = {
  governance: '#6366F1',
  compliance: '#DC2626',
  prudential: '#0D7B5F',
  risk: '#F59E0B',
  digital: '#0891B2',
  esg: '#7C3AED',
};

const GRADE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-400' },
  B: { bg: 'bg-primary-100', text: 'text-primary-700', border: 'border-primary-300' },
  C: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  D: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  E: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-400' },
};

function formatNumber(value: number): string {
  return value.toLocaleString('fr-FR');
}

export default function ComplianceScorePage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ComplianceScoreResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadOrg, setLeadOrg] = useState('');
  const [leadIndustry, setLeadIndustry] = useState('');
  const [leadJurisdiction, setLeadJurisdiction] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const currentDomain = complianceDomains[currentDomainIndex];
  const currentQuestions = useMemo(() => complianceQuestions.filter((q) => q.domain === currentDomain?.id), [currentDomain]);
  const answeredInDomain = currentQuestions.filter((q) => answers[q.id] !== undefined).length;
  const totalDomains = complianceDomains.length;
  const overallProgress = Math.round(
    (complianceQuestions.filter((q) => answers[q.id] !== undefined).length / complianceQuestions.length) * 100,
  );

  const isLastDomain = currentDomainIndex === totalDomains - 1;
  const isDomainComplete = answeredInDomain === currentQuestions.length;
  const canFinish = Object.keys(answers).length >= complianceQuestions.length - 3;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextDomain = () => {
    if (isLastDomain) {
      const score = calculateComplianceScore(answers);
      setResults(score);
      setStep('results');
    } else {
      setCurrentDomainIndex((prev) => prev + 1);
    }
  };

  const handlePrevDomain = () => {
    if (currentDomainIndex > 0) setCurrentDomainIndex((prev) => prev - 1);
    else setStep('intro');
  };

  const handleStart = () => {
    setCurrentDomainIndex(0);
    setAnswers({});
    setResults(null);
    setStep('quiz');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) {
      setFormError('Veuillez remplir les champs obligatoires.');
      return;
    }
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const honeypot = formData.get('mobile_alt') as string;
    if (honeypot && honeypot.trim() !== '') return;
    formData.delete('mobile_alt');
    fetch('https://readdy.ai/api/form/d8uggnlu37m8lq7g358g', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    }).then(() => {
      setFormSubmitted(true);
    }).catch(() => setFormError('Une erreur est survenue. Veuillez réessayer.'));
  };

  return (
    <>
      <SeoHead
        title="KHEPRA Compliance Score™ — Diagnostic Conformité Réglementaire Gratuit | BCEAO COBAC OHADA"
        description="Évaluez gratuitement la maturité réglementaire de votre institution en 8 minutes. 6 domaines analysés : Gouvernance, LBC/FT, Prudentiel, Risques, Digital, ESG. Scoring automatisé, rapport PDF, plan d'action personnalisé. KHEPRA EXPERTS."
        keywords="compliance score, diagnostic conformité, maturité réglementaire, scoring BCEAO, scoring COBAC, conformité LBC FT, audit prudentiel, KHEPRA EXPERTS"
        canonicalPath="/compliance-score"
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* ── INTRO ── */}
        {step === 'intro' && (
          <>
            <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20professional%20regulatory%20compliance%20assessment%20dashboard%20scene%2C%20sleek%20corporate%20office%20with%20subtle%20green%20accent%20lighting%2C%20abstract%20data%20visualization%20elements%20in%20warm%20amber%20and%20teal%20tones%2C%20clean%20minimal%20professional%20aesthetic%2C%20soft%20natural%20light%20through%20large%20windows%2C%20high-end%20consulting%20firm%20atmosphere%2C%20warm%20neutral%20color%20palette&width=1600&height=700&seq=compliance-score-hero&orientation=landscape"
                  alt="KHEPRA Compliance Score"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
              <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
                    <i className="ri-shield-check-line text-accent-600"></i>
                    KHEPRA Compliance Score™
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                    Évaluez votre Conformité Réglementaire en 8 Minutes
                  </h1>
                  <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Un diagnostic gratuit et confidentiel basé sur les référentiels <strong className="text-white">BCEAO, COBAC, OHADA, GAFI</strong>.
                    {complianceScoreStats.totalEvaluations.toLocaleString('fr-FR')}+ institutions déjà évaluées.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleStart} className="whitespace-nowrap px-8 py-4 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer hover:bg-foreground-100 transition-colors inline-flex items-center gap-2">
                      <i className="ri-play-circle-line text-lg"></i>Démarrer le Diagnostic
                    </button>
                    <span className="text-white/70 text-sm inline-flex items-center gap-1">
                      <i className="ri-time-line"></i>{complianceScoreStats.avgCompletionTime}
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Évaluations réalisées', value: formatNumber(complianceScoreStats.totalEvaluations), icon: 'ri-user-line' },
                  { label: 'Score moyen', value: `${complianceScoreStats.averageScore}/100`, icon: 'ri-bar-chart-2-line' },
                  { label: 'Domaines analysés', value: '6', icon: 'ri-radar-line' },
                  { label: 'Temps moyen', value: complianceScoreStats.avgCompletionTime, icon: 'ri-time-line' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-background-200/70 text-center">
                    <i className={`${s.icon} text-accent-600 text-lg mb-1 block`}></i>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{s.value}</div>
                    <div className="text-xs text-foreground-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 Domains */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
              <ScrollReveal>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-2 text-center">6 Domaines d'Évaluation</h2>
                <p className="text-sm text-foreground-600 mb-8 text-center max-w-xl mx-auto">Votre diagnostic couvre l'ensemble du spectre réglementaire applicable aux institutions financières africaines.</p>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {complianceDomains.map((domain, i) => (
                  <ScrollReveal key={domain.id} delay={i * 80}>
                    <div className="bg-white rounded-xl border border-background-200/70 p-5 hover:border-background-300/60 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: `${DOMAIN_COLORS[domain.id]}15`, color: DOMAIN_COLORS[domain.id] }}>
                          <i className={`${domain.icon} text-lg`}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">{domain.name}</h3>
                          <span className="text-xs text-foreground-500">{domain.weight}% du score</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">{domain.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {domain.regulatoryRefs.slice(0, 2).map((ref) => (
                          <span key={ref} className="px-2 py-0.5 rounded text-[10px] bg-background-100 text-foreground-600 font-medium">{ref.split(' ')[0]}</span>
                        ))}
                        {domain.regulatoryRefs.length > 2 && <span className="text-[10px] text-foreground-400">+{domain.regulatoryRefs.length - 2}</span>}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 text-center">
              <button onClick={handleStart} className="whitespace-nowrap px-8 py-4 rounded-full bg-foreground-950 text-white font-bold text-sm cursor-pointer hover:bg-foreground-800 transition-colors inline-flex items-center gap-2">
                <i className="ri-play-circle-line text-lg"></i>Commencer le Diagnostic Gratuit
              </button>
              <p className="text-xs text-foreground-500 mt-3">100% confidentiel · Rapport PDF offert · {complianceScoreStats.avgCompletionTime}</p>
            </section>
          </>
        )}

        {/* ── QUIZ ── */}
        {step === 'quiz' && (
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground-600">Domaine {currentDomainIndex + 1}/{totalDomains}</span>
                <span className="text-xs font-medium text-foreground-600">{overallProgress}% complété</span>
              </div>
              <div className="h-2 rounded-full bg-background-100 overflow-hidden">
                <div className="h-full rounded-full bg-accent-500 transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
              </div>
            </div>

            {/* Domain Tabs */}
            <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2">
              {complianceDomains.map((domain, i) => {
                const domainQ = complianceQuestions.filter((q) => q.domain === domain.id);
                const answeredCount = domainQ.filter((q) => answers[q.id] !== undefined).length;
                const isCurrent = i === currentDomainIndex;
                const isPast = i < currentDomainIndex;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setCurrentDomainIndex(i)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isCurrent ? 'bg-foreground-950 text-background-50' : isPast ? 'bg-accent-100 text-accent-700' : 'bg-background-100 text-foreground-500'
                    }`}
                  >
                    <i className={`${domain.icon} text-xs`}></i>
                    {domain.name.split(' ')[0]}
                    <span className="text-[10px]">({answeredCount}/{domainQ.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Domain Header */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-5 md:p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: `${DOMAIN_COLORS[currentDomain.id]}15`, color: DOMAIN_COLORS[currentDomain.id] }}>
                  <i className={`${currentDomain.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground-950 font-heading">{currentDomain.name}</h2>
                  <p className="text-xs text-foreground-600">{currentDomain.description}</p>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {currentQuestions.map((q, qi) => (
                  <div key={q.id} className="border border-background-200/70 rounded-xl p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-xs font-bold text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full flex-shrink-0">{qi + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground-950">{q.question}</p>
                        <p className="text-xs text-foreground-500 mt-0.5">{q.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(q.id, opt.value)}
                          className={`text-left p-3 rounded-lg border text-sm transition-colors cursor-pointer whitespace-normal ${
                            answers[q.id] === opt.value
                              ? 'bg-accent-50 border-accent-400 text-foreground-950 font-medium'
                              : 'bg-background-50 border-background-200/70 text-foreground-700 hover:bg-background-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 flex-shrink-0 ${
                              answers[q.id] === opt.value ? 'border-accent-500 bg-accent-500' : 'border-background-300'
                            }`}>
                              {answers[q.id] === opt.value && <i className="ri-check-line text-white text-xs"></i>}
                            </div>
                            <div>
                              <span className="text-sm">{opt.label}</span>
                              <span className="block text-xs text-foreground-500">{opt.detail}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button onClick={handlePrevDomain} className="whitespace-nowrap px-5 py-3 rounded-full border border-background-200/70 text-foreground-700 text-sm font-medium cursor-pointer hover:bg-background-100 transition-colors inline-flex items-center gap-2">
                <i className="ri-arrow-left-line"></i>Précédent
              </button>
              <span className="text-xs text-foreground-500">
                {answeredInDomain}/{currentQuestions.length} répondues
              </span>
              <button
                onClick={handleNextDomain}
                disabled={!isDomainComplete}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-colors inline-flex items-center gap-2 ${
                  isDomainComplete ? 'bg-foreground-950 text-white hover:bg-foreground-800' : 'bg-background-200 text-foreground-400 cursor-not-allowed'
                }`}
              >
                {isLastDomain ? 'Voir les Résultats' : 'Suivant'}<i className="ri-arrow-right-line"></i>
              </button>
            </div>

            {isLastDomain && canFinish && !isDomainComplete && (
              <div className="text-center mt-4">
                <button onClick={() => { const score = calculateComplianceScore(answers); setResults(score); setStep('results'); }} className="whitespace-nowrap text-sm text-accent-600 font-medium cursor-pointer hover:underline">
                  Voir mes résultats (quelques questions restantes)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === 'results' && results && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Grade Banner */}
            <div className={`rounded-2xl border-2 ${GRADE_COLORS[results.grade].border} p-6 md:p-8 mb-8 text-center relative overflow-hidden`}>
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${DOMAIN_COLORS[results.domainScores[0]?.domainId || 'governance']}08 0%, transparent 60%)` }}></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/80 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-4">
                  <i className="ri-shield-check-line text-accent-600"></i>
                  KHEPRA Compliance Score™
                </div>
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${GRADE_COLORS[results.grade].bg} ${GRADE_COLORS[results.grade].text} text-4xl font-bold font-heading mb-4`}>
                  {results.grade}
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-2">{results.gradeLabel}</h2>
                <div className="text-5xl md:text-6xl font-bold font-heading text-foreground-950 mb-2">{results.overallScore}<span className="text-2xl text-foreground-400">/100</span></div>
                <p className="text-sm text-foreground-600 max-w-xl mx-auto">{results.gradeDescription}</p>
              </div>
            </div>

            {/* Domain Scores */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-5 md:p-6 mb-8">
              <h3 className="text-base font-bold text-foreground-950 mb-1">Scores par Domaine</h3>
              <p className="text-xs text-foreground-500 mb-5">Détail de votre performance sur les 6 piliers réglementaires</p>
              <div className="space-y-4">
                {results.domainScores.map((domain) => (
                  <div key={domain.domainId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${DOMAIN_COLORS[domain.domainId]}15`, color: DOMAIN_COLORS[domain.domainId] }}>
                          <i className={`${domain.icon} text-sm`}></i>
                        </div>
                        <span className="text-sm font-semibold text-foreground-900">{domain.domainName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          domain.percentage >= 80 ? 'bg-emerald-100 text-emerald-700' :
                          domain.percentage >= 60 ? 'bg-primary-100 text-primary-700' :
                          domain.percentage >= 40 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{domain.status}</span>
                        <span className="text-sm font-bold text-foreground-950">{domain.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-background-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${domain.percentage}%`, background: DOMAIN_COLORS[domain.domainId] }}></div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {domain.recommendations.map((rec) => (
                        <span key={rec} className="text-xs text-foreground-600 inline-flex items-center gap-1">
                          <i className="ri-arrow-right-s-line text-foreground-400"></i>{rec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-background-200/70 p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3 inline-flex items-center gap-2">
                  <i className="ri-thumb-up-line text-emerald-500"></i>Forces
                </h3>
                <ul className="space-y-2">
                  {results.top3Strengths.map((s) => (
                    <li key={s} className="text-xs text-foreground-700 flex items-start gap-2">
                      <i className="ri-check-line text-emerald-500 mt-0.5"></i>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-background-200/70 p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3 inline-flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-500"></i>Axes d'Amélioration
                </h3>
                <ul className="space-y-2">
                  {results.top3Weaknesses.map((s) => (
                    <li key={s} className="text-xs text-foreground-700 flex items-start gap-2">
                      <i className="ri-arrow-right-line text-red-500 mt-0.5"></i>{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Urgency & Benchmark */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-background-200/70 p-5 text-center">
                <i className="ri-alert-line text-2xl" style={{ color: results.urgencyLevel === 'Faible' ? '#10B981' : results.urgencyLevel === 'Modérée' ? '#F59E0B' : '#DC2626' }}></i>
                <div className="text-sm font-bold text-foreground-950 mt-2">Urgence</div>
                <div className="text-xs text-foreground-600 mt-1">{results.urgencyLevel}</div>
                <div className="text-xs text-foreground-500 mt-1">{results.urgencyDescription}</div>
              </div>
              <div className="bg-white rounded-2xl border border-background-200/70 p-5 text-center">
                <i className="ri-bar-chart-grouped-line text-2xl text-accent-500"></i>
                <div className="text-sm font-bold text-foreground-950 mt-2">Benchmark</div>
                <div className="text-xs text-foreground-600 mt-1">{results.benchmarkComparison}</div>
              </div>
              <div className="bg-white rounded-2xl border border-background-200/70 p-5 text-center">
                <i className="ri-calendar-check-line text-2xl text-accent-500"></i>
                <div className="text-sm font-bold text-foreground-950 mt-2">Délai Estimé</div>
                <div className="text-xs text-foreground-600 mt-1">{results.estimatedTimeline}</div>
              </div>
            </div>

            {/* Next Steps + Lead Form */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8 mb-8">
              {!formSubmitted ? (
                <>
                  <h3 className="text-lg font-bold text-foreground-950 mb-2">Recevez votre Rapport Complet</h3>
                  <p className="text-sm text-foreground-600 mb-6">
                    Rapport PDF détaillé avec analyse comparative sectorielle, plan d'action personnalisé et recommandations KHEPRA EXPERTS.
                  </p>
                  <form onSubmit={handleLeadSubmit} data-readdy-form="" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1.5">Nom Complet *</label>
                        <input type="text" name="name" value={leadName} onChange={(e) => setLeadName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1.5">Email Professionnel *</label>
                        <input type="email" name="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder="vous@organisation.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1.5">Organisation</label>
                        <input type="text" name="organization" value={leadOrg} onChange={(e) => setLeadOrg(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder="Votre organisation" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1.5">Secteur d'Activité</label>
                        <select name="industry" value={leadIndustry} onChange={(e) => setLeadIndustry(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50">
                          <option value="">Sélectionnez...</option>
                          {complianceScoreStats.industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-foreground-600 mb-1.5">Juridiction Principale</label>
                        <select name="jurisdiction" value={leadJurisdiction} onChange={(e) => setLeadJurisdiction(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50">
                          <option value="">Sélectionnez...</option>
                          {complianceScoreStats.topJurisdictions.map((jur) => <option key={jur} value={jur}>{jur}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ height: '1px', width: '1px', position: 'absolute', left: '-9999px', overflow: 'hidden' }}>
                      <input type="text" name="mobile_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    </div>
                    {formError && <p className="text-xs text-red-600">{formError}</p>}
                    <button type="submit" className="whitespace-nowrap w-full px-6 py-3.5 rounded-full bg-foreground-950 text-white font-bold text-sm cursor-pointer hover:bg-foreground-800 transition-colors inline-flex items-center justify-center gap-2">
                      <i className="ri-download-line"></i>Recevoir mon Rapport Complet
                    </button>
                    <p className="text-[10px] text-foreground-400 text-center">Confidentiel · Pas de spam · Conforme RGPD</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-3xl text-emerald-600"></i>
                  </div>
                  <h3 className="text-lg font-bold text-foreground-950 mb-2">Rapport envoyé avec succès !</h3>
                  <p className="text-sm text-foreground-600 mb-6 max-w-md mx-auto">
                    Vérifiez votre boîte de réception. Vous recevrez votre Rapport KHEPRA Compliance Score™ dans quelques minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button onClick={handleStart} className="whitespace-nowrap px-6 py-3 rounded-full border border-background-200/70 text-foreground-700 text-sm font-medium cursor-pointer hover:bg-background-100 transition-colors">
                      <i className="ri-refresh-line mr-2"></i>Refaire le Diagnostic
                    </button>
                    <Link to="/contact" className="whitespace-nowrap px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-semibold cursor-pointer hover:bg-foreground-800 transition-colors inline-flex items-center gap-2">
                      <i className="ri-calendar-line mr-2"></i>Réserver un Entretien Stratégique
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pb-8">
              <button onClick={handleStart} className="whitespace-nowrap text-sm text-foreground-600 cursor-pointer hover:text-foreground-900 inline-flex items-center gap-1">
                <i className="ri-refresh-line"></i>Refaire le diagnostic
              </button>
            </div>
          </div>
        )}
      </main>

        <KOSPublicHubCrossLinks currentPage="compliance-score" />

      <Footer />
    </>
  );
}