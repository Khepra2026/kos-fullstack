import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useAOAMI } from '@/hooks/useAOAMI';

type AOTab = 'opportunites' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const safeValue = Number.isFinite(value) ? value : 0;
  const offset = circumference - (Math.min(safeValue, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{safeValue}</span></div>;
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = { 'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200', 'Qualifié': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'En cours': 'bg-amber-100 text-amber-700 border-amber-200', 'Soumis': 'bg-primary-100 text-primary-700 border-primary-200', 'En veille': 'bg-background-200 text-foreground-600 border-background-300', 'Haute': 'bg-red-100 text-red-700 border-red-200', 'Moyenne': 'bg-amber-100 text-amber-700 border-amber-200', 'Basse': 'bg-background-200 text-foreground-600 border-background-300' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[variant] || 'bg-background-200 text-foreground-700 border-background-200'}`}>{label}</span>;
}

function formatFCFA(v: number): string { if (v >= 1000000000) return `${(v / 1000000000).toFixed(1)} Md`; if (v >= 1000000) return `${(v / 1000000).toFixed(0)} M`; return v.toLocaleString('fr-FR'); }

export default function aOAMIPage() {
  const { opportunites, agents, globalMetrics: m, loading, error, refetch } = useAOAMI();
  const [activeTab, setActiveTab] = useState<AOTab>('opportunites');
  const tabs = [
    { id: 'opportunites' as AOTab, label: 'AO/AMI', icon: 'ri-file-search-line', count: opportunites.length, color: 'primary' as const },
    { id: 'agents' as AOTab, label: 'Agents AO', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as AOTab, label: 'KPIs', icon: 'ri-radar-line', count: 9, color: 'secondary' as const },
  ];

  if (loading) return <hubLayout hubId={73} activeTab="opportunites" tabLabel="AO/AMI Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement AO/AMI Intelligence...</span></div></div></hubLayout>;
  if (error && opportunites.length === 0) return <hubLayout hubId={73} activeTab="opportunites" tabLabel="AO/AMI Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={73} activeTab={activeTab} tabLabel="AO/AMI Intelligence">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 05 — Master Plan</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 2 — Acquisition</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">AO / AMI Intelligence&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Veille permanente AO/AMI : ONU, BAD, Banque Mondiale, UE, États, Agences de développement. 547 opportunités qualifiées/an, 18.5 Md FCFA de pipeline, 3 agents autonomes de détection à soumission.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Opportunités/an</p><span className="text-xl font-bold text-foreground-950">{m.total_opportunites_an}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Qualifiées</p><span className="text-xl font-bold text-foreground-950">{m.opportunites_qualifiees}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Pipeline</p><span className="text-xl font-bold text-foreground-950">{formatFCFA(m.pipeline_total_fcfa)}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Taux réponse</p><span className="text-xl font-bold text-foreground-950">{m.taux_reponse}%</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Délai alerte</p><span className="text-xl font-bold text-foreground-950">{m.delai_alerte_heures}h</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">En cours</p><span className="text-xl font-bold text-foreground-950">{m.soumissions_en_cours}</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'opportunites' && (
          <div className="space-y-3">
            {opportunites.map(ao => (
              <div key={ao.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-accent-200/60 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1"><div className="flex items-center gap-2 mb-1"><Badge label={ao.statut} variant={ao.statut} /><Badge label={ao.priorite} variant={ao.priorite} /></div><h4 className="text-sm font-semibold text-foreground-950">{ao.titre}</h4></div>
                  <CircularGauge value={ao.score_qualification} size={36} strokeWidth={3} color={ao.score_qualification >= 90 ? 'primary' : 'accent'} />
                </div>
                <div className="flex items-center gap-3 flex-wrap text-[10px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-building-2-line"></i>{ao.source}</span>
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{ao.pays}</span>
                  <span className="flex items-center gap-1"><i className="ri-funds-line"></i>{formatFCFA(ao.budget_fcfa)}</span>
                  <span className="flex items-center gap-1 ml-auto"><i className="ri-calendar-line"></i>Limite : {ao.date_limite}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-lg`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.nom}</h4><Badge label={a.statut} variant={a.statut} /></div></div>
                <p className="text-xs text-foreground-600 mb-3">{a.mission}</p>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.opportunites_detectees}</p><p className="text-[9px] text-foreground-500">AO détectées</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.score_qualification}%</p><p className="text-[9px] text-foreground-500">Score Qualif</p></div></div>
                <div className="flex flex-wrap gap-1">{a.sources_surveillees.map((s, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Opportunités/an', v: m.total_opportunites_an, c: '500' }, { n: 'Opportunités Qualifiées', v: m.opportunites_qualifiees, c: '500' }, { n: 'Pipeline Total', v: formatFCFA(m.pipeline_total_fcfa), c: '25 Md' }, { n: 'Taux de Réponse', v: `${m.taux_reponse}%`, c: '85%' }, { n: 'Délai Alerte', v: `${m.delai_alerte_heures}h`, c: '1h' }, { n: 'Taux Conversion', v: `${m.taux_conversion}%`, c: '35%' }, { n: 'Sources Actives', v: m.sources_actives, c: '12' }, { n: 'Soumissions en Cours', v: m.soumissions_en_cours, c: '25' }, { n: 'Score Global', v: `${m.score_global}%`, c: '95%' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-file-search-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">AO / AMI Intelligence&trade; — Industrialisation des Opportunités</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.total_opportunites_an}</strong> AO/an</span><span><strong>{formatFCFA(m.pipeline_total_fcfa)}</strong> pipeline</span><span><strong>{m.taux_reponse}%</strong> réponse</span><span><strong>{m.sources_actives}</strong> sources</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





