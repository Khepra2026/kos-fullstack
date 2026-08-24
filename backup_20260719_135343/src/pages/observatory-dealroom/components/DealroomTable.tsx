import { useState, useEffect, useCallback, useRef } from 'react';
import { DealroomPME, DealroomFilters } from '@/types/dealroom.types';
import { dealroomPMEs } from '@/mocks/dealroomPME';
import DealroomDetailModal from '';

const PAYS_OPTIONS = [
  { code: 'TG', name: 'Togo' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'CM', name: 'Cameroun' },
  { code: 'BJ', name: 'Bénin' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'ML', name: 'Mali' },
  { code: 'NE', name: 'Niger' },
];

const SECTEUR_OPTIONS = [
  { code: 'Commerce', name: 'Commerce / Distribution' },
  { code: 'Services', name: 'Services B2B' },
  { code: 'Industrie', name: 'Industrie' },
  { code: 'Agri', name: 'Agriculture / Agribusiness' },
  { code: 'FinTech', name: 'FinTech / Paiement' },
  { code: 'Sante', name: 'Santé' },
  { code: 'Education', name: 'Éducation' },
];

const STADES = ['Pre-seed', 'Seed', 'Serie A', 'En cours', 'Non'];

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700';
  if (score >= 60) return 'bg-amber-50 text-amber-700';
  return 'bg-red-50 text-red-700';
}

function getStadeColor(stade: string): string {
  switch (stade) {
    case 'Serie A': return 'bg-accent-100 text-accent-700 border border-accent-200';
    case 'En cours': return 'bg-primary-100 text-primary-700 border border-primary-200';
    case 'Seed': return 'bg-secondary-100 text-secondary-700 border border-secondary-200';
    case 'Pre-seed': return 'bg-background-200 text-foreground-600 border border-background-300';
    default: return 'bg-background-100 text-foreground-500 border border-background-200';
  }
}

export default function DealroomTable() {
  const [filters, setFilters] = useState<DealroomFilters>({
    pays: [],
    secteur: [],
    score_min: 0,
    stade_levee: [],
    certifie_uniquement: false,
    page: 1,
    limit: 15,
  });

  const [filteredData, setFilteredData] = useState<DealroomPME[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPME, setSelectedPME] = useState<DealroomPME | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [exportToast, setExportToast] = useState<string | null>(null);
  const [paysDropdown, setPaysDropdown] = useState(false);
  const [secteurDropdown, setSecteurDropdown] = useState(false);
  const [stadeDropdown, setStadeDropdown] = useState(false);

  const paysRef = useRef<HTMLDivElement>(null);
  const secteurRef = useRef<HTMLDivElement>(null);
  const stadeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (paysRef.current && !paysRef.current.contains(e.target as Node)) setPaysDropdown(false);
      if (secteurRef.current && !secteurRef.current.contains(e.target as Node)) setSecteurDropdown(false);
      if (stadeRef.current && !stadeRef.current.contains(e.target as Node)) setStadeDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const applyFilters = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      let result = [...dealroomPMEs];

      if (filters.pays.length > 0) {
        result = result.filter(p => filters.pays.includes(p.pays));
      }
      if (filters.secteur.length > 0) {
        result = result.filter(p => filters.secteur.includes(p.secteur));
      }
      if (filters.score_min > 0) {
        result = result.filter(p => p.score_global >= filters.score_min);
      }
      if (filters.stade_levee.length > 0) {
        result = result.filter(p => filters.stade_levee.includes(p.stade_levee));
      }
      if (filters.certifie_uniquement) {
        result = result.filter(p => p.certification_khepra_dd);
      }

      setTotalCount(result.length);
      const start = (filters.page - 1) * filters.limit;
      setFilteredData(result.slice(start, start + filters.limit));
      setIsLoading(false);
    }, 300);
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const totalPages = Math.ceil(totalCount / filters.limit);

  const handleFilterChange = (key: keyof DealroomFilters, value: unknown) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const toggleArrayFilter = (key: 'pays' | 'secteur' | 'stade_levee', value: string) => {
    setFilters(prev => {
      const arr = prev[key];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter(v => v !== value) : [...arr, value], page: 1 };
    });
  };

  const handleExportCSV = () => {
    try {
      const allFiltered = dealroomPMEs.filter(p => {
        if (filters.pays.length > 0 && !filters.pays.includes(p.pays)) return false;
        if (filters.secteur.length > 0 && !filters.secteur.includes(p.secteur)) return false;
        if (filters.score_min > 0 && p.score_global < filters.score_min) return false;
        if (filters.stade_levee.length > 0 && !filters.stade_levee.includes(p.stade_levee)) return false;
        if (filters.certifie_uniquement && !p.certification_khepra_dd) return false;
        return true;
      });

      const header = 'Entreprise,Pays,Secteur,CA 2025,Effectif,Score Global,Gouvernance,Financement,Fiscal,Social,Stade,Recherche,Certifié KHEPRA DD,Email,Année Création';
      const rows = allFiltered.map(p =>
        `"${p.nom_entreprise}","${p.pays}","${p.secteur}","${p.ca_2025}","${p.effectif}",${p.score_global},${p.score_gouvernance},${p.score_financement},${p.score_fiscal},${p.score_social},"${p.stade_levee}","${p.montant_recherche}",${p.certification_khepra_dd},"${p.contact_email}",${p.annee_creation}`
      );
      const csv = [header, ...rows].join('\n');
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `khepra_dealroom_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportToast('CSV exporté avec succès');
      setTimeout(() => setExportToast(null), 3000);
    } catch {
      setExportToast('Erreur lors de l\'export');
      setTimeout(() => setExportToast(null), 3000);
    }
  };

  const getPaysName = (code: string) => PAYS_OPTIONS.find(p => p.code === code)?.name || code;

  return (
    <>
      {exportToast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-foreground-950 text-white text-sm font-medium shadow-lg animate-slide-up">
          <i className="ri-checkbox-circle-line mr-2" />
          {exportToast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-100 border border-accent-200">
              <i className="ri-funds-line text-lg text-accent-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground-950">Dealroom Khepra Certified</h2>
          </div>
          <p className="text-sm text-foreground-500 ml-12">
            {totalCount} PME investment-ready · Score min : {filters.score_min > 0 ? `> ${filters.score_min}` : 'Tous'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-300 bg-white text-sm font-medium text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-equalizer-line text-base" />
            Filtres {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v) ? '•' : ''}
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-300 bg-white text-sm font-medium text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-line text-base" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-background-50 rounded-xl border border-background-200 p-5 mb-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Pays multi-select */}
            <div className="relative" ref={paysRef}>
              <label className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Pays</label>
              <button
                onClick={() => { setPaysDropdown(!paysDropdown); setSecteurDropdown(false); setStadeDropdown(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-background-300 bg-white text-sm text-foreground-800 cursor-pointer hover:border-background-400 transition-colors"
              >
                <span className={filters.pays.length === 0 ? 'text-foreground-400' : ''}>
                  {filters.pays.length === 0 ? 'Tous les pays' : `${filters.pays.length} sélectionné${filters.pays.length > 1 ? 's' : ''}`}
                </span>
                <i className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${paysDropdown ? 'rotate-180' : ''}`} />
              </button>
              {paysDropdown && (
                <div className="absolute z-20 top-full mt-1 w-full bg-white rounded-lg border border-background-200 shadow-lg py-1 max-h-48 overflow-y-auto">
                  {PAYS_OPTIONS.map(p => (
                    <button
                      key={p.code}
                      onClick={() => toggleArrayFilter('pays', p.code)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer hover:bg-background-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${filters.pays.includes(p.code) ? 'bg-primary-500 border-primary-500' : 'border-background-300'}`}>
                        {filters.pays.includes(p.code) && <i className="ri-check-line text-white text-xs font-bold" />}
                      </div>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Secteur multi-select */}
            <div className="relative" ref={secteurRef}>
              <label className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Secteur</label>
              <button
                onClick={() => { setSecteurDropdown(!secteurDropdown); setPaysDropdown(false); setStadeDropdown(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-background-300 bg-white text-sm text-foreground-800 cursor-pointer hover:border-background-400 transition-colors"
              >
                <span className={filters.secteur.length === 0 ? 'text-foreground-400' : ''}>
                  {filters.secteur.length === 0 ? 'Tous les secteurs' : `${filters.secteur.length} sélectionné${filters.secteur.length > 1 ? 's' : ''}`}
                </span>
                <i className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${secteurDropdown ? 'rotate-180' : ''}`} />
              </button>
              {secteurDropdown && (
                <div className="absolute z-20 top-full mt-1 w-full bg-white rounded-lg border border-background-200 shadow-lg py-1 max-h-48 overflow-y-auto">
                  {SECTEUR_OPTIONS.map(s => (
                    <button
                      key={s.code}
                      onClick={() => toggleArrayFilter('secteur', s.code)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer hover:bg-background-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${filters.secteur.includes(s.code) ? 'bg-primary-500 border-primary-500' : 'border-background-300'}`}>
                        {filters.secteur.includes(s.code) && <i className="ri-check-line text-white text-xs font-bold" />}
                      </div>
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Score min slider */}
            <div>
              <label className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Score min : {filters.score_min}</label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={filters.score_min}
                onChange={(e) => handleFilterChange('score_min', parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer mt-3 accent-primary-500"
                style={{ background: `linear-gradient(to right, oklch(0.55 0.18 155) 0%, oklch(0.55 0.18 155) ${filters.score_min}%, oklch(0.9 0.01 200) ${filters.score_min}%, oklch(0.9 0.01 200) 100%)` }}
              />
              <div className="flex justify-between text-xs text-foreground-400 mt-1">
                <span>0</span><span>50</span><span>100</span>
              </div>
            </div>

            {/* Stade levee */}
            <div className="relative" ref={stadeRef}>
              <label className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Stade levée</label>
              <button
                onClick={() => { setStadeDropdown(!stadeDropdown); setPaysDropdown(false); setSecteurDropdown(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-background-300 bg-white text-sm text-foreground-800 cursor-pointer hover:border-background-400 transition-colors"
              >
                <span className={filters.stade_levee.length === 0 ? 'text-foreground-400' : ''}>
                  {filters.stade_levee.length === 0 ? 'Tous les stades' : `${filters.stade_levee.length} sélectionné${filters.stade_levee.length > 1 ? 's' : ''}`}
                </span>
                <i className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${stadeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {stadeDropdown && (
                <div className="absolute z-20 top-full mt-1 w-full bg-white rounded-lg border border-background-200 shadow-lg py-1 max-h-48 overflow-y-auto">
                  {STADES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleArrayFilter('stade_levee', s)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer hover:bg-background-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${filters.stade_levee.includes(s) ? 'bg-primary-500 border-primary-500' : 'border-background-300'}`}>
                        {filters.stade_levee.includes(s) && <i className="ri-check-line text-white text-xs font-bold" />}
                      </div>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Certifié uniquement */}
            <div className="flex items-end">
              <button
                onClick={() => handleFilterChange('certifie_uniquement', !filters.certifie_uniquement)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${filters.certifie_uniquement ? 'bg-primary-50 border-primary-300 text-primary-700' : 'bg-white border-background-300 text-foreground-600 hover:bg-background-100'}`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${filters.certifie_uniquement ? 'bg-primary-500 border-primary-500' : 'border-background-300'}`}>
                  {filters.certifie_uniquement && <i className="ri-check-line text-white text-xs font-bold" />}
                </div>
                <span>KHEPRA DD uniquement</span>
              </button>
            </div>
          </div>

          {/* Active filter badges */}
          {(filters.pays.length > 0 || filters.secteur.length > 0 || filters.stade_levee.length > 0 || filters.score_min > 0 || filters.certifie_uniquement) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-background-200">
              {filters.pays.map(code => (
                <span key={`p-${code}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium border border-primary-200">
                  {getPaysName(code)}
                  <button onClick={() => toggleArrayFilter('pays', code)} className="cursor-pointer hover:text-primary-900">
                    <i className="ri-close-line" />
                  </button>
                </span>
              ))}
              {filters.secteur.map(s => (
                <span key={`s-${s}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-medium border border-accent-200">
                  {s}
                  <button onClick={() => toggleArrayFilter('secteur', s)} className="cursor-pointer hover:text-accent-900">
                    <i className="ri-close-line" />
                  </button>
                </span>
              ))}
              {filters.stade_levee.map(s => (
                <span key={`st-${s}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-medium border border-secondary-200">
                  {s}
                  <button onClick={() => toggleArrayFilter('stade_levee', s)} className="cursor-pointer hover:text-secondary-900">
                    <i className="ri-close-line" />
                  </button>
                </span>
              ))}
              {filters.score_min > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background-200 text-foreground-600 text-xs font-medium border border-background-300">
                  Score &gt; {filters.score_min}
                  <button onClick={() => handleFilterChange('score_min', 0)} className="cursor-pointer hover:text-foreground-800">
                    <i className="ri-close-line" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-background-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-200 bg-background-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Entreprise</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Pays</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider hidden md:table-cell">Secteur</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider hidden lg:table-cell">CA 2025</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Score</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider hidden sm:table-cell">Stade</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider hidden md:table-cell">DD</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Détail</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-background-100">
                    <td colSpan={8} className="px-4 py-6">
                      <div className="flex items-center justify-center gap-2 text-foreground-400">
                        <div className="w-4 h-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
                        <span className="text-sm">Chargement du dealflow...</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredData.length === 0 ? (
                <tr className="border-b border-background-100">
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-foreground-400">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-background-100">
                        <i className="ri-search-line text-2xl" />
                      </div>
                      <p className="text-sm font-medium">Aucune PME ne correspond à ces critères</p>
                      <p className="text-xs">Essayez d'ajuster les filtres</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map(pme => (
                  <tr key={pme.id} className="border-b border-background-100 hover:bg-background-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent-100 text-accent-700 font-bold text-sm">
                          {pme.nom_entreprise.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground-950">{pme.nom_entreprise}</p>
                          <p className="text-xs text-foreground-400 truncate max-w-40">{pme.description.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-background-100 text-foreground-600 border border-background-200">
                        {getPaysName(pme.pays)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-foreground-700 hidden md:table-cell">{pme.secteur}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground-600 hidden lg:table-cell">{pme.ca_2025}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getScoreColor(pme.score_global)}`} />
                        <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${getScoreBgColor(pme.score_global)}`}>
                          {pme.score_global}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <div className="flex justify-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStadeColor(pme.stade_levee)}`}>
                          {pme.stade_levee}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div className="flex justify-center">
                        {pme.certification_khepra_dd ? (
                          <span className="text-emerald-600" title="Certifié KHEPRA DD">
                            <i className="ri-shield-check-line text-lg" />
                          </span>
                        ) : (
                          <span className="text-foreground-300">
                            <i className="ri-shield-line text-lg" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedPME(pme)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-background-200 text-foreground-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-colors cursor-pointer"
                          title="Voir le détail"
                        >
                          <i className="ri-eye-line" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-background-200 bg-background-50">
            <p className="text-xs text-foreground-500 mb-2 sm:mb-0">
              Page {filters.page} sur {totalPages || 1} · {totalCount} PME au total
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={filters.page === 1}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-background-200 bg-white text-foreground-600 hover:bg-background-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors whitespace-nowrap"
              >
                <i className="ri-arrow-left-s-line mr-1" />Précédent
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                    className={`w-8 h-8 rounded-md text-xs font-bold cursor-pointer transition-colors ${filters.page === pageNum ? 'bg-primary-500 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:bg-background-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-xs text-foreground-400 px-1">...</span>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: totalPages }))}
                    className="w-8 h-8 rounded-md text-xs font-bold cursor-pointer bg-white border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={filters.page >= totalPages}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-background-200 bg-white text-foreground-600 hover:bg-background-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors whitespace-nowrap"
              >
                Suivant<i className="ri-arrow-right-s-line ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPME && (
        <DealroomDetailModal pme={selectedPME} onClose={() => setSelectedPME(null)} />
      )}
    </>
  );
}



