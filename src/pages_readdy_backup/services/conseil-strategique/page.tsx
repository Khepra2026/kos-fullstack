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

const ESG_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/conseil-strategique#service`,
      name: 'Conseil Stratégique & ESG Advisory',
      description: 'Conseil stratégique et ESG Advisory pour investisseurs, entreprises et institutions en Afrique francophone. Alignement standards IFC, GRI, ISSB, SASB, BCEAO ESG. Plans 3–5 ans, gouvernance et positionnement investisseurs institutionnels.',
      url: `${SITE_URL}/services/conseil-strategique`,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      serviceType: 'Strategic Advisory & ESG Consulting',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que l\'ESG Advisory pour une entreprise africaine ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'L\'ESG Advisory consiste à accompagner une organisation dans l\'intégration des critères Environnement, Social et Gouvernance dans sa stratégie et ses opérations. En Afrique francophone, cela inclut l\'alignement avec les Normes de Performance IFC (PS 1-8), les standards GRI, ISSB S1/S2, SASB et les exigences ESG de la BCEAO et du COBAC. Un positionnement ESG solide est indispensable pour accéder aux financements DFI (BOAD, IFC, Proparco, DEG).',
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi les DFI (BOAD, IFC, Proparco) exigent-ils une conformité ESG ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les institutions de financement du développement appliquent les Normes de Performance IFC (PS 1-8) comme condition d\'accès à leurs financements. Ces normes couvrent l\'évaluation des risques environnementaux et sociaux, la préservation de la biodiversité, les droits des communautés et des travailleurs, et la divulgation d\'informations. Sans plan de gestion environnementale et sociale (PGES), les projets ne peuvent obtenir de financement DFI.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre GRI, ISSB et IFC pour l\'ESG en Afrique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le GRI (Global Reporting Initiative) est le standard de référence pour la divulgation d\'informations ESG. Les normes ISSB S1 (informations financières générales) et S2 (risques climatiques) sont les nouvelles normes comptables ESG adoptées par les régulateurs internationaux. Les Normes de Performance IFC (PS 1-8) sont les standards opérationnels exigés par les DFI pour les projets. En Afrique francophone, la BCEAO intègre progressivement ces standards dans ses exigences prudentielles.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien coûte une mission de conseil stratégique ESG en Afrique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Chaque mission est établie sur devis personnalisé en fonction du périmètre et des besoins spécifiques. Nous proposons systématiquement un diagnostic flash gratuit de 30 minutes pour évaluer vos besoins avant tout engagement. Contactez-nous pour une proposition sur mesure.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quel est le lien entre stratégie d\'entreprise et ESG en Afrique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En Afrique francophone, l\'ESG n\'est plus un simple outil de communication. C\'est un impératif stratégique pour accéder aux marchés de capitaux internationaux, aux financements DFI, aux fonds d\'impact et aux partenariats stratégiques. Les entreprises avec un solide positionnement ESG accèdent à des financements moins chers, bénéficient d\'une meilleure réputation et attirent des talents de qualité. Notre approche intègre l\'ESG comme levier de création de valeur, pas comme contrainte.',
          },
        },
      ],
    },
  ],
};

export default function ConseilStrategique() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '+25–40%', label: 'Growth observed', sub: 'from year 1 of execution', icon: 'ri-arrow-up-line', accent: '#22a05a' },
        { value: '90d', label: 'Operational strategic plan', sub: 'Diagnosis to validated roadmap', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '×3', label: 'DFI financing access', sub: 'With ESG-structured file', icon: 'ri-building-2-line', accent: '#22a05a' },
        { value: '6 ESG', label: 'Standards mastered', sub: 'IFC, GRI, ISSB, SASB, TCFD, GIABA', icon: 'ri-leaf-line', accent: '#c9a227' },
      ]
    : [
        { value: '+25–40%', label: 'Croissance observée', sub: 'dès l\'an 1 d\'exécution', icon: 'ri-arrow-up-line', accent: '#22a05a' },
        { value: '90j', label: 'Plan stratégique opérationnel', sub: 'Diagnostic à feuille de route validée', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '×3', label: 'Accès financement DFI', sub: 'Avec dossier structuré ESG', icon: 'ri-building-2-line', accent: '#22a05a' },
        { value: '6 ESG', label: 'Standards maîtrisés', sub: 'IFC, GRI, ISSB, SASB, TCFD, GIABA', icon: 'ri-leaf-line', accent: '#c9a227' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-search-eye-line', title: 'Strategic & ESG Diagnosis', duration: '2–3 weeks', desc: 'SWOT analysis, competitive benchmarking, ESG maturity assessment, DFI financing eligibility audit and identification of the 3 priority growth levers.', deliverable: 'Diagnosis report + ESG maturity score + DFI gap analysis', accent: '#c9a227' },
        { num: '02', icon: 'ri-compass-3-line', title: 'Vision, Positioning & ESG Roadmap', duration: '2–3 weeks', desc: 'Co-creation of the 3–5 year vision, differentiating positioning strategy, ESG integration plan and alignment with IFC/GRI/ISSB standards.', deliverable: 'Vision document + ESG plan + stakeholder mapping', accent: '#22a05a' },
        { num: '03', icon: 'ri-road-map-line', title: 'Multi-year Strategic Plan', duration: '3–4 weeks', desc: 'Strategic plan with ESG objectives, actionable KPIs, quarterly milestones, budget aligned with targets and ESMP (Environmental & Social Management Plan).', deliverable: '3–5 year strategic plan + ESMP + ESG dashboard', accent: '#c9a227' },
        { num: '04', icon: 'ri-rocket-line', title: 'Deployment, Steering & ESG Reporting', duration: '6–12 months', desc: 'Implementation support, quarterly reviews, ESG reporting (GRI/ISSB), DFI investor communications and continuous ESG performance improvement.', deliverable: 'Monthly reporting + quarterly reviews + GRI report', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-search-eye-line', title: 'Diagnostic Stratégique & ESG', duration: '2–3 semaines', desc: 'Analyse SWOT, benchmark concurrentiel, évaluation de la maturité ESG, audit d\'éligibilité aux financements DFI et identification des 3 leviers de croissance prioritaires.', deliverable: 'Rapport diagnostic + score maturité ESG + analyse gaps DFI', accent: '#c9a227' },
        { num: '02', icon: 'ri-compass-3-line', title: 'Vision, Positionnement & Feuille de route ESG', duration: '2–3 semaines', desc: 'Co-construction de la vision à 3–5 ans, stratégie de positionnement différenciant, plan d\'intégration ESG et alignement sur les standards IFC/GRI/ISSB.', deliverable: 'Document de vision + plan ESG + cartographie parties prenantes', accent: '#22a05a' },
        { num: '03', icon: 'ri-road-map-line', title: 'Plan Stratégique Pluriannuel', duration: '3–4 semaines', desc: 'Plan stratégique avec objectifs ESG, KPI actionnables, jalons trimestriels, budget prévisionnel aligné sur les cibles et PGES (Plan de Gestion Environnementale et Sociale).', deliverable: 'Plan stratégique 3–5 ans + PGES + tableau de bord ESG', accent: '#c9a227' },
        { num: '04', icon: 'ri-rocket-line', title: 'Déploiement, Pilotage & Reporting ESG', duration: '6–12 mois', desc: 'Accompagnement à l\'exécution, revues trimestrielles, reporting ESG (GRI/ISSB), communication avec les investisseurs DFI et amélioration continue de la performance ESG.', deliverable: 'Reporting mensuel + revues trimestrielles + rapport GRI', accent: '#22a05a' },
      ];

  const ESG_STANDARDS = isEn
    ? [
        { icon: 'ri-shield-star-line', name: 'IFC Performance Standards', desc: 'PS 1-8 — E&S risk assessment, community rights, biodiversity, cultural heritage. Mandatory for DFI financing (BOAD, IFC, Proparco, DEG).', badge: 'DFI Mandatory', badgeColor: '#22a05a' },
        { icon: 'ri-file-chart-2-line', name: 'GRI Standards', desc: 'Global Reporting Initiative — the reference standard for ESG disclosure. GRI 1 (Foundation), GRI 2 (General Disclosures), GRI 3 (Material Topics).', badge: 'Reporting', badgeColor: '#c9a227' },
        { icon: 'ri-sun-line', name: 'ISSB S1 & S2', desc: 'IFRS Sustainability Disclosure Standards — S1 (general sustainability), S2 (climate risk). New benchmark for institutional investors.', badge: 'IFRS Standard', badgeColor: '#22a05a' },
        { icon: 'ri-bar-chart-2-line', name: 'SASB', desc: 'Sector-specific materiality standards for investors. Used by PE/VC and DFI funds for due diligence screening.', badge: 'Sector-Specific', badgeColor: '#c9a227' },
        { icon: 'ri-cloud-line', name: 'TCFD', desc: 'Task Force on Climate-related Financial Disclosures — climate risk & opportunity framework increasingly required by DFIs and institutional investors.', badge: 'Climate Risk', badgeColor: '#22a05a' },
        { icon: 'ri-bank-line', name: 'BCEAO/COBAC ESG', desc: 'Emerging ESG regulatory requirements from BCEAO and COBAC integrating environmental and social risk management into prudential supervision.', badge: 'Regulatory', badgeColor: '#c9a227' },
      ]
    : [
        { icon: 'ri-shield-star-line', name: 'Normes de Performance IFC', desc: 'PS 1-8 — Évaluation risques E&S, droits des communautés, biodiversité, patrimoine culturel. Obligatoire pour les financements DFI (BOAD, IFC, Proparco, DEG).', badge: 'DFI Obligatoire', badgeColor: '#22a05a' },
        { icon: 'ri-file-chart-2-line', name: 'Standards GRI', desc: 'Global Reporting Initiative — standard de référence pour la divulgation ESG. GRI 1 (fondation), GRI 2 (informations générales), GRI 3 (sujets matériels).', badge: 'Reporting', badgeColor: '#c9a227' },
        { icon: 'ri-sun-line', name: 'ISSB S1 & S2', desc: 'Normes IFRS de divulgation durabilité — S1 (durabilité générale), S2 (risque climatique). Nouveau standard des investisseurs institutionnels.', badge: 'Norme IFRS', badgeColor: '#22a05a' },
        { icon: 'ri-bar-chart-2-line', name: 'SASB', desc: 'Standards de matérialité sectoriels pour investisseurs. Utilisés par les fonds PE/VC et DFI pour le screening en due diligence.', badge: 'Sectoriel', badgeColor: '#c9a227' },
        { icon: 'ri-cloud-line', name: 'TCFD', desc: 'Task Force on Climate-related Financial Disclosures — cadre risques & opportunités climatiques de plus en plus requis par les DFI et investisseurs institutionnels.', badge: 'Risque Climatique', badgeColor: '#22a05a' },
        { icon: 'ri-bank-line', name: 'ESG BCEAO/COBAC', desc: 'Exigences réglementaires ESG émergentes de la BCEAO et COBAC intégrant la gestion des risques environnementaux et sociaux dans la supervision prudentielle.', badge: 'Réglementaire', badgeColor: '#c9a227' },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-funds-line', label: 'PE/VC & Impact Funds', kpi: 'ESG positioning for DFI eligibility' },
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'BCEAO ESG compliance + social performance' },
        { icon: 'ri-building-line', label: 'Industrial Projects', kpi: 'IFC PS 1-8 + ESMP for financing' },
        { icon: 'ri-building-4-line', label: 'Banks & Financial Institutions', kpi: 'COBAC/BCEAO ESG reporting' },
        { icon: 'ri-leaf-line', label: 'Agro-industry & Energy', kpi: 'Environmental assessment + green finance' },
        { icon: 'ri-global-line', label: 'NGOs & Development', kpi: 'Impact measurement + donor reporting' },
      ]
    : [
        { icon: 'ri-funds-line', label: 'Fonds PE/VC & Impact', kpi: 'Positionnement ESG pour l\'éligibilité DFI' },
        { icon: 'ri-hand-coin-line', label: 'Microfinance & IMF', kpi: 'Conformité ESG BCEAO + performance sociale' },
        { icon: 'ri-building-line', label: 'Projets Industriels', kpi: 'NP IFC PS 1-8 + PGES pour financement' },
        { icon: 'ri-building-4-line', label: 'Banques & Institutions Financières', kpi: 'Reporting ESG COBAC/BCEAO' },
        { icon: 'ri-leaf-line', label: 'Agro-industrie & Énergie', kpi: 'Évaluation environnementale + finance verte' },
        { icon: 'ri-global-line', label: 'ONG & Développement', kpi: 'Mesure d\'impact + reporting bailleurs' },
      ];

  const DELIVERABLES = isEn
    ? ['Comprehensive strategic & ESG diagnostic report', '3–5 year strategic plan with ESG objectives', 'Environmental & Social Management Plan (ESMP)', 'ESG maturity scorecard (IFC/GRI/ISSB)', 'DFI financing eligibility analysis', 'GRI reporting framework', 'Quarterly ESG steering dashboard', 'Investor/board ESG communications']
    : ['Rapport de diagnostic stratégique & ESG complet', 'Plan stratégique 3–5 ans avec objectifs ESG', 'Plan de Gestion Environnementale et Sociale (PGES)', 'Scorecard maturité ESG (IFC/GRI/ISSB)', 'Analyse éligibilité aux financements DFI', 'Cadre de reporting GRI', 'Tableau de bord ESG pilotage trimestriel', 'Communications ESG investisseurs/conseil d\'administration'];

  const PROBLEMS = isEn
    ? [
        'No ESG positioning → blocked from DFI (BOAD, IFC, Proparco) financing',
        'No ESMP → industrial projects unable to access international financing',
        'Strategy without ESG vision → missed impact fund and green finance opportunities',
        'No GRI reporting → credibility gap with institutional investors',
      ]
    : [
        'Absence de positionnement ESG → blocage aux financements DFI (BOAD, IFC, Proparco)',
        'Absence de PGES → projets industriels non finançables par les institutions internationales',
        'Stratégie sans vision ESG → opportunités fonds impact et finance verte ratées',
        'Absence de reporting GRI → déficit de crédibilité auprès des investisseurs institutionnels',
      ];

  const ANSWERS = isEn
    ? [
        'Complete ESG diagnostic aligned with IFC, GRI, ISSB and BCEAO standards',
        'ESMP (Environmental & Social Management Plan) compliant with DFI requirements',
        'ESG-integrated strategic plan with measurable performance indicators',
        'GRI/ISSB reporting framework ready for institutional investor disclosure',
      ]
    : [
        'Diagnostic ESG complet aligné sur les standards IFC, GRI, ISSB et BCEAO',
        'PGES (Plan de Gestion Environnementale et Sociale) conforme aux exigences DFI',
        'Plan stratégique intégrant l\'ESG avec indicateurs de performance mesurables',
        'Cadre de reporting GRI/ISSB prêt pour la divulgation aux investisseurs institutionnels',
      ];

  const RELATED = isEn
    ? [
        { title: 'Due Diligence & Acquisition', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'ESG due diligence integrated into acquisition' },
        { title: 'Investment Readiness', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'ESG positioning for fundraising' },
        { title: 'Governance & Compliance', slug: 'transformation-digitale', icon: 'ri-shield-check-line', kpi: 'BCEAO/COBAC regulatory ESG compliance' },
      ]
    : [
        { title: 'Due Diligence & Acquisition', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Due diligence ESG intégrée à l\'acquisition' },
        { title: 'Investment Readiness', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Positionnement ESG pour la levée de fonds' },
        { title: 'Gouvernance & Conformité', slug: 'transformation-digitale', icon: 'ri-shield-check-line', kpi: 'Conformité réglementaire ESG BCEAO/COBAC' },
      ];

  const faqItems = ESG_SCHEMA['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Strategic & ESG Advisory Africa | IFC GRI ISSB | KHEPRA'
          : 'Conseil Stratégique & ESG Advisory | IFC GRI ISSB | KHEPRA'}
        description={isEn
          ? 'Strategic advisory & ESG consulting for investors, companies and institutions in Francophone Africa. IFC PS 1-8, GRI, ISSB S1/S2, SASB standards. DFI financing eligibility. Lomé, Togo.'
          : 'Conseil stratégique et ESG Advisory pour investisseurs, entreprises et institutions en Afrique francophone. Standards IFC PS 1-8, GRI, ISSB S1/S2, SASB. Éligibilité financements DFI. Lomé, Togo.'}
        keywords={isEn
          ? 'ESG advisory Africa, ESG strategy IFC standards, GRI reporting Africa, ISSB sustainability disclosure, BCEAO ESG compliance, DFI financing eligibility Africa, strategic advisory Africa, ESG BOAD IFC Proparco'
          : 'ESG advisory Afrique, stratégie ESG standards IFC, reporting GRI Afrique, divulgation durabilité ISSB, conformité ESG BCEAO, éligibilité financement DFI Afrique, conseil stratégique Afrique, ESG BOAD IFC Proparco'}
        ogImage="https://readdy.ai/api/search-image?query=African%20business%20executives%20reviewing%20ESG%20sustainability%20strategy%20documents%20and%20environmental%20impact%20reports%20in%20premium%20boardroom%20with%20deloitte%20green%20and%20dark%20charcoal%20data%20visualizations%20on%20screens%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1440&height=900&seq=esg-advisory-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/conseil-strategique"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={ESG_SCHEMA}
        hreflangLinks={buildHreflang('/services/conseil-strategique')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Strategic & ESG Advisory' : 'Conseil Stratégique & ESG Advisory', path: '/services/conseil-strategique' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20business%20executives%20reviewing%20ESG%20sustainability%20strategy%20documents%20and%20environmental%20impact%20reports%20in%20premium%20boardroom%20with%20deloitte%20green%20and%20dark%20charcoal%20data%20visualizations%20on%20screens%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%2C%20editorial%20photography%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1440&height=900&seq=esg-advisory-hero-green&orientation=landscape"
              alt={isEn ? 'Strategic & ESG Advisory KHEPRA EXPERTS Africa' : 'Conseil Stratégique & ESG Advisory KHEPRA EXPERTS Afrique'}
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
                    {isEn ? 'Strategic Advisory & ESG Advisory' : 'Conseil Stratégique & ESG Advisory'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'ESG is no longer optional.' : 'L\'ESG n\'est plus une option.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'It\'s your gateway to international capital.' : 'C\'est votre porte d\'entrée aux capitaux internationaux.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We integrate ESG (IFC, GRI, ISSB, SASB) into your corporate strategy to give your organization the credibility it needs to access DFI financing, impact funds and institutional investors in Francophone Africa.'
                    : 'Nous intégrons l\'ESG (IFC, GRI, ISSB, SASB) dans votre stratégie d\'entreprise pour donner à votre organisation la crédibilité nécessaire pour accéder aux financements DFI, fonds impact et investisseurs institutionnels en Afrique francophone.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '6 ESG standards mastered · IFC PS 1-8 · GRI · ISSB S1/S2 · SASB · TCFD · BCEAO/COBAC ESG'
                      : '6 standards ESG maîtrisés · IFC PS 1-8 · GRI · ISSB S1/S2 · SASB · TCFD · ESG BCEAO/COBAC'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-esg');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-leaf-line" />
                    {isEn ? 'ESG diagnostic — Free' : 'Diagnostic ESG — Gratuit'}
                  </button>
                  <button
                    onClick={() => navigate('/knowledge-hub/esg')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {isEn ? 'ESG Knowledge Hub' : 'Hub ESG & Durabilité'}
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

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(34,160,90,0.07)', border: '1px solid rgba(34,160,90,0.18)' }}>
                  <i className="ri-leaf-line text-lg" style={{ color: '#22a05a' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'ESG = DFI access' : 'ESG = Accès aux DFI'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'BOAD, IFC, Proparco, DEG require IFC PS 1-8' : 'BOAD, IFC, Proparco, DEG exigent les NP IFC PS 1-8'}</p>
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
                    {isEn ? 'The strategic ESG imperative' : 'L\'impératif stratégique ESG'}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'Without ESG, you\'re invisible' : 'Sans ESG, vous êtes invisible'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'to institutional investors.' : 'pour les investisseurs institutionnels.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'In Francophone Africa, over 80% of DFI and impact fund financing requires demonstrable ESG compliance. Organizations without an ESG framework are automatically screened out at the first due diligence — regardless of their financial performance.'
                    : 'En Afrique francophone, plus de 80% des financements DFI et fonds impact exigent une conformité ESG démontrable. Les organisations sans cadre ESG sont automatiquement éliminées au premier screening — quelle que soit leur performance financière.'}
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
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(34,160,90,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#c9a227' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>
                      {isEn ? 'The KHEPRA ESG approach' : "L'approche ESG KHEPRA"}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'ESG that creates value and opens financing doors.' : 'Un ESG qui crée de la valeur et ouvre les portes du financement.'}
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
                      const el = document.getElementById('contact-esg');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-leaf-line" />
                    {isEn ? 'Request an ESG diagnostic' : 'Demander un diagnostic ESG'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STANDARDS ESG ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our ESG standards mastery' : 'Notre maîtrise des standards ESG'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight mb-4">
                {isEn ? '6 ESG standards, one integrated approach.' : '6 standards ESG, une approche intégrée.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'We master all international ESG standards applicable to organizations in Francophone Africa and align each mission with the specific requirements of targeted investors.'
                  : 'Nous maîtrisons tous les standards ESG internationaux applicables aux organisations en Afrique francophone et alignons chaque mission sur les exigences spécifiques des investisseurs ciblés.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ESG_STANDARDS.map((std, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                      <i className={`${std.icon} text-lg`} style={{ color: '#c9a227' }} />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${std.badgeColor}12`, color: std.badgeColor }}>
                      {std.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={std.name}>{std.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{std.desc}</p>
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
                {isEn ? '4 phases for an ESG-integrated strategy.' : '4 phases pour une stratégie intégrée ESG.'}
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

        {/* ── SECTEURS + LIVRABLES ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Sectors covered' : 'Secteurs couverts'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'ESG advisory across all key sectors' : 'Conseil ESG dans tous les secteurs clés'}
                </h2>
                <div className="space-y-3">
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

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Deliverables included' : 'Livrables inclus'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'A complete strategic & ESG package' : 'Un package stratégique & ESG complet'}
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
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 3 to 12 months' : 'Durée : 3 à 12 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Adapted to your ESG maturity and investment objectives' : 'Adapté à votre maturité ESG et à vos objectifs d\'investissement'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-esg');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-leaf-line" />
                    {isEn ? 'Request a free ESG diagnostic' : 'Demander un diagnostic ESG gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free · Confidential · Response within 24h' : 'Gratuit · Confidentiel · Réponse sous 24h'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Strategic & ESG Advisory' : 'Conseil Stratégique & ESG Advisory'} />

        {/* ── GUIDE ESG — Lead Magnet CTA ── */}
        <InlineLeadMagnet context="esg" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="conseil-strategique" />

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
        <div id="contact-esg">
          <PremiumServiceCTA
            formId="service-esg-advisory"
            formUrl="https://readdy.ai/api/form/d7rjfd6l0bai2p3hap50"
            badge={isEn ? 'Take action now' : 'Passez à l\'action maintenant'}
            title={isEn ? 'Ready to structure your ESG strategy?' : 'Prêt à structurer votre stratégie ESG ?'}
            subtitle={isEn
              ? 'Discuss your ESG challenges with a senior expert. Free diagnostic, confidential, no commitment. We\'ll assess your DFI financing eligibility.'
              : 'Discutez de vos enjeux ESG avec un expert senior. Diagnostic gratuit, confidentiel, sans engagement. Nous évaluons votre éligibilité aux financements DFI.'}
            primaryBtnText={isEn ? 'Request a free ESG diagnostic' : 'Demander un diagnostic ESG gratuit'}
            secondaryBtnText={isEn ? 'ESG Knowledge Hub' : 'Hub ESG & Durabilité'}
            secondaryBtnAction="case-studies"
            variant="gradient"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/conseil-strategique/`}
            title={isEn ? 'Strategic & ESG Advisory — KHEPRA EXPERTS' : 'Conseil Stratégique & ESG Advisory — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}



