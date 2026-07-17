interface Ticket {
  id: string;
  priority: string;
  module: string;
  title: string;
  rootCause: string;
  impact: string;
  correction: string;
  estimatedGain: string;
  status: string;
  eta: string;
  validationMethod: string;
}

interface CompressionItem {
  assetType: string;
  currentCompression: string;
  ratio: string;
  status: string;
  sizeBeforeKB: number;
  sizeAfterKB: number;
}

interface ScanResult {
  page: string;
  lcp: number;
  fcp: number;
  cls: number;
  tbt: number;
  weightKB: number;
  status: string;
  issuesFound: number;
}

interface PerformanceFixPanelProps {
  tickets: Ticket[];
  compressionAudit: CompressionItem[];
  scanResults: ScanResult[];
}

export default function PerformanceFixPanel({ tickets, compressionAudit, scanResults }: PerformanceFixPanelProps) {
  const perfFixes = tickets.filter(f => ["A", "B", "C"].includes(f.module));

  return (
    <div className="space-y-8">
      {/* Active Performance Fixes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-speed-up-line text-primary-500"></i>
          Corrections Performance Actives — Modules A, B, C
        </h3>
        <div className="space-y-3">
          {perfFixes.map(fix => (
            <div key={fix.id} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fix.priority === 'P0' ? 'bg-red-100 text-red-700' :
                      fix.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{fix.priority}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-foreground-100 text-foreground-600 font-body">Module {fix.module}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      fix.status === 'in_progress' ? 'bg-primary-100 text-primary-700' : 'bg-background-200 text-foreground-500'
                    }`}>{fix.status === 'in_progress' ? 'En cours' : 'Ouvert'}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 font-heading mb-2">{fix.title}</h4>
                  <p className="text-xs text-foreground-500 mb-3 font-body">{fix.rootCause}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-background-50 rounded-lg p-3">
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider font-body">Impact</span>
                      <p className="text-xs text-foreground-700 font-body mt-0.5">{fix.impact}</p>
                    </div>
                    <div className="bg-background-50 rounded-lg p-3">
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider font-body">Correction</span>
                      <p className="text-xs text-foreground-700 font-body mt-0.5">{fix.correction}</p>
                    </div>
                    <div className="bg-background-50 rounded-lg p-3">
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider font-body">Gain Estimé</span>
                      <p className="text-xs text-emerald-700 font-semibold font-body mt-0.5">{fix.estimatedGain}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-foreground-400 font-body">
                    <span>ETA: {fix.eta}</span>
                    <span>Validation: {fix.validationMethod}</span>
                  </div>
                </div>
                {fix.status === 'in_progress' && (
                  <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-xs font-semibold font-body">
                    <i className="ri-loader-4-line animate-spin"></i>
                    En cours
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compression Audit */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-hard-drive-2-line text-accent-500"></i>
          Audit Compression — Module C
        </h3>
        <div className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-50">
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Type d'asset</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Compression</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Ratio</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Avant</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Après</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground-600 font-body">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {compressionAudit.map((item, idx) => (
                <tr key={idx} className="hover:bg-background-50/50">
                  <td className="px-5 py-3 font-medium text-foreground-800 font-body">{item.assetType}</td>
                  <td className="px-5 py-3 text-foreground-600 font-body">{item.currentCompression}</td>
                  <td className="px-5 py-3 text-emerald-600 font-semibold font-body">{item.ratio}</td>
                  <td className="px-5 py-3 text-foreground-500 font-body">{item.sizeBeforeKB} Ko</td>
                  <td className="px-5 py-3 text-foreground-800 font-body">{item.sizeAfterKB} Ko</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'ok' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Scan Results */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-scan-2-line text-secondary-500"></i>
          Résultats Scan — 10 Pages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scanResults.map(page => (
            <div key={page.page} className="bg-background-100 rounded-xl border border-background-200/70 p-4 hover:border-background-300/80 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground-950 font-heading">{page.page}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  page.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' :
                  page.status === 'ok' ? 'bg-blue-100 text-blue-700' :
                  page.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>{page.status}</span>
              </div>
              <div className="grid grid-cols-6 gap-2 text-center">
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">LCP</span>
                  <p className={`text-xs font-semibold font-body ${page.lcp > 2.5 ? 'text-red-600' : 'text-emerald-600'}`}>{page.lcp}s</p>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">FCP</span>
                  <p className="text-xs font-semibold text-foreground-700 font-body">{page.fcp}s</p>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">CLS</span>
                  <p className={`text-xs font-semibold font-body ${page.cls > 0.1 ? 'text-red-600' : 'text-emerald-600'}`}>{page.cls}</p>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">TBT</span>
                  <p className={`text-xs font-semibold font-body ${page.tbt > 150 ? 'text-red-600' : 'text-emerald-600'}`}>{page.tbt}ms</p>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">Poids</span>
                  <p className={`text-xs font-semibold font-body ${page.weightKB > 2000 ? 'text-red-600' : 'text-emerald-600'}`}>{page.weightKB} Ko</p>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-400 uppercase font-body">Issues</span>
                  <p className="text-xs font-semibold text-foreground-700 font-body">{page.issuesFound}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}