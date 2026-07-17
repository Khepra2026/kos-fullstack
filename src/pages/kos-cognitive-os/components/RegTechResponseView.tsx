import { RegTechResponse } from '@/pages/kos-cognitive-os/types';
import ExplainabilityPanel from '@/pages/kos-cognitive-os/components/ExplainabilityPanel';
import ConfidenceGauge from '@/pages/kos-cognitive-os/components/ConfidenceGauge';
import { matchedKeywords, recognizedConcepts } from '@/pages/kos-cognitive-os/data/mockData';

interface Props {
  data: RegTechResponse;
  jurisdiction?: string;
}

function safeNum(v: unknown, fallback = 0): number {
  if (typeof v !== 'number') { const c = Number(v); return (isNaN(c) || !isFinite(c)) ? fallback : c; }
  return (isNaN(v) || !isFinite(v)) ? fallback : v;
}

function safePct(v: unknown): string {
  return Math.round(Math.max(0, Math.min(1, safeNum(v, 0))) * 100).toString();
}

function RomanBadge({ n, className = '' }: { n: string; className?: string }) {
  return (
    <div className={`w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center flex-shrink-0 ${className}`}>
      <span className="text-background-50 text-[11px] font-bold">{n}</span>
    </div>
  );
}

function SectionHeader({ roman, title, badge }: { roman: string; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <RomanBadge n={roman} />
      <h3 className="text-sm font-bold text-foreground-900 uppercase tracking-wide">{title}</h3>
      {badge && (
        <span className="ml-auto text-xs font-medium text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full whitespace-nowrap">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function RegTechResponseView({ data, jurisdiction = 'BCEAO' }: Props) {

  if (!data.evidenceChainValid) {
    const regCount = data.sources.filter(s => (s.priority ?? 6) <= 3).length;
    const normeCount = data.sources.filter(s => s.type === 'Norme').length;
    const metierCount = data.sources.filter(s => s.type === 'BigFour').length;

    return (
      <div className="rounded-xl p-8 bg-red-50 border-2 border-red-400/50">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-alert-fill text-red-600 text-2xl"></i>
          </div>
          <div>
            <h2 className="text-base font-bold text-red-800 mb-2">Chaîne de Preuves Insuffisante</h2>
            <p className="text-sm text-red-700/80 mb-4 max-w-lg">
              Le standard Big Four exige une chaîne de preuves complète avant de générer un mémo exécutif. 
              Minimum requis : 2 sources Tier 0–1 + 1 norme internationale + 1 guide métier.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { icon: 'ri-bank-line', label: 'Sources réglementaires', got: regCount, need: 2, ok: regCount >= 2 },
                { icon: 'ri-global-line', label: 'Normes internationales', got: normeCount, need: 1, ok: normeCount >= 1 },
                { icon: 'ri-building-4-line', label: 'Guides Big Four', got: metierCount, need: 1, ok: metierCount >= 1 },
              ].map((item) => (
                <div key={item.label} className={`p-3 rounded-lg border ${item.ok ? 'border-emerald-200 bg-emerald-50/70' : 'border-red-200 bg-red-100/50'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-2 ${item.ok ? 'bg-emerald-100' : 'bg-red-100'}`}>
                    <i className={`${item.icon} ${item.ok ? 'text-emerald-600' : 'text-red-500'} text-sm`}></i>
                  </div>
                  <p className="font-semibold text-foreground-800">{item.got}/{item.need}</p>
                  <p className="text-foreground-500 text-[11px] leading-snug mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const riskColorMap: Record<string, { badge: string; bar: string; bg: string; text: string; barW: string }> = {
    'Faible':   { badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200', bar: 'bg-emerald-500', bg: 'bg-emerald-50/70', text: 'text-emerald-800', barW: '14%' },
    'Modéré':   { badge: 'bg-amber-100 text-amber-800 border border-amber-200',       bar: 'bg-amber-500',   bg: 'bg-amber-50/70',   text: 'text-amber-800',   barW: '40%' },
    'Élevé':    { badge: 'bg-orange-100 text-orange-800 border border-orange-200',    bar: 'bg-orange-500',  bg: 'bg-orange-50/70',  text: 'text-orange-800',  barW: '68%' },
    'Critique': { badge: 'bg-red-100 text-red-800 border border-red-200',             bar: 'bg-red-500',     bg: 'bg-red-50/70',     text: 'text-red-800',     barW: '90%' },
  };
  const rc = riskColorMap[data.risque] ?? riskColorMap['Modéré'];

  const tierCounts = {
    tier01: data.sources.filter(s => (s.priority ?? 6) <= 3).length,
    tier2:  data.sources.filter(s => (s.priority ?? 6) >= 4 && (s.priority ?? 6) <= 5).length,
    tier3:  data.sources.filter(s => (s.priority ?? 6) >= 6).length,
  };
  const topReferentiel = data.referentiels.length > 0
    ? [...data.referentiels].sort((a, b) => safeNum(b.autorite, 0) - safeNum(a.autorite, 0))[0]
    : null;
  const confidencePct = safePct(data.confidence.total);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">

      {/* ══════════════════════════════════════════════════
          I. EN-TÊTE MÉMO — Dark strip Big Four
      ══════════════════════════════════════════════════ */}
      <section className="rounded-xl overflow-hidden border border-background-200/70">
        {/* Header strip */}
        <div className="bg-foreground-950 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-500/25 flex items-center justify-center flex-shrink-0">
                <i className="ri-file-text-fill text-primary-400 text-xl"></i>
              </div>
              <div>
                <p className="text-[11px] text-background-50/50 uppercase tracking-widest font-medium mb-0.5">
                  KOS COGNITIVE OS™ · Big Four Action Artefact v1.0
                </p>
                <h2 className="text-base font-bold text-background-50 leading-tight">
                  Mémo Exécutif Board — Analyse Réglementaire
                </h2>
                <p className="text-xs text-background-50/60 mt-0.5">
                  Classification : Usage Interne — Diffusion Restreinte · {today}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`text-xs px-3 py-1.5 rounded-md font-bold whitespace-nowrap ${rc.badge}`}>
                Risque {data.risque}
              </span>
              <span className="text-[11px] text-background-50/40 whitespace-nowrap">
                {jurisdiction} · {data.sources.length} sources analysées
              </span>
            </div>
          </div>
        </div>

        {/* KPI Strip — 5 metrics */}
        <div className="grid grid-cols-5 divide-x divide-background-200/70 bg-background-100/50 border-b border-background-200/70">
          {[
            { icon: 'ri-file-list-3-line', val: String(tierCounts.tier01 + tierCounts.tier2 + tierCounts.tier3), label: 'Sources', color: 'text-foreground-700' },
            { icon: 'ri-bank-line', val: String(tierCounts.tier01), label: 'Tier 0-1', color: 'text-primary-600' },
            { icon: 'ri-shield-check-line', val: `${confidencePct}%`, label: 'Confiance', color: 'text-accent-600' },
            { icon: 'ri-alert-fill', val: String(data.ecarts.length), label: 'Écarts', color: data.ecarts.length > 2 ? 'text-orange-600' : 'text-amber-600' },
            { icon: 'ri-arrow-right-circle-line', val: String(data.recommandations.length), label: 'Recomm.', color: 'text-secondary-600' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center py-4 px-2 text-center">
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className={`${m.icon} ${m.color} text-base`}></i>
              </div>
              <p className={`text-xl font-bold ${m.color} leading-none`}>{m.val}</p>
              <p className="text-[11px] text-foreground-500 mt-1 uppercase tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Executive Summary */}
        <div className="px-6 py-5 bg-background-50">
          <SectionHeader roman="I" title="Synthèse Exécutive" />
          <p className="text-sm text-foreground-700 leading-relaxed">{data.synthese}</p>
          {topReferentiel && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-primary-50/70 border border-primary-200/40">
              <i className="ri-scales-3-line text-primary-500 text-base flex-shrink-0"></i>
              <span className="text-xs text-foreground-700 leading-snug">
                <strong className="text-primary-700">Référentiel primaire :</strong>{' '}
                {topReferentiel.name}{' '}
                <span className="text-foreground-400">— Autorité {safeNum(topReferentiel.autorite, 0)}/100</span>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          II-III. Obligations + Référentiels (2-col)
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Obligations */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="II" title="Obligations Applicables" badge={`${data.obligations.length} obligations`} />
          <ul className="space-y-2">
            {data.obligations.map((o, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-200/40 hover:border-primary-200/60 transition-colors text-sm text-foreground-700">
                <div className="w-5 h-5 rounded bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-[11px] font-bold">{i + 1}</span>
                </div>
                <span className="leading-snug">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Référentiels — table-style */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="III" title="Référentiels par Autorité" />
          <div className="space-y-3">
            {[...data.referentiels]
              .sort((a, b) => safeNum(b.autorite, 0) - safeNum(a.autorite, 0))
              .map((r, i) => {
                const pct = Math.max(0, Math.min(100, safeNum(r.autorite, 0)));
                return (
                  <div key={r.name} className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-foreground-400 w-4 text-right flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-foreground-700 truncate leading-tight">{r.name}</span>
                        <span className="text-xs font-bold text-foreground-800 ml-2 flex-shrink-0">{pct}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-background-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 95 ? 'oklch(var(--primary-500))' :
                              pct >= 85 ? 'oklch(var(--accent-500))' : 'oklch(var(--secondary-500))',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════
          IV-V. Écarts + Évaluation Risque (2-col)
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Analyse des écarts */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="IV" title="Analyse des Écarts" badge={`${data.ecarts.length} gap(s)`} />
          <div className="space-y-2">
            {data.ecarts.map((e, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/70 border border-amber-200/40 text-sm text-foreground-700">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-error-warning-line text-amber-600 text-xs"></i>
                </div>
                <span className="leading-snug">{e}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Évaluation du risque */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="V" title="Évaluation du Risque" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-700">Niveau de risque résiduel</span>
              <span className={`text-sm font-bold px-4 py-2 rounded-lg ${rc.badge}`}>
                {data.risque}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] text-foreground-400 mb-2">
                <span>Faible</span><span>Modéré</span><span>Élevé</span><span>Critique</span>
              </div>
              <div className="w-full h-3 rounded-full bg-background-200 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${rc.bar}`} style={{ width: rc.barW }} />
              </div>
            </div>
            {/* Mini scoring table */}
            <div className="rounded-lg border border-background-200/60 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background-100/70">
                    <th className="text-left px-3 py-2 font-semibold text-foreground-600">Critère</th>
                    <th className="text-right px-3 py-2 font-semibold text-foreground-600">Score</th>
                    <th className="text-right px-3 py-2 font-semibold text-foreground-600">Poids</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background-200/50">
                  {[
                    { label: 'Sémantique', val: safeNum(data.confidence.semantique, 0), weight: '35%' },
                    { label: 'Autorité', val: safeNum(data.confidence.autorite, 0), weight: '25%' },
                    { label: 'Juridiction', val: safeNum(data.confidence.juridiction, 0), weight: '15%' },
                    { label: 'Fraîcheur', val: safeNum(data.confidence.fraicheur, 0), weight: '10%' },
                    { label: 'Citations', val: safeNum(data.confidence.densiteCitations, 0), weight: '10%' },
                    { label: 'Cohérence', val: safeNum(data.confidence.coherence, 0), weight: '5%' },
                  ].map((row) => {
                    const pct = Math.round(Math.max(0, Math.min(1, row.val)) * 100);
                    return (
                      <tr key={row.label} className="hover:bg-background-50/80">
                        <td className="px-3 py-2 text-foreground-600">{row.label}</td>
                        <td className="px-3 py-2 text-right">
                          <span className={`font-mono font-semibold ${pct >= 80 ? 'text-accent-600' : pct >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                            {pct}%
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right text-foreground-400">{row.weight}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-background-100/80 border-t border-background-200/70">
                    <td className="px-3 py-2 font-bold text-foreground-800 text-xs">SCORE TOTAL</td>
                    <td className="px-3 py-2 text-right font-bold font-mono text-accent-700 text-xs">
                      {confidencePct}%
                    </td>
                    <td className="px-3 py-2 text-right text-foreground-400">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════
          VI-VII. Recommandations + Plan d'Actions (2-col)
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recommandations */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="VI" title="Recommandations" badge={`${data.recommandations.length} actions`} />
          <ol className="space-y-2">
            {data.recommandations.map((r, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent-50/60 border border-accent-200/40 hover:border-accent-300/50 transition-colors text-sm text-foreground-700">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-background-50 text-[11px] font-bold">{i + 1}</span>
                </div>
                <span className="leading-snug">{r}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Plan d'actions */}
        <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <SectionHeader roman="VII" title="Plan d'Actions Priorisé" />
          <div className="space-y-2">
            {data.planActions.map((p, i) => {
              const urgency = [
                'border-l-red-400 bg-red-50/50',
                'border-l-orange-400 bg-orange-50/50',
                'border-l-amber-400 bg-amber-50/50',
                'border-l-secondary-400 bg-secondary-50/50',
                'border-l-accent-400 bg-accent-50/50',
              ];
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border-l-4 border border-background-200/40 ${urgency[i] ?? 'border-l-background-300 bg-background-100/50'}`}>
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-600">P{i + 1}</span>
                  </div>
                  <span className="text-sm text-foreground-700 leading-snug">{p}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════
          VIII. Sources — Table Tier
      ══════════════════════════════════════════════════ */}
      <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
        <SectionHeader roman="VIII" title="Sources & Preuves Réglementaires" badge={`${data.sources.length} sources`} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="bg-background-100/80 rounded-lg">
                <th className="text-left px-3 py-2.5 font-semibold text-foreground-600 rounded-l-lg">Tier</th>
                <th className="text-left px-3 py-2.5 font-semibold text-foreground-600">Source</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground-600">Type</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground-600">Juridiction</th>
                <th className="text-right px-3 py-2.5 font-semibold text-foreground-600 rounded-r-lg">Fraîcheur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {data.sources.slice(0, 10).map((source) => {
                const prio = source.priority ?? 6;
                const tierLabel = prio <= 1 ? 'T0' : prio <= 3 ? 'T1' : prio <= 5 ? 'T2' : 'T3';
                const tierColor = prio <= 1 ? 'bg-primary-100 text-primary-700' :
                  prio <= 3 ? 'bg-accent-100 text-accent-700' :
                  prio <= 5 ? 'bg-secondary-100 text-secondary-700' :
                  'bg-background-200 text-foreground-500';
                const fraicheurPct = Math.round(Math.max(0, Math.min(1, safeNum(source.fraicheur, 0.5))) * 100);

                return (
                  <tr key={source.id} className="hover:bg-background-50/80 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${tierColor}`}>
                        {tierLabel}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 max-w-[200px]">
                      <span className="text-foreground-700 line-clamp-2 leading-snug">{source.title}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="text-foreground-500 whitespace-nowrap">{source.type}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="text-foreground-600 font-medium whitespace-nowrap">{source.jurisdiction}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${fraicheurPct}%`,
                              background: fraicheurPct >= 85 ? 'oklch(var(--accent-500))' :
                                fraicheurPct >= 60 ? 'oklch(var(--secondary-500))' : 'oklch(0.5 0.2 25)',
                            }}
                          />
                        </div>
                        <span className={`font-mono text-[11px] font-semibold whitespace-nowrap ${
                          fraicheurPct >= 85 ? 'text-accent-600' : fraicheurPct >= 60 ? 'text-amber-600' : 'text-red-500'
                        }`}>
                          {fraicheurPct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.sources.length > 10 && (
            <p className="text-xs text-foreground-400 text-center mt-3">
              + {data.sources.length - 10} sources supplémentaires analysées
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          IX. Traçabilité — Gauge + Explainability
      ══════════════════════════════════════════════════ */}
      <section className="rounded-xl border border-background-200/70 bg-background-50 p-5">
        <SectionHeader roman="IX" title="Traçabilité & Confiance IA" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfidenceGauge confidence={data.confidence} className="border-0 bg-transparent p-0" />
          <ExplainabilityPanel
            keywords={matchedKeywords}
            concepts={recognizedConcepts}
            evidences={data.sources}
            confidence={data.confidence}
            jurisdiction={jurisdiction}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER STRIP — Classification + engine
      ══════════════════════════════════════════════════ */}
      <div className="rounded-xl border border-background-200/70 bg-foreground-950 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] text-background-50/70 font-medium">KOS Cognitive OS™ v1.0</span>
          <span className="text-background-50/20 hidden sm:inline">|</span>
          <span className="text-[11px] text-background-50/70">Big Four Action Artefact</span>
          <span className="text-background-50/20 hidden sm:inline">|</span>
          <span className="text-[11px] text-background-50/50">
            {data.sources.length} sources · {data.obligations.length} obligations · {data.recommandations.length} recommandations · Confiance {confidencePct}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <i className="ri-shield-check-fill text-primary-400 text-sm"></i>
          <span className="text-[11px] text-background-50/40 whitespace-nowrap">
            Classification : Usage Interne — Diffusion Restreinte
          </span>
        </div>
      </div>
    </div>
  );
}