import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface GovernanceResponse {
  domain: string;
  regulatoryAlignment: string;
  confidenceScore: number;
  recommendations: string[];
  processedAt: string;
}

export const KosGovernanceWidget: React.FC = () => {
  const [domain, setDomain] = useState<string>('BCEAO');
  const [prompt, setPrompt] = useState<string>('Évaluation de la conformité des ratios de liquidité à court terme.');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GovernanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('kos-governance-agent', {
        body: { prompt, contextDomain: domain },
      });

      if (fnError) throw fnError;
      if (!data.success) throw new Error(data.error || 'Erreur lors de l’analyse de gouvernance.');

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>KOS RegTech AI — Agent de Gouvernance</h2>
        <span style={styles.badge}>Enterprise Compliance</span>
      </div>

      <form onSubmit={handleEvaluate} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Cadre Réglementaire / Domaine :</label>
          <select 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)} 
            style={styles.select}
          >
            <option value="BCEAO">BCEAO (UEMOA)</option>
            <option value="COBAC">COBAC (CEMAC)</option>
            <option value="OHADA">Droit OHADA</option>
            <option value="ESG">Standard ESG & RSE</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Périmètre ou Question d'Audit :</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            style={styles.textarea}
            placeholder="Décrivez l'élément à auditer..."
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Analyse experte en cours...' : 'Lancer l’Évaluation de Gouvernance'}
        </button>
      </form>

      {error && <div style={styles.errorBox}>⚠️ {error}</div>}

      {result && (
        <div style={styles.resultBox}>
          <div style={styles.resultHeader}>
            <span style={styles.domainTag}>{result.domain}</span>
            <span style={styles.scoreTag}>
              Confiance : {(result.confidenceScore * 100).toFixed(1)}%
            </span>
          </div>

          <p style={styles.alignmentText}>
            <strong>Statut :</strong> {result.regulatoryAlignment}
          </p>

          <h4 style={styles.recTitle}>Recommandations Prudentielles :</h4>
          <ul style={styles.recList}>
            {result.recommendations.map((rec, index) => (
              <li key={index} style={styles.recItem}>• {rec}</li>
            ))}
          </ul>

          <div style={styles.timestamp}>
            Analysé le : {new Date(result.processedAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    maxWidth: '650px',
    margin: '20px auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: '1px solid #eaeaea',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #f4f6f8',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  badge: {
    background: '#f0fdf4',
    color: '#166534',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #bbf7d0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4b5563',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical' as const,
  },
  button: {
    background: '#0f172a',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  errorBox: {
    marginTop: '16px',
    padding: '12px',
    background: '#fef2f2',
    color: '#991b1b',
    borderRadius: '8px',
    fontSize: '13px',
    border: '1px solid #fecaca',
  },
  resultBox: {
    marginTop: '20px',
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e2e8f0',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  domainTag: {
    background: '#e0f2fe',
    color: '#0369a1',
    fontWeight: '700',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  scoreTag: {
    background: '#dcfce7',
    color: '#15803d',
    fontWeight: '700',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  alignmentText: {
    fontSize: '14px',
    color: '#334155',
    marginBottom: '12px',
  },
  recTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '6px',
  },
  recList: {
    margin: 0,
    paddingLeft: '16px',
    fontSize: '13px',
    color: '#475569',
  },
  recItem: {
    marginBottom: '4px',
  },
  timestamp: {
    marginTop: '12px',
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'right' as const,
  },
};