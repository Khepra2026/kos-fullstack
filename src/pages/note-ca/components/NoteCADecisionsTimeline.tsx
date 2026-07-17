interface NoteCADecisionsTimelineProps {
  decisions: {
    id: string;
    priorite: string;
    titre: string;
    description: string;
    domaine: string;
    echeance: string;
    responsable: string;
    impact_attendu: string;
    statut: string;
  }[];
}

const prioriteColors: Record<string, string> = {
  Haute: "bg-red-100 text-red-700 border-red-200",
  Majeure: "bg-amber-100 text-amber-700 border-amber-200",
  Normale: "bg-primary-100 text-primary-700 border-primary-200",
};

const statutColors: Record<string, string> = {
  "En attente CA": "bg-red-50 text-red-700 border-red-200",
  "En préparation": "bg-amber-50 text-amber-700 border-amber-200",
  Programmé: "bg-primary-50 text-primary-700 border-primary-200",
  Planifié: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function NoteCADecisionsTimeline({ decisions }: NoteCADecisionsTimelineProps) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
          <i className="ri-calendar-check-line text-lg"></i>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground-950 font-heading">
            Décisions Requises pour le CA
          </h2>
          <p className="text-xs text-foreground-500 font-body">
            {decisions.length} actions à valider, classées par priorité
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {decisions.map((decision, idx) => (
          <div
            key={decision.id}
            className="flex gap-3 p-3 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-colors"
          >
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-background-100 text-foreground-600 text-xs font-bold font-heading">
                {idx + 1}
              </span>
              <div className="w-px flex-1 bg-background-200/70 min-h-[20px]"></div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border font-body ${prioriteColors[decision.priorite] || "bg-background-100 text-foreground-600 border-background-200"}`}
                >
                  {decision.priorite}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border font-body ${statutColors[decision.statut] || "bg-background-100 text-foreground-600 border-background-200"}`}
                >
                  {decision.statut}
                </span>
                <span className="text-[10px] text-foreground-400 font-body flex items-center gap-1">
                  <i className="ri-calendar-line"></i>
                  {new Date(decision.echeance).toLocaleDateString("fr-FR")}
                </span>
              </div>

              <h3 className="text-sm font-bold text-foreground-950 font-heading mb-1">
                {decision.titre}
              </h3>
              <p className="text-xs text-foreground-600 font-body mb-2 leading-relaxed">
                {decision.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-foreground-500 font-body">
                <span className="flex items-center gap-1">
                  <i className="ri-user-line"></i> {decision.responsable}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-folder-line"></i> {decision.domaine}
                </span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <i className="ri-checkbox-circle-line"></i> {decision.impact_attendu}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}