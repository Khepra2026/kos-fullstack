/* ============================================================
   Article Blog S26 #3 — Préparation Inspection COBAC Cameroun CEMAC
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

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=Yaounde%20Cameroun%20COBAC%20banking%20inspection%20preparation%20scene%2C%20senior%20African%20banking%20compliance%20executives%20reviewing%20regulatory%20documents%20in%20modern%20bank%20boardroom%2C%20warm%20copper%20orange%20and%20forest%20green%20institutional%20atmosphere%2C%20CEMAC%20Central%20Africa%20regulatory%20compliance%20visual%2C%20editorial%20Big%20Four%20consulting%20photography%20style%2C%20warm%20natural%20daylight&width=1400&height=520&seq=blog-cobac-cameroun-2026&orientation=landscape';

const faqs = [
  { q: "Combien de temps dure une inspection COBAC et comment se déroule-t-elle ?", a: "Une inspection COBAC sur place dure généralement 2 à 6 semaines selon la taille de l'établissement. Elle comprend : phase documentaire (1 semaine avant), phase sur site (2-4 semaines), restitution préliminaire. Les inspecteurs examinent les 5 dimensions : ratios prudentiels, LBC/FT, gouvernance, contrôle interne, et qualité du portefeuille. Les banques camerounaises font l'objet d'inspections tous les 2-3 ans." },
  { q: "Quelles sanctions peut prononcer la COBAC en cas de non-conformité ?", a: "La COBAC dispose de l'échelle de sanctions suivante : avertissement, mise en garde, blâme, limitation des activités, suspension d'agréments partiels, nomination d'administrateur provisoire, retrait d'agrément. Des amendes pécuniaires sont possibles jusqu'à 3% du capital. Les sanctions sont publiées sur le site de la COBAC depuis 2020. La responsabilité personnelle des dirigeants peut être engagée." },
  { q: "Quelle est la liste des documents à préparer pour une inspection COBAC ?", a: "La COBAC requiert : états financiers SYSCOHADA (3 derniers exercices), ratios prudentiels détaillés (mensuel sur 24 mois), registre des grands risques, politique LBC/FT et procédures, rapports du Comité d'Audit et du Comité des Risques, manuel de contrôle interne, plan de continuité des activités, liste des incidents opérationnels. Notre Digital Compliance Factory™ met à disposition des modèles prêts à l'emploi." },
];

export default function InspectionCOBACCamerounCEMACPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Préparation Inspection COBAC Cameroun 2026 — Guide Pratique CEMAC | KHEPRA EXPERTS"
        description="Guide préparation inspection COBAC Cameroun 2026 : checklist documentaire, ratios BEAC, gouvernance Instruction 007-03-2022, LBC/FT ANIF, sanctions COBAC. 90 jours pour être prêt. CEMAC, COBAC, BEAC. KHEPRA EXPERTS expert réglementaire CEMAC."
        keywords="inspection COBAC Cameroun, préparation inspection COBAC, sanctions COBAC CEMAC, ratios prudentiels BEAC Cameroun, LBC/FT ANIF Cameroun, conformité bancaire CEMAC"
        canonicalPath="/blog/inspection-cobac-cameroun-cemac-preparation"
        ogType="article"
        ogImage={HERO_IMAGE}
      />

      <Navigation />

      <div className="relative pt-20 overflow-hidden" style={{ height: '460px' }}>
        <img src={HERO_IMAGE} alt="Inspection COBAC Cameroun CEMAC" className="absolute inset-0 w-full h-full object-cover object-top" width="1400" height="520" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb variant="light" items={[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Inspection COBAC Cameroun 2026' }]} />
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(194,65,12,0.2)', color: '#fca678', border: '1px solid rgba(194,65,12,0.4)' }}>Cameroun · Zone CEMAC</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20"><i className="ri-time-line mr-1"></i>14 min de lecture</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            Préparation à l'Inspection COBAC au Cameroun — Guide Pratique 90 Jours
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 min-w-0">

            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg" alt="SIMDA Essoyomèwè" className="w-10 h-10 rounded-full object-cover border-2 border-orange-300" />
              <div>
                <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                <p className="text-xs text-gray-500">Managing Partner · Expert COBAC/CEMAC — 15+ inspections accompagnées</p>
              </div>
              <span className="ml-auto text-sm text-gray-500"><i className="ri-calendar-line mr-1"></i>Juin 2026</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#C2410C' }}>
              L'inspection COBAC est l'un des moments les plus critiques pour une institution financière en zone CEMAC. Le Cameroun concentre 14 banques agréées et 485 EMF. Notre expérience de 15+ inspections accompagnées nous permet de vous proposer un plan de préparation en 90 jours, couvrant les 5 dimensions examinées par les inspecteurs COBAC.
            </p>

            {/* Plan 90 jours */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Plan de Préparation — 90 Jours</h2>
              <div className="space-y-4">
                {[
                  { phase: 'J0-J30', titre: 'Phase 1 — Audit Interne Préparatoire', couleur: '#C2410C', items: ['Gap analysis des ratios prudentiels BEAC vs exigences COBAC', 'Revue de la politique LBC/FT vs Règlement COBAC R-2018/01', 'Inventaire et mise à jour des procédures de contrôle interne', 'Vérification des rapports du Comité d\'Audit (Instruction 007-03-2022)'] },
                  { phase: 'J30-J60', titre: 'Phase 2 — Mise en Conformité', couleur: '#D97706', items: ['Correction des écarts identifiés sur les ratios prudentiels', 'Mise à jour des procédures LBC/FT et du registre des risques', 'Formation des équipes aux questions des inspecteurs COBAC', 'Préparation de la documentation de gouvernance (CA, Comités)'] },
                  { phase: 'J60-J90', titre: 'Phase 3 — Simulation & Finalisation', couleur: '#0D7B5F', items: ['Simulation d\'inspection sur les 5 dimensions COBAC', 'Préparation du discours de présentation institutionnelle', 'Revue finale des dossiers documentaires par un expert senior', 'Briefing de la Direction Générale et du Conseil d\'Administration'] },
                ].map((phase, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: `${phase.couleur}30` }}>
                    <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${phase.couleur}10` }}>
                      <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: phase.couleur }}>{phase.phase}</span>
                      <h3 className="font-bold text-sm text-gray-900">{phase.titre}</h3>
                    </div>
                    <div className="px-5 py-4">
                      {phase.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 mb-2">
                          <i className="ri-arrow-right-line text-xs mt-1 flex-shrink-0" style={{ color: phase.couleur }}></i>
                          <p className="text-sm text-gray-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cross-links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', title: 'Observatoire COBAC CEMAC', desc: '312 textes COBAC/BEAC suivis. Alertes et analyses d\'impact.', color: '#C2410C' },
                { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', title: 'Digital Compliance Factory™', desc: 'Politiques LBC/FT COBAC, procédures Instruction 007-03-2022.', color: '#6B9B1F' },
                { href: '/agrements-afrique/', icon: 'ri-award-line', title: 'Hub Agréments Afrique', desc: 'Guide agrément bancaire COBAC, EMF, capital minimum CEMAC.', color: '#D4AF37' },
                { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', title: 'Compliance Score™ COBAC', desc: 'Diagnostic maturité réglementaire COBAC/CEMAC en 8 minutes.', color: '#86BC25' },
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
            <BlogObservatoireAgrementsCTA variant="observatoire" context="compliance" />

            {/* Sanctions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Échelle des Sanctions COBAC</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Niveau', 'Sanction', 'Conditions de déclenchement'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left font-bold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['S1', 'Avertissement', 'Anomalie ponctuelle sans impact systémique'],
                      ['S2', 'Mise en garde', 'Non-conformité récurrente ou grave'],
                      ['S3', 'Blâme', 'Violation caractérisée des règlements COBAC'],
                      ['S4', 'Limitation des activités', 'Risque systémique ou fraude identifiée'],
                      ['S5', 'Nomination administrateur provisoire', 'Situation irrémédiable ou retrait imminent'],
                      ['S6', 'Retrait d\'agrément', 'Cas extrême — risque pour les déposants'],
                    ].map((row, ri) => (
                      <tr key={ri} className={`hover:bg-gray-50/50 ${ri < 2 ? '' : ri < 4 ? 'bg-amber-50/30' : 'bg-red-50/30'}`}>
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 text-xs ${ci === 0 ? 'font-bold text-orange-700' : ci === 1 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic mt-2">Source : Convention COBAC 1990, révisée 2010. Les sanctions S3 à S6 sont publiées sur le site officiel COBAC.</p>
            </section>

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

            <div className="rounded-2xl p-7 text-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(194,65,12,0.06) 0%, rgba(13,123,95,0.04) 100%)', border: '1px solid rgba(194,65,12,0.2)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Préparez votre inspection COBAC — 90 jours</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">Notre équipe accompagne les banques et EMF camerounaises depuis leur prédiagnostic jusqu'à la restitution finale. 15+ inspections accompagnées, 0 retrait d'agrément.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
                <Link to="/regions/cameroun/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-300 text-orange-700 font-semibold text-sm cursor-pointer whitespace-nowrap">
                  <i className="ri-map-pin-line"></i>Page Cameroun
                </Link>
              </div>
            </div>
          </main>

          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Ressources COBAC</p>
                {[
                  { href: '/observatoire-reglementaire-africain/', icon: 'ri-radar-line', label: 'Observatoire COBAC CEMAC', color: '#C2410C' },
                  { href: '/agrements-afrique/', icon: 'ri-award-line', label: 'Hub Agréments COBAC', color: '#D4AF37' },
                  { href: '/digital-compliance-factory/', icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory™', color: '#6B9B1F' },
                  { href: '/compliance-score/', icon: 'ri-bar-chart-2-line', label: 'KHEPRA Compliance Score™', color: '#86BC25' },
                  { href: '/regions/cameroun/', icon: 'ri-map-pin-line', label: 'Page Cameroun', color: '#C2410C' },
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