import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useQualityRiskManagement } from '@/hooks/useQualityRiskManagement';

type QRTab = 'controls' | 'agents' | 'logs' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k`; return v.toLocaleString('fr-FR'); }

function ResultBadge({ resultat }: { resultat: string }) {
  const m: Record<string, string> = { 'Validé': 'bg-emerald-100 text-emerald-700 border-emerald-200', 'Corrigé': 'bg-amber-100 text-amber-700 border-amber-200', 'Rejeté': 'bg-red-100 text-red-700 border-red-200' };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[resultat] || 'bg-background-200 text-foreground-600'}`}>{resultat}</span>;
}

export default function qualityRiskManagementPage() {
  const { controls, agents, auditLogs, globalMetrics: m, loading, error, refetch } = useQualityRiskManagement();
  const [activeTab, setActiveTab] = useState<QRTab>('controls');
  const tabs = [
    { id: 'controls' as QRTab, label: 'Contrôles', icon: 'ri-shield-check-line', count: controls.length, color: 'primary' as const },
    { id: 'agents' as QRTab, label: 'Agents Qualité', icon: 'ri-medal-line', count: agents.length, color: 'accent' as const },
    { id: 'logs' as QRTab, label: 'Audit Logs', icon: 'ri-file-list-3-line', count: auditLogs.length, color: 'secondary' as const },
    { id: 'kpis' as QRTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 10, color: 'secondary' as const },
  ];

  if (loading) return <hubLayout hubId={78} activeTab="controls" tabLabel="Quality & Risk"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Quality &amp; Risk...</span></div></div></hubLayout>;
  if (error && controls.length === 0) return <hubLayout hubId={78} activeTab="controls" tabLabel="Quality & Risk"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={78} activeTab={activeTab} tabLabel="Quality & Risk">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 12 — Master Plan</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Phase 4 — Industrialisation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Quality &amp; Risk Management&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Système qualité exhaustif : fact-checking systématique, validation croisée multi-IA, contrôle qualité documentaire, vérification réglementaire. Zéro source inventée, 100% des références traçables, certification ISO 9001 et ISO 42001.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Sources inventées</p><span className="text-xl font-bold text-emerald-600">{m.sources_inventees}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Réf. traçables</p><span className="text-xl font-bold text-foreground-950">{m.references_tracables}%</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Qualité</p><span className="text-xl font-bold text-foreground-950">{m.score_qualite_livrables}/10</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Contrôles/mois</p><span className="text-xl font-bold text-foreground-950">{formatNumber(m.controles_mensuels)}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Hallucinations bloquées</p><span className="text-xl font-bold text-foreground-950">{m.hallucinations_bloquees_total}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Précision</p><span className="text-xl font-bold text-foreground-950">{m.precision_detection}%</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>)}
        </div>

        {activeTab === 'controls' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {controls.map(c => (
              <div key={c.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${c.icon} text-base`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{c.nom}</h4><p className="text-[10px] text-foreground-500">{formatNumber(c.controles_mois)} contrôles/mois · {c.statut}</p></div></div>
                <div className="grid grid-cols-2 gap-2 mb-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{c.anomalies_detectees}</p><p className="text-[9px] text-foreground-500">Anomalies</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{c.score_conformite}%</p><p className="text-[9px] text-foreground-500">Conformité</p></div></div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-200/50"><div className="bg-background-200/40 rounded-full h-1.5 flex-1 mr-2 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${c.score_conformite}%` }}></div></div><span className="text-[10px] text-emerald-600 font-medium">{c.score_conformite}%</span></div>
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
                <p className="text-[10px] text-foreground-500 bg-background-100 p-2 rounded mb-2"><strong>Méthodologie :</strong> {a.methodologie}</p>
                <div className="grid grid-cols-3 gap-2"><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-foreground-950">{formatNumber(a.verifications_mois)}</p><p className="text-[9px] text-foreground-500">Vérifs/mois</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-foreground-950">{formatNumber(a.sources_validees)}</p><p className="text-[9px] text-foreground-500">Sources</p></div><div className="bg-background-100 rounded p-2 text-center"><p className="text-base font-bold text-emerald-600">{a.hallucinations_bloquees}</p><p className="text-[9px] text-foreground-500">Bloquées</p></div></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="grid grid-cols-1 gap-3">
            {auditLogs.map(l => (
              <div key={l.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <ResultBadge resultat={l.resultat} />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-foreground-950 truncate">{l.action}</h4>
                    <p className="text-[10px] text-foreground-500">{l.agent} · {l.details} · {l.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ n: 'Sources Inventées', v: m.sources_inventees, c: '0' }, { n: 'Références Traçables', v: `${m.references_tracables}%`, c: '100%' }, { n: 'Score Qualité Livrables', v: `${m.score_qualite_livrables}/10`, c: '9.8/10' }, { n: 'Contrôles Mensuels', v: formatNumber(m.controles_mensuels), c: '75 000' }, { n: 'Hallucinations Bloquées', v: m.hallucinations_bloquees_total, c: '0' }, { n: 'Agents Qualité', v: m.agents_qualite_actifs, c: '4' }, { n: 'Modèles IA Validation', v: m.modeles_ia_validation, c: '4' }, { n: 'Délai Vérification', v: m.delai_verification_moyen, c: '< 2s' }, { n: 'Précision Détection', v: `${m.precision_detection}%`, c: '99.9%' }, { n: 'Faux Positifs', v: `${m.faux_positifs}%`, c: '0%' }].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-bar-chart-2-line text-sm"></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4><p className="text-[10px] text-foreground-500">Cible : {k.c}</p></div></div><span className="text-xl font-bold text-foreground-950">{k.v}</span></div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-shield-check-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">Quality &amp; Risk Management&trade; — Zéro Hallucination Big Four</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.sources_inventees}</strong> sources inventées</span><span><strong>{m.references_tracables}%</strong> références traçables</span><span><strong>{m.precision_detection}%</strong> précision</span><span><strong>{m.certifications}</strong></span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





