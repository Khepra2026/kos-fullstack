import { useState, useEffect } from 'react';

interface BoardStickyBarProps {
  onCTAClick: () => void;
}

export default function BoardStickyBar({ onCTAClick }: BoardStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', borderTop: '1px solid rgba(212,168,42,0.3)', boxShadow: '0 -8px 32px rgba(0,0,0,0.3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"></div>
            <p className="text-sm font-semibold text-white">
              Générez votre Board Report gratuit — Conforme BCEAO/OHADA
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <i className="ri-calendar-check-line" style={{ color: '#86BC25' }}></i>
              Réserver un entretien
            </button>
            <button
              onClick={onCTAClick}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e' }}
            >
              <i className="ri-file-chart-line"></i>
              Créer mon rapport gratuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




