import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSVideoFactory } from '@/hooks/useKOSVideoFactory';
import type { VideoProject } from '@/mocks/kosVideoFactory';

type TabId = 'projects' | 'storyboard' | 'retention' | 'seo' | 'engagement' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'projects', label: 'Projets Vidéo', icon: 'ri-film-line' },
  { id: 'storyboard', label: 'Storyboards & Scènes', icon: 'ri-layout-line' },
  { id: 'retention', label: 'Optimisation Rétention', icon: 'ri-user-follow-line' },
  { id: 'seo', label: 'SEO Vidéo', icon: 'ri-search-line' },
  { id: 'engagement', label: 'Hooks Engagement', icon: 'ri-chat-3-line' },
  { id: 'kpis', label: 'KPIs Factory', icon: 'ri-line-chart-line' },
];

const FORMAT_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  'youtube-shorts': { label: 'YouTube Shorts', icon: 'ri-youtube-line', color: 'bg-accent-100 text-accent-700' },
  'youtube-long': { label: 'YouTube Long Form', icon: 'ri-youtube-fill', color: 'bg-primary-100 text-primary-700' },
  'linkedin-video': { label: 'LinkedIn Video', icon: 'ri-linkedin-box-line', color: 'bg-secondary-100 text-secondary-700' },
  'facebook-video': { label: 'Facebook Video', icon: 'ri-facebook-box-line', color: 'bg-primary-100 text-primary-700' },
};

export default function KOSVideoFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const engine = useKOSVideoFactory();
  const stats = engine.getStats();

  return (
    <KOSHubLayout hubId={97} activeTab="Video-Factory" tabLabel="KOS Video Factory">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">{stats.engineVersion}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-film-line text-xs"></i>
                      {stats.totalProjects} projets · {stats.totalScenes} scènes
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.standardLevel}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Video Factory
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Production automatique de vidéos institutionnelles KHEPRA. 4 formats (YouTube Shorts, YouTube Long Form, LinkedIn Video, Facebook Video). Storyboards, scènes, animations, sous-titres, transitions, CTA. Optimisation rétention, engagement et référencement YouTube.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                  {[
                    { label: 'Projets', value: stats.totalProjects, icon: 'ri-film-line', color: 'text-primary-500' },
                    { label: 'Scènes', value: stats.totalScenes, icon: 'ri-layout-line', color: 'text-accent-500' },
                    { label: 'Formats', value: stats.totalFormats, icon: 'ri-stack-line', color: 'text-secondary-500' },
                    { label: 'Hooks', value: stats.totalEngagementHooks, icon: 'ri-chat-3-line', color: 'text-emerald-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[80px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id ? 'bg-primary-500 text-white' : 'text-foreground-600 hover:bg-background-100'
                  }`}>
                  <i className={`${tab.icon} text-sm`}></i>{tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'projects' && <ProjectsTab engine={engine} onSelect={setSelectedProject} selectedProject={selectedProject} />}
          {activeTab === 'storyboard' && <StoryboardTab engine={engine} selectedProject={selectedProject} onSelect={setSelectedProject} />}
          {activeTab === 'retention' && <RetentionTab engine={engine} selectedProject={selectedProject} onSelect={setSelectedProject} />}
          {activeTab === 'seo' && <SEOTab engine={engine} selectedProject={selectedProject} onSelect={setSelectedProject} />}
          {activeTab === 'engagement' && <EngagementTab engine={engine} selectedProject={selectedProject} onSelect={setSelectedProject} />}
          {activeTab === 'kpis' && <KPIsTab engine={engine} />}
        </div>
      </main>
    </KOSHubLayout>
  );
}

// ============================================================================
// TAB 1: PROJETS
// ============================================================================
function ProjectsTab({ engine, onSelect, selectedProject }: { engine: ReturnType<typeof useKOSVideoFactory>; onSelect: (id: string) => void; selectedProject: string | null }) {
  const [searchQ, setSearchQ] = useState('');
  const [formatF, setFormatF] = useState('all');
  const filtered = searchQ ? engine.searchProjects(searchQ) : engine.getProjectsByFormat(formatF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-film-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Chaîne de Production Vidéo Automatique</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Transformer chaque contenu en YouTube Shorts, YouTube Long Form, LinkedIn Video, Facebook Video. Storyboard, scènes, animations, sous-titres, transitions, CTA. Optimisation rétention, engagement et SEO vidéo.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher un projet..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-primary-300" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setFormatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
          {engine.availableFormats.map(f => (
            <button key={f} onClick={() => setFormatF(f)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === f ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
              {FORMAT_LABELS[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(proj => {
          const fmt = FORMAT_LABELS[proj.format] || FORMAT_LABELS['youtube-shorts'];
          return (
            <ScrollReveal key={proj.id}>
              <button onClick={() => onSelect(proj.id)} className={`w-full text-left bg-background-50 border rounded-xl p-5 transition-all cursor-pointer ${selectedProject === proj.id ? 'border-primary-400 ring-2 ring-primary-200' : 'border-background-200/70 hover:border-background-300'}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${fmt.color}`}>
                    <i className={`${fmt.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${fmt.color}`}>{fmt.label}</span>
                      <span className="text-xs text-foreground-400">{proj.durationLabel}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground-950 line-clamp-2">{proj.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed mb-3 line-clamp-2">{proj.synopsis}</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{proj.domain}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{proj.storyboard.length} scènes</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{proj.engagementHooks.length} hooks</span>
                </div>
              </button>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: STORYBOARD
// ============================================================================
function StoryboardTab({ engine, selectedProject, onSelect }: { engine: ReturnType<typeof useKOSVideoFactory>; selectedProject: string | null; onSelect: (id: string) => void }) {
  const project = selectedProject ? engine.getProjectById(selectedProject) : null;

  if (!project) {
    return (
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-8 text-center">
          <i className="ri-layout-line text-4xl text-foreground-300 mb-3"></i>
          <h3 className="text-sm font-semibold text-foreground-700 mb-2">Sélectionnez un projet</h3>
          <p className="text-xs text-foreground-500">Choisissez un projet dans l'onglet "Projets Vidéo" pour voir le storyboard détaillé.</p>
        </div>
      </ScrollReveal>
    );
  }

  const fmt = FORMAT_LABELS[project.format] || FORMAT_LABELS['youtube-shorts'];

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fmt.color}`}>
            <i className={`${fmt.icon} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground-950 mb-2 font-heading">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${fmt.color}`}>{fmt.label}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{project.durationLabel}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{project.domain}</span>
            </div>
            <p className="text-sm text-foreground-600">{project.synopsis}</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-3">
        {project.storyboard.map(scene => (
          <ScrollReveal key={scene.sceneNumber}>
            <details className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden group">
              <summary className="p-4 cursor-pointer list-none flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold bg-background-100 text-foreground-500">{scene.sceneNumber}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-foreground-400">{scene.durationSec}s</span>
                    <span className="text-xs text-foreground-400">→ {scene.transitionTo}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{scene.title}</h4>
                </div>
                <i className="ri-arrow-down-s-line text-foreground-400 mt-1 group-open:rotate-180 transition-transform"></i>
              </summary>
              <div className="px-4 pb-4 border-t border-background-200/40 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-background-100 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-foreground-700 mb-1.5 flex items-center gap-1.5">
                      <i className="ri-eye-line"></i>Visuel
                    </h4>
                    <p className="text-sm text-foreground-600">{scene.visualDescription}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-xs text-foreground-400">Animation :</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{scene.animation}</span>
                    </div>
                  </div>
                  <div className="bg-primary-50 border border-primary-200/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-primary-700 mb-1.5 flex items-center gap-1.5">
                      <i className="ri-mic-line"></i>Narration
                    </h4>
                    <p className="text-sm text-foreground-700 italic">"{scene.narration}"</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-secondary-50 border border-secondary-200/50 rounded-lg p-3">
                    <span className="text-xs font-semibold text-secondary-700">Texte à l'écran :</span>
                    <p className="text-sm text-secondary-800 mt-1 whitespace-pre-line">{scene.onScreenText}</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-3">
                    <span className="text-xs font-semibold text-amber-700">Audio :</span>
                    <p className="text-sm text-amber-800 mt-1">{scene.audioCue}</p>
                  </div>
                </div>
              </div>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: OPTIMISATION RÉTENTION
// ============================================================================
function RetentionTab({ engine, selectedProject, onSelect }: { engine: ReturnType<typeof useKOSVideoFactory>; selectedProject: string | null; onSelect: (id: string) => void }) {
  const project = selectedProject ? engine.getProjectById(selectedProject) : null;
  const fmt = project ? FORMAT_LABELS[project.format] || FORMAT_LABELS['youtube-shorts'] : null;

  if (!project) {
    return (
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-8 text-center">
          <i className="ri-user-follow-line text-4xl text-foreground-300 mb-3"></i>
          <h3 className="text-sm font-semibold text-foreground-700 mb-2">Sélectionnez un projet</h3>
          <p className="text-xs text-foreground-500">Choisissez un projet dans l'onglet "Projets Vidéo".</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fmt?.color}`}>
            <i className={`${fmt?.icon} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground-950 mb-1 font-heading">{project.title}</h2>
            <p className="text-xs text-foreground-500">{project.retentionOptimizations.length} techniques — {project.format === 'youtube-shorts' ? 'YouTube Shorts' : project.format === 'youtube-long' ? 'YouTube Long Form' : project.formatLabel}</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.retentionOptimizations.map(opt => (
          <ScrollReveal key={opt.technique}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-700 mb-3">
                <i className={`${opt.icon} text-lg`}></i>
              </div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">{opt.technique}</h3>
              <p className="text-xs text-foreground-600 mb-3">{opt.description}</p>
              <div className="bg-emerald-50 border border-emerald-200/50 rounded-lg p-2.5">
                <span className="text-xs font-semibold text-emerald-700">Impact : {opt.expectedImpact}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: SEO VIDÉO
// ============================================================================
function SEOTab({ engine, selectedProject, onSelect }: { engine: ReturnType<typeof useKOSVideoFactory>; selectedProject: string | null; onSelect: (id: string) => void }) {
  const project = selectedProject ? engine.getProjectById(selectedProject) : null;
  const fmt = project ? FORMAT_LABELS[project.format] || FORMAT_LABELS['youtube-shorts'] : null;

  if (!project) {
    return (
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-8 text-center">
          <i className="ri-search-line text-4xl text-foreground-300 mb-3"></i>
          <h3 className="text-sm font-semibold text-foreground-700 mb-2">Sélectionnez un projet</h3>
          <p className="text-xs text-foreground-500">Choisissez un projet dans l'onglet "Projets Vidéo".</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fmt?.color}`}>
            <i className={`${fmt?.icon} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground-950 mb-1 font-heading">{project.title}</h2>
            <p className="text-xs text-foreground-500">{project.seoOptimizations.length} optimisations SEO</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.seoOptimizations.map(seo => (
          <ScrollReveal key={seo.element}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <i className={`${seo.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{seo.element}</h3>
                  <span className="text-xs text-foreground-400">{seo.platform}</span>
                </div>
              </div>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <span className="text-xs font-semibold text-foreground-700">Optimisé :</span>
                <p className="text-xs text-foreground-600 mt-1">{seo.optimizedValue}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-3">
                <span className="text-xs font-semibold text-amber-700">Best Practice :</span>
                <p className="text-xs text-amber-800 mt-1">{seo.bestPractice}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: HOOKS ENGAGEMENT
// ============================================================================
function EngagementTab({ engine, selectedProject, onSelect }: { engine: ReturnType<typeof useKOSVideoFactory>; selectedProject: string | null; onSelect: (id: string) => void }) {
  const project = selectedProject ? engine.getProjectById(selectedProject) : null;
  const fmt = project ? FORMAT_LABELS[project.format] || FORMAT_LABELS['youtube-shorts'] : null;

  if (!project) {
    return (
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-8 text-center">
          <i className="ri-chat-3-line text-4xl text-foreground-300 mb-3"></i>
          <h3 className="text-sm font-semibold text-foreground-700 mb-2">Sélectionnez un projet</h3>
          <p className="text-xs text-foreground-500">Choisissez un projet dans l'onglet "Projets Vidéo".</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fmt?.color}`}>
            <i className={`${fmt?.icon} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground-950 mb-1 font-heading">{project.title}</h2>
            <p className="text-xs text-foreground-500">{project.engagementHooks.length} hooks d'engagement</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.engagementHooks.map(hook => (
          <ScrollReveal key={hook.hookType}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-700">
                  <i className={`${hook.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{hook.hookType}</h3>
                  <span className="text-xs text-foreground-400">{hook.timing}</span>
                </div>
              </div>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <p className="text-xs text-foreground-600 italic">"{hook.script}"</p>
              </div>
              <div className="bg-accent-50 border border-accent-200/50 rounded-lg p-2.5">
                <span className="text-xs font-semibold text-accent-700">Visuel :</span>
                <p className="text-xs text-accent-800 mt-1">{hook.visual}</p>
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
function KPIsTab({ engine }: { engine: ReturnType<typeof useKOSVideoFactory> }) {
  const stats = engine.getStats();
  const kpis = engine.getKPIs();

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score Maturité</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{stats.maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${stats.maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Rétention Moy.</p>
            <p className="text-5xl font-bold text-accent-500 font-heading">{kpis[3]?.current || 78}%</p>
            <p className="text-xs text-foreground-400 mt-1">Cible {kpis[3]?.target || 90}%</p>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Engagement</p>
            <p className="text-5xl font-bold text-secondary-500 font-heading">{kpis[4]?.current || 82}%</p>
            <p className="text-xs text-foreground-400 mt-1">Cible {kpis[4]?.target || 92}%</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color === 'primary' ? 'bg-primary-100 text-primary-700' : kpi.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'}`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                </div>
                <span className="text-lg font-bold text-foreground-950">{kpi.current}{kpi.unit}</span>
              </div>
              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = maxVal > 0 ? (h.value / maxVal) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div className="absolute bottom-0 w-full rounded-sm bg-primary-400 transition-all" style={{ height: `${heightPct}%` }}></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Cible: {kpi.target}{kpi.unit}</span>
                <span className="text-accent-600 font-medium">Standard Big Four</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}