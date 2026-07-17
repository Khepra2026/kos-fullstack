import { useCallback, useRef } from 'react';
import type { SectorKpiData } from '@/components/feature/SectorKpiInline';
import type { QuarterlyKpiData } from '@/hooks/useSectorQuarterlyKpis';

interface SectorPdfExportData {
  sectorName: string;
  sectorIcon: string;
  sectorColor: string;
  zone: string;
  score: number;
  scoreLabel: string;
  scoreBreakdown: { label: string; val: number }[];
  kpis: SectorKpiData[];
  quarterlyKpis: QuarterlyKpiData[];
  indices: { name: string; score: number; desc: string }[];
  insights: { title: string; date: string; tag: string }[];
  quarters: { label: string; status: string; desc: string }[];
}

function buildPrintHtml(data: SectorPdfExportData): string {
  const dateStr = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Rapport Big Four Trimestriel — ${data.sectorName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; background: #fff; padding: 40px 50px; font-size: 11px; line-height: 1.5; }
  .cover { text-align: center; padding: 60px 0 40px; border-bottom: 3px solid ${data.sectorColor}; margin-bottom: 30px; }
  .cover h1 { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
  .cover .subtitle { font-size: 14px; color: #555; }
  .cover .date { font-size: 12px; color: #888; margin-top: 10px; }
  .cover .badges { display: flex; justify-content: center; gap: 10px; margin-top: 15px; flex-wrap: wrap; }
  .cover .badge { padding: 4px 14px; border-radius: 20px; font-size: 10px; font-weight: 700; color: #fff; background: ${data.sectorColor}; }
  .section { margin-bottom: 28px; page-break-inside: avoid; }
  .section-title { font-size: 16px; font-weight: 700; color: ${data.sectorColor}; border-bottom: 2px solid ${data.sectorColor}33; padding-bottom: 6px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .big-score { text-align: center; padding: 16px; border: 2px solid ${data.sectorColor}44; border-radius: 12px; margin-bottom: 14px; }
  .big-score .value { font-size: 48px; font-weight: 800; color: ${data.sectorColor}; }
  .big-score .label { font-size: 12px; color: #666; margin-top: 2px; }
  .breakdown { display: flex; flex-wrap: wrap; gap: 8px; }
  .breakdown-item { flex: 1; min-width: 140px; padding: 8px 10px; background: #f8f8f8; border-radius: 8px; }
  .breakdown-item .blabel { font-size: 9px; color: #666; margin-bottom: 4px; }
  .breakdown-bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; margin-bottom: 3px; }
  .breakdown-bar-inner { height: 100%; border-radius: 3px; }
  .breakdown-item .bval { font-size: 11px; font-weight: 700; }
  .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .kpi-card { padding: 10px; border: 1px solid #e5e5e5; border-radius: 8px; }
  .kpi-card .kpi-name { font-size: 9px; color: #666; margin-bottom: 4px; }
  .kpi-card .kpi-value { font-size: 20px; font-weight: 800; }
  .kpi-card .kpi-target { font-size: 9px; color: #999; }
  .q-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .q-card { padding: 10px; border: 1px solid #e5e5e5; border-radius: 8px; }
  .q-card .qname { font-size: 10px; font-weight: 700; margin-bottom: 4px; }
  .q-card .qrow { display: flex; gap: 6px; align-items: center; font-size: 9px; }
  .q-card .qrow span { padding: 2px 6px; background: #f0f0f0; border-radius: 4px; }
  .indice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .indice-card { padding: 12px; border: 1px solid #e5e5e5; border-radius: 8px; }
  .indice-card .iname { font-size: 10px; font-weight: 700; margin-bottom: 4px; }
  .indice-card .iscore { font-size: 24px; font-weight: 800; color: ${data.sectorColor}; }
  .indice-card .idesc { font-size: 9px; color: #666; margin-top: 4px; }
  .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; font-size: 9px; color: #999; }
  .footer strong { color: #555; }
  table { width: 100%; border-collapse: collapse; font-size: 10px; }
  th { background: ${data.sectorColor}15; padding: 6px 8px; text-align: left; font-weight: 700; color: ${data.sectorColor}; border-bottom: 2px solid ${data.sectorColor}33; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; }
  .trend-up { color: #059669; }
  .trend-down { color: #dc2626; }
  @media print { body { padding: 20px 30px; } }
</style>
</head>
<body>

<div class="cover">
  <h1>${data.sectorName}</h1>
  <div class="subtitle">Rapport Big Four Trimestriel — KOS Authority</div>
  <div class="date">Généré le ${dateStr} — Classification : Usage Interne</div>
  <div class="badges">
    <span class="badge">${data.zone}</span>
    <span class="badge">ISA 315/330</span>
    <span class="badge">ISO 27001</span>
    <span class="badge">IFRS</span>
  </div>
</div>

<div class="section">
  <div class="section-title">📊 Score Global Secteur</div>
  <div class="big-score">
    <div class="value">${data.score}</div>
    <div class="label">/100 — ${data.scoreLabel}</div>
  </div>
  <div class="breakdown">
    ${data.scoreBreakdown.map(b => `
    <div class="breakdown-item">
      <div class="blabel">${b.label}</div>
      <div class="breakdown-bar"><div class="breakdown-bar-inner" style="width:${b.val}%;background:${b.val >= 80 ? '#059669' : b.val >= 60 ? '#d97706' : '#dc2626'}"></div></div>
      <div class="bval">${b.val}/100</div>
    </div>`).join('')}
  </div>
</div>

<div class="section">
  <div class="section-title">📈 KPIs Sectoriels</div>
  <div class="kpi-grid">
    ${data.kpis.map(k => `
    <div class="kpi-card">
      <div class="kpi-name">${k.name}</div>
      <div class="kpi-value" style="color:${data.sectorColor}">${k.value}${k.unit}</div>
      <div class="kpi-target">Cible: ${k.target}${k.unit} | ${k.trend === 'up' ? '<span class="trend-up">+' + k.change + '</span>' : k.trend === 'down' ? '<span class="trend-down">' + k.change + '</span>' : k.change}</div>
    </div>`).join('')}
  </div>
</div>

<div class="section">
  <div class="section-title">📅 KPIs Trimestriels T1-T4 2026</div>
  <div class="q-grid">
    ${data.quarterlyKpis.map(q => `
    <div class="q-card">
      <div class="qname">${q.name}</div>
      <div class="qrow">T1:<span>${q.t1}${q.unit}</span> T2:<span>${q.t2}${q.unit}</span> T3:<span>${q.t3}${q.unit}</span> T4:<span>${q.t4}${q.unit}</span></div>
    </div>`).join('')}
  </div>
</div>

<div class="section">
  <div class="section-title">🏷️ Indices KOS™</div>
  <div class="indice-grid">
    ${data.indices.map(idx => `
    <div class="indice-card">
      <div class="iname">${idx.name}</div>
      <div class="iscore">${idx.score}</div>
      <div class="idesc">${idx.desc}</div>
    </div>`).join('')}
  </div>
</div>

<div class="section">
  <div class="section-title">📰 Publications & Insights</div>
  <table>
    <thead><tr><th>Titre</th><th>Date</th><th>Tag</th></tr></thead>
    <tbody>
      ${data.insights.map(p => `<tr><td>${p.title}</td><td>${p.date}</td><td>${p.tag}</td></tr>`).join('')}
    </tbody>
  </table>
</div>

<div class="section">
  <div class="section-title">🗓️ Calendrier Trimestriel 2026</div>
  <table>
    <thead><tr><th>Trimestre</th><th>Statut</th><th>Description</th></tr></thead>
    <tbody>
      ${data.quarters.map(q => `<tr><td><strong>${q.label}</strong></td><td>${q.status === 'completed' ? '✓ Publié' : q.status === 'in_progress' ? 'En cours' : 'Planifié'}</td><td>${q.desc}</td></tr>`).join('')}
    </tbody>
  </table>
</div>

<div class="footer">
  <strong>KOS Authority — Observatoires Sectoriels Afrique Francophone</strong><br>
  Rapport généré automatiquement via KOS Big Four Engine. Classification : Usage Interne. Reproduction interdite sans autorisation.<br>
  Méthodologie : Standards ISA 315/330, IFRS, ISO/IEC 27001:2022.
</div>

</body>
</html>`;
}

export function useSectorPdfExport() {
  const printWindowRef = useRef<Window | null>(null);

  const exportPdf = useCallback((data: SectorPdfExportData) => {
    const html = buildPrintHtml(data);

    if (printWindowRef.current) {
      printWindowRef.current.close();
    }

    const w = window.open('', '_blank', 'width=1000,height=800');
    if (!w) return;

    printWindowRef.current = w;
    w.document.write(html);
    w.document.close();

    w.onload = () => {
      setTimeout(() => {
        w.print();
      }, 500);
    };
  }, []);

  return { exportPdf };
}