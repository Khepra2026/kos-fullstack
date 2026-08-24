import { useState } from 'react';

interface Enjeu {
  enjeu: string;
  categorie: string;
  impact_financier: number;
  impact_durabilite: number;
  quadrant: string;
  description: string;
}

interface ESGMaterialityMatrixProps {
  enjeux: Enjeu[];
}

const quadrantConfig: Record<string, { label: string; bg: string; border: string; text: string; desc: string }> = {
  Prioritaire: {
    label: 'Prioritaire',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    desc: 'Impact financier & durabilité élevés — actions immédiates requises',
  },
  Financier: {
    label: 'Financier',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    desc: 'Impact financier dominant — priorité stratégique',
  },
  Durabilite: {
    label: 'Durabilité',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    desc: 'Impact durabilité dominant — engagement RSE',
  },
  Veille: {
    label: 'Veille',
    bg: 'bg-background-100',
    border: 'border-background-200',
    text: 'text-foreground-600',
    desc: 'Impact modéré — monitorer et intégrer dans la stratégie',
  },
};

const categorieColors: Record<string, string> = {
  environnement: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  social: 'bg-primary-100 text-primary-800 border-primary-200',
  gouvernance: 'bg-secondary-100 text-secondary-800 border-secondary-200',
};

export default function ESGMaterialityMatrix({ enjeux }: ESGMaterialityMatrixProps) {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const byQuadrant = {
    Prioritaire: enjeux.filter((e) => e.quadrant === 'Prioritaire'),
    Financier: enjeux.filter((e) => e.quadrant === 'Financier'),
    Durabilite: enjeux.filter((e) => e.quadrant === 'Durabilite'),
    Veille: enjeux.filter((e) => e.quadrant === 'Veille'),
  };

  const maxF = 5;
  const maxD = 5;

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground-950 font-heading">
            Matrice Double Matérialité ISSB S1/S2
          </h3>
          <p className="text-xs text-foreground-500 font-body mt-0.5">
            Impact financier × Impact durabilité — 4 quadrants stratégiques
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-500 font-body">
          <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200"></span> E
          <span className="w-3 h-3 rounded-full bg-primary-100 border border-primary-200"></span> S
          <span className="w-3 h-3 rounded-full bg-secondary-100 border border-secondary-200"></span> G
        </div>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {(['Prioritaire', 'Financier', 'Durabilite', 'Veille'] as const).map((q) => {
          const config = quadrantConfig[q];
          const items = byQuadrant[q];
          const isHovered = hoveredQuadrant === q;

          return (
            <div
              key={q}
              className={`rounded-lg border p-4 transition-all duration-200 cursor-pointer ${
                isHovered ? 'ring-2 ring-primary-300 scale-[1.01]' : ''
              } ${config.bg} ${config.border}`}
              onMouseEnter={() => setHoveredQuadrant(q)}
              onMouseLeave={() => setHoveredQuadrant(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold font-heading ${config.text}`}>{config.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 ${config.text}`}>
                  {items.length} enjeux
                </span>
              </div>
              <p className="text-[11px] text-foreground-500 font-body mb-3 leading-relaxed">{config.desc}</p>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.enjeu}
                    className="bg-white/70 rounded-md p-2.5 border border-background-200/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border ${
                              categorieColors[item.categorie] || 'bg-background-100 text-foreground-600 border-background-200'
                            }`}
                          >
                            {item.categorie}
                          </span>
                          <span className="text-xs font-semibold text-foreground-800 font-body truncate">
                            {item.enjeu}
                          </span>
                        </div>
                        <p className="text-[10px] text-foreground-500 font-body leading-snug">{item.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 shrink-0">
                        <span className="text-[10px] font-mono text-foreground-600 font-body">
                          F:{item.impact_financier} × D:{item.impact_durabilite}
                        </span>
                        <span className="text-xs font-bold text-foreground-800 font-body">
                          = {item.impact_financier + item.impact_durabilite}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scatter Plot */}
      <div className="border-t border-background-200/70 pt-5">
        <h4 className="text-sm font-bold text-foreground-800 font-heading mb-3">
          Visualisation Positionnement — Score Financier vs Durabilité
        </h4>
        <div className="relative h-[280px] bg-background-100 rounded-lg border border-background-200/70 overflow-hidden">
          {/* Quadrant backgrounds */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="bg-red-50/40 border-r border-b border-background-200/40"></div>
            <div className="bg-amber-50/40 border-b border-background-200/40"></div>
            <div className="bg-emerald-50/40 border-r border-background-200/40"></div>
            <div className="bg-background-50/60"></div>
          </div>

          {/* Labels */}
          <div className="absolute top-2 left-2 text-[10px] font-bold text-red-600 font-body">Prioritaire (F≥3, D≥3)</div>
          <div className="absolute top-2 right-2 text-[10px] font-bold text-amber-600 font-body">Financier (F≥3)</div>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold text-emerald-600 font-body">Durabilité (D≥3)</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-bold text-foreground-400 font-body">Veille</div>

          {/* Axes */}
          <div className="absolute left-8 right-4 top-1/2 h-px bg-foreground-300"></div>
          <div className="absolute left-8 top-4 bottom-4 w-px bg-foreground-300"></div>

          {/* Axis labels */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-foreground-500 font-body whitespace-nowrap">
            Impact Durabilité →
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-foreground-500 font-body whitespace-nowrap">
            Impact Financier →
          </div>

          {/* Dots */}
          {enjeux.map((item, idx) => {
            const x = 8 + ((item.impact_financier / maxF) * 85);
            const y = 96 - ((item.impact_durabilite / maxD) * 85);
            const size = Math.min(20 + (item.impact_financier + item.impact_durabilite) * 3, 44);
            const colorClass =
              item.quadrant === 'Prioritaire'
                ? 'bg-red-500'
                : item.quadrant === 'Financier'
                  ? 'bg-amber-500'
                  : item.quadrant === 'Durabilite'
                    ? 'bg-emerald-500'
                    : 'bg-foreground-400';

            return (
              <div
                key={item.enjeu}
                className={`absolute rounded-full ${colorClass} opacity-80 hover:opacity-100 hover:scale-125 transition-all duration-200 cursor-pointer group`}
                style={{
                  left: `${x}%`,
                  bottom: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, 50%)',
                }}
                title={`${item.enjeu} (F:${item.impact_financier}, D:${item.impact_durabilite})`}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-foreground-600 font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded border border-background-200">
                  {item.enjeu.slice(0, 20)}...
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



