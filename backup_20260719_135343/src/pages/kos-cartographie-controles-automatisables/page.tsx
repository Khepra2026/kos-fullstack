import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useCartographieControles } from '@/hooks/useCartographieControles';
import type { ControleCartographie } from '@/mocks/cartographieControlesAutomatisables';
import { COULEUR_REFERENTIEL, COULEUR_PRIORITE } from '@/mocks/cartographieControlesAutomatisables';

function CircularGauge({ value, size = 40, color = 'primary' }: { value: number; size?: number; color?: string }) {
  const radius = (size - 4) / 2;
  const circ = radius * 2 * Math.PI;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  const sc = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : color === 'emerald' ? 'stroke-emerald-500' : color === 'amber' ? 'stroke-amber-500' : 'stroke-primary-500';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={4} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={4} strokeLinecap="round" className={`${sc} transition-all duration-700`} style={{ strokeDasharray: circ, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-[9px] font-bold text-foreground-700">{value}</span>
    </div>
  );
}

function PillBadge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200', 'P0 - Critique': 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200', 'P1 - Haute': 'bg-amber-100 text-amber-700 border-amber-200',
    'P2 - Moyenne': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    COBAC: 'bg-primary-100 text-primary-700 border-primary-200',
    BCEAO: 'bg-accent-100 text-accent-700 border-accent-200',
    OHADA: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    GIABA: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    GABAC: 'bg-amber-100 text-amber-700 border-amber-200',
    Planifié: 'bg-background-200 text-foreground-500 border-background-200',
  };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${m[variant] || 'bg-background-200 text-foreground-600 border-background-200'}`}>{label}</span>;
}

export default function CartographieControlesPage() {
  const {
    controles, filteredControles, meta, loading, error, isLive, refetch,
    referentielFilter, setReferentielFilter, prioriteFilter, setPrioriteFilter,
    domaineFilter, setDomaineFilter, searchQuery, setSearchQuery, sortBy, setSortBy,
    uniqueReferentiels, uniquePriorites, uniqueDomaines,
  } = useCartographieControles();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const computedMeta = controles.length > 0 ? {
    totalControles: controles.length,
    totalP0: controles.filter(c => c.priorite.startsWith('P0')).length,
    totalP1: controles.filter(c => c.priorite.startsWith('P1')).length,
    totalP2: controles.filter(c => c.priorite.startsWith('P2')).length,
    effortTotalJH: controles.reduce((s, c) => s + c.effort_jh, 0),
    budgetTotalEUR: controles.reduce((s, c) => s + c.cout_estime_eur, 0),
    gainEfficienceMoyen: Math.round(controles.reduce((s, c) => s + c.gain_efficience_pct, 0) / controles.length),
    reductionRisqueMoyen: Math.round(controles.reduce((s, c) => s + c.reduction_risque_pct, 0) / controles.length),
    referentiels: Array.from(new Set(controles.map(c => c.referentiel))).length,
    domaines: Array.from(new Set(controles.map(c => `${c.referentiel}-${c.code_domaine}`))).length,
  } : meta;

  if (loading) {
    return (
      <hubLayout hubId={128} activeTab="dashboard" tabLabel="Cartographie">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20 gap-3 text-foreground-500">
            <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            <span className="text-sm">Chargement des 102 contrôles automatisables...</span>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && controles.length === 0) {
    return (
      <hubLayout hubId={128} activeTab="dashboard" tabLabel="Cartographie">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl" /></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5" />Réessayer</button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={128} activeTab="dashboard" tabLabel="Cartographie">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">KOS Enterprise</span>
            {isLive && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE DB</span>}
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium">{computedMeta.referentiels} Référentiels</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">{computedMeta.domaines} Domaines</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">Cartographie des Contrôles Automatisables</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            <strong>{computedMeta.totalControles} contrôles</strong> cartographiés sur <strong>{computedMeta.referentiels} référentiels</strong> réglementaires — COBAC, BCEAO/CB-UMOA, OHADA, GIABA, GABAC. Chaque contrôle est évalué sur sa complexité, son ROI, son budget et sa priorité stratégique. <strong>{computedMeta.totalP0} contrôles P0 critiques</strong> prêts pour automatisation immédiate.
          </p>
        </div>

        {/* GLOBAL STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-foreground-950">{computedMeta.totalControles}</span>
            <p className="text-[10px] text-foreground-500">Contrôles</p>
          </div>
          <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-red-600">{computedMeta.totalP0}</span>
            <p className="text-[10px] text-foreground-500">P0 Critique</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-amber-600">{computedMeta.totalP1}</span>
            <p className="text-[10px] text-foreground-500">P1 Haute</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-foreground-950">{computedMeta.totalP2}</span>
            <p className="text-[10px] text-foreground-500">P2 Moyenne</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-foreground-950">{computedMeta.effortTotalJH.toLocaleString()} JH</span>
            <p className="text-[10px] text-foreground-500">Effort Total</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-primary-700">{(computedMeta.budgetTotalEUR / 1000).toFixed(0)}K €</span>
            <p className="text-[10px] text-foreground-500">Budget Total</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-emerald-600">{computedMeta.gainEfficienceMoyen}%</span>
            <p className="text-[10px] text-foreground-500">Gain Moyen</p>
          </div>
          <div className="bg-accent-50 border border-accent-200/40 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-accent-600">{computedMeta.reductionRisqueMoyen}%</span>
            <p className="text-[10px] text-foreground-500">Réd. Risque</p>
          </div>
        </div>

        {/* REFERENTIEL BREAKDOWN */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {(['COBAC', 'BCEAO', 'OHADA', 'GIABA', 'GABAC'] as const).map(ref => {
            const count = controles.filter(c => c.referentiel === ref).length;
            const p0 = controles.filter(c => c.referentiel === ref && c.priorite.startsWith('P0')).length;
            const c = COULEUR_REFERENTIEL[ref] || 'primary';
            return (
              <button key={ref} onClick={() => setReferentielFilter(referentielFilter === ref ? 'Tous' : ref)} className={`rounded-lg p-4 text-left transition-all cursor-pointer border ${referentielFilter === ref ? `bg-${c}-50 border-${c}-300 shadow-sm` : 'bg-background-50 border-background-200/60 hover:border-background-300'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-foreground-950">{ref}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full bg-${c}-100 text-${c}-700`}>{count}</span>
                </div>
                <p className="text-[10px] text-foreground-500">{p0} P0 · {count - p0} P1/P2</p>
              </button>
            );
          })}
        </div>

        {/* FILTERS BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {uniqueReferentiels.filter(r => r !== 'Tous').map(r => (
              <button key={r} onClick={() => setReferentielFilter(referentielFilter === r ? 'Tous' : r)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer border transition-colors ${referentielFilter === r ? `bg-${COULEUR_REFERENTIEL[r]}-500 text-background-50 border-${COULEUR_REFERENTIEL[r]}-500` : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                {r} ({controles.filter(c => c.referentiel === r).length})
              </button>
            ))}
            <span className="w-px h-5 bg-background-200 hidden sm:block" />
            {['P0 - Critique', 'P1 - Haute', 'P2 - Moyenne'].map(p => (
              <button key={p} onClick={() => setPrioriteFilter(prioriteFilter === p ? 'Toutes' : p)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer border transition-colors ${prioriteFilter === p ? (p.startsWith('P0') ? 'bg-red-500 text-background-50 border-red-500' : p.startsWith('P1') ? 'bg-amber-500 text-background-50 border-amber-500' : 'bg-secondary-500 text-background-50 border-secondary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                {p.replace(' - ', ' ')} ({controles.filter(c => c.priorite === p).length})
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xs text-foreground-400" />
              <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-background-50 border border-background-200 outline-none focus:border-primary-300 w-48" />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer">
              <option value="priorite">Par Priorité</option>
              <option value="cout">Par Budget</option>
              <option value="effort">Par Effort</option>
              <option value="gain">Par Gain</option>
              <option value="risque">Par Risque</option>
            </select>
            <button onClick={() => setExpandedId(null)} className="text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap px-2">Réinitialiser</button>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p className="text-xs text-foreground-500 mb-4">{filteredControles.length} contrôle{filteredControles.length > 1 ? 's' : ''} affiché{filteredControles.length > 1 ? 's' : ''}</p>

        {/* CONTROLS LIST */}
        <div className="space-y-3">
          {filteredControles.map(ctrl => (
            <ControleCard key={ctrl.identifiant_unique} controle={ctrl} expanded={expandedId === ctrl.identifiant_unique} onToggle={() => setExpandedId(expandedId === ctrl.identifiant_unique ? null : ctrl.identifiant_unique)} />
          ))}
        </div>

        {filteredControles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-foreground-400 gap-2">
            <i className="ri-search-line text-3xl" />
            <p className="text-sm">Aucun contrôle ne correspond aux filtres</p>
            <button onClick={() => { setReferentielFilter('Tous'); setPrioriteFilter('Toutes'); setSearchQuery(''); }} className="text-xs text-primary-500 hover:text-primary-600 cursor-pointer whitespace-nowrap">Réinitialiser les filtres</button>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-8 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-medal-line text-accent-700 text-lg" />
            <span className="text-sm font-semibold text-accent-900">KOS Cartographie des Contrôles Automatisables</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span><strong>{computedMeta.totalControles}</strong> contrôles</span>
            <span><strong>{computedMeta.referentiels}</strong> référentiels</span>
            <span><strong>{computedMeta.totalP0}</strong> P0 critiques</span>
            <span><strong>{(computedMeta.budgetTotalEUR / 1000).toFixed(0)}K €</strong> budget</span>
            <span><strong>{computedMeta.gainEfficienceMoyen}%</strong> gain moyen</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

function ControleCard({ controle, expanded, onToggle }: { controle: ControleCartographie; expanded: boolean; onToggle: () => void }) {
  const isP0 = controle.priorite.startsWith('P0');
  return (
    <div className={`bg-background-50 border rounded-xl p-4 transition-colors cursor-pointer ${isP0 ? 'border-red-200/60 hover:border-red-300/80 bg-red-50/5' : controle.priorite.startsWith('P1') ? 'border-amber-200/60 hover:border-amber-300/80 bg-amber-50/5' : 'border-background-200/60 hover:border-background-300/80'}`} onClick={onToggle}>
      <div className="flex items-start gap-3">
        {/* Referentiel badge */}
        <div className="shrink-0 flex flex-col gap-1 items-center">
          <PillBadge label={controle.referentiel} variant={controle.referentiel} />
          <PillBadge label={controle.priorite.replace(' - ', ' ')} variant={controle.priorite} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono text-foreground-400">{controle.identifiant_unique}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 whitespace-nowrap">{controle.nom_domaine}</span>
          </div>
          <h3 className="text-sm font-bold text-foreground-950 mb-1">{controle.nom_controle}</h3>
          <div className="flex items-center gap-3 text-[10px] text-foreground-500 flex-wrap">
            <span><i className="ri-code-box-line mr-0.5 text-foreground-400" />{controle.type_automatisation}</span>
            <span><i className="ri-tools-line mr-0.5 text-foreground-400" />{controle.technologie_requise}</span>
            <span><i className="ri-bar-chart-2-line mr-0.5 text-foreground-400" />{controle.complexite}</span>
            <span><i className="ri-time-line mr-0.5 text-foreground-400" />{controle.effort_jh} JH</span>
            <span className="text-emerald-600 font-medium"><i className="ri-money-euro-circle-line mr-0.5" />{controle.cout_estime_eur.toLocaleString()} €</span>
          </div>

          {/* Expanded detail */}
          {expanded && (
            <div className="mt-3 pt-3 border-t border-background-200/40 space-y-2">
              <p className="text-xs text-foreground-600 leading-relaxed">{controle.description_automatisation}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50/50 rounded-lg p-2 text-center">
                  <span className="text-lg font-bold text-emerald-600">{controle.gain_efficience_pct}%</span>
                  <p className="text-[9px] text-foreground-500">Gain Efficience</p>
                </div>
                <div className="bg-accent-50/50 rounded-lg p-2 text-center">
                  <span className="text-lg font-bold text-accent-600">{controle.reduction_risque_pct}%</span>
                  <p className="text-[9px] text-foreground-500">Réduction Risque</p>
                </div>
                <div className="bg-background-100 rounded-lg p-2 text-center">
                  <span className="text-sm font-semibold text-foreground-700">{controle.roi_estime}</span>
                  <p className="text-[9px] text-foreground-500">ROI Estimé</p>
                </div>
              </div>
              <div className="text-[10px] text-foreground-500 flex items-center gap-2">
                <i className="ri-file-text-line text-foreground-400" />
                <span><strong>Livrable :</strong> {controle.livrable_attendu}</span>
              </div>
              {controle.sources_donnees && controle.sources_donnees.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] text-foreground-500"><strong>Sources :</strong></span>
                  {controle.sources_donnees.map((s, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-background-100 text-foreground-500">{s}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="shrink-0 flex flex-col items-center gap-1">
          <CircularGauge value={Math.round((controle.gain_efficience_pct + controle.reduction_risque_pct) / 2)} size={42} color={isP0 ? 'red' : controle.priorite.startsWith('P1') ? 'amber' : 'secondary'} />
          <span className="text-[8px] text-foreground-400">Score</span>
        </div>

        <div className="shrink-0 text-foreground-400">
          {expanded ? <i className="ri-arrow-up-s-line" /> : <i className="ri-arrow-down-s-line" />}
        </div>
      </div>
    </div>
  );
}



