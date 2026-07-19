const regulator = {
  'report.seal': '{{regulator}}提出用封印',
  'report.seal.bceao': 'BCEAO SURFI提出用封印',
  'report.seal.cobac': 'COBAC SESAME提出用封印',
  'report.seal.acpr': 'ACPR COREP/FINREP提出用封印',
  'report.seal.fca': 'FCA GABRIEL提出用封印',
  'report.seal.mas': 'MAS Notice 626提出用封印',
  'report.seal.fed': 'FFIEC 031 Call Report提出用封印',
  'report.seal.gafi': 'FATF相互評価報告書提出用封印',
  'report.seal.ohada': 'OHADA SYSCOHADA提出用封印',

  'evidence.chain': '改ざん防止チェーン — {{count}}件の証拠',
  'evidence.chain.verified': 'チェーン検証済み — {{count}}件の改ざん防止記録',
  'evidence.chain.broken': 'チェーン破損 — {{count}}件の記録、{{broken}}件の破損リンク',

  'rcci.approve': 'RCCI承認必須 — 4アイ原則',
  'rcci.sod': '職務分掌 — RCCIは自身の管理策を検証不可',
  'coo.signoff': 'COO署名必須 — 最終承認は義務',

  'bceao.art42': 'AML警戒 — PEP監視（第42条）',
  'bceao.circ.2017': 'ガバナンス — 通達01-2017/CBAO',
  'bceao.lbft': 'AML/CFT — UEMOA統一法',

  'jurisdiction.switch': '管轄を{{regulator}}に切替',
  'jurisdiction.active': 'アクティブ管轄：{{regulator}}（{{region}}）',
  'jurisdiction.rules': '{{regulator}}に{{count}}件のルールを読み込み',

  'pki.verify': 'PKI検証：{{regulator}}署名',
  'pki.valid': '署名検証済 — {{regulator}} v{{version}}',
  'pki.invalid': '無効な署名 — {{regulator}} v{{version}}',

  'sync.mode.offline': 'オフラインモード — .dbファイルのエクスポート/インポート',
  'sync.mode.p2p': 'P2Pモード — LAN/VPN上で{{peers}}ピア接続中',
  'sync.mode.disabled': '同期無効 — ローカルのみ',

  'export.bundle.created': 'グローバル規制バンドル作成 — {{jurisdictions}}管轄',
  'export.format.xbrl': 'XBRL形式',
  'export.format.mer': 'FATF MER形式',
};

export default regulator;



