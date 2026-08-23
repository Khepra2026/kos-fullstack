import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  DEPLOYMENT_PHASES,
  COMMS_MISSIONS,
  MARKETING_MISSIONS,
  DEPLOYMENT_LOG,
  SYSTEM_READINESS,
} from '@/mocks/finalDeployment';
import type { DeploymentLogEntry } from '@/mocks/finalDeployment';

type TabId = 'overview' | 'phases' | 'comms' | 'marketing' | 'log';

function getPhaseStatusBadge(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé', dot: 'bg-emerald-500', pulse: false };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500', pulse: true };
    case 'pending': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'En attente', dot: 'bg-slate-300', pulse: false };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500', pulse: false };
  }
}

function getLogStatusIcon(status: string) {
  switch (status) {
    case 'success': return { icon: 'ri-checkbox-circle-fill', color: 'text-emerald-500' };
    case 'warning': return { icon: 'ri-error-warning-fill', color: 'text-amber-500' };
    case 'info': return { icon: 'ri-information-fill', color: 'text-blue-500' };
    default: return { icon: 'ri-checkbox-circle-fill', color: 'text-emerald-500' };
  }
}

export default function DeploiementFinalKOSPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployComplete, setDeployComplete] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState(8);
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const readiness = SYSTEM_READINESS;

  const phaseStats = useMemo(() => ({
    completed: DEPLOYMENT_PHASES.filter((p) => p.status === 'completed').length,
    inProgress: DEPLOYMENT_PHASES.filter((p) => p.status === 'in_progress').length,
    pending: DEPLOYMENT_PHASES.filter((p) => p.status === 'pending').length,
    total: DEPLOYMENT_PHASES.length,
  }), []);

  const missionStats = useMemo(() => ({
    commsTotal: COMMS_MISSIONS.length,
    commsValidated: COMMS_MISSIONS.filter((m) => m.autoValidated).length,
    mktTotal: MARKETING_MISSIONS.length,
    mktValidated: MARKETING_MISSIONS.filter((m) => m.autoValidated).length,
    totalMissions: COMMS_MISSIONS.length + MARKETING_MISSIONS.length,
    totalValidated: COMMS_MISSIONS.filter((m) => m.autoValidated).length + MARKETING_MISSIONS.filter((m) => m.autoValidated).length,
  }), []);

  const handleMasterDeploy = useCallback(() => {
    if (isDeploying || deployComplete) return;
    setIsDeploying(true);
    setDeployProgress(0);
    setActiveTab('log');
    setAutoScroll(true);

    const totalSteps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDeployProgress(Math.round((step / totalSteps) * 100));
      setVisibleLogs(Math.min(step + 2, DEPLOYMENT_LOG.length));
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsDeploying(false);
        setDeployComplete(true);
        setDeployProgress(100);
        setVisibleLogs(DEPLOYMENT_LOG.length);
      }
    }, 400);
  }, [isDeploying, deployComplete]);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLogs, autoScroll]);

  const displayedLogs = DEPLOYMENT_LOG.slice(0, visibleLogs);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
    { id: 'phases', label: 'Phases (6)', icon: 'ri-stack-line' },
    { id: 'comms', label: 'Communication Digitale', icon: 'ri-megaphone-line' },
    { id: 'marketing', label: 'Marketing Automation', icon: 'ri-line-chart-line' },
    { id: 'log', label: 'Log de Déploiement', icon: 'ri-terminal-box-line' },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="Déploiement Final KOS — Commandement de Mise à Niveau | KHEPRA EXPERTS"
        description="Commandement de déploiement final KHEPRA OS 2 : activation des 48 agents IA, déploiement des missions communication digitale et marketing automation, plans d'action auto-validés. 8 moteurs, 12 missions, 100% autonome."
        keywords="Déploiement Final KOS, KHEPRA OS 2, activation agents IA, communication digitale, marketing automation, plans d'action auto-validés, KHEPRA EXPERTS"
        canonicalPath="/deploiement-final-kos"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=epic%20dramatic%20dark%20command%20center%20with%20brilliant%20emerald%20green%20and%20warm%20amber%20orchestration%20rings%20radiating%20from%20a%20central%20master%20deployment%20node%2C%20all%2048%20interconnected%20glowing%20agent%20nodes%20forming%20a%20hexagonal%20activation%20grid%20pattern%2C%20premium%20enterprise%20deployment%20atmosphere%20with%20algorithmic%20precision%20and%20hierarchical%20orchestration%20layers%2C%20intense%20dramatic%20lighting%20with%20cinematic%20depth%2C%20no%20text%20no%20human%20figures%2C%20pure%20abstract%20deployment%20command%20center%20visualization%20with%20all%20systems%20go%20aesthetic&width=1920&height=700&seq=kos-final-deploy-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
                <i className="ri-rocket-2-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  Commandement de Déploiement Final — KHEPRA OS 2
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Mise à Niveau Finale.
                <span className="block text-emerald-400 mt-2">Tous les Agents. Toutes les Missions.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">48 agents IA</strong> déployés sur <strong className="text-white">8 moteurs</strong>.{' '}
                <strong className="text-white">12 missions</strong> communication digitale et marketing automation.{' '}
                Plans d'action <strong className="text-emerald-400">auto-validés</strong> par le KOS Quality Controller.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-emerald-300 font-semibold">{readiness.agentsActive}/{readiness.agentsTotal} Agents</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <i className="ri-stack-line text-amber-400" />
                  <span className="text-sm text-amber-300 font-semibold">{readiness.enginesReady} Moteurs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
                  <i className="ri-check-double-line text-blue-400" />
                  <span className="text-sm text-blue-300 font-semibold">{missionStats.totalMissions} Missions</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
                  <i className="ri-shield-check-line text-purple-400" />
                  <span className="text-sm text-purple-300 font-semibold">Score Cible 9.5/10</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: OVERVIEW === */}
        {activeTab === 'overview' && (
          <>
            {/* MASTER DEPLOY BUTTON SECTION */}
            <section className="py-10 sm:py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Ready Check */}
                <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-6 sm:p-8 mb-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-4">
                        <i className="ri-check-double-line text-emerald-600 text-sm" />
                        <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
                          SYSTEM READINESS — {readiness.readinessScore}%
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                        Tous les systèmes sont prêts.
                      </h2>
                      <p className="text-foreground-600 max-w-xl mb-6">
                        {readiness.checksPassed}/{readiness.checksTotal} checks passés.{' '}
                        {readiness.enginesReady}/{readiness.totalEngines} moteurs opérationnels.{' '}
                        {readiness.autoDeployEnabled}/{readiness.agentsTotal} agents en mode auto-deploy.{' '}
                        Aucun blocage détecté. Déploiement autorisé.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {[
                          { label: 'Moteurs OK', value: `${readiness.enginesReady}/${readiness.totalEngines}`, icon: 'ri-cpu-line' },
                          { label: 'Agents prêts', value: `${readiness.agentsActive}/${readiness.agentsTotal}`, icon: 'ri-robot-line' },
                          { label: 'Auto-deploy', value: `${readiness.autoDeployEnabled}/${readiness.agentsTotal}`, icon: 'ri-refresh-line' },
                          { label: 'Checks', value: `${readiness.checksPassed}/${readiness.checksTotal}`, icon: 'ri-check-double-line' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-background-200">
                            <i className={`${item.icon} text-xs text-emerald-600`} />
                            <span className="text-xs font-medium text-foreground-700">{item.label} : <strong>{item.value}</strong></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Master Deploy Button */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                      <button
                        onClick={handleMasterDeploy}
                        disabled={isDeploying || deployComplete}
                        className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${
                          deployComplete
                            ? 'bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 cursor-default'
                            : isDeploying
                            ? 'bg-amber-500 text-white shadow-2xl shadow-amber-500/30 cursor-wait animate-pulse'
                            : 'bg-red-600 text-white shadow-2xl shadow-red-500/40 hover:bg-red-500 hover:scale-105 hover:shadow-red-500/60'
                        }`}
                      >
                        <i className={`text-4xl mb-2 ${isDeploying ? 'ri-loader-4-line animate-spin' : deployComplete ? 'ri-check-double-line' : 'ri-rocket-2-line'}`} />
                        <span className="text-sm font-bold font-heading">
                          {deployComplete ? 'DÉPLOYÉ' : isDeploying ? `${deployProgress}%` : 'DÉPLOYER'}
                        </span>
                      </button>
                      {isDeploying && (
                        <div className="w-44 h-2 rounded-full bg-background-200 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-300"
                            style={{ width: `${deployProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deployment Progress Summary */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                  {DEPLOYMENT_PHASES.map((phase) => {
                    const badge = getPhaseStatusBadge(
                      deployComplete && phase.status === 'pending' ? 'completed' :
                      isDeploying && phase.order <= Math.ceil(deployProgress / 17) ? 'in_progress' :
                      phase.status
                    );
                    const isActive = badge.label === 'En cours';
                    const isDone = badge.label === 'Terminé';
                    return (
                      <div
                        key={phase.id}
                        className={`rounded-2xl border p-4 text-center transition-all duration-300 ${
                          isActive ? 'border-amber-200 bg-amber-50/50 ring-2 ring-amber-200' :
                          isDone ? 'border-emerald-200 bg-emerald-50/40' :
                          'border-background-200 bg-white'
                        }`}
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${phase.color}${isDone ? '25' : '12'}` }}
                        >
                          <i className={`${phase.icon} text-lg ${isDone ? '' : ''}`} style={{ color: phase.color }} />
                        </div>
                        <span className="block text-2xl font-bold font-heading text-foreground-950">{phase.order}</span>
                        <span className="text-[11px] font-bold text-foreground-700 line-clamp-2 leading-tight">{phase.name.split('—')[0].trim()}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold mt-1.5 ${badge.bg} ${badge.border} ${badge.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${badge.pulse ? 'animate-pulse' : ''}`} />
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Stats Grid */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <span className="block text-5xl font-bold font-heading text-emerald-400">{readiness.agentsActive}</span>
                      <span className="text-sm text-gray-400 mt-1">Agents Déployés</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-5xl font-bold font-heading text-amber-400">{missionStats.totalMissions}</span>
                      <span className="text-sm text-gray-400 mt-1">Missions Auto-validées</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-5xl font-bold font-heading text-blue-400">{readiness.enginesReady}</span>
                      <span className="text-sm text-gray-400 mt-1">Moteurs Opérationnels</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-5xl font-bold font-heading text-purple-400">{deployComplete ? '100' : '0'}%</span>
                      <span className="text-sm text-gray-400 mt-1">Complétion Déploiement</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: PHASES === */}
        {activeTab === 'phases' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  6 Phases de Déploiement
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {phaseStats.completed} terminées · {phaseStats.inProgress} en cours · {phaseStats.pending} en attente
                </p>
              </div>

              <div className="space-y-5">
                {DEPLOYMENT_PHASES.map((phase, i) => {
                  const badge = getPhaseStatusBadge(
                    deployComplete && phase.status === 'pending' ? 'completed' : phase.status
                  );
                  return (
                    <div key={phase.id} className="relative">
                      {i < DEPLOYMENT_PHASES.length - 1 && (
                        <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-background-200 hidden md:block" />
                      )}
                      {i < DEPLOYMENT_PHASES.length - 1 && (
                        <div
                          className="absolute left-8 top-20 bottom-0 w-0.5 hidden md:block transition-all duration-700"
                          style={{
                            backgroundColor: badge.label === 'Terminé' ? '#86BC25' : 'transparent',
                            height: badge.label === 'Terminé' ? '100%' : '0%',
                          }}
                        />
                      )}
                      <div className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
                        badge.label === 'En cours' ? 'border-amber-200 bg-amber-50/20 shadow-md' :
                        badge.label === 'Terminé' ? 'border-emerald-200 bg-emerald-50/10' :
                        'border-background-200 bg-white'
                      }`}>
                        <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start gap-5">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${badge.pulse ? 'animate-pulse' : ''}`}
                              style={{ backgroundColor: `${phase.color}15` }}
                            >
                              <i className={`${phase.icon} text-2xl`} style={{ color: phase.color }} />
                            </div>
                            <span className="text-3xl font-bold font-heading mt-2" style={{ color: phase.color }}>{phase.order}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-heading text-xl font-bold text-foreground-950">{phase.name}</h3>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${badge.pulse ? 'animate-pulse' : ''}`} />
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-600 leading-relaxed mb-4">{phase.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-400 mb-3">
                              <span className="flex items-center gap-1">
                                <i className="ri-robot-line" />{phase.agentCount} agents
                              </span>
                              <span className="flex items-center gap-1">
                                <i className="ri-time-line" />{phase.estimatedDuration}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {phase.keyDeliverables.map((del, j) => (
                                <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background-50 border border-background-200 text-foreground-600">
                                  <i className="ri-check-line text-emerald-500 text-xs" />
                                  {del}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: COMMS === */}
        {activeTab === 'comms' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-megaphone-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
                    Communication Digitale — {missionStats.commsValidated}/{missionStats.commsTotal} Missions Auto-validées
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Plans d'Action — Communication Digitale
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  6 missions déployées. Chaque mission a son plan d'action, son calendrier éditorial et ses KPIs. Tout est auto-validé par le KOS Quality Controller.
                </p>
              </div>

              <div className="space-y-6">
                {COMMS_MISSIONS.map((mission) => (
                  <div key={mission.id} className="rounded-3xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-6 sm:p-7" style={{ backgroundColor: `${mission.color}06`, borderBottom: `2px solid ${mission.color}15` }}>
                      <div className="flex flex-col lg:flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mission.color}15` }}>
                          <i className={`${mission.icon} text-xl`} style={{ color: mission.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-heading text-xl font-bold text-foreground-950">{mission.missionTitle}</h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                              <i className="ri-check-double-line text-[10px]" />
                              AUTO-VALIDÉ
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 mb-1">Agent : {mission.agentName} · Canal : {mission.channel}</p>
                          <p className="text-sm text-foreground-600 leading-relaxed">{mission.missionDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Action Plan */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-list-check text-amber-500" />
                            Plan d'Action
                          </h4>
                          <ul className="space-y-2">
                            {mission.actionPlan.map((action, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                                <span className="w-5 h-5 rounded-full bg-foreground-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-white text-[10px] font-bold">{j + 1}</span>
                                </span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Content Calendar */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-calendar-line text-blue-500" />
                            Calendrier Éditorial (4 semaines)
                          </h4>
                          <div className="space-y-2">
                            {mission.contentCalendar.map((week) => (
                              <div key={week.week} className="rounded-lg bg-background-50 border border-background-100 p-3">
                                <span className="text-[10px] font-bold text-foreground-400 uppercase">Semaine {week.week}</span>
                                <ul className="mt-1 space-y-1">
                                  {week.actions.map((action, j) => (
                                    <li key={j} className="text-xs text-foreground-600 flex items-start gap-1.5">
                                      <i className="ri-arrow-right-s-line text-foreground-400 flex-shrink-0 mt-px" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* KPIs */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-bar-chart-line text-emerald-500" />
                            KPIs Cibles
                          </h4>
                          <div className="space-y-2">
                            {mission.kpi.map((kpi, j) => (
                              <div key={j} className="rounded-lg bg-background-50 border border-background-100 p-3">
                                <span className="text-[10px] text-foreground-400 uppercase">{kpi.label}</span>
                                <div className="flex items-baseline gap-1.5 mt-0.5">
                                  <span className="text-base font-bold text-foreground-950">{kpi.current}</span>
                                  <i className="ri-arrow-right-line text-foreground-300 text-xs" />
                                  <span className="text-base font-bold text-emerald-600">{kpi.target}</span>
                                  <span className="text-[10px] text-foreground-400">{kpi.unit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: MARKETING === */}
        {activeTab === 'marketing' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-line-chart-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                    Marketing Automation — {missionStats.mktValidated}/{missionStats.mktTotal} Missions Auto-validées
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Plans d'Action — Marketing Automation
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  6 missions déployées. Funnel complet : LeadGen → Nurturing → CRM → Conversion → Closing → Analytics. Pipeline autonome de bout en bout.
                </p>
              </div>

              <div className="space-y-6">
                {MARKETING_MISSIONS.map((mission) => (
                  <div key={mission.id} className="rounded-3xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-6 sm:p-7" style={{ backgroundColor: `${mission.color}06`, borderBottom: `2px solid ${mission.color}15` }}>
                      <div className="flex flex-col lg:flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mission.color}15` }}>
                          <i className={`${mission.icon} text-xl`} style={{ color: mission.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-heading text-xl font-bold text-foreground-950">{mission.missionTitle}</h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                              <i className="ri-check-double-line text-[10px]" />
                              AUTO-VALIDÉ
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 mb-1">Agent : {mission.agentName} · Funnel : {mission.funnel}</p>
                          <p className="text-sm text-foreground-600 leading-relaxed">{mission.missionDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Action Plan */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-list-check text-amber-500" />
                            Plan d'Action
                          </h4>
                          <ul className="space-y-2">
                            {mission.actionPlan.map((action, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                                <span className="w-5 h-5 rounded-full bg-foreground-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-white text-[10px] font-bold">{j + 1}</span>
                                </span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Sequence Steps */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-git-branch-line text-purple-500" />
                            Séquence Automatisée
                          </h4>
                          <div className="space-y-2">
                            {mission.sequenceSteps.map((step) => (
                              <div key={step.step} className="rounded-lg bg-background-50 border border-background-100 p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-foreground-950 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-[10px] font-bold">{step.step}</span>
                                  </span>
                                  <span className="text-xs font-bold text-foreground-700">{step.description.split('—')[0].trim()}</span>
                                </div>
                                <p className="text-[11px] text-foreground-500 ml-7">{step.description.includes('—') ? step.description.split('—')[1]?.trim() : ''}</p>
                                <div className="flex items-center gap-3 mt-1.5 ml-7 text-[10px]">
                                  <span className="text-foreground-400 flex items-center gap-1">
                                    <i className="ri-flashlight-line text-amber-500" />
                                    {step.trigger}
                                  </span>
                                  <span className="text-foreground-400 flex items-center gap-1">
                                    <i className="ri-time-line text-blue-500" />
                                    {step.delay}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* KPIs */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i className="ri-bar-chart-line text-emerald-500" />
                            KPIs Cibles
                          </h4>
                          <div className="space-y-2">
                            {mission.kpi.map((kpi, j) => (
                              <div key={j} className="rounded-lg bg-background-50 border border-background-100 p-3">
                                <span className="text-[10px] text-foreground-400 uppercase">{kpi.label}</span>
                                <div className="flex items-baseline gap-1.5 mt-0.5">
                                  <span className="text-base font-bold text-foreground-950">{kpi.current}</span>
                                  <i className="ri-arrow-right-line text-foreground-300 text-xs" />
                                  <span className="text-base font-bold text-emerald-600">{kpi.target}</span>
                                  <span className="text-[10px] text-foreground-400">{kpi.unit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: LOG === */}
        {activeTab === 'log' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    Log de Déploiement — Temps Réel
                  </h2>
                  <p className="text-foreground-600">
                    {displayedLogs.length}/{DEPLOYMENT_LOG.length} entrées ·{' '}
                    {deployComplete ? 'Déploiement terminé' : isDeploying ? 'Déploiement en cours...' : 'En attente de déploiement'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-foreground-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoScroll}
                      onChange={(e) => setAutoScroll(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-background-300"
                    />
                    Auto-scroll
                  </label>
                  {!isDeploying && !deployComplete && (
                    <button
                      onClick={handleMasterDeploy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm cursor-pointer hover:bg-red-500 transition-all whitespace-nowrap"
                    >
                      <i className="ri-rocket-2-line" />
                      Lancer le Déploiement
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {(isDeploying || deployComplete) && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground-700">
                      {deployComplete ? 'DÉPLOIEMENT TERMINÉ — 48/48 agents activés' : `Déploiement en cours — ${deployProgress}%`}
                    </span>
                    <span className="text-sm font-bold text-emerald-600">{deployProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-background-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${deployComplete ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${deployProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Log Container */}
              <div
                ref={logContainerRef}
                className="rounded-2xl bg-foreground-950 border border-foreground-800 overflow-hidden max-h-[600px] overflow-y-auto"
                onScroll={() => {
                  if (logContainerRef.current) {
                    const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
                    setAutoScroll(scrollHeight - scrollTop - clientHeight < 40);
                  }
                }}
              >
                <div className="p-4 border-b border-foreground-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono ml-2">KOS-Deployment-Log — {new Date().toISOString()}</span>
                </div>

                <div className="p-4 font-mono text-xs space-y-0.5">
                  {displayedLogs.length === 0 && (
                    <div className="text-gray-500 py-8 text-center">
                      <i className="ri-terminal-box-line text-3xl block mb-2" />
                      <p>En attente du lancement du déploiement...</p>
                      <p className="text-[10px] mt-1">Cliquez sur "Lancer le Déploiement" pour démarrer.</p>
                    </div>
                  )}

                  {displayedLogs.map((log) => {
                    const statusIcon = getLogStatusIcon(log.status);
                    const actionLabels: Record<string, string> = {
                      activated: 'ACTIVÉ',
                      optimized: 'OPTIMISÉ',
                      patched: 'PATCHÉ',
                      mission_started: 'MISSION',
                      mission_completed: 'TERMINÉ',
                      auto_validated: 'VALIDÉ',
                    };
                    const actionColors: Record<string, string> = {
                      activated: 'text-emerald-400',
                      optimized: 'text-amber-400',
                      patched: 'text-blue-400',
                      mission_started: 'text-purple-400',
                      mission_completed: 'text-emerald-400',
                      auto_validated: 'text-amber-400',
                    };
                    const time = new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    return (
                      <div key={log.id} className="flex items-start gap-2 py-1 hover:bg-white/5 rounded px-1 transition-colors">
                        <span className="text-gray-600 flex-shrink-0 w-[10ch]">{time}</span>
                        <i className={`${statusIcon.icon} ${statusIcon.color} flex-shrink-0 mt-px`} />
                        <span className={`flex-shrink-0 w-[8ch] font-bold ${actionColors[log.action]}`}>
                          [{actionLabels[log.action] || log.action.toUpperCase()}]
                        </span>
                        <span className="text-gray-400 flex-shrink-0 w-[20ch] truncate">{log.agentName}</span>
                        <span className="text-gray-300 flex-1">{log.detail}</span>
                      </div>
                    );
                  })}

                  {deployComplete && (
                    <div className="mt-4 pt-4 border-t border-foreground-800">
                      <div className="flex items-center gap-2 py-2 px-1">
                        <span className="text-gray-600 w-[10ch]">---</span>
                        <i className="ri-check-double-line text-emerald-400" />
                        <span className="text-emerald-400 font-bold">[SUCCÈS]</span>
                        <span className="text-emerald-300">
                          Déploiement final terminé. 48/48 agents actifs. 12/12 missions auto-validées. 8/8 moteurs opérationnels.
                        </span>
                      </div>
                      <div className="flex items-center gap-2 py-2 px-1">
                        <span className="text-gray-600 w-[10ch]">---</span>
                        <i className="ri-bar-chart-line text-amber-400" />
                        <span className="text-amber-400 font-bold">[SCORE]</span>
                        <span className="text-amber-300">
                          Score système KOS : 6.8/10 → 9.5/10. Cible Big Four atteinte. Couverture agents : 29% → 100%.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cross-link Ecosystem */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS — Accès Rapide
              </h2>
              <p className="text-foreground-600">Les 8 moteurs + consoles de pilotage.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Auto-Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-list-check', color: '#4F46E5' },
                { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#86BC25' },
                { label: 'Orchestrator Engine', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#4F46E5' },
                { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040' },
                { label: 'Agent Console', path: '/agent-console', icon: 'ri-terminal-box-line', color: '#1A1A2E' },
                { label: 'Audit Final KOS', path: '/audit-final-kos', icon: 'ri-file-chart-line', color: '#9B7B2C' },
                { label: 'Revue Conformité', path: '/revue-conformite-qualite', icon: 'ri-scales-line', color: '#6B4A3A' },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



