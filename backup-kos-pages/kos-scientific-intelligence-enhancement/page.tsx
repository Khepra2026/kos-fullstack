import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useScientificIntelligenceEnhancement } from '@/hooks/useScientificIntelligenceEnhancement';
import type { ScientificMaturityKPI } from '@/hooks/useScientificIntelligenceEnhancement';

function formatNumber(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(0) + ' K';
  return String(value);
}

export default function scientificIntelligenceEnhancementPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    blocks,
    iaReasoning,
    iaAcademic,
    methodologySteps,
    econometricSkills,
    financialSkills,
    surveillanceInstitutions,
    esgFrameworks,
    validationAgents,
    antiHallucinationRules,
    maturityKPIs,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch,
  } = useScientificIntelligenceEnhancement();

  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [kpiView, setKpiView] = useState<'research' | 'analysis' | 'impact'>('research');

  const deployedBlocks = blocks.filter(b => b.status === 'deployed').length;
  const inProgressBlocks = blocks.filter(b => b.status === 'in_progress').length;
  const avgMaturity = Math.round(blocks.reduce((sum, b) => sum + b.maturity, 0) / blocks.length);

  const researchKPIs = useMemo(() => maturityKPIs.filter(k => k.category === 'research'), [maturityKPIs]);
  const analysisKPIs = useMemo(() => maturityKPIs.filter(k => k.category === 'analysis'), [maturityKPIs]);
  const impactKPIs = useMemo(() => maturityKPIs.filter(k => k.category === 'impact'), [maturityKPIs]);
  const activeKPIs = kpiView === 'research' ? researchKPIs : kpiView === 'analysis' ? analysisKPIs : impactKPIs;

  const economies = econometricSkills.filter(s => s.category === 'model');
  const validations = econometricSkills.filter(s => s.category === 'validation');
  const livrables = econometricSkills.filter(s => s.category === 'livrable');

  const interdictions = antiHallucinationRules.filter(r => r.type === 'interdiction');
  const obligations = antiHallucinationRules.filter(r => r.type === 'obligation');

  const finInstitutions = surveillanceInstitutions.filter(s => s.type === 'financial');
  const acadInstitutions = surveillanceInstitutions.filter(s => s.type === 'academic');

  const scrollToBlock = (blockId: number) => {
    setActiveBlock(blockId);
    const el = document.getElementById(`block-${blockId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <hubLayout hubId={64}>
      <SeoHead
        title="KOS Scientific Intelligence Enhancement Program™ — Big Four | KHEPRA EXPERTS"
        description="Programme de renforcement des compétences des agents KOS avec les IA avancées de recherche scientifique. 10 blocs : cartographie IA raisonnement & académique, méthodologie scientifique, économétrie, modélisation financière, veille stratégique, ESG, validation croisée, lutte contre les hallucinations."
        keywords="KOS scientific intelligence, IA recherche scientifique, Consensus Elicit SciSpace, économétrie KOS, modélisation financière, revue littérature Big Four, ESG ISSB GRI TCFD, validation croisée multi-IA, KHEPRA EXPERTS"
        canonicalPath="/kos-scientific-intelligence-enhancement"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Vast%20scientific%20knowledge%20landscape%20with%20interconnected%20research%20nodes%20and%20academic%20citation%20networks%20radiating%20from%20a%20central%20intelligence%20core%2C%20deep%20emerald%20and%20warm%20amber%20gradients%2C%20sophisticated%20data%20visualization%20patterns%20with%20floating%20molecular%20structures%20and%20geometric%20neural%20pathways%20representing%20multiple%20AI%20research%20assistants%20collaborating%2C%20elegant%20academic%20institution%20aesthetic%2C%20clean%20minimalist%20composition%20with%20abstract%20knowledge%20transfer%20visualization%2C%20dark%20background%20with%20glowing%20research%20streams%2C%20no%20text%20no%20human%20figures&width=1920&height=600&seq=kos-scientific-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-flask-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  Master Prompt Big Four™
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Chaque agent KOS opère au standard doctoral.
              <span className="block text-emerald-400 mt-2">Recherche scientifique · Économétrie · Modélisation.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Programme de renforcement des compétences scientifiques des {globalMetrics.totalAgents} agents KOS.{' '}
              <strong className="text-white">9 IA scientifiques</strong> mobilisées,{' '}
              <strong className="text-white">10 blocs</strong> de formation intensive,{' '}
              <strong className="text-white">{globalMetrics.certificationsDelivered} certifications</strong> délivrées.{' '}
              Revue de littérature niveau doctoral, validation croisée multi-IA,{' '}
              <strong className="text-white">hallucinations &lt; {globalMetrics.hallucinationRate}%</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{deployedBlocks}/10 blocs déployés</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-sm text-amber-300 font-semibold">{inProgressBlocks} en cours</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">Maturité {avgMaturity}%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{formatNumber(globalMetrics.studiesExploitedMonthly)} études/mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Metrics Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Agents Formés', value: `${globalMetrics.agentsFormed}/${globalMetrics.totalAgents}`, icon: 'ri-team-line', color: '#10B981' },
              { label: 'Certifications', value: String(globalMetrics.certificationsDelivered), icon: 'ri-award-line', color: '#F59E0B' },
              { label: 'Études/mois', value: formatNumber(globalMetrics.studiesExploitedMonthly), icon: 'ri-article-line', color: '#0EA5E9' },
              { label: 'Hallucinations', value: `${globalMetrics.hallucinationRate}%`, icon: 'ri-alert-line', color: '#EF4444' },
              { label: 'Validation Croisée', value: `${globalMetrics.crossValidationRate}%`, icon: 'ri-git-branch-line', color: '#8B5CF6' },
              { label: 'Publications/an', value: formatNumber(globalMetrics.publicationsYearly), icon: 'ri-file-text-line', color: '#EC4899' },
              { label: 'Maturité Moy.', value: `${globalMetrics.avgMaturity}/100`, icon: 'ri-medal-line', color: '#14B8A6' },
              { label: 'Dernier Audit', value: new Date(globalMetrics.lastAudit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), icon: 'ri-calendar-check-line', color: '#F97316' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                <span className="block text-base font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block Navigation — Quick Jump */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap mr-1">Blocs</span>
            {blocks.map(block => (
              <button
                key={block.id}
                onClick={() => scrollToBlock(block.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeBlock === block.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <span>{block.number}</span>
                <span className="hidden sm:inline">{block.title}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${block.status === 'deployed' ? 'bg-emerald-500' : block.status === 'in_progress' ? 'bg-amber-500' : 'bg-slate-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-background-200 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement du programme Scientific Intelligence Engine...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {!loading && error && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl" />
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2" />Réessayer
            </button>
          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          {/* BLOC 1 — Cartographie des IA de Raisonnement */}
          <section id="block-1" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#F59E0B' }}>01</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Cartographie des IA de Raisonnement</h2>
                  <p className="text-foreground-500 text-sm">ChatGPT · Claude · Gemini — Analyse stratégique, modélisation, recherche</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {iaReasoning.map(model => (
                  <div key={model.model} className="rounded-2xl bg-white border border-background-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-5" style={{ backgroundColor: model.color }} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${model.color}15` }}>
                        <i className={`${model.icon} text-2xl`} style={{ color: model.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground-950 font-heading">{model.model}</h3>
                        <p className="text-xs text-foreground-400">{model.provider} · {model.type === 'reasoning' ? 'Raisonnement' : 'Académique'}</p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-500 mb-4 leading-relaxed">{model.mission}</p>
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Capacités</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="text-[10px] px-2 py-1 rounded-full border" style={{ borderColor: `${model.color}40`, color: model.color, backgroundColor: `${model.color}08` }}>{cap}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Cas d'usage KHEPRA</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {model.useCases.map(uc => (
                          <span key={uc} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200">{uc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 2 — IA de Recherche Académique */}
          <section id="block-2" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#8B5CF6' }}>02</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">IA de Recherche Académique</h2>
                  <p className="text-foreground-500 text-sm">Consensus · Elicit · SciSpace · Semantic Scholar · Research Rabbit · Connected Papers</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {iaAcademic.map(model => (
                  <div key={model.model} className="rounded-2xl bg-background-50 border border-background-200 p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-5" style={{ backgroundColor: model.color }} />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${model.color}15` }}>
                        <i className={`${model.icon} text-xl`} style={{ color: model.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950 font-heading">{model.model}</h3>
                        <p className="text-[10px] text-foreground-400">{model.provider}</p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-500 mb-3 leading-relaxed">{model.mission}</p>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: `${model.color}30`, color: model.color, backgroundColor: `${model.color}06` }}>{cap}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {model.useCases.map(uc => (
                        <span key={uc} className="text-[10px] px-2 py-0.5 rounded-full bg-white text-foreground-500 border border-background-200">{uc}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 3 — Méthodologie Scientifique Obligatoire */}
          <section id="block-3" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#10B981' }}>03</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Méthodologie Scientifique Obligatoire</h2>
                  <p className="text-foreground-500 text-sm">Recherche documentaire · Analyse comparative · Évaluation critique · Synthèse</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-background-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {methodologySteps.map((step) => (
                    <div key={step.step} className="relative rounded-2xl bg-white border border-background-200 p-5 text-center">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: step.color }}>
                        {step.step}
                      </div>
                      <div className="w-14 h-14 mx-auto mt-2 mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${step.color}10` }}>
                        <i className={`${step.icon} text-2xl`} style={{ color: step.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1.5">{step.name}</h3>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-2.5">{step.description}</p>
                      <div className="pt-3 border-t border-background-100">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {step.requirements.map((req, j) => (
                            <span key={j} className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-50 text-foreground-500 border border-background-200">{req}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 4 — Économétrie et Modélisation */}
          <section id="block-4" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#0EA5E9' }}>04</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Économétrie et Modélisation</h2>
                  <p className="text-foreground-500 text-sm">Régressions · Logit/Probit · Panel · Séries temporelles · VAR · ARIMA</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />En cours
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="rounded-2xl bg-background-50 border border-background-200 p-4">
                  <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-function-line" style={{ color: '#0EA5E9' }} />Modèles ({economies.length})
                  </h4>
                  {economies.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-background-100 mb-2 last:mb-0">
                      <div className="flex items-center gap-2">
                        <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                        <div>
                          <span className="text-xs font-bold text-foreground-900 block">{skill.name}</span>
                          <span className="text-[10px] text-foreground-400">{skill.tools.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 80 ? '#10B981' : skill.maturity >= 60 ? '#F59E0B' : '#EF4444' }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground-600 w-7 text-right">{skill.maturity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-background-50 border border-background-200 p-4">
                  <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-checkbox-multiple-line" style={{ color: '#14B8A6' }} />Validation ({validations.length})
                  </h4>
                  {validations.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-background-100 mb-2 last:mb-0">
                      <div className="flex items-center gap-2">
                        <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                        <div>
                          <span className="text-xs font-bold text-foreground-900 block">{skill.name}</span>
                          <span className="text-[10px] text-foreground-400">{skill.tools.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 80 ? '#10B981' : skill.maturity >= 60 ? '#F59E0B' : '#EF4444' }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground-600 w-7 text-right">{skill.maturity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-background-50 border border-background-200 p-4">
                  <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-file-chart-line" style={{ color: '#F59E0B' }} />Livrables ({livrables.length})
                  </h4>
                  {livrables.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-background-100 mb-2 last:mb-0">
                      <div className="flex items-center gap-2">
                        <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                        <div>
                          <span className="text-xs font-bold text-foreground-900 block">{skill.name}</span>
                          <span className="text-[10px] text-foreground-400">{skill.tools.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 80 ? '#10B981' : skill.maturity >= 60 ? '#F59E0B' : '#EF4444' }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground-600 w-7 text-right">{skill.maturity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 5 — Modélisation Financière */}
          <section id="block-5" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#EF4444' }}>05</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Modélisation Financière</h2>
                  <p className="text-foreground-500 text-sm">DCF · VAN · TRI · Monte Carlo · Scoring Crédit · Analyse Sensibilité — Standards CFA Institute & IVSC</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financialSkills.map(skill => (
                  <div key={skill.name} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${skill.color}15` }}>
                        <i className={`${skill.icon} text-xl`} style={{ color: skill.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{skill.name}</h3>
                        <span className="text-[10px] text-foreground-400">{skill.standard}</span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-500 leading-relaxed mb-3">{skill.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 85 ? '#10B981' : skill.maturity >= 75 ? '#F59E0B' : '#EF4444' }} />
                        </div>
                        <span className="text-xs font-bold text-foreground-600">{skill.maturity}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 6 — Veille Stratégique Mondiale */}
          <section id="block-6" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#EC4899' }}>06</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Veille Stratégique Mondiale</h2>
                  <p className="text-foreground-500 text-sm">World Bank · IMF · AfDB · BCEAO · Harvard · MIT · INSEAD · HEC Paris</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />En cours
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-bank-line" style={{ color: '#0052CC' }} />Institutions Financières ({finInstitutions.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {finInstitutions.map(inst => (
                      <div key={inst.name} className="rounded-xl bg-background-50 border border-background-200 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${inst.color}12` }}>
                          <i className={`${inst.icon} text-lg`} style={{ color: inst.color }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-900">{inst.name}</h3>
                          <span className="text-[10px] text-foreground-400">{inst.country} · {inst.domain}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-graduation-cap-line" style={{ color: '#A51C30' }} />Recherche Académique ({acadInstitutions.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {acadInstitutions.map(inst => (
                      <div key={inst.name} className="rounded-xl bg-background-50 border border-background-200 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${inst.color}12` }}>
                          <i className={`${inst.icon} text-lg`} style={{ color: inst.color }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-900">{inst.name}</h3>
                          <span className="text-[10px] text-foreground-400">{inst.country} · {inst.domain}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 7 — ESG et Développement Durable */}
          <section id="block-7" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#14B8A6' }}>07</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">ESG et Développement Durable</h2>
                  <p className="text-foreground-500 text-sm">ISSB · GRI · TCFD — Analyses, matrices de matérialité, risques</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {esgFrameworks.map(fw => (
                  <div key={fw.name} className="rounded-2xl bg-white border border-background-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl opacity-4" style={{ backgroundColor: fw.color }} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${fw.color}15` }}>
                        <i className={`${fw.icon} text-2xl`} style={{ color: fw.color }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground-950 font-heading">{fw.name}</h3>
                        <p className="text-[10px] text-foreground-400">{fw.fullName}</p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed">{fw.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 8 — Validation Croisée Multi-IA */}
          <section id="block-8" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#6366F1' }}>08</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Validation Croisée Multi-IA</h2>
                  <p className="text-foreground-500 text-sm">4 agents · 7 IA — Protocole de validation obligatoire avant toute production stratégique</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-0.5 bg-background-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {validationAgents.map((agent, idx) => (
                    <div key={agent.id} className="relative rounded-2xl bg-background-50 border border-background-200 p-5 text-center">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: agent.color }}>
                        {idx + 1}
                      </div>
                      <div className="w-14 h-14 mx-auto mt-2 mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${agent.color}10` }}>
                        <i className={`${agent.icon} text-2xl`} style={{ color: agent.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1.5">{agent.name}</h3>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-3">{agent.role}</p>
                      <div className="pt-2 border-t border-background-100">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {agent.tools.map(tool => (
                            <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded-full border" style={{ borderColor: `${agent.color}30`, color: agent.color, backgroundColor: `${agent.color}06` }}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 9 — Lutte Contre les Hallucinations */}
          <section id="block-9" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#F97316' }}>09</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Lutte Contre les Hallucinations</h2>
                  <p className="text-foreground-500 text-sm">4 interdictions absolues · 5 obligations documentaires — Zéro tolérance</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white border border-background-200 p-5">
                  <h4 className="text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
                      <i className="ri-forbid-line text-red-500" />
                    </div>
                    Interdictions Absolues ({interdictions.length})
                  </h4>
                  <div className="space-y-2.5">
                    {interdictions.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${rule.color}15` }}>
                          <i className={`${rule.icon} text-sm`} style={{ color: rule.color }} />
                        </div>
                        <p className="text-xs text-foreground-800 leading-relaxed pt-0.5">{rule.rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-background-200 p-5">
                  <h4 className="text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50">
                      <i className="ri-checkbox-circle-line text-emerald-600" />
                    </div>
                    Obligations Documentaires ({obligations.length})
                  </h4>
                  <div className="space-y-2.5">
                    {obligations.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${rule.color}15` }}>
                          <i className={`${rule.icon} text-sm`} style={{ color: rule.color }} />
                        </div>
                        <p className="text-xs text-foreground-800 leading-relaxed pt-0.5">{rule.rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 10 — KPI de Maturité Scientifique */}
          <section id="block-10" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#78716C' }}>10</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">KPI de Maturité Scientifique</h2>
                  <p className="text-foreground-500 text-sm">Recherche · Analyse · Impact — 9 indicateurs, dashboard temps réel</p>
                </div>
              </div>

              {/* KPI View Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-full bg-background-200 p-1">
                  {(['research', 'analysis', 'impact'] as const).map(view => (
                    <button key={view} onClick={() => setKpiView(view)} className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${kpiView === view ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                      <i className={view === 'research' ? 'ri-search-line' : view === 'analysis' ? 'ri-bar-chart-2-line' : 'ri-rocket-2-line'} style={{ marginRight: '0.375rem' }} />
                      {view === 'research' ? `Recherche (${researchKPIs.length})` : view === 'analysis' ? `Analyse (${analysisKPIs.length})` : `Impact (${impactKPIs.length})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeKPIs.map((kpi: ScientificMaturityKPI) => {
                  const pct = Math.round((kpi.current / kpi.target) * 100);
                  const barColor = pct >= 90 ? '#10B981' : pct >= 70 ? '#F59E0B' : '#EF4444';

                  return (
                    <div key={kpi.id} className="rounded-2xl bg-background-50 border border-background-200 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}12` }}>
                          <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                        </div>
                        <h3 className="text-xs font-bold text-foreground-900 leading-tight">{kpi.name}</h3>
                      </div>
                      <div className="text-2xl font-bold font-heading mb-1" style={{ color: barColor }}>
                        {formatNumber(kpi.current)}
                        <span className="text-xs text-foreground-400 ml-1">{kpi.unit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                        <span>Cible : {formatNumber(kpi.target)} {kpi.unit}</span>
                        <span className={kpi.trend > 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                          {kpi.trend > 0 ? '+' : ''}{formatNumber(kpi.trend)}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                      </div>
                      {kpi.subMetrics && (
                        <div className="mt-3 pt-3 border-t border-background-100 space-y-1">
                          {kpi.subMetrics.map(sub => (
                            <div key={sub.label} className="flex items-center justify-between text-[10px]">
                              <span className="text-foreground-500">{sub.label}</span>
                              <span className="font-bold text-foreground-700">
                                {formatNumber(sub.value)}
                                <span className="text-foreground-400 font-normal"> / {formatNumber(sub.target)}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Livrable Final Attendu */}
          <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-star-line text-emerald-600 text-sm" />
                  <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Livrable Final Attendu</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">
                  Chaque agent KOS produit désormais
                </h2>
                <p className="text-foreground-600 max-w-3xl mx-auto">
                  Le standard de rigueur scientifique Big Four. Revue de littérature doctorale, modélisation certifiée, traçabilité totale.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { icon: 'ri-book-open-line', label: 'Revue de littérature niveau doctoral', color: '#0EA5E9' },
                  { icon: 'ri-bar-chart-box-line', label: 'Analyse stratégique Big Four', color: '#F59E0B' },
                  { icon: 'ri-calculator-line', label: 'Modélisation financière internationale', color: '#10B981' },
                  { icon: 'ri-function-line', label: 'Analyse économétrique rigoureuse', color: '#8B5CF6' },
                  { icon: 'ri-radar-line', label: 'Veille scientifique continue', color: '#EF4444' },
                  { icon: 'ri-lightbulb-line', label: 'Synthèse décisionnelle dirigeants', color: '#EC4899' },
                  { icon: 'ri-file-text-line', label: 'Rapport intégralement sourcé', color: '#14B8A6' },
                  { icon: 'ri-globe-line', label: 'Contenu optimisé SEO + GEO', color: '#6366F1' },
                  { icon: 'ri-footprint-line', label: 'Traçabilité complète', color: '#78716C' },
                  { icon: 'ri-refresh-line', label: 'Amélioration continue', color: '#F97316' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center hover:shadow-md transition-all cursor-default">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                      <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                    </div>
                    <p className="text-xs font-bold text-foreground-900 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cross-link Ecosystem */}
          <section className="py-12 sm:py-16 bg-white border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Écosystème KOS — Intelligence Scientifique
                </h2>
                <p className="text-foreground-600">Accès rapide aux hubs connexes de l'écosystème recherche et IA KOS.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Scientific Intelligence', path: '/kos-scientific-intelligence-enhancement', icon: 'ri-flask-line', color: '#10B981', current: true },
                  { label: 'LLM Excellence Engine', path: '/kos-llm-excellence-engine', icon: 'ri-award-line', color: '#F59E0B' },
                  { label: 'Experts LLM Automates', path: '/kos-llm-experts-automates', icon: 'ri-cpu-line', color: '#8B5CF6' },
                  { label: 'Research Institute', path: '/kos-research-institute', icon: 'ri-microscope-line', color: '#0EA5E9' },
                  { label: 'Strategic Intelligence', path: '/kos-strategic-intelligence', icon: 'ri-mind-map', color: '#6366F1' },
                  { label: 'AI Governance & Ethics', path: '/kos-ai-governance-ethics', icon: 'ri-scales-3-line', color: '#14B8A6' },
                  { label: 'Enterprise Brain OS', path: '/kos-enterprise-brain-os', icon: 'ri-brain-2-line', color: '#EC4899' },
                  { label: 'Knowledge Innovation', path: '/kos-knowledge-innovation-command', icon: 'ri-lightbulb-line', color: '#F97316' },
                ].map(link => (
                  <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                    link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
                  }`}>
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}12` }}>
                      <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                    </div>
                    <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                    {link.current && (
                      <span className="block text-[10px] text-emerald-700 font-bold mt-1">Vous êtes ici</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </hubLayout>
  );
}





