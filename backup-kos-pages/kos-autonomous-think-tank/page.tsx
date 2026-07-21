import { useState } from 'react';
import { thinkTankStatus, researchPrograms, recentPublications, strategicForesight, thinkTankKPIs } from '@/mocks/autonomousThinkTank';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Programmes Recherche', 'Publications', 'Prospective', 'KPIs'];

export default function autonomousThinkTankPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-lightbulb-line text-accent-600 text-xl"></i>
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-600 bg-accent-100 px-3 py-1 rounded-full">Hub 98</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">KOS Autonomous Think Tank Factory<span className="text-accent-500">™</span></h1>
            <p className="text-foreground-600 text-base max-w-3xl">Think Tank 100% autonome — 8 programmes de recherche actifs, 127 publications, 234 citations académiques, 23 recommandations politiques. Production intellectuelle de niveau Big Four sans intervention humaine.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Programmes Actifs', value: thinkTankStatus.researchPrograms, icon: 'ri-focus-3-line', color: 'bg-accent-100 text-accent-600' },
            { label: 'Publications', value: thinkTankStatus.activePublications, icon: 'ri-article-line', color: 'bg-primary-100 text-primary-600' },
            { label: 'Citations', value: thinkTankStatus.citationsAcademiques, icon: 'ri-quote-text', color: 'bg-secondary-100 text-secondary-600' },
            { label: 'Qualité Recherche', value: `${thinkTankKPIs.researchQualityScore}/100`, icon: 'ri-medal-line', color: 'bg-accent-100 text-accent-600' },
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
          <i className="ri-brain-line text-accent-600 text-lg"></i>
          <div>
            <div className="text-sm font-semibold text-foreground-950">Positionnement Big Four : {thinkTankKPIs.bigFourBenchmarkPosition}</div>
            <div className="text-xs text-foreground-600">{thinkTankStatus.whitePapersInProgress} white papers en cours | {thinkTankStatus.conferencePapers} conférences | {thinkTankStatus.mediaMentions} mentions médias</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Programmes Recherche' && (
          <div className="space-y-4">
            {researchPrograms.map(prog => (
              <div key={prog.id} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground-500 bg-background-100 px-2 py-0.5 rounded">{prog.domain}</span>
                      <span className="font-semibold text-foreground-950 text-sm">{prog.title}</span>
                    </div>
                    <div className="text-xs text-foreground-500">Agent Lead : {prog.leadAgent}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent-600">{prog.progress}%</div>
                    <div className="text-xs text-foreground-500">complété</div>
                  </div>
                </div>
                <div className="h-2 bg-background-200 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: `${prog.progress}%` }}></div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-foreground-500">Publications</span><br/><span className="font-bold text-foreground-900">{prog.publications}</span></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-foreground-500">Citations</span><br/><span className="font-bold text-accent-600">{prog.citations}</span></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-foreground-500">Statut</span><br/><span className="font-bold text-accent-600">{prog.status === 'active' ? 'Actif' : prog.status}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Publications' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Dernières Publications — {recentPublications.length} récentes</h3>
            {recentPublications.map(pub => (
              <div key={pub.id} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent-600 bg-accent-100 px-2 py-0.5 rounded">{pub.type}</span>
                      <span className="text-xs text-foreground-500">{pub.date}</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground-950">{pub.title}</div>
                    <div className="text-xs text-foreground-500 mt-1">Auteur : {pub.author} | Programme : {pub.program}</div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-accent-600">
                      <i className="ri-download-line"></i>
                      <span className="text-lg font-bold">{pub.downloads}</span>
                    </div>
                    <div className="text-xs text-foreground-500">téléchargements</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Prospective' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Scénarios Prospectifs — Analyse Stratégique Autonome</h3>
            {strategicForesight.map(sf => (
              <div key={sf.scenario} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground-950 text-sm mb-1">{sf.scenario}</div>
                    <div className="flex items-center gap-3 text-xs text-foreground-500">
                      <span>Probabilité : <span className="font-bold text-foreground-900">{sf.probability}%</span></span>
                      <span>Impact : <span className="font-bold text-red-600">{sf.impact}</span></span>
                      <span>Horizon : <span className="font-bold text-foreground-900">{sf.horizon}</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-accent-600">{sf.readiness}%</div>
                    <div className="text-xs text-foreground-500">préparation</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sf.actions.map((action, i) => (
                    <span key={i} className="text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded">{action}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'KPIs' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Publications / Mois', value: thinkTankKPIs.publicationsPerMonth },
              { label: 'Téléchargements Moyens', value: thinkTankKPIs.avgDownloadsPerPublication },
              { label: 'Croissance Citations', value: `+${thinkTankKPIs.citationGrowth}%` },
              { label: 'Taux Reprise Médias', value: `${thinkTankKPIs.mediaHitRate}%` },
              { label: 'Adoption Politiques', value: `${thinkTankKPIs.policyAdoptionRate}%` },
              { label: 'Influence Prospects', value: `${thinkTankKPIs.prospectInfluenceRate}%` },
              { label: 'Score Qualité', value: `${thinkTankKPIs.researchQualityScore}/100` },
              { label: 'Autonomie', value: thinkTankStatus.fullyAutonomous ? '100%' : 'Partiel' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent-600 mb-1">{kpi.value}</div>
                <div className="text-xs text-foreground-600">{kpi.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}





