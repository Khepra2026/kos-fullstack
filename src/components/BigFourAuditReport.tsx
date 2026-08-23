import React, { useState } from 'react';

interface AuditReportProps {
  entityName: string;
  auditDomain: 'BCEAO' | 'COBAC' | 'OHADA' | 'ESG';
  ratios: {
    solvabiliteRatio?: string;
    liquiditeRatio?: string;
    divisionRisqueRatio?: string;
  };
  recommendations: string[];
}

export const BigFourAuditReport: React.FC<AuditReportProps> = ({
  entityName = "Établissement Financier Audité",
  auditDomain = "BCEAO",
  ratios,
  recommendations
}) => {
  const [partnerSigned, setPartnerSigned] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  const handleExportPDF = () => {
    setExporting(true);
    setTimeout(() => {
      window.print();
      setExporting(false);
    }, 500);
  };

  return (
    <div style={styles.container}>
      {/* En-tête de Cabinet */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.cabinetName}>KHEPRA EXPERTS — ADVISORY</h1>
          <p style={styles.subHeader}>KOS RegTech AI | Working Paper & Note d'Audit Conforme</p>
        </div>
        <div style={styles.metaBox}>
          <span><strong>Cadre :</strong> {auditDomain}</span><br />
          <span><strong>Date :</strong> {new Date().toLocaleDateString()}</span><br />
          <span><strong>Statut :</strong> Confidentiel / Révison Senior</span>
        </div>
      </div>

      {/* Informations sur l'entité */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>1. Périmètre de la Mission & Identification</h3>
        <p><strong>Entité évaluée :</strong> {entityName}</p>
        <p><strong>Standard méthodologique :</strong> Référentiel Big Four / COSO / Bâle III / SYSCOHADA</p>
      </div>

      {/* Analyse des Ratios Prudentiels */}
      {ratios && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>2. Synthèse des Ratios Prudentiels & Indicateurs Clés</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Indicateur / Ratio</th>
                <th style={styles.th}>Valeur Calculée</th>
                <th style={styles.th}>Appréciation du Risque</th>
              </tr>
            </thead>
            <tbody>
              {ratios.solvabiliteRatio && (
                <tr>
                  <td style={styles.td}>Solvabilité (Fonds Propres Nets / Risques)</td>
                  <td style={styles.td}>{ratios.solvabiliteRatio}</td>
                  <td style={styles.td}><span style={styles.badgeWarning}>À surveiller</span></td>
                </tr>
              )}
              {ratios.liquiditeRatio && (
                <tr>
                  <td style={styles.td}>Liquidité à court terme</td>
                  <td style={styles.td}>{ratios.liquiditeRatio}</td>
                  <td style={styles.td}><span style={styles.badgeSuccess}>Conforme</span></td>
                </tr>
              )}
              {ratios.divisionRisqueRatio && (
                <tr>
                  <td style={styles.td}>Division des Risques (Risques / FPN)</td>
                  <td style={styles.td}>{ratios.divisionRisqueRatio}</td>
                  <td style={styles.td}><span style={styles.badgeSuccess}>Maîtrisé</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Recommandations et Plan d'Action */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>3. Constats, Risques et Plan d'Action (Recommandations)</h3>
        <ul style={styles.list}>
          {recommendations.map((rec, index) => (
            <li key={index} style={styles.listItem}>
              <strong>Recommandation #{index + 1} :</strong> {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Workflow de Validation Quatre Yeux (Four-Eyes Principle) */}
      <div style={styles.footerValidation}>
        <div>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={partnerSigned} 
              onChange={(e) => setPartnerSigned(e.target.checked)} 
              style={{ width: '18px', height: '18px' }}
            />
            <strong>Validation Associé / Superviseur (Principe des Quatre Yeux)</strong>
          </label>
          <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0 26px' }}>
            {partnerSigned ? "Signé électroniquement et validé pour transmission officielle." : "En attente de contre-signature senior."}
          </p>
        </div>

        <button 
          onClick={handleExportPDF}
          style={{
            ...styles.button,
            backgroundColor: partnerSigned ? '#166534' : '#94a3b8',
            cursor: partnerSigned ? 'pointer' : 'not-allowed'
          }}
          disabled={!partnerSigned || exporting}
        >
          {exporting ? 'Génération du Working Paper...' : 'Exporter le Rapport Officiel (PDF)'}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    maxWidth: '800px',
    margin: '30px auto',
    fontFamily: 'Helvetica, Arial, sans-serif',
    border: '1px solid #e2e8f0',
    color: '#1e293b'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '3px solid #d4af37',
    paddingBottom: '15px',
    marginBottom: '20px'
  },
  cabinetName: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  subHeader: {
    fontSize: '12px',
    color: '#64748b',
    margin: '4px 0 0 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  metaBox: {
    fontSize: '11px',
    textAlign: 'right' as const,
    background: '#f8fafc',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '6px',
    marginBottom: '10px'
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
    padding: '8px 10px',
    fontWeight: '600'
  },
  td: {
    border: '1px solid #e2e8f0',
    padding: '8px 10px'
  },
  badgeWarning: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600'
  },
  badgeSuccess: {
    background: '#dcfce7',
    color: '#166534',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600'
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#334155'
  },
  listItem: {
    marginBottom: '6px'
  },
  footerValidation: {
    marginTop: '30px',
    paddingTop: '15px',
    borderTop: '2px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    transition: 'background 0.2s'
  }
};