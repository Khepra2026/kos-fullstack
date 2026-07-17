interface SecurityPlanItem {
  header: string;
  currentStatus: string;
  targetStatus: string;
  action: string;
  complexity: string;
  priority: string;
  eta: string;
}

interface SecurityFixPanelProps {
  securityPlan: SecurityPlanItem[];
}

export default function SecurityFixPanel({ securityPlan }: SecurityFixPanelProps) {
  return (
    <div className="space-y-8">
      {/* Security Headers Status */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-shield-check-line text-accent-500"></i>
          Plan de Correction Sécurité — Module H
        </h3>
        <p className="text-xs text-foreground-500 mb-4 font-body">4 actions de hardening restantes — Enterprise Grade cible A+ sur tous les headers</p>

        <div className="space-y-3">
          {securityPlan.map((fix, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-5 hover:border-background-300/80 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-foreground-950 font-heading font-mono">{fix.header}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      fix.priority === 'P1' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>{fix.priority}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      fix.complexity === 'high' ? 'bg-red-100 text-red-700' :
                      fix.complexity === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>Complexité : {fix.complexity}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-xs">
                    <span className="text-foreground-500 font-body">
                      Status : <span className="font-semibold text-amber-600">{fix.currentStatus}</span> → <span className="font-semibold text-emerald-600">{fix.targetStatus}</span>
                    </span>
                    <span className="text-foreground-400 font-body">ETA : {fix.eta}</span>
                  </div>

                  <p className="text-xs text-foreground-600 font-body">{fix.action}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500 text-background-50 text-xs font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-shield-check-line text-xs"></i>
                  Hardening
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Headers Summary */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-lock-password-line text-secondary-500"></i>
          Headers de Sécurité Actuels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { header: "Content-Security-Policy", grade: "A", status: "active" },
            { header: "Strict-Transport-Security", grade: "A+", status: "active" },
            { header: "X-Frame-Options", grade: "A", status: "active" },
            { header: "X-Content-Type-Options", grade: "A+", status: "active" },
            { header: "Referrer-Policy", grade: "A", status: "active" },
            { header: "Permissions-Policy", grade: "A-", status: "active" },
            { header: "Cross-Origin-Opener-Policy", grade: "A", status: "active" },
            { header: "Cross-Origin-Embedder-Policy", grade: "B+", status: "active" },
            { header: "Trusted Types", grade: "B", status: "planned" },
          ].map((h, idx) => (
            <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-foreground-950 font-heading font-mono">{h.header}</span>
                <p className="text-[10px] text-foreground-400 font-body mt-0.5">Status : {h.status}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                h.grade === 'A+' ? 'bg-emerald-100 text-emerald-700' :
                h.grade === 'A' ? 'bg-emerald-50 text-emerald-600' :
                h.grade === 'A-' ? 'bg-blue-100 text-blue-700' :
                h.grade === 'B+' ? 'bg-amber-50 text-amber-600' :
                'bg-amber-100 text-amber-700'
              }`}>{h.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}