import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { CaseStudy } from '@/mocks/caseStudies';
import OptimizedImage from '@/components/base/OptimizedImage';

const BU_BADGE: Record<string, { fr: string; en: string; accent: string; bg: string }> = {
  regulation: { fr: 'Régulation Financière', en: 'Financial Regulation', accent: '#86BC25', bg: 'rgba(134,188,37,0.10)' },
  'prix-transfert': { fr: 'Prix de Transfert', en: 'Transfer Pricing', accent: '#D4AF37', bg: 'rgba(212,175,55,0.10)' },
  grc: { fr: 'Gouvernance & Risques', en: 'Governance & Risk', accent: '#6B9B1F', bg: 'rgba(107,155,31,0.10)' },
  multi: { fr: 'Multi-BU', en: 'Multi-BU', accent: '#525252', bg: 'rgba(82,82,82,0.08)' },
};

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick?: () => void;
}

export function CaseStudyCard({ caseStudy, onClick }: CaseStudyCardProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const bu = BU_BADGE[caseStudy.businessUnit] || BU_BADGE.multi;

  const handleClick = () => {
    if (caseStudy.fullPageUrl) {
      navigate(caseStudy.fullPageUrl);
      window.scrollTo(0, 0);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer border border-gray-100 hover:-translate-y-1"
      onClick={handleClick}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)';
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={caseStudy.image}
          alt={isEn ? caseStudy.clientEn : caseStudy.client}
          className="w-full h-full group-hover:scale-105 transition-transform duration-600"
          width={800}
          height={500}
          aspectRatio="16/10"
          objectFit="cover"
          loading="lazy"
          placeholder="shimmer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* BU Badge — top left */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm"
            style={{ background: bu.bg, color: bu.accent, border: `1px solid ${bu.accent}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: bu.accent }} />
            {isEn ? bu.en : bu.fr}
          </span>
        </div>

        {/* Country + Year — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-[11px] font-semibold">
            {caseStudy.country.split('/')[0].trim()} {caseStudy.flag}
          </span>
        </div>

        {/* Year — bottom */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-semibold">
            {caseStudy.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Client name */}
        <h3 className="text-base font-bold text-foreground-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors font-display tracking-tight">
          {isEn ? caseStudy.clientEn : caseStudy.client}
        </h3>

        {/* Mission type */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {isEn ? caseStudy.missionTypeEn : caseStudy.missionTypeFr}
        </p>

        {/* Metrics — 2 key numbers */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
            <div
              key={idx}
              className="rounded-lg p-2.5 text-center border border-gray-100"
              style={{ background: 'rgba(0,0,0,0.015)' }}
            >
              <div className="text-lg font-bold font-display tracking-tight" style={{ color: bu.accent, lineHeight: 1.1 }}>
                {metric.value}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(isEn ? caseStudy.tagsEn : caseStudy.tagsFr).slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer — Duration + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <i className="ri-time-line text-xs" />
            {caseStudy.duration}
          </span>
          <span
            className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
            style={{ color: bu.accent }}
          >
            {isEn ? 'Details' : 'Détails'}
            <i className="ri-arrow-right-line text-xs" />
          </span>
        </div>
      </div>
    </article>
  );
}