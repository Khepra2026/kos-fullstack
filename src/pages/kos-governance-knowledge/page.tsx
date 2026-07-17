import { useState } from "react";
import { useAuditIntelligence } from "@/hooks/useAuditIntelligence";
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { usePolicyDocuments } from "@/hooks/usePolicyDocuments";
import { useKnowledgeCaptures } from "@/hooks/useKnowledgeCaptures";
import { useLearningModules } from "@/hooks/useLearningModules";
import { useOrchestrationLogs } from "@/hooks/useOrchestrationLogs";

type Tab = "audit" | "policy" | "knowledge" | "learning" | "orchestrator";

export default function KOSGovernanceKnowledgePage() {
  const [activeTab, setActiveTab] = useState<Tab>("orchestrator");
  const { data: audits, loading: al } = useAuditIntelligence();
  const { data: policies, loading: pl } = usePolicyDocuments();
  const { data: captures, loading: kl } = useKnowledgeCaptures();
  const { data: modules, loading: ll } = useLearningModules();
  const { data: orchestrations, loading: ol } = useOrchestrationLogs();

  const avgAudit = audits.length > 0 ? Math.round(audits.reduce((s, a) => s + a.score, 0) / audits.length) : 0;
  const avgCapture = captures.length > 0 ? Math.round(captures.reduce((s, c) => s + c.score, 0) / captures.length) : 0;
  const avgOrch = orchestrations.length > 0 ? Math.round(orchestrations.reduce((s, o) => s + o.quality_score, 0) / orchestrations.length) : 0;

  const tabs: { id: Tab; label: string; blocs: string; count: number; icon: string }[] = [
    { id: "orchestrator", label: "Multi-Agent Orchestrator", blocs: "BLOC 12", count: orchestrations.length, icon: "ri-node-tree" },
    { id: "audit", label: "Audit Intelligence", blocs: "BLOC 4", count: audits.length, icon: "ri-search-eye-line" },
    { id: "policy", label: "Policy & Governance", blocs: "BLOC 8", count: policies.length, icon: "ri-scales-line" },
    { id: "knowledge", label: "Knowledge Manager", blocs: "BLOC 10", count: captures.length, icon: "ri-database-2-line" },
    { id: "learning", label: "Learning Engine", blocs: "BLOC 11", count: modules.length, icon: "ri-graduation-cap-line" }
  ];

  return (
    <KOSHubLayout hubId={36}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-foreground-600 mb-2">KOS Governance & Knowledge Hub</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            KOS Governance & Knowledge Command™
          </h1>
          <p className="text-foreground-600 mt-2 max-w-3xl text-sm md:text-base">
            BLOC 4 Audit Intelligence &bull; BLOC 8 Policy & Governance &bull; BLOC 10 Knowledge Manager
            &bull; BLOC 11 Learning Engine &bull; BLOC 12 Multi-Agent Orchestrator &mdash;
            Gouvernance, connaissance et coordination de l'ecosysteme KOS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Score Orchestration</p>
            <span className="text-2xl font-bold text-foreground-950">{avgOrch}<span className="text-sm text-foreground-500">/100</span></span>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Score Audit</p>
            <span className="text-2xl font-bold text-foreground-950">{avgAudit}<span className="text-sm text-foreground-500">/100</span></span>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <p className="text-xs uppercase tracking-wider text-foreground-500 mb-1">Knowledge Captures</p>
            <span className="text-2xl font-bold text-foreground-950">{captures.length}<span className="text-sm text-foreground-500"> fiches</span></span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === t.id
                  ? "bg-primary-500 text-background-50"
                  : "bg-background-100 text-foreground-700 hover:bg-background-200"
              }`}
            >
              <i className={`${t.icon} text-xs`}></i>
              {t.blocs} ({t.count})
            </button>
          ))}
        </div>

        {activeTab === "orchestrator" && (
          <div className="space-y-3">
            {ol ? (
              <div className="text-center py-12 text-foreground-500">Chargement...</div>
            ) : (
              orchestrations.map((o) => (
                <div key={o.id} className="bg-background-100 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground-950 text-sm">{o.mission_type}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">{o.quality_score}/100</span>
                      {o.contradictions_detected > 0 && (
                        <span className="text-xs bg-accent-100 text-accent-900 px-2 py-1 rounded-full">{o.contradictions_detected} contradiction(s)</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">Lead: <span className="font-medium text-foreground-700">{o.lead_agent}</span></p>
                  <div className="flex flex-wrap gap-1">
                    {o.agents_activated.map((a: string, i: number) => (
                      <span key={i} className="text-xs bg-secondary-100 text-secondary-900 px-1.5 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="space-y-4">
            {al ? <div className="text-center py-12 text-foreground-500">Chargement...</div> : (
              audits.map((a) => (
                <div key={a.id} className="bg-background-100 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground-950">{a.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-background-200 px-2 py-1 rounded-full text-foreground-600">{a.audit_type}</span>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">{a.score}/100</span>
                      <span className="text-xs bg-accent-100 text-accent-900 px-2 py-1 rounded-full">Conformite: {a.compliance_score}/100</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">Referentiels: {a.frameworks}</p>
                  {a.gaps?.map((g: { gap: string; severity: string; reference: string }, i: number) => (
                    <p key={i} className="text-sm text-foreground-700">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${g.severity === "critique" ? "bg-accent-500" : "bg-secondary-500"}`}></span>
                      {g.gap} <span className="text-xs text-foreground-500">({g.reference})</span>
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "policy" && (
          <div className="space-y-4">
            {pl ? <div className="text-center py-12 text-foreground-500">Chargement...</div> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policies.map((p) => (
                  <div key={p.id} className="bg-background-100 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground-950 text-sm">{p.title}</h3>
                      <span className="text-xs bg-background-200 px-2 py-1 rounded-full text-foreground-600">v{p.version}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs bg-accent-100 text-accent-900 px-1.5 py-0.5 rounded">{p.policy_type}</span>
                      <span className="text-xs bg-secondary-100 text-secondary-900 px-1.5 py-0.5 rounded">{p.domain}</span>
                    </div>
                    {p.regulatory_refs?.slice(0, 3).map((ref: string, i: number) => (
                      <p key={i} className="text-xs text-foreground-600">&bull; {ref}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-4">
            {kl ? <div className="text-center py-12 text-foreground-500">Chargement...</div> : (
              captures.map((c) => (
                <div key={c.id} className="bg-background-100 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground-950 text-sm">{c.title}</h3>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">{c.score}/100</span>
                  </div>
                  <p className="text-sm text-foreground-700 mb-2">{c.problematique}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {c.tags?.map((t: string, i: number) => (
                      <span key={i} className="text-xs bg-background-200 px-1.5 py-0.5 rounded text-foreground-600">{t}</span>
                    ))}
                  </div>
                  {c.key_learnings?.slice(0, 3).map((l: { learning: string; impact: string }, i: number) => (
                    <p key={i} className="text-xs text-foreground-700">&bull; {l.learning} <span className="text-accent-700">[{l.impact}]</span></p>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "learning" && (
          <div className="space-y-4">
            {ll ? <div className="text-center py-12 text-foreground-500">Chargement...</div> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map((m) => (
                  <div key={m.id} className="bg-background-100 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground-950 text-sm">{m.title}</h3>
                      <span className="text-xs bg-background-200 px-2 py-1 rounded-full text-foreground-600">{m.duration_hours}h</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs bg-accent-100 text-accent-900 px-1.5 py-0.5 rounded">{m.module_type}</span>
                      <span className="text-xs bg-secondary-100 text-secondary-900 px-1.5 py-0.5 rounded">{m.domain}</span>
                      <span className="text-xs border border-background-300 px-1.5 py-0.5 rounded-full">{m.level}</span>
                    </div>
                    {m.certifications?.map((c: { cert: string; validite: string }, i: number) => (
                      <p key={i} className="text-xs text-accent-700 flex items-center gap-1">
                        <i className="ri-verified-badge-line"></i> {c.cert}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-shield-check-line text-accent-700"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Claude Capability Integration — Governance & Knowledge Layer</span>
          </div>
          <p className="text-xs text-accent-800/70">
            BLOC 4 (Audit), BLOC 8 (Policy), BLOC 10 (Knowledge), BLOC 11 (Learning), BLOC 12 (Orchestrator).
            Regle fondamentale: Aucun agent ne travaille isolement. Chaque mission complexe declenche automatiquement les agents concernes.
            Cron: Audit 13:00, Policy 14:00, Knowledge 15:00, Learning 16:00, Orchestrator 17:00 UTC.
          </p>
        </div>
      </div>
    </KOSHubLayout>
  );
}