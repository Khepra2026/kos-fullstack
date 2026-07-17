import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const CEMAC_COUNTRIES = [
  { code: 'CM', nameFr: 'Cameroun', nameEn: 'Cameroon', capitalFr: 'Yaoundé', capitalEn: 'Yaoundé', flag: '🇨🇲' },
  { code: 'GA', nameFr: 'Gabon', nameEn: 'Gabon', capitalFr: 'Libreville', capitalEn: 'Libreville', flag: '🇬🇦' },
  { code: 'CG', nameFr: 'Congo', nameEn: 'Congo', capitalFr: 'Brazzaville', capitalEn: 'Brazzaville', flag: '🇨🇬' },
  { code: 'CF', nameFr: 'RCA', nameEn: 'CAR', capitalFr: 'Bangui', capitalEn: 'Bangui', flag: '🇨🇫' },
  { code: 'TD', nameFr: 'Tchad', nameEn: 'Chad', capitalFr: 'N\'Djamena', capitalEn: 'N\'Djamena', flag: '🇹🇩' },
  { code: 'GQ', nameFr: 'Guinée Équatoriale', nameEn: 'Equatorial Guinea', capitalFr: 'Malabo', capitalEn: 'Malabo', flag: '🇬🇶' },
];

const REGULATORS = [
  {
    icon: 'ri-bank-line',
    name: 'BEAC',
    nameFullFr: 'Banque des États de l\'Afrique Centrale',
    nameFullEn: 'Bank of Central African States',
    roleFr: 'Banque Centrale — Politique monétaire, agréments, supervision macro-prudentielle',
    roleEn: 'Central Bank — Monetary policy, licensing, macro-prudential supervision',
    accent: '#86BC25',
  },
  {
    icon: 'ri-shield-check-line',
    name: 'COBAC',
    nameFullFr: 'Commission Bancaire de l\'Afrique Centrale',
    nameFullEn: 'Central African Banking Commission',
    roleFr: 'Régulateur prudentiel — Inspections, ratios, gouvernance, conformité',
    roleEn: 'Prudential regulator — Inspections, ratios, governance, compliance',
    accent: '#D4AF37',
  },
  {
    icon: 'ri-fingerprint-line',
    name: 'GABAC',
    nameFullFr: 'Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale',
    nameFullEn: 'Action Group against Money Laundering in Central Africa',
    roleFr: 'Organe LBC/FT — Évaluation mutuelle, déclarations de soupçon, gel des avoirs',
    roleEn: 'AML/CFT body — Mutual evaluation, suspicious transaction reports, asset freezing',
    accent: '#6B9B1F',
  },
];

const SERVICES = [
  {
    icon: 'ri-search-eye-line',
    titleFr: 'Inspection COBAC',
    titleEn: 'COBAC Inspection',
    descFr: 'Préparation aux inspections sur place et sur pièces. Simulation, remédiation, accompagnement post-inspection.',
    descEn: 'Preparation for on-site and off-site inspections. Simulation, remediation, post-inspection support.',
    href: '/inspection-cobac',
    accent: '#D4AF37',
  },
  {
    icon: 'ri-shield-keyhole-line',
    titleFr: 'Conformité CEMAC',
    titleEn: 'CEMAC Compliance',
    descFr: 'Mise en conformité avec les instructions COBAC : gouvernance, contrôle interne, ratios prudentiels.',
    descEn: 'Compliance with COBAC instructions: governance, internal control, prudential ratios.',
    href: '/conformite-cemac',
    accent: '#86BC25',
  },
  {
    icon: 'ri-global-line',
    titleFr: 'Conformité GABAC',
    titleEn: 'GABAC Compliance',
    descFr: 'Dispositif LBC/FT complet : KYC, déclarations de soupçon, formation, audit indépendant.',
    descEn: 'Complete AML/CFT framework: KYC, suspicious transaction reports, training, independent audit.',
    href: '/conformite-gabac',
    accent: '#6B9B1F',
  },
  {
    icon: 'ri-government-line',
    titleFr: 'Agrément BEAC/COBAC',
    titleEn: 'BEAC/COBAC Licensing',
    descFr: 'Constitution de dossiers d\'agrément pour SFD, EMF, établissements de paiement en zone CEMAC.',
    descEn: 'Licensing applications for MFIs, payment institutions in the CEMAC zone.',
    href: '/agrement-beac',
    accent: '#D4AF37',
  },
];

export default function HomeCEMAC() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [activeRegulator, setActiveRegulator] = useState(0);

  return (
    <section id="cemac" className="py-24 overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========== HEADER ========== */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(107,155,31,0.10)', border: '1px solid rgba(107,155,31,0.22)' }}
            >
              <i className="ri-global-line text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
                {isEn ? 'CEMAC Zone — Central Africa' : 'Zone CEMAC — Afrique Centrale'}
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {isEn ? (
                <>
                  Your partner in{' '}
                  <span style={{ background: 'linear-gradient(90deg, #6B9B1F, #D4AF37, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Central Africa
                  </span>
                </>
              ) : (
                <>
                  Votre partenaire en{' '}
                  <span style={{ background: 'linear-gradient(90deg, #6B9B1F, #D4AF37, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Afrique Centrale
                  </span>
                </>
              )}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
              {isEn
                ? 'BEAC · COBAC · GABAC — KHEPRA EXPERTS has been operating in the CEMAC zone for over 15 years. We master the regulatory framework of the 6 Central African countries and support banks, microfinance institutions and fintechs in their compliance, licensing and governance challenges.'
                : 'BEAC · COBAC · GABAC — KHEPRA EXPERTS intervient en zone CEMAC depuis plus de 15 ans. Nous maîtrisons le cadre réglementaire des 6 pays d\'Afrique Centrale et accompagnons les banques, institutions de microfinance et fintechs dans leurs enjeux de conformité, d\'agrément et de gouvernance.'}
            </p>
          </div>
        </ScrollReveal>

        {/* ========== RÉGULATEURS — 3 cartes ========== */}
        <ScrollReveal delay={50}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {REGULATORS.map((reg, i) => (
              <div
                key={reg.name}
                onMouseEnter={() => setActiveRegulator(i)}
                className="group relative rounded-2xl p-6 transition-all duration-500 cursor-default"
                style={{
                  background: activeRegulator === i
                    ? `linear-gradient(180deg, ${reg.accent}0a 0%, #ffffff 100%)`
                    : '#ffffff',
                  border: activeRegulator === i
                    ? `1.5px solid ${reg.accent}40`
                    : '1.5px solid rgba(0,0,0,0.06)',
                  transform: activeRegulator === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: activeRegulator === i
                    ? `0 16px 48px ${reg.accent}18`
                    : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {/* Icône */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-all duration-500"
                  style={{
                    background: activeRegulator === i ? `${reg.accent}18` : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${activeRegulator === i ? reg.accent + '40' : 'rgba(0,0,0,0.06)'}`,
                  }}
                >
                  <i
                    className={`${reg.icon} text-xl transition-all duration-500`}
                    style={{ color: activeRegulator === i ? reg.accent : '#9ca3af' }}
                  />
                </div>

                {/* Nom */}
                <h3
                  className="text-xl font-bold mb-1.5 transition-colors duration-500"
                  style={{ color: activeRegulator === i ? reg.accent : '#111827' }}
                >
                  {reg.name}
                </h3>
                <p className="text-xs font-medium text-gray-400 mb-3">
                  {isEn ? reg.nameFullEn : reg.nameFullFr}
                </p>

                {/* Rôle */}
                <p
                  className="text-sm leading-relaxed transition-colors duration-500"
                  style={{ color: activeRegulator === i ? '#4b5563' : '#9ca3af' }}
                >
                  {isEn ? reg.roleEn : reg.roleFr}
                </p>

                {/* Barre d'accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-500"
                  style={{
                    background: activeRegulator === i
                      ? `linear-gradient(90deg, ${reg.accent}, transparent)`
                      : 'transparent',
                    opacity: activeRegulator === i ? 1 : 0,
                  }}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ========== 6 PAYS CEMAC ========== */}
        <ScrollReveal delay={100}>
          <div className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
              {isEn ? '6 countries — 55 million inhabitants — XAF common currency' : '6 pays — 55 millions d\'habitants — Monnaie commune XAF'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CEMAC_COUNTRIES.map((country) => (
                <div
                  key={country.code}
                  className="group relative rounded-xl p-4 text-center transition-all duration-400 cursor-default"
                  style={{
                    background: hoveredCountry === country.code ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: hoveredCountry === country.code
                      ? '1.5px solid rgba(107,155,31,0.25)'
                      : '1.5px solid rgba(0,0,0,0.04)',
                    transform: hoveredCountry === country.code ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCountry === country.code
                      ? '0 8px 32px rgba(107,155,31,0.10)'
                      : 'none',
                  }}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <span className="text-3xl block mb-2 transition-transform duration-400 group-hover:scale-110">
                    {country.flag}
                  </span>
                  <p className="text-sm font-bold text-gray-800 mb-0.5">
                    {isEn ? country.nameEn : country.nameFr}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isEn ? country.capitalEn : country.capitalFr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ========== SERVICES CEMAC — 4 cartes ========== */}
        <ScrollReveal delay={150}>
          <div className="mb-14">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
              {isEn ? 'Our CEMAC expertise' : 'Notre expertise CEMAC'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((svc) => (
                <button
                  key={svc.href}
                  onClick={() => navigate(svc.href)}
                  className="group text-left rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${svc.accent}40`;
                    e.currentTarget.style.boxShadow = `0 12px 40px ${svc.accent}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icône */}
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg mb-3 transition-all duration-400 group-hover:scale-110"
                    style={{ background: `${svc.accent}12`, border: `1px solid ${svc.accent}25` }}
                  >
                    <i className={`${svc.icon} text-lg`} style={{ color: svc.accent }} />
                  </div>

                  {/* Titre + description */}
                  <h4 className="font-bold text-sm text-gray-900 mb-1.5 group-hover:underline">
                    {isEn ? svc.titleEn : svc.titleFr}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {isEn ? svc.descEn : svc.descFr}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                    <span className="text-xs font-semibold" style={{ color: svc.accent }}>
                      {isEn ? 'Explore' : 'Explorer'}
                    </span>
                    <i className="ri-arrow-right-line text-xs" style={{ color: svc.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ========== CTA — Article COBAC/CEMAC ========== */}
        <ScrollReveal delay={200}>
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: 'linear-gradient(135deg, #0a101c 0%, #111b2a 50%, #0c1420 100%)',
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.30)' }}
              >
                <i className="ri-article-line text-xl" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {isEn
                    ? 'COBAC / CEMAC: The Complete Guide to Banking Governance in Central Africa'
                    : 'Conformité COBAC / CEMAC : le guide complet de la gouvernance bancaire en Afrique Centrale'}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {isEn
                    ? 'Everything you need to know about COBAC, BEAC, GABAC, prudential ratios, inspections and sanctions — premium institutional analysis.'
                    : 'Tout sur la COBAC, la BEAC, le GABAC, les ratios prudentiels, les inspections et les sanctions — Analyse institutionnelle premium.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/blog/conformite-cobac-cemac')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #e8c04a)',
                color: '#0a101c',
                boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
              }}
            >
              <i className="ri-book-open-line" />
              {isEn ? 'Read the guide' : 'Lire le guide'}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </ScrollReveal>

        {/* ========== CTA Secondaire ========== */}
        <ScrollReveal delay={250}>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #6B9B1F)',
                color: '#ffffff',
                boxShadow: '0 4px 24px rgba(134,188,37,0.35)',
              }}
            >
              <i className="ri-calendar-check-line" />
              {isEn ? 'Book a CEMAC compliance diagnostic' : 'Réserver un diagnostic conformité CEMAC'}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}