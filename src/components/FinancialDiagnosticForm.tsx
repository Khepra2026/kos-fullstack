import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export default function FinancialDiagnosticForm() {
  const [loading, setLoading] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    p_tenant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    p_company_name: 'Khepra Experts SARL U',
    p_fiscal_year: 2026,
    p_total_assets: 150000000,
    p_revenue: 250000000,
    p_net_income: 18000000,
    p_permanent_capital: 90000000,
    p_fixed_assets: 60000000,
    p_current_assets: 70000000,
    p_current_liabilities: 40000000,
    p_cash: 20000000,
    p_equity: 80000000,
    p_total_debt: 35000000
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultId(null);
    setDiagnosticDetails(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        'calculate_advanced_prudential_diagnostics',
        formData
      );

      if (rpcError) throw rpcError;

      setResultId(data);

      const { data: fetchRecord, error: fetchError } = await supabase
        .from('financial_diagnostics')
        .select('*')
        .eq('id', data)
        .single();

      if (!fetchError && fetchRecord) {
        setDiagnosticDetails(fetchRecord);
      }

    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors du calcul.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-xl border border-amber-500/30">
      <h2 className="text-2xl font-bold mb-2 text-amber-400">
        📊 Observatoire Prudentiel & Financier (UEMOA / CEMAC - SYSCOHADA)
      </h2>
      <p className="text-sm text-slate-400 mb-6">
        Analyse de conformité et calcul automatisé des indicateurs stratégiques.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Nom de l'entreprise</label>
            <input
              type="text"
              value={formData.p_company_name}
              onChange={(e) => setFormData({ ...formData, p_company_name: e.target.value })}
              className="mt-1 w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Exercice Fiscal</label>
            <input
              type="number"
              value={formData.p_fiscal_year}
              onChange={(e) => setFormData({ ...formData, p_fiscal_year: Number(e.target.value) })}
              className="mt-1 w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 px-4 rounded transition shadow-lg cursor-pointer"
        >
          {loading ? 'Calcul en cours...' : 'Lancer le diagnostic prudentiel'}
        </button>
      </form>

      {resultId && (
        <div className="mt-6 p-5 bg-emerald-950/40 border border-emerald-500/60 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-emerald-300">✅ Rapport enregistré avec succès</span>
            <span className="text-xs bg-emerald-900 text-emerald-200 px-2 py-1 rounded">ID: {resultId.slice(0, 8)}...</span>
          </div>

          {diagnosticDetails && (
            <div className="space-y-3 text-sm border-t border-emerald-800/50 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 block text-xs">Statut de Conformité</span>
                  <span className="font-bold text-amber-400 uppercase">{diagnosticDetails.compliance_status}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 block text-xs">Fonds de Roulement (FR)</span>
                  <span className="font-bold text-white">{Number(diagnosticDetails.working_capital || 0).toLocaleString()} XOF</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 block text-xs">Besoin en Fonds de Roulement (BFR)</span>
                  <span className="font-bold text-white">{Number(diagnosticDetails.bfr || 0).toLocaleString()} XOF</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 block text-xs">Trésorerie Nette</span>
                  <span className="font-bold text-emerald-400">{Number(diagnosticDetails.net_cash || 0).toLocaleString()} XOF</span>
                </div>
              </div>

              {diagnosticDetails.recommendations && (
                <div className="bg-slate-900/90 p-3 rounded border border-amber-500/30 mt-3">
                  <span className="text-amber-400 font-semibold block mb-1">💡 Recommandations Stratégiques :</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{diagnosticDetails.recommendations}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-rose-950/50 border border-rose-500 rounded text-rose-300">
          <p className="font-semibold">❌ Erreur :</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
