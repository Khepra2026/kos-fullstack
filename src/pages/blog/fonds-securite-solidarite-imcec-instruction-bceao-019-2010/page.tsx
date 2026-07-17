import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const IMCECPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'Qu\'est-ce qu\'une IMCEC et en quoi diffère-t-elle d\'un SFD classique ?', a: 'L\'IMCEC (Institution Mutualiste ou Coopérative d\'Épargne et de Crédit) est une forme spécifique de SFD fondée sur le principe de double qualité : les membres sont à la fois propriétaires (sociétaires) et clients. Contrairement à un SFD unitaire classique, l\'IMCEC repose sur une gouvernance démocratique (un membre = une voix) et mutualise les risques entre ses membres.' },
    { q: 'Le fonds de sécurité/solidarité est-il obligatoire pour tous les réseaux IMCEC ?', a: 'Oui. L\'Instruction BCEAO n°019-12-2010 impose la mise en place d\'un fonds de sécurité/solidarité au sein de TOUS les réseaux IMCEC. Ce fonds a pour objet de protéger les membres en cas de difficulté financière d\'une caisse affiliée et de renforcer la solidarité au sein du réseau.' },
    { q: 'Comment le fonds de sécurité est-il alimenté ?', a: 'Le fonds est alimenté par des cotisations obligatoires des caisses affiliées au réseau, calculées selon des modalités définies par l\'Instruction n°019-12-2010 (généralement un pourcentage de l\'encours d\'épargne ou de crédit). Le réseau peut également recevoir des contributions externes (bailleurs, subventions).' },
    { q: 'Que risque un réseau IMCEC qui ne constitue pas de fonds de sécurité ?', a: 'Le non-respect de l\'Instruction n°019-12-2010 expose le réseau à une injonction de mise en conformité du SG-CB-UMOA. En cas de difficulté d\'une caisse, l\'absence de fonds de solidarité peut entraîner une crise de confiance des épargnants et une contagion à l\'ensemble du réseau. La solidarité financière est une obligation prudentielle.' },
  ];

  return (
    <>
      <SeoHead
        title="Fonds Sécurité Solidarité IMCEC UEMOA | Instruction BCEAO n°019-12-2010 — Réseaux"
        description="Fonds de sécurité et de solidarité au sein des réseaux d'IMCEC dans l'UEMOA. Instruction BCEAO n°019-12-2010 : obligations, mécanismes de solidarité financière, protection des membres, cotisations, supervision SG-CB-UMOA."
        keywords="fonds sécurité IMCEC, Instruction BCEAO 019-12-2010, fonds solidarité SFD, IMCEC UEMOA, réseaux mutualistes, protection membres, cotisations solidarité, conformité SFD"
        canonicalPath="/blog/fonds-securite-solidarite-imcec-instruction-bceao-019-2010"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'IMCEC', 'fonds sécurité', 'solidarité', 'SFD', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Fonds Sécurité Solidarité IMCEC UEMOA | Instruction BCEAO n°019-12-2010"
        description="Instruction BCEAO n°019-12-2010 : mise en place d'un fonds de sécurité et de solidarité au sein des réseaux IMCEC — protection des membres, solidarité réseau."
        url="/blog/fonds-securite-solidarite-imcec-instruction-bceao-019-2010/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=West%20African%20cooperative%20microfinance%20network%20community%20solidarity%20fund%20protection%20members%20mutual%20insurance%20concept%20professional%20institutional%20atmosphere%20warm%20lighting%20group%20of%20people%20unity%20trust%20financial%20security%20concept&width=1600&height=600&seq=imcec-fonds-securite-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-heart-add-line" /> Solidarité Financière Mutualiste
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Fonds de Sécurité/Solidarité des Réseaux IMCEC
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instruction BCEAO n°019-12-2010 — Protection des membres et solidarité entre caisses affiliées
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
              L'Instruction BCEAO n°019-12-2010 impose la mise en place d'un <strong>fonds de sécurité/solidarité</strong> obligatoire au sein des réseaux d'Institutions Mutualistes ou Coopératives d'Épargne et de Crédit (IMCEC). Ce texte <strong>absent du corpus de conformité courant</strong> est pourtant un pilier de la protection des membres et de la stabilité des réseaux mutualistes.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Contexte — Pourquoi un fonds de sécurité/solidarité spécifique aux IMCEC ?
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-4">
              Les réseaux IMCEC sont constitués de caisses affiliées qui partagent une enseigne, une gouvernance fédérative et une mission commune. En cas de difficulté d'une caisse, la confiance des épargnants peut se détériorer rapidement et se propager à l'ensemble du réseau — c'est le <strong>risque de contagion</strong>. Le fonds de sécurité/solidarité est le mécanisme prudentiel conçu pour absorber ce risque.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: 'ri-shield-star-line', title: 'Protection', desc: 'Protège les membres d\'une caisse en difficulté en garantissant la disponibilité de leurs dépôts', color: 'text-primary-600' },
                { icon: 'ri-community-line', title: 'Solidarité réseau', desc: 'Mutualise le risque entre toutes les caisses affiliées — la solidarité remplace l\'assurance externe', color: 'text-accent-600' },
                { icon: 'ri-funds-line', title: 'Stabilité', desc: 'Évite l\'effet domino : une caisse en difficulté ne fait pas vaciller tout le réseau', color: 'text-secondary-600' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-background-200 bg-background-50">
                  <i className={`${item.icon} text-2xl mb-3 block ${item.color}`} />
                  <h3 className="font-bold text-foreground-950 text-sm mb-1">{item.title}</h3>
                  <p className="text-foreground-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Mécanismes du fonds de sécurité selon l'Instruction n°019-12-2010
            </h2>
            <div className="space-y-4">
              {[
                { etape: '01', titre: 'Constitution du fonds', desc: 'Le réseau IMCEC crée un fonds de sécurité/solidarité dédié, juridiquement distinct du patrimoine des caisses affiliées. Le fonds est géré par un organe de gestion spécifique prévu par les statuts du réseau.', color: 'bg-primary-500' },
                { etape: '02', titre: 'Alimentation par cotisations', desc: 'Chaque caisse affiliée cotise au fonds selon un barème défini (pourcentage de l\'encours d\'épargne, du portefeuille crédit, ou contribution forfaitaire). Les cotisations sont obligatoires et non remboursables.', color: 'bg-accent-500' },
                { etape: '03', titre: 'Conditions de mobilisation', desc: 'Le fonds est mobilisable lorsqu\'une caisse affiliée rencontre des difficultés financières avérées : défaut de liquidité, pertes significatives, ou dégradation brutale des ratios prudentiels. La mobilisation est décidée par l\'organe de gestion.', color: 'bg-secondary-500' },
                { etape: '04', titre: 'Reporting au SG-CB-UMOA', desc: 'Le réseau doit transmettre périodiquement au SG-CB-UMOA l\'état du fonds : montant constitué, cotisations reçues, interventions effectuées. La transparence est obligatoire.', color: 'bg-primary-500' },
              ].map((etape, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-background-50 border border-background-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 ${etape.color}`}>
                    {etape.etape}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-base mb-1">{etape.titre}</h3>
                    <p className="text-foreground-700 text-sm leading-relaxed">{etape.desc}</p>
                  </div>
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
                    ['BCEAO', 'Instruction n°019-12-2010', 'Décembre 2010', 'Fonds sécurité/solidarité réseaux IMCEC'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles SFD'],
                    ['BCEAO', 'Instruction n°007-06-2010', 'Juin 2010', 'Contrôle et sanction SFD'],
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
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Auditez la solidarité financière de votre réseau IMCEC</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS audite votre fonds de sécurité/solidarité au regard de l'Instruction BCEAO n°019-12-2010.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Demander un audit IMCEC
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Document informatif. Consultez les textes officiels sur bceao.int.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IMCECPage;