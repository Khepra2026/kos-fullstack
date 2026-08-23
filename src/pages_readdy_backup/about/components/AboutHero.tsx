import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { officialStats } from '@/data/stats';
import { useHeroImage } from '@/hooks/useHeroImage';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

export function AboutHero() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const heroBg = useHeroImage('about-hero-bg');

  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedHeroImage
          imageKey="about-hero-bg"
          className="w-full h-full"
          aspectRatio="16/9"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(26,20,4,0.85) 50%, rgba(22,22,22,0.55) 100%)'}}></div>
        {/* Accent or */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)', transform: 'translate(20%, -20%)'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          <Breadcrumb
            variant="light"
            className="mb-6"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'About Us' : 'À propos' },
            ]}
          />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{background: 'rgba(201,162,39,0.18)', border: '1px solid rgba(201,162,39,0.45)'}}>
            <i className="ri-award-line text-sm" style={{color: '#a5d936'}}></i>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{color: '#a5d936'}}>
              {t('aboutHero.badge')}
            </span>
          </div>

          <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('aboutHero.title')}
          </h1>

          {/* Ligne décorative or */}
          <div className="w-20 h-1 rounded-full mb-6" style={{background: 'linear-gradient(90deg, #6B9B1F, #86BC25, #a5d936)'}}></div>

          <p className="text-xl leading-relaxed mb-10 max-w-2xl" style={{color: 'rgba(255,255,255,0.85)'}}>
            {t('aboutHero.description')}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/sfd-conformite')}
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full transition-all font-medium whitespace-nowrap cursor-pointer shadow-lg hover:scale-105 hover:-translate-y-0.5"
              style={{background: 'linear-gradient(135deg, #6B9B1F 0%, #6B9B1F 50%, #86BC25 100%)', boxShadow: '0 8px 24px rgba(201,162,39,0.35)'}}
            >
              {t('aboutHero.ctaDiagnostic')}
              <i className="ri-arrow-right-line"></i>
            </button>
            <a
              href="https://calendly.com/essochamanu"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-4 rounded-full hover:bg-gold-50 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:scale-105"
            >
              <i className="ri-calendar-check-line" style={{color: '#6B9B1F'}}></i>
              {t('aboutHero.ctaBooking')}
            </a>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 backdrop-blur-sm px-8 py-4 rounded-full transition-all font-medium whitespace-nowrap cursor-pointer hover:scale-105"
              style={{background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.35)', color: '#f2d98a'}}
            >
              {t('aboutHero.ctaExpert')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm" style={{background: 'rgba(26,20,4,0.75)', borderTop: '1px solid rgba(201,162,39,0.25)'}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{borderColor: 'rgba(201,162,39,0.15)'}}>
            {officialStats.map((stat, i) => (
              <div key={i} className="py-5 px-6 text-center" style={{borderColor: 'rgba(201,162,39,0.15)'}}>
                <div className="font-playfair text-3xl font-bold" style={{color: '#86BC25'}}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm mt-1 font-medium" style={{color: 'rgba(255,255,255,0.8)'}}>
                  {isEn ? stat.labelEn : stat.labelFr}
                </div>
                {stat.subLabelFr && (
                  <div className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.4)'}}>
                    {isEn ? stat.subLabelEn : stat.subLabelFr}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



