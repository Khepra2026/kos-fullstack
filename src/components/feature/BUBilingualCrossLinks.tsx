import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BU_HREFLANG_MAP } from '@/data/buHreflangMap';

const BU_EMOJIS: Record<string, string> = {
  bu1: 'ri-shield-check-line',
  bu2: 'ri-government-line',
  bu3: 'ri-leaf-line',
  bu4: 'ri-line-chart-line',
};

const BU_SHORT_FR: Record<string, string> = {
  bu1: 'Régulation Financière & Conformité',
  bu2: 'Gouvernance & Due Diligence',
  bu3: 'Climat, Transition & ESG',
  bu4: 'KBR-Model & Business Intelligence',
};

const BU_SHORT_EN: Record<string, string> = {
  bu1: 'Financial Regulation & Compliance',
  bu2: 'Governance & Due Diligence',
  bu3: 'Climate, Transition & ESG',
  bu4: 'KBR-Model & Business Intelligence',
};

interface BUBilingualCrossLinksProps {
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  variant?: 'cards' | 'compact';
  className?: string;
}

export default function BUBilingualCrossLinks({
  title = 'Nos 4 Business Units — Explorez en FR & EN',
  titleEn = 'Our 4 Business Units — Explore in FR & EN',
  subtitle = 'Découvrez chaque BU dans les deux langues pour une compréhension complète de notre offre.',
  subtitleEn = 'Discover each BU in both languages for a complete understanding of our offering.',
  variant = 'cards',
  className = '',
}: BUBilingualCrossLinksProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <div className="flex flex-wrap items-center gap-3">
          {BU_HREFLANG_MAP.map((bu) => (
            <div key={bu.buId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100 border border-background-200 text-xs">
              <i className={`${BU_EMOJIS[bu.buId]} text-accent-600`}></i>
              <a
                href={bu.pathFr}
                onClick={(e) => { e.preventDefault(); navigate(bu.pathFr); }}
                className="font-semibold text-foreground-900 hover:text-accent-600 transition-colors whitespace-nowrap"
              >
                FR
              </a>
              <span className="text-foreground-300">|</span>
              <a
                href={bu.pathEn}
                onClick={(e) => { e.preventDefault(); navigate(bu.pathEn); }}
                className="font-semibold text-foreground-700 hover:text-accent-600 transition-colors whitespace-nowrap"
              >
                EN
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 bg-background-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 border border-accent-200 mb-4">
            <i className="ri-global-line text-accent-600 text-sm"></i>
            <span className="text-xs font-bold text-accent-700 uppercase tracking-wider">
              {isEn ? 'Bilingual Navigation' : 'Navigation Bilingue'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
            {isEn ? titleEn : title}
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto text-sm">
            {isEn ? subtitleEn : subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BU_HREFLANG_MAP.map((bu) => (
            <div
              key={bu.buId}
              className="bg-background-50 rounded-2xl border border-background-200 p-5 hover:border-accent-300 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${BU_EMOJIS[bu.buId]} text-accent-600 text-lg`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground-950 truncate">
                    {isEn ? BU_SHORT_EN[bu.buId] : BU_SHORT_FR[bu.buId]}
                  </p>
                  <p className="text-[11px] text-foreground-400 uppercase tracking-wider">
                    {bu.buId.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-stretch gap-2">
                <a
                  href={bu.pathFr}
                  onClick={(e) => { e.preventDefault(); navigate(bu.pathFr); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-background-100 border border-background-200 text-sm font-semibold text-foreground-700 hover:bg-accent-50 hover:border-accent-300 hover:text-accent-700 transition-all whitespace-nowrap"
                >
                  <span className="text-[10px] font-bold bg-foreground-950 text-background-50 px-1.5 py-0.5 rounded">FR</span>
                  {isEn ? 'French' : 'Français'}
                  <i className="ri-arrow-right-up-line text-[10px] opacity-40 group-hover:opacity-100 transition-opacity"></i>
                </a>
                <a
                  href={bu.pathEn}
                  onClick={(e) => { e.preventDefault(); navigate(bu.pathEn); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-background-100 border border-background-200 text-sm font-semibold text-foreground-700 hover:bg-accent-50 hover:border-accent-300 hover:text-accent-700 transition-all whitespace-nowrap"
                >
                  <span className="text-[10px] font-bold bg-accent-500 text-background-50 px-1.5 py-0.5 rounded">EN</span>
                  {isEn ? 'English' : 'Anglais'}
                  <i className="ri-arrow-right-up-line text-[10px] opacity-40 group-hover:opacity-100 transition-opacity"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}