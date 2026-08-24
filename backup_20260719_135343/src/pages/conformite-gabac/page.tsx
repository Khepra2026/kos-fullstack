import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CEMAC_COUNTRIES = [
  { name: 'Cameroun', flag: '🇨🇲', anif: 'ANIF', statut: 'Membre actif GABAC' },
  { name: 'Gabon', flag: '🇬🇦', anif: 'ANIF', statut: 'Expérience directe KHEPRA' },
  { name: 'Congo', flag: '🇨🇬', anif: 'ANIF', statut: 'Membre actif GABAC' },
  { name: 'Tchad', flag: '🇹🇩', anif: 'ANIF', statut: 'Membre actif GABAC' },
  { name: 'Rép. Centrafricaine', flag: '🇨🇫', anif: 'ANIF', statut: 'Membre actif GABAC' },
  { name: 'Guinée Équatoriale', flag: '🇬🇶', anif: 'ANIF', statut: 'Membre actif GABAC' },
];

const OBLIGATIONS = [
  {
    icon: 'ri-user-search-line',
    title: 'Due Diligence & KYC Renforcé',
    desc: 'Identification et vérification approfondie des clients, bénéficiaires effectifs, PPE (Personnes Politiquement Exposées) — conforme au Règlement CEMAC n°01/16 et aux 40 Recommandations du GAFI.',
    points: ['KYC obligatoire dès l\'entrée en relation', 'Identification du bénéficiaire effectif (UBO)', 'Due diligence renforcée PPE & pays à haut risque', 'Revue périodique de la base clients (≥ annuelle)'],
    ref: 'Règlement CEMAC n°01/16, Rec. GAFI 10-12, 22-23',
  },
  {
    icon: 'ri-alert-line',
    title: 'Déclaration de Soupçon & Gel des Avoirs',
    desc: 'Obligation de déclaration immédiate à l\'ANIF nationale de toute opération suspecte sans en avertir le client (no tipping-off). Gel des avoirs des personnes et entités désignées par les résolutions ONU/CEMAC.',
    points: ['Déclaration de soupçon à l\'ANIF sans délai', 'Confidentialité absolue (no tipping-off)', 'Gel des avoirs sanctions ONU/CEMAC', 'Procédure de levée de gel documentée'],
    ref: 'Règlement CEMAC n°01/16 art. 72-93, Résolutions CS-ONU',
  },
  {
    icon: 'ri-file-search-line',
    title: 'Cartographie Nationale des Risques LBC/FT',
    desc: 'Évaluation de l\'exposition aux risques LBC/FT par pays, produit, canal de distribution et typologie de clientèle — exigée par le GABAC pour chaque établissement.',
    points: ['Matrice risques par produit/service', 'Classification clients (bas/moyen/élevé)', 'Risques pays & juridictions non-coopératives', 'Mise à jour annuelle et après incident'],
    ref: 'GAFI Rec. 1, GABAC – Évaluation Mutuelle',
  },
  {
    icon: 'ri-graduation-cap-line',
    title: 'Formation & Sensibilisation Obligatoire',
    desc: 'Programme de formation LBC/FT pour le Conseil d\'Administration, le management et l\'ensemble du personnel — obligation réglementaire GABAC évaluée en contrôle sur place.',
    points: ['Formation initiale à l\'embauche', 'Formation continue annuelle certifiée', 'Sensibilisation CA et Dirigeants', 'Tests de connaissances & attestations'],
    ref: 'Règlement CEMAC n°01/16 art. 105, GAFI Rec. 34',
  },
  {
    icon: 'ri-computer-line',
    title: 'Dispositif Automatisé de Détection',
    desc: 'Système de monitoring des transactions en temps réel, filtrage des listes de sanctions UN/EU/OFAC, règles de scoring paramétrables et alertes automatiques.',
    points: ['Filtrage sanctions automatique (SWIFT KYC Registry)', 'Scoring comportemental des transactions', 'Paramétrage seuils par typologie', 'Piste d\'audit inaltérable'],
    ref: 'Règlement CEMAC n°01/16 art. 94-104, Rec. GAFI 20',
  },
  {
    icon: 'ri-government-line',
    title: 'Gouvernance LBC/FT & Responsable Conformité',
    desc: 'Nomination d\'un responsable LBC/FT rattaché à la Direction Générale, comité LBC/FT trimestriel, rapport annuel au Conseil — exigences structurantes du GABAC.',
    points: ['Désignation Responsable LBC/FT (niveau DG)', 'Comité LBC/FT trimestriel', 'Rapport annuel LBC/FT au CA', 'Audit externe bisannuel du dispositif'],
    ref: 'Règlement CEMAC n°01/16, Rec. GAFI 18, 21',
  },
];

const METHODOLOGY = [
  { step: '01', icon: 'ri-search-eye-line', title: 'Diagnostic GAP LBC/FT', desc: 'Audit exhaustif de votre dispositif LBC/FT par rapport au Règlement CEMAC n°01/16, aux 40 Recommandations du GAFI et aux standards GABAC. Identification précise des écarts et évaluation de la criticité.', duration: '2-3 semaines' },
  { step: '02', icon: 'ri-file-list-3-line', title: 'Plan de Remédiation Priorisé', desc: 'Feuille de route détaillée avec actions correctives classées par criticité (haute/moyenne/basse), calendrier contraignant, responsables désignés et indicateurs de conformité mesurables.', duration: '1-2 semaines' },
  { step: '03', icon: 'ri-tools-line', title: 'Mise en Œuvre Opérationnelle', desc: 'Accompagnement terrain : rédaction des procédures LBC/FT, paramétrage des systèmes de détection, formation certifiée des équipes, simulations d\'inspection GABAC.', duration: '2-4 mois' },
  { step: '04', icon: 'ri-shield-check-line', title: 'Audit de Certification & Suivi', desc: 'Audit externe indépendant du dispositif LBC/FT, rapport de certification, préparation à l\'évaluation mutuelle GABAC, veille réglementaire continue (sanctions ONU, listes GAFI).', duration: 'Continu' },
];

const REFERENTIELS = [
  { label: 'Règlement CEMAC n°01/16', desc: 'Lutte contre le blanchiment des capitaux et le financement du terrorisme en Afrique Centrale — texte fondateur harmonisé pour les 6 États CEMAC.' },
  { label: '40 Recommandations GAFI', desc: 'Standards internationaux du Groupe d\'Action Financière — base de toute évaluation mutuelle GABAC.' },
  { label: 'GABAC — Évaluations Mutuelles', desc: 'Évaluations périodiques de la conformité technique et de l\'efficacité des dispositifs LBC/FT des États membres.' },
  { label: 'Résolutions ONU (1267, 1373, 1988)', desc: 'Sanctions ciblées, gel des avoirs, interdiction de voyager contre les entités désignées par le Conseil de Sécurité.' },
  { label: 'Directives ANIF Nationales', desc: 'Guides pratiques, formulaires de DS, seuils de déclaration et listes nationales de sanctions par pays CEMAC.' },
  { label: 'COBAC R-2016/04 & R-2020/01', desc: 'Exigences prudentielles intégrant les obligations LBC/FT dans le dispositif de contrôle interne des établissements assujettis.' },
];

const SANCTIONS_RISKS = [
  { niveau: 'Critique', couleur: '#dc2626', description: 'Retrait d\'agrément COBAC, fermeture de l\'établissement, poursuites pénales des dirigeants', delai: 'Immédiat' },
  { niveau: 'Élevé', couleur: '#ea580c', description: 'Amende COBAC jusqu\'à 500M FCFA, restriction d\'activités, nomination d\'un administrateur provisoire', delai: 'Sous 30 jours' },
  { niveau: 'Moyen', couleur: '#ca8a04', description: 'Injonction de mise en conformité sous astreinte, rapport d\'inspection négatif transmis au SG-COBAC', delai: 'Sous 90 jours' },
  { niveau: 'Faible', couleur: '#86BC25', description: 'Observations et recommandations d\'amélioration, suivi rapproché par la COBAC lors du prochain contrôle', delai: 'Prochain cycle' },
];

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que le GABAC et quel est son rôle exact ?',
    answer: 'Le GABAC (Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale) est l\'organe régional de lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT) pour la zone CEMAC. Créé en 2001, il est le pendant centrafricain du GAFI. Il évalue la conformité technique et l\'efficacité des dispositifs LBC/FT des 6 États membres (Cameroun, Congo, Gabon, Guinée Équatoriale, RCA, Tchad), publie des rapports d\'évaluation mutuelle, et émet des recommandations contraignantes transposées dans le Règlement CEMAC n°01/16.',
  },
  {
    question: 'Qui est soumis aux obligations LBC/FT du Règlement CEMAC n°01/16 ?',
    answer: 'Tous les établissements financiers agréés par la COBAC : banques, établissements de microfinance (EMF), établissements de paiement, émetteurs de monnaie électronique, sociétés de transfert d\'argent, compagnies d\'assurance, et plus généralement toute institution manipulant des flux financiers dans la zone CEMAC. Certaines professions non-financières (notaires, avocats, comptables, casinos, agents immobiliers) sont également assujetties.',
  },
  {
    question: 'Quelles sont les 3 obligations principales en matière de LBC/FT ?',
    answer: 'Les 3 piliers du dispositif LBC/FT GABAC sont : (1) L\'obligation de vigilance (KYC, identification du bénéficiaire effectif, due diligence renforcée pour les clients à haut risque et les PPE) ; (2) L\'obligation de déclaration de soupçon à l\'ANIF nationale, sans en informer le client, pour toute opération suspecte ; (3) L\'obligation de gel des avoirs sans délai des personnes et entités désignées par les résolutions du Conseil de Sécurité de l\'ONU. Le non-respect expose à des sanctions administratives et pénales.',
  },
  {
    question: 'Quelle est la différence entre le GABAC et le GIABA ?',
    answer: 'Le GABAC couvre la zone CEMAC (6 pays d\'Afrique Centrale : Cameroun, Congo, Gabon, Guinée Équatoriale, RCA, Tchad). Le GIABA couvre la zone CEDEAO (15 pays d\'Afrique de l\'Ouest). Les deux sont des organismes régionaux de type GAFI (ORSB — Organes Régionaux de Style GAFI) qui évaluent la conformité LBC/FT de leurs États membres. KHEPRA EXPERTS maîtrise les dispositifs des deux zones.',
  },
  {
    question: 'À quelle fréquence les inspections GABAC ont-elles lieu ?',
    answer: 'Les évaluations mutuelles du GABAC sont menées par cycle de 5 à 7 ans pour chaque État membre. Cependant, la COBAC réalise des contrôles LBC/FT lors de chaque inspection sur place des établissements financiers (généralement tous les 2 à 3 ans). Les ANIF nationales peuvent également diligenter des contrôles thématiques inopinés. Il est donc impératif de maintenir un dispositif permanent et documenté.',
  },
  {
    question: 'KHEPRA EXPERTS peut-il nous aider à préparer une évaluation mutuelle GABAC ?',
    answer: 'Oui, absolument. Notre équipe LBC/FT accompagne les établissements financiers dans la préparation complète aux évaluations mutuelles GABAC : diagnostic initial (GAP analysis), mise à niveau des procédures KYC, paramétrage du dispositif de détection, formation certifiée de l\'ensemble du personnel, audit externe de certification, et simulation d\'inspection avec rapport de conformité. Notre fondateur a une expérience directe de la supervision COBAC au Gabon.',
  },
];

const DIFFERENTIATORS = [
  {
    icon: 'ri-fingerprint-line',
    title: 'Expertise GABAC de terrain',
    desc: 'Notre fondateur a dirigé AMIFA Gabon sous supervision COBAC/GABAC directe — nous connaissons les attentes réelles des inspecteurs et des évaluateurs.',
  },
  {
    icon: 'ri-global-line',
    title: 'Couverture des 6 pays CEMAC',
    desc: 'Nous maîtrisons les ANIF nationales (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale), leurs formulaires DS spécifiques et leurs seuils déclaratifs.',
  },
  {
    icon: 'ri-file-chart-line',
    title: 'Méthodologie alignée GAFI 40+11',
    desc: 'Nos diagnostics sont calibrés sur les 40 Recommandations du GAFI et les 11 Résultats Immédiats de la méthodologie d\'évaluation 2013 révisée.',
  },
  {
    icon: 'ri-time-line',
    title: 'Préparation en 3 à 6 mois',
    desc: 'Grâce à notre connaissance approfondie des processus GABAC, nous réduisons significativement les délais de mise en conformité — en moyenne 3 à 6 mois selon la complexité du dossier.',
  },
];

export default function ConformiteGABACPage() {
  const navigate = useNavigate();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Conformité GABAC — LBC/FT Afrique Centrale | Dispositif Anti-Blanchiment CEMAC | KHEPRA EXPERTS',
    description: 'Expert en conformité GABAC et LBC/FT pour les institutions financières en Afrique Centrale. Diagnostic, mise en conformité et préparation aux évaluations mutuelles. Règlement CEMAC n°01/16, GAFI, ANIF, gel des avoirs.',
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Conformité GABAC — LBC/FT Afrique Centrale', item: `${SITE_URL}/conformite-gabac` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SeoHead
        title="Conformité GABAC — LBC/FT Afrique Centrale | Dispositif Anti-Blanchiment CEMAC | KHEPRA EXPERTS"
        description="Expert conformité GABAC et LBC/FT en Afrique Centrale. Accompagnement complet : diagnostic KYC, déclarations de soupçon ANIF, gel des avoirs, préparation évaluations mutuelles GABAC. Règlement CEMAC n°01/16. 6 pays CEMAC. Diagnostic gratuit."
        keywords="conformité GABAC, LBC FT Afrique Centrale, lutte anti-blanchiment CEMAC, Règlement CEMAC n°01/16, déclaration de soupçon ANIF, gel des avoirs CEMAC, KYC CEMAC, GAFI Afrique Centrale, formation LBC FT, responsable conformité LBC/FT, KHEPRA EXPERTS GABAC"
        canonicalPath="/conformite-gabac"
        schemaJson={{ ...schema, ...faqSchema }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(165deg, #080c14 0%, #0c1420 30%, #111b2a 60%, #0a101c 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(rgba(134,188,37,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(134,188,37,0.10) 0%, transparent 55%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full border border-deloitte-400/20" style={{ background: 'rgba(134,188,37,0.06)' }}>
                <i className="ri-fingerprint-line text-sm text-deloitte-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-deloitte-400">LBC/FT — Conformité GABAC — Afrique Centrale</span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                Conformité GABAC : votre dispositif LBC/FT est-il à l'épreuve d'une évaluation mutuelle ?
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Le GABAC évalue la conformité LBC/FT de tous les États de la CEMAC. Chaque établissement financier doit démontrer un dispositif robuste — KYC, déclarations de soupçon, gel des avoirs, formation. KHEPRA EXPERTS vous prépare aux inspections GABAC avec une méthodologie alignée sur les 40 Recommandations du GAFI.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['Règlement CEMAC n°01/16', 'GAFI 40+11', 'ANIF', 'KYC', 'Déclarations Soupçon', 'Gel Avoirs ONU', 'PPE', 'UBO'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>

              {/* CEMAC Countries + ANIF */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {CEMAC_COUNTRIES.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <span>{c.flag}</span>
                    <span className="text-white">{c.name}</span>
                    <span className="text-[10px] font-bold uppercase" style={{ color: 'rgba(134,188,37,0.8)' }}>{c.anif}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Diagnostic LBC/FT gratuit
                </a>
                <button
                  onClick={() => navigate('/tools/diagnostic-lbcft')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-fingerprint-line mr-2" />
                  Évaluer mon dispositif LBC/FT
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25), transparent)' }} />
        </section>

        {/* ═══════════ 6 OBLIGATIONS PILIERS ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Les 6 obligations structurantes du dispositif GABAC</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Le référentiel LBC/FT complet couvert par nos experts</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Notre approche couvre l'intégralité des obligations du Règlement CEMAC n°01/16 et des 40 Recommandations du GAFI, évaluées par le GABAC.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {OBLIGATIONS.map((obligation, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${obligation.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{obligation.title}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{obligation.desc}</p>
                  <ul className="space-y-1.5 mb-3">
                    {obligation.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                        <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-neutral-100">
                    <span className="text-[10px] text-neutral-400 italic">{obligation.ref}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RÉFÉRENTIELS ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Cadre réglementaire</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Le référentiel normatif GABAC maîtrisé par KHEPRA</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">6 textes fondateurs qui structurent la conformité LBC/FT en Afrique Centrale.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REFERENTIELS.map((ref, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-neutral-200/70 hover:border-deloitte-200/60 transition-all" style={{ background: '#fafbfc' }}>
                  <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0 bg-deloitte-500" />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">{ref.label}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{ref.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MÉTHODOLOGIE ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Notre méthode exclusive</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">4 phases vers la conformité GABAC intégrale</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Une méthodologie éprouvée, alignée sur la grille d'évaluation mutuelle du GABAC (Conformité Technique + Efficacité — 11 Résultats Immédiats).</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {METHODOLOGY.map((phase, i) => (
                <div key={i} className="relative text-center group">
                  {i < METHODOLOGY.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.4), rgba(134,188,37,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-deloitte-50 text-deloitte-600 border-2 border-deloitte-200/50">{phase.step}</div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2" style={{ background: 'rgba(134,188,37,0.1)', color: '#86BC25' }}>{phase.duration}</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">{phase.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RISQUES DE NON-CONFORMITÉ ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Risques</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Les conséquences d'un dispositif LBC/FT non conforme</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Le GABAC et la COBAC appliquent des sanctions graduées — de la simple observation au retrait d'agrément.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SANCTIONS_RISKS.map((risk, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border transition-all hover:-translate-y-1" style={{ background: '#fafbfc', borderColor: `${risk.couleur}20` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: risk.couleur }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: risk.couleur }}>{risk.niveau}</span>
                  </div>
                  <p className="text-[13px] text-neutral-700 leading-relaxed mb-3">{risk.description}</p>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-time-line text-xs text-neutral-400" />
                    <span className="text-[11px] font-semibold text-neutral-400">{risk.delai}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ POURQUOI KHEPRA ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Pourquoi KHEPRA</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Votre partenaire conformité LBC/FT en Afrique Centrale</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-neutral-200/70 hover:border-deloitte-200/60 transition-all bg-white">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${d.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{d.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Tout savoir sur la conformité GABAC et le LBC/FT</h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ═══════════ CTA FINAL ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.04), rgba(134,188,37,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Ne laissez pas le GABAC découvrir vos failles LBC/FT</h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                La prochaine évaluation mutuelle ou inspection COBAC pourrait arriver plus tôt que prévu. Diagnostiquez votre dispositif LBC/FT en 8 minutes — gratuit, confidentiel, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Diagnostic LBC/FT gratuit
                </a>
                <button onClick={() => navigate('/contact')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-mail-line mr-2" />
                  Contacter nos experts GABAC
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}



