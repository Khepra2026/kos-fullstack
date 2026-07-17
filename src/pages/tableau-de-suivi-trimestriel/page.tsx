import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const QUARTERS = ['T1 2026', 'T2 2026', 'T3 2026', 'T4 2026'];

const AUTHORITY_KPIS = [
  { name: 'Domain Authority (DA)', value: 38, target: 50, unit: '/100', trend: 'up', change: '+3' },
  { name: 'Backlinks qualifiés', value: 42, target: 80, unit: '', trend: 'up', change: '+8' },
  { name: 'Domaines référents', value: 28, target: 50, unit: '', trend: 'up', change: '+5' },
  { name: 'Pages indexées Google', value: 847, target: 1200, unit: '', trend: 'up', change: '+124' },
];

const SEO_VISIBILITY = [
  { name: 'Mots-clés Top 3', value: 156, target: 300, unit: '', trend: 'up', change: '+22' },
  { name: 'Mots-clés Top 10', value: 423, target: 800, unit: '', trend: 'up', change: '+58' },
  { name: 'Trafic organique/mois', value: '12 450', target: '25 000', unit: '', trend: 'up', change: '+18%' },
  { name: 'CTR moyen', value: '4.2', target: '6.0', unit: '%', trend: 'stable', change: '+0.3' },
  { name: 'Impressions/mois', value: '295 000', target: '500 000', unit: '', trend: 'up', change: '+12%' },
  { name: 'Position moyenne', value: '8.4', target: '5.0', unit: '', trend: 'down', change: '-0.8' },
];

const AI_PERFORMANCE = [
  { name: 'Articles générés/mois', value: 34, target: 50, unit: '', trend: 'up', change: '+6' },
  { name: 'Score conformité IA', value: 87, target: 95, unit: '/100', trend: 'up', change: '+4' },
  { name: 'Délai moyen publication', value: '3.2', target: '1.5', unit: 'jours', trend: 'down', change: '-0.5' },
  { name: 'Taux détection fraude', value: '94.7', target: '98.0', unit: '%', trend: 'up', change: '+2.1' },
  { name: 'Précision scoring ESG', value: '91.2', target: '96.0', unit: '%', trend: 'up', change: '+1.8' },
  { name: 'Temps réponse cockpit', value: '420', target: '200', unit: 'ms', trend: 'down', change: '-80' },
];

const OBSERVATORY_PUBLICATIONS = [
  { secteur: 'Banques', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'FinTechs', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'PME & ETI', t1: '—', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Énergie', t1: '—', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Agriculture', t1: '—', t2: 'En cours', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'ESG', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Microfinance', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
];

const BACKLINK_PROGRESS = [
  { pillar: 'Domaines .edu', t1: 4, t2: 9, t3Target: 12, t4Target: 15 },
  { pillar: 'Médias africains', t1: 8, t2: 14, t3Target: 20, t4Target: 25 },
  { pillar: 'Think Tanks .org', t1: 2, t2: 5, t3Target: 8, t4Target: 10 },
  { pillar: 'Institutions', t1: 1, t2: 2, t3Target: 5, t4Target: 8 },
  { pillar: 'Partenaires tech', t1: 6, t2: 8, t3Target: 10, t4Target: 12 },
  { pillar: 'Associations pro', t1: 1, t2: 3, t3Target: 6, t4Target: 10 },
];

function MiniProgressBar({ value, target, color = '#2d7518' }: { value: number; target: number; color?: string }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="w-full bg-background-200 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
    </div>
  );
}

function TrendBadge({ trend, change }: { trend: string; change: string }) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const color = isUp ? 'text-emerald-600 bg-emerald-50' : isDown ? 'text-red-600 bg-red-50' : 'text-foreground-600 bg-foreground-100';
  const icon = isUp ? 'ri-arrow-up-line' : isDown ? 'ri-arrow-down-line' : 'ri-arrow-right-line';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
      <i className={icon} />
      {change}
    </span>
  );
}

export default function TableauSuiviTrimestrielPage() {
  const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  const selected = {
    authority: { ...AUTHORITY_KPIS[0], value: AUTHORITY_KPIS[0].value + selectedQuarter * 4, target: AUTHORITY_KPIS[0].target },
  };

  return (
    <>
      <SeoHead
        title="Tableau de Suivi Trimestriel — KPI Autorité Digitale, SEO, IA — KOS Big Four"
        description="Dashboard trimestriel KOS : KPI autorité digitale (DA 38/50), visibilité SEO (423 mots-clés Top 10), performance IA (87/100 conformité), publications observatoires (7 secteurs), backlinks (6 piliers). Méthodologie Big Four. Suivi T1-T4 2026."
        keywords="tableau de suivi trimestriel KOS, KPI autorité digitale, SEO KPI dashboard, performance IA audit, backlinks tracking, observatoires sectoriels suivi, Big Four KPIs"
        canonicalPath="/tableau-de-suivi-trimestriel/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3ec 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="KOS Big Four — Pilotage Stratégique" variant="centered-pillars" icon="ri-dashboard-line" accentColor="primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 text-center leading-tight">
              Tableau de Suivi{' '}
              <span style={{ color: '#2d7518' }}>Trimestriel</span>
            </h1>
            <p className="text-xl text-foreground-600 mb-8 max-w-3xl mx-auto text-center leading-relaxed">
              KPI consolidés — Autorité Digitale, Visibilité SEO, Performance IA, Publications Observatoires, Backlinks. <strong className="text-foreground-900">Méthodologie Big Four.</strong>
            </p>

            {/* Quarter Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {QUARTERS.map((q, i) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedQuarter === i
                      ? 'text-white'
                      : 'bg-background-50 text-foreground-600 border border-background-200 hover:border-foreground-300'
                  }`}
                  style={selectedQuarter === i ? { background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' } : {}}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* KPI Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* 1. Autorité Digitale */}
          <section className="mb-10">
            <div className="mb-5">
              <BigFourSubtitleBar label="Autorité Digitale" variant="left-accent" icon="ri-shield-check-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {AUTHORITY_KPIS.map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">{kpi.name}</span>
                    <TrendBadge trend={kpi.trend} change={kpi.change} />
                  </div>
                  <div className="text-2xl font-bold text-foreground-950 mb-1">{kpi.value}{kpi.unit}</div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                    <span>Cible : {kpi.target}{kpi.unit}</span>
                    <span>{Math.round((kpi.value / (typeof kpi.target === 'number' ? kpi.target : parseInt(kpi.target.toString().replace(/\s/g, ''))) * 100))}%</span>
                  </div>
                  <MiniProgressBar value={typeof kpi.value === 'number' ? kpi.value : parseInt(kpi.value.toString().replace(/\s/g, ''))} target={typeof kpi.target === 'number' ? kpi.target : parseInt(kpi.target.toString().replace(/\s/g, ''))} color="#2d7518" />
                </div>
              ))}
            </div>
          </section>

          {/* 2. Visibilité SEO/GEO */}
          <section className="mb-10">
            <div className="mb-5">
              <BigFourSubtitleBar label="Visibilité SEO/GEO" variant="left-accent" icon="ri-search-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {SEO_VISIBILITY.map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-background-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">{kpi.name}</span>
                    <TrendBadge trend={kpi.trend} change={kpi.change} />
                  </div>
                  <div className="text-xl font-bold text-foreground-950 mb-1">{kpi.value}{kpi.unit}</div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                    <span>Cible : {kpi.target}{kpi.unit}</span>
                  </div>
                  <MiniProgressBar
                    value={parseInt(kpi.value.toString().replace(/[\s,%]/g, ''))}
                    target={parseInt(kpi.target.toString().replace(/[\s,%]/g, ''))}
                    color="#d4a82a"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 3. Performance IA */}
          <section className="mb-10">
            <div className="mb-5">
              <BigFourSubtitleBar label="Performance IA & Automatisation" variant="left-accent" icon="ri-cpu-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {AI_PERFORMANCE.map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-background-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">{kpi.name}</span>
                    <TrendBadge trend={kpi.trend} change={kpi.change} />
                  </div>
                  <div className="text-xl font-bold text-foreground-950 mb-1">{kpi.value}{kpi.unit}</div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                    <span>Cible : {kpi.target}{kpi.unit}</span>
                  </div>
                  <MiniProgressBar
                    value={parseFloat(kpi.value.toString().replace(/[\s,]/g, ''))}
                    target={parseFloat(kpi.target.toString().replace(/[\s,]/g, ''))}
                    color="#5ba832"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 4. Publications Observatoires */}
          <section className="mb-10">
            <div className="mb-5">
              <BigFourSubtitleBar label="Publications — Observatoires Sectoriels" variant="left-accent" icon="ri-book-open-line" accentColor="primary" />
            </div>
            <div className="bg-white rounded-xl border border-background-200 overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left py-3 px-4 text-xs font-bold text-foreground-500 uppercase tracking-wide">Secteur</th>
                    <th className="text-center py-3 px-3 text-xs font-bold text-foreground-500 uppercase tracking-wide">T1</th>
                    <th className="text-center py-3 px-3 text-xs font-bold text-foreground-500 uppercase tracking-wide">T2</th>
                    <th className="text-center py-3 px-3 text-xs font-bold text-foreground-500 uppercase tracking-wide">T3</th>
                    <th className="text-center py-3 px-3 text-xs font-bold text-foreground-500 uppercase tracking-wide">T4</th>
                  </tr>
                </thead>
                <tbody>
                  {OBSERVATORY_PUBLICATIONS.map((row, i) => (
                    <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                      <td className="py-3 px-4 font-bold text-foreground-900 text-xs">{row.secteur}</td>
                      <td className="text-center py-3 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.t1 === '✓' ? 'bg-emerald-100 text-emerald-700' : row.t1 === '—' ? 'bg-foreground-100 text-foreground-400' : 'bg-amber-100 text-amber-700'}`}>{row.t1}</span>
                      </td>
                      <td className="text-center py-3 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.t2 === '✓' ? 'bg-emerald-100 text-emerald-700' : row.t2 === '—' ? 'bg-foreground-100 text-foreground-400' : 'bg-amber-100 text-amber-700'}`}>{row.t2}</span>
                      </td>
                      <td className="text-center py-3 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.t3 === '✓' ? 'bg-emerald-100 text-emerald-700' : 'bg-foreground-100 text-foreground-400'}`}>{row.t3}</span>
                      </td>
                      <td className="text-center py-3 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.t4 === '✓' ? 'bg-emerald-100 text-emerald-700' : 'bg-foreground-100 text-foreground-400'}`}>{row.t4}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Backlinks Progress */}
          <section className="mb-10">
            <div className="mb-5">
              <BigFourSubtitleBar label="Progression Backlinks — 6 Piliers" variant="left-accent" icon="ri-link-m" accentColor="accent" />
            </div>
            <div className="space-y-3">
              {BACKLINK_PROGRESS.map((p, i) => {
                const t2Progress = p.t2;
                const t4Target = p.t4Target;
                const pct = Math.round((t2Progress / t4Target) * 100);
                return (
                  <div key={i} className="bg-white rounded-xl border border-background-200 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-foreground-950 flex-1">{p.pillar}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-foreground-500">T1: <strong>{p.t1}</strong></span>
                        <span className="font-bold" style={{ color: '#2d7518' }}>T2: <strong>{p.t2}</strong></span>
                        <span className="text-foreground-400">→ T3: {p.t3Target}</span>
                        <span className="text-foreground-400">→ T4: {p.t4Target}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: pct >= 50 ? '#2d7518' : '#d4a82a' }}>{pct}%</span>
                    </div>
                    <MiniProgressBar value={t2Progress} target={t4Target} color={pct >= 50 ? '#2d7518' : '#d4a82a'} />
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-dashboard-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Pilotez votre transformation digitale avec KOS</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Diagnostic gratuit, devis confidentiel, accompagnement Big Four. Contactez-nous pour un rendez-vous stratégique.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                Demander un diagnostic gratuit
              </button>
              <button onClick={() => navigate('/partenariats-academiques/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all">
                <i className="ri-team-line" />
                Partenariats & Backlinks
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}