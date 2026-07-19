import { useState, useEffect } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import ProfilePageSchema from '@/components/feature/ProfilePageSchema';
import AboutHeroNew from '';
import AboutStoryNew from '';
import AboutAuthorityNew from '';
import AboutESG from '';
import { AboutNavigation } from '';
import { AboutFounder } from '';
import { AboutPresence } from '';
import { AboutCTA } from '';
import { AboutPartners } from '';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { useTranslation } from 'react-i18next';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function AboutPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';
  const [activeSection, setActiveSection] = useState('mission');

  const getTotalOffset = (): number => {
    let total = 0;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) total += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) total += regAlert.offsetHeight;
    const mainNav = document.querySelector<HTMLElement>('nav.fixed');
    if (mainNav) total += mainNav.offsetHeight;
    const aboutNav = document.querySelector<HTMLElement>('nav[aria-label="Navigation de la page À propos"]');
    if (aboutNav) total += aboutNav.offsetHeight;
    return total + 16;
  };

  useEffect(() => {
    const sectionIds = ['mission', 'expertise', 'esg', 'founder', 'presence', 'partners'];

    const applyScrollMargins = () => {
      const offset = getTotalOffset();
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.scrollMarginTop = `${offset}px`;
      });
    };

    applyScrollMargins();
    window.addEventListener('resize', applyScrollMargins, { passive: true });

    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('resize', applyScrollMargins);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = getTotalOffset();
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        alternateName: 'Khepra Experts',
        url: SITE_URL,
        logo: LOGO_IMAGE_URL,
        image: `${SITE_URL}/og-about.jpg`,
        foundingDate: '2026',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
        founder: { '@type': 'Person', '@id': `${SITE_URL}/about#founder` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lomé',
          addressLocality: 'Lomé',
          addressRegion: 'Maritime',
          addressCountry: 'TG',
          postalCode: '00228',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 6.1256,
          longitude: 1.2223,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+228-93-98-49-09',
          contactType: 'customer service',
          email: 'contact@khepraexperts.com',
          areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH', 'CM', 'CG', 'GA', 'NE', 'ML', 'GN'],
          availableLanguage: ['French', 'English'],
        },
        sameAs: [
          'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
        ],
        description: "Cabinet de conseil stratégique pan-africain basé à Lomé, Togo, spécialisé en gouvernance d'entreprise, audit financier, gestion des risques, transformation digitale et inclusion financière en Afrique de l'Ouest et Centrale.",
        knowsAbout: [
          'Corporate Governance',
          'Financial Audit',
          'Risk Management',
          'Digital Transformation',
          'Financial Inclusion',
          'BCEAO Compliance',
          'COBAC Regulations',
          'OHADA Framework',
          'Microfinance',
          'Strategic Advisory',
          'Organizational Development',
          'Capacity Building',
        ],
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: 6.1256, longitude: 1.2223 },
          geoRadius: '5000000',
          name: 'West and Central Africa',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Strategic Advisory Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategic Advisory & Governance' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Financial Audit & Risk Management' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Transformation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Organizational Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Capacity Building' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fundraising & Due Diligence' } },
          ],
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/about#founder`,
        name: 'SIMDA Essoyomèwè',
        givenName: 'Essoyomèwè',
        familyName: 'SIMDA',
        jobTitle: 'Associate Director & Founder',
        honorificPrefix: 'Mr.',
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}/founder-simda.jpg`,
        worksFor: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
        nationality: { '@type': 'Country', name: 'Togo' },
        knowsLanguage: ['fr', 'en'],
        knowsAbout: [
          'Corporate Governance',
          'Financial Audit',
          'Enterprise Risk Management (ERM)',
          'Financial Inclusion',
          'Microfinance',
          'BCEAO Compliance',
          'COBAC Regulations',
          'OHADA Framework',
          'Strategic Advisory',
          'Organizational Transformation',
          'Digital Transformation',
          'CAMELS Methodology',
          'COSO Framework',
        ],
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Université de Lomé',
            address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Université Laval',
            address: { '@type': 'PostalAddress', addressLocality: 'Québec', addressCountry: 'CA' },
          },
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: "Master's in Management Sciences",
            credentialCategory: 'degree',
            recognizedBy: { '@type': 'EducationalOrganization', name: 'Université de Lomé' },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'MBA in Business Management',
            credentialCategory: 'degree',
            recognizedBy: { '@type': 'EducationalOrganization', name: 'Université Laval, Canada' },
          },
        ],
        hasOccupation: [
          {
            '@type': 'Occupation',
            name: 'Strategic Consultant & Financial Auditor',
            occupationLocation: { '@type': 'Country', name: 'Togo' },
            skills: 'Corporate Governance, Financial Audit, Risk Management, Financial Inclusion, Digital Transformation',
            experienceRequirements: '22+ years',
          },
        ],
        description: 'Associate Director and Founder of KHEPRA EXPERTS. Over 22 years of experience in financial audit, corporate governance, financial inclusion and organizational transformation across West and Central Africa. Former MFI Inspector at the Togolese Ministry of Finance, Senior Auditor at FINAM Gabon, CEO of Atlantique Microfinance (AMIFA) Gabon, and National Technical Advisor on Financial Inclusion to the Togolese government.',
        sameAs: [
          'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: 'À propos de KHEPRA EXPERTS – Cabinet Conseil Lomé, Togo',
        description: "Découvrez KHEPRA EXPERTS : notre mission, notre vision, notre Directeur Associé SIMDA Essoyomèwè et nos 22+ ans d'expertise en conseil stratégique, gouvernance et audit financier en Afrique.",
        inLanguage: currentLang,
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        about: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
        mentions: { '@type': 'Person', '@id': `${SITE_URL}/about#founder` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
          ],
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="À Propos | Khepra Experts — 22 Ans Gouvernance, Conformité & Investment Readiness"
        description="Cabinet de référence en gouvernance, conformité BCEAO et investment readiness. 22 ans, 500+ missions, 20 pays. Découvrez notre expertise et notre fondateur."
        keywords="cabinet conseil stratégique Afrique, expert gouvernance entreprise Afrique, performance financière PME Afrique, structuration stratégique Afrique francophone, SIMDA Essoyomèwè, Khepra Experts Lomé Togo, conformité BCEAO BEAC OHADA"
        canonicalPath="/about"
        ogType="website"
        ogImage={OG_IMAGES.ABOUT}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt="À propos de KHEPRA EXPERTS – Cabinet conseil stratégique Afrique"
        schemaJson={aboutSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/about/']}
      />
      <Navigation />
      <ProfilePageSchema
        name="SIMDA Essoyomèwè"
        url="/about/"
        jobTitle="Associé Principal — Réglementation Bancaire & Haute Gouvernance, KHEPRA EXPERTS"
        description="Directeur Associé et Fondateur de KHEPRA EXPERTS. Plus de 22 ans d'expérience en audit financier, gouvernance d'entreprise, inclusion financière et transformation organisationnelle en Afrique de l'Ouest et Centrale."
        worksFor={{ name: 'KHEPRA EXPERTS', url: 'https://khepraexperts.com/' }}
        sameAs={['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/']}
        knowsAbout={['Gouvernance d\'entreprise', 'Audit financier', 'Conformité BCEAO', 'Réglementation COBAC', 'Inclusion financière', 'Microfinance', 'Gestion des risques', 'Transformation digitale']}
      />
      <AboutHeroNew />
      <AboutNavigation activeSection={activeSection} onNavigate={handleNavigate} />
      <main id="main-content">
        <div id="mission">
          <AboutStoryNew />
        </div>
        <div id="expertise">
          <AboutAuthorityNew />
        </div>
        <div id="esg">
          <AboutESG />
        </div>
        <div id="founder">
          <AboutFounder />
        </div>
        <div id="presence">
          <AboutPresence />
        </div>
        <div id="partners">
          <AboutPartners />
        </div>
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}




