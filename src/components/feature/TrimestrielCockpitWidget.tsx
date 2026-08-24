import { useState, useEffect, useCallback } from 'react';
import { useKosUnifiedKpis, UnifiedKpi } from '@/hooks/useKosUnifiedKpis';
import { supabase } from '@/lib/supabase';
import {
  TRIMESTRIEL_GLOBAL_SCORE,
  TRIMESTRIEL_OBSERVATORY_PUBLICATIONS,
  TRIMESTRIEL_BACKLINK_PROGRESS,
} from '@/mocks/tableauDeSuiviTrimestriel';

function MiniProgressBar({ value, target, color = '#2d7518' }: { value: number; target: number; color?: string }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="w-full bg-background-200 rounded-full h-1.5 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
    </div>
  );
}

function TrendBadge({ trend, change }: { trend: string; change: string }) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const color = isUp ? 'text-emerald-600 bg-emerald-50' : isDown ? 'text-red-600 bg-red-50' : 'text-foreground-600 bg-foreground-100';
  const icon = isUp ? 'ri-arrow-up-line' : isDown ? 'ri-arrow-down-line' : 'ri-arrow-right-line';
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${color}`}>
      <i className={icon} />
      {change}
    </span>
  );
}

function parseNumeric(value: string): number {
  const cleaned = value.replace(/[\s,%€]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

const CATEGORY_COLORS: Record<string, { color: string; icon: string; label: string }> = {
  content: { color: '#d4a82a', icon: 'ri-book-open-line', label: 'Contenu & Engagement' },
  executive: { color: '#2d7518', icon: 'ri-briefcase-line', label: 'Performance Exécutive' },
  seo: { color: '#5ba832', icon: 'ri-search-line', label: 'Visibilité SEO/GEO' },
  soc: { color: '#378e1d', icon: 'ri-shield-check-line', label: 'Sécurité & Infra' },
  sector_banques: { color: '#2d7518', icon: 'ri-bank-line', label: 'Banques' },
  sector_fintechs: { color: '#d4a82a', icon: 'ri-smartphone-line', label: 'FinTechs' },
  sector_esg: { color: '#d4a82a', icon: 'ri-leaf-line', label: 'ESG' },
  sector_mfi: { color: '#378e1d', icon: 'ri-hand-heart-line', label: 'Microfinance' },
};

const SECTOR_DOMAINS = ['Banques', 'FinTechs', 'ESG', 'Microfinance'];
const QUARTERS = ['T1 2026', 'T2 2026', 'T3 2026', 'T4 2026'];

const SECTOR_FILTER_CHIPS = [
  { id: 'sector_banques', label: 'Banques', color: '#2d7518', icon: 'ri-bank-line' },
  { id: 'sector_fintechs', label: 'FinTechs', color: '#d4a82a', icon: 'ri-smartphone-line' },
  { id: 'sector_esg', label: 'ESG', color: '#d4a82a', icon: 'ri-leaf-line' },
  { id: 'sector_mfi', label: 'Microfinance', color: '#378e1d', icon: 'ri-hand-heart-line' },
];

interface CatalogKpi {
  id: string;
  kpi_code: string;
  kpi_name: string;
  domain: string;
  frequency: string;
  current_value: string;
  target_threshold: string;
  unit: string;
}

export function TrimestrielCockpitWidget({ compact = false }: { compact?: boolean }) {
  const { kpis, grouped, loading, error, refresh, lastRefresh } = useKosUnifiedKpis();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [catalogKpis, setCatalogKpis] = useState<CatalogKpi[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<string[]>([]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => refresh(), 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  const handleRefresh = useCallback(() => refresh(), [refresh]);

  const toggleSectorFilter = useCallback((id: string) => {
    setSectorFilter(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  useEffect(() => {
    setCatalogLoading(true);
    supabase
      .from('kos_kpi_catalog')
      .select('id, kpi_code, kpi_name, domain, frequency, current_value, target_threshold, unit')
      .in('domain', SECTOR_DOMAINS)
      .eq('frequency', 'trimestrielle')
      .eq('is_active', true)
      .then(({ data, error: fetchError }) => {
        if (!fetchError && data) {
          setCatalogKpis(data as CatalogKpi[]);
        }
        setCatalogLoading(false);
      });
  }, []);

  const hasSupabaseData = kpis.length > 0;
  const sectorCategories = ['sector_banques', 'sector_fintechs', 'sector_esg', 'sector_mfi'];
  const sectorKpis = kpis.filter(k => sectorCategories.includes(k.category));

  // Filter sector KPIs by selected sector filter
  const visibleSectorKpis = sectorFilter.length === 0
    ? sectorKpis
    : sectorKpis.filter(k => sectorFilter.includes(k.category));

  const catalogGrouped: Record<string, CatalogKpi[]> = {};
  catalogKpis.forEach((k) => {
    if (!catalogGrouped[k.domain]) catalogGrouped[k.domain] = [];
    catalogGrouped[k.domain].push(k);
  });

  // Filter catalog by sector filter
  const domainMap: Record<string, string> = {
    sector_banques: 'Banques',
    sector_fintechs: 'FinTechs',
    sector_esg: 'ESG',
    sector_mfi: 'Microfinance',
  };
  const visibleCatalogGrouped: Record<string, CatalogKpi[]> = {};
  if (sectorFilter.length === 0) {
    Object.assign(visibleCatalogGrouped, catalogGrouped);
  } else {
    const allowedDomains = sectorFilter.map(f => domainMap[f]).filter(Boolean);
    Object.entries(catalogGrouped).forEach(([domain, items]) => {
      if (allowedDomains.includes(domain)) {
        visibleCatalogGrouped[domain] = items;
      }
    });
  }

  const getQuarterlyValue = (baseVal: string, quarter: number): string => {
    const num = parseNumeric(baseVal);
    if (num === 0) return baseVal;
    const variations = [0.92, 1.0, 1.05, 1.12];
    const factor = variations[quarter] || 1.0;
    return String(Math.round(num * factor));
  };

  const scoreCards = hasSupabaseData
    ? Object.entries(grouped).map(([category, items]) => {
        const config = CATEGORY_COLORS[category] || { color: '#2d7518', icon: 'ri-bar-chart-line', label: category };
        const avgCurrent = Math.round(items.reduce((sum, k) => sum + parseNumeric(k.current), 0) / items.length);
        const avgTarget = Math.round(items.reduce((sum, k) => sum + parseNumeric(k.target), 0) / items.length);
        return { label: config.label, score: avgCurrent, target: avgTarget || 100, color: config.color, icon: config.icon };
      })
    : [
        { label: 'Autorité Digitale', score: TRIMESTRIEL_GLOBAL_SCORE.authorityScore, target: TRIMESTRIEL_GLOBAL_SCORE.authorityTarget, color: '#2d7518', icon: 'ri-shield-check-line' },
        { label: 'Visibilité SEO', score: TRIMESTRIEL_GLOBAL_SCORE.seoScore, target: TRIMESTRIEL_GLOBAL_SCORE.seoTarget, color: '#d4a82a', icon: 'ri-search-line' },
        { label: 'Performance IA', score: TRIMESTRIEL_GLOBAL_SCORE.aiScore, target: TRIMESTRIEL_GLOBAL_SCORE.aiTarget, color: '#5ba832', icon: 'ri-cpu-line' },
        { label: 'Backlinks Acquis', score: TRIMESTRIEL_GLOBAL_SCORE.backlinksAcquired, target: TRIMESTRIEL_GLOBAL_SCORE.backlinksTarget, color: '#378e1d', icon: 'ri-link-m' },
      ];

  const globalPct = hasSupabaseData && scoreCards.length > 0
    ? Math.round(scoreCards.reduce((sum, s) => sum + (s.score / s.target), 0) / scoreCards.length * 100)
    : Math.round(
        (TRIMESTRIEL_GLOBAL_SCORE.backlinksAcquired / TRIMESTRIEL_GLOBAL_SCORE.backlinksTarget +
         TRIMESTRIEL_GLOBAL_SCORE.authorityScore / TRIMESTRIEL_GLOBAL_SCORE.authorityTarget +
         TRIMESTRIEL_GLOBAL_SCORE.seoScore / TRIMESTRIEL_GLOBAL_SCORE.seoTarget +
         TRIMESTRIEL_GLOBAL_SCORE.aiScore / TRIMESTRIEL_GLOBAL_SCORE.aiTarget +
         TRIMESTRIEL_GLOBAL_SCORE.publicationsDone / TRIMESTRIEL_GLOBAL_SCORE.publicationsTarget) / 5 * 100
      );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-100/70 flex items-center justify-center">
            <i className="ri-dashboard-line text-accent-700 text-lg"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950">Suivi Trimestriel KOS REGTECH AI</h3>
            <p className="text-[10px] text-foreground-500">
              {lastRefresh
                ? `Dernière actualisation : ${lastRefresh.toLocaleTimeString('fr-FR')}`
                : 'Chargement...'}
              {autoRefresh && <span className="ml-2 text-emerald-600">· Auto 60s</span>}
              {hasSupabaseData && <span className="ml-2 text-primary-600 font-bold">· Supabase</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-[10px] text-foreground-500 cursor-pointer">
            <span className={`w-7 h-3.5 rounded-full relative transition-colors ${autoRefresh ? 'bg-emerald-500' : 'bg-foreground-300'}`}>
              <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${autoRefresh ? 'left-3.5' : 'left-0.5'}`} />
            </span>
            Auto
          </label>
          <button onClick={handleRefresh} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-refresh-line" /> Rafraîchir
          </button>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
            {loading ? '...' : `${globalPct}% cible`}
          </span>
        </div>
      </div>

      {error && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-2">
          <i className="ri-error-warning-line" />
          Supabase indisponible — données mock affichées
        </div>
      )}

      {/* Quarter + Sector Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 bg-background-50 border border-background-200/70 rounded-lg p-1">
          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest px-2 flex items-center gap-1">
            <i className="ri-calendar-line text-xs" /> Trimestre
          </span>
          {QUARTERS.map((q, i) => (
            <button
              key={q}
              onClick={() => setSelectedQuarter(i)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                selectedQuarter === i
                  ? 'bg-primary-500 text-background-50 dark:text-foreground-950'
                  : 'text-foreground-600 hover:bg-background-100'
              }`}
            >
              {q}
            </button>
          ))}
          {catalogLoading && <i className="ri-loader-4-line animate-spin text-[10px] text-foreground-400 ml-1" />}
          {!catalogLoading && catalogKpis.length > 0 && (
            <span className="text-[9px] text-emerald-600 font-bold ml-1">· {catalogKpis.length} KPI catalog</span>
          )}
        </div>

        {/* ── Sector Filter Chips ── */}
        {!compact && sectorKpis.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-widest mr-1">
              <i className="ri-filter-3-line text-xs" /> Secteurs
            </span>
            {SECTOR_FILTER_CHIPS.map(chip => {
              const isActive = sectorFilter.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  onClick={() => toggleSectorFilter(chip.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'text-white'
                      : 'text-foreground-500 bg-background-50 border-background-200 hover:border-background-300'
                  }`}
                  style={isActive ? { background: chip.color, borderColor: chip.color } : {}}
                >
                  <i className={`${chip.icon} text-[10px]`} />
                  {chip.label}
                  {isActive && (
                    <i className="ri-close-line text-[10px] ml-0.5" />
                  )}
                </button>
              );
            })}
            {sectorFilter.length > 0 && (
              <button
                onClick={() => setSectorFilter([])}
                className="text-[10px] text-primary-600 hover:underline px-1 cursor-pointer whitespace-nowrap"
              >
                Tout afficher
              </button>
            )}
          </div>
        )}
      </div>

      {/* Score Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {scoreCards.map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} text-lg mb-1`} style={{ color: s.color }}></i>
            <div className="text-lg font-bold text-foreground-950" style={{ color: s.color }}>{s.score}/{s.target}</div>
            <div className="text-[10px] text-foreground-500">{s.label}</div>
            <div className="mt-1.5">
              <MiniProgressBar value={s.score} target={s.target} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Sectoral KPIs from kos_unified_kpis */}
      {visibleSectorKpis.length > 0 && !compact && (
        <div>
          <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <i className="ri-pie-chart-2-line text-accent-500"></i> KPIs Sectoriels · {QUARTERS[selectedQuarter]}
            {sectorFilter.length > 0 && (
              <span className="text-primary-600 font-normal normal-case tracking-normal">
                ({sectorFilter.length} secteur{sectorFilter.length > 1 ? 's' : ''})
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {visibleSectorKpis.map((kpi: UnifiedKpi) => {
              const config = CATEGORY_COLORS[kpi.category] || { color: '#2d7518' };
              const currentVal = parseNumeric(kpi.current);
              const targetVal = parseNumeric(kpi.target);
              return (
                <div key={kpi.id} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-foreground-500 truncate">{kpi.label}</span>
                    <TrendBadge trend={kpi.trend || 'stable'} change={kpi.trend === 'up' ? `+${Math.round(currentVal * 0.05)}` : kpi.trend === 'down' ? `-${Math.round(currentVal * 0.03)}` : '0'} />
                  </div>
                  <div className="text-sm font-bold text-foreground-950">{kpi.current}{kpi.unit}</div>
                  <div className="mt-1">
                    <MiniProgressBar value={currentVal} target={targetVal || 100} color={config.color} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Catalog KPIs by Sector */}
      {!compact && Object.keys(visibleCatalogGrouped).length > 0 && (
        <div>
          <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <i className="ri-database-2-line text-primary-500"></i> KPI Catalog Trimestriels · {QUARTERS[selectedQuarter]}
          </div>
          <div className="space-y-4">
            {Object.entries(visibleCatalogGrouped).map(([domain, items]) => (
              <div key={domain}>
                <div className="text-[10px] font-bold text-foreground-600 mb-1.5 px-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: domain === 'Banques' ? '#2d7518' : domain === 'FinTechs' ? '#d4a82a' : domain === 'ESG' ? '#b8941f' : '#378e1d' }} />
                  {domain}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {items.map(item => {
                    const val = parseNumeric(getQuarterlyValue(item.current_value, selectedQuarter));
                    const tgt = parseNumeric(item.target_threshold);
                    return (
                      <div key={item.id} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                        <div className="text-[9px] text-foreground-500 mb-1 truncate">{item.kpi_name}</div>
                        <div className="text-sm font-bold text-foreground-950">{getQuarterlyValue(item.current_value, selectedQuarter)}{item.unit}</div>
                        <div className="mt-1">
                          <MiniProgressBar value={val} target={tgt || 100} color={domain === 'Banques' ? '#2d7518' : domain === 'FinTechs' ? '#d4a82a' : domain === 'ESG' ? '#b8941f' : '#378e1d'} />
                        </div>
                        <div className="flex justify-between mt-0.5 text-[9px] text-foreground-400">
                          <span>Cible: {item.target_threshold}{item.unit}</span>
                          <span>{Math.round((val / (tgt || 1)) * 100)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!compact && (
        <>
          {hasSupabaseData ? (
            Object.entries(grouped).filter(([cat]) => !sectorCategories.includes(cat)).map(([category, items]) => {
              const config = CATEGORY_COLORS[category] || { color: '#2d7518', icon: 'ri-bar-chart-line', label: category };
              return (
                <div key={category}>
                  <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className={`${config.icon}`} style={{ color: config.color }}></i> {config.label}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {items.map((kpi: UnifiedKpi) => {
                      const currentVal = parseNumeric(kpi.current);
                      const targetVal = parseNumeric(kpi.target);
                      const changeVal = currentVal > targetVal ? '+' + Math.round(currentVal - targetVal) : '';
                      return (
                        <div key={kpi.id} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-foreground-500">{kpi.label}</span>
                            {changeVal && <TrendBadge trend={kpi.trend || 'stable'} change={changeVal} />}
                          </div>
                          <div className="text-sm font-bold text-foreground-950">{kpi.current}{kpi.unit}</div>
                          <div className="mt-1">
                            <MiniProgressBar value={currentVal} target={targetVal || 100} color={config.color} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div>
                <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="ri-shield-check-line text-primary-500"></i> Autorité Digitale
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { name: 'Domain Authority', val: 38, tgt: 50, unit: '/100', trend: 'up', ch: '+3' },
                    { name: 'Backlinks qualifiés', val: 42, tgt: 80, unit: '', trend: 'up', ch: '+8' },
                    { name: 'Domaines référents', val: 28, tgt: 50, unit: '', trend: 'up', ch: '+5' },
                    { name: 'Pages indexées', val: 847, tgt: 1200, unit: '', trend: 'up', ch: '+124' },
                  ].map(kpi => (
                    <div key={kpi.name} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-foreground-500">{kpi.name}</span>
                        <TrendBadge trend={kpi.trend} change={kpi.ch} />
                      </div>
                      <div className="text-sm font-bold text-foreground-950">{kpi.val}{kpi.unit}</div>
                      <div className="mt-1">
                        <MiniProgressBar value={kpi.val} target={kpi.tgt} color="#2d7518" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="ri-search-line text-accent-500"></i> Visibilité SEO/GEO
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  {[
                    { name: 'Mots-clés Top 3', val: '156', tgt: '300', unit: '', trend: 'up', ch: '+22' },
                    { name: 'Mots-clés Top 10', val: '423', tgt: '800', unit: '', trend: 'up', ch: '+58' },
                    { name: 'Trafic/mois', val: '12450', tgt: '25000', unit: '', trend: 'up', ch: '+18%' },
                    { name: 'CTR moyen', val: '4.2', tgt: '6.0', unit: '%', trend: 'stable', ch: '+0.3' },
                    { name: 'Impressions/mois', val: '295000', tgt: '500000', unit: '', trend: 'up', ch: '+12%' },
                    { name: 'Position moy.', val: '8.4', tgt: '5.0', unit: '', trend: 'down', ch: '-0.8' },
                  ].map(kpi => (
                    <div key={kpi.name} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-foreground-500">{kpi.name}</span>
                        <TrendBadge trend={kpi.trend} change={kpi.ch} />
                      </div>
                      <div className="text-sm font-bold text-foreground-950">{kpi.val}{kpi.unit}</div>
                      <div className="mt-1">
                        <MiniProgressBar value={parseNumeric(kpi.val)} target={parseNumeric(kpi.tgt)} color="#d4a82a" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!hasSupabaseData && (
            <div>
              <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <i className="ri-cpu-line text-primary-500"></i> Performance IA
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                {[
                  { name: 'Articles/mois', val: '34', tgt: '50', unit: '', trend: 'up', ch: '+6' },
                  { name: 'Score conformité IA', val: '87', tgt: '95', unit: '/100', trend: 'up', ch: '+4' },
                  { name: 'Délai publication', val: '3.2', tgt: '1.5', unit: 'j', trend: 'down', ch: '-0.5' },
                  { name: 'Détection fraude', val: '94.7', tgt: '98.0', unit: '%', trend: 'up', ch: '+2.1' },
                  { name: 'Précision ESG', val: '91.2', tgt: '96.0', unit: '%', trend: 'up', ch: '+1.8' },
                  { name: 'Tps réponse', val: '420', tgt: '200', unit: 'ms', trend: 'down', ch: '-80' },
                ].map(kpi => (
                  <div key={kpi.name} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground-500">{kpi.name}</span>
                      <TrendBadge trend={kpi.trend} change={kpi.ch} />
                    </div>
                    <div className="text-sm font-bold text-foreground-950">{kpi.val}{kpi.unit}</div>
                    <div className="mt-1">
                      <MiniProgressBar value={parseNumeric(kpi.val)} target={parseNumeric(kpi.tgt)} color="#5ba832" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasSupabaseData && (
            <>
              <div>
                <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="ri-book-open-line text-accent-500"></i> Publications Observatoires
                </div>
                <div className="bg-background-50 border border-background-200/70 rounded-lg overflow-x-auto">
                  <table className="w-full text-[10px] min-w-[400px]">
                    <thead>
                      <tr className="bg-background-100 border-b border-background-200">
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase">Secteur</th>
                        <th className="text-center py-2 px-2 font-bold text-foreground-500 uppercase">T1</th>
                        <th className="text-center py-2 px-2 font-bold text-foreground-500 uppercase">T2</th>
                        <th className="text-center py-2 px-2 font-bold text-foreground-500 uppercase">T3</th>
                        <th className="text-center py-2 px-2 font-bold text-foreground-500 uppercase">T4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRIMESTRIEL_OBSERVATORY_PUBLICATIONS.map((row, i) => (
                        <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                          <td className="py-1.5 px-3 font-bold text-foreground-900">{row.secteur}</td>
                          <td className="text-center py-1.5 px-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.t1 === '✓' ? 'bg-emerald-100 text-emerald-700' : row.t1 === '—' ? 'bg-foreground-100 text-foreground-400' : 'bg-amber-100 text-amber-700'}`}>{row.t1}</span>
                          </td>
                          <td className="text-center py-1.5 px-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.t2 === '✓' ? 'bg-emerald-100 text-emerald-700' : row.t2 === '—' ? 'bg-foreground-100 text-foreground-400' : 'bg-amber-100 text-amber-700'}`}>{row.t2}</span>
                          </td>
                          <td className="text-center py-1.5 px-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.t3 === '✓' ? 'bg-emerald-100 text-emerald-700' : 'bg-foreground-100 text-foreground-400'}`}>{row.t3}</span>
                          </td>
                          <td className="text-center py-1.5 px-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.t4 === '✓' ? 'bg-emerald-100 text-emerald-700' : 'bg-foreground-100 text-foreground-400'}`}>{row.t4}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="ri-link-m text-accent-500"></i> Progression Backlinks
                </div>
                <div className="space-y-1.5">
                  {TRIMESTRIEL_BACKLINK_PROGRESS.map((p, i) => {
                    const pct = Math.round((p.t2 / p.t4Target) * 100);
                    return (
                      <div key={i} className="bg-background-50 border border-background-200/50 rounded-lg p-2.5 flex items-center gap-3">
                        <span className="text-[10px] font-bold text-foreground-950 w-32 whitespace-nowrap">{p.pillar}</span>
                        <div className="flex-1">
                          <MiniProgressBar value={p.t2} target={p.t4Target} color={pct >= 50 ? '#2d7518' : '#d4a82a'} />
                        </div>
                        <span className="text-[10px] font-bold w-10 text-right" style={{ color: pct >= 50 ? '#059669' : '#d97706' }}>{p.t2}/{p.t4Target}</span>
                        <span className="text-[9px] text-foreground-400 w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TrimestrielCockpitWidget;



