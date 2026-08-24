import { cockpitOverview as mockCockpit, agentsManifest as mockAgents, performanceScoreHistory as mockScoreHistory } from '@/mocks/performanceSEOCommand';

interface AgentData {
  id: number;
  name: string;
  icon: string;
  status: string;
  health: number;
  description: string;
  colorToken: string;
}

interface CockpitData {
  globalHealthScore: number;
  lighthouseMobileScore: number;
  lighthouseDesktopScore: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticesScore: number;
  securityGrade: string;
  pagesTotalWeightMB: number;
  lcpAverage: number;
  fcpAverage: number;
  clsAverage: number;
  tbtAverage: number;
  inpAverage: number;
  activeAgents: number;
  criticalAlerts: number;
  warningsActive: number;
  uptimePercent: number;
  lastFullScan: string;
  certification: string;
}

interface ScorePoint {
  date: string;
  mobile: number;
  desktop: number;
}

interface CockpitOverviewProps {
  cockpit?: CockpitData;
  agents?: AgentData[];
  scoreHistory?: ScorePoint[];
  isLive?: boolean;
}

function AgentCard({ agent }: { agent: AgentData }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    secondary: 'bg-secondary-100 text-secondary-700',
  };
  const statusColor = agent.status === 'optimized' ? 'bg-emerald-500' : agent.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500';
  const statusLabel = agent.status === 'optimized' ? 'OPTIMIZED' : agent.status.toUpperCase();
  const healthColor = agent.health >= 95 ? 'bg-emerald-500' : agent.health >= 80 ? 'bg-amber-500' : 'bg-red-500';
  const healthTextColor = agent.health >= 95 ? 'text-emerald-600' : agent.health >= 80 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 hover:border-background-300/60 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${colorMap[agent.colorToken] || 'bg-primary-100 text-primary-700'}`}>
          <i className={`${agent.icon} text-base`}></i>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></span>
          <span className="text-[10px] font-medium text-foreground-500 uppercase font-body">{statusLabel}</span>
        </div>
      </div>
      <h4 className="text-sm font-semibold text-foreground-950 mb-1 font-heading">{agent.name}</h4>
      <p className="text-xs text-foreground-500 mb-3 line-clamp-2 font-body">{agent.description}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${healthColor}`}
            style={{ width: `${agent.health}%` }}
          ></div>
        </div>
        <span className={`text-xs font-semibold font-body ${healthTextColor}`}>{agent.health}%</span>
      </div>
    </div>
  );
}

function GaugeRing({ value, max, label, color, size }: { value: number; max: number; label: string; color: string; size?: number }) {
  const s = size || 64;
  const r = (s - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;

  const getColor = () => {
    if (value >= 97) return '#10b981'; // emerald
    if (value >= 90) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const getBgClass = () => {
    if (value >= 97) return 'text-emerald-700';
    if (value >= 90) return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: s, height: s }}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="-rotate-90">
          <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="oklch(var(--background-200))" strokeWidth="5" />
          <circle
            cx={s / 2} cy={s / 2} r={r} fill="none" stroke={getColor()}
            strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold font-heading ${getBgClass()}`}>{value}</span>
      </div>
      <span className="text-[10px] font-medium text-foreground-600 font-body text-center">{label}</span>
    </div>
  );
}

export default function CockpitOverview({ cockpit: propCockpit, agents: propAgents, scoreHistory: propScoreHistory, isLive }: CockpitOverviewProps) {
  const cockpit = propCockpit || mockCockpit;
  const agents = propAgents || mockAgents;
  const scoreHistory = propScoreHistory || mockScoreHistory;

  return (
    <div className="space-y-8">
      {/* Live Data Badge */}
      {isLive !== undefined && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isLive ? 'Données Live — Supabase' : 'Données Mock — Démo'}
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
          <GaugeRing value={cockpit.lighthouseMobileScore} max={100} label="Mobile" color="primary" />
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
          <GaugeRing value={cockpit.lighthouseDesktopScore} max={100} label="Desktop" color="accent" />
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
          <GaugeRing value={cockpit.accessibilityScore} max={100} label="Accessibilité" color="secondary" />
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
          <GaugeRing value={cockpit.seoScore} max={100} label="SEO" color="primary" />
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
          <GaugeRing value={cockpit.bestPracticesScore} max={100} label="Bonnes pratiques" color="accent" />
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 flex flex-col items-center justify-center gap-2">
          <div className={`w-16 h-16 flex items-center justify-center rounded-full ${cockpit.securityGrade === 'A+' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            <span className={`text-xl font-bold font-heading ${cockpit.securityGrade === 'A+' ? 'text-emerald-700' : 'text-amber-700'}`}>{cockpit.securityGrade}</span>
          </div>
          <span className="text-[10px] font-medium text-foreground-600 font-body">Sécurité</span>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Évolution Lighthouse Score</h3>
        <div className="flex items-end gap-2 h-48">
          {scoreHistory.map((point) => (
            <div key={point.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div className="w-full flex flex-col items-center gap-0.5" style={{ height: 180 }}>
                <div className="w-full max-w-[24px] bg-accent-500/80 rounded-t" style={{ height: `${point.desktop * 0.18}%` }}></div>
                <div className="w-full max-w-[16px] bg-primary-500/80 rounded-t" style={{ height: `${point.mobile * 0.18}%` }}></div>
              </div>
              <span className="text-[9px] text-foreground-500 font-body mt-1 whitespace-nowrap">{point.date}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-accent-500/80"></span>
            <span className="text-[10px] text-foreground-600 font-body">Desktop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-primary-500/80"></span>
            <span className="text-[10px] text-foreground-600 font-body">Mobile</span>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground-950 font-heading">Agents Actifs</h3>
          <span className="text-xs text-foreground-500 font-body">{agents.length} agents</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4">
          <div className="text-sm text-foreground-600 mb-1 font-body">Poids total</div>
          <div className={`text-xl font-bold font-heading ${cockpit.pagesTotalWeightMB <= 1.5 ? 'text-emerald-600' : 'text-amber-600'}`}>{cockpit.pagesTotalWeightMB} <span className="text-sm font-normal text-foreground-500">Mo</span></div>
          <div className="text-[10px] text-foreground-500 mt-1 font-body">Objectif &lt; 2 Mo</div>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4">
          <div className="text-sm text-foreground-600 mb-1 font-body">LCP moyen</div>
          <div className={`text-xl font-bold font-heading ${cockpit.lcpAverage <= 2.5 ? 'text-emerald-600' : 'text-amber-600'}`}>{cockpit.lcpAverage}<span className="text-sm font-normal text-foreground-500">s</span></div>
          <div className="text-[10px] text-foreground-500 mt-1 font-body">Objectif &lt; 2.5s</div>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4">
          <div className="text-sm text-foreground-600 mb-1 font-body">CLS moyen</div>
          <div className={`text-xl font-bold font-heading ${cockpit.clsAverage <= 0.1 ? 'text-emerald-600' : 'text-amber-600'}`}>{cockpit.clsAverage}</div>
          <div className="text-[10px] text-foreground-500 mt-1 font-body">Objectif &lt; 0.1</div>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-4">
          <div className="text-sm text-foreground-600 mb-1 font-body">Alertes</div>
          <div className="text-xl font-bold text-foreground-950 font-heading">
            <span className={cockpit.criticalAlerts === 0 ? 'text-emerald-600' : 'text-red-600'}>{cockpit.criticalAlerts}</span>
            <span className="text-sm font-normal text-foreground-500"> critiques · </span>
            <span className={cockpit.warningsActive === 0 ? 'text-emerald-600' : 'text-amber-600'}>{cockpit.warningsActive}</span>
            <span className="text-sm font-normal text-foreground-500"> warnings</span>
          </div>
          <div className="text-[10px] text-foreground-500 mt-1 font-body">Uptime {cockpit.uptimePercent}%</div>
        </div>
      </div>
    </div>
  );
}





