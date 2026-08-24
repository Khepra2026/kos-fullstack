import { logger } from '@/core/logger';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KOS Regtech AI — Horizon Scanning v1.0
// Veille réglementaire automatisée UEMOA / CEMAC / BCEAO / COBAC
// 0 API externe : tout le parsing est local
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RegulatoryUpdate {
  id: string;
  source: string;
  title: string;
  date: string;
  regulator: 'BCEAO' | 'UEMOA' | 'CEMAC' | 'COBAC' | 'GAFI' | 'OHADA' | 'BEAC';
  type: 'INSTRUCTION' | 'CIRCULAIRE' | 'DIRECTIVE' | 'DECISION' | 'RECOMMANDATION' | 'AVIS';
  severity: Severity;
  articles: string[];
  summary: string;
  impact: string;
  actions: string[];
  deadline?: string;
  applicableSectors: string[];
  affectedArticles: string[];
  notificationSent: boolean;
}

export interface ScanResult {
  scanId: string;
  date: string;
  sourcesScanned: number;
  updatesFound: number;
  criticalUpdates: number;
  updates: RegulatoryUpdate[];
}

// ─── Sources de veille (URLs publiques, pas d'API) ───

const REGULATORY_SOURCES = [
  'journalofficiel.uemoa.int',
  'cemac.int',
  'bceao.int',
  'beac.int',
  'cobac.cm',
  'fatf-gafi.org',
  'ohada.org',
  'centif.ci',
];

// ─── Mock data — Veille réglementaire simulée (autonome) ───

const MOCK_UPDATES: RegulatoryUpdate[] = [
  {
    id: 'scan-001',
    source: 'bceao.int',
    title: 'Instruction BCEAO 008-2026 : Renforcement des ratios de liquidité',
    date: '2026-06-15',
    regulator: 'BCEAO',
    type: 'INSTRUCTION',
    severity: 'HIGH',
    articles: ['Art.3', 'Art.7', 'Art.12'],
    summary:
      'Nouvelle instruction fixant le ratio de liquidité minimum à 100% pour les banques et 80% pour les SFD.',
    impact:
      'Impact direct sur la gestion ALM. Obligation de reporting mensuel supplémentaire. Sanctions renforcées en cas de non-conformité.',
    actions: [
      'Mettre à jour le calcul ALM dans les 30 jours',
      'Former les équipes trésorerie',
      'Adapter le reporting SURFI',
    ],
    deadline: '2026-09-15',
    applicableSectors: ['BANQUE', 'MICROFINANCE'],
    affectedArticles: ['Instruction 008-2026 Art.3', 'Instruction 008-2026 Art.7'],
    notificationSent: false,
  },
  {
    id: 'scan-002',
    source: 'cemac.int',
    title: 'Directive COBAC 05/26 — Cybersécurité des établissements financiers',
    date: '2026-06-28',
    regulator: 'COBAC',
    type: 'DIRECTIVE',
    severity: 'CRITICAL',
    articles: ['Art.4', 'Art.8', 'Art.15', 'Art.22'],
    summary:
      'Directive imposant un cadre de cybersécurité obligatoire pour tous les établissements financiers CEMAC.',
    impact:
      'Obligation de nommer un RSSI, audit de sécurité annuel, plan de continuité d\'activité testé semestriellement.',
    actions: [
      'Nommer un RSSI dans les 60 jours',
      'Réaliser un audit de sécurité initial',
      'Mettre en place un PCA testé',
      'Désigner un correspondant COBAC',
    ],
    deadline: '2026-12-31',
    applicableSectors: ['BANQUE', 'MICROFINANCE', 'FINTECH', 'ASSURANCE'],
    affectedArticles: [
      'Directive COBAC 05/26 Art.4',
      'Directive COBAC 05/26 Art.8',
      'Directive COBAC 05/26 Art.15',
    ],
    notificationSent: false,
  },
  {
    id: 'scan-003',
    source: 'fatf-gafi.org',
    title: 'GAFI — Mise à jour liste grise Juillet 2026',
    date: '2026-07-01',
    regulator: 'GAFI',
    type: 'DECISION',
    severity: 'HIGH',
    articles: ['Recommandation 19', 'Recommandation 29'],
    summary:
      'Mise à jour semestrielle de la liste des juridictions sous surveillance renforcée. 2 nouveaux pays ajoutés.',
    impact:
      'Obligation de due diligence renforcée pour les transactions impliquant ces juridictions. Mise à jour des procédures LBC/FT.',
    actions: [
      'Mettre à jour la liste des pays à haut risque dans le système',
      'Renforcer les contrôles CDD pour les nouvelles juridictions',
      'Former les équipes conformité',
    ],
    deadline: '2026-07-31',
    applicableSectors: ['BANQUE', 'MICROFINANCE', 'FINTECH', 'ASSURANCE'],
    affectedArticles: ['GAFI R.19', 'GAFI R.29'],
    notificationSent: false,
  },
  {
    id: 'scan-004',
    source: 'ohada.org',
    title: 'OHADA — Révision Acte Uniforme Sociétés Commerciales',
    date: '2026-05-20',
    regulator: 'OHADA',
    type: 'DIRECTIVE',
    severity: 'MEDIUM',
    articles: ['Art.140', 'Art.328', 'Art.540'],
    summary:
      'Modification des obligations de gouvernance : administrateur indépendant obligatoire dans les SA avec CA.',
    impact:
      'Impact sur la composition des Conseils d\'Administration. Délai de mise en conformité : 18 mois.',
    actions: [
      'Auditer la composition actuelle du CA',
      'Identifier les candidats administrateurs indépendants',
      'Préparer les résolutions AG',
    ],
    deadline: '2027-11-20',
    applicableSectors: ['BANQUE', 'MICROFINANCE', 'FINTECH', 'ASSURANCE', 'PME'],
    affectedArticles: ['AUSC Art.140', 'AUSC Art.540'],
    notificationSent: false,
  },
  {
    id: 'scan-005',
    source: 'bceao.int',
    title: 'Avis BCEAO — Projet de règlement fintech UEMOA',
    date: '2026-07-03',
    regulator: 'BCEAO',
    type: 'AVIS',
    severity: 'MEDIUM',
    articles: ['Art.2', 'Art.5', 'Art.9'],
    summary:
      'Consultation publique sur le cadre réglementaire des fintechs dans l\'UEMOA. Période de commentaires : 60 jours.',
    impact:
      'Futur cadre d\'agrément simplifié pour les fintechs. Obligations LBC/FT proportionnées au risque.',
    actions: [
      'Analyser le projet de règlement',
      'Préparer des commentaires avant la deadline',
      'Anticiper les impacts sur le business model',
    ],
    deadline: '2026-09-01',
    applicableSectors: ['FINTECH', 'BANQUE', 'MICROFINANCE'],
    affectedArticles: ['Projet Règlement Fintech Art.2', 'Projet Règlement Fintech Art.5'],
    notificationSent: false,
  },
];

// ─── Moteur de scan ───

class HorizonScanner {
  private log = logger.child('horizon-scanning');
  private scanCache: ScanResult | null = null;

  async scanUEMOA(): Promise<RegulatoryUpdate[]> {
    this.log.info('Scanning UEMOA regulatory sources');

    // Simulation locale — en prod, parser les flux RSS / pages officielles
    await new Promise((r) => setTimeout(r, 200));

    const uemoaUpdates = MOCK_UPDATES.filter(
      (u) =>
        u.regulator === 'BCEAO' ||
        u.regulator === 'UEMOA' ||
        u.regulator === 'OHADA'
    );

    this.log.info('UEMOA scan complete', { count: uemoaUpdates.length });
    return uemoaUpdates;
  }

  async scanCEMAC(): Promise<RegulatoryUpdate[]> {
    this.log.info('Scanning CEMAC regulatory sources');

    await new Promise((r) => setTimeout(r, 200));

    const cemacUpdates = MOCK_UPDATES.filter(
      (u) => u.regulator === 'COBAC' || u.regulator === 'CEMAC' || u.regulator === 'BEAC'
    );

    this.log.info('CEMAC scan complete', { count: cemacUpdates.length });
    return cemacUpdates;
  }

  async scanAll(): Promise<ScanResult> {
    this.log.info('Starting full horizon scan');

    // En prod, paralléliser avec Web Workers
    const [uemoa, cemac] = await Promise.all([this.scanUEMOA(), this.scanCEMAC()]);

    const allUpdates = [...uemoa, ...cemac];
    const criticalUpdates = allUpdates.filter((u) => u.severity === 'CRITICAL' || u.severity === 'HIGH');

    const result: ScanResult = {
      scanId: crypto.randomUUID(),
      date: new Date().toISOString(),
      sourcesScanned: REGULATORY_SOURCES.length,
      updatesFound: allUpdates.length,
      criticalUpdates: criticalUpdates.length,
      updates: allUpdates.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    };

    this.scanCache = result;

    // Alerter sur les mises à jour critiques
    if (criticalUpdates.length > 0) {
      this.log.warn('Critical regulatory updates detected', {
        count: criticalUpdates.length,
        updates: criticalUpdates.map((u) => u.title),
      });
      this.notifyCriticalUpdates(criticalUpdates);
    }

    this.log.info('Full scan complete', {
      total: result.updatesFound,
      critical: result.criticalUpdates,
    });

    return result;
  }

  private async notifyCriticalUpdates(updates: RegulatoryUpdate[]): Promise<void> {
    // Notification interne — en prod, email/SMS/Webhook
    for (const update of updates) {
      update.notificationSent = true;
      this.log.info('Critical update notification', {
        title: update.title,
        severity: update.severity,
        deadline: update.deadline,
      });
    }
  }

  async getCachedScan(): Promise<ScanResult | null> {
    return this.scanCache;
  }

  getRegulatorySources(): string[] {
    return REGULATORY_SOURCES;
  }
}

// ─── Singleton ───

export const horizonScanner = new HorizonScanner();
export { MOCK_UPDATES, REGULATORY_SOURCES };



