import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import ContextualCTA from '@/components/feature/ContextualCTA';
import SocialShareWidget from '@/components/feature/SocialShareWidget';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Professional%20financial%20advisors%20analyzing%20business%20plans%20and%20financial%20models%20on%20laptops%20in%20a%20modern%20African%20office%2C%20teal%20and%20charcoal%20color%20tones%2C%20clean%20corporate%20aesthetic%2C%20editorial%20photography%2C%20charts%20and%20graphs%20on%20screens&width=1200&height=630&seq=finance-perf-pillar-og&orientation=landscape';

export default function FinancePerformanceAfriquePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'Finance & Performance Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'Finance & Performance Afrique', url: `${SITE_URL}/pillar/finance-performance-afrique` }];

  const goToContact = () => {
    navigate('/');
    setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage', '@id': `${SITE_URL}/pillar/finance-performance-afrique#webpage`, url: `${SITE_URL}/pillar/finance-performance-afrique`, name: 'Finance & Performance en Afrique | Khepra Experts',
      description: 'Guide complet sur le business plan, la modélisation financière et la levée de fonds en Afrique. Méthodologie, cas pratiques, conseils d\'experts Khepra Experts Lomé.',
      inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Finance & Performance Afrique' }] }
    }, {
      '@type': 'Article', '@id': `${SITE_URL}/pillar/finance-performance-afrique#article`,
      headline: 'Finance & Performance en Afrique : business plan, levée de fonds et due diligence',
      description: 'Comment réussir sa levée de fonds en Afrique ? Guide complet : business plan OHADA, modélisation financière, due diligence investisseurs.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      keywords: 'levée de fonds Afrique, business plan UEMOA, modélisation financière, due diligence PME, valorisation entreprise Afrique'
    }, {
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question', name: 'Comment réussir une levée de fonds pour une PME en Afrique de l\'Ouest ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Une levée de fonds réussie en Afrique de l\'Ouest suit 6 étapes : (1) Business plan conforme OHADA avec projections sur 5 ans, (2) Modèle financier dynamique (P&L, bilan, cash flow), (3) Valorisation de l\'entreprise (DCF, comparables), (4) Data room virtuelle avec due diligence pack, (5) Ciblage des investisseurs (PE funds, DFIs, family offices, banques de développement), (6) Négociation du term sheet et closing juridique. Khepra Experts a levé plus de 120M USD pour ses clients en 22 ans.' }
      }, {
        '@type': 'Question', name: 'Quel est le coût d\'un business plan professionnel pour une PME africaine ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le coût d\'un business plan complet pour une PME africaine varie de 3 à 12 millions FCFA selon la complexité. Il inclut : étude de marché (1,5-3M), modèle financier (1-3M), rédaction BP (1-4M), pitch deck investisseurs (0,5-2M). Khepra Experts propose des forfaits modulaires avec livraison en 4-8 semaines.' }
      }, {
        '@type': 'Question', name: 'Quels sont les ratios financiers clés pour convaincre un investisseur ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les 5 ratios clés : (1) CAGR — croissance annuelle >15%, (2) Marge d\'EBITDA — >20% pour manufacturing, >30% pour services, (3) Ratio d\'endettement — D/E <2x, (4) ROE — >15%, (5) DSO — <60 jours. Les investisseurs regardent aussi le cash flow opérationnel positif, la qualité du management et la taille du marché adressable.' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Business Plan', duration: '4-6 semaines', icon: 'ri-file-text-line', items: ['Étude de marché approfondie (taille, croissance, segments, concurrence)', 'Stratégie commerciale : pricing, distribution, marketing', 'Plan opérationnel : ressources humaines, locaux, équipements', 'Projections financières sur 5 ans : P&L, bilan, cash flow, ratios'] },
    { phase: 'Phase 2 — Modèle Financier', duration: '3-4 semaines', icon: 'ri-line-chart-line', items: ['Modèle dynamique avec scénarios (optimiste, baseline, pessimiste)', 'Calcul du BFR, point mort, TRI, VAN, payback period', 'Analyse de sensibilité sur les hypothèses clés', 'Tableaux de bord et KPIs sectoriels'] },
    { phase: 'Phase 3 — Due Diligence', duration: '3-5 semaines', icon: 'ri-search-eye-line', items: ['Due diligence financière : revue des 3 derniers exercices', 'Due diligence fiscale et sociale : conformité OHADA', 'Due diligence juridique : contrats, propriété intellectuelle, litiges', 'Rapport de due diligence avec red flags et recommandations'] },
    { phase: 'Phase 4 — Valorisation', duration: '2-3 semaines', icon: 'ri-money-dollar-circle-line', items: ['Valorisation DCF (Discounted Cash Flow) avec WACC local', 'Multiples de comparables sectoriels', 'Valorisation pré-money et post-money', 'Term sheet : clauses clés, protection, sortie'] },
    { phase: 'Phase 5 — Levée de Fonds', duration: '8-12 semaines', icon: 'ri-funds-line', items: ['Ciblage investisseurs : PE, DFIs, family offices, banques', 'Préparation du pitch deck et executive summary', 'Roadshow investisseurs et Q&A', 'Négociation, closing et décaissement'] }
  ];

  return (
    <>
      <SeoHead
        title="Finance & Performance Afrique | Business Plan Levée Fonds"
        description="Guide complet finance d'entreprise en Afrique : business plan OHADA, modélisation financière, levée de fonds, due diligence. Khepra Experts Lomé — 120M+ USD levés."
        keywords="levée de fonds Afrique, business plan UEMOA, modélisation financière, due diligence PME, valorisation entreprise Afrique, financement PME"
        canonicalPath="/pillar/finance-performance-afrique"
        ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Experts Khepra en finance d'entreprise et levée de fonds pour PME africaines"
        ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z"
        articleAuthor="Khepra Experts" articleSection="Finance & Performance"
        articleTags={['Finance', 'Levée de fonds', 'Business Plan', 'Afrique', 'UEMOA', 'Due Diligence']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Finance & Performance en Afrique</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Comment <strong>structurer un business plan</strong> qui convainc les investisseurs en Afrique ? Khepra Experts, cabinet basé à <strong>Lomé, Togo</strong>, partage sa méthodologie éprouvée sur plus de 120 millions USD levés pour ses clients.
              </p>

              <div className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">L'accès au financement, défi numéro 1 des PME africaines</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En Afrique de l'Ouest, <strong>70% des PME</strong> citent le financement comme leur principal frein à la croissance. Le déficit de financement des PME africaines est estimé à <strong>140 milliards USD</strong> par la SFI. Pourtant, les fonds d'investissement dédiés à l'Afrique ont atteint des records : 7,4 milliards USD levés en 2024 par les PE funds africains.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Le problème n'est pas le manque d'argent — c'est le manque de <strong>business plans bancables</strong>. Khepra Experts comble ce gap en produisant des dossiers d'investissement conformes aux standards des due diligences internationales.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2>
                <div className="space-y-6">
                  {methodology.map((item, i) => (
                    <div key={i} className="bg-white border-l-4 border-teal-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-2xl text-teal-600`}></i></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2"><h3 className="text-xl font-bold text-gray-900">{item.phase}</h3><span className="text-sm font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">{item.duration}</span></div>
                          <ul className="space-y-2 mt-3">{item.items.map((li, idx) => (<li key={idx} className="flex items-start gap-2 text-gray-700"><i className="ri-checkbox-circle-line text-teal-600 mt-1 flex-shrink-0"></i><span>{li}</span></li>))}</ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — FinTech ouest-africaine, Série A</h2>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-teal-600"></i>Contexte</h4><p className="text-gray-700 leading-relaxed">FinTech de paiement mobile, 3 ans d'existence, 25 employés, CA 180M FCFA. Recherche Série A de 5M USD pour expansion Côte d'Ivoire et Sénégal. Business plan existant jugé "trop léger" par 3 fonds approchés.</p></div>
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-lightbulb-line text-teal-600"></i>Plan d'action</h4><p className="text-gray-700 leading-relaxed">Business plan complet + modèle financier 5 ans + data room virtuelle + pitch deck 15 slides. Segmentation TAM/SAM/SOM. Projections avec 3 scénarios. Due diligence pack : contrats, propriété intellectuelle, KYC/AML, conformité BCEAO.</p></div>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-teal-600"></i>Résultats</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-teal-700">5,2M USD</div><p className="text-sm text-gray-600">Levés (cible 5M)</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-teal-700">12 semaines</div><p className="text-sm text-gray-600">Du BP au closing</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-teal-700">6 offres</div><p className="text-sm text-gray-600">Investisseurs intéressés</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-teal-700">8,5M USD</div><p className="text-sm text-gray-600">Valorisation post-money</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Ratios clés — Finance & Performance</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[{ kpi: 'CAGR CA', target: '> 15%', desc: 'Taux de croissance annuel composé sur 5 ans', icon: 'ri-line-chart-line' }, { kpi: 'Marge EBITDA', target: '> 20%', desc: 'Seuil de rentabilité opérationnelle attractive', icon: 'ri-funds-line' }, { kpi: 'Ratio D/E', target: '< 2x', desc: 'Endettement acceptable pour les prêteurs', icon: 'ri-scales-line' }, { kpi: 'ROE', target: '> 15%', desc: 'Retour sur capitaux propres — critère investisseur', icon: 'ri-pie-chart-line' }, { kpi: 'DSO', target: '< 60 jours', desc: 'Délai de recouvrement — santé de la trésorerie', icon: 'ri-time-line' }, { kpi: 'Cash Flow', target: 'Positif à T+24', desc: 'Cash flow opérationnel positif avant 2 ans', icon: 'ri-money-dollar-circle-line' }].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-teal-600`}></i></div><div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-teal-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div></div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/pillar/pme-afrique-croissance" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-store-2-line text-xl text-teal-600"></i></div><h4 className="font-bold text-gray-900 mb-1">PME Afrique</h4><p className="text-sm text-gray-600">Financement, croissance, fiscalité, digitalisation des PME</p></Link>
                  <Link to="/pillar/audit-risk-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-shield-check-line text-xl text-teal-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Audit & Risk</h4><p className="text-sm text-gray-600">Gestion des risques, contrôle interne, ICAAP/ILAAP</p></Link>
                  <Link to="/pillar/esg-durabilite-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-leaf-line text-xl text-teal-600"></i></div><h4 className="font-bold text-gray-900 mb-1">ESG & Durabilité</h4><p className="text-sm text-gray-600">Finance durable, taxonomie verte, reporting ESG</p></Link>
                </div>
              </div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-teal-50 rounded-2xl p-8">
                <div className="flex items-start gap-6 flex-col sm:flex-row"><div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div><div><h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts</h3><p className="text-gray-700 leading-relaxed mb-3">Cabinet de conseil en stratégie financière basé à <strong>Lomé depuis 2003</strong>. Plus de <strong>120 millions USD levés</strong> pour nos clients, 200+ business plans produits, interventions dans 20 pays africains.</p><div className="flex flex-wrap gap-3"><a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a><a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-teal-600 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a></div></div></div>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — Finance & Performance</h2><div className="space-y-4">{[{ q: 'Comment réussir une levée de fonds pour une PME en Afrique de l\'Ouest ?', a: 'Une levée de fonds réussie suit 6 étapes : (1) Business plan conforme OHADA avec projections 5 ans, (2) Modèle financier dynamique, (3) Valorisation (DCF, comparables), (4) Data room avec due diligence pack, (5) Ciblage investisseurs, (6) Négociation du term sheet et closing. Khepra Experts a levé plus de 120M USD pour ses clients.' }, { q: 'Quel est le coût d\'un business plan professionnel ?', a: 'Le coût varie de 3 à 12 millions FCFA selon la complexité : étude de marché (1,5-3M), modèle financier (1-3M), rédaction (1-4M), pitch deck (0,5-2M). Livraison en 4-8 semaines.' }, { q: 'Quels ratios financiers regardent les investisseurs en Afrique ?', a: 'Les 5 ratios clés : CAGR >15%, Marge EBITDA >20%, D/E <2x, ROE >15%, DSO <60 jours. Les investisseurs évaluent aussi la qualité du management et le TAM (marché adressable).' }].map((faq, i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>))}</div></div>

              <div className="bg-white border-2 border-teal-600 rounded-2xl p-10 text-center mb-16"><h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter Finance & Performance</h2><p className="text-gray-600 mb-6">Analyses trimestrielles sur le financement des PME et les levées de fonds en Afrique.</p><form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"><input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-600" /><button type="submit" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button></form></div>

              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-12 text-center text-white"><h2 className="text-3xl font-bold mb-4">Prêt à structurer votre levée de fonds ?</h2><p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent du business plan au closing, avec une méthodologie éprouvée sur plus de 120M USD levés.</p><div className="flex flex-wrap gap-4 justify-center"><button onClick={goToContact} className="px-10 py-4 bg-white text-teal-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button><a href="tel:+22893984909" className="px-10 py-4 bg-teal-700 text-white border-2 border-white rounded-lg font-bold hover:bg-teal-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a></div></div>
            </article>
            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/finance-performance-afrique`} title="Finance & Performance en Afrique" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic gratuit — Finance & Performance" description="30 minutes avec un expert Khepra pour évaluer votre maturité financière" /></div>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}