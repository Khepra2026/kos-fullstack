import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSProprietaryVoiceFactory } from '@/hooks/useKOSProprietaryVoiceFactory';
import type { PronunciationDictionary, ScriptTemplate, VoiceEngineOption, AudioQAResult } from '@/mocks/proprietaryVoiceFactory';

type TabId = 'identity' | 'scripts' | 'engines' | 'dictionaries' | 'qa' | 'knowledge' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'identity', label: 'KHEPRA Voice™', icon: 'ri-mic-fill' },
  { id: 'scripts', label: 'Script Engine', icon: 'ri-file-text-line' },
  { id: 'engines', label: 'Voice Engine', icon: 'ri-sound-module-line' },
  { id: 'dictionaries', label: 'Dictionnaires', icon: 'ri-book-open-line' },
  { id: 'qa', label: 'Audio QA', icon: 'ri-shield-check-line' },
  { id: 'knowledge', label: 'Knowledge Base', icon: 'ri-lightbulb-flash-line' },
  { id: 'kpis', label: 'KPIs', icon: 'ri-line-chart-line' },
];

export default function proprietaryVoiceFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('identity');
  const factory = useKOSProprietaryVoiceFactory();
  const stats = factory.getStats();

  return (
    <hubLayout hubId={90} activeTab="Voice Factory" tabLabel="Proprietary Voice Factory">
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
                      {stats.productionVoices} voix production
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-bank-line text-xs"></i>
                      {stats.totalMinutesProduced.toLocaleString()} min produites
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KHEPRA Voice™ — Proprietary Voice Factory
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Usine vocale institutionnelle KHEPRA EXPERTS. Moteurs TTS open-source et commerciaux, dictionnaires de prononciation métier (BCEAO/COBAC/OHADA), normalisation de scripts Big Four, contrôle qualité audio, knowledge base vocale. Indépendance progressive des API externes.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Voix', value: stats.totalVoiceProfiles, icon: 'ri-user-voice-line', color: 'text-primary-500' },
                    { label: 'Dictionnaires', value: stats.totalDictionaries, icon: 'ri-book-open-line', color: 'text-accent-500' },
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
          {activeTab === 'identity' && <IdentityTab factory={factory} />}
          {activeTab === 'scripts' && <ScriptsTab factory={factory} />}
          {activeTab === 'engines' && <EnginesTab factory={factory} />}
          {activeTab === 'dictionaries' && <DictionariesTab factory={factory} />}
          {activeTab === 'qa' && <QATab factory={factory} />}
          {activeTab === 'knowledge' && <KnowledgeTab factory={factory} />}
          {activeTab === 'kpis' && <KPIsTab factory={factory} />}
        </div>

        {/* Cross-Links Footer */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Pipeline KOS Média — De la voix au contenu final</h2>
                <p className="text-gray-400 text-sm">Voice Factory → Big Four Factory → Publishing Pack → YouTube. L'écosystème complet de production de contenu institutionnel.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/kos-voice-ai-studio" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 cursor-pointer whitespace-nowrap">
                  <i className="ri-mic-line" />Voice AI Studio (ElevenLabs)
                </Link>
                <Link to="/kos-youtube-download" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                  <i className="ri-git-branch-line" />Big Four Factory
                </Link>
                <Link to="/kos-self-evolution" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                  <i className="ri-line-chart-line" />Self-Evolution
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: KHEPRA VOICE™ — IDENTITY
// ============================================================================
function IdentityTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const profiles = factory.allProfiles;

  return (
    <div className="space-y-8">
      {/* Philosophy Banner */}
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-mic-fill text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Principe de Réalisme Technique</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">Niveau 1</strong> — Réutilisation de solutions open source exécutées localement · <strong className="text-foreground-800">Niveau 2</strong> — Personnalisation : adaptation voix institutionnelle, dictionnaires métiers · <strong className="text-foreground-800">Niveau 3</strong> — R&D : expérimentation, optimisation, évaluation comparative
              </p>
              <p className="text-xs text-red-600 mt-1 font-medium">
                <i className="ri-error-warning-line mr-1"></i>Ne jamais prétendre qu'une nouvelle technologie vocale peut être créée ex nihilo sans données, entraînement, infrastructure et validation.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Voice Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {profiles.map(profile => (
          <ScrollReveal key={profile.id}>
            <div className={`bg-background-50 border rounded-2xl overflow-hidden ${
              profile.status === 'production' ? 'border-accent-200/60' :
              profile.status === 'beta' ? 'border-secondary-200/60' :
              'border-background-200/70'
            }`}>
              {/* Header */}
              <div className="p-6 border-b border-background-200/40">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${profile.color}20` }}>
                    <i className={`${profile.icon} text-2xl`} style={{ color: profile.color }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-foreground-950">{profile.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        profile.status === 'production' ? 'bg-emerald-100 text-emerald-700' :
                        profile.status === 'beta' ? 'bg-amber-100 text-amber-700' :
                        'bg-background-100 text-foreground-500'
                      }`}>
                        {profile.status === 'production' ? 'PRODUCTION' : profile.status === 'beta' ? 'BETA' : 'R&D'}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500 mb-2">{profile.accent} · {profile.languages.join(' / ')}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mt-3">{profile.description}</p>
                <div className="mt-4 p-3 bg-background-100 rounded-lg text-xs text-foreground-600 italic border border-background-200/40">
                  "{profile.sampleText}"
                </div>
              </div>

              {/* Metrics */}
              <div className="p-5 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Clarté</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${profile.clarityScore}%` }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{profile.clarityScore}/100</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Autorité</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${profile.authorityScore}%`, backgroundColor: profile.color }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{profile.authorityScore}/100</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground-400 mb-1">Chaleur</p>
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${profile.warmthScore}%` }}></div>
                  </div>
                  <p className="text-xs font-bold text-foreground-700 mt-1">{profile.warmthScore}/100</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {profile.bestFor.slice(0, 3).map(b => (
                    <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{b}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-foreground-500">
                  <span className="flex items-center gap-1">
                    <i className={profile.source === 'open_source' ? 'ri-cpu-line' : profile.source === 'hybrid' ? 'ri-git-branch-line' : 'ri-cloud-line'}></i>
                    {profile.engineModel.substring(0, 60)}...
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-book-open-line"></i>
                    {profile.dictionaries.length} dictionnaires
                  </span>
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
// TAB 2: SCRIPT ENGINE
// ============================================================================
function ScriptsTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const templates = factory.scriptTemplates;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-file-text-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">KOS Script Engine™ — Normalisation Automatique</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Transforme automatiquement un article en script vidéo, script podcast, script voix off. Segmentation intelligente, adaptation du ton, calcul de durée. <strong>Article → Script Vidéo → Script Podcast → Script Voix Off → Audio Final</strong>
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Templates', value: templates.length, icon: 'ri-stack-line', color: 'text-primary-500' },
          { label: 'Sections standard', value: templates.reduce((s, t) => s + t.sections.length, 0), icon: 'ri-layout-line', color: 'text-accent-500' },
          { label: 'Débit moyen', value: `${Math.round(templates.reduce((s, t) => s + t.wordsPerMinute, 0) / templates.length)} mots/min`, icon: 'ri-speed-line', color: 'text-secondary-500' },
          { label: 'Formats', value: [...new Set(templates.map(t => t.type))].length, icon: 'ri-film-line', color: 'text-foreground-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map(template => (
          <ScrollReveal key={template.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                    <i className={`${template.icon} text-accent-700 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{template.name}</h3>
                    <span className="text-xs text-foreground-500 capitalize">{template.type} · ~{template.targetDuration}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600">{template.description}</p>
              </div>

              {/* Sections */}
              <div className="p-5 space-y-3">
                {template.sections.map((section, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-foreground-500">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-semibold text-foreground-800">{section.name}</h4>
                        <span className="text-xs text-foreground-400">{section.durationPct}%</span>
                      </div>
                      <p className="text-xs text-foreground-500">{section.description}</p>
                      <p className="text-xs text-accent-600 mt-1 italic">
                        <i className="ri-mic-line mr-0.5"></i>{section.voiceGuidance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tone Guidelines */}
              <div className="px-5 pb-5">
                <div className="bg-background-100 rounded-lg p-3 text-xs text-foreground-600">
                  <strong className="text-foreground-800">Directives tonales :</strong> {template.toneGuidelines}
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
// TAB 3: VOICE ENGINE
// ============================================================================
function EnginesTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const engines = factory.engineOptions;
  const comparison = factory.engineCostComparison;

  return (
    <div className="space-y-8">
      {/* Strategy Banner */}
      <ScrollReveal>
        <div className="bg-secondary-50 border border-secondary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-sound-module-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Stratégie Moteur Vocal — Indépendance Progressive</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">Aujourd'hui :</strong> ElevenLabs (production) + Coqui TTS (évaluation) + Piper (tests) · <strong className="text-foreground-800">Cible Q3 2026 :</strong> KOS Hybrid Voice Engine (Coqui fine-tuned KHEPRA + ElevenLabs fallback) · <strong className="text-foreground-800">Objectif :</strong> réduction coût de 67%, indépendance progressive
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Cost Comparison Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
          <p className="text-xs text-foreground-500 uppercase tracking-wider mb-1">Moteur le moins cher</p>
          <p className="text-lg font-bold text-foreground-950">{comparison.cheapest.name}</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{comparison.cheapest.costPerMinuteFCFA} <span className="text-sm font-normal text-foreground-400">FCFA/min</span></p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
          <p className="text-xs text-foreground-500 uppercase tracking-wider mb-1">Meilleure qualité</p>
          <p className="text-lg font-bold text-foreground-950">{comparison.bestQuality.name}</p>
          <p className="text-2xl font-bold text-accent-600 mt-2">{comparison.bestQuality.qualityScore}<span className="text-sm font-normal text-foreground-400">/100</span></p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
          <p className="text-xs text-foreground-500 uppercase tracking-wider mb-1">Économie cible</p>
          <p className="text-lg font-bold text-foreground-950">Hybrid Engine</p>
          <p className="text-2xl font-bold text-primary-600 mt-2">-67%<span className="text-sm font-normal text-foreground-400"> vs ElevenLabs</span></p>
        </div>
      </div>

      {/* Engine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {engines.map(engine => (
          <ScrollReveal key={engine.id}>
            <div className={`bg-background-50 border rounded-xl overflow-hidden h-full ${
              engine.status === 'active' ? 'border-emerald-200/60' :
              engine.status === 'evaluating' ? 'border-amber-200/60' :
              'border-background-200/70'
            }`}>
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      engine.type === 'open_source' ? 'bg-emerald-100 text-emerald-700' :
                      engine.type === 'hybrid' ? 'bg-accent-100 text-accent-700' :
                      'bg-secondary-100 text-secondary-700'
                    }`}>
                      <i className={`${engine.icon} text-lg`}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-foreground-950">{engine.name}</h3>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                          engine.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          engine.status === 'evaluating' ? 'bg-amber-100 text-amber-700' :
                          'bg-background-100 text-foreground-500'
                        }`}>
                          {engine.status === 'active' ? 'ACTIF' : engine.status === 'evaluating' ? 'ÉVALUATION' : 'DÉPRÉCIÉ'}
                        </span>
                      </div>
                      <span className="text-xs text-foreground-500 capitalize">{engine.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <p className="text-xs text-foreground-400">Coût/min</p>
                    <p className="text-sm font-bold text-foreground-950">{engine.costPerMinuteFCFA} FCFA</p>
                  </div>
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <p className="text-xs text-foreground-400">Latence</p>
                    <p className="text-sm font-bold text-foreground-950">{engine.latencyEstimateSec}s</p>
                  </div>
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <p className="text-xs text-foreground-400">Qualité</p>
                    <p className="text-sm font-bold text-foreground-950">{engine.qualityScore}/100</p>
                  </div>
                </div>

                <p className="text-xs text-foreground-600">{engine.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Avantages</h4>
                    <ul className="space-y-0.5">
                      {engine.pros.slice(0, 3).map((p, i) => (
                        <li key={i} className="text-xs text-foreground-600 flex items-start gap-1">
                          <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Limitations</h4>
                    <ul className="space-y-0.5">
                      {engine.cons.slice(0, 3).map((c, i) => (
                        <li key={i} className="text-xs text-foreground-600 flex items-start gap-1">
                          <i className="ri-close-line text-red-500 mt-0.5 flex-shrink-0"></i>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 flex items-center gap-4 text-xs text-foreground-500">
                <span className="flex items-center gap-1"><i className="ri-computer-line"></i>{engine.requiresGPU ? 'GPU requise' : 'CPU'}</span>
                <span className="flex items-center gap-1"><i className="ri-server-line"></i>{engine.canRunLocally ? 'Local possible' : 'Cloud only'}</span>
                <span className="flex items-center gap-1"><i className="ri-global-line"></i>{engine.languages.length} langues</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: PRONUNCIATION DICTIONARIES
// ============================================================================
function DictionariesTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const [selectedDict, setSelectedDict] = useState<string | null>(null);
  const dictionaries = factory.pronunciationDictionaries;
  const dictStats = factory.totalDictionaryStats;

  const searchResults = searchQ ? factory.searchDictionary(searchQ) : null;
  const activeDict = selectedDict ? factory.getDictionaryById(selectedDict) : null;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Dictionnaires', value: dictStats.totalDictionaries, icon: 'ri-book-open-line', color: 'text-primary-500' },
            { label: 'Entrées totales', value: dictStats.totalEntries.toLocaleString(), icon: 'ri-file-list-3-line', color: 'text-accent-500' },
            { label: 'Maturité moyenne', value: `${dictStats.avgMaturity}%`, icon: 'ri-medal-line', color: 'text-secondary-500' },
            { label: 'Domaines', value: dictionaries.reduce((s, d) => s + d.categories.length, 0), icon: 'ri-folder-line', color: 'text-foreground-500' },
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
          placeholder="Rechercher un terme, une prononciation..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
        />
      </div>

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-background-200/40">
            <h3 className="text-sm font-bold text-foreground-950">{searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} pour "{searchQ}"</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/40 bg-background-100">
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Terme</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Prononciation</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Catégorie</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Erreur commune</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {searchResults.map((entry, i) => (
                <tr key={i} className="hover:bg-background-100/50 transition-colors">
                  <td className="p-3 text-xs font-semibold text-foreground-950">{entry.term}</td>
                  <td className="p-3 text-xs text-emerald-600 font-medium">{entry.phonetic}</td>
                  <td className="p-3 text-xs text-foreground-500">{entry.category}</td>
                  <td className="p-3 text-xs text-red-600">{entry.commonError}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dictionaries.map(dict => (
          <ScrollReveal key={dict.id}>
            <button
              onClick={() => setSelectedDict(selectedDict === dict.id ? null : dict.id)}
              className={`w-full text-left rounded-xl border transition-all cursor-pointer ${
                selectedDict === dict.id ? 'border-foreground-300 bg-background-50 ring-2 ring-foreground-200' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    dict.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    dict.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${dict.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{dict.name}</h3>
                    <span className="text-xs text-foreground-500">{dict.entryCount} entrées · Maturité {dict.maturity}%</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 line-clamp-2">{dict.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dict.categories.slice(0, 3).map(c => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{c}</span>
                  ))}
                  {dict.categories.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-400">+{dict.categories.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Expanded entries */}
              {selectedDict === dict.id && (
                <div className="border-t border-background-200/40 px-4 pb-4 pt-3 space-y-2">
                  {dict.sampleEntries.slice(0, 4).map((entry, i) => (
                    <div key={i} className="bg-background-100 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-foreground-950">{entry.term}</span>
                        <span className="text-xs text-emerald-600 font-medium">{entry.phonetic}</span>
                      </div>
                      <p className="text-xs text-foreground-500">{entry.context}</p>
                      <p className="text-xs text-red-600 mt-0.5">
                        <i className="ri-error-warning-line mr-0.5"></i>Erreur commune : {entry.commonError}
                      </p>
                    </div>
                  ))}
                  {dict.sampleEntries.length > 4 && (
                    <p className="text-xs text-foreground-400 text-center">+ {dict.sampleEntries.length - 4} entrées supplémentaires</p>
                  )}
                </div>
              )}
            </button>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: AUDIO QA
// ============================================================================
function QATab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const dims = factory.qaDimensions;
  const results = factory.qaResults;
  const approved = factory.approvedQAResults;
  const rejected = factory.rejectedQAResults;

  return (
    <div className="space-y-8">
      {/* Dimensions */}
      <ScrollReveal>
        <h2 className="text-lg font-bold text-foreground-950 mb-4">5 Dimensions de Contrôle Qualité Audio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dims.map(dim => (
            <div key={dim.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  dim.id === 'intelligibility' || dim.id === 'compliance' ? 'bg-primary-100 text-primary-700' :
                  dim.id === 'fluidity' || dim.id === 'coherence' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${dim.icon} text-sm`}></i>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground-950">{dim.name}</h3>
                  <span className="text-xs text-foreground-400">Poids: {dim.weight}%</span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-2">{dim.description}</p>
              <div className="space-y-0.5">
                {dim.checks.slice(0, 2).map((check, i) => (
                  <div key={i} className="flex items-start gap-1 text-xs">
                    <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0"></i>
                    <span className="text-foreground-600">{check}</span>
                  </div>
                ))}
                {dim.checks.length > 2 && (
                  <p className="text-xs text-foreground-400">+{dim.checks.length - 2} autres contrôles</p>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-background-200/40">
                <span className={`text-xs font-bold ${dim.autoFlagBelow >= 80 ? 'text-red-500' : dim.autoFlagBelow >= 75 ? 'text-amber-600' : 'text-secondary-600'}`}>
                  Alerte si &lt; {dim.autoFlagBelow}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total QA', value: results.length, icon: 'ri-shield-check-line', color: 'text-primary-500' },
          { label: 'Approuvés', value: approved.length, icon: 'ri-check-double-line', color: 'text-emerald-500' },
          { label: 'À corriger', value: rejected.length, icon: 'ri-error-warning-line', color: 'text-amber-500' },
          { label: 'Score moyen', value: `${Math.round(results.reduce((s, r) => s + r.globalScore, 0) / results.length)}/100`, icon: 'ri-bar-chart-line', color: 'text-secondary-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rejected Alert */}
      {rejected.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-close-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 text-sm">{rejected.length} fichier{rejected.length > 1 ? 's' : ''} à corriger</h3>
              {rejected.map(r => (
                <p key={r.id} className="text-sm text-amber-700 mt-1">
                  <strong>{r.contentTitle}</strong> — Score {r.globalScore}/100 · Voix : {r.voiceProfile}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QA Results */}
      <div className="space-y-4">
        {results.map(result => (
          <ScrollReveal key={result.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5 flex items-start justify-between border-b border-background-200/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground-950">{result.contentTitle}</h4>
                  <div className="flex items-center gap-3 text-xs text-foreground-500 mt-1">
                    <span>{result.date}</span>
                    <span><i className="ri-mic-line mr-0.5"></i>{result.voiceProfile}</span>
                    <span><i className="ri-time-line mr-0.5"></i>{result.duration}</span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  result.decision === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                  result.decision === 'to_correct' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {result.decision === 'approved' ? 'APPROUVÉ' : result.decision === 'to_correct' ? 'À CORRIGER' : 'REJETÉ'}
                </div>
              </div>
              <div className="p-5 grid grid-cols-5 gap-3">
                {result.dimensions.map(d => (
                  <div key={d.dimId} className="text-center">
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center border-2 ${
                      d.passed ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
                    }`}>
                      <span className={`text-sm font-bold ${d.passed ? 'text-emerald-700' : 'text-red-700'}`}>{d.score}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-1.5">{dims.find(dd => dd.id === d.dimId)?.name || d.dimId}</p>
                    {!d.passed && <i className="ri-close-circle-fill text-red-500 text-xs mt-0.5"></i>}
                  </div>
                ))}
              </div>
              {result.dimensions.filter(d => !d.passed).length > 0 && (
                <div className="px-5 pb-4 space-y-1.5">
                  {result.dimensions.filter(d => !d.passed).map(d => (
                    <div key={d.dimId} className="flex items-start gap-1.5 text-xs">
                      <i className="ri-error-warning-line text-red-500 mt-0.5"></i>
                      <span className="text-red-700">{d.issues.join(' | ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: VOICE KNOWLEDGE BASE
// ============================================================================
function KnowledgeTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const entries = factory.knowledgeBase;
  const categories = [...new Set(entries.map(e => e.category))];
  const filtered = categoryFilter === 'all' ? entries : factory.getKnowledgeByCategory(categoryFilter);
  const displayed = searchQ ? factory.searchKnowledgeBase(searchQ) : filtered;

  const categoryLabelMap: Record<string, string> = {
    diction_rule: 'Règles de diction',
    validated_pronunciation: 'Prononciations validées',
    reference_script: 'Scripts de référence',
    audio_parameter: 'Paramètres audio',
    production_guide: 'Guides de production',
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Rechercher dans la Knowledge Base vocale..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setCategoryFilter('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
          {categories.map(c => (
            <button key={c} onClick={() => setCategoryFilter(c)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === c ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
              {categoryLabelMap[c] || c}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total entrées', value: entries.length, icon: 'ri-lightbulb-flash-line', color: 'text-primary-500' },
          { label: 'Réutilisables', value: entries.filter(e => e.reusable).length, icon: 'ri-repeat-line', color: 'text-emerald-500' },
          { label: 'Usages totaux', value: entries.reduce((s, e) => s + e.usageCount, 0).toLocaleString(), icon: 'ri-bar-chart-line', color: 'text-accent-500' },
          { label: 'Domaines', value: [...new Set(entries.map(e => e.domain))].length, icon: 'ri-folder-line', color: 'text-secondary-500' },
          { label: 'Tags', value: [...new Set(entries.flatMap(e => e.tags))].length, icon: 'ri-price-tag-3-line', color: 'text-foreground-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Knowledge Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayed.map(entry => (
          <ScrollReveal key={entry.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  entry.category === 'diction_rule' || entry.category === 'validated_pronunciation' ? 'bg-primary-100 text-primary-700' :
                  entry.category === 'reference_script' || entry.category === 'audio_parameter' ? 'bg-accent-100 text-accent-700' :
                  'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${
                    entry.category === 'diction_rule' ? 'ri-book-open-line' :
                    entry.category === 'validated_pronunciation' ? 'ri-check-double-line' :
                    entry.category === 'reference_script' ? 'ri-file-text-line' :
                    entry.category === 'audio_parameter' ? 'ri-equalizer-line' :
                    'ri-guide-line'
                  } text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-bold text-foreground-950">{entry.title}</h3>
                    {entry.reusable && (
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Réutilisable</span>
                    )}
                  </div>
                  <span className="text-xs text-foreground-500">{categoryLabelMap[entry.category] || entry.category} · {entry.domain}</span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3">{entry.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {entry.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-foreground-400">
                <span>{entry.date}</span>
                <span className="flex items-center gap-1"><i className="ri-repeat-line"></i>{entry.usageCount} usages</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 7: KPIs
// ============================================================================
function KPIsTab({ factory }: { factory: ReturnType<typeof useKOSProprietaryVoiceFactory> }) {
  const kpis = factory.kpis;
  const stats = factory.getStats();
  const trends = factory.kpiTrends;

  return (
    <div className="space-y-6">
      {/* Maturity Score */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score de Maturité Vocale</p>
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
                { label: 'Minutes produites', value: stats.totalMinutesProduced.toLocaleString(), sub: `+${stats.minutesThisMonth} ce mois` },
                { label: 'Coût économisé', value: `${(stats.costSavedVsExternal / 1000).toFixed(0)}K FCFA`, sub: 'vs API externes' },
                { label: 'Temps réduit', value: `-${stats.avgProductionTimeReduction}%`, sub: 'depuis janvier' },
                { label: 'Qualité améliorée', value: `+${stats.qualityImprovementYTD}`, sub: 'points YTD' },
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
                            kpi.id === 'error-rate' || kpi.id === 'production-time' || kpi.id === 'cost-per-minute'
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





