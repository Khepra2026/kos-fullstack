import { useState } from "react";
import { useProposalDrafts } from "@/hooks/useProposalDrafts";
import hubLayout from '@/components/feature/hubLayout';
import { useFinancialAnalyses } from "@/hooks/useFinancialAnalyses";

type Tab = "proposals" | "financial";

function formatFCFA(n: number): string {
  if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)} Mrd`;
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)} M`;
  return `${n.toLocaleString()}`;
}

export default function productionCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>("proposals");
  const { data: proposals, loading: pl } = useProposalDrafts();
  const { data: analyses, loading: al } = useFinancialAnalyses();

  const totalPipeline = proposals.reduce((s, p) => s + (p.budget_estimate || 0), 0);
  const avgPropScore = proposals.length > 0 ? Math.round(proposals.reduce((s, p) => s + p.score, 0) / proposals.length) : 0;
  const avgFinScore = analyses.length > 0 ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length) : 0;

  return (
    <hubLayout hubId={35}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-foreground-600 mb-2">KOS Production Command</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            KOS Production Engine™
          </h1>
          <p className="text-foreground-600 mt-2 max-w-3xl text-sm md:text-base">
            BLOC 6 Proposal Generator &bull; BLOC 7 Financial Analysis Engine &mdash;
            Production automatisee d'offres commerciales et de modeles financiers niveau Big Four.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Pipeline Commercial</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground-950">{formatFCFA(totalPipeline)} FCFA</span>
              <span className="text-sm text-foreground-600">{proposals.length} propositions</span>
            </div>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Score Propositions</p>
            <span className="text-2xl font-bold text-foreground-950">{avgPropScore}<span className="text-sm text-foreground-500">/100</span></span>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Score Analyses Fin.</p>
            <span className="text-2xl font-bold text-foreground-950">{avgFinScore}<span className="text-sm text-foreground-500">/100</span></span>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[{ id: "proposals" as Tab, label: "Proposal Generator BLOC 6", count: proposals.length },
            { id: "financial" as Tab, label: "Financial Analysis BLOC 7", count: analyses.length }].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === t.id
                  ? "bg-primary-500 text-background-50"
                  : "bg-background-100 text-foreground-700 hover:bg-background-200"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {activeTab === "proposals" && (
          <div className="space-y-4">
            {pl ? (
              <div className="text-center py-12 text-foreground-500">Chargement des propositions...</div>
            ) : (
              proposals.map((p) => (
                <div key={p.id} className="bg-background-100 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground-950">{p.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-background-200 px-2 py-1 rounded-full text-foreground-600">{p.client_sector}</span>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">{p.score}/100</span>
                      <span className="text-xs bg-accent-100 text-accent-900 px-2 py-1 rounded-full font-semibold">{formatFCFA(p.budget_estimate)} FCFA</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600">Delai: {p.timeline_days} jours</p>
                  {p.team_composition && p.team_composition.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.team_composition.map((t: { role: string; allocation: string }, i: number) => (
                        <span key={i} className="text-xs bg-secondary-100 text-secondary-900 px-2 py-1 rounded">{t.role} ({t.allocation})</span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "financial" && (
          <div className="space-y-4">
            {al ? (
              <div className="text-center py-12 text-foreground-500">Chargement des analyses financieres...</div>
            ) : (
              analyses.map((a) => (
                <div key={a.id} className="bg-background-100 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground-950">{a.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-background-200 px-2 py-1 rounded-full text-foreground-600">{a.analysis_type.replace("_", " ")}</span>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">{a.score}/100</span>
                    </div>
                  </div>
                  {a.ratios && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {Object.entries(a.ratios).map(([k, v]) => (
                        <span key={k} className="text-xs bg-accent-100 text-accent-900 px-2 py-1 rounded">{k}: {String(v)}</span>
                      ))}
                    </div>
                  )}
                  {a.projections && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
                      {Object.entries(a.projections).map(([year, data]) => (
                        <div key={year} className="text-xs bg-background-200 p-2 rounded">
                          <span className="font-medium text-foreground-800 block">{year}</span>
                          {typeof data === "object" && data !== null && Object.entries(data as Record<string, unknown>).map(([k, v]) => (
                            <span key={k} className="text-foreground-600 block">{k}: {String(v)}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {a.scenarios && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(a.scenarios).map(([name, s]) => (
                        <span key={name} className="text-xs border border-background-300 px-2 py-1 rounded-full">
                          {name}: {typeof s === "object" && s !== null ? (s as Record<string, unknown>).croissance : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-8 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-file-list-3-line text-accent-700"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Claude Capability Integration — Production Layer</span>
          </div>
          <p className="text-xs text-accent-800/70">
            BLOC 6 genere des offres commerciales et propositions techniques selon les standards des grands cabinets.
            BLOC 7 produit business plans, modeles financiers, previsions et analyses de rentabilite.
            Cron jobs: 11:00 UTC (Proposals), 12:00 UTC (Financial). Edge Functions: kos-proposal-generator, kos-financial-analysis.
          </p>
        </div>
      </div>
    </hubLayout>
  );
}



