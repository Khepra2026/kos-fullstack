import { useEffect, memo, Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { fintechAdvisoryEcosystemStats, fintechAdvisoryServices, fintechAdvisoryRegulatoryItems, fintechAdvisoryFAQItems } from '@/mocks/pillarFintechAdvisory';

const Navigation = lazy(() => import('@/pages/home/components/Navigation'));
const Footer = lazy(() => import('@/pages/home/components/Footer'));
const ContextualCTA = lazy(() => import('@/components/feature/ContextualCTA'));
const InternalLinkingWidget = lazy(() => import('@/components/feature/InternalLinkingWidget'));
const SocialShareWidget = lazy(() => import('@/components/feature/SocialShareWidget'));

const NavSkeleton = memo(() => <div className="h-16 bg-background-50 animate-pulse" />);
const FooterSkeleton = memo(() => <div className="h-80 bg-background-100 animate-pulse" />);
const CTASkeleton = memo(() => <div className="h-40 bg-background-50 rounded-2xl animate-pulse" />);
const WidgetSkeleton = memo(() => <div className="h-20 bg-background-50 rounded-xl animate-pulse" />);

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

function EcosystemStats() {
  return (
    <div className="mb-16 bg-gradient-to-br from-background-100 to-background-50 rounded-2xl p-10">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">L'écosystème Fintech en Afrique</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {fintechAdvisoryEcosystemStats.map((item, i) => (
          <div key={i} className="bg-background-50 rounded-xl p-6 text-center border border-background-200">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className={`${item.icon} text-2xl text-accent-900`}></i>
            </div>
            <div className="text-3xl font-bold text-accent-700 mb-2">{item.stat}</div>
            <p className="text-sm text-foreground-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">Nos services de conseil Fintech</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {fintechAdvisoryServices.map((item, i) => (
          <div key={i} className="bg-background-50 rounded-xl p-6 border border-background-200 hover:border-accent-200 transition-colors">
            <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mb-4">
              <i className={`${item.icon} text-2xl text-background-50`}></i>
            </div>
            <h3 className="text-lg font-bold text-foreground-950 mb-2">{item.title}</h3>
            <p className="text-foreground-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegulatoryLandscape() {
  return (
    <div className="mb-16 bg-background-50 border border-background-200 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-foreground-950 mb-6">Cadre réglementaire Fintech en Afrique de l'Ouest</h2>
      <div className="space-y-4">
        {fintechAdvisoryRegulatoryItems.map((item, i) => (
          <div key={i} className={`border-l-4 ${item.color} bg-background-100 rounded-r-xl p-5`}>
            <h3 className="font-bold text-foreground-950 mb-1">{item.zone}</h3>
            <p className="text-sm text-foreground-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">FAQ — Fintech Advisory Africa</h2>
      <div className="space-y-4">
        {fintechAdvisoryFAQItems.map((faq, i) => (
          <div key={i} className="bg-background-50 border border-background-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground-950 mb-3">{faq.q}</h3>
            <p className="text-foreground-700 leading-relaxed text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTASection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <div className="bg-gradient-to-br from-accent-300 to-accent-500 rounded-2xl p-12 text-center text-background-50">
      <h2 className="text-3xl font-bold mb-4">Lancez ou accélérez votre Fintech</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-background-50/90">
        Nos experts vous accompagnent à chaque étape : stratégie, réglementation, financement et déploiement sur les marchés africains.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={onContactClick} className="px-10 py-4 bg-background-50 text-accent-700 rounded-lg font-bold hover:bg-background-100 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
          Demander un appel stratégique
        </button>
        <Link to="/resources" className="px-10 py-4 bg-accent-700 text-background-50 border-2 border-background-50 rounded-lg font-bold hover:bg-accent-800 transition-all whitespace-nowrap">
          Télécharger nos ressources
        </Link>
      </div>
    </div>
  );
}

export default function FintechAdvisoryAfricaPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pillar Content', href: '/pillar' },
    { label: 'Fintech Advisory Africa' },
  ];

  const visibleBreadcrumbItems = [
    { label: 'Home', href: '/', url: `${SITE_URL}/` },
    { label: 'Pillar Content', href: '/pillar', url: `${SITE_URL}/pillar` },
    { label: 'Fintech Advisory Africa', url: `${SITE_URL}/pillar/fintech-advisory-africa` },
  ];

  const goToContact = () => {
    navigate('/');
    setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pillar/fintech-advisory-africa#webpage`,
        url: `${SITE_URL}/pillar/fintech-advisory-africa`,
        name: 'Fintech Advisory Africa: Strategic Consulting for Fintech Innovation',
        description: 'Expert guide on fintech strategy, innovation, ecosystem development, and regulatory compliance across African markets.',
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'KHEPRA EXPERTS' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/pillar/fintech-advisory-africa#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Pillar Content', item: `${SITE_URL}/pillar` },
            { '@type': 'ListItem', position: 3, name: 'Fintech Advisory Africa' },
          ],
        },
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/fintech-advisory-africa#article`,
        headline: 'Fintech Advisory Africa: Strategic Consulting for Fintech Innovation',
        description: 'Expert guide on fintech strategy, innovation, ecosystem development, and regulatory compliance across African markets.',
        author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/pillar/fintech-advisory-africa#webpage` },
        keywords: 'fintech consulting Africa, fintech strategy, fintech innovation, fintech ecosystem, fintech regulation, BCEAO fintech, UEMOA fintech',
        articleSection: 'Fintech Advisory',
        inLanguage: 'en',
        wordCount: 3400,
        timeRequired: 'PT14M',
        educationalLevel: 'Professional',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pillar/fintech-advisory-africa#faq`,
        mainEntity: fintechAdvisoryFAQItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Fintech Advisory Africa | Strategy & Regulation | KHEPRA"
        description="Expert fintech consulting in Africa. Regulatory licensing BCEAO/COBAC, fintech strategy, fundraising, ecosystem development. 1,400+ active fintechs. Nigeria, Kenya, Senegal, Côte d'Ivoire expertise."
        keywords="fintech consulting Africa, fintech strategy, fintech innovation, fintech ecosystem, fintech regulation, BCEAO fintech, UEMOA fintech, fintech licensing, mobile money, digital payments Africa, fintech fundraising"
        canonicalPath="/pillar/fintech-advisory-africa"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGES.FINTECH_ADVISORY}
        ogImageAlt="Fintech Advisory Africa – KHEPRA EXPERTS | Strategic Consulting for Fintech Innovation"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="en_US"
        articlePublishedTime="2024-01-15T00:00:00Z"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Fintech Advisory"
        articleTags={['Fintech', 'Africa', 'BCEAO', 'UEMOA', 'Regulatory Compliance', 'Innovation', 'Startup']}
      />
      <div className="min-h-screen bg-background-50">
        <Suspense fallback={<NavSkeleton />}>
          <Navigation />
        </Suspense>

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="mt-8">
              <h1 className="text-4xl font-bold text-foreground-950 mb-6">
                Fintech Advisory Africa: Strategic Consulting for Fintech Innovation
              </h1>

              <p className="text-lg text-foreground-700 leading-relaxed mb-8">
                Expert fintech consulting across African markets. From regulatory licensing with BCEAO and COBAC to fundraising strategy, product development, and regional expansion — Khepra Experts brings 22+ years of financial advisory expertise to your fintech venture. We help startups and established players navigate the complex regulatory landscape of West and Central Africa, secure funding from specialized investors, and build scalable digital financial products.
              </p>

              <EcosystemStats />
              <ServicesGrid />
              <RegulatoryLandscape />
              <CTASection onContactClick={goToContact} />
              <div className="mt-16"><FAQSection /></div>
            </article>

            <div className="mt-12">
              <Suspense fallback={<WidgetSkeleton />}>
                <SocialShareWidget url={`${SITE_URL}/pillar/fintech-advisory-africa`} title="Fintech Advisory Africa: Strategic Consulting" />
              </Suspense>
            </div>

            <div className="mt-12">
              <Suspense fallback={<WidgetSkeleton />}>
                <InternalLinkingWidget tags={['FinTech', 'Transformation digitale', 'Inclusion financière']} category="Transformation digitale" limit={3} />
              </Suspense>
            </div>

            <div className="mt-12">
              <Suspense fallback={<CTASkeleton />}>
                <ContextualCTA variant="expert" title="Parlez à un expert Fintech" description="Réponse garantie sous 2h. Échange confidentiel et sans engagement sur votre projet fintech." />
              </Suspense>
            </div>
          </div>
        </main>

        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
        <ScrollToTop />
      </div>
    </>
  );
}