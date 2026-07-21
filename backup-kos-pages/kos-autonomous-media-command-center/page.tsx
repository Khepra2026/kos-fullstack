import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSAutonomousMediaCommandCenter } from '@/hooks/useKOSAutonomousMediaCommandCenter';

type TabId = 'orchestration' | 'quality' | 'compliance' | 'documents' | 'kpis' | 'improvement';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'orchestration', label: 'Orchestration', icon: 'ri-radar-line' },
  { id: 'quality', label: 'Contrôle Qualité', icon: 'ri-shield-check-line' },
  { id: 'compliance', label: 'Conformité', icon: 'ri-scales-line' },
  { id: 'documents', label: 'Gestion Documentaire', icon: 'ri-archive-line' },
  { id: 'kpis', label: 'KPIs Globaux', icon: 'ri-line-chart-line' },
  { id: 'improvement', label: 'Amélioration Continue', icon: 'ri-loop-left-line' },
];

export default function autonomousMediaCommandCenterPage() {
  const [activeTab, setActiveTab] = useState<TabId>('orchestration');
  const cmd = useKOSAutonomousMediaCommandCenter();
  const stats = cmd.stats;

  return (
    <hubLayout hubId={100} activeTab="Media Command Center" tabLabel="Media Command Center™">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground-950 text-background-50 font-body tracking-wide">
                      HUB 100
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.operationalFactories}/{stats.totalFactories} usines opérationnelles
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-stack-line text-xs"></i>
                      {stats.totalOutputs.toLocaleString()} assets produits
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Autonomous Media Command Center™
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Directeur Mondial des Opérations Médias KHEPRA. Orchestration autonome des 8 usines médias : Knowledge, Podcast, Interview, Canva, PPT, Video, Voice, YouTube. Contrôle qualité, conformité réglementaire, gestion documentaire, KPIs consolidés, amélioration continue. Validation humaine conservée pour les décisions stratégiques, réglementaires et éditoriales sensibles.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Qualité', value: `${stats.avgQualityScore}/100`, icon: 'ri-shield-check-line', color: 'text-emerald-500' },
                    { label: 'Conformité', value: `${stats.avgComplianceScore}%`, icon: 'ri-scales-line', color: 'text-accent-500' },
                    { label: 'Maturité', value: `${stats.globalMaturity}/100`, icon: 'ri-medal-line', color: 'text-secondary-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[90px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-xl font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Governance Banner */}
        <div className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
            <div className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-shield-user-line text-foreground-950"></i>
              <span><strong className="text-foreground-700">Gouvernance :</strong> {stats.governanceStatus}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'orchestration' && <OrchestrationTab cmd={cmd} />}
          {activeTab === 'quality' && <QualityTab cmd={cmd} />}
          {activeTab === 'compliance' && <ComplianceTab cmd={cmd} />}
          {activeTab === 'documents' && <DocumentsTab cmd={cmd} />}
          {activeTab === 'kpis' && <KPIsTab cmd={cmd} />}
          {activeTab === 'improvement' && <ImprovementTab cmd={cmd} />}
        </div>

        {/* Cross-Links Footer */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Plateforme Média Autonome KHEPRA</h2>
                <p className="text-gray-400 text-sm">Command Center → 8 Factories → Production, Publication, Archivage, Amélioration Continue. L'écosystème média institutionnel autonome de KHEPRA EXPERTS.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/kos-knowledge-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 cursor-pointer whitespace-nowrap">
                  <i className="ri-brain-line" />Knowledge
                </Link>
                <Link to="/kos-youtube-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                  <i className="ri-youtube-fill" />YouTube
                </Link>
                <Link to="/kos-video-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                  <i className="ri-film-line" />Video
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: ORCHESTRATION — Les 8 Factories
// ============================================================================
function OrchestrationTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const sum = cmd.factoryHealthSummary;
  const factories = cmd.factories;

  return (
    <div className="space-y-8">
      {/* Health Overview */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Opérationnelles', value: sum.operational, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Santé moyenne', value: `${sum.avgHealth}/100`, icon: 'ri-heart-pulse-line', color: 'text-primary-500', bg: 'bg-primary-50' },
            { label: 'Qualité moyenne', value: `${sum.avgQuality}/100`, icon: 'ri-shield-check-line', color: 'text-accent-500', bg: 'bg-accent-50' },
            { label: 'Automatisation', value: `${sum.avgAutomation}%`, icon: 'ri-git-branch-line', color: 'text-secondary-500', bg: 'bg-secondary-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border border-background-200/70 rounded-lg p-3 text-center`}>
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Factories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {factories.map(factory => (
          <ScrollReveal key={factory.id}>
            <Link
              to={factory.route}
              className="block bg-background-50 border border-background-200/70 rounded-xl overflow-hidden cursor-pointer hover:border-foreground-300 transition-colors h-full"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      factory.status === 'operational' ? 'bg-emerald-100' :
                      factory.status === 'degraded' ? 'bg-amber-100' : 'bg-background-100'
                    }`}>
                      <i className={`${factory.icon} text-xl ${
                        factory.status === 'operational' ? 'text-emerald-600' :
                        factory.status === 'degraded' ? 'text-amber-600' : 'text-foreground-400'
                      }`}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-400 font-mono">Hub {factory.hubNumber}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          factory.status === 'operational' ? 'bg-emerald-100 text-emerald-700' :
                          factory.status === 'degraded' ? 'bg-amber-100 text-amber-700' :
                          factory.status === 'maintenance' ? 'bg-background-100 text-foreground-500' : 'bg-red-100 text-red-700'
                        }`}>
                          {factory.status === 'operational' ? 'OPÉRATIONNEL' : factory.status === 'degraded' ? 'DÉGRADÉ' : factory.status === 'maintenance' ? 'MAINTENANCE' : 'HORS LIGNE'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground-950 mt-0.5">{factory.name}</h3>
                    </div>
                  </div>
                  <i className="ri-arrow-right-line text-foreground-400"></i>
                </div>

                <p className="text-xs text-foreground-600 mb-3 line-clamp-2">{factory.description}</p>

                {/* Mini KPIs */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-[10px] text-foreground-400">Santé</p>
                    <p className="text-xs font-bold text-foreground-950">{factory.healthScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-foreground-400">Qualité</p>
                    <p className="text-xs font-bold text-foreground-950">{factory.qualityScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-foreground-400">Conformité</p>
                    <p className="text-xs font-bold text-foreground-950">{factory.complianceScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-foreground-400">Auto</p>
                    <p className="text-xs font-bold text-foreground-950">{factory.automationRate}%</p>
                  </div>
                </div>

                {/* Output & Last Activity */}
                <div className="flex items-center justify-between text-[10px] text-foreground-400">
                  <span>{factory.outputCount.toLocaleString()} {factory.outputLabel}</span>
                  <span>{new Date(factory.lastActivity).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Alerts */}
                {factory.alerts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-background-200/40 space-y-1">
                    {factory.alerts.map(alert => (
                      <div key={alert.id} className={`flex items-center gap-1.5 text-[10px] ${
                        alert.level === 'critical' ? 'text-red-600' : alert.level === 'warning' ? 'text-amber-600' : 'text-foreground-500'
                      }`}>
                        <i className={alert.level === 'critical' ? 'ri-alert-fill' : alert.level === 'warning' ? 'ri-error-warning-line' : 'ri-information-line'}></i>
                        {alert.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Dependencies */}
                <div className="mt-3 pt-3 border-t border-background-200/40 flex flex-wrap items-center gap-1">
                  <span className="text-[10px] text-foreground-400 mr-1">Dépend de :</span>
                  {factory.dependencies.map(dep => {
                    const depFactory = cmd.getFactoryById(dep);
                    return (
                      <span key={dep} className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">
                        {depFactory?.shortName || dep}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: CONTRÔLE QUALITÉ
// ============================================================================
function QualityTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const qs = cmd.qualityStats;
  const checkpoints = cmd.qualityCheckpoints;

  return (
    <div className="space-y-8">
      {/* Quality Overview */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pass Rate Moyen', value: `${qs.avgPassRate}%`, icon: 'ri-check-double-line', color: 'text-emerald-500' },
            { label: 'Points Contrôle', value: qs.totalCheckpoints, icon: 'ri-shield-check-line', color: 'text-primary-500' },
            { label: 'Findings Ouverts', value: qs.openFindings, icon: 'ri-error-warning-line', color: 'text-amber-500' },
            { label: 'En Cours', value: qs.inProgressFindings, icon: 'ri-loader-4-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Findings Summary */}
      {qs.totalFindings > 0 && (
        <ScrollReveal>
          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-white text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground-950 text-sm">
                  {qs.totalFindings} Findings Qualité — {qs.criticalFindings} critiques, {qs.majorFindings} majeurs, {qs.minorFindings} mineurs
                </h3>
                <p className="text-xs text-foreground-600 mt-1">
                  <strong className="text-foreground-800">{qs.openFindings} ouverts</strong>, {qs.inProgressFindings} en cours de résolution. Aucun finding critique bloquant. Tous les findings sont traités dans un délai maximum de 48h.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Quality Checkpoints */}
      <div className="space-y-4">
        {checkpoints.map(cp => (
          <ScrollReveal key={cp.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cp.passRate >= 95 ? 'bg-emerald-100 text-emerald-700' :
                      cp.passRate >= 90 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <i className="ri-shield-check-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{cp.stage}</h3>
                      <p className="text-xs text-foreground-500">Responsable : {cp.responsible}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      cp.passRate >= 95 ? 'text-emerald-600' : cp.passRate >= 90 ? 'text-amber-600' : 'text-red-600'
                    }`}>{cp.passRate}%</span>
                    <p className="text-[10px] text-foreground-400">Pass Rate</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-3">{cp.description}</p>
                <div className="mb-3">
                  <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Critères</h4>
                  <div className="flex flex-wrap gap-1">
                    {cp.criteria.map((c, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-foreground-400">Dernier audit : {new Date(cp.lastAudit).toLocaleString('fr-FR')}</p>

                {/* Findings */}
                {cp.findings.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-background-200/40 space-y-2">
                    {cp.findings.map(f => (
                      <div key={f.id} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                        f.severity === 'critical' ? 'bg-red-50 text-red-700' :
                        f.severity === 'major' ? 'bg-amber-50 text-amber-700' : 'bg-background-100 text-foreground-600'
                      }`}>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                          f.severity === 'critical' ? 'bg-red-200 text-red-800' :
                          f.severity === 'major' ? 'bg-amber-200 text-amber-800' : 'bg-background-200 text-foreground-600'
                        }`}>{f.severity.toUpperCase()}</span>
                        <span className="flex-1">{f.description}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                          f.status === 'open' ? 'bg-red-100 text-red-600' :
                          f.status === 'in_progress' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {f.status === 'open' ? 'OUVERT' : f.status === 'in_progress' ? 'EN COURS' : 'RÉSOLU'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: CONFORMITÉ RÉGLEMENTAIRE
// ============================================================================
function ComplianceTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const cs = cmd.complianceStats;
  const frameworks = cmd.complianceFrameworks;

  return (
    <div className="space-y-8">
      {/* Compliance Overview */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Taux Conformité', value: `${cs.complianceRate}%`, icon: 'ri-scales-line', color: 'text-emerald-500' },
            { label: 'Cadres Conformes', value: `${cs.compliant}/${cs.totalFrameworks}`, icon: 'ri-check-double-line', color: 'text-primary-500' },
            { label: 'Actions en Attente', value: cs.pendingActions, icon: 'ri-timer-line', color: 'text-amber-500' },
            { label: 'Partiellement Conforme', value: cs.partial, icon: 'ri-error-warning-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frameworks.map(cf => (
          <ScrollReveal key={cf.id}>
            <div className={`bg-background-50 border rounded-xl overflow-hidden h-full ${
              cf.status === 'compliant' ? 'border-emerald-200/60' :
              cf.status === 'partial' ? 'border-amber-200/60' :
              cf.status === 'non_compliant' ? 'border-red-200/60' : 'border-background-200/70'
            }`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cf.status === 'compliant' ? 'bg-emerald-100 text-emerald-700' :
                      cf.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                      cf.status === 'non_compliant' ? 'bg-red-100 text-red-700' : 'bg-background-100 text-foreground-400'
                    }`}>
                      <i className="ri-scales-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{cf.regulation}</h3>
                      <p className="text-xs text-foreground-500">{cf.authority}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    cf.status === 'compliant' ? 'bg-emerald-100 text-emerald-700' :
                    cf.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                    cf.status === 'non_compliant' ? 'bg-red-100 text-red-700' : 'bg-background-100 text-foreground-400'
                  }`}>
                    {cf.status === 'compliant' ? 'CONFORME' : cf.status === 'partial' ? 'PARTIEL' : cf.status === 'non_compliant' ? 'NON CONFORME' : 'N/A'}
                  </span>
                </div>

                {/* Articles */}
                <div className="mb-3">
                  <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Articles Applicables</h4>
                  <div className="flex flex-wrap gap-1">
                    {cf.articles.map((a, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{a}</span>
                    ))}
                  </div>
                </div>

                {/* Applicability */}
                <div className="mb-3">
                  <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Applicable à</h4>
                  <div className="flex flex-wrap gap-1">
                    {cf.applicability.map((a, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-600">{a}</span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-foreground-600 mb-1">{cf.evidence}</p>
                <p className="text-[10px] text-foreground-400">Dernière vérification : {new Date(cf.lastCheck).toLocaleString('fr-FR')}</p>

                {/* Actions */}
                {cf.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-background-200/40 space-y-1.5">
                    {cf.actions.map(action => (
                      <div key={action.id} className={`flex items-center gap-2 text-[10px] p-1.5 rounded-lg ${
                        action.status === 'overdue' ? 'bg-red-50 text-red-700' :
                        action.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                          action.status === 'overdue' ? 'bg-red-200 text-red-800' :
                          action.status === 'pending' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
                        }`}>
                          {action.status === 'overdue' ? 'RETARD' : action.status === 'pending' ? 'EN ATTENTE' : 'FAIT'}
                        </span>
                        <span className="flex-1">{action.description}</span>
                        <span className="text-foreground-400">{action.deadline}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: GESTION DOCUMENTAIRE
// ============================================================================
function DocumentsTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const ds = cmd.documentStats;
  const filtered = cmd.documents.filter(d => {
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    if (search && !d.title.toLowerCase().includes(search.toLowerCase()) && !d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const typeLabels: Record<string, string> = {
    policy: 'Politique', procedure: 'Procédure', template: 'Template',
    report: 'Rapport', audit: 'Audit', charter: 'Charte', manual: 'Manuel',
  };

  const statusLabels: Record<string, string> = {
    active: 'Actif', draft: 'Brouillon', archived: 'Archivé', under_review: 'En Révision',
  };

  return (
    <div className="space-y-8">
      {/* Doc Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Documents', value: ds.total, icon: 'ri-archive-line', color: 'text-primary-500' },
            { label: 'Actifs', value: ds.active, icon: 'ri-check-double-line', color: 'text-emerald-500' },
            { label: 'En Révision', value: ds.underReview, icon: 'ri-loop-left-line', color: 'text-amber-500' },
            { label: 'Catégories', value: ds.categories.length, icon: 'ri-stack-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-background-200/70 bg-background-50 text-sm text-foreground-800 placeholder-foreground-400 focus:outline-none focus:border-foreground-300"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer"
        >
          <option value="all">Tous types</option>
          {Object.entries(typeLabels).map(([k, v]) => (
            <option key={k} value={k}>{v} ({ds.byType[k as keyof typeof ds.byType] || 0})</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer"
        >
          <option value="all">Tous statuts</option>
          {Object.entries(statusLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-4xl text-foreground-300"></i>
            <p className="text-sm text-foreground-500 mt-3">Aucun document trouvé</p>
          </div>
        )}
        {filtered.length > 0 && filtered.map(doc => (
          <ScrollReveal key={doc.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                doc.type === 'charter' ? 'bg-foreground-950/10 text-foreground-950' :
                doc.type === 'policy' ? 'bg-primary-100 text-primary-700' :
                doc.type === 'procedure' ? 'bg-secondary-100 text-secondary-700' :
                doc.type === 'audit' ? 'bg-amber-100 text-amber-700' :
                doc.type === 'report' ? 'bg-accent-100 text-accent-700' :
                doc.type === 'manual' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-100 text-foreground-500'
              }`}>
                <i className={
                  doc.type === 'charter' ? 'ri-scales-line' :
                  doc.type === 'policy' ? 'ri-file-text-line' :
                  doc.type === 'procedure' ? 'ri-file-list-3-line' :
                  doc.type === 'audit' ? 'ri-search-eye-line' :
                  doc.type === 'report' ? 'ri-bar-chart-line' :
                  doc.type === 'manual' ? 'ri-book-open-line' : 'ri-file-line'
                }></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground-950">{doc.title}</h3>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    doc.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    doc.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                    doc.status === 'under_review' ? 'bg-accent-100 text-accent-700' : 'bg-background-100 text-foreground-400'
                  }`}>
                    {statusLabels[doc.status]}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-user-line"></i>{doc.author}</span>
                  <span className="flex items-center gap-1"><i className="ri-git-branch-line"></i>v{doc.version}</span>
                  <span className="flex items-center gap-1"><i className="ri-building-line"></i>{doc.linkFactory}</span>
                  <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>Mis à jour {doc.updated}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {doc.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-400">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-background-100 text-foreground-600 capitalize">{typeLabels[doc.type]}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: KPIs GLOBAUX
// ============================================================================
function KPIsTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const kpis = cmd.globalKpis;
  const overview = cmd.kpiOverview;
  const sum = cmd.factoryHealthSummary;

  return (
    <div className="space-y-6">
      {/* Maturity Score */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Maturité Plateforme Média</p>
            <p className="text-5xl font-bold text-foreground-950 font-heading">{cmd.stats.globalMaturity}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {cmd.stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-foreground-950 rounded-full" style={{ width: `${cmd.stats.globalMaturity}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 sm:col-span-2">
            <h3 className="text-sm font-semibold text-foreground-950 mb-3">Résumé Exécutif — Juin 2026</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'KPIs en hausse', value: overview.improving, sub: 'sur ' + kpis.length },
                { label: 'Au niveau cible', value: overview.atTarget, sub: 'atteints' },
                { label: 'Automatisation', value: `${sum.avgAutomation}%`, sub: 'moyenne' },
                { label: 'Délai publication', value: '4.2h', sub: 'cible 2h' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-foreground-500 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold text-foreground-950">{s.value}</p>
                  <p className="text-xs text-foreground-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    kpi.category === 'production' ? 'bg-primary-100 text-primary-700' :
                    kpi.category === 'quality' ? 'bg-emerald-100 text-emerald-700' :
                    kpi.category === 'compliance' ? 'bg-accent-100 text-accent-700' :
                    kpi.category === 'engagement' ? 'bg-secondary-100 text-secondary-700' : 'bg-foreground-950/10 text-foreground-950'
                  }`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                    <p className="text-[10px] text-foreground-400 capitalize">{kpi.category}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                }`}>
                  {kpi.current.toLocaleString()}{kpi.unit}
                  {kpi.trend === 'up' && <i className="ri-arrow-up-line ml-0.5"></i>}
                  {kpi.trend === 'down' && <i className="ri-arrow-down-line ml-0.5"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line ml-0.5"></i>}
                </span>
              </div>

              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = maxVal > 0 ? (h.value / maxVal) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div
                          className="absolute bottom-0 w-full rounded-sm transition-all bg-foreground-950"
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Précédent: {kpi.previous.toLocaleString()}{kpi.unit}</span>
                <span>Cible: {kpi.target.toLocaleString()}{kpi.unit}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-background-200/40 flex flex-wrap gap-1">
                {kpi.factories.includes('all') && (
                  <span className="text-[10px] text-foreground-400">Toutes les usines</span>
                )}
                {!kpi.factories.includes('all') && kpi.factories.map(fid => {
                  const fac = cmd.getFactoryById(fid);
                  return (
                    <span key={fid} className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">
                      {fac?.shortName || fid}
                    </span>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: AMÉLIORATION CONTINUE
// ============================================================================
function ImprovementTab({ cmd }: { cmd: ReturnType<typeof useKOSAutonomousMediaCommandCenter> }) {
  const is = cmd.improvementStats;
  const initiatives = cmd.improvements;
  const critical = cmd.criticalImprovements;

  const priorityConfig: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    critical: { label: 'CRITIQUE', bg: 'bg-red-100', text: 'text-red-700', icon: 'ri-alert-fill' },
    high: { label: 'HAUTE', bg: 'bg-amber-100', text: 'text-amber-700', icon: 'ri-arrow-up-circle-fill' },
    medium: { label: 'MOYENNE', bg: 'bg-primary-100', text: 'text-primary-700', icon: 'ri-subtract-line' },
    low: { label: 'BASSE', bg: 'bg-background-100', text: 'text-foreground-500', icon: 'ri-arrow-down-line' },
  };

  const categoryConfig: Record<string, { icon: string; color: string }> = {
    quality: { icon: 'ri-shield-check-line', color: 'text-emerald-500' },
    automation: { icon: 'ri-git-branch-line', color: 'text-primary-500' },
    compliance: { icon: 'ri-scales-line', color: 'text-accent-500' },
    performance: { icon: 'ri-timer-flash-line', color: 'text-amber-500' },
    innovation: { icon: 'ri-lightbulb-flash-line', color: 'text-secondary-500' },
  };

  return (
    <div className="space-y-8">
      {/* Improvement Overview */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Initiatives actives', value: is.active, icon: 'ri-loop-left-line', color: 'text-primary-500' },
            { label: 'Progression moyenne', value: `${is.avgProgress}%`, icon: 'ri-loader-4-line', color: 'text-accent-500' },
            { label: 'Critiques en cours', value: is.criticalActive, icon: 'ri-alert-fill', color: 'text-red-500' },
            { label: 'Complétées', value: is.completed, icon: 'ri-check-double-line', color: 'text-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Critical Alerts */}
      {critical.length > 0 && (
        <ScrollReveal>
          <div className="bg-red-50 border border-red-200/60 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <i className="ri-alert-fill text-white text-lg"></i>
              </div>
              <div>
                <h3 className="font-semibold text-foreground-950 text-sm">
                  {critical.length} initiative{critical.length > 1 ? 's' : ''} critique{critical.length > 1 ? 's' : ''} en cours
                </h3>
                <ul className="mt-1 space-y-0.5">
                  {critical.map(ci => (
                    <li key={ci.id} className="text-xs text-foreground-600 flex items-center gap-1">
                      <i className="ri-arrow-right-s-line text-red-500"></i>
                      {ci.title} — {ci.progress}% complété
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Initiatives */}
      <div className="space-y-4">
        {initiatives.map(initiative => {
          const pc = priorityConfig[initiative.priority];
          const cc = categoryConfig[initiative.category];

          return (
            <ScrollReveal key={initiative.id}>
              <div className={`bg-background-50 border rounded-xl overflow-hidden ${
                initiative.priority === 'critical' ? 'border-red-200/60' :
                initiative.priority === 'high' ? 'border-amber-200/60' : 'border-background-200/70'
              }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        initiative.category === 'quality' ? 'bg-emerald-100' :
                        initiative.category === 'automation' ? 'bg-primary-100' :
                        initiative.category === 'compliance' ? 'bg-accent-100' :
                        initiative.category === 'performance' ? 'bg-amber-100' : 'bg-secondary-100'
                      }`}>
                        <i className={`${cc.icon} ${cc.color} text-lg`}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-foreground-950">{initiative.title}</h3>
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${pc.bg} ${pc.text}`}>
                            <i className={`${pc.icon} text-[8px] mr-0.5`}></i>{pc.label}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                            initiative.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            initiative.status === 'planned' ? 'bg-amber-100 text-amber-700' :
                            initiative.status === 'completed' ? 'bg-background-100 text-foreground-400' : 'bg-background-100 text-foreground-500'
                          }`}>
                            {initiative.status === 'active' ? 'ACTIF' : initiative.status === 'planned' ? 'PLANIFIÉ' : initiative.status === 'completed' ? 'COMPLÉTÉ' : 'EN PAUSE'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-0.5">
                          {initiative.owner} · {initiative.startDate} → {initiative.targetDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-foreground-600 mb-3">{initiative.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground-500">Progression</span>
                      <span className="text-[10px] font-bold text-foreground-950">{initiative.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          initiative.progress >= 100 ? 'bg-emerald-500' :
                          initiative.progress >= 50 ? 'bg-primary-500' : 'bg-foreground-950'
                        }`}
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {initiative.metrics.map((m, i) => (
                      <div key={i} className="bg-background-100 rounded-lg p-2">
                        <p className="text-[10px] text-foreground-400">{m.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs font-bold text-foreground-500">{m.before}{m.unit}</span>
                          <i className="ri-arrow-right-line text-[10px] text-foreground-400"></i>
                          <span className="text-xs font-bold text-emerald-600">{m.after}{m.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Impacted Factories */}
                  <div className="mb-3">
                    <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Usines Impactées</h4>
                    <div className="flex flex-wrap gap-1">
                      {initiative.impactedFactories.includes('all') && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-950/10 text-foreground-950 font-semibold">TOUTES</span>
                      )}
                      {!initiative.impactedFactories.includes('all') && initiative.impactedFactories.map(fid => {
                        const fac = cmd.getFactoryById(fid);
                        return (
                          <span key={fid} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">
                            {fac?.shortName || fid}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-2">Jalons</h4>
                    <div className="flex items-center gap-0">
                      {initiative.milestones.map((m, i) => (
                        <div key={m.id} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${
                              m.status === 'done' ? 'bg-emerald-500' :
                              m.status === 'in_progress' ? 'bg-primary-500 ring-2 ring-primary-200' : 'bg-background-200'
                            }`}></div>
                            <span className="text-[8px] text-foreground-400 mt-1 whitespace-nowrap">{m.date}</span>
                          </div>
                          {i < initiative.milestones.length - 1 && (
                            <div className={`flex-1 h-0.5 ${
                              m.status === 'done' ? 'bg-emerald-300' : 'bg-background-200'
                            }`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {initiative.milestones.map(m => (
                        <span key={m.id} className={`text-[9px] ${
                          m.status === 'done' ? 'text-emerald-600' :
                          m.status === 'in_progress' ? 'text-primary-600 font-semibold' : 'text-foreground-400'
                        } text-center flex-1`}>{m.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}





