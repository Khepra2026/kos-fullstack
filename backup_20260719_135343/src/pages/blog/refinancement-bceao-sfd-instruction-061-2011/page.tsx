import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const RefinancementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'Un SFD peut-il accéder directement au refinancement de la BCEAO ?', a: 'Non directement. L\'Instruction BCEAO n°061-03-2011 définit les critères d\'admissibilité des crédits bancaires octroyés aux SFD au refinancement de la BCEAO. Cela signifie que c\'est LA BANQUE qui prête au SFD qui peut refinancer ce crédit auprès de la BCEAO — pas le SFD lui-même. Comprendre ce mécanisme est crucial.' },
    { q: 'Quels types de crédits bancaires aux SFD sont éligibles au refinancement BCEAO ?', a: 'L\'Instruction n°061-03-2011 définit des critères précis : le crédit doit financer des activités de microfinance éligibles, le SFD doit être en conformité prudentielle, et la banque prêteuse doit documenter l\'utilisation effective des fonds. Les crédits à court terme pour la liquidité et les crédits d\'investissement productif sont généralement éligibles.' },
    { q: 'Quel est l\'avantage concret pour un SFD que sa banque puisse refinancer le crédit à la BCEAO ?', a: 'Le refinancement BCEAO permet à la banque de proposer au SFD des taux plus compétitifs et des conditions de crédit plus favorables (durée, garanties). La BCEAO refinance à un taux préférentiel, ce qui se répercute indirectement sur le coût du crédit pour le SFD. C\'est un levier de diversification du financement.' },
    { q: 'Comment KHEPRA EXPERTS peut aider un SFD à structurer un crédit éligible au refinancement BCEAO ?', a: 'KHEPRA EXPERTS accompagne les SFD dans la structuration de leurs dossiers de crédit bancaire pour satisfaire aux critères de l\'Instruction n°061-03-2011 : conformité prudentielle, documentation de l\'utilisation des fonds, business plan, projections financières. Notre expertise couvre la relation SFD-banque-BCEAO.' },
  ];

  return (
    <>
      <SeoHead
        title="Refinancement BCEAO SFD UEMOA | Instruction n°061-03-2011 — Critères Admissibilité"
        description="Critères d'admissibilité des crédits bancaires aux SFD au refinancement de la BCEAO. Instruction n°061-03-2011 : mécanismes, conditions, documentation. Diversification du financement des SFD UEMOA."
        keywords="refinancement BCEAO SFD, Instruction 061-03-2011, crédits bancaires SFD, refinancement BCEAO, diversification financement SFD, UEMOA, microfinance, taux préférentiel"
        canonicalPath="/blog/refinancement-bceao-sfd-instruction-061-2011"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'refinancement', 'SFD', 'crédits bancaires', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Refinancement BCEAO SFD UEMOA | Instruction n°061-03-2011"
        description="Instruction BCEAO n°061-03-2011 : critères d'admissibilité des crédits bancaires octroyés aux SFD au refinancement de la BCEAO."
        url="/blog/refinancement-bceao-sfd-instruction-061-2011/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Central%20bank%20financial%20institution%20monetary%20policy%20refinancing%20mechanism%20professional%20banking%20architecture%20modern%20institutional%20building%20West%20African%20BCEAO%20headquarters%20Dakar%20elegant%20corporate%20atmosphere%20warm%20tones%20financial%20operations%20concept&width=1600&height=600&seq=refinancement-bceao-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-bank-line" /> Politique Monétaire & Refinancement
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Refinancement BCEAO des Crédits aux SFD
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instruction BCEAO n°061-03-2011 — Critères d'admissibilité des crédits bancaires octroyés aux SFD
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
              L'Instruction BCEAO n°061-03-2011 définit les critères d'admissibilité des crédits bancaires octroyés aux SFD au refinancement de la BCEAO. Ce texte, <strong>absent du corpus de conformité courant</strong>, ouvre pourtant une voie de diversification du financement pour les SFD qui accèdent au crédit bancaire.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Comprendre le mécanisme : Banque → SFD → Refinancement BCEAO
            </h2>
            <div className="p-6 rounded-2xl border border-background-200 bg-background-50 mb-6">
              <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                Le refinancement BCEAO ne s'adresse pas <strong>directement</strong> au SFD. Le mécanisme fonctionne en deux temps : la banque accorde un crédit au SFD, puis la banque refinance ce crédit auprès de la BCEAO si les critères de l'Instruction n°061-03-2011 sont remplis.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                {[
                  { icon: 'ri-building-4-line', label: 'Banque commerciale', bg: 'bg-primary-500' },
                  { icon: 'ri-arrow-right-line', label: 'Crédit', bg: 'bg-background-200 text-foreground-700' },
                  { icon: 'ri-home-office-line', label: 'SFD', bg: 'bg-accent-500' },
                  { icon: 'ri-arrow-left-line', label: 'Remboursement', bg: 'bg-background-200 text-foreground-700' },
                  { icon: 'ri-bank-line', label: 'BCEAO refinance', bg: 'bg-secondary-500' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-background-50 font-bold ${item.bg}`} style={item.bg.includes('background') ? { background: 'oklch(var(--background-200))' } : {}}>
                      <i className={`${item.icon} text-lg`} />
                    </div>
                    <span className="text-xs font-medium text-foreground-600 whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Critères d'admissibilité au refinancement BCEAO
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-check-double-line text-primary-500" /> Critères côté SFD
                </h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'SFD en situation régulière (agrément en cours de validité)',
                    'Respect des ratios prudentiels BCEAO (Instruction n°010-08-2010)',
                    'Transmission à jour des reportings périodiques au SG-CB-UMOA',
                    'Absence d\'injonction ou de sanction disciplinaire en cours',
                    'Utilisation des fonds exclusivement pour l\'activité de microfinance',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-accent-500" /> Critères côté banque
                </h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'Documentation complète du crédit (contrat, échéancier, garanties)',
                    'Preuve de l\'utilisation effective des fonds par le SFD',
                    'Évaluation du risque de crédit conforme aux normes bancaires',
                    'Classification du crédit en portefeuille sain (non douteux)',
                    'Respect du plafond de refinancement par signature BCEAO',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-accent-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              III. Avantages stratégiques pour les SFD
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: 'ri-money-dollar-circle-line', title: 'Taux compétitifs', desc: 'Le refinancement BCEAO permet à la banque d\'offrir un taux réduit, le coût du crédit pour le SFD diminue', color: 'text-primary-600' },
                { icon: 'ri-hand-coin-line', title: 'Diversification', desc: 'Alternative au refinancement exclusif par les dépôts des membres — réduction du risque de liquidité', color: 'text-accent-600' },
                { icon: 'ri-shield-check-line', title: 'Signal de confiance', desc: 'L\'éligibilité au refinancement BCEAO est un signal positif pour les bailleurs et investisseurs', color: 'text-secondary-600' },
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">IV. FAQ</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">V. Bibliographie</h2>
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
                    ['BCEAO', 'Instruction n°061-03-2011', 'Mars 2011', 'Critères admissibilité crédits SFD au refinancement BCEAO'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles SFD'],
                    ['BCEAO', 'Instruction n°005-06-2010', 'Juin 2010', 'Agrément SFD'],
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
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Structurez votre crédit bancaire éligible au refinancement BCEAO</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS vous accompagne dans la structuration de votre dossier de crédit bancaire pour satisfaire aux critères de l'Instruction n°061-03-2011.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Demander un accompagnement
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

export default RefinancementPage;



