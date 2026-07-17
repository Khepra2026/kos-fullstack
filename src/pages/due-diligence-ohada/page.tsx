import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { getCountryBySlug, OHADA_COUNTRIES, type OhadaCountry } from '@/data/ohadaDueDiligence';
import NPLCalculator from '@/components/feature/NPLCalculator';
import ExportPDFButton from '@/components/feature/ExportPDFButton';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function DueDiligenceOhadaPage() {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const data: OhadaCountry | undefined = country ? getCountryBySlug(country) : undefined;

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Pays non trouvé</h1>
          <p className="text-gray-600 mb-6">Ce pays n'est pas dans notre base de données Due Diligence OHADA.</p>
          <button onClick={() => navigate('/due-diligence-pme-afrique')} className="inline-flex items-center gap-2 bg-gold-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gold-600 transition-all cursor-pointer whitespace-nowrap">
            Voir notre page Due Diligence générale
          </button>
        </div>
      </div>
    );
  }

  const pageUrl = `${SITE_URL}/due-diligence-${data.slug}`;
  const pageTitle = `Due Diligence ${data.pays} — KHEPRA DD™ | Conformité ${data.regulateur} ${data.zone}`;
  const pageDesc = `Due diligence OHADA au ${data.pays} (${data.capitale}). Méthodologie KHEPRA DD™ 60 jours. Conformité ${data.regulateur}, ${data.directive}. Red flags acquisition en zone ${data.zone}. Expertise Khepra Experts.`;

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
        about: { '@type': 'Service', name: `Due Diligence ${data.pays}` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${pageUrl}#service`,
        name: `Due Diligence ${data.pays}`,
        serviceType: 'Due Diligence OHADA',
        description: `Due diligence au ${data.pays} (${data.capitale}). Conformité ${data.regulateur}, directive ${data.directive}. Méthodologie KHEPRA DD™ en 60 jours. Red flags spécifiques : ${data.redFlagLocal}.`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', 'name': data.pays },
        audience: { '@type': 'Audience', 'audienceType': 'Private Equity, Family Office, Investisseurs' },
        offers: {
          '@type': 'Offer',
          name: 'KHEPRA DD™',
          description: 'Méthodologie proprietary 60 jours: Discovery J0-J15, Deep Dive J15-J45, Synthesis J45-J60, Post-Closing J60-J160',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Quel est le régulateur financier au ${data.pays}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Le régulateur financier est ${data.regulateur}. Le ${data.pays} fait partie de la zone ${data.zone}. La directive AML/CFT applicable est ${data.directive}.`,
            },
          },
          {
            '@type': 'Question',
            name: `Quels sont les red flags spécifiques pour une acquisition au ${data.pays}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: data.redFlagLocal,
            },
          },
          {
            '@type': 'Question',
            name: `Combien de temps dure une due diligence KHEPRA DD™ au ${data.pays}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `60 jours pour la due diligence: J0-J15 Discovery, J15-J45 Deep Dive, J45-J60 Synthesis. 100 jours additionnels pour l'intégration post-closing. Prix indicatif en ${data.devise}.`,
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
        keywords={`due diligence ${data.pays}, due diligence OHADA ${data.slug}, KHEPRA DD ${data.pays}, conformité ${data.regulateur} ${data.slug}, acquisition ${data.pays}, M&A ${data.zone}, audit pré-acquisition ${data.capitale}, ${data.directive}`}
        canonicalPath={`/due-diligence-${data.slug}`}
        ogType="website"
        ogImage={OG_IMAGES.SOLUTIONS}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt={`Due Diligence ${data.pays} — KHEPRA EXPERTS`}
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
              Zone {data.zone} — {data.regulateur}
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Due Diligence <span className="text-gold-400">{data.pays}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Méthodologie <strong className="text-white">KHEPRA DD™</strong> adaptée au cadre OHADA et aux exigences {data.regulateur}. Capitale économique : {data.capitale}. Population : {data.population}. Monnaie : {data.devise}.
            </p>
            <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
              Directive AML/CFT : <strong className="text-gold-400">{data.directive}</strong>. Régime fiscal : {data.specificiteFiscale.split(' — ')[0]}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                Obtenir un audit initial
                <i className="ri-arrow-right-line"></i>
              </button>
              <a
                href="#methodologie"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-file-search-line"></i>
                Méthodologie KHEPRA DD™
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><i className="ri-map-pin-line text-gold-400 text-lg"></i><span>{data.capitale}</span></div>
              <div className="flex items-center gap-2"><i className="ri-bank-line text-gold-400 text-lg"></i><span>{data.regulateur}</span></div>
              <div className="flex items-center gap-2"><i className="ri-global-line text-gold-400 text-lg"></i><span>{data.zone}</span></div>
              <div className="flex items-center gap-2"><i className="ri-time-line text-gold-400 text-lg"></i><span>60 jours KHEPRA DD™</span></div>
            </div>
          </div>
        </section>

        {/* ── QUICK ANSWER AI (SGE) ── */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 border border-gold-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                  <i className="ri-robot-line text-gold-600 text-xl"></i>
                </div>
                <h2 className="font-playfair text-xl font-bold text-gray-900">Réponse rapide : Due Diligence {data.pays}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Délai</strong> : 60 jours avec KHEPRA DD™</span></li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Régulateur</strong> : {data.regulateur} ({data.zone})</span></li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Directive AML</strong> : {data.directive}</span></li>
                  <li className="flex items-start gap-2"><i className="ri-error-warning-line text-amber-500 mt-0.5 flex-shrink-0"></i><span><strong>Red flag #{data.slug === 'rdc' ? '1' : '1'} {data.pays}</strong> : {data.redFlagLocal}</span></li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Seuil NPL {data.regulateur}</strong> : 70% minimum</span></li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Capitale</strong> : {data.capitale}</span></li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Devise</strong> : {data.devise}</span></li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i><span><strong>Sources</strong> : OHADA, {data.regulateur}, AUSCGIE 2014</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIMULATEUR NPL INTERACTIF ── */}
        <NPLCalculator regulateur={data.regulateur} pays={data.pays} devise={data.devise} />

        {/* ── DONNÉES STRUCTURÉES IA ── */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">
              Spécificités réglementaires <span className="text-gold-600">{data.pays}</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-950 text-white">
                    <th className="text-left p-4 rounded-tl-lg">Réglementation</th>
                    <th className="text-left p-4">Point de contrôle</th>
                    <th className="text-left p-4">Risque si non-conforme</th>
                    <th className="text-left p-4 rounded-tr-lg">Action KHEPRA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gold-50/50 transition-colors">
                    <td className="p-4 font-semibold">{data.directive}</td>
                    <td className="p-4">Conformité AML/CFT</td>
                    <td className="p-4"><span className="text-red-600 font-semibold">Inéligible financement international</span></td>
                    <td className="p-4">Audit complet KYC/KYB + déclaration CENTIF</td>
                  </tr>
                  <tr className="hover:bg-gold-50/50 transition-colors bg-gray-50">
                    <td className="p-4 font-semibold">AUSCGIE 2014</td>
                    <td className="p-4">Registre actionnaires OHADA</td>
                    <td className="p-4"><span className="text-red-600 font-semibold">Nullité cession parts</span></td>
                    <td className="p-4">Vérification RCCM + Greffe + Livre des Associés</td>
                  </tr>
                  <tr className="hover:bg-gold-50/50 transition-colors">
                    <td className="p-4 font-semibold">{data.regulateur}</td>
                    <td className="p-4">Agrément valide</td>
                    <td className="p-4"><span className="text-red-600 font-semibold">Retrait licence</span></td>
                    <td className="p-4">Vérification registre officiel {data.regulateur} + conformité prudentielle</td>
                  </tr>
                  <tr className="hover:bg-gold-50/50 transition-colors bg-gray-50">
                    <td className="p-4 font-semibold">SYSCOHADA</td>
                    <td className="p-4">États financiers 3 ans</td>
                    <td className="p-4"><span className="text-amber-600 font-semibold">Ajustement prix -15%</span></td>
                    <td className="p-4">Retraitement SYSCOHADA + ratio NPL 70% + BFR</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Sources : OHADA, {data.regulateur}, Banque Mondiale Doing Business, AUSCGIE 2014, SYSCOHADA Révisé</p>
          </div>
        </section>

        {/* ── MÉTHODOLOGIE KHEPRA DD™ ── */}
        <section id="methodologie" className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.4)', color: '#D4A82A' }}>
                Méthodologie Proprietary
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                KHEPRA DD™ au <span className="text-gold-600">{data.pays}</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Méthodologie en 4 phases, inspirée des standards Big Four, adaptée au contexte {data.zone} et aux exigences spécifiques de {data.regulateur}.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { step: '1', title: `Discovery J0-J15 — ${data.capitale}`, desc: `Accès à la data room, première revue documentaire, identification des red flags ${data.pays}. Vérification ${data.regulateur}, RCCM OHADA, titres fonciers.`, color: 'bg-brand-100 text-brand-700' },
                { step: '2', title: `Deep Dive J15-J45 — ${data.pays}`, desc: `Audit sur site ${data.capitale}. Analyse financière SYSCOHADA 3 ans, conformité ${data.directive}, vérification fiscale (${data.specificiteFiscale.split(' — ')[0]}), due diligence sociale, environnementale et gouvernance.`, color: 'bg-gold-100 text-gold-700' },
                { step: '3', title: `Synthesis J45-J60 — Rapport`, desc: `Rapport intégré 20 pages. Matrice de risques classés rouge/orange/vert. Ajustements de prix recommandés. Plan de garanties. Présentation au comité d'investissement en ${data.capitale}.`, color: 'bg-emerald-100 text-emerald-700' },
                { step: '4', title: `Post-Closing J60-J160`, desc: `Plan d'intégration 100 jours. Suivi des conditions suspensives. Mise en conformité ${data.regulateur}. Transfert effectif des agréments. Formation des équipes locales ${data.capitale}.`, color: 'bg-purple-100 text-purple-700' },
              ].map((phase, i) => (
                <div key={i} className="flex items-start gap-5 bg-white rounded-xl p-6 border border-gray-100">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0 font-bold text-lg`}>
                    {phase.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{phase.title}</h3>
                    <p className="text-gray-600">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4 VOLETS ── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                4 Volets de Due Diligence <span className="text-gold-600">Intégrée</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Applicables au {data.pays} avec les spécificités {data.zone}/{data.regulateur}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Due Diligence Financière', desc: `Analyse états financiers SYSCOHADA 3 ans, calcul ratios ${data.regulateur} (NPL 70%), retraitement BFR, projection post-acquisition. Valorisation en ${data.devise}.`, icon: 'ri-bar-chart-box-line', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                { title: 'Due Diligence Légale & Fiscale', desc: `Vérification AUSCGIE 2014, statuts RCCM, contrats majeurs, litiges en cours, conformité ${data.directive}, agréments ${data.regulateur}. Analyse fiscale : ${data.specificiteFiscale.split(' — ')[0]}.`, icon: 'ri-scales-3-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { title: 'Due Diligence Technique', desc: `Audit des actifs en ${data.capitale} : immobilier (vérification des titres fonciers), stocks, équipements industriels, processus opérationnels, qualité de la gouvernance.`, icon: 'ri-settings-4-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { title: 'Due Diligence ESG', desc: `Conformité environnementale et sociale selon standards IFC, alignement ISSB. Analyse des risques ESG spécifiques ${data.pays.toLowerCase()} : ${data.redFlagLocal.slice(0, 80)}...`, icon: 'ri-leaf-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
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

        {/* ── CROSS-LINKS: Autres pays ── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8 text-center">
              Due Diligence dans les <span className="text-gold-600">17 pays OHADA</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {OHADA_COUNTRIES.map((c) => (
                <a
                  key={c.slug}
                  href={`/due-diligence-${c.slug}`}
                  onClick={(e) => { e.preventDefault(); navigate(`/due-diligence-${c.slug}`); }}
                  className={`px-4 py-3 rounded-lg text-sm text-center font-medium transition-all cursor-pointer whitespace-nowrap ${
                    c.slug === data.slug
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gold-300 hover:bg-gold-50'
                  }`}
                >
                  {c.pays}
                  <span className="block text-xs opacity-70">{c.zone}</span>
                </a>
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
              Projet d'acquisition au <span className="text-gold-400">{data.pays}</span> ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nos experts interviennent à {data.capitale} et dans tout {data.pays}. Premier entretien gratuit de 30 minutes pour qualifier votre projet et établir un plan de mission en {data.devise}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                <i className="ri-calendar-check-line"></i>
                Demander un audit à {data.capitale}
              </button>
              <a
                href="/khepra-dd-methodologie"
                onClick={(e) => { e.preventDefault(); navigate('/khepra-dd-methodologie'); }}
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-book-open-line"></i>
                Méthodologie KHEPRA DD™
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm">
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-linkedin-fill"></i> Partager
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating PDF Export Button */}
      <ExportPDFButton
        pays={data.pays}
        regulateur={data.regulateur}
        redFlags={[
          `Due Diligence ${data.pays}: ${data.redFlagLocal.slice(0, 80)}`,
          `Regulateur ${data.regulateur} — Zone ${data.zone}`,
          `Directive: ${data.directive}`,
        ]}
      />
    </div>
  );
}