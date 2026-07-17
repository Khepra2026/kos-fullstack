import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { CalendlyWidget } from '@/components/feature/CalendlyWidget';
import { trackFormStart, trackFormSubmission } from '@/components/feature/ConversionTracker';
import { SeoHead } from '@/components/feature/SeoHead';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';

const CONTACT_FORM_URL = 'https://readdy.ai/api/form/d6rgu8c4k19g20dvrlp0';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    position: '',
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
    if (!formData.name.trim()) newErrors.name = i18n.language === 'fr' ? 'Le nom est requis' : 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = i18n.language === 'fr' ? "L'email est requis" : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = i18n.language === 'fr' ? 'Email invalide' : 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = i18n.language === 'fr' ? 'Le message est requis' : 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstInput = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      trackFormStart('contact_page', 'Formulaire de contact principal');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.message.length > 500) return;

    // Anti-bot : honeypot
    if (validateHoneypot()) {
      setErrors({ ...errors, form: 'Soumission rejetée pour des raisons de sécurité.' });
      return;
    }

    // Rate limiting
    if (checkRateLimit()) {
      setErrors({ ...errors, form: 'Veuillez patienter quelques secondes avant de renvoyer.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload: Record<string, string> = {
      nom: formData.name,
      email: formData.email,
      telephone: formData.phone,
      organisation: formData.organization,
      pays: formData.country,
      poste: formData.position,
      sujet: formData.subject,
      service: formData.service,
      message: formData.message,
    };

    const result = await submitFormSecure(payload, CONTACT_FORM_URL, {
      honeypotValue: inputRef.current?.value || '',
      formId: 'contact',
    });

    if (result.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', organization: '', country: '', position: '', subject: '', service: '', message: '' });
      setErrors({});
      trackFormSubmission('contact_page', 'Formulaire de contact principal');
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', { event_category: 'Contact', event_label: 'Contact Page Form' });
      }
    } else {
      setSubmitStatus('error');
      if (result.error) {
        setErrors({ ...errors, form: result.error });
      }
    }

    setIsSubmitting(false);
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      const topBanner = document.querySelector('[data-top-banner]');
      const nav = document.querySelector('nav');
      const topBannerHeight = topBanner?.getBoundingClientRect().height || 0;
      const navHeight = nav?.getBoundingClientRect().height || 0;
      const offset = topBannerHeight + navHeight + 16;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${import.meta.env.VITE_SITE_URL}/contact#webpage`,
        "url": `${import.meta.env.VITE_SITE_URL}/contact`,
        "name": i18n.language === 'fr' ? 'Contact — KHEPRA EXPERTS' : 'Contact — KHEPRA EXPERTS',
        "description": i18n.language === 'fr' 
          ? "Contactez KHEPRA EXPERTS pour un diagnostic stratégique gratuit. Conseil en gouvernance, audit financier, transformation digitale et conformité BCEAO en Afrique de l'Ouest et Centrale."
          : 'Contact KHEPRA EXPERTS for a free strategic diagnosis. Governance consulting, financial audit, digital transformation and BCEAO compliance across West and Central Africa.',
        "inLanguage": i18n.language === 'fr' ? 'fr-FR' : 'en-US',
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${import.meta.env.VITE_SITE_URL}/#website`,
          "url": `${import.meta.env.VITE_SITE_URL}/`,
          "name": "KHEPRA EXPERTS"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${import.meta.env.VITE_SITE_URL}/#organization`,
        "name": "KHEPRA EXPERTS",
        "legalName": "KHEPRA EXPERTS",
        "url": `${import.meta.env.VITE_SITE_URL}/`,
        "logo": LOGO_IMAGE_URL,
        "description": i18n.language === 'fr'
          ? "Cabinet de conseil stratégique spécialisé en gouvernance, audit financier, transformation digitale et conformité réglementaire en Afrique de l'Ouest et Centrale."
          : "Strategic consulting firm specializing in governance, financial audit, digital transformation and regulatory compliance across West and Central Africa.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lomé",
          "addressLocality": "Lomé",
          "addressRegion": "Maritime",
          "postalCode": "",
          "addressCountry": "TG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "6.1375",
          "longitude": "1.2313"
        },
        "telephone": "+228 93 98 49 09",
        "email": "contact@khepraexperts.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
        ],
        "areaServed": [
          {
            "@type": "Country",
            "name": "Togo"
          },
          {
            "@type": "Country",
            "name": "Benin"
          },
          {
            "@type": "Country",
            "name": "Burkina Faso"
          },
          {
            "@type": "Country",
            "name": "Côte d'Ivoire"
          },
          {
            "@type": "Country",
            "name": "Mali"
          },
          {
            "@type": "Country",
            "name": "Niger"
          },
          {
            "@type": "Country",
            "name": "Senegal"
          },
          {
            "@type": "Country",
            "name": "Guinea-Bissau"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${import.meta.env.VITE_SITE_URL}/contact#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": i18n.language === 'fr' ? "Accueil" : "Home",
            "item": `${import.meta.env.VITE_SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": `${import.meta.env.VITE_SITE_URL}/contact`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={i18n.language === 'fr' ? 'Contact | Khepra Experts — Diagnostic Gouvernance & Conformité Gratuit' : 'Contact | Khepra Experts — Free Governance & Compliance Diagnosis'}
        description={i18n.language === 'fr' ? "Diagnostic gratuit de 30 min : gouvernance, conformité BCEAO, audit financier. Réponse sous 24h. WhatsApp, Calendly, formulaire. Lomé, Togo." : "Free 30-min diagnosis: governance, BCEAO compliance, financial audit. Response within 24h. WhatsApp, Calendly, form. Lomé, Togo."}
        keywords={i18n.language === 'fr' ? 'contact KHEPRA EXPERTS, diagnostic stratégique gratuit, conseil gouvernance Afrique, audit financier Togo, transformation digitale UEMOA, conformité BCEAO, expert microfinance Afrique' : 'contact KHEPRA EXPERTS, free strategic diagnosis, governance consulting Africa, financial audit Togo, digital transformation WAEMU, BCEAO compliance, microfinance expert Africa'}
        canonicalPath="/contact"
        ogType="website"
        ogImage={OG_IMAGES.ABOUT}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={schemaData}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-background-900 via-background-800 to-background-900">
        <div className="absolute inset-0 bg-[url('/images/hero-contact-bg.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              variant="light"
              items={[
                { label: i18n.language === 'fr' ? 'Accueil' : 'Home', href: '/' },
                { label: 'Contact' },
              ]}
            />
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 border border-primary-500/30">
              {i18n.language === 'fr' ? 'Parlons de votre projet' : 'Let\'s discuss your project'}
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
              {t('contact.title')}
            </h1>
            <p className="text-lg sm:text-xl text-foreground-300 mb-10 leading-relaxed" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={scrollToForm}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer min-h-[44px] hover:scale-105 hover:shadow-xl"
              >
                {i18n.language === 'fr' ? 'Envoyer un message' : 'Send a message'}
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </button>
              
              <CalendlyWidget 
                prefill={{
                  name: formData.name,
                  email: formData.email,
                }}
                utm={{
                  utmSource: 'website',
                  utmMedium: 'contact_page',
                  utmCampaign: 'consultation',
                }}
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-50/5 border border-white/10">
                <i className="ri-time-line text-3xl text-primary-400"></i>
                <span className="text-white font-semibold text-base">{i18n.language === 'fr' ? 'Réponse sous 24h' : 'Response within 24h'}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-50/5 border border-white/10">
                <i className="ri-shield-check-line text-3xl text-primary-400"></i>
                <span className="text-white font-semibold text-base">{i18n.language === 'fr' ? '100% Confidentiel' : '100% Confidential'}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background-50/5 border border-white/10">
                <i className="ri-user-star-line text-3xl text-primary-400"></i>
                <span className="text-white font-semibold text-base">{i18n.language === 'fr' ? 'Expert dédié' : 'Dedicated expert'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Map */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-96 lg:h-full min-h-[400px]">
              <iframe
                title="Localisation KHEPRA EXPERTS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2313!3d6.1375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1c113185419%3A0x3224b5422caf411e!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  {i18n.language === 'fr' ? 'Nos coordonnées' : 'Our contact details'}
                </h2>
                <p className="text-foreground-600 text-lg mb-8">
                  {i18n.language === 'fr' 
                    ? 'Basés à Lomé, Togo, nous intervenons dans plus de 20 pays en Afrique de l\'Ouest et Centrale.' 
                    : 'Based in Lomé, Togo, we operate in over 20 countries across West and Central Africa.'}
                </p>
              </div>

              <a href="mailto:contact@khepraexperts.com" className="flex items-start gap-4 p-5 rounded-xl hover:bg-background-100 transition-all duration-300 border border-background-200 hover:border-primary-400 hover:shadow-md group">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 rounded-full shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <i className="ri-mail-line text-2xl text-primary-600"></i>
                </div>
                <div>
                  <p className="text-foreground-600 text-sm mb-1 font-medium">{t('contact.email')}</p>
                  <span className="text-foreground-950 hover:text-primary-600 transition-colors font-semibold text-base">contact@khepraexperts.com</span>
                </div>
              </a>

              <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer nofollow" className="flex items-start gap-4 p-5 rounded-xl hover:bg-background-100 transition-all duration-300 border border-background-200 hover:border-primary-400 hover:shadow-md group">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 rounded-full shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <i className="ri-phone-line text-2xl text-primary-600"></i>
                </div>
                <div>
                  <p className="text-foreground-600 text-sm mb-1 font-medium">{t('contact.phone')}</p>
                  <span className="text-foreground-950 hover:text-primary-600 transition-colors font-semibold flex items-center gap-2 text-base">
                    +228 93 98 49 09
                    <i className="ri-whatsapp-line text-green-500 text-lg"></i>
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 border border-background-200 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 rounded-full shrink-0">
                  <i className="ri-map-pin-line text-2xl text-primary-600"></i>
                </div>
                <div>
                  <p className="text-foreground-600 text-sm mb-1 font-medium">{t('contact.address')}</p>
                  <span className="text-foreground-950 font-semibold text-base">{t('contact.addressText')}</span>
                </div>
              </div>

              <a href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/" target="_blank" rel="noopener noreferrer nofollow" className="flex items-start gap-4 p-5 rounded-xl hover:bg-background-100 transition-all duration-300 border border-background-200 hover:border-primary-400 hover:shadow-md group">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 rounded-full shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <i className="ri-linkedin-fill text-2xl text-primary-600"></i>
                </div>
                <div>
                  <p className="text-foreground-600 text-sm mb-1 font-medium">LinkedIn</p>
                  <span className="text-foreground-950 hover:text-primary-600 transition-colors font-semibold text-base">SIMDA Essoyomèwè</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-16 sm:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
              {i18n.language === 'fr' ? 'Pourquoi nous contacter ?' : 'Why contact us?'}
            </h2>
            <p className="text-foreground-600 text-lg max-w-3xl mx-auto">
              {i18n.language === 'fr' 
                ? 'Trois raisons de faire appel à KHEPRA EXPERTS pour vos projets stratégiques' 
                : 'Three reasons to call on KHEPRA EXPERTS for your strategic projects'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="ri-gift-line text-3xl text-primary-600"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold text-foreground-950 mb-3">
                {i18n.language === 'fr' ? 'Diagnostic gratuit' : 'Free diagnosis'}
              </h3>
              <p className="text-foreground-600 leading-relaxed">
                {i18n.language === 'fr' 
                  ? 'Premier échange de 30 minutes offert pour analyser votre situation et identifier les leviers de transformation.' 
                  : 'First 30-minute exchange offered to analyze your situation and identify transformation levers.'}
              </p>
            </div>

            <div className="bg-background-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="ri-time-line text-3xl text-primary-600"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold text-foreground-950 mb-3">
                {i18n.language === 'fr' ? 'Réponse rapide' : 'Quick response'}
              </h3>
              <p className="text-foreground-600 leading-relaxed">
                {i18n.language === 'fr' 
                  ? 'Nous nous engageons à vous répondre sous 24 heures ouvrées avec une proposition adaptée à vos besoins.' 
                  : 'We commit to responding within 24 business hours with a proposal tailored to your needs.'}
              </p>
            </div>

            <div className="bg-background-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-primary-600"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold text-foreground-950 mb-3">
                {i18n.language === 'fr' ? 'Confidentialité garantie' : 'Guaranteed confidentiality'}
              </h3>
              <p className="text-foreground-600 leading-relaxed">
                {i18n.language === 'fr' 
                  ? 'Toutes vos informations et discussions restent strictement confidentielles. Engagement de confidentialité signé.' 
                  : 'All your information and discussions remain strictly confidential. Signed confidentiality agreement.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form-section" className="py-16 sm:py-20 lg:py-24 bg-background-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
              {i18n.language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
            </h2>
            <p className="text-foreground-600 text-lg">
              {i18n.language === 'fr' 
                ? 'Remplissez ce formulaire et nous vous recontacterons rapidement' 
                : 'Fill out this form and we will get back to you quickly'}
            </p>
          </div>

          <div className="bg-background-50 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-gray-100">
            <form
              id="contact-form"
              data-readdy-form
              onSubmit={handleSubmit}
              className="space-y-6 relative"
              noValidate
            >
              <HoneypotField inputRef={inputRef} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-foreground-700 mb-2">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={t('contact.name')}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground-700 mb-2">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={t('contact.email')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-foreground-700 mb-2">{t('contact.phone')}</label>
                  <input
                    type="tel" id="telephone" name="telephone"
                    value={formData.phone}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, phone: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder="+228 93 98 49 09"
                  />
                </div>
                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-foreground-700 mb-2">{t('contact.company')}</label>
                  <input
                    type="text" id="organisation" name="organisation"
                    value={formData.organization}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, organization: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder={t('contact.company')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pays" className="block text-sm font-medium text-foreground-700 mb-2">
                    {i18n.language === 'fr' ? 'Pays' : 'Country'}
                  </label>
                  <input
                    type="text" id="pays" name="pays"
                    value={formData.country}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, country: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder={i18n.language === 'fr' ? 'Togo, Bénin, Côte d\'Ivoire...' : 'Togo, Benin, Ivory Coast...'}
                  />
                </div>
                <div>
                  <label htmlFor="poste" className="block text-sm font-medium text-foreground-700 mb-2">
                    {i18n.language === 'fr' ? 'Poste / Fonction' : 'Position / Role'}
                  </label>
                  <input
                    type="text" id="poste" name="poste"
                    value={formData.position}
                    onChange={(e) => {
                      handleFirstInput();
                      setFormData({...formData, position: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base"
                    placeholder={i18n.language === 'fr' ? 'Directeur Général, DRH...' : 'CEO, HR Director...'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground-700 mb-2">
                  {i18n.language === 'fr' ? 'Service concerné' : 'Service of interest'}
                </label>
                <select
                  id="service" name="service"
                  value={formData.service}
                  onChange={(e) => {
                    handleFirstInput();
                    setFormData({...formData, service: e.target.value});
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-base cursor-pointer"
                >
                  <option value="">{i18n.language === 'fr' ? 'Sélectionnez un service' : 'Select a service'}</option>
                  <option value="conseil-strategique">{t('services.service1Title')}</option>
                  <option value="gestion-projets">{t('services.service2Title')}</option>
                  <option value="developpement-organisationnel">{t('services.service3Title')}</option>
                  <option value="renforcement-capacites">{t('services.service4Title')}</option>
                  <option value="levee-fonds">{t('services.service5Title')}</option>
                  <option value="transformation-digitale">{t('services.service6Title')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground-700 mb-2">
                  {t('contact.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={6} maxLength={500}
                  value={formData.message}
                  onChange={(e) => { 
                    handleFirstInput();
                    setFormData({...formData, message: e.target.value}); 
                    if (errors.message) setErrors({...errors, message: ''}); 
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all resize-none text-base ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={i18n.language === 'fr' ? 'Décrivez votre projet ou vos besoins...' : 'Describe your project or needs...'}
                  aria-invalid={!!errors.message}
                ></textarea>
                <div className="flex justify-between items-center mt-1">
                  {errors.message && <p className="text-sm text-red-600" role="alert"><i className="ri-error-warning-line"></i> {errors.message}</p>}
                  <p className={`text-xs ml-auto ${formData.message.length > 450 ? 'text-red-600' : 'text-foreground-500'}`}>{formData.message.length}/500</p>
                </div>
              </div>

              {errors.form && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg" role="alert">
                  <div className="flex items-center gap-2">
                    <i className="ri-error-warning-fill text-xl"></i>
                    <span className="text-base">{errors.form}</span>
                  </div>
                </div>
              )}

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
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-base min-h-[44px] hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
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
        </div>
      </section>

      <Footer />
    </>
  );
}