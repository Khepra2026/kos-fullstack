import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import BreadcrumbSchema from '@/components/feature/BreadcrumbSchema';
import { SeoHead } from '@/components/feature/SeoHead';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES } from '@/components/feature/OgImages';
import DecideursHero from '';
import DecideursProfiles from '';
import DecideursCTA from '';

const DecideursPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  const breadcrumbItems = [
    { label: currentLang === 'fr' ? 'Accueil' : 'Home', href: '/' },
    { label: currentLang === 'fr' ? 'Portail institutionnel' : 'Institutional Gateway', href: '/decideurs' }
  ];

  const breadcrumbSchemaItems = [
    { name: currentLang === 'fr' ? 'Accueil' : 'Home', item: '/' },
    { name: currentLang === 'fr' ? 'Portail institutionnel' : 'Institutional Gateway', item: '/decideurs' }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "KHEPRA EXPERTS",
        "url": SITE_URL,
        "logo": { 
          "@type": "ImageObject", 
          "url": LOGO_IMAGE_URL,
          "width": 250,
          "height": 60,
        },
        "founder": { "@id": `${SITE_URL}/about#founder` },
        "address": { 
          "@type": "PostalAddress", 
          "addressLocality": "Lomé", 
          "addressCountry": "TG" 
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+228-93-98-49-09",
          "contactType": "customer service",
          "email": "contact@khepraexperts.com",
          "areaServed": ["TG", "BJ", "CI", "BF", "SN", "GH"],
          "availableLanguage": ["French", "English"],
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/about#founder`,
        "name": "SIMDA Essoyomèwè",
        "jobTitle": currentLang === 'fr' 
          ? "Directeur Associé & Senior Consultant, KHEPRA EXPERTS"
          : "Managing Partner & Senior Consultant, KHEPRA EXPERTS",
        "url": `${SITE_URL}/about`,
        "sameAs": [
          "https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/",
          SITE_URL
        ],
        "worksFor": { "@id": `${SITE_URL}/#organization` },
        "knowsLanguage": ["fr", "en"],
        "alumniOf": [
          { "@type": "EducationalOrganization", "name": "Université de Lomé", "description": "Maîtrise 2003" },
          { "@type": "EducationalOrganization", "name": "Université Laval", "description": "MBA 2018" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/decideurs#webpage`,
        "url": `${SITE_URL}/decideurs`,
        "name": currentLang === 'fr' 
          ? "Portail d'accès institutionnel | KHEPRA EXPERTS" 
          : "Institutional Access Gateway | KHEPRA EXPERTS",
        "description": currentLang === 'fr'
          ? "Portail d'orientation vers des missions d'évaluation et d'accompagnement contractuelles. Entretien de qualification confidentiel pour dirigeants, investisseurs, institutions financières et ONG en Afrique."
          : "Guidance toward contractual evaluation and advisory engagements. Confidential qualification discussion for business leaders, investors, financial institutions and NGOs in Africa.",
        "inLanguage": currentLang === 'fr' ? "fr-FR" : "en-US",
        "isPartOf": { 
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
        },
        "breadcrumb": { "@id": `${SITE_URL}/decideurs#breadcrumb` },
        "author": { "@id": `${SITE_URL}/about#founder` },
        "publisher": { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/decideurs#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": currentLang === 'fr' ? "Accueil" : "Home", "item": SITE_URL },
          {
            "@type": "ListItem",
            "position": 2,
            "name": currentLang === 'fr' ? "Portail institutionnel" : "Institutional Gateway",
            "item": `${SITE_URL}/decideurs`
          }
        ]
      },
    ]
  };

  return (
    <>
      <SeoHead
        title={currentLang === 'fr' ? 'Portail d\'accès institutionnel | KHEPRA EXPERTS' : 'Institutional Access Gateway | KHEPRA EXPERTS'}
        description={currentLang === 'fr' 
          ? "Portail d'orientation vers des missions d'évaluation et d'accompagnement contractuelles. Entretien de qualification confidentiel pour dirigeants, investisseurs, institutions financières et ONG. Devis sur mesure."
          : "Guidance toward contractual evaluation and advisory engagements. Confidential qualification discussion for business leaders, investors, financial institutions and NGOs. Custom proposal."}
        keywords={currentLang === 'fr'
          ? "mission évaluation, accompagnement contractuel, entretien qualification, analyse stratégique, devis confidentiel, Afrique, BCEAO, COBAC, OHADA"
          : "evaluation mission, contractual advisory, qualification discussion, strategic analysis, confidential proposal, Africa, BCEAO, COBAC, OHADA"}
        canonicalPath="/decideurs"
        ogType="website"
        ogImage={OG_IMAGES.DECIDEURS}
        ogImageAlt={currentLang === 'fr' 
          ? "Portail d'accès institutionnel – KHEPRA EXPERTS | Missions d'évaluation et d'accompagnement"
          : "Institutional Access Gateway – KHEPRA EXPERTS | Evaluation and advisory engagements"}
        ogImageWidth="1200"
        ogImageHeight="630"
        ogLocale={currentLang === 'fr' ? 'fr_FR' : 'en_US'}
        structuredData={schemaData}
        hreflangLinks={STATIC_HREFLANG_MAP['/decideurs/']}
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Fil d'Ariane */}
        <div className="pt-20 bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
            <Breadcrumb
              variant="dark"
              items={breadcrumbItems}
            />
          </div>
        </div>

        <main>
          <DecideursHero />
          <DecideursProfiles />
          <DecideursCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DecideursPage;



