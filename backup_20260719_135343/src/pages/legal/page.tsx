import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function LegalPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const legalSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/legal#webpage`,
    name: currentLang === 'fr' ? 'Mentions Légales — KHEPRA EXPERTS' : 'Legal Notice — KHEPRA EXPERTS',
    description: currentLang === 'fr'
      ? "Mentions légales de KHEPRA EXPERTS — Cabinet de conseil en finance, conformité et stratégie en Afrique de l'Ouest."
      : 'Legal notice of KHEPRA EXPERTS — Consulting firm in finance, compliance and strategy in West Africa.',
    url: `${SITE_URL}/legal`,
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
        title={currentLang === 'fr' ? 'Mentions Légales — KHEPRA EXPERTS' : 'Legal Notice — KHEPRA EXPERTS'}
        description={currentLang === 'fr'
          ? "Mentions légales de KHEPRA EXPERTS — Cabinet de conseil en finance, conformité et stratégie en Afrique de l'Ouest."
          : 'Legal notice of KHEPRA EXPERTS — Consulting firm in finance, compliance and strategy in West Africa.'}
        keywords="mentions légales, legal notice, KHEPRA EXPERTS, cabinet conseil Afrique, OHADA, Lomé Togo"
        canonicalPath="/legal"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={legalSchema}
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
                  { label: currentLang === 'fr' ? 'Mentions légales' : 'Legal Notice' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-foreground-950 mb-8">
              {currentLang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
            </h1>

            {currentLang === 'fr' ? (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  Conformément aux dispositions de la loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel (APDP Togo), au droit OHADA et aux dispositions réglementaires en vigueur en République Togolaise, les informations légales relatives à l'éditeur du site khepraexperts.com sont communiquées ci-après.
                </p>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Éditeur du site</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Dénomination sociale</p>
                        <p className="text-sm font-bold text-slate-900">KHEPRA EXPERTS (SARL U)</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Forme juridique</p>
                        <p className="text-sm font-bold text-slate-900">Société à Responsabilité Limitée Unipersonnelle (SARL U) — Droit OHADA</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Siège social</p>
                        <p className="text-sm font-bold text-slate-900">LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">RCCM</p>
                        <p className="text-sm font-bold text-slate-900">TG-LFW-01-2026-B13-01347</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">NIF</p>
                        <p className="text-sm font-bold text-slate-900">1002124216</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Capital social</p>
                        <p className="text-sm font-bold text-slate-900">1 000 000 FCFA</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Régime fiscal</p>
                        <p className="text-sm font-bold text-slate-900">RÉEL</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Email professionnel</p>
                        <p className="text-sm text-slate-900">contact@khepraexperts.com</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Téléphone</p>
                        <p className="text-sm text-slate-900">+228 93 98 49 09 (Lun-Ven, 08h-18h GMT)</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Directeur de la publication</p>
                        <p className="text-sm text-slate-900">SIMDA Essoyomèwè, Directeur Associé & Fondateur</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
                  <p className="text-gray-700 mb-2">Le site khepraexperts.com est hébergé par :</p>
                  <p className="text-gray-700 mb-2"><strong>Prestataire :</strong> Vercel Inc.</p>
                  <p className="text-gray-700 mb-2"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p className="text-gray-700"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer nofollow" className="text-teal-600 hover:text-teal-700">vercel.com</a></p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cadre juridique applicable</h2>
                  <p className="text-gray-700 mb-4">
                    Les présentes mentions légales sont régies par :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Le droit OHADA (Organisation pour l'Harmonisation en Afrique du Droit des Affaires)</li>
                    <li>La loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République Togolaise (APDP Togo)</li>
                    <li>Les dispositions du Code du Commerce togolais</li>
                    <li>Le cadre réglementaire UEMOA applicable aux prestataires de services numériques</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
                  <p className="text-gray-700 mb-4">
                    L'ensemble du contenu du site khepraexperts.com (textes, images, vidéos, logos, graphismes, méthodologies, outils de diagnostic) est la propriété exclusive de KHEPRA EXPERTS, protégé par les dispositions du droit OHADA et du droit togolais sur la propriété intellectuelle.
                  </p>
                  <p className="text-gray-700">
                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès et préalable par écrit de KHEPRA EXPERTS.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Confidentialité des échanges professionnels</h2>
                  <p className="text-gray-700">
                    KHEPRA EXPERTS s'engage à maintenir la confidentialité de tous les échanges professionnels, informations transmises et données partagées dans le cadre de missions de conseil. Un accord de confidentialité peut être signé sur demande.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
                  <p className="text-gray-700 mb-4">
                    KHEPRA EXPERTS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Les contenus publiés constituent des informations générales et ne sauraient constituer un conseil juridique, financier ou réglementaire individualisé.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Juridiction compétente</h2>
                  <p className="text-gray-700">
                    Tout litige relatif à l'utilisation du site khepraexperts.com ou aux services de KHEPRA EXPERTS est soumis à la compétence exclusive des tribunaux de commerce de Lomé, République Togolaise, sauf convention contraire expressément acceptée par les parties.
                  </p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Dernière mise à jour : 25 Juin 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} KHEPRA EXPERTS. Tous droits réservés — Lomé, Togo.</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  In accordance with the provisions of Togolese Law No. 2019-014 of October 29, 2019 on the protection of personal data (APDP Togo), OHADA law and applicable Togolese regulations, the legal information relating to the publisher of the khepraexperts.com website is provided below.
                </p>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Site Publisher</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Company name</p>
                        <p className="text-sm font-bold text-slate-900">KHEPRA EXPERTS (SARL U)</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Legal form</p>
                        <p className="text-sm font-bold text-slate-900">Single-Shareholder Limited Liability Company (SARL U) — OHADA Law</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Registered office</p>
                        <p className="text-sm font-bold text-slate-900">LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">RCCM</p>
                        <p className="text-sm font-bold text-slate-900">TG-LFW-01-2026-B13-01347</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Tax ID (NIF)</p>
                        <p className="text-sm font-bold text-slate-900">1002124216</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Tax regime</p>
                        <p className="text-sm font-bold text-slate-900">RÉEL</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Share capital</p>
                        <p className="text-sm font-bold text-slate-900">1 000 000 FCFA</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Professional email</p>
                        <p className="text-sm text-slate-900">contact@khepraexperts.com</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Phone</p>
                        <p className="text-sm text-slate-900">+228 93 98 49 09 (Mon-Fri, 08:00-18:00 GMT)</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Publication director</p>
                        <p className="text-sm text-slate-900">SIMDA Essoyomèwè, Associate Director & Founder</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hosting</h2>
                  <p className="text-gray-700 mb-2">The site is hosted by Vercel Inc.</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p className="text-gray-700"><strong>Website:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer nofollow" className="text-teal-600 hover:text-teal-700">vercel.com</a></p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Applicable Legal Framework</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>OHADA Law (Organisation for the Harmonisation of Business Law in Africa)</li>
                    <li>Togolese Law No. 2019-014 on the protection of personal data (APDP Togo)</li>
                    <li>Togolese Commercial Code</li>
                    <li>UEMOA regulatory framework applicable to digital service providers</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                  <p className="text-gray-700">
                    All content on khepraexperts.com (texts, images, logos, methodologies, diagnostic tools) is the exclusive property of KHEPRA EXPERTS, protected by OHADA and Togolese intellectual property law. Any reproduction without prior written consent is strictly prohibited.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Professional Exchange Confidentiality</h2>
                  <p className="text-gray-700">
                    KHEPRA EXPERTS undertakes to maintain the confidentiality of all professional exchanges, information transmitted and data shared within the framework of consulting assignments. A confidentiality agreement may be signed upon request.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Jurisdiction</h2>
                  <p className="text-gray-700">
                    Any dispute relating to the use of the khepraexperts.com website or KHEPRA EXPERTS services shall be subject to the exclusive jurisdiction of the Commercial Courts of Lomé, Republic of Togo.
                  </p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last updated: June 25, 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} KHEPRA EXPERTS. All rights reserved — Lomé, Togo.</p>
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



