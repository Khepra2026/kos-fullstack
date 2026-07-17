import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function ThankYouPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/thank-you#webpage`,
    url: `${SITE_URL}/thank-you`,
    name: currentLang === 'fr' ? 'Merci — KHEPRA EXPERTS' : 'Thank You — KHEPRA EXPERTS',
    description: currentLang === 'fr'
      ? "Merci pour votre demande. L'équipe KHEPRA EXPERTS vous contactera sous 24h."
      : 'Thank you for your request. The KHEPRA EXPERTS team will contact you within 24 hours.',
    inLanguage: currentLang === 'fr' ? 'fr-FR' : 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  return (
    <>
      <SeoHead
        title={currentLang === 'fr' ? 'Merci — KHEPRA EXPERTS' : 'Thank You — KHEPRA EXPERTS'}
        description={currentLang === 'fr'
          ? "Merci pour votre demande. L'équipe KHEPRA EXPERTS vous contactera sous 24h."
          : 'Thank you for your request. The KHEPRA EXPERTS team will contact you within 24 hours.'}
        canonicalPath="/thank-you"
        noIndex={true}
        schemaJson={schemaJson}
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <Navigation />

        <main className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logo */}
            <div className="mb-10 flex justify-center">
              <Link to="/">
                <img
                  src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png"
                  alt="KHEPRA EXPERTS"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center animate-bounce">
                <i className="ri-checkbox-circle-fill text-5xl text-teal-600"></i>
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {currentLang === 'fr' ? 'Merci pour votre confiance !' : 'Thank you for your trust!'}
            </h1>

            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? "Votre demande a bien été reçue par l'équipe KHEPRA EXPERTS."
                : 'Your request has been received by the KHEPRA EXPERTS team.'}
            </p>

            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? 'Un expert vous contactera dans les prochaines 2 heures ouvrées pour échanger sur votre projet.'
                : 'An expert will contact you within the next 2 business hours to discuss your project.'}
            </p>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentLang === 'fr' ? 'Prochaines étapes' : 'Next Steps'}
              </h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLang === 'fr' ? 'Confirmation par email (immédiate)' : 'Email confirmation (immediate)'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLang === 'fr'
                        ? 'Vous recevrez un email de confirmation avec le récapitulatif de votre demande.'
                        : 'You will receive a confirmation email with a summary of your request.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLang === 'fr' ? 'Premier contact expert (sous 2h)' : 'First expert contact (within 2h)'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLang === 'fr'
                        ? 'Un consultant senior KHEPRA EXPERTS vous contactera pour comprendre vos besoins spécifiques.'
                        : 'A senior KHEPRA EXPERTS consultant will contact you to understand your specific needs.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLang === 'fr' ? 'Diagnostic stratégique (J+2)' : 'Strategic diagnostic (D+2)'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLang === 'fr'
                        ? 'Nous vous proposerons un diagnostic stratégique gratuit de 30 minutes pour identifier les leviers de transformation.'
                        : 'We will offer you a free 30-minute strategic diagnostic to identify transformation levers.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLang === 'fr' ? 'Proposition personnalisée (J+5)' : 'Personalized proposal (D+5)'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLang === 'fr'
                        ? 'Nous vous présenterons une solution sur-mesure adaptée à vos objectifs et votre budget.'
                        : 'We will present you with a tailor-made solution adapted to your objectives and budget.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-shield-check-line text-teal-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'fr' ? 'Confidentiel' : 'Confidential'}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentLang === 'fr'
                    ? 'Vos informations restent strictement confidentielles'
                    : 'Your information remains strictly confidential'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-star-line text-amber-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'fr' ? 'Expert dédié' : 'Dedicated expert'}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentLang === 'fr'
                    ? '22+ ans d\'expérience en conseil stratégique'
                    : '22+ years of experience in strategic consulting'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-calendar-check-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'fr' ? 'Sans engagement' : 'No commitment'}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentLang === 'fr'
                    ? 'Premier échange gratuit et sans obligation'
                    : 'First free exchange with no obligation'}
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 mb-12 max-w-2xl mx-auto text-white">
              <div className="mb-4">
                <i className="ri-double-quotes-l text-4xl opacity-50"></i>
              </div>
              <p className="text-lg mb-6 italic">
                {currentLang === 'fr'
                  ? 'KHEPRA EXPERTS nous a accompagnés dans notre mise en conformité réglementaire. Leur expertise et leur réactivité ont été déterminantes pour notre succès.'
                  : 'KHEPRA EXPERTS supported us in our regulatory compliance. Their expertise and responsiveness were decisive for our success.'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-2xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold">Amadou Diallo</p>
                  <p className="text-sm opacity-90">
                    {currentLang === 'fr' ? 'Directeur Général, Fintech Sénégal' : 'CEO, Fintech Senegal'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-home-line text-xl"></i>
                {currentLang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
              </Link>

              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:bg-gray-50 transition-colors border-2 border-teal-600 whitespace-nowrap"
              >
                <i className="ri-download-line text-xl"></i>
                {currentLang === 'fr' ? 'Télécharger nos guides' : 'Download our guides'}
              </Link>
            </div>

            {/* Additional Links */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                {currentLang === 'fr' ? 'En attendant, découvrez :' : 'In the meantime, discover:'}
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  to="/services"
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                  <i className="ri-service-line"></i>
                  {currentLang === 'fr' ? 'Nos services' : 'Our services'}
                </Link>
                <Link
                  to="/blog"
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                  <i className="ri-article-line"></i>
                  {currentLang === 'fr' ? 'Notre blog' : 'Our blog'}
                </Link>
                <Link
                  to="/about"
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                  <i className="ri-team-line"></i>
                  {currentLang === 'fr' ? 'À propos' : 'About us'}
                </Link>
                <Link
                  to="/decideurs"
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                  <i className="ri-user-star-line"></i>
                  {currentLang === 'fr' ? 'Décideurs' : 'Decision Makers'}
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}