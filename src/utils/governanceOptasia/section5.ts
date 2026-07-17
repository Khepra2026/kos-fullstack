import { Paragraph } from 'docx';
import { h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, numberedItem } from './helpers';

export const section5Paragraphs: Paragraph[] = [
  h1('SECTION 5 — PROCESSUS DE SÉLECTION, NOMINATION ET « FIT AND PROPER » DES MANDATAIRES SOCIAUX'),
  divider(),
  spacer(),

  h2('5.1 Critères d\'éligibilité stricts (« Fit and Proper »)'),
  body('Les régulateurs bancaires de l\'UEMOA et de la CEMAC imposent des critères d\'éligibilité stricts pour les mandataires sociaux des EMF/SFD de 2ème catégorie. Le non-respect d\'un seul critère entraîne un avis défavorable de la Commission Bancaire et le rejet de la demande d\'agrément.'),
  spacer(),

  h3('5.1.1 Tableau de synthèse — Fit and Proper par fonction'),
  buildTable(
    ['Fonction', 'Expérience minimale', 'Nationalité / Résidence', 'Casier judiciaire', 'Indépendance', 'Incompatibilités'],
    [
      ['Président du Conseil (PCA)', '7 ans en CEMAC / 5 ans en UEMOA dans le secteur financier, dont 3 ans à un poste de direction', 'Nationalité CEMAC ou UEMOA obligatoire ; Résidence fiscale dans la zone', 'Casier judiciaire B3 vierge (ou équivalent) ; Attestation de non-faillite', 'Indépendance absolue vis-à-vis du Groupe et du DG ; Non-associé majoritaire', 'Ne peut cumuler avec DG, DGA, ou tout mandat de direction ; Maximum 2 mandats de PCA dans le secteur financier'],
      ['Directeur Général (DG)', '7 ans en CEMAC / 5 ans en UEMOA dans le secteur financier, dont 2 ans minimum en tant que DG ou DGA d\'une IMF/SFD agréée', 'Nationalité CEMAC ou UEMOA obligatoire ; Résidence fiscale dans le pays de la filiale', 'Casier judiciaire B3 vierge ; Attestation de non-faillite ; Attestation bancaire de solvabilité', 'Indépendance vis-à-vis du PCA et du Groupe ; Pouvoir de veto prudentiel', 'Ne peut cumuler avec PCA, DGA, ou tout mandat de direction dans une autre IMF/SFD concurrente'],
      ['Directeur Général Adjoint (DGA)', '5 ans en CEMAC / 3 ans en UEMOA dans le secteur financier, dont 1 an minimum en tant que directeur de département', 'Nationalité CEMAC ou UEMOA souhaitée ; Résidence fiscale dans le pays de la filiale', 'Casier judiciaire B3 vierge ; Attestation de non-faillite', 'Indépendance vis-à-vis du DG pour les fonctions de contrôle ; Dépendance opérationnelle pour les fonctions de métier', 'Ne peut cumuler avec DG ou PCA ; Peut cumuler avec 1 mandat de direction dans une autre entité non-concurrente'],
      ['Administrateurs indépendants', '5 ans d\'expérience dans le secteur financier, la juridiction, la comptabilité ou l\'audit', 'Nationalité CEMAC ou UEMOA souhaitée ; Résidence fiscale dans la zone', 'Casier judiciaire B3 vierge ; Attestation de non-faillite', 'Indépendance absolue : non-associé, non-dirigeant, non-salarié, non-fournisseur ; Pas de lien familial avec les dirigeants', 'Maximum 3 mandats d\'administrateur dans le secteur financier ; Interdiction de cumul avec mandat de DG ou DGA'],
      ['Administrateurs non-indépendants', '3 ans d\'expérience dans le secteur financier ou lié au Groupe', 'Sans restriction de nationalité ; Résidence fiscale déclarée', 'Casier judiciaire B3 vierge', 'Dépendance opérationnelle au Groupe admise ; Doit déclarer les conflits d\'intérêts', 'Maximum 2 mandats d\'administrateur ; Interdiction de cumul avec mandat de DG ou PCA'],
      ['Responsable du Contrôle Interne (RCI)', '5 ans d\'expérience en audit interne ou contrôle interne dans le secteur financier', 'Nationalité CEMAC ou UEMOA souhaitée ; Résidence fiscale dans le pays', 'Casier judiciaire B3 vierge ; Attestation de non-faillite', 'Indépendance absolue vis-à-vis du DG et des lignes de métier ; Double reporting au CAC', 'Ne peut cumuler avec aucune fonction de métier ou commerciale ; Interdiction de dépendance hiérarchique au DG'],
      ['Responsable de la Conformité (RCC)', '5 ans d\'expérience en conformité réglementaire ou juridique dans le secteur financier', 'Nationalité CEMAC ou UEMOA souhaitée ; Résidence fiscale dans le pays', 'Casier judiciaire B3 vierge ; Attestation de non-faillite', 'Indépendance absolue vis-à-vis du DG et des lignes de métier ; Double reporting au CAC', 'Ne peut cumuler avec aucune fonction de métier ou commerciale ; Interdiction de dépendance hiérarchique au DG'],
      ['Directeur des Risques (DRC)', '7 ans en CEMAC / 5 ans en UEMOA dans le secteur financier, dont 3 ans en gestion des risques', 'Nationalité CEMAC ou UEMOA souhaitée ; Résidence fiscale dans le pays', 'Casier judiciaire B3 vierge ; Attestation de non-faillite', 'Indépendance vis-à-vis du DG pour les décisions de risque ; Reporting au CRC', 'Ne peut cumuler avec DG ou DGA ; Peut cumuler avec fonction de directeur du crédit sous réserve de séparation des décisions'],
    ],
    { colWidths: [14, 14, 14, 14, 14, 30], boldFirstCol: true }
  ),
  spacer(),

  h2('5.2 Processus de préparation des dossiers individuels de demande d\'agrément'),
  body('Chaque demande d\'agrément d\'un mandataire social ou d\'un dirigeant doit être accompagnée d\'un dossier individuel complet, conforme aux exigences des enquêtes de moralité menées par le Secrétariat Général de la Commission Bancaire et les Ministères des Finances locaux.'),
  spacer(),

  h3('5.2.1 Contenu du dossier individuel — Check-list « Bulletproof »'),
  numberedItem(1, 'Formulaire de demande d\'agrément : Formulaire officiel de la BCEAO (pour l\'UEMOA) ou de la COBAC (pour la CEMAC), dûment rempli et signé par le candidat.'),
  numberedItem(2, 'Curriculum Vitae détaillé : CV complet avec chronologie professionnelle, formation, certifications, références professionnelles. Le CV doit être signé par le candidat et certifié conforme par un notaire ou un CAC.'),
  numberedItem(3, 'Casier judiciaire : Casier judiciaire B3 (ou équivalent national) daté de moins de 3 mois, certifié apostillé. Pour les ressortissants étrangers, casier judiciaire du pays d\'origine + traduction assermentée.'),
  numberedItem(4, 'Attestation de non-faillite : Attestation de non-faillite, de non-redressement judiciaire, de non-liquidation, délivrée par le greffe du tribunal compétent.'),
  numberedItem(5, 'Attestation bancaire : Attestation de solvabilité bancaire délivrée par un établissement de crédit agréé, justifiant de la bonne tenue du compte du candidat.'),
  numberedItem(6, 'Déclaration fiscale : Attestation de régularité fiscale délivrée par les services fiscaux du pays de résidence.'),
  numberedItem(7, 'Déclaration d\'honorabilité : Déclaration sur l\'honneur du candidat attestant de l\'exactitude des informations fournies, de l\'absence de condamnation pénale, de l\'absence d\'inscription sur une liste de sanctions internationales.'),
  numberedItem(8, 'Rapport de due diligence : Rapport de due diligence signé par un cabinet Big Four ou équivalent, couvrant l\'intégrité professionnelle, la réputation, les liens politiques (PEP), les affiliations politiques.'),
  numberedItem(9, 'Lettre de recommandation : Deux lettres de recommandation professionnelles signées par des dirigeants du secteur financier (Directeurs Généraux de banques ou d\'IMF agréées).'),
  numberedItem(10, 'Preuve d\'expérience : Copies des contrats de travail, des attestations de travail, des rapports d\'activité justifiant de l\'expérience requise.'),
  spacer(),

  h3('5.2.2 Tableau de dépôt du dossier — UEMOA vs CEMAC'),
  buildTable(
    ['Étape', 'UEMOA (BCEAO)', 'CEMAC (COBAC)', 'Délai'],
    [
      ['1. Dépôt du dossier', 'Dépôt auprès de la Direction Nationale de la BCEAO du pays concerné', 'Dépôt auprès du Ministère des Finances du pays concerné + Commission Bancaire de la COBAC', 'Jour 0'],
      ['2. Vérification formelle', 'Vérification de l\'exhaustivité du dossier par la BCEAO', 'Vérification par le Secrétariat Technique de la COBAC', 'Jour 1 à 15'],
      ['3. Enquête de moralité', 'Enquête menée par les services de la BCEAO + services de sécurité nationaux', 'Enquête menée par la COBAC + services de sécurité nationaux + services de renseignement financier', 'Jour 15 à 60'],
      ['4. Avis de la Commission', 'Avis de la Commission Bancaire de l\'UEMOA (si applicable) ou de la Direction Nationale', 'Avis de la Commission Bancaire de la COBAC', 'Jour 60 à 90'],
      ['5. Notification', 'Notification de l\'agrément ou du rejet par la BCEAO', 'Notification par arrêté ministériel (Ministère des Finances)', 'Jour 90 à 120'],
    ],
    { colWidths: [16, 30, 30, 24], boldFirstCol: true }
  ),
  spacer(),

  h2('5.3 Incompatibilités légales et cumul de mandats'),
  alertBox('Le cumul de mandats est strictement encadré par l\'AUSCGIE OHADA et les réglementations BCEAO/COBAC. Tout cumul non autorisé constitue un motif de rejet d\'agrément immédiat.', 'critical'),
  spacer(),

  h3('5.3.1 Tableau des incompatibilités de cumul'),
  buildTable(
    ['Mandat détenu', 'Mandats INCOMPATIBLES', 'Mandats COMPATIBLES (sous conditions)', 'Référence'],
    [
      ['PCA', 'DG, DGA, DRC, RCC, RCI, RLBC, tout mandat salarié dans la filiale ou le Groupe', 'Administrateur dans 2 autres entités non-concurrentes (maximum 3 mandats au total dans le secteur financier)', 'AUSCGIE OHADA Art. 14 ; BCEAO Circulaire 01/2017 Art. 3 ; COBAC R-2023/01 Art. 10'],
      ['DG', 'PCA, DGA (sauf dérogation), DRC (sauf dérogation), RCC, RCI, RLBC, tout mandat de direction dans une entité concurrente', 'DGA dans la même entité (sous réserve de dérogation du CNR) ; Administrateur dans la Holding (sous réserve d\'indépendance)', 'AUSCGIE OHADA Art. 14 ; BCEAO Circulaire 02/2017 Art. 4 ; COBAC R-2023/01 Art. 11'],
      ['DGA', 'PCA, DG (sauf dérogation), RCC, RCI, RLBC', 'DRC dans la même entité (sous réserve de séparation des décisions) ; Administrateur dans la Holding', 'AUSCGIE OHADA Art. 14 ; BCEAO Circulaire 02/2017 Art. 5'],
      ['DRC', 'PCA, RCC, RCI, RLBC, tout mandat de direction dans une entité concurrente', 'DG ou DGA dans la même entité (sous réserve de dérogation du CNR et de séparation des décisions de risque)', 'COBAC R-2017/05 Art. 12 ; BCEAO Circulaire 03/2017 Art. 5'],
      ['RCC', 'PCA, DG, DGA, DRC, RCI, RLBC, tout mandat de métier ou commercial', 'Administrateur dans la Holding (sous réserve d\'indépendance)', 'COBAC R-2019/01 Art. 5 ; BCEAO Instruction 008-05-2015 Art. 7'],
      ['RCI', 'PCA, DG, DGA, DRC, RCC, RLBC, tout mandat de métier ou commercial', 'Administrateur dans la Holding (sous réserve d\'indépendance)', 'COBAC R-2019/01 Art. 5 ; BCEAO Circulaire 01/2017 Art. 6'],
    ],
    { colWidths: [12, 32, 32, 24], boldFirstCol: true }
  ),
  spacer(),

  h3('5.3.2 Procédure de dérogation au cumul'),
  body('Les dérogations au cumul de mandats sont exceptionnelles et doivent être strictement justifiées :'),
  numberedItem(1, 'Demande motivée : Le candidat doit adresser une demande écrite et motivée au CNR de la Holding, justifiant de la nécessité opérationnelle du cumul.'),
  numberedItem(2, 'Examen par le CNR : Le CNR examine la demande et émet un avis motivé. L\'avis est soumis au CA de la Holding.'),
  numberedItem(3, 'Approbation du CA : Le CA de la Holding approuve ou rejette la dérogation à la majorité qualifiée (2/3 des membres présents).'),
  numberedItem(4, 'Déclaration au régulateur : La dérogation est déclarée au régulateur (BCEAO, COBAC) avec l\'avis du CNR et la délibération du CA.'),
  numberedItem(5, 'Durée limitée : La dérogation est accordée pour une durée maximum de 2 ans, renouvelable une fois sur demande motivée.'),
  spacer(),

  h2('5.4 Honorabilité sans faille et enquêtes de moralité'),
  body('L\'honorabilité des mandataires sociaux est une condition sine qua non de l\'agrément. Les enquêtes de moralité sont menées par les services de sécurité, les services de renseignement financier et les Commissions Bancaires.'),
  spacer(),

  h3('5.4.1 Critères d\'honorabilité absolue'),
  bullet('Absence de condamnation pénale pour crime, délit, ou contravention de 1ère classe. Une condamnation pour blanchiment, escroquerie, abus de confiance, ou infraction financière est un motif de rejet irréversible.'),
  bullet('Absence d\'inscription sur une liste de sanctions internationales (ONU, UE, OFAC, etc.).'),
  bullet('Absence de faillite personnelle, de redressement judiciaire, ou de liquidation d\'une entreprise dirigée par le candidat dans les 10 dernières années.'),
  bullet('Absence de conflit d\'intérêts majeur : le candidat ne peut être associé majoritaire ou bénéficiaire effectif d\'une entité concurrente.'),
  bullet('Absence de liens politiques sensibles (PEP — Politically Exposed Person) non déclarés. Les PEP sont admissibles sous réserve de déclaration préalable et de validation par le régulateur.'),
  spacer(),

  h3('5.4.2 Conduite de l\'enquête de moralité'),
  buildTable(
    ['Phase', 'Action', 'Acteur', 'Durée estimée'],
    [
      ['1. Vérification documentaire', 'Vérification de l\'authenticité des documents fournis (casier, attestations, diplômes, références)', 'Services de la BCEAO / COBAC', '1 à 2 semaines'],
      ['2. Enquête de réputation', 'Enquête auprès des établissements financiers, des anciens employeurs, des partenaires professionnels', 'Services de sécurité nationaux / Big Four (mandaté par le candidat)', '2 à 4 semaines'],
      ['3. Vérification des antécédents', 'Consultation des bases de données nationales et internationales (Interpol, sanctions, faillites)', 'Services de renseignement financier / CENTIF / TRACFIN', '1 à 2 semaines'],
      ['4. Entretien de moralité', 'Entretien individuel avec le candidat par un représentant de la Commission Bancaire', 'Commission Bancaire (BCEAO ou COBAC)', '1 journée'],
      ['5. Décision', 'Avis motivé de la Commission Bancaire : agrément, agrément avec réserves, ou rejet', 'Commission Bancaire', '2 à 4 semaines'],
    ],
    { colWidths: [18, 32, 28, 22], boldFirstCol: true }
  ),
  spacer(),

  h2('5.5 Plan de succession et pérennité de la gouvernance'),
  body('Le régulateur exige que chaque filiale dispose d\'un plan de succession formalisé pour les fonctions clés, garantissant la pérennité de la gouvernance en cas de départ, de décès, d\'incapacité, ou de révocation d\'un dirigeant.'),
  spacer(),

  h3('5.5.1 Contenu du plan de succession'),
  bullet('Identification des fonctions clés : DG, DGA, DRC, RCC, RCI, RLBC, DAF.'),
  bullet('Identification des successeurs potentiels : Pour chaque fonction clé, identification de 2 à 3 successeurs internes ou externes, avec évaluation de leur maturité et de leur disponibilité.'),
  bullet('Plan de développement des successeurs : Programme de formation, de mentorat, de rotation professionnelle pour préparer les successeurs.'),
  bullet('Déclencheur et procédure de succession : Définition des événements déclencheurs (départ, décès, incapacité, révocation) et de la procédure de nomination du successeur (délai, validation, agrément).'),
  bullet('Communication et transition : Protocole de communication interne et externe, transition des dossiers, passation des pouvoirs.'),
  spacer(),

  h3('5.5.2 Validation du plan de succession'),
  numberedItem(1, 'Rédaction par le CNR local et le CNR de la Holding.'),
  numberedItem(2, 'Validation par le CA de la Holding et le CA de chaque filiale.'),
  numberedItem(3, 'Transmission au régulateur (BCEAO, COBAC) pour information.'),
  numberedItem(4, 'Révision annuelle et mise à jour des successeurs potentiels.'),
  spacer(),

  h2('5.6 Récapitulatif des livrables et jalons de conformité'),
  buildTable(
    ['Livrable', 'Responsable', 'Délai', 'Validation'],
    [
      ['Charte de Gouvernance de Groupe', 'Cabinet d\'avocats + KHEPRA EXPERTS', 'M1-M2', 'CA Holding + CA Filiales'],
      ['Matrice de délégation de pouvoirs', 'KHEPRA EXPERTS', 'M1-M2', 'CA Holding + CA Filiales'],
      ['Politique de Prix de Transfert', 'Big Four / Cabinet spécialisé', 'M2-M3', 'CA Holding + CAC Holding + CAC Filiales'],
      ['Conventions réglementées (MSA, Licence, SSA)', 'Cabinet d\'avocats + KHEPRA EXPERTS', 'M2-M4', 'CA de chaque entité + CAC + Régulateur'],
      ['Dossiers Fit and Proper DG/PCA (7 pays)', 'KHEPRA EXPERTS + Candidats', 'M3-M5', 'CNR Holding + CNRS locaux + Régulateurs'],
      ['Plans de succession (7 pays)', 'CNR Holding + CNR locaux', 'M4-M6', 'CA Holding + CA Filiales + Régulateur'],
      ['Procédure de Veto Prudentiel', 'KHEPRA EXPERTS', 'M1-M2', 'CA Holding + CA Filiales'],
      ['Charte de l\'indépendance des fonctions de contrôle', 'KHEPRA EXPERTS', 'M1-M2', 'CA Holding + CAC Holding + CAC Filiales'],
    ],
    { colWidths: [28, 24, 12, 36], boldFirstCol: true }
  ),
  spacer(),

  body('Le présent document-cadre constitue la base de l\'architecture de gouvernance d\'OPTASIA GROUP. Sa mise en œuvre effective est une condition préalable et non négociable à l\'obtention des agréments dans les 7 pays cibles. Tout écart par rapport aux dispositions ci-énoncées expose le Groupe à un risque d\'avis défavorable ou de rejet d\'agrément.', { bold: true, spacing: { before: 240, after: 120 } }),
  body('Document classifié CONFIDENTIEL — STRICTEMENT PRIVÉ. Toute reproduction, communication ou divulgation à des tiers sans l\'accord écrit de KHEPRA EXPERTS est interdite.', { italic: true, spacing: { before: 120, after: 240 } }),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];