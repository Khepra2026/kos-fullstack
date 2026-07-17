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
const FORM_URL = 'https://readdy.ai/api/form/d8hdkp4cl43d0bibek0g';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/ceo-advisory-board#service`,
      name: "CEO Advisory Board Africa™",
      description: "Service de Conseil Stratégique pour dirigeants africains : Diagnostic de Maturité Stratégique gratuit, Advisory Board sur mission contractuelle, accès Partner 24/7, Groupe Peer Advisory. Sessions mensuelles avec 2-3 experts seniors. Sur devis confidentiel.",
      url: `${SITE_URL}/services/ceo-advisory-board`,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'CEO Advisory Board',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce qu'un CEO Advisory Board KHEPRA™ ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "C'est un comité stratégique externalisé conçu pour les dirigeants africains. Chaque mois, vous bénéficiez d'une session de travail avec des experts senior qui challengent vos orientations stratégiques, analysent vos risques, suivent vos indicateurs de performance et vous aident à prendre les décisions critiques. C'est un Conseil d'Administration augmenté — sans les formalités, mais avec toute la substance.",
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi un dirigeant a-t-il besoin d\'un CEO Advisory Board ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La solitude du dirigeant est un risque stratégique réel. Au sommet, les informations sont filtrées, les avis sont biaisés et les angles morts s'accumulent. Un CEO Advisory Board apporte un regard externe, critique et bienveillant — celui d'experts qui n'ont pas d'enjeu politique dans votre organisation. C'est l'assurance de ne jamais prendre une décision majeure sans l'avoir confrontée à des regards de haut niveau.",
          },
        },
        {
          '@type': 'Question',
          name: 'Comment se déroule une session mensuelle de CEO Advisory Board ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Chaque session mensuelle dure 3 à 4 heures et suit un ordre du jour structuré : (1) Revue du tableau de bord de performance et analyse des écarts, (2) Examen des risques émergents et de la cartographie actualisée, (3) Discussion approfondie sur 1 à 2 décisions stratégiques critiques, (4) Suivi des actions du mois précédent et validation du plan d'action du mois suivant. Un compte-rendu exécutif est remis sous 48 heures.",
          },
        },
        {
          '@type': 'Question',
          name: 'Qui compose le CEO Advisory Board ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le Board est composé de 2 à 3 experts senior KHEPRA EXPERTS, sélectionnés en fonction de votre secteur d'activité et de vos enjeux stratégiques. Nos experts ont une expérience de direction générale, de Conseil d'Administration, de gestion des risques, de finance et de gouvernance en Afrique francophone. Un Partner KHEPRA est dédié à votre Board et assure la continuité de l'accompagnement.",
          },
        },
        {
          '@type': 'Question',
          name: "Quelle est la différence entre un CEO Advisory Board et un coaching de dirigeant ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le coaching se concentre sur le développement personnel du dirigeant. Le CEO Advisory Board se concentre sur les décisions stratégiques de l'organisation. C'est un comité qui travaille sur votre stratégie, vos risques, votre performance — pas sur votre développement personnel (même si ce dernier en bénéficie indirectement). C'est un Conseil d'Administration opérationnel, pas un espace de développement personnel.",
          },
        },
      ],
    },
  ],
};

export default function CEOAdvisoryBoardPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const OUTCOMES = isEn
    ? [
        { value: '12', label: 'Sessions/year', sub: 'Monthly strategic deep-dives with expert challenge', icon: 'ri-calendar-check-line', accent: '#b45309' },
        { value: '4', label: 'Strategic pillars', sub: 'Performance, Risks, Decisions, Dashboard', icon: 'ri-stack-line', accent: '#0f766e' },
        { value: '48h', label: 'Executive report', sub: 'Structured minutes delivered within 48 hours', icon: 'ri-file-text-line', accent: '#b45309' },
        { value: '2-3', label: 'Senior experts', sub: 'Dedicated Partner + sector specialists', icon: 'ri-user-star-line', accent: '#0f766e' },
      ]
    : [
        { value: '12', label: 'Sessions/an', sub: 'Deep-dives stratégiques mensuels avec challenge expert', icon: 'ri-calendar-check-line', accent: '#b45309' },
        { value: '4', label: 'Piliers stratégiques', sub: 'Performance, Risques, Décisions, Tableau de Bord', icon: 'ri-stack-line', accent: '#0f766e' },
        { value: '48h', label: 'Compte-rendu exécutif', sub: 'Relevé de décisions structuré remis sous 48 heures', icon: 'ri-file-text-line', accent: '#b45309' },
        { value: '2-3', label: 'Experts seniors', sub: 'Partner dédié + spécialistes sectoriels', icon: 'ri-user-star-line', accent: '#0f766e' },
      ];

  const PROBLEMS = isEn
    ? [
        'You make high-stakes decisions alone — without anyone qualified to challenge your assumptions',
        'Your board validates your decisions but never truly challenges them with deep expertise',
        'You have no structured process to monitor strategic execution between quarterly board meetings',
        'You sense blind spots in your strategy but have no trusted external perspective to identify them',
      ]
    : [
        "Vous prenez seul des décisions à fort enjeu — sans personne qualifiée pour challenger vos hypothèses",
        "Votre Conseil valide vos décisions sans jamais les challenger avec une expertise approfondie",
        "Vous n'avez aucun processus structuré pour suivre l'exécution stratégique entre deux Conseils trimestriels",
        "Vous sentez des angles morts dans votre stratégie mais n'avez aucun regard externe de confiance pour les identifier",
      ];

  const ANSWERS = isEn
    ? [
        'A monthly 3-4 hour strategic session with 2-3 senior KHEPRA experts — in person or remote',
        'A structured performance dashboard updated monthly with KPIs aligned to your strategy',
        'Risk mapping review: emerging threats, mitigation status, new exposures',
        'In-depth challenge of 1-2 critical strategic decisions per session, with documented recommendations',
        'An executive report within 48 hours: decisions, action plan, responsibilities, deadlines',
      ]
    : [
        "Une session stratégique mensuelle de 3-4 heures avec 2-3 experts senior KHEPRA — en présentiel ou à distance",
        "Un tableau de bord de performance structuré, actualisé chaque mois avec des KPI alignés sur votre stratégie",
        "Une revue de la cartographie des risques : menaces émergentes, statut des actions de mitigation, nouvelles expositions",
        "Un challenge approfondi de 1-2 décisions stratégiques critiques par session, avec recommandations documentées",
        "Un compte-rendu exécutif sous 48 heures : décisions, plan d'action, responsables, échéances",
      ];

  const PILLARS = isEn
    ? [
        { icon: 'ri-dashboard-line', title: 'Performance Dashboard', desc: 'Monthly KPI review vs targets. Variance analysis, root cause identification. Strategic and operational KPIs aligned with your strategy.', details: ['Balanced Scorecard update', 'KPI vs target variance analysis', 'Root cause deep-dives', 'Corrective action tracking', 'Resource reallocation recommendations'] },
        { icon: 'ri-shield-flash-line', title: 'Risk Analysis', desc: 'Updated risk mapping review. Emerging threats identification. Mitigation plan status. Crisis scenario simulations.', details: ['Risk mapping monthly update', 'Emerging threat scan', 'Mitigation effectiveness review', 'Crisis scenario walkthroughs', 'Early warning indicators dashboard'] },
        { icon: 'ri-lightbulb-flash-line', title: 'Strategic Decisions', desc: 'In-depth challenge of 1-2 critical decisions per session. Scenario analysis, sensitivity testing, external benchmark.', details: ['Decision framing & scoping', 'Multi-scenario analysis', 'External market benchmarks', 'Stakeholder impact assessment', 'Documented recommendation memo'] },
        { icon: 'ri-calendar-todo-line', title: 'Action Tracking', desc: 'Follow-up on previous month decisions. Accountability mapping. Deadline management. Progress scorecard.', details: ['Previous actions status review', 'New actions assignment (RACI)', 'Deadline calendar management', 'Obstacle escalation process', 'Quarterly progress scorecard'] },
      ]
    : [
        { icon: 'ri-dashboard-line', title: 'Tableau de Bord Performance', desc: 'Revue mensuelle des KPI vs cibles. Analyse des écarts, identification des causes racines. KPI stratégiques et opérationnels alignés sur votre stratégie.', details: ['Mise à jour du Balanced Scorecard', 'Analyse des écarts KPI vs cibles', 'Deep-dives sur causes racines', 'Suivi des actions correctives', 'Recommandations de réallocation des ressources'] },
        { icon: 'ri-shield-flash-line', title: 'Analyse des Risques', desc: "Revue de la cartographie des risques actualisée. Identification des menaces émergentes. Statut des plans de mitigation. Simulations de scénarios de crise.", details: ['Mise à jour mensuelle cartographie', 'Scan des menaces émergentes', 'Revue efficacité mitigation', 'Parcours de scénarios de crise', 'Tableau de bord early warning'] },
        { icon: 'ri-lightbulb-flash-line', title: 'Décisions Stratégiques', desc: 'Challenge approfondi de 1-2 décisions critiques par session. Analyse de scénarios, tests de sensibilité, benchmark externe.', details: ['Cadrage et délimitation de la décision', 'Analyse multi-scénarios', 'Benchmarks de marché externes', "Évaluation d'impact parties prenantes", 'Note de recommandation documentée'] },
        { icon: 'ri-calendar-todo-line', title: 'Suivi des Actions', desc: "Revue des décisions du mois précédent. Cartographie des responsabilités. Gestion des échéances. Scorecard de progression.", details: ['Statut des actions du mois précédent', 'Assignation nouvelles actions (RACI)', 'Gestion du calendrier des échéances', "Processus d'escalade des blocages", 'Scorecard trimestrielle de progression'] },
      ];

  const DELIVERABLES = isEn
    ? ['12 monthly strategic sessions (3-4h each, in-person or remote)', 'Monthly executive report within 48 hours post-session', 'Updated performance dashboard with KPI variance analysis', 'Updated risk mapping with emerging threat identification', '2-3 documented strategic decision memos per quarter', 'Quarterly progress scorecard & Board-ready summary', 'Unlimited ad-hoc email/phone access to your dedicated Partner']
    : ['12 sessions stratégiques mensuelles (3-4h, présentiel ou distanciel)', 'Compte-rendu exécutif mensuel remis sous 48 heures', 'Tableau de bord de performance actualisé avec analyse des écarts KPI', 'Cartographie des risques actualisée avec identification des menaces émergentes', '2-3 notes de décision stratégique documentées par trimestre', 'Scorecard trimestrielle de progression & synthèse prête pour le Conseil', 'Accès illimité email/téléphone à votre Partner dédié entre les sessions'];

  const PROFILE = isEn
    ? [
        { icon: 'ri-user-star-line', label: 'CEOs & Managing Directors', desc: 'Leading a company or group with >50 employees, making high-stakes strategic decisions with limited external challenge' },
        { icon: 'ri-building-2-line', label: 'Board Chairs (PCA)', desc: 'Overseeing governance but needing independent strategic insights beyond what management provides' },
        { icon: 'ri-briefcase-line', label: 'Family Business Leaders', desc: 'Managing complex family dynamics while professionalizing governance and preparing succession' },
        { icon: 'ri-global-line', label: 'Regional Directors', desc: 'Running multi-country operations across UEMOA/CEMAC with regulatory and market complexity' },
      ]
    : [
        { icon: 'ri-user-star-line', label: 'DG & Directeurs Généraux', desc: "Dirigeant une entreprise ou un groupe de plus de 50 collaborateurs, prenant des décisions stratégiques à fort enjeu avec un challenge externe limité" },
        { icon: 'ri-building-2-line', label: 'Présidents de Conseil (PCA)', desc: "Supervisant la gouvernance mais ayant besoin d'éclairages stratégiques indépendants au-delà de ce que fournit le management" },
        { icon: 'ri-briefcase-line', label: 'Dirigeants Familiaux', desc: "Gérant des dynamiques familiales complexes tout en professionnalisant la gouvernance et en préparant la transmission" },
        { icon: 'ri-global-line', label: 'Directeurs Régionaux', desc: 'Pilotant des opérations multi-pays en zone UEMOA/CEMAC avec une complexité réglementaire et de marché élevée' },
      ];

  const RELATED = isEn
    ? [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Board-level compliance & transfer pricing' },
        { title: 'BCEAO & COBAC Inspection Readiness™', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Be inspection-ready before the regulator arrives' },
        { title: 'Financial Audit Africa', slug: 'audit-financier-afrique', icon: 'ri-file-search-line', kpi: 'Full transparency for strategic decisions' },
      ]
    : [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Conformité & prix de transfert niveau Conseil' },
        { title: 'BCEAO & COBAC Inspection Readiness™', slug: 'audit-pre-inspection-bceao', icon: 'ri-shield-flash-line', kpi: 'Soyez prêt avant que le régulateur n\'arrive' },
        { title: 'Audit Financier Afrique', slug: 'audit-financier-afrique', icon: 'ri-file-search-line', kpi: 'Transparence totale pour les décisions stratégiques' },
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
      body.append('service', 'ceo-advisory-board');
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
          ? 'CEO Advisory Board Africa™ | Conseil Stratégique | KHEPRA'
          : 'CEO Advisory Board Africa™ | Conseil Dirigeants | KHEPRA'}
        description={isEn
          ? 'CEO Advisory Board for African leaders: Free Strategic Maturity Diagnostic (8 min), Advisory Board on contractual mission, Premium Board (24/7 Partner access), and Peer Advisory Group. Monthly strategic sessions with 2-3 senior experts. Tailored proposal. Lomé, Togo.'
          : 'Service de CEO Advisory Board pour dirigeants africains : Diagnostic de Maturité Stratégique gratuit (8 min), Advisory Board sur mission contractuelle, Board Premium (accès Partner 24/7) et Groupe Peer Advisory. Sessions mensuelles avec 2-3 experts seniors. Devis sur mesure. Lomé, Togo.'}
        keywords={isEn
          ? 'CEO advisory board Africa, executive strategic committee Africa, board advisory mission, strategic maturity diagnostic Africa, CEO peer advisory group, corporate governance Africa, strategic decision support Africa, KHEPRA EXPERTS CEO advisory'
          : 'CEO advisory board Afrique, comité stratégique dirigeant Afrique, mission conseil stratégique sur devis, diagnostic maturité stratégique Afrique, groupe peer advisory dirigeants, gouvernance entreprise Afrique, accompagnement décision stratégique Afrique, KHEPRA EXPERTS CEO advisory'}
        ogImage="https://readdy.ai/api/search-image?query=Distinguished%20African%20executive%20in%20a%20modern%20glass-walled%20boardroom%20overlooking%20a%20West%20African%20skyline%20at%20sunset%2C%20engaged%20in%20deep%20strategic%20discussion%20with%20two%20senior%20advisors%20around%20a%20polished%20wood%20table%2C%20documents%20and%20performance%20dashboards%20displayed%20on%20a%20large%20screen%2C%20warm%20amber%20and%20gold%20lighting%2C%20sophisticated%20corporate%20advisory%20atmosphere%2C%20Lom%C3%A9%20Togo%20financial%20district%2C%20confidence%20and%20trust%20between%20seasoned%20professionals&width=1440&height=900&seq=ceo-advisory-hero&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/ceo-advisory-board"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SCHEMA}
        hreflangLinks={buildHreflang('/services/ceo-advisory-board')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'CEO Advisory Board Africa™' : 'CEO Advisory Board Africa™', path: '/services/ceo-advisory-board' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Distinguished%20African%20executive%20in%20a%20modern%20glass-walled%20boardroom%20overlooking%20a%20West%20African%20skyline%20at%20sunset%2C%20engaged%20in%20deep%20strategic%20discussion%20with%20two%20senior%20advisors%20around%20a%20polished%20wood%20table%2C%20documents%20and%20performance%20dashboards%20displayed%20on%20a%20large%20screen%2C%20warm%20amber%20and%20gold%20lighting%2C%20sophisticated%20corporate%20advisory%20atmosphere%2C%20Lom%C3%A9%20Togo%20financial%20district%2C%20confidence%20and%20trust%20between%20seasoned%20professionals&width=1440&height=900&seq=ceo-advisory-hero&orientation=landscape"
              alt={isEn ? 'CEO Advisory Board KHEPRA EXPERTS' : 'CEO Advisory Board KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(180,83,9,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: '#b45309' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#b45309' }}>
                    {isEn ? 'CEO Advisory Board Africa™' : 'CEO Advisory Board Africa™'}
                  </span>
                </div>

                <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'You\'re alone at the top.' : 'Vous êtes seul au sommet.'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #fcd34d, #b45309)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'What if you had a Strategic Board by your side?' : 'Et si vous aviez un Conseil Stratégique à vos côtés ?'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'A monthly strategic committee of 2-3 senior experts who challenge your decisions, monitor your performance, scan your risks — and tell you what no one else dares to say. Because the most expensive mistake is the one nobody saw coming.'
                    : "Un comité stratégique mensuel de 2-3 experts seniors qui challengent vos décisions, surveillent votre performance, scrutent vos risques — et vous disent ce que personne d'autre n'ose vous dire. Parce que l'erreur la plus coûteuse est celle que personne n'a vue venir."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.2)' }}>
                  <i className="ri-user-star-line text-lg" style={{ color: '#b45309' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '12 sessions/year · 2-3 senior experts · Performance dashboard · Risk analysis · Decision challenge'
                      : '12 sessions/an · 2-3 experts seniors · Tableau de bord · Analyse des risques · Challenge des décisions'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/tools/diagnostic-maturite-pilotage-strategique')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff', boxShadow: '0 4px 24px rgba(180,83,9,0.45)' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Calculate Your Strategic Maturity Score — 8 min' : 'Calculez votre Score de Maturité Stratégique — 8 min'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-ceo');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-user-star-line" />
                    {isEn ? 'Talk to a Senior Partner' : 'Parler à un Partner Senior'}
                  </button>
                </div>
                <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <i className="ri-information-line mr-1" />
                  {isEn ? 'Free · Confidential · 5 maturity levels · 8 minutes · No commitment' : 'Gratuit · Confidentiel · 5 niveaux de maturité · 8 minutes · Sans engagement'}
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

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(180,83,9,0.07)', border: '1px solid rgba(180,83,9,0.18)' }}>
                  <i className="ri-lock-line text-lg" style={{ color: '#b45309' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? '100% Confidential — Protected by Professional Secrecy' : '100% Confidentiel — Protégé par le Secret Professionnel'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Your strategy stays yours — always' : 'Votre stratégie reste la vôtre — toujours'}</p>
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
                <BigFourSubtitleBar label={isEn ? 'The loneliness of command' : 'La solitude du commandement'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'The higher you rise, the less' : 'Plus vous montez, moins'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'you hear the truth.' : 'vous entendez la vérité.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'At the top, information gets filtered. Advisors have agendas. Board members validate without challenging. And the most dangerous words a CEO can hear are "you\'re right, boss." A CEO Advisory Board is your antidote to the echo chamber — a trusted circle that tells you what you need to hear, not what you want to hear.'
                    : "Au sommet, l'information est filtrée. Les conseillers ont des agendas. Les administrateurs valident sans challenger. Et les mots les plus dangereux qu'un DG puisse entendre sont « vous avez raison, patron ». Un CEO Advisory Board est votre antidote à la chambre d'écho — un cercle de confiance qui vous dit ce que vous devez entendre, pas ce que vous voulez entendre."}
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
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(180,83,9,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#b45309' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#b45309' }}>
                      {isEn ? 'How KHEPRA CEO Advisory Board Works' : 'Comment Fonctionne le CEO Advisory Board KHEPRA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn ? 'A Board that works for you. Not the other way around.' : 'Un Conseil qui travaille pour vous. Pas l\'inverse.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(180,83,9,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#b45309' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/tools/diagnostic-maturite-pilotage-strategique')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Strategic Maturity Score' : 'Score de Maturité Stratégique Gratuit'}
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
              <BigFourSubtitleBar label={isEn ? 'Your monthly strategic routine' : 'Votre routine stratégique mensuelle'} variant="left-accent" accentColor="primary" className="mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? '4 pillars. Every month. Without fail.' : '4 piliers. Chaque mois. Sans exception.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Each monthly session follows a structured agenda refined over hundreds of executive sessions. No fluff. No generic advice. Just rigorous strategic work that moves your organization forward.'
                  : "Chaque session mensuelle suit un ordre du jour structuré, affiné sur des centaines de sessions exécutives. Pas de blabla. Pas de conseils génériques. Juste un travail stratégique rigoureux qui fait avancer votre organisation."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.20)' }}>
                    <i className={`${pillar.icon} text-lg`} style={{ color: '#b45309' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2" title={pillar.title}>{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{pillar.desc}</p>
                  <div className="space-y-1.5 pt-3 border-t border-gray-100">
                    {pillar.details.map((d, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <i className="ri-check-line text-amber-600 text-[10px] mt-0.5 flex-shrink-0" />
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
                <BigFourSubtitleBar label={isEn ? 'What you get' : 'Ce que vous obtenez'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Your complete advisory package' : 'Votre package advisory complet'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(180,83,9,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#b45309' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#b45309' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'Who is this for?' : 'À qui s\'adresse ce service ?'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Leaders who refuse to navigate alone' : 'Les dirigeants qui refusent de naviguer seuls'}
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
                    <i className="ri-time-line text-lg" style={{ color: '#b45309' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Engagement: monthly, minimum 12 months' : 'Engagement : mensuel, minimum 12 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Tailored proposal after Strategic Maturity diagnostic' : 'Proposition sur mesure après diagnostic de Maturité Stratégique'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tools/diagnostic-maturite-pilotage-strategique')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff' }}
                  >
                    <i className="ri-lightbulb-flash-line" />
                    {isEn ? 'Free Strategic Maturity Diagnostic' : 'Diagnostic de Maturité Stratégique Gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — 25 questions — 8 minutes — Immediate maturity level' : 'Gratuit — 25 questions — 8 minutes — Niveau de maturité immédiat'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'CEO Advisory Board Africa™' : 'CEO Advisory Board Africa™'} />

        {/* ── LEAD MAGNET ── */}
        <InlineLeadMagnet context="ceo-advisory-board" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="ceo-advisory-board" />

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
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#b45309' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#b45309' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-ceo">
          <section className="py-20 border-t" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <BigFourSubtitleBar label={isEn ? 'Stop navigating alone' : 'Arrêtez de naviguer seul'} variant="left-accent" accentColor="primary" className="mb-5" />
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, var(--font-heading), serif' }}>
                    {isEn ? 'Ready to have a Board that truly challenges you?' : 'Prêt à avoir un Conseil qui vous challenge vraiment ?'}
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {isEn
                      ? 'Start with the free Strategic Maturity diagnostic. Then discuss how a CEO Advisory Board can transform your decision-making — with a senior KHEPRA Partner who understands the weight of command.'
                      : 'Commencez par le diagnostic de Maturité Stratégique gratuit. Puis discutons de la façon dont un CEO Advisory Board peut transformer votre prise de décision — avec un Partner KHEPRA senior qui comprend le poids du commandement.'}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[isEn ? 'Response within 24 business hours' : 'Réponse sous 24h ouvrées',
                      isEn ? 'Absolute confidentiality (systematic NDA)' : 'Confidentialité absolue (NDA systématique)',
                      isEn ? 'Senior experts with 22 years of experience' : 'Experts senior avec 22 ans d\'expérience',
                      isEn ? 'Available in French and English' : 'Disponible en français et anglais',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(180,83,9,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#b45309' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(180,83,9,0.15)' }}>
                        <i className="ri-mail-line text-lg" style={{ color: '#b45309' }} />
                      </div>
                      <span className="text-sm">contact@khepraexperts.com</span>
                    </a>
                    <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(180,83,9,0.15)' }}>
                        <i className="ri-whatsapp-line text-lg" style={{ color: '#b45309' }} />
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
                    {isEn ? 'Fill in this form and a senior expert will contact you within 24 hours.' : 'Remplissez ce formulaire et un expert senior vous contacte sous 24h.'}
                  </p>

                  <form data-readdy-form id="service-ceo-advisory-board" onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cab-nom" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Full Name' : 'Nom complet'} *
                        </label>
                        <input type="text" id="cab-nom" name="nom" required value={formData.nom} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your name' : 'Votre nom'} />
                      </div>
                      <div>
                        <label htmlFor="cab-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Email *
                        </label>
                        <input type="email" id="cab-email" name="email" required value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cab-tel" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Phone' : 'Téléphone'}
                        </label>
                        <input type="tel" id="cab-tel" name="telephone" value={formData.telephone} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder="+228 XX XX XX XX" />
                      </div>
                      <div>
                        <label htmlFor="cab-org" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          {isEn ? 'Organization' : 'Organisation'}
                        </label>
                        <input type="text" id="cab-org" name="organisation" value={formData.organisation} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'Your organization' : 'Votre organisation'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cab-fct" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Position' : 'Fonction'}
                      </label>
                      <input type="text" id="cab-fct" name="fonction" value={formData.fonction} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white" placeholder={isEn ? 'E.g.: CEO, Chairman, Managing Director...' : 'Ex: DG, PCA, Directeur Général...'} />
                    </div>

                    <div>
                      <label htmlFor="cab-enj" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isEn ? 'Your strategic challenges' : 'Vos enjeux stratégiques'} *
                      </label>
                      <textarea id="cab-enj" name="enjeux" required rows={3} maxLength={500} value={formData.enjeux} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all resize-none bg-white" placeholder={isEn ? 'Describe your strategic priorities or challenges...' : 'Décrivez vos priorités ou défis stratégiques...'} />
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
                      <button type="submit" disabled={formStatus === 'submitting' || formData.enjeux.length > 500} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff' }}>
                        {formStatus === 'submitting' ? (isEn ? 'Sending...' : 'Envoi en cours...') : <><i className="ri-send-plane-line" />{isEn ? 'Request a Discovery Call' : 'Demander un appel découverte'}</>}
                      </button>
                      <button type="button" onClick={() => navigate('/tools/diagnostic-maturite-pilotage-strategique')} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        {isEn ? 'Strategic Maturity Diagnostic' : 'Diagnostic de Maturité Stratégique'}
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
            url={`${SITE_URL}/services/ceo-advisory-board/`}
            title={isEn ? 'CEO Advisory Board Africa™ — KHEPRA EXPERTS' : 'CEO Advisory Board Africa™ — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'ceo-advisory-board',
          title: isEn ? 'CEO Advisory Board Africa™ Strategic Maturity Score' : 'Score de Maturité Stratégique CEO Advisory Board Africa™',
          subtitle: isEn ? 'Discover your strategic maturity level across 4 pillars in 8 minutes. Identify blind spots your board isn\'t telling you about.' : 'Découvrez votre niveau de maturité stratégique sur 4 piliers en 8 minutes. Identifiez les angles morts que votre Conseil ne vous révèle pas.',
          toolSlug: '/tools/diagnostic-maturite-pilotage-strategique',
          icon: 'ri-lightbulb-flash-line',
          accentColor: '#b45309',
          timeMinutes: '8 min',
          usersCount: '650+',
          successRate: '92%',
        }}
      />
    </>
  );
}