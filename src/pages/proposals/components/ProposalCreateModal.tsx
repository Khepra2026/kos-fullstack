import { useState } from 'react';
import { Proposal, ProposalFormData } from '@/pages/proposals/hooks/useProposals';

interface ProposalCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Array<{ id: string; full_name: string; email: string; organization: string | null }>;
  onGenerate: (data: ProposalFormData) => void;
  loading: boolean;
}

const proposalTypes = [
  { value: 'diagnostic', label: 'Diagnostic', defaultAmount: 5000 },
  { value: 'audit', label: 'Audit', defaultAmount: 12000 },
  { value: 'conseil', label: 'Conseil stratégique', defaultAmount: 15000 },
  { value: 'esg', label: 'Conformité ESG', defaultAmount: 8000 },
  { value: 'due_diligence', label: 'Due diligence', defaultAmount: 20000 },
  { value: 'formation', label: 'Formation', defaultAmount: 3500 },
  { value: 'transformation', label: 'Transformation digitale', defaultAmount: 18000 },
  { value: 'governance', label: 'Gouvernance', defaultAmount: 10000 },
  { value: 'compliance', label: 'Conformité réglementaire', defaultAmount: 9000 },
  { value: 'other', label: 'Autre', defaultAmount: 5000 },
];

export default function ProposalCreateModal({
  isOpen,
  onClose,
  leads,
  onGenerate,
  loading,
}: ProposalCreateModalProps) {
  const [formData, setFormData] = useState<ProposalFormData>({
    leadId: '',
    title: '',
    proposalType: 'diagnostic',
    amount: 5000,
    durationDays: 15,
    description: '',
    scope: '',
    deliverables: ['Rapport diagnostic', "Plan d'action", 'Recommandations', 'Présentation finale'],
    terms: '',
  });
  const [step, setStep] = useState(1);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedLead = leads.find((l) => l.id === formData.leadId);
  const selectedType = proposalTypes.find((t) => t.value === formData.proposalType);

  const handleGenerate = async () => {
    setError(null);
    setGeneratedHtml(null);
    onGenerate(formData);
  };

  const handleTypeChange = (type: string) => {
    const pt = proposalTypes.find((t) => t.value === type);
    setFormData((prev) => ({
      ...prev,
      proposalType: type,
      amount: pt?.defaultAmount || 5000,
    }));
  };

  const updateDeliverable = (index: number, value: string) => {
    const updated = [...formData.deliverables];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, deliverables: updated }));
  };

  const addDeliverable = () => {
    setFormData((prev) => ({ ...prev, deliverables: [...prev.deliverables, 'Nouveau livrable'] }));
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({ ...prev, deliverables: prev.deliverables.filter((_, i) => i !== index) }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <i className="ri-file-paper-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Nouvelle Proposition</h2>
              <p className="text-xs text-slate-500">Génération automatique PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            type="button"
          >
            <i className="ri-close-line text-xl text-slate-500"></i>
          </button>
        </div>

        {/* Steps */}
        <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            {['Client', 'Type & Prix', 'Contenu', 'Aperçu'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step > i + 1
                      ? 'bg-emerald-500 text-white'
                      : step === i + 1
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > i + 1 ? <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= i + 1 ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>
                {i < 3 && <div className="w-8 h-px bg-slate-300 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Sélectionner le client</h3>
              <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-lg">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setFormData((prev) => ({ ...prev, leadId: lead.id }))}
                    className={`w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 transition-colors cursor-pointer flex items-center gap-3 ${
                      formData.leadId === lead.id ? 'bg-amber-50 border-amber-200' : 'hover:bg-slate-50'
                    }`}
                    type="button"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{lead.full_name}</div>
                      <div className="text-xs text-slate-500">{lead.email} • {lead.organization || '—'}</div>
                    </div>
                    {formData.leadId === lead.id && (
                      <i className="ri-check-line text-amber-500 w-4 h-4 flex items-center justify-center"></i>
                    )}
                  </button>
                ))}
                {leads.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-slate-400">
                    Aucun lead disponible. Créez d'abord un lead.
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type de mission</label>
                <div className="grid grid-cols-2 gap-2">
                  {proposalTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleTypeChange(type.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left ${
                        formData.proposalType === type.value
                          ? 'bg-amber-50 text-amber-700 border-2 border-amber-300'
                          : 'bg-slate-50 text-slate-700 border-2 border-transparent hover:bg-slate-100'
                      }`}
                      type="button"
                    >
                      {type.label}
                      <div className="text-xs text-slate-400 mt-1">À partir de {type.defaultAmount.toLocaleString('fr-FR')} €</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la proposition</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Ex: Diagnostic de conformité BCEAO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Montant (€)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Durée (jours)</label>
                <input
                  type="number"
                  value={formData.durationDays}
                  onChange={(e) => setFormData((prev) => ({ ...prev, durationDays: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Contexte</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={3}
                  placeholder="Contexte de la mission et objectifs..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Périmètre (une ligne par item)</label>
                <textarea
                  value={formData.scope}
                  onChange={(e) => setFormData((prev) => ({ ...prev, scope: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={3}
                  placeholder="Analyse réglementaire...&#10;Évaluation des pratiques...&#10;Recommandations..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Livrables</label>
                {formData.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={d}
                      onChange={(e) => updateDeliverable(i, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => removeDeliverable(i)}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                      type="button"
                    >
                      <i className="ri-delete-bin-line text-red-500 w-3 h-3 flex items-center justify-center"></i>
                    </button>
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <i className="ri-add-line w-3 h-3 flex items-center justify-center"></i>
                  Ajouter un livrable
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Conditions</label>
                <textarea
                  value={formData.terms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, terms: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={2}
                  placeholder="Conditions de paiement, confidentialité..."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-sm font-bold text-amber-900 mb-2">Récapitulatif</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-slate-600">Client</span><span className="font-medium text-slate-900">{selectedLead?.full_name || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Organisation</span><span className="font-medium text-slate-900">{selectedLead?.organization || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Type</span><span className="font-medium text-slate-900">{selectedType?.label || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Titre</span><span className="font-medium text-slate-900">{formData.title || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Montant</span><span className="font-medium text-slate-900">{formData.amount.toLocaleString('fr-FR')} €</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Durée</span><span className="font-medium text-slate-900">{formData.durationDays} jours</span></div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center"></i>
                  {error}
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
                  <p className="mt-3 text-sm text-slate-600">Génération de la proposition en cours...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                type="button"
              >
                ← Précédent
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 1 && !formData.leadId) return;
                  if (step === 2 && !formData.title) return;
                  setStep((s) => s + 1);
                }}
                disabled={step === 1 && !formData.leadId || step === 2 && !formData.title}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-colors disabled:opacity-50 cursor-pointer"
                type="button"
              >
                Suivant →
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                type="button"
              >
                <i className="ri-file-paper-line w-4 h-4 flex items-center justify-center"></i>
                {loading ? 'Génération...' : 'Générer la proposition'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}