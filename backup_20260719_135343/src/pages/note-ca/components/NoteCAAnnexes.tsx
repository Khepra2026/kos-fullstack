interface NoteCAAnnexesProps {
  annexes: { titre: string; url: string; type: string; date: string; reference: string }[];
}

const typeColors: Record<string, string> = {
  compliance: "bg-emerald-100 text-emerald-700 border-emerald-200",
  audit: "bg-primary-100 text-primary-700 border-primary-200",
  reglementaire: "bg-accent-100 text-accent-700 border-accent-200",
  risque: "bg-amber-100 text-amber-700 border-amber-200",
  financier: "bg-secondary-100 text-secondary-700 border-secondary-200",
  gouvernance: "bg-purple-100 text-purple-700 border-purple-200",
};

const typeIcons: Record<string, string> = {
  compliance: "ri-shield-check-line",
  audit: "ri-search-line",
  reglementaire: "ri-government-line",
  risque: "ri-alert-line",
  financier: "ri-money-euro-circle-line",
  gouvernance: "ri-building-line",
};

export default function NoteCAAnnexes({ annexes }: NoteCAAnnexesProps) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
          <i className="ri-links-line text-lg"></i>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground-950 font-heading">
            Annexes Réglementaires
          </h2>
          <p className="text-xs text-foreground-500 font-body">
            {annexes.length} rapports attachés à la période
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {annexes.map((annexe, idx) => (
          <a
            key={idx}
            href={annexe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:border-primary-300 hover:bg-background-100/50 transition-all group"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 ${typeColors[annexe.type] || "bg-background-100 text-foreground-600 border border-background-200"}`}
            >
              <i className={`${typeIcons[annexe.type] || "ri-file-line"} text-sm`}></i>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground-950 font-heading truncate group-hover:text-primary-600 transition-colors">
                {annexe.titre}
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-foreground-500 font-body">
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i>
                  {new Date(annexe.date).toLocaleDateString("fr-FR")}
                </span>
                <span className="font-mono text-foreground-400">{annexe.reference}</span>
              </div>
            </div>

            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 text-foreground-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors shrink-0">
              <i className="ri-download-line text-sm"></i>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}



