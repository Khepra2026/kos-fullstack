import { logger } from '@/core/logger';
import { db, sha256 } from '@/shared/db/localDB';

// KOS Regtech AI — Horizon Scanning Local OCR
// Scan de documents réglementaires 100% local via Tesseract.js WASM
// Extraction NER + détection nouvelles obligations
// 0 réseau, 0 API externe, 0 fuite de données

const log = logger.child('local-ocr');

// ─── Types ───

interface ExtractedObligation {
  article: string;
  text: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  regulator: string;
  deadline?: string;
  keywords: string[];
}

interface ScanResult {
  newObligations: ExtractedObligation[];
  alertes: ExtractedObligation[];
  textLength: number;
  processingTime: number;
  hash: string;
}

// ─── OCR via Tesseract.js (chargement dynamique) ───

let tesseractModule: unknown = null;

async function loadTesseract(): Promise<unknown> {
  if (tesseractModule) return tesseractModule;

  try {
    const Tesseract = await import('tesseract.js');
    tesseractModule = Tesseract;
    log.info('Tesseract.js WASM loaded');
    return Tesseract;
  } catch {
    log.warn('Tesseract.js unavailable — using text extraction fallback');
    return null;
  }
}

// ─── Extraction texte depuis fichier ───

async function extractText(file: File): Promise<string> {
  const tesseract = await loadTesseract();

  if (tesseract) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const TesseractModule = tesseract as any;
      const { data } = await TesseractModule.recognize(file, 'fra', {
        logger: (info: { progress: number }) => {
          if (info.progress % 0.25 === 0) {
            log.debug('OCR progress', { progress: Math.round(info.progress * 100) });
          }
        },
      });
      log.info('OCR complete', { textLength: data.text.length });
      return data.text;
    } catch (err) {
      log.error('OCR failed', { error: String(err) });
      // Fallback: lecture directe si fichier texte
    }
  }

  // Fallback: lecture texte brut
  try {
    const text = await file.text();
    log.info('Fallback text extraction', { textLength: text.length });
    return text;
  } catch {
    log.error('Text extraction failed');
    return '';
  }
}

// ─── NER local — extraction d'entités réglementaires ───

const REGULATORY_PATTERNS = [
  // BCEAO
  { pattern: /Instruction\s+(?:BCEAO\s+)?n?[°o]?\s*(\d{3,4}[-/]\d{2,4}[-/]\d{2,4})/gi, regulator: 'BCEAO' },
  { pattern: /Circulaire\s+(?:BCEAO\s+)?n?[°o]?\s*(\d{2,4}[-/]\d{2,4})/gi, regulator: 'BCEAO' },
  { pattern: /D[ée]cision\s+(?:BCEAO\s+)?n?[°o]?\s*(\d{3,4})/gi, regulator: 'BCEAO' },

  // COBAC
  { pattern: /R[èe]glement\s+(?:COBAC\s+)?(?:n?[°o]?\s*)?([RC]-?\d{4}\/\d{2,4})/gi, regulator: 'COBAC' },
  { pattern: /D[ée]cision\s+(?:COBAC\s+)?(?:n?[°o]?\s*)?([D]-?\d{4}\/\d{2,4})/gi, regulator: 'COBAC' },

  // GAFI
  { pattern: /Recommandation\s+(?:GAFI\s+)?(?:n?[°o]?\s*)?(\d{1,2})/gi, regulator: 'GAFI' },

  // OHADA
  { pattern: /Acte\s+Uniforme\s+(?:OHADA\s+)?(?:relatif\s+(?:au|aux|à\s+l[ae]?)\s+)?([A-Z][a-zéèêëàâîïôöùûç\s]+)/gi, regulator: 'OHADA' },

  // UEMOA
  { pattern: /Directive\s+(?:UEMOA\s+)?(?:n?[°o]?\s*)?(\d{2,4}\/\d{2,4})/gi, regulator: 'UEMOA' },

  // Dates de mise en vigueur
  { pattern: /(?:entr[eé]e?\s+(?:en|dans)\s+vigueur|prend\s+effet|applicable\s+(?:à\s+compter\s+)?(?:du|le|au))\s+(\d{1,2}\s+(?:janvier|f[ée]vrier|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|d[ée]cembre)\s+\d{4})/gi, regulator: 'DEADLINE' },
];

const SEVERITY_KEYWORDS = {
  HIGH: ['immédiat', 'immédiate', 'sans délai', 'obligatoire', 'interdiction', 'sanction', 'pénalité', 'astreinte', 'retrait', 'suspension'],
  MEDIUM: ['dans les 30 jours', 'dans les 60 jours', 'dans les 90 jours', 'trimestriel', 'semestriel', 'doit', 'doivent', 'requis'],
  LOW: ['recommande', 'suggère', 'devrait', 'pourrait', 'bonne pratique', 'annuel'],
};

function extractObligations(text: string): ExtractedObligation[] {
  const obligations: ExtractedObligation[] = [];
  const sentences = text.split(/[.;!?]\s+/);

  for (const sentence of sentences) {
    for (const { pattern, regulator } of REGULATORY_PATTERNS) {
      if (regulator === 'DEADLINE') continue; // Traité séparément
      pattern.lastIndex = 0;
      const match = pattern.exec(sentence);
      if (match) {
        // Déterminer la sévérité
        const sentenceLower = sentence.toLowerCase();
        let severity: ExtractedObligation['severity'] = 'LOW';

        for (const [level, keywords] of Object.entries(SEVERITY_KEYWORDS)) {
          if (keywords.some((kw) => sentenceLower.includes(kw))) {
            severity = level as ExtractedObligation['severity'];
            break;
          }
        }

        // Extraire deadline si présente
        let deadline: string | undefined;
        for (const dlPattern of REGULATORY_PATTERNS.filter((p) => p.regulator === 'DEADLINE')) {
          dlPattern.pattern.lastIndex = 0;
          const dlMatch = dlPattern.pattern.exec(sentence);
          if (dlMatch) {
            deadline = dlMatch[1];
            break;
          }
        }

        // Mots-clés
        const keywords = [
          ...SEVERITY_KEYWORDS[severity].filter((kw) => sentenceLower.includes(kw)),
          match[1] || '',
        ].filter(Boolean);

        obligations.push({
          article: match[0].trim(),
          text: sentence.trim(),
          severity,
          regulator,
          deadline,
          keywords: [...new Set(keywords)],
        });

        break; // Une seule correspondance par phrase
      }
    }
  }

  // Déduplication
  const seen = new Set<string>();
  return obligations.filter((o) => {
    const key = `${o.regulator}|${o.article}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Détection nouvelles obligations vs existantes ───

function detectNewObligations(
  extracted: ExtractedObligation[],
  existingRefs: string[]
): ExtractedObligation[] {
  return extracted.filter(
    (o) => !existingRefs.some((ref) => ref.includes(o.article) || o.article.includes(ref))
  );
}

// ─── API principale ───

export async function scanJOFile(file: File): Promise<ScanResult> {
  const startTime = performance.now();

  log.info('Scanning file', { name: file.name, size: file.size });

  // 1. OCR
  const text = await extractText(file);
  if (!text) {
    throw new Error('Impossible d\'extraire le texte du document');
  }

  // 2. Extraction NER
  const allObligations = extractObligations(text);

  // 3. Récupération références existantes
  const existingRules = await db.rules.toArray();
  const existingRefs = existingRules.map((r) => r.ref);

  // 4. Détection nouveautés
  const newObligations = detectNewObligations(allObligations, existingRefs);

  // 5. Alertes
  const alertes = newObligations.filter((o) => o.severity === 'HIGH');

  const processingTime = performance.now() - startTime;
  const resultHash = await sha256(JSON.stringify({ newObligations, alertes, ts: Date.now() }));

  const result: ScanResult = {
    newObligations,
    alertes,
    textLength: text.length,
    processingTime: Math.round(processingTime),
    hash: resultHash,
  };

  log.info('Scan complete', {
    obligations: allObligations.length,
    newObligations: newObligations.length,
    alertes: alertes.length,
    time: `${processingTime.toFixed(0)}ms`,
  });

  return result;
}

// ─── Scanner UEMOA/CEMAC (mock autonome) ───

export async function scanUEMOA(): Promise<{ updates: ExtractedObligation[]; scannedAt: string }> {
  log.info('Scanning UEMOA/CEMAC sources');

  // Simulation scan autonome — en prod: crawler local + OCR
  await new Promise((r) => setTimeout(r, 200));

  const updates: ExtractedObligation[] = [
    {
      article: 'Instruction BCEAO 008-05-2015',
      text: 'Instruction relative aux conditions et modalités d\'exercice des émetteurs de monnaie électronique dans l\'UEMOA',
      severity: 'HIGH',
      regulator: 'BCEAO',
      keywords: ['monnaie électronique', 'émetteurs', 'conditions'],
    },
    {
      article: 'Règlement COBAC R-2025/01',
      text: 'Règlement relatif à la cybersécurité des établissements de crédit et de microfinance',
      severity: 'HIGH',
      regulator: 'COBAC',
      keywords: ['cybersécurité', 'établissements', 'microfinance'],
    },
    {
      article: 'Recommandation GAFI n°15',
      text: 'Recommandation sur les nouvelles technologies — obligations PSAN',
      severity: 'MEDIUM',
      regulator: 'GAFI',
      keywords: ['nouvelles technologies', 'PSAN'],
    },
    {
      article: 'Acte Uniforme OHADA — Droit des Sociétés',
      text: 'Révision de l\'Acte Uniforme relatif au droit des sociétés commerciales et du GIE',
      severity: 'LOW',
      regulator: 'OHADA',
      keywords: ['sociétés commerciales', 'GIE'],
    },
  ];

  return { updates, scannedAt: new Date().toISOString() };
}

// ─── Notifier clients si mise à jour critique ───

export function notifyClients(updates: ExtractedObligation[]): void {
  const critical = updates.filter((u) => u.severity === 'HIGH');

  if (critical.length > 0) {
    log.warn('Alertes réglementaires critiques détectées', {
      count: critical.length,
      regulators: [...new Set(critical.map((u) => u.regulator))],
    });

    // En prod: notification push/email aux clients concernés
    // Pour l'instant: log + stockage local
    critical.forEach((alert) => {
      db.incidents.put({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        severity: 'HIGH',
        title: `Alerte réglementaire — ${alert.regulator}`,
        description: alert.text,
        regulation: alert.article,
        status: 'OPEN',
      });
    });
  }
}



