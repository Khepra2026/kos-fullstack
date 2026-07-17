import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const FinanceIslamiquePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const produitsIslamiques = [
    { nom: 'Murabaha', desc: 'Vente à prix majoré — l\'institution achète le bien puis le revend au client à un prix convenu incluant une marge bénéficiaire fixe. Adapté au financement d\'actifs (équipements, véhicules).', icon: 'ri-shopping-cart-line', segment: 'Financement actifs' },
    { nom: 'Ijara', desc: 'Contrat de location avec option d\'achat (équivalent du leasing islamique). Le bien reste propriété du SFD pendant la période de location avant transfert optionnel.', icon: 'ri-home-line', segment: 'Location-financement' },
    { nom: 'Musharaka', desc: 'Partenariat avec partage des profits et des pertes selon des ratios convenus. Le SFD et le client co-investissent dans un projet commun.', icon: 'ri-group-line', segment: 'Partenariat d\'investissement' },
    { nom: 'Moudaraba', desc: 'Financement par apport de capital (SFD) géré par l\'entrepreneur (Moudarib). Les profits sont partagés ; les pertes incombent au financeur sauf faute de gestion.', icon: 'ri-funds-line', segment: 'Capital-investissement simplifié' },
    { nom: 'Qard Hassan', desc: 'Prêt bienveillant sans intérêt ni profit. Usage limité aux situations de détresse. Compatible avec la mission sociale des SFD.', icon: 'ri-hand-heart-line', segment: 'Social / inclusif' },
    { nom: 'Wakala', desc: 'Contrat d\'agent — le SFD agit comme mandataire pour gérer les fonds du client. Applicable à la gestion des investissements ou des opérations de paiement.', icon: 'ri-user-star-line', segment: 'Gestion / mandat' },
  ];

  const enjeux = [
    { titre: 'Marché en forte croissance', desc: 'La demande de produits financiers conformes à la charia est en forte croissance dans l\'espace UEMOA, notamment au Sénégal, au Mali, en Guinée et au Niger. Les institutions qui n\'offrent pas de produits islamiques perdent une part de marché significative.', icon: 'ri-line-chart-line', color: 'text-primary-600' },
    { titre: 'Cadre réglementaire structuré', desc: 'L\'Instruction BCEAO n°005-05-2018 fournit un cadre réglementaire clair pour les opérations de finance islamique dans les SFD. C\'est une opportunité réglementaire que peu de SFD ont saisie.', icon: 'ri-shield-check-line', color: 'text-accent-600' },
    { titre: 'Conformité charia et BCEAO', desc: 'Les produits islamiques doivent être conformes à la fois aux standards de la charia (avis d\'un Comité Charia) et aux exigences prudentielles de la BCEAO. La double conformité est le défi central.', icon: 'ri-scales-3-line', color: 'text-secondary-600' },
    { titre: 'Comptabilité spécifique', desc: 'Les opérations de finance islamique nécessitent un traitement comptable distinct en SYSCOHADA. L\'absence d\'une comptabilité adaptée est l\'obstacle le plus fréquent à l\'adoption de ces produits.', icon: 'ri-calculator-line', color: 'text-primary-600' },
  ];

  const faqItems = [
    { q: 'Qu\'est-ce que l\'Instruction BCEAO n°005-05-2018 ?', a: 'L\'Instruction BCEAO n°005-05-2018 définit les caractéristiques techniques des opérations de finance islamique applicables aux SFD dans la zone UEMOA. Elle précise les types de produits autorisés, les conditions d\'émission, les obligations de comptabilité spécifique et les exigences de gouvernance (notamment le Comité Charia). C\'est le texte fondateur qui ouvre la voie aux SFD pour proposer des produits financiers conformes à la charia.' },
    { q: 'Un SFD conventionnel peut-il proposer des produits islamiques sans changer de statut ?', a: 'Oui. L\'Instruction n°005-05-2018 permet aux SFD conventionnels d\'offrir des produits de finance islamique dans le cadre de leur agrément existant, sous réserve du respect des conditions spécifiques du texte. Cela inclut notamment la mise en place d\'un Comité Charia, une comptabilité dédiée séparée, et la formation des équipes.' },
    { q: 'Qu\'est-ce qu\'un Comité Charia et est-il obligatoire ?', a: 'Le Comité Charia est un organe de gouvernance religieux composé de savants islamiques qualifiés, chargé de valider la conformité des produits proposés avec les principes de la charia. Pour un SFD offrant des produits islamiques conformément à l\'Instruction n°005-05-2018, la mise en place d\'un Comité Charia (interne ou externe partagé) est une exigence de bonne gouvernance attendue par la BCEAO. Son absence expose le SFD à un risque de réputation charia et à des critiques de la part des clients.' },
    { q: 'La finance islamique est-elle compatible avec les ratios prudentiels BCEAO ?', a: 'Oui. Les ratios prudentiels de l\'Instruction BCEAO n°010-08-2010 (solvabilité 15%, liquidité 100%, division des risques) s\'appliquent également aux SFD pratiquant la finance islamique. Le calcul des ratios doit intégrer correctement les actifs et passifs spécifiques aux produits islamiques (ex. actifs en Murabaha pondérés selon leur nature).' },
    { q: 'Quel est le potentiel de marché de la finance islamique dans l\'UEMOA ?', a: 'La finance islamique représente un segment en forte croissance dans l\'UEMOA, avec une demande concentrée dans les pays à forte population musulmane (Sénégal, Mali, Niger, Guinée-Bissau). Les études du CGAP et de la Banque Islamique de Développement (BID) estiment que 40-60% de la population sous-bancarisée de la zone préférerait des produits conformes à la charia si disponibles. C\'est une opportunité d\'inclusion financière majeure non saisie par la majorité des SFD.' },
    { q: 'Comment traiter comptablement une opération de Murabaha en SYSCOHADA ?', a: 'Le traitement comptable d\'une Murabaha doit refléter les deux étapes : (1) achat du bien par le SFD (comptabilisation en actif, puis sortie lors de la revente), (2) créance sur le client à hauteur du prix de revente (capital + marge). La marge bénéficiaire est enregistrée en produits de manière étalée sur la durée du contrat — et non comme un intérêt. Un plan comptable adapté à la finance islamique, compatible avec le SYSCOHADA, doit être développé et documenté.' },
  ];

  return (
    <>

      <SeoHead
        title="Finance Islamique SFD UEMOA | Instruction BCEAO n°005-05-2018 — Guide Complet"
        description="Finance islamique dans les SFD UEMOA. Instruction BCEAO n°005-05-2018 : Murabaha, Ijara, Musharaka, Moudaraba, Qard Hassan, Wakala. Double conformité Charia + BCEAO, Comité Charia, comptabilité SYSCOHADA adaptée. Checklist de démarrage en 6 mois."
        keywords="finance islamique SFD UEMOA, Instruction BCEAO 005-05-2018, Murabaha, Ijara, Musharaka, Moudaraba, Comité Charia, microfinance islamique, SYSCOHADA, conformité BCEAO, inclusion financière"
        canonicalPath="/blog/finance-islamique-sfd-instruction-bceao-005-05-2018"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Finance Islamique SFD"
        articleTags={['BCEAO', 'finance islamique', 'SFD', 'Murabaha', 'UEMOA', 'Charia', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Finance Islamique SFD UEMOA | Instruction BCEAO n°005-05-2018"
        description="Instruction BCEAO n°005-05-2018 : caractéristiques techniques des opérations de finance islamique dans les SFD — Murabaha, Ijara, Musharaka, Moudaraba, Wakala."
        url="/blog/finance-islamique-sfd-instruction-bceao-005-05-2018/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Islamic%20finance%20microfinance%20West%20Africa%20UEMOA%20SFD%20institution%20professional%20banking%20compliance%20BCEAO%20regulatory%20framework%20modern%20office%20warm%20tones%20geometric%20Islamic%20patterns%20dark%20professional%20atmosphere%20Senegal%20Mali%20Niger&width=1600&height=600&seq=finance-islamique-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(34,160,90,0.2)', border: '1px solid rgba(34,160,90,0.4)', color: '#22a05a' }}>
                  <i className="ri-star-line" /> Finance Islamique — Instruction BCEAO n°005-05-2018
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Finance Islamique SFD en zone UEMOA
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instruction BCEAO n°005-05-2018 — Cadre réglementaire, produits autorisés, gouvernance Charia et conformité prudentielle
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/60">
                  <span><i className="ri-calendar-line mr-1" />16 Juin 2026</span>
                  <span><i className="ri-time-line mr-1" />10 min de lecture</span>
                  <span><i className="ri-user-line mr-1" />KHEPRA EXPERTS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

          {/* Résumé exécutif */}
          <div className="p-6 md:p-8 rounded-2xl mb-10 border-l-4" style={{ background: '#f0fdf4', borderColor: '#22a05a' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="ri-star-line text-2xl" style={{ color: '#22a05a' }} />
              <h2 className="text-xl font-bold text-foreground-950">Résumé exécutif — Segment absent du corpus de conformité SFD</h2>
            </div>
            <p className="text-foreground-700 leading-relaxed mb-3">
              La finance islamique dans les SFD de la zone UEMOA est encadrée par l'<strong>Instruction BCEAO n°005-05-2018</strong> relative aux caractéristiques techniques des opérations de finance islamique. Ce texte est <strong>totalement absent</strong> de la couverture réglementaire des sites spécialisés en conformité microfinance — créant un angle mort majeur dans la connaissance du secteur.
            </p>
            <p className="text-foreground-700 leading-relaxed">
              Ce guide expose le cadre réglementaire, les produits autorisés (Murabaha, Ijara, Musharaka, Moudaraba), les exigences de gouvernance Charia, et les défis de comptabilité SYSCOHADA. Il cible les SFD qui souhaitent saisir l'opportunité de marché de la finance islamique en zone UEMOA.
            </p>
          </div>

          {/* Contexte marché */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Un segment en croissance, un cadre réglementaire sous-exploité
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {enjeux.map((enjeu, i) => (
                <div key={i} className="p-5 rounded-2xl bg-background-50 border border-background-200">
                  <div className="flex items-center gap-3 mb-3">
                    <i className={`${enjeu.icon} text-xl ${enjeu.color}`} />
                    <h3 className="font-bold text-foreground-950 text-base">{enjeu.titre}</h3>
                  </div>
                  <p className="text-foreground-700 text-sm leading-relaxed">{enjeu.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-2xl border border-background-200 bg-background-100">
              <h3 className="font-bold text-foreground-900 mb-3 text-base">L'Instruction BCEAO n°005-05-2018 en bref</h3>
              <p className="text-foreground-700 text-sm leading-relaxed mb-3">
                Publiée en mai 2018, cette instruction complète le dispositif réglementaire SFD de la BCEAO en permettant explicitement aux SFD d'offrir des produits conformes à la charia. Elle s'inscrit dans le cadre plus large de la stratégie d'inclusion financière de la BCEAO (SRIF) qui reconnaît les freins religieux comme un obstacle à la bancarisation dans certaines régions.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-3">
                {[
                  { label: 'Texte de référence', value: 'Instruction BCEAO n°005-05-2018', icon: 'ri-file-text-line' },
                  { label: 'Date de publication', value: 'Mai 2018', icon: 'ri-calendar-line' },
                  { label: 'Périmètre', value: 'SFD zone UEMOA (8 États membres)', icon: 'ri-map-pin-line' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-background-50">
                    <i className={`${item.icon} text-accent-500 flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-xs text-foreground-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-foreground-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Produits islamiques */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Catalogue des produits islamiques pour les SFD
            </h2>
            <p className="text-foreground-700 mb-6 leading-relaxed">
              L'Instruction BCEAO n°005-05-2018 définit les produits islamiques que les SFD peuvent proposer dans le cadre de leur activité. Chaque produit doit être conforme à la fois aux exigences de la charia et aux normes prudentielles de la BCEAO.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produitsIslamiques.map((produit, i) => (
                <div key={i} className="p-5 rounded-2xl border border-background-200 bg-background-50 hover:border-primary-200 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-3 bg-primary-100">
                    <i className={`${produit.icon} text-lg text-primary-600`} />
                  </div>
                  <h3 className="font-bold text-foreground-950 text-base mb-1">{produit.nom}</h3>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 bg-accent-100 text-accent-800">
                    {produit.segment}
                  </div>
                  <p className="text-foreground-700 text-sm leading-relaxed">{produit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gouvernance Charia */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              III. Gouvernance Charia — Comité Charia et double conformité
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-foreground-950 mb-4 text-lg">Le Comité Charia</h3>
                <div className="space-y-3">
                  {[
                    { titre: 'Composition', desc: 'Savants islamiques qualifiés en fiqh al-muamalat (jurisprudence des transactions financières). Minimum recommandé : 3 membres.' },
                    { titre: 'Missions', desc: 'Validation préalable de chaque produit, avis annuel de conformité, révision des contrats types, formation des équipes.' },
                    { titre: 'Indépendance', desc: 'Le Comité Charia doit être indépendant du management opérationnel. Ses avis doivent être documentés et conservés.' },
                    { titre: 'Modèle mutualisé', desc: 'Les petits SFD peuvent partager un Comité Charia avec d\'autres institutions conformément aux pratiques de la Banque Islamique de Développement (BID).' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200">
                      <h4 className="font-bold text-accent-700 text-sm mb-1">{item.titre}</h4>
                      <p className="text-foreground-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground-950 mb-4 text-lg">Double conformité : Charia + BCEAO</h3>
                <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                  Un produit islamique doit satisfaire simultanément deux corps de règles distincts :
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border-l-4 border-primary-500 bg-primary-50">
                    <h4 className="font-bold text-primary-800 mb-2">Conformité charia</h4>
                    <ul className="space-y-1 text-sm text-primary-700">
                      <li>• Absence d'intérêt (riba) — taux fixe interdit</li>
                      <li>• Interdiction de l'incertitude excessive (gharar)</li>
                      <li>• Partage des risques obligatoire (sauf Qard Hassan)</li>
                      <li>• Actif sous-jacent réel obligatoire pour la Murabaha</li>
                      <li>• Validation préalable du Comité Charia</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border-l-4 border-accent-500 bg-accent-50">
                    <h4 className="font-bold text-accent-800 mb-2">Conformité BCEAO</h4>
                    <ul className="space-y-1 text-sm text-accent-700">
                      <li>• Respect des ratios prudentiels Instruction n°010-08-2010</li>
                      <li>• Comptabilité SYSCOHADA adaptée</li>
                      <li>• Reporting prudentiel au SG-CB-UMOA</li>
                      <li>• Respect des plafonds de taux d'usure BCEAO</li>
                      <li>• LBC/FT applicable (Directive n°02/2015)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comptabilité SYSCOHADA */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              IV. Comptabilité SYSCOHADA et finance islamique
            </h2>
            <div className="p-6 rounded-2xl bg-background-50 border border-background-200">
              <p className="text-foreground-700 leading-relaxed mb-4">
                L'adaptation comptable est le principal obstacle à l'adoption de la finance islamique par les SFD conventionnels. Le référentiel SYSCOHADA (AUDCIF OHADA révisé 2017) ne prévoit pas de comptes dédiés pour les produits islamiques — les SFD doivent adapter les comptes existants.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { produit: 'Murabaha', traitement: 'Comptabilisée comme un crédit commercial. La marge bénéficiaire est étalée sur la durée. Distinction des flux (achat actif / revente / encaissement marge) obligatoire.', icon: 'ri-shopping-cart-line' },
                  { produit: 'Ijara', traitement: 'Actif loué inscrit au bilan du SFD pendant la durée du contrat. Les loyers sont des produits de gestion. Option d\'achat comptabilisée distinctement.', icon: 'ri-home-line' },
                  { produit: 'Musharaka', traitement: 'Participation au capital inscrite en immobilisations financières. Partage des résultats en produits ou charges selon les ratios convenus.', icon: 'ri-group-line' },
                  { produit: 'Moudaraba', traitement: 'Traitement similaire à un prêt participatif avec partage de résultat. Suivi rigoureux des bénéfices et pertes par projet financé.', icon: 'ri-funds-line' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${item.icon} text-primary-600`} />
                      <h4 className="font-bold text-foreground-900 text-sm">{item.produit}</h4>
                    </div>
                    <p className="text-foreground-700 text-xs leading-relaxed">{item.traitement}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl border border-accent-200 bg-accent-50">
                <p className="text-accent-800 text-sm leading-relaxed">
                  <strong>Recommandation KHEPRA :</strong> Élaborer un plan comptable spécifique finance islamique, validé par le Comité Charia et approuvé par le commissaire aux comptes, avant de commercialiser tout produit islamique. Ce document doit être soumis au SG-CB-UMOA lors de la demande d'autorisation ou lors de la prochaine inspection.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">V. FAQ — Finance islamique SFD UEMOA</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-background-200 bg-background-50">
                  <h3 className="font-bold text-foreground-900 text-sm mb-2 flex items-start gap-2">
                    <span className="text-primary-500 font-bold flex-shrink-0">Q :</span>
                    {item.q}
                  </h3>
                  <p className="text-foreground-700 text-sm leading-relaxed pl-5">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist démarrage */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              VI. Checklist de démarrage — Finance islamique SFD
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-background-50 border border-background-200">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-settings-3-line text-primary-500" /> Phase 1 — Cadre (M1-M2)
                </h3>
                <ul className="space-y-2">
                  {[
                    'Étude de marché : demande de produits islamiques dans la zone de couverture',
                    'Choix des produits à lancer (Murabaha et/ou Ijara en priorité)',
                    'Nomination ou contrat avec le Comité Charia',
                    'Adaptation du plan comptable SYSCOHADA',
                    'Formation des équipes commerciales et comptables',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-checkbox-circle-line text-primary-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-background-50 border border-background-200">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-rocket-line text-accent-500" /> Phase 2 — Lancement (M3-M6)
                </h3>
                <ul className="space-y-2">
                  {[
                    'Validation des contrats types par le Comité Charia',
                    'Test pilote sur un portefeuille limité (20-30 clients)',
                    'Notification au SG-CB-UMOA de l\'offre de produits islamiques',
                    'Mise en conformité LBC/FT adaptée aux produits islamiques',
                    'Reporting prudentiel intégrant les produits islamiques',
                    'Audit de conformité charia + BCEAO après 6 mois',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-checkbox-circle-line text-accent-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Bibliographie */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">VII. Bibliographie réglementaire officielle</h2>
            <div className="overflow-x-auto rounded-2xl border border-background-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground-950 text-background-50">
                    {['Autorité', 'Référence', 'Date', 'Objet'].map(h => (
                      <th key={h} className="text-left px-5 py-3 font-bold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['BCEAO', 'Instruction n°005-05-2018', 'Mai 2018', 'Caractéristiques techniques des opérations de finance islamique dans les SFD UMOA'],
                    ['BCEAO', 'Instruction n°003-03-2018', 'Mars 2018', 'Dispositions particulières FI (Finance Islamique) applicables aux SFD'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles applicables aux SFD'],
                    ['BCEAO', 'Instruction n°017-12-2010', 'Décembre 2010', 'Organisation du contrôle interne des SFD'],
                    ['UEMOA', 'Directive n°02/2015/CM/UEMOA', '2015', 'LBC/FT — applicable aux produits islamiques des SFD'],
                    ['OHADA', 'AUDCIF révisé', '2017', 'Comptabilité des entreprises — SYSCOHADA'],
                    ['BCEAO', 'Stratégie Régionale d\'Inclusion Financière (SRIF)', '2022', 'Cadre stratégique incluant la finance islamique comme levier d\'inclusion'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-5 py-3 text-foreground-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-foreground-500 text-xs mt-2">Sources officielles : bceao.int — cb-umoa.org — ohada.org — islamicfinance.fr</p>
          </section>

          {/* Related links */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground-950 mb-4">Articles connexes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Catalogue complet 22 Instructions BCEAO SFD', href: '/blog/textes-officiels-sfd-uemoa-catalogue-22-instructions-bceao', desc: 'Page pilier — Toutes les Instructions BCEAO applicables aux SFD' },
                { title: 'Avoirs dormants SFD UEMOA', href: '/blog/avoirs-dormants-sfd-uemoa', desc: 'Instructions BCEAO n°05, 06, 07-06-2014' },
                { title: 'Microfinance UEMOA — Ratios prudentiels', href: '/blog', desc: 'Instructions n°010-08-2010 et n°017-12-2010' },
              ].map((article, i) => (
                <Link key={i} to={article.href} className="p-4 rounded-xl border border-background-200 bg-background-50 hover:border-primary-300 transition-colors block">
                  <h3 className="font-bold text-foreground-900 text-sm mb-1">{article.title}</h3>
                  <p className="text-foreground-600 text-xs">{article.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 md:p-10 rounded-3xl text-center" style={{ background: 'oklch(var(--foreground-950))' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Développez votre offre de finance islamique</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS accompagne les SFD dans la structuration de leur offre de finance islamique conformément à l'Instruction BCEAO n°005-05-2018 — double conformité charia et prudentielle garantie.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Demander un accompagnement
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Ce document est fourni à titre strictement informatif. Il ne constitue pas un avis juridique, réglementaire ou de conformité charia. Les textes BCEAO doivent être consultés dans leur version officielle la plus récente sur bceao.int. Les produits islamiques nécessitent une validation charia spécifique par des experts qualifiés. KHEPRA EXPERTS n'est pas un organe de certification charia.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FinanceIslamiquePage;