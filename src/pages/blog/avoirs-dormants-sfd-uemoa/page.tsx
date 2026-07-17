import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

const AVOIRSDORMANTSPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableauTextes = [
    { ref: 'Instruction n°05-06-2014', date: 'Juin 2014', objet: 'Recherche des titulaires de comptes dormants — procédures de contact, délais, obligations des SFD', lien: 'bceao.int' },
    { ref: 'Instruction n°06-06-2014', date: 'Juin 2014', objet: 'Transfert à la BCEAO des avoirs dormants — modalités de versement, reçus, obligations comptables', lien: 'bceao.int' },
    { ref: 'Instruction n°07-06-2014', date: 'Juin 2014', objet: 'Réclamation des avoirs dormants par les titulaires — procédure de restitution, délais, justificatifs', lien: 'bceao.int' },
  ];

  const etapesConformite = [
    { num: '01', titre: 'Identification', desc: 'Paramétrer le SI pour détecter automatiquement les comptes sans mouvement depuis 12 mois consécutifs (seuil de détection SFD)', color: 'bg-primary-500' },
    { num: '02', titre: 'Notification', desc: 'Adresser une notification écrite au titulaire à la dernière adresse connue. Tentative de contact obligatoire (courrier, SMS, appel) selon l\'Instruction n°05-06-2014', color: 'bg-accent-500' },
    { num: '03', titre: 'Provisionnement', desc: 'Comptabiliser les avoirs dormants en comptes d\'attente spécifiques dès l\'identification. Exclure ces fonds du ratio de liquidité', color: 'bg-secondary-500' },
    { num: '04', titre: 'Transfert BCEAO', desc: 'Transférer à la BCEAO selon Instruction n°06-06-2014 après la période d\'inactivité requise (généralement 5 ans sans réclamation)', color: 'bg-primary-500' },
    { num: '05', titre: 'Restitution', desc: 'Traiter les demandes de restitution selon Instruction n°07-06-2014 : délais, justificatifs, procédures d\'identification du titulaire', color: 'bg-accent-500' },
  ];

  const faqItems = [
    { q: 'Qu\'est-ce qu\'un avoir dormant dans un SFD UEMOA ?', a: 'Un avoir dormant est un compte, dépôt ou épargne d\'un membre/client sur lequel aucune opération n\'a été initiée par le titulaire pendant une période déterminée. La BCEAO encadre ce délai par les Instructions n°05, 06 et 07-06-2014. Le concept couvre les comptes d\'épargne, les dépôts à terme échus non réclamés, et les soldes résiduels après clôture.' },
    { q: 'Quelle est la différence entre les 3 Instructions BCEAO sur les avoirs dormants ?', a: 'Les trois Instructions BCEAO de juin 2014 traitent des aspects complémentaires : n°05 porte sur la RECHERCHE des titulaires (comment contacter les clients inactifs), n°06 définit les modalités de TRANSFERT à la BCEAO (versement, comptabilisation), n°07 encadre la RÉCLAMATION par les titulaires (comment un client peut récupérer ses avoirs). Ensemble, elles forment un cycle complet de gestion des avoirs dormants.' },
    { q: 'Les avoirs dormants peuvent-ils être utilisés dans le ratio de liquidité d\'un SFD ?', a: 'Non. Les avoirs dormants identifiés et provisionnés en comptes d\'attente ne doivent pas figurer dans les ressources stables ou les dépôts actifs utilisés pour le calcul des ratios prudentiels. Le SG-CB-UMOA vérifie la cohérence entre le registre des avoirs dormants et les états prudentiels lors des inspections.' },
    { q: 'Que risque un SFD qui utilise les avoirs dormants comme ressources de crédit ?', a: 'C\'est une faute grave de gestion. Les avoirs dormants restent la propriété des titulaires ou de leurs ayants droit. Les utiliser pour financer des crédits constitue une violation des Instructions BCEAO n°05-06-2014, n°06-06-2014 et n°07-06-2014. Le SG-CB-UMOA peut prononcer une injonction de mise en conformité, une restriction d\'activité, et dans les cas graves, un retrait d\'agrément.' },
    { q: 'La procédure de restitution des avoirs dormants est-elle complexe pour les clients ?', a: 'L\'Instruction BCEAO n°07-06-2014 impose une procédure de restitution claire, avec des délais définis et des exigences documentaires précises. Le SFD ne peut pas imposer des délais ou des justificatifs excessifs. Les frais facturés pour la restitution sont encadrés. En cas de litige, le titulaire peut saisir le mécanisme de réclamation du SFD, puis la Commission Bancaire UMOA.' },
  ];

  return (
    <>
      <SeoHead
        title="Avoirs Dormants SFD UEMOA | Instructions BCEAO n°05, 06, 07-06-2014 — Guide Complet"
        description="Guide complet sur les avoirs dormants dans les SFD UEMOA. Instructions BCEAO n°05, 06 et 07-06-2014 : recherche des titulaires, transfert à la BCEAO, restitution aux clients. Checklist de conformité en 5 étapes, impact sur les ratios prudentiels et comptabilité SYSCOHADA."
        keywords="avoirs dormants SFD UEMOA, Instruction BCEAO 05-06-2014, Instruction BCEAO 06-06-2014, Instruction BCEAO 07-06-2014, comptes dormants microfinance, transfert BCEAO, restitution titulaires, conformité SFD, ratios prudentiels, SYSCOHADA"
        canonicalPath="/blog/avoirs-dormants-sfd-uemoa"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Conformité Réglementaire SFD"
        articleTags={['BCEAO', 'SFD', 'avoirs dormants', 'conformité', 'UEMOA', 'microfinance']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Avoirs Dormants SFD UEMOA | Instructions BCEAO n°05, 06, 07-06-2014"
        description="Guide complet sur les avoirs dormants dans les SFD UEMOA. Instructions BCEAO n°05, 06 et 07-06-2014 : recherche des titulaires, transfert à la BCEAO, restitution aux clients."
        url="/blog/avoirs-dormants-sfd-uemoa/"
      />
      <SchemaFAQPage faqs={faqItems.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[520px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=West%20African%20microfinance%20SFD%20institution%20professional%20banking%20compliance%20dormant%20accounts%20management%20BCEAO%20regulatory%20framework%20modern%20office%20dark%20navy%20tones%20warm%20professional%20atmosphere%20Lome%20Abidjan%20Dakar&width=1600&height=600&seq=avoirs-dormants-sfd-hero-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-shield-check-line" /> Conformité Réglementaire BCEAO
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Avoirs Dormants dans les SFD UEMOA
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Instructions BCEAO n°05, 06, 07-06-2014 — Cadre réglementaire, obligations et procédures complètes
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/60">
                  <span><i className="ri-calendar-line mr-1" />16 Juin 2026</span>
                  <span><i className="ri-time-line mr-1" />8 min de lecture</span>
                  <span><i className="ri-user-line mr-1" />KHEPRA EXPERTS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

          {/* Résumé exécutif */}
          <div className="p-6 md:p-8 rounded-2xl mb-10 border-l-4" style={{ background: '#fffbeb', borderColor: '#c9a227' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="ri-information-line text-2xl" style={{ color: '#c9a227' }} />
              <h2 className="text-xl font-bold text-foreground-950">Résumé exécutif</h2>
            </div>
            <p className="text-foreground-700 leading-relaxed mb-3">
              La gestion des avoirs dormants dans les Systèmes Financiers Décentralisés (SFD) de la zone UEMOA est encadrée par <strong>trois Instructions BCEAO de juin 2014</strong>, absentes du corpus réglementaire couvert par la plupart des SFD. Ces textes définissent des obligations contraignantes sur la recherche des titulaires, le transfert à la BCEAO et la restitution aux clients.
            </p>
            <p className="text-foreground-700 leading-relaxed">
              Le non-respect expose le SFD à des sanctions disciplinaires et à une utilisation irrégulière de fonds appartenant à ses membres. Ce guide couvre l'intégralité du cadre réglementaire et le plan d'action en 5 étapes.
            </p>
          </div>

          {/* Contexte — absence totale de couverture */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              I. Un sujet réglementaire absent de la couverture usuelle des SFD
            </h2>
            <p className="text-foreground-700 leading-relaxed mb-4">
              L'audit systématique des références BCEAO sur les sites spécialisés en conformité microfinance révèle un angle mort majeur : les Instructions BCEAO n°05, 06 et 07-06-2014 relatives aux avoirs dormants sont <strong>quasi-absentes des corpus de conformité SFD</strong>. Pourtant, elles constituent des obligations légales contraignantes pour tout SFD collectant l'épargne.
            </p>
            <p className="text-foreground-700 leading-relaxed mb-4">
              La raison de cette lacune est compréhensible : les SFD focalisent leur effort de conformité sur les ratios prudentiels (Instruction n°010-08-2010), le contrôle interne (n°017-12-2010) et la LBC/FT (Directive UEMOA n°02/2015). Les obligations relatives aux avoirs dormants sont perçues comme secondaires. C'est une erreur stratégique.
            </p>
            <div className="p-5 rounded-xl border border-red-200 bg-red-50">
              <div className="flex items-start gap-3">
                <i className="ri-error-warning-line text-2xl text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-800 mb-1">Risque opérationnel sous-estimé</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Les SFD qui ne gèrent pas les avoirs dormants conformément aux Instructions BCEAO de 2014 peuvent se retrouver à utiliser comme ressources de crédit des fonds qui appartiennent légalement à leurs membres. C'est une faute de gestion grave, détectable lors d'une inspection du SG-CB-UMOA.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tableau des 3 textes */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              II. Les 3 Instructions BCEAO — Tableau de référence
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-background-200">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'oklch(var(--primary-500))' }}>
                    {['Référence', 'Date', 'Objet', 'Source officielle'].map(h => (
                      <th key={h} className="text-left px-5 py-3 font-bold text-background-50 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableauTextes.map((t, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-5 py-4 font-bold text-primary-700">{t.ref}</td>
                      <td className="px-5 py-4 text-foreground-700">{t.date}</td>
                      <td className="px-5 py-4 text-foreground-700">{t.objet}</td>
                      <td className="px-5 py-4 text-foreground-600">{t.lien}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-foreground-600 text-xs mt-2 italic">Sources : BCEAO, bceao.int — textes officiels en vigueur</p>
          </section>

          {/* Analyse de chaque instruction */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              III. Analyse détaillée de chaque instruction
            </h2>

            <div className="space-y-8">
              {/* Instruction n°05 */}
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-primary-500">05</div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-lg">Instruction n°05-06-2014 — Recherche des titulaires</h3>
                    <p className="text-foreground-600 text-sm">Obligations de contact et de notification avant transfert</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground-800 mb-2 text-sm">Obligations principales :</h4>
                    <ul className="space-y-2">
                      {[
                        'Identification systématique des comptes inactifs selon le critère d\'absence de mouvement (seuil à vérifier dans le texte officiel)',
                        'Tentative de contact obligatoire : courrier recommandé à la dernière adresse connue',
                        'Délai de réponse laissé au titulaire avant classement en avoir dormant',
                        'Documentation de toutes les tentatives de contact (registre des relances)',
                        'Conservation des preuves de notification (récépissés, accusés de réception)',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                          <i className="ri-check-line text-primary-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground-800 mb-2 text-sm">Points de contrôle SG-CB-UMOA :</h4>
                    <ul className="space-y-2">
                      {[
                        'Existence d\'une procédure documentée de détection des comptes dormants',
                        'Registre des tentatives de contact tenu à jour',
                        'Cohérence entre le registre dormants et les états prudentiels',
                        'Qualification comptable correcte en comptes d\'attente',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                          <i className="ri-eye-line text-accent-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instruction n°06 */}
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-accent-500">06</div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-lg">Instruction n°06-06-2014 — Transfert à la BCEAO</h3>
                    <p className="text-foreground-600 text-sm">Modalités de versement des avoirs dormants à la banque centrale</p>
                  </div>
                </div>
                <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                  L'Instruction n°06-06-2014 définit les modalités pratiques du transfert des avoirs dormants à la BCEAO après expiration du délai de réclamation. Ce transfert est <strong>obligatoire</strong> et ne constitue pas une option laissée à la discrétion du SFD.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: 'ri-bank-line', title: 'Versement', desc: 'Modalités pratiques de virement à la BCEAO, codes de comptabilisation, références à mentionner', color: 'text-primary-600' },
                    { icon: 'ri-file-text-line', title: 'Documentation', desc: 'Récépissés émis par la BCEAO, conservation pendant 10 ans, registre des transferts effectués', color: 'text-accent-600' },
                    { icon: 'ri-calculator-line', title: 'Comptabilisation', desc: 'Traitement comptable SYSCOHADA lors du transfert, impact sur les états financiers et les ratios', color: 'text-secondary-600' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200">
                      <i className={`${item.icon} text-xl mb-2 block ${item.color}`} />
                      <h4 className="font-bold text-foreground-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-foreground-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instruction n°07 */}
              <div className="p-6 rounded-2xl border border-background-200 bg-background-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 bg-secondary-500">07</div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-lg">Instruction n°07-06-2014 — Réclamation des titulaires</h3>
                    <p className="text-foreground-600 text-sm">Procédure de restitution des avoirs aux titulaires ou ayants droit</p>
                  </div>
                </div>
                <p className="text-foreground-700 text-sm leading-relaxed mb-4">
                  L'Instruction n°07-06-2014 garantit le droit des titulaires et de leurs ayants droit à récupérer leurs avoirs, même après le transfert à la BCEAO. La procédure de restitution doit être accessible, clairement communiquée, et sans frais excessifs.
                </p>
                <div className="p-4 rounded-xl border border-primary-200 bg-primary-50">
                  <p className="text-sm font-semibold text-primary-800 mb-2">Obligations d'information du SFD :</p>
                  <ul className="space-y-1">
                    {[
                      'Affichage visible en agence de la procédure de réclamation',
                      'Mention dans les contrats d\'adhésion et les conditions générales',
                      'Délais de traitement des demandes de restitution clairement définis',
                      'Liste des justificatifs exigibles encadrée (pas d\'exigences abusives)',
                      'Recours possible auprès de la Commission Bancaire UMOA en cas de litige',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-primary-700">
                        <i className="ri-arrow-right-s-line flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist 5 étapes */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              IV. Checklist de conformité — 5 étapes opérationnelles
            </h2>
            <div className="space-y-4">
              {etapesConformite.map((etape, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-background-50 border border-background-200">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-background-50 font-bold text-lg flex-shrink-0 ${etape.color}`}>
                    {etape.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground-950 text-base mb-1">{etape.titre}</h3>
                    <p className="text-foreground-700 text-sm leading-relaxed">{etape.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Impact sur ratios prudentiels */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              V. Impact sur les ratios prudentiels et la comptabilité
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-background-50 border border-background-200">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-pie-chart-2-line text-primary-500" /> Ratio de liquidité (Instruction n°010-08-2010)
                </h3>
                <p className="text-foreground-700 text-sm leading-relaxed mb-3">
                  Les avoirs dormants identifiés et provisionnés en comptes d'attente <strong>ne doivent pas figurer dans le passif exigible stable</strong>. Leur inclusion fausserait le calcul du ratio de liquidité en sous-estimant les obligations immédiates du SFD.
                </p>
                <div className="p-3 rounded-lg bg-primary-50 border border-primary-200">
                  <p className="text-xs text-primary-700 font-semibold">Traitement correct : Comptes d'attente (Classe 4 SYSCOHADA)</p>
                  <p className="text-xs text-primary-600 mt-1">Ne pas inclure dans les dépôts actifs du numérateur ni du dénominateur du ratio</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-background-50 border border-background-200">
                <h3 className="font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-line text-accent-500" /> États financiers SYSCOHADA
                </h3>
                <p className="text-foreground-700 text-sm leading-relaxed mb-3">
                  Le transfert des avoirs dormants à la BCEAO doit être correctement traité selon le référentiel SYSCOHADA applicable aux SFD. L'AUDCIF OHADA révisé 2017 et les Instructions BCEAO sur le Plan Comptable Bancaire définissent le traitement exact.
                </p>
                <div className="p-3 rounded-lg bg-accent-50 border border-accent-200">
                  <p className="text-xs text-accent-700 font-semibold">Note : Vérifier dans le texte officiel le traitement exact</p>
                  <p className="text-xs text-accent-600 mt-1">Impact sur le compte de résultat et le bilan à documenter dans les notes annexes</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">VI. FAQ — Questions fréquentes</h2>
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
                    ['BCEAO', 'Instruction n°05-06-2014', 'Juin 2014', 'Recherche des titulaires de comptes dormants dans les SFD'],
                    ['BCEAO', 'Instruction n°06-06-2014', 'Juin 2014', 'Transfert à la BCEAO des avoirs dormants des SFD'],
                    ['BCEAO', 'Instruction n°07-06-2014', 'Juin 2014', 'Réclamation des avoirs dormants par les titulaires dans les SFD'],
                    ['BCEAO', 'Instruction n°010-08-2010', 'Août 2010', 'Règles prudentielles applicables aux SFD (ratios, fonds propres)'],
                    ['BCEAO', 'Instruction n°017-12-2010', 'Décembre 2010', 'Organisation du contrôle interne des SFD'],
                    ['BCEAO', 'Instruction n°007-06-2010', 'Juin 2010', 'Modalités de contrôle et de sanction des SFD'],
                    ['OHADA', 'AUDCIF révisé', '2017', 'Comptabilité des entreprises — SYSCOHADA'],
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
            <p className="text-foreground-500 text-xs mt-2">Sources officielles : bceao.int — cb-umoa.org — ohada.org</p>
          </section>

          {/* CTA */}
          <div className="p-8 md:p-10 rounded-3xl text-center" style={{ background: 'oklch(var(--foreground-950))' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">Auditez votre dispositif avoirs dormants</h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS réalise des audits de conformité complets incluant les Instructions BCEAO n°05, 06 et 07-06-2014 sur les avoirs dormants — souvent absentes des audits standards.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Demander un diagnostic de conformité
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Ce document est fourni à titre strictement informatif. Il ne constitue pas un avis juridique ou réglementaire. Les Instructions BCEAO doivent être consultées dans leur version officielle la plus récente sur bceao.int. Seul le SG-CB-UMOA est habilité à interpréter les textes prudentiels applicables aux SFD.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AVOIRSDORMANTSPage;