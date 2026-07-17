import { useState, useEffect } from 'react';
import { pillarCWVMockData, pillarCWVSummary } from '@/mocks/pillarCWV';
import type { PillarCWVSnapshot } from '@/mocks/pillarCWV';
import { supabase } from '@/lib/supabase';

export default function PillarCWVPanel() {
  const [snapshots, setSnapshots] = useState<PillarCWVSnapshot[]>(pillarCWVMockData);
  const [summary, setSummary] = useState(pillarCWVSummary);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'optimal' | 'good' | 'needs-work' | 'critical'>('all');
  const [sortBy, setSortBy] = useState<'pagespeed_score' | 'lcp_value' | 'tbt_value' | 'total_size_kb'>('lcp_value');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [lastScan, setLastScan] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const { data: dbSnaps, error } = await supabase
        .from('performance_snapshots')
        .select('*')
        .like('page_url', '/pillar/%')
        .order('scanned_at', { ascending: false });

      if (error) throw error;

      if (dbSnaps && dbSnaps.length > 0) {
        const pillarUrls = new Set(pillarCWVMockData.map(s => s.page_url));
        const urlLatest = new Map<string, any>();
        dbSnaps.forEach((s: any) => {
          if (pillarUrls.has(s.page_url) && !urlLatest.has(s.page_url)) {
            urlLatest.set(s.page_url, s);
          }
        });

        const mapped: PillarCWVSnapshot[] = pillarCWVMockData.map(mock => {
          const live = urlLatest.get(mock.page_url);
          if (live) {
            return {
              ...mock,
              lcp_value: live.lcp_value ?? mock.lcp_value,
              lcp_score: live.lcp_score ?? mock.lcp_score,
              fcp_value: live.fcp_value ?? mock.fcp_value,
              fcp_score: live.fcp_score ?? mock.fcp_score,
              cls_value: live.cls_value ?? mock.cls_value,
              cls_score: live.cls_score ?? mock.cls_score,
              tbt_value: live.tbt_value ?? mock.tbt_value,
              tbt_score: live.tbt_score ?? mock.tbt_score,
              inp_value: live.inp_value ?? mock.inp_value,
              inp_score: live.inp_score ?? mock.inp_score,
              pagespeed_score: live.pagespeed_score ?? mock.pagespeed_score,
              total_size_kb: live.total_size_kb ?? mock.total_size_kb,
              request_count: live.request_count ?? mock.request_count,
              scanned_at: live.scanned_at ?? mock.scanned_at,
              status: computeStatus(live.pagespeed_score ?? mock.pagespeed_score, live.lcp_value ?? mock.lcp_value),
              recommendations: live.recommendations?.length ? live.recommendations : mock.recommendations,
            };
          }
          return mock;
        });

        setSnapshots(mapped);
        const latestScan = dbSnaps[0]?.scanned_at;
        if (latestScan) setLastScan(latestScan);
        recomputeSummary(mapped);
      }
    } catch (err) {
      console.error('Pillar CWV load error:', err);
    } finally {
      setLoading(false);
    }
  }

  function computeStatus(score: number, lcp: number): PillarCWVSnapshot['status'] {
    if (score >= 90 && lcp < 2500) return 'optimal';
    if (score >= 80 && lcp < 3000) return 'good';
    if (score >= 65) return 'needs-work';
    return 'critical';
  }

  function recomputeSummary(data: PillarCWVSnapshot[]) {
    const avgLCP = Math.round(data.reduce((s, d) => s + d.lcp_value, 0) / data.length);
    const avgFCP = Math.round(data.reduce((s, d) => s + d.fcp_value, 0) / data.length);
    const avgCLS = Math.round(data.reduce((s, d) => s + d.cls_value, 0) / data.length * 1000) / 1000;
    const avgTBT = Math.round(data.reduce((s, d) => s + d.tbt_value, 0) / data.length);
    const avgINP = Math.round(data.reduce((s, d) => s + d.inp_value, 0) / data.length);
    const avgScore = Math.round(data.reduce((s, d) => s + d.pagespeed_score, 0) / data.length * 10) / 10;

    const optimal = data.filter(d => d.status === 'optimal').length;
    const good = data.filter(d => d.status === 'good').length;
    const needsWork = data.filter(d => d.status === 'needs-work').length;
    const critical = data.filter(d => d.status === 'critical').length;
    const lcpPassing = data.filter(d => d.lcp_value < 2500).length;

    const best = data.reduce((a, b) => a.pagespeed_score > b.pagespeed_score ? a : b);
    const worst = data.reduce((a, b) => a.pagespeed_score < b.pagespeed_score ? a : b);

    let grade = 'A';
    if (avgScore < 90) grade = 'B+';
    if (avgScore < 85) grade = 'B';
    if (avgScore < 80) grade = 'C';
    if (avgScore < 70) grade = 'D';

    setSummary({
      total_pages: data.length,
      pages_optimal: optimal,
      pages_good: good,
      pages_needs_work: needsWork,
      pages_critical: critical,
      average_lcp_ms: avgLCP,
      average_fcp_ms: avgFCP,
      average_cls: avgCLS,
      average_tbt_ms: avgTBT,
      average_inp_ms: avgINP,
      average_pagespeed_score: avgScore,
      best_page: best.page_name,
      best_page_score: best.pagespeed_score,
      worst_page: worst.page_name,
      worst_page_score: worst.pagespeed_score,
      overall_grade: grade,
      google_cwv_pass_rate: `${Math.round(lcpPassing / data.length * 100)}% (${lcpPassing}/${data.length} pages LCP sous 2.5s)`,
      big_four_target: 95,
      gap_to_target: Math.round((95 - avgScore) * 10) / 10,
      last_full_scan: lastScan || '2026-06-15T07:31:00Z',
      scan_duration_seconds: 42,
    });
  }

  async function runScan() {
    setScanning(true);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke('kos-performance-monitor', {
        body: { mode: 'pillar' },
      });
      if (fnError) throw fnError;
      await loadData();
    } catch (err: any) {
      console.error('Scan error:', err);
    } finally {
      setScanning(false);
    }
  }

  const filtered = filter === 'all' ? snapshots : snapshots.filter(s => s.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'pagespeed_score') return (a.pagespeed_score - b.pagespeed_score) * dir;
    if (sortBy === 'lcp_value') return (a.lcp_value - b.lcp_value) * dir;
    if (sortBy === 'tbt_value') return (a.tbt_value - b.tbt_value) * dir;
    return (a.total_size_kb - b.total_size_kb) * dir;
  });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir(field === 'lcp_value' || field === 'tbt_value' ? 'asc' : 'desc');
    }
  };

  const statusCounts = {
    all: snapshots.length,
    optimal: snapshots.filter(s => s.status === 'optimal').length,
    good: snapshots.filter(s => s.status === 'good').length,
    'needs-work': snapshots.filter(s => s.status === 'needs-work').length,
    critical: snapshots.filter(s => s.status === 'critical').length,
  };

  const gradeColor = summary.overall_grade === 'A' ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : summary.overall_grade.includes('B') ? 'text-amber-700 bg-amber-50 border-amber-200'
    : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground-950">Pillar Pages — Core Web Vitals Audit</h2>
          <p className="text-sm text-foreground-400 mt-0.5">Audit technique de performance des 16 pages pillar — SEO & Core Web Vitals Google</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-foreground-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            {summary.last_full_scan ? `Dernier scan : ${new Date(summary.last_full_scan).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}` : 'Mock Data'}
          </span>
          <button
            onClick={runScan}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
          >
            <i className={`${scanning ? 'ri-loader-4-line animate-spin' : 'ri-radar-line'}`}></i>
            {scanning ? 'Scan en cours...' : 'Lancer le scan CWV'}
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-background-200 hover:bg-background-50 cursor-pointer"
            title="Actualiser les données"
          >
            <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`}></i>
          </button>
        </div>
      </div>

      {/* Grade Banner */}
      <div className={`rounded-2xl border p-6 ${gradeColor}`}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center border border-current/10">
              <span className="text-3xl font-black font-heading">{summary.overall_grade}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Score Global Pillar Pages</h3>
              <p className="text-sm mt-0.5">
                Moyenne {summary.average_pagespeed_score}/100 · {summary.google_cwv_pass_rate} · Gap Big Four : {summary.gap_to_target} pts
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/50">{summary.pages_optimal} optimales</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/50">{summary.pages_good} bonnes</span>
                {summary.pages_needs_work > 0 && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/50">{summary.pages_needs_work} à améliorer</span>}
                {summary.pages_critical > 0 && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">{summary.pages_critical} critique</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'LCP moyen', value: `${(summary.average_lcp_ms / 1000).toFixed(2)}s`, sub: summary.average_lcp_ms < 2500 ? '✓ Vert Google' : '⚠ Au-dessus seuil', ok: summary.average_lcp_ms < 2500 },
              { label: 'CLS moyen', value: summary.average_cls.toFixed(3), sub: summary.average_cls < 0.1 ? '✓ Vert Google' : '⚠ Au-dessus seuil', ok: summary.average_cls < 0.1 },
              { label: 'TBT moyen', value: `${summary.average_tbt_ms}ms`, sub: summary.average_tbt_ms < 200 ? '✓ Bon' : '⚠ Élevé', ok: summary.average_tbt_ms < 200 },
              { label: 'INP moyen', value: `${summary.average_inp_ms}ms`, sub: summary.average_inp_ms < 200 ? '✓ Bon' : '⚠ Élevé', ok: summary.average_inp_ms < 200 },
            ].map((m, i) => (
              <div key={i} className="bg-white/40 rounded-xl p-3 text-center min-w-[90px]">
                <p className="text-xs text-current/60 font-medium">{m.label}</p>
                <p className="text-lg font-bold mt-0.5">{m.value}</p>
                <p className={`text-[10px] mt-0.5 font-medium ${m.ok ? 'text-emerald-600' : 'text-red-600'}`}>{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-foreground-500 mr-1">Filtrer :</span>
        {(['all', 'optimal', 'good', 'needs-work', 'critical'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === f
                ? f === 'all' ? 'bg-foreground-950 text-white'
                : f === 'optimal' ? 'bg-emerald-600 text-white'
                : f === 'good' ? 'bg-amber-500 text-white'
                : f === 'needs-work' ? 'bg-orange-500 text-white'
                : 'bg-red-600 text-white'
                : 'bg-background-100 text-foreground-600 hover:bg-background-200'
            }`}
          >
            {f === 'all' ? 'Toutes' : f === 'optimal' ? 'Optimales' : f === 'good' ? 'Bonnes' : f === 'needs-work' ? 'À améliorer' : 'Critiques'}
            <span className="ml-1.5 opacity-70">{statusCounts[f]}</span>
          </button>
        ))}
      </div>

      {/* Detailed table */}
      <div className="bg-white rounded-xl border border-background-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-50 border-b border-background-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider">Page Pillar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider">Catégorie</th>
                <th
                  className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider cursor-pointer hover:text-foreground-800"
                  onClick={() => toggleSort('pagespeed_score')}
                >
                  Score {sortBy === 'pagespeed_score' && <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line text-[10px]`}></i>}
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider cursor-pointer hover:text-foreground-800"
                  onClick={() => toggleSort('lcp_value')}
                >
                  LCP {sortBy === 'lcp_value' && <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line text-[10px]`}></i>}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider">FCP</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider">CLS</th>
                <th
                  className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider cursor-pointer hover:text-foreground-800"
                  onClick={() => toggleSort('tbt_value')}
                >
                  TBT {sortBy === 'tbt_value' && <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line text-[10px]`}></i>}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider">INP</th>
                <th
                  className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider cursor-pointer hover:text-foreground-800"
                  onClick={() => toggleSort('total_size_kb')}
                >
                  Poids {sortBy === 'total_size_kb' && <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line text-[10px]`}></i>}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-foreground-500 uppercase tracking-wider">Req.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider">Recommandations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {sorted.map((snap, i) => {
                const statusBadge = snap.status === 'optimal'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : snap.status === 'good'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : snap.status === 'needs-work'
                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                  : 'bg-red-50 text-red-700 border-red-200';

                const lcpBadge = snap.lcp_value < 2500 ? 'text-emerald-600' : snap.lcp_value < 4000 ? 'text-amber-600' : 'text-red-600';
                const tbtBadge = snap.tbt_value < 100 ? 'text-emerald-600' : snap.tbt_value < 200 ? 'text-amber-600' : 'text-red-600';

                return (
                  <tr key={snap.page_url} className="hover:bg-background-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          snap.status === 'optimal' ? 'bg-emerald-500' : snap.status === 'good' ? 'bg-amber-500' : snap.status === 'needs-work' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-sm font-medium text-foreground-900">{snap.page_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-foreground-400 whitespace-nowrap">{snap.pillar_category}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${statusBadge}`}>
                        {snap.pagespeed_score}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono font-semibold ${lcpBadge}`}>
                      {(snap.lcp_value / 1000).toFixed(2)}s
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-mono text-foreground-500">
                      {(snap.fcp_value / 1000).toFixed(2)}s
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono ${snap.cls_value > 0.1 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>
                      {snap.cls_value.toFixed(3)}
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono font-semibold ${tbtBadge}`}>
                      {snap.tbt_value}ms
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono ${snap.inp_value > 200 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {snap.inp_value}ms
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono ${snap.total_size_kb > 300 ? 'text-amber-600 font-semibold' : 'text-foreground-500'}`}>
                      {snap.total_size_kb} KB
                    </td>
                    <td className={`px-4 py-3 text-center text-sm font-mono ${snap.request_count > 25 ? 'text-amber-600 font-semibold' : 'text-foreground-500'}`}>
                      {snap.request_count}
                    </td>
                    <td className="px-4 py-3 max-w-[300px]">
                      {snap.recommendations.length === 0 ? (
                        <span className="text-xs text-emerald-600 font-medium">✓ Aucun problème</span>
                      ) : (
                        <div className="space-y-1">
                          {snap.recommendations.slice(0, 2).map((rec, ri) => (
                            <p key={ri} className="text-xs text-foreground-500 leading-relaxed truncate" title={rec}>
                              • {rec.length > 70 ? rec.slice(0, 70) + '...' : rec}
                            </p>
                          ))}
                          {snap.recommendations.length > 2 && (
                            <p className="text-[10px] text-foreground-300">+{snap.recommendations.length - 2} recommandation(s)</p>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best & Worst pages highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <i className="ri-trophy-line text-emerald-700"></i>
            </div>
            <span className="text-sm font-semibold text-emerald-900">Meilleure page pillar</span>
          </div>
          <p className="text-lg font-bold text-emerald-800">{summary.best_page}</p>
          <p className="text-sm text-emerald-600 mt-1">Score PageSpeed : {summary.best_page_score}/100 — Tous les CWV au vert</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-error-warning-line text-red-700"></i>
            </div>
            <span className="text-sm font-semibold text-red-900">Page à optimiser en priorité</span>
          </div>
          <p className="text-lg font-bold text-red-800">{summary.worst_page}</p>
          <p className="text-sm text-red-600 mt-1">Score PageSpeed : {summary.worst_page_score}/100 — {summary.gap_to_target} pts sous la cible Big Four</p>
        </div>
      </div>

      {/* CWV Thresholds reference */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-900 mb-4 flex items-center gap-2">
          <i className="ri-information-line text-foreground-500"></i>
          Seuils Google Core Web Vitals — Référence
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { metric: 'LCP', good: '< 2.5s', poor: '> 4.0s', icon: 'ri-image-line', color: 'primary' },
            { metric: 'FCP', good: '< 1.8s', poor: '> 3.0s', icon: 'ri-time-line', color: 'accent' },
            { metric: 'CLS', good: '< 0.1', poor: '> 0.25', icon: 'ri-layout-line', color: 'secondary' },
            { metric: 'TBT', good: '< 200ms', poor: '> 600ms', icon: 'ri-timer-line', color: 'primary' },
            { metric: 'INP', good: '< 200ms', poor: '> 500ms', icon: 'ri-cursor-line', color: 'accent' },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-background-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-background-100">
                  <i className={`${m.icon} text-xs text-foreground-600`}></i>
                </div>
                <span className="text-xs font-bold text-foreground-900">{m.metric}</span>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-emerald-600 font-medium">✓ Bon</span>
                  <span className="text-foreground-700">{m.good}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500 font-medium">✗ Mauvais</span>
                  <span className="text-foreground-700">{m.poor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}