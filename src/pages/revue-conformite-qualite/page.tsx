import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  AUDIT_COMMITTEE,
  AUDIT_AXES_SITE,
  FORCES_SITE,
  FAIBLESSES_SITE,
  BENCHMARK_BIG_FOUR,
  PRIORITY_ACTIONS_SITE,
  CERTIFICATION_CHECKLIST,
  SCORE_EVOLUTION,
} from '@/mocks/siteQualityAudit';

type TabId = 'synthese' | 'axes' | 'benchmark' | 'certifications' | 'actions' | 'trajectoire';

export default function RevueConformiteQualitePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('synthese');
  const [expandedAxe, setExpandedAxe] = useState<string | null>(null);

  const weightedScore = useMemo(() => {
    let total = 0;
    AUDIT_AXES_SITE.forEach((axe) => { total += (axe.score * axe.poids) / 100; });
    return total;
  }, []);

  const stats = useMemo(() => {
    const totalCriteres = AUDIT_AXES_SITE.reduce((acc, axe) => acc + axe.criteres.length, 0);
    const conformes = AUDIT_AXES_SITE.reduce((acc, axe) => acc + axe.criteres.filter((c) => c.statut === 'conforme').length, 0);
    const partiels = AUDIT_AXES_SITE.reduce((acc, axe) => acc + axe.criteres.filter((c) => c.statut === 'partiel').length, 0);
    const nonConformes = AUDIT_AXES_SITE.reduce((acc, axe) => acc + axe.criteres.filter((c) => c.statut === 'non-conforme').length, 0);
    return { totalCriteres, conformes, partiels, nonConformes };
  }, []);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'synthese', label: 'Synthèse Exécutive', icon: 'ri-file-chart-line' },
    { id: 'axes', label: '10 Axes d\'Audit', icon: 'ri-radar-line' },
    { id: 'benchmark', label: 'Benchmark Big Four', icon: 'ri-bar-chart-2-line' },
    { id: 'certifications', label: 'Certifications & Standards', icon: 'ri-award-line' },
    { id: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line' },
    { id: 'trajectoire', label: 'Trajectoire 100%', icon: 'ri-line-chart-line' },
  ];

  const scoreColor = weightedScore >= 90 ? '#86BC25' : weightedScore >= 80 ? '#E8C547' : '#C2410C';

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="Revue Conformité & Qualité Totale | Score Big Four 86,4/100 | KHEPRA EXPERTS"
        description="Audit complet du site KHEPRA EXPERTS contre les standards Big Four : 10 axes, 70 critères, score pondéré 86,4/100. Cible 100%. Design, SEO, sécurité, accessibilité, contenu, performance, conformité, UX, conversion."
        keywords="audit site web Big Four, conformité site web, qualité totale, standards Deloitte PwC EY KPMG, audit qualité KHEPRA, revue conformité site, score qualité web"
        canonicalPath="/revue-conformite-qualite"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=dark%20sophisticated%20quality%20assurance%20command%20center%20with%20interconnected%20emerald%20green%20and%20warm%20gold%20nodes%20forming%20a%20comprehensive%20compliance%20matrix%2C%20geometric%20precision%20patterns%20radiating%20from%20a%20central%20hub%2C%20premium%20corporate%20audit%20atmosphere%20with%20structured%20checklist%20layers%2C%20clean%20minimalist%20dark%20background%20with%20algorithmic%20precision%2C%20no%20text%20no%20human%20figures&width=1920&height=600&seq=revue-qualite-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-12"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
                <i className="ri-scales-3-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  Revue Qualité — Comité Combiné Big Four · 12 Juin 2026
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Revue Conformité & Qualité Totale
                <span className="block text-emerald-400 mt-2">Site Web — Standards Big Four</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">10 axes d'audit</strong> · <strong className="text-white">70 critères</strong> de contrôle ·{' '}
                Score pondéré calibré sur les standards <strong className="text-white">Deloitte, PwC, EY, KPMG</strong>.{' '}
                Design, SEO, sécurité, accessibilité, contenu, performance, conformité, UX, conversion.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-emerald-300">{weightedScore.toFixed(0)}/100</span>
                  <span className="text-sm text-emerald-300">Score Actuel</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <span className="text-lg font-bold text-white">100/100</span>
                  <span className="text-sm text-white">Score Cible</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-amber-300">+{(100 - Math.round(weightedScore))}</span>
                  <span className="text-sm text-amber-300">Points à Combler</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Score Bar */}
        <section className="relative -mt-8 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="text-center lg:text-left flex-shrink-0">
                  <span className="text-7xl font-bold font-heading" style={{ color: scoreColor }}>{weightedScore.toFixed(0)}</span>
                  <span className="text-2xl text-foreground-400">/100</span>
                  <p className="text-sm font-bold mt-1" style={{ color: scoreColor }}>
                    {weightedScore >= 90 ? 'EXCELLENCE BIG FOUR APPROCHÉE' : weightedScore >= 80 ? 'CABINET DIGITALISÉ PREMIUM' : 'EN PROGRESSION'}
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground-500">Progression vers Excellence Totale Big Four</span>
                    <span className="font-bold text-foreground-700">{weightedScore.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-6 rounded-full bg-background-100 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                      style={{
                        width: `${(weightedScore / 100) * 100}%`,
                        background: 'linear-gradient(90deg, #E8C547 0%, #86BC25 50%, #0D7B5F 100%)',
                      }}
                    >
                      {weightedScore > 15 && (
                        <span className="text-xs text-white font-bold">{weightedScore.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground-400 mt-1.5">
                    <span>Juin 2026</span>
                    <span className="font-bold text-emerald-600">J+30 : 91,5</span>
                    <span className="font-bold text-emerald-600">J+90 : 95,0</span>
                    <span className="font-bold text-emerald-600">J+180 : 98,2</span>
                    <span className="font-bold text-emerald-600">J+365 : 100,0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-30 bg-white border-b border-background-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: SYNTHÈSE EXÉCUTIVE === */}
        {activeTab === 'synthese' && (
          <>
            <ScrollReveal>
              <section className="py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Comité */}
                  <div className="rounded-2xl bg-white border border-background-200 p-6 sm:p-8 mb-8">
                    <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-team-line text-foreground-600" />
                      Comité d'Audit Combiné — Big Four + Experts Indépendants
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {AUDIT_COMMITTEE.map((m, i) => (
                        <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4">
                          <p className="text-xs font-bold text-foreground-800 mb-1">{m.role}</p>
                          <p className="text-[10px] text-foreground-400 leading-relaxed">{m.expertise}</p>
                          <span className="inline-block mt-2 text-[10px] font-bold text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{m.anciennete}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white mb-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-4">
                      <i className="ri-scales-3-line text-emerald-400 text-sm" />
                      <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Verdict du Comité — 12 Juin 2026</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
                      Le site KHEPRA EXPERTS atteint un <strong className="text-white">score de {weightedScore.toFixed(0)}/100</strong> contre les standards Big Four — un résultat <strong className="text-white">remarquable</strong> pour un cabinet indépendant. L'architecture technique, le SEO, les performances et la conformité légale sont <strong className="text-white">de niveau Big Four, voire supérieurs</strong> sur certains critères.
                    </p>
                    <p className="text-base text-emerald-400 font-bold max-w-2xl mx-auto">
                      « Ce site surpasse déjà les Big Four sur les Core Web Vitals et l'accessibilité. Avec 13,6 points à combler — concentrés sur l'autorité de domaine, la sécurité des headers et les contenus thought leadership — l'objectif 100% est atteignable en 12 mois. »
                    </p>
                  </div>

                  {/* Forces & Faiblesses */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="rounded-2xl bg-white border border-emerald-200 p-6">
                      <h3 className="font-heading text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <i className="ri-check-double-line text-emerald-600" />
                        8 Forces — Standards Dépassés
                      </h3>
                      <ul className="space-y-2.5">
                        {FORCES_SITE.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            <span>{f.label} <span className="text-emerald-600 font-bold text-xs">({f.niveau})</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white border border-red-200 p-6">
                      <h3 className="font-heading text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i className="ri-error-warning-line text-red-600" />
                        10 Faiblesses — Écarts à Combler
                      </h3>
                      <ul className="space-y-2.5">
                        {FAIBLESSES_SITE.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                            <span className="text-xs flex-shrink-0 mt-0.5">{f.gravite}</span>
                            <span>{f.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                    {[
                      { label: '10 Axes', value: AUDIT_AXES_SITE.length.toString(), icon: 'ri-radar-line', color: '#4F46E5' },
                      { label: '70 Critères', value: stats.totalCriteres.toString(), icon: 'ri-checkbox-multiple-line', color: '#9B7B2C' },
                      { label: 'Conformes', value: stats.conformes.toString(), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
                      { label: 'Partiels', value: stats.partiels.toString(), icon: 'ri-time-line', color: '#E8C547' },
                      { label: 'Non conformes', value: stats.nonConformes.toString(), icon: 'ri-error-warning-line', color: '#C2410C' },
                      { label: 'Score', value: `${weightedScore.toFixed(0)}/100`, icon: 'ri-bar-chart-line', color: '#0D7B5F' },
                      { label: 'Cible', value: '100/100', icon: 'ri-trophy-line', color: '#E8943A' },
                      { label: 'Écart', value: `+${(100 - Math.round(weightedScore))}`, icon: 'ri-arrow-up-circle-line', color: '#C05A3A' },
                      { label: 'Actions', value: PRIORITY_ACTIONS_SITE.length.toString(), icon: 'ri-tools-line', color: '#6B4A3A' },
                      { label: 'Délai max', value: '365J', icon: 'ri-calendar-line', color: '#8B3040' },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                          <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                        </div>
                        <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                        <span className="text-[10px] text-foreground-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Top axes */}
                  <div className="rounded-2xl bg-white border border-background-200 p-6 sm:p-8">
                    <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-bar-chart-2-line text-foreground-600" />
                      Top 3 Forces & Top 3 Faiblesses par Écart à la Cible
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-bold text-emerald-700 mb-3 uppercase">Écarts les plus faibles (proches de 100%)</p>
                        {[...AUDIT_AXES_SITE].sort((a, b) => (a.cible - a.score) - (b.cible - b.score)).slice(0, 3).map((axe) => (
                          <div key={axe.id} className="flex items-center gap-3 mb-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="text-foreground-700">{axe.label}</span>
                            <span className="font-bold text-emerald-600 ml-auto">{axe.score}/100</span>
                            <span className="text-emerald-500 text-xs">(+{(axe.cible - axe.score)} pts)</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-700 mb-3 uppercase">Écarts les plus importants (prioritaires)</p>
                        {[...AUDIT_AXES_SITE].sort((a, b) => (b.cible - b.score) - (a.cible - a.score)).slice(0, 3).map((axe) => (
                          <div key={axe.id} className="flex items-center gap-3 mb-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="text-foreground-700">{axe.label}</span>
                            <span className="font-bold text-red-600 ml-auto">{axe.score}/100</span>
                            <span className="text-red-500 text-xs">(+{(axe.cible - axe.score)} pts)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </>
        )}

        {/* === TAB: 10 AXES D'AUDIT === */}
        {activeTab === 'axes' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Les 10 Axes d'Audit — Calibration Big Four</h2>
                  <p className="text-foreground-600">Score pondéré : {weightedScore.toFixed(1)}/100 · Cible : 100/100 · {stats.totalCriteres} critères contrôlés</p>
                </div>

                <div className="space-y-5">
                  {AUDIT_AXES_SITE.map((axe) => {
                    const isExpanded = expandedAxe === axe.id;
                    const barColor = axe.score >= 90 ? '#86BC25' : axe.score >= 80 ? '#E8C547' : axe.score >= 70 ? '#E8943A' : '#C2410C';
                    const conformes = axe.criteres.filter((c) => c.statut === 'conforme').length;
                    const partiels = axe.criteres.filter((c) => c.statut === 'partiel').length;
                    const nonConformes = axe.criteres.filter((c) => c.statut === 'non-conforme').length;
                    return (
                      <div key={axe.id} className={`rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'}`}>
                        <button
                          onClick={() => setExpandedAxe(isExpanded ? null : axe.id)}
                          className="w-full p-5 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${axe.color}15` }}>
                              <i className={`${axe.icon} text-xl`} style={{ color: axe.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <h3 className="text-base font-bold text-foreground-950">{axe.label}</h3>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500">Poids {axe.poids}%</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${barColor}15`, color: barColor }}>
                                  {conformes}/{axe.criteres.length} critères conformes
                                </span>
                              </div>
                              <p className="text-xs text-foreground-500">{axe.diagnostic}</p>
                            </div>
                            <div className="text-center flex-shrink-0">
                              <span className="block text-2xl font-bold font-heading" style={{ color: barColor }}>{axe.score}</span>
                              <span className="text-[10px] text-foreground-400">/100</span>
                            </div>
                            <div className="flex-shrink-0">
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                            </div>
                          </div>
                          <div className="mt-3 w-full h-2 rounded-full bg-background-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${axe.score}%`, backgroundColor: barColor }} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                              <span className="text-foreground-500">Score actuel : <strong style={{ color: barColor }}>{axe.score}/100</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Cible : <strong className="text-emerald-600">{axe.cible}/100</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Écart : <strong style={{ color: barColor }}>+{axe.cible - axe.score} points</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Contribution : <strong>{(axe.score * axe.poids / 100).toFixed(1)}</strong></span>
                            </div>
                            <div className="flex gap-2 mb-4 text-xs">
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{conformes} Conformes
                              </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{partiels} Partiels
                              </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{nonConformes} Non conformes
                              </span>
                            </div>
                            <div className="space-y-2">
                              {axe.criteres.map((crit, j) => {
                                const statusBadge = crit.statut === 'conforme'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                  : crit.statut === 'partiel'
                                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                                  : 'bg-red-50 border-red-200 text-red-700';
                                const statusIcon = crit.statut === 'conforme' ? 'ri-check-line text-emerald-600' : crit.statut === 'partiel' ? 'ri-time-line text-amber-600' : 'ri-close-line text-red-600';
                                return (
                                  <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                                    <i className={`${statusIcon} text-base flex-shrink-0`} />
                                    <span className="text-sm text-foreground-700 flex-1">{crit.nom}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusBadge}`}>{crit.conformite}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-2">Formule de Calcul — Score Pondéré Big Four</h3>
                  <p className="text-gray-400 text-sm">Score Global = Σ (Score Axe × Poids) / 100</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
                    {AUDIT_AXES_SITE.map((axe, i) => (
                      <span key={axe.id} className="flex items-center gap-1">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${axe.color}20`, color: axe.color }}>
                          {axe.label.substring(0, 16)} × {axe.poids}%
                        </span>
                        {i < AUDIT_AXES_SITE.length - 1 && <span className="text-gray-600">+</span>}
                      </span>
                    ))}
                    <span className="text-gray-600">=</span>
                    <span className="px-4 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-lg font-bold">{weightedScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: BENCHMARK BIG FOUR === */}
        {activeTab === 'benchmark' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Benchmark Big Four — KHEPRA vs Deloitte · PwC · EY · KPMG</h2>
                  <p className="text-foreground-600">Comparaison directe sur 10 critères clés — forces et écarts</p>
                </div>

                <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-foreground-950 text-white">
                          <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">Critère</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-center">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">KHEPRA</span>
                          </th>
                          <th className="p-4 text-center text-xs text-gray-400">Deloitte</th>
                          <th className="p-4 text-center text-xs text-gray-400">PwC</th>
                          <th className="p-4 text-center text-xs text-gray-400">EY</th>
                          <th className="p-4 text-center text-xs text-gray-400">KPMG</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-center text-emerald-400">Cible KHEPRA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BENCHMARK_BIG_FOUR.map((row, i) => {
                          const isStrength = row.critere === 'Core Web Vitals' || row.critere === 'Accessibilité WCAG' || row.critere === 'Design system';
                          return (
                            <tr key={i} className={`border-b border-background-100 ${i % 2 === 0 ? 'bg-white' : 'bg-background-50'} ${isStrength ? 'bg-emerald-50/30' : ''}`}>
                              <td className="p-4 font-bold text-foreground-800">
                                {row.critere}
                                {isStrength && <span className="ml-2 text-[10px] text-emerald-600 font-bold uppercase">Force</span>}
                              </td>
                              <td className="p-4 text-center">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs">{row.khepra}</span>
                              </td>
                              <td className="p-4 text-center text-foreground-500">{row.deloitte}</td>
                              <td className="p-4 text-center text-foreground-500">{row.pwc}</td>
                              <td className="p-4 text-center text-foreground-500">{row.ey}</td>
                              <td className="p-4 text-center text-foreground-500">{row.kpmg}</td>
                              <td className="p-4 text-center">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs">{row.cible}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-3">Analyse du Comité</h3>
                  <p className="text-gray-300 text-sm max-w-3xl mx-auto">
                    KHEPRA EXPERTS <strong className="text-white">surclasse les Big Four</strong> sur les Core Web Vitals, l'accessibilité WCAG et la cohérence du design system — une performance remarquable due à la stack moderne (React 19, TailwindCSS, StyleSystem). L'écart principal se situe sur <strong className="text-emerald-400">l'autorité de domaine, les backlinks et le volume de rapports publics</strong> — trois leviers directement corrélés à la taille et l'ancienneté, mais actionnables dès maintenant via la stratégie de contenu linkable et la campagne backlinks.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: CERTIFICATIONS & STANDARDS === */}
        {activeTab === 'certifications' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Matrice de Certification — Standards Internationaux</h2>
                  <p className="text-foreground-600">8 standards de référence — conformité actuelle et cibles</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CERTIFICATION_CHECKLIST.map((cert, i) => {
                    const isConforme = cert.statut.startsWith('Conforme');
                    const isPartiel = cert.statut.startsWith('Partiel');
                    const isNonAudite = cert.statut.startsWith('Non audité');
                    const borderColor = isConforme ? 'border-emerald-200' : isPartiel ? 'border-amber-200' : 'border-slate-200';
                    const bgColor = isConforme ? 'bg-emerald-50/30' : isPartiel ? 'bg-amber-50/30' : 'bg-slate-50/30';
                    const badgeColor = isConforme ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : isPartiel ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-600';
                    return (
                      <div key={i} className={`rounded-2xl border ${borderColor} ${bgColor} p-5`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-heading text-base font-bold text-foreground-950">{cert.standard}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                            {cert.statut}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-500 mb-3">{cert.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <i className="ri-flag-line text-foreground-400" />
                          <span className="text-foreground-600 font-bold">{cert.cible}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-2">Roadmap Certification</h3>
                  <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                    3 certifications maintenues (WCAG AA partiel, RGPD, Schema.org). 3 certifications ciblées J+180 (ISO 9241, OWASP Top 10, PageSpeed &gt; 95). 2 certifications stratégiques J+365 (ISAE 3000, ISO 27001).
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: ACTIONS CORRECTIVES === */}
        {activeTab === 'actions' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">10 Actions Correctives Priorisées</h2>
                  <p className="text-foreground-600">Classées par criticité · Effort estimé · Impact sur le score</p>
                </div>

                <div className="space-y-3">
                  {PRIORITY_ACTIONS_SITE.map((action) => (
                    <div key={action.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          action.priorite.includes('Critique') ? 'bg-red-50' : action.priorite.includes('Élevé') ? 'bg-amber-50' : 'bg-slate-50'
                        }`}>
                          <i className={`${
                            action.priorite.includes('Critique') ? 'ri-error-warning-line text-red-600' :
                            action.priorite.includes('Élevé') ? 'ri-alert-line text-amber-600' :
                            'ri-information-line text-slate-500'
                          } text-lg`} />
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          action.priorite.includes('Critique') ? 'bg-red-50 border border-red-200 text-red-700' :
                          action.priorite.includes('Élevé') ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                          'bg-slate-50 border border-slate-200 text-slate-600'
                        }`}>
                          {action.priorite}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground-800 mb-1">{action.label}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-400">
                          <span><i className="ri-time-line mr-1" />Délai : {action.delai}</span>
                          <span><i className="ri-timer-line mr-1" />Effort : {action.effort}</span>
                          <span className="text-emerald-600 font-bold"><i className="ri-arrow-up-circle-line mr-1" />{action.impact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-4">
                    <i className="ri-flashlight-line text-emerald-400 text-sm" />
                    <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Recommandation Unanime du Comité</span>
                  </div>
                  <p className="text-gray-300 max-w-2xl mx-auto text-sm">
                    Trois actions immédiates (J+7) : déployer CSP et headers sécurité, connecter les 12 pages orphelines, publier le registre des traitements. Gain immédiat : +5,1 points (score → 91,5/100). Les actions J+90 (backlinks, baromètre BCEAO, A/B testing) propulsent le score à 95/100. L'objectif 100% est atteignable avec les certifications ISO 27001 et ISAE 3000 à J+365.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: TRAJECTOIRE 100% === */}
        {activeTab === 'trajectoire' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Trajectoire vers 100% — Excellence Totale Big Four</h2>
                  <p className="text-foreground-600">4 phases · 10 actions correctives · 365 jours</p>
                </div>

                <div className="space-y-5">
                  {[
                    { phase: 'Phase 1 — Corrections Immédiates', timeline: 'J0-J30', score: 91.5, color: '#C2410C', progress: 100,
                      items: ['Déployer CSP + 3 headers sécurité manquants', 'Connecter 12 pages orphelines au maillage interne', 'Publier registre des traitements + DPO', 'Corriger contrastes WCAG sur pages secondaires', 'Ajouter skip links + landmarks sur layout principal'] },
                    { phase: 'Phase 2 — Rattrapage Stratégique', timeline: 'J31-J90', score: 95.0, color: '#E8C547', progress: 20,
                      items: ['Lancer campagne backlinks — 100 cibles qualifiées', 'Publier Baromètre Conformité BCEAO 2026', 'Déployer infrastructure A/B testing', 'Finaliser mode sombre 100% pages', 'Ajouter tests unitaires sur composants critiques'] },
                    { phase: 'Phase 3 — Construction d\'Autorité', timeline: 'J91-J180', score: 98.2, color: '#86BC25', progress: 0,
                      items: ['Créer 20 pages pays localisées', 'Publier 2 rapports sectoriels (COBAC, ESG)', 'Déployer suite tests E2E Playwright', 'Audit ISO 9241-210 ergonomie IHM', 'Optimisation GEO — 6 moteurs IA'] },
                    { phase: 'Phase 4 — Certification & Excellence', timeline: 'J181-J365', score: 100.0, color: '#0D7B5F', progress: 0,
                      items: ['Certification OWASP Top 10 complète', 'Pré-audit ISO 27001 sécurité information', 'Pré-audit ISAE 3000 contrôle qualité', '100% Core Web Vitals > 95', 'Revue finale Comité Big Four — Score 100/100'] },
                  ].map((phase, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-64 flex-shrink-0 p-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: `${phase.color}08` }}>
                          <span className="text-4xl font-bold font-heading mb-2" style={{ color: phase.color }}>{phase.score}</span>
                          <span className="text-xs text-foreground-500">/100</span>
                          <span className="text-xs text-foreground-500 mb-3">{phase.timeline}</span>
                          <div className="w-full max-w-[120px] h-2 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${phase.progress}%`, backgroundColor: phase.color }} />
                          </div>
                          <span className="text-xs font-bold mt-1" style={{ color: phase.color }}>{phase.progress}%</span>
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">{phase.phase}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {phase.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm text-foreground-600">
                                <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Score Evolution Chart */}
                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-4">Projection du Score</h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
                    {SCORE_EVOLUTION.map((s, i) => (
                      <div key={i} className="text-center">
                        <span className="block text-4xl font-bold font-heading text-white">{s.score.toFixed(1)}</span>
                        <span className="text-xs text-gray-400">{s.phase}</span>
                        <span className="block text-[10px] text-gray-500">{s.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full max-w-xl mx-auto h-3 rounded-full bg-white/10 overflow-hidden mt-4">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(86.4 / 100) * 100}%`,
                        background: 'linear-gradient(90deg, #E8C547 0%, #86BC25 50%, #0D7B5F 100%)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">86,4 → 91,5 → 95,0 → 98,2 → 100/100 (Excellence Big Four)</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Cross-link Ecosystem */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème Qualité KHEPRA — Accès Rapide
              </h2>
              <p className="text-foreground-600">Documents de référence · Audits · Dashboards qualité</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Audit Final KOS', path: '/audit-final-kos', icon: 'ri-scales-3-line', color: '#C2410C', badge: 'Score 47/100' },
                { name: 'KOS Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#86BC25', badge: '6 agents qualité' },
                { name: 'KOS Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-cpu-line', color: '#4F46E5', badge: 'Scoring KOS' },
                { name: 'Auto-Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-list-check', color: '#9B7B2C', badge: '25 tâches' },
                { name: 'Monitoring', path: '/monitoring', icon: 'ri-pulse-line', color: '#E8943A', badge: 'Logs & erreurs' },
                { name: 'Dashboard Admin', path: '/dashboard', icon: 'ri-bar-chart-2-line', color: '#6B4A3A', badge: 'KPI & leads' },
                { name: 'Revue Qualité', path: '/revue-conformite-qualite', icon: 'ri-award-line', color: '#86BC25', badge: '← Vous êtes ici', active: true },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                    link.active ? 'ring-2 ring-emerald-400 bg-emerald-50/40 border-emerald-300' : 'border-background-200 bg-background-50 hover:border-foreground-200'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.name}</span>
                  <span className="block text-[10px] text-foreground-400 mt-1">{link.badge}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}