import { useState } from "react";
import KOSHubLayout from "@/components/feature/KOSHubLayout";
import { useBacklinkDetect } from "@/hooks/useBacklinkDetect";
import {
  backlinkAuditOverview,
  backlinkCampaignPipeline,
  campagneStats,
  competitiveAnalysis,
  contenuLinkableAudit,
  contenuStats,
  outreachStrategy,
  planning12Mois,
  quickWinsAudit,
} from "@/mocks/backlinkIntelligenceAudit";

const getStatusLabel = (s: string) => {
  const map: Record<string, string> = { acquis: "Acquis", en_discussion: "En Discussion", contacte: "Contacté", a_contacter: "À Contacter", refuse: "Refusé" };
  return map[s] || s;
};

const getStatusColor = (s: string) => {
  const map: Record<string, string> = {
    acquis: "bg-green-100 text-green-700",
    en_discussion: "bg-accent-100 text-accent-700",
    contacte: "bg-secondary-100 text-secondary-700",
    a_contacter: "bg-background-200 text-foreground-500",
    refuse: "bg-red-100 text-red-600",
  };
  return map[s] || "bg-background-100 text-foreground-500";
};

const getPrioriteColor = (p: string) => {
  const map: Record<string, string> = {
    critique: "bg-red-100 text-red-700",
    elevee: "bg-accent-100 text-accent-700",
    moyenne: "bg-secondary-100 text-secondary-700",
  };
  return map[p] || "bg-background-100 text-foreground-500";
};

const getCategorieIcon = (c: string) => {
  const map: Record<string, string> = {
    "Institution Financière": "ri-bank-line",
    "Organisation Internationale": "ri-global-line",
    "Université & Think Tank": "ri-book-open-line",
    "Média Économique": "ri-newspaper-line",
    "Plateforme Fintech": "ri-smartphone-line",
  };
  return map[c] || "ri-link-m";
};

const getContenuTypeLabel = (t: string) => {
  const map: Record<string, string> = {
    rapport_annuel: "Rapport Annuel",
    guide_premium: "Guide Premium",
    lead_magnet: "Lead Magnet",
    livre_blanc: "Livre Blanc",
    case_study: "Case Study",
    think_tank: "Think Tank",
    recherche_originale: "Recherche Originale",
    framework: "Framework",
  };
  return map[t] || t;
};

const getContenuTypeColor = (t: string) => {
  const map: Record<string, string> = {
    rapport_annuel: "bg-green-100 text-green-700",
    guide_premium: "bg-secondary-100 text-secondary-900",
    lead_magnet: "bg-accent-100 text-accent-700",
    livre_blanc: "bg-secondary-100 text-secondary-700",
    case_study: "bg-accent-100 text-accent-900",
    think_tank: "bg-yellow-100 text-yellow-700",
    recherche_originale: "bg-green-100 text-green-700",
    framework: "bg-secondary-100 text-secondary-700",
  };
  return map[t] || "bg-background-100 text-foreground-500";
};

const getStatutContenuColor = (s: string) => {
  const map: Record<string, string> = {
    publie: "bg-green-100 text-green-700",
    en_preparation: "bg-accent-100 text-accent-700",
    planifie: "bg-secondary-100 text-secondary-600",
  };
  return map[s] || "bg-background-100 text-foreground-500";
};

const formatNumber = (n: number) => n.toLocaleString("fr-FR");
const formatMillions = (n: number) => (n / 1000000).toFixed(1) + " M";

export default function KOSBacklinkIntelligenceAuditPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCible, setSelectedCible] = useState<string | null>(null);
  const [selectedConcurrent, setSelectedConcurrent] = useState<string | null>(null);
  const [filtreStatut, setFiltreStatut] = useState<string>("tous");
  const [filtrePriorite, setFiltrePriorite] = useState<string>("tous");

  // Backlink scanner hook
  const { opportunities: scannedOpps, dataSource: backlinkDS, loading: scanningOpps, runDetection } = useBacklinkDetect();
  const [scanActive, setScanActive] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const handleScanOpportunities = async () => {
    setScanActive(true);
    setScanMessage('Scan en cours — Edge Function kos-backlink-detect activée...');
    try {
      await runDetection();
      setScanMessage(`Scan terminé ! ${scannedOpps.length} opportunités backlink détectées. Rafraîchissement...`);
    } catch {
      setScanMessage('Erreur scan — données mock conservées.');
    }
    setTimeout(() => {
      setScanActive(false);
      setScanMessage('');
    }, 6000);
  };

  const tabs = [
    { id: "overview", label: "Vue d'Ensemble", icon: "ri-dashboard-line" },
    { id: "campaign", label: "Campagne Acquisition", icon: "ri-link-m" },
    { id: "competitive", label: "Analyse Concurrentielle", icon: "ri-bar-chart-grouped-line" },
    { id: "content", label: "Contenu Linkable", icon: "ri-file-text-line" },
    { id: "outreach", label: "Stratégie Outreach", icon: "ri-mail-send-line" },
    { id: "planning", label: "Planning 12 Mois", icon: "ri-calendar-line" },
    { id: "quickwins", label: "Quick Wins", icon: "ri-flashlight-line" },
  ];

  const filteredCibles = backlinkCampaignPipeline.filter((c) => {
    if (filtreStatut !== "tous" && c.statut !== filtreStatut) return false;
    if (filtrePriorite !== "tous" && c.priorite !== filtrePriorite) return false;
    return true;
  });

  return (
    <KOSHubLayout hubId={63}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
              KOS Backlink Intelligence Audit
            </h1>
            <p className="text-sm text-foreground-600 mt-1">
              Audit Netlinking — 35 Cibles • 5 Catégories • Pipeline Acquisition • DA Cible 45
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background-100 rounded-md px-3 py-1.5">
              <span className="text-xs text-foreground-500">DA Actuel</span>
              <span className="text-lg font-semibold text-foreground-950">{backlinkAuditOverview.domain_authority_actuel}</span>
              <span className="text-xs text-foreground-400">/ {backlinkAuditOverview.domain_authority_cible}</span>
            </div>
            <div className={`px-3 py-1.5 rounded-md text-xs font-medium ${
              backlinkAuditOverview.score_global < 50 ? "bg-red-100 text-red-700" : "bg-accent-100 text-accent-700"
            }`}>
              Score {backlinkAuditOverview.score_global}/100
            </div>
            {/* Data source badge */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              backlinkDS === 'supabase' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                backlinkDS === 'supabase' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}></span>
              {backlinkDS === 'supabase' ? 'DONNÉES LIVE' : 'MOCK'}
            </div>
            {/* Scanner Opportunités button */}
            <button
              onClick={handleScanOpportunities}
              disabled={scanActive || scanningOpps}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                scanActive || scanningOpps
                  ? 'bg-background-200 text-foreground-400'
                  : 'bg-primary-500 text-background-50 hover:bg-primary-600 shadow-sm'
              }`}
              type="button"
            >
              <i className={`text-sm ${scanActive || scanningOpps ? 'ri-loader-4-line animate-spin' : 'ri-radar-line'}`}></i>
              {scanActive || scanningOpps ? 'Scan en cours...' : 'Scanner Opportunités'}
            </button>
          </div>
        </div>

        {/* Scan Status Banner */}
        {scanMessage && (
          <div className={`mt-4 px-4 py-2.5 rounded-lg text-xs font-medium font-body ${
            scanActive ? 'bg-primary-50 text-primary-700 border border-primary-200 animate-pulse' :
            backlinkDS === 'supabase' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              <i className={`text-sm ${
                scanActive ? 'ri-loader-4-line animate-spin' :
                backlinkDS === 'supabase' ? 'ri-check-line' : 'ri-close-line'
              }`}></i>
              {scanMessage}
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4 mb-8">
          {[
            { label: "Backlinks", value: backlinkAuditOverview.backlinks_totaux, icon: "ri-link-m", sub: `+${backlinkAuditOverview.backlinks_acquis_30j} ce mois` },
            { label: "Domaines Référents", value: backlinkAuditOverview.domaines_referents_actuels, icon: "ri-global-line", sub: `cible ${backlinkAuditOverview.domaines_referents_cible}` },
            { label: "DA Actuel", value: backlinkAuditOverview.domain_authority_actuel, icon: "ri-bar-chart-line", color: "text-yellow-600", sub: `cible ${backlinkAuditOverview.domain_authority_cible}` },
            { label: "Trafic/Mois", value: formatNumber(backlinkAuditOverview.trafic_organique_mensuel), icon: "ri-line-chart-line", sub: `cible ${formatNumber(backlinkAuditOverview.trafic_cible_mensuel)}` },
            { label: "Pages Linkées", value: `${backlinkAuditOverview.pages_avec_backlinks}/${backlinkAuditOverview.pages_indexees}`, icon: "ri-pages-line", color: "text-red-500", sub: "ratio 16%" },
            { label: "Cibles Pipeline", value: campagneStats.total_cibles, icon: "ri-radar-line", color: "text-accent-600", sub: `${campagneStats.acquis} acquis` },
            { label: "Critiques", value: campagneStats.priorite_critique, icon: "ri-alert-line", color: "text-red-500", sub: "haute priorité" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                <i className={`${stat.icon} ${stat.color || "text-foreground-500"}`}></i>
                {stat.label}
              </div>
              <div className="text-xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
              <div className="text-xs text-foreground-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* DA Progression */}
        <div className="bg-white border border-background-200/70 rounded-lg p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground-700">Progression Domain Authority — 6 mois</span>
            <span className="text-sm text-foreground-500">+{backlinkAuditOverview.progression_da[5].da - backlinkAuditOverview.progression_da[0].da} points</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {backlinkAuditOverview.progression_da.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-medium text-foreground-700">{m.da}</div>
                <div
                  className="w-full bg-accent-500 rounded-t-md transition-all"
                  style={{ height: `${(m.da / 45) * 80}px` }}
                ></div>
                <div className="text-xs text-foreground-500">{m.mois}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes */}
        <div className="space-y-2 mb-8">
          {backlinkAuditOverview.alertes.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-lg border ${
              a.niveau === "critique" ? "bg-red-50 border-red-200" : a.niveau === "haute" ? "bg-accent-50 border-accent-200" : "bg-secondary-50 border-secondary-200"
            }`}>
              <i className={`mt-0.5 ${
                a.niveau === "critique" ? "ri-error-warning-fill text-red-500" : a.niveau === "haute" ? "ri-alert-fill text-accent-500" : "ri-information-fill text-secondary-500"
              }`}></i>
              <div>
                <div className="text-sm font-medium text-foreground-800">{a.message}</div>
                <div className="text-xs text-foreground-500 mt-0.5">{a.impact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 w-fit overflow-x-auto sticky top-20 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Campaign Pipeline */}
        {activeTab === "campaign" && (
          <div>
            {/* Filtres */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-1 bg-background-100 rounded-full p-1">
                {["tous", "acquis", "en_discussion", "contacte", "a_contacter"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltreStatut(f)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      filtreStatut === f ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                    }`}
                  >
                    {f === "tous" ? "Tous" : getStatusLabel(f)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 bg-background-100 rounded-full p-1">
                {["tous", "critique", "elevee", "moyenne"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltrePriorite(f)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      filtrePriorite === f ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                    }`}
                  >
                    {f === "tous" ? "Toutes" : f === "critique" ? "🔴 Critiques" : f === "elevee" ? "🟠 Élevées" : "🟡 Moyennes"}
                  </button>
                ))}
              </div>
              <span className="text-xs text-foreground-500">{filteredCibles.length} cible{filteredCibles.length > 1 ? "s" : ""}</span>
            </div>

            {/* Cibles */}
            <div className="space-y-3">
              {filteredCibles.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCible(selectedCible === c.id ? null : c.id)}
                  className="bg-white border border-background-200/70 rounded-lg p-5 cursor-pointer hover:border-background-300/70 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-100 text-foreground-500 flex-shrink-0">
                        <i className={getCategorieIcon(c.categorie)}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-foreground-900">{c.nom}</span>
                          <span className="text-xs px-2 py-0.5 bg-secondary-100 text-secondary-700 rounded-full font-medium">DA {c.da}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(c.statut)}`}>{getStatusLabel(c.statut)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPrioriteColor(c.priorite)}`}>
                            {c.priorite === "critique" ? "🔴 Critique" : c.priorite === "elevee" ? "🟠 Élevée" : "🟡 Moyenne"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground-500 mb-1 flex-wrap">
                          <span>{c.url}</span>
                          <span>•</span>
                          <span>{formatNumber(c.trafic_mensuel)} visites/mois</span>
                          <span>•</span>
                          <span>Page cible: {c.page_cible}</span>
                        </div>
                        <div className="text-xs text-foreground-600 bg-background-50 p-2 rounded mt-2">{c.notes}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-foreground-500">Pipeline :</span>
                          <span className="text-xs font-medium text-foreground-700">{c.etape}</span>
                          <span className="text-xs text-foreground-500">Probabilité :</span>
                          <span className={`text-xs font-medium ${c.probabilite >= 50 ? "text-green-600" : c.probabilite >= 25 ? "text-accent-600" : "text-red-500"}`}>{c.probabilite}%</span>
                        </div>

                        {/* Expanded detail */}
                        {selectedCible === c.id && (
                          <div className="mt-3 pt-3 border-t border-background-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <div className="text-xs text-foreground-500 mb-1">Contact</div>
                              <div className="text-sm font-medium text-foreground-800">{c.contact}</div>
                            </div>
                            <div>
                              <div className="text-xs text-foreground-500 mb-1">Type de Lien</div>
                              <div className="text-sm text-foreground-800">
                                {c.type_lien === "citation_rapport" ? "Citation Rapport" :
                                 c.type_lien === "article_invite" ? "Article Invité" :
                                 c.type_lien === "partenariat" ? "Partenariat" :
                                 c.type_lien === "interview" ? "Interview" : c.type_lien}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-foreground-500 mb-1">Catégorie</div>
                              <div className="text-sm text-foreground-800">{c.categorie}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Competitive Analysis */}
        {activeTab === "competitive" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Concurrents Table */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Comparaison Concurrentielle</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-2 px-2 text-xs text-foreground-500 font-medium">Cabinet</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">DA</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">DR</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Backlinks</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Domaines</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Trafic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitiveAnalysis.concurrents.map((c, i) => (
                        <tr
                          key={i}
                          onClick={() => setSelectedConcurrent(selectedConcurrent === c.nom ? null : c.nom)}
                          className={`border-b border-background-100 cursor-pointer transition-colors hover:bg-background-50 ${
                            c.nom === "KHEPRA Experts" ? "bg-accent-50/50" : ""
                          }`}
                        >
                          <td className="py-2.5 px-2 font-medium text-foreground-800">{c.nom}</td>
                          <td className="py-2.5 px-2 text-center">{c.da}</td>
                          <td className="py-2.5 px-2 text-center">{c.dr}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.backlinks)}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.domaines_referents)}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.trafic_organique)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gap Analysis */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Gap Analysis — Écart vs Big Four</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Domain Authority</span>
                      <span className="text-xs font-medium text-red-600">Gap ×{Math.round(competitiveAnalysis.gap_analysis.da_gap / backlinkAuditOverview.domain_authority_actuel)}</span>
                    </div>
                    <div className="w-full bg-background-100 rounded-full h-2">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(backlinkAuditOverview.domain_authority_actuel / 65) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-foreground-500">KHEPRA {backlinkAuditOverview.domain_authority_actuel}</span>
                      <span className="text-xs text-foreground-500">Deloitte 65</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Backlinks</span>
                      <span className="text-xs font-medium text-red-600">Gap {formatNumber(competitiveAnalysis.gap_analysis.backlinks_gap)}</span>
                    </div>
                    <div className="w-full bg-background-100 rounded-full h-2">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(backlinkAuditOverview.backlinks_totaux / 12400) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-foreground-500">KHEPRA {backlinkAuditOverview.backlinks_totaux}</span>
                      <span className="text-xs text-foreground-500">Deloitte 12 400</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Domaines Référents</span>
                      <span className="text-xs font-medium text-red-600">Gap {formatNumber(competitiveAnalysis.gap_analysis.domaines_gap)}</span>
                    </div>
                    <div className="w-full bg-background-100 rounded-full h-2">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(backlinkAuditOverview.domaines_referents_actuels / 3200) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-foreground-500">KHEPRA {backlinkAuditOverview.domaines_referents_actuels}</span>
                      <span className="text-xs text-foreground-500">Deloitte 3 200</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-background-200/70">
                    <div className="text-xs text-foreground-500 mb-2">Temps estimé pour atteindre le niveau compétitif</div>
                    <div className="text-lg font-semibold text-foreground-900">{competitiveAnalysis.gap_analysis.temps_estime_competitif}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions prioritaires */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-3">5 Actions Prioritaires pour Combler le Gap</h3>
              <div className="space-y-2">
                {competitiveAnalysis.gap_analysis.actions_prioritaires.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-background-50 rounded">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Content Linkable */}
        {activeTab === "content" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="bg-white border border-background-200/70 rounded-lg p-4">
                <div className="text-xs text-foreground-500 mb-1">Assets Publiés</div>
                <div className="text-2xl font-semibold text-foreground-950">{contenuStats.publies}/{contenuStats.total_assets}</div>
              </div>
              <div className="bg-white border border-background-200/70 rounded-lg p-4">
                <div className="text-xs text-foreground-500 mb-1">Backlinks Générés</div>
                <div className="text-2xl font-semibold text-foreground-950">{contenuStats.backlinks_generes}</div>
              </div>
              <div className="bg-white border border-background-200/70 rounded-lg p-4">
                <div className="text-xs text-foreground-500 mb-1">Téléchargements Cumulés</div>
                <div className="text-2xl font-semibold text-foreground-950">{formatNumber(contenuStats.telechargements_cumules)}</div>
              </div>
              <div className="bg-white border border-background-200/70 rounded-lg p-4">
                <div className="text-xs text-foreground-500 mb-1">Potentiel Backlinks</div>
                <div className="text-2xl font-semibold text-accent-600">{contenuStats.potentiel_backlinks_total}</div>
              </div>
            </div>
            <div className="space-y-3">
              {contenuLinkableAudit.map((c) => (
                <div key={c.id} className="bg-white border border-background-200/70 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-100 text-foreground-500 flex-shrink-0">
                      <i className="ri-file-text-line"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-foreground-900">{c.titre}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getContenuTypeColor(c.type)}`}>{getContenuTypeLabel(c.type)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatutContenuColor(c.statut)}`}>
                          {c.statut === "publie" ? "Publié" : c.statut === "en_preparation" ? "En préparation" : "Planifié"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-foreground-500 mt-2 flex-wrap">
                        {c.statut === "publie" && (
                          <>
                            <span><i className="ri-link-m mr-1"></i>{c.backlinks} backlinks</span>
                            <span><i className="ri-download-line mr-1"></i>{c.telechargements} téléchargements</span>
                          </>
                        )}
                        <span><i className="ri-calendar-line mr-1"></i>{c.date_publication}</span>
                        <span>Potentiel: {c.potentiel_backlinks} backlinks</span>
                        <span>DA Cible: {c.da_cible}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-foreground-500">Contribution backlinks :</span>
                        <div className="w-32 bg-background-100 rounded-full h-1.5">
                          <div className="h-full bg-accent-500 rounded-full" style={{ width: `${Math.min((c.backlinks / c.potentiel_backlinks) * 100, 100)}%` }}></div>
                        </div>
                        <span className="text-xs text-foreground-700">{Math.round((c.backlinks / Math.max(c.potentiel_backlinks, 1)) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Outreach Strategy */}
        {activeTab === "outreach" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Templates */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Templates Outreach</h3>
                <div className="space-y-3">
                  {outreachStrategy.templates.map((t) => (
                    <div key={t.id} className="p-4 bg-background-50 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground-800">{t.nom}</span>
                      </div>
                      <div className="text-xs text-foreground-500 mb-2">Objet : {t.objet}</div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-green-600">Ouverture {t.taux_ouverture}%</span>
                        <span className="text-accent-600">Réponse {t.taux_reponse}%</span>
                        <span className="text-secondary-600">Conversion {t.taux_conversion}%</span>
                        <span className="text-foreground-500">{t.exemples_envoyes} envoyés</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sequence */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Séquence Outreach — 5 Étapes</h3>
                <div className="space-y-3">
                  {outreachStrategy.sequences.map((s) => (
                    <div key={s.etape} className="flex items-start gap-3 p-3 bg-background-50 rounded">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-bold flex-shrink-0">
                        {s.etape}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium text-foreground-800">{s.nom}</span>
                          <span className="text-xs text-foreground-500">{s.delai}</span>
                        </div>
                        <div className="text-xs text-foreground-600">{s.action}</div>
                        <div className="text-xs text-green-600 mt-1">Taux succès cumulé : {s.taux_succes}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KPIs Outreach */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">KPIs Outreach — 30 derniers jours</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Emails Envoyés", value: outreachStrategy.kpis.emails_envoyes_30j, icon: "ri-mail-line" },
                  { label: "Taux Ouverture", value: outreachStrategy.kpis.taux_ouverture_moyen + "%", icon: "ri-eye-line" },
                  { label: "Taux Réponse", value: outreachStrategy.kpis.taux_reponse_moyen + "%", icon: "ri-chat-1-line" },
                  { label: "Taux Conversion", value: outreachStrategy.kpis.taux_conversion_moyen + "%", icon: "ri-link-m", color: "text-green-600" },
                  { label: "Backlinks Générés", value: outreachStrategy.kpis.backlinks_generes_outreach, icon: "ri-check-double-line", color: "text-accent-600" },
                  { label: "Coût/Backlink", value: outreachStrategy.kpis.cout_par_backlink, icon: "ri-money-dollar-circle-line", color: "text-green-600" },
                ].map((kpi, i) => (
                  <div key={i} className="text-center p-3 bg-background-50 rounded">
                    <i className={`${kpi.icon} ${kpi.color || "text-foreground-400"} text-lg mb-1`}></i>
                    <div className="text-xl font-semibold text-foreground-950">{kpi.value}</div>
                    <div className="text-xs text-foreground-500">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Planning 12 Mois */}
        {activeTab === "planning" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {planning12Mois.trimestres.map((t, i) => (
                <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground-800">{t.nom}</h3>
                    <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">{t.mois}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3 text-xs">
                    <span className="text-foreground-500">Objectif : <strong className="text-foreground-800">{t.objectif_backlinks} backlinks</strong></span>
                    <span className="text-foreground-500">DA Cible : <strong className="text-foreground-800">{t.kpis.da_attendu}</strong></span>
                  </div>
                  <ul className="space-y-1.5">
                    {t.livrables.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-accent-500 mt-1.5 flex-shrink-0"></i>
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Milestones Timeline */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Roadmap — Jalons Clés</h3>
              <div className="relative pl-6 border-l-2 border-background-200/70 space-y-4">
                {planning12Mois.milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute left-[-1.15rem] top-1 w-3 h-3 rounded-full border-2 border-white ${
                      m.statut === "en_cours" ? "bg-accent-500" : "bg-background-300"
                    }`}></div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-foreground-500">{m.date}</span>
                      {m.statut === "en_cours" && (
                        <span className="text-xs px-1.5 py-0.5 bg-accent-100 text-accent-700 rounded-full">En cours</span>
                      )}
                    </div>
                    <div className="text-sm text-foreground-700">{m.evenement}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Quick Wins */}
        {activeTab === "quickwins" && (
          <div className="space-y-3">
            {quickWinsAudit.map((win, i) => (
              <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5 flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 flex-shrink-0">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground-900 mb-2">{win.action}</div>
                  <div className="flex items-center gap-3 text-xs flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      win.impact === "critique" ? "bg-red-100 text-red-700" : win.impact === "élevé" ? "bg-accent-100 text-accent-700" : "bg-secondary-100 text-secondary-700"
                    }`}>
                      Impact {win.impact === "critique" ? "🔴 Critique" : win.impact === "élevé" ? "🟠 Élevé" : "🟡 Moyen"}
                    </span>
                    <span className="text-foreground-500">Effort : {win.effort}</span>
                    <span className="text-green-600 font-medium">+{win.backlinks_estimes} backlinks estimés</span>
                    <span className="text-green-600">{win.cout}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}