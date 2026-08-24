import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

const DIAGNOSTIC_FORM_URL = 'https://readdy.ai/api/form/d7b9lvmoim692ipjm2eg';

export function DiagnosticOffer() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('diagnosticOffer.modal.form.errors.nameRequired', 'Le nom est requis');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('diagnosticOffer.modal.form.errors.emailRequired', 'L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('diagnosticOffer.modal.form.errors.emailInvalid', 'Email invalide');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        message: formData.message,
        subject: 'Diagnostic stratégique confidentiel',
        source_page: window.location.pathname,
        form_type: 'diagnostic',
      });

      const res = await fetch(DIAGNOSTIC_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          message: ''
        });
        setErrors({});

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'diagnostic_request', {
            event_category: 'Lead',
            event_label: 'Diagnostic Offer',
            value: window.location.pathname,
          });
        }

        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: 'ri-shield-check-line',
      titleKey: 'diagnosticOffer.benefits.confidential.title',
      descKey: 'diagnosticOffer.benefits.confidential.desc'
    },
    {
      icon: 'ri-time-line',
      titleKey: 'diagnosticOffer.benefits.duration.title',
      descKey: 'diagnosticOffer.benefits.duration.desc'
    },
    {
      icon: 'ri-user-star-line',
      titleKey: 'diagnosticOffer.benefits.expert.title',
      descKey: 'diagnosticOffer.benefits.expert.desc'
    },
    {
      icon: 'ri-gift-line',
      titleKey: 'diagnosticOffer.benefits.noCommitment.title',
      descKey: 'diagnosticOffer.benefits.noCommitment.desc'
    }
  ];

  const outcomes = [
    {
      icon: 'ri-search-eye-line',
      textKey: 'diagnosticOffer.outcomes.analyze'
    },
    {
      icon: 'ri-lightbulb-flash-line',
      textKey: 'diagnosticOffer.outcomes.identify'
    },
    {
      icon: 'ri-compass-3-line',
      textKey: 'diagnosticOffer.outcomes.propose'
    }
  ];

  return (
    <>
      <section id="diagnostic-offer" className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-gold-50 via-white to-navy-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-navy-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full text-sm font-semibold shadow-lg">
              <i className="ri-vip-crown-line text-lg" aria-hidden="true"></i>
              <span>{t('diagnosticOffer.badge')}</span>
            </div>
          </div>

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-4 sm:mb-6">
              {t('diagnosticOffer.title')}
            </h2>
            <p className="text-xl sm:text-2xl text-navy-600 max-w-4xl mx-auto leading-relaxed">
              {t('diagnosticOffer.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-navy-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-gold-600" aria-hidden="true"></i>
                </div>
                {t('diagnosticOffer.whatYouGet.title')}
              </h3>
              
              <div className="space-y-6 mb-8">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <i className={`${outcome.icon} text-2xl text-white`} aria-hidden="true"></i>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-lg text-navy-700 font-medium leading-relaxed">
                        {t(outcome.textKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full px-8 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-bold text-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
                aria-label="Obtenir mon diagnostic gratuit en 30 min"
              >
                <i className="ri-calendar-check-line text-2xl" aria-hidden="true"></i>
                <span>{t('diagnosticOffer.cta', 'Obtenir mon diagnostic gratuit en 30 min')}</span>
              </button>

              {/* Badge de réassurance sous le CTA */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-navy-600">
                <div className="flex items-center gap-1.5">
                  <i className="ri-shield-check-line text-gold-600"></i>
                  <span>{t('diagnosticOffer.reassurance.noCommitment')}</span>
                </div>
                <span className="text-navy-300">•</span>
                <div className="flex items-center gap-1.5">
                  <i className="ri-time-line text-gold-600"></i>
                  <span>{t('diagnosticOffer.reassurance.responseTime')}</span>
                </div>
                <span className="text-navy-300">•</span>
                <div className="flex items-center gap-1.5">
                  <i className="ri-lock-line text-gold-600"></i>
                  <span>{t('diagnosticOffer.reassurance.confidential')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 sm:p-7 shadow-md border border-navy-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${benefit.icon} text-3xl text-gold-600`} aria-hidden="true"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-navy-900 mb-2">
                        {t(benefit.titleKey)}
                      </h4>
                      <p className="text-navy-600 leading-relaxed">
                        {t(benefit.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 sm:p-10 text-center shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white">
              <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                <i className="ri-shield-check-line text-3xl text-gold-400" aria-hidden="true"></i>
                <span className="text-lg font-semibold">{t('diagnosticOffer.trust.confidential')}</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/20"></div>
              <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                <i className="ri-award-line text-3xl text-gold-400" aria-hidden="true"></i>
                <span className="text-lg font-semibold">{t('diagnosticOffer.trust.expertise')}</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/20"></div>
              <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                <i className="ri-customer-service-2-line text-3xl text-gold-400" aria-hidden="true"></i>
                <span className="text-lg font-semibold">{t('diagnosticOffer.trust.support')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="diagnostic-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-8 text-white relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Fermer le formulaire"
              >
                <i className="ri-close-line text-2xl" aria-hidden="true"></i>
              </button>
              <h3 id="diagnostic-modal-title" className="text-3xl font-bold mb-2">
                {t('diagnosticOffer.modal.title')}
              </h3>
              <p className="text-gold-50 text-lg">
                {t('diagnosticOffer.modal.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8" noValidate data-readdy-form>
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3" role="alert">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 flex-shrink-0" aria-hidden="true"></i>
                  <div>
                    <p className="font-semibold text-green-900">
                      {t('diagnosticOffer.modal.success.title')}
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      {t('diagnosticOffer.modal.success.message')}
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3" role="alert">
                  <i className="ri-error-warning-fill text-2xl text-red-600 flex-shrink-0" aria-hidden="true"></i>
                  <div>
                    <p className="font-semibold text-red-900">
                      {t('diagnosticOffer.modal.error.title')}
                    </p>
                    <p className="text-red-700 text-sm mt-1">
                      {t('diagnosticOffer.modal.error.message')}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="diagnostic-name" className="block text-sm font-semibold text-navy-700 mb-2">
                    {t('diagnosticOffer.modal.form.name')} <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <input
                    type="text"
                    id="diagnostic-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-base transition-all ${
                      errors.name ? 'border-red-500' : 'border-navy-300'
                    }`}
                    placeholder={t('diagnosticOffer.modal.form.namePlaceholder')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'diagnostic-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="diagnostic-name-error" className="mt-1 text-sm text-red-600" role="alert">
                      <i className="ri-error-warning-line" aria-hidden="true"></i> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="diagnostic-email" className="block text-sm font-semibold text-navy-700 mb-2">
                    {t('diagnosticOffer.modal.form.email')} <span className="text-red-500" aria-label="requis">*</span>
                  </label>
                  <input
                    type="email"
                    id="diagnostic-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-base transition-all ${
                      errors.email ? 'border-red-500' : 'border-navy-300'
                    }`}
                    placeholder={t('diagnosticOffer.modal.form.emailPlaceholder')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'diagnostic-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="diagnostic-email-error" className="mt-1 text-sm text-red-600" role="alert">
                      <i className="ri-error-warning-line" aria-hidden="true"></i> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="diagnostic-phone" className="block text-sm font-semibold text-navy-700 mb-2">
                    {t('diagnosticOffer.modal.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="diagnostic-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-base transition-all"
                    placeholder={t('diagnosticOffer.modal.form.phonePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="diagnostic-organization" className="block text-sm font-semibold text-navy-700 mb-2">
                    {t('diagnosticOffer.modal.form.organization')}
                  </label>
                  <input
                    type="text"
                    id="diagnostic-organization"
                    name="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-base transition-all"
                    placeholder={t('diagnosticOffer.modal.form.organizationPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="diagnostic-message" className="block text-sm font-semibold text-navy-700 mb-2">
                    {t('diagnosticOffer.modal.form.message')}
                  </label>
                  <textarea
                    id="diagnostic-message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-base resize-none transition-all"
                    placeholder={t('diagnosticOffer.modal.form.messagePlaceholder')}
                  />
                  <p className={`text-sm mt-1 ${formData.message.length > 450 ? 'text-red-600' : 'text-navy-500'}`}>
                    {formData.message.length}/500 {t('diagnosticOffer.modal.form.characters')}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-bold text-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 whitespace-nowrap hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
                aria-label={isSubmitting ? t('diagnosticOffer.modal.form.submitting') : t('diagnosticOffer.modal.form.submit')}
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line text-2xl animate-spin" aria-hidden="true"></i>
                    <span>{t('diagnosticOffer.modal.form.submitting')}</span>
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-fill text-2xl" aria-hidden="true"></i>
                    <span>{t('diagnosticOffer.modal.form.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}



