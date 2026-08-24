import { useState } from "react";
import hubLayout from "@/components/feature/hubLayout";
import {
  discoveredSources,
  crawledDocuments,
  regulatoryAlerts,
  extractedInsights,
  thinkTankPublications,
  seoContent,
  ragKnowledgeBase,
  generatedDeliverables,
  strategicAlerts,
  strategicIntelligenceStats,
} from "@/mocks/strategicIntelligence";

type AgentTab =
  | "discovery"
  | "crawler"
  | "regulatory"
  | "extraction"
  | "thinktank"
  | "seo"
  | "rag"
  | "deliverables"
  | "alerts";

interface AgentInfo {
  id: AgentTab;
  number: number;
  label: string;
  subtitle: string;
  icon: string;
  count: number;
  color: "primary" | "accent" | "secondary";
}

const agents: AgentInfo[] = [
  { id: "discovery", number: 1, label: "Global Source Discovery", subtitle: "Identification des sources stratégiques", icon: "ri-radar-line", count: discoveredSources.length, color: "primary" },
  { id: "crawler", number: 2, label: "Smart Crawler", subtitle: "Collecte intelligente de documents", icon: "ri-download-cloud-2-line", count: crawledDocuments.length, color: "accent" },
  { id: "regulatory", number: 3, label: "Regulatory Watch", subtitle: "Veille réglementaire continue", icon: "ri-shield-check-line", count: regulatoryAlerts.length, color: "secondary" },
  { id: "extraction", number: 4, label: "Knowledge Extraction", subtitle: "Extraction de connaissances", icon: "ri-lightbulb-line", count: extractedInsights.length, color: "primary" },
  { id: "thinktank", number: 5, label: "Think Tank Content Factory", subtitle: "Production intellectuelle", icon: "ri-book-open-line", count: thinkTankPublications.length, color: "accent" },
  { id: "seo", number: 6, label: "SEO Knowledge Factory", subtitle: "Contenus SEO experts", icon: "ri-search-eye-line", count: seoContent.length, color: "secondary" },
  { id: "rag", number: 7, label: "RAG Knowledge Builder", subtitle: "Base de connaissance vectorielle", icon: "ri-database-2-line", count: ragKnowledgeBase.length, color: "primary" },
  { id: "deliverables", number: 8, label: "Deliverable Generator", subtitle: "Génération de livrables", icon: "ri-file-text-line", count: generatedDeliverables.length, color: "accent" },
  { id: "alerts", number: 9, label: "Alert Engine", subtitle: "Notifications stratégiques", icon: "ri-notification-3-line", count: strategicAlerts.length, color: "secondary" },
];

const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-amber-100 text-amber-800 border-amber-200",
  elevated: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-blue-100 text-blue-800 border-blue-200",
  low: "bg-green-100 text-green-800 border-green-200",
  modéré: "bg-blue-100 text-blue-800 border-blue-200",
  élevé: "bg-amber-100 text-amber-800 border-amber-200",
  critique: "bg-red-100 text-red-800 border-red-200",
  faible: "bg-green-100 text-green-800 border-green-200",
  moyen: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  published: "bg-emerald-100 text-emerald-800 border-emerald-200",
  in_progress: "bg-amber-100 text-amber-800 border-amber-200",
  in_review: "bg-purple-100 text-purple-800 border-purple-200",
  indexing: "bg-amber-100 text-amber-800 border-amber-200",
  pending: "bg-slate-100 text-slate-600 border-slate-200",
  draft: "bg-slate-100 text-slate-600 border-slate-200",
  acknowledged: "bg-emerald-100 text-emerald-800 border-emerald-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

function CircularGauge({ value, size = 56, strokeWidth = 5, color = "primary" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const colorClass = color === "accent" ? "stroke-accent-500" : color === "secondary" ? "stroke-secondary-500" : "stroke-primary-500";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = "primary", label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === "accent" ? "bg-accent-500" : color === "secondary" ? "bg-secondary-500" : "bg-primary-500";
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-foreground-600 mb-1"><span>{label}</span><span>{pct}%</span></div>}
      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Badge({ label, variant = "default" }: { label: string; variant?: string }) {
  const classes = severityColors[variant] || statusColors[variant] || "bg-background-200 text-foreground-700 border-background-200";
  return <span className={`inline-flex text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

export default function strategicIntelligencePage() {
  const [activeTab, setActiveTab] = useState<AgentTab>("discovery");

  const s = strategicIntelligenceStats;

  return (
    <hubLayout hubId={34}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">KOS Strategic Intelligence Hub</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">AAA Big Four Certified</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Strategic Intelligence Engine&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            9 agents autonomes formant un réseau d&rsquo;intelligence documentaire de niveau Big Four + Think Tank.
            Détection, collecte, analyse, qualification, structuration et redistribution automatique de toute information utile aux activités de Khepra Experts.
          </p>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Sources</p>
            <span className="text-xl font-bold text-foreground-950">{s.total_sources}<span className="text-xs text-foreground-500 font-normal"> actives</span></span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i> 100% actives</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Documents</p>
            <span className="text-xl font-bold text-foreground-950">{s.documents_collected}<span className="text-xs text-foreground-500 font-normal"> collectés</span></span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-arrow-up-line text-xs text-emerald-600"></i> +{s.documents_30d}/30j</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">AO/AMI</p>
            <span className="text-xl font-bold text-foreground-950">{s.tender_total}<span className="text-xs text-foreground-500 font-normal"> détectés</span></span>
            <div className="flex items-center gap-1 text-xs text-secondary-600"><i className="ri-file-search-line text-xs"></i> {s.tender_ami} AMI · {s.tender_live_db ? 'LIVE DB' : 'Mock'}</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Pipeline Tender</p>
            <span className="text-xl font-bold text-foreground-950">18,2<span className="text-xs text-foreground-500 font-normal"> Md FCFA</span></span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-funds-line text-xs"></i> {s.tender_qualified} qualifiés</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Alertes</p>
            <span className="text-xl font-bold text-foreground-950">{s.alerts_triggered}<span className="text-xs text-foreground-500 font-normal"> déclenchées</span></span>
            <div className="flex items-center gap-1 text-xs text-amber-600"><i className="ri-time-line text-xs"></i> {s.alerts_triggered - s.alerts_acknowledged} en attente</div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={94} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">SEO Traffic</p><p className="text-sm font-bold text-foreground-950">{s.seo_monthly_traffic.toLocaleString()}<span className="text-xs text-foreground-500 font-normal">/mois</span></p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={97} size={42} strokeWidth={4} color="accent" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">RAG Accuracy</p><p className="text-sm font-bold text-foreground-950">97%<span className="text-xs text-foreground-500 font-normal"> moyenne</span></p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={93} size={42} strokeWidth={4} color="secondary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Qualité Livrables</p><p className="text-sm font-bold text-foreground-950">9.3<span className="text-xs text-foreground-500 font-normal">/10</span></p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={88} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Couverture RAG</p><p className="text-sm font-bold text-foreground-950">{s.rag_total_embeddings.toLocaleString()}<span className="text-xs text-foreground-500 font-normal"> vecteurs</span></p></div>
          </div>
        </div>

        {/* Tab Switcher — Scrollable */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {agents.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveTab(a.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === a.id
                  ? a.color === "accent"
                    ? "bg-accent-500 text-background-50 border-accent-500"
                    : a.color === "secondary"
                      ? "bg-secondary-500 text-background-50 border-secondary-500"
                      : "bg-primary-500 text-background-50 border-primary-500"
                  : "bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100"
              }`}
            >
              <i className={`${a.icon} text-sm`}></i>
              <span>A{a.number}</span>
            </button>
          ))}
        </div>

        {/* Current Agent Info */}
        {(() => {
          const agent = agents.find((a) => a.id === activeTab)!;
          return (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.color === "accent" ? "bg-accent-100 text-accent-700" : agent.color === "secondary" ? "bg-secondary-100 text-secondary-700" : "bg-primary-100 text-primary-700"}`}>
                  <i className={`${agent.icon} text-lg`}></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">AGENT {agent.number} &mdash; {agent.label}&trade;</p>
                  <p className="text-xs text-foreground-600">{agent.subtitle} &bull; {agent.count} entrées</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center gap-1.5 ${
                strategicIntelligenceStats.is_mode_reel
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${strategicIntelligenceStats.is_mode_reel ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                {strategicIntelligenceStats.is_mode_reel ? 'Mode RÉEL — Supabase LIVE' : 'Mode MOCK'}
              </span>
            </div>
          );
        })()}

        {/* ================================================ */}
        {/* AGENT 1: Global Source Discovery */}
        {/* ================================================ */}
        {activeTab === "discovery" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveredSources.map((src) => (
              <div key={src.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${src.icon} text-sm`}></i></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-950 leading-tight">{src.name}</p>
                      <p className="text-[11px] text-foreground-500">{src.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">{src.reliability}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-foreground-500 mt-3 pt-3 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-earth-line text-xs"></i>{src.country}</span>
                  <span className="flex items-center gap-1"><i className="ri-file-add-line text-xs"></i>+{src.new_docs_30d}/30j</span>
                  <span className="flex items-center gap-1 text-emerald-600"><i className="ri-checkbox-circle-fill text-[10px]"></i>{src.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 2: Smart Crawler */}
        {/* ================================================ */}
        {activeTab === "crawler" && (
          <div className="space-y-3">
            {crawledDocuments.map((doc) => (
              <div key={doc.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-accent-100 flex items-center justify-center text-accent-600 shrink-0 mt-0.5"><i className="ri-file-pdf-2-line text-sm"></i></div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{doc.title}</h4>
                      <p className="text-xs text-foreground-500">{doc.organization} &bull; {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={doc.type} variant={doc.extraction_status === "completed" ? "completed" : "in_progress"} />
                    <span className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold ${doc.relevance_score >= 95 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : doc.relevance_score >= 90 ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-50 text-slate-600 border border-slate-200"}`}>{doc.relevance_score}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{kw}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-foreground-500 mt-3 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-global-line text-xs"></i>{doc.language}</span>
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line text-xs"></i>{doc.country}</span>
                  <span className="flex items-center gap-1"><i className="ri-hard-drive-2-line text-xs"></i>{doc.file_size}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 3: Regulatory Watch */}
        {/* ================================================ */}
        {activeTab === "regulatory" && (
          <div className="space-y-3">
            {regulatoryAlerts.map((reg) => (
              <div key={reg.id} className={`bg-background-50 border rounded-lg p-4 ${reg.impact === "critique" ? "border-red-200/70 bg-red-50/30" : reg.impact === "élevé" ? "border-amber-200/70 bg-amber-50/20" : "border-background-200/60"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${reg.impact === "critique" ? "bg-red-100 text-red-700" : reg.impact === "élevé" ? "bg-amber-100 text-amber-700" : "bg-secondary-100 text-secondary-700"}`}>
                      <i className={reg.status === "new" ? "ri-add-circle-line" : reg.status === "amended" ? "ri-edit-circle-line" : reg.status === "sanction" ? "ri-error-warning-line" : "ri-file-list-3-line"}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{reg.title}</h4>
                      <p className="text-xs text-foreground-500">{reg.authority} &bull; {reg.reference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={reg.status} variant={reg.impact === "critique" ? "critical" : reg.impact === "élevé" ? "high" : reg.impact} />
                    <Badge label={reg.impact} variant={reg.impact} />
                  </div>
                </div>
                <p className="text-sm text-foreground-700 mt-2 leading-relaxed">{reg.summary}</p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground-500 mt-3 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-calendar-line text-xs"></i>Conformité : {reg.deadline_compliance}</span>
                  <span className="flex items-center gap-1"><i className="ri-price-tag-3-line text-xs"></i>{reg.sector}</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-crosshair-line text-xs"></i>Pertinence : {reg.relevance}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 4: Knowledge Extraction */}
        {/* ================================================ */}
        {activeTab === "extraction" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extractedInsights.map((ins) => (
              <div key={ins.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Badge label={ins.type.toUpperCase()} variant={ins.type === "risk" ? "élevé" : ins.type === "trend" ? "completed" : ins.type === "benchmark" ? "published" : "default"} />
                  <Badge label={ins.domain} />
                  <span className="text-[10px] text-foreground-500 ml-auto">{ins.confidence}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{ins.title}</h4>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed flex-1">{ins.summary}</p>
                <div className="space-y-1.5 mb-3">
                  {ins.key_stats.map((stat, i) => (
                    <p key={i} className="text-xs text-foreground-700 flex items-center gap-1.5"><i className="ri-bar-chart-line text-[10px] text-primary-500"></i>{stat}</p>
                  ))}
                </div>
                <div className="mt-auto pt-3 border-t border-background-200/50">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-foreground-500"><i className="ri-lightbulb-flash-line text-xs text-amber-500"></i>Recommandation</span>
                    <Badge label={ins.risk_level} variant={ins.risk_level} />
                  </div>
                  <p className="text-xs text-foreground-700 mt-1 font-medium">{ins.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 5: Think Tank Content Factory */}
        {/* ================================================ */}
        {activeTab === "thinktank" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {thinkTankPublications.map((pub) => (
              <div key={pub.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Badge label={pub.type} variant={pub.status === "published" ? "published" : pub.status === "in_review" ? "in_review" : "in_progress"} />
                  <span className="text-[10px] text-foreground-500 ml-auto">{pub.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{pub.title}</h4>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 leading-relaxed">{pub.abstract}</p>
                <div className="flex items-center gap-3 text-[11px] text-foreground-500 mt-auto pt-3 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{pub.pages}p</span>
                  {pub.citations > 0 && <span className="flex items-center gap-1"><i className="ri-quote-text text-xs"></i>{pub.citations}</span>}
                  {pub.downloads > 0 && <span className="flex items-center gap-1"><i className="ri-download-2-line text-xs"></i>{pub.downloads.toLocaleString()}</span>}
                  <span className="ml-auto"><Badge label={pub.domain} /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 6: SEO Knowledge Factory */}
        {/* ================================================ */}
        {activeTab === "seo" && (
          <div className="space-y-3">
            {seoContent.map((seo) => (
              <div key={seo.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge label={seo.type} variant={seo.status === "published" ? "published" : "in_progress"} />
                      <Badge label={seo.format} />
                      <span className="text-[10px] text-foreground-500">{seo.word_count.toLocaleString()} mots</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{seo.title}</h4>
                    <p className="text-xs text-foreground-500 mt-1">{seo.keywords_targeted.join(" &bull; ")}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-center">
                      <CircularGauge value={seo.seo_score} size={48} strokeWidth={4} color={seo.seo_score >= 90 ? "primary" : "secondary"} />
                      <p className="text-[9px] text-foreground-500 mt-0.5">SEO</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-background-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground-950">{seo.monthly_traffic > 0 ? (seo.monthly_traffic / 1000).toFixed(1) + "k" : "—"}</span>
                      </div>
                      <p className="text-[9px] text-foreground-500 mt-0.5">Trafic/mois</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-background-200/50">
                  <span className="text-[10px] text-foreground-500 flex items-center gap-1"><i className="ri-shield-star-line text-xs"></i>EEAT: {seo.eeat_score}</span>
                  <span className="text-[10px] text-foreground-500 flex items-center gap-1"><i className="ri-code-s-slash-line text-xs"></i>{seo.schema_types.join(", ")}</span>
                  <StatusDot active={seo.status === "published"} label={seo.status} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 7: RAG Knowledge Builder */}
        {/* ================================================ */}
        {activeTab === "rag" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ragKnowledgeBase.map((rag) => (
              <div key={rag.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center ${rag.index_status === "completed" ? "bg-emerald-100 text-emerald-700" : rag.index_status === "indexing" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                      <i className={rag.index_status === "completed" ? "ri-check-double-line" : rag.index_status === "indexing" ? "ri-loader-4-line animate-spin" : "ri-time-line"}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{rag.title}</h4>
                      <p className="text-[11px] text-foreground-500">{rag.category} &bull; {rag.document_count} documents</p>
                    </div>
                  </div>
                  <Badge label={rag.index_status === "completed" ? "Indexé" : rag.index_status === "indexing" ? "En cours" : "En attente"} variant={rag.index_status} />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-lg font-bold text-foreground-950">{rag.total_pages.toLocaleString()}</p>
                    <p className="text-[9px] text-foreground-500">Pages</p>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-lg font-bold text-foreground-950">{rag.embeddings_count.toLocaleString()}</p>
                    <p className="text-[9px] text-foreground-500">Embeddings</p>
                  </div>
                </div>
                {rag.index_status === "completed" && (
                  <div className="space-y-2">
                    <ProgressBar value={parseInt(rag.search_accuracy)} color="accent" label="Précision recherche" />
                    <div className="flex items-center justify-between text-[11px] text-foreground-500">
                      <span className="flex items-center gap-1"><i className="ri-search-line text-xs"></i>{rag.queries_30d} req/30j</span>
                      <span className="flex items-center gap-1"><i className="ri-timer-line text-xs"></i>{rag.avg_response_time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 8: Deliverable Generator */}
        {/* ================================================ */}
        {activeTab === "deliverables" && (
          <div className="space-y-3">
            {generatedDeliverables.map((del) => (
              <div key={del.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${del.status === "completed" ? "bg-emerald-100 text-emerald-700" : del.status === "in_progress" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>
                      <i className={del.status === "completed" ? "ri-check-double-line" : del.status === "in_progress" ? "ri-loader-4-line animate-spin" : "ri-eye-line"}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{del.title}</h4>
                      <p className="text-xs text-foreground-500">{del.client} &bull; {del.type} &bull; {del.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {del.score_quality > 0 && (
                      <div className="text-center">
                        <CircularGauge value={Math.round(del.score_quality * 10)} size={40} strokeWidth={3} color={del.score_quality >= 9.3 ? "accent" : "primary"} />
                        <p className="text-[9px] text-foreground-500 mt-0.5">Qualité</p>
                      </div>
                    )}
                    <Badge label={del.status === "completed" ? "Livré" : del.status === "in_progress" ? "En cours" : "En revue"} variant={del.status} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {del.sections.map((sec, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{sec}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{del.pages}p</span>
                  <span className="flex items-center gap-1"><i className="ri-file-copy-2-line text-xs"></i>{del.template_used}</span>
                  <span className="flex items-center gap-1"><i className="ri-time-line text-xs"></i>{del.generation_time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================ */}
        {/* AGENT 9: Alert Engine */}
        {/* ================================================ */}
        {activeTab === "alerts" && (
          <div className="space-y-3">
            {strategicAlerts.map((alert) => (
              <div key={alert.id} className={`bg-background-50 border rounded-lg p-4 ${alert.severity === "critical" ? "border-red-200/70 bg-red-50/20" : alert.severity === "high" ? "border-amber-200/70 bg-amber-50/20" : "border-background-200/60"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${alert.severity === "critical" ? "bg-red-100 text-red-700" : alert.severity === "high" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                      <i className={alert.severity === "critical" ? "ri-alert-fill" : alert.severity === "high" ? "ri-error-warning-line" : "ri-information-line"}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{alert.title}</h4>
                      <p className="text-xs text-foreground-500">{alert.category} &bull; {new Date(alert.triggered_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={alert.channel} />
                    <Badge label={alert.severity} variant={alert.severity} />
                    <StatusDot active={alert.status === "acknowledged"} label={alert.status === "acknowledged" ? "Acquitté" : "En attente"} />
                  </div>
                </div>
                <p className="text-sm text-foreground-700 mt-2 leading-relaxed">{alert.summary}</p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground-500 mt-3 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-user-line text-xs"></i>{alert.assigned_to}</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-arrow-right-circle-line text-xs"></i>{alert.action_required}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Intelligence Architecture Summary */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-brain-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Strategic Intelligence Architecture — 9 Autonomous Agents + Tender Bridge LIVE</span>
            {strategicIntelligenceStats.tender_live_db && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                TENDER BRIDGE LIVE — Supabase 51 AO/AMI
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span className="flex items-center gap-1"><i className="ri-radar-line text-xs"></i>A1: Source Discovery</span>
            <span className="flex items-center gap-1"><i className="ri-download-cloud-2-line text-xs"></i>A2: Smart Crawler</span>
            <span className="flex items-center gap-1"><i className="ri-shield-check-line text-xs"></i>A3: Regulatory Watch</span>
            <span className="flex items-center gap-1"><i className="ri-lightbulb-line text-xs"></i>A4: Knowledge Extraction</span>
            <span className="flex items-center gap-1"><i className="ri-book-open-line text-xs"></i>A5: Think Tank Factory</span>
            <span className="flex items-center gap-1"><i className="ri-search-eye-line text-xs"></i>A6: SEO Knowledge Factory</span>
            <span className="flex items-center gap-1"><i className="ri-database-2-line text-xs"></i>A7: RAG Knowledge Builder</span>
            <span className="flex items-center gap-1"><i className="ri-file-text-line text-xs"></i>A8: Deliverable Generator</span>
            <span className="flex items-center gap-1"><i className="ri-notification-3-line text-xs"></i>A9: Alert Engine</span>
            <span className="flex items-center gap-1 text-secondary-700"><i className="ri-file-search-line text-xs"></i>Tender Bridge: {s.tender_total} AO/AMI LIVE</span>
          </div>
          <p className="text-[10px] text-accent-800/60 mt-3 leading-relaxed">
            Ce hub orchestre les 9 agents du KOS Strategic Intelligence Engine + le Tender Bridge connecté à la base LIVE Supabase.
            <strong className="text-emerald-700"> Mode RÉEL activé</strong> : le Tender Bridge injecte en temps réel les {strategicIntelligenceStats.tender_total} AO/AMI (dont {strategicIntelligenceStats.tender_ami} AMI) détectés via le KOS Tender Intelligence Engine.
            Les agents A1-A9 fonctionnent en mode hybride : données mock pour la démo, connecteurs live pour le Tender Bridge (Supabase).
            Infrastructure : {strategicIntelligenceStats.edge_functions_active} Edge Functions, {strategicIntelligenceStats.cron_jobs_active} cron jobs, {strategicIntelligenceStats.tables_supabase} tables.
          </p>
          <div className="mt-3 pt-3 border-t border-accent-200/40">
            <a href="/kos-tender-intelligence" className="text-xs text-accent-700 hover:text-accent-800 font-medium flex items-center gap-1">
              <i className="ri-arrow-right-line"></i> Accéder au Tender Intelligence Engine — {s.tender_total} AO/AMI · 18,2 Md FCFA pipeline
            </a>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

function StatusDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-foreground-500">
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-amber-400"}`}></span>
      {label}
    </span>
  );
}





