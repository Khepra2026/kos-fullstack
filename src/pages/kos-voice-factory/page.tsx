import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSVoiceFactory } from '@/hooks/useKOSVoiceFactory';

type TabId = 'talents' | 'tonal' | 'sound' | 'pronunciation' | 'identity' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'talents', label: 'Voix Signature', icon: 'ri-mic-fill' },
  { id: 'tonal', label: 'Guide Tonal', icon: 'ri-survey-line' },
  { id: 'sound', label: 'Bibliothèque Sonore', icon: 'ri-music-line' },
  { id: 'pronunciation', label: 'Dictionnaire Prononciation', icon: 'ri-book-open-line' },
  { id: 'identity', label: 'Identité Audio', icon: 'ri-fingerprint-line' },
  { id: 'kpis', label: 'KPIs', icon: 'ri-line-chart-line' },
];

export default function KOSVoiceFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('talents');
  const factory = useKOSVoiceFactory();
  const stats = factory.getStats();

  return (
    <KOSHubLayout hubId={98} activeTab="Voice Factory" tabLabel="Voice Factory™">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                      {stats.programVersion}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-mic-fill text-xs"></i>
                      {stats.activeTalents} voix signature
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-music-line text-xs"></i>
                      {stats.soundAssets} assets sonores
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Voice Factory™ — Identité Audio KHEPRA
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Bibliothèque vocale propriétaire KHEPRA EXPERTS. Quatre voix institutionnelles signature (Narrateur, Expert, Présentateur, Intervieweur), guide tonal 6 scènes, bibliothèque sonore 10 assets, dictionnaire de prononciation métier, charte d'identité audio. Une empreinte sonore unique, immédiatement reconnaissable.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Voix', value: stats.totalTalents, icon: 'ri-user-voice-line', color: 'text-primary-500' },
                    { label: 'Scènes tonales', value: stats.tonalScenes, icon: 'ri-survey-line', color: 'text-accent-500' },
                    { label: 'Maturité', value: `${stats.maturityScore}/100`, icon: 'ri-medal-line', color: 'text-secondary-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[90px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-xl font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Governance Banner */}
        <div className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
            <div className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-git-branch-line text-accent-500"></i>
              <span><strong className="text-foreground-700">Gouvernance :</strong> {stats.governanceStatus}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'talents' && <TalentsTab factory={factory} />}
          {activeTab === 'tonal' && <TonalTab factory={factory} />}
          {activeTab === 'sound' && <SoundTab factory={factory} />}
          {activeTab === 'pronunciation' && <PronunciationTab factory={factory} />}
          {activeTab === 'identity' && <IdentityTab factory={factory} />}
          {activeTab === 'kpis' && <KPIsTab factory={factory} />}
        </div>

        {/* Cross-Links Footer */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème Audio KHEPRA — De la voix au contenu</h2>
                <p className="text-gray-400 text-sm">Voice Factory → Proprietary Voice Factory → Video Factory → YouTube Factory. La chaîne complète de production audio institutionnelle.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/kos-proprietary-voice-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 cursor-pointer whitespace-nowrap">
                  <i className="ri-sound-module-line" />Proprietary Voice Factory
                </Link>
                <Link to="/kos-video-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                  <i className="ri-film-line" />Video Factory
                </Link>
                <Link to="/kos-youtube-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                  <i className="ri-youtube-line" />YouTube Factory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </KOSHubLayout>
  );
}

// ============================================================================
// TAB 1: VOIX SIGNATURE
// ============================================================================
function TalentsTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const talents = factory.talents;
  const active = selected ? factory.getTalentById(selected) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-fingerprint-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Quatre Voix, Une Identité</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque voix KHEPRA est une <strong className="text-foreground-800">signature audio unique</strong> — un timbre, un rythme, une personnalité. Ensemble, elles forment l'identité sonore de KHEPRA EXPERTS. Chaque contenu audio utilise exclusivement ces 4 voix.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Voice Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {talents.map(talent => (
          <ScrollReveal key={talent.id}>
            <button
              onClick={() => setSelected(selected === talent.id ? null : talent.id)}
              className={`w-full text-left rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                selected === talent.id
                  ? 'border-foreground-300 bg-background-50 ring-2 ring-foreground-200'
                  : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-background-200/40">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${talent.color}20` }}>
                    <i className={`${talent.icon} text-2xl`} style={{ color: talent.color }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-foreground-950">{talent.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        talent.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {talent.status === 'active' ? 'ACTIF' : 'DÉVELOPPEMENT'}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500 capitalize">{talent.role} · {talent.gender} · {talent.languages.join(' / ')}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mt-3">{talent.description}</p>

                {/* Voice Signature */}
                <div className="mt-3 p-3 bg-background-100 rounded-lg text-xs text-foreground-600">
                  <strong className="text-foreground-800">Signature vocale :</strong> {talent.voiceSignature}
                </div>
              </div>

              {/* Metrics */}
              <div className="p-5 grid grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Clarté</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${talent.clarityScore}%` }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{talent.clarityScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Autorité</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${talent.authorityScore}%`, backgroundColor: talent.color }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{talent.authorityScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Chaleur</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${talent.warmthScore}%` }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{talent.warmthScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Polyvalence</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-secondary-400" style={{ width: `${talent.versatilityScore}%` }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{talent.versatilityScore}</p>
                </div>
              </div>

              {/* Tonal Range & Best For */}
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {talent.tonalRange.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{t}</span>
                  ))}
                </div>

                {/* Expanded Detail */}
                {selected === talent.id && (
                  <div className="mt-4 pt-4 border-t border-background-200/40 space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Contextes d'utilisation</h4>
                      <div className="flex flex-wrap gap-1">
                        {talent.bestContexts.map(c => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Directives de marque</h4>
                      <p className="text-xs text-foreground-600 leading-relaxed">{talent.brandGuidelines}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Échantillon audio</h4>
                      <div className="bg-background-100 rounded-lg p-3 text-xs text-foreground-600 italic border border-background-200/40">
                        "{talent.sampleScript}"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: GUIDE TONAL
// ============================================================================
function TonalTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const scenes = factory.tonalScenes;
  const toneStats = factory.tonalSceneStats;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-survey-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Guide Tonal KHEPRA — 6 Scènes Émotionnelles</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque contenu audio KHEPRA s'inscrit dans une <strong className="text-foreground-800">scène tonale</strong> précise — du solennel institutionnel à l'inspiration visionnaire. Le guide définit le rythme, la hauteur, l'énergie et les techniques vocales pour chaque scène.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Scènes tonales', value: toneStats.totalScenes, icon: 'ri-survey-line', color: 'text-primary-500' },
          { label: 'Voix mobilisées', value: toneStats.talents.length, icon: 'ri-user-voice-line', color: 'text-accent-500' },
          { label: 'Débit moyen', value: toneStats.avgPace, icon: 'ri-speed-line', color: 'text-secondary-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scene Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenes.map(scene => (
          <ScrollReveal key={scene.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                    <i className={`${scene.icon} text-accent-700 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{scene.sceneName}</h3>
                    <span className="text-xs text-foreground-500">{scene.bestTalent}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600">{scene.description}</p>
              </div>

              <div className="p-5 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Rythme</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{scene.pace}</p>
                  </div>
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Hauteur</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{scene.pitch}</p>
                  </div>
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Énergie</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{scene.energy}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Techniques vocales</h4>
                  <ul className="space-y-0.5">
                    {scene.techniques.map((t, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1">
                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="bg-background-100 rounded-lg p-3 text-xs text-foreground-600">
                  <strong className="text-foreground-800">Usage type :</strong> {scene.exampleUsage}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: BIBLIOTHÈQUE SONORE
// ============================================================================
function SoundTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const library = factory.soundLibrary;
  const libStats = factory.soundLibraryStats;
  const categories = [...new Set(library.map(s => s.category))];
  const filtered = categoryFilter === 'all' ? library : library.filter(s => s.category === categoryFilter);

  const catLabels: Record<string, string> = {
    intro: 'Intros', transition: 'Transitions', background: 'Fonds sonores', outro: 'Outros', stinger: 'Stingers', ambiance: 'Ambiances',
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Assets', value: libStats.totalAssets, icon: 'ri-music-line', color: 'text-primary-500' },
            { label: 'Usages totaux', value: libStats.totalUsage.toLocaleString(), icon: 'ri-bar-chart-line', color: 'text-accent-500' },
            { label: 'Catégories', value: libStats.categories.length, icon: 'ri-folder-line', color: 'text-secondary-500' },
            { label: 'Plus utilisé', value: libStats.mostUsed?.name || '-', icon: 'ri-star-line', color: 'text-foreground-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setCategoryFilter('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {categories.map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === c ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
            {catLabels[c] || c}
          </button>
        ))}
      </div>

      {/* Sound Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(asset => (
          <ScrollReveal key={asset.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    asset.category === 'intro' ? 'bg-primary-100 text-primary-700' :
                    asset.category === 'transition' || asset.category === 'stinger' ? 'bg-accent-100 text-accent-700' :
                    asset.category === 'background' ? 'bg-secondary-100 text-secondary-700' :
                    asset.category === 'outro' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <i className={`${asset.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground-950">{asset.name}</h3>
                    <span className="text-xs text-foreground-500 capitalize">{catLabels[asset.category] || asset.category} · {asset.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-3">{asset.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-foreground-400">Humeur</span>
                    <p className="font-medium text-foreground-700">{asset.mood}</p>
                  </div>
                  <div>
                    <span className="text-foreground-400">Instruments</span>
                    <p className="font-medium text-foreground-700">{asset.instruments}</p>
                  </div>
                  <div>
                    <span className="text-foreground-400">BPM</span>
                    <p className="font-medium text-foreground-700">{asset.bpm}</p>
                  </div>
                  <div>
                    <span className="text-foreground-400">Tonalité</span>
                    <p className="font-medium text-foreground-700">{asset.key}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {asset.bestWith.map(b => (
                    <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{b}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-foreground-400">
                  <span className="flex items-center gap-1"><i className="ri-repeat-line"></i>{asset.usageCount} usages</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: DICTIONNAIRE DE PRONONCIATION
// ============================================================================
function PronunciationTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const rules = factory.pronunciationRules;
  const pStats = factory.pronunciationStats;
  const displayed = searchQ ? factory.searchPronunciationRules(searchQ) : rules;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Règles', value: pStats.totalRules, icon: 'ri-book-open-line', color: 'text-primary-500' },
            { label: 'Critiques', value: pStats.criticalCount, icon: 'ri-alert-line', color: 'text-red-500' },
            { label: 'Exemples', value: pStats.totalExamples, icon: 'ri-file-list-3-line', color: 'text-accent-500' },
            { label: 'Catégories', value: pStats.categories.length, icon: 'ri-folder-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Search */}
      <div className="relative max-w-md">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
        <input
          type="text"
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Rechercher un terme, une règle..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
        />
      </div>

      {/* Rules */}
      <div className="space-y-5">
        {displayed.map(rule => (
          <ScrollReveal key={rule.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        rule.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        rule.priority === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                      }`}>
                        {rule.priority === 'critical' ? 'CRITIQUE' : rule.priority === 'high' ? 'HAUTE' : 'MOYENNE'}
                      </span>
                      <span className="text-xs text-foreground-500">{rule.category}</span>
                    </div>
                    <p className="text-sm text-foreground-800 mt-2 leading-relaxed">{rule.rule}</p>
                    <p className="text-xs text-foreground-400 mt-1">
                      <i className="ri-user-voice-line mr-0.5"></i>
                      Appliqué par : {rule.appliedBy.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Exemples</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/40">
                        <th className="text-left p-2 text-xs font-semibold text-foreground-500">Terme</th>
                        <th className="text-left p-2 text-xs font-semibold text-foreground-500">Correct</th>
                        <th className="text-left p-2 text-xs font-semibold text-foreground-500">Incorrect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-background-200/30">
                      {rule.examples.map((ex, i) => (
                        <tr key={i}>
                          <td className="p-2 text-xs font-semibold text-foreground-950">{ex.term}</td>
                          <td className="p-2 text-xs text-emerald-600 font-medium">{ex.correct}</td>
                          <td className="p-2 text-xs text-red-600">{ex.wrong}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: IDENTITÉ AUDIO
// ============================================================================
function IdentityTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const principles = factory.identityPrinciples;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-secondary-50 border border-secondary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-fingerprint-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Charte d'Identité Audio KHEPRA</h3>
              <p className="text-sm text-foreground-600 mt-1">
                L'identité sonore de KHEPRA EXPERTS est un <strong className="text-foreground-800">actif stratégique</strong>. Ces 4 principes fondamentaux gouvernent chaque production audio. Une voix KHEPRA doit être reconnue avant même que le nom ne soit prononcé.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map(p => (
          <ScrollReveal key={p.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${p.icon} text-secondary-700 text-xl`}></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">{p.principle}</h3>
                </div>
                <p className="text-xs text-foreground-600 mt-2">{p.description}</p>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <i className="ri-check-double-line"></i>À FAIRE
                  </h4>
                  <ul className="space-y-1.5">
                    {p.doList.map((d, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <i className="ri-close-circle-line"></i>À ÉVITER
                  </h4>
                  <ul className="space-y-1.5">
                    {p.dontList.map((d, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-close-line text-red-500 mt-0.5 flex-shrink-0"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: KPIs
// ============================================================================
function KPIsTab({ factory }: { factory: ReturnType<typeof useKOSVoiceFactory> }) {
  const kpis = factory.kpis;
  const stats = factory.getStats();
  const trends = factory.kpiTrends;

  return (
    <div className="space-y-6">
      {/* Maturity Score */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Maturité Identité Audio</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{stats.maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${stats.maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 sm:col-span-2">
            <h3 className="text-sm font-semibold text-foreground-950 mb-3">Performance Globale</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Productions audio', value: stats.totalProductions.toLocaleString(), sub: `+${stats.productionsThisMonth} ce mois` },
                { label: 'Qualité moyenne', value: `${stats.averageQualityScore}/100`, sub: 'Score QA audio' },
                { label: 'Voix actives', value: `${stats.activeTalents}/${stats.totalTalents}`, sub: 'En production' },
                { label: 'Assets sonores', value: stats.soundAssets, sub: `${stats.totalSoundLibraryDuration}` },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-foreground-500 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold text-foreground-950">{s.value}</p>
                  <p className="text-xs text-foreground-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    kpi.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    kpi.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                </div>
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                }`}>
                  {kpi.current}{kpi.unit}
                  {kpi.trend === 'up' && <i className="ri-arrow-up-line ml-0.5"></i>}
                  {kpi.trend === 'down' && <i className="ri-arrow-down-line ml-0.5"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line ml-0.5"></i>}
                </span>
              </div>

              {/* Mini trend chart */}
              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = (h.value / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-sm transition-all ${
                            kpi.id === 'production-speed'
                              ? 'bg-red-400'
                              : 'bg-primary-400'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Précédent: {kpi.previous}{kpi.unit}</span>
                <span>Cible: {kpi.target}{kpi.unit}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}