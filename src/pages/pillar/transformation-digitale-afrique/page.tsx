import { useEffect, Suspense, lazy, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { methodology, caseStudyResults, kpis, faqItems, breadcrumbItems, relatedPillars, SITE_URL, OG_IMAGE } from '@/mocks/pillarTransformationDigitale';

const Navigation = lazy(() => import('@/pages/home/components/Navigation').then(m => ({ default: m.Navigation })));
const Footer = lazy(() => import('@/pages/home/components/Footer').then(m => ({ default: m.Footer })));
const ScrollToTop = lazy(() => import('@/components/feature/ScrollToTop').then(m => ({ default: m.default })));
const ContextualCTA = lazy(() => import('@/components/feature/ContextualCTA'));
const SocialShareWidget = lazy(() => import('@/components/feature/SocialShareWidget').then(m => ({ default: m.SocialShareWidget })));

const visibleBreadcrumbItems = [
  { label: 'Accueil', href: '/', url: `${SITE_URL}/` },
  { label: 'Transformation Digitale Afrique', url: `${SITE_URL}/pillar/transformation-digitale-afrique` }
];

const schemaJson = {
  '@context': 'https://schema.org', '@graph': [{
    '@type': 'WebPage', '@id': `${SITE_URL}/pillar/transformation-digitale-afrique#webpage`, url: `${SITE_URL}/pillar/transformation-digitale-afrique`,
    name: 'Transformation Digitale en Afrique | FinTech Core Banking | Khepra Experts',
    description: 'Guide complet transformation digitale en Afrique : FinTech, agrément établissement paiement, core banking, open banking, mobile money, digitalisation PME.',
    inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
    breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Transformation Digitale Afrique' }] }
  }, {
    '@type': 'Article', '@id': `${SITE_URL}/pillar/transformation-digitale-afrique#article`,
    headline: 'Transformation Digitale en Afrique : FinTech, core banking et mobile money',
    description: 'Comment réussir sa transformation digitale en Afrique ? Guide : FinTech, agrément établissement paiement, core banking, open banking, mobile money.',
    author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
    datePublished: '2026-06-14', dateModified: '2026-06-15',
    keywords: 'transformation digitale banque, FinTech Afrique, agrément établissement paiement, open banking UEMOA, core banking, mobile money'
  }, {
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question', name: 'Comment obtenir un agrément d\'établissement de paiement en zone UEMOA ?',
      acceptedAnswer: { '@type': 'Answer', text: 'L\'agrément d\'établissement de paiement suit l\'instruction BCEAO 08-2015 : (1) Constitution d\'une société avec capital minimum 250M FCFA, (2) Dossier d\'agrément : business plan, programme d\'activité, actionnariat, dirigeants, (3) Enquête de moralité BCEAO, (4) Audit du SI et du dispositif de sécurité, (5) Obtention de l\'agrément (6-12 mois), (6) Mise en conformité continue (LBC/FT, protection données).' }
    }, { '@type': 'Question', name: 'Quels sont les bénéfices du core banking pour une banque africaine ?', acceptedAnswer: { '@type': 'Answer', text: 'Un core banking moderne apporte : (1) Réduction de 40-60% du coût par transaction, (2) Time-to-market réduit pour nouveaux produits (semaines vs mois), (3) Architecture API-first permettant l\'open banking, (4) Conformité réglementaire automatisée (reporting BCEAO), (5) Résilience et disponibilité 99,99%, (6) Expérience client omnicanale unifiée.' }
    }, { '@type': 'Question', name: 'Comment intégrer le mobile money dans une stratégie bancaire africaine ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'intégration du mobile money suit 4 axes : (1) Partenariat avec les opérateurs (Orange Money, MTN MoMo, Wave), (2) Interopérabilité via GIM-UEMOA, (3) Produits hybrides compte bancaire + wallet mobile, (4) Conformité KYC digitale et plafonds réglementaires BCEAO. Le marché du mobile money en Afrique de l\'Ouest pèse 40 Mds USD de transactions/an.' }
    }]
  }]
};

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-background-200/60 rounded ${className}`}></div>;
}

const NavSkeleton = memo(function NavSkeleton() {
  return (
    <div className="h-16 bg-background-50/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-background-200/60">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="w-32 h-6 bg-background-200/70 rounded animate-pulse"></div>
      </div>
    </div>
  );
});

const FooterSkeleton = memo(function FooterSkeleton() {
  return (
    <div className="bg-background-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonBlock className="w-24 h-5" />
              <SkeletonBlock className="w-36 h-3" />
              <SkeletonBlock className="w-28 h-3" />
              {i === 0 && <SkeletonBlock className="w-32 h-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const CTASkeleton = memo(function CTASkeleton() {
  return (
    <div className="mt-12 bg-background-100 rounded-2xl p-10 animate-pulse">
      <SkeletonBlock className="w-64 h-6 mb-3 mx-auto" />
      <SkeletonBlock className="w-80 h-4 mx-auto" />
    </div>
  );
});

const ShareSkeleton = memo(function ShareSkeleton() {
  return (
    <div className="mt-12 flex items-center gap-4">
      <SkeletonBlock className="w-24 h-4" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="w-9 h-9 rounded-full" />
        ))}
      </div>
    </div>
  );
});

function MethodologySection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">Notre méthodologie en 5 phases</h2>
      <div className="space-y-5">
        {methodology.map((item, i) => (
          <div key={i} className="bg-background-50 border-l-4 border-primary-500 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className={`${item.icon} text-2xl text-primary-600`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-foreground-950">{item.phase}</h3>
                  <span className="text-sm font-semibold text-primary-700 bg-primary-100 px-3 py-1 rounded-full whitespace-nowrap">{item.duration}</span>
                </div>
                <ul className="space-y-2 mt-3">
                  {item.items.map((li, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground-700">
                      <i className="ri-checkbox-circle-line text-primary-600 mt-1 flex-shrink-0"></i>
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
    <div className="mb-16 bg-background-50 border border-background-200/60 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-foreground-950 mb-6">Cas client — Banque UEMOA, migration core banking</h2>
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-foreground-950 mb-2 flex items-center gap-2">
            <i className="ri-building-line text-primary-600"></i>Contexte
          </h4>
          <p className="text-foreground-700 leading-relaxed">Banque régionale, 4 pays, 600 000 clients. Core banking legacy depuis 2008. Pas de mobile banking. 3 semaines pour lancer un nouveau produit. Coûts IT = 22% des frais généraux.</p>
        </div>
        <div className="bg-primary-50/60 rounded-lg p-6">
          <h4 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-trophy-line text-primary-600"></i>Résultats après 18 mois
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {caseStudyResults.map((item, i) => (
              <div key={i} className="bg-background-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">{item.value}</div>
                <p className="text-sm text-foreground-600 mt-1">{item.label}</p>
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
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">KPIs Transformation Digitale</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-background-50 border border-background-100 rounded-xl p-5">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className={`${item.icon} text-xl text-primary-600`}></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-foreground-950 mb-1 text-sm">{item.kpi}</h3>
              <p className="text-sm font-semibold text-primary-600 mb-1">{item.target}</p>
              <p className="text-xs text-foreground-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedPillarsSection() {
  return (
    <div className="mb-16 bg-background-100 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-foreground-950 mb-6">Ressources connexes</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {relatedPillars.map((item, i) => (
          <Link key={i} to={item.url} className="bg-background-50 rounded-xl p-5 border border-background-100 hover:border-primary-200 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
              <i className={`${item.icon} text-xl text-primary-600`}></i>
            </div>
            <h4 className="font-bold text-foreground-950 mb-1">{item.title}</h4>
            <p className="text-sm text-foreground-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground-950 mb-8">FAQ — Transformation Digitale</h2>
      <div className="space-y-4">
        {faqItems.map((faq, i) => (
          <div key={i} className="bg-background-50 border border-background-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground-950 mb-3">{faq.q}</h3>
            <p className="text-foreground-700 leading-relaxed text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorSection() {
  return (
    <div className="mb-16 bg-gradient-to-r from-background-100 to-primary-50 rounded-2xl p-8">
      <div className="flex items-start gap-6 flex-col sm:flex-row">
        <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-user-star-line text-3xl text-background-50"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground-950 mb-2">Rédigé par Khepra Experts</h3>
          <p className="text-foreground-700 leading-relaxed mb-3 text-sm">Cabinet basé à <strong>Lomé depuis 2003</strong>. 15+ projets de transformation digitale en Afrique : core banking, mobile money, agrément établissement de paiement, open banking. Accompagnement de bout en bout — stratégie, sélection, déploiement.</p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-background-50 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-phone-line"></i>+228 93 98 49 09
            </a>
            <a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-background-50 border border-primary-500 text-primary-600 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-mail-line"></i>contact@khepraexperts.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsletterSection() {
  return (
    <div className="bg-background-50 border-2 border-primary-500 rounded-2xl p-10 text-center mb-16">
      <h2 className="text-2xl font-bold text-foreground-950 mb-3">Newsletter Transformation Digitale</h2>
      <p className="text-foreground-600 mb-6 text-sm">Analyses sur la FinTech, le mobile money et la digitalisation bancaire en Afrique.</p>
      <form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
        <input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-background-200 text-sm focus:outline-none focus:border-primary-500" />
        <button type="submit" className="px-6 py-3 bg-primary-500 text-background-50 rounded-lg font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-sm">S&apos;abonner</button>
      </form>
    </div>
  );
}

function FinalCTA() {
  const navigate = useNavigate();
  const goToContact = () => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); };

  return (
    <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-12 text-center text-background-50">
      <h2 className="text-3xl font-bold mb-4">Prêt à accélérer votre transformation digitale ?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent de la stratégie au déploiement de votre core banking et de vos services digitaux.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={goToContact} className="px-10 py-4 bg-background-50 text-primary-600 rounded-lg font-bold hover:bg-background-100 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">Prendre rendez-vous</button>
        <a href="tel:+22893984909" className="px-10 py-4 bg-primary-600 text-background-50 border-2 border-background-50 rounded-lg font-bold hover:bg-primary-700 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a>
      </div>
    </div>
  );
}

export default function TransformationDigitaleAfriquePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead title="Transformation Digitale Afrique | FinTech Core Banking"
        description="Guide complet transformation digitale en Afrique : FinTech, agrément établissement paiement, core banking, open banking, mobile money. Khepra Experts Lomé."
        keywords="transformation digitale banque, FinTech Afrique, agrément établissement paiement, open banking UEMOA, core banking, mobile money Afrique"
        canonicalPath="/pillar/transformation-digitale-afrique" ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Consultants Khepra Experts en transformation digitale pour institutions financières africaines" ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-15T00:00:00Z" articleAuthor="Khepra Experts" articleSection="Transformation Digitale"
        articleTags={['Transformation Digitale', 'FinTech', 'Core Banking', 'Mobile Money', 'Open Banking', 'Afrique']} />

      <div className="min-h-screen bg-background-50">
        <Suspense fallback={<NavSkeleton />}>
          <Navigation />
        </Suspense>

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-foreground-950 mb-6">Transformation Digitale en Afrique</h1>
              <p className="text-xl text-foreground-700 mb-8 leading-relaxed">
                Comment réussir sa <strong>transformation digitale</strong> dans le secteur financier africain ? Khepra Experts accompagne les banques, SFD et FinTechs dans leur modernisation : core banking, mobile money, agrément établissement de paiement, open banking.
              </p>

              <div className="mb-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-foreground-950 mb-6">La révolution digitale du secteur financier africain</h2>
                <p className="text-foreground-700 leading-relaxed mb-6">
                  L&apos;Afrique est le plus grand marché de <strong>mobile money</strong> au monde — 40 Mds USD de transactions annuelles en zone UEMOA. Les FinTechs captent 15% des revenus bancaires traditionnels. Les régulateurs — <strong>BCEAO, COBAC</strong> — encouragent l&apos;innovation via les bacs à sable réglementaires et les agréments d&apos;établissement de paiement.
                </p>
                <p className="text-foreground-700 leading-relaxed">
                  Khepra Experts a piloté la transformation digitale de <strong>15+ institutions financières</strong> en Afrique, du diagnostic stratégique au déploiement du core banking.
                </p>
              </div>

              <MethodologySection />
              <CaseStudySection />
              <KPISection />
              <RelatedPillarsSection />
              <AuthorSection />
              <FAQSection />
              <NewsletterSection />
              <FinalCTA />
            </article>

            <Suspense fallback={<ShareSkeleton />}>
              <div className="mt-12">
                <SocialShareWidget url={`${SITE_URL}/pillar/transformation-digitale-afrique`} title="Transformation Digitale en Afrique" />
              </div>
            </Suspense>

            <Suspense fallback={<CTASkeleton />}>
              <div className="mt-12">
                <ContextualCTA variant="diagnostic" title="Diagnostic digital gratuit" description="30 minutes avec un expert Khepra pour évaluer votre maturité digitale" />
              </div>
            </Suspense>
          </div>
        </main>

        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      </div>
    </>
  );
}