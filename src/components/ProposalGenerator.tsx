import React, { useState } from 'react';

export const ProposalGenerator: React.FC = () => {
  const [clientName, setClientName] = useState<string>('Banque Régionale de l’UEMOA');
  const [missionType, setMissionType] = useState<string>('Transformation Institutionnelle & Conformité Bâle III');
  const [durationWeeks, setDurationWeeks] = useState<number>(12);
  const [budgetXof, setBudgetXof] = useState<number>(35000000);

  const handlePrintProposal = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Générateur de Propositions & Lettres de Mission (Standards Big Four)</h3>
          <p style={styles.subtitle}>Édition de dossiers d'offre institutionnels et techniques</p>
        </div>
        <button onClick={handlePrintProposal} style={styles.button}>
          Imprimer / Exporter l'Offre
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.formSection}>
          <h4 style={styles.sectionTitle}>Paramètres de la Proposition</h4>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Client / Institution :</label>
            <input 
              type="text" 
              value={clientName} 
              onChange={(e) => setClientName(e.target.value)} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Intitulé de la Mission :</label>
            <input 
              type="text" 
              value={missionType} 
              onChange={(e) => setMissionType(e.target.value)} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Durée (en semaines) :</label>
            <input 
              type="number" 
              value={durationWeeks} 
              onChange={(e) => setDurationWeeks(Number(e.target.value))} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Montant Proposé (en XOF) :</label>
            <input 
              type="number" 
              value={budgetXof} 
              onChange={(e) => setBudgetXof(Number(e.target.value))} 
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.previewSection}>
          <h4 style={styles.sectionTitle}>Aperçu de la Lettre de Mission</h4>
          
          <div style={styles.documentPreview}>
            <p style={{ fontSize: '11px', textAlign: 'right', color: '#64748b' }}>
              Lomé, le {new Date().toLocaleDateString()}
            </p>
            
            <p><strong>À l'attention de la Direction Générale de :</strong><br />{clientName}</p>
            
            <p><strong>Objet :</strong> Proposition technique et financière — <em>{missionType}</em></p>
            
            <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
              Le Cabinet <strong>KHEPRA EXPERTS SARL U</strong> (siège à Lomé, Logogomè) a l'honneur de soumettre à votre haute appréciation sa proposition pour la réalisation de la mission susmentionnée.
            </p>

            <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
              Conformément à nos méthodologies inspirées des standards internationaux et de notre expertise avérée en Afrique de l'Ouest et Centrale, cette mission d'une durée de <strong>{durationWeeks} semaines</strong> sera exécutée sous le sceau de l'excellence et de la rigueur prudentielle pour un montant forfaitaire de <strong>{budgetXof.toLocaleString()} XOF</strong>.
            </p>

            <div style={{ marginTop: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold' }}>KHEPRA EXPERTS — Direction Associée</p>
            </div>
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
  button: {
    background: '#166534',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  previewSection: {
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
  documentPreview: {
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '12px',
    color: '#334155',
    lineHeight: '1.4'
  }
};