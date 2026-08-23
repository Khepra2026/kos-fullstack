import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function PrivacyPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/privacy#webpage`,
    name: currentLang === 'fr' ? 'Politique de Confidentialité — KHEPRA-KOS | KHEPRA EXPERTS' : 'Privacy Policy — KHEPRA-KOS | KHEPRA EXPERTS',
    description: currentLang === 'fr'
      ? 'Politique de confidentialité de KHEPRA-KOS et de KHEPRA EXPERTS. Protection des données personnelles, API YouTube, Google OAuth et conformité APDP Togo.'
      : 'Privacy policy of KHEPRA-KOS and KHEPRA EXPERTS. Personal data protection, YouTube API, Google OAuth and APDP Togo compliance.',
    url: `${SITE_URL}/privacy`,
    inLanguage: currentLang === 'fr' ? 'fr-FR' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
    },
  };

  return (
    <>
      <SeoHead
        title={currentLang === 'fr' ? 'Politique de Confidentialité — KHEPRA-KOS | KHEPRA EXPERTS' : 'Privacy Policy — KHEPRA-KOS | KHEPRA EXPERTS'}
        description={currentLang === 'fr'
          ? 'Politique de confidentialité de KHEPRA-KOS et de KHEPRA EXPERTS. Protection des données personnelles, API YouTube, Google OAuth et conformité APDP Togo.'
          : 'Privacy policy of KHEPRA-KOS and KHEPRA EXPERTS. Personal data protection, YouTube API, Google OAuth and APDP Togo compliance.'}
        keywords="KHEPRA-KOS, confidentialité, privacy, données personnelles, RGPD, KHEPRA EXPERTS, APDP Togo, YouTube API, Google OAuth, protection données Afrique"
        canonicalPath="/privacy/"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={privacySchema}
        datePublished="2026-01-01"
        dateModified={new Date().toISOString().split('T')[0]}
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main className="pt-0 pb-16">
          <div className="bg-background-100 border-b border-secondary-100 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <Breadcrumb
                variant="dark"
                items={[
                  { label: currentLang === 'fr' ? 'Accueil' : 'Home', href: '/' },
                  { label: currentLang === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {currentLang === 'fr' ? 'Politique de Confidentialité — KHEPRA-KOS' : 'Privacy Policy — KHEPRA-KOS'}
            </h1>

            {currentLang === 'fr' ? (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  KHEPRA EXPERTS, éditeur de l'application <strong>KHEPRA-KOS</strong>, s'engage à protéger la confidentialité et la sécurité de vos données à caractère personnel conformément à la <strong>Loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République Togolaise (APDP Togo)</strong>, aux directives de la CEDEAO sur la protection des données, et aux bonnes pratiques de gouvernance des données en zone UEMOA. La présente politique décrit comment nous collectons, utilisons et protégeons vos informations.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable du traitement</h2>
                  <p className="text-gray-700 mb-2"><strong>KHEPRA EXPERTS</strong> — SARL de droit OHADA, Lomé, République Togolaise</p>
                  <p className="text-gray-700 mb-2"><strong>Application :</strong> KHEPRA-KOS</p>
                  <p className="text-gray-700 mb-2"><strong>DPO :</strong> SIMDA Essoyomèwè — contact@khepraexperts.com</p>
                  <p className="text-gray-700 mb-2"><strong>Support utilisateur :</strong> essochamanu@gmail.com</p>
                  <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> +228 93 98 49 09 (Lun-Ven, 08h-18h GMT)</p>
                  <p className="text-gray-700 mb-2"><strong>Adresse :</strong> LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)</p>
                  <p className="text-gray-700 mb-2"><strong>RCCM :</strong> TG-LFW-01-2026-B13-01347</p>
                  <p className="text-gray-700 mb-2"><strong>NIF :</strong> 1002124216</p>
                  <p className="text-gray-700 mb-2"><strong>Page d'accueil :</strong> <a href="/kos" className="text-emerald-700 underline hover:text-emerald-900">https://khepraexperts.com/kos</a></p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>
                  <p className="text-gray-700 mb-4">Nous collectons les données personnelles suivantes :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Nom et prénom</li>
                    <li>Adresse email professionnelle</li>
                    <li>Numéro de téléphone</li>
                    <li>Dénomination sociale et secteur d'activité</li>
                    <li>Fonction et titre professionnel</li>
                    <li>Pays d'exercice</li>
                    <li>Données de navigation (cookies analytiques, adresse IP anonymisée)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation des API YouTube par KHEPRA-KOS</h2>
                  <p className="text-gray-700 mb-4">
                    L'application <strong>KHEPRA-KOS</strong> de KHEPRA EXPERTS utilise les services API de YouTube (YouTube Data API v3, YouTube Analytics API) dans le cadre de notre outil d'automatisation de production de contenu vidéo. Cette utilisation est strictement limitée aux finalités décrites ci-après et repose sur les autorisations explicites que vous accordez via le processus OAuth 2.0 de Google.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">Données YouTube collectées et traitées :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Métadonnées de votre chaîne YouTube (nom, description, identifiant de chaîne)</li>
                    <li>Métadonnées des vidéos téléversées (titres, descriptions, tags, miniatures)</li>
                    <li>Statistiques de performance des vidéos (vues, durée de visionnage, interactions) via YouTube Analytics API</li>
                    <li>Contenu vidéo téléversé sur votre chaîne YouTube par KHEPRA-KOS</li>
                    <li>Informations de playlist pour l'organisation automatique du contenu</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">Finalités du traitement YouTube :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Production automatisée de contenu vidéo éducatif et professionnel via le pipeline KHEPRA-KOS</li>
                    <li>Téléversement des vidéos générées sur votre chaîne YouTube connectée</li>
                    <li>Suivi des performances et analytics pour optimisation du contenu</li>
                    <li>Gestion des playlists et organisation du catalogue vidéo</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">Stockage et sécurité des données YouTube :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Toutes les données collectées via les API YouTube sont stockées localement dans notre base de données sécurisée Supabase, hébergée en Europe (région AWS Frankfurt — eu-central-1)</li>
                    <li>Les tokens d'accès OAuth 2.0 sont chiffrés au repos (AES-256-GCM) et en transit (TLS 1.3)</li>
                    <li>Les jetons de rafraîchissement sont stockés dans des secrets chiffrés accessibles uniquement par les fonctions Edge Functions sécurisées</li>
                    <li>Les vidéos générées sont temporairement stockées dans un bucket Supabase Storage avant téléversement, puis supprimées après confirmation de publication réussie</li>
                    <li>Aucune donnée YouTube n'est revendue, partagée avec des tiers, ni utilisée à des fins publicitaires ou de profilage</li>
                    <li>L'accès aux données YouTube est strictement limité au personnel technique autorisé de KHEPRA EXPERTS, sous accord de confidentialité</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">Révocation d'accès :</p>
                  <p className="text-gray-700">
                    Vous pouvez à tout moment révoquer l'accès de KHEPRA-KOS à votre compte Google depuis la page <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Google Security Permissions</a>. La révocation prend effet immédiatement. Toutes les données YouTube précédemment collectées seront supprimées de nos systèmes dans un délai maximal de 30 jours suivant la révocation, conformément aux politiques de conservation des données de Google.
                  </p>
                  <p className="text-gray-700 mt-4">
                    L'utilisation des services YouTube par KHEPRA-KOS est conforme aux <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Conditions d'utilisation de YouTube</a> et aux <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Règles de confidentialité Google</a>.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Comment nous protégeons vos données de compte Google</h2>
                  <p className="text-gray-700 mb-4">
                    La sécurité des données issues de votre compte Google est une priorité absolue pour KHEPRA EXPERTS. Nous mettons en œuvre les mesures techniques et organisationnelles suivantes :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Authentification OAuth 2.0 stricte :</strong> L'accès à votre chaîne YouTube est exclusivement autorisé via le protocole OAuth 2.0 de Google. Nous ne stockons jamais vos identifiants Google (nom d'utilisateur ou mot de passe)</li>
                    <li><strong>Principe du moindre privilège :</strong> KHEPRA-KOS ne demande que les portées (scopes) strictement nécessaires à ses fonctions de production vidéo (youtube.upload, youtube.readonly, yt-analytics.readonly)</li>
                    <li><strong>Chiffrement de bout en bout :</strong> Toutes les communications avec les API Google sont chiffrées via TLS 1.3. Les tokens OAuth sont chiffrés au repos avec AES-256-GCM</li>
                    <li><strong>Isolation des environnements :</strong> Les Edge Functions traitant les données YouTube s'exécutent dans un environnement isolé avec accès réseau restreint</li>
                    <li><strong>Journalisation et audit :</strong> Tous les accès aux API YouTube sont journalisés avec horodatage, permettant une traçabilité complète. Les logs sont conservés 12 mois</li>
                    <li><strong>Suppression programmée :</strong> Les données YouTube collectées sont automatiquement purgées selon des politiques de rétention strictes (30 jours après révocation d'accès)</li>
                    <li><strong>Formation du personnel :</strong> Tous les collaborateurs ayant accès aux données YouTube sont formés aux exigences de sécurité Google et aux règles internes de protection des données</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Finalités du traitement</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Répondre à vos demandes de contact et de diagnostic</li>
                    <li>Gestion de la relation client et suivi des missions de conseil</li>
                    <li>Envoi de notre newsletter (avec consentement préalable et explicite)</li>
                    <li>Amélioration de nos services et personnalisation des contenus</li>
                    <li>Respect de nos obligations légales et réglementaires, notamment en matière de LBC/FT (Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme)</li>
                    <li>Analyse statistique de l'utilisation du site (analytics anonymisés)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Base légale du traitement</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Votre consentement explicite et préalable (newsletter, cookies analytiques)</li>
                    <li>Exécution d'un contrat ou mesures précontractuelles (missions de conseil)</li>
                    <li>Intérêt légitime de KHEPRA EXPERTS (amélioration des services, sécurité)</li>
                    <li>Obligations légales en vertu du droit togolais, OHADA, UEMOA et GIABA/GABAC (LBC/FT)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Destinataires des données</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Membres de l'équipe KHEPRA EXPERTS (accès strictement limité au besoin)</li>
                    <li>Prestataires techniques (hébergement Vercel, outils d'emailing) — sous accord de sous-traitance confidentielle</li>
                    <li>Autorités compétentes togolaises et UEMOA en cas d'obligation légale</li>
                    <li>Aucune vente ni transmission de vos données à des tiers à des fins commerciales</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Durée de conservation</h2>
                  <p className="text-gray-700">
                    Vos données sont conservées pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la Loi APDP Togo 2019 et aux délais légaux applicables en zone UEMOA. Les données de prospects non convertis sont supprimées après 3 ans. Les données contractuelles sont conservées 10 ans (prescription OHADA).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Vos droits (Loi APDP Togo 2019)</h2>
                  <p className="text-gray-700 mb-4">Conformément à la Loi n° 2019-014 (APDP Togo), vous disposez des droits suivants :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification des données inexactes</li>
                    <li>Droit à l'effacement (droit à l'oubli)</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit d'opposition au traitement</li>
                    <li>Droit de retirer votre consentement à tout moment</li>
                    <li>Droit de déposer une réclamation auprès de l'APDP (Autorité de Protection des Données Personnelles du Togo)</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Pour exercer vos droits, contactez notre DPO : <strong>contact@khepraexperts.com</strong> — ou notre support utilisateur : <strong>essochamanu@gmail.com</strong> — réponse garantie sous 30 jours ouvrés.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cookies et traceurs</h2>
                  <p className="text-gray-700 mb-4">
                    Conformément à la Loi APDP Togo 2019, le dépôt de cookies non essentiels est soumis à votre consentement préalable. Notre site utilise des cookies analytiques (mesure d'audience) et fonctionnels (préférences de langue, session). Vous pouvez configurer vos préférences à tout moment via votre navigateur.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Sécurité des données</h2>
                  <p className="text-gray-700">
                    KHEPRA EXPERTS met en œuvre des mesures techniques et organisationnelles appropriées : chiffrement SSL/TLS des transmissions, contrôles d'accès stricts, hébergement sur infrastructure sécurisée (Vercel), formation du personnel à la protection des données. En cas de violation de données, l'APDP Togo sera notifiée dans les délais légaux.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Transferts internationaux</h2>
                  <p className="text-gray-700">
                    Certaines données peuvent être transférées vers des prestataires situés hors de la zone UEMOA (ex : hébergement Vercel/USA). Ces transferts sont encadrés par des clauses contractuelles types garantissant un niveau de protection équivalent aux exigences de la Loi APDP Togo 2019.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Liens légaux et conditions d'utilisation</h2>
                  <p className="text-gray-700 mb-4">
                    Pour consulter les autres documents légaux de KHEPRA-KOS :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><a href="/kos" className="text-emerald-700 underline hover:text-emerald-900">Page d'accueil de KHEPRA-KOS</a></li>
                    <li><a href="/terms" className="text-emerald-700 underline hover:text-emerald-900">Conditions d'utilisation de KHEPRA-KOS</a></li>
                    <li><a href="/legal" className="text-emerald-700 underline hover:text-emerald-900">Mentions légales</a></li>
                    <li><a href="/charte-deontologique" className="text-emerald-700 underline hover:text-emerald-900">Charte déontologique</a></li>
                  </ul>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Dernière mise à jour : 22 Juin 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} KHEPRA EXPERTS. Tous droits réservés — Lomé, Togo.</p>
                  <p className="text-sm text-gray-500 mt-1">Politique de confidentialité de KHEPRA-KOS — conforme à la Loi n° 2019-014 (APDP Togo) et aux directives CEDEAO sur la protection des données personnelles.</p>
                  <p className="text-sm text-gray-500 mt-1">Support utilisateur : essochamanu@gmail.com</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  KHEPRA EXPERTS, publisher of the <strong>KHEPRA-KOS</strong> application, is committed to protecting the privacy and security of your personal data in accordance with <strong>Togolese Law No. 2019-014 of October 29, 2019 on the protection of personal data (APDP Togo)</strong>, ECOWAS data protection directives, and best data governance practices in the UEMOA zone.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Controller</h2>
                  <p className="text-gray-700 mb-2"><strong>KHEPRA EXPERTS</strong> — OHADA SARL, Lomé, Republic of Togo</p>
                  <p className="text-gray-700 mb-2"><strong>Application:</strong> KHEPRA-KOS</p>
                  <p className="text-gray-700 mb-2"><strong>DPO contact:</strong> contact@khepraexperts.com</p>
                  <p className="text-gray-700 mb-2"><strong>User support:</strong> essochamanu@gmail.com</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +228 93 98 49 09 (Mon-Fri, 08:00-18:00 GMT)</p>
                  <p className="text-gray-700 mb-2"><strong>Homepage:</strong> <a href="/kos" className="text-emerald-700 underline hover:text-emerald-900">https://khepraexperts.com/kos</a></p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Collected</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Full name, professional email, phone number</li>
                    <li>Company name, sector, job title, country</li>
                    <li>Navigation data (anonymized analytics, cookies)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. YouTube API Usage by KHEPRA-KOS</h2>
                  <p className="text-gray-700 mb-4">
                    The <strong>KHEPRA-KOS</strong> application by KHEPRA EXPERTS uses YouTube API services (YouTube Data API v3, YouTube Analytics API) as part of our video content production automation tool. This usage is strictly limited to the purposes described below and relies on explicit permissions you grant through the Google OAuth 2.0 process.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">YouTube data collected and processed:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>YouTube channel metadata (name, description, channel ID)</li>
                    <li>Uploaded video metadata (titles, descriptions, tags, thumbnails)</li>
                    <li>Video performance statistics (views, watch time, engagement) via YouTube Analytics API</li>
                    <li>Video content uploaded to your YouTube channel by KHEPRA-KOS</li>
                    <li>Playlist information for automated content organization</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">Purposes of YouTube data processing:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Automated production of educational and professional video content via the KHEPRA-KOS pipeline</li>
                    <li>Uploading generated videos to your connected YouTube channel</li>
                    <li>Performance monitoring and analytics for content optimization</li>
                    <li>Playlist management and video catalog organization</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">YouTube data storage and security:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All data collected via YouTube APIs is stored locally in our secure Supabase database, hosted in Europe (AWS Frankfurt region — eu-central-1)</li>
                    <li>OAuth 2.0 access tokens are encrypted at rest (AES-256-GCM) and in transit (TLS 1.3)</li>
                    <li>Refresh tokens are stored in encrypted secrets accessible only by secure Edge Functions</li>
                    <li>Generated videos are temporarily stored in a Supabase Storage bucket before upload, then deleted after successful publication confirmation</li>
                    <li>No YouTube data is resold, shared with third parties, or used for advertising or profiling purposes</li>
                    <li>Access to YouTube data is strictly limited to authorized KHEPRA EXPERTS technical personnel under confidentiality agreements</li>
                  </ul>
                  <p className="text-gray-700 mb-4 font-semibold">Access revocation:</p>
                  <p className="text-gray-700">
                    You may revoke KHEPRA-KOS's access to your Google account at any time from the <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Google Security Permissions</a> page. Revocation takes effect immediately. All previously collected YouTube data will be deleted from our systems within a maximum of 30 days following revocation, in accordance with Google's data retention policies.
                  </p>
                  <p className="text-gray-700 mt-4">
                    KHEPRA-KOS's use of YouTube services complies with the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Google Privacy Policy</a>.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Protect Your Google Account Data</h2>
                  <p className="text-gray-700 mb-4">
                    The security of data from your Google account is an absolute priority for KHEPRA EXPERTS. We implement the following technical and organizational measures:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Strict OAuth 2.0 Authentication:</strong> Access to your YouTube channel is exclusively authorized through Google's OAuth 2.0 protocol. We never store your Google credentials (username or password)</li>
                    <li><strong>Principle of Least Privilege:</strong> KHEPRA-KOS only requests the scopes strictly necessary for its video production functions (youtube.upload, youtube.readonly, yt-analytics.readonly)</li>
                    <li><strong>End-to-End Encryption:</strong> All communications with Google APIs are encrypted via TLS 1.3. OAuth tokens are encrypted at rest with AES-256-GCM</li>
                    <li><strong>Environment Isolation:</strong> Edge Functions processing YouTube data run in an isolated environment with restricted network access</li>
                    <li><strong>Logging and Audit:</strong> All YouTube API accesses are logged with timestamps, enabling full traceability. Logs are retained for 12 months</li>
                    <li><strong>Scheduled Deletion:</strong> Collected YouTube data is automatically purged according to strict retention policies (30 days after access revocation)</li>
                    <li><strong>Staff Training:</strong> All personnel with access to YouTube data are trained on Google security requirements and internal data protection rules</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Processing Purposes</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Responding to contact and diagnostic requests</li>
                    <li>Client relationship management and mission follow-up</li>
                    <li>Newsletter (with prior explicit consent)</li>
                    <li>Legal obligations including AML/CFT (GIABA/GABAC compliance)</li>
                    <li>Anonymized site analytics</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (APDP Togo Law 2019)</h2>
                  <p className="text-gray-700 mb-4">Under Togolese Law No. 2019-014 (APDP Togo), you have the right to: access, rectify, erase, restrict processing, object to processing, and withdraw consent at any time. You may also file a complaint with the APDP (Togolese Data Protection Authority).</p>
                  <p className="text-gray-700">Contact our DPO: <strong>contact@khepraexperts.com</strong> — or user support: <strong>essochamanu@gmail.com</strong> — response within 30 business days.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Security</h2>
                  <p className="text-gray-700">SSL/TLS encryption, strict access controls, secure hosting (Vercel), staff training on data protection. Data breaches will be reported to APDP Togo within legal deadlines.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Legal Links and Terms of Use</h2>
                  <p className="text-gray-700 mb-4">
                    For other legal documents of KHEPRA-KOS:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><a href="/kos" className="text-emerald-700 underline hover:text-emerald-900">KHEPRA-KOS Homepage</a></li>
                    <li><a href="/terms" className="text-emerald-700 underline hover:text-emerald-900">KHEPRA-KOS Terms of Use</a></li>
                    <li><a href="/legal" className="text-emerald-700 underline hover:text-emerald-900">Legal Notice</a></li>
                    <li><a href="/charte-deontologique" className="text-emerald-700 underline hover:text-emerald-900">Ethical Charter</a></li>
                  </ul>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last updated: June 22, 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} KHEPRA EXPERTS. All rights reserved — Lomé, Togo.</p>
                  <p className="text-sm text-gray-500 mt-1">KHEPRA-KOS Privacy Policy — compliant with Togolese Law No. 2019-014 (APDP Togo) and ECOWAS data protection directives.</p>
                  <p className="text-sm text-gray-500 mt-1">User support: essochamanu@gmail.com</p>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}



