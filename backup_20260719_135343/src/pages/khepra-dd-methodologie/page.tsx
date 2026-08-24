import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { OHADA_COUNTRIES } from '@/data/ohadaDueDiligence';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function KhepraDDMethodologiePage() {
  const navigate = useNavigate();

  const pageUrl = `${SITE_URL}/khepra-dd-methodologie`;
  const pageTitle = 'KHEPRA DD™ — Méthodologie Due Diligence OHADA | 60 Jours | Khepra Experts';
  const pageDesc = 'Méthodologie proprietary KHEPRA DD™ : Discovery J0-J15, Deep Dive J15-J45, Synthesis J45-J60, Post-Closing J60-J160. Due diligence 4 volets (financier, légal, technique, ESG) en zone OHADA UEMOA/CEMAC. Conforme Big Four.';

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDesc,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        datePublished: '2024-01-01',
        dateModified: '2026-07-12',
        about: { '@type': 'Service', name: 'KHEPRA DD™' },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'KHEPRA DD™',
        serviceType: 'Due Diligence OHADA',
        description: 'Méthodologie proprietary en 4 phases: Discovery J0-J15, Deep Dive J15-J45, Synthesis J45-J60, Post-Closing J60-J160. Durée 60 jours pour la due diligence. Conforme standards Big Four. Zone OHADA (17 pays).',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'AdministrativeArea', name: 'Zone OHADA' },
        offers: {
          '@type': 'Offer',
          name: 'KHEPRA DD™',
          description: 'Due diligence en 4 phases — 60 jours — Conforme Big Four — 17 pays OHADA',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu\'est-ce que KHEPRA DD™?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'KHEPRA DD™ est la méthodologie proprietary de due diligence développée par Khepra Experts. Elle couvre 4 volets (financier, légal, technique, ESG) en 4 phases sur 60 jours, adaptée aux 17 pays de la zone OHADA (UEMOA et CEMAC).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le seuil NPL BCEAO pour les SFD?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le ratio de couverture des créances en souffrance (NPL) exigé par la BCEAO est de 70% minimum. Un ratio de 42% constitue un red flag entraînant des pertes latentes non provisionnées et un ajustement de valorisation de -15%.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de temps dure une due diligence KHEPRA DD™?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '60 jours pour la due diligence: J0-J15 Discovery, J15-J45 Deep Dive, J45-J60 Synthesis. 100 jours additionnels pour l\'intégration post-closing (J60-J160).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les 4 volets de la due diligence KHEPRA DD™?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1) Due Diligence Financière (SYSCOHADA, ratios prudentiels BCEAO/COBAC). 2) Due Diligence Légale & Fiscale (AUSCGIE 2014, contrats, litiges). 3) Due Diligence Technique (actifs, processus, gouvernance). 4) Due Diligence ESG (environnement, social, alignement IFC/ISSB).',
            },
          },
        ],
      },
    ],
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={pageTitle}
        description={pageDesc}
        keywords="KHEPRA DD, méthodologie due diligence, due diligence OHADA, due diligence 60 jours, due diligence Big Four Afrique, KHEPRA due diligence, méthodologie Khepra Experts, discovery deep dive synthesis, due diligence UEMOA, due diligence CEMAC, post-closing intégration"
        canonicalPath="/khepra-dd-methodologie"
        ogType="website"
        ogImage={OG_IMAGES.SOLUTIONS}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt="KHEPRA DD™ — Méthodologie Due Diligence OHADA"
        ogUrl={pageUrl}
        schemaJson={pageSchema}
      />
      <Navigation />

      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.4)', color: '#D4A82A' }}>
              Méthodologie Proprietary
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              KHEPRA <span className="text-gold-400">DD™</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Due diligence <strong className="text-white">4 volets</strong> en 60 jours. Méthodologie inspirée des standards Big Four, adaptée aux <strong className="text-white">17 pays OHADA</strong>. Conforme aux exigences BCEAO, COBAC, AUSCGIE 2014.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                <i className="ri-calendar-check-line"></i>
                Lancer une due diligence
              </button>
              <a
                href="#pays"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-global-line"></i>
                17 pays OHADA
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><i className="ri-time-line text-gold-400 text-lg"></i><span>60 jours</span></div>
              <div className="flex items-center gap-2"><i className="ri-file-list-3-line text-gold-400 text-lg"></i><span>4 phases</span></div>
              <div className="flex items-center gap-2"><i className="ri-shield-check-line text-gold-400 text-lg"></i><span>4 volets</span></div>
              <div className="flex items-center gap-2"><i className="ri-global-line text-gold-400 text-lg"></i><span>17 pays</span></div>
            </div>
          </div>
        </section>

        {/* ── 4 PHASES ── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                4 Phases en <span className="text-gold-600">60 Jours</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                De la data room au closing, une méthodologie éprouvée sur plus de 200 missions.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gold-200 hidden md:block"></div>
              <div className="space-y-8">
                {[
                  { step: '1', title: 'Discovery J0–J15', desc: 'Signature NDA, accès data room, première revue documentaire. Identification des red flags majeurs (titres fonciers, agréments, litiges). Briefing quotidien avec l\'équipe cible. Questionnaire de due diligence adapté au secteur.', deliverables: 'Rapport Discovery 5 pages, Matrice de red flags préliminaire, Plan de travail Deep Dive', color: 'bg-brand-100 text-brand-700 border-brand-200' },
                  { step: '2', title: 'Deep Dive J15–J45', desc: 'Audit sur site. Analyse financière SYSCOHADA 3 ans, ratios prudentiels BCEAO/COBAC (NPL, solvabilité, liquidité). Vérification AUSCGIE 2014 (registre actionnaires, PV CA, conventions réglementées). Due diligence fiscale (dettes latentes, contentieux). Entretiens direction et auditeurs externes.', deliverables: 'Rapports par volet (4 documents), Matrice des risques mise à jour, Base de données des contrats', color: 'bg-gold-100 text-gold-700 border-gold-200' },
                  { step: '3', title: 'Synthesis J45–J60', desc: 'Consolidation des 4 volets en un rapport unique. Matrice de risques classée rouge/orange/vert avec impact valorisation. Calcul des ajustements de prix (earn-out, séquestre, garantie de passif). Présentation au comité d\'investissement. Recommandations de négociation.', deliverables: 'Rapport intégré 20 pages, Matrice risques finale, Note de négociation, Présentation PPT', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                  { step: '4', title: 'Post-Closing J60–J160', desc: 'Plan d\'intégration 100 jours. Transfert des agréments BCEAO/COBAC. Mise en conformité post-acquisition (AML/CFT, gouvernance). Formation des équipes. Suivi des conditions suspensives et garanties de passif. Tableau de bord mensuel.', deliverables: 'Plan d\'intégration 100 jours, Dashboard mensuel, Procès-verbal de transfert', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                ].map((phase, i) => (
                  <div key={i} className={`relative flex flex-col md:flex-row items-start gap-6 bg-white rounded-2xl p-8 border ${phase.color}`}>
                    <div className={`w-14 h-14 rounded-full ${phase.color.split(' ')[0]} flex items-center justify-center flex-shrink-0 font-bold text-xl`}>
                      {phase.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                      <p className="text-gray-600 mb-4">{phase.desc}</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Livrables</span>
                        <p className="text-sm text-gray-700 mt-1">{phase.deliverables}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 VOLETS ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                4 Volets d'Expertise <span className="text-gold-600">Intégrée</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Financier', desc: 'Analyse états financiers SYSCOHADA 3 ans. Calcul ratios prudentielles BCEAO/COBAC. Retraitement BFR. Dette nette. Projections post-acquisition. IFRS 9 provisions.', icon: 'ri-bar-chart-box-line', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                { title: 'Légal & Fiscal', desc: 'AUSCGIE 2014. Registre actionnaires. Contrats majeurs. Litiges. Conformité AML/CFT. Agréments régulateurs. Audit fiscal (IS, TVA, prix de transfert). Passif social.', icon: 'ri-scales-3-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { title: 'Technique & Opérationnel', desc: 'Actifs immobiliers (titres fonciers). Équipements. Stocks. Processus opérationnels. SI et cybersécurité. Qualité du management. Gouvernance interne.', icon: 'ri-settings-4-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { title: 'ESG & Conformité', desc: 'Environnement (IFC PS). Social (travail, diversité). Gouvernance (Conseil, comités). Alignement ISSB/GRI. Risques climatiques. Notation ESG investisseur.', icon: 'ri-leaf-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              ].map((volet, i) => (
                <div key={i} className={`rounded-xl p-6 border ${volet.color} bg-white hover:shadow-lg transition-all`}>
                  <div className={`w-12 h-12 rounded-xl ${volet.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                    <i className={`${volet.icon} text-2xl ${volet.color.split(' ')[1]}`}></i>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{volet.title}</h3>
                  <p className="text-sm text-gray-600">{volet.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 17 PAYS OHADA ── */}
        <section id="pays" className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                17 Pays <span className="text-gold-600">OHADA</span> Couverts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                KHEPRA DD™ est adapté aux spécificités réglementaires de chaque pays. Consultez notre page dédiée par pays.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {OHADA_COUNTRIES.map((c) => (
                <a
                  key={c.slug}
                  href={`/due-diligence-${c.slug}`}
                  onClick={(e) => { e.preventDefault(); navigate(`/due-diligence-${c.slug}`); }}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer text-center"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{c.pays}</span>
                  <span className="text-xs text-gray-500">{c.zone} — {c.regulateur}</span>
                  <span className="text-xs text-gold-600">{c.capitale}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-10 text-center">
              Questions <span className="text-gold-600">Fréquentes</span>
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Qu\'est-ce que la due diligence en zone OHADA?', a: 'La due diligence est un audit pré-transactionnel couvrant les aspects légaux, financiers, fiscaux, réglementaires et organisationnels. En zone OHADA, elle doit inclure la vérification AUSCGIE, AUDCIF, exigences BCEAO pour UEMOA ou COBAC pour CEMAC, et réglementations AML/CFT.' },
                { q: 'Quel est le seuil NPL BCEAO pour les SFD?', a: 'Le ratio de couverture NPL BCEAO est de 70% minimum. Un ratio de 42% constitue un red flag entraînant des pertes latentes non provisionnées et un ajustement de valorisation de -15%.' },
                { q: 'Pourquoi choisir KHEPRA DD™ plutôt qu\'un Big Four?', a: 'KHEPRA DD™ combine la rigueur méthodologique Big Four avec une connaissance approfondie du terrain africain. Nos équipes basées à Lomé interviennent dans les 17 pays OHADA avec des délais réduits et des coûts optimisés. 98% de taux de succès réglementaire.' },
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                  <summary className="p-6 font-semibold text-gray-900 cursor-pointer hover:text-brand-700 transition-colors flex items-center justify-between">
                    {faq.q}
                    <i className="ri-arrow-down-s-line text-gray-400 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à lancer votre <span className="text-gold-400">due diligence</span> ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nos experts interviennent dans les 10 jours ouvrés dans les 17 pays OHADA. Premier entretien gratuit de 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                <i className="ri-calendar-check-line"></i>
                Demander un devis
              </button>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-linkedin-fill"></i> Partager
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



