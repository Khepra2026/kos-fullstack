import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/base/OptimizedImage';

interface Country {
  id: string;
  name: string;
  region: 'west' | 'central';
  capital: string;
  flag: string;
  // SVG path approximation as circle/ellipse positions on the map
  cx: number;
  cy: number;
}

const COUNTRIES: Country[] = [
  // Afrique de l'Ouest
  { id: 'sn', name: 'Sénégal', region: 'west', capital: 'Dakar', flag: '🇸🇳', cx: 112, cy: 198 },
  { id: 'gm', name: 'Gambie', region: 'west', capital: 'Banjul', flag: '🇬🇲', cx: 118, cy: 215 },
  { id: 'gw', name: 'Guinée-Bissau', region: 'west', capital: 'Bissau', flag: '🇬🇼', cx: 108, cy: 228 },
  { id: 'gn', name: 'Guinée', region: 'west', capital: 'Conakry', flag: '🇬🇳', cx: 128, cy: 248 },
  { id: 'sl', name: 'Sierra Leone', region: 'west', capital: 'Freetown', flag: '🇸🇱', cx: 118, cy: 268 },
  { id: 'lr', name: 'Libéria', region: 'west', capital: 'Monrovia', flag: '🇱🇷', cx: 138, cy: 282 },
  { id: 'ci', name: "Côte d'Ivoire", region: 'west', capital: 'Abidjan', flag: '🇨🇮', cx: 168, cy: 278 },
  { id: 'ml', name: 'Mali', region: 'west', capital: 'Bamako', flag: '🇲🇱', cx: 178, cy: 188 },
  { id: 'bf', name: 'Burkina Faso', region: 'west', capital: 'Ouagadougou', flag: '🇧🇫', cx: 198, cy: 228 },
  { id: 'gh', name: 'Ghana', region: 'west', capital: 'Accra', flag: '🇬🇭', cx: 188, cy: 268 },
  { id: 'tg', name: 'Togo', region: 'west', capital: 'Lomé', flag: '🇹🇬', cx: 208, cy: 268 },
  { id: 'bj', name: 'Bénin', region: 'west', capital: 'Cotonou', flag: '🇧🇯', cx: 222, cy: 262 },
  { id: 'ne', name: 'Niger', region: 'west', capital: 'Niamey', flag: '🇳🇪', cx: 228, cy: 198 },
  { id: 'ng', name: 'Nigéria', region: 'west', capital: 'Abuja', flag: '🇳🇬', cx: 242, cy: 248 },
  { id: 'mr', name: 'Mauritanie', region: 'west', capital: 'Nouakchott', flag: '🇲🇷', cx: 128, cy: 158 },
  // Afrique Centrale
  { id: 'cm', name: 'Cameroun', region: 'central', capital: 'Yaoundé', flag: '🇨🇲', cx: 268, cy: 268 },
  { id: 'td', name: 'Tchad', region: 'central', capital: "N'Djamena", flag: '🇹🇩', cx: 278, cy: 218 },
  { id: 'cf', name: 'Centrafrique', region: 'central', capital: 'Bangui', flag: '🇨🇫', cx: 308, cy: 268 },
  { id: 'ga', name: 'Gabon', region: 'central', capital: 'Libreville', flag: '🇬🇦', cx: 268, cy: 308 },
  { id: 'gq', name: 'Guinée Équatoriale', region: 'central', capital: 'Malabo', flag: '🇬🇶', cx: 258, cy: 298 },
  { id: 'cg', name: 'Congo', region: 'central', capital: 'Brazzaville', flag: '🇨🇬', cx: 288, cy: 318 },
  { id: 'cd', name: 'RD Congo', region: 'central', capital: 'Kinshasa', flag: '🇨🇩', cx: 318, cy: 338 },
  { id: 'ao', name: 'Angola', region: 'central', capital: 'Luanda', flag: '🇦🇴', cx: 288, cy: 378 },
];

export function ServicesZones() {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState<'all' | 'west' | 'central'>('all');
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const westCountries = COUNTRIES.filter((c) => c.region === 'west');
  const centralCountries = COUNTRIES.filter((c) => c.region === 'central');

  const visibleCountries = COUNTRIES.filter(
    (c) => activeRegion === 'all' || c.region === activeRegion
  );

  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>, country: Country) => {
    const rect = (e.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCountry(country);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-gold-500">
            <span className="text-sm font-medium text-gold-600">
              {t('servicesPage.zones.badge')}
            </span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-5">
            {t('servicesPage.zones.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('servicesPage.zones.subtitle')}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-1 py-1 gap-1">
            {[
              { key: 'all', label: t('servicesPage.zones.filter.all') },
              { key: 'west', label: t('servicesPage.zones.filter.west') },
              { key: 'central', label: t('servicesPage.zones.filter.central') },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveRegion(tab.key as 'all' | 'west' | 'central')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeRegion === tab.key
                    ? 'bg-brand-900 text-white shadow-md'
                    : 'text-gray-600 hover:text-brand-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Map */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 rounded-3xl overflow-hidden shadow-2xl p-4">
            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-10">
              <OptimizedImage
                src="https://readdy.ai/api/search-image?query=Africa%20continent%20map%20outline%20silhouette%20minimal%20clean%20cartography%20geographic%20illustration%20dark%20background%20subtle%20texture%20professional%20atlas&width=800&height=600&seq=africa-map-bg-zones-001&orientation=landscape"
                alt="Carte Afrique"
                className="w-full h-full"
                width={800}
                height={600}
                aspectRatio="4/3"
                objectFit="cover"
                loading="lazy"
                placeholder="none"
              />
            </div>

            <div className="relative z-10">
              {/* Legend */}
              <div className="flex items-center gap-6 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold-400 inline-block"></span>
                  <span className="text-xs text-white/70">{t('servicesPage.zones.filter.west')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  <span className="text-xs text-white/70">{t('servicesPage.zones.filter.central')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold-500 ring-2 ring-white inline-block"></span>
                  <span className="text-xs text-white/70">{t('servicesPage.zones.headquarter')}</span>
                </div>
              </div>

              {/* SVG Map */}
              <div className="relative w-full" style={{ paddingBottom: '70%' }}>
                <svg
                  viewBox="60 130 340 300"
                  className="absolute inset-0 w-full h-full"
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Grid lines */}
                  {[140, 170, 200, 230, 260, 290, 320, 350, 380, 410].map((y) => (
                    <line key={`h${y}`} x1="60" y1={y} x2="400" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                  ))}
                  {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((x) => (
                    <line key={`v${x}`} x1={x} y1="130" x2={x} y2="430" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                  ))}

                  {/* Country dots */}
                  {COUNTRIES.map((country) => {
                    const isVisible = activeRegion === 'all' || country.region === activeRegion;
                    const isHovered = hoveredCountry?.id === country.id;
                    const isTogo = country.id === 'tg';
                    const color = country.region === 'west' ? '#86BC25' : '#86BC25';

                    return (
                      <g key={country.id}>
                        {/* Pulse ring for Togo */}
                        {isTogo && isVisible && (
                          <circle
                            cx={country.cx}
                            cy={country.cy}
                            r="12"
                            fill="none"
                            stroke="#86BC25"
                            strokeWidth="1.5"
                            strokeOpacity="0.4"
                            className="animate-ping"
                            style={{ transformOrigin: `${country.cx}px ${country.cy}px` }}
                          />
                        )}
                        <circle
                          cx={country.cx}
                          cy={country.cy}
                          r={isTogo ? 7 : isHovered ? 6 : 4.5}
                          fill={isVisible ? color : 'rgba(255,255,255,0.1)'}
                          stroke={isHovered || isTogo ? 'white' : 'transparent'}
                          strokeWidth={isTogo ? 2 : 1.5}
                          opacity={isVisible ? 1 : 0.2}
                          className="cursor-pointer transition-all duration-200"
                          onMouseMove={(e) => isVisible && handleMouseMove(e, country)}
                          onMouseLeave={() => setHoveredCountry(null)}
                        />
                        {/* Country label for hovered */}
                        {isHovered && isVisible && (
                          <text
                            x={country.cx}
                            y={country.cy - 12}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                            fontWeight="600"
                          >
                            {country.name}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Tooltip */}
                  {hoveredCountry && (activeRegion === 'all' || hoveredCountry.region === activeRegion) && (
                    <g>
                      <rect
                        x={tooltipPos.x + 8}
                        y={tooltipPos.y - 30}
                        width="110"
                        height="36"
                        rx="6"
                        fill="rgba(0,0,0,0.85)"
                      />
                      <text x={tooltipPos.x + 14} y={tooltipPos.y - 14} fill="white" fontSize="8" fontWeight="700">
                        {hoveredCountry.flag} {hoveredCountry.name}
                      </text>
                      <text x={tooltipPos.x + 14} y={tooltipPos.y - 4} fill="#9CA3AF" fontSize="7">
                        {hoveredCountry.capital}
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              <p className="text-center text-white/40 text-xs mt-2 pb-2">
                {t('servicesPage.zones.mapHint')}
              </p>
            </div>
          </div>

          {/* Country lists */}
          <div className="flex flex-col gap-6">
            {/* West Africa */}
            <div
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                activeRegion === 'central'
                  ? 'opacity-40 border-gray-200'
                  : 'border-gold-200 shadow-md'
              } gradient-border glow-gold-hover`}
            >
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center">
                  <i className="ri-map-pin-2-line text-white text-lg"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t('servicesPage.zones.filter.west')}</h3>
                  <span className="text-gold-100 text-xs">{westCountries.length} pays</span>
                </div>
              </div>
              <div className="bg-white px-4 py-3">
                <div className="grid grid-cols-2 gap-1">
                  {westCountries.map((c) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setHoveredCountry(c)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all text-xs ${
                        hoveredCountry?.id === c.id
                          ? 'bg-gold-50 text-gold-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      } ${c.id === 'tg' ? 'font-bold text-gold-700' : ''}`}
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                      {c.id === 'tg' && (
                        <span className="ml-auto">
                          <i className="ri-home-4-line text-gold-500 text-xs"></i>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Central Africa */}
            <div
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                activeRegion === 'west'
                  ? 'opacity-40 border-gray-200'
                  : 'border-emerald-200 shadow-md'
              } gradient-border glow-gold-hover`}
            >
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center">
                  <i className="ri-map-pin-2-line text-white text-lg"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t('servicesPage.zones.filter.central')}</h3>
                  <span className="text-emerald-100 text-xs">{centralCountries.length} pays</span>
                </div>
              </div>
              <div className="bg-white px-4 py-3">
                <div className="grid grid-cols-2 gap-1">
                  {centralCountries.map((c) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setHoveredCountry(c)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all text-xs ${
                        hoveredCountry?.id === c.id
                          ? 'bg-emerald-50 text-emerald-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary badge */}
            <div className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-2xl px-5 py-4 text-center gradient-border glow-gold-hover">
              <div className="text-3xl font-bold text-white mb-1">{COUNTRIES.length}</div>
              <div className="text-gold-400 text-sm font-semibold">{t('servicesPage.zones.totalCountries')}</div>
              <div className="text-white/50 text-xs mt-1">{t('servicesPage.zones.totalSub')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
