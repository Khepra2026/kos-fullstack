interface AdminDocumentFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  client: string;
  onClientChange: (v: string) => void;
  clients: string[];
  totalCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (v: 'grid' | 'list') => void;
}

const CATEGORIES = [
  { value: 'all', label: 'Toutes catégories' },
  { value: 'rapport', label: 'Rapports' },
  { value: 'proposition', label: 'Propositions' },
  { value: 'contrat', label: 'Contrats' },
  { value: 'diagnostic', label: 'Diagnostics' },
  { value: 'strategie', label: 'Stratégie' },
  { value: 'audit', label: 'Audits' },
  { value: 'formation', label: 'Formations' },
  { value: 'presentation', label: 'Présentations' },
  { value: 'note', label: 'Notes' },
  { value: 'general', label: 'Général' },
];

export default function AdminDocumentFilters({
  search, onSearchChange,
  category, onCategoryChange,
  client, onClientChange,
  clients,
  totalCount,
  viewMode, onViewModeChange,
}: AdminDocumentFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Recherche */}
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher un document, client, description..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-sm"></i>
            </button>
          )}
        </div>

        {/* Catégorie */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[180px]"
        >
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {/* Client */}
        {clients.length > 0 && (
          <select
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[160px]"
          >
            <option value="">Tous les clients</option>
            {clients.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {/* Vue */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer ${
              viewMode === 'grid' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-grid-line text-sm"></i>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-list-check text-sm"></i>
          </button>
        </div>
      </div>

      {/* Résultats */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-gray-500">
          <strong className="text-gray-900">{totalCount}</strong> document{totalCount !== 1 ? 's' : ''}
          {category !== 'all' && <span> dans <strong>{CATEGORIES.find(c => c.value === category)?.label}</strong></span>}
          {client && <span> pour <strong>{client}</strong></span>}
          {search && <span> correspondant à <strong>&quot;{search}&quot;</strong></span>}
        </span>
        {(category !== 'all' || client || search) && (
          <button
            onClick={() => { onCategoryChange('all'); onClientChange(''); onSearchChange(''); }}
            className="text-xs text-teal-600 hover:underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  );
}
