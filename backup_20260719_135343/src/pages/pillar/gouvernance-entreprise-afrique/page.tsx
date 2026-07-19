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
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Professional%20boardroom%20meeting%20in%20Africa%20with%20diverse%20executives%20discussing%20corporate%20governance%20documents%2C%20amber%20and%20charcoal%20color%20tones%2C%20sophisticated%20corporate%20setting%2C%20modern%20African%20office%2C%20editorial%20photography%20style%2C%20clean%20professional%20aesthetic&width=1200&height=630&seq=gouvernance-pillar-og&orientation=landscape';

export default function GouvernanceEntrepriseAfriquePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'Gouvernance d\'Entreprise Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'Gouvernance d\'Entreprise Afrique', url: `${SITE_URL}/pillar/gouvernance-entreprise-afrique` }];

  const goToContact = () => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage', '@id': `${SITE_URL}/pillar/gouvernance-entreprise-afrique#webpage`, url: `${SITE_URL}/pillar/gouvernance-entreprise-afrique`,
      name: 'Gouvernance d\'Entreprise en Afrique | Khepra Experts OHADA',
      description: 'Guide complet sur la gouvernance bancaire, le conseil d\'administration et les comités spécialisés en Afrique UEMOA. Circulaires BCEAO, OHADA, standards internationaux.',
      inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Gouvernance d\'Entreprise Afrique' }] }
    }, {
      '@type': 'Article', '@id': `${SITE_URL}/pillar/gouvernance-entreprise-afrique#article`,
      headline: 'Gouvernance d\'Entreprise en Afrique : circulaires BCEAO, OHADA et standards internationaux',
      description: 'Comment structurer un conseil d\'administration performant en Afrique ? Guide complet : comités spécialisés, administrateurs indépendants, conformité OHADA.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      keywords: 'gouvernance bancaire BCEAO, conseil administration OHADA, comités spécialisés circulaire, administrateur indépendant UEMOA'
    }, {
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question', name: 'Quelles sont les exigences BCEAO pour le conseil d\'administration d\'une banque UEMOA ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La circulaire BCEAO 01-2017/CB/C impose : (1) Taille du CA entre 7 et 15 membres, (2) Au moins 2 administrateurs indépendants, (3) 4 comités spécialisés obligatoires (Audit, Risques, Rémunération, Nominations), (4) Formation obligatoire des administrateurs aux risques bancaires, (5) Auto-évaluation annuelle du CA, (6) Limitation du cumul des mandats à 5.' }
      }, { '@type': 'Question', name: 'Comment mettre en place des comités spécialisés conformes à la circulaire BCEAO ?', acceptedAnswer: { '@type': 'Answer', text: 'Les 4 comités obligatoires : Comité d\'Audit (3 membres dont 1 indépendant), Comité des Risques (surveillance ICAAP/ILAAP), Comité de Rémunération (politique de rémunération), Comité de Nominations (plan de succession). Chaque comité doit avoir une charte écrite, se réunir trimestriellement et rendre compte au CA.' }
      }, { '@type': 'Question', name: 'Qu\'est-ce qu\'un administrateur indépendant selon la BCEAO ?', acceptedAnswer: { '@type': 'Answer', text: 'Un administrateur indépendant ne doit pas : (1) Être salarié ou mandataire social de la banque depuis 5 ans, (2) Détenir plus de 10% du capital, (3) Avoir de relation d\'affaires significative avec la banque, (4) Être en lien familial avec un dirigeant. La circulaire 02-2017/CB/C détaille les critères d\'indépendance.' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Diagnostic Gouvernance', duration: '2-3 semaines', icon: 'ri-search-eye-line', items: ['Analyse de la composition du CA (taille, diversité, indépendance)', 'Évaluation du fonctionnement (fréquence, assiduité, qualité des débats)', 'Revue des chartes de comités spécialisés', 'Benchmark vs circulaires BCEAO/COBAC et standards internationaux'] },
    { phase: 'Phase 2 — Structuration CA', duration: '3-4 semaines', icon: 'ri-team-line', items: ['Profilage des administrateurs (matrice de compétences)', 'Recrutement d\'administrateurs indépendants', 'Plan de formation des administrateurs (risques, régulation, stratégie)', 'Calendrier annuel du CA et des comités'] },
    { phase: 'Phase 3 — Comités Spécialisés', duration: '2-3 semaines', icon: 'ri-organization-chart', items: ['Rédaction des chartes (Audit, Risques, Rémunération, Nominations)', 'Définition des plans de travail annuels', 'Mise en place des reportings comités → CA', 'Outils de suivi des recommandations'] },
    { phase: 'Phase 4 — Conformité OHADA', duration: '2 semaines', icon: 'ri-file-check-line', items: ['Alignement des statuts avec l\'Acte Uniforme OHADA', 'Registre des conflits d\'intérêts', 'Procédure d\'approbation des conventions réglementées', 'Documentation des décisions du CA'] },
    { phase: 'Phase 5 — Évaluation & Amélioration', duration: 'Récurrent', icon: 'ri-refresh-line', items: ['Auto-évaluation annuelle du CA (questionnaire BCEAO)', 'Évaluation individuelle des administrateurs', 'Plan d\'amélioration continue de la gouvernance', 'Reporting au régulateur (BCEAO/COBAC)'] }
  ];

  return (
    <>
      <SeoHead title="Gouvernance Entreprise Afrique | BCEAO OHADA | Khepra"
        description="Guide complet gouvernance bancaire et conseil d'administration en Afrique UEMOA. Circulaires BCEAO 01-2017, comités spécialisés, administrateurs indépendants OHADA."
        keywords="gouvernance bancaire BCEAO, conseil administration OHADA, comités spécialisés circulaire, administrateur indépendant UEMOA"
        canonicalPath="/pillar/gouvernance-entreprise-afrique" ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Conseil d'administration d'une institution financière africaine en session de gouvernance" ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z" articleAuthor="Khepra Experts" articleSection="Gouvernance"
        articleTags={['Gouvernance', 'BCEAO', 'OHADA', 'Conseil Administration', 'Comités', 'UEMOA']} />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Gouvernance d'Entreprise en Afrique</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">Comment structurer un <strong>conseil d'administration performant</strong> conforme aux circulaires BCEAO et aux standards OHADA ? Khepra Experts déploie une méthodologie éprouvée de diagnostic, structuration et évaluation de la gouvernance pour les institutions financières africaines.</p>

              <div className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">La gouvernance, pilier de la confiance en Afrique</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Les régulateurs africains — <strong>BCEAO, COBAC, BEAC</strong> — placent la gouvernance au sommet de leurs exigences. La circulaire <strong>01-2017/CB/C</strong> a transformé les standards de gouvernance bancaire en zone UEMOA. Les banques non conformes s'exposent à des sanctions, une dégradation de leur rating et une perte de confiance des investisseurs.</p>
                <p className="text-gray-700 leading-relaxed">Khepra Experts a accompagné <strong>25+ conseils d'administration</strong> en Afrique dans leur mise en conformité, de la refonte des comités spécialisés à la formation des administrateurs.</p>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2><div className="space-y-6">{methodology.map((item, i) => (<div key={i} className="bg-white border-l-4 border-amber-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"><div className="flex items-start gap-4 mb-4"><div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-2xl text-amber-600`}></i></div><div className="flex-1"><div className="flex items-center justify-between mb-2 flex-wrap gap-2"><h3 className="text-xl font-bold text-gray-900">{item.phase}</h3><span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{item.duration}</span></div><ul className="space-y-2 mt-3">{item.items.map((li, idx) => (<li key={idx} className="flex items-start gap-2 text-gray-700"><i className="ri-checkbox-circle-line text-amber-600 mt-1 flex-shrink-0"></i><span>{li}</span></li>))}</ul></div></div></div>))}</div></div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — Banque UEMOA, mise en conformité BCEAO</h2>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-amber-600"></i>Contexte</h4><p className="text-gray-700 leading-relaxed">Banque UEMOA, 500 employés. CA de 12 membres sans administrateur indépendant. 2 comités seulement (Audit, Risques). Pas d'auto-évaluation depuis 3 ans. Cumul de mandats non documenté.</p></div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6"><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-amber-600"></i>Résultats après 6 mois</h4><div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">2</div><p className="text-sm text-gray-600">Administrateurs indépendants nommés</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">4/4</div><p className="text-sm text-gray-600">Comités spécialisés opérationnels</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">100%</div><p className="text-sm text-gray-600">Conformité circulaire 01-2017</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">Note A-</div><p className="text-sm text-gray-600">Rating gouvernance BCEAO</p></div>
                  </div></div>
                </div>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">KPIs Gouvernance</h2><div className="grid md:grid-cols-2 gap-5">
                {[{ kpi: 'Taille CA', target: '7-15 membres', desc: 'Conforme circulaire BCEAO 01-2017', icon: 'ri-team-line' }, { kpi: 'Indépendance', target: '≥ 2 administrateurs', desc: 'Administrateurs indépendants qualifiés', icon: 'ri-shield-user-line' }, { kpi: 'Comités', target: '4 comités', desc: 'Audit, Risques, Rémunération, Nominations', icon: 'ri-organization-chart' }, { kpi: 'Assiduité', target: '> 90%', desc: 'Taux de présence aux réunions du CA', icon: 'ri-calendar-check-line' }, { kpi: 'Auto-évaluation', target: 'Annuelle', desc: 'Questionnaire standardisé BCEAO', icon: 'ri-survey-line' }, { kpi: 'Formation', target: '20h/an/admin', desc: 'Formation continue risques et régulation', icon: 'ri-book-open-line' }].map((item, i) => (<div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-amber-600`}></i></div><div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-amber-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div></div>))}
              </div></div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3><div className="grid md:grid-cols-3 gap-4">
                <Link to="/pillar/audit-risk-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-shield-check-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Audit & Risk</h4><p className="text-sm text-gray-600">Contrôle interne, cartographie des risques, COSO</p></Link>
                <Link to="/pillar/conformite-reglementaire-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-file-check-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Conformité</h4><p className="text-sm text-gray-600">LBC/FT, KYC, GAFI, dispositif anti-blanchiment</p></Link>
                <Link to="/pillar/esg-durabilite-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-leaf-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">ESG & Durabilité</h4><p className="text-sm text-gray-600">Reporting ESG, taxonomie verte, finance durable</p></Link>
              </div></div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl p-8"><div className="flex items-start gap-6 flex-col sm:flex-row"><div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div><div><h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts — Lomé, Togo</h3><p className="text-gray-700 leading-relaxed mb-3">Expert en gouvernance d'entreprise depuis <strong>2003</strong>. Khepra Experts a accompagné plus de 25 conseils d'administration en Afrique, formé plus de 150 administrateurs, et conçu les chartes de gouvernance de 10+ institutions financières.</p><div className="flex flex-wrap gap-3"><a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a><a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-600 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a></div></div></div></div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — Gouvernance d'Entreprise</h2><div className="space-y-4">
                {[{ q: 'Quelles sont les exigences BCEAO pour le CA d\'une banque UEMOA ?', a: 'La circulaire 01-2017 impose : taille 7-15 membres, ≥2 administrateurs indépendants, 4 comités obligatoires, formation risques, auto-évaluation annuelle, cumul mandats ≤5.' }, { q: 'Comment mettre en place des comités spécialisés ?', a: '4 comités obligatoires : Audit, Risques (ICAAP/ILAAP), Rémunération, Nominations. Chaque comité doit avoir une charte, se réunir trimestriellement et rendre compte au CA.' }, { q: 'Qu\'est-ce qu\'un administrateur indépendant BCEAO ?', a: 'Pas salarié/dirigeant depuis 5 ans, <10% capital, pas de relation d\'affaires, pas de lien familial avec un dirigeant. Circulaire 02-2017 détaille les critères.' }].map((faq, i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>))}
              </div></div>

              <div className="bg-white border-2 border-amber-600 rounded-2xl p-10 text-center mb-16"><h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter Gouvernance</h2><p className="text-gray-600 mb-6">Analyses sur les évolutions de la gouvernance bancaire en Afrique.</p><form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"><input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-600" /><button type="submit" className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button></form></div>

              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white"><h2 className="text-3xl font-bold mb-4">Prêt à renforcer votre gouvernance ?</h2><p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent dans la mise en conformité de votre gouvernance avec les exigences BCEAO/COBAC.</p><div className="flex flex-wrap gap-4 justify-center"><button onClick={goToContact} className="px-10 py-4 bg-white text-amber-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button><a href="tel:+22893984909" className="px-10 py-4 bg-amber-700 text-white border-2 border-white rounded-lg font-bold hover:bg-amber-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a></div></div>
            </article>
            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/gouvernance-entreprise-afrique`} title="Gouvernance d'Entreprise en Afrique" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic gouvernance gratuit" description="30 minutes avec un expert Khepra pour évaluer votre maturité gouvernance" /></div>
          </div>
        </main>
        <Footer /><ScrollToTop />
      </div>
    </>
  );
}



