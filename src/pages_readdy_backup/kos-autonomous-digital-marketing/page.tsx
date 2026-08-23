import { useState } from 'react';
import { marketingAutopilotStatus, activeCampaigns, contentAutoProduction, seoAutopilotMetrics, socialAutoMetrics, emailNurturingStats } from '@/mocks/autonomousDigitalMarketing';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Campagnes', 'Production Contenu', 'SEO Autopilot', 'Réseaux Sociaux', 'Email Nurturing'];

export default function autonomousDigitalMarketingPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-megaphone-line text-accent-600 text-xl"></i>
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-600 bg-accent-100 px-3 py-1 rounded-full">Hub 97</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">KOS Autonomous Digital Marketing Command<span className="text-accent-500">™</span></h1>
            <p className="text-foreground-600 text-base max-w-3xl">Marketing & Communication 100% autonome — 8 canaux actifs, 14 contenus publiés aujourd&apos;hui, 6 campagnes en cours, 47 leads générés aujourd&apos;hui, coût par lead : 0 FCFA.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Leads Aujourd\'hui', value: marketingAutopilotStatus.leadsGeneratedToday, icon: 'ri-user-add-line', color: 'bg-accent-100 text-accent-600' },
            { label: 'Taux Conversion', value: `${marketingAutopilotStatus.conversionRate}%`, icon: 'ri-line-chart-line', color: 'bg-primary-100 text-primary-600' },
            { label: 'Impressions / Mois', value: `${(marketingAutopilotStatus.monthlyImpressions / 1000).toFixed(0)}k`, icon: 'ri-eye-line', color: 'bg-secondary-100 text-secondary-600' },
            { label: 'Engagement', value: `${marketingAutopilotStatus.engagementRate}%`, icon: 'ri-heart-line', color: 'bg-accent-100 text-accent-600' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className={`w-8 h-8 rounded-md ${stat.color} flex items-center justify-center mb-2`}>
                  <i className={`${stat.icon} text-sm`}></i>
                </div>
                <div className="text-2xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-600">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
          <i className="ri-robot-2-line text-accent-600 text-lg"></i>
          <div>
            <div className="text-sm font-semibold text-foreground-950">Statut : {marketingAutopilotStatus.status === 'fully_autonomous' ? '100% Autonome' : 'Partiel'}</div>
            <div className="text-xs text-foreground-600">Uptime : {marketingAutopilotStatus.uptime} | Coût par lead : {marketingAutopilotStatus.costPerLead} FCFA | ROI : ∞</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Campagnes' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">{activeCampaigns.length} Campagnes Actives — Zéro Budget</h3>
            {activeCampaigns.map(campaign => (
              <div key={campaign.id} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                      <span className="font-semibold text-foreground-950 text-sm">{campaign.name}</span>
                    </div>
                    <div className="text-xs text-foreground-500">{campaign.channel} | Démarrée {campaign.startDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent-600">ROI ∞</div>
                    <div className="text-xs text-foreground-500">Budget {campaign.budget} FCFA</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-foreground-500">Leads</span><br/><span className="font-bold text-foreground-900">{campaign.leads}</span></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-foreground-500">Conversion</span><br/><span className="font-bold text-accent-600">{campaign.conversion}%</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Production Contenu' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Production Automatique — 8 Types de Contenus</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left p-3 text-foreground-600">Type</th>
                    <th className="text-center p-3 text-foreground-600">Aujourd&apos;hui</th>
                    <th className="text-center p-3 text-foreground-600">Cette Semaine</th>
                    <th className="text-center p-3 text-foreground-600">Ce Mois</th>
                    <th className="text-center p-3 text-foreground-600">Qualité</th>
                    <th className="text-center p-3 text-foreground-600">Perf.</th>
                  </tr>
                </thead>
                <tbody>
                  {contentAutoProduction.map(row => (
                    <tr key={row.type} className="border-b border-background-100 hover:bg-background-50">
                      <td className="p-3 font-semibold text-foreground-900">{row.type}</td>
                      <td className="p-3 text-center font-bold text-accent-600">{row.today}</td>
                      <td className="p-3 text-center text-foreground-900">{row.thisWeek}</td>
                      <td className="p-3 text-center text-foreground-900">{row.thisMonth}</td>
                      <td className="p-3 text-center"><span className="text-accent-600 font-bold">{row.avgQuality}%</span></td>
                      <td className="p-3 text-center text-xs text-foreground-500">{row.seoScore ? `SEO ${row.seoScore}` : row.engagement ? `Eng ${row.engagement}%` : row.openRate ? `Open ${row.openRate}%` : row.downloads ? `${row.downloads} DL` : row.shares ? `${row.shares} shares` : row.views ? `${row.views} vues` : row.listens ? `${row.listens} écoutes` : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'SEO Autopilot' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Mots-clés', value: seoAutopilotMetrics.keywordsTracked },
                { label: 'Top 3', value: seoAutopilotMetrics.top3Positions },
                { label: 'Top 10', value: seoAutopilotMetrics.top10Positions },
                { label: 'Position Moy.', value: seoAutopilotMetrics.avgPosition },
                { label: 'CTR', value: `${seoAutopilotMetrics.ctr}%` },
              ].map(m => (
                <div key={m.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-accent-600">{m.value}</div>
                  <div className="text-xs text-foreground-500">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                <div className="text-xs text-foreground-500 mb-1">Impressions / Mois</div>
                <div className="text-xl font-bold text-foreground-950">{seoAutopilotMetrics.impressionsMonthly.toLocaleString()}</div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                <div className="text-xs text-foreground-500 mb-1">Clics / Mois</div>
                <div className="text-xl font-bold text-foreground-950">{seoAutopilotMetrics.clicksMonthly.toLocaleString()}</div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                <div className="text-xs text-foreground-500 mb-1">Core Web Vitals</div>
                <div className="text-xl font-bold text-accent-600">LCP {seoAutopilotMetrics.coreWebVitals.lcp}s</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Réseaux Sociaux' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(socialAutoMetrics).map(([platform, data]) => (
              <div key={platform} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <i className={`ri-${platform === 'linkedin' ? 'linkedin' : platform === 'x' ? 'twitter-x' : platform === 'youtube' ? 'youtube' : 'facebook'}-fill text-xl text-foreground-700`}></i>
                  <span className="font-bold text-foreground-950 capitalize">{platform}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><span className="text-foreground-500">Followers</span><br/><span className="font-bold text-foreground-900">{data.followers.toLocaleString()}</span></div>
                  <div><span className="text-foreground-500">Nouveaux</span><br/><span className="font-bold text-accent-600">+{data.newFollowers} ce mois</span></div>
                  <div><span className="text-foreground-500">Posts / Mois</span><br/><span className="font-bold text-foreground-900">{data.postsThisMonth}</span></div>
                  <div><span className="text-foreground-500">Engagement</span><br/><span className="font-bold text-accent-600">{data.avgEngagement}%</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Email Nurturing' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Séquences', value: emailNurturingStats.sequences },
                { label: 'Contacts Actifs', value: emailNurturingStats.activeContacts.toLocaleString() },
                { label: 'Taux Ouverture', value: `${emailNurturingStats.avgOpenRate}%` },
                { label: 'Taux Clic', value: `${emailNurturingStats.avgClickRate}%` },
              ].map(m => (
                <div key={m.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-accent-600">{m.value}</div>
                  <div className="text-xs text-foreground-500">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Désabonnements', value: `${emailNurturingStats.unsubscribes}%` },
                { label: 'Conversion SQL', value: `${emailNurturingStats.conversionsToSQL}%` },
                { label: 'Emails Aujourd\'hui', value: emailNurturingStats.emailsSentToday },
                { label: 'Full Auto', value: emailNurturingStats.fullyAutomated ? '✅ Activé' : '⚠️ Partiel' },
              ].map(m => (
                <div key={m.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-foreground-950">{m.value}</div>
                  <div className="text-xs text-foreground-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



