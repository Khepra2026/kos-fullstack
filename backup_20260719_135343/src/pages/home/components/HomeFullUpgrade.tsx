import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { massLaunchManifest, unifiedAgentsForMassLaunch, systemUpdateTasks, systemUpgradeTasks } from '@/mocks/massSystemUpgrade';

export default function HomeFullUpgrade() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'countdown' | 'launching'>('idle');

  const allTasks = [...systemUpdateTasks, ...systemUpgradeTasks];
  const criticalTasks = allTasks.filter(t => t.severity === 'critical');
  const totalSubtasks = allTasks.reduce((sum, t) => sum + t.subtasks.length, 0);

  const handleLaunch = useCallback(() => {
    setPhase('countdown');
    let cd = 3;
    setCountdown(cd);
    const timer = setInterval(() => {
      cd -= 1;
      if (cd <= 0) {
        clearInterval(timer);
        setCountdown(null);
        setPhase('launching');
        setTimeout(() => {
          navigate('/kos-performance-100-challenge?tab=mass-upgrade');
        }, 600);
      } else {
        setCountdown(cd);
      }
    }, 800);
  }, [navigate]);

  return (
    <section id="kos-full-upgrade" className="relative py-20 sm:py-28 overflow-hidden bg-foreground-950">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=dark%20technological%20command%20center%20with%20emerald%20green%20glowing%20hexagonal%20grid%20overlay%2C%20interconnected%20network%20nodes%20pulsing%20with%20light%2C%20abstract%20data%20streams%20flowing%20vertically%2C%20premium%20enterprise%20dashboard%20aesthetic%20with%20subtle%20geometric%20patterns%2C%20deep%20charcoal%20background%20with%20vibrant%20emerald%20accent%20lights%2C%20cinematic%20wide%20shot%20with%20depth%20and%20atmosphere%2C%20no%20text%20no%20logos&width=1920&height=900&seq=kos-full-upgrade-homepage-bg&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
          width="1920"
          height="900"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground-950 via-foreground-950/95 to-foreground-950" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />

        {phase === 'countdown' && countdown !== null ? (
          /* ─── COUNTDOWN ─── */
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 animate-pulse mb-8">
              <span className="text-7xl font-bold text-emerald-400 font-heading">{countdown}</span>
            </div>
            <p className="text-2xl font-bold text-white font-heading mb-3">
              {isEn ? 'Mass Activation in Progress...' : 'Activation Massive en Cours...'}
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto font-body">
              {isEn
                ? 'All 18 KOS agents are receiving their mission orders simultaneously. The KOS Automation Engine is deploying.'
                : 'Les 18 agents KOS reçoivent leurs ordres de mission simultanément. Le KOS Automation Engine se déploie.'}
            </p>
          </div>
        ) : phase === 'launching' ? (
          /* ─── LAUNCHING ─── */
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500 animate-pulse mb-8">
              <i className="ri-rocket-2-line text-5xl text-emerald-400"></i>
            </div>
            <p className="text-2xl font-bold text-white font-heading mb-3">
              {isEn ? 'LAUNCHING — Full Upgrade Activated!' : 'DÉCOLLAGE — Full Upgrade Activé !'}
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto font-body">
              {isEn ? 'Redirecting to the Command Center...' : 'Redirection vers le Centre de Commandement...'}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ─── IDLE — Main Content ─── */
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full bg-red-500/10 border border-red-400/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  {isEn ? 'MISSION CRITICAL — 18 Agents on Standby' : 'MISSION CRITIQUE — 18 Agents en Attente'}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-[1.15] tracking-tight font-heading">
                {isEn ? 'KOS Full System Upgrade' : 'KOS Full System Upgrade'}
                <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-400 bg-clip-text text-transparent mt-2">
                  {isEn ? '100% Big Four — One Click' : '100% Big Four — Un Clic'}
                </span>
              </h2>

              <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed font-body">
                {isEn
                  ? 'Launch all system updates and upgrades simultaneously. 18 specialized agents, 66 subtasks, 6 critical security and performance patches. From 93.5% to 100% Big Four Supreme certification.'
                  : 'Lancez toutes les mises à jour et upgrades système simultanément. 18 agents spécialisés, 66 sous-tâches, 6 correctifs critiques sécurité et performance. De 93,5% à 100% certification Big Four Supreme.'}
              </p>
            </div>

            {/* Dual Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* Left: Manifest Stats */}
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 font-heading">
                  <i className="ri-clipboard-line text-emerald-400" />
                  {isEn ? 'Upgrade Manifest' : 'Manifeste Upgrade'}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: isEn ? 'System Updates' : 'Mises à Jour', val: massLaunchManifest.totalSystemUpdates, icon: 'ri-refresh-line', color: 'emerald' },
                    { label: isEn ? 'System Upgrades' : 'Upgrades', val: massLaunchManifest.totalSystemUpgrades, icon: 'ri-arrow-up-circle-line', color: 'emerald' },
                    { label: isEn ? 'Agents' : 'Agents', val: massLaunchManifest.totalAgents, icon: 'ri-team-line', color: 'emerald' },
                    { label: isEn ? 'Subtasks' : 'Sous-tâches', val: massLaunchManifest.totalSubtasks, icon: 'ri-list-check', color: 'emerald' },
                    { label: isEn ? 'Critical' : 'Critiques', val: massLaunchManifest.criticalTasks, icon: 'ri-error-warning-line', color: 'red' },
                    { label: isEn ? 'Target' : 'Objectif', val: `${massLaunchManifest.targetScore}%`, icon: 'ri-trophy-line', color: 'emerald' },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className={`text-xl font-bold font-heading ${s.color === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {s.val}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1 font-body">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Score gauge */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-body">
                      {isEn ? 'Current Score' : 'Score Actuel'}
                    </span>
                    <span className="text-2xl font-bold text-emerald-400 font-heading">
                      {massLaunchManifest.currentScore}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${massLaunchManifest.currentScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-body">
                    <span>93.5%</span>
                    <span className="text-emerald-400 font-bold">{massLaunchManifest.targetScore}% {isEn ? 'Target' : 'Cible'}</span>
                  </div>
                </div>
              </div>

              {/* Right: Task Overview & Agent Roster */}
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 flex flex-col">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 font-heading">
                  <i className="ri-stack-line text-emerald-400" />
                  {isEn ? 'Task Overview' : 'Aperçu des Tâches'}
                </h3>

                {/* Critical Tasks */}
                <div className="space-y-2 mb-5 flex-1">
                  {criticalTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/15 flex-shrink-0">
                        <i className={`${task.agentIcon} text-xs text-red-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate font-body">{task.module}</p>
                        <p className="text-[10px] text-gray-500 font-body">{task.subtasks.length} {isEn ? 'subtasks' : 'sous-tâches'} · {task.assignedAgent}</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/15 text-red-400 font-body">CRITICAL</span>
                    </div>
                  ))}
                </div>

                {/* Agent Roster */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-body">
                    {isEn ? 'Agents on Standby' : 'Agents en Attente'} ({unifiedAgentsForMassLaunch.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {unifiedAgentsForMassLaunch.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-body"
                        title={a.agent}
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        <i className={`${a.icon} text-[10px]`} />
                        {a.agent.split(' ').slice(0, 2).join(' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="text-center">
              <button
                onClick={handleLaunch}
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-red-600 text-white font-bold text-lg cursor-pointer transition-all duration-300 hover:bg-red-500 hover:scale-[1.03] shadow-2xl shadow-red-600/30 animate-pulse whitespace-nowrap"
                type="button"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <i className="ri-rocket-2-line text-2xl relative z-10" />
                <span className="relative z-10 font-heading">
                  {isEn ? 'LAUNCH FULL UPGRADE — 18 AGENTS' : 'LANCER LE FULL UPGRADE — 18 AGENTS'}
                </span>
              </button>

              <p className="text-[11px] text-gray-500 mt-4 max-w-lg mx-auto font-body">
                <i className="ri-information-line mr-1 text-gray-600" />
                {isEn
                  ? '6 system updates + 6 infrastructure upgrades + 6 social automates. Parallel execution. Zero manual intervention. Estimated duration: 12-14 days (accelerated).'
                  : '6 mises à jour système + 6 upgrades infrastructure + 6 automates sociaux. Exécution parallèle. Zéro intervention manuelle. Durée estimée : 12-14 jours (accéléré).'}
              </p>

              {/* Additional info pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                {[
                  { icon: 'ri-shield-check-line', text: isEn ? 'ISO 42001 Certified' : 'Certifié ISO 42001' },
                  { icon: 'ri-lock-line', text: isEn ? 'Zero Downtime' : 'Zéro Coupure' },
                  { icon: 'ri-refresh-line', text: isEn ? 'Auto-Rollback' : 'Rollback Auto' },
                  { icon: 'ri-cpu-line', text: isEn ? '18 Parallel Agents' : '18 Agents Parallèles' },
                ].map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-body">
                    <i className={`${t.icon} text-emerald-500 text-xs`} />
                    {t.text}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" />
    </section>
  );
}



