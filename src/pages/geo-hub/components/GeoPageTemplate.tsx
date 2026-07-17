import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { PremiumCTA } from '@/components/feature/PremiumCTA';
import SpeakableSchema from '@/components/feature/SpeakableSchema';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { GeoPageData } from './types';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export interface GeoPageTemplateProps {
  data: GeoPageData;
  ogImage?: string;
  ogImageAltFr?: string;
  ogImageAltEn?: string;
}

export function GeoPageTemplate({ data, ogImage, ogImageAltFr, ogImageAltEn }: GeoPageTemplateProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [openPaa, setOpenPaa] = useState<number | null>(null);

  const h1 = isEn ? data.h1En : data.h1Fr;
  const metaTitle = isEn ? data.metaTitleEn : data.metaTitleFr;
  const metaDescription = isEn ? data.metaDescriptionEn : data.metaDescriptionFr;
  const keywords = isEn ? data.keywordsEn : data.keywordsFr;
  const summaryPoints = isEn ? data.summaryPointsEn : data.summaryPointsFr;

  const pageUrl = `${SITE_URL}/geo-hub/${data.slug}`;

  // === SCHEMA FAQPage (optimisé GEO) ===
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    isPartOf: { '@id': `${pageUrl}#webpage` },
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: isEn ? faq.questionEn : faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isEn ? faq.answerEn : faq.answer,
        author: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'KHEPRA EXPERTS',
        },
      },
    })),
  };

  // === SCHEMA BreadcrumbList ===
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'GEO Hub' : 'Hub GEO',
        item: `${SITE_URL}/geo-hub`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEn ? data.h1En : data.h1Fr,
        item: pageUrl,
      },
    ],
  };

  // === SCHEMA WebPage (avec speakable pour les IA) ===
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: metaTitle,
    description: metaDescription,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: isEn ? data.h1En : data.h1Fr,
      description: metaDescription,
    },
    mainEntity: { '@id': `${pageUrl}#article` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.geo-summary', '.geo-methodology', '.geo-faq', '.geo-paa'],
    },
    datePublished: '2026-06-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@id': `${SITE_URL}/about#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  // === SCHEMA Article ( enrichi pour GEO) ===
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    url: pageUrl,
    name: metaTitle,
    description: metaDescription,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    headline: h1,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#founder`,
      name: 'SIMDA Essoyomèwè',
      jobTitle: isEn ? 'Managing Director' : 'Directeur Général',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      knowsAbout: [
        'Due diligence Africa',
        'BCEAO compliance',
        'COBAC regulation',
        'Financial governance',
        'Investment readiness',
        'ESG implementation Africa',
        'Risk management COSO',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 250,
        height: 60,
      },
    },
    about: {
      '@type': 'Thing',
      name: isEn ? data.h1En : data.h1Fr,
      description: metaDescription,
    },
    datePublished: '2026-06-01',
    dateModified: new Date().toISOString().split('T')[0],
    educationalLevel: 'Advanced',
    proficiencyLevel: 'Expert',
    dependencies: 'BCEAO regulatory framework, OHADA, COSO, IFC',
    isPartOf: { '@id': `${pageUrl}#webpage` },
    hasPart: [
      { '@id': `${pageUrl}#summary` },
      { '@id': `${pageUrl}#definitions` },
      { '@id': `${pageUrl}#methodology` },
      { '@id': `${pageUrl}#references` },
      { '@id': `${pageUrl}#faq` },
      ...(data.peopleAlsoAsk ? [{ '@id': `${pageUrl}#paa` }] : []),
    ],
    keywords: keywords,
    learningResourceType: 'Reference material',
    audience: {
      '@type': 'Audience',
      audienceType: 'Financial institutions, regulators, investors, SMEs',
    },
  };

  // === SCHEMA HowTo (basé sur les étapes méthodologiques — très fort pour GEO) ===
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: isEn ? `How to: ${data.h1En}` : `Comment : ${data.h1Fr}`,
    description: metaDescription,
    totalTime: 'P30D',
    isPartOf: { '@id': `${pageUrl}#article` },
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'XOF',
      value: '0',
      description: isEn ? 'Free diagnostic available' : 'Diagnostic gratuit disponible',
    },
    step: data.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      '@id': `${pageUrl}#step-${idx + 1}`,
      position: idx + 1,
      name: isEn ? step.titleEn : step.title,
      text: isEn ? step.descriptionEn : step.description,
      url: `${pageUrl}#step-${idx + 1}`,
    })),
  };

  // === SCHEMA DefinedTermSet (pour les définitions — excellent pour GEO) ===
  const definedTermSetSchema = data.definitions.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        '@id': `${pageUrl}#definitions`,
        name: isEn ? `Key Terms — ${data.h1En}` : `Termes clés — ${data.h1Fr}`,
        description: isEn
          ? `Definitions of key terms for ${data.h1En}`
          : `Définitions des termes clés pour ${data.h1Fr}`,
        isPartOf: { '@id': `${pageUrl}#article` },
        inDefinedTermSet: data.definitions.map((def, idx) => ({
          '@type': 'DefinedTerm',
          '@id': `${pageUrl}#term-${idx + 1}`,
          name: isEn ? def.termEn : def.term,
          description: isEn ? def.definitionEn : def.definition,
          inDefinedTermSet: { '@id': `${pageUrl}#definitions` },
        })),
      }
    : null;

  // === SCHEMA ItemList (résumé exécutif) ===
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#summary`,
    name: isEn ? 'Executive Summary' : 'Résumé exécutif',
    isPartOf: { '@id': `${pageUrl}#article` },
    itemListElement: summaryPoints.map((point, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Thing',
        name: isEn ? `Key point ${idx + 1}` : `Point clé ${idx + 1}`,
        description: point,
      },
    })),
  };

  // === SCHEMA LearningResource (pour le guide complet) ===
  const learningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${pageUrl}#learning-resource`,
    name: metaTitle,
    description: metaDescription,
    url: pageUrl,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@id': `${pageUrl}#webpage` },
    learningResourceType: 'Reference material',
    educationalLevel: 'Advanced',
    educationalUse: 'Professional development',
    teaches: {
      '@type': 'DefinedTerm',
      name: isEn ? data.h1En : data.h1Fr,
      description: metaDescription,
    },
    author: { '@id': `${SITE_URL}/about#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: '2026-06-01',
    dateModified: new Date().toISOString().split('T')[0],
    interactivityType: 'expositive',
    typicalAgeRange: '25-65',
  };

  // === SCHEMA Organization enrichi (avec knowsAbout spécifique au sujet) ===
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'KHEPRA EXPERTS',
    alternateName: 'Khepra Experts',
    description: 'Cabinet de référence en gouvernance, conformité BCEAO/COBAC et due diligence en Afrique francophone.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 250,
      height: 60,
    },
    knowsAbout: [
      isEn ? data.h1En : data.h1Fr,
      'BCEAO regulatory compliance',
      'COBAC prudential regulation',
      'Financial governance Africa',
      'Due diligence Africa',
      'Investment readiness',
      'ESG implementation',
      'Risk management COSO',
      'Microfinance regulation',
      'OHADA corporate law',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+228-93-98-49-09',
      contactType: 'customer service',
      email: 'contact@khepraexperts.com',
      areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH', 'ML', 'NE'],
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lomé',
      addressCountry: 'TG',
      addressRegion: 'Maritime',
    },
    areaServed: [
      { '@type': 'Country', name: 'Togo', identifier: 'TG' },
      { '@type': 'Country', name: 'Bénin', identifier: 'BJ' },
      { '@type': 'Country', name: 'Côte d’Ivoire', identifier: 'CI' },
      { '@type': 'Country', name: 'Burkina Faso', identifier: 'BF' },
      { '@type': 'Country', name: 'Sénégal', identifier: 'SN' },
      { '@type': 'Country', name: 'Ghana', identifier: 'GH' },
      { '@type': 'Country', name: 'Mali', identifier: 'ML' },
      { '@type': 'Country', name: 'Niger', identifier: 'NE' },
      { '@type': 'Place', name: 'UEMOA' },
      { '@type': 'Place', name: 'CEMAC' },
    ],
  };

  // === SCHEMA GovernmentService (pour les guides réglementaires) ===
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    '@id': `${pageUrl}#government-service`,
    name: isEn ? data.h1En : data.h1Fr,
    description: metaDescription,
    serviceType: 'Regulatory compliance advisory',
    areaServed: [
      { '@type': 'Country', name: 'Togo', identifier: 'TG' },
      { '@type': 'Country', name: 'Bénin', identifier: 'BJ' },
      { '@type': 'Country', name: 'Côte d’Ivoire', identifier: 'CI' },
      { '@type': 'Country', name: 'Burkina Faso', identifier: 'BF' },
      { '@type': 'Country', name: 'Sénégal', identifier: 'SN' },
      { '@type': 'Country', name: 'Mali', identifier: 'ML' },
      { '@type': 'Country', name: 'Niger', identifier: 'NE' },
    ],
    provider: { '@id': `${SITE_URL}/#organization` },
    jurisdiction: [
      { '@type': 'Country', name: 'UEMOA', identifier: 'UEMOA' },
      { '@type': 'Country', name: 'CEMAC', identifier: 'CEMAC' },
    ],
    isRelatedTo: {
      '@type': 'GovernmentOrganization',
      name: 'BCEAO',
      alternateName: 'Banque Centrale des Etats de l’Afrique de l’Ouest',
    },
  };

  const allSchemas = [
    webPageSchema,
    articleSchema,
    howToSchema,
    itemListSchema,
    learningResourceSchema,
    organizationSchema,
    governmentServiceSchema,
    faqSchema,
    breadcrumbSchema,
    ...(definedTermSetSchema ? [definedTermSetSchema] : []),
  ];

  // 🧠 GEO Speakable Sections — marqueurs pour extraction IA générative
  const speakableSections = [
    { cssSelector: '#geo-summary', id: 'geo-summary', description: isEn ? 'Executive Summary' : 'Résumé exécutif' },
    { cssSelector: '#geo-methodology', id: 'geo-methodology', description: isEn ? 'Step-by-Step Methodology' : 'Méthodologie étape par étape' },
    { cssSelector: '#geo-faq', id: 'geo-faq', description: isEn ? 'Frequently Asked Questions' : 'Questions fréquentes' },
    { cssSelector: '#geo-references', id: 'geo-references', description: isEn ? 'Regulatory References' : 'Références réglementaires' },
    ...(data.definitions.length > 0
      ? [{ cssSelector: '#geo-definitions', id: 'geo-definitions', description: isEn ? 'Key Definitions' : 'Définitions clés' }]
      : []),
    ...(data.peopleAlsoAsk && data.peopleAlsoAsk.length > 0
      ? [{ cssSelector: '#geo-paa', id: 'geo-paa', description: isEn ? 'People Also Ask' : 'Questions similaires' }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonicalPath={`/geo-hub/${data.slug}`}
        ogType="article"
        ogImage={ogImage || `${SITE_URL}/og-default.jpg`}
        ogImageAlt={isEn ? ogImageAltEn : ogImageAltFr}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        structuredData={allSchemas}
        hreflangLinks={STATIC_HREFLANG_MAP[`/geo-hub/${data.slug}/`] || undefined}
      />

      <Navigation />

      <div className="pt-20 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'GEO Hub' : 'Hub GEO', href: '/geo-hub' },
              { label: isEn ? data.h1En : data.h1Fr },
            ]}
          />
        </div>
      </div>

      <main id="main-content" className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950 mb-6 leading-tight">
          {h1}
        </h1>

        <p className="text-base md:text-lg text-foreground-600 mb-8 leading-relaxed">
          {metaDescription}
        </p>

        {/* RÉSUMÉ EXÉCUTIF */}
        <section id="geo-summary" className="geo-summary mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Executive Summary' : 'Résumé exécutif'}
          </h2>
          <div className="bg-background-50 rounded-lg p-5 md:p-6 border border-background-200">
            <ul className="space-y-3">
              {summaryPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 mt-0.5">
                    <i className="ri-check-line text-xs" />
                  </div>
                  <span className="text-sm md:text-base text-foreground-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DÉFINITIONS */}
        {data.definitions.length > 0 && (
          <section id="geo-definitions" className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
              {isEn ? 'Definitions' : 'Définitions'}
            </h2>
            <div className="space-y-4">
              {data.definitions.map((def, idx) => (
                <div
                  key={idx}
                  id={`term-${idx + 1}`}
                  className="bg-white rounded-lg p-4 md:p-5 border border-background-200"
                >
                  <h3 className="text-base font-semibold text-primary-700 mb-1">
                    {isEn ? def.termEn : def.term}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {isEn ? def.definitionEn : def.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MÉTHODOLOGIE */}
        <section id="geo-methodology" className="geo-methodology mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Methodology — Step by Step' : 'Méthodologie — Étape par étape'}
          </h2>
          <div className="space-y-4">
            {data.steps.map((step, idx) => (
              <div
                key={idx}
                id={`step-${idx + 1}`}
                className="bg-white rounded-lg p-4 md:p-5 border border-background-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground-950 mb-1">
                      {isEn ? step.titleEn : step.title}
                    </h3>
                    <p className="text-sm text-foreground-600 leading-relaxed">
                      {isEn ? step.descriptionEn : step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RÉFÉRENCES RÉGLEMENTAIRES */}
        <section id="geo-references" className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Regulatory References' : 'Références réglementaires'}
          </h2>
          <div className="bg-background-50 rounded-lg p-5 md:p-6 border border-background-200">
            <ul className="space-y-2">
              {data.references.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-primary-600 mt-0.5">
                    <i className="ri-bookmark-line text-sm" />
                  </div>
                  <span className="text-sm text-foreground-700">
                    {isEn ? ref.textEn : ref.text}
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 hover:text-primary-700 ml-1 inline-flex items-center gap-1"
                      >
                        <i className="ri-external-link-line text-xs" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUESTIONS SIMILAIRES (People Also Ask) */}
        {data.peopleAlsoAsk && data.peopleAlsoAsk.length > 0 && (
          <section id="geo-paa" className="geo-paa mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
              {isEn ? 'People Also Ask' : 'Questions similaires'}
            </h2>
            <div className="space-y-3">
              {data.peopleAlsoAsk.map((paa, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-background-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenPaa(openPaa === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer"
                    aria-expanded={openPaa === idx}
                  >
                    <h3 className="text-base font-semibold text-foreground-950 pr-4">
                      {isEn ? paa.questionEn : paa.question}
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-background-100 text-foreground-600 transition-transform duration-200">
                      <i className={`ri-${openPaa === idx ? 'subtract' : 'add'}-line text-lg`} />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openPaa === idx ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <div className="px-4 md:px-5 pb-4 md:pb-5">
                      <p className="text-sm text-foreground-600 leading-relaxed">
                        {isEn ? paa.answerEn : paa.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="geo-faq" className="geo-faq mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Questions fréquemment posées'}
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 md:p-5 border border-background-200"
              >
                <h3 className="text-base font-semibold text-foreground-950 mb-2">
                  <span className="text-primary-600 mr-2">Q{idx + 1}.</span>
                  {isEn ? faq.questionEn : faq.question}
                </h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  {isEn ? faq.answerEn : faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10 md:mb-12">
          <div className="bg-background-950 rounded-lg p-6 md:p-8 text-white text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              {isEn ? data.ctaContextEn : data.ctaContextFr}
            </h2>
            <p className="text-foreground-200 mb-6 max-w-xl mx-auto">
              {isEn
                ? 'Book a free 30-minute strategic call. We will identify your priorities and send you a personalized roadmap within 48 hours.'
                : 'Réservez un appel stratégique gratuit de 30 minutes. Nous identifierons vos priorités et vous enverrons une roadmap personnalisée sous 48h.'}
            </p>
            <div className="flex justify-center">
              <PremiumCTA variant={data.ctaVariant} size="lg" />
            </div>
          </div>
        </section>

        {/* LIENS INTERNES */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Related Resources' : 'Ressources connexes'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.internalLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-background-200 hover:border-primary-300 hover:bg-background-50 transition-all duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-arrow-right-line text-sm" />
                </div>
                <span className="text-sm font-medium text-foreground-700">
                  {isEn ? link.labelEn : link.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* 🧠 GEO Speakable — Optimisation extraction IA (ChatGPT, Perplexity, Gemini, Claude) */}
      <SpeakableSchema
        sections={speakableSections}
        url={`/geo-hub/${data.slug}`}
      />
    </div>
  );
}