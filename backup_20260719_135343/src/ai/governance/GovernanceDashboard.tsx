import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type GovernanceRole = {
  slug: string;
  title: string;
  level: 'board' | 'partner' | 'manager' | 'orchestrator' | 'integrator';
  domain: string;
  risk_appetite: string;
  iso42001_mapping: string;
  responsibility: string;
};

type Decision = {
  decision: string;
  impact_level: string;
  decided_at: string;
  evidence_links: string[];
};

const LEVEL_ORDER: GovernanceRole['level'][] = ['board', 'partner', 'manager', 'orchestrator', 'integrator'];

const LEVEL_LABELS: Record<GovernanceRole['level'], string> = {
  board: 'Board',
  partner: 'Partners',
  manager: 'Managers',
  orchestrator: 'Orchestrateurs',
  integrator: 'Intégrateurs',
};

const LEVEL_ICONS: Record<GovernanceRole['level'], string> = {
  board: 'ri-vip-crown-line',
  partner: 'ri-shake-hands-line',
  manager: 'ri-user-star-line',
  orchestrator: 'ri-flow-chart',
  integrator: 'ri-puzzle-line',
};

const RISK_COLORS: Record<string, string> = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export function GovernanceDashboard() {
  const [roles, setRoles] = useState<GovernanceRole[]>([]);
  const [lastDecision, setLastDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [rolesRes, decisionRes] = await Promise.all([
        supabase
          .from('kos_governance_roles')
          .select('*')
          .eq('active', true)
          .order('level', { ascending: true }),
        supabase
          .from('kos_decision_logs')
          .select('*')
          .order('decided_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      if (rolesRes.error) throw rolesRes.error;
      if (decisionRes.error) throw decisionRes.error;
      setRoles(rolesRes.data || []);
      setLastDecision(decisionRes.data || null);
    } catch (err) {
      setError((err as Error)?.message || 'Erreur chargement données gouvernance');
    } finally {
      setLoading(false);
    }
  };

  const approveGoNoGo = async (decision: 'GO' | 'NO-GO') => {
    try {
      await supabase.from('kos_decision_logs').insert({
        role_slug: 'ai-board-chair',
        decision_type: 'go_nogo',
        decision,
        rationale: 'Validation manuelle Board — ISO 42001 A.9.3',
        impact_level: 'critical',
        decided_by: 'cto@khepra.com',
        iso42001_ref: 'A.9.3',
      });
      loadData();
    } catch (err) {
      setError((err as Error)?.message || 'Erreur enregistrement décision');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-50">
        <div className="text-foreground-700">Chargement gouvernance...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-foreground-950">
            KOS AI Governance — ISO 42001
          </h1>
          <p className="text-foreground-600 mt-1">
            Tableau de bord Board + Partners + Managers. Preuve A.5 Leadership.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <span className="text-red-700 text-sm">{error}</span>
            <button
              onClick={loadData}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 whitespace-nowrap cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Décision GO/NO-GO — Board veto */}
        <div className="mb-8 p-6 bg-background-100 rounded-lg border-l-4 border-accent-500">
          <h2 className="text-xl font-semibold font-heading text-foreground-950">
            Dernière Décision Board
          </h2>
          {lastDecision ? (
            <>
              <p
                className={`text-3xl font-bold mt-2 ${
                  lastDecision.decision === 'GO' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {lastDecision.decision}
              </p>
              <p className="text-sm text-foreground-600 mt-1">
                Impact: {lastDecision.impact_level} |{' '}
                {new Date(lastDecision.decided_at).toLocaleString('fr-FR')}
              </p>
            </>
          ) : (
            <p className="text-2xl mt-2 text-foreground-500">Aucune décision enregistrée</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => approveGoNoGo('GO')}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium whitespace-nowrap cursor-pointer"
            >
              Approuver GO
            </button>
            <button
              onClick={() => approveGoNoGo('NO-GO')}
              className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium whitespace-nowrap cursor-pointer"
            >
              NO-GO
            </button>
          </div>
        </div>

        {/* Matrice Rôles par niveau */}
        {LEVEL_ORDER.map((level) => {
          const levelRoles = roles.filter((r) => r.level === level);
          if (levelRoles.length === 0) return null;

          return (
            <div key={level} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className={`${LEVEL_ICONS[level]} text-lg text-foreground-700`}></i>
                </div>
                <h2 className="text-xl font-semibold font-heading text-foreground-950 capitalize">
                  {LEVEL_LABELS[level]}
                </h2>
                <span className="text-sm text-foreground-500">
                  ({levelRoles.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelRoles.map((role) => (
                  <div
                    key={role.slug}
                    className="p-5 bg-background-100 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground-950">{role.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary-100 text-secondary-900">
                        {role.domain}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-600 mt-3">
                      ISO 42001: {role.iso42001_mapping}
                    </p>
                    <p className="text-xs text-foreground-600 mt-0.5 line-clamp-2">
                      {role.responsibility}
                    </p>
                    <p className="text-xs mt-3">
                      Appétit risque:{' '}
                      <span className={`font-medium ${RISK_COLORS[role.risk_appetite] || 'text-foreground-600'}`}>
                        {role.risk_appetite}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Pied de page ISO */}
        <div className="mt-10 pt-6 border-t border-background-200/70 text-center text-xs text-foreground-500">
          ISO 42001 A.5 Leadership and Commitment — KOS AI Governance System v1.0
        </div>
      </div>
    </div>
  );
}

export default GovernanceDashboard;



