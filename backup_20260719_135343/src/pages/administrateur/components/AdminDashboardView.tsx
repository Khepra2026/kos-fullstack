interface AdminDashboardViewProps {
  documentsCount: number;
  clientsCount: number;
  categoriesCount: number;
  totalSize: string;
  categoryStats: Record<string, number>;
  onGenerateOffreEMF: () => void;
  onGenerateBusinessPlan: () => void;
  onGenerateFinancialModel: () => void;
  onGenerateOptasiaUltraClosing: () => void;
  onGenerateLivrable1Fusion: () => void;
  onGenerateLivrable1Synthese: () => void;
  onGenerateMSA: () => void;
  onGenerateOneKYC: () => void;
  onGenerateRituel: () => void;
  onGenerateGrandeArchitecture: () => void;
  generatingDoc: boolean;
  generatingBusinessPlan: boolean;
  generatingModel: boolean;
  generatingOptasia: boolean;
  generatingLivrable1Fusion: boolean;
  generatingLivrable1Synthese: boolean;
  generatingMSA: boolean;
  generatingOneKYC: boolean;
  generatingRituel: boolean;
  generatingGrandeArchitecture: boolean;
  onNavigate: (view: string) => void;
}

const CATEGORY_STATS_LABELS: Record<string, string> = {
  rapport: 'Rapports',
  proposition: 'Propositions',
  contrat: 'Contrats',
  diagnostic: 'Diagnostics',
  strategie: 'Stratégie',
  audit: 'Audits',
  formation: 'Formations',
  presentation: 'Présentations',
  note: 'Notes',
  general: 'Général',
};

export default function AdminDashboardView({
  documentsCount,
  clientsCount,
  categoriesCount,
  totalSize,
  categoryStats,
  onGenerateOffreEMF,
  onGenerateBusinessPlan,
  onGenerateFinancialModel,
  onGenerateOptasiaUltraClosing,
  onGenerateLivrable1Fusion,
  onGenerateLivrable1Synthese,
  onGenerateMSA,
  onGenerateOneKYC,
  onGenerateRituel,
  onGenerateGrandeArchitecture,
  generatingDoc,
  generatingBusinessPlan,
  generatingModel,
  generatingOptasia,
  generatingLivrable1Fusion,
  generatingLivrable1Synthese,
  generatingMSA,
  generatingOneKYC,
  generatingRituel,
  generatingGrandeArchitecture,
  onNavigate,
}: AdminDashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-foreground-950 to-foreground-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-400/30 rounded text-amber-400 text-[10px] font-bold uppercase tracking-wider">Big Four Grade</span>
              <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-400/30 rounded text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Partner Console</span>
            </div>
            <h1 className="text-2xl font-bold">Dossier Administrateur</h1>
            <p className="text-sm text-white/50 mt-1 max-w-lg">Centre de commande privé — Gestion documentaire, génération de livrables, communication stratégique. KHEPRA EXPERTS.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Session sécurisée</span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 relative z-10">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 flex items-center justify-center bg-amber-500/15 rounded-lg">
                <i className="ri-file-list-3-line text-sm text-amber-400"></i>
              </div>
              <span className="text-2xl font-bold text-white">{documentsCount}</span>
            </div>
            <p className="text-xs text-white/40">Documents actifs</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 flex items-center justify-center bg-emerald-500/15 rounded-lg">
                <i className="ri-building-line text-sm text-emerald-400"></i>
              </div>
              <span className="text-2xl font-bold text-white">{clientsCount}</span>
            </div>
            <p className="text-xs text-white/40">Clients</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 flex items-center justify-center bg-sky-500/15 rounded-lg">
                <i className="ri-folder-line text-sm text-sky-400"></i>
              </div>
              <span className="text-2xl font-bold text-white">{categoriesCount}</span>
            </div>
            <p className="text-xs text-white/40">Catégories</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 flex items-center justify-center bg-violet-500/15 rounded-lg">
                <i className="ri-hard-drive-line text-sm text-violet-400"></i>
              </div>
              <span className="text-2xl font-bold text-white">{totalSize}</span>
            </div>
            <p className="text-xs text-white/40">Stockage</p>
          </div>
        </div>
      </div>

      {/* Category distribution */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="bg-white rounded-xl border border-background-200 p-5">
          <h3 className="text-sm font-semibold text-foreground-900 mb-3 flex items-center gap-2">
            <i className="ri-pie-chart-line text-amber-500"></i>
            Répartition documentaire par catégorie
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => onNavigate('documents')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer bg-background-100 text-foreground-700 hover:bg-background-200"
              >
                {CATEGORY_STATS_LABELS[cat] || cat}
                <span className="px-1.5 py-0.5 rounded-full text-xs bg-white/50 font-bold">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick generators grid */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-900 mb-4 flex items-center gap-2">
          <i className="ri-flashlight-line text-amber-500"></i>
          Générateurs Rapides
          <span className="text-xs text-foreground-400 font-normal ml-2">Accès direct aux livrables stratégiques</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* OPTASIA — Ultra Closing */}
          <button
            onClick={onGenerateOptasiaUltraClosing}
            disabled={generatingOptasia}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-amber-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg flex-shrink-0">
              <i className="ri-file-word-line text-lg text-amber-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Note Ultra-Closing OPTASIA</p>
              <p className="text-xs text-foreground-400 mt-0.5">7 pays UEMOA/CEMAC · Niveau McKinsey</p>
            </div>
          </button>

          {/* Livrable 1 Intégré */}
          <button
            onClick={onGenerateLivrable1Fusion}
            disabled={generatingLivrable1Fusion}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-teal-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-teal-100 rounded-lg flex-shrink-0">
              <i className="ri-book-3-line text-lg text-teal-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Livrable 1 Intégré</p>
              <p className="text-xs text-foreground-400 mt-0.5">5 Parties · 200+ pages · KHEPRA × OPTASIA</p>
            </div>
          </button>

          {/* Synthèse CEO */}
          <button
            onClick={onGenerateLivrable1Synthese}
            disabled={generatingLivrable1Synthese}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-orange-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-orange-100 rounded-lg flex-shrink-0">
              <i className="ri-dashboard-3-line text-lg text-orange-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Synthèse CEO ≤50p</p>
              <p className="text-xs text-foreground-400 mt-0.5">Tableau de Bord · 10 actions 90j</p>
            </div>
          </button>

          {/* Business Plan CGI */}
          <button
            onClick={onGenerateBusinessPlan}
            disabled={generatingBusinessPlan}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-teal-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-teal-100 rounded-lg flex-shrink-0">
              <i className="ri-file-word-line text-lg text-teal-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">BP CGI SA V7.0</p>
              <p className="text-xs text-foreground-400 mt-0.5">17 chapitres · Big Four Investment Ready</p>
            </div>
          </button>

          {/* Modèle Financier */}
          <button
            onClick={onGenerateFinancialModel}
            disabled={generatingModel}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-cyan-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-cyan-100 rounded-lg flex-shrink-0">
              <i className="ri-table-line text-lg text-cyan-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Modèle Excel V8.6</p>
              <p className="text-xs text-foreground-400 mt-0.5">20 feuilles SYSCOHADA · DSCR 2,41x</p>
            </div>
          </button>

          {/* OneKYC */}
          <button
            onClick={onGenerateOneKYC}
            disabled={generatingOneKYC}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-violet-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-violet-100 rounded-lg flex-shrink-0">
              <i className="ri-file-shield-2-line text-lg text-violet-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Offre OneKYC</p>
              <p className="text-xs text-foreground-400 mt-0.5">KYC/KYB/UBO/AML/CFT · 10 sections</p>
            </div>
          </button>

          {/* Contrat MSA */}
          <button
            onClick={onGenerateMSA}
            disabled={generatingMSA}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-stone-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-stone-100 rounded-lg flex-shrink-0">
              <i className="ri-file-shield-line text-lg text-stone-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Contrat MSA OPTASIA</p>
              <p className="text-xs text-foreground-400 mt-0.5">9 Titres · 760M FCFA · OHADA/CCJA</p>
            </div>
          </button>

          {/* Offre EMF */}
          <button
            onClick={onGenerateOffreEMF}
            disabled={generatingDoc}
            className="flex items-start gap-3 p-4 rounded-xl border border-background-200 bg-white hover:border-amber-300 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg flex-shrink-0">
              <i className="ri-file-word-line text-lg text-amber-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">Offre EMF CEMAC</p>
              <p className="text-xs text-foreground-400 mt-0.5">Cameroun · Gabon · Congo</p>
            </div>
          </button>

          {/* Rituel Conclave */}
          <button
            onClick={onGenerateRituel}
            disabled={generatingRituel}
            className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:shadow-sm transition-all text-left cursor-pointer disabled:opacity-50"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-amber-200 rounded-lg flex-shrink-0">
              <i className="ri-sun-line text-lg text-amber-700"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground-900 truncate">⚡ Rituel Conclave</p>
              <p className="text-xs text-foreground-400 mt-0.5">Document Sacré · Sceau du 93</p>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="bg-white rounded-xl border border-background-200 p-5">
        <h3 className="text-sm font-semibold text-foreground-900 mb-4 flex items-center gap-2">
          <i className="ri-compass-line text-accent-500"></i>
          Navigation rapide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { view: 'documents' as const, label: 'Documents', desc: 'Gérer, uploader, rechercher', icon: 'ri-folder-line', color: 'bg-teal-50 text-teal-700' },
            { view: 'cgi-documents' as const, label: 'Dossiers CGI SA', desc: 'Investment Committee Ready', icon: 'ri-bank-line', color: 'bg-amber-50 text-amber-700' },
            { view: 'social-media' as const, label: 'Images de Com', desc: '15 templates × 4 formats', icon: 'ri-image-line', color: 'bg-violet-50 text-violet-700' },
            { view: 'agenda' as const, label: 'Agenda Stratégique', desc: 'Scripts, closing, objections', icon: 'ri-calendar-event-line', color: 'bg-rose-50 text-rose-700' },
            { view: 'linkedin-publisher' as const, label: 'LinkedIn Publisher', desc: 'Posts pré-formatés', icon: 'ri-linkedin-fill', color: 'bg-blue-50 text-blue-700' },
          ].map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-background-200 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer text-center"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.color}`}>
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground-900">{item.label}</p>
                <p className="text-xs text-foreground-400 mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



