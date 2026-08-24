const regulator = {
  'report.seal': '提交至{{regulator}}的封存印章',
  'report.seal.bceao': '提交至BCEAO SURFI的封存印章',
  'report.seal.cobac': '提交至COBAC SESAME的封存印章',
  'report.seal.acpr': '提交至ACPR COREP/FINREP的封存印章',
  'report.seal.fca': '提交至FCA GABRIEL的封存印章',
  'report.seal.mas': '提交至MAS Notice 626的封存印章',
  'report.seal.fed': '提交至FFIEC 031 Call Report的封存印章',
  'report.seal.gafi': '金融行动特别工作组互评估报告封存印章',
  'report.seal.ohada': '提交至OHADA SYSCOHADA的封存印章',

  'evidence.chain': '防篡改链 — {{count}}项证据',
  'evidence.chain.verified': '链已验证 — {{count}}条防篡改记录',
  'evidence.chain.broken': '链已断裂 — {{count}}条记录，{{broken}}处断裂链接',

  'rcci.approve': '需要合规官批准 — 四眼原则',
  'rcci.sod': '职责分离 — 合规官不得验证自身控制措施',
  'coo.signoff': '需要首席运营官签署 — 最终批准为强制性',

  'bceao.art42': '反洗钱警惕 — 政治公众人物监控（第42条）',
  'bceao.circ.2017': '治理 — 通函01-2017/CBAO',
  'bceao.lbft': '反洗钱/反恐融资 — UEMOA统一法律',

  'jurisdiction.switch': '切换管辖至{{regulator}}',
  'jurisdiction.active': '当前管辖：{{regulator}}（{{region}}）',
  'jurisdiction.rules': '已为{{regulator}}加载{{count}}条规则',

  'pki.verify': 'PKI验证：{{regulator}}签名',
  'pki.valid': '签名已验证 — {{regulator}} v{{version}}',
  'pki.invalid': '签名无效 — {{regulator}} v{{version}}',

  'sync.mode.offline': '离线模式 — 导出/导入.db文件',
  'sync.mode.p2p': 'P2P模式 — {{peers}}个对等节点通过LAN/VPN连接',
  'sync.mode.disabled': '同步已禁用 — 仅本地模式',

  'export.bundle.created': '全球监管包已创建 — {{jurisdictions}}个管辖区',
  'export.format.xbrl': 'XBRL格式',
  'export.format.mer': 'FATF互评估报告格式',
};

export default regulator;



