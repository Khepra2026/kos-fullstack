import { useState, useEffect } from 'react';

interface AboutNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'expertise', label: 'Expertises' },
  { id: 'esg', label: 'ESG & Éthique' },
  { id: 'founder', label: 'Fondateur' },
  { id: 'presence', label: 'Présence' },
  { id: 'partners', label: 'Partenaires' },
];

function AboutNavigationComponent({ activeSection, onNavigate }: AboutNavigationProps) {
  const [navTop, setNavTop] = useState(80);

  useEffect(() => {
    const update = () => {
      let h = 0;
      const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
      if (topBanner) h += topBanner.offsetHeight;
      const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
      if (regAlert) h += regAlert.offsetHeight;
      const mainNav = document.querySelector<HTMLElement>('nav.fixed');
      if (mainNav) h += mainNav.offsetHeight;
      setNavTop(h || 80);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <nav
      className="sticky z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      style={{ top: `${navTop}px` }}
      aria-label="Navigation de la page À propos"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeSection === s.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
              style={activeSection === s.id ? { background: '#0a0a0a' } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export { AboutNavigationComponent as default };
export function AboutNavigation(props: AboutNavigationProps) {
  return <AboutNavigationComponent {...props} />;
}




