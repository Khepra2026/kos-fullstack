import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const RISKS = [
  {
    icon: 'ri-money-dollar-circle-line',
    titleFr: 'Redressements fiscaux massifs',
    titleEn: 'Massive Tax Reassessments',
    descFr: 'Des redressements pouvant atteindre 40% du chiffre d\'affaires ajusté, accompagnés de pénalités de retard et d\'intérêts moratoires. Une seule transaction mal documentée peut déclencher un contrôle complet.',
    descEn: 'Reassessments reaching 40% of adjusted turnover, accompanied by late payment penalties and interest. A single poorly documented transaction can trigger a full audit.',
  },
  {
    icon: 'ri-file-warning-line',
    titleFr: 'Double imposition internationale',
    titleEn: 'International Double Taxation',
    descFr: 'En l\'absence de documentation conforme, vos bénéfices peuvent être imposés deux fois — dans le pays source et le pays de résidence — sans possibilité de recours effectif.',
    descEn: 'Without compliant documentation, your profits may be taxed twice — in the source country and the country of residence — without effective recourse.',
  },
  {
    icon: 'ri-global-line',
    titleFr: 'Ajustements de prix de transfert',
    titleEn: 'Transfer Pricing Adjustments',
    descFr: 'L\'administration fiscale peut réajuster unilatéralement vos prix de transfert sur les 3 à 5 derniers exercices, créant une charge fiscale rétroactive imprévisible.',
    descEn: 'The tax authority can unilaterally adjust your transfer pricing for the last 3-5 fiscal years, creating an unpredictable retroactive tax burden.',
  },
  {
    icon: 'ri-newspaper-line',
    titleFr: 'Atteinte à la réputation',
    titleEn: 'Reputational Damage',
    descFr: 'Un redressement prix de transfert est souvent médiatisé. Pour les groupes cotés ou en levée de fonds, l\'impact sur la valorisation peut dépasser le montant du redressement lui-même.',
    descEn: 'Transfer pricing reassessments are often publicized. For listed groups or fundraising companies, the impact on valuation can exceed the reassessment amount itself.',
  },
];

const SERVICES = [
  {
    icon: 'ri-file-list-3-line',
    titleFr: 'Documentation locale BEPS Action 13',
    titleEn: 'BEPS Action 13 Local File',
    descFr: 'Sécurisez vos transactions intragroupe contre les redressements. Documentation complète conforme à l\'Action 13 du plan BEPS de l\'OCDE : analyse fonctionnelle, analyse économique, choix de la méthode, justification du caractère de pleine concurrence.',
    descEn: 'Secure your intragroup transactions against reassessments. Complete documentation compliant with OECD BEPS Action 13: functional analysis, economic analysis, method selection, arm\'s length justification.',
    deliverables: ['Rapport documentation locale complet', 'Analyse fonctionnelle détaillée', 'Analyse économique et benchmarking', 'Annexes et preuves documentaires'],
    ref: 'OCDE BEPS Action 13 (2015, révisé 2023)',
  },
  {
    icon: 'ri-folder-2-line',
    titleFr: 'Master File — Documentation groupe',
    titleEn: 'Master File — Group Documentation',
    descFr: 'Présentez une vision cohérente de votre politique prix de transfert à toutes les administrations fiscales. Cartographie de la chaîne de valeur globale, actifs incorporels, allocation des risques.',
    descEn: 'Present a coherent view of your transfer pricing policy to all tax authorities. Global value chain mapping, intangible assets, risk allocation.',
    deliverables: ['Master File conforme OCDE', 'Cartographie chaîne de valeur groupe', 'Analyse des actifs incorporels', 'Politique prix de transfert documentée'],
    ref: 'OCDE BEPS Action 13 — Annexe I Chapitre V',
  },
  {
    icon: 'ri-bar-chart-grouped-line',
    titleFr: 'Benchmarking & analyse de comparables',
    titleEn: 'Benchmarking & Comparable Analysis',
    descFr: 'Justifiez le caractère de pleine concurrence de vos prix par des analyses de comparables robustes. Screening bases de données internationales, ajustements statistiques, documentation de la méthode TNMM.',
    descEn: 'Justify the arm\'s length nature of your prices through robust comparable analyses. International database screening, statistical adjustments, TNMM documentation.',
    deliverables: ['Étude de comparables complète', 'Screening bases de données', 'Ajustements statistiques documentés', 'Rapport de benchmarking'],
    ref: 'OCDE Principes applicables en matière de PT (2022)',
  },
  {
    icon: 'ri-stethoscope-line',
    titleFr: 'Diagnostic prix de transfert',
    titleEn: 'Transfer Pricing Diagnostic',
    descFr: 'Identifiez vos expositions avant l\'administration fiscale. Évaluation complète des risques prix de transfert de votre groupe, estimation chiffrée des expositions, recommandations hiérarchisées.',
    descEn: 'Identify your exposures before the tax authority does. Complete transfer pricing risk assessment for your group, quantified exposure estimation, prioritized recommendations.',
    deliverables: ['Matrice des risques PT exhaustive', 'Estimation chiffrée des expositions', 'Recommandations hiérarchisées', 'Plan de mise en conformité priorisé'],
    ref: 'Directive UEMOA n°01/2011/CM/UEMOA',
  },
  {
    icon: 'ri-shield-flash-line',
    titleFr: 'Défense en contrôle fiscal',
    titleEn: 'Tax Audit Defense',
    descFr: 'Quand le contrôle fiscal est déclenché, ne restez pas seuls. Nous constituons votre dossier de défense, préparons l\'argumentaire technique et vous accompagnons dans la négociation avec l\'administration.',
    descEn: 'When the tax audit is triggered, don\'t face it alone. We build your defense file, prepare the technical arguments and support you in negotiation with the tax authority.',
    deliverables: ['Dossier de défense complet', 'Argumentaire technique et juridique', 'Simulations chiffrées des scénarios', 'Accompagnement pendant la négociation'],
    ref: 'Règlement CEMAC n°01/18-CEMAC-UMAC-DFLC',
  },
  {
    icon: 'ri-book-open-line',
    titleFr: 'Politique prix de transfert groupe',
    titleEn: 'Group Transfer Pricing Policy',
    descFr: 'Établissez une politique prix de transfert solide, alignée sur la stratégie fiscale du groupe et les exigences de toutes les juridictions où vous opérez. Procédures opérationnelles, formation des équipes finance.',
    descEn: 'Establish a robust transfer pricing policy aligned with group tax strategy and requirements of all jurisdictions where you operate. Operational procedures, finance team training.',
    deliverables: ['Politique PT documentée et validée', 'Procédures opérationnelles détaillées', 'Formation des équipes finance et fiscalité', 'Guide de mise en œuvre pratique'],
    ref: 'OCDE — Modèle de Convention Fiscale (2017), Art. 9',
  },
];

const METHODOLOGY = [
  { step: '01', titleFr: 'Analyse fonctionnelle', titleEn: 'Functional Analysis', descFr: 'Cartographie exhaustive des fonctions, actifs et risques de chaque entité. Identification des transactions intragroupe.', descEn: 'Exhaustive mapping of functions, assets and risks per entity. Intragroup transaction identification.' },
  { step: '02', titleFr: 'Analyse économique', titleEn: 'Economic Analysis', descFr: 'Sélection de la méthode la plus appropriée (CUP, TNMM, CPM), recherche de comparables, ajustements.', descEn: 'Selection of most appropriate method (CUP, TNMM, CPM), comparable search, adjustments.' },
  { step: '03', titleFr: 'Documentation', titleEn: 'Documentation', descFr: 'Rédaction de la documentation conforme BEPS Action 13 et exigences locales. Master File et Local File.', descEn: 'BEPS Action 13 documentation drafting per local requirements. Master File and Local File.' },
  { step: '04', titleFr: 'Mise en conformité', titleEn: 'Compliance', descFr: 'Ajustements des prix de transfert, formalisation des contrats intragroupe, déploiement de la politique PT.', descEn: 'Transfer pricing adjustments, intragroup contract formalization, PT policy deployment.' },
  { step: '05', titleFr: 'Suivi & défense', titleEn: 'Monitoring & Defense', descFr: 'Revue annuelle, mise à jour de la documentation, préparation proactive aux contrôles fiscaux, veille réglementaire.', descEn: 'Annual review, documentation update, proactive tax audit preparation, regulatory watch.' },
];

const METRICS = [
  { value: 'BEPS', unit: '', labelFr: 'conforme Action 13', labelEn: 'Action 13 compliant' },
  { value: 'OCDE', unit: '', labelFr: 'Principes directeurs PT', labelEn: 'TP Guidelines' },
  { value: 'UEMOA', unit: '', labelFr: '+ zone CEMAC', labelEn: '+ CEMAC zone' },
  { value: 'OHADA', unit: '', labelFr: 'cadre juridique', labelEn: 'legal framework' },
];

const REGULATORY_REFS = [
  { text: 'OCDE — Plan BEPS Action 13 (Documentation prix de transfert)', num: 'BEPS 13 (2015, rév. 2023)' },
  { text: 'OCDE — Principes applicables en matière de prix de transfert', num: 'TPG 2022' },
  { text: 'OCDE — Modèle de Convention Fiscale, Article 9 (Entreprises associées)', num: 'MTC 2017' },
  { text: 'Directive UEMOA n°01/2011/CM/UEMOA — Prix de transfert', num: '01/2011/CM/UEMOA' },
  { text: 'Règlement CEMAC n°01/18-CEMAC-UMAC-DFLC — Prix de transfert', num: '01/18-CEMAC-UMAC' },
  { text: 'OCDE — Country-by-Country Reporting (BEPS Action 13)', num: 'CbCR 2015' },
  { text: 'OCDE — Lignes directrices sur les transactions financières', num: 'TPG Chap. X (2020)' },
  { text: 'OCDE — Approche autorisée pour l\'attribution de bénéfices', num: 'AOA 2010' },
  { text: 'Nations Unies — Manuel pratique des prix de transfert', num: 'UN TPM 2021' },
  { text: 'Forum Mondial OCDE — Transparence et échange de renseignements', num: 'EOIR Standard' },
];

const FAQ_ITEMS = [
  { questionFr: 'Qui est concerné par l\'obligation de documentation prix de transfert ?', answerFr: 'Toute entreprise réalisant des transactions intragroupe transfrontalières est potentiellement concernée. En zone UEMOA, la directive 01/2011 impose une documentation pour les transactions entre entreprises associées. En pratique, toute structure avec des flux transfrontaliers (redevances, prestations, financements, achats/ventes) doit documenter ses prix de transfert.' },
  { questionFr: 'Que se passe-t-il si je ne dispose pas de documentation prix de transfert lors d\'un contrôle fiscal ?', answerFr: 'L\'absence de documentation expose votre entreprise à un ajustement unilatéral des prix par l\'administration fiscale, avec des pénalités pouvant atteindre 40% du redressement. La charge de la preuve peut être renversée : c\'est à vous de prouver que vos prix sont de pleine concurrence, pas à l\'administration de prouver le contraire.' },
  { questionFr: 'Quel est le délai pour préparer une documentation prix de transfert complète ?', answerFr: 'Une documentation complète (Master File + Local File) se prépare en 4 à 8 semaines selon la complexité du groupe. Nous recommandons de l\'initier bien avant la clôture de l\'exercice fiscal. Le diagnostic initial est livré sous 10 jours ouvrés.' },
  { questionFr: 'Quelle est la différence entre un Master File et un Local File ?', answerFr: 'Le Master File présente la politique prix de transfert au niveau du groupe : chaîne de valeur, actifs incorporels, allocation des risques. Le Local File détaille les transactions spécifiques de chaque entité locale et la justification économique du caractère de pleine concurrence. Les deux sont exigés par BEPS Action 13.' },
  { questionFr: 'Intervenez-vous dans toute l\'Afrique francophone ?', answerFr: 'Oui. Nous couvrons les 8 pays UEMOA, les 6 pays CEMAC, et intervenons également dans d\'autres juridictions africaines. Notre expertise couvre les spécificités de chaque administration fiscale locale.' },
];

const CASE_STUDIES = [
  { titleFr: 'Documentation BEPS — Groupe agroalimentaire UEMOA', titleEn: 'BEPS Documentation — UEMOA Agribusiness Group', resultFr: 'Documentation Master File + Local File déployée pour plusieurs filiales dans plusieurs pays. Méthodologie validée par les autorités fiscales.', resultEn: 'Master File + Local File documentation deployed for multiple subsidiaries across several countries. Methodology validated by tax authorities.', link: '/case-studies/prix-transfert-microfinance-groupe-panafricain' },
  { titleFr: 'Défense fiscale — Holding familiale CEMAC', titleEn: 'Tax Defense — CEMAC Family Holding', resultFr: 'Réduction substantielle du redressement fiscal initial après présentation de la documentation conforme et négociation.', resultEn: 'Substantial reduction of initial tax reassessment after compliant documentation and negotiation.', link: '/case-studies/prix-transfert-microfinance-groupe-panafricain' },
];

const GOLD = '#B8860B';
const GOLD_LIGHT = '#D4A537';

export default function PrixTransfertPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const currentLang = isEn ? 'en-US' : 'fr-FR';
  const [showAllRefs, setShowAllRefs] = useState(false);
  const displayedRefs = showAllRefs ? REGULATORY_REFS : REGULATORY_REFS.slice(0, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isEn ? 'Transfer Pricing — BEPS Documentation, Master File, Benchmarking | KHEPRA EXPERTS' : 'Prix de Transfert — Documentation BEPS, Master File, Benchmarking | KHEPRA EXPERTS',
    description: isEn ? 'Premium transfer pricing advisory in Francophone Africa. BEPS Action 13 documentation, Master File, Local File, benchmarking, tax audit defense. Transfer Pricing & Tax Governance Africa™.' : 'Conseil premium en prix de transfert en Afrique francophone. Documentation BEPS Action 13, Master File, benchmarking, défense en contrôle fiscal. Transfer Pricing & Tax Governance Africa™.',
    inLanguage: currentLang,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Transfer Pricing — Transfer Pricing & Tax Governance Africa™' : 'Prix de Transfert — Transfer Pricing & Tax Governance Africa™', item: `${SITE_URL}/prix-de-transfert` },
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
        title={isEn ? 'Transfer Pricing Africa — BEPS Documentation, Master File, Benchmarking | KHEPRA EXPERTS' : 'Prix de Transfert Afrique — Documentation BEPS, Master File, Benchmarking | KHEPRA EXPERTS'}
        description={isEn ? 'Strengthen your group\'s transfer pricing compliance. BEPS Action 13 documentation, benchmarking, tax audit defense. Free 8-min diagnostic.' : 'Renforcer la conformité prix de transfert de votre groupe. Documentation BEPS Action 13, benchmarking, défense fiscale. Diagnostic gratuit 8 min.'}
        keywords="prix de transfert Afrique, prix de transfert UEMOA, documentation BEPS, contrôle fiscal prix de transfert, Master File Afrique, benchmarking prix de transfert, défense fiscale prix de transfert"
        canonicalPath="/prix-de-transfert"
        schemaJson={{ ...schema, ...faqSchema }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(165deg, #0a0805 0%, #12100c 30%, #191610 60%, #0d0b08 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: `radial-gradient(rgba(184,134,11,0.9) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: `radial-gradient(ellipse at 75% 15%, rgba(212,165,55,0.10) 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse at 25% 85%, rgba(212,165,55,0.06) 0%, transparent 50%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full" style={{ background: 'rgba(212,165,55,0.06)', border: '1px solid rgba(212,165,55,0.2)' }}>
                <i className="ri-exchange-funds-line text-sm" style={{ color: GOLD_LIGHT }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: GOLD_LIGHT }}>
                  {isEn ? 'Business Unit 2 — Transfer Pricing & International Tax' : 'Business Unit 2 — Prix de Transfert & Fiscalité Internationale'}
                </span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                {isEn ? 'Strengthen your group\'s transfer pricing compliance framework' : 'Renforcer le cadre de conformité prix de transfert de votre groupe'}
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isEn
                  ? 'Transfer Pricing & Tax Governance Africa™ — Advisory in transfer pricing documentation and compliance for Francophone Africa. BEPS Action 13, documentation, tax audit defense, benchmarking.'
                  : 'Transfer Pricing & Tax Governance Africa™ — Conseil en documentation et conformité prix de transfert en Afrique francophone. BEPS Action 13, documentation, défense fiscale, benchmarking.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                {[
                  { val: 'BEPS', label: isEn ? 'Action 13 compliant' : 'conforme Action 13' },
                  { val: 'UEMOA', label: isEn ? '+ CEMAC zones' : '+ zone CEMAC' },
                  { val: 'OCDE', label: isEn ? 'TP Guidelines' : 'Principes PT' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display font-bold" style={{ color: GOLD_LIGHT, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['OCDE BEPS 13', 'Master File', 'Local File', 'CbCR', 'Benchmarking', 'TNMM', 'Art. 9 MTC'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: '#0a0805' }}>
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
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,165,55,0.25), transparent)' }} />
        </section>

        {/* ═══════════ RISKS ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">
                {isEn ? 'Transfer Pricing Risk Exposure' : 'Exposition au Risque Prix de Transfert'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Inadequate transfer pricing documentation carries significant consequences' : 'Une documentation prix de transfert inadéquate emporte des conséquences significatives'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Transfer pricing is the #1 tax risk for multinational groups. These are the consequences faced by companies with inadequate documentation.' : 'Le prix de transfert est le risque fiscal n°1 des groupes multinationaux. Voici les conséquences auxquelles font face les entreprises insuffisamment documentées.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {RISKS.map((r, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-amber-100 bg-amber-50/30 group hover:bg-amber-50/60 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 bg-amber-100">
                    <i className={`${r.icon} text-lg text-amber-700`} />
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
                <div key={i} className="text-center p-4 rounded-xl border border-amber-100 bg-amber-50/20">
                  <div className="font-display text-2xl font-bold mb-1" style={{ color: GOLD }}>
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
                {isEn ? 'Complete Transfer Pricing Protection' : 'Protection Complète Prix de Transfert'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                {isEn ? 'Seven specialized services covering the entire transfer pricing lifecycle. From diagnostic to tax audit defense.' : 'Sept services spécialisés couvrant l\'ensemble du cycle de vie prix de transfert. Du diagnostic à la défense en contrôle fiscal.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-amber-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-amber-50 border border-amber-200/40">
                    <i className={`${svc.icon} text-lg text-amber-700`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{isEn ? svc.titleEn : svc.titleFr}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{isEn ? svc.descEn : svc.descFr}</p>
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">{isEn ? 'Deliverables' : 'Livrables'}</span>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                          <i className="ri-check-line flex-shrink-0 mt-0.5 text-amber-600" />
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Our Methodology — OECD BEPS Action 13' : 'Notre Méthodologie — OCDE BEPS Action 13'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? '5-Phase Transfer Pricing Process' : 'Processus Prix de Transfert en 5 Phases'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {METHODOLOGY.map((m, i) => (
                <div key={i} className="relative text-center group">
                  {i < METHODOLOGY.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(212,165,55,0.4), rgba(212,165,55,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-amber-50 border-2 border-amber-200/50" style={{ color: GOLD }}>
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
                {isEn ? 'Proven Results in Transfer Pricing' : 'Résultats Prouvés en Prix de Transfert'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CASE_STUDIES.map((cs, i) => (
                <a key={i} href={cs.link} className="rounded-2xl p-6 bg-white border border-neutral-200/70 hover:border-amber-200/60 transition-all hover:-translate-y-1 group cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 border border-amber-200/40 mb-4">
                    <i className="ri-file-chart-line text-amber-600" />
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2">{isEn ? cs.titleEn : cs.titleFr}</h4>
                  <p className="text-sm text-neutral-500 mb-3">{isEn ? cs.resultEn : cs.resultFr}</p>
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:gap-2 transition-all">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Regulatory Framework' : 'Cadre Réglementaire'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Official References — Sourced & Verified' : 'Références Officielles — Sourcées & Vérifiées'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Our transfer pricing work is strictly based on these official international and regional texts.' : 'Nos travaux en prix de transfert sont strictement basés sur ces textes officiels internationaux et régionaux.'}
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
            {REGULATORY_REFS.length > 5 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllRefs(!showAllRefs)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 mx-auto">
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
            <div className="rounded-3xl p-8 md:p-12 border border-amber-200/40" style={{ background: 'linear-gradient(135deg, rgba(212,165,55,0.04), rgba(212,165,55,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Is your group exposed to transfer pricing risk?' : 'Votre groupe est-il exposé au risque prix de transfert ?'}
              </h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                {isEn ? 'Take our 8-minute diagnostic to assess your transfer pricing risk exposure and identify priority actions before the next tax audit.' : 'Faites notre diagnostic de 8 minutes pour évaluer votre exposition au risque prix de transfert et identifier les actions prioritaires avant le prochain contrôle fiscal.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: '#0a0805' }}>
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



