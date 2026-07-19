// KOS Generated Articles — Mock Data (Big Four Quality)
// 15 Articles — Indices 0-7 fixes pour les pages à accès indexé, le reste par ID

export interface ArticleSection { icon: string; title: string; content: string; highlights?: string[]; }
export interface ExecutiveInsight { summary: string; insights: string[]; underestimated_risk: string; immediate_opportunity: string; }
export interface FrameworkPillar { label: string; score: string; status: string; color: string; }
export interface ArticleFramework { name: string; icon: string; color: string; description: string; pillars: FrameworkPillar[]; }
export interface CasUsage { icon: string; title: string; description: string; impact: string; }
export interface Implication { icon: string; audience: string; content: string; }
export interface FAQItem { q: string; a: string; }
export interface ReferenceItem { authority: string; reference: string; date: string; object: string; }
export interface CTAItem { title: string; description: string; action_label: string; action_url: string; }
export interface GeneratedArticle {
  id: string; slug: string; title: string; subtitle: string; category: string;
  author: string; authorRole: string; date: string; readTime: string; tags: string[]; status: string;
  hero_image_url: string;
  executive_insight: ExecutiveInsight; sections: ArticleSection[]; framework: ArticleFramework;
  cas_usage: CasUsage[]; implications: Implication[]; faq: FAQItem[]; references: ReferenceItem[];
  executive_summary: string; cta: CTAItem;
}

const H = (seq: string, query: string) => `https://readdy.ai/api/search-image?width=1600&height=900&seq=${seq}&orientation=landscape&query=${encodeURIComponent(query)}`;

function s(icon: string, title: string, content: string, highlights?: string[]): ArticleSection { return { icon, title, content, highlights }; }
function f(name: string, icon: string, color: string, desc: string, pillars: FrameworkPillar[]): ArticleFramework { return { name, icon, color, description: desc, pillars }; }
function p(label: string, score: string, status: string, color: string): FrameworkPillar { return { label, score, status, color }; }
function c(icon: string, title: string, desc: string, impact: string): CasUsage { return { icon, title, description: desc, impact }; }
function imp(icon: string, audience: string, content: string): Implication { return { icon, audience, content }; }
function fa(q: string, a: string): FAQItem { return { q, a }; }

export const ARTICLES_GENERATED: GeneratedArticle[] = [
  // ═══ [0] Réforme Ratio Solvabilité UEMOA 2026 ═══
  {
    id: 'reforme-ratio-solvabilite-uemoa-2026', slug: 'reforme-ratio-solvabilite-uemoa-2026',
    title: 'Réforme du Ratio de Solvabilité UEMOA 2026 : Ce Que Votre Conseil doit Savoir',
    subtitle: 'La BCEAO porte le ratio minimum de 9,5% à 11,25% d\'ici janvier 2027. Impacts sur le capital réglementaire, les dividendes et l\'accès aux marchés.',
    category: 'Gouvernance & Adéquation des Fonds Propres',
    author: 'Dr. Amadou Sow', authorRole: 'Associé Gérant, Khepra Experts', date: '22 Juin 2026', readTime: '14 min',
    tags: ['Solvabilité','BCEAO','UEMOA','Bâle','FondsPropres','RégulationBancaire','ICAAP'], status: 'published',
    hero_image_url: H('hero-solvabilite','Abstract minimalist financial stability architecture warm amber cream tones clean modern'),
    executive_insight: {
      summary: 'La BCEAO relève le seuil minimum de solvabilité de 9,5% à 11,25% au 1er janvier 2027. 38% des banques UEMOA sont sous ce nouveau seuil. L\'impact agrégé est estimé à 95 milliards FCFA de fonds propres supplémentaires.',
      insights: ['38% des banques sous le nouveau seuil — 14 établissements doivent augmenter leurs fonds propres','Le coussin de conservation reste à 2,5% mais s\'applique sur les RWA révisés incluant le risque opérationnel','Les banques LBC/FT renforcée ajouteront un coussin systémique de 1 à 2,5%','La BCEAO introduit un ratio de levier minimum de 3%, une première dans l\'UEMOA'],
      underestimated_risk: '46% des banques n\'ont pas modélisé l\'impact du coussin contra-cyclique, créant un risque de déficit de 85-120 Mds FCFA.',
      immediate_opportunity: 'Les banques qui anticipent dès Q3 2026 négocieront une transition progressive et un traitement favorable des AT1 dans le Tier 1.'
    },
    sections: [
      s('ri-scales-line','1. Contexte : Pourquoi la BCEAO relève le ratio','La décision du CSF-UMOA du 12 mars 2026 s\'inscrit dans l\'harmonisation Bâle III finalisé. Le taux de NPL a grimpé de 4,2% à 6,8% entre 2020 et 2025.',['Décision CSF-UMOA 12 mars 2026','Alignement Bâle III finalisé','NPL zone : 6,8% en 2025','Approche progressive : 10,25% puis 11,25%']),
      s('ri-funds-line','2. Nouvelle Architecture des Fonds Propres','CET1 minimum 7,5% des RWA (vs 6,5%), AT1 plafonné à 1,5%, Tier 2 à 2,25%. Déductions prudentielles renforcées : participations croisées à 100%, DTA plafonnés à 10% du CET1.',['CET1 minimum 7,5%','AT1 plafonné 1,5%','Déduction 100% participations croisées']),
      s('ri-bar-chart-grouped-line','3. Impact Chiffré par Segment','Segment A (29 banques) au-dessus du seuil. Segment B (12 banques) besoin 2-8 Mds FCFA. Segment C (2 banques) situation critique. Impact agrégé : 95 Mds FCFA.',['Segment A : 29 banques OK','Segment B : 12 banques, 2-8 Mds','Segment C : 2 banques critiques']),
      s('ri-file-chart-line','4. Refonte de l\'ICAAP Obligatoire','ICAAP révisé avant le 30 septembre 2026 : 3 scénarios macro, capital économique vs réglementaire, sensibilité sectorielle, projection bénéficiaire.',['Date limite : 30 sept 2026','3 scénarios obligatoires','Pénalité Pilier 2 : +2% forfaitaire si retard']),
      s('ri-bank-line','5. Distribution de Dividendes','Distribution interdite si ratio < 11,25% sans accord. Ratio distribution max 35% si ratio < 13%.',['Distribution interdite sous seuil','Ratio distribution recommandé 35% max']),
      s('ri-global-line','6. Calendrier de Mise en Conformité','30 juin 2026 : plan de transition. 30 sept 2026 : ICAAP révisé. 31 déc 2026 : ratio 10,25%. 30 juin 2027 : ratio 11,25% (date butoir).',['Juin 2026 : Plan transition','Sept 2026 : ICAAP révisé','Déc 2026 : 10,25%','Juin 2027 : 11,25%'])
    ],
    framework: f('KHEPRA Capital Adequacy — 7 Piliers','ri-funds-box-line','#0D7B5F','Méthodologie exclusive combinant modélisation actuarielle, optimisation fiscale et dialogue structuré avec le superviseur.',[
      p('Diagnostic Ratio Actuel','85','OK','#10B981'),p('Projection RWA 2027-2029','72','À surveiller','#E8C547'),p('Optimisation CET1/AT1','60','À améliorer','#F59E0B'),
      p('Stress Tests 3 Scénarios','55','À améliorer','#F59E0B'),p('ICAAP Documenté BCEAO','68','À surveiller','#E8C547'),p('Dialogue Superviseur','78','OK','#10B981'),p('Stratégie Post-Transition','50','À améliorer','#F59E0B')
    ]),
    cas_usage: [
      c('ri-building-4-line','Banque régionale — Recapitalisation AT1','Émission AT1 de 15 Mds FCFA en 3 mois.','Ratio porté à 11,8% — conformité anticipée'),
      c('ri-currency-line','Banque — Optimisation RWA','Cession NPL 8 Mds FCFA + réallocation actifs pondérés 35%.','Réduction RWA 22%, ratio +1,8 pts')
    ],
    implications: [
      imp('ri-user-star-line','Pour les DG et Présidents','Engagez le dialogue avec la Commission Bancaire dès maintenant. Les demandes de transition sont instruites premier arrivé, premier servi.'),
      imp('ri-line-chart-line','Pour les Directeurs Financiers','Revisitez la politique de dividendes. Explorez les instruments innovants (AT1, échanges dette-equity).'),
      imp('ri-shield-check-line','Pour les Risk Managers','L\'ICAAP devient le document central. Investissez dans la modélisation des scénarios de stress.')
    ],
    faq: [
      fa('Quel est le nouveau ratio minimum ?','Le ratio passe de 9,5% à 11,25% au 1er janvier 2027, avec étape intermédiaire à 10,25%. Les banques systémiques peuvent être soumises à un coussin additionnel de 1 à 2,5%.'),
      fa('Ma banque peut-elle obtenir un report ?','Oui, report jusqu\'au 30 juin 2027 possible sur demande motivée avant le 30 septembre 2026. Plan de transition détaillé requis.'),
      fa('Quels instruments sont éligibles au CET1 ?','Capital social, réserves, report à nouveau créditeur, primes d\'émission. Les actions de préférence sans droit de vote ne sont plus éligibles.'),
      fa('Quel impact sur les dividendes ?','Distribution interdite si ratio < 11,25% sans accord. BCEAO recommande max 35% du résultat si ratio < 13%.')
    ],
    references: [
      { authority:'BCEAO',reference:'Instruction n° 001-2026/CB/C',date:'15 mars 2026',object:'Relèvement ratio minimum de solvabilité' },
      { authority:'CSF-UMOA',reference:'Communiqué n° 12/CSF/2026',date:'12 mars 2026',object:'Décision de relèvement' },
      { authority:'Commission Bancaire',reference:'Circulaire n° 003-2026/CB',date:'15 mai 2026',object:'Calendrier mise en conformité' }
    ],
    executive_summary: 'La réforme du ratio de solvabilité est la modification prudentielle la plus impactante depuis Bâle II. 38% des banques sous le seuil, effort agrégé de 95 Mds FCFA. Les banques qui traitent cette réforme comme une opportunité stratégique en sortiront renforcées en valorisation et crédibilité.',
    cta: { title:'Diagnostiquez votre ratio post-réforme en 72h',description:'KHEPRA Capital Scan modélise l\'impact de la réforme et génère un plan de transition.',action_label:'Lancer le Diagnostic Capital Scan',action_url:'/tools/diagnostic-strategique' }
  },

  // ═══ [1] Prix de Transfert — 5 Erreurs Fatales BEPS ═══
  {
    id: 'prix-transfert-beps-2026', slug: 'prix-transfert-5-erreurs-fatales-documentation-beps',
    title: 'Prix de Transfert en Afrique : 5 Erreurs Fatales dans votre Documentation BEPS',
    subtitle: '14 administrations fiscales africaines ont créé des cellules Prix de Transfert. Taux de redressement 2,8x supérieur à l\'Europe.',
    category: 'Fiscalité Internationale & Prix de Transfert',
    author: 'Dr. Jean-Marc Boka', authorRole: 'Senior Manager, Fiscalité Internationale', date: '20 Juin 2026', readTime: '13 min',
    tags: ['PrixTransfert','BEPS','OCDE','Fiscalité','Afrique','Documentation','Redressement'], status: 'published',
    hero_image_url: H('hero-prix-transfert','Abstract geometric international tax transfer pricing warm terracotta cream clean minimal'),
    executive_insight: {
      summary: '14 pays africains ont créé des cellules Prix de Transfert (vs 3 en 2020). Taux de redressement moyen : 3,7% du CA contrôlé. 5 erreurs récurrentes causent 82% des redressements. Coût moyen d\'un redressement évitable : 850 M FCFA.',
      insights: ['14 cellules PT en Afrique (vs 3 en 2020)','Redressement moyen 3,7% du CA — 2,8x le taux européen','82% des redressements fondés sur documentation insuffisante','Les services intra-groupe concentrent 45% des ajustements'],
      underestimated_risk: 'L\'échange automatique CbCR devient effectif en 2027 entre 38 pays africains membres du Cadre Inclusif. Documentation incomplète = redressements croisés.',
      immediate_opportunity: 'Régularisation spontanée possible dans 8 pays africains avant décembre 2026 : pénalités réduites de 40% à 10%.'
    },
    sections: [
      s('ri-error-warning-line','Erreur 1 : Analyse Fonctionnelle Générique','63% des documentations présentent une analyse copiée-collée. Les administrations exigent une cartographie précise des fonctions, actifs et risques par entité.',['63% analyses insuffisantes','Cartographie requise : fonctions, actifs, risques']),
      s('ri-search-line','Erreur 2 : Benchmarking Inadapté à l\'Afrique','Comparables européens sans ajustement = erreur fatale. Utilisez Orbis Africa et panels locaux. Ajustement 150-300 bps accepté si bien documenté.',['Orbis Africa et panels locaux','Ajustement 150-300 bps']),
      s('ri-file-text-line','Erreur 3 : Documentation Maître/Local Incomplète','47% des Master Files sans segmentation Afrique. 38% des Local Files sans analyse économique. CbCR absent = facteur aggravant dans 92% des redressements.',['47% Master Files sans segmentation','38% Local Files sans analyse']),
      s('ri-exchange-line','Erreur 4 : Services Intra-Groupe Non Documentés','Management fees, redevances = 45% des ajustements. 3 justifications : réalité du service, bénéfice direct, clé de répartition documentée.',['45% ajustements = services intra-groupe','3 justifications obligatoires']),
      s('ri-shield-check-line','Erreur 5 : Absence d\'APP','Moins de 12% des groupes ont sollicité un APP. 8 pays africains avec procédure APP opérationnelle. Coût APP : 50-250K EUR vs redressement moyen 1,3M EUR.',['<12% avec APP','8 pays avec procédure APP','Coût APP 50-250K vs 1,3M redressement'])
    ],
    framework: f('KHEPRA TP Documentation — 6 Piliers BEPS','ri-file-shield-line','#C2410C','Documentation Prix de Transfert alignée BEPS Actions 8-10 et 13, conçue pour le contexte africain.',[
      p('Analyse Fonctionnelle','82','OK','#10B981'),p('Benchmarking Afrique','65','À améliorer','#F59E0B'),p('Master/Local File','70','À surveiller','#E8C547'),
      p('Documentation Services','58','À améliorer','#F59E0B'),p('CbCR & Échange','75','À surveiller','#E8C547'),p('Stratégie APP/MAP','45','Critique','#DC2626')
    ]),
    cas_usage: [
      c('ri-building-2-line','Groupe agroalimentaire panafricain','Documentation PT 8 filiales 6 pays + 3 APP bilatéraux.','Économie fiscale sécurisée 1,8 Md FCFA/5 ans'),
      c('ri-global-line','Multinationale télécoms','Régularisation spontanée BEPS complet + ajustement management fees.','Pénalités 40%→10%, économie 980 M FCFA')
    ],
    implications: [
      imp('ri-user-star-line','Pour les DAF Groupe','Anticipez l\'échange automatique CbCR 2027. Vérifiez la cohérence Master File/Local Files africains.'),
      imp('ri-scales-line','Pour les Directeurs Fiscaux','Cartographiez vos transactions intra-groupe Afrique. Priorisez les pays à risque. Un APP offre sécurité 3-5 ans.')
    ],
    faq: [
      fa('Quand la documentation PT est-elle obligatoire en UEMOA ?','Depuis 2019, transactions intra-groupe > 100 M FCFA/an (50 M au Sénégal et Côte d\'Ivoire).'),
      fa('Puis-je régulariser spontanément sans pénalités ?','Oui, 8 pays africains proposent ce dispositif. Pénalités réduites de 40% à 10% si régularisation avant contrôle.')
    ],
    references: [
      { authority:'OCDE',reference:'BEPS Action 13',date:'2015/2022',object:'Standard documentation Maître/Local/CbCR' },
      { authority:'UEMOA',reference:'Directive n° 01/2019/CM/UEMOA',date:'2019',object:'Harmonisation règles PT' }
    ],
    executive_summary: 'La documentation PT en Afrique n\'est plus optionnelle. 14 cellules spécialisées, taux de redressement 2,8x l\'Europe, échange CbCR imminent. L\'investissement dans une documentation conforme (<100K EUR) est dérisoire face au coût d\'un redressement (1,3M EUR).',
    cta: { title:'Auditez votre documentation PT en 5 jours',description:'KHEPRA TP Scan analyse vos gaps BEPS et fournit une feuille de route priorisée.',action_label:'Lancer le Diagnostic TP Scan',action_url:'/prix-de-transfert' }
  },

  // ═══ [2] Préparer Conseil Administration Inspection COBAC ═══
  {
    id: 'conseil-administration-cobac-2026', slug: 'preparer-conseil-administration-inspection-cobac',
    title: 'Préparer son Conseil d\'Administration à une Inspection COBAC : Guide Pratique',
    subtitle: '68% des établissements inspectés en 2025 ont reçu des observations de gouvernance. Préparez vos administrateurs aux 12 questions critiques.',
    category: 'Gouvernance & Inspection COBAC',
    author: 'Ibrahim Kone', authorRole: 'Senior Manager, Conformité & Gouvernance', date: '18 Juin 2026', readTime: '12 min',
    tags: ['COBAC','Gouvernance','Inspection','CEMAC','ConseilAdministration','Régulation'], status: 'published',
    hero_image_url: H('hero-cobac-governance','Abstract corporate boardroom geometric shapes warm beige terracotta professional governance'),
    executive_insight: {
      summary: 'L\'inspection COBAC évalue désormais la qualité de la gouvernance au-delà de la conformité documentaire. 68% des établissements reçoivent des observations gouvernance. Un Conseil bien préparé réduit de 40% la durée d\'inspection.',
      insights: ['68% des établissements avec observations gouvernance en 2025','3 axes prioritaires 2026 : comités spécialisés, indépendance, LBC/FT','Un Conseil préparé réduit de 40% la durée d\'inspection','La COBAC vérifie la traçabilité des débats via les PV'],
      underestimated_risk: 'La COBAC peut engager la responsabilité personnelle des administrateurs. En 2025, 4 administrateurs ont été convoqués individuellement.',
      immediate_opportunity: 'Un Conseil proactif transforme l\'inspection en démonstration de maturité institutionnelle, facilitant l\'obtention d\'agréments.'
    },
    sections: [
      s('ri-search-eye-line','1. Ce que l\'Inspecteur regarde vraiment','5 blocs : Gouvernance (30% du temps), Conformité (25%), Risques (20%), LBC/FT (15%), Solidité Financière (10%).',['Gouvernance : 30%','5 blocs d\'évaluation']),
      s('ri-team-line','2. Les 12 Questions Critiques aux Administrateurs','Stratégie 3 ans, 3 risques majeurs, suivi recommandations, formation LBC/FT, qualité info financière, conflits d\'intérêts, interaction CAC...',['Question clé : qualité info financière','Question clé : refus décision DG']),
      s('ri-file-list-3-line','3. Dossier Individuel Administrateur','6 documents : nomination, CV, attestations formation, déclaration conflit d\'intérêts, registre présence, casier judiciaire < 3 mois.',['6 documents obligatoires','Casier judiciaire < 3 mois']),
      s('ri-calendar-check-line','4. Calendrier J-180 à J-0','J-180 : audit flash gouvernance. J-120 : formation Conseil. J-90 : simulation. J-60 : correction gaps. J-30 : briefing final. 40% d\'observations en moins.',['J-180 : audit flash','J-90 : simulation','J-30 : briefing']),
      s('ri-alert-line','5. Les 5 Pièges à Éviter','PV aseptisés = mauvaise note. Conseil qui ne contredit jamais la DG = alerte. Absentéisme >25% = observation automatique.',['PV aseptisés','Conseil passif','Absentéisme >25%'])
    ],
    framework: f('KHEPRA Governance Readiness — 7 Piliers','ri-organization-chart','#7C3AED','Préparation Conseil à l\'inspection COBAC, développée avec d\'anciens inspecteurs. Testée sur 30+ établissements.',[
      p('Composition & Indépendance','78','OK','#10B981'),p('Comités Spécialisés','65','À améliorer','#F59E0B'),p('Dossiers Complets','72','À surveiller','#E8C547'),
      p('PV Qualitatifs','60','À améliorer','#F59E0B'),p('Formation Continue','55','À améliorer','#F59E0B'),p('LBC/FT Conseil','80','OK','#10B981'),p('Auto-évaluation','40','Critique','#DC2626')
    ]),
    cas_usage: [
      c('ri-bank-line','Banque CEMAC — Préparation Conseil','Simulation avec 3 anciens inspecteurs. 12 administrateurs formés en 2 jours.','-47% observations gouvernance'),
      c('ri-building-4-line','Microfinance — Mise à niveau','Dossiers administrateurs + formation LBC/FT Conseil en 4 semaines.','Aucune observation gouvernance')
    ],
    implications: [
      imp('ri-user-star-line','Pour les Présidents de Conseil','L\'inspecteur évalue votre leadership. Préparez une note personnelle sur votre vision de la gouvernance.'),
      imp('ri-shield-check-line','Pour les Secrétaires de Conseil','Les PV doivent refléter la richesse des débats. Chaque décision doit être motivée et tracée.')
    ],
    faq: [
      fa('Combien de temps dure une inspection COBAC ?','3 à 6 semaines sur place + 2-3 semaines de préparation documentaire off-site.'),
      fa('Les administrateurs sont-ils auditionnés individuellement ?','Oui. Président, Présidents de comités et 3-5 administrateurs sont auditionnés 45-60 min chacun.')
    ],
    references: [
      { authority:'COBAC',reference:'Règlement R-2016/01',date:'2016',object:'Gouvernance établissements de crédit' },
      { authority:'COBAC',reference:'Circulaire C-2019/02',date:'2019',object:'Guide méthodologique inspection sur place' }
    ],
    executive_summary: 'L\'inspection COBAC est un exercice stratégique. 68% des établissements reçoivent des observations gouvernance. Notre méthodologie réduit de 40% les observations. Le coût (15-25 M FCFA) est négligeable face au risque de blocage d\'agrément.',
    cta: { title:'Préparez votre Conseil en 30 jours',description:'Programme Governance Readiness : audit flash + simulation + dossiers administrateurs.',action_label:'Démarrer la Préparation',action_url:'/services/gouvernance-fiscalite-internationale' }
  },

  // ═══ [3] ESG Banques Africaines Standards ISSB ═══
  {
    id: 'esg-issb-banques-africaines-2026', slug: 'esg-banques-africaines-standards-issb',
    title: 'Normes ISSB pour Banques Africaines : Guide de Conformité ESG 2026',
    subtitle: '76% des banques africaines cotées ne publient pas de rapport ESG conforme. Comment transformer cette contrainte en avantage compétitif.',
    category: 'ESG & Finance Durable',
    author: 'Dr. Aminata Diallo', authorRole: 'Senior Manager, ESG & Sustainability', date: '16 Juin 2026', readTime: '14 min',
    tags: ['ESG','ISSB','IFRS','Banques','Afrique','Climat','Sustainability'], status: 'published',
    hero_image_url: H('hero-esg-issb','Abstract sustainable finance geometric leaf shapes warm green cream clean modern ESG investing'),
    executive_insight: {
      summary: 'IFRS S1 et S2 de l\'ISSB deviennent la référence mondiale. 76% des banques africaines cotées non alignées. Les banques alignées bénéficient d\'un spread réduit de 15-25 bps sur les obligations vertes.',
      insights: ['76% des banques africaines cotées sans reporting ESG aligné ISSB','Le Scope 3 bancaire (portefeuille de prêts) est le défi majeur','Spread réduit de 15-25 bps pour banques alignées','L\'IFC et la BAD conditionnent leurs lignes de crédit au reporting ISSB d\'ici 2027'],
      underestimated_risk: '12-18% des expositions corporate présentent un risque de transition significatif non couvert par les provisions IFRS 9.',
      immediate_opportunity: 'Prime first mover de 20-30 bps sur les prochaines émissions obligataires pour les premiers rapports ISSB 2026.'
    },
    sections: [
      s('ri-file-text-line','1. IFRS S1 et S2 : Ce Qui Change','IFRS S1 : divulguer tous les risques et opportunités de durabilité. IFRS S2 : émissions Scope 1-2-3 + scénarios climatiques (dont 1,5°C).',['IFRS S1 : risques durabilité','IFRS S2 : émissions + scénarios climat']),
      s('ri-bank-line','2. Spécificités Banques Africaines','Défis : données ESG PME limitées, pas de taxonomie verte africaine. Atouts : fort financement énergies renouvelables, exposition fossile plus faible.',['Défi : données ESG PME','Atout : financement énergies vertes']),
      s('ri-pie-chart-line','3. Scope 3 Bancaire : Mesurer l\'Empreinte','Méthodologie PCAF. Émissions financées = 100-500x émissions directes. Règle 20/80 : se concentrer sur les plus gros émetteurs.',['PCAF : méthodologie référence','Émissions financées = 100-500x directes']),
      s('ri-leaf-line','4. Roadmap 2026-2028','2026 : Gap analysis + Scope 1/2. 2027 : Scope 3 PCAF + matérialité. 2028 : Rapport ISSB audité.',['2026 : Gap analysis','2027 : Scope 3','2028 : Rapport audité'])
    ],
    framework: f('KHEPRA ESG Readiness — 6 Piliers ISSB','ri-leaf-line','#15803D','Mise en conformité ISSB pour banques africaines, intégrant les spécificités du contexte réglementaire africain.',[
      p('Gouvernance ESG','72','À surveiller','#E8C547'),p('Stratégie & Risques Climat','60','À améliorer','#F59E0B'),p('Gestion Risques ESG','68','À surveiller','#E8C547'),
      p('Métriques Scope 1-2-3','45','Critique','#DC2626'),p('Reporting ISSB','40','Critique','#DC2626'),p('Assurance Externe','35','Critique','#DC2626')
    ]),
    cas_usage: [
      c('ri-building-4-line','Banque panafricaine cotée','Déploiement ISSB 18 mois, Scope 3 PCAF sur 800 Mds FCFA.','Spread -22 bps, économie 440 M FCFA/an'),
      c('ri-global-line','Banque régionale — Accès IFC','Mise en conformité accélérée pour ligne verte IFC 50 M EUR.','Ligne débloquée en 6 mois (vs 12-18)')
    ],
    implications: [
      imp('ri-user-star-line','Pour les DG et DAF','L\'alignement ISSB réduit le coût de financement de 15-25 bps. Planifiez votre roadmap pour la prochaine émission.'),
      imp('ri-leaf-line','Pour les Risk Managers','Intégrez le risque climatique dans l\'ICAAP. La BCEAO et la COBAC pourraient l\'intégrer au Pilier 2 d\'ici 2028.')
    ],
    faq: [
      fa('Les normes ISSB sont-elles obligatoires en Afrique ?','Pas encore réglementairement, mais deviennent une exigence de facto pour l\'accès aux marchés internationaux et lignes DFI.'),
      fa('Quel est le coût d\'une mise en conformité ?','150 000 à 500 000 EUR selon la taille, largement compensé par le gain sur les spreads (15-25 bps).')
    ],
    references: [
      { authority:'ISSB/IFRS',reference:'IFRS S1',date:'Juin 2023',object:'Exigences générales durabilité' },
      { authority:'ISSB/IFRS',reference:'IFRS S2',date:'Juin 2023',object:'Divulgations liées au climat' }
    ],
    executive_summary: 'Les normes ISSB sont un changement de paradigme. 76% des banques non alignées. L\'investissement conformité (150-500K EUR) est compensé par la réduction des spreads (15-25 bps). Le Scope 3 est le défi technique mais aussi la plus grande source de différenciation.',
    cta: { title:'Évaluez votre maturité ISSB en 48h',description:'KHEPRA ESG Scan évalue votre alignement 6 piliers ISSB.',action_label:'Lancer l\'ESG Scan',action_url:'/tools/diagnostic-esg-impact' }
  },

  // ═══ [4] Digitalisation SFD — Modèle BCEAO ═══
  {
    id: 'digitalisation-sfd-bceao-2026', slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
    title: 'Digitalisation des SFD : Le Modèle BCEAO pour l\'Inclusion Financière 2026',
    subtitle: 'Objectif BCEAO : inclusion financière de 62% à 80% d\'ici 2028. Fonds Digital SFD de 25 Mds FCFA disponible.',
    category: 'Microfinance & Inclusion Financière',
    author: 'Dr. Amadou Sow', authorRole: 'Associé Gérant, Khepra Experts', date: '14 Juin 2026', readTime: '13 min',
    tags: ['SFD','Digitalisation','BCEAO','InclusionFinancière','Microfinance','UEMOA'], status: 'published',
    hero_image_url: H('hero-sfd-digital','Abstract digital financial inclusion geometric network nodes warm amber cream microfinance technology'),
    executive_insight: {
      summary: 'La BCEAO vise 80% d\'inclusion financière d\'ici 2028. Stratégie en 4 piliers : interopérabilité IMCEC, bac à sable fintech, cybersécurité SFD, Fonds Digital 25 Mds FCFA finançant 60% des coûts de transformation.',
      insights: ['Objectif : inclusion financière 62%→80% d\'ici 2028','Fonds Digital SFD : 25 Mds FCFA, financement 60-70%','47% des SFD sans plan de transformation digitale','8 projets fintech déjà en test dans le bac à sable BCEAO'],
      underestimated_risk: 'Les SFD digitalisés subissent 3,5x plus de tentatives de cyberattaques. Sans cadre adapté, risque de fraude et violation de données.',
      immediate_opportunity: 'Les 10 premiers SFD à déposer avant septembre 2026 bénéficient d\'une bonification à 70% de cofinancement.'
    },
    sections: [
      s('ri-smartphone-line','1. Vision BCEAO : Écosystème Interopérable','Plateforme interopérabilité SFD (Q2 2027), référentiel KYC centralisé, API standardisées fintechs, cloud réglementaire BCEAO.',['Plateforme Q2 2027','Référentiel KYC','API fintechs']),
      s('ri-shield-check-line','2. Cybersécurité SFD : Référentiel BCEAO','RSSI obligatoire >50K clients. Audit sécurité annuel. Authentification forte >500K FCFA. PCA SI testé semestriellement. Conformité déc 2027.',['RSSI >50K clients','Audit annuel','2FA >500K']),
      s('ri-funds-line','3. Fonds Digital SFD','25 Mds FCFA. Financement 60% (70% avant sept 2026). Projets éligibles : core banking, app mobile, cybersécurité, formation. Instruction 45 jours.',['Financement 60-70%','4 types projets','Instruction 45 jours']),
      s('ri-line-chart-line','4. ROI Digitalisation','Coût/client -35 à -50%. Productivité agent +40%. PAR 30 -3 à -5 pts. ROI médian 18 mois. Coût total 40-80 M FCFA pour SFD 15K clients.',['-35% coût/client','+40% productivité','ROI 18 mois'])
    ],
    framework: f('KHEPRA SFD Digital Maturity — 7 Piliers','ri-smartphone-line','#D97706','Évaluation maturité digitale SFD alignée stratégie BCEAO 2026-2028.',[
      p('Core Banking Digital','68','À surveiller','#E8C547'),p('Canaux Digitaux','55','À améliorer','#F59E0B'),p('Cybersécurité SFD','42','Critique','#DC2626'),
      p('KYC & Données','60','À améliorer','#F59E0B'),p('Scoring Digital','50','À améliorer','#F59E0B'),p('Compétences Digitales','48','Critique','#DC2626'),p('PCA & Résilience','40','Critique','#DC2626')
    ]),
    cas_usage: [
      c('ri-building-4-line','SFD 40K clients — Transformation','Core banking + app mobile + scoring crédit en 9 mois, cofinancé 60%.','PAR 30 -5 pts, +28% clients'),
      c('ri-smartphone-line','Réseau SFD — Mobile Money','Intégration IMCEC + API mobile money pour collecte digitale.','Recouvrement +12 points')
    ],
    implications: [
      imp('ri-user-star-line','Pour les DG de SFD','Fonds Digital : premier arrivé, premier servi. Déposez avant septembre 2026 pour le taux bonifié 70%.'),
      imp('ri-shield-check-line','Pour les DSI SFD','Référentiel cybersécurité = nouveau standard. Un incident peut entraîner une suspension d\'agrément digital.')
    ],
    faq: [
      fa('Mon SFD est-il éligible au Fonds Digital ?','Tous les SFD agréés BCEAO. Les SFD <5 000 clients peuvent déposer en groupé via leur association.'),
      fa('Quel délai de transformation ?','6 à 12 mois. La phase de cadrage et choix de solution (2-3 mois) est la plus critique.')
    ],
    references: [
      { authority:'BCEAO',reference:'Stratégie Digitalisation SFD 2026-2028',date:'Février 2026',object:'Cadre stratégique' },
      { authority:'BCEAO',reference:'Référentiel Cybersécurité SFD',date:'Mars 2026',object:'Normes sécurité' }
    ],
    executive_summary: 'La digitalisation est la priorité n°1 BCEAO 2026-2028. 25 Mds FCFA disponibles, ROI médian 18 mois. Les SFD qui tardent risquent de perdre des parts de marché et de se retrouver en non-conformité cybersécurité fin 2027.',
    cta: { title:'Évaluez votre maturité digitale en 15 min',description:'KHEPRA SFD Digital Scan diagnostique votre niveau et génère une feuille de route.',action_label:'Lancer le SFD Digital Scan',action_url:'/tools/diagnostic-transformation-digitale' }
  },

  // ═══ [5] Audit Algorithmes Credit Scoring ═══
  {
    id: 'audit-credit-scoring-2026', slug: 'audit-algorithmes-credit-scoring-exigences-bceao-banques-fintechs-uemoa-2026',
    title: 'Audit des Algorithmes de Credit Scoring : Exigences BCEAO pour Banques et Fintechs',
    subtitle: 'La BCEAO publiera sa directive en septembre 2026. 62% des banques et 78% des fintechs ne sont pas prêtes.',
    category: 'Gouvernance des Données & Intelligence Artificielle',
    author: 'Dr. Amadou Sow', authorRole: 'Associé Gérant, Khepra Experts', date: '28 Juin 2026', readTime: '15 min',
    tags: ['CreditScoring','BCEAO','IA','Algorithme','Fintech','Audit','Gouvernance'], status: 'published',
    hero_image_url: H('hero-credit-scoring','Abstract algorithm data governance geometric circuit patterns warm amber cream AI audit'),
    executive_insight: {
      summary: 'La directive BCEAO sur l\'audit des algorithmes de credit scoring impose 3 exigences : explicabilité, équité algorithmique et robustesse statistique. 62% des banques sans audit indépendant. Mise en conformité au 31 décembre 2026.',
      insights: ['Directive attendue septembre 2026, conformité déc 2026','62% des banques sans audit algorithmique documenté','3 piliers : explicabilité, équité, robustesse','78% des fintechs utilisent des modèles boîte noire'],
      underestimated_risk: 'Un modèle discriminatoire expose à des sanctions jusqu\'à 2% du CA annuel + risque réputationnel majeur.',
      immediate_opportunity: 'Un modèle audité et certifié est un argument commercial puissant pour les clients corporate et partenaires fintechs.'
    },
    sections: [
      s('ri-file-text-line','1. Cadre Réglementaire à Venir','3 principes : explicabilité (décisions explicables au client), équité (tests de biais discriminatoires), robustesse (validation statistique annuelle). Inspiré du RGPD et guidelines Bâle.',['Explicabilité, équité, robustesse','Inspiré RGPD + Bâle']),
      s('ri-cpu-line','2. Modèles Concernés','Scoring, pricing, recouvrement, segmentation marketing. Modèles internes ET externes (fintechs). Modèles boîte noire : documentation SHAP/LIME requise.',['4 types modèles','Internes + externes','SHAP/LIME pour boîtes noires']),
      s('ri-search-line','3. Méthodologie Audit KHEPRA','5 dimensions : Qualité Données, Performance Statistique (Gini, KS, PSI), Explicabilité (variables, impact), Équité (tests biais), Gouvernance (validation, versions). Score min recommandé : 70/100.',['5 dimensions','Score min 70/100','PSI obligatoire'])
    ],
    framework: f('KHEPRA Algorithm Audit — 5 Dimensions','ri-cpu-line','#0D7B5F','Référentiel d\'audit algorithmes credit scoring : données, performance, explicabilité, équité, gouvernance.',[
      p('Qualité Données','75','À surveiller','#E8C547'),p('Performance Statistique','82','OK','#10B981'),p('Explicabilité (XAI)','55','À améliorer','#F59E0B'),
      p('Équité Algorithmique','58','À améliorer','#F59E0B'),p('Gouvernance Modèles','62','À améliorer','#F59E0B')
    ]),
    cas_usage: [
      c('ri-bank-line','Banque régionale — Audit 4 modèles','Audit complet 4 modèles (particuliers, PME, crédit-bail, découvert) en 6 semaines.','Correction biais géographique impactant 8% décisions'),
      c('ri-smartphone-line','Fintech lending — Conformité','Documentation SHAP/LIME pour 2 modèles XGBoost, certification équité.','Conformité anticipée 4 mois')
    ],
    implications: [
      imp('ri-user-star-line','Pour les Chief Data Officers','Constituez un registre de tous vos modèles en production. Identifiez ceux impactant les décisions crédit.'),
      imp('ri-shield-check-line','Pour les Risk Managers','L\'audit algorithmique est un exercice de risk management. Intégrez-le dans votre reporting COMEX.')
    ],
    faq: [
      fa('Quand la directive entre-t-elle en vigueur ?','Publication septembre 2026, mise en conformité 31 décembre 2026. Commencez vos audits dès maintenant.'),
      fa('Quelles sanctions ?','Avertissement, mise en demeure, restriction d\'utilisation, amendes jusqu\'à 2% du CA annuel.')
    ],
    references: [
      { authority:'BCEAO',reference:'Projet Directive — Gouvernance Algorithmes',date:'Sept 2026',object:'Encadrement algorithmes' },
      { authority:'UE',reference:'RGPD Article 22',date:'2018',object:'Décisions automatisées' }
    ],
    executive_summary: 'La directive BCEAO va transformer le crédit digital en UEMOA. 62% des banques non préparées. Un modèle audité devient un actif stratégique. Lancez votre audit dès Q3 2026.',
    cta: { title:'Auditez vos modèles en 30 jours',description:'Audit complet + certification KHEPRA Algorithm Audit.',action_label:'Démarrer l\'Audit',action_url:'/diagnostic-flash' }
  },

  // ═══ [6] LBC/FT Nouvelles Exigences GAFI 2026 ═══
  {
    id: 'lbcft-gafi-2026', slug: 'lbcft-nouvelles-exigences-gafi-2026',
    title: 'LBC/FT : Nouvelles Exigences GAFI 2026 — Êtes-Vous Prêts ?',
    subtitle: '7 modifications majeures aux 40 Recommandations GAFI. Transposition BCEAO/COBAC d\'ici décembre 2026.',
    category: 'Conformité & LBC/FT',
    author: 'Ibrahim Kone', authorRole: 'Senior Manager, Conformité & LBC/FT', date: '12 Juin 2026', readTime: '14 min',
    tags: ['LBCFT','GAFI','Conformité','BCEAO','COBAC','Blanchiment','FinancementTerrorisme'], status: 'published',
    hero_image_url: H('hero-lbcft','Abstract compliance regulatory geometric shield shapes warm terracotta cream anti money laundering'),
    executive_insight: {
      summary: 'Le GAFI a publié 7 modifications majeures en mars 2026 : actifs virtuels, bénéficiaires effectifs, financement de la prolifération. Transposition BCEAO/COBAC d\'ici décembre 2026. Sanctions personnelles pour dirigeants en cas de défaillance grave.',
      insights: ['7 modifications GAFI publiées mars 2026','Crypto-transactions >1 000 EUR soumises à déclaration','Registre central bénéficiaires effectifs obligatoire juin 2027','Sanctions personnelles dirigeants : jusqu\'à 5% du CA'],
      underestimated_risk: 'Les nouvelles sanctions personnelles pour dirigeants changent la donne. Responsabilité pénale individuelle en cas de défaillance grave.',
      immediate_opportunity: 'Les établissements qui anticipent bénéficient du régime de « compliance volontaire » avec période de transition favorable.'
    },
    sections: [
      s('ri-currency-line','1. Actifs Virtuels : Le Grand Tournant','Recommandation 15 révisée : toutes transactions crypto >1 000 EUR soumises LBC/FT. Plateformes d\'échange = institutions financières. Adoption crypto Afrique : +1 200%/an.',['Seuil 1 000 EUR','Plateformes = institutions financières','Adoption Afrique +1 200%/an']),
      s('ri-user-search-line','2. Bénéficiaires Effectifs','Recommandation 24 révisée : registre central public obligatoire. Seuil de déclenchement abaissé de 25% à 10%. Sanctions : amende jusqu\'à 1M EUR + prison.',['Seuil 10%','Registre public','Amende 1M EUR']),
      s('ri-global-line','3. Pays Liste Grise : Due Diligence Renforcée','Recommandation 19 révisée : due diligence renforcée automatique pour pays liste grise. 3 pays africains concernés. Classification automatique des transactions.',['3 pays africains liste grise','Classification automatique'])
    ],
    framework: f('KHEPRA LBC/FT Compliance — 8 Piliers','ri-shield-check-line','#B91C1C','Conformité LBC/FT alignée 40 Recommandations GAFI 2026 et réglementations BCEAO/COBAC.',[
      p('Gouvernance LBC/FT','78','OK','#10B981'),p('KYC & Due Diligence','72','À surveiller','#E8C547'),p('Déclaration Soupçon','68','À surveiller','#E8C547'),
      p('Bénéficiaires Effectifs','55','À améliorer','#F59E0B'),p('Actifs Virtuels','30','Critique','#DC2626'),p('Surveillance Transactions','74','À surveiller','#E8C547'),
      p('Formation','65','À améliorer','#F59E0B'),p('Contrôle Interne','70','À surveiller','#E8C547')
    ]),
    cas_usage: [
      c('ri-bank-line','Banque régionale — Mise à niveau GAFI','Audit flash + mise à jour procédures + formation 120 collaborateurs en 8 semaines.','Score conformité +18 points'),
      c('ri-building-4-line','Institution — Registre BE','Registre central bénéficiaires effectifs pour 2 500 entités juridiques.','100% dossiers vérifiés en 3 mois')
    ],
    implications: [
      imp('ri-user-star-line','Pour les Responsables Conformité','Transposition Q4 2026. Commencez votre gap analysis. Priorité : actifs virtuels et bénéficiaires effectifs.'),
      imp('ri-alert-line','Pour les DG','Votre responsabilité pénale peut être engagée. Investissez dans la conformité comme une assurance.')
    ],
    faq: [
      fa('Quand les normes GAFI entrent-elles en vigueur en UEMOA ?','Transposition BCEAO d\'ici décembre 2026. Anticipez dès maintenant.'),
      fa('Les crypto-actifs sont-ils concernés même sans service crypto ?','Oui, si vos clients effectuent des transactions avec des plateformes crypto, obligation de vigilance.')
    ],
    references: [
      { authority:'GAFI',reference:'40 Recommandations révisées',date:'Mars 2026',object:'Normes internationales LBC/FT' },
      { authority:'BCEAO',reference:'Instruction 008-05-2015',date:'2015',object:'Dispositif LBC/FT UEMOA' }
    ],
    executive_summary: 'La révision GAFI 2026 est la plus importante depuis 2012. 7 modifications majeures, sanctions personnelles dirigeants. Transposition BCEAO/COBAC d\'ici décembre 2026. Agissez maintenant.',
    cta: { title:'Évaluez votre conformité LBC/FT en 48h',description:'KHEPRA LBC/FT Scan compare votre dispositif aux 40 Recommandations GAFI 2026.',action_label:'Lancer le LBC/FT Scan',action_url:'/tools/diagnostic-lbcft' }
  },

  // ═══ [7] Cybersécurité Bancaire COBAC 2027 ═══
  {
    id: 'cybersecurite-cobac-2027', slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
    title: 'Cybersécurité Bancaire : La Directive COBAC 2027 sur la Résilience Opérationnelle',
    subtitle: 'SOC 24/7, tests d\'intrusion annuels, notification incidents sous 24h. Inspiré de DORA. Votre établissement est-il prêt ?',
    category: 'Cybersécurité & Résilience',
    author: 'Ibrahim Kone', authorRole: 'Senior Manager, Conformité & Cybersécurité', date: '29 Juin 2026', readTime: '13 min',
    tags: ['Cybersécurité','COBAC','RésilienceOpérationnelle','CEMAC','BanqueAfrique'], status: 'published',
    hero_image_url: H('hero-cyber-cobac','Abstract cybersecurity digital shield geometric hexagonal patterns warm crimson cream banking security'),
    executive_insight: {
      summary: 'La COBAC prépare une directive cybersécurité inspirée de DORA (UE) : tests d\'intrusion annuels, SOC 24/7 pour systémiques, notification incidents sous 24h. Publication Q1 2027, entrée en vigueur 2027-2028.',
      insights: ['Directive COBAC cybersécurité : Q1 2027','Tests d\'intrusion annuels obligatoires','SOC 24/7 pour établissements systémiques','Notification incidents sous 24h (vs 72h)'],
      underestimated_risk: 'Cyberattaques banques africaines : +238% en 2025. Coût moyen violation : 2,8M EUR + sanctions COBAC jusqu\'à 5% du CA.',
      immediate_opportunity: 'SOC mutualisé entre plusieurs banques : réduction coûts de 40-60%. La COBAC encourage cette approche collaborative.'
    },
    sections: [
      s('ri-shield-keyhole-line','1. Architecture Directive','5 piliers : Gouvernance (RSSI rattaché DG), Protection SI, Détection/Réponse (SOC 24/7, notification 24h), Tests Résilience (pentest annuel), Gestion Tiers. 18 mois pour conformité.',['5 piliers','RSSI rattaché DG','18 mois']),
      s('ri-radar-line','2. SOC 24/7','Surveillance continue, détection temps réel, analyse incidents, réponse/confinement, reporting COBAC. Coût : 500K-1,5M EUR/an. Mutualisation : -40 à -60%.',['SOC internalisé ou externalisé','500K-1,5M EUR/an','Mutualisation -40 à -60%']),
      s('ri-bug-line','3. Tests d\'Intrusion Obligatoires','Pentest annuel complet : infra, applications, API, ingénierie sociale. Prestataire certifié indépendant. Vulnérabilités critiques corrigées <30 jours. Red Team tous les 2 ans (systémiques).',['Pentest annuel','Prestataire certifié','Correction <30 jours'])
    ],
    framework: f('KHEPRA Cyber Resilience — 8 Piliers COBAC','ri-shield-flash-line','#BE123C','Référentiel cybersécurité bancaire aligné future directive COBAC 2027.',[
      p('Gouvernance Cyber','70','À surveiller','#E8C547'),p('Protection SI','65','À améliorer','#F59E0B'),p('Détection SOC','40','Critique','#DC2626'),
      p('Réponse Incidents','55','À améliorer','#F59E0B'),p('Tests & Exercices','45','Critique','#DC2626'),p('Gestion Tiers','60','À améliorer','#F59E0B'),
      p('PCA/PRA SI','68','À surveiller','#E8C547'),p('Reporting COBAC','58','À améliorer','#F59E0B')
    ]),
    cas_usage: [
      c('ri-bank-line','Banque systémique — SOC mutualisé','SOC mutualisé 4 banques, 24/7, certifié ISO 27001.','Coût/banque -55% (680K vs 1,5M EUR/an)'),
      c('ri-shield-check-line','Établissement — Pentest complet','Pentest + Red Team scénario ransomware.','12 vulnérabilités critiques corrigées avant date butoir')
    ],
    implications: [
      imp('ri-user-star-line','Pour les DG et DSI','Recrutez un RSSI dès maintenant. Explorez la mutualisation SOC. Le coût de l\'inaction = 10x l\'investissement.'),
      imp('ri-alert-line','Pour les Risk Managers','Intégrez le risque cyber dans la cartographie des risques majeurs. Un incident = crise de liquidité en 48h.')
    ],
    faq: [
      fa('Quand la directive entre-t-elle en vigueur ?','Publication Q1 2027, entrée en vigueur progressive sur 18 mois. Systémiques : 12 mois pour SOC et pentest.'),
      fa('Puis-je externaliser mon SOC ?','Oui, auprès d\'un prestataire certifié (ISO 27001, CREST). Obligatoirement basé CEMAC ou pays avec accord COBAC.')
    ],
    references: [
      { authority:'COBAC',reference:'Projet Directive Cybersécurité',date:'Q1 2027',object:'Encadrement cybersécurité CEMAC' },
      { authority:'UE',reference:'Règlement DORA',date:'2025',object:'Résilience opérationnelle numérique' }
    ],
    executive_summary: 'Directive COBAC 2027 = changement de paradigme. SOC 24/7, pentest annuel, notification 24h. Coût conformité : 800K-2,5M EUR. Coût incident cyber : 2,8M EUR. La mutualisation SOC est votre meilleure option.',
    cta: { title:'Diagnostiquez votre maturité cyber en 72h',description:'KHEPRA Cyber Scan évalue votre alignement 8 piliers COBAC.',action_label:'Lancer le Cyber Scan',action_url:'/tools/evaluation-cybersecurite' }
  }
];





