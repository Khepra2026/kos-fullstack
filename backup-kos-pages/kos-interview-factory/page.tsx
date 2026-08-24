import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSInterviewFactory } from '@/hooks/useKOSInterviewFactory';

type TabId = 'roles' | 'qa' | 'syntheses' | 'formats' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'roles', label: 'Rôles Experts', icon: 'ri-team-line' },
  { id: 'qa', label: 'Questions & Réponses', icon: 'ri-chat-quote-line' },
  { id: 'syntheses', label: 'Synthèses Multi-Experts', icon: 'ri-brain-line' },
  { id: 'formats', label: 'Formats Production', icon: 'ri-stack-line' },
  { id: 'kpis', label: 'KPIs Factory', icon: 'ri-line-chart-line' },
];

const DIFFICULTY_LABELS: Record<string, string> = { débutant: 'Débutant', intermédiaire: 'Intermédiaire', expert: 'Expert' };
const DIFFICULTY_COLORS: Record<string, string> = { débutant: 'bg-emerald-100 text-emerald-700', intermédiaire: 'bg-accent-100 text-accent-700', expert: 'bg-primary-100 text-primary-700' };

export default function interviewFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('roles');
  const engine = useKOSInterviewFactory();
  const stats = engine.getStats();

  return (
    <hubLayout hubId={94} activeTab="Interview-Factory" tabLabel="KOS Interview Factory">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                      {stats.engineVersion}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-team-line text-xs"></i>
                      {stats.totalRoles} experts · {stats.totalQAs} Q&A
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.standardLevel}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Interview Factory
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Système d'interviews institutionnelles simulées. 6 experts virtuels (PCA, DG, CCO, CAE, Régulateur, Expert ESG), questions, relances, réponses expertes, synthèses multi-experts. 3 formats : vidéo, podcast, article. Niveau publication professionnelle — standard Big Four.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                  {[
                    { label: 'Experts', value: stats.totalRoles, icon: 'ri-team-line', color: 'text-primary-500' },
                    { label: 'Q&A', value: stats.totalQAs, icon: 'ri-chat-quote-line', color: 'text-accent-500' },
                    { label: 'Synthèses', value: stats.totalSyntheses, icon: 'ri-brain-line', color: 'text-secondary-500' },
                    { label: 'Qualité', value: `${stats.qualityScore}%`, icon: 'ri-medal-line', color: 'text-emerald-500' },
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
          {activeTab === 'roles' && <RolesTab engine={engine} />}
          {activeTab === 'qa' && <QATab engine={engine} />}
          {activeTab === 'syntheses' && <SynthesesTab engine={engine} />}
          {activeTab === 'formats' && <FormatsTab engine={engine} />}
          {activeTab === 'kpis' && <KPIsTab engine={engine} />}
        </div>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: ROLES
// ============================================================================
function RolesTab({ engine }: { engine: ReturnType<typeof useKOSInterviewFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const roles = searchQ ? engine.searchRoles(searchQ) : engine.roles;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-team-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">6 Experts Virtuels — Big Four Standard</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque expert est doté d'un profil complet : credentials Big Four, expertise métier documentée, voix KHEPRA™ dédiée, et catalogue de questions calibrées. Les réponses sont produites au standard des cabinets de conseil internationaux.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="relative max-w-md">
        <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
        <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher un expert, une expertise..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-accent-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(role => (
          <ScrollReveal key={role.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  role.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  role.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${role.icon} text-xl`}></i>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground-950">{role.title}</h3>
                  <p className="text-xs text-foreground-500">{role.fullTitle}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 whitespace-nowrap">
                    {(engine.qaCountByRole[role.id] || 0)} Q&A
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex flex-wrap gap-1">
                  {role.expertise.map(e => (
                    <span key={e} className={`text-xs px-2 py-0.5 rounded-full ${
                      role.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                      role.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                    }`}>{e}</span>
                  ))}
                </div>
              </div>
              <div className="bg-background-100 rounded-lg p-3 mb-3 text-xs text-foreground-600">
                <strong className="text-foreground-700">Credentials :</strong> {role.credentials}
              </div>
              <div className="mb-3">
                <p className="text-xs text-foreground-500 mb-1.5"><strong className="text-foreground-600">Voix :</strong> {role.voiceProfile}</p>
                <div className="flex flex-wrap gap-1">
                  {role.topics.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{t}</span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-background-200/40">
                <p className="text-xs text-foreground-500 italic leading-relaxed">« {role.samplePhrase} »</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: QUESTIONS & ANSWERS
// ============================================================================
function QATab({ engine }: { engine: ReturnType<typeof useKOSInterviewFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const [roleF, setRoleF] = useState('all');
  const [diffF, setDiffF] = useState('all');

  const qas = searchQ ? engine.searchQAs(searchQ) : engine.getFilteredQAs(roleF, diffF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-chat-quote-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Questions, Relances & Réponses Expertes</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque question est accompagnée d'une relance d'approfondissement et d'une réponse experte calibrée au standard Big Four. Les réponses sont factuelles, documentées, et incluent des recommandations opérationnelles.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher dans les Q&A..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-primary-300" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setRoleF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${roleF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
          {engine.availableRoles.map(r => (
            <button key={r.id} onClick={() => setRoleF(r.id)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${roleF === r.id ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{r.title}</button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => setDiffF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${diffF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous niveaux</button>
          {['débutant', 'intermédiaire', 'expert'].map(d => (
            <button key={d} onClick={() => setDiffF(d)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${diffF === d ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{DIFFICULTY_LABELS[d]}</button>
          ))}
        </div>
      </div>

      {/* QA Cards */}
      <div className="grid grid-cols-1 gap-4">
        {qas.map(qa => {
          const role = engine.getRoleById(qa.roleId);
          return (
            <ScrollReveal key={qa.id}>
              <details className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden group">
                <summary className="p-5 cursor-pointer list-none flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    role?.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    role?.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${role?.icon || 'ri-user-line'} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-foreground-700">{role?.title || 'Expert'}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[qa.difficulty] || 'bg-background-100 text-foreground-500'}`}>
                        {DIFFICULTY_LABELS[qa.difficulty] || qa.difficulty}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground-950 leading-relaxed">{qa.question}</p>
                  </div>
                  <i className="ri-arrow-down-s-line text-foreground-400 mt-1 group-open:rotate-180 transition-transform flex-shrink-0"></i>
                </summary>
                <div className="px-5 pb-5 border-t border-background-200/40 space-y-4">
                  {/* Relance */}
                  <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1.5">
                      <i className="ri-arrow-go-forward-line"></i>Relance
                    </h4>
                    <p className="text-sm text-amber-800 italic">{qa.relance}</p>
                  </div>
                  {/* Réponse */}
                  <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="ri-mic-line"></i>Réponse Experte — {role?.title}
                    </h4>
                    <p className="text-sm text-foreground-700 leading-relaxed">{qa.answerExpert}</p>
                  </div>
                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1">
                    {qa.keywords.map(k => (
                      <span key={k} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{k}</span>
                    ))}
                  </div>
                </div>
              </details>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: SYNTHESES
// ============================================================================
function SynthesesTab({ engine }: { engine: ReturnType<typeof useKOSInterviewFactory> }) {
  const [formatF, setFormatF] = useState('all');
  const syntheses = engine.getSynthesesByFormat(formatF);
  const formatLabels: Record<string, string> = { video: 'Vidéo', podcast: 'Podcast', article: 'Article' };
  const formatIcons: Record<string, string> = { video: 'ri-film-line', podcast: 'ri-mic-line', article: 'ri-file-text-line' };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-secondary-50 border border-secondary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-brain-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Synthèses Multi-Experts</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Tables rondes virtuelles, dialogues croisés et synthèses combinant plusieurs experts KHEPRA. Chaque synthèse est disponible en 3 formats : vidéo, podcast et article. Publication professionnelle — standard Big Four.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setFormatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {engine.availableFormats.map(f => (
          <button key={f} onClick={() => setFormatF(f)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === f ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
            {formatLabels[f] || f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {syntheses.map(syn => (
          <ScrollReveal key={syn.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0 text-accent-700">
                  <i className={`${formatIcons[syn.format] || 'ri-file-line'} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      syn.format === 'video' ? 'bg-primary-100 text-primary-700' :
                      syn.format === 'podcast' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                    }`}>{formatLabels[syn.format] || syn.format}</span>
                    <span className="text-xs text-foreground-400">{syn.duration}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950">{syn.title}</h3>
                  <p className="text-sm text-foreground-500 mt-1">
                    <span className="text-xs text-foreground-400">Experts : </span>
                    {syn.roleIds.map(rid => {
                      const r = engine.getRoleById(rid);
                      return r ? (
                        <span key={rid} className={`text-xs px-2 py-0.5 rounded-full mr-1 ${
                          r.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                          r.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                        }`}>{r.title}</span>
                      ) : null;
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed mb-4">{syn.summary}</p>
              <div className="bg-background-100 rounded-lg p-4 mb-3">
                <h4 className="text-xs font-semibold text-foreground-700 mb-2 flex items-center gap-1.5">
                  <i className="ri-lightbulb-line text-amber-500"></i>Key Learnings
                </h4>
                <ul className="space-y-1.5">
                  {syn.keyLessons.map((kl, i) => (
                    <li key={i} className="text-xs text-foreground-600 flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-100 text-accent-700 text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {kl}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-foreground-400">{syn.publicationLevel}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: FORMATS
// ============================================================================
function FormatsTab({ engine }: { engine: ReturnType<typeof useKOSInterviewFactory> }) {
  const formats = engine.getFormatConfigs();
  const formatIcons: Record<string, string> = { video: 'ri-film-line', podcast: 'ri-mic-line', article: 'ri-file-text-line' };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-stack-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">3 Formats de Production</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque interview est déclinée en 3 formats professionnels : vidéo (1080p studio), podcast (MP3 mastering pro), article (SEO optimisé 1500-3500 mots). Production automatisée, qualité cabinet international.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formats.map(f => (
          <ScrollReveal key={f.format}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center text-accent-700 flex-shrink-0">
                  <i className={`${formatIcons[f.format] || 'ri-file-line'} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{f.label}</h3>
                  <span className="text-xs text-foreground-400">{f.productionTime}</span>
                </div>
              </div>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Spécifications</h4>
                <p className="text-xs text-foreground-500 leading-relaxed">{f.specs}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Cas d'Usage</h4>
                <p className="text-xs text-foreground-600 leading-relaxed">{f.useCase}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: KPIs
// ============================================================================
function KPIsTab({ engine }: { engine: ReturnType<typeof useKOSInterviewFactory> }) {
  const kpis = engine.getKPIs();

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score Maturité</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{engine.stats.maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {engine.stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${engine.stats.maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Qualité Expert</p>
            <p className="text-5xl font-bold text-accent-500 font-heading">{engine.stats.qualityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Big Four Grade</p>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Interviews / An</p>
            <p className="text-5xl font-bold text-secondary-500 font-heading">{kpis[1]?.current || 0}</p>
            <p className="text-xs text-foreground-400 mt-1">objectif {kpis[1]?.target || 100}</p>
          </div>
        </div>
      </ScrollReveal>

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





