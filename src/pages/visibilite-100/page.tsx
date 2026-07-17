import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';

interface KpiCard {
  label: string;
  current: string;
  target: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  progress: number;
  icon: string;
  color: string;
}

const visibilityKpis: KpiCard[] = [
  {
    label: 'AO/AMI Scannés',
    current: '0',
    target: '100%',
    unit: 'AO >50M',
    trend: 'up',
    progress: 0,
    icon: 'ri-file-search-line',
    color: 'accent',
  },
  {
    label: 'EOI Envoyées',
    current: '0',
    target: '20',
    unit: 'EOI/mois',
    trend: 'neutral',
    progress: 0,
    icon: 'ri-send-plane-line',
    color: 'primary',
  },
  {
    label: 'Citations IA',
    current: '0',
    target: '200',
    unit: 'citations/mois',
    trend: 'up',
    progress: 0,
    icon: 'ri-robot-line',
    color: 'secondary',
  },
  {
    label: 'Google SGE',
    current: '0',
    target: '140k',
    unit: 'impressions/mois',
    trend: 'up',
    progress: 0,
    icon: 'ri-google-line',
    color: 'accent',
  },
  {
    label: 'LinkedIn SIMDA',
    current: '4.2k',
    target: '15k',
    unit: 'abonnés',
    trend: 'up',
    progress: 28,
    icon: 'ri-linkedin-fill',
    color: 'primary',
  },
  {
    label: 'Leads LinkedIn',
    current: '0',
    target: '50',
    unit: 'leads/mois',
    trend: 'up',
    progress: 0,
    icon: 'ri-user-add-line',
    color: 'secondary',
  },
  {
    label: 'WhatsApp Hubs',
    current: '0',
    target: '5 000',
    unit: 'DAF',
    trend: 'up',
    progress: 0,
    icon: 'ri-whatsapp-line',
    color: 'accent',
  },
  {
    label: 'MRR Impact',
    current: '0',
    target: '60M',
    unit: 'FCFA',
    trend: 'up',
    progress: 0,
    icon: 'ri-money-dollar-circle-line',
    color: 'primary',
  },
  {
    label: 'Domain Authority',
    current: '2',
    target: '45',
    unit: 'DA Ahrefs',
    trend: 'up',
    progress: 4,
    icon: 'ri-bar-chart-fill',
    color: 'secondary',
  },
  {
    label: 'Domain Rating',
    current: '2',
    target: '50',
    unit: 'DR Ahrefs',
    trend: 'up',
    progress: 4,
    icon: 'ri-bar-chart-grouped-line',
    color: 'accent',
  },
  {
    label: 'Rule of 40',
    current: '0',
    target: '365',
    unit: '>> 40',
    trend: 'up',
    progress: 0,
    icon: 'ri-rocket-line',
    color: 'primary',
  },
  {
    label: 'Taux réponse Outreach',
    current: '0',
    target: '20%',
    unit: 'taux réponse',
    trend: 'up',
    progress: 0,
    icon: 'ri-mail-check-line',
    color: 'secondary',
  },
];

const channelPhases = [
  {
    channel: 'AO/AMI Procurement',
    icon: 'ri-file-search-line',
    color: 'accent' as const,
    actions: [
      { day: 'J+7', label: 'Script scrape AO quotidien + Slack alert', done: false },
      { day: 'J+14', label: 'CSV 1000 Procurement Officers + séquence outreach 5 touches', done: false },
      { day: 'J+60', label: 'Badge Référencé BCEAO/BEAC — MoU Formation Régulateurs', done: false },
    ],
  },
  {
    channel: 'IA Citations + SGE',
    icon: 'ri-robot-line',
    color: 'primary' as const,
    actions: [
      { day: 'J+1', label: 'llms.txt V2 — Entity Stacking + Wikidata/Crunchbase', done: true },
      { day: 'J+3', label: 'Schema.org Organization + Person sur toutes pages', done: true },
      { day: 'J+21', label: '1000 pages /questions/[slug] avec Answer Schema', done: false },
      { day: 'J+30', label: '10 communiqués Données Propriétaires → 100 citations presse', done: false },
    ],
  },
  {
    channel: 'Réseaux Sociaux',
    icon: 'ri-share-line',
    color: 'secondary' as const,
    actions: [
      { day: 'J+1', label: 'Post LinkedIn #1 SIMDA — Hook douleur BCEAO', done: false },
      { day: 'J+7', label: 'Création 8 WhatsApp Hubs Pays — "DAF KOS Togo", etc.', done: false },
      { day: 'J+14', label: 'X/Twitter @KhepraKOS — 3 posts/jour data bites', done: false },
      { day: 'J+30', label: '50 leads/mois entrants LinkedIn', done: false },
    ],
  },
  {
    channel: 'Communication Digitale',
    icon: 'ri-megaphone-line',
    color: 'accent' as const,
    actions: [
      { day: 'J+1', label: 'Newsroom — 3 articles/semaine format Big Four', done: true },
      { day: 'J+21', label: 'Webinaire mensuel "Art.49 BCEAO 2026" — 500 inscrits', done: false },
      { day: 'J+21', label: 'Ads LinkedIn ABM 1000 comptes — 50€/jour', done: false },
    ],
  },
];

const colorMap: Record<string, string> = {
  accent: 'bg-accent-500',
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
};

const barColorMap: Record<string, string> = {
  accent: 'bg-accent-500',
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
};

const glowMap: Record<string, string> = {
  accent: 'shadow-[0_0_12px_rgba(var(--accent-500),0.3)]',
  primary: 'shadow-[0_0_12px_rgba(var(--primary-500),0.3)]',
  secondary: 'shadow-[0_0_12px_rgba(var(--secondary-500),0.3)]',
};

export default function Visibilite100Page() {
  const [currentDate] = useState(new Date());
  const dayOffset = Math.floor((currentDate.getTime() - new Date('2026-07-02').getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <SeoHead
        title="Visibilité 100% — Dashboard Big Four | Khepra Experts"
        description="Dashboard de pilotage visibilité 100% : AO/AMI, IA Citations, Google SGE, Réseaux Sociaux, Communication Digitale. KPIs J+90."
        keywords="dashboard visibilité, AO AMI, citations IA, SGE, LinkedIn, Khepra Experts"
        canonicalPath="/visibilite-100"
        ogType="website"
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-900 text-xs font-semibold tracking-wider uppercase mb-3">
                    Dashboard Big Four — Visibilité 100%
                  </span>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
                    Dominer AO/AMI + IA + Réseaux + Digitale
                  </h1>
                  <p className="text-foreground-600 mt-2">
                    Date pivot : 02 Juillet 2026 — Deadline J+90 pour prise de marché UEMOA/CEMAC RegTech
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-4 py-2 rounded-lg bg-background-100 text-foreground-600">
                    <span className="font-medium">Jour</span>{' '}
                    <span className="text-primary-600 font-bold">{dayOffset >= 0 ? `J+${dayOffset}` : `J${dayOffset}`}</span>
                    <span className="text-foreground-400">/ J+90</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-accent-100 text-accent-900 font-medium">
                    Status : {dayOffset >= 7 ? 'PHASE 2 — IA + SGE' : 'PHASE 1 — CASH IMMÉDIAT'}
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {visibilityKpis.map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-lg border border-background-200 p-4 hover:border-primary-200 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg ${barColorMap[kpi.color]} bg-opacity-15 flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-sm`} style={{ color: `var(--${kpi.color}-500)` }}></i>
                    </div>
                    <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-500' : 'text-foreground-400'}`}>
                      {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                  <div className="text-xs text-foreground-500 mb-1">{kpi.label}</div>
                  <div className="text-xl font-bold text-foreground-950 mb-1">
                    {kpi.current}
                    <span className="text-xs font-normal text-foreground-400 ml-1">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-foreground-400 mb-2">
                    <span>Cible : {kpi.target}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-background-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${barColorMap[kpi.color]}`}
                      style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Channel Execution Plan */}
            <h2 className="text-2xl font-heading font-bold text-foreground-950 mb-6">
              Plan d'Exécution par Canal — J+1 à J+90
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {channelPhases.map((channel) => (
                <div key={channel.channel} className="bg-white rounded-lg border border-background-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${barColorMap[channel.color]} flex items-center justify-center`}>
                      <i className={`${channel.icon} text-lg text-background-50`}></i>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground-950 text-base">{channel.channel}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {channel.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          action.done ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-400'
                        }`}>
                          <i className={`text-[10px] ${action.done ? 'ri-check-line' : 'ri-time-line'}`}></i>
                        </span>
                        <div className="flex-1">
                          <span className={`text-xs font-medium ${action.done ? 'text-green-700' : 'text-foreground-400'} mr-1.5`}>
                            {action.day}
                          </span>
                          <span className={`text-sm ${action.done ? 'text-foreground-600' : 'text-foreground-500'}`}>
                            {action.label}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg border border-background-200 p-6 mb-12">
              <h3 className="text-lg font-heading font-bold text-foreground-950 mb-4">
                Accès rapides — Outils Visibilité 100%
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Newsroom', to: '/newsroom', icon: 'ri-article-line' },
                  { label: 'Pricing', to: '/pricing', icon: 'ri-price-tag-3-line' },
                  { label: 'Scan Gratuit', to: '/scan', icon: 'ri-scan-line' },
                  { label: 'Blog', to: '/blog', icon: 'ri-news-line' },
                  { label: 'Baromètre BCEAO', to: '/barometre-bceao-2026', icon: 'ri-file-chart-line' },
                  { label: 'Contact SIMDA', to: '/contact', icon: 'ri-mail-line' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-50 border border-background-200 text-sm text-foreground-700 hover:border-primary-300 hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Rule of 40 Calculator */}
            <div className="bg-white rounded-lg border border-background-200 p-6">
              <h3 className="text-lg font-heading font-bold text-foreground-950 mb-4">
                Rule of 40 — Valorisation Licorne
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-background-50">
                  <div className="text-3xl font-bold text-accent-500 mb-1">300%</div>
                  <div className="text-xs text-foreground-500">Croissance J+90</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background-50">
                  <div className="text-3xl font-bold text-primary-500 mb-1">65%</div>
                  <div className="text-xs text-foreground-500">Marge</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background-50">
                  <div className="text-3xl font-bold text-secondary-500 mb-1">365</div>
                  <div className="text-xs text-foreground-500">Rule of 40 Score</div>
                </div>
              </div>
              <p className="text-sm text-foreground-500 mt-4 text-center">
                365 &gt;&gt; 40 → Statut Licorne atteignable. Valorisation cible : 5 Milliards FCFA.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}