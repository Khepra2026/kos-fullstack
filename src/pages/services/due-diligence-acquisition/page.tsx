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

const DUE_DILIGENCE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/due-diligence-acquisition#service`,
      name: 'Investment Readiness & Due Diligence Excellence™',
      description: 'Architecture 4 niveaux pour investisseurs en Afrique francophone : Diagnostic de Bancabilité gratuit, Due Diligence Vendor, Package Investment Readiness et Abonnement Investor Relations. 97% red flags détectés.',
      url: `${SITE_URL}/services/due-diligence-acquisition`,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest" },
        { '@type': 'Place', name: 'Afrique Centrale' },
      ],
      serviceType: 'Due Diligence',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Types de Due Diligence',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Financière', description: 'Analyse approfondie des états financiers, qualité des revenus, dette cachée et working capital.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Juridique & Réglementaire', description: 'Conformité OHADA, BCEAO, COBAC, titres fonciers, litiges et passifs sociaux.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Technique & Opérationnelle', description: 'Audit des actifs, chaîne de valeur, gouvernance et maturité digitale.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence ESG', description: 'Conformité ESG, risques environnementaux, impact social et gouvernance.' } },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quelle est la durée d\'une due diligence ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La durée varie de 4 à 8 semaines selon la complexité de la cible et le périmètre demandé. Une due diligence financière seule peut être réalisée en 3 semaines. Une mission pluridisciplinaire complète avec due diligence juridique, technique et ESG nécessite 6 à 8 semaines.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment garantissez-vous la confidentialité ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La confidentialité est notre fondement. Nous signons un NDA avant tout échange. Nos consultants sont soumis à des clauses de confidentialité strictes. Les données sont traitées de manière sécurisée et les rapports sont remis sous format confidentiel avec watermark.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quel est le coût d\'une due diligence en Afrique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les honoraires sont adaptés à la taille de la cible, à la complexité du périmètre et aux types de due diligence requis (financière, juridique, technique, ESG). Nous proposons un devis personnalisé et confidentiel sous 48h, sans engagement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Intervenez-vous en consortium avec des cabinets locaux ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, en partenariat avec Meba K. Consulting, nous combinons expertise régionale et méthodologie internationale. Cette approche consortium garantit une couverture juridique locale solide tout en maintenant les standards de reporting attendus par les investisseurs internationaux.',
          },
        },
      ],
    },
  ],
};

export default function DueDiligenceAcquisitionPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '€500M+', label: 'Assets under review', sub: 'transactions in 15 countries', icon: 'ri-funds-line', accent: '#c9a227' },
        { value: '4–8', label: 'Weeks average', sub: 'for a complete mission', icon: 'ri-time-line', accent: '#22a05a' },
        { value: '97%', label: 'Red flags detected', sub: 'before closing', icon: 'ri-shield-check-line', accent: '#c9a227' },
        { value: 'Big Four', label: 'Methodology', sub: 'adapted to Africa', icon: 'ri-award-line', accent: '#22a05a' },
      ]
    : [
        { value: '500M€+', label: 'D\'actifs passés en revue', sub: 'transactions dans 15 pays', icon: 'ri-funds-line', accent: '#c9a227' },
        { value: '4–8', label: 'Semaines en moyenne', sub: 'pour une mission complète', icon: 'ri-time-line', accent: '#22a05a' },
        { value: '97%', label: 'De red flags détectés', sub: 'avant le closing', icon: 'ri-shield-check-line', accent: '#c9a227' },
        { value: 'Big Four', label: 'Méthodologie', sub: 'adaptée à l\'Afrique', icon: 'ri-award-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-search-eye-line', title: 'Preparation & Scoping', duration: '1 week', desc: 'Definition of the DD scope, information request list (IDR), data room structuring, and signing of confidentiality agreements.', deliverable: 'DD protocol + IDR list + NDA', accent: '#c9a227' },
        { num: '02', icon: 'ri-file-list-3-line', title: 'Document Analysis', duration: '2–3 weeks', desc: 'In-depth review of financial, legal and operational documents. Interviews with management and key operational managers.', deliverable: 'Preliminary findings report', accent: '#22a05a' },
        { num: '03', icon: 'ri-stethoscope-line', title: 'Fieldwork & Validation', duration: '2–3 weeks', desc: 'On-site due diligence, asset verification, process observation, third-party confirmation and external data cross-checks.', deliverable: 'Validated findings + red flags', accent: '#c9a227' },
        { num: '04', icon: 'ri-draft-line', title: 'Reporting & Negotiation', duration: '1–2 weeks', desc: 'Drafting of the integrated DD report, risk matrix, negotiation recommendations and presentation to the investment committee.', deliverable: 'Integrated DD report + risk matrix', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-search-eye-line', title: 'Préparation & Cadrage', duration: '1 semaine', desc: 'Définition du périmètre DD, liste de demande d\'informations (IDR), structuration de la data room et signature des accords de confidentialité.', deliverable: 'Protocole DD + liste IDR + NDA', accent: '#c9a227' },
        { num: '02', icon: 'ri-file-list-3-line', title: 'Analyse documentaire', duration: '2–3 semaines', desc: 'Revue approfondie des documents financiers, juridiques et opérationnels. Entretiens avec la direction et les responsables clés.', deliverable: 'Rapport de constats préliminaires', accent: '#22a05a' },
        { num: '03', icon: 'ri-stethoscope-line', title: 'Validation terrain', duration: '2–3 semaines', desc: 'Due diligence sur site, vérification des actifs, observation des processus, confirmations tierces et recoupements externes.', deliverable: 'Constats validés + red flags', accent: '#c9a227' },
        { num: '04', icon: 'ri-draft-line', title: 'Rapport & Négociation', duration: '1–2 semaines', desc: 'Rédaction du rapport DD intégré, matrice des risques, recommandations de négociation et présentation au comité d\'investissement.', deliverable: 'Rapport DD intégré + matrice risques', accent: '#22a05a' },
      ];

  const DD_TYPES = isEn
    ? [
        {
          icon: 'ri-line-chart-line',
          title: 'Financial Due Diligence',
          desc: 'In-depth analysis of financial statements, revenue quality, hidden debt, working capital requirements and cash flow sustainability.',
          deliverables: ['Normalized financial analysis', 'Working capital & CAPEX assessment', 'Hidden debt & off-balance sheet review', 'Financial projections & sensitivity analysis'],
        },
        {
          icon: 'ri-file-shield-2-line',
          title: 'Legal & Regulatory DD',
          desc: 'OHADA compliance, BCEAO/COBAC licensing, land titles, litigation, employment contracts and social liabilities.',
          deliverables: ['Regulatory compliance matrix', 'Title & property audit', 'Litigation & contingent liability map', 'Employment & social audit'],
        },
        {
          icon: 'ri-settings-3-line',
          title: 'Technical & Operational DD',
          desc: 'Audit of assets, value chain, production capacity, IT systems, governance maturity and digital readiness.',
          deliverables: ['Asset & infrastructure audit', 'Value chain & operations review', 'IT systems & cybersecurity assessment', 'Governance maturity scorecard'],
        },
        {
          icon: 'ri-earth-line',
          title: 'ESG Due Diligence',
          desc: 'Environmental, social and governance compliance, climate risk assessment, social impact and community relations.',
          deliverables: ['ESG compliance gap analysis', 'Environmental risk assessment', 'Social impact & community mapping', 'Governance & ethics review'],
        },
      ]
    : [
        {
          icon: 'ri-line-chart-line',
          title: 'Due Diligence Financière',
          desc: 'Analyse approfondie des états financiers, qualité des revenus, dette cachée, besoin en fonds de roulement et soutenabilité du cash-flow.',
          deliverables: ['Analyse financière normalisée', 'Évaluation du BFR & CAPEX', 'Revue dette cachée & hors bilan', 'Projections financières & analyse de sensibilité'],
        },
        {
          icon: 'ri-file-shield-2-line',
          title: 'Due Diligence Juridique & Réglementaire',
          desc: 'Conformité OHADA, agrément BCEAO/COBAC, titres fonciers, litiges, contrats de travail et passifs sociaux.',
          deliverables: ['Matrice de conformité réglementaire', 'Audit titres & propriété', 'Cartographie litiges & passifs', 'Audit social & emploi'],
        },
        {
          icon: 'ri-settings-3-line',
          title: 'Due Diligence Technique & Opérationnelle',
          desc: 'Audit des actifs, chaîne de valeur, capacité de production, systèmes informatiques, maturité de gouvernance et readiness digitale.',
          deliverables: ['Audit actifs & infrastructure', 'Revue chaîne de valeur & opérations', 'Évaluation SI & cybersécurité', 'Scorecard maturité gouvernance'],
        },
        {
          icon: 'ri-earth-line',
          title: 'Due Diligence ESG',
          desc: 'Conformité ESG environnementale, sociale et de gouvernance, évaluation des risques climatiques, impact social et relations communautaires.',
          deliverables: ['Analyse écart conformité ESG', 'Évaluation risques environnementaux', 'Impact social & cartographie communautaire', 'Revue gouvernance & éthique'],
        },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-bank-line', label: 'Banks & MFIs', kpi: 'Portfolio quality & regulatory compliance' },
        { icon: 'ri-building-line', label: 'Agro-industry', kpi: 'Asset valuation & supply chain' },
        { icon: 'ri-store-2-line', label: 'Distribution & Retail', kpi: 'Working capital & market positioning' },
        { icon: 'ri-building-4-line', label: 'Manufacturing', kpi: 'Asset integrity & operational efficiency' },
        { icon: 'ri-hospital-line', label: 'Health & Services', kpi: 'Regulatory compliance & governance' },
        { icon: 'ri-smartphone-line', label: 'Fintech & Telecom', kpi: 'Tech stack & scalability audit' },
      ]
    : [
        { icon: 'ri-bank-line', label: 'Banques & IMF', kpi: 'Qualité portefeuille & conformité réglementaire' },
        { icon: 'ri-building-line', label: 'Agro-industrie', kpi: 'Valorisation actifs & chaîne d\'approvisionnement' },
        { icon: 'ri-store-2-line', label: 'Distribution & Retail', kpi: 'BFR & positionnement marché' },
        { icon: 'ri-building-4-line', label: 'Industrie manufacturière', kpi: 'Intégrité actifs & efficacité opérationnelle' },
        { icon: 'ri-hospital-line', label: 'Santé & Services', kpi: 'Conformité réglementaire & gouvernance' },
        { icon: 'ri-smartphone-line', label: 'Fintech & Telecom', kpi: 'Audit tech stack & scalabilité' },
      ];

  const PROBLEMS = isEn
    ? [
        'Incomplete financial information and poor data reliability',
        'Hidden debts and off-balance sheet commitments',
        'Regulatory non-compliance not identified before acquisition',
        'Overvaluation of assets and underestimation of liabilities',
      ]
    : [
        'Informations financières incomplètes et fiabilité des données faible',
        'Dettes cachées et engagements hors bilan non déclarés',
        'Non-conformité réglementaire non identifiée avant acquisition',
        'Survalorisation des actifs et sous-estimation des passifs',
      ];

  const ANSWERS = isEn
    ? [
        'Rigorous methodology inspired by Big Four, adapted to African realities',
        'Multi-disciplinary team: finance, law, operations, ESG',
        'Direct access to our consortium partner Meba K. Consulting for local legal expertise',
        'Integrated report with risk matrix and negotiation recommendations',
      ]
    : [
        'Méthodologie rigoureuse inspirée des Big Four, adaptée aux réalités africaines',
        'Équipe pluridisciplinaire : finance, droit, opérations, ESG',
        'Accès direct à notre partenaire consortium Meba K. Consulting pour l\'expertise juridique locale',
        'Rapport intégré avec matrice des risques et recommandations de négociation',
      ];

  const RELATED = isEn
    ? [
        { title: 'Investment Readiness & Levée de Fonds Africa™', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Investor-grade business plan & pitch deck' },
        { title: 'Strategic Advisory', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'Actionable strategic plan post-acquisition' },
        { title: 'Corporate Governance', slug: 'gouvernance-entreprise', icon: 'ri-shield-check-line', kpi: 'Governance restructuring post-deal' },
      ]
    : [
        { title: 'Investment Readiness & Levée de Fonds Africa™', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Business plan & pitch deck investor-grade' },
        { title: 'Conseil Stratégique', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'Plan stratégique actionnable post-acquisition' },
        { title: 'Gouvernance d\'Entreprise', slug: 'gouvernance-entreprise', icon: 'ri-shield-check-line', kpi: 'Restructuration gouvernance post-deal' },
      ];

  const faqItems = DUE_DILIGENCE_SCHEMA['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Investment Readiness & Due Diligence Excellence™ | Diagnostic → Subscription | KHEPRA'
          : 'Due Diligence & Investment Readiness | Diagnostic → Abonnement | KHEPRA'}
        description={isEn
          ? '4-level progressive architecture for investors in Francophone Africa: Free Bankability Diagnostic (8 min), Due Diligence Vendor (integrated report), Investment Readiness Package, and Investor Relations Subscription. 97% red flags detected, €500M+ reviewed. UEMOA/CEMAC.'
          : 'Architecture 4 niveaux pour investisseurs en Afrique francophone : Diagnostic de Bancabilité gratuit (8 min), Due Diligence Vendor (rapport intégré), Package Investment Readiness et Abonnement Investor Relations. 97% red flags détectés, 500M€+ en revue. UEMOA/CEMAC.'}
        keywords={isEn
          ? 'investment readiness Africa, due diligence excellence Africa, bankability diagnostic Africa, investor relations Africa, financial legal ESG due diligence UEMOA, pre-investment audit CEMAC, specialized advisory investors Africa, KHEPRA EXPERTS due diligence'
          : 'investment readiness Afrique, due diligence excellence Afrique, diagnostic bancabilité Afrique, investor relations Afrique sur devis, due diligence financière juridique ESG UEMOA, audit pré-investissement CEMAC, cabinet conseil investisseurs Afrique, KHEPRA EXPERTS due diligence'}
        ogImage="https://readdy.ai/api/search-image?query=Professional%20African%20investment%20team%20conducting%20due%20diligence%20review%20in%20premium%20boardroom%20with%20confidential%20documents%20financial%20statements%20and%20risk%20matrices%20on%20screens%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20style&width=1440&height=900&seq=due-diligence-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/due-diligence-acquisition"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={DUE_DILIGENCE_SCHEMA}
        hreflangLinks={buildHreflang('/services/due-diligence-acquisition')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Investment Readiness & Due Diligence Excellence™' : 'Investment Readiness & Due Diligence Excellence™', path: '/services/due-diligence-acquisition' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20African%20investment%20team%20conducting%20due%20diligence%20review%20in%20premium%20boardroom%20with%20confidential%20documents%20financial%20statements%20and%20risk%20matrices%20on%20screens%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20style&width=1440&height=900&seq=due-diligence-hero-green&orientation=landscape"
              alt={isEn ? 'Investment Readiness & Due Diligence Excellence™ KHEPRA EXPERTS' : 'Investment Readiness & Due Diligence Excellence™ KHEPRA EXPERTS'}
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
                    {isEn ? 'Investment Readiness & Due Diligence Excellence™' : 'Investment Readiness & Due Diligence Excellence™'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Know what you buy.' : 'Sachez ce que vous achetez.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'Before you invest.' : 'Avant d\'investir.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'Specialized due diligence for investors and acquirers in Francophone Africa. Financial, legal, technical and ESG due diligence with Big Four methodology adapted to UEMOA/CEMAC.'
                    : 'Due diligence spécialisée pour investisseurs et acquéreurs en Afrique francophone. DD financière, juridique, technique et ESG avec méthodologie Big Four adaptée à l\'UEMOA/CEMAC.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '€500M+ under review · 97% of red flags detected before closing · 15 countries UEMOA/CEMAC'
                      : '500M€+ passés en revue · 97% des red flags détectés avant closing · 15 pays UEMOA/CEMAC'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-dd');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Request a DD quote' : 'Demander un devis DD'}
                  </button>
                  <button
                    onClick={() => navigate('/case-studies')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {isEn ? 'View our transactions' : 'Voir nos transactions'}
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
                  <i className="ri-shield-check-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Confidentiality guaranteed' : 'Confidentialité garantie'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'NDA signed before any exchange' : 'NDA signé avant tout échange'}</p>
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
                    {isEn ? 'Why acquisitions fail' : 'Pourquoi les acquisitions échouent'}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'A good target is not enough.' : 'Une bonne cible ne suffit pas.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'You need to verify.' : 'Il faut vérifier.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Most acquisition failures in Africa are not due to the quality of the target, but to insufficient due diligence. A hidden debt, an unlicensed asset, or an underestimated liability can destroy the value of the deal.'
                    : 'La plupart des échecs d\'acquisition en Afrique ne sont pas dus à la qualité de la cible, mais à une due diligence insuffisante. Une dette cachée, un actif non agréé, ou un passif sous-estimé peut détruire la valeur de l\'opération.'}
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
                    {isEn ? 'A report you can take to your investment committee.' : 'Un rapport présentable à votre comité d\'investissement.'}
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
                    onClick={() => {
                      const el = document.getElementById('contact-dd');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Request a quote' : 'Demander un devis'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TYPES DE DD ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our expertise' : 'Notre expertise'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight mb-4">
                {isEn ? '4 types of due diligence, one integrated report.' : '4 types de due diligence, un rapport intégré.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Each mission is tailored to the specific needs of the investor and the nature of the target. Our multidisciplinary teams cover all aspects of the transaction.'
                  : 'Chaque mission est adaptée aux besoins spécifiques de l\'investisseur et à la nature de la cible. Nos équipes pluridisciplinaires couvrent tous les aspects de la transaction.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {DD_TYPES.map((dd, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                    <i className={`${dd.icon} text-lg`} style={{ color: '#c9a227' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={dd.title}>{dd.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{dd.desc}</p>
                  <div className="border-t border-gray-50 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {isEn ? 'Deliverables' : 'Livrables'}
                    </p>
                    <ul className="space-y-1.5">
                      {dd.deliverables.map((d, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,39,0.12)' }}>
                            <i className="ri-check-line text-[10px]" style={{ color: '#c9a227' }} />
                          </div>
                          <span className="text-xs text-gray-600">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                {isEn ? '4 phases, from preparation to investment committee.' : '4 phases, de la préparation au comité d\'investissement.'}
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

        {/* ── SECTEURS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {isEn ? 'Sectors covered' : 'Secteurs couverts'}
              </span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
              {isEn ? 'We cover all key sectors in Francophone Africa' : 'Nous couvrons tous les secteurs clés en Afrique francophone'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all bg-white">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0">
                    <i className={`${s.icon} text-lg text-gray-500`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{s.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.kpi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONSORTIUM ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl p-8 lg:p-10 border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Consortium' : 'Consortium'}
                </span>
              </div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                {isEn ? 'KHEPRA EXPERTS + Meba K. Consulting' : 'KHEPRA EXPERTS + Meba K. Consulting'}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-3xl">
                {isEn
                  ? 'For complex transactions, we combine our financial and strategic expertise with the legal and regulatory expertise of Meba K. Consulting. This consortium approach ensures comprehensive coverage of all transaction dimensions with standards expected by international investors.'
                  : 'Pour les transactions complexes, nous combinons notre expertise financière et stratégique avec l\'expertise juridique et réglementaire de Meba K. Consulting. Cette approche consortium garantit une couverture complète de toutes les dimensions de la transaction avec les standards attendus par les investisseurs internationaux.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/partenaires"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                >
                  <i className="ri-team-line" />
                  {isEn ? 'Discover our partners' : 'Découvrir nos partenaires'}
                </Link>
                <a
                  href="https://mebakconsulting.com/public/about"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white"
                  style={{ color: '#6b7280', border: '1px solid #e5e7eb' }}
                >
                  <i className="ri-external-link-line" />
                  Meba K. Consulting
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Investment Readiness & Due Diligence Excellence™' : 'Investment Readiness & Due Diligence Excellence™'} />

        {/* ── GUIDE DUE DILIGENCE — Lead Magnet CTA ── */}
        <InlineLeadMagnet context="due-diligence" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="due-diligence-acquisition" />

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

        {/* ── CTA FINAL avec formulaire ── */}
        <div id="contact-dd">
          <PremiumServiceCTA
            formId="service-due-diligence"
            formUrl="https://readdy.ai/api/form/d7rjfd6l0bai2p3hap4g"
            badge={isEn ? 'Take action now' : 'Passez à l\'action maintenant'}
            title={isEn ? 'Ready to secure your transaction?' : 'Prêt à sécuriser votre transaction ?'}
            subtitle={isEn
              ? 'Discuss your due diligence needs with a senior expert. Confidential quote on request, no commitment.'
              : 'Discutez de vos besoins en due diligence avec un expert senior. Devis confidentiel sur demande, sans engagement.'}
            primaryBtnText={isEn ? 'Request a DD quote' : 'Demander un devis DD'}
            secondaryBtnText={isEn ? 'View case studies' : 'Voir les études de cas'}
            secondaryBtnAction="case-studies"
            variant="gradient"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/due-diligence-acquisition/`}
            title={isEn ? 'Investment Readiness & Due Diligence Excellence™ — KHEPRA EXPERTS' : 'Investment Readiness & Due Diligence Excellence™ — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}