import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SeoHead from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { useKosUnifiedKpis, UnifiedKpi } from '@/hooks/useKosUnifiedKpis';
import { useExecutiveCockpit, ExecutiveCockpitSnapshot } from '@/hooks/useExecutiveCockpit';
import { executiveKpiCards as mockKpiCards, pipelineData as mockPipeline, missionsActives as mockMissions, alertItems as mockAlerts, agentPerformance as mockAgents } from '@/mocks/executiveDashboard';

// ── Type helpers ──
interface MissionActive {
  id: string; client: string; secteur: string; mission: string;
  statut: 'Dans les délais' | 'En retard' | 'Terminé';
  progression: number; deadline: string; agent_lead: string;
}

interface AlertItem {
  id: string; niveau: 'ROUGE' | 'ORANGE' | 'JAUNE';
  message: string; date: string; agent_source: string;
}

interface AgentPerf {
  agent: string; score: number; livrables: number; delais: number;
}

interface PipelineMonth {
  mois: string; suspects: number; leads: number; opportunites: number; missions: number;
}

const getNiveauStyle = (niveau: string) => {
  const map: Record<string, string> = { ROUGE: 'bg-red-50 text-red-700 border-red-200', ORANGE: 'bg-amber-50 text-amber-700 border-amber-200', JAUNE: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
  return map[niveau] || 'bg-gray-50 text-gray-600 border-gray-200';
};

const getStatutStyle = (statut: string) => {
  const map: Record<string, string> = { 'Dans les délais': 'bg-emerald-50 text-emerald-700', 'En retard': 'bg-red-50 text-red-700', 'Terminé': 'bg-secondary-100 text-secondary-700' };
  return map[statut] || 'bg-gray-50 text-gray-600';
};

// ── Extract dashboard data from Supabase cockpit snapshot ──
function extractDashboardFromSnapshot(snapshot: ExecutiveCockpitSnapshot | null): {
  pipeline: PipelineMonth[];
  missions: MissionActive[];
  alerts: AlertItem[];
  agents: AgentPerf[];
  convGlobale: number;
  convLeadOpps: number;
  cycleMoyen: number;
} {
  const sk = snapshot?.strategic_kpis || {};
  return {
    pipeline: (sk?.pipeline_months as PipelineMonth[]) || [],
    missions: (sk?.missions_actives as MissionActive[]) || [],
    alerts: (sk?.alertes as AlertItem[]) || [],
    agents: (sk?.agents as AgentPerf[]) || [],
    convGlobale: (sk?.conv_globale as number) || 0,
    convLeadOpps: (sk?.conv_lead_opps as number) || 0,
    cycleMoyen: (sk?.cycle_moyen_jours as number) || 0,
  };
}

export default function ExecutiveDashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // ── Live data hooks ──
  const { executiveKpis, isLoading: kpisLoading, isLive: kpisLive } = useKosUnifiedKpis();
  const { snapshots, isLoading: cockpitLoading, isLive: cockpitLive, getLatestSnapshot } = useExecutiveCockpit();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kpisLoading && !cockpitLoading) {
      setLoading(false);
    }
  }, [kpisLoading, cockpitLoading]);

  const latestSnapshot = useMemo(() => getLatestSnapshot(), [snapshots]);

  // ── Resolved data (live or mock fallback) ──
  const kpiCards = useMemo(() => {
    if (kpisLive && executiveKpis.length >= 6) {
      return executiveKpis.map((k: UnifiedKpi, idx: number) => ({
        id: k.id,
        label: k.label,
        value: k.current,
        target: k.target,
        variation: k.trend === 'up' ? `+${k.current} ${k.unit}` : k.trend === 'down' ? `${k.current} ${k.unit}` : 'stable',
        variationPos: k.trend === 'up',
        icon: k.icon,
        color: ['#0D7B5F', '#4A7A1E', '#C2410C', '#4A5568', '#9B7B2C', '#8B3A4A'][idx % 6],
        unit: k.unit,
      }));
    }
    return mockKpiCards;
  }, [kpisLive, executiveKpis]);

  const dashData = useMemo(() => {
    if (cockpitLive && latestSnapshot) {
      return extractDashboardFromSnapshot(latestSnapshot);
    }
    return {
      pipeline: mockPipeline,
      missions: mockMissions,
      alerts: mockAlerts,
      agents: mockAgents,
      convGlobale: 4.6,
      convLeadOpps: 33,
      cycleMoyen: 52,
    };
  }, [cockpitLive, latestSnapshot]);

  // ── Summary stats ──
  const agentAvgScore = dashData.agents.length > 0
    ? (dashData.agents.reduce((s, a) => s + a.score, 0) / dashData.agents.length).toFixed(1)
    : '0';
  const totalLivrables = dashData.agents.reduce((s, a) => s + a.livrables, 0);

  return (
    <>
      <SeoHead
        title={isEn ? 'Executive Dashboard | KHEPRA OS 2 | KHEPRA EXPERTS' : 'Tableau de Bord Exécutif | KHEPRA OS 2 | KHEPRA EXPERTS'}
        description={isEn ? 'KHEPRA OS 2 Executive Dashboard — Real-time KPIs, pipeline, active missions, critical alerts, and agent performance. Powered by 15 specialized AI agents.' : 'Tableau de Bord Exécutif KHEPRA OS 2 — KPIs temps réel, pipeline, missions actives, alertes critiques et performance des agents. Propulsé par 15 agents IA spécialisés.'}
        keywords="executive dashboard, KHEPRA OS 2, business intelligence, compliance KPIs, pipeline management, agent performance, CEO dashboard"
        canonicalPath="/executive-dashboard"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* ── HEADER ── */}
        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${cockpitLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    KHEPRA OS 2 · {cockpitLive ? 'Live' : 'Cache'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'Executive Dashboard' : 'Tableau de Bord Exécutif'}</h1>
                <p className="text-sm text-foreground-400 mt-1">
                  {isEn ? 'Real-time overview of KHEPRA EXPERTS — KPIs, pipeline, missions, and agent performance. Powered by 15 AI agents.' : 'Vue d\'ensemble en temps réel de KHEPRA EXPERTS — KPIs, pipeline, missions et performance des agents. Propulsé par 15 agents IA.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-foreground-400">{latestSnapshot?.snapshot_date || '08 Juin 2026'}, 07:00 GMT</span>
                <span className="px-3 py-1.5 rounded-full bg-foreground-800 text-xs font-semibold">{isEn ? 'Q2 2026' : 'T2 2026'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DATA SOURCE INDICATOR ── */}
        {!cockpitLive && !loading && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-3">
            <div className="flex items-center gap-2 text-xs text-foreground-400 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <i className="ri-database-2-line text-amber-500" />
              <span>{isEn ? 'Displaying cached data — Supabase connection unavailable' : 'Affichage des données en cache — Connexion Supabase indisponible'}</span>
            </div>
          </div>
        )}

        {/* ── KPI CARDS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 pb-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-background-200/70 animate-pulse">
                  <div className="h-8 w-8 bg-background-200 rounded-lg mb-2" />
                  <div className="h-6 bg-background-200 rounded w-16 mb-1" />
                  <div className="h-3 bg-background-200 rounded w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {kpiCards.map(kpi => (
                <div key={kpi.id} className="bg-white rounded-xl p-4 border border-background-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${kpi.color}12` }}>
                      <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                    </div>
                    <span className={`text-[10px] font-bold ${kpi.variationPos ? 'text-emerald-600' : 'text-red-500'}`}>
                      {kpi.variation}
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold font-heading text-foreground-950">{kpi.value}</div>
                  <div className="text-[10px] text-foreground-400 uppercase tracking-wide mt-0.5">{kpi.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── MISSIONS ACTIVES ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-background-200/70 p-5">
              <div className="flex items-center justify-between mb-4">
                <BigFourSubtitleBar
                  label={isEn ? 'Active Missions' : 'Missions Actives'}
                  variant="left-accent"
                  accentColor="primary"
                  icon="ri-briefcase-line"
                />
                <span className="text-xs text-foreground-400">{dashData.missions.length} missions</span>
              </div>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 bg-background-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[340px] overflow-y-auto">
                  {dashData.missions.map(m => (
                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-100 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.statut === 'Dans les délais' ? '#059669' : m.statut === 'En retard' ? '#dc2626' : 'oklch(var(--secondary-500))' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-foreground-900 truncate">{m.client}</span>
                          <span className="text-foreground-400">·</span>
                          <span className="text-foreground-500">{m.secteur}</span>
                        </div>
                        <div className="text-foreground-600 truncate">{m.mission}</div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground-400">
                          <span>{m.agent_lead}</span>
                          <span>·</span>
                          <span>{new Date(m.deadline).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${m.progression}%`, background: m.progression >= 80 ? '#059669' : m.progression >= 40 ? '#d97706' : '#dc2626' }} />
                          </div>
                          <span className="text-[10px] font-bold text-foreground-500">{m.progression}%</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatutStyle(m.statut)}`}>{m.statut}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── ALERTES ── */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-5">
              <div className="flex items-center justify-between mb-4">
                <BigFourSubtitleBar
                  label={isEn ? 'Critical Alerts' : 'Alertes Critiques'}
                  variant="left-accent"
                  accentColor="accent"
                  icon="ri-alert-line"
                />
                <span className="text-xs text-foreground-400">{dashData.alerts.length}</span>
              </div>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-20 bg-background-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[340px] overflow-y-auto">
                  {dashData.alerts.map(a => (
                    <div key={a.id} className={`p-3 rounded-xl border text-xs ${getNiveauStyle(a.niveau)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.niveau === 'ROUGE' ? 'bg-red-500' : a.niveau === 'ORANGE' ? 'bg-amber-500' : 'bg-yellow-500'}`} />
                        <span className="font-bold">{a.niveau}</span>
                        <span className="text-foreground-400">· {a.agent_source}</span>
                      </div>
                      <p className="text-foreground-700 leading-relaxed mb-1">{a.message}</p>
                      <span className="text-[10px] opacity-60">{new Date(a.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── PIPELINE + AGENTS ── */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* ── PIPELINE ── */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-5">
              <BigFourSubtitleBar
                label={isEn ? 'Pipeline 2026' : 'Pipeline 2026'}
                variant="double-stroke"
                accentColor="primary"
                icon="ri-git-branch-line"
                className="mb-5"
              />
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-8 bg-background-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-100">
                        <th className="text-left py-2 text-foreground-400 font-medium">{isEn ? 'Month' : 'Mois'}</th>
                        <th className="text-right py-2 text-foreground-400 font-medium">{isEn ? 'Suspects' : 'Suspects'}</th>
                        <th className="text-right py-2 text-foreground-400 font-medium">{isEn ? 'Leads' : 'Leads'}</th>
                        <th className="text-right py-2 text-foreground-400 font-medium">{isEn ? 'Opps' : 'Opps'}</th>
                        <th className="text-right py-2 text-foreground-400 font-medium">{isEn ? 'Missions' : 'Missions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashData.pipeline.map((p, i) => (
                        <tr key={p.mois} className={`border-b border-background-50 ${i === dashData.pipeline.length - 1 ? 'font-bold bg-accent-50/30' : ''}`}>
                          <td className="py-2.5 text-foreground-900">{p.mois}</td>
                          <td className="py-2.5 text-right text-foreground-600">{p.suspects}</td>
                          <td className="py-2.5 text-right text-foreground-600">{p.leads}</td>
                          <td className="py-2.5 text-right text-foreground-600">{p.opportunites}</td>
                          <td className="py-2.5 text-right font-bold" style={{ color: '#0D7B5F' }}>{p.missions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex gap-8 mt-4 pt-3 border-t border-background-100">
                {[
                  { label: isEn ? 'Global Conv.' : 'Conv. Globale', value: `${dashData.convGlobale}%` },
                  { label: isEn ? 'Lead → Opps' : 'Lead → Opps', value: `${dashData.convLeadOpps}%` },
                  { label: isEn ? 'Avg Cycle' : 'Cycle Moy.', value: `${dashData.cycleMoyen}j` },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="text-lg font-bold font-heading text-foreground-900">{m.value}</div>
                    <div className="text-[10px] text-foreground-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── AGENT PERFORMANCE ── */}
            <div className="bg-white rounded-2xl border border-background-200/70 p-5">
              <BigFourSubtitleBar
                label={isEn ? 'Agent Performance' : 'Performance des Agents'}
                variant="double-stroke"
                accentColor="accent"
                icon="ri-robot-line"
                className="mb-5"
              />
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 bg-background-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[320px] overflow-y-auto">
                  {dashData.agents.map(a => (
                    <div key={a.agent} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-background-50 transition-colors text-xs">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold bg-accent-100 text-accent-700">{a.agent.substring(0, 4).replace(' ', '')}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground-900 truncate">{a.agent}</div>
                        <div className="flex items-center gap-3 mt-0.5 text-[10px] text-foreground-400">
                          <span>{a.livrables} livrables</span>
                          <span>·</span>
                          <span>Délais: {a.delais}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-12 h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: a.score >= 95 ? '#059669' : a.score >= 90 ? '#d97706' : '#dc2626' }} />
                        </div>
                        <span className="font-bold text-foreground-700 w-7 text-right">{a.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-4 mt-4 pt-3 border-t border-background-100">
                {[
                  { label: isEn ? 'Avg Score' : 'Score Moy.', value: agentAvgScore },
                  { label: isEn ? 'Active Agents' : 'Agents Actifs', value: `${dashData.agents.length}/15` },
                  { label: isEn ? 'Total Livrables' : 'Total Livrables', value: String(totalLivrables) },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="text-lg font-bold font-heading text-foreground-900">{m.value}</div>
                    <div className="text-[10px] text-foreground-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}



