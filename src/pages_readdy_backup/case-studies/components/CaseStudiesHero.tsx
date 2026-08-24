import { useTranslation } from 'react-i18next';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

export function CaseStudiesHero() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section className="relative min-h-[480px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedHeroImage
          imageKey="case-studies-hero-bg"
          className="w-full h-full"
          aspectRatio="16/7"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-800/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Header unifié */}
          <div className="mb-4">
            <span
              className="section-label"
              style={{ background: 'rgba(212,168,42,0.15)', borderColor: 'rgba(212,168,42,0.4)', color: '#D4A82A' }}
            >
              <i className="ri-trophy-line mr-1.5"></i>
              {isEn ? 'Proven Impact' : 'Impact prouvé'}
            </span>
          </div>
          <h1 className="section-title mb-4" style={{ color: '#fff' }}>
            {isEn ? (
              <><span className="accent">Case Studies</span></>
            ) : (
              <><span className="accent">Études de cas</span></>
            )}
          </h1>
          <div className="section-divider my-5" style={{ justifyContent: 'flex-start' }}>
            <span className="section-divider-dot"></span>
          </div>
          <p className="section-subtitle max-w-2xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {isEn
              ? 'Concrete, data-driven interventions across our 3 Business Units: Financial Regulation (BCEAO/COBAC), Transfer Pricing (BEPS), and Governance & Risk (ERM, internal audit). 22 years, 15+ countries.'
              : 'Des interventions concrètes et chiffrées à travers nos 3 Business Units : Régulation Financière (BCEAO/COBAC), Prix de Transfert (BEPS) et Gouvernance & Risques (ERM, audit interne). 22 ans, 15+ pays.'}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { value: '15+', label: isEn ? 'Documented missions' : 'Missions documentées', icon: 'ri-briefcase-4-line' },
              { value: '22+', label: isEn ? 'Years of field experience' : "Années d'expérience terrain", icon: 'ri-calendar-check-line' },
              { value: '7+', label: isEn ? 'Countries covered' : 'Pays couverts', icon: 'ri-map-pin-2-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20 border border-gold-400/30 mx-auto mb-2">
                  <i className={`${stat.icon} text-gold-400 text-base`}></i>
                </div>
                <p className="text-3xl font-extrabold text-white font-playfair">{stat.value}</p>
                <p className="text-xs text-white/60 mt-0.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




