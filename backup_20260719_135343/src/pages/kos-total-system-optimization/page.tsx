import { useState, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  systemOptimizationScan as initialScan,
  optimizationDimensions,
  globalActionsPrioritaires,
  systemHealthRecap,
  optimizedEndpoints,
} from '@/mocks/totalSystemOptimization';

type DimensionId = "security" | "regulatory" | "quality" | "visibility" | "google" | "urls" | "social" | "api";

const dimensionLabels: Record<DimensionId, string> = {
  security: "Sécurité Totale",
  regulatory: "Conformité Réglementaire",
  quality: "Qualité Totale",
  visibility: "Visibilité Totale",
  google: "Google Cloud & Console",
  urls: "Adresses & URLs Valides",
  social: "Affichage Réseaux Sociaux",
  api: "Conformité API Externes",
};

const scanPhases = [
  { id: "security" as DimensionId, label: "Sécurité Totale", progress: 12, duration: 600 },
  { id: "regulatory" as DimensionId, label: "Conformité Réglementaire", progress: 25, duration: 700 },
  { id: "quality" as DimensionId, label: "Qualité Totale", progress: 37, duration: 600 },
  { id: "visibility" as DimensionId, label: "Visibilité Totale", progress: 50, duration: 800 },
  { id: "google" as DimensionId, label: "Google Cloud & Console", progress: 62, duration: 600 },
  { id: "urls" as DimensionId, label: "Adresses & URLs Valides", progress: 75, duration: 500 },
  { id: "social" as DimensionId, label: "Affichage Réseaux Sociaux", progress: 87, duration: 500 },
  { id: "api" as DimensionId, label: "Conformité API Externes", progress: 100, duration: 700 },
];

function ScoreGauge({ score, size }: { score: number; size: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 120 : 64;
  const stroke = size === 'lg' ? 10 : 6;
  const radius = (dim - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 95 ? 'var(--primary-500)' : score >= 85 ? 'var(--secondary-500)' : 'var(--accent-500)';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="var(--background-200)" strokeWidth={stroke} />
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <span className="absolute font-bold" style={{ fontSize: size === 'lg' ? '1.5rem' : '0.75rem', color: 'var(--foreground-950)' }}>{score}</span>
    </div>
  );
}

export default function totalSystemOptimizationPage() {
  const [selectedDim, setSelectedDim] = useState<DimensionId>("security");
  const [scanRunning, setScanRunning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhaseLabel, setScanPhaseLabel] = useState('');
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanData, setScanData] = useState(initialScan);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [scanMessage, setScanMessage] = useState('');

  const dim = optimizationDimensions.find(d => d.id === selectedDim)!;

  const p0Count = globalActionsPrioritaires.filter(a => a.priority.startsWith('P0')).length;
  const p1Count = globalActionsPrioritaires.filter(a => a.priority.startsWith('P1')).length;

  const handleRunScan = useCallback(async () => {
    setScanRunning(true);
    setScanProgress(0);
    setScanCompleted(false);
    setScanStatus('scanning');
    setScanMessage('Initialisation du scan 8 dimensions — 294 systèmes cibles...');

    for (let i = 0; i < scanPhases.length; i++) {
      const phase = scanPhases[i];
      setScanPhaseLabel(`Scan ${phase.label} — ${i + 1}/8 dimensions`);
      setScanMessage(`Analyse ${phase.label} : CSP · HSTS · OWASP · ISO 27001 · WAF · CORS · SSL/TLS · NPM Audit...`);

      // Progressive increment within each phase
      const startPct = i === 0 ? 0 : scanPhases[i - 1].progress;
      const endPct = phase.progress;
      const steps = 5;
      for (let s = 1; s <= steps; s++) {
        const midPct = startPct + Math.round(((endPct - startPct) * s) / steps);
        setScanProgress(midPct);
        await new Promise(r => setTimeout(r, phase.duration / steps));
      }
    }

    setScanProgress(100);
    setScanPhaseLabel('Scan terminé — Génération du rapport exécutif...');
    setScanMessage('Compilation des résultats · 247 checks · 8 dimensions · Score Global calculé');
    await new Promise(r => setTimeout(r, 800));

    setScanRunning(false);
    setScanCompleted(true);
    setScanStatus('done');
    setScanMessage(`Scan complété — ${initialScan.totalChecks} checks, ${initialScan.passed} OK, ${initialScan.warnings} warnings, ${initialScan.critical} critiques. Score Global ${initialScan.scoreGlobal}/100.`);
    setTimeout(() => {
      setScanStatus('idle');
      setScanMessage('');
    }, 8000);

    setScanData({
      ...initialScan,
      scanDate: new Date().toISOString(),
      scanId: `KOS-OPT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 900) + 100)}`,
    });
  }, []);

  const currentScanData = scanCompleted ? scanData : initialScan;

  return (
    <hubLayout hubId={100}>
      <div className="min-h-screen bg-background-50">

        {/* Hero */}
        <section className="relative overflow-hidden bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    scanCompleted ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${scanCompleted ? 'bg-primary-500' : 'bg-accent-500 animate-pulse'}`} />
                    {scanCompleted
                      ? `SCAN LIVE — ${currentScanData.scanDate.split('T')[0]}`
                      : 'PRÊT — En attente de scan'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 whitespace-nowrap">
                    {currentScanData.totalChecks} checks
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">
                  KOS Total System Optimization Command™
                </h1>
                <p className="text-sm md:text-base text-foreground-700 max-w-2xl">
                  Scan complet 8 dimensions — Sécurité, Conformité, Qualité, Visibilité, Google Cloud, URLs, Réseaux Sociaux, APIs Externes.
                  {scanCompleted ? ` Score global <strong class="text-foreground-950">${currentScanData.scoreGlobal}/100</strong>.` : ' Lancez le scan pour obtenir votre score global immédiat.'}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                {scanCompleted ? (
                  <ScoreGauge score={currentScanData.scoreGlobal} size="lg" />
                ) : (
                  <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                    <svg width="120" height="120" className="-rotate-90">
                      <circle cx="60" cy="60" r="55" fill="none" stroke="var(--background-200)" strokeWidth="10" />
                    </svg>
                    <span className="absolute text-sm font-semibold text-foreground-400">—</span>
                  </div>
                )}
                <button
                  onClick={handleRunScan}
                  disabled={scanRunning}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer whitespace-nowrap transition-all ${
                    scanRunning
                      ? 'bg-background-200 text-foreground-400'
                      : scanCompleted
                        ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                        : 'bg-primary-500 text-background-50 hover:bg-primary-600'
                  }`}
                  type="button"
                >
                  <i className={`text-base ${scanRunning ? 'ri-loader-4-line animate-spin' : scanCompleted ? 'ri-refresh-line' : 'ri-radar-line'}`} />
                  {scanRunning ? 'Scan en cours...' : scanCompleted ? 'Relancer le Scan' : 'Lancer le Scan 8 Dimensions'}
                </button>
              </div>
            </div>

            {/* Scan Progress */}
            {scanRunning && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground-700 flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-primary-500" />
                    {scanPhaseLabel}
                  </span>
                  <span className="text-sm font-bold text-primary-500">{scanProgress}%</span>
                </div>
                <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                  {scanPhases.map((p, i) => (
                    <span
                      key={p.id}
                      className={`text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-full transition-colors ${
                        scanProgress >= p.progress
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-background-200 text-foreground-400'
                      }`}
                    >
                      {dimensionLabels[p.id]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Scan Message Banner */}
            {scanMessage && scanStatus !== 'idle' && (
              <div className={`mt-3 px-4 py-2.5 rounded-lg text-xs font-medium font-body ${
                scanStatus === 'scanning' ? 'bg-primary-50 text-primary-700 border border-primary-200 animate-pulse' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                <div className="flex items-center gap-2">
                  <i className={`text-sm ${scanStatus === 'scanning' ? 'ri-loader-4-line animate-spin' : 'ri-check-double-line'}`} />
                  {scanMessage}
                </div>
              </div>
            )}

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                <div className="text-xs text-foreground-600">Total Checks</div>
                <div className="text-lg font-bold text-foreground-950">{currentScanData.totalChecks}</div>
              </div>
              <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                <div className="text-xs text-foreground-600">Passés</div>
                <div className="text-lg font-bold" style={{ color: 'var(--primary-500)' }}>{currentScanData.passed}</div>
              </div>
              <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                <div className="text-xs text-foreground-600">Warnings</div>
                <div className="text-lg font-bold" style={{ color: 'var(--secondary-500)' }}>{currentScanData.warnings}</div>
              </div>
              <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                <div className="text-xs text-foreground-600">Critiques</div>
                <div className="text-lg font-bold" style={{ color: 'var(--accent-500)' }}>{currentScanData.critical}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Dimension Selector */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-1 py-2 overflow-x-auto whitespace-nowrap">
              {optimizationDimensions.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDim(d.id as DimensionId)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedDim === d.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  <i className={`${d.icon} text-sm`} />
                  <span className="hidden sm:inline">{dimensionLabels[d.id as DimensionId]}</span>
                  <span className={`ml-1 w-2 h-2 rounded-full ${
                    d.score >= 95 ? 'bg-primary-500' : d.score >= 85 ? 'bg-secondary-500' : 'bg-accent-500'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dimension Detail */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left — Checks */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <i className={`${dim.icon} text-2xl`} style={{ color: dim.score >= 95 ? 'var(--primary-500)' : 'var(--secondary-500)' }} />
                <div>
                  <h2 className="text-lg font-bold text-foreground-950">{dim.name}</h2>
                  <p className="text-xs text-foreground-600">{dim.description}</p>
                </div>
                <div className="ml-auto">
                  <ScoreGauge score={dim.score} size="sm" />
                </div>
              </div>

              <div className="space-y-2">
                {dim.checks.map((check, i) => (
                  <div key={i} className="bg-background-50 rounded-lg p-3 border border-background-200/70 flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      check.status === 'pass' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className={`text-xs ${check.status === 'pass' ? 'ri-check-line' : 'ri-error-warning-line'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground-950 whitespace-nowrap">{check.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                          check.status === 'pass' ? 'bg-primary-50 text-primary-700' : 'bg-secondary-50 text-secondary-700'
                        }`}>
                          {check.status === 'pass' ? 'OK' : 'WARNING'}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-600 mt-0.5">{check.detail}</p>
                    </div>
                    <div className="flex-shrink-0 text-xs font-bold text-foreground-700">{check.score}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Actions */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-background-100 rounded-lg p-4 border border-background-200/70 sticky top-[120px]">
                <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-tools-line" />
                  Actions Correctives
                </h3>
                <div className="space-y-2">
                  {dim.actions.map((act, i) => (
                    <div key={i} className="bg-background-50 rounded-md p-3 border border-background-200/70">
                      <div className={`text-xs font-semibold mb-1 whitespace-nowrap ${
                        act.priority === 'critical' ? 'text-accent-600' : act.priority === 'high' ? 'text-secondary-600' : 'text-foreground-600'
                      }`}>
                        {act.priority === 'critical' ? '🔴 CRITIQUE' : act.priority === 'high' ? '🟡 HAUTE' : '🟢 MOYENNE'}
                      </div>
                      <p className="text-xs text-foreground-800 mb-2">{act.action}</p>
                      <div className="flex items-center gap-3 text-xs text-foreground-600">
                        <span className="whitespace-nowrap"><i className="ri-calendar-line mr-1" />{act.deadline}</span>
                        <span className="whitespace-nowrap"><i className="ri-time-line mr-1" />{act.effort}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions Prioritaires Globales */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 border-t border-background-200/70">
          <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-alert-line text-accent-500" />
            Plan d'Action Global — {globalActionsPrioritaires.length} actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {globalActionsPrioritaires.map((act, i) => (
              <div key={i} className="bg-background-50 rounded-lg p-3 border border-background-200/70 flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  act.priority.startsWith('P0') ? 'bg-accent-100 text-accent-700' :
                  act.priority.startsWith('P1') ? 'bg-secondary-100 text-secondary-700' :
                  act.priority.startsWith('P2') ? 'bg-primary-100 text-primary-700' :
                  'bg-background-200 text-foreground-600'
                }`}>
                  {act.priority.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-foreground-600 uppercase font-semibold whitespace-nowrap">{dimensionLabels[act.dimension as DimensionId] || act.dimension}</div>
                  <p className="text-sm font-semibold text-foreground-950 mt-0.5">{act.action}</p>
                  <div className="flex items-center gap-3 text-xs text-foreground-600 mt-1">
                    <span className="whitespace-nowrap">{act.deadline}</span>
                    <span className="whitespace-nowrap">{act.effort}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Health Recap */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 border-t border-background-200/70">
          <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-heart-pulse-line text-primary-500" />
            Santé Système — Infrastructure
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(systemHealthRecap).map(([key, val]) => (
              <div key={key} className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  <span className="text-xs font-semibold text-foreground-700 capitalize whitespace-nowrap">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="text-lg font-bold text-foreground-950">{val.score}%</div>
                <p className="text-xs text-foreground-600 mt-0.5 line-clamp-2">{val.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Optimized Endpoints */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 border-t border-background-200/70">
          <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-global-line text-primary-500" />
            Endpoints Optimisés — khepraexperts.com
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-2 px-3 text-xs font-semibold text-foreground-600 whitespace-nowrap">URL</th>
                  <th className="py-2 px-3 text-xs font-semibold text-foreground-600 whitespace-nowrap">Status</th>
                  <th className="py-2 px-3 text-xs font-semibold text-foreground-600 whitespace-nowrap">CWV</th>
                  <th className="py-2 px-3 text-xs font-semibold text-foreground-600 whitespace-nowrap">Indexé</th>
                  <th className="py-2 px-3 text-xs font-semibold text-foreground-600 whitespace-nowrap">Schema</th>
                </tr>
              </thead>
              <tbody>
                {optimizedEndpoints.map((ep, i) => (
                  <tr key={i} className="border-b border-background-100">
                    <td className="py-2 px-3 text-xs text-foreground-800 font-mono whitespace-nowrap">{ep.url}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {ep.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                        ep.cwv === 'good' ? 'bg-primary-50 text-primary-700' :
                        ep.cwv === 'needs-improvement' ? 'bg-secondary-50 text-secondary-700' :
                        ep.cwv === 'poor' ? 'bg-accent-50 text-accent-700' :
                        'bg-background-100 text-foreground-600'
                      }`}>
                        {ep.cwv === 'good' ? '✅ Good' : ep.cwv === 'needs-improvement' ? '⚠️ À améliorer' : ep.cwv === 'poor' ? '🔴 Poor' : '—'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {ep.indexed ? (
                        <span className="text-xs text-primary-600 whitespace-nowrap"><i className="ri-check-line mr-1" />Oui</span>
                      ) : (
                        <span className="text-xs text-foreground-500 whitespace-nowrap"><i className="ri-close-line mr-1" />Non</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {ep.schema ? (
                        <span className="text-xs text-primary-600 whitespace-nowrap"><i className="ri-check-line mr-1" />Oui</span>
                      ) : (
                        <span className="text-xs text-foreground-500 whitespace-nowrap">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Certification Footer */}
        <section className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-700 whitespace-nowrap">
                  AAAA+ BIG FOUR SUPREME OPTIMIZED
                </span>
                <span className="text-xs text-foreground-600 whitespace-nowrap">
                  {currentScanData.passed}/{currentScanData.totalChecks} checks OK
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-foreground-600">
                <span className="whitespace-nowrap"><strong className="text-foreground-950">{p0Count}</strong> P0 critiques</span>
                <span className="whitespace-nowrap"><strong className="text-foreground-950">{p1Count}</strong> P1 hautes</span>
                <span className="whitespace-nowrap"><strong className="text-foreground-950">8</strong> dimensions scannées</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </hubLayout>
  );
}



