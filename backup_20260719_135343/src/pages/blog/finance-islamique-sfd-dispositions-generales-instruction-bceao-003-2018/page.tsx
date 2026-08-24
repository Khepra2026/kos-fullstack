import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const FIGeneralePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    { q: 'Quelle est la différence entre l\'Instruction n°003-03-2018 et la n°005-05-2018 ?', a: 'L\'Instruction n°003-03-2018 définit les DISPOSITIONS GÉNÉRALES de la finance islamique dans les SFD (cadre juridique, gouvernance, principes fondamentaux). L\'Instruction n°005-05-2018 détaille les CARACTÉRISTIQUES TECHNIQUES de chaque produit (Murabaha, Ijara, etc.). Les deux sont complémentaires : le cadre général d\'abord, les produits ensuite.' },
    { q: 'La finance islamique dans les SFD est-elle obligatoire ?', a: 'Non. La finance islamique est une OPTION offerte aux SFD qui souhaitent proposer des produits conformes à la Charia. Les SFD peuvent continuer à fonctionner exclusivement en finance conventionnelle. Toutefois, un SFD qui se lance dans la finance islamique doit respecter l\'INTÉGRALITÉ du cadre défini par les Instructions n°003 et 005-05-2018.' },
    { q: 'Quels sont les principes fondamentaux de la finance islamique SFD ?', a: 'Cinq principes fondateurs : interdiction du riba (intérêt), interdiction du gharar (incertitude excessive), interdiction du maysir (spéculation), adossement à un actif tangible (asset-backed), et partage des profits et pertes entre les parties. L\'Instruction n°003-03-2018 transpose ces principes dans le cadre prudentiel SFD UEMOA.' },
    { q: 'Un SFD classique peut-il ajouter une fenêtre islamique sans changer d\'agrément ?', a: 'L\'Instruction n°003-03-2018 prévoit explicitement la possibilité d\'ouvrir un "guichet islamique" au sein d\'un SFD conventionnel. Le SFD doit toutefois obtenir une autorisation préalable du SG-CB-UMOA et démontrer une séparation comptable et opérationnelle étanche entre les activités conventionnelles et islamiques.' },
    { q: 'Comment KHEPRA EXPERTS peut vous accompagner sur la finance islamique SFD ?', a: 'KHEPRA EXPERTS réalise des études de faisabilité pour l\'ouverture d\'un guichet islamique, audite la conformité Charia + BCEAO des produits existants, et accompagne les SFD dans la constitution du dossier d\'autorisation auprès du SG-CB-UMOA. Notre équipe maîtrise le double cadre réglementaire (BCEAO + Charia).' },
  ];

  return (
    <>
      <SeoHead
        title="Finance Islamique SFD UEMOA | Instruction BCEAO n°003-03-2018 — Dispositions Générales"
        description="Dispositions générales de la finance islamique dans les SFD UEMOA. Instruction BCEAO n°003-03-2018 : cadre juridique, gouvernance, principes Charia, guichet islamique, séparation comptable. Complémentaire de l'Instruction n°005-05-2018."
        keywords="finance islamique SFD, Instruction BCEAO 003-03-2018, dispositions générales FI, guichet islamique SFD, Charia UEMOA, principes finance islamique, riba, gharar, maysir, conformité SFD"
        canonicalPath="/blog/finance-islamique-sfd-dispositions-generales-instruction-bceao-003-2018"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'finance islamique', 'SFD', 'Charia', 'UEMOA', 'microfinance', 'guichet islamique']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Finance Islamique SFD UEMOA | Instruction BCEAO n°003-03-2018"
        description="Instruction BCEAO n°003-03-2018 : dispositions générales de la finance islamique dans les SFD — principes Charia, guichet islamique, gouvernance, conformité."
        url="/blog/finance-islamique-sfd-dispositions-generales-instruction-bceao-003-2018/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Islamic%20finance%20principles%20concepts%20ethical%20banking%20Sharia%20compliant%20financial%20services%20professional%20elegant%20atmosphere%20geometric%20patterns%20arabesque%20subtle%20design%20elements%20warm%20golden%20tones%20modern%20institutional%20West%20African%20context%20sophisticated%20professional%20ambiance&width=1600&height=600&seq=fi-generale-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-star-line" /> Finance Éthique & Charia
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Finance Islamique dans les SFD — Dispositions Générales
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instruction BCEAO n°003-03-2018 — Cadre juridique, principes fondamentaux et gouvernance
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
            <p className="text-foreground-700 leading-relaxed mb-3">
              L'Instruction BCEAO n°003-03-2018 définit le <strong>cadre général de la finance islamique</strong> dans les SFD de l'UMOA. C'est le texte chapeau qui pose les fondations juridiques, éthiques et opérationnelles avant la mise en œuvre des produits spécifiques (Instruction n°005-05-2018). <strong>Absent du corpus de conformité courant</strong>, ce texte est indispensable pour tout SFD qui envisage d'ouvrir un guichet islamique.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Link to="/blog/finance-islamique-sfd-instruction-bceao-005-05-2018" className="text-primary-600 text-sm font-semibold hover:underline inline-flex items-center gap-1">
                Voir l'article sur l'Instruction n°005-05-2018 (produits) <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Les 5 principes fondamentaux de la finance islamique dans les SFD
            </h2>
            <div className="space-y-4">
              {[
                { principe: 'Interdiction du Riba (intérêt)', desc: 'Toute forme de taux d\'intérêt prédéterminé est prohibée. Le profit doit provenir d\'une activité commerciale réelle ou d\'un partage de risque, pas du simple écoulement du temps. Dans les SFD, cela transforme la relation : le SFD devient partenaire commercial du membre, pas simple prêteur.', icon: 'ri-forbid-2-line', color: 'bg-primary-500' },
                { principe: 'Interdiction du Gharar (incertitude excessive)', desc: 'Les contrats doivent être clairs, précis et complets. Toute incertitude excessive sur l\'objet, le prix ou les conditions annule le contrat. Pour les SFD, cela impose une transparence totale sur les conditions des produits proposés aux membres.', icon: 'ri-question-line', color: 'bg-accent-500' },
                { principe: 'Interdiction du Maysir (spéculation)', desc: 'Les opérations purement spéculatives sont interdites. Le profit doit résulter d\'un effort productif réel. Cela exclut les produits dérivés complexes et les paris sur les fluctuations de marché dans l\'offre SFD.', icon: 'ri-dice-line', color: 'bg-secondary-500' },
                { principe: 'Adossement à un actif tangible (Asset-Backed)', desc: 'Toute transaction financière doit être adossée à un actif réel sous-jacent. Pour les SFD, cela signifie que le financement est toujours lié à un bien ou un service concret — crédit-bail (Ijara), vente à tempérament (Murabaha), projet productif.', icon: 'ri-home-2-line', color: 'bg-primary-500' },
                { principe: 'Partage des profits et des pertes', desc: 'Le financier et l\'entrepreneur partagent les risques. Dans un SFD, cela se traduit par des produits comme la Moudaraba (le SFD apporte le capital, le membre apporte le travail) ou la Musharaka (partenariat en capital). Les pertes sont partagées proportionnellement.', icon: 'ri-hand-heart-line', color: 'bg-accent-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-background-50 border border-background-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 ${item.color}`}>
                    <i className={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-base mb-1">{item.principe}</h3>
                    <p className="text-foreground-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Le guichet islamique dans un SFD conventionnel
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-3">Conditions d'ouverture</h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'Autorisation préalable obligatoire du SG-CB-UMOA',
                    'Séparation comptable étanche entre activités conventionnelles et islamiques',
                    'Désignation d\'un Sharia Board (comité de conformité Charia)',
                    'Personnel formé aux principes de la finance islamique',
                    'Système d\'information capable de tracer la séparation des fonds',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <h3 className="font-bold text-foreground-950 mb-3">Obligations de gouvernance</h3>
                <ul className="space-y-2 text-sm text-foreground-700">
                  {[
                    'Rapport annuel spécifique sur les activités islamiques',
                    'Audit externe du guichet islamique par un auditeur qualifié',
                    'Reporting périodique au SG-CB-UMOA des indicateurs islamiques',
                    'Respect des ratios prudentiels calculés séparément',
                    'Information claire des membres sur la nature des produits souscrits',
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
                    ['BCEAO', 'Instruction n°003-03-2018', 'Mars 2018', 'Dispositions générales FI applicables aux SFD'],
                    ['BCEAO', 'Instruction n°005-05-2018', 'Mai 2018', 'Caractéristiques techniques opérations FI SFD'],
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
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Ouvrez votre guichet islamique SFD</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS vous accompagne de l'étude de faisabilité à l'obtention de l'autorisation SG-CB-UMOA pour votre guichet islamique SFD.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap">
              Demander une étude de faisabilité
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Document informatif. Consultez les textes officiels sur bceao.int. La finance islamique est un domaine spécialisé nécessitant l'avis d'experts qualifiés en Charia et en réglementation BCEAO.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FIGeneralePage;



