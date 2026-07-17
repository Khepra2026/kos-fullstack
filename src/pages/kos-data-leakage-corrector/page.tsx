import { useState, useMemo, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/base/Toast';

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type LeakSource = 'KHEPRA EXPERTS' | 'UNODC' | 'NIST' | 'KHEPRA INTERNAL';
type KillSwitchStep = 'idle' | 'scanning' | 'testing' | 'purging' | 'auditing' | 'done' | 'error';

interface LeakResult {
  id: string;
  title: string;
  source: LeakSource;
  severity: Severity;
  content_preview: string;
}

interface ExecutionLog {
  ts: string;
  level: 'info' | 'warn' | 'error' | 'success';
  msg: string;
}

const INTERNAL_SOURCES: LeakSource[] = ['KHEPRA EXPERTS', 'UNODC', 'NIST', 'KHEPRA INTERNAL'];
const SEVERITY_MAP: Record<LeakSource, Severity> = {
  'KHEPRA EXPERTS': 'CRITICAL',
  'UNODC': 'HIGH',
  'NIST': 'MEDIUM',
  'KHEPRA INTERNAL': 'CRITICAL'
};
const SOURCE_REGEX = /KHEPRA EXPERTS|UNODC|KHEPRA INTERNAL/i;

const STEP_ORDER: KillSwitchStep[] = ['idle', 'scanning', 'testing', 'purging', 'auditing', 'done', 'error'];

export default function LeakageKillSwitch() {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState<KillSwitchStep>('idle');
  const [leaks, setLeaks] = useState<LeakResult[]>([]);
  const [ragActive, setRagActive] = useState<boolean | null>(null);
  const [purgeCount, setPurgeCount] = useState(0);
  const [corpusCount, setCorpusCount] = useState(0);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [dryRun, setDryRun] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
    });
  }, []);

  const totalSeverity = useMemo((): Severity => {
    if (!leaks.length) return 'LOW';
    if (leaks.some(l => l.severity === 'CRITICAL')) return 'CRITICAL';
    if (leaks.some(l => l.severity === 'HIGH')) return 'HIGH';
    return 'MEDIUM';
  }, [leaks]);

  const log = (level: ExecutionLog['level'], msg: string) => {
    const entry: ExecutionLog = {
      ts: new Date().toLocaleTimeString('fr-FR'),
      level,
      msg
    };
    setLogs(prev => [...prev, entry]);
    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const resetState = () => {
    setLeaks([]);
    setRagActive(null);
    setPurgeCount(0);
    setCorpusCount(0);
    setLogs([]);
    setStep('idle');
  };

  const runKillSwitch = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetState();
    log('info', `Kill Switch lancé ${dryRun ? '[DRY RUN]' : '[LIVE MODE]'}`);

    try {
      // STEP 1: SCAN CORPUS
      setStep('scanning');
      log('info', 'Scan kos_regulatory_corpus...');
      const { data: corpus, error: corpusErr, count } = await supabase
        .from('kos_regulatory_corpus')
        .select('id, title, content, authority, reference', { count: 'exact' });

      if (corpusErr) throw new Error(`Corpus read failed: ${corpusErr.message}`);
      setCorpusCount(count || 0);

      if (!corpus?.length) {
        log('warn', 'Corpus vide. Upload des docs dans /kos-corpus-ingest');
        showToast('Corpus vide - Aucun document à scanner.', 'error');
        setStep('done');
        return;
      }

      const detectedLeaks: LeakResult[] = [];
      for (const doc of corpus) {
        const content = doc.content || '';
        const regexMatch = content.match(SOURCE_REGEX);
        const nistMatch = doc.authority === 'NIST' && doc.reference !== 'SP-800-53r5';
        if (regexMatch || nistMatch) {
          const source: LeakSource = nistMatch && !regexMatch ? 'NIST' : (regexMatch?.[0]?.toUpperCase() as LeakSource);
          detectedLeaks.push({
            id: doc.id,
            title: doc.title || 'Untitled',
            source,
            severity: SEVERITY_MAP[source],
            content_preview: content.slice(0, 180).replace(/\s+/g, ' ') + '...'
          });
        }
      }

      setLeaks(detectedLeaks);
      log(detectedLeaks.length ? 'warn' : 'success',
        `Scan terminé: ${detectedLeaks.length}/${count} documents leakés`);

      // STEP 2: TEST RAG FILTER
      setStep('testing');
      log('info', 'Test kos_local_rag_v4_secure...');
      const { data: ragTest, error: ragErr } = await supabase
        .rpc('kos_local_rag_v4_secure', {
          p_query: 'test KHEPRA EXPERTS internal confidential leak',
          p_limit: 3
        });

      if (ragErr) {
        log('error', `RAG filter RPC error: ${ragErr.message}`);
        setRagActive(false);
        throw new Error('RAG filter non déployé ou inaccessible');
      }

      const ragResults = JSON.stringify(ragTest?.results || []);
      const leaksPassThrough = SOURCE_REGEX.test(ragResults);
      setRagActive(!leaksPassThrough);
      log(leaksPassThrough ? 'error' : 'success',
        `RAG filter: ${leaksPassThrough ? 'INACTIF - fuites passent' : 'ACTIF - fuites bloquées'}`);

      if (leaksPassThrough && detectedLeaks.length) {
        log('error', 'STOP: RAG inactif avec fuites détectées. Deploy le filtre avant purge.');
        setStep('error');
        return;
      }

      // STEP 3: PURGE
      setStep('purging');
      let totalDeleted = 0;
      if (detectedLeaks.length) {
        if (dryRun) {
          log('info', '[DRY RUN] Simulation purge - aucun delete exécuté');
          totalDeleted = detectedLeaks.length;
        } else {
          log('warn', 'Purge des documents internes...');
          for (const src of INTERNAL_SOURCES) {
            let query = supabase
              .from('kos_regulatory_corpus')
              .delete({ count: 'exact' });

            if (src === 'NIST') {
              query = query.eq('authority', 'NIST').neq('reference', 'SP-800-53r5');
            } else {
              query = query.ilike('content', `%${src}%`);
            }

            const result = await query;

            if (result.error) {
              log('error', `Purge ${src} failed: ${result.error.message}`);
            } else if (result.count && result.count > 0) {
              totalDeleted += result.count;
              log('success', `Purged ${result.count} docs source ${src}`);
            }
          }
        }
        setPurgeCount(totalDeleted);
      } else {
        log('info', 'Aucune purge nécessaire - 0 fuite');
      }

      // STEP 4: AUDIT LOG via Edge Function
      setStep('auditing');
      const severity = totalSeverity;

      if (!dryRun) {
        const { error: auditErr } = await supabase.functions.invoke('kos-audit-insert', {
          body: {
            query: 'Kill Switch execution',
            leaked_sources: detectedLeaks.map(l => l.source),
            severity,
            user_id: userId || null,
            redacted_response: JSON.stringify({ purged_ids: detectedLeaks.map(l => l.id), total_deleted: totalDeleted, rag_active: ragActive })
          }
        });

        if (auditErr) {
          log('error', `Audit edge function failed: ${auditErr.message}`);
        } else {
          log('success', 'Audit log écrit via kos-audit-insert');
        }
      } else {
        log('info', '[DRY RUN] Audit non écrit');
      }

      // Re-count corpus after purge
      const { count: newCount } = await supabase
        .from('kos_regulatory_corpus')
        .select('id', { count: 'exact', head: true });
      if (newCount !== null) setCorpusCount(newCount);

      setStep('done');
      showToast(
        `${dryRun ? 'Dry Run terminé' : 'Kill Switch terminé'} - ${detectedLeaks.length} fuites | ${totalDeleted} purgées | RAG ${ragActive ? 'OK' : 'FAIL'}`,
        'success'
      );

    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erreur inconnue';
      log('error', `FATAL: ${message}`);
      showToast(`Erreur Kill Switch: ${message}`, 'error');
      setStep('error');
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      mode: dryRun ? 'DRY_RUN' : 'LIVE',
      corpus_total: corpusCount,
      leaks_found: leaks.length,
      total_severity: totalSeverity,
      rag_filter_active: ragActive,
      docs_purged: purgeCount,
      leak_details: leaks,
      execution_log: logs
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kos-killswitch-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStepColor = (s: KillSwitchStep) => {
    const currentIdx = STEP_ORDER.indexOf(step);
    const sIdx = STEP_ORDER.indexOf(s);
    if (step === s && isRunning) return 'text-accent-500';
    if (currentIdx > sIdx && currentIdx !== STEP_ORDER.indexOf('error')) return 'text-green-600';
    if (step === 'done' && s !== 'error') return 'text-green-600';
    return 'text-foreground-400';
  };

  return (
    <div className="min-h-screen bg-background-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center">
                <i className="ri-shield-flash-line text-accent-500" />
              </span>
              KOS Leakage Kill Switch
            </h1>
            <p className="text-foreground-600 mt-1">Scan → Test RAG → Purge → Audit en 1 clic</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground-700 cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                checked={dryRun}
                onChange={e => setDryRun(e.target.checked)}
                disabled={isRunning}
                className="rounded border-background-300 text-primary-500 focus:ring-primary-500"
              />
              Dry Run
            </label>
            {(step === 'done' || step === 'error') && (
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-download-line" />
                </span>
                Rapport
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="rounded-xl border border-background-200 bg-white p-4">
            <div className="text-sm text-foreground-600">Corpus total</div>
            <div className="text-2xl font-bold text-foreground-950">{corpusCount}</div>
            <div className="text-xs text-foreground-500">documents</div>
          </div>
          <div className="rounded-xl border border-background-200 bg-white p-4">
            <div className="text-sm text-foreground-600">Fuites</div>
            <div className="text-2xl font-bold text-foreground-950">{leaks.length}</div>
            <div className={`text-xs font-medium ${
              totalSeverity === 'CRITICAL' ? 'text-accent-500' :
              totalSeverity === 'HIGH' ? 'text-orange-500' : 'text-foreground-500'
            }`}>
              {totalSeverity}
            </div>
          </div>
          <div className="rounded-xl border border-background-200 bg-white p-4">
            <div className="text-sm text-foreground-600">RAG Filter</div>
            <div className="text-2xl font-bold">
              {ragActive === null ? '-' : ragActive ?
                <span className="text-green-600">ON</span> :
                <span className="text-accent-500">OFF</span>
              }
            </div>
            <div className="text-xs text-foreground-500">v4_secure</div>
          </div>
          <div className="rounded-xl border border-background-200 bg-white p-4">
            <div className="text-sm text-foreground-600">Purgés</div>
            <div className="text-2xl font-bold text-foreground-950">{purgeCount}</div>
            <div className="text-xs text-foreground-500">{dryRun ? 'simulés' : 'supprimés'}</div>
          </div>
        </div>

        {/* Pipeline Status */}
        <div className="mb-6 rounded-xl border border-background-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className={`flex items-center gap-2 ${getStepColor('scanning')}`}>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line" />
              </span>
              1. Scan
            </div>
            <div className="text-foreground-300">→</div>
            <div className={`flex items-center gap-2 ${getStepColor('testing')}`}>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-shield-check-line" />
              </span>
              2. Test RAG
            </div>
            <div className="text-foreground-300">→</div>
            <div className={`flex items-center gap-2 ${getStepColor('purging')}`}>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-delete-bin-line" />
              </span>
              3. Purge
            </div>
            <div className="text-foreground-300">→</div>
            <div className={`flex items-center gap-2 ${getStepColor('auditing')}`}>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-file-list-line" />
              </span>
              4. Audit
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={runKillSwitch}
            disabled={isRunning}
            className="w-full rounded-xl bg-accent-500 px-6 py-5 text-xl font-bold text-white hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all cursor-pointer whitespace-nowrap"
          >
            {isRunning ? (
              <>
                <span className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin" />
                </span>
                {step === 'scanning' && 'Scan du corpus...'}
                {step === 'testing' && 'Test RAG filter...'}
                {step === 'purging' && 'Purge en cours...'}
                {step === 'auditing' && 'Écriture audit...'}
              </>
            ) : (
              <>
                <span className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-fire-line" />
                </span>
                LANCER LE KILL SWITCH {dryRun && '[DRY RUN]'}
              </>
            )}
          </button>
        </div>

        {/* Leak Details */}
        {leaks.length > 0 && (
          <div className="mb-6 rounded-xl border border-accent-200 bg-accent-50 p-4">
            <h3 className="font-semibold text-accent-700 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-alert-line" />
              </span>
              {leaks.length} Fuite{leaks.length > 1 ? 's' : ''} Détectée{leaks.length > 1 ? 's' : ''}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {leaks.map(leak => (
                <div key={leak.id} className="text-sm bg-white rounded p-2 border border-accent-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold text-xs px-2 py-0.5 rounded ${
                      leak.severity === 'CRITICAL' ? 'bg-accent-500 text-white' :
                      leak.severity === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                      {leak.severity}
                    </span>
                    <span className="text-foreground-600 text-xs">{leak.source}</span>
                  </div>
                  <div className="font-medium text-foreground-900">{leak.title}</div>
                  <div className="text-foreground-600 text-xs mt-1">{leak.content_preview}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Execution Log */}
        <div className="rounded-xl border border-background-200 bg-white p-4">
          <h3 className="font-semibold text-foreground-900 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-terminal-box-line" />
            </span>
            Execution Log
          </h3>
          <div className="bg-background-950 text-foreground-100 p-4 rounded-lg font-mono text-xs h-72 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-foreground-500">En attente du lancement...</div>
            ) : (
              logs.map((line, i) => (
                <div key={i} className={`${
                  line.level === 'error' ? 'text-accent-400' :
                  line.level === 'warn' ? 'text-orange-400' :
                  line.level === 'success' ? 'text-green-400' : 'text-foreground-300'
                }`}>
                  <span className="text-foreground-500">[{line.ts}]</span> {line.msg}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}