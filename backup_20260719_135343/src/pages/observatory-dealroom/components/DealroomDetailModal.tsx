import { useEffect, useRef } from 'react';
import { DealroomPME } from '@/types/dealroom.types';

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

const PAYS_OPTIONS: Record<string, string> = {
  TG: 'Togo', SN: 'Sénégal', CI: 'Côte d\'Ivoire', CM: 'Cameroun',
  BJ: 'Bénin', BF: 'Burkina Faso', ML: 'Mali', NE: 'Niger',
};

export default function DealroomDetailModal({ pme, onClose }: { pme: DealroomPME; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const scoreCards = [
    { label: 'Global', score: pme.score_global, icon: 'ri-pie-chart-line' },
    { label: 'Gouvernance', score: pme.score_gouvernance, icon: 'ri-government-line' },
    { label: 'Financement', score: pme.score_financement, icon: 'ri-funds-line' },
    { label: 'Fiscalité', score: pme.score_fiscal, icon: 'ri-bank-line' },
    { label: 'Social', score: pme.score_social, icon: 'ri-team-line' },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-background-200 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-100 text-accent-700 font-bold text-lg border border-accent-200">
              {pme.nom_entreprise.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground-950">{pme.nom_entreprise}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-foreground-500">{PAYS_OPTIONS[pme.pays] || pme.pays}</span>
                <span className="text-xs text-foreground-300">·</span>
                <span className="text-xs text-foreground-500">{pme.secteur}</span>
                <span className="text-xs text-foreground-300">·</span>
                <span className="text-xs text-foreground-500">Créée {pme.annee_creation}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-background-200 text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-foreground-600 leading-relaxed">{pme.description}</p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background-50 rounded-xl p-3 text-center border border-background-200">
              <p className="text-xs text-foreground-500 mb-1">CA 2025</p>
              <p className="text-sm font-bold text-foreground-900">{pme.ca_2025}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-3 text-center border border-background-200">
              <p className="text-xs text-foreground-500 mb-1">Effectif</p>
              <p className="text-sm font-bold text-foreground-900">{pme.effectif}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-3 text-center border border-background-200">
              <p className="text-xs text-foreground-500 mb-1">Forme juridique</p>
              <p className="text-sm font-bold text-foreground-900">{pme.forme_juridique}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-3 text-center border border-background-200">
              <p className="text-xs text-foreground-500 mb-1">Stade levée</p>
              <p className="text-sm font-bold text-foreground-900">{pme.stade_levee}</p>
            </div>
          </div>

          {/* Scores */}
          <div>
            <h4 className="text-sm font-bold text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-bar-chart-line text-primary-500" />
              Scores Khepra
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {scoreCards.map(sc => (
                <div
                  key={sc.label}
                  className="bg-background-50 rounded-xl p-3 text-center border border-background-200"
                >
                  <div className="flex justify-center mb-1.5">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <circle
                          cx="18" cy="18" r="14" fill="none"
                          stroke={sc.score >= 80 ? '#10b981' : sc.score >= 60 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="4"
                          strokeDasharray={`${(sc.score / 100) * 88} 88`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground-900">
                        {sc.score}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground-500">{sc.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Montant recherché & stade */}
          <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-xl border border-accent-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600">
              <i className="ri-coins-line text-lg" />
            </div>
            <div>
              <p className="text-xs text-accent-600 font-medium">Montant recherché</p>
              <p className="text-base font-bold text-accent-800">{pme.montant_recherche}</p>
            </div>
          </div>

          {/* Certifications */}
          {pme.certification_khepra_dd && (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <i className="ri-shield-check-line text-lg" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800">KHEPRA DD Certified</p>
                <p className="text-xs text-emerald-600">Cette PME a complété la due diligence KHEPRA — Dossier investisseur certifié</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-background-200">
            <a
              href={`mailto:${pme.contact_email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-500 text-white font-bold text-sm cursor-pointer hover:bg-primary-600 transition-colors"
            >
              <i className="ri-mail-line text-base" />
              Contacter
            </a>
            {pme.pitch_deck_url && (
              <a
                href={pme.pitch_deck_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-background-300 bg-white text-foreground-700 font-bold text-sm cursor-pointer hover:bg-background-100 transition-colors"
              >
                <i className="ri-file-text-line text-base" />
                Pitch Deck
              </a>
            )}
            <span className="flex items-center gap-1.5 px-5 py-3 text-xs text-foreground-400 ml-auto">
              <i className="ri-calendar-line" />
              Mis à jour le {pme.date_maj}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



