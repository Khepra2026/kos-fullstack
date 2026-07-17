import { useState, useRef } from 'react';

interface FormData {
  // Étape 1
  nomEntreprise: string;
  secteur: string;
  pays: string;
  nomPrenom: string;
  fonction: string;
  email: string;
  telephone: string;
  // Étape 2
  frequenceConseils: string;
  nombreAdministrateurs: string;
  comites: string[];
  // Étape 3
  chiffreAffaires: string;
  resultatNet: string;
  croissance: string;
  problemesFinanciers: string;
  // Étape 4
  projetsCours: string;
  defis: string;
  priorites: string;
  // Étape 5
  risques: string[];
  niveauConformite: string;
  besoinAccompagnement: string[];
}

interface BoardFormProps {
  onSubmitSuccess: (data: FormData) => void;
}

const STEPS = [
  { num: 1, label: 'Identification', icon: 'ri-building-line' },
  { num: 2, label: 'Gouvernance', icon: 'ri-organization-chart' },
  { num: 3, label: 'Performance', icon: 'ri-funds-line' },
  { num: 4, label: 'Stratégie', icon: 'ri-compass-3-line' },
  { num: 5, label: 'Risques', icon: 'ri-shield-check-line' },
];

const SECTEURS = ['PME / Entreprise', 'Banque commerciale', 'Institution de microfinance (SFD)', 'ONG / Association', 'Secteur public / Parapublic', 'Startup / Scale-up', 'Holding / Groupe'];
const PAYS = ['Togo', 'Bénin', 'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Burkina Faso', 'Niger', 'Guinée', 'Cameroun', 'Gabon', 'Congo', 'RDC', 'Autre'];
const FONCTIONS = ['Directeur Général (DG)', 'Directeur Administratif & Financier (DAF)', 'Secrétaire Général', 'Risk Manager', 'Administrateur / Membre du CA', 'Président du Conseil', 'Directeur des Opérations', 'Autre'];
const FREQUENCES = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle', 'Irrégulière'];
const COMITES_OPTIONS = ['Comité d\'audit', 'Comité des risques', 'Comité de rémunération', 'Comité stratégique', 'Comité de conformité', 'Aucun comité'];
const CA_OPTIONS = ['< 50 millions FCFA', '50 - 200 millions FCFA', '200M - 1 milliard FCFA', '1 - 5 milliards FCFA', '> 5 milliards FCFA', 'Non communiqué'];
const CROISSANCE_OPTIONS = ['Forte croissance (> 20%)', 'Croissance modérée (5-20%)', 'Stable (0-5%)', 'Déclin (-5% à 0%)', 'Forte baisse (< -5%)'];
const RISQUES_OPTIONS = ['Risque de liquidité', 'Risque de crédit', 'Risque opérationnel', 'Risque de conformité réglementaire', 'Risque de gouvernance', 'Risque cyber / digital', 'Risque de réputation', 'Risque de change'];
const CONFORMITE_OPTIONS = ['Excellent (> 90%)', 'Bon (70-90%)', 'Moyen (50-70%)', 'Insuffisant (< 50%)', 'Non évalué'];
const ACCOMPAGNEMENT_OPTIONS = ['Audit de gouvernance', 'Structuration du reporting CA', 'Optimisation financière', 'Conformité BCEAO/OHADA', 'Formation des administrateurs', 'DAF externalisé', 'Levée de fonds'];

const INITIAL_DATA: FormData = {
  nomEntreprise: '', secteur: '', pays: '', nomPrenom: '', fonction: '', email: '', telephone: '',
  frequenceConseils: '', nombreAdministrateurs: '', comites: [],
  chiffreAffaires: '', resultatNet: '', croissance: '', problemesFinanciers: '',
  projetsCours: '', defis: '', priorites: '',
  risques: [], niveauConformite: '', besoinAccompagnement: [],
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(212,168,42,0.15)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(step / total) * 100}%`, background: 'linear-gradient(90deg, #86BC25, #f0c84a)' }}
      />
    </div>
  );
}

function StepIndicator({ steps, current }: { steps: typeof STEPS; current: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300"
              style={{
                background: s.num < current ? 'linear-gradient(135deg, #86BC25, #6B9B1F)' : s.num === current ? 'linear-gradient(135deg, #0a1628, #1a2d4a)' : 'rgba(0,0,0,0.06)',
                color: s.num <= current ? 'white' : '#9ca3af',
                border: s.num === current ? '2px solid #86BC25' : 'none',
              }}
            >
              {s.num < current ? <i className="ri-check-line"></i> : <i className={`${s.icon} text-sm`}></i>}
            </div>
            <span className="text-xs mt-1 font-medium hidden sm:block" style={{ color: s.num === current ? '#0a1628' : '#9ca3af' }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px mx-2" style={{ background: s.num < current ? '#86BC25' : 'rgba(0,0,0,0.1)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function MultiSelect({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
          style={{
            background: selected.includes(opt) ? 'linear-gradient(135deg, #0a1628, #1a2d4a)' : 'rgba(0,0,0,0.04)',
            color: selected.includes(opt) ? 'white' : '#374151',
            border: selected.includes(opt) ? '1px solid #86BC25' : '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {selected.includes(opt) && <i className="ri-check-line mr-1 text-xs" style={{ color: '#86BC25' }}></i>}
          {opt}
        </button>
      ))}
    </div>
  );
}

const inputClass = "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all duration-200";
const inputStyle = { borderColor: 'rgba(0,0,0,0.12)', background: 'white' };
const labelClass = "block text-sm font-semibold text-gray-800 mb-2";

export default function BoardForm({ onSubmitSuccess }: BoardFormProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof FormData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!data.nomEntreprise) newErrors.nomEntreprise = 'Requis';
      if (!data.secteur) newErrors.secteur = 'Requis';
      if (!data.pays) newErrors.pays = 'Requis';
      if (!data.nomPrenom) newErrors.nomPrenom = 'Requis';
      if (!data.fonction) newErrors.fonction = 'Requis';
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Email valide requis';
    }
    if (step === 2) {
      if (!data.frequenceConseils) newErrors.frequenceConseils = 'Requis';
      if (!data.nombreAdministrateurs) newErrors.nombreAdministrateurs = 'Requis';
    }
    if (step === 3) {
      if (!data.chiffreAffaires) newErrors.chiffreAffaires = 'Requis';
      if (!data.croissance) newErrors.croissance = 'Requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(s => Math.min(s + 1, 5));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('nomEntreprise', data.nomEntreprise);
      formData.append('secteur', data.secteur);
      formData.append('pays', data.pays);
      formData.append('nomPrenom', data.nomPrenom);
      formData.append('fonction', data.fonction);
      formData.append('email', data.email);
      formData.append('telephone', data.telephone);
      formData.append('frequenceConseils', data.frequenceConseils);
      formData.append('nombreAdministrateurs', data.nombreAdministrateurs);
      formData.append('comites', data.comites.join(', '));
      formData.append('chiffreAffaires', data.chiffreAffaires);
      formData.append('resultatNet', data.resultatNet);
      formData.append('croissance', data.croissance);
      formData.append('problemesFinanciers', data.problemesFinanciers);
      formData.append('projetsCours', data.projetsCours);
      formData.append('defis', data.defis);
      formData.append('priorites', data.priorites);
      formData.append('risques', data.risques.join(', '));
      formData.append('niveauConformite', data.niveauConformite);
      formData.append('besoinAccompagnement', data.besoinAccompagnement.join(', '));

      await fetch('https://readdy.ai/api/form/d7j7if0o26f1cfdjjcs0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      onSubmitSuccess(data);
    } catch {
      // Continuer même en cas d'erreur réseau
      onSubmitSuccess(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulaire" className="py-20 lg:py-28 relative" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #fdf9f0 100%)' }}>
      {/* Décor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-file-chart-line text-xs" style={{ color: '#86BC25' }}></i>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6B9B1F' }}>Générateur de Board Report</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Créez votre rapport{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              en 5 étapes
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Remplissez ce formulaire intelligent pour générer votre Board Report structuré, conforme et professionnel.
          </p>
        </div>

        {/* Formulaire card */}
        <div className="rounded-3xl overflow-hidden" style={{ background: 'white', boxShadow: '0 20px 80px rgba(0,0,0,0.08)', border: '1px solid rgba(212,168,42,0.15)' }}>
          {/* Header formulaire */}
          <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(212,168,42,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#86BC25' }}>
                  Étape {step} sur {STEPS.length}
                </p>
                <h3 className="font-playfair text-xl font-bold text-gray-900">
                  {STEPS[step - 1].label}
                </h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: 'rgba(212,168,42,0.1)' }}>
                <i className={`${STEPS[step - 1].icon} text-xl`} style={{ color: '#86BC25' }}></i>
              </div>
            </div>
            <ProgressBar step={step} total={STEPS.length} />
          </div>

          {/* Indicateur d'étapes */}
          <div className="px-8 pt-6">
            <StepIndicator steps={STEPS} current={step} />
          </div>

          {/* Corps du formulaire */}
          <form ref={formRef} onSubmit={handleSubmit} data-readdy-form className="px-8 pb-8">

            {/* ÉTAPE 1 — Identification */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nom de l&apos;entreprise / organisation *</label>
                    <input
                      type="text"
                      name="nomEntreprise"
                      value={data.nomEntreprise}
                      onChange={e => update('nomEntreprise', e.target.value)}
                      placeholder="Ex: Groupe Financier Lomé"
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.nomEntreprise ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    />
                    {errors.nomEntreprise && <p className="text-xs text-red-500 mt-1">{errors.nomEntreprise}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Secteur d&apos;activité *</label>
                    <select
                      name="secteur"
                      value={data.secteur}
                      onChange={e => update('secteur', e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.secteur ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    >
                      <option value="">Sélectionner...</option>
                      {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.secteur && <p className="text-xs text-red-500 mt-1">{errors.secteur}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Pays *</label>
                    <select
                      name="pays"
                      value={data.pays}
                      onChange={e => update('pays', e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.pays ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    >
                      <option value="">Sélectionner...</option>
                      {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pays && <p className="text-xs text-red-500 mt-1">{errors.pays}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Votre nom complet *</label>
                    <input
                      type="text"
                      name="nomPrenom"
                      value={data.nomPrenom}
                      onChange={e => update('nomPrenom', e.target.value)}
                      placeholder="Prénom Nom"
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.nomPrenom ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    />
                    {errors.nomPrenom && <p className="text-xs text-red-500 mt-1">{errors.nomPrenom}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Votre fonction *</label>
                  <select
                    name="fonction"
                    value={data.fonction}
                    onChange={e => update('fonction', e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, borderColor: errors.fonction ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                  >
                    <option value="">Sélectionner votre fonction...</option>
                    {FONCTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  {errors.fonction && <p className="text-xs text-red-500 mt-1">{errors.fonction}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Email professionnel *</label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="vous@entreprise.com"
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Téléphone / WhatsApp</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={data.telephone}
                      onChange={e => update('telephone', e.target.value)}
                      placeholder="+228 XX XX XX XX"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 — Gouvernance */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Fréquence des réunions du Conseil *</label>
                    <select
                      name="frequenceConseils"
                      value={data.frequenceConseils}
                      onChange={e => update('frequenceConseils', e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.frequenceConseils ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    >
                      <option value="">Sélectionner...</option>
                      {FREQUENCES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    {errors.frequenceConseils && <p className="text-xs text-red-500 mt-1">{errors.frequenceConseils}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Nombre d&apos;administrateurs *</label>
                    <input
                      type="number"
                      name="nombreAdministrateurs"
                      value={data.nombreAdministrateurs}
                      onChange={e => update('nombreAdministrateurs', e.target.value)}
                      placeholder="Ex: 7"
                      min="1"
                      max="50"
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.nombreAdministrateurs ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    />
                    {errors.nombreAdministrateurs && <p className="text-xs text-red-500 mt-1">{errors.nombreAdministrateurs}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Comités existants (sélection multiple)</label>
                  <MultiSelect options={COMITES_OPTIONS} selected={data.comites} onChange={v => update('comites', v)} />
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(212,168,42,0.06)', border: '1px solid rgba(212,168,42,0.15)' }}>
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-lg mt-0.5" style={{ color: '#86BC25' }}></i>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">Conseil KHEPRA :</strong> Un Conseil d&apos;Administration efficace se réunit au minimum trimestriellement et dispose d&apos;au moins un comité d&apos;audit selon les standards BCEAO.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Performance financière */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Chiffre d&apos;affaires annuel *</label>
                    <select
                      name="chiffreAffaires"
                      value={data.chiffreAffaires}
                      onChange={e => update('chiffreAffaires', e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, borderColor: errors.chiffreAffaires ? '#ef4444' : 'rgba(0,0,0,0.12)' }}
                    >
                      <option value="">Sélectionner...</option>
                      {CA_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.chiffreAffaires && <p className="text-xs text-red-500 mt-1">{errors.chiffreAffaires}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Résultat net (optionnel)</label>
                    <input
                      type="text"
                      name="resultatNet"
                      value={data.resultatNet}
                      onChange={e => update('resultatNet', e.target.value)}
                      placeholder="Ex: 45 millions FCFA"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Tendance de croissance *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CROISSANCE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('croissance', opt)}
                        className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 cursor-pointer"
                        style={{
                          background: data.croissance === opt ? 'linear-gradient(135deg, #0a1628, #1a2d4a)' : 'rgba(0,0,0,0.04)',
                          color: data.croissance === opt ? 'white' : '#374151',
                          border: data.croissance === opt ? '1px solid #86BC25' : '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        {data.croissance === opt && <i className="ri-check-line mr-1 text-xs" style={{ color: '#86BC25' }}></i>}
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.croissance && <p className="text-xs text-red-500 mt-1">{errors.croissance}</p>}
                </div>
                <div>
                  <label className={labelClass}>Principaux problèmes financiers identifiés</label>
                  <textarea
                    name="problemesFinanciers"
                    value={data.problemesFinanciers}
                    onChange={e => update('problemesFinanciers', e.target.value.slice(0, 500))}
                    placeholder="Ex: Difficultés de trésorerie, délais de recouvrement élevés, accès au financement limité..."
                    rows={3}
                    maxLength={500}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{data.problemesFinanciers.length}/500</p>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 — Stratégie & Opérations */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Projets stratégiques en cours</label>
                  <textarea
                    name="projetsCours"
                    value={data.projetsCours}
                    onChange={e => update('projetsCours', e.target.value.slice(0, 500))}
                    placeholder="Ex: Expansion régionale, digitalisation des opérations, levée de fonds série A..."
                    rows={3}
                    maxLength={500}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{data.projetsCours.length}/500</p>
                </div>
                <div>
                  <label className={labelClass}>Défis majeurs actuels</label>
                  <textarea
                    name="defis"
                    value={data.defis}
                    onChange={e => update('defis', e.target.value.slice(0, 500))}
                    placeholder="Ex: Recrutement de talents, pression concurrentielle, évolutions réglementaires BCEAO..."
                    rows={3}
                    maxLength={500}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{data.defis.length}/500</p>
                </div>
                <div>
                  <label className={labelClass}>Priorités stratégiques pour les 12 prochains mois</label>
                  <textarea
                    name="priorites"
                    value={data.priorites}
                    onChange={e => update('priorites', e.target.value.slice(0, 500))}
                    placeholder="Ex: Améliorer la rentabilité, renforcer la gouvernance, obtenir une certification ISO..."
                    rows={3}
                    maxLength={500}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{data.priorites.length}/500</p>
                </div>
              </div>
            )}

            {/* ÉTAPE 5 — Risques & Conformité */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Principaux risques identifiés (sélection multiple)</label>
                  <MultiSelect options={RISQUES_OPTIONS} selected={data.risques} onChange={v => update('risques', v)} />
                </div>
                <div>
                  <label className={labelClass}>Niveau de conformité réglementaire estimé</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CONFORMITE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('niveauConformite', opt)}
                        className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 cursor-pointer"
                        style={{
                          background: data.niveauConformite === opt ? 'linear-gradient(135deg, #0a1628, #1a2d4a)' : 'rgba(0,0,0,0.04)',
                          color: data.niveauConformite === opt ? 'white' : '#374151',
                          border: data.niveauConformite === opt ? '1px solid #86BC25' : '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        {data.niveauConformite === opt && <i className="ri-check-line mr-1 text-xs" style={{ color: '#86BC25' }}></i>}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Besoins d&apos;accompagnement (sélection multiple)</label>
                  <MultiSelect options={ACCOMPAGNEMENT_OPTIONS} selected={data.besoinAccompagnement} onChange={v => update('besoinAccompagnement', v)} />
                </div>

                {/* Récapitulatif */}
                <div className="p-5 rounded-xl" style={{ background: 'rgba(10,22,40,0.04)', border: '1px solid rgba(212,168,42,0.2)' }}>
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-file-list-3-line" style={{ color: '#86BC25' }}></i>
                    Récapitulatif de votre dossier
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div><span className="font-semibold">Organisation :</span> {data.nomEntreprise || '—'}</div>
                    <div><span className="font-semibold">Secteur :</span> {data.secteur || '—'}</div>
                    <div><span className="font-semibold">Pays :</span> {data.pays || '—'}</div>
                    <div><span className="font-semibold">Fonction :</span> {data.fonction || '—'}</div>
                    <div><span className="font-semibold">CA :</span> {data.chiffreAffaires || '—'}</div>
                    <div><span className="font-semibold">Croissance :</span> {data.croissance || '—'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ border: '1px solid rgba(0,0,0,0.12)', color: '#374151', background: 'white' }}
              >
                <i className="ri-arrow-left-line"></i>
                Précédent
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d4a)', color: 'white', border: '1px solid rgba(212,168,42,0.3)' }}
                >
                  Étape suivante
                  <i className="ri-arrow-right-line"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e', boxShadow: '0 4px 20px rgba(212,168,42,0.4)' }}
                >
                  {isSubmitting ? (
                    <><i className="ri-loader-4-line animate-spin"></i>Génération en cours...</>
                  ) : (
                    <><i className="ri-file-chart-line"></i>Générer mon Board Report</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Garanties sous le formulaire */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[
            { icon: 'ri-lock-line', label: 'Données 100% sécurisées' },
            { icon: 'ri-time-line', label: 'Résultat en moins de 30 min' },
            { icon: 'ri-gift-line', label: 'Entièrement gratuit' },
            { icon: 'ri-shield-check-line', label: 'Sans engagement' },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
              <i className={`${g.icon} text-base`} style={{ color: '#86BC25' }}></i>
              {g.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
