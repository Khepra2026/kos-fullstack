
interface Props {
  keywords: string[];
  concepts: string[];
  evidences: Evidence[];
  confidence: ConfidenceScore;
  jurisdiction: string;
}

export default function ExplainabilityPanel({ keywords, concepts, evidences, confidence, jurisdiction }: Props) {
  const matchedJurisdiction = evidences.some(e => e.jurisdiction === jurisdiction);

  return (
    <div className="border border-background-200/70 rounded-lg p-5 bg-background-50">
      <h3 className="text-sm font-semibold text-foreground-900 mb-4 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-primary-100 flex items-center justify-center">
          <i className="ri-lightbulb-line text-primary-500 text-sm"></i>
        </div>
        Explainability — Pourquoi ce résultat ?
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm">
        {/* Mots-clés matchés */}
        <div>
          <p className="font-semibold text-foreground-800 mb-2">Mots-clés matchés :</p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map(k => (
              <span key={k} className="bg-primary-100 text-primary-700 px-2.5 py-1 rounded-md text-xs font-medium">
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Concepts reconnus */}
        <div>
          <p className="font-semibold text-foreground-800 mb-2">Concepts reconnus :</p>
          <div className="flex flex-wrap gap-1.5">
            {concepts.map(c => (
              <span key={c} className="bg-accent-100 text-accent-700 px-2.5 py-1 rounded-md text-xs font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Score détaillé */}
        <div className="lg:col-span-2">
          <p className="font-semibold text-foreground-800 mb-2">Décomposition du score de confiance :</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ScoreBar label="Sémantique" value={confidence.semantique} weight={0.35} color="primary" />
            <ScoreBar label="Autorité" value={confidence.autorite} weight={0.25} color="secondary" />
            <ScoreBar label="Juridiction" value={confidence.juridiction} weight={0.15} color="accent" />
            <ScoreBar label="Fraîcheur" value={confidence.fraicheur} weight={0.10} color="primary" />
            <ScoreBar label="Citations" value={confidence.densiteCitations} weight={0.10} color="secondary" />
            <ScoreBar label="Cohérence" value={confidence.coherence} weight={0.05} color="accent" />
          </div>
        </div>

        {/* Juridiction */}
        <div>
          <p className="font-semibold text-foreground-800 mb-1">Cible juridictionnelle :</p>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${matchedJurisdiction ? 'text-accent-600' : 'text-red-500'}`}>
              {jurisdiction}
            </span>
            {matchedJurisdiction ? (
              <span className="flex items-center gap-1 text-xs text-accent-600">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-check-line text-accent-500"></i>
                </div>
                Matchée
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-500">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-close-line text-red-500"></i>
                </div>
                Non matchée
              </span>
            )}
          </div>
        </div>

        {/* Confiance globale */}
        <div>
          <p className="font-semibold text-foreground-800 mb-1">Confiance globale :</p>
          <p className={`text-xl font-bold ${confidence.total >= 0.95 ? 'text-accent-600' : confidence.total >= 0.75 ? 'text-amber-500' : 'text-red-500'}`}>
            {((typeof confidence.total === 'number' && isFinite(confidence.total)) ? Math.round(Math.max(0, Math.min(1, confidence.total)) * 100) : 0).toFixed(0)}%
          </p>
          <p className="text-xs text-foreground-500 mt-0.5">
            Basée sur {evidences.length} sources
          </p>
        </div>
      </div>

      {/* Retrieval explanation per evidence */}
      <div className="mt-5 pt-4 border-t border-background-200/70">
        <p className="font-semibold text-foreground-800 mb-3 text-sm">Justification de récupération par source :</p>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {evidences.slice(0, 6).map(evidence => (
            <div key={evidence.id} className="flex items-start gap-3 p-3 rounded-md bg-background-100 border border-background-200/40">
              <div className="w-7 h-7 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-secondary-600">{evidence.priority}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground-800 truncate">{evidence.title}</p>
                <p className="text-xs text-foreground-500 mt-0.5">
                  Retrieved because:{' '}
                  <span className="text-foreground-600">
                    {[
                      `Matched keywords`,
                      evidence.type === 'Regulateur' || evidence.type === 'Loi' ? 'Primary regulatory source' : '',
                      evidence.jurisdiction === jurisdiction ? `Jurisdiction match (${jurisdiction})` : '',
                      evidence.citations > 15 ? `High citation density (${evidence.citations})` : '',
                      evidence.fraicheur > 0.85 ? `Recent document (freshness ${Math.round(evidence.fraicheur * 100)}%)` : '',
                    ].filter(Boolean).join(' + ')}
                  </span>
                </p>
              </div>
            </div>
          ))}
          {evidences.length > 6 && (
            <p className="text-xs text-foreground-400 text-center py-2">
              + {evidences.length - 6} autres sources
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, weight, color }: {
  label: string;
  value: number;
  weight: number;
  color: 'primary' | 'secondary' | 'accent';
}) {
  const safeValue = (typeof value === 'number' && isFinite(value)) ? Math.max(0, Math.min(1, value)) : 0;
  const pct = Math.round(safeValue * 100);
  const colorMap = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-foreground-600">{label}</span>
        <span className="text-foreground-500">
          {pct}% <span className="text-foreground-400">× {weight}</span>
        </span>
      </div>
      <div className="w-full bg-background-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${colorMap[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}






