import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';

interface ServiceContactFormProps {
  serviceType: 'conseil-strategique' | 'gestion-projets' | 'developpement-organisationnel' | 'ressources-humaines' | 'transformation-digitale' | 'levee-fonds';
  serviceName: string;
  formUrl: string;
}

const SERVICE_FORM_URLS = {
  'conseil-strategique': 'https://readdy.ai/api/form/d6s106kddmmni7ck94r0',
  'gestion-projets': 'https://readdy.ai/api/form/d6s106kddmmni7ck94rg',
  'developpement-organisationnel': 'https://readdy.ai/api/form/d6s106kddmmni7ck94s0',
  'ressources-humaines': 'https://readdy.ai/api/form/d6s106kddmmni7ck94sg',
  'transformation-digitale': 'https://readdy.ai/api/form/d6s106kddmmni7ck94t0',
  'levee-fonds': 'https://readdy.ai/api/form/d6s106kddmmni7ck94tg',
};

export function ServiceContactForm({ serviceType, serviceName }: ServiceContactFormProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot(serviceType);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    organizationType: '',
    budget: '',
    timeline: '',
    priority: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = isEn ? 'Name is required' : 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = isEn ? 'Email is required' : "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isEn ? 'Invalid email' : 'Email invalide';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = isEn ? 'Organization is required' : "L'organisation est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (formData.message.length > 500) return;

    if (validateHoneypot()) {
      setErrors({ ...errors, form: isEn ? 'Submission rejected for security reasons.' : 'Soumission rejetée pour des raisons de sécurité.' });
      return;
    }

    if (checkRateLimit()) {
      setErrors({ ...errors, form: isEn ? 'Please wait a few seconds before resubmitting.' : 'Veuillez patienter quelques secondes avant de renvoyer.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload: Record<string, string> = {
      nom: formData.name,
      email: formData.email,
      telephone: formData.phone,
      organisation: formData.organization,
      poste: formData.position,
      type_organisation: formData.organizationType,
      budget: formData.budget,
      delai: formData.timeline,
      priorite: formData.priority,
      message: formData.message,
      service: serviceName,
    };

    const result = await submitFormSecure(payload, SERVICE_FORM_URLS[serviceType], {
      honeypotValue: inputRef.current?.value || '',
      formId: serviceType,
    });

    if (result.ok) {
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', organization: '', position: '',
        organizationType: '', budget: '', timeline: '', priority: '', message: '',
      });
      setErrors({});

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          event_category: 'Lead',
          event_label: serviceName,
          value: formData.budget,
        });
      }
    } else {
      setSubmitStatus('error');
      if (result.error) {
        setErrors({ ...errors, form: result.error });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
          {isEn ? 'Request a quote' : 'Demander un devis'}
        </h3>
        <p className="text-gray-600">
          {isEn 
            ? 'Fill out this form and an expert will contact you within 48 hours.'
            : 'Remplissez ce formulaire et un expert vous contactera sous 48h.'}
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
          <div>
            <p className="font-semibold text-green-900">
              {isEn ? 'Request sent!' : 'Demande envoyée !'}
            </p>
            <p className="text-green-700 text-sm mt-1">
              {isEn 
                ? 'We will contact you within 48 business hours.'
                : 'Nous vous contacterons sous 48 heures ouvrées.'}
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <i className="ri-error-warning-fill text-2xl text-red-600"></i>
          <div>
            <p className="font-semibold text-red-900">
              {isEn ? 'An error occurred' : 'Une erreur est survenue'}
            </p>
            <p className="text-red-700 text-sm mt-1">
              {isEn 
                ? 'Please try again or contact us directly.'
                : 'Veuillez réessayer ou nous contacter directement.'}
            </p>
          </div>
        </div>
      )}

      <form id={`form-${serviceType}`} data-readdy-form onSubmit={handleSubmit} className="space-y-5 relative">
        <HoneypotField inputRef={inputRef} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${serviceType}-name`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Full name' : 'Nom complet'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`${serviceType}-name`}
              name="nom"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={isEn ? 'First and last name' : 'Prénom et nom'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                <i className="ri-error-warning-line"></i> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${serviceType}-email`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Email address' : 'Adresse e-mail'} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id={`${serviceType}-email`}
              name="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                <i className="ri-error-warning-line"></i> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${serviceType}-phone`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Phone / WhatsApp' : 'Téléphone / WhatsApp'}
            </label>
            <input
              type="tel"
              id={`${serviceType}-phone`}
              name="telephone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
              placeholder="+228 XX XX XX XX"
            />
          </div>

          <div>
            <label htmlFor={`${serviceType}-position`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Position' : 'Poste'}
            </label>
            <input
              type="text"
              id={`${serviceType}-position`}
              name="poste"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
              placeholder={isEn ? 'e.g. CEO, CFO, Director...' : 'Ex : DG, DAF, Directeur...'}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${serviceType}-organization`} className="block text-sm font-medium text-gray-700 mb-2">
            {isEn ? 'Organization' : 'Organisation'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={`${serviceType}-organization`}
            name="organisation"
            required
            value={formData.organization}
            onChange={(e) => {
              setFormData({ ...formData, organization: e.target.value });
              if (errors.organization) setErrors({ ...errors, organization: '' });
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all ${
              errors.organization ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={isEn ? 'Company or organization name' : "Nom de l'entreprise ou organisation"}
          />
          {errors.organization && (
            <p className="mt-1 text-sm text-red-600">
              <i className="ri-error-warning-line"></i> {errors.organization}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${serviceType}-orgtype`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Organization type' : "Type d'organisation"}
            </label>
            <select
              id={`${serviceType}-orgtype`}
              name="type_organisation"
              value={formData.organizationType}
              onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
            >
              <option value="">{isEn ? 'Select' : 'Sélectionner'}</option>
              <option value="pme">{isEn ? 'SME' : 'PME'}</option>
              <option value="grande-entreprise">{isEn ? 'Large company' : 'Grande entreprise'}</option>
              <option value="startup">Startup</option>
              <option value="ong">{isEn ? 'NGO' : 'ONG'}</option>
              <option value="institution-publique">{isEn ? 'Public institution' : 'Institution publique'}</option>
              <option value="microfinance">{isEn ? 'Microfinance' : 'Microfinance'}</option>
              <option value="autre">{isEn ? 'Other' : 'Autre'}</option>
            </select>
          </div>

          <div>
            <label htmlFor={`${serviceType}-budget`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Estimated budget' : 'Budget estimé'}
            </label>
            <select
              id={`${serviceType}-budget`}
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
            >
              <option value="">{isEn ? 'Select' : 'Sélectionner'}</option>
              <option value="moins-5m">{isEn ? 'Less than 5M FCFA' : 'Moins de 5M FCFA'}</option>
              <option value="5m-10m">5M - 10M FCFA</option>
              <option value="10m-25m">10M - 25M FCFA</option>
              <option value="25m-50m">25M - 50M FCFA</option>
              <option value="plus-50m">{isEn ? 'More than 50M FCFA' : 'Plus de 50M FCFA'}</option>
              <option value="a-definir">{isEn ? 'To be defined' : 'À définir'}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${serviceType}-timeline`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Desired timeline' : 'Délai souhaité'}
            </label>
            <select
              id={`${serviceType}-timeline`}
              name="delai"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
            >
              <option value="">{isEn ? 'Select' : 'Sélectionner'}</option>
              <option value="urgent">{isEn ? 'Urgent (less than 1 month)' : 'Urgent (moins de 1 mois)'}</option>
              <option value="court-terme">{isEn ? 'Short term (1-3 months)' : 'Court terme (1-3 mois)'}</option>
              <option value="moyen-terme">{isEn ? 'Medium term (3-6 months)' : 'Moyen terme (3-6 mois)'}</option>
              <option value="long-terme">{isEn ? 'Long term (more than 6 months)' : 'Long terme (plus de 6 mois)'}</option>
            </select>
          </div>

          <div>
            <label htmlFor={`${serviceType}-priority`} className="block text-sm font-medium text-gray-700 mb-2">
              {isEn ? 'Priority level' : 'Niveau de priorité'}
            </label>
            <select
              id={`${serviceType}-priority`}
              name="priorite"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
            >
              <option value="">{isEn ? 'Select' : 'Sélectionner'}</option>
              <option value="critique">{isEn ? 'Critical' : 'Critique'}</option>
              <option value="haute">{isEn ? 'High' : 'Haute'}</option>
              <option value="moyenne">{isEn ? 'Medium' : 'Moyenne'}</option>
              <option value="basse">{isEn ? 'Low' : 'Basse'}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${serviceType}-message`} className="block text-sm font-medium text-gray-700 mb-2">
            {isEn ? 'Your message' : 'Votre message'}
          </label>
          <textarea
            id={`${serviceType}-message`}
            name="message"
            rows={5}
            maxLength={500}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all resize-none"
            placeholder={isEn 
              ? 'Describe your needs, challenges or specific objectives...'
              : 'Décrivez vos besoins, défis ou objectifs spécifiques...'}
          />
          <p className={`text-xs mt-1 text-right ${formData.message.length > 450 ? 'text-red-600' : 'text-gray-500'}`}>
            {formData.message.length}/500
          </p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <i className="ri-error-warning-fill text-lg"></i>
            {errors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-base hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line text-xl animate-spin"></i>
              <span>{isEn ? 'Sending...' : 'Envoi en cours...'}</span>
            </>
          ) : (
            <>
              <span>{isEn ? 'Send my request' : 'Envoyer ma demande'}</span>
              <i className="ri-send-plane-fill"></i>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-3 text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-1.5">
            <i className="ri-shield-check-line text-gold-600"></i>
            <span>{isEn ? 'Confidential' : 'Confidentiel'}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <i className="ri-time-line text-gold-600"></i>
            <span>{isEn ? 'Response within 48h' : 'Réponse sous 48h'}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <i className="ri-gift-line text-gold-600"></i>
            <span>{isEn ? 'Free quote' : 'Devis gratuit'}</span>
          </div>
        </div>
      </form>
    </div>
  );
}



