import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockEvents, eventFilters } from '@/mocks/events';
import { mockEventsEn, eventFiltersEn } from '@/mocks/eventsEn';
import OptimizedImage from '@/components/base/OptimizedImage';

interface InterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEn: boolean;
}

function InterventionModal({ isOpen, onClose, isEn }: InterventionModalProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new URLSearchParams();
    Array.from(form.elements).forEach((el) => {
      const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (input.name) data.append(input.name, input.value);
    });
    try {
      const res = await fetch('https://readdy.ai/api/form/d6pcslsddmmni7ck80b0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-900 to-brand-800 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-white text-lg"></i>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gold-500 rounded-full">
              <i className="ri-mic-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold">
                {isEn ? 'Propose an Intervention' : 'Proposer une intervention'}
              </h3>
              <p className="text-gray-300 text-xs">
                {isEn ? 'Response within 24 business hours' : 'Réponse sous 24h ouvrées'}
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-3">
            {isEn
              ? 'You are organizing an event and would like KHEPRA EXPERTS to participate? Fill in this form.'
              : 'Vous organisez un événement et souhaitez que KHEPRA EXPERTS y intervienne ? Remplissez ce formulaire.'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                <i className="ri-check-line text-green-600 text-3xl"></i>
              </div>
              <h4 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                {isEn ? 'Request sent!' : 'Demande envoyée !'}
              </h4>
              <p className="text-gray-500 text-sm">
                {isEn
                  ? 'Thank you for your invitation. Our team will get back to you within 24 business hours.'
                  : 'Merci pour votre invitation. Notre équipe vous répondra sous 24h ouvrées.'}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full bg-gold-500 text-white text-sm font-medium hover:bg-gold-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isEn ? 'Close' : 'Fermer'}
              </button>
            </div>
          ) : (
            <form data-readdy-form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Full name' : 'Nom complet'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={isEn ? 'Your name' : 'Votre nom et prénom'}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              {/* Organisation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Organization / Event' : 'Organisation / Événement'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  required
                  placeholder={isEn ? 'Name of your organization or event' : 'Nom de votre organisation ou événement'}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Professional email' : 'Email professionnel'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Phone' : 'Téléphone'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+228 XX XX XX XX"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>

              {/* Date & Lieu */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? 'Event date' : "Date de l'événement"}
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? 'Location' : 'Lieu'}
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder={isEn ? 'City, Country' : 'Ville, Pays'}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Thème */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Intervention theme' : "Thème d'intervention souhaité"} <span className="text-red-500">*</span>
                </label>
                <select
                  name="theme"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent cursor-pointer"
                >
                  <option value="">{isEn ? 'Select a theme' : 'Sélectionnez un thème'}</option>
                  <option value="gouvernance">{isEn ? 'Corporate Governance' : 'Gouvernance d\'entreprise'}</option>
                  <option value="inclusion_financiere">{isEn ? 'Financial & Digital Inclusion' : 'Inclusion financière & digitale'}</option>
                  <option value="microfinance">{isEn ? 'Microfinance & SFD' : 'Microfinance & SFD'}</option>
                  <option value="risques">{isEn ? 'Risk Management (ERM)' : 'Gestion des risques (ERM)'}</option>
                  <option value="strategie">{isEn ? 'Strategic Advisory' : 'Conseil stratégique'}</option>
                  <option value="conformite">{isEn ? 'Compliance & Regulation' : 'Conformité & Réglementation'}</option>
                  <option value="autre">{isEn ? 'Other' : 'Autre'}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEn ? 'Description of the event' : "Description de l'événement"}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={500}
                  placeholder={isEn
                    ? 'Describe your event, expected audience, format...'
                    : 'Décrivez votre événement, le public attendu, le format souhaité…'}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                ></textarea>
                <p className="text-xs text-gray-400 text-right mt-1">{charCount}/500</p>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  {isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-white font-semibold py-3 rounded-full text-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    {isEn ? 'Sending...' : 'Envoi en cours…'}
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line"></i>
                    {isEn ? 'Send my proposal' : 'Envoyer ma proposition'}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                <i className="ri-shield-check-line text-green-500"></i>
                {isEn ? 'Your data is protected and will never be shared.' : 'Vos données sont protégées et ne seront jamais partagées.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function Events() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('tous');
  const [visibleCount, setVisibleCount] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);

  const isEn = i18n.language === 'en';
  const events = isEn ? mockEventsEn : mockEvents;
  const filters = isEn ? eventFiltersEn : eventFilters;

  const filtered = activeFilter === 'tous'
    ? events
    : events.filter(e => e.type === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="actualites" className="py-24 bg-white">
      <InterventionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} isEn={isEn} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label">{t('events.title')}</span>
            <h2 className="section-title">
              {t('events.subtitle')}
            </h2>
          </div>
          {/* Bouton Proposer une intervention */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-semibold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg group"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-mic-line group-hover:scale-110 transition-transform"></i>
            </div>
            {isEn ? 'Propose an Intervention' : 'Proposer une intervention'}
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setVisibleCount(4); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                activeFilter === f.key
                  ? 'bg-gold-500 text-white border-gold-500 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Featured card */}
        {activeFilter === 'tous' && (() => {
          const featured = events.find(e => e.featured);
          if (!featured) return null;
          return (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col lg:flex-row group hover:shadow-xl transition-all duration-300">
              <div className="lg:w-1/2 overflow-hidden" style={{ minHeight: 256 }}>
                <div className="w-full h-64 lg:h-full" style={{ aspectRatio: '16/10' }}>
                  <OptimizedImage
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full"
                    aspectRatio="16/10"
                    objectFit="cover"
                    loading="lazy"
                    placeholder="shimmer"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-brand-50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${featured.tagColor}`}>
                    {featured.tag}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {featured.date}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-snug line-clamp-2" title={featured.title}>{featured.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6" title={featured.description}>{featured.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-map-pin-line text-gold-600"></i>
                  </div>
                  {featured.location}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {visible
            .filter(e => !(activeFilter === 'tous' && e.featured && e.id === events.find(x => x.featured)?.id))
            .map(event => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <OptimizedImage
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full"
                    aspectRatio="16/10"
                    objectFit="cover"
                    loading="lazy"
                    placeholder="shimmer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.tagColor}`}>
                      {event.tag}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <i className="ri-calendar-line"></i>
                      {event.date}
                    </span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-2" title={event.title}>{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3" title={event.description}>{event.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-50 pt-4">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-map-pin-line text-gold-500"></i>
                    </div>
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gold-500 text-gold-600 font-medium text-sm hover:bg-gold-500 hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line"></i>
              {t('events.allNews')}
            </button>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}
        >
          {/* Lueur verte */}
          <div
            className="absolute top-0 left-1/4 w-64 h-24 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #22a05a, transparent)' }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}
            >
              {isEn ? 'Invite our experts' : 'Invitez nos experts'}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.618 }}>
              {isEn
                ? 'Governance, microfinance, digital transformation — our experts speak at your events.'
                : 'Gouvernance, microfinance, transformation digitale — nos experts interviennent lors de vos événements.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 border text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
            >
              <i className="ri-mic-line" />
              {isEn ? 'Propose an Intervention' : 'Proposer une intervention'}
            </button>
            <a
              href={`https://wa.me/22893984909?text=${encodeURIComponent('Bonjour KHEPRA EXPERTS, je souhaite vous inviter à intervenir lors d\'un événement.')}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-3 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'linear-gradient(135deg, #1a6b3c, #22a05a)',
                boxShadow: '0 4px 20px rgba(34,160,90,0.35)',
              }}
            >
              <i className="ri-send-plane-line" />
              {isEn ? 'Contact us' : 'Nous contacter'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}