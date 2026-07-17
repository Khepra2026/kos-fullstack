import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MESSAGES = [
  {
    icon: 'ri-file-chart-line',
    badge: 'ANALYSES',
    text: '12 analyses stratégiques disponibles',
    sub: ' — Diagnostics, simulateurs, checklists · Mis à disposition des institutions',
    cta: 'Consulter',
    href: '/kos-ultra-lead-magnets/',
    badgeColor: '#c4a235',
    bg: 'linear-gradient(90deg, #fdf9f0 0%, #faf3e0 50%, #fdf8ec 100%)',
    textColor: '#3a2a08',
    subColor: '#7a6a3a',
    ctaColor: '#86BC25',
    borderBottom: 'rgba(196,162,53,0.25)',
  },
  {
    icon: 'ri-radar-line',
    badge: 'INSTITUTIONNEL',
    text: 'KOS — 4 Business Units — Standards Internationaux',
    sub: ' — Régulation Financière · Gouvernance · Climat ESG · KBR-Model · Tout sur devis',
    cta: 'Découvrir',
    href: '/',
    badgeColor: '#86BC25',
    bg: 'linear-gradient(90deg, #f0fdf4 0%, #fafdf5 50%, #f5fdf8 100%)',
    textColor: '#1a3a08',
    subColor: '#4a7a14',
    ctaColor: '#c4a235',
    borderBottom: 'rgba(134,188,37,0.25)',
  },
];

export default function TopBanner() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const msg = MESSAGES[msgIdx];

  return (
    <div data-banner="top" className="relative py-2.5 px-4 z-[60] w-full overflow-hidden border-b" style={{ background: msg.bg, borderColor: msg.borderBottom }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-sm font-medium min-w-0">
          <i className={`${msg.icon} text-lg hidden sm:inline-block flex-shrink-0`} style={{ color: msg.ctaColor }} aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0" style={{ background: msg.badgeColor, color: '#0a0a0a' }}>{msg.badge}</span>
            <span className="font-semibold whitespace-nowrap" style={{ color: msg.textColor }}>{msg.text}</span>
            <span className="hidden md:inline text-xs" style={{ color: msg.subColor }}>{msg.sub}</span>
            <button
              onClick={() => navigate(msg.href)}
              className="font-bold underline hover:no-underline whitespace-nowrap cursor-pointer flex-shrink-0 text-xs md:text-sm"
              style={{ color: msg.ctaColor }}
            >
              {msg.cta} →
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex gap-1">
            {MESSAGES.map((_, i) => (
              <button key={i} onClick={() => setMsgIdx(i)} className="w-1.5 h-1.5 rounded-full cursor-pointer transition-all" style={{ background: i === msgIdx ? msg.ctaColor : msg.textColor, opacity: i === msgIdx ? 1 : 0.3, transform: i === msgIdx ? 'scale(1.25)' : 'scale(1)' }} />
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
            aria-label="Fermer le bandeau"
          >
            <i className="ri-close-line text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-pulse" aria-hidden="true" style={{ pointerEvents: 'none' }} />
    </div>
  );
}