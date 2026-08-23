import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const REFERENTIELS = [
  { key: 'COBAC', label: 'COBAC — CEMAC', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { key: 'BCEAO', label: 'BCEAO — UEMOA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { key: 'OHADA', label: 'OHADA', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { key: 'GIABA', label: 'GIABA — LBC/FT', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { key: 'GABAC', label: 'GABAC — LBC/FT', color: 'bg-violet-100 text-violet-800 border-violet-200' },
];

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

export default function HomePublicationAlertSubscribe() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const [email, setEmail] = useState('');
  const [selectedRefs, setSelectedRefs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleRef = (ref: string) => {
    setSelectedRefs(prev =>
      prev.includes(ref) ? prev.filter(r => r !== ref) : [...prev, ref]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/publication_alert_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          email: email.trim(),
          referentiels: selectedRefs.length > 0 ? selectedRefs : ['COBAC', 'BCEAO', 'OHADA', 'GIABA', 'GABAC'],
          langue: isFr ? 'fr' : 'en',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setSelectedRefs([]);
      } else {
        const data = await res.json().catch(() => undefined);
        setErrorMsg(data.message || (isFr ? 'Erreur lors de l\'inscription.' : 'Subscription error.'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(isFr ? 'Erreur réseau. Veuillez réessayer.' : 'Network error. Please try again.');
      setStatus('error');
    }
  };

  const copy = {
    badge: isFr ? 'Alertes Publication' : 'Publication Alerts',
    title: isFr
      ? 'Soyez notifié avant la publication de nos prochains articles'
      : 'Get notified before our next articles are published',
    subtitle: isFr
      ? 'Recevez un email 24h avant chaque nouvelle publication. Choisissez vos référentiels préférés pour des alertes ciblées.'
      : 'Receive an email 24h before each new publication. Choose your preferred frameworks for targeted alerts.',
    placeholder: isFr ? 'Votre adresse e-mail' : 'Your email address',
    refsLabel: isFr ? 'Référentiels souhaités (optionnel — tous par défaut) :' : 'Preferred frameworks (optional — all by default):',
    button: isFr ? "S'inscrire aux alertes" : 'Subscribe to alerts',
    loading: isFr ? 'Inscription...' : 'Subscribing...',
    success: isFr ? 'Inscription confirmée !' : 'Subscription confirmed!',
    successSub: isFr
      ? 'Vous recevrez un email 24h avant la publication de chaque nouvel article correspondant à vos référentiels.'
      : 'You will receive an email 24h before each new article matching your selected frameworks.',
    error: isFr
      ? "Une erreur est survenue. Veuillez réessayer."
      : 'An error occurred. Please try again.',
    trust1: isFr ? 'Données protégées' : 'Data protected',
    trust2: isFr ? 'Désabonnement 1 clic' : '1-click unsubscribe',
    trust3: isFr ? 'Zéro spam' : 'Zero spam',
  };

  return (
    <section className="py-20 relative overflow-hidden bg-background-50">
      <div className="absolute inset-0 bg-gradient-to-b from-background-100/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <ScrollReveal animation="fadeSlideLeft">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-widest mb-6">
                <i className="ri-notification-3-line text-sm"></i>
                {copy.badge}
              </span>

              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground-950 leading-snug mb-5">
                {copy.title}
              </h2>
              <p className="text-foreground-600 text-base leading-relaxed mb-8 text-justify">
                {copy.subtitle}
              </p>

              {/* Mini features */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-primary-100 rounded-lg">
                    <i className="ri-timer-line text-primary-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-foreground-900 text-sm font-semibold">
                      {isFr ? 'Alerte 24h avant' : '24h advance alert'}
                    </p>
                    <p className="text-foreground-500 text-xs">
                      {isFr ? 'Soyez le premier informé avant la publication officielle' : 'Be the first to know before the official publication'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-secondary-100 rounded-lg">
                    <i className="ri-filter-3-line text-secondary-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-foreground-900 text-sm font-semibold">
                      {isFr ? 'Filtrage par référentiel' : 'Filter by framework'}
                    </p>
                    <p className="text-foreground-500 text-xs">
                      {isFr ? 'COBAC, BCEAO, OHADA, GIABA, GABAC — vous choisissez' : 'COBAC, BCEAO, OHADA, GIABA, GABAC — you choose'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-100 rounded-lg">
                    <i className="ri-mail-unread-line text-accent-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-foreground-900 text-sm font-semibold">
                      {isFr ? 'Email riche et structuré' : 'Rich structured email'}
                    </p>
                    <p className="text-foreground-500 text-xs">
                      {isFr ? 'Titre, résumé, auteurs, mots-clés — tout dans votre boîte' : 'Title, abstract, authors, keywords — all in your inbox'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal animation="fadeSlideRight" delay={100}>
            <div className="bg-background-50 border border-background-200 rounded-2xl p-8 lg:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full">
                    <i className="ri-check-double-line text-emerald-500 text-3xl"></i>
                  </div>
                  <p className="text-foreground-950 text-xl font-semibold font-heading">{copy.success}</p>
                  <p className="text-foreground-500 text-sm max-w-sm">{copy.successSub}</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary-100 rounded-xl mb-4">
                      <i className="ri-notification-3-line text-primary-500 text-xl"></i>
                    </div>
                    <p className="text-foreground-500 text-sm leading-relaxed text-justify">
                      {isFr
                        ? 'Plus de 500 abonnés reçoivent déjà nos alertes. Rejoignez-les pour ne rien manquer de l\'actualité réglementaire africaine.'
                        : 'Over 500 subscribers already receive our alerts. Join them to stay on top of African regulatory news.'}
                    </p>
                  </div>

                  <form
                    data-readdy-form
                    id="publication-alert-subscribe-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Honeypot anti-spam */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                      <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none w-5 h-full">
                        <i className="ri-mail-line text-foreground-400 text-sm"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={copy.placeholder}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background-100 border border-background-200 text-foreground-900 placeholder-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Referentiels */}
                    <div>
                      <p className="text-foreground-600 text-xs font-medium mb-3">{copy.refsLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {REFERENTIELS.map(ref => (
                          <button
                            key={ref.key}
                            type="button"
                            onClick={() => toggleRef(ref.key)}
                            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                              selectedRefs.includes(ref.key)
                                ? ref.color + ' ring-1 ring-offset-1'
                                : 'bg-background-100 text-foreground-500 border-background-200 hover:border-foreground-300'
                            }`}
                          >
                            {ref.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="whitespace-nowrap w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center text-sm"
                    >
                      {status === 'loading' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          <span>{copy.loading}</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-notification-3-line"></i>
                          <span>{copy.button}</span>
                        </>
                      )}
                    </button>
                  </form>

                  {status === 'error' && (
                    <p className="mt-3 text-red-500 text-xs flex items-center gap-1.5">
                      <i className="ri-error-warning-line"></i>
                      {errorMsg || copy.error}
                    </p>
                  )}

                  {/* Trust indicators */}
                  <div className="mt-6 flex flex-wrap gap-4 text-foreground-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-shield-check-line text-primary-400"></i>
                      {copy.trust1}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-close-circle-line text-primary-400"></i>
                      {copy.trust2}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-spam-2-line text-primary-400"></i>
                      {copy.trust3}
                    </span>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}



