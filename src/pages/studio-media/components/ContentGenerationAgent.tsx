import { useState } from 'react';

interface GenerationRequest {
  agent: 'podcast' | 'youtube' | 'geo' | 'business' | 'community' | 'designer' | 'llm';
  topic: string;
  audience: string;
  keywords: string[];
  tone: string;
  language: string;
  format?: string;
  depth?: string;
  duration_days?: number;
  platforms?: string[];
  style?: string;
  style_directives?: string[];
}

interface ContentSection {
  title: string;
  content: string;
  tips: string[];
}

interface CalendarEntry {
  day: number;
  platform: string;
  post_type: string;
  content: string;
  best_time: string;
  hashtags: string[];
  engagement_tip: string;
}

interface VisualBrief {
  title: string;
  concept: string;
  color_palette: string[];
  typography: string;
  layout_description: string;
  data_visualization: string;
  image_direction: string;
  technical_specs: string;
}

interface LLMContentBlock {
  type: string;
  title: string;
  content: string;
  word_count: number;
  seo_keywords: string[];
  prompts_for_llm: string[];
}

interface GenerationResult {
  id: string;
  agent: string;
  topic: string;
  sections?: ContentSection[];
  calendar?: CalendarEntry[];
  engagement_plan?: any;
  brief?: VisualBrief;
  variations?: VisualBrief[];
  social_declinations?: any[];
  blocks?: LLMContentBlock[];
  executive_summary?: string;
  full_prompt_chain?: string[];
  metadata: {
    generated_at: string;
    template_version: string;
    estimated_duration?: string;
    recommended_channels?: string[];
    total_posts?: number;
    platforms_covered?: string[];
    estimated_reach?: string;
    estimated_production_time?: string;
    tools_recommended?: string[];
    file_formats?: string[];
    total_words?: number;
    originality_score?: number;
    seo_score?: string;
    recommended_llm?: string;
  };
}

const AGENT_OPTIONS = [
  { value: 'podcast', label: 'Podcast', icon: 'ri-mic-line', color: 'primary', group: 'Studio Média' },
  { value: 'youtube', label: 'YouTube', icon: 'ri-video-line', color: 'accent', group: 'Studio Média' },
  { value: 'geo', label: 'GEO/SEO', icon: 'ri-search-line', color: 'primary', group: 'Studio Média' },
  { value: 'business', label: 'Business Dev', icon: 'ri-line-chart-line', color: 'accent', group: 'Studio Média' },
  { value: 'community', label: 'Community Manager', icon: 'ri-chat-smile-2-line', color: 'accent', group: 'Agents Spécialisés' },
  { value: 'designer', label: 'Designer Infographiste', icon: 'ri-palette-line', color: 'primary', group: 'Agents Spécialisés' },
  { value: 'llm', label: 'Expert LLM', icon: 'ri-brain-2-line', color: 'secondary', group: 'Agents Spécialisés' },
];

const TONE_OPTIONS = [
  { value: 'expert', label: 'Expert / Institutionnel' },
  { value: 'pedagogique', label: 'Pédagogique / Formateur' },
  { value: 'impactant', label: 'Impactant / Provocateur' },
  { value: 'inspirant', label: 'Inspirant / Visionnaire' },
  { value: 'technique', label: 'Technique / Spécialisé' },
];

const FORMAT_OPTIONS = [
  { value: 'infographie', label: 'Infographie' },
  { value: 'carousel_linkedin', label: 'Carrousel LinkedIn' },
  { value: 'rapport_visuel', label: 'Rapport Visuel' },
  { value: 'mini_video_brief', label: 'Brief Vidéo Courte' },
  { value: 'presentation_executive', label: 'Présentation Executive' },
];

const CONTENT_TYPE_OPTIONS = [
  { value: 'article_expert', label: 'Article Expert (1800 mots)' },
  { value: 'livre_blanc', label: 'Livre Blanc (3500 mots)' },
  { value: 'etude_cas', label: 'Étude de Cas (1200 mots)' },
  { value: 'post_linkedin', label: 'Post LinkedIn (800 mots)' },
  { value: 'newsletter_executive', label: 'Newsletter Executive (1200 mots)' },
  { value: 'rapport_sectoriel', label: 'Rapport Sectoriel (2500 mots)' },
];

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

function getEndpoint(agent: string): string {
  switch (agent) {
    case 'community': return 'kos-social-content-generator';
    case 'designer': return 'kos-studio-media-generator';
    case 'llm': return 'kos-content-generate';
    default: return 'kos-studio-media-generator';
  }
}

export default function ContentGenerationAgent() {
  const [agent, setAgent] = useState<GenerationRequest['agent']>('podcast');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [tone, setTone] = useState('expert');
  const [language, setLanguage] = useState('fr');
  const [format, setFormat] = useState('infographie');
  const [contentType, setContentType] = useState('article_expert');
  const [depth, setDepth] = useState('approfondi');
  const [durationDays, setDurationDays] = useState(7);
  const [style, setStyle] = useState('corporate');
  const [platformsInput, setPlatformsInput] = useState('linkedin, x');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSectionIdx, setExpandedSectionIdx] = useState<number | null>(null);
  const [expandedBlockIdx, setExpandedBlockIdx] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim() || !audience.trim() || !keywordsInput.trim()) {
      setError('Remplis tous les champs obligatoires : sujet, audience et mots-clés.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const keywords = keywordsInput
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    if (keywords.length === 0) {
      setError('Ajoute au moins un mot-clé.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = getEndpoint(agent);
      let body: any = {};

      if (agent === 'community') {
        const platforms = platformsInput.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
        body = { topic, audience, platforms, duration_days: durationDays, tone, keywords, language };
      } else if (agent === 'designer') {
        body = { action: 'design', topic, audience, format, style, keywords, brand_guidelines: true, language };
      } else if (agent === 'llm') {
        body = { content_type: 'llm_brief', topic, audience, llm_content_type: contentType, tone, depth, keywords, language, style_directives: [] };
      } else {
        body = { framework: agent, topic, audience, keywords, tone, language };
      }

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(SUPABASE_ANON_KEY ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } : {}),
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erreur lors de la génération');
      }

      const data: GenerationResult = await response.json();
      setResult(data);
      setExpandedSectionIdx(null);
      setExpandedBlockIdx(null);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const isStudioAgent = ['podcast', 'youtube', 'geo', 'business'].includes(agent);
  const isCommunityAgent = agent === 'community';
  const isDesignerAgent = agent === 'designer';
  const isLLMAgent = agent === 'llm';

  const activeAgentInfo = AGENT_OPTIONS.find((a) => a.value === agent);
  const activeColor = activeAgentInfo?.color || 'primary';

  const studioAgents = AGENT_OPTIONS.filter((a) => a.group === 'Studio Média');
  const specializedAgents = AGENT_OPTIONS.filter((a) => a.group === 'Agents Spécialisés');

  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200/70 mb-6">
            <i className="ri-robot-2-line text-primary-600 text-sm" />
            <span className="text-sm font-semibold text-primary-700 uppercase tracking-wider">
              Agents IA KOS Automaton
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            Production Automatique de Contenus
          </h2>
          <p className="text-body-md text-foreground-600 max-w-3xl mx-auto leading-relaxed">
            7 agents IA spécialisés pour produire podcasts, vidéos, contenus SEO, stratégies commerciales, calendriers social media, briefs visuels et contenus 100% originaux.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-background-200/70 bg-background-50 p-6 md:p-8">
            {/* Agent Selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">
                Agent IA
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {studioAgents.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAgent(opt.value as GenerationRequest['agent'])}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                        agent === opt.value
                          ? opt.color === 'primary'
                            ? 'bg-primary-500 text-background-50'
                            : 'bg-accent-500 text-background-50'
                          : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                      }`}
                    >
                      <i className={`${opt.icon} text-sm`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {specializedAgents.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAgent(opt.value as GenerationRequest['agent'])}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                        agent === opt.value
                          ? opt.color === 'primary'
                            ? 'bg-primary-500 text-background-50 border-primary-500'
                            : opt.color === 'secondary'
                              ? 'bg-secondary-500 text-background-50 border-secondary-500'
                              : 'bg-accent-500 text-background-50 border-accent-500'
                          : 'bg-background-50 text-foreground-600 hover:bg-background-100 border-background-200'
                      }`}
                    >
                      <i className={`${opt.icon} text-sm`} />
                      {opt.label}
                      <span className="text-[9px] opacity-60 ml-0.5">NEW</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                  Ton éditorial
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                >
                  {TONE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {isCommunityAgent && (
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Durée du calendrier (jours)
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                  >
                    {[7, 14, 21, 30].map((d) => (
                      <option key={d} value={d}>{d} jours</option>
                    ))}
                  </select>
                </div>
              )}
              {isDesignerAgent && (
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Format visuel
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                  >
                    {FORMAT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              {isLLMAgent && (
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Type de contenu
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                  >
                    {CONTENT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              {isDesignerAgent && (
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Style
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                  >
                    {['corporate', 'moderne', 'minimaliste', 'chaud', 'impact'].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              )}
              {isLLMAgent && (
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Profondeur d'analyse
                  </label>
                  <select
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 focus:outline-none focus:border-primary-300 cursor-pointer"
                  >
                    {[{ value: 'approfondi', label: 'Approfondi (niveau Big Four)' }, { value: 'standard', label: 'Standard' }, { value: 'executif', label: 'Exécutif (synthétique)' }].map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                  Sujet principal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: La transformation digitale des PME africaines"
                  className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                  Audience cible <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Ex: Dirigeants de PME, responsables conformité"
                  className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
                />
              </div>
              <div className={isCommunityAgent || isDesignerAgent ? 'md:col-span-2' : 'md:col-span-2'}>
                <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                  Mots-clés (séparés par des virgules) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  placeholder="Ex: transformation digitale, PME, Afrique, croissance, innovation"
                  className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
                />
              </div>
              {isCommunityAgent && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">
                    Plateformes (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={platformsInput}
                    onChange={(e) => setPlatformsInput(e.target.value)}
                    placeholder="linkedin, x, instagram, youtube"
                    className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                <i className="ri-error-warning-line text-red-500 text-lg mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 leading-relaxed">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all ${
                loading
                  ? 'bg-foreground-300 text-background-50 cursor-wait'
                  : activeColor === 'primary'
                    ? 'bg-primary-500 text-background-50 hover:-translate-y-0.5 hover:shadow-lg'
                    : activeColor === 'secondary'
                      ? 'bg-secondary-500 text-background-50 hover:-translate-y-0.5 hover:shadow-lg'
                      : 'bg-accent-500 text-background-50 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg" />
                  L&apos;agent KOS génère le contenu...
                </>
              ) : (
                <>
                  <i className={`${activeAgentInfo?.icon || 'ri-robot-2-line'} text-lg`} />
                  Générer avec {activeAgentInfo?.label || 'KOS Automaton'}
                </>
              )}
            </button>
          </div>

          {/* ─── RESULT ─── */}
          {result && (
            <div className="mt-10 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${activeColor === 'primary' ? 'bg-primary-100' : activeColor === 'secondary' ? 'bg-secondary-100' : 'bg-accent-100'}`}>
                  <i className={`ri-check-double-line text-lg ${activeColor === 'primary' ? 'text-primary-600' : activeColor === 'secondary' ? 'text-secondary-600' : 'text-accent-600'}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground-950">Contenu Généré</h3>
                  <p className="text-xs text-foreground-500">
                    {activeAgentInfo?.label || result.agent} · {result.metadata.estimated_duration || result.metadata.estimated_generation_time || result.metadata.estimated_production_time} · Généré le{' '}
                    {new Date(result.metadata.generated_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {result.metadata.originality_score && (
                  <div className="ml-auto">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                      result.metadata.originality_score >= 85 ? 'bg-primary-50 text-primary-700 border border-primary-200/70' : 'bg-amber-50 text-amber-700 border border-amber-200/70'
                    }`}>
                      <i className="ri-sparkling-2-line" />
                      Score d'originalité : {result.metadata.originality_score}%
                    </span>
                  </div>
                )}
              </div>

              {/* Topic banner */}
              <div className="rounded-2xl bg-foreground-950 p-6 mb-6">
                <p className="text-xs text-foreground-400 uppercase tracking-wider mb-1">Sujet</p>
                <h4 className="font-heading text-lg font-bold text-white mb-3">{result.topic}</h4>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {keywordsInput.split(',').map((k, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-foreground-800 text-foreground-300 whitespace-nowrap">
                      {k.trim()}
                    </span>
                  ))}
                </div>
                {result.metadata.recommended_channels && (
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs text-foreground-400 flex items-center gap-1">
                      <i className="ri-share-line text-sm" />
                      {result.metadata.recommended_channels.slice(0, 3).join(' · ')}
                    </span>
                  </div>
                )}
                {result.metadata.total_posts && (
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs text-foreground-400 flex items-center gap-1">
                      <i className="ri-stack-line text-sm" />
                      {result.metadata.total_posts} posts · {result.metadata.platforms_covered?.join(', ')} · Reach estimé : {result.metadata.estimated_reach}
                    </span>
                  </div>
                )}
                {result.metadata.tools_recommended && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs text-foreground-400 flex items-center gap-1">
                      <i className="ri-tools-line text-sm" />
                      Outils : {result.metadata.tools_recommended.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Sections / Blocks / Calendar */}
              {result.sections && result.sections.length > 0 && (
                <div className="space-y-2">
                  {result.sections.map((section, idx) => {
                    const isExpanded = expandedSectionIdx === idx;
                    const sectionColor = idx % 2 === 0 ? 'primary' : 'accent';
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border transition-all duration-300 cursor-pointer bg-background-50 ${
                          isExpanded
                            ? sectionColor === 'primary'
                              ? 'border-primary-200/70 shadow-sm'
                              : 'border-accent-200/70 shadow-sm'
                            : 'border-background-200/70 hover:border-background-300/60'
                        }`}
                      >
                        <div
                          className="p-5 flex items-start gap-4"
                          onClick={() => setExpandedSectionIdx(isExpanded ? null : idx)}
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${
                              sectionColor === 'primary' ? 'bg-primary-100' : 'bg-accent-100'
                            }`}
                          >
                            <span
                              className={`font-heading text-sm font-bold ${
                                sectionColor === 'primary' ? 'text-primary-600' : 'text-accent-600'
                              }`}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-heading text-sm font-bold text-foreground-900">{section.title}</h5>
                              {isExpanded ? (
                                <i className="ri-arrow-up-s-line text-foreground-400 ml-auto" />
                              ) : (
                                <i className="ri-arrow-down-s-line text-foreground-400 ml-auto" />
                              )}
                            </div>
                            <p className="text-xs text-foreground-500 line-clamp-2 leading-relaxed">{section.content}</p>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                            <div className="mt-4">
                              <div className="rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
                                <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{section.content}</pre>
                              </div>
                            </div>
                            <div className="mt-4">
                              <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">
                                Conseils de l'agent KOS :
                              </span>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {section.tips.map((tip, j) => (
                                  <span
                                    key={j}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                      sectionColor === 'primary'
                                        ? 'bg-primary-50 border border-primary-200/70 text-primary-700'
                                        : 'bg-accent-50 border border-accent-200/70 text-accent-700'
                                    } whitespace-nowrap`}
                                  >
                                    <i className="ri-lightbulb-line text-xs mr-1" />
                                    {tip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Calendar (Community Manager) */}
              {result.calendar && result.calendar.length > 0 && (
                <div>
                  {result.engagement_plan && (
                    <div className="rounded-2xl bg-white border border-background-200/70 p-6 mb-6">
                      <h4 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                        <i className="ri-flashlight-line text-accent-500" />
                        Plan d'Engagement Quotidien
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Actions quotidiennes</span>
                          <ul className="mt-2 space-y-2">
                            {result.engagement_plan.daily_actions.map((action: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                <i className="ri-check-line text-xs text-accent-500 mt-0.5 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Conseils de croissance</span>
                          <ul className="mt-2 space-y-2">
                            {result.engagement_plan.community_growth_tips.map((tip: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                <i className="ri-lightbulb-line text-xs text-accent-500 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <h4 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-calendar-line text-accent-500" />
                    Calendrier Éditorial ({result.calendar.length} posts)
                  </h4>
                  <div className="space-y-2">
                    {result.calendar.map((entry: CalendarEntry, idx: number) => {
                      const isExpanded = expandedSectionIdx === idx;
                      return (
                        <div key={idx} className={`rounded-xl border border-background-200/70 bg-background-50 hover:border-accent-200/60 transition-all`}>
                          <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedSectionIdx(isExpanded ? null : idx)}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0">
                              <span className="font-heading text-sm font-bold text-accent-600">J{entry.day}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-foreground-500">{entry.platform}</span>
                                <span className="text-[10px] text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">{entry.post_type}</span>
                                <span className="text-[10px] text-foreground-400 ml-auto">{entry.best_time}</span>
                                {isExpanded ? (
                                  <i className="ri-arrow-up-s-line text-foreground-400" />
                                ) : (
                                  <i className="ri-arrow-down-s-line text-foreground-400" />
                                )}
                              </div>
                              <p className="text-sm text-foreground-600 leading-relaxed line-clamp-2">{entry.content}</p>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                              <div className="mt-4">
                                <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Hashtags :</span>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {entry.hashtags.map((tag: string, j: number) => (
                                    <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-50 border border-accent-200/70 text-accent-700 whitespace-nowrap">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-3">
                                <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Conseil d'engagement :</span>
                                <p className="text-sm text-foreground-700 mt-1 flex items-start gap-2">
                                  <i className="ri-lightbulb-line text-accent-500 text-xs mt-0.5 flex-shrink-0" />
                                  {entry.engagement_tip}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Designer Brief */}
              {result.brief && (
                <div>
                  <h4 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-palette-line text-primary-500" />
                    Brief Visuel — {result.metadata.estimated_production_time}
                  </h4>

                  <div className="rounded-2xl bg-white border border-background-200/70 p-6 mb-4">
                    <h5 className="font-heading text-base font-bold text-foreground-900 mb-4">{result.brief.title}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Concept</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.concept}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Palette de couleurs</span>
                        <div className="flex gap-2 mt-1">
                          {result.brief.color_palette.map((color: string, i: number) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                              <div className="w-8 h-8 rounded-lg border border-background-200" style={{ backgroundColor: color }} />
                              <span className="text-[9px] font-mono text-foreground-400">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Typographie</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.typography}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Mise en page</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.layout_description}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Visualisation de données</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.data_visualization}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Direction image</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.image_direction}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Spécifications techniques</span>
                        <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{result.brief.technical_specs}</p>
                      </div>
                    </div>
                  </div>

                  {/* Variations */}
                  {result.variations && result.variations.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 block">Variations de style</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.variations.map((v: VisualBrief, idx: number) => (
                          <div key={idx} className="rounded-xl bg-white border border-background-200/70 p-4">
                            <h6 className="text-sm font-bold text-foreground-900 mb-2">{v.title}</h6>
                            <div className="flex gap-1.5 mb-2">
                              {v.color_palette.slice(0, 5).map((c: string, ci: number) => (
                                <div key={ci} className="w-6 h-6 rounded-md border border-background-200" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                            <p className="text-xs text-foreground-600 leading-relaxed line-clamp-2">{v.concept}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social declinations */}
                  {result.social_declinations && result.social_declinations.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 block">Déclinaisons sociales</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.social_declinations.map((d: any, idx: number) => (
                          <div key={idx} className="rounded-xl bg-white border border-background-200/70 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-foreground-800">{d.platform}</span>
                              <span className="text-[10px] text-foreground-400">{d.format}</span>
                            </div>
                            <p className="text-xs text-foreground-600 leading-relaxed">{d.specifications}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LLM Content Blocks */}
              {result.blocks && result.blocks.length > 0 && (
                <div>
                  {result.executive_summary && (
                    <div className="rounded-2xl bg-white border border-background-200/70 p-6 mb-6">
                      <h4 className="font-heading text-base font-bold text-foreground-950 mb-2 flex items-center gap-2">
                        <i className="ri-file-list-3-line text-secondary-500" />
                        Résumé Exécutif
                      </h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{result.executive_summary}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-foreground-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-file-text-line" />
                          {result.metadata.total_words?.toLocaleString()} mots
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-sparkling-2-line" />
                          Score originalité : {result.metadata.originality_score}%
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-search-line" />
                          SEO : {result.metadata.seo_score}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-rocket-line" />
                          {result.metadata.recommended_llm}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {result.blocks.map((block: LLMContentBlock, idx: number) => {
                      const isExpanded = expandedBlockIdx === idx;
                      return (
                        <div
                          key={idx}
                          className={`rounded-xl border transition-all duration-300 cursor-pointer bg-background-50 ${
                            isExpanded
                              ? 'border-secondary-200/70 shadow-sm'
                              : 'border-background-200/70 hover:border-background-300/60'
                          }`}
                        >
                          <div className="p-5 flex items-start gap-4" onClick={() => setExpandedBlockIdx(isExpanded ? null : idx)}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100 flex-shrink-0">
                              <span className="font-heading text-sm font-bold text-secondary-600">{String(idx + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-heading text-sm font-bold text-foreground-900">{block.title}</h5>
                                <span className="text-[10px] text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">{block.word_count} mots</span>
                                {isExpanded ? (
                                  <i className="ri-arrow-up-s-line text-foreground-400 ml-auto" />
                                ) : (
                                  <i className="ri-arrow-down-s-line text-foreground-400 ml-auto" />
                                )}
                              </div>
                              <p className="text-xs text-foreground-500 line-clamp-2 leading-relaxed">{block.content}</p>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                              <div className="mt-4">
                                <div className="rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
                                  <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{block.content}</pre>
                                </div>
                              </div>
                              <div className="mt-4">
                                <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">
                                  Prompt LLM pour cette section :
                                </span>
                                <div className="mt-2 rounded-lg bg-secondary-50 border border-secondary-200/70 p-3">
                                  {block.prompts_for_llm.map((prompt: string, j: number) => (
                                    <p key={j} className="text-xs text-secondary-700 leading-relaxed font-mono">{prompt}</p>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-3">
                                <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Mots-clés SEO :</span>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {block.seo_keywords.map((kw: string, j: number) => (
                                    <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-50 border border-secondary-200/70 text-secondary-700 whitespace-nowrap">
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Full Prompt Chain */}
                  {result.full_prompt_chain && result.full_prompt_chain.length > 0 && (
                    <div className="mt-6 rounded-2xl bg-foreground-950 p-6">
                      <h4 className="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
                        <i className="ri-terminal-box-line text-secondary-400" />
                        Chaîne de Prompts LLM Complète
                      </h4>
                      <div className="rounded-lg bg-foreground-900 text-foreground-300 p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
                        {result.full_prompt_chain.map((prompt: string, i: number) => (
                          <div key={i} className="mb-2 last:mb-0">
                            <span className="text-[10px] text-secondary-400 font-bold block mb-0.5">ÉTAPE {i + 1}</span>
                            <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{prompt}</pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}