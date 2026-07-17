import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const RISKS = [
  {
    icon: 'ri-close-circle-line',
    titleFr: 'Défaillance de gouvernance',
    titleEn: 'Governance Failure',
    descFr: 'Un Conseil d\'administration dysfonctionnel expose l\'organisation à des décisions stratégiques non éclairées, des conflits d\'intérêts non résolus et une perte de confiance des parties prenantes.',
    descEn: 'A dysfunctional Board exposes the organization to uninformed strategic decisions, unresolved conflicts of interest and loss of stakeholder confidence.',
  },
  {
    icon: 'ri-alert-line',
    titleFr: 'Risques opérationnels non maîtrisés',
    titleEn: 'Uncontrolled Operational Risks',
    descFr: 'Sans dispositif ERM, les risques restent invisibles jusqu\'à leur matérialisation. Pertes financières, interruption d\'activité, incidents de conformité.',
    descEn: 'Without an ERM framework, risks remain invisible until they materialize. Financial losses, business interruption, compliance incidents.',
  },
  {
    icon: 'ri-survey-line',
    titleFr: 'Absence de contrôle interne',
    titleEn: 'Lack of Internal Control',
    descFr: 'Des processus sans contrôles clés exposent à des fraudes, erreurs comptables et non-conformités réglementaires. L\'absence de piste d\'audit compromet la certification des comptes.',
    descEn: 'Processes without key controls expose to fraud, accounting errors and regulatory non-compliance. The absence of audit trails compromises financial statement certification.',
  },
  {
    icon: 'ri-file-shield-2-line',
    titleFr: 'Non-conformité réglementaire',
    titleEn: 'Regulatory Non-Compliance',
    descFr: 'La méconnaissance des obligations légales et réglementaires expose l\'organisation à des sanctions, amendes, et dans les cas les plus graves, à la mise en cause de la responsabilité des dirigeants.',
    descEn: 'Ignorance of legal and regulatory obligations exposes the organization to sanctions, fines, and in the most serious cases, personal liability of directors.',
  },
];

const SERVICES = [
  {
    icon: 'ri-radar-line',
    titleFr: 'ERM — Enterprise Risk Management',
    titleEn: 'ERM — Enterprise Risk Management',
    descFr: 'Anticipez les défaillances avant qu\'elles ne détruisent la valeur de votre organisation. Conception et déploiement d\'un dispositif ERM complet aligné COSO et ISO 31000 : identification, évaluation, traitement et suivi de tous les risques.',
    descEn: 'Anticipate failures before they destroy your organization\'s value. Design and deployment of a complete ERM framework aligned with COSO and ISO 31000: identification, assessment, treatment and monitoring of all risks.',
    deliverables: ['Cartographie exhaustive des risques', 'Matrice de criticité et heat maps', 'Plan de traitement priorisé', 'Tableaux de bord risques et KPIs'],
    ref: 'COSO ERM — Integrating with Strategy and Performance (2017)',
  },
  {
    icon: 'ri-search-eye-line',
    titleFr: 'Audit interne — Standards IIA',
    titleEn: 'Internal Audit — IIA Standards',
    descFr: 'Protégez la fiabilité de votre information financière et l\'efficacité de vos opérations. Missions d\'audit interne selon les standards IIA et le référentiel COSO. Évaluation du contrôle interne, tests de permanence, recommandations.',
    descEn: 'Protect the reliability of your financial information and the effectiveness of your operations. Internal audit missions per IIA standards and COSO framework. Internal control assessment, permanence testing, recommendations.',
    deliverables: ['Plan d\'audit annuel basé sur les risques', 'Rapports d\'audit formels avec constats', 'Recommandations hiérarchisées', 'Suivi trimestriel des plans d\'action'],
    ref: 'IIA — International Professional Practices Framework (IPPF)',
  },
  {
    icon: 'ri-government-line',
    titleFr: 'Conseil d\'administration',
    titleEn: 'Board Advisory',
    descFr: 'Transformez votre Conseil d\'administration en véritable organe de pilotage stratégique. Évaluation du CA, structuration des comités spécialisés (audit, risques, rémunération), formation certifiée des administrateurs.',
    descEn: 'Transform your Board into a true strategic steering body. Board assessment, specialized committee structuring (audit, risk, remuneration), certified director training.',
    deliverables: ['Évaluation complète du Conseil', 'Plan de renforcement de la gouvernance', 'Chartes des comités spécialisés', 'Programme de formation certifié'],
    ref: 'Circulaire BCEAO 01/2017/CB — Gouvernance des établissements',
  },
  {
    icon: 'ri-shield-check-line',
    titleFr: 'Contrôle interne — COSO',
    titleEn: 'Internal Control — COSO',
    descFr: 'Éliminez les angles morts de votre dispositif de contrôle. Conception et évaluation du contrôle interne selon COSO : environnement de contrôle, évaluation des risques, activités de contrôle, information et communication, pilotage.',
    descEn: 'Eliminate blind spots in your control framework. Internal control design and assessment per COSO: control environment, risk assessment, control activities, information & communication, monitoring.',
    deliverables: ['Cartographie exhaustive des processus', 'Matrice des risques et contrôles', 'Tests de permanence documentés', 'Rapport de contrôle interne au Conseil'],
    ref: 'COSO Internal Control — Integrated Framework (2013)',
  },
  {
    icon: 'ri-map-2-line',
    titleFr: 'Cartographie des risques',
    titleEn: 'Risk Mapping',
    descFr: 'Visualisez tous vos risques sur une carte unique et actionnable. Cartographie exhaustive des risques opérationnels, financiers, stratégiques et de conformité. Heat maps interactives, matrices de criticité, registre des risques.',
    descEn: 'Visualize all your risks on a single actionable map. Exhaustive mapping of operational, financial, strategic and compliance risks. Interactive heat maps, criticality matrices, risk register.',
    deliverables: ['Cartographie interactive des risques', 'Heat maps par processus et par entité', 'Registre des risques complet', 'KPIs de suivi et d\'atténuation'],
    ref: 'ISO 31000:2018 — Management du risque',
  },
  {
    icon: 'ri-file-list-3-line',
    titleFr: 'Conformité & protection des données',
    titleEn: 'Compliance & Data Protection',
    descFr: 'Protégez votre organisation contre les sanctions liées à la non-conformité réglementaire et à la violation des données personnelles. Diagnostic conformité, plan d\'actions, procédures et formation.',
    descEn: 'Protect your organization from sanctions related to regulatory non-compliance and personal data breaches. Compliance diagnostic, action plan, procedures, training.',
    deliverables: ['Diagnostic conformité complet', 'Plan d\'actions réglementaires', 'Procédures et politiques documentées', 'Rapport de conformité pour le Conseil'],
    ref: 'Règlement UEMOA n°01/2020 — Protection des données',
  },
];

const METHODOLOGY = [
  { step: '01', titleFr: 'Diagnostic', titleEn: 'Diagnosis', descFr: 'Évaluation complète du dispositif existant. Entretiens avec les parties prenantes, analyse documentaire, benchmark.', descEn: 'Complete assessment of existing framework. Stakeholder interviews, document analysis, benchmarking.' },
  { step: '02', titleFr: 'Cartographie', titleEn: 'Mapping', descFr: 'Identification exhaustive des risques, processus et contrôles. Documentation structurée, matrices et registres.', descEn: 'Exhaustive identification of risks, processes and controls. Structured documentation, matrices and registers.' },
  { step: '03', titleFr: 'Analyse', titleEn: 'Analysis', descFr: 'Évaluation de la criticité, tests de conception et de permanence, analyses croisées, identification des gaps.', descEn: 'Criticality assessment, design and permanence testing, cross-analysis, gap identification.' },
  { step: '04', titleFr: 'Plan d\'action', titleEn: 'Action Plan', descFr: 'Recommandations hiérarchisées, feuille de route détaillée avec calendrier, responsables désignés et livrables mesurables.', descEn: 'Prioritized recommendations, detailed roadmap with timeline, designated owners and measurable deliverables.' },
  { step: '05', titleFr: 'Pilotage continu', titleEn: 'Ongoing Monitoring', descFr: 'Déploiement opérationnel, suivi trimestriel, ajustements, reporting au Conseil, transfert de compétences aux équipes.', descEn: 'Operational deployment, quarterly monitoring, adjustments, Board reporting, skills transfer to teams.' },
];

const METRICS = [
  { value: 'COSO', unit: '', labelFr: 'référentiel contrôle interne', labelEn: 'internal control framework' },
  { value: 'IIA', unit: '', labelFr: 'standards audit interne', labelEn: 'internal audit standards' },
  { value: 'ISO', unit: '', labelFr: '31000 gestion des risques', labelEn: '31000 risk management' },
  { value: 'OHADA', unit: '', labelFr: 'cadre juridique', labelEn: 'legal framework' },
];

const REGULATORY_REFS = [
  { text: 'COSO — Internal Control — Integrated Framework', num: 'COSO 2013' },
  { text: 'COSO — Enterprise Risk Management — Integrating with Strategy and Performance', num: 'COSO ERM 2017' },
  { text: 'IIA — International Professional Practices Framework (IPPF)', num: 'IIA IPPF 2024' },
  { text: 'ISO 31000:2018 — Management du risque — Lignes directrices', num: 'ISO 31000:2018' },
  { text: 'ISO 37000:2021 — Gouvernance des organismes', num: 'ISO 37000:2021' },
  { text: 'OHADA — Acte Uniforme AUSCGIE (Droit des sociétés commerciales)', num: 'AUSCGIE 2014' },
  { text: 'BCEAO — Circulaire 01/2017/CB (Gouvernance)', num: '01/2017/CB' },
  { text: 'BCEAO — Circulaire 02-2017/CB/C (Dirigeants et avis conforme)', num: '02-2017/CB/C' },
  { text: 'BCEAO — Circulaire 03-2017/CB/C (Contrôle interne et gestion des risques)', num: '03-2017/CB/C' },
  { text: 'Règlement UEMOA n°01/2020/CCEG/UEMOA — Protection des données', num: '01/2020/CCEG/UEMOA' },
  { text: 'ISO 27701:2019 — Système de management de la vie privée', num: 'ISO 27701:2019' },
  { text: 'GRI Standards 2021 — Global Reporting Initiative', num: 'GRI 2021' },
];

const FAQ_ITEMS = [
  { questionFr: 'Quelle est la différence entre ERM, contrôle interne et audit interne ?', answerFr: 'L\'ERM (Enterprise Risk Management) est le cadre global de gestion des risques de l\'organisation. Le contrôle interne est l\'ensemble des dispositifs qui assurent la maîtrise des opérations. L\'audit interne est la fonction indépendante qui évalue périodiquement l\'efficacité de ces deux dispositifs. Ces trois piliers sont complémentaires et doivent être alignés.' },
  { questionFr: 'À partir de quelle taille une organisation a-t-elle besoin d\'un dispositif ERM ?', answerFr: 'Dès qu\'une organisation atteint une certaine complexité (multi-sites, multi-produits, environnement réglementé), un ERM devient indispensable. Pour les établissements financiers régulés, le dispositif ERM est obligatoire (Circulaire BCEAO 03/2017/CB). Pour les entreprises non régulées, nous recommandons un ERM à partir de 50 employés ou 1 milliard FCFA de chiffre d\'affaires.' },
  { questionFr: 'Combien de temps prend une mission d\'évaluation de gouvernance ?', answerFr: 'Une évaluation complète de la gouvernance (Conseil d\'administration + comités spécialisés) prend généralement 4 à 6 semaines. Le diagnostic initial est livré sous 10 jours ouvrés. Les formations des administrateurs sont planifiées sur un trimestre.' },
  { questionFr: 'Quels référentiels utilisez-vous pour l\'audit interne ?', answerFr: 'Nous appliquons strictement le cadre de référence international des pratiques professionnelles de l\'audit interne (IPPF) de l\'Institute of Internal Auditors (IIA), combiné au référentiel COSO pour le contrôle interne. Pour le secteur financier, nous intégrons les exigences spécifiques des circulaires BCEAO et COBAC.' },
  { questionFr: 'Proposez-vous un accompagnement dans la durée ou uniquement des missions ponctuelles ?', answerFr: 'Notre modèle privilégié est l\'accompagnement dans la durée : diagnostic → plan d\'action → mise en œuvre → suivi trimestriel. 92% de nos clients restent avec nous au-delà de la mission initiale. Nous pouvons également intervenir sur des missions ponctuelles selon vos besoins.' },
];

const CASE_STUDIES = [
  { titleFr: 'Gouvernance — Holding familiale panafricaine UEMOA', titleEn: 'Governance — Pan-African Family Holding UEMOA', resultFr: 'Structuration du Conseil d\'administration, comités spécialisés créés, charte de gouvernance adoptée.', resultEn: 'Board restructuring, specialized committees created, governance charter adopted.', link: '/case-studies/gouvernance-board-advisory-uemoa' },
  { titleFr: 'ERM — Groupe industriel multi-pays OHADA', titleEn: 'ERM — Multi-Country Industrial Group OHADA', resultFr: 'Cartographie des risques réalisée, plan de traitement déployé, réduction des incidents opérationnels constatée.', resultEn: 'Risk mapping completed, treatment plan deployed, reduction in operational incidents recorded.', link: '/case-studies/gouvernance-board-advisory-uemoa' },
];

const DARK_GREEN = '#5a8519';
const MED_GREEN = '#6B9B1F';
const LIGHT_GREEN = '#86BC25';

export default function GouvernanceRisquesPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const currentLang = isEn ? 'en-US' : 'fr-FR';
  const [showAllRefs, setShowAllRefs] = useState(false);
  const displayedRefs = showAllRefs ? REGULATORY_REFS : REGULATORY_REFS.slice(0, 6);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isEn ? 'Governance & Risk — ERM, Internal Audit, Board Advisory, Compliance | KHEPRA EXPERTS' : 'Gouvernance & Risques — ERM, Audit interne, Conseil d\'administration, Conformité | KHEPRA EXPERTS',
    description: isEn ? 'Premium governance & risk advisory: ERM, internal audit, board advisory, internal control, risk mapping, compliance. Family Business Governance & CEO Advisory Board Africa™.' : 'Conseil premium en gouvernance & risques : ERM, audit interne, conseil d\'administration, contrôle interne, cartographie des risques, conformité. Family Business Governance & CEO Advisory Board Africa™.',
    inLanguage: currentLang,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Governance & Risk — Family Business Governance & CEO Advisory Board Africa™' : 'Gouvernance & Risques — Family Business Governance & CEO Advisory Board Africa™', item: `${SITE_URL}/gouvernance-risques` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.questionFr,
      acceptedAnswer: { '@type': 'Answer', text: item.answerFr },
    })),
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Governance & Risk — ERM, Internal Audit, Board Advisory, Compliance | KHEPRA EXPERTS' : 'Gouvernance & Risques — ERM, Audit interne, Conseil d\'administration, Conformité | KHEPRA EXPERTS'}
        description={isEn ? 'Governance & risk advisory: ERM, internal audit, board advisory, internal control, risk mapping, compliance. Intervention aimed at strengthening governance frameworks. Free diagnostic.' : 'Conseil en gouvernance & risques : ERM, audit interne, conseil d\'administration, contrôle interne, cartographie des risques, conformité. Intervention visant à renforcer les cadres de gouvernance. Diagnostic gratuit.'}
        keywords="gouvernance risques Afrique, ERM Afrique, audit interne COSO, conseil administration OHADA, cartographie risques entreprise, contrôle interne banque, conformité protection données Afrique"
        canonicalPath="/gouvernance-risques"
        schemaJson={{ ...schema, ...faqSchema }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(165deg, #080c14 0%, #0c1420 30%, #111b2a 60%, #0a101c 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(rgba(107,155,31,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(107,155,31,0.10) 0%, transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 25% 85%, rgba(107,155,31,0.06) 0%, transparent 50%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full" style={{ background: 'rgba(107,155,31,0.06)', border: '1px solid rgba(107,155,31,0.2)' }}>
                <i className="ri-shield-check-line text-sm" style={{ color: LIGHT_GREEN }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: LIGHT_GREEN }}>
                  {isEn ? 'Business Unit 3 — Governance, Risk & Compliance' : 'Business Unit 3 — Gouvernance, Risques & Conformité'}
                </span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                {isEn ? 'Structure your governance to prevent organizational failure' : 'Structurez votre gouvernance pour prévenir les défaillances'}
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isEn
                  ? 'Family Business Governance & CEO Advisory Board Africa™ — We help organizations build robust governance frameworks, manage risks systematically and achieve regulatory compliance across Francophone Africa.'
                  : 'Family Business Governance & CEO Advisory Board Africa™ — Nous aidons les organisations à bâtir des cadres de gouvernance solides, à gérer leurs risques systématiquement et à atteindre la conformité réglementaire en Afrique francophone.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                {[
                  { val: 'COSO', label: isEn ? 'ERM framework' : 'référentiel ERM' },
                  { val: 'IIA', label: isEn ? 'audit standards' : 'standards audit' },
                  { val: 'ISO', label: isEn ? '31000 risk mgmt' : '31000 gestion risques' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display font-bold" style={{ color: LIGHT_GREEN, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['COSO ERM', 'IIA IPPF', 'ISO 31000', 'ISO 37000', 'OHADA AUSCGIE', 'GRI 2021'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white"
                  style={{ background: `linear-gradient(135deg, ${MED_GREEN}, ${LIGHT_GREEN})` }}>
                  <i className="ri-stethoscope-line mr-2" />
                  {isEn ? 'Free diagnostic — 8 min' : 'Diagnostic gratuit — 8 min'}
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-customer-service-2-line mr-2" />
                  {isEn ? 'Request a consultation' : 'Demander une consultation'}
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(107,155,31,0.25), transparent)' }} />
        </section>

        {/* ═══════════ RISKS ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">
                {isEn ? 'Governance Risk Exposure' : 'Exposition aux Risques de Gouvernance'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Inadequate governance carries significant consequences for organizations' : 'Une gouvernance inadéquate emporte des conséquences significatives pour les organisations'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Governance failures rarely make headlines until it\'s too late. These are the documented consequences of inadequate governance and risk management.' : 'Les défaillances de gouvernance font rarement la une avant qu\'il ne soit trop tard. Voici les conséquences documentées d\'une gouvernance et d\'une gestion des risques inadéquates.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {RISKS.map((r, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-orange-100 bg-orange-50/30 group hover:bg-orange-50/60 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 bg-orange-100">
                    <i className={`${r.icon} text-lg text-orange-700`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{isEn ? r.titleEn : r.titleFr}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{isEn ? r.descEn : r.descFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ METRICS ═══════════ */}
        <section className="py-10 bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map((m, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-deloitte-50 border border-deloitte-200/40">
                  <div className="font-display text-2xl font-bold mb-1 text-deloitte-600">
                    {m.value}{m.unit && <span className="text-sm font-medium ml-0.5 text-neutral-300">{m.unit}</span>}
                  </div>
                  <div className="text-xs text-neutral-500">{isEn ? m.labelEn : m.labelFr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Our Services' : 'Nos Services'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Complete Governance & Risk Protection' : 'Protection Complète Gouvernance & Risques'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                {isEn ? 'Six specialized services to strengthen governance and risk management frameworks. Each designed to address a specific organizational requirement.' : 'Six services spécialisés pour renforcer les cadres de gouvernance et de gestion des risques. Chacun conçu pour adresser une exigence organisationnelle spécifique.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${svc.icon} text-lg text-deloitte-600`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{isEn ? svc.titleEn : svc.titleFr}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{isEn ? svc.descEn : svc.descFr}</p>
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">{isEn ? 'Deliverables' : 'Livrables'}</span>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                          <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {svc.ref && (
                      <div className="mt-3 pt-3 border-t border-neutral-50">
                        <span className="text-[10px] text-neutral-400 italic">{svc.ref}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ METHODOLOGY ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Our Methodology — COSO / IIA / ISO 31000' : 'Notre Méthodologie — COSO / IIA / ISO 31000'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? '5-Phase Governance & Risk Process' : 'Processus Gouvernance & Risques en 5 Phases'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {METHODOLOGY.map((m, i) => (
                <div key={i} className="relative text-center group">
                  {i < METHODOLOGY.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(107,155,31,0.4), rgba(107,155,31,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-deloitte-50 border-2 border-deloitte-200/50 text-deloitte-600">
                    {m.step}
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">{isEn ? m.titleEn : m.titleFr}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{isEn ? m.descEn : m.descFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CASE STUDIES ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Case Studies' : 'Cas Pratiques'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Proven Results in Governance & Risk' : 'Résultats Prouvés en Gouvernance & Risques'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CASE_STUDIES.map((cs, i) => (
                <a key={i} href={cs.link} className="rounded-2xl p-6 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 transition-all hover:-translate-y-1 group cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-50 border border-deloitte-200/40 mb-4">
                    <i className="ri-file-chart-line text-deloitte-600" />
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2">{isEn ? cs.titleEn : cs.titleFr}</h4>
                  <p className="text-sm text-neutral-500 mb-3">{isEn ? cs.resultEn : cs.resultFr}</p>
                  <span className="text-xs font-bold text-deloitte-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isEn ? 'Read the case study' : 'Lire l\'étude de cas'} <i className="ri-arrow-right-line" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ REGULATORY REFERENCES ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Regulatory & Standards Framework' : 'Cadre Réglementaire & Normatif'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Official References — Sourced & Verified' : 'Références Officielles — Sourcées & Vérifiées'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Our governance and risk management methodologies are strictly based on these international standards and regulatory texts.' : 'Nos méthodologies en gouvernance et gestion des risques sont strictement basées sur ces standards internationaux et textes réglementaires.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {displayedRefs.map((ref, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <i className="ri-file-text-line text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-700 leading-relaxed">{ref.text}</p>
                    <span className="text-[10px] text-neutral-400 font-mono">{ref.num}</span>
                  </div>
                </div>
              ))}
            </div>
            {REGULATORY_REFS.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllRefs(!showAllRefs)}
                  className="text-xs font-bold text-deloitte-600 hover:text-deloitte-700 transition-colors flex items-center gap-1 mx-auto">
                  {showAllRefs ? (isEn ? 'Show less' : 'Voir moins') : (isEn ? `Show all ${REGULATORY_REFS.length} references` : `Voir les ${REGULATORY_REFS.length} références`)}
                  <i className={`ri-arrow-${showAllRefs ? 'up' : 'down'}-s-line`} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Your Questions, Answered' : 'Vos Questions, Nos Réponses'}
              </h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS.map((item) => ({
              question: isEn ? (item.questionEn || item.questionFr) : item.questionFr,
              answer: isEn ? (item.answerEn || item.answerFr) : item.answerFr,
            }))} />
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(107,155,31,0.04), rgba(107,155,31,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Is your governance ready for scrutiny?' : 'Votre gouvernance est-elle prête pour l\'examen ?'}
              </h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                {isEn ? 'Take our 8-minute governance diagnostic to assess your Board effectiveness, risk management maturity, and compliance level.' : 'Faites notre diagnostic gouvernance de 8 minutes pour évaluer l\'efficacité de votre Conseil, la maturité de votre gestion des risques et votre niveau de conformité.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white"
                  style={{ background: `linear-gradient(135deg, ${MED_GREEN}, ${LIGHT_GREEN})` }}>
                  <i className="ri-stethoscope-line mr-2" />
                  {isEn ? 'Start free diagnostic' : 'Démarrer le diagnostic gratuit'}
                </a>
                <a href="/case-studies"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-file-chart-line mr-2" />
                  {isEn ? 'See our case studies' : 'Voir nos études de cas'}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}