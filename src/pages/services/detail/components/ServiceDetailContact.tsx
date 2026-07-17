import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceDetailContactProps {
  serviceTitle?: string;
  serviceId?: string;
}

export function ServiceDetailContact({ serviceTitle, serviceId }: ServiceDetailContactProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
    service: serviceId || '',
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
        setFormData({ nom: '', email: '', telephone: '', organisation: '', service: serviceId || '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = lang === 'fr'
    ? [
        'Réponse sous 24h ouvrées',
        'Diagnostic stratégique offert (30 min)',
        'Confidentialité garantie',
        'Experts disponibles en français et anglais',
      ]
    : [
        'Response within 24 business hours',
        'Free strategic diagnostic (30 min)',
        'Guaranteed confidentiality',
        'Experts available in French and English',
      ];

  const serviceOptions = lang === 'fr'
    ? [
        { value: 'corporate-governance', label: 'Gouvernance d\'Entreprise' },
        { value: 'financial-digital-inclusion', label: 'Inclusion Financière & Digitale' },
        { value: 'enterprise-risk-management', label: 'Gestion des Risques d\'Entreprise' },
        { value: 'strategic-advisory', label: 'Conseil Stratégique' },
      ]
    : [
        { value: 'corporate-governance', label: 'Corporate Governance' },
        { value: 'financial-digital-inclusion', label: 'Financial & Digital Inclusion' },
        { value: 'enterprise-risk-management', label: 'Enterprise Risk Management' },
        { value: 'strategic-advisory', label: 'Strategic Advisory' },
      ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Gauche — Infos */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-gold-500/50">
              <span className="text-sm font-medium text-gold-400">
                {lang === 'fr' ? 'Parlons de votre projet' : 'Let\'s talk about your project'}
              </span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {lang === 'fr'
                ? <>Réservez votre <span className="text-gold-400">diagnostic stratégique</span></>
                : <>Book your <span className="text-gold-400">strategic diagnostic</span></>}
            </h2>
            {serviceTitle && (
              <p className="text-gold-300 text-base mb-4 font-medium">
                {lang === 'fr' ? `Service : ${serviceTitle}` : `Service: ${serviceTitle}`}
              </p>
            )}
            <p className="text-white/75 text-base leading-relaxed mb-10">
              {lang === 'fr'
                ? 'Échangeons sur vos enjeux spécifiques. Nos experts vous proposent un diagnostic confidentiel et sans engagement pour identifier les leviers d\'action prioritaires.'
                : 'Let\'s discuss your specific challenges. Our experts offer a confidential, no-commitment diagnostic to identify priority action levers.'}
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <i className="ri-checkbox-circle-line text-gold-400 text-xl"></i>
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@khepraexperts.com"
                className="flex items-center gap-3 text-white/75 hover:text-gold-400 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors">
                  <i className="ri-mail-line text-gold-400 text-lg"></i>
                </div>
                <span className="text-sm">contact@khepraexperts.com</span>
              </a>
              <a
                href="https://wa.me/22893984909"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 text-white/75 hover:text-gold-400 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors">
                  <i className="ri-whatsapp-line text-green-400 text-lg"></i>
                </div>
                <span className="text-sm">+228 93 98 49 09</span>
              </a>
            </div>
          </div>

          {/* Droite — Formulaire */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl gradient-border glow-gold-hover">
            <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-2">
              {lang === 'fr' ? 'Nous contacter' : 'Contact Us'}
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              {lang === 'fr'
                ? 'Remplissez ce formulaire et un expert vous contacte sous 24h.'
                : 'Fill in this form and an expert will contact you within 24 hours.'}
            </p>

            <form id="service-detail-contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sdc-nom" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    {lang === 'fr' ? 'Nom complet' : 'Full Name'} *
                  </label>
                  <input
                    type="text" id="sdc-nom" name="nom" required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={lang === 'fr' ? 'Votre nom' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="sdc-email" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email" id="sdc-email" name="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sdc-telephone" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    {lang === 'fr' ? 'Téléphone' : 'Phone'}
                  </label>
                  <input
                    type="tel" id="sdc-telephone" name="telephone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="sdc-organisation" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    {lang === 'fr' ? 'Organisation' : 'Organization'}
                  </label>
                  <input
                    type="text" id="sdc-organisation" name="organisation"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                    placeholder={lang === 'fr' ? 'Votre organisation' : 'Your organization'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sdc-service" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  {lang === 'fr' ? 'Service concerné' : 'Relevant Service'}
                </label>
                <select
                  id="sdc-service" name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                >
                  <option value="">{lang === 'fr' ? '-- Sélectionner un service --' : '-- Select a service --'}</option>
                  <option value="strategic-advisory">{lang === 'fr' ? 'Conseil Stratégique' : 'Strategic Advisory'}</option>
                  <option value="corporate-governance">{lang === 'fr' ? 'Gouvernance d\'Entreprise' : 'Corporate Governance'}</option>
                  <option value="financial-digital-inclusion">{lang === 'fr' ? 'Inclusion Financière & Digitale' : 'Financial & Digital Inclusion'}</option>
                  <option value="enterprise-risk-management">{lang === 'fr' ? 'Gestion des Risques' : 'Enterprise Risk Management'}</option>
                  <option value="due-diligence-acquisition">{lang === 'fr' ? 'Due Diligence & Acquisition' : 'Due Diligence & Acquisition'}</option>
                  <option value="levee-de-fonds">{lang === 'fr' ? 'Levée de Fonds' : 'Fundraising'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="sdc-message" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  {lang === 'fr' ? 'Votre message' : 'Your Message'} *
                </label>
                <textarea
                  id="sdc-message" name="message" required rows={4} maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all resize-none"
                  placeholder={lang === 'fr' ? 'Décrivez votre besoin ou votre projet...' : 'Describe your need or project...'}
                ></textarea>
                <p className={`text-xs mt-1 ${formData.message.length > 450 ? 'text-red-600' : 'text-gray-400'}`}>
                  {formData.message.length}/500
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-checkbox-circle-fill text-lg"></i>
                  <span>
                    {lang === 'fr'
                      ? 'Message envoyé ! Un expert vous contactera sous 24h.'
                      : 'Message sent! An expert will contact you within 24 hours.'}
                  </span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-fill text-lg"></i>
                  <span>
                    {lang === 'fr'
                      ? 'Une erreur est survenue. Veuillez réessayer.'
                      : 'An error occurred. Please try again.'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || formData.message.length > 500}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                {isSubmitting
                  ? (lang === 'fr' ? 'Envoi en cours...' : 'Sending...')
                  : (lang === 'fr' ? 'Envoyer ma demande' : 'Send my request')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
