import type { DiagnosticAxisConfig } from '../components/types';

const PRIMARY = '#059669';
const ACCENT = '#d97706';
const ROSE = '#e11d48';

export const INCLUSION_FINANCIERE_AXES: DiagnosticAxisConfig[] = [
  {
    id: 'conformite-reglementaire',
    titleFr: 'Conformité Réglementaire',
    titleEn: 'Regulatory Compliance',
    descriptionFr: 'Agrément, ratios prudentiels, reporting réglementaire, contrôle interne, dispositif LBC/FT',
    descriptionEn: 'Licensing, prudential ratios, regulatory reporting, internal control, AML/CFT framework',
    icon: 'ri-file-shield-2-line',
    color: PRIMARY,
    weight: 25,
    questions: [
      {
        id: 'if-cr-1',
        questionFr: "Êtes-vous agréé par la BCEAO ou l'autorité de tutelle compétente, avec tous les agréments requis pour vos activités actuelles ?",
        questionEn: "Are you licensed by the BCEAO or the relevant supervisory authority, with all required authorizations for your current activities?",
        axisId: 'conformite-reglementaire',
        options: [
          { value: 100, labelFr: 'Agrément complet obtenu, tous les agréments spécifiques requis sont en règle, documentation à jour', labelEn: 'Full license obtained, all required specific authorizations in order, documentation up to date' },
          { value: 60, labelFr: 'Agrément principal obtenu mais certains agréments spécifiques en cours ou en attente', labelEn: 'Main license obtained but some specific authorizations in progress or pending' },
          { value: 25, labelFr: "Agrément en cours d'instruction, pas encore obtenu ou expiré", labelEn: 'License under review, not yet obtained or expired' },
          { value: 0, labelFr: "Aucun agrément — l'institution opère sans autorisation réglementaire", labelEn: 'No license — the institution operates without regulatory authorization' },
        ],
      },
      {
        id: 'if-cr-2',
        questionFr: 'Respectez-vous les ratios prudentiels imposés par la réglementation en vigueur (solvabilité, liquidité, division des risques) ?',
        questionEn: 'Do you comply with the prudential ratios imposed by current regulations (solvency, liquidity, risk diversification)?',
        axisId: 'conformite-reglementaire',
        options: [
          { value: 100, labelFr: 'Tous les ratios sont respectés avec une marge confortable, calculs automatisés, reporting mensuel au Conseil', labelEn: 'All ratios met with comfortable margin, automated calculations, monthly Board reporting' },
          { value: 60, labelFr: 'Ratios globalement respectés mais certains proches de la limite, suivi manuel', labelEn: 'Ratios generally met but some close to the limit, manual monitoring' },
          { value: 25, labelFr: 'Plusieurs ratios non respectés ou non calculés régulièrement, pas de suivi formalisé', labelEn: 'Several ratios not met or not regularly calculated, no formal monitoring' },
          { value: 0, labelFr: 'Aucun suivi des ratios prudentiels, non-conformité majeure', labelEn: 'No prudential ratio monitoring, major non-compliance' },
        ],
      },
      {
        id: 'if-cr-3',
        questionFr: 'Produisez-vous et transmettez-vous les états financiers et rapports réglementaires dans les délais impartis ?',
        questionEn: 'Do you produce and submit financial statements and regulatory reports within the required deadlines?',
        axisId: 'conformite-reglementaire',
        options: [
          { value: 100, labelFr: 'Tous les reportings sont produits et transmis dans les délais, processus automatisés, zéro retard sur 12 mois', labelEn: 'All reports produced and submitted on time, automated processes, zero delays in 12 months' },
          { value: 60, labelFr: 'Majorité des reportings dans les délais mais quelques retards occasionnels (< 5 jours)', labelEn: 'Majority of reports on time but occasional delays (< 5 days)' },
          { value: 25, labelFr: 'Retards fréquents dans la production des reportings, processus manuels, données parfois incomplètes', labelEn: 'Frequent delays in report production, manual processes, sometimes incomplete data' },
          { value: 0, labelFr: 'Reportings non produits ou systématiquement en retard, risque de sanctions réglementaires', labelEn: 'Reports not produced or systematically late, risk of regulatory sanctions' },
        ],
      },
      {
        id: 'if-cr-4',
        questionFr: 'Disposez-vous d\'un système de contrôle interne documenté, conforme aux normes COSO et validé par le Conseil ?',
        questionEn: 'Do you have a documented internal control system, compliant with COSO standards and validated by the Board?',
        axisId: 'conformite-reglementaire',
        options: [
          { value: 100, labelFr: 'SCI complet documenté, aligné COSO, testé annuellement, rapport présenté au CA, audité par un tiers indépendant', labelEn: 'Complete ICS documented, COSO-aligned, tested annually, report presented to Board, independently audited' },
          { value: 60, labelFr: 'SCI documenté mais non testé formellement, alignement COSO partiel, rapport ponctuel au CA', labelEn: 'ICS documented but not formally tested, partial COSO alignment, occasional Board report' },
          { value: 25, labelFr: 'Contrôles informels, documentation lacunaire, pas de cartographie des risques associée', labelEn: 'Informal controls, deficient documentation, no associated risk mapping' },
          { value: 0, labelFr: 'Pas de système de contrôle interne formalisé, absence totale de cadre de référence', labelEn: 'No formalized internal control system, total absence of reference framework' },
        ],
      },
      {
        id: 'if-cr-5',
        questionFr: 'Avez-vous mis en place un dispositif LBC/FT opérationnel (KYC, déclaration de soupçon, formation, correspondant désigné) ?',
        questionEn: 'Have you implemented an operational AML/CFT system (KYC, suspicious transaction reporting, training, designated officer)?',
        axisId: 'conformite-reglementaire',
        options: [
          { value: 100, labelFr: 'Dispositif LBC/FT complet : procédures KYC documentées, système de détection automatisé, correspondant désigné, formation annuelle 100% du personnel, 0 grief GAFI/GIABA', labelEn: 'Complete AML/CFT system: documented KYC procedures, automated detection system, designated officer, annual 100% staff training, 0 GAFI/GIABA findings' },
          { value: 60, labelFr: 'Dispositif LBC/FT en place mais procédures à mettre à jour, formation partielle (< 80% du personnel), quelques alertes non traitées', labelEn: 'AML/CFT system in place but procedures need updating, partial training (< 80% staff), some unprocessed alerts' },
          { value: 25, labelFr: 'Dispositif LBC/FT minimal : KYC basique, pas de correspondant désigné, pas de formation structurée', labelEn: 'Minimal AML/CFT system: basic KYC, no designated officer, no structured training' },
          { value: 0, labelFr: 'Aucun dispositif LBC/FT en place, non-conformité majeure aux exigences GAFI', labelEn: 'No AML/CFT system in place, major non-compliance with GAFI requirements' },
        ],
      },
    ],
  },
  {
    id: 'accessibilite-services',
    titleFr: 'Accessibilité des Services',
    titleEn: 'Service Accessibility',
    descriptionFr: 'Couverture géographique, canaux digitaux, adaptation aux populations vulnérables, frais abordables',
    descriptionEn: 'Geographic coverage, digital channels, adaptation to vulnerable populations, affordable fees',
    icon: 'ri-map-pin-user-line',
    color: '#0ea5e9',
    weight: 25,
    questions: [
      {
        id: 'if-as-1',
        questionFr: 'Proposez-vous des produits et services spécifiquement adaptés aux populations à faible revenu ou non bancarisées ?',
        questionEn: 'Do you offer products and services specifically adapted to low-income or unbanked populations?',
        axisId: 'accessibilite-services',
        options: [
          { value: 100, labelFr: 'Gamme complète de produits inclusifs (microcrédit, épargne simplifiée, assurance indicielle), conçus avec études terrain et feedback bénéficiaires', labelEn: 'Complete range of inclusive products (microcredit, simplified savings, index insurance), designed with field studies and beneficiary feedback' },
          { value: 60, labelFr: 'Quelques produits adaptés disponibles mais gamme limitée, peu de données sur l\'impact réel', labelEn: 'Some adapted products available but limited range, little data on real impact' },
          { value: 25, labelFr: 'Produits standards non adaptés, pas de segmentation des populations vulnérables', labelEn: 'Non-adapted standard products, no vulnerable population segmentation' },
          { value: 0, labelFr: 'Aucune offre spécifique pour les populations à faible revenu, exclusion de fait des non bancarisés', labelEn: 'No specific offer for low-income populations, de facto exclusion of unbanked' },
        ],
      },
      {
        id: 'if-as-2',
        questionFr: 'Vos points de service sont-ils accessibles en zones rurales et périurbaines, au-delà des capitales économiques ?',
        questionEn: 'Are your service points accessible in rural and peri-urban areas, beyond economic capitals?',
        axisId: 'accessibilite-services',
        options: [
          { value: 100, labelFr: 'Réseau étendu couvrant > 80% des régions du pays, agent banking actif, points de service < 5 km pour 90% de la population cible', labelEn: 'Extended network covering > 80% of country regions, active agent banking, service points < 5 km for 90% of target population' },
          { value: 60, labelFr: 'Présence dans les villes principales et certaines zones semi-urbaines, couverture rurale partielle', labelEn: 'Presence in main cities and some semi-urban areas, partial rural coverage' },
          { value: 25, labelFr: 'Présence limitée aux capitales et grandes villes, pas de couverture rurale', labelEn: 'Presence limited to capitals and major cities, no rural coverage' },
          { value: 0, labelFr: 'Un seul point de service, inaccessible à la majorité de la population', labelEn: 'Single service point, inaccessible to the majority of the population' },
        ],
      },
      {
        id: 'if-as-3',
        questionFr: 'Offrez-vous des canaux digitaux (application mobile, USSD, portail web) permettant l\'accès aux services 24/7 ?',
        questionEn: 'Do you offer digital channels (mobile app, USSD, web portal) enabling 24/7 service access?',
        axisId: 'accessibilite-services',
        options: [
          { value: 100, labelFr: 'Application mobile native + USSD fonctionnel sur tous les opérateurs + portail web responsive, > 60% des transactions via canaux digitaux', labelEn: 'Native mobile app + USSD working on all operators + responsive web portal, > 60% transactions via digital channels' },
          { value: 60, labelFr: 'Portail web disponible + USSD basique, adoption digitale < 30% des clients', labelEn: 'Web portal available + basic USSD, digital adoption < 30% of clients' },
          { value: 25, labelFr: 'Présence web basique (site vitrine), pas de canaux transactionnels digitaux', labelEn: 'Basic web presence (showcase site), no digital transactional channels' },
          { value: 0, labelFr: 'Aucun canal digital, 100% des opérations en agence physique', labelEn: 'No digital channel, 100% physical branch operations' },
        ],
      },
      {
        id: 'if-as-4',
        questionFr: 'Les frais de vos services sont-ils abordables et transparents pour les populations cibles à faible revenu ?',
        questionEn: 'Are your service fees affordable and transparent for low-income target populations?',
        axisId: 'accessibilite-services',
        options: [
          { value: 100, labelFr: 'Grille tarifaire transparente, benchmarking concurrence, frais de tenue de compte < 1% du revenu médian, aucun frais caché, affichage obligatoire en agence et en ligne', labelEn: 'Transparent fee schedule, competitive benchmarking, account maintenance fees < 1% median income, no hidden fees, mandatory display in branch and online' },
          { value: 60, labelFr: 'Tarifs affichés mais complexité de la grille, certains frais annexes significatifs', labelEn: 'Displayed fees but complex schedule, some significant ancillary fees' },
          { value: 25, labelFr: 'Tarifs opaques, frais non communiqués à l\'avance, coût total non maîtrisé par le client', labelEn: 'Opaque fees, fees not communicated in advance, total cost not controlled by client' },
          { value: 0, labelFr: 'Aucune transparence tarifaire, frais excessifs, pratiques prédatrices', labelEn: 'No fee transparency, excessive fees, predatory practices' },
        ],
      },
      {
        id: 'if-as-5',
        questionFr: 'Acceptez-vous des documents d\'identification alternatifs (attestation villageoise, carte d\'électeur) pour l\'ouverture de compte des populations sans pièce d\'identité nationale ?',
        questionEn: 'Do you accept alternative identification documents (village attestation, voter card) for account opening for populations without national ID?',
        axisId: 'accessibilite-services',
        options: [
          { value: 100, labelFr: 'Politique KYC simplifiée conforme BCEAO pour les petits comptes, acceptation de multiples documents alternatifs, procédure documentée et auditée', labelEn: 'Simplified KYC policy BCEAO-compliant for small accounts, acceptance of multiple alternative documents, documented and audited procedure' },
          { value: 60, labelFr: 'Acceptation de certains documents alternatifs mais politique non formalisée, application inconstante selon les agences', labelEn: 'Acceptance of some alternative documents but non-formalized policy, inconsistent application across branches' },
          { value: 25, labelFr: 'Exigence stricte de pièce d\'identité nationale, aucune flexibilité documentaire', labelEn: 'Strict national ID requirement, no documentary flexibility' },
          { value: 0, labelFr: 'Procédure d\'identification excluant de facto les populations vulnérables, non-conforme aux objectifs d\'inclusion', labelEn: 'Identification procedure de facto excluding vulnerable populations, non-compliant with inclusion objectives' },
        ],
      },
    ],
  },
  {
    id: 'protection-clients',
    titleFr: 'Protection des Clients',
    titleEn: 'Client Protection',
    descriptionFr: 'Transparence tarifaire, traitement des réclamations, éducation financière, recouvrement responsable, protection des données',
    descriptionEn: 'Fee transparency, complaint handling, financial education, responsible collection, data protection',
    icon: 'ri-shield-user-line',
    color: ACCENT,
    weight: 25,
    questions: [
      {
        id: 'if-pc-1',
        questionFr: 'Communiquez-vous de manière transparente et complète sur vos tarifs, conditions générales et modalités de remboursement ?',
        questionEn: 'Do you communicate transparently and completely about your rates, terms and conditions, and repayment terms?',
        axisId: 'protection-clients',
        options: [
          { value: 100, labelFr: 'Contrats en langage clair, affichage obligatoire des TAEG, simulateur de coût disponible, consentement éclairé documenté pour chaque client', labelEn: 'Plain language contracts, mandatory APR display, cost simulator available, documented informed consent for each client' },
          { value: 60, labelFr: 'Informations communiquées mais langage technique, pas de simulateur, contrats longs et complexes', labelEn: 'Information communicated but technical language, no simulator, long and complex contracts' },
          { value: 25, labelFr: 'Information partielle, clauses importantes non mises en évidence, risque de surendettement non communiqué', labelEn: 'Partial information, important clauses not highlighted, over-indebtedness risk not communicated' },
          { value: 0, labelFr: 'Information trompeuse ou absente, pratiques commerciales abusives', labelEn: 'Misleading or absent information, abusive commercial practices' },
        ],
      },
      {
        id: 'if-pc-2',
        questionFr: 'Disposez-vous d\'un mécanisme formel de traitement des réclamations clients, accessible et avec des délais de réponse garantis ?',
        questionEn: 'Do you have a formal client complaint handling mechanism, accessible and with guaranteed response times?',
        axisId: 'protection-clients',
        options: [
          { value: 100, labelFr: 'Système de réclamation multicanal (agence, téléphone, email, app), accusé réception < 48h, résolution < 15j, médiateur indépendant, rapport trimestriel au CA', labelEn: 'Multi-channel complaint system (branch, phone, email, app), acknowledgment < 48h, resolution < 15d, independent ombudsman, quarterly Board report' },
          { value: 60, labelFr: 'Procédure de réclamation documentée mais délais non garantis, pas de médiateur externe', labelEn: 'Documented complaint procedure but non-guaranteed timelines, no external ombudsman' },
          { value: 25, labelFr: 'Traitement informel des réclamations, pas de procédure écrite, pas de suivi statistique', labelEn: 'Informal complaint handling, no written procedure, no statistical monitoring' },
          { value: 0, labelFr: 'Aucun mécanisme de réclamation, clients sans recours', labelEn: 'No complaint mechanism, clients without recourse' },
        ],
      },
      {
        id: 'if-pc-3',
        questionFr: 'Proposez-vous des programmes d\'éducation financière à vos clients (budget, épargne, crédit responsable) ?',
        questionEn: 'Do you offer financial education programs to your clients (budgeting, savings, responsible credit)?',
        axisId: 'protection-clients',
        options: [
          { value: 100, labelFr: 'Programme structuré d\'éducation financière : modules présentiels et digitaux, contenu adapté par segment, mesure d\'impact, > 50% des clients formés', labelEn: 'Structured financial education program: in-person and digital modules, content adapted by segment, impact measurement, > 50% clients trained' },
          { value: 60, labelFr: 'Quelques sessions de formation ponctuelles, contenu standardisé, pas d\'évaluation d\'impact', labelEn: 'Some occasional training sessions, standardized content, no impact evaluation' },
          { value: 25, labelFr: 'Sensibilisation minimale lors de l\'octroi de crédit, pas de programme structuré', labelEn: 'Minimal awareness during credit granting, no structured program' },
          { value: 0, labelFr: 'Aucune éducation financière, les clients ne comprennent pas les produits qu\'ils souscrivent', labelEn: 'No financial education, clients do not understand the products they subscribe to' },
        ],
      },
      {
        id: 'if-pc-4',
        questionFr: 'Vos pratiques de recouvrement respectent-elles la dignité des clients (pas de harcèlement, pas d\'intimidation, pas de saisie abusive) ?',
        questionEn: 'Do your collection practices respect client dignity (no harassment, no intimidation, no abusive seizure)?',
        axisId: 'protection-clients',
        options: [
          { value: 100, labelFr: 'Code de conduite recouvrement formalisé, formation obligatoire des agents, mécanisme de contrôle, 0 plainte pour pratique abusive sur 12 mois', labelEn: 'Formalized collection code of conduct, mandatory agent training, control mechanism, 0 complaints for abusive practice in 12 months' },
          { value: 60, labelFr: 'Pratiques généralement correctes mais pas de code formalisé, quelques incidents isolés', labelEn: 'Generally correct practices but no formal code, some isolated incidents' },
          { value: 25, labelFr: 'Pratiques de recouvrement agressives, plaintes récurrentes des clients', labelEn: 'Aggressive collection practices, recurring client complaints' },
          { value: 0, labelFr: 'Pratiques abusives systématiques : intimidation, saisies illégales, humiliation publique', labelEn: 'Systematic abusive practices: intimidation, illegal seizures, public humiliation' },
        ],
      },
      {
        id: 'if-pc-5',
        questionFr: 'Protégez-vous les données personnelles de vos clients conformément aux lois en vigueur (RGPD, lois locales de protection des données) ?',
        questionEn: 'Do you protect your clients\' personal data in accordance with applicable laws (GDPR, local data protection laws)?',
        axisId: 'protection-clients',
        options: [
          { value: 100, labelFr: 'Politique de protection des données documentée, registre des traitements, consentement explicite collecté, chiffrement des données, audit externe annuel, DPO désigné', labelEn: 'Documented data protection policy, processing registry, explicit consent collected, data encryption, annual external audit, designated DPO' },
          { value: 60, labelFr: 'Mesures de sécurité en place mais politique non documentée, pas de DPO, pas d\'audit externe', labelEn: 'Security measures in place but undocumented policy, no DPO, no external audit' },
          { value: 25, labelFr: 'Protection minimale, données stockées sans chiffrement, pas de procédure en cas de fuite', labelEn: 'Minimal protection, unencrypted data storage, no breach procedure' },
          { value: 0, labelFr: 'Aucune protection des données, partage non autorisé avec des tiers, risque juridique majeur', labelEn: 'No data protection, unauthorized sharing with third parties, major legal risk' },
        ],
      },
    ],
  },
  {
    id: 'impact-social',
    titleFr: 'Impact Social',
    titleEn: 'Social Impact',
    descriptionFr: 'Mesure d\'impact, ciblage femmes/jeunes, produits d\'entrepreneuriat, partenariats développement, reporting mission sociale',
    descriptionEn: 'Impact measurement, women/youth targeting, entrepreneurship products, development partnerships, social mission reporting',
    icon: 'ri-heart-3-line',
    color: ROSE,
    weight: 25,
    questions: [
      {
        id: 'if-is-1',
        questionFr: 'Mesurez-vous et publiez-vous l\'impact social de vos activités sur les bénéficiaires (réduction de la pauvreté, création d\'emplois, autonomisation) ?',
        questionEn: 'Do you measure and publish the social impact of your activities on beneficiaries (poverty reduction, job creation, empowerment)?',
        axisId: 'impact-social',
        options: [
          { value: 100, labelFr: 'Cadre de mesure d\'impact formalisé (SPI4, IRIS+), collecte systématique de données, rapport d\'impact annuel audité, certification B Corp ou équivalent', labelEn: 'Formalized impact measurement framework (SPI4, IRIS+), systematic data collection, audited annual impact report, B Corp or equivalent certification' },
          { value: 60, labelFr: 'Indicateurs d\'impact définis mais collecte irrégulière, rapport ponctuel, pas de certification externe', labelEn: 'Impact indicators defined but irregular collection, occasional report, no external certification' },
          { value: 25, labelFr: 'Pas de cadre de mesure d\'impact, quelques données anecdotiques, pas de rapport formalisé', labelEn: 'No impact measurement framework, some anecdotal data, no formalized report' },
          { value: 0, labelFr: 'Aucune mesure d\'impact social, la mission sociale n\'est pas intégrée à la stratégie', labelEn: 'No social impact measurement, social mission not integrated into strategy' },
        ],
      },
      {
        id: 'if-is-2',
        questionFr: 'Ciblez-vous spécifiquement les femmes, les jeunes entrepreneurs et les populations vulnérables dans votre stratégie d\'inclusion ?',
        questionEn: 'Do you specifically target women, young entrepreneurs and vulnerable populations in your inclusion strategy?',
        axisId: 'impact-social',
        options: [
          { value: 100, labelFr: 'Stratégie de ciblage documentée avec objectifs chiffrés, produits spécifiques par segment, partenariats ONG femmes/jeunes, > 60% de femmes dans le portefeuille actif', labelEn: 'Documented targeting strategy with quantified objectives, segment-specific products, NGO partnerships for women/youth, > 60% women in active portfolio' },
          { value: 60, labelFr: 'Sensibilité à l\'inclusion femmes/jeunes mais pas de ciblage formalisé, représentation modérée dans le portefeuille', labelEn: 'Sensitivity to women/youth inclusion but no formal targeting, moderate portfolio representation' },
          { value: 25, labelFr: 'Pas de ciblage spécifique, le portefeuille reflète la demande spontanée sans stratégie d\'inclusion proactive', labelEn: 'No specific targeting, portfolio reflects spontaneous demand without proactive inclusion strategy' },
          { value: 0, labelFr: 'Exclusion de fait des femmes et des jeunes par des critères d\'éligibilité discriminatoires', labelEn: 'De facto exclusion of women and youth through discriminatory eligibility criteria' },
        ],
      },
      {
        id: 'if-is-3',
        questionFr: 'Proposez-vous des produits favorisant l\'entrepreneuriat, la création d\'emplois et le développement des micro-entreprises ?',
        questionEn: 'Do you offer products that promote entrepreneurship, job creation and micro-enterprise development?',
        axisId: 'impact-social',
        options: [
          { value: 100, labelFr: 'Gamme entrepreneuriat complète : crédit de lancement, fonds de roulement, crédit équipement, accompagnement technique, mentorat, mise en réseau, suivi post-crédit création d\'emplois', labelEn: 'Complete entrepreneurship range: startup loan, working capital, equipment credit, technical support, mentoring, networking, post-loan job creation tracking' },
          { value: 60, labelFr: 'Crédit professionnel disponible mais sans accompagnement non-financier, pas de suivi de la création d\'emplois', labelEn: 'Business credit available but without non-financial support, no job creation tracking' },
          { value: 25, labelFr: 'Offre entrepreneuriale très limitée, focalisée sur le crédit à la consommation', labelEn: 'Very limited entrepreneurial offer, focused on consumer credit' },
          { value: 0, labelFr: 'Aucun produit dédié à l\'entrepreneuriat, exclusion des micro-entrepreneurs', labelEn: 'No product dedicated to entrepreneurship, exclusion of micro-entrepreneurs' },
        ],
      },
      {
        id: 'if-is-4',
        questionFr: 'Collaborez-vous avec des acteurs du développement (ONG, agences gouvernementales, bailleurs internationaux) pour maximiser votre impact ?',
        questionEn: 'Do you collaborate with development actors (NGOs, government agencies, international donors) to maximize your impact?',
        axisId: 'impact-social',
        options: [
          { value: 100, labelFr: 'Partenariats structurés avec 3+ acteurs de développement, projets co-financés, partage de données d\'impact, participation aux groupes de travail sectoriels', labelEn: 'Structured partnerships with 3+ development actors, co-financed projects, impact data sharing, participation in sector working groups' },
          { value: 60, labelFr: '1-2 partenariats ponctuels, collaboration limitée à des projets spécifiques', labelEn: '1-2 ad hoc partnerships, collaboration limited to specific projects' },
          { value: 25, labelFr: 'Pas de partenariat actif, travail en silo, absence de l\'écosystème développement', labelEn: 'No active partnership, siloed work, absent from development ecosystem' },
          { value: 0, labelFr: 'Isolement total, méconnaissance des acteurs de développement du secteur', labelEn: 'Total isolation, ignorance of sector development actors' },
        ],
      },
      {
        id: 'if-is-5',
        questionFr: 'Publiez-vous un rapport annuel sur votre mission sociale, accessible au public et incluant des indicateurs de performance sociale ?',
        questionEn: 'Do you publish an annual report on your social mission, publicly accessible and including social performance indicators?',
        axisId: 'impact-social',
        options: [
          { value: 100, labelFr: 'Rapport de mission sociale annuel publié, audité par un tiers, incluant les indicateurs SPI4/IRIS+, présenté en Assemblée Générale, disponible en ligne', labelEn: 'Annual social mission report published, third-party audited, including SPI4/IRIS+ indicators, presented at General Assembly, available online' },
          { value: 60, labelFr: 'Section RSE dans le rapport annuel mais pas de rapport dédié, indicateurs partiels', labelEn: 'CSR section in annual report but no dedicated report, partial indicators' },
          { value: 25, labelFr: 'Mention vague de la mission sociale dans les communications, pas de données chiffrées publiques', labelEn: 'Vague mention of social mission in communications, no public quantified data' },
          { value: 0, labelFr: 'Aucune communication sur la mission sociale, absence totale de transparence', labelEn: 'No communication on social mission, total absence of transparency' },
        ],
      },
    ],
  },
];

export function getInclusionFinanciereScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#0ea5e9';
  if (score >= 40) return '#d97706';
  if (score >= 20) return '#ea580c';
  return '#e11d48';
}

export function getInclusionFinanciereScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Conforme — Excellence Inclusive' : 'Compliant — Inclusive Excellence';
  if (score >= 60) return isFr ? 'Partiellement Conforme' : 'Partially Compliant';
  if (score >= 40) return isFr ? 'Conformité Insuffisante' : 'Insufficient Compliance';
  if (score >= 20) return isFr ? 'Non-Conformité Majeure' : 'Major Non-Compliance';
  return isFr ? 'Non-Conformité Critique' : 'Critical Non-Compliance';
}

export function getInclusionFinanciereLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Niveau 4 — Leader Inclusif' : 'Level 4 — Inclusive Leader';
  if (score >= 60) return isFr ? 'Niveau 3 — En Progression' : 'Level 3 — In Progress';
  if (score >= 40) return isFr ? 'Niveau 2 — Conformité Partielle' : 'Level 2 — Partial Compliance';
  if (score >= 20) return isFr ? 'Niveau 1 — Risque Élevé' : 'Level 1 — High Risk';
  return isFr ? 'Niveau 0 — Non-Conforme' : 'Level 0 — Non-Compliant';
}

export function getInclusionFinanciereReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr
    ? 'Votre institution est un leader de l\'inclusion financière. Maintenez ce niveau d\'excellence et partagez vos bonnes pratiques avec l\'écosystème.'
    : 'Your institution is a financial inclusion leader. Maintain this level of excellence and share best practices with the ecosystem.';
  if (score >= 60) return isFr
    ? 'Votre institution a posé des bases solides en inclusion financière. Des améliorations ciblées sur certains axes vous permettront d\'atteindre l\'excellence.'
    : 'Your institution has laid solid foundations in financial inclusion. Targeted improvements on certain axes will enable you to reach excellence.';
  if (score >= 40) return isFr
    ? 'Des lacunes significatives limitent votre impact en inclusion financière. Un plan d\'action structuré est nécessaire pour renforcer votre conformité et votre portée sociale.'
    : 'Significant gaps limit your financial inclusion impact. A structured action plan is needed to strengthen your compliance and social reach.';
  if (score >= 20) return isFr
    ? 'Votre institution présente des risques majeurs de non-conformité qui menacent sa viabilité réglementaire. Une remédiation urgente est indispensable.'
    : 'Your institution presents major compliance risks that threaten its regulatory viability. Urgent remediation is essential.';
  return isFr
    ? 'Votre institution est en situation critique. Sans action immédiate, elle s\'expose à des sanctions réglementaires pouvant aller jusqu\'au retrait d\'agrément.'
    : 'Your institution is in a critical situation. Without immediate action, it faces regulatory sanctions up to license revocation.';
}

export function getInclusionFinanciereRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const crScore = perAxis['conformite-reglementaire'] ?? 0;
  const asScore = perAxis['accessibilite-services'] ?? 0;
  const pcScore = perAxis['protection-clients'] ?? 0;
  const isScore = perAxis['impact-social'] ?? 0;

  if (crScore < 50) risks.push(isFr
    ? 'RISQUE CRITIQUE — Non-conformité réglementaire : absence d\'agrément ou non-respect des ratios prudentiels exposant l\'institution à des sanctions BCEAO pouvant aller jusqu\'au retrait d\'agrément'
    : 'CRITICAL RISK — Regulatory non-compliance: absence of license or non-compliance with prudential ratios exposing the institution to BCEAO sanctions up to license revocation');
  if (asScore < 50) risks.push(isFr
    ? 'RISQUE ÉLEVÉ — Accessibilité insuffisante : couverture géographique limitée, absence de canaux digitaux, exclusion des populations vulnérables, manque à gagner sur le marché cible'
    : 'HIGH RISK — Insufficient accessibility: limited geographic coverage, absence of digital channels, exclusion of vulnerable populations, missed target market opportunity');
  if (pcScore < 50) risks.push(isFr
    ? 'RISQUE ÉLEVÉ — Protection clients défaillante : absence de mécanisme de réclamation, pratiques de recouvrement agressives, risque réputationnel et juridique majeur'
    : 'HIGH RISK — Deficient client protection: no complaint mechanism, aggressive collection practices, major reputational and legal risk');
  if (isScore < 50) risks.push(isFr
    ? 'RISQUE MAJEUR — Absence de mesure d\'impact social : pas de cadre de reporting, incapacité à démontrer la mission sociale aux régulateurs et bailleurs, risque de perte de financement'
    : 'MAJOR RISK — Absence of social impact measurement: no reporting framework, inability to demonstrate social mission to regulators and donors, risk of funding loss');
  if (globalScore < 30) risks.push(isFr
    ? 'RISQUE CRITIQUE — Défaillances systémiques sur tous les axes : l\'institution n\'est pas viable réglementairement. Un accompagnement structurant d\'urgence est indispensable pour éviter le retrait d\'agrément.'
    : 'CRITICAL RISK — Systemic failures across all axes: the institution is not regulatorily viable. Urgent structural support is essential to avoid license revocation.');

  return risks;
}

export function getInclusionFinanciereRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis?: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis?: string; items: string[] }[] = [];

  const crScore = perAxis['conformite-reglementaire'] ?? 0;
  const asScore = perAxis['accessibilite-services'] ?? 0;
  const pcScore = perAxis['protection-clients'] ?? 0;
  const isScore = perAxis['impact-social'] ?? 0;

  if (crScore < 60) {
    recs.push({ title: isFr ? 'Mettre en conformité réglementaire' : 'Achieve regulatory compliance', axis: 'conformite-reglementaire', items: isFr ? [
      'Obtenir ou renouveler l\'agrément BCEAO et les agréments spécifiques requis pour vos activités',
      'Mettre en place un système de suivi automatisé des ratios prudentiels avec alertes',
      'Automatiser la production des reportings réglementaires pour garantir les délais',
      'Documenter et tester le système de contrôle interne selon le référentiel COSO',
      'Déployer un dispositif LBC/FT complet : KYC, détection, déclaration, formation',
    ] : [
      'Obtain or renew BCEAO license and specific authorizations required for your activities',
      'Implement automated prudential ratio monitoring system with alerts',
      'Automate regulatory reporting production to guarantee deadlines',
      'Document and test internal control system according to COSO framework',
      'Deploy complete AML/CFT system: KYC, detection, reporting, training',
    ] });
  }

  if (asScore < 60) {
    recs.push({ title: isFr ? 'Améliorer l\'accessibilité des services' : 'Improve service accessibility', axis: 'accessibilite-services', items: isFr ? [
      'Développer une gamme de produits spécifiques pour les populations à faible revenu',
      'Étendre le réseau de points de service via l\'agent banking en zones rurales',
      'Déployer des canaux digitaux adaptés (USSD, application mobile légère)',
      'Simplifier la grille tarifaire et réduire les frais pour les petits comptes',
      'Mettre en place une politique KYC simplifiée acceptant des documents alternatifs',
    ] : [
      'Develop specific product range for low-income populations',
      'Extend service point network via agent banking in rural areas',
      'Deploy adapted digital channels (USSD, lightweight mobile app)',
      'Simplify fee schedule and reduce fees for small accounts',
      'Implement simplified KYC policy accepting alternative documents',
    ] });
  }

  if (pcScore < 60) {
    recs.push({ title: isFr ? 'Renforcer la protection des clients' : 'Strengthen client protection', axis: 'protection-clients', items: isFr ? [
      'Adopter des contrats en langage clair avec affichage obligatoire du TAEG',
      'Mettre en place un système de réclamation multicanal avec délais garantis',
      'Développer un programme d\'éducation financière structuré pour les clients',
      'Formaliser un code de conduite pour le recouvrement et former les agents',
      'Désigner un DPO et mettre en conformité avec les lois de protection des données',
    ] : [
      'Adopt plain language contracts with mandatory APR display',
      'Implement multi-channel complaint system with guaranteed timelines',
      'Develop structured financial education program for clients',
      'Formalize collection code of conduct and train agents',
      'Designate DPO and achieve compliance with data protection laws',
    ] });
  }

  if (isScore < 60) {
    recs.push({ title: isFr ? 'Structurer la mesure d\'impact social' : 'Structure social impact measurement', axis: 'impact-social', items: isFr ? [
      'Adopter un cadre de mesure d\'impact reconnu (SPI4, IRIS+) avec collecte systématique',
      'Définir des objectifs chiffrés de ciblage femmes et jeunes avec produits dédiés',
      'Développer une offre entrepreneuriat complète avec accompagnement non-financier',
      'Construire des partenariats structurés avec les acteurs du développement',
      'Publier un rapport annuel de mission sociale audité et accessible au public',
    ] : [
      'Adopt recognized impact measurement framework (SPI4, IRIS+) with systematic collection',
      'Define quantified women and youth targeting objectives with dedicated products',
      'Develop complete entrepreneurship offer with non-financial support',
      'Build structured partnerships with development actors',
      'Publish audited annual social mission report accessible to the public',
    ] });
  }

  if (recs.length === 0) {
    recs.push({ title: isFr ? 'Maintenir l\'Excellence Inclusive' : 'Maintain Inclusive Excellence', items: isFr ? [
      'Viser la certification B Corp ou équivalent pour valider votre engagement social',
      'Partager vos bonnes pratiques avec l\'écosystème de l\'inclusion financière',
      'Investir dans l\'innovation produit pour les segments non desservis',
      'Renforcer les partenariats internationaux pour amplifier votre impact',
    ] : [
      'Target B Corp or equivalent certification to validate your social commitment',
      'Share best practices with the financial inclusion ecosystem',
      'Invest in product innovation for underserved segments',
      'Strengthen international partnerships to amplify your impact',
    ] });
  }

  return recs;
}