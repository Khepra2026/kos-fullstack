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
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=African%20sustainable%20business%20with%20solar%20panels%20and%20green%20initiatives%2C%20modern%20African%20corporate%20office%20with%20plants%20and%20natural%20light%2C%20emerald%20green%20and%20charcoal%20tones%2C%20ESG%20reporting%20documents%20on%20desk%2C%20editorial%20photography%2C%20clean%20professional%20aesthetic&width=1200&height=630&seq=esg-pillar-og&orientation=landscape';

export default function ESGDurabiliteAfriquePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'ESG & Durabilité Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'ESG & Durabilité Afrique', url: `${SITE_URL}/pillar/esg-durabilite-afrique` }];

  const goToContact = () => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); };

  const schemaJson = {
    '@context': 'https://schema.org', '@graph': [{
      '@type': 'WebPage', '@id': `${SITE_URL}/pillar/esg-durabilite-afrique#webpage`, url: `${SITE_URL}/pillar/esg-durabilite-afrique`,
      name: 'ESG & Durabilité en Afrique | Khepra Experts GRI ISSB',
      description: 'Guide complet ESG et finance durable en Afrique. Reporting extra-financier, taxonomie verte BCEAO, alignement GRI/ISSB/SDG. Khepra Experts Lomé.',
      inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'ESG & Durabilité Afrique' }] }
    }, {
      '@type': 'Article', '@id': `${SITE_URL}/pillar/esg-durabilite-afrique#article`,
      headline: 'ESG & Durabilité en Afrique : reporting, taxonomie verte et finance durable',
      description: 'Comment mettre en place une stratégie ESG en Afrique ? Guide complet : reporting GRI/ISSB, taxonomie verte, alignement ODD, notation ESG.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      keywords: 'ESG Afrique, reporting durabilité, finance verte UEMOA, taxonomie ESG BCEAO, ISSB, GRI, impact investing'
    }, {
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question', name: 'Comment mettre en place un reporting ESG conforme GRI/ISSB en Afrique ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le reporting ESG suit 6 étapes : (1) Analyse de matérialité (double matérialité ISSB), (2) Collecte des données ESG (E : CO2, eau, déchets — S : effectifs, formation, santé — G : CA, éthique, conformité), (3) Définition des KPIs alignés GRI/ISSB, (4) Rédaction du rapport ESG selon les standards, (5) Vérification externe par un auditeur indépendant, (6) Publication et communication aux parties prenantes.' }
      }, { '@type': 'Question', name: 'Qu\'est-ce que la taxonomie verte BCEAO ?', acceptedAnswer: { '@type': 'Answer', text: 'La taxonomie verte BCEAO est un système de classification des activités économiques durables applicable dans l\'UEMOA. Elle définit 7 secteurs éligibles : énergies renouvelables, efficacité énergétique, gestion durable de l\'eau, économie circulaire, transport propre, agriculture durable, bâtiments verts. Les banques UEMOA doivent progressivement aligner leurs portefeuilles.' }
      }, { '@type': 'Question', name: 'Quels sont les bénéfices d\'une notation ESG pour une entreprise africaine ?', acceptedAnswer: { '@type': 'Answer', text: 'Une notation ESG solide apporte : (1) Accès privilégié aux financements verts et sustainability-linked loans, (2) Prime de valorisation de 10-20% selon les études, (3) Attraction des investisseurs internationaux (IFC, BAD, DFIs), (4) Réduction du coût du capital de 50-100bps, (5) Avantage concurrentiel sur les appels d\'offres incluant des critères ESG.' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Diagnostic ESG', duration: '3-4 semaines', icon: 'ri-search-eye-line', items: ['Analyse de matérialité (double matérialité)', 'Évaluation des 3 piliers E, S, G', 'Benchmark sectoriel ESG (pairs africains et internationaux)', 'Gap analysis vs standards GRI, ISSB, SDG'] },
    { phase: 'Phase 2 — Stratégie ESG', duration: '3-4 semaines', icon: 'ri-compass-3-line', items: ['Définition de la vision ESG et des objectifs', 'Feuille de route ESG sur 3 ans', 'Alignement avec la taxonomie verte BCEAO', 'Politiques ESG : environnementale, sociale, gouvernance'] },
    { phase: 'Phase 3 — Collecte & KPIs', duration: '4-6 semaines', icon: 'ri-database-2-line', items: ['Identification des KPIs ESG pertinents', 'Mise en place du système de collecte de données', 'Calcul de l\'empreinte carbone (Scope 1, 2, 3)', 'Tableau de bord ESG avec cibles et alertes'] },
    { phase: 'Phase 4 — Reporting ESG', duration: '4-6 semaines', icon: 'ri-file-text-line', items: ['Rédaction du rapport ESG conforme GRI/ISSB', 'Intégration des recommandations TCFD (risques climatiques)', 'Alignement avec les ODD (Objectifs de Développement Durable)', 'Vérification externe et publication'] },
    { phase: 'Phase 5 — Amélioration Continue', duration: 'Récurrent', icon: 'ri-refresh-line', items: ['Mise à jour annuelle du rapport ESG', 'Suivi des KPIs et plans d\'action', 'Veille réglementaire ESG (BCEAO, COBAC, UE)', 'Préparation à la notation ESG (MSCI, Sustainalytics, Vigeo)'] }
  ];

  return (
    <>
      <SeoHead title="ESG & Durabilité Afrique | GRI ISSB | Khepra Experts"
        description="Guide complet ESG et finance durable en Afrique. Reporting extra-financier GRI/ISSB, taxonomie verte BCEAO, alignement ODD. Khepra Experts Lomé."
        keywords="ESG Afrique, reporting durabilité, finance verte UEMOA, taxonomie ESG BCEAO, ISSB, GRI, impact investing Afrique"
        canonicalPath="/pillar/esg-durabilite-afrique" ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Consultants Khepra Experts en stratégie ESG et durabilité pour entreprises africaines" ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z" articleAuthor="Khepra Experts" articleSection="ESG"
        articleTags={['ESG', 'Durabilité', 'Finance Verte', 'GRI', 'ISSB', 'Afrique']} />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">ESG & Durabilité en Afrique</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">Comment structurer une <strong>stratégie ESG</strong> qui répond aux exigences des investisseurs et des régulateurs en Afrique ? Khepra Experts déploie une approche complète de diagnostic, stratégie et reporting extra-financier aligné sur les standards GRI, ISSB et la taxonomie verte BCEAO.</p>

              <div className="mb-16 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">L'ESG, un impératif stratégique pour les entreprises africaines</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Les investisseurs internationaux — IFC, BAD, DFIs, fonds ESG — exigent désormais un <strong>reporting extra-financier</strong> de qualité. La BCEAO développe sa taxonomie verte. L'ISSB (International Sustainability Standards Board) harmonise les standards mondiaux. Les entreprises africaines qui anticipent ces exigences gagnent un avantage compétitif durable.</p>
                <p className="text-gray-700 leading-relaxed">Khepra Experts accompagne les entreprises dans leur <strong>transition ESG</strong> : diagnostic, stratégie, collecte de données, reporting GRI/ISSB, alignement ODD et préparation aux notations extra-financières.</p>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2><div className="space-y-6">{methodology.map((item, i) => (<div key={i} className="bg-white border-l-4 border-emerald-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"><div className="flex items-start gap-4 mb-4"><div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-2xl text-emerald-600`}></i></div><div className="flex-1"><div className="flex items-center justify-between mb-2 flex-wrap gap-2"><h3 className="text-xl font-bold text-gray-900">{item.phase}</h3><span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{item.duration}</span></div><ul className="space-y-2 mt-3">{item.items.map((li, idx) => (<li key={idx} className="flex items-start gap-2 text-gray-700"><i className="ri-checkbox-circle-line text-emerald-600 mt-1 flex-shrink-0"></i><span>{li}</span></li>))}</ul></div></div></div>))}</div></div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — Groupe agro-industriel ouest-africain</h2>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-emerald-600"></i>Contexte</h4><p className="text-gray-700 leading-relaxed">Groupe agro-industriel, 1200 employés, CA 18 Mds FCFA. Aucun reporting ESG. Pression des clients européens pour certification durabilité. Accès refusé à une sustainability-linked loan de 5 Mds FCFA.</p></div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6"><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-emerald-600"></i>Résultats après 9 mois</h4><div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">5 Mds FCFA</div><p className="text-sm text-gray-600">Sustainability-linked loan obtenue</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">Score B</div><p className="text-sm text-gray-600">Notation ESG (vs non noté)</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">-22%</div><p className="text-sm text-gray-600">Réduction empreinte carbone</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">3 contrats</div><p className="text-sm text-gray-600">Nouveaux clients européens</p></div>
                  </div></div>
                </div>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">KPIs ESG</h2><div className="grid md:grid-cols-2 gap-5">
                {[{ kpi: 'Empreinte Carbone', target: '-30% sur 5 ans', desc: 'Scope 1, 2, 3 — aligné Net Zero', icon: 'ri-cloud-line' }, { kpi: 'Mix Énergétique', target: '> 20% renouvelable', desc: 'Part des énergies propres dans le total', icon: 'ri-sun-line' }, { kpi: 'Taux Féminisation', target: '> 40% management', desc: 'Diversité de genre dans l\'encadrement', icon: 'ri-women-line' }, { kpi: 'Formation', target: '> 30h/an/employé', desc: 'Heures de formation par employé', icon: 'ri-graduation-cap-line' }, { kpi: 'Conformité ESG', target: '100% politique ESG', desc: 'Politiques environnementales et sociales', icon: 'ri-shield-check-line' }, { kpi: 'Reporting', target: 'Annuel GRI/ISSB', desc: 'Publication rapport extra-financier', icon: 'ri-file-text-line' }].map((item, i) => (<div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-emerald-600`}></i></div><div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-emerald-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div></div>))}
              </div></div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3><div className="grid md:grid-cols-3 gap-4">
                <Link to="/pillar/gouvernance-entreprise-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-government-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Gouvernance</h4><p className="text-sm text-gray-600">CA, comités, administrateurs indépendants BCEAO</p></Link>
                <Link to="/pillar/finance-performance-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-funds-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Finance & Performance</h4><p className="text-sm text-gray-600">Business plan, levée de fonds, due diligence</p></Link>
                <Link to="/pillar/conformite-reglementaire-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-file-check-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Conformité</h4><p className="text-sm text-gray-600">LBC/FT, KYC, GAFI, dispositif anti-blanchiment</p></Link>
              </div></div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8"><div className="flex items-start gap-6 flex-col sm:flex-row"><div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div><div><h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts</h3><p className="text-gray-700 leading-relaxed mb-3">Cabinet de conseil basé à <strong>Lomé depuis 2003</strong>. Khepra Experts accompagne les entreprises africaines dans leur transition ESG : diagnostic, stratégie, reporting GRI/ISSB, alignement taxonomie verte BCEAO, et préparation aux notations extra-financières.</p><div className="flex flex-wrap gap-3"><a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a><a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a></div></div></div></div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — ESG & Durabilité</h2><div className="space-y-4">
                {[{ q: 'Comment mettre en place un reporting ESG GRI/ISSB ?', a: '6 étapes : (1) Analyse de matérialité, (2) Collecte données ESG, (3) Définition KPIs GRI/ISSB, (4) Rédaction rapport, (5) Vérification externe, (6) Publication. Khepra Experts accompagne de bout en bout.' }, { q: 'Qu\'est-ce que la taxonomie verte BCEAO ?', a: 'Classification des activités durables UEMOA : 7 secteurs (énergies renouvelables, efficacité énergétique, eau, économie circulaire, transport propre, agriculture durable, bâtiments verts).' }, { q: 'Bénéfices d\'une notation ESG ?', a: 'Accès financements verts, prime valorisation 10-20%, attraction investisseurs internationaux, réduction coût capital 50-100bps, avantage concurrentiel appels d\'offres ESG.' }].map((faq, i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>))}
              </div></div>

              <div className="bg-white border-2 border-emerald-600 rounded-2xl p-10 text-center mb-16"><h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter ESG</h2><p className="text-gray-600 mb-6">Analyses trimestrielles sur l'ESG, la finance verte et la taxonomie durable en Afrique.</p><form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"><input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-600" /><button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button></form></div>

              <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-12 text-center text-white"><h2 className="text-3xl font-bold mb-4">Prêt à structurer votre stratégie ESG ?</h2><p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent du diagnostic à la notation ESG, en passant par le reporting GRI/ISSB.</p><div className="flex flex-wrap gap-4 justify-center"><button onClick={goToContact} className="px-10 py-4 bg-white text-emerald-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button><a href="tel:+22893984909" className="px-10 py-4 bg-emerald-700 text-white border-2 border-white rounded-lg font-bold hover:bg-emerald-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a></div></div>
            </article>
            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/esg-durabilite-afrique`} title="ESG & Durabilité en Afrique" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic ESG gratuit" description="30 minutes avec un expert Khepra pour évaluer votre maturité ESG" /></div>
          </div>
        </main>
        <Footer /><ScrollToTop />
      </div>
    </>
  );
}



