import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

interface BUService {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  cta: string;
  ctaHref: string;
  secondaryCta: string;
  secondaryHref: string;
  accent: string;
  stats: { value: string; label: string }[];
}

const bu1Services: BUService[] = [
  {
    id: 'pre-inspection-bceao',
    icon: 'ri-shield-check-line',
    title: 'Pré-Inspection & Audit Prudentiel BCEAO/COBAC',
    subtitle: 'Préparez votre inspection avec une méthodologie éprouvée sur 215 points de contrôle',
    description: 'Audit 360° couvrant gouvernance, contrôle interne, LBC/FT, gestion des risques, ICAAP, protection clientèle et reporting réglementaire. Simulation d\'inspection en conditions réelles, plan de remédiation accélérée en 90 jours. 47 écarts critiques résorbés en moyenne par mission.',
    deliverables: ['Diagnostic 215 points de contrôle', 'Plan de remédiation priorisé', 'Simulation d\'inspection', 'Formation des équipes', 'Documentation conforme CB-UMOA'],
    cta: 'Diagnostic Pré-Inspection gratuit',
    ctaHref: '/tools/diagnostic-pre-inspection-bceao-cobac',
    secondaryCta: 'Voir une étude de cas',
    secondaryHref: '/case-studies/pre-inspection-bceao-banque-uemoa',
    accent: '#86BC25',
    stats: [{ value: '96%', label: 'Conformité post-mission' }, { value: '47', label: 'Écarts résorbés (moy.)' }],
  },
  {
    id: 'lbcft-conformite',
    icon: 'ri-fingerprint-line',
    title: 'Conformité LBC/FT — Dispositif 8 Piliers GAFI/BCEAO/COBAC',
    subtitle: '127 points de contrôle couvrant l\'intégralité du dispositif LBC/FT requis par les régulateurs',
    description: 'Déploiement complet du dispositif LBC/FT : gouvernance, KYC/CDD/EDD, surveillance des opérations, déclarations de soupçon (CENTIF/ANIF), gel des avoirs, conservation des documents, formation et audit externe. Alignement sur les 40 Recommandations GAFI (2023), GIABA, GABAC et les directives BCEAO/COBAC.',
    deliverables: ['Cartographie des risques LBC/FT', 'Procédures KYC/CDD/EDD', 'Dispositif de déclaration de soupçon', 'Formation obligatoire du personnel', 'Matrice de conformité 127 points'],
    cta: 'Audit LBC/FT',
    ctaHref: '/sfd-conformite',
    secondaryCta: 'Diagnostic LBC/FT',
    secondaryHref: '/tools/evaluation-conformite-reglementaire',
    accent: '#6B9B1F',
    stats: [{ value: 'GAFI', label: '40 Recommandations' }, { value: '127', label: 'Points de contrôle' }],
  },
  {
    id: 'agrement-sfd',
    icon: 'ri-government-line',
    title: 'Agrément SFD/EMF — Dossier BCEAO & COBAC',
    subtitle: '100% des dossiers menés à terme ont obtenu l\'agrément — méthodologie exclusive en 3 phases',
    description: 'Ingénierie réglementaire complète : pre-licensing assessment, levée des 3 verrous (crédibilité actionnariale, plausibilité prudentielle, relation réglementaire), constitution du dossier d\'agrément (étude de faisabilité, business plan 5 ans, manuel de procédures, politique LBC/FT). Suivi des instructions jusqu\'à l\'obtention.',
    deliverables: ['Pre-licensing assessment', 'Dossier d\'agrément complet', 'Business plan 5 ans', 'Manuel de procédures', 'Accompagnement jusqu\'à obtention'],
    cta: 'Évaluer mon éligibilité',
    ctaHref: '/sfd-conformite',
    secondaryCta: 'Cas — Agrément 7 pays',
    secondaryHref: '/case-studies/agrement-multinational-sfd-uemoa-cemac',
    accent: '#D4AF37',
    stats: [{ value: '100%', label: 'Taux de succès' }, { value: '7', label: 'Pays UEMOA/CEMAC' }],
  },
  {
    id: 'controle-interne',
    icon: 'ri-file-list-3-line',
    title: 'Contrôle Interne Bancaire — COSO & Circulaires CB-UMOA',
    subtitle: 'Architecture de contrôle interne conforme aux 3 lignes de défense et à la Circulaire 03-2017/CB/C',
    description: 'Conception et déploiement du dispositif de contrôle interne : cartographie des processus, évaluation des risques, procédures, séparation des fonctions, délégations de pouvoirs, reporting. Alignement sur COSO Internal Control Framework (2013, révisé 2023) et les exigences CB-UMOA.',
    deliverables: ['Cartographie des processus', 'Matrice risques/contrôles', 'Manuel de procédures', 'Dispositif 3 lignes de défense', 'Reporting Conseil'],
    cta: 'Auditer mon contrôle interne',
    ctaHref: '/services/controle-interne-bancaire',
    secondaryCta: 'Article — 3 Lignes de Défense',
    secondaryHref: '/blog/3-lignes-defense-circulaire-03-2017',
    accent: '#5C8A2F',
    stats: [{ value: 'COSO', label: 'Framework 2023' }, { value: '03-2017', label: 'Circulaire CB-UMOA' }],
  },
];

const bu2Services: BUService[] = [
  {
    id: 'documentation-prix-transfert',
    icon: 'ri-file-text-line',
    title: 'Documentation Prix de Transfert — BEPS Action 13',
    subtitle: 'Master File, Local File et Country-by-Country Reporting conformes OCDE et UEMOA/CEMAC',
    description: 'Documentation complète : analyse fonctionnelle (FAR), benchmarking sur bases africaines, sélection de la méthode (CUP, TNMM, CPM), rédaction du Master File Groupe et des Local Files par juridiction. Conforme BEPS Action 13 (OCDE 2023), Directive UEMOA 01/2011 et Règlement CEMAC 01/18.',
    deliverables: ['Master File Groupe', 'Local Files par pays', 'Analyse fonctionnelle FAR', 'Benchmarking comparables', 'Politique prix de transfert'],
    cta: 'Diagnostic Prix de Transfert',
    ctaHref: '/tools/diagnostic-prix-transfert',
    secondaryCta: 'Cas — Groupe Agroalimentaire',
    secondaryHref: '/case-studies/prix-transfert-microfinance-groupe-panafricain',
    accent: '#0D7B5F',
    stats: [{ value: 'BEPS', label: 'Action 13 OCDE' }, { value: '6', label: 'Local Files (cas réel)' }],
  },
  {
    id: 'defense-fiscale',
    icon: 'ri-scales-line',
    title: 'Défense en Contrôle Fiscal Prix de Transfert',
    subtitle: 'Stratégie de négociation et contentieux — réduction moyenne de 87% des redressements',
    description: 'Stratégie de défense complète : analyse du redressement, documentation de défense (benchmarking indépendant, preuves des services), préparation des réunions avec l\'administration fiscale, négociation d\'APA (Accord Préalable de Prix) pour les exercices futurs.',
    deliverables: ['Analyse du redressement', 'Documentation de défense', 'Argumentaires techniques', 'Négociation APA', 'Stratégie contentieuse'],
    cta: 'Évaluer mon risque fiscal',
    ctaHref: '/services/defense-fiscale-prix-transfert',
    secondaryCta: 'Policy Brief Think Tank',
    secondaryHref: '/think-tank',
    accent: '#8B3A4A',
    stats: [{ value: '-87%', label: 'Redressement (cas réel)' }, { value: '4,2 Mds', label: 'FCFA économisés' }],
  },
  {
    id: 'fiscalite-groupes',
    icon: 'ri-building-4-line',
    title: 'Fiscalité Internationale des Groupes — UEMOA/CEMAC',
    subtitle: 'Structuration fiscale, conventions fiscales, optimisation conforme et due diligence',
    description: 'Analyse et structuration fiscale des groupes multinationaux : optimisation de la charge fiscale conforme, revue des conventions fiscales bilatérales, due diligence fiscale pré-acquisition, restructuration de holdings, gestion des prix de transfert intra-groupe.',
    deliverables: ['Diagnostic fiscal groupe', 'Plan d\'optimisation conforme', 'Due diligence fiscale', 'Revue conventions fiscales', 'Documentation intra-groupe'],
    cta: 'Diagnostic fiscal',
    ctaHref: '/services/gouvernance-fiscalite-internationale',
    secondaryCta: 'Guide Fiscalité',
    secondaryHref: '/blog/gouvernance-fiscalite-internationale-khepra-360',
    accent: '#6B4A3A',
    stats: [{ value: '15+', label: 'Pays analysés' }, { value: 'OCDE', label: 'Modèle 2017' }],
  },
];

const bu3Services: BUService[] = [
  {
    id: 'erm-cartographie',
    icon: 'ri-radar-line',
    title: 'ERM & Cartographie des Risques — COSO ERM / ISO 31000',
    subtitle: 'Identification, évaluation et hiérarchisation des risques avec heat maps et KRI',
    description: 'Déploiement complet du dispositif ERM : identification des risques (top-down + bottom-up), évaluation (probabilité × impact), hiérarchisation (heat map), définition de l\'appétit au risque, plans de traitement, KRI et reporting Conseil. Conforme COSO ERM 2017 et ISO 31000:2018.',
    deliverables: ['Cartographie des risques', 'Heat map interactive', 'Appétit au risque défini', 'Plans de traitement', 'Tableau de bord KRI'],
    cta: 'Cartographier mes risques',
    ctaHref: '/gouvernance-risques',
    secondaryCta: 'Livre blanc ERM',
    secondaryHref: '/whitepapers',
    accent: '#C2410C',
    stats: [{ value: '180+', label: 'Risques sectoriels types' }, { value: 'COSO', label: 'ERM 2017' }],
  },
  {
    id: 'audit-interne',
    icon: 'ri-search-eye-line',
    title: 'Audit Interne — COSO 2023 & Normes IIA',
    subtitle: 'Cycle d\'audit complet, charte, programmes de travail et reporting au Comité d\'Audit',
    description: 'Mise en place et renforcement de la fonction d\'audit interne : charte, plan d\'audit annuel basé sur les risques, programmes de travail (25 modèles par processus), techniques d\'investigation, rapport d\'audit et suivi des recommandations. Conforme IIA (IPPF 2024) et COSO 2023.',
    deliverables: ['Charte d\'audit interne', 'Plan d\'audit annuel', 'Programmes de travail', 'Rapports d\'audit', 'Suivi des recommandations'],
    cta: 'Auditer ma fonction',
    ctaHref: '/gouvernance-risques',
    secondaryCta: 'Livre blanc Audit Interne',
    secondaryHref: '/whitepapers',
    accent: '#4A5568',
    stats: [{ value: 'IIA', label: 'Normes IPPF 2024' }, { value: '25', label: 'Programmes types' }],
  },
  {
    id: 'conseil-ca',
    icon: 'ri-government-line',
    title: 'Conseil d\'Administration — Structuration & Évaluation',
    subtitle: 'Gouvernance conforme Circulaire 01-2017/CB/C, indépendance réelle des administrateurs',
    description: 'Structuration complète du Conseil d\'Administration : évaluation indépendante (Art. 17), comités spécialisés (audit, risques, rémunération, stratégie), formation des administrateurs, charte du CA, évaluation des conflits d\'intérêts. Alignement OCDE/G20 et BCBS 328.',
    deliverables: ['Évaluation indépendante du CA', 'Comités spécialisés', 'Charte de gouvernance', 'Formation administrateurs', 'Reporting trimestriel'],
    cta: 'Évaluer mon CA',
    ctaHref: '/services/ceo-advisory-board',
    secondaryCta: 'Article — Indépendance Admin.',
    secondaryHref: '/blog/independance-administrateurs-circulaire-01-2017',
    accent: '#2D7A3A',
    stats: [{ value: 'Art. 17', label: 'Circulaire 01-2017' }, { value: 'OCDE', label: 'G20 2023' }],
  },
  {
    id: 'gouvernance-familiale',
    icon: 'ri-building-2-line',
    title: 'Gouvernance des Groupes Familiaux — OHADA',
    subtitle: 'Pacte d\'actionnaires, charte familiale, succession et professionnalisation',
    description: 'Structuration de la gouvernance des entreprises familiales : conseil de famille, charte familiale, holding de contrôle, pacte d\'actionnaires, plan de relève générationnelle, séparation patrimoine privé/professionnel. Conforme AUSCGIE OHADA et Family Business Network.',
    deliverables: ['Charte familiale', 'Pacte d\'actionnaires', 'Plan de succession', 'Holding de contrôle', 'Conseil de famille'],
    cta: 'Structurer ma gouvernance',
    ctaHref: '/services/family-office-afrique',
    secondaryCta: 'Cas — Holding Familiale',
    secondaryHref: '/case-studies/gouvernance-board-advisory-uemoa',
    accent: '#8B7330',
    stats: [{ value: 'OHADA', label: 'AUSCGIE' }, { value: '3e gen.', label: 'Cas réel' }],
  },
];

export default function ServicesBigFourGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(134,188,37,0.06)', border: '1px solid rgba(134,188,37,0.12)' }}>
              <i className="ri-focus-3-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B9B1F' }}>11 Services Spécialisés — 3 Business Units</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a0a0a' }}>Des services conçus pour des problèmes réglementaires précis</h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(0,0,0,0.55)' }}>
              Chaque service est spécialisé, documenté, et livré avec des résultats mesurables. Aucun service générique.
            </p>
          </div>
        </ScrollReveal>

        {/* BU1 — Régulation Financière */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.16)' }}>
              <i className="ri-bank-line text-lg" style={{ color: '#86BC25' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.35)' }}>Business Unit 1</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(134,188,37,0.10)', color: '#6B9B1F' }}>REGULATORY</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#0a0a0a' }}>Régulation Financière — BCEAO · COBAC · BEAC</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {bu1Services.map((service, idx) => (
              <BUServiceCard key={service.id} service={service} navigate={navigate} delay={idx * 80} />
            ))}
          </div>
        </div>

        {/* BU2 — Prix de Transfert */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.20)' }}>
              <i className="ri-exchange-funds-line text-lg" style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.35)' }}>Business Unit 2</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(212,175,55,0.12)', color: '#b8941e' }}>TRANSFER PRICING</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#0a0a0a' }}>Prix de Transfert & Fiscalité Internationale — BEPS · OCDE</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bu2Services.map((service, idx) => (
              <BUServiceCard key={service.id} service={service} navigate={navigate} delay={idx * 80} />
            ))}
          </div>
        </div>

        {/* BU3 — GRC */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(107,155,31,0.08)', border: '1px solid rgba(107,155,31,0.16)' }}>
              <i className="ri-shield-check-line text-lg" style={{ color: '#6B9B1F' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.35)' }}>Business Unit 3</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(107,155,31,0.10)', color: '#6B9B1F' }}>GRC</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#0a0a0a' }}>Gouvernance, Risques & Conformité — ERM · Audit · Conseil</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {bu3Services.map((service, idx) => (
              <BUServiceCard key={service.id} service={service} navigate={navigate} delay={idx * 80} />
            ))}
          </div>
        </div>

        {/* BU4 — Think Tank — CTA */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="rounded-2xl p-8 md:p-10 text-center" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)', border: '1px solid rgba(212,175,55,0.12)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.16)' }}>
              <i className="ri-lightbulb-flash-line text-sm" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#D4AF37' }}>Business Unit 4 — Think Tank</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Recherche & Prospective Réglementaire</h2>
            <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Le KHEPRA THINK TANK produit des recherches indépendantes pour éclairer les décideurs. Position Papers, Policy Briefs, Études Sectorielles et Prospectives Réglementaires sur les grands enjeux de la régulation en Afrique francophone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => navigate('/think-tank')} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#080c14' }}>
                <i className="ri-book-open-line" />
                Explorer les publications
              </button>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all" style={{ color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}>
                <i className="ri-mail-send-line" />
                Nous contacter
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function BUServiceCard({ service, navigate, delay }: { service: BUService; navigate: (path: string) => void; delay: number }) {
  return (
    <ScrollReveal animation="fadeSlideUp" delay={delay}>
      <div className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: '#fafaf8', border: '1px solid rgba(134,188,37,0.06)' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${service.accent}12`, border: `1px solid ${service.accent}25` }}>
            <i className={`${service.icon} text-lg`} style={{ color: service.accent }} />
          </div>
          <div className="flex items-center gap-2">
            {service.stats.map((stat, si) => (
              <div key={si} className="text-right">
                <div className="text-sm font-bold leading-none" style={{ color: service.accent }}>{stat.value}</div>
                <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.35)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <h4 className="text-sm font-bold mb-1.5 leading-snug line-clamp-2" style={{ color: '#0a0a0a' }} title={service.title}>{service.title}</h4>
        <p className="text-xs italic mb-3 line-clamp-2" style={{ color: 'rgba(0,0,0,0.45)' }} title={service.subtitle}>{service.subtitle}</p>
        <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'rgba(0,0,0,0.55)' }}>{service.description}</p>

        {/* Deliverables */}
        <div className="mb-4 pt-3" style={{ borderTop: '1px solid rgba(134,188,37,0.06)' }}>
          <span className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(0,0,0,0.30)' }}>Livrables</span>
          <div className="flex flex-wrap gap-1.5">
            {service.deliverables.map((d, di) => (
              <span key={di} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(134,188,37,0.04)', color: '#6B9B1F' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(service.ctaHref)} className="px-4 py-2 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all hover:scale-105 flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#ffffff' }}>
            {service.cta}
            <i className="ri-arrow-right-line" />
          </button>
          <button onClick={() => navigate(service.secondaryHref)} className="text-xs font-semibold cursor-pointer whitespace-nowrap hover:underline flex items-center gap-1" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {service.secondaryCta}
            <i className="ri-arrow-right-line text-[10px]" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}