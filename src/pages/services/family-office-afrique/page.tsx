import { useEffect, useState } from 'react';
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
import { InlineLeadMagnet } from '@/components/feature/InlineLeadMagnet';
import ExitIntentLeadMagnet from '@/components/feature/ExitIntentLeadMagnet';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const FORM_URL = 'https://readdy.ai/api/form/d8hdsqdiodfui947tv4g';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/family-office-afrique#service`,
      name: 'Family Business Governance Africa™',
      description: "Architecture 4 niveaux pour la gouvernance des entreprises familiales en Afrique francophone : Diagnostic de Pérennité gratuit, Structuration Gouvernance Familiale, Accompagnement Successoral et Abonnement Family Office Governance. Conforme OHADA/UEMOA/CEMAC.",
      url: `${SITE_URL}/services/family-office-afrique`,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'Family Office Advisory',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce qu'un Family Office KHEPRA™ ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "C'est un service de gestion de patrimoine et de gouvernance familiale externalisé, conçu pour les familles d'entrepreneurs et les groupes familiaux en Afrique francophone. Il combine structuration juridique et fiscale, gestion des actifs, préparation de la transmission intergénérationnelle, et gouvernance familiale conforme aux exigences OHADA et UEMOA/CEMAC.",
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi une famille d\'entrepreneurs a-t-elle besoin d\'un Family Office ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Sans Family Office structuré, le patrimoine familial est exposé à trois risques majeurs : (1) la dilution par manque de séparation entre actifs professionnels et personnels, (2) le blocage décisionnel lors des transmissions générationnelles faute de gouvernance claire, (3) l'évaporation fiscale et réglementaire par méconnaissance des dispositifs de protection disponibles en zone OHADA. Un Family Office KHEPRA apporte la rigueur institutionnelle pour protéger ce que vous avez construit.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre un Family Office et un gestionnaire de patrimoine classique ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le gestionnaire de patrimoine classique se concentre sur les produits financiers. Le Family Office KHEPRA couvre l'ensemble du spectre : structuration juridique des holdings familiales, optimisation fiscale internationale conforme, gouvernance familiale (charte, conseil de famille, protocole), préparation de la transmission, protection d'actifs, gestion des participations industrielles, et coordination des conseils externes (avocats, notaires, fiscalistes).",
          },
        },
        {
          '@type': 'Question',
          name: 'Comment se déroule une mission de Family Office KHEPRA™ ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La mission débute par un Diagnostic de Pérennité Familiale (gratuit, 8 min) pour cartographier votre situation. Ensuite : (1) Phase d'audit patrimonial et de gouvernance approfondi (4-6 semaines), (2) Conception d'une architecture de Family Office sur mesure (3-4 semaines), (3) Mise en œuvre avec vos conseils existants (6-12 mois), (4) Accompagnement continu trimestriel. Chaque mission est couverte par un NDA systématique.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quels types d\'actifs peuvent être gérés par un Family Office KHEPRA™ ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Nous couvrons tous les types d'actifs : participations industrielles et commerciales, immobilier (résidentiel, commercial, foncier), actifs financiers (portefeuilles, private equity), actifs agricoles et fonciers, propriété intellectuelle, et actifs transfrontaliers. Notre expertise spécifique en zone OHADA nous permet de traiter les complexités juridiques et fiscales propres à l'Afrique francophone.",
          },
        },
      ],
    },
  ],
};

export default function FamilyOfficeAfriquePage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const OUTCOMES = isEn
    ? [
        { value: '100%', label: 'Confidentiality', sub: 'Systematic NDA, professional secrecy, data segregation', icon: 'ri-lock-line', accent: '#059669' },
        { value: '4', label: 'Pillars', sub: 'Structure, Governance, Transmission, Protection', icon: 'ri-stack-line', accent: '#7c3aed' },
        { value: '3', label: 'Generations', sub: 'Founder, successor, next generation alignment', icon: 'ri-organization-chart', accent: '#059669' },
        { value: '22+', label: 'Years of expertise', sub: 'OHADA/UEMOA/CEMAC legal-financial mastery', icon: 'ri-shield-star-line', accent: '#7c3aed' },
      ]
    : [
        { value: '100%', label: 'Confidentialité', sub: 'NDA systématique, secret professionnel, ségrégation des données', icon: 'ri-lock-line', accent: '#059669' },
        { value: '4', label: 'Piliers', sub: 'Structure, Gouvernance, Transmission, Protection', icon: 'ri-stack-line', accent: '#7c3aed' },
        { value: '3', label: 'Générations', sub: 'Alignement fondateur, successeur, nouvelle génération', icon: 'ri-organization-chart', accent: '#059669' },
        { value: '22+', label: "Ans d'expertise", sub: 'Maîtrise juridico-financière OHADA/UEMOA/CEMAC', icon: 'ri-shield-star-line', accent: '#7c3aed' },
      ];

  const PROBLEMS = isEn
    ? [
        'Your family wealth is structurally exposed — no clear separation between business assets, personal assets, and generational transmission vehicles',
        'Family conflicts are waiting to happen — without a charter, a family council, or clear governance rules for asset management',
        'Each country your group operates in adds a layer of legal, fiscal, and regulatory complexity that no single advisor can fully cover',
        'Your legacy is at risk — the next generation has neither the preparation nor the structure to preserve what you have built',
      ]
    : [
        'Votre patrimoine familial est structurellement exposé — aucune séparation claire entre actifs professionnels, personnels et véhicules de transmission générationnelle',
        'Les conflits familiaux couvent — sans charte, sans conseil de famille, sans règles de gouvernance claires pour la gestion du patrimoine',
        "Chaque pays d'implantation du groupe ajoute une couche de complexité juridique, fiscale et réglementaire qu'aucun conseiller unique ne peut couvrir entièrement",
        "Votre héritage est en danger — la génération suivante n'a ni la préparation ni la structure pour préserver ce que vous avez construit",
      ];

  const ANSWERS = isEn
    ? [
        'A comprehensive patrimonial audit: mapping of all assets across all jurisdictions, identification of structural gaps and legal-fiscal exposures',
        'A bespoke Family Office architecture: holding company structures, legal vehicles, tax optimization within OHADA frameworks',
        'A Family Governance Charter: family council, decision-making protocols, conflict resolution mechanisms, and succession rules',
        'Asset protection strategy: ring-fencing business assets from personal assets, international structuring, secured trusts and holding structures',
        'A multi-generational transmission plan: next-generation onboarding, progressive delegation, training and mentoring of successors',
      ]
    : [
        "Un audit patrimonial complet : cartographie de tous les actifs dans toutes les juridictions, identification des lacunes structurelles et des expositions juridico-fiscales",
        "Une architecture de Family Office sur mesure : holdings, véhicules juridiques, optimisation fiscale dans le cadre OHADA",
        "Une Charte de Gouvernance Familiale : conseil de famille, protocoles de décision, mécanismes de résolution des conflits, règles de succession",
        "Une stratégie de protection d'actifs : cantonnement des actifs professionnels vs personnels, structuration internationale, trusts et holdings sécurisés",
        "Un plan de transmission multigénérationnel : intégration progressive de la génération suivante, délégation progressive, formation et mentorat des successeurs",
      ];

  const PILLARS = isEn
    ? [
        { icon: 'ri-building-4-line', title: 'Patrimonial Structuring', desc: 'Mapping of all assets. Legal and fiscal architecture. Holding and vehicle optimization. Cross-border structuring OHADA/UEMOA/CEMAC.', details: ['Complete asset mapping (business, real estate, financial, IP)', 'Holding company architecture optimization', 'Cross-jurisdiction tax compliance framework', 'Investment vehicle documentation', 'Ownership chain consolidation'] },
        { icon: 'ri-scales-3-line', title: 'Family Governance', desc: 'Family charter drafting. Family council creation. Decision-making protocol. Conflict prevention and resolution.', details: ['Family governance charter with 3-generation alignment', 'Family council structure and operating rules', 'Decision-making matrix and voting protocols', 'Conflict resolution mechanism', 'Values and mission codification'] },
        { icon: 'ri-exchange-funds-line', title: 'Generational Transmission', desc: 'Succession planning. Next-gen onboarding. Progressive delegation. Mentorship and training program.', details: ['Multi-scenario succession plan', 'Next-gen education and onboarding curriculum', 'Progressive delegation milestones', 'Mentorship matching and monitoring', 'Tax-efficient transmission structuring'] },
        { icon: 'ri-shield-check-line', title: 'Asset Protection', desc: 'Ring-fencing strategies. International trusts. Risk isolation. Creditor protection within OHADA frameworks.', details: ['Business vs personal asset ring-fencing', 'International trust and holding structures', 'Creditor protection analysis and hardening', 'Asset location risk matrix', 'Regulatory compliance across jurisdictions'] },
      ]
    : [
        { icon: 'ri-building-4-line', title: 'Structuration Patrimoniale', desc: "Cartographie de tous les actifs. Architecture juridique et fiscale. Optimisation holdings et véhicules. Structuration transfrontalière OHADA/UEMOA/CEMAC.", details: ['Cartographie complète des actifs (industriels, immobiliers, financiers, PI)', 'Optimisation de l\'architecture des holdings', 'Cadre de conformité fiscale multijuridictionnelle', 'Documentation des véhicules d\'investissement', 'Consolidation de la chaîne de détention'] },
        { icon: 'ri-scales-3-line', title: 'Gouvernance Familiale', desc: 'Rédaction de charte familiale. Création du conseil de famille. Protocole de prise de décision. Prévention et résolution des conflits.', details: ['Charte de gouvernance familiale avec alignement sur 3 générations', 'Structure et règles de fonctionnement du conseil de famille', 'Matrice de décision et protocoles de vote', 'Mécanisme de résolution des conflits', 'Codification des valeurs et de la mission familiale'] },
        { icon: 'ri-exchange-funds-line', title: 'Transmission Générationnelle', desc: "Planification de la succession. Intégration de la nouvelle génération. Délégation progressive. Programme de mentorat et formation.", details: ['Plan de succession multi-scénarios', 'Programme d\'éducation et d\'intégration de la next-gen', 'Jalons de délégation progressive', 'Matching et suivi du mentorat', 'Structuration de transmission fiscalement optimisée'] },
        { icon: 'ri-shield-check-line', title: "Protection d'Actifs", desc: "Stratégies de cantonnement. Trusts internationaux. Isolation des risques. Protection contre les créanciers dans le cadre OHADA.", details: ['Cantonnement actifs professionnels vs personnels', 'Structures de trust et holdings internationales', 'Analyse et durcissement de la protection créanciers', 'Matrice de risque par localisation d\'actifs', 'Conformité réglementaire multijuridictionnelle'] },
      ];

  const DELIVERABLES = isEn
    ? ['Complete patrimonial audit with multi-jurisdiction asset mapping', 'Bespoke Family Office architecture design (holding structures, vehicles, tax strategy)', 'Family Governance Charter with council rules and decision protocols', 'Multi-generational succession and transmission plan', 'Asset protection strategy with ring-fencing and creditor hardening', 'Quarterly Family Office review sessions with your dedicated Partner', '24/7 access to your KHEPRA Family Office Advisor']
    : ['Audit patrimonial complet avec cartographie des actifs multijuridictionnelle', 'Architecture de Family Office sur mesure (holdings, véhicules, stratégie fiscale)', 'Charte de Gouvernance Familiale avec règles du conseil et protocoles de décision', 'Plan de succession et transmission multigénérationnelle', "Stratégie de protection d'actifs avec cantonnement et durcissement créanciers", 'Sessions trimestrielles de revue Family Office avec votre Partner dédié', 'Accès 24/7 à votre Conseiller Family Office KHEPRA'];

  const PROFILE = isEn
    ? [
        { icon: 'ri-user-star-line', label: 'Family Business Founders', desc: 'First-generation entrepreneurs who have built substantial wealth and need to structure their legacy for future generations' },
        { icon: 'ri-building-2-line', label: 'Multi-Generation Family Groups', desc: 'Second or third-generation family businesses facing governance complexity, shareholder dispersion, and transmission challenges' },
        { icon: 'ri-global-line', label: 'Cross-Border Family Holdings', desc: 'Families with assets and operations across multiple OHADA jurisdictions, facing legal-fiscal complexity and regulatory fragmentation' },
        { icon: 'ri-briefcase-line', label: 'High-Net-Worth Individuals (HNWI)', desc: 'Business owners and executives in Francophone Africa seeking professional patrimonial structuring beyond traditional private banking' },
      ]
    : [
        { icon: 'ri-user-star-line', label: "Fondateurs d'Entreprises Familiales", desc: "Entrepreneurs de première génération ayant constitué un patrimoine significatif et devant structurer leur héritage pour les générations futures" },
        { icon: 'ri-building-2-line', label: 'Groupes Familiaux Multigénérationnels', desc: "Entreprises familiales de deuxième ou troisième génération confrontées à la complexité de gouvernance, la dispersion actionnariale et les défis de transmission" },
        { icon: 'ri-global-line', label: 'Holdings Familiales Transfrontalières', desc: "Familles détenant des actifs et opérations dans plusieurs juridictions OHADA, confrontées à la complexité juridico-fiscale et la fragmentation réglementaire" },
        { icon: 'ri-briefcase-line', label: 'Grandes Fortunes (HNWI)', desc: "Propriétaires d'entreprises et dirigeants en Afrique francophone cherchant une structuration patrimoniale professionnelle au-delà de la banque privée traditionnelle" },
      ];

  const RELATED = isEn
    ? [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Cross-border tax compliance & transfer pricing optimization' },
        { title: 'CEO Advisory Board Africa™', slug: 'ceo-advisory-board', icon: 'ri-user-star-line', kpi: 'External strategic committee — your trusted board outside the family' },
        { title: 'Financial Audit Africa', slug: 'audit-financier-afrique', icon: 'ri-file-search-line', kpi: 'Full transparency for patrimonial decisions' },
      ]
    : [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Conformité fiscale transfrontalière & optimisation prix de transfert' },
        { title: 'CEO Advisory Board Africa™', slug: 'ceo-advisory-board', icon: 'ri-user-star-line', kpi: 'Comité stratégique externalisé — votre Conseil de confiance hors cercle familial' },
        { title: 'Audit Financier Afrique', slug: 'audit-financier-afrique', icon: 'ri-file-search-line', kpi: 'Transparence totale pour les décisions patrimoniales' },
      ];

  const faqItems = SCHEMA['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;
    setFormStatus('submitting');
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      body.append('service', 'family-office-afrique');
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Family Business Governance Africa™ | Diagnostic → Subscription | KHEPRA'
          : 'Family Business Governance Africa™ | Diagnostic → Abonnement | KHEPRA'}
        description={isEn
          ? '4-level progressive architecture for family business governance in Francophone Africa: Free Sustainability Diagnostic (8 min), Governance Structuring, Succession Support, and Family Office Governance Subscription. OHADA/UEMOA/CEMAC compliant. Lomé, Togo.'
          : 'Architecture 4 niveaux pour la gouvernance des entreprises familiales en Afrique francophone : Diagnostic de Pérennité gratuit (8 min), Structuration Gouvernance, Accompagnement Successoral et Abonnement Family Office Governance. Conforme OHADA/UEMOA/CEMAC. Lomé, Togo.'}
        keywords={isEn
          ? 'family business governance Africa, family governance charter, generational succession Africa, family office governance Africa, family business sustainability Africa, patrimonial structuring OHADA, family holding Africa, KHEPRA EXPERTS family governance'
          : 'gouvernance entreprise familiale Afrique, charte gouvernance familiale, succession générationnelle Afrique, mission family office gouvernance sur devis, pérennité entreprise familiale Afrique, structuration patrimoniale OHADA, holding familiale Afrique, KHEPRA EXPERTS gouvernance familiale'}
        ogImage="https://readdy.ai/api/search-image?query=Elegant%20African%20family%20business%20leaders%20standing%20together%20in%20a%20sunlit%20modern%20villa%20overlooking%20a%20lush%20tropical%20garden%20estate%20in%20West%20Africa%2C%20three%20generations%20of%20an%20entrepreneurial%20family%2C%20the%20patriarch%20in%20a%20refined%20linen%20shirt%2C%20heiress%20in%20sophisticated%20business%20attire%2C%20young%20adult%20successor%20reviewing%20architectural%20plans%20on%20a%20marble%20table%2C%20warm%20golden%20hour%20lighting%20through%20floor-to-ceiling%20windows%2C%20luxury%20family%20wealth%20management%20atmosphere%2C%20Lom%C3%A9%20Togo%2C%20generational%20legacy%20and%20trust%2C%20sophisticated%20and%20serene%20ambiance%2C%20African%20prosperity%20and%20heritage&width=1440&height=900&seq=family-office-hero&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/family-office-afrique"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SCHEMA}
        hreflangLinks={buildHreflang('/services/family-office-afrique')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Family Business Governance Africa™' : 'Family Business Governance Africa™', path: '/services/family-office-afrique' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Elegant%20African%20family%20business%20leaders%20standing%20together%20in%20a%20sunlit%20modern%20villa%20overlooking%20a%20lush%20tropical%20garden%20estate%20in%20West%20Africa%2C%20three%20generations%20of%20an%20entrepreneurial%20family%2C%20the%20patriarch%20in%20a%20refined%20linen%20shirt%2C%20heiress%20in%20sophisticated%20business%20attire%2C%20young%20adult%20successor%20reviewing%20architectural%20plans%20on%20a%20marble%20table%2C%20warm%20golden%20hour%20lighting%20through%20floor-to-ceiling%20windows%2C%20luxury%20family%20wealth%20management%20atmosphere%2C%20Lom%C3%A9%20Togo%2C%20generational%20legacy%20and%20trust%2C%20sophisticated%20and%20serene%20ambiance%2C%20African%20prosperity%20and%20heritage&width=1440&height=900&seq=family-office-hero&orientation=landscape"
              alt={isEn ? 'Family Office Afrique KHEPRA EXPERTS' : 'Family Office Afrique KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(5,150,105,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: '#059669' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#059669' }}>
                    {isEn ? 'Family Business Governance Africa™' : 'Family Business Governance Africa™'}
                  </span>
                </div>

                <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'You built an empire.' : 'Vous avez construit un empire.'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #6ee7b7, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'Now protect it across generations.' : 'Maintenant, protégez-le à travers les générations.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? "A family office that structures your wealth with the rigor of an institution and the discretion of a trusted advisor. Because what took a lifetime to build can unravel in a single generation — without the right architecture."
                    : "Un family office qui structure votre patrimoine avec la rigueur d'une institution et la discrétion d'un conseiller de confiance. Parce que ce qui a mis une vie à se construire peut se défaire en une génération — sans la bonne architecture."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
                  <i className="ri-shield-star-line text-lg" style={{ color: '#059669' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? 'Patrimonial audit · Family governance charter · Generational transmission · Asset protection · OHADA/UEMOA mastery'
                      : 'Audit patrimonial · Charte de gouvernance familiale · Transmission générationnelle · Protection d\'actifs · Maîtrise OHADA/UEMOA'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/tools/diagnostic-perennite-familiale')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#ffffff', boxShadow: '0 4px 24px rgba(5,150,105,0.45)' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Calculate Your Family Sustainability Score — 8 min' : 'Calculez votre Score de Pérennité Familiale — 8 min'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-family-office');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-shield-star-line" />
                    {isEn ? 'Talk to a Family Office Advisor' : 'Parler à un Conseiller Family Office'}
                  </button>
                </div>
                <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <i className="ri-information-line mr-1" />
                  {isEn ? 'Free · Confidential · 25 questions · 8 minutes · No commitment' : 'Gratuit · Confidentiel · 25 questions · 8 minutes · Sans engagement'}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {OUTCOMES.map((o, i) => (
                    <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${o.accent}18` }}>
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: `${o.accent}15` }}>
                        <i className={`${o.icon} text-base`} style={{ color: o.accent }} />
                      </div>
                      <div className="text-2xl font-bold leading-none mb-1" style={{ color: o.accent, fontFamily: 'var(--font-heading), serif' }}>{o.value}</div>
                      <div className="text-xs font-semibold text-white mb-0.5">{o.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{o.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.18)' }}>
                  <i className="ri-lock-line text-lg" style={{ color: '#059669' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? '100% Confidential — Systematic NDA, Professional Secrecy, Data Segregation' : '100% Confidentiel — NDA systématique, Secret Professionnel, Ségrégation des données'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Your family\'s privacy is non-negotiable' : 'La vie privée de votre famille est non-négociable'}</p>
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
                  <div className="h-px w-6" style={{ background: '#059669' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'The silent erosion of wealth' : "L'érosion silencieuse du patrimoine"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Wealth without structure is' : 'Le patrimoine sans structure est'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'just a waiting accident.' : 'un accident qui attend de se produire.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? "70% of family businesses in Africa do not survive the second generation. 90% do not reach the third. The cause is never the quality of the business — it's the absence of a structured Family Office. Without clear governance, proper asset ring-fencing, and a documented transmission plan, wealth evaporates: diluted by family conflicts, eroded by unoptimized taxation, and scattered across jurisdictions without coordination."
                    : "70% des entreprises familiales en Afrique ne survivent pas à la deuxième génération. 90% n'atteignent pas la troisième. La cause n'est jamais la qualité de l'entreprise — c'est l'absence de Family Office structuré. Sans gouvernance claire, cantonnement d'actifs et plan de transmission documenté, le patrimoine s'évapore : dilué par les conflits familiaux, érodé par une fiscalité non optimisée, dispersé entre juridictions sans coordination."}
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

              <div className="rounded-3xl p-10 relative overflow-hidden bg-[#0a0a0a]">
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(5,150,105,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#059669' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#059669' }}>
                      {isEn ? 'How KHEPRA Family Office Works' : 'Comment Fonctionne le Family Office KHEPRA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn ? 'The institution your family deserves. The discretion it requires.' : 'L\'institution que votre famille mérite. La discrétion qu\'elle exige.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(5,150,105,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#059669' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/tools/diagnostic-perennite-familiale')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Family Sustainability Diagnostic' : 'Diagnostic de Pérennité Familiale Gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 PILIERS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#059669' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'The four pillars of family wealth resilience' : 'Les quatre piliers de la résilience patrimoniale familiale'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? 'Protect. Govern. Transmit. Grow.' : 'Protéger. Gouverner. Transmettre. Croître.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Each pillar is addressed with institutional-grade rigor, tailored to your family\'s specific context, structure, and ambitions.'
                  : "Chaque pilier est traité avec une rigueur institutionnelle, adaptée au contexte, à la structure et aux ambitions spécifiques de votre famille."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(5,150,105,0.10)', border: '1px solid rgba(5,150,105,0.20)' }}>
                    <i className={`${pillar.icon} text-lg`} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2" title={pillar.title}>{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{pillar.desc}</p>
                  <div className="space-y-1.5 pt-3 border-t border-gray-100">
                    {pillar.details.map((d, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <i className="ri-check-line text-emerald-600 text-[10px] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVRABLES + CIBLE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#059669' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'What you get' : 'Ce que vous obtenez'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Your complete family office package' : 'Votre package family office complet'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(5,150,105,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#059669' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#059669' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Who is this for?' : 'À qui s\'adresse ce service ?'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Families who refuse to let chance decide their legacy' : 'Les familles qui refusent de laisser le hasard décider de leur héritage'}
                </h2>

                <div className="space-y-3 mb-8">
                  {PROFILE.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 flex-shrink-0 mt-0.5">
                        <i className={`${p.icon} text-lg text-gray-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{p.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#059669' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Engagement: starts with a Patrimonial Audit (4-6 weeks). Then tailored ongoing mandate.' : 'Engagement : débute par un Audit Patrimonial (4-6 semaines). Puis mandat continu sur mesure.'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Proposal after Family Sustainability diagnostic' : 'Proposition après diagnostic de Pérennité Familiale'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tools/diagnostic-perennite-familiale')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Family Sustainability Diagnostic' : 'Diagnostic de Pérennité Familiale Gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — 25 questions — 8 minutes — Immediate sustainability score' : 'Gratuit — 25 questions — 8 minutes — Score de pérennité immédiat'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Family Business Governance Africa™' : 'Family Business Governance Africa™'} />

        {/* ── LEAD MAGNET ── */}
        <InlineLeadMagnet context="family-office-afrique" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="family-office-afrique" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6" style={{ background: '#059669' }} />
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
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(5,150,105,0.10)', border: '1px solid rgba(5,150,105,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#059669' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-family-office">
          <section className="py-20 border-t" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#059669' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#059669' }}>
                      {isEn ? 'Your legacy starts here' : 'Votre héritage commence ici'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, var(--font-heading), serif' }}>
                    {isEn ? 'Ready to protect what generations will inherit?' : 'Prêt à protéger ce dont les générations hériteront ?'}
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {isEn
                      ? 'Start with the free Family Sustainability diagnostic. Then discuss how a KHEPRA Family Office can structure, protect, and transmit your wealth — with an advisor who understands the unique challenges of family businesses in Francophone Africa.'
                      : 'Commencez par le diagnostic de Pérennité Familiale gratuit. Puis discutons de la façon dont un Family Office KHEPRA peut structurer, protéger et transmettre votre patrimoine — avec un conseiller qui comprend les défis uniques des entreprises familiales en Afrique francophone.'}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[isEn ? 'Response within 24 business hours' : 'Réponse sous 24h ouvrées',
                      isEn ? 'Absolute confidentiality (systematic NDA + professional secrecy)' : 'Confidentialité absolue (NDA systématique + secret professionnel)',
                      isEn ? 'Senior advisors with 22 years of OHADA/UEMOA experience' : 'Conseillers senior avec 22 ans d\'expérience OHADA/UEMOA',
                      isEn ? 'Available in French and English' : 'Disponible en français et anglais',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(5,150,105,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#059669' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(5,150,105,0.15)' }}>
                        <i className="ri-mail-line text-lg" style={{ color: '#059669' }} />
                      </div>
                      <span className="text-sm">contact@khepraexperts.com</span>
                    </a>
                    <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(5,150,105,0.15)' }}>
                        <i className="ri-whatsapp-line text-lg" style={{ color: '#059669' }} />
                      </div>
                      <span className="text-sm">+228 93 98 49 09</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl p-8 lg:p-10 shadow-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, var(--font-heading), serif' }}>
                    {isEn ? 'Send your request' : 'Envoyer votre demande'}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {isEn ? 'Fill in this form and a Family Office advisor will contact you within 24 hours.' : 'Remplissez ce formulaire et un conseiller Family Office vous contacte sous 24h.'}
                  </p>

                  <form data-readdy-form id="service-family-office-afrique" onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="fo-nom" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Full Name' : 'Nom complet'} *
                        </label>
                        <input type="text" id="fo-nom" name="nom" required value={formData.nom} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your name' : 'Votre nom'} />
                      </div>
                      <div>
                        <label htmlFor="fo-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Email *
                        </label>
                        <input type="email" id="fo-email" name="email" required value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="fo-tel" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Phone' : 'Téléphone'}
                        </label>
                        <input type="tel" id="fo-tel" name="telephone" value={formData.telephone} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="+228 XX XX XX XX" />
                      </div>
                      <div>
                        <label htmlFor="fo-org" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Organization / Family Group' : 'Organisation / Groupe Familial'}
                        </label>
                        <input type="text" id="fo-org" name="organisation" value={formData.organisation} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your family group or organization' : 'Votre groupe familial ou organisation'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fo-fct" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Position' : 'Fonction'}
                      </label>
                      <input type="text" id="fo-fct" name="fonction" value={formData.fonction} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'E.g.: Family Principal, Managing Director, Heir...' : 'Ex: Principal Familial, Directeur Général, Héritier...'} />
                    </div>

                    <div>
                      <label htmlFor="fo-enj" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Your patrimonial challenges' : 'Vos enjeux patrimoniaux'} *
                      </label>
                      <textarea id="fo-enj" name="enjeux" required rows={3} maxLength={500} value={formData.enjeux} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition-all resize-none bg-white" placeholder={isEn ? 'Describe your patrimonial priorities or challenges...' : 'Décrivez vos priorités ou défis patrimoniaux...'} />
                      <p className="text-xs mt-1 text-gray-400">{formData.enjeux.length}/500</p>
                    </div>

                    {formStatus === 'success' && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <i className="ri-checkbox-circle-fill text-lg" />
                        <span>{isEn ? 'Message sent! An advisor will contact you within 24 hours.' : 'Message envoyé ! Un conseiller vous contactera sous 24h.'}</span>
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <i className="ri-error-warning-fill text-lg" />
                        <span>{isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button type="submit" disabled={formStatus === 'submitting' || formData.enjeux.length > 500} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#ffffff' }}>
                        {formStatus === 'submitting' ? (isEn ? 'Sending...' : 'Envoi en cours...') : <><i className="ri-send-plane-line" />{isEn ? 'Request a Confidential Call' : 'Demander un appel confidentiel'}</>}
                      </button>
                      <button type="button" onClick={() => navigate('/tools/diagnostic-perennite-familiale')} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        {isEn ? 'Family Sustainability Diagnostic' : 'Diagnostic de Pérennité Familiale'}
                        <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/family-office-afrique/`}
            title={isEn ? 'Family Business Governance Africa™ — KHEPRA EXPERTS' : 'Family Business Governance Africa™ — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'family-office-afrique',
          title: isEn ? 'Family Business Governance Africa™ Diagnostic' : 'Diagnostic Family Business Governance Africa™',
          subtitle: isEn ? 'Evaluate your family wealth resilience across 4 pillars in 8 minutes. Discover structural gaps before the next generation does.' : 'Évaluez la résilience de votre patrimoine familial sur 4 piliers en 8 minutes. Découvrez les failles structurelles avant la prochaine génération.',
          toolSlug: '/tools/diagnostic-perennite-familiale',
          icon: 'ri-shield-star-line',
          accentColor: '#059669',
          timeMinutes: '8 min',
          usersCount: '400+',
          successRate: '91%',
        }}
      />
    </>
  );
}