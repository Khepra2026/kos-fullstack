import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useSEOBigFour } from '@/hooks/useSEOBigFour';

type SEOTab = 'clusters' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = { 'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[variant] || 'bg-background-200 text-foreground-700 border-background-200'}`}>{label}</span>;
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k`; return v.toLocaleString('fr-FR'); }

export default function KOSSEOBigFourPage() {
  const { clusters, agents, globalMetrics: m, loading, error, refetch } = useSEOBigFour();
  const [activeTab, setActiveTab] = useState<SEOTab>('clusters');
  const tabs = [
    { id: 'clusters' as SEOTab, label: 'Clusters', icon: 'ri-folder-chart-line', count: clusters.length, color: 'primary' as const },
    { id: 'agents' as SEOTab, label: 'Agents SEO', icon: 'ri-search-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as SEOTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 10, color: 'secondary' as const },
  ];

  if (loading) return <KOSHubLayout hubId={72} activeTab="clusters" tabLabel="SEO Big Four"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement SEO Big Four...</span></div></div></KOSHubLayout>;
  if (error && clusters.length === 0) return <KOSHubLayout hubId={72} activeTab="clusters" tabLabel="SEO Big Four"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></KOSHubLayout>;

  return (
    <KOSHubLayout hubId={72} activeTab={activeTab} tabLabel="SEO Big Four">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 04 — Master Plan</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 2 — Acquisition</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">SEO Big Four&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Domination organique en 10 clusters thématiques : BCEAO, UEMOA, OHADA, Microfinance, Banque, ESG, Fiscalité, Gouvernance, Contrôle Interne, LCB-FT. 847 mots-clés Top 10, DR 62, 68 500 visites/mois.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Mots-clés Top 10</p><span className="text-xl font-bold text-foreground-950">{m.total_mots_cles_top10}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Top 3</p><span className="text-xl font-bold text-foreground-950">{m.total_mots_cles_top3}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Domain Rating</p><span className="text-xl font-bold text-foreground-950">{m.domain_rating}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Trafic/mois</p><span className="text-xl font-bold text-foreground-950">{formatNumber(m.trafic_organique_mensuel)}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Backlinks</p><span className="text-xl font-bold text-foreground-950">{formatNumber(m.backlinks_actifs)}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">CWV Score</p><span className="text-xl font-bold text-foreground-950">{m.core_web_vitals_score}%</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'clusters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clusters.map(c => (
              <div key={c.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${c.icon} text-base`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{c.nom}</h4><p className="text-[10px] text-foreground-500">{formatNumber(c.trafic_mensuel)} visites/mois</p></div></div>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{c.mots_cles_top_10}</p><p className="text-[9px] text-foreground-500">Top 10</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{c.mots_cles_top_3}</p><p className="text-[9px] text-foreground-500">Top 3</p></div></div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-200/50"><span className="text-[10px] text-foreground-500">{c.pages_indexees} pages</span><div className="flex items-center gap-1.5"><span className="text-[10px] text-emerald-600">+{c.tendance}</span><CircularGauge value={c.score_seo} size={32} strokeWidth={3} color={c.score_seo >= 90 ? 'primary' : 'accent'} /></div></div>
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
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.kw_positionnes}</p><p className="text-[9px] text-foreground-500">KW positionnés</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.score_optimisation}%</p><p className="text-[9px] text-foreground-500">Score Opti</p></div></div>
                <div className="flex flex-wrap gap-1">{a.clusters_geres.map((c, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{c}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Mots-clés Top 10', v: m.total_mots_cles_top10, c: '1,000' }, { n: 'Mots-clés Top 3', v: m.total_mots_cles_top3, c: '350' }, { n: 'Domain Rating', v: m.domain_rating, c: '75' }, { n: 'Trafic Organique/Mois', v: formatNumber(m.trafic_organique_mensuel), c: '150,000' }, { n: 'Pages Indexées', v: m.pages_indexees, c: '800' }, { n: 'Backlinks Actifs', v: formatNumber(m.backlinks_actifs), c: '2,500' }, { n: 'CWV Score', v: `${m.core_web_vitals_score}%`, c: '100%' }, { n: 'Clusters Actifs', v: m.clusters_actifs, c: '10' }, { n: 'Articles/Mois', v: m.articles_publies_mois, c: '60' }, { n: 'Score Global', v: `${m.score_seo_global}%`, c: '95%' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-search-eye-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">SEO Big Four&trade; — Domination Organique</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.total_mots_cles_top10}</strong> KW Top 10</span><span><strong>DR {m.domain_rating}</strong></span><span><strong>{formatNumber(m.trafic_organique_mensuel)}</strong> visites/mois</span><span><strong>{m.clusters_actifs}</strong> clusters</span>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}