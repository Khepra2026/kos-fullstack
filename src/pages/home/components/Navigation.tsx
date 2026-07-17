/* ============================================================
   KOS — Intelligence Réglementaire Afrique Francophone
   Navigation v5.0 — 4 Domaines d'Expertise (Juin 2026)
   Alignement institutionnel — Standards Internationaux
   ZÉRO prix, ZÉRO SaaS, ZÉRO métriques financières
   ============================================================ */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { usePipelineLiveCount } from '@/hooks/usePipelineLiveCount';
import GlobalSearch from '@/components/feature/GlobalSearch';

// ── Données des menus ──

const ABOUT_ITEMS = {
  id: 'about',
  labelFr: 'À propos',
  labelEn: 'About',
  icon: 'ri-information-line',
  descriptionFr: '22 ans d\'expertise · 600+ organisations · 20+ pays',
  descriptionEn: '22 years of expertise · 600+ organizations · 20+ countries',
  sections: [
    {
      titleFr: 'Le Cabinet',
      titleEn: 'The Firm',
      items: [
        { labelFr: 'Notre histoire', labelEn: 'Our Story', href: '/about/', icon: 'ri-building-2-line' },
        { labelFr: 'Pourquoi KHEPRA', labelEn: 'Why KHEPRA', href: '/pourquoi-khepra/', icon: 'ri-lightbulb-flash-line' },
        { labelFr: 'Notre approche', labelEn: 'Our Approach', href: '/approche/', icon: 'ri-compass-3-line' },
        { labelFr: 'Nos expertises', labelEn: 'Our Expertise', href: '/expertises/', icon: 'ri-award-line' },
      ],
    },
    {
      titleFr: 'Équipe & Carrières',
      titleEn: 'Team & Careers',
      items: [
        { labelFr: 'Notre équipe', labelEn: 'Our Team', href: '/equipe/', icon: 'ri-team-line' },
        { labelFr: 'Experts associés', labelEn: 'Associated Experts', href: '/experts/', icon: 'ri-user-star-line' },
        { labelFr: 'Partenaires', labelEn: 'Partners', href: '/partenaires/', icon: 'ri-links-line' },
        { labelFr: 'Carrières', labelEn: 'Careers', href: '/careers/', icon: 'ri-briefcase-4-line' },
      ],
    },
    {
      titleFr: 'Gouvernance',
      titleEn: 'Governance',
      items: [
        { labelFr: 'Charte déontologique', labelEn: 'Code of Ethics', href: '/charte-deontologique/', icon: 'ri-scales-line' },
        { labelFr: 'Sécurité & Conformité', labelEn: 'Security & Compliance', href: '/securite-conformite/', icon: 'ri-shield-check-line' },
      ],
    },
  ],
};

const BU1_INTELLIGENCE = {
  id: 'bu1-financial-regulation',
  labelFr: 'BU1 — Régulation Financière & Conformité',
  labelEn: 'BU1 — Financial Regulation & Compliance',
  icon: 'ri-shield-check-line',
  accent: '#D4AF37',
  metric: '137+',
  metricLabelFr: 'textes réglementaires couverts',
  metricLabelEn: 'regulatory texts covered',
  descriptionFr: 'Bouclier Réglementaire — BCEAO, COBAC, GABAC, GAFI, OHADA',
  descriptionEn: 'Regulatory Shield — BCEAO, COBAC, GABAC, GAFI, OHADA',
  href: '/kos-bu1-financial-regulation/',
  products: [
    { labelFr: 'Inspection Readiness — BCEAO/COBAC', labelEn: 'Inspection Readiness — BCEAO/COBAC', href: '/kos-bu1-financial-regulation/', icon: 'ri-stethoscope-line', badge: 'Priorité' },
    { labelFr: 'Conformité LBC/FT — GAFI', labelEn: 'AML/CFT Compliance — GAFI', href: '/kos-bu1-financial-regulation/', icon: 'ri-fingerprint-line' },
    { labelFr: 'Agrément & Licensing', labelEn: 'Licensing & Accreditation', href: '/kos-bu1-financial-regulation/', icon: 'ri-shield-star-line' },
    { labelFr: 'Veille Réglementaire 24/7', labelEn: '24/7 Regulatory Watch', href: '/kos-bu1-financial-regulation/', icon: 'ri-radar-line' },
  ],
};

const BU2_DUE_DILIGENCE = {
  id: 'bu2-governance-due-diligence',
  labelFr: 'BU2 — Gouvernance & Due Diligence',
  labelEn: 'BU2 — Governance & Due Diligence',
  icon: 'ri-government-line',
  accent: '#86BC25',
  metric: '200+',
  metricLabelFr: 'missions réalisées',
  metricLabelEn: 'missions completed',
  descriptionFr: 'Observatoire de la Gouvernance — Performance Boards, Due Diligence Investisseur, Conseil CA',
  descriptionEn: 'Governance Observatory — Board Performance, Investor Due Diligence, Board Advisory',
  href: '/kos-bu2-governance-due-diligence/',
  products: [
    { labelFr: 'Due Diligence — Full Scope', labelEn: 'Due Diligence — Full Scope', href: '/kos-bu2-governance-due-diligence/', icon: 'ri-search-eye-line', badge: 'Premium' },
    { labelFr: 'Board Advisory — Conseil CA', labelEn: 'Board Advisory', href: '/kos-bu2-governance-due-diligence/', icon: 'ri-user-star-line' },
    { labelFr: 'Audit Gouvernance — 7 Piliers', labelEn: 'Governance Audit — 7 Pillars', href: '/kos-bu2-governance-due-diligence/', icon: 'ri-file-chart-line' },
    { labelFr: 'KOS Investability Score™', labelEn: 'KOS Investability Score™', href: '/kos-bu2-governance-due-diligence/', icon: 'ri-star-line', badge: 'Score' },
  ],
};

const BU3_REGTECH = {
  id: 'bu3-climate-esg',
  labelFr: 'BU3 — Climat, Transition & ESG',
  labelEn: 'BU3 — Climate, Transition & ESG',
  icon: 'ri-leaf-line',
  accent: '#2E8B57',
  metric: '3',
  metricLabelFr: 'standards maîtrisés (ISSB/GRI/CSRD)',
  metricLabelEn: 'standards mastered (ISSB/GRI/CSRD)',
  descriptionFr: 'Ingénierie de Décarbonation — Bilan carbone, stratégie ESG, financements verts',
  descriptionEn: 'Decarbonation Engineering — Carbon footprint, ESG strategy, green finance',
  href: '/kos-bu3-climate-esg/',
  products: [
    { labelFr: 'Bilan Carbone — Scope 1-2-3', labelEn: 'Carbon Footprint — Scope 1-2-3', href: '/kos-bu3-climate-esg/', icon: 'ri-bar-chart-box-line', badge: 'CSRD' },
    { labelFr: 'Stratégie ESG — ISSB/GRI', labelEn: 'ESG Strategy — ISSB/GRI', href: '/kos-bu3-climate-esg/', icon: 'ri-file-list-3-line' },
    { labelFr: 'Financements Verts — FVC/GCF', labelEn: 'Green Finance — GCF/GEF', href: '/kos-bu3-climate-esg/', icon: 'ri-funds-line' },
    { labelFr: 'Diagnostic ESG — Maturité', labelEn: 'ESG Diagnostic — Maturity', href: '/kos-bu3-climate-esg/', icon: 'ri-stethoscope-line', badge: 'Offert' },
  ],
};

const BU4_OBSERVATORY = {
  id: 'bu4-kbr-model',
  labelFr: 'BU4 — KBR-Model & Intelligence d\'Affaires',
  labelEn: 'BU4 — KBR-Model & Business Intelligence',
  icon: 'ri-line-chart-line',
  accent: '#c9a227',
  metric: '3',
  metricLabelFr: 'niveaux KBR (L1/L2/L3)',
  metricLabelEn: 'KBR levels (L1/L2/L3)',
  descriptionFr: 'Monétisation PI — Études sectorielles, monographies, rapports High-Ticket',
  descriptionEn: 'IP Monetization — Sector studies, monographs, High-Ticket reports',
  href: '/kos-bu4-kbr-model/',
  products: [
    { labelFr: 'Études Sectorielles Premium', labelEn: 'Premium Sector Studies', href: '/kos-bu4-kbr-model/', icon: 'ri-book-open-line', badge: 'L1' },
    { labelFr: 'Monographies — Articles Premium', labelEn: 'Monographs — Premium Articles', href: '/kos-bu4-kbr-model/', icon: 'ri-article-line', badge: 'L2' },
    { labelFr: 'Rapports High-Ticket', labelEn: 'High-Ticket Reports', href: '/kos-bu4-kbr-model/', icon: 'ri-file-chart-line', badge: 'L3' },
    { labelFr: 'KBR Intelligence — Sample', labelEn: 'KBR Intelligence — Sample', href: '/kos-bu4-kbr-model/', icon: 'ri-download-line', badge: 'Offert' },
  ],
};

const SOLUTIONS_ITEMS = [
  { labelFr: 'Décideurs', labelEn: 'Decision Makers', href: '/decideurs/', icon: 'ri-user-settings-line', descFr: 'Pour dirigeants & COMEX', descEn: 'For executives & board' },
  { labelFr: 'Investisseurs', labelEn: 'Investors', href: '/investisseurs/', icon: 'ri-funds-line', descFr: 'Due diligence & levée de fonds', descEn: 'Due diligence & fundraising' },
  { labelFr: 'Projets Industriels', labelEn: 'Industrial Projects', href: '/projets-industriels/', icon: 'ri-building-2-line', descFr: 'Ingénierie financière', descEn: 'Financial engineering' },
  { labelFr: 'Offre Commerciale', labelEn: 'Commercial Offer', href: '/offre-commerciale/', icon: 'ri-file-text-line', descFr: 'Packages & missions', descEn: 'Packages & missions' },
  { labelFr: 'SFD & Microfinance', labelEn: 'SFD & Microfinance', href: '/sfd-conformite/', icon: 'ri-bank-line', descFr: 'Conformité SFD UEMOA', descEn: 'SFD Compliance UEMOA' },
  { labelFr: 'Agréments Afrique', labelEn: 'Africa Licensing', href: '/agrements-afrique/', icon: 'ri-shield-check-line', descFr: '6 types d\'agrément, guides complets', descEn: '6 licensing types, complete guides', badge: 'NEW' },
  { labelFr: 'Diagnostic Flash', labelEn: 'Flash Diagnostic', href: '/diagnostic-flash/', icon: 'ri-flashlight-line', descFr: 'Offert, 30 minutes', descEn: 'Offered, 30 minutes', badge: 'Offert' },
  { labelFr: 'Rapport CA', labelEn: 'Board Report', href: '/board-report/', icon: 'ri-file-chart-line', descFr: 'Offert pour votre CA', descEn: 'Offered for your board', badge: 'Offert' },
];

const MEDIA_ITEMS = [
  { labelFr: 'Blog', labelEn: 'Blog', href: '/blog/', icon: 'ri-quill-pen-line', descFr: 'Analyses & articles', descEn: 'Analysis & articles' },
  { labelFr: 'Insights Hub', labelEn: 'Insights Hub', href: '/insights/', icon: 'ri-lightbulb-flash-line', descFr: 'Veille stratégique', descEn: 'Strategic watch' },
  { labelFr: 'Chat Réglementaire IA', labelEn: 'Regulatory Chat AI', href: '/kos-regulatory-chat/', icon: 'ri-scales-3-line', descFr: 'BCEAO, COBAC, CIMA — IA conversationnelle', descEn: 'BCEAO, COBAC, CIMA — Conversational AI', badge: 'NEW' },
  { labelFr: 'Publications', labelEn: 'Publications', href: '/publications/', icon: 'ri-book-open-line', descFr: 'Rapports & études', descEn: 'Reports & studies' },
  { labelFr: 'Webinaires', labelEn: 'Webinars', href: '/webinars/', icon: 'ri-live-line', descFr: 'Formations en ligne', descEn: 'Online training' },
  { labelFr: 'KBR-Model — Intelligence d\'Affaires', labelEn: 'KBR-Model — Business Intelligence', href: '/kos-bu4-kbr-model/', icon: 'ri-line-chart-line', descFr: 'Études sectorielles & monographies', descEn: 'Sector studies & monographs', badge: 'BU4' },
  { labelFr: 'Observatoire Réglementaire Africain', labelEn: 'African Regulatory Observatory', href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', descFr: '8 régulateurs, 1247 textes', descEn: '8 regulators, 1247 texts', badge: 'NEW' },
  { labelFr: 'Observatoires Sectoriels', labelEn: 'Sector Observatories', href: '/observatoires-sectoriels/', icon: 'ri-pie-chart-line', descFr: '7 secteurs, 21 indices KOS™', descEn: '7 sectors, 21 KOS™ indices', badge: 'NEW' },
  { labelFr: 'Baromètre BCEAO 2026', labelEn: 'BCEAO Barometer 2026', href: '/barometre-bceao-2026/', icon: 'ri-bar-chart-line', descFr: 'Étude exclusive', descEn: 'Exclusive study', badge: 'NEW' },
  { labelFr: 'Baromètre CEMAC 2026', labelEn: 'CEMAC Barometer 2026', href: '/barometre-cemac-2026/', icon: 'ri-bar-chart-grouped-line', descFr: 'Afrique Centrale', descEn: 'Central Africa', badge: 'NEW' },
];

const RESOURCES_ITEMS = [
  { labelFr: 'Outils & Diagnostics', labelEn: 'Tools & Diagnostics', href: '/tools/', icon: 'ri-tools-line', descFr: '26 diagnostics offerts', descEn: '26 offered diagnostics', badge: 'Offert' },
  { labelFr: 'Khepra Business Review', labelEn: 'Khepra Business Review', href: '/khepra-business-review/', icon: 'ri-book-2-line', descFr: 'Analyses qualité', descEn: 'Quality analysis' },
  { labelFr: 'Études de cas', labelEn: 'Case Studies', href: '/case-studies/', icon: 'ri-briefcase-line', descFr: 'Réalisations terrain', descEn: 'Field achievements' },
  { labelFr: 'Ressources', labelEn: 'Resources', href: '/resources/', icon: 'ri-folder-download-line', descFr: 'Guides & rapports', descEn: 'Guides & reports' },
  { labelFr: 'Stratégie Digitale', labelEn: 'Digital Strategy', href: '/strategie-digitale/', icon: 'ri-mac-line', descFr: 'SEO, contenu, branding', descEn: 'SEO, content, branding' },
  { labelFr: 'Digital Compliance Factory', labelEn: 'Digital Compliance Factory', href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', descFr: '78 documents, 6 catégories', descEn: '78 documents, 6 categories', badge: 'NEW' },
  { labelFr: '12 Analyses Stratégiques', labelEn: '12 Strategic Analyses', href: '/kos-ultra-lead-magnets/', icon: 'ri-file-chart-line', descFr: 'Mises à disposition des institutions', descEn: 'Available for institutions', badge: 'NEW' },
  { labelFr: 'Partenariats Académiques', labelEn: 'Academic Partnerships', href: '/partenariats-academiques/', icon: 'ri-service-line', descFr: 'Backlinks & collaborations', descEn: 'Backlinks & collaborations', badge: 'NEW' },
  { labelFr: 'Tableau de Suivi Trimestriel', labelEn: 'Quarterly Tracking Dashboard', href: '/tableau-de-suivi-trimestriel/', icon: 'ri-dashboard-line', descFr: 'KPI autorité digitale, SEO, IA', descEn: 'Digital authority, SEO, AI KPIs', badge: 'NEW' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [navTop, setNavTop] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const isHomePage = location.pathname === '/';

  const openDropdown = useCallback((name: string) => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setActiveDropdown(name);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => { setActiveDropdown(null); closeTimerRef.current = null; }, 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
  }, []);

  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

  const handleExpertClick = () => { setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('open-expert-modal')); };

  const measureBannersHeight = useCallback(() => {
    let total = 0;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) total += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) total += regAlert.offsetHeight;
    return total;
  }, []);

  const updateNavPosition = useCallback(() => {
    const bannersH = measureBannersHeight();
    setNavTop(bannersH);
    const navH = navRef.current?.offsetHeight || 80;
    const safetyMargin = 24;
    const totalOffset = bannersH + navH + safetyMargin;
    document.documentElement.style.scrollPaddingTop = `${totalOffset}px`;
    document.querySelectorAll<HTMLElement>('section[id], div[id]').forEach(el => {
      el.style.scrollMarginTop = `${totalOffset}px`;
    });
  }, [measureBannersHeight]);

  useEffect(() => {
    updateNavPosition();
    const domObserver = new MutationObserver(() => { updateNavPosition(); });
    domObserver.observe(document.body, { childList: true, subtree: false });
    const resizeObserver = new ResizeObserver(() => { updateNavPosition(); });
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (topBanner) resizeObserver.observe(topBanner);
    if (regAlert) resizeObserver.observe(regAlert);
    window.addEventListener('resize', updateNavPosition, { passive: true });
    return () => { domObserver.disconnect(); resizeObserver.disconnect(); window.removeEventListener('resize', updateNavPosition); };
  }, [updateNavPosition]);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => { setIsScrolled(window.scrollY > 50); });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener('scroll', handleScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); setActiveDropdown(null); setMobileExpandedMenu(null); }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (isMobileMenuOpen) setIsMobileMenuOpen(false); if (activeDropdown) setActiveDropdown(null); } };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, activeDropdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(true); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname.startsWith('/about') || location.pathname.startsWith('/pourquoi-khepra') || location.pathname.startsWith('/approche') || location.pathname.startsWith('/expertises') || location.pathname.startsWith('/equipe') || location.pathname.startsWith('/experts') || location.pathname.startsWith('/partenaires') || location.pathname.startsWith('/careers');
  const isBU1Active = location.pathname.startsWith('/kos-bu1-financial-regulation');
  const isBU2Active = location.pathname.startsWith('/kos-bu2-governance-due-diligence');
  const isBU3Active = location.pathname.startsWith('/kos-bu3-climate-esg');
  const isBU4Active = location.pathname.startsWith('/kos-bu4-kbr-model');
  const isBUSActive = isBU1Active || isBU2Active || isBU3Active || isBU4Active || location.pathname.startsWith('/services') || location.pathname.startsWith('/sfd-conformite') || location.pathname.startsWith('/regulation-financiere') || location.pathname.startsWith('/prix-de-transfert') || location.pathname.startsWith('/gouvernance-risques') || location.pathname.startsWith('/gouvernance-ohada') || location.pathname.startsWith('/inspection-cobac') || location.pathname.startsWith('/conformite-cemac') || location.pathname.startsWith('/agrement-beac') || location.pathname.startsWith('/agrements-afrique') || location.pathname.startsWith('/conformite-gabac') || location.pathname.startsWith('/offre-commerciale');
  const isSolutionsActive = location.pathname.startsWith('/decideurs') || location.pathname.startsWith('/investisseurs') || location.pathname.startsWith('/projets-industriels') || location.pathname.startsWith('/offre-commerciale') || location.pathname.startsWith('/diagnostic-flash') || location.pathname.startsWith('/board-report') || location.pathname.startsWith('/agrements-afrique') || location.pathname === '/solutions';
  const isMediaActive = location.pathname.startsWith('/blog') || location.pathname.startsWith('/insights') || location.pathname.startsWith('/publications') || location.pathname.startsWith('/webinars') || location.pathname.startsWith('/think-tank') || location.pathname.startsWith('/barometre') || location.pathname.startsWith('/observatoire-reglementaire-africain') || location.pathname.startsWith('/observatoires-sectoriels');
  const isResourcesActive = location.pathname.startsWith('/tools') || location.pathname.startsWith('/khepra-business-review') || location.pathname.startsWith('/whitepapers') || location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/resources') || location.pathname.startsWith('/strategie-digitale') || location.pathname.startsWith('/kos-ultra-lead-magnets') || location.pathname.startsWith('/digital-compliance-factory') || location.pathname.startsWith('/partenariats-academiques') || location.pathname.startsWith('/tableau-de-suivi-trimestriel');
  const isContactActive = location.pathname === '/contact';

  const isLightNav = isHomePage || isScrolled;
  const isDarkNav = !isHomePage && !isScrolled;

  const { count: pipelineLiveCount } = usePipelineLiveCount();
  const hasLivePipelines = pipelineLiveCount > 0;

  const toggleMobileMenu = (menu: string) => { setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu); };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-deloitte-500 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg">
        {currentLanguage === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, pointerEvents: 'none', userSelect: 'none', background: 'rgba(209,213,219,0.5)' }}>
        <div id="nav-scroll-progress" style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg, #86BC25, #a5d936)', pointerEvents: 'none', transition: 'width 0.2s ease' }} />
      </div>
      <ScrollProgressUpdater />

      <nav ref={navRef} className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isLightNav ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-brand-900/90 backdrop-blur-md'}`} style={{ top: `${navTop}px` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 focus-visible:ring-offset-2 rounded-lg p-1 transition-all duration-300 hover:scale-105 group" aria-label={currentLanguage === 'fr' ? "Retour à l'accueil KHEPRA EXPERTS" : 'Back to KHEPRA EXPERTS home'}>
              <div className="relative flex-shrink-0">
                <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png" alt="KHEPRA EXPERTS Logo" className="h-12 w-12 object-contain rounded-full transition-transform duration-300 group-hover:rotate-12" width="48" height="48" />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display text-lg font-bold tracking-wide transition-all duration-300 ${isLightNav ? 'text-brand-900' : 'text-white'}`} style={isDarkNav ? { textShadow: '0 1px 6px rgba(0,0,0,0.7)' } : {}}>KHEPRA</span>
                <span className={`text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${isLightNav ? 'text-deloitte-600' : 'text-deloitte-300'}`} style={isDarkNav ? { textShadow: '0 1px 6px rgba(0,0,0,0.7)' } : {}}>EXPERTS</span>
              </div>
            </button>

            {/* ================================================
                DESKTOP MENU — 4 Business Units
                ================================================ */}
            <div className="hidden lg:flex items-center gap-0.5">
              <NavLink labelFr="Accueil" labelEn="Home" href="/" isActive={isHomeActive} isLightNav={isLightNav} isDarkNav={isDarkNav} navigate={navigate} />
              <SimpleDropdown id="about" label="about" items={ABOUT_ITEMS} isScrolled={isLightNav} isActive={isAboutActive} activeDropdown={activeDropdown} openDropdown={openDropdown} scheduleClose={scheduleClose} cancelClose={cancelClose} navigate={navigate} currentLanguage={currentLanguage} isDarkNav={isDarkNav} />
              <BUDropdown isScrolled={isLightNav} isActive={isBUSActive} activeDropdown={activeDropdown} openDropdown={openDropdown} scheduleClose={scheduleClose} cancelClose={cancelClose} navigate={navigate} currentLanguage={currentLanguage} isDarkNav={isDarkNav} />
              <ListDropdown id="solutions" label="solutions" labelFr="Solutions" labelEn="Solutions" items={SOLUTIONS_ITEMS} isScrolled={isLightNav} isActive={isSolutionsActive} activeDropdown={activeDropdown} openDropdown={openDropdown} scheduleClose={scheduleClose} cancelClose={cancelClose} navigate={navigate} currentLanguage={currentLanguage} isDarkNav={isDarkNav} />
              <ListDropdown id="media" label="media" labelFr="Médias" labelEn="Media" items={MEDIA_ITEMS} isScrolled={isLightNav} isActive={isMediaActive} activeDropdown={activeDropdown} openDropdown={openDropdown} scheduleClose={scheduleClose} cancelClose={cancelClose} navigate={navigate} currentLanguage={currentLanguage} isDarkNav={isDarkNav} />
              <ListDropdown id="resources" label="resources" labelFr="Ressources" labelEn="Resources" items={RESOURCES_ITEMS} isScrolled={isLightNav} isActive={isResourcesActive} activeDropdown={activeDropdown} openDropdown={openDropdown} scheduleClose={scheduleClose} cancelClose={cancelClose} navigate={navigate} currentLanguage={currentLanguage} isDarkNav={isDarkNav} />

              {/* KOS RegTech AI — Lien dédié avec badge Live */}
              <a href="/kos-regtech-ai/" onClick={(e: any) => { e.preventDefault(); navigate('/kos-regtech-ai/'); }} className={`relative text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 rounded-lg px-3 py-2.5 flex items-center gap-1.5 min-h-[44px] ${isScrolled ? 'text-brand-900 hover:text-deloitte-600' : 'text-white hover:text-deloitte-300'}`} style={isDarkNav && !isScrolled ? { textShadow: '0 1px 6px rgba(0,0,0,0.8)' } : {}}>
                <i className="ri-cpu-line text-base" style={{ color: isScrolled ? '#86BC25' : '#a5d936' }} />
                <span>KOS AI</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}>RegTech</span>
                {hasLivePipelines && (
                  <span className="relative flex items-center gap-1 ml-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ef4444' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ef4444' }} />
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: '#ef4444' }}>{pipelineLiveCount}</span>
                  </span>
                )}
                {location.pathname.startsWith('/kos-regtech-ai') && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-deloitte-500 rounded-full" />}
              </a>

              <NavLink labelFr="Contact" labelEn="Contact" href="/contact/" isActive={isContactActive} isLightNav={isLightNav} isDarkNav={isDarkNav} navigate={navigate} />

              <button onClick={() => setIsSearchOpen(true)} className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 hover:scale-110 ${isLightNav ? 'text-brand-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`} aria-label={currentLanguage === 'fr' ? 'Ouvrir la recherche (Ctrl+K)' : 'Open search (Ctrl+K)'}>
                <i className="ri-search-line text-xl" />
              </button>

              <div className="flex items-center gap-1 border rounded-full px-2 py-1.5 transition-all duration-300 ml-1 hover:shadow-md" style={{ borderColor: isLightNav ? 'rgba(107,155,31,0.4)' : 'rgba(255,255,255,0.3)' }}>
                <button onClick={() => changeLanguage('fr')} className={`px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[36px] min-w-[44px] ${currentLanguage === 'fr' ? 'bg-deloitte-500 text-white shadow-md scale-105' : (isLightNav ? 'text-brand-800 hover:text-deloitte-600' : 'text-white/70 hover:text-white')}`}>FR</button>
                <button onClick={() => changeLanguage('en')} className={`px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[36px] min-w-[44px] ${currentLanguage === 'en' ? 'bg-deloitte-500 text-white shadow-md scale-105' : (isLightNav ? 'text-brand-800 hover:text-deloitte-600' : 'text-white/70 hover:text-white')}`}>EN</button>
              </div>

              <a href="/diagnostic-flash/" onClick={(e) => { e.preventDefault(); navigate('/diagnostic-flash/'); }} className="relative flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs cursor-pointer whitespace-nowrap transition-all hover:scale-105 hover:-translate-y-0.5 ml-1 overflow-hidden group" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <i className="ri-flashlight-line text-sm relative z-10" />
                <span className="relative z-10">{currentLanguage === 'fr' ? 'Diagnostic' : 'Diagnostic'} <span className="ml-1 px-1 py-0.5 bg-white/30 rounded text-xs font-bold">{currentLanguage === 'fr' ? 'Gratuit' : 'Free'}</span></span>
              </a>

              <button onClick={handleExpertClick} className="text-white px-5 py-2.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap cursor-pointer ml-1.5 min-h-[44px] flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <i className="ri-customer-service-2-line text-lg relative z-10" />
                <span className="relative z-10 text-sm">{t('nav.expert_button', 'Expert')}</span>
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button onClick={() => setIsSearchOpen(true)} className={`w-11 h-11 flex items-center justify-center cursor-pointer rounded-lg transition-all ${isLightNav ? 'text-brand-900' : 'text-white'}`} aria-label={currentLanguage === 'fr' ? 'Ouvrir la recherche' : 'Open search'}>
                <i className="ri-search-line text-2xl" aria-hidden="true" />
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`w-11 h-11 flex items-center justify-center cursor-pointer rounded-lg transition-all ${isLightNav ? 'text-brand-900' : 'text-white'}`} aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? (currentLanguage === 'fr' ? 'Fermer le menu' : 'Close menu') : (currentLanguage === 'fr' ? 'Ouvrir le menu' : 'Open menu')}>
                <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================
            MOBILE MENU
        ================================================ */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 animate-fadeSlideUp pointer-events-auto">
            <div className="overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-1 bg-white" style={{ maxHeight: `calc(100vh - ${navTop + 80}px)`, touchAction: 'pan-y' }}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setIsMobileMenuOpen(false); }} className={`flex items-center gap-2 w-full font-medium cursor-pointer py-3 px-3 rounded-lg min-h-[52px] text-sm ${isHomeActive ? 'text-deloitte-600 bg-deloitte-50' : 'text-brand-900 hover:text-deloitte-600'}`}>
                <i className="ri-home-line text-deloitte-600" />{currentLanguage === 'fr' ? 'Accueil' : 'Home'}
              </a>

              <MobileExpandableMenu id="about" labelFr="À propos" labelEn="About" icon="ri-information-line" currentLanguage={currentLanguage} mobileExpandedMenu={mobileExpandedMenu} toggleMobileMenu={toggleMobileMenu} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} sections={ABOUT_ITEMS.sections} />

              <div>
                <button onClick={() => toggleMobileMenu('bus')} className="w-full flex items-center justify-between font-medium py-3 px-3 rounded-lg min-h-[52px] text-sm text-brand-900">
                  <span className="flex items-center gap-2"><i className="ri-briefcase-line text-deloitte-600" />4 Business Units</span>
                  <i className={`ri-arrow-down-s-line text-lg transition-transform duration-300 ${mobileExpandedMenu === 'bus' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpandedMenu === 'bus' && (
                  <div className="pl-2 space-y-1 mt-1 animate-fadeSlideUp">
                    <MobileBUItem bu={BU1_INTELLIGENCE} currentLanguage={currentLanguage} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <MobileBUItem bu={BU2_DUE_DILIGENCE} currentLanguage={currentLanguage} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <MobileBUItem bu={BU3_REGTECH} currentLanguage={currentLanguage} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <MobileBUItem bu={BU4_OBSERVATORY} currentLanguage={currentLanguage} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                  </div>
                )}
              </div>

              <MobileLinkList id="solutions" labelFr="Solutions" labelEn="Solutions" icon="ri-puzzle-2-line" items={SOLUTIONS_ITEMS} currentLanguage={currentLanguage} mobileExpandedMenu={mobileExpandedMenu} toggleMobileMenu={toggleMobileMenu} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              <MobileLinkList id="media" labelFr="Médias" labelEn="Media" icon="ri-film-line" items={MEDIA_ITEMS} currentLanguage={currentLanguage} mobileExpandedMenu={mobileExpandedMenu} toggleMobileMenu={toggleMobileMenu} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              <MobileLinkList id="resources" labelFr="Ressources" labelEn="Resources" icon="ri-folder-download-line" items={RESOURCES_ITEMS} currentLanguage={currentLanguage} mobileExpandedMenu={mobileExpandedMenu} toggleMobileMenu={toggleMobileMenu} navigate={navigate} setIsMobileMenuOpen={setIsMobileMenuOpen} />

              {/* KOS RegTech AI — Mobile avec badge Live */}
              <a href="/kos-regtech-ai/" onClick={(e: any) => { e.preventDefault(); navigate('/kos-regtech-ai/'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 w-full font-medium cursor-pointer py-3 px-3 rounded-lg min-h-[52px] text-sm text-brand-900 hover:text-deloitte-600">
                <i className="ri-cpu-line text-deloitte-600" />
                <span className="flex-1">{currentLanguage === 'fr' ? 'KOS RegTech AI' : 'KOS RegTech AI'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>AI</span>
                {hasLivePipelines && (
                  <span className="relative flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ef4444' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ef4444' }} />
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: '#ef4444' }}>{pipelineLiveCount}</span>
                  </span>
                )}
              </a>

              <a href="/contact/" onClick={(e: any) => { e.preventDefault(); navigate('/contact/'); setIsMobileMenuOpen(false); }} className={`flex items-center gap-2 w-full font-medium cursor-pointer py-3 px-3 rounded-lg min-h-[52px] text-sm ${isContactActive ? 'text-deloitte-600 bg-deloitte-50' : 'text-brand-900 hover:text-deloitte-600'}`}>
                <i className="ri-mail-send-line text-deloitte-600" />Contact
              </a>

              <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                <a href="/privacy/" onClick={(e) => { e.preventDefault(); navigate('/privacy/'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 w-full font-medium cursor-pointer py-3 px-3 rounded-lg min-h-[52px] text-brand-900 hover:text-deloitte-600 text-sm">
                  <i className="ri-shield-check-line text-deloitte-600" />{currentLanguage === 'fr' ? 'Confidentialité' : 'Privacy'}
                </a>
                <div className="flex items-center gap-3 px-3 py-2">
                  <span className="text-sm text-brand-800 font-medium">{currentLanguage === 'fr' ? 'Langue :' : 'Language:'}</span>
                  <div className="flex items-center gap-1 border border-deloitte-500 rounded-full px-2 py-1">
                    <button onClick={() => changeLanguage('fr')} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer min-h-[44px] ${currentLanguage === 'fr' ? 'bg-deloitte-500 text-white' : 'text-brand-800'}`}>FR</button>
                    <button onClick={() => changeLanguage('en')} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer min-h-[44px] ${currentLanguage === 'en' ? 'bg-deloitte-500 text-white' : 'text-brand-800'}`}>EN</button>
                  </div>
                </div>
                <a href="/diagnostic-flash/" onClick={(e) => { e.preventDefault(); navigate('/diagnostic-flash/'); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm cursor-pointer mt-2 min-h-[52px] shadow-lg" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}>
                  <i className="ri-flashlight-line text-lg" />
                  {currentLanguage === 'fr' ? 'Diagnostic — Gratuit' : 'Diagnostic — Free'}
                </a>
                <button onClick={handleExpertClick} className="w-full text-center text-white px-6 py-3.5 rounded-full font-semibold cursor-pointer mt-2 min-h-[52px] flex items-center justify-center gap-2 shadow-lg text-sm" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)' }}>
                  <i className="ri-customer-service-2-line text-lg" />{t('nav.expert_button', 'Parler à un expert')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

/* ============================================================
   SOUS-COMPOSANTS — Desktop
   ============================================================ */

function NavLink({ labelFr, labelEn, href, isActive, isLightNav, isDarkNav, navigate }: any) {
  const textColor = isActive
    ? (isLightNav ? 'text-deloitte-600' : 'text-deloitte-300')
    : (isLightNav ? 'text-brand-900 hover:text-deloitte-600' : 'text-white hover:text-deloitte-300');
  return (
    <a href={href} onClick={(e: any) => { e.preventDefault(); navigate(href); }} className={`relative text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 rounded-lg px-3 py-2.5 min-h-[44px] flex items-center ${textColor}`} style={isDarkNav ? { textShadow: '0 1px 4px rgba(0,0,0,0.8)' } : {}}>
      {labelFr}
      {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-deloitte-500 rounded-full" />}
    </a>
  );
}

function SimpleDropdown({ id, label, items, isScrolled, isActive, activeDropdown, openDropdown, scheduleClose, cancelClose, navigate, currentLanguage, isDarkNav }: any) {
  const isFr = currentLanguage === 'fr';
  const open = activeDropdown === id;
  const textColor = isActive
    ? (isScrolled ? 'text-deloitte-600' : 'text-deloitte-300')
    : (isScrolled ? 'text-brand-900 hover:text-deloitte-600' : 'text-white hover:text-deloitte-300');

  return (
    <div className="relative group" onMouseEnter={() => openDropdown(id)} onMouseLeave={scheduleClose}>
      <button className={`relative text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 rounded-lg px-3 py-2.5 flex items-center gap-1.5 min-h-[44px] ${textColor}`} style={isDarkNav ? { textShadow: '0 1px 4px rgba(0,0,0,0.8)' } : {}} aria-expanded={open} aria-haspopup="true">
        {isFr ? items.labelFr : items.labelEn}
        <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-deloitte-500 rounded-full" />}
      </button>
      {open && (
        <div className="absolute top-full bg-white rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto animate-fadeSlideUp overflow-hidden" role="menu" style={{ left: '50%', transform: 'translateX(-50%)', width: '520px', maxWidth: 'calc(100vw - 2rem)', marginTop: '-2px', paddingTop: '2px' }} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.1)', border: '1px solid rgba(134,188,37,0.2)' }}>
                <i className={`${items.icon} text-sm`} style={{ color: '#86BC25' }} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">KHEPRA EXPERTS</p>
                <p className="text-sm font-bold text-brand-900">{isFr ? items.labelFr : items.labelEn}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{isFr ? items.descriptionFr : items.descriptionEn}</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100 p-2">
            {items.sections.slice(0, 2).map((section: any, si: number) => (
              <div key={si} className="px-3 py-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{isFr ? section.titleFr : section.titleEn}</p>
                <div className="space-y-0.5">
                  {section.items.map((item: any, ii: number) => (
                    <a key={ii} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); }} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer group/item transition-all">
                      <i className={`${item.icon} text-xs text-gray-400 group-hover/item:text-deloitte-600 flex-shrink-0`} />
                      <span className="text-xs text-gray-600 group-hover/item:text-brand-900 font-medium flex-1">{isFr ? item.labelFr : item.labelEn}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {items.sections.length > 2 && (
              <div className="col-span-2 px-3 pt-1 pb-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{isFr ? (items.sections[2]?.titleFr || '') : (items.sections[2]?.titleEn || '')}</p>
                <div className="flex flex-wrap gap-1">
                  {items.sections[2]?.items.map((item: any, ii: number) => (
                    <a key={ii} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); }} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer group/item transition-all">
                      <i className={`${item.icon} text-xs text-gray-400 group-hover/item:text-deloitte-600 flex-shrink-0`} />
                      <span className="text-xs text-gray-600 group-hover/item:text-brand-900 font-medium">{isFr ? item.labelFr : item.labelEn}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 4 Business Units mega-dropdown
function BUDropdown({ isScrolled, isActive, activeDropdown, openDropdown, scheduleClose, cancelClose, navigate, currentLanguage, isDarkNav }: any) {
  const isFr = currentLanguage === 'fr';
  const open = activeDropdown === 'bus';
  const bus = [BU1_INTELLIGENCE, BU2_DUE_DILIGENCE, BU3_REGTECH, BU4_OBSERVATORY];
  const textColor = isActive
    ? (isScrolled ? 'text-deloitte-600' : 'text-deloitte-300')
    : (isScrolled ? 'text-brand-900 hover:text-deloitte-600' : 'text-white hover:text-deloitte-300');

  return (
    <div className="relative group" onMouseEnter={() => openDropdown('bus')} onMouseLeave={scheduleClose}>
      <button className={`relative text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 rounded-lg px-3 py-2.5 flex items-center gap-1.5 min-h-[44px] ${textColor}`} style={isDarkNav ? { textShadow: '0 1px 4px rgba(0,0,0,0.8)' } : {}} aria-expanded={open} aria-haspopup="true">
        {isFr ? '4 Business Units' : '4 Business Units'}
        <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-deloitte-500 rounded-full" />}
      </button>
      {open && (
        <div className="absolute top-full bg-white rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto animate-fadeSlideUp overflow-hidden" role="menu" style={{ left: '50%', transform: 'translateX(-50%)', width: '960px', maxWidth: 'calc(100vw - 2rem)', marginTop: '-2px', paddingTop: '2px' }} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.1)', border: '1px solid rgba(134,188,37,0.2)' }}>
                <i className="ri-briefcase-line text-sm" style={{ color: '#86BC25' }} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">KOS — STANDARDS INTERNATIONAUX</p>
                <p className="text-sm font-bold text-brand-900">{isFr ? '4 Business Units Reconfigurées' : '4 Reconfigured Business Units'}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{isFr ? 'Régulation · Gouvernance · Climat ESG · KBR-Model' : 'Regulation · Governance · Climate ESG · KBR-Model'}</span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-gray-100 p-2">
            {bus.map((bu, bi) => (
              <div key={bi} className="px-3 py-2">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                  <div className="w-6 h-6 flex items-center justify-center rounded flex-shrink-0" style={{ background: `${bu.accent}15`, border: `1px solid ${bu.accent}30` }}>
                    <i className={`${bu.icon} text-xs`} style={{ color: bu.accent }} />
                  </div>
                  <span className="text-xs font-bold text-brand-900">{isFr ? bu.labelFr : bu.labelEn}</span>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? 'Produits' : 'Products'}</p>
                  <div className="space-y-0.5">
                    {bu.products.map((item: any, ii: number) => (
                      <a key={ii} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); }} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer group/item transition-all">
                        <i className={`${item.icon} text-xs text-gray-400 group-hover/item:text-deloitte-600 flex-shrink-0`} />
                        <span className="text-xs text-gray-600 group-hover/item:text-brand-900 font-medium flex-1">{isFr ? item.labelFr : item.labelEn}</span>
                        {item.badge && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-deloitte-100 text-deloitte-700 whitespace-nowrap">{item.badge}</span>}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: bu.accent }}>{bu.metric}</span>
                    <span className="text-[10px] text-gray-400">{isFr ? bu.metricLabelFr : bu.metricLabelEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-gray-800 bg-brand-900 flex items-center justify-between">
            <span className="text-xs text-gray-300 font-medium">{isFr ? 'KOS — Régulation Financière, Gouvernance, Climat ESG & KBR-Model — Afrique Francophone' : 'KOS — Financial Regulation, Governance, Climate ESG & KBR-Model — Francophone Africa'}</span>
            <span className="text-xs text-gray-400">{isFr ? '17 pays · UEMOA · CEMAC · 22 ans d\'expertise · Standards Internationaux' : '17 countries · UEMOA · CEMAC · 22 years · International Standards'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ListDropdown({ id, label, labelFr, labelEn, items, isScrolled, isActive, activeDropdown, openDropdown, scheduleClose, cancelClose, navigate, currentLanguage, isDarkNav }: any) {
  const isFr = currentLanguage === 'fr';
  const open = activeDropdown === id;
  const textColor = isActive
    ? (isScrolled ? 'text-deloitte-600' : 'text-deloitte-300')
    : (isScrolled ? 'text-brand-900 hover:text-deloitte-600' : 'text-white hover:text-deloitte-300');

  return (
    <div className="relative group" onMouseEnter={() => openDropdown(id)} onMouseLeave={scheduleClose}>
      <button className={`relative text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-deloitte-500 rounded-lg px-3 py-2.5 flex items-center gap-1.5 min-h-[44px] ${textColor}`} style={isDarkNav ? { textShadow: '0 1px 4px rgba(0,0,0,0.8)' } : {}} aria-expanded={open} aria-haspopup="true">
        {isFr ? labelFr : labelEn}
        <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-deloitte-500 rounded-full" />}
      </button>
      {open && (
        <div className="absolute top-full bg-white rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto animate-fadeSlideUp overflow-hidden" role="menu" style={{ left: 0, width: '340px', marginTop: '-2px', paddingTop: '2px' }} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isFr ? labelFr : labelEn}</p>
          </div>
          <div className="p-2 space-y-0.5">
            {items.map((item: any, i: number) => (
              <a key={i} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); }} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group/item transition-all">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 group-hover/item:bg-deloitte-100 flex-shrink-0 mt-0.5">
                  <i className={`${item.icon} text-sm text-deloitte-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-brand-800 group-hover/item:text-deloitte-600 flex items-center gap-1.5">
                    {isFr ? (item.labelFr || item.label) : (item.labelEn || item.label)}
                    {item.badge && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-deloitte-100 text-deloitte-700 whitespace-nowrap">{item.badge}</span>}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{isFr ? (item.descFr || '') : (item.descEn || '')}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SOUS-COMPOSANTS — Mobile
   ============================================================ */

function MobileExpandableMenu({ id, labelFr, labelEn, icon, currentLanguage, mobileExpandedMenu, toggleMobileMenu, navigate, setIsMobileMenuOpen, sections }: any) {
  const isFr = currentLanguage === 'fr';
  return (
    <div>
      <button onClick={() => toggleMobileMenu(id)} className="w-full flex items-center justify-between font-medium text-brand-900 py-3 px-3 rounded-lg min-h-[52px] text-sm">
        <span className="flex items-center gap-2"><i className={`${icon} text-deloitte-600`} />{isFr ? labelFr : labelEn}</span>
        <i className={`ri-arrow-down-s-line text-lg transition-transform duration-300 ${mobileExpandedMenu === id ? 'rotate-180' : ''}`} />
      </button>
      {mobileExpandedMenu === id && (
        <div className="pl-2 space-y-1 mt-1 animate-fadeSlideUp">
          {sections.map((section: any, si: number) => (
            <div key={si}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1">{isFr ? section.titleFr : section.titleEn}</p>
              {section.items.map((item: any, ii: number) => (
                <a key={ii} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 py-2.5 px-3 text-sm text-gray-700 hover:text-deloitte-600 hover:bg-deloitte-50 rounded-lg cursor-pointer min-h-[44px]">
                  <i className={`${item.icon} text-base text-deloitte-600`} />
                  <span className="font-medium flex-1">{isFr ? item.labelFr : item.labelEn}</span>
                  {item.badge && <span className="px-1.5 py-0.5 bg-deloitte-100 text-deloitte-700 text-xs font-bold rounded">{item.badge}</span>}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileLinkList({ id, labelFr, labelEn, icon, items, currentLanguage, mobileExpandedMenu, toggleMobileMenu, navigate, setIsMobileMenuOpen }: any) {
  const isFr = currentLanguage === 'fr';
  return (
    <div>
      <button onClick={() => toggleMobileMenu(id)} className="w-full flex items-center justify-between font-medium text-brand-900 py-3 px-3 rounded-lg min-h-[52px] text-sm">
        <span className="flex items-center gap-2"><i className={`${icon} text-deloitte-600`} />{isFr ? labelFr : labelEn}</span>
        <i className={`ri-arrow-down-s-line text-lg transition-transform duration-300 ${mobileExpandedMenu === id ? 'rotate-180' : ''}`} />
      </button>
      {mobileExpandedMenu === id && (
        <div className="pl-2 space-y-1 mt-1 animate-fadeSlideUp">
          {items.map((item: any, i: number) => (
            <a key={i} href={item.href} onClick={(e: any) => { e.preventDefault(); navigate(item.href); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 py-2.5 px-3 text-sm text-gray-700 hover:text-deloitte-600 hover:bg-deloitte-50 rounded-lg cursor-pointer min-h-[44px]">
              <i className={`${item.icon} text-base text-deloitte-600`} />
              <span className="font-medium flex-1">{isFr ? (item.labelFr || item.label) : (item.labelEn || item.label)}</span>
              {item.badge && <span className="px-1.5 py-0.5 bg-deloitte-100 text-deloitte-700 text-xs font-bold rounded">{item.badge}</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileBUItem({ bu, currentLanguage, navigate, setIsMobileMenuOpen }: any) {
  const isFr = currentLanguage === 'fr';
  return (
    <a href={bu.href} onClick={(e: any) => { e.preventDefault(); navigate(bu.href); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-50 min-h-[52px] transition-all">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${bu.accent}15`, border: `1px solid ${bu.accent}30` }}>
        <i className={`${bu.icon} text-sm`} style={{ color: bu.accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-brand-900 flex items-center gap-2">
          {isFr ? bu.labelFr : bu.labelEn}
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{bu.metric}</span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{isFr ? bu.descriptionFr : bu.descriptionEn}</div>
      </div>
    </a>
  );
}

function ScrollProgressUpdater() {
  useEffect(() => {
    const bar = document.getElementById('nav-scroll-progress');
    if (!bar) return;
    const update = () => { const h = document.documentElement.scrollHeight - window.innerHeight; const pct = h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0; bar.style.width = `${pct}%`; };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return null;
}

export default Navigation;