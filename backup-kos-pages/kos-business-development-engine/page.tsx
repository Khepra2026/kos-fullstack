import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useBusinessDevelopment } from '@/hooks/useBusinessDevelopment';

type BDTab = 'pipeline' | 'sources' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

export default function businessDevelopmentPage() {
  const { stages, sources, agents, globalMetrics: m, loading, error, refetch } = useBusinessDevelopment();
  const [activeTab, setActiveTab] = useState<BDTab>('pipeline');
  const tabs = [
    { id: 'pipeline' as BDTab, label: 'Pipeline', icon: 'ri-funds-line', count: stages.length, color: 'primary' as const },
    { id: 'sources' as BDTab, label: 'Sources', icon: 'ri-global-line', count: sources.length, color: 'accent' as const },
    { id: 'agents' as BDTab, label: 'Agents BD', icon: 'ri-rocket-2-line', count: agents.length, color: 'secondary' as const },
    { id: 'kpis' as BDTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 10, color: 'secondary' as const },
  ];

  if (loading) return <hubLayout hubId={77} activeTab="pipeline" tabLabel="Business Development"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Business Development...</span></div></div></hubLayout>;
  if (error && stages.length === 0) return <hubLayout hubId={77} activeTab="pipeline" tabLabel="Business Development"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={77} activeTab={activeTab} tabLabel="Business Development">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 11 — Master Plan</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Phase 4 — Industrialisation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Business Development Engine&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Machine commerciale autonome : prospection automatisée, qualification intelligente, nurturing séquencé, relances automatiques. Pipeline 3.77 Md FCFA structuré avec scoring prédictif, conversion tracking et revenue forecasting.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Pipeline Total</p><span className="text-xl font-bold text-foreground-950">{m.pipeline_total} Md</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Leads/Mois</p><span className="text-xl font-bold text-foreground-950">{m.leads_mensuels}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Conversion</p><span className="text-xl font-bold text-foreground-950">{m.taux_conversion_global}%</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Deals Actifs</p><span className="text-xl font-bold text-foreground-950">{m.deals_actifs}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Cycle Moyen</p><span className="text-xl font-bold text-foreground-950">{m.duree_cycle_moyen}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">CAC</p><span className="text-xl font-bold text-foreground-950">{m.cout_acquisition} €</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'pipeline' && (
          <div className="space-y-3">
            {stages.map(s => (
              <div key={s.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${s.icon} text-base`}></i></div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950">{s.nom}</h4>
                      <p className="text-[10px] text-foreground-500">{s.deals_count} deals · {s.duree_moyenne}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right"><p className="text-sm font-bold text-foreground-950">{s.valeur} Md FCFA</p><p className="text-[10px] text-foreground-500">Valeur</p></div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-semibold ${s.conversion_rate >= 60 ? 'text-emerald-600' : 'text-amber-600'}`}>{s.conversion_rate}%</span>
                      <CircularGauge value={Math.round(s.conversion_rate)} size={36} strokeWidth={3} color={s.conversion_rate >= 60 ? 'primary' : 'accent'} />
                    </div>
                  </div>
                </div>
                <div className="mt-2 bg-background-200/40 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 transition-all duration-700" style={{ width: `${s.conversion_rate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map(s => (
              <div key={s.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${s.icon} text-base`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{s.nom}</h4><p className="text-[10px] text-foreground-500">{s.leads_mois} leads/mois</p></div></div>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{s.qualifiés}</p><p className="text-[9px] text-foreground-500">Qualifiés</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{s.conversion}%</p><p className="text-[9px] text-foreground-500">Conversion</p></div></div>
                <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-background-200/50"><i className={`ri-arrow-up-line text-emerald-500 text-xs ${s.tendance < 0 ? 'rotate-180 text-red-500' : ''}`}></i><span className="text-[10px] text-emerald-600">+{s.tendance}% ce mois</span></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-lg`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.nom}</h4><span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${a.statut === 'Actif' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-primary-100 text-primary-700 border-primary-200'}`}>{a.statut}</span></div></div>
                <p className="text-xs text-foreground-600 mb-3">{a.mission}</p>
                <p className="text-[10px] text-foreground-500 bg-background-100 p-2 rounded mb-2"><strong>Séquence :</strong> {a.sequence}</p>
                <div className="grid grid-cols-3 gap-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-foreground-950">{a.leads_generees.toLocaleString('fr-FR')}</p><p className="text-[9px] text-foreground-500">Leads</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-foreground-950">{a.deals_convertis}</p><p className="text-[9px] text-foreground-500">Deals</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-foreground-950">{a.revenu_genere} Md</p><p className="text-[9px] text-foreground-500">Revenu</p></div></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Pipeline Total', v: `${m.pipeline_total} Md FCFA`, c: '5 Md FCFA' }, { n: 'Leads Mensuels', v: m.leads_mensuels, c: '1 200' }, { n: 'Taux Conversion Global', v: `${m.taux_conversion_global}%`, c: '12%' }, { n: 'Deals Actifs', v: m.deals_actifs, c: '300' }, { n: 'Cycle Moyen', v: m.duree_cycle_moyen, c: '21j' }, { n: 'Taux Qualification', v: `${m.taux_qualification}%`, c: '70%' }, { n: 'Coût Acquisition', v: `${m.cout_acquisition} €`, c: '< 0.01 €' }, { n: 'Séquences Actives', v: m.sequences_nurturing_actives, c: '12' }, { n: 'Relances Automatisées', v: m.relances_automatisees.toLocaleString('fr-FR'), c: '6 000' }, { n: 'Revenu Mensuel', v: `${m.revenu_mensuel} Md FCFA`, c: '0.6 Md' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-rocket-2-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">Business Development Engine&trade; — Industrialisation Commerciale</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.pipeline_total} Md</strong> pipeline</span><span><strong>{m.leads_mensuels}</strong> leads/mois</span><span><strong>{agents.length}</strong> agents BD</span><span><strong>{m.taux_conversion_global}%</strong> conversion</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





