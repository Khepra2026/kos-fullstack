/* ============================================================
   Article Blog S26 #4 — Agrément Microfinance UEMOA CEMAC
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

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=African%20microfinance%20institution%20licensing%20approval%20ceremony%2C%20warm%20professional%20atmosphere%20with%20senior%20executives%20and%20regulatory%20officials%20in%20modern%20meeting%20room%2C%20BCEAO%20COBAC%20regulatory%20documents%20and%20official%20seals%2C%20warm%20teal%20and%20gold%20tones%2C%20institutional%20authority%20and%20financial%20inclusion%20visual%2C%20editorial%20photography%20Big%20Four%20consulting%20style&width=1400&height=520&seq=blog-agrement-microfinance-2026&orientation=landscape';

const faqs = [
  { q: "Quelle est la différence entre les agréments SFD de catégorie 1, 2 et 3 en UEMOA ?", a: "En zone UEMOA, l'Instruction BCEAO n°005-06-2010 classe les SFD en 3 catégories selon le bilan : Catégorie 1 (bilan < 500 MFCFA) — agrément de l'Autorité Nationale de la Microfinance (DPM ou DNMF), Catégorie 2 (bilan 500 MFCFA - 2 Mds FCFA) — agrément de la Commission Bancaire UEMOA, Catégorie 3 (bilan > 2 Mds FCFA) — agrément BCEAO. Les ratios prudentiels et obligations de reporting varient selon la catégorie." },
  { q: "Quel est le capital minimum pour créer une IMF en zone CEMAC ?", a: "En zone CEMAC, le Règlement COBAC R-2002/02 (révisé 2017) définit les exigences de capital minimum pour les EMF : EMF de 1ère catégorie (collecte d'épargne + crédit) : 25 MFCFA minimum, EMF de 2ème catégorie (crédit uniquement) : 5 MFCFA minimum, Établissement de refinancement : 300 MFCFA minimum. Pour les banques : 10 Mds FCFA (Cameroun, Gabon, Congo) ou 5 Mds FCFA (Tchad, RCA, Guinée Équatoriale)." },
  { q: "Quels documents faut-il préparer pour un dossier d'agrément BCEAO (SFD cat. 3) ?", a: "Le dossier d'agrément BCEAO pour un SFD de catégorie 3 comprend : demande d'agrément signée par les promoteurs, projet de statuts et règlement intérieur, étude de viabilité et plan d'affaires sur 5 ans, états financiers prévisionnels (3 ans), liste des administrateurs et dirigeants (CV, certificats judiciaires), attestation de souscription du capital minimum, manuel de procédures de contrôle interne, politique LBC/FT. Notre Hub Agréments Afrique fournit des modèles complets." },
];

export default function AgrementMicrofinanceUEMOACEMACPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Agrément Microfinance UEMOA CEMAC 2026 — Guide Complet SFD IMF EMF | KHEPRA EXPERTS"
        description="Guide complet agrément microfinance UEMOA CEMAC 2026 : SFD catégories 1-2-3 BCEAO, EMF catégories COBAC, capital minimum, procédures, délais. 8 pays UEMOA + 6 pays CEMAC. Instruction BCEAO n°005-06-2010, Règlement COBAC R-2002/02. KHEPRA EXPERTS 47 agréments obtenus."
        keywords="agrément microfinance UEMOA, agrément SFD BCEAO catégorie 3, agrément EMF COBAC, capital minimum microfinance Afrique, procédure agrément IMF CEMAC, instruction BCEAO 005-06-2010"
        canonicalPath="/blog/agrement-microfinance-uemoa-cemac-guide-complet"
        ogType="article"
        ogImage={HERO_IMAGE}
      />

      <Navigation />

      <div className="relative pt-20 overflow-hidden" style={{ height: '460px' }}>
        <img src={HERO_IMAGE} alt="Agrément Microfinance UEMOA CEMAC" className="absolute inset-0 w-full h-full object-cover object-top" width="1400" height="520" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Agrément Microfinance UEMOA CEMAC' }]} />
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(13,123,95,0.2)', color: '#86f0c6', border: '1px solid rgba(13,123,95,0.4)' }}>UEMOA + CEMAC · 14 pays</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20"><i className="ri-time-line mr-1"></i>16 min de lecture</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            Agrément Microfinance en Afrique 2026 — Guide Complet SFD, IMF et EMF UEMOA & CEMAC
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0">

            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg" alt="SIMDA Essoyomèwè" className="w-10 h-10 rounded-full object-cover border-2 border-teal-300" />
              <div>
                <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                <p className="text-xs text-gray-500">Managing Partner · 47 agréments microfinance obtenus · UEMOA + CEMAC</p>
              </div>
              <span className="ml-auto text-sm text-gray-500"><i className="ri-calendar-line mr-1"></i>Juin 2026</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#0D7B5F' }}>
              La microfinance africaine compte plus de 3 000 institutions actives en zone UEMOA et CEMAC. Obtenir un agrément régulier est la première étape pour opérer légalement, accéder aux refinancements BCEAO/BEAC et attirer des investisseurs institutionnels. Notre équipe a accompagné 47 agréments avec un taux de réussite de 94%. Ce guide couvre l'intégralité du processus.
            </p>

            {/* Hub Agréments cross-link */}
            <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#D4AF37' }}>Hub Agréments Afrique — Guide Complet</p>
                <p className="text-sm text-gray-700 font-medium">Checklists, FAQ, simulateurs et étapes détaillées pour 6 types d'agrément. 47 agréments obtenus, taux de réussite 94%.</p>
              </div>
              <Link to="/agrements-afrique/" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-foreground-950 text-sm font-bold whitespace-nowrap" style={{ backgroundColor: '#D4AF37' }}>
                <i className="ri-award-line"></i>Accéder au Hub
              </Link>
            </div>

            {/* Tableau comparatif */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Tableau Comparatif — Agréments Microfinance UEMOA vs CEMAC</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Critère', 'SFD Cat. 3 (UEMOA)', 'EMF Cat. 1 (CEMAC)', 'EMF Cat. 2 (CEMAC)'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left font-bold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Autorité de tutelle', 'BCEAO / Commission Bancaire UEMOA', 'COBAC', 'COBAC'],
                      ['Capital minimum', '100 MFCFA', '25 MFCFA', '5 MFCFA'],
                      ['Délai de traitement', '12-18 mois', '9-15 mois', '6-12 mois'],
                      ['Référentiel prudentiel', 'Instruction BCEAO n°005-06-2010', 'Règlement COBAC R-2002/02', 'Règlement COBAC R-2002/02'],
                      ['LBC/FT', 'Directive UEMOA n°02/2015 + CENTIF', 'Règlement COBAC R-2018/01 + ANIF', 'Règlement COBAC R-2018/01 + ANIF'],
                      ['Reporting', 'Trimestriel (CB-UMOA)', 'Mensuel (COBAC)', 'Trimestriel (COBAC)'],
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
            </section>

            {/* Cross-links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', title: 'Observatoire Réglementaire Africain', desc: '487 textes BCEAO + 312 textes COBAC suivis en temps réel.', color: '#0D7B5F' },
                { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', title: 'Digital Compliance Factory™', desc: 'Dossiers type SFD/EMF, politiques LBC/FT CENTIF/ANIF, procédures.', color: '#6B9B1F' },
                { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', title: 'Compliance Score™', desc: 'Diagnostic maturité réglementaire IMF en 8 minutes.', color: '#86BC25' },
                { href: '/agrements-afrique/', icon: 'ri-award-line', title: 'Hub Agréments Afrique', desc: 'Guide complet 6 types d\'agrément, checklist, FAQ, simulateurs.', color: '#D4AF37' },
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

            <MiniGuideCTA guide="gouvernance-imf" />
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

            <div className="rounded-2xl p-7 text-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(13,123,95,0.06) 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Démarrez votre projet d'agrément</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">Diagnostic flash gratuit de 30 minutes. Évaluation de votre maturité réglementaire et feuille de route personnalisée.</p>
              <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
              </Link>
            </div>
          </main>

          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Ressources Liées</p>
                {[
                  { href: '/agrements-afrique/', icon: 'ri-award-line', label: 'Hub Agréments Afrique', color: '#D4AF37' },
                  { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', label: 'Observatoire Réglementaire', color: '#0D7B5F' },
                  { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory™', color: '#6B9B1F' },
                  { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', label: 'KHEPRA Compliance Score™', color: '#86BC25' },
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