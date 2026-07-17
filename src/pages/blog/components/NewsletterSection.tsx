import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FORM_URL = 'https://readdy.ai/api/form/d6mndldv117fnkj2h7m0';

export function NewsletterSection() {
  const { t } = useTranslation();
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
    <section className="py-20 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-gold-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/20 rounded-full mb-6">
          <i className="ri-mail-send-line text-gold-400 text-2xl"></i>
        </div>

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-300 text-sm font-medium rounded-full mb-4 tracking-wide uppercase">
          {t('blogPage.newsletter.badge')}
        </span>

        <h2 className="font-playfair text-4xl font-bold text-white mb-4">
          {t('blogPage.newsletter.title')}
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          {t('blogPage.newsletter.subtitle')}
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500/20 rounded-full">
              <i className="ri-check-line text-green-400 text-2xl"></i>
            </div>
            <p className="text-green-300 text-lg font-medium">{t('blogPage.newsletter.success')}</p>
            <p className="text-gray-400 text-sm">{t('blogPage.newsletter.successSub')}</p>
          </div>
        ) : (
          <form
            data-readdy-form
            id="blog-newsletter-form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none w-5 h-full">
                <i className="ri-mail-line text-gray-400 text-base"></i>
              </div>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('blogPage.newsletter.placeholder')}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="whitespace-nowrap px-7 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-gold-500/30 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
            >
              {status === 'loading' ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  <span>{t('blogPage.newsletter.loading')}</span>
                </>
              ) : (
                <>
                  <span>{t('blogPage.newsletter.button')}</span>
                  <i className="ri-arrow-right-line text-base"></i>
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm flex items-center justify-center gap-2">
            <i className="ri-error-warning-line"></i>
            {t('blogPage.newsletter.error')}
          </p>
        )}

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
          <span className="flex items-center gap-1.5">
            <i className="ri-shield-check-line text-gold-400"></i>
            {t('blogPage.newsletter.trust1')}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-spam-2-line text-gold-400"></i>
            {t('blogPage.newsletter.trust2')}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-close-circle-line text-gold-400"></i>
            {t('blogPage.newsletter.trust3')}
          </span>
        </div>
      </div>
    </section>
  );
}
