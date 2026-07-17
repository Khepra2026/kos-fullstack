import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FORM_URL = 'https://readdy.ai/api/form/d6mndldv117fnkj2h7m0';

export function ArticleNewsletterInline() {
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
    <div className="my-12 relative rounded-2xl overflow-hidden border border-gold-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-sm">
      {/* Accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-400"></div>

      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold-300/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 px-8 py-8 flex flex-col md:flex-row items-center gap-8">
        {/* Left: icon + text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gold-100 rounded-full flex-shrink-0">
              <i className="ri-mail-send-line text-gold-600 text-lg"></i>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              {isEn ? 'Newsletter' : 'Newsletter'}
            </span>
          </div>
          <h3 className="font-playfair text-xl font-bold text-gray-900 mb-1 leading-snug">
            {isEn
              ? 'Enjoyed this article?'
              : 'Cet article vous a plu\u00a0?'}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {isEn
              ? 'Subscribe to receive our next publications directly in your inbox — no spam, unsubscribe anytime.'
              : 'Abonnez-vous pour recevoir nos prochaines publications directement dans votre boîte mail\u00a0— sans spam, désinscription en un clic.'}
          </p>
        </div>

        {/* Right: form */}
        <div className="w-full md:w-auto md:min-w-[340px] flex-shrink-0">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
              <p className="text-green-700 font-semibold text-sm text-center">
                {isEn ? 'You\'re subscribed!' : 'Inscription confirmée\u00a0!'}
              </p>
              <p className="text-gray-400 text-xs text-center">
                {isEn
                  ? 'You\'ll receive our next articles by email.'
                  : 'Vous recevrez nos prochains articles par e-mail.'}
              </p>
            </div>
          ) : (
            <form
              data-readdy-form
              id="article-inline-newsletter-form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none w-4 h-full">
                  <i className="ri-mail-line text-gray-400 text-sm"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isEn ? 'Your email address' : 'Votre adresse e-mail'}
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="whitespace-nowrap px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-gold-400/30 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
              >
                {status === 'loading' ? (
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                ) : (
                  <>
                    <span>{isEn ? 'Subscribe' : "S'abonner"}</span>
                    <i className="ri-arrow-right-line text-sm"></i>
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
              <i className="ri-error-warning-line"></i>
              {isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
            </p>
          )}

          {status !== 'success' && (
            <div className="mt-2.5 flex items-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <i className="ri-shield-check-line text-gold-400"></i>
                {isEn ? 'No spam' : 'Zéro spam'}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-close-circle-line text-gold-400"></i>
                {isEn ? 'Unsubscribe anytime' : 'Désinscription facile'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
