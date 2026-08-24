import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/base/OptimizedImage';

type CaseStudy = {
  id: string;
  sector: string;
  client: string;
  country: string;
  flag: string;
  context: string;
  intervention: string;
  transformation: string;
  results: { value: string; label: string }[];
  tags: string[];
  image: string;
  duration: string;
  year: string;
  serviceId: string;
  beforeAfter?: { before: string; after: string };
};

const caseStudies: CaseStudy[] = [
  // Banques
  {
    id: 'cs1',
    sector: 'banks',
    serviceId: 'corporate-governance',
    client: 'Banque régionale d\'Afrique de l\'Ouest',
    country: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    context: 'Institution bancaire de 15 ans d\'existence avec un dispositif de gouvernance obsolète. Face aux nouvelles exigences prudentielles Bâle II/III de la BCEAO, la banque risquait des sanctions réglementaires et la perte de confiance des investisseurs institutionnels.',
    intervention: 'Diagnostic approfondi du cadre de gouvernance existant, identification des 23 écarts de conformité critiques, élaboration d\'une charte de gouvernance moderne, restructuration complète du Conseil d\'Administration avec création de 3 comités spécialisés (Audit, Risques, Rémunérations), formation intensive de 40 heures pour les administrateurs, mise en place d\'un système de reporting trimestriel au régulateur.',
    transformation: 'La banque a obtenu la certification de conformité BCEAO en 6 mois, évitant ainsi des sanctions estimées à 500M FCFA. Le ratio de solvabilité s\'est amélioré de 18%, permettant d\'attirer 2 nouveaux investisseurs institutionnels. Le dispositif de gouvernance est désormais considéré comme une référence dans la sous-région.',
    results: [
      { value: '100%', label: 'Conformité BCEAO atteinte' },
      { value: '6 mois', label: 'Délai de mise en œuvre' },
      { value: '+18%', label: 'Amélioration ratio solvabilité' },
      { value: '500M FCFA', label: 'Sanctions évitées' },
    ],
    tags: ['Gouvernance', 'Conformité', 'Bâle II/III', 'BCEAO'],
    image: 'https://readdy.ai/api/search-image?query=modern%20african%20bank%20headquarters%20building%20exterior%20with%20glass%20facade%2C%20professional%20corporate%20architecture%20in%20Abidjan%20Ivory%20Coast%2C%20sunny%20day%20with%20palm%20trees%2C%20financial%20district%20urban%20setting%2C%20clean%20minimalist%20design%2C%20high%20quality%20architectural%20photography&width=600&height=380&seq=cs-bank-ci&orientation=landscape',
    duration: '6 mois',
    year: '2023',
    beforeAfter: {
      before: 'Gouvernance obsolète, 23 écarts critiques, risque de sanctions',
      after: 'Certification BCEAO, +18% solvabilité, référence sous-régionale'
    }
  },
  {
    id: 'cs2',
    sector: 'banks',
    serviceId: 'enterprise-risk-management',
    client: 'Institution financière de développement',
    country: 'Sénégal',
    flag: '🇸🇳',
    context: 'Institution de développement avec un mandat de financement agricole mais confrontée à un taux de défaut de 42% sur son portefeuille PME agricoles. Absence de méthodologie d\'évaluation adaptée aux cycles agricoles et aux spécificités du secteur agrobusiness.',
    intervention: 'Développement d\'une méthodologie de scoring agricole innovante intégrant 8 filières (riz, maïs, arachide, maraîchage, élevage, pêche, transformation, distribution), formation de 35 agents de crédit sur 6 semaines, conception de 12 produits financiers adaptés aux cycles de production, mise en place d\'un système de suivi terrain avec géolocalisation des exploitations.',
    transformation: 'Le taux de défaut a chuté de 42% à 7% en 18 mois. 2 500 PME agricoles ont été financées pour un portefeuille total de 12 Mds FCFA. L\'institution est devenue la référence en financement agricole dans la zone UEMOA, avec une demande de réplication du modèle par 3 autres pays.',
    results: [
      { value: '2 500+', label: 'PME agricoles financées' },
      { value: '-35%', label: 'Réduction du taux de défaut' },
      { value: '12 Mds FCFA', label: 'Portefeuille structuré' },
      { value: '8', label: 'Filières agricoles couvertes' },
    ],
    tags: ['Agrobusiness', 'Gestion des risques', 'PME', 'Financement'],
    image: 'https://readdy.ai/api/search-image?query=african%20agricultural%20finance%20meeting%2C%20bank%20officers%20visiting%20farmers%20in%20Senegal%2C%20professional%20consultation%20in%20rural%20setting%20with%20green%20fields%2C%20financial%20inclusion%20in%20agriculture%2C%20warm%20sunlight%2C%20documentary%20style%20photography%20showing%20development%20finance&width=600&height=380&seq=cs-bank-sn&orientation=landscape',
    duration: '12 mois',
    year: '2022',
    beforeAfter: {
      before: 'Taux de défaut 42%, méthodologie inadaptée',
      after: 'Taux de défaut 7%, 2 500 PME financées, référence UEMOA'
    }
  },
  // Microfinance
  {
    id: 'cs3',
    sector: 'microfinance',
    serviceId: 'corporate-governance',
    client: 'Réseau national de SFD',
    country: 'Bénin',
    flag: '🇧🇯',
    context: 'Réseau de 47 SFD membres confronté à l\'entrée en vigueur de la nouvelle loi uniforme sur la microfinance. 89% des membres en situation de non-conformité réglementaire avec risque de retrait d\'agrément pour 12 d\'entre eux. Système d\'information fragmenté rendant impossible le reporting consolidé exigé par la BCEAO.',
    intervention: 'Audit réglementaire complet des 47 SFD membres, élaboration d\'un plan de mise en conformité sur 18 mois avec priorisation des 23 exigences critiques, accompagnement à la digitalisation du système d\'information avec déploiement d\'une solution cloud unifiée, formation de 140 dirigeants et cadres sur les nouvelles exigences, mise en place d\'un dispositif de reporting automatisé vers la BCEAO.',
    transformation: '100% des SFD membres ont obtenu leur renouvellement d\'agrément, évitant la fermeture de 12 institutions qui servaient 85 000 clients. Le système d\'information unifié a réduit de 42% le temps de reporting et amélioré la qualité des données. Le réseau est devenu un modèle de conformité cité par la BCEAO lors de forums régionaux.',
    results: [
      { value: '47', label: 'SFD membres accompagnés' },
      { value: '100%', label: 'Conformité réglementaire' },
      { value: '+42%', label: 'Amélioration du reporting' },
      { value: '85 000', label: 'Clients préservés' },
    ],
    tags: ['Microfinance', 'Conformité', 'BCEAO', 'Digitalisation'],
    image: 'https://readdy.ai/api/search-image?query=microfinance%20institution%20office%20in%20Benin%20West%20Africa%2C%20loan%20officers%20meeting%20with%20women%20entrepreneurs%20in%20bright%20modern%20office%2C%20financial%20inclusion%20community%20banking%2C%20professional%20photography%20showing%20empowerment%20and%20financial%20services%2C%20warm%20colors%2C%20authentic%20african%20business%20setting&width=600&height=380&seq=cs-mfi-bj&orientation=landscape',
    duration: '18 mois',
    year: '2023',
    beforeAfter: {
      before: '89% non-conformes, 12 SFD menacés de fermeture',
      after: '100% agréments renouvelés, 85 000 clients préservés'
    }
  },
  {
    id: 'cs4',
    sector: 'microfinance',
    serviceId: 'financial-digital-inclusion',
    client: 'FinTech mobile money',
    country: 'Burkina Faso',
    flag: '🇧🇫',
    context: 'Startup FinTech ambitieuse souhaitant obtenir l\'agrément d\'établissement de monnaie électronique pour déployer des services de paiement mobile dans les zones rurales mal desservies (78% de la population cible sans accès bancaire). Dossier initial rejeté 2 fois par la BCEAO pour insuffisances documentaires et modèle économique non viable.',
    intervention: 'Restructuration complète du dossier d\'agrément avec 340 pages de documentation technique et financière, conception d\'un réseau de distribution via 1 200 agents de proximité, élaboration de la politique KYC/AML conforme aux standards GAFI, modélisation financière sur 5 ans validée par un cabinet d\'audit international, formation de 8 cadres conformité, accompagnement lors des 4 auditions BCEAO.',
    transformation: 'Agrément obtenu en 8 mois (vs 24 mois en moyenne). Déploiement réussi dans 78% des zones rurales ciblées avec 340 000 clients actifs la première année. Partenariats signés avec 3 banques et 2 opérateurs télécoms. Levée de fonds de 800M FCFA auprès d\'investisseurs d\'impact suite à l\'obtention de l\'agrément.',
    results: [
      { value: 'Agrément', label: 'BCEAO obtenu en 8 mois' },
      { value: '1 200+', label: 'Agents déployés' },
      { value: '340 000', label: 'Clients actifs (an 1)' },
      { value: '800M FCFA', label: 'Levée de fonds post-agrément' },
    ],
    tags: ['FinTech', 'Monnaie électronique', 'Agrément', 'Inclusion financière'],
    image: 'https://readdy.ai/api/search-image?query=mobile%20money%20agent%20in%20Burkina%20Faso%20rural%20village%2C%20young%20african%20entrepreneur%20using%20smartphone%20for%20digital%20payments%2C%20fintech%20financial%20inclusion%20in%20West%20Africa%2C%20vibrant%20colors%2C%20authentic%20documentary%20photography%20showing%20digital%20transformation%20in%20rural%20communities&width=600&height=380&seq=cs-fintech-bf&orientation=landscape',
    duration: '8 mois',
    year: '2023',
    beforeAfter: {
      before: '2 rejets BCEAO, modèle non viable',
      after: 'Agrément en 8 mois, 340K clients, 800M FCFA levés'
    }
  },
  // PME & Startups
  {
    id: 'cs5',
    sector: 'sme',
    serviceId: 'strategic-advisory',
    client: 'Groupe agroalimentaire familial',
    country: 'Cameroun',
    flag: '🇨🇲',
    context: 'Entreprise familiale de 2ème génération (35 ans d\'existence) avec un CA de 4,2 Mds FCFA mais une structure financière fragile et une gouvernance informelle. Opportunité de croissance majeure nécessitant 2,5 Mds FCFA d\'investissement, mais incapacité à lever des fonds auprès d\'investisseurs institutionnels en raison de l\'absence de transparence financière et de gouvernance structurée.',
    intervention: 'Diagnostic financier approfondi révélant 8 zones de risque critique, restructuration complète du bilan avec apurement de 600M FCFA de dettes croisées familiales, mise en place d\'un conseil d\'administration indépendant (5 membres dont 3 externes), séparation patrimoine familial/entreprise, élaboration d\'un business plan investisseur sur 5 ans avec projections validées par un Big Four, accompagnement lors de 12 roadshows investisseurs, négociation des term sheets et due diligence sur 4 mois.',
    transformation: 'Levée de fonds de 2,5 Mds FCFA réalisée auprès de 3 investisseurs institutionnels (2 fonds africains + 1 DFI). Closing du deal en 4 mois (vs 18 mois en moyenne). Croissance du CA de +60% en 18 mois post-investissement. Expansion réussie dans 2 nouveaux pays. Valorisation de l\'entreprise multipliée par 3,2. La famille conserve 51% du capital tout en professionnalisant la gestion.',
    results: [
      { value: '2,5 Mds FCFA', label: 'Levée de fonds réalisée' },
      { value: '3', label: 'Investisseurs institutionnels' },
      { value: '+60%', label: 'Croissance CA post-investissement' },
      { value: 'x3,2', label: 'Valorisation entreprise' },
    ],
    tags: ['Levée de fonds', 'Gouvernance', 'Agroalimentaire', 'Investissement'],
    image: 'https://readdy.ai/api/search-image?query=successful%20african%20family%20business%20agroalimentaire%20factory%20in%20Cameroon%2C%20modern%20food%20processing%20facility%20with%20workers%2C%20professional%20corporate%20photography%20showing%20growth%20and%20expansion%2C%20clean%20industrial%20setting%20with%20natural%20light%2C%20authentic%20african%20entrepreneurship%20story&width=600&height=380&seq=cs-sme-cm&orientation=landscape',
    duration: '4 mois',
    year: '2022',
    beforeAfter: {
      before: 'Structure fragile, gouvernance informelle, incapacité à lever',
      after: '2,5Mds levés, +60% CA, valorisation x3,2, expansion 2 pays'
    }
  },
  {
    id: 'cs6',
    sector: 'sme',
    serviceId: 'strategic-advisory',
    client: 'Startup AgriTech',
    country: 'Mali',
    flag: '🇲🇱',
    context: 'Startup de 18 mois avec une solution digitale innovante connectant 3 000 agriculteurs mais un modèle économique non rentable (burn rate de 15M FCFA/mois, runway de 4 mois). Difficulté à convaincre les investisseurs en raison d\'un positionnement flou et d\'une stratégie de monétisation inadaptée au contexte africain.',
    intervention: 'Refonte complète du business model avec passage d\'un modèle freemium à un modèle B2B2C (partenariats avec coopératives et acheteurs), restructuration de la stratégie de croissance avec priorisation de 5 pays UEMOA selon 12 critères, élaboration d\'un pitch deck investisseur de 32 slides avec storytelling impactant, modélisation financière réaliste sur 3 ans, mise en relation avec 18 investisseurs d\'impact et fonds early-stage, coaching du CEO pour 8 sessions de pitch.',
    transformation: 'Seed round de 450M FCFA clôturé en 3 mois auprès de 2 fonds (1 africain + 1 européen). Croissance des utilisateurs x3 en 6 mois (de 3 000 à 12 000 agriculteurs). Signature de 4 partenariats stratégiques avec des coopératives et acheteurs institutionnels. Expansion planifiée dans 5 pays UEMOA sur 24 mois. Runway étendu à 18 mois.',
    results: [
      { value: '450 M FCFA', label: 'Seed round clôturé' },
      { value: '5 pays', label: 'Expansion UEMOA planifiée' },
      { value: '12 000', label: 'Agriculteurs connectés' },
      { value: 'x3', label: 'Croissance utilisateurs (6 mois)' },
    ],
    tags: ['AgriTech', 'Startup', 'Seed round', 'UEMOA'],
    image: 'https://readdy.ai/api/search-image?query=agritech%20startup%20team%20in%20Mali%20West%20Africa%2C%20young%20african%20entrepreneurs%20working%20on%20digital%20agriculture%20platform%20with%20tablets%20and%20laptops%2C%20modern%20coworking%20space%20with%20maps%20and%20data%20visualizations%20on%20walls%2C%20innovative%20tech%20startup%20atmosphere%2C%20bright%20and%20energetic%20workspace&width=600&height=380&seq=cs-startup-ml&orientation=landscape',
    duration: '6 mois',
    year: '2023',
    beforeAfter: {
      before: 'Modèle non rentable, runway 4 mois, 3K utilisateurs',
      after: '450M levés, runway 18 mois, 12K utilisateurs, expansion 5 pays'
    }
  },
  // ONG & Secteur public
  {
    id: 'cs7',
    sector: 'public',
    serviceId: 'financial-digital-inclusion',
    client: 'Ministère des Finances',
    country: 'Togo',
    flag: '🇹🇬',
    context: 'Le Togo devait élaborer sa Stratégie Nationale d\'Inclusion Financière (SNIF) 2021-2025 pour répondre aux engagements internationaux et aux objectifs de développement. Absence de données fiables sur l\'inclusion financière, coordination faible entre les 12 ministères et agences concernés, précédente tentative de SNIF (2018) restée lettre morte faute de cadre de suivi.',
    intervention: 'Diagnostic approfondi de l\'inclusion financière via enquête nationale auprès de 5 000 ménages et 200 institutions, consultations multi-acteurs avec 12 ministères, secteur privé, société civile et partenaires techniques (45 ateliers sur 3 mois), rédaction de la SNIF avec 6 axes stratégiques et 18 objectifs mesurables, conception d\'un tableau de bord de suivi avec 45 indicateurs et système de reporting trimestriel, formation de 25 cadres du ministère sur le pilotage stratégique.',
    transformation: 'SNIF 2021-2025 adoptée par décret du Conseil des Ministres avec budget alloué de 8,5 Mds FCFA. Création d\'un Comité National de Pilotage présidé par le Ministre des Finances. 3 partenaires techniques internationaux ont confirmé leur appui financier (12M€). Première revue annuelle programmée avec participation de la Banque Mondiale. Le Togo est cité comme modèle par l\'Alliance for Financial Inclusion (AFI).',
    results: [
      { value: 'SNIF 2021-2025', label: 'Adoptée par le gouvernement' },
      { value: '12', label: 'Ministères & agences impliqués' },
      { value: '45', label: 'Indicateurs de suivi définis' },
      { value: '8,5 Mds FCFA', label: 'Budget alloué' },
    ],
    tags: ['Politiques publiques', 'SNIF', 'Inclusion financière', 'Gouvernement'],
    image: 'https://readdy.ai/api/search-image?query=government%20ministry%20meeting%20room%20in%20Togo%20Lome%2C%20african%20public%20officials%20and%20consultants%20in%20formal%20conference%20setting%2C%20policy%20development%20workshop%20with%20presentations%20and%20documents%2C%20professional%20government%20building%20interior%2C%20collaborative%20policy%20making%20atmosphere&width=600&height=380&seq=cs-gov-tg&orientation=landscape',
    duration: '3 mois',
    year: '2024',
    beforeAfter: {
      before: 'Absence de SNIF opérationnelle, coordination faible',
      after: 'SNIF adoptée, 8,5Mds budget, 12M€ appuis confirmés, modèle AFI'
    }
  },
  {
    id: 'cs8',
    sector: 'public',
    serviceId: 'financial-digital-inclusion',
    client: 'ONG internationale de développement',
    country: 'Niger',
    flag: '🇳🇪',
    context: 'Programme d\'inclusion financière rurale de 15M€ ciblant 50 000 femmes dans 8 régions du Niger, arrivé en fin de phase 1. L\'ONG devait démontrer l\'impact réel du programme pour obtenir le financement de la phase 2 (20M€) auprès de bailleurs institutionnels. Absence de données d\'impact fiables et de méthodologie d\'évaluation rigoureuse.',
    intervention: 'Conception d\'une méthodologie d\'évaluation d\'impact mixte (quantitative + qualitative) conforme aux standards OCDE-CAD, enquêtes de terrain auprès de 5 200 bénéficiaires et 1 800 non-bénéficiaires (groupe de contrôle), collecte de données sur 45 indicateurs socio-économiques, analyse économétrique avec modèle de différence-de-différences, 120 entretiens qualitatifs approfondis, rapport d\'évaluation de 180 pages avec recommandations stratégiques pour la phase 2.',
    transformation: 'Résultats probants démontrés : +34% de hausse des revenus moyens, +52% d\'épargne formelle, -28% de vulnérabilité alimentaire. Sur la base de ces résultats, 2 bailleurs institutionnels ont confirmé le financement de la phase 2 (15M€ obtenus). Le programme a été étendu à 3 régions supplémentaires et 30 000 bénéficiaires additionnels. La méthodologie d\'évaluation a été adoptée par 4 autres programmes de l\'ONG dans la région.',
    results: [
      { value: '52 000', label: 'Femmes bénéficiaires évaluées' },
      { value: '+34%', label: 'Hausse revenus moyens' },
      { value: '8 régions', label: 'Couverture géographique' },
      { value: '15 M€', label: 'Phase 2 financée' },
    ],
    tags: ['Évaluation d\'impact', 'Genre', 'Inclusion financière', 'Rural'],
    image: 'https://readdy.ai/api/search-image?query=NGO%20field%20evaluation%20in%20Niger%20Africa%2C%20female%20consultant%20interviewing%20women%20beneficiaries%20in%20rural%20village%2C%20impact%20assessment%20fieldwork%2C%20authentic%20documentary%20photography%20showing%20development%20program%20evaluation%2C%20warm%20afternoon%20light%2C%20community%20gathering%20in%20sahel%20region&width=600&height=380&seq=cs-ngo-ne&orientation=landscape',
    duration: '5 mois',
    year: '2023',
    beforeAfter: {
      before: 'Absence de données d\'impact fiables',
      after: '+34% revenus, 15M€ phase 2 financée, extension 3 régions'
    }
  },
];

const sectorConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  banks: {
    label: 'Banques & Institutions financières',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'ri-bank-line',
  },
  microfinance: {
    label: 'Microfinance & FinTech',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'ri-community-line',
  },
  sme: {
    label: 'PME & Startups',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'ri-store-2-line',
  },
  public: {
    label: 'ONG & Secteur public',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    icon: 'ri-government-line',
  },
};

export function ServicesCaseStudies() {
  const [activeSector, setActiveSector] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleDownload, isDownloading } = useBrochureDownload('case-studies');

  const filtered = activeSector === 'all' ? caseStudies : caseStudies.filter((c) => c.sector === activeSector);

  return (
    <section id="case-studies" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-6">
            <i className="ri-trophy-line text-amber-600 text-sm"></i>
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Résultats obtenus</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Transformations concrètes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nous avons accompagné nos clients dans leurs défis stratégiques les plus critiques. Contexte, intervention, résultats mesurables.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveSector('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
              activeSector === 'all'
                ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:shadow-md'
            }`}
          >
            Tous les secteurs
          </button>
          {Object.entries(sectorConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setActiveSector(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
                activeSector === key
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        {/* Grille des études de cas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((cs) => {
            const cfg = sectorConfig[cs.sector];
            const isExpanded = expanded === cs.id;
            return (
              <div
                key={cs.id}
                className="rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white gradient-border glow-gold-hover"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <OptimizedImage
                    src={cs.image}
                    alt={cs.client}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    width={600}
                    height={380}
                    aspectRatio="60/38"
                    objectFit="cover"
                    loading="lazy"
                    placeholder="shimmer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  {/* Badge secteur */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.border} border backdrop-blur-sm`}>
                    <i className={`${cfg.icon} ${cfg.color} text-xs`}></i>
                    <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  {/* Pays + année */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{cs.flag}</span>
                    <span className="text-white text-sm font-semibold">{cs.country}</span>
                    <span className="text-white/70 text-xs">· {cs.year}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5">
                    <i className="ri-time-line text-white text-xs"></i>
                    <span className="text-white text-xs font-medium">{cs.duration}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4 line-clamp-2" title={cs.client}>{cs.client}</h3>

                  {/* Résultats clés */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {cs.results.map((r, i) => (
                      <div key={i} className={`rounded-xl ${cfg.bg} ${cfg.border} border p-3.5 text-center hover:shadow-md transition-shadow gradient-border glow-gold-hover`}>
                        <div className={`text-2xl font-bold ${cfg.color} mb-0.5`}>{r.value}</div>
                        <div className="text-xs text-gray-600 leading-tight font-medium">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Avant / Après */}
                  {cs.beforeAfter && (
                    <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 gradient-border glow-gold-hover">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <i className="ri-close-circle-line text-red-500 text-sm"></i>
                            <span className="font-semibold text-gray-700 uppercase tracking-wide">Avant</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{cs.beforeAfter.before}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <i className="ri-checkbox-circle-line text-emerald-500 text-sm"></i>
                            <span className="font-semibold text-gray-700 uppercase tracking-wide">Après</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{cs.beforeAfter.after}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Détails expandables - Structure Contexte / Intervention / Transformation */}
                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-2 pb-4 space-y-5">
                      {/* Contexte */}
                      <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100">
                            <i className="ri-alert-line text-red-600 text-sm"></i>
                          </div>
                          <p className="text-sm font-bold text-red-900 uppercase tracking-wide">Contexte</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{cs.context}</p>
                      </div>

                      {/* Intervention */}
                      <div className="p-4 rounded-xl bg-brand-50 border border-brand-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100">
                            <i className="ri-tools-line text-brand-600 text-sm"></i>
                          </div>
                          <p className="text-sm font-bold text-brand-900 uppercase tracking-wide">Intervention du cabinet</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{cs.intervention}</p>
                      </div>

                      {/* Transformation */}
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100">
                            <i className="ri-line-chart-line text-emerald-600 text-sm"></i>
                          </div>
                          <p className="text-sm font-bold text-emerald-900 uppercase tracking-wide">Transformation obtenue</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{cs.transformation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags + boutons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/services/${cs.serviceId}`)}
                        className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer whitespace-nowrap transition-colors"
                        title="Voir le service"
                      >
                        <i className="ri-external-link-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : cs.id)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 cursor-pointer whitespace-nowrap transition-colors"
                      >
                        {isExpanded ? 'Réduire' : 'Voir le détail'}
                        {isExpanded ? <i className="ri-arrow-up-s-line text-base" /> : <i className="ri-arrow-down-s-line text-base" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA bas de section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-5 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-2xl px-12 py-12 shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <i className="ri-chat-quote-line text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                Prêt à obtenir des résultats similaires ?
              </h3>
              <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
                Discutons de votre projet et identifions ensemble les leviers de transformation pour votre organisation.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
              >
                Réserver un diagnostic stratégique
                <i className="ri-arrow-right-line"></i>
              </a>
              <a
                href="#brochure"
                onClick={(e) => { e.preventDefault(); handleDownload(); }}
                className="inline-flex items-center gap-2 bg-white border-2 border-amber-300 text-amber-700 px-8 py-3.5 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg no-underline"
              >
                {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-download-2-line"></i>}
                Télécharger notre brochure
              </a>
            </div>
            {/* Garanties */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-amber-200">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-emerald-600 text-lg"></i>
                <span className="text-sm text-gray-600 font-medium">Confidentiel</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-emerald-600 text-lg"></i>
                <span className="text-sm text-gray-600 font-medium">30 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-hand-heart-line text-emerald-600 text-lg"></i>
                <span className="text-sm text-gray-600 font-medium">Sans engagement</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



