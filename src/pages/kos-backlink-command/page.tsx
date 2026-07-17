import { useState } from 'react';
import { useBacklinkDetect } from '@/hooks/useBacklinkDetect';
import KOSHubLayout from '@/components/feature/KOSHubLayout';

export default function KOSBacklinkCommandPage() {
  const { opportunities, contentPillars, stats, quickWins, loading, error, dataSource, runDetection } = useBacklinkDetect();
  const [activeTab, setActiveTab] = useState<'opportunities' | 'pillars' | 'quickwins'>('opportunities');

  const tabs = [
    { id: 'opportunities' as const, label: 'Opportunités', icon: 'ri-link-m' },
    { id: 'pillars' as const, label: 'Contenu Linkable', icon: 'ri-file-text-line' },
    { id: 'quickwins' as const, label: 'Quick Wins', icon: 'ri-flashlight-line' },
  ];

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      regulatory_mention: 'Mention Réglementaire',
      regulatory_citation: 'Citation Réglementaire',
      institutional: 'Institutionnel',
      media: 'Média',
      media_local: 'Média Local',
      guest_post: 'Guest Post',
      social_proof: 'Preuve Sociale',
      standards: 'Normes',
      research_citation: 'Citation Recherche',
      academic: 'Académique',
      knowledge_panel: 'Knowledge Panel',
      social_authority: 'Autorité Sociale',
    };
    return map[type] || type;
  };

  const getTypeColor = (type: string) => {
    if (type.includes('regulatory')) return 'bg-primary-100 text-primary-700';
    if (type.includes('institutional') || type.includes('standards')) return 'bg-secondary-100 text-secondary-900';
    if (type.includes('media')) return 'bg-accent-100 text-accent-700';
    if (type === 'guest_post') return 'bg-accent-100 text-accent-900';
    if (type === 'academic') return 'bg-primary-100 text-primary-900';
    if (type === 'social_authority') return 'bg-secondary-100 text-secondary-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'outreach_sent') return <i className="ri-send-plane-fill text-primary-500"></i>;
    if (status === 'contacted') return <i className="ri-mail-line text-accent-500"></i>;
    if (status === 'acquired' || status === 'completed') return <i className="ri-check-double-fill text-primary-500"></i>;
    return <i className="ri-search-line text-foreground-400"></i>;
  };

  return (
    <KOSHubLayout hubId={33}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-heading">
                KOS Backlink Intelligence
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-body tracking-wide ${
                dataSource === 'supabase' ? 'bg-primary-500 text-background-50 animate-pulse' : 'bg-amber-100 text-amber-700'
              }`}>
                {dataSource === 'supabase' ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
              </span>
            </div>
            <p className="text-sm text-foreground-600 mt-1">
              Détection d&apos;Opportunités — Stratégie Netlinking — Autorité de Domaine
            </p>
          </div>
          <button
            onClick={runDetection}
            disabled={loading}
            className="whitespace-nowrap px-5 py-2.5 bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            type="button"
          >
            <i className={`${loading ? 'ri-loader-4-line animate-spin' : 'ri-radar-line'}`}></i>
            {loading ? 'Détection...' : 'Scanner Opportunités'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          {[
            { label: 'Opportunités', value: stats.total_opportunities, icon: 'ri-link-m' },
            { label: 'Haute Priorité', value: stats.high_priority, icon: 'ri-star-fill', color: 'text-primary-500' },
            { label: 'DA Moyen Cible', value: stats.average_da, icon: 'ri-bar-chart-line', color: 'text-primary-600' },
            { label: 'Backlinks Acquis', value: stats.backlinks_acquired_total, icon: 'ri-check-double-line', color: 'text-primary-500' },
            { label: 'DA Actuel', value: stats.domain_authority_current, icon: 'ri-global-line', color: 'text-amber-600' },
            { label: 'DA Cible', value: stats.domain_authority_target, icon: 'ri-flag-line', color: 'text-accent-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                <i className={`${stat.icon} ${stat.color || 'text-foreground-500'}`}></i>
                {stat.label}
              </div>
              <div className="text-xl md:text-2xl font-semibold text-foreground-950 font-heading">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* DA Progress */}
        <div className="bg-white border border-background-200/70 rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground-700">Progression Domain Authority</span>
            <span className="text-sm text-foreground-500">
              {stats.domain_authority_current} / {stats.domain_authority_target}
            </span>
          </div>
          <div className="w-full bg-background-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full transition-all"
              style={{ width: `${(stats.domain_authority_current / stats.domain_authority_target) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-foreground-500 mt-2">
            +{stats.backlinks_acquired_30d} backlinks acquis ces 30 derniers jours — {stats.backlinks_acquired_total} au total
          </div>
        </div>

        {error && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 text-sm text-primary-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 w-fit overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'
              }`}
              type="button"
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Opportunities */}
        {activeTab === 'opportunities' && (
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-100 text-foreground-500 flex-shrink-0">
                      {getStatusIcon(opp.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-foreground-900">{opp.source_domain}</span>
                        <span className="text-xs px-2 py-0.5 bg-secondary-100 text-secondary-700 rounded-full font-medium">
                          DA {opp.domain_authority}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(opp.opportunity_type)}`}>
                          {getTypeLabel(opp.opportunity_type)}
                        </span>
                      </div>
                      <div className="text-xs text-foreground-500 mb-2">{opp.target_url}</div>
                      <div className="text-sm text-foreground-600 bg-background-50 p-3 rounded">
                        {opp.notes}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-foreground-500">Pertinence :</span>
                        <div className="w-20 bg-background-100 rounded-full h-1.5">
                          <div className="h-full bg-accent-500 rounded-full" style={{ width: `${opp.relevance_score}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-foreground-700">{opp.relevance_score}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Content Pillars */}
        {activeTab === 'pillars' && (
          <div className="space-y-3">
            {contentPillars.map((pillar, i) => (
              <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-700 flex-shrink-0">
                    <i className="ri-file-text-line"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground-900">{pillar.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        pillar.type === 'research_report' ? 'bg-primary-100 text-primary-700' :
                        pillar.type === 'definitive_guide' ? 'bg-secondary-100 text-secondary-900' :
                        pillar.type === 'original_research' ? 'bg-accent-100 text-accent-900' :
                        pillar.type === 'framework' ? 'bg-amber-100 text-amber-700' :
                        'bg-secondary-100 text-secondary-700'
                      }`}>
                        {pillar.type === 'research_report' ? 'Rapport de Recherche' :
                         pillar.type === 'definitive_guide' ? 'Guide Définitif' :
                         pillar.type === 'original_research' ? 'Recherche Originale' :
                         pillar.type === 'framework' ? 'Framework' : 'Outil Interactif'}
                      </span>
                    </div>
                    <div className="text-sm text-foreground-600 mb-2">{pillar.description}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-foreground-500">DA Cible : {pillar.targetDA}</span>
                      {pillar.linkablePages.map((p, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 bg-background-100 text-foreground-600 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Quick Wins */}
        {activeTab === 'quickwins' && (
          <div className="space-y-3">
            {quickWins.map((win, i) => (
              <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5 flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex-shrink-0">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground-900">{win}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}