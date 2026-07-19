import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function CGUPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/cgu#webpage`,
    name: isEn ? 'Terms of Service — KHEPRA EXPERTS' : 'Conditions Générales d\'Utilisation — KHEPRA EXPERTS',
    description: isEn
      ? 'Terms of service for the use of khepraexperts.com website and services.'
      : 'Conditions générales d\'utilisation du site khepraexperts.com et de ses services.',
    url: `${SITE_URL}/cgu`,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS' },
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Terms of Service — KHEPRA EXPERTS' : 'Conditions Générales d\'Utilisation — KHEPRA EXPERTS'}
        description={isEn
          ? 'Terms of service for the use of khepraexperts.com website and services.'
          : 'Conditions générales d\'utilisation du site khepraexperts.com et de ses services.'}
        keywords="CGU, conditions générales, utilisation, KHEPRA EXPERTS, OHADA, APDP Togo, services conseil Afrique"
        canonicalPath="/cgu"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={schema}
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main className="pt-0 pb-16">
          <div className="bg-background-100 border-b border-secondary-100 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <Breadcrumb
                variant="dark"
                items={[
                  { label: isEn ? 'Home' : 'Accueil', href: '/' },
                  { label: isEn ? 'Terms of Service' : 'CGU' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {isEn ? 'Terms of Service' : 'Conditions Générales d\'Utilisation'}
            </h1>

            {isEn ? (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  These Terms of Service govern the use of the website khepraexperts.com and all services provided by KHEPRA EXPERTS. By accessing this site, you accept these terms in full.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Purpose of the site</h2>
                  <p className="text-gray-700">The site khepraexperts.com provides information about the consulting services of KHEPRA EXPERTS in strategy, finance, governance, and digital transformation in Africa. It also offers free diagnostic tools and professional resources.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Access and use</h2>
                  <p className="text-gray-700 mb-4">Access to the site is free. The user agrees to use the site in accordance with applicable laws and regulations, including OHADA law and the APDP Togo data protection law.</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Not to disrupt the operation of the site or its services</li>
                    <li>Not to attempt to access restricted areas without authorization</li>
                    <li>Not to use the site for illicit or fraudulent purposes</li>
                    <li>Not to disseminate content that is defamatory, discriminatory, or contrary to public order</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual property</h2>
                  <p className="text-gray-700">All content on the site (texts, images, videos, logos, methodologies, tools) is the exclusive property of KHEPRA EXPERTS. Any reproduction, distribution, or adaptation without prior written authorization is strictly prohibited.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Free tools and resources</h2>
                  <p className="text-gray-700">The diagnostic tools and resources offered free of charge are provided for informational purposes only. They do not constitute personalized professional advice. KHEPRA EXPERTS cannot be held liable for decisions made based on these tools.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact forms and data</h2>
                  <p className="text-gray-700">The data collected via contact forms are processed in accordance with our Privacy Policy and the APDP Togo law. The user guarantees the accuracy of the information provided.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of liability</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS strives to ensure the accuracy and updating of the information published. However, the site content is provided for informational purposes and does not constitute individualized legal, financial, or regulatory advice.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. External links</h2>
                  <p className="text-gray-700">The site may contain links to third-party sites. KHEPRA EXPERTS has no control over these sites and assumes no liability for their content or practices.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modification of terms</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS reserves the right to modify these terms at any time. The user is invited to consult this page regularly. The last update date is indicated at the bottom of the page.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Applicable law and jurisdiction</h2>
                  <p className="text-gray-700">These terms are governed by OHADA law and the laws of the Republic of Togo. In the event of a dispute, the Commercial Courts of Lomé shall have exclusive jurisdiction.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                  <p className="text-gray-700">For any questions regarding these terms: contact@khepraexperts.com — +228 93 98 49 09</p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last updated: May 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© 2026 KHEPRA EXPERTS. All rights reserved — Lomé, Togo.</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site khepraexperts.com ainsi que l'ensemble des services fournis par KHEPRA EXPERTS. En accédant à ce site, vous acceptez intégralement ces conditions.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet du site</h2>
                  <p className="text-gray-700">Le site khepraexperts.com présente les services de conseil de KHEPRA EXPERTS en stratégie, finance, gouvernance et transformation digitale en Afrique. Il met également à disposition des outils de diagnostic gratuits et des ressources professionnelles.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accès et utilisation</h2>
                  <p className="text-gray-700 mb-4">L'accès au site est gratuit. L'utilisateur s'engage à utiliser le site conformément aux lois et règlements en vigueur, notamment le droit OHADA et la loi APDP Togo sur la protection des données.</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Ne pas perturber le fonctionnement du site ou de ses services</li>
                    <li>Ne pas tenter d'accéder à des zones restreintes sans autorisation</li>
                    <li>Ne pas utiliser le site à des fins illicites ou frauduleuses</li>
                    <li>Ne pas diffuser de contenu diffamatoire, discriminatoire ou contraire à l'ordre public</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
                  <p className="text-gray-700">L'ensemble du contenu du site (textes, images, vidéos, logos, méthodologies, outils) est la propriété exclusive de KHEPRA EXPERTS. Toute reproduction, distribution ou adaptation sans autorisation écrite préalable est strictement interdite.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Outils et ressources gratuits</h2>
                  <p className="text-gray-700">Les outils de diagnostic et les ressources proposés gratuitement sont fournis à titre informatif. Ils ne constituent pas un conseil professionnel personnalisé. KHEPRA EXPERTS ne saurait être tenu responsable des décisions prises sur la base de ces outils.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Formulaires de contact et données</h2>
                  <p className="text-gray-700">Les données collectées via les formulaires de contact sont traitées conformément à notre Politique de Confidentialité et à la loi APDP Togo. L'utilisateur garantit l'exactitude des informations fournies.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS s'efforce d'assurer l'exactitude et la mise à jour des informations publiées. Toutefois, le contenu du site est fourni à titre informatif et ne constitue pas un conseil juridique, financier ou réglementaire individualisé.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liens externes</h2>
                  <p className="text-gray-700">Le site peut contenir des liens vers des sites tiers. KHEPRA EXPERTS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modification des conditions</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS se réserve le droit de modifier les présentes conditions à tout moment. L'utilisateur est invité à consulter cette page régulièrement. La date de dernière mise à jour est indiquée en bas de page.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Droit applicable et juridiction</h2>
                  <p className="text-gray-700">Les présentes conditions sont régies par le droit OHADA et les lois de la République togolaise. En cas de litige, les tribunaux de commerce de Lomé sont compétents exclusivement.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                  <p className="text-gray-700">Pour toute question relative aux présentes conditions : contact@khepraexperts.com — +228 93 98 49 09</p>
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



