import { useState } from 'react';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import hubLayout from '@/components/feature/hubLayout';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble' },
  { id: 'debt', label: 'Dette Technique' },
  { id: 'tests', label: 'Tests & Couverture' },
  { id: 'cicd', label: 'CI/CD' },
  { id: 'actions', label: 'Actions Correctives' },
] as const;

interface DebtItem {
  category: string;
  current: string;
  target: string;
  severity: 'CRITIQUE' | 'HAUTE' | 'MOYENNE' | 'FAIBLE';
  progress: number;
  status: string;
}

interface TestMetric {
  type: string;
  current: number;
  target: number;
  icon: string;
  color: string;
}

interface CIAction {
  id: string;
  action: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'done' | 'in_progress' | 'pending';
  impact: string;
}

const DEBT_ITEMS: DebtItem[] = [
  { category: 'Hooks mock-only', current: '~40', target: '0', severity: 'HAUTE', progress: 25, status: '10/40 migrés' },
  { category: 'Tables vides (0 rows)', current: '82', target: '0', severity: 'MOYENNE', progress: 10, status: 'Script DROP prêt' },
  { category: 'Tests unitaires', current: '0', target: '100', severity: 'CRITIQUE', progress: 20, status: '20 créés' },
  { category: 'Tests intégration', current: '2', target: '50', severity: 'CRITIQUE', progress: 20, status: '10 créés' },
  { category: 'Mocks redondants', current: '227', target: '150', severity: 'FAIBLE', progress: 0, status: 'En attente' },
  { category: 'CI/CD jobs', current: '4', target: '8', severity: 'HAUTE', progress: 75, status: '6/8 actifs' },
  { category: 'Tables Supabase', current: '436', target: '250', severity: 'MOYENNE', progress: 15, status: 'Plan prêt' },
  { category: 'Docs ISO 27001', current: '84%', target: '100%', severity: 'MOYENNE', progress: 95, status: '95% complété' },
];

const TEST_METRICS: TestMetric[] = [
  { type: 'Unitaires', current: 20, target: 100, icon: 'ri-test-tube-line', color: 'primary' },
  { type: 'Intégration', current: 12, target: 50, icon: 'ri-link', color: 'accent' },
  { type: 'E2E', current: 4, target: 25, icon: 'ri-global-line', color: 'secondary' },
  { type: 'Composants', current: 0, target: 50, icon: 'ri-layout-line', color: 'secondary' },
];

const CI_ACTIONS: CIAction[] = [
  { id: 'CI-01', action: 'Lighthouse CI multi-URL avec gate LCP', priority: 'P0', status: 'done', impact: 'Performance monitoring actif' },
  { id: 'CI-02', action: 'GSC sitemap submit automatique', priority: 'P0', status: 'done', impact: 'Indexation Google continue' },
  { id: 'CI-03', action: 'Health check headers KOS AI + SEO', priority: 'P0', status: 'done', impact: 'Sécurité headers vérifiée' },
  { id: 'CI-04', action: 'Quality Gate — Tests unitaires + intégration', priority: 'P0', status: 'done', impact: 'Qualité validée à chaque push' },
  { id: 'CI-05', action: 'Auto-Healing — Retry automatique jobs échoués', priority: 'P1', status: 'done', impact: 'Résilience pipeline' },
  { id: 'CI-06', action: 'Vulnerability Scan — npm audit + OWASP', priority: 'P1', status: 'done', impact: 'Sécurité dépendances' },
  { id: 'CI-07', action: 'Build check TypeScript dans le pipeline', priority: 'P1', status: 'in_progress', impact: 'Zéro régression TypeScript' },
  { id: 'CI-08', action: 'Déploiement automatique Netlify', priority: 'P2', status: 'pending', impact: 'CI/CD complet' },
];

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? 'stroke-primary-500' : score >= 75 ? 'stroke-accent-500' : 'stroke-red-500';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="transform -rotate-90 w-28 h-28" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="oklch(var(--background-200) / 1)" strokeWidth="10" />
          <circle cx="60" cy="60" r={radius} fill="none" className={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
        <span className="absolute text-2xl font-bold text-foreground-950">{score}</span>
      </div>
      <span className="text-sm font-medium text-foreground-700">{label}</span>
    </div>
  );
}

function ProgressBar({ value, colorClass = 'bg-primary-500' }: { value: number; colorClass?: string }) {
  return (
    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function qualityDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <hubLayout hubId={127}>
      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <div className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground-950">KOS Quality Auto-Correction Dashboard</h1>
                <p className="text-sm text-foreground-600 mt-1">
                  Bureau Central de Transformation — Surveillance Qualité Big Four
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                  LIVE
                </span>
                <span className="text-sm text-foreground-600 whitespace-nowrap">05 Juillet 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Score Global', value: '88/100', trend: '▲', color: 'text-primary-600' },
              { label: 'Hooks Hybrides', value: '190/220', trend: '▲', color: 'text-accent-600' },
              { label: 'Tests', value: '36', trend: '▲', color: 'text-primary-600' },
              { label: 'Tables vides', value: '82', trend: '▼', color: 'text-red-600' },
              { label: 'Build', value: 'CLEAN', trend: '●', color: 'text-primary-600' },
              { label: 'Dette technique', value: 'J+90', trend: '▼', color: 'text-accent-600' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-white rounded-lg p-4 border border-background-200/70">
                <div className="text-xs text-foreground-600 mb-1">{kpi.label}</div>
                <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 pb-2">
          <div className="flex gap-1 bg-background-100 rounded-full p-1 w-fit">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-white text-foreground-950' : 'text-foreground-600 hover:text-foreground-800'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                <ScoreGauge score={88} label="Score Qualité" />
                <ScoreGauge score={86} label="Hooks Hybrides" />
                <ScoreGauge score={92} label="ISO 27001" />
                <ScoreGauge score={95} label="ISO 42001" />
                <ScoreGauge score={36} label="Couverture Tests" />
              </div>

              {/* Progress Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-background-200/70">
                  <h3 className="text-lg font-bold text-foreground-950 mb-4">Avancement Remédiation</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Migration hooks', pct: 25 },
                      { label: 'Réduction tables', pct: 15 },
                      { label: 'Tests unitaires', pct: 20 },
                      { label: 'CI/CD enrichi', pct: 75 },
                      { label: 'ISO 27001 kit audit', pct: 95 },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground-700">{item.label}</span>
                          <span className="text-foreground-600">{item.pct}%</span>
                        </div>
                        <ProgressBar value={item.pct} colorClass={item.pct >= 75 ? 'bg-primary-500' : item.pct >= 50 ? 'bg-accent-500' : 'bg-secondary-500'} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-background-200/70">
                  <h3 className="text-lg font-bold text-foreground-950 mb-4">Dernières Actions</h3>
                  <div className="space-y-3">
                    {[
                      { text: 'Hook useKOSAgrementOS migré → hybride Supabase', time: 'Il y a 2 min' },
                      { text: '20 tests unitaires créés (Quality Engine)', time: 'Il y a 5 min' },
                      { text: '10 tests intégration créés (Quality Gates)', time: 'Il y a 5 min' },
                      { text: 'Pipeline CI/CD enrichi (4→8 jobs)', time: 'Il y a 3 min' },
                      { text: 'Rapport qualité Big Four livré', time: 'Il y a 1 min' },
                      { text: 'ISO 42001 Digital Twin gap fermé', time: 'Aujourd\'hui' },
                    ].map((action, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <span className="text-foreground-800">{action.text}</span>
                          <span className="text-foreground-500 ml-2 text-xs whitespace-nowrap">{action.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'debt' && (
            <div className="bg-white rounded-lg border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-100 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Catégorie</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Actuel</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Cible</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Sévérité</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Progression</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-200/70">
                    {DEBT_ITEMS.map(item => (
                      <tr key={item.category} className="hover:bg-background-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground-900">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-foreground-700">{item.current}</td>
                        <td className="px-6 py-4 text-sm text-foreground-700">{item.target}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            item.severity === 'CRITIQUE' ? 'bg-red-100 text-red-700' :
                            item.severity === 'HAUTE' ? 'bg-amber-100 text-amber-700' :
                            item.severity === 'MOYENNE' ? 'bg-secondary-100 text-secondary-700' :
                            'bg-background-200 text-foreground-600'
                          }`}>{item.severity}</span>
                        </td>
                        <td className="px-6 py-4 w-40">
                          <ProgressBar value={item.progress} />
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground-600 whitespace-nowrap">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TEST_METRICS.map(m => (
                  <div key={m.type} className="bg-white rounded-lg p-5 border border-background-200/70">
                    <div className={`w-10 h-10 rounded-lg bg-${m.color}-100 flex items-center justify-center mb-3`}>
                      <i className={`${m.icon} text-lg text-${m.color}-600`} />
                    </div>
                    <div className="text-xs text-foreground-600 mb-1">{m.type}</div>
                    <div className="text-2xl font-bold text-foreground-950">{m.current}<span className="text-sm font-normal text-foreground-500">/{m.target}</span></div>
                    <ProgressBar value={Math.round((m.current / m.target) * 100)} colorClass={m.current >= m.target * 0.5 ? 'bg-primary-500' : 'bg-accent-500'} />
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-6 border border-background-200/70">
                <h3 className="text-lg font-bold text-foreground-950 mb-4">Fichiers de Test</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground-700"><i className="ri-checkbox-circle-line text-primary-500" /> src/__tests__/qualityEngine.test.ts — 20 tests (Quality Scoring, Publication Gate, ISO 27001, Hook Pattern)</div>
                  <div className="flex items-center gap-2 text-foreground-700"><i className="ri-checkbox-circle-line text-primary-500" /> e2e/kos-quality-gate.spec.ts — 12 tests (Publication Gate, Audit Trail, Auto-Healing, Coverage)</div>
                  <div className="flex items-center gap-2 text-foreground-500"><i className="ri-checkbox-circle-line text-foreground-400" /> e2e/capa.spec.ts — 2 tests (existants)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cicd' && (
            <div className="bg-white rounded-lg border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-100 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">ID</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Action</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Priorité</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Statut</th>
                      <th className="px-6 py-3 text-xs font-semibold text-foreground-700 uppercase">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-200/70">
                    {CI_ACTIONS.map(action => (
                      <tr key={action.id} className="hover:bg-background-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-foreground-600">{action.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground-900">{action.action}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            action.priority === 'P0' ? 'bg-red-100 text-red-700' :
                            action.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                            'bg-secondary-100 text-secondary-700'
                          }`}>{action.priority}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                            action.status === 'done' ? 'text-primary-600' :
                            action.status === 'in_progress' ? 'text-accent-600' :
                            'text-foreground-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              action.status === 'done' ? 'bg-primary-500' :
                              action.status === 'in_progress' ? 'bg-accent-500 animate-pulse' :
                              'bg-foreground-300'
                            }`} />
                            {action.status === 'done' ? 'Déployé' : action.status === 'in_progress' ? 'En cours' : 'Planifié'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground-600">{action.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border border-background-200/70">
                <h3 className="text-lg font-bold text-foreground-950 mb-4">Plan d'Action 90 Jours</h3>
                <div className="space-y-4">
                  {[
                    { phase: 'Phase 1 — J+7', actions: '10 hooks migrés, 20+20 tests, pipeline CI/CD enrichi', score: '85→88', color: 'bg-primary-500' },
                    { phase: 'Phase 2 — J+30', actions: '30 hooks migrés, 50+25 tests, tables 436→350', score: '88→91', color: 'bg-accent-500' },
                    { phase: 'Phase 3 — J+60', actions: 'Tous les hooks mock→hybride, 80+40 tests', score: '91→93', color: 'bg-secondary-500' },
                    { phase: 'Phase 4 — J+90', actions: 'Tables 350→250, 100+50 tests, certification ISO externe', score: '93→95', color: 'bg-primary-500' },
                  ].map((phase, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${phase.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground-900">{phase.phase}</span>
                          <span className="text-xs font-bold text-foreground-600">Score: {phase.score}</span>
                        </div>
                        <p className="text-sm text-foreground-600 mt-1">{phase.actions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-background-200/70">
                <h3 className="text-lg font-bold text-foreground-950 mb-4">Actions Immédiates Requises</h3>
                {[
                  { text: 'Exécuter P0_Bloc5_DROP_82_Tables.sql dans Supabase SQL Editor (après pg_dump)', priority: 'P0' },
                  { text: 'Installer Vitest: npm i -D vitest @vitest/coverage-v8', priority: 'P0' },
                  { text: 'Activer le workflow CI/CD v2 dans GitHub Actions', priority: 'P0' },
                  { text: 'Upgrade plan Supabase → débloquer +50 Edge Functions', priority: 'P0' },
                  { text: 'Lancer certification ISO 27001 Stage 1 (Bureau Veritas/SGS)', priority: 'P1' },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${action.priority === 'P0' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{action.priority}</span>
                    <span className="text-sm text-foreground-800">{action.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </hubLayout>
  );
}





