import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function TermsPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/terms#webpage`,
    name: isEn ? 'Terms of Service — KHEPRA EXPERTS' : 'Conditions d\'Utilisation — KHEPRA-KOS',
    description: isEn
      ? 'Terms of service for the use of KHEPRA-KOS application and khepraexperts.com services.'
      : 'Conditions d\'utilisation de l\'application KHEPRA-KOS et des services khepraexperts.com.',
    url: `${SITE_URL}/terms`,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS' },
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Terms of Service — KHEPRA EXPERTS' : 'Conditions d\'Utilisation — KHEPRA-KOS'}
        description={isEn
          ? 'Terms of service for the use of KHEPRA-KOS application and khepraexperts.com services.'
          : 'Conditions d\'utilisation de l\'application KHEPRA-KOS et des services khepraexperts.com.'}
        keywords="terms of service, conditions utilisation, KHEPRA-KOS, KHEPRA EXPERTS, OHADA, APDP Togo, Google OAuth"
        canonicalPath="/terms"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={schema}
        datePublished="2026-06-22"
        dateModified="2026-06-22"
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
                  { label: isEn ? 'Terms of Service' : 'Conditions d\'Utilisation' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isEn ? 'Terms of Service' : 'Conditions d\'Utilisation'}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              KHEPRA-KOS — Application Interne Khepra Experts
            </p>

            {isEn ? (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  These Terms of Service govern your use of the KHEPRA-KOS application and all services provided by KHEPRA EXPERTS through khepraexperts.com. By accessing or using KHEPRA-KOS, you agree to these terms in full.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700">By accessing and using the KHEPRA-KOS application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the application.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of KHEPRA-KOS</h2>
                  <p className="text-gray-700">KHEPRA-KOS (KHEPRA Knowledge Operating System) is an internal application of KHEPRA EXPERTS, a consulting firm specializing in financial regulation, transfer pricing, and governance in Francophone Africa. The application provides knowledge management, regulatory compliance automation, and strategic dashboarding tools.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Security</h2>
                  <p className="text-gray-700 mb-4">Access to KHEPRA-KOS is restricted to authorized collaborators and partners of KHEPRA EXPERTS. You are responsible for:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Maintaining the confidentiality of your authentication credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying KHEPRA EXPERTS immediately of any unauthorized access</li>
                    <li>Using the application in compliance with applicable laws including OHADA law and Togolese data protection law (APDP 2019-014)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Google OAuth and Third-Party Services</h2>
                  <p className="text-gray-700 mb-4">KHEPRA-KOS may integrate with Google services via OAuth 2.0 authentication. By connecting your Google account:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>You authorize KHEPRA-KOS to access only the specific Google services you explicitly approve (e.g., YouTube Data API for video management)</li>
                    <li>You can revoke access at any time via your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">Google Account permissions</a></li>
                    <li>KHEPRA EXPERTS never stores your Google password — we use OAuth tokens only</li>
                    <li>All data from Google APIs is handled in accordance with our <a href="/privacy/" className="text-emerald-700 underline hover:text-emerald-900">Privacy Policy</a></li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                  <p className="text-gray-700">KHEPRA-KOS, including its source code, algorithms, knowledge base, agent systems, and all related documentation, is the exclusive intellectual property of KHEPRA EXPERTS. All rights reserved under OHADA law and applicable international treaties.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
                  <p className="text-gray-700 mb-4">You agree not to:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Reverse engineer, decompile, or disassemble any part of KHEPRA-KOS</li>
                    <li>Use the application for any illegal or unauthorized purpose</li>
                    <li>Attempt to bypass security measures or access restricted areas</li>
                    <li>Upload malicious code, malware, or harmful content</li>
                    <li>Use automated systems (bots, scrapers) without prior written permission</li>
                    <li>Share your access credentials with unauthorized third parties</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">KHEPRA-KOS is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. KHEPRA EXPERTS makes no warranties, express or implied, regarding:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The uninterrupted or error-free operation of the application</li>
                    <li>The accuracy, completeness, or reliability of AI-generated content</li>
                    <li>The suitability of the application for any particular purpose</li>
                  </ul>
                  <p className="text-gray-700 mt-4">KHEPRA EXPERTS shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use KHEPRA-KOS.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Protection and Privacy</h2>
                  <p className="text-gray-700">Your use of KHEPRA-KOS is also governed by our <a href="/privacy/" className="text-emerald-700 underline hover:text-emerald-900">Privacy Policy</a>, which explains how we collect, use, and protect your personal data in compliance with Togolese Law No. 2019-014 (APDP Togo).</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS reserves the right to modify these terms at any time. Users will be notified of material changes. Continued use of KHEPRA-KOS after modifications constitutes acceptance of the updated terms.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                  <p className="text-gray-700">These terms are governed by OHADA law and the laws of the Republic of Togo. Any disputes shall be subject to the exclusive jurisdiction of the Commercial Courts of Lomé, Togo.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                    <p className="text-gray-700 mb-2"><strong>Application:</strong> KHEPRA-KOS</p>
                    <p className="text-gray-700 mb-2"><strong>Publisher:</strong> KHEPRA EXPERTS SARL — Lomé, Togo</p>
                    <p className="text-gray-700 mb-2"><strong>Support Email:</strong> essochamanu@gmail.com</p>
                    <p className="text-gray-700"><strong>Website:</strong> khepraexperts.com</p>
                  </div>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last updated: June 22, 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© 2026 KHEPRA EXPERTS. All rights reserved — Lomé, Togo.</p>
                  <p className="text-sm text-gray-500 mt-1">These terms comply with OHADA law and Google OAuth 2.0 policies.</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  Les présentes Conditions d'Utilisation régissent votre utilisation de l'application KHEPRA-KOS et de l'ensemble des services fournis par KHEPRA EXPERTS via khepraexperts.com. En accédant ou en utilisant KHEPRA-KOS, vous acceptez intégralement ces conditions.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des Conditions</h2>
                  <p className="text-gray-700">En accédant et en utilisant l'application KHEPRA-KOS, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser l'application.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description de KHEPRA-KOS</h2>
                  <p className="text-gray-700">KHEPRA-KOS (KHEPRA Knowledge Operating System) est l'application interne de KHEPRA EXPERTS, cabinet de conseil spécialisé en régulation financière, prix de transfert et gouvernance en Afrique francophone. L'application fournit des outils de gestion des connaissances, d'automatisation de la conformité réglementaire et de pilotage stratégique.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Comptes Utilisateurs et Sécurité</h2>
                  <p className="text-gray-700 mb-4">L'accès à KHEPRA-KOS est réservé aux collaborateurs et partenaires autorisés de KHEPRA EXPERTS. Vous êtes responsable de :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>La confidentialité de vos identifiants d'authentification</li>
                    <li>Toutes les activités effectuées sous votre compte</li>
                    <li>Notifier immédiatement KHEPRA EXPERTS de tout accès non autorisé</li>
                    <li>Utiliser l'application conformément aux lois applicables, notamment le droit OHADA et la loi togolaise sur la protection des données (APDP 2019-014)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Google OAuth et Services Tiers</h2>
                  <p className="text-gray-700 mb-4">KHEPRA-KOS peut s'intégrer avec les services Google via l'authentification OAuth 2.0. En connectant votre compte Google :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Vous autorisez KHEPRA-KOS à accéder uniquement aux services Google spécifiques que vous approuvez explicitement (ex : YouTube Data API pour la gestion vidéo)</li>
                    <li>Vous pouvez révoquer l'accès à tout moment via les <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 underline hover:text-emerald-900">permissions de votre compte Google</a></li>
                    <li>KHEPRA EXPERTS ne stocke jamais votre mot de passe Google — seuls les jetons OAuth sont utilisés</li>
                    <li>Toutes les données issues des API Google sont traitées conformément à notre <a href="/privacy/" className="text-emerald-700 underline hover:text-emerald-900">Politique de Confidentialité</a></li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propriété Intellectuelle</h2>
                  <p className="text-gray-700">KHEPRA-KOS, y compris son code source, ses algorithmes, sa base de connaissances, ses systèmes d'agents et toute la documentation associée, est la propriété intellectuelle exclusive de KHEPRA EXPERTS. Tous droits réservés en vertu du droit OHADA et des traités internationaux applicables.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Utilisation Acceptable</h2>
                  <p className="text-gray-700 mb-4">Vous vous engagez à ne pas :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Rétro-concevoir, décompiler ou désassembler toute partie de KHEPRA-KOS</li>
                    <li>Utiliser l'application à des fins illégales ou non autorisées</li>
                    <li>Tenter de contourner les mesures de sécurité ou d'accéder à des zones restreintes</li>
                    <li>Téléverser du code malveillant, des logiciels malveillants ou du contenu nuisible</li>
                    <li>Utiliser des systèmes automatisés (robots, scrapers) sans autorisation écrite préalable</li>
                    <li>Partager vos identifiants d'accès avec des tiers non autorisés</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation de Responsabilité</h2>
                  <p className="text-gray-700 mb-4">KHEPRA-KOS est fourni &ldquo;en l'état&rdquo; et &ldquo;selon disponibilité&rdquo;. KHEPRA EXPERTS ne donne aucune garantie, explicite ou implicite, concernant :</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Le fonctionnement ininterrompu ou sans erreur de l'application</li>
                    <li>L'exactitude, l'exhaustivité ou la fiabilité du contenu généré par l'IA</li>
                    <li>L'adéquation de l'application à un usage particulier</li>
                  </ul>
                  <p className="text-gray-700 mt-4">KHEPRA EXPERTS ne pourra être tenu responsable des dommages indirects, accessoires ou consécutifs découlant de l'utilisation ou de l'impossibilité d'utiliser KHEPRA-KOS.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Protection des Données et Confidentialité</h2>
                  <p className="text-gray-700">Votre utilisation de KHEPRA-KOS est également régie par notre <a href="/privacy/" className="text-emerald-700 underline hover:text-emerald-900">Politique de Confidentialité</a>, qui explique comment nous collectons, utilisons et protégeons vos données personnelles conformément à la Loi n° 2019-014 (APDP Togo).</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modification des Conditions</h2>
                  <p className="text-gray-700">KHEPRA EXPERTS se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des modifications importantes. L'utilisation continue de KHEPRA-KOS après modification constitue l'acceptation des conditions mises à jour.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Droit Applicable</h2>
                  <p className="text-gray-700">Les présentes conditions sont régies par le droit OHADA et les lois de la République togolaise. Tout litige sera soumis à la compétence exclusive des tribunaux de commerce de Lomé, Togo.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                    <p className="text-gray-700 mb-2"><strong>Application :</strong> KHEPRA-KOS</p>
                    <p className="text-gray-700 mb-2"><strong>Éditeur :</strong> KHEPRA EXPERTS SARL — Lomé, Togo</p>
                    <p className="text-gray-700 mb-2"><strong>Email Support :</strong> essochamanu@gmail.com</p>
                    <p className="text-gray-700"><strong>Site Web :</strong> khepraexperts.com</p>
                  </div>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Dernière mise à jour : 22 Juin 2026</p>
                  <p className="text-sm text-gray-500 mt-2">© 2026 KHEPRA EXPERTS. Tous droits réservés — Lomé, Togo.</p>
                  <p className="text-sm text-gray-500 mt-1">Ces conditions sont conformes au droit OHADA et aux politiques Google OAuth 2.0.</p>
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



