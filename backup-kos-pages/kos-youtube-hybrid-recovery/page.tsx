import { useState } from 'react';
import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSYoutubeHybridRecovery } from '@/hooks/useKOSYoutubeHybridRecovery';
import {
  type BlockPointDiagnostic, type RecoveryAction, type RecoveryErrorLog,
  type AssetType, type BlockPointDetail,
} from '@/mocks/youtubeHybridRecovery';

const ASSET_COLORS: Record<AssetType, string> = {
  SCRIPT: '#86BC25',
  AUDIO: '#CA8A04',
  THUMBNAIL: '#D4A853',
  VIDEO: '#FF0000',
  METADATA: '#0A66C2',
  ALL: '#6B7280',
};

const ASSET_ICONS: Record<AssetType, string> = {
  SCRIPT: 'ri-file-text-line',
  AUDIO: 'ri-mic-line',
  THUMBNAIL: 'ri-image-line',
  VIDEO: 'ri-movie-line',
  METADATA: 'ri-code-s-slash-line',
  ALL: 'ri-stack-line',
};

const ASSET_LABELS: Record<AssetType, string> = {
  SCRIPT: 'Script',
  AUDIO: 'Audio',
  THUMBNAIL: 'Miniature',
  VIDEO: 'Vidéo',
  METADATA: 'Métadonnées',
  ALL: 'Tout',
};

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#DC2626',
  HIGH: '#FF0000',
  MEDIUM: '#CA8A04',
  LOW: '#6B7280',
  NONE: '#059669',
};

const LOG_LEVEL_COLORS: Record<string, string> = {
  CRITICAL: '#DC2626',
  ERROR: '#FF0000',
  WARNING: '#CA8A04',
  INFO: '#0A66C2',
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: '#6B7280',
  IN_PROGRESS: '#CA8A04',
  RESOLVED: '#059669',
  FAILED: '#DC2626',
  RETRYING: '#D4A853',
};

export default function youtubeHybridRecoveryPage() {
  const recovery = useKOSYoutubeHybridRecovery();
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'actions' | 'logs' | 'kpi' | 'manual-guide'>('diagnostics');
  const [expandedDiag, setExpandedDiag] = useState<string | null>('DIAG-004');
  const [logFilter, setLogFilter] = useState<'ALL' | 'CRITICAL' | 'ERROR' | 'WARNING' | 'INFO'>('ALL');
  const [expandedGuide, setExpandedGuide] = useState<string | null>('GUIDE-001');

  const tabs = [
    { id: 'diagnostics' as const, label: 'Diagnostics', icon: 'ri-search-eye-line', count: `${recovery.diagnostics.filter((d) => d.criticalBlocks > 0).length}/${recovery.diagnostics.length}` },
    { id: 'actions' as const, label: 'Actions', icon: 'ri-tools-line', count: `${recovery.recoveryActions.filter((a) => a.status === 'IN_PROGRESS' || a.status === 'RETRYING').length}` },
    { id: 'logs' as const, label: 'Logs', icon: 'ri-error-warning-line', count: `${recovery.errorLogs.length}` },
    { id: 'kpi' as const, label: 'KPIs', icon: 'ri-bar-chart-line' },
    { id: 'manual-guide' as const, label: 'Guide Upload', icon: 'ri-guide-line' },
  ];

  const handleFixContent = async (diag: BlockPointDiagnostic) => {
    await recovery.executeRecovery(diag.diagnosticId);
  };

  const handleFixAsset = async (diag: BlockPointDiagnostic, assetType: AssetType) => {
    await recovery.executeRecovery(diag.diagnosticId, assetType);
  };

  const healthColor = recovery.kpis.systemHealth === 'GREEN' ? '#059669' :
    recovery.kpis.systemHealth === 'YELLOW' ? '#CA8A04' :
    recovery.kpis.systemHealth === 'ORANGE' ? '#FF0000' : '#DC2626';

  return (
    <hubLayout hubId={80}>
      <SeoHead
        title="KOS YouTube Hybrid Recovery & Corrective Actions™ — Détection Blocages & Auto-Correction | KHEPRA EXPERTS"
        description="Système de détection et correction automatique des blocages de production YouTube KHEPRA EXPERTS. 5 CAS de blocage, auto-fix, logs erreurs, guide upload manuel. Continuité sans OAuth Google."
        keywords="YouTube recovery, correction automatique, diagnostic blocage YouTube, KHEPRA EXPERTS, production YouTube, auto-fix vidéo, recovery pipeline"
        canonicalPath="/kos-youtube-hybrid-recovery"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 50%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-heart-pulse-line" />KOS YouTube Hybrid Recovery & Corrective Actions™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Zéro Blocage — Détection & Correction Automatique
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl">
              Scan automatisé de tous les contenus YouTube. Détection des 5 CAS de blocage (script/audio/miniature/vidéo/métadonnées). Actions correctives automatiques. Logs complets. Continuité garantie sans OAuth Google.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style={{ backgroundColor: `${healthColor}15`, color: healthColor, border: `1px solid ${healthColor}40` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: healthColor }} />
                {recovery.kpis.systemHealth === 'GREEN' ? 'Système SAIN' :
                 recovery.kpis.systemHealth === 'YELLOW' ? 'Système SOUS SURVEILLANCE' :
                 recovery.kpis.systemHealth === 'ORANGE' ? 'Système DÉGRADÉ' : 'Système CRITIQUE'}
              </div>
              <button
                onClick={() => recovery.runFullScan()}
                disabled={recovery.isScanning}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {recovery.isScanning ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Scan en cours...</> : <><i className="ri-scan-line" />Lancer Scan Complet</>}
              </button>
              <button
                onClick={() => recovery.resolveAllBlocks()}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold hover:opacity-90 cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#059669' }}
              >
                <i className="ri-play-circle-line" />Tout Résoudre
              </button>
              <Link to="/kos-youtube-download" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-arrow-left-line" />Hybrid Studio
              </Link>
              <Link to="/youtube-download-center" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-download-cloud-2-line" />Téléchargements
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Progress */}
      {recovery.isScanning && (
        <section className="bg-background-50 border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-4 h-4 border-2 border-foreground-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-bold text-foreground-700">{recovery.scanProgress.step}</span>
              <span className="text-xs text-foreground-400 ml-auto">{recovery.scanProgress.percent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-background-200">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${recovery.scanProgress.percent}%` }} />
            </div>
          </div>
        </section>
      )}

      {/* Health Strip */}
      <section className="bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Scannés', value: recovery.kpis.totalContentScanned, icon: 'ri-scan-line', color: '#0A66C2' },
              { label: 'Bloqués', value: recovery.kpis.contentWithBlocks, icon: 'ri-error-warning-line', color: '#FF0000' },
              { label: 'Résolus', value: recovery.kpis.blocksResolved, icon: 'ri-check-line', color: '#059669' },
              { label: 'En Attente', value: recovery.kpis.blocksPending, icon: 'ri-time-line', color: '#CA8A04' },
              { label: 'Incidents Crit.', value: recovery.kpis.criticalIncidents, icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Auto-Fix', value: `${recovery.kpis.autoFixSuccessRate}%`, icon: 'ri-robot-line', color: '#86BC25' },
              { label: 'Tps Moyen', value: recovery.kpis.avgRecoveryTime, icon: 'ri-timer-line', color: '#6B7280' },
              { label: 'Dernier Scan', value: recovery.kpis.lastFullScan ? new Date(recovery.kpis.lastFullScan).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—', icon: 'ri-history-line', color: '#D4A853' },
            ].map((k, i) => (
              <div key={i} className="rounded-lg bg-background-50 border border-background-200/70 p-2.5 text-center">
                <div className="w-6 h-6 mx-auto mb-1 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}15` }}>
                  <i className={`${k.icon} text-[10px]`} style={{ color: k.color }} />
                </div>
                <span className="block text-sm font-bold text-foreground-950">{k.value}</span>
                <span className="text-[9px] text-foreground-400">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />{tab.label}
                {tab.count && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DIAGNOSTICS TAB ═══════════════ */}
      {activeTab === 'diagnostics' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Diagnostics de Blocage — 5 CAS Modélisés</h2>
              <p className="text-sm text-foreground-500">
                {recovery.diagnostics.filter((d) => d.criticalBlocks > 0).length} contenus bloqués sur {recovery.diagnostics.length} scannés.
                Chaque contenu est analysé sur 5 assets : Script, Audio, Miniature, Vidéo, Métadonnées.
              </p>
            </div>

            {/* CAS Legend */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(['CASE_0', 'CASE_1', 'CASE_2', 'CASE_3', 'CASE_4', 'CASE_5'] as const).map((cas) => (
                <div key={cas} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100 border border-background-200 text-[10px] font-bold text-foreground-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: recovery.caseLabels[cas] === recovery.caseLabels.CASE_0 ? '#059669' : recovery.caseLabels[cas] === recovery.caseLabels.CASE_1 ? '#CA8A04' : recovery.caseLabels[cas] === recovery.caseLabels.CASE_2 ? '#D4A853' : recovery.caseLabels[cas] === recovery.caseLabels.CASE_3 ? '#FF0000' : recovery.caseLabels[cas] === recovery.caseLabels.CASE_4 ? '#DC2626' : '#0A66C2' }} />
                  {cas.replace('_', ' ')}
                </div>
              ))}
            </div>

            {/* Diagnostics List */}
            <div className="space-y-3">
              {recovery.diagnostics.map((diag) => {
                const isExpanded = expandedDiag === diag.diagnosticId;
                const severityColor = SEVERITY_COLORS[diag.severity];
                const casKey = `CASE_${diag.recoveryCase.split('_')[1]}`;
                return (
                  <div key={diag.diagnosticId} className={`rounded-2xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedDiag(isExpanded ? null : diag.diagnosticId)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${severityColor}15` }}>
                        <i className={`${diag.criticalBlocks === 0 ? 'ri-check-double-line text-emerald-500' : 'ri-error-warning-line'} text-lg`} style={{ color: diag.criticalBlocks === 0 ? '#059669' : severityColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${severityColor}15`, color: severityColor }}>
                            {diag.severity}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">
                            {diag.recoveryCase.replace('_', ' ')}
                          </span>
                          <span className="text-[9px] text-foreground-400">
                            {new Date(diag.scannedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{diag.contentTitle}</h3>
                        <div className="flex items-center gap-1.5 mt-2">
                          {diag.blocks.map((block) => (
                            <div
                              key={block.assetType}
                              className="w-6 h-1.5 rounded-full"
                              style={{ backgroundColor: block.present ? '#059669' : '#DC2626' }}
                              title={`${ASSET_LABELS[block.assetType]}: ${block.status}`}
                            />
                          ))}
                          <span className="text-[9px] text-foreground-400 ml-1">
                            {diag.blocks.filter((b) => b.present).length}/{diag.totalBlocks} OK
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {diag.criticalBlocks > 0 && diag.autoFixable && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleFixContent(diag); }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white cursor-pointer hover:opacity-90 whitespace-nowrap"
                            style={{ backgroundColor: severityColor }}
                          >
                            <i className="ri-tools-line text-[9px]" />Corriger
                          </button>
                        )}
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in space-y-4">
                        {/* Block Details */}
                        <div>
                          <h4 className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Détail des 5 Assets</h4>
                          <div className="space-y-2">
                            {diag.blocks.map((block: BlockPointDetail) => (
                              <div key={block.assetType} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-100">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${block.present ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                  <i className={`${ASSET_ICONS[block.assetType]} text-sm ${block.present ? 'text-emerald-600' : 'text-red-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground-800">{ASSET_LABELS[block.assetType]}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${block.present ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                      {block.status}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-foreground-500 mt-0.5">{block.detail}</p>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                  {block.present ? (
                                    <span className="text-[10px] text-emerald-600 font-bold"><i className="ri-check-line" /> OK</span>
                                  ) : (
                                    <div className="flex flex-col items-end gap-1">
                                      <span className="text-[9px] text-foreground-400">Fix: {block.estimatedFixTime}</span>
                                      <button
                                        onClick={() => handleFixAsset(diag, block.assetType)}
                                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-foreground-950 text-white text-[9px] font-bold cursor-pointer hover:bg-foreground-800 whitespace-nowrap"
                                      >
                                        <i className="ri-tools-line text-[8px]" />Fix
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Linked Actions */}
                        {recovery.recoveryActions.filter((a) => a.diagnosticId === diag.diagnosticId).length > 0 && (
                          <div>
                            <h4 className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Actions Correctives Associées</h4>
                            <div className="space-y-1">
                              {recovery.recoveryActions.filter((a) => a.diagnosticId === diag.diagnosticId).map((action) => (
                                <div key={action.actionId} className="flex items-center gap-2 p-2 rounded-lg bg-background-100 text-xs">
                                  <span className={`w-2 h-2 rounded-full flex-shrink-0`} style={{ backgroundColor: STATUS_COLORS[action.status] }} />
                                  <span className="text-foreground-700 flex-1">{action.actionName}</span>
                                  <span className={`text-[10px] font-bold`} style={{ color: STATUS_COLORS[action.status] }}>
                                    {action.status === 'IN_PROGRESS' ? 'En cours' :
                                     action.status === 'RESOLVED' ? 'Résolu' :
                                     action.status === 'FAILED' ? 'Échoué' :
                                     action.status === 'RETRYING' ? 'Retry' : 'Ouvert'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ ACTIONS TAB ═══════════════ */}
      {activeTab === 'actions' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Actions Correctives</h2>
              <p className="text-sm text-foreground-500">
                {recovery.recoveryActions.length} actions — {recovery.recoveryActions.filter((a) => a.status === 'RESOLVED').length} résolues,
                {recovery.recoveryActions.filter((a) => a.status === 'IN_PROGRESS' || a.status === 'RETRYING').length} en cours,
                {recovery.recoveryActions.filter((a) => a.status === 'FAILED').length} échouées
              </p>
            </div>

            <div className="space-y-3">
              {recovery.recoveryActions.map((action: RecoveryAction) => {
                const diag = recovery.diagnostics.find((d) => d.diagnosticId === action.diagnosticId);
                return (
                  <div key={action.actionId} className="rounded-2xl bg-background-50 border border-background-200/70 p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STATUS_COLORS[action.status]}15` }}>
                        <i className={`${action.status === 'RESOLVED' ? 'ri-check-line text-emerald-500' : action.status === 'IN_PROGRESS' ? 'ri-loader-4-line text-amber-500 animate-spin' : action.status === 'FAILED' ? 'ri-close-line text-red-500' : action.status === 'RETRYING' ? 'ri-refresh-line text-yellow-600' : 'ri-time-line text-gray-500'} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STATUS_COLORS[action.status]}15`, color: STATUS_COLORS[action.status] }}>
                            {action.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${ASSET_COLORS[action.assetType]}15`, color: ASSET_COLORS[action.assetType] }}>
                            {ASSET_LABELS[action.assetType]}
                          </span>
                          <span className="text-[10px] text-foreground-400">{action.caseType.replace('_', ' ')}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-1">{action.actionName}</h3>
                        <p className="text-xs text-foreground-500 mb-2">{action.description}</p>
                        {diag && (
                          <p className="text-[10px] text-foreground-400">Contenu : {diag.contentTitle}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                          <span><i className="ri-time-line mr-1" />Démarré : {action.startedAt ? new Date(action.startedAt).toLocaleTimeString('fr-FR') : '—'}</span>
                          {action.completedAt && <span>· Terminé : {new Date(action.completedAt).toLocaleTimeString('fr-FR')}</span>}
                          {action.durationSeconds > 0 && <span>· Durée : {formatDuration(action.durationSeconds)}</span>}
                          {action.retryCount > 0 && <span>· Retries : {action.retryCount}/{action.maxRetries}</span>}
                        </div>
                        {action.outputMessage && (
                          <p className={`mt-2 text-[10px] px-2 py-1 rounded-lg ${action.success ? 'bg-emerald-50 text-emerald-700' : action.status === 'FAILED' ? 'bg-red-50 text-red-700' : 'bg-background-100 text-foreground-500'}`}>
                            {action.outputMessage}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {action.status === 'FAILED' && action.retryCount < action.maxRetries && (
                          <button
                            onClick={() => recovery.retryAction(action.actionId)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold cursor-pointer hover:bg-amber-600 whitespace-nowrap"
                          >
                            <i className="ri-refresh-line" />Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ LOGS TAB ═══════════════ */}
      {activeTab === 'logs' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Logs d&apos;Erreurs — Surveillance Continue</h2>
                <p className="text-sm text-foreground-500">
                  {recovery.errorLogs.length} logs — {recovery.errorLogs.filter((l) => l.result === 'RESOLVED').length} résolus,
                  {recovery.errorLogs.filter((l) => l.result === 'PENDING' || l.result === 'IN_PROGRESS').length} en cours
                </p>
              </div>
              <div className="flex gap-1.5">
                {(['ALL', 'CRITICAL', 'ERROR', 'WARNING', 'INFO'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setLogFilter(level)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                      logFilter === level ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {recovery.errorLogs
                .filter((log) => logFilter === 'ALL' || log.level === logFilter)
                .map((log: RecoveryErrorLog) => (
                  <div key={log.logId} className="rounded-xl bg-background-50 border border-background-200/70 p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${LOG_LEVEL_COLORS[log.level]}15` }}>
                        <i className={`${log.level === 'CRITICAL' || log.level === 'ERROR' ? 'ri-error-warning-line' : log.level === 'WARNING' ? 'ri-alert-line' : 'ri-information-line'} text-sm`} style={{ color: LOG_LEVEL_COLORS[log.level] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${LOG_LEVEL_COLORS[log.level]}15`, color: LOG_LEVEL_COLORS[log.level] }}>
                            {log.level}
                          </span>
                          <span className="text-[10px] text-foreground-400">{new Date(log.timestamp).toLocaleTimeString('fr-FR')}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            log.result === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600' :
                            log.result === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-600' :
                            log.result === 'FAILED' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {log.result}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-foreground-800">{log.errorType.replace(/_/g, ' ')}</p>
                        <p className="text-[11px] text-foreground-500 mt-0.5">{log.errorMessage}</p>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px]">
                          <span className="text-foreground-400"><i className="ri-file-text-line mr-1" />{log.contentTitle}</span>
                          {log.retryCount > 0 && <span className="text-amber-600 font-bold">Retry ×{log.retryCount}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {recovery.errorLogs.filter((log) => logFilter === 'ALL' || log.level === logFilter).length === 0 && (
              <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-background-200 flex items-center justify-center mb-4">
                  <i className="ri-check-line text-3xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun log trouvé</h3>
                <p className="text-sm text-foreground-500">Aucun log ne correspond au filtre sélectionné.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ KPI TAB ═══════════════ */}
      {activeTab === 'kpi' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs — Performance du Recovery Engine</h2>
              <p className="text-sm text-foreground-500">Indicateurs clés de performance du système de détection et correction automatique.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Contenus Scannés', value: recovery.kpis.totalContentScanned, target: '∞', icon: 'ri-scan-line', color: '#0A66C2' },
                { label: 'Contenus Bloqués', value: recovery.kpis.contentWithBlocks, target: '0', icon: 'ri-error-warning-line', color: '#FF0000' },
                { label: 'Contenus Clean', value: recovery.kpis.contentClean, target: '100%', icon: 'ri-check-double-line', color: '#059669' },
                { label: 'Blocages Détectés', value: recovery.kpis.totalBlocksDetected, target: '—', icon: 'ri-bug-line', color: '#DC2626' },
                { label: 'Blocages Résolus', value: recovery.kpis.blocksResolved, target: '100%', icon: 'ri-check-line', color: '#059669' },
                { label: 'Blocages en Attente', value: recovery.kpis.blocksPending, target: '0', icon: 'ri-time-line', color: '#CA8A04' },
                { label: 'Taux Auto-Fix', value: `${recovery.kpis.autoFixSuccessRate}%`, target: '≥ 95%', icon: 'ri-robot-line', color: '#86BC25' },
                { label: 'Temps Moyen Recovery', value: recovery.kpis.avgRecoveryTime, target: '< 5 min', icon: 'ri-timer-line', color: '#6B7280' },
                { label: 'Incidents Critiques', value: recovery.kpis.criticalIncidents, target: '0', icon: 'ri-alert-line', color: '#DC2626' },
                { label: 'Critiques Résolus', value: recovery.kpis.criticalResolved, target: '100%', icon: 'ri-shield-check-line', color: '#059669' },
                { label: 'Total Logs', value: recovery.kpis.totalErrorLogs, target: '—', icon: 'ri-file-list-3-line', color: '#D4A853' },
                { label: 'Erreurs Non Résolues', value: recovery.kpis.unresolvedErrors, target: '0', icon: 'ri-error-warning-line', color: '#FF0000' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <i className={`${kpi.icon} text-lg`} style={{ color: kpi.color }} />
                    </div>
                    <div>
                      <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                      <p className="font-heading text-2xl font-bold text-foreground-950">{kpi.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-foreground-400">Objectif</span>
                    <span className="font-bold text-foreground-600">{kpi.target}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* System Health Card */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: `${healthColor}10`, borderColor: `${healthColor}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${healthColor}20` }}>
                  <i className={`${recovery.kpis.systemHealth === 'GREEN' ? 'ri-heart-pulse-line' : recovery.kpis.systemHealth === 'YELLOW' ? 'ri-heart-pulse-line' : 'ri-heart-pulse-line'} text-xl`} style={{ color: healthColor }} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold" style={{ color: healthColor }}>
                    {recovery.kpis.systemHealth === 'GREEN' ? 'Système SAIN — Tout est OK' :
                     recovery.kpis.systemHealth === 'YELLOW' ? 'Système SOUS SURVEILLANCE — Blocages mineurs' :
                     recovery.kpis.systemHealth === 'ORANGE' ? 'Système DÉGRADÉ — Blocages multiples' : 'Système CRITIQUE — Intervention requise'}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: healthColor, opacity: 0.7 }}>
                    Dernier scan complet : {new Date(recovery.kpis.lastFullScan).toLocaleString('fr-FR')} · Prochain scan : {new Date(recovery.kpis.nextScheduledScan).toLocaleString('fr-FR')} · Uptime : {recovery.kpis.uptimePercent}%
                  </p>
                </div>
                <button
                  onClick={() => recovery.runFullScan()}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-foreground-950 text-xs font-bold cursor-pointer hover:bg-gray-50 whitespace-nowrap"
                >
                  <i className="ri-refresh-line" />Scanner
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ MANUAL GUIDE TAB ═══════════════ */}
      {activeTab === 'manual-guide' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Guide d&apos;Upload Manuel par Contenu</h2>
              <p className="text-sm text-foreground-500">Pour chaque contenu READY, suivez les étapes pour publier manuellement sur YouTube Studio.</p>
            </div>

            <div className="space-y-4">
              {recovery.manualGuides.map((guide) => {
                const isExpanded = expandedGuide === guide.guideId;
                return (
                  <div key={guide.guideId} className="rounded-2xl bg-background-50 border border-background-200/70">
                    <button
                      onClick={() => setExpandedGuide(isExpanded ? null : guide.guideId)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: guide.caseType === 'CASE_0' ? '#05966915' : '#FF000015' }}>
                        <i className={`${guide.caseType === 'CASE_0' ? 'ri-check-double-line text-emerald-500' : 'ri-file-warning-line'} text-lg`} style={{ color: guide.caseType === 'CASE_0' ? '#059669' : '#FF0000' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${guide.caseType === 'CASE_0' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {guide.caseType.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-foreground-400">{guide.readyFiles}/{guide.totalFiles} fichiers</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{guide.contentTitle}</h3>
                        <p className="text-[10px] text-foreground-400 mt-1">Temps estimé : {guide.estimatedUploadTime}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="space-y-3">
                          {guide.steps.map((step) => (
                            <div key={step.step} className="flex gap-3">
                              <div className="flex flex-col items-center flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-foreground-950 text-white flex items-center justify-center text-xs font-bold">{step.step}</div>
                                {step.step < guide.steps.length && <div className="w-0.5 flex-1 bg-background-200 my-0.5" />}
                              </div>
                              <div className="flex-1 pb-1.5">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <i className={`${step.icon} text-foreground-700`} />
                                  <h4 className="text-xs font-bold text-foreground-800">{step.title}</h4>
                                  {step.mandatory && <span className="text-[8px] px-1 py-0.5 rounded-full bg-red-50 text-red-500 font-bold">OBLIGATOIRE</span>}
                                </div>
                                <p className="text-[11px] text-foreground-500">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* MODE B — OAuth Validé */}
            <div className="mt-6 rounded-2xl bg-emerald-950 p-6 text-white border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <i className="ri-shield-check-fill text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">MODE B — ACTIVÉ</h3>
                  <p className="text-xs text-emerald-300">Google OAuth Verified — Projet khepra-youtube-kos (851512578726)</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-emerald-100">
                <p><i className="ri-check-double-line text-emerald-400 mr-2" />OAuth Google validé — tous les contenus READY sont importés automatiquement sur YouTube.</p>
                <p><i className="ri-check-double-line text-emerald-400 mr-2" />Le Recovery Engine continue de surveiller la production en continu.</p>
                <p><i className="ri-check-double-line text-emerald-400 mr-2" />Les logs et actions correctives restent consultables pour l&apos;historique.</p>
                <p><i className="ri-check-double-line text-emerald-400 mr-2" />Publication automatique activée — YouTube Publisher v2 (Resumable Upload + Circuit Breaker).</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/youtube-connect" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-youtube-fill" />YouTube Connect
                </Link>
                <Link to="/kos-youtube-production-pipeline" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-rocket-2-line" />Production Pipeline
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Chaîne KHEPRA EXPERTS — Production Ininterrompue</h2>
              <p className="text-gray-400 text-sm">
                Recovery Engine (détection) → Corrective Actions (auto-fix) → Download Center (téléchargement) → YouTube Studio (publication). Aucun contenu ne reste bloqué.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-youtube-download" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-movie-line" />Hybrid Studio
              </Link>
              <Link to="/youtube-download-center" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-download-cloud-2-line" />Téléchargements
              </Link>
              <Link to="/youtube-pending" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-stack-line" />File d&apos;Attente
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}min ${secs}s`;
}





