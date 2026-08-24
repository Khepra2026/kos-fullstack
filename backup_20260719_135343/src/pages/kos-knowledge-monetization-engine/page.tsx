import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKnowledgeMonetization } from '@/hooks/useKnowledgeMonetization';
import type { KnowledgeProduct, KnowledgeSalesPipeline } from '@/hooks/useKnowledgeMonetization';

type Tab = 'overview' | 'catalog' | 'pipeline' | 'quality' | 'revenue' | 'industrialization';

export default function knowledgeMonetizationEnginePage() {
  const { products, salesPipeline, revenueStreams, kpis, qualityCriteria, isLive, loading } = useKnowledgeMonetization();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedProduct, setSelectedProduct] = useState<KnowledgeProduct | null>(products[0] || null);
  const [catalogFilter, setCatalogFilter] = useState<string>('all');
  const [pipelineFilter, setPipelineFilter] = useState<string>('all');

  const formatMCFA = (val: number) => {
    if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} Md FCFA`;
    return `${(val / 1000000).toFixed(0)}M FCFA`;
  };

  const getTierBadge = (tier: string) => {
    const map: Record<string, string> = {
      T1_Gratuit: 'bg-gray-100 text-gray-700',
      T2_Standard: 'bg-blue-100 text-blue-700',
      T3_Premium: 'bg-accent-100 text-accent-900',
      T4_Enterprise: 'bg-primary-100 text-primary-700',
      T5_SurMesure: 'bg-amber-100 text-amber-800',
    };
    return map[tier] || 'bg-gray-100 text-gray-700';
  };

  const getTierLabel = (tier: string) => {
    const map: Record<string, string> = {
      T1_Gratuit: 'Gratuit',
      T2_Standard: 'Standard',
      T3_Premium: 'Premium',
      T4_Enterprise: 'Enterprise',
      T5_SurMesure: 'Sur Mesure',
    };
    return map[tier] || tier;
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-600',
      en_revision: 'bg-amber-100 text-amber-700',
      archive: 'bg-red-100 text-red-600',
      closed_won: 'bg-green-100 text-green-700',
      closed_lost: 'bg-red-100 text-red-600',
      negociation: 'bg-amber-100 text-amber-800',
      proposition: 'bg-blue-100 text-blue-700',
      qualification: 'bg-secondary-100 text-secondary-900',
      discovery: 'bg-gray-100 text-gray-600',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      closed_won: 'Gagné', closed_lost: 'Perdu', negociation: 'Négociation',
      proposition: 'Proposition', qualification: 'Qualifié', discovery: 'Découverte',
      published: 'Publié', draft: 'Brouillon', en_revision: 'En Révision', archive: 'Archivé',
    };
    return map[status] || status;
  };

  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      barometre: 'Baromètre', etude_sectorielle: 'Étude Sectorielle', livre_blanc: 'Livre Blanc',
      guide_pratique: 'Guide Pratique', template_audit: 'Template Audit', formation: 'Formation',
      framework: 'Framework', base_donnees: 'Base de Données', veille: 'Veille', diagnostic: 'Diagnostic',
    };
    return map[cat] || cat;
  };

  const filteredProducts = catalogFilter === 'all' ? products : products.filter(p => p.category === catalogFilter);
  const filteredPipeline = pipelineFilter === 'all' ? salesPipeline : salesPipeline.filter(d => d.statut === pipelineFilter);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'catalog', label: 'Catalogue Produits', icon: 'ri-store-2-line' },
    { id: 'pipeline', label: 'Pipeline Ventes', icon: 'ri-funds-line' },
    { id: 'quality', label: 'Qualité ISO', icon: 'ri-shield-check-line' },
    { id: 'revenue', label: 'Flux Revenus', icon: 'ri-money-dollar-circle-line' },
    { id: 'industrialization', label: 'Industrialisation', icon: 'ri-settings-3-line' },
  ];

  const pipelineDealsWon = salesPipeline.filter(d => d.statut === 'closed_won').length;
  const pipelineValueWon = salesPipeline.filter(d => d.statut === 'closed_won').reduce((s, d) => s + d.valeur_fcfa, 0);

  if (loading) {
    return (
      <hubLayout hubId={121}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-foreground-500">Chargement du Knowledge Monetization Engine...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={121}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-900 text-xs font-semibold mb-4">
                {isLive ? <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>LIVE DB</> : <><i className="ri-database-2-line"></i>Mode Démo</>}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">KOS Knowledge Monetization Engine™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Industrialisation et vente des connaissances — Catalogue produits, pipeline commercial, qualité ISO, flux de revenus. Standards ISO 30401 + 150% Big Four.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">{kpis.produits_catalogue}</div><div className="text-xs text-foreground-500">Produits</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-primary-500">{formatMCFA(kpis.revenu_total_fcfa)}</div><div className="text-xs text-foreground-500">Revenu Total</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-accent-500">{kpis.clients_actifs}</div><div className="text-xs text-foreground-500">Clients</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-green-600">{kpis.score_qualite_iso_moyen}/100</div><div className="text-xs text-foreground-500">Score ISO</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Revenu Mensuel', value: formatMCFA(kpis.revenu_mensuel_fcfa), icon: 'ri-money-dollar-circle-line', color: 'text-primary-500' },
                { label: 'Pipeline Actif', value: formatMCFA(kpis.pipeline_actif_fcfa), icon: 'ri-funds-line', color: 'text-accent-500' },
                { label: 'Panier Moyen', value: formatMCFA(kpis.panier_moyen_fcfa), icon: 'ri-shopping-cart-line', color: 'text-foreground-950' },
                { label: 'Taux Conversion', value: `${kpis.taux_conversion_moyen}%`, icon: 'ri-line-chart-line', color: 'text-green-600' },
                { label: 'Win Rate', value: `${kpis.win_rate}%`, icon: 'ri-trophy-line', color: 'text-amber-600' },
                { label: 'Croissance T3', value: `+${kpis.croissance_trimestrielle}%`, icon: 'ri-arrow-up-line', color: 'text-green-500' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-2 mb-3"><div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-background-100 ${stat.color}`}><i className={`${stat.icon} text-lg`}></i></div></div>
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-foreground-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-pie-chart-line text-primary-500"></i>Répartition par Catégorie</h3>
                <div className="space-y-3">
                  {['barometre', 'etude_sectorielle', 'formation', 'template_audit', 'framework', 'veille', 'guide_pratique', 'diagnostic', 'base_donnees', 'livre_blanc'].map(cat => {
                    const catProducts = products.filter(p => p.category === cat);
                    if (catProducts.length === 0) return null;
                    const catRevenue = catProducts.reduce((s, p) => s + p.revenu_genere_fcfa, 0);
                    const pct = kpis.revenu_total_fcfa > 0 ? Math.round((catRevenue / kpis.revenu_total_fcfa) * 100) : 0;
                    return (
                      <div key={cat} className="flex items-center gap-3">
                        <span className="text-xs text-foreground-600 w-32 whitespace-nowrap">{formatCategory(cat)}</span>
                        <div className="flex-1 h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div></div>
                        <span className="text-xs font-semibold text-foreground-950 w-10 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-medal-line text-accent-500"></i>Top 5 Produits</h3>
                <div className="space-y-3">
                  {[...products].sort((a, b) => b.revenu_genere_fcfa - a.revenu_genere_fcfa).slice(0, 5).map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-background-100 rounded-lg hover:bg-background-200/50 cursor-pointer transition-colors" onClick={() => { setSelectedProduct(p); setActiveTab('catalog'); }}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-bold text-foreground-400 w-5">#{i + 1}</span>
                        <div className="min-w-0"><div className="text-sm font-medium text-foreground-950 truncate">{p.title}</div><div className="text-xs text-foreground-500">{formatCategory(p.category)} · {p.clients_actifs} clients</div></div>
                      </div>
                      <span className="text-sm font-bold text-accent-600 whitespace-nowrap ml-3">{formatMCFA(p.revenu_genere_fcfa)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Flux de Revenus — 6 Derniers Mois</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-[600px]">
                  {revenueStreams.map((rs) => {
                    const maxVal = Math.max(...revenueStreams.map(r => r.total_fcfa));
                    const heightPct = (rs.total_fcfa / maxVal) * 100;
                    return (
                      <div key={rs.mois} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-foreground-950">{formatMCFA(rs.total_fcfa)}</span>
                        <div className="w-full bg-background-200/70 rounded-t-lg overflow-hidden relative" style={{ height: '160px' }}>
                          <div className="absolute bottom-0 w-full bg-primary-500 rounded-t-lg transition-all" style={{ height: `${heightPct}%` }}></div>
                        </div>
                        <span className="text-xs text-foreground-500">{rs.mois.substring(5)}</span>
                        <span className={`text-xs font-medium ${rs.croissance_mensuelle_pct > 0 ? 'text-green-600' : 'text-red-500'}`}>{rs.croissance_mensuelle_pct > 0 ? '+' : ''}{rs.croissance_mensuelle_pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-background-200/70">
                {(['barometres_fcfa', 'etudes_fcfa', 'formations_fcfa', 'templates_fcfa', 'abonnements_fcfa'] as const).map((key, i) => {
                  const colors = ['bg-primary-500', 'bg-accent-500', 'bg-secondary-500', 'bg-amber-500', 'bg-green-500'];
                  const labels = ['Baromètres', 'Études', 'Formations', 'Templates', 'Abonnements'];
                  return (<div key={key} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${colors[i]}`}></div><span className="text-xs text-foreground-500">{labels[i]}</span></div>);
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-foreground-500">Filtrer :</span>
              {['all', 'barometre', 'etude_sectorielle', 'formation', 'template_audit', 'framework', 'veille', 'diagnostic', 'guide_pratique', 'base_donnees', 'livre_blanc'].map(cat => (
                <button key={cat} onClick={() => setCatalogFilter(cat)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${catalogFilter === cat ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 bg-background-100 hover:bg-background-200/70'}`}>
                  {cat === 'all' ? 'Tous' : formatCategory(cat)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} className={`p-5 rounded-lg border cursor-pointer transition-all ${selectedProduct?.id === product.id ? 'border-accent-400 bg-accent-50/50 ring-1 ring-accent-200' : 'border-background-200/70 bg-background-50 hover:border-background-300/60 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTierBadge(product.pricing_tier)}`}>{getTierLabel(product.pricing_tier)}</span>
                    <span className="text-xs text-foreground-400">{formatCategory(product.category)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2 line-clamp-2">{product.title}</h4>
                  <p className="text-xs text-foreground-500 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-background-200/70">
                    <span className="text-lg font-bold text-primary-500">{product.prix_fcfa > 0 ? formatMCFA(product.prix_fcfa) : 'Gratuit'}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-foreground-500"><i className="ri-download-2-line mr-1"></i>{product.telechargements > 0 ? (product.telechargements >= 1000 ? `${(product.telechargements / 1000).toFixed(0)}K` : product.telechargements) : '-'}</span>
                      <span className="text-xs text-green-600">{product.taux_conversion_moyen}% conv.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${getStatusBadge(product.statut)}`}>{getStatusLabel(product.statut)}</span>
                    {product.score_qualite_iso >= 95 && <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">ISO {product.score_qualite_iso}/100</span>}
                  </div>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTierBadge(selectedProduct.pricing_tier)}`}>{getTierLabel(selectedProduct.pricing_tier)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{formatCategory(selectedProduct.category)}</span>
                      {selectedProduct.prix_fcfa > 0 && <span className="text-lg font-bold text-primary-500">{formatMCFA(selectedProduct.prix_fcfa)}</span>}
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedProduct.title}</h2>
                    <p className="text-sm text-foreground-600 mb-4">{selectedProduct.description_longue}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Pages</div><div className="text-sm font-bold text-foreground-950">{selectedProduct.pages || 'N/A'}</div></div>
                  <div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Clients</div><div className="text-sm font-bold text-foreground-950">{selectedProduct.clients_actifs}</div></div>
                  <div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Conv. Moy.</div><div className="text-sm font-bold text-green-600">{selectedProduct.taux_conversion_moyen}%</div></div>
                  <div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Leads Générés</div><div className="text-sm font-bold text-foreground-950">{selectedProduct.leads_generes}</div></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedProduct.domaines.map((d, i) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600">{d}</span>))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedProduct.certification_iso.map((cert, i) => (<span key={i} className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 font-medium">{cert}</span>))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs text-foreground-500">Filtrer :</span>
              {['all', 'closed_won', 'negociation', 'proposition', 'qualification', 'discovery', 'closed_lost'].map(status => (
                <button key={status} onClick={() => setPipelineFilter(status)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${pipelineFilter === status ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 bg-background-100 hover:bg-background-200/70'}`}>
                  {status === 'all' ? 'Tous' : getStatusLabel(status)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Pipeline Actif</div><div className="text-xl font-bold text-accent-500">{formatMCFA(kpis.pipeline_actif_fcfa)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Deals Gagnés</div><div className="text-xl font-bold text-green-600">{pipelineDealsWon}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Valeur Gagnée</div><div className="text-xl font-bold text-green-600">{formatMCFA(pipelineValueWon)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Win Rate</div><div className="text-xl font-bold text-foreground-950">{kpis.win_rate}%</div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPipeline.map(deal => (
                <div key={deal.id} className="p-5 rounded-lg border border-background-200/70 bg-background-50 hover:border-background-300/60 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(deal.statut)}`}>{getStatusLabel(deal.statut)}</span>
                    {deal.probabilite > 0 && deal.probabilite < 100 && <span className="text-xs font-bold text-foreground-950">{deal.probabilite}% prob.</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-1">{deal.produit_titre}</h4>
                  <p className="text-xs text-foreground-500 mb-2">{deal.client_nom} · {deal.client_secteur} · {deal.client_pays}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-background-200/70">
                    <span className={`text-sm font-bold ${deal.statut === 'closed_won' ? 'text-green-600' : deal.statut === 'closed_lost' ? 'text-red-500' : 'text-primary-500'}`}>{formatMCFA(deal.valeur_fcfa)}</span>
                    <span className="text-xs text-foreground-400">{deal.date_creation.substring(0, 10)}</span>
                  </div>
                  {deal.notes && <p className="text-xs text-foreground-400 mt-2 italic line-clamp-2">"{deal.notes}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Score ISO Global</div><div className="text-2xl font-bold text-green-600">{kpis.score_qualite_iso_moyen}/100</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Critères ISO</div><div className="text-2xl font-bold text-foreground-950">{qualityCriteria.length}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Produits Certifiés</div><div className="text-2xl font-bold text-primary-500">{products.filter(p => p.certification_iso.length > 0).length}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">NPS Moyen</div><div className="text-2xl font-bold text-foreground-950">{kpis.nps_moyen}/100</div></div>
            </div>

            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-check-double-line text-green-600"></i>Critères Qualité ISO 30401:2018 — Knowledge Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-background-200/70"><th className="text-left py-3 text-xs font-semibold text-foreground-500">Critère</th><th className="text-center py-3 text-xs font-semibold text-foreground-500">Poids</th><th className="text-center py-3 text-xs font-semibold text-foreground-500">Seuil Excellence</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Progression</th></tr></thead>
                  <tbody>
                    {qualityCriteria.map((qc) => (
                      <tr key={qc.critere} className="border-b border-background-100">
                        <td className="py-3 pr-4">
                          <div className="text-sm font-medium text-foreground-950">{qc.critere}</div>
                          <div className="text-xs text-foreground-500 mt-0.5">{qc.description}</div>
                        </td>
                        <td className="py-3 text-center"><span className="text-xs font-bold text-foreground-950">{qc.poids}%</span></td>
                        <td className="py-3 text-center"><span className="text-xs font-medium text-foreground-600">{qc.seuil_excellence}/100</span></td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-24 h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(qc.seuil_excellence, 100)}%` }}></div></div>
                            <span className="text-xs font-bold text-green-600">{qc.seuil_excellence}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Scores Qualité par Produit</h3>
              <div className="space-y-3">
                {[...products].sort((a, b) => b.score_qualite_iso - a.score_qualite_iso).map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-600 w-48 whitespace-nowrap truncate">{p.title}</span>
                    <div className="flex-1 h-2 bg-background-200/70 rounded-full overflow-hidden"><div className={`h-full rounded-full ${p.score_qualite_iso >= 95 ? 'bg-green-500' : p.score_qualite_iso >= 90 ? 'bg-primary-500' : 'bg-amber-500'}`} style={{ width: `${p.score_qualite_iso}%` }}></div></div>
                    <span className="text-xs font-bold text-foreground-950 w-10 text-right">{p.score_qualite_iso}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">CA Cumul 2026</div><div className="text-lg font-bold text-primary-500">{formatMCFA(revenueStreams[revenueStreams.length - 1].cumul_annuel_fcfa)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Mensuel Juin</div><div className="text-lg font-bold text-foreground-950">{formatMCFA(revenueStreams[revenueStreams.length - 1].total_fcfa)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Prévisionnel 12M</div><div className="text-lg font-bold text-accent-500">{formatMCFA(kpis.revenu_previsionnel_12m_fcfa)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Panier Moyen</div><div className="text-lg font-bold text-foreground-950">{formatMCFA(kpis.panier_moyen_fcfa)}</div></div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center"><div className="text-xs text-foreground-500">Rétention</div><div className="text-lg font-bold text-green-600">{kpis.taux_retention}%</div></div>
            </div>

            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Évolution Mensuelle — 2026</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-background-200/70"><th className="text-left py-3 text-xs font-semibold text-foreground-500">Mois</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Baromètres</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Études</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Formations</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Templates</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Abonnements</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Total</th><th className="text-right py-3 text-xs font-semibold text-foreground-500">Croiss.</th></tr></thead>
                  <tbody>
                    {revenueStreams.map(rs => (
                      <tr key={rs.mois} className="border-b border-background-100 hover:bg-background-100/50 transition-colors">
                        <td className="py-3 text-sm font-medium text-foreground-950">{rs.mois.substring(5)}</td>
                        <td className="py-3 text-sm text-right text-foreground-600">{formatMCFA(rs.barometres_fcfa)}</td>
                        <td className="py-3 text-sm text-right text-foreground-600">{formatMCFA(rs.etudes_fcfa)}</td>
                        <td className="py-3 text-sm text-right text-foreground-600">{formatMCFA(rs.formations_fcfa)}</td>
                        <td className="py-3 text-sm text-right text-foreground-600">{formatMCFA(rs.templates_fcfa)}</td>
                        <td className="py-3 text-sm text-right text-foreground-600">{formatMCFA(rs.abonnements_fcfa)}</td>
                        <td className="py-3 text-sm text-right font-bold text-foreground-950">{formatMCFA(rs.total_fcfa)}</td>
                        <td className={`py-3 text-sm text-right font-medium ${rs.croissance_mensuelle_pct > 0 ? 'text-green-600' : 'text-red-500'}`}>{rs.croissance_mensuelle_pct > 0 ? '+' : ''}{rs.croissance_mensuelle_pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'industrialization' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-settings-3-line text-primary-500"></i>Pipeline d'Industrialisation</h3>
                <div className="space-y-4">
                  {[
                    { step: 'Collecte Connaissances', desc: 'Extraction automatique des insights depuis les missions consulting, rapports d\'audit, études livrées. RAG + NLP.', status: '100% automatisé', icon: 'ri-database-2-line' },
                    { step: 'Packaging & Structuration', desc: 'Mise en forme Big Four : template standardisé, sommaires exécutifs, visualisations, annexes.', status: '95% automatisé', icon: 'ri-layout-2-line' },
                    { step: 'Validation Réglementaire', desc: 'KOS Publication Gate™ — Vérification citations, sources officielles, indice fiabilité ≥ 95.', status: '100% automatisé', icon: 'ri-shield-check-line' },
                    { step: 'Scoring Qualité ISO', desc: '10 critères ISO 30401 — Exactitude, Pertinence, Profondeur, Présentation, Applicabilité.', status: '100% automatisé', icon: 'ri-check-double-line' },
                    { step: 'Pricing & Tiering', desc: 'Positionnement tarifaire automatique basé sur benchmarking Big Four, profondeur, exclusivité.', status: '80% automatisé', icon: 'ri-price-tag-3-line' },
                    { step: 'Distribution Multi-Canal', desc: 'Publication site web, LinkedIn, newsletter, places de marché institutionnelles, email nurturing.', status: '90% automatisé', icon: 'ri-share-line' },
                    { step: 'Suivi Performance', desc: 'KPIs en temps réel : téléchargements, leads, conversions, revenus, NPS, taux rétention.', status: '100% automatisé', icon: 'ri-line-chart-line' },
                    { step: 'Itération & Amélioration', desc: 'Feedback loop automatique : analyse performance → ajustement contenu/prix/canal → republication.', status: '70% automatisé', icon: 'ri-refresh-line' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-background-100 rounded-lg">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className={`${step.icon} text-lg`}></i></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1"><span className="text-sm font-semibold text-foreground-950">Étape {i + 1} — {step.step}</span><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium whitespace-nowrap">{step.status}</span></div>
                        <p className="text-xs text-foreground-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-building-4-line text-accent-500"></i>Comparaison Big Four — Monétisation Connaissances</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-background-200/70"><th className="text-left py-2 text-xs font-semibold text-foreground-500">Firme</th><th className="text-right py-2 text-xs font-semibold text-foreground-500">Publications/an</th><th className="text-right py-2 text-xs font-semibold text-foreground-500">Revenu Knowledge (M$)</th><th className="text-right py-2 text-xs font-semibold text-foreground-500">% CA Total</th><th className="text-right py-2 text-xs font-semibold text-foreground-500">Maturité</th></tr></thead>
                      <tbody>
                        {[
                          { firm: 'Deloitte', pubs: 4500, rev: 3200, pct: 5.2, maturity: 97 },
                          { firm: 'PwC', pubs: 3800, rev: 2800, pct: 4.8, maturity: 96 },
                          { firm: 'EY', pubs: 4100, rev: 2900, pct: 4.5, maturity: 95 },
                          { firm: 'KPMG', pubs: 3500, rev: 2500, pct: 4.2, maturity: 94 },
                          { firm: 'KHEPRA Experts', pubs: 520, rev: Math.round(kpis.revenu_total_fcfa / 600), pct: 8.5, maturity: kpis.score_qualite_iso_moyen },
                        ].map(row => (
                          <tr key={row.firm} className={`border-b border-background-100 ${row.firm === 'KHEPRA Experts' ? 'bg-accent-50/50 font-semibold' : ''}`}>
                            <td className="py-2 text-sm text-foreground-950">{row.firm}</td>
                            <td className="py-2 text-sm text-right text-foreground-600">{row.pubs.toLocaleString()}</td>
                            <td className="py-2 text-sm text-right text-foreground-600">{row.rev.toLocaleString()}</td>
                            <td className="py-2 text-sm text-right text-foreground-600">{row.pct}%</td>
                            <td className="py-2 text-sm text-right"><span className={row.maturity >= 95 ? 'text-green-600 font-bold' : 'text-foreground-600'}>{row.maturity}/100</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-rocket-line text-secondary-500"></i>Maturité Industrialisation</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Automatisation Pipeline', value: 90 },
                      { label: 'Diversité Produits', value: 85 },
                      { label: 'Pénétration Marché', value: 65 },
                      { label: 'Qualité ISO 30401', value: kpis.score_qualite_iso_moyen },
                      { label: 'Distribution Multi-Canal', value: 82 },
                      { label: 'Feedback & Itération', value: 70 },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-xs text-foreground-600 w-36 whitespace-nowrap">{item.label}</span>
                        <div className="flex-1 h-2 bg-background-200/70 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.value >= 90 ? 'bg-green-500' : item.value >= 75 ? 'bg-primary-500' : 'bg-amber-500'}`} style={{ width: `${item.value}%` }}></div></div>
                        <span className="text-xs font-bold text-foreground-950 w-8 text-right">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              {[
                { label: 'ISO 30401', sub: 'Knowledge Mgmt', color: 'text-green-600' },
                { label: 'ISO 9001', sub: 'Quality', color: 'text-green-600' },
                { label: 'ISO 31000', sub: 'Risk', color: 'text-green-600' },
              ].map(cert => (
                <div key={cert.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cert.color} bg-current`}></div>
                  <div><span className="text-xs font-semibold text-foreground-950">{cert.label}</span><span className="text-xs text-foreground-500 ml-2">{cert.sub}</span></div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-foreground-500">Big Four Knowledge Monetization Standard</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-900 font-semibold">150% Target</span>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



