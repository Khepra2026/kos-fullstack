import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const UEMOA_COUNTRIES = [
  { code: 'BJ', nameFr: 'Bénin', nameEn: 'Benin', capitalFr: 'Porto-Novo', capitalEn: 'Porto-Novo', flag: '🇧🇯' },
  { code: 'BF', nameFr: 'Burkina Faso', nameEn: 'Burkina Faso', capitalFr: 'Ouagadougou', capitalEn: 'Ouagadougou', flag: '🇧🇫' },
  { code: 'CI', nameFr: "Côte d'Ivoire", nameEn: "Côte d'Ivoire", capitalFr: 'Abidjan', capitalEn: 'Abidjan', flag: '🇨🇮' },
  { code: 'GW', nameFr: 'Guinée-Bissau', nameEn: 'Guinea-Bissau', capitalFr: 'Bissau', capitalEn: 'Bissau', flag: '🇬🇼' },
  { code: 'ML', nameFr: 'Mali', nameEn: 'Mali', capitalFr: 'Bamako', capitalEn: 'Bamako', flag: '🇲🇱' },
  { code: 'NE', nameFr: 'Niger', nameEn: 'Niger', capitalFr: 'Niamey', capitalEn: 'Niamey', flag: '🇳🇪' },
  { code: 'SN', nameFr: 'Sénégal', nameEn: 'Senegal', capitalFr: 'Dakar', capitalEn: 'Dakar', flag: '🇸🇳' },
  { code: 'TG', nameFr: 'Togo', nameEn: 'Togo', capitalFr: 'Lomé', capitalEn: 'Lomé', flag: '🇹🇬' },
];

const REGULATORS = [
  {
    icon: 'ri-bank-line',
    name: 'BCEAO',
    nameFullFr: "Banque Centrale des États de l'Afrique de l'Ouest",
    nameFullEn: 'Central Bank of West African States',
    roleFr: 'Banque Centrale — Politique monétaire, agréments, supervision bancaire, stabilité financière',
    roleEn: 'Central Bank — Monetary policy, licensing, banking supervision, financial stability',
    accent: '#C5960C',
  },
  {
    icon: 'ri-line-chart-line',
    name: 'AMF-UMOA',
    nameFullFr: "Autorité des Marchés Financiers de l'UMOA",
    nameFullEn: 'Financial Markets Authority of the WAMU',
    roleFr: 'Régulateur des marchés financiers — Agréments SGI, OPCVM, transparence, protection des épargnants',
    roleEn: 'Financial markets regulator — SGI/UCITS licensing, transparency, investor protection',
    accent: '#B87333',
  },
  {
    icon: 'ri-fingerprint-line',
    name: 'GIABA',
    nameFullFr: "Groupe Intergouvernemental d'Action contre le Blanchiment d'Argent en Afrique de l'Ouest",
    nameFullEn: 'Inter-Governmental Action Group against Money Laundering in West Africa',
    roleFr: 'Organe LBC/FT — Évaluation mutuelle, déclarations de soupçon (à la CENTIF), conformité FATF/GAFI',
    roleEn: 'AML/CFT body — Mutual evaluation, suspicious transaction reports (to FIU), FATF compliance',
    accent: '#8B7D3C',
  },
];

const SERVICES = [
  {
    icon: 'ri-search-eye-line',
    titleFr: 'Inspection BCEAO',
    titleEn: 'BCEAO Inspection',
    descFr: 'Préparation aux missions de contrôle sur place et sur pièces. Audit pré-inspection, simulation, remédiation, suivi post-contrôle.',
    descEn: 'Preparation for on-site and off-site control missions. Pre-inspection audit, simulation, remediation, post-control follow-up.',
    href: '/services/audit-pre-inspection-bceao',
    accent: '#C5960C',
  },
  {
    icon: 'ri-shield-keyhole-line',
    titleFr: 'Conformité UEMOA',
    titleEn: 'UEMOA Compliance',
    descFr: 'Mise en conformité réglementaire : dispositif de contrôle interne, ratios prudentiels, reporting BCEAO, gouvernance.',
    descEn: 'Regulatory compliance: internal control framework, prudential ratios, BCEAO reporting, governance.',
    href: '/services/regulatory-intelligence',
    accent: '#B87333',
  },
  {
    icon: 'ri-global-line',
    titleFr: 'Conformité GIABA',
    titleEn: 'GIABA Compliance',
    descFr: 'Dispositif LBC/FT UEMOA : KYC renforcé, déclarations de soupçon, formation des personnels, audit annuel indépendant.',
    descEn: 'UEMOA AML/CFT framework: enhanced KYC, suspicious transaction reports, staff training, annual independent audit.',
    href: '/tools/diagnostic-lbcft',
    accent: '#8B7D3C',
  },
  {
    icon: 'ri-government-line',
    titleFr: 'Agrément BCEAO',
    titleEn: 'BCEAO Licensing',
    descFr: "Constitution de dossiers d'agrément pour SFD, EMF, établissements de paiement en zone UEMOA. Due diligence réglementaire.",
    descEn: 'Licensing applications for MFIs, payment institutions in the UEMOA zone. Regulatory due diligence.',
    href: '/services/agrement-fintech-etablissement-paiement',
    accent: '#C5960C',
  },
];

export default function HomeUEMOA() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [activeRegulator, setActiveRegulator] = useState(0);

  return (
    <section id="uemoa" className="py-24 overflow-hidden" style={{ background: '#fbf9f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========== HEADER ========== */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(197,150,12,0.10)', border: '1px solid rgba(197,150,12,0.22)' }}
            >
              <i className="ri-global-line text-xs" style={{ color: '#C5960C' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#B87333' }}>
                {isEn ? 'UEMOA Zone — West Africa' : "Zone UEMOA — Afrique de l'Ouest"}
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {isEn ? (
                <>
                  Rooted in{' '}
                  <span style={{ background: 'linear-gradient(90deg, #C5960C, #B87333, #8B7D3C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    West Africa
                  </span>
                </>
              ) : (
                <>
                  Enracinés en{' '}
                  <span style={{ background: 'linear-gradient(90deg, #C5960C, #B87333, #8B7D3C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Afrique de l'Ouest
                  </span>
                </>
              )}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
              {isEn
                ? "BCEAO · AMF-UMOA · GIABA — Headquartered in Lomé, KHEPRA EXPERTS has been the reference partner for UEMOA financial institutions since 2002. We master the regulatory frameworks of all 8 member states and support banks, SFDs, EMFs and fintechs in their compliance, licensing and governance challenges."
                : "BCEAO · AMF-UMOA · GIABA — Basé à Lomé, KHEPRA EXPERTS est le partenaire de référence des institutions financières de l'UEMOA depuis 2002. Nous maîtrisons les cadres réglementaires des 8 États membres et accompagnons les banques, SFD, EMF et fintechs dans leurs enjeux de conformité, d'agrément et de gouvernance."}
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

        {/* ========== 8 PAYS UEMOA ========== */}
        <ScrollReveal delay={100}>
          <div className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
              {isEn ? '8 countries — 140 million inhabitants — XOF common currency' : "8 pays — 140 millions d'habitants — Monnaie commune XOF"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {UEMOA_COUNTRIES.map((country) => (
                <div
                  key={country.code}
                  className="group relative rounded-xl p-4 text-center transition-all duration-400 cursor-default"
                  style={{
                    background: hoveredCountry === country.code ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: hoveredCountry === country.code
                      ? '1.5px solid rgba(197,150,12,0.25)'
                      : '1.5px solid rgba(0,0,0,0.04)',
                    transform: hoveredCountry === country.code ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCountry === country.code
                      ? '0 8px 32px rgba(197,150,12,0.10)'
                      : 'none',
                  }}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <span className="text-3xl block mb-2 transition-transform duration-400 group-hover:scale-110">
                    {country.flag}
                  </span>
                  <p className="text-sm font-bold text-gray-800 mb-0.5 whitespace-nowrap">
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

        {/* ========== SERVICES UEMOA — 4 cartes ========== */}
        <ScrollReveal delay={150}>
          <div className="mb-14">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
              {isEn ? 'Our UEMOA expertise' : 'Notre expertise UEMOA'}
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

        {/* ========== CTA — Article BCEAO/OHADA ========== */}
        <ScrollReveal delay={200}>
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: 'linear-gradient(135deg, #1a1306 0%, #211a0c 50%, #181005 100%)',
              border: '1px solid rgba(197,150,12,0.15)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: 'rgba(197,150,12,0.15)', border: '1px solid rgba(197,150,12,0.30)' }}
              >
                <i className="ri-article-line text-xl" style={{ color: '#C5960C' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {isEn
                    ? 'BCEAO / OHADA: The Complete Guide to Banking & Corporate Governance in West Africa'
                    : "Conformité BCEAO / OHADA : le guide complet de la gouvernance bancaire et d'entreprise en Afrique de l'Ouest"}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {isEn
                    ? 'Everything you need to know about BCEAO, OHADA uniform acts, prudential ratios, inspections and governance requirements — premium institutional analysis.'
                    : "Tout sur la BCEAO, les actes uniformes OHADA, les ratios prudentiels, les inspections et les exigences de gouvernance — Analyse institutionnelle premium."}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/blog/bceao-ohada-conformite')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #C5960C, #d4a81f)',
                color: '#1a1306',
                boxShadow: '0 4px 24px rgba(197,150,12,0.35)',
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
                background: 'linear-gradient(135deg, #B87333, #C5960C)',
                color: '#ffffff',
                boxShadow: '0 4px 24px rgba(184,115,51,0.35)',
              }}
            >
              <i className="ri-calendar-check-line" />
              {isEn ? 'Book a UEMOA compliance diagnostic' : 'Réserver un diagnostic conformité UEMOA'}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}