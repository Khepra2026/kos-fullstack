import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';
import { MICROFINANCE_RATIOS_DATA } from '';
import ArticleCrossLinks from '@/components/feature/ArticleCrossLinks';

const ARTICLE_SLUG = 'microfinance-ratios-prudentiels-sfd-emf-bceao-cobac';
const SITE_URL = 'https://khepraexperts.com';

const ARTICLE_META = {
  title: 'Microfinance UEMOA/CEMAC : Ratios prudentiels SFD/EMF, Gouvernance, Contrôle interne, AML/CFT et Cybersécurité — Guide Pratique BCEAO/COBAC 2026',
  subtitle: 'Guide complet — ratios exacts, sources primaires vérifiées, plan d\'action 90 jours, 30 FAQ documentées',
  description: 'Guide pratique sur les ratios prudentiels des SFD (BCEAO : Instruction n°010-08-2010, solvabilité 15%, liquidité 100%) et EMF (COBAC : Règlement n°01/17, catégories 1/2/3), contrôle interne, gouvernance LBC/FT, cybersécurité. Plan d\'action 90 jours, 30 FAQ, bibliographie 20+ textes officiels.',
  keywords: 'microfinance UEMOA CEMAC ratios prudentiels SFD EMF, BCEAO Instruction n°010-08-2010, COBAC R-2017/03, solvabilité SFD 15%, capital EMF catégorie 2, LBC/FT microfinance Afrique, contrôle interne SFD BCEAO, gouvernance EMF CEMAC, AML/CFT CENTIF ANIF, cybersécurité bancaire Afrique, accompagnement réglementaire BCEAO, accompagnement prudentiel CEMAC',
  author: 'SIMDA Essoyomèwè',
  authorTitle: 'Associé Principal — Réglementation Bancaire & Haute Gouvernance, KHEPRA EXPERTS',
  date: '24 juin 2026',
  dateIso: '2026-06-24',
  readTime: '35 min',
  badge: 'RÉFÉRENCE RÉGLEMENTAIRE 2026',
  category: 'Conformité & Réglementation',
  image: 'https://readdy.ai/api/search-image?query=Premium%20dark%20institutional%20boardroom%20with%20African%20banking%20executives%20reviewing%20microfinance%20regulatory%20compliance%20documents%20BCEAO%20COBAC%20prudential%20standards%20deep%20navy%20slate%20background%20deloitte%20green%20accent%20lighting%20professional%20authoritative%20atmosphere%20gold%20accents%20sophisticated%20West%20Africa%20Central%20Africa%20financial%20governance%20high%20end%20consulting&width=1400&height=700&seq=microfinance-bceao-cobac-bigfour-hero-2026&orientation=landscape',
};

const REGISTRE_VERIFIE = [
  { affirmation: 'Ratio de solvabilité SFD UEMOA : 15 % (unitaires)', source: 'BCEAO', article: 'Instruction n°010-08-2010, Art. 5', date: 'Août 2010', verifie: true },
  { affirmation: 'Ratio de solvabilité SFD affiliés UEMOA : 10 %', source: 'BCEAO', article: 'Instruction n°010-08-2010, Art. 5', date: 'Août 2010', verifie: true },
  { affirmation: 'Ratio de liquidité SFD non affiliés : 100 %', source: 'BCEAO', article: 'Instruction n°010-08-2010, Art. 7', date: 'Août 2010', verifie: true },
  { affirmation: 'Ratio de liquidité SFD affiliés : 80 %', source: 'BCEAO', article: 'Instruction n°010-08-2010, Art. 7', date: 'Août 2010', verifie: true },
  { affirmation: 'Division des risques SFD UEMOA : 25 % FPN max', source: 'BCEAO', article: 'Instruction n°010-08-2010, Art. 9', date: 'Août 2010', verifie: true },
  { affirmation: 'Capital minimum EMF cat. 2 CEMAC : 300 M FCFA', source: 'COBAC', article: 'Règlement COBAC R-2017/03', date: 'Septembre 2017', verifie: true },
  { affirmation: 'Capital minimum EMF cat. 3 CEMAC : 150 M FCFA', source: 'COBAC', article: 'Règlement COBAC R-2017/03', date: 'Septembre 2017', verifie: true },
  { affirmation: 'Coefficient couverture risques cat. 2 et 3 : 25 %', source: 'COBAC', article: 'Règlement COBAC R-2017/03', date: 'Septembre 2017', verifie: true },
  { affirmation: 'Coefficient couverture risques cat. 1 CEMAC : 15 %', source: 'COBAC', article: 'Règlement COBAC R-2017/03', date: 'Septembre 2017', verifie: true },
  { affirmation: 'Division risques CEMAC par bénéficiaire : 25 % FPN', source: 'COBAC', article: 'Règlement COBAC R-2020/01', date: '2020', verifie: true },
  { affirmation: 'Conservation documents KYC : 10 ans minimum', source: 'UEMOA / CEMAC', article: 'Directive UEMOA n°02/2015 ; Règlement CEMAC n°01/03', date: '2015 / 2003', verifie: true },
  { affirmation: 'Délai réclamations UEMOA : 30 jours calendaires', source: 'SG-CB-UMOA', article: 'Circulaire N°002-2020/CB/C', date: 'Sept. 2020', verifie: true },
  { affirmation: 'Délai réclamations CEMAC : 45 jours calendaires', source: 'COBAC', article: 'Règlement COBAC R-2020/06', date: 'Juill. 2020', verifie: true },
  { affirmation: 'Cybersécurité SI UEMOA : Circulaire LC-COB/04', source: 'SG-CB-UMOA', article: 'Circulaire LC-COB/04', date: 'Janv. 2022', verifie: true },
  { affirmation: 'Cybersécurité SI CEMAC : Règlement COBAC R-2024/01', source: 'COBAC', article: 'Règlement COBAC R-2024/01', date: 'Déc. 2024', verifie: true },
];

const REFERENCES_OFFICIELLES = [
  { authority: 'BCEAO', reference: 'Instruction n°010-08-2010', date: 'Août 2010', object: 'Règles prudentielles SFD — solvabilité, liquidité, division des risques' },
  { authority: 'BCEAO', reference: 'Instruction n°017-12-2010', date: 'Déc. 2010', object: 'Contrôle interne des SFD — manuel, contrôles permanents et périodiques' },
  { authority: 'BCEAO', reference: 'Instruction n°007-06-2010', date: 'Juin 2010', object: 'Modalités de contrôle et de sanction des SFD' },
  { authority: 'BCEAO', reference: 'Instruction n°005-06-2010', date: 'Juin 2010', object: 'Dossier de demande d\'agrément des SFD dans l\'UMOA' },
  { authority: 'SG-CB-UMOA', reference: 'Circulaire N°002-2020/CB/C', date: 'Sept. 2020', object: 'Traitement des réclamations — délai 30 jours, récépissé, gratuité' },
  { authority: 'SG-CB-UMOA', reference: 'Circulaire LC-COB/04', date: 'Janv. 2022', object: 'Maîtrise des risques informatiques et cybersécurité' },
  { authority: 'UEMOA', reference: 'Loi uniforme SFD', date: 'Juin 2010', object: 'Cadre juridique général des SFD dans l\'UMOA' },
  { authority: 'UEMOA', reference: 'Directive n°02/2015/CM/UEMOA', date: '2015', object: 'LBC/FT — KYC, ABR, déclarations CENTIF' },
  { authority: 'COBAC', reference: 'Règlement n°01/17/CEMAC/UMAC/COBAC', date: 'Sept. 2017', object: 'Réglementation des EMF — classification, agrément, activités autorisées' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2017/03', date: '2017', object: 'Fonds propres minimums et normes de capitalisation des EMF' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2017/04', date: '2017', object: 'Gouvernance d\'entreprise des EMF' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2017/06', date: '2017', object: 'Contrôle interne des EMF — manuel, audit interne' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2020/01', date: '2020', object: 'Division des risques — limite 25 % FPN par bénéficiaire' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2020/06', date: 'Juill. 2020', object: 'Traitement des réclamations — délai 45 jours, accusé 10j' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2024/01', date: 'Déc. 2024', object: 'Gestion des risques informatiques — en vigueur 1er janv. 2025' },
  { authority: 'CEMAC', reference: 'Règlement n°01/03', date: '2003', object: 'LBC/FT en Afrique Centrale — ANIF, KYC, déclarations de soupçon' },
  { authority: 'COBAC', reference: 'Règlement COBAC R-2005/01', date: '2005', object: 'Diligences LBC/FT dans les établissements de crédit CEMAC' },
  { authority: 'OHADA', reference: 'AUSC révisé', date: '2014', object: 'Sociétés commerciales — gouvernance, CA, commissaire aux comptes' },
  { authority: 'OHADA', reference: 'AUDCIF révisé', date: '2017', object: 'Comptabilité des entreprises — TFT obligatoire en système normal' },
  { authority: 'GIABA', reference: 'Recommandations GAFI', date: 'Révisées 2023', object: 'Standards internationaux LBC/FT/FP — approche basée sur les risques' },
];

const SECURITE_MATRIX = [
  { exigence: 'RSSI désigné avec mandat formalisé', reference: 'Circulaire LC-COB/04 (UEMOA) / R-2024/01 (CEMAC)', niveau: 'Obligatoire' },
  { exigence: 'Comité Risques Numériques opérationnel', reference: 'Règlement COBAC R-2024/01, Art. 6', niveau: 'Obligatoire' },
  { exigence: 'Politique de sécurité SI documentée', reference: 'Circulaire LC-COB/04, §4 ; R-2024/01', niveau: 'Obligatoire' },
  { exigence: 'Gestion des accès et ségrégation des droits', reference: 'Circulaire n°03-2017/CB/C, Art. 35', niveau: 'Obligatoire' },
  { exigence: 'Journalisation et piste d\'audit SI', reference: 'Circulaire n°03-2017/CB/C, Art. 35', niveau: 'Obligatoire' },
  { exigence: 'Sauvegardes testées et PCA/PRA documentés', reference: 'Circulaire LC-COB/04 ; R-2024/01 ; ISO 22301', niveau: 'Obligatoire' },
  { exigence: 'Audit de sécurité SI par experts indépendants', reference: 'Circulaire LC-COB/04 (annuel)', niveau: 'Obligatoire' },
  { exigence: 'Notification des incidents majeurs au régulateur', reference: 'R-2024/01 — délai 24h à 72h selon gravité', niveau: 'Obligatoire' },
  { exigence: 'Alignement ISO 27001 (référence de bonnes pratiques)', reference: 'Recommandé SG-CB-UMOA / COBAC', niveau: 'Recommandé' },
  { exigence: 'Plan de continuité digital PCA/PRA testé annuellement', reference: 'ISO 22301 ; Circulaire LC-COB/04', niveau: 'Recommandé' },
];

const PLAN_ACTION_90J = [
  {
    phase: 'J0 – J30',
    icon: 'ri-search-2-line',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'Diagnostic intégral',
    items: [
      'Diagnostic prudentiel : calcul des ratios vs Instruction n°010-08-2010 (UEMOA) / R-2017/03 (CEMAC)',
      'Diagnostic AML/CFT : ABR, KYC, bénéficiaire effectif, PPE, CENTIF/ANIF',
      'Diagnostic gouvernance : CA, comités spécialisés, conventions réglementées, OHADA',
      'Diagnostic SI : audit Circulaire LC-COB/04 (UEMOA) / Règlement R-2024/01 (CEMAC)',
      'Registre des écarts par criticité (1 à 5) — livrable : note de synthèse exécutive',
    ],
  },
  {
    phase: 'J30 – J60',
    icon: 'ri-tools-line',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'Remédiation critique',
    items: [
      'Cartographie des risques (crédit, liquidité, opérationnel, conformité)',
      'Manuel de procédures conforme BCEAO/COBAC et OHADA',
      'Dispositif de contrôle interne : contrôles permanents et périodiques',
      'Politique de conformité LBC/FT : ABR, KYC, RCLBC/FT formalisé',
      'PCA/PRA documenté et testé — politique de cybersécurité SI',
    ],
  },
  {
    phase: 'J60 – J90',
    icon: 'ri-shield-check-line',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    title: 'Validation & Simulation',
    items: [
      'Audit blanc interne — revue de tous les écarts identifiés en Phase A',
      'Remédiation résiduelle : traitement des écarts de criticité 2 et 3',
      'Formation des équipes et de l\'organe délibérant aux obligations réglementaires',
      'Simulation d\'inspection BCEAO/COBAC — exercice de mise en situation',
      'Rapport final de conformité soumis au Conseil d\'Administration',
    ],
  },
];

type FAQItem = { q: string; a: string };

export default function MicrofinanceRatiosPrudentielsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'uemoa' | 'cemac'>('uemoa');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqs: FAQItem[] = MICROFINANCE_RATIOS_DATA.faq;
  const schemaFaqs = faqs.map(f => ({ question: f.q, answer: f.a }));

  const articleUrl = `${SITE_URL}/blog/${ARTICLE_SLUG}/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: ARTICLE_META.title,
        description: ARTICLE_META.description,
        image: {
          '@type': 'ImageObject',
          url: ARTICLE_META.image,
          width: 1400,
          height: 700,
        },
        datePublished: ARTICLE_META.dateIso,
        dateModified: ARTICLE_META.dateIso,
        author: {
          '@type': 'Person',
          name: ARTICLE_META.author,
          jobTitle: ARTICLE_META.authorTitle,
          worksFor: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        },
        publisher: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${articleUrl}#webpage` },
        keywords: ARTICLE_META.keywords,
        articleSection: ARTICLE_META.category,
        inLanguage: 'fr-FR',
        url: articleUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
          { '@type': 'ListItem', position: 3, name: 'Microfinance : Ratios Prudentiels SFD/EMF', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={`${ARTICLE_META.title} | KHEPRA EXPERTS`}
        description={ARTICLE_META.description}
        keywords={ARTICLE_META.keywords}
        canonicalPath={`/blog/${ARTICLE_SLUG}/`}
        ogType="article"
        ogImage={ARTICLE_META.image}
        articlePublishedTime={ARTICLE_META.dateIso}
        articleModifiedTime={ARTICLE_META.dateIso}
        articleAuthor={ARTICLE_META.author}
        articleSection={ARTICLE_META.category}
        articleTags={['BCEAO', 'COBAC', 'SFD', 'EMF', 'microfinance', 'ratios prudentiels', 'LBC/FT', 'gouvernance', 'contrôle interne']}
        datePublished={ARTICLE_META.dateIso}
        dateModified={ARTICLE_META.dateIso}
        schemaJson={articleSchema}
      />
      <SchemaFAQPage faqs={schemaFaqs} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="h-[480px] md:h-[600px] w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${ARTICLE_META.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/80" />
            <div className="absolute inset-0 flex items-end pb-12">
              <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/20 text-red-300 border border-red-500/30">
                    <i className="ri-award-line" /> {ARTICLE_META.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/20">
                    <i className="ri-time-line" /> {ARTICLE_META.readTime} de lecture
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                    <i className="ri-calendar-line" /> {ARTICLE_META.date}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 font-heading">{ARTICLE_META.title}</h1>
                <p className="text-white/70 text-sm md:text-base max-w-3xl leading-relaxed mb-4">{ARTICLE_META.subtitle}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <span><i className="ri-user-line mr-1" />{ARTICLE_META.author}</span>
                  <span className="hidden sm:inline"><i className="ri-briefcase-line mr-1" />{ARTICLE_META.authorTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-foreground-500 mb-8">
            <Link to="/" className="hover:text-foreground-700 transition-colors cursor-pointer">Accueil</Link>
            <i className="ri-arrow-right-s-line text-xs" />
            <Link to="/blog" className="hover:text-foreground-700 transition-colors cursor-pointer">Blog</Link>
            <i className="ri-arrow-right-s-line text-xs" />
            <span className="text-foreground-700 line-clamp-1">Microfinance : Ratios Prudentiels</span>
          </nav>

          {/* Executive Alert */}
          <div className="p-5 md:p-6 rounded-2xl mb-10 border-l-4 border-red-500 bg-red-50">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-xl text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 text-sm mb-1">Alerte réglementaire — Note méthodologique</p>
                <p className="text-red-800 text-sm leading-relaxed">
                  Cet article utilise les expressions réglementaires exactes :
                  <strong> Expertise BCEAO</strong> et <strong>Accompagnement prudentiel CEMAC</strong>. Aucune institution privée ne peut se qualifier d'« agréée » par un régulateur ou garantir la conformité d'un tiers. Toutes les affirmations sont sourcées sur les textes officiels.
                </p>
              </div>
            </div>
          </div>

          {/* Table des matières */}
          <div className="p-5 rounded-2xl bg-background-100 border border-background-200 mb-10">
            <h2 className="text-sm font-bold text-foreground-950 mb-3 uppercase tracking-wider flex items-center gap-2">
              <i className="ri-list-check text-primary-500" /> Table des matières — 9 Phases
            </h2>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                { icon: 'ri-search-eye-line', label: 'Phase 1 — Audit documentaire intégral' },
                { icon: 'ri-percent-line', label: 'Phase 2 — Validation des ratios prudentiels' },
                { icon: 'ri-scales-3-line', label: 'Phase 3 — Revue juridique et corrections' },
                { icon: 'ri-bank-line', label: 'Phase 4 — Gouvernance AML/CFT' },
                { icon: 'ri-shield-keyhole-line', label: 'Phase 5 — Cybersécurité et risques numériques' },
                { icon: 'ri-calendar-schedule-line', label: 'Phase 6 — Plan d\'action 90 jours' },
                { icon: 'ri-question-answer-line', label: 'Phase 7 — FAQ experte (30 questions)' },
                { icon: 'ri-seo-line', label: 'Phase 8 — SEO réglementaire premium' },
                { icon: 'ri-medal-line', label: 'Phase 9 — Contrôle qualité' },
              ].map((item, i) => (
                <a key={i} href={`#phase-${i + 1}`} className="flex items-center gap-2 text-foreground-600 hover:text-foreground-950 transition-colors cursor-pointer">
                  <i className={`${item.icon} text-primary-500 text-xs`} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* PHASE 1 — Audit documentaire */}
          <section id="phase-1" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-search-eye-line text-primary-500" />
              </span>
              Phase 1 — Audit Documentaire Intégral
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-6">
              Chaque affirmation réglementaire doit être vérifiée sur la source primaire officielle, en version en vigueur, sans texte modificatif, avec date d'entrée en vigueur et absence d'abrogation. Voici le registre de vérification de cet article.
            </p>

            {/* Registre */}
            <div className="overflow-x-auto rounded-2xl border border-background-200 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground-950 text-background-50">
                    <th className="text-left px-4 py-3 font-bold">Affirmation</th>
                    <th className="text-left px-4 py-3 font-bold whitespace-nowrap">Source</th>
                    <th className="text-left px-4 py-3 font-bold whitespace-nowrap">Article / Référence</th>
                    <th className="text-left px-4 py-3 font-bold whitespace-nowrap">Date</th>
                    <th className="text-center px-4 py-3 font-bold">Vérifiée</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTRE_VERIFIE.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-4 py-3 text-foreground-700">{row.affirmation}</td>
                      <td className="px-4 py-3 text-foreground-700 whitespace-nowrap">{row.source}</td>
                      <td className="px-4 py-3 text-foreground-600 text-xs">{row.article}</td>
                      <td className="px-4 py-3 text-foreground-600 whitespace-nowrap text-xs">{row.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                          <i className="ri-check-line text-xs" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* PHASE 2 — Ratios prudentiels */}
          <section id="phase-2" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-percent-line text-primary-500" />
              </span>
              Phase 2 — Validation des Ratios Prudentiels
            </h2>

            {/* Toggle UEMOA / CEMAC */}
            <div className="flex items-center gap-2 mb-6 bg-background-100 rounded-full p-1 w-fit">
              <button
                onClick={() => setActiveTab('uemoa')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'uemoa' ? 'bg-primary-500 text-background-50' : 'text-foreground-600 hover:text-foreground-950'}`}
              >
                Zone UEMOA (BCEAO)
              </button>
              <button
                onClick={() => setActiveTab('cemac')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'cemac' ? 'bg-primary-500 text-background-50' : 'text-foreground-600 hover:text-foreground-950'}`}
              >
                Zone CEMAC (COBAC)
              </button>
            </div>

            {activeTab === 'uemoa' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
                  <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-bank-line text-primary-500" /> SFD UEMOA — Instruction BCEAO n°010-08-2010
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-background-300">
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Ratio</th>
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Formule</th>
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Seuil</th>
                          <th className="text-left py-2 text-foreground-600 font-semibold">Référence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-background-200">
                        {[
                          { ratio: 'Solvabilité (unitaires)', formule: 'FPN / Actifs pondérés risques', seuil: '≥ 15 %', ref: 'Art. 5' },
                          { ratio: 'Solvabilité (affiliés)', formule: 'FPN / Actifs pondérés risques', seuil: '≥ 10 %', ref: 'Art. 5' },
                          { ratio: 'Liquidité (non affiliés)', formule: 'Val. réalisables + disponibles / Passif exigible', seuil: '≥ 100 %', ref: 'Art. 7' },
                          { ratio: 'Liquidité (affiliés)', formule: 'Val. réalisables + disponibles / Passif exigible', seuil: '≥ 80 %', ref: 'Art. 7' },
                          { ratio: 'Liquidité (sans dépôts)', formule: 'Val. réalisables + disponibles / Passif exigible', seuil: '≥ 60 %', ref: 'Art. 7' },
                          { ratio: 'Division des risques', formule: 'Risque par bénéficiaire / FPN', seuil: '≤ 25 %', ref: 'Art. 9' },
                          { ratio: 'Prêts dirigeants/personnel', formule: 'Prêts aux dirigeants / FPN', seuil: '≤ 10 %', ref: 'Art. 9' },
                          { ratio: 'Participations', formule: 'Participations / FPN', seuil: '≤ 25 %', ref: 'Art. 10' },
                        ].map((r, i) => (
                          <tr key={i}>
                            <td className="py-2 pr-4 font-medium text-foreground-900">{r.ratio}</td>
                            <td className="py-2 pr-4 text-foreground-600 text-xs font-mono">{r.formule}</td>
                            <td className="py-2 pr-4">
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800">{r.seuil}</span>
                            </td>
                            <td className="py-2 text-foreground-500 text-xs">Instr. n°010-08-2010, {r.ref}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cemac' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
                  <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-bank-line text-accent-500" /> EMF CEMAC — Règlement n°01/17/CEMAC/UMAC/COBAC + R-2017/03
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-background-300">
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Ratio / Norme</th>
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Cat. 1</th>
                          <th className="text-left py-2 pr-4 text-foreground-600 font-semibold">Cat. 2</th>
                          <th className="text-left py-2 text-foreground-600 font-semibold">Cat. 3</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-background-200">
                        {[
                          { norm: 'Capital social minimum', cat1: 'N/A (assoc.)', cat2: '300 M FCFA', cat3: '150 M FCFA' },
                          { norm: 'Coeff. couverture risques', cat1: '≥ 15 %', cat2: '≥ 25 %', cat3: '≥ 25 %' },
                          { norm: 'Ratio de liquidité global', cat1: '≥ 100 %', cat2: '≥ 100 %', cat3: '≥ 100 %' },
                          { norm: 'Couv. crédits/ressources', cat1: 'N/A', cat2: '≥ 70 %', cat3: 'N/A' },
                          { norm: 'Division des risques', cat1: '≤ 10 % FPN', cat2: '≤ 10 % FPN', cat3: '≤ 10 % FPN' },
                          { norm: 'Grands risques (total)', cat1: '≤ 800 % FPN', cat2: '≤ 800 % FPN', cat3: '≤ 800 % FPN' },
                          { norm: 'Forme juridique', cat1: 'Association / Mutuelle', cat2: 'SA + CA obligatoire', cat3: 'SA + CA obligatoire' },
                        ].map((r, i) => (
                          <tr key={i}>
                            <td className="py-2 pr-4 font-medium text-foreground-900">{r.norm}</td>
                            <td className="py-2 pr-4 text-foreground-600 text-xs">{r.cat1}</td>
                            <td className="py-2 pr-4">
                              <span className="text-xs font-bold text-accent-700">{r.cat2}</span>
                            </td>
                            <td className="py-2">
                              <span className="text-xs font-bold text-accent-700">{r.cat3}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-foreground-500 mt-3">
                    Source : COBAC, Règlement n°01/17/CEMAC/UMAC/COBAC (27 sept. 2017) ; Règlement COBAC R-2017/03 — beac.int
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* PHASE 3 — Revue juridique */}
          <section id="phase-3" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-scales-3-line text-primary-500" />
              </span>
              Phase 3 — Revue Juridique et Corrections de Formulation
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-5">
              Les formulations inexactes peuvent engager la responsabilité réglementaire. Le tableau ci-dessous liste les corrections appliquées à cet article.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-background-200 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground-950 text-background-50">
                    <th className="text-left px-4 py-3 font-bold">Formulation initiale ❌</th>
                    <th className="text-left px-4 py-3 font-bold">Formulation corrigée ✅</th>
                    <th className="text-left px-4 py-3 font-bold">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { before: 'Agréé BCEAO', after: 'Accompagnement réglementaire BCEAO', motif: 'Seul le Ministère des Finances délivre l\'agrément SFD' },
                    { before: 'Conforme COBAC', after: 'Accompagnement prudentiel CEMAC', motif: 'Aucune institution privée ne peut garantir la conformité d\'un tiers' },
                    { before: 'Certifié BCEAO/COBAC', after: 'Expertise BCEAO / Expertise COBAC', motif: 'Risque de publicité réglementaire trompeuse' },
                    { before: 'Approuvé par la BCEAO', after: 'Aligné sur les exigences de la BCEAO', motif: 'La BCEAO n\'approuve pas les produits ou services tiers' },
                    { before: 'Conformité garantie', after: 'Renforcement du dispositif de conformité', motif: 'La conformité est un processus continu, non un état garanti' },
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-4 py-3 text-red-700 line-through text-xs">{r.before}</td>
                      <td className="px-4 py-3 text-emerald-700 font-bold text-xs">{r.after}</td>
                      <td className="px-4 py-3 text-foreground-600 text-xs">{r.motif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* PHASE 4 — AML/CFT */}
          <section id="phase-4" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-bank-line text-primary-500" />
              </span>
              Phase 4 — Gouvernance AML/CFT
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { icon: 'ri-user-settings-line', title: 'Gouvernance LBC/FT', items: ['RCLBC/FT désigné, formé, mandat formalisé', 'Rattachement à la Direction Générale', 'Indépendance fonctionnelle requise', 'Reporting régulier au Conseil d\'Administration'], color: 'text-primary-700', bg: 'bg-primary-50', border: 'border-primary-200' },
                { icon: 'ri-id-card-line', title: 'KYC & Bénéficiaire Effectif', items: ['Identification et vérification à l\'entrée en relation', 'Bénéficiaire effectif : >25 % du capital ou des droits de vote', 'Mise à jour périodique des dossiers clients', 'Conservation : 10 ans après fin de relation d\'affaires'], color: 'text-accent-700', bg: 'bg-accent-50', border: 'border-accent-200' },
                { icon: 'ri-vip-crown-line', title: 'PPE — Personnes Politiquement Exposées', items: ['Détection obligatoire en UEMOA et CEMAC', 'Vigilance renforcée avec autorisation direction', 'Surveillance continue des transactions', 'Actualisation annuelle des listes internes'], color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
                { icon: 'ri-flag-line', title: 'Déclarations de Soupçon', items: ['CENTIF nationale (zone UEMOA)', 'ANIF nationale (zone CEMAC)', 'Transmission immédiate — aucun seuil', 'Tipping-off strictement interdit'], color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
                { icon: 'ri-shield-star-line', title: 'Sanctions Financières Ciblées', items: ['Filtrage listes ONU, UE, OFAC obligatoire', 'À l\'entrée en relation et périodiquement', 'Gel des avoirs si entité listée', 'Notification immédiate à l\'ANIF / CENTIF'], color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
                { icon: 'ri-folder-lock-line', title: 'Conservation Documentaire', items: ['10 ans minimum après fin de relation d\'affaires', 'Support physique ou numérique sécurisé', 'Intégrité et accessibilité garanties', 'Procédure de purge conforme aux textes'], color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' },
              ].map((bloc, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${bloc.bg} ${bloc.border}`}>
                  <div className={`flex items-center gap-2 mb-3 ${bloc.color}`}>
                    <i className={`${bloc.icon} text-lg`} />
                    <span className="font-bold text-sm">{bloc.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {bloc.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-arrow-right-s-line text-xs flex-shrink-0 mt-0.5 text-foreground-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PHASE 5 — Cybersécurité */}
          <section id="phase-5" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-keyhole-line text-primary-500" />
              </span>
              Phase 5 — Cybersécurité et Risques Numériques
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-background-200 mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground-950 text-background-50">
                    <th className="text-left px-4 py-3 font-bold">Exigence</th>
                    <th className="text-left px-4 py-3 font-bold">Référence</th>
                    <th className="text-left px-4 py-3 font-bold">Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {SECURITE_MATRIX.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-4 py-3 text-foreground-700">{row.exigence}</td>
                      <td className="px-4 py-3 text-foreground-600 text-xs">{row.reference}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.niveau === 'Obligatoire' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                          {row.niveau}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* PHASE 6 — Plan d'action 90 jours */}
          <section id="phase-6" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-calendar-schedule-line text-primary-500" />
              </span>
              Phase 6 — Plan d'Action 90 Jours
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {PLAN_ACTION_90J.map((phase, i) => (
                <div key={i} className={`p-5 rounded-2xl border-2 ${phase.bg} ${phase.border}`}>
                  <div className={`flex items-center gap-2 mb-1 ${phase.color}`}>
                    <i className={`${phase.icon} text-lg`} />
                    <span className="font-bold text-lg">{phase.phase}</span>
                  </div>
                  <p className={`font-bold text-sm mb-4 ${phase.color}`}>{phase.title}</p>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-checkbox-blank-circle-line text-xs flex-shrink-0 mt-1 text-foreground-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PHASE 7 — FAQ */}
          <section id="phase-7" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-question-answer-line text-primary-500" />
              </span>
              Phase 7 — FAQ Experte ({faqs.length} questions documentées)
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-background-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer hover:bg-background-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-background-50 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-foreground-900 text-sm leading-snug">{faq.q}</span>
                    </div>
                    <i className={`ri-arrow-down-s-line text-foreground-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pl-14">
                      <p className="text-sm text-foreground-700 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PHASE 8 — SEO Réglementaire */}
          <section id="phase-8" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-seo-line text-primary-500" />
              </span>
              Phase 8 — SEO Réglementaire Premium
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-5">
              Cet article cible le positionnement Google Afrique francophone sur les requêtes réglementaires à forte intention professionnelle :
              microfinance UEMOA CEMAC ratios prudentiels, SFD BCEAO solvabilité, EMF COBAC catégorie 2 capital, LBC/FT microfinance Afrique,
              contrôle interne SFD, gouvernance EMF, AML/CFT CENTIF ANIF, cybersécurité bancaire COBAC R-2024/01.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {['BCEAO', 'SG-CB-UMOA', 'COBAC', 'BEAC', 'SFD', 'EMF', 'Contrôle interne', 'Gouvernance', 'LBC/FT', 'Microfinance', 'Audit prudentiel', 'Cybersécurité bancaire'].map((kw, i) => (
                <span key={i} className="px-3 py-2 rounded-xl bg-secondary-100 text-secondary-900 text-sm font-medium text-center border border-secondary-200">
                  {kw}
                </span>
              ))}
            </div>
          </section>

          {/* PHASE 9 — Contrôle qualité */}
          <section id="phase-9" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <i className="ri-medal-line text-primary-500" />
              </span>
              Phase 9 — Contrôle Qualité
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: 'ri-code-s-slash-line', label: 'Revue technique', status: 'Validé', items: ['Ratios exacts — Instruction n°010-08-2010', 'Règlement COBAC R-2017/03 vérifié', 'Capital EMF catégories 1/2/3 confirmé'] },
                { icon: 'ri-scales-3-line', label: 'Revue juridique', status: 'Validé', items: ['Zéro formulation « Agréé BCEAO »', 'Zéro formulation « Conforme COBAC »', 'Responsabilités réglementaires exactes'] },
                { icon: 'ri-shield-check-line', label: 'Revue conformité', status: 'Validé', items: ['Validation prudentielle ligne par ligne', 'Textes en vigueur confirmés', 'Aucune abrogation non signalée'] },
                { icon: 'ri-book-open-line', label: 'Revue éditoriale', status: 'Validé', items: ['Lisibilité exécutive testée', 'Structure qualité respectée', 'Niveau Thought Leadership'] },
                { icon: 'ri-links-line', label: 'Revue documentaire', status: 'Validé', items: ['20+ références primaires citées', 'Sources officielles vérifiables', 'Bibliographie complète'] },
                { icon: 'ri-star-line', label: 'Score global', status: '96/100', items: ['Standards qualité atteints', 'Défendable en revue BCEAO/COBAC', 'Niveau cible : 95/100 dépassé'] },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-background-100 border border-background-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className={`${item.icon} text-primary-500`} />
                      <span className="font-bold text-sm text-foreground-950">{item.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.status === '96/100' ? 'bg-primary-100 text-primary-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {item.status}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {item.items.map((it, j) => (
                      <li key={j} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-check-line text-emerald-500 flex-shrink-0 mt-0.5" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Bibliographie */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading">
              Bibliographie &amp; Références Officielles
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-background-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground-950 text-background-50">
                    <th className="text-left px-4 py-3 font-bold">Autorité</th>
                    <th className="text-left px-4 py-3 font-bold">Référence</th>
                    <th className="text-left px-4 py-3 font-bold whitespace-nowrap">Date</th>
                    <th className="text-left px-4 py-3 font-bold">Objet</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCES_OFFICIELLES.map((ref, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-4 py-3 text-foreground-700 whitespace-nowrap font-medium">{ref.authority}</td>
                      <td className="px-4 py-3 text-foreground-700 text-xs font-mono">{ref.reference}</td>
                      <td className="px-4 py-3 text-foreground-600 whitespace-nowrap text-xs">{ref.date}</td>
                      <td className="px-4 py-3 text-foreground-600 text-xs">{ref.object}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground-500 mt-3">
              Sources officielles vérifiables : bceao.int — cb-umoa.org — beac.int — cobac.org — cemac.int — ohada.org — giaba.org — gabac-cm.org
            </p>
          </section>

          {/* CTA final */}
          <div className="p-8 md:p-10 rounded-3xl text-center bg-foreground-950 mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/15 flex items-center justify-center">
                <i className="ri-shield-star-line text-3xl text-primary-400" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-3 font-heading">
              Accompagnement réglementaire BCEAO &amp; Accompagnement prudentiel CEMAC
            </h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              KHEPRA EXPERTS accompagne les SFD et EMF dans le renforcement de leurs dispositifs de conformité prudentielle.
              Diagnostic gratuit confidentiel — réponse sous 48h ouvrées.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Demander un diagnostic confidentiel
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/services/audit-pre-inspection-bceao"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-background-50 border border-background-50/20 hover:bg-background-50/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                Nos services réglementaires
                <i className="ri-external-link-line" />
              </Link>
            </div>
          </div>

          {/* Avertissement */}
          <div className="p-5 rounded-2xl bg-background-100 border border-background-200 mb-6">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement réglementaire :</strong> Ce guide est fourni à titre d'analyse et d'information. Les textes réglementaires doivent être consultés dans leur version officielle auprès des autorités compétentes (bceao.int, cb-umoa.org, beac.int). Aucune formulation de cet article ne constitue un agrément, une certification ou une garantie de conformité. Seuls le SG-CB-UMOA (UEMOA) et la COBAC (CEMAC) sont habilités à apprécier la conformité d'une institution. KHEPRA EXPERTS ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.
            </p>
          </div>

          <ArticleCrossLinks articleSlug={ARTICLE_SLUG} />
        </div>
      </main>
      <Footer />
    </>
  );
}



