import { useState, useEffect, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import hubLayout from '@/components/feature/hubLayout';
import { useControlTowerData } from '@/hooks/useControlTowerData';
import { executiveCockpitScores, cockpitThresholds, cockpitOverallMetrics, type ExecutiveCockpitScore } from '@/mocks/controlTowerAutomation';

type Tab = 'tower' | 'automation' | 'resources' | 'capacity' | 'forecasting' | 'scenarios' | 'cockpit';

export default function controlTowerAutomationPage() {
  const { tower, automation, resources, capacity, forecasts, scenarios, loading, source } = useControlTowerData();
  const [activeTab, setActiveTab] = useState<Tab>('tower');
  const [selectedTower, setSelectedTower] = useState(tower[0]);
  const [selectedAutomation, setSelectedAutomation] = useState(automation[0]);
  const [selectedResource, setSelectedResource] = useState(resources[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacity[0]);
  const [selectedForecast, setSelectedForecast] = useState(forecasts[0]);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [selectedCockpitScore, setSelectedCockpitScore] = useState<ExecutiveCockpitScore>(executiveCockpitScores[0]);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'done'>('idle');
  const cardRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const getTowerStatus = (status: string) => {
    if (status === 'OK') return { chip: 'bg-green-100 text-green-700', dot: 'bg-green-500', label: 'OK' };
    if (status === 'WARNING') return { chip: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: 'WARNING' };
    return { chip: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'CRITICAL' };
  };

  const getAutoStatusChip = (status: string) => {
    if (status.includes('Déployé')) return 'bg-green-100 text-green-700';
    if (status.includes('cours') || status.includes('conception')) return 'bg-amber-100 text-amber-700';
    if (status.includes('Prioritaire')) return 'bg-red-100 text-red-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getResourceStatusChip = (status: string) => {
    if (status.includes('Surcharge')) return 'bg-red-100 text-red-700';
    if (status.includes('Haute charge')) return 'bg-amber-100 text-amber-700';
    if (status.includes('disponible') || status.includes('disponibilité')) return 'bg-green-100 text-green-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getCapacityChip = (overload: number) => {
    if (overload >= 15) return 'bg-red-100 text-red-700';
    if (overload >= 5) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  const getScenarioStatusChip = (status: string) => {
    if (status.includes('Actif') || status.includes('Préparé')) return 'bg-green-100 text-green-700';
    if (status.includes('analyse') || status.includes('veille')) return 'bg-amber-100 text-amber-700';
    return 'bg-background-100 text-foreground-600';
  };

  // Staggered entrance animation — observe cards when cockpit tab is active
  useEffect(() => {
    if (activeTab !== 'cockpit') return;
    setVisibleCards(new Set());
    const timers: ReturnType<typeof setTimeout>[] = [];
    executiveCockpitScores.forEach((score, idx) => {
      const t = setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, score.id]));
      }, 80 + idx * 80);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Axe', 'Score', 'Cible', 'Tendance', 'Variation (%)', 'Seuil', 'Owner', 'Gap', 'Plan Action'];
    const rows = executiveCockpitScores.map(s => {
      const th = getCockpitThresholdLabel(s.current_score);
      return [
        s.name,
        s.current_score,
        s.target_score,
        s.trend === 'up' ? 'Hausse' : s.trend === 'down' ? 'Baisse' : 'Stable',
        s.trend_pct,
        th,
        s.owner,
        `"${s.gap_analysis.replace(/"/g, '\'\'')}"`,
        `"${s.action_plan.replace(/"/g, '\'\'')}"`,
      ];
    });
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KOS_Maturity_9Scores_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF
  const exportPDF = async () => {
    setExportStatus('exporting');
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      let y = 18;

      // Header
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, W, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('KOS Executive Cockpit — 9 Scores Maturité', W / 2, 14, { align: 'center' });
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`COMEX KHEPRA EXPERTS — ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`, W / 2, 22, { align: 'center' });
      y = 38;

      // Overall score
      doc.setTextColor(15, 15, 15);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`Score Global de Maturité : ${cockpitOverallMetrics.overall_maturity}/100`, 15, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Vélocité : +${cockpitOverallMetrics.avg_improvement_velocity} pts/mois  |  Projection Excellence : ${new Date(cockpitOverallMetrics.projected_excellence_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`, 15, y + 6);
      y += 16;

      // Thresholds legend
      const thArr = Object.values(cockpitThresholds);
      thArr.forEach((th, i) => {
        const [r, g, b] = th.color.startsWith('#') ? [parseInt(th.color.slice(1,3),16), parseInt(th.color.slice(3,5),16), parseInt(th.color.slice(5,7),16)] : [0,0,0];
        doc.setFillColor(r, g, b);
        doc.circle(15 + i * 48, y + 1.5, 2, 'F');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(7);
        doc.text(`${th.label} ≥${th.min}`, 19 + i * 48, y + 2);
      });
      y += 10;

      // Scores table
      const colWidths = [42, 16, 16, 22, 20, 22, 22];
      const cols = ['Axe / Score', 'Score', 'Cible', 'Seuil', 'Tendance', 'Composant 1', 'Composant 2'];
      doc.setFillColor(15, 15, 15);
      doc.rect(10, y, W - 20, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      let cx = 12;
      cols.forEach((c, i) => { doc.text(c, cx, y + 4.5); cx += colWidths[i]; });
      y += 7;

      executiveCockpitScores.forEach((s, idx) => {
        if (y > pageH - 30) { doc.addPage(); y = 18; }
        const th = getCockpitThresholdLabel(s.current_score);
        const thColor = getCockpitThreshold(s.current_score);
        doc.setFillColor(idx % 2 === 0 ? 252 : 245, idx % 2 === 0 ? 252 : 245, idx % 2 === 0 ? 252 : 245);
        doc.rect(10, y, W - 20, 8, 'F');
        doc.setTextColor(20, 20, 20);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        cx = 12;
        doc.text(s.name, cx, y + 5.5);
        cx += colWidths[0];
        const [sr, sg, sb] = thColor.color.startsWith('#') ? [parseInt(thColor.color.slice(1,3),16), parseInt(thColor.color.slice(3,5),16), parseInt(thColor.color.slice(5,7),16)] : [0,0,0];
        doc.setTextColor(sr, sg, sb);
        doc.text(String(s.current_score), cx, y + 5.5); cx += colWidths[1];
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(String(s.target_score), cx, y + 5.5); cx += colWidths[2];
        doc.text(th, cx, y + 5.5); cx += colWidths[3];
        const trendLabel = s.trend === 'up' ? `+${s.trend_pct}%` : s.trend === 'down' ? `-${s.trend_pct}%` : 'Stable';
        doc.text(trendLabel, cx, y + 5.5); cx += colWidths[4];
        doc.text(s.components[0]?.label.slice(0, 18) + ` (${s.components[0]?.score})`, cx, y + 5.5); cx += colWidths[5];
        doc.text(s.components[1]?.label.slice(0, 18) + ` (${s.components[1]?.score})`, cx, y + 5.5);
        y += 8;
      });

      y += 8;

      // Gap & Action plans
      if (y > pageH - 50) { doc.addPage(); y = 18; }
      doc.setFillColor(15, 15, 15);
      doc.rect(10, y, W - 20, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('Gap Analysis & Plans d\'Action', 14, y + 4.5);
      y += 9;

      executiveCockpitScores.forEach(s => {
        if (y > pageH - 28) { doc.addPage(); y = 18; }
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.text(`${s.name} (${s.current_score}/100)`, 12, y);
        y += 4;
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        const gap = doc.splitTextToSize(`GAP: ${s.gap_analysis}`, W - 30);
        gap.forEach((line: string) => { if (y > pageH - 14) { doc.addPage(); y = 18; } doc.text(line, 14, y); y += 3.5; });
        const plan = doc.splitTextToSize(`ACTION: ${s.action_plan}`, W - 30);
        plan.forEach((line: string) => { if (y > pageH - 14) { doc.addPage(); y = 18; } doc.text(line, 14, y); y += 3.5; });
        y += 3;
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFillColor(240, 240, 240);
        doc.rect(0, pageH - 10, W, 10, 'F');
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(6);
        doc.text('CONFIDENTIEL — COMEX KHEPRA EXPERTS — KOS Executive Cockpit™', 15, pageH - 3.5);
        doc.text(`Page ${i}/${totalPages}`, W - 15, pageH - 3.5, { align: 'right' });
      }

      doc.save(`KOS_Cockpit_COMEX_${new Date().toISOString().slice(0, 10)}.pdf`);
      setExportStatus('done');
      setTimeout(() => setExportStatus('idle'), 2000);
    } catch (e) {
      setExportStatus('idle');
    }
  };

  const getCockpitThresholdLabel = (score: number): string => {
    if (score >= 95) return 'Excellence';
    if (score >= 90) return 'Très Performant';
    if (score >= 80) return 'Acceptable';
    return 'Action Immédiate';
  };

  const getCockpitThreshold = (score: number) => {
    if (score >= 95) return cockpitThresholds.excellence;
    if (score >= 90) return cockpitThresholds.very_good;
    if (score >= 80) return cockpitThresholds.acceptable;
    return cockpitThresholds.critical;
  };

  const renderGaugeCircle = (score: number, maxScore: number, label: string, size: number = 48, colorOverride?: string) => {
    const pct = Math.min((score / maxScore) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = colorOverride || (score >= 9 ? '#22c55e' : score >= 8 ? '#06b6d4' : score >= 7 ? '#f59e0b' : '#ef4444');
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
              strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}</span>
          </div>
        </div>
        <span className="text-[10px] text-foreground-500 text-center leading-tight">{label}</span>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 100, color?: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color || 'bg-accent-500'}`} style={{ width: `${Math.min((score / max) * 100, 100)}%` }}></div>
      </div>
      <span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}%</span>
    </div>
  );

  const formatFCFA = (val: number) => {
    const abs = Math.abs(val);
    const sign = val < 0 ? '-' : '';
    if (abs >= 1000000000) return `${sign}${(abs / 1000000000).toFixed(1)} Md`;
    if (abs >= 1000000) return `${sign}${(abs / 1000000).toFixed(0)} M`;
    return `${sign}${abs.toLocaleString('fr-FR')}`;
  };

  const okCount = tower.filter(m => m.status === 'OK').length;
  const warnCount = tower.filter(m => m.status === 'WARNING').length;
  const criticalCount = tower.filter(m => m.status === 'CRITICAL').length;
  const totalAlerts = tower.reduce((s, m) => s + m.alerts_count, 0);
  const avgEfficiency = Math.round(automation.reduce((s, w) => s + w.current_efficiency, 0) / automation.length);
  const totalImprovement = Math.round(automation.reduce((s, w) => s + w.improvement_potential_pct, 0));
  const overloadedTeams = capacity.filter(t => t.projected_overload_pct >= 10).length;
  const avgConfidence = Math.round(forecasts.reduce((s, f) => s + f.confidence_level, 0) / forecasts.length);
  const activeScenarios = scenarios.filter(s => s.status.includes('Actif')).length;

  const tabs: { id: Tab; label: string; icon: string; count: number; accent: string }[] = [
    { id: 'tower', label: 'Control Tower', icon: 'ri-radar-line', count: warnCount + criticalCount, accent: 'border-rose-300 bg-rose-50/50' },
    { id: 'automation', label: 'Optimisation Automatisation', icon: 'ri-settings-5-line', count: automation.filter(w => w.status.includes('cours') || w.status.includes('Prioritaire')).length, accent: 'border-amber-300 bg-amber-50/50' },
    { id: 'resources', label: 'Allocation Ressources', icon: 'ri-user-settings-line', count: resources.filter(r => r.status.includes('Surcharge')).length, accent: 'border-orange-300 bg-orange-50/50' },
    { id: 'capacity', label: 'Planification Capacité', icon: 'ri-bar-chart-grouped-line', count: overloadedTeams, accent: 'border-cyan-300 bg-cyan-50/50' },
    { id: 'forecasting', label: 'Moteur de Prévisions', icon: 'ri-line-chart-line', count: forecasts.filter(f => f.confidence_level >= 85).length, accent: 'border-emerald-300 bg-emerald-50/50' },
    { id: 'scenarios', label: 'Simulateur Scénarios', icon: 'ri-brain-line', count: activeScenarios, accent: 'border-primary-300 bg-primary-50/50' },
    { id: 'cockpit', label: 'Executive Cockpit', icon: 'ri-dashboard-3-line', count: cockpitOverallMetrics.scores_critical, accent: 'border-foreground-300 bg-foreground-50/50' },
  ];

  return (
    <hubLayout hubId={7}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-4">
                <i className="ri-radar-line"></i>KOS Phase 4 — Enterprise Control Tower & Automation Factory
                {source === 'supabase' && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">LIVE DB</span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Enterprise Control Tower & Automation Factory</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Centre de commandement ultime — Surveillance temps réel 12 KPI critiques, Optimisation automatisée des workflows,
                Allocation intelligente des ressources, Planification prédictive des capacités, Prévisions financières et Simulations de scénarios stratégiques.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${criticalCount > 0 ? 'bg-red-500' : warnCount > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                  <span className="text-xl font-bold text-foreground-950">{okCount}/{tower.length}</span>
                </div>
                <div className="text-xs text-foreground-500">Métriques OK</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-accent-500">{avgEfficiency}%</div>
                <div className="text-xs text-foreground-500">Efficience Moy.</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-primary-500">{avgConfidence}%</div>
                <div className="text-xs text-foreground-500">Confiance Prévisions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count > 0 && <span className="text-xs opacity-60">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : ENTERPRISE CONTROL TOWER ===== */}
        {activeTab === 'tower' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                  <i className="ri-radar-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Control Tower™</h3>
                  <p className="text-xs text-foreground-500">{tower.length} métriques — {warnCount} alertes</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{okCount}</div>
                  <div className="text-[10px] text-foreground-500">OK</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{warnCount}</div>
                  <div className="text-[10px] text-foreground-500">Warning</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{criticalCount}</div>
                  <div className="text-[10px] text-foreground-500">Critical</div>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Total Alertes Actives</div>
                <div className="text-lg font-bold text-rose-700">{totalAlerts}</div>
              </div>
              {tower.map((m) => {
                const st = getTowerStatus(m.status);
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedTower(m)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedTower.id === m.id ? 'border-rose-300 bg-rose-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{m.domain}</span>
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${st.chip}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>{st.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950">{m.metric_name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-foreground-950">{typeof m.current_value === 'number' && m.current_value % 1 !== 0 ? m.current_value.toFixed(1) : m.current_value}{m.domain === 'Finances' && m.metric_name.includes('CA') ? ' FCFA' : m.metric_name.includes('%') || m.domain === 'Croissance' || m.domain === 'Opérations' && m.metric_name.includes('Taux') ? '%' : ''}</span>
                      <span className="text-xs text-foreground-400">{m.alerts_count > 0 ? `${m.alerts_count} alertes` : '0 alerte'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedTower.domain}</span>
                  {(() => { const st = getTowerStatus(selectedTower.status); return <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${st.chip}`}><span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>{st.label}</span>; })()}
                  <span className="text-xs text-foreground-400 ml-auto">
                    Dernière mise à jour : {new Date(selectedTower.last_updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedTower.metric_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-3xl font-bold text-foreground-950">{typeof selectedTower.current_value === 'number' && selectedTower.current_value % 1 !== 0 ? selectedTower.current_value.toFixed(1) : selectedTower.current_value}</div>
                    <div className="text-xs text-foreground-500">Valeur Actuelle</div>
                  </div>
                  <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 text-center">
                    <div className="text-lg font-bold text-amber-700">{typeof selectedTower.threshold_warning === 'number' && selectedTower.threshold_warning % 1 !== 0 ? selectedTower.threshold_warning.toFixed(1) : selectedTower.threshold_warning}</div>
                    <div className="text-xs text-foreground-500">Seuil Warning</div>
                  </div>
                  <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 text-center">
                    <div className="text-lg font-bold text-red-700">{typeof selectedTower.threshold_critical === 'number' && selectedTower.threshold_critical % 1 !== 0 ? selectedTower.threshold_critical.toFixed(1) : selectedTower.threshold_critical}</div>
                    <div className="text-xs text-foreground-500">Seuil Critique</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Position par rapport aux seuils</span>
                  </div>
                  <div className="relative h-3 bg-background-200/70 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-green-500/30 rounded-l-full" style={{ width: `${(selectedTower.threshold_warning / (selectedTower.threshold_critical > selectedTower.current_value ? selectedTower.threshold_warning * 1.3 : selectedTower.current_value * 1.1)) * 100}%` }}></div>
                    <div className="absolute top-0 h-full bg-amber-500/30" style={{ left: `${(selectedTower.threshold_warning / (selectedTower.threshold_critical > selectedTower.current_value ? selectedTower.threshold_warning * 1.3 : selectedTower.current_value * 1.1)) * 100}%`, width: `${((selectedTower.threshold_critical - selectedTower.threshold_warning) / (selectedTower.threshold_critical > selectedTower.current_value ? selectedTower.threshold_warning * 1.3 : selectedTower.current_value * 1.1)) * 100}%` }}></div>
                    <div className="absolute top-0 h-full bg-red-500/30 rounded-r-full" style={{ left: `${(selectedTower.threshold_critical / (selectedTower.threshold_critical > selectedTower.current_value ? selectedTower.threshold_warning * 1.3 : selectedTower.current_value * 1.1)) * 100}%`, width: `${100 - (selectedTower.threshold_critical / (selectedTower.threshold_critical > selectedTower.current_value ? selectedTower.threshold_warning * 1.3 : selectedTower.current_value * 1.1)) * 100}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Alertes actives</h4>
                    <div className="text-lg font-bold text-foreground-950">{selectedTower.alerts_count}</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Dernier scan</h4>
                    <div className="text-sm text-foreground-600">{new Date(selectedTower.last_updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : AUTOMATION OPTIMIZER ===== */}
        {activeTab === 'automation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-settings-5-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Automation Optimizer™</h3>
                  <p className="text-xs text-foreground-500">{automation.length} workflows — Gain potentiel {totalImprovement}%</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Efficience moyenne</div>
                <div className="text-lg font-bold text-amber-700">{avgEfficiency}%</div>
                <div className="text-xs text-foreground-400 mt-1">
                  {automation.filter(w => w.status.includes('Déployé')).length} workflows déployés
                </div>
              </div>
              {automation.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedAutomation(w)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAutomation.id === w.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{w.optimization_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAutoStatusChip(w.status)}`}>{w.status.split('—')[0].trim()}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{w.workflow_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Efficience {w.current_efficiency.toFixed(0)}%</span>
                    <span className="text-xs font-bold text-green-600">+{w.improvement_potential_pct.toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAutomation.optimization_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAutoStatusChip(selectedAutomation.status)}`}>{selectedAutomation.status}</span>
                  {selectedAutomation.implemented_at && (
                    <span className="text-xs text-foreground-400 ml-auto">
                      Déployé le {new Date(selectedAutomation.implemented_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedAutomation.workflow_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedAutomation.current_efficiency, 100, '', 56, selectedAutomation.current_efficiency >= 80 ? '#22c55e' : selectedAutomation.current_efficiency >= 65 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Efficience</div>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                    <div className="text-2xl font-bold text-green-700">+{selectedAutomation.improvement_potential_pct.toFixed(0)}%</div>
                    <div className="text-xs text-foreground-500">Potentiel Amélioration</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedAutomation.current_efficiency >= 80 ? 'Optimal' : selectedAutomation.current_efficiency >= 65 ? 'OK' : 'Critique'}</div>
                    <div className="text-xs text-foreground-500">Statut</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Niveau d'efficience actuel</span>
                  </div>
                  {renderScoreBar(selectedAutomation.current_efficiency, 100, 'bg-amber-500')}
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Changements Proposés</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAutomation.proposed_changes}</p>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Impact Attendu</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAutomation.expected_impact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : RESOURCE ALLOCATOR ===== */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <i className="ri-user-settings-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Resource Allocator™</h3>
                  <p className="text-xs text-foreground-500">{resources.length} ressources suivies</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50/50 mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-foreground-500">Taux Occupation</div>
                    <div className="text-lg font-bold text-orange-700">{(resources.reduce((s, r) => s + r.current_allocation_pct, 0) / resources.length).toFixed(0)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-foreground-500">En Surcharge</div>
                    <div className="text-lg font-bold text-red-600">{resources.filter(r => r.status.includes('Surcharge')).length}</div>
                  </div>
                </div>
              </div>
              {resources.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedResource(r)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedResource.id === r.id ? 'border-orange-300 bg-orange-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{r.resource_type}</span>
                    <span className="text-sm font-bold text-foreground-950">{r.current_allocation_pct.toFixed(0)}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{r.resource_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getResourceStatusChip(r.status)}`}>{r.status.split('—')[0].trim()}</span>
                    <span className="text-xs text-foreground-400">{r.available_capacity_pct.toFixed(0)}% dispo</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedResource.resource_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getResourceStatusChip(selectedResource.status)}`}>{selectedResource.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedResource.resource_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">{selectedResource.project_name}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedResource.current_allocation_pct, 100, '', 56, selectedResource.current_allocation_pct >= 90 ? '#ef4444' : selectedResource.current_allocation_pct >= 80 ? '#f59e0b' : '#22c55e')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Taux d'Allocation</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedResource.available_capacity_pct.toFixed(0)}%</div>
                    <div className="text-xs text-foreground-500">Disponible</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Allocation</span>
                    <span className="text-xs text-foreground-400">{selectedResource.available_capacity_pct.toFixed(0)}% disponible</span>
                  </div>
                  {renderScoreBar(selectedResource.current_allocation_pct, 100, selectedResource.current_allocation_pct >= 90 ? 'bg-red-500' : selectedResource.current_allocation_pct >= 80 ? 'bg-amber-500' : 'bg-green-500')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Période d'Allocation</h4>
                    <p className="text-xs text-foreground-600">
                      {new Date(selectedResource.allocation_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} → {new Date(selectedResource.allocation_end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Projet Principal</h4>
                    <p className="text-xs text-foreground-600 line-clamp-2">{selectedResource.project_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : CAPACITY PLANNER ===== */}
        {activeTab === 'capacity' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-bar-chart-grouped-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Capacity Planner™</h3>
                  <p className="text-xs text-foreground-500">{capacity.length} équipes — {overloadedTeams} en surcharge</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-cyan-200 bg-cyan-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Heures totales allouées</div>
                <div className="text-lg font-bold text-cyan-700">{capacity.reduce((s, t) => s + t.current_workload_hours, 0).toFixed(0)}h</div>
                <div className="text-xs text-foreground-400 mt-1">
                  sur {capacity.reduce((s, t) => s + t.max_capacity_hours, 0).toFixed(0)}h max
                </div>
              </div>
              {capacity.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedCapacity(t)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCapacity.id === t.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500 whitespace-nowrap">{t.forecast_period}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCapacityChip(t.projected_overload_pct)}`}>
                      {t.projected_overload_pct > 0 ? `+${t.projected_overload_pct.toFixed(0)}%` : 'OK'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{t.team_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{t.current_workload_hours.toFixed(0)}h / {t.max_capacity_hours.toFixed(0)}h</span>
                    <span className="text-xs text-foreground-400">{t.projected_overload_pct > 0 ? '⚠️ Surcharge' : '✅ OK'}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCapacity.forecast_period}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCapacityChip(selectedCapacity.projected_overload_pct)}`}>
                    {selectedCapacity.projected_overload_pct > 0 ? `Surcharge +${selectedCapacity.projected_overload_pct.toFixed(0)}%` : 'Capacité OK'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedCapacity.team_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedCapacity.current_workload_hours.toFixed(0)}h</div>
                    <div className="text-xs text-foreground-500">Charge Actuelle</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedCapacity.max_capacity_hours.toFixed(0)}h</div>
                    <div className="text-xs text-foreground-500">Capacité Max</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">
                      {(100 - (selectedCapacity.current_workload_hours / selectedCapacity.max_capacity_hours) * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-foreground-500">Disponible</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Taux d'occupation</span>
                    <span className="text-xs text-foreground-400">{((selectedCapacity.current_workload_hours / selectedCapacity.max_capacity_hours) * 100).toFixed(0)}%</span>
                  </div>
                  {renderScoreBar((selectedCapacity.current_workload_hours / selectedCapacity.max_capacity_hours) * 100, 100, selectedCapacity.projected_overload_pct >= 15 ? 'bg-red-500' : selectedCapacity.projected_overload_pct >= 5 ? 'bg-amber-500' : 'bg-green-500')}
                </div>
                <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations du Capacity Planner</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedCapacity.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : FORECASTING ENGINE ===== */}
        {activeTab === 'forecasting' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-line-chart-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Forecasting Engine™</h3>
                  <p className="text-xs text-foreground-500">{forecasts.length} prévisions — Confiance {avgConfidence}%</p>
                </div>
              </div>
              {forecasts.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedForecast(f)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedForecast.id === f.id ? 'border-emerald-300 bg-emerald-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{f.forecast_type}</span>
                    <span className="text-xs font-bold text-emerald-600">{f.confidence_level.toFixed(0)}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{f.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{f.horizon}</span>
                    <span className="text-xs text-foreground-400">
                      {f.forecast_type === 'Revenue' || f.forecast_type === 'Pipeline' || f.forecast_type === 'Marché' ? formatFCFA(f.baseline_value) + ' FCFA'
                        : f.forecast_type === 'Effectifs' ? f.baseline_value + ' pers.'
                        : f.baseline_value + (f.forecast_type === 'Rentabilité' || f.forecast_type === 'KOS' ? '%' : 'j')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedForecast.forecast_type}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Horizon : {selectedForecast.horizon}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Généré le {new Date(selectedForecast.generated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedForecast.title}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                    <div className="text-lg font-bold text-green-700">
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? formatFCFA(selectedForecast.optimistic_value) : selectedForecast.optimistic_value}
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? ' FCFA' : selectedForecast.forecast_type === 'Effectifs' ? ' pers.' : selectedForecast.forecast_type === 'Rentabilité' || selectedForecast.forecast_type === 'KOS' ? '%' : 'j'}
                    </div>
                    <div className="text-xs text-foreground-500">Optimiste</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? formatFCFA(selectedForecast.baseline_value) : selectedForecast.baseline_value}
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? ' FCFA' : selectedForecast.forecast_type === 'Effectifs' ? ' pers.' : selectedForecast.forecast_type === 'Rentabilité' || selectedForecast.forecast_type === 'KOS' ? '%' : 'j'}
                    </div>
                    <div className="text-xs text-foreground-500">Baseline</div>
                  </div>
                  <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 text-center">
                    <div className="text-lg font-bold text-red-700">
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? formatFCFA(selectedForecast.pessimistic_value) : selectedForecast.pessimistic_value}
                      {selectedForecast.forecast_type === 'Revenue' || selectedForecast.forecast_type === 'Pipeline' || selectedForecast.forecast_type === 'Marché' ? ' FCFA' : selectedForecast.forecast_type === 'Effectifs' ? ' pers.' : selectedForecast.forecast_type === 'Rentabilité' || selectedForecast.forecast_type === 'KOS' ? '%' : 'j'}
                    </div>
                    <div className="text-xs text-foreground-500">Pessimiste</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Niveau de confiance</span>
                  </div>
                  {renderScoreBar(selectedForecast.confidence_level, 100, 'bg-emerald-500')}
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Hypothèses</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedForecast.assumptions}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : SCENARIO SIMULATOR ===== */}
        {activeTab === 'scenarios' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Scenario Simulator™</h3>
                  <p className="text-xs text-foreground-500">{scenarios.length} scénarios — {activeScenarios} actifs</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-primary-200 bg-primary-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Impact financier total simulé</div>
                <div className="text-lg font-bold text-primary-700">{formatFCFA(scenarios.reduce((s, sc) => s + Math.abs(sc.financial_impact_fcfa), 0))} FCFA</div>
                <div className="text-xs text-foreground-400 mt-1">{scenarios.filter(s => s.probability >= 0.5).length} scénarios probables</div>
              </div>
              {scenarios.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedScenario.id === s.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.domain}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScenarioStatusChip(s.status)}`}>{s.status.split('—')[0].trim()}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{s.scenario_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Prob. {(s.probability * 100).toFixed(0)}%</span>
                    <span className="text-xs font-bold text-foreground-950">Impact {s.impact_score.toFixed(1)}/10</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedScenario.domain}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScenarioStatusChip(selectedScenario.status)}`}>{selectedScenario.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedScenario.scenario_name}</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{(selectedScenario.probability * 100).toFixed(0)}%</div>
                    <div className="text-xs text-foreground-500">Probabilité</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedScenario.impact_score, 10, '', 44, selectedScenario.impact_score >= 8 ? '#ef4444' : selectedScenario.impact_score >= 6 ? '#f59e0b' : '#22c55e')}</div>
                    <div className="text-xs text-foreground-500">Impact</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-lg font-bold ${selectedScenario.financial_impact_fcfa >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedScenario.financial_impact_fcfa >= 0 ? '+' : ''}{formatFCFA(selectedScenario.financial_impact_fcfa)} FCFA
                    </div>
                    <div className="text-xs text-foreground-500">Impact Financier</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">
                      {(selectedScenario.probability * selectedScenario.impact_score).toFixed(1)}
                    </div>
                    <div className="text-xs text-foreground-500">Score Risque</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Implications Stratégiques</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedScenario.strategic_implications}</p>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Actions de Mitigation</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedScenario.mitigation_actions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 7 : EXECUTIVE COCKPIT — 9 SCORES ===== */}
        {activeTab === 'cockpit' && (
          <div>
            {/* Cockpit Export Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-foreground-500">Export COMEX — 9 scores de maturité KOS</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer"
                >
                  <i className="ri-table-2 text-sm"></i>Exporter CSV
                </button>
                <button
                  onClick={exportPDF}
                  disabled={exportStatus === 'exporting'}
                  className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    exportStatus === 'done' ? 'bg-green-500 text-white border border-green-400'
                    : exportStatus === 'exporting' ? 'bg-background-200 text-foreground-400 border border-background-300 cursor-not-allowed'
                    : 'bg-foreground-950 text-background-50 border border-foreground-800 hover:bg-foreground-800'
                  }`}
                >
                  <i className={`text-sm ${exportStatus === 'exporting' ? 'ri-loader-4-line animate-spin' : exportStatus === 'done' ? 'ri-check-line' : 'ri-file-pdf-line'}`}></i>
                  {exportStatus === 'exporting' ? 'Génération...' : exportStatus === 'done' ? 'PDF téléchargé !' : 'Exporter PDF'}
                </button>
              </div>
            </div>

            {/* Cockpit Hero — Overall Maturity */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">{cockpitOverallMetrics.overall_maturity.toFixed(1)}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">KOS Executive Cockpit™ — Maturité Globale</h3>
                    <p className="text-sm text-gray-400 mt-1">9 scores temps réel · Score composite pondéré · Projection Excellence {new Date(cockpitOverallMetrics.projected_excellence_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-center whitespace-nowrap">
                    <div className="text-lg font-bold text-emerald-400">{cockpitOverallMetrics.scores_at_very_good}</div>
                    <div className="text-[10px] text-gray-400">Très Performant</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-center whitespace-nowrap">
                    <div className="text-lg font-bold text-amber-400">{cockpitOverallMetrics.scores_at_acceptable}</div>
                    <div className="text-[10px] text-gray-400">Acceptable</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-center whitespace-nowrap">
                    <div className="text-lg font-bold text-accent-400">{cockpitOverallMetrics.scores_at_excellence}</div>
                    <div className="text-[10px] text-gray-400">Excellence</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-center whitespace-nowrap">
                    <div className="text-lg font-bold text-rose-400">{cockpitOverallMetrics.scores_critical}</div>
                    <div className="text-[10px] text-gray-400">Critique</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-center whitespace-nowrap">
                    <div className="text-lg font-bold text-accent-400">+{cockpitOverallMetrics.avg_improvement_velocity} pts</div>
                    <div className="text-[10px] text-gray-400">Vélocité/mois</div>
                  </div>
                </div>
              </div>
              {/* Thresholds Legend */}
              <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-white/10">
                {Object.entries(cockpitThresholds).reverse().map(([key, t]) => (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }}></span>
                    <span className="text-gray-300">{t.label}</span>
                    <span className="text-gray-500 font-mono">≥{t.min}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 9 Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {executiveCockpitScores.map((score) => {
                const th = getCockpitThreshold(score.current_score);
                const pct = Math.min((score.current_score / score.target_score) * 100, 100);
                const r = 36;
                const circ = 2 * Math.PI * r;
                const size = 88;
                const isVisible = visibleCards.has(score.id);

                return (
                  <button
                    key={score.id}
                    ref={el => cardRefs.current.set(score.id, el)}
                    onClick={() => setSelectedCockpitScore(score)}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
                      transition: 'opacity 0.35s ease, transform 0.35s ease',
                    }}
                    className={`text-left p-5 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                      selectedCockpitScore.id === score.id
                        ? 'border-foreground-300 bg-background-50 shadow-md ring-2 ring-foreground-100'
                        : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${th.color}20`, color: th.color }}>
                          <i className={`${score.icon} text-lg`}></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground-950">{score.name}</h4>
                          <span className="text-[10px] text-foreground-500">{score.owner}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {score.trend === 'up' && <i className="ri-arrow-up-s-line text-green-500 text-sm"></i>}
                        {score.trend === 'down' && <i className="ri-arrow-down-s-line text-red-500 text-sm"></i>}
                        {score.trend === 'stable' && <i className="ri-subtract-line text-amber-500 text-sm"></i>}
                        <span className={`text-xs font-bold ${score.trend === 'up' ? 'text-green-600' : score.trend === 'down' ? 'text-red-600' : 'text-amber-600'}`}>
                          {score.trend === 'up' ? '+' : score.trend === 'down' ? '-' : ''}{score.trend_pct}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
                        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
                          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
                          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={th.color} strokeWidth="6"
                            strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-bold text-foreground-950">{score.current_score}</span>
                          <span className="text-[9px] text-foreground-400">/100</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${th.color}18`, color: th.color, border: `1px solid ${th.color}30` }}>
                            {th.label}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {score.components.slice(0, 2).map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-[10px] text-foreground-500 flex-1 truncate">{c.label}</span>
                              <div className="w-12 h-1 bg-background-200/70 rounded-full overflow-hidden flex-shrink-0">
                                <div className="h-full rounded-full bg-accent-500" style={{ width: `${c.score}%` }}></div>
                              </div>
                              <span className="text-[10px] font-bold text-foreground-700 w-6 text-right">{c.score}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] text-foreground-400 mt-1">
                          {score.current_score < 95 ? `Gap: ${score.target_score - score.current_score} pts → Excellence` : 'Score Excellence atteint'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Score Detail */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              {(() => {
                const th = getCockpitThreshold(selectedCockpitScore.current_score);
                return (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${th.color}20`, color: th.color }}>
                        <i className={`${selectedCockpitScore.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground-950">{selectedCockpitScore.name} — Score {selectedCockpitScore.current_score}/100</h3>
                        <div className="flex items-center gap-3 text-xs text-foreground-500">
                          <span>Owner: {selectedCockpitScore.owner}</span>
                          <span>·</span>
                          <span>Dernière MAJ: {new Date(selectedCockpitScore.last_updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                          <span>·</span>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px]`} style={{ backgroundColor: `${th.color}18`, color: th.color }}>{th.label}</span>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        {selectedCockpitScore.trend === 'up' && <span className="text-xs font-bold text-green-600 flex items-center gap-1"><i className="ri-arrow-up-s-line"></i>+{selectedCockpitScore.trend_pct}%</span>}
                        {selectedCockpitScore.trend === 'down' && <span className="text-xs font-bold text-red-600 flex items-center gap-1"><i className="ri-arrow-down-s-line"></i>-{selectedCockpitScore.trend_pct}%</span>}
                        {selectedCockpitScore.trend === 'stable' && <span className="text-xs font-bold text-amber-600">Stable</span>}
                      </div>
                    </div>

                    {/* Components Detail */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {selectedCockpitScore.components.map((c, i) => (
                        <div key={i} className="p-4 bg-background-100 rounded-lg text-center">
                          <div className="text-xl font-bold text-foreground-950">{c.score}</div>
                          <div className="text-[10px] text-foreground-500 mb-2">{c.label}</div>
                          <div className="h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-accent-500" style={{ width: `${c.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                        <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2"><i className="ri-search-eye-line"></i>Gap Analysis</h4>
                        <p className="text-sm text-foreground-600 leading-relaxed">{selectedCockpitScore.gap_analysis}</p>
                      </div>
                      <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                        <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2"><i className="ri-rocket-line"></i>Plan d'Action</h4>
                        <p className="text-sm text-foreground-600 leading-relaxed">{selectedCockpitScore.action_plan}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Bottom KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{cockpitOverallMetrics.total_actions}</div>
                <div className="text-xs text-foreground-500">Actions Correctives</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{cockpitOverallMetrics.completed_actions}</div>
                <div className="text-xs text-foreground-500">Complétées</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{cockpitOverallMetrics.avg_improvement_velocity} pts</div>
                <div className="text-xs text-foreground-500">Vélocité Mensuelle</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-emerald-600">{new Date(cockpitOverallMetrics.projected_excellence_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                <div className="text-xs text-foreground-500">Date Projection Excellence</div>
              </div>
            </div>
          </div>
        )}

      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Enterprise Control Tower & Automation Factory</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Santé Globale</div>
              <div className="text-lg font-bold text-green-600">{okCount}/{tower.length} OK</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(okCount / tower.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Alertes Actives</div>
              <div className="text-lg font-bold text-rose-600">{totalAlerts}</div>
              <div className="text-xs text-foreground-400 mt-2">{warnCount} warning · {criticalCount} critique</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Efficience Workflows</div>
              <div className="text-lg font-bold text-amber-600">{avgEfficiency}%</div>
              <div className="text-xs text-foreground-400 mt-2">+{totalImprovement}% gain potentiel</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Équipes Surcharge</div>
              <div className="text-lg font-bold text-red-600">{overloadedTeams}/{capacity.length}</div>
              <div className="text-xs text-foreground-400 mt-2">
                {(capacity.reduce((s, t) => s + t.current_workload_hours, 0) / capacity.reduce((s, t) => s + t.max_capacity_hours, 0) * 100).toFixed(0)}% occupation
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Confiance Prévisions</div>
              <div className="text-lg font-bold text-emerald-600">{avgConfidence}%</div>
              <div className="text-xs text-foreground-400 mt-2">{forecasts.length} prévisions</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Scénarios Actifs</div>
              <div className="text-lg font-bold text-primary-600">{activeScenarios}/{scenarios.length}</div>
              <div className="text-xs text-foreground-400 mt-2">{scenarios.filter(s => s.probability >= 0.5).length} probables</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





