import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Country {
  id: string;
  name: string;
  nameEn: string;
  missions: number;
  presence: 'primary' | 'secondary' | 'covered';
  coordinates: { x: number; y: number };
}

export function AfricaMapInteractive() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const countries: Country[] = [
    { id: 'togo', name: 'Togo', nameEn: 'Togo', missions: 25, presence: 'primary', coordinates: { x: 48.5, y: 58 } },
    { id: 'gabon', name: 'Gabon', nameEn: 'Gabon', missions: 15, presence: 'primary', coordinates: { x: 53, y: 68 } },
    { id: 'benin', name: 'Bénin', nameEn: 'Benin', missions: 8, presence: 'secondary', coordinates: { x: 50.5, y: 58 } },
    { id: 'senegal', name: 'Sénégal', nameEn: 'Senegal', missions: 6, presence: 'covered', coordinates: { x: 35, y: 52 } },
    { id: 'cote-ivoire', name: 'Côte d\'Ivoire', nameEn: 'Ivory Coast', missions: 7, presence: 'covered', coordinates: { x: 43, y: 58 } },
    { id: 'burkina', name: 'Burkina Faso', nameEn: 'Burkina Faso', missions: 5, presence: 'covered', coordinates: { x: 45, y: 54 } },
    { id: 'mali', name: 'Mali', nameEn: 'Mali', missions: 4, presence: 'covered', coordinates: { x: 42, y: 48 } },
    { id: 'niger', name: 'Niger', nameEn: 'Niger', missions: 3, presence: 'covered', coordinates: { x: 52, y: 50 } },
    { id: 'ghana', name: 'Ghana', nameEn: 'Ghana', missions: 6, presence: 'covered', coordinates: { x: 46.5, y: 59 } },
    { id: 'nigeria', name: 'Nigeria', nameEn: 'Nigeria', missions: 5, presence: 'covered', coordinates: { x: 54, y: 58 } },
    { id: 'cameroun', name: 'Cameroun', nameEn: 'Cameroon', missions: 4, presence: 'covered', coordinates: { x: 56, y: 62 } },
    { id: 'congo', name: 'Congo', nameEn: 'Congo', missions: 3, presence: 'covered', coordinates: { x: 56, y: 68 } },
    { id: 'rdc', name: 'RD Congo', nameEn: 'DR Congo', missions: 3, presence: 'covered', coordinates: { x: 62, y: 68 } },
  ];

  const getPresenceColor = (presence: string) => {
    switch (presence) {
      case 'primary':
        return 'fill-gold-500 hover:fill-gold-600';
      case 'secondary':
        return 'fill-brand-400 hover:fill-brand-500';
      case 'covered':
        return 'fill-teal-300 hover:fill-teal-400';
      default:
        return 'fill-gray-200';
    }
  };

  const getPresenceLabel = (presence: string) => {
    switch (presence) {
      case 'primary':
        return isEn ? 'Primary Office' : 'Bureau principal';
      case 'secondary':
        return isEn ? 'Regular Presence' : 'Présence régulière';
      case 'covered':
        return isEn ? 'Covered Territory' : 'Territoire couvert';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full">
      {/* Carte SVG réaliste de l'Afrique */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxHeight: '600px' }}
      >
        {/* Fond de la carte */}
        <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
        
        {/* Contour réaliste de l'Afrique */}
        <path
          d="M 50 15 
             L 52 16 L 54 17 L 56 19 L 58 21 L 60 24 L 62 27 L 64 30 L 65 33 L 66 36 L 67 39 L 68 42 
             L 69 45 L 70 48 L 71 51 L 71.5 54 L 72 57 L 72 60 L 71.5 63 L 71 66 L 70 69 L 69 72 
             L 67 75 L 65 77 L 63 79 L 61 81 L 59 83 L 57 84.5 L 55 86 L 53 87 L 51 87.5 L 49 88 
             L 47 88 L 45 87.5 L 43 87 L 41 86 L 39 84.5 L 37 83 L 35 81 L 33 79 L 31 77 L 29 75 
             L 28 72 L 27 69 L 26.5 66 L 26 63 L 26 60 L 26 57 L 26.5 54 L 27 51 L 28 48 L 29 45 
             L 30 42 L 31 39 L 32 36 L 33 33 L 34 30 L 35 27 L 36 24 L 38 21 L 40 19 L 42 17 
             L 44 16 L 46 15 L 48 15 Z"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />

        {/* Points pour chaque pays */}
        {countries.map((country) => (
          <g key={country.id}>
            <circle
              cx={country.coordinates.x}
              cy={country.coordinates.y}
              r={country.presence === 'primary' ? '3' : country.presence === 'secondary' ? '2.5' : '2'}
              className={`${getPresenceColor(country.presence)} transition-all duration-300 cursor-pointer stroke-white`}
              strokeWidth="0.5"
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {country.presence === 'primary' && (
              <circle
                cx={country.coordinates.x}
                cy={country.coordinates.y}
                r="5"
                className="fill-none stroke-gold-400 animate-ping"
                strokeWidth="0.5"
                opacity="0.6"
              />
            )}
          </g>
        ))}

        {/* Lignes de connexion depuis Togo */}
        {countries
          .filter(c => c.id !== 'togo')
          .map((country) => {
            const togo = countries.find(c => c.id === 'togo')!;
            return (
              <line
                key={`line-${country.id}`}
                x1={togo.coordinates.x}
                y1={togo.coordinates.y}
                x2={country.coordinates.x}
                y2={country.coordinates.y}
                stroke="#fbbf24"
                strokeWidth="0.2"
                opacity="0.3"
                strokeDasharray="1,1"
              />
            );
          })}
      </svg>

      {/* Tooltip au survol */}
      {hoveredCountry && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 z-10 min-w-[200px] animate-fade-in">
          <div className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
              hoveredCountry.presence === 'primary' ? 'bg-gold-500' :
              hoveredCountry.presence === 'secondary' ? 'bg-brand-400' :
              'bg-teal-300'
            }`} />
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                {isEn ? hoveredCountry.nameEn : hoveredCountry.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                {getPresenceLabel(hoveredCountry.presence)}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <i className="ri-briefcase-line text-brand-600" aria-hidden="true" />
                <span className="font-semibold text-gray-700">
                  {hoveredCountry.missions} {isEn ? 'missions' : 'missions'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold-500" />
          <span className="text-gray-600">{isEn ? 'Primary Office' : 'Bureau principal'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-400" />
          <span className="text-gray-600">{isEn ? 'Regular Presence' : 'Présence régulière'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-300" />
          <span className="text-gray-600">{isEn ? 'Covered Territory' : 'Territoire couvert'}</span>
        </div>
      </div>
    </div>
  );
}



