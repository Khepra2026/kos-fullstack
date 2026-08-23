import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useStrategicPositioning } from '@/hooks/useStrategicPositioning';

type Tab = 'uvp' | 'manifesto' | 'editorial' | 'brand' | 'competitive' | 'kpis';

export default function strategicPositioningPage() {
  const { data, loading } = useStrategicPositioning();
  const [activeTab, setActiveTab] = useState<Tab>('uvp');
  const [expandedMoat, setExpandedMoat] = useState<string | null>(null);
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; icon: string; accent: string }[] = [
    { id: 'uvp', label: 'Proposition de Valeur', icon: 'ri-focus-3-line', accent: 'border-accent-300 bg-accent-50/50' },
    { id: 'manifesto', label: 'Manifeste Institutionnel', icon: 'ri-file-list-3-line', accent: 'border-primary-300 bg-primary-50/50' },
    { id: 'editorial', label: 'Charte Éditoriale', icon: 'ri-article-line', accent: 'border-amber-300 bg-amber-50/50' },
    { id: 'brand', label: 'Architecture de Marque', icon: 'ri-brush-line', accent: 'border-secondary-300 bg-secondary-50/50' },
    { id: 'competitive', label: 'Cartographie Concurrentielle', icon: 'ri-radar-line', accent: 'border-red-300 bg-red-50/50' },
    { id: 'kpis', label: 'KPIs & Roadmap', icon: 'ri-line-chart-line', accent: 'border-emerald-300 bg-emerald-50/50' },
  ];

  const moatColors: Record<string, string> = {
    'moat-1': 'bg-accent-500',
    'moat-2': 'bg-primary-500',
    'moat-3': 'bg-secondary-500',
    'moat-4': 'bg-amber-500',
    'moat-5': 'bg-emerald-500',
  };

  const renderGauge = (score: number, max: number = 100, size: number = 48) => {
    const pct = Math.min((score / max) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = pct >= 90 ? '#22c55e' : pct >= 80 ? '#f59e0b' : '#ef4444';
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground-950">{score}</span>
        </div>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 100, color: string = 'bg-accent-500') => (
    <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min((score / max) * 100, 100)}%` }}></div>
    </div>
  );

  const uvp = data.uniqueValueProposition;
  const manifesto = data.institutionalManifesto;
  const charter = data.editorialCharter;
  const brand = data.brandArchitecture;
  const competitive = data.competitiveMapping;
  const kpis = data.positioningKPIs;
  const roadmap = data.strategicRoadmap;

  if (loading) {
    return (
      <hubLayout hubId={64}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-foreground-300"></i>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={64}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-crosshair-2-line"></i>KOS Bloc 1 — Positionnement Stratégique
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">KOS Strategic Positioning Center™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Centre de pilotage du positionnement stratégique de KHEPRA EXPERTS — Proposition de valeur unique,
                manifeste institutionnel, charte éditoriale, architecture de marque et cartographie concurrentielle.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{kpis.scorePositionnement.current}/100</div>
                <div className="text-xs text-foreground-500">Score Positionnement</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{kpis.partDeVoix.current}%</div>
                <div className="text-xs text-foreground-500">Part de Voix</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{kpis.citationsExternes.current}</div>
                <div className="text-xs text-foreground-500">Citations Externes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : PROPOSITION DE VALEUR UNIQUE ===== */}
        {activeTab === 'uvp' && (
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-2">{uvp.title}</h2>
            <p className="text-sm text-foreground-600 mb-8">{uvp.baseline}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {uvp.pillars.map((p) => (
                <div key={p.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70 hover:border-accent-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                      <i className={`${p.icon} text-accent-600 text-lg`}></i>
                    </div>
                    <div className="flex justify-center">{renderGauge(p.score)}</div>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{p.title}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
            {/* UVP Summary Bar */}
            <div className="p-5 bg-accent-50/50 rounded-lg border border-accent-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <i className="ri-flashlight-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Positionnement Unique</h3>
                  <p className="text-xs text-foreground-600">Score composite UVP : {Math.round(uvp.pillars.reduce((s, p) => s + p.score, 0) / uvp.pillars.length)}/100 — Cible ≥ 97/100</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : MANIFESTE INSTITUTIONNEL ===== */}
        {activeTab === 'manifesto' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <i className="ri-file-list-3-line text-primary-600 text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground-950">{manifesto.title}</h2>
                <span className="text-xs text-foreground-500">{manifesto.version}</span>
              </div>
            </div>
            <div className="p-6 bg-primary-50/50 rounded-lg border border-primary-200 mb-8">
              <p className="text-sm text-foreground-700 leading-relaxed">{manifesto.preamble}</p>
            </div>
            <div className="space-y-4">
              {manifesto.commitments.map((c, i) => (
                <div key={c.id} className="flex items-start gap-4 p-5 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${c.icon} text-primary-600 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{i + 1}. {c.title}</h3>
                    <p className="text-xs text-foreground-600 mt-1 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : CHARTE ÉDITORIALE ===== */}
        {activeTab === 'editorial' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <i className="ri-article-line text-amber-600 text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground-950">{charter.title}</h2>
                <span className="text-xs text-foreground-500">{charter.version}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {charter.standards.map((s) => (
                <div key={s.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-foreground-950">{s.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${s.compliance >= 95 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {s.compliance}%
                    </span>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
            <div className="p-5 bg-red-50/50 rounded-lg border border-red-200">
              <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                <i className="ri-forbid-line text-sm w-4 h-4 flex items-center justify-center"></i>Interdictions strictes
              </h3>
              <ul className="space-y-1.5">
                {charter.prohibited.map((p, i) => (
                  <li key={i} className="text-xs text-red-700 flex items-start gap-2">
                    <i className="ri-close-circle-line text-red-400 mt-0.5 w-3 h-3 flex items-center justify-center"></i>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : ARCHITECTURE DE MARQUE ===== */}
        {activeTab === 'brand' && (
          <div>
            {/* Master Brand */}
            <div className="p-6 bg-background-50 rounded-lg border border-background-200/70 mb-8 text-center">
              <div className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-xs font-bold mb-3">MARQUE MAÎTRE</div>
              <h2 className="text-2xl font-heading font-bold text-foreground-950">{brand.masterBrand.name}</h2>
              <p className="text-sm text-foreground-500 mt-1">{brand.masterBrand.descriptor}</p>
              <p className="text-xs text-accent-600 mt-1 font-semibold">{brand.masterBrand.tagline}</p>
            </div>
            {/* Sub-brands */}
            <h3 className="text-sm font-bold text-foreground-950 mb-4">Sous-Marques</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {brand.subBrands.map((sb) => (
                <div key={sb.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                      <i className="ri-building-2-line text-secondary-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">{sb.name}</h4>
                      <span className="text-[10px] text-secondary-500 font-medium">{sb.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-3">{sb.description}</p>
                  <a href={sb.url} className="text-xs text-accent-500 hover:text-accent-600 font-medium">
                    <i className="ri-arrow-right-line mr-1"></i>Accéder
                  </a>
                </div>
              ))}
            </div>
            {/* Visual Identity */}
            <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
              <h3 className="text-sm font-bold text-foreground-950 mb-3">Identité Visuelle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-foreground-500 font-medium">Palette</span>
                  <p className="text-xs text-foreground-700 mt-1">{brand.visualIdentity.palette}</p>
                </div>
                <div>
                  <span className="text-xs text-foreground-500 font-medium">Typographie</span>
                  <p className="text-xs text-foreground-700 mt-1">{brand.visualIdentity.typography}</p>
                </div>
                <div>
                  <span className="text-xs text-foreground-500 font-medium">Iconographie</span>
                  <p className="text-xs text-foreground-700 mt-1">{brand.visualIdentity.iconography}</p>
                </div>
                <div>
                  <span className="text-xs text-foreground-500 font-medium">Imagerie</span>
                  <p className="text-xs text-foreground-700 mt-1">{brand.visualIdentity.imagery}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : CARTOGRAPHIE CONCURRENTIELLE ===== */}
        {activeTab === 'competitive' && (
          <div className="space-y-8">
            {/* Positioning Matrix */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Matrice de Positionnement — Couverture Géographique × Profondeur Réglementaire</h3>
              <div className="p-6 bg-background-50 rounded-lg border border-background-200/70">
                <div className="relative h-80 mb-6" style={{ minHeight: '300px' }}>
                  {/* Y axis label */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-foreground-400 font-medium whitespace-nowrap">
                    Profondeur Expertise Réglementaire →
                  </div>
                  {/* X axis label */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-foreground-400 font-medium whitespace-nowrap">
                    Couverture Géographique Afrique →
                  </div>
                  {/* Quadrant lines */}
                  <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-background-300/60"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-background-300/60"></div>
                  {/* Quadrant labels */}
                  <div className="absolute top-2 left-2 text-[10px] text-foreground-400">Niche</div>
                  <div className="absolute top-2 right-2 text-[10px] text-foreground-400">Globaliste</div>
                  <div className="absolute bottom-2 left-2 text-[10px] text-foreground-400">Local</div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-foreground-400">Leader</div>
                  {/* Competitor dots */}
                  {competitive.positioningMatrix.competitors.map((c) => {
                    const left = `${(c.x / 100) * 90 + 5}%`;
                    const bottom = `${(c.y / 100) * 90 + 5}%`;
                    const isKhepra = c.name === 'KHEPRA EXPERTS';
                    const bgColor = c.color === 'accent' ? 'bg-accent-500' : c.color === 'foreground' ? 'bg-foreground-500' : 'bg-secondary-400';
                    return (
                      <div
                        key={c.name}
                        className={`absolute cursor-pointer group`}
                        style={{ left, bottom, transform: 'translate(-50%, 50%)' }}
                        onClick={() => setExpandedCompetitor(expandedCompetitor === c.name ? null : c.name)}
                      >
                        <div className={`w-3 h-3 rounded-full ${bgColor} ${isKhepra ? 'ring-2 ring-accent-300 ring-offset-2' : ''}`}></div>
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-foreground-950 text-background-50 text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {c.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Differentiation Table */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Avantages Concurrentiels vs Moyenne Big Four</h3>
              <div className="space-y-2">
                {competitive.differentiation.map((d, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70 flex items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <div className="text-xs text-foreground-500">{d.dimension}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-accent-600 font-bold">KHEPRA {d.khepra}</span>
                        <span className="text-[10px] text-foreground-400">vs</span>
                        <span className="text-[10px] text-foreground-400 font-medium">Big Four ~{d.bigFourAvg}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-500 rounded-full" style={{ width: `${d.khepra}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-green-600 whitespace-nowrap">{d.advantage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moat / Barrières Concurrentielles */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Douves Concurrentielles (Moat)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitive.moat.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setExpandedMoat(expandedMoat === m.id ? null : m.id)}
                    className={`p-5 bg-background-50 rounded-lg border cursor-pointer transition-colors ${
                      expandedMoat === m.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-foreground-950">{m.name}</h4>
                      <div className="flex justify-center">{renderGauge(m.strength, 100, 40)}</div>
                    </div>
                    <div className="mb-2">
                      <div className={`h-2 rounded-full ${moatColors[m.id] || 'bg-accent-500'}`} style={{ width: `${m.strength}%` }}></div>
                    </div>
                    {expandedMoat === m.id && (
                      <p className="text-xs text-foreground-600 leading-relaxed mt-3">{m.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : KPIs & ROADMAP ===== */}
        {activeTab === 'kpis' && (
          <div className="space-y-8">
            {/* KPIs Grid */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Indicateurs de Positionnement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(kpis).map(([key, kpi]) => (
                  <div key={key} className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-foreground-500 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex justify-center">{renderGauge(kpi.current, kpi.target, 44)}</div>
                    </div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-lg font-bold text-foreground-950">{kpi.current}{kpi.unit === '%' ? '%' : ''}</span>
                      <span className="text-[10px] text-foreground-400">Cible {kpi.target}{kpi.unit === '%' ? '%' : ''}</span>
                    </div>
                    {renderScoreBar(kpi.current, kpi.target)}
                    <p className="text-[10px] text-foreground-500 mt-2">{kpi.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Roadmap Stratégique</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-background-200/70"></div>
                <div className="space-y-6">
                  {roadmap.map((phase, i) => (
                    <div key={i} className="relative pl-12">
                      <div className={`absolute left-3.5 top-1.5 w-3 h-3 rounded-full border-2 ${
                        phase.status === 'completed' ? 'bg-green-500 border-green-300' :
                        phase.status === 'in_progress' ? 'bg-accent-500 border-accent-300 animate-pulse' :
                        'bg-background-200/70 border-background-300/60'
                      }`}></div>
                      <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4 className="text-sm font-bold text-foreground-950">{phase.phase}</h4>
                          <span className="text-xs text-foreground-500">{phase.period}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                            phase.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                            'bg-background-200/70 text-foreground-500'
                          }`}>
                            {phase.status === 'completed' ? 'Terminé' : phase.status === 'in_progress' ? 'En cours' : 'Planifié'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.achievements.map((a, j) => (
                            <span key={j} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200/70">
                              <i className="ri-check-line text-green-500 mr-1"></i>{a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Métriques — KOS Strategic Positioning Center™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score Positionnement</div>
              <div className="text-lg font-bold text-accent-500">{kpis.scorePositionnement.current}/100</div>
              <div className="text-xs text-foreground-400 mt-2">Cible {kpis.scorePositionnement.target}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Part de Voix</div>
              <div className="text-lg font-bold text-foreground-950">{kpis.partDeVoix.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">20 KW stratégiques</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Citations Externes</div>
              <div className="text-lg font-bold text-primary-500">{kpis.citationsExternes.current}</div>
              <div className="text-xs text-foreground-400 mt-2">Cible {kpis.citationsExternes.target}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Notoriété Assistée</div>
              <div className="text-lg font-bold text-secondary-500">{kpis.notorieteAssistee.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">Top 100 Banques UEMOA/CEMAC</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Préférence Marque</div>
              <div className="text-lg font-bold text-amber-500">{kpis.preferenceMarque.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">vs Big Four régulation</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Mentions Institutionnelles</div>
              <div className="text-lg font-bold text-emerald-500">{kpis.mentionsInstitutionnelles.current}</div>
              <div className="text-xs text-foreground-400 mt-2">Cible {kpis.mentionsInstitutionnelles.target}</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



