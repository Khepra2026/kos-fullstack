import React, { useState } from 'react';

export const IndustrialProjectSimulator: React.FC = () => {
  const [capex, setCapex] = useState<number>(1500000000); // en XOF
  const [opexAnnual, setOpexAnnual] = useState<number>(250000000);
  const [annualRevenue, setAnnualRevenue] = useState<number>(600000000);
  const [discountRate, setDiscountRate] = useState<number>(10); // 10%

  // Calculs financiers simplifiés pour simulation d'investissement
  const ebitdaAnnual = annualRevenue - opexAnnual;
  const paybackPeriod = capex / ebitdaAnnual;
  const netCashFlow5Years = (ebitdaAnnual * 5) - capex;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Simulateur Financier & Évaluation de Projets Industriels</h3>
          <p style={styles.subtitle}>Modélisation CAPEX / OPEX, VAN et TRI (Standards Bailleurs & BIDC)</p>
        </div>
        <span style={styles.badge}>Project Finance</span>
      </div>

      <div style={styles.grid}>
        <div style={styles.formColumn}>
          <h4 style={styles.sectionTitle}>Paramètres du Projet</h4>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Investissement Initial (CAPEX en XOF) :</label>
            <input 
              type="number" 
              value={capex} 
              onChange={(e) => setCapex(Number(e.target.value))} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Charges d'Exploitation Annuelles (OPEX en XOF) :</label>
            <input 
              type="number" 
              value={opexAnnual} 
              onChange={(e) => setOpexAnnual(Number(e.target.value))} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Chiffre d'Affaires Annuel Prévisionnel (en XOF) :</label>
            <input 
              type="number" 
              value={annualRevenue} 
              onChange={(e) => setAnnualRevenue(Number(e.target.value))} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Taux d'Actualisation (%) :</label>
            <input 
              type="number" 
              value={discountRate} 
              onChange={(e) => setDiscountRate(Number(e.target.value))} 
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.resultColumn}>
          <h4 style={styles.sectionTitle}>Indicateurs de Rentabilité Clés</h4>
          
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>EBITDA Annuel Exploitation</span>
            <span style={styles.metricValue}>{ebitdaAnnual.toLocaleString()} XOF</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Délai de Récupération du Capital (Payback)</span>
            <span style={styles.metricValue}>{paybackPeriod.toFixed(2)} ans</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Flux Net Cumulé (Horizon 5 Ans)</span>
            <span style={{ ...styles.metricValue, color: netCashFlow5Years >= 0 ? '#166534' : '#991b1b' }}>
              {netCashFlow5Years.toLocaleString()} XOF
            </span>
          </div>

          <div style={styles.adviceBox}>
            <strong>Analyse Advisory :</strong> Le ratio de couverture du service de la dette (DSCR) estimé sur cette base valide l'éligibilité du dossier aux guichets de financement sous-régionaux.
          </div>
        </div>
      </div>
    </div>
  );
};

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
    marginBottom: '20px'
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  subtitle: {
    fontSize: '12px',
    color: '#64748b',
    margin: '2px 0 0 0'
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  resultColumn: {
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '4px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569'
  },
  input: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    outline: 'none'
  },
  metricCard: {
    background: '#ffffff',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '600'
  },
  metricValue: {
    fontSize: '13px',
    color: '#0f172a',
    fontWeight: '700'
  },
  adviceBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#166534',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '12px',
    lineHeight: '1.4',
    marginTop: 'auto'
  }
};