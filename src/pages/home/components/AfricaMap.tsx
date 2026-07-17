import { useState } from 'react';

interface Country {
  name: string;
  nameFr: string;
  zone: 'west' | 'central' | 'base';
  cx: number;
  cy: number;
  r: number;
}

const countries: Country[] = [
  // Base
  { name: 'Togo', nameFr: 'Togo (Siège)', zone: 'base', cx: 248, cy: 310, r: 7 },
  // Afrique de l'Ouest
  { name: 'Senegal', nameFr: 'Sénégal', zone: 'west', cx: 148, cy: 248, r: 9 },
  { name: 'Mali', nameFr: 'Mali', zone: 'west', cx: 210, cy: 230, r: 11 },
  { name: 'Burkina Faso', nameFr: 'Burkina Faso', zone: 'west', cx: 238, cy: 268, r: 9 },
  { name: 'Côte d\'Ivoire', nameFr: "Côte d'Ivoire", zone: 'west', cx: 205, cy: 310, r: 9 },
  { name: 'Ghana', nameFr: 'Ghana', zone: 'west', cx: 228, cy: 315, r: 8 },
  { name: 'Benin', nameFr: 'Bénin', zone: 'west', cx: 262, cy: 305, r: 7 },
  { name: 'Niger', nameFr: 'Niger', zone: 'west', cx: 272, cy: 238, r: 12 },
  { name: 'Nigeria', nameFr: 'Nigéria', zone: 'west', cx: 285, cy: 290, r: 13 },
  { name: 'Guinea', nameFr: 'Guinée', zone: 'west', cx: 165, cy: 285, r: 8 },
  // Afrique Centrale
  { name: 'Cameroon', nameFr: 'Cameroun', zone: 'central', cx: 305, cy: 320, r: 10 },
  { name: 'Gabon', nameFr: 'Gabon', zone: 'central', cx: 305, cy: 360, r: 8 },
  { name: 'Congo', nameFr: 'Congo', zone: 'central', cx: 325, cy: 375, r: 8 },
  { name: 'DRC', nameFr: 'RD Congo', zone: 'central', cx: 360, cy: 390, r: 14 },
  { name: 'Chad', nameFr: 'Tchad', zone: 'central', cx: 335, cy: 268, r: 11 },
  { name: 'CAR', nameFr: 'Centrafrique', zone: 'central', cx: 355, cy: 320, r: 10 },
];

const zoneColors = {
  base: { fill: '#B8860B', stroke: '#8B6508', label: 'Siège — Lomé, Togo' },
  west: { fill: '#D4A017', stroke: '#A07810', label: 'Afrique de l\'Ouest' },
  central: { fill: '#8B4513', stroke: '#6B3410', label: 'Afrique Centrale' },
};

export function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (name: string, cx: number, cy: number) => {
    setHovered(name);
    setTooltipPos({ x: cx, y: cy });
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {Object.entries(zoneColors).map(([zone, { fill, label }]) => (
          <div key={zone} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded-full border-2"
              style={{ backgroundColor: fill, borderColor: fill }}
            />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-100 overflow-hidden p-4">
        {/* Background decorative circles */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-amber-400" />
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-orange-400" />
        </div>

        <svg
          viewBox="100 180 340 280"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
        >
          {/* Africa continent silhouette path (simplified) */}
          <path
            d="M160,185 L200,182 L240,180 L280,183 L320,188 L355,198 L385,215 L400,235 L408,258 L405,280 L398,305 L390,330 L378,355 L362,378 L345,398 L325,415 L305,428 L285,435 L265,438 L248,440 L232,435 L215,425 L198,410 L182,392 L168,372 L155,350 L145,325 L138,300 L133,275 L130,250 L132,225 L138,205 L148,192 Z"
            fill="#F5E6C8"
            stroke="#D4B896"
            strokeWidth="2"
          />

          {/* Zone highlight overlays */}
          {/* West Africa region */}
          <ellipse cx="220" cy="285" rx="90" ry="65" fill="#D4A01720" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="6,3" />
          {/* Central Africa region */}
          <ellipse cx="340" cy="355" rx="75" ry="60" fill="#8B451320" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="6,3" />

          {/* Country dots */}
          {countries.map((country) => {
            const colors = zoneColors[country.zone];
            const isHovered = hovered === country.name;
            const isBase = country.zone === 'base';
            return (
              <g key={country.name}>
                {/* Pulse ring for base */}
                {isBase && (
                  <circle
                    cx={country.cx}
                    cy={country.cy}
                    r={country.r + 6}
                    fill="none"
                    stroke={colors.fill}
                    strokeWidth="2"
                    opacity="0.4"
                  />
                )}
                <circle
                  cx={country.cx}
                  cy={country.cy}
                  r={isHovered ? country.r + 3 : country.r}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isBase ? 2.5 : 1.5}
                  style={{ cursor: 'pointer', transition: 'r 0.2s ease' }}
                  onMouseEnter={() => handleMouseEnter(country.name, country.cx, country.cy)}
                  onMouseLeave={() => setHovered(null)}
                />
                {/* Label for base city */}
                {isBase && (
                  <text
                    x={country.cx + 10}
                    y={country.cy - 10}
                    fontSize="8"
                    fontWeight="bold"
                    fill="#8B6508"
                    fontFamily="sans-serif"
                  >
                    ★ Lomé
                  </text>
                )}
              </g>
            );
          })}

          {/* Tooltip */}
          {hovered && (() => {
            const country = countries.find(c => c.name === hovered);
            if (!country) return null;
            const colors = zoneColors[country.zone];
            const tx = country.cx + 12;
            const ty = country.cy - 8;
            return (
              <g>
                <rect x={tx - 4} y={ty - 12} width={country.nameFr.length * 6 + 8} height={18} rx="4" fill={colors.fill} opacity="0.95" />
                <text x={tx} y={ty} fontSize="8" fill="white" fontWeight="bold" fontFamily="sans-serif">
                  {country.nameFr}
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Zone labels on map */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between pointer-events-none">
          <div className="bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Afrique de l'Ouest
          </div>
          <div className="bg-orange-800/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Afrique Centrale
          </div>
        </div>
      </div>

      {/* Stats below map */}
      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-lg">
        {[
          { value: '2', label: 'Zones couvertes', icon: 'ri-map-2-line' },
          { value: '15+', label: 'Pays d\'intervention', icon: 'ri-flag-line' },
          { value: '1', label: 'Siège — Lomé, Togo', icon: 'ri-building-2-line' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 text-center shadow-md border border-amber-100">
            <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <i className={`${stat.icon} text-amber-600 text-xl`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
