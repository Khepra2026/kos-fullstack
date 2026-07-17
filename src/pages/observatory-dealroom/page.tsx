import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import DealroomTable from './components/DealroomTable';

const TABS = [
  { id: 'dealroom', label: 'Dealroom VC', icon: 'ri-funds-line', desc: 'PME investment-ready Afrique Francophone' },
  { id: 'barometre', label: 'Baromètre T1', icon: 'ri-bar-chart-line', desc: 'Scores de maturité trimestriels' },
  { id: 'irritants', label: 'Cartographie Irritants', icon: 'ri-error-warning-line', desc: 'Top barrières réglementaires par pays' },
];

export default function ObservatoryDealroomPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dealroom');

  return (
    <>
      <SeoHead
        title="Observatoire PME & Startups — Dealroom VC Afrique Francophone | KHEPRA"
        description="Dealroom KHEPRA Certified : 40 PME investment-ready notées et certifiées. Filtrez par pays, secteur, score et stade de levée. Export CSV. Contactez directement les fondateurs. UEMOA + CEMAC."
        keywords="dealroom Afrique, PME investment-ready, VC Afrique Francophone, investissement UEMOA, startups Afrique"
        canonicalPath="/observatory-dealroom/"
        ogType="website"
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-28 pb-12" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3e8 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 right-20 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(196,162,53,0.12), transparent)' }} />
            <div className="absolute bottom-5 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(107,155,31,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-100 border border-accent-200">
                <i className="ri-funds-line text-lg text-accent-600" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-accent-50 text-accent-600 border border-accent-200">
                OBSERVATOIRE PME & STARTUPS
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground-950 mb-4 max-w-3xl leading-tight">
              Dealroom VC —{' '}
              <span className="text-accent-600">Data-driven dealflow</span>{' '}
              Afrique Francophone
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mb-8 leading-relaxed">
              La première base de données de PME certifiées et notées en zone UEMOA et CEMAC. 
              40 entreprises, 8 pays, 7 secteurs — filtrées, scorées, et prêtes pour l'investissement.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { value: '40+', label: 'PME référencées' },
                { value: '8', label: 'Pays UEMOA/CEMAC' },
                { value: '7', label: 'Secteurs couverts' },
                { value: '5', label: 'Scores Khepra' },
              ].map((s, i) => (
                <div key={i} className="bg-white/70 rounded-xl px-5 py-3 text-center border border-background-200">
                  <div className="text-xl font-bold text-accent-600">{s.value}</div>
                  <div className="text-xs text-foreground-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-0">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-bold cursor-pointer border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-accent-500 text-accent-700'
                      : 'border-transparent text-foreground-500 hover:text-foreground-700 hover:border-background-300'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab content */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'dealroom' && <DealroomTable />}

            {activeTab === 'barometre' && (
              <div className="bg-white rounded-2xl border border-background-200 p-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-secondary-100 mx-auto mb-4">
                  <i className="ri-bar-chart-line text-2xl text-secondary-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground-950 mb-2">Baromètre T1 — Bientôt disponible</h3>
                <p className="text-sm text-foreground-500 max-w-md mx-auto mb-6">
                  Les scores de maturité trimestriels agrégés par pays et secteur seront publiés ici.
                  Abonnez-vous pour être notifié.
                </p>
                <button
                  onClick={() => navigate('/contact/')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 text-white font-bold text-sm cursor-pointer hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  <i className="ri-mail-send-line" />
                  Être notifié
                </button>
              </div>
            )}

            {activeTab === 'irritants' && (
              <div className="bg-white rounded-2xl border border-background-200 p-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-50 mx-auto mb-4">
                  <i className="ri-error-warning-line text-2xl text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground-950 mb-2">Cartographie Irritants — Bientôt disponible</h3>
                <p className="text-sm text-foreground-500 max-w-md mx-auto mb-6">
                  Top barrières réglementaires par pays : fiscalité, charges sociales, douane, agréments.
                  Données issues du questionnaire diagnostic 25 questions.
                </p>
                <button
                  onClick={() => navigate('/diagnostic-regtech/')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 text-white font-bold text-sm cursor-pointer hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  <i className="ri-rocket-line" />
                  Passer le diagnostic
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6 bg-white/10 border border-white/20">
              <i className="ri-funds-line text-2xl text-accent-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Vous êtes investisseur ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Accédez au dealflow complet, aux pitch decks certifiés et aux rapports KHEPRA DD.
              Contactez notre équipe pour un accès investisseur premium.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate('/contact/')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #c4a235, #d4a82a)' }}
              >
                <i className="ri-mail-send-line" />
                Demander un accès investisseur
              </button>
              <button
                onClick={() => navigate('/diagnostic-regtech/')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all whitespace-nowrap"
              >
                <i className="ri-shield-check-line" />
                Faire certifier ma PME
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}