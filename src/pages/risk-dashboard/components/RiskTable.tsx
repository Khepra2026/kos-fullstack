import { useState, memo } from 'react';
import { mockRiskFamilies, mockRiskStatuses } from '@/mocks/riskRegister';

interface Risk {
  id: string;
  famille: string;
  libelle: string;
  probabilite: number;
  impact: number;
  score: number;
  responsable: string;
  echeance: string;
  statut: string;
}

interface RiskTableProps {
  risks: Risk[];
  loading: boolean;
  onEdit: (risk: Risk) => void;
  onDelete: (id: string) => void;
}

const RiskTable = memo(function RiskTable({ risks, loading, onEdit, onDelete }: RiskTableProps) {
  const [sortField, setSortField] = useState<'score' | 'probabilite' | 'impact' | 'echeance'>('score');
  const [sortAsc, setSortAsc] = useState(false);
  const [familleFilter, setFamilleFilter] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = risks.filter(r => {
    const matchFamille = !familleFilter || r.famille === familleFilter;
    const matchStatut = !statutFilter || r.statut === statutFilter;
    const matchSearch = !search || r.libelle.toLowerCase().includes(search.toLowerCase()) || r.responsable?.toLowerCase().includes(search.toLowerCase());
    return matchFamille && matchStatut && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const getFamilleBadge = (key: string) => {
    const fam = mockRiskFamilies.find(f => f.key === key);
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${fam?.lightBg || 'bg-background-100'} ${fam?.textColor || 'text-foreground-600'} border border-background-200/70`}>
        <span className={`w-1.5 h-1.5 rounded-full ${fam?.color || 'bg-background-300'}`} />
        {fam?.label || key}
      </span>
    );
  };

  const getStatutBadge = (key: string) => {
    const st = mockRiskStatuses.find(s => s.key === key);
    return (
      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${st?.color || 'bg-background-100 text-foreground-500'}`}>
        {st?.label || key}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 20) return 'bg-red-500 text-white';
    if (score >= 15) return 'bg-orange-400 text-white';
    if (score >= 10) return 'bg-amber-400 text-foreground-950';
    return 'bg-emerald-400 text-foreground-950';
  };

  if (loading) {
    return (
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="h-64 bg-background-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-background-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
          <input
            type="text"
            placeholder="Rechercher un risque..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 font-body focus:outline-none focus:border-primary-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={familleFilter}
            onChange={e => setFamilleFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
          >
            <option value="">Toutes familles</option>
            {mockRiskFamilies.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
          <select
            value={statutFilter}
            onChange={e => setStatutFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
          >
            <option value="">Tous statuts</option>
            {mockRiskStatuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <button
            onClick={() => { setFamilleFilter(''); setStatutFilter(''); setSearch(''); }}
            className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-500 hover:text-foreground-700 font-body cursor-pointer"
          >
            <i className="ri-refresh-line" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70 bg-background-100">
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body">Risque</th>
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body">Famille</th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body cursor-pointer hover:text-foreground-800" onClick={() => toggleSort('score')}>
                Score {sortField === 'score' && (sortAsc ? <i className="ri-arrow-up-s-line ml-1" /> : <i className="ri-arrow-down-s-line ml-1" />)}
              </th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body cursor-pointer hover:text-foreground-800" onClick={() => toggleSort('probabilite')}>
                P×I {sortField === 'probabilite' && (sortAsc ? <i className="ri-arrow-up-s-line ml-1" /> : <i className="ri-arrow-down-s-line ml-1" />)}
              </th>
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body">Responsable</th>
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body cursor-pointer hover:text-foreground-800" onClick={() => toggleSort('echeance')}>
                Échéance {sortField === 'echeance' && (sortAsc ? <i className="ri-arrow-up-s-line ml-1" /> : <i className="ri-arrow-down-s-line ml-1" />)}
              </th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body">Statut</th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((risk) => (
              <>
                <tr
                  key={risk.id}
                  className="border-b border-background-200/50 hover:bg-background-100/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === risk.id ? null : risk.id)}
                >
                  <td className="px-4 py-2.5 max-w-[240px]">
                    <div className="font-semibold text-foreground-950 font-body truncate">{risk.libelle}</div>
                  </td>
                  <td className="px-4 py-2.5">{getFamilleBadge(risk.famille)}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-[10px] font-bold ${getScoreColor(risk.score)}`}>
                      {risk.score}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center text-foreground-600 font-body">{risk.probabilite}×{risk.impact}</td>
                  <td className="px-4 py-2.5 text-foreground-700 font-body">{risk.responsable || '—'}</td>
                  <td className="px-4 py-2.5 text-foreground-500 font-body">{risk.echeance ? new Date(risk.echeance).toLocaleDateString('fr-FR') : '—'}</td>
                  <td className="px-4 py-2.5 text-center">{getStatutBadge(risk.statut)}</td>
                  <td className="px-4 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onEdit(risk); }}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200/70 text-foreground-500 hover:text-primary-600 transition-colors cursor-pointer"
                      >
                        <i className="ri-edit-line" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete(risk.id); }}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 text-foreground-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === risk.id && (
                  <tr>
                    <td colSpan={8} className="px-4 py-3 bg-background-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-body">
                        <div>
                          <span className="font-semibold text-foreground-600">Probabilité :</span>
                          <span className="ml-1 text-foreground-700">{risk.probabilite}/5</span>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground-600">Impact :</span>
                          <span className="ml-1 text-foreground-700">{risk.impact}/5</span>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground-600">Score :</span>
                          <span className={`ml-1 font-bold ${risk.score >= 15 ? 'text-red-600' : risk.score >= 10 ? 'text-amber-600' : 'text-emerald-600'}`}>{risk.score}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-foreground-500 font-body">
                  Aucun risque ne correspond aux filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-background-200/70 text-right">
        <span className="text-[10px] text-foreground-400 font-body">{sorted.length} risque{sorted.length > 1 ? 's' : ''} affiché{sorted.length > 1 ? 's' : ''}</span>
      </div>
    </div>
  );
});

export default RiskTable;