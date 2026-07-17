import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';

export default function SecuriteConformitePage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/securite-conformite#webpage`,
    name: isEn ? 'Security & Compliance — KHEPRA EXPERTS' : 'Sécurité & Conformité — KHEPRA EXPERTS',
    description: isEn
      ? 'Security certifications, compliance standards, and data protection commitments of KHEPRA EXPERTS.'
      : 'Certifications de sécurité, standards de conformité et engagements de protection des données de KHEPRA EXPERTS.',
    url: `${SITE_URL}/securite-conformite`,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS' },
  };

  const badges = [
    { icon: 'ri-lock-line', label: isEn ? 'SSL/TLS Encryption' : 'Chiffrement SSL/TLS', desc: isEn ? 'AES-256 encryption on all connections' : 'Chiffrement AES-256 sur toutes les connexions', color: 'emerald' },
    { icon: 'ri-shield-check-line', label: isEn ? 'HSTS Enabled' : 'HSTS Activé', desc: isEn ? 'Strict-Transport-Security max-age 31536000' : 'Strict-Transport-Security max-age 31536000', color: 'emerald' },
    { icon: 'ri-shield-star-line', label: isEn ? 'CSP Policy' : 'Politique CSP', desc: isEn ? 'Content-Security-Policy against XSS' : 'Content-Security-Policy contre les XSS', color: 'amber' },
    { icon: 'ri-shield-user-line', label: isEn ? 'RLS Enabled' : 'RLS Activé', desc: isEn ? 'Row Level Security on all tables' : 'Row Level Security sur toutes les tables', color: 'emerald' },
    { icon: 'ri-shield-flash-line', label: isEn ? 'X-Frame-Options' : 'X-Frame-Options', desc: isEn ? 'SAMEORIGIN clickjacking protection' : 'Protection SAMEORIGIN contre le clickjacking', color: 'emerald' },
    { icon: 'ri-shield-cross-line', label: isEn ? 'Anti-CSRF' : 'Anti-CSRF', desc: isEn ? 'Token-based CSRF protection' : 'Protection CSRF par token', color: 'amber' },
    { icon: 'ri-file-shield-2-line', label: isEn ? 'XSS Protection' : 'Protection XSS', desc: isEn ? 'X-XSS-Protection 1; mode=block' : 'X-XSS-Protection 1; mode=block', color: 'emerald' },
    { icon: 'ri-shield-user-line', label: 'APDP Togo', desc: isEn ? 'Compliant with Togolese data protection law' : 'Conforme à la loi togolaise de protection des données', color: 'amber' },
  ];

  const compliance = [
    { icon: 'ri-bank-line', label: 'OHADA', desc: isEn ? 'Business law harmonization in Africa' : 'Harmonisation du droit des affaires en Afrique' },
    { icon: 'ri-shield-check-line', label: 'APDP Togo 2019', desc: isEn ? 'Law No. 2019-014 on personal data protection' : 'Loi n° 2019-014 sur la protection des données personnelles' },
    { icon: 'ri-bar-chart-line', label: 'BCEAO', desc: isEn ? 'Prudential standards UEMOA' : 'Standards prudentiels UEMOA' },
    { icon: 'ri-shield-star-line', label: 'COBAC', desc: isEn ? 'Banking regulation CEMAC' : 'Régulation bancaire CEMAC' },
    { icon: 'ri-leaf-line', label: 'IFC', desc: isEn ? 'Performance Standards and ESG' : 'Normes de Performance et ESG' },
    { icon: 'ri-earth-line', label: 'RGPD', desc: isEn ? 'European GDPR alignment' : 'Alignement RGPD européen' },
    { icon: 'ri-file-search-line', label: 'GIABA / GABAC', desc: isEn ? 'AML/CFT compliance' : 'Conformité LBC/FT' },
    { icon: 'ri-government-line', label: 'OHADA', desc: isEn ? 'Business law harmonization in Africa' : 'Harmonisation du droit des affaires en Afrique' },
  ];

  return (
    <>
      <SeoHead
        title={isEn ? 'Security & Compliance — KHEPRA EXPERTS' : 'Sécurité & Conformité — KHEPRA EXPERTS'}
        description={isEn
          ? 'Security certifications, compliance standards, and data protection commitments of KHEPRA EXPERTS.'
          : 'Certifications de sécurité, standards de conformité et engagements de protection des données de KHEPRA EXPERTS.'}
        keywords="sécurité, conformité, APDP Togo, RGPD, OHADA, BCEAO, COBAC, IFC, KHEPRA EXPERTS, protection données"
        canonicalPath="/securite-conformite"
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
                  { label: isEn ? 'Security & Compliance' : 'Sécurité & Conformité' },
                ]}
              />
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isEn ? 'Security & Compliance' : 'Sécurité & Conformité'}
            </h1>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl">
              {isEn
                ? 'KHEPRA EXPERTS is committed to the highest standards of security and regulatory compliance. This page details our technical protections, certifications, and legal frameworks.'
                : 'KHEPRA EXPERTS s\'engage à respecter les standards les plus élevés de sécurité et de conformité réglementaire. Cette page détaille nos protections techniques, nos certifications et nos cadres juridiques.'}
            </p>

            {/* Security Badges */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="ri-shield-check-line text-emerald-600 text-xl"></i>
                {isEn ? 'Security Certifications' : 'Certifications de sécurité'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map((b, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-3 ${b.color === 'emerald' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                      <i className={`${b.icon} text-lg ${b.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}></i>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{b.label}</p>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Compliance Frameworks */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="ri-file-shield-line text-amber-600 text-xl"></i>
                {isEn ? 'Regulatory Compliance' : 'Conformité réglementaire'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {compliance.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 mb-3">
                      <i className={`${c.icon} text-lg text-slate-600`}></i>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{c.label}</p>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Details */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="ri-server-line text-slate-600 text-xl"></i>
                {isEn ? 'Technical Infrastructure' : 'Infrastructure technique'}
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{isEn ? 'Hosting & CDN' : 'Hébergement & CDN'}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'Cloudflare CDN with edge caching' : 'CDN Cloudflare avec cache edge'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'HTTP/3 and QUIC support' : 'Support HTTP/3 et QUIC'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'DDoS protection and WAF' : 'Protection DDoS et WAF'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'Supabase Row Level Security' : 'Supabase Row Level Security'}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{isEn ? 'Data Protection' : 'Protection des données'}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'AES-256 encryption at rest' : 'Chiffrement AES-256 au repos'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'TLS 1.3 for all transfers' : 'TLS 1.3 pour tous les transferts'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'Regular security audits' : 'Audits de sécurité réguliers'}
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-check-line text-emerald-500 text-xs"></i>
                        {isEn ? 'Incident logging and monitoring' : 'Journalisation et monitoring des incidents'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* DPO Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="ri-shield-user-line text-amber-600 text-xl"></i>
                {isEn ? 'Data Protection Officer (DPO)' : 'Délégué à la Protection des Données (DPO)'}
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{isEn ? 'Name' : 'Nom'}</p>
                    <p className="text-sm text-gray-600">SIMDA Essoyomèwè</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Email</p>
                    <a href="mailto:contact@khepraexperts.com" className="text-sm text-teal-600 hover:text-teal-700">contact@khepraexperts.com</a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{isEn ? 'Phone' : 'Téléphone'}</p>
                    <p className="text-sm text-gray-600">+228 93 98 49 09</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{isEn ? 'Address' : 'Adresse'}</p>
                    <p className="text-sm text-gray-600">LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {isEn
                      ? 'The DPO is your point of contact for all questions related to the protection of your personal data. Response guaranteed within 30 business days.'
                      : 'Le DPO est votre interlocuteur pour toutes les questions relatives à la protection de vos données personnelles. Réponse garantie sous 30 jours ouvrés.'}
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-slate-900 to-teal-900 rounded-2xl p-8 sm:p-10 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 mx-auto mb-5">
                  <i className="ri-file-shield-2-line text-2xl text-amber-400"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {isEn ? 'Need a security audit?' : 'Besoin d\'un audit de sécurité ?'}
                </h3>
                <p className="text-sm text-white/60 mb-6 max-w-xl mx-auto">
                  {isEn
                    ? 'Our experts can assess your compliance with BCEAO, COBAC, IFC, and APDP Togo standards.'
                    : 'Nos experts peuvent évaluer votre conformité aux standards BCEAO, COBAC, IFC et APDP Togo.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #d4a82a, #b8891a)', color: '#06111e' }}
                  >
                    <i className="ri-calendar-line"></i>
                    {isEn ? 'Book a consultation' : 'Prendre rendez-vous'}
                  </Link>
                  <Link
                    to="/privacy/"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all border border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  >
                    <i className="ri-arrow-right-line"></i>
                    {isEn ? 'Privacy Policy' : 'Politique de confidentialité'}
                  </Link>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {isEn ? 'Last updated: May 2026' : 'Dernière mise à jour : Mai 2026'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                © 2026 KHEPRA EXPERTS. {isEn ? 'All rights reserved — Lomé, Togo.' : 'Tous droits réservés — Lomé, Togo.'}
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}