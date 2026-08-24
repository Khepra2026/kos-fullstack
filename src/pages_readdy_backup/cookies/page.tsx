import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function CookiesPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/cookies#webpage`,
    name: isEn ? 'Cookie Policy — KHEPRA EXPERTS' : 'Politique des Cookies — KHEPRA EXPERTS',
    description: isEn
      ? 'Cookie policy and tracker usage on khepraexperts.com. Compliant with APDP Togo and GDPR.'
      : 'Politique des cookies et traceurs sur khepraexperts.com. Conforme à la Loi APDP Togo et au RGPD.',
    url: `${SITE_URL}/cookies`,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS' },
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Cookie Policy — KHEPRA EXPERTS' : 'Politique des Cookies — KHEPRA EXPERTS'}
        description={isEn
          ? 'Cookie policy and tracker usage on khepraexperts.com. Compliant with APDP Togo and GDPR.'
          : 'Politique des cookies et traceurs sur khepraexperts.com. Conforme à la Loi APDP Togo et au RGPD.'}
        keywords="cookies, traceurs, politique cookies, APDP Togo, RGPD, consentement, KHEPRA EXPERTS"
        canonicalPath="/cookies"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={schema}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-0 pb-16">
          <div className="bg-gray-50 border-b border-gray-100 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <Breadcrumb
                variant="dark"
                items={[
                  { label: isEn ? 'Home' : 'Accueil', href: '/' },
                  { label: isEn ? 'Cookie Policy' : 'Politique des cookies' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {isEn ? 'Cookie Policy' : 'Politique des Cookies'}
            </h1>

            {isEn ? (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  This cookie policy explains how KHEPRA EXPERTS uses cookies and trackers on khepraexperts.com. It is compliant with the Togolese Law No. 2019-014 (APDP Togo) and the European GDPR.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What is a cookie?</h2>
                  <p className="text-gray-700">
                    A cookie is a small text file placed on your device when you visit a website. It allows the site to recognize your device and store information about your preferences or past actions.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of cookies we use</h2>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">Necessary cookies</h3>
                      <p className="text-sm text-emerald-800">Essential for the site to function properly. They enable security features, authentication, and language preferences. These cookies cannot be disabled.</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-amber-900 mb-2">Analytics cookies</h3>
                      <p className="text-sm text-amber-800">Help us understand how visitors interact with the site by collecting and reporting information anonymously. Subject to your consent.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">Functional cookies</h3>
                      <p className="text-sm text-blue-800">Enable enhanced functionality and personalization, such as remembering your preferences or chat settings. Subject to your consent.</p>
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-rose-900 mb-2">Marketing cookies</h3>
                      <p className="text-sm text-rose-800">Used to track visitors across websites to deliver relevant content and measure the effectiveness of our communications. Subject to your consent.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-party cookies</h2>
                  <p className="text-gray-700 mb-4">We do not use third-party advertising cookies. The only external services we use are:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Supabase</strong> — Database and authentication (secure hosting)</li>
                    <li><strong>Google Fonts</strong> — Typography loading (no tracking)</li>
                    <li><strong>Readdy AI</strong> — Image hosting and form processing</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookie duration</h2>
                  <p className="text-gray-700">
                    Session cookies are deleted when you close your browser. Persistent cookies remain for a maximum of 13 months, in accordance with the recommendations of the CNIL and the APDP Togo.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing your consent</h2>
                  <p className="text-gray-700 mb-4">You can manage your cookie preferences at any time by clicking the "Cookie settings" button at the bottom of the page. You can also configure your browser to block cookies:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your rights</h2>
                  <p className="text-gray-700">Under the APDP Togo law and the GDPR, you have the right to access, rectify, and delete your data. You can exercise these rights by contacting our DPO at contact@khepraexperts.com.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
                  <p className="text-gray-700">For any questions about this cookie policy: contact@khepraexperts.com — +228 93 98 49 09</p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last updated: May 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© 2026 KHEPRA EXPERTS. All rights reserved — Lomé, Togo.</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  La présente politique des cookies explique comment KHEPRA EXPERTS utilise les cookies et traceurs sur khepraexperts.com. Elle est conforme à la Loi n° 2019-014 du 29 octobre 2019 (APDP Togo) et au Règlement Général sur la Protection des Données (RGPD) européen.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
                  <p className="text-gray-700">
                    Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site web. Il permet au site de reconnaître votre appareil et de stocker des informations sur vos préférences ou vos actions passées.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types de cookies utilisés</h2>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">Cookies nécessaires</h3>
                      <p className="text-sm text-emerald-800">Essentiels au bon fonctionnement du site. Ils permettent la sécurité, l'authentification et les préférences de langue. Ces cookies ne peuvent pas être désactivés.</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-amber-900 mb-2">Cookies analytiques</h3>
                      <p className="text-sm text-amber-800">Nous aident à comprendre comment les visiteurs interagissent avec le site en collectant et rapportant des informations de manière anonyme. Sous réserve de votre consentement.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">Cookies fonctionnels</h3>
                      <p className="text-sm text-blue-800">Permettent des fonctionnalités améliorées et la personnalisation, comme la mémorisation de vos préférences ou des paramètres de chat. Sous réserve de votre consentement.</p>
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-rose-900 mb-2">Cookies marketing</h3>
                      <p className="text-sm text-rose-800">Utilisés pour suivre les visiteurs à travers les sites afin de diffuser du contenu pertinent et mesurer l'efficacité de nos communications. Sous réserve de votre consentement.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies tiers</h2>
                  <p className="text-gray-700 mb-4">Nous n'utilisons pas de cookies publicitaires tiers. Les seuls services externes utilisés sont :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Supabase</strong> — Base de données et authentification (hébergement sécurisé)</li>
                    <li><strong>Google Fonts</strong> — Chargement de la typographie (sans tracking)</li>
                    <li><strong>Readdy AI</strong> — Hébergement d'images et traitement des formulaires</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Durée de conservation des cookies</h2>
                  <p className="text-gray-700">
                    Les cookies de session sont supprimés lorsque vous fermez votre navigateur. Les cookies persistants restent stockés pour une durée maximale de 13 mois, conformément aux recommandations de la CNIL et de l'APDP Togo.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Gestion de votre consentement</h2>
                  <p className="text-gray-700 mb-4">Vous pouvez gérer vos préférences cookies à tout moment en cliquant sur le bouton « Paramètres cookies » en bas de page. Vous pouvez également configurer votre navigateur pour bloquer les cookies :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                    <li><strong>Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies</li>
                    <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                    <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Vos droits</h2>
                  <p className="text-gray-700">Conformément à la loi APDP Togo et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez exercer ces droits en contactant notre DPO : contact@khepraexperts.com.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
                  <p className="text-gray-700">Pour toute question relative à cette politique des cookies : contact@khepraexperts.com — +228 93 98 49 09</p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Dernière mise à jour : Mai 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© 2026 KHEPRA EXPERTS. Tous droits réservés — Lomé, Togo.</p>
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



