import React from 'react';

interface WatchItem {
  id: string;
  regulator: 'BCEAO' | 'COBAC' | 'OHADA' | 'BCEAO/UEMOA';
  title: string;
  impactLevel: 'Critique' | 'Moyen' | 'Informatif';
  summary: string;
  effectiveDate: string;
}

export const RegulatoryWatch: React.FC = () => {
  const watchItems: WatchItem[] = [
    {
      id: 'REG-01',
      regulator: 'BCEAO',
      title: 'Nouvelles exigences de fonds propres et coussins de fonds propres Bâle III',
      impactLevel: 'Critique',
      summary: 'Renforcement du ratio de solvabilité global à 11.5% et introduction du coussin de conservation des fonds propres.',
      effectiveDate: 'En vigueur'
    },
    {
      id: 'REG-02',
      regulator: 'COBAC',
      title: 'Directive sur la gouvernance des risques et contrôle interne',
      impactLevel: 'Critique',
      summary: 'Obligation de formalisation des pistes d’audit et renforcement du principe de double regard (Four-Eyes Principle).',
      effectiveDate: 'Applicable immédiatement'
    },
    {
      id: 'REG-03',
      regulator: 'OHADA',
      title: 'Révision du droit des sociétés commerciales et GIE',
      impactLevel: 'Moyen',
      summary: 'Simplification des assemblées générales par voie électronique et sécurisation des conventions réglementées.',
      effectiveDate: 'Continu'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Veille Réglementaire & Conformité Sectorielle</h3>
          <p style={styles.subtitle}>Suivi en temps réel des évolutions prudentielles (UEMOA / CEMAC / OHADA)</p>
        </div>
        <span style={styles.badge}>Live Feed</span>
      </div>

      <div style={styles.grid}>
        {watchItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.regTag}>{item.regulator}</span>
              <span style={item.impactLevel === 'Critique' ? styles.badgeCritique : styles.badgeMoyen}>
                {item.impactLevel}
              </span>
            </div>
            <h4 style={styles.cardTitle}>{item.title}</h4>
            <p style={styles.cardSummary}>{item.summary}</p>
            <div style={styles.cardFooter}>
              <span>📅 {item.effectiveDate}</span>
              <span style={styles.refId}>{item.id}</span>
            </div>
          </div>
        ))}
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
    background: '#dcfce7',
    color: '#166534',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #bbf7d0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  card: {
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  regTag: {
    background: '#e0f2fe',
    color: '#0369a1',
    fontWeight: '700',
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  badgeCritique: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '11px'
  },
  badgeMoyen: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '11px'
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0'
  },
  cardSummary: {
    fontSize: '13px',
    color: '#475569',
    margin: '0 0 12px 0',
    lineHeight: '1.4'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#64748b',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '8px'
  },
  refId: {
    fontWeight: '600',
    color: '#0f172a'
  }
};