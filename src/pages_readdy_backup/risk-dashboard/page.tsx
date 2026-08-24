import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { mockRisks, mockDashboard, mockRiskFamilies, mockRiskStatuses } from '@/mocks/riskRegister';
import RiskStatsCards from '';
import RiskHeatmap from '';
import RiskTable from '';
import RiskFormModal from '';

interface Risk {
  id: string;
  famille: string;
  libelle: string;
  probabilite: number;
  impact: number;
  score: number;
  kris: Array<{ kri: string; seuil: string; frequence: string }>;
  controles: string[];
  plan_traitement: string;
  responsable: string;
  echeance: string;
  statut: string;
}

interface DashboardRow {
  famille: string;
  nb_risques: number;
  score_moyen: string;
  score_max: number;
}

function BarChart({ data }: { data: DashboardRow[] }) {
  const maxScore = Math.max(...data.map(d => parseFloat(d.score_moyen)), 1);

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
      <h3 className="text-sm font-bold text-foreground-950 mb-4 font-heading">Score moyen par famille</h3>
      <div className="space-y-2.5">
        {data.map(row => {
          const fam = mockRiskFamilies.find(f => f.key === row.famille);
          const pct = (parseFloat(row.score_moyen) / maxScore) * 100;
          return (
            <div key={row.famille} className="flex items-center gap-3">
              <span className="w-24 text-[10px] text-foreground-600 font-body truncate">{fam?.label || row.famille}</span>
              <div className="flex-1 h-5 bg-background-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${fam?.color || 'bg-primary-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-bold text-foreground-700 font-body">{row.score_moyen}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopRisksPanel({ risks }: { risks: Risk[] }) {
  const top = risks.filter(r => r.score >= 15 && (r.statut === 'ouvert' || r.statut === 'en_traitement')).slice(0, 5);

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground-950 font-heading">Top risques critiques</h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 font-body">Score ≥ 15</span>
      </div>
      <div className="space-y-2.5">
        {top.map(risk => {
          const fam = mockRiskFamilies.find(f => f.key === risk.famille);
          const st = mockRiskStatuses.find(s => s.key === risk.statut);
          return (
            <div key={risk.id} className="flex items-start gap-3 p-3 rounded-lg bg-background-100/70 hover:bg-background-100 transition-colors">
              <span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-[10px] font-bold flex-shrink-0 ${risk.score >= 20 ? 'bg-red-500 text-white' : risk.score >= 15 ? 'bg-orange-400 text-white' : 'bg-amber-400 text-foreground-950'}`}>
                {risk.score}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground-950 font-body line-clamp-2">{risk.libelle}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${fam?.lightBg || ''} ${fam?.textColor || ''}`}>
                    <span className={`w-1 h-1 rounded-full ${fam?.color || ''}`} />
                    {fam?.label}
                  </span>
                  <span className={`text-[10px] font-semibold ${st?.color || ''}`}>{st?.label}</span>
                  {risk.echeance && (
                    <span className="text-[10px] text-foreground-500 font-body">{new Date(risk.echeance).toLocaleDateString('fr-FR')}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {top.length === 0 && (
          <p className="text-xs text-foreground-500 font-body text-center py-4">Aucun risque critique actif.</p>
        )}
      </div>
    </div>
  );
}

export default function RiskDashboardPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [dashboard, setDashboard] = useState<DashboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: riskData, error: riskErr } = await supabase
        .from('risk_register')
        .select('*')
        .order('score', { ascending: false })
        .limit(100);

      if (riskErr) {
        console.warn('[RiskDashboard] Supabase error, using mocks:', riskErr.message);
        setRisks(mockRisks);
      } else if (riskData && riskData.length > 0) {
        setRisks(riskData as Risk[]);
      } else {
        setRisks(mockRisks);
      }

      const { data: mvData, error: mvErr } = await supabase
        .from('risk_dashboard_live')
        .select('*')
        .order('score_moyen', { ascending: false });

      if (mvErr) {
        console.warn('[RiskDashboard] MV error, using mocks:', mvErr.message);
        setDashboard(mockDashboard);
      } else if (mvData && mvData.length > 0) {
        setDashboard(mvData as DashboardRow[]);
      } else {
        setDashboard(mockDashboard);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement');
      setRisks(mockRisks);
      setDashboard(mockDashboard);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (formData: any) => {
    try {
      const { data, error: err } = await supabase.from('risk_register').insert(formData).select().single();
      if (err) throw err;
      await supabase.rpc('refresh_risk_dashboard');
      setRisks(prev => [data as Risk, ...prev]);
      showToast('Risque créé avec succès');
    } catch (err: any) {
      setRisks(prev => [{ ...formData, id: crypto.randomUUID(), score: formData.probabilite * formData.impact }, ...prev]);
      showToast('Risque créé (mode local)');
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!editingRisk) return;
    try {
      const { data, error: err } = await supabase.from('risk_register').update(formData).eq('id', editingRisk.id).select().single();
      if (err) throw err;
      await supabase.rpc('refresh_risk_dashboard');
      setRisks(prev => prev.map(r => r.id === editingRisk.id ? (data as Risk) : r));
      showToast('Risque mis à jour');
    } catch (err: any) {
      setRisks(prev => prev.map(r => r.id === editingRisk.id ? { ...r, ...formData, score: formData.probabilite * formData.impact } : r));
      showToast('Risque mis à jour (mode local)');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce risque ?')) return;
    try {
      const { error: err } = await supabase.from('risk_register').delete().eq('id', id);
      if (err) throw err;
      await supabase.rpc('refresh_risk_dashboard');
      setRisks(prev => prev.filter(r => r.id !== id));
      showToast('Risque supprimé');
    } catch (err: any) {
      setRisks(prev => prev.filter(r => r.id !== id));
      showToast('Risque supprimé (mode local)');
    }
  };

  const openEdit = (risk: Risk) => {
    setEditingRisk(risk);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingRisk(null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 font-body tracking-wide">
                  RISK REGISTER
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                  MC-RTG-07
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-1 font-heading">
                Risk Dashboard — KOS Gouvernance
              </h1>
              <p className="text-sm text-foreground-600 font-body max-w-xl">
                Registre des risques temps réel. Scoring automatique <strong>P×I</strong>, vue matérialisée &lt;60s,
                familles UEMOA/CEMAC (BCEAO, COBAC, GAFI, ISSB).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-xs text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer font-body"
              >
                <i className="ri-refresh-line" />
                Rafraîchir
              </button>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap font-body"
              >
                <i className="ri-add-line" />
                Nouveau risque
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
            <i className="ri-alert-line text-amber-600" />
            <span className="text-xs text-amber-800 font-body">{error} — Données mock affichées</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <RiskStatsCards risks={risks} loading={loading} />
      </section>

      {/* Heatmap + BarChart + Top Risks */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RiskHeatmap dashboard={dashboard} loading={loading} />
          </div>
          <div className="space-y-4">
            <BarChart data={dashboard} />
            <TopRisksPanel risks={risks} />
          </div>
        </div>
      </section>

      {/* Risk Table */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <RiskTable risks={risks} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </section>

      {/* Modal */}
      <RiskFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingRisk(null); }}
        onSubmit={editingRisk ? handleUpdate : handleCreate}
        initialData={editingRisk}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-foreground-950 text-white text-xs font-body shadow-lg animate-in">
          <div className="flex items-center gap-2">
            <i className="ri-check-line text-emerald-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}



