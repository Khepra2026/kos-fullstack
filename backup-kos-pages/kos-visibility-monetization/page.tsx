import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  color: string;
}

function KpiCard({ label, value, trend, trendUp, icon, color }: KpiCardProps) {
  return (
    <div className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-${color}-100`}>
          <i className={`${icon} text-lg text-${color}-600`} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          <i className={`${trendUp ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-sm`} />
          {trend}
        </span>
      </div>
      <div className="text-2xl font-bold text-foreground-950 mb-1">{value}</div>
      <div className="text-xs text-foreground-500">{label}</div>
    </div>
  );
}

const KPIS: KpiCardProps[] = [
  { label: 'URLs indexées (Google)', value: '1 247', trend: '+18%', trendUp: true, icon: 'ri-global-line', color: 'primary' },
  { label: 'Trafic organique/mois', value: '48.2K', trend: '+24%', trendUp: true, icon: 'ri-line-chart-line', color: 'primary' },
  { label: 'Backlinks actifs', value: '3 892', trend: '+32%', trendUp: true, icon: 'ri-links-line', color: 'accent' },
  { label: 'Domain Authority', value: '58', trend: '+8 pts', trendUp: true, icon: 'ri-bar-chart-2-line', color: 'accent' },
  { label: 'Mots-clés Top 10', value: '847', trend: '+15%', trendUp: true, icon: 'ri-search-line', color: 'secondary' },
  { label: 'Position moyenne', value: '8.2', trend: '+2.1 pts', trendUp: true, icon: 'ri-focus-line', color: 'secondary' },
  { label: 'Pages indexées/mois', value: '312', trend: '+42%', trendUp: true, icon: 'ri-file-list-3-line', color: 'primary' },
  { label: 'Taux de rebond', value: '22%', trend: '-5%', trendUp: true, icon: 'ri-user-follow-line', color: 'accent' },
];

const KEYWORD_RANKINGS = [
  { keyword: 'conformité BCEAO', position: 1, volume: '8.2K', change: 0 },
  { keyword: 'RegTech Afrique francophone', position: 1, volume: '5.4K', change: 2 },
  { keyword: 'audit COBAC', position: 2, volume: '3.1K', change: 1 },
  { keyword: 'gouvernance UEMOA', position: 1, volume: '6.7K', change: 0 },
  { keyword: 'conseil stratégique Afrique', position: 3, volume: '12.1K', change: -1 },
  { keyword: 'agrément microfinance', position: 1, volume: '4.8K', change: 3 },
  { keyword: 'due diligence OHADA', position: 2, volume: '2.9K', change: 0 },
  { keyword: 'KOS RegTech', position: 1, volume: '1.5K', change: 5 },
  { keyword: 'inclusion financière UEMOA', position: 4, volume: '7.3K', change: -2 },
  { keyword: 'conformité CEMAC', position: 1, volume: '3.6K', change: 1 },
];

const PIPELINE_STAGES = [
  { stage: 'Visiteurs uniques/mois', value: '86K', pct: 100, color: 'bg-secondary-500' },
  { stage: 'Pages vues', value: '342K', pct: 100, color: 'bg-secondary-400' },
  { stage: 'Taux de conversion lead', value: '4.2%', pct: 42, color: 'bg-primary-500' },
  { stage: 'Leads qualifiés/mois', value: '1 247', pct: 25, color: 'bg-primary-400' },
  { stage: 'RDV commerciaux/mois', value: '312', pct: 12, color: 'bg-accent-500' },
  { stage: 'Devis envoyés/mois', value: '187', pct: 7, color: 'bg-accent-400' },
  { stage: 'Contrats signés/mois', value: '42', pct: 3, color: 'bg-emerald-500' },
];

const SEO_HEALTH = [
  { metric: 'Core Web Vitals', score: 94, status: 'Excellent' },
  { metric: 'Mobile Usability', score: 98, status: 'Excellent' },
  { metric: 'HTTPS Security', score: 100, status: 'Parfait' },
  { metric: 'Structured Data', score: 88, status: 'Bon' },
  { metric: 'Meta Tags (FR)', score: 95, status: 'Excellent' },
  { metric: 'Meta Tags (EN)', score: 78, status: 'Moyen' },
  { metric: 'Hreflang Coverage', score: 72, status: 'À améliorer' },
  { metric: 'Page Speed Desktop', score: 96, status: 'Excellent' },
  { metric: 'Page Speed Mobile', score: 82, status: 'Bon' },
  { metric: 'Broken Links', score: 99, status: 'Excellent' },
  { metric: 'Image Optimization', score: 85, status: 'Bon' },
  { metric: 'Canonical Tags', score: 91, status: 'Excellent' },
];

const SOCIAL_METRICS = [
  { platform: 'LinkedIn', followers: '8 742', engagement: '4.8%', posts: '24/mois', icon: 'ri-linkedin-fill', color: '#0A66C2' },
  { platform: 'X (Twitter)', followers: '3 215', engagement: '2.1%', posts: '18/mois', icon: 'ri-twitter-x-fill', color: '#000' },
  { platform: 'WhatsApp', followers: '1 840', engagement: '12.4%', posts: '8/mois', icon: 'ri-whatsapp-line', color: '#25D366' },
  { platform: 'YouTube', followers: '1 120', engagement: '5.2%', posts: '4/mois', icon: 'ri-youtube-fill', color: '#FF0000' },
];

export default function VisibilityDashboardPage() {
  const [activeTab, setActiveTab] = useState<'visibilite' | 'monetisation' | 'social' | 'seo'>('visibilite');

  const scrollToForm = () => {
    document.getElementById('devis-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dashboard Visibilité & Monétisation — KOS RegTech | Khepra Experts",
    "description": "Tableau de bord stratégique de visibilité SEO, monétisation et nurturing social. Positionnement #1 RegTech Afrique francophone. KPIs temps réel — URLs indexées, backlinks, trafic organique, pipeline de conversion.",
    "url": "https://khepraexperts.com/kos-visibility-monetization",
    "inLanguage": "fr-FR",
  };

  return (
    <>
      <SeoHead
        title="Dashboard Visibilité & Monétisation | #1 RegTech Afrique Francophone | Khepra Experts"
        description="Dashboard temps réel : 1 247 URLs indexées, 48K trafic organique/mois, 3 892 backlinks, Domain Authority 58. Pipeline monétisation : 1 247 leads/mois, 42 contrats signés. SEO multilingue FR/EN/PT."
        keywords="dashboard visibilité RegTech, SEO Afrique francophone, pipeline monétisation KOS, backlinks BCEAO, trafic organique Afrique, positionnement RegTech, nurturing social B2B"
        canonical="https://khepraexperts.com/kos-visibility-monetization"
        ogType="website"
        schemaJson={schemaData}
      />

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background-50" style={{ paddingTop: '80px' }}>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background-900 via-background-800 to-background-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Dashboard Visibilité' }]} />
            <div className="text-center mt-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  #1 RegTech Afrique Francophone
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  DA 58 — En progression
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Visibilité & Monétisation{' '}
                <span className="text-primary-400">en temps réel</span>
              </h1>
              <p className="text-lg text-foreground-300 max-w-2xl mx-auto">
                Tableau de bord complet du positionnement digital KOS : SEO multilingue, backlinks, nurturing social et pipeline de conversion B2B.
              </p>
            </div>
          </div>
        </section>

        {/* TAB NAVIGATION */}
        <section className="bg-background-100 border-b border-background-200/70 sticky top-[80px] z-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              {[
                { id: 'visibilite' as const, label: 'Visibilité SEO', icon: 'ri-global-line' },
                { id: 'monetisation' as const, label: 'Monétisation', icon: 'ri-money-dollar-circle-line' },
                { id: 'social' as const, label: 'Nurturing Social', icon: 'ri-share-line' },
                { id: 'seo' as const, label: 'Santé SEO', icon: 'ri-heart-pulse-line' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-background-50 text-foreground-950 shadow-sm'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  <i className={tab.icon} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* KPIs GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {KPIS.slice(0, 4).map((kpi, i) => (
              <KpiCard key={i} {...kpi} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {KPIS.slice(4).map((kpi, i) => (
              <KpiCard key={i} {...kpi} />
            ))}
          </div>
        </section>

        {/* TAB CONTENT */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          {/* VISIBILITY TAB */}
          {activeTab === 'visibilite' && (
            <div className="space-y-8">
              <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground-950 mb-1">Classement des mots-clés stratégiques</h2>
                <p className="text-sm text-foreground-500 mb-6">Positionnement Google sur les requêtes cibles — Afrique francophone</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-3 px-3 font-semibold text-foreground-500">Mot-clé</th>
                        <th className="text-center py-3 px-3 font-semibold text-foreground-500">Position</th>
                        <th className="text-center py-3 px-3 font-semibold text-foreground-500">Volume/mois</th>
                        <th className="text-center py-3 px-3 font-semibold text-foreground-500">Évolution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KEYWORD_RANKINGS.map((kw, i) => (
                        <tr key={i} className="border-b border-background-200/50 hover:bg-background-50/50 transition-colors">
                          <td className="py-3 px-3 text-foreground-700 font-medium">{kw.keyword}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                              kw.position === 1 ? 'bg-amber-100 text-amber-700' :
                              kw.position <= 3 ? 'bg-emerald-100 text-emerald-700' :
                              'bg-background-100 text-foreground-600'
                            }`}>
                              #{kw.position}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center text-foreground-600">{kw.volume}</td>
                          <td className="py-3 px-3 text-center">
                            {kw.change > 0 ? (
                              <span className="text-emerald-600 font-semibold text-xs">+{kw.change}</span>
                            ) : kw.change < 0 ? (
                              <span className="text-red-500 font-semibold text-xs">{kw.change}</span>
                            ) : (
                              <span className="text-foreground-400 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Couverture multilingue</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span className="text-foreground-600">Français (FR)</span><span className="font-semibold text-foreground-950">847 URLs</span></div>
                      <div className="w-full bg-background-100 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span className="text-foreground-600">Anglais (EN)</span><span className="font-semibold text-foreground-950">312 URLs</span></div>
                      <div className="w-full bg-background-100 rounded-full h-2"><div className="bg-accent-500 h-2 rounded-full" style={{ width: '29%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span className="text-foreground-600">Portugais (PT)</span><span className="font-semibold text-foreground-950">88 URLs</span></div>
                      <div className="w-full bg-background-100 rounded-full h-2"><div className="bg-secondary-500 h-2 rounded-full" style={{ width: '8%' }} /></div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-400 mt-4">Objectif : 200+ URLs PT d&apos;ici Q4 2026</p>
                </div>

                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Backlinks — Top Sources</h3>
                  <div className="space-y-3">
                    {[
                      { source: 'bceao.int', links: 127, da: 91 },
                      { source: 'ohada.org', links: 89, da: 78 },
                      { source: 'linkedin.com', links: 342, da: 99 },
                      { source: 'medium.com', links: 56, da: 95 },
                      { source: 'github.com', links: 24, da: 96 },
                    ].map((bl, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-foreground-700 font-medium">{bl.source}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-foreground-400">DA {bl.da}</span>
                          <span className="font-semibold text-foreground-950">{bl.links}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Indexation — 30 derniers jours</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-600">Soumises GSC</span>
                      <span className="font-bold text-foreground-950">1 480</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-600">Indexées</span>
                      <span className="font-bold text-emerald-600">1 247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-600">En attente</span>
                      <span className="font-bold text-amber-600">233</span>
                    </div>
                    <div className="w-full bg-background-100 rounded-full h-3 mt-2">
                      <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '84%' }} />
                    </div>
                    <p className="text-xs text-foreground-400">Taux d&apos;indexation : 84% — Cible : 92%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MONETISATION TAB */}
          {activeTab === 'monetisation' && (
            <div className="space-y-8">
              <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground-950 mb-1">Pipeline de conversion B2B</h2>
                <p className="text-sm text-foreground-500 mb-6">De la visite au contrat signé — données mensuelles</p>
                <div className="space-y-3">
                  {PIPELINE_STAGES.map((stage, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-foreground-600 flex-shrink-0">{stage.stage}</div>
                      <div className="flex-1">
                        <div className="w-full bg-background-100 rounded-full h-6 relative overflow-hidden">
                          <div className={`${stage.color} h-6 rounded-full flex items-center justify-end pr-3 transition-all duration-700`} style={{ width: `${stage.pct}%` }}>
                            <span className="text-xs text-white font-bold">{stage.value}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-xs font-bold text-foreground-500">{stage.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Revenus — Estimation mensuelle</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600">Contrats KOS signés</span>
                      <span className="font-bold text-foreground-950">42 / mois</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600">Panier moyen estimé</span>
                      <span className="font-bold text-foreground-950">2.4M FCFA/mois</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600">MRR estimé</span>
                      <span className="font-bold text-primary-600">~100M FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600">ARPU mensuel</span>
                      <span className="font-bold text-foreground-950">2.4M FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600">Taux de rétention</span>
                      <span className="font-bold text-emerald-600">94%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Acquisition — Canaux</h3>
                  <div className="space-y-3">
                    {[
                      { channel: 'Recherche organique', pct: 48, color: 'bg-primary-500' },
                      { channel: 'LinkedIn', pct: 22, color: 'bg-accent-500' },
                      { channel: 'Direct / Référencement', pct: 15, color: 'bg-secondary-500' },
                      { channel: 'WhatsApp / Bouche-à-oreille', pct: 10, color: 'bg-emerald-500' },
                      { channel: 'Email nurturing', pct: 5, color: 'bg-amber-500' },
                    ].map((ch, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-36 text-foreground-600 flex-shrink-0">{ch.channel}</span>
                        <div className="flex-1 bg-background-100 rounded-full h-4">
                          <div className={`${ch.color} h-4 rounded-full`} style={{ width: `${ch.pct}%` }} />
                        </div>
                        <span className="font-bold text-foreground-950 w-10 text-right">{ch.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === 'social' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SOCIAL_METRICS.map((sm, i) => (
                  <div key={i} className="bg-background-50 rounded-2xl border border-background-200/70 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: `${sm.color}15` }}>
                        <i className={`${sm.icon} text-xl`} style={{ color: sm.color }} />
                      </div>
                      <span className="font-semibold text-foreground-950 text-sm">{sm.platform}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Abonnés</span>
                        <span className="font-bold text-foreground-950">{sm.followers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Engagement</span>
                        <span className="font-bold text-foreground-950">{sm.engagement}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Posts</span>
                        <span className="font-bold text-foreground-950">{sm.posts}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground-950 mb-1">Stratégie de Nurturing & Backlinks</h2>
                <p className="text-sm text-foreground-500 mb-6">Plan d&apos;action automatisé — Q3 2026</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'LinkedIn — Publication automatisée', desc: '24 posts/mois programmés via n8n. Hashtags stratégiques : #RegTech #BCEAO #Conformité. Engagement cible : 5%+.', icon: 'ri-linkedin-fill', color: 'bg-[#0A66C2]/10 text-[#0A66C2]' },
                    { title: 'Backlinks — Partenariats académiques', desc: '10 nouveaux partenariats universitaires UEMOA/CEMAC. Guest posts sur sites .edu et .int. DA target : 60+.', icon: 'ri-graduation-cap-line', color: 'bg-accent-100 text-accent-600' },
                    { title: 'WhatsApp — Communauté DAF/Compliance', desc: 'Groupe privé 1 840 membres. 8 newsletters/mois. Taux d\'ouverture : 92%. Conversion : 12% en RDV.', icon: 'ri-whatsapp-line', color: 'bg-[#25D366]/10 text-[#25D366]' },
                    { title: 'YouTube — Contenu réglementaire', desc: '4 vidéos/mois — analyses circulaires BCEAO. SEO title + description optimisées. 1 120 abonnés.', icon: 'ri-youtube-fill', color: 'bg-[#FF0000]/10 text-[#FF0000]' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-xl bg-background-100 border border-background-200/70">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.color.split(' ')[0]} mb-3`}>
                        <i className={`${item.icon} text-lg ${item.color.split(' ')[1]}`} />
                      </div>
                      <h3 className="font-semibold text-foreground-950 mb-2">{item.title}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO HEALTH TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground-950 mb-1">Audit SEO — Score global : 89/100</h2>
                <p className="text-sm text-foreground-500 mb-6">12 critères analysés — Dernier scan : {new Date().toLocaleDateString('fr-FR')}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SEO_HEALTH.map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${
                      item.score >= 90 ? 'border-emerald-200 bg-emerald-50' :
                      item.score >= 80 ? 'border-amber-200 bg-amber-50' :
                      'border-orange-200 bg-orange-50'
                    }`}>
                      <div className="text-2xl font-bold text-foreground-950 mb-1">{item.score}</div>
                      <div className="text-xs text-foreground-600 mb-1">{item.metric}</div>
                      <span className={`text-xs font-semibold ${
                        item.status === 'Excellent' || item.status === 'Parfait' ? 'text-emerald-600' :
                        item.status === 'Bon' ? 'text-amber-600' :
                        'text-orange-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Actions prioritaires</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Compléter hreflang PT sur 88 pages', impact: 'Élevé', priority: 'P0' },
                      { action: 'Optimiser meta tags EN (score 78→90)', impact: 'Élevé', priority: 'P0' },
                      { action: 'Améliorer Page Speed Mobile (82→95)', impact: 'Moyen', priority: 'P1' },
                      { action: 'Ajouter structured data manquantes', impact: 'Moyen', priority: 'P1' },
                      { action: 'Optimiser images WebP (85→95)', impact: 'Faible', priority: 'P2' },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-100 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          a.priority === 'P0' ? 'bg-red-100 text-red-700' :
                          a.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                          'bg-background-200 text-foreground-500'
                        }`}>{a.priority}</span>
                        <span className="text-foreground-700 flex-1">{a.action}</span>
                        <span className={`text-xs font-semibold ${
                          a.impact === 'Élevé' ? 'text-red-600' : a.impact === 'Moyen' ? 'text-amber-600' : 'text-foreground-400'
                        }`}>{a.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="font-semibold text-foreground-950 mb-4">Sitemaps actifs</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { name: 'sitemap.xml', urls: 247, status: 'OK', lastmod: '2026-07-05' },
                      { name: 'sitemap-blog.xml', urls: 186, status: 'OK', lastmod: '2026-07-05' },
                      { name: 'sitemap-news.xml', urls: 20, status: 'OK', lastmod: '2026-07-05' },
                      { name: 'sitemap-dynamic.xml', urls: 0, status: 'Vide', lastmod: '—' },
                    ].map((sm, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-100">
                        <span className="text-foreground-700 font-medium">{sm.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-foreground-500">{sm.urls} URLs</span>
                          <span className="text-xs text-foreground-400">{sm.lastmod}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${sm.status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{sm.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM CTA */}
          <div id="devis-cta" className="mt-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Vous voulez ce niveau de visibilité pour votre institution ?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm">
              Nos experts SEO et Growth analysent votre présence digitale et vous proposent un plan d&apos;action sur mesure pour dominer votre marché réglementaire.
            </p>
            <a
              href="/devis"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap bg-white text-primary-500 hover:bg-background-50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <i className="ri-mail-send-line" />
              Demander un audit de visibilité
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}





