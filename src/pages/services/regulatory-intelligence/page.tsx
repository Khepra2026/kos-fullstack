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
const FORM_URL = 'https://readdy.ai/api/form/d8hdsqdiodfui947tv50';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/regulatory-intelligence#service`,
      name: 'Regulatory Intelligence KHEPRA™',
      description: "Veille réglementaire automatisée et analyse d'impact pour institutions financières, FinTech et groupes industriels en Afrique francophone. Surveillance BCEAO, COBAC, OHADA, UEMOA, CEMAC. Alertes personnalisées, notes d'impact trimestrielles, cartographie réglementaire dynamique.",
      url: `${SITE_URL}/services/regulatory-intelligence`,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'Regulatory Intelligence & Monitoring',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce que le Regulatory Intelligence KHEPRA™ ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "C'est un service de veille réglementaire automatisée couplé à une analyse d'impact experte, conçu pour les institutions financières, FinTech, et groupes industriels opérant en zones UEMOA et CEMAC. Il combine surveillance algorithmique des sources réglementaires (BCEAO, COBAC, OHADA, AMF-UMOA, CIMA) et analyse humaine trimestrielle par nos experts sectoriels pour transformer la donnée réglementaire en avantage concurrentiel.",
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi la veille réglementaire manuelle ne suffit-elle plus ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le volume et la vélocité des changements réglementaires en zone UEMOA/CEMAC ont explosé ces 5 dernières années. Circulaires BCEAO, instructions COBAC, réformes OHADA, nouvelles normes IFRS, directives CIMA — un compliance officer ne peut plus suivre manuellement. Le risque n'est plus la non-conformité intentionnelle, mais la non-conformité par ignorance. Regulatory Intelligence automatise la capture, filtre par pertinence, et fournit une analyse d'impact actionnable.",
          },
        },
        {
          '@type': 'Question',
          name: 'Comment fonctionne la plateforme Regulatory Intelligence KHEPRA™ ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "1) Surveillance algorithmique 24/7 de toutes les sources réglementaires UEMOA/CEMAC. 2) Filtrage intelligent par secteur (banque, microfinance, FinTech, assurance, industrie). 3) Alertes personnalisées en temps réel sur les changements impactant votre organisation. 4) Note d'impact trimestrielle rédigée par un expert KHEPRA sectoriel, avec recommandations d'actions. 5) Cartographie réglementaire dynamique actualisée en continu.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quels régulateurs sont couverts par votre veille ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Notre couverture inclut : BCEAO (Banque Centrale des États de l'Afrique de l'Ouest), COBAC (Commission Bancaire de l'Afrique Centrale), AMF-UMOA (Autorité des Marchés Financiers), OHADA (Organisation pour l'Harmonisation du Droit des Affaires en Afrique), CIMA (Conférence Interafricaine des Marchés d'Assurance), UEMOA, CEMAC, ainsi que les banques centrales nationales et autorités de régulation sectorielle.",
          },
        },
        {
          '@type': 'Question',
          name: "Quelle est la différence entre Regulatory Intelligence et de la simple veille juridique ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La veille juridique vous dit « ce texte a été publié ». Regulatory Intelligence vous dit « ce texte a été publié, voici ce qu'il change pour votre organisation spécifique, voici les articles qui vous impactent, voici les actions à prendre dans les 30, 60, 90 jours, et voici comment vos pairs réagissent ». C'est de l'intelligence actionnable, pas de la documentation passive.",
          },
        },
      ],
    },
  ],
};

export default function RegulatoryIntelligencePage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const OUTCOMES = isEn
    ? [
        { value: '7', label: 'Regulators monitored', sub: 'BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, UEMOA, CEMAC — 24/7', icon: 'ri-radar-line', accent: '#475569' },
        { value: '4', label: 'Quarterly reports/yr', sub: 'Expert-authored impact analysis per sector', icon: 'ri-file-chart-line', accent: '#0284c7' },
        { value: '48h', label: 'Critical alerts', sub: 'Real-time notification on high-impact regulatory changes', icon: 'ri-alert-line', accent: '#475569' },
        { value: '24/7', label: 'Algorithmic monitoring', sub: 'Continuous surveillance of all regulatory sources', icon: 'ri-cpu-line', accent: '#0284c7' },
      ]
    : [
        { value: '7', label: 'Régulateurs surveillés', sub: 'BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, UEMOA, CEMAC — 24/7', icon: 'ri-radar-line', accent: '#475569' },
        { value: '4', label: 'Notes trimestrielles/an', sub: "Analyses d'impact rédigées par expert sectoriel", icon: 'ri-file-chart-line', accent: '#0284c7' },
        { value: '48h', label: 'Alertes critiques', sub: 'Notification en temps réel des changements à fort impact', icon: 'ri-alert-line', accent: '#475569' },
        { value: '24/7', label: 'Surveillance algorithmique', sub: 'Scan continu de toutes les sources réglementaires', icon: 'ri-cpu-line', accent: '#0284c7' },
      ];

  const PROBLEMS = isEn
    ? [
        'You discovered a new regulatory requirement 6 months too late — and your compliance file is now flagged by the regulator',
        'Your compliance team spends 40% of its time tracking regulatory texts instead of implementing concrete compliance actions',
        'A circular issued by BCEAO or COBAC impacts your business model — but you lack the analytical framework to translate regulatory text into operational action plan',
        'Your regulatory documentation is outdated, fragmented across emails and shared drives, and impossible to audit efficiently',
      ]
    : [
        "Vous découvrez une nouvelle exigence réglementaire 6 mois trop tard — et votre dossier de conformité est maintenant signalé par le régulateur",
        "Votre équipe conformité passe 40% de son temps à traquer les textes réglementaires au lieu de mettre en œuvre des actions concrètes de mise en conformité",
        "Une circulaire BCEAO ou COBAC impacte votre business model — mais vous n'avez pas le cadre d'analyse pour traduire le texte réglementaire en plan d'action opérationnel",
        "Votre documentation réglementaire est obsolète, fragmentée entre emails et drives partagés, et impossible à auditer efficacement",
      ];

  const ANSWERS = isEn
    ? [
        'Algorithmic monitoring 24/7 across all UEMOA/CEMAC regulatory sources — BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, national central banks',
        'Intelligent filtering by sector, by impact level, and by regulatory domain — you receive only what matters to your organization',
        'Real-time critical alerts with expert pre-analysis — key articles extracted, impact assessed, recommended actions within 48 hours',
        'Quarterly Regulatory Impact Note authored by a KHEPRA sector expert — synthesized analysis, compliance gap assessment, prioritized action recommendations',
        'Dynamic regulatory mapping continuously updated — your regulatory landscape visualized, risk areas highlighted, compliance status tracked',
      ]
    : [
        "Surveillance algorithmique 24/7 de toutes les sources réglementaires UEMOA/CEMAC — BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, banques centrales nationales",
        "Filtrage intelligent par secteur, par niveau d'impact et par domaine réglementaire — vous ne recevez que ce qui concerne votre organisation",
        "Alertes critiques en temps réel avec pré-analyse experte — articles clés extraits, impact évalué, actions recommandées sous 48 heures",
        "Note d'Impact Réglementaire Trimestrielle rédigée par un expert sectoriel KHEPRA — analyse synthétique, évaluation des écarts de conformité, recommandations d'actions priorisées",
        "Cartographie réglementaire dynamique actualisée en continu — votre paysage réglementaire visualisé, zones de risque identifiées, statut de conformité suivi",
      ];

  const PILLARS = isEn
    ? [
        { icon: 'ri-radar-line', title: '24/7 Monitoring', desc: 'Continuous algorithmic scan of all UEMOA/CEMAC regulatory sources. BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, national central banks.', details: ['BCEAO circulars and instructions tracking', 'COBAC regulations and decisions capture', 'AMF-UMOA market rules monitoring', 'OHADA uniform acts and revisions', 'CIMA insurance directives surveillance', 'National central bank & ministry sources'] },
        { icon: 'ri-filter-3-line', title: 'Intelligent Filtering', desc: 'Sector-specific filtering by relevance and impact. Custom taxonomy mapping to your organization\'s regulatory perimeter.', details: ['Custom regulatory taxonomy per client', 'Sector-based relevance scoring', 'Impact level classification (Critical/High/Medium)', 'Regulatory domain mapping', 'Automated noise elimination'] },
        { icon: 'ri-alert-line', title: 'Critical Alerts', desc: 'Real-time notification on high-impact regulatory changes. Expert pre-analysis with key article extraction and action recommendations.', details: ['Real-time push notifications (email/SMS)', 'Key regulatory article extraction', 'Impact assessment within 48 hours', 'Prioritized action recommendations', 'Compliance deadline tracking'] },
        { icon: 'ri-file-chart-line', title: 'Quarterly Impact Notes', desc: 'Expert-authored synthesis. Compliance gap analysis. Peer benchmarking. Strategic recommendations for the Board.', details: ['Sector-specific regulatory synthesis', 'Compliance gap identification and scoring', 'Peer/industry benchmarking analysis', 'Board-ready executive summary', 'Prioritized 90-day action plan'] },
      ]
    : [
        { icon: 'ri-radar-line', title: 'Veille 24/7', desc: 'Scan algorithmique continu de toutes les sources réglementaires UEMOA/CEMAC. BCEAO, COBAC, AMF-UMOA, OHADA, CIMA, banques centrales nationales.', details: ['Suivi des circulaires et instructions BCEAO', 'Capture des règlements et décisions COBAC', 'Veille des règles de marché AMF-UMOA', 'Actes uniformes et révisions OHADA', 'Surveillance des directives CIMA', 'Sources banques centrales nationales et ministères'] },
        { icon: 'ri-filter-3-line', title: 'Filtrage Intelligent', desc: "Filtrage sectoriel par pertinence et impact. Cartographie taxonomique personnalisée sur le périmètre réglementaire de votre organisation.", details: ['Taxonomie réglementaire personnalisée par client', 'Scoring de pertinence sectorielle', "Classification du niveau d'impact (Critique/Élevé/Moyen)", 'Cartographie par domaine réglementaire', 'Élimination automatique du bruit'] },
        { icon: 'ri-alert-line', title: 'Alertes Critiques', desc: "Notification en temps réel des changements réglementaires à fort impact. Pré-analyse experte avec extraction des articles clés et recommandations d'actions.", details: ['Notifications push en temps réel (email/SMS)', 'Extraction des articles réglementaires clés', "Évaluation d'impact sous 48 heures", "Recommandations d'actions priorisées", 'Suivi des échéances de conformité'] },
        { icon: 'ri-file-chart-line', title: "Notes d'Impact Trimestrielles", desc: "Synthèse rédigée par expert sectoriel. Analyse des écarts de conformité. Benchmark sectoriel. Recommandations stratégiques pour le Conseil.", details: ['Synthèse réglementaire sectorielle', 'Identification et scoring des écarts de conformité', 'Analyse de benchmark sectoriel', 'Synthèse exécutive prête pour le Conseil', "Plan d'action 90 jours priorisé"] },
      ];

  const DELIVERABLES = isEn
    ? ['24/7 algorithmic regulatory monitoring across 7 UEMOA/CEMAC regulatory sources', 'Real-time critical alerts with expert pre-analysis (within 48 hours)', '4 quarterly Regulatory Impact Notes authored by KHEPRA sector experts', 'Dynamic regulatory mapping — continuously updated, always audit-ready', 'Custom regulatory taxonomy aligned to your organization\'s specific perimeter', 'Unlimited access to KHEPRA regulatory experts for clarification and deep-dives', 'Annual regulatory risk assessment and compliance roadmap for the Board']
    : ['Veille algorithmique 24/7 sur 7 sources réglementaires UEMOA/CEMAC', 'Alertes critiques en temps réel avec pré-analyse experte (sous 48 heures)', "4 Notes d'Impact Réglementaire trimestrielles rédigées par experts sectoriels KHEPRA", 'Cartographie réglementaire dynamique — actualisée en continu, toujours prête pour audit', 'Taxonomie réglementaire personnalisée alignée sur le périmètre spécifique de votre organisation', 'Accès illimité aux experts réglementaires KHEPRA pour clarification et deep-dives', 'Évaluation annuelle des risques réglementaires et feuille de route conformité pour le Conseil'];

  const PROFILE = isEn
    ? [
        { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', desc: 'Managing an ever-growing volume of BCEAO/COBAC circulars, instructions, and prudential requirements across multiple jurisdictions' },
        { icon: 'ri-smartphone-line', label: 'FinTech & E-Money Institutions', desc: 'Navigating emerging regulatory frameworks for digital finance, mobile money, and payment services in UEMOA/CEMAC' },
        { icon: 'ri-building-4-line', label: 'Insurance Companies', desc: 'Tracking CIMA directives, solvency requirements, and cross-border insurance regulatory evolution in Francophone Africa' },
        { icon: 'ri-government-line', label: 'Industrial & Multinational Groups', desc: 'Monitoring OHADA reforms, sector-specific regulations, and cross-border compliance across multiple African jurisdictions' },
      ]
    : [
        { icon: 'ri-bank-line', label: 'Banques & Institutions Financières', desc: "Gérant un volume croissant de circulaires, instructions et exigences prudentielles BCEAO/COBAC dans plusieurs juridictions" },
        { icon: 'ri-smartphone-line', label: 'FinTech & Établissements de Monnaie Électronique', desc: "Naviguant dans les cadres réglementaires émergents pour la finance digitale, le mobile money et les services de paiement en zone UEMOA/CEMAC" },
        { icon: 'ri-building-4-line', label: "Compagnies d'Assurance", desc: "Suivant les directives CIMA, les exigences de solvabilité et l'évolution réglementaire transfrontalière de l'assurance en Afrique francophone" },
        { icon: 'ri-government-line', label: 'Groupes Industriels & Multinationaux', desc: "Assurant la veille des réformes OHADA, des réglementations sectorielles et de la conformité transfrontalière dans plusieurs juridictions africaines" },
      ];

  const RELATED = isEn
    ? [
        { title: 'BCEAO/COBAC Pre-Inspection Audit', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Be inspection-ready before the regulator arrives — KHEPRA audit' },
        { title: 'Fintech Licensing UEMOA/CEMAC', slug: 'agrement-fintech-etablissement-paiement', icon: 'ri-smartphone-line', kpi: 'E-money license — BCEAO/COBAC agrément preparation' },
        { title: 'Governance & International Taxation', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Board-level compliance & transfer pricing' },
      ]
    : [
        { title: 'Audit Pré-Inspection BCEAO/COBAC', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Soyez prêt avant que le régulateur n\'arrive — Audit KHEPRA' },
        { title: 'Agrément Fintech UEMOA/CEMAC', slug: 'agrement-fintech-etablissement-paiement', icon: 'ri-smartphone-line', kpi: 'Licence monnaie électronique — Préparation agrément BCEAO/COBAC' },
        { title: 'Gouvernance & Fiscalité Internationale', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Conformité & prix de transfert niveau Conseil' },
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
      body.append('service', 'regulatory-intelligence');
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
          ? 'Regulatory Intelligence KHEPRA™ | Automated Monitoring UEMOA/CEMAC | KHEPRA'
          : 'Regulatory Intelligence KHEPRA™ | Veille Réglementaire UEMOA/CEMAC | KHEPRA'}
        description={isEn
          ? '24/7 algorithmic regulatory monitoring for financial institutions, FinTech and industrial groups in Francophone Africa. BCEAO, COBAC, OHADA, UEMOA, CEMAC. Real-time alerts, quarterly impact notes, dynamic regulatory mapping. Lomé, Togo.'
          : 'Veille réglementaire algorithmique 24/7 pour institutions financières, FinTech et groupes industriels en Afrique francophone. BCEAO, COBAC, OHADA, UEMOA, CEMAC. Alertes temps réel, notes d\'impact trimestrielles, cartographie réglementaire dynamique. Lomé, Togo.'}
        keywords={isEn
          ? 'regulatory intelligence Africa, regulatory monitoring UEMOA CEMAC, BCEAO circular tracking, COBAC compliance monitoring, regulatory change management, compliance intelligence, RegTech Africa, financial regulation Africa, OHADA monitoring'
          : 'veille réglementaire Afrique, regulatory intelligence UEMOA CEMAC, suivi circulaires BCEAO, monitoring conformité COBAC, gestion changement réglementaire, intelligence conformité, RegTech Afrique, régulation financière Afrique, veille OHADA'}
        ogImage="https://readdy.ai/api/search-image?query=Modern%20regulatory%20intelligence%20command%20center%20with%20large%20digital%20screens%20displaying%20real-time%20regulatory%20dashboards%20and%20data%20visualizations%2C%20African%20financial%20analysts%20monitoring%20compliance%20metrics%2C%20sleek%20dark%20technology%20environment%20with%20blue%20and%20steel-toned%20interface%20elements%2C%20sophisticated%20surveillance%20and%20analysis%20atmosphere%2C%20West%20African%20financial%20hub%20skyline%20visible%20through%20glass%20walls%2C%20cutting-edge%20RegTech%20platform%2C%20Lom%C3%A9%20Togo%2C%20institutional-grade%20technology%20with%20human%20expertise%2C%20professional%20atmosphere%20of%20vigilance%20and%20precision&width=1440&height=900&seq=regulatory-intel-hero&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/regulatory-intelligence"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SCHEMA}
        hreflangLinks={buildHreflang('/services/regulatory-intelligence')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Regulatory Intelligence' : 'Regulatory Intelligence', path: '/services/regulatory-intelligence' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20regulatory%20intelligence%20command%20center%20with%20large%20digital%20screens%20displaying%20real-time%20regulatory%20dashboards%20and%20data%20visualizations%2C%20African%20financial%20analysts%20monitoring%20compliance%20metrics%2C%20sleek%20dark%20technology%20environment%20with%20blue%20and%20steel-toned%20interface%20elements%2C%20sophisticated%20surveillance%20and%20analysis%20atmosphere%2C%20West%20African%20financial%20hub%20skyline%20visible%20through%20glass%20walls%2C%20cutting-edge%20RegTech%20platform%2C%20Lom%C3%A9%20Togo%2C%20institutional-grade%20technology%20with%20human%20expertise%2C%20professional%20atmosphere%20of%20vigilance%20and%20precision&width=1440&height=900&seq=regulatory-intel-hero&orientation=landscape"
              alt={isEn ? 'Regulatory Intelligence KHEPRA EXPERTS' : 'Regulatory Intelligence KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(71,85,105,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-radar-line">
                  {isEn ? 'Regulatory Intelligence — Automated Monitoring & Impact Analysis' : 'Regulatory Intelligence — Veille Automatisée & Analyse d\'Impact'}
                </BigFourSubtitleBar>

                <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Regulation never sleeps.' : 'La réglementation ne dort jamais.'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #94a3b8, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'Neither does your Regulatory Intelligence.' : 'Votre Regulatory Intelligence non plus.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? "Algorithmic monitoring of 7 UEMOA/CEMAC regulators — 24/7. Intelligent filtering. Real-time critical alerts. Quarterly expert analysis. Because in today's regulatory environment, what you don't know WILL be used against you."
                    : "Surveillance algorithmique de 7 régulateurs UEMOA/CEMAC — 24/7. Filtrage intelligent. Alertes critiques en temps réel. Analyse experte trimestrielle. Parce que dans l'environnement réglementaire actuel, ce que vous ignorez SERA utilisé contre vous."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(71,85,105,0.08)', border: '1px solid rgba(71,85,105,0.2)' }}>
                  <i className="ri-radar-line text-lg" style={{ color: '#475569' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? 'BCEAO · COBAC · AMF-UMOA · OHADA · CIMA · UEMOA · CEMAC — 24/7 algorithmic monitoring + expert analysis'
                      : 'BCEAO · COBAC · AMF-UMOA · OHADA · CIMA · UEMOA · CEMAC — Veille algorithmique 24/7 + analyse experte'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #475569, #64748b)', color: '#ffffff', boxShadow: '0 4px 24px rgba(71,85,105,0.45)' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Assess Your Regulatory Compliance Score — 6 min' : 'Évaluez votre Score de Conformité Réglementaire — 6 min'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-regulatory-intel');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-radar-line" />
                    {isEn ? 'Request a Regulatory Intelligence Demo' : 'Demander une démo Regulatory Intelligence'}
                  </button>
                </div>
                <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <i className="ri-information-line mr-1" />
                  {isEn ? 'Free · Confidential · 20 questions · 6 minutes · No commitment' : 'Gratuit · Confidentiel · 20 questions · 6 minutes · Sans engagement'}
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

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(71,85,105,0.07)', border: '1px solid rgba(71,85,105,0.18)' }}>
                  <i className="ri-shield-check-line text-lg" style={{ color: '#475569' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Zero false positives — All alerts verified by senior experts' : 'Zéro faux positif — Toutes les alertes vérifiées par des experts senior'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Algorithmic capture + human validation — the best of both' : 'Capture algorithmique + validation humaine — le meilleur des deux mondes'}</p>
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
                <BigFourSubtitleBar variant="left-accent" accentColor="primary">
                  {isEn ? 'The cost of regulatory ignorance' : 'Le coût de l\'ignorance réglementaire'}
                </BigFourSubtitleBar>
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'What you don\'t know' : 'Ce que vous ignorez'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #475569, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'is your biggest compliance risk.' : 'est votre plus grand risque de conformité.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? "Between 2020 and 2025, BCEAO and COBAC issued over 200 new circulars, instructions, and regulatory decisions. Most financial institutions discovered more than 40% of them after their effective date. The regulator no longer distinguishes between intentional non-compliance and ignorance — the sanctions are identical. Regulatory Intelligence transforms a reactive scramble into a proactive advantage."
                    : "Entre 2020 et 2025, la BCEAO et la COBAC ont émis plus de 200 nouvelles circulaires, instructions et décisions réglementaires. La plupart des institutions financières en ont découvert plus de 40% après leur date d'entrée en vigueur. Le régulateur ne distingue plus la non-conformité intentionnelle de l'ignorance — les sanctions sont identiques. Regulatory Intelligence transforme une course réactive en avantage proactif."}
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
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(71,85,105,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#475569' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#475569' }}>
                      {isEn ? 'How KHEPRA Regulatory Intelligence Works' : 'Comment Fonctionne Regulatory Intelligence KHEPRA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn ? 'From regulatory noise to actionable intelligence.' : 'Du bruit réglementaire à l\'intelligence actionnable.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(71,85,105,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#475569' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #475569, #64748b)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Regulatory Compliance Assessment' : 'Évaluation de Conformité Réglementaire Gratuite'}
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
              <BigFourSubtitleBar variant="left-accent" accentColor="primary">
                {isEn ? 'The four layers of regulatory intelligence' : 'Les quatre couches de l\'intelligence réglementaire'}
              </BigFourSubtitleBar>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? 'Monitor. Filter. Alert. Analyze.' : 'Surveiller. Filtrer. Alerter. Analyser.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Each layer combines algorithmic efficiency with human expertise — because in regulatory intelligence, context is everything.'
                  : "Chaque couche combine efficacité algorithmique et expertise humaine — parce qu'en intelligence réglementaire, le contexte est tout."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-slate-300 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(71,85,105,0.10)', border: '1px solid rgba(71,85,105,0.20)' }}>
                    <i className={`${pillar.icon} text-lg`} style={{ color: '#475569' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2" title={pillar.title}>{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{pillar.desc}</p>
                  <div className="space-y-1.5 pt-3 border-t border-gray-100">
                    {pillar.details.map((d, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <i className="ri-check-line text-slate-600 text-[10px] mt-0.5 flex-shrink-0" />
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
                <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-gift-line">
                  {isEn ? 'What you get' : 'Ce que vous obtenez'}
                </BigFourSubtitleBar>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Your complete regulatory intelligence suite' : 'Votre suite complète d\'intelligence réglementaire'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(71,85,105,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#475569' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-user-search-line">
                  {isEn ? 'Who is this for?' : 'À qui s\'adresse ce service ?'}
                </BigFourSubtitleBar>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Organizations where regulatory ignorance is not an option' : 'Les organisations où l\'ignorance réglementaire n\'est pas une option'}
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
                    <i className="ri-time-line text-lg" style={{ color: '#475569' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Engagement: contractual mission with quarterly deliverables' : 'Engagement : mission contractuelle avec livrables trimestriels'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Custom proposal after Regulatory Compliance diagnostic' : 'Proposition sur mesure après diagnostic de Conformité Réglementaire'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #475569, #64748b)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Regulatory Compliance Diagnostic' : 'Diagnostic de Conformité Réglementaire Gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — 20 questions — 6 minutes — Immediate compliance score' : 'Gratuit — 20 questions — 6 minutes — Score de conformité immédiat'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Regulatory Intelligence KHEPRA™' : 'Regulatory Intelligence KHEPRA™'} />

        {/* ── LEAD MAGNET ── */}
        <InlineLeadMagnet context="regulatory-intelligence" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="regulatory-intelligence" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-links-line">
              {isEn ? 'Related services' : 'Services connexes'}
            </BigFourSubtitleBar>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(71,85,105,0.10)', border: '1px solid rgba(71,85,105,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#475569' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-slate-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#475569' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-regulatory-intel">
          <section className="py-20 border-t" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-trophy-line">
                    {isEn ? 'Turn regulation into advantage' : 'Transformez la réglementation en avantage'}
                  </BigFourSubtitleBar>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, var(--font-heading), serif' }}>
                    {isEn ? 'Ready to never miss a regulatory change again?' : 'Prêt à ne plus jamais manquer un changement réglementaire ?'}
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {isEn
                      ? 'Start with the free Regulatory Compliance diagnostic. Then discover how Regulatory Intelligence KHEPRA can transform your compliance function from a cost center into a strategic advantage.'
                      : 'Commencez par le diagnostic de Conformité Réglementaire gratuit. Puis découvrez comment Regulatory Intelligence KHEPRA peut transformer votre fonction conformité d\'un centre de coûts en avantage stratégique.'}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[isEn ? 'Response within 24 business hours' : 'Réponse sous 24h ouvrées',
                      isEn ? 'Confidentiality guaranteed (systematic NDA)' : 'Confidentialité garantie (NDA systématique)',
                      isEn ? 'Regulatory experts with 22 years of UEMOA/CEMAC experience' : 'Experts réglementaires avec 22 ans d\'expérience UEMOA/CEMAC',
                      isEn ? 'Available in French and English' : 'Disponible en français et anglais',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(71,85,105,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#475569' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(71,85,105,0.15)' }}>
                        <i className="ri-mail-line text-lg" style={{ color: '#475569' }} />
                      </div>
                      <span className="text-sm">contact@khepraexperts.com</span>
                    </a>
                    <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(71,85,105,0.15)' }}>
                        <i className="ri-whatsapp-line text-lg" style={{ color: '#475569' }} />
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
                    {isEn ? 'Fill in this form and a regulatory intelligence expert will contact you within 24 hours.' : 'Remplissez ce formulaire et un expert regulatory intelligence vous contacte sous 24h.'}
                  </p>

                  <form data-readdy-form id="service-regulatory-intelligence" onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="rgl-nom" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Full Name' : 'Nom complet'} *
                        </label>
                        <input type="text" id="rgl-nom" name="nom" required value={formData.nom} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your name' : 'Votre nom'} />
                      </div>
                      <div>
                        <label htmlFor="rgl-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Email *
                        </label>
                        <input type="email" id="rgl-email" name="email" required value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="rgl-tel" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Phone' : 'Téléphone'}
                        </label>
                        <input type="tel" id="rgl-tel" name="telephone" value={formData.telephone} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="+228 XX XX XX XX" />
                      </div>
                      <div>
                        <label htmlFor="rgl-org" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Organization' : 'Organisation'}
                        </label>
                        <input type="text" id="rgl-org" name="organisation" value={formData.organisation} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your organization' : 'Votre organisation'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rgl-fct" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Position' : 'Fonction'}
                      </label>
                      <input type="text" id="rgl-fct" name="fonction" value={formData.fonction} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'E.g.: Chief Compliance Officer, Legal Director...' : 'Ex: Directeur Conformité, Directeur Juridique...'} />
                    </div>

                    <div>
                      <label htmlFor="rgl-enj" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Your regulatory challenges' : 'Vos enjeux réglementaires'} *
                      </label>
                      <textarea id="rgl-enj" name="enjeux" required rows={3} maxLength={500} value={formData.enjeux} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none text-sm transition-all resize-none bg-white" placeholder={isEn ? 'Describe your regulatory monitoring challenges...' : 'Décrivez vos défis de veille réglementaire...'} />
                      <p className="text-xs mt-1 text-gray-400">{formData.enjeux.length}/500</p>
                    </div>

                    {formStatus === 'success' && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <i className="ri-checkbox-circle-fill text-lg" />
                        <span>{isEn ? 'Message sent! An expert will contact you within 24 hours.' : 'Message envoyé ! Un expert vous contactera sous 24h.'}</span>
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <i className="ri-error-warning-fill text-lg" />
                        <span>{isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button type="submit" disabled={formStatus === 'submitting' || formData.enjeux.length > 500} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #475569, #64748b)', color: '#ffffff' }}>
                        {formStatus === 'submitting' ? (isEn ? 'Sending...' : 'Envoi en cours...') : <><i className="ri-send-plane-line" />{isEn ? 'Request a Demo' : 'Demander une démo'}</>}
                      </button>
                      <button type="button" onClick={() => navigate('/tools/evaluation-conformite-reglementaire')} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        {isEn ? 'Regulatory Compliance Diagnostic' : 'Diagnostic de Conformité Réglementaire'}
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
            url={`${SITE_URL}/services/regulatory-intelligence/`}
            title={isEn ? 'Regulatory Intelligence — KHEPRA EXPERTS' : 'Regulatory Intelligence — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'regulatory-intelligence',
          title: isEn ? 'Regulatory Compliance Assessment' : 'Évaluation de Conformité Réglementaire',
          subtitle: isEn ? 'Assess your regulatory monitoring maturity across 7 UEMOA/CEMAC regulators in 6 minutes. Never miss a critical regulatory change again.' : 'Évaluez la maturité de votre veille réglementaire sur 7 régulateurs UEMOA/CEMAC en 6 minutes. Ne manquez plus jamais un changement réglementaire critique.',
          toolSlug: '/tools/evaluation-conformite-reglementaire',
          icon: 'ri-radar-line',
          accentColor: '#475569',
          timeMinutes: '6 min',
          usersCount: '550+',
          successRate: '93%',
        }}
      />
    </>
  );
}