interface NoteCAExecutiveSummaryProps {
  resume_exec: {
    titre: string;
    periode: string;
    entite: string;
    contexte: string;
    points_cles: { theme: string; niveau: string; detail: string }[];
    recommandations_exec: string[];
    genere_en: string;
    methodologie: string;
  };
}

const niveauColors: Record<string, string> = {
  "Satisfaisant avec réserves": "bg-amber-100 text-amber-700 border-amber-200",
  "À surveiller": "bg-red-100 text-red-700 border-red-200",
  Maîtrisé: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Conforme: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function NoteCAExecutiveSummary({ resume_exec }: NoteCAExecutiveSummaryProps) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <i className="ri-file-list-3-line text-lg"></i>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground-950 font-heading">
            {resume_exec.titre || `Note au Conseil d'Administration — ${resume_exec.entite}`}
          </h2>
          <p className="text-xs text-foreground-500 font-body">
            Période {resume_exec.periode} · {resume_exec.methodologie} · Générée en {resume_exec.genere_en}
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground-700 font-body leading-relaxed mb-5">
        {resume_exec.contexte}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {resume_exec.points_cles.map((point, idx) => (
          <div
            key={idx}
            className={`rounded-lg border p-3 ${niveauColors[point.niveau] || "bg-background-100 text-foreground-700 border-background-200"}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-body">{point.theme}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60 font-body">
                {point.niveau}
              </span>
            </div>
            <p className="text-xs font-body opacity-90">{point.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-background-100 rounded-lg p-4 border border-background-200/70">
        <h3 className="text-sm font-bold text-foreground-950 font-heading mb-2 flex items-center gap-2">
          <i className="ri-lightbulb-flash-line text-primary-500"></i>
          Recommandations Exécutives
        </h3>
        <ul className="space-y-2">
          {resume_exec.recommandations_exec.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-foreground-700 font-body">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 text-[10px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



