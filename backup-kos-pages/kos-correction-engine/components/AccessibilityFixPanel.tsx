interface AccessibilityFixItem {
  element: string;
  issue: string;
  fix: string;
  wcagCriteria: string;
  severity: string;
  status: string;
}

interface AccessibilityFixPanelProps {
  accessibilityQueue: AccessibilityFixItem[];
}

export default function AccessibilityFixPanel({ accessibilityQueue }: AccessibilityFixPanelProps) {
  const criticalFixes = accessibilityQueue.filter(f => f.severity === 'critical');
  const highFixes = accessibilityQueue.filter(f => f.severity === 'high');
  const mediumFixes = accessibilityQueue.filter(f => f.severity === 'medium');

  return (
    <div className="space-y-8">
      {/* WCAG Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
              <i className="ri-error-warning-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase">Critiques</span>
          </div>
          <span className="text-3xl font-bold text-red-600 font-heading">{criticalFixes.length}</span>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <i className="ri-alert-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase">Hautes</span>
          </div>
          <span className="text-3xl font-bold text-amber-600 font-heading">{highFixes.length}</span>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <i className="ri-information-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase">Moyennes</span>
          </div>
          <span className="text-3xl font-bold text-blue-600 font-heading">{mediumFixes.length}</span>
        </div>
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <i className="ri-wheelchair-line"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-500 font-body uppercase">Score WCAG</span>
          </div>
          <span className="text-3xl font-bold text-emerald-600 font-heading">96%</span>
        </div>
      </div>

      {/* Accessibility Fix Queue */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-wheelchair-line text-primary-500"></i>
          File de Correction Accessibilité — Module I (WCAG 2.2 AA)
        </h3>
        <div className="space-y-3">
          {accessibilityQueue.map((fix, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${
                  fix.severity === 'critical' ? 'bg-red-100 text-red-600' :
                  fix.severity === 'high' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <i className={`text-lg ${
                    fix.severity === 'critical' ? 'ri-error-warning-line' :
                    fix.severity === 'high' ? 'ri-alert-line' :
                    'ri-information-line'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      fix.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      fix.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{fix.severity}</span>
                    <span className="text-xs font-semibold text-foreground-700 font-body">WCAG {fix.wcagCriteria}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 font-heading mt-1">{fix.element}</h4>
                  <p className="text-xs text-foreground-500 font-body mt-1">{fix.issue}</p>
                  <div className="mt-3 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider font-body">Correction proposée</span>
                    <p className="text-xs text-emerald-800 font-body mt-1 font-mono">{fix.fix}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-background-50 text-xs font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap self-start mt-2"
                >
                  <i className="ri-tools-line text-xs"></i>
                  Corriger
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





