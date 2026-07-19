interface PlanPhase {
  phase: string;
  actions: string[];
  budget_estime_fcfa: number;
  responsable: string;
  kpis_cibles: string[];
}

interface ESGImprovementPlanProps {
  plan: {
    plan_amelioration: PlanPhase[];
    date_generation: string;
  };
}

const phaseColors: Record<string, { bg: string; border: string; badge: string; icon: string }> = {
  'Court terme (0-6 mois)': {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700 border-red-200',
    icon: 'ri-flashlight-line',
  },
  'Moyen terme (6-18 mois)': {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: 'ri-calendar-todo-line',
  },
  'Long terme (18-36 mois)': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: 'ri-rocket-line',
  },
};

export default function ESGImprovementPlan({ plan }: ESGImprovementPlanProps) {
  const totalBudget = plan.plan_amelioration.reduce((sum, p) => sum + p.budget_estime_fcfa, 0);

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground-950 font-heading">
            Plan d'Amélioration ESG — Généré par IA
          </h3>
          <p className="text-xs text-foreground-500 font-body mt-0.5">
            Feuille de route 3 phases basée sur l'analyse double matérialité
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-foreground-950 font-heading">
            {totalBudget.toLocaleString()} FCFA
          </div>
          <div className="text-[10px] text-foreground-500 font-body">Budget total estimé</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {plan.plan_amelioration.map((phase, idx) => {
          const colors = phaseColors[phase.phase] || phaseColors['Court terme (0-6 mois)'];
          const isFirst = idx === 0;
          const isLast = idx === plan.plan_amelioration.length - 1;

          return (
            <div key={phase.phase} className={`relative pl-6 ${colors.bg} rounded-lg border ${colors.border} p-4`}>
              {/* Timeline connector */}
              {!isFirst && (
                <div className="absolute left-[11px] -top-4 w-0.5 h-4 bg-background-300"></div>
              )}
              {!isLast && (
                <div className="absolute left-[11px] top-[calc(100%)] w-0.5 h-4 bg-background-300"></div>
              )}
              <div
                className={`absolute left-2 top-4 w-5 h-5 rounded-full flex items-center justify-center ${colors.badge}`}
              >
                <span className="text-[10px] font-bold">{idx + 1}</span>
              </div>

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <i className={`${colors.icon} text-sm ${colors.badge.split(' ')[1]}`}></i>
                  <span className="text-sm font-bold text-foreground-900 font-heading">{phase.phase}</span>
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0">
                  <span className="text-foreground-500 font-body">
                    <i className="ri-money-euro-circle-line mr-1"></i>
                    {phase.budget_estime_fcfa.toLocaleString()} FCFA
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colors.badge} font-body`}>
                    {phase.responsable}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                {phase.actions.map((action, aidx) => (
                  <div key={aidx} className="flex items-start gap-2">
                    <i className="ri-check-line text-emerald-500 mt-0.5 text-xs"></i>
                    <span className="text-xs text-foreground-700 font-body leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {phase.kpis_cibles.map((kpi, kidx) => (
                  <span
                    key={kidx}
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background-100 text-foreground-600 border border-background-200/70 font-body"
                  >
                    {kpi}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-background-100 border border-background-200/70 flex items-center gap-2">
        <i className="ri-information-line text-foreground-400 text-sm"></i>
        <span className="text-[11px] text-foreground-500 font-body">
          Plan généré automatiquement par <strong className="text-foreground-700">KOS ESG Materiality Engine</strong> le{' '}
          {new Date(plan.date_generation).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}



