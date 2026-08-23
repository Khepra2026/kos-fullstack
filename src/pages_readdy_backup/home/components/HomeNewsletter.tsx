import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

const FORM_URL = 'https://readdy.ai/api/form/d6nf9mh4a3uojp5fh5h0';

export function HomeNewsletter() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const body = new URLSearchParams({ email });
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const copy = {
    badge: isFr ? 'Restez informé' : 'Stay informed',
    title: isFr
      ? 'Recevez nos analyses et insights directement dans votre boîte mail'
      : 'Get our analyses and insights directly in your inbox',
    subtitle: isFr
      ? 'Gouvernance, stratégie, finance, RH — nos experts partagent chaque mois leurs meilleures réflexions pour vous aider à prendre de meilleures décisions.'
      : 'Governance, strategy, finance, HR — our experts share their best insights every month to help you make better decisions.',
    placeholder: isFr ? 'Votre adresse e-mail' : 'Your email address',
    button: isFr ? "S'abonner" : 'Subscribe',
    loading: isFr ? 'Envoi...' : 'Sending...',
    success: isFr ? 'Bienvenue dans notre communauté !' : 'Welcome to our community!',
    successSub: isFr
      ? 'Vous recevrez nos prochaines publications dès leur parution.'
      : 'You will receive our next publications as soon as they are published.',
    error: isFr
      ? 'Une erreur est survenue. Veuillez réessayer.'
      : 'An error occurred. Please try again.',
    trust1: isFr ? 'Données protégées' : 'Data protected',
    trust2: isFr ? 'Zéro spam' : 'Zero spam',
    trust3: isFr ? 'Désinscription en 1 clic' : 'Unsubscribe in 1 click',
    stats1: isFr ? 'abonnés actifs' : 'active subscribers',
    stats2: isFr ? 'publications / mois' : 'publications / month',
    stats3: isFr ? 'pays couverts' : 'countries covered',
    blogLink: isFr ? 'Découvrir nos articles' : 'Explore our articles',
    blogSub: isFr
      ? 'Parcourez déjà nos publications disponibles'
      : 'Browse our available publications',
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gold-950 via-stone-900 to-gold-900">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=abstract%20geometric%20african%20pattern%20gold%20lines%20dark%20background%20elegant%20minimal%20texture%20luxury%20consulting%20firm&width=1400&height=600&seq=home-newsletter-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gold-950/80 via-stone-900/70 to-gold-900/80" />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <ScrollReveal animation="fadeSlideLeft">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/20 text-gold-300 text-xs font-semibold rounded-full uppercase tracking-widest mb-6">
                <i className="ri-mail-send-line"></i>
                {copy.badge}
              </span>

              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-white leading-snug mb-5">
                {copy.title}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6 text-justify">
                {copy.subtitle}
              </p>

              {/* Blog link */}
              <Link
                to="/blog/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-400/30 hover:border-gold-400/60 text-gold-300 hover:text-gold-200 text-sm font-medium rounded-xl transition-all cursor-pointer mb-10 group"
              >
                <i className="ri-article-line text-base"></i>
                <span>{copy.blogLink}</span>
                <i className="ri-arrow-right-line text-xs group-hover:translate-x-1 transition-transform"></i>
              </Link>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-gold-400">500+</div>
                  <div className="text-gray-400 text-xs mt-1">{copy.stats1}</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-gold-400">2</div>
                  <div className="text-gray-400 text-xs mt-1">{copy.stats2}</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-gold-400">8</div>
                  <div className="text-gray-400 text-xs mt-1">{copy.stats3}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal animation="fadeSlideRight" delay={100}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full">
                    <i className="ri-check-double-line text-green-400 text-3xl"></i>
                  </div>
                  <p className="text-white text-xl font-semibold font-playfair">{copy.success}</p>
                  <p className="text-gray-400 text-sm">{copy.successSub}</p>
                  <Link
                    to="/blog/"
                    className="mt-2 inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors cursor-pointer"
                  >
                    <i className="ri-article-line"></i>
                    <span>{copy.blogLink}</span>
                    <i className="ri-arrow-right-line text-xs"></i>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-xl mb-4">
                      <i className="ri-newspaper-line text-gold-400 text-xl"></i>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed text-justify">
                      {isFr
                        ? 'Rejoignez les dirigeants et décideurs africains qui font confiance à KHEPRA EXPERTS pour rester à la pointe.'
                        : 'Join African leaders and decision-makers who trust KHEPRA EXPERTS to stay ahead.'}
                    </p>
                  </div>

                  <form
                    data-readdy-form
                    id="home-newsletter-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none w-5 h-full">
                        <i className="ri-mail-line text-gray-400 text-sm"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={copy.placeholder}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="whitespace-nowrap w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl transition-all disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center text-sm"
                    >
                      {status === 'loading' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          <span>{copy.loading}</span>
                        </>
                      ) : (
                        <>
                          <span>{copy.button}</span>
                          <i className="ri-arrow-right-line"></i>
                        </>
                      )}
                    </button>
                  </form>

                  {status === 'error' && (
                    <p className="mt-3 text-red-400 text-xs flex items-center gap-1.5">
                      <i className="ri-error-warning-line"></i>
                      {copy.error}
                    </p>
                  )}

                  {/* Trust indicators */}
                  <div className="mt-6 flex flex-wrap gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-shield-check-line text-gold-400"></i>
                      {copy.trust1}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-spam-2-line text-gold-400"></i>
                      {copy.trust2}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-close-circle-line text-gold-400"></i>
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




