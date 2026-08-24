import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useDigitalPerformanceCommand } from '@/hooks/useDigitalPerformanceCommand';

type TabId = 'cockpit' | 'core-web-vitals' | 'owasp' | 'soc2' | 'reporting-interactif' | 'plan-technique' | 'kpis';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'core-web-vitals', label: 'Core Web Vitals', icon: 'ri-speed-line' },
  { id: 'owasp', label: 'OWASP & Sécurité', icon: 'ri-shield-flash-line' },
  { id: 'soc2', label: 'SOC 2', icon: 'ri-award-line' },
  { id: 'reporting-interactif', label: 'Reporting Interactif', icon: 'ri-line-chart-line' },
  { id: 'plan-technique', label: 'Plan Technique', icon: 'ri-road-map-line' },
  { id: 'kpis', label: 'KPIs Trimestriels', icon: 'ri-bar-chart-2-line' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200 font-bold',
    P1: 'bg-amber-100 text-amber-700 border-amber-200 font-bold',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200 font-bold',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${map[priority] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{priority}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'En cours': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Planifié': 'bg-background-200 text-foreground-500 border-background-300',
    'Terminé': 'bg-accent-100 text-accent-700 border-accent-200',
    'Corrigé': 'bg-accent-100 text-accent-700 border-accent-200',
    'Non corrigé': 'bg-red-100 text-red-700 border-red-200',
    'Adopté': 'bg-accent-100 text-accent-700 border-accent-200',
    'Présent': 'bg-accent-100 text-accent-700 border-accent-200',
    'Absent': 'bg-red-100 text-red-700 border-red-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[status] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{status}</span>;
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-600 text-white border-red-700',
    Critical: 'bg-red-600 text-white border-red-700',
    high: 'bg-red-100 text-red-700 border-red-200',
    High: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    Low: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${map[severity] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{severity}</span>;
}

function AlertBadge({ alert }: { alert: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    good: 'bg-accent-100 text-accent-700 border-accent-200',
  };
  const labels: Record<string, string> = {
    critical: 'Critique',
    warning: 'Surveiller',
    good: 'OK',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[alert] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{labels[alert] || alert}</span>;
}

export default function digitalPerformanceCommandPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const data = useDigitalPerformanceCommand();

  return (
    <hubLayout hubId={95}>
      <SeoHead
        title="KOS Digital Performance Command™ — Core Web Vitals, OWASP, SOC 2 | KHEPRA EXPERTS"
        description="Centre de commandement Performance Digitale : Core Web Vitals (LCP 4.8s→2.5s), OWASP Top 10, SOC 2 Type II Readiness, Reporting Interactif drill-down, exports régulateurs BCEAO/COBAC/OHADA. Consortium PwC·Deloitte·EY·KPMG. Score 38/100 → cible 92/100. Budget 217.6 M FCFA."
        canonical="/kos-digital-performance-command"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <ScrollReveal>
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: 'KOS Digital Performance Command', href: '/kos-digital-performance-command' },
            ]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-red-700">SCORE DIGITAL : {data.digitalStats.global_score}/100 → CIBLE {data.digitalStats.target_score}/100</span>
                  </span>
                  <span className="text-xs text-foreground-400">Audit — {data.digitalStats.audit_date}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS Digital Performance Command
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Commandement unifié de la performance digitale de KOS Platform. Trois piliers — <strong className="text-foreground-800">Core Web Vitals (LCP 4.8s→2.5s), OWASP Top 10 (16 vulnérabilités à corriger), SOC 2 Type II Readiness (42/100→92/100)</strong>. Reporting Interactif avec dashboards drill-down, exports régulateurs automatisés BCEAO/COBAC/OHADA, visualisations temps réel. Plan technique de 24 actions sur 12 mois. Budget 217.6 M FCFA.
                </p>
                <p className="mt-3 text-sm text-foreground-500">
                  Mandat exécuté par le consortium PwC · Deloitte · EY · KPMG — Practice Digital Performance & Cyber Risk
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'LCP p75', value: `${data.digitalStats.cwv_lcp_current}`, unit: '→ 2.5s', icon: 'ri-timer-line', color: 'text-red-600' },
                  { label: 'OWASP Score', value: `${data.digitalStats.owasp_score}`, unit: '/100', icon: 'ri-shield-flash-line', color: 'text-amber-600' },
                  { label: 'SOC 2 Ready', value: `${data.digitalStats.soc2_score}`, unit: '/100', icon: 'ri-award-line', color: 'text-secondary-600' },
                  { label: 'Lighthouse', value: `${data.digitalStats.lighthouse_perf}`, unit: '/100', icon: 'ri-flashlight-line', color: 'text-red-600' },
                ].map((s) => (
                  <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-3 text-center min-w-[100px]">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                      <i className={`${s.icon} ${s.color} text-sm`}></i>
                    </div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-foreground-400 leading-tight">{s.label}</p>
                    <p className="text-[9px] text-foreground-300">{s.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'cockpit' && <CockpitTab data={data} />}
        {activeTab === 'core-web-vitals' && <CoreWebVitalsTab data={data} />}
        {activeTab === 'owasp' && <OWASPTab data={data} />}
        {activeTab === 'soc2' && <SOC2Tab data={data} />}
        {activeTab === 'reporting-interactif' && <ReportingInteractifTab data={data} />}
        {activeTab === 'plan-technique' && <PlanTechniqueTab data={data} />}
        {activeTab === 'kpis' && <KPIsTab data={data} />}
      </div>
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score Global Performance Digitale</h2>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--background-200)" strokeWidth="12" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--red-500)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(data.digitalStats.global_score / 100) * 427} 427`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-foreground-950">{data.digitalStats.global_score}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.digitalStats.target_score}/100</strong></p>
            <p className="text-sm text-foreground-500">Timeline : <strong className="text-foreground-700">{data.digitalStats.timeline}</strong></p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Radar Performance — 4 Piliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Core Web Vitals (Lighthouse)', score: data.digitalStats.cwv_overall_score, target: data.digitalStats.cwv_target },
                { name: 'OWASP Top 10 (Sécurité)', score: data.digitalStats.owasp_score, target: data.digitalStats.owasp_target },
                { name: 'SOC 2 Type II Readiness', score: data.digitalStats.soc2_score, target: data.digitalStats.soc2_target },
                { name: 'Lighthouse Performance Score', score: data.digitalStats.lighthouse_perf, target: data.digitalStats.lighthouse_target },
              ].map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground-800">{p.name}</span>
                    <span className="text-sm font-bold text-red-600">{p.score} / {p.target}</span>
                  </div>
                  <div className="w-full h-3 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full transition-all duration-700" style={{ width: `${Math.min((p.score / p.target) * 100, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {[
            { label: 'LCP p75', value: data.digitalStats.cwv_lcp_current, icon: 'ri-timer-line', color: 'text-red-600' },
            { label: 'TTFB p75', value: data.digitalStats.cwv_ttfb_current, icon: 'ri-speed-line', color: 'text-amber-600' },
            { label: 'OWASP Vulns', value: `${data.digitalStats.owasp_critical_open} crit.`, icon: 'ri-shield-flash-line', color: 'text-red-600' },
            { label: 'SOC 2 Contrôles', value: `${data.digitalStats.soc2_controls_placed}/125`, icon: 'ri-award-line', color: 'text-secondary-600' },
            { label: 'Templates Régul.', value: `${data.digitalStats.reporting_templates}`, icon: 'ri-file-copy-2-line', color: 'text-accent-600' },
            { label: 'Budget Total', value: '217.6 M', icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
            { label: 'ROI Projeté', value: '> 22×', icon: 'ri-funds-line', color: 'text-accent-600' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                <i className={`${s.icon} ${s.color} text-sm`}></i>
              </div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Executive Summary */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-4">Synthèse Exécutive — Consortium Big Four</h2>
          <div className="text-sm text-foreground-600 leading-relaxed space-y-3">
            <p><strong className="text-foreground-800">Mandat :</strong> Propulser KOS Platform au niveau de performance digitale des grandes FinTech africaines. Core Web Vitals au seuil Google "Good", sécurité OWASP irréprochable, certification SOC 2 Type II.</p>
            <p><strong className="text-foreground-800">Auditeurs :</strong> {data.digitalStats.consortium}</p>
            <p><strong className="text-foreground-800">Constat :</strong> Score global de <strong className="text-red-600">38/100</strong>. LCP à 4.8s (2× seuil Google), 16 vulnérabilités OWASP non résolues dont 3 critiques, score SOC 2 readiness à 42/100. Le mobile 3G affiche un LCP de 10.2s — inacceptable pour les marchés africains.</p>
            <p><strong className="text-foreground-800">Piliers d'action :</strong> Optimisation CWV (images, CDN, Critical CSS), correction vulnérabilités OWASP, déploiement contrôles SOC 2, Reporting Interactif avec dashboards drill-down et exports régulateurs automatisés.</p>
            <p>ROI projeté : {data.digitalStats.roi_projete}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Trajectory */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-6">Trajectoire Score Digital — 4 Trimestres</h2>
          <div className="flex items-end gap-3 h-48">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-red-600">{data.digitalStats.global_score}</span>
              <div className="w-full rounded-t-md bg-red-500 h-[64px]"></div>
              <span className="text-[9px] text-foreground-400 whitespace-nowrap">Juin 2026</span>
            </div>
            {data.digitalQuarterlyMilestones.quarters.map((q, idx) => (
              <div key={q.id} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-foreground-800">{q.target_score}</span>
                <div className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${(q.target_score / 100) * 160}px`,
                    backgroundColor: idx === 0 ? 'oklch(0.65 0.15 150)' : idx === 1 ? 'oklch(0.6 0.12 75)' : idx === 2 ? 'oklch(0.55 0.14 280)' : 'oklch(0.65 0.16 200)',
                  }}>
                </div>
                <span className="text-[9px] text-foreground-400 whitespace-nowrap">{q.id.toUpperCase()}</span>
              </div>
            ))}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-accent-600">{data.digitalStats.target_score}</span>
              <div className="w-full rounded-t-md bg-accent-500 h-[152px]"></div>
              <span className="text-[9px] text-foreground-400 whitespace-nowrap">Juin 2027</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : CORE WEB VITALS
// ================================================================
function CoreWebVitalsTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const cwv = data.coreWebVitals;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Core Web Vitals — Audit Complet</h2>
          <div className="flex items-center gap-4 text-sm text-foreground-500 flex-wrap mt-1">
            <span>Méthodologie : <strong className="text-foreground-700">{cwv.methodology}</strong></span>
            <span>Auditeur : <strong className="text-accent-700">{cwv.assessor.split(' — ')[0]}</strong></span>
            <span>Pages auditées : <strong className="text-foreground-700">{cwv.pages_audited}</strong></span>
          </div>
        </div>
      </ScrollReveal>

      {/* Global Scores */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Performance', score: cwv.lighthouse_scores.performance, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'Accessibilité', score: cwv.lighthouse_scores.accessibility, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Best Practices', score: cwv.lighthouse_scores.best_practices, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'SEO', score: cwv.lighthouse_scores.seo, color: 'text-accent-600', bg: 'bg-accent-50 border-accent-200' },
            { label: 'PWA', score: cwv.lighthouse_scores.pwa, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
              <p className={`text-3xl font-bold ${s.color}`}>{s.score}</p>
              <p className="text-[10px] text-foreground-500">{s.label}</p>
              <p className="text-[9px] text-foreground-400">/100</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Bundle Info */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 flex flex-wrap gap-6 text-sm">
          <span><strong className="text-foreground-800">JS Bundle :</strong> <span className="text-red-600 font-bold">{cwv.js_bundle_size}</span></span>
          <span><strong className="text-foreground-800">CSS Bundle :</strong> <span className="text-amber-600 font-bold">{cwv.css_bundle_size}</span></span>
          <span><strong className="text-foreground-800">Images non optimisées :</strong> <span className="text-red-600 font-bold">{cwv.images_not_optimized}/{cwv.total_images}</span></span>
          <span><strong className="text-foreground-800">Pages critiques LCP :</strong> <span className="text-red-600 font-bold">{cwv.pages_critical_lcp}</span></span>
        </div>
      </ScrollReveal>

      {/* Metrics detail */}
      <div className="space-y-6">
        {cwv.metrics.map((metric) => (
          <ScrollReveal key={metric.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${
                    metric.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    metric.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                    'bg-secondary-100 text-secondary-700'
                  }`}>{metric.current_value}</div>
                  <div>
                    <h3 className="text-base font-bold text-foreground-950">{metric.name}</h3>
                    <p className="text-xs text-foreground-500">Cible : {metric.target_value} · Poids {metric.weight}% · Score actuel {metric.score}/100</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={metric.severity} />
                  <StatusBadge status={metric.status} />
                  <span className="text-[10px] text-foreground-400">{metric.deadline}</span>
                </div>
              </div>

              <p className="text-sm text-foreground-600 mb-4">{metric.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-700 mb-2">Breakdown des Sources d'Impact</h4>
                  <div className="space-y-2">
                    {metric.breakdown.map((src: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-background-100 rounded-lg text-xs">
                        <span className="text-foreground-700 max-w-[55%] truncate">{src.source}</span>
                        <span className="font-bold text-red-600">{metric.id === 'cls' ? src.impact_cls : src.impact_ms ? `${src.impact_ms}ms` : `${src.impact_s}s`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Actions Correctives</h4>
                  <ul className="space-y-1.5">
                    {metric.actions.map((act: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>{act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Device Breakdown */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Performance par Device</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left py-2 text-foreground-500 font-semibold">Device</th>
                  <th className="text-center py-2 text-foreground-500 font-semibold">LCP</th>
                  <th className="text-center py-2 text-foreground-500 font-semibold">CLS</th>
                  <th className="text-center py-2 text-foreground-500 font-semibold">INP</th>
                  <th className="text-center py-2 text-foreground-500 font-semibold">Speed Index</th>
                </tr>
              </thead>
              <tbody>
                {cwv.device_breakdown.map((d) => (
                  <tr key={d.device} className="border-b border-background-100">
                    <td className="py-2 font-medium text-foreground-800">{d.device}</td>
                    <td className={`text-center py-2 font-bold ${parseFloat(d.lcp) > 4 ? 'text-red-600' : parseFloat(d.lcp) > 2.5 ? 'text-amber-600' : 'text-accent-600'}`}>{d.lcp}</td>
                    <td className={`text-center py-2 font-bold ${parseFloat(d.cls) > 0.25 ? 'text-red-600' : parseFloat(d.cls) > 0.1 ? 'text-amber-600' : 'text-accent-600'}`}>{d.cls}</td>
                    <td className={`text-center py-2 font-bold ${parseInt(d.inp) > 300 ? 'text-red-600' : parseInt(d.inp) > 200 ? 'text-amber-600' : 'text-accent-600'}`}>{d.inp}</td>
                    <td className={`text-center py-2 font-bold ${parseFloat(d.si) > 5 ? 'text-red-600' : parseFloat(d.si) > 3.4 ? 'text-amber-600' : 'text-accent-600'}`}>{d.si}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Lab vs Field */}
      <ScrollReveal>
        <div className="bg-background-100 border border-background-200 rounded-xl p-5 text-sm text-foreground-600">
          <strong className="text-foreground-800">Lab vs Field (CrUX) :</strong> Lab LCP {cwv.lab_vs_field.lab_lcp} vs Field LCP <span className="text-red-600 font-bold">{cwv.lab_vs_field.field_lcp}</span> ({cwv.lab_vs_field.field_data_available}). L'écart Lab/Field de +0.8s indique des problèmes réseau et device non capturés en environnement contrôlé.
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 3 : OWASP & SÉCURITÉ
// ================================================================
function OWASPTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const ow = data.owaspSecurity;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">OWASP Top 10:2021 — Audit de Sécurité</h2>
          <p className="text-sm text-foreground-500">
            {ow.methodology} · {ow.scan_summary.total_alerts} alerts · {ow.scan_summary.critical} critiques · {ow.scan_summary.high} hautes · {ow.scan_summary.unresolved} non résolues
          </p>
        </div>
      </ScrollReveal>

      {/* Scan Summary */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: 'Pages Scannées', value: ow.scan_summary.total_pages_scanned, color: 'text-foreground-950' },
            { label: 'Critiques', value: ow.scan_summary.critical, color: 'text-red-600' },
            { label: 'Hautes', value: ow.scan_summary.high, color: 'text-red-600' },
            { label: 'Moyennes', value: ow.scan_summary.medium, color: 'text-amber-600' },
            { label: 'Résolues', value: ow.scan_summary.resolved, color: 'text-accent-600' },
            { label: 'Non Résolues', value: ow.scan_summary.unresolved, color: 'text-red-600' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Security Headers */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Headers de Sécurité — {data.owaspHeadersSummary.present}/{data.owaspHeadersSummary.total} présents</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(ow.security_headers).map(([key, h]: [string, any]) => (
              <div key={key} className={`p-3 rounded-lg ${h.status === 'Présent' ? 'bg-accent-50/50 border border-accent-100' : 'bg-red-50/50 border border-red-100'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground-800 uppercase">{key}</span>
                  <StatusBadge status={h.status} />
                </div>
                <p className="text-[10px] text-foreground-500">{h.status === 'Présent' ? (h.value || `Score ${h.score}`) : h.recommendation?.substring(0, 60) + '...'}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Vulnerabilities detail */}
      <div className="space-y-6">
        {ow.vulnerabilities.map((vuln) => (
          <ScrollReveal key={vuln.id}>
            <div className={`bg-background-50 border rounded-xl p-6 ${
              vuln.severity === 'critical' ? 'border-red-200' : vuln.severity === 'high' ? 'border-amber-200' : 'border-background-200'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <div className="flex items-center gap-3 flex-1 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${vuln.severity === 'critical' ? 'bg-red-600 text-white' : vuln.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-secondary-100 text-secondary-700'}`}>{vuln.owasp_rank}</span>
                  <h3 className="text-base font-bold text-foreground-950">{vuln.name}</h3>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm font-bold text-red-600">{vuln.score}/100</span>
                  <span className="text-xs text-foreground-400">→</span>
                  <span className="text-sm font-bold text-accent-600">{vuln.target}/100</span>
                  <StatusBadge status={vuln.status} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-red-600 mb-2">Findings ({vuln.findings.length})</h4>
                  <div className="space-y-1.5">
                    {vuln.findings.map((f) => (
                      <div key={f.id} className="flex items-center justify-between p-2 bg-background-100 rounded-lg text-xs">
                        <div className="flex items-center gap-2 max-w-[60%]">
                          <span className="text-[9px] font-mono text-foreground-400">{f.id}</span>
                          <span className="text-foreground-700 truncate">{f.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[9px] font-mono text-foreground-400">{f.cwe}</span>
                          <span className="font-bold text-red-600">CVSS {f.cvss}</span>
                          <StatusBadge status={f.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Actions Correctives</h4>
                  <ul className="space-y-1.5">
                    {vuln.actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>{act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-foreground-400 pt-3 border-t border-background-200">
                <span>Owner : <strong className="text-foreground-600">{vuln.owner}</strong></span>
                <span>Deadline : <strong className="text-foreground-600">{vuln.deadline}</strong></span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 4 : SOC 2
// ================================================================
function SOC2Tab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const soc = data.soc2Readiness;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">SOC 2 Type II — Readiness Assessment</h2>
          <p className="text-sm text-foreground-500">
            {soc.methodology} · Auditeur : {soc.auditor_firm} · Cible : {soc.target_certification} · Timeline : {soc.timeline}
          </p>
        </div>
      </ScrollReveal>

      {/* Score Gauge */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-44 h-44 flex-shrink-0">
              <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 176 176">
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--background-200)" strokeWidth="16" />
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--secondary-500)" strokeWidth="16" strokeLinecap="round"
                  strokeDasharray={`${(soc.overall_score / 100) * 477} 477`} />
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--accent-400)" strokeWidth="16" strokeLinecap="round"
                  strokeDasharray={`${(soc.target_score / 100) * 477} 477`} strokeDashoffset={`${(soc.overall_score / 100) * 477}`}
                  opacity="0.5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-bold text-foreground-950">{soc.overall_score}</span>
                <span className="text-xs text-foreground-400">/100 → {soc.target_score}</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
              {soc.trust_criteria.map((tsc) => (
                <div key={tsc.id} className="text-center p-3 bg-background-100 rounded-lg">
                  <p className="text-xs text-foreground-500 mb-1">{tsc.name}</p>
                  <p className="text-lg font-bold text-red-600">{tsc.current_score}</p>
                  <p className="text-[10px] text-accent-600">→ {tsc.target}</p>
                  <p className="text-[9px] text-foreground-400">Poids {tsc.weight}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Trust Criteria Detail */}
      <div className="space-y-6">
        {soc.trust_criteria.map((tsc) => (
          <ScrollReveal key={tsc.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-foreground-950">{tsc.name} (Poids {tsc.weight}%)</h3>
                  <span className="text-sm font-bold text-red-600">{tsc.current_score}/100</span>
                  <span className="text-xs text-foreground-400">→</span>
                  <span className="text-sm font-bold text-accent-600">{tsc.target}/100</span>
                </div>
                <StatusBadge status={tsc.status} />
              </div>
              <p className="text-xs text-foreground-600 mb-4">{tsc.description}</p>

              <div className="space-y-2 mb-4">
                {tsc.control_areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-background-100 rounded-lg text-xs">
                    <span className="font-bold text-foreground-700 w-24 flex-shrink-0">{area.area}</span>
                    <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${area.score < 35 ? 'bg-red-500' : area.score < 55 ? 'bg-amber-500' : 'bg-accent-500'}`} style={{ width: `${area.score}%` }}></div>
                    </div>
                    <span className="font-bold text-foreground-950 w-8 text-right">{area.score}</span>
                    <span className="text-foreground-400 truncate max-w-[40%]">{area.gaps.join(' · ')}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Actions Clés</h4>
                  <ul className="space-y-1">
                    {tsc.key_actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>{act}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground-700 mb-2">Preuves Requises</h4>
                  <ul className="space-y-1">
                    {tsc.evidence_required.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-file-text-line text-foreground-400 mt-0.5 flex-shrink-0"></i>{ev}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-foreground-400 pt-3 mt-4 border-t border-background-200">
                <span>Owner : <strong className="text-foreground-600">{tsc.owner}</strong></span>
                <span>Deadline : <strong className="text-foreground-600">{tsc.deadline}</strong></span>
                <span>Budget : <strong className="text-foreground-600">{tsc.budget}</strong></span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Certification Path */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Parcours Certification SOC 2 Type II</h3>
          <div className="space-y-3">
            {soc.certification_path.map((phase, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-background-100 rounded-lg">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500 text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground-950">{phase.phase}</p>
                  <p className="text-xs text-foreground-500">{phase.output}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-foreground-800">{phase.period}</p>
                  <p className="text-[10px] text-accent-600">{phase.score}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-background-200 text-right">
            <span className="text-[10px] px-3 py-1 rounded-full bg-background-200 text-foreground-600 font-semibold">Budget Total : {soc.total_budget}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 5 : REPORTING INTERACTIF (8ème Onglet)
// ================================================================
function ReportingInteractifTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const ri = data.reportingInteractif;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">{ri.title}</h2>
          <p className="text-sm text-foreground-500">{ri.description} · Mis à jour le {ri.last_updated} · Owner {ri.owner}</p>
        </div>
      </ScrollReveal>

      {/* Dashboards drill-down */}
      <div className="space-y-6">
        {ri.dashboards.map((dashboard) => (
          <ScrollReveal key={dashboard.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white">
                  <i className={`${dashboard.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-950">{dashboard.name}</h3>
                  <p className="text-xs text-foreground-500">{dashboard.description}</p>
                </div>
              </div>

              {/* KPIs for this dashboard */}
              {dashboard.kpis && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {dashboard.kpis.map((kpi) => (
                    <div key={kpi.name} className="p-3 bg-background-100 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-foreground-400">{kpi.name}</span>
                        <AlertBadge alert={kpi.alert} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-foreground-950">{kpi.value}</span>
                        <span className="text-[10px] text-foreground-400">→ {kpi.target}</span>
                      </div>
                      <span className={`text-[10px] font-semibold ${kpi.trend === 'up' ? 'text-accent-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-foreground-400'}`}>
                        {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dashboard.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground-600 p-2 bg-background-100 rounded-lg">
                    <i className="ri-check-line text-accent-500 flex-shrink-0"></i>
                    {feat}
                  </div>
                ))}
              </div>

              {/* Templates table for regulatory dashboard */}
              {dashboard.templates && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 text-foreground-500 font-semibold">Template</th>
                        <th className="text-center py-2 text-foreground-500 font-semibold">Format</th>
                        <th className="text-center py-2 text-foreground-500 font-semibold">Fréquence</th>
                        <th className="text-center py-2 text-foreground-500 font-semibold">Prochaine Échéance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.templates.map((tpl: any) => (
                        <tr key={tpl.id} className="border-b border-background-100">
                          <td className="py-2 text-foreground-700">{tpl.name}</td>
                          <td className="text-center py-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-semibold">{tpl.format}</span>
                          </td>
                          <td className="text-center py-2 text-foreground-600">{tpl.frequency}</td>
                          <td className="text-center py-2 font-bold text-foreground-800">{tpl.next_due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Real-Time Visualizations */}
      <ScrollReveal>
        <div className="bg-background-50 border border-accent-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-5 flex items-center gap-2">
            <i className="ri-pulse-line text-accent-600"></i>Visualisations Temps Réel ({ri.realtime_visualizations.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ri.realtime_visualizations.map((rt) => (
              <div key={rt.id} className="p-4 bg-background-100 rounded-lg border border-background-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
                    <i className={`${rt.icon} text-accent-600`}></i>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950">{rt.name}</h4>
                </div>
                <p className="text-xs text-foreground-600 mb-3">{rt.description}</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-foreground-400">
                    <strong className="text-foreground-600">Refresh :</strong> {rt.refresh_rate}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {rt.metrics.map((m) => (
                      <span key={m} className="text-[9px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 6 : PLAN TECHNIQUE
// ================================================================
function PlanTechniqueTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const [pillarFilter, setPillarFilter] = useState<string>('tous');
  const pillars = ['tous', ...data.planPillars];

  const filtered = pillarFilter === 'tous'
    ? data.digitalPlanActions
    : data.digitalPlanActions.filter(a => a.pillar === pillarFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan Technique — {data.digitalPlanActions.length} Actions Priorisées</h2>
            <p className="text-sm text-foreground-500">
              {data.digitalStats.p0_actions} P0 · {data.digitalStats.p1_actions} P1 · {data.digitalStats.p2_actions} P2 · En cours {data.digitalStats.actions_in_progress} · Planifiées {data.digitalStats.actions_planned} · Budget {data.digitalStats.budget_total}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {pillars.map((p) => (
              <button key={p} onClick={() => setPillarFilter(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  pillarFilter === p ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {p === 'tous' ? 'Tous' : p}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{data.digitalStats.p0_actions}</p>
          <p className="text-[10px] text-red-500 font-semibold">Priorité P0</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{data.digitalStats.p1_actions}</p>
          <p className="text-[10px] text-amber-500 font-semibold">Priorité P1</p>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.digitalStats.p2_actions}</p>
          <p className="text-[10px] text-secondary-500 font-semibold">Priorité P2</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.digitalStats.actions_in_progress}</p>
          <p className="text-[10px] text-foreground-400">En Cours</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground-950">{(217600000 / 1000000).toFixed(1)} M</p>
          <p className="text-[10px] text-foreground-400">Budget Total FCFA</p>
        </div>
      </div>

      {/* Actions list */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <ScrollReveal key={action.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
              action.status === 'Terminé' ? 'border-accent-200 bg-accent-50/10' :
              action.status === 'En cours' ? 'border-secondary-200 bg-secondary-50/10' :
              'border-background-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <PriorityBadge priority={action.priority} />
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{action.pillar}</span>
                    <StatusBadge status={action.status} />
                    {action.progress > 0 && action.progress < 100 && (
                      <div className="w-24 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-500 rounded-full" style={{ width: `${action.progress}%` }}></div>
                      </div>
                    )}
                    <span className="text-[10px] text-foreground-400 ml-auto">{action.id.toUpperCase()}</span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{action.action}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Responsable</span>
                      <span className="font-medium text-foreground-800">{action.responsible}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Deadline</span>
                      <span className="font-medium text-foreground-800">{action.deadline}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Budget</span>
                      <span className="font-medium text-foreground-800">{action.budget}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">KPI de Succès</span>
                      <span className="font-medium text-foreground-800 text-[11px]">{action.kpi}</span>
                    </div>
                  </div>

                  {action.dependencies.length > 0 && (
                    <p className="text-[10px] text-foreground-400">
                      Dépendances : {action.dependencies.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 7 : KPIs TRIMESTRIELS
// ================================================================
function KPIsTab({ data }: { data: ReturnType<typeof useDigitalPerformanceCommand> }) {
  const m = data.digitalQuarterlyMilestones;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">KPIs Trimestriels — Q3 2026 → Q2 2027</h2>
          <p className="text-sm text-foreground-500">
            {m.quarters.length} trimestres · Score {data.digitalStats.global_score} → {m.quarters[0].target_score} → {m.quarters[1].target_score} → {m.quarters[2].target_score} → {data.digitalStats.target_score} · Budget total {data.digitalStats.budget_total}
          </p>
        </div>
      </ScrollReveal>

      {/* Summary trajectory */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Trajectoire Consolidée — 7 KPIs Majeurs</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2 text-foreground-500 font-semibold">KPI</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Initial</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q3 2026</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q4 2026</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q1 2027</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q2 2027</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Cible</th>
              </tr>
            </thead>
            <tbody>
              {m.summary_trajectory.map((row) => (
                <tr key={row.kpi} className="border-b border-background-100">
                  <td className="py-2 text-foreground-700 font-medium">{row.kpi}</td>
                  <td className="text-center py-2 font-bold text-foreground-950">{row.initial}</td>
                  {['q3', 'q4', 'q1', 'q2'].map((q) => (
                    <td key={q} className="text-center py-2 font-bold" style={{ color: `oklch(0.6 0.15 ${((row as any)[q] / (row as any).cible) * 150})` }}>
                      {(row as any)[q]}
                    </td>
                  ))}
                  <td className="text-center py-2 font-bold text-accent-600">{row.cible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Quarterly details */}
      <div className="space-y-6">
        {m.quarters.map((q, idx) => (
          <ScrollReveal key={q.id}>
            <div className={`bg-background-50 border rounded-xl p-6 ${
              idx === 0 ? 'border-red-200' : idx === 1 ? 'border-amber-200' : idx === 2 ? 'border-secondary-200' : 'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                  idx === 0 ? 'bg-red-100 text-red-700' : idx === 1 ? 'bg-amber-100 text-amber-700' : idx === 2 ? 'bg-secondary-100 text-secondary-700' : 'bg-accent-100 text-accent-700'
                }`}>{q.id.toUpperCase()}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground-950">{q.label}</h3>
                  <p className="text-sm text-foreground-500">{q.months}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-foreground-950">{q.target_score}</p>
                  <p className="text-[10px] text-foreground-400">Score Cible / 100</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-flag-line text-foreground-600"></i> Jalons Clés
                  </h4>
                  <ul className="space-y-2">
                    {q.milestones.map((ms, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background-200 text-[10px] font-bold text-foreground-500 flex-shrink-0">{i + 1}</span>
                        {ms}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-bar-chart-2-line text-foreground-600"></i> KPIs Cibles
                  </h4>
                  <div className="space-y-2">
                    {q.kpis.map((kpi, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-background-100 rounded-lg text-xs">
                        <span className="text-foreground-700">{kpi.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-foreground-950">{kpi.target}</span>
                          <span className="text-[10px] text-foreground-400">({kpi.weight}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-background-200 text-right">
                <span className="text-[10px] px-3 py-1 rounded-full bg-background-200 text-foreground-600 font-semibold">Budget : {q.budget}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Critical Path */}
      <ScrollReveal>
        <div className="bg-red-50/20 border border-red-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-red-800 mb-4 flex items-center gap-2">
            <i className="ri-timer-line"></i>Chemin Critique — 3 Jalons Bloquants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {m.critical_path.map((cp, i) => (
              <div key={cp.id} className="p-3 bg-background-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">{i + 1}</span>
                  <span className="text-xs font-bold text-red-700">{cp.deadline}</span>
                </div>
                <p className="text-xs text-foreground-700 mb-2">{cp.milestone}</p>
                <p className="text-[10px] text-foreground-400">
                  Bloque : {cp.blocks.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}



