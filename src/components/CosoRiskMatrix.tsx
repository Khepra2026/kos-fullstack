import React from 'react';

interface RiskItem {
  id: string;
  category: 'Opérationnel' | 'Conformité' | 'Financier' | 'Stratégique';
  description: string;
  inherentRisk: 'Élevé' | 'Moyen' | 'Faible';
  residualRisk: 'Élevé' | 'Moyen' | 'Faible';
  mitigationAction: string;
}

interface CosoMatrixProps {
  risks?: RiskItem[];
}

export const CosoRiskMatrix: React.FC<CosoMatrixProps> = ({ risks = defaultRisks }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Matrice des Risques et Contrôles (Cadre COSO / Big Four)</h3>
        <span style={styles.badge}>Internal Control Framework</span>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Catégorie</th>
            <th style={styles.th}>Description du Risque</th>
            <th style={styles.th}>Risque Inhérent</th>
            <th style={styles.th}>Risque Résiduel</th>
            <th style={styles.th}>Plan de Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id}>
              <td style={styles.td}><strong>{risk.category}</strong></td>
              <td style={styles.td}>{risk.description}</td>
              <td style={styles.td}>
                <span style={risk.inherentRisk === 'Élevé' ? styles.badgeHigh : styles.badgeMedium}>
                  {risk.inherentRisk}
                </span>
              </td>
              <td style={styles.td}>
                <span style={risk.residualRisk === 'Élevé' ? styles.badgeHigh : styles.badgeLow}>
                  {risk.residualRisk}
                </span>
              </td>
              <td style={styles.td}>{risk.mitigationAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const defaultRisks: RiskItem[] = [
  {
    id: 'R-01',
    category: 'Conformité',
    description: 'Non-respect du ratio de solvabilité minimum (11.5% BCEAO).',
    inherentRisk: 'Élevé',
    residualRisk: 'Moyen',
    mitigationAction: 'Augmentation programmée des fonds propres de base (CET1).'
  },
  {
    id: 'R-02',
    category: 'Financier',
    description: 'Insuffisance de liquidité à court terme face aux passifs exigibles.',
    inherentRisk: 'Élevé',
    residualRisk: 'Faible',
    mitigationAction: 'Maintien d’une réserve tampon d’actifs liquides de haute qualité.'
  },
  {
    id: 'R-03',
    category: 'Opérationnel',
    description: 'Absence de validation multi-regard (Four-Eyes Principle) sur les engagements.',
    inherentRisk: 'Moyen',
    residualRisk: 'Faible',
    mitigationAction: 'Implémentation du workflow de double validation numérique.'
  }
];

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #f1f5f9',
    paddingBottom: '12px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  badge: {
    background: '#fef3c7',
    color: '#92400e',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #fde68a'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '13px'
  },
  th: {
    background: '#1e293b',
    color: '#ffffff',
    textAlign: 'left' as const,
    padding: '10px',
    fontWeight: '600'
  },
  td: {
    border: '1px solid #e2e8f0',
    padding: '10px',
    color: '#334155',
    verticalAlign: 'top' as const
  },
  badgeHigh: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '11px'
  },
  badgeMedium: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '11px'
  },
  badgeLow: {
    background: '#dcfce7',
    color: '#166534',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '11px'
  }
};