const regulator = {
  'report.seal': 'Siegel zur Einreichung bei {{regulator}}',
  'report.seal.bceao': 'Siegel zur SURFI-Einreichung BCEAO',
  'report.seal.cobac': 'Siegel zur SESAME-Einreichung COBAC',
  'report.seal.acpr': 'Siegel zur COREP/FINREP-Einreichung ACPR',
  'report.seal.fca': 'Siegel zur GABRIEL-Einreichung FCA',
  'report.seal.mas': 'Siegel zur MAS Notice 626-Einreichung',
  'report.seal.fed': 'Siegel zur FFIEC 031 Call Report-Einreichung',
  'report.seal.gafi': 'Siegel zum FATF Mutual Evaluation Report',
  'report.seal.ohada': 'Siegel zur SYSCOHADA-Einreichung OHADA',

  'evidence.chain': 'Manipulationssichere Kette — {{count}} Nachweise',
  'evidence.chain.verified': 'Kette verifiziert — {{count}} manipulationssichere Einträge',
  'evidence.chain.broken': 'KETTE UNTERBROCHEN — {{count}} Einträge, {{broken}} defekte Verknüpfungen',

  'rcci.approve': 'RCCI-Genehmigung erforderlich — 4-Augen-Prinzip',
  'rcci.sod': 'Funktionstrennung — RCCI darf eigene Kontrollen nicht validieren',
  'coo.signoff': 'COO-Freigabe erforderlich — Endgültige Genehmigung obligatorisch',

  'bceao.art42': 'AML-Wachsamkeit — PEP-Überwachung (Art. 42)',
  'bceao.circ.2017': 'Governance — Rundschreiben 01-2017/CBAO',
  'bceao.lbft': 'AML/CFT — Einheitliches UEMOA-Gesetz',

  'cobac.r2016': 'COBAC R-2016/01 — Eigenkapitalanforderungen',
  'cobac.r2017': 'COBAC R-2017/04 — Governance',

  'acpr.crr3': 'CRR3 Artikel 92 — Eigenkapitalanforderungen',
  'acpr.amld6': 'AMLD6 Artikel 3 — Transparenzregister',

  'fca.syssc': 'Systems & Controls Sourcebook — SYSC 4.1',
  'fca.mlr': 'Money Laundering Regulations 2017 — MLR 28',
  'fca.smr': 'Senior Managers Regime — SM&CR-Bestätigungen',

  'mas.626': 'MAS Notice 626 — AML/CFT-Anforderungen',
  'mas.637': 'MAS Notice 637 — Eigenkapitalanforderungen',

  'fed.regyy': 'Regulation YY §252 — CCAR-Stresstests',
  'fed.bsa': 'BSA 31 CFR §1020 — SAR/CTR-Einreichung',
  'fed.ffiec': 'FFIEC 031 — Konsolidierter Zustands- und Ertragsbericht',

  'gafi.r1': 'FATF Empfehlung 1 — Risikobewertung',
  'gafi.r10': 'FATF Empfehlung 10 — Sorgfaltspflichten',
  'gafi.r26': 'FATF Empfehlung 26 — Aufsicht',

  'ohada.audcif': 'OHADA AUDCIF — Rechnungslegungsstandards',
  'ohada.societe': 'OHADA Einheitliches Gesetz — Handelsgesellschaften',

  'jurisdiction.switch': 'Wechsel der Jurisdiktion zu {{regulator}}',
  'jurisdiction.active': 'Aktive Jurisdiktion: {{regulator}} ({{region}})',
  'jurisdiction.rules': '{{count}} Regeln für {{regulator}} geladen',

  'pki.verify': 'PKI-Verifizierung: {{regulator}}-Signatur',
  'pki.valid': 'Signatur verifiziert — {{regulator}} v{{version}}',
  'pki.invalid': 'UNGÜLTIGE SIGNATUR — {{regulator}} v{{version}}',
  'pki.multi': 'Multi-Signatur: {{passed}}/{{total}} validiert (Schwelle: {{threshold}})',

  'sync.mode.offline': 'Offline-Modus — .kosdb-Dateien exportieren/importieren',
  'sync.mode.p2p': 'P2P-Modus — {{peers}} Peer(s) über LAN/VPN verbunden',
  'sync.mode.disabled': 'Synchronisation deaktiviert — Nur lokaler Modus',

  'export.bundle.created': 'Globales regulatorisches Bundle erstellt — {{jurisdictions}} Jurisdiktion(en)',
  'export.format.xbrl': 'XBRL-Format',
  'export.format.corep': 'COREP/FINREP-Format',
  'export.format.gabriel': 'GABRIEL-Format',
  'export.format.mas626': 'MAS Notice 626-Format',
  'export.format.ffiec': 'FFIEC 031-Format',
  'export.format.mer': 'FATF MER-Format',
};

export default regulator;