import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

interface RegulatoryText {
  id: string;
  authority: string;
  reference: string;
  title: string;
  date_publication: string;
  content: string;
  status: string;
  penalties?: unknown[];
}

interface CoverageMetrics {
  total_corpus: number;
  tp_texts: number;
  coverage_pct: number;
  fresh_sources: number;
  avg_age_months: number;
  authorities: Record<string, number>;
  missing_critical: string[];
  last_ingest: string;
  cron_status: 'active' | 'failed' | 'unknown';
}

const CRITICAL_REFERENCES = [
  'Circ-009-2025', 'Circ-007-2024', 'Instr-010-05-2022',
  'Règlement 02-2023', 'Circulaire 03-2024', 'COBAC R-2016/01',
  'Instr-02-2025', 'Instruction 008/GR/2019',
];

const CRITICAL_TP_MATRIX = [
  { ref: 'Circ-009-2025', authority: 'BCEAO', title: 'BEPS 2.0 Pilier 2 UEMOA', priority: 'P0', fine: '5 Mds FCFA' },
  { ref: 'Circ-007-2024', authority: 'BCEAO', title: 'Obligations déclaratives — Économie numérique', priority: 'P0', fine: '2 Mds FCFA' },
  { ref: 'Instr-010-05-2022', authority: 'BCEAO', title: 'Déclaration 2257-SD et documentation TP', priority: 'P0', fine: '500M FCFA' },
  { ref: 'Règlement 02-2023', authority: 'COBAC', title: 'Gouvernance des prix de transfert', priority: 'P1', fine: '1 Md FCFA' },
  { ref: 'Circulaire 03-2024', authority: 'COBAC', title: 'Prix de transfert — SFD', priority: 'P1', fine: '750M FCFA' },
  { ref: 'COBAC R-2016/01', authority: 'COBAC', title: 'Établissements de crédit CEMAC', priority: 'P1', fine: '500M FCFA' },
  { ref: 'Instr-02-2025', authority: 'BEAC', title: 'Accords Préalables Prix de Transfert (API TP)', priority: 'P0', fine: '1 Md FCFA' },
  { ref: 'Instruction 008/GR/2019', authority: 'BEAC', title: 'Modalités d\'application TP CEMAC', priority: 'P2', fine: '250M FCFA' },
];

interface GapEntry {
  ref: string;
  authority: string;
  title: string;
  priority: string;
  fine: string;
  status: 'present' | 'missing';
  date_publication: string | null;
}

const TP_KEYWORDS = ['prix de transfert', 'intra-groupe', 'BEPS', 'parties liées', '2257', 'API TP'];

function getCoverageColor(pct: number): string {
  if (pct >= 30) return 'text-primary-600 bg-primary-50';
  if (pct >= 15) return 'text-accent-600 bg-accent-50';
  return 'text-red-600 bg-red-50';
}

function getAgeColor(months: number): string {
  if (months < 24) return 'text-primary-600';
  if (months < 60) return 'text-accent-600';
  return 'text-red-600';
}

export default function KOSCorrectivesDashboardPage() {
  const [texts, setTexts] = useState<RegulatoryText[]>([]);
  const [metrics, setMetrics] = useState<CoverageMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [authorityFilter, setAuthorityFilter] = useState<string>('all');
  const [ingestRunning, setIngestRunning] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [gapData, setGapData] = useState<GapEntry[]>([]);
  const [backfillUploading, setBackfillUploading] = useState(false);
  const [tab, setTab] = useState<'dashboard' | 'gap'>('dashboard');

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      const { data: corpus, error: corpusErr } = await supabase
        .from('kos_regulatory_corpus')
        .select('*')
        .order('date_publication', { ascending: false });

      if (corpusErr) throw corpusErr;
      if (!corpus) return;

      const tpTexts = corpus.filter((t: RegulatoryText) =>
        TP_KEYWORDS.some(kw => t.content?.toLowerCase().includes(kw.toLowerCase()))
      );

      const authoritiesMap: Record<string, number> = {};
      corpus.forEach((t: RegulatoryText) => {
        authoritiesMap[t.authority] = (authoritiesMap[t.authority] || 0) + 1;
      });

      const foundRefs = new Set(tpTexts.map((t: RegulatoryText) => t.reference));
      const missing = CRITICAL_REFERENCES.filter(ref => !foundRefs.has(ref));

      const freshSources = tpTexts.filter((t: RegulatoryText) => {
        const age = (Date.now() - new Date(t.date_publication).getTime()) / (1000 * 60 * 60 * 24 * 30);
        return age < 60;
      }).length;

      const avgAge = tpTexts.length > 0
        ? tpTexts.reduce((sum: number, t: RegulatoryText) => {
            const age = (Date.now() - new Date(t.date_publication).getTime()) / (1000 * 60 * 60 * 24 * 30);
            return sum + age;
          }, 0) / tpTexts.length
        : 0;

      let cronStatus: 'active' | 'failed' | 'unknown' = 'unknown';
      let lastIngest = 'N/A';

      try {
        const { data: cronData, error: cronErr } = await supabase
          .from('cron.job_run_details')
          .select('status, start_time')
          .eq('jobid', 70)
          .order('start_time', { ascending: false })
          .limit(1);

        if (!cronErr && cronData && cronData.length > 0) {
          const latest = cronData[0] as { status: string; start_time: string };
          lastIngest = latest.start_time || 'N/A';
          cronStatus = latest.status === 'succeeded' ? 'active' : 'failed';
        }
      } catch {
        // cron table might not be accessible — ignore silently
      }

      setMetrics({
        total_corpus: corpus.length,
        tp_texts: tpTexts.length,
        coverage_pct: Number(((tpTexts.length / corpus.length) * 100).toFixed(1)),
        fresh_sources: freshSources,
        avg_age_months: Number(avgAge.toFixed(1)),
        authorities: authoritiesMap,
        missing_critical: missing,
        last_ingest: lastIngest,
        cron_status: cronStatus,
      });

      setTexts(tpTexts);

      // Compute Gap Analysis data
      const { data: existingCorpus } = await supabase
        .from('kos_regulatory_corpus')
        .select('reference, date_publication')
        .in('reference', CRITICAL_TP_MATRIX.map(t => t.ref));

      const existingRefs = new Set(existingCorpus?.map(e => e.reference) || []);

      const gapEntries: GapEntry[] = CRITICAL_TP_MATRIX.map(text => ({
        ...text,
        status: existingRefs.has(text.ref) ? 'present' : 'missing',
        date_publication: existingCorpus?.find(e => e.reference === text.ref)?.date_publication || null,
      }));

      setGapData(gapEntries);

      const newAlerts: string[] = [];
      if (missing.length > 0) newAlerts.push(`${missing.length} textes critiques TP manquants dans le corpus`);
      if (tpTexts.length < 20) newAlerts.push(`Couverture ${((tpTexts.length / corpus.length) * 100).toFixed(1)}% — sous le seuil Big Four de 30%`);
      if (cronStatus === 'failed') newAlerts.push('Cron kos-batch-ingest en échec — dernière exécution ratée');
      setAlerts(newAlerts);
    } catch (err) {
      console.error('Erreur chargement données:', err);
      setError('Impossible de charger les données du corpus réglementaire. Vérifiez la connexion Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const triggerManualIngest = async () => {
    setIngestRunning(true);
    try {
      const { error: invokeErr } = await supabase.functions.invoke('kos-batch-ingest', {
        body: { force: true, authorities: ['BCEAO', 'COBAC', 'BEAC'] },
      });
      if (invokeErr) throw invokeErr;
      setTimeout(() => loadData(), 5000);
    } catch (err) {
      alert('Échec de l\'ingestion : ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIngestRunning(false);
    }
  };

  const handleBackfillUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackfillUploading(true);
    try {
      const text = await file.text();
      const lines = text.split('\n').slice(1).filter(line => line.trim());

      for (const line of lines) {
        const parts = line.split('|');
        if (parts.length < 6) continue;
        const [auth, ref, title, date, url, content] = parts.map(p => p.trim());

        await supabase.rpc('kos_ingest_regulatory_text', {
          p_authority: auth,
          p_reference: ref,
          p_title: title,
          p_date_publication: date,
          p_source_url: url,
          p_content: content,
          p_status: 'EN_VIGUEUR',
        });
      }
    } catch (err) {
      console.error('Backfill error:', err);
      alert('Erreur lors du backfill: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setBackfillUploading(false);
      loadData();
    }
  };

  const exportGapCSV = () => {
    const csv = [
      ['Priorité', 'Autorité', 'Référence', 'Titre', 'Amende Max', 'Statut', 'Date Publication'].join(','),
      ...gapData.map(g => [
        g.priority, g.authority, g.ref, `"${g.title.replace(/"/g, '""')}"`, g.fine, g.status, g.date_publication || 'N/A',
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kos-gap-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const csv = [
      ['Autorité', 'Référence', 'Titre', 'Date', 'Âge (mois)', 'Statut'].join(','),
      ...filteredTexts.map(t => [
        t.authority,
        t.reference,
        `"${t.title.replace(/"/g, '""')}"`,
        t.date_publication,
        Math.round((Date.now() - new Date(t.date_publication).getTime()) / (1000 * 60 * 60 * 24 * 30)),
        t.status,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kos-tp-corpus-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTexts = useMemo(() => {
    return texts.filter(t => {
      const matchSearch = filter === '' ||
        t.title.toLowerCase().includes(filter.toLowerCase()) ||
        t.reference.toLowerCase().includes(filter.toLowerCase()) ||
        (t.content || '').toLowerCase().includes(filter.toLowerCase());
      const matchAuth = authorityFilter === 'all' || t.authority === authorityFilter;
      return matchSearch && matchAuth;
    });
  }, [texts, filter, authorityFilter]);

  const authorityList = useMemo(() => {
    return Object.keys(metrics?.authorities || {}).sort();
  }, [metrics]);

  const gapMissingCount = gapData.filter(g => g.status === 'missing').length;
  const gapP0Missing = gapData.filter(g => g.status === 'missing' && g.priority === 'P0').length;
  const gapP1Missing = gapData.filter(g => g.status === 'missing' && g.priority === 'P1').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-background-100">
            <i className="ri-refresh-line text-2xl text-primary-500 animate-spin"></i>
          </div>
          <p className="text-foreground-500 font-body text-sm">Chargement du corpus réglementaire...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
            <i className="ri-error-warning-line text-3xl text-red-500"></i>
          </div>
          <p className="text-foreground-700 font-body mb-4">{error}</p>
          <button
            onClick={() => { setLoading(true); loadData(); }}
            className="px-5 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-refresh-line mr-2"></i>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground-950 font-heading flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-shield-check-line text-xl"></i>
                </span>
                KOS Correctives Dashboard
              </h1>
              <p className="text-foreground-600 mt-1 font-body text-sm">Monitoring Big Four — Prix de Transfert UEMOA / CEMAC</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={triggerManualIngest}
                disabled={ingestRunning}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-primary-600 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-refresh-line text-base ${ingestRunning ? 'animate-spin' : ''}`}></i>
                {ingestRunning ? 'Ingestion en cours...' : 'Relancer Ingest'}
              </button>
              {tab === 'dashboard' && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-foreground-800 text-background-50 rounded-lg text-sm font-semibold hover:bg-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-download-line text-base"></i>
                  Export CSV
                </button>
              )}
              {tab === 'gap' && (
                <>
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className={`ri-upload-2-line text-base ${backfillUploading ? 'animate-spin' : ''}`}></i>
                    </span>
                    {backfillUploading ? 'Upload...' : 'Backfill CSV'}
                    <input type="file" accept=".csv" onChange={handleBackfillUpload} className="hidden" />
                  </label>
                  <button
                    onClick={exportGapCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-foreground-800 text-background-50 rounded-lg text-sm font-semibold hover:bg-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-download-2-line text-base"></i>
                    </span>
                    Export Gap
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-background-200/70 -mx-6 px-6">
            <button
              onClick={() => setTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${
                tab === 'dashboard'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-foreground-600 hover:text-foreground-900 hover:border-background-300'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-bar-chart-2-line text-base"></i>
              </span>
              Dashboard
            </button>
            <button
              onClick={() => setTab('gap')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${
                tab === 'gap'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-foreground-600 hover:text-foreground-900 hover:border-background-300'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-error-warning-line text-base"></i>
              </span>
              Gap Analysis
              {gapMissingCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-background-50 text-xs font-bold">
                  {gapMissingCount}
                </span>
              )}
            </button>
          </div>

          {/* Alerts */}
          {tab === 'dashboard' && alerts.length > 0 && (
            <div className="mt-6 space-y-2">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-800 font-body text-sm">
                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-error-warning-line text-red-600"></i>
                  </span>
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          )}

          {/* Metric Cards — Dashboard only */}
          {tab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-background-50 p-4 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <i className="ri-database-2-line text-lg"></i>
                  </span>
                  <span className={`text-2xl font-bold font-heading ${getCoverageColor(metrics?.coverage_pct || 0).split(' ')[0]}`}>
                    {metrics?.coverage_pct}%
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground-700 font-body">Couverture TP</div>
                <div className="text-xs text-foreground-500 mt-0.5 font-body">
                  {metrics?.tp_texts}/{metrics?.total_corpus} textes
                </div>
              </div>

              <div className="bg-background-50 p-4 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-2xl font-bold text-primary-600 font-heading">{metrics?.fresh_sources}</span>
                </div>
                <div className="text-sm font-semibold text-foreground-700 font-body">Sources Fraîches</div>
                <div className="text-xs text-foreground-500 mt-0.5 font-body">&lt; 60 mois</div>
              </div>

              <div className="bg-background-50 p-4 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600">
                    <i className="ri-line-chart-line text-lg"></i>
                  </span>
                  <span className={`text-2xl font-bold font-heading ${getAgeColor(metrics?.avg_age_months || 0)}`}>
                    {metrics?.avg_age_months}m
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground-700 font-body">Âge Moyen</div>
                <div className="text-xs text-foreground-500 mt-0.5 font-body">Cible &lt; 36 mois</div>
              </div>

              <div className="bg-background-50 p-4 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <i className="ri-alert-line text-lg"></i>
                  </span>
                  <span className="text-2xl font-bold text-red-600 font-heading">{metrics?.missing_critical.length}</span>
                </div>
                <div className="text-sm font-semibold text-foreground-700 font-body">Critiques Manquants</div>
                <div className="text-xs text-foreground-500 mt-0.5 font-body">Standard Big Four</div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Tab Content */}
        {tab === 'dashboard' && (
          <>
            {/* Table Section */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                <div className="relative flex-1 w-full max-w-md">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400">
                    <i className="ri-search-line text-sm"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Rechercher titre, référence, contenu..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 font-body focus:outline-none focus:border-primary-300"
                  />
                </div>
                <select
                  value={authorityFilter}
                  onChange={(e) => setAuthorityFilter(e.target.value)}
                  className="px-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
                >
                  <option value="all">Toutes les autorités</option>
                  {authorityList.map(auth => (
                    <option key={auth} value={auth}>{auth} ({metrics?.authorities[auth]})</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-background-200/70">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Autorité</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Référence</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Titre</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Âge</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-200/70">
                    {filteredTexts.map((text) => {
                      const age = (Date.now() - new Date(text.date_publication).getTime()) / (1000 * 60 * 60 * 24 * 30);
                      const isCritical = CRITICAL_REFERENCES.includes(text.reference);
                      return (
                        <tr key={text.id} className={`hover:bg-background-100/70 transition-colors ${isCritical ? 'bg-accent-50/70' : ''}`}>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 font-body">
                              {text.authority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-foreground-900">
                            {text.reference}
                            {isCritical && (
                              <span className="inline-flex w-4 h-4 items-center justify-center ml-1 text-primary-500" title="Texte critique Big Four">
                                <i className="ri-shield-check-line text-xs"></i>
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground-800 max-w-md truncate font-body">{text.title}</td>
                          <td className="px-4 py-3 text-sm text-foreground-600 font-body whitespace-nowrap">
                            {new Date(text.date_publication).toLocaleDateString('fr-FR')}
                          </td>
                          <td className={`px-4 py-3 text-sm font-semibold font-body ${getAgeColor(age)}`}>
                            {Math.round(age)}m
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${
                              text.status === 'EN_VIGUEUR'
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-background-200 text-foreground-600'
                            }`}>
                              {text.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredTexts.length === 0 && (
                <div className="text-center py-16">
                  <span className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-background-100">
                    <i className="ri-file-text-line text-2xl text-foreground-300"></i>
                  </span>
                  <p className="text-foreground-500 font-body">Aucun texte trouvé pour ces critères</p>
                </div>
              )}

              {filteredTexts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-background-200/70 text-xs text-foreground-500 font-body">
                  {filteredTexts.length} texte{filteredTexts.length > 1 ? 's' : ''} affiché{filteredTexts.length > 1 ? 's' : ''}
                  {filter || authorityFilter !== 'all' ? ' (filtré)' : ''} sur {texts.length} textes TP
                </div>
              )}
            </div>
          </>
        )}

        {/* Gap Analysis Tab Content */}
        {tab === 'gap' && (
          <>
            {/* Gap Analysis Big Four — Prix de Transfert */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-foreground-950 font-heading flex items-center gap-2">
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <i className="ri-error-warning-line text-base"></i>
                    </span>
                    Gap Analysis Big Four — Prix de Transfert
                  </h3>
                  <p className="text-sm text-foreground-600 mt-1 font-body">
                    {gapData.length - gapMissingCount}/{gapData.length} textes critiques présents
                    {gapP0Missing > 0 && (
                      <span className="ml-2 text-red-600 font-semibold">
                        · {gapP0Missing} P0 manquant{gapP0Missing > 1 ? 's' : ''}
                      </span>
                    )}
                    {gapP1Missing > 0 && (
                      <span className="ml-2 text-accent-600 font-semibold">
                        · {gapP1Missing} P1 manquant{gapP1Missing > 1 ? 's' : ''}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className={`ri-upload-2-line text-base ${backfillUploading ? 'animate-spin' : ''}`}></i>
                    </span>
                    {backfillUploading ? 'Upload...' : 'Backfill CSV'}
                    <input type="file" accept=".csv" onChange={handleBackfillUpload} className="hidden" />
                  </label>
                  <button
                    onClick={exportGapCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-foreground-800 text-background-50 rounded-lg text-sm font-semibold hover:bg-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-download-2-line text-base"></i>
                    </span>
                    Export Gap
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {gapData.map(text => {
                  const isMissing = text.status === 'missing';
                  const isP0 = text.priority === 'P0';
                  const isP1 = text.priority === 'P1';
                  return (
                    <div
                      key={text.ref}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        isMissing ? 'bg-red-50 border-red-200' : 'bg-primary-50/50 border-primary-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {isMissing ? (
                              <i className="ri-close-circle-line text-red-600 text-lg"></i>
                            ) : (
                              <i className="ri-checkbox-circle-line text-primary-600 text-lg"></i>
                            )}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold font-body ${
                                isP0 ? 'bg-red-600 text-background-50' :
                                isP1 ? 'bg-accent-600 text-background-50' :
                                'bg-foreground-600 text-background-50'
                              }`}>
                                {text.priority}
                              </span>
                              <span className="font-mono text-sm font-medium text-foreground-900 whitespace-nowrap">{text.ref}</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700 font-body whitespace-nowrap">
                                {text.authority}
                              </span>
                            </div>
                            <div className="text-sm text-foreground-700 mt-1 font-body">{text.title}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 ml-8 sm:ml-0">
                          <div className="text-right">
                            <div className="text-sm font-bold text-red-600 font-heading whitespace-nowrap">{text.fine}</div>
                            <div className="text-xs text-foreground-500 font-body whitespace-nowrap">
                              {text.date_publication
                                ? new Date(text.date_publication).toLocaleDateString('fr-FR')
                                : isMissing ? 'À ingérer' : 'Date N/A'
                              }
                            </div>
                          </div>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isMissing ? 'bg-red-500' : 'bg-primary-500'
                          }`}></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 p-4 bg-secondary-50 border border-secondary-200/70 rounded-lg">
                <div className="text-sm text-foreground-700 font-body">
                  <strong className="text-foreground-900">Format CSV Backfill :</strong>
                  <code className="block mt-2 p-3 bg-background-50 rounded text-xs font-mono text-foreground-700 border border-background-200/70 overflow-x-auto">
                    Autorité|Référence|Titre|Date|URL|Contenu<br/>
                    BCEAO|Circ-007-2024|TP Digital|2024-09-20|https://...|Article 1er — Les entreprises...
                  </code>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer — Cron Status */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-4 text-sm text-foreground-600 font-body">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-medium text-foreground-800">Dernier ingest cron :</span>{' '}
              {metrics?.last_ingest && metrics.last_ingest !== 'N/A'
                ? new Date(metrics.last_ingest).toLocaleString('fr-FR')
                : 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground-800">Statut Cron :</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body ${
                metrics?.cron_status === 'active'
                  ? 'bg-primary-100 text-primary-700'
                  : metrics?.cron_status === 'failed'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-background-200 text-foreground-500'
              }`}>
                {metrics?.cron_status === 'active' && <i className="ri-checkbox-circle-line text-xs"></i>}
                {metrics?.cron_status === 'failed' && <i className="ri-alert-line text-xs"></i>}
                {metrics?.cron_status === 'unknown' && <i className="ri-question-line text-xs"></i>}
                {metrics?.cron_status === 'active' ? 'Actif' : metrics?.cron_status === 'failed' ? 'Échec' : 'Inconnu'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}