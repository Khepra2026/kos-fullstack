import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';

/**
 * DiagnosticFlashFormOptimized
 * ─────────────────────────────
 * Tunnel de conversion optimisé — 3 étapes max, progression visuelle,
 * réduction du nombre de clics avant soumission.
 *
 * Optimisations UX :
 * - Étape 1 : Enjeu principal (1 clic — sélection visuelle)
 * - Étape 2 : Nom + Organisation (2 champs)
 * - Étape 3 : Email (1 champ) + soumission
 * Total : 3 étapes vs 4 champs en une seule page (moins intimidant)
 */

const FORM_URL = 'https://readdy.ai/api/form/d7jlrgt1p46osftjro2g';

type Step = 1 | 2 | 3;

interface FormData {
  challenge: string;
  name: string;
  organization: string;
  email: string;
}

const CHALLENGES_FR = [
  { value: 'Conformité BCEAO/OHADA', icon: 'ri-shield-check-line', label: 'Conformité BCEAO/OHADA' },
  { value: 'Levée de fonds', icon: 'ri-funds-line', label: 'Levée de fonds' },
  { value: 'Transformation digitale', icon: 'ri-smartphone-line', label: 'Transformation digitale' },
  { value: 'Gouvernance & structuration', icon: 'ri-organization-chart', label: 'Gouvernance & structuration' },
  { value: 'Performance financière', icon: 'ri-line-chart-line', label: 'Performance financière' },
  { value: 'Ressources humaines', icon: 'ri-team-line', label: 'Ressources humaines' },
];

const CHALLENGES_EN = [
  { value: 'BCEAO/OHADA compliance', icon: 'ri-shield-check-line', label: 'BCEAO/OHADA compliance' },
  { value: 'Fundraising', icon: 'ri-funds-line', label: 'Fundraising' },
  { value: 'Digital transformation', icon: 'ri-smartphone-line', label: 'Digital transformation' },
  { value: 'Governance & structuring', icon: 'ri-organization-chart', label: 'Governance & structuring' },
  { value: 'Financial performance', icon: 'ri-line-chart-line', label: 'Financial performance' },
  { value: 'Human resources', icon: 'ri-team-line', label: 'Human resources' },
];

const GOLD = '#86BC25';
const DARK = '#060d1a';

export default function DiagnosticFlashFormOptimized() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot('diagnostic-flash-opt');

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({ challenge: '', name: '', organization: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const challenges = isEn ? CHALLENGES_EN : CHALLENGES_FR;

  const labels = {
    sectionBadge: isEn ? 'Free consultation' : 'Consultation gratuite',
    title: isEn ? 'Talk to an expert' : 'Parler à un expert',
    subtitle: isEn
      ? 'One of our advisors will contact you within 24h.'
      : 'Un conseiller vous contacte sous 24h.',
    step1Title: isEn ? 'What is your main challenge?' : 'Quel est votre enjeu principal ?',
    step2Title: isEn ? 'Who are you?' : 'Qui êtes-vous ?',
    step3Title: isEn ? 'Where should we reach you?' : 'Comment vous joindre ?',
    name: isEn ? 'Full name' : 'Nom complet',
    namePh: isEn ? 'Your full name' : 'Votre nom complet',
    org: isEn ? 'Organization' : 'Organisation',
    orgPh: isEn ? 'Company / Institution' : 'Entreprise / Institution',
    email: isEn ? 'Professional email' : 'Email professionnel',
    emailPh: isEn ? 'name@company.com' : 'prenom@organisation.com',
    next: isEn ? 'Continue' : 'Continuer',
    back: isEn ? 'Back' : 'Retour',
    submit: isEn ? 'Request my expert callback' : 'Demander mon rappel expert',
    submitting: isEn ? 'Sending...' : 'Envoi en cours...',
    successTitle: isEn ? 'Request sent!' : 'Demande envoyée !',
    successText: isEn
      ? 'An advisor will contact you within 24 working hours.'
      : 'Un conseiller vous contacte sous 24h ouvrées.',
    errorText: isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Réessayez.',
    confidential: isEn ? 'Confidential · No commitment' : 'Confidentiel · Sans engagement',
    stepOf: isEn ? 'of' : 'sur',
  };

  const handleChallengeSelect = (value: string) => {
    setForm((prev) => ({ ...prev, challenge: value }));
    // Auto-advance to step 2 after selection
    setTimeout(() => setStep(2), 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;

    if (validateHoneypot()) {
      setStatus('error');
      return;
    }
    if (checkRateLimit()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const payload: Record<string, string> = {
      name: form.name,
      organization: form.organization,
      challenge: form.challenge,
      email: form.email,
      language: isEn ? 'en' : 'fr',
    };

    const result = await submitFormSecure(payload, FORM_URL, {
      honeypotValue: inputRef.current?.value || '',
      formId: 'diagnostic-flash-opt',
    });

    setStatus(result.ok ? 'success' : 'error');
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(212,168,42,0.20)',
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = GOLD;
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)';
  };

  return (
    <section className="py-20 bg-white border-t border-amber-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden" style={{ background: DARK, border: '1px solid rgba(212,168,42,0.18)' }}>
          <div className="p-8 md:p-12">

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6" style={{ background: GOLD }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {labels.sectionBadge}
              </span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-1">{labels.title}</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>{labels.subtitle}</p>

            {/* Progress bar */}
            {status !== 'success' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.40)' }}>
                    {isEn ? 'Step' : 'Étape'} {step} {labels.stepOf} 3
                  </span>
                  <span className="text-xs font-bold" style={{ color: GOLD }}>
                    {Math.round((step / 3) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(step / 3) * 100}%`, background: `linear-gradient(90deg, ${GOLD}, #f4d03f)` }}
                  />
                </div>
                {/* Step indicators */}
                <div className="flex items-center justify-between mt-3">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{
                          background: s <= step ? `linear-gradient(135deg, ${GOLD}, #f4d03f)` : 'rgba(255,255,255,0.08)',
                          color: s <= step ? DARK : 'rgba(255,255,255,0.30)',
                        }}
                      >
                        {s < step ? <i className="ri-check-line text-xs" /> : s}
                      </div>
                      <span className="text-xs hidden sm:block" style={{ color: s <= step ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.25)' }}>
                        {s === 1 ? (isEn ? 'Challenge' : 'Enjeu') : s === 2 ? (isEn ? 'Profile' : 'Profil') : (isEn ? 'Contact' : 'Contact')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5" style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}>
                  <i className="ri-check-double-line text-2xl" style={{ color: '#10b981' }} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-white mb-3">{labels.successTitle}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{labels.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-readdy-form className="relative">
                <HoneypotField inputRef={inputRef} />

                {/* ── STEP 1 : Challenge ── */}
                {step === 1 && (
                  <div className="animate-fadeSlideUp">
                    <p className="text-sm font-semibold text-white mb-5">{labels.step1Title}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {challenges.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => handleChallengeSelect(c.value)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all cursor-pointer hover:scale-105"
                          style={{
                            background: form.challenge === c.value ? `${GOLD}18` : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${form.challenge === c.value ? GOLD : 'rgba(255,255,255,0.08)'}`,
                          }}
                        >
                          <div
                            className="w-9 h-9 flex items-center justify-center rounded-lg"
                            style={{ background: form.challenge === c.value ? `${GOLD}25` : 'rgba(255,255,255,0.06)' }}
                          >
                            <i className={`${c.icon} text-base`} style={{ color: form.challenge === c.value ? GOLD : 'rgba(255,255,255,0.45)' }} />
                          </div>
                          <span className="text-xs font-semibold leading-tight" style={{ color: form.challenge === c.value ? GOLD : 'rgba(255,255,255,0.60)' }}>
                            {c.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {form.challenge && (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, #f4d03f)`, color: DARK }}
                      >
                        {labels.next} <i className="ri-arrow-right-line" />
                      </button>
                    )}
                  </div>
                )}

                {/* ── STEP 2 : Name + Org ── */}
                {step === 2 && (
                  <div className="animate-fadeSlideUp space-y-4">
                    <p className="text-sm font-semibold text-white mb-5">{labels.step2Title}</p>

                    {/* Selected challenge recap */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-2" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}25` }}>
                      <i className="ri-check-line text-xs" style={{ color: GOLD }} />
                      <span className="text-xs font-semibold" style={{ color: GOLD }}>{form.challenge}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                        {labels.name} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={labels.namePh}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                        style={inputStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                        {labels.org} *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        required
                        value={form.organization}
                        onChange={handleChange}
                        placeholder={labels.orgPh}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                        style={inputStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                        style={{ color: 'rgba(255,255,255,0.50)', border: '1px solid rgba(255,255,255,0.12)' }}
                      >
                        <i className="ri-arrow-left-line" /> {labels.back}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!form.name || !form.organization}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, #f4d03f)`, color: DARK }}
                      >
                        {labels.next} <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 : Email + Submit ── */}
                {step === 3 && (
                  <div className="animate-fadeSlideUp space-y-4">
                    <p className="text-sm font-semibold text-white mb-5">{labels.step3Title}</p>

                    {/* Recap */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}25` }}>
                        <i className="ri-check-line text-xs" /> {form.challenge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <i className="ri-user-line text-xs" /> {form.name}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                        {labels.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder={labels.emailPh}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                        style={inputStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs px-4 py-2 rounded-lg" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}>
                        {labels.errorText}
                      </p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                        style={{ color: 'rgba(255,255,255,0.50)', border: '1px solid rgba(255,255,255,0.12)' }}
                      >
                        <i className="ri-arrow-left-line" /> {labels.back}
                      </button>
                      <button
                        type="submit"
                        disabled={status === 'submitting' || !form.email}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, #f4d03f)`, color: DARK }}
                      >
                        {status === 'submitting' ? (
                          <><i className="ri-loader-4-line animate-spin" /> {labels.submitting}</>
                        ) : (
                          <><i className="ri-user-voice-line" /> {labels.submit}</>
                        )}
                      </button>
                    </div>

                    <p className="text-xs flex items-center justify-center gap-1.5 pt-1" style={{ color: 'rgba(255,255,255,0.30)' }}>
                      <i className="ri-lock-line" /> {labels.confidential}
                    </p>
                  </div>
                )}

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



