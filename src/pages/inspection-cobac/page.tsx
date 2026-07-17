import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const RISKS = [
  {
    icon: 'ri-error-warning-line',
    title: 'Sanctions pécuniaires COBAC',
    desc: 'Des amendes administratives prononcées par la COBAC pouvant atteindre plusieurs centaines de millions FCFA, assorties d\'astreintes journalières en cas de non-régularisation.',
  },
  {
    icon: 'ri-lock-line',
    title: 'Restriction ou suspension d\'activité',
    desc: 'La COBAC peut restreindre ou suspendre temporairement certaines activités de l\'établissement en cas de manquements graves constatés lors d\'une inspection.',
  },
  {
    icon: 'ri-admin-line',
    title: 'Mise sous administration provisoire',
    desc: 'Nomination d\'un administrateur provisoire par la COBAC, entraînant la suspension des organes de direction et une perte de contrôle totale sur la gestion.',
  },
  {
    icon: 'ri-forbid-line',
    title: 'Retrait d\'agrément',
    desc: 'Dans les cas les plus sévères, retrait pur et simple de l\'agrément par la COBAC, entraînant la cessation définitive de l\'activité dans la zone CEMAC.',
  },
];

const INSPECTION_AXES = [
  {
    icon: 'ri-government-line',
    title: 'Gouvernance & Organisation',
    desc: 'Conformité de la composition du Conseil d\'Administration, fonctionnement des comités spécialisés, indépendance des administrateurs, séparation des pouvoirs, plan de relève.',
    ref: 'COBAC R-2016/04, Règlement CEMAC n°01/16',
    findings: ['Composition et indépendance du CA', 'Fonctionnement des comités (audit, risques, rémunération)', 'Politique de conflits d\'intérêts', 'Séparation des fonctions exécutives et de contrôle', 'Plan de relève documenté'],
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Contrôle Interne & Audit',
    desc: 'Évaluation du dispositif de contrôle interne, indépendance de l\'audit interne, couverture des risques, tests de permanence, mécanismes de remontée d\'alerte.',
    ref: 'COBAC R-2016/04 (abrogeant R-2001/07 et R-93/08)',
    findings: ['Cartographie exhaustive des processus', 'Indépendance de l\'audit interne vis-à-vis de la DG', 'Dispositif de contrôle permanent documenté', 'Mécanisme de lanceurs d\'alerte', 'Suivi des recommandations d\'audit'],
  },
  {
    icon: 'ri-fingerprint-line',
    title: 'LBC/FT — Conformité GABAC',
    desc: 'Dispositif complet de lutte contre le blanchiment : KYC, déclarations de soupçon, formation, procédures, gel des avoirs, conformité sanctions internationales.',
    ref: 'Règlement CEMAC n°01/16/CEMAC/UMAC/CM, Recommandations GAFI',
    findings: ['Procédures KYC exhaustives (BE, PPE)', 'Procédure de déclaration de soupçon à l\'ANIF', 'Programme de formation LBC/FT du personnel', 'Dispositif de gel des avoirs', 'Audit externe LBC/FT indépendant'],
  },
  {
    icon: 'ri-bar-chart-grouped-line',
    title: 'Gestion des Risques & Ratios',
    desc: 'Cartographie des risques, appétit au risque, ratios prudentiels BEAC (solvabilité, liquidité, division des risques), ALM, stress tests, ICAAP/ILAAP.',
    ref: 'COBAC R-2016/03 (fonds propres), R-2020/01 (division des risques), Bâle II/III',
    findings: ['Cartographie des risques exhaustive', 'Cadre d\'appétit au risque formalisé', 'Ratio de solvabilité ≥ 8% (Pilier 1 Bâle II)', 'Division des risques ≤ 25% fonds propres nets', 'Stress tests réguliers documentés'],
  },
  {
    icon: 'ri-computer-line',
    title: 'Sécurité SI & Continuité',
    desc: 'Gouvernance de la sécurité des systèmes d\'information, PCA/PRA, sauvegardes, gestion des incidents, notification au SG-COBAC, tests réguliers.',
    ref: 'COBAC R-2024/01 (gouvernance SI, en vigueur 01/01/2025)',
    findings: ['Politique de sécurité SI documentée', 'PCA/PRA testés au moins annuellement', 'Procédures de sauvegarde et restauration', 'Protocole de notification des incidents au SG-COBAC', 'Responsabilité du CA sur la gouvernance SI'],
  },
];

const SERVICES = [
  {
    icon: 'ri-search-eye-line',
    title: 'Audit de Pré-Inspection COBAC',
    desc: 'Simulation complète d\'une mission d\'inspection COBAC selon les 5 axes réglementaires. Rapport confidentiel avec matrice des écarts et recommandations priorisées.',
    deliverables: ['Rapport confidentiel d\'audit COBAC', 'Matrice des écarts réglementaires', 'Plan de remédiation priorisé', 'Présentation au Conseil d\'Administration'],
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Plan de Remédiation COBAC',
    desc: 'Élaboration d\'un plan d\'action correctif détaillé avec calendrier contraignant, responsables désignés et indicateurs de suivi pour chaque écart identifié.',
    deliverables: ['Plan d\'actions avec jalons et KPI', 'Tableau de bord de suivi', 'Documentation réglementaire conforme', 'Formation des équipes'],
  },
  {
    icon: 'ri-radar-line',
    title: 'Veille & Suivi COBAC',
    desc: 'Monitoring continu de la conformité, alertes réglementaires, ajustements post-inspection, reporting périodique au Conseil d\'Administration.',
    deliverables: ['Veille réglementaire trimestrielle', 'Rapport de conformité périodique', 'Matrice de conformité actualisée', 'Recommandations d\'amélioration continue'],
  },
];

const METHODOLOGY = [
  { step: '01', icon: 'ri-file-search-line', title: 'Diagnostic initial', desc: 'Revue documentaire exhaustive de votre dispositif : politiques, procédures, PV de CA, rapports d\'audit, dossiers de conformité. Identification des écarts documentaires.', duration: 'Semaine 1' },
  { step: '02', icon: 'ri-search-eye-line', title: 'Investigation terrain', desc: 'Entretiens avec les personnes clés, tests par échantillonnage, revue de processus. Application de la grille d\'analyse exacte des inspecteurs COBAC.', duration: 'Semaines 2-3' },
  { step: '03', icon: 'ri-file-warning-line', title: 'Identification des Red Flags', desc: 'Croisement des constats avec les motifs de sanction COBAC les plus fréquents. Classification par criticité et estimation de l\'impact financier.', duration: 'Semaine 4' },
  { step: '04', icon: 'ri-file-text-line', title: 'Rapport & Recommandations', desc: 'Rédaction du rapport confidentiel complet avec plan de remédiation priorisé, calendrier et présentation exécutive pour le Conseil.', duration: 'Semaines 5-6' },
];

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce qu\'une inspection COBAC et quand se déclenche-t-elle ?',
    answer: 'L\'inspection COBAC est une mission de contrôle sur place menée par la Commission Bancaire de l\'Afrique Centrale (COBAC) auprès des établissements assujettis en zone CEMAC. Elle peut être déclenchée dans le cadre du cycle régulier de supervision (tous les 12 à 24 mois), sur signalement, ou lors d\'un événement prudentiel significatif. L\'inspection couvre généralement la gouvernance, le contrôle interne, la LBC/FT, la gestion des risques et la sécurité des SI.',
  },
  {
    question: 'Quelle est la différence entre une inspection COBAC et un audit interne ?',
    answer: 'L\'audit interne évalue vos processus selon vos propres référentiels. L\'inspection COBAC applique les standards réglementaires de la COBAC : mêmes angles d\'analyse, mêmes seuils de tolérance, mêmes critères de matérialité. Un audit interne favorable ne garantit pas une inspection COBAC sans réserve. Notre pré-inspection reproduit les conditions d\'une inspection réelle pour identifier les écarts avant le passage effectif du superviseur.',
  },
  {
    question: 'Quels sont les textes COBAC applicables à l\'inspection ?',
    answer: 'Les textes clés sont : le Règlement COBAC R-2016/04 relatif au contrôle interne (abrogeant R-2001/07 et R-93/08), le Règlement COBAC R-2016/03 sur les fonds propres nets, le Règlement COBAC R-2020/01 sur la division des risques, le Règlement CEMAC n°01/16/CEMAC/UMAC/CM du 11 avril 2016 relatif à la LBC/FT/FP, et le Règlement COBAC R-2024/01 sur la gouvernance des SI (en vigueur au 1er janvier 2025).',
  },
  {
    question: 'En combien de temps peut-on préparer une inspection COBAC ?',
    answer: 'Notre audit de pré-inspection dure 4 à 6 semaines selon la taille de l\'établissement. Le diagnostic initial est livré sous 1 semaine. Le plan de remédiation est immédiatement actionnable. Pour une préparation complète incluant la mise en œuvre des actions correctives, le délai dépend du nombre et de la criticité des écarts identifiés, généralement 2 à 4 mois.',
  },
  {
    question: 'Les résultats de la pré-inspection sont-ils communicables à la COBAC ?',
    answer: 'Non. Le rapport de pré-inspection est un document confidentiel protégé par le secret professionnel. Il est exclusivement destiné à la Direction Générale et au Conseil d\'Administration. Il ne peut pas être exigé par le superviseur. Son objectif est de vous permettre d\'identifier et de corriger les défaillances avant l\'inspection officielle.',
  },
];

const REGULATORY_REFS = [
  { text: 'Règlement COBAC R-2016/04 — Contrôle interne des établissements de crédit', num: 'R-2016/04' },
  { text: 'Règlement COBAC R-2016/03 — Fonds propres nets (Bâle III)', num: 'R-2016/03' },
  { text: 'Règlement COBAC R-2020/01 — Division des risques', num: 'R-2020/01' },
  { text: 'Règlement CEMAC n°01/16/CEMAC/UMAC/CM — LBC/FT/FP', num: '01/16/CEMAC' },
  { text: 'Règlement COBAC R-2024/01 — Gouvernance des SI (2025)', num: 'R-2024/01' },
  { text: 'Règlement COBAC R-2017/03 — Agrément EMF', num: 'R-2017/03' },
  { text: 'Convention de gestion commune BEAC — Politique monétaire CEMAC', num: 'BEAC' },
  { text: 'Recommandations GAFI — Lutte anti-blanchiment (révisées 2023)', num: 'GAFI 2023' },
  { text: 'GABAC — Rapports d\'évaluation mutuelle CEMAC', num: 'GABAC MEM' },
  { text: 'COSO Internal Control — Integrated Framework', num: 'COSO 2013' },
];

const DIFFERENTIATORS = [
  {
    icon: 'ri-map-pin-2-line',
    title: 'Expérience terrain en zone CEMAC',
    desc: 'Notre fondateur a dirigé Atlantique Microfinance (AMIFA) au Gabon — obtention de l\'agrément COBAC, management sous supervision COBAC directe. Une connaissance intime des attentes des inspecteurs COBAC.',
  },
  {
    icon: 'ri-building-2-line',
    title: 'Méthodologie alignée standards internationaux',
    desc: 'Nos protocoles d\'audit sont calibrés sur le référentiel COBAC et les standards COSO/Bâle. Chaque mission suit un processus documenté en 4 phases couvrant l\'intégralité du périmètre d\'inspection.',
  },
  {
    icon: 'ri-shield-star-line',
    title: 'Confidentialité absolue garantie',
    desc: 'Toutes nos missions sont couvertes par un NDA strict. Le rapport de pré-inspection est exclusivement destiné à votre Conseil d\'Administration. Secret professionnel intégral.',
  },
  {
    icon: 'ri-global-line',
    title: 'Double expertise COBAC & BCEAO',
    desc: 'Peu de cabinets maîtrisent simultanément les deux cadres prudentiels. Nous intervenons dans les 14 pays UEMOA + CEMAC avec la même connaissance approfondie des régulateurs.',
  },
];

export default function InspectionCOBACPage() {
  const navigate = useNavigate();
  const [activeAxe, setActiveAxe] = useState(0);
  const [showAllRefs, setShowAllRefs] = useState(false);
  const displayedRefs = showAllRefs ? REGULATORY_REFS : REGULATORY_REFS.slice(0, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Inspection COBAC — Préparation & Audit Pré-Inspection | KHEPRA EXPERTS',
    description: 'Préparez votre inspection COBAC en zone CEMAC. Audit de pré-inspection couvrant les 5 axes réglementaires : gouvernance, contrôle interne, LBC/FT, risques, sécurité SI. 22 ans d\'expertise terrain en Afrique Centrale.',
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Inspection COBAC — Audit de Pré-Inspection', item: `${SITE_URL}/inspection-cobac` },
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
        title="Inspection COBAC — Audit de Pré-Inspection | Préparation CEMAC | KHEPRA EXPERTS"
        description="Préparez votre inspection COBAC avec un audit de pré-inspection complet couvrant les 5 axes : gouvernance, contrôle interne, LBC/FT GABAC, risques prudentiels, sécurité SI. 22 ans d'expertise en Afrique Centrale. Diagnostic gratuit en 8 minutes."
        keywords="inspection COBAC, préparation inspection COBAC, audit COBAC, conformité COBAC, contrôle interne COBAC, LBC FT GABAC, ratios prudentiels BEAC, pré-inspection COBAC CEMAC, gouvernance bancaire CEMAC, réglementation COBAC"
        canonicalPath="/inspection-cobac"
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
                <i className="ri-bank-line text-sm text-deloitte-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-deloitte-400">COBAC Inspection Readiness — Zone CEMAC</span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                Inspection COBAC : anticipez avant que le superviseur n'entre
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Nous simulons une véritable mission d'inspection COBAC dans votre établissement. Même méthodologie, même rigueur, mêmes standards. Vous recevez le rapport confidentiel avant le superviseur — et le temps de corriger ce qui doit l'être.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                {[
                  { val: '5', label: 'axes d\'inspection' },
                  { val: '6', label: 'pays CEMAC' },
                  { val: '4-6', label: 'semaines de mission' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display font-bold text-deloitte-400" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['COBAC R-2016/04', 'COBAC R-2020/01', 'Règlement CEMAC 01/16', 'Bâle II/III', 'GABAC', 'COSO', 'R-2024/01 SI'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Diagnostic gratuit — 8 min
                </a>
                <button
                  onClick={() => navigate('/tools/diagnostic-pre-inspection-cobac')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-shield-check-line mr-2" />
                  Score Pré-Inspection COBAC
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25), transparent)' }} />
        </section>

        {/* ═══════════ RISKS ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Conséquences d'une inspection non préparée</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Une inspection COBAC mal préparée expose votre établissement à des risques majeurs</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">La COBAC dispose de pouvoirs disciplinaires étendus. Voici les conséquences documentées auxquelles font face les établissements qui n'ont pas anticipé leur inspection.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {RISKS.map((r, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-red-100 bg-red-50/30 group hover:bg-red-50/60 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 bg-red-100">
                    <i className={`${r.icon} text-lg text-red-600`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{r.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5 AXES ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Les 5 axes de l'inspection COBAC</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Le périmètre exact couvert par les inspecteurs COBAC</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Notre audit de pré-inspection couvre exactement le même périmètre qu'une mission COBAC réelle, aligné sur le Règlement R-2016/04 et les textes connexes.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
              {INSPECTION_AXES.map((axe, i) => (
                <button key={i} onClick={() => setActiveAxe(i)} className={`text-left p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeAxe === i ? 'ring-2' : ''}`}
                  style={{ background: activeAxe === i ? '#ffffff' : 'rgba(255,255,255,0.6)', border: activeAxe === i ? '1px solid rgba(134,188,37,0.3)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: activeAxe === i ? 'rgba(134,188,37,0.12)' : 'rgba(0,0,0,0.04)' }}>
                    <i className={`${axe.icon} text-base`} style={{ color: activeAxe === i ? '#86BC25' : '#666' }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: activeAxe === i ? '#86BC25' : '#333' }}>{axe.title}</div>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-2" style={{ color: '#86BC25' }}>
                  <i className={`${INSPECTION_AXES[activeAxe].icon} mr-2`} />{INSPECTION_AXES[activeAxe].title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{INSPECTION_AXES[activeAxe].desc}</p>
                <p className="text-xs text-gray-400 italic">Réf : {INSPECTION_AXES[activeAxe].ref}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {INSPECTION_AXES[activeAxe].findings.map((finding, j) => (
                  <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(134,188,37,0.12)' }}>
                      <i className="ri-search-eye-line text-[10px]" style={{ color: '#86BC25' }} />
                    </div>
                    <span className="text-sm text-gray-700">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ MÉTHODOLOGIE ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Notre méthodologie</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">4 phases — Du diagnostic au rapport confidentiel</h2>
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

        {/* ═══════════ SERVICES ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Nos prestations COBAC</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Un accompagnement complet, de l'audit au suivi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${svc.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{svc.title}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{svc.desc}</p>
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">Livrables</span>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                          <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RÉFÉRENCES ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Cadre réglementaire</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Textes COBAC officiels — Sourcés & vérifiés</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Nos méthodologies sont strictement basées sur ces textes réglementaires officiels en vigueur dans la zone CEMAC.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
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
                <button onClick={() => setShowAllRefs(!showAllRefs)}
                  className="text-xs font-bold text-deloitte-600 hover:text-deloitte-700 transition-colors flex items-center gap-1 mx-auto">
                  {showAllRefs ? 'Voir moins' : `Voir les ${REGULATORY_REFS.length} références`}
                  <i className={showAllRefs ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ POURQUOI KHEPRA ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Pourquoi KHEPRA</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Le partenaire de référence pour votre inspection COBAC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-neutral-200/70 hover:border-deloitte-200/60 transition-all" style={{ background: '#fafbfc' }}>
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
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Vos questions sur l'inspection COBAC</h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ═══════════ CTA FINAL ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.04), rgba(134,188,37,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Prêt pour votre prochaine inspection COBAC ?</h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                Notre diagnostic de 8 minutes évalue votre niveau de préparation sur les 5 axes d'inspection COBAC. Confidentiel, gratuit, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Démarrer le diagnostic gratuit
                </a>
                <button onClick={() => navigate('/contact')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-mail-line mr-2" />
                  Contacter un expert COBAC
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