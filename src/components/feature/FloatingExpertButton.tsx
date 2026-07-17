import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loadCalendlyScript } from './CalendlyWidget';

const EXPERT_FORM_URL = 'https://readdy.ai/api/form/d7b9lvmoim692ipjm2e0';
const CALENDLY_URL = 'https://calendly.com/essochamanu/consultation-strategique-30min';
const CALENDLY_FALLBACK_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=d4a82a`;

function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, { event_category: 'Conversion', ...params });
  }
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName === 'expert_form_submit' ? 'Lead' : 'Schedule', params);
  }
}

export default function FloatingExpertButton() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isFr = i18n.language.startsWith('fr');

  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'calendly'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', organization: '', subject: '', message: '',
  });

  // Ref pour le modal-root
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Recupere ou cree le modal-root
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      root.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;z-index:999999;pointer-events:none;';
      document.body.appendChild(root);
    }
    setModalRoot(root);
  }, []);

  /* ── Bouton visible immédiatement ── */
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* ── Ecoute l'evenement global dispatch par la nav ── */
  useEffect(() => {
    const openModal = () => {
      setIsVisible(true);
      setShowModal(true);
    };
    window.addEventListener('open-expert-modal', openModal);
    return () => window.removeEventListener('open-expert-modal', openModal);
  }, []);

  /* ── Bloquer le scroll body quand modal ouvert + activer pointer-events sur modal-root ── */
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      if (modalRoot) modalRoot.style.pointerEvents = 'auto';
    } else {
      document.body.style.overflow = '';
      if (modalRoot) modalRoot.style.pointerEvents = 'none';
    }
    return () => {
      document.body.style.overflow = '';
      if (modalRoot) modalRoot.style.pointerEvents = 'none';
    };
  }, [showModal, modalRoot]);

  /* ── Fermer avec Escape ── */
  const showModalRef = useRef(showModal);
  useEffect(() => { showModalRef.current = showModal; }, [showModal]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModalRef.current) {
        setShowModal(false);
        setSubmitStatus('idle');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSubmitStatus('idle');
    setActiveTab('form');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        subject: formData.subject,
        message: formData.message,
        source_page: window.location.pathname,
        form_type: 'expert',
      });
      const res = await fetch(EXPERT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setSubmitStatus('success');
        trackEvent('expert_form_submit', { subject: formData.subject, source_page: window.location.pathname });
        setFormData({ name: '', email: '', phone: '', organization: '', subject: '', message: '' });
        setTimeout(() => {
          closeModal();
          navigate('/thank-you/');
        }, 2200);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Charger le script Calendly ── */
  const [calendlyReady, setCalendlyReady] = useState(false);
  const [calendlyError, setCalendlyError] = useState(false);
  useEffect(() => {
    loadCalendlyScript()
      .then(() => setCalendlyReady(true))
      .catch(() => {
        setCalendlyReady(false);
        setCalendlyError(true);
      });
  }, []);

  /* ── Init inline Calendly quand onglet calendly est actif ── */
  useEffect(() => {
    if (activeTab !== 'calendly') return;
    let cancelled = false;

    const init = async () => {
      try {
        await loadCalendlyScript();
        if (cancelled) return;
        if ((window as any).Calendly && calendlyContainerRef.current) {
          try {
            calendlyContainerRef.current.innerHTML = '';
            (window as any).Calendly.initInlineWidget({
              url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=d4a82a`,
              parentElement: calendlyContainerRef.current,
              prefill: {},
              utm: {},
            });
            setCalendlyReady(true);
            setCalendlyError(false);
          } catch (widgetErr) {
            console.warn('[Calendly] initInlineWidget failed:', widgetErr);
            setCalendlyError(true);
          }
        } else {
          setCalendlyError(true);
        }
      } catch {
        if (!cancelled && calendlyContainerRef.current) {
          calendlyContainerRef.current.innerHTML = '';
        }
        setCalendlyError(true);
      }
    };

    init();
    return () => { cancelled = true; };
  }, [activeTab]);

  const txt = {
    btnText:       isFr ? 'Réserver un entretien stratégique' : 'Book a strategic consultation',
    badge:         isFr ? 'Consultation offerte' : 'Free consultation',
    close:         isFr ? 'Fermer' : 'Close',
    modalTitle:    isFr ? 'Réserver un entretien stratégique' : 'Book a strategic consultation',
    modalSub:      isFr ? 'Consultation confidentielle avec un expert senior' : 'Confidential consultation with a senior expert',
    tabForm:       isFr ? 'Envoyer un message' : 'Send a message',
    tabCalendly:   isFr ? 'Prise de RDV directe' : 'Book a meeting',
    nameLbl:       isFr ? 'Nom complet' : 'Full name',
    namePh:        isFr ? 'Votre nom' : 'Your name',
    emailLbl:      isFr ? 'Email professionnel' : 'Professional email',
    phoneLbl:      isFr ? 'Téléphone' : 'Phone',
    orgLbl:        isFr ? 'Organisation' : 'Organization',
    orgPh:         isFr ? 'Votre organisation' : 'Your organization',
    subjectLbl:    isFr ? 'Sujet' : 'Subject',
    subjectPh:     isFr ? 'Sélectionnez un sujet' : 'Select a subject',
    msgLbl:        isFr ? 'Message' : 'Message',
    msgPh:         isFr ? 'Décrivez brièvement votre besoin...' : 'Briefly describe your need...',
    submit:        isFr ? 'Envoyer ma demande' : 'Send my request',
    submitting:    isFr ? 'Envoi en cours...' : 'Sending...',
    privacy:       isFr ? 'Vos données sont protégées et ne seront jamais partagées' : 'Your data is protected and will never be shared',
    successTitle:  isFr ? 'Message envoyé avec succès !' : 'Message sent successfully!',
    successMsg:    isFr ? 'Nous vous contacterons dans les plus brefs délais.' : 'We will get back to you as soon as possible.',
    errorTitle:    isFr ? "Erreur d'envoi" : 'Sending error',
    errorMsg:      isFr ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.',
    calendlyEmbed: isFr ? 'Réserver une consultation instantanée' : 'Book an instant consultation',
    calendlyEmbedSub: isFr ? 'Choisissez votre créneau directement ci-dessous — sans quitter le site' : 'Choose your slot directly below — without leaving the site',
    calendlyNote:  isFr ? 'Vous serez redirigé vers Calendly pour finaliser votre réservation' : 'You will be redirected to Calendly to finalize your booking',
    calendlyLoading: isFr ? 'Chargement de Calendly...' : 'Loading Calendly...',
    b1Title: isFr ? 'Confidentiel' : 'Confidential',
    b1Text:  isFr ? 'Échange 100% privé' : '100% private exchange',
    b2Title: isFr ? 'Expert dédié' : 'Dedicated expert',
    b2Text:  isFr ? 'Consultant senior' : 'Senior consultant',
    b3Title: isFr ? 'Sans engagement' : 'No commitment',
    b3Text:  isFr ? '1er échange gratuit' : 'First exchange free',
  };

  /* ── Onglets ── */
  const tabBar = (
    <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem 1.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
      {(['form', 'calendly'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            if (tab === 'calendly') trackEvent('calendly_tab_open', { source: window.location.pathname });
          }}
          style={{
            flex: 1, padding: '0.625rem 0.75rem', borderRadius: '0.5rem', border: 'none',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', transition: 'all 0.2s',
            background: activeTab === tab ? 'linear-gradient(135deg, #6B9B1F, #86BC25)' : 'rgba(0,0,0,0.04)',
            color: activeTab === tab ? '#fff' : '#6b7280',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <i className={tab === 'form' ? 'ri-mail-send-line' : 'ri-calendar-check-line'} />
          {tab === 'form' ? txt.tabForm : txt.tabCalendly}
        </button>
      ))}
    </div>
  );

  /* ── Contenu Calendly ── */
  const calendlyFallback = (
    <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '2rem', background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)', marginBottom: '0.75rem' }}>
          <i className="ri-calendar-check-line" style={{ color: '#86BC25', fontSize: '0.9rem' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e' }}>{txt.calendlyEmbed}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>{txt.calendlyEmbedSub}</p>
      </div>
      <div
        ref={calendlyContainerRef}
        style={{ minWidth: '280px', height: '580px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #f3f4f6' }}
      >
        {!calendlyReady && !calendlyError && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <i className="ri-loader-4-line animate-spin" style={{ color: '#86BC25', fontSize: '1.5rem' }} />
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>{txt.calendlyLoading}</p>
          </div>
        )}
        {calendlyError && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center' }}>
            <i className="ri-calendar-check-line" style={{ color: '#86BC25', fontSize: '2rem', marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem', lineHeight: 1.5 }}>
              {isFr ? 'Calendly est indisponible dans cet environnement. Cliquez ci-dessous pour ouvrir la page de réservation.' : 'Calendly is unavailable in this environment. Click below to open the booking page.'}
            </p>
            <a
              href={CALENDLY_FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('calendly_external_click', { label: 'fallback_link' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #6B9B1F, #86BC25)',
                color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
                fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
              }}
            >
              <i className="ri-external-link-line" />
              {isFr ? 'Ouvrir Calendly' : 'Open Calendly'}
            </a>
          </div>
        )}
      </div>
      <p style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.75rem' }}>
        <i className="ri-information-line" style={{ marginRight: '0.25rem' }} />
        {txt.calendlyNote}{' '}
        <a href={CALENDLY_FALLBACK_URL} target="_blank" rel="noopener noreferrer"
          onClick={() => trackEvent('calendly_external_click', { label: 'fallback_link' })}
          style={{ color: '#86BC25', textDecoration: 'underline' }}>
          {isFr ? 'Ouvrir dans un nouvel onglet' : 'Open in new tab'}
        </a>
      </p>
    </div>
  );

  /* ── Modal ── */
  const modalContent = (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 999999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'auto',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expert-modal-title"
    >
      {/* Overlay - PAS de backdrop-filter, PAS de blur */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.80)',
          zIndex: 0,
        }}
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Carte modale */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#fff', borderRadius: '1rem',
        width: '100%', maxWidth: '540px', maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)',
          borderRadius: '1rem 1rem 0 0', padding: '1.5rem',
          borderBottom: '1px solid rgba(212,168,42,0.3)', position: 'relative',
        }}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: '2.25rem', height: '2.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
              border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.25rem',
            }}
            aria-label={txt.close}
          >
            <i className="ri-close-line" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '3.5rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', background: 'rgba(212,168,42,0.2)', border: '1px solid rgba(212,168,42,0.4)', flexShrink: 0,
            }}>
              <i className="ri-customer-service-2-line" style={{ color: '#86BC25', fontSize: '1.75rem' }} />
            </div>
            <div>
              <h3 id="expert-modal-title" style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>{txt.modalTitle}</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>{txt.modalSub}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {tabBar}

        {/* Body */}
        <div>
          {activeTab === 'calendly' && calendlyFallback}

          {activeTab === 'form' && (
            <div style={{ padding: '1.5rem' }}>
              {submitStatus === 'success' && (
                <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <i className="ri-checkbox-circle-fill" style={{ color: '#16a34a', fontSize: '1.5rem', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#14532d', margin: 0 }}>{txt.successTitle}</p>
                    <p style={{ color: '#15803d', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>{txt.successMsg}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <i className="ri-error-warning-fill" style={{ color: '#dc2626', fontSize: '1.5rem', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#7f1d1d', margin: 0 }}>{txt.errorTitle}</p>
                    <p style={{ color: '#b91c1c', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>{txt.errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Benefices */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                  { icon: 'ri-shield-check-line', color: '#86BC25', title: txt.b1Title, desc: txt.b1Text },
                  { icon: 'ri-user-star-line', color: '#10b981', title: txt.b2Title, desc: txt.b2Text },
                  { icon: 'ri-calendar-check-line', color: '#86BC25', title: txt.b3Title, desc: txt.b3Text },
                ].map((b, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '0.75rem', borderRadius: '0.75rem', background: '#f9fafb' }}>
                    <div style={{ width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `${b.color}18`, margin: '0 auto 0.5rem' }}>
                      <i className={b.icon} style={{ color: b.color, fontSize: '1.1rem' }} />
                    </div>
                    <p style={{ fontWeight: 700, fontSize: '0.75rem', color: '#1f2937', margin: 0 }}>{b.title}</p>
                    <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: '0.2rem 0 0', lineHeight: 1.3 }}>{b.desc}</p>
                  </div>
                ))}
              </div>

              {/* Formulaire */}
              <form id="expert-contact-form" data-readdy-form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="exp-name" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.nameLbl} *</label>
                    <input id="exp-name" type="text" name="name" required value={formData.name} onChange={handleChange} disabled={isSubmitting}
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      placeholder={txt.namePh} />
                  </div>
                  <div>
                    <label htmlFor="exp-email" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.emailLbl} *</label>
                    <input id="exp-email" type="email" name="email" required value={formData.email} onChange={handleChange} disabled={isSubmitting}
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      placeholder="votre@email.com" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="exp-phone" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.phoneLbl}</label>
                    <input id="exp-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting}
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      placeholder="+228 XX XX XX XX" />
                  </div>
                  <div>
                    <label htmlFor="exp-org" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.orgLbl}</label>
                    <input id="exp-org" type="text" name="organization" value={formData.organization} onChange={handleChange} disabled={isSubmitting}
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      placeholder={txt.orgPh} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="exp-subject" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.subjectLbl} *</label>
                  <select id="exp-subject" name="subject" required value={formData.subject} onChange={handleChange} disabled={isSubmitting}
                    style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <option value="">{txt.subjectPh}</option>
                    <option value="diagnostic">{isFr ? 'Diagnostic stratégique' : 'Strategic diagnosis'}</option>
                    <option value="governance">{isFr ? 'Gouvernance & Conformité' : 'Governance & Compliance'}</option>
                    <option value="finance">{isFr ? 'Performance financière' : 'Financial performance'}</option>
                    <option value="transformation">{isFr ? 'Transformation organisationnelle' : 'Organizational transformation'}</option>
                    <option value="rh">{isFr ? 'Ressources Humaines' : 'Human Resources'}</option>
                    <option value="esg">{isFr ? 'ESG & Impact Social' : 'ESG & Social Impact'}</option>
                    <option value="other">{isFr ? 'Autre sujet' : 'Other subject'}</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="exp-message" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{txt.msgLbl} *</label>
                  <textarea id="exp-message" name="message" required rows={3} maxLength={500} value={formData.message} onChange={handleChange} disabled={isSubmitting}
                    style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    placeholder={txt.msgPh} />
                  <p style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'right', margin: '0.25rem 0 0' }}>{formData.message.length}/500</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  style={{
                    width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none',
                    background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #a5d936 100%)',
                    color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                    cursor: (isSubmitting || submitStatus === 'success') ? 'not-allowed' : 'pointer',
                    opacity: (isSubmitting || submitStatus === 'success') ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {isSubmitting
                    ? <><i className="ri-loader-4-line animate-spin" /> {txt.submitting}</>
                    : <><i className="ri-send-plane-fill" /> {txt.submit}</>
                  }
                </button>
              </form>

              <p style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center', marginTop: '1rem' }}>{txt.privacy}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Bouton flottant — z-index maximal, interactivité garantie ── */}
      <button
        onClick={() => setShowModal(true)}
        className={`fixed bottom-32 right-6 group transition-all duration-500 cursor-pointer ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{ zIndex: 9990, pointerEvents: 'auto', touchAction: 'manipulation' }}
        aria-label={txt.btnText}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none" style={{ background: '#86BC25' }} aria-hidden="true" />
        <span
          className="relative flex items-center gap-3 px-6 py-4 rounded-full text-white font-semibold text-sm whitespace-nowrap transition-transform duration-300 group-hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #a5d936 100%)', boxShadow: '0 8px 32px rgba(107,155,31,0.45)' }}
        >
          <i className="ri-customer-service-2-line text-xl" aria-hidden="true" />
          {txt.btnText}
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
        </span>
        <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap pointer-events-none" aria-hidden="true">
          {txt.badge}
        </span>
      </button>

      {/* ── Modal via Portal → rendu dans #modal-root ── */}
      {showModal && modalRoot && createPortal(modalContent, modalRoot)}
    </>
  );
}