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
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Professional%20compliance%20officers%20reviewing%20regulatory%20documents%20in%20a%20modern%20African%20office%2C%20amber%20and%20charcoal%20color%20tones%2C%20legal%20documents%20and%20regulatory%20frameworks%20on%20desk%2C%20clean%20corporate%20aesthetic%2C%20editorial%20photography%20style&width=1200&height=630&seq=conformite-pillar-og&orientation=landscape';

export default function ConformiteReglementaireAfriquePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'Conformité Réglementaire Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'Conformité Réglementaire Afrique', url: `${SITE_URL}/pillar/conformite-reglementaire-afrique` }];

  const goToContact = () => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); };

  const schemaJson = {
    '@context': 'https://schema.org', '@graph': [{
      '@type': 'WebPage', '@id': `${SITE_URL}/pillar/conformite-reglementaire-afrique#webpage`, url: `${SITE_URL}/pillar/conformite-reglementaire-afrique`,
      name: 'Conformité Réglementaire en Afrique | LBC/FT GAFI | Khepra Experts',
      description: 'Guide complet conformité réglementaire en Afrique : LBC/FT, KYC, GAFI, GIABA, GABAC, sanctions. Dispositif anti-blanchiment BCEAO/COBAC.',
      inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Conformité Réglementaire Afrique' }] }
    }, {
      '@type': 'Article', '@id': `${SITE_URL}/pillar/conformite-reglementaire-afrique#article`,
      headline: 'Conformité Réglementaire en Afrique : LBC/FT, KYC et dispositif anti-blanchiment',
      description: 'Comment structurer un dispositif LBC/FT conforme GAFI en Afrique ? Guide complet : KYC, sanctions, déclarations de soupçons, formation.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      keywords: 'LBC FT UEMOA, conformité GAFI, KYC banking Afrique, dispositif anti-blanchiment BCEAO, GIABA, GABAC, sanctions'
    }, {
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question', name: 'Quelles sont les 40 recommandations du GAFI applicables en Afrique ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les 40 recommandations du GAFI couvrent 7 domaines : (1) Politiques LBC/FT et coordination, (2) Blanchiment de capitaux et confiscation, (3) Financement du terrorisme, (4) Mesures préventives pour le secteur financier, (5) Transparence et bénéficiaires effectifs, (6) Pouvoirs des autorités compétentes, (7) Coopération internationale. La Recommandation 1 (approche par les risques) est la plus importante.' }
      }, { '@type': 'Question', name: 'Comment mettre en place un dispositif KYC conforme BCEAO ?', acceptedAnswer: { '@type': 'Answer', text: 'Le dispositif KYC BCEAO impose : (1) Identification du client (pièce d\'identité, justificatif domicile), (2) Identification du bénéficiaire effectif (≥25% capital), (3) Classification du risque client (faible, moyen, élevé), (4) Due diligence renforcée pour les PPE et pays à haut risque, (5) Mise à jour périodique (1 an risque faible, 6 mois moyen, 3 mois élevé), (6) Conservation des documents 10 ans.' }
      }, { '@type': 'Question', name: 'Comment préparer une déclaration de soupçon LBC/FT ?', acceptedAnswer: { '@type': 'Answer', text: 'La déclaration de soupçon (DS) doit être transmise à la CENTIF (Cellule Nationale de Traitement des Informations Financières) dès qu\'il existe un soupçon de blanchiment. Elle doit contenir : (1) Identité du client et bénéficiaire effectif, (2) Description des faits et opérations suspectes, (3) Montants et dates, (4) Origine présumée des fonds, (5) Tout document justificatif. La DS est confidentielle — il est interdit d\'informer le client.' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Diagnostic LBC/FT', duration: '3-4 semaines', icon: 'ri-search-eye-line', items: ['Analyse du dispositif LBC/FT existant vs 40 recommandations GAFI', 'Évaluation de la classification des risques clients', 'Revue du processus KYC et de la due diligence', 'Analyse des déclarations de soupçons (DS) historiques'] },
    { phase: 'Phase 2 — Cartographie des Risques', duration: '2-3 semaines', icon: 'ri-map-2-line', items: ['Identification des risques LBC/FT par ligne de métier', 'Analyse des risques pays, clients, produits, canaux', 'Matrice de risques LBC/FT résiduelle', 'Définition de l\'appétit au risque LBC/FT'] },
    { phase: 'Phase 3 — Politiques & Procédures', duration: '3-4 semaines', icon: 'ri-file-text-line', items: ['Rédaction de la politique LBC/FT du groupe', 'Procédures KYC détaillées (entrée en relation, suivi, sortie)', 'Procédure de déclaration de soupçon (DS)', 'Procédure de gel des avoirs et sanctions internationales'] },
    { phase: 'Phase 4 — Outils & Automatisation', duration: '4-6 semaines', icon: 'ri-cpu-line', items: ['Sélection et paramétrage d\'un outil de filtrage sanctions', 'Automatisation du scoring risque client', 'Mise en place du monitoring des transactions', 'Tableau de bord LBC/FT pour le comité de conformité'] },
    { phase: 'Phase 5 — Formation & Contrôle', duration: 'Récurrent', icon: 'ri-graduation-cap-line', items: ['Formation LBC/FT obligatoire pour tous les collaborateurs', ['Formation renforcée pour les fonctions exposées (front office, compliance)'], ['Contrôle permanent LBC/FT (niveau 2)'], 'Audit LBC/FT annuel (niveau 3) et reporting au régulateur'] }
  ];

  return (
    <>
      <SeoHead title="Conformité Réglementaire Afrique | LBC/FT GAFI | Khepra"
        description="Guide complet conformité réglementaire en Afrique : LBC/FT, KYC, GAFI, GIABA, GABAC, sanctions. Dispositif anti-blanchiment BCEAO/COBAC. Khepra Experts Lomé."
        keywords="LBC FT UEMOA, conformité GAFI, KYC banking Afrique, dispositif anti-blanchiment BCEAO, GIABA, GABAC, sanctions"
        canonicalPath="/pillar/conformite-reglementaire-afrique" ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Experts conformité Khepra analysant les dispositifs LBC/FT pour institutions africaines" ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z" articleAuthor="Khepra Experts" articleSection="Conformité"
        articleTags={['Conformité', 'LBC/FT', 'KYC', 'GAFI', 'BCEAO', 'COBAC', 'Afrique']} />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Conformité Réglementaire en Afrique</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">Comment structurer un <strong>dispositif LBC/FT</strong> conforme aux 40 recommandations du GAFI et aux exigences des régulateurs africains ? Khepra Experts déploie une méthodologie complète de diagnostic, mise en conformité et automatisation KYC.</p>

              <div className="mb-16 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">La conformité LBC/FT, un enjeu existentiel</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Le GAFI a placé plusieurs pays africains sous surveillance renforcée (liste grise). Les conséquences sont lourdes : restriction des flux financiers, coût accru des correspondances bancaires, perte d'attractivité pour les investisseurs. La <strong>BCEAO</strong>, la <strong>COBAC</strong> et les cellules nationales (<strong>GIABA</strong>, <strong>GABAC</strong>) imposent des exigences croissantes.</p>
                <p className="text-gray-700 leading-relaxed">Khepra Experts a structuré le dispositif LBC/FT de <strong>30+ institutions financières</strong> en Afrique, de la cartographie des risques au contrôle permanent.</p>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2><div className="space-y-6">{methodology.map((item, i) => (<div key={i} className="bg-white border-l-4 border-amber-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"><div className="flex items-start gap-4 mb-4"><div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-2xl text-amber-600`}></i></div><div className="flex-1"><div className="flex items-center justify-between mb-2 flex-wrap gap-2"><h3 className="text-xl font-bold text-gray-900">{item.phase}</h3><span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{item.duration}</span></div><ul className="space-y-2 mt-3">{item.items.map((li, idx) => (<li key={idx} className="flex items-start gap-2 text-gray-700"><i className="ri-checkbox-circle-line text-amber-600 mt-1 flex-shrink-0"></i><span>{Array.isArray(li) ? li[0] : li}</span></li>))}</ul></div></div></div>))}</div></div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — SFD UEMOA, mise en conformité LBC/FT</h2>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-amber-600"></i>Contexte</h4><p className="text-gray-700 leading-relaxed">SFD UEMOA, 200 000 clients, 50 agences. KYC manuel sur papier. Classification risque client inexistante. 0 déclaration de soupçon en 5 ans. Note BCEAO : insatisfaisant.</p></div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6"><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-amber-600"></i>Résultats après 12 mois</h4><div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">100%</div><p className="text-sm text-gray-600">Clients classifiés (risque)</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">18</div><p className="text-sm text-gray-600">Déclarations de soupçon/an</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">Satisfaisant</div><p className="text-sm text-gray-600">Note BCEAO (vs Insatisfaisant)</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-amber-700">-60%</div><p className="text-sm text-gray-600">Temps onboarding client</p></div>
                  </div></div>
                </div>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">KPIs Conformité</h2><div className="grid md:grid-cols-2 gap-5">
                {[{ kpi: 'KYC Complétude', target: '100% clients', desc: 'Dossiers KYC complets et à jour', icon: 'ri-user-smile-line' }, { kpi: 'Bénéficiaires Effectifs', target: '100% identifiés', desc: 'Identification du BE pour tous les clients', icon: 'ri-team-line' }, { kpi: 'Déclarations Soupçon', target: '> 0,1% clients', desc: 'Taux de DS cohérent avec le profil de risque', icon: 'ri-alert-line' }, { kpi: 'Filtrage Sanctions', target: '100% temps réel', desc: 'Screening sanctions avant toute opération', icon: 'ri-filter-line' }, { kpi: 'Formation', target: '100% collaborateurs', desc: 'Formation LBC/FT annuelle obligatoire', icon: 'ri-graduation-cap-line' }, { kpi: 'Audit LBC/FT', target: 'Note ≥ Satisfaisant', desc: 'Évaluation régulateur ou audit externe', icon: 'ri-shield-check-line' }].map((item, i) => (<div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-amber-600`}></i></div><div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-amber-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div></div>))}
              </div></div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3><div className="grid md:grid-cols-3 gap-4">
                <Link to="/pillar/audit-risk-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-shield-check-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Audit & Risk</h4><p className="text-sm text-gray-600">Contrôle interne, cartographie risques, COSO</p></Link>
                <Link to="/pillar/cybersecurite-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-lock-password-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Cybersécurité</h4><p className="text-sm text-gray-600">Protection données, PCA/PRA, résilience</p></Link>
                <Link to="/pillar/gouvernance-entreprise-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-government-line text-xl text-amber-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Gouvernance</h4><p className="text-sm text-gray-600">CA, comités spécialisés, OHADA</p></Link>
              </div></div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl p-8"><div className="flex items-start gap-6 flex-col sm:flex-row"><div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div><div><h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts</h3><p className="text-gray-700 leading-relaxed mb-3">Cabinet basé à <strong>Lomé depuis 2003</strong>. Plus de 30 institutions financières accompagnées en conformité LBC/FT : banques, SFD, FinTechs, assurances. Expertise GAFI, GIABA, GABAC, BCEAO, COBAC.</p><div className="flex flex-wrap gap-3"><a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a><a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-600 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a></div></div></div></div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — Conformité Réglementaire</h2><div className="space-y-4">
                {[{ q: 'Quelles sont les 40 recommandations GAFI ?', a: '7 domaines : (1) Politiques LBC/FT, (2) Blanchiment et confiscation, (3) Financement terrorisme, (4) Mesures préventives secteur financier, (5) Transparence bénéficiaires effectifs, (6) Pouvoirs autorités, (7) Coopération internationale. La Recommandation 1 (approche par les risques) est centrale.' }, { q: 'Comment mettre en place un dispositif KYC BCEAO ?', a: '6 étapes : identification client, bénéficiaire effectif, classification risque, due diligence renforcée PPE, mise à jour périodique, conservation documents 10 ans.' }, { q: 'Comment déclarer un soupçon LBC/FT ?', a: 'Déclaration confidentielle à la CENTIF avec : identité client/BE, description opérations suspectes, montants, origine présumée des fonds. Interdiction d\'informer le client.' }].map((faq, i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>))}
              </div></div>

              <div className="bg-white border-2 border-amber-600 rounded-2xl p-10 text-center mb-16"><h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter Conformité</h2><p className="text-gray-600 mb-6">Veille réglementaire LBC/FT, GAFI, sanctions et actualité conformité en Afrique.</p><form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"><input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-600" /><button type="submit" className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button></form></div>

              <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-2xl p-12 text-center text-white"><h2 className="text-3xl font-bold mb-4">Prêt à renforcer votre conformité LBC/FT ?</h2><p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent dans la mise en conformité avec les exigences GAFI, BCEAO et COBAC.</p><div className="flex flex-wrap gap-4 justify-center"><button onClick={goToContact} className="px-10 py-4 bg-white text-amber-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button><a href="tel:+22893984909" className="px-10 py-4 bg-amber-700 text-white border-2 border-white rounded-lg font-bold hover:bg-amber-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a></div></div>
            </article>
            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/conformite-reglementaire-afrique`} title="Conformité Réglementaire en Afrique" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic conformité gratuit" description="30 minutes avec un expert Khepra pour évaluer votre dispositif LBC/FT" /></div>
          </div>
        </main>
        <Footer /><ScrollToTop />
      </div>
    </>
  );
}



