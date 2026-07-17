import { useState } from 'react';
import { autoLearningCycles, learningStats, crossDomainLearning, autoCurriculum, selfImprovementLog, learningDomains } from '@/mocks/kosAutoLearningEngine';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Cycles Apprentissage', 'Curriculum Auto', 'Cross-Domain', 'Self-Improvement Log', 'Domaines'];

export default function KOSAutoLearningEnginePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-brain-line text-accent-600 text-xl"></i>
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-600 bg-accent-100 px-3 py-1 rounded-full">Hub 95</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">KOS Auto-Learning Engine<span className="text-accent-500">™</span></h1>
            <p className="text-foreground-600 text-base max-w-3xl">Moteur d&apos;apprentissage autonome — KOS apprend, absorbe et s&apos;améliore sans intervention humaine. 247 cycles complétés, 184 523 unités de connaissance accumulées.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Cycles Complétés', value: learningStats.totalCycles, icon: 'ri-loop-left-line', color: 'bg-accent-100 text-accent-600' },
            { label: 'Unités Connaissance', value: `${(learningStats.totalKnowledgeUnits / 1000).toFixed(0)}k`, icon: 'ri-database-2-line', color: 'bg-primary-100 text-primary-600' },
            { label: 'Confiance Moyenne', value: `${learningStats.averageConfidence}%`, icon: 'ri-shield-check-line', color: 'bg-secondary-100 text-secondary-600' },
            { label: 'Vélocité', value: `${learningStats.learningVelocity}/j`, icon: 'ri-speed-up-line', color: 'bg-accent-100 text-accent-600' },
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

        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Cycles Apprentissage' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-foreground-950">Cycles Récents — {autoLearningCycles.length} cycles</h3>
              <span className="text-xs text-foreground-500">{learningStats.cyclesThisMonth} ce mois</span>
            </div>
            {autoLearningCycles.map(cycle => (
              <div key={cycle.id} onClick={() => setSelectedCycle(selectedCycle === cycle.id ? null : cycle.id)} className="bg-background-50 border border-background-200/70 rounded-lg p-4 hover:border-accent-200 cursor-pointer transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${cycle.status === 'completed' ? 'bg-accent-500' : 'bg-secondary-500 animate-pulse'}`}></div>
                    <div>
                      <div className="font-semibold text-foreground-950 text-sm">{cycle.domain}</div>
                      <div className="text-xs text-foreground-500">{cycle.source}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground-950">{cycle.knowledgeAbsorbed} unités</div>
                    <div className="text-xs text-accent-600">{cycle.confidence}% confiance</div>
                  </div>
                </div>
                {selectedCycle === cycle.id && (
                  <div className="mt-3 pt-3 border-t border-background-200/70 grid grid-cols-3 gap-3 text-xs">
                    <div><span className="text-foreground-500">Validé par</span><br/><span className="font-medium text-foreground-900">{cycle.validatedBy}</span></div>
                    <div><span className="text-foreground-500">Date</span><br/><span className="font-medium text-foreground-900">{cycle.date}</span></div>
                    <div><span className="text-foreground-500">Statut</span><br/><span className={`font-medium ${cycle.status === 'completed' ? 'text-accent-600' : 'text-secondary-600'}`}>{cycle.status === 'completed' ? 'Complété' : 'En cours'}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Curriculum Auto' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Programme Auto-Généré — 5 Modules Prioritaires</h3>
            {autoCurriculum.map(mod => (
              <div key={mod.module} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${mod.priority === 'P0' ? 'bg-red-100 text-red-700' : mod.priority === 'P1' ? 'bg-secondary-100 text-secondary-700' : 'bg-background-200 text-foreground-600'}`}>{mod.priority}</span>
                      <span className="font-semibold text-foreground-950 text-sm">{mod.module}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-foreground-500">
                      <span><i className="ri-time-line mr-1"></i>{mod.estimatedHours}h</span>
                      <span><i className="ri-robot-2-line mr-1"></i>{mod.agents} agents</span>
                      <span><i className="ri-git-branch-line mr-1"></i>{mod.dependencies.join(', ')}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-accent-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent-600">{Math.floor(Math.random() * 60 + 20)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Cross-Domain' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Transferts Cross-Domain — {crossDomainLearning.length} connexions</h3>
            {crossDomainLearning.map(cd => (
              <div key={`${cd.from}-${cd.to}`} className="bg-background-50 border border-background-200/70 rounded-lg p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground-900">{cd.from}</span>
                    <i className="ri-arrow-right-line text-foreground-400"></i>
                    <span className="font-medium text-foreground-900">{cd.to}</span>
                  </div>
                  <div className="text-xs text-foreground-500 mt-1">{cd.transfers} transferts</div>
                </div>
                <div className="w-24">
                  <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: `${cd.impact}%` }}></div>
                  </div>
                  <div className="text-xs text-accent-600 font-medium text-right mt-1">Impact {cd.impact}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Self-Improvement Log' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Journal Auto-Amélioration</h3>
            {selfImprovementLog.map(log => (
              <div key={log.id} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${log.status === 'resolved' ? 'bg-accent-500' : 'bg-secondary-500 animate-pulse'}`}></span>
                  <span className="text-xs text-foreground-500">{log.date}</span>
                </div>
                <div className="text-sm font-semibold text-foreground-950 mb-1">{log.action}</div>
                <div className="text-xs text-foreground-500 mb-2"><i className="ri-flashlight-line mr-1"></i>Déclencheur : {log.trigger}</div>
                <div className="text-xs text-accent-600 font-medium"><i className="ri-check-double-line mr-1"></i>{log.resolution}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Domaines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningDomains.map(domain => (
              <div key={domain.name} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground-950 text-sm">{domain.name}</span>
                  <span className="text-sm font-bold text-accent-600">{domain.coverage}%</span>
                </div>
                <div className="h-2 bg-background-200 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: `${domain.coverage}%` }}></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-foreground-500">Vélocité</span><br/><span className="font-semibold text-foreground-900">{domain.velocity}/j</span></div>
                  <div><span className="text-foreground-500">Agents</span><br/><span className="font-semibold text-foreground-900">{domain.agents}</span></div>
                  <div><span className="text-foreground-500">Cycles</span><br/><span className="font-semibold text-foreground-900">{domain.cycles}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}