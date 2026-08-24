
interface EvidencePanelProps {
  evidences: Evidence[];
  evidenceChainValid: boolean;
  className?: string;
}

function getTypeBadge(type: Evidence['type']): { color: string; icon: string; label: string } {
  const map: Record<Evidence['type'], { color: string; icon: string; label: string }> = {
    'Regulateur': { color: 'bg-red-100 text-red-700', icon: 'ri-government-line', label: 'Régulateur' },
    'Loi': { color: 'bg-amber-100 text-amber-700', icon: 'ri-scales-3-line', label: 'Loi' },
    'Instruction': { color: 'bg-orange-100 text-orange-700', icon: 'ri-file-text-line', label: 'Instruction' },
    'Norme': { color: 'bg-blue-100 text-blue-700', icon: 'ri-book-open-line', label: 'Norme' },
    'BigFour': { color: 'bg-purple-100 text-purple-700', icon: 'ri-building-line', label: 'Big Four' },
    'Universite': { color: 'bg-green-100 text-green-700', icon: 'ri-graduation-cap-line', label: 'Université' },
  };
  return map[type];
}

function getJurisdictionFlag(jurisdiction: string): string {
  const flags: Record<string, string> = {
    'BCEAO': '🇧🇯',
    'COBAC': '🇨🇲',
    'GAFI': '🌍',
    'UEMOA': '🇨🇮',
    'CEMAC': '🇬🇦',
    'OHADA': '⚖️',
    'ISO': '🏳️',
    'NIST': '🇺🇸',
    'EU': '🇪🇺',
    'US': '🇺🇸',
    'Local': '📍',
  };
  return flags[jurisdiction] || '📄';
}

export default function EvidencePanel({ evidences, evidenceChainValid, className = '' }: EvidencePanelProps) {
  const ranked = JurisdictionPriorityEngine.rank(evidences, 'BCEAO');

  return (
    <div className={`rounded-lg border border-background-200/70 bg-background-50 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground-900">Hiérarchie des Preuves</h4>
        <div className="flex items-center gap-2">
          {evidenceChainValid ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">
              <i className="ri-shield-check-line mr-1"></i>Chaîne de preuves validée
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
              <i className="ri-shield-flash-line mr-1"></i>Chaîne incomplète
            </span>
          )}
          <span className="text-xs text-foreground-600">{evidences.length} sources</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {ranked.map((e, idx) => {
          const badge = getTypeBadge(e.type);
          const pct = Math.round((e.score || 0) * 100);
          return (
            <div key={e.id} className="flex items-start gap-3 p-3 rounded-md bg-background-50 hover:bg-background-100 transition-colors border border-background-200/40">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-background-100 text-foreground-500 text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${badge.color} font-medium`}>
                    <i className={`${badge.icon} mr-0.5`}></i>{badge.label}
                  </span>
                  <span className="text-xs text-foreground-500">{getJurisdictionFlag(e.jurisdiction)} {e.jurisdiction}</span>
                  <span className="text-xs text-foreground-400">Citations: {e.citations}</span>
                </div>
                <p className="text-sm font-medium text-foreground-900 mt-1 truncate">{e.title}</p>
                <p className="text-xs text-foreground-600 mt-0.5 line-clamp-2">{e.extrait}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-foreground-900">{pct}%</span>
                <div className="w-10 h-1 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="text-xs text-foreground-400">Priorité {(e.priority || 6)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}






