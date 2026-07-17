import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  label: string;
}

interface SectionNavigatorProps {
  sections: Section[];
  className?: string;
}

export function SectionNavigator({ sections, className = '' }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le navigateur après 300px de scroll
      setIsVisible(window.scrollY > 300);

      // Détecter la section active
      const scrollPosition = window.scrollY + 150; // Offset pour la navigation

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible || sections.length === 0) return null;

  return (
    <nav
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block ${className}`}
      aria-label={i18n.language === 'fr' ? 'Navigation des sections' : 'Section navigation'}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 py-3 px-2">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`group relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSection === section.id
                    ? 'bg-gold-500 scale-125'
                    : 'bg-gray-300 hover:bg-gold-400 hover:scale-110'
                }`}
                aria-label={`${i18n.language === 'fr' ? 'Aller à' : 'Go to'} ${section.label}`}
                title={section.label}
              >
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {section.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}