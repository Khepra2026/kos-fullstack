import { useState, useRef, useEffect } from 'react';

export type CategoryKey = 'all' | 'governance' | 'finance' | 'entrepreneurship' | 'digital' | 'policy' | 'hr' | 'management' | 'compliance' | 'fiscalite' | 'strategy';
export type SectorKey = 'all' | 'microfinance' | 'fintech' | 'pme' | 'public' | 'ngo' | 'investors';
export type LangKey = 'all' | 'fr' | 'en';

export interface BlogFiltersState {
  category: CategoryKey;
  sector: SectorKey;
  lang: LangKey;
  tag: string | null;
  search: string;
}

interface BlogFiltersProps {
  filters: BlogFiltersState;
  availableTags: string[];
  totalResults: number;
  isEn: boolean;
  onFiltersChange: (filters: BlogFiltersState) => void;
  filterTop: number;
}

const CATEGORIES_FR: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'all', label: 'Toutes', icon: 'ri-apps-line' },
  { key: 'governance', label: 'Gouvernance', icon: 'ri-shield-check-line' },
  { key: 'finance', label: 'Finance', icon: 'ri-line-chart-line' },
  { key: 'entrepreneurship', label: 'Entrepreneuriat', icon: 'ri-rocket-line' },
  { key: 'digital', label: 'Transformation digitale', icon: 'ri-smartphone-line' },
  { key: 'policy', label: 'Politiques publiques', icon: 'ri-government-line' },
  { key: 'compliance', label: 'Conformité & Réglementation', icon: 'ri-file-shield-2-line' },
  { key: 'fiscalite', label: 'Prix de Transfert', icon: 'ri-money-euro-circle-line' },
  { key: 'strategy', label: 'Stratégie & Croissance', icon: 'ri-compass-3-line' },
  { key: 'hr', label: 'Ressources Humaines', icon: 'ri-team-line' },
  { key: 'management', label: 'Management', icon: 'ri-briefcase-line' },
];

const CATEGORIES_EN: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: 'ri-apps-line' },
  { key: 'governance', label: 'Governance', icon: 'ri-shield-check-line' },
  { key: 'finance', label: 'Finance', icon: 'ri-line-chart-line' },
  { key: 'entrepreneurship', label: 'Entrepreneurship', icon: 'ri-rocket-line' },
  { key: 'digital', label: 'Digital Transformation', icon: 'ri-smartphone-line' },
  { key: 'policy', label: 'Public Policy', icon: 'ri-government-line' },
  { key: 'compliance', label: 'Compliance & Regulation', icon: 'ri-file-shield-2-line' },
  { key: 'fiscalite', label: 'Transfer Pricing', icon: 'ri-money-euro-circle-line' },
  { key: 'strategy', label: 'Strategy & Growth', icon: 'ri-compass-3-line' },
  { key: 'hr', label: 'Human Resources', icon: 'ri-team-line' },
  { key: 'management', label: 'Management', icon: 'ri-briefcase-line' },
];

const SECTORS_FR: { key: SectorKey; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous les secteurs', icon: 'ri-building-line' },
  { key: 'microfinance', label: 'Microfinance & SFD', icon: 'ri-bank-line' },
  { key: 'fintech', label: 'Fintech & Innovation', icon: 'ri-flashlight-line' },
  { key: 'pme', label: 'PME & Startups', icon: 'ri-store-line' },
  { key: 'public', label: 'Secteur Public', icon: 'ri-government-line' },
  { key: 'ngo', label: 'ONG & Impact', icon: 'ri-heart-line' },
  { key: 'investors', label: 'Investisseurs & Projets', icon: 'ri-funds-line' },
];

const SECTORS_EN: { key: SectorKey; label: string; icon: string }[] = [
  { key: 'all', label: 'All sectors', icon: 'ri-building-line' },
  { key: 'microfinance', label: 'Microfinance & DFS', icon: 'ri-bank-line' },
  { key: 'fintech', label: 'Fintech & Innovation', icon: 'ri-flashlight-line' },
  { key: 'pme', label: 'SMEs & Startups', icon: 'ri-store-line' },
  { key: 'public', label: 'Public Sector', icon: 'ri-government-line' },
  { key: 'ngo', label: 'NGO & Impact', icon: 'ri-heart-line' },
  { key: 'investors', label: 'Investors & Projects', icon: 'ri-funds-line' },
];

const LANGS: { key: LangKey; label: string; flag: string }[] = [
  { key: 'all', label: 'FR + EN', flag: '🌍' },
  { key: 'fr', label: 'Français', flag: '🇫🇷' },
  { key: 'en', label: 'English', flag: '🇬🇧' },
];

// Mapping catégorie → tags sectoriels pour filtrage intelligent
const SECTOR_TAG_MAP: Record<SectorKey, string[]> = {
  all: [],
  microfinance: ['Microfinance', 'SFD', 'UEMOA', 'BCEAO', 'Inclusion financière', 'Financial Inclusion', 'LBC/FT', 'KYC', 'Conformité BCEAO', 'BCEAO Compliance', 'Agrément IMF', 'Agrément EMF', 'IMF Licensing', 'EMF Licensing'],
  fintech: ['FinTech', 'Transformation digitale', 'Digital Transformation', 'Innovation', 'Mobile banking'],
  pme: ['PME', 'SMEs', 'Startups', 'Entrepreneuriat', 'Entrepreneurship', 'Business Plan', 'Levée de fonds', 'Fundraising', 'Investor readiness'],
  public: ['Politiques publiques', 'Public Policy', 'Régulation', 'Regulation', 'Gouvernance', 'Governance', 'UEMOA'],
  ngo: ['ONG', 'NGO', 'Impact social', 'Social Impact', 'Inclusion financière', 'Financial Inclusion'],
  investors: ['Investisseurs', 'Investors', 'Projets', 'Projects', 'Due diligence', 'Acquisition', 'Valorisation', 'Valuation', 'Levée de fonds', 'Fundraising', 'Investor readiness', 'ESG', 'Gouvernance', 'Governance', 'Diagnostic organisationnel', 'Organizational Diagnosis'],
};

export default function BlogFilters({
  filters,
  availableTags,
  totalResults,
  isEn,
  onFiltersChange,
  filterTop,
}: BlogFiltersProps) {
  const [showTagsExpanded, setShowTagsExpanded] = useState(false);
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const sectorRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = isEn ? CATEGORIES_EN : CATEGORIES_FR;
  const sectors = isEn ? SECTORS_EN : SECTORS_FR;

  // Fermer les dropdowns au clic extérieur
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sectorRef.current && !sectorRef.current.contains(e.target as Node)) {
        setShowSectorDropdown(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const update = (partial: Partial<BlogFiltersState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.sector !== 'all' ||
    filters.lang !== 'all' ||
    filters.tag !== null ||
    filters.search.trim() !== '';

  const resetAll = () => {
    onFiltersChange({ category: 'all', sector: 'all', lang: 'all', tag: null, search: '' });
    setShowTagsExpanded(false);
  };

  const currentSector = sectors.find(s => s.key === filters.sector) || sectors[0];
  const currentLang = LANGS.find(l => l.key === filters.lang) || LANGS[0];

  const visibleTags = showTagsExpanded ? availableTags : availableTags.slice(0, 8);

  return (
    <div
      className="sticky z-40 bg-background-50 border-b border-secondary-100 shadow-sm"
      style={{ top: `${filterTop}px` }}
    >
      {/* Ligne 1 : Thématiques */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-3 pb-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-2">
          {/* Label */}
          <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider flex items-center gap-1 mr-1 whitespace-nowrap flex-shrink-0">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-3-line text-xs"></i>
            </div>
            {isEn ? 'Topic' : 'Thème'}
          </span>

          {/* Catégories */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => update({ category: key, tag: null })}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  filters.category === key
                    ? 'bg-accent-500 text-background-50 shadow-sm shadow-accent-200'
                    : 'bg-secondary-100 text-foreground-600 hover:bg-secondary-200 hover:text-foreground-800'
                }`}
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className={`${icon} text-xs`}></i>
                </div>
                <span className="break-words">{label}</span>
              </button>
            ))}
          </div>

          {/* Séparateur */}
          <div className="h-5 w-px bg-secondary-200 mx-1 hidden lg:block flex-shrink-0"></div>

          {/* Secteur dropdown */}
          <div className="relative flex-shrink-0" ref={sectorRef}>
            <button
              onClick={() => { setShowSectorDropdown(v => !v); setShowLangDropdown(false); }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                filters.sector !== 'all'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-secondary-50 text-foreground-600 border-secondary-200 hover:bg-secondary-100'
              }`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center">
                <i className={`${currentSector.icon} text-xs`}></i>
              </div>
              {currentSector.label}
              <div className="w-3 h-3 flex items-center justify-center">
                <i className={showSectorDropdown ? 'ri-arrow-up-s-line text-xs' : 'ri-arrow-down-s-line text-xs'}></i>
              </div>
            </button>
            {showSectorDropdown && (
              <div className="absolute top-full left-0 mt-1.5 bg-background-50 rounded-xl shadow-xl border border-secondary-100 py-1.5 min-w-[200px] z-50">
                {sectors.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => { update({ sector: key, tag: null }); setShowSectorDropdown(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      filters.sector === key
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-foreground-700 hover:bg-secondary-50'
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={`${icon} text-sm`}></i>
                    </div>
                    {label}
                    {filters.sector === key && (
                      <div className="w-4 h-4 flex items-center justify-center ml-auto">
                        <i className="ri-check-line text-emerald-600 text-sm"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Langue dropdown */}
          <div className="relative flex-shrink-0" ref={langRef}>
            <button
              onClick={() => { setShowLangDropdown(v => !v); setShowSectorDropdown(false); }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                filters.lang !== 'all'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm leading-none">{currentLang.flag}</span>
              {currentLang.label}
              <div className="w-3 h-3 flex items-center justify-center">
                <i className={showLangDropdown ? 'ri-arrow-up-s-line text-xs' : 'ri-arrow-down-s-line text-xs'}></i>
              </div>
            </button>
            {showLangDropdown && (
              <div className="absolute top-full left-0 mt-1.5 bg-background-50 rounded-xl shadow-xl border border-secondary-100 py-1.5 min-w-[160px] z-50">
                {LANGS.map(({ key, label, flag }) => (
                  <button
                    key={key}
                    onClick={() => { update({ lang: key }); setShowLangDropdown(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      filters.lang === key
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-foreground-700 hover:bg-secondary-50'
                    }`}
                  >
                    <span className="text-base leading-none">{flag}</span>
                    {label}
                    {filters.lang === key && (
                      <div className="w-4 h-4 flex items-center justify-center ml-auto">
                        <i className="ri-check-line text-indigo-600 text-sm"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="h-5 w-px bg-gray-200 mx-1 hidden lg:block flex-shrink-0"></div>

          {/* Barre de recherche */}
          <div className="relative flex items-center flex-shrink-0">
            <div className="w-4 h-4 flex items-center justify-center absolute left-3 pointer-events-none">
              <i className="ri-search-line text-xs text-foreground-400"></i>
            </div>
            <input
              ref={searchRef}
              type="text"
              value={filters.search}
              onChange={e => update({ search: e.target.value })}
              placeholder={isEn ? 'Search an article…' : 'Rechercher un article…'}
              className={`pl-8 pr-8 py-1.5 text-xs rounded-full border transition-all outline-none w-full sm:w-52 focus:w-64 ${
                filters.search.trim() !== ''
                  ? 'border-accent-400 bg-accent-50 text-foreground-800 shadow-sm'
                  : 'border-secondary-200 bg-secondary-50 text-foreground-700 focus:border-accent-300 focus:bg-background-50'
              }`}
            />
            {filters.search.trim() !== '' && (
              <button
                onClick={() => { update({ search: '' }); searchRef.current?.focus(); }}
                className="absolute right-2.5 w-4 h-4 flex items-center justify-center text-foreground-400 hover:text-foreground-700 cursor-pointer transition-colors"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            )}
          </div>

          {/* Compteur résultats + reset */}
          <div className="lg:ml-auto flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-foreground-400 whitespace-nowrap">
              <strong className="text-foreground-700">{totalResults}</strong> {isEn ? 'article(s)' : 'article(s)'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer whitespace-nowrap transition-colors"
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-close-circle-line text-xs"></i>
                </div>
                {isEn ? 'Reset' : 'Réinitialiser'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ligne 2 : Tags */}
      {availableTags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-3 border-t border-secondary-50 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider flex items-center gap-1 mr-1 whitespace-nowrap">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-price-tag-3-line text-xs"></i>
              </div>
              Tags
            </span>
            {visibleTags.map(tag => (
              <button
                key={tag}
                onClick={() => update({ tag: filters.tag === tag ? null : tag })}
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filters.tag === tag
                    ? 'bg-foreground-950 text-background-50 border-foreground-950 shadow-sm'
                    : 'bg-secondary-50 text-foreground-600 border-secondary-200 hover:bg-secondary-100 hover:border-secondary-300'
                }`}
              >
                {filters.tag === tag && (
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-close-line text-xs"></i>
                  </div>
                )}
                {tag}
              </button>
            ))}
            {availableTags.length > 8 && (
              <button
                onClick={() => setShowTagsExpanded(v => !v)}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-dashed border-secondary-300 text-foreground-500 hover:border-secondary-400 hover:text-foreground-700 font-medium transition-all cursor-pointer whitespace-nowrap"
              >
                {showTagsExpanded ? (
                  <>
                    <div className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-arrow-up-s-line text-xs"></i>
                    </div>
                    {isEn ? 'Less' : 'Moins'}
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-add-line text-xs"></i>
                    </div>
                    +{availableTags.length - 8} {isEn ? 'more' : 'autres'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bandeau filtre actif */}
      {hasActiveFilters && (
        <div className="bg-accent-50 border-t border-accent-100 px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-fill text-accent-600 text-xs"></i>
            </div>
            <span className="text-xs text-accent-800 font-medium">
              {isEn ? 'Active filters:' : 'Filtres actifs :'}
            </span>
            {filters.category !== 'all' && (
              <ActiveBadge
                label={(isEn ? CATEGORIES_EN : CATEGORIES_FR).find(c => c.key === filters.category)?.label || ''}
                color="amber"
                onRemove={() => update({ category: 'all' })}
              />
            )}
            {filters.sector !== 'all' && (
              <ActiveBadge
                label={(isEn ? SECTORS_EN : SECTORS_FR).find(s => s.key === filters.sector)?.label || ''}
                color="emerald"
                onRemove={() => update({ sector: 'all' })}
              />
            )}
            {filters.lang !== 'all' && (
              <ActiveBadge
                label={LANGS.find(l => l.key === filters.lang)?.label || ''}
                color="indigo"
                onRemove={() => update({ lang: 'all' })}
              />
            )}
            {filters.tag && (
              <ActiveBadge
                label={`#${filters.tag}`}
                color="gray"
                onRemove={() => update({ tag: null })}
              />
            )}
            {filters.search.trim() !== '' && (
              <ActiveBadge
                label={`"${filters.search.trim()}"`}
                color="rose"
                onRemove={() => update({ search: '' })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveBadge({
  label,
  color,
  onRemove,
}: {
  label: string;
  color: 'amber' | 'emerald' | 'indigo' | 'gray' | 'rose';
  onRemove: () => void;
}) {
  const colorMap = {
    amber: 'bg-accent-100 text-accent-800 border-accent-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    gray: 'bg-secondary-100 text-secondary-800 border-secondary-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full border font-semibold ${colorMap[color]}`}>
      {label}
      <button onClick={onRemove} className="cursor-pointer hover:opacity-70 transition-opacity">
        <div className="w-3 h-3 flex items-center justify-center">
          <i className="ri-close-line text-xs"></i>
        </div>
      </button>
    </span>
  );
}

export { SECTOR_TAG_MAP };
