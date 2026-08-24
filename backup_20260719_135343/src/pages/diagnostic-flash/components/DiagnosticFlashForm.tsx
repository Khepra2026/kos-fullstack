import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';

export default function DiagnosticFlashForm() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot('diagnostic-flash');

  const [form, setForm] = useState({ name: '', organization: '', challenge: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'challenge') setCharCount(value.length);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.organization || !form.challenge || !form.email) return;
    if (charCount > 500) return;

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

    const result = await submitFormSecure(payload, 'https://readdy.ai/api/form/d7jlrgt1p46osftjro2g', {
      honeypotValue: inputRef.current?.value || '',
      formId: 'diagnostic-flash',
    });

    setStatus(result.ok ? 'success' : 'error');
  };

  const CHALLENGES_FR = [
    'Conformité BCEAO/OHADA',
    'Levée de fonds',
    'Transformation digitale',
    'Gouvernance & structuration',
    'Performance financière',
    'Ressources humaines',
    'Autre',
  ];

  const CHALLENGES_EN = [
    'BCEAO/OHADA compliance',
    'Fundraising',
    'Digital transformation',
    'Governance & structuring',
    'Financial performance',
    'Human resources',
    'Other',
  ];

  const challenges = isEn ? CHALLENGES_EN : CHALLENGES_FR;

  const labels = {
    title: isEn ? 'Talk to an expert' : 'Parler à un expert',
    subtitle: isEn
      ? 'Fill in this short form and one of our advisors will contact you within 24h.'
      : 'Remplissez ce formulaire court et l\'un de nos conseillers vous contacte sous 24h.',
    name: isEn ? 'Full name *' : 'Nom complet *',
    namePh: isEn ? 'Your full name' : 'Votre nom complet',
    org: isEn ? 'Organization *' : 'Organisation *',
    orgPh: isEn ? 'Company / Institution' : 'Entreprise / Institution',
    email: isEn ? 'Professional email *' : 'Email professionnel *',
    emailPh: isEn ? 'name@company.com' : 'prenom@organisation.com',
    challenge: isEn ? 'Main challenge *' : 'Enjeu principal *',
    challengePh: isEn ? 'Describe your main challenge (max 500 characters)' : 'Décrivez votre enjeu principal (max 500 caractères)',
    submit: isEn ? 'Request my expert callback' : 'Demander mon rappel expert',
    submitting: isEn ? 'Sending...' : 'Envoi en cours...',
    successTitle: isEn ? 'Request sent!' : 'Demande envoyée !',
    successText: isEn
      ? 'An advisor will contact you within 24 working hours. Check your inbox.'
      : 'Un conseiller vous contacte sous 24h ouvrées. Vérifiez votre boîte mail.',
    errorText: isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Réessayez.',
    confidential: isEn ? 'Confidential · No commitment' : 'Confidentiel · Sans engagement',
    charLimit: isEn ? 'characters max.' : 'caractères max.',
  };

  return (
    <section className="py-20 bg-white border-t border-amber-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden" style={{ background: '#060d1a', border: '1px solid rgba(212,168,42,0.18)' }}>
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>
                {isEn ? 'Free consultation' : 'Consultation gratuite'}
              </span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-2">{labels.title}</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.50)' }}>{labels.subtitle}</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5" style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}>
                  <i className="ri-check-double-line text-2xl" style={{ color: '#10b981' }} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-white mb-3">{labels.successTitle}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{labels.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative" data-readdy-form>
                <HoneypotField inputRef={inputRef} />
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      {labels.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={labels.namePh}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(212,168,42,0.20)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      {labels.org}
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={form.organization}
                      onChange={handleChange}
                      placeholder={labels.orgPh}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(212,168,42,0.20)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {labels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={labels.emailPh}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(212,168,42,0.20)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                  />
                </div>

                {/* Challenge select */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {labels.challenge}
                  </label>
                  <select
                    name="challenge"
                    required
                    value={form.challenge}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all cursor-pointer appearance-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(212,168,42,0.20)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                  >
                    <option value="" disabled style={{ background: '#060d1a' }}>
                      {isEn ? '— Select your challenge —' : '— Sélectionnez votre enjeu —'}
                    </option>
                    {challenges.map((c, i) => (
                      <option key={i} value={c} style={{ background: '#060d1a' }}>{c}</option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-xs px-4 py-2 rounded-lg" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}>
                    {labels.errorText}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !form.name || !form.organization || !form.challenge || !form.email}
                    className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#060d1a' }}
                  >
                    {status === 'submitting' ? (
                      <><i className="ri-loader-4-line animate-spin" /> {labels.submitting}</>
                    ) : (
                      <><i className="ri-user-voice-line" /> {labels.submit}</>
                    )}
                  </button>
                  <span className="text-xs flex items-center gap-1.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <i className="ri-lock-line" />
                    {labels.confidential}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



