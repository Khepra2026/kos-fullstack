import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { Link } from 'react-router-dom';
import {
  barometrePMEAfrique,
  fintechRiskReport,
  esgAfricaReport,
  governanceIndex,
  investmentReadinessIndex,
  barometreSFDInclusion,
  livresBlancs,
  rapportsAnnuels,
  researchInstituteKPIs,
} from '@/mocks/researchInstitute';

type Tab = 'dashboard' | 'barometre' | 'fintech' | 'esg' | 'governance' | 'investment' | 'sfd' | 'livres-blancs';

const pillarColorMap: Record<string, { bg: string; text: string; bar: string; border: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', border: 'border-emerald-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', bar: 'bg-teal-500', border: 'border-teal-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', bar: 'bg-rose-500', border: 'border-rose-200' },
  red: { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500', border: 'border-red-200' },
  gray: { bg: 'bg-background-100', text: 'text-foreground-500', bar: 'bg-foreground-400', border: 'border-background-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', bar: 'bg-violet-500', border: 'border-violet-200' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', bar: 'bg-cyan-500', border: 'border-cyan-200' },
};

function getColor(color: string) {
  return pillarColorMap[color] || pillarColorMap.emerald;
}

function getStatusBadge(status: string) {
  if (status === 'Actif' || status === 'En production') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'Avancé') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (status === 'Planifié') return 'bg-background-100 text-foreground-500 border-background-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function renderProgressBar(value: number, max: number, colorClass: string = 'bg-accent-500') {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{value}/{max}</span>
    </div>
  );
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
  return val.toLocaleString('fr-FR');
}

function formatFCFA(val: number): string {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} Md`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(0)} M`;
  return val.toLocaleString('fr-FR');
}

function TrendBadge({ trend }: { trend: string }) {
  const isPositive = trend.startsWith('+');
  const isFlat = trend === '0';
  const color = isPositive ? 'text-emerald-600 bg-emerald-50' : isFlat ? 'text-foreground-500 bg-background-100' : 'text-rose-600 bg-rose-50';
  const icon = isPositive ? 'ri-arrow-up-line' : isFlat ? 'ri-subtract-line' : 'ri-arrow-down-line';
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
      <i className={`${icon} text-[10px]`}></i>{trend}
    </span>
  );
}

function MaturityBadge({ maturity }: { maturity: string }) {
  const map: Record<string, string> = {
    'Bon': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Intermédiaire': 'bg-amber-50 text-amber-700 border-amber-200',
    'Significatif': 'bg-rose-50 text-rose-700 border-rose-200',
    'Élevé': 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${map[maturity] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
      {maturity}
    </span>
  );
}

const publicationsList = [
  { id: 'barometre' as Tab, data: barometrePMEAfrique },
  { id: 'fintech' as Tab, data: fintechRiskReport },
  { id: 'esg' as Tab, data: esgAfricaReport },
  { id: 'governance' as Tab, data: governanceIndex },
  { id: 'investment' as Tab, data: investmentReadinessIndex },
  { id: 'sfd' as Tab, data: barometreSFDInclusion },
];

export default function researchInstitutePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedDimension, setSelectedDimension] = useState(0);

  const kpi = researchInstituteKPIs;

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Exécutif', icon: 'ri-dashboard-3-line', badge: 'Think Tank' },
    { id: 'barometre', label: 'Baromètre PME Afrique', icon: 'ri-store-2-line', badge: 'Q2 2026' },
    { id: 'fintech', label: 'FinTech Risk Report', icon: 'ri-shield-flash-line', badge: 'Q2 2026' },
    { id: 'esg', label: 'ESG Africa Report', icon: 'ri-seedling-line', badge: 'Q1 2026' },
    { id: 'governance', label: 'Governance Index', icon: 'ri-government-line', badge: 'Q2 2026' },
    { id: 'investment', label: 'Investment Readiness', icon: 'ri-funds-box-line', badge: 'Q1 2026' },
    { id: 'sfd', label: 'SFD & Inclusion Fin.', icon: 'ri-hand-heart-line', badge: 'Q2 2026' },
    { id: 'livres-blancs', label: 'Livres Blancs & Rapports', icon: 'ri-book-open-line', badge: 'MP4' },
  ];

  return (
    <hubLayout hubId={51} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">
                <i className="ri-lightbulb-flash-line"></i>PRIORITÉ 1 — KHEPRA RESEARCH INSTITUTE™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Khepra Research Institute™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Think tank économique et stratégique permanent — 64 publications, 105.2k téléchargements,
                +1 428 citations médias, 3 180 backlinks, 3 080 leads qualifiés. Production intellectuelle
                de référence en Afrique francophone — niveau Big Four.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{kpi.totalPublications}</div>
                <div className="text-xs text-foreground-500">Publications</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatNumber(kpi.totalDownloads)}</div>
                <div className="text-xs text-foreground-500">Téléchargements</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{kpi.totalCitationsMedias}</div>
                <div className="text-xs text-foreground-500">Citations Médias</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-emerald-600">{kpi.roi}</div>
                <div className="text-xs text-foreground-500">ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedDimension(0); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.badge && <span className="text-xs opacity-60">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB 1: EXECUTIVE DASHBOARD ============ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Bento Grid — 5 Publications */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicationsList.map((pub) => {
                const c = getColor(pub.data.color);
                const overall = 'dimensions' in pub.data
                  ? pub.data.dimensions
                  : 'pillars' in pub.data
                    ? pub.data.pillars
                    : 'subIndices' in pub.data
                      ? pub.data.subIndices
                      : 'criteria' in pub.data
                        ? pub.data.criteria
                        : [];
                const avgScore = Math.round(overall.reduce((s: number, d: any) => s + d.score, 0) / overall.length);
                return (
                  <div
                    key={pub.id}
                    onClick={() => setActiveTab(pub.id)}
                    className={`rounded-xl border p-5 cursor-pointer transition-all bg-background-50 border-background-200/70 hover:border-background-300/60`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${c.bg}`}>
                        <i className={`${pub.data.icon} text-lg ${c.text}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground-950">{pub.data.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-foreground-400 mt-0.5">
                          <span>{pub.data.currentEdition}</span>
                          <span>·</span>
                          <span>{pub.data.editions} éditions</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-foreground-400">Score composite</span>
                          <span className="text-xs font-bold text-foreground-950">{avgScore}/100</span>
                        </div>
                        {renderProgressBar(avgScore, 100, c.bar)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-foreground-400">
                      <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.data.downloadsLastEdition)}</span>
                      <span><i className="ri-newspaper-line mr-1"></i>{pub.data.citationsMedias} citations</span>
                      <span><i className="ri-link-m mr-1"></i>{pub.data.backlinksGenerated}</span>
                    </div>
                  </div>
                );
              })}
              {/* Global KPI Card */}
              <div className="rounded-xl border p-5 bg-foreground-950 text-white">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-grouped-line text-amber-400"></i>
                  Impact Global
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Téléchargements', value: formatNumber(kpi.totalDownloads), icon: 'ri-download-line' },
                    { label: 'Citations Médias', value: String(kpi.totalCitationsMedias), icon: 'ri-newspaper-line' },
                    { label: 'Backlinks', value: String(kpi.totalBacklinksGenerated), icon: 'ri-link-m' },
                    { label: 'Leads Qualifiés', value: String(kpi.totalLeadsFromPublications), icon: 'ri-user-add-line' },
                    { label: 'Pays Couverts', value: String(kpi.globalReachCountries), icon: 'ri-global-line' },
                    { label: 'ROI', value: kpi.roi, icon: 'ri-funds-line' },
                  ].map((stat, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/8 border border-white/10 text-center">
                      <i className={`${stat.icon} text-amber-400 text-sm mb-1 block`}></i>
                      <span className="block text-base font-bold">{stat.value}</span>
                      <span className="text-[9px] text-gray-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Livres Blancs & Rapports Annuels Summary Card */}
              <div
                onClick={() => setActiveTab('livres-blancs')}
                className="rounded-xl border p-5 cursor-pointer transition-all bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200/70 hover:border-violet-300/60"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100">
                    <i className="ri-book-open-line text-lg text-violet-700"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground-950">Livres Blancs & Rapports Annuels</h3>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400 mt-0.5">
                      <span>12 Livres Blancs</span>
                      <span>·</span>
                      <span>6 Rapports Annuels</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <div className="text-lg font-bold text-violet-700">{formatNumber(livresBlancs.totalDownloads)}</div>
                    <div className="text-[9px] text-foreground-500">Tél. Livres Blancs</div>
                  </div>
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <div className="text-lg font-bold text-indigo-700">{formatNumber(rapportsAnnuels.totalDownloads)}</div>
                    <div className="text-[9px] text-foreground-500">Tél. Rapports</div>
                  </div>
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <div className="text-lg font-bold text-violet-700">{livresBlancs.totalCitations}</div>
                    <div className="text-[9px] text-foreground-500">Citations LB</div>
                  </div>
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <div className="text-lg font-bold text-indigo-700">{rapportsAnnuels.totalCitations}</div>
                    <div className="text-[9px] text-foreground-500">Citations RA</div>
                  </div>
                </div>
                <div className="text-[10px] text-violet-600 font-medium text-center cursor-pointer">
                  <i className="ri-arrow-right-line mr-1"></i>Explorer la collection
                </div>
              </div>
            </div>

            {/* Timeline + Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <i className="ri-history-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Jalons Clés</h3>
                </div>
                <div className="space-y-0">
                  {kpi.keyMilestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 relative">
                      {i < kpi.keyMilestones.length - 1 && (
                        <div className="absolute left-[13px] top-8 bottom-0 w-px bg-background-200/70"></div>
                      )}
                      <div className="w-[26px] h-[26px] rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-950">{m.quarter}</span>
                        <p className="text-xs text-foreground-600 mt-0.5">{m.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <i className="ri-calendar-check-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Prochaines Éditions</h3>
                </div>
                <div className="space-y-3">
                  {kpi.upcomingEditions.map((ed, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          ed.status === 'En production' ? 'bg-amber-400' : 'bg-foreground-300'
                        }`}></span>
                        <div>
                          <span className="text-xs font-semibold text-foreground-950">{ed.publication} — {ed.edition}</span>
                          <span className="block text-[10px] text-foreground-400">{ed.date}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(ed.status)}`}>
                        {ed.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Partners + Media */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <i className="ri-building-4-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Partenaires Institutionnels</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {kpi.institutionalPartners.map((p, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <span className="text-xs font-bold text-foreground-950">{p.name}</span>
                      <span className="block text-[10px] text-foreground-400">{p.type}</span>
                      <span className="block text-[10px] text-foreground-500 mt-1">{p.collaboration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                    <i className="ri-newspaper-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Couverture Média</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {kpi.mediaPartners.map((m, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground-950">{m.name}</span>
                        <span className="block text-[10px] text-foreground-400">{m.type}</span>
                      </div>
                      <span className="text-xs font-bold text-accent-500">{m.coverage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Size Overview */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-database-2-line text-amber-400"></i>
                Couverture des Publications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
                {publicationsList.map((pub) => {
                  const c = getColor(pub.data.color);
                  return (
                    <div key={pub.id} className="p-4 rounded-xl bg-white/8 border border-white/10">
                      <i className={`${pub.data.icon} text-xl mb-2 block ${c.text.replace('700', '400')}`}></i>
                      <span className="block text-xl font-bold font-heading">{pub.data.sampleSize}</span>
                      <span className="text-[10px] text-gray-400">{pub.data.name}</span>
                      <span className="block text-[9px] text-gray-500 mt-0.5">{pub.id === 'sfd' ? 'SFD couverts' : pub.id === 'barometre' ? 'PME couvertes' : pub.id === 'fintech' ? 'FinTechs couvertes' : 'entreprises couvertes'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: BAROMÈTRE PME AFRIQUE ============ */}
        {activeTab === 'barometre' && (
          <PublicationDetail
            pub={barometrePMEAfrique}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        )}

        {/* ============ TAB 3: FINTECH RISK REPORT ============ */}
        {activeTab === 'fintech' && (
          <PublicationDetail
            pub={fintechRiskReport}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        )}

        {/* ============ TAB 4: ESG AFRICA REPORT ============ */}
        {activeTab === 'esg' && (
          <PublicationDetail
            pub={esgAfricaReport}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        )}

        {/* ============ TAB 5: GOVERNANCE INDEX ============ */}
        {activeTab === 'governance' && (
          <PublicationDetail
            pub={governanceIndex}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        )}

        {/* ============ TAB 6: INVESTMENT READINESS INDEX ============ */}
        {activeTab === 'investment' && (
          <InvestmentReadinessDetail
            pub={investmentReadinessIndex}
          />
        )}

        {/* ============ TAB 7: SFD & INCLUSION FINANCIÈRE ============ */}
        {activeTab === 'sfd' && (
          <PublicationDetail
            pub={barometreSFDInclusion}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        )}

        {/* ============ TAB 8: LIVRES BLANCS & RAPPORTS ANNUELS ============ */}
        {activeTab === 'livres-blancs' && (
          <LivresBlancsRapportsAnnuels />
        )}

      </div>

      {/* Footer KPI Bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Khepra Research Institute™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Publications/an</div>
              <div className="text-lg font-bold text-foreground-950">{kpi.publicationsPerYear}</div>
              <div className="text-[10px] text-emerald-600 mt-1">Cible {kpi.targetPublicationsPerYear} atteinte</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Téléchargements</div>
              <div className="text-lg font-bold text-accent-500">{formatNumber(kpi.totalDownloads)}</div>
              <div className="text-[10px] text-foreground-400 mt-1">Cumul toutes éditions</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Citations Médias</div>
              <div className="text-lg font-bold text-primary-500">{kpi.totalCitationsMedias}</div>
              <div className="text-[10px] text-foreground-400 mt-1">{kpi.mediaPartners.length} partenaires</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Leads Qualifiés</div>
              <div className="text-lg font-bold text-emerald-600">{kpi.totalLeadsFromPublications}</div>
              <div className="text-[10px] text-foreground-400 mt-1">{formatFCFA(kpi.revenueAttributedFCFA)} attribués</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score Qualité</div>
              <div className="text-lg font-bold text-amber-600">{kpi.averageQualityScore}/10</div>
              <div className="text-[10px] text-foreground-400 mt-1">Moyenne publications</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">ROI</div>
              <div className="text-lg font-bold text-foreground-950">{kpi.roi}</div>
              <div className="text-[10px] text-teal-600 mt-1">{formatFCFA(kpi.revenueAttributedFCFA)} revenus</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}

/* ============ LIVRES BLANCS & RAPPORTS ANNUELS COMPONENT ============ */
function LivresBlancsRapportsAnnuels() {
  const [activeSubTab, setActiveSubTab] = useState<'livres-blancs' | 'rapports-annuels'>('livres-blancs');
  const lb = livresBlancs;
  const ra = rapportsAnnuels;

  const domainColorMap: Record<string, string> = {
    'Gouvernance': 'bg-rose-100 text-rose-700 border-rose-200',
    'Investissement': 'bg-teal-100 text-teal-700 border-teal-200',
    'SFD': 'bg-violet-100 text-violet-700 border-violet-200',
    'Inclusion Financière': 'bg-violet-100 text-violet-700 border-violet-200',
    'FinTech': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'ESG': 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-8">
      {/* Sub Tab Navigation */}
      <div className="flex gap-1 py-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('livres-blancs')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeSubTab === 'livres-blancs' ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}
        >
          <i className="ri-book-open-line text-sm"></i>Livres Blancs ({lb.totalLivresBlancs})
        </button>
        <button
          onClick={() => setActiveSubTab('rapports-annuels')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeSubTab === 'rapports-annuels' ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}
        >
          <i className="ri-file-chart-line text-sm"></i>Rapports Annuels ({ra.totalRapports})
        </button>
      </div>

      {activeSubTab === 'livres-blancs' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground-950">{lb.title}</h2>
              <p className="text-sm text-foreground-600 mt-1">{lb.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{lb.totalLivresBlancs}</div>
                <div className="text-xs text-foreground-500">Livres Blancs</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatNumber(lb.totalDownloads)}</div>
                <div className="text-xs text-foreground-500">Téléchargements</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{lb.totalCitations}</div>
                <div className="text-xs text-foreground-500">Citations</div>
              </div>
            </div>
          </div>

          {/* Domain Distribution */}
          <div className="flex flex-wrap gap-2">
            {lb.domainDistribution.map((d, i) => (
              <span key={i} className={`text-xs px-3 py-1 rounded-full border font-medium ${domainColorMap[d.domain] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
                {d.domain} ({d.count})
              </span>
            ))}
          </div>

          {/* Livres Blancs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lb.publications.map((pub) => (
              <div key={pub.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground-950 leading-snug">{pub.title}</h4>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${domainColorMap[pub.domain] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{pub.domain}</span>
                      <span className="text-[10px] text-foreground-400">{pub.type}</span>
                      <span className="text-[10px] text-foreground-400">{pub.pages} pages</span>
                      {pub.labellisation && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{pub.labellisation}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed mb-3">{pub.summary}</p>
                <div className="flex items-center gap-4 text-[10px] text-foreground-400">
                  <span><i className="ri-calendar-line mr-1"></i>{new Date(pub.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.downloads)}</span>
                  <span><i className="ri-chat-quote-line mr-1"></i>{pub.citations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'rapports-annuels' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground-950">{ra.title}</h2>
              <p className="text-sm text-foreground-600 mt-1">{ra.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{ra.totalRapports}</div>
                <div className="text-xs text-foreground-500">Rapports</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatNumber(ra.totalDownloads)}</div>
                <div className="text-xs text-foreground-500">Téléchargements</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{ra.totalCitations}</div>
                <div className="text-xs text-foreground-500">Citations</div>
              </div>
            </div>
          </div>

          {/* Domain Distribution */}
          <div className="flex flex-wrap gap-2">
            {ra.domainDistribution.map((d, i) => (
              <span key={i} className={`text-xs px-3 py-1 rounded-full border font-medium ${domainColorMap[d.domain] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
                {d.domain} ({d.count})
              </span>
            ))}
          </div>

          {/* Rapports Annuels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ra.publications.map((pub) => (
              <div key={pub.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground-950 leading-snug">{pub.title}</h4>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${domainColorMap[pub.domain] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{pub.domain}</span>
                      <span className="text-[10px] text-foreground-400">{pub.type}</span>
                      <span className="text-[10px] text-foreground-400">{pub.pages} pages</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed mb-3">{pub.summary}</p>
                <div className="flex items-center gap-4 text-[10px] text-foreground-400">
                  <span><i className="ri-calendar-line mr-1"></i>{new Date(pub.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.downloads)}</span>
                  <span><i className="ri-chat-quote-line mr-1"></i>{pub.citations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ REUSABLE PUBLICATION DETAIL COMPONENT ============ */
function PublicationDetail({ pub, selectedDimension, setSelectedDimension }: {
  pub: any;
  selectedDimension: number;
  setSelectedDimension: (i: number) => void;
}) {
  const c = getColor(pub.color);
  const dimensions = pub.dimensions || pub.subIndices || pub.criteria || pub.pillars || [];
  const selected = dimensions[selectedDimension] || dimensions[0];

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${c.bg}`}>
                <i className={`${pub.icon} text-2xl ${c.text}`}></i>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950">{pub.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(pub.status)}`}>
                    {pub.status}
                  </span>
                  <span className="text-xs text-foreground-400">{pub.frequency} · {pub.currentEdition}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed mb-4">{pub.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-500">
              <span><i className="ri-file-copy-line mr-1"></i>{pub.editions} éditions</span>
              <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.downloadsLastEdition)} téléchargements</span>
              <span><i className="ri-newspaper-line mr-1"></i>{pub.citationsMedias} citations médias</span>
              <span><i className="ri-link-m mr-1"></i>{pub.backlinksGenerated} backlinks</span>
              <span><i className="ri-user-add-line mr-1"></i>{pub.leadsFromPublication} leads</span>
              <span className="font-semibold"><i className="ri-group-line mr-1"></i>n={pub.sampleSize}</span>
            </div>
          </div>
          {/* Key findings mini */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="p-4 rounded-xl bg-background-100 border border-background-200/70">
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1">
                <i className="ri-lightbulb-flash-line text-amber-500 text-sm"></i>
                Résumé Exécutif
              </h4>
              <p className="text-xs text-foreground-600 leading-relaxed">{pub.executiveSummary || pub.keyFindings[0]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dimensions Grid + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dimension Selector */}
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${c.bg}`}>
              <i className="ri-radar-line text-sm"></i>
            </div>
            <span className="text-sm font-bold text-foreground-950">
              {'dimensions' in pub ? 'Dimensions' : 'pillars' in pub ? 'Piliers ESG' : 'subIndices' in pub ? 'Sous-Indices' : 'Critères'}
            </span>
          </div>
          {dimensions.map((dim: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedDimension(i)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                i === selectedDimension
                  ? `${c.border} ${c.bg}`
                  : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground-950">
                  {dim.name}
                  {dim.label && <span className="text-[10px] text-foreground-400 ml-1">({dim.label})</span>}
                </span>
                <TrendBadge trend={dim.trend} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">{renderProgressBar(dim.score, 100, c.bar)}</div>
                {dim.maturity && <MaturityBadge maturity={dim.maturity} />}
              </div>
              {dim.weight && (
                <div className="text-[10px] text-foreground-400 mt-1">Pondération : {dim.weight}%</div>
              )}
            </div>
          ))}
        </div>

        {/* Dimension Detail */}
        <div className="lg:col-span-2">
          <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground-950">{selected.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-foreground-950">{selected.score}</span>
                <TrendBadge trend={selected.trend} />
              </div>
            </div>
            <p className="text-sm text-foreground-600 mb-6">{selected.description}</p>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground-500">Score sur 100</span>
              </div>
              {renderProgressBar(selected.score, 100, c.bar)}
            </div>
            {selected.indicators && (
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selected.indicators.map((ind: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-background-100 rounded text-xs text-foreground-600">
                    <i className="ri-checkbox-circle-line text-emerald-500 text-sm"></i>
                    {ind}
                  </div>
                ))}
              </div>
            )}
            {selected.incidents !== undefined && (
              <div className="p-4 bg-rose-50/50 rounded-lg border border-rose-100 mb-6">
                <div className="flex items-center gap-2">
                  <i className="ri-alert-line text-rose-600"></i>
                  <span className="text-xs text-foreground-950 font-semibold">{selected.incidents} incidents signalés en 2026</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <i className="ri-lightbulb-flash-line text-amber-400 text-lg"></i>
          </div>
          <h3 className="font-heading text-lg font-bold">Key Findings — {pub.currentEdition}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pub.keyFindings.map((kf: string, i: number) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
              <span className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-400 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-200 leading-relaxed">{kf}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Trend */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
            <i className="ri-line-chart-line text-lg"></i>
          </div>
          <h3 className="text-sm font-bold text-foreground-950">Évolution de l'Indice Composite</h3>
        </div>
        <div className="flex items-end gap-3 h-40 px-4">
          {pub.historicalTrend.map((pt: any, i: number) => {
            const heightPct = ((pt.overallScore - 40) / 60) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] font-bold text-foreground-950 mb-1">{pt.overallScore}</span>
                <div
                  className={`w-full rounded-t-md ${c.bar}`}
                  style={{ height: `${Math.max(heightPct, 4)}%`, opacity: 0.3 + (0.7 * (i + 1) / pub.historicalTrend.length) }}
                ></div>
                <span className="text-[9px] text-foreground-400 mt-2 whitespace-nowrap">{pt.quarter}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outputs */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <i className="ri-file-list-3-line text-lg"></i>
          </div>
          <h3 className="text-sm font-bold text-foreground-950">Livrables par Édition</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {pub.outputs && pub.outputs.map((out: any, i: number) => (
            <div key={i} className="p-4 bg-background-100 rounded-lg border border-background-200/70 text-center">
              <i className={`${out.icon} text-xl ${c.text} mb-2 block`}></i>
              <span className="text-xs font-semibold text-foreground-950">{out.type}</span>
              <span className="block text-[10px] text-foreground-400">{out.format}</span>
            </div>
          ))}
          {pub.countries && (
            <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
              <span className="text-xs font-semibold text-foreground-950">Pays couverts</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {pub.countries.map((ct: string, i: number) => (
                  <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-50 text-foreground-500 border border-background-200/70">
                    {ct}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ INVESTMENT READINESS DETAIL ============ */
function InvestmentReadinessDetail({ pub }: { pub: any }) {
  const c = getColor(pub.color);
  const [selectedCriterion, setSelectedCriterion] = useState(0);
  const selected = pub.criteria[selectedCriterion];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${c.bg}`}>
                <i className={`${pub.icon} text-2xl ${c.text}`}></i>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950">{pub.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(pub.status)}`}>
                    {pub.status}
                  </span>
                  <span className="text-xs text-foreground-400">{pub.frequency} · {pub.currentEdition}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed mb-4">{pub.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-500">
              <span><i className="ri-file-copy-line mr-1"></i>{pub.editions} éditions</span>
              <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.downloadsLastEdition)} téléchargements</span>
              <span><i className="ri-newspaper-line mr-1"></i>{pub.citationsMedias} citations</span>
              <span><i className="ri-link-m mr-1"></i>{pub.backlinksGenerated} backlinks</span>
              <span className="font-semibold"><i className="ri-group-line mr-1"></i>n={pub.sampleSize}</span>
            </div>
          </div>
          <div className="lg:w-80 flex-shrink-0">
            <div className="p-4 rounded-xl bg-background-100 border border-background-200/70">
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1">
                <i className="ri-lightbulb-flash-line text-amber-500 text-sm"></i>
                Résumé Exécutif
              </h4>
              <p className="text-xs text-foreground-600 leading-relaxed">{pub.keyFindings[0]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Scale */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
            <i className="ri-medal-line text-lg"></i>
          </div>
          <h3 className="text-sm font-bold text-foreground-950">Échelle de Notation</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pub.ratingScale.map((r: any, i: number) => {
            const rc = getColor(r.color);
            return (
              <div key={i} className={`p-4 rounded-lg border text-center ${rc.bg} ${rc.border}`}>
                <span className={`text-xl font-heading font-bold ${rc.text}`}>{r.grade}</span>
                <span className="block text-[10px] text-foreground-500">{r.range}</span>
                <span className="block text-xs font-semibold text-foreground-950 mt-2">{r.count}</span>
                <span className="text-[9px] text-foreground-400">entreprises</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Rated + Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
              <i className="ri-radar-line text-sm"></i>
            </div>
            <span className="text-sm font-bold text-foreground-950">Critères d'Évaluation</span>
          </div>
          {pub.criteria.map((cr: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedCriterion(i)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                i === selectedCriterion
                  ? `${c.border} ${c.bg}`
                  : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground-950">{cr.name}</span>
                <span className="text-[10px] text-foreground-400">{cr.weight}%</span>
              </div>
              {renderProgressBar(cr.score, 100, c.bar)}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-background-50 rounded-lg border border-background-200/70 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground-950">{selected.name}</h3>
              <span className="text-2xl font-bold text-foreground-950">{selected.score}</span>
            </div>
            <p className="text-sm text-foreground-600 mb-4">{selected.description}</p>
            <div className="mb-4">{renderProgressBar(selected.score, 100, c.bar)}</div>
            <div className="text-[10px] text-foreground-400">Pondération : {selected.weight}% dans la notation globale</div>
          </div>

          {/* Top Rated */}
          <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
            <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-trophy-line text-amber-500"></i>
              Top 5 — {pub.currentEdition}
            </h3>
            <div className="space-y-2">
              {pub.topRated.map((t: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center text-[10px] font-bold">
                      {t.rank}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-foreground-950">{t.enterprise}</span>
                      <span className="block text-[10px] text-foreground-400">{t.sector} · {t.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">{t.grade}</span>
                    <span className="block text-[10px] text-foreground-400">{t.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Investors + Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-bank-line text-teal-600"></i>
            Investisseurs Ciblés
          </h3>
          <div className="space-y-3">
            {pub.investorsTargeted.map((inv: any, i: number) => (
              <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground-950">{inv.type}</span>
                  <span className="text-xs font-semibold text-teal-600">{inv.count}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                  <span>AUM : {inv.aum}</span>
                  <span>{inv.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-foreground-950 p-6 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <i className="ri-lightbulb-flash-line text-teal-400 text-lg"></i>
            </div>
            <h3 className="font-heading text-lg font-bold">Key Findings — {pub.currentEdition}</h3>
          </div>
          <div className="space-y-3">
            {pub.keyFindings.map((kf: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/8 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-teal-400 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-gray-200 leading-relaxed">{kf}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Trend */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
            <i className="ri-line-chart-line text-lg"></i>
          </div>
          <h3 className="text-sm font-bold text-foreground-950">Évolution de l'Indice Composite</h3>
        </div>
        <div className="flex items-end gap-3 h-40 px-4">
          {pub.historicalTrend.map((pt: any, i: number) => {
            const heightPct = ((pt.overallScore - 40) / 60) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] font-bold text-foreground-950 mb-1">{pt.overallScore}</span>
                <div
                  className="w-full rounded-t-md bg-teal-500"
                  style={{ height: `${Math.max(heightPct, 4)}%`, opacity: 0.3 + (0.7 * (i + 1) / pub.historicalTrend.length) }}
                ></div>
                <span className="text-[9px] text-foreground-400 mt-2 whitespace-nowrap">{pt.quarter}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



