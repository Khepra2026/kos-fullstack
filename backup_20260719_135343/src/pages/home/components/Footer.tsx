import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';
import { LanguageSwitcherFooter } from '@/components/feature/LanguageSwitcher';
import CommunityReviewBanner from '@/components/feature/CommunityReviewBanner';
import { LazyImage } from '@/components/base/LazyImage';

export function Footer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      const response = await fetch('https://readdy.ai/api/form/d6rdo9dsbgrc47fimia0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fourBUs = [
    {
      id: 'bu1-regulation',
      title: 'Régulation Financière & Conformité',
      subtitle: isEn ? 'BCEAO · COBAC · LBC/FT · Agrément · Veille 24/7' : 'BCEAO · COBAC · LBC/FT · Agrément · Veille 24/7',
      href: '/kos-bu1-financial-regulation/',
      icon: 'ri-shield-check-line',
      metric: '137+',
      metricLabel: isEn ? 'regulatory texts covered' : 'textes réglementaires couverts',
      items: [
        { label: isEn ? 'Inspection Readiness BCEAO/COBAC' : 'Inspection Readiness BCEAO/COBAC', href: '/kos-bu1-financial-regulation/' },
        { label: isEn ? 'AML/CFT — GAFI Standards' : 'LBC/FT — Normes GAFI', href: '/kos-bu1-financial-regulation/' },
        { label: isEn ? 'Licensing & Accreditation' : 'Agrément & Licensing', href: '/kos-bu1-financial-regulation/' },
        { label: isEn ? 'Regulatory Watch 24/7' : 'Veille Réglementaire 24/7', href: '/kos-bu1-financial-regulation/' },
      ],
    },
    {
      id: 'bu2-governance',
      title: 'Gouvernance & Due Diligence',
      subtitle: isEn ? 'Board Advisory · DD Full Scope · Investability Score' : 'Conseil CA · DD Full Scope · Investability Score',
      href: '/kos-bu2-governance-due-diligence/',
      icon: 'ri-government-line',
      metric: '200+',
      metricLabel: isEn ? 'missions completed' : 'missions réalisées',
      items: [
        { label: isEn ? 'Due Diligence — Full Scope' : 'Due Diligence — Full Scope', href: '/kos-bu2-governance-due-diligence/' },
        { label: isEn ? 'Board Advisory' : 'Conseil CA', href: '/kos-bu2-governance-due-diligence/' },
        { label: isEn ? 'Governance Audit — 7 Pillars' : 'Audit Gouvernance — 7 Piliers', href: '/kos-bu2-governance-due-diligence/' },
        { label: isEn ? 'KOS REGTECH AI Investability Score™' : 'KOS REGTECH AI Investability Score™', href: '/kos-bu2-governance-due-diligence/' },
      ],
    },
    {
      id: 'bu3-climate',
      title: 'Climat, Transition & ESG',
      subtitle: isEn ? 'Carbon Footprint · ISSB/GRI/CSRD · Green Finance' : 'Bilan Carbone · ISSB/GRI/CSRD · Financements Verts',
      href: '/kos-bu3-climate-esg/',
      icon: 'ri-leaf-line',
      metric: '3',
      metricLabel: isEn ? 'standards (ISSB/GRI/CSRD)' : 'standards (ISSB/GRI/CSRD)',
      items: [
        { label: isEn ? 'Carbon Footprint Scope 1-2-3' : 'Bilan Carbone Scope 1-2-3', href: '/kos-bu3-climate-esg/' },
        { label: isEn ? 'ESG Strategy — ISSB/GRI' : 'Stratégie ESG — ISSB/GRI', href: '/kos-bu3-climate-esg/' },
        { label: isEn ? 'Green Finance — GCF/GEF' : 'Financements Verts — FVC/GCF', href: '/kos-bu3-climate-esg/' },
        { label: isEn ? 'ESG Diagnostic (Offered)' : 'Diagnostic ESG (Offert)', href: '/kos-bu3-climate-esg/', badge: 'Offert' },
      ],
    },
    {
      id: 'bu4-kbr',
      title: 'KBR-Model & Intelligence d\'Affaires',
      subtitle: isEn ? 'Sector Studies · Monographs · High-Ticket Reports' : 'Études Sectorielles · Monographies · Rapports High-Ticket',
      href: '/kos-bu4-kbr-model/',
      icon: 'ri-line-chart-line',
      metric: '3',
      metricLabel: isEn ? 'KBR levels (L1/L2/L3)' : 'niveaux KBR (L1/L2/L3)',
      items: [
        { label: isEn ? 'Premium Sector Studies (L1)' : 'Études Sectorielles Premium (L1)', href: '/kos-bu4-kbr-model/' },
        { label: isEn ? 'Monographs — Articles (L2)' : 'Monographies — Articles (L2)', href: '/kos-bu4-kbr-model/' },
        { label: isEn ? 'High-Ticket Reports (L3)' : 'Rapports High-Ticket (L3)', href: '/kos-bu4-kbr-model/' },
        { label: isEn ? 'KBR Intelligence Sample' : 'KBR Intelligence Sample', href: '/kos-bu4-kbr-model/', badge: 'Offert' },
      ],
    },
  ];

  const insights = [
    { label: 'Blog', href: '/blog/', icon: 'ri-quill-pen-line' },
    { label: isEn ? 'Case Studies' : 'Études de cas', href: '/case-studies/', icon: 'ri-file-text-line' },
    { label: isEn ? 'Resources' : 'Ressources', href: '/resources/', icon: 'ri-folder-download-line' },
    { label: 'Khepra Business Review', href: '/khepra-business-review/', icon: 'ri-book-2-line' },
    { label: isEn ? 'Insights Hub' : 'Hub Insights', href: '/insights/', icon: 'ri-lightbulb-flash-line' },
    { label: 'KBR-Model — Intelligence d\'Affaires', href: '/kos-bu4-kbr-model/', icon: 'ri-line-chart-line', badge: 'BU4' },
    { label: isEn ? 'African Regulatory Observatory' : 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', badge: 'NEW' },
    { label: isEn ? 'Sector Observatories' : 'Observatoires Sectoriels', href: '/observatoires-sectoriels/', icon: 'ri-pie-chart-line', badge: 'NEW' },
    { label: isEn ? 'BCEAO Barometer 2026' : 'Baromètre BCEAO 2026', href: '/barometre-bceao-2026/', icon: 'ri-bar-chart-line', badge: 'NEW' },
    { label: isEn ? 'CEMAC Barometer 2026' : 'Baromètre CEMAC 2026', href: '/barometre-cemac-2026/', icon: 'ri-bar-chart-grouped-line', badge: 'NEW' },
  ];

  const tools = [
    { label: isEn ? 'Compliance Score (Free)' : 'Score de Conformité (Offert)', href: '/compliance-score/', icon: 'ri-bar-chart-2-line', badge: 'NEW' },
    { label: isEn ? 'Board Report' : 'Rapport CA offert', href: '/board-report/', icon: 'ri-file-chart-line' },
    { label: isEn ? 'Org. Diagnostic' : 'Diagnostic organisationnel', href: '/tools/diagnostic-organisationnel/', icon: 'ri-stethoscope-line' },
    { label: isEn ? 'Governance Assessment' : 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance/', icon: 'ri-scales-line' },
    { label: isEn ? 'Digital Maturity' : 'Maturité digitale', href: '/tools/maturite-digitale/', icon: 'ri-bar-chart-line' },
    { label: isEn ? 'All Tools' : 'Tous les outils', href: '/tools/', icon: 'ri-grid-line' },
  ];

  const company = [
    { label: isEn ? 'About' : 'À propos', href: '/about/', icon: 'ri-information-line' },
    { label: isEn ? 'Why KHEPRA' : 'Pourquoi KHEPRA', href: '/pourquoi-khepra/', icon: 'ri-lightbulb-flash-line' },
    { label: isEn ? 'Team' : 'Équipe', href: '/equipe/', icon: 'ri-team-line' },
    { label: isEn ? 'Expertises' : 'Expertises', href: '/expertises/', icon: 'ri-award-line' },
    { label: isEn ? 'Approach' : 'Approche', href: '/approche/', icon: 'ri-compass-3-line' },
    { label: isEn ? 'Experts' : 'Experts', href: '/experts/', icon: 'ri-user-star-line' },
    { label: isEn ? 'Partners' : 'Partenaires', href: '/partenaires/', icon: 'ri-links-line' },
    { label: isEn ? 'Publications' : 'Publications', href: '/publications/', icon: 'ri-book-open-line' },
    // Désactivé temporairement — page /formations non publique
    // { label: isEn ? 'Training' : 'Formations', href: '/formations/', icon: 'ri-graduation-cap-line' },
    { label: isEn ? 'Careers' : 'Carrières', href: '/careers/', icon: 'ri-briefcase-4-line' },
    { label: isEn ? 'Contact' : 'Contact', href: '/contact/', icon: 'ri-mail-send-line' },
  ];

  return (
    <footer
      className="relative overflow-hidden bg-black"
      role="contentinfo"
    >
      {/* Top gold bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #c4a235, #d4a82a, #e8c547, #d4a82a, #c4a235, transparent)' }}
        aria-hidden="true"
      />

      {/* BARRE DE RÉASSURANCE */}
      <div className="relative z-10 border-b" style={{ borderColor: 'rgba(134,188,37,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              { icon: 'ri-bank-line', labelFr: 'Agréé BCEAO', labelEn: 'BCEAO Approved' },
              { icon: 'ri-shield-check-line', labelFr: 'Conforme COBAC', labelEn: 'COBAC Compliant' },
              { icon: 'ri-lock-line', labelFr: 'RGPD', labelEn: 'GDPR / RGPD' },
              { icon: 'ri-award-line', labelFr: 'Standard ISO 27001', labelEn: 'ISO 27001 Standard' },
              { icon: 'ri-leaf-line', labelFr: 'Normes IFC Performance', labelEn: 'IFC Performance Standards' },
              { icon: 'ri-global-line', labelFr: 'Expertise OHADA', labelEn: 'OHADA Expertise' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: 'rgba(134,188,37,0.12)', border: '1px solid rgba(134,188,37,0.22)' }}>
                  <i className={`${badge.icon} text-sm`} style={{ color: '#86BC25' }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {isEn ? badge.labelEn : badge.labelFr}
                </span>
                {i < 5 && <span className="hidden md:block w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.10)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background décor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 font-playfair font-bold leading-none select-none opacity-[0.025]"
          style={{ fontSize: '22rem', WebkitTextStroke: '2px #86BC25', WebkitTextFillColor: 'transparent', transform: 'translate(10%, 20%)' }}
        >
          K
        </div>
      </div>

      {/* ============================================================
          BLOC CTA PREMIUM
      ============================================================ */}
      <div className="relative z-10 border-b" style={{ borderColor: 'rgba(212,168,42,0.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Gauche : CTA */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>
                  {isEn ? 'Ready to transform?' : 'Prêt à transformer ?'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-white leading-tight mb-4" style={{ textAlign: 'justify' }}>
                {isEn
                  ? 'Let\'s build your transformation strategy together'
                  : 'Construisons ensemble votre stratégie de transformation'}
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)', textAlign: 'justify' }}>
                {isEn
                  ? 'Our experts are ready to analyze your context and design a tailor-made strategic roadmap to accelerate your impact in Africa.'
                  : 'Nos experts sont prêts à analyser votre contexte et concevoir une feuille de route stratégique sur mesure pour accélérer votre impact en Afrique.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#06111e' }}
                >
                  <i className="ri-calendar-line" />
                  {isEn ? 'Book a consultation' : 'Prendre rendez-vous'}
                </Link>
                <Link
                  to="/services/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
                >
                  <i className="ri-arrow-right-line" />
                  {isEn ? 'Discover services' : 'Découvrir les services'}
                </Link>
                <BrochureDownloadButton
                  variant="secondary"
                  size="md"
                  lang={isEn ? 'en' : undefined}
                  source="footer_cta"
                >
                  <i className="ri-file-download-line" />
                  {isEn ? 'Download brochure' : 'Télécharger la brochure'}
                </BrochureDownloadButton>
              </div>
            </div>

            {/* Droite : Stats + Newsletter */}
            <div className="space-y-6">
              {/* Micro stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '20+', label: isEn ? 'Years of expertise' : 'Ans d\'expertise' },
                  { value: '600+', label: isEn ? 'Organizations supported' : 'Organisations accompagnées' },
                  { value: '20+', label: isEn ? 'African countries' : 'Pays africains' },
                ].map((s, i) => (
                  <div key={i} className="text-center py-4 px-3 rounded-xl" style={{ background: 'rgba(212,168,42,0.07)', border: '1px solid rgba(212,168,42,0.15)' }}>
                    <div className="font-playfair text-2xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #86BC25, #c8e290)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                    <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Newsletter inline */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,42,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-mail-send-line text-sm" style={{ color: '#86BC25' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#86BC25' }}>
                    {isEn ? 'Strategic newsletter' : 'Newsletter stratégique'}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.45)', textAlign: 'justify' }}>
                  {isEn
                    ? 'Governance, compliance, digital transformation — our best insights, every month.'
                    : 'Gouvernance, conformité, transformation digitale — nos meilleures analyses, chaque mois.'}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2" data-readdy-form>
                  <label htmlFor="footer-email" className="sr-only">{isEn ? 'Your email' : 'Votre email'}</label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isEn ? 'your@email.com' : 'votre@email.com'}
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-3 py-2.5 rounded-lg text-xs focus:outline-none transition-all disabled:opacity-50"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(212,168,42,0.25)', color: '#fff' }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="px-4 py-2.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#06111e' }}
                  >
                    {isSubmitting ? (
                      <i className="ri-loader-4-line animate-spin" />
                    ) : submitStatus === 'success' ? (
                      <><i className="ri-check-line" />{isEn ? 'Done!' : 'Ok !'}</>
                    ) : (
                      <><i className="ri-send-plane-line" />{isEn ? 'Subscribe' : "S'inscrire"}</>
                    )}
                  </button>
                </form>
                {submitStatus === 'error' && (
                  <p className="mt-2 text-xs" style={{ color: '#f87171' }}>{isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          LIENS PRINCIPAUX
      ============================================================ */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

            {/* Colonne Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png"
                  alt="KHEPRA EXPERTS"
                  className="h-10 w-10 object-contain"
                  width="40"
                  height="40"
                />
                <div>
                  <span className="block font-playfair text-lg font-bold text-white tracking-wide">KHEPRA</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>EXPERTS</span>
                </div>
              </div>
              <div className="w-10 h-0.5 mb-5 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'justify' }}>
                {isEn
                  ? 'Strategic advisory firm specialized in governance, financial audit and digital transformation across Africa. Over 20 years of impact, 600+ organizations supported.'
                  : 'Cabinet de conseil stratégique spécialisé en gouvernance, audit financier et transformation digitale en Afrique. Plus de 20 ans d\'impact, 600+ organisations accompagnées.'}
              </p>

              {/* Coordonnées */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: 'rgba(212,168,42,0.12)' }}>
                    <i className="ri-map-pin-2-line text-xs" style={{ color: '#86BC25' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white mb-0.5">{isEn ? 'Headquarters' : 'Siège social'}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)</div>
                  </div>
                </div>
                <a
                  href="mailto:contact@khepraexperts.com"
                  className="flex items-start gap-2.5 group cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 transition-all duration-300" style={{ background: 'rgba(212,168,42,0.12)' }}>
                    <i className="ri-mail-line text-xs" style={{ color: '#86BC25' }} />
                  </div>
                  <div className="text-xs transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#86BC25')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    contact@khepraexperts.com
                  </div>
                </a>
                <a
                  href="https://wa.me/22893984909"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-start gap-2.5 group cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: 'rgba(212,168,42,0.12)' }}>
                    <i className="ri-whatsapp-line text-xs" style={{ color: '#86BC25' }} />
                  </div>
                  <div className="text-xs transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#86BC25')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    +228 93 98 49 09
                  </div>
                </a>
              </div>
              
              {/* Legal credentials */}
              <div className="mb-6 pt-4" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {isEn ? 'Legal credentials' : 'Immatriculation'}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <i className="ri-building-2-line text-[10px] mt-0.5" style={{ color: '#86BC25' }} />
                    <span className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>SARL U · RCCM TG-LFW-01-2026-B13-01347</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-government-line text-[10px] mt-0.5" style={{ color: '#86BC25' }} />
                    <span className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>NIF 1002124216 · Régime RÉEL</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer"
                  style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.2)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,168,42,0.28)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,168,42,0.12)')}
                  title="LinkedIn"
                >
                  <i className="ri-linkedin-fill" style={{ color: '#86BC25' }} />
                </a>
                <a
                  href="https://wa.me/22893984909"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer"
                  style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.2)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,168,42,0.28)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,168,42,0.12)')}
                  title="WhatsApp"
                >
                  <i className="ri-whatsapp-line" style={{ color: '#86BC25' }} />
                </a>
              </div>
            </div>

            {/* 4 Business Units */}
            {fourBUs.map((bu, idx) => (
              <nav key={bu.id} className="lg:col-span-2" aria-label={bu.title}>
                {idx === 0 && (
                  <div className="flex items-center gap-2 mb-5 -mt-1">
                    <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                    <h4 className="font-playfair text-sm font-bold text-white">{isEn ? '4 Business Units' : '4 Business Units'}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(134,188,37,0.15)', color: '#86BC25' }}>Standards Internationaux</span>
                  </div>
                )}
                {idx !== 0 && <div className="mb-5" />}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                  <h4 className="font-playfair text-sm font-bold text-white">{bu.title}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(134,188,37,0.15)', color: '#86BC25' }}>
                    BU{idx + 1}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{bu.subtitle}</p>
                <ul className="space-y-2">
                  <li key="main">
                    <Link
                      to={bu.href}
                      className="block p-3 rounded-lg transition-all duration-200 cursor-pointer group"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(134,188,37,0.08)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(134,188,37,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(134,188,37,0.25)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(134,188,37,0.08)';
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: 'rgba(134,188,37,0.12)' }}>
                          <i className={`${bu.icon} text-xs`} style={{ color: '#86BC25' }} />
                        </div>
                        <span className="text-xs font-bold text-white group-hover:underline">{bu.title}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold" style={{ color: '#86BC25' }}>{bu.metric}</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{bu.metricLabel}</span>
                      </div>
                    </Link>
                  </li>
                  {bu.items.map((item: any, ii: number) => (
                    <li key={ii}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-all duration-200 cursor-pointer group"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#86BC25';
                          e.currentTarget.style.background = 'rgba(134,188,37,0.07)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <i className="ri-arrow-right-s-line text-xs flex-shrink-0 opacity-60 group-hover:opacity-100" style={{ color: '#86BC25' }} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-deloitte-500/20 text-deloitte-400">{item.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Médias + Formations + Ressources + Solutions */}
            <div className="lg:col-span-2 space-y-5">
              {/* Médias */}
              <nav aria-label="Médias">
                <h4 className="font-playfair text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                  {isEn ? 'Media' : 'Médias'}
                </h4>
                <ul className="space-y-0.5">
                  {insights.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-all duration-200 cursor-pointer group"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#86BC25';
                          e.currentTarget.style.background = 'rgba(212,168,42,0.07)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <i className={`${item.icon} text-xs flex-shrink-0 opacity-60 group-hover:opacity-100`} style={{ color: '#86BC25' }} />
                        <span>{item.label}</span>
                        {'badge' in item && (item as any).badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-deloitte-500/20 text-deloitte-400">{(item as any).badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Formations — Désactivé temporairement
              <div className="pt-3" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                <Link to="/formations/" className="flex items-center gap-2 mb-2 group cursor-pointer">
                  <h5 className="text-xs font-semibold uppercase tracking-wider group-hover:text-deloitte-400 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {isEn ? 'Training' : 'Formations'}
                  </h5>
                  <i className="ri-arrow-right-line text-xs" style={{ color: '#86BC25' }} />
                </Link>
              </div>
              */}

              {/* Ressources & Outils */}
              <nav className="pt-3" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                <h4 className="font-playfair text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                  {isEn ? 'Resources' : 'Ressources'}
                </h4>
                <ul className="space-y-0.5">
                  {[
                    { label: isEn ? 'Diagnostics (26 offerts)' : 'Diagnostics (26 offerts)', href: '/tools/', icon: 'ri-tools-line', badge: 'Offert' },
                    { label: isEn ? 'Compliance Score' : 'Score de Conformité', href: '/compliance-score/', icon: 'ri-bar-chart-2-line', badge: 'NEW' },
                    { label: isEn ? 'Digital Compliance Factory' : 'Digital Compliance Factory', href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', badge: 'NEW' },
                    { label: 'Khepra Business Review', href: '/khepra-business-review/', icon: 'ri-book-2-line' },
                    { label: isEn ? 'Case Studies' : 'Études de cas', href: '/case-studies/', icon: 'ri-briefcase-line' },
                    { label: isEn ? 'Guides & Reports' : 'Guides & Rapports', href: '/resources/', icon: 'ri-folder-download-line' },
                    { label: isEn ? 'Digital Strategy' : 'Stratégie Digitale', href: '/strategie-digitale/', icon: 'ri-mac-line' },
                    { label: isEn ? 'Academic Partnerships' : 'Partenariats Académiques', href: '/partenariats-academiques/', icon: 'ri-service-line', badge: 'NEW' },
                    { label: isEn ? 'Quarterly Dashboard' : 'Tableau de Suivi Trimestriel', href: '/tableau-de-suivi-trimestriel/', icon: 'ri-dashboard-line', badge: 'NEW' },
                    { label: isEn ? 'RAG Synthesis' : 'Synthèse RAG', href: '/rag-synthese/', icon: 'ri-brain-line' },
                  ].map((item: any, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-all duration-200 cursor-pointer group"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#86BC25';
                          e.currentTarget.style.background = 'rgba(212,168,42,0.07)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <i className={`${item.icon} text-xs flex-shrink-0 opacity-60 group-hover:opacity-100`} style={{ color: '#86BC25' }} />
                        <span>{item.label}</span>
                        {item.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-deloitte-500/20 text-deloitte-400">{item.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Solutions */}
              <nav className="pt-3" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                <h4 className="font-playfair text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                  {isEn ? 'Solutions' : 'Solutions'}
                </h4>
                <ul className="space-y-0.5">
                  {[
                    { label: isEn ? 'Decision Makers' : 'Décideurs', href: '/decideurs/', icon: 'ri-user-settings-line' },
                    { label: isEn ? 'Investors' : 'Investisseurs', href: '/investisseurs/', icon: 'ri-funds-line' },
                    { label: isEn ? 'Industrial Projects' : 'Projets Industriels', href: '/projets-industriels/', icon: 'ri-building-2-line' },
                    { label: isEn ? 'Africa Licensing' : 'Agréments Afrique', href: '/agrements-afrique/', icon: 'ri-shield-check-line', badge: 'NEW' },
                    { label: isEn ? 'Commercial Offer' : 'Offre Commerciale', href: '/offre-commerciale/', icon: 'ri-file-text-line' },
                    { label: isEn ? 'Flash Diagnostic (Offered)' : 'Diagnostic Flash (Offert)', href: '/diagnostic-flash/', icon: 'ri-flashlight-line', badge: 'Offert' },
                    { label: isEn ? 'Board Report (Offered)' : 'Rapport CA (Offert)', href: '/board-report/', icon: 'ri-file-chart-line', badge: 'Offert' },
                  ].map((item: any, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-all duration-200 cursor-pointer group"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#86BC25';
                          e.currentTarget.style.background = 'rgba(212,168,42,0.07)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <i className={`${item.icon} text-xs flex-shrink-0 opacity-60 group-hover:opacity-100`} style={{ color: '#86BC25' }} />
                        <span>{item.label}</span>
                        {item.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-deloitte-500/20 text-deloitte-400">{item.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Entreprise — liens rapides */}
              <nav aria-label={isEn ? 'Company' : 'Entreprise'} className="pt-3" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                <h4 className="font-playfair text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background: '#86BC25' }} />
                  {isEn ? 'Company' : 'Entreprise'}
                </h4>
                <ul className="space-y-0.5">
                  {[
                    { label: isEn ? 'About' : 'À propos', href: '/about/', icon: 'ri-information-line' },
                    { label: isEn ? 'Why KHEPRA' : 'Pourquoi KHEPRA', href: '/pourquoi-khepra/', icon: 'ri-lightbulb-flash-line' },
                    { label: isEn ? 'Team' : 'Équipe', href: '/equipe/', icon: 'ri-team-line' },
                    { label: isEn ? 'Partners' : 'Partenaires', href: '/partenaires/', icon: 'ri-links-line' },
                    { label: isEn ? 'Careers' : 'Carrières', href: '/careers/', icon: 'ri-briefcase-4-line' },
                    { label: isEn ? 'Contact' : 'Contact', href: '/contact/', icon: 'ri-mail-send-line' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-all duration-200 cursor-pointer group"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#86BC25';
                          e.currentTarget.style.background = 'rgba(212,168,42,0.07)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <i className={`${item.icon} text-xs flex-shrink-0 opacity-60 group-hover:opacity-100`} style={{ color: '#86BC25' }} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Certifications */}
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
                  <h5 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {isEn ? 'Regulatory expertise' : 'Expertise réglementaire'}
                  </h5>
                  <div className="space-y-1.5">
                    {[
                      { icon: 'ri-bank-line', label: isEn ? 'BCEAO / SG-CB-UMOA' : 'BCEAO / SG-CB-UMOA' },
                      { icon: 'ri-shield-check-line', label: isEn ? 'COBAC · BEAC · OHADA' : 'COBAC · BEAC · OHADA' },
                      { icon: 'ri-bar-chart-grouped-line', label: isEn ? 'CEMAC · UEMOA' : 'CEMAC · UEMOA' },
                      { icon: 'ri-bar-chart-line', label: isEn ? 'COSO · CAMELS' : 'COSO · CAMELS' },
                      { icon: 'ri-leaf-line', label: isEn ? 'IFC Performance Standards' : 'Normes IFC Performance' },
                    ].map((ref, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <i className={`${ref.icon} text-xs`} style={{ color: '#86BC25' }} />
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{ref.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BARRE BASSE — Copyright + Liens Conformité Google
      ============================================================ */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(212,168,42,0.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Barre de conformité Google — liens absolus obligatoires */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(212,168,42,0.08)' }}>
            <a
              href="https://khepraexperts.com/"
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              style={{ color: '#86BC25', background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.16)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.08)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.2)'; }}
            >
              <i className="ri-home-4-line text-sm" />
              {isEn ? 'Home' : 'Page d\'accueil'}
            </a>
            <a
              href="https://khepraexperts.com/privacy/"
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              style={{ color: '#86BC25', background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.16)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.08)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.2)'; }}
            >
              <i className="ri-shield-check-line text-sm" />
              {isEn ? 'Privacy Policy' : 'Politique de Confidentialité'}
            </a>
            <a
              href="https://khepraexperts.com/cgu/"
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              style={{ color: '#86BC25', background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.16)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.08)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.2)'; }}
            >
              <i className="ri-file-text-line text-sm" />
              {isEn ? 'Terms of Service' : 'Conditions d\'Utilisation'}
            </a>
            <a
              href="https://khepraexperts.com/contact/"
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              style={{ color: '#86BC25', background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.16)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(134,188,37,0.08)'; e.currentTarget.style.borderColor = 'rgba(134,188,37,0.2)'; }}
            >
              <i className="ri-mail-send-line text-sm" />
              {isEn ? 'Contact' : 'Contact'}
            </a>
          </div>
          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {new Date().getFullYear()} KHEPRA EXPERTS.{' '}
              {isEn ? 'All rights reserved. Strategic advisory for Africa.' : 'Tous droits réservés. Conseil stratégique pour l\'Afrique.'}
            </p>
            <div className="flex items-center gap-4">
              <LanguageSwitcherFooter />
              <nav className="flex flex-wrap items-center justify-center gap-1" aria-label={isEn ? 'Legal' : 'Légal'}>
              {[
                { label: isEn ? 'Privacy' : 'Confidentialité', href: '/privacy/' },
                { label: isEn ? 'Legal Notice' : 'Mentions légales', href: '/legal/' },
                { label: isEn ? 'Terms of Service' : 'CGU', href: '/cgu/' },
                { label: isEn ? 'Cookies' : 'Cookies', href: '/cookies/' },
                { label: isEn ? 'Security' : 'Sécurité', href: '/securite-conformite/' },
                { label: isEn ? 'Code of Ethics' : 'Charte déontologique', href: '/charte-deontologique/' },
                { label: isEn ? 'DPO / Data' : 'DPO / Registre', href: '/registre-traitements/' },
                { label: isEn ? 'Sitemap' : 'Plan du site', href: '/sitemap/' },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>}
                  <Link
                    to={item.href}
                    className="text-xs px-2 py-1 rounded transition-colors duration-200 cursor-pointer whitespace-nowrap"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#86BC25')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>
            </div>
          </div>
        </div>
      </div>
      <CommunityReviewBanner />
    </footer>
  );
}

export default Footer;




