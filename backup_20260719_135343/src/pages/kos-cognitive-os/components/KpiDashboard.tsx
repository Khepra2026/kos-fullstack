import { KPISearch } from '';

interface KpiDashboardProps {
  kpis: KPISearch;
  className?: string;
}

interface KpiTarget {
  label: string;
  value: number;
  target: number;
  inverse: boolean;
  unit: string;
  description: string;
}

export default function KpiDashboard({ kpis, className = '' }: KpiDashboardProps) {
  const targets: KpiTarget[] = [
    { label: 'Précision Sémantique', value: kpis.semanticPrecision, target: 90, inverse: false, unit: '%', description: 'Score de similarité vectorielle entre la requête et les documents retrouvés' },
    { label: 'Précision Réglementaire', value: kpis.regulatoryPrecision, target: 92, inverse: false, unit: '%', description: 'Taux de documents issus du corpus réglementaire prioritaire' },
    { label: 'Score d\'Autorité', value: kpis.authorityScore, target: 85, inverse: false, unit: '%', description: 'Niveau moyen d\'autorité des sources (BCEAO=100, Blog=20)' },
    { label: 'Match Juridiction', value: kpis.jurisdictionMatch, target: 80, inverse: false, unit: '%', description: 'Adéquation entre la juridiction cible et les sources retrouvées' },
    { label: 'Explicabilité', value: kpis.explainability, target: 90, inverse: false, unit: '%', description: 'Pourcentage de documents avec justification de récupération' },
    { label: 'Confiance', value: kpis.confidence, target: 88, inverse: false, unit: '%', description: 'Score composite : Sémantique + Autorité + Juridiction + Fraîcheur + Cohérence' },
    { label: 'Risque Hallucination', value: kpis.hallucinationRisk, target: 3, inverse: true, unit: '%', description: 'Probabilité de réponse non étayée par au moins 2 sources haute confiance' },
    { label: 'Couverture Preuves', value: kpis.evidenceCoverage, target: 95, inverse: false, unit: '%', description: 'Pourcentage des assertions couvertes par des preuves réglementaires' },
    { label: 'Score NaN', value: kpis.nan, target: 0, inverse: true, unit: '', description: 'Taux de scores numériques invalides détectés et corrigés' },
    { label: 'Latence', value: kpis.latence, target: 200, inverse: true, unit: 'ms', description: 'Temps de réponse total (recherche + reranking + confidence + génération)' },
  ];

  const passedCount = targets.filter(t => {
    if (t.inverse) return t.value <= t.target;
    return t.value >= t.target;
  }).length;

  return (
    <div className={`rounded-lg border border-background-200/70 bg-background-50 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-background-200/70">
        <div>
          <h3 className="text-sm font-semibold text-foreground-900">KPIs de Recherche — Temps Réel</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Métriques Big Four après chaque recherche réglementaire</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-500">
            {passedCount}/{targets.length} cibles atteintes
          </span>
          <div className="w-20 h-2 rounded-full bg-background-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(passedCount / targets.length) * 100}%`,
                background: passedCount === targets.length
                  ? 'oklch(var(--accent-500))'
                  : passedCount >= targets.length * 0.7
                    ? 'oklch(var(--secondary-500))'
                    : 'oklch(0.5 0.2 25)',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* KPI Rows */}
      <div className="divide-y divide-background-200/70">
        {targets.map((item) => {
          const pass = item.inverse ? item.value <= item.target : item.value >= item.target;
          const formattedValue = (() => {
            const raw = (typeof item.value === 'number' && isFinite(item.value)) ? item.value : 0;
            return item.unit === 'ms' ? Math.round(raw) : raw;
          })();
          const formattedTarget = item.unit === 'ms' ? item.target : item.target;
          const barPct = (() => {
            const raw = (typeof item.value === 'number' && isFinite(item.value)) ? item.value : 0;
            return Math.min((raw / Math.max(item.target, 1)) * 100, 100);
          })();

          return (
            <div
              key={item.label}
              className="flex items-center justify-between px-5 py-3 hover:bg-background-100/50 transition-colors cursor-default group"
              title={item.description}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${pass ? 'bg-accent-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-foreground-700 truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                {/* Progress bar */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-background-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pass ? 'bg-accent-500' : 'bg-red-400'}`}
                      style={{ width: `${barPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Value vs Target */}
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-mono font-semibold ${pass ? 'text-accent-700' : 'text-red-600'}`}>
                    {typeof formattedValue === 'number' && item.unit === '%'
                      ? formattedValue.toFixed(1)
                      : formattedValue
                    }{item.unit}
                  </span>
                  <span className="text-xs text-foreground-400">/ {formattedTarget}{item.unit}</span>
                </div>

                {/* Pass/Fail icon */}
                <div className="w-7 h-7 flex items-center justify-center">
                  {pass ? (
                    <i className="ri-checkbox-circle-fill text-accent-500 text-lg"></i>
                  ) : (
                    <i className="ri-alert-fill text-red-500 text-lg"></i>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="px-5 py-3 border-t border-background-200/70 bg-background-100/50 rounded-b-lg">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">
            Big Four Action Artefact — 12 KPIs automatiques
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-foreground-500">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Atteint
            </span>
            <span className="flex items-center gap-1 text-foreground-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Non atteint
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



