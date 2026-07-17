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
import PremiumServiceCTA from '@/pages/services/components/PremiumServiceCTA';
import { InlineLeadMagnet } from '@/components/feature/InlineLeadMagnet';
import ExitIntentLeadMagnet from '@/components/feature/ExitIntentLeadMagnet';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const FORM_URL = 'https://readdy.ai/api/form/d8hdemscl43d0bibejt0';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/agrement-fintech-etablissement-paiement#service`,
      name: "Agrément Fintech & Établissement de Paiement KHEPRA™",
      description: "Accompagnement complet à l'obtention de l'agrément d'Établissement de Paiement BCEAO. Étude de faisabilité réglementaire, dossier d'agrément, business plan réglementaire, gouvernance, gestion des risques et relations régulateurs pour fintechs, startups et groupes financiers en zone UEMOA.",
      url: `${SITE_URL}/services/agrement-fintech-etablissement-paiement`,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'Fintech Licensing & Payment Institution Authorization',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce qu'un agrément d'Établissement de Paiement BCEAO ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "L'agrément d'Établissement de Paiement, régi par l'Instruction BCEAO n°008-05-2015, autorise une entité à fournir des services de paiement dans l'ensemble de la zone UEMOA. Il couvre les services tels que l'émission et l'acquisition d'instruments de paiement, les virements, les prélèvements, et les services de transfert d'argent. L'obtention de cet agrément est un processus rigoureux de 6 à 12 mois impliquant un dossier complet, des entretiens avec la Commission Bancaire et une démonstration de la solidité financière, opérationnelle et de gouvernance.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles sont les conditions pour obtenir un agrément BCEAO ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Les conditions principales incluent : (1) un capital minimum libéré conforme aux exigences BCEAO, (2) un programme d'activité détaillant les services de paiement envisagés, (3) un dispositif de gouvernance solide avec un Conseil d'Administration qualifié, (4) un système de contrôle interne et de gestion des risques documenté, (5) un dispositif LBC/FT conforme, (6) une infrastructure technique sécurisée et résiliente, (7) l'honorabilité et la compétence des dirigeants et actionnaires de référence. Chaque critère est examiné en profondeur par la Commission Bancaire.",
          },
        },
        {
          '@type': 'Question',
          name: "Combien de temps dure la procédure d'agrément BCEAO ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La durée totale est de 6 à 12 mois à compter du dépôt du dossier complet : 1 à 3 mois de préparation du dossier avec un cabinet spécialisé, 1 mois pour l'accusé de réception de la BCEAO, 3 à 6 mois d'instruction par la Commission Bancaire (incluant des demandes de compléments et des entretiens), et 1 à 2 mois pour la décision finale du Conseil des Ministres de l'UMOA. Les dossiers incomplets ou mal préparés subissent des retards significatifs, pouvant doubler la durée totale.",
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi choisir KHEPRA EXPERTS pour mon dossier d\'agrément ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KHEPRA EXPERTS est l'un des rares cabinets en Afrique francophone à combiner expertise financière, réglementaire et gouvernance pour les dossiers d'agrément. Notre méthodologie couvre l'intégralité du cycle : étude de faisabilité, montage du dossier, business plan réglementaire, gouvernance, gestion des risques, préparation aux entretiens avec la Commission Bancaire et relations régulateurs. Nous avons accompagné avec succès des établissements de paiement, des SFD et des fintechs dans leurs démarches d'agrément.",
          },
        },
        {
          '@type': 'Question',
          name: "Quelle est la différence entre un Établissement de Paiement et un Établissement de Monnaie Électronique ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "L'Établissement de Paiement (Instruction 008-05-2015) fournit des services de paiement sans gérer de monnaie électronique : virements, prélèvements, acquisition de transactions. L'Établissement de Monnaie Électronique (Instruction 008-05-2015 modifiée) émet et gère de la monnaie électronique en plus des services de paiement. Les exigences de capital, de gouvernance et de reporting sont plus strictes pour l'EME. KHEPRA EXPERTS accompagne les deux types d'agrément.",
          },
        },
      ],
    },
  ],
};

export default function AgrementFintechPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [eligibilityStep, setEligibilityStep] = useState(0);
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<string, string>>({});
  const [eligibilityResult, setEligibilityResult] = useState<'green' | 'orange' | 'red' | null>(null);
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const OUTCOMES = isEn
    ? [
        { value: '6-12', label: 'Months to agrément', sub: 'From feasibility study to ministerial approval', icon: 'ri-calendar-check-line', accent: '#0f766e' },
        { value: '5', label: 'Key pillars', sub: 'Feasibility, Dossier, BP, Governance, Regulator Relations', icon: 'ri-stack-line', accent: '#b45309' },
        { value: '100%', label: 'UEMOA coverage', sub: '8 countries — one agrément, one passport', icon: 'ri-global-line', accent: '#0f766e' },
        { value: '3-6', label: 'Weeks to dossier ready', sub: 'Complete regulatory-grade application package', icon: 'ri-rocket-line', accent: '#b45309' },
      ]
    : [
        { value: '6-12', label: "Mois jusqu'à l'agrément", sub: "De l'étude de faisabilité à l'approbation ministérielle", icon: 'ri-calendar-check-line', accent: '#0f766e' },
        { value: '5', label: 'Piliers clés', sub: 'Faisabilité, Dossier, BP, Gouvernance, Relations Régulateurs', icon: 'ri-stack-line', accent: '#b45309' },
        { value: '100%', label: 'Couverture UEMOA', sub: '8 pays — un agrément, un passeport', icon: 'ri-global-line', accent: '#0f766e' },
        { value: '3-6', label: 'Semaines pour le dossier', sub: 'Package complet de demande conforme aux standards', icon: 'ri-rocket-line', accent: '#b45309' },
      ];

  const ELIGIBILITY_QUESTIONS = isEn
    ? [
        { id: 'capital', question: 'Do you have the minimum required capital (or a clear plan to raise it) for a BCEAO Payment Institution license?', options: [{ value: 'yes', label: 'Yes, capital is secured or committed', score: 3 }, { value: 'soon', label: 'In progress — fundraising underway', score: 1 }, { value: 'no', label: 'Not yet — need to structure', score: 0 }] },
        { id: 'juridique', question: 'Is your company incorporated under OHADA law with a clear and documented shareholder structure?', options: [{ value: 'yes', label: 'Yes, OHADA SA/SAS with clean shareholder agreement', score: 3 }, { value: 'progress', label: 'Incorporated but shareholder agreement not finalized', score: 1 }, { value: 'no', label: 'Not yet incorporated or structure unclear', score: 0 }] },
        { id: 'equipe', question: 'Do you have (or can you recruit) a management team meeting BCEAO fit & proper requirements?', options: [{ value: 'yes', label: 'Yes, qualified team identified with fintech/banking experience', score: 3 }, { value: 'partial', label: 'Partially — key positions need to be filled', score: 1 }, { value: 'no', label: 'No — need to build the team from scratch', score: 0 }] },
        { id: 'technique', question: 'Is your technical platform ready to meet BCEAO security, resilience and reporting standards?', options: [{ value: 'yes', label: 'Yes, platform meets or can be adapted within 3 months', score: 3 }, { value: 'adaptable', label: 'Platform exists but significant compliance upgrades needed', score: 1 }, { value: 'no', label: 'No platform or platform needs complete rebuild', score: 0 }] },
        { id: 'lbcf', question: 'Do you have a documented AML/CFT framework with a designated compliance officer?', options: [{ value: 'yes', label: 'Yes, complete AML/CFT framework with trained compliance officer', score: 3 }, { value: 'partial', label: 'Partial — policy exists but procedures incomplete', score: 1 }, { value: 'no', label: 'No AML/CFT framework in place', score: 0 }] },
        { id: 'activite', question: 'Is your business model clearly defined with documented payment services and realistic financial projections?', options: [{ value: 'yes', label: 'Yes, detailed business plan with 5-year projections', score: 3 }, { value: 'draft', label: 'Draft version exists but not final', score: 1 }, { value: 'no', label: 'No formal business plan yet', score: 0 }] },
      ]
    : [
        { id: 'capital', question: "Disposez-vous du capital minimum requis (ou d'un plan clair pour le mobiliser) pour un agrément d'Établissement de Paiement BCEAO ?", options: [{ value: 'oui', label: 'Oui, capital sécurisé ou engagement ferme des investisseurs', score: 3 }, { value: 'bientot', label: 'En cours — levée de fonds en préparation', score: 1 }, { value: 'non', label: "Pas encore — besoin de structurer l'approche", score: 0 }] },
        { id: 'juridique', question: "Votre société est-elle constituée sous forme OHADA avec une structure d'actionnariat claire et documentée ?", options: [{ value: 'oui', label: "Oui, SA/SAS OHADA avec pacte d'actionnaires documenté", score: 3 }, { value: 'encours', label: "Constituée mais pacte d'actionnaires non finalisé", score: 1 }, { value: 'non', label: 'Pas encore constituée ou structure à clarifier', score: 0 }] },
        { id: 'equipe', question: "Disposez-vous (ou pouvez-vous recruter) d'une équipe dirigeante répondant aux critères d'honorabilité et de compétence BCEAO ?", options: [{ value: 'oui', label: 'Oui, équipe qualifiée identifiée avec expérience fintech/bancaire', score: 3 }, { value: 'partiel', label: 'Partiellement — postes clés à pourvoir', score: 1 }, { value: 'non', label: "Non — équipe à constituer intégralement", score: 0 }] },
        { id: 'technique', question: "Votre plateforme technique est-elle prête à répondre aux standards BCEAO de sécurité, de résilience et de reporting ?", options: [{ value: 'oui', label: "Oui, plateforme conforme ou adaptable sous 3 mois", score: 3 }, { value: 'adaptable', label: 'Plateforme existante mais mises à niveau conformité significatives nécessaires', score: 1 }, { value: 'non', label: 'Pas de plateforme ou refonte complète nécessaire', score: 0 }] },
        { id: 'lbcf', question: "Disposez-vous d'un dispositif LBC/FT documenté avec un responsable conformité désigné ?", options: [{ value: 'oui', label: 'Oui, dispositif LBC/FT complet avec responsable formé', score: 3 }, { value: 'partiel', label: 'Partiel — politique existante mais procédures incomplètes', score: 1 }, { value: 'non', label: "Aucun dispositif LBC/FT en place", score: 0 }] },
        { id: 'activite', question: "Votre modèle d'affaires est-il clairement défini avec des services de paiement documentés et des projections financières réalistes ?", options: [{ value: 'oui', label: 'Oui, business plan détaillé avec projections sur 5 ans', score: 3 }, { value: 'brouillon', label: 'Version provisoire existante mais non finalisée', score: 1 }, { value: 'non', label: "Pas de business plan formel", score: 0 }] },
      ];

  const handleEligibilityAnswer = (qId: string, value: string) => {
    const newAnswers = { ...eligibilityAnswers, [qId]: value };
    setEligibilityAnswers(newAnswers);
    if (eligibilityStep < ELIGIBILITY_QUESTIONS.length - 1) {
      setTimeout(() => setEligibilityStep(prev => prev + 1), 300);
    } else {
      const total = ELIGIBILITY_QUESTIONS.reduce((sum, q) => {
        const option = q.options.find(o => o.value === newAnswers[q.id]);
        return sum + (option ? option.score : 0);
      }, 0);
      const maxScore = ELIGIBILITY_QUESTIONS.length * 3;
      const pct = (total / maxScore) * 100;
      setEligibilityResult(pct >= 70 ? 'green' : pct >= 40 ? 'orange' : 'red');
      setEligibilityStep(prev => prev + 1);
    }
  };

  const resetEligibility = () => {
    setEligibilityStep(0);
    setEligibilityAnswers({});
    setEligibilityResult(null);
  };

  const PROBLEMS = isEn
    ? [
        'Your agrément application was rejected or returned incomplete — you don\'t know why',
        'You have the product and the users but not the regulatory license to operate legally across UEMOA',
        'Your investors require regulatory approval before committing capital',
        'You\'re competing with unlicensed players and need the agrément as a competitive moat',
      ]
    : [
        "Votre demande d'agrément a été rejetée ou retournée incomplète — vous ne savez pas pourquoi",
        "Vous avez le produit et les utilisateurs mais pas la licence pour opérer légalement dans tout l'UEMOA",
        "Vos investisseurs exigent l'approbation réglementaire avant de débloquer les fonds",
        "Vous êtes en concurrence avec des acteurs non agréés et l'agrément devient votre avantage compétitif",
      ];

  const ANSWERS = isEn
    ? [
        'Regulatory feasibility study: we tell you if you\'re eligible before you spend a franc on the dossier',
        'Complete agrément dossier: 400+ pages covering all BCEAO requirements — drafted by experts who know the process',
        'Regulatory business plan with 5-year financial projections aligned with BCEAO expectations',
        'Governance package: Board setup, committee charters, compliance framework, risk management policy',
        'Regulator relationship management: preparation for Commission Bancaire interviews and follow-up',
      ]
    : [
        "Étude de faisabilité réglementaire : on vous dit si vous êtes éligible avant de dépenser un franc dans le dossier",
        "Dossier d'agrément complet : 400+ pages couvrant toutes les exigences BCEAO — rédigé par des experts qui connaissent le processus",
        'Business plan réglementaire avec projections financières 5 ans alignées sur les attentes BCEAO',
        'Package gouvernance : mise en place du CA, chartes des comités, cadre conformité, politique risques',
        'Gestion des relations régulateurs : préparation aux entretiens avec la Commission Bancaire et suivi',
      ];

  const PILLARS = isEn
    ? [
        { icon: 'ri-search-eye-line', title: 'Feasibility Study', desc: 'We assess your eligibility against all 12+ BCEAO criteria. You get a clear green/orange/red before investing in the full dossier.', deliverables: ['Regulatory gap analysis', 'Eligibility scorecard', 'Pre-application roadmap', 'Capital structure recommendations'] },
        { icon: 'ri-file-text-line', title: 'Agrément Dossier', desc: 'Complete 400+ page application package: legal, financial, technical, governance — every section drafted to BCEAO specifications.', deliverables: ['Complete application dossier', 'Legal documentation package', 'Shareholder & governance docs', 'Technical infrastructure description'] },
        { icon: 'ri-bar-chart-box-line', title: 'Regulatory Business Plan', desc: '5-year financial model with stress scenarios, P&L, balance sheet, cash flow — formatted per BCEAO reporting standards.', deliverables: ['5-year financial model', 'Regulatory P&L & balance sheet', 'Stress test scenarios', 'Capital adequacy projections'] },
        { icon: 'ri-shield-check-line', title: 'Governance & Risk', desc: 'Board composition, committee charters, AML/CFT framework, risk management policy, internal control — all BCEAO-compliant.', deliverables: ['Board governance framework', 'AML/CFT policy & procedures', 'Risk management policy', 'Internal control architecture'] },
        { icon: 'ri-government-line', title: 'Regulator Relations', desc: 'Preparation for Commission Bancaire interviews, response to information requests, follow-up until ministerial approval.', deliverables: ['Interview preparation pack', 'Q&A simulation sessions', 'Follow-up correspondence', 'Post-agrément compliance setup'] },
      ]
    : [
        { icon: 'ri-search-eye-line', title: 'Étude de Faisabilité', desc: "On évalue votre éligibilité contre les 12+ critères BCEAO. Vous obtenez un feu vert/orange/rouge clair avant d'investir dans le dossier complet.", deliverables: ['Analyse des écarts réglementaires', 'Scorecard d\'éligibilité', 'Feuille de route pré-demande', 'Recommandations structure du capital'] },
        { icon: 'ri-file-text-line', title: "Dossier d'Agrément", desc: "Package complet de 400+ pages : juridique, financier, technique, gouvernance — chaque section rédigée selon les spécifications BCEAO.", deliverables: ['Dossier de demande complet', 'Documentation juridique', 'Documents actionnariat & gouvernance', 'Description infrastructure technique'] },
        { icon: 'ri-bar-chart-box-line', title: 'Business Plan Réglementaire', desc: 'Modèle financier 5 ans avec scénarios de stress, P&L, bilan, trésorerie — formaté selon les normes de reporting BCEAO.', deliverables: ['Modèle financier 5 ans', 'P&L & bilan réglementaires', 'Scénarios de stress test', 'Projections adéquation des fonds propres'] },
        { icon: 'ri-shield-check-line', title: 'Gouvernance & Risques', desc: 'Composition du CA, chartes des comités, cadre LBC/FT, politique risques, contrôle interne — 100% conforme BCEAO.', deliverables: ['Cadre de gouvernance du CA', 'Politique & procédures LBC/FT', 'Politique de gestion des risques', 'Architecture de contrôle interne'] },
        { icon: 'ri-government-line', title: 'Relations Régulateurs', desc: "Préparation aux entretiens avec la Commission Bancaire, réponses aux demandes d'information, suivi jusqu'à l'approbation ministérielle.", deliverables: ['Kit de préparation aux entretiens', 'Sessions de simulation Q&R', 'Correspondance de suivi', 'Mise en place conformité post-agrément'] },
      ];

  const DELIVERABLES = isEn
    ? ['Regulatory feasibility study report', 'Complete 400+ page agrément application dossier', '5-year regulatory business plan with financial model', 'Board governance & committee charter package', 'AML/CFT policy & procedures manual', 'Risk management framework & internal control architecture', 'Commission Bancaire interview preparation kit', 'Post-agrément compliance monitoring roadmap']
    : ["Rapport d'étude de faisabilité réglementaire", "Dossier complet de demande d'agrément (400+ pages)", 'Business plan réglementaire 5 ans avec modèle financier', 'Package gouvernance CA & chartes des comités', 'Manuel de politique et procédures LBC/FT', 'Cadre de gestion des risques & architecture de contrôle interne', 'Kit de préparation aux entretiens Commission Bancaire', 'Feuille de route conformité post-agrément'];

  const RELATED = isEn
    ? [
        { title: 'Governance & International Taxation', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Structuring for regulated entities' },
        { title: 'RegTech & Regulatory Engineering', slug: 'regtech-regulatory-engineering', icon: 'ri-settings-3-line', kpi: 'Automated compliance for post-agrément operations' },
        { title: 'BCEAO/COBAC Pre-Inspection Audit', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Be inspection-ready from day one' },
      ]
    : [
        { title: 'Gouvernance & Fiscalité Internationale', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Structuration pour entités régulées' },
        { title: 'RegTech & Ingénierie Réglementaire', slug: 'regtech-regulatory-engineering', icon: 'ri-settings-3-line', kpi: 'Conformité automatisée pour opérations post-agrément' },
        { title: 'Audit de Pré-Inspection BCEAO/COBAC', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Soyez prêt pour l\'inspection dès le premier jour' },
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
      body.append('service', 'agrement-fintech-etablissement-paiement');
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
          ? 'Fintech Licensing & Payment Institution Agrément BCEAO | KHEPRA'
          : 'Agrément Fintech & Établissement de Paiement BCEAO | KHEPRA'}
        description={isEn
          ? 'Complete support for BCEAO Payment Institution licensing in UEMOA. Feasibility study, agrément dossier (400+ pages), regulatory business plan, governance framework, AML/CFT, Commission Bancaire interview preparation. Lomé, Togo.'
          : "Accompagnement complet à l'obtention de l'agrément d'Établissement de Paiement BCEAO en zone UEMOA. Étude de faisabilité, dossier d'agrément (400+ pages), business plan réglementaire, cadre de gouvernance, LBC/FT, préparation aux entretiens Commission Bancaire. Lomé, Togo."}
        keywords={isEn
          ? 'BCEAO agrément, payment institution license UEMOA, fintech licensing Africa, établissement de paiement BCEAO, regulatory approval fintech, Commission Bancaire UEMOA, fintech regulation francophone Africa, electronic money institution license'
          : 'agrément BCEAO, licence établissement paiement UEMOA, agrément fintech Afrique, établissement paiement BCEAO, approbation réglementaire fintech, Commission Bancaire UEMOA, régulation fintech Afrique francophone, agrément monnaie électronique'}
        ogImage="https://readdy.ai/api/search-image?query=Modern%20African%20fintech%20startup%20office%20with%20diverse%20team%20reviewing%20regulatory%20documents%20and%20BCEAO%20compliance%20framework%20on%20large%20digital%20screens%2C%20contemporary%20co-working%20atmosphere%20with%20warm%20amber%20and%20teal%20accents%2C%20West%20African%20tech%20ecosystem%20Lom%C3%A9%20Togo%2C%20professional%20fintech%20licensing%20and%20regulatory%20consulting%20imagery%2C%20serious%20strategic%20planning%20session%2C%20clean%20modern%20aesthetic%20with%20African%20design%20elements&width=1440&height=900&seq=agrement-fintech-hero&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/agrement-fintech-etablissement-paiement"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SCHEMA}
        hreflangLinks={buildHreflang('/services/agrement-fintech-etablissement-paiement')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Fintech Licensing & Agrément' : 'Agrément Fintech & Établissement de Paiement', path: '/services/agrement-fintech-etablissement-paiement' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20African%20fintech%20startup%20office%20with%20diverse%20team%20reviewing%20regulatory%20documents%20and%20BCEAO%20compliance%20framework%20on%20large%20digital%20screens%2C%20contemporary%20co-working%20atmosphere%20with%20warm%20amber%20and%20teal%20accents%2C%20West%20African%20tech%20ecosystem%20Lom%C3%A9%20Togo%2C%20professional%20fintech%20licensing%20and%20regulatory%20consulting%20imagery%2C%20serious%20strategic%20planning%20session%2C%20clean%20modern%20aesthetic%20with%20African%20design%20elements&width=1440&height=900&seq=agrement-fintech-hero&orientation=landscape"
              alt={isEn ? 'Fintech Licensing & Agrément BCEAO KHEPRA EXPERTS' : 'Agrément Fintech & Établissement de Paiement KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(15,118,110,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: '#0f766e' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#0f766e' }}>
                    {isEn ? 'Fintech Licensing — BCEAO Agrément' : 'Agrément Fintech — Licence BCEAO'}
                  </span>
                </div>

                <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'One agrément.' : 'Un agrément.'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #5eead4, #0f766e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? '8 countries. Zero regulatory risk.' : '8 pays. Zéro risque réglementaire.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'The BCEAO Payment Institution agrément is your passport to operate legally across the entire UEMOA zone. We build your complete dossier — feasibility, business plan, governance, AML/CFT — and prepare you for every step until ministerial approval.'
                    : "L'agrément d'Établissement de Paiement BCEAO est votre passeport pour opérer légalement dans toute la zone UEMOA. Nous construisons votre dossier complet — faisabilité, business plan, gouvernance, LBC/FT — et vous préparons à chaque étape jusqu'à l'approbation ministérielle."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.2)' }}>
                  <i className="ri-pass-valid-line text-lg" style={{ color: '#0f766e' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '12+ BCEAO criteria · 400+ page dossier · 100% UEMOA passport · 6-12 months to approval'
                      : '12+ critères BCEAO · Dossier 400+ pages · Passeport 100% UEMOA · 6-12 mois jusqu\'à l\'approbation'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('eligibility-check');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: '#ffffff', boxShadow: '0 4px 24px rgba(15,118,110,0.45)' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Check Your BCEAO Eligibility — 2 min' : 'Vérifiez votre Éligibilité BCEAO — 2 min'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <button
                    onClick={() => navigate('/tools/evaluation-maturite-fintech')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-smartphone-line" />
                    {isEn ? 'Fintech Maturity Assessment' : 'Évaluation Maturité Fintech'}
                  </button>
                </div>
                <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <i className="ri-information-line mr-1" />
                  {isEn ? 'Free · Confidential · Immediate Green/Orange/Red result · No commitment' : 'Gratuit · Confidentiel · Résultat Vert/Orange/Rouge immédiat · Sans engagement'}
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
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET — ÉLIGIBILITÉ INTERACTIVE ── */}
        <section className="py-20 lg:py-28" id="eligibility-check" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #0f766e 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(15,118,110,0.15)', border: '1px solid rgba(15,118,110,0.35)' }}>
                <i className="ri-stethoscope-line text-sm" style={{ color: '#0f766e' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0f766e' }}>{isEn ? 'Free 2-Minute Eligibility Check' : 'Test d\'Éligibilité Gratuit — 2 Minutes'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? 'Are you eligible for a' : 'Êtes-vous éligible à un'} <span style={{ background: 'linear-gradient(135deg, #5eead4, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isEn ? 'BCEAO Payment Institution agrément?' : 'agrément Établissement de Paiement BCEAO ?'}</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-base">{isEn ? '6 questions. Immediate result: Green / Orange / Red. 100% confidential.' : '6 questions. Résultat immédiat : Feu Vert / Feu Orange / Feu Rouge. 100 % confidentiel.'}</p>
            </div>

            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {eligibilityResult === null && eligibilityStep < ELIGIBILITY_QUESTIONS.length ? (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    {ELIGIBILITY_QUESTIONS.map((_, i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ background: i <= eligibilityStep ? '#0f766e' : 'rgba(255,255,255,0.15)' }} />
                    ))}
                  </div>
                  <div className="mb-6">
                    <span className="text-xs text-white/40">{isEn ? 'Question' : 'Question'} {eligibilityStep + 1}/{ELIGIBILITY_QUESTIONS.length}</span>
                    <h3 className="font-bold text-white text-lg mt-1">{ELIGIBILITY_QUESTIONS[eligibilityStep].question}</h3>
                  </div>
                  <div className="space-y-3">
                    {ELIGIBILITY_QUESTIONS[eligibilityStep].options.map((opt) => (
                      <button key={opt.value} onClick={() => handleEligibilityAnswer(ELIGIBILITY_QUESTIONS[eligibilityStep].id, opt.value)}
                        className="w-full text-left p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 text-sm"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : eligibilityResult !== null ? (
                <div className="text-center py-6">
                  {(() => {
                    const resultConfig = eligibilityResult === 'green'
                      ? { emoji: '🟢', level: isEn ? 'Green Light — Strongly Eligible' : 'Feu Vert — Fortement Éligible', color: '#10b981', bg: 'rgba(16,185,129,0.15)', desc: isEn ? 'Your profile meets the key BCEAO criteria for a Payment Institution agrément. You can move forward with the dossier preparation confidently. A KHEPRA expert can help you structure the complete application.' : 'Votre profil répond aux critères clés BCEAO pour un agrément d\'Établissement de Paiement. Vous pouvez avancer sereinement vers la préparation du dossier. Un expert KHEPRA peut vous aider à structurer la demande complète.' }
                      : eligibilityResult === 'orange'
                      ? { emoji: '🟠', level: isEn ? 'Orange Light — Eligible with Conditions' : 'Feu Orange — Éligible sous Conditions', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', desc: isEn ? 'Your profile is promising but has gaps that need to be addressed before applying. Focus on the red-flagged areas first — KHEPRA can help you close these gaps in 4-8 weeks.' : 'Votre profil est prometteur mais présente des lacunes à combler avant de déposer. Concentrez-vous sur les zones en rouge — KHEPRA peut vous aider à combler ces écarts en 4 à 8 semaines.' }
                      : { emoji: '🔴', level: isEn ? 'Red Light — Not Yet Eligible' : 'Feu Rouge — Pas Encore Éligible', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', desc: isEn ? 'Significant structural gaps need to be addressed before a BCEAO agrément application is viable. Don\'t be discouraged — many successful fintechs started here. KHEPRA can build your roadmap to eligibility.' : 'Des lacunes structurelles importantes doivent être comblées avant qu\'une demande d\'agrément BCEAO soit viable. Ne vous découragez pas — beaucoup de fintechs à succès ont commencé ici. KHEPRA peut construire votre feuille de route vers l\'éligibilité.' };

                    return (
                      <>
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: resultConfig.bg }}>
                          <span className="text-4xl">{resultConfig.emoji}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading), serif' }}>{resultConfig.level}</div>
                        <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm leading-relaxed">{resultConfig.desc}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={() => { const el = document.getElementById('contact-agrement'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: '#ffffff' }}
                          >
                            <i className="ri-calendar-check-line" />{isEn ? 'Talk to an Expert' : 'Parler à un Expert'}
                          </button>
                          <button onClick={resetEligibility} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}>
                            <i className="ri-refresh-line" />{isEn ? 'Retake' : 'Refaire le test'}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── PROBLÈME / TENSION ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <BigFourSubtitleBar label={isEn ? 'The cost of an incomplete dossier' : 'Le coût d\'un dossier incomplet'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'A rejected agrément is not' : 'Un agrément refusé n\'est pas'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #0f766e, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'just a delay. It\'s a signal to the market.' : 'juste un retard. C\'est un signal au marché.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Every month without an agrément is a month your competitors are building their regulatory moat. A returned dossier costs you 3-6 months of delay. A rejected one can damage your credibility with investors and partners. The BCEAO process is rigorous — and unforgiving of incomplete applications.'
                    : "Chaque mois sans agrément est un mois où vos concurrents construisent leur avantage réglementaire. Un dossier retourné vous coûte 3 à 6 mois de retard. Un dossier rejeté peut nuire à votre crédibilité auprès des investisseurs et partenaires. Le processus BCEAO est rigoureux — et ne pardonne pas les dossiers incomplets."}
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
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(15,118,110,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#0f766e' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#0f766e' }}>
                      {isEn ? 'The KHEPRA Agrément Method' : 'La Méthode Agrément KHEPRA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn ? 'From feasibility study to ministerial approval — one partner, end to end.' : 'De l\'étude de faisabilité à l\'approbation ministérielle — un seul partenaire, de bout en bout.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(15,118,110,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#0f766e' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5 PILIERS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#0f766e' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our 5-pillar agrément framework' : 'Notre cadre d\'agrément en 5 piliers'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? 'Everything the BCEAO requires. Nothing they don\'t.' : 'Tout ce que la BCEAO exige. Rien de ce qu\'elle n\'exige pas.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Our methodology is calibrated to the exact BCEAO Instruction n°008-05-2015 requirements. No filler. No missing sections. Just what the Commission Bancaire needs to see.'
                  : 'Notre méthodologie est calibrée sur les exigences exactes de l\'Instruction BCEAO n°008-05-2015. Pas de remplissage. Pas de sections manquantes. Juste ce que la Commission Bancaire a besoin de voir.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-teal-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(15,118,110,0.10)', border: '1px solid rgba(15,118,110,0.20)' }}>
                    <i className={`${pillar.icon} text-lg`} style={{ color: '#0f766e' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2" title={pillar.title}>{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{pillar.desc}</p>
                  <div className="space-y-1.5 pt-3 border-t border-gray-100">
                    {pillar.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <i className="ri-check-line text-teal-600 text-[10px] mt-0.5 flex-shrink-0" />
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
                <BigFourSubtitleBar label={isEn ? 'Deliverables included' : 'Livrables inclus'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Your complete agrément package' : 'Votre package agrément complet'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(15,118,110,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#0f766e' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#0f766e' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'The UEMOA Passport' : 'Le Passeport UEMOA'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'One agrément opens 8 countries' : 'Un agrément ouvre 8 pays'}
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="ri-global-line text-2xl" style={{ color: '#0f766e' }} />
                      <div>
                        <p className="font-bold text-gray-900">{isEn ? 'UEMOA Single Passport' : 'Passeport Unique UEMOA'}</p>
                        <p className="text-xs text-gray-500">{isEn ? 'A BCEAO Payment Institution agrément is valid in all 8 UEMOA member states without additional licensing' : 'Un agrément d\'Établissement de Paiement BCEAO est valable dans les 8 États membres de l\'UEMOA sans licence supplémentaire'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['Togo', 'Bénin', "Côte d'Ivoire", 'Sénégal', 'Burkina Faso', 'Mali', 'Niger', 'Guinée-Bissau'].map((country) => (
                        <span key={country} className="text-xs bg-white rounded-lg px-2 py-1.5 text-center border border-gray-100 text-gray-600">{country}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: 'ri-bank-line', label: isEn ? '300M+ consumers' : '300M+ consommateurs', sub: isEn ? 'UEMOA total addressable market' : 'Marché total UEMOA' },
                      { icon: 'ri-smartphone-line', label: isEn ? '60%+ mobile penetration' : '60%+ pénétration mobile', sub: isEn ? 'Digital payment ready population' : 'Population prête pour le paiement digital' },
                      { icon: 'ri-money-dollar-circle-line', label: isEn ? '€50B+ payments' : '50Md€+ de paiements', sub: isEn ? 'Annual digital payment volume (est.)' : 'Volume annuel paiements digitaux (est.)' },
                      { icon: 'ri-line-chart-line', label: isEn ? '25%+ CAGR' : '25%+ TCAC', sub: isEn ? 'Fintech market growth rate' : 'Taux de croissance du marché fintech' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-gray-100">
                        <i className={`${stat.icon} text-lg mb-2`} style={{ color: '#0f766e' }} />
                        <div className="font-bold text-gray-900 text-sm">{stat.label}</div>
                        <div className="text-xs text-gray-400">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#0f766e' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 6 to 12 months' : 'Durée : 6 à 12 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Fixed-price proposal after eligibility check' : 'Devis sur mesure après test d\'éligibilité'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { const el = document.getElementById('contact-agrement'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: '#ffffff' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Check Your BCEAO Eligibility' : 'Vérifier votre éligibilité BCEAO'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Fintech Licensing & Agrément BCEAO' : 'Agrément Fintech & Établissement de Paiement'} />

        {/* ── LEAD MAGNET ── */}
        <InlineLeadMagnet context="agrement-fintech" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="agrement-fintech-etablissement-paiement" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar label={isEn ? 'Related services' : 'Services connexes'} variant="left-accent" accentColor="primary" className="mb-10" />
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(15,118,110,0.10)', border: '1px solid rgba(15,118,110,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#0f766e' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-teal-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#0f766e' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-agrement">
          <PremiumServiceCTA
            formId="service-agrement-fintech"
            formUrl="https://readdy.ai/api/form/d8hdemscl43d0bibejt0"
            badge={isEn ? 'Start your agrément journey' : 'Démarrez votre parcours d\'agrément'}
            title={isEn ? 'Ready to unlock the UEMOA market?' : 'Prêt à débloquer le marché UEMOA ?'}
            subtitle={isEn
              ? 'Take the free eligibility check first, then discuss your agrément strategy with a senior expert who knows the BCEAO process inside out. No commitment, 100% confidential.'
              : 'Faites le test d\'éligibilité gratuit d\'abord, puis discutez de votre stratégie d\'agrément avec un expert senior qui connaît le processus BCEAO de fond en comble. Sans engagement, 100 % confidentiel.'}
            primaryBtnText={isEn ? 'Check My BCEAO Eligibility' : 'Vérifier mon éligibilité BCEAO'}
            secondaryBtnText={isEn ? 'Fintech Maturity Assessment' : 'Évaluation Maturité Fintech'}
            secondaryBtnAction="diagnostic-flash"
            variant="dark"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/agrement-fintech-etablissement-paiement/`}
            title={isEn ? 'Fintech Licensing & Payment Institution — KHEPRA EXPERTS' : 'Agrément Fintech & Établissement de Paiement — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'agrement-fintech',
          title: isEn ? 'Fintech Maturity & BCEAO Eligibility Assessment' : 'Évaluation Maturité Fintech & Éligibilité BCEAO',
          subtitle: isEn ? 'Check your BCEAO Payment Institution eligibility in 2 minutes. Immediate green/orange/red result with actionable recommendations.' : 'Vérifiez votre éligibilité à l\'agrément Établissement de Paiement BCEAO en 2 minutes. Résultat vert/orange/rouge immédiat avec recommandations.',
          toolSlug: '/tools/evaluation-maturite-fintech',
          icon: 'ri-smartphone-line',
          accentColor: '#0f766e',
          timeMinutes: '10 min',
          usersCount: '800+',
          successRate: '94%',
        }}
      />
    </>
  );
}