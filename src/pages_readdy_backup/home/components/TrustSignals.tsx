import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import OptimizedImage from '@/components/base/OptimizedImage';

const TESTIMONIALS = [
  {
    nameFr: 'Directrice Générale',
    nameEn: 'Chief Executive Officer',
    roleFr: 'Institution de Microfinance — Côte d\'Ivoire',
    roleEn: 'Microfinance Institution — Ivory Coast',
    sectorFr: 'Microfinance',
    sectorEn: 'Microfinance',
    quoteFr: 'Khepra Experts a restructuré notre gouvernance de fond en comble en 4 mois. Notre Conseil d\'Administration est désormais pleinement opérationnel, notre conformité BCEAO est irréprochable et nos bailleurs de fonds ont retrouvé confiance. Un accompagnement d\'une rigueur exceptionnelle.',
    quoteEn: 'Khepra Experts completely restructured our governance in 4 months. Our Board of Directors is now fully operational, our BCEAO compliance is impeccable, and our funders have regained confidence. Exceptionally rigorous support.',
    rating: 5,
    resultFr: 'Conformité BCEAO rétablie',
    resultEn: 'BCEAO compliance restored',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20woman%20executive%20director%20portrait%20confident%20formal%20elegant%20dark%20suit%20corporate%20headshot%20neutral%20studio%20background%20mid-40s%20leadership%20CEO%20directrice%20West%20Africa&width=120&height=120&seq=testi-dg-imf-civ-2026&orientation=squarish',
    color: '#86BC25',
  },
  {
    nameFr: 'Directeur Général',
    nameEn: 'Managing Director',
    roleFr: 'Groupe PME industriel — Afrique de l\'Ouest',
    roleEn: 'Industrial SME Group — West Africa',
    sectorFr: 'Industrie & PME',
    sectorEn: 'Industry & SME',
    quoteFr: 'Grâce à l\'accompagnement de Khepra Experts, nous avons structuré notre gouvernance et renforcé significativement la qualité de nos états financiers. Nos partenaires institutionnels ont retrouvé la confiance nécessaire pour soutenir notre développement.',
    quoteEn: 'Thanks to Khepra Experts\' support, we structured our governance and significantly improved the quality of our financial statements. Our institutional partners regained the confidence needed to support our development.',
    rating: 5,
    resultFr: 'Gouvernance structurée · Accès financement',
    resultEn: 'Structured governance · Financing access',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20man%20executive%20managing%20director%20portrait%20confident%20formal%20dark%20suit%20business%20professional%20headshot%20studio%20lighting%2040s%20leadership%20West%20Africa%20neutral%20background%20corporate&width=120&height=120&seq=testi-dg-pme-west-2026&orientation=squarish',
    color: '#10b981',
  },
  {
    nameFr: 'Secrétaire Général',
    nameEn: 'Secretary General',
    roleFr: 'ONG internationale — Afrique francophone',
    roleEn: 'International NGO — Francophone Africa',
    sectorFr: 'Secteur public & ONG',
    sectorEn: 'Public Sector & NGO',
    quoteFr: 'Le diagnostic organisationnel de Khepra Experts nous a permis d\'identifier nos angles morts et de mettre en place une feuille de route stratégique claire. Nos processus de suivi et d\'absorption des financements se sont considérablement améliorés.',
    quoteEn: 'Khepra Experts\' organizational diagnostic helped us identify our blind spots and implement a clear strategic roadmap. Our monitoring processes and financing absorption have improved considerably.',
    rating: 5,
    resultFr: 'Feuille de route stratégique déployée',
    resultEn: 'Strategic roadmap deployed',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20executive%20person%20NGO%20leader%20portrait%20formal%20confident%20headshot%20francophone%20Africa%20secretary%20general%20organization%20governance%20expert%20natural%20lighting%20studio%20professional%20attire%20neutral&width=120&height=120&seq=testi-sg-ong-franco-2026&orientation=squarish',
    color: '#86BC25',
  },
];

const SECTORS = [
  { iconFr: 'Microfinance & SFD', iconEn: 'Microfinance & MFI', icon: 'ri-hand-coin-line', count: '120+', color: '#86BC25' },
  { iconFr: 'PME & Startups', iconEn: 'SME & Startups', icon: 'ri-rocket-line', count: '180+', color: '#10b981' },
  { iconFr: 'Secteur Public', iconEn: 'Public Sector', icon: 'ri-government-line', count: '85+', color: '#86BC25' },
  { iconFr: 'Fintech', iconEn: 'Fintech', icon: 'ri-smartphone-line', count: '60+', color: '#10b981' },
  { iconFr: 'ONG & Programmes', iconEn: 'NGOs & Programs', icon: 'ri-global-line', count: '95+', color: '#86BC25' },
  { iconFr: 'Banques & CEMAC', iconEn: 'Banks & CEMAC', icon: 'ri-bank-line', count: '55+', color: '#10b981' },
];

const CREDIBILITY_BADGES = [
  { labelFr: 'Expertise BCEAO', labelEn: 'BCEAO Expertise', icon: 'ri-shield-check-fill', color: '#86BC25' },
  { labelFr: 'Conformité OHADA', labelEn: 'OHADA Compliance', icon: 'ri-verified-badge-fill', color: '#10b981' },
  { labelFr: 'Expert COBAC', labelEn: 'COBAC Expert', icon: 'ri-award-fill', color: '#86BC25' },
  { labelFr: 'Zone UEMOA/CEMAC', labelEn: 'UEMOA/CEMAC Zone', icon: 'ri-global-line', color: '#10b981' },
  { labelFr: '22 ans d\'expertise', labelEn: '22 yrs expertise', icon: 'ri-time-line', color: '#86BC25' },
];

export default function TrustSignals() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const t = TESTIMONIALS[activeTestimonial];

  return (
    <section
      id="ils-nous-font-confiance"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fefefe 0%, #fafaf6 50%, #fefefe 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,42,0.25), rgba(16,185,129,0.15), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label={isEn ? 'They Trust Us' : 'Ils nous font confiance'}
                variant="left-accent"
                icon="ri-heart-fill"
                accentColor="primary"
              />
            </div>
            <h2 className="font-playfair font-bold text-gray-900 leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>600+ organizations<br /><span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>transformed across Africa</span></>
              ) : (
                <>600+ organisations<br /><span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>transformées en Afrique</span></>
              )}
            </h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed text-justify text-gray-500">
              {isEn
                ? 'Our clients are leaders, executives and managers of organizations that chose to transform their performance with Khepra Experts.'
                : 'Nos clients sont des dirigeants, directeurs et responsables d\'organisations ayant choisi de transformer leurs performances avec Khepra Experts.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-8 mb-16">

          {/* Left: selector */}
          <ScrollReveal animation="fadeSlideLeft">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                {isEn ? 'Select a testimonial' : 'Sélectionner un témoignage'}
              </p>
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left cursor-pointer transition-all duration-300"
                  style={{
                    background: activeTestimonial === i ? 'rgba(212,168,42,0.10)' : 'rgba(0,0,0,0.02)',
                    border: `1.5px solid ${activeTestimonial === i ? 'rgba(212,168,42,0.35)' : 'rgba(0,0,0,0.06)'}`,
                    transform: activeTestimonial === i ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${activeTestimonial === i ? '#86BC25' : 'rgba(0,0,0,0.1)'}` }}>
                    <OptimizedImage
                      src={testimonial.avatar}
                      alt={isEn ? testimonial.nameEn : testimonial.nameFr}
                      className="w-full h-full"
                      width={48}
                      height={48}
                      aspectRatio="1/1"
                      objectFit="cover"
                      loading="lazy"
                      placeholder="pulse"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 leading-snug">{isEn ? testimonial.nameEn : testimonial.nameFr}</p>
                    <p className="text-xs text-gray-500 leading-snug">{isEn ? testimonial.roleEn : testimonial.roleFr}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, si) => <i key={si} className="ri-star-fill text-xs" style={{ color: '#86BC25' }} />)}
                      </div>
                      <span className="text-xs font-bold ml-1" style={{ color: testimonial.color }}>
                        {isEn ? testimonial.resultEn : testimonial.resultFr}
                      </span>
                    </div>
                  </div>
                  {activeTestimonial === i && (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: '#86BC25' }}>
                      <i className="ri-arrow-right-line text-xs text-white" />
                    </div>
                  )}
                </button>
              ))}

              {/* Credibility badges */}
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(212,168,42,0.15)' }}>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  {isEn ? 'Expertise & Coverage' : 'Expertise & Couverture'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CREDIBILITY_BADGES.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: `${badge.color}09`, border: `1px solid ${badge.color}22`, color: badge.color }}
                    >
                      <i className={`${badge.icon} text-xs`} />
                      {isEn ? badge.labelEn : badge.labelFr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: featured testimonial */}
          <ScrollReveal animation="fadeSlideRight">
            <div
              className="rounded-3xl p-8 lg:p-10 flex flex-col h-full"
              style={{ background: 'linear-gradient(135deg, #050c18 0%, #091528 100%)', border: '1px solid rgba(212,168,42,0.18)' }}
            >
              {/* Stars + sector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, si) => <i key={si} className="ri-star-fill text-lg" style={{ color: '#86BC25' }} />)}
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}28`, color: t.color }}
                >
                  {isEn ? t.sectorEn : t.sectorFr}
                </span>
              </div>

              {/* Quote mark */}
              <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 flex-shrink-0" style={{ background: 'rgba(212,168,42,0.12)' }}>
                <i className="ri-double-quotes-l text-2xl" style={{ color: '#86BC25' }} />
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-base leading-relaxed italic mb-8 text-justify" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {isEn ? t.quoteEn : t.quoteFr}
              </blockquote>

              {/* Result badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6 self-start"
                style={{ background: `${t.color}14`, border: `1px solid ${t.color}28` }}
              >
                <i className="ri-arrow-up-circle-line" style={{ color: t.color }} />
                <span className="text-sm font-bold" style={{ color: t.color }}>
                  {isEn ? t.resultEn : t.resultFr}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${t.color}40` }}>
                  <OptimizedImage
                    src={t.avatar}
                    alt={isEn ? t.nameEn : t.nameFr}
                    className="w-full h-full"
                    width={56}
                    height={56}
                    aspectRatio="1/1"
                    objectFit="cover"
                    loading="lazy"
                    placeholder="pulse"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-base">{isEn ? t.nameEn : t.nameFr}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>{isEn ? t.roleEn : t.roleFr}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sectors served */}
        <ScrollReveal animation="fadeSlideUp" delay={100}>
          <div className="rounded-2xl p-8" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.14)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {isEn ? 'Sectors served' : 'Secteurs accompagnés'}
                </p>
                <h3 className="font-playfair font-bold text-gray-900 text-xl">
                  {isEn ? '20+ sectors — Cross-sector expertise' : '20+ secteurs — Expertise transversale'}
                </h3>
              </div>
              <button
                onClick={() => navigate('/industries')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.28)', color: '#6B9B1F' }}
              >
                {isEn ? 'All industries' : 'Toutes les industries'}
                <i className="ri-arrow-right-line" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {SECTORS.map((sector, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-default" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${sector.color}12`, border: `1px solid ${sector.color}22` }}>
                    <i className={`${sector.icon} text-lg`} style={{ color: sector.color }} />
                  </div>
                  <div className="font-bold text-base font-playfair" style={{ color: sector.color }}>{sector.count}</div>
                  <p className="text-xs text-gray-500 leading-tight font-medium">{isEn ? sector.iconEn : sector.iconFr}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA bottom */}
        <ScrollReveal animation="fadeSlideUp" delay={150}>
          <div className="mt-10 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 6px 24px rgba(212,168,42,0.35)' }}
            >
              <i className="ri-briefcase-line" />
              {isEn ? 'View all case studies' : 'Voir toutes les études de cas'}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
              style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#6B9B1F', background: 'transparent' }}
            >
              <i className="ri-customer-service-2-line" />
              {isEn ? 'Talk to an expert' : 'Parler à un expert'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}




