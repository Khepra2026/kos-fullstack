import { useEffect, memo, Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { pmeCroissanceEcosystemIntro, pmeCroissanceMethodology, pmeCroissanceCaseStudy, pmeCroissanceKPIs, pmeCroissanceRelatedResources, pmeCroissanceFAQItems, pmeCroissanceOGImage } from '@/mocks/pillarPMECroissance';

const Navigation = lazy(() => import('@/pages/home/components/Navigation'));
const Footer = lazy(() => import('@/pages/home/components/Footer'));
const ContextualCTA = lazy(() => import('@/components/feature/ContextualCTA'));
const SocialShareWidget = lazy(() => import('@/components/feature/SocialShareWidget'));

const NavSkeleton = memo(() => <div className="h-16 bg-background-50 animate-pulse" />);
const FooterSkeleton = memo(() => <div className="h-80 bg-background-100 animate-pulse" />);
const CTASkeleton = memo(() => <div className="h-40 bg-background-50 rounded-2xl animate-pulse" />);
const WidgetSkeleton = memo(() => <div className="h-20 bg-background-50 rounded-xl animate-pulse" />);

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

function EcosystemSection() {
  return (
    <div className="mb-16 bg-gradient-to-br from-background-100 to-background-50 rounded-2xl p-10">
      <h2 className="text-3xl font-bold text-foreground-950 mb-6">{pmeCroissanceEcosystemIntro.title}</h2>
      <p className="text-foreground-700 leading-relaxed mb-6">{pmeCroissanceEcosystemIntro.text1}</p>
      <p className="text-foreground-700 leading-relaxed">{pmeCroissanceEcosystemIntro.text2}</p>
    </div>
  );
}

function MethodologySection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">Notre méthodologie en 5 phases</h2>
      <div className="space-y-6">
        {pmeCroissanceMethodology.map((item, i) => (
          <div key={i} className="bg-background-50 border-l-4 border-secondary-500 rounded-lg p-6 border border-background-200 border-l-secondary-500 hover:border-secondary-300 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className={`${item.icon} text-2xl text-secondary-700`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-foreground-950">{item.phase}</h3>
                  <span className="text-sm font-semibold text-secondary-700 bg-secondary-100 px-3 py-1 rounded-full">{item.duration}</span>
                </div>
                <ul className="space-y-2 mt-3">
                  {item.items.map((li, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground-700">
                      <i className="ri-checkbox-circle-line text-secondary-600 mt-1 flex-shrink-0"></i>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudySection() {
  return (
    <div className="mb-16 bg-background-50 border border-background-200 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-foreground-950 mb-6">Cas client — PME logistique au Togo</h2>
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-foreground-950 mb-2 flex items-center gap-2">
            <i className="ri-building-line text-secondary-600"></i>Contexte
          </h4>
          <p className="text-foreground-700 leading-relaxed">{pmeCroissanceCaseStudy.context}</p>
        </div>
        <div className="bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-lg p-6">
          <h4 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-trophy-line text-secondary-600"></i>Résultats après 18 mois
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {pmeCroissanceCaseStudy.results.map((r, i) => (
              <div key={i} className="bg-background-50 rounded-lg p-4 text-center border border-background-200">
                <div className="text-2xl font-bold text-secondary-700">{r.value}</div>
                <p className="text-sm text-foreground-600">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPISection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">KPIs PME</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {pmeCroissanceKPIs.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-background-50 border border-background-100 rounded-xl p-5 hover:border-secondary-200 transition-colors">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className={`${item.icon} text-xl text-secondary-600`}></i>
            </div>
            <div>
              <h3 className="font-bold text-foreground-950 mb-1">{item.kpi}</h3>
              <p className="text-sm font-semibold text-secondary-700 mb-1">{item.target}</p>
              <p className="text-sm text-foreground-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedResources() {
  return (
    <div className="mb-16 bg-background-100 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-foreground-950 mb-6">Ressources connexes</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {pmeCroissanceRelatedResources.map((res, i) => (
          <Link key={i} to={res.href} className="bg-background-50 rounded-xl p-5 border border-background-200 hover:border-secondary-200 transition-all">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
              <i className={`${res.icon} text-xl text-secondary-600`}></i>
            </div>
            <h4 className="font-bold text-foreground-950 mb-1">{res.title}</h4>
            <p className="text-sm text-foreground-600">{res.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">FAQ — PME Afrique</h2>
      <div className="space-y-4">
        {pmeCroissanceFAQItems.map((faq, i) => (
          <div key={i} className="bg-background-50 border border-background-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground-950 mb-3">{faq.q}</h3>
            <p className="text-foreground-700 leading-relaxed text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorBlock() {
  return (
    <div className="mb-16 bg-gradient-to-r from-background-100 to-secondary-100/80 rounded-2xl p-8">
      <div className="flex items-start gap-6 flex-col sm:flex-row">
        <div className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-user-star-line text-3xl text-background-50"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground-950 mb-2">Rédigé par Khepra Experts</h3>
          <p className="text-foreground-700 leading-relaxed mb-3">
            Cabinet basé à <strong>Lomé depuis 2003</strong>. Plus de 600 PME accompagnées en Afrique de l'Ouest : diagnostic stratégique, business plan, levée de fonds, optimisation fiscale, digitalisation. Présent dans 20+ pays africains.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-secondary-600 transition-colors">
              <i className="ri-phone-line"></i>+228 93 98 49 09
            </a>
            <a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-background-50 border border-secondary-500 text-secondary-700 rounded-lg text-sm font-semibold hover:bg-secondary-50 transition-colors">
              <i className="ri-mail-line"></i>contact@khepraexperts.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalCTA({ onContactClick }: { onContactClick: () => void }) {
  return (
    <div className="bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-2xl p-12 text-center text-background-50">
      <h2 className="text-3xl font-bold mb-4">Prêt à accélérer la croissance de votre PME ?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-background-50/90">
        Nos experts vous accompagnent de la stratégie au financement, avec une méthodologie éprouvée sur 600+ PME.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={onContactClick} className="px-10 py-4 bg-background-50 text-secondary-700 rounded-lg font-bold hover:bg-background-100 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
          Prendre rendez-vous
        </button>
        <a href="tel:+22893984909" className="px-10 py-4 bg-secondary-700 text-background-50 border-2 border-background-50 rounded-lg font-bold hover:bg-secondary-800 transition-all whitespace-nowrap">
          Appeler +228 93 98 49 09
        </a>
      </div>
    </div>
  );
}

function NewsletterBlock() {
  return (
    <div className="bg-background-50 border-2 border-secondary-500 rounded-2xl p-10 text-center mb-16">
      <h2 className="text-2xl font-bold text-foreground-950 mb-3">Newsletter PME Afrique</h2>
      <p className="text-foreground-600 mb-6">Conseils financement, croissance, fiscalité et digitalisation pour PME africaines.</p>
      <form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
        <input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-background-200 text-sm focus:outline-none focus:border-secondary-500 bg-background-50" />
        <button type="submit" className="px-6 py-3 bg-secondary-500 text-background-50 rounded-lg font-semibold hover:bg-secondary-600 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button>
      </form>
    </div>
  );
}

export default function PMEAfriqueCroissancePage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'PME Afrique Croissance' },
  ];

  const visibleBreadcrumbItems = [
    { label: 'Accueil', href: '/', url: `${SITE_URL}/` },
    { label: 'PME Afrique Croissance', url: `${SITE_URL}/pillar/pme-afrique-croissance` },
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
        '@id': `${SITE_URL}/pillar/pme-afrique-croissance#webpage`,
        url: `${SITE_URL}/pillar/pme-afrique-croissance`,
        name: 'PME Afrique Croissance | Financement Fiscalité Digitalisation | Khepra Experts',
        description: 'Guide complet pour les PME en Afrique : financement, croissance, fiscalité, digitalisation, accès au marché. Khepra Experts Lomé — 22 ans d\'expertise.',
        inLanguage: 'fr',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'PME Afrique Croissance' },
          ],
        },
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/pme-afrique-croissance#article`,
        headline: 'PME Afrique : guide complet pour la croissance, le financement et la digitalisation',
        description: 'Comment accélérer la croissance de votre PME en Afrique ? Guide complet : financement, fiscalité OHADA, digitalisation, accès au marché, entrepreneuriat.',
        author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        datePublished: '2026-06-14',
        dateModified: '2026-06-15',
        keywords: 'PME Afrique financement, croissance PME UEMOA, fiscalité PME, digitalisation PME Afrique, entrepreneuriat Afrique',
      },
      {
        '@type': 'FAQPage',
        mainEntity: pmeCroissanceFAQItems.map((item) => ({
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
        title="PME Afrique | Croissance Financement Digitalisation | Khepra"
        description="Guide complet pour PME en Afrique : financement, croissance, fiscalité OHADA, digitalisation, accès au marché. Khepra Experts Lomé — 22 ans d'expertise."
        keywords="PME Afrique financement, croissance PME UEMOA, fiscalité PME, digitalisation PME Afrique, entrepreneuriat Afrique"
        canonicalPath="/pillar/pme-afrique-croissance"
        ogType="article"
        structuredData={schemaJson}
        ogImage={pmeCroissanceOGImage}
        ogImageAlt="Dirigeants de PME africaines en session de stratégie croissance avec Khepra Experts"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z"
        articleModifiedTime="2026-06-15T00:00:00Z"
        articleAuthor="Khepra Experts"
        articleSection="PME Afrique"
        articleTags={['PME', 'Afrique', 'Croissance', 'Financement', 'Fiscalité', 'Digitalisation']}
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
                PME Afrique : Croissance, Financement & Digitalisation
              </h1>

              <p className="text-xl text-foreground-700 mb-8 leading-relaxed">
                Comment <strong>accélérer la croissance de votre PME</strong> en Afrique ? Khepra Experts accompagne les PME africaines sur 5 piliers : financement, croissance, fiscalité, digitalisation et accès au marché. Une méthodologie éprouvée sur 22 ans.
              </p>

              <EcosystemSection />
              <MethodologySection />
              <CaseStudySection />
              <KPISection />
              <RelatedResources />
              <AuthorBlock />
              <FAQSection />
              <NewsletterBlock />
              <FinalCTA onContactClick={goToContact} />
            </article>

            <div className="mt-12">
              <Suspense fallback={<WidgetSkeleton />}>
                <SocialShareWidget url={`${SITE_URL}/pillar/pme-afrique-croissance`} title="PME Afrique Croissance" />
              </Suspense>
            </div>

            <div className="mt-12">
              <Suspense fallback={<CTASkeleton />}>
                <ContextualCTA variant="diagnostic" title="Diagnostic PME gratuit" description="30 minutes avec un expert Khepra pour identifier vos leviers de croissance" />
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