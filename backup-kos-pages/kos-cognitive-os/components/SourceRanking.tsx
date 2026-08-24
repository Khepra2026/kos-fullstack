
interface SourceRankingProps {
  evidences: Evidence[];
  className?: string;
}

const AUTHORITY_INDEX: Record<string, number> = {
  'BCEAO': 100,
  'COBAC': 98,
  'GAFI': 97,
  'GIABA': 97,
  'OHADA': 95,
  'UEMOA': 90,
  'CEMAC': 88,
  'ISO': 93,
  'NIST': 90,
  'COSO': 88,
  'BigFour': 85,
  'Université': 65,
};

function getAuthorityColor(score: number): string {
  if (score >= 95) return '#10b981';
  if (score >= 85) return '#22c55e';
  if (score >= 70) return '#eab308';
  if (score >= 50) return '#f97316';
  return '#ef4444';
}

export default function SourceRanking({ evidences, className = '' }: SourceRankingProps) {
  const sourceMap = new Map<string, { count: number; authority: number; type: Evidence['type'] }>();

  evidences.forEach(e => {
    const key = e.jurisdiction;
    const authority = AUTHORITY_INDEX[e.jurisdiction] || AUTHORITY_INDEX[e.type] || 50;
    if (sourceMap.has(key)) {
      const existing = sourceMap.get(key)!;
      sourceMap.set(key, { count: existing.count + 1, authority: Math.max(existing.authority, authority), type: existing.type });
    } else {
      sourceMap.set(key, { count: 1, authority, type: e.type });
    }
  });

  const sorted = Array.from(sourceMap.entries())
    .sort((a, b) => b[1].authority - a[1].authority);

  return (
    <div className={`rounded-lg border border-background-200/70 bg-background-50 p-5 ${className}`}>
      <h4 className="text-sm font-semibold text-foreground-900 mb-4">Indice d'Autorité par Source</h4>
      <div className="space-y-3">
        {sorted.map(([name, data]) => (
          <div key={name} className="flex items-center gap-3">
            <div className="w-16 text-xs font-medium text-foreground-900 whitespace-nowrap">{name}</div>
            <div className="flex-1 h-5 bg-background-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end px-2 transition-all duration-700"
                style={{ width: `${data.authority}%`, backgroundColor: `${getAuthorityColor(data.authority)}30` }}
              >
                <span className="text-xs font-bold" style={{ color: getAuthorityColor(data.authority) }}>{data.authority}</span>
              </div>
            </div>
            <span className="text-xs text-foreground-500 w-12 text-right">{data.count} doc{data.count > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-background-200/70 flex flex-wrap gap-2 text-xs text-foreground-500">
        <span>Axe 4 : Authority Index — BCEAO:100 → Université:65</span>
      </div>
    </div>
  );
}






