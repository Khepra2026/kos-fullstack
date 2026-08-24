import { useTranslation } from 'react-i18next';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

export function ServicesHero() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const { handleDownload, isDownloading } = useBrochureDownload('other');



  /** Calcule l'offset dynamique : banners + nav principale */
  const getDynamicOffset = (): number => {
    let total = 0;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) total += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) total += regAlert.offsetHeight;
    const mainNav = document.querySelector<HTMLElement>('nav.fixed');
    if (mainNav) total += mainNav.offsetHeight;
    return total + 24; // 24px de marge de confort
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-services');
    if (!contactSection) return;
    const offset = getDynamicOffset();
    const elementTop = contactSection.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedHeroImage
          imageKey="services-hero-bg"
          className="w-full h-full"
          aspectRatio="7/3"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
        {/* Fil d'Ariane centré */}
        <div className="flex justify-center mb-6">
          <Breadcrumb
            variant="light"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Services' : 'Services' },
            ]}
          />
        </div>

        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-primary-400/50 backdrop-blur-sm bg-white/10">
          <span className="text-sm font-medium text-primary-300">
            {isEn ? 'Strategic Expertise' : 'Expertise Stratégique'}
          </span>
        </div>

        <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
          {isEn 
            ? 'Transform Your Strategic Challenges into Growth Opportunities'
            : 'Transformez vos défis stratégiques en opportunités de croissance'}
        </h1>

        <p className="text-xl text-foreground-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          {isEn
            ? 'Governance, risk management, financial inclusion and strategic advisory to accelerate your performance and secure your growth in Africa.'
            : 'Gouvernance, gestion des risques, inclusion financière et conseil stratégique pour accélérer votre performance et sécuriser votre croissance en Afrique.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-bold shadow-xl hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
          >
            {isEn ? 'Book a Strategic Diagnostic' : 'Réserver un diagnostic stratégique'}
            <i className="ri-calendar-check-line text-xl"></i>
          </button>

          <a
            href="#brochure"
            onClick={(e) => { e.preventDefault(); handleDownload(isEn ? 'en' : undefined); }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer no-underline"
          >
            {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-download-line"></i>}
            {isEn ? 'Download Brochure' : 'Télécharger la brochure'}
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground-300">
          <div className="flex items-center gap-2">
            <i className="ri-shield-check-line text-lg text-primary-400"></i>
            <span>{isEn ? '22+ years of expertise' : '22+ ans d\'expertise'}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-building-line text-lg text-primary-400"></i>
            <span>{isEn ? '50+ strategic missions' : '50+ missions stratégiques'}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-global-line text-lg text-primary-400"></i>
            <span>{isEn ? '20+ countries' : '20+ pays'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}



