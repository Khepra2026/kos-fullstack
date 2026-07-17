interface NoteCAData {
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
  kpi_cles: {
    conformite: number;
    risque_global: number;
    incidents_critiques: number;
    ecarts_majeurs: number;
    recommandations: number;
    top_risque_score: number;
  };
  points_attention: {
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
  decisions_requises: {
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
  annexes: { titre: string; url: string; type: string; date: string; reference: string }[];
  genere_en: string;
  methodologie: string;
  meta: {
    entite_id: string;
    periode: string;
    date_generation: string;
    version_note: string;
  };
}

interface NoteCAStatsCardsProps {
  data: NoteCAData;
}

export default function NoteCAStatsCards({ data }: NoteCAStatsCardsProps) {
  const kpi = data.kpi_cles;

  const cards = [
    {
      label: "Conformité",
      value: `${kpi.conformite}%`,
      color: kpi.conformite >= 80 ? "text-emerald-600" : "text-amber-600",
      bg: kpi.conformite >= 80 ? "bg-emerald-50" : "bg-amber-50",
      icon: "ri-shield-check-line",
    },
    {
      label: "Risque Global",
      value: `${kpi.risque_global}`,
      color: kpi.risque_global >= 15 ? "text-red-600" : kpi.risque_global >= 10 ? "text-amber-600" : "text-emerald-600",
      bg: kpi.risque_global >= 15 ? "bg-red-50" : kpi.risque_global >= 10 ? "bg-amber-50" : "bg-emerald-50",
      icon: "ri-alert-line",
    },
    {
      label: "Incidents Critiques",
      value: `${kpi.incidents_critiques}`,
      color: kpi.incidents_critiques > 0 ? "text-red-600" : "text-emerald-600",
      bg: kpi.incidents_critiques > 0 ? "bg-red-50" : "bg-emerald-50",
      icon: "ri-bug-line",
    },
    {
      label: "Écarts Majeurs",
      value: `${kpi.ecarts_majeurs}`,
      color: kpi.ecarts_majeurs > 0 ? "text-red-600" : "text-emerald-600",
      bg: kpi.ecarts_majeurs > 0 ? "bg-red-50" : "bg-emerald-50",
      icon: "ri-error-warning-line",
    },
    {
      label: "Recommandations",
      value: `${kpi.recommandations}`,
      color: "text-primary-600",
      bg: "bg-primary-50",
      icon: "ri-lightbulb-line",
    },
    {
      label: "Top Risque Score",
      value: `${kpi.top_risque_score}`,
      color: kpi.top_risque_score >= 15 ? "text-red-600" : "text-emerald-600",
      bg: kpi.top_risque_score >= 15 ? "bg-red-50" : "bg-emerald-50",
      icon: "ri-fire-line",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg border border-background-200/70 p-3 ${card.bg}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 flex items-center justify-center rounded-md bg-white/60 ${card.color}`}>
              <i className={`${card.icon} text-sm`}></i>
            </div>
            <span className={`text-lg font-bold font-heading ${card.color}`}>
              {card.value}
            </span>
          </div>
          <div className="text-[10px] text-foreground-500 font-body">{card.label}</div>
        </div>
      ))}
    </div>
  );
}