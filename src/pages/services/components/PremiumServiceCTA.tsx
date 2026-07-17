import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface PremiumServiceCTAProps {
  formId: string;
  formUrl: string;
  badge?: string;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  secondaryBtnText?: string;
  secondaryBtnAction?: 'contact' | 'case-studies' | 'diagnostic-flash' | 'none';
  variant?: 'dark' | 'light' | 'gradient';
  showBenefits?: boolean;
}

const BENEFITS_FR = [
  'Réponse sous 24h ouvrées',
  'Confidentialité absolue (NDA systématique)',
  'Experts senior avec 22 ans d\'expérience',
  'Disponible en français et anglais',
];

const BENEFITS_EN = [
  'Response within 24 business hours',
  'Absolute confidentiality (systematic NDA)',
  'Senior experts with 22 years of experience',
  'Available in French and English',
];

export default function PremiumServiceCTA({
  formId,
  formUrl,
  badge,
  title,
  subtitle,
  primaryBtnText,
  secondaryBtnText,
  secondaryBtnAction = 'contact',
  variant = 'dark',
  showBenefits = true,
}: PremiumServiceCTAProps) {
  const navigate = useNavigate();
  const isEn = document.documentElement.lang === 'en' || navigator.language.startsWith('en');

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
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

      const response = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', telephone: '', organisation: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgStyle =
    variant === 'dark'
      ? { background: '#0a0a0a' }
      : variant === 'gradient'
        ? { background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)' }
        : { background: '#ffffff' };

  const textColor = variant === 'light' ? 'text-gray-900' : 'text-white';
  const subColor = variant === 'light' ? 'text-gray-500' : 'rgba(255,255,255,0.45)';
  const borderColor = variant === 'light' ? 'border-gray-100' : 'rgba(255,255,255,0.08)';
  const cardBg = variant === 'light' ? 'bg-white' : 'rgba(255,255,255,0.03)';

  const handleSecondary = () => {
    switch (secondaryBtnAction) {
      case 'contact':
        navigate('/contact');
        break;
      case 'case-studies':
        navigate('/case-studies');
        break;
      case 'diagnostic-flash':
        navigate('/diagnostic-flash');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-20 border-t" style={{ ...bgStyle, borderColor: variant === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            {badge && (
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6" style={{ background: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#86BC25' }}>
                  {badge}
                </span>
              </div>
            )}
            <h2 className={`font-playfair text-3xl font-bold mb-4 leading-tight ${textColor}`}>{title}</h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: subColor }}>{subtitle}</p>

            {showBenefits && (
              <div className="space-y-3 mb-8">
                {(isEn ? BENEFITS_EN : BENEFITS_FR).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(34,160,90,0.15)' }}>
                      <i className="ri-check-line text-xs" style={{ color: '#86BC25' }} />
                    </div>
                    <span className="text-sm" style={{ color: variant === 'light' ? '#4b5563' : 'rgba(255,255,255,0.70)' }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@khepraexperts.com"
                className="flex items-center gap-3 transition-colors group"
                style={{ color: variant === 'light' ? '#6b7280' : 'rgba(255,255,255,0.60)' }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: variant === 'light' ? 'rgba(201,162,39,0.10)' : 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-mail-line text-lg" style={{ color: '#86BC25' }} />
                </div>
                <span className="text-sm">contact@khepraexperts.com</span>
              </a>
              <a
                href="https://wa.me/22893984909"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 transition-colors group"
                style={{ color: variant === 'light' ? '#6b7280' : 'rgba(255,255,255,0.60)' }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: variant === 'light' ? 'rgba(201,162,39,0.10)' : 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-whatsapp-line text-lg" style={{ color: '#86BC25' }} />
                </div>
                <span className="text-sm">+228 93 98 49 09</span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl p-8 lg:p-10 shadow-xl" style={{ background: variant === 'light' ? '#ffffff' : 'rgba(255,255,255,0.03)', border: `1px solid ${borderColor}` }}>
            <h3 className={`font-playfair text-xl font-bold mb-2 ${textColor}`}>
              {isEn ? 'Send your request' : 'Envoyer votre demande'}
            </h3>
            <p className="text-sm mb-6" style={{ color: subColor }}>
              {isEn ? 'Fill in this form and a senior expert will contact you within 24 hours.' : 'Remplissez ce formulaire et un expert senior vous contacte sous 24h.'}
            </p>

            <form id={formId} data-readdy-form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={`${formId}-nom`} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    {isEn ? 'Full Name' : 'Nom complet'} *
                  </label>
                  <input
                    type="text" id={`${formId}-nom`} name="nom" required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white"
                    placeholder={isEn ? 'Your name' : 'Votre nom'}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-email`} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email" id={`${formId}-email`} name="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={`${formId}-telephone`} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    {isEn ? 'Phone' : 'Téléphone'}
                  </label>
                  <input
                    type="tel" id={`${formId}-telephone`} name="telephone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-organisation`} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    {isEn ? 'Organization' : 'Organisation'}
                  </label>
                  <input
                    type="text" id={`${formId}-organisation`} name="organisation"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all bg-white"
                    placeholder={isEn ? 'Your organization' : 'Votre organisation'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-message`} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {isEn ? 'Your message' : 'Votre message'} *
                </label>
                <textarea
                  id={`${formId}-message`} name="message" required rows={4} maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-sm transition-all resize-none bg-white"
                  placeholder={isEn ? 'Describe your project or need...' : 'Décrivez votre projet ou besoin...'}
                />
                <p className={`text-xs mt-1 ${formData.message.length > 450 ? 'text-red-600' : 'text-gray-400'}`}>
                  {formData.message.length}/500
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-checkbox-circle-fill text-lg" />
                  <span>{isEn ? 'Message sent! An expert will contact you within 24 hours.' : 'Message envoyé ! Un expert vous contactera sous 24h.'}</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-fill text-lg" />
                  <span>{isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
                >
                  {isSubmitting ? (isEn ? 'Sending...' : 'Envoi en cours...') : <><i className="ri-send-plane-line" />{primaryBtnText}</>}
                </button>
                {secondaryBtnText && secondaryBtnAction !== 'none' && (
                  <button
                    type="button"
                    onClick={handleSecondary}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: variant === 'light' ? '#6b7280' : 'rgba(255,255,255,0.70)', border: `1px solid ${variant === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.15)'}` }}
                  >
                    {secondaryBtnText}
                    <i className="ri-arrow-right-line" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}