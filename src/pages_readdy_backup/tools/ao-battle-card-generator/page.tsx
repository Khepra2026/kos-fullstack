import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { ToolSocialShare } from '@/components/feature/ToolSocialShare';
import HowToSchema from '@/components/feature/HowToSchema';
import { MOCK_AO_DATA, BATTLE_CARD_STATS } from '@/mocks/aoBattleCards';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function AOBattleCardPage() {
  const { i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');
  const [selectedAO, setSelectedAO] = useState<string | null>(null);
  const [showBattleCard, setShowBattleCard] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedAO(id);
    setTimeout(() => setShowBattleCard(true), 200);
  };

  const ao = MOCK_AO_DATA.find(a => a.id === selectedAO);

  const breadcrumbItems = [
    { label: isFr ? 'Accueil' : 'Home', path: '/' },
    { label: isFr ? 'Outils' : 'Tools', path: '/tools' },
    { label: 'AO Battle Card Generator' },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage',
      '@id': `${SITE_URL}/tools/ao-battle-card-generator#webpage`,
      url: `${SITE_URL}/tools/ao-battle-card-generator`,
      name: 'AO Battle Card Generator | KHEPRA EXPERTS',
      description: isFr ? 'Générez votre Battle Card AO en 1 clic. Forces/Faiblesses vs 3 concurrents, win themes, prix recommandé. 51 AO actifs en base.' : 'Generate your AO Battle Card in 1 click. Strengths/Weaknesses vs 3 competitors, win themes, recommended price. 51 active tenders.',
      inLanguage: isFr ? 'fr-FR' : 'en-US',
    }],
  };

  const formatFCFA = (val: string) => val;

  return (
    <>
      <SeoHead
        title={isFr ? 'AO Battle Card Generator | Forces vs Concurrents en 1 Clic' : 'AO Battle Card Generator | Strengths vs Competitors in 1 Click'}
        description={isFr ? 'Générez votre Battle Card AO en 1 clic : forces/faiblesses vs 3 concurrents, win themes, prix recommandé. 51 appels d\'offres actifs, 18.155 Md FCFA.' : 'Generate your AO Battle Card in 1 click: strengths/weaknesses vs 3 competitors, win themes, recommended price. 51 active tenders, 18.155 Bn FCFA.'}
        keywords="battle card, appel d'offres, AO, AMI, stratégie commerciale, concurrence, win themes, prix recommandé, BCEAO, UEMOA"
        canonicalPath="/tools/ao-battle-card-generator"
        structuredData={schemaJson}
      />

      <Navigation />

      <HowToSchema
        name="AO Battle Card Generator KHEPRA™"
        description={isFr ? 'Sélectionnez un appel d\'offres actif, générez votre Battle Card avec Forces/Faiblesses vs 3 concurrents, Win Themes et Prix Recommandé.' : 'Select an active tender, generate your Battle Card with Strengths/Weaknesses vs 3 competitors, Win Themes and Recommended Price.'}
        totalTime="PT2M"
        steps={[
          { name: isFr ? 'Sélectionnez un AO' : 'Select a tender', text: isFr ? 'Choisissez parmi les appels d\'offres actifs qualifiés par KOS Tender Intelligence.' : 'Choose from active tenders qualified by KOS Tender Intelligence.' },
          { name: isFr ? 'Analysez la Battle Card' : 'Analyze the Battle Card', text: isFr ? 'Forces Khepra, faiblesses, analyse des 3 concurrents, win themes et prix recommandé.' : 'Khepra strengths, weaknesses, 3-competitor analysis, win themes and recommended price.' },
          { name: isFr ? 'Téléchargez ou partagez' : 'Download or share', text: isFr ? 'Exportez votre Battle Card en PDF ou partagez-la avec votre équipe.' : 'Export your Battle Card as PDF or share it with your team.' },
        ]}
      />

      <div className="bg-background-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <Link to="/" className="block">
            <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png" alt="KHEPRA EXPERTS" className="h-10" />
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-b from-background-100 to-background-50">
        <section className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-6xl mx-auto mt-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                  <i className="ri-sword-line"></i>
                  <span>{BATTLE_CARD_STATS.totalAO} AO Actifs · {BATTLE_CARD_STATS.volumeTotal}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
                  {isFr ? 'AO Battle Card Generator' : 'AO Battle Card Generator'}
                </h1>
                <p className="text-lg text-foreground-600 max-w-3xl mx-auto">
                  {isFr
                    ? 'Sélectionnez un appel d\'offres parmi les 51 AO actifs qualifiés par KOS Tender Intelligence. Obtenez votre Battle Card : Forces, Faiblesses, 3 Concurrents, Win Themes et Prix Recommandé.'
                    : 'Select a tender from the 51 active opportunities qualified by KOS Tender Intelligence. Get your Battle Card: Strengths, Weaknesses, 3 Competitors, Win Themes and Recommended Price.'}
                </p>
              </div>

              {/* AO Selection Grid */}
              {!showBattleCard && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 animate-fade-in">
                  {MOCK_AO_DATA.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${selectedAO === item.id ? 'border-primary-500 bg-primary-50 shadow-lg' : 'border-secondary-200 bg-background-50 hover:border-primary-300'}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Critique' ? 'bg-red-100 text-red-700' : 'bg-accent-100 text-accent-700'}`}>
                          {item.status}
                        </span>
                        <span className="text-xs font-bold text-foreground-500">{item.ref}</span>
                      </div>
                      <h3 className="font-bold text-foreground-900 text-sm mb-2 line-clamp-2">{item.titre}</h3>
                      <div className="flex items-center gap-3 text-xs text-foreground-500">
                        <span className="flex items-center gap-1"><i className="ri-building-line"></i>{item.organisme}</span>
                        <span className="flex items-center gap-1"><i className="ri-money-dollar-circle-line"></i>{item.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-secondary-100">
                        <div className="flex-1 h-2 bg-secondary-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.scoreKhepra}%` }} />
                        </div>
                        <span className="text-xs font-bold text-primary-600">{item.scoreKhepra}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Battle Card Display */}
              {showBattleCard && ao && (
                <div className="space-y-6 animate-fade-in">
                  {/* Header */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${ao.status === 'Critique' ? 'bg-red-100 text-red-700' : 'bg-accent-100 text-accent-700'}`}>
                          {ao.status}
                        </span>
                        <h2 className="text-2xl font-bold text-foreground-950">{ao.titre}</h2>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-foreground-600">
                          <span className="flex items-center gap-1"><i className="ri-building-line"></i>{ao.organisme}</span>
                          <span className="flex items-center gap-1"><i className="ri-money-dollar-circle-line"></i>{formatFCFA(ao.budget)}</span>
                          <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{ao.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-600">{ao.scoreKhepra}%</span>
                        </div>
                        <div className="text-xs text-foreground-500">{isFr ? 'Score Khepra' : 'Khepra Score'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-emerald-200">
                      <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <i className="ri-check-double-line text-xl"></i>
                        {isFr ? 'Forces KHEPRA' : 'KHEPRA Strengths'}
                      </h3>
                      <ul className="space-y-3">
                        {ao.forces.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                            <i className="ri-arrow-right-s-line flex-shrink-0 mt-0.5"></i>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i className="ri-close-circle-line text-xl"></i>
                        {isFr ? 'Faiblesses' : 'Weaknesses'}
                      </h3>
                      <ul className="space-y-3">
                        {ao.faiblesses.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                            <i className="ri-arrow-right-s-line flex-shrink-0 mt-0.5"></i>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Competitors */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                    <h3 className="text-xl font-bold text-foreground-950 mb-6">
                      {isFr ? 'Analyse Concurrentielle' : 'Competitive Analysis'}
                    </h3>
                    <div className="space-y-4">
                      {ao.concurrents.map((c, i) => (
                        <div key={i} className="p-5 rounded-xl bg-background-100 border border-secondary-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-foreground-900">{c.nom}</h4>
                            <span className="text-sm font-bold text-foreground-600">{formatFCFA(c.prix)}</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-emerald-700 font-semibold text-xs">{isFr ? 'Forces :' : 'Strengths:'}</span>
                              <p className="text-foreground-600 text-xs">{c.forces}</p>
                            </div>
                            <div>
                              <span className="text-red-700 font-semibold text-xs">{isFr ? 'Faiblesses :' : 'Weaknesses:'}</span>
                              <p className="text-foreground-600 text-xs">{c.faiblesses}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Win Themes */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-50 rounded-2xl shadow-xl p-6 md:p-10 border-2 border-primary-200">
                    <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                      <i className="ri-trophy-line"></i>
                      {isFr ? 'Win Themes — Arguments de Vente' : 'Win Themes — Selling Points'}
                    </h3>
                    <ul className="space-y-3">
                      {ao.winThemes.map((wt, i) => (
                        <li key={i} className="flex items-start gap-3 text-primary-800">
                          <div className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary-700">{i + 1}</span>
                          </div>
                          <span className="text-sm">{wt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Recommendation */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                    <h3 className="text-xl font-bold text-foreground-950 mb-4">
                      {isFr ? 'Prix Recommandé' : 'Recommended Price'}
                    </h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="px-8 py-5 rounded-2xl bg-accent-50 border-2 border-accent-200">
                        <div className="text-xs text-accent-600 font-medium">{isFr ? 'Prix recommandé' : 'Recommended price'}</div>
                        <div className="text-3xl font-bold text-accent-700">{formatFCFA(ao.prixRecommande)}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground-600">{ao.prixJustification}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Share */}
                  <ToolSocialShare
                    toolNameFr="AO Battle Card Generator"
                    toolNameEn="AO Battle Card Generator"
                    score={ao.scoreKhepra}
                    levelFr={ao.scoreKhepra >= 90 ? 'Très Compétitif' : 'Compétitif'}
                    levelEn={ao.scoreKhepra >= 90 ? 'Very Competitive' : 'Competitive'}
                    url={`${SITE_URL}/tools/ao-battle-card-generator`}
                    hashtags={['BattleCard', 'AppelOffres', 'KhepraExperts', 'Strategy']}
                  />

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-foreground-900 to-foreground-950 rounded-2xl p-8 md:p-10 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">
                      {isFr ? 'Prêt à remporter cet AO ?' : 'Ready to win this tender?'}
                    </h3>
                    <p className="text-foreground-300 mb-6 max-w-2xl mx-auto">
                      {isFr
                        ? 'KHEPRA EXPERTS prépare votre réponse complète : proposition technique, offre financière, dossier administratif. Win rate 68% sur les AO accompagnés.'
                        : 'KHEPRA EXPERTS prepares your complete response: technical proposal, financial offer, administrative file. 68% win rate on supported tenders.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer">
                        <i className="ri-rocket-line"></i>
                        <span>{isFr ? 'Préparer ma réponse' : 'Prepare my response'}</span>
                      </Link>
                      <button onClick={() => { setShowBattleCard(false); setSelectedAO(null); }} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer">
                        <i className="ri-arrow-left-line"></i>
                        <span>{isFr ? 'Voir d\'autres AO' : 'View other tenders'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Back button when battle card open */}
              {showBattleCard && (
                <div className="mt-6 text-center">
                  <button onClick={() => { setShowBattleCard(false); setSelectedAO(null); }} className="text-sm text-foreground-400 hover:text-primary-600 underline cursor-pointer">
                    <i className="ri-arrow-left-line"></i> {isFr ? 'Retour à la liste des AO' : 'Back to tender list'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



