import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

export default function ConversionTimeline() {
  const { stageTransitions, metrics } = usePipelineAnalytics();

  const stages = [
    { name: 'Nouveau lead', icon: 'ri-user-add-line', color: 'bg-[#c19a6b]' },
    { name: 'Contact engagé', icon: 'ri-chat-1-line', color: 'bg-[#a47c48]' },
    { name: 'RDV planifié', icon: 'ri-calendar-event-line', color: 'bg-[#8b6a3a]' },
    { name: 'Proposition envoyée', icon: 'ri-mail-send-line', color: 'bg-[#d4a76a]' },
    { name: 'Négociation', icon: 'ri-briefcase-line', color: 'bg-[#b8895a]' },
    { name: 'Gagné', icon: 'ri-trophy-line', color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Temps de conversion entre étapes</h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Durée moyenne pour passer d'une étape à l'autre du pipeline
        </p>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between">
          {stages.map((stage, index) => (
            <div key={stage.name} className="flex flex-col items-center relative flex-1">
              <div className={`w-10 h-10 rounded-full ${stage.color} flex items-center justify-center z-10`}>
                <i className={`${stage.icon} text-white text-sm w-5 h-5 flex items-center justify-center`}></i>
              </div>
              <p className="text-xs font-medium text-slate-700 mt-2 text-center leading-tight">{stage.name}</p>

              {index < stages.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-slate-200">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-l-4 border-l-slate-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}

              {index < stageTransitions.length && (
                <div className="mt-3 px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-800 text-center">
                    {stageTransitions[index].avgDays} j
                  </p>
                  <p className="text-[10px] text-slate-400 text-center">
                    médiane {stageTransitions[index].medianDays} j
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <p className="text-lg font-bold text-slate-900">{Math.round(metrics.avgTimeToMeeting)} j</p>
          <p className="text-xs text-slate-500">Lead → 1er RDV</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <p className="text-lg font-bold text-slate-900">{Math.round(metrics.avgTimeToProposal)} j</p>
          <p className="text-xs text-slate-500">Lead → Proposition</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <p className="text-lg font-bold text-slate-900">{Math.round(metrics.avgTimeToClose)} j</p>
          <p className="text-xs text-slate-500">Lead → Clôture</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <p className="text-lg font-bold text-slate-900">{Math.round(metrics.avgSalesCycle)} j</p>
          <p className="text-xs text-slate-500">Cycle total moyen</p>
        </div>
      </div>
    </div>
  );
}