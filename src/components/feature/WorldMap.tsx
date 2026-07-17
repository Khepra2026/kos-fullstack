import { useState } from 'react';

// Coordonnées SVG simplifiées des pays (projection équirectangulaire)
// Format: [x%, y%] dans un viewBox 0 0 1000 500
const COUNTRY_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  '384': { x: 420, y: 310, label: 'Côte d\'Ivoire' },
  '686': { x: 400, y: 285, label: 'Sénégal' },
  '466': { x: 430, y: 275, label: 'Mali' },
  '854': { x: 450, y: 280, label: 'Burkina Faso' },
  '324': { x: 415, y: 300, label: 'Guinée' },
  '768': { x: 460, y: 310, label: 'Togo' },
  '204': { x: 465, y: 305, label: 'Bénin' },
  '562': { x: 470, y: 265, label: 'Niger' },
  '120': { x: 490, y: 315, label: 'Cameroun' },
  '178': { x: 495, y: 340, label: 'Congo' },
  '180': { x: 510, y: 345, label: 'RD Congo' },
  '266': { x: 485, y: 335, label: 'Gabon' },
  '450': { x: 570, y: 390, label: 'Madagascar' },
  '504': { x: 450, y: 215, label: 'Maroc' },
  '788': { x: 480, y: 210, label: 'Tunisie' },
  '012': { x: 460, y: 220, label: 'Algérie' },
  '250': { x: 480, y: 175, label: 'France' },
  '056': { x: 490, y: 168, label: 'Belgique' },
  '756': { x: 495, y: 175, label: 'Suisse' },
  '124': { x: 175, y: 175, label: 'Canada' },
  '840': { x: 185, y: 210, label: 'États-Unis' },
  '826': { x: 475, y: 162, label: 'Royaume-Uni' },
  '276': { x: 500, y: 165, label: 'Allemagne' },
  '288': { x: 445, y: 310, label: 'Ghana' },
  '566': { x: 470, y: 310, label: 'Nigeria' },
  '404': { x: 545, y: 320, label: 'Kenya' },
  '231': { x: 545, y: 295, label: 'Éthiopie' },
  '834': { x: 540, y: 340, label: 'Tanzanie' },
  '646': { x: 535, y: 330, label: 'Rwanda' },
  '480': { x: 580, y: 370, label: 'Maurice' },
  '508': { x: 535, y: 370, label: 'Mozambique' },
  '024': { x: 505, y: 360, label: 'Angola' },
  '894': { x: 520, y: 370, label: 'Zambie' },
  '716': { x: 525, y: 375, label: 'Zimbabwe' },
  '710': { x: 515, y: 400, label: 'Afrique du Sud' },
  '148': { x: 495, y: 270, label: 'Tchad' },
  '729': { x: 515, y: 255, label: 'Soudan' },
  '434': { x: 490, y: 230, label: 'Libye' },
  '818': { x: 515, y: 225, label: 'Égypte' },
  '478': { x: 415, y: 255, label: 'Mauritanie' },
  '694': { x: 410, y: 305, label: 'Sierra Leone' },
  '430': { x: 415, y: 310, label: 'Liberia' },
  '270': { x: 405, y: 290, label: 'Gambie' },
  '800': { x: 530, y: 315, label: 'Ouganda' },
  '108': { x: 530, y: 335, label: 'Burundi' },
  '454': { x: 530, y: 360, label: 'Malawi' },
  '072': { x: 515, y: 390, label: 'Botswana' },
  '516': { x: 505, y: 385, label: 'Namibie' },
  '706': { x: 550, y: 300, label: 'Somalie' },
  '262': { x: 545, y: 285, label: 'Djibouti' },
  '724': { x: 470, y: 185, label: 'Espagne' },
  '380': { x: 500, y: 185, label: 'Italie' },
  '620': { x: 460, y: 190, label: 'Portugal' },
  '528': { x: 490, y: 165, label: 'Pays-Bas' },
  '156': { x: 760, y: 220, label: 'Chine' },
  '392': { x: 820, y: 215, label: 'Japon' },
  '356': { x: 680, y: 250, label: 'Inde' },
  '076': { x: 270, y: 370, label: 'Brésil' },
  '484': { x: 175, y: 265, label: 'Mexique' },
  '036': { x: 800, y: 400, label: 'Australie' },
};

const COUNTRY_NAME_TO_ISO: Record<string, string> = {
  'Ivory Coast': '384', 'Côte d\'Ivoire': '384',
  'Senegal': '686', 'Sénégal': '686',
  'Mali': '466', 'Burkina Faso': '854',
  'Guinea': '324', 'Guinée': '324',
  'Togo': '768', 'Benin': '204', 'Bénin': '204',
  'Niger': '562', 'Cameroon': '120', 'Cameroun': '120',
  'Congo': '178', 'Democratic Republic of the Congo': '180',
  'Gabon': '266', 'Madagascar': '450',
  'Morocco': '504', 'Maroc': '504',
  'Tunisia': '788', 'Tunisie': '788',
  'Algeria': '012', 'Algérie': '012',
  'France': '250', 'Belgium': '056', 'Belgique': '056',
  'Switzerland': '756', 'Suisse': '756',
  'Canada': '124', 'United States': '840', 'États-Unis': '840',
  'United Kingdom': '826', 'Royaume-Uni': '826',
  'Germany': '276', 'Allemagne': '276',
  'Ghana': '288', 'Nigeria': '566', 'Kenya': '404',
  'Ethiopia': '231', 'Éthiopie': '231',
  'Tanzania': '834', 'Tanzanie': '834',
  'Rwanda': '646', 'Mauritius': '480', 'Maurice': '480',
  'Mozambique': '508', 'Angola': '024',
  'Zambia': '894', 'Zambie': '894',
  'Zimbabwe': '716', 'South Africa': '710', 'Afrique du Sud': '710',
  'Chad': '148', 'Tchad': '148',
  'Sudan': '729', 'Soudan': '729',
  'Libya': '434', 'Libye': '434',
  'Egypt': '818', 'Égypte': '818',
  'Mauritania': '478', 'Mauritanie': '478',
  'Sierra Leone': '694', 'Liberia': '430',
  'Gambia': '270', 'Gambie': '270',
  'Uganda': '800', 'Ouganda': '800',
  'Burundi': '108', 'Malawi': '454',
  'Botswana': '072', 'Namibia': '516', 'Namibie': '516',
  'Somalia': '706', 'Somalie': '706',
  'Djibouti': '262',
  'Spain': '724', 'Espagne': '724',
  'Italy': '380', 'Italie': '380',
  'Portugal': '620', 'Netherlands': '528', 'Pays-Bas': '528',
  'China': '156', 'Chine': '156',
  'Japan': '392', 'Japon': '392',
  'India': '356', 'Inde': '356',
  'Brazil': '076', 'Brésil': '076',
  'Mexico': '484', 'Mexique': '484',
  'Australia': '036', 'Australie': '036',
};

function getCountryFlag(countryName: string): string {
  const flags: Record<string, string> = {
    'Ivory Coast': '🇨🇮', 'Côte d\'Ivoire': '🇨🇮',
    'Senegal': '🇸🇳', 'Sénégal': '🇸🇳',
    'Mali': '🇲🇱', 'Burkina Faso': '🇧🇫',
    'Guinea': '🇬🇳', 'Guinée': '🇬🇳',
    'Togo': '🇹🇬', 'Benin': '🇧🇯', 'Bénin': '🇧🇯',
    'Niger': '🇳🇪', 'Cameroon': '🇨🇲', 'Cameroun': '🇨🇲',
    'Congo': '🇨🇬', 'Democratic Republic of the Congo': '🇨🇩',
    'Gabon': '🇬🇦', 'Madagascar': '🇲🇬',
    'Morocco': '🇲🇦', 'Maroc': '🇲🇦',
    'Tunisia': '🇹🇳', 'Tunisie': '🇹🇳',
    'Algeria': '🇩🇿', 'Algérie': '🇩🇿',
    'France': '🇫🇷', 'Belgium': '🇧🇪', 'Belgique': '🇧🇪',
    'Switzerland': '🇨🇭', 'Suisse': '🇨🇭',
    'Canada': '🇨🇦', 'United States': '🇺🇸', 'États-Unis': '🇺🇸',
    'United Kingdom': '🇬🇧', 'Royaume-Uni': '🇬🇧',
    'Germany': '🇩🇪', 'Allemagne': '🇩🇪',
    'Ghana': '🇬🇭', 'Nigeria': '🇳🇬', 'Kenya': '🇰🇪',
    'Ethiopia': '🇪🇹', 'Éthiopie': '🇪🇹',
    'Tanzania': '🇹🇿', 'Tanzanie': '🇹🇿',
    'Rwanda': '🇷🇼', 'Mauritius': '🇲🇺', 'Maurice': '🇲🇺',
    'Mozambique': '🇲🇿', 'Angola': '🇦🇴',
    'Zambia': '🇿🇲', 'Zambie': '🇿🇲',
    'Zimbabwe': '🇿🇼', 'South Africa': '🇿🇦', 'Afrique du Sud': '🇿🇦',
    'Chad': '🇹🇩', 'Tchad': '🇹🇩',
    'Sudan': '🇸🇩', 'Soudan': '🇸🇩',
    'Libya': '🇱🇾', 'Libye': '🇱🇾',
    'Egypt': '🇪🇬', 'Égypte': '🇪🇬',
    'Mauritania': '🇲🇷', 'Mauritanie': '🇲🇷',
    'Sierra Leone': '🇸🇱', 'Liberia': '🇱🇷',
    'Gambia': '🇬🇲', 'Gambie': '🇬🇲',
    'Uganda': '🇺🇬', 'Ouganda': '🇺🇬',
    'Burundi': '🇧🇮', 'Malawi': '🇲🇼',
    'Botswana': '🇧🇼', 'Namibia': '🇳🇦', 'Namibie': '🇳🇦',
    'Somalia': '🇸🇴', 'Somalie': '🇸🇴',
    'Djibouti': '🇩🇯',
    'Spain': '🇪🇸', 'Espagne': '🇪🇸',
    'Italy': '🇮🇹', 'Italie': '🇮🇹',
    'Portugal': '🇵🇹', 'Netherlands': '🇳🇱', 'Pays-Bas': '🇳🇱',
    'China': '🇨🇳', 'Chine': '🇨🇳',
    'Japan': '🇯🇵', 'Japon': '🇯🇵',
    'India': '🇮🇳', 'Inde': '🇮🇳',
    'Brazil': '🇧🇷', 'Brésil': '🇧🇷',
    'Mexico': '🇲🇽', 'Mexique': '🇲🇽',
    'Australia': '🇦🇺', 'Australie': '🇦🇺',
  };
  return flags[countryName] ?? '🌍';
}

interface WorldMapProps {
  countryData: [string, number][];
  totalDownloads: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  country: string;
  count: number;
  flag: string;
  pct: number;
}

export function WorldMap({ countryData, totalDownloads }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, country: '', count: 0, flag: '', pct: 0,
  });

  const isoCountMap: Record<string, number> = {};
  const maxCount = countryData.length > 0 ? countryData[0][1] : 1;

  countryData.forEach(([name, count]) => {
    const iso = COUNTRY_NAME_TO_ISO[name];
    if (iso) isoCountMap[iso] = count;
  });

  function getColor(iso: string): string {
    const count = isoCountMap[iso];
    if (!count) return '#e8e4dc';
    const intensity = count / maxCount;
    if (intensity >= 0.8) return '#b45309';
    if (intensity >= 0.5) return '#d97706';
    if (intensity >= 0.25) return '#f59e0b';
    return '#fcd34d';
  }

  function getRadius(iso: string): number {
    const count = isoCountMap[iso];
    if (!count) return 5;
    const intensity = count / maxCount;
    return 5 + intensity * 10;
  }

  function handleMouseEnter(e: React.MouseEvent, iso: string) {
    const count = isoCountMap[iso] ?? 0;
    const matchedName = countryData.find(([n]) => COUNTRY_NAME_TO_ISO[n] === iso)?.[0]
      ?? COUNTRY_POSITIONS[iso]?.label
      ?? iso;
    const pct = totalDownloads > 0 ? Math.round((count / totalDownloads) * 100) : 0;
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      country: matchedName,
      count,
      flag: getCountryFlag(matchedName),
      pct,
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  }

  function handleMouseLeave() {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }

  const allIsos = Object.keys(COUNTRY_POSITIONS);

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      {/* Légende */}
      <div className="absolute bottom-2 left-2 z-10 bg-white/90 border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-xs text-gray-400 mb-1.5 font-medium">Intensité</p>
        <div className="flex items-center gap-1.5">
          {[
            { color: '#e8e4dc', label: '0' },
            { color: '#fcd34d', label: 'Faible' },
            { color: '#f59e0b', label: '' },
            { color: '#d97706', label: '' },
            { color: '#b45309', label: 'Élevé' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="w-5 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
              {item.label && (
                <span className="text-gray-400" style={{ fontSize: '9px' }}>{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Carte SVG */}
      <div className="w-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-blue-50 border border-gray-100">
        <svg
          viewBox="0 0 1000 500"
          className="w-full"
          style={{ height: 'auto', minHeight: '220px' }}
        >
          {/* Fond océan */}
          <rect width="1000" height="500" fill="#dbeafe" rx="12" />

          {/* Continents simplifiés en arrière-plan */}
          {/* Afrique */}
          <ellipse cx="500" cy="330" rx="90" ry="120" fill="#e5e7eb" opacity="0.5" />
          {/* Europe */}
          <ellipse cx="490" cy="175" rx="60" ry="35" fill="#e5e7eb" opacity="0.5" />
          {/* Amérique du Nord */}
          <ellipse cx="185" cy="210" rx="80" ry="60" fill="#e5e7eb" opacity="0.5" />
          {/* Amérique du Sud */}
          <ellipse cx="265" cy="370" rx="50" ry="70" fill="#e5e7eb" opacity="0.5" />
          {/* Asie */}
          <ellipse cx="720" cy="230" rx="130" ry="80" fill="#e5e7eb" opacity="0.5" />
          {/* Océanie */}
          <ellipse cx="800" cy="400" rx="55" ry="35" fill="#e5e7eb" opacity="0.5" />

          {/* Points pays */}
          {allIsos.map((iso) => {
            const pos = COUNTRY_POSITIONS[iso];
            if (!pos) return null;
            const isActive = !!isoCountMap[iso];
            const color = getColor(iso);
            const r = getRadius(iso);
            return (
              <g key={iso}>
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r + 4}
                    fill={color}
                    opacity={0.25}
                  />
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={color}
                  stroke={isActive ? '#92400e' : '#d1d5db'}
                  strokeWidth={isActive ? 1.5 : 0.5}
                  style={{ cursor: isActive ? 'pointer' : 'default' }}
                  onMouseEnter={(e) => handleMouseEnter(e, iso)}
                  onMouseLeave={handleMouseLeave}
                />
                {isActive && (
                  <text
                    x={pos.x}
                    y={pos.y - r - 4}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#92400e"
                    fontWeight="600"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {isoCountMap[iso]}
                  </text>
                )}
              </g>
            );
          })}

          {/* Labels continents */}
          <text x="500" y="460" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">AFRIQUE</text>
          <text x="185" y="155" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">AMÉRIQUE DU NORD</text>
          <text x="265" y="450" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">AMÉRIQUE DU SUD</text>
          <text x="490" y="145" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">EUROPE</text>
          <text x="720" y="145" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">ASIE</text>
          <text x="800" y="445" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">OCÉANIE</text>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-[99999] pointer-events-none bg-white border border-gray-200 rounded-xl shadow-xl px-3 py-2.5 min-w-[140px]"
          style={{ left: tooltip.x + 14, top: tooltip.y - 60 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{tooltip.flag}</span>
            <span className="text-xs font-semibold text-gray-800 leading-tight">{tooltip.country}</span>
          </div>
          {tooltip.count > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600">{tooltip.count}</span>
              <span className="text-xs text-gray-400">téléchargement{tooltip.count > 1 ? 's' : ''}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-500">{tooltip.pct}%</span>
            </div>
          ) : (
            <p className="text-xs text-gray-400">Aucun téléchargement</p>
          )}
        </div>
      )}
    </div>
  );
}
