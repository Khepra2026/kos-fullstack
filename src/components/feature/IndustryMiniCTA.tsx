import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface GuideInfo {
  slug: string;
  icon: string;
  pages: string;
  downloads: string;
  fr: { title: string; subtitle: string; benefit: string; cta: string; badge: string; contextMessage: string; urgency: string };
  en: { title: string; subtitle: string; benefit: string; cta: string; badge: string; contextMessage: string; urgency: string };
}

const GUIDES: Record<string, GuideInfo> = {
  'due-diligence': {
    slug: '/guide-due-diligence-afrique',
    icon: 'ri-search-eye-line',
    pages: '48',
    downloads: '1 200+',
    fr: {
      title: 'Guide Due Diligence Afrique',
      subtitle: 'Le cadre complet pour structurer votre due diligence en zones UEMOA et CEMAC — checklist 127 points',
      benefit: 'Évitez un ajustement de prix de 15 à 30 % post-closing',
      cta: 'Télécharger gratuitement',
      badge: 'Guide gratuit · 48 pages',
      contextMessage: 'Vous préparez une acquisition ou un audit ?',
      urgency: 'Téléchargé par 1 200+ professionnels',
    },
    en: {
      title: 'Africa Due Diligence Guide',
      subtitle: 'The complete framework to structure your due diligence across UEMOA and CEMAC — 127-point checklist',
      benefit: 'Avoid a 15–30% post-closing price adjustment',
      cta: 'Download for free',
      badge: 'Free guide · 48 pages',
      contextMessage: 'Preparing an acquisition or audit?',
      urgency: 'Downloaded by 1,200+ professionals',
    },
  },
  'gouvernance-imf': {
    slug: '/guide-gouvernance-imf',
    icon: 'ri-shield-check-line',
    pages: '44',
    downloads: '900+',
    fr: {
      title: 'Guide Gouvernance IMF',
      subtitle: 'Conformité BCEAO et COBAC, ratios prudentiels et standards internationaux pour SFD et EMF — 44 pages',
      benefit: 'Réduisez les risques de retrait d\'agrément de 70 %',
      cta: 'Télécharger gratuitement',
      badge: 'Guide gratuit · 44 pages',
      contextMessage: 'Vous devez renforcer votre gouvernance ?',
      urgency: 'Téléchargé par 900+ dirigeants d\'IMF',
    },
    en: {
      title: 'MFI Governance Guide',
      subtitle: 'BCEAO and COBAC compliance, prudential ratios and international standards for MFIs and EMFs — 44 pages',
      benefit: 'Reduce license withdrawal risks by 70%',
      cta: 'Download for free',
      badge: 'Free guide · 44 pages',
      contextMessage: 'Need to strengthen your governance?',
      urgency: 'Downloaded by 900+ MFI executives',
    },
  },
  'esg': {
    slug: '/guide-esg-afrique',
    icon: 'ri-leaf-line',
    pages: '52',
    downloads: '750+',
    fr: {
      title: 'Guide ESG Afrique',
      subtitle: 'Cadre ESG opérationnel, reporting IFC PS 1-8, GRI et ISSB pour accéder aux financements DFI — 52 pages',
      benefit: 'Débloquez l\'accès aux financements DFI et impact',
      cta: 'Télécharger gratuitement',
      badge: 'Guide gratuit · 52 pages',
      contextMessage: 'Vous visez des financements internationaux ?',
      urgency: 'Utilisé par 750+ porteurs de projets',
    },
    en: {
      title: 'Africa ESG Guide',
      subtitle: 'Operational ESG framework, IFC PS 1-8, GRI and ISSB reporting to unlock DFI financing — 52 pages',
      benefit: 'Unlock access to DFI and impact financing',
      cta: 'Download for free',
      badge: 'Free guide · 52 pages',
      contextMessage: 'Targeting international financing?',
      urgency: 'Used by 750+ project developers',
    },
  },
  'investment-readiness': {
    slug: '/guide-investment-readiness',
    icon: 'ri-funds-line',
    pages: '56',
    downloads: '1 500+',
    fr: {
      title: 'Guide Investment Readiness',
      subtitle: 'Les 5 étapes pour passer du diagnostic au closing et lever des fonds en Afrique — 89 critères, pitch deck, data room',
      benefit: 'Passez de 15 % à 65 % de taux de succès en levée de fonds',
      cta: 'Télécharger gratuitement',
      badge: 'Guide gratuit · 56 pages',
      contextMessage: 'Vous préparez une levée de fonds ?',
      urgency: 'Téléchargé par 1 500+ entrepreneurs',
    },
    en: {
      title: 'Investment Readiness Guide',
      subtitle: 'The 5 steps from diagnosis to closing to raise funds in Africa — 89 criteria, pitch deck, data room',
      benefit: 'Go from 15% to 65% fundraising success rate',
      cta: 'Download for free',
      badge: 'Free guide · 56 pages',
      contextMessage: 'Preparing a fundraising round?',
      urgency: 'Downloaded by 1,500+ entrepreneurs',
    },
  },
};

interface IndustryMiniCTAProps {
  guide: 'due-diligence' | 'gouvernance-imf' | 'esg' | 'investment-readiness';
  className?: string;
  variant?: 'horizontal' | 'compact';
}

export function IndustryMiniCTA({ guide, className = '', variant = 'horizontal' }: IndustryMiniCTAProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const g = GUIDES[guide];
  const d = isEn ? g.en : g.fr;
  const [hovered, setHovered] = useState(false);

  if (variant === 'compact') {
    return (
      <div
        className={`rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${hovered ? 'shadow-lg' : ''} ${className}`}
        style={{ borderColor: 'rgba(201,162,39,0.3)', background: 'linear-gradient(135deg, #fffbeb 0%, #fef9ee 100%)' }}
        onClick={() => navigate(g.slug)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ background: 'rgba(201,162,39,0.15)' }}>
            <i className={`${g.icon} text-lg`} style={{ color: '#86BC25' }}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold" style={{ color: '#86BC25' }}>{d.badge}</span>
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">{d.title}</p>
            <p className="text-xs text-gray-500 truncate">{d.benefit}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(g.slug); }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all"
            style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)', color: '#0a0a0a' }}
          >
            {d.cta}
            <i className="ri-download-line text-xs"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${hovered ? 'shadow-xl' : 'shadow-md'} ${className}`}
      style={{
        border: '1.5px solid rgba(201,162,39,0.35)',
        background: 'linear-gradient(135deg, #fffdf0 0%, #fef8e0 50%, #fef3c7 100%)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onClick={() => navigate(g.slug)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top urgency strip */}
      <div className="flex items-center justify-between px-5 py-2"
        style={{ background: 'rgba(201,162,39,0.12)', borderBottom: '1px solid rgba(201,162,39,0.2)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-gray-600">{d.urgency}</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(201,162,39,0.2)', color: '#6B9B1F' }}>
          {d.badge}
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ background: 'rgba(201,162,39,0.15)', border: '1.5px solid rgba(201,162,39,0.25)' }}>
          <i className={`${g.icon} text-2xl`} style={{ color: '#86BC25' }}></i>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold mb-1" style={{ color: '#6B9B1F' }}>
            <i className="ri-arrow-right-line mr-1"></i>{d.contextMessage}
          </p>
          <h4 className="font-bold text-base text-gray-900 leading-snug mb-1">{d.title}</h4>
          <p className="text-xs text-gray-600 leading-relaxed mb-2">{d.subtitle}</p>
          <div className="flex items-center gap-2">
            <i className="ri-check-double-line text-emerald-600 text-sm flex-shrink-0"></i>
            <p className="text-xs font-semibold text-gray-800">{d.benefit}</p>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(g.slug); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)', color: '#0a0a0a' }}
          >
            <i className="ri-download-2-line"></i>
            {d.cta}
          </button>
          <span className="text-xs text-gray-500 text-center">
            {isEn ? 'No email required' : 'Sans e-mail requis'}
          </span>
        </div>
      </div>
    </div>
  );
}