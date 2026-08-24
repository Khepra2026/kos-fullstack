import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { useBigFourWebResourcesReview } from '@/hooks/useBigFourWebResourcesReview';
import type { AuditNonConformite, AuditRisque, AuditCorrection, AuditAutoapprentissage, AuditDomainSummary } from '@/mocks/bigFourWebResourcesAudit';

const DOMAINE_LABELS: Record<string, string> = {
  code_qualite: 'Qualité Code',
  seo_performance: 'SEO & Perf',
  conformite_reglementaire: 'Conformité',
  securite: 'Sécurité',
  contenu_reglementaire: 'Contenu',
  architecture: 'Architecture',
};

const SEVERITY_COLORS: Record<string, string> = {
  critique: 'bg-red-100 text-red-700 border-red-300',
  élevé: 'bg-amber-100 text-amber-700 border-amber-300',
  moyen: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  faible: 'bg-emerald-100 text-emerald-700 border-emerald-300',
};

const SEVERITY_BADGE: Record<string, string> = {
  critique: 'P0',
  élevé: 'P1',
  moyen: 'P2',
  faible: 'P3',
};

const TABS = [
  { key: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { key: 'diagnostic', label: 'Diagnostic', icon: 'ri-stethoscope-line' },
  { key: 'nc', label: 'Non-Conformités', icon: 'ri-error-warning-line' },
  { key: 'risques', label: 'Risques', icon: 'ri-alert-line' },
  { key: 'corrections', label: 'Corrections', icon: 'ri-check-double-line' },
  { key: 'apprentissage', label: 'Autoapprentissage', icon: 'ri-brain-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

// ─── COMPONENTS ──────────────────────────────────────────────────────

function CockpitTab({ audit, domainSummaries, p0Count, p1Count, ouvertes, corrigees, autoCorrigeables, risquesCritiques, rulesCount, totalRecurrence }: {
  audit: ReturnType<typeof useBigFourWebResourcesReview>['audit'];
  domainSummaries: AuditDomainSummary[];
  p0Count: number; p1Count: number; ouvertes: number; corrigees: number; autoCorrigeables: number;
  risquesCritiques: number; rulesCount: number; totalRecurrence: number;
}) {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
          <div className="text-3xl font-bold text-foreground-950 font-heading">{audit.score_global_conformite}<span className="text-lg text-foreground-400">/100</span></div>
          <div className="text-xs text-foreground-500 mt-1 font-body">Score Conformité Global</div>
          <div className="mt-3 h-2 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${audit.score_global_conformite}%` }}></div></div>
          <div className="text-[10px] text-foreground-400 mt-1 font-body">Cible : {audit.score_cible}/100</div>
        </div>
        <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
          <div className="flex items-center gap-2 mb-1"><span className="text-2xl font-bold text-red-600 font-heading">{p0Count}</span><span className="text-xs text-red-500 font-body">P0</span></div>
          <div className="flex items-center gap-2"><span className="text-2xl font-bold text-amber-600 font-heading">{p1Count}</span><span className="text-xs text-amber-500 font-body">P1</span></div>
          <div className="text-xs text-foreground-500 mt-2 font-body">Critiques en attente</div>
        </div>
        <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
          <div className="text-3xl font-bold text-emerald-600 font-heading">{corrigees}</div>
          <div className="text-xs text-foreground-500 mt-1 font-body">Corrections appliquées</div>
          <div className="text-[10px] text-foreground-400 mt-2 font-body">{autoCorrigeables} auto-corrigeables restantes</div>
        </div>
        <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
          <div className="text-3xl font-bold text-accent-600 font-heading">{risquesCritiques}</div>
          <div className="text-xs text-foreground-500 mt-1 font-body">Risques criticité ≥20</div>
          <div className="text-[10px] text-foreground-400 mt-2 font-body">{rulesCount} règles apprises · {totalRecurrence} récurrences</div>
        </div>
      </div>

      {/* Ressources Scannées */}
      <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Ressources Scannées — {audit.ressources_totales_scannees} au total</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[{ label: 'Pages', value: audit.pages, icon: 'ri-file-text-line' }, { label: 'Composants', value: audit.composants, icon: 'ri-puzzle-line' }, { label: 'Hooks', value: audit.hooks, icon: 'ri-git-branch-line' }, { label: 'Edge Functions', value: audit.edge_functions, icon: 'ri-cloud-line' }, { label: 'Mocks', value: audit.mocks, icon: 'ri-database-2-line' }, { label: 'Config', value: audit.fichiers_config, icon: 'ri-settings-3-line' }].map(r => (
            <div key={r.label} className="text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-background-50 text-foreground-500 mb-1.5"><i className={`${r.icon} text-lg`}></i></div>
              <div className="text-xl font-bold text-foreground-950 font-heading">{r.value}</div>
              <div className="text-[10px] text-foreground-500 font-body">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Scores */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Score par Domaine</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domainSummaries.map(d => (
            <div key={d.domaine} className="bg-background-100 rounded-xl p-4 border border-background-200/70">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className={`${d.icon} text-sm`}></i></div>
                <span className="text-sm font-semibold text-foreground-950 font-heading">{d.label}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-body ${d.statut === 'bon' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{d.statut}</span>
              </div>
              <div className="text-2xl font-bold text-foreground-950 font-heading">{d.score_conformite}<span className="text-sm text-foreground-400">/100</span></div>
              <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${d.score_conformite >= 85 ? 'bg-emerald-500' : d.score_conformite >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score_conformite}%` }}></div></div>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-500 font-body">
                <span className="text-red-600">{d.critiques} critiques</span>
                <span className="text-amber-600">{d.elevees} élevées</span>
                <span className="text-emerald-600">{d.corrigees} corrigées</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations prioritaires */}
      <div className="bg-red-50 rounded-xl p-5 border border-red-200">
        <h3 className="text-sm font-semibold text-red-800 mb-3 font-heading flex items-center gap-2"><i className="ri-error-warning-line"></i>Actions Prioritaires</h3>
        <div className="space-y-2">
          {audit.recommandations_prioritaires.slice(0, 8).map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5 ${rec.startsWith('P0') ? 'bg-red-200 text-red-800' : rec.startsWith('P1') ? 'bg-amber-200 text-amber-800' : 'bg-yellow-200 text-yellow-800'}`}>{rec.slice(0, 2)}</span>
              <span className="text-red-700 font-body">{rec.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiagnosticTab({ audit, domainSummaries }: { audit: ReturnType<typeof useBigFourWebResourcesReview>['audit']; domainSummaries: AuditDomainSummary[] }) {
  return (
    <div className="space-y-8">
      {/* Niveau de conformité */}
      <div className="bg-background-100 rounded-xl p-6 border border-background-200/70">
        <h3 className="text-base font-bold text-foreground-950 mb-4 font-heading">1. Diagnostic Rapide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl font-bold text-amber-600 font-heading">{audit.score_global_conformite}</span>
              <div>
                <div className="text-sm font-semibold text-foreground-950 font-heading">Score de Conformité</div>
                <div className="text-xs text-foreground-500 font-body">Cible : 95/100 · Écart : {audit.score_cible - audit.score_global_conformite} pts</div>
              </div>
            </div>
            <div className="h-3 bg-background-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full" style={{ width: `${audit.score_global_conformite}%` }}></div></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-foreground-600 font-body">Critiques (P0) :</span><span className="font-bold text-red-600 font-heading">{audit.critiques}</span></div>
            <div className="flex justify-between text-sm"><span className="text-foreground-600 font-body">Élevées (P1) :</span><span className="font-bold text-amber-600 font-heading">{audit.elevees}</span></div>
            <div className="flex justify-between text-sm"><span className="text-foreground-600 font-body">Moyennes (P2) :</span><span className="font-bold text-yellow-600 font-heading">{audit.moyennes}</span></div>
            <div className="flex justify-between text-sm"><span className="text-foreground-600 font-body">Corrigées :</span><span className="font-bold text-emerald-600 font-heading">{audit.corrigees}</span></div>
          </div>
        </div>
      </div>

      {/* Principaux écarts */}
      <div className="bg-background-100 rounded-xl p-6 border border-background-200/70">
        <h3 className="text-base font-bold text-foreground-950 mb-4 font-heading">2. Principaux Écarts</h3>
        <div className="space-y-3">
          {[
            { domaine: 'Conformité Réglementaire', ecart: 'Politique confidentialité 128j sans màj · Cookies 3/4 catégories · Formulaire sans consentement RGPD', score: 76 },
            { domaine: 'Qualité du Code', ecart: 'TypeScript strict off · 28 console.log production · ~280 Ko code mort · 0% tests', score: 78 },
            { domaine: 'Architecture', ecart: 'Build 14.8s · Knowledge Graph CEMAC 127 vs 1587 UEMOA · 8 dépendances outdated', score: 80 },
            { domaine: 'SEO & Performance', ecart: '18 pages CWV poor · Poids pages 2.4 Mo · 34 pages orphelines · 28 meta descriptions manquantes', score: 82 },
            { domaine: 'Contenu Réglementaire', ecart: '47 "conforme à" · 56 ratios sans référence · 61 références floues · 23 "agréé" abusifs', score: 84 },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-background-50 rounded-lg">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.score >= 85 ? 'bg-emerald-500' : item.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5"><span className="text-sm font-semibold text-foreground-950 font-heading">{item.domaine}</span><span className="text-xs text-foreground-400 font-body">Score {item.score}/100</span></div>
                <div className="text-xs text-foreground-500 font-body leading-relaxed">{item.ecart}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain scores detail */}
      <div>
        <h3 className="text-base font-bold text-foreground-950 mb-4 font-heading">3. Synthèse par Domaine</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70">
                <th className="text-left py-2 px-3 text-foreground-500 font-body text-xs">Domaine</th>
                <th className="text-center py-2 px-3 text-foreground-500 font-body text-xs">Ressources</th>
                <th className="text-center py-2 px-3 text-foreground-500 font-body text-xs">Critiques</th>
                <th className="text-center py-2 px-3 text-foreground-500 font-body text-xs">Élevées</th>
                <th className="text-center py-2 px-3 text-foreground-500 font-body text-xs">Score</th>
                <th className="text-center py-2 px-3 text-foreground-500 font-body text-xs">Statut</th>
              </tr>
            </thead>
            <tbody>
              {domainSummaries.map(d => (
                <tr key={d.domaine} className="border-b border-background-100">
                  <td className="py-2.5 px-3"><div className="flex items-center gap-2"><i className={`${d.icon} text-foreground-500`}></i><span className="font-medium text-foreground-950 font-heading">{d.label}</span></div></td>
                  <td className="text-center py-2.5 px-3 text-foreground-700 font-body">{d.ressources_scannees}</td>
                  <td className="text-center py-2.5 px-3 text-red-600 font-body font-bold">{d.critiques}</td>
                  <td className="text-center py-2.5 px-3 text-amber-600 font-body">{d.elevees}</td>
                  <td className="text-center py-2.5 px-3 font-bold font-heading">{d.score_conformite}</td>
                  <td className="text-center py-2.5 px-3"><span className={`text-xs px-2 py-0.5 rounded-full font-body ${d.statut === 'bon' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{d.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NCTab({ nonConformites }: { nonConformites: AuditNonConformite[] }) {
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filtered = nonConformites.filter(nc => {
    if (domainFilter !== 'all' && nc.domaine !== domainFilter) return false;
    if (severityFilter !== 'all' && nc.severite !== severityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'critique', 'élevé', 'moyen', 'faible'].map(s => (
            <button key={s} onClick={() => setSeverityFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${severityFilter === s ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`} type="button">
              {s === 'all' ? 'Toutes' : SEVERITY_BADGE[s] || s}
            </button>
          ))}
        </div>
        <div className="w-px h-6 bg-background-200/70 hidden sm:block"></div>
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'code_qualite', 'seo_performance', 'conformite_reglementaire', 'securite', 'contenu_reglementaire', 'architecture'].map(d => (
            <button key={d} onClick={() => setDomainFilter(d)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${domainFilter === d ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`} type="button">
              {d === 'all' ? 'Tous' : DOMAINE_LABELS[d] || d}
            </button>
          ))}
        </div>
        <span className="text-xs text-foreground-400 ml-auto font-body">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
      </div>

      {/* NC List */}
      <div className="space-y-3">
        {filtered.map(nc => (
          <div key={nc.id} className={`bg-background-100 rounded-xl p-4 border ${nc.severite === 'critique' ? 'border-red-200' : 'border-background-200/70'}`}>
            <div className="flex items-start gap-3">
              <span className={`text-[10px] font-bold px-2 py-1 rounded shrink-0 mt-0.5 border ${SEVERITY_COLORS[nc.severite] || 'bg-background-200 text-foreground-600'}`}>{SEVERITY_BADGE[nc.severite] || nc.severite}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-foreground-950 font-heading">{nc.titre}</span>
                  {nc.statut === 'corrige' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-body">CORRIGÉ</span>}
                </div>
                <p className="text-xs text-foreground-500 mb-2 font-body leading-relaxed">{nc.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400 font-body">
                  <span className="flex items-center gap-1"><i className="ri-folder-line"></i>{DOMAINE_LABELS[nc.domaine] || nc.domaine}</span>
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{nc.localisation}</span>
                  {nc.auto_corrigeable && <span className="flex items-center gap-1 text-emerald-600"><i className="ri-magic-line"></i>Auto-corrigeable</span>}
                  {nc.pattern_id && <span className="flex items-center gap-1 text-accent-600"><i className="ri-brain-line"></i>{nc.pattern_id}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RisquesTab({ risques }: { risques: AuditRisque[] }) {
  const critColor = (c: number) => c >= 20 ? 'bg-red-100 text-red-700 border-red-200' : c >= 15 ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200';

  return (
    <div className="space-y-6">
      {/* Criticité Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-center">
          <div className="text-2xl font-bold text-red-700 font-heading">{risques.filter(r => r.criticite >= 20).length}</div>
          <div className="text-xs text-red-600 font-body">Criticité ≥ 20</div>
          <div className="text-[10px] text-red-500 mt-1 font-body">Action immédiate requise</div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-center">
          <div className="text-2xl font-bold text-amber-700 font-heading">{risques.filter(r => r.criticite >= 15 && r.criticite < 20).length}</div>
          <div className="text-xs text-amber-600 font-body">Criticité 15-19</div>
          <div className="text-[10px] text-amber-500 mt-1 font-body">Surveillance renforcée</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-700 font-heading">{risques.filter(r => r.criticite < 15).length}</div>
          <div className="text-xs text-yellow-600 font-body">Criticité &lt; 15</div>
          <div className="text-[10px] text-yellow-500 mt-1 font-body">Surveillance standard</div>
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-3">
        {risques.sort((a, b) => b.criticite - a.criticite).map(r => (
          <div key={r.id} className={`bg-background-100 rounded-xl p-4 border ${r.criticite >= 20 ? 'border-red-200' : 'border-background-200/70'}`}>
            <div className="flex items-start gap-3">
              <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 border ${critColor(r.criticite)}`}>{r.criticite}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded font-body ${r.type === 'reglementaire' ? 'bg-red-100 text-red-700' : r.type === 'operationnel' ? 'bg-amber-100 text-amber-700' : r.type === 'reputationnel' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{r.type}</span>
                  <span className="text-sm font-semibold text-foreground-950 font-heading">{r.description.slice(0, 60)}...</span>
                </div>
                <p className="text-xs text-foreground-500 mb-2 font-body leading-relaxed">{r.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  <span>Probabilité : <strong>{r.probabilite}</strong></span>
                  <span>Impact : <strong>{r.impact}</strong></span>
                </div>
                <div className="mt-2 text-xs text-accent-600 font-body"><i className="ri-shield-check-line mr-1"></i>{r.mitigation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CorrectionsTab({ corrections }: { corrections: AuditCorrection[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
          <div className="text-2xl font-bold text-emerald-700 font-heading">{corrections.length}</div>
          <div className="text-xs text-emerald-600 font-body">Corrections appliquées</div>
        </div>
        <div className="bg-accent-50 rounded-xl p-4 border border-accent-200 text-center">
          <div className="text-2xl font-bold text-accent-700 font-heading">{Math.round(corrections.reduce((sum, c) => sum + (c.score_apres - c.score_avant), 0) / corrections.length)}</div>
          <div className="text-xs text-accent-600 font-body">Gain moyen (pts)</div>
        </div>
        <div className="bg-primary-50 rounded-xl p-4 border border-primary-200 text-center">
          <div className="text-2xl font-bold text-primary-700 font-heading">{Math.round(corrections.reduce((sum, c) => sum + c.score_apres, 0) / corrections.length)}</div>
          <div className="text-xs text-primary-600 font-body">Score moyen après</div>
        </div>
      </div>

      <div className="space-y-3">
        {corrections.map(c => (
          <div key={c.id} className="bg-background-100 rounded-xl p-4 border border-background-200/70">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700 shrink-0 font-body">{c.score_avant} → {c.score_apres}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground-950 mb-1 font-heading">{c.justification}</div>
                <div className="text-xs text-foreground-500 font-body">{c.agent_responsable} · {new Date(c.date_application).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-red-50 rounded-lg p-3 border border-red-100"><span className="text-red-600 font-semibold font-body">AVANT :</span> <span className="text-red-700 font-body">{c.avant}</span></div>
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100"><span className="text-emerald-600 font-semibold font-body">APRÈS :</span> <span className="text-emerald-700 font-body">{c.apres}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprentissageTab({ autoapprentissages }: { autoapprentissages: AuditAutoapprentissage[] }) {
  const typeColor = (t: string) => t === 'reglementaire' ? 'bg-red-100 text-red-700' : t === 'structurel' ? 'bg-amber-100 text-amber-700' : t === 'terminologique' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background-100 rounded-xl p-4 border border-background-200/70 text-center">
          <div className="text-2xl font-bold text-accent-700 font-heading">{autoapprentissages.length}</div>
          <div className="text-xs text-foreground-500 font-body">Règles auto-générées</div>
        </div>
        <div className="bg-background-100 rounded-xl p-4 border border-background-200/70 text-center">
          <div className="text-2xl font-bold text-primary-700 font-heading">{autoapprentissages.reduce((s, a) => s + a.recurrence, 0)}</div>
          <div className="text-xs text-foreground-500 font-body">Occurrences corrigées</div>
        </div>
        <div className="bg-background-100 rounded-xl p-4 border border-background-200/70 text-center">
          <div className="text-2xl font-bold text-emerald-700 font-heading">{autoapprentissages.filter(a => a.type_erreur === 'reglementaire').length}</div>
          <div className="text-xs text-foreground-500 font-body">Règles réglementaires</div>
        </div>
        <div className="bg-background-100 rounded-xl p-4 border border-background-200/70 text-center">
          <div className="text-2xl font-bold text-amber-700 font-heading">{autoapprentissages.filter(a => a.type_erreur === 'structurel').length}</div>
          <div className="text-xs text-foreground-500 font-body">Règles structurelles</div>
        </div>
      </div>

      <div className="space-y-4">
        {autoapprentissages.map(a => (
          <div key={a.id} className="bg-background-100 rounded-xl p-5 border border-background-200/70">
            <div className="flex items-start gap-3 mb-3">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded shrink-0 font-body ${typeColor(a.type_erreur)}`}>{a.type_erreur}</span>
              <div>
                <div className="text-sm font-semibold text-foreground-950 font-heading">{a.pattern_decouvert}</div>
                <div className="text-[10px] text-foreground-400 mt-0.5 font-body">Pattern {a.pattern_id} · {a.recurrence} occurrences · Appris le {new Date(a.date_apprentissage).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
            <div className="bg-accent-50 rounded-lg p-4 border border-accent-100">
              <div className="flex items-center gap-2 mb-2"><i className="ri-lightbulb-line text-accent-600"></i><span className="text-xs font-semibold text-accent-700 font-heading">RÈGLE AUTO-GÉNÉRÉE</span></div>
              <p className="text-sm text-accent-800 font-body leading-relaxed">{a.regle_generee}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────

export default function bigFourWebResourcesReviewPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('cockpit');
  const {
    audit, domainSummaries, nonConformites, risques, corrections, autoapprentissages,
    p0Count, p1Count, ouvertes, corrigees, autoCorrigeables, risquesCritiques, rulesCount, totalRecurrence,
    loading, error, refresh,
  } = useBigFourWebResourcesReview();

  if (loading) {
    return (
      <>
        <SeoHead title="KOS Big Four Web Resources Review — KHEPRA EXPERTS" description="Revue totale des ressources web — Audit Big Four, conformité, correction et autoapprentissage" canonicalPath="/kos-big-four-web-resources-review" noIndex={true} />
        <hubLayout hubId={65} activeTab="Big Four Review" tabLabel="Big Four Web Review">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-foreground-500 font-body">Scan des ressources web en cours... 779 ressources analysées</p>
            </div>
          </div>
        </hubLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SeoHead title="KOS Big Four Web Resources Review — KHEPRA EXPERTS" description="Revue totale des ressources web" canonicalPath="/kos-big-four-web-resources-review" noIndex={true} />
        <hubLayout hubId={65} activeTab="Big Four Review" tabLabel="Big Four Web Review">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600"><i className="ri-error-warning-line text-2xl"></i></div>
              <p className="text-sm text-foreground-700 font-body">{error}</p>
              <button type="button" onClick={refresh} className="px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button>
            </div>
          </div>
        </hubLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead title="KOS Big Four Web Resources Review — KHEPRA EXPERTS" description="Revue totale des ressources web selon la méthodologie Big Four (PwC/Deloitte/EY/KPMG). 779 ressources scannées, 92 non-conformités, 16 risques, 6 corrections appliquées, 8 règles auto-générées." canonicalPath="/kos-big-four-web-resources-review" noIndex={true} />
      <hubLayout hubId={65} activeTab="Big Four Review" tabLabel="Big Four Web Review">
        <div className="bg-background-50 min-h-screen">
          {/* Hero */}
          <section className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0"><i className="ri-search-eye-line text-2xl"></i></div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">BIG FOUR MODE</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 font-body tracking-wide">PwC · Deloitte · EY · KPMG</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">AUTOAPPRENTISSAGE</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 font-body tracking-wide">ISO 27001 · 37301 · 42001</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">KOS Big Four Web Resources Review</h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl font-body">
                      Revue totale des ressources web selon la méthodologie Big Four. Fonctionnement : Scan → Audit → Diagnostic → Correction → Autoapprentissage.
                      779 ressources scannées, 6 domaines audités, 12 recommandations prioritaires. Aligné ISO 27001, ISO 37301, ISO 42001, BCEAO, COBAC, GAFI, OHADA.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center"><span className="text-2xl font-bold text-red-600 font-heading">{p0Count}</span><span className="text-[10px] font-medium text-foreground-500 font-body block">P0 Critiques</span></div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center"><span className="text-2xl font-bold text-amber-600 font-heading">{ouvertes}</span><span className="text-[10px] font-medium text-foreground-500 font-body block">Ouvertes</span></div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center"><span className="text-2xl font-bold text-emerald-600 font-heading">{corrigees}</span><span className="text-[10px] font-medium text-foreground-500 font-body block">Corrigées</span></div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center"><span className="text-2xl font-bold text-accent-600 font-heading">{audit.score_global_conformite}/100</span><span className="text-[10px] font-medium text-foreground-500 font-body block">Score Global</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* Alert Banner */}
          {p0Count > 0 && (
            <div className="bg-red-50 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center gap-2 text-sm"><i className="ri-error-warning-line text-red-600 animate-pulse"></i><span className="font-semibold text-red-700 font-body">{p0Count} non-conformités critiques en attente de correction immédiate</span></div>
              </div>
            </div>
          )}

          {/* Status Bar */}
          <div className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-foreground-500 font-body">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>Audit : {audit.audit_id}</span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5"><i className="ri-calendar-check-line text-accent-500"></i>Complété : {new Date(audit.date_completion).toLocaleString('fr-FR')}</span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5"><i className="ri-timer-line text-accent-500"></i>Prochain : {new Date(audit.prochain_audit).toLocaleDateString('fr-FR')}</span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5"><i className="ri-brain-line text-primary-500"></i>{rulesCount} règles auto-générées</span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5"><i className="ri-shield-check-line text-emerald-500"></i>{autoCorrigeables} auto-corrigeables</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
                {TABS.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab.key ? 'bg-accent-500 text-background-50' : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'}`} type="button">
                    <i className={`${tab.icon} text-sm`}></i>{tab.label}
                  </button>
                ))}
                <Link to="/kos-blog-regulatory-correction-engine" className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground-500 hover:text-foreground-900 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-scales-3-line text-sm"></i>Correction Blog<i className="ri-arrow-right-up-line text-xs"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {activeTab === 'cockpit' && <CockpitTab audit={audit} domainSummaries={domainSummaries} p0Count={p0Count} p1Count={p1Count} ouvertes={ouvertes} corrigees={corrigees} autoCorrigeables={autoCorrigeables} risquesCritiques={risquesCritiques} rulesCount={rulesCount} totalRecurrence={totalRecurrence} />}
            {activeTab === 'diagnostic' && <DiagnosticTab audit={audit} domainSummaries={domainSummaries} />}
            {activeTab === 'nc' && <NCTab nonConformites={nonConformites} />}
            {activeTab === 'risques' && <RisquesTab risques={risques} />}
            {activeTab === 'corrections' && <CorrectionsTab corrections={corrections} />}
            {activeTab === 'apprentissage' && <ApprentissageTab autoapprentissages={autoapprentissages} />}
          </div>

          {/* Footer */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Score cible : ≥ 95/100</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>Standards : ISO 27001 · 37301 · 42001 · BCEAO · COBAC · GAFI</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  <span>KOS Big Four Mode — Scan → Audit → Diagnostiquer → Corriger → Apprendre</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </hubLayout>
    </>
  );
}



