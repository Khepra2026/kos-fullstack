const regulator = {
  'report.seal': 'ختم للتقديم إلى {{regulator}}',
  'report.seal.bceao': 'ختم لتقديم SURFI البنك المركزي لدول غرب أفريقيا',
  'report.seal.cobac': 'ختم لتقديم SESAME كوباك',
  'report.seal.acpr': 'ختم لتقديم COREP/FINREP هيئة الرقابة الاحترازية',
  'report.seal.fca': 'ختم لتقديم GABRIEL هيئة السلوك المالي',
  'report.seal.mas': 'ختم لتقديم MAS Notice 626',
  'report.seal.fed': 'ختم لتقديم FFIEC 031',
  'report.seal.gafi': 'ختم لتقرير التقييم المتبادل FATF',
  'report.seal.ohada': 'ختم لتقديم SYSCOHADA أوحادا',

  'evidence.chain': 'سلسلة غير قابلة للتلاعب — {{count}} دليل',
  'evidence.chain.verified': 'سلسلة موثقة — {{count}} إدخال غير قابل للتلاعب',
  'evidence.chain.broken': 'سلسلة مكسورة — {{count}} إدخال، {{broken}} رابط مكسور',

  'rcci.approve': 'موافقة مسؤول الامتثال مطلوبة — مبدأ العيون الأربعة',
  'rcci.sod': 'فصل المهام — لا يمكن لمسؤول الامتثال التحقق من ضوابطه الخاصة',
  'coo.signoff': 'توقيع المدير العام مطلوب — موافقة نهائية إلزامية',

  'bceao.art42': 'اليقظة في مكافحة غسل الأموال — مراقبة الأشخاص السياسيين (مادة 42)',
  'bceao.circ.2017': 'الحوكمة — تعميم 01-2017/CBAO',
  'bceao.lbft': 'مكافحة غسل الأموال وتمويل الإرهاب — القانون الموحد للاتحاد',

  'jurisdiction.switch': 'تغيير الاختصاص إلى {{regulator}}',
  'jurisdiction.active': 'الاختصاص النشط: {{regulator}} ({{region}})',
  'jurisdiction.rules': '{{count}} قاعدة محملة لـ {{regulator}}',

  'pki.verify': 'تحقق PKI: توقيع {{regulator}}',
  'pki.valid': 'توقيع موثق — {{regulator}} نسخة {{version}}',
  'pki.invalid': 'توقيع غير صالح — {{regulator}} نسخة {{version}}',

  'sync.mode.offline': 'وضع غير متصل — تصدير/استيراد ملفات .kosdb',
  'sync.mode.p2p': 'وضع P2P — {{peers}} نظير متصل عبر LAN/VPN',
  'sync.mode.disabled': 'مزامنة معطلة — وضع محلي فقط',

  'export.bundle.created': 'حزمة تنظيمية عالمية منشأة — {{jurisdictions}} اختصاص',
  'export.format.xbrl': 'صيغة XBRL',
  'export.format.mer': 'صيغة تقرير التقييم المتبادل FATF',
};

export default regulator;