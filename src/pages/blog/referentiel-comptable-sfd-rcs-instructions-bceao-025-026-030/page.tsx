import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const RCSSFDPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triptyqueRCS = [
    {
      num: '025',
      titre: 'Plan de comptes RCS des SFD',
      sousTitre: 'Le référentiel comptable spécifique — socle du système comptable SFD',
      icon: 'ri-file-list-3-line',
      color: 'bg-primary-500',
      contenu: [
        'Définition du plan de comptes spécifique aux SFD, distinct du SYSCOHADA standard des entreprises commerciales',
        'Classes comptables adaptées aux opérations de microfinance : épargne, crédit, refinancement, subventions',
        'Numérotation et intitulés normalisés pour garantir la comparabilité entre SFD dans l\'UEMOA',
        'Distinction claire entre les opérations des SFD unitaires, des réseaux et des IMCEC (Institutions Mutualistes)',
      ],
    },
    {
      num: '026',
      titre: 'Mise en œuvre du plan de comptes RCS',
      sousTitre: 'Guide d\'application pratique pour les SFD',
      icon: 'ri-settings-3-line',
      color: 'bg-accent-500',
      contenu: [
        'Instructions de comptabilisation des opérations SFD courantes : octroi de crédit, collecte d\'épargne, cotisations',
        'Schémas d\'écritures comptables pour les produits spécifiques : crédit groupe solidaire, avance sur salaire, warrantage',
        'Traitement comptable des subventions d\'exploitation et d\'investissement reçues par les SFD',
        'Règles de comptabilisation des intérêts créditeurs et débiteurs selon la méthode SYSCOHADA',
      ],
    },
    {
      num: '030',
      titre: 'États financiers spécifiques SFD',
      sousTitre: 'Modèles normalisés de reporting financier',
      icon: 'ri-bar-chart-box-line',
      color: 'bg-secondary-500',
      contenu: [
        'Modèle de Bilan SFD — actifs et passifs spécifiques aux institutions de microfinance',
        'Modèle de Compte de Résultat SFD — produits et charges propres au secteur',
        'Tableau des Emplois et Ressources (TER) — flux de trésorerie adaptés aux SFD',
        'Notes annexes obligatoires : expositions sectorielles, concentration des dépôts, créances douteuses',
        'Délais légaux de production et destinataires : SG-CB-UMOA, Ministère des Finances, Commission Bancaire',
      ],
    },
  ];

  const faqItems = [
    { q: 'Pourquoi le RCS est-il distinct du SYSCOHADA standard ?', a: 'Le Référentiel Comptable Spécifique (RCS) des SFD a été créé parce que le SYSCOHADA standard ne capture pas les spécificités des opérations de microfinance : épargne des membres, crédit solidaire sans garantie réelle, subventions d\'exploitation, fonds de solidarité. Le RCS est TAILOR-MADE pour les SFD, avec des classes comptables dédiées aux opérations mutualistes et à la collecte d\'épargne de proximité.' },
    { q: 'Un SFD peut-il utiliser le SYSCOHADA classique sans le RCS ?', a: 'Non. Les Instructions BCEAO n°025, 026 et 030-02-2009 imposent le RCS comme cadre comptable OBLIGATOIRE pour tous les SFD agréés dans l\'UMOA. Le non-respect expose à une injonction de mise en conformité du SG-CB-UMOA lors d\'une inspection. Le SYSCOHADA classique est INSUFFISANT car il ne permet pas de retracer correctement les opérations de microfinance.' },
    { q: 'Quelles sont les conséquences d\'une comptabilité non conforme au RCS ?', a: 'Le SG-CB-UMOA peut prononcer des sanctions disciplinaires lors d\'une inspection si la comptabilité d\'un SFD n\'est pas tenue conformément au RCS. Les états financiers peuvent être rejetés, les ratios prudentiels invalidés, et dans les cas graves, une injonction de régularisation avec astreinte. La non-conformité comptable est un signal fort pour un commissaire aux comptes et peut entraîner une réserve dans le rapport d\'audit.' },
    { q: 'Le RCS s\'applique-t-il à toutes les catégories de SFD ?', a: 'Oui. Les trois Instructions BCEAO de février 2009 s\'appliquent à tous les SFD quelle que soit leur catégorie : SFD unitaires, réseaux, et IMCEC. Certaines adaptations existent pour les groupements d\'épargne et de crédit de petite taille (catégorie 3), mais le socle RCS reste le même pour tous.' },
    { q: 'Comment KHEPRA EXPERTS peut vous aider sur la conformité comptable RCS ?', a: 'KHEPRA EXPERTS réalise des diagnostics de conformité comptable RCS complets : vérification du plan de comptes, analyse des schémas d\'écritures, conformité des états financiers aux modèles de l\'Instruction n°030-02-2009, et préparation aux inspections du SG-CB-UMOA. Notre équipe maîtrise l\'intégralité du triptyque RCS.' },
  ];

  return (
    <>
      <SeoHead
        title="RCS SFD UEMOA | Instructions BCEAO n°025, 026, 030-02-2009 — Référentiel Comptable"
        description="Référentiel Comptable Spécifique (RCS) des SFD UEMOA. Instructions BCEAO n°025, 026 et 030-02-2009 : plan de comptes SFD, schémas d'écritures, états financiers. Triptyque fondateur absent de la couverture usuelle. Conformité, SYSCOHADA, Bilan SFD."
        keywords="RCS SFD UEMOA, Instruction BCEAO 025-02-2009, Instruction BCEAO 026-02-2009, Instruction BCEAO 030-02-2009, référentiel comptable SFD, plan de comptes microfinance, états financiers SFD, bilan SFD, SYSCOHADA, conformité comptable, SG-CB-UMOA"
        canonicalPath="/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'RCS', 'SFD', 'comptabilité', 'UEMOA', 'microfinance', 'plan de comptes', 'états financiers']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="RCS SFD UEMOA | Instructions BCEAO n°025, 026, 030-02-2009"
        description="Référentiel Comptable Spécifique (RCS) des SFD UEMOA. Instructions BCEAO n°025, 026 et 030-02-2009 : plan de comptes SFD, schémas d'écritures, états financiers."
        url="/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[540px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Professional%20accounting%20ledgers%20financial%20statements%20spreadsheets%20modern%20clean%20office%20environment%20West%20African%20microfinance%20institution%20regulatory%20compliance%20audit%20warm%20professional%20lighting%20organized%20documents%20banking%20sector&width=1600&height=600&seq=rcs-sfd-bceao-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-book-open-line" /> Triptyque Fondateur — Conformité Comptable
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Référentiel Comptable Spécifique des SFD
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instructions BCEAO n°025, 026, 030-02-2009 — Le socle comptable des Systèmes Financiers Décentralisés UEMOA
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/60">
                  <span><i className="ri-calendar-line mr-1" />16 Juin 2026</span>
                  <span><i className="ri-time-line mr-1" />10 min de lecture</span>
                  <span><i className="ri-shield-check-line mr-1" />3 textes fondateurs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          {/* Résumé exécutif */}
          <div className="p-6 md:p-8 rounded-2xl mb-10 border-l-4" style={{ background: '#fffbeb', borderColor: '#c9a227' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="ri-information-line text-2xl" style={{ color: '#c9a227' }} />
              <h2 className="text-xl font-bold text-foreground-950">Résumé exécutif</h2>
            </div>
            <p className="text-foreground-700 leading-relaxed mb-3">
              Le <strong>Référentiel Comptable Spécifique (RCS)</strong> des SFD de l'UMOA constitue le corpus comptable propre aux institutions de microfinance, distinct du SYSCOHADA standard. Défini par trois Instructions BCEAO de février 2009 (n°025, 026 et 030), ce triptyque fondateur est <strong>totalement absent</strong> du corpus de conformité couvert par les sites spécialisés — un gap critique qui expose les SFD à des sanctions lors d'une inspection du SG-CB-UMOA.
            </p>
            <p className="text-foreground-700 leading-relaxed">
              Ce guide couvre l'intégralité des trois textes : plan de comptes (n°025), guide d'application (n°026), et états financiers normalisés (n°030).
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Un gap de couverture critique : le socle comptable SFD absent des corpus
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-4">
              L'audit systématique des références réglementaires sur les sites spécialisés en conformité microfinance révèle une lacune majeure : les trois Instructions BCEAO constituant le Référentiel Comptable Spécifique (RCS) des SFD ne sont <strong>jamais</strong> citées. Ce triptyque est pourtant le socle sur lequel repose toute la comptabilité des SFD agréés dans la zone UEMOA.
            </p>
            <div className="p-5 rounded-xl border border-red-200 bg-red-50 mb-4">
              <div className="flex items-start gap-3">
                <i className="ri-error-warning-line text-2xl text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-800 mb-1">Risque réglementaire critique</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Un SFD qui ne tient pas sa comptabilité conformément au RCS ne peut pas produire des états financiers valides. Tous les ratios prudentiels (solvabilité, liquidité, division des risques) calculés sur une base comptable non conforme au RCS sont juridiquement invalides.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Le triptyque */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Le triptyque RCS — Analyse des 3 Instructions fondatrices
            </h2>
            <div className="space-y-6">
              {triptyqueRCS.map((texte, i) => (
                <div key={i} className="p-6 rounded-2xl border border-background-200 bg-background-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 ${texte.color}`}>
                      {texte.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground-950 text-lg flex items-center gap-2">
                        <i className={texte.icon} /> {texte.titre}
                      </h3>
                      <p className="text-foreground-600 text-sm">{texte.sousTitre}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-16">
                    {texte.contenu.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Distinction RCS vs SYSCOHADA */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              III. RCS vs SYSCOHADA classique — Pourquoi un référentiel dédié ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-book-2-line text-primary-500" /> SYSCOHADA standard
                </h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'Conçu pour les entreprises commerciales classiques',
                    'Ne distingue pas l\'épargne des membres des dettes fournisseurs',
                    'Pas de traitement spécifique des crédits solidaires sans garantie',
                    'Classes comptables inadaptées aux cotisations et subventions SFD',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-close-line text-red-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-primary-200 bg-primary-50">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-shield-check-line text-primary-500" /> RCS SFD (BCEAO)
                </h3>
                <ul className="space-y-2 text-sm text-primary-800">
                  {[
                    'Conçu spécifiquement pour les SFD de la zone UEMOA',
                    'Classes comptables dédiées à l\'épargne des membres',
                    'Schémas d\'écritures pour crédit solidaire et warrantage',
                    'Traitement comptable des subventions, cotisations, fonds de solidarité',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* faq */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">IV. FAQ</h2>
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

          {/* Bibliographie */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">V. Bibliographie officielle</h2>
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
                    ['BCEAO', 'Instruction n°025-02-2009', 'Février 2009', 'Référentiel comptable spécifique des SFD — Plan de comptes'],
                    ['BCEAO', 'Instruction n°026-02-2009', 'Février 2009', 'Mise en œuvre du plan de comptes RCS'],
                    ['BCEAO', 'Instruction n°030-02-2009', 'Février 2009', 'États financiers SFD — Bilan, CR, TER'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles SFD'],
                    ['BCEAO', 'Instruction n°005-06-2010', 'Juin 2010', 'Dossier d\'agrément SFD'],
                    ['OHADA', 'AUDCIF révisé', '2017', 'Acte uniforme comptable — SYSCOHADA'],
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
          </section>

          {/* CTA */}
          <div className="p-8 md:p-10 rounded-3xl text-center" style={{ background: 'oklch(var(--foreground-950))' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Auditez votre conformité comptable RCS</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS réalise des diagnostics complets de votre plan de comptes, schémas d'écritures et états financiers au regard des Instructions BCEAO n°025, 026 et 030-02-2009.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Demander un diagnostic RCS
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Ce document est fourni à titre informatif. Les Instructions BCEAO doivent être consultées dans leur version officielle sur bceao.int. Seul le SG-CB-UMOA est habilité à apprécier la conformité comptable d'un SFD.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RCSSFDPage;