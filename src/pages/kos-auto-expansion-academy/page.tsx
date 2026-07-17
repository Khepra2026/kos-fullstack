import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSAutoExpansionAcademy } from '@/hooks/useKOSAutonomousGrowthOrchestrator';
import type { AcademyModule, AcademyLearner, AcademyCertification, AcademyProductionPipeline } from '@/mocks/kosAutoExpansionAcademy';
import ScrollReveal from '@/components/feature/ScrollReveal';

type TabId = 'overview' | 'modules' | 'learners' | 'certifications' | 'pipeline' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'modules', label: 'Modules', icon: 'ri-book-open-line' },
  { id: 'learners', label: 'Apprenants', icon: 'ri-group-line' },
  { id: 'certifications', label: 'Certifications', icon: 'ri-award-line' },
  { id: 'pipeline', label: 'Pipeline Production', icon: 'ri-git-branch-line' },
  { id: 'kpis', label: 'KPIs', icon: 'ri-bar-chart-line' },
];

const LEVEL_COLORS: Record<string, string> = {
  Foundation: 'bg-emerald-100 text-emerald-700',
  Practitioner: 'bg-primary-100 text-primary-700',
  Expert: 'bg-accent-100 text-accent-700',
  Master: 'bg-secondary-100 text-secondary-700',
};

const STAGE_COLORS: Record<string, string> = {
  scripting: 'bg-slate-100 text-slate-600',
  validation: 'bg-amber-100 text-amber-700',
  recording: 'bg-blue-50 text-blue-700',
  review: 'bg-secondary-100 text-secondary-700',
  published: 'bg-emerald-100 text-emerald-700',
};

const STAGE_LABELS: Record<string, string> = {
  scripting: 'Scripting', validation: 'Validation', recording: 'Enregistrement', review: 'Revue', published: 'Publié',
};

function ColorClass(color: string, type: 'bg' | 'text' | 'ring'): string {
  const map: Record<string, string> = {
    'bg-primary': 'bg-primary-100', 'text-primary': 'text-primary-700',
    'bg-accent': 'bg-accent-100', 'text-accent': 'text-accent-700',
    'bg-secondary': 'bg-secondary-100', 'text-secondary': 'text-secondary-700',
  };
  return map[`${type}-${color}`] || '';
}

export default function KOSAutoExpansionAcademyPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedModule, setSelectedModule] = useState<AcademyModule | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<AcademyLearner | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const { modules, learners, certifications, pipeline, kpis, globalStats, loading } = useKOSAutoExpansionAcademy();

  const filteredModules = levelFilter === 'all' ? modules : modules.filter(m => m.level === levelFilter);

  return (
    <KOSHubLayout hubId={117} activeTab="Academy" tabLabel="Auto-Expansion Academy™">
      <SeoHead
        title="KOS Auto-Expansion Academy™ — Université Autonome KHEPRA EXPERTS | Q4 2026"
        description="Université autonome KHEPRA EXPERTS. 8 modules, 2080 apprenants actifs, 1310 certifications délivrées. Conformité BCEAO, AML, BEPS, Gouvernance, ESG. Zéro dépendance externe."
        keywords="Academy KHEPRA EXPERTS, formation conformité Afrique, certification BCEAO COBAC, LBC/FT formation, gouvernance bancaire formation"
        canonicalPath="/kos-auto-expansion-academy"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* ── HERO ── */}
      <section className="relative bg-background-100 border-b border-background-200/70 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20African%20executive%20education%20center%20with%20digital%20screens%20showing%20compliance%20charts%20and%20regulatory%20frameworks%20professionals%20studying%20in%20sleek%20contemporary%20learning%20environment%20sophisticated%20corporate%20academy%20with%20warm%20natural%20light%20and%20clean%20minimalist%20design%20no%20text%20premium%20institutional%20photography&width=1920&height=500&seq=academy-hero-kos-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-10"
            width="1920"
            height="500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">
                KOS AUTO-EXPANSION ACADEMY™ — Trajectoire Q4 2026
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Université Autonome
              <span className="block text-primary-400 mt-1">KHEPRA EXPERTS</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{globalStats.totalLearners.toLocaleString()} apprenants actifs</strong> •{' '}
              <strong className="text-white">{globalStats.liveModules} modules</strong> en production •{' '}
              <strong className="text-primary-300">{globalStats.totalCertifications.toLocaleString()} certifications</strong> délivrées.{' '}
              Zéro dépendance externe. <strong className="text-white">{globalStats.countries} pays.</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-400/25">
              <i className="ri-sparkling-line text-accent-400 text-sm" />
              <span className="text-sm text-accent-300 font-medium">{globalStats.autoGeneratedContent} contenu auto-généré · Zéro API externe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map(tab => (
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
      </div>

      {/* ── STATS BAR ── */}
      <section className="py-6 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex items-center justify-center gap-2 mb-3 text-xs text-foreground-400">
              <i className="ri-loader-4-line animate-spin" />
              <span>Chargement...</span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Apprenants actifs', value: globalStats.activeLearners.toLocaleString(), icon: 'ri-user-heart-line', color: '#4F46E5' },
              { label: 'Modules live', value: String(globalStats.liveModules), icon: 'ri-book-open-line', color: '#86BC25' },
              { label: 'Certifications', value: globalStats.totalCertifications.toLocaleString(), icon: 'ri-award-line', color: '#9B7B2C' },
              { label: 'Complétion', value: `${globalStats.avgCompletionRate}%`, icon: 'ri-percent-line', color: '#0D7B5F' },
              { label: 'NPS Academy', value: `${globalStats.avgNPS}/10`, icon: 'ri-emotion-happy-line', color: '#C2410C' },
              { label: 'Heures CPD', value: `${(globalStats.totalCpdHours / 1000).toFixed(0)}k`, icon: 'ri-time-line', color: '#0891B2' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                </div>
                <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                <span className="text-[10px] text-foreground-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ TABS ═══════════════════════════════════ */}

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  KOS Auto-Expansion Academy™
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">{globalStats.trajectoryNote}</p>
              </div>
            </ScrollReveal>

            {/* Mission Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: 'ri-robot-2-line', color: '#4F46E5', title: '78% Auto-Généré', desc: 'Contenu pédagogique auto-généré par KOS Knowledge Factory™ — syllabus, scripts, évaluations. Zéro dépendance externe.' },
                { icon: 'ri-globe-line', color: '#86BC25', title: '17 Pays UEMOA+CEMAC', desc: '8 pays UEMOA + 6 pays CEMAC + zones additionnelles. Réglementation localisée par juridiction pour chaque module.' },
                { icon: 'ri-award-line', color: '#9B7B2C', title: '8 Certifications Reconnues', desc: 'Certifications reconnues par BCEAO, COBAC, GAFI, OHADA, IFC. Valeur CPD officielle. Renouvellement auto-planifié.' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white border border-background-200 rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${item.color}15` }}>
                      <i className={`${item.icon} text-2xl`} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground-600 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Q4 Roadmap */}
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary-50 to-background-50 border border-primary-200/50 rounded-2xl p-6">
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-road-map-line text-primary-500" />
                  Trajectoire Q4 2026 — KOS Auto-Expansion
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Apprenants cible', current: 2080, target: 5000, unit: '' },
                    { label: 'Modules cible', current: 8, target: 20, unit: '' },
                    { label: 'Certifications cible', current: 1310, target: 3000, unit: '' },
                    { label: 'Complétion cible', current: 67, target: 80, unit: '%' },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-primary-200/30">
                      <p className="text-xs text-foreground-500 mb-1">{kpi.label}</p>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-xl font-bold text-primary-600">{kpi.current.toLocaleString()}{kpi.unit}</span>
                        <span className="text-xs text-foreground-400 mb-0.5">/ {kpi.target.toLocaleString()}{kpi.unit}</span>
                      </div>
                      <div className="w-full h-1.5 bg-primary-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(kpi.current / kpi.target) * 100}%` }} />
                      </div>
                      <p className="text-[10px] text-foreground-400 mt-1">{Math.round((kpi.current / kpi.target) * 100)}% atteint</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Top modules preview */}
            <ScrollReveal>
              <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-5">Modules Phares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.slice(0, 4).map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => { setActiveTab('modules'); setSelectedModule(mod); }}
                    className="bg-white border border-background-200 rounded-2xl p-5 text-left hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${ColorClass(mod.color, 'bg')}`}>
                      <i className={`${mod.icon} text-lg ${ColorClass(mod.color, 'text')}`} />
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block ${LEVEL_COLORS[mod.level]}`}>{mod.level}</span>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1 leading-tight">{mod.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                      <span><i className="ri-user-line mr-0.5" />{mod.enrollees}</span>
                      <span><i className="ri-time-line mr-0.5" />{mod.duration}</span>
                      <span>{mod.completionRate}% complété</span>
                    </div>
                    <div className="w-full h-1 bg-background-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary-400 rounded-full" style={{ width: `${mod.completionRate}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* TAB: MODULES */}
      {activeTab === 'modules' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'Foundation', 'Practitioner', 'Expert', 'Master'].map(level => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    levelFilter === level ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                >
                  {level === 'all' ? `Tous (${modules.length})` : `${level} (${modules.filter(m => m.level === level).length})`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* List */}
              <div className="lg:col-span-1 space-y-3">
                {filteredModules.map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                      selectedModule?.id === mod.id ? 'border-foreground-300 bg-white shadow-md' : 'bg-white border-background-200 hover:border-background-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${ColorClass(mod.color, 'bg')}`}>
                        <i className={`${mod.icon} text-sm ${ColorClass(mod.color, 'text')}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${LEVEL_COLORS[mod.level]}`}>{mod.level}</span>
                          {mod.autoGenerated && (
                            <span className="text-[8px] text-primary-500 font-bold bg-primary-50 px-1.5 py-0.5 rounded-full">AUTO</span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-foreground-950 leading-tight mb-1">{mod.title}</h3>
                        <div className="flex items-center gap-2 text-[9px] text-foreground-400">
                          <span>{mod.enrollees} apprenants</span>
                          <span>·</span>
                          <span>{mod.duration}</span>
                          <span>·</span>
                          <span className={`font-bold ${mod.status === 'live' ? 'text-emerald-600' : 'text-amber-600'}`}>{mod.status === 'live' ? 'LIVE' : 'DRAFT'}</span>
                        </div>
                        <div className="w-full h-1 bg-background-200 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-primary-400 rounded-full" style={{ width: `${mod.completionRate}%` }} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail */}
              <div className="lg:col-span-2">
                {selectedModule ? (
                  <div className="bg-white border border-background-200 rounded-2xl p-6 sticky top-24">
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${ColorClass(selectedModule.color, 'bg')}`}>
                        <i className={`${selectedModule.icon} text-xl ${ColorClass(selectedModule.color, 'text')}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[selectedModule.level]}`}>{selectedModule.level}</span>
                          <span className="text-xs text-foreground-500">{selectedModule.domain}</span>
                          {selectedModule.autoGenerated && (
                            <span className="text-[9px] text-primary-600 font-bold bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200/50">AUTO-GÉNÉRÉ</span>
                          )}
                        </div>
                        <h2 className="font-heading text-lg font-bold text-foreground-950 leading-tight">{selectedModule.title}</h2>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-600 mb-5 leading-relaxed">{selectedModule.description}</p>
                    <div className="grid grid-cols-4 gap-3 mb-5">
                      {[
                        { label: 'Apprenants', value: selectedModule.enrollees, icon: 'ri-user-line' },
                        { label: 'Leçons', value: selectedModule.lessons, icon: 'ri-play-line' },
                        { label: 'Durée', value: selectedModule.duration, icon: 'ri-time-line' },
                        { label: 'CPD', value: `${selectedModule.cpd_hours}h`, icon: 'ri-bookmark-line' },
                      ].map((s, i) => (
                        <div key={i} className="bg-background-50 border border-background-200 rounded-lg p-3 text-center">
                          <i className={`${s.icon} text-foreground-400 text-base block mb-1`} />
                          <span className="block text-sm font-bold text-foreground-950">{s.value}</span>
                          <span className="text-[9px] text-foreground-400">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground-500">Taux de complétion</span>
                        <span className="font-bold text-foreground-950">{selectedModule.completionRate}%</span>
                      </div>
                      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${selectedModule.completionRate}%` }} />
                      </div>
                    </div>
                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Syllabus ({selectedModule.syllabus.length} modules)</h4>
                      <div className="space-y-1.5">
                        {selectedModule.syllabus.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 text-[9px] font-bold">{i + 1}</span>
                            <span className="text-foreground-700 pt-0.5">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-background-200">
                      <div className="flex-1">
                        <span className="text-[10px] text-foreground-400">Certification</span>
                        <p className="text-xs font-bold text-foreground-950">{selectedModule.certificationCode}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-foreground-400">Impact KPI</span>
                        <p className="text-xs font-semibold text-emerald-600">{selectedModule.kpiImpact}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background-50 border border-background-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-book-open-line text-2xl text-primary-500" />
                    </div>
                    <p className="text-foreground-700 font-semibold">Sélectionnez un module</p>
                    <p className="text-xs text-foreground-400 mt-1">Cliquez sur un module pour voir le détail</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: LEARNERS */}
      {activeTab === 'learners' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-3">Tableau de Bord Apprenants</h2>
              <p className="text-foreground-600">{globalStats.activeLearners.toLocaleString()} apprenants actifs · {globalStats.institutions} institutions · {globalStats.countries} pays</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* List */}
              <div className="lg:col-span-1 space-y-2">
                {learners.map(learner => (
                  <button
                    key={learner.id}
                    onClick={() => setSelectedLearner(learner)}
                    className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                      selectedLearner?.id === learner.id ? 'border-foreground-300 bg-white shadow-md' : 'bg-white border-background-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-700">{learner.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground-950 truncate">{learner.name}</p>
                        <p className="text-[9px] text-foreground-500 truncate">{learner.role} · {learner.country}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex-1 h-1 bg-background-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-400 rounded-full" style={{ width: `${learner.progression}%` }} />
                          </div>
                          <span className="text-[9px] text-foreground-400">{learner.progression}%</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          learner.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          learner.status === 'active' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600'
                        }`}>{learner.score}/100</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {/* Detail */}
              <div className="lg:col-span-2">
                {selectedLearner ? (
                  <div className="bg-white border border-background-200 rounded-2xl p-6 sticky top-24">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-primary-700">{selectedLearner.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-heading text-xl font-bold text-foreground-950">{selectedLearner.name}</h2>
                        <p className="text-sm text-foreground-600">{selectedLearner.role}</p>
                        <p className="text-xs text-foreground-500">{selectedLearner.organization} · {selectedLearner.country}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            selectedLearner.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            selectedLearner.status === 'active' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600'
                          }`}>{selectedLearner.status === 'completed' ? 'Complété' : selectedLearner.status === 'active' ? 'Actif' : 'Inactif'}</span>
                          <span className="text-xs font-bold text-foreground-950">Score : {selectedLearner.score}/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-5">
                      {[
                        { label: 'Modules', value: `${selectedLearner.modulesCompleted}/${selectedLearner.modulesEnrolled}` },
                        { label: 'Progression', value: `${selectedLearner.progression}%` },
                        { label: 'CPD', value: `${selectedLearner.totalCpdHours}h` },
                        { label: 'Certifs', value: String(selectedLearner.certifications.length) },
                      ].map((s, i) => (
                        <div key={i} className="bg-background-50 border border-background-200 rounded-lg p-3 text-center">
                          <span className="block text-sm font-bold text-foreground-950">{s.value}</span>
                          <span className="text-[9px] text-foreground-400">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground-500">Progression globale</span>
                        <span className="font-bold">{selectedLearner.progression}%</span>
                      </div>
                      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${selectedLearner.progression}%` }} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Module en cours</h4>
                      <p className="text-sm font-semibold text-foreground-900">{selectedLearner.currentModule}</p>
                      <p className="text-xs text-foreground-500 mt-0.5">Dernière activité : {selectedLearner.lastActivity}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Certifications obtenues</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLearner.certifications.map(cert => (
                          <span key={cert} className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold border border-accent-200/50">{cert}</span>
                        ))}
                        {selectedLearner.certifications.length === 0 && (
                          <span className="text-xs text-foreground-400">Aucune certification — en cours</span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background-50 border border-background-200 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-user-heart-line text-2xl text-primary-500" />
                    </div>
                    <p className="text-foreground-700 font-semibold">Sélectionnez un apprenant</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: CERTIFICATIONS */}
      {activeTab === 'certifications' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-3">
                {certifications.length} Certifications Reconnues
              </h2>
              <p className="text-foreground-600">{globalStats.totalCertifications.toLocaleString()} certifications délivrées · Valeur CPD officielle · Reconnaissance institutionnelle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {certifications.map(cert => (
                <ScrollReveal key={cert.id}>
                  <div className="bg-white border border-background-200 rounded-2xl p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ColorClass(cert.color, 'bg')}`}>
                        <i className={`${cert.icon} text-lg ${ColorClass(cert.color, 'text')}`} />
                      </div>
                      {cert.autoGenerated && (
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 border border-primary-200/50">AUTO</span>
                      )}
                    </div>
                    <span className="text-[8px] font-bold text-foreground-400 tracking-wider uppercase">{cert.code}</span>
                    <h3 className="text-xs font-bold text-foreground-950 mt-0.5 mb-2 leading-tight">{cert.title}</h3>
                    <div className="space-y-2 text-[9px] text-foreground-500 mb-3">
                      <div className="flex justify-between">
                        <span>Délivrées</span><span className="font-bold text-foreground-900">{cert.issuedCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taux de succès</span><span className="font-bold text-emerald-600">{cert.passRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Validité</span><span className="font-bold text-foreground-900">{cert.validityMonths} mois</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-background-200">
                      <p className="text-[8px] font-bold text-foreground-400 uppercase tracking-wider mb-1.5">Reconnaissance</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.recognition.slice(0, 3).map(r => (
                          <span key={r} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB: PIPELINE */}
      {activeTab === 'pipeline' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-3">Pipeline de Production</h2>
              <p className="text-foreground-600">{pipeline.length} modules en production · {pipeline.filter(p => p.autoGenerated).length} auto-générés par KOS</p>
            </div>
            <div className="space-y-4">
              {pipeline.map(item => (
                <ScrollReveal key={item.id}>
                  <div className="bg-white border border-background-200 rounded-2xl p-5 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-film-line text-foreground-500 text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-sm font-bold text-foreground-950">{item.moduleTitle}</h3>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${STAGE_COLORS[item.stage]}`}>
                            {STAGE_LABELS[item.stage]}
                          </span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                            item.priority === 'P0' ? 'bg-red-100 text-red-700' :
                            item.priority === 'P1' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                          }`}>{item.priority}</span>
                          {item.autoGenerated && (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600">AUTO</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400 mb-2">
                          <span><i className="ri-robot-2-line mr-0.5" />{item.agentAssigned}</span>
                          <span><i className="ri-calendar-line mr-0.5" />{item.estimatedDelivery}</span>
                          <span className="text-primary-600 font-medium">{item.kpiTarget}</span>
                        </div>
                        <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${item.stage === 'published' ? 'bg-emerald-500' : 'bg-primary-500'}`} style={{ width: `${item.progress}%` }} />
                        </div>
                        <div className="flex justify-between text-[9px] text-foreground-400 mt-0.5">
                          <span>{item.domain}</span>
                          <span className="font-bold">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB: KPIs */}
      {activeTab === 'kpis' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-3">KPIs Academy — Trajectoire Q4 2026</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {kpis.map(kpi => {
                const maxVal = Math.max(...kpi.history.map(h => h.value), kpi.target);
                return (
                  <ScrollReveal key={kpi.id}>
                    <div className="bg-white border border-background-200 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ColorClass(kpi.color, 'bg')}`}>
                          <i className={`${kpi.icon} ${ColorClass(kpi.color, 'text')} text-base`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">{kpi.name}</h3>
                          <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'}`}>
                            {kpi.current}{kpi.unit}
                            {kpi.trend === 'up' && <i className="ri-arrow-up-line ml-0.5" />}
                          </span>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="text-xs text-foreground-400">Cible</p>
                          <p className="text-sm font-bold text-foreground-900">{kpi.target}{kpi.unit}</p>
                        </div>
                      </div>
                      {/* Mini bar chart */}
                      <div className="flex items-end gap-1 h-16 mb-3">
                        {kpi.history.map((h, i) => {
                          const heightPct = maxVal > 0 ? (h.value / maxVal) * 100 : 0;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div className="w-full relative" style={{ height: '48px' }}>
                                <div
                                  className="absolute bottom-0 w-full rounded-sm"
                                  style={{ height: `${heightPct}%`, backgroundColor: kpi.color === 'primary' ? 'oklch(var(--primary-400))' : kpi.color === 'accent' ? 'oklch(var(--accent-400))' : 'oklch(var(--secondary-400))' }}
                                />
                              </div>
                              <span className="text-[8px] text-foreground-400">{h.month}</span>
                            </div>
                          );
                        })}
                      </div>
                      {/* Progress to target */}
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground-500">Atteinte cible</span>
                        <span className="font-bold">{Math.round((kpi.current / kpi.target) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${kpi.color === 'primary' ? 'bg-primary-500' : kpi.color === 'accent' ? 'bg-accent-500' : 'bg-secondary-500'}`}
                          style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Trajectory Banner */}
            <ScrollReveal>
              <div className="mt-10 bg-gradient-to-r from-foreground-950 to-foreground-900 rounded-2xl p-8 text-center">
                <i className="ri-rocket-2-line text-primary-400 text-3xl mb-3 block" />
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Trajectoire Q4 2026</h3>
                <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                  {globalStats.q4Target}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: '5 000 apprenants', icon: 'ri-user-heart-line' },
                    { label: '20 modules live', icon: 'ri-book-open-line' },
                    { label: '3 000 certifications', icon: 'ri-award-line' },
                    { label: '100% auto-généré', icon: 'ri-robot-2-line' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <i className={`${item.icon} text-primary-400 text-xl mb-1 block`} />
                      <p className="text-xs text-white font-semibold">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── CROSS-LINKS ── */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Écosystème KOS Connecté</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Knowledge Factory', path: '/kos-knowledge-factory', icon: 'ri-bookmark-line', color: '#4F46E5' },
              { label: 'Blog Writing', path: '/kos-blog-writing-automates', icon: 'ri-quill-pen-line', color: '#86BC25' },
              { label: 'Compliance', path: '/kos-regulatory-compliance-engine', icon: 'ri-scales-3-line', color: '#C2410C' },
              { label: 'Knowledge Graph', path: '/kos-knowledge-graph', icon: 'ri-git-branch-line', color: '#9B7B2C' },
              { label: 'Global Agent Scan', path: '/kos-global-agent-performance', icon: 'ri-radar-line', color: '#0891B2' },
              { label: 'Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#5B21B6' },
            ].map(link => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}