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
const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Cybersecurity%20operations%20center%20in%20Africa%20with%20screens%20showing%20network%20security%20dashboards%2C%20modern%20dark%20office%20with%20blue%20and%20teal%20accent%20lighting%2C%20professional%20team%20monitoring%20systems%2C%20charcoal%20and%20rose%20color%20tones%2C%20editorial%20photography%2C%20clean%20tech%20aesthetic&width=1200&height=630&seq=cybersecurite-pillar-og&orientation=landscape';

export default function CybersecuriteAfriquePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbItems = [{ label: 'Accueil', href: '/' }, { label: 'Cybersécurité Afrique' }];
  const visibleBreadcrumbItems = [{ label: 'Accueil', href: '/', url: `${SITE_URL}/` }, { label: 'Cybersécurité Afrique', url: `${SITE_URL}/pillar/cybersecurite-afrique` }];

  const goToContact = () => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); };

  const schemaJson = {
    '@context': 'https://schema.org', '@graph': [{
      '@type': 'WebPage', '@id': `${SITE_URL}/pillar/cybersecurite-afrique#webpage`, url: `${SITE_URL}/pillar/cybersecurite-afrique`,
      name: 'Cybersécurité en Afrique | PCA PRA Résilience | Khepra Experts',
      description: 'Guide complet cybersécurité bancaire en Afrique : PCA/PRA, résilience opérationnelle, protection des données personnelles, continuité d\'activité. Khepra Experts Lomé.',
      inLanguage: 'fr', isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Khepra Experts' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Cybersécurité Afrique' }] }
    }, {
      '@type': 'Article', '@id': `${SITE_URL}/pillar/cybersecurite-afrique#article`,
      headline: 'Cybersécurité en Afrique : PCA, PRA et résilience opérationnelle des institutions financières',
      description: 'Comment protéger son institution financière contre les cyberattaques en Afrique ? Guide complet : PCA, PRA, continuité d\'activité, ISO 27001, protection des données.',
      author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
      datePublished: '2026-06-14', dateModified: '2026-06-14',
      keywords: 'cybersécurité bancaire Afrique, protection données personnelles, PCA PRA banque, résilience opérationnelle, ISO 27001'
    }, {
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question', name: 'Comment mettre en place un PCA/PRA conforme aux exigences BCEAO ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le PCA (Plan de Continuité d\'Activité) et le PRA (Plan de Reprise d\'Activité) doivent suivre la circulaire BCEAO : (1) Analyse d\'impact sur l\'activité (BIA) — identifier les processus critiques, (2) Définition des RTO (<4h pour critique) et RPO (<15 min), (3) Stratégie de continuité (site de secours, redondance), (4) Rédaction du PCA et PRA, (5) Tests semestriels et mise à jour annuelle, (6) Validation par le Conseil d\'Administration.' }
      }, { '@type': 'Question', name: 'Quelles sont les principales cybermenaces pour les banques africaines ?', acceptedAnswer: { '@type': 'Answer', text: 'Les 5 principales menaces : (1) Ransomware — +300% d\'attaques en Afrique en 2024, (2) Phishing ciblant les clients (fraude au virement), (3) Attaques DDoS sur les services digitaux, (4) Compromission d\'email professionnel (BEC), (5) Insiders malveillants ou négligents. Le coût moyen d\'une cyberattaque pour une banque africaine est estimé à 1,5M USD.' }
      }, { '@type': 'Question', name: 'Comment se préparer à une certification ISO 27001 en Afrique ?', acceptedAnswer: { '@type': 'Answer', text: 'La certification ISO 27001 suit 7 étapes : (1) Analyse des écarts (gap analysis), (2) Définition du périmètre SMSI, (3) Analyse de risques selon la méthodologie ISO 27005, (4) Implémentation des 114 mesures de l\'Annexe A, (5) Formation et sensibilisation, (6) Audit interne, (7) Audit de certification par un organisme accrédité (6-12 mois pour une banque moyenne).' }
      }]
    }]
  };

  const methodology = [
    { phase: 'Phase 1 — Diagnostic Cyber', duration: '3-4 semaines', icon: 'ri-search-eye-line', items: ['Audit de la maturité cybersécurité (NIST CSF, ISO 27001)', 'Analyse des menaces et vulnérabilités', 'Tests d\'intrusion (pentest) et scan de vulnérabilités', 'Évaluation du PCA/PRA existant'] },
    { phase: 'Phase 2 — BIA & Stratégie', duration: '3-4 semaines', icon: 'ri-radar-line', items: ['Analyse d\'impact sur l\'activité (BIA)', 'Définition des RTO/RPO par processus critique', 'Stratégie de continuité (site de secours, cloud)', 'Stratégie de reprise après sinistre'] },
    { phase: 'Phase 3 — PCA/PRA', duration: '4-6 semaines', icon: 'ri-file-shield-2-line', items: ['Rédaction du Plan de Continuité d\'Activité', 'Rédaction du Plan de Reprise d\'Activité informatique', 'Procédures de basculement et de retour arrière', 'Plan de communication de crise'] },
    { phase: 'Phase 4 — Implémentation Sécurité', duration: '8-12 semaines', icon: 'ri-shield-keyhole-line', items: ['Déploiement des contrôles ISO 27001 (Annexe A)', 'Mise en place du SOC (Security Operations Center)', 'Durcissement des infrastructures et endpoints', 'Gestion des identités et accès (IAM, MFA)'] },
    { phase: 'Phase 5 — Tests & Certification', duration: 'Récurrent', icon: 'ri-test-tube-line', items: ['Tests PCA/PRA semestriels (tabletop + réel)', 'Exercices de simulation de crise cyber', 'Audit interne ISO 27001', 'Préparation à la certification et maintien'] }
  ];

  return (
    <>
      <SeoHead title="Cybersécurité Afrique | PCA PRA Résilience | Khepra Experts"
        description="Guide complet cybersécurité bancaire en Afrique : PCA/PRA, résilience opérationnelle, ISO 27001, protection des données. Khepra Experts Lomé."
        keywords="cybersécurité bancaire Afrique, protection données personnelles, PCA PRA banque, résilience opérationnelle, ISO 27001 Afrique"
        canonicalPath="/pillar/cybersecurite-afrique" ogType="article" structuredData={schemaJson} ogImage={OG_IMAGE}
        ogImageAlt="Experts Khepra en cybersécurité et résilience opérationnelle pour banques africaines" ogImageWidth={1200} ogImageHeight={630} ogLocale="fr_FR"
        articlePublishedTime="2026-06-14T00:00:00Z" articleModifiedTime="2026-06-14T00:00:00Z" articleAuthor="Khepra Experts" articleSection="Cybersécurité"
        articleTags={['Cybersécurité', 'PCA', 'PRA', 'Résilience', 'ISO 27001', 'Afrique']} />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Cybersécurité en Afrique</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">Comment protéger votre institution financière contre les <strong>cyberattaques</strong> en Afrique ? Khepra Experts déploie une approche complète : diagnostic, PCA/PRA, résilience opérationnelle, certification ISO 27001 et protection des données.</p>

              <div className="mb-16 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">La cybersécurité, risque numéro 1 des banques africaines</h2>
                <p className="text-gray-700 leading-relaxed mb-6">L'Afrique a connu <strong>+300% d'attaques par ransomware</strong> en 2024. Les institutions financières sont les cibles prioritaires. La BCEAO exige désormais un PCA/PRA robuste, des tests semestriels et un dispositif de cybersécurité conforme aux standards internationaux. Le coût moyen d'une cyberattaque pour une banque africaine : <strong>1,5 million USD</strong>.</p>
                <p className="text-gray-700 leading-relaxed">Khepra Experts accompagne les institutions financières dans le renforcement de leur <strong>cyber-résilience</strong> : BIA, PCA, PRA, tests d'intrusion, certification ISO 27001.</p>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 5 phases</h2><div className="space-y-6">{methodology.map((item, i) => (<div key={i} className="bg-white border-l-4 border-rose-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"><div className="flex items-start gap-4 mb-4"><div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-2xl text-rose-600`}></i></div><div className="flex-1"><div className="flex items-center justify-between mb-2 flex-wrap gap-2"><h3 className="text-xl font-bold text-gray-900">{item.phase}</h3><span className="text-sm font-semibold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">{item.duration}</span></div><ul className="space-y-2 mt-3">{item.items.map((li, idx) => (<li key={idx} className="flex items-start gap-2 text-gray-700"><i className="ri-checkbox-circle-line text-rose-600 mt-1 flex-shrink-0"></i><span>{li}</span></li>))}</ul></div></div></div>))}</div></div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client — SFD UEMOA, mise en place PCA/PRA</h2>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="ri-building-line text-rose-600"></i>Contexte</h4><p className="text-gray-700 leading-relaxed">SFD UEMOA, 150 agences. Pas de PCA/PRA. Attaque ransomware en 2025 — 5 jours d'indisponibilité. Perte estimée : 280M FCFA. Exigence BCEAO : PCA/PRA sous 6 mois.</p></div>
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6"><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><i className="ri-trophy-line text-rose-600"></i>Résultats après 6 mois</h4><div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-rose-700">RTO 4h</div><p className="text-sm text-gray-600">Processus critiques</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-rose-700">RPO 15min</div><p className="text-sm text-gray-600">Perte données max</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-rose-700">2 tests/an</div><p className="text-sm text-gray-600">Exercices PCA/PRA</p></div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm"><div className="text-2xl font-bold text-rose-700">Conforme</div><p className="text-sm text-gray-600">Exigence BCEAO</p></div>
                  </div></div>
                </div>
              </div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">KPIs Cybersécurité</h2><div className="grid md:grid-cols-2 gap-5">
                {[{ kpi: 'RTO Critique', target: '< 4 heures', desc: 'Temps de reprise processus critiques', icon: 'ri-timer-line' }, { kpi: 'RPO', target: '< 15 minutes', desc: 'Perte maximale de données acceptable', icon: 'ri-database-2-line' }, { kpi: 'Tests PCA', target: '2 exercices/an', desc: 'Tests tabletop + basculement réel', icon: 'ri-test-tube-line' }, { kpi: 'Pentest', target: '1 fois/an', desc: 'Tests d\'intrusion externes et internes', icon: 'ri-bug-line' }, { kpi: 'MFA', target: '100% couvert', desc: 'Authentification multi-facteurs déployée', icon: 'ri-fingerprint-line' }, { kpi: 'Formation', target: '2 sessions/an', desc: 'Sensibilisation phishing pour tous', icon: 'ri-alert-line' }].map((item, i) => (<div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0"><i className={`${item.icon} text-xl text-rose-600`}></i></div><div><h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3><p className="text-sm font-semibold text-rose-700 mb-1">{item.target}</p><p className="text-sm text-gray-600">{item.desc}</p></div></div>))}
              </div></div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3><div className="grid md:grid-cols-3 gap-4">
                <Link to="/pillar/transformation-digitale-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-smartphone-line text-xl text-rose-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Transformation Digitale</h4><p className="text-sm text-gray-600">Core banking, mobile money, FinTech</p></Link>
                <Link to="/pillar/audit-risk-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-shield-check-line text-xl text-rose-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Audit & Risk</h4><p className="text-sm text-gray-600">Contrôle interne, COSO, ICAAP/ILAAP</p></Link>
                <Link to="/pillar/conformite-reglementaire-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"><div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3"><i className="ri-file-check-line text-xl text-rose-600"></i></div><h4 className="font-bold text-gray-900 mb-1">Conformité</h4><p className="text-sm text-gray-600">LBC/FT, KYC, protection données</p></Link>
              </div></div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-rose-50 rounded-2xl p-8"><div className="flex items-start gap-6 flex-col sm:flex-row"><div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center flex-shrink-0"><i className="ri-user-star-line text-3xl text-white"></i></div><div><h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts</h3><p className="text-gray-700 leading-relaxed mb-3">Cabinet basé à <strong>Lomé depuis 2003</strong>. Expertise en cybersécurité, PCA/PRA et résilience opérationnelle. 20+ institutions financières accompagnées : BIA, PCA, PRA, tests d'intrusion, ISO 27001.</p><div className="flex flex-wrap gap-3"><a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors"><i className="ri-phone-line"></i>+228 93 98 49 09</a><a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-rose-600 text-rose-700 rounded-lg text-sm font-semibold hover:bg-rose-50 transition-colors"><i className="ri-mail-line"></i>contact@khepraexperts.com</a></div></div></div></div>

              <div className="mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ — Cybersécurité</h2><div className="space-y-4">
                {[{ q: 'Comment mettre en place un PCA/PRA conforme BCEAO ?', a: '6 étapes : BIA, RTO/RPO, stratégie continuité (site secours, cloud), rédaction PCA/PRA, tests semestriels, validation CA. RTO <4h pour critique, RPO <15min.' }, { q: 'Quelles sont les principales cybermenaces pour les banques africaines ?', a: 'Top 5 : ransomware (+300% en 2024), phishing clients, DDoS services digitaux, compromission email (BEC), insiders. Coût moyen : 1,5M USD.' }, { q: 'Comment se préparer à ISO 27001 ?', a: '7 étapes : gap analysis, périmètre SMSI, analyse risques ISO 27005, mesures Annexe A (114), formation, audit interne, certification (6-12 mois).' }].map((faq, i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3><p className="text-gray-700 leading-relaxed">{faq.a}</p></div>))}
              </div></div>

              <div className="bg-white border-2 border-rose-600 rounded-2xl p-10 text-center mb-16"><h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletter Cybersécurité</h2><p className="text-gray-600 mb-6">Alertes et analyses sur les cybermenaces et la résilience opérationnelle en Afrique.</p><form data-readdy-form="true" action="https://readdy.ai/api/form/d8nacu080ubi47thm260" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"><input type="email" name="email" placeholder="Votre email professionnel" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-rose-600" /><button type="submit" className="px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors whitespace-nowrap cursor-pointer text-sm">S'abonner</button></form></div>

              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl p-12 text-center text-white"><h2 className="text-3xl font-bold mb-4">Prêt à renforcer votre cyber-résilience ?</h2><p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Nos experts vous accompagnent du diagnostic à la certification ISO 27001, en passant par le PCA/PRA.</p><div className="flex flex-wrap gap-4 justify-center"><button onClick={goToContact} className="px-10 py-4 bg-white text-rose-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer">Prendre rendez-vous</button><a href="tel:+22893984909" className="px-10 py-4 bg-rose-700 text-white border-2 border-white rounded-lg font-bold hover:bg-rose-800 transition-all whitespace-nowrap">Appeler +228 93 98 49 09</a></div></div>
            </article>
            <div className="mt-12"><SocialShareWidget url={`${SITE_URL}/pillar/cybersecurite-afrique`} title="Cybersécurité en Afrique" /></div>
            <div className="mt-12"><ContextualCTA variant="diagnostic" title="Diagnostic cybersécurité gratuit" description="30 minutes avec un expert Khepra pour évaluer votre cyber-résilience" /></div>
          </div>
        </main>
        <Footer /><ScrollToTop />
      </div>
    </>
  );
}