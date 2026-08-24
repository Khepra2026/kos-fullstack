import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useDigitalAuthority } from '@/hooks/useDigitalAuthority';
import type { CentreExcellence } from '@/mocks/digitalAuthorityEngine';

type AuthorityTab = 'dashboard' | 'bceao' | 'ohada' | 'gouvernance' | 'fintech' | 'sfd' | 'backlinks' | 'citations' | 'partenariats' | 'kpis';

function CircularGauge({ value, size = 40, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-[10px] font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    Publié: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En révision': 'bg-purple-100 text-purple-700 border-purple-200',
    'En développement': 'bg-amber-100 text-amber-700 border-amber-200',
    Déployé: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En déploiement': 'bg-accent-100 text-accent-700 border-accent-200',
    'En conception': 'bg-amber-100 text-amber-700 border-amber-200',
    Actif: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Perdu: 'bg-red-100 text-red-700 border-red-200',
    'En attente': 'bg-amber-100 text-amber-700 border-amber-200',
    Signé: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En négociation': 'bg-accent-100 text-accent-700 border-accent-200',
    Renouvellement: 'bg-primary-100 text-primary-700 border-primary-200',
    'Très haute': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Haute: 'bg-accent-100 text-accent-700 border-accent-200',
    Moyenne: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    gouvernement: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    education: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    organisation: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    regulateur: 'bg-amber-100 text-amber-700 border-amber-200',
    media: 'bg-purple-100 text-purple-700 border-purple-200',
    Article: 'bg-primary-100 text-primary-700 border-primary-200',
    Thèse: 'bg-accent-100 text-accent-700 border-accent-200',
    Mémoire: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Working Paper': 'bg-amber-100 text-amber-700 border-amber-200',
    Rapport: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    MoU: 'bg-primary-100 text-primary-700 border-primary-200',
    Consortium: 'bg-accent-100 text-accent-700 border-accent-200',
    Alliance: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Accréditation: 'bg-amber-100 text-amber-700 border-amber-200',
    Panel: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    Collaboration: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toLocaleString('fr-FR');
}

export default function digitalAuthorityEnginePage() {
  const { centres, backlinks, citations, partenariats, kpis, isLive, loading, error, refetch } = useDigitalAuthority();

  const tabs = [
    { id: 'dashboard' as AuthorityTab, label: 'Dashboard', subtitle: 'Vue d\'ensemble', icon: 'ri-dashboard-line', color: 'primary' as const },
    { id: 'bceao' as AuthorityTab, label: 'BCEAO', subtitle: 'Centre d\'Excellence', icon: 'ri-bank-line', color: 'primary' as const },
    { id: 'ohada' as AuthorityTab, label: 'OHADA', subtitle: 'Centre d\'Excellence', icon: 'ri-scales-3-line', color: 'accent' as const },
    { id: 'gouvernance' as AuthorityTab, label: 'Gouvernance', subtitle: 'Centre d\'Excellence', icon: 'ri-government-line', color: 'secondary' as const },
    { id: 'fintech' as AuthorityTab, label: 'FinTech', subtitle: 'Centre d\'Excellence', icon: 'ri-smartphone-line', color: 'primary' as const },
    { id: 'sfd' as AuthorityTab, label: 'SFD', subtitle: 'Centre d\'Excellence', icon: 'ri-hand-heart-line', color: 'accent' as const },
    { id: 'backlinks' as AuthorityTab, label: 'Backlinks', subtitle: 'Institutionnels', icon: 'ri-link', color: 'secondary' as const },
    { id: 'citations' as AuthorityTab, label: 'Citations', subtitle: 'Académiques', icon: 'ri-double-quotes-l', color: 'primary' as const },
    { id: 'partenariats' as AuthorityTab, label: 'Partenariats', subtitle: 'Stratégiques', icon: 'ri-shake-hands-line', color: 'accent' as const },
    { id: 'kpis' as AuthorityTab, label: 'KPIs', subtitle: 'Performance', icon: 'ri-bar-chart-2-line', color: 'secondary' as const },
  ];

  const [activeTab, setActiveTab] = useState<AuthorityTab>('dashboard');

  function getCentreForTab(tab: AuthorityTab): CentreExcellence | undefined {
    const map: Record<string, string> = { bceao: 'coe-bceao', ohada: 'coe-ohada', gouvernance: 'coe-gouvernance', fintech: 'coe-fintech', sfd: 'coe-sfd' };
    return centres.find(c => c.id === map[tab]);
  }

  if (loading) {
    return (
      <hubLayout hubId={81} activeTab="dashboard" tabLabel="Digital Authority">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement du Digital Authority Engine...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && centres.length === 0) {
    return (
      <hubLayout hubId={81} activeTab="dashboard" tabLabel="Digital Authority">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button>
          </div>
        </div>
      </hubLayout>
    );
  }

  const centreTab = ['bceao', 'ohada', 'gouvernance', 'fintech', 'sfd'].includes(activeTab);
  const centre = centreTab ? getCentreForTab(activeTab) : undefined;

  return (
    <hubLayout hubId={81} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Master Prompt 6 — Big Four</span>
            {isLive ? (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>DONNÉES LIVE
              </span>
            ) : (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK — 5 Centres · 16 Réf. · 9 Méth. · 6 FW</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Digital Authority Engine&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Moteur d'autorité numérique institutionnelle niveau Big Four. 5 Centres d'Excellence — BCEAO, OHADA, Gouvernance, FinTech, SFD — produisant <strong>16 référentiels</strong>, <strong>9 méthodologies</strong> et <strong>6 frameworks propriétaires</strong>. <strong>{formatNumber(kpis.total_backlinks_institutionnels)} backlinks</strong> institutionnels, <strong>{formatNumber(kpis.total_citations_academiques)} citations</strong> académiques, <strong>{kpis.total_partenariats} partenariats</strong> stratégiques.
          </p>
        </div>

        {/* ============================================ */}
        {/* DASHBOARD */}
        {/* ============================================ */}
        {activeTab === 'dashboard' && (
          <>
            {/* Global KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Centres d'Excellence</p>
                <span className="text-xl font-bold text-foreground-950">{kpis.total_centres_excellence}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-shield-check-line text-xs"></i>Actifs</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Référentiels</p>
                <span className="text-xl font-bold text-foreground-950">{kpis.total_referentiels}</span>
                <div className="flex items-center gap-1 text-xs text-foreground-600">{formatNumber(kpis.total_telechargements_cumules)} téléchargements</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Frameworks Propriétaires</p>
                <span className="text-xl font-bold text-foreground-950">{kpis.total_frameworks_proprietaires}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-lightbulb-line text-xs"></i>Déployés</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Backlinks Institutionnels</p>
                <span className="text-xl font-bold text-foreground-950">{formatNumber(kpis.total_backlinks_institutionnels)}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600">{kpis.croissance_backlinks}</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Citations Académiques</p>
                <span className="text-xl font-bold text-foreground-950">{formatNumber(kpis.total_citations_academiques)}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600">{kpis.croissance_citations}</div>
              </div>
            </div>

            {/* Score Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={kpis.score_autorite_numerique} size={42} color="primary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Autorité Numérique</p><p className="text-sm font-bold text-foreground-950">{kpis.score_autorite_numerique}/100</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={kpis.score_autorite_institutionnelle} size={42} color="accent" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Autorité Institutionnelle</p><p className="text-sm font-bold text-foreground-950">{kpis.score_autorite_institutionnelle}/100</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={kpis.score_confiance_numerique} size={42} color="secondary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Confiance Numérique</p><p className="text-sm font-bold text-foreground-950">{kpis.score_confiance_numerique}/100</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={kpis.indice_visibilite_institutionnelle} size={42} color="primary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Visibilité Institutionnelle</p><p className="text-sm font-bold text-foreground-950">{kpis.indice_visibilite_institutionnelle}/100</p></div>
              </div>
            </div>

            {/* 5 Centres Overview */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-building-4-line"></i>Centres d'Excellence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {centres.map(c => (
                <div key={c.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group" onClick={() => {
                  const tabMap: Record<string, AuthorityTab> = {
                    'coe-bceao': 'bceao', 'coe-ohada': 'ohada', 'coe-gouvernance': 'gouvernance', 'coe-fintech': 'fintech', 'coe-sfd': 'sfd',
                  };
                  setActiveTab(tabMap[c.id]);
                }}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : c.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                    <i className={`${c.icon} text-lg`}></i>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-1">{c.acronyme}</h4>
                  <p className="text-[11px] text-foreground-600 line-clamp-2 mb-3">{c.description.split('.')[0]}.</p>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-foreground-500">
                    <span>{c.stats.total_publications} publications</span>
                    <span>{formatNumber(c.stats.total_telechargements)} tél.</span>
                    <span>{c.stats.total_citations} citations</span>
                    <span>{c.stats.couverture_reglementaire}% couverture</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-background-200/50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-foreground-950">Score {c.stats.score_autorite}/100</span>
                    <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats — Backlinks & Citations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-link text-secondary-600"></i>Backlinks Institutionnels</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">.gov</span><span className="font-bold text-foreground-950">{kpis.backlinks_gouvernement}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">.edu</span><span className="font-bold text-foreground-950">{kpis.backlinks_education}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">Régulateurs</span><span className="font-bold text-foreground-950">{kpis.backlinks_regulateur}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">Organisations</span><span className="font-bold text-foreground-950">{kpis.backlinks_organisation}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">DA Moyen</span><span className="font-bold text-foreground-950">{kpis.domain_authority_moyen}</span></div>
                  <div className="flex justify-between text-xs border-t border-background-200/50 pt-2"><span className="text-foreground-500">Dofollow</span><span className="font-bold text-emerald-600">{kpis.backlinks_dofollow}</span></div>
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-double-quotes-l text-primary-600"></i>Citations Académiques</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">Google Scholar</span><span className="font-bold text-foreground-950">{formatNumber(kpis.citations_google_scholar)}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">ResearchGate</span><span className="font-bold text-foreground-950">{kpis.citations_researchgate}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">Thèses</span><span className="font-bold text-foreground-950">{kpis.citations_these}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">Working Papers</span><span className="font-bold text-foreground-950">{kpis.citations_working_paper}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">H-Index</span><span className="font-bold text-foreground-950">{kpis.h_index_institutionnel}</span></div>
                  <div className="flex justify-between text-xs border-t border-background-200/50 pt-2"><span className="text-foreground-500">Partenariats Actifs</span><span className="font-bold text-emerald-600">{kpis.partenariats_actifs}</span></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* CENTRE EXCELLENCE (BCEAO, OHADA, GOUV, FINTECH, SFD) */}
        {/* ============================================ */}
        {centreTab && centre && (
          <div className="space-y-6">
            {/* Centre Header */}
            <div className={`rounded-lg p-5 border ${centre.couleur === 'accent' ? 'bg-accent-50/30 border-accent-200/40' : centre.couleur === 'secondary' ? 'bg-secondary-50/30 border-secondary-200/40' : 'bg-primary-50/30 border-primary-200/40'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${centre.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : centre.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${centre.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground-950">{centre.nom}</h2>
                  <p className="text-xs text-foreground-500">{centre.acronyme} — {centre.stats.couverture_reglementaire}% couverture réglementaire</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed">{centre.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-center">
                <div className="bg-background-50 rounded-lg p-2"><span className="text-lg font-bold text-foreground-950">{centre.stats.total_publications}</span><p className="text-[9px] text-foreground-500">Publications</p></div>
                <div className="bg-background-50 rounded-lg p-2"><span className="text-lg font-bold text-foreground-950">{formatNumber(centre.stats.total_telechargements)}</span><p className="text-[9px] text-foreground-500">Téléchargements</p></div>
                <div className="bg-background-50 rounded-lg p-2"><span className="text-lg font-bold text-foreground-950">{centre.stats.total_citations}</span><p className="text-[9px] text-foreground-500">Citations</p></div>
                <div className="bg-background-50 rounded-lg p-2"><span className="text-lg font-bold text-foreground-950">{centre.stats.couverture_reglementaire}%</span><p className="text-[9px] text-foreground-500">Couverture</p></div>
                <div className="bg-background-50 rounded-lg p-2"><span className="text-lg font-bold text-foreground-950">{centre.stats.score_autorite}/100</span><p className="text-[9px] text-foreground-500">Score Autorité</p></div>
              </div>
            </div>

            {/* Référentiels */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-book-open-line"></i>Référentiels — {centre.referentiels.length}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {centre.referentiels.map(ref => (
                  <div key={ref.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{ref.version}</span>
                      <Badge label={ref.statut} variant={ref.statut} />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{ref.nom}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed line-clamp-2 mb-3">{ref.description}</p>
                    <div className="grid grid-cols-4 gap-2 text-[10px] text-foreground-500">
                      <span><strong className="text-foreground-700">{ref.pages}</strong> pages</span>
                      <span><strong className="text-foreground-700">{formatNumber(ref.telechargements)}</strong> tél.</span>
                      <span><strong className="text-foreground-700">{ref.citations}</strong> citations</span>
                      <span className="text-accent-600 font-bold">★ {ref.score_qualite}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Méthodologies */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Méthodologies — {centre.methodologies.length}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {centre.methodologies.map(meth => (
                  <div key={meth.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{meth.etapes} étapes</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${meth.score_maturite >= 9.5 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : meth.score_maturite >= 9 ? 'bg-primary-100 text-primary-700 border-primary-200' : 'bg-secondary-100 text-secondary-700 border-secondary-200'}`}>Score {meth.score_maturite}/10</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{meth.nom}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed line-clamp-2 mb-2">{meth.description}</p>
                    <p className="text-[11px] text-foreground-500 mb-2"><strong>Application :</strong> {meth.application}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {meth.outils.map((o, i) => (
                        <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{o}</span>
                      ))}
                    </div>
                    <div className="text-[10px] text-foreground-500">
                      <strong className="text-foreground-700">Cas d'usage :</strong>
                      {meth.cas_usage.map((c, i) => <span key={i} className="ml-1 text-foreground-600">"{c}"{i < meth.cas_usage.length - 1 ? ',' : ''}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks Propriétaires */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-lightbulb-line"></i>Frameworks Propriétaires — {centre.frameworks.length}</h3>
              <div className="grid grid-cols-1 gap-3">
                {centre.frameworks.map(fw => (
                  <div key={fw.id} className={`rounded-lg p-5 border ${fw.statut === 'Déployé' ? 'bg-emerald-50/10 border-emerald-200/40' : fw.statut === 'En déploiement' ? 'bg-accent-50/10 border-accent-200/40' : 'bg-background-50 border-background-200/60'}`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{fw.acronyme}</span>
                          <Badge label={fw.statut} variant={fw.statut} />
                          <span className="text-[10px] text-foreground-500">{fw.adoption} organisations</span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{fw.nom}</h4>
                        <p className="text-xs text-foreground-600 leading-relaxed mb-3">{fw.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {fw.composants.map((comp, i) => (
                            <span key={i} className="text-[10px] bg-background-200/70 text-foreground-700 px-2 py-0.5 rounded-full">{comp}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <CircularGauge value={fw.score_innovation * 10} size={48} strokeWidth={4} color={centre.couleur} />
                        <span className="text-[9px] text-foreground-500">Innovation</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* BACKLINKS INSTITUTIONNELS */}
        {/* ============================================ */}
        {activeTab === 'backlinks' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.backlinks_gouvernement}</span><p className="text-[9px] text-foreground-500">.gov</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.backlinks_education}</span><p className="text-[9px] text-foreground-500">.edu</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.backlinks_regulateur}</span><p className="text-[9px] text-foreground-500">Régulateurs</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.backlinks_organisation}</span><p className="text-[9px] text-foreground-500">Organisations</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">DA {kpis.domain_authority_moyen}</span><p className="text-[9px] text-foreground-500">DA Moyen</p></div>
            </div>
            {backlinks.map(bl => (
              <div key={bl.id} className={`bg-background-50 border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${bl.statut === 'Perdu' ? 'border-red-200/70 bg-red-50/20' : 'border-background-200/60'}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bl.domain_authority >= 90 ? 'bg-emerald-100 text-emerald-700' : bl.domain_authority >= 75 ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'}`}>
                    <span className="text-[10px] font-bold">DA{bl.domain_authority}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground-950 leading-tight">{bl.source}</p>
                    <p className="text-[10px] text-foreground-500 font-mono truncate">{bl.domaine}</p>
                    <p className="text-[11px] text-foreground-600 mt-0.5"><strong>Anchor :</strong> "{bl.anchor_text}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <Badge label={bl.type} variant={bl.type} />
                  <Badge label={bl.statut} variant={bl.statut} />
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${bl.dofollow ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-background-200 text-foreground-500 border-background-200'}`}>
                    {bl.dofollow ? 'dofollow' : 'nofollow'}
                  </span>
                  <span className="text-[10px] text-foreground-500">{bl.date_detection}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* CITATIONS ACADÉMIQUES */}
        {/* ============================================ */}
        {activeTab === 'citations' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{formatNumber(kpis.citations_google_scholar)}</span><p className="text-[9px] text-foreground-500">Google Scholar</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.citations_researchgate}</span><p className="text-[9px] text-foreground-500">ResearchGate</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.citations_these}</span><p className="text-[9px] text-foreground-500">Thèses</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.citations_working_paper}</span><p className="text-[9px] text-foreground-500">Working Papers</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">H-{kpis.h_index_institutionnel}</span><p className="text-[9px] text-foreground-500">H-Index</p></div>
            </div>
            {citations.map(cit => (
              <div key={cit.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge label={cit.type} variant={cit.type} />
                    <Badge label={cit.domaine} variant={cit.domaine} />
                    <span className="text-[10px] text-foreground-500">{cit.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{cit.titre}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{cit.auteurs} — <strong>{cit.publication}</strong></p>
                  <p className="text-[10px] text-foreground-500 mt-0.5">{cit.institution}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-accent-600 font-bold"><i className="ri-double-quotes-l text-sm"></i>{cit.citations_count}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* PARTENARIATS */}
        {/* ============================================ */}
        {activeTab === 'partenariats' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.partenariats_actifs}</span><p className="text-[9px] text-foreground-500">Actifs</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.partenariats_negociation}</span><p className="text-[9px] text-foreground-500">En négociation</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.partenariats_mou}</span><p className="text-[9px] text-foreground-500">MoUs</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{kpis.valeur_strategique_moyenne}</span><p className="text-[9px] text-foreground-500">Score Moyen</p></div>
            </div>
            {partenariats.map(p => (
              <div key={p.id} className={`bg-background-50 border rounded-lg p-4 ${p.statut === 'Actif' ? 'border-emerald-200/40 bg-emerald-50/5' : p.statut === 'En négociation' ? 'border-accent-200/40 bg-accent-50/5' : 'border-background-200/60'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${p.valeur_strategique >= 90 ? 'bg-emerald-100 text-emerald-700' : p.valeur_strategique >= 80 ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'}`}>
                      <i className={p.type === 'MoU' ? 'ri-file-text-line' : p.type === 'Consortium' ? 'ri-group-line' : p.type === 'Alliance' ? 'ri-link' : p.type === 'Accréditation' ? 'ri-shield-check-line' : p.type === 'Panel' ? 'ri-list-check' : 'ri-shake-hands-line'}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-foreground-950">{p.organisation}</h4>
                        <Badge label={p.type} variant={p.type} />
                        <Badge label={p.statut} variant={p.statut} />
                      </div>
                      <p className="text-xs text-foreground-600 mt-0.5">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <CircularGauge value={p.valeur_strategique} size={36} strokeWidth={3} color="primary" />
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-2 pt-2 border-t border-background-200/50">
                  <span className="text-[10px] text-foreground-500">{p.portee} · {p.duree} · Signé {p.date_signature}</span>
                  {p.domaines.map((d, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* KPIs */}
        {/* ============================================ */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* Authority Scores */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <CircularGauge value={kpis.score_autorite_numerique} size={60} strokeWidth={5} color="primary" />
                <p className="text-[10px] text-foreground-500 mt-2">Autorité Numérique</p>
                <p className="text-[9px] text-foreground-400">Cible {kpis.target_score_autorite}</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <CircularGauge value={kpis.score_autorite_institutionnelle} size={60} strokeWidth={5} color="accent" />
                <p className="text-[10px] text-foreground-500 mt-2">Autorité Institutionnelle</p>
                <p className="text-[9px] text-foreground-400">{kpis.total_partenariats} partenariats</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <CircularGauge value={kpis.score_confiance_numerique} size={60} strokeWidth={5} color="secondary" />
                <p className="text-[10px] text-foreground-500 mt-2">Confiance Numérique</p>
                <p className="text-[9px] text-foreground-400">{kpis.couverture_reglementaire_moyenne}% couverture</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <CircularGauge value={kpis.score_eeat_global} size={60} strokeWidth={5} color="primary" />
                <p className="text-[10px] text-foreground-500 mt-2">E-E-A-T Global</p>
                <p className="text-[9px] text-foreground-400">H-Index {kpis.h_index_institutionnel}</p>
              </div>
            </div>

            {/* Production KPIs */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Production Intellectuelle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Référentiels</span><span className="font-bold text-foreground-950">{kpis.total_referentiels}/{kpis.target_referentiels}</span></div><div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${(kpis.total_referentiels / kpis.target_referentiels) * 100}%` }}></div></div></div>
                <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Méthodologies</span><span className="font-bold text-foreground-950">{kpis.total_methodologies}/{kpis.target_methodologies}</span></div><div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${(kpis.total_methodologies / kpis.target_methodologies) * 100}%` }}></div></div></div>
                <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Frameworks</span><span className="font-bold text-foreground-950">{kpis.total_frameworks_proprietaires}/{kpis.target_frameworks}</span></div><div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: `${(kpis.total_frameworks_proprietaires / kpis.target_frameworks) * 100}%` }}></div></div></div>
                <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Téléchargements</span><span className="font-bold text-foreground-950">{formatNumber(kpis.total_telechargements_cumules)}</span></div><p className="text-[9px] text-foreground-500 mt-0.5">Cumulés</p></div>
              </div>
            </div>

            {/* Backlinks & Citations KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Backlinks vs Cible</h3>
                <div className="space-y-3">
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Total Backlinks</span><span className="font-bold text-foreground-950">{kpis.total_backlinks_institutionnels}/{kpis.target_backlinks}</span></div><div className="w-full h-2 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${(kpis.total_backlinks_institutionnels / kpis.target_backlinks) * 100}%` }}></div></div></div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-foreground-600">
                    <span>.gov : <strong className="text-foreground-950">{kpis.backlinks_gouvernement}</strong></span>
                    <span>.edu : <strong className="text-foreground-950">{kpis.backlinks_education}</strong></span>
                    <span>DA : <strong className="text-foreground-950">{kpis.domain_authority_moyen}</strong></span>
                  </div>
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Citations vs Cible</h3>
                <div className="space-y-3">
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Total Citations</span><span className="font-bold text-foreground-950">{kpis.total_citations_academiques}/{kpis.target_citations}</span></div><div className="w-full h-2 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${(kpis.total_citations_academiques / kpis.target_citations) * 100}%` }}></div></div></div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-foreground-600">
                    <span>Scholar : <strong className="text-foreground-950">{formatNumber(kpis.citations_google_scholar)}</strong></span>
                    <span>H-Index : <strong className="text-foreground-950">{kpis.h_index_institutionnel}</strong></span>
                    <span>Croissance : <strong className="text-emerald-600">{kpis.croissance_citations}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Centres Breakdown */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Performance par Centre d'Excellence</h3>
              <div className="space-y-3">
                {centres.map(c => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : c.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                      <i className={`${c.icon} text-sm`}></i>
                    </div>
                    <span className="text-xs font-medium text-foreground-800 w-20 whitespace-nowrap">{c.acronyme}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.couleur === 'accent' ? 'bg-accent-500' : c.couleur === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500'}`} style={{ width: `${c.stats.score_autorite}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-foreground-950 w-8 text-right">{c.stats.score_autorite}</span>
                    </div>
                    <span className="text-[10px] text-foreground-500 w-24 text-right">{c.stats.total_publications} pub · {formatNumber(c.stats.total_telechargements)} tél.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher — Bottom */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
              }`}>
                <i className={`${t.icon} text-sm`}></i><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-globe-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Digital Authority Engine&trade; — 5 Centres d'Excellence · Niveau Big Four</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span><strong>{kpis.total_referentiels}</strong> référentiels</span>
            <span><strong>{kpis.total_methodologies}</strong> méthodologies</span>
            <span><strong>{kpis.total_frameworks_proprietaires}</strong> frameworks</span>
            <span><strong>{formatNumber(kpis.total_backlinks_institutionnels)}</strong> backlinks</span>
            <span><strong>{kpis.total_partenariats}</strong> partenariats</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





