import { securityHeadersStatus as mockSecurity } from '@/mocks/kosPerformanceSEOCommand';

interface SecurityHeader {
  header: string;
  status: string;
  grade: string;
  details: string;
}

interface SecurityTabProps {
  securityHeaders?: SecurityHeader[];
  isLive?: boolean;
}

export default function SecurityTab({ securityHeaders: propSecurity, isLive }: SecurityTabProps) {
  const securityHeadersStatus = propSecurity || mockSecurity;

  return (
    <div className="space-y-8">
      {/* Live Data Badge */}
      {isLive !== undefined && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isLive ? 'Données Live — Supabase' : 'Données Mock — Démo'}
        </div>
      )}

      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Security Headers — Enterprise Grade</h3>
        <div className="space-y-3">
          {securityHeadersStatus.map((h, i) => {
            const gradeColor = h.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : h.grade.startsWith('B') ? 'bg-primary-100 text-primary-700' : 'bg-amber-100 text-amber-700';
            return (
              <div key={i} className="flex items-center gap-4 p-4 bg-background-100 rounded-xl border border-background-200/70">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${gradeColor}`}>
                  <span className="text-xs font-bold font-heading">{h.grade}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <code className="text-sm font-mono text-foreground-950">{h.header}</code>
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold font-body ${h.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {h.status === 'active' ? 'ACTIF' : 'EN COURS'}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-600 font-body">{h.details}</p>
                </div>
                <span className={`text-lg font-bold font-heading shrink-0 ${h.grade.startsWith('A') ? 'text-emerald-600' : 'text-amber-600'}`}>{h.grade}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700 mb-3">
            <i className="ri-shield-check-line text-lg"></i>
          </div>
          <h4 className="text-sm font-semibold text-foreground-950 mb-1 font-heading">Score Global</h4>
          <div className="text-3xl font-bold text-foreground-950 font-heading">A+</div>
          <p className="text-xs text-foreground-500 mt-1 font-body">Enterprise Grade</p>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700 mb-3">
            <i className="ri-lock-line text-lg"></i>
          </div>
          <h4 className="text-sm font-semibold text-foreground-950 mb-1 font-heading">Headers Actifs</h4>
          <div className="text-3xl font-bold text-foreground-950 font-heading">{securityHeadersStatus.filter(h => h.status === 'active').length}/{securityHeadersStatus.length}</div>
          <p className="text-xs text-foreground-500 mt-1 font-body">{securityHeadersStatus.filter(h => h.status === 'active').length} configurés · 0 en cours</p>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 mb-3">
            <i className="ri-bug-line text-lg"></i>
          </div>
          <h4 className="text-sm font-semibold text-foreground-950 mb-1 font-heading">Vulnérabilités</h4>
          <div className="text-3xl font-bold text-emerald-600 font-heading">0</div>
          <p className="text-xs text-foreground-500 mt-1 font-body">Aucune vulnérabilité critique</p>
        </div>
      </div>
    </div>
  );
}