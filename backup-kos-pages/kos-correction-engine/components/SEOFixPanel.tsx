interface SeoFixItem {
  page: string;
  issue: string;
  current: string;
  suggested: string;
  severity: string;
}

interface SEOFixPanelProps {
  seoQueue: SeoFixItem[];
}

export default function SEOFixPanel({ seoQueue }: SEOFixPanelProps) {
  return (
    <div className="space-y-8">
      {/* SEO Fix Queue */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-search-eye-line text-secondary-500"></i>
          File de Correction SEO — Module D
        </h3>
        <p className="text-xs text-foreground-500 mb-4 font-body">7 corrections SEO techniques identifiées — titles, metas, H1, structure, schema.org, canonical</p>
        <div className="space-y-3">
          {seoQueue.map((fix, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-foreground-950 font-heading">{fix.page}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      fix.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      fix.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{fix.severity}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground-700 font-body mb-2">{fix.issue}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wider font-body">Actuel</span>
                      <p className="text-xs text-red-700 font-body mt-1 font-mono break-all">{fix.current || '(vide)'}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                      <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider font-body">Corrigé</span>
                      <p className="text-xs text-emerald-800 font-body mt-1 font-mono break-all">{fix.suggested}</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-background-50 text-xs font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-tools-line text-xs"></i>
                  Appliquer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Best Practices Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <i className="ri-file-text-line"></i>
            </div>
            <h4 className="text-sm font-semibold text-foreground-950 font-heading">Title Tags</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-foreground-500 font-body">≤ 60 caractères</span>
              <span className="font-semibold text-emerald-600 font-body">94%</span>
            </div>
            <div className="w-full bg-background-200 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <i className="ri-file-copy-line"></i>
            </div>
            <h4 className="text-sm font-semibold text-foreground-950 font-heading">Meta Descriptions</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-foreground-500 font-body">120-160 caractères</span>
              <span className="font-semibold text-amber-600 font-body">88%</span>
            </div>
            <div className="w-full bg-background-200 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <i className="ri-code-s-slash-line"></i>
            </div>
            <h4 className="text-sm font-semibold text-foreground-950 font-heading">Schema.org</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-foreground-500 font-body">Markup présent</span>
              <span className="font-semibold text-emerald-600 font-body">95%</span>
            </div>
            <div className="w-full bg-background-200 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





