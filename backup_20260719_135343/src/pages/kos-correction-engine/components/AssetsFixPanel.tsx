interface JsOptimizationItem {
  bundle: string;
  currentKB: number;
  targetKB: number;
  action: string;
  strategy: string;
  priority: string;
  progress: number;
}

interface ImageQueueItem {
  path: string;
  currentKB: number;
  format: string;
  targetKB: number;
  targetFormat: string;
  action: string;
  priority: string;
  status: string;
}

interface AssetsFixPanelProps {
  jsOptimization: JsOptimizationItem[];
  imageQueue: ImageQueueItem[];
}

export default function AssetsFixPanel({ jsOptimization, imageQueue }: AssetsFixPanelProps) {
  return (
    <div className="space-y-8">
      {/* JavaScript Optimizer — Module E */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-braces-line text-accent-500"></i>
          JavaScript Optimizer — Module E (cible : réduction ≥ 40%)
        </h3>
        <div className="space-y-3">
          {jsOptimization.map((bundle, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      bundle.priority === 'P0' ? 'bg-red-100 text-red-700' :
                      bundle.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{bundle.priority}</span>
                    <h4 className="text-sm font-semibold text-foreground-950 font-heading font-mono">{bundle.bundle}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      bundle.progress === 100 ? 'bg-emerald-100 text-emerald-700' :
                      bundle.progress > 0 ? 'bg-primary-100 text-primary-700' :
                      'bg-background-200 text-foreground-500'
                    }`}>
                      {bundle.progress === 100 ? 'Complété' : bundle.progress > 0 ? `${bundle.progress}%` : 'En attente'}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mb-3 text-xs">
                    <span className="text-foreground-500 font-body">
                      <span className="font-semibold text-foreground-700">{bundle.currentKB} Ko</span> → <span className="font-semibold text-emerald-600">{bundle.targetKB} Ko</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-foreground-50 text-foreground-500 font-body">
                      {bundle.strategy.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-foreground-500 font-body">{bundle.action}</p>

                  {bundle.progress > 0 && bundle.progress < 100 && (
                    <div className="mt-3 w-full bg-background-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${bundle.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                {bundle.progress === 100 && (
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <i className="ri-check-line"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Governance — Module G */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-gallery-line text-secondary-500"></i>
          Image Governance — Module G (PNG &gt; 300 Ko, JPG &gt; 500 Ko interdits)
        </h3>
        <div className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-50">
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Fichier</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Actuel</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Cible</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Action</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Priorité</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {imageQueue.map((img, idx) => (
                <tr key={idx} className="hover:bg-background-50/50">
                  <td className="px-5 py-3 font-mono text-foreground-800 font-body text-[11px]">{img.path}</td>
                  <td className="px-5 py-3">
                    <span className="text-red-600 font-semibold font-body">{img.currentKB} Ko</span>
                    <span className="text-foreground-400 ml-1 font-body">{img.format}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-emerald-600 font-semibold font-body">{img.targetKB} Ko</span>
                    <span className="text-foreground-400 ml-1 font-body">{img.targetFormat}</span>
                  </td>
                  <td className="px-5 py-3 text-foreground-600 font-body text-[11px] max-w-xs">{img.action}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      img.priority === 'P0' ? 'bg-red-100 text-red-700' :
                      img.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{img.priority}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      img.status === 'in_progress' ? 'bg-primary-100 text-primary-700' : 'bg-background-200 text-foreground-500'
                    }`}>
                      {img.status === 'in_progress' ? 'En cours' : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS Optimizer Summary — Module F */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-palette-line text-primary-500"></i>
          CSS Optimizer — Module F (cible : unused &lt; 5%)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { file: "main.css", totalKB: 85, unusedKB: 18, unusedPercent: 21, status: "En cours — purge automatique" },
            { file: "animations.css", totalKB: 32, unusedKB: 14, unusedPercent: 44, status: "En attente — priorité P2" },
            { file: "typography.css", totalKB: 28, unusedKB: 4, unusedPercent: 14, status: "OK — dans la norme" },
            { file: "responsive.css", totalKB: 22, unusedKB: 6, unusedPercent: 27, status: "En cours — split asynchrone" },
            { file: "infographics.css", totalKB: 18, unusedKB: 9, unusedPercent: 50, status: "En attente — priorité P2" },
          ].map((css, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground-950 font-heading font-mono">{css.file}</span>
                <span className="text-xs text-foreground-500 font-body">{css.totalKB} Ko</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-background-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      css.unusedPercent > 40 ? 'bg-red-500' : css.unusedPercent > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${100 - css.unusedPercent}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-semibold text-foreground-500 font-body">{css.unusedPercent}% unused</span>
              </div>
              <p className="text-[10px] text-foreground-400 font-body">{css.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



