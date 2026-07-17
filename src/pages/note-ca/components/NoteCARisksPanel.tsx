interface NoteCARisksPanelProps {
  risks: {
    rang: number;
    libelle: string;
    famille: string;
    score: number;
    probabilite: number;
    impact: number;
    statut: string;
    echeance: string;
    niveau: string;
    tendance: string;
  }[];
}

const familleColors: Record<string, string> = {
  reglementaire: "bg-red-100 text-red-700 border-red-200",
  financier: "bg-amber-100 text-amber-700 border-amber-200",
  operationnel: "bg-primary-100 text-primary-700 border-primary-200",
  strategique: "bg-accent-100 text-accent-700 border-accent-200",
  juridique: "bg-secondary-100 text-secondary-700 border-secondary-200",
};

const niveauBadge: Record<string, string> = {
  Critique: "bg-red-100 text-red-700 border-red-200",
  Élevé: "bg-amber-100 text-amber-700 border-amber-200",
  Modéré: "bg-primary-100 text-primary-700 border-primary-200",
  Faible: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function NoteCARisksPanel({ risks }: NoteCARisksPanelProps) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
          <i className="ri-fire-line text-lg"></i>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground-950 font-heading">
            Top 3 Risques Prioritaires
          </h2>
          <p className="text-xs text-foreground-500 font-body">
            Points d'attention immédiate pour le CA
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => (
          <div
            key={risk.rang}
            className="flex gap-3 p-3 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-colors"
          >
            <div className="shrink-0">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm font-heading ${
                  risk.score >= 15
                    ? "bg-red-100 text-red-700"
                    : risk.score >= 10
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                #{risk.rang}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border font-body ${familleColors[risk.famille] || "bg-background-100 text-foreground-600 border-background-200"}`}
                >
                  {risk.famille}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border font-body ${niveauBadge[risk.niveau] || "bg-background-100 text-foreground-600 border-background-200"}`}
                >
                  {risk.niveau}
                </span>
                <span className="text-[10px] text-foreground-400 font-body">
                  {risk.statut}
                </span>
              </div>

              <h3 className="text-sm font-bold text-foreground-950 font-heading mb-1">
                {risk.libelle}
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-foreground-500 font-body">
                <span className="flex items-center gap-1">
                  <i className="ri-bar-chart-box-line"></i> Score {risk.score}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-percent-line"></i> P×I = {risk.probabilite}×{risk.impact}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i> Échéance{" "}
                  {new Date(risk.echeance).toLocaleDateString("fr-FR")}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-arrow-right-up-line"></i> {risk.tendance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}