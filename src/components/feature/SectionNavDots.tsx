import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SectionDot {
  id: string;
  label: string;
  labelEn: string;
}

const HOME_SECTIONS: SectionDot[] = [
  { id: 'hero',         label: 'Accueil',         labelEn: 'Home' },
  { id: 'stats',        label: 'Chiffres clés',   labelEn: 'Key Figures' },
  { id: 'about',        label: 'À propos',         labelEn: 'About' },
  { id: 'expertise',    label: 'Expertises',       labelEn: 'Expertise' },
  { id: 'approach',     label: 'Approche',         labelEn: 'Approach' },
  { id: 'case-studies', label: 'Études de cas',    labelEn: 'Case Studies' },
  { id: 'testimonials', label: 'Témoignages',      labelEn: 'Testimonials' },
  { id: 'blog',         label: 'Blog',             labelEn: 'Blog' },
  { id: 'diagnostic',   label: 'Diagnostic',       labelEn: 'Diagnostic' },
  { id: 'contact',      label: 'Contact',          labelEn: 'Contact' },
];

export default function SectionNavDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const getNavOffset = useCallback(() => {
    let offset = 80;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) offset += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) offset += regAlert.offsetHeight;
    return offset + 40;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 300);

      const offset = getNavOffset();
      let current = HOME_SECTIONS[0].id;

      for (const section of HOME_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset + 60) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getNavOffset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = getNavOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // N'afficher que sur la page d'accueil (sections présentes)
  const sectionsPresent = HOME_SECTIONS.filter(s => document.getElementById(s.id));
  if (sectionsPresent.length < 3) return null;

  return (
    <nav
      aria-label={isEn ? 'Section navigation' : 'Navigation par sections'}
      className={`fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 items-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'
      }`}
    >
      {HOME_SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const label = isEn ? section.labelEn : section.label;
        return (
          <div key={section.id} className="relative">
            <button
              onClick={() => scrollTo(section.id)}
              aria-label={`${isEn ? 'Go to section' : 'Aller à la section'} ${label}`}
              className="block transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full cursor-pointer"
              style={{
                width: isActive ? '10px' : '7px',
                height: isActive ? '10px' : '7px',
                borderRadius: '9999px',
                background: isActive
                  ? 'linear-gradient(135deg, #86BC25, #f4d03f)'
                  : 'rgba(255,255,255,0.35)',
                boxShadow: isActive
                  ? '0 0 0 3px rgba(212,168,42,0.25), 0 0 8px rgba(212,168,42,0.4)'
                  : '0 0 0 2px rgba(255,255,255,0.15)',
                display: 'block',
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
