import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSCanvaFactory } from '@/hooks/useKOSCanvaFactory';

type TabId = 'templates' | 'infographics' | 'social' | 'thumbnails' | 'reports' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'templates', label: 'Templates', icon: 'ri-stack-line' },
  { id: 'infographics', label: 'Infographies', icon: 'ri-bar-chart-2-line' },
  { id: 'social', label: 'Réseaux Sociaux', icon: 'ri-share-line' },
  { id: 'thumbnails', label: 'Miniatures YouTube', icon: 'ri-youtube-line' },
  { id: 'reports', label: 'Rapports Visuels', icon: 'ri-file-chart-line' },
  { id: 'kpis', label: 'KPIs Factory', icon: 'ri-line-chart-line' },
];

const TYPE_LABELS: Record<string, string> = { carrousel: 'Carrousel', linkedin_post: 'Post LinkedIn', banniere: 'Bannière' };
const TYPE_ICONS: Record<string, string> = { carrousel: 'ri-gallery-line', linkedin_post: 'ri-image-line', banniere: 'ri-layout-masonry-line' };

export default function canvaFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('templates');
  const engine = useKOSCanvaFactory();
  const stats = engine.getStats();

  return (
    <hubLayout hubId={95} activeTab="Canva-Factory" tabLabel="KOS Canva Factory">
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
                      <i className="ri-palette-line text-xs"></i>
                      {stats.totalTemplates} templates · {engine.totalAssets} assets
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.standardLevel}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Canva Factory
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Bibliothèque graphique institutionnelle KHEPRA. 400 templates (100 gouvernance, 100 audit, 100 conformité, 100 risques). Infographies, carrousels, visuels LinkedIn, miniatures YouTube, rapports visuels. Cohérence charte KHEPRA, lisibilité mobile. Standard cabinet de conseil international.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                  {[
                    { label: 'Templates', value: stats.totalTemplates, icon: 'ri-stack-line', color: 'text-primary-500' },
                    { label: 'Infographies', value: stats.totalInfographics, icon: 'ri-bar-chart-2-line', color: 'text-accent-500' },
                    { label: 'Visuels', value: stats.totalSocialVisuals, icon: 'ri-share-line', color: 'text-secondary-500' },
                    { label: 'Cohérence', value: `${stats.brandConsistency}%`, icon: 'ri-palette-line', color: 'text-emerald-500' },
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
          {activeTab === 'templates' && <TemplatesTab engine={engine} />}
          {activeTab === 'infographics' && <InfographicsTab engine={engine} />}
          {activeTab === 'social' && <SocialTab engine={engine} />}
          {activeTab === 'thumbnails' && <ThumbnailsTab engine={engine} />}
          {activeTab === 'reports' && <ReportsTab engine={engine} />}
          {activeTab === 'kpis' && <KPIsTab engine={engine} />}
        </div>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: TEMPLATES
// ============================================================================
function TemplatesTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
  const [catF, setCatF] = useState('all');
  const templates = engine.getTemplateByCategory(catF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-stack-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">400 Templates Institutionnels — 4 Domaines × 100 Templates</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Bibliothèque graphique institutionnelle couvrant la gouvernance, l'audit, la conformité et les risques. Cohérence visuelle KHEPRA EXPERTS garantie. Templates prêts à l'emploi, personnalisables, optimisés pour tous supports.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setCatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {engine.availableCategories.map(c => (
          <button key={c.id} onClick={() => setCatF(c.id)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === c.id ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{c.name} ({engine.templates.find(t => t.id === c.id)?.count || 0})</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(t => (
          <ScrollReveal key={t.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  t.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  t.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${t.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{t.name}</h3>
                  <span className="text-xs text-foreground-400">{t.count} templates disponibles</span>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    <i className="ri-check-line text-xs"></i>{t.count}/100
                  </span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 leading-relaxed">{t.description}</p>
              <div className="mt-3 pt-3 border-t border-background-200/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground-400">Charte KHEPRA</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <i className="ri-shield-check-line text-xs"></i>Conforme
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
// TAB 2: INFOGRAPHICS
// ============================================================================
function InfographicsTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
  const [catF, setCatF] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const infographics = searchQ ? engine.searchInfographics(searchQ) : engine.getInfographicsByCategory(catF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-bar-chart-2-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Infographies Institutionnelles</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Infographies professionnelles pour illustrer les concepts réglementaires, processus métier, frameworks et données clés. Design épuré, palette KHEPRA, vecteurs SVG, lisibilité optimale sur tous supports.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher une infographie..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-accent-300" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setCatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
          {engine.availableCategories.map(c => (
            <button key={c.id} onClick={() => setCatF(c.name)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === c.name ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{c.name}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infographics.map(inf => (
          <ScrollReveal key={inf.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  inf.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  inf.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${inf.icon} text-lg`}></i>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground-950">{inf.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    inf.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                    inf.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                  }`}>{inf.category}</span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{inf.useCase}</p>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <p className="text-xs text-foreground-500"><strong className="text-foreground-600">Spécifications :</strong> {inf.specs}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Éléments</h4>
                <div className="flex flex-wrap gap-1">
                  {inf.elements.map(e => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{e}</span>
                  ))}
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
// TAB 3: SOCIAL MEDIA
// ============================================================================
function SocialTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
  const [typeF, setTypeF] = useState('all');
  const visuals = engine.getSocialVisualsByType(typeF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-secondary-50 border border-secondary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-share-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Visuels Réseaux Sociaux</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Carrousels LinkedIn éducatifs, posts statiques avec citations/statistiques, bannières événementielles. Cohérence charte KHEPRA, lisibilité mobile, formats optimisés pour l'engagement.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setTypeF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${typeF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {engine.socialTypes.map(t => (
          <button key={t} onClick={() => setTypeF(t)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${typeF === t ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{TYPE_LABELS[t] || t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visuals.map(v => (
          <ScrollReveal key={v.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  v.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  v.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${TYPE_ICONS[v.type] || 'ri-file-line'} text-lg`}></i>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      v.type === 'carrousel' ? 'bg-accent-100 text-accent-700' :
                      v.type === 'linkedin_post' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                    }`}>{TYPE_LABELS[v.type] || v.type}</span>
                    {v.slides && <span className="text-xs text-foreground-400">{v.slides} slides</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950">{v.title}</h3>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{v.useCase}</p>
              <div className="bg-background-100 rounded-lg p-3">
                <p className="text-xs text-foreground-500"><strong className="text-foreground-600">Format :</strong> {v.specs}</p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-background-200/40 text-xs">
                <span className={`px-2 py-0.5 rounded-full ${
                  v.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                  v.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                }`}>{v.category}</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <i className="ri-smartphone-line text-xs"></i>Mobile Ready
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: YOUTUBE THUMBNAILS
// ============================================================================
function ThumbnailsTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
  const [catF, setCatF] = useState('all');
  const thumbnails = engine.getThumbnailsByCategory(catF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-youtube-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Miniatures YouTube Institutionnelles</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Miniatures optimisées pour le CTR YouTube. Design percutant, texte lisible sur mobile, cohérence de marque KHEPRA EXPERTS. 8 templates déclinables couvrant tous les types de vidéos institutionnelles.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setCatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {engine.availableCategories.map(c => (
          <button key={c.id} onClick={() => setCatF(c.name)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === c.name ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{c.name}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {thumbnails.map(t => (
          <ScrollReveal key={t.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  t.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  t.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${t.icon} text-lg`}></i>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground-950">{t.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                    t.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                  }`}>{t.category}</span>
                </div>
              </div>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <p className="text-xs text-foreground-500"><strong className="text-foreground-600">Format :</strong> {t.specs}</p>
                <p className="text-xs text-foreground-500 mt-1"><strong className="text-foreground-600">Style :</strong> {t.style}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Éléments</h4>
                <div className="flex flex-wrap gap-1">
                  {t.elements.map(e => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{e}</span>
                  ))}
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
// TAB 5: VISUAL REPORTS
// ============================================================================
function ReportsTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
  const [catF, setCatF] = useState('all');
  const reports = engine.getReportsByCategory(catF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-file-chart-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Rapports Visuels — Templates Complets</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Templates complets de rapports professionnels : rapport annuel gouvernance, rapport d'audit interne, rapport conformité LCB/FT, dashboard risques, rapport ESG ISSB, dossier d'agrément. Structurés, paginés, prêts à l'emploi.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setCatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
        {engine.availableCategories.map(c => (
          <button key={c.id} onClick={() => setCatF(c.name)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${catF === c.name ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>{c.name}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map(r => (
          <ScrollReveal key={r.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  r.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  r.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${r.icon} text-lg`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground-950">{r.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.color === 'primary' ? 'bg-primary-50 text-primary-700' :
                      r.color === 'accent' ? 'bg-accent-50 text-accent-700' : 'bg-secondary-50 text-secondary-700'
                    }`}>{r.category}</span>
                    <span className="text-xs text-foreground-400">{r.pages} pages</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{r.description}</p>
              <div className="bg-background-100 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-foreground-700 mb-2">Sections</h4>
                <div className="flex flex-wrap gap-1">
                  {r.sections.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-background-50 text-foreground-500 border border-background-200/40">{s}</span>
                  ))}
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
function KPIsTab({ engine }: { engine: ReturnType<typeof useKOSCanvaFactory> }) {
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
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Cohérence Visuelle</p>
            <p className="text-5xl font-bold text-accent-500 font-heading">{engine.stats.brandConsistency}</p>
            <p className="text-xs text-foreground-400 mt-1">% — Charte KHEPRA</p>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Assets Totaux</p>
            <p className="text-5xl font-bold text-secondary-500 font-heading">{engine.totalAssets}</p>
            <p className="text-xs text-foreground-400 mt-1">templates + visuels</p>
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





