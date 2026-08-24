import { useMemo } from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KOS Regtech AI — Risk Matrix v1.0
// Matrice AMF/BCBS temps réel avec heatmap interactive
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type RiskCategory =
  | 'CREDIT'
  | 'MARCHE'
  | 'LIQUIDITE'
  | 'OPERATIONNEL'
  | 'CONFORMITE'
  | 'REPUTATION'
  | 'STRATEGIQUE'
  | 'CYBERSECURITE';

export type RiskLevel = 'FAIBLE' | 'MODERE' | 'ELEVE' | 'CRITIQUE';

export interface RiskItem {
  id: string;
  category: RiskCategory;
  label: string;
  description: string;
  probabilite: number; // 0-100
  impact: number; // 0-100
  niveau: RiskLevel;
  tendance: 'STABLE' | 'HAUSSE' | 'BAISSE';
  controles: string[];
  kri: {
    nom: string;
    valeur: number;
    seuilAlerte: number;
    seuilCritique: number;
  }[];
  responsable: string;
  derniereRevue: string;
  prochaineRevue: string;
}

export interface RiskMatrixData {
  dateGeneration: string;
  totalRisques: number;
  parNiveau: Record<RiskLevel, number>;
  parCategorie: Record<RiskCategory, number>;
  risques: RiskItem[];
  heatmapData: { x: number; y: number; count: number }[];
}

// ─── Mock data — Matrice des risques KOS ───

const MOCK_RISKS: RiskItem[] = [
  {
    id: 'risk-001',
    category: 'CONFORMITE',
    label: 'Non-conformité LBC/FT',
    description:
      'Risque de sanction pour non-respect des obligations de lutte contre le blanchiment et le financement du terrorisme.',
    probabilite: 65,
    impact: 90,
    niveau: 'CRITIQUE',
    tendance: 'HAUSSE',
    controles: [
      'Procédure CDD renforcée',
      'Déclarations de soupçons automatisées',
      'Formation annuelle obligatoire',
    ],
    kri: [
      { nom: 'Déclarations de soupçons / trimestre', valeur: 12, seuilAlerte: 5, seuilCritique: 20 },
      { nom: 'Clients sans CDD complète (%)', valeur: 8, seuilAlerte: 5, seuilCritique: 15 },
    ],
    responsable: 'Responsable Conformité',
    derniereRevue: '2026-06-15',
    prochaineRevue: '2026-09-15',
  },
  {
    id: 'risk-002',
    category: 'CREDIT',
    label: 'Dégradation du portefeuille de crédit',
    description:
      'Augmentation des créances douteuses suite à la conjoncture économique.',
    probabilite: 45,
    impact: 75,
    niveau: 'ELEVE',
    tendance: 'HAUSSE',
    controles: [
      'Analyse trimestrielle du portefeuille',
      'Provisionnement IFRS 9',
      'Comité de crédit mensuel',
    ],
    kri: [
      { nom: 'Taux de NPL (%)', valeur: 12.5, seuilAlerte: 10, seuilCritique: 20 },
      { nom: 'Taux de couverture provisions (%)', valeur: 65, seuilAlerte: 70, seuilCritique: 50 },
    ],
    responsable: 'Directeur des Risques',
    derniereRevue: '2026-06-30',
    prochaineRevue: '2026-09-30',
  },
  {
    id: 'risk-003',
    category: 'CYBERSECURITE',
    label: 'Attaque ransomware',
    description: 'Risque de compromission des systèmes par rançongiciel avec chiffrement des données.',
    probabilite: 35,
    impact: 95,
    niveau: 'CRITIQUE',
    tendance: 'HAUSSE',
    controles: [
      'Sauvegardes quotidiennes isolées',
      'EDR déployé sur tous les postes',
      'Tests d\'intrusion semestriels',
      'Plan de réponse à incident',
    ],
    kri: [
      { nom: 'Correctifs critiques non appliqués (j)', valeur: 3, seuilAlerte: 7, seuilCritique: 14 },
      { nom: 'Tentatives phishing bloquées/mois', valeur: 47, seuilAlerte: 20, seuilCritique: 100 },
    ],
    responsable: 'RSSI',
    derniereRevue: '2026-07-01',
    prochaineRevue: '2026-10-01',
  },
  {
    id: 'risk-004',
    category: 'LIQUIDITE',
    label: 'Tension de liquidité',
    description: 'Risque de ne pas pouvoir faire face aux engagements à vue.',
    probabilite: 25,
    impact: 80,
    niveau: 'ELEVE',
    tendance: 'STABLE',
    controles: [
      'Ratio LCR > 100%',
      'Plan de financement d\'urgence',
      'Diversification des sources de refinancement',
    ],
    kri: [
      { nom: 'Ratio LCR (%)', valeur: 115, seuilAlerte: 110, seuilCritique: 100 },
      { nom: 'Gap de liquidité 30j (Mds FCFA)', valeur: 2.3, seuilAlerte: 5, seuilCritique: 1 },
    ],
    responsable: 'Directeur Financier',
    derniereRevue: '2026-06-30',
    prochaineRevue: '2026-09-30',
  },
  {
    id: 'risk-005',
    category: 'OPERATIONNEL',
    label: 'Défaillance du Core Banking System',
    description: 'Indisponibilité prolongée du système d\'information bancaire.',
    probabilite: 20,
    impact: 85,
    niveau: 'ELEVE',
    tendance: 'STABLE',
    controles: [
      'Architecture HA active-active',
      'PCA testé semestriellement',
      'Contrat SLA éditeur avec pénalités',
    ],
    kri: [
      { nom: 'Disponibilité SI (%)', valeur: 99.95, seuilAlerte: 99.9, seuilCritique: 99.5 },
      { nom: 'MTTR incidents critiques (h)', valeur: 2.5, seuilAlerte: 4, seuilCritique: 8 },
    ],
    responsable: 'DSI',
    derniereRevue: '2026-06-15',
    prochaineRevue: '2026-12-15',
  },
  {
    id: 'risk-006',
    category: 'STRATEGIQUE',
    label: 'Arrivée concurrent fintech agressive',
    description:
      'Perte de parts de marché face à des fintechs non régulées proposant des services similaires.',
    probabilite: 50,
    impact: 60,
    niveau: 'ELEVE',
    tendance: 'HAUSSE',
    controles: [
      'Veille concurrentielle trimestrielle',
      'Innovation lab interne',
      'Partenariats fintech',
    ],
    kri: [
      { nom: 'Parts de marché digital (%)', valeur: 22, seuilAlerte: 25, seuilCritique: 15 },
      { nom: 'NPS clients', valeur: 42, seuilAlerte: 40, seuilCritique: 30 },
    ],
    responsable: 'Directeur Général',
    derniereRevue: '2026-06-30',
    prochaineRevue: '2026-09-30',
  },
  {
    id: 'risk-007',
    category: 'MARCHE',
    label: 'Risque de change UEMOA/EUR',
    description: 'Volatilité du taux de change EUR/XOF impactant les positions en devises.',
    probabilite: 40,
    impact: 55,
    niveau: 'MODERE',
    tendance: 'BAISSE',
    controles: [
      'Couverture forward',
      'Limite de position de change',
      'Suivi quotidien',
    ],
    kri: [
      { nom: 'Position nette de change (% FP)', valeur: 8, seuilAlerte: 15, seuilCritique: 25 },
      { nom: 'VaR 1j 99% (M FCFA)', valeur: 45, seuilAlerte: 100, seuilCritique: 200 },
    ],
    responsable: 'Trésorier',
    derniereRevue: '2026-07-01',
    prochaineRevue: '2026-10-01',
  },
  {
    id: 'risk-008',
    category: 'REPUTATION',
    label: 'Atteinte à la réputation',
    description:
      'Risque médiatique suite à un incident opérationnel ou de conformité.',
    probabilite: 30,
    impact: 70,
    niveau: 'MODERE',
    tendance: 'STABLE',
    controles: [
      'Plan de communication de crise',
      'Monitoring réseaux sociaux',
      'Politique RSE documentée',
    ],
    kri: [
      { nom: 'Mentions négatives/mois', valeur: 3, seuilAlerte: 10, seuilCritique: 25 },
      { nom: 'Délai réponse presse (h)', valeur: 4, seuilAlerte: 8, seuilCritique: 24 },
    ],
    responsable: 'Directeur Communication',
    derniereRevue: '2026-06-15',
    prochaineRevue: '2026-09-15',
  },
];

// ─── Couleurs heatmap ───

const heatmapColors: Record<RiskLevel, string> = {
  FAIBLE: 'bg-emerald-400',
  MODERE: 'bg-amber-400',
  ELEVE: 'bg-orange-500',
  CRITIQUE: 'bg-red-500',
};

const heatmapLabels: Record<RiskLevel, string> = {
  FAIBLE: 'Faible',
  MODERE: 'Modéré',
  ELEVE: 'Élevé',
  CRITIQUE: 'Critique',
};

const categoryLabels: Record<RiskCategory, string> = {
  CREDIT: 'Crédit',
  MARCHE: 'Marché',
  LIQUIDITE: 'Liquidité',
  OPERATIONNEL: 'Opérationnel',
  CONFORMITE: 'Conformité',
  REPUTATION: 'Réputation',
  STRATEGIQUE: 'Stratégique',
  CYBERSECURITE: 'Cybersécurité',
};

const categoryIcons: Record<RiskCategory, string> = {
  CREDIT: 'ri-bank-line',
  MARCHE: 'ri-line-chart-line',
  LIQUIDITE: 'ri-drop-line',
  OPERATIONNEL: 'ri-settings-3-line',
  CONFORMITE: 'ri-shield-check-line',
  REPUTATION: 'ri-star-line',
  STRATEGIQUE: 'ri-compasses-2-line',
  CYBERSECURITE: 'ri-shield-flash-line',
};

// ─── Hook useRiskMatrix ───

export function useRiskMatrix(): RiskMatrixData {
  return useMemo(() => {
    const parNiveau: Record<RiskLevel, number> = {
      FAIBLE: 0,
      MODERE: 0,
      ELEVE: 0,
      CRITIQUE: 0,
    };
    const parCategorie: Record<RiskCategory, number> = {
      CREDIT: 0,
      MARCHE: 0,
      LIQUIDITE: 0,
      OPERATIONNEL: 0,
      CONFORMITE: 0,
      REPUTATION: 0,
      STRATEGIQUE: 0,
      CYBERSECURITE: 0,
    };

    const heatmapData: { x: number; y: number; count: number }[] = [];
    const heatmapGrid: Record<string, number> = {};

    for (const risk of MOCK_RISKS) {
      parNiveau[risk.niveau]++;
      parCategorie[risk.category]++;

      const gridX = Math.floor(risk.probabilite / 20);
      const gridY = Math.floor(risk.impact / 20);
      const key = `${gridX}-${gridY}`;
      heatmapGrid[key] = (heatmapGrid[key] || 0) + 1;
    }

    for (const [key, count] of Object.entries(heatmapGrid)) {
      const [x, y] = key.split('-').map(Number);
      heatmapData.push({ x: x!, y: y!, count });
    }

    return {
      dateGeneration: new Date().toISOString(),
      totalRisques: MOCK_RISKS.length,
      parNiveau,
      parCategorie,
      risques: MOCK_RISKS,
      heatmapData,
    };
  }, []);
}

// ─── Composant RiskHeatmap ───

interface RiskHeatmapProps {
  data: RiskMatrixData;
  onRiskClick?: (risk: RiskItem) => void;
}

export function RiskHeatmap({ data, onRiskClick }: RiskHeatmapProps) {
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground-950">Matrice des Risques</h3>
        <span className="text-xs text-foreground-500">
          {data.totalRisques} risques &middot; {data.dateGeneration.slice(0, 10)}
        </span>
      </div>

      {/* Heatmap Grid 5x5 */}
      <div className="relative">
        {/* Axes labels */}
        <div className="flex items-end gap-1 mb-2">
          <div className="w-20"></div>
          <div className="flex-1 grid grid-cols-5 gap-1">
            {['Très faible', 'Faible', 'Moyen', 'Élevé', 'Très élevé'].map((label) => (
              <div key={label} className="text-center text-xs text-foreground-500">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1">
          <div className="w-20 flex flex-col justify-between py-1">
            {['Très élevé', 'Élevé', 'Moyen', 'Faible', 'Très faible']
              .reverse()
              .map((label) => (
                <div key={label} className="text-xs text-foreground-500 text-right pr-2 h-14 flex items-center justify-end">
                  {label}
                </div>
              ))}
          </div>

          <div className="flex-1 grid grid-cols-5 grid-rows-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => {
              const x = i % 5;
              const y = 4 - Math.floor(i / 5); // inversé pour Y croissant vers le haut
              const cellKey = `${x}-${y}`;
              const cellData = data.heatmapData.find((d) => d.x === x && d.y === y);

              const probability = (x + 1) * 20;
              const impact = (y + 1) * 20;
              const riskScore = probability * impact;

              let colorClass = 'bg-background-100';
              if (riskScore > 6000) colorClass = 'bg-red-200/70';
              else if (riskScore > 3000) colorClass = 'bg-orange-200/70';
              else if (riskScore > 1000) colorClass = 'bg-amber-100/70';
              else colorClass = 'bg-emerald-100/70';

              return (
                <div
                  key={i}
                  className={`h-14 rounded-md flex items-center justify-center cursor-pointer transition-colors hover:opacity-80 ${colorClass}`}
                  onClick={() => {
                    // Trouver un risque dans cette cellule
                    const risk = data.risques.find(
                      (r) =>
                        Math.floor(r.probabilite / 20) === x &&
                        Math.floor(r.impact / 20) === y
                    );
                    if (risk && onRiskClick) onRiskClick(risk);
                  }}
                >
                  {cellData && (
                    <span className="text-xs font-bold text-foreground-800">{cellData.count}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-foreground-500 text-center mt-2">Probabilité →</div>
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-foreground-500">
          Impact →
        </div>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-background-200/70">
        {(['FAIBLE', 'MODERE', 'ELEVE', 'CRITIQUE'] as RiskLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${heatmapColors[level]}`}></span>
            <span className="text-xs text-foreground-600">{heatmapLabels[level]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Composant RiskCard ───

interface RiskCardProps {
  risk: RiskItem;
  onClick?: () => void;
}

export function RiskCard({ risk, onClick }: RiskCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-background-50 border border-background-200/70 rounded-lg p-4 hover:border-background-300/60 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-foreground-500">
            <i className={categoryIcons[risk.category]}></i>
          </span>
          <span className="text-xs text-foreground-500">{categoryLabels[risk.category]}</span>
        </div>
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full ${
            risk.niveau === 'CRITIQUE'
              ? 'bg-red-500'
              : risk.niveau === 'ELEVE'
                ? 'bg-orange-500'
                : risk.niveau === 'MODERE'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
          }`}
        ></span>
      </div>

      <h4 className="text-sm font-semibold text-foreground-950 mb-1">{risk.label}</h4>
      <p className="text-xs text-foreground-600 line-clamp-2 mb-3">{risk.description}</p>

      <div className="flex items-center gap-4 text-xs text-foreground-500">
        <span>P: {risk.probabilite}%</span>
        <span>I: {risk.impact}%</span>
        <span
          className={`ml-auto ${
            risk.tendance === 'HAUSSE'
              ? 'text-red-600'
              : risk.tendance === 'BAISSE'
                ? 'text-emerald-600'
                : 'text-foreground-500'
          }`}
        >
          <i
            className={`${
              risk.tendance === 'HAUSSE'
                ? 'ri-arrow-up-line'
                : risk.tendance === 'BAISSE'
                  ? 'ri-arrow-down-line'
                  : 'ri-subtract-line'
            } mr-0.5`}
          ></i>
          {risk.tendance === 'HAUSSE' ? 'Hausse' : risk.tendance === 'BAISSE' ? 'Baisse' : 'Stable'}
        </span>
      </div>
    </div>
  );
}

export { MOCK_RISKS, heatmapColors, heatmapLabels, categoryLabels, categoryIcons };



