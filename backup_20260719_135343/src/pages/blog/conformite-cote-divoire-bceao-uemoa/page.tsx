/* ============================================================
   Article Blog S26 #2 — Conformité Côte d'Ivoire BCEAO UEMOA
   Cross-links obligatoires vers les 4 nouvelles pages
   ============================================================ */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';
import { MiniGuideCTA } from '@/pages/blog/components/MiniGuideCTA';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=Abidjan%20Ivory%20Coast%20Plateau%20modern%20financial%20district%20BVRM%20glass%20towers%20with%20warm%20golden%20afternoon%20light%2C%20senior%20African%20financial%20executives%20in%20premium%20banking%20compliance%20meeting%2C%20sophisticated%20institutional%20atmosphere%20with%20warm%20amber%20and%20gold%20tones%2C%20editorial%20Big%20Four%20consulting%20photography%20style%2C%20warm%20natural%20daylight&width=1400&height=520&seq=blog-cdi-uemoa-2026&orientation=landscape';

const faqs = [
  { q: "Quelles sont les spécificités réglementaires de la Côte d'Ivoire en zone UEMOA ?", a: "La Côte d'Ivoire héberge le siège de la BRVM et du AMF-UEMOA. Les institutions ivoiriennes sont soumises à la fois à la BCEAO (bancaire), au AMF-UEMOA (marchés financiers) et à la Commission Bancaire UEMOA. Cette triple supervision crée des obligations spécifiques pour les établissements exerçant simultanément des activités bancaires et de marché." },
  { q: "Comment obtenir un agrément établissement de paiement en Côte d'Ivoire ?", a: "L'agrément EP en Côte d'Ivoire est délivré par la BCEAO selon l'Instruction 2023 sur les établissements de paiement. Capital minimum : 500 MFCFA. Procédure : dossier technique, plan d'affaires, étude de viabilité, agrément préalable ARTCI pour les activités télécoms. Délai estimé : 9-18 mois selon complexité." },
  { q: "Quelles sont les obligations ESG pour les banques ivoiriennes en 2026 ?", a: "Les banques ivoiriennes cotées à la BRVM sont soumises aux obligations de reporting extra-financier AMF-UEMOA. La BCEAO prépare des directives de stress tests climatiques Pilier 2 pour 2027. L'alignement ISSB IFRS S1/S2 devient progressivement obligatoire pour les émetteurs BRVM." },
];

export default function ConformiteCoteDIvoireBCEAOUEMOAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Conformité Réglementaire Côte d'Ivoire 2026 — BCEAO BRVM AMF-UEMOA UEMOA | KHEPRA EXPERTS"
        description="Guide conformité Côte d'Ivoire 2026 : BCEAO ratios Bâle III, BRVM AMF-UEMOA obligations marchés financiers, LBC/FT CENTIF-CI, agréments EP FinTech. Premier marché bancaire UEMOA, 28 banques, siège BRVM Abidjan. KHEPRA EXPERTS."
        keywords="conformité Côte d'Ivoire BCEAO, BRVM AMF-UEMOA Abidjan, LBC/FT CENTIF-CI, agrément établissement paiement UEMOA, conformité bancaire Abidjan, KHEPRA EXPERTS Côte d'Ivoire"
        canonicalPath="/blog/conformite-cote-divoire-bceao-uemoa"
        ogType="article"
        ogImage={HERO_IMAGE}
      />

      <Navigation />

      <div className="relative pt-20 overflow-hidden" style={{ height: '460px' }}>
        <img src={HERO_IMAGE} alt="Conformité Côte d'Ivoire BCEAO" className="absolute inset-0 w-full h-full object-cover object-top" width="1400" height="520" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: "Conformité Côte d'Ivoire 2026" }]} />
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(212,175,55,0.2)', color: '#f5d97e', border: '1px solid rgba(212,175,55,0.4)' }}>Côte d'Ivoire · Zone UEMOA</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20"><i className="ri-time-line mr-1"></i>11 min de lecture</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            Conformité Réglementaire en Côte d'Ivoire 2026 — BCEAO, BRVM, AMF-UEMOA & Commission Bancaire UEMOA
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0">

            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg" alt="SIMDA Essoyomèwè" className="w-10 h-10 rounded-full object-cover border-2 border-amber-300" />
              <div>
                <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                <p className="text-xs text-gray-500">Managing Partner · Expert BCEAO/AMF-UEMOA/UEMOA</p>
              </div>
              <span className="ml-auto text-sm text-gray-500"><i className="ri-calendar-line mr-1"></i>Juin 2026</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#D4AF37' }}>
              Abidjan est la capitale économique et financière de l'UEMOA. Avec 28 banques agréées, le siège de la BRVM, du AMF-UEMOA et d'opérateurs FinTech majeurs (Wave, Orange Money, Djamo), la Côte d'Ivoire concentre la triple supervision BCEAO-AMF-UEMOA-Commission Bancaire. Ce guide analyse les obligations réglementaires clés pour 2026.
            </p>

            {/* Executive Summary */}
            <div className="rounded-2xl overflow-hidden mb-10" style={{ background: 'linear-gradient(145deg, #1a0a00 0%, #2d1500 100%)', border: '1px solid rgba(212,175,55,0.3)' }}>
              <div className="px-6 py-5 border-b border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D4AF37' }}>Executive Summary — Côte d'Ivoire 2026</p>
                <h2 className="text-lg font-bold text-white">Triple supervision : BCEAO, AMF-UEMOA et Commission Bancaire UEMOA</h2>
              </div>
              <div className="px-6 py-5 space-y-3">
                {[
                  { label: 'BCEAO — Supervision bancaire', text: 'Ratios Bâle III (Instructions CB-UMOA n°026-029), gouvernance (Circulaires 01-02-03/2017), LBC/FT (Directive UEMOA n°02/2015). Reporting trimestriel via XBRL BCEAO obligatoire.' },
                  { label: 'AMF-UEMOA — Marchés financiers', text: "Règlement Général AMF-UEMOA n°02/97 (révisé). Obligations des émetteurs BRVM : publication comptes SYSCOHADA, reporting trimestriel, déclarations d'initiés." },
                  { label: 'FinTech & PSP Abidjan', text: "Instruction BCEAO 2023 sur les EP. Mobile Money opérateurs (Orange, Wave, MTN) régulés par BCEAO + ARTCI. Capital minimum 500 MFCFA pour établissements de paiement." },
                  { label: 'ESG — Obligations BRVM', text: "Depuis 2025, les émetteurs BRVM doivent publier un rapport extra-financier intégrant indicateurs ESG. Alignement ISSB IFRS S1/S2 progressif. Stress tests climatiques BCEAO Pilier 2 dès 2027." },
                ].map((kp, i) => (
                  <div key={i} className="flex gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#D4AF37' }}></div>
                    <div><span className="font-bold text-sm" style={{ color: '#D4AF37' }}>{kp.label} — </span><span className="text-white/70 text-sm">{kp.text}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-links vers les 4 pages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', title: 'Observatoire Réglementaire', desc: '487 textes BCEAO + 112 textes AMF-UEMOA suivis en temps réel.', color: '#0D7B5F' },
                { href: '/agrements-afrique/', icon: 'ri-award-line', title: 'Hub Agréments Afrique', desc: "Guides agréments banques, EP, FinTech, BRVM en zone UEMOA.", color: '#D4AF37' },
                { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', title: 'Digital Compliance Factory™', desc: 'Politiques LBC/FT CENTIF-CI, procédures BCEAO, matrices AMF-UEMOA.', color: '#6B9B1F' },
                { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', title: 'Compliance Score™', desc: 'Diagnostic maturité réglementaire BCEAO/AMF-UEMOA en 8 minutes.', color: '#86BC25' },
              ].map((link, i) => (
                <Link key={i} to={link.href} className="p-4 rounded-xl border hover:border-gray-300 transition-all cursor-pointer group" style={{ borderColor: `${link.color}30`, background: `${link.color}04` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 text-white" style={{ backgroundColor: link.color }}>
                      <i className={`${link.icon}`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700">{link.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* BRVM Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">BRVM & AMF-UEMOA — Obligations des Émetteurs</h2>
              <div className="space-y-3">
                {[
                  { titre: 'Publication des comptes SYSCOHADA', texte: "Délai 3 mois après la clôture pour les émetteurs BRVM. Comptes certifiés par un commissaire aux comptes agréé AMF-UMOA. Transmission au AMF-UEMOA et à la BRVM sous format électronique." },
                  { titre: 'Reporting trimestriel', texte: "Publication d'un rapport de gestion trimestriel dans les 45 jours suivant la fin de chaque trimestre. Inclut : chiffre d'affaires, flux de trésorerie, indicateurs opérationnels clés." },
                  { titre: "Déclarations d'initiés", texte: "Tout dirigeant ou actionnaire >5% doit déclarer ses transactions sur les titres de l'émetteur au AMF-UEMOA dans les 5 jours ouvrés. Registre des initiés tenu par le Responsable de la Conformité." },
                  { titre: 'Rapport extra-financier ESG (2026)', texte: "Depuis la circulaire AMF-UEMOA 2025, les émetteurs doivent intégrer des indicateurs ESG (environnement, social, gouvernance) dans leur rapport annuel. Alignement ISSB IFRS S1/S2 recommandé." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                    <p className="font-bold text-sm text-gray-900 mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            <MiniGuideCTA guide="due-diligence" />
            <BlogObservatoireAgrementsCTA variant="both" context="compliance" />

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Questions Fréquentes</h2>
              <div className="space-y-3">
                {faqs.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                      <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}></i>
                    </button>
                    {openFaq === i && <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100"><p className="text-sm text-gray-600 leading-relaxed pt-4">{item.a}</p></div>}
                  </div>
                ))}
              </div>
            </section>

            {/* CTA final */}
            <div className="rounded-2xl p-7 text-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(134,188,37,0.06) 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Diagnostic Conformité — Côte d'Ivoire</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">30 minutes avec un expert KHEPRA. Analyse BCEAO, AMF-UEMOA et Commission Bancaire. Gratuit et confidentiel.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
                <Link to="/regions/cote-divoire/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-300 text-amber-700 font-semibold text-sm cursor-pointer whitespace-nowrap">
                  <i className="ri-map-pin-line"></i>Page Côte d'Ivoire
                </Link>
              </div>
            </div>
          </main>

          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Ressources Liées</p>
                {[
                  { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', label: 'Observatoire Réglementaire', color: '#0D7B5F' },
                  { href: '/agrements-afrique/', icon: 'ri-award-line', label: 'Hub Agréments Afrique', color: '#D4AF37' },
                  { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory™', color: '#6B9B1F' },
                  { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', label: 'KHEPRA Compliance Score™', color: '#86BC25' },
                  { href: '/regions/cote-divoire/', icon: 'ri-map-pin-line', label: "Page Côte d'Ivoire", color: '#D4AF37' },
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group mb-1 cursor-pointer">
                    <div className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: `${link.color}12`, color: link.color }}>
                      <i className={`${link.icon} text-xs`}></i>
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="rounded-xl p-5 text-white" style={{ background: '#1a0a00' }}>
                <h4 className="font-bold text-base mb-2" style={{ color: '#D4AF37' }}>Diagnostic Côte d'Ivoire</h4>
                <p className="text-xs text-white/70 mb-4">30 min · BCEAO + AMF-UEMOA · Gratuit</p>
                <Link to="/diagnostic-flash/" className="block w-full text-center py-2.5 rounded-xl font-bold text-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, #D4AF37, #f0c840)', color: '#0a0a0a' }}>
                  Réserver mon diagnostic
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}



