import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  managingPartnerDecisions,
  executiveCopilotTasks,
  executiveContentItems,
  strategicAlerts,
  earlyWarnings,
  strategicMemories,
} from '@/mocks/kosManagingPartnerOffice';

type Tab = 'decisions' | 'copilot' | 'content' | 'alerts' | 'earlywarnings' | 'memory';

export default function KOSManagingPartnerOfficePage() {
  const [activeTab, setActiveTab] = useState<Tab>('decisions');
  const [selectedDecision, setSelectedDecision] = useState(managingPartnerDecisions[0]);
  const [selectedCopilot, setSelectedCopilot] = useState(executiveCopilotTasks[0]);
  const [selectedContent, setSelectedContent] = useState(executiveContentItems[0]);
  const [selectedAlert, setSelectedAlert] = useState(strategicAlerts[0]);
  const [selectedWarning, setSelectedWarning] = useState(earlyWarnings[0]);
  const [selectedMemory, setSelectedMemory] = useState(strategicMemories[0]);

  const getPriorityBadge = (priority: string) => {
    const map: Record<string, string> = {
      'Critique': 'bg-red-100 text-red-700',
      'Haute': 'bg-orange-100 text-orange-700',
      'Moyenne': 'bg-yellow-100 text-yellow-700',
      'Faible': 'bg-green-100 text-green-700',
      'Planifié': 'bg-background-100 text-foreground-600',
    };
    return map[priority] || 'bg-background-100 text-foreground-600';
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      'En cours': 'bg-secondary-100 text-secondary-900',
      'Planifié': 'bg-background-100 text-foreground-600',
      'En négociation': 'bg-accent-100 text-accent-900',
      'Publié': 'bg-green-100 text-green-700',
      'En relecture': 'bg-yellow-100 text-yellow-700',
      'En rédaction': 'bg-orange-100 text-orange-700',
      'Brouillon': 'bg-background-100 text-foreground-500',
      'Actif': 'bg-red-100 text-red-700',
      'Surveillance': 'bg-yellow-100 text-yellow-700',
      'Résolu': 'bg-green-100 text-green-700',
    };
    return map[status] || 'bg-background-100 text-foreground-600';
  };

  const getUrgencyBadge = (urgency: string) => {
    const map: Record<string, string> = {
      'Critique': 'bg-red-100 text-red-700',
      'Haute': 'bg-orange-100 text-orange-700',
      'Moyenne': 'bg-yellow-100 text-yellow-700',
      'Faible': 'bg-green-100 text-green-700',
    };
    return map[urgency] || 'bg-background-100 text-foreground-600';
  };

  const getSeverityColor = (severity: string) => {
    const map: Record<string, string> = {
      'Haute': 'text-red-600',
      'Moyenne': 'text-yellow-600',
      'Faible': 'text-green-600',
    };
    return map[severity] || 'text-foreground-600';
  };

  const getContentTypeIcon = (type: string) => {
    const map: Record<string, string> = {
      'LinkedIn Post — Managing Partner': 'ri-linkedin-box-fill',
      'Position Paper — Think Tank': 'ri-article-line',
      'Keynote — Conférence': 'ri-slideshow-line',
      'Newsletter DG': 'ri-mail-line',
      'Tribune — Jeune Afrique Business+': 'ri-newspaper-line',
      'Board Memo': 'ri-file-text-line',
    };
    return map[type] || 'ri-file-line';
  };

  const getMemoryTypeIcon = (type: string) => {
    const map: Record<string, string> = {
      'Leçon Apprise': 'ri-lightbulb-line',
      'Intelligence Stratégique': 'ri-brain-line',
      'Décision Stratégique': 'ri-scales-line',
      'Méthodologie': 'ri-tools-line',
      'Vision & Doctrine': 'ri-compass-line',
      'Intelligence Concurrentielle': 'ri-eye-line',
    };
    return map[type] || 'ri-bookmark-line';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'decisions', label: 'Décisions DG', icon: 'ri-building-4-line', count: managingPartnerDecisions.length },
    { id: 'copilot', label: 'Copilote Exécutif', icon: 'ri-robot-line', count: executiveCopilotTasks.length },
    { id: 'content', label: 'Studio Contenu', icon: 'ri-quill-pen-line', count: executiveContentItems.length },
    { id: 'alerts', label: 'Alertes Stratégiques', icon: 'ri-alert-line', count: strategicAlerts.filter(a => a.decision_required).length },
    { id: 'earlywarnings', label: 'Alertes Précoces', icon: 'ri-pulse-line', count: earlyWarnings.filter(w => w.status === 'Actif').length },
    { id: 'memory', label: 'Mémoire Stratégique', icon: 'ri-archive-line', count: strategicMemories.length },
  ];

  return (
    <KOSHubLayout hubId={1}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-government-line"></i>KOS Phase 4 — Managing Partner & Executive Office
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Managing Partner & Executive Office</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Décisions DG, Copilote IA Exécutif, Studio de Contenu, Alertes Stratégiques, Système d'Alerte Précoce, Mémoire Stratégique — 
                le cockpit de la Direction Générale KHEPRA EXPERTS.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{managingPartnerDecisions.length}</div>
                <div className="text-xs text-foreground-500">Décisions actives</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{earlyWarnings.filter(w => w.status === 'Actif').length}</div>
                <div className="text-xs text-foreground-500">Alertes actives</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{executiveCopilotTasks.reduce((s, t) => s + (t.feedback_score || 0), 0) / executiveCopilotTasks.length}</div>
                <div className="text-xs text-foreground-500">Score Copilote</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== ONGLET 1 : DÉCISIONS DG ===== */}
        {activeTab === 'decisions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-building-4-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Tableau de Décision Exécutive</h3>
                  <p className="text-xs text-foreground-500">Décisions stratégiques en cours</p>
                </div>
              </div>
              {managingPartnerDecisions.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDecision(d)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDecision.id === d.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{d.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityBadge(d.priority)}`}>{d.priority}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{d.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-medium ${getStatusBadge(d.status)} px-2 py-0.5 rounded-full`}>{d.status}</span>
                    <span className="text-xs text-foreground-500">{d.assigned_to.split('—')[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDecision.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityBadge(selectedDecision.priority)}`}>{selectedDecision.priority}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedDecision.status)}`}>{selectedDecision.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedDecision.title}</h2>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Synthèse</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedDecision.summary}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedDecision.recommendations}</p>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                  <h4 className="text-sm font-semibold text-accent-700 mb-2">Impact KPI</h4>
                  <p className="text-sm text-foreground-600">{selectedDecision.kpi_impact}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Assigné à : {selectedDecision.assigned_to}</span>
                  <span className="text-xs text-foreground-400">MàJ {new Date(selectedDecision.updated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : COPILOTE EXÉCUTIF ===== */}
        {activeTab === 'copilot' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-robot-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Executive Copilot™</h3>
                  <p className="text-xs text-foreground-500">Assistant IA du Managing Partner</p>
                </div>
              </div>
              {executiveCopilotTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedCopilot(t)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCopilot.id === t.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{t.task_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityBadge(t.priority)}`}>{t.priority}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{t.request_summary}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">{t.response_time_seconds}s</span>
                    <span className="text-xs font-bold text-primary-600">{t.feedback_score}/10</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCopilot.task_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityBadge(selectedCopilot.priority)}`}>{selectedCopilot.priority}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCopilot.request_summary}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-primary-600">{selectedCopilot.response_time_seconds}s</div>
                    <div className="text-xs text-foreground-500">Temps réponse</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{selectedCopilot.feedback_score}/10</div>
                    <div className="text-xs text-foreground-500">Score Qualité</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">
                      {new Date(selectedCopilot.completed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                    <div className="text-xs text-foreground-500">Terminé le</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Réponse du Copilote</h4>
                  <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                    <p className="text-sm text-foreground-700 leading-relaxed whitespace-pre-line">{selectedCopilot.response_content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : STUDIO CONTENU ===== */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                  <i className="ri-quill-pen-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Executive Content Studio™</h3>
                  <p className="text-xs text-foreground-500">Production intellectuelle DG</p>
                </div>
              </div>
              {executiveContentItems.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedContent(c)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedContent.id === c.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{c.content_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(c.status)}`}>{c.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{c.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{c.topic}</span>
                    {c.quality_score > 0 && <span className="text-xs font-bold text-secondary-600 ml-auto">{c.quality_score}/10</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                    <i className={`${getContentTypeIcon(selectedContent.content_type)} text-lg`}></i>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedContent.content_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedContent.status)}`}>{selectedContent.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedContent.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">{selectedContent.topic}</div>
                    <div className="text-xs text-foreground-500">Thème</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">{selectedContent.target_audience}</div>
                    <div className="text-xs text-foreground-500">Audience</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">{selectedContent.author}</div>
                    <div className="text-xs text-foreground-500">Auteur</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">{selectedContent.scheduled_date}</div>
                    <div className="text-xs text-foreground-500">Date cible</div>
                  </div>
                </div>
                {selectedContent.quality_score > 0 && (
                  <div className="mb-4 p-4 bg-secondary-50/50 rounded-lg border border-secondary-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground-950">Score Qualité</span>
                      <span className="text-lg font-bold text-secondary-600">{selectedContent.quality_score}/10</span>
                    </div>
                  </div>
                )}
                {selectedContent.published_url && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2">
                      <i className="ri-links-line text-green-600"></i>
                      <span className="text-sm text-green-700">Publié — </span>
                      <a href={selectedContent.published_url} target="_blank" rel="nofollow noopener" className="text-sm text-green-600 underline font-medium">{selectedContent.published_url}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : ALERTES STRATÉGIQUES ===== */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-alert-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Strategic Alert Engine™</h3>
                  <p className="text-xs text-foreground-500">Intelligence & Opportunités</p>
                </div>
              </div>
              {strategicAlerts.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAlert(a)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAlert.id === a.id ? 'border-red-300 bg-red-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{a.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUrgencyBadge(a.urgency)}`}>{a.urgency}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{a.alert_title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    {a.decision_required && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Décision requise</span>}
                    {a.acknowledged_by && <span className="text-xs text-foreground-500 ml-auto">✓ Acquitté</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAlert.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUrgencyBadge(selectedAlert.urgency)}`}>{selectedAlert.urgency}</span>
                  {selectedAlert.decision_required ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium ml-auto">Décision requise</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium ml-auto">Information</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedAlert.alert_title}</h2>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Résumé</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAlert.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-accent-50/50 rounded-lg border border-accent-100">
                    <div className="text-xs text-foreground-500 mb-1">Zone d'Impact</div>
                    <div className="text-sm font-semibold text-accent-700">{selectedAlert.impact_area}</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Acquitté par</div>
                    <div className="text-sm font-semibold text-foreground-950">{selectedAlert.acknowledged_by || 'En attente'}</div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-semibold text-orange-700 mb-2">Réponse Recommandée</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAlert.recommended_response}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : ALERTES PRÉCOCES ===== */}
        {activeTab === 'earlywarnings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <i className="ri-pulse-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Early Warning System™</h3>
                  <p className="text-xs text-foreground-500">Détection précoce des signaux faibles</p>
                </div>
              </div>
              {earlyWarnings.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWarning(w)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedWarning.id === w.id ? 'border-orange-300 bg-orange-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{w.warning_type}</span>
                    <span className={`text-xs font-bold ${getSeverityColor(w.severity)}`}>{w.severity}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{w.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(w.status)}`}>{w.status}</span>
                    <span className="text-xs text-foreground-500">{w.trigger_value}% / seuil {w.threshold_value}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedWarning.warning_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedWarning.status)}`}>{selectedWarning.status}</span>
                  <span className={`text-xs font-bold ml-auto ${getSeverityColor(selectedWarning.severity)}`}>Sévérité {selectedWarning.severity}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedWarning.title}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className={`text-2xl font-bold ${getSeverityColor(selectedWarning.severity)}`}>{selectedWarning.trigger_value}%</div>
                    <div className="text-xs text-foreground-500">Valeur déclenchée</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedWarning.threshold_value}%</div>
                    <div className="text-xs text-foreground-500">Seuil configuré</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="w-full h-3 bg-background-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${selectedWarning.severity === 'Haute' ? 'bg-red-500' : selectedWarning.severity === 'Moyenne' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(selectedWarning.trigger_value, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-xs text-foreground-500 mb-1">Source de détection</div>
                  <div className="text-sm font-semibold text-foreground-950">{selectedWarning.detection_source}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-semibold text-orange-700 mb-2">Action Recommandée</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedWarning.recommended_action}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : MÉMOIRE STRATÉGIQUE ===== */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-archive-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Strategic Memory™</h3>
                  <p className="text-xs text-foreground-500">Capital intellectuel institutionnel</p>
                </div>
              </div>
              {strategicMemories.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMemory(m)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedMemory.id === m.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{m.memory_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      m.importance_level === 'Fondamental' ? 'bg-red-100 text-red-700' :
                      m.importance_level === 'Critique' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{m.importance_level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{m.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">{m.retrieval_count} consultations</span>
                    <span className="text-xs text-foreground-400 ml-auto">{m.tags.split(',')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <i className={`${getMemoryTypeIcon(selectedMemory.memory_type)} text-lg`}></i>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedMemory.memory_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${
                    selectedMemory.importance_level === 'Fondamental' ? 'bg-red-100 text-red-700' :
                    selectedMemory.importance_level === 'Critique' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{selectedMemory.importance_level}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedMemory.title}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedMemory.retrieval_count}</div>
                    <div className="text-xs text-foreground-500">Consultations</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">
                      {new Date(selectedMemory.last_accessed).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                    <div className="text-xs text-foreground-500">Dernier accès</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-semibold text-foreground-950">
                      {new Date(selectedMemory.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-foreground-500">Créé le</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedMemory.tags.split(',').map((tag: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-200">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-semibold text-amber-700 mb-2">Contenu</h4>
                  <p className="text-sm text-foreground-700 leading-relaxed whitespace-pre-line">{selectedMemory.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Managing Partner Office</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Décisions en cours</span>
                <span className="text-xs font-bold text-foreground-950">{managingPartnerDecisions.filter(d => d.status === 'En cours').length}/{managingPartnerDecisions.length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(managingPartnerDecisions.filter(d => d.status === 'En cours').length / managingPartnerDecisions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Score Copilote</span>
                <span className="text-xs font-bold text-foreground-950">{(executiveCopilotTasks.reduce((s, t) => s + (t.feedback_score || 0), 0) / executiveCopilotTasks.length).toFixed(1)}/10</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(executiveCopilotTasks.reduce((s, t) => s + (t.feedback_score || 0), 0) / executiveCopilotTasks.length) * 10}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Contenu publié</span>
                <span className="text-xs font-bold text-foreground-950">{executiveContentItems.filter(c => c.status === 'Publié').length}/{executiveContentItems.length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${(executiveContentItems.filter(c => c.status === 'Publié').length / executiveContentItems.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Alertes actives</span>
                <span className="text-xs font-bold text-foreground-950">{earlyWarnings.filter(w => w.status === 'Actif').length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${(earlyWarnings.filter(w => w.status === 'Actif').length / earlyWarnings.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}