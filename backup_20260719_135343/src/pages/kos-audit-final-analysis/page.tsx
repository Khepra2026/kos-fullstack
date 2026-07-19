import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSAuditFinalAnalysis, type AFVueActive } from '@/hooks/useKOSAuditFinalAnalysis';
import type { AuditAxe, AuditAction } from '@/mocks/auditFinalAnalysis';
import { AUDIT_FINAL_META, ROADMAP_PRIORITAIRE } from '@/mocks/auditFinalAnalysis';

// ===== CIRCULAR GAUGE =====
function CircularGauge({ value, size = 40, strokeWidth = 3, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const strokeMap: Record<string, string> = {
    primary: 'stroke-primary-500', accent: 'stroke-accent-500', secondary: 'stroke-secondary-500',
    emerald: 'stroke-emerald-500', amber: 'stroke-amber-500', red: 'stroke-red-500',
  };
  const textMap: Record<string, string> = {
    primary: 'text-primary-700', accent: 'text-accent-700', secondary: 'text-secondary-700',
    emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-700',
  };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${strokeMap[color] || 'stroke-primary-500'} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className={`absolute text-[10px] font-bold ${textMap[color] || 'text-primary-700'}`}>{value}</span>
    </div>
  );
}

// ===== BADGE =====
function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    critique: 'bg-red-100 text-red-700 border-red-200',
    en_cours: 'bg-amber-100 text-amber-700 border-amber-200',
    progresse: 'bg-accent-100 text-accent-700 border-accent-200',
    maitrise: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    non_demarre: 'bg-background-200 text-foreground-500 border-background-200',
    termine: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bloque: 'bg-red-100 text-red-700 border-red-200',
    P0: 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200',
    P2: 'bg-background-200 text-foreground-500 border-background-200',
    default: 'bg-background-200 text-foreground-600 border-background-200',
  };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${bgMap[variant] || bgMap.default}`}>{label}</span>;
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'emerald';
  if (score >= 65) return 'accent';
  if (score >= 40) return 'amber';
  return 'red';
}

export default function auditFinalAnalysisPage() {
  const {
    axes, kpis, allActions, roadmap, actionsFiltrees, axeActuel,
    vueActive, setVueActive, axeSelectionne, selectAxe,
    filters, setFilter, resetFilters, searchQuery, setSearchQuery,
  } = useKOSAuditFinalAnalysis();

  return (
    <hubLayout hubId={210} activeTab="dashboard" tabLabel="Audit Final Analysis">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
              SYNTHÈSE ULTIME
            </span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full font-medium">{AUDIT_FINAL_META.axesTotal} Axes d'Audit</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">{AUDIT_FINAL_META.actionsTotal} Actions</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium font-mono">{AUDIT_FINAL_META.budgetTotal}</span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">{AUDIT_FINAL_META.horizon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            KOS Analyse Finale — Vérification Tous Points d'Audit
          </h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Analyse de couverture complète de <strong>l'audit stratégique Khepra Experts 2026</strong>. 
            <strong className="text-primary-700"> 4 axes critiques</strong> — 
            <strong className="text-accent-700"> {AUDIT_FINAL_META.actionsTotal} actions</strong>. 
            Marché & Positionnement, Marketing Digital & SEO/GEO Élite, Maturité Système KOS, Tunnel de Conversion & UI/UX Premium. 
            <strong className="text-red-600"> Budget total : {AUDIT_FINAL_META.budgetTotal}.</strong>
          </p>
        </div>

        {/* ===== TOP KPIs ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-foreground-950">{kpis.axes_total}</span>
            <p className="text-[10px] text-foreground-500">Axes d'Audit</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-foreground-950">{kpis.actions_total}</span>
            <p className="text-[10px] text-foreground-500">Actions</p>
          </div>
          <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-red-600">{kpis.actions_p0}</span>
            <p className="text-[10px] text-foreground-500">Priorité P0</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-amber-600">{kpis.actions_p1}</span>
            <p className="text-[10px] text-foreground-500">Priorité P1</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-amber-600">{kpis.score_moyen_actuel}</span>
            <p className="text-[10px] text-foreground-500">Score Actuel/100</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-emerald-600">97.8</span>
            <p className="text-[10px] text-foreground-500">Cible</p>
          </div>
          <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-red-600">{kpis.progression_globale}%</span>
            <p className="text-[10px] text-foreground-500">Progression</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-lg font-bold text-red-600">{kpis.axes_critiques}/{kpis.axes_total}</span>
            <p className="text-[10px] text-foreground-500">Axes Critiques</p>
          </div>
        </div>

        {/* ===== CONSTAT CENTRAL ===== */}
        <div className="bg-red-50 border border-red-200/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600"><i className="ri-alert-line text-sm"></i></div>
          <div>
            <p className="text-sm font-semibold text-red-800">Constat Central de l'Audit</p>
            <p className="text-xs text-red-700 mt-1 leading-relaxed">
              KOS a un socle solide (score moyen 53.3/100) mais <strong>les 4 axes sont tous critiques</strong>. Le positionnement stratégique n'est pas formalisé, le SEO/GEO n'est pas au niveau Élite, KOS dépend trop des APIs externes et de Supabase, et l'UI/UX n'est pas au standard Big Four. <strong>23 actions</strong> sur <strong>12-18 mois</strong> pour atteindre <strong>97.8/100</strong>.
            </p>
          </div>
        </div>

        {/* ===== VUE DASHBOARD ===== */}
        {vueActive === 'dashboard' && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                  <i className="ri-stack-line"></i>4 Axes d'Audit — Couverture Complète
                </h3>
              </div>
              <div className="space-y-3">
                {axes.map(axe => (
                  <AxeCard key={axe.id} axe={axe} onClick={() => selectAxe(axe.id)} />
                ))}
              </div>
            </div>

            {/* Synthèse Flash */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {axes.map(axe => (
                <div key={axe.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-foreground-950 mb-2 flex items-center gap-2">
                    <i className={`${axe.icon} text-sm`}></i>{axe.numero} — Constat
                  </h4>
                  <p className="text-[11px] text-foreground-600 leading-relaxed mb-3">{axe.constatActuel}</p>
                  <div className="bg-accent-100/40 border border-accent-200/40 rounded p-2">
                    <p className="text-[10px] text-accent-800 leading-relaxed">
                      <strong>Recommandation :</strong> {axe.recommandationCle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Clé */}
            <div className="p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-lightbulb-line text-accent-700 text-lg"></i>
                <span className="text-sm font-semibold text-accent-900">Message Clé — Synthèse de l'Audit</span>
              </div>
              <p className="text-xs text-accent-800/80 leading-relaxed">{AUDIT_FINAL_META.messageCle}</p>
            </div>
          </>
        )}

        {/* ===== VUE AXE DÉTAILLÉ ===== */}
        {vueActive === 'axe' && axeActuel && (
          <div className="space-y-6">
            <button onClick={() => selectAxe(null)} className="flex items-center gap-1.5 text-xs text-foreground-500 hover:text-foreground-800 cursor-pointer mb-2 whitespace-nowrap">
              <i className="ri-arrow-left-line"></i>Retour Dashboard
            </button>

            <div className="rounded-lg p-6 border border-background-200/60 bg-background-50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-primary-100 text-primary-700">
                  <i className={`${axeActuel.icon} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground-950">{axeActuel.numero} — {axeActuel.nom}</h2>
                  <p className="text-sm text-foreground-600">{axeActuel.responsable}</p>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-4">{axeActuel.description}</p>
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                <CircularGauge value={axeActuel.scoreActuel} size={48} strokeWidth={4} color={getScoreColor(axeActuel.scoreActuel)} />
                <span className="text-[10px] text-foreground-500">Actuel</span>
                <span className="text-foreground-300 text-lg">→</span>
                <CircularGauge value={axeActuel.scoreCible} size={48} strokeWidth={4} color="emerald" />
                <span className="text-[10px] text-foreground-500">Cible</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-lg p-2 bg-background-100"><span className="text-lg font-bold text-foreground-950">{axeActuel.actions.length}</span><p className="text-[9px] text-foreground-500">Actions</p></div>
                <div className="rounded-lg p-2 bg-background-100"><span className="text-base font-bold text-primary-700">{axeActuel.budgetTotal}</span><p className="text-[9px] text-foreground-500">Budget</p></div>
                <div className="rounded-lg p-2 bg-background-100"><span className="text-base font-bold text-foreground-950">{axeActuel.progressionGlobale}%</span><p className="text-[9px] text-foreground-500">Progression</p></div>
                <div className="rounded-lg p-2 bg-background-100"><Badge label="CRITIQUE" variant={axeActuel.statutGlobal} /><p className="text-[9px] text-foreground-500">Statut</p></div>
              </div>

              {/* Constat Actuel + Recommandation */}
              <div className="mt-4 space-y-3">
                <div className="bg-red-50/50 border border-red-200/30 rounded p-3">
                  <p className="text-xs font-semibold text-red-800 mb-1">Constat Actuel</p>
                  <p className="text-[11px] text-red-700 leading-relaxed">{axeActuel.constatActuel}</p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200/30 rounded p-3">
                  <p className="text-xs font-semibold text-emerald-800 mb-1">Recommandation Clé</p>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">{axeActuel.recommandationCle}</p>
                </div>
                <div className="bg-accent-50/50 border border-accent-200/30 rounded p-3">
                  <p className="text-xs font-semibold text-accent-800 mb-1">Impact Attendu</p>
                  <p className="text-[11px] text-accent-700 leading-relaxed">{axeActuel.impactAttendu}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Actions — {axeActuel.actions.length}</h3>
              <div className="space-y-2">
                {axeActuel.actions.map(act => (
                  <ActionCard key={act.id} action={act} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== VUE ACTIONS ===== */}
        {vueActive === 'actions' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                <i className="ri-tools-line"></i>{actionsFiltrees.length} Actions
              </h3>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text" placeholder="Rechercher..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 w-40 focus:outline-none focus:border-primary-300 text-sm"
                />
                <select value={filters.priorite || 'all'} onChange={(e) => setFilter('priorite', e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Toutes priorités</option>
                  <option value="P0">P0 — Critique</option><option value="P1">P1 — Important</option><option value="P2">P2 — Secondaire</option>
                </select>
                <select value={filters.statut || 'all'} onChange={(e) => setFilter('statut', e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Tous statuts</option>
                  <option value="non_demarre">À faire</option><option value="en_cours">En cours</option><option value="termine">Terminé</option>
                </select>
                <select value={filters.axe || 'all'} onChange={(e) => setFilter('axe', e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Tous axes</option>
                  {axes.map(axe => <option key={axe.id} value={axe.id}>{axe.numero}</option>)}
                </select>
                <button onClick={resetFilters} className="text-xs px-2.5 py-1.5 rounded-full bg-background-100 text-foreground-700 hover:bg-background-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line mr-1"></i>Reset
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {actionsFiltrees.map(act => (
                <ActionCard key={act.id} action={act} showAxe />
              ))}
            </div>
          </div>
        )}

        {/* ===== VUE ROADMAP PRIORITAIRE ===== */}
        {vueActive === 'roadmap' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-road-map-line"></i>Feuille de Route Prioritaire — Synthèse de l'Audit
            </h3>
            <p className="text-xs text-foreground-600 mb-6 max-w-3xl leading-relaxed">
              La synthèse de l'audit identifie 3 piliers d'action prioritaires. Chaque pilier regroupe les actions critiques pour atteindre l'excellence sur les 4 dimensions.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {roadmap.map((p, i) => (
                <div key={i} className="bg-background-50 border border-background-200/60 rounded-xl p-5 relative">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 font-bold text-sm mb-3">
                    {i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{p.pilier}</h4>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full whitespace-nowrap">{p.horizon}</span>
                    <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-mono whitespace-nowrap">{p.budget}</span>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {p.actions.map((act, j) => (
                      <li key={j} className="text-[10px] text-foreground-600 flex items-start gap-1">
                        <span className="text-accent-500 mt-0.5"><i className="ri-checkbox-circle-fill text-[8px]"></i></span>
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-emerald-50/50 border border-emerald-200/30 rounded p-2">
                    <p className="text-[10px] text-emerald-700 leading-relaxed">
                      <strong className="text-emerald-800">Impact :</strong> {p.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-calendar-line"></i>Calendrier d'Exécution Prioritaire
              </h3>
              <div className="space-y-3">
                {[
                  { phase: 'Phase 1 — Lancement Immédiat (P0)', periode: 'Juillet — Décembre 2026', actions: 'MKT-A01, MKT-A02, SEO-A01, SEO-A04, SEO-A05, SYS-A01, SYS-A06, UX-A01, UX-A03', budget: '49 500 000 FCFA', jalon: 'Positionnement formalisé, SEO/GEO lancé, optimisation DB, Design System V1, Lead Magnet interactif proto' },
                  { phase: 'Phase 2 — Déploiement (P1)', periode: 'Janvier — Juin 2027', actions: 'MKT-A03, MKT-A05, SEO-A02, SEO-A03, SYS-A02, SYS-A03, SYS-A05, UX-A02, UX-A04, UX-A05', budget: '55 000 000 FCFA', jalon: 'Offres calibrées, FAQ dynamique, mémoire sémantique, self-healing, storytelling, nurturing réglementaire, dashboard client' },
                  { phase: 'Phase 3 — Optimisation (P2)', periode: 'Juillet — Décembre 2027', actions: 'MKT-A04, MKT-A06, SEO-A06, SYS-A04', budget: '30 000 000 FCFA', jalon: 'Observatoire live, baromètre trimestriel, backlinks autorité, LLM local 70%+ requêtes' },
                ].map((phase, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 font-bold text-xs">{i + 1}</div>
                      <h4 className="text-sm font-bold text-foreground-950">{phase.phase}</h4>
                      <span className="text-[10px] text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{phase.periode}</span>
                      <span className="text-[10px] text-primary-700 font-mono font-bold">{phase.budget}</span>
                    </div>
                    <p className="text-[10px] text-foreground-500 mb-2 font-mono">{phase.actions}</p>
                    <div className="bg-accent-100/40 border border-accent-200/40 rounded p-2">
                      <p className="text-xs text-accent-800 flex items-center gap-1.5">
                        <i className="ri-flag-line text-accent-600"></i><strong>Jalon :</strong> {phase.jalon}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== VUE SYNTHÈSE EXÉCUTIVE ===== */}
        {vueActive === 'synthese' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-file-text-line"></i>Synthèse Exécutive — Résumé pour COMEX
            </h3>

            <div className="bg-background-50 border border-background-200/60 rounded-xl p-6 mb-6">
              <h4 className="text-base font-bold text-foreground-950 mb-4">Résumé Exécutif — Audit Final KOS 2026</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Contexte</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">
                    Khepra Experts opère sur le marché du conseil en Afrique francophone (Zone CFA, RDC, Maghreb), un marché en pleine mutation. Les clients font face à un déficit de données locales fiables et recherchent conformité, réactivité et coût optimisé. KOS est le système propriétaire qui automatise l'intelligence réglementaire, mais il n'a pas encore atteint le niveau de maturité requis pour une dominance incontestée.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Méthodologie</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">
                    L'audit couvre 4 dimensions critiques : <strong>Marché & Positionnement</strong> (analyse des besoins, segmentation, positionnement stratégique), <strong>Marketing Digital & SEO/GEO</strong> (GEO, EEAT, CWV, GSC), <strong>Maturité Système KOS</strong> (architecture, dépendances, qualité), et <strong>UI/UX & Conversion</strong> (design, lead magnets, nurturing, closing). Chaque dimension est notée sur 100 avec identification des gaps et actions correctives.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Résultats Clés</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {axes.map(axe => (
                      <div key={axe.id} className="flex items-center gap-2 bg-background-100 rounded p-2">
                        <CircularGauge value={axe.scoreActuel} size={32} strokeWidth={2.5} color={getScoreColor(axe.scoreActuel)} />
                        <div>
                          <p className="text-[10px] font-semibold text-foreground-900">{axe.nom}</p>
                          <p className="text-[9px] text-foreground-500">{axe.scoreActuel}/100 → {axe.scoreCible}/100</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Recommandations Prioritaires</p>
                  <ol className="space-y-1.5 list-decimal list-inside">
                    <li className="text-xs text-foreground-600 leading-relaxed">
                      <strong>Déployer un LLM Open-Source local</strong> pour diviser par 5 la dépendance/coûts aux APIs externes, et optimiser les structures Supabase pour la mémoire sémantique.
                    </li>
                    <li className="text-xs text-foreground-600 leading-relaxed">
                      <strong>Structurer le site comme un Think Tank</strong> (data brute + analyses macro) pour saturer les moteurs de recherche géolocalisés en Afrique Francophone et s'imposer sur la GEO.
                    </li>
                    <li className="text-xs text-foreground-600 leading-relaxed">
                      <strong>Refondre l'identité graphique</strong> vers un minimalisme premium Big Four tout en intégrant le Lead Magnet interactif propulsé par KOS pour capturer et convertir les leads en continu.
                    </li>
                  </ol>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Budget & Horizon</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">
                    <strong>Budget total : {AUDIT_FINAL_META.budgetTotal}</strong> sur 12-18 mois. <strong>23 actions</strong> réparties en 3 phases. Priorité P0 : 9 actions critiques à lancer immédiatement (budget immédiat : ~50M FCFA).
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-800 mb-1">Résultat Final Attendu</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">
                    À l'issue du programme : Khepra Experts est <strong>le Cabinet de Conseil Augmenté de référence en Afrique francophone</strong>, avec une infrastructure technique souveraine, un site world-class dominant la GEO, une machine à leads calibrée, et une expérience client premium. Score cible consolidé : <strong>97.8/100</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Matrice Scores */}
            <div className="bg-background-50 border border-background-200/60 rounded-xl p-6">
              <h4 className="text-sm font-bold text-foreground-950 mb-4">Matrice de Progression par Axe</h4>
              <div className="space-y-3">
                {axes.map(axe => (
                  <div key={axe.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-700">{axe.numero} — {axe.nom}</span>
                      <span className="text-[10px] font-bold text-foreground-500">{axe.scoreActuel} → {axe.scoreCible}</span>
                    </div>
                    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-primary-500 rounded-full transition-all duration-700" style={{ width: `${axe.progressionGlobale}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-foreground-400 mt-0.5">
                      <span>Progression : {axe.progressionGlobale}%</span>
                      <span>{axe.actions.length} actions · {axe.budgetTotal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== BOTTOM NAV ===== */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
              { key: 'actions', label: 'Actions', icon: 'ri-tools-line' },
              { key: 'roadmap', label: 'Feuille de Route', icon: 'ri-road-map-line' },
              { key: 'synthese', label: 'Synthèse COMEX', icon: 'ri-file-text-line' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setVueActive(tab.key as AFVueActive)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${vueActive === tab.key ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i><span>{tab.label}</span>
              </button>
            ))}
            <span className="text-xs text-foreground-400 flex items-center px-2">|</span>
            {axes.map(axe => (
              <button key={axe.id} onClick={() => selectAxe(axe.id)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${axeSelectionne === axe.id ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <i className={`${axe.icon} text-sm`}></i><span>{axe.numero}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

// ===== AXE CARD =====
function AxeCard({ axe, onClick }: { axe: AuditAxe; onClick: () => void }) {
  const sc = getScoreColor(axe.scoreActuel);
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-xl p-4 hover:border-background-300/80 transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex items-start gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-100 text-primary-700">
            <i className={`${axe.icon} text-lg`}></i>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-bold text-foreground-950">{axe.numero} — {axe.nom}</h3>
            <Badge label="CRITIQUE" variant={axe.statutGlobal} />
          </div>
          <p className="text-xs text-foreground-500 mb-2">Recommandation : {axe.recommandationCle.substring(0, 100)}...</p>
          <div className="flex items-center gap-3 flex-wrap text-[10px] text-foreground-500">
            <span><i className="ri-tools-line mr-0.5"></i>{axe.actions.length} actions</span>
            <span><i className="ri-money-dollar-circle-line mr-0.5"></i>{axe.budgetTotal}</span>
            <span><i className="ri-bar-chart-line mr-0.5"></i>Impact : {axe.impactAttendu.substring(0, 60)}...</span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <CircularGauge value={axe.scoreActuel} size={40} strokeWidth={3} color={sc} />
          <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
        </div>
      </div>
    </div>
  );
}

// ===== ACTION CARD =====
function ActionCard({ action, showAxe = false }: { action: AuditAction & { axe?: AuditAxe }; showAxe?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 cursor-pointer hover:border-background-300/80 transition-colors" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Badge label={action.statut === 'non_demarre' ? 'À faire' : action.statut === 'en_cours' ? 'En cours' : action.statut === 'termine' ? 'Terminé' : 'Bloqué'} variant={action.statut} />
          <Badge label={action.priorite} variant={action.priorite} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-[10px] font-mono text-foreground-400">{action.id}</span>
            {showAxe && action.axe && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 whitespace-nowrap">{action.axe.numero}</span>
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 whitespace-nowrap">{action.standardVise}</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground-950 mb-1">{action.action}</h4>
          <div className="flex items-center gap-3 text-[10px] text-foreground-500 flex-wrap">
            <span><i className="ri-money-dollar-circle-line mr-0.5"></i>{action.budget}</span>
            <span><i className="ri-time-line mr-0.5"></i>{action.effort}</span>
            <span><i className="ri-user-line mr-0.5"></i>{action.responsable}</span>
            <span><i className="ri-calendar-line mr-0.5"></i>{action.deadline}</span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden hidden sm:block">
            <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${action.progression}%` }}></div>
          </div>
          <span className="text-[10px] font-bold text-foreground-500">{action.progression}%</span>
          {expanded ? <i className="ri-arrow-up-s-line text-xs text-foreground-400"></i> : <i className="ri-arrow-down-s-line text-xs text-foreground-400"></i>}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-background-200/40 space-y-2">
          <p className="text-xs text-foreground-600 leading-relaxed">{action.description}</p>
          <div className="bg-red-50 border border-red-100 rounded p-2">
            <p className="text-[10px] text-red-700 leading-relaxed"><strong>Pourquoi :</strong> {action.pourquoiAction}</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] flex-wrap">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full"><i className="ri-flag-line mr-0.5"></i>KPI : {action.kpi}</span>
            <span className="bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full"><i className="ri-file-list-3-line mr-0.5"></i>Livrable : {action.livrable}</span>
          </div>
          {action.dependances.length > 0 && (
            <div className="flex items-center gap-1 text-[9px] flex-wrap">
              <span className="text-foreground-500">Dépendances :</span>
              {action.dependances.map(d => (
                <span key={d} className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-mono">{d}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}



