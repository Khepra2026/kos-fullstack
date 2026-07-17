import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useRegulatoryComplianceScanner } from '@/hooks/useRegulatoryComplianceScanner';
import { useComplianceQualityMax } from '@/hooks/useComplianceQualityMax';
import { useQualitySystem } from '@/hooks/useQualitySystem';
import {
  ISO_STANDARDS,
  BIG_FOUR_DIMENSIONS,
  computeTotalComplianceKPIs,
} from '@/services/kosISOBigFourTotalComplianceControl';
import type { ISOStandardCompliance, BigFourDimension, TotalComplianceKPIs } from '@/services/kosISOBigFourTotalComplianceControl';

type TabId = 'overview' | 'iso' | 'bigfour' | 'regulatory' | 'controls' | 'actions';

function isoStatusBadge(status: ISOStandardCompliance['status']) {
  const map = {
    certified: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'CERTIFIÉ', dot: 'bg-emerald-500' },
    compliant: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', label: 'CONFORME', dot: 'bg-teal-500' },
    partial: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'PARTIEL', dot: 'bg-amber-500' },
    non_compliant: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'NON CONFORME', dot: 'bg-red-500' },
    targeted: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'CIBLÉ', dot: 'bg-orange-500' },
  };
  return map[status];
}

function bigfourStatusBadge(status: BigFourDimension['status']) {
  const map = {
    exceeds: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'DÉPASSE', dot: 'bg-emerald-500' },
    meets: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', label: 'ATTEINT', dot: 'bg-teal-500' },
    approaching: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'APPROCHE', dot: 'bg-amber-500' },
    below: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'SOUS SEUIL', dot: 'bg-red-500' },
  };
  return map[status];
}

function formatScoreColor(score: number): string {
  if (score >= 95) return '#86BC25';
  if (score >= 90) return '#0D7B5F';
  if (score >= 85) return '#E8C547';
  if (score >= 75) return '#E8943A';
  return '#C2410C';
}

export default function KOSISOBigFourTotalComplianceControlPage() {
  const kpis = useMemo(() => computeTotalComplianceKPIs(), []);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedISO, setExpandedISO] = useState<string | null>(null);
  const [expandedBF, setExpandedBF] = useState<string | null>(null);

  const {
    data: scannerData,
    complianceAlerts: liveAlerts,
    complianceCoverage: liveCoverage,
    complianceDashboardKPIs: liveKPIs,
    loading: scannerLoading,
    isLive: scannerLive,
  } = useRegulatoryComplianceScanner();

  const { kpis: cqKpis, isLive: cqLive } = useComplianceQualityMax();
  const { globalReport, dataSource: qualityLive } = useQualitySystem();

  const gciColor = formatScoreColor(kpis.global_compliance_index);
  const isoAvg = useMemo(() => Math.round(ISO_STANDARDS.reduce((s, i) => s + i.score, 0) / ISO_STANDARDS.length), []);
  const bfAvg = useMemo(() => Math.round(BIG_FOUR_DIMENSIONS.reduce((s, b) => s + b.score, 0) / BIG_FOUR_DIMENSIONS.length), []);
  const allLive = scannerLive || cqLive || qualityLive === 'supabase';

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'overview', label: 'Cockpit Global', icon: 'ri-dashboard-line', sub: `${kpis.global_compliance_index}/100` },
    { id: 'iso', label: 'ISO Standards', icon: 'ri-global-line', sub: `${ISO_STANDARDS.length} normes` },
    { id: 'bigfour', label: 'Big Four Dimensions', icon: 'ri-building-line', sub: `${BIG_FOUR_DIMENSIONS.length} axes` },
    { id: 'regulatory', label: 'Scanner Réglementaire', icon: 'ri-radar-line', sub: `${scannerData?.totalReferentiels || 15} ref.` },
    { id: 'controls', label: 'Matrices Contrôle', icon: 'ri-shield-check-line', sub: `${cqKpis.total_automates || 48} auto.` },
    { id: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line', sub: `${kpis.open_actions} ouvertes` },
  ];

  return (
    <KOSHubLayout hubId={350}>
      <SeoHead
        title="KOS ISO + Big Four Total Compliance & Quality Control™ — 150% Audit Readiness | KHEPRA EXPERTS"
        description="Cockpit unifié ISO 9001/27001/31000/22301/37001/37301 × Big Four PwC/Deloitte/EY/KPMG × Scanner Réglementaire BCEAO/COBAC. Contrôle conformité et qualité totale. 10 normes ISO, 10 dimensions Big Four, 15 référentiels. Global Compliance Index 150%."
        keywords="ISO Big Four compliance, ISO 9001 27001 31000, Big Four audit ready, conformité totale, qualité totale, KHEPRA EXPERTS, COBAC BCEAO"
        canonicalPath="/kos-iso-bigfour-total-compliance-control"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Monumental%20cinematic%20dual%20architecture%20visualization%20with%20emerald%20and%20warm%20amber%20interconnected%20compliance%20frameworks%20forming%20a%20majestic%20unified%20control%20tower%2C%20left%20side%20representing%20ISO%20standards%20as%20crystalline%20geometric%20structures%20with%20certification%20seals%2C%20right%20side%20representing%20Big%20Four%20dimensions%20as%20towering%20pillars%20of%20governance%20audit%20and%20risk%2C%20dramatic%20volumetric%20lighting%20with%20golden%20rays%20piercing%20through%20dark%20atmosphere%2C%20sophisticated%20institutional%20aesthetic%20with%20precise%20geometric%20precision%20and%20interconnected%20nodes%2C%20abstract%20high%20tech%20command%20center%20symbolizing%20total%20compliance%20and%20quality%20mastery%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows%20and%20intense%20contrast&width=1920&height=700&seq=kos-iso-bf-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/30 border border-emerald-500/40 backdrop-blur-sm">
                  <i className="ri-scales-3-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS ISO + Big Four Total Compliance Control™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  allLive ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-amber-500/20 border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${allLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${allLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {allLive ? 'DONNÉES LIVE — SUPABASE' : 'DÉMO — ENRICHISSEMENT'}
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Contrôle Conformité & Qualité Totale.
                <span className="block text-emerald-400 mt-2">ISO Standards. Big Four Dimensions. Un Cockpit.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{ISO_STANDARDS.length} normes ISO</strong> vérifiées ·{' '}
                <strong className="text-white">{BIG_FOUR_DIMENSIONS.length} dimensions Big Four</strong> calibrées ·{' '}
                <strong className="text-white">{scannerData?.totalReferentiels || 15} référentiels</strong> scannés.{' '}
                Global Compliance Index : <strong className="text-emerald-400">{kpis.global_compliance_index}/100</strong>.{' '}
                <strong className="text-white">{kpis.overall_rating}</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {kpis.iso_standards_certified}/{ISO_STANDARDS.length} ISO Certifiées
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-xs text-teal-300 font-bold">
                  <i className="ri-building-line text-xs" />
                  {kpis.bigfour_exceeds}/{BIG_FOUR_DIMENSIONS.length} BF Dépassés
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs text-amber-300 font-bold">
                  <i className="ri-error-warning-line text-xs" />
                  {kpis.critical_actions} Actions Critiques
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs text-indigo-300 font-bold">
                  <i className="ri-check-double-line text-xs" />
                  {kpis.controls_effective}/{kpis.total_controls} Contrôles OK
                </span>
              </div>
            </div>

            {/* GCI Score Card */}
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Global Compliance Index</span>
              <div className="relative inline-flex mt-3 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={gciColor} strokeWidth="5"
                    strokeDasharray={`${(kpis.global_compliance_index / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-heading">{kpis.global_compliance_index}</span>
                  <span className="text-[9px] text-gray-400">/100</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${gciColor}20`, color: gciColor, border: `1px solid ${gciColor}40` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gciColor }} />
                {kpis.overall_rating}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'GCI', value: String(kpis.global_compliance_index), icon: 'ri-shield-check-line', color: gciColor },
              { label: 'ISO Cert.', value: `${kpis.iso_standards_certified}/${kpis.iso_standards_covered}`, icon: 'ri-global-line', color: '#059669' },
              { label: 'BF Excède', value: `${kpis.bigfour_exceeds}/10`, icon: 'ri-building-line', color: '#6366F1' },
              { label: 'Contrôles OK', value: `${kpis.controls_effective}`, icon: 'ri-check-double-line', color: '#86BC25' },
              { label: 'Gaps', value: String(kpis.control_gaps), icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Critiques', value: String(kpis.critical_actions), icon: 'ri-alert-line', color: '#C2410C' },
              { label: 'Vérifications', value: String(kpis.verification_logs_count), icon: 'ri-search-eye-line', color: '#8B5CF6' },
              { label: 'Matrices Risque', value: String(kpis.risk_matrices_count), icon: 'ri-radar-line', color: '#EA580C' },
              { label: 'Score ISO', value: `${isoAvg}/100`, icon: 'ri-award-line', color: '#0D7B5F' },
              { label: 'Score BF', value: `${bfAvg}/100`, icon: 'ri-medal-line', color: '#8B5CF6' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-[10px] mb-0.5 block`} style={{ color: stat.color }} />
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      {activeTab === 'overview' && (
        <>
          {/* Dual Score Cards */}
          <section className="py-10 sm:py-14 bg-background-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* ISO Side */}
                <div className="rounded-2xl bg-white border border-emerald-200 p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100">
                      <i className="ri-global-line text-2xl text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground-950">ISO Standards</h3>
                      <p className="text-sm text-emerald-600 font-bold">{ISO_STANDARDS.length} normes · {kpis.iso_standards_certified} certifiées</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Score Moyen', value: `${isoAvg}/100`, color: '#059669' },
                      { label: 'Certifiées', value: String(kpis.iso_standards_certified), color: '#86BC25' },
                      { label: 'Conformes', value: String(ISO_STANDARDS.filter(s => s.status === 'compliant').length), color: '#0D7B5F' },
                      { label: 'Partielles', value: String(ISO_STANDARDS.filter(s => s.status === 'partial' || s.status === 'targeted').length), color: '#E8C547' },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-3 text-center">
                        <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                        <span className="text-[10px] text-foreground-500">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {ISO_STANDARDS.slice(0, 5).map(iso => {
                      const badge = isoStatusBadge(iso.status);
                      return (
                        <div key={iso.standard} className="flex items-center gap-3 p-2 rounded-lg bg-background-50 border border-background-100">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${formatScoreColor(iso.score)}15` }}>
                            <span className="text-xs font-bold" style={{ color: formatScoreColor(iso.score) }}>{iso.score}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-bold text-foreground-800 block">{iso.standard}</span>
                            <span className="text-[9px] text-foreground-400">{iso.name}</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                    <div className="text-center pt-1">
                      <span className="text-[10px] text-foreground-400">+{ISO_STANDARDS.length - 5} autres normes</span>
                    </div>
                  </div>
                </div>

                {/* Big Four Side */}
                <div className="rounded-2xl bg-white border border-indigo-200 p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-100">
                      <i className="ri-building-line text-2xl text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground-950">Big Four Dimensions</h3>
                      <p className="text-sm text-indigo-600 font-bold">{BIG_FOUR_DIMENSIONS.length} axes · {kpis.bigfour_exceeds} dépassés</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Score Moyen', value: `${bfAvg}/100`, color: '#6366F1' },
                      { label: 'Dépassés', value: String(kpis.bigfour_exceeds), color: '#86BC25' },
                      { label: 'Atteints', value: String(BIG_FOUR_DIMENSIONS.filter(s => s.status === 'meets').length), color: '#0D7B5F' },
                      { label: 'Sous Seuil', value: String(BIG_FOUR_DIMENSIONS.filter(s => s.status === 'below').length), color: '#DC2626' },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-3 text-center">
                        <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                        <span className="text-[10px] text-foreground-500">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {BIG_FOUR_DIMENSIONS.slice(0, 5).map(bf => {
                      const badge = bigfourStatusBadge(bf.status);
                      return (
                        <div key={bf.dimension} className="flex items-center gap-3 p-2 rounded-lg bg-background-50 border border-background-100">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${formatScoreColor(bf.score)}15` }}>
                            <span className="text-xs font-bold" style={{ color: formatScoreColor(bf.score) }}>{bf.score}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-bold text-foreground-800 block">{bf.dimension}</span>
                            <span className="text-[9px] text-foreground-400">{bf.firm_reference.split(' — ')[0]}</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Regulatory Scanner Summary */}
              <div className="rounded-2xl bg-white border border-amber-200 p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-100">
                    <i className="ri-radar-line text-2xl text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">Scanner Réglementaire — {scannerData?.totalReferentiels || 15} Référentiels</h3>
                    <p className="text-sm text-amber-600 font-bold">
                      Score {scannerData?.scoreConformiteGlobal || 94}/100 · {scannerData?.totalTextes || 121} textes · {scannerData?.alertesActives || 7} alertes
                    </p>
                  </div>
                  {scannerLive && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />LIVE
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(scannerData?.referentiels || []).slice(0, 12).map(ref => {
                    const c = ref.score >= 95 ? '#86BC25' : ref.score >= 90 ? '#0D7B5F' : ref.score >= 80 ? '#E8C547' : '#DC2626';
                    return (
                      <span key={ref.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${c}15`, color: c, border: `1px solid ${c}40` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
                        {ref.name} {ref.score}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Health Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full border-4 flex items-center justify-center" style={{ borderColor: `${gciColor}40` }}>
                    <span className="text-2xl font-bold font-heading" style={{ color: gciColor }}>{kpis.global_compliance_index}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950">Global Compliance Index</h4>
                  <p className="text-[10px] text-foreground-400 mt-1">ISO × Big Four pondéré</p>
                </div>
                <div className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full border-4 flex items-center justify-center" style={{ borderColor: '#86BC2520' }}>
                    <span className="text-2xl font-bold font-heading text-emerald-600">{kpis.controls_effective}/{kpis.controls_tested}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950">Contrôles Efficaces</h4>
                  <p className="text-[10px] text-foreground-400 mt-1">{Math.round((kpis.controls_effective / kpis.total_controls) * 100)}% de couverture</p>
                </div>
                <div className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full border-4 flex items-center justify-center" style={{ borderColor: '#DC262620' }}>
                    <span className="text-2xl font-bold font-heading text-red-600">{kpis.critical_actions}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950">Actions Critiques</h4>
                  <p className="text-[10px] text-foreground-400 mt-1">À traiter sous 7 jours</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== ISO STANDARDS ===== */}
      {activeTab === 'iso' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                {ISO_STANDARDS.length} Normes ISO — Audit Complet
              </h2>
              <p className="text-foreground-600">Score moyen ISO : {isoAvg}/100 · {kpis.iso_standards_certified} certifiées · {ISO_STANDARDS.filter(s => s.status === 'compliant').length} conformes</p>
            </div>
            <div className="space-y-4">
              {ISO_STANDARDS.map(iso => {
                const isExpanded = expandedISO === iso.standard;
                const badge = isoStatusBadge(iso.status);
                const sc = formatScoreColor(iso.score);
                return (
                  <div key={iso.standard} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedISO(isExpanded ? null : iso.standard)} className="w-full p-5 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}15` }}>
                        <span className="text-lg font-bold font-heading" style={{ color: sc }}>{iso.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-bold text-foreground-950">{iso.standard}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{iso.version}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>{badge.label}</span>
                        </div>
                        <p className="text-xs text-foreground-500">{iso.name}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {[
                            { label: 'Clauses Vérifiées', value: `${iso.clauses_verified}/${iso.clauses_total}` },
                            { label: 'Gaps Critiques', value: String(iso.gaps_critical), color: '#DC2626' },
                            { label: 'Gaps Majeurs', value: String(iso.gaps_major), color: '#EA580C' },
                            { label: 'Gaps Mineurs', value: String(iso.gaps_minor), color: '#E8C547' },
                          ].map(stat => (
                            <div key={stat.label} className="rounded-lg bg-background-50 border border-background-100 p-3 text-center">
                              <span className="block text-lg font-bold text-foreground-950">{stat.value}</span>
                              <span className="text-[10px] text-foreground-500">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-foreground-500">
                          <span><i className="ri-calendar-line mr-1" />Dernier audit : {iso.last_audit}</span>
                          <span><i className="ri-calendar-event-line mr-1" />Prochain : {iso.next_audit}</span>
                          <span><i className="ri-file-text-line mr-1" />Preuves : {iso.evidence_count}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== BIG FOUR DIMENSIONS ===== */}
      {activeTab === 'bigfour' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                {BIG_FOUR_DIMENSIONS.length} Dimensions Big Four
              </h2>
              <p className="text-foreground-600">Score moyen Big Four : {bfAvg}/100 · {kpis.bigfour_exceeds} dépassées · Cible 95/100</p>
            </div>
            <div className="space-y-4">
              {BIG_FOUR_DIMENSIONS.map(bf => {
                const isExpanded = expandedBF === bf.dimension;
                const badge = bigfourStatusBadge(bf.status);
                const sc = formatScoreColor(bf.score);
                return (
                  <div key={bf.dimension} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedBF(isExpanded ? null : bf.dimension)} className="w-full p-5 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}15` }}>
                        <span className="text-lg font-bold font-heading" style={{ color: sc }}>{bf.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-bold text-foreground-950">{bf.dimension}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>{badge.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">
                            {bf.score >= bf.target ? `+${bf.score - bf.target}` : `${bf.gap} pts`}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500">{bf.firm_reference}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {[
                            { label: 'Contrôles Testés', value: String(bf.controls_tested) },
                            { label: 'Contrôles OK', value: String(bf.controls_passed) },
                            { label: 'Findings', value: String(bf.findings), color: bf.findings > 0 ? '#DC2626' : '#86BC25' },
                            { label: 'Cible', value: `${bf.target}/100`, color: '#6366F1' },
                          ].map(stat => (
                            <div key={stat.label} className="rounded-lg bg-background-50 border border-background-100 p-3 text-center">
                              <span className="block text-lg font-bold" style={{ color: stat.color || '#1A1A2E' }}>{stat.value}</span>
                              <span className="text-[10px] text-foreground-500">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden">
                          <div className="h-full rounded-full flex" style={{ width: `${(bf.score / 100) * 100}%`, backgroundColor: sc }}>
                            <div className="h-full rounded-full" style={{ width: `${(bf.controls_passed / bf.controls_tested) * 100}%`, backgroundColor: '#86BC25' }} />
                          </div>
                        </div>
                        <div className="flex justify-between text-[9px] text-foreground-400 mt-1">
                          <span>0</span>
                          <span className="font-bold" style={{ color: sc }}>{bf.score}</span>
                          <span className="font-bold text-indigo-500">{bf.target}</span>
                          <span>100</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== REGULATORY SCANNER ===== */}
      {activeTab === 'regulatory' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">
                  Scanner Réglementaire — {scannerData?.totalReferentiels || 15} Référentiels
                </h2>
                <p className="text-foreground-600 text-sm">
                  Score {scannerData?.scoreConformiteGlobal || 94}/100 · {scannerData?.totalTextes || 121} textes · Dernier scan : {scannerData?.dernierScanComplet || '—'} · Prochain : {scannerData?.prochainScan || '—'}
                </p>
              </div>
              {scannerLive && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />LIVE SCANNER
                </span>
              )}
            </div>

            {/* Coverage Map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {(liveCoverage || []).map(cov => {
                const c = cov.coverage >= 95 ? '#86BC25' : cov.coverage >= 90 ? '#0D7B5F' : cov.coverage >= 80 ? '#E8C547' : '#DC2626';
                return (
                  <div key={cov.domain} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-foreground-800">{cov.domain}</span>
                      <span className="text-xs font-bold" style={{ color: c }}>{cov.coverage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-2">
                      <div className="h-full rounded-full" style={{ width: `${cov.coverage}%`, backgroundColor: c }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-foreground-400">
                      <span>{cov.textes} textes</span>
                      <span>{cov.gaps > 0 ? `${cov.gaps} gaps` : '0 gap'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alerts */}
            <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-error-warning-line text-amber-500" />
                Alertes Actives ({liveAlerts.length})
              </h3>
              <div className="space-y-2">
                {liveAlerts.map(alert => {
                  const sevColor = alert.severite === 'haute' ? '#DC2626' : alert.severite === 'moyenne' ? '#EA580C' : alert.severite === 'basse' ? '#E8C547' : '#6366F1';
                  return (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: `${sevColor}08`, border: `1px solid ${sevColor}20` }}>
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: sevColor }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-xs font-bold text-foreground-800">{alert.referentiel}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: sevColor }}>
                            {alert.severite.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-600">{alert.message}</p>
                        <p className="text-[10px] text-foreground-400 mt-1">{alert.action}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
              {[
                { label: 'Score Global', value: `${liveKPIs.globalScore}/100`, color: '#86BC25' },
                { label: 'Textes Couverts', value: liveKPIs.textesCouverts, color: '#059669' },
                { label: 'Gaps Critiques', value: String(liveKPIs.gapsCritiques), color: '#DC2626' },
                { label: 'Référentiels OK', value: liveKPIs.referentielsConformes, color: '#0D7B5F' },
                { label: 'Alertes', value: String(liveKPIs.alertesActives), color: '#EA580C' },
                { label: 'Tps Réponse', value: liveKPIs.tempsReponseMoyen, color: '#6366F1' },
                { label: 'Edge Functions', value: String(liveKPIs.edgeFunctions.length), color: '#8B5CF6' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTROLS ===== */}
      {activeTab === 'controls' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Matrices de Contrôle — {cqKpis.total_automates || 48} Automates
              </h2>
              <p className="text-foreground-600">
                Compliance & Quality MAX : {cqKpis.total_deployed || 0} déployés · {cqKpis.total_partial || 0} partiels · {cqKpis.total_critical || 0} critiques
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { label: 'Déployés', value: String(cqKpis.total_deployed || 0), color: '#059669' },
                { label: 'Partiels', value: String(cqKpis.total_partial || 0), color: '#E8C547' },
                { label: 'Critiques', value: String(cqKpis.total_critical || 0), color: '#DC2626' },
                { label: 'Auto', value: String(cqKpis.total_auto || 0), color: '#0EA5E9' },
                { label: 'Tâches', value: cqKpis.regulatory_tasks ? `${(cqKpis.regulatory_tasks + (cqKpis.quality_tasks || 0) >= 1000000 ? ((cqKpis.regulatory_tasks + (cqKpis.quality_tasks || 0)) / 1000000).toFixed(1) + 'M' : (cqKpis.regulatory_tasks + (cqKpis.quality_tasks || 0) >= 1000 ? ((cqKpis.regulatory_tasks + (cqKpis.quality_tasks || 0)) / 1000).toFixed(1) + 'K' : String(cqKpis.regulatory_tasks + (cqKpis.quality_tasks || 0))))}` : '—', color: '#BE123C' },
                { label: 'Audits', value: String(cqKpis.total_audits || 0), color: '#8B5CF6' },
                { label: 'Juridictions', value: String(cqKpis.jurisdictions_covered || 0), color: '#EA580C' },
                { label: 'GCI', value: String(cqKpis.global_compliance_index || 0), color: '#86BC25' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* ISO Controls Summary */}
            <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-table-line text-emerald-600" />
                Matrices Contrôle ISO — Résumé des 4 Matrices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'ISO 9001/27001/31000', controls: 45, tested: 42, effective: 38, gaps: 4, rate: 90.5 },
                  { label: 'LCB-FT & Protection Données', controls: 38, tested: 35, effective: 32, gaps: 3, rate: 91.4 },
                  { label: 'Qualité Livrables & Formation', controls: 32, tested: 30, effective: 27, gaps: 3, rate: 90.0 },
                  { label: 'Reporting Réglementaire', controls: 28, tested: 26, effective: 25, gaps: 1, rate: 96.2 },
                ].map(m => (
                  <div key={m.label} className="rounded-xl bg-background-50 border border-background-100 p-4">
                    <h4 className="text-xs font-bold text-foreground-800 mb-3">{m.label}</h4>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground-500">Efficacité</span>
                      <span className="font-bold text-emerald-600">{m.rate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden mb-3">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${m.rate}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <span className="text-foreground-500">Testés: {m.tested}</span>
                      <span className="text-emerald-600 font-bold">OK: {m.effective}</span>
                      <span className="text-foreground-500">Total: {m.controls}</span>
                      <span className="text-red-500 font-bold">Gaps: {m.gaps}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ACTIONS ===== */}
      {activeTab === 'actions' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Actions Correctives — ISO + Big Four
              </h2>
              <p className="text-foreground-600">
                {kpis.open_actions} actions ouvertes · {kpis.critical_actions} critiques · Deadline max 90 jours
              </p>
            </div>

            <div className="space-y-4">
              {[
                { id: 'ACT-001', title: 'Déploiement CSP + Headers Sécurité ISO 27001', standard: 'ISO 27001 A.12.6.1', priority: 'critical', deadline: 'J+7', effort: '4h', impact: '+5 pts', status: 'in_progress' },
                { id: 'ACT-002', title: 'Mise en Conformité IFRS 9 ECL Documentation', standard: 'IFRS 9 / Big Four', priority: 'critical', deadline: 'J+45', effort: '40h', impact: '+7 pts', status: 'pending' },
                { id: 'ACT-003', title: 'Déploiement PCA Test Semestriel ISO 22301', standard: 'ISO 22301 / COBAC R-5', priority: 'critical', deadline: 'J+30', effort: '24h', impact: '+6 pts', status: 'pending' },
                { id: 'ACT-004', title: 'Correction Écarts Contrôle Interne COBAC R-1', standard: 'COBAC R-1', priority: 'high', deadline: 'J+30', effort: '32h', impact: '+3 pts', status: 'in_progress' },
                { id: 'ACT-005', title: 'Scan OWASP Top 10 Complet', standard: 'ISO 27001 / OWASP', priority: 'high', deadline: 'J+21', effort: '12h', impact: '+4 pts', status: 'pending' },
                { id: 'ACT-006', title: 'Formation Conformité 100% Collaborateurs', standard: 'COBAC R-1', priority: 'high', deadline: 'J+60', effort: '16h', impact: '+2 pts', status: 'in_progress' },
                { id: 'ACT-007', title: 'Audit Interne ISO 9001 — 4 Processus Restants', standard: 'ISO 9001 §9.2', priority: 'medium', deadline: 'J+90', effort: '48h', impact: '+3 pts', status: 'pending' },
                { id: 'ACT-008', title: 'Mise à jour Registre Traitements DPO', standard: 'RGPD/UEMOA', priority: 'high', deadline: 'J+14', effort: '8h', impact: '+2 pts', status: 'pending' },
              ].map(action => {
                const priColor = action.priority === 'critical' ? '#DC2626' : action.priority === 'high' ? '#EA580C' : '#E8C547';
                const statusLabel = action.status === 'in_progress' ? 'En Cours' : 'À Faire';
                return (
                  <div key={action.id} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${priColor}15` }}>
                          <i className={`${action.priority === 'critical' ? 'ri-error-warning-line' : action.priority === 'high' ? 'ri-alert-line' : 'ri-information-line'} text-lg`} style={{ color: priColor }} />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${priColor}15`, color: priColor, border: `1px solid ${priColor}40` }}>
                          {action.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950 mb-1">{action.title}</h4>
                        <p className="text-xs text-foreground-500 mb-2">{action.standard}</p>
                        <div className="flex flex-wrap gap-3 text-[10px]">
                          <span className="text-foreground-400"><i className="ri-calendar-line mr-1" />{action.deadline}</span>
                          <span className="text-foreground-400"><i className="ri-timer-line mr-1" />{action.effort}</span>
                          <span className="text-emerald-600 font-bold"><i className="ri-arrow-up-circle-line mr-1" />{action.impact}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap ${action.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Cross-Links */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Conformité & Qualité KOS</h2>
            <p className="text-foreground-600">Accès direct aux modules connectés du contrôle conformité et qualité totale.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total Control', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-scales-3-line', color: '#86BC25', current: true },
              { label: 'Compliance MAX', path: '/kos-compliance-quality-max', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#0D7B5F' },
              { label: 'Regulatory Engine', path: '/kos-regulatory-compliance-engine', icon: 'ri-book-2-line', color: '#D97757' },
              { label: 'Audit Conformité', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#C2410C' },
              { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-star-line', color: '#8B5CF6' },
              { label: 'Quality Excellence', path: '/kos-quality-excellence-command', icon: 'ri-star-line', color: '#F59E0B' },
              { label: 'Revue Qualité', path: '/revue-conformite-qualite', icon: 'ri-award-line', color: '#CA8A04' },
              { label: 'Risk & Diligence', path: '/kos-risk-diligence-command', icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Enterprise Governance', path: '/kos-enterprise-governance-command', icon: 'ri-government-line', color: '#9B7B2C' },
              { label: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line', color: '#BE123C' },
              { label: 'Managing Partner', path: '/kos-managing-partner-office', icon: 'ri-user-star-line', color: '#EC4899' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-3 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
                {link.current && <span className="block text-[8px] text-emerald-700 font-bold mt-0.5">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}