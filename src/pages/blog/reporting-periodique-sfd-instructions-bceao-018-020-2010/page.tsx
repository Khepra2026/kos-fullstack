import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const ReportingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'À quelle fréquence un SFD doit-il transmettre ses indicateurs périodiques au SG-CB-UMOA ?', a: 'L\'Instruction BCEAO n°020-12-2010 définit une périodicité mensuelle et trimestrielle selon les indicateurs. Les indicateurs clés (encours crédit, épargne collectée, ratio liquidité) sont mensuels, les états prudentiels complets sont trimestriels. Le non-respect des délais expose à des relances et pénalités.' },
    { q: 'Le rapport annuel SFD remplace-t-il les indicateurs périodiques ?', a: 'Non. Le rapport annuel (Instruction n°018-12-2010) est un document distinct, annuel et exhaustif, qui complète mais ne remplace pas les reportings périodiques mensuels/trimestriels (Instruction n°020-12-2010). Les deux obligations coexistent.' },
    { q: 'Que contient le rapport annuel SFD selon l\'Instruction n°018-12-2010 ?', a: 'Le rapport annuel standardisé comprend : le rapport de gestion du Conseil d\'Administration, les états financiers certifiés (Bilan SFD, CR, TER), l\'analyse des ratios prudentiels, le rapport sur le contrôle interne, le rapport du commissaire aux comptes, et les perspectives pour l\'exercice suivant.' },
    { q: 'Quels sont les risques en cas de retard ou d\'absence de reporting ?', a: 'Le SG-CB-UMOA peut prononcer une injonction de transmission sous astreinte. Des retards répétés déclenchent une inspection ciblée. L\'absence prolongée de reporting est un signal d\'alerte fort et peut conduire à une procédure disciplinaire pouvant aller jusqu\'au retrait d\'agrément.' },
  ];

  return (
    <>
      <SeoHead
        title="Reporting Périodique SFD UEMOA | Instructions BCEAO n°018, 020-12-2010 — Rapport Annuel"
        description="Obligations de reporting périodique et rapport annuel des SFD UEMOA. Instructions BCEAO n°018 et 020-12-2010 : indicateurs mensuels/trimestriels SG-CB-UMOA, contenu, délais, destinataires. Tableau de bord réglementaire SFD."
        keywords="reporting périodique SFD, Instruction BCEAO 018-12-2010, Instruction BCEAO 020-12-2010, rapport annuel SFD, indicateurs SFD, SG-CB-UMOA, transmission données SFD, reporting prudentiel, conformité SFD"
        canonicalPath="/blog/reporting-periodique-sfd-instructions-bceao-018-020-2010"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'SFD', 'reporting', 'rapport annuel', 'indicateurs périodiques', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Reporting Périodique SFD UEMOA | Instructions BCEAO n°018, 020-12-2010"
        description="Obligations de reporting périodique et rapport annuel des SFD UEMOA. Instructions BCEAO n°018 et 020-12-2010 : indicateurs mensuels/trimestriels SG-CB-UMOA."
        url="/blog/reporting-periodique-sfd-instructions-bceao-018-020-2010/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Professional%20data%20analytics%20dashboard%20financial%20charts%20graphs%20reporting%20metrics%20business%20intelligence%20modern%20office%20clean%20interface%20regulatory%20compliance%20monitoring%20West%20African%20microfinance%20institution%20professional%20atmosphere&width=1600&height=600&seq=reporting-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-dashboard-line" /> Obligations de Transparence
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Reporting Périodique des SFD UEMOA
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instructions BCEAO n°018 et 020-12-2010 — Rapport annuel, indicateurs mensuels et trimestriels
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <div className="p-6 md:p-8 rounded-2xl mb-10 border-l-4" style={{ background: '#fffbeb', borderColor: '#c9a227' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="ri-information-line text-2xl" style={{ color: '#c9a227' }} />
              <h2 className="text-xl font-bold text-foreground-950">Résumé exécutif</h2>
            </div>
            <p className="text-foreground-700 leading-relaxed">
              Les SFD de l'UMOA sont soumis à <strong>deux obligations de reporting complémentaires</strong> définies par les Instructions BCEAO de décembre 2010 : un rapport annuel exhaustif (n°018) et des indicateurs périodiques mensuels/trimestriels (n°020). Ces textes, absents du corpus de conformité courant, sont scrutés par le SG-CB-UMOA.
            </p>
          </div>

          {/* Instruction n°018 */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Instruction n°018-12-2010 — Rapport annuel des SFD
            </h2>
            <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-primary-500">018</div>
                <h3 className="font-bold text-foreground-950 text-lg">Obligation de produire un rapport annuel standardisé</h3>
              </div>
              <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                L'Instruction n°018-12-2010 impose à tout SFD agréé de produire un rapport annuel dont le contenu, les délais de transmission et les destinataires sont strictement définis. Ce rapport constitue la photographie officielle de la santé financière et opérationnelle du SFD.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: 'ri-file-list-3-line', title: 'Contenu obligatoire', desc: 'Rapport de gestion CA, états financiers certifiés, ratios prudentiels, rapport contrôle interne, rapport CAC, perspectives', color: 'text-primary-600' },
                  { icon: 'ri-calendar-check-line', title: 'Délais de transmission', desc: 'Dans les 6 mois suivant la clôture de l\'exercice. Transmission au SG-CB-UMOA, Ministère des Finances, Commission Bancaire', color: 'text-accent-600' },
                  { icon: 'ri-building-line', title: 'Destinataires', desc: 'SG-CB-UMOA (supervision), Ministère des Finances (tutelle), Commission Bancaire UMOA, organes statutaires du SFD', color: 'text-secondary-600' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200">
                    <i className={`${item.icon} text-xl mb-2 block ${item.color}`} />
                    <h4 className="font-bold text-foreground-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-foreground-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instruction n°020 */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Instruction n°020-12-2010 — Indicateurs périodiques
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-grouped-line text-accent-500" /> Indicateurs mensuels
                </h3>
                <ul className="space-y-2">
                  {[
                    'Encours de crédit brut et net par type de produit',
                    'Épargne collectée (dépôts à vue, à terme, garantis)',
                    'Nombre de membres/clients actifs et nouveaux',
                    'Ratio de liquidité immédiate (disponibilités / exigibilités)',
                    'Taux de créances douteuses (PAR 30, PAR 90)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-check-line text-accent-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-pie-chart-2-line text-secondary-500" /> Indicateurs trimestriels
                </h3>
                <ul className="space-y-2">
                  {[
                    'Ratio de solvabilité (fonds propres / actifs pondérés)',
                    'Ratio de division des risques (plus gros risque / FPN)',
                    'Norme de couverture des immobilisations',
                    'Situation de trésorerie détaillée',
                    'Provisions constituées et reprises (créances douteuses)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-check-line text-secondary-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">III. FAQ</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-background-200 bg-background-50">
                  <h3 className="font-bold text-foreground-900 text-sm mb-2 flex items-start gap-2">
                    <span className="text-primary-500 font-bold flex-shrink-0">Q :</span>{item.q}
                  </h3>
                  <p className="text-foreground-700 text-sm leading-relaxed pl-5">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">IV. Bibliographie officielle</h2>
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
                    ['BCEAO', 'Instruction n°018-12-2010', 'Décembre 2010', 'Obligation de produire un rapport annuel par les SFD'],
                    ['BCEAO', 'Instruction n°020-12-2010', 'Décembre 2010', 'Transmission indicateurs périodiques SFD'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles SFD'],
                    ['BCEAO', 'Instruction n°030-02-2009', 'Février 2009', 'États financiers SFD'],
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

          <div className="p-8 md:p-10 rounded-3xl text-center" style={{ background: 'oklch(var(--foreground-950))' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Auditez votre dispositif de reporting SFD</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS audite votre reporting périodique et votre rapport annuel au regard des Instructions BCEAO n°018 et 020-12-2010.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Demander un audit reporting
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Document informatif. Consultez les textes officiels sur bceao.int. Seul le SG-CB-UMOA apprécie la conformité du reporting.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReportingPage;