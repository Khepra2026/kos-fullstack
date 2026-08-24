import React from 'react';

interface ExporterProps {
  auditData: {
    domain: string;
    regulatoryAlignment: string;
    recommendations: string[];
    ratioCalculations?: any;
    processedAt: string;
  };
}

export const BigFourExporter: React.FC<ExporterProps> = ({ auditData }) => {
  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardHeader}>
        <div>
          <h3 style={styles.title}>Dossier de Synthèse & Piste d'Audit</h3>
          <p style={styles.subtitle}>Conforme aux exigences méthodologiques de supervision (BCEAO / COBAC / OHADA)</p>
        </div>
        <button onClick={handlePrintDossier} style={styles.exportButton}>
          Imprimer le Dossier Officiel
        </button>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>1. Résumé de l'Évaluation</h4>
        <p><strong>Domaine Réglementaire :</strong> {auditData.domain}</p>
        <p><strong>Statut de Conformité :</strong> {auditData.regulatoryAlignment}</p>
        <p><strong>Horodatage de la Piste d'Audit :</strong> {auditData.processedAt}</p>
      </div>

      {auditData.ratioCalculations && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>2. Ratios Prudentiels Calculés</h4>
          <ul style={styles.list}>
            {Object.entries(auditData.ratioCalculations).map(([key, value]: [string, any]) => (
              <li key={key} style={styles.listItem}>
                <strong>{key.replace(/([A-Z])/g, ' ').toUpperCase()} :</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>3. Plan d'Action & Recommandations Validées</h4>
        <ol style={styles.list}>
          {auditData.recommendations.map((rec, index) => (
            <li key={index} style={styles.listItem}>
              {rec}
            </li>
          ))}
        </ol>
      </div>

      <div style={styles.signOff}>
        <p style={styles.signText}>Visa du Cabinet / Superviseur Senior :</p>
        <div style={styles.signBox}>
          <span>KHEPRA EXPERTS — Practice Advisory & Governance</span><br />
          <span style={{ fontSize: '11px', color: '#666' }}>Signé électroniquement via KOS RegTech AI</span>
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
  cardHeader: {
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
  subtitle: {
    fontSize: '12px',
    color: '#64748b',
    margin: '2px 0 0 0'
  },
  exportButton: {
    background: '#166534',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer'
  },
  section: {
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
    borderBottom: '1px solid #f8fafc',
    paddingBottom: '4px'
  },
  list: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '13px',
    color: '#334155'
  },
  listItem: {
    marginBottom: '6px'
  },
  signOff: {
    marginTop: '20px',
    paddingTop: '12px',
    borderTop: '1px dashed #cbd5e1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569',
    margin: 0
  },
  signBox: {
    fontSize: '12px',
    textAlign: 'right' as const,
    color: '#0f172a',
    fontWeight: '600'
  }
};