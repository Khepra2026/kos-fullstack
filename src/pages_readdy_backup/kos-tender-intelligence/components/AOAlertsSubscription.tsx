import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const PAYS_OPTIONS = [
  { code: 'SN', label: 'Sénégal' },
  { code: 'CI', label: "Côte d'Ivoire" },
  { code: 'TG', label: 'Togo' },
  { code: 'CM', label: 'Cameroun' },
  { code: 'GA', label: 'Gabon' },
  { code: 'BF', label: 'Burkina Faso' },
  { code: 'ML', label: 'Mali' },
  { code: 'BJ', label: 'Bénin' },
  { code: 'NE', label: 'Niger' },
  { code: 'GN', label: 'Guinée' },
  { code: 'CG', label: 'Congo' },
  { code: 'CD', label: 'RDC' },
];

const SECTEURS_OPTIONS = [
  'Gouvernance',
  'Audit & Contrôle interne',
  'Conformité réglementaire',
  'Conseil stratégique',
  'Transformation digitale',
  'ESG & Durabilité',
  'Finance & Trésorerie',
  'Microfinance & Inclusive',
  'Fintech & Innovation',
  'Prix de transfert',
  'Levée de fonds',
  'Cybersécurité',
];

const NETWORKS_OPTIONS = [
  { key: 'email', label: 'Email', icon: 'ri-mail-line' },
  { key: 'slack', label: 'Slack', icon: 'ri-slack-line' },
];

interface FormState {
  pays: string[];
  budget_min: number;
  budget_max: number | '';
  secteurs: string[];
  networks: string[];
}

export default function AOAlertsSubscription() {
  const [form, setForm] = useState<FormState>({
    pays: [],
    budget_min: 1_000_000,
    budget_max: '',
    secteurs: ['Gouvernance'],
    networks: ['email'],
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  const togglePays = useCallback((code: string) => {
    setForm((prev) => ({
      ...prev,
      pays: prev.pays.includes(code)
        ? prev.pays.filter((c) => c !== code)
        : [...prev.pays, code],
    }));
  }, []);

  const toggleSecteur = useCallback((secteur: string) => {
    setForm((prev) => ({
      ...prev,
      secteurs: prev.secteurs.includes(secteur)
        ? prev.secteurs.filter((s) => s !== secteur)
        : [...prev.secteurs, secteur],
    }));
  }, []);

  const toggleNetwork = useCallback((key: string) => {
    setForm((prev) => ({
      ...prev,
      networks: prev.networks.includes(key)
        ? prev.networks.filter((k) => k !== key)
        : [...prev.networks, key],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus('loading');
    setErrorMsg('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user?.email;

      if (!userEmail) {
        setStatus('error');
        setErrorMsg('Veuillez vous connecter pour activer les alertes AO/AMI.');
        return;
      }

      const { error } = await supabase.from('ao_alert_subs').insert({
        user_email: userEmail,
        pays: form.pays.length > 0 ? form.pays : null,
        budget_min: form.budget_min,
        budget_max: form.budget_max === '' ? null : Number(form.budget_max),
        secteurs: form.secteurs.length > 0 ? form.secteurs : null,
        networks: form.networks.length > 0 ? form.networks : ['email'],
      });

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setErrorMsg('Vous êtes déjà abonné avec cet email. Modifiez votre alerte depuis vos paramètres.');
        } else {
          setStatus('error');
          setErrorMsg(error.message || 'Erreur lors de la sauvegarde.');
        }
        return;
      }

      setSavedEmail(userEmail);
      setStatus('success');
      setForm({
        pays: [],
        budget_min: 1_000_000,
        budget_max: '',
        secteurs: ['Gouvernance'],
        networks: ['email'],
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur inconnue.');
    }
  }, [form]);

  const isValid =
    form.pays.length > 0 &&
    form.secteurs.length > 0 &&
    form.networks.length > 0 &&
    form.budget_min >= 0;

  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <i className="ri-notification-3-line text-lg"></i>
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground-950">Alertes AO/AMI Big Four</h3>
          <p className="text-xs text-foreground-500">Abonnement personnalisé — Notification &lt; 60s</p>
        </div>
      </div>

      {status === 'success' && (
        <div className="mb-5 p-4 rounded-lg bg-green-50/70 border border-green-200/60 flex items-start gap-3">
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
            <i className="ri-check-line text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground-950">Abonnement activé !</p>
            <p className="text-xs text-foreground-600 mt-0.5">
              Les alertes seront envoyées à <strong>{savedEmail}</strong> dès qu'un AO/AMI correspondra à vos critères.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && errorMsg && (
        <div className="mb-5 p-4 rounded-lg bg-red-50/70 border border-red-200/60 flex items-start gap-3">
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
            <i className="ri-error-warning-line text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground-950">Erreur</p>
            <p className="text-xs text-foreground-600 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Pays */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-foreground-700 mb-2 block">
          Pays concernés <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PAYS_OPTIONS.map((p) => {
            const active = form.pays.includes(p.code);
            return (
              <button
                key={p.code}
                onClick={() => togglePays(p.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                  active
                    ? 'bg-primary-500 text-background-50 border-primary-500'
                    : 'bg-background-100 text-foreground-600 border-background-200/70 hover:border-primary-300'
                }`}
              >
                {active && <i className="ri-check-line mr-1"></i>}
                {p.label}
              </button>
            );
          })}
        </div>
        {form.pays.length === 0 && (
          <p className="text-[11px] text-red-500 mt-1.5">Sélectionnez au moins un pays.</p>
        )}
      </div>

      {/* Budget */}
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-foreground-700 mb-2 block">
            Budget minimum (USD) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={form.budget_min}
            onChange={(e) => setForm((prev) => ({ ...prev, budget_min: Number(e.target.value) }))}
            className="w-full px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-400 transition-colors"
          />
          <p className="text-[11px] text-foreground-400 mt-1">Recevoir uniquement les AO supérieurs à ce montant.</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground-700 mb-2 block">
            Budget maximum (USD) <span className="text-foreground-400 font-normal">— optionnel</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={form.budget_max}
            onChange={(e) => setForm((prev) => ({ ...prev, budget_max: e.target.value === '' ? '' : Number(e.target.value) }))}
            placeholder="Aucune limite"
            className="w-full px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-400 transition-colors"
          />
        </div>
      </div>

      {/* Secteurs */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-foreground-700 mb-2 block">
          Secteurs d'intérêt <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SECTEURS_OPTIONS.map((s) => {
            const active = form.secteurs.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSecteur(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                  active
                    ? 'bg-accent-500 text-background-50 border-accent-500'
                    : 'bg-background-100 text-foreground-600 border-background-200/70 hover:border-accent-300'
                }`}
              >
                {active && <i className="ri-check-line mr-1"></i>}
                {s}
              </button>
            );
          })}
        </div>
        {form.secteurs.length === 0 && (
          <p className="text-[11px] text-red-500 mt-1.5">Sélectionnez au moins un secteur.</p>
        )}
      </div>

      {/* Networks */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-foreground-700 mb-2 block">
          Canaux de notification <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {NETWORKS_OPTIONS.map((n) => {
            const active = form.networks.includes(n.key);
            return (
              <button
                key={n.key}
                onClick={() => toggleNetwork(n.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                  active
                    ? 'bg-secondary-500 text-background-50 border-secondary-500'
                    : 'bg-background-100 text-foreground-600 border-background-200/70 hover:border-secondary-300'
                }`}
              >
                <i className={`${n.icon} ${active ? 'text-background-50' : 'text-foreground-500'}`}></i>
                {n.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || status === 'loading'}
        className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
          isValid && status !== 'loading'
            ? 'bg-primary-500 text-background-50 hover:bg-primary-600'
            : 'bg-background-200 text-foreground-400 cursor-not-allowed'
        }`}
      >
        {status === 'loading' ? (
          <>
            <i className="ri-loader-4-line animate-spin"></i>
            Activation en cours...
          </>
        ) : (
          <>
            <i className="ri-notification-badge-line"></i>
            S'abonner — SLA &lt;60s
          </>
        )}
      </button>

      <p className="text-[11px] text-foreground-400 mt-3">
        <i className="ri-shield-check-line mr-1"></i>
        Les alertes sont filtrées par l'IA KOS. Vous ne recevrez que les AO/AMI correspondant à vos critères Big Four.
      </p>
    </div>
  );
}



