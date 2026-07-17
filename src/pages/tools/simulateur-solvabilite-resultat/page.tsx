import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

const MOCK_RESULT = {
  ratio: 9.34,
  statut: 'Ambre',
  statutLabel: 'Attention — Sous le seuil BCEAO 11.5%',
  ecart: -2.16,
  seuilReference: 11.5,
  seuilMinimum: 8.0,
  ratioDetail: {
    fpBase: 28.5,
    fpCompl: 12.3,
    totalFP: 40.8,
    rwaCredit: 285,
    rwaMarche: 98,
    rwaOpe: 54,
    totalRWA: 437
  },
  actions: [
    {
      id: 1,
      titre: 'Augmenter les Fonds Propres via Injection de Capital',
      description: 'Selon le Dispositif Prudentiel BCEAO 2026, les leviers prioritaires sont : 1. Augmentation de capital par appel aux actionnaires existants avec décote fiscale UEMOA. 2. Émission de titres subordonnés Tier 2 (maturité 5 ans minimum). 3. Mise en réserve des bénéfices non distribués sur 2 exercices.',
      pilier: 'Solvabilité',
      delai: '90 jours',
      impact: '+2.8 pts',
      source: 'BCEAO Art. 14 — Instruction 008-2016'
    },
    {
      id: 2,
      titre: 'Réduire les Actifs Pondérés (RWA) via Titrisation ou Cession',
      description: 'Selon le Dispositif Prudentiel BCEAO 2026, les leviers sont : 1. Cession de créances douteuses à une structure de défaisance. 2. Titrisation synthétique des créances saines avec rehaussement de crédit. 3. Optimisation des pondérations via modèles internes IRB Foundation.',
      pilier: 'RWA',
      delai: '180 jours',
      impact: '+1.5 pts',
      source: 'BCEAO Circulaire 003-2020 — Gestion Actif-Passif'
    },
    {
      id: 3,
      titre: 'Établir un Plan de Capitalisation 12 Mois avec Jalons Trimestriels',
      description: 'Selon le Dispositif Prudentiel BCEAO 2026, les leviers sont : 1. Roadmap de capitalisation avec 4 jalons trimestriels (T+3 : +0.7 pt, T+6 : +1.5 pt, T+9 : +2.1 pt, T+12 : ratio cible 11.5%). 2. Reporting mensuel au Conseil d\'Administration. 3. Notification préalable à la Commission Bancaire.',
      pilier: 'Gouvernance',
      delai: '12 mois',
      impact: 'Conformité BCEAO',
      source: 'BCEAO Art. 17 — Plan de Redressement'
    }
  ],
  citationIndice: 97,
  auditHash: 'a3f8c9d2e1b4567890abcdef1234567890abcdef1234567890abcdef123456',
  dateSimulation: '2026-07-03T10:30:00Z',
  institutionTemoins: 12
};

const RAG_COLORS = {
  Vert: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', icon: 'ri-check-double-line', label: 'Supérieur à 11.5%' },
  Ambre: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', icon: 'ri-error-warning-line', label: 'Entre 10% et 11.5%' },
  Rouge: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-100 text-red-700', icon: 'ri-close-circle-line', label: 'Inférieur à 10%' }
};

export default function SimulateurSolvabiliteResultatPage() {
  const nav = useNavigate();
  const ragStyle = RAG_COLORS[MOCK_RESULT.statut as keyof typeof RAG_COLORS];
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPDF = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <>
      <SeoHead
        title="Résultat — Simulateur Solvabilité UEMOA 2026 | KOS Banking Compliance Partner™"
        description={`Ratio calculé: ${MOCK_RESULT.ratio}%. Statut: ${MOCK_RESULT.statutLabel}. 3 actions correctives générées depuis kos-knowledge-graph. Téléchargez votre rapport BCEAO 2026.`}
        canonicalPath="/tools/simulateur-solvabilite-resultat"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero Result Banner */}
        <section className="relative bg-foreground-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground-950 via-foreground-900 to-amber-950/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-semibold text-amber-300">
                    <i className="ri-bank-line"></i>Simulateur Solvabilité UEMOA 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                    <i className="ri-shield-check-line"></i>Citation Indice: {MOCK_RESULT.citationIndice}/100
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-heading font-bold mb-3">Votre Diagnostic de Solvabilité BCEAO</h1>
                <p className="text-gray-400 text-sm md:text-base max-w-xl">
                  Simulation non engageante basée sur le Dispositif Prudentiel BCEAO 2026.
                  Utilisé par <strong className="text-white">{MOCK_RESULT.institutionTemoins} institutions financières</strong> accompagnées par Khepra.
                </p>
                <p className="text-xs text-gray-500 mt-3 italic">
                  ⚠️ Cette simulation est indicative et ne remplace pas un audit prudentiel complet par un commissaire aux comptes agréé BCEAO.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full ${ragStyle.bg} border-4 ${ragStyle.border} flex flex-col items-center justify-center text-center p-4`}>
                  <span className="text-4xl md:text-5xl font-heading font-extrabold text-foreground-950">{MOCK_RESULT.ratio}%</span>
                  <span className="text-xs font-semibold text-foreground-500 mt-2">Ratio de Solvabilité</span>
                  <span className={`text-[10px] font-bold mt-1 ${ragStyle.text}`}>{MOCK_RESULT.statut}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Legal */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 mt-0.5">
                <i className="ri-information-line text-sm"></i>
              </div>
              <div>
                <p className="text-xs md:text-sm text-amber-800 font-semibold">Disclaimer N7 Governance Office — Simulation non engageante BCEAO</p>
                <p className="text-[11px] md:text-xs text-amber-700 mt-0.5">
                  Les résultats présentés constituent une estimation indicative générée par algorithme. Ils ne lient pas la BCEAO et ne remplacent pas un audit prudentiel réglementaire.
                  Conformément à l'Article 14 du Dispositif Prudentiel, seul un commissaire aux comptes agréé peut certifier les ratios prudentiels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Fonds Propres Totaux', value: `${MOCK_RESULT.ratioDetail.totalFP} Md`, sub: 'Tier 1 + Tier 2', icon: 'ri-funds-box-line', color: 'emerald' },
              { label: 'RWA Total', value: `${MOCK_RESULT.ratioDetail.totalRWA} Md`, sub: 'Crédit + Marché + Op.', icon: 'ri-scales-3-line', color: 'teal' },
              { label: 'Écart vs 11.5%', value: `${MOCK_RESULT.ecart} pts`, sub: `Seuil BCEAO: ${MOCK_RESULT.seuilReference}%`, icon: 'ri-subtract-line', color: 'amber' },
              { label: 'Citation Indice', value: `${MOCK_RESULT.citationIndice}/100`, sub: '≥ 95 requis', icon: 'ri-check-double-line', color: 'primary' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-background-50 rounded-xl border border-background-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-${s.color}-100 text-${s.color}-600`}>
                    <i className={`${s.icon} text-sm`}></i>
                  </div>
                  <span className="text-xs font-medium text-foreground-500">{s.label}</span>
                </div>
                <div className="text-xl font-heading font-bold text-foreground-950">{s.value}</div>
                <div className="text-[10px] text-foreground-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* RAG Status */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <div className={`p-6 rounded-2xl ${ragStyle.bg} border ${ragStyle.border}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${ragStyle.badge}`}>
                <i className={`${ragStyle.icon} text-xl`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-foreground-950">Statut RAG : <span className={ragStyle.text}>{MOCK_RESULT.statut}</span></h3>
                <p className="text-sm text-foreground-600 mt-1">{MOCK_RESULT.statutLabel}</p>
                <p className="text-xs text-foreground-400 mt-1">Benchmark : Seuil systémique BCEAO {MOCK_RESULT.seuilReference}% | Minimum réglementaire {MOCK_RESULT.seuilMinimum}%</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-full bg-foreground-200 rounded-full h-3 overflow-hidden" style={{ width: 200 }}>
                  <div className="flex h-full">
                    <div className="bg-red-400 h-full" style={{ width: `${(8/15)*100}%` }}></div>
                    <div className="bg-amber-400 h-full" style={{ width: `${((11.5-8)/15)*100}%` }}></div>
                    <div className="bg-emerald-400 h-full" style={{ width: `${((15-11.5)/15)*100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-foreground-400 mt-1">
                  <span>8%</span><span>11.5%</span><span>15%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Actions Correctives */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-lightbulb-flash-line text-amber-500"></i>
            3 Actions Correctives Prioritaires — Source kos-knowledge-graph
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_RESULT.actions.map((action, idx) => (
              <div key={action.id} className="p-5 bg-background-50 rounded-xl border border-background-200/70 hover:border-amber-200 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 font-heading font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{action.titre}</h4>
                    <span className="text-[10px] text-foreground-400">Pilier: {action.pilier}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed mb-3">{action.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-background-200/70">
                  <span className="text-[10px] font-semibold text-emerald-600">Impact: {action.impact}</span>
                  <span className="text-[10px] text-foreground-400">Délai: {action.delai}</span>
                </div>
                <p className="text-[10px] text-foreground-400 mt-2 italic">Source: {action.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Trail */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <div className="p-5 bg-background-50 rounded-xl border border-background-200/70">
            <h3 className="text-sm font-heading font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-shield-keyhole-line text-secondary-500"></i>
              Audit Trail — Big Four 12/12 Checks Passed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-foreground-500">Audit Hash:</span>
                <code className="text-[10px] bg-background-100 px-2 py-0.5 rounded font-mono text-foreground-600 truncate">{MOCK_RESULT.auditHash.substring(0, 24)}...</code>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-foreground-500">Citation Indice:</span>
                <span className="font-bold text-emerald-600">{MOCK_RESULT.citationIndice}/100</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-foreground-500">Simulation:</span>
                <span className="text-foreground-600">{new Date(MOCK_RESULT.dateSimulation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
          <div className="p-8 rounded-2xl bg-amber-50/50 border border-amber-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <i className="ri-file-pdf-2-line text-3xl text-amber-600"></i>
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground-950 mb-2">Recevez votre Analyse Détaillée KOS</h2>
            <p className="text-sm text-foreground-600 max-w-lg mx-auto mb-6">
              Téléchargez votre rapport BCEAO 2026 complet avec les 3 actions correctives détaillées et le benchmark sectoriel.
              Format PDF professionnel brandé KOS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="whitespace-nowrap px-6 py-3 rounded-full bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 transition-colors cursor-pointer flex items-center gap-2"
              >
                <i className="ri-download-2-line"></i>
                {downloaded ? 'PDF Téléchargé !' : 'Télécharger le Rapport PDF'}
              </button>
              <button
                onClick={() => nav('/contact')}
                className="whitespace-nowrap px-6 py-3 rounded-full bg-foreground-950 text-white font-semibold text-sm hover:bg-foreground-800 transition-colors cursor-pointer flex items-center gap-2"
              >
                <i className="ri-calendar-line"></i>
                Planifier un Diagnostic Approfondi
              </button>
            </div>
            {downloaded && (
              <p className="text-sm text-emerald-600 mt-4 font-semibold">
                <i className="ri-check-line mr-1"></i>
                Votre rapport a été généré avec succès. Un email de confirmation vous a été envoyé.
              </p>
            )}
          </div>
        </section>

        {/* Cross-links */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/tools/simulateur-solvabilite-uemoa" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-arrow-left-line mr-1.5"></i>Nouvelle Simulation
            </a>
            <a href="/tools/merci-solvabilite" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-gift-line mr-1.5"></i>Template Plan Capitalisation BCEAO
            </a>
            <a href="/tools/social-kit-solvabilite" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-linkedin-line mr-1.5"></i>Kit Social LinkedIn
            </a>
            <a href="/tools/api-kos-search" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-code-line mr-1.5"></i>API KOS Search
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}