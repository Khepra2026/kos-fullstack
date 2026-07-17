import { useState, useEffect } from 'react';
import { mockRiskFamilies, mockRiskStatuses } from '@/mocks/riskRegister';

interface RiskFormData {
  id?: string;
  famille: string;
  libelle: string;
  probabilite: number;
  impact: number;
  kris: Array<{ kri: string; seuil: string; frequence: string }>;
  controles: string[];
  plan_traitement: string;
  responsable: string;
  echeance: string;
  statut: string;
}

interface RiskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RiskFormData) => void;
  initialData?: RiskFormData | null;
}

const defaultForm: RiskFormData = {
  famille: 'reglementaire',
  libelle: '',
  probabilite: 3,
  impact: 3,
  kris: [{ kri: '', seuil: '', frequence: 'mensuelle' }],
  controles: [''],
  plan_traitement: '',
  responsable: '',
  echeance: '',
  statut: 'ouvert',
};

export default function RiskFormModal({ isOpen, onClose, onSubmit, initialData }: RiskFormModalProps) {
  const [form, setForm] = useState<RiskFormData>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        kris: initialData.kris?.length ? initialData.kris : [{ kri: '', seuil: '', frequence: 'mensuelle' }],
        controles: initialData.controles?.length ? initialData.controles : [''],
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.libelle.trim()) errs.libelle = 'Le libellé est requis';
    if (!form.famille) errs.famille = 'La famille est requise';
    if (form.probabilite < 1 || form.probabilite > 5) errs.probabilite = 'Entre 1 et 5';
    if (form.impact < 1 || form.impact > 5) errs.impact = 'Entre 1 et 5';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const cleanKris = form.kris.filter(k => k.kri.trim());
    const cleanControls = form.controles.filter(c => c.trim());
    onSubmit({ ...form, kris: cleanKris, controles: cleanControls });
    onClose();
  };

  const updateKri = (i: number, field: string, value: string) => {
    const kris = [...form.kris];
    kris[i] = { ...kris[i], [field]: value };
    setForm({ ...form, kris });
  };

  const addKri = () => setForm({ ...form, kris: [...form.kris, { kri: '', seuil: '', frequence: 'mensuelle' }] });
  const removeKri = (i: number) => setForm({ ...form, kris: form.kris.filter((_, idx) => idx !== i) });

  const updateControl = (i: number, value: string) => {
    const controles = [...form.controles];
    controles[i] = value;
    setForm({ ...form, controles });
  };
  const addControl = () => setForm({ ...form, controles: [...form.controles, ''] });
  const removeControl = (i: number) => setForm({ ...form, controles: form.controles.filter((_, idx) => idx !== i) });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between rounded-t-xl">
          <h3 className="text-base font-bold text-foreground-950 font-heading">
            {initialData ? 'Modifier le risque' : 'Nouveau risque'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-200/70 text-foreground-500 cursor-pointer">
            <i className="ri-close-line" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Libellé */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Libellé du risque</label>
            <input
              type="text"
              value={form.libelle}
              onChange={e => setForm({ ...form, libelle: e.target.value })}
              className={`w-full px-3 py-2 text-sm bg-background-100 border rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 ${errors.libelle ? 'border-red-300' : 'border-background-200/70'}`}
              placeholder="Ex: Non-conformité ratios prudentiels BCEAO..."
            />
            {errors.libelle && <p className="text-[10px] text-red-600 mt-0.5 font-body">{errors.libelle}</p>}
          </div>

          {/* Famille */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Famille</label>
            <select
              value={form.famille}
              onChange={e => setForm({ ...form, famille: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
            >
              {mockRiskFamilies.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
            </select>
          </div>

          {/* Probabilité & Impact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Probabilité (1–5)</label>
              <input
                type="number"
                min={1} max={5}
                value={form.probabilite}
                onChange={e => setForm({ ...form, probabilite: Math.min(5, Math.max(1, parseInt(e.target.value) || 1)) })}
                className={`w-full px-3 py-2 text-sm bg-background-100 border rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 ${errors.probabilite ? 'border-red-300' : 'border-background-200/70'}`}
              />
              {errors.probabilite && <p className="text-[10px] text-red-600 mt-0.5 font-body">{errors.probabilite}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Impact (1–5)</label>
              <input
                type="number"
                min={1} max={5}
                value={form.impact}
                onChange={e => setForm({ ...form, impact: Math.min(5, Math.max(1, parseInt(e.target.value) || 1)) })}
                className={`w-full px-3 py-2 text-sm bg-background-100 border rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 ${errors.impact ? 'border-red-300' : 'border-background-200/70'}`}
              />
              {errors.impact && <p className="text-[10px] text-red-600 mt-0.5 font-body">{errors.impact}</p>}
            </div>
          </div>

          {/* Score preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background-100">
            <span className="text-xs font-semibold text-foreground-600 font-body">Score calculé :</span>
            <span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold ${form.probabilite * form.impact >= 15 ? 'bg-red-500 text-white' : form.probabilite * form.impact >= 10 ? 'bg-amber-400 text-foreground-950' : 'bg-emerald-400 text-foreground-950'}`}>
              {form.probabilite * form.impact}
            </span>
          </div>

          {/* KRIs */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-2 font-body">Key Risk Indicators</label>
            {form.kris.map((kri, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Nom du KRI"
                  value={kri.kri}
                  onChange={e => updateKri(i, 'kri', e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-background-100 border border-background-200/70 rounded-md text-foreground-950 font-body focus:outline-none focus:border-primary-300"
                />
                <input
                  type="text"
                  placeholder="Seuil"
                  value={kri.seuil}
                  onChange={e => updateKri(i, 'seuil', e.target.value)}
                  className="w-20 px-2 py-1.5 text-xs bg-background-100 border border-background-200/70 rounded-md text-foreground-950 font-body focus:outline-none focus:border-primary-300"
                />
                <select
                  value={kri.frequence}
                  onChange={e => updateKri(i, 'frequence', e.target.value)}
                  className="w-28 px-2 py-1.5 text-xs bg-background-100 border border-background-200/70 rounded-md text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
                >
                  <option value="hebdomadaire">Hebdo</option>
                  <option value="mensuelle">Mensuel</option>
                  <option value="trimestrielle">Trim.</option>
                  <option value="semestrielle">Sem.</option>
                  <option value="annuelle">Annuel</option>
                  <option value="continue">Continue</option>
                </select>
                <button type="button" onClick={() => removeKri(i)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 text-foreground-400 hover:text-red-600 cursor-pointer">
                  <i className="ri-close-line" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addKri} className="text-xs text-primary-600 hover:text-primary-700 font-body cursor-pointer flex items-center gap-1">
              <i className="ri-add-line" /> Ajouter un KRI
            </button>
          </div>

          {/* Contrôles */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-2 font-body">Contrôles associés</label>
            {form.controles.map((ctrl, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Description du contrôle"
                  value={ctrl}
                  onChange={e => updateControl(i, e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-background-100 border border-background-200/70 rounded-md text-foreground-950 font-body focus:outline-none focus:border-primary-300"
                />
                <button type="button" onClick={() => removeControl(i)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 text-foreground-400 hover:text-red-600 cursor-pointer">
                  <i className="ri-close-line" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addControl} className="text-xs text-primary-600 hover:text-primary-700 font-body cursor-pointer flex items-center gap-1">
              <i className="ri-add-line" /> Ajouter un contrôle
            </button>
          </div>

          {/* Plan & Responsable & Échéance */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Plan de traitement</label>
            <textarea
              value={form.plan_traitement}
              onChange={e => setForm({ ...form, plan_traitement: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 resize-none"
              placeholder="Description du plan d'action..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Responsable</label>
              <input
                type="text"
                value={form.responsable}
                onChange={e => setForm({ ...form, responsable: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300"
                placeholder="Nom du responsable"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Échéance</label>
              <input
                type="date"
                value={form.echeance}
                onChange={e => setForm({ ...form, echeance: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300"
              />
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-xs font-semibold text-foreground-600 mb-1 font-body">Statut</label>
            <select
              value={form.statut}
              onChange={e => setForm({ ...form, statut: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 font-body focus:outline-none focus:border-primary-300 cursor-pointer"
            >
              {mockRiskStatuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-background-200/70">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-600 hover:bg-background-200/70 font-body cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-body cursor-pointer whitespace-nowrap"
            >
              {initialData ? 'Mettre à jour' : 'Créer le risque'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}