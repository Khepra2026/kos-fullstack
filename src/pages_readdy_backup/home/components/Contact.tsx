import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendlyWidget } from '@/components/feature/CalendlyWidget';
import { trackFormStart, trackFormSubmission } from '@/components/feature/ConversionTracker';
import ScrollReveal from '@/components/feature/ScrollReveal';

const CONTACT_FORM_URL = 'https://readdy.ai/api/form/d6rgu8c4k19g20dvrlp0';

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.nameRequired', 'Le nom est requis');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired', "L'email est requis");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid', 'Email invalide');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.errors.messageRequired', 'Le message est requis');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstInput = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      trackFormStart('contact', 'Formulaire de contact principal');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.message.length > 500) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = new URLSearchParams();
      body.append('nom', formData.name);
      body.append('email', formData.email);
      body.append('telephone', formData.phone);
      body.append('organisation', formData.organization);
      body.append('sujet', formData.subject);
      body.append('service', formData.service);
      body.append('message', formData.message);

      const res = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', organization: '', subject: '', service: '', message: '' });
        setErrors({});
        
        trackFormSubmission('contact', 'Formulaire de contact principal');
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submission', { event_category: 'Contact', event_label: 'Contact Form' });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsultationClick = () => {
    const el = document.getElementById('consultation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-950 to-black"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label font-semibold tracking-widest uppercase text-sm" style={{color: '#a5d936', textShadow: '0 1px 6px rgba(0,0,0,0.5)'}}>
              {t('contact.title')}
            </span>
            <h2
              className="section-title mb-8 px-4 text-white"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
            >
              {t('contact.subtitle')}
            </h2>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 sm:mb-16">
              <button 
                onClick={handleConsultationClick}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 sm:px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer min-h-[44px] hover:scale-105 hover:shadow-xl"
              >
                {t('hero.cta1')}
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </button>
              
              <CalendlyWidget 
                prefill={{
                  name: formData.name,
                  email: formData.email,
                }}
                utm={{
                  utmSource: 'website',
                  utmMedium: 'contact_section',
                  utmCampaign: 'consultation',
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto text-white">
              <a href="mailto:contact@khepraexperts.com" className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 flex items-center justify-center">
                  <i className="ri-mail-line text-3xl" style={{color: '#a5d936'}}></i>
                </div>
                <span className="text-white font-medium hover:text-[#a5d936] transition-colors text-base" style={{textShadow: '0 1px 4px rgba(0,0,0,0.5)'}}>contact@khepraexperts.com</span>
              </a>
              <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 flex items-center justify-center">
                  <i className="ri-phone-line text-3xl" style={{color: '#a5d936'}}></i>
                </div>
                <span className="text-white font-medium hover:text-[#a5d936] transition-colors flex items-center gap-2 text-base" style={{textShadow: '0 1px 4px rgba(0,0,0,0.5)'}}>
                  +228 93 98 49 09
                  <i className="ri-whatsapp-line text-green-400 text-lg"></i>
                </span>
              </a>
              <div className="flex flex-col items-center gap-3 p-4 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 flex items-center justify-center">
                  <i className="ri-map-pin-line text-3xl" style={{color: '#a5d936'}}></i>
                </div>
                <span className="text-white font-medium text-base text-center" style={{textShadow: '0 1px 4px rgba(0,0,0,0.5)'}}>{t('contact.addressText')}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeSlideUp" delay={80}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl h-72 lg:h-full min-h-64">
              <iframe
                title="Localisation KHEPRA EXPERTS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2313!3d6.1375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1c113185419%3A0x3224b5422caf411e!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex flex-col justify-center gap-4 text-white">
              <a href="mailto:contact@khepraexperts.com" className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10">
                <div className="w-12 h-12 flex items-center justify-center bg-[#a5d936]/20 rounded-full shrink-0">
                  <i className="ri-mail-line text-2xl" style={{color: '#a5d936'}}></i>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1 font-medium">{t('contact.email')}</p>
                  <span className="text-white hover:text-[#a5d936] transition-colors font-semibold text-base">contact@khepraexperts.com</span>
                </div>
              </a>
              <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10">
                <div className="w-12 h-12 flex items-center justify-center bg-[#a5d936]/20 rounded-full shrink-0">
                  <i className="ri-phone-line text-2xl" style={{color: '#a5d936'}}></i>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1 font-medium">{t('contact.phone')}</p>
                  <span className="text-white hover:text-[#a5d936] transition-colors font-semibold flex items-center gap-2 text-base">
                    +228 93 98 49 09
                    <i className="ri-whatsapp-line text-green-400 text-lg"></i>
                  </span>
                </div>
              </a>
              <div className="flex items-start gap-4 p-4 border border-white/10 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-[#a5d936]/20 rounded-full shrink-0">
                  <i className="ri-map-pin-line text-2xl" style={{color: '#a5d936'}}></i>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1 font-medium">{t('contact.address')}</p>
                  <span className="text-white font-semibold text-base">{t('contact.addressText')}</span>
                </div>
              </div>
              <a href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/" target="_blank" rel="noopener noreferrer nofollow" className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10">
                <div className="w-12 h-12 flex items-center justify-center bg-[#a5d936]/20 rounded-full shrink-0">
                  <i className="ri-linkedin-fill text-2xl" style={{color: '#a5d936'}}></i>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1 font-medium">LinkedIn</p>
                  <span className="text-white hover:text-[#a5d936] transition-colors font-semibold text-base">SIMDA Essoyomèwè</span>
                </div>
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeSlideUp" delay={120}>
          <div id="consultation-form" className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('contact.title')}</h3>
            <p className="text-gray-600 mb-8 text-base">{t('contact.subtitle')}</p>
            
            <form
              id="contact-form"
              data-readdy-form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" id="nom" name="nom" required
                    value={formData.name}
                    onChange={(e) => { 
                      handleFirstInput();
                      setFormData({...formData, name: e.target.value}); 
                      if (errors.name) setErrors({...errors, name: ''}); 
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-base ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={t('contact.name')}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" id="email" name="email" required
                    value={formData.email}
                    onChange={(e) => { 
                      handleFirstInput();
                      setFormData({...formData, email: e.target.value}); 
                      if (errors.email) setErrors({...errors, email: ''}); 
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={t('contact.email')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.phone')}</label>
                  <input
                    type="tel" id="telephone" name="telephone"
                    value={formData.phone}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, phone: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder="+228 93 98 49 09"
                  />
                </div>
                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.company')}</label>
                  <input
                    type="text" id="organisation" name="organisation"
                    value={formData.organization}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, organization: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder={t('contact.company')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">{t('nav.services')}</label>
                <select
                  id="service" name="service"
                  value={formData.service}
                  onChange={(e) => {
                    handleFirstInput();
                    setFormData({...formData, service: e.target.value});
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-base cursor-pointer"
                >
                  <option value="">{t('nav.services')}</option>
                  <option value="expertise-financiere">{t('services.service1Title')}</option>
                  <option value="gestion-risques">{t('services.service2Title')}</option>
                  <option value="gouvernance">{t('services.service3Title')}</option>
                  <option value="conseil-strategique">{t('services.service4Title')}</option>
                  <option value="innovation">{t('services.service6Title')}</option>
                  <option value="incubation">{t('services.service5Title')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={5} maxLength={500}
                  value={formData.message}
                  onChange={(e) => { 
                    handleFirstInput();
                    setFormData({...formData, message: e.target.value}); 
                    if (errors.message) setErrors({...errors, message: ''}); 
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all resize-none text-base ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={t('contact.message')}
                  aria-invalid={!!errors.message}
                ></textarea>
                <div className="flex justify-between items-center mt-1">
                  {errors.message && <p className="text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.message}</p>}
                  <p className={`text-xs ml-auto ${formData.message.length > 450 ? 'text-red-600' : 'text-gray-500'}`}>{formData.message.length}/500</p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg" role="alert">
                  <div className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-fill text-xl"></i>
                    <span className="text-base">{t('contact.success')}</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg" role="alert">
                  <div className="flex items-center gap-2">
                    <i className="ri-error-warning-fill text-xl"></i>
                    <span className="text-base">{t('contact.error')}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-base min-h-[44px] hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line text-xl animate-spin"></i>
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.submit')}</span>
                    <i className="ri-send-plane-fill"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



