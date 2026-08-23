import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SFDHero } from '';
import { SFDServices } from '';
import { SFDForm } from '';
import { SeoHead } from '@/components/feature/SeoHead';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES } from '@/components/feature/OgImages';

const SFDConformitePage = () => {
  const { t, i18n } = useTranslation();
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';

  const sfdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+228-93-98-49-09',
          contactType: 'customer service',
          email: 'contact@khepraexperts.com',
          areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH', 'ML', 'NE', 'GW'],
          availableLanguage: ['French', 'English'],
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/sfd-conformite#service`,
        name: 'Accompagnement Conformité SFD – KHEPRA EXPERTS',
        description:
          "Service spécialisé d'accompagnement des Systèmes Financiers Décentralisés (SFD) pour leur mise en conformité réglementaire BCEAO dans l'espace UEMOA. Diagnostic, dossier d'agrément, procédures, formation et suivi post-agrément.",
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'Place',
          name: 'UEMOA (Union Économique et Monétaire Ouest Africaine)',
        },
        url: `${SITE_URL}/sfd-conformite`,
        serviceType: 'Conformité réglementaire SFD',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de conformité SFD',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Diagnostic de conformité BCEAO',
                description: 'Évaluation complète de la conformité réglementaire de votre SFD aux normes BCEAO/UEMOA.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Préparation du dossier d'agrément",
                description: "Constitution et dépôt du dossier d'agrément auprès des autorités compétentes.",
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mise en place des procédures internes',
                description: 'Élaboration des manuels de procédures, politiques de crédit et dispositifs de contrôle interne.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Formation du personnel',
                description: 'Formation des équipes aux exigences réglementaires BCEAO et aux bonnes pratiques de microfinance.',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/sfd-conformite#webpage`,
        url: `${SITE_URL}/sfd-conformite`,
        name: 'Conformité SFD BCEAO UEMOA – Accompagnement Expert | KHEPRA EXPERTS',
        description:
          "Accompagnement expert pour la mise en conformité réglementaire des SFD avec les normes BCEAO dans l'espace UEMOA. Diagnostic, agrément, procédures, formation. Cabinet KHEPRA EXPERTS, Lomé, Togo.",
        inLanguage: currentLang,
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Conformité SFD', item: `${SITE_URL}/sfd-conformite` },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "Quels sont les délais pour obtenir un agrément SFD ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Les délais varient selon le type de structure (6 à 12 mois en moyenne). KHEPRA EXPERTS vous accompagne à chaque étape pour optimiser ce processus.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le capital minimum requis pour un SFD ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le capital minimum varie selon la catégorie : 10 millions FCFA (catégorie 1), 50 millions FCFA (catégorie 2), 300 millions FCFA (catégorie 3). Nous vous aidons à déterminer la catégorie adaptée à votre projet.',
            },
          },
          {
            '@type': 'Question',
            name: "Comment KHEPRA EXPERTS peut-il m'aider pour la conformité SFD ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Nous offrons un accompagnement complet : diagnostic de conformité, préparation du dossier d'agrément, mise en place des procédures, formation du personnel, et suivi post-agrément.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quels pays de la zone UEMOA couvrez-vous ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "KHEPRA EXPERTS intervient dans tous les pays membres de l'UEMOA : Togo, Bénin, Côte d'Ivoire, Burkina Faso, Sénégal, Mali, Niger et Guinée-Bissau.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={t('sfdConformite.meta.title')}
        description={t('sfdConformite.meta.description')}
        keywords={t('sfdConformite.meta.keywords')}
        ogImage={OG_IMAGES.SFD_CONFORMITE}
        ogImageAlt="Conformité SFD BCEAO UEMOA – KHEPRA EXPERTS | Accompagnement réglementaire Afrique de l'Ouest"
        ogImageWidth="1200"
        ogImageHeight="630"
        canonicalPath="/sfd-conformite"
        structuredData={sfdSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/sfd-conformite/']}
        ogLocale="fr_FR"
      />
      <Navigation />
      <SFDHero />
      <SFDServices />
      <SFDForm />
      <Footer />
    </>
  );
};

export default SFDConformitePage;



