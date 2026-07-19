import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { LEAD_SERVICES } from '@/mocks/specializedOffers';

const LeadServiceCard = memo(function LeadServiceCard({
  service,
  index,
  isEn,
  navigate,
  onOpenForm,
}: {
  service: (typeof LEAD_SERVICES)[0];
  index: number;
  isEn: boolean;
  navigate: ReturnType<typeof useNavigate>;
  onOpenForm: (url: string, serviceName: string, serviceId: string) => void;
}) {
  const isFree = service.priceFr === 'Gratuit';

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (service.formUrl) {
      onOpenForm(service.formUrl, isEn ? service.nameEn : service.nameFr, service.id);
    } else {
      navigate(service.slug);
    }
  };

  const handleCardClick = () => {
    if (service.formUrl) {
      onOpenForm(service.formUrl, isEn ? service.nameEn : service.nameFr, service.id);
    } else {
      navigate(service.slug);
    }
  };

  return (
    <ScrollReveal delay={index * 60}>
      <div
        className="group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        style={{
          background: '#ffffff',
          borderColor: 'rgba(212,168,42,0.15)',
        }}
        onClick={handleCardClick}
      >
        {/* Price badge + duration */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: isFree ? 'rgba(34,160,90,0.10)' : 'rgba(212,168,42,0.10)',
              color: isFree ? '#86BC25' : '#86BC25',
              border: `1px solid ${isFree ? 'rgba(34,160,90,0.20)' : 'rgba(212,168,42,0.20)'}`,
            }}
          >
            <i className={isFree ? 'ri-gift-line' : 'ri-coins-line'} />
            {isEn ? service.priceEn : service.priceFr}
          </span>
          <span className="text-xs font-medium text-gray-400">{isEn ? service.durationEn : service.durationFr}</span>
        </div>

        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
          style={{ background: `${service.accentColor}10`, border: `1px solid ${service.accentColor}20` }}
        >
          <i className={`${service.icon} text-xl`} style={{ color: service.accentColor }} />
        </div>

        {/* Title */}
        <h4 className="font-playfair text-lg font-bold text-gray-900 mb-2">
          {isEn ? service.nameEn : service.nameFr}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {isEn ? service.descriptionEn : service.descriptionFr}
        </p>

        {/* Target */}
        <p className="text-xs font-medium mb-4" style={{ color: 'rgba(107,114,128,0.7)' }}>
          <i className="ri-user-line mr-1" />
          {isEn ? service.targetEn : service.targetFr}
        </p>

        {/* CTA */}
        <button
          onClick={handleCta}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(212,168,42,0.08)',
            border: '1.5px solid rgba(212,168,42,0.3)',
            color: '#6B9B1F',
          }}
        >
          {isEn ? service.ctaEn : service.ctaFr}
          <i className="ri-arrow-right-line" />
        </button>
      </div>
    </ScrollReveal>
  );
});

// Inline form modal component
function LeadFormModal({
  url,
  serviceName,
  formId,
  isEn,
  onClose,
}: {
  url: string;
  serviceName: string;
  formId: string;
  isEn: boolean;
  onClose: () => void;
}) {
  const [data, setData] = useState({ name: '', email: '', company: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const params = new URLSearchParams();
      params.append('nom', data.name);
      params.append('email', data.email);
      params.append('societe', data.company);
      params.append('telephone', data.phone);
      params.append('service', serviceName);

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-gray-600" />
        </button>

        <div className="mb-6">
          <div 
            className="w-12 h-12 flex items-center justify-center rounded-xl mb-3"
            style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.20)' }}
          >
            <i className="ri-file-list-3-line text-xl" style={{ color: '#6B9B1F' }} />
          </div>
          <h3 className="font-playfair text-xl font-bold text-gray-900">
            {isEn ? `Request: ${serviceName}` : `Demande : ${serviceName}`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isEn
              ? 'Fill in your details to receive your personalized report.'
              : 'Renseignez vos coordonnées pour recevoir votre rapport personnalisé.'}
          </p>
        </div>

        {status === 'success' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <i className="ri-checkbox-circle-line text-2xl text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">
                {isEn ? 'Request sent successfully!' : 'Demande envoyée avec succès !'}
              </p>
              <p className="text-sm text-emerald-700 mt-1">
                {isEn
                  ? 'We will contact you within 24 hours.'
                  : 'Nous vous recontactons sous 24h.'}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 mb-4">
            <i className="ri-error-warning-line text-2xl text-red-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800">
                {isEn ? 'An error occurred.' : 'Une erreur est survenue.'}
              </p>
              <p className="text-sm text-red-700 mt-1">
                {isEn ? 'Please try again or contact us directly.' : 'Veuillez réessayer ou nous contacter directement.'}
              </p>
            </div>
          </div>
        )}

        {(status === 'idle' || status === 'submitting' || status === 'error') && (
          <form data-readdy-form id={formId} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEn ? 'Full name' : 'Nom complet'} *
              </label>
              <input
                type="text"
                name="nom"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B9B1F] focus:border-transparent text-sm"
                placeholder={isEn ? 'Your name' : 'Votre nom'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B9B1F] focus:border-transparent text-sm"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEn ? 'Company / Organization' : 'Société / Organisation'} *
              </label>
              <input
                type="text"
                name="societe"
                required
                value={data.company}
                onChange={(e) => setData({ ...data, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B9B1F] focus:border-transparent text-sm"
                placeholder={isEn ? 'Your organization' : 'Votre organisation'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEn ? 'Phone' : 'Téléphone'} *
              </label>
              <input
                type="tel"
                name="telephone"
                required
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B9B1F] focus:border-transparent text-sm"
                placeholder="+228 XX XX XX XX"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full px-6 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                color: '#0a1f33',
              }}
            >
              {status === 'submitting' && <i className="ri-loader-4-line animate-spin" />}
              {isEn ? 'Send my request' : 'Envoyer ma demande'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export const HomeLeadServices = memo(function HomeLeadServices() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'paid'>('all');
  const [formModal, setFormModal] = useState<{ url: string; name: string; id: string } | null>(null);

  const filtered = LEAD_SERVICES.filter((s) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'free') return s.priceFr === 'Gratuit';
    return s.priceFr !== 'Gratuit';
  });

  const tabs = [
    { key: 'all' as const, labelFr: 'Tous', labelEn: 'All' },
    { key: 'free' as const, labelFr: 'Gratuits', labelEn: 'Free' },
    { key: 'paid' as const, labelFr: 'Sur devis', labelEn: 'On quote' },
  ];

  return (
    <section id="lead-services" className="py-24 bg-[#fafaf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.20)' }}
          >
            <i className="ri-door-open-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              {isEn ? 'Free & Low-Friction Entry Points' : "Services d'entrée gratuits & abordables"}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'Start with a quick diagnostic' : 'Commencez par un diagnostic rapide'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {isEn
              ? '7 express services. Understandable in 10 seconds. Free or low-cost. Each converts into a full mission when you are ready.'
              : "7 services express. Compréhensibles en 10 secondes. Gratuits ou sur devis. Chacun convertit vers une mission complète quand vous êtes prêt."}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200/60">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer"
                style={{
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #86BC25, #f4d03f)' : 'transparent',
                  color: activeTab === tab.key ? '#0a1f33' : '#6b7280',
                }}
              >
                {isEn ? tab.labelEn : tab.labelFr}
              </button>
            ))}
          </div>
        </div>

        {/* Grid lead services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((service, index) => (
            <LeadServiceCard key={service.id} service={service} index={index} isEn={isEn} navigate={navigate} onOpenForm={setFormModal} />
          ))}
        </div>

        {/* CTA conversion */}
        <ScrollReveal delay={100}>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/tools')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6B9B1F, #86BC25)',
                color: '#ffffff',
                boxShadow: '0 4px 24px rgba(34,160,90,0.35)',
              }}
            >
              {isEn ? 'See all 20 diagnostic tools' : 'Voir les 20 outils de diagnostic'}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </ScrollReveal>

        {/* Trust bar */}
        <ScrollReveal>
          <div
            className="mt-16 rounded-3xl p-8 lg:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#86BC25' }}>
              {isEn ? 'The numbers that matter' : 'Les chiffres qui comptent'}
            </p>
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-2">
              22 ans &middot; 500+ missions &middot; 15 pays &middot; €500M+ de transactions
            </h3>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
              {isEn
                ? 'Each interaction generates value. You only pay when you move forward concretely.'
                : 'Chaque interaction avec Khepra génère de la valeur. Vous ne payez que quand vous avancez concrètement.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/tools/diagnostic-organisationnel')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                  color: '#0a1f33',
                  boxShadow: '0 4px 20px rgba(212,168,42,0.45)',
                }}
              >
                <i className="ri-stethoscope-line" />
                {isEn ? 'Free strategic diagnosis' : 'Diagnostic stratégique gratuit'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  border: '1.5px solid rgba(212,168,42,0.4)',
                  color: '#86BC25',
                  background: 'transparent',
                }}
              >
                <i className="ri-calendar-check-line" />
                {isEn ? 'Book a consultation' : 'Prendre rendez-vous'}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Form Modal */}
      {formModal && (
        <LeadFormModal
          url={formModal.url}
          serviceName={formModal.name}
          formId={formModal.id}
          isEn={isEn}
          onClose={() => setFormModal(null)}
        />
      )}
    </section>
  );
});



