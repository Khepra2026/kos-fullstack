import { useTranslation } from 'react-i18next';

interface Props {
  selectedBU: string;
  selectedSector: string;
  selectedCountry: string;
  onBUChange: (bu: string) => void;
  onSectorChange: (sector: string) => void;
  onCountryChange: (country: string) => void;
}

const businessUnits = [
  {
    key: 'all',
    labelFr: 'Toutes les BUs',
    labelEn: 'All BUs',
    icon: 'ri-apps-line',
    accent: '#525252',
  },
  {
    key: 'regulation',
    labelFr: 'Régulation Financière',
    labelEn: 'Financial Regulation',
    icon: 'ri-bank-line',
    accent: '#86BC25',
  },
  {
    key: 'prix-transfert',
    labelFr: 'Prix de Transfert',
    labelEn: 'Transfer Pricing',
    icon: 'ri-exchange-funds-line',
    accent: '#D4AF37',
  },
  {
    key: 'grc',
    labelFr: 'Gouvernance & Risques',
    labelEn: 'Governance & Risk',
    icon: 'ri-shield-check-line',
    accent: '#6B9B1F',
  },
];

const sectors = [
  { key: 'all', labelFr: 'Tous secteurs', labelEn: 'All sectors' },
  { key: 'financial', labelFr: 'Banques & SFD', labelEn: 'Banks & MFIs' },
  { key: 'enterprise', labelFr: 'Entreprises', labelEn: 'Enterprises' },
  { key: 'supervision', labelFr: 'Supervision & ONG', labelEn: 'Supervision & NGOs' },
  { key: 'agro', labelFr: 'Agro-industrie', labelEn: 'Agro-industry' },
];

const countries = [
  { key: 'all', labelFr: 'Tous pays', labelEn: 'All countries' },
  { key: 'Togo', labelFr: 'Togo', labelEn: 'Togo' },
  { key: 'Côte d\'Ivoire', labelFr: 'Côte d\'Ivoire', labelEn: 'Côte d\'Ivoire' },
  { key: 'Burkina Faso', labelFr: 'Burkina Faso', labelEn: 'Burkina Faso' },
  { key: 'Cameroun', labelFr: 'Cameroun', labelEn: 'Cameroon' },
  { key: 'Mali', labelFr: 'Mali', labelEn: 'Mali' },
  { key: 'Niger', labelFr: 'Niger', labelEn: 'Niger' },
  { key: 'UEMOA / CEMAC', labelFr: 'UEMOA / CEMAC', labelEn: 'UEMOA / CEMAC' },
  { key: 'UEMOA', labelFr: 'UEMOA', labelEn: 'UEMOA' },
];

export function CaseStudiesFilters({
  selectedBU, selectedSector, selectedCountry,
  onBUChange, onSectorChange, onCountryChange,
}: Props) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="space-y-6 mb-12">
      {/* ── BU Tabs — Primary Filter ── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] text-center mb-4">
          {isEn ? 'Filter by Business Unit' : 'Filtrer par Business Unit'}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {businessUnits.map((bu) => {
            const isActive = selectedBU === bu.key;
            return (
              <button
                key={bu.key}
                onClick={() => onBUChange(bu.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                }`}
                style={isActive ? { background: bu.accent, borderColor: bu.accent } : {}}
              >
                <i className={`${bu.icon} text-base`} />
                <span>{isEn ? bu.labelEn : bu.labelFr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Secondary Filters Row ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Sector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {isEn ? 'Sector:' : 'Secteur :'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sectors.map((s) => (
              <button
                key={s.key}
                onClick={() => onSectorChange(s.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                  selectedSector === s.key
                    ? 'bg-foreground-900 text-white border-foreground-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {isEn ? s.labelEn : s.labelFr}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-200" />

        {/* Country */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {isEn ? 'Country:' : 'Pays :'}
          </span>
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          >
            {countries.map((c) => (
              <option key={c.key} value={c.key}>
                {isEn ? c.labelEn : c.labelFr}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}