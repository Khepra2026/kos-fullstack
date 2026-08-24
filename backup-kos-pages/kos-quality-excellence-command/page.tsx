import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { qualityAssuranceReviews, expertReviews, humanizationScores, peerReviewSubmissions, peerReviewAssignments, peerReviewKPIs, complianceReviewSubmissions, executiveApprovalSubmissions, complianceReviewKPIs, executiveApprovalKPIs, type PeerReviewSubmission, type PeerReviewAssignment, type ComplianceReviewSubmission, type ExecutiveApprovalSubmission } from '@/mocks/qualityExcellence';

type Tab = 'quality' | 'expert' | 'humanization' | 'peer' | 'compliance' | 'executive';

export default function qualityExcellenceCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('quality');
  const [selectedQA, setSelectedQA] = useState(qualityAssuranceReviews[0]);
  const [selectedReview, setSelectedReview] = useState(expertReviews[0]);
  const [selectedHS, setSelectedHS] = useState(humanizationScores[0]);
  const [selectedPRSubmission, setSelectedPRSubmission] = useState<PeerReviewSubmission>(peerReviewSubmissions[0]);
  const [expandedReviewer, setExpandedReviewer] = useState<string | null>(null);
  const [selectedCRSubmission, setSelectedCRSubmission] = useState<ComplianceReviewSubmission>(complianceReviewSubmissions[0]);
  const [selectedEASubmission, setSelectedEASubmission] = useState<ExecutiveApprovalSubmission>(executiveApprovalSubmissions[0]);

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { approved: 'bg-green-100 text-green-700', approved_with_minor_edits: 'bg-yellow-100 text-yellow-700', corrections_requested: 'bg-orange-100 text-orange-700', rejected: 'bg-red-100 text-red-700', reviewed: 'bg-green-100 text-green-700', pending: 'bg-gray-100 text-gray-700', active: 'bg-green-100 text-green-700', in_progress: 'bg-secondary-100 text-secondary-900', completed: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-600', submitted: 'bg-blue-100 text-blue-700', in_review: 'bg-amber-100 text-amber-700', revisions_requested: 'bg-orange-100 text-orange-700', published: 'bg-green-100 text-green-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const getPRStatusLabel = (status: string) => {
    const map: Record<string, string> = { draft: 'Brouillon', submitted: 'Soumis', in_review: 'En Revue', revisions_requested: 'Corrections Demandées', approved: 'Approuvé', published: 'Publié', pending: 'En Attente', in_progress: 'En Cours', completed: 'Terminé' };
    return map[status] || status;
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'quality', label: 'Quality Assurance Authority', icon: 'ri-shield-check-line', count: qualityAssuranceReviews.length },
    { id: 'expert', label: 'Expert Reviewer', icon: 'ri-user-star-line', count: expertReviews.length },
    { id: 'humanization', label: 'Humanization Engine', icon: 'ri-emotion-line', count: humanizationScores.length },
    { id: 'peer', label: 'Peer Review', icon: 'ri-team-line', count: peerReviewSubmissions.length },
    { id: 'compliance', label: 'Compliance Review', icon: 'ri-scales-3-line', count: complianceReviewSubmissions.length },
    { id: 'executive', label: 'Executive Approval', icon: 'ri-vip-crown-line', count: executiveApprovalSubmissions.length },
  ];

  return (
    <hubLayout hubId={11}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-award-line"></i>
                KOS Phase 3 — Hyper-Automation
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Quality Excellence Command
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Contrôle qualité automatique, relecture senior simulée, humanisation des productions — l'excellence opérationnelle avant livraison client.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">5</div>
                <div className="text-xs text-foreground-500">BLOCS actifs</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">100%</div>
                <div className="text-xs text-foreground-500">Qualité cible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}<span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'quality' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-shield-check-line text-lg"></i></div>
                <div><h3 className="text-sm font-bold text-foreground-950">KOS Quality Assurance Authority™</h3><p className="text-xs text-foreground-500">BLOC 31 — Contrôle Qualité Automatique</p></div>
              </div>
              {qualityAssuranceReviews.map((qa) => (
                <div key={qa.id} onClick={() => setSelectedQA(qa)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedQA.id === qa.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{qa.deliverable_type}</span>
                    <span className={`text-sm font-bold ${getScoreColor(qa.overall_score)}`}>{qa.overall_score}/10</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{qa.deliverable_title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(qa.status)}`}>{qa.status}</span>
                    <span className="text-xs text-foreground-400">{qa.anomalies.length} anomalie{qa.anomalies.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedQA.status)}`}>{selectedQA.status}</span><span className="text-2xl font-bold ml-auto">{selectedQA.overall_score}/10</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedQA.deliverable_title}</h2>
                <p className="text-xs text-foreground-500 mb-6">Type : {selectedQA.deliverable_type}</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {[{ label: 'Méthodologie', val: selectedQA.methodological_coherence }, { label: 'Rédaction', val: selectedQA.editorial_quality }, { label: 'Standards', val: selectedQA.khepra_standards_compliance }, { label: 'Cohérence', val: selectedQA.recommendation_coherence }, { label: 'Références', val: selectedQA.reference_quality }].map((m) => (
                    <div key={m.label} className="p-3 bg-background-100 rounded-lg text-center">
                      <div className={`text-lg font-bold ${getScoreColor(m.val)}`}>{m.val}</div>
                      <div className="text-xs text-foreground-500">{m.label}</div>
                    </div>
                  ))}
                </div>
                {selectedQA.anomalies.length > 0 && (
                  <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-error-warning-line text-orange-500"></i>Anomalies Détectées</h4>
                    {selectedQA.anomalies.map((a, i) => (<div key={i} className="flex items-start gap-2 p-2 text-sm text-foreground-600"><i className="ri-close-circle-line text-red-400 flex-shrink-0 mt-0.5"></i>{a}</div>))}
                  </div>
                )}
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-lightbulb-line text-accent-500"></i>Améliorations Recommandées</h4>
                  {selectedQA.improvement_recommendations.map((r, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-accent-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{r}</p></div>))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expert' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-user-star-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Expert Reviewer™</h3><p className="text-xs text-foreground-500">BLOC 32 — Relecture Senior Big Four</p></div></div>
              {expertReviews.map((er) => (
                <div key={er.id} onClick={() => setSelectedReview(er)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedReview.id === er.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{er.reviewer_role}</span><span className={`text-sm font-bold ${getScoreColor(er.overall_rating)}`}>{er.overall_rating}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{er.review_type}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{er.simulated_perspective}</p>
                  <div className="mt-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(er.approval_status)}`}>{er.approval_status}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedReview.reviewer_role}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedReview.approval_status)}`}>{selectedReview.approval_status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedReview.review_type}</h2>
                <p className="text-xs text-foreground-500 mb-4">Perspective simulée : {selectedReview.simulated_perspective}</p>
                <div className="mb-4"><h4 className="text-sm font-semibold text-green-700 mb-2">Forces</h4>{selectedReview.strengths.map((s, i) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-check-line text-green-500"></i>{s}</div>))}</div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-orange-700 mb-2">Faiblesses</h4>{selectedReview.weaknesses.map((w, i) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-arrow-right-line text-orange-400"></i>{w}</div>))}</div>
                {selectedReview.critical_gaps.length > 0 && (<div className="mb-4"><h4 className="text-sm font-semibold text-red-700 mb-2">Écarts Critiques</h4>{selectedReview.critical_gaps.map((g, i) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-red-600"><i className="ri-close-circle-line text-red-500"></i>{g}</div>))}</div>)}
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Feedback Détaillé</h4><p className="text-sm text-foreground-600">{selectedReview.detailed_feedback}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'humanization' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-emotion-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Humanization Engine™</h3><p className="text-xs text-foreground-500">BLOC 33 — Ton Humain Professionnel</p></div></div>
              {humanizationScores.map((hs) => (
                <div key={hs.id} onClick={() => setSelectedHS(hs)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedHS.id === hs.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{hs.content_type}</span><span className={`text-sm font-bold ${getScoreColor(hs.overall_humanization)}`}>{hs.overall_humanization}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{hs.target_audience}</h4>
                  <p className="text-xs text-foreground-500 mt-1">Adaptation : {hs.audience_adaptation}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedHS.content_type}</span><span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedHS.audience_adaptation}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">Audience : {selectedHS.target_audience}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[{ label: 'Naturel', val: selectedHS.tone_naturalness }, { label: 'Fluidité', val: selectedHS.fluidity_score }, { label: 'Narration', val: selectedHS.narrative_coherence }, { label: 'Style Exécutif', val: selectedHS.executive_style_score }].map((m) => (
                    <div key={m.label} className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(m.val)}`}>{m.val}</div><div className="text-xs text-foreground-500">{m.label}</div></div>
                  ))}
                </div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-lightbulb-line text-secondary-500"></i>Suggestions d'Amélioration</h4>
                  {selectedHS.improvement_suggestions.map((s, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-secondary-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-secondary-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{s}</p></div>))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'peer' && (
          <div>
            {/* Peer Review Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{peerReviewKPIs.active_submissions}</div>
                <div className="text-xs text-foreground-500">Soumissions Actives</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{peerReviewKPIs.total_reviewers}</div>
                <div className="text-xs text-foreground-500">Réviseurs</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{peerReviewKPIs.on_time_rate}%</div>
                <div className="text-xs text-foreground-500">À l'heure</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{peerReviewKPIs.avg_review_time_hours}h</div>
                <div className="text-xs text-foreground-500">Délai Revue Moy.</div>
              </div>
            </div>

            {/* Submissions + Reviewers split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions List */}
              <div className="lg:col-span-1 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-team-line text-lg"></i></div>
                  <div><h3 className="text-sm font-bold text-foreground-950">BLOC 3 — Peer Review Workflow</h3><p className="text-xs text-foreground-500">Revue par les pairs avant publication</p></div>
                </div>
                {peerReviewSubmissions.map((s) => (
                  <div key={s.id} onClick={() => setSelectedPRSubmission(s)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedPRSubmission.id === s.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.content_type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(s.status)}`}>{getPRStatusLabel(s.status)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{s.title}</h4>
                    <p className="text-xs text-foreground-500 mt-1">{s.author} — {s.author_role}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-foreground-400"><i className="ri-user-line mr-1"></i>{s.reviewers_completed}/{s.reviewers_assigned}</span>
                      {s.overall_score && <span className={`font-bold ${getScoreColor(s.overall_score)}`}>{s.overall_score}/10</span>}
                      <span className="text-foreground-400">{s.word_count.toLocaleString()} mots</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submission Detail + Reviewers */}
              <div className="lg:col-span-2">
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedPRSubmission.content_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedPRSubmission.status)}`}>{getPRStatusLabel(selectedPRSubmission.status)}</span>
                    {selectedPRSubmission.priority === 'critical' && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Critique</span>}
                    {selectedPRSubmission.priority === 'high' && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Haute</span>}
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedPRSubmission.title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-foreground-500 mb-4">
                    <span><i className="ri-user-line mr-1"></i>{selectedPRSubmission.author} · {selectedPRSubmission.author_role}</span>
                    <span><i className="ri-file-text-line mr-1"></i>{selectedPRSubmission.word_count.toLocaleString()} mots</span>
                    <span><i className="ri-calendar-line mr-1"></i>Soumis le {new Date(selectedPRSubmission.submitted_at).toLocaleDateString('fr-FR')}</span>
                    <span><i className="ri-timer-line mr-1"></i>Deadline : {new Date(selectedPRSubmission.deadline).toLocaleDateString('fr-FR')}</span>
                  </div>

                  {/* Review Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground-950">Progression Revue</span>
                      <span className="text-xs text-foreground-500">{selectedPRSubmission.reviewers_completed}/{selectedPRSubmission.reviewers_assigned} revues</span>
                    </div>
                    <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(selectedPRSubmission.reviewers_completed / selectedPRSubmission.reviewers_assigned) * 100}%` }} />
                    </div>
                  </div>

                  {/* Reviewer Cards */}
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-user-search-line text-primary-500"></i>Revues ({peerReviewAssignments.filter(a => a.submission_id === selectedPRSubmission.id).length})
                  </h4>
                  <div className="space-y-3">
                    {peerReviewAssignments.filter(a => a.submission_id === selectedPRSubmission.id).map((review) => (
                      <div key={review.id} className={`p-4 rounded-lg border ${review.status === 'completed' ? 'border-green-200 bg-green-50/30' : review.status === 'in_progress' ? 'border-amber-200 bg-amber-50/30' : 'border-background-200/70 bg-background-50'}`}>
                        <button onClick={() => setExpandedReviewer(expandedReviewer === review.id ? null : review.id)} className="w-full text-left cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-semibold text-foreground-950">{review.reviewer_name}</span>
                              <p className="text-xs text-foreground-500">{review.reviewer_role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(review.status)}`}>{getPRStatusLabel(review.status)}</span>
                              <i className={`ri-${expandedReviewer === review.id ? 'subtract' : 'add'}-line text-foreground-400`}></i>
                            </div>
                          </div>
                        </button>

                        {expandedReviewer === review.id && review.status === 'completed' && review.score_methodology !== null && (
                          <div className="mt-4 pt-4 border-t border-background-200/70">
                            <div className="grid grid-cols-4 gap-3 mb-3">
                              {[
                                { label: 'Méthodo', val: review.score_methodology },
                                { label: 'Éditorial', val: review.score_editorial },
                                { label: 'Conformité', val: review.score_compliance },
                                { label: 'Pertinence', val: review.score_relevance },
                              ].map((m) => (
                                <div key={m.label} className="p-2 bg-background-100 rounded-lg text-center">
                                  <div className={`text-base font-bold ${getScoreColor(m.val!)}`}>{m.val}</div>
                                  <div className="text-[10px] text-foreground-500">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-foreground-600 italic mb-2">« {review.comments} »</p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-foreground-400"><i className="ri-error-warning-line text-orange-500 mr-1"></i>{review.issues_count} issues</span>
                              <span className="text-foreground-400">·</span>
                              <span className="text-foreground-400">Terminé le {new Date(review.completed_at!).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        )}

                        {expandedReviewer === review.id && review.status === 'in_progress' && (
                          <div className="mt-4 pt-4 border-t border-background-200/70">
                            <div className="flex items-center gap-2 text-xs">
                              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                              <span className="text-amber-600 font-medium">{review.comments}</span>
                            </div>
                          </div>
                        )}

                        {expandedReviewer === review.id && review.status === 'pending' && (
                          <div className="mt-4 pt-4 border-t border-background-200/70">
                            <p className="text-xs text-foreground-400 italic">Revue non débutée. En attente d'acceptation.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Awaiting Reviewers */}
                  {selectedPRSubmission.reviewers_assigned - selectedPRSubmission.reviewers_completed > 0 && (
                    <div className="mt-4 pt-4 border-t border-background-200/70">
                      <p className="text-xs text-foreground-400">
                        <i className="ri-time-line mr-1"></i>
                        {selectedPRSubmission.reviewers_assigned - selectedPRSubmission.reviewers_completed} réviseur{selectedPRSubmission.reviewers_assigned - selectedPRSubmission.reviewers_completed > 1 ? 's' : ''} en attente
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : COMPLIANCE REVIEW — Étape 4 du Workflow 5 Étapes ===== */}
        {activeTab === 'compliance' && (
          <div>
            {/* Compliance Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{complianceReviewKPIs.total_reviews}</div>
                <div className="text-xs text-foreground-500">Revues Totales</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{complianceReviewKPIs.compliant}</div>
                <div className="text-xs text-foreground-500">Conformes</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{complianceReviewKPIs.frameworks_covered}</div>
                <div className="text-xs text-foreground-500">Référentiels</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{complianceReviewKPIs.avg_review_time_hours}h</div>
                <div className="text-xs text-foreground-500">Délai Revue</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions List */}
              <div className="lg:col-span-1 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700"><i className="ri-scales-3-line text-lg"></i></div>
                  <div><h3 className="text-sm font-bold text-foreground-950">Compliance Review™</h3><p className="text-xs text-foreground-500">Étape 4/5 — Conformité réglementaire</p></div>
                </div>
                <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/50 mb-3 grid grid-cols-3 gap-2 text-center">
                  <div><div className="text-lg font-bold text-red-600">{complianceReviewKPIs.critical_findings}</div><div className="text-[10px] text-foreground-500">Critiques</div></div>
                  <div><div className="text-lg font-bold text-amber-600">{complianceReviewKPIs.major_findings}</div><div className="text-[10px] text-foreground-500">Majeurs</div></div>
                  <div><div className="text-lg font-bold text-teal-600">{complianceReviewKPIs.minor_findings}</div><div className="text-[10px] text-foreground-500">Mineurs</div></div>
                </div>
                {complianceReviewSubmissions.map((cr) => (
                  <div key={cr.id} onClick={() => setSelectedCRSubmission(cr)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCRSubmission.id === cr.id ? 'border-teal-300 bg-teal-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{cr.deliverable_type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cr.status === 'compliant' ? 'bg-green-100 text-green-700' : cr.status === 'non_compliant' ? 'bg-red-100 text-red-700' : cr.status === 'in_review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                        {cr.status === 'compliant' ? 'Conforme' : cr.status === 'non_compliant' ? 'Non Conforme' : cr.status === 'in_review' ? 'En Revue' : 'En Attente'}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{cr.deliverable_title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      {cr.compliance_score !== null && <span className={`text-xs font-bold ${cr.compliance_score >= 8.5 ? 'text-green-600' : cr.compliance_score >= 7 ? 'text-amber-600' : 'text-red-600'}`}>{cr.compliance_score}/10</span>}
                      <span className="text-xs text-foreground-400">{cr.findings.length} findings</span>
                      <span className="text-xs text-foreground-400 ml-auto">{cr.reviewer.split('—')[0].trim()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail */}
              <div className="lg:col-span-2">
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCRSubmission.deliverable_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedCRSubmission.status === 'compliant' ? 'bg-green-100 text-green-700' : selectedCRSubmission.status === 'non_compliant' ? 'bg-red-100 text-red-700' : selectedCRSubmission.status === 'in_review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                      {selectedCRSubmission.status === 'compliant' ? 'Conforme' : selectedCRSubmission.status === 'non_compliant' ? 'Non Conforme' : 'En Revue'}
                    </span>
                    {selectedCRSubmission.compliance_score !== null && (
                      <span className={`ml-auto text-lg font-bold ${selectedCRSubmission.compliance_score >= 8.5 ? 'text-green-600' : selectedCRSubmission.compliance_score >= 7 ? 'text-amber-600' : 'text-red-600'}`}>{selectedCRSubmission.compliance_score}/10</span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCRSubmission.deliverable_title}</h2>
                  <p className="text-xs text-foreground-500 mb-4">Soumis par {selectedCRSubmission.submitted_by} · Revu par {selectedCRSubmission.reviewer}</p>

                  {/* Regulatory Frameworks */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Référentiels Vérifiés</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCRSubmission.regulatory_frameworks.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-medium">{f}</span>
                      ))}
                    </div>
                  </div>

                  {/* Findings */}
                  {selectedCRSubmission.findings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                        <i className="ri-error-warning-line text-amber-500"></i>Findings ({selectedCRSubmission.findings.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedCRSubmission.findings.map((f, i) => (
                          <div key={i} className={`p-3 rounded-lg border ${
                            f.severity === 'critical' ? 'border-red-200 bg-red-50/50' :
                            f.severity === 'major' ? 'border-amber-200 bg-amber-50/50' :
                            'border-teal-200 bg-teal-50/50'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                f.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                f.severity === 'major' ? 'bg-amber-100 text-amber-700' :
                                'bg-teal-100 text-teal-700'
                              }`}>{f.severity.toUpperCase()}</span>
                              <span className="text-[10px] text-foreground-500">{f.framework}</span>
                            </div>
                            <p className="text-xs text-foreground-600">{f.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCRSubmission.findings.length === 0 && (
                    <div className="mb-4 p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                      <i className="ri-check-line text-green-500 text-lg mb-1 block"></i>
                      <p className="text-sm font-semibold text-green-700">Aucun écart détecté — Conformité totale</p>
                    </div>
                  )}

                  <div className="mb-4 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                    <h4 className="text-xs font-semibold text-teal-700 mb-2">Évaluation Globale</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedCRSubmission.overall_assessment}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Prochaines Étapes</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedCRSubmission.next_steps}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : EXECUTIVE APPROVAL — Étape 5 du Workflow 5 Étapes ===== */}
        {activeTab === 'executive' && (
          <div>
            {/* Executive Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{executiveApprovalKPIs.total_decisions}</div>
                <div className="text-xs text-foreground-500">Décisions Totales</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{executiveApprovalKPIs.approved}</div>
                <div className="text-xs text-foreground-500">Approuvées</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{executiveApprovalKPIs.approved_with_conditions}</div>
                <div className="text-xs text-foreground-500">Avec Conditions</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-red-600">{executiveApprovalKPIs.rejected}</div>
                <div className="text-xs text-foreground-500">Rejetées</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions List */}
              <div className="lg:col-span-1 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700"><i className="ri-vip-crown-line text-lg"></i></div>
                  <div><h3 className="text-sm font-bold text-foreground-950">Executive Approval™</h3><p className="text-xs text-foreground-500">Étape 5/5 — Validation COMEX</p></div>
                </div>
                <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 mb-3">
                  <div className="text-xs text-foreground-500 mb-1">Alignement Stratégique</div>
                  <div className="text-lg font-bold text-amber-700">{executiveApprovalKPIs.strategic_alignment_rate}%</div>
                  <div className="text-[10px] text-foreground-400 mt-1">Impact client positif: {executiveApprovalKPIs.client_impact_positive}</div>
                </div>
                {executiveApprovalSubmissions.map((ea) => (
                  <div key={ea.id} onClick={() => setSelectedEASubmission(ea)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedEASubmission.id === ea.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ea.deliverable_type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        ea.status === 'approved' ? 'bg-green-100 text-green-700' :
                        ea.status === 'approved_with_conditions' ? 'bg-amber-100 text-amber-700' :
                        ea.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ea.status === 'approved' ? 'Approuvé' : ea.status === 'approved_with_conditions' ? 'Cond. Approuvé' : ea.status === 'rejected' ? 'Rejeté' : 'En Attente'}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{ea.deliverable_title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-500">{ea.author}</span>
                      <span className={`text-xs font-bold ${ea.compliance_score >= 8.5 ? 'text-green-600' : ea.compliance_score >= 7 ? 'text-amber-600' : 'text-red-600'}`}>{ea.compliance_score}/10</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Executive Detail */}
              <div className="lg:col-span-2">
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedEASubmission.deliverable_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedEASubmission.status === 'approved' ? 'bg-green-100 text-green-700' :
                      selectedEASubmission.status === 'approved_with_conditions' ? 'bg-amber-100 text-amber-700' :
                      selectedEASubmission.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedEASubmission.status === 'approved' ? 'APPROUVÉ' : selectedEASubmission.status === 'approved_with_conditions' ? 'APPROUVÉ AVEC CONDITIONS' : selectedEASubmission.status === 'rejected' ? 'REJETÉ' : 'EN ATTENTE'}
                    </span>
                    <span className={`ml-auto text-lg font-bold ${selectedEASubmission.compliance_score >= 8.5 ? 'text-green-600' : selectedEASubmission.compliance_score >= 7 ? 'text-amber-600' : 'text-red-600'}`}>
                      Compliance {selectedEASubmission.compliance_score}/10
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedEASubmission.deliverable_title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-foreground-500 mb-4">
                    <span><i className="ri-user-line mr-1"></i>{selectedEASubmission.author}</span>
                    <span><i className="ri-vip-crown-line mr-1"></i>{selectedEASubmission.approver}</span>
                    <span><i className="ri-calendar-line mr-1"></i>Soumis le {new Date(selectedEASubmission.submitted_for_approval).toLocaleDateString('fr-FR')}</span>
                    {selectedEASubmission.approved_at && <span className="text-green-600"><i className="ri-check-line mr-1"></i>Décidé le {new Date(selectedEASubmission.approved_at).toLocaleDateString('fr-FR')}</span>}
                  </div>

                  {/* Decision Rationale */}
                  {selectedEASubmission.decision_rationale && (
                    <div className={`p-4 rounded-lg border mb-4 ${
                      selectedEASubmission.status === 'approved' ? 'bg-green-50/50 border-green-200' :
                      selectedEASubmission.status === 'approved_with_conditions' ? 'bg-amber-50/50 border-amber-200' :
                      'bg-red-50/50 border-red-200'
                    }`}>
                      <h4 className={`text-sm font-semibold mb-2 ${
                        selectedEASubmission.status === 'approved' ? 'text-green-700' :
                        selectedEASubmission.status === 'rejected' ? 'text-red-700' :
                        'text-amber-700'
                      }`}>
                        <i className={`${selectedEASubmission.status === 'approved' ? 'ri-check-double-line' : selectedEASubmission.status === 'rejected' ? 'ri-close-circle-line' : 'ri-information-line'} mr-1`}></i>
                        Décision du Managing Partner
                      </h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedEASubmission.decision_rationale}</p>
                    </div>
                  )}

                  {/* Conditions */}
                  {selectedEASubmission.conditions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                        <i className="ri-list-check-3 text-amber-500"></i>Conditions de Publication
                      </h4>
                      <div className="space-y-2">
                        {selectedEASubmission.conditions.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-500 text-white flex-shrink-0 mt-0.5"><span className="text-[10px] font-bold">{i+1}</span></div>
                            <p className="text-xs text-foreground-600">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEASubmission.status === 'pending' && (
                    <div className="mb-4 p-4 bg-background-100 rounded-lg border border-background-200/70 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"></div>
                      <p className="text-sm font-semibold text-foreground-950">En attente de décision</p>
                      <p className="text-xs text-foreground-500">Le Managing Partner examine ce livrable</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Alignement Stratégique</h4>
                      <p className="text-xs text-foreground-600">{selectedEASubmission.strategic_alignment}</p>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Impact Client</h4>
                      <p className="text-xs text-foreground-600">{selectedEASubmission.client_impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Qualité & Excellence</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Cohérence Méthodologique</span><span className="text-xs font-bold text-foreground-950">95%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '82%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Qualité Rédactionnelle</span><span className="text-xs font-bold text-foreground-950">95%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '85%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Humanisation</span><span className="text-xs font-bold text-foreground-950">90%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: '73%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Conformité Standards</span><span className="text-xs font-bold text-foreground-950">95%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '78%' }}></div></div></div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





