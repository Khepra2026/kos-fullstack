import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Types from the main page (mirrored for PDF context)
interface RAGFreshness {
  total_sources: number;
  regulatory_sources: number;
  fresh_sources: number;
  avg_age_months: number;
  coverage_pct: number;
}

interface RAGPenalty {
  authority: string;
  article?: string;
  penalty_min: number;
  penalty_max: number;
  type?: string;
  reference?: string;
}

interface MemoRisk {
  type: string;
  niveau: string;
  mitigation: string;
}

interface MemoRecommendation {
  priorite: string;
  action: string;
  delai: string;
  impact: string;
  cout_fcfa: number;
}

interface MemoFinding {
  texte: string;
  source: string;
  reference: string;
  confiance: string;
  article: string;
}

interface Memo {
  memo_code: string;
  model: string;
  executive_summary: string;
  context: { objectif: string; perimetre: string; date: string; documents_analyses: number };
  findings: MemoFinding[];
  risks: MemoRisk[];
  recommendations: MemoRecommendation[];
  decision_required: boolean;
  qa_score: number;
  confidence: number;
  confidence_level: string;
  qa_flag: string;
  freshness: RAGFreshness;
  penalties: RAGPenalty[];
  agents: string[];
  sources_count: number;
  regulatory_sources_count: number;
  compliance: string;
  decision: string;
}

// Font registration
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVtMpQ.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVtMpQ.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVtMpQ.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#0F172A',
    borderBottomStyle: 'solid',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  logo: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0F172A',
  },
  logoSub: {
    fontSize: 7,
    color: '#64748B',
    marginTop: 2,
  },
  headerRight: {
    textAlign: 'right',
  },
  memoId: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0F172A',
  },
  date: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 2,
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    fontSize: 60,
    color: '#F1F5F9',
    fontWeight: 700,
    opacity: 0.5,
  },
  section: {
    marginBottom: 12,
  },
  h1: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    color: '#0F172A',
  },
  h2: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 6,
    marginTop: 8,
    color: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
  },
  box: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#0F172A',
    borderLeftStyle: 'solid',
  },
  boxRisk: {
    backgroundColor: '#FEF2F2',
    padding: 8,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
    borderLeftStyle: 'solid',
  },
  boxDecision: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
    borderLeftStyle: 'solid',
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 6,
  },
  gridLabel: {
    fontSize: 7,
    color: '#64748B',
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0F172A',
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  textBold: {
    fontWeight: 600,
  },
  riskItem: {
    fontSize: 8,
    lineHeight: 1.6,
    marginBottom: 4,
    color: '#7F1D1D',
  },
  table: {
    marginTop: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
    paddingVertical: 4,
  },
  tableCol1: { width: '25%', fontSize: 8, color: '#334155' },
  tableCol2: { width: '35%', fontSize: 8, color: '#334155' },
  tableCol3: { width: '20%', fontSize: 8, color: '#334155' },
  tableCol4: { width: '20%', fontSize: 8, textAlign: 'right', color: '#334155' },
  tableHeader: {
    fontWeight: 600,
    backgroundColor: '#F1F5F9',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    right: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderTopStyle: 'solid',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: '#64748B',
  },
  pageNumber: {
    fontSize: 7,
    color: '#64748B',
  },
  badge: {
    backgroundColor: '#059669',
    color: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 2,
    fontSize: 7,
    fontWeight: 600,
  },
  badgeRed: {
    backgroundColor: '#DC2626',
  },
  badgeAmber: {
    backgroundColor: '#D97706',
  },
  recRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
    fontSize: 7,
    color: '#64748B',
  },
});

interface memoPDFDocumentProps {
  memo: Memo;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const priorityBorder: Record<string, string> = {
  P1: '#DC2626',
  P2: '#D97706',
  P3: '#2563EB',
  P4: '#94A3B8',
};

export const memoPDFDocument: React.FC<memoPDFDocumentProps> = ({ memo }) => {
  const isNoGo = memo.decision.startsWith('NO-GO');
  const isConditional = memo.decision.startsWith('CONDITIONAL');

  const risquesStr = memo.risks.map((r) => `• ${r.type} (${r.niveau}) : ${r.mitigation}`).join('\n');

  const sourcesForPDF = memo.findings.map((f) => ({
    authority: f.source,
    reference: f.reference,
    title: f.texte.slice(0, 80),
  }));

  const penaltiesForPDF = memo.penalties.map((p) => ({
    authority: p.authority,
    reference: p.reference || 'N/A',
    article: p.article || 'N/A',
    penalty_max: p.penalty_max,
  }));

  const qaFlagLabel = memo.qa_flag === 'OK' ? 'HAUTE CONFIANCE' : 'ALERTE QA';
  const isQaOk = memo.qa_flag === 'OK';
  const isQaNoSource = memo.qa_flag === 'NO_REGULATORY_SOURCE';
  const badgeStyle = [styles.badge, !isQaOk && (isQaNoSource ? styles.badgeRed : styles.badgeAmber)];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>CONFIDENTIAL</Text>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>KHEPRA</Text>
            <Text style={styles.logoSub}>Regulatory Intelligence Engine</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.memoId}>{memo.memo_code}</Text>
            <Text style={styles.date}>{formatDate(memo.context.date)}</Text>
          </View>
        </View>

        {/* Title + Badge */}
        <View style={[styles.section, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={styles.h1}>Note de Conformité Réglementaire</Text>
          <Text style={badgeStyle}>{qaFlagLabel}</Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.h2}>Executive Summary</Text>
          <View style={styles.box}>
            <Text style={styles.text}>{memo.executive_summary}</Text>
          </View>
        </View>

        {/* KPIs Grid */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Périmètre</Text>
            <Text style={styles.gridValue}>{memo.context.perimetre}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Documents Analysés</Text>
            <Text style={styles.gridValue}>{memo.freshness.total_sources}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fraîcheur</Text>
            <Text style={styles.gridValue}>{memo.freshness.fresh_sources}/{memo.freshness.total_sources}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Score QA</Text>
            <Text style={styles.gridValue}>{memo.qa_score}/100</Text>
          </View>
        </View>

        {/* Risques */}
        <View style={styles.section}>
          <Text style={styles.h2}>Risques Identifiés</Text>
          <View style={styles.boxRisk}>
            {risquesStr.length > 0
              ? risquesStr.split('\n').map((risk, i) => (
                  <Text key={i} style={styles.riskItem}>{risk}</Text>
                ))
              : <Text style={styles.riskItem}>Aucun risque critique détecté</Text>
            }
          </View>
        </View>

        {/* Pénalités Table */}
        {penaltiesForPDF.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Tableau des Pénalités Applicables</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCol1}>Autorité</Text>
                <Text style={styles.tableCol2}>Référence</Text>
                <Text style={styles.tableCol3}>Article</Text>
                <Text style={styles.tableCol4}>Exposition Max</Text>
              </View>
              {penaltiesForPDF.map((p, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCol1}>{p.authority}</Text>
                  <Text style={styles.tableCol2}>{p.reference}</Text>
                  <Text style={styles.tableCol3}>{p.article}</Text>
                  <Text style={styles.tableCol4}>{p.penalty_max.toLocaleString('fr-FR')} FCFA</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recommandations */}
        {memo.recommendations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Recommandations</Text>
            {memo.recommendations.map((rec, i) => (
              <View key={i} style={[styles.recRow, { borderLeftColor: priorityBorder[rec.priorite] || '#94A3B8' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.text, styles.textBold]}>
                    {rec.priorite} — {rec.action}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text>Délai : {rec.delai}</Text>
                    <Text>Impact : {rec.impact}</Text>
                    {rec.cout_fcfa > 0 && <Text>{rec.cout_fcfa.toLocaleString('fr-FR')} FCFA</Text>}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Décision */}
        <View style={styles.section}>
          <Text style={styles.h2}>Décision & Recommandation</Text>
          <View style={styles.boxDecision}>
            <Text style={[styles.text, styles.textBold, { color: isNoGo ? '#92400E' : isConditional ? '#B45309' : '#065F46' }]}>
              {memo.decision}
            </Text>
          </View>
        </View>

        {/* Sources */}
        <View style={styles.section}>
          <Text style={styles.h2}>Sources Réglementaires</Text>
          {sourcesForPDF.slice(0, 5).map((s, i) => (
            <Text key={i} style={[styles.text, { fontSize: 7, marginBottom: 2 }]}>
              [{i + 1}] {s.authority} — {s.reference} — {s.title}
            </Text>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            KHEPRA KOS-MEMO v4.3.1 | {memo.compliance} | Confidentiel
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
};





