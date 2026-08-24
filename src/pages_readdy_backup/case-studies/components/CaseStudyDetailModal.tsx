import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { CaseStudy } from '@/mocks/caseStudies';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export function CaseStudyDetailModal({ caseStudy, onClose }: CaseStudyDetailModalProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [caseStudy]);

  if (!caseStudy) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative rounded-2xl overflow-hidden border border-gray-100 gradient-border glow-gold-hover">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 animate-fade-in border border-gray-100 gradient-border glow-gold-hover">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
            aria-label={isEn ? 'Close' : 'Fermer'}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          {/* Header Image */}
          <div className="relative h-64 rounded-t-2xl overflow-hidden">
            <img
              src={caseStudy.image}
              alt={isEn ? caseStudy.clientEn : caseStudy.client}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                  {caseStudy.country} {caseStudy.flag}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                  {caseStudy.year}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30">
                  {caseStudy.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {isEn ? caseStudy.clientEn : caseStudy.client}
              </h2>
              <p className="text-white/90 text-sm sm:text-base">
                {isEn ? caseStudy.missionTypeEn : caseStudy.missionTypeFr}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10 max-h-[calc(100vh-20rem)] overflow-y-auto">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {caseStudy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gold-50 to-white rounded-xl p-4 border border-gold-200 text-center"
                >
                  <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className={`${metric.icon} text-xl text-gold-600`}></i>
                  </div>
                  <div className="text-2xl font-bold text-gold-600 mb-1">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Context */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="ri-file-text-line text-gold-600"></i>
                {isEn ? 'Context' : 'Contexte'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {isEn ? caseStudy.contextEn : caseStudy.contextFr}
              </p>
            </div>

            {/* Intervention */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="ri-tools-line text-gold-600"></i>
                {isEn ? 'Our Intervention' : 'Notre intervention'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {isEn ? caseStudy.interventionEn : caseStudy.interventionFr}
              </p>
            </div>

            {/* Transformation */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="ri-trophy-line text-gold-600"></i>
                {isEn ? 'Results & Transformation' : 'Résultats & Transformation'}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn ? caseStudy.transformationEn : caseStudy.transformationFr}
              </p>

              {/* Before/After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-close-circle-line text-red-600 text-xl"></i>
                    <h4 className="font-bold text-red-900">{isEn ? 'Before' : 'Avant'}</h4>
                  </div>
                  <p className="text-sm text-red-800">{isEn ? caseStudy.beforeEn : caseStudy.beforeFr}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                    <h4 className="font-bold text-green-900">{isEn ? 'After' : 'Après'}</h4>
                  </div>
                  <p className="text-sm text-green-800">{isEn ? caseStudy.afterEn : caseStudy.afterFr}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {isEn ? 'Expertise Areas' : 'Domaines d\'expertise'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(isEn ? caseStudy.tagsEn : caseStudy.tagsFr).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-xl p-6 border border-gold-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isEn ? 'Similar challenge?' : 'Défi similaire ?'}
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                {isEn
                  ? 'Contact us for a free strategic diagnostic and discover how we can support your organization.'
                  : 'Contactez-nous pour un diagnostic stratégique gratuit et découvrez comment nous pouvons accompagner votre organisation.'}
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full font-medium hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {isEn ? 'Request a Diagnostic' : 'Demander un diagnostic'}
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



