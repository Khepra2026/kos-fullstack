import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useESGSustainabilityCommand } from '@/hooks/useESGSustainabilityCommand';
import type { carbonFootprintAssessment as CarbonType, ecovadisAssessment as EcoVadisType, sustainabilityReport2026 as ReportType, esgExecutiveDashboard as DashboardType, esgPlanActions as PlanActionsType, esgQuarterlyMilestones as MilestonesType } from '@/mocks/eSGSustainabilityCommand';

type TabId = 'cockpit' | 'bilan-carbone' | 'ecovadis' | 'rapport-durabilite' | 'dashboard-esg' | 'plan-esg' | 'kpis';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'bilan-carbone', label: 'Bilan Carbone', icon: 'ri-cloud-line' },
  { id: 'ecovadis', label: 'EcoVadis', icon: 'ri-medal-line' },
  { id: 'rapport-durabilite', label: 'Rapport Durabilité 2026', icon: 'ri-file-text-line' },
  { id: 'dashboard-esg', label: 'Dashboard ESG', icon: 'ri-bar-chart-2-line' },
  { id: 'plan-esg', label: 'Plan ESG', icon: 'ri-road-map-line' },
  { id: 'kpis', label: 'KPIs Trimestriels', icon: 'ri-line-chart-line' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200 font-bold',
    P1: 'bg-amber-100 text-amber-700 border-amber-200 font-bold',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200 font-bold',
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${map[priority] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{priority}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'En cours': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Planifié': 'bg-background-200 text-foreground-500 border-background-300',
    'Terminé': 'bg-accent-100 text-accent-700 border-accent-200',
    'Adopté': 'bg-accent-100 text-accent-700 border-accent-200',
    'Rédigé': 'bg-accent-100 text-accent-700 border-accent-200',
    'Brouillon': 'bg-amber-100 text-amber-700 border-amber-200',
    'En cours —': 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  const matchedKey = Object.keys(map).find(k => status.startsWith(k)) || '';
  const info = map[matchedKey] || { label: status, cls: 'bg-background-100 text-foreground-500 border-background-200' };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${info}`}>
      {status}
    </span>
  );
}

function AlertBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[severity]}`}>{severity === 'high' ? 'Urgent' : severity === 'medium' ? 'Surveiller' : 'Info'}</span>;
}

function KPIAlertBadge({ alert }: { alert: string }) {
  const map: Record<string, string> = {
    'On track': 'bg-accent-100 text-accent-700 border-accent-200',
    'Behind': 'bg-red-100 text-red-700 border-red-200',
    'Watch': 'bg-amber-100 text-amber-700 border-amber-200',
    'Good': 'bg-accent-100 text-accent-700 border-accent-200',
  };
  const labels: Record<string, string> = {
    'On track': 'Dans les clous',
    'Behind': 'En retard',
    'Watch': 'À surveiller',
    'Good': 'OK',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[alert] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{labels[alert] || alert}</span>;
}

export default function eSGSustainabilityCommandPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const data = useESGSustainabilityCommand();

  return (
    <hubLayout hubId={94}>
      <SeoHead
        title="KOS ESG & Sustainability Command™ — Bilan Carbone, EcoVadis, GRI/ISSB | KHEPRA EXPERTS"
        description="Centre de commandement ESG : Bilan Carbone Scope 1-2-3 vérifié, Notation EcoVadis cible Gold, Rapport Durabilité 2026 GRI/ISSB, Dashboard ESG Exécutif, Plan ESG 20 actions. Consortium PwC·Deloitte·EY·KPMG. Score 38/100 → cible 92/100. Budget 207.6 M FCFA."
        canonical="/kos-esg-sustainability-command"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <ScrollReveal>
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: 'KOS ESG & Sustainability Command', href: '/kos-esg-sustainability-command' },
            ]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-red-700">SCORE ESG GLOBAL : {data.esgStats.global_score}/100 → CIBLE {data.esgStats.target_score}/100</span>
                  </span>
                  <span className="text-xs text-foreground-400">Audit — {data.esgStats.audit_date}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS ESG & Sustainability Command
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Commandement unifié de la stratégie ESG de KHEPRA EXPERTS. Quatre piliers — <strong className="text-foreground-800">Bilan Carbone vérifié (428.5 tCO₂e), Notation EcoVadis cible Gold, Rapport de Durabilité 2026 GRI/ISSB, Dashboard ESG Exécutif</strong>. Plan ESG de 20 actions sur 12 mois. Budget 207.6 M FCFA.
                </p>
                <p className="mt-3 text-sm text-foreground-500">
                  Mandat exécuté par le consortium PwC · Deloitte · EY · KPMG — Practice ESG & Sustainability
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Bilan Carbone', value: `${data.esgStats.carbon_footprint_tco2e}`, unit: 'tCO₂e', icon: 'ri-cloud-line', color: 'text-green-600' },
                  { label: 'EcoVadis', value: `${data.esgStats.ecovadis_estimated}`, unit: '/100', icon: 'ri-medal-line', color: 'text-amber-600' },
                  { label: 'Rapport GRI/ISSB', value: `${data.reportChaptersCompleted}/${data.esgStats.report_chapters}`, unit: 'chap.', icon: 'ri-file-text-line', color: 'text-secondary-600' },
                  { label: 'KPIs Dashboard', value: `${data.esgStats.dashboard_kpis}`, unit: 'KPIs', icon: 'ri-bar-chart-2-line', color: 'text-accent-600' },
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
        {activeTab === 'bilan-carbone' && <BilanCarboneTab data={data} />}
        {activeTab === 'ecovadis' && <EcoVadisTab data={data} />}
        {activeTab === 'rapport-durabilite' && <RapportDurabiliteTab data={data} />}
        {activeTab === 'dashboard-esg' && <DashboardESGTab data={data} />}
        {activeTab === 'plan-esg' && <PlanESGTab data={data} />}
        {activeTab === 'kpis' && <KPIsTab data={data} />}
      </div>
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  return (
    <div className="space-y-10">
      {/* Score global */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score Global ESG & Durabilité</h2>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--background-200)" strokeWidth="12" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--red-500)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(data.esgStats.global_score / 100) * 427} 427`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-foreground-950">{data.esgStats.global_score}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.esgStats.target_score}/100</strong></p>
            <p className="text-sm text-foreground-500">Timeline : <strong className="text-foreground-700">{data.esgStats.timeline}</strong></p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Radar ESG — 4 Piliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Bilan Carbone (Scope 1-2-3)', score: 55, target: 95 },
                { name: 'EcoVadis — Notation ESG', score: data.esgStats.ecovadis_estimated, target: data.esgStats.ecovadis_target },
                { name: 'Rapport Durabilité GRI/ISSB', score: 35, target: 95 },
                { name: 'Dashboard & KPIs ESG', score: 40, target: 90 },
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
            { label: 'Bilan Carbone', value: `${data.esgStats.carbon_footprint_tco2e} tCO₂e`, icon: 'ri-cloud-line', color: 'text-green-600' },
            { label: 'Cible 2027', value: `${data.esgStats.carbon_target_2027} tCO₂e`, icon: 'ri-arrow-down-line', color: 'text-accent-600' },
            { label: 'Score EcoVadis', value: `${data.esgStats.ecovadis_estimated}/100`, icon: 'ri-medal-line', color: 'text-amber-600' },
            { label: 'Chapitres Rapport', value: `${data.reportChaptersCompleted + data.reportChaptersInProgress}/8`, icon: 'ri-file-text-line', color: 'text-secondary-600' },
            { label: 'KPIs Dashboard', value: '16', icon: 'ri-bar-chart-2-line', color: 'text-accent-600' },
            { label: 'Budget Total', value: '207.6 M', icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
            { label: 'ROI Projeté', value: '> 35×', icon: 'ri-funds-line', color: 'text-accent-600' },
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
            <p><strong className="text-foreground-800">Mandat :</strong> Positionner KHEPRA EXPERTS comme leader ESG en Afrique francophone. Bilan carbone vérifié, notation EcoVadis, rapport GRI/ISSB, dashboard exécutif.</p>
            <p><strong className="text-foreground-800">Auditeurs :</strong> {data.esgStats.consortium}</p>
            <p><strong className="text-foreground-800">Constat :</strong> Score ESG global de <strong className="text-red-600">38/100</strong> — en deçà des standards Big Four. Le bilan carbone révèle 428.5 tCO₂e avec un Scope 3 dominant (70%). La notation EcoVadis est estimée à 42/100. Le rapport GRI/ISSB est à 35% de complétude.</p>
            <p><strong className="text-foreground-800">Piliers d'action :</strong> Finalisation bilan carbone vérifié, soumission EcoVadis cible Gold (75+), publication Rapport Durabilité 2026, dashboard ESG exécutif opérationnel.</p>
            <p>ROI projeté : {data.esgStats.roi_projete}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Trajectory */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-6">Trajectoire Score ESG — 4 Trimestres</h2>
          <div className="flex items-end gap-3 h-48">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-red-600">38</span>
              <div className="w-full rounded-t-md bg-red-500 h-[64px]"></div>
              <span className="text-[9px] text-foreground-400 whitespace-nowrap">Juin 2026</span>
            </div>
            {data.esgQuarterlyMilestones.quarters.map((q, idx) => (
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
              <span className="text-xs font-bold text-accent-600">{data.esgStats.target_score}</span>
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
// TAB 2 : BILAN CARBONE
// ================================================================
function BilanCarboneTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const cf = data.carbonFootprintAssessment;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Bilan Carbone 2026 — GHG Protocol</h2>
          <div className="flex items-center gap-4 text-sm text-foreground-500 flex-wrap mt-1">
            <span>Méthodologie : <strong className="text-foreground-700">{cf.methodology}</strong></span>
            <span>Vérifié par : <strong className="text-accent-700">{cf.verification_status.split(' — ')[0]}</strong></span>
            <span>Réf : {cf.verification_status.split(' — ')[1]}</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Total Carbon */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-6 text-center">
            <p className="text-xs text-foreground-500 mb-1">Total tCO₂e 2026</p>
            <p className="text-4xl font-bold text-red-600">{cf.overall_tco2e}</p>
            <p className="text-xs text-foreground-400 mt-1">Cible 2027 : {cf.target_2027}</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-6 text-center">
            <p className="text-xs text-foreground-500 mb-1">Par Employé</p>
            <p className="text-4xl font-bold text-foreground-950">{cf.per_employee_tco2e}</p>
            <p className="text-xs text-foreground-400 mt-1">tCO₂e / employé</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-6 text-center">
            <p className="text-xs text-foreground-500 mb-1">Par M FCFA CA</p>
            <p className="text-4xl font-bold text-foreground-950">{cf.per_million_fcfa_tco2e}</p>
            <p className="text-xs text-foreground-400 mt-1">tCO₂e / M FCFA</p>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 text-center">
            <p className="text-xs text-accent-600 mb-1">Réduction vs 2025</p>
            <p className="text-4xl font-bold text-accent-600">{Math.abs(cf.reduction_vs_base)}%</p>
            <p className="text-xs text-accent-500 mt-1">Vers Net Zero 2035</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Scopes */}
      <div className="space-y-6">
        {cf.scopes.map((scope) => (
          <ScrollReveal key={scope.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
                    scope.id === 'scope-1' ? 'bg-red-100 text-red-700' :
                    scope.id === 'scope-2' ? 'bg-amber-100 text-amber-700' :
                    'bg-secondary-100 text-secondary-700'
                  }`}>{scope.tco2e}</div>
                  <div>
                    <h3 className="text-base font-bold text-foreground-950">{scope.name}</h3>
                    <p className="text-xs text-foreground-500">{scope.percentage}% du total — Cible 2027 : {scope.target_2027} tCO₂e</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-700 mb-2">Sources d'Émissions</h4>
                  <div className="space-y-2">
                    {scope.sources.map((src, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-background-100 rounded-lg text-xs">
                        <span className="text-foreground-700 max-w-[60%] truncate">{src.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground-950">{src.tco2e} tCO₂e</span>
                          <span className="text-accent-600">-{src.reduction_potential}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Actions de Réduction</h4>
                  <ul className="space-y-1.5">
                    {scope.actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Historical & Projected */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-foreground-950 mb-4">Tendance Historique (tCO₂e)</h3>
            <div className="flex items-end gap-2 h-36">
              {cf.historical_trend.map((h, i) => (
                <div key={h.year} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-foreground-700">{h.tco2e}</span>
                  <div className="w-full rounded-t-md bg-red-400/60" style={{ height: `${(h.tco2e / 550) * 120}px` }}></div>
                  <span className="text-[9px] text-foreground-400">{h.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-foreground-950 mb-4">Trajectoire Projetée (tCO₂e)</h3>
            <div className="flex items-end gap-2 h-36">
              {cf.projected_trajectory.map((p, i) => (
                <div key={p.year} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-accent-600">{p.tco2e}</span>
                  <div className="w-full rounded-t-md bg-accent-400/60" style={{ height: `${(p.tco2e / 550) * 120}px` }}></div>
                  <span className="text-[9px] text-foreground-400">{p.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Verification */}
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-5 text-sm text-accent-800">
          <strong>{cf.verification_status}</strong> — {cf.verification_date} · Neutralité carbone cible <strong>{cf.carbon_neutrality_target}</strong> · {cf.sbti_alignment}
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 3 : ECOVADIS
// ================================================================
function EcoVadisTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const ev = data.ecovadisAssessment;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Notation EcoVadis — Préparation & Soumission</h2>
          <p className="text-sm text-foreground-500">
            Score estimé actuel <strong className="text-red-600">{ev.current_estimated_score}/100</strong> → Cible <strong className="text-accent-600">{ev.target_score}/100 ({ev.target_medal})</strong> · Soumission cible : {ev.submission_target}
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
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--amber-500)" strokeWidth="16" strokeLinecap="round"
                  strokeDasharray={`${(ev.current_estimated_score / 100) * 477} 477`} />
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--accent-400)" strokeWidth="16" strokeLinecap="round"
                  strokeDasharray={`${(ev.target_score / 100) * 477} 477`} strokeDashoffset={`${(ev.current_estimated_score / 100) * 477}`}
                  opacity="0.5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-bold text-foreground-950">{ev.current_estimated_score}</span>
                <span className="text-xs text-foreground-400">/100 → {ev.target_score}</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {ev.domains.map((d) => (
                <div key={d.id} className="text-center p-3 bg-background-100 rounded-lg">
                  <p className="text-xs text-foreground-500 mb-1">{d.domain}</p>
                  <p className="text-lg font-bold text-red-600">{d.current_score}</p>
                  <p className="text-[10px] text-accent-600">→ {d.target_score}</p>
                  <p className="text-[9px] text-foreground-400">Poids {d.weight}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Domains detail */}
      <div className="space-y-6">
        {ev.domains.map((domain) => (
          <ScrollReveal key={domain.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-foreground-950">{domain.domain} (Poids {domain.weight}%)</h3>
                  <span className="text-sm font-bold text-red-600">{domain.current_score}/100</span>
                  <span className="text-xs text-foreground-400">→</span>
                  <span className="text-sm font-bold text-accent-600">{domain.target_score}/100</span>
                </div>
                <span className="text-[10px] text-foreground-500 bg-background-100 px-2 py-1 rounded-full">Owner : {domain.owner}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Politiques en Place</h4>
                  <ul className="space-y-1">
                    {domain.policies.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-check-line text-accent-500 mt-0.5 flex-shrink-0"></i>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-600 mb-2">Gaps</h4>
                  <ul className="space-y-1">
                    {domain.gaps.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-error-warning-line text-red-400 mt-0.5 flex-shrink-0"></i>{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-background-100 rounded-lg">
                  <span className="text-[10px] text-foreground-400 block mb-1">Actions</span>
                  <ul className="space-y-1">
                    {domain.actions.map((a, i) => (
                      <li key={i} className="text-xs text-foreground-700">{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-background-100 rounded-lg">
                  <span className="text-[10px] text-foreground-400 block mb-1">Deadline</span>
                  <span className="text-sm font-medium text-foreground-800">{domain.deadline}</span>
                </div>
                <div className="p-3 bg-background-100 rounded-lg">
                  <span className="text-[10px] text-foreground-400 block mb-1">Budget</span>
                  <span className="text-sm font-medium text-foreground-800">{domain.budget}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Timeline */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Timeline Soumission EcoVadis</h3>
          <div className="space-y-2">
            {ev.timeline_milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${m.status === 'Planifié' ? 'bg-background-300' : 'bg-accent-500'}`}></div>
                <span className="text-xs text-foreground-700 flex-1">{m.milestone}</span>
                <span className="text-xs text-foreground-500">{m.date}</span>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Documents */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Documents Justificatifs Requis ({ev.documentation_required.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ev.documentation_required.map((doc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground-700 p-2 bg-background-100 rounded-lg">
                <i className="ri-file-text-line text-secondary-500"></i>
                {doc}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 4 : RAPPORT DURABILITÉ 2026
// ================================================================
function RapportDurabiliteTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const r = data.sustainabilityReport2026;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">{r.title}</h2>
          <div className="flex items-center gap-3 flex-wrap mt-2">
            {r.frameworks.map((f) => (
              <span key={f} className="text-[11px] px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200 font-semibold">{f}</span>
            ))}
            <span className="text-xs text-foreground-500 ml-2">Publication : {r.publication_date} · Vérifié : {r.assurance_provider}</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Chapters progress */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent-600">{data.reportChaptersCompleted}</p>
            <p className="text-xs text-accent-500">Chapitres Complétés</p>
          </div>
          <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-secondary-600">{data.reportChaptersInProgress}</p>
            <p className="text-xs text-secondary-500">En Cours</p>
          </div>
          <div className="bg-background-200/50 border border-background-300/60 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground-500">{r.chapters.length - data.reportChaptersCompleted - data.reportChaptersInProgress}</p>
            <p className="text-xs text-foreground-400">Planifiés</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Chapters detail */}
      <div className="space-y-4">
        {r.chapters.map((ch) => (
          <ScrollReveal key={ch.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              ch.status.includes('Adopté') || ch.status.includes('Rédigé') ? 'border-accent-200' :
              ch.status.includes('cours') || ch.status.includes('Brouillon') ? 'border-secondary-200' :
              'border-background-200'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-foreground-400">{ch.id.toUpperCase()}</span>
                    <h3 className="text-sm font-bold text-foreground-950">{ch.title}</h3>
                    <StatusBadge status={ch.status} />
                  </div>
                  <p className="text-xs text-foreground-600 mt-2">{ch.content_summary}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-foreground-500 flex-shrink-0">
                  <span><strong className="text-foreground-600">Auteur :</strong> {ch.author}</span>
                  <span><strong className="text-foreground-600">Échéance :</strong> {ch.due_date}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Materiality Matrix */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Matrice de Matérialité Double</h3>
          <div className="space-y-2">
            {r.materiality_matrix.topics.map((t) => (
              <div key={t.topic} className="flex items-center gap-3 p-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                  t.category === 'Très Haute' ? 'bg-red-100 text-red-700 border-red-200' :
                  t.category === 'Haute' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                  t.category === 'Moyenne' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                  'bg-background-200 text-foreground-500 border-background-300'
                }`}>{t.category}</span>
                <span className="text-xs text-foreground-700 flex-1">{t.topic}</span>
                <div className="flex items-center gap-1 w-56">
                  <div className="h-2 bg-background-200 rounded-full overflow-hidden flex-1">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${t.importance_interne}%` }}></div>
                  </div>
                  <span className="text-[10px] text-foreground-400 w-8 text-right">{t.importance_interne}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* SDG */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Alignement ODD ({r.sdg_alignment.length} Objectifs)</h3>
          <div className="flex flex-wrap gap-2">
            {r.sdg_alignment.map((sdg) => (
              <span key={sdg.sdg} className={`text-xs px-3 py-1.5 rounded-full font-medium border ${
                sdg.relevance === 'Très Haute' ? 'bg-green-100 text-green-700 border-green-200' :
                sdg.relevance === 'Haute' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                'bg-background-100 text-foreground-500 border-background-200'
              }`}>
                {sdg.sdg.split(' — ')[0]}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* KPIs */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">KPIs Clés Rapport Durabilité</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {r.kpi_summary.map((kpi) => (
              <div key={kpi.kpi} className="p-3 bg-background-100 rounded-lg text-center">
                <p className="text-lg font-bold text-foreground-950">{kpi.current} <span className="text-xs font-normal text-foreground-400">{kpi.unit}</span></p>
                <p className="text-[10px] text-foreground-500">{kpi.kpi}</p>
                <p className={`text-[10px] font-semibold ${kpi.trend === 'up' ? 'text-accent-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-foreground-400'}`}>
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 5 : DASHBOARD ESG EXÉCUTIF
// ================================================================
function DashboardESGTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const dash = data.esgExecutiveDashboard;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">{dash.title}</h2>
          <p className="text-sm text-foreground-500">
            Mis à jour le {dash.last_updated} · Fréquence {dash.frequency} · Audience {dash.audience} · Owner {dash.owner}
          </p>
        </div>
      </ScrollReveal>

      {/* Alerts */}
      {dash.alerts.length > 0 && (
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dash.alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border ${
                alert.severity === 'high' ? 'bg-red-50/30 border-red-200' :
                alert.severity === 'medium' ? 'bg-amber-50/30 border-amber-200' :
                'bg-secondary-50/30 border-secondary-200'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertBadge severity={alert.severity} />
                  <div>
                    <p className="text-xs text-foreground-700 mb-1">{alert.message}</p>
                    <p className="text-[10px] text-foreground-500 flex items-center gap-1">
                      <i className="ri-lightbulb-line"></i> {alert.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* KPI Groups */}
      {dash.kpi_groups.map((group) => (
        <ScrollReveal key={group.id}>
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-background-100">
                <i className={`${group.icon} text-foreground-700`}></i>
              </div>
              <h3 className="text-base font-bold text-foreground-950">{group.name}</h3>
              <span className="text-xs text-foreground-400 ml-auto">{group.kpis.length} KPIs</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {group.kpis.map((kpi) => (
                <div key={kpi.id} className="p-4 bg-background-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <KPIAlertBadge alert={kpi.alert} />
                    <span className={`text-[10px] font-bold ${kpi.trend === 'up' ? 'text-accent-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-foreground-400'}`}>
                      {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-foreground-950">{kpi.value}</span>
                    <span className="text-xs text-foreground-400">{kpi.unit}</span>
                  </div>
                  <p className="text-[10px] text-foreground-500 mb-2">{kpi.name}</p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-foreground-400">Cible : {kpi.target}</span>
                    <span className="font-bold text-foreground-700">{Math.round((kpi.value / kpi.target) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${
                      kpi.color === 'green' ? 'bg-accent-500' :
                      kpi.color === 'amber' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

// ================================================================
// TAB 6 : PLAN ESG
// ================================================================
function PlanESGTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const [pillarFilter, setPillarFilter] = useState<string>('tous');
  const pillars = ['tous', ...data.planPillars];

  const filtered = pillarFilter === 'tous'
    ? data.esgPlanActions
    : data.esgPlanActions.filter(a => a.pillar === pillarFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan ESG — {data.esgPlanActions.length} Actions Priorisées</h2>
            <p className="text-sm text-foreground-500">
              {data.esgStats.p0_actions} P0 · {data.esgStats.p1_actions} P1 · {data.esgStats.p2_actions} P2 · En cours {data.esgStats.actions_in_progress} · Planifiées {data.esgStats.actions_planned} · Budget {data.esgStats.budget_total}
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
          <p className="text-2xl font-bold text-red-600">{data.esgStats.p0_actions}</p>
          <p className="text-[10px] text-red-500 font-semibold">Priorité P0</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{data.esgStats.p1_actions}</p>
          <p className="text-[10px] text-amber-500 font-semibold">Priorité P1</p>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.esgStats.p2_actions}</p>
          <p className="text-[10px] text-secondary-500 font-semibold">Priorité P2</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.esgStats.actions_in_progress}</p>
          <p className="text-[10px] text-foreground-400">En Cours</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground-950">{(207600000 / 1000000).toFixed(1)} M</p>
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
function KPIsTab({ data }: { data: ReturnType<typeof useESGSustainabilityCommand> }) {
  const m = data.esgQuarterlyMilestones;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">KPIs Trimestriels — Q3 2026 → Q2 2027</h2>
          <p className="text-sm text-foreground-500">
            {m.quarters.length} trimestres · Score {data.esgStats.global_score} → {m.quarters[0].target_score} → {m.quarters[1].target_score} → {m.quarters[2].target_score} → {data.esgStats.target_score} · Budget total {data.esgStats.budget_total}
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
                    <td key={q} className="text-center py-2 font-bold" style={{ color: `oklch(0.6 0.15 ${(row as any)[q] / (row as any).cible * 150})` }}>
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



