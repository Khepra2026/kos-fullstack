import { useState } from 'react';
import { Link } from 'react-router-dom';

interface BCEAOAlertBannerProps {
  alwaysVisible?: boolean;
}

export default function BCEAOAlertBanner({ alwaysVisible = false }: BCEAOAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && !alwaysVisible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-b-2 border-amber-300">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, oklch(var(--foreground-950)) 10px, oklch(var(--foreground-950)) 12px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
          {/* Icon + Hook */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
              <i className="ri-alert-fill text-xl"></i>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white animate-pulse">
                  URGENT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-800">
                  BCEAO — Juillet 2026
                </span>
                <span className="text-[10px] text-foreground-400 font-body">
                  Il y a quelques instants
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-foreground-950 font-heading leading-tight">
                BCEAO a publié <span className="text-red-600">3 nouvelles instructions</span> ce mois. Êtes-vous concerné ?
              </h3>
              <p className="text-sm text-foreground-600 mt-1.5 font-body leading-relaxed">
                KOS a détecté <strong className="text-foreground-950">12 obligations nouvelles</strong> — dont <strong className="text-red-600">3 avec deadline &lt; 30 jours</strong>.
                Ne prenez pas de risque : testez votre score de conformité en 5 minutes.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/kos-regulatory-chat"
              className="group whitespace-nowrap px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all cursor-pointer shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center gap-2"
            >
              <i className="ri-scales-3-line"></i>
              Tester mon score
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link
              to="/kos-regulatory-chat"
              className="whitespace-nowrap px-4 py-2.5 rounded-xl border-2 border-amber-300 hover:border-amber-400 bg-white text-amber-700 text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <i className="ri-file-search-line"></i>
              Voir les 12 obligations
            </Link>
            {!alwaysVisible && (
              <button
                onClick={() => setDismissed(true)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Fermer l'alerte"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Obligation count pills */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-body">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-foreground-600"><strong className="text-foreground-950">3</strong> deadline &lt; 30 jours</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-body">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-foreground-600"><strong className="text-foreground-950">5</strong> deadline 30-60 jours</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-body">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-foreground-600"><strong className="text-foreground-950">4</strong> deadline &gt; 60 jours</span>
          </div>
          <span className="text-[10px] text-foreground-400 font-body">
            Détection automatique KOS Regulatory Intelligence • Mise à jour en temps réel
          </span>
        </div>
      </div>
    </div>
  );
}





