import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';
import ExitIntentLeadMagnet from '@/components/feature/ExitIntentLeadMagnet';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const FORM_URL = 'https://readdy.ai/api/form/d8hiobb700fk75v20a40';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/services/gouvernance-fiscalite-internationale#webpage`,
      url: `${SITE_URL}/services/gouvernance-fiscalite-internationale`,
      name: 'Transfer Pricing & Tax Governance Africa™ | KHEPRA EXPERTS',
      description: 'Architecture 4 niveaux : Diagnostic Prix de Transfert gratuit, Documentation BEPS Premium, Enterprise Tax Governance annuel et Abonnement Tax Compliance. Méthodologie OCDE BEPS Action 13 pour groupes panafricains, banques, fintechs et holdings en zone UEMOA/CEMAC.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: 'Transfer Pricing & Tax Governance Africa™', item: `${SITE_URL}/services/gouvernance-fiscalite-internationale` },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/gouvernance-fiscalite-internationale#service`,
      name: 'Transfer Pricing & Tax Governance Africa™',
      serviceType: 'Transfer Pricing Advisory',
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        telephone: '+22893984909',
        email: 'contact@khepraexperts.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressRegion: 'Maritime', addressCountry: 'TG' },
      },
      areaServed: [
        { '@type': 'Place', name: 'UEMOA' },
        { '@type': 'Place', name: 'CEMAC' },
        { '@type': 'Place', name: 'OHADA' },
      ],
      description: 'Architecture 4 niveaux pour la conformité prix de transfert en Afrique francophone : Diagnostic gratuit 8 min, Documentation BEPS Premium (Master File + Local File), Enterprise Tax Governance (accompagnement annuel) et Abonnement Tax Compliance (revenus récurrents). Méthodologie OCDE BEPS Action 13.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu’est-ce que Transfer Pricing & Tax Governance Africa™ ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'C’est l’offre premium de KHEPRA EXPERTS en matière de prix de transfert et de gouvernance fiscale internationale, structurée en 4 niveaux progressifs. Niveau 1 — Diagnostic Prix de Transfert KHEPRA™ (gratuit, 8 min). Niveau 2 — Documentation BEPS Premium (mission complète 6-10 semaines, Master File + Local File). Niveau 3 — Enterprise Tax Governance (accompagnement annuel avec veille réglementaire et assistance contrôle fiscal). Niveau 4 — Abonnement Tax Compliance (dashboard conformité, alertes BEPS, revue trimestrielle). Chaque niveau est piloté par un Partner dédié, sans juniorisation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels sont les risques fiscaux pour un groupe opérant en Afrique sans documentation prix de transfert ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les principaux risques incluent : redressements fiscaux pour prix de transfert non documentés (500M à 2 000M FCFA), pénalités de 40-80% pour défaut de documentation, ajustement des prix par l’administration avec inversion de la charge de la preuve, risque réputationnel vis-à-vis des investisseurs, exclusion des appels d’offres publics et blocage des financements des DFI.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre le Diagnostic gratuit et la mission Premium ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le Diagnostic gratuit (Niveau 1) est un questionnaire en ligne de 8 minutes qui génère un score de conformité /100, une classification de risque et des recommandations automatiques. La mission Documentation BEPS Premium (Niveau 2) est un accompagnement complet de 6 à 10 semaines avec un Partner dédié qui produit la documentation OCDE BEPS Action 13 complète : Master File, Local File, analyse fonctionnelle FAR, étude de benchmarking, politique groupe de prix de transfert et formation des équipes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qu’apporte l’Abonnement Tax Compliance par rapport à une mission ponctuelle ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'L’Abonnement Tax Compliance (Niveau 4) transforme la conformité prix de transfert en un processus continu plutôt qu’un événement ponctuel. Il inclut : un dashboard de conformité en temps réel, des alertes réglementaires BEPS/OCDE/ATAF, une revue trimestrielle de la cartographie des risques, un support hotline permanent, et la mise à jour annuelle de l’ensemble de la documentation. C’est l’assurance de ne jamais être pris au dépourvu lors d’un contrôle fiscal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dans quels pays KHEPRA EXPERTS intervient-il en matière de prix de transfert ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KHEPRA EXPERTS intervient dans l’ensemble de la zone UEMOA (Togo, Bénin, Côte d’Ivoire, Sénégal, Burkina Faso, Mali, Niger, Guinée-Bissau) et CEMAC (Cameroun, Gabon, Congo, RCA, Tchad, Guinée Équatoriale). Notre méthodologie intègre les spécificités de chaque législation nationale tout en appliquant les standards OCDE BEPS Action 13.',
          },
        },
      ],
    },
  ],
};

const clientProfiles = [
  {
    id: 'groupes',
    label: 'Groupes Multinationaux',
    icon: 'ri-global-line',
    hook: 'Votre documentation prix de transfert est-elle défendable face à un contrôle fiscal ?',
    pain: 'Redressements fiscaux potentiels de 500M à 2 000M FCFA, transactions intragroupe non documentées, management fees contestables',
    offer: 'Documentation OCDE BEPS complète (Master File, Local File, CbCR) + Analyse économique',
    result: 'Risque de redressement réduit de 80 %, conformité BEPS intégrale',
  },
  {
    id: 'banques',
    label: 'Banques & IMF',
    icon: 'ri-bank-line',
    hook: 'Vos transactions intragroupe résisteraient-elles à un audit fiscal contradictoire ?',
    pain: 'Flux intragroupe non documentés, absence d’analyse de pleine concurrence, vulnérabilité face aux superviseurs',
    offer: 'Documentation prix de transfert bancaire + Conformité prudentielle BCEAO/COBAC',
    result: 'Double conformité fiscale et prudentielle — 100 % des exigences couvertes',
  },
  {
    id: 'fintechs',
    label: 'Fintechs & Holdings',
    icon: 'ri-smartphone-line',
    hook: 'Vos redevances intragroupe et vos management fees sont-ils justifiables ?',
    pain: 'Prix de transfert non documentés = blocage des financements, due diligence échouée, décote de valorisation',
    offer: 'Documentation BEPS + Politique prix de transfert + Défense fiscale',
    result: 'Dossier investisseur irréprochable, closing sécurisé, conformité démontrable',
  },
  {
    id: 'investisseurs',
    label: 'Investisseurs & Fonds',
    icon: 'ri-funds-line',
    hook: 'Votre cible a-t-elle des passifs fiscaux latents qui réduiront sa valorisation ?',
    pain: '9 deals sur 10 révèlent des risques cachés — passifs fiscaux latents, documentation BEPS absente, gouvernance défaillante',
    offer: 'Due Diligence fiscale prix de transfert + Rapport red flags + Valorisation ajustée',
    result: 'Rapport en 4 semaines, closing sécurisé, risque post-acquisition minimisé',
  },
];

const pricingTiers = [
  {
    name: 'Diagnostic Prix de Transfert',
    subtitle: 'Niveau 1 — Lead Magnet',
    price: 'Gratuit',
    duration: '8 min + 30 min restitution Partner',
    target: 'Toute organisation exposée aux prix de transfert',
    deliverables: [
      'Questionnaire en ligne de 12 questions sur 4 axes',
      'Score de conformité BEPS sur 100 avec cartographie radar',
      'Identification des risques BEPS prioritaires',
      'Plan d’action personnalisé et priorisé',
      'Restitution confidentielle de 30 min avec un Partner',
    ],
    highlight: false,
    cta: 'Lancer le Diagnostic Gratuit',
    ctaAnchor: '#diagnostic-interactif',
  },
  {
    name: 'Documentation BEPS Premium',
    subtitle: 'Niveau 2 — Mission Complète',
    price: 'Sur devis',
    duration: '6-10 semaines',
    target: 'Groupes panafricains & filiales de multinationales',
    deliverables: [
      'Master File : documentation globale du groupe conforme OCDE BEPS Action 13',
      'Local File : documentation spécifique à chaque filiale',
      'Analyse fonctionnelle FAR (Fonctions, Actifs, Risques) documentée',
      'Étude de benchmarking et détermination de la pleine concurrence',
      'Politique groupe de prix de transfert formalisée et signée',
      'Formation des équipes Finance, Fiscalité et Conformité',
      'Revue qualité par un second Partner avant livraison',
    ],
    highlight: true,
    cta: 'Demander un devis',
    ctaHref: 'https://wa.me/22893984909?text=Bonjour+KHEPRA+EXPERTS,+je+souhaite+un+devis+pour+la+Documentation+BEPS+Premium',
  },
  {
    name: 'Enterprise Tax Governance',
    subtitle: 'Niveau 3 — Accompagnement Annuel',
    price: 'Sur devis',
    duration: '12 mois renouvelables',
    target: 'Groupes avec plusieurs filiales et transactions complexes',
    deliverables: [
      'Mise à jour annuelle complète de la documentation BEPS',
      'Veille réglementaire BEPS/OCDE/ATAF et législations nationales',
      'Assistance contrôle fiscal : préparation du dossier de défense',
      'Simulation de contrôle fiscal contradictoire annuelle',
      'Country-by-Country Reporting (CbCR) pour les groupes éligibles',
      'Comité de pilotage trimestriel avec la direction fiscale',
      'Formation continue des équipes et mise à jour des procédures',
    ],
    highlight: false,
    cta: 'Contacter un Partner',
    ctaHref: 'https://wa.me/22893984909?text=Bonjour+KHEPRA+EXPERTS,+je+souhaite+%C3%A9changer+sur+l%27offre+Enterprise+Tax+Governance',
  },
  {
    name: 'Abonnement Tax Compliance',
    subtitle: 'Niveau 4 — Revenus Récurrents',
    price: 'Sur devis',
    duration: 'Abonnement mensuel/trimestriel',
    target: 'Organisations recherchant une conformité continue',
    deliverables: [
      'Dashboard conformité en temps réel avec indicateurs clés',
      'Alertes réglementaires BEPS/OCDE/ATAF personnalisées',
      'Revue trimestrielle de la cartographie des risques fiscaux',
      'Support hotline permanent (email et téléphone)',
      'Mise à jour annuelle de la documentation intégrée dans la mission contractuelle',
      'Accès prioritaire au Partner dédié avec points trimestriels',
      'Protection continue — jamais pris au dépourvu lors d’un contrôle',
    ],
    highlight: false,
    cta: 'Contacter un Partner',
    ctaHref: 'https://wa.me/22893984909?text=Bonjour+KHEPRA+EXPERTS,+je+souhaite+%C3%A9changer+sur+l%27Abonnement+Tax+Compliance',
  },
];

const methodologyPhases = [
  {
    phase: 'Phase 1',
    title: 'Diagnostic & Cartographie',
    duration: 'Semaines 1-3',
    icon: 'ri-search-eye-line',
    steps: [
      'Cartographie exhaustive des flux intragroupe et des transactions contrôlées',
      'Analyse fonctionnelle FAR (Fonctions, Actifs, Risques)',
      'Évaluation de la maturité documentation BEPS',
      'Identification des gaps documentaires et réglementaires',
      'Matrice de risques classée par criticité et impact financier',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Analyse Économique',
    duration: 'Semaines 3-6',
    icon: 'ri-bar-chart-box-line',
    steps: [
      'Études de benchmarking sur bases de données internationales',
      'Détermination du taux de pleine concurrence par catégorie de transaction',
      'Analyse des clés de répartition des coûts et des marges',
      'Stress testing fiscal : simulation de contrôle et évaluation des expositions',
      'Rapport d’analyse économique avec recommandations chiffrées',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Documentation OCDE',
    duration: 'Semaines 6-10',
    icon: 'ri-file-text-line',
    steps: [
      'Master File : documentation globale du groupe conforme OCDE BEPS',
      'Local File : documentation spécifique à chaque filiale',
      'Country-by-Country Reporting pour les groupes éligibles',
      'Politiques de prix de transfert et procédures internes formalisées',
      'Manuel de conformité et procédures de conservation des preuves',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Défense & Formation',
    duration: 'Semaines 10-14',
    icon: 'ri-shield-check-line',
    steps: [
      'Préparation du dossier de défense fiscale (argumentaire + preuves)',
      'Simulation de contrôle fiscal contradictoire',
      'Formation des équipes fiscales, financières et juridiques',
      'Mise en place des procédures de conservation des preuves',
      'Élaboration du plan de réponse aux demandes d’information',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Monitoring Continu',
    duration: 'Semaines 14+',
    icon: 'ri-dashboard-line',
    steps: [
      'Mise en place d’indicateurs de suivi permanents',
      'Revue trimestrielle de la cartographie des risques',
      'Veille réglementaire : évolutions OCDE, ATAF, législations nationales',
      'Mise à jour annuelle des documentations et politiques',
      'Comité de pilotage trimestriel avec la direction fiscale du groupe',
    ],
  },
];

const faqs = [
  {
    q: 'Qu’est-ce que Transfer Pricing & Tax Governance Africa™ et en quoi se différencie-t-il des offres traditionnelles ?',
    a: 'C’est la seule offre en Afrique francophone qui combine un dispositif progressif — du Diagnostic gratuit à la mission contractuelle de conformité continue — en matière de prix de transfert. Contrairement aux cabinets qui proposent des missions ponctuelles sans continuité, notre modèle permet aux clients de démarrer par un diagnostic gratuit, puis de monter en puissance jusqu’à une mission de conformité continue. Chaque niveau est piloté par un Partner dédié, sans couches de juniorisation. Notre promesse : même méthodologie que les Big Four, avec une connaissance approfondie des réalités fiscales UEMOA/CEMAC.',
  },
  {
    q: 'Quel est le ROI d’une mission Transfer Pricing & Tax Governance Africa™ ?',
    a: 'L\u2019investissement dans une documentation préventive est amorti dès le premier risque de redressement évité. Pour une filiale africaine d\u2019un groupe multinational avec 5 à 10 Mds FCFA de transactions intragroupe annuelles, un redressement fiscal pour prix de transfert peut atteindre 500M à 2 000M FCFA. Notre Documentation BEPS Premium (Niveau 2) sécurise l\u2019intégralité des transactions documentées. Chaque mission fait l\u2019objet d\u2019un devis confidentiel sur mesure, sans engagement. Le ROI est immédiat et exponentiel.',
  },
  {
    q: 'Comment s’articule le passage du Diagnostic gratuit (Niveau 1) à la mission Premium (Niveau 2) ?',
    a: 'Le Diagnostic gratuit de 8 minutes génère un score de conformité /100 et identifie vos risques prioritaires. À l’issue du diagnostic, un Partner KHEPRA EXPERTS vous propose une restitution confidentielle de 30 minutes. Si votre score indique des lacunes significatives, le Partner vous présentera une proposition sur mesure pour le Niveau 2 (Documentation BEPS Premium), calibrée sur l’étendue exacte de vos besoins identifiés. Aucun engagement : vous décidez si et quand passer au niveau supérieur.',
  },
  {
    q: 'Qu’apporte l’Abonnement Tax Compliance par rapport à une mission ponctuelle ?',
    a: 'Une mission ponctuelle documente vos prix de transfert à un instant T. L’Abonnement Tax Compliance (Niveau 4) maintient cette conformité dans la durée. Il inclut un dashboard en temps réel, des alertes réglementaires dès qu’une évolution BEPS ou fiscale survient, une revue trimestrielle de vos risques, un support hotline permanent, et la mise à jour annuelle complète de votre documentation. C’est l’assurance de ne jamais être pris au dépourvu lors d’un contrôle fiscal — et de transformer la conformité d’un coût ponctuel en un actif stratégique permanent.',
  },
  {
    q: 'Comment KHEPRA EXPERTS garantit-il la confidentialité des données fiscales de ses clients ?',
    a: 'La confidentialité est un pilier fondamental. Chaque engagement est encadré par un NDA signé avant toute divulgation d’information. Les données sont stockées sur des serveurs sécurisés avec chiffrement de bout en bout. Aucune information client n’est partagée entre missions sans consentement explicite. Notre charte déontologique, disponible publiquement, encadre l’intégralité de nos pratiques. En matière de prix de transfert, la confidentialité est d’autant plus critique que les données échangées touchent au cœur de la stratégie fiscale du groupe.',
  },
];

export default function GouvernanceFiscaliteInternationalePage() {
  const navigate = useNavigate();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);
  const [activeMethodology, setActiveMethodology] = useState(0);
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', entreprise: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [diagnosticScore, setDiagnosticScore] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = clientProfiles[activeProfile];

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
      body.append('service', 'transfer-pricing-tax-governance');
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ nom: '', email: '', telephone: '', entreprise: '', fonction: '', enjeux: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const diagnosticQuestions = [
    {
      id: 'flux',
      question: 'Disposez-vous d’une cartographie complète de vos flux intragroupe (management fees, redevances, financements, prestations de services) ?',
      options: [
        { value: 'complete', label: 'Oui, cartographie exhaustive documentée', score: 3 },
        { value: 'partielle', label: 'Cartographie partielle, certains flux non documentés', score: 1 },
        { value: 'aucune', label: 'Aucune cartographie formalisée', score: 0 },
      ],
    },
    {
      id: 'documentation',
      question: 'Votre documentation prix de transfert (Master File, Local File) est-elle à jour et conforme aux standards OCDE BEPS Action 13 ?',
      options: [
        { value: 'oui', label: 'Oui, documentation complète et à jour (moins de 12 mois)', score: 3 },
        { value: 'partielle', label: 'Documentation partielle ou non actualisée', score: 1 },
        { value: 'non', label: 'Aucune documentation formalisée', score: 0 },
      ],
    },
    {
      id: 'benchmarking',
      question: 'Avez-vous réalisé une étude de benchmarking pour justifier vos prix de transfert au regard du principe de pleine concurrence ?',
      options: [
        { value: 'oui', label: 'Oui, étude de benchmarking récente avec bases de données internationales', score: 3 },
        { value: 'partiel', label: 'Étude partielle ou ancienne (plus de 3 ans)', score: 1 },
        { value: 'non', label: 'Aucune étude de benchmarking réalisée', score: 0 },
      ],
    },
    {
      id: 'politique',
      question: 'Disposez-vous d’une politique groupe de prix de transfert formalisée, validée par la direction et communiquée aux filiales ?',
      options: [
        { value: 'oui', label: 'Oui, politique formalisée, signée et déployée', score: 3 },
        { value: 'partiel', label: 'Politique en projet ou partiellement déployée', score: 1 },
        { value: 'non', label: 'Aucune politique groupe de prix de transfert', score: 0 },
      ],
    },
    {
      id: 'defense',
      question: 'Pourriez-vous produire un dossier de défense fiscale complet (documentation + analyse économique) sous 30 jours en cas de contrôle ?',
      options: [
        { value: 'oui', label: 'Oui, dossier complet mobilisable immédiatement', score: 3 },
        { value: 'incertain', label: 'Possible mais avec des délais et une qualité incertaine', score: 1 },
        { value: 'non', label: 'Non, impossible dans les délais impartis', score: 0 },
      ],
    },
  ];

  const handleDiagnosticAnswer = (qId: string, value: string) => {
    const newAnswers = { ...diagnosticAnswers, [qId]: value };
    setDiagnosticAnswers(newAnswers);
    if (diagnosticStep < diagnosticQuestions.length - 1) {
      setTimeout(() => setDiagnosticStep(prev => prev + 1), 300);
    } else {
      const total = diagnosticQuestions.reduce((sum, q) => {
        const option = q.options.find(o => o.value === newAnswers[q.id]);
        return sum + (option ? option.score : 0);
      }, 0);
      setDiagnosticScore(total);
      setDiagnosticStep(prev => prev + 1);
    }
  };

  const resetDiagnostic = () => {
    setDiagnosticStep(0);
    setDiagnosticAnswers({});
    setDiagnosticScore(null);
  };

  const maxScore = diagnosticQuestions.length * 3;

  const getScoreInterpretation = (score: number) => {
    const pct = (score / maxScore) * 100;
    if (pct >= 80) return { level: 'Profil Conforme', color: '#10b981', bg: 'rgba(16,185,129,0.1)', desc: 'Votre dispositif prix de transfert est solide. Vous êtes probablement en mesure de défendre vos positions en cas de contrôle. KHEPRA EXPERTS peut vous accompagner pour maintenir votre avance via un Abonnement Tax Compliance (Niveau 4) avec veille réglementaire continue et mises à jour annuelles.' };
    if (pct >= 50) return { level: 'Profil à Risque Modéré', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', desc: 'Votre dispositif présente des lacunes significatives. Plusieurs transactions intragroupe pourraient être contestées en cas de contrôle. Une Documentation BEPS Premium (Niveau 2) est recommandée dans les 90 jours pour combler les gaps critiques.' };
    if (pct >= 25) return { level: 'Profil à Haut Risque', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', desc: 'Votre exposition est élevée. Chaque contrôle fiscal, chaque due diligence investisseur est une menace potentielle. Une intervention structurée est nécessaire pour éviter des conséquences financières significatives à court terme.' };
    return { level: 'Profil Critique', color: '#dc2626', bg: 'rgba(220,38,38,0.1)', desc: 'Votre absence de dispositif prix de transfert vous expose à des risques majeurs : redressements fiscaux de 500M à 2 000M FCFA, blocage de financements, pénalités. Une intervention urgente est impérative pour protéger votre organisation.' };
  };

  const roiScenarios = [
    { label: 'Redressement fiscal type', before: '500M – 2 000M FCFA', after: '< 50M FCFA', reduction: '90-97%' },
    { label: 'Pénalités défaut documentation', before: '50M – 200M FCFA', after: '0 FCFA', reduction: '100%' },
    { label: 'Cycle de vente institutionnelle', before: '6-9 mois', after: '4-6 semaines', reduction: '60-80%' },
    { label: 'Décote valorisation (due diligence)', before: '20-40%', after: '0%', reduction: '100%' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SeoHead
        title="Transfer Pricing & Tax Governance Africa™ | Diagnostic → Abonnement | KHEPRA"
        description="Architecture 4 niveaux pour la conformité prix de transfert : Diagnostic gratuit 8 min, Documentation BEPS Premium (Master File + Local File), Enterprise Tax Governance annuel, Abonnement Tax Compliance. Méthodologie OCDE BEPS Action 13. Groupes, banques, fintechs UEMOA/CEMAC."
        keywords="prix de transfert Afrique, documentation BEPS OCDE, Master File Local File, fiscalité internationale UEMOA, conformité prix de transfert CEMAC, diagnostic prix de transfert gratuit, mission conformité fiscale sur devis, KHEPRA EXPERTS transfer pricing"
        canonicalPath="/services/gouvernance-fiscalite-internationale"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageAlt="Transfer Pricing & Tax Governance Africa™ | KHEPRA EXPERTS"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={schema}
      />

      <Navigation />

      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', borderTop: '2px solid #b45309' }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: '#f59e0b' }} />
              <span className="text-white text-sm font-medium">Diagnostic Prix de Transfert Gratuit — Score BEPS en 8 minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#diagnostic-interactif" className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 no-underline" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}>
                <i className="ri-stethoscope-line" />Lancer le diagnostic
              </a>
              <BrochureDownloadButton variant="outline" label="Brochure PDF" />
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="pt-20">
        {/* ========== HERO ========== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #060e1c 0%, #0a1628 40%, #0d1f3c 100%)' }}>
          <div className="absolute inset-0">
            <img src="https://readdy.ai/api/search-image?query=professional%20African%20multinational%20corporate%20governance%20tax%20strategy%20boardroom%20dark%20charcoal%20atmosphere%20warm%20amber%20and%20copper%20accent%20lighting%20senior%20executives%20reviewing%20fiscal%20documentation%20compliance%20reports%20modern%20financial%20advisory%20office%20West%20Africa%20business%20district%20serious%20strategic%20atmosphere%20no%20blue%20no%20purple%20warm%20amber%20orange%20accents%20institutional%20consulting%20Big%20Four%20style%20francophone%20transfer%20pricing&width=1920&height=1080&seq=khepra-tp-hero-v2&orientation=landscape" alt="Transfer Pricing & Tax Governance Africa™" className="w-full h-full object-cover object-top opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,14,28,0.95) 0%, rgba(10,22,40,0.85) 50%, rgba(13,31,60,0.9) 100%)' }} />
          </div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(180,83,9,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(180,83,9,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
            <BigFourSubtitleBar variant="centered-pillars" accentColor="accent" icon="ri-scales-3-line">
              Architecture 4 Niveaux — Diagnostic → Premium → Enterprise → Abonnement
            </BigFourSubtitleBar>

            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transfer Pricing &{' '}
              <span style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tax Governance Africa™</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/70">La rigueur Big Four, la réalité des prix de transfert en Afrique</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              La seule offre en Afrique francophone structurée en 4 niveaux progressifs — du Diagnostic gratuit à l’Abonnement de conformité continue. Méthodologie OCDE BEPS Action 13 complète, Partner dédié, zéro juniorisation.
            </p>

            <div className="inline-flex bg-white/8 rounded-2xl p-1.5 mb-8 gap-1 flex-wrap justify-center">
              {clientProfiles.map((p, i) => (
                <button key={p.id} onClick={() => setActiveProfile(i)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-300"
                  style={{ background: activeProfile === i ? 'linear-gradient(135deg, #b45309 0%, #d97706 100%)' : 'transparent', color: activeProfile === i ? '#ffffff' : 'rgba(255,255,255,0.6)' }}>
                  <i className={`${p.icon} text-sm`} />{p.label}
                </button>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mb-10 p-6 rounded-2xl text-left transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(180,83,9,0.15)' }}>
                  <i className={`${profile.icon} text-lg`} style={{ color: '#d97706' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-white font-bold text-base">{profile.hook}</span>
                  <p className="text-white/50 text-sm mt-2 mb-3">{profile.pain}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(180,83,9,0.15)', color: '#d97706' }}>
                      <i className="ri-check-line mr-1" />{profile.offer}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                      <i className="ri-trophy-line mr-1" />{profile.result}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
              {[{ value: '22+', label: 'Ans d’expertise combinée' }, { value: '500M€+', label: 'Transactions évaluées' }, { value: '15', label: 'Pays UEMOA/CEMAC' }, { value: '80%', label: 'Risque redressement réduit' }].map((stat, i) => (
                <div key={i} className="py-4 px-3 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(180,83,9,0.08)' }}>
                  <div className="font-playfair text-2xl sm:text-3xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#diagnostic-interactif" className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 no-underline" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff', boxShadow: '0 4px 24px rgba(180,83,9,0.45)' }}>
                <i className="ri-stethoscope-line text-xl" />Lancer le Diagnostic Gratuit (8 min)
              </a>
              <a href="#pricing" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1 no-underline" style={{ border: '1px solid rgba(180,83,9,0.4)', color: '#d97706', background: 'rgba(180,83,9,0.06)' }}>
                <i className="ri-stack-line" />Voir les 4 niveaux
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
              <i className="ri-shield-check-line" style={{ color: '#10b981' }} />
              <span>Sans engagement — Confidentialité garantie</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-8 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(180,83,9,0.6), transparent)' }} />
            <i className="ri-arrow-down-s-line text-white/30 text-xl" />
          </div>
        </section>

        {/* ========== PROBLÈME — COÛT DE L’INACTION ========== */}
        <section className="py-20 lg:py-28" style={{ background: '#fafaf8' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(10,22,40,0.06)', border: '1px solid rgba(10,22,40,0.12)' }}>
                <i className="ri-alert-line text-sm" style={{ color: '#0a1628' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0a1628' }}>Le Problème — Coût de l’Inaction</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
                Le risque fiscal caché qui menace aujourd’hui les{' '}
                <span style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>groupes africains</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                Un contrôle fiscal pour prix de transfert non documentés peut générer un redressement de 500M à 2 000M FCFA, même sans intention frauduleuse. Le simple défaut de documentation est sanctionnable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {[
                  { icon: 'ri-file-warning-line', title: 'Redressement fiscal pour prix de transfert non documentés', desc: '500M à 2 000M FCFA de rappels d’impôts, pénalités 40-80% et intérêts de retard.', color: '#ef4444' },
                  { icon: 'ri-building-line', title: 'Blocage des financements institutionnels', desc: 'Les bailleurs (IFC, BAD, BOAD) exigent une documentation BEPS conforme pour instruire un dossier.', color: '#f59e0b' },
                  { icon: 'ri-hand-coin-line', title: 'Dépréciation de la valorisation', desc: 'Jusqu’à 40% de décote lors d’une acquisition ou levée de fonds pour passifs fiscaux latents.', color: '#ef4444' },
                  { icon: 'ri-shield-flash-line', title: 'Pénalités pour défaut de documentation', desc: 'Même sans fraude, le simple défaut de Master File et Local File est sanctionnable pécuniairement.', color: '#f59e0b' },
                ].map((risk, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: '#ffffff', border: `1px solid ${risk.color}20` }}>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${risk.color}15` }}>
                      <i className={`${risk.icon} text-xl`} style={{ color: risk.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1" style={{ color: '#0a1628' }}>{risk.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{risk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl" style={{ background: '#ffffff', border: '1px solid rgba(180,83,9,0.2)' }}>
                <h3 className="font-playfair text-xl font-bold mb-6" style={{ color: '#0a1628' }}>5 Signaux d’Alerte — Auto-Évaluez Votre Exposition</h3>
                <div className="space-y-5">
                  {[
                    { num: 1, text: 'Pertes récurrentes de votre filiale africaine sans documentation économique justifiant la situation' },
                    { num: 2, text: 'Management fees supérieurs à 5% du chiffre d’affaires sans analyse de pleine concurrence' },
                    { num: 3, text: 'Redevances de marque ou de technologie sans démonstration de la valeur créée localement' },
                    { num: 4, text: 'Financements intragroupe avec des taux d’intérêt non documentés par rapport au marché' },
                    { num: 5, text: 'Absence totale de documentation prix de transfert (Master File, Local File) — pénalités même sans fraude' },
                  ].map((signal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 text-sm font-bold" style={{ background: 'rgba(180,83,9,0.15)', color: '#b45309' }}>{signal.num}</div>
                      <p className="text-sm text-gray-700 leading-relaxed pt-1">{signal.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold" style={{ color: '#b45309' }}>
                  <i className="ri-arrow-right-line mr-1" />Si un seul signal correspond à votre situation, lancez le diagnostic gratuit ci-dessous.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)' }}>
              <div className="font-playfair text-2xl font-bold text-white mb-4">Le coût de l’inaction vs l’investissement dans la conformité</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {roiScenarios.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-xs text-white/40 mb-2">{s.label}</div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-sm text-red-400 line-through">{s.before}</span>
                      <i className="ri-arrow-right-line text-white/20 text-xs" />
                      <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>{s.after}</span>
                    </div>
                    <div className="text-xs font-bold" style={{ color: '#10b981' }}>↓ {s.reduction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== ARCHITECTURE 4 NIVEAUX ========== */}
        <section className="py-20 lg:py-28" id="pricing" style={{ background: '#ffffff' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-stack-line">
                Architecture 4 Niveaux — Land & Expand
              </BigFourSubtitleBar>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
                Du Diagnostic gratuit à{' '}
                <span style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>l’Abonnement continu</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                Une progression naturelle : démarrez par un diagnostic gratuit, montez en puissance selon vos besoins. Chaque niveau est piloté par un Partner dédié, sans couches de juniorisation.
              </p>
            </div>

            {/* Niveaux 1-2-3-4 en grille */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {pricingTiers.map((tier, i) => (
                <div key={i} className="relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" style={{
                  background: tier.highlight ? 'linear-gradient(180deg, #fafaf8 0%, #ffffff 100%)' : '#ffffff',
                  border: tier.highlight ? '2px solid #b45309' : '1px solid rgba(10,22,40,0.1)',
                }}>
                  {tier.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full text-white whitespace-nowrap" style={{ background: '#b45309' }}>Le plus demandé</span>
                  )}
                  <div className="mb-4">
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#b45309' }}>{tier.subtitle}</div>
                    <div className="font-playfair text-xl font-bold mb-1" style={{ color: '#0a1628' }}>{tier.name}</div>
                  </div>
                  <div className="mb-4">
                    <div className="font-playfair text-2xl font-bold" style={{ color: '#b45309' }}>{tier.price}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1"><i className="ri-time-line" />{tier.duration}</div>
                  </div>
                  <div className="mb-4 px-3 py-2 rounded-lg text-xs text-gray-600" style={{ background: 'rgba(10,22,40,0.03)' }}>
                    <i className="ri-user-line mr-1" style={{ color: '#b45309' }} />{tier.target}
                  </div>
                  <div className="space-y-2.5 mb-6">
                    {tier.deliverables.map((d, di) => (
                      <div key={di} className="flex items-start gap-2">
                        <i className="ri-check-line text-xs mt-0.5 flex-shrink-0" style={{ color: '#b45309' }} />
                        <span className="text-xs text-gray-700 leading-relaxed">{d}</span>
                      </div>
                    ))}
                  </div>
                  {tier.ctaAnchor ? (
                    <a href={tier.ctaAnchor}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 no-underline"
                      style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}>
                      <i className="ri-stethoscope-line" />{tier.cta}
                    </a>
                  ) : (
                    <a href={tier.ctaHref} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 no-underline"
                      style={tier.highlight ? { background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' } : { background: 'rgba(10,22,40,0.05)', color: '#0a1628' }}>
                      <i className="ri-whatsapp-line" />{tier.cta}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Parcours client visuel */}
            <div className="max-w-3xl mx-auto p-6 rounded-2xl" style={{ background: '#fafaf8', border: '1px solid rgba(180,83,9,0.15)' }}>
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#b45309' }}>Parcours Client Progressif</span>
                <h3 className="font-bold text-lg mt-1" style={{ color: '#0a1628' }}>Land & Expand — De la découverte à la conformité continue</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { level: 'N1', title: 'Diagnostic', desc: '8 min gratuites\nScore BEPS /100', icon: 'ri-stethoscope-line' },
                  { level: 'N2', title: 'Premium', desc: '6-10 semaines\nDocumentation complète', icon: 'ri-file-text-line' },
                  { level: 'N3', title: 'Enterprise', desc: '12 mois\nAccompagnement annuel', icon: 'ri-building-line' },
                  { level: 'N4', title: 'Abonnement', desc: 'Mensuel\nConformité continue', icon: 'ri-loop-left-line' },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full mb-2" style={{ background: 'rgba(180,83,9,0.1)' }}>
                      <i className={`${step.icon} text-sm`} style={{ color: '#b45309' }} />
                    </div>
                    <div className="text-xs font-bold" style={{ color: '#b45309' }}>{step.level}</div>
                    <div className="text-xs font-semibold mb-1" style={{ color: '#0a1628' }}>{step.title}</div>
                    <div className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">{step.desc}</div>
                    {i < 3 && (
                      <div className="flex justify-center mt-2">
                        <i className="ri-arrow-right-line text-xs" style={{ color: '#b45309' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== MÉTHODOLOGIE 5 PHASES ========== */}
        <section className="py-20 lg:py-28" style={{ background: '#fafaf8' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-flow-chart">
                Méthodologie OCDE BEPS Action 13 — 5 Phases
              </BigFourSubtitleBar>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
                Une approche structurée,{' '}
                <span style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>des résultats mesurables</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                Chaque phase produit des livrables documentés, audités par un second Partner, et présentés au comité de pilotage.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-2 mb-8">
              {methodologyPhases.map((m, i) => (
                <button key={i} onClick={() => setActiveMethodology(i)} className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 text-center ${activeMethodology === i ? 'ring-2' : ''}`}
                  style={{ background: activeMethodology === i ? 'rgba(180,83,9,0.1)' : 'rgba(255,255,255,0.8)' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: activeMethodology === i ? '#b45309' : 'rgba(10,22,40,0.06)' }}>
                    <i className={`${m.icon} text-lg`} style={{ color: activeMethodology === i ? '#ffffff' : '#0a1628' }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: activeMethodology === i ? '#b45309' : '#0a1628' }}>{m.phase}</div>
                  <div className="text-xs" style={{ color: activeMethodology === i ? '#0a1628' : '#666' }}>{m.title}</div>
                  <div className="text-xs text-gray-400">{m.duration}</div>
                </button>
              ))}
            </div>

            <div className="p-8 rounded-2xl transition-all duration-300" style={{ background: '#ffffff', border: '1px solid rgba(180,83,9,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: 'rgba(180,83,9,0.1)' }}>
                  <i className={`${methodologyPhases[activeMethodology].icon} text-2xl`} style={{ color: '#b45309' }} />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#b45309' }}>{methodologyPhases[activeMethodology].phase} — {methodologyPhases[activeMethodology].title}</div>
                  <div className="text-xs text-gray-400">{methodologyPhases[activeMethodology].duration}</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {methodologyPhases[activeMethodology].steps.map((step, si) => (
                  <div key={si} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(180,83,9,0.15)' }}>
                      <i className="ri-arrow-right-line text-xs" style={{ color: '#b45309' }} />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== LEAD MAGNET — DIAGNOSTIC INTERACTIF ========== */}
        <section className="relative py-20 lg:py-28" id="diagnostic-interactif" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-stethoscope-line">
                Niveau 1 — Diagnostic Prix de Transfert Gratuit — 8 Minutes
              </BigFourSubtitleBar>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-3">
                Évaluez votre exposition aux risques{' '}
                <span style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>prix de transfert BEPS</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-base">5 questions ciblées. Score BEPS instantané. Recommandations personnalisées. 100% confidentiel.</p>
            </div>

            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {diagnosticScore === null && diagnosticStep < diagnosticQuestions.length ? (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    {diagnosticQuestions.map((_, i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ background: i <= diagnosticStep ? '#d97706' : 'rgba(255,255,255,0.15)' }} />
                    ))}
                  </div>
                  <div className="mb-6">
                    <span className="text-xs text-white/40">Question {diagnosticStep + 1}/{diagnosticQuestions.length}</span>
                    <h3 className="font-bold text-white text-lg mt-1">{diagnosticQuestions[diagnosticStep].question}</h3>
                  </div>
                  <div className="space-y-3">
                    {diagnosticQuestions[diagnosticStep].options.map((opt) => (
                      <button key={opt.value} onClick={() => handleDiagnosticAnswer(diagnosticQuestions[diagnosticStep].id, opt.value)}
                        className="w-full text-left p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 text-sm"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : diagnosticScore !== null ? (
                <div className="text-center py-6">
                  {(() => {
                    const interp = getScoreInterpretation(diagnosticScore);
                    return (
                      <>
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: interp.bg }}>
                          <div className="text-center">
                            <div className="font-playfair text-3xl font-bold" style={{ color: interp.color }}>{diagnosticScore}</div>
                            <div className="text-xs text-white/40">/ {maxScore}</div>
                          </div>
                        </div>
                        <div className="font-playfair text-2xl font-bold text-white mb-2">{interp.level}</div>
                        <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm leading-relaxed">{interp.desc}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a href="#diagnostic-form" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 no-underline" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}>
                            <i className="ri-calendar-check-line" />Réserver une Restitution Partner (30 min)
                          </a>
                          <button onClick={resetDiagnostic} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}>
                            <i className="ri-refresh-line" />Refaire le diagnostic
                          </button>
                        </div>
                        <p className="mt-4 text-xs text-white/30">Passez au Niveau 2 — Documentation BEPS Premium pour une conformité complète avec Partner dédié</p>
                      </>
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ========== FORMULAIRE DIAGNOSTIC ========== */}
        <section className="py-20 lg:py-28" id="diagnostic-form" style={{ background: '#ffffff' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#0a1628' }}>
                Réservez votre{' '}
                <span style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Restitution Confidentielle</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-base">Un Partner KHEPRA EXPERTS vous contacte sous bref délai pour un échange stratégique de 30 minutes. Sans engagement.</p>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 p-8 rounded-2xl" style={{ background: '#fafaf8', border: '1px solid rgba(180,83,9,0.15)' }}>
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.15)' }}>
                      <i className="ri-check-double-line text-3xl" style={{ color: '#10b981' }} />
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: '#0a1628' }}>Demande envoyée</h3>
                    <p className="text-gray-600 text-sm">Un Partner vous contactera dans les 24h pour confirmer votre restitution. Sans engagement.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} data-readdy-form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Nom complet *</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleFormChange} required placeholder="Jean Dupont" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Entreprise *</label>
                        <input type="text" name="entreprise" value={formData.entreprise} onChange={handleFormChange} required placeholder="Nom de votre société" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} required placeholder="votre@email.com" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Téléphone / WhatsApp *</label>
                        <input type="tel" name="telephone" value={formData.telephone} onChange={handleFormChange} required placeholder="+228 XX XX XX XX" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Fonction</label>
                      <select name="fonction" value={formData.fonction} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all cursor-pointer" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }}>
                        <option value="">Sélectionnez</option>
                        <option value="dg">Directeur Général / CEO</option>
                        <option value="dga">Directeur Général Adjoint</option>
                        <option value="daf">Directeur Administratif & Financier / CFO</option>
                        <option value="tax">Directeur Fiscal / Tax Director</option>
                        <option value="risk">Chief Risk Officer</option>
                        <option value="compliance">Chief Compliance Officer</option>
                        <option value="admin">Administrateur</option>
                        <option value="investor">Investisseur / Fund Manager</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Vos principaux enjeux (optionnel)</label>
                      <textarea name="enjeux" value={formData.enjeux} onChange={handleFormChange} rows={3} maxLength={500} placeholder="Décrivez brièvement vos principaux défis en matière de prix de transfert..." className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all resize-none" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.12)' }} />
                      <div className="text-right text-xs text-gray-400 mt-1">{formData.enjeux.length}/500</div>
                    </div>
                    {formStatus === 'error' && <p className="text-red-500 text-xs">Une erreur est survenue. Veuillez réessayer.</p>}
                    <button type="submit" disabled={formStatus === 'submitting'} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}>
                      {formStatus === 'submitting' ? <><i className="ri-loader-4-line animate-spin" /> Envoi en cours...</> : <><i className="ri-calendar-check-line text-lg" />Réserver ma Restitution Confidentielle</>}
                    </button>
                    <p className="text-center text-gray-400 text-xs">Sans engagement — Confidentialité garantie</p>
                  </form>
                )}
              </div>
              <div className="md:col-span-2 flex flex-col justify-center space-y-6">
                {[
                  { icon: 'ri-vip-crown-line', title: 'Restitution par un Partner Senior', desc: 'Pas de juniorisation. Votre diagnostic est restitué par un Partner expérimenté en fiscalité internationale et prix de transfert.' },
                  { icon: 'ri-time-line', title: 'Résultats sous 24h', desc: 'Un compte-rendu exécutif avec vos 3 risques prioritaires et des recommandations actionnables.' },
                  { icon: 'ri-lock-line', title: 'Confidentialité absolue', desc: 'NDA signé avant tout échange. Vos données fiscales ne quittent jamais notre environnement sécurisé.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(180,83,9,0.1)' }}>
                      <i className={`${item.icon} text-lg`} style={{ color: '#b45309' }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5" style={{ color: '#0a1628' }}>{item.title}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <BrochureDownloadButton variant="outline" label="Télécharger la brochure Transfer Pricing" />
              </div>
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-20 lg:py-28" style={{ background: '#fafaf8' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#0a1628' }}>Questions fréquentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.08)' }}>
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-all hover:bg-gray-50/50">
                    <span className="font-semibold text-sm pr-4" style={{ color: '#0a1628' }}>{faq.q}</span>
                    <i className={`${expandedFaq === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-lg flex-shrink-0`} style={{ color: '#b45309' }} />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA FINAL ========== */}
        <section className="py-20 lg:py-28 text-center relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #060e1c 0%, #0a1628 40%, #0d1f3c 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
              Ne laissez pas un contrôle fiscal révéler ce que vous auriez dû anticiper
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 text-base">
              Un diagnostic gratuit de 8 minutes. Un Partner dédié. Une architecture 4 niveaux pour monter en puissance à votre rythme. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#diagnostic-form" className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 no-underline" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff', boxShadow: '0 4px 24px rgba(180,83,9,0.45)' }}>
                <i className="ri-calendar-check-line text-xl" />Réserver ma Restitution
              </a>
              <a href="https://wa.me/22893984909?text=Bonjour+KHEPRA+EXPERTS,+je+souhaite+%C3%A9changer+avec+un+Partner+sur+Transfer+Pricing+%26+Tax+Governance+Africa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1 no-underline" style={{ border: '1px solid rgba(180,83,9,0.4)', color: '#d97706', background: 'rgba(180,83,9,0.06)' }}>
                <i className="ri-whatsapp-line" />Contacter un Partner
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/gouvernance-fiscalite-internationale/`}
            title="Transfer Pricing & Tax Governance Africa™ — KHEPRA EXPERTS"
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'transfer-pricing-tax-governance',
          title: 'Diagnostic Prix de Transfert Gratuit — Score BEPS en 8 minutes',
          subtitle: 'Évaluez votre conformité OCDE BEPS en 8 minutes. Identifiez vos 3 risques prioritaires avant l’administration fiscale. Score /100, plan d’action personnalisé.',
          toolSlug: '/tools/diagnostic-prix-transfert',
          icon: 'ri-scales-3-line',
          accentColor: '#b45309',
          timeMinutes: '8 min',
          usersCount: '500+',
          successRate: '95%',
        }}
      />
    </div>
  );
}