const regulator = {
  'report.seal': 'Sigillo per presentazione a {{regulator}}',
  'report.seal.bceao': 'Sigillo per presentazione SURFI BCEAO',
  'report.seal.cobac': 'Sigillo per presentazione SESAME COBAC',
  'report.seal.acpr': 'Sigillo per presentazione COREP/FINREP ACPR',
  'report.seal.fca': 'Sigillo per presentazione GABRIEL FCA',
  'report.seal.mas': 'Sigillo per presentazione MAS Notice 626',
  'report.seal.fed': 'Sigillo per presentazione FFIEC 031 Call Report',
  'report.seal.gafi': 'Sigillo per Rapporto di Valutazione Reciproca GAFI',
  'report.seal.ohada': 'Sigillo per presentazione SYSCOHADA OHADA',

  'evidence.chain': 'Catena inalterabile — {{count}} prove',
  'evidence.chain.verified': 'Catena verificata — {{count}} voci inalterabili',
  'evidence.chain.broken': 'CATENA INTERROTTA — {{count}} voci, {{broken}} collegamenti interrotti',

  'rcci.approve': 'Approvazione RCCI Richiesta — Principio dei 4 Occhi',
  'rcci.sod': 'Separazione dei Compiti — RCCI non può validare i propri controlli',
  'coo.signoff': 'Firma DG Richiesta — Approvazione finale obbligatoria',

  'bceao.art42': 'Vigilanza AML — Monitoraggio PPE (Art. 42)',
  'bceao.circ.2017': 'Governance — Circulaire 01-2017/CBAO',
  'bceao.lbft': 'AML/CFT — Legge Uniforme UEMOA',

  'cobac.r2016': 'COBAC R-2016/01 — Adeguatezza Patrimoniale',
  'cobac.r2017': 'COBAC R-2017/04 — Governance',

  'acpr.crr3': 'CRR3 Articolo 92 — Requisiti Patrimoniali',
  'acpr.amld6': 'AMLD6 Articolo 3 — Registro dei Titolari Effettivi',

  'fca.syssc': 'Systems & Controls Sourcebook — SYSC 4.1',
  'fca.mlr': 'Money Laundering Regulations 2017 — MLR 28',
  'fca.smr': 'Senior Managers Regime — Attestazioni SM&CR',

  'mas.626': 'MAS Notice 626 — Requisiti AML/CFT',
  'mas.637': 'MAS Notice 637 — Adeguatezza Patrimoniale',

  'fed.regyy': 'Regulation YY §252 — Stress Test CCAR',
  'fed.bsa': 'BSA 31 CFR §1020 — Deposito SAR/CTR',
  'fed.ffiec': 'FFIEC 031 — Rapporto Consolidato di Condizione e Reddito',

  'gafi.r1': 'GAFI Raccomandazione 1 — Valutazione dei Rischi',
  'gafi.r10': 'GAFI Raccomandazione 10 — Dovere di Diligenza',
  'gafi.r26': 'GAFI Raccomandazione 26 — Supervisione',

  'ohada.audcif': 'OHADA AUDCIF — Principi Contabili',
  'ohada.societe': 'OHADA Atto Uniforme — Società Commerciali',

  'jurisdiction.switch': 'Cambio giurisdizione verso {{regulator}}',
  'jurisdiction.active': 'Giurisdizione attiva: {{regulator}} ({{region}})',
  'jurisdiction.rules': '{{count}} regole caricate per {{regulator}}',

  'pki.verify': 'Verifica PKI: firma {{regulator}}',
  'pki.valid': 'Firma verificata — {{regulator}} v{{version}}',
  'pki.invalid': 'FIRMA NON VALIDA — {{regulator}} v{{version}}',
  'pki.multi': 'Multi-Firma: {{passed}}/{{total}} validate (soglia: {{threshold}})',

  'sync.mode.offline': 'Modalità Offline — Esporta/Importa file .kosdb',
  'sync.mode.p2p': 'Modalità P2P — {{peers}} peer connessi via LAN/VPN',
  'sync.mode.disabled': 'Sincronizzazione disattivata — Solo modalità locale',

  'export.bundle.created': 'Pacchetto regolatorio globale creato — {{jurisdictions}} giurisdizione(i)',
  'export.format.xbrl': 'Formato XBRL',
  'export.format.corep': 'Formato COREP/FINREP',
  'export.format.gabriel': 'Formato GABRIEL',
  'export.format.mas626': 'Formato MAS Notice 626',
  'export.format.ffiec': 'Formato FFIEC 031',
  'export.format.mer': 'Formato MER GAFI',
};

export default regulator;