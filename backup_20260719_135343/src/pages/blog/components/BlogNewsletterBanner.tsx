import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FORM_URL = 'https://readdy.ai/api/form/d6mndldv117fnkj2h7m0';

export function BlogNewsletterBanner() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
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

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-gold-200 bg-white shadow-lg">
          {/* Accent bar top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-400"></div>

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold-300/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-300/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 px-8 py-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Left: icon + texte */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-11 h-11 flex items-center justify-center bg-gold-100 rounded-full">
                  <i className="ri-mail-send-line text-gold-600 text-xl"></i>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  {isEn ? 'Stay informed' : 'Restez informé'}
                </span>
              </div>

              <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-snug">
                {isEn
                  ? 'Receive our strategic analyses directly in your inbox'
                  : 'Recevez nos analyses stratégiques directement dans votre boîte mail'}
              </h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-lg">
                {isEn
                  ? 'Join 500+ African leaders who receive our expert insights on governance, finance, compliance and strategic transformation every week.'
                  : 'Rejoignez 500+ décideurs africains qui reçoivent chaque semaine nos analyses d\'experts sur la gouvernance, la finance, la conformité et la transformation stratégique.'}
              </p>

              {/* Indicateurs de confiance */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-gray-500 text-xs justify-center lg:justify-start">
                <span className="flex items-center gap-1.5 font-medium">
                  <i className="ri-shield-check-line text-gold-500"></i>
                  {isEn ? 'No spam' : 'Zéro spam'}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <i className="ri-mail-line text-gold-500"></i>
                  {isEn ? '1 email/week' : '1 email/semaine'}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <i className="ri-close-circle-line text-gold-500"></i>
                  {isEn ? 'Unsubscribe anytime' : 'Désinscription facile'}
                </span>
              </div>
            </div>

            {/* Right: formulaire */}
            <div className="w-full lg:w-auto lg:min-w-[380px] flex-shrink-0">
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full">
                    <i className="ri-check-line text-green-600 text-2xl"></i>
                  </div>
                  <p className="text-green-700 font-semibold text-base text-center">
                    {isEn ? 'You\'re subscribed!' : 'Inscription confirmée\u00a0!'}
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    {isEn
                      ? 'You\'ll receive our next strategic analyses by email.'
                      : 'Vous recevrez nos prochaines analyses stratégiques par e-mail.'}
                  </p>
                </div>
              ) : (
                <form
                  data-readdy-form
                  id="blog-page-newsletter-banner-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none w-5 h-full">
                      <i className="ri-mail-line text-gray-400 text-base"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isEn ? 'your.email@company.com' : 'votre.email@entreprise.com'}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full whitespace-nowrap px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-gold-400/30 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center text-sm"
                  >
                    {status === 'loading' ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-base"></i>
                        <span>{isEn ? 'Subscribing...' : 'Inscription en cours...'}</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-mail-send-line text-base"></i>
                        <span>{isEn ? 'Subscribe to the newsletter' : "Recevoir les analyses stratégiques"}</span>
                        <i className="ri-arrow-right-line text-sm"></i>
                      </>
                    )}
                  </button>
                </form>
              )}

              {status === 'error' && (
                <p className="mt-3 text-red-500 text-xs flex items-center gap-1.5">
                  <i className="ri-error-warning-line"></i>
                  {isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




