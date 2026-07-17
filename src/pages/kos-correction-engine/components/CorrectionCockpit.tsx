interface CorrectionManifestItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  colorToken: string;
  fixesTotal: number;
  fixesToday: number;
  healthScore: number;
}

interface LoopStatus {
  currentPhase: string;
  lastFullScan: string;
  autoFixEnabled: boolean;
  nextScheduledScan: string;
}

interface Ticket {
  id: string;
  priority: string;
  module: string;
}

interface LoopLogEntry {
  timestamp: string;
  phase: string;
  status: string;
  details: string;
  duration: string;
}

interface CorrectionCockpitProps {
  manifest: CorrectionManifestItem[];
  loopStatus: LoopStatus;
  tickets: Ticket[];
  loopLog: LoopLogEntry[];
}

export default function CorrectionCockpit({ manifest, loopStatus, tickets, loopLog }: CorrectionCockpitProps) {
  const phases = ["Scan", "Diagnose", "Plan", "Fix", "Verify", "Monitor"];
  const currentPhaseIdx = phases.indexOf(loopStatus.currentPhase);

  const p0Count = tickets.filter(p => p.priority === "P0").length;
  const p1Count = tickets.filter(p => p.priority === "P1").length;
  const p2Count = tickets.filter(p => p.priority === "P2").length;
  const fixesToday = manifest.reduce((sum, m) => sum + m.fixesToday, 0);

  return (
    <div className="space-y-8">
      {/* Autonomous Loop Visualization */}
      <div className="bg-background-100 rounded-xl border border-background-200/70 p-6">
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-loop-left-line text-primary-500"></i>
          Boucle Autonome — Scan → Fix → Verify → Optimize → Monitor → Repeat
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {phases.map((phase, idx) => (
            <div key={phase} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                idx < currentPhaseIdx
                  ? 'bg-emerald-100 text-emerald-700'
                  : idx === currentPhaseIdx
                  ? 'bg-primary-500 text-background-50 animate-pulse'
                  : 'bg-background-200/50 text-foreground-400'
              }`}>
                <i className={`text-sm ${
                  idx < currentPhaseIdx
                    ? 'ri-check-line text-emerald-600'
                    : idx === currentPhaseIdx
                    ? 'ri-loader-4-line animate-spin text-background-50'
                    : 'ri-time-line'
                }`}></i>
                {phase}
              </div>
              {idx < phases.length - 1 && (
                <i className={`text-xs ${
                  idx < currentPhaseIdx ? 'text-emerald-400' : 'text-foreground-300'
                } ri-arrow-right-line`}></i>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-foreground-500 font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Dernier scan : {new Date(loopStatus.lastFullScan).toLocaleString('fr-FR')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
            Auto-fix : {loopStatus.autoFixEnabled ? 'Activé' : 'Désactivé'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Prochain scan : {new Date(loopStatus.nextScheduledScan).toLocaleString('fr-FR')}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
              <i className="ri-error-warning-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase tracking-wider">P0 Critiques</span>
          </div>
          <span className="text-3xl font-bold text-foreground-950 font-heading">{p0Count}</span>
          <p className="text-xs text-foreground-500 mt-1 font-body">Impact SEO/UX immédiat</p>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <i className="ri-alert-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase tracking-wider">P1 Majeurs</span>
          </div>
          <span className="text-3xl font-bold text-foreground-950 font-heading">{p1Count}</span>
          <p className="text-xs text-foreground-500 mt-1 font-body">Correction prioritaire 48h</p>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <i className="ri-information-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase tracking-wider">P2 Optimisations</span>
          </div>
          <span className="text-3xl font-bold text-foreground-950 font-heading">{p2Count}</span>
          <p className="text-xs text-foreground-500 mt-1 font-body">Amélioration continue</p>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <i className="ri-tools-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase tracking-wider">Aujourd'hui</span>
          </div>
          <span className="text-3xl font-bold text-foreground-950 font-heading">{fixesToday}</span>
          <p className="text-xs text-foreground-500 mt-1 font-body">Corrections appliquées</p>
        </div>
      </div>

      {/* Agents Grid */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-robot-2-line text-accent-500"></i>
          9 Modules de Correction — État
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {manifest.map(agent => (
            <div key={agent.id} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-${agent.colorToken}-100 text-${agent.colorToken}-700`}>
                  <i className={`${agent.icon} text-lg`}></i>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    agent.healthScore >= 90 ? 'bg-emerald-500' : agent.healthScore >= 80 ? 'bg-amber-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-xs font-semibold text-foreground-600 font-body">{agent.healthScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-foreground-100 text-foreground-600 font-body">
                  {agent.id}
                </span>
                <h4 className="text-sm font-semibold text-foreground-950 font-heading">{agent.name}</h4>
              </div>
              <p className="text-xs text-foreground-500 leading-relaxed mb-3 font-body line-clamp-2">{agent.description}</p>
              <div className="flex items-center gap-4 text-[10px] text-foreground-400 font-body">
                <span className="flex items-center gap-1">
                  <i className="ri-check-double-line text-emerald-500 text-xs"></i>
                  {agent.fixesTotal} fixes
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-flashlight-line text-primary-500 text-xs"></i>
                  {agent.fixesToday} aujourd'hui
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loop Activity Log */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-history-line text-secondary-500"></i>
          Journal de la Boucle Autonome
        </h3>
        <div className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden">
          <div className="divide-y divide-background-200/50">
            {loopLog.map((log, idx) => (
              <div key={idx} className="flex items-center gap-4 px-5 py-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  log.status === 'completed' ? 'bg-emerald-500' : 'bg-primary-500 animate-pulse'
                }`}></div>
                <span className="text-[10px] font-mono text-foreground-400 shrink-0 w-16">
                  {new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                  log.phase === 'Fix' ? 'bg-primary-100 text-primary-700' :
                  log.phase === 'Verify' ? 'bg-emerald-100 text-emerald-700' :
                  log.phase === 'Scan' ? 'bg-accent-100 text-accent-700' :
                  log.phase === 'Monitor' ? 'bg-secondary-100 text-secondary-700' :
                  'bg-background-200 text-foreground-600'
                }`}>{log.phase}</span>
                <span className="text-xs text-foreground-600 font-body flex-1">{log.details}</span>
                <span className="text-[10px] text-foreground-400 font-body shrink-0">{log.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}