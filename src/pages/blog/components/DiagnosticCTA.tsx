import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DiagnosticCTAProps {
  category: string;
  position: 'inline' | 'end';
}

export function DiagnosticCTA({ category, position }: DiagnosticCTAProps) {
  const { i18n } = useTranslation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    challenge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isEn = i18n.language === 'en';

  // Messages contextuels selon la catégorie
  const getCategoryMessage = () => {
    if (category === 'Gouvernance' || category === 'Governance') {
      return {
        title: isEn 
          ? 'Strengthen your governance' 
          : 'Renforcez votre gouvernance',
        subtitle: isEn
          ? 'Get a strategic diagnosis to structure your governance and accelerate your growth.'
          : 'Obtenez un diagnostic stratégique pour structurer votre gouvernance et accélérer votre croissance.',
        challenge: isEn ? 'Governance challenge' : 'Défi en gouvernance',
      };
    }
    if (category === 'Finance') {
      return {
        title: isEn 
          ? 'Optimize your financial performance' 
          : 'Optimisez votre performance financière',
        subtitle: isEn
          ? 'Get a strategic diagnosis to improve your financial management and secure your funding.'
          : 'Obtenez un diagnostic stratégique pour améliorer votre gestion financière et sécuriser vos financements.',
        challenge: isEn ? 'Financial challenge' : 'Défi financier',
      };
    }
    if (category === 'Entrepreneuriat' || category === 'Entrepreneurship') {
      return {
        title: isEn 
          ? 'Accelerate your growth' 
          : 'Accélérez votre croissance',
        subtitle: isEn
          ? 'Get a strategic diagnosis to structure your development and attract investors.'
          : 'Obtenez un diagnostic stratégique pour structurer votre développement et attirer les investisseurs.',
        challenge: isEn ? 'Growth challenge' : 'Défi de croissance',
      };
    }
    if (category === 'Politiques publiques' || category === 'Public Policy') {
      return {
        title: isEn 
          ? 'Strengthen your regulatory compliance' 
          : 'Renforcez votre conformité réglementaire',
        subtitle: isEn
          ? 'Get a strategic diagnosis to ensure your compliance and optimize your operations.'
          : 'Obtenez un diagnostic stratégique pour assurer votre conformité et optimiser vos opérations.',
        challenge: isEn ? 'Compliance challenge' : 'Défi de conformité',
      };
    }
    // Par défaut
    return {
      title: isEn 
        ? 'Transform your strategic challenges' 
        : 'Transformez vos défis stratégiques',
      subtitle: isEn
        ? 'Get a strategic diagnosis to identify levers for transformation and accelerate your performance.'
        : 'Obtenez un diagnostic stratégique pour identifier les leviers de transformation et accélérer votre performance.',
      challenge: isEn ? 'Strategic challenge' : 'Défi stratégique',
    };
  };

  const message = getCategoryMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('organization', formData.organization);
      formBody.append('challenge', formData.challenge);
      formBody.append('category', category);
      formBody.append('source', `blog-article-${position}`);

      const response = await fetch('https://readdy.ai/api/form/d6p8ovk4k19g20dvqn2g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', organization: '', challenge: '' });
        setTimeout(() => {
          setIsFormVisible(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      // Error logged for debugging - removed console.error for production
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (position === 'inline') {
    return (
      <div className="my-12 bg-gradient-to-br from-brand-50 via-white to-gold-50 rounded-2xl p-8 border border-brand-100">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
            <i className="ri-lightbulb-flash-line text-white text-2xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
              {message.title}
            </h3>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {message.subtitle}
            </p>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 text-white px-6 py-3 rounded-full hover:from-brand-700 hover:to-brand-800 transition-all font-semibold text-sm whitespace-nowrap cursor-pointer shadow-lg shadow-brand-200"
            >
              {isEn ? 'Request my strategic diagnosis' : 'Demander mon diagnostic stratégique'}
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>

        {isFormVisible && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4" data-readdy-form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {isEn ? 'Full name' : 'Nom complet'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder={isEn ? 'Your name' : 'Votre nom'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder={isEn ? 'your.email@khepraexperts.com' : 'votre.email@khepraexperts.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {isEn ? 'Phone' : 'Téléphone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                    {isEn ? 'Organization' : 'Organisation'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder={isEn ? 'Your company' : 'Votre entreprise'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-semibold text-gray-700 mb-2">
                  {message.challenge} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm resize-none"
                  placeholder={isEn ? 'Briefly describe your main strategic challenge...' : 'Décrivez brièvement votre principal défi stratégique...'}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.challenge.length}/500 {isEn ? 'characters' : 'caractères'}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-green-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-green-900 text-sm">
                      {isEn ? 'Request sent successfully!' : 'Demande envoyée avec succès !'}
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      {isEn 
                        ? 'Our expert will contact you within 24 hours to schedule your strategic diagnosis.'
                        : 'Notre expert vous contactera sous 24h pour planifier votre diagnostic stratégique.'}
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-error-warning-fill text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <p className="text-red-700 text-sm">
                    {isEn 
                      ? 'An error occurred. Please try again or contact us directly.'
                      : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'}
                  </p>
                </div>
              )}

              <div className="flex items-start gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-brand-600 to-brand-700 text-white px-6 py-3 rounded-full hover:from-brand-700 hover:to-brand-800 transition-all font-semibold text-sm whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (isEn ? 'Sending...' : 'Envoi en cours...') 
                    : (isEn ? 'Request my diagnosis' : 'Demander mon diagnostic')}
                </button>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <i className="ri-shield-check-line text-green-600"></i>
                    <span>{isEn ? 'Confidential' : 'Confidentiel'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-time-line text-brand-600"></i>
                    <span>30 min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-user-star-line text-gold-600"></i>
                    <span>{isEn ? 'Expert' : 'Expert dédié'}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Position 'end' - CTA en fin d'article
  return (
    <div className="mt-14 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 rounded-2xl p-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-300/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/20 rounded-2xl mb-6">
          <i className="ri-lightbulb-flash-line text-gold-400 text-3xl"></i>
        </div>
        
        <h3 className="font-playfair text-3xl font-bold text-white mb-4">
          {message.title}
        </h3>
        
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {message.subtitle}
        </p>

        {!isFormVisible ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsFormVisible(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-base whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
            >
              {isEn ? 'Request my strategic diagnosis' : 'Demander mon diagnostic stratégique'}
              <i className="ri-arrow-right-line"></i>
            </button>
            
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-green-400"></i>
                <span>{isEn ? 'Confidential' : 'Confidentiel'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-gold-400"></i>
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-user-star-line text-gold-400"></i>
                <span>{isEn ? 'Dedicated expert' : 'Expert dédié'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5 text-left" data-readdy-form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name-end" className="block text-sm font-semibold text-white mb-2">
                    {isEn ? 'Full name' : 'Nom complet'} <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name-end"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                    placeholder={isEn ? 'Your name' : 'Votre nom'}
                  />
                </div>
                <div>
                  <label htmlFor="email-end" className="block text-sm font-semibold text-white mb-2">
                    Email <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email-end"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                    placeholder={isEn ? 'your.email@khepraexperts.com' : 'votre.email@khepraexperts.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone-end" className="block text-sm font-semibold text-white mb-2">
                    {isEn ? 'Phone' : 'Téléphone'}
                  </label>
                  <input
                    type="tel"
                    id="phone-end"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="organization-end" className="block text-sm font-semibold text-white mb-2">
                    {isEn ? 'Organization' : 'Organisation'} <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization-end"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                    placeholder={isEn ? 'Your company' : 'Votre entreprise'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="challenge-end" className="block text-sm font-semibold text-white mb-2">
                  {message.challenge} <span className="text-gold-400">*</span>
                </label>
                <textarea
                  id="challenge-end"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-400 text-sm resize-none"
                  placeholder={isEn ? 'Briefly describe your main strategic challenge...' : 'Décrivez brièvement votre principal défi stratégique...'}
                ></textarea>
                <p className="text-xs text-gray-400 mt-1">
                  {formData.challenge.length}/500 {isEn ? 'characters' : 'caractères'}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-green-400 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-green-300 text-sm">
                      {isEn ? 'Request sent successfully!' : 'Demande envoyée avec succès !'}
                    </p>
                    <p className="text-green-200 text-sm mt-1">
                      {isEn 
                        ? 'Our expert will contact you within 24 hours to schedule your strategic diagnosis.'
                        : 'Notre expert vous contactera sous 24h pour planifier votre diagnostic stratégique.'}
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-error-warning-fill text-red-400 text-xl flex-shrink-0 mt-0.5"></i>
                  <p className="text-red-200 text-sm">
                    {isEn 
                      ? 'An error occurred. Please try again or contact us directly.'
                      : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-base whitespace-nowrap cursor-pointer shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (isEn ? 'Sending...' : 'Envoi en cours...') 
                  : (isEn ? 'Request my diagnosis' : 'Demander mon diagnostic')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}