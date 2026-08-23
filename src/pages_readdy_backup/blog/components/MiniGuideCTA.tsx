import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface GuideInfo {
  slug: string;
  fr: { title: string; subtitle: string; benefit: string; cta: string; badge: string };
  en: { title: string; subtitle: string; benefit: string; cta: string; badge: string };
}

const GUIDES: Record<string, GuideInfo> = {
  'due-diligence': {
    slug: '/guide-due-diligence-afrique',
    fr: {
      title: 'Guide Due Diligence Afrique',
      subtitle: '48 pages — le cadre complet pour structurer votre due diligence en zone UEMOA et CEMAC',
      benefit: 'Évitez un ajustement de prix de 15-30% post-closing',
      cta: 'Télécharger le guide',
      badge: 'Guide Gratuit · 48p',
    },
    en: {
      title: 'Africa Due Diligence Guide',
      subtitle: '48 pages — the complete framework for structuring your due diligence in UEMOA and CEMAC',
      benefit: 'Avoid a 15-30% post-closing price adjustment',
      cta: 'Download the guide',
      badge: 'Free Guide · 48p',
    },
  },
  'gouvernance-imf': {
    slug: '/guide-gouvernance-imf',
    fr: {
      title: 'Guide Gouvernance IMF',
      subtitle: '44 pages — conformité BCEAO, COBAC, et standards internationaux pour SFD et EMF',
      benefit: 'Réduisez les risques de retrait d\'agrément de 70%',
      cta: 'Télécharger le guide',
      badge: 'Guide Gratuit · 44p',
    },
    en: {
      title: 'IMF Governance Guide',
      subtitle: '44 pages — BCEAO, COBAC compliance and international standards for SFD and EMF',
      benefit: 'Reduce license withdrawal risks by 70%',
      cta: 'Download the guide',
      badge: 'Free Guide · 44p',
    },
  },
  'esg': {
    slug: '/guide-esg-afrique',
    fr: {
      title: 'Guide ESG Afrique',
      subtitle: '52 pages — cadre ESG opérationnel, reporting IFC, et accès aux financements internationaux',
      benefit: 'Débloquez l\'accès aux financements DFI et impact',
      cta: 'Télécharger le guide',
      badge: 'Guide Gratuit · 52p',
    },
    en: {
      title: 'Africa ESG Guide',
      subtitle: '52 pages — operational ESG framework, IFC reporting, and access to international financing',
      benefit: 'Unlock access to DFI and impact financing',
      cta: 'Download the guide',
      badge: 'Free Guide · 52p',
    },
  },
  'investment-readiness': {
    slug: '/guide-investment-readiness',
    fr: {
      title: 'Guide Investment Readiness',
      subtitle: '56 pages — du diagnostic à la closing, les 5 étapes pour lever des fonds en Afrique',
      benefit: 'Passez de 15% à 65% de taux de succès en levée de fonds',
      cta: 'Télécharger le guide',
      badge: 'Guide Gratuit · 56p',
    },
    en: {
      title: 'Investment Readiness Guide',
      subtitle: '56 pages — from diagnosis to closing, the 5 steps to raise funds in Africa',
      benefit: 'Go from 15% to 65% fundraising success rate',
      cta: 'Download the guide',
      badge: 'Free Guide · 56p',
    },
  },
};

interface MiniGuideCTAProps {
  guide: 'due-diligence' | 'gouvernance-imf' | 'esg' | 'investment-readiness';
  variant?: 'inline' | 'sidebar';
}

export function MiniGuideCTA({ guide, variant = 'inline' }: MiniGuideCTAProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const g = GUIDES[guide];
  const d = isEn ? g.en : g.fr;

  if (variant === 'sidebar') {
    return (
      <div
        className="rounded-2xl p-5 border-2 cursor-pointer hover:shadow-md transition-all"
        style={{ borderColor: 'rgba(201,162,39,0.3)', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}
        onClick={() => navigate(g.slug)}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold"
            style={{ background: 'rgba(201,162,39,0.15)', color: '#86BC25' }}
          >
            <i className="ri-vip-crown-line text-xs"></i>
            {d.badge}
          </span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-3" style={{ background: 'rgba(201,162,39,0.15)' }}>
          <i className="ri-book-open-line text-xl" style={{ color: '#86BC25' }}></i>
        </div>
        <h4 className="font-playfair font-bold text-base text-gray-900 mb-1 leading-snug">{d.title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">{d.subtitle}</p>
        <div className="flex items-start gap-2 mb-3">
          <i className="ri-check-double-line text-emerald-600 text-sm flex-shrink-0 mt-0.5"></i>
          <p className="text-xs text-gray-700 font-medium">{d.benefit}</p>
        </div>
        <button
          onClick={() => navigate(g.slug)}
          className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)', color: '#0a0a0a' }}
        >
          {d.cta}
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    );
  }

  return (
    <div
      className="my-8 rounded-2xl border-2 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
      style={{ borderColor: 'rgba(201,162,39,0.25)', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}
      onClick={() => navigate(g.slug)}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.25)' }}
        >
          <i className="ri-book-open-line text-xl" style={{ color: '#86BC25' }}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold"
              style={{ background: 'rgba(201,162,39,0.15)', color: '#86BC25' }}
            >
              <i className="ri-vip-crown-line text-xs"></i>
              {d.badge}
            </span>
          </div>
          <h4 className="font-playfair font-bold text-base text-gray-900 leading-snug mb-1">{d.title}</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{d.subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <i className="ri-check-double-line text-emerald-600 text-sm"></i>
            <p className="text-xs text-gray-700 font-medium">{d.benefit}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(g.slug)}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)', color: '#0a0a0a' }}
        >
          {d.cta}
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}



