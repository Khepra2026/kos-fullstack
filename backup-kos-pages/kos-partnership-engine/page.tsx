import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { usePartnershipEngine } from '@/hooks/usePartnershipEngine';

type PartTab = 'partenaires' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = { 'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200', 'En discussion': 'bg-amber-100 text-amber-700 border-amber-200', 'Prioritaire': 'bg-red-100 text-red-700 border-red-200', 'Identifié': 'bg-background-200 text-foreground-600 border-background-300' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[variant] || 'bg-background-200 text-foreground-700 border-background-200'}`}>{label}</span>;
}

function formatFCFA(v: number): string { if (v >= 1000000000) return `${(v / 1000000000).toFixed(1)} Md`; if (v >= 1000000) return `${(v / 1000000).toFixed(0)} M`; if (v === 0) return '-'; return v.toLocaleString('fr-FR'); }

function PartnerTypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = { 'Banque': 'ri-bank-line', 'Fonds': 'ri-funds-line', 'ONG': 'ri-heart-line', 'Cabinet international': 'ri-building-2-line', 'Université': 'ri-graduation-cap-line', 'Think Tank': 'ri-lightbulb-line' };
  return <i className={icons[type] || 'ri-team-line'}></i>;
}

export default function partnershipEnginePage() {
  const { partenaires, agents, globalMetrics: m, loading, error, refetch } = usePartnershipEngine();
  const [activeTab, setActiveTab] = useState<PartTab>('partenaires');
  const tabs = [
    { id: 'partenaires' as PartTab, label: 'Partenaires', icon: 'ri-hand-heart-line', count: partenaires.length, color: 'primary' as const },
    { id: 'agents' as PartTab, label: 'Agents', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as PartTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 8, color: 'secondary' as const },
  ];

  if (loading) return <hubLayout hubId={74} activeTab="partenaires" tabLabel="Partnership Engine"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Partnership Engine...</span></div></div></hubLayout>;
  if (error && partenaires.length === 0) return <hubLayout hubId={74} activeTab="partenaires" tabLabel="Partnership Engine"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={74} activeTab={activeTab} tabLabel="Partnership Engine">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 06 — Master Plan</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 2 — Acquisition</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Partnership Engine&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Cartographie et activation des partenaires stratégiques : banques, fonds, ONG, cabinets internationaux, universités, think tanks. 87 partenaires prioritaires, 12 partenariats actifs, 4.3 Md FCFA de pipeline conjoint.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Prioritaires</p><span className="text-xl font-bold text-foreground-950">{m.total_partenaires_prioritaires}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Actifs</p><span className="text-xl font-bold text-foreground-950">{m.partenaires_actifs}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">En discussion</p><span className="text-xl font-bold text-foreground-950">{m.en_discussion}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Compatibilité</p><span className="text-xl font-bold text-foreground-950">{m.score_compatibilite_moyen}%</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Missions conjointes</p><span className="text-xl font-bold text-foreground-950">{m.missions_conjointes_total}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Nouveaux/trim.</p><span className="text-xl font-bold text-foreground-950">{m.nouveaux_partenaires_trimestre}</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'partenaires' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partenaires.map(p => (
              <div key={p.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-primary-200/60 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><PartnerTypeIcon type={p.type} /></div><div><h4 className="text-sm font-semibold text-foreground-950">{p.nom}</h4></div></div>
                    <div className="flex gap-1.5 mt-1"><Badge label={p.type} /><Badge label={p.statut} variant={p.statut} /></div>
                  </div>
                  <CircularGauge value={p.score_compatibilite} size={36} strokeWidth={3} color={p.score_compatibilite >= 85 ? 'primary' : 'accent'} />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{p.pays}</span>
                  <span className="flex items-center gap-1"><i className="ri-funds-line"></i>{formatFCFA(p.valeur_pipeline_fcfa)}</span>
                  <span className="ml-auto">{p.missions_conjointes} missions</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-lg`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.nom}</h4><Badge label={a.statut} variant={a.statut} /></div></div>
                <p className="text-xs text-foreground-600 mb-3">{a.mission}</p>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.partenaires_gerees}</p><p className="text-[9px] text-foreground-500">Partenaires gérés</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.score_activation}%</p><p className="text-[9px] text-foreground-500">Score Activation</p></div></div>
                <div className="flex flex-wrap gap-1">{a.cibles_prioritaires.map((c, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{c}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Partenaires Prioritaires', v: m.total_partenaires_prioritaires, c: '100' }, { n: 'Partenariats Actifs', v: m.partenaires_actifs, c: '20' }, { n: 'En Discussion', v: m.en_discussion, c: '30' }, { n: 'Score Compatibilité', v: `${m.score_compatibilite_moyen}%`, c: '90%' }, { n: 'Missions Conjointes', v: m.missions_conjointes_total, c: '30' }, { n: 'Pipeline Conjoint', v: formatFCFA(m.pipeline_conjoint_fcfa), c: '10 Md' }, { n: 'Nouveaux/Trimestre', v: m.nouveaux_partenaires_trimestre, c: '15' }, { n: 'Score Global', v: `${m.score_global}%`, c: '90%' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-hand-heart-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">Partnership Engine&trade; — Réseau Institutionnel</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.total_partenaires_prioritaires}</strong> prioritaires</span><span><strong>{m.partenaires_actifs}</strong> actifs</span><span><strong>{formatFCFA(m.pipeline_conjoint_fcfa)}</strong> pipeline</span><span><strong>{m.score_compatibilite_moyen}%</strong> compatibilité</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





