import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSRegulatoryBrain } from '@/hooks/useKOSRegulatoryBrain';
import type { ProcessedRegulation } from '@/mocks/regulatoryBrain';

type OutputTab = 'summary' | 'obligations' | 'controls' | 'risks' | 'n8n' | 'json';

const CRITICITE_STYLES: Record<string, string> = {
  critique: 'bg-red-50 text-red-700 border-red-200',
  eleve: 'bg-amber-50 text-amber-700 border-amber-200',
  moyen: 'bg-sky-50 text-sky-700 border-sky-200',
};

const PROBABILITE_STYLES: Record<string, string> = {
  elevee: 'bg-red-100 text-red-700',
  moyenne: 'bg-amber-100 text-amber-700',
  faible: 'bg-emerald-100 text-emerald-700',
};

const CONTROLE_TYPE_STYLES: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  preventif: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: 'ri-shield-line', label: 'Préventif' },
  detectif: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: 'ri-search-eye-line', label: 'Détectif' },
  correctif: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: 'ri-tools-line', label: 'Correctif' },
};

const TRIGGER_TYPE_ICONS: Record<string, string> = {
  cron: 'ri-time-line',
  webhook: 'ri-link',
  event: 'ri-flashlight-line',
};

export default function regulatoryBrainPage() {
  const {
    availableTexts,
    agents,
    kpis,
    selectedRegulation,
    processing,
    error,
    selectRegulation,
    processCustomText,
  } = useKOSRegulatoryBrain();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('summary');
  const [customText, setCustomText] = useState('');
  const [customAutorite, setCustomAutorite] = useState('COBAC');
  const [customTitre, setCustomTitre] = useState('');
  const [customReference, setCustomReference] = useState('');
  const [inputMode, setInputMode] = useState<'select' | 'paste'>('select');
  const [selectedTextId, setSelectedTextId] = useState<string>('');

  const handleSelectText = (id: string) => {
    setSelectedTextId(id);
    selectRegulation(id);
    setActiveOutputTab('summary');
  };

  const handleCustomSubmit = () => {
    if (!customText.trim()) return;
    processCustomText(customText, {
      autorite: customAutorite,
      titre: customTitre || 'Texte personnalisé',
      reference: customReference || 'N/A',
    });
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'summary', label: '1. Résumé', icon: 'ri-file-text-line' },
    { id: 'obligations', label: '2. Obligations', icon: 'ri-list-check-2', count: selectedRegulation ? String(selectedRegulation.obligations.length) : undefined },
    { id: 'controls', label: '3. Contrôles', icon: 'ri-git-branch-line', count: selectedRegulation ? String(selectedRegulation.control_mapping.length) : undefined },
    { id: 'risks', label: '4. Risques', icon: 'ri-alert-line', count: selectedRegulation ? String(selectedRegulation.risques.length) : undefined },
    { id: 'n8n', label: '5. n8n Triggers', icon: 'ri-flow-chart', count: selectedRegulation ? String(selectedRegulation.n8n_triggers.length) : undefined },
    { id: 'json', label: '6. JSON Schema', icon: 'ri-braces-line' },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  return (
    <hubLayout hubId={87}>
      <SeoHead
        title="KOS Regulatory Brain™ — Textes Réglementaires → Règles Exécutables | KHEPRA EXPERTS"
        description="Convertissez les textes COBAC, BEAC, GABAC, LBC/FT en règles de conformité structurées. Résumé, obligations, contrôles, risques, triggers n8n, schéma JSON. Big Four compliance intelligence."
        keywords="KOS Regulatory Brain, COBAC compliance, BEAC réglementation, GABAC LBC/FT, textes réglementaires structurés, n8n compliance workflows, JSON schema réglementaire, KHEPRA EXPERTS"
        canonicalPath="/kos-regulatory-brain"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20regulatory%20intelligence%20and%20compliance%20automation%20aesthetic%20with%20deep%20amber%20and%20warm%20bronze%20tones%2C%20structured%20data%20flowing%20into%20organized%20rules%20and%20schema%20patterns%2C%20geometric%20legal%20text%20transformation%20visual%20with%20connected%20nodes%20and%20decision%20trees%2C%20sophisticated%20institutional%20atmosphere%20with%20elegant%20data%20streams%2C%20no%20text%20no%20human%20figures%2C%20Big%20Four%20consulting%20grade%20visual%20identity%20with%20warm%20amber%20and%20bronze%20gradients&width=1920&height=520&seq=kos-rb-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-15"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/82 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-brain-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Regulatory Brain™ — Big Four Grade</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Agents Actifs</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Textes réglementaires → Règles exécutables.
              <span className="block text-amber-400 mt-2">COBAC · BEAC · GABAC · LBC/FT</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Convertissez n'importe quel texte réglementaire en <strong className="text-white">6 livrables structurés</strong> : résumé, obligations, cartographie des contrôles, risques, triggers n8n, et schéma JSON.
              Traitement en <strong className="text-amber-400">{kpis.temps_traitement_moyen_ms}ms</strong>.
              Score de confiance moyen <strong className="text-emerald-400">{kpis.score_confiance_moyen}%</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="py-3 bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-200 whitespace-nowrap flex-shrink-0">
                <i className={`${agent.icon} text-amber-600 text-sm`} />
                <span className="text-xs font-bold text-foreground-800">{agent.nom}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" title="Actif" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setInputMode('select')}
              className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${inputMode === 'select' ? 'bg-foreground-950 text-background-50' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`}
            >
              <i className="ri-list-check mr-1.5" />Textes prétraités
            </button>
            <button
              onClick={() => setInputMode('paste')}
              className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${inputMode === 'paste' ? 'bg-foreground-950 text-background-50' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`}
            >
              <i className="ri-edit-line mr-1.5" />Texte personnalisé
            </button>
          </div>

          {inputMode === 'select' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableTexts.map(text => (
                <button
                  key={text.id}
                  onClick={() => handleSelectText(text.id)}
                  disabled={processing}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${selectedTextId === text.id && selectedRegulation ? 'border-amber-300 bg-amber-50/60 ring-2 ring-amber-200' : 'border-background-200 bg-white hover:border-amber-200 hover:bg-amber-50/30'} ${processing ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-100">
                      <i className="ri-scales-3-line text-amber-700 text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 whitespace-nowrap">{text.autorite}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{text.zone}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{text.type}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{text.titre}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                        <span><i className="ri-calendar-line mr-1" />{new Date(text.date_publication).toLocaleDateString('fr-FR')}</span>
                        <span className="font-mono">{text.reference_officielle}</span>
                      </div>
                    </div>
                    {processing && selectedTextId === text.id ? (
                      <div className="w-6 h-6 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin flex-shrink-0 mt-2" />
                    ) : (
                      <i className="ri-arrow-right-line text-foreground-400 text-lg flex-shrink-0 mt-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-1 block">Autorité</label>
                  <select value={customAutorite} onChange={e => setCustomAutorite(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-background-50 border border-background-200 text-sm font-bold text-foreground-700 cursor-pointer">
                    <option value="COBAC">COBAC</option>
                    <option value="BEAC">BEAC</option>
                    <option value="GABAC">GABAC</option>
                    <option value="BCEAO">BCEAO</option>
                    <option value="OHADA">OHADA</option>
                    <option value="UEMOA">UEMOA</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-1 block">Titre du texte</label>
                  <input type="text" value={customTitre} onChange={e => setCustomTitre(e.target.value)} placeholder="Ex: Règlement n°..." className="w-full px-3 py-2 rounded-lg bg-background-50 border border-background-200 text-sm text-foreground-700 placeholder:text-foreground-300" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-1 block">Référence officielle</label>
                  <input type="text" value={customReference} onChange={e => setCustomReference(e.target.value)} placeholder="Ex: COBAC R-2026/XX" className="w-full px-3 py-2 rounded-lg bg-background-50 border border-background-200 text-sm text-foreground-700 placeholder:text-foreground-300" />
                </div>
              </div>
              <textarea
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Collez ici le texte réglementaire brut à analyser..."
                rows={8}
                className="w-full px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-700 placeholder:text-foreground-300 font-mono resize-y"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-foreground-400"><i className="ri-information-line mr-1" />Mode MOCK : le traitement de textes personnalisés sera disponible avec l'Edge Function KOS Regulatory Brain</span>
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customText.trim() || processing}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${customText.trim() && !processing ? 'bg-foreground-950 text-background-50 hover:bg-foreground-800' : 'bg-background-200 text-foreground-400 cursor-not-allowed'}`}
                >
                  {processing ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Traitement...</span>
                  ) : (
                    <span><i className="ri-brain-line mr-1.5" />Traiter le texte</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <i className="ri-error-warning-line text-red-600 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-red-700 block">{error}</span>
                <span className="text-xs text-red-500 mt-1 block">Sélectionnez un texte dans l'onglet "Textes prétraités" pour voir un exemple complet.</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Processing Indicator */}
      {processing && (
        <section className="py-8 bg-amber-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800">KOS Regulatory Brain™ — Traitement en cours...</p>
            <p className="text-xs text-foreground-500 mt-1">Extraction des obligations, cartographie des contrôles, analyse des risques, génération n8n, compilation JSON Schema</p>
          </div>
        </section>
      )}

      {/* Output Section */}
      {selectedRegulation && !processing && (
        <>
          {/* Output Tabs */}
          <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-1 overflow-x-auto py-3">
                {outputTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveOutputTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeOutputTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
                  >
                    <i className={`${tab.icon} text-base`} />
                    {tab.label}
                    {tab.count && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeOutputTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Processing Metadata */}
          <section className="py-4 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-foreground-600">
                  <i className="ri-robot-line text-amber-600" />
                  <span className="font-bold">{selectedRegulation.processing_metadata.agent}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-timer-line" />
                  {selectedRegulation.processing_metadata.processing_time_ms}ms
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <i className="ri-check-double-line" />
                  Confiance {selectedRegulation.processing_metadata.confidence_score}%
                </span>
                <span className="flex items-center gap-1.5 text-foreground-400">
                  <i className="ri-link" />
                  {selectedRegulation.processing_metadata.verified_sources.length} sources vérifiées
                </span>
                {selectedRegulation.processing_metadata.uncertain_elements.length > 0 && (
                  <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                    <i className="ri-question-line" />
                    {selectedRegulation.processing_metadata.uncertain_elements.length} incertitude(s)
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* ═══════════ 1. RÉSUMÉ ═══════════ */}
          {activeOutputTab === 'summary' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <i className="ri-file-text-line text-amber-700 text-2xl" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground-950">{selectedRegulation.input.titre}</h2>
                      <div className="flex items-center gap-2 mt-1 text-xs text-foreground-400">
                        <span className="font-bold text-amber-700">{selectedRegulation.input.autorite}</span>
                        <span>·</span>
                        <span className="font-mono">{selectedRegulation.input.reference_officielle}</span>
                        <span>·</span>
                        <span>{new Date(selectedRegulation.input.date_publication).toLocaleDateString('fr-FR')}</span>
                        <span>·</span>
                        <span>{selectedRegulation.input.zone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Synthèse</h3>
                        <p className="text-sm text-foreground-700 leading-relaxed">{selectedRegulation.summary.synthese}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Mots-Clés</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedRegulation.summary.mots_cles.map(kw => (
                            <span key={kw} className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{kw}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Articles Clés</h3>
                        <ul className="space-y-1.5">
                          {selectedRegulation.summary.articles_cles.map(a => (
                            <li key={a} className="text-xs text-foreground-700 flex items-start gap-2">
                              <i className="ri-article-line text-amber-600 mt-0.5 flex-shrink-0" />{a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">Champ d'application</span>
                          <span className="text-xs text-foreground-700">{selectedRegulation.summary.champ_application}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                          <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block mb-1">Entrée en vigueur</span>
                          <span className="text-xs text-foreground-700">{selectedRegulation.summary.date_entree_vigueur}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Délai de mise en conformité</h3>
                        <p className="text-xs text-foreground-700 bg-emerald-50 border border-emerald-100 rounded-xl p-3">{selectedRegulation.summary.delai_mise_conformite}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Entités concernées</h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedRegulation.summary.entites_concernees.map(e => (
                            <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{e}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. OBLIGATIONS ═══════════ */}
          {activeOutputTab === 'obligations' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedRegulation.obligations.length} Obligations Extraites</h2>
                  <p className="text-sm text-foreground-500">Classées par criticité — avec article de référence, délai, preuve requise et sanction encourue</p>
                </div>
                <div className="space-y-3">
                  {selectedRegulation.obligations.map(obl => {
                    const sev = CRITICITE_STYLES[obl.criticite];
                    return (
                      <div key={obl.id} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${sev.split(' ')[0]} border ${sev.split(' ')[1]}`}>
                            <i className="ri-checkbox-circle-line text-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-sm font-bold text-foreground-950">{obl.id}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold font-mono bg-background-100 text-foreground-600">{obl.article_ref}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${sev}`}>
                                {obl.criticite === 'critique' ? 'CRITIQUE' : obl.criticite === 'eleve' ? 'ÉLEVÉ' : 'MOYEN'}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-700 mb-3">{obl.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                                <span className="text-[10px] font-bold text-foreground-400 uppercase block mb-0.5">Délai</span>
                                <span className="text-foreground-700 font-bold">{obl.delai}</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                                <span className="text-[10px] font-bold text-foreground-400 uppercase block mb-0.5">Preuve requise</span>
                                <span className="text-foreground-700">{obl.preuve_requise}</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
                                <span className="text-[10px] font-bold text-red-500 uppercase block mb-0.5">Sanction</span>
                                <span className="text-red-700 font-bold">{obl.sanction_encourue}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 3. CONTRÔLES ═══════════ */}
          {activeOutputTab === 'controls' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedRegulation.control_mapping.length} Contrôles Cartographiés</h2>
                  <p className="text-sm text-foreground-500">Mapping obligation → contrôle (préventif · détectif · correctif) avec fréquence, responsable, outil et KPI</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Réf</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Type</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Description</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Fréquence</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Responsable</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Indicateur</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Seuil Alerte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRegulation.control_mapping.map(ctl => {
                        const typeStyle = CONTROLE_TYPE_STYLES[ctl.controle_type];
                        return (
                          <tr key={ctl.id} className="border-b border-background-100 hover:bg-background-50/50">
                            <td className="py-3 px-3 font-mono text-[10px] text-foreground-500">{ctl.id}</td>
                            <td className="py-3 px-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${typeStyle.bg} ${typeStyle.text}`}>
                                <i className={`${typeStyle.icon} text-[10px]`} />{typeStyle.label}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-foreground-700 max-w-[280px]">{ctl.description}</td>
                            <td className="py-3 px-3 text-foreground-600 whitespace-nowrap">{ctl.frequence}</td>
                            <td className="py-3 px-3 text-foreground-700 font-bold whitespace-nowrap">{ctl.responsable}</td>
                            <td className="py-3 px-3 text-foreground-600 max-w-[180px]">{ctl.indicateur}</td>
                            <td className="py-3 px-3 text-[10px] font-bold text-red-600 max-w-[200px]">{ctl.seuil_alerte}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 4. RISQUES ═══════════ */}
          {activeOutputTab === 'risks' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedRegulation.risques.length} Risques de Non-Conformité</h2>
                  <p className="text-sm text-foreground-500">Analyse : probabilité, impacts (financier · opérationnel · réputationnel), plan de mitigation</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedRegulation.risques.map((risque, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                          <i className="ri-error-warning-line text-red-600 text-lg" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950 mb-1">{risque.risque}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${PROBABILITE_STYLES[risque.probabilite]}`}>
                            Probabilité {risque.probabilite}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs p-2 rounded-lg bg-red-50">
                          <span className="text-red-600 font-bold">Impact financier</span>
                          <span className="text-red-800 text-right">{risque.impact_financier}</span>
                        </div>
                        <div className="flex justify-between text-xs p-2 rounded-lg bg-amber-50">
                          <span className="text-amber-600 font-bold">Impact opérationnel</span>
                          <span className="text-amber-800 text-right">{risque.impact_operationnel}</span>
                        </div>
                        <div className="flex justify-between text-xs p-2 rounded-lg bg-sky-50">
                          <span className="text-sky-600 font-bold">Impact réputationnel</span>
                          <span className="text-sky-800 text-right">{risque.impact_reputationnel}</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Mitigation</span>
                        <span className="text-xs text-emerald-800">{risque.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 5. n8n TRIGGERS ═══════════ */}
          {activeOutputTab === 'n8n' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedRegulation.n8n_triggers.length} Workflows n8n Générés</h2>
                  <p className="text-sm text-foreground-500">Triggers, nœuds, fréquences, outputs et fallbacks — prêts à déployer dans n8n</p>
                </div>
                <div className="space-y-4">
                  {selectedRegulation.n8n_triggers.map(trigger => (
                    <div key={trigger.id} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <i className={`${TRIGGER_TYPE_ICONS[trigger.trigger_type]} text-amber-700 text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="text-sm font-bold text-foreground-950 font-mono">{trigger.workflow_name}</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">{trigger.trigger_type}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{trigger.frequency}</span>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-1.5">Trigger Config</span>
                              <code className="text-[11px] bg-background-100 text-foreground-700 px-3 py-1.5 rounded-lg block font-mono">{trigger.trigger_config}</code>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-1.5">Nodes ({trigger.nodes.length})</span>
                              <div className="flex flex-wrap gap-1">
                                {trigger.nodes.map((node, j) => (
                                  <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200 font-mono">
                                    {node.includes('→') ? node.split('→')[0].trim() : node}
                                    {node.includes('→') && <i className="ri-arrow-right-line mx-0.5 text-[8px]" />}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-background-100">
                            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                              <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-0.5">Output</span>
                              <span className="text-xs text-emerald-800">{trigger.output}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
                              <span className="text-[10px] font-bold text-red-500 uppercase block mb-0.5">Failure Fallback</span>
                              <span className="text-xs text-red-700">{trigger.failure_fallback}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 6. JSON SCHEMA ═══════════ */}
          {activeOutputTab === 'json' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">JSON Schema — {selectedRegulation.json_schema.schema_name}</h2>
                  <div className="flex items-center gap-2 text-sm text-foreground-500">
                    <span className="font-bold text-amber-700">{selectedRegulation.json_schema.autorite}</span>
                    <span>·</span>
                    <span className="font-mono">v{selectedRegulation.json_schema.version}</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-foreground-950 border border-foreground-800 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-foreground-900 border-b border-foreground-800">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono ml-3">{selectedRegulation.json_schema.schema_name}.schema.json</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedRegulation.json_schema.schema, null, 2));
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-800 text-gray-300 text-[10px] font-bold hover:bg-foreground-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-file-copy-line" />Copier
                    </button>
                  </div>
                  <div className="p-5 overflow-x-auto">
                    <pre className="text-xs text-emerald-400 font-mono leading-relaxed whitespace-pre">
                      {JSON.stringify(selectedRegulation.json_schema.schema, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Uncertain Elements Warning */}
          {selectedRegulation.processing_metadata.uncertain_elements.length > 0 && (
            <section className="py-6 bg-amber-50 border-t border-amber-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-100/60 border border-amber-200">
                  <i className="ri-question-line text-amber-700 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-800 mb-1">Éléments Incertains — Vérification Requise</h3>
                    <ul className="space-y-1">
                      {selectedRegulation.processing_metadata.uncertain_elements.map((el, i) => (
                        <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                          <i className="ri-arrow-right-line flex-shrink-0 mt-0.5" />{el}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Empty State */}
      {!selectedRegulation && !processing && !error && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-amber-50 flex items-center justify-center">
              <i className="ri-brain-line text-amber-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Prêt à analyser</h2>
            <p className="text-sm text-foreground-500">Sélectionnez un texte réglementaire prétraité ci-dessus, ou collez votre propre texte pour le convertir en règles de conformité structurées.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Résumé</span>
              <i className="ri-arrow-right-line text-foreground-300 self-center" />
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Obligations</span>
              <i className="ri-arrow-right-line text-foreground-300 self-center" />
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">Contrôles</span>
              <i className="ri-arrow-right-line text-foreground-300 self-center" />
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">Risques</span>
              <i className="ri-arrow-right-line text-foreground-300 self-center" />
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">n8n</span>
              <i className="ri-arrow-right-line text-foreground-300 self-center" />
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-foreground-100 text-foreground-600 border border-foreground-200 font-mono">JSON</span>
            </div>
          </div>
        </section>
      )}

      {/* Cross-link */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Regulatory Brain — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Regulatory Intelligence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757', current: true },
              { label: 'Regulatory Intelligence', path: '/kos-regulatory-intelligence-engine', icon: 'ri-radar-line', color: '#86BC25' },
              { label: 'Compliance Automates', path: '/kos-regulatory-compliance-automates', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Compliance Audit', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#C2410C' },
              { label: 'BCEAO Dashboard', path: '/bceao', icon: 'ri-bank-line', color: '#0D7B5F' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#1A1A2E' },
              { label: 'GAFI Dashboard', path: '/gafi', icon: 'ri-global-line', color: '#8B3A4A' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-white hover:border-amber-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-amber-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





