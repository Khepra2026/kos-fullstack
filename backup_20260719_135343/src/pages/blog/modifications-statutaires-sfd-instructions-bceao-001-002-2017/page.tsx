import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const ModifsStatutairesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'Un SFD peut-il changer de forme juridique sans autorisation préalable de la BCEAO ?', a: 'Non. L\'Instruction BCEAO n°001-01-2017 impose une autorisation PRÉALABLE obligatoire avant toute modification de la forme juridique, de la dénomination sociale ou du siège social. Toute modification effectuée sans autorisation expose le SFD à une injonction de régularisation et potentiellement à des sanctions disciplinaires.' },
    { q: 'Dans quels cas un SFD peut-il déroger à la condition de nationalité des dirigeants ?', a: 'L\'Instruction BCEAO n°002-01-2017 encadre les demandes de dérogation individuelle au critère de nationalité UEMOA pour les postes de dirigeants. La dérogation est examinée au cas par cas par le SG-CB-UMOA, sur la base d\'un dossier justificatif. Complémentaire de la Circulaire CB-UMOA n°02-2017 qui définit les conditions générales.' },
    { q: 'Quels sont les délais de traitement pour une demande de modification statutaire ?', a: 'Les délais ne sont pas explicitement fixés par les Instructions de 2017, mais le SG-CB-UMOA instruit les dossiers dans un délai raisonnable. Le SFD doit anticiper le dépôt du dossier plusieurs mois avant la modification envisagée. La qualité et la complétude du dossier influencent significativement les délais.' },
    { q: 'La dérogation de nationalité est-elle permanente ou temporaire ?', a: 'L\'Instruction n°002-01-2017 prévoit des dérogations individuelles qui peuvent être accordées pour une durée déterminée ou indéterminée, selon l\'appréciation du SG-CB-UMOA. Le SFD doit renouveler la demande si la dérogation arrive à expiration. La dérogation est attachée à la personne, pas au poste.' },
  ];

  return (
    <>
      <SeoHead
        title="Modifications Statutaires SFD UEMOA | Instructions BCEAO n°001, 002-01-2017"
        description="Modifications de forme juridique et dérogation de nationalité des dirigeants SFD UEMOA. Instructions BCEAO n°001 et 002-01-2017 : procédures, autorisations préalables, dossiers. Complémentaire Circulaire CB-UMOA n°02-2017."
        keywords="modifications statutaires SFD, Instruction BCEAO 001-01-2017, Instruction BCEAO 002-01-2017, dérogation nationalité dirigeants SFD, forme juridique SFD, siège social SFD, dénomination sociale SFD, autorisation préalable BCEAO, SG-CB-UMOA"
        canonicalPath="/blog/modifications-statutaires-sfd-instructions-bceao-001-002-2017"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'SFD', 'modifications statutaires', 'nationalité dirigeants', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Modifications Statutaires SFD UEMOA | Instructions BCEAO n°001, 002-01-2017"
        description="Modifications de forme juridique et dérogation de nationalité des dirigeants SFD UEMOA. Instructions BCEAO n°001 et 002-01-2017 : procédures, autorisations préalables."
        url="/blog/modifications-statutaires-sfd-instructions-bceao-001-002-2017/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Professional%20legal%20documents%20regulatory%20compliance%20official%20seals%20stamps%20corporate%20governance%20West%20African%20institutional%20setting%20administrative%20procedures%20executive%20boardroom%20formal%20atmosphere%20warm%20lighting&width=1600&height=600&seq=modifs-statutaires-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-government-line" /> Procédures Administratives SFD
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Modifications Statutaires des SFD
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instructions BCEAO n°001 et 002-01-2017 — Forme juridique, dénomination, siège social et dérogation de nationalité
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
              Les modifications statutaires des SFD (changement de forme juridique, de dénomination, de siège social) et les dérogations de nationalité des dirigeants sont encadrées par deux Instructions BCEAO de janvier 2017. Ces textes, <strong>absents du corpus de conformité courant</strong>, sont pourtant essentiels : toute modification effectuée sans autorisation préalable est irrégulière.
            </p>
          </div>

          {/* Instruction n°001 */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Instruction n°001-01-2017 — Modifications de la forme juridique, dénomination, siège
            </h2>
            <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-primary-500">001</div>
                <h3 className="font-bold text-foreground-950 text-lg">Procédure d'autorisation préalable obligatoire</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground-800 mb-2 text-sm">Modifications soumises à autorisation :</h4>
                  <ul className="space-y-2">
                    {[
                      'Changement de forme juridique du SFD (association → société coopérative, etc.)',
                      'Modification de la dénomination sociale (nom commercial)',
                      'Transfert du siège social (changement d\'adresse statutaire)',
                      'Fusion, scission ou absorption impliquant un SFD',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground-800 mb-2 text-sm">Dossier de demande :</h4>
                  <ul className="space-y-2">
                    {[
                      'Délibération de l\'organe compétent (AG, CA) approuvant la modification',
                      'Statuts modifiés du SFD',
                      'Rapport justifiant la modification et son impact sur les membres',
                      'États financiers récents certifiés',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-file-text-line text-accent-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Instruction n°002 */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Instruction n°002-01-2017 — Dérogation à la condition de nationalité
            </h2>
            <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-accent-500">002</div>
                <h3 className="font-bold text-foreground-950 text-lg">Dérogation individuelle pour dirigeants non-UEMOA</h3>
              </div>
              <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                L'Instruction n°002-01-2017 est <strong>complémentaire de la Circulaire CB-UMOA n°02-2017</strong> sur la condition de nationalité des dirigeants. Elle définit la procédure spécifique de demande de dérogation pour les SFD qui souhaitent recruter un dirigeant ne possédant pas la nationalité d'un État membre de l'UEMOA.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: 'ri-passport-line', title: 'Critère principal', desc: 'Nationalité UEMOA obligatoire pour les postes de dirigeants exécutifs — la dérogation est accordée au cas par cas', color: 'text-primary-600' },
                  { icon: 'ri-user-star-line', title: 'Postes concernés', desc: 'Directeur Général, Directeur Général Adjoint, et tout poste de direction exécutive défini dans les statuts', color: 'text-accent-600' },
                  { icon: 'ri-file-search-line', title: 'Instruction SG-CB-UMOA', desc: 'La demande est instruite par le SG-CB-UMOA qui apprécie les qualifications, l\'expérience et l\'absence d\'alternative UEMOA', color: 'text-secondary-600' },
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

          {/* Bibliographie */}
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
                    ['BCEAO', 'Instruction n°001-01-2017', 'Janvier 2017', 'Modification forme juridique, dénomination, siège SFD'],
                    ['BCEAO', 'Instruction n°002-01-2017', 'Janvier 2017', 'Dérogation condition de nationalité dirigeants SFD'],
                    ['CB-UMOA', 'Circulaire n°02-2017', '2017', 'Condition de nationalité des dirigeants'],
                    ['BCEAO', 'Instruction n°005-06-2010', 'Juin 2010', 'Dossier d\'agrément SFD'],
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
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Accompagnement modification statutaire SFD</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS vous accompagne dans la constitution de votre dossier de modification statutaire et de demande de dérogation auprès du SG-CB-UMOA.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Demander un accompagnement
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Ce document est fourni à titre informatif. Les Instructions BCEAO doivent être consultées sur bceao.int. Seul le SG-CB-UMOA instruit les demandes officielles.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ModifsStatutairesPage;



