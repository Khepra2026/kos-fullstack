import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useExpertNetwork } from '@/hooks/useExpertNetwork';

type ExpTab = 'experts' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = { 'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200', 'Mobilisable': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'Disponible': 'bg-amber-100 text-amber-700 border-amber-200', 'En mission': 'bg-primary-100 text-primary-700 border-primary-200', 'En évaluation': 'bg-background-200 text-foreground-600 border-background-300' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[variant] || 'bg-background-200 text-foreground-700 border-background-200'}`}>{label}</span>;
}

export default function KOSExpertNetworkPage() {
  const { experts, agents, globalMetrics: m, loading, error, refetch } = useExpertNetwork();
  const [activeTab, setActiveTab] = useState<ExpTab>('experts');
  const tabs = [
    { id: 'experts' as ExpTab, label: 'Experts', icon: 'ri-user-star-line', count: experts.length, color: 'primary' as const },
    { id: 'agents' as ExpTab, label: 'Agents', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as ExpTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 9, color: 'secondary' as const },
  ];

  if (loading) return <KOSHubLayout hubId={75} activeTab="experts" tabLabel="Expert Network"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Expert Network...</span></div></div></KOSHubLayout>;
  if (error && experts.length === 0) return <KOSHubLayout hubId={75} activeTab="experts" tabLabel="Expert Network"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></KOSHubLayout>;

  return (
    <KOSHubLayout hubId={75} activeTab={activeTab} tabLabel="Expert Network">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 07 — Master Plan</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 2 — Acquisition</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Expert Network&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Vivier permanent d'experts panafricains qualifiés : juristes, économistes, fiscalistes, banquiers, experts ESG, actuaires. 428 experts qualifiés, 38 mobilisables en moins de 48h, 17 pays couverts.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Experts Qualifiés</p><span className="text-xl font-bold text-foreground-950">{m.total_experts_qualifies}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Mobilisables</p><span className="text-xl font-bold text-foreground-950">{m.experts_mobilisables}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Délai</p><span className="text-xl font-bold text-foreground-950">{m.delai_mobilisation_heures}h</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Pays</p><span className="text-xl font-bold text-foreground-950">{m.couverture_pays}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Spécialités</p><span className="text-xl font-bold text-foreground-950">{m.couverture_specialites}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Nouveaux/mois</p><span className="text-xl font-bold text-foreground-950">{m.nouveaux_experts_mois}</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'experts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map(e => (
              <div key={e.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-primary-200/60 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1"><div className="flex items-center gap-2 mb-1"><div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-bold text-xs">{e.nom.charAt(0)}</div><div><h4 className="text-sm font-semibold text-foreground-950">{e.nom}</h4></div></div><p className="text-xs text-foreground-600 mt-1">{e.specialite}</p></div>
                  <CircularGauge value={e.score_qualification} size={36} strokeWidth={3} color={e.score_qualification >= 90 ? 'primary' : 'accent'} />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50 flex-wrap">
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{e.pays}</span>
                  <span className="flex items-center gap-1"><i className="ri-timer-line"></i>{e.experience_annees} ans</span>
                  <span className="flex items-center gap-1 ml-auto"><i className="ri-briefcase-line"></i>{e.missions_realisees} missions</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge label={e.statut} variant={e.statut} />
                  {e.langues.map(l => <span key={l} className="text-[9px] bg-background-200/70 text-foreground-500 px-1.5 py-0.5 rounded-full">{l}</span>)}
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
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.experts_recrutes}</p><p className="text-[9px] text-foreground-500">Experts recrutés</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.score_matching}%</p><p className="text-[9px] text-foreground-500">Score Matching</p></div></div>
                <div className="flex flex-wrap gap-1">{a.specialites_couvertes.map((s, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Experts Qualifiés', v: m.total_experts_qualifies, c: '500' }, { n: 'Experts Mobilisables', v: m.experts_mobilisables, c: '50' }, { n: 'Délai Mobilisation', v: `${m.delai_mobilisation_heures}h`, c: '24h' }, { n: 'Couverture Pays', v: m.couverture_pays, c: '25' }, { n: 'Spécialités Couvertes', v: m.couverture_specialites, c: '15' }, { n: 'Missions Actives', v: m.missions_actives, c: '25' }, { n: 'Nouveaux/Mois', v: m.nouveaux_experts_mois, c: '35' }, { n: 'Score Qualification', v: `${m.score_qualification_moyen}%`, c: '92%' }, { n: 'Score Global', v: `${m.score_global}%`, c: '90%' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-user-search-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">Expert Network&trade; — Réseau Panafricain d'Experts</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.total_experts_qualifies}</strong> experts</span><span><strong>{m.experts_mobilisables}</strong> mobilisables</span><span><strong>{m.delai_mobilisation_heures}h</strong> délai</span><span><strong>{m.couverture_pays}</strong> pays</span>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}