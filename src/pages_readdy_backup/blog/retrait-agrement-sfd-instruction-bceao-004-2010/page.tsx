import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const RetraitAgrementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'Dans quels cas un agrément SFD peut-il être retiré ?', a: 'L\'Instruction BCEAO n°004-06-2010 définit les motifs de retrait : cessation d\'activité prolongée, violation grave et répétée des règles prudentielles, non-respect des injonctions du SG-CB-UMOA, incapacité financière durable, absence de transmission des reportings obligatoires. Le retrait n\'est jamais automatique — il suit une procédure contradictoire.' },
    { q: 'Quelle est la différence entre retrait volontaire et retrait d\'office ?', a: 'Le retrait VOLONTAIRE est sollicité par le SFD lui-même (cessation d\'activité, dissolution volontaire). Le retrait D\'OFFICE est prononcé par le SG-CB-UMOA après constatation de manquements graves. Les deux suivent des procédures distinctes définies par l\'Instruction n°004-06-2010.' },
    { q: 'Un SFD peut-il contester un retrait d\'agrément ?', a: 'Oui. La décision de retrait est notifiée au SFD avec motivation. Le SFD dispose de voies de recours administratif et juridictionnel. Cependant, le retrait prend effet immédiatement sauf décision contraire. La contestation ne suspend pas automatiquement l\'exécution.' },
    { q: 'Que deviennent les membres et leur épargne en cas de retrait d\'agrément ?', a: 'L\'Instruction n°004-06-2010 prévoit un plan de liquidation ordonnée : remboursement prioritaire des épargnants, nomination d\'un liquidateur, gel des nouveaux crédits, information obligatoire des membres. Le SG-CB-UMOA supervise le processus pour protéger les déposants.' },
  ];

  return (
    <>
      <SeoHead
        title="Retrait Agrément SFD UEMOA | Instruction BCEAO n°004-06-2010 — Groupements"
        description="Retrait d'agrément des groupements d'épargne et de crédit SFD dans l'UEMOA. Instruction BCEAO n°004-06-2010 : procédure, motifs, liquidation ordonnée, protection des épargnants. Conformité réglementaire."
        keywords="retrait agrément SFD, Instruction BCEAO 004-06-2010, groupements épargne crédit UEMOA, liquidation SFD, protection épargnants, SG-CB-UMOA, retrait d'office, retrait volontaire"
        canonicalPath="/blog/retrait-agrement-sfd-instruction-bceao-004-2010"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'SFD', 'retrait agrément', 'groupements', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Retrait Agrément SFD UEMOA | Instruction BCEAO n°004-06-2010"
        description="Retrait d'agrément des groupements d'épargne et de crédit SFD dans l'UEMOA. Instruction BCEAO n°004-06-2010 : procédure, motifs, liquidation ordonnée, protection des épargnants."
        url="/blog/retrait-agrement-sfd-instruction-bceao-004-2010/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=West%20African%20regulatory%20institution%20formal%20legal%20procedure%20official%20document%20seals%20dissolution%20orderly%20liquidation%20professional%20setting%20institutional%20authority%20warm%20lighting%20serious%20atmosphere%20banking%20supervision&width=1600&height=600&seq=retrait-agrement-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-close-circle-line" /> Procédure de Sortie Réglementée
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Retrait d'Agrément des SFD
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instruction BCEAO n°004-06-2010 — Groupements d'épargne et de crédit en activité dans l'UEMOA
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
              L'Instruction BCEAO n°004-06-2010 encadre le processus de retrait d'agrément des groupements d'épargne et de crédit dans l'UEMOA. Ce texte <strong>absent du corpus de conformité courant</strong> définit les procédures de sortie ordonnée, protège les épargnants, et organise la liquidation des SFD en cessation d'activité.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Cadre général du retrait d'agrément
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-user-voice-line text-primary-500" /> Retrait volontaire
                </h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'Demande motivée par l\'organe compétent (AG extraordinaire)',
                    'Plan de liquidation détaillé soumis au SG-CB-UMOA',
                    'Engagement de rembourser intégralement les épargnants',
                    'Délai d\'instruction par le SG-CB-UMOA avant approbation',
                    'Information obligatoire des membres avant la décision finale',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-red-200 bg-red-50">
                <h3 className="font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-scales-3-line text-red-600" /> Retrait d'office
                </h3>
                <ul className="space-y-2 text-sm text-red-800">
                  {[
                    'Violation grave et répétée des règles prudentielles BCEAO',
                    'Non-respect persistant des injonctions du SG-CB-UMOA',
                    'Incapacité financière durable ou cessation d\'activité prolongée',
                    'Absence totale de reporting pendant une période prolongée',
                    'Procédure contradictoire obligatoire avant décision définitive',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-close-line text-red-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Protection des épargnants — Priorité absolue
            </h2>
            <div className="p-5 rounded-xl border border-primary-200 bg-primary-50 mb-4">
              <p className="text-sm text-primary-800 leading-relaxed">
                L'Instruction n°004-06-2010 place la <strong>protection des épargnants</strong> au cœur du processus de retrait d'agrément. Le remboursement des déposants est <strong>prioritaire</strong> sur toutes les autres créances, et le SG-CB-UMOA supervise l'intégralité du processus de liquidation pour garantir cette priorité.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: 'ri-shield-user-line', title: 'Remboursement prioritaire', desc: 'Les épargnants sont remboursés AVANT les créanciers commerciaux et les associés', color: 'text-primary-600' },
                { icon: 'ri-user-settings-line', title: 'Liquidateur désigné', desc: 'Un liquidateur est nommé pour gérer la liquidation de façon indépendante et ordonnée', color: 'text-accent-600' },
                { icon: 'ri-notification-3-line', title: 'Information obligatoire', desc: 'Tous les membres doivent être informés par écrit de la procédure et de leurs droits', color: 'text-secondary-600' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200">
                  <i className={`${item.icon} text-xl mb-2 block ${item.color}`} />
                  <h4 className="font-bold text-foreground-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-foreground-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">IV. Bibliographie</h2>
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
                    ['BCEAO', 'Instruction n°004-06-2010', 'Juin 2010', 'Retrait agrément groupements épargne et crédit UEMOA'],
                    ['BCEAO', 'Instruction n°005-06-2010', 'Juin 2010', 'Dossier demande agrément SFD'],
                    ['BCEAO', 'Instruction n°007-06-2010', 'Juin 2010', 'Contrôle et sanction des SFD'],
                    ['CB-UMOA', 'Convention portant création CB-UMOA', '1990', 'Cadre institutionnel de la supervision'],
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
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Besoin d'un accompagnement réglementaire ?</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS vous accompagne dans toutes les procédures réglementaires SFD, y compris les situations de retrait ou de restructuration.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Nous contacter
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Document informatif. Textes officiels sur bceao.int. Seul le SG-CB-UMOA instruit les procédures de retrait.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RetraitAgrementPage;



