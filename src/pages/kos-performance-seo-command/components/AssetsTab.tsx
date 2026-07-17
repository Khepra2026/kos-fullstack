import { imageAuditResults, jsAuditResults, cssAuditResults } from '@/mocks/kosPerformanceSEOCommand';

interface AssetsTabProps {
  isLive?: boolean;
}

export default function AssetsTab({ isLive }: AssetsTabProps) {
  return (
    <div className="space-y-8">
      {/* Live Data Badge */}
      {isLive !== undefined && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isLive ? 'Données Live — Supabase' : 'Données Mock — Démo'}
        </div>
      )}

      {/* Images Audit */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Audit Images (cible 100% optimisées)</h3>
        <div className="overflow-x-auto bg-background-50 rounded-xl border border-background-200/70">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200 bg-background-100">
                <th className="text-left py-3 px-3 font-semibold text-foreground-600 font-body">Image</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground-600 font-body">Format</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground-600 font-body">Actuel</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground-600 font-body">Optimisé</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground-600 font-body">Gain</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground-600 font-body">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {imageAuditResults.map((img, i) => {
                const gain = img.currentSizeKB - img.optimizedSizeKB;
                const statusColor = img.status === 'optimal' ? 'text-emerald-600 bg-emerald-50' : img.status === 'high' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
                return (
                  <tr key={i} className="hover:bg-background-100 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="text-foreground-800 font-mono text-[11px] truncate max-w-[220px] block">{img.url}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${img.format === 'AVIF' ? 'bg-emerald-100 text-emerald-700' : img.format === 'WebP' ? 'bg-primary-100 text-primary-700' : img.format === 'SVG' ? 'bg-secondary-100 text-secondary-700' : 'bg-amber-100 text-amber-700'}`}>{img.format}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-foreground-700">{img.currentSizeKB} Ko</td>
                    <td className="py-2.5 px-3 text-center font-mono text-emerald-600">{img.optimizedSizeKB} Ko</td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold text-emerald-600">{gain > 0 ? `-${gain} Ko` : '—'}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${statusColor}`}>
                        {img.status === 'optimal' ? 'Optimal' : img.status === 'high' ? 'Haute priorité' : 'Critique'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-foreground-600 font-body">
              <strong className="text-emerald-600">{imageAuditResults.filter(i => i.status === 'optimal').length}</strong> optimales
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-foreground-600 font-body">
              <strong className="text-amber-600">{imageAuditResults.filter(i => i.status === 'high').length}</strong> haute priorité
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-foreground-600 font-body">
              <strong className="text-red-600">{imageAuditResults.filter(i => i.status === 'critical').length}</strong> critiques
            </span>
          </div>
        </div>
      </div>

      {/* JS Audit */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Audit JavaScript (cible réduction &gt; 40%)</h3>
        <div className="space-y-2">
          {jsAuditResults.map((bundle, i) => {
            const statusColor = bundle.status === 'critical' ? 'border-red-200 bg-red-50' : bundle.status === 'high' ? 'border-amber-200 bg-amber-50' : 'border-primary-200 bg-primary-50';
            return (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${statusColor}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 ${bundle.status === 'critical' ? 'bg-red-100 text-red-700' : bundle.status === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className="ri-braces-line text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <code className="text-sm font-mono text-foreground-950">{bundle.bundle}</code>
                    <span className="text-xs text-foreground-500 font-body">{bundle.currentKB} Ko → {bundle.optimizedKB} Ko</span>
                  </div>
                  <p className="text-xs text-foreground-600 font-body">{bundle.recommendations}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-red-600 font-heading">{bundle.unusedPercent}%</div>
                  <div className="text-[9px] text-foreground-500 font-body">inutilisé</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Audit */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Audit CSS (cible inutilisé &lt; 5%)</h3>
        <div className="space-y-2">
          {cssAuditResults.map((css, i) => {
            const statusColor = css.status === 'high' ? 'border-amber-200 bg-amber-50' : css.status === 'warning' ? 'border-primary-200 bg-primary-50' : 'border-emerald-200 bg-emerald-50';
            return (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${statusColor}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 ${css.status === 'high' ? 'bg-amber-100 text-amber-700' : css.status === 'warning' ? 'bg-primary-100 text-primary-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  <i className="ri-palette-line text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <code className="text-sm font-mono text-foreground-950">{css.file}</code>
                    <span className="text-xs text-foreground-500 font-body">{css.totalKB} Ko total · {css.unusedKB} Ko unused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-body ${css.criticalCSSGenerated ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {css.criticalCSSGenerated ? 'Critical CSS ✓' : 'Critical CSS ✗'}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-amber-600 font-heading">{css.unusedPercent}%</div>
                  <div className="text-[9px] text-foreground-500 font-body">inutilisé</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}