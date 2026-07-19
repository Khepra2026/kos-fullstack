/* ============================================================
   Article Blog S26 #5 — FinTech Gabon CEMAC Agrément Régulation
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

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=Libreville%20Gabon%20modern%20FinTech%20startup%20scene%20with%20African%20tech%20entrepreneurs%20in%20premium%20office%2C%20warm%20copper%20emerald%20and%20blue%20digital%20innovation%20atmosphere%2C%20regulatory%20compliance%20and%20technology%20licensing%20visual%20metaphor%2C%20COBAC%20BEAC%20regulatory%20technology%20fintech%20Gabon%20Africa%2C%20editorial%20Big%20Four%20consulting%20photography%20style%2C%20warm%20natural%20daylight%20with%20metallic%20accents&width=1400&height=520&seq=blog-fintech-gabon-2026&orientation=landscape';

const faqs = [
  { q: "Existe-t-il un cadre réglementaire spécifique aux FinTech en zone CEMAC ?", a: "La zone CEMAC n'a pas encore adopté de cadre réglementaire FinTech aussi développé que l'UEMOA. La COBAC et la BEAC travaillent sur une réglementation des établissements de monnaie électronique (EME) et des établissements de paiement (EP) pour la zone. En attendant, les FinTech doivent obtenir un agrément EMF de catégorie 2 (crédit) ou de catégorie 1 (collecte + crédit) selon leur modèle, ou un agrément EME auprès de la BEAC si l'activité principale est la monnaie électronique." },
  { q: "Comment Airtel Money et Orange Money sont-ils régulés au Gabon ?", a: "Au Gabon, Airtel Money et Orange Money opèrent sous des agréments d'établissements de monnaie électronique (EME) accordés par la BEAC. Ces agréments sont soumis au Règlement n°01/11/CEMAC/UMAC/COBAC relatif aux établissements de monnaie électronique en zone CEMAC. Le capital minimum est de 300 MFCFA. Les opérateurs doivent maintenir une couverture de 100% des soldes clients par des actifs liquides de haute qualité." },
  { q: "Quels sont les avantages du Gabon pour créer une FinTech en zone CEMAC ?", a: "Le Gabon présente plusieurs avantages pour les FinTech CEMAC : PIB per capita le plus élevé de la zone (6 800 USD), fort taux d'urbanisation (90%), présence de la BGFI Bank (principal groupe bancaire régional) favorable à la coopération, secteur pétrolier source de transactions complexes nécessitant des solutions FinTech. La faiblesse principale est la taille limitée du marché (2,3 millions d'habitants). Notre recommandation : stratégie multi-pays CEMAC dès le départ." },
];

export default function FintechGabonCEMACPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="FinTech Gabon CEMAC 2026 — Agrément Réglementation COBAC BEAC | KHEPRA EXPERTS"
        description="Guide FinTech Gabon CEMAC 2026 : agrément établissement monnaie électronique BEAC, agrément EMF COBAC, réglementation Mobile Money Airtel Orange, capital minimum, procédures. COBAC BEAC Gabon. KHEPRA EXPERTS expert réglementaire CEMAC."
        keywords="FinTech Gabon CEMAC, agrément monnaie électronique BEAC, EMF COBAC Gabon, Mobile Money Gabon réglementation, COBAC FinTech CEMAC, agrément établissement paiement Gabon"
        canonicalPath="/blog/fintech-gabon-cemac-agrement-regulation"
        ogType="article"
        ogImage={HERO_IMAGE}
      />

      <Navigation />

      <div className="relative pt-20 overflow-hidden" style={{ height: '460px' }}>
        <img src={HERO_IMAGE} alt="FinTech Gabon CEMAC Agrément" className="absolute inset-0 w-full h-full object-cover object-top" width="1400" height="520" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'FinTech Gabon CEMAC 2026' }]} />
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(29,78,216,0.2)', color: '#93c5fd', border: '1px solid rgba(29,78,216,0.4)' }}>Gabon · Zone CEMAC · FinTech</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20"><i className="ri-time-line mr-1"></i>13 min de lecture</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            FinTech au Gabon 2026 — Agrément, Réglementation COBAC & BEAC en Zone CEMAC
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0">

            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg" alt="SIMDA Essoyomèwè" className="w-10 h-10 rounded-full object-cover border-2 border-blue-300" />
              <div>
                <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                <p className="text-xs text-gray-500">Managing Partner · Expert FinTech Réglementation CEMAC</p>
              </div>
              <span className="ml-auto text-sm text-gray-500"><i className="ri-calendar-line mr-1"></i>Juin 2026</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#1D4ED8' }}>
              Le Gabon est en transition d'une économie pétrolière vers une économie diversifiée. Le secteur FinTech y est encore émergent comparé à la Côte d'Ivoire ou au Sénégal, mais présente des opportunités réelles : fort taux d'urbanisation (90%), PIB per capita le plus élevé de la CEMAC, et secteur pétrolier demandeur de solutions de paiement sophistiquées. Ce guide analyse le cadre réglementaire FinTech au Gabon en 2026.
            </p>

            {/* Cross-links dès l'intro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { href: '/agrements-afrique/', icon: 'ri-award-line', title: 'Hub Agréments FinTech Afrique', desc: 'Guide agrément EP, EME, FinTech COBAC et BCEAO. 6 types d\'agrément.', color: '#D4AF37' },
                { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', title: 'Observatoire COBAC CEMAC', desc: 'Veille réglementaire COBAC, BEAC, Gabon en temps réel.', color: '#1D4ED8' },
                { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', title: 'Digital Compliance Factory™', desc: 'Politiques LBC/FT EME, procédures COBAC, matrices de contrôle.', color: '#6B9B1F' },
                { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', title: 'Compliance Score™ CEMAC', desc: 'Diagnostic conformité FinTech COBAC/BEAC en 8 minutes.', color: '#86BC25' },
              ].map((link, i) => (
                <Link key={i} to={link.href} className="p-4 rounded-xl border hover:border-gray-300 transition-all cursor-pointer group" style={{ borderColor: `${link.color}30`, background: `${link.color}04` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 text-white" style={{ backgroundColor: link.color }}>
                      <i className={link.icon}></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{link.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Tableau agréments FinTech CEMAC */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Types d'Agrément FinTech en Zone CEMAC</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Type FinTech', 'Agrément requis', 'Autorité', 'Capital minimum', 'Délai'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left font-bold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Mobile Money / Wallet', 'EME (Établissement Monnaie Électronique)', 'BEAC', '300 MFCFA', '12-18 mois'],
                      ['Crédit en ligne (BNPL, microcrédit)', 'EMF Catégorie 2', 'COBAC', '5 MFCFA', '9-15 mois'],
                      ['Collecte + Crédit (SFD digital)', 'EMF Catégorie 1', 'COBAC', '25 MFCFA', '12-18 mois'],
                      ['Agrégateur de paiement', 'EME ou partenariat banque', 'BEAC / COBAC', 'Variable', '6-12 mois'],
                      ['Plateforme d\'investissement', 'AMF / COSUMAF en instruction', 'COSUMAF', 'En consultation', 'À confirmer'],
                    ].map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 text-xs ${ci === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">Source : Règlement CEMAC n°01/11/CEMAC/UMAC/COBAC relatif aux EME, Règlement COBAC R-2002/02 révisé 2017. Données indicatives — se référer aux textes officiels.</p>
            </section>

            {/* Opportunités secteur pétrolier */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Opportunités FinTech — Secteur Pétrolier Gabonais</h2>
              <div className="space-y-3">
                {[
                  { titre: 'Paiements B2B fournisseurs pétroliers', texte: 'Le secteur pétrolier gabonais (Pérenco, Shell, Total Energies) réalise des paiements complexes vers des fournisseurs locaux et régionaux. Les solutions de paiement B2B avec suivi en temps réel et conformité OCDE BEPS sont une opportunité réelle.' },
                  { titre: 'Gestion des salaires et avantages', texte: "Avec 90% d'urbanisation et une classe moyenne salariée dans le secteur pétrolier, les solutions de gestion salariale digitale avec composante épargne et crédit sont très demandées." },
                  { titre: 'Trade Finance pour les PME', texte: "Les PME gabonaises intermédiaires dans la chaîne pétrolière ont besoin de solutions de financement du commerce (lettres de crédit digitales, affacturage en ligne). Un marché sous-servi." },
                  { titre: 'ESG Reporting pour extractives', texte: "Les sociétés d'extraction sont soumises à des obligations ESG croissantes. Les plateformes de collecte et reporting ESG standardisé (ISSB IFRS S1/S2) constituent une opportunité FinTech réglementaire." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Questions Fréquentes — FinTech Gabon CEMAC</h2>
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

            <div className="rounded-2xl p-7 text-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.06) 0%, rgba(13,123,95,0.04) 100%)', border: '1px solid rgba(29,78,216,0.15)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Développez votre FinTech au Gabon</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">Diagnostic flash gratuit. Analyse du cadre réglementaire CEMAC applicable à votre modèle FinTech, feuille de route d'agrément.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
                <Link to="/regions/gabon/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-300 text-blue-700 font-semibold text-sm cursor-pointer whitespace-nowrap">
                  <i className="ri-map-pin-line"></i>Page Gabon
                </Link>
              </div>
            </div>
          </main>

          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Ressources FinTech CEMAC</p>
                {[
                  { href: '/agrements-afrique/', icon: 'ri-award-line', label: 'Hub Agréments Afrique', color: '#D4AF37' },
                  { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', label: 'Observatoire COBAC CEMAC', color: '#1D4ED8' },
                  { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory™', color: '#6B9B1F' },
                  { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', label: 'KHEPRA Compliance Score™', color: '#86BC25' },
                  { href: '/regions/gabon/', icon: 'ri-map-pin-line', label: 'Page Gabon', color: '#1D4ED8' },
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group mb-1 cursor-pointer">
                    <div className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: `${link.color}12`, color: link.color }}>
                      <i className={`${link.icon} text-xs`}></i>
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}



