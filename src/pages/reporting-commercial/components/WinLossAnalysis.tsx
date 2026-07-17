import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default function WinLossAnalysis() {
  const { leads, proposals, metrics } = usePipelineAnalytics();

  const wonLeads = leads.filter((l) => l.pipeline_stage === 'closed_won');
  const lostLeads = leads.filter((l) => l.pipeline_stage === 'closed_lost');

  const wonByType = new Map<string, { count: number; value: number }>();
  wonLeads.forEach((l) => {
    const proposalsForLead = proposals.filter((p) => p.lead_id === l.id);
    const type = proposalsForLead[0]?.type || 'inconnu';
    const e = wonByType.get(type) || { count: 0, value: 0 };
    e.count += 1;
    e.value += l.deal_value || 0;
    wonByType.set(type, e);
  });

  const lostByType = new Map<string, { count: number; value: number }>();
  lostLeads.forEach((l) => {
    const proposalsForLead = proposals.filter((p) => p.lead_id === l.id);
    const type = proposalsForLead[0]?.type || 'inconnu';
    const e = lostByType.get(type) || { count: 0, value: 0 };
    e.count += 1;
    e.value += l.deal_value || 0;
    lostByType.set(type, e);
  });

  const allTypes = Array.from(new Set([...wonByType.keys(), ...lostByType.keys()]));

  const typeLabels: Record<string, string> = {
    diagnostic: 'Diagnostic',
    audit: 'Audit',
    conseil: 'Conseil',
    esg: 'ESG',
    due_diligence: 'Due Diligence',
    formation: 'Formation',
    inconnu: 'Non catégorisé',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Analyse gagné vs perdu</h3>
        <p className="text-sm text-slate-500 mt-0.5">Répartition des deals par type de mission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-600 mb-1">Gagné</p>
            <p className="text-2xl font-bold text-emerald-700">{wonLeads.length}</p>
            <p className="text-sm text-emerald-600">{formatCurrency(wonLeads.reduce((s, l) => s + (l.deal_value || 0), 0))}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-xs text-red-500 mb-1">Perdu</p>
            <p className="text-2xl font-bold text-red-600">{lostLeads.length}</p>
            <p className="text-sm text-red-500">{formatCurrency(lostLeads.reduce((s, l) => s + (l.deal_value || 0), 0))}</p>
          </div>
          <div className="p-4 bg-[#c19a6b]/5 rounded-lg border border-[#c19a6b]/10">
            <p className="text-xs text-[#a47c48] mb-1">En cours</p>
            <p className="text-2xl font-bold text-[#c19a6b]">{metrics.activeLeads}</p>
            <p className="text-sm text-[#a47c48]">{formatCurrency(metrics.totalPipelineValue)}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Gagné</th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Perdu</th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Win rate</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Valeur gagnée</th>
              </tr>
            </thead>
            <tbody>
              {allTypes.map((type) => {
                const won = wonByType.get(type) || { count: 0, value: 0 };
                const lost = lostByType.get(type) || { count: 0, value: 0 };
                const total = won.count + lost.count;
                const winRate = total > 0 ? (won.count / total) * 100 : 0;
                return (
                  <tr key={type} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 text-slate-700 font-medium">{typeLabels[type] || type}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-emerald-600 font-semibold">{won.count}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-red-400 font-semibold">{lost.count}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-700 font-semibold">{total}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`font-semibold ${winRate >= 50 ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {formatPercent(winRate)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700 font-medium">
                      {formatCurrency(won.value)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}