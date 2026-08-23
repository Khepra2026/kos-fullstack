import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

export function ServicesContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d6mmtctv117fnkj2h7i0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', telephone: '', organisation: '', service: '', message: '' });
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
    t('servicesPage.contact.benefits.benefit1'),
    t('servicesPage.contact.benefits.benefit2'),
    t('servicesPage.contact.benefits.benefit3'),
    t('servicesPage.contact.benefits.benefit4'),
  ];

  return (
    <section id="contact-services" className="py-24 bg-gradient-to-br from-navy-900 via-navy-950 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-gold-500/50">
              <span className="text-sm font-medium text-gold-400">{t('servicesPage.contact.badge')}</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t('servicesPage.contact.title')}
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-10">
              {t('servicesPage.contact.subtitle')}
            </p>

            <div className="space-y-6">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <i className="ri-checkbox-circle-line text-gold-400 text-xl"></i>
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 text-white/80 hover:text-gold-400 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20">
                  <i className="ri-mail-line text-gold-400 text-lg"></i>
                </div>
                <span className="text-sm">contact@khepraexperts.com</span>
              </a>
              <a
                href="https://wa.me/22893984909"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 text-white/80 hover:text-gold-400 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20">
                  <i className="ri-whatsapp-line text-green-400 text-lg"></i>
                </div>
                <span className="text-sm flex items-center gap-2">+228 93 98 49 09</span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg gradient-border glow-gold-hover">
            <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-2">{t('servicesPage.contact.formTitle')}</h3>
            <p className="text-navy-600 text-sm mb-8">{t('servicesPage.contact.formSubtitle')}</p>

            <form id="services-contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sc-nom" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.fullName')} *</label>
                  <input
                    type="text" id="sc-nom" name="nom" required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={t('servicesPage.contact.form.fullNamePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="sc-email" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.email')} *</label>
                  <input
                    type="email" id="sc-email" name="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={t('servicesPage.contact.form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sc-telephone" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.phone')}</label>
                  <input
                    type="tel" id="sc-telephone" name="telephone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={t('servicesPage.contact.form.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="sc-organisation" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.organisation')}</label>
                  <input
                    type="text" id="sc-organisation" name="organisation"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={t('servicesPage.contact.form.organisationPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sc-service" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.service')}</label>
                <select
                  id="sc-service" name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                >
                  <option value="">{t('servicesPage.contact.form.servicePlaceholder')}</option>
                  <option value="corporate-governance">{t('servicesPage.contact.services.option1')}</option>
                  <option value="financial-digital-inclusion">{t('servicesPage.contact.services.option2')}</option>
                  <option value="enterprise-risk-management">{t('servicesPage.contact.services.option3')}</option>
                  <option value="strategic-advisory">{t('servicesPage.contact.services.option4')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="sc-message" className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">{t('servicesPage.contact.form.message')} *</label>
                <textarea
                  id="sc-message" name="message" required rows={4} maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all resize-none"
                  placeholder={t('servicesPage.contact.form.messagePlaceholder')}
                ></textarea>
                <p className={`text-xs mt-1 ${formData.message.length > 450 ? 'text-red-600' : 'text-navy-500'}`}>
                  {formData.message.length}/500
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-checkbox-circle-fill text-lg"></i>
                  <span>{t('servicesPage.contact.form.successMessage')}</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-fill text-lg"></i>
                  <span>{t('servicesPage.contact.form.errorMessage')}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || formData.message.length > 500}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                {isSubmitting ? t('servicesPage.contact.form.submitting') : t('servicesPage.contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



