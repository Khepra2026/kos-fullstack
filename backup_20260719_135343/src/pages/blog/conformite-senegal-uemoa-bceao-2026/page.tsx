/* ============================================================
   Article Blog S26 #1 — Conformité Sénégal UEMOA BCEAO 2026
   Cross-links obligatoires vers les 4 nouvelles pages
   ============================================================ */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';
import { MiniGuideCTA } from '@/pages/blog/components/MiniGuideCTA';

const ARTICLE_URL = 'https://khepraexperts.com/blog/conformite-senegal-uemoa-bceao-2026/';
const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=Dakar%20Senegal%20financial%20compliance%20regulatory%20meeting%20scene%20with%20senior%20African%20executives%20reviewing%20BCEAO%20documents%20in%20modern%20glass%20office%2C%20warm%20golden%20sunset%20light%20with%20deep%20emerald%20accent%20lighting%2C%20sophisticated%20institutional%20atmosphere%2C%20Big%20Four%20consulting%20grade%20professional%20setting%2C%20editorial%20photography%20style&width=1400&height=520&seq=blog-senegal-uemoa-2026&orientation=landscape';

const faqs = [
  { q: 'Quels sont les ratios prudentiels BCEAO applicables au Sénégal en 2026 ?', a: "Les banques sénégalaises doivent respecter les ratios Bâle III de la BCEAO : solvabilité ≥ 8% (Tier 1), ratio de liquidité à court terme ≥ 100%, ratio de transformation ≥ 75%. Ces ratios sont définis par les Instructions CB-UMOA n°026 à 029 de novembre 2016. Le non-respect expose à des sanctions COBAC allant jusqu'au retrait d'agrément." },
  { q: "Comment obtenir un agrément SFD au Sénégal en 2026 ?", a: "L'agrément SFD au Sénégal est délivré par la BCEAO selon les Instructions n°005-06-2010 (modifiées). Les SFD de catégorie 3 (bilan > 2 Mds FCFA) requièrent l'agrément BCEAO direct. La procédure inclut : dossier technique, étude de viabilité, plan d'affaires, capital minimum 100 MFCFA (banque) ou 10 MFCFA (SFD cat. 3). Délai estimé : 9-18 mois." },
  { q: 'Quelles sont les obligations LBC/FT pour les banques sénégalaises ?', a: "La Directive UEMOA n°02/2015 et son règlement d'exécution imposent une Approche Basée sur les Risques, la désignation d'un Responsable Conformité LBC/FT, la mise en place d'un système de surveillance des transactions, les déclarations à la CENTIF Sénégal. Le non-respect expose à des sanctions administratives (amende jusqu'à 2% du PNB) et pénales pour les dirigeants." },
];

export default function ConformiteSenegalBCEAO2026Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Conformité Réglementaire Sénégal 2026 — Guide BCEAO Commission Bancaire UEMOA | KHEPRA EXPERTS"
        description="Guide complet conformité réglementaire Sénégal 2026 : ratios Bâle III BCEAO, obligations LBC/FT CENTIF, gouvernance bancaire, agréments SFD EMF FinTech. Commission Bancaire UEMOA, AMF-UEMOA. 32 banques, 271 SFD. Analyse Big Four KHEPRA EXPERTS."
        keywords="conformité Sénégal BCEAO 2026, ratios prudentiels BCEAO Sénégal, LBC/FT CENTIF Sénégal, agrément SFD UEMOA, Commission Bancaire Sénégal, conformité bancaire Dakar"
        canonicalPath="/blog/conformite-senegal-uemoa-bceao-2026"
        ogType="article"
        ogImage={HERO_IMAGE}
      />

      <Navigation />

      {/* Hero */}
      <div className="relative pt-20 overflow-hidden" style={{ height: '480px' }}>
        <img src={HERO_IMAGE} alt="Conformité Sénégal BCEAO 2026" className="absolute inset-0 w-full h-full object-cover object-top" width="1400" height="520" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Conformité Sénégal 2026' }]} />
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(13,123,95,0.2)', color: '#86f0c6', border: '1px solid rgba(13,123,95,0.4)' }}>Sénégal · Zone UEMOA</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-time-line mr-1"></i>12 min de lecture
            </span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            Conformité Réglementaire au Sénégal 2026 — Guide BCEAO & Commission Bancaire UEMOA
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0" id="main-content">

            {/* Author */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg" alt="SIMDA Essoyomèwè" className="w-10 h-10 rounded-full object-cover border-2 border-amber-300" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                  <p className="text-xs text-gray-500">Managing Partner · 22 ans d'expertise BCEAO/COBAC</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 ml-auto">
                <span><i className="ri-calendar-line mr-1 text-amber-600"></i>Juin 2026</span>
                <span><i className="ri-time-line mr-1 text-amber-600"></i>12 min</span>
              </div>
            </div>

            {/* Intro */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#0D7B5F' }}>
              Le Sénégal est le 2ème marché bancaire de l'UEMOA avec 32 banques agréées et 271 SFD actifs. En 2026, les axes prioritaires de conformité sont : cybersécurité bancaire (Directive COBAC 2027), reporting XBRL BCEAO, et LBC/FT post-évaluation GIABA. Ce guide synthétise les obligations réglementaires clés pour les institutions financières sénégalaises.
            </p>

            {/* Executive Summary */}
            <div className="rounded-2xl overflow-hidden mb-10" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(13,123,95,0.3)' }}>
              <div className="px-6 py-5 border-b border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#86BC25' }}>Executive Summary — Sénégal 2026</p>
                <h2 className="text-lg font-bold text-white">Cinq priorités réglementaires pour les institutions sénégalaises</h2>
              </div>
              <div className="px-6 py-5 space-y-3">
                {[
                  { label: 'Ratios Bâle III BCEAO', text: 'Solvabilité ≥ 8% (Tier 1), liquidité ≥ 100%, levier ≤ 3%. Reporting trimestriel CB-UMOA obligatoire depuis le 1er janvier 2023 via instructions n°026-029/2016.' },
                  { label: 'LBC/FT & CENTIF Sénégal', text: 'Directive UEMOA n°02/2015, obligations déclaratives CENTIF, classification des risques par type de client. Responsable Conformité LBC/FT dédié obligatoire (Circulaire CB-UMOA 01/2017).' },
                  { label: 'Gouvernance bancaire', text: 'Conseil d\'Administration indépendant (≥ 1/3 membres), comités obligatoires (Audit, Risques, Rémunération). Circulaires BCEAO 01, 02 et 03/2017 applicables.' },
                  { label: 'Agrément FinTech & PSP', text: "Instruction BCEAO 2023 sur les établissements de paiement. Capital minimum 500 MFCFA pour les EP. Agrément BCEAO dans les 6-12 mois selon le type d'activité." },
                  { label: 'ESG & Finance Durable', text: 'ISSB IFRS S1/S2, recommandations NGFS pour les banques sénégalaises. Stress tests climatiques Pilier 2 BCEAO attendus en 2027.' },
                ].map((kp, i) => (
                  <div key={i} className="flex gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#86BC25' }}></div>
                    <div>
                      <span className="font-bold text-sm" style={{ color: '#86BC25' }}>{kp.label}</span>
                      <span className="text-white/70 text-sm ml-2">{kp.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-link Observatoire */}
            <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center" style={{ background: 'rgba(13,123,95,0.06)', border: '1px solid rgba(13,123,95,0.2)' }}>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#0D7B5F' }}>Observatoire Réglementaire Africain</p>
                <p className="text-sm text-gray-700 font-medium">Suivez en temps réel les 487 textes BCEAO applicables au Sénégal. Alertes, analyses d'impact et baromètre UEMOA.</p>
              </div>
              <Link to="/observatoire-reglementaire-africain/" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold whitespace-nowrap" style={{ backgroundColor: '#0D7B5F' }}>
                <i className="ri-radar-line"></i>Accéder à l'Observatoire
              </Link>
            </div>

            {/* Ratios BCEAO */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(13,123,95,0.1)' }}><i className="ri-bar-chart-2-line" style={{ color: '#0D7B5F' }}></i></span>
                Ratios Prudentiels BCEAO 2026 — Zone UEMOA
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Ratio', 'Seuil Bâle III BCEAO', 'Base réglementaire', 'Fréquence reporting'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left font-bold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Solvabilité (Tier 1)', '≥ 8%', 'Instruction CB-UMOA n°026/2016', 'Trimestriel'],
                      ['Couverture liquidité (LCR)', '≥ 100%', 'Instruction CB-UMOA n°027/2016', 'Mensuel'],
                      ['Transformation long terme', '≥ 75%', 'Instruction CB-UMOA n°028/2016', 'Trimestriel'],
                      ['Levier', '≤ 3%', 'Instruction CB-UMOA n°029/2016', 'Trimestriel'],
                      ['Grands risques', '≤ 75% fonds propres', 'Instruction CB-UMOA n°030/2016', 'Mensuel'],
                    ].map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 text-gray-700 text-xs ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">Source : Instructions CB-UMOA n°026 à 030 de novembre 2016, applicables depuis le 1er janvier 2023.</p>
            </section>

            {/* Cross-link Agréments */}
            <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#D4AF37' }}>Hub Agréments Afrique</p>
                <p className="text-sm text-gray-700 font-medium">Guide complet pour l'agrément SFD, EMF, FinTech et PSP au Sénégal. Capital minimum, procédures BCEAO, délais et checklist.</p>
              </div>
              <Link to="/agrements-afrique/" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-foreground-950 text-sm font-bold whitespace-nowrap" style={{ backgroundColor: '#D4AF37' }}>
                <i className="ri-award-line"></i>Voir le Hub Agréments
              </Link>
            </div>

            {/* LBC/FT */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(13,123,95,0.1)' }}><i className="ri-shield-check-line" style={{ color: '#0D7B5F' }}></i></span>
                LBC/FT au Sénégal — Obligations 2026
              </h2>
              <div className="space-y-3">
                {[
                  { titre: 'Responsable Conformité LBC/FT', texte: "Désignation obligatoire d'un RCLBC indépendant, rattaché à la Direction Générale et au CA. Déclaration à la Commission Bancaire. Circulaire BCEAO 01/2017." },
                  { titre: 'Classification des risques clients', texte: "Approche Basée sur les Risques (ABR). Classification obligatoire en 3 catégories (faible, moyen, élevé). Mise à jour annuelle du registre des risques." },
                  { titre: "Déclarations de soupçon — CENTIF Sénégal", texte: "Délai 24h après identification d'une transaction suspecte. Déclarations via le formulaire CENTIF. Obligation de conservation 10 ans." },
                  { titre: 'Gel des avoirs', texte: "Application immédiate des listes GAFI, Conseil de Sécurité ONU. Procédure de gel + déblocage documentée obligatoire. Rapport mensuel à la BCEAO." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <p className="font-bold text-sm text-gray-900 mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cross-link Digital Compliance Factory */}
            <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center" style={{ background: 'rgba(107,155,31,0.06)', border: '1px solid rgba(107,155,31,0.2)' }}>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#6B9B1F' }}>Digital Compliance Factory™</p>
                <p className="text-sm text-gray-700 font-medium">78 documents prêts à l'emploi : politiques LBC/FT CENTIF Sénégal, procédures BCEAO, matrices de contrôle interne. Immédiatement utilisables.</p>
              </div>
              <Link to="/digital-compliance-factory/" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold whitespace-nowrap" style={{ backgroundColor: '#6B9B1F' }}>
                <i className="ri-file-list-3-line"></i>Explorer la Bibliothèque
              </Link>
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

            {/* Cross-link Compliance Score */}
            <div className="rounded-2xl p-7 text-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.06) 0%, rgba(13,123,95,0.06) 100%)', border: '1px solid rgba(134,188,37,0.2)' }}>
              <i className="ri-bar-chart-2-line text-2xl mb-3 block" style={{ color: '#86BC25' }}></i>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Testez la conformité de votre institution sénégalaise</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">KHEPRA Compliance Score™ — 8 minutes, 6 domaines, scoring automatisé sur les référentiels BCEAO, LBC/FT, gouvernance et ESG.</p>
              <Link to="/compliance-score/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                <i className="ri-play-circle-line"></i>Démarrer le Diagnostic Gratuit
              </Link>
            </div>

            {/* Lien Landing Sénégal */}
            <div className="rounded-xl p-5 mb-8" style={{ background: 'rgba(13,123,95,0.04)', border: '1px solid rgba(13,123,95,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#0D7B5F' }}>Page Dédiée</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Toutes nos ressources réglementaires spécifiques au Sénégal en un seul endroit.</p>
                <Link to="/regions/senegal/" className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold whitespace-nowrap ml-4" style={{ borderColor: '#0D7B5F', color: '#0D7B5F' }}>
                  <i className="ri-map-pin-line"></i>Sénégal
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Ressources Liées</p>
                {[
                  { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', color: '#0D7B5F' },
                  { href: '/agrements-afrique/', icon: 'ri-award-line', label: 'Hub Agréments Afrique', color: '#D4AF37' },
                  { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory™', color: '#6B9B1F' },
                  { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', label: 'KHEPRA Compliance Score™', color: '#86BC25' },
                  { href: '/regions/senegal/', icon: 'ri-map-pin-line', label: 'Page Sénégal', color: '#0D7B5F' },
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group mb-1 cursor-pointer">
                    <div className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: `${link.color}12`, color: link.color }}>
                      <i className={`${link.icon} text-xs`}></i>
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="rounded-xl p-5 text-white" style={{ background: '#050c18' }}>
                <h4 className="font-bold text-base mb-2">Diagnostic BCEAO Sénégal</h4>
                <p className="text-xs text-white/70 mb-4">30 min · Gratuit · Confidentiel</p>
                <Link to="/diagnostic-flash/" className="block w-full text-center py-2.5 rounded-xl font-bold text-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}>
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



