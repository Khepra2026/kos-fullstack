import { useState, useCallback, useMemo } from 'react';
import { evaluateNPL, type NPLResult } from '@/utils/khepraCalculNPL';
import { checkNPLViaGateway, isGatewayAvailable, type GatewayResult } from '@/utils/apiGateway';

interface NPLCalculatorProps {
  regulateur: string;
  pays: string;
  devise: string;
}

type NPLResultWithSource = NPLResult & { source?: 'gateway' | 'client' };

export default function NPLCalculator({ regulateur, pays, devise }: NPLCalculatorProps) {
  const [ratio, setRatio] = useState(42);
  const [montantAcquisition, setMontantAcquisition] = useState(500);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultSource, setResultSource] = useState<'gateway' | 'client'>('client');

  const gatewayReady = isGatewayAvailable();

  const result: NPLResult = useMemo(() => evaluateNPL(ratio, regulateur), [ratio, regulateur]);

  const ajustementMontant = useMemo(() => {
    return (montantAcquisition * Math.abs(result.ajustementPrix)) / 100;
  }, [montantAcquisition, result.ajustementPrix]);

  const prixAjuste = useMemo(() => {
    return montantAcquisition + (montantAcquisition * result.ajustementPrix) / 100;
  }, [montantAcquisition, result.ajustementPrix]);

  const handleSimuler = useCallback(async () => {
    setLoading(true);
    const gatewayResult: GatewayResult<NPLResult> = await checkNPLViaGateway(
      ratio,
      pays,
      regulateur,
      evaluateNPL
    );
    setResultSource(gatewayResult.source);
    setShowResult(true);
    setLoading(false);
  }, [ratio, pays, regulateur]);

  const handleRatioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRatio(Number(e.target.value));
    setShowResult(false);
  }, []);

  const getGaugeColor = useCallback((r: number): string => {
    if (r < 40) return '#EF4444';
    if (r < result.seuil) return '#F59E0B';
    return '#10B981';
  }, [result.seuil]);

  const statutConfig = useMemo(() => {
    if (result.statut === 'critique') return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700', icon: 'ri-close-circle-fill', label: 'Critique' };
    if (result.statut === 'surveillance') return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', icon: 'ri-alert-fill', label: 'Sous surveillance' };
    return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', icon: 'ri-checkbox-circle-fill', label: 'Conforme' };
  }, [result.statut]);

  return (
    <section className="py-14" style={{ background: 'linear-gradient(135deg, #faf9f6 0%, #f5f0e8 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.4)', color: '#D4A82A' }}>
            <i className="ri-calculator-line mr-1.5"></i>
            Outil Interactif
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simulateur NPL <span className="text-gold-600">{regulateur}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Évaluez instantanément l'impact du ratio NPL sur la valorisation d'une cible au <strong>{pays}</strong>.
            Seuil {regulateur} : <strong className="text-gold-600">{result.seuil}%</strong> minimum.
          </p>
          {gatewayReady && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-700">
                <i className="ri-cloud-line mr-1"></i>
                KHEPRA Gateway actif — logs Supabase activés
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* LEFT — Inputs */}
            <div className="p-8 lg:p-10 space-y-8">
              {/* Ratio Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="ri-funds-line text-gold-500 text-lg"></i>
                    Ratio NPL de la cible (%)
                  </label>
                  <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: getGaugeColor(ratio) }}
                  >
                    {ratio}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ratio}
                  onChange={handleRatioChange}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #EF4444 0%, #F59E0B ${result.seuil / 2}%, #F59E0B ${result.seuil}%, #10B981 ${result.seuil}%, #10B981 100%)`,
                    accentColor: getGaugeColor(ratio),
                  }}
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={() => { setRatio(25); setShowResult(false); }}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${ratio === 25 ? 'bg-red-100 text-red-700' : 'text-gray-400 hover:text-red-600'}`}
                  >
                    25% — Red Flag
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRatio(42); setShowResult(false); }}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${ratio === 42 ? 'bg-amber-100 text-amber-700' : 'text-gray-400 hover:text-amber-600'}`}
                  >
                    42% — Sous seuil
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRatio(result.seuil); setShowResult(false); }}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${ratio === result.seuil ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:text-emerald-600'}`}
                  >
                    {result.seuil}% — Seuil
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRatio(85); setShowResult(false); }}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${ratio === 85 ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:text-emerald-600'}`}
                  >
                    85% — Conforme
                  </button>
                </div>
              </div>

              {/* Seuil indicator */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-scales-3-line text-gold-600"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seuil réglementaire {regulateur}</p>
                  <p className="text-lg font-bold text-gray-900">{result.seuil}% minimum</p>
                </div>
              </div>

              {/* Montant acquisition */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <i className="ri-money-dollar-circle-line text-gold-500 text-lg"></i>
                  Montant de l'acquisition
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={montantAcquisition}
                    onChange={(e) => setMontantAcquisition(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-4 pr-24 py-3.5 text-lg font-semibold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    Millions {devise.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Simulate Button */}
              <button
                type="button"
                onClick={handleSimuler}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-4 rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-lg shadow-gold-900/20 disabled:opacity-70 disabled:cursor-wait"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Calcul via {gatewayReady ? 'KHEPRA Gateway...' : 'moteur local...'}
                  </>
                ) : (
                  <>
                    <i className="ri-flashlight-line text-xl"></i>
                    Simuler l'impact sur la valorisation
                  </>
                )}
              </button>
            </div>

            {/* RIGHT — Results */}
            <div className="p-8 lg:p-10 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
              {!showResult ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold-100 flex items-center justify-center">
                    <i className="ri-calculator-line text-3xl text-gold-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Prêt à simuler</h3>
                  <p className="text-sm text-gray-500">
                    Ajustez le ratio NPL et cliquez sur "Simuler" pour voir l'impact sur la valorisation de votre cible au {pays}.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Source badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Résultat</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${resultSource === 'gateway' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${resultSource === 'gateway' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                      {resultSource === 'gateway' ? 'KHEPRA Gateway' : 'Client-side'}
                    </span>
                  </div>

                  {/* Statut Badge */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${statutConfig.bg} ${statutConfig.border} border`}>
                    <i className={`${statutConfig.icon} text-2xl ${statutConfig.text}`}></i>
                    <div>
                      <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${statutConfig.badge} mb-1`}>
                        {statutConfig.label}
                      </span>
                      <p className={`text-sm ${statutConfig.text}`}>
                        {result.conforme
                          ? `Ratio ≥ seuil ${regulateur} (${result.seuil}%). Aucun ajustement requis.`
                          : `Ratio < seuil ${regulateur}. Ajustement recommandé.`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Ajustement Price */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Ajustement valorisation</span>
                      <span className={`text-2xl font-bold font-mono ${result.ajustementPrix < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {result.ajustementPrix < 0 ? `${result.ajustementPrix}%` : '0%'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Prix initial</span>
                      <span className="font-semibold text-gray-900">{montantAcquisition}M {devise.split(' ')[0]}</span>
                    </div>
                    {result.ajustementPrix < 0 && (
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500">Réduction</span>
                        <span className="font-semibold text-red-600">-{ajustementMontant}M {devise.split(' ')[0]}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Prix ajusté recommandé</span>
                      <span className="text-xl font-bold text-gray-900">{prixAjuste}M {devise.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Gauge visual */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Ratio vs Seuil {regulateur}</p>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(ratio / 100) * 100}%`,
                          background: ratio >= result.seuil
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : ratio >= result.seuil - 20
                              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                              : 'linear-gradient(90deg, #EF4444, #F87171)',
                        }}
                      />
                      <div
                        className="absolute top-0 h-full w-0.5 bg-gray-900 z-10"
                        style={{ left: `${result.seuil}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                      <span>0%</span>
                      <span className="font-semibold text-gray-700">Seuil {result.seuil}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Recommandation */}
                  <div className="bg-white rounded-xl p-5 border border-gold-200">
                    <p className="text-xs text-gold-600 uppercase tracking-wider font-semibold mb-2">
                      <i className="ri-lightbulb-line mr-1"></i>
                      Recommandation KHEPRA DD™
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.recommandation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <i className="ri-information-line text-gold-500"></i>
            <span>Exemples de ratios NPL réels :</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600 border border-red-100">Microfinance Guinée : 38% — Critique</span>
          <span className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-600 border border-amber-100">Banque Sénégal : 52% — Sous seuil</span>
          <span className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 border border-emerald-100">SFD Côte d'Ivoire : 78% — Conforme</span>
        </div>
      </div>
    </section>
  );
}



