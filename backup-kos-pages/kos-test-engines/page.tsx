import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type TestResult = {
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  data: unknown;
  error?: string;
  duration?: number;
};

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

async function directFetch(path: string, method: string, body?: unknown): Promise<{ ok: boolean; status: number; data: unknown }> {
  // Récupère le JWT de la session si dispo
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || anonKey;

  const res = await fetch(`${supabaseUrl}/functions/v1/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'apikey': anonKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

function ResultCard({ result }: { result: TestResult }) {
  const statusIcon = result.status === 'success' ? 'ri-check-line text-emerald-500' :
    result.status === 'failed' ? 'ri-close-line text-red-500' :
      result.status === 'running' ? 'ri-loader-4-line text-amber-500 animate-spin' : 'ri-more-line text-foreground-400';

  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <i className={`${statusIcon} text-xl`}></i>
          </div>
          <h3 className="text-sm font-semibold text-foreground-950 font-heading">{result.name}</h3>
        </div>
        {result.duration !== undefined && (
          <span className="text-xs text-foreground-400 font-body">{result.duration}ms</span>
        )}
      </div>
      {result.error && (
        <div className="mb-3 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 font-mono whitespace-pre-wrap">{result.error}</div>
      )}
      {result.data && (
        <details className="group">
          <summary className="text-xs text-foreground-500 cursor-pointer hover:text-foreground-700 select-none">
            Voir la réponse JSON
          </summary>
          <pre className="mt-2 p-3 rounded-md bg-background-100 border border-background-200/70 text-xs text-foreground-700 font-mono overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default function testEnginesPage() {
  const [results, setResults] = useState<Record<string, TestResult>>({
    backup: { name: '1. kos-backup-automation — POST /trigger', status: 'idle', data: null },
    memory: { name: '2. kos-strategic-memory — POST /store (seed 5 mémoires)', status: 'idle', data: null },
    migration: { name: '3. kos-mock-to-live-migration — POST /execute?dry_run=true', status: 'idle', data: null },
  });
  const [authStatus, setAuthStatus] = useState<string>('Vérification...');
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthStatus(session ? `Connecté (${session.user.email}) — JWT disponible` : 'Non connecté — mode anon key');
    });
  }, []);

  const updateResult = (key: string, updates: Partial<TestResult>) => {
    setResults(prev => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  };

  // ─── TEST 1: Backup Automation — POST /trigger ───
  const testBackup = async () => {
    updateResult('backup', { status: 'running' });
    const start = performance.now();
    try {
      const res = await directFetch('kos-backup-automation/trigger', 'POST', { trigger: true });
      const duration = Math.round(performance.now() - start);

      if (res.ok) {
        updateResult('backup', { status: 'success', data: res.data, duration });
      } else if (res.status === 401) {
        // Essaie sans auth (si LOGGER_API_KEY pas défini, tout passe)
        const fallbackRes = await fetch(`${supabaseUrl}/functions/v1/kos-backup-automation/trigger`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trigger: true }),
        });
        const fallbackData = await fallbackRes.json().catch(() => null);
        const fallbackDuration = Math.round(performance.now() - start);
        updateResult('backup', {
          status: fallbackRes.ok ? 'success' : 'failed',
          data: fallbackData,
          error: fallbackRes.ok ? undefined : `HTTP ${fallbackRes.status}: auth custom KOS_LOGGER_API_KEY probablement requise`,
          duration: fallbackDuration,
        });
      } else {
        updateResult('backup', { status: 'failed', data: res.data, error: `HTTP ${res.status}`, duration });
      }
    } catch (err) {
      updateResult('backup', { status: 'failed', error: String(err), duration: Math.round(performance.now() - start) });
    }
  };

  // ─── TEST 2: Strategic Memory — POST /store (seed x5) ───
  const testMemorySeed = async () => {
    updateResult('memory', { status: 'running' });
    const start = performance.now();

    const memories = [
      {
        title: 'Architecture Souveraine KHEPRA — Stack Technologique Propriétaire',
        content: 'KHEPRA OS est construit sur une architecture multi-agents souveraine avec 101+ edge functions, orchestrées par kos-orchestrator-engine. La stack inclut Supabase (PostgreSQL + Edge Functions), Qdrant (vector DB), n8n (workflow automation), et Docker microservices. Architecture ISO 27001 conforme avec chiffrement AES-256, JWT RBAC, et RLS sur toutes les tables. SLA cible : 99.95% uptime, RTO 4h, RPO 1h.',
        memory_type: 'architecture',
        importance_level: 'critical',
        tags: 'architecture,souveraineté,stack,ISO27001,Supabase,Qdrant,n8n',
      },
      {
        title: 'Positionnement Big Four — KHEPRA Experts comme Cabinet Panafricain de Référence',
        content: 'KHEPRA Experts se positionne comme le premier cabinet panafricain de conseil en conformité réglementaire, gouvernance et transformation digitale. Couverture UEMOA + CEMAC avec bureaux à Lomé (siège), Douala, Abidjan, Dakar. Expertise certifiée Big Four : audit réglementaire BCEAO/COBAC, due diligence, prix de transfert, ESG/IFRS-S, LCB/FT. Différenciation par la plateforme technologique KOS (Knowledge Operating System) qui automatise 80% des livrables.',
        memory_type: 'strategy',
        importance_level: 'critical',
        tags: 'positionnement,big-four,panafricain,UEMOA,CEMAC,conformité',
      },
      {
        title: 'KOS Knowledge Operating System — Capitalisation Intellectuelle Automatisée',
        content: 'Le KOS est un système d\'exploitation de connaissances qui transforme l\'expertise réglementaire en actifs numériques réutilisables. Composants clés : RAG Engine (recherche sémantique sur textes réglementaires), Knowledge Graph (graphe de connaissances inter-connectées), Strategic Memory (mémoire long-terme des décisions), Auto-Learning Engine (amélioration continue par feedback loop). Le KOS réduit le temps de production des livrables de 70% et assure une qualité constante de niveau Big Four.',
        memory_type: 'product',
        importance_level: 'critical',
        tags: 'KOS,knowledge,RAG,knowledge-graph,capitalisation,automatisation',
      },
      {
        title: 'Calendrier Réglementaire 2026 — Échéances Critiques UEMOA/CEMAC',
        content: 'Échéances réglementaires majeures 2026 : BCEAO — entrée en vigueur du nouveau ratio de solvabilité Bâle III adapté (T2 2026), Instruction sur la finance digitale (T3 2026). COBAC — Directive résilience opérationnelle (DORA africain, T3 2026), Règlementation fintech Gabon (T4 2026). GAFI — Évaluation mutuelle UEMOA (T4 2026). UEMOA — Révision circulaire 01-2017/CB gouvernance (en cours). CEMAC — Nouveau cadre LCB/FT (Q1 2027). Clients KHEPRA doivent anticiper ces échéances 6-9 mois à l\'avance.',
        memory_type: 'regulatory',
        importance_level: 'high',
        tags: 'calendrier,réglementaire,2026,BCEAO,COBAC,GAFI,UEMOA,CEMAC',
      },
      {
        title: 'Méthodologie Due Diligence — Framework KHEPRA DD-360',
        content: 'Le framework DD-360 de KHEPRA couvre 12 dimensions : (1) Gouvernance & Organisation, (2) Conformité Réglementaire, (3) Finance & Performance, (4) Risques & Contrôle Interne, (5) LCB/FT & Sanctions, (6) ESG & Durabilité, (7) IT & Cybersécurité, (8) RH & Talent, (9) Juridique & Fiscal, (10) Opérations & Processus, (11) Stratégie & Marché, (12) Data & Privacy. Chaque dimension est scorée sur 100 avec gap analysis automatisé. Livrables : rapport exécutif (20 pages), matrice de risques, plan de remédiation priorisé, dashboard interactif.',
        memory_type: 'methodology',
        importance_level: 'high',
        tags: 'due-diligence,méthodologie,DD-360,framework,12-dimensions',
      },
    ];

    try {
      const seedResults: { title: string; success: boolean; id?: number; error?: string }[] = [];
      for (const mem of memories) {
        const res = await directFetch('kos-strategic-memory/store', 'POST', mem);
        if (res.ok) {
          seedResults.push({ title: mem.title, success: true, id: (res.data as any)?.id });
        } else {
          seedResults.push({ title: mem.title, success: false, error: `HTTP ${res.status}: ${(res.data as any)?.error || 'Unknown'}` });
        }
      }

      const successCount = seedResults.filter(r => r.success).length;
      const duration = Math.round(performance.now() - start);
      updateResult('memory', {
        status: successCount === memories.length ? 'success' : successCount > 0 ? 'success' : 'failed',
        data: { total: memories.length, success: successCount, failed: memories.length - successCount, results: seedResults },
        error: successCount < memories.length ? `${memories.length - successCount}/${memories.length} échecs` : undefined,
        duration,
      });
    } catch (err) {
      updateResult('memory', { status: 'failed', error: String(err), duration: Math.round(performance.now() - start) });
    }
  };

  // ─── TEST 3: Mock-to-Live Migration — POST /execute?dry_run=true ───
  const testMigration = async () => {
    updateResult('migration', { status: 'running' });
    const start = performance.now();

    const testBatch = {
      batch_id: `test-dry-${Date.now().toString(36)}`,
      source: 'kos-test-engines',
      description: 'Dry-run test de migration mock→live sur strategic_memory + security_logs',
      items: [
        {
          table: 'strategic_memory',
          action: 'upsert' as const,
          data: [{
            id: 9999,
            title: '[TEST DRY-RUN] Mémoire de test migration',
            content: 'Ceci est une entrée de test pour valider la migration mock→live.',
            memory_type: 'test',
            importance_level: 'low',
            tags: 'test,dry-run,migration',
          }],
          conflict_columns: ['id'],
        },
        {
          table: 'security_logs',
          action: 'insert' as const,
          data: [{
            event_type: 'migration_dry_run_test',
            severity: 'info',
            source: 'kos-test-engines',
            details: { test: true, dry_run: true },
          }],
        },
      ],
    };

    try {
      const res = await directFetch('kos-mock-to-live-migration/execute?dry_run=true', 'POST', testBatch);
      const duration = Math.round(performance.now() - start);
      updateResult('migration', {
        status: res.ok ? 'success' : 'failed',
        data: res.data,
        error: res.ok ? undefined : `HTTP ${res.status}: ${(res.data as any)?.error || 'Unknown'}`,
        duration,
      });
    } catch (err) {
      updateResult('migration', { status: 'failed', error: String(err), duration: Math.round(performance.now() - start) });
    }
  };

  // ─── RUN ALL ───
  const runAll = async () => {
    setAllDone(false);
    await testBackup();
    await testMemorySeed();
    await testMigration();
    setAllDone(true);
  };

  const allIdle = Object.values(results).every(r => r.status === 'idle');
  const someRunning = Object.values(results).some(r => r.status === 'running');

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <section className="bg-background-100 border-b border-background-200/70">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 tracking-wide">
              KOS DIAGNOSTIC
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
              MOTEURS RECONSTRUITS
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background-200/70 text-foreground-600">
              {authStatus}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-2">
            Test des 3 Moteurs KOS
          </h1>
          <p className="text-sm text-foreground-600 font-body max-w-2xl">
            Déclenchement des endpoints edge functions via fetch direct avec JWT Supabase.
            Chaque fonction est appelée avec son chemin complet (/trigger, /store, /execute?dry_run=true).
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={runAll}
            disabled={someRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            <i className={`${someRunning ? 'ri-loader-4-line animate-spin' : 'ri-play-circle-line'} text-lg`}></i>
            {someRunning ? 'Exécution...' : 'Lancer les 3 tests'}
          </button>

          <button onClick={testBackup} disabled={someRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-100 border border-background-200/70 hover:border-background-300/60 text-sm text-foreground-700 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap">
            <i className="ri-database-2-line text-lg"></i> Backup seul
          </button>

          <button onClick={testMemorySeed} disabled={someRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-100 border border-background-200/70 hover:border-background-300/60 text-sm text-foreground-700 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap">
            <i className="ri-brain-line text-lg"></i> Memory seul
          </button>

          <button onClick={testMigration} disabled={someRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-100 border border-background-200/70 hover:border-background-300/60 text-sm text-foreground-700 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap">
            <i className="ri-arrow-left-right-line text-lg"></i> Migration seul
          </button>
        </div>

        {allDone && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <i className="ri-check-double-line text-emerald-600 text-lg"></i>
              <span className="text-sm font-semibold text-emerald-800">Les 3 tests sont terminés ! Vérifie les réponses JSON ci-dessous.</span>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <ResultCard result={results.backup} />
          <ResultCard result={results.memory} />
          <ResultCard result={results.migration} />
        </div>
      </section>
    </div>
  );
}





