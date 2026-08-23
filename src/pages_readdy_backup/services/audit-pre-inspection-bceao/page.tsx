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
const FORM_URL = 'https://readdy.ai/api/form/d8hdbo5iodfui947tup0';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/audit-pre-inspection-bceao#service`,
      name: "BCEAO & COBAC Inspection Readiness™",
      description: "Service de préparation aux inspections BCEAO/COBAC : Diagnostic gratuit, Audit à Blanc, Plan de Remédiation, Mission Inspection Readiness — sur devis confidentiel. 25+ motifs de sanction benchmarkés. Pour banques, IMF, fintechs et assurances en zone UEMOA/CEMAC.",
      url: `${SITE_URL}/services/audit-pre-inspection-bceao`,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Place', name: "Afrique de l'Ouest UEMOA" },
        { '@type': 'Place', name: 'Afrique Centrale CEMAC' },
      ],
      serviceType: 'Regulatory Pre-Inspection Audit',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce qu'un Audit de Pré-Inspection BCEAO/COBAC ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "C'est une simulation confidentielle d'une mission d'inspection prudentielle menée par des experts qui connaissent les méthodes et les attentes des superviseurs BCEAO et COBAC. L'audit reproduit le processus d'inspection réel — revue documentaire, entretiens, tests de conformité — pour identifier les red flags avant que le régulateur ne les découvre. Le livrable est un rapport confidentiel avec un plan correctif priorisé.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre un audit interne et un Audit de Pré-Inspection KHEPRA™ ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "L'audit interne évalue vos processus selon vos propres référentiels. L'Audit de Pré-Inspection KHEPRA™ applique la grille de lecture exacte des superviseurs BCEAO/COBAC : mêmes angles d'analyse, mêmes seuils de tolérance, mêmes critères de matérialité. Nous identifions ce que le régulateur va trouver — et ce qu'il va sanctionner — avant qu'il n'entre dans vos locaux.",
          },
        },
        {
          '@type': 'Question',
          name: "Combien de temps dure un Audit de Pré-Inspection ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La durée standard est de 4 à 6 semaines : 1 semaine de préparation et revue documentaire, 2 à 3 semaines d'investigation sur site (ou à distance), 1 à 2 semaines de rédaction du rapport et présentation au Conseil d'Administration. Pour les institutions de grande taille, la durée peut être étendue à 8 semaines.",
          },
        },
        {
          '@type': 'Question',
          name: 'Les résultats sont-ils communicables au régulateur ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Non. Le rapport d'Audit de Pré-Inspection est un document confidentiel protégé par le secret professionnel. Il est destiné exclusivement à la Direction Générale et au Conseil d'Administration. Il ne peut pas être exigé par le régulateur. Son objectif est de vous permettre de corriger les défaillances avant une inspection réelle, et non de les documenter pour le superviseur.",
          },
        },
        {
          '@type': 'Question',
          name: "Quels sont les 5 axes inspectés lors d'un Audit de Pré-Inspection ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Les 5 axes standards sont : (1) Gouvernance & Organisation — composition du CA, comités spécialisés, séparation des pouvoirs ; (2) Contrôle Interne & Audit — dispositif de contrôle permanent, indépendance de l'audit interne ; (3) Conformité & LBC/FT — KYC, déclaration de soupçon, formation ; (4) Gestion des Risques — cartographie, appétit au risque, ALM, stress tests ; (5) Cybersécurité & Continuité d'Activité — politique de sécurité SI, PCA/PRA, sauvegardes.",
          },
        },
      ],
    },
  ],
};

export default function AuditPreInspectionBCEAOPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeAxe, setActiveAxe] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', organisation: '', fonction: '', enjeux: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const OUTCOMES = isEn
    ? [
        { value: '5', label: 'Inspection axes', sub: 'Governance, Internal Control, AML/CFT, Risk, Cybersecurity', icon: 'ri-radar-line', accent: '#b45309' },
        { value: '4-6', label: 'Weeks duration', sub: 'From document review to final report', icon: 'ri-calendar-check-line', accent: '#0f766e' },
        { value: '25+', label: 'Critical findings', sub: 'Benchmarked against real sanctions', icon: 'ri-error-warning-line', accent: '#dc2626' },
      ]
    : [
        { value: '5', label: "Axes d'inspection", sub: 'Gouvernance, Contrôle Interne, LBC/FT, Risques, Cybersécurité', icon: 'ri-radar-line', accent: '#b45309' },
        { value: '4-6', label: 'Semaines de mission', sub: 'De la revue documentaire au rapport final', icon: 'ri-calendar-check-line', accent: '#0f766e' },
        { value: '25+', label: 'Constat critiques', sub: 'Benchmarkés sur des sanctions réelles', icon: 'ri-error-warning-line', accent: '#dc2626' },
      ];

  const PROBLEMS = isEn
    ? [
        'Your internal audit did not detect the gaps that the regulator will find',
        'Your board thinks you\'re compliant — but you\'ve never been tested against real inspection criteria',
        'Your last BCEAO/COBAC inspection report had reservations you never fully addressed',
        'You\'re preparing for an agrément renewal without knowing your real exposure',
      ]
    : [
        "Votre audit interne n'a pas détecté les lacunes que le régulateur va trouver",
        "Votre Conseil pense que vous êtes conforme — mais vous n'avez jamais été testé contre les vrais critères d'inspection",
        "Votre dernier rapport d'inspection BCEAO/COBAC comportait des réserves que vous n'avez jamais totalement levées",
        'Vous préparez un renouvellement d\'agrément sans connaître votre exposition réelle',
      ];

  const ANSWERS = isEn
    ? [
        'A full simulation of a BCEAO/COBAC inspection mission — same methodology, same rigor',
        'A confidential report with red flags classified by criticality and financial impact',
        'A prioritized corrective action plan with timelines and responsibilities',
        'A presentation to your Board of Directors with strategic recommendations',
      ]
    : [
        "Une simulation complète d'une mission d'inspection BCEAO/COBAC — même méthodologie, même rigueur",
        'Un rapport confidentiel avec les red flags classés par criticité et impact financier',
        'Un plan d\'action correctif priorisé avec calendrier et responsabilités',
        "Une présentation à votre Conseil d'Administration avec des recommandations stratégiques",
      ];

  const AXES = isEn
    ? [
        { icon: 'ri-government-line', title: 'Governance & Organization', subtitle: 'Board, committees, powers separation, succession plan', findings: ['Board composition and independence', 'Specialized committee functionality', 'Conflict of interest policy', 'Succession plan documentation', 'Delegation of authority formalization'] },
        { icon: 'ri-shield-check-line', title: 'Internal Control & Audit', subtitle: 'Permanent control, internal audit, compliance', findings: ['Internal control framework documentation', 'Internal audit independence', 'Permanent control coverage', 'Whistleblowing mechanism', 'Audit recommendation follow-up'] },
        { icon: 'ri-file-search-line', title: 'Compliance & AML/CFT', subtitle: 'KYC, STR, training, international sanctions', findings: ['AML/CFT policy and procedures', 'KYC completeness (BO, PEP)', 'Suspicious transaction reporting', 'Staff training program', 'Data retention compliance'] },
        { icon: 'ri-alert-line', title: 'Risk Management', subtitle: 'Risk mapping, ALM, stress testing, prudential ratios', findings: ['Risk mapping exhaustiveness', 'Risk appetite framework', 'ALM committee functionality', 'Prudential ratio compliance', 'Stress testing regularity'] },
        { icon: 'ri-computer-line', title: 'Cybersecurity & BCP', subtitle: 'IT security, BCP/DRP, backups, incident management', findings: ['Cybersecurity policy documentation', 'BCP/DRP existence and testing', 'Backup & restoration procedures', 'Incident management protocol', 'IT governance regulation compliance'] },
      ]
    : [
        { icon: 'ri-government-line', title: 'Gouvernance & Organisation', subtitle: 'CA, comités spécialisés, séparation des pouvoirs, plan de relève', findings: ['Composition et indépendance du CA', 'Fonctionnement des comités spécialisés', 'Politique de conflits d\'intérêts', 'Documentation du plan de relève', 'Formalisation des délégations de pouvoirs'] },
        { icon: 'ri-shield-check-line', title: 'Contrôle Interne & Audit', subtitle: 'Dispositif de contrôle, audit interne, conformité', findings: ['Documentation du dispositif de contrôle interne', 'Indépendance de l\'audit interne', 'Couverture du contrôle permanent', 'Mécanisme de remontée d\'alerte', 'Suivi des recommandations d\'audit'] },
        { icon: 'ri-file-search-line', title: 'Conformité & LBC/FT', subtitle: 'KYC, déclaration de soupçon, formation, sanctions', findings: ['Politique et procédures LBC/FT', 'Exhaustivité KYC (BE, PPE)', 'Procédure de déclaration de soupçon', 'Programme de formation des équipes', 'Conformité conservation des données'] },
        { icon: 'ri-alert-line', title: 'Gestion des Risques', subtitle: 'Cartographie, ALM, stress tests, ratios prudentiels', findings: ['Exhaustivité cartographie des risques', 'Cadre d\'appétit au risque', 'Fonctionnement comité ALM', 'Respect des ratios prudentiels', 'Régularité des stress tests'] },
        { icon: 'ri-computer-line', title: 'Cybersécurité & PCA', subtitle: 'Sécurité SI, PCA/PRA, sauvegardes, incidents', findings: ['Documentation politique cybersécurité', 'Existence et tests PCA/PRA', 'Procédures de sauvegarde et restauration', 'Protocole de gestion des incidents', 'Conformité réglementation gouvernance SI'] },
      ];

  const METHODOLOGY = isEn
    ? [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Documentary Review', duration: 'Week 1', desc: 'Analysis of your existing documentation: policies, procedures, board minutes, audit reports, compliance records. Identification of documentary gaps against BCEAO/COBAC requirements.', deliverable: 'Documentary gap analysis matrix', accent: '#b45309' },
        { num: '02', icon: 'ri-search-eye-line', title: 'On-site Investigation', duration: 'Weeks 2-4', desc: 'Interviews with key personnel (DG, DAF, Risk Director, Compliance Officer, IT Director), sampling tests, process walkthroughs. Application of the supervisor\'s exact analytical framework.', deliverable: 'Preliminary findings log + interview synthesis', accent: '#0f766e' },
        { num: '03', icon: 'ri-file-warning-line', title: 'Red Flags Identification', duration: 'Week 4', desc: 'Cross-referencing findings against the 25+ most frequent BCEAO/COBAC sanction grounds. Classification by criticality: critical, high, moderate, low. Financial impact estimation.', deliverable: 'Red flags matrix with financial exposure', accent: '#dc2626' },
        { num: '04', icon: 'ri-file-text-line', title: 'Confidential Report', duration: 'Weeks 5-6', desc: 'Comprehensive report drafting: executive summary, detailed findings per axis, red flags classification, prioritized corrective action plan with timelines and responsibilities.', deliverable: 'Confidential pre-inspection report + Board presentation', accent: '#b45309' },
      ]
    : [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Revue Documentaire', duration: 'Semaine 1', desc: "Analyse de votre documentation existante : politiques, procédures, PV de CA, rapports d'audit, dossiers de conformité. Identification des lacunes documentaires par rapport aux exigences BCEAO/COBAC.", deliverable: 'Matrice d\'analyse des écarts documentaires', accent: '#b45309' },
        { num: '02', icon: 'ri-search-eye-line', title: 'Investigation sur Site', duration: 'Semaines 2-4', desc: "Entretiens avec les personnes clés (DG, DAF, Risk Manager, Compliance Officer, DSI), tests par échantillonnage, revue de processus. Application de la grille d'analyse exacte des superviseurs.", deliverable: 'Journal des constats préliminaires + synthèse d\'entretiens', accent: '#0f766e' },
        { num: '03', icon: 'ri-file-warning-line', title: 'Identification des Red Flags', duration: 'Semaine 4', desc: "Croisement des constats avec les 25+ motifs de sanction BCEAO/COBAC les plus fréquents. Classification par criticité : critique, élevé, modéré, faible. Estimation de l'impact financier.", deliverable: 'Matrice des red flags avec exposition financière', accent: '#dc2626' },
        { num: '04', icon: 'ri-file-text-line', title: 'Rapport Confidentiel', duration: 'Semaines 5-6', desc: "Rédaction du rapport complet : synthèse exécutive, constats détaillés par axe, classification des red flags, plan d'action correctif priorisé avec calendrier et responsabilités.", deliverable: "Rapport confidentiel de pré-inspection + présentation au Conseil", accent: '#b45309' },
      ];

  const DELIVERABLES = isEn
    ? ['Confidential pre-inspection report (60-100 pages)', 'Red flags matrix with financial exposure estimates', 'Documentary gap analysis per regulatory requirement', 'Prioritized corrective action plan with timeline', 'Executive presentation for the Board of Directors', 'One-year regulatory monitoring roadmap']
    : ['Rapport confidentiel de pré-inspection (60-100 pages)', 'Matrice des red flags avec estimation de l\'exposition financière', 'Analyse des écarts documentaires par exigence réglementaire', 'Plan d\'action correctif priorisé avec calendrier', 'Présentation exécutive pour le Conseil d\'Administration', 'Feuille de route de veille réglementaire sur 12 mois'];

  const RELATED = isEn
    ? [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Compliance & transfer pricing' },
        { title: 'RegTech & Regulatory Engineering', slug: 'regtech-regulatory-engineering', icon: 'ri-settings-3-line', kpi: 'Automate your compliance processes' },
        { title: 'Investment Readiness & Due Diligence Excellence™', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Assess your targets before investing' },
      ]
    : [
        { title: 'Transfer Pricing & Tax Governance Africa™', slug: 'gouvernance-fiscalite-internationale', icon: 'ri-global-line', kpi: 'KHEPRA 360° — Conformité & prix de transfert' },
        { title: 'RegTech & Ingénierie Réglementaire', slug: 'regtech-regulatory-engineering', icon: 'ri-settings-3-line', kpi: 'Automatisez vos processus de conformité' },
        { title: 'Investment Readiness & Due Diligence Excellence™', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Évaluez vos cibles avant d\'investir' },
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
      body.append('service', 'audit-pre-inspection-bceao');
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
          ? 'BCEAO/COBAC Inspection Readiness™ | Audit & Diagnostic | KHEPRA'
          : 'Audit Pré-Inspection BCEAO COBAC | Diagnostic & Devis | KHEPRA'}
        description={isEn
          ? 'BCEAO/COBAC inspection readiness service: Free Diagnostic (8 min), Full Mock Inspection, Remediation Plan, and Inspection Readiness Mission — tailored proposal. 25+ sanction grounds benchmarked. For banks, MFIs, fintechs & insurers in UEMOA/CEMAC.'
          : 'Service de préparation aux inspections BCEAO/COBAC : Diagnostic gratuit 8 min, Audit à Blanc complet, Plan de Remédiation et Mission Inspection Readiness — devis confidentiel sur mesure. 25+ motifs de sanction benchmarkés. Banques, IMF, fintechs, assurances UEMOA/CEMAC.'}
        keywords={isEn
          ? 'BCEAO COBAC inspection readiness, BCEAO pre-inspection audit, COBAC inspection simulation, prudential compliance mission, AML CFT inspection preparation, banking governance assessment Africa, regulatory readiness audit UEMOA CEMAC, KHEPRA EXPERTS inspection readiness'
          : 'BCEAO COBAC inspection readiness, audit pré-inspection BCEAO, simulation inspection COBAC, mission conformité prudentielle, préparation inspection LBC/FT, évaluation gouvernance bancaire Afrique, audit réglementaire UEMOA CEMAC, KHEPRA EXPERTS inspection readiness sur devis'}
        ogImage="https://readdy.ai/api/search-image?query=Confidential%20regulatory%20audit%20meeting%20in%20a%20dimly%20lit%20African%20boardroom%2C%20senior%20compliance%20experts%20reviewing%20prudential%20documentation%20with%20serious%20expressions%2C%20BCEAO%20and%20COBAC%20regulation%20manuals%20on%20the%20table%2C%20warm%20amber%20and%20dark%20charcoal%20atmosphere%2C%20institutional%20grade%20professional%20photography%2C%20West%20Africa%20financial%20district%20atmosphere%2C%20sophisticated%20legal%20and%20regulatory%20consulting%20imagery&width=1440&height=900&seq=pre-inspection-bceao-hero&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/audit-pre-inspection-bceao"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SCHEMA}
        hreflangLinks={buildHreflang('/services/audit-pre-inspection-bceao')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'BCEAO & COBAC Inspection Readiness™' : 'BCEAO & COBAC Inspection Readiness™', path: '/services/audit-pre-inspection-bceao' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Confidential%20regulatory%20audit%20meeting%20in%20a%20dimly%20lit%20African%20boardroom%2C%20senior%20compliance%20experts%20reviewing%20prudential%20documentation%20with%20serious%20expressions%2C%20BCEAO%20and%20COBAC%20regulation%20manuals%20on%20the%20table%2C%20warm%20amber%20and%20dark%20charcoal%20atmosphere%2C%20institutional%20grade%20professional%20photography%2C%20West%20Africa%20financial%20district%20atmosphere%2C%20sophisticated%20legal%20and%20regulatory%20consulting%20imagery&width=1440&height=900&seq=pre-inspection-bceao-hero&orientation=landscape"
              alt={isEn ? 'BCEAO & COBAC Inspection Readiness™ KHEPRA EXPERTS' : 'BCEAO & COBAC Inspection Readiness™ KHEPRA EXPERTS'}
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
                    {isEn ? 'BCEAO & COBAC Inspection Readiness™' : 'BCEAO & COBAC Inspection Readiness™'}
                  </span>
                </div>

                <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'What if the regulator' : 'Et si le régulateur'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #fcd34d, #b45309)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'walked in tomorrow?' : 'entrait demain ?'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We simulate a real BCEAO/COBAC inspection mission inside your institution — same methodology, same rigor, same standards. You get the report before they do. And the time to fix what needs fixing.'
                    : "Nous simulons une vraie mission d'inspection BCEAO/COBAC dans votre institution — même méthodologie, même rigueur, mêmes standards. Vous recevez le rapport avant eux. Et le temps de corriger ce qui doit l'être."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.2)' }}>
                  <i className="ri-shield-flash-line text-lg" style={{ color: '#b45309' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '5 inspection axes · 25+ sanction grounds benchmarked · Confidential report in 4-6 weeks'
                      : '5 axes d\'inspection · 25+ motifs de sanction benchmarkés · Rapport confidentiel en 4-6 semaines'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/tools/diagnostic-pre-inspection-bceao-cobac')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff', boxShadow: '0 4px 24px rgba(180,83,9,0.45)' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Get Your Free Readiness Score — 8 min' : 'Obtenez votre Score de Préparation — 8 min'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-audit');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-shield-check-line" />
                    {isEn ? 'Talk to an Expert' : 'Parler à un Expert'}
                  </button>
                </div>
                <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <i className="ri-information-line mr-1" />
                  {isEn ? 'Free · Confidential · Results in 8 minutes · No commitment' : 'Gratuit · Confidentiel · Résultats en 8 min · Sans engagement'}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-3 gap-3">
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
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Not communicable to the regulator' : 'Non communicable au régulateur'}</p>
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
                <BigFourSubtitleBar label={isEn ? 'The blind spot that costs millions' : "L'angle mort qui coûte des millions"} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Your internal audit is not' : 'Votre audit interne n\'est pas'} <br />
                  <span style={{ background: 'linear-gradient(90deg, #b45309, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'the same as a regulatory inspection.' : 'la même chose qu\'une inspection prudentielle.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Institutions that have never faced a real BCEAO/COBAC inspection underestimate the depth, the rigor and the consequences. The supervisor does not audit your processes — it audits your compliance with its own standards. Standards that evolve, tighten, and are enforced with increasing severity.'
                    : "Les institutions qui n'ont jamais fait face à une vraie inspection BCEAO/COBAC sous-estiment la profondeur, la rigueur et les conséquences. Le superviseur n'audite pas vos processus — il audite votre conformité à ses propres standards. Des standards qui évoluent, se durcissent, et sont sanctionnés avec une sévérité croissante."}
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
                      {isEn ? 'The KHEPRA Pre-Inspection Method' : 'La Méthode Pré-Inspection KHEPRA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn ? 'Know what the regulator will find — before they find it.' : 'Sachez ce que le régulateur va trouver — avant qu\'il ne le trouve.'}
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
                  <button
                    onClick={() => navigate('/tools/diagnostic-pre-inspection-bceao-cobac')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Free Pre-Inspection Score' : 'Score Pré-Inspection Gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5 AXES D'INSPECTION ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <BigFourSubtitleBar label={isEn ? 'Our inspection framework' : 'Notre cadre d\'inspection'} variant="left-accent" accentColor="primary" className="mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? '5 axes. 25+ sanction grounds. Zero surprises.' : '5 axes. 25+ motifs de sanction. Zéro surprise.'}
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                {isEn
                  ? 'Our pre-inspection audit covers exactly the same scope as a real BCEAO/COBAC mission — aligned with COBAC Regulation R-2016/04 and equivalent BCEAO standards.'
                  : 'Notre audit de pré-inspection couvre exactement le même périmètre qu\'une vraie mission BCEAO/COBAC — aligné sur le Règlement COBAC R-2016/04 et les standards BCEAO équivalents.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
              {AXES.map((axe, i) => (
                <button key={i} onClick={() => setActiveAxe(i)} className={`text-left p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeAxe === i ? 'ring-2' : ''}`}
                  style={{ background: activeAxe === i ? '#ffffff' : 'rgba(255,255,255,0.6)', border: activeAxe === i ? '1px solid rgba(180,83,9,0.3)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: activeAxe === i ? 'rgba(180,83,9,0.12)' : 'rgba(0,0,0,0.04)' }}>
                    <i className={`${axe.icon} text-base`} style={{ color: activeAxe === i ? '#b45309' : '#666' }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: activeAxe === i ? '#b45309' : '#333' }}>{axe.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{axe.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-lg mb-5" style={{ color: '#b45309' }}>
                <i className={`${AXES[activeAxe].icon} mr-2`} />{AXES[activeAxe].title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {AXES[activeAxe].findings.map((finding, j) => (
                  <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(180,83,9,0.12)' }}>
                      <i className="ri-search-eye-line text-[10px]" style={{ color: '#b45309' }} />
                    </div>
                    <span className="text-sm text-gray-700">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MÉTHODOLOGIE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <BigFourSubtitleBar label={isEn ? 'Our methodology' : 'Notre méthodologie'} variant="left-accent" accentColor="primary" className="mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? '4 weeks to full inspection readiness.' : '4 semaines vers la pleine préparation.'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {METHODOLOGY.map((phase, i) => (
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

        {/* ── LIVRABLES + CIBLE ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <BigFourSubtitleBar label={isEn ? 'Deliverables included' : 'Livrables inclus'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'A complete inspection dossier' : 'Un dossier d\'inspection complet'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100">
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
                    {isEn ? 'Who is this for?' : 'À qui s\'adresse cet audit ?'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-heading), serif' }}>
                  {isEn ? 'Institutions that cannot afford a surprise inspection' : 'Les institutions qui ne peuvent pas se permettre une inspection surprise'}
                </h2>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: 'ri-bank-line', label: isEn ? 'Commercial Banks' : 'Banques Commerciales', desc: isEn ? 'Facing BCEAO/COBAC inspection cycles — prepare before the notification letter arrives' : 'Face aux cycles d\'inspection BCEAO/COBAC — préparez-vous avant la lettre de notification' },
                    { icon: 'ri-building-2-line', label: isEn ? 'Microfinance Institutions (MFIs)' : 'Institutions de Microfinance (IMF)', desc: isEn ? 'Agrément renewal, regulatory upgrade, or first-ever inspection preparation' : 'Renouvellement d\'agrément, montée en gamme réglementaire, ou première inspection' },
                    { icon: 'ri-smartphone-line', label: isEn ? 'Fintechs & Payment Institutions' : 'Fintechs & Établissements de Paiement', desc: isEn ? 'Newly regulated — demonstrate compliance maturity to the supervisor' : 'Nouvellement régulées — démontrez votre maturité conformité au superviseur' },
                    { icon: 'ri-shield-check-line', label: isEn ? 'Insurance Companies' : 'Compagnies d\'Assurance', desc: isEn ? 'CIMA/CBAC regulatory requirements — governance, risk management, internal control' : 'Exigences CIMA/CBAC — gouvernance, gestion des risques, contrôle interne' },
                  ].map((cible, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 mt-0.5">
                        <i className={`${cible.icon} text-lg text-gray-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{cible.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{cible.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#b45309' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 4 to 6 weeks' : 'Durée : 4 à 6 semaines'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Fixed-price proposal after preliminary diagnostic' : 'Devis sur mesure après diagnostic préliminaire'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tools/diagnostic-pre-inspection-bceao-cobac')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#ffffff' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Free Pre-Inspection Diagnostic' : 'Diagnostic Pré-Inspection Gratuit'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — Results in 10 min — Immediate risk classification' : 'Gratuit — Résultats en 10 min — Classification de risque immédiate'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'BCEAO & COBAC Inspection Readiness™' : 'BCEAO & COBAC Inspection Readiness™'} />

        {/* ── LEAD MAGNET — Diagnostic Pré-Inspection ── */}
        <InlineLeadMagnet context="pre-inspection-bceao" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="audit-pre-inspection-bceao" />

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
        <div id="contact-audit">
          <PremiumServiceCTA
            formId="service-audit-pre-inspection-bceao"
            formUrl="https://readdy.ai/api/form/d8hdbo5iodfui947tup0"
            badge={isEn ? 'Take action now' : 'Passez à l\'action'}
            title={isEn ? 'Ready to know where you really stand?' : 'Prêt à savoir où vous en êtes vraiment ?'}
            subtitle={isEn
              ? 'Discuss your pre-inspection readiness with a senior expert. Free confidential diagnostic, no commitment. We\'ll tell you exactly what the regulator would find — and how to fix it before they do.'
              : 'Discutez de votre préparation à l\'inspection avec un expert senior. Diagnostic confidentiel gratuit, sans engagement. On vous dit exactement ce que le régulateur trouverait — et comment le corriger avant lui.'}
            primaryBtnText={isEn ? 'Request a Pre-Inspection Audit' : 'Demander un Audit de Pré-Inspection'}
            secondaryBtnText={isEn ? 'Free Diagnostic Score' : 'Score Diagnostic Gratuit'}
            secondaryBtnAction="diagnostic-pre-inspection-bceao"
            variant="dark"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/audit-pre-inspection-bceao/`}
            title={isEn ? 'BCEAO & COBAC Inspection Readiness™ — KHEPRA EXPERTS' : 'BCEAO & COBAC Inspection Readiness™ — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />

      <ExitIntentLeadMagnet
        offer={{
          id: 'pre-inspection-bceao',
          title: isEn ? 'BCEAO & COBAC Inspection Readiness™ Diagnostic' : 'Diagnostic BCEAO & COBAC Inspection Readiness™',
          subtitle: isEn ? 'Get your confidential readiness score across 5 inspection axes in 8 minutes. 25+ sanction grounds benchmarked. Identify your red flags before the regulator does.' : 'Obtenez votre score confidentiel de préparation sur 5 axes d\'inspection en 8 minutes. 25+ motifs de sanction benchmarkés. Identifiez vos red flags avant le régulateur.',
          toolSlug: '/tools/diagnostic-pre-inspection-bceao-cobac',
          icon: 'ri-stethoscope-line',
          accentColor: '#b45309',
          timeMinutes: '8 min',
          usersCount: '1 200+',
          successRate: '96%',
        }}
      />
    </>
  );
}



