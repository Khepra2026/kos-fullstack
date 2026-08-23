import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { buildHreflang } from '@/utils/hreflang';
import ServiceNavigation from '@/pages/services/components/ServiceNavigation';
import ServiceFAQ from '@/pages/services/components/ServiceFAQ';
import PremiumServiceCTA from '@/pages/services/components/PremiumServiceCTA';
import { InlineLeadMagnet } from '@/components/feature/InlineLeadMagnet';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const IR_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/levee-de-fonds#service`,
      name: 'Investment Readiness & Levée de Fonds Africa™',
      description: 'Architecture 4 niveaux pour la préparation à la levée de fonds en Afrique francophone : Diagnostic de Bancabilité gratuit, Dossier Investor-Grade, Ciblage Investisseurs et Abonnement Investor Relations.',
      url: `${SITE_URL}/services/levee-de-fonds`,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'Investment Readiness & Fundraising Advisory',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que l\'Investment Readiness ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'L\'Investment Readiness désigne le niveau de préparation d\'une organisation à lever des fonds auprès d\'investisseurs institutionnels (PE/VC, DFI, fonds impact). Il évalue 5 dimensions : solidité financière, gouvernance, modèle économique, équipe et potentiel de croissance. Un score élevé multiplie par 3 les chances d\'obtenir un financement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps faut-il pour préparer une levée de fonds en Afrique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En Afrique francophone, la durée moyenne est de 6 à 12 mois. La phase de préparation (diagnostic, dossier, due diligence préparatoire) prend 2 à 3 mois. La mise en relation et les négociations avec les investisseurs prennent 3 à 6 mois supplémentaires. Les fonds PE/VC et DFI comme le BIDC, BOAD ou BAD ont des processus d\'instruction rigoureux qui nécessitent des dossiers très solides.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels investisseurs ciblez-vous pour les entreprises africaines ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nous ciblons les investisseurs les plus actifs en Afrique francophone : fonds PE/VC (Partech Africa, Orange Ventures, Verod Capital), DFI (BIDC, BOAD, BAD, SFI/IFC, Proparco, FMO, DEG), fonds d\'impact (OPIC, Symbiotics, responsAbility), fonds souverains régionaux et banques commerciales pour la dette. Nous qualifions chaque investisseur selon votre secteur, ticket et stade de développement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre pitch deck et mémorandum d\'information ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le pitch deck (15-20 slides) est l\'outil de premier contact visuel avec l\'investisseur. Il capte l\'attention et génère la réunion. Le mémorandum d\'information (IM, 40-80 pages) est le document de diligence qui détaille le business plan, les états financiers, la gouvernance, les risques et les projections. Les deux sont complémentaires et nécessaires pour toute levée sérieuse.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment garantir la confidentialité lors d\'une levée de fonds ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nous mettons en place un protocole de confidentialité rigoureux : NDA systématique avant tout partage de documents, data room sécurisée avec accès tracé, watermarking des documents sensibles, et protocole d\'approche séquentielle des investisseurs pour éviter les fuites.',
          },
        },
      ],
    },
  ],
};

export default function LeveeDeFonds() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '€120M+', label: 'Capital raised', sub: 'across Africa by KHEPRA clients', icon: 'ri-money-dollar-circle-line', accent: '#c9a227' },
        { value: '+60%', label: 'Success rate', sub: 'vs. unaccompanied files', icon: 'ri-arrow-up-line', accent: '#22a05a' },
        { value: '90–180d', label: 'Average timeline', sub: 'preparation to closing', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '20+', label: 'Active investors', sub: 'PE/VC, DFI, impact funds', icon: 'ri-links-line', accent: '#22a05a' },
      ]
    : [
        { value: '120M€+', label: 'De capital levé', sub: 'en Afrique par les clients KHEPRA', icon: 'ri-money-dollar-circle-line', accent: '#c9a227' },
        { value: '+60%', label: 'Taux de succès', sub: 'vs. dossiers non accompagnés', icon: 'ri-arrow-up-line', accent: '#22a05a' },
        { value: '90–180j', label: 'Durée moyenne', sub: 'de la préparation au closing', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '20+', label: 'Investisseurs actifs', sub: 'PE/VC, DFI, fonds impact', icon: 'ri-links-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-stethoscope-line', title: 'Investment Readiness Diagnostic', duration: '2 weeks', desc: 'Evaluation of your readiness on 5 dimensions: financial soundness, governance, business model, team, growth potential. Score with action plan.', deliverable: 'Readiness scorecard + priority action plan', accent: '#c9a227' },
        { num: '02', icon: 'ri-file-chart-2-line', title: 'Investor-Grade Dossier', duration: '3–4 weeks', desc: 'Creation of your pitch deck (20 slides), information memorandum, audited 5-year financial model, executive teaser and data room setup.', deliverable: 'Pitch deck + IM + financial model + data room', accent: '#22a05a' },
        { num: '03', icon: 'ri-user-search-line', title: 'Investor Targeting & Approach', duration: '3–6 weeks', desc: 'Mapping of PE/VC funds, DFIs (BIDC, BOAD, IFC, Proparco), impact funds and commercial banks aligned with your profile. Personalized outreach.', deliverable: 'Qualified investor list + approach strategy', accent: '#c9a227' },
        { num: '04', icon: 'ri-shake-hands-line', title: 'Due Diligence & Closing', duration: 'Until closing', desc: 'Support during investor due diligence, term sheet negotiation, legal documentation and financial closing. Post-closing governance advisory.', deliverable: 'Term sheet + closing package + governance advisory', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-stethoscope-line', title: 'Diagnostic Investment Readiness', duration: '2 semaines', desc: 'Évaluation de votre readiness sur 5 dimensions : solidité financière, gouvernance, modèle économique, équipe, potentiel de croissance. Score avec plan d\'action.', deliverable: 'Scorecard readiness + plan d\'action priorisé', accent: '#c9a227' },
        { num: '02', icon: 'ri-file-chart-2-line', title: 'Dossier Investor-Grade', duration: '3–4 semaines', desc: 'Création de votre pitch deck (20 slides), mémorandum d\'information, modèle financier 5 ans audité, teaser exécutif et structuration de la data room.', deliverable: 'Pitch deck + IM + modèle financier + data room', accent: '#22a05a' },
        { num: '03', icon: 'ri-user-search-line', title: 'Ciblage & Approche Investisseurs', duration: '3–6 semaines', desc: 'Cartographie des fonds PE/VC, DFI (BIDC, BOAD, IFC, Proparco), fonds impact et banques commerciales alignés avec votre profil. Approche personnalisée.', deliverable: 'Liste investisseurs qualifiés + stratégie d\'approche', accent: '#c9a227' },
        { num: '04', icon: 'ri-shake-hands-line', title: 'Due Diligence & Closing', duration: "Jusqu'au closing", desc: 'Accompagnement lors de la due diligence investisseur, négociation du term sheet, documentation juridique et closing financier. Conseil gouvernance post-closing.', deliverable: 'Term sheet + package closing + conseil gouvernance', accent: '#22a05a' },
      ];

  const READINESS_DIMENSIONS = isEn
    ? [
        { icon: 'ri-line-chart-line', title: 'Financial Soundness', items: ['3 years of audited financials', 'Positive or justified cash burn', 'Documented funding structure', 'Unit economics clarity'] },
        { icon: 'ri-shield-check-line', title: 'Governance', items: ['Functional board of directors', 'Updated KYC/AML documentation', 'OHADA-compliant shareholder agreement', 'Founders\' incentive alignment'] },
        { icon: 'ri-rocket-line', title: 'Business Model', items: ['Scalable and defensible model', 'Validated product-market fit', 'Diversified revenue streams', 'Identified growth levers'] },
        { icon: 'ri-team-line', title: 'Team & Organization', items: ['Complete management team', 'Succession planning', 'HR policies in place', 'Key person retention plan'] },
      ]
    : [
        { icon: 'ri-line-chart-line', title: 'Solidité Financière', items: ['3 ans de financiers audités', 'Cash burn positif ou justifié', 'Structure de financement documentée', 'Unit economics clairs'] },
        { icon: 'ri-shield-check-line', title: 'Gouvernance', items: ['Conseil d\'administration fonctionnel', 'Documentation KYC/AML à jour', 'Pacte d\'actionnaires conforme OHADA', 'Alignement d\'intérêts fondateurs'] },
        { icon: 'ri-rocket-line', title: 'Modèle Économique', items: ['Modèle scalable et défendable', 'Product-market fit validé', 'Revenus diversifiés et récurrents', 'Leviers de croissance identifiés'] },
        { icon: 'ri-team-line', title: 'Équipe & Organisation', items: ['Équipe de direction complète', 'Plan de succession documenté', 'Politiques RH en place', 'Plan de rétention des talents clés'] },
      ];

  const INVESTOR_TYPES = isEn
    ? [
        { icon: 'ri-funds-line', label: 'PE/VC Funds', examples: 'Partech Africa, Orange Ventures, Verod Capital', kpi: 'Equity ticket $500K – $10M' },
        { icon: 'ri-building-2-line', label: 'DFI (Development Finance)', examples: 'BIDC, BOAD, IFC, Proparco, DEG, FMO', kpi: 'Debt & equity, ESG requirements' },
        { icon: 'ri-leaf-line', label: 'Impact Funds', examples: 'Symbiotics, responsAbility, OPIC, MCE Social Capital', kpi: 'Social & climate impact focus' },
        { icon: 'ri-bank-line', label: 'Commercial Banks', examples: 'Ecobank, Orabank, Bridge Bank, CBAO', kpi: 'Senior debt, mezzanine financing' },
        { icon: 'ri-global-line', label: 'Sovereign Funds', examples: 'FONSIS (Senegal), FONSIS equivalent', kpi: 'Strategic equity participation' },
        { icon: 'ri-user-star-line', label: 'Business Angels / Diaspora', examples: 'African Diaspora Network, Angels4Africa', kpi: 'Seed to Series A, mentoring' },
      ]
    : [
        { icon: 'ri-funds-line', label: 'Fonds PE/VC', examples: 'Partech Africa, Orange Ventures, Verod Capital', kpi: 'Ticket equity 500K€ – 10M€' },
        { icon: 'ri-building-2-line', label: 'DFI (Finance Développement)', examples: 'BIDC, BOAD, IFC, Proparco, DEG, FMO', kpi: 'Dette & equity, exigences ESG' },
        { icon: 'ri-leaf-line', label: 'Fonds Impact', examples: 'Symbiotics, responsAbility, OPIC, MCE Social Capital', kpi: 'Focus impact social & climatique' },
        { icon: 'ri-bank-line', label: 'Banques Commerciales', examples: 'Ecobank, Orabank, Bridge Bank, CBAO', kpi: 'Dette senior, financement mezzanine' },
        { icon: 'ri-global-line', label: 'Fonds Souverains', examples: 'FONSIS (Sénégal), équivalents régionaux', kpi: 'Participation stratégique au capital' },
        { icon: 'ri-user-star-line', label: 'Business Angels / Diaspora', examples: 'African Diaspora Network, Angels4Africa', kpi: 'Seed à Series A, mentoring' },
      ];

  const DELIVERABLES = isEn
    ? ['Investment Readiness diagnostic report', 'Investor pitch deck (20 slides)', '5-year financial model (audited methodology)', 'Executive teaser (3 pages)', 'Information memorandum (40–80 pages)', 'Structured data room', 'Qualified investor shortlist + scoring', 'Term sheet negotiation support']
    : ['Rapport de diagnostic Investment Readiness', 'Pitch deck investisseurs (20 slides)', 'Modèle financier 5 ans (méthodologie auditée)', 'Teaser exécutif (3 pages)', 'Mémorandum d\'information (40–80 pages)', 'Data room structurée', 'Shortlist investisseurs qualifiés + scoring', 'Accompagnement négociation term sheet'];

  const PROBLEMS = isEn
    ? [
        'Business plan not investor-grade — rejected at first screening',
        'Undocumented or unrealistic valuation (no DCF/comparable)',
        'Governance gaps that block institutional investor due diligence',
        'No qualified access to PE/VC, DFI and impact fund networks',
      ]
    : [
        'Business plan non investor-grade — rejeté au premier screening',
        'Valorisation non documentée ou irréaliste (pas de DCF/comparable)',
        'Lacunes de gouvernance qui bloquent la due diligence des investisseurs institutionnels',
        'Aucun accès qualifié aux réseaux PE/VC, DFI et fonds impact',
      ];

  const ANSWERS = isEn
    ? [
        'Complete Investment Readiness diagnostic on 5 dimensions',
        'Investor-grade dossier aligned with IFC/AfDB standards',
        'Access to our network of 20+ active investors across Africa',
        'Full investor due diligence simulation before actual process',
      ]
    : [
        'Diagnostic complet Investment Readiness sur 5 dimensions',
        'Dossier investor-grade aligné sur les standards IFC/BAD',
        'Accès à notre réseau de 20+ investisseurs actifs en Afrique',
        'Simulation complète de due diligence investisseur avant le vrai processus',
      ];

  const RELATED = isEn
    ? [
        { title: 'Investment Readiness & Due Diligence Excellence™', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Secure your investments from the start' },
        { title: 'Strategic & ESG Advisory', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'ESG positioning for DFI eligibility' },
        { title: 'Governance & Compliance', slug: 'transformation-digitale', icon: 'ri-shield-check-line', kpi: 'Governance aligned with investor expectations' },
      ]
    : [
        { title: 'Investment Readiness & Due Diligence Excellence™', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Sécurisez vos investissements dès le départ' },
        { title: 'Conseil Stratégique & ESG', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'Positionnement ESG pour l\'éligibilité DFI' },
        { title: 'Gouvernance & Conformité', slug: 'transformation-digitale', icon: 'ri-shield-check-line', kpi: 'Gouvernance alignée sur les attentes investisseurs' },
      ];

  const faqItems = IR_SCHEMA['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Investment Readiness & Fundraising Africa™ | Diagnostic → IR | KHEPRA'
          : 'Investment Readiness & Levée de Fonds Africa™ | Diagnostic → IR | KHEPRA'}
        description={isEn
          ? 'Investment Readiness for startups, SMEs and institutions in Francophone Africa. Free Bankability diagnostic (8 min), investor-grade pitch deck, 5-year financial model, PE/VC & DFI matchmaking, Investor Relations on tailored mission. 120M€+ raised. UEMOA/CEMAC.'
          : 'Investment Readiness pour startups, PME et institutions en Afrique francophone. Diagnostic de Bancabilité gratuit (8 min), pitch deck investor-grade, modèle financier 5 ans, mise en relation PE/VC & DFI, mission Investor Relations sur devis. 120M€+ levés. UEMOA/CEMAC.'}
        keywords={isEn
          ? 'investment readiness Africa, fundraising Africa, bankability diagnostic Africa, investor relations Africa, PE VC DFI matchmaking Africa, investor pitch deck UEMOA, capital raising CEMAC, KHEPRA EXPERTS investment readiness'
          : 'investment readiness Afrique, levée de fonds Afrique, diagnostic bancabilité Afrique, mission investor relations sur devis, mise en relation PE VC DFI Afrique, pitch deck investisseurs UEMOA, levée capital CEMAC, KHEPRA EXPERTS investment readiness'}
        ogImage="https://readdy.ai/api/search-image?query=African%20startup%20founders%20and%20investors%20meeting%20in%20modern%20boardroom%20reviewing%20financial%20projections%20pitch%20deck%20and%20investment%20memorandum%20on%20large%20screen%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20style%2C%20confident%20professional%20atmosphere&width=1440&height=900&seq=investment-readiness-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/levee-de-fonds"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={IR_SCHEMA}
        hreflangLinks={buildHreflang('/services/levee-de-fonds')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Investment Readiness & Levée de Fonds Africa™' : 'Investment Readiness & Levée de Fonds Africa™', path: '/services/levee-de-fonds' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20startup%20founders%20and%20investors%20meeting%20in%20modern%20boardroom%20reviewing%20financial%20projections%20pitch%20deck%20and%20investment%20memorandum%20on%20large%20screen%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20style%2C%20confident%20professional%20atmosphere&width=1440&height=900&seq=investment-readiness-hero-green&orientation=landscape"
              alt={isEn ? 'Investment Readiness KHEPRA EXPERTS Africa' : 'Investment Readiness KHEPRA EXPERTS Afrique'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#c9a227' }}>
                    {isEn ? 'Investment Readiness & Levée de Fonds Africa™' : 'Investment Readiness & Levée de Fonds Africa™'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Prepare your company.' : 'Préparez votre entreprise.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'Win investor confidence.' : 'Gagnez la confiance des investisseurs.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'From readiness diagnostic to data room and investor matching — we build your complete investment file and connect you to the right PE/VC, DFI and impact funds active in Francophone Africa.'
                    : 'Du diagnostic de readiness à la data room et la mise en relation investisseurs — nous construisons votre dossier de levée complet et vous connectons aux bons fonds PE/VC, DFI et impact actifs en Afrique francophone.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '€120M+ raised · +60% success rate · 20+ active investors PE/VC, DFI, impact funds'
                      : '120M€+ levés · +60% taux de succès · 20+ investisseurs actifs PE/VC, DFI, fonds impact'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-ir');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Request Readiness Diagnostic' : 'Demander un diagnostic readiness'}
                  </button>
                  <button
                    onClick={() => navigate('/tools/investment-readiness')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-bar-chart-grouped-line" />
                    {isEn ? 'Free Readiness Score' : 'Score Readiness Gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {OUTCOMES.map((o, i) => (
                    <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${o.accent}18` }}>
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: `${o.accent}15` }}>
                        <i className={`${o.icon} text-base`} style={{ color: o.accent }} />
                      </div>
                      <div className="font-playfair text-2xl font-bold leading-none mb-1" style={{ color: o.accent }}>{o.value}</div>
                      <div className="text-xs font-semibold text-white mb-0.5">{o.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{o.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.18)' }}>
                  <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Duration: 90 to 180 days' : 'Durée : 90 à 180 jours'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'From diagnostic to first investor meeting' : 'Du diagnostic au premier rendez-vous investisseur'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME / TENSION ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Why 70% of funding applications fail' : 'Pourquoi 70% des dossiers de levée échouent'}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'A viable company is not' : 'Une bonne entreprise n\'est pas'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'automatically investable.' : 'automatiquement investissable.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Institutional investors (PE/VC, DFIs, impact funds) apply standardized screening processes. An incomplete file, a governance gap or a poorly documented valuation is enough to be eliminated in the first review — regardless of the actual quality of the business.'
                    : 'Les investisseurs institutionnels (PE/VC, DFI, fonds impact) appliquent des processus de screening standardisés. Un dossier incomplet, une lacune de gouvernance ou une valorisation mal documentée suffit à être éliminé dès le premier examen — quelle que soit la qualité réelle de l\'entreprise.'}
                </p>
                <div className="space-y-3">
                  {PROBLEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                      <i className="ri-close-circle-line text-lg mt-0.5 flex-shrink-0 text-red-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,162,39,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#c9a227' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>
                      {isEn ? 'The KHEPRA approach' : "L'approche KHEPRA"}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'A complete investor-grade package that opens doors.' : 'Un package investor-grade complet qui ouvre les portes.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(34,160,90,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#22a05a' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/tools/investment-readiness')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-bar-chart-grouped-line" />
                    {isEn ? 'Take the free readiness score' : 'Faire le score readiness gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5 DIMENSIONS DE READINESS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our diagnostic framework' : 'Notre cadre de diagnostic'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight mb-4">
                {isEn ? 'Investment Readiness on 4 key dimensions.' : 'Investment Readiness sur 4 dimensions clés.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Our scoring methodology aligns with criteria used by institutional investors: IFC, BIDC, Proparco, DEG, Partech Africa and African PE/VC funds.'
                  : 'Notre méthodologie de scoring s\'aligne sur les critères utilisés par les investisseurs institutionnels : IFC, BIDC, Proparco, DEG, Partech Africa et fonds PE/VC africains.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {READINESS_DIMENSIONS.map((dim, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                    <i className={`${dim.icon} text-lg`} style={{ color: '#c9a227' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-4 line-clamp-2" title={dim.title}>{dim.title}</h3>
                  <ul className="space-y-2">
                    {dim.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,160,90,0.12)' }}>
                          <i className="ri-check-line text-[9px]" style={{ color: '#22a05a' }} />
                        </div>
                        <span className="text-xs text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESSUS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our methodology' : 'Notre méthodologie'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                {isEn ? '4 phases to a successful fundraise.' : '4 phases vers une levée de fonds réussie.'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PHASES.map((phase, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all relative">
                  <div className="absolute top-5 right-5 text-4xl font-black leading-none select-none" style={{ color: 'rgba(0,0,0,0.04)' }}>{phase.num}</div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: `${phase.accent}12`, border: `1px solid ${phase.accent}25` }}>
                    <i className={`${phase.icon} text-lg`} style={{ color: phase.accent }} />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3" style={{ background: `${phase.accent}12`, color: phase.accent }}>
                    {phase.duration}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={phase.title}>{phase.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{phase.desc}</p>
                  <div className="flex items-start gap-2 pt-4 border-t border-gray-100">
                    <i className="ri-file-text-line text-sm mt-0.5 flex-shrink-0" style={{ color: phase.accent }} />
                    <span className="text-xs text-gray-600 font-medium">{phase.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TYPES D'INVESTISSEURS + LIVRABLES ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Investor network' : 'Réseau investisseurs'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'We connect you to the right investors' : 'Nous vous connectons aux bons investisseurs'}
                </h2>
                <div className="space-y-3">
                  {INVESTOR_TYPES.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all bg-white">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 mt-0.5">
                        <i className={`${s.icon} text-lg text-gray-500`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{s.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.examples}</p>
                        <p className="text-xs font-semibold mt-1" style={{ color: '#c9a227' }}>{s.kpi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Deliverables included' : 'Livrables inclus'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'A complete investor-grade package' : 'Un package investor-grade complet'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#c9a227' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 3 to 9 months' : 'Durée : 3 à 9 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Fixed retainer + success fee model' : 'Modèle retainer fixe + success fee'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tools/investment-readiness')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-bar-chart-grouped-line" />
                    {isEn ? 'Free Investment Readiness Score' : 'Score Investment Readiness Gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — Results in 10 min — Immediate action plan' : 'Gratuit — Résultats en 10 min — Plan d\'action immédiat'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Investment Readiness & Levée de Fonds Africa™' : 'Investment Readiness & Levée de Fonds Africa™'} />

        {/* ── GUIDE INVESTMENT READINESS — Lead Magnet CTA ── */}
        <InlineLeadMagnet context="investment-readiness" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="levee-de-fonds" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {isEn ? 'Related services' : 'Services connexes'}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#c9a227' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#c9a227' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-ir">
          <PremiumServiceCTA
            formId="service-investment-readiness"
            formUrl="https://readdy.ai/api/form/d7rjfd6l0bai2p3hap5g"
            badge={isEn ? 'Take action now' : 'Passez à l\'action maintenant'}
            title={isEn ? 'Ready to raise funds?' : 'Prêt à lever des fonds ?'}
            subtitle={isEn
              ? 'Discuss your Investment Readiness with a senior expert. Free diagnostic, no commitment. We\'ll tell you exactly where you stand.'
              : 'Discutez de votre Investment Readiness avec un expert senior. Diagnostic gratuit, sans engagement. On vous dit exactement où vous en êtes.'}
            primaryBtnText={isEn ? 'Request a Readiness Diagnostic' : 'Demander un diagnostic readiness'}
            secondaryBtnText={isEn ? 'Free Readiness Score' : 'Score Readiness Gratuit'}
            secondaryBtnAction="diagnostic-flash"
            variant="dark"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/levee-de-fonds/`}
            title={isEn ? 'Investment Readiness & Levée de Fonds Africa™ — KHEPRA EXPERTS' : 'Investment Readiness & Levée de Fonds Africa™ — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}



