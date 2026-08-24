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
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Professional%20audit%20and%20risk%20management%20consultants%20in%20a%20modern%20boardroom%20in%20Africa%2C%20reviewing%20financial%20documents%20and%20risk%20heatmaps%20on%20large%20screens%2C%20dark%20charcoal%20and%20emerald%20green%20accents%2C%20sophisticated%20corporate%20atmosphere%2C%20editorial%20photography%20style%2C%20clean%20minimalist%20aesthetic&width=1200&height=630&seq=audit-risk-pillar-og&orientation=landscape';

export default function AuditRiskAfriquePage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'Audit & Risk Management Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'Audit & Risk Management Afrique', url: `${SITE_URL}/pillar/audit-risk-afrique` }];

  const goToContact = () => {
    navigate('/');
    setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage',
      '@id': `${SITE_URL}/pillar/audit-risk-afrique#webpage`,
      url: `${SITE_URL}/pillar/audit-risk-afrique`,
      name: 'Audit & Risk Management en Afrique | Khepra Experts',
      description: 'Guide complet sur l\'audit prudentiel, la gestion des risques et le contrôle interne en Afrique de l\'Ouest. Méthodologie COSO, ICAAP/ILAAP, stress tests BCEAO.',
      inLanguage: 'fr',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', '@id': `${SITE_URL}/pillar/audit-risk-afrique#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Audit & Risk Management Afrique' }] }
    }, {
      '@type': 'Article',
      '@id': `${SITE_URL}/pillar/audit-risk-afrique#article`,
      headline: 'Audit & Risk Management en Afrique : guide complet pour les institutions financières UEMOA',
      description: 'Comment structurer un dispositif d\'audit et de gestion des risques conforme aux exigences BCEAO ? Guide complet avec méthodologie ICAAP/ILAAP, stress tests, cartographie des risques.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/pillar/audit-risk-afrique#webpage` },
      keywords: 'audit bancaire UEMOA, contrôle interne BCEAO, gestion des risques COBAC, ICAAP ILAAP, stress tests, cartographie risques, COSO Afrique'
    }, {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/pillar/audit-risk-afrique#faq`,
      mainEntity: [{
        '@type': 'Question', name: 'Comment mettre en place un dispositif ICAAP/ILAAP conforme BCEAO ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le dispositif ICAAP (Internal Capital Adequacy Assessment Process) et ILAAP (Internal Liquidity Adequacy Assessment Process) impose aux banques UEMOA d\'évaluer en interne l\'adéquation de leurs fonds propres et de leur liquidité. La mise en place suit 5 étapes : (1) Identification et cartographie des risques (crédit, marché, opérationnel, taux, liquidité, concentration), (2) Quantification via stress tests et analyses de scénarios, (3) Projection des besoins en capital sur 3 ans, (4) Documentation du processus et validation par le Conseil d\'Administration, (5) Intégration dans le pilotage stratégique.' }
      }, {
        '@type': 'Question', name: 'Quels sont les 5 piliers du COSO adaptés au contexte africain ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le cadre COSO 2013 adapté au contexte africain repose sur : (1) Environnement de contrôle — gouvernance solide, code d\'éthique, séparation des pouvoirs, (2) Évaluation des risques — cartographie annuelle, matrice probabilité × impact, (3) Activités de contrôle — séparation des tâches, rapprochements, contrôles IT, (4) Information et communication — reporting régulier au Conseil, (5) Pilotage — audit interne indépendant, comité d\'audit, suivi des recommandations.' }
      }, {
        '@type': 'Question', name: 'Comment préparer un stress test pour la BCEAO ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La BCEAO exige des stress tests semestriels. Préparation en 4 temps : (1) Définition des scénarios (choc taux +300bps, dépréciation FCFA, crise sectorielle), (2) Modélisation des impacts sur le portefeuille crédit et la liquidité, (3) Calcul des ratios prudentiels post-choc (CAR, LCR, NSFR), (4) Plan de remédiation si les ratios passent sous les seuils réglementaires. Khepra Experts accompagne les banques de l\'UEMOA sur ces exercices.' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Cartographie des Risques', duration: '3-4 semaines', icon: 'ri-map-2-line', items: ['Identification de tous les risques (crédit, marché, opérationnel, liquidité, taux, conformité, stratégique, réputation)', 'Matrice de criticité probabilité × impact avec échelle 5×5', 'Ateliers participatifs avec les métiers et les fonctions support', 'Base de données des risques avec historique des incidents'] },
    { phase: 'Phase 2 — Quantification & Modélisation', duration: '4-6 semaines', icon: 'ri-bar-chart-grouped-line', items: ['Modèles de VaR, Expected Shortfall, stress tests', 'ICAAP : projection des besoins en capital sur 3 ans selon 3 scénarios (central, adverse, severely adverse)', 'ILAAP : projection liquidité, gap analysis, LCR/NSFR', 'Backtesting et validation des modèles par une fonction indépendante'] },
    { phase: 'Phase 3 — Dispositif de Contrôle', duration: '3-4 semaines', icon: 'ri-shield-check-line', items: ['Cartographie des contrôles clés par processus', 'Évaluation de la conception et de l\'efficacité opérationnelle', 'Plans de remédiation pour les contrôles défaillants', 'Automatisation des contrôles via le système d\'information'] },
    { phase: 'Phase 4 — Gouvernance Risques', duration: '2-3 semaines', icon: 'ri-government-line', items: ['Mandat du Comité des Risques (charte, composition, fréquence)', 'Politique de risque (appétit, limites, tolérance)', 'Reporting mensuel au Conseil d\'Administration', 'Formation des administrateurs aux risques bancaires (circulaire BCEAO)'] },
    { phase: 'Phase 5 — Audit Interne', duration: 'Récurrent', icon: 'ri-search-eye-line', items: ['Plan d\'audit annuel basé sur les risques', 'Missions d\'audit selon les normes IIA', 'Suivi des recommandations (taux de mise en œuvre >90%)', 'Reporting trimestriel au Comité d\'Audit'] }
  ];

  return (
    <>
      <SeoHead
        title="Audit & Risk Afrique | BCEAO COBAC | Khepra Experts"
        description="Guide complet audit prudentiel, gestion des risques et contrôle interne en Afrique UEMOA. Méthodologie COSO, ICAAP/ILAAP, stress tests BCEAO. Khepra Experts Lomé."
        keywords="audit bancaire UEMOA, contrôle interne BCEAO, gestion des risques COBAC, ICAAP ILAAP, stress tests Afrique, cartographie risques COSO"
        canonicalPath="/pillar/audit-risk-afrique"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGE}
        ogImageAlt="Consultants Khepra Experts en audit et risk management pour institutions financières africaines"
        ogImageWidth={1200} ogImageHeight={630}
        ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z"
        articleAuthor="Khepra Experts" articleSection="Audit & Risk Management"
        articleTags={['Audit', 'Risk Management', 'BCEAO', 'COBAC', 'UEMOA', 'COSO', 'ICAAP', 'ILAAP']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Audit & Risk Management en Afrique de l'Ouest</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Comment structurer un <strong>dispositif d'audit et de gestion des risques</strong> conforme aux exigences des régulateurs BCEAO et COBAC ? <strong>Khepra Experts</strong> déploie une méthodologie éprouvée alignée sur les standards internationaux COSO, ISO 31000, Bâle II/III et les circulaires UEMOA.
              </p>

              <div className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi l'audit et le risk management sont critiques en Afrique</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les banques de l'UEMOA font face à des exigences réglementaires croissantes. La <strong>BCEAO</strong> impose depuis 2018 un dispositif ICAAP/ILAAP robuste. La <strong>COBAC</strong> en zone CEMAC exige des stress tests semestriels. Les normes <strong>Bâle II/III</strong> sont progressivement transposées. Le non-respect expose à des sanctions pouvant aller jusqu'à la suspension d'agrément.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Avec <strong>22 ans d'expérience</strong>, Khepra Experts a accompagné plus de 40 institutions financières en Afrique sur la structuration de leurs dispositifs d'audit interne, de cartographie des risques, de stress tests, d'ICAAP/ILAAP et de plan de continuité d'activité.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2>
                <div className="space-y-6">
                  {methodology.map((item, i) => (
                    <div key={i} className="bg-white border-l-4 border-emerald-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-2xl text-emerald-600`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.phase}</h3>
                            <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{item.duration}</span>
                          </div>
                          <ul className="space-y-2 mt-3">
                            {item.items.map((li, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <i className="ri-checkbox-circle-line text-emerald-600 mt-1 flex-shrink-0"></i>
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — Banque régionale UEMOA</h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-emerald-600"></i>Contexte</h4>
                    <p className="text-gray-700 leading-relaxed">Banque régionale UEMOA, 350 employés, total bilan 450 Mds FCFA. Cartographie des risques datant de 2021. Dispositif ICAAP partiel. Stress tests réalisés manuellement sur Excel. Pas de comité des risques formalisé.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-error-warning-line text-orange-600"></i>Diagnostic</h4>
                    <p className="text-gray-700 leading-relaxed">5 gaps critiques : (1) cartographie risques incomplète — 4 catégories de risques non couvertes, (2) ICAAP non documenté — modèle de projection capital absent, (3) stress tests non automatisés — 3 semaines de travail manuel, (4) gouvernance risques faible — ni charte ni comité, (5) 12 recommandations BCEAO non clôturées.</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-emerald-600"></i>Résultats après 12 mois</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">100%</div><p className="text-sm text-gray-600">Recommandations BCEAO clôturées</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">14,2%</div><p className="text-sm text-gray-600">CAR ratio (vs 11,8% avant)</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">2 jours</div><p className="text-sm text-gray-600">Stress tests (vs 3 semaines)</p></div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-emerald-700">Note B+</div><p className="text-sm text-gray-600">Rating BCEAO (vs C avant)</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">KPIs clés — Audit & Risk Management</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[{ kpi: 'Ratio CAR', target: '> 11,5%', desc: 'Capital Adequacy Ratio minimum réglementaire BCEAO', icon: 'ri-funds-line' }, { kpi: 'LCR', target: '> 100%', desc: 'Liquidity Coverage Ratio — résilience à 30 jours', icon: 'ri-drop-line' }, { kpi: 'NSFR', target: '> 100%', desc: 'Net Stable Funding Ratio — stabilité long terme', icon: 'ri-anchor-line' }, { kpi: 'Stress Test', target: 'CAR > 8% post-choc', desc: 'Résistance du capital après scénario adverse', icon: 'ri-earthquake-line' }, { kpi: 'Taux Audit', target: '> 90% mise en œuvre', desc: 'Recommandations d\'audit interne clôturées dans les délais', icon: 'ri-task-line' }, { kpi: 'Risk Coverage', target: '100% risques couverts', desc: 'Taux de couverture de la cartographie des risques', icon: 'ri-radar-line' }].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-emerald-600`}></i></div>
                      <div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-emerald-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/pillar/conformite-reglementaire-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-file-check-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Conformité Réglementaire</h4><p className="text-sm text-gray-600">LBC/FT, KYC, GAFI, dispositif anti-blanchiment en Afrique</p></Link>
                  <Link to="/pillar/cybersecurite-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-lock-password-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Cybersécurité</h4><p className="text-sm text-gray-600">PCA/PRA, résilience opérationnelle, protection des données</p></Link>
                  <Link to="/pillar/gouvernance-entreprise-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-government-line text-xl text-emerald-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Gouvernance d'Entreprise</h4><p className="text-sm text-gray-600">Conseil d'administration, comités spécialisés, OHADA</p></Link>
                </div>
              </div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-start gap-6 flex-col sm:flex-row">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts — Lomé, Togo</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">Cabinet de conseil en audit, risque et conformité basé à <strong>Lomé depuis 2003</strong>. Notre équipe accompagne les banques, assurances, SFD et FinTechs en Afrique de l'Ouest et Centrale sur leurs dispositifs de gestion des risques, audit interne, ICAAP/ILAAP, stress tests et conformité réglementaire.</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a>
                      <a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — Audit & Risk Management en Afrique</h2>
                <div className="space-y-4">
                  {[{ q: 'Comment mettre en place un dispositif ICAAP/ILAAP conforme BCEAO ?', a: 'Le dispositif ICAAP/ILAAP impose aux banques UEMOA d\'évaluer en interne l\'adéquation de leurs fonds propres et de leur liquidité. La mise en place suit 5 étapes : (1) Identification et cartographie des risques, (2) Quantification via stress tests et analyses de scénarios, (3) Projection des besoins en capital sur 3 ans, (4) Documentation du processus et validation par le Conseil, (5) Intégration dans le pilotage stratégique.' }, { q: 'Quels sont les 5 piliers du COSO adaptés au contexte africain ?', a: 'Le cadre COSO 2013 adapté au contexte africain repose sur : (1) Environnement de contrôle, (2) Évaluation des risques — cartographie annuelle, (3) Activités de contrôle, (4) Information et communication, (5) Pilotage — audit interne indépendant, comité d\'audit.' }, { q: 'Comment préparer un stress test BCEAO en 4 semaines ?', a: 'Préparation en 4 temps : (1) Définition des scénarios (choc taux, dépréciation FCFA, crise sectorielle), (2) Modélisation des impacts, (3) Calcul des ratios prudentiels post-choc, (4) Plan de remédiation si les ratios passent sous les seuils réglementaires.' }].map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-emerald-600 rounded-2xl p-10 text-center mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter Audit & Risk</h2>
                <p className="text-gray-600 mb-6">Recevez nos analyses trimestrielles sur l'actualité prudentielle BCEAO/COBAC.</p>
                <form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                  <input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-600" />
                  <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Prêt à renforcer votre dispositif d'audit et de risques ?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent dans la structuration d'un dispositif conforme BCEAO/COBAC, du diagnostic à la certification.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button onClick={goToContact} className="px-10 py-4 bg-white text-emerald-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button>
                  <a href="tel:+22893984909" className="px-10 py-4 bg-emerald-700 text-white border-2 border-white rounded-lg font-bold hover:bg-emerald-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a>
                </div>
              </div>
            </article>

            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/audit-risk-afrique`} title="Audit & Risk Management en Afrique de l'Ouest" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic gratuit de votre dispositif risques" description="30 minutes avec un expert Khepra pour évaluer votre maturité en gestion des risques" /></div>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}



