const regulator = {
  'report.seal': 'Scellé pour soumission à {{regulator}}',
  'report.seal.bceao': 'Scellé pour soumission SURFI BCEAO',
  'report.seal.cobac': 'Scellé pour soumission SESAME COBAC',
  'report.seal.acpr': 'Scellé pour soumission COREP/FINREP ACPR',
  'report.seal.fca': 'Scellé pour soumission GABRIEL FCA',
  'report.seal.mas': 'Scellé pour soumission MAS Notice 626',
  'report.seal.fed': 'Scellé pour soumission FFIEC 031 Call Report',
  'report.seal.gafi': 'Scellé pour Rapport d\'Évaluation Mutuelle GAFI',
  'report.seal.ohada': 'Scellé pour soumission SYSCOHADA OHADA',

  'evidence.chain': 'Chaîne infalsifiable — {{count}} preuves',
  'evidence.chain.verified': 'Chaîne vérifiée — {{count}} entrées inviolables',
  'evidence.chain.broken': 'CHAÎNE ROMPUE — {{count}} entrées, {{broken}} liens brisés',

  'rcci.approve': 'Approbation RCCI Requise — Principe des 4 Yeux',
  'rcci.sod': 'Séparation des Tâches — Le RCCI ne peut valider ses propres contrôles',
  'coo.signoff': 'Signature DG Requise — Approbation finale obligatoire',

  'bceao.art42': 'Vigilance LBC — Suivi PPE (Art. 42)',
  'bceao.circ.2017': 'Gouvernance — Circulaire 01-2017/CBAO',
  'bceao.lbft': 'LBC/FT — Loi Uniforme UEMOA',

  'cobac.r2016': 'COBAC R-2016/01 — Adéquation des Fonds Propres',
  'cobac.r2017': 'COBAC R-2017/04 — Gouvernance',

  'acpr.crr3': 'CRR3 Article 92 — Exigences de Fonds Propres',
  'acpr.amld6': 'AMLD6 Article 3 — Registre des Bénéficiaires Effectifs',

  'fca.syssc': 'Systems & Controls Sourcebook — SYSC 4.1',
  'fca.mlr': 'Money Laundering Regulations 2017 — MLR 28',
  'fca.smr': 'Senior Managers Regime — Attestations SM&CR',

  'mas.626': 'MAS Notice 626 — Exigences LBC/FT',
  'mas.637': 'MAS Notice 637 — Adéquation des Fonds Propres',

  'fed.regyy': 'Regulation YY §252 — Stress Tests CCAR',
  'fed.bsa': 'BSA 31 CFR §1020 — Dépôt SAR/CTR',
  'fed.ffiec': 'FFIEC 031 — Rapport Consolidé de Situation et Résultat',

  'gafi.r1': 'GAFI Recommandation 1 — Évaluation des Risques',
  'gafi.r10': 'GAFI Recommandation 10 — Devoir de Diligence',
  'gafi.r26': 'GAFI Recommandation 26 — Supervision',

  'ohada.audcif': 'OHADA AUDCIF — Normes Comptables',
  'ohada.societe': 'OHADA Acte Uniforme — Sociétés Commerciales',

  'jurisdiction.switch': 'Changement de juridiction vers {{regulator}}',
  'jurisdiction.active': 'Juridiction active : {{regulator}} ({{region}})',
  'jurisdiction.rules': '{{count}} règles chargées pour {{regulator}}',

  'pki.verify': 'Vérification PKI : signature {{regulator}}',
  'pki.valid': 'Signature vérifiée — {{regulator}} v{{version}}',
  'pki.invalid': 'SIGNATURE INVALIDE — {{regulator}} v{{version}}',
  'pki.multi': 'Multi-Signature : {{passed}}/{{total}} validées (seuil : {{threshold}})',

  'sync.mode.offline': 'Mode Hors Ligne — Export/Import fichiers .kosdb',
  'sync.mode.p2p': 'Mode P2P — {{peers}} pair(s) connecté(s) sur LAN/VPN',
  'sync.mode.disabled': 'Sync désactivée — Mode local uniquement',

  'export.bundle.created': 'Bundle réglementaire global créé — {{jurisdictions}} juridiction(s)',
  'export.format.xbrl': 'Format XBRL',
  'export.format.corep': 'Format COREP/FINREP',
  'export.format.gabriel': 'Format GABRIEL',
  'export.format.mas626': 'Format MAS Notice 626',
  'export.format.ffiec': 'Format FFIEC 031',
  'export.format.mer': 'Format REM GAFI',
};

export default regulator;