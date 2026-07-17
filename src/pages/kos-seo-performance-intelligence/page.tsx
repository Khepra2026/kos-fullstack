import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useSeoPerformanceIntelligence } from '@/hooks/useSeoPerformanceIntelligence';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : color === 'emerald' ? 'stroke-emerald-500' : color === 'amber' ? 'stroke-amber-500' : color === 'red' ? 'stroke-red-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function StatPill({ label, value, target, color = 'primary' }: { label: string; value: string | number; target?: string; color?: string }) {
  const c = color === 'accent' ? 'bg-accent-100 border-accent-200 text-accent-900' : color === 'secondary' ? 'bg-secondary-100 border-secondary-200 text-secondary-900' : color === 'emerald' ? 'bg-emerald-100 border-emerald-200 text-emerald-900' : color === 'amber' ? 'bg-amber-100 border-amber-200 text-amber-900' : color === 'red' ? 'bg-red-100 border-red-200 text-red-900' : 'bg-primary-100 border-primary-200 text-primary-900';
  return (
    <div className={`rounded-lg border p-3 flex flex-col gap-0.5 ${c}`}>
      <span className="text-[10px] uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-lg font-bold">{value}</span>
      {target && <span className="text-[9px] opacity-60">Cible: {target}</span>}
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const m: Record<string, { cls: string; icon: string; label: string }> = {
    'conforme': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-check-line', label: 'Conforme' },
    'surveillance': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-error-warning-line', label: 'Surveillance' },
    'critique': { cls: 'bg-red-100 text-red-700 border-red-200', icon: 'ri-close-circle-line', label: 'Critique' },
    'a_faire': { cls: 'bg-background-200 text-foreground-600 border-background-200', icon: 'ri-time-line', label: 'À faire' },
    'en_cours': { cls: 'bg-primary-100 text-primary-700 border-primary-200', icon: 'ri-loader-4-line', label: 'En cours' },
    'termine': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-check-double-line', label: 'Terminé' },
  };
  const s = m[statut] || m['a_faire'];
  return <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${s.cls}`}><i className={`${s.icon} text-[8px]`}></i>{s.label}</span>;
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k`; return v.toLocaleString('fr-FR'); }
function formatFCFA(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)} M FCFA`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k FCFA`; return `${v} FCFA`; }

const TABS = [
  { key: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line', color: 'primary' },
  { key: 'traffic', label: 'Trafic Organique', icon: 'ri-line-chart-line', color: 'accent' },
  { key: 'geo', label: 'Présence IA', icon: 'ri-robot-2-line', color: 'secondary' },
  { key: 'performance', label: 'Performance', icon: 'ri-speed-up-line', color: 'emerald' },
  { key: 'security', label: 'Sécurité', icon: 'ri-shield-check-line', color: 'amber' },
  { key: 'multilingual', label: 'Multilingue', icon: 'ri-global-line', color: 'primary' },
  { key: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line', color: 'red' },
  { key: 'kpis', label: 'KPIs Mensuels', icon: 'ri-bar-chart-2-line', color: 'accent' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function KOSSeoPerformanceIntelligencePage() {
  const { traffic, serpKeywords, aeoVisibility, cwvHistory, securityAudit, multilingualSeo, correctiveActions, monthlyKpis, globalMetrics: m, loading, error, refetch } = useSeoPerformanceIntelligence();
  const [activeTab, setActiveTab] = useState<TabKey>('cockpit');

  if (loading) return <KOSHubLayout hubId={99} activeTab="cockpit" tabLabel="SEO Performance Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement SEO Performance Intelligence...</span></div></div></KOSHubLayout>;

  if (error && traffic.length === 0) return <KOSHubLayout hubId={99} activeTab="cockpit" tabLabel="SEO Performance Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></KOSHubLayout>;

  const scoreColor = m.score_global >= 95 ? 'emerald' : m.score_global >= 85 ? 'primary' : m.score_global >= 70 ? 'amber' : 'red';
  const currentMonth = traffic[traffic.length - 1];
  const previousMonth = traffic[traffic.length - 2];
  const traficTrend = currentMonth && previousMonth ? ((currentMonth.sessions - previousMonth.sessions) / previousMonth.sessions * 100) : 0;

  return (
    <KOSHubLayout hubId={99} activeTab={activeTab} tabLabel="SEO Performance Intelligence">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc SEO & Performance — Big Four Audit</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Surveillance Continue</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{m.certification.split('—')[0].trim()}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">SEO Performance Intelligence&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Diagnostic unifié khepraexperts.com — Trafic organique · SERP · Présence IA (AEO/GEO) · Core Web Vitals · Sécurité ISO 27001 · SEO multilingue FR/EN/PT · {m.mots_cles_top10} mots-clés Top 10 · Score global <strong className="text-foreground-950">{m.score_global}/100</strong> · Dernier audit {m.dernier_audit}</p>
        </div>

        {/* Global Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <StatPill label="Trafic/mois" value={formatNumber(m.trafic_organique_mensuel)} target="150k" color="primary" />
          <StatPill label="Domain Rating" value={m.domain_rating} target="92" color="accent" />
          <StatPill label="Perf Mobile" value={`${m.score_performance_mobile}/100`} target="98" color="emerald" />
          <StatPill label="Score Sécu" value={`${m.score_securite}/100`} target="95" color="amber" />
          <StatPill label="Score GEO" value={`${m.score_geo}/100`} target="78" color="secondary" />
          <StatPill label="Score Global" value={`${m.score_global}/100`} target="95" color={scoreColor} />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {TABS.map(t => {
            const c = t.color === 'accent' ? 'accent' : t.color === 'secondary' ? 'secondary' : t.color === 'emerald' ? 'emerald' : t.color === 'amber' ? 'amber' : t.color === 'red' ? 'red' : 'primary';
            const activeCls = `bg-${c === 'emerald' ? 'emerald' : c === 'amber' ? 'amber' : c === 'red' ? 'red' : c}-500 text-background-50 border-${c === 'emerald' ? 'emerald' : c === 'amber' ? 'amber' : c === 'red' ? 'red' : c}-500`;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.key ? activeCls : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span></button>
            );
          })}
        </div>

        {/* COCKPIT TAB */}
        {activeTab === 'cockpit' && (
          <div className="space-y-6">
            {/* Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-1 bg-background-50 border border-background-200/60 rounded-lg p-5 flex flex-col items-center justify-center gap-3">
                <div className="text-center">
                  <CircularGauge value={m.score_global} size={100} strokeWidth={7} color={scoreColor} />
                  <p className="text-[10px] uppercase tracking-wider text-foreground-500 mt-2">Score Global</p>
                </div>
                <div className="text-center text-xs text-foreground-500">
                  <span className="text-emerald-600 font-semibold">+{traficTrend.toFixed(1)}%</span> trafic vs mois précédent
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Featured Snippets</p><p className="text-2xl font-bold text-foreground-950 mt-1">{m.featured_snippets}</p><p className="text-[10px] text-emerald-600">+12% ce mois</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Pages Indexées</p><p className="text-2xl font-bold text-foreground-950 mt-1">{m.pages_indexees}</p><p className="text-[10px] text-emerald-600">FR 312 · EN 78 · PT 12</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Taux Conversion</p><p className="text-2xl font-bold text-foreground-950 mt-1">{currentMonth?.taux_conversion.toFixed(1)}%</p><p className="text-[10px] text-emerald-600">+{(currentMonth!.taux_conversion - previousMonth!.taux_conversion).toFixed(1)} pts</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Backlinks</p><p className="text-2xl font-bold text-foreground-950 mt-1">{formatNumber(m.backlinks_actifs)}</p><p className="text-[10px] text-emerald-600">{m.domaines_referents} domaines</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Temps Chargement</p><p className="text-2xl font-bold text-foreground-950 mt-1">{m.temps_chargement_moyen}s</p><p className="text-[10px] text-emerald-600">Cible &lt;1.2s</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Uptime</p><p className="text-2xl font-bold text-foreground-950 mt-1">{m.uptime_percent}%</p><p className="text-[10px] text-foreground-500">Dernier scan {m.dernier_audit}</p></div>
              </div>
            </div>

            {/* Traffic Trend Mini */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold text-foreground-950">Trafic Organique — 12 derniers mois</h3><span className="text-[10px] text-emerald-600 font-medium">+{traficTrend.toFixed(1)}% sur 12 mois</span></div>
              <div className="flex items-end gap-1 h-32">
                {traffic.map((t) => {
                  const max = Math.max(...traffic.map(x => x.sessions));
                  const h = (t.sessions / max) * 100;
                  const isLatest = t.mois === currentMonth?.mois;
                  return (
                    <div key={t.mois} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <span className="text-[8px] text-foreground-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{formatNumber(t.sessions)}</span>
                      <div className={`w-full rounded-t-md transition-all duration-300 ${isLatest ? 'bg-primary-500' : 'bg-primary-200 hover:bg-primary-300'}`} style={{ height: `${Math.max(h, 4)}%` }}></div>
                      <span className="text-[8px] text-foreground-400">{t.mois.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Alerts Summary */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-alert-line text-amber-600"></i>Résumé Exécutif — Big Four Assessment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground-600 leading-relaxed">
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong className="text-foreground-900">Trafic organique 68 500 sessions/mois</strong> — progression +60% sur 12 mois. Cible 150 000 avec stratégie multilingue.</span></div>
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong className="text-foreground-900">1 850 mots-clés Top 10</strong> — domination clusters BCEAO, OHADA, Microfinance. Gap EN/PT identifié.</span></div>
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></span><span><strong className="text-foreground-900">Performance Mobile 85/100</strong> — LCP 1.9s, cible &lt;1.2s. 3 actions P0 en cours.</span></div>
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></span><span><strong className="text-foreground-900">Sécurité 90/100</strong> — Gap ISO 27001 (65% ready). Certification ciblée juin 2027.</span></div>
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></span><span><strong className="text-foreground-900">GEO Score 68/100</strong> — Présence AI Overviews en hausse (+18%), gap ChatGPT/Perplexity.</span></div>
                <div className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></span><span><strong className="text-foreground-900">Multilingue 65/100</strong> — FR dominant (312 pages, 58.5k trafic). EN 78 pages, PT 12 pages seulement.</span></div>
              </div>
            </div>
          </div>
        )}

        {/* TRAFFIC TAB */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-background-200"><th className="text-left py-2 px-3 text-foreground-500 font-medium">Mois</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Sessions</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Pages Vues</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Rebond</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Durée Moy.</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Conversions</th><th className="text-right py-2 px-3 text-foreground-500 font-medium">Taux Conv.</th></tr></thead>
                <tbody>{traffic.map(t => (<tr key={t.mois} className="border-b border-background-100 hover:bg-background-50"><td className="py-2 px-3 font-medium text-foreground-900">{t.mois}</td><td className="py-2 px-3 text-right text-foreground-700">{formatNumber(t.sessions)}</td><td className="py-2 px-3 text-right text-foreground-700">{formatNumber(t.pages_vues)}</td><td className="py-2 px-3 text-right text-foreground-700">{t.taux_rebond}%</td><td className="py-2 px-3 text-right text-foreground-700">{Math.floor(t.duree_moyenne / 60)}m{t.duree_moyenne % 60}s</td><td className="py-2 px-3 text-right text-foreground-700">{formatNumber(t.conversions)}</td><td className="py-2 px-3 text-right font-semibold text-emerald-600">{t.taux_conversion}%</td></tr>))}</tbody>
              </table>
            </div>
            {/* SERP Top Keywords */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Top 30 Mots-Clés SERP</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-background-200"><th className="text-left py-2 px-2 text-foreground-500 font-medium">Mot-Clé</th><th className="text-center py-2 px-2 text-foreground-500 font-medium">Position</th><th className="text-center py-2 px-2 text-foreground-500 font-medium">Évolution</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Volume</th><th className="text-center py-2 px-2 text-foreground-500 font-medium">Langue</th><th className="text-center py-2 px-2 text-foreground-500 font-medium">Cluster</th><th className="text-center py-2 px-2 text-foreground-500 font-medium">Featured</th></tr></thead>
                  <tbody>{serpKeywords.map(k => (<tr key={k.id} className="border-b border-background-100 hover:bg-background-50"><td className="py-1.5 px-2 font-medium text-foreground-900 max-w-[280px] truncate">{k.mot_cle}</td><td className="py-1.5 px-2 text-center"><span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-bold ${k.position <= 3 ? 'bg-emerald-100 text-emerald-700' : k.position <= 10 ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-600'}`}>{k.position}</span></td><td className="py-1.5 px-2 text-center"><span className={k.evolution > 0 ? 'text-emerald-600' : k.evolution < 0 ? 'text-red-600' : 'text-foreground-400'}>{k.evolution > 0 ? `+${k.evolution}` : k.evolution}</span></td><td className="py-1.5 px-2 text-right text-foreground-600">{formatNumber(k.volume_mensuel)}</td><td className="py-1.5 px-2 text-center"><span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${k.langue === 'FR' ? 'bg-primary-100 text-primary-700' : k.langue === 'EN' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'}`}>{k.langue}</span></td><td className="py-1.5 px-2 text-center text-foreground-500 text-[9px]">{k.cluster}</td><td className="py-1.5 px-2 text-center">{k.featured_snippet ? <i className="ri-star-fill text-amber-500 text-xs"></i> : <span className="text-foreground-300">—</span>}</td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GEO / AEO TAB */}
        {activeTab === 'geo' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aeoVisibility.map(a => (
                <div key={a.plateforme} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-robot-2-line text-lg"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.plateforme}</h4><span className="text-[10px] text-emerald-600">+{a.tendance}% tendance</span></div></div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.visibilite}%</p><p className="text-[9px] text-foreground-500">Visibilité</p></div>
                    <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.citations}</p><p className="text-[9px] text-foreground-500">Citations</p></div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-500">
                    {a.featured_snippets > 0 && <span><strong>{a.featured_snippets}</strong> Featured Snippets</span>}
                    {a.knowledge_panels > 0 && <span><strong>{a.knowledge_panels}</strong> Knowledge Panels</span>}
                    {a.people_also_ask > 0 && <span><strong>{a.people_also_ask}</strong> PAA</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-background-200/50">
                    <span className="text-[9px] text-foreground-500">Score GEO</span>
                    <CircularGauge value={a.score_geo} size={28} strokeWidth={3} color={a.score_geo >= 60 ? 'primary' : a.score_geo >= 40 ? 'amber' : 'red'} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-secondary-100/50 rounded-lg p-4 border border-secondary-200/30">
              <div className="flex items-center gap-2 mb-2"><i className="ri-lightbulb-flash-line text-secondary-700"></i><span className="text-xs font-semibold text-secondary-900">Recommandation Big Four — AEO/GEO</span></div>
              <p className="text-xs text-secondary-700 leading-relaxed">La visibilité sur les plateformes IA croît de 18-35% par trimestre. Priorité : structurer 200 articles en format Q&A avec Schema.org FAQPage pour capter les AI Overviews (Google) et les réponses conversationnelles (ChatGPT, Perplexity). Budget estimé : 4M FCFA — ROI projeté : +120% citations IA en 6 mois.</p>
            </div>
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatPill label="LCP Actuel" value={`${m.temps_chargement_moyen}s`} target="&lt;1.2s" color="emerald" />
              <StatPill label="Perf Mobile" value={`${m.score_performance_mobile}/100`} target="98" color="primary" />
              <StatPill label="Perf Desktop" value={`${m.score_performance_desktop}/100`} target="100" color="emerald" />
              <StatPill label="Uptime" value={`${m.uptime_percent}%`} target="99.99%" color="accent" />
              <StatPill label="TTFB" value="340 ms" target="&lt;150 ms" color="amber" />
              <StatPill label="Speed Index" value="2.2s" target="&lt;1.5s" color="secondary" />
            </div>
            {/* CWV Trend */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Core Web Vitals — 12 derniers mois</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-background-200"><th className="text-left py-2 px-2 text-foreground-500 font-medium">Mois</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">LCP</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">FID</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">CLS</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">TTFB</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Mobile</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Desktop</th></tr></thead>
                  <tbody>{cwvHistory.map(c => (<tr key={c.mois} className="border-b border-background-100 hover:bg-background-50"><td className="py-1.5 px-2 font-medium text-foreground-900">{c.mois}</td><td className={`py-1.5 px-2 text-right ${c.lcp <= 2.5 ? 'text-emerald-600' : c.lcp <= 4 ? 'text-amber-600' : 'text-red-600'}`}>{c.lcp}s</td><td className={`py-1.5 px-2 text-right ${c.fid <= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>{c.fid}ms</td><td className={`py-1.5 px-2 text-right ${c.cls <= 0.1 ? 'text-emerald-600' : 'text-amber-600'}`}>{c.cls}</td><td className={`py-1.5 px-2 text-right ${c.ttfb <= 500 ? 'text-emerald-600' : 'text-amber-600'}`}>{c.ttfb}ms</td><td className="py-1.5 px-2 text-right font-semibold text-foreground-700">{c.performance_mobile}</td><td className="py-1.5 px-2 text-right font-semibold text-foreground-700">{c.performance_desktop}</td></tr>))}</tbody>
                </table>
              </div>
            </div>
            {/* Performance Progression */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Évolution Performance Mobile</h3>
              <div className="flex items-end gap-1 h-24">
                {cwvHistory.map((c) => {
                  const h = (c.performance_mobile / 100) * 100;
                  const isLatest = c.mois === cwvHistory[cwvHistory.length - 1].mois;
                  return <div key={c.mois} className="flex-1 flex flex-col items-center gap-1"><div className={`w-full rounded-t-md transition-all ${isLatest ? 'bg-emerald-500' : 'bg-emerald-200'}`} style={{ height: `${Math.max(h, 4)}%` }}></div><span className="text-[8px] text-foreground-400">{c.mois.slice(5)}</span></div>;
                })}
              </div>
              <p className="text-[10px] text-foreground-500 mt-2">Mobile : 48 → 85 en 12 mois. Cible 98 d'ici décembre 2026.</p>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatPill label="Score Global" value={`${m.score_securite}/100`} target="95" color="amber" />
              <StatPill label="ISO 27001" value={`${m.iso_27001_readiness}%`} target="95%" color="amber" />
              <StatPill label="Contrôles OK" value={`${securityAudit.filter(s => s.statut === 'conforme').length}/10`} target="10/10" color="emerald" />
              <StatPill label="En surveillance" value={`${securityAudit.filter(s => s.statut === 'surveillance').length}/10`} target="0/10" color="amber" />
              <StatPill label="Critiques" value={`${securityAudit.filter(s => s.statut === 'critique').length}/10`} target="0/10" color="emerald" />
            </div>
            <div className="space-y-3">
              {securityAudit.map(s => (
                <div key={s.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.statut === 'conforme' ? 'bg-emerald-100 text-emerald-600' : s.statut === 'surveillance' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}><i className={`text-sm ${s.statut === 'conforme' ? 'ri-check-line' : s.statut === 'surveillance' ? 'ri-error-warning-line' : 'ri-close-circle-line'}`}></i></div>
                      <div className="flex-1"><div className="flex items-center gap-2 mb-0.5"><h4 className="text-sm font-semibold text-foreground-950">{s.domaine}</h4><StatutBadge statut={s.statut} /><span className="text-[9px] text-foreground-400">ISO {s.iso_27001_controle}</span></div><p className="text-xs text-foreground-600">{s.details}</p><p className="text-xs text-primary-700 mt-1 font-medium"><i className="ri-lightbulb-flash-line text-[10px] mr-1"></i>{s.recommandation}</p></div>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0"><CircularGauge value={s.score} size={36} strokeWidth={3} color={s.statut === 'conforme' ? 'emerald' : s.statut === 'surveillance' ? 'amber' : 'red'} /><span className="text-[8px] uppercase tracking-wider text-foreground-400">{s.priorite}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MULTILINGUAL TAB */}
        {activeTab === 'multilingual' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {multilingualSeo.map(ml => (
                <div key={ml.langue} className={`bg-background-50 border rounded-lg p-5 ${ml.langue === 'FR' ? 'border-primary-200/60' : ml.langue === 'EN' ? 'border-accent-200/60' : 'border-secondary-200/60'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ml.langue === 'FR' ? 'bg-primary-100 text-primary-700' : ml.langue === 'EN' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'}`}>{ml.langue}</span><h4 className="text-sm font-semibold text-foreground-950">{ml.langue === 'FR' ? 'Français' : ml.langue === 'EN' ? 'English' : 'Português'}</h4></div>
                    <CircularGauge value={ml.score_localisation} size={32} strokeWidth={3} color={ml.score_localisation >= 80 ? 'emerald' : ml.score_localisation >= 50 ? 'amber' : 'red'} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-background-100 rounded p-3 text-center"><p className="text-xl font-bold text-foreground-950">{ml.pages_indexees}</p><p className="text-[9px] text-foreground-500">Pages</p></div>
                    <div className="bg-background-100 rounded p-3 text-center"><p className="text-xl font-bold text-foreground-950">{formatNumber(ml.trafic_mensuel)}</p><p className="text-[9px] text-foreground-500">Trafic/mois</p></div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-foreground-500">Mots-clés Top 10</span><span className="font-semibold text-foreground-900">{ml.mots_cles_top10}</span></div>
                    <div className="flex justify-between"><span className="text-foreground-500">Hreflang</span><span className={ml.hreflang_ok ? 'text-emerald-600' : 'text-red-600'}>{ml.hreflang_ok ? <i className="ri-check-line"></i> : <i className="ri-close-line"></i>} {ml.hreflang_ok ? 'OK' : 'KO'}</span></div>
                    {ml.gap_pages > 0 && <div className="flex justify-between"><span className="text-foreground-500">Gap Pages</span><span className="font-semibold text-amber-600">-{ml.gap_pages}</span></div>}
                    {ml.gap_trafic > 0 && <div className="flex justify-between"><span className="text-foreground-500">Gap Trafic</span><span className="font-semibold text-amber-600">-{formatNumber(ml.gap_trafic)}</span></div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-accent-100/50 rounded-lg p-4 border border-accent-200/30">
              <div className="flex items-center gap-2 mb-2"><i className="ri-global-line text-accent-700"></i><span className="text-xs font-semibold text-accent-900">Stratégie Multilingue Big Four</span></div>
              <p className="text-xs text-accent-700 leading-relaxed">82% du trafic est francophone. Le marché africain est multilingue — sans contenu EN (Nigeria, Ghana, Kenya : 400M+ locuteurs) et PT (Angola, Mozambique, Cap-Vert : 50M+), KOS manque 65% du marché adressable. Roadmap : 150 pages EN + 80 pages PT d'ici décembre 2026. Budget : 20M FCFA. ROI projeté : +35 000 sessions/mois.</p>
            </div>
          </div>
        )}

        {/* ACTIONS CORRECTIVES TAB */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <StatPill label="Actions P0" value={correctiveActions.filter(a => a.priorite === 'P0').length.toString()} target="" color="red" />
              <StatPill label="Actions P1" value={correctiveActions.filter(a => a.priorite === 'P1').length.toString()} target="" color="amber" />
              <StatPill label="Budget Total" value={formatFCFA(correctiveActions.reduce((sum, a) => sum + a.budget_fcfa, 0))} target="" color="primary" />
              <StatPill label="Terminées" value={correctiveActions.filter(a => a.statut === 'termine').length.toString()} target={correctiveActions.length.toString()} color="emerald" />
            </div>
            <div className="space-y-3">
              {correctiveActions.map(a => (
                <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap ${a.priorite === 'P0' ? 'bg-red-100 text-red-700' : a.priorite === 'P1' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-600'}`}>{a.priorite}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1"><span className="text-[10px] tracking-wider uppercase text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{a.axe}</span><StatutBadge statut={a.statut} /></div>
                        <h4 className="text-sm font-semibold text-foreground-950">{a.action}</h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                      <span className="text-xs font-bold text-foreground-900">{formatFCFA(a.budget_fcfa)}</span>
                      <span className="text-[9px] text-foreground-500">{a.echeance}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div><span className="text-[9px] text-foreground-500">Responsable</span><p className="text-xs font-medium text-foreground-800">{a.responsable}</p></div>
                    <div><span className="text-[9px] text-foreground-500">KPI</span><p className="text-xs font-medium text-foreground-800">{a.kpi_succes} : {a.valeur_actuelle} → {a.cible}</p></div>
                    <div><span className="text-[9px] text-foreground-500">Impact Estimé</span><p className="text-xs text-emerald-700 font-medium">{a.impact_estime}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">{a.etapes.map((e, i) => <span key={i} className="text-[10px] bg-background-100 text-foreground-600 px-2 py-1 rounded-full border border-background-200/50">{i + 1}. {e}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPIs MENSUELS TAB */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-background-200"><th className="text-left py-2 px-2 text-foreground-500 font-medium">Mois</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Sessions</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Conv.</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Perf</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Sécu</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">GEO</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">KW Top10</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Backlinks</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Articles</th><th className="text-right py-2 px-2 text-foreground-500 font-medium">Global</th><th className="text-left py-2 px-2 text-foreground-500 font-medium">Commentaire</th></tr></thead>
                <tbody>{monthlyKpis.map(k => (<tr key={k.mois} className="border-b border-background-100 hover:bg-background-50"><td className="py-1.5 px-2 font-medium text-foreground-900">{k.mois}</td><td className="py-1.5 px-2 text-right text-foreground-700">{formatNumber(k.sessions_organiques)}</td><td className="py-1.5 px-2 text-right text-foreground-700">{k.taux_conversion}%</td><td className={`py-1.5 px-2 text-right font-semibold ${k.score_performance >= 85 ? 'text-emerald-600' : k.score_performance >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{k.score_performance}</td><td className={`py-1.5 px-2 text-right font-semibold ${k.score_securite >= 90 ? 'text-emerald-600' : k.score_securite >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{k.score_securite}</td><td className={`py-1.5 px-2 text-right font-semibold ${k.score_geo >= 70 ? 'text-emerald-600' : k.score_geo >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{k.score_geo}</td><td className="py-1.5 px-2 text-right text-foreground-700">{k.mots_cles_top10}</td><td className="py-1.5 px-2 text-right text-foreground-700">{k.backlinks_acquis}</td><td className="py-1.5 px-2 text-right text-foreground-700">{k.articles_publies}</td><td className="py-1.5 px-2 text-right"><span className={`inline-flex w-8 h-6 rounded items-center justify-center text-[10px] font-bold ${k.score_global >= 90 ? 'bg-emerald-100 text-emerald-700' : k.score_global >= 80 ? 'bg-primary-100 text-primary-700' : 'bg-amber-100 text-amber-700'}`}>{k.score_global}</span></td><td className="py-1.5 px-2 text-foreground-500 max-w-[200px] truncate">{k.commentaire}</td></tr>))}</tbody>
              </table>
            </div>
            {/* KPI Evolution Chart */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Évolution Score Global — 12 mois</h3>
              <div className="flex items-end gap-1 h-32">
                {monthlyKpis.map((k) => {
                  const max = Math.max(...monthlyKpis.map(x => x.score_global));
                  const h = (k.score_global / max) * 100;
                  const isLatest = k.mois === monthlyKpis[monthlyKpis.length - 1].mois;
                  return <div key={k.mois} className="flex-1 flex flex-col items-center gap-1 group relative"><span className="text-[8px] text-foreground-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{k.score_global}</span><div className={`w-full rounded-t-md transition-all ${isLatest ? 'bg-primary-500' : 'bg-primary-200'}`} style={{ height: `${Math.max(h, 4)}%` }}></div><span className="text-[8px] text-foreground-400">{k.mois.slice(5)}</span></div>;
                })}
              </div>
              <p className="text-[10px] text-foreground-500 mt-2">Score global : 65 → 91 en 12 mois. Cible 95 en décembre 2026, 98 en juin 2027.</p>
            </div>
          </div>
        )}

        {/* Footer Summary */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-search-eye-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">SEO Performance Intelligence&trade; — Diagnostic Big Four Unifié</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{formatNumber(m.trafic_organique_mensuel)}</strong> sessions/mois</span>
            <span><strong>{m.mots_cles_top10}</strong> KW Top 10</span>
            <span><strong>DR {m.domain_rating}</strong> · DA {m.domain_authority}</span>
            <span><strong>{m.score_global}/100</strong> Score Global</span>
            <span><strong>{m.dernier_audit}</strong> dernier audit</span>
            <span><strong>{correctiveActions.length}</strong> actions correctives</span>
            <span><strong>{formatFCFA(correctiveActions.reduce((sum, a) => sum + a.budget_fcfa, 0))}</strong> budget total</span>
            <span className="text-emerald-700 font-semibold">Cible 95/100 — Décembre 2026</span>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}