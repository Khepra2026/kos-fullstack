import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useRegulatoryExcellence } from '@/hooks/useRegulatoryExcellence';

type RegTab = 'domains' | 'agents' | 'alerts' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k`; return v.toLocaleString('fr-FR'); }

function PriorityBadge({ priorite }: { priorite: string }) {
  const m: Record<string, string> = { 'Critique': 'bg-red-100 text-red-700 border-red-200', 'Haute': 'bg-amber-100 text-amber-700 border-amber-200', 'Moyenne': 'bg-primary-100 text-primary-700 border-primary-200' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[priorite] || 'bg-background-200 text-foreground-600'}`}>{priorite}</span>;
}

export default function regulatoryExcellencePage() {
  const { domains, agents, alerts, globalMetrics: m, loading, error, refetch } = useRegulatoryExcellence();
  const [activeTab, setActiveTab] = useState<RegTab>('domains');
  const tabs = [
    { id: 'domains' as RegTab, label: 'Domaines', icon: 'ri-scales-3-line', count: domains.length, color: 'primary' as const },
    { id: 'agents' as RegTab, label: 'Agents', icon: 'ri-shield-check-line', count: agents.length, color: 'accent' as const },
    { id: 'alerts' as RegTab, label: 'Alertes', icon: 'ri-notification-3-line', count: alerts.length, color: 'secondary' as const },
    { id: 'kpis' as RegTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 10, color: 'secondary' as const },
  ];

  if (loading) return <hubLayout hubId={76} activeTab="domains" tabLabel="Regulatory Excellence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Regulatory Excellence...</span></div></div></hubLayout>;
  if (error && domains.length === 0) return <hubLayout hubId={76} activeTab="domains" tabLabel="Regulatory Excellence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={76} activeTab={activeTab} tabLabel="Regulatory Excellence">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 08 — Master Plan</span>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Phase 3 — Autorité</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Regulatory Excellence&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Cinq agents spécialisés en veille et analyse réglementaire : Conformité, Droit Bancaire, Fiscalité, LCB-FT, Jurisprudence. Veille quotidienne, alertes automatiques, notes d'impact. Contentieux. Couverture complète BCEAO, UEMOA, OHADA, COBAC, GAFI, OCDE.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Textes surveillés</p><span className="text-xl font-bold text-foreground-950">{formatNumber(m.total_textes_surveilles)}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Alertes/mois</p><span className="text-xl font-bold text-foreground-950">{m.total_alertes_mois}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Analyses/mois</p><span className="text-xl font-bold text-foreground-950">{m.total_analyses_mois}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Juridictions</p><span className="text-xl font-bold text-foreground-950">{m.juridictions_couvertes}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Agents actifs</p><span className="text-xl font-bold text-foreground-950">{m.agents_actifs}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score conformité</p><span className="text-xl font-bold text-foreground-950">{m.score_conformite_global}%</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'domains' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map(d => (
              <div key={d.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${d.icon} text-base`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{d.nom}</h4><p className="text-[10px] text-foreground-500">{d.juridictions.join(' · ')}</p></div></div>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{formatNumber(d.textes_surveilles)}</p><p className="text-[9px] text-foreground-500">Textes</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{d.alertes_mois}</p><p className="text-[9px] text-foreground-500">Alertes/mois</p></div></div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-200/50"><span className="text-[10px] text-foreground-500">{d.analyses_mois} analyses/mois</span><CircularGauge value={d.score_conformite} size={32} strokeWidth={3} color={d.score_conformite >= 95 ? 'primary' : 'accent'} /></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-lg`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.nom}</h4><span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${a.statut === 'Actif' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-primary-100 text-primary-700 border-primary-200'}`}>{a.statut}</span></div></div>
                <p className="text-xs text-foreground-600 mb-3">{a.mission}</p>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{formatNumber(a.textes_traites)}</p><p className="text-[9px] text-foreground-500">Textes traités</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.alertes_generees}</p><p className="text-[9px] text-foreground-500">Alertes</p></div></div>
                <div className="flex flex-wrap gap-1">{a.domaines.map((d, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{d}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 gap-3">
            {alerts.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <PriorityBadge priorite={a.priorite} />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-foreground-950 truncate">{a.titre}</h4>
                    <p className="text-[10px] text-foreground-500">{a.source} · {a.impact} · {a.date}</p>
                  </div>
                </div>
                <span className="text-[10px] text-foreground-500 bg-background-100 px-2 py-1 rounded-full whitespace-nowrap">{a.domaine}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Textes Surveillés', v: formatNumber(m.total_textes_surveilles), c: '25 000' }, { n: 'Alertes/Mois', v: m.total_alertes_mois, c: '500' }, { n: 'Analyses/Mois', v: m.total_analyses_mois, c: '900' }, { n: 'Juridictions Couvertes', v: m.juridictions_couvertes, c: '10' }, { n: 'Agents Actifs', v: m.agents_actifs, c: '5' }, { n: 'Score Conformité', v: `${m.score_conformite_global}%`, c: '100%' }, { n: 'Alertes Temps Réel', v: `${m.alertes_temps_reel}%`, c: '100%' }, { n: 'Précision Analyses', v: `${m.precision_analyses}%`, c: '98%' }, { n: 'Délai Alerte Moyen', v: m.delai_alerte_moyen, c: '< 1h' }, { n: 'Notes Impact/Mois', v: m.notes_impact_mois, c: '60' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-scales-3-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">Regulatory Excellence&trade; — Veille Réglementaire Big Four</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{formatNumber(m.total_textes_surveilles)}+</strong> textes</span><span><strong>{m.juridictions_couvertes}</strong> juridictions</span><span><strong>{m.agents_actifs}</strong> agents</span><span><strong>{m.score_conformite_global}%</strong> conformité</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



