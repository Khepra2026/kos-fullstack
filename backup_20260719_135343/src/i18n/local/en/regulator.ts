const regulator = {
  'report.seal': 'Seal for submission to {{regulator}}',
  'report.seal.bceao': 'Seal for BCEAO SURFI submission',
  'report.seal.cobac': 'Seal for COBAC SESAME submission',
  'report.seal.acpr': 'Seal for ACPR COREP/FINREP submission',
  'report.seal.fca': 'Seal for FCA GABRIEL submission',
  'report.seal.mas': 'Seal for MAS Notice 626 submission',
  'report.seal.fed': 'Seal for FFIEC 031 Call Report submission',
  'report.seal.gafi': 'Seal for FATF Mutual Evaluation Report',
  'report.seal.ohada': 'Seal for OHADA SYSCOHADA submission',

  'evidence.chain': 'Tamper-evident chain — {{count}} proofs',
  'evidence.chain.verified': 'Chain verified — {{count}} tamper-proof entries',
  'evidence.chain.broken': 'CHAIN BROKEN — {{count}} entries, {{broken}} broken links',

  'rcci.approve': 'RCCI Approval Required — 4-Eyes Principle',
  'rcci.sod': 'Segregation of Duties — RCCI cannot validate own controls',
  'coo.signoff': 'COO Sign-off Required — Final approval mandatory',

  'bceao.art42': 'AML Vigilance — PEP Monitoring (Art. 42)',
  'bceao.circ.2017': 'Governance — Circulaire 01-2017/CBAO',
  'bceao.lbft': 'AML/CFT — Loi Uniforme UEMOA',

  'cobac.r2016': 'COBAC R-2016/01 — Capital Adequacy',
  'cobac.r2017': 'COBAC R-2017/04 — Governance',

  'acpr.crr3': 'CRR3 Article 92 — Capital Requirements',
  'acpr.amld6': 'AMLD6 Article 3 — Beneficial Ownership Register',

  'fca.syssc': 'Systems & Controls Sourcebook — SYSC 4.1',
  'fca.mlr': 'Money Laundering Regulations 2017 — MLR 28',
  'fca.smr': 'Senior Managers Regime — SM&CR Attestations',

  'mas.626': 'MAS Notice 626 — AML/CFT Requirements',
  'mas.637': 'MAS Notice 637 — Capital Adequacy',

  'fed.regyy': 'Regulation YY §252 — CCAR Stress Testing',
  'fed.bsa': 'BSA 31 CFR §1020 — SAR/CTR Filing',
  'fed.ffiec': 'FFIEC 031 — Consolidated Reports of Condition and Income',

  'gafi.r1': 'FATF Recommendation 1 — Risk Assessment',
  'gafi.r10': 'FATF Recommendation 10 — Customer Due Diligence',
  'gafi.r26': 'FATF Recommendation 26 — Supervision',

  'ohada.audcif': 'OHADA AUDCIF — Accounting Standards',
  'ohada.societe': 'OHADA Uniform Act — Commercial Companies',

  'jurisdiction.switch': 'Switching jurisdiction to {{regulator}}',
  'jurisdiction.active': 'Active jurisdiction: {{regulator}} ({{region}})',
  'jurisdiction.rules': '{{count}} rules loaded for {{regulator}}',

  'pki.verify': 'PKI Verification: {{regulator}} signature',
  'pki.valid': 'Signature verified — {{regulator}} v{{version}}',
  'pki.invalid': 'INVALID SIGNATURE — {{regulator}} v{{version}}',
  'pki.multi': 'Multi-Signature: {{passed}}/{{total}} passed (threshold: {{threshold}})',

  'sync.mode.offline': 'Offline Mode — Export/Import .db files',
  'sync.mode.p2p': 'P2P Mode — {{peers}} peer(s) connected on LAN/VPN',
  'sync.mode.disabled': 'Sync disabled — Local-only mode',

  'export.bundle.created': 'Global regulatory bundle created — {{jurisdictions}} jurisdiction(s)',
  'export.format.xbrl': 'XBRL Format',
  'export.format.corep': 'COREP/FINREP Format',
  'export.format.gabriel': 'GABRIEL Format',
  'export.format.mas626': 'MAS Notice 626 Format',
  'export.format.ffiec': 'FFIEC 031 Format',
  'export.format.mer': 'FATF MER Format',
};

export default regulator;



