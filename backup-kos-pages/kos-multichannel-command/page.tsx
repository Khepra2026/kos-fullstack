import { useState, useEffect, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { MULTICHANNEL_CONTENT, type MultichannelItem } from '@/mocks/multichannelContent';

const YOUTUBE_ENGINE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-youtube-master';

interface OAuthStatus {
  connected: boolean;
  verified: boolean;
  channel: {
    channel_id: string;
    handle: string;
    title: string;
  };
  token_valid: boolean;
}

interface QueueItem {
  id: number;
  title: string;
  status: string;
  post_type: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface PublishResult {
  success: boolean;
  published_count: number;
  results: Array<{
    queue_id: number;
    title: string;
    youtube_video_id?: string;
    youtube_url?: string;
    privacy_status: string;
    status: string;
    error?: string;
  }>;
  oauth_required?: boolean;
}

interface ChannelStats {
  total: number;
  published: number;
  drafts: number;
  scheduled: number;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function copyToClipboard(text: string, cb: () => void) {
  navigator.clipboard.writeText(text).then(cb);
}

const CHANNEL_CONFIG = {
  youtube: {
    name: 'YouTube',
    handle: '@KHEPRAEXPERTS',
    icon: 'ri-youtube-fill',
    color: '#FF0000',
    bgClass: 'bg-[#FF0000]/10',
    textClass: 'text-[#FF0000]',
    borderClass: 'border-[#FF0000]/20',
    hoverClass: 'hover:bg-[#FF0000]/20',
    fillClass: 'bg-[#FF0000]',
  },
  linkedin: {
    name: 'LinkedIn',
    handle: '@khepra-experts',
    icon: 'ri-linkedin-fill',
    color: '#0A66C2',
    bgClass: 'bg-[#0A66C2]/10',
    textClass: 'text-[#0A66C2]',
    borderClass: 'border-[#0A66C2]/20',
    hoverClass: 'hover:bg-[#0A66C2]/20',
    fillClass: 'bg-[#0A66C2]',
  },
  blog: {
    name: 'Blog / Site Web',
    handle: 'khepraexperts.com',
    icon: 'ri-global-line',
    color: '#059669',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-200',
    hoverClass: 'hover:bg-emerald-100',
    fillClass: 'bg-emerald-600',
  },
};

function generateLinkedInPost(item: MultichannelItem): string {
  const hook = item.youtube_script?.hook || '';
  const title = item.youtube_title;
  const cta = item.youtube_script?.cta || '';
  const tags = item.tags.slice(0, 5).map((t) => `#${t.replace(/\s+/g, '')}`).join(' ');

  return `${hook.split('.')[0]}.

${item.linkedin_hook || "J'ai analysé en profondeur ce sujet qui impacte directement les institutions financières en Afrique francophone."}

🎯 Points clés :

${(item.youtube_script?.sections || []).slice(1, 4).map((s, i) => `→ ${s.title} : ${s.script.split('.')[0]}.`).join('\n')}

📊 Mon analyse complète en vidéo : ${item.youtube_url || 'https://www.youtube.com/@KHEPRAEXPERTS'}

${cta.split('.')[0]}.

${tags}

🔗 Lien en commentaire 👇`;
}

function generateBlogArticle(item: MultichannelItem): { title: string; excerpt: string; content: string } {
  const sections = item.youtube_script?.sections || [];
  const title = item.youtube_title;
  const body = sections
    .map((s) => `## ${s.title}\n\n${s.script}\n\n*${s.visual_notes}*`)
    .join('\n\n');

  return {
    title,
    excerpt: sections[0]?.script?.split('.')[0] || '',
    content: `# ${title}\n\n${sections[0]?.script || ''}\n\n---\n\n${body}\n\n---\n\n**À propos de KHEPRA EXPERTS**\n\nCabinet de conseil leader en Afrique francophone — 22 ans d'expertise en gouvernance, conformité, audit, finance et stratégie.\n\n📞 Contact : contact@khepraexperts.com\n🌍 Site : https://khepraexperts.com`,
  };
}

export default function multichannelCommandPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'youtube' | 'linkedin' | 'blog'>('dashboard');
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [privacyStatus, setPrivacyStatus] = useState<'private' | 'unlisted' | 'public'>('private');

  const [channelStats] = useState<Record<string, ChannelStats>>({
    youtube: { total: 8, published: 3, drafts: 4, scheduled: 1 },
    linkedin: { total: 12, published: 6, drafts: 4, scheduled: 2 },
    blog: { total: 6, published: 2, drafts: 4, scheduled: 0 },
  });

  const checkStatus = useCallback(async () => {
    setLoadingStatus(true);
    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' }),
      });
      const data = await resp.json();
      setOauthStatus(data);
    } catch {
      // ignore
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  const loadQueue = useCallback(async () => {
    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list' }),
      });
      const data = await resp.json();
      if (data.posts) {
        setQueueItems(data.posts);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    checkStatus();
    loadQueue();
  }, [checkStatus, loadQueue]);

  const handlePublishYouTube = async () => {
    const drafts = queueItems.filter((i) => i.status === 'draft' || i.status === 'scheduled');
    if (drafts.length === 0) {
      setError('Aucun contenu YouTube en attente. Générez du contenu depuis le Studio Média.');
      return;
    }

    setPublishing(true);
    setPublishResult(null);
    setError(null);

    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', count: drafts.length, privacy_status: privacyStatus }),
      });
      const data = await resp.json();
      setPublishResult(data);
      if (data.success) await loadQueue();
      else if (data.oauth_required) setError('YouTube OAuth non connecté.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de publication');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyLinkedIn = (item: MultichannelItem) => {
    const post = generateLinkedInPost(item);
    copyToClipboard(post, () => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleShareLinkedIn = (item: MultichannelItem) => {
    const url = item.youtube_url
      ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.youtube_url)}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.youtube.com/@KHEPRAEXPERTS')}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleCopyBlog = (item: MultichannelItem) => {
    const article = generateBlogArticle(item);
    const full = `# ${article.title}\n\n${article.excerpt}\n\n${article.content}`;
    copyToClipboard(full, () => {
      setCopiedId(`blog-${item.id}`);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const contentItems = MULTICHANNEL_CONTENT;

  return (
    <hubLayout hubId={28}>
      <SeoHead
        title="KOS Multichannel Command™ — Publication YouTube, LinkedIn & Blog | KHEPRA EXPERTS"
        description="Cockpit de publication multicanale KOS : YouTube via OAuth 2.0, LinkedIn via copy 1-clic, Blog via articles SEO. Publiez sur 3 canaux depuis un seul écran."
        keywords="publication multicanale, YouTube, LinkedIn, blog, KOS Multichannel Command, KHEPRA EXPERTS"
        canonicalPath="/kos-multichannel-command"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #0A66C2 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
                <i className="ri-radar-line"></i>KOS Multichannel Command™
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
                Publication Multicanale — Un Seul Cockpit
              </h1>
              <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
                YouTube · LinkedIn · Blog — Générez une fois, publiez partout. Chaque contenu KOS est décliné automatiquement en 3 formats optimisés pour chaque canal. Zéro friction.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: 'YouTube OAuth', color: 'bg-[#FF0000]/20 text-[#FF0000]' },
                  { label: 'LinkedIn Copy 1-Clic', color: 'bg-[#0A66C2]/20 text-[#0A66C2]' },
                  { label: 'Blog Markdown', color: 'bg-emerald-500/20 text-emerald-400' },
                ].map((tag) => (
                  <span key={tag.label} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${tag.color}`}>
                    <i className="ri-check-line" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Nav */}
            <div className="flex items-center gap-2">
              <Link
                to="/youtube-connect"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-youtube-fill" />
                YouTube Connect
              </Link>
              <Link
                to="/kos-social-media-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-share-line" />
                Social Command
              </Link>
              <Link
                to="/kos-voice-ai-studio"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-mic-line" />
                Voice AI
              </Link>
              <Link
                to="/kos-community-manager-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-message-2-line" />
                Community
              </Link>
              <Link
                to="/kos-youtube-analytics"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-line-chart-line" />
                Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* Channel Stats Bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(CHANNEL_CONFIG).map(([key, cfg]) => {
                const stats = channelStats[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as typeof activeTab)}
                    className={`rounded-xl p-4 transition-all cursor-pointer text-left ${
                      activeTab === key
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-white/5 border border-white/5 hover:bg-white/8'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cfg.color}25` }}>
                        <i className={`${cfg.icon} text-lg`} style={{ color: cfg.color }} />
                      </div>
                      <div>
                        <span className="font-heading text-base font-bold text-white">{cfg.name}</span>
                        <span className="block text-xs text-gray-500">{cfg.handle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-gray-400">{stats.total} total</span>
                      <span className="text-emerald-400 font-semibold">{stats.published} publiés</span>
                      <span className="text-amber-400">{stats.drafts} brouillons</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Error / Success */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <i className="ri-error-warning-fill text-red-500 text-xl flex-shrink-0" />
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {[
              { id: 'dashboard', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
              { id: 'youtube', label: 'YouTube', icon: 'ri-youtube-fill' },
              { id: 'linkedin', label: 'LinkedIn', icon: 'ri-linkedin-fill' },
              { id: 'blog', label: 'Blog / Site', icon: 'ri-global-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ DASHBOARD VIEW ═══════════════════ */}
      {activeTab === 'dashboard' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Pipeline Pipeline */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Pipeline de Publication</h2>
              <p className="text-sm text-foreground-500 mb-6">Un contenu généré → 3 formats → 3 canaux</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {contentItems.map((item) => {
                  const isExpanded = expandedItem === item.id;
                  const ytCfg = CHANNEL_CONFIG.youtube;
                  const liCfg = CHANNEL_CONFIG.linkedin;
                  const blCfg = CHANNEL_CONFIG.blog;

                  return (
                    <div key={item.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden hover:border-background-300 transition-colors">
                      {/* Header */}
                      <div className="p-5 border-b border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-${item.status === 'published' ? 'emerald' : item.status === 'ready' ? 'amber' : 'gray'}-100 text-${item.status === 'published' ? 'emerald' : item.status === 'ready' ? 'amber' : 'gray'}-700`}>
                            {item.status === 'published' ? 'PUBLIÉ' : item.status === 'ready' ? 'PRÊT' : 'BROUILLON'}
                          </span>
                          <span className="text-[10px] font-semibold text-foreground-400 uppercase">{item.video_type?.replace(/_/g, ' ')}</span>
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground-950 mb-1 line-clamp-2">{item.youtube_title}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-2">{item.youtube_script?.hook}</p>
                      </div>

                      {/* Channel Status */}
                      <div className="p-5 space-y-3">
                        {/* YouTube */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${ytCfg.color}15` }}>
                              <i className={`${ytCfg.icon} text-sm`} style={{ color: ytCfg.color }} />
                            </div>
                            <span className="text-xs font-semibold text-foreground-700">YouTube</span>
                          </div>
                          {item.youtube_status === 'published' ? (
                            <a
                              href={item.youtube_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Voir
                            </a>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              À publier
                            </span>
                          )}
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${liCfg.color}15` }}>
                              <i className={`${liCfg.icon} text-sm`} style={{ color: liCfg.color }} />
                            </div>
                            <span className="text-xs font-semibold text-foreground-700">LinkedIn</span>
                          </div>
                          {item.linkedin_status === 'ready' ? (
                            <button
                              onClick={() => handleCopyLinkedIn(item)}
                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className={copiedId === item.id ? 'ri-check-line' : 'ri-file-copy-line'} />
                              {copiedId === item.id ? 'Copié' : 'Copier le post'}
                            </button>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                              -
                            </span>
                          )}
                        </div>

                        {/* Blog */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-emerald-50">
                              <i className={`${blCfg.icon} text-sm text-emerald-600`} />
                            </div>
                            <span className="text-xs font-semibold text-foreground-700">Blog</span>
                          </div>
                          {item.blog_status === 'ready' ? (
                            <button
                              onClick={() => handleCopyBlog(item)}
                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className={copiedId === `blog-${item.id}` ? 'ri-check-line' : 'ri-file-copy-line'} />
                              {copiedId === `blog-${item.id}` ? 'Copié' : 'Copier article'}
                            </button>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                              -
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expand */}
                      <div className="border-t border-background-100 px-5 py-3">
                        <button
                          onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                          className="flex items-center gap-1 text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer"
                        >
                          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
                          {isExpanded ? 'Réduire' : 'Voir les détails'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-100 space-y-4">
                          {/* YouTube Script Preview */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-foreground-400 tracking-wider">Script YouTube</span>
                            <div className="mt-1 rounded-lg bg-foreground-950 text-gray-300 p-3 max-h-[200px] overflow-y-auto">
                              <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                                {(item.youtube_script?.sections || []).map((s) => `[${s.duration}] ${s.title}\n${s.script}`).join('\n\n')}
                              </pre>
                            </div>
                          </div>

                          {/* LinkedIn Post Preview */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-foreground-400 tracking-wider">Post LinkedIn</span>
                            <div className="mt-1 rounded-lg bg-[#0A66C2]/5 border border-[#0A66C2]/10 p-3 max-h-[200px] overflow-y-auto">
                              <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap text-foreground-700">
                                {generateLinkedInPost(item)}
                              </pre>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleCopyLinkedIn(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#004182] cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-file-copy-line" />
                              Copier LinkedIn
                            </button>
                            <button
                              onClick={() => handleShareLinkedIn(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-share-forward-line" />
                              Partager LinkedIn
                            </button>
                            <button
                              onClick={() => handleCopyBlog(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-article-line" />
                              Copier article Blog
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cross-Channel Stats */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Statistiques Cross-Canal</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Contenus cross-canal', value: '8', icon: 'ri-stack-line', color: '#FF0000' },
                  { label: 'Publiés YouTube', value: '3', icon: 'ri-youtube-fill', color: '#FF0000' },
                  { label: 'Posts LinkedIn prêts', value: '6', icon: 'ri-linkedin-fill', color: '#0A66C2' },
                  { label: 'Articles Blog prêts', value: '4', icon: 'ri-article-line', color: '#059669' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-background-50">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg mb-2" style={{ backgroundColor: `${stat.color}15` }}>
                      <i className={`${stat.icon} text-lg`} style={{ color: stat.color }} />
                    </div>
                    <div className="font-heading text-2xl font-bold text-foreground-950">{stat.value}</div>
                    <div className="text-xs text-foreground-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ YOUTUBE VIEW ═══════════════════ */}
      {activeTab === 'youtube' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Connection Status */}
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center">
                    <i className="ri-youtube-fill text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground-950">@KHEPRAEXPERTS</h2>
                    {loadingStatus ? (
                      <span className="text-xs text-foreground-400">Vérification...</span>
                    ) : oauthStatus?.connected ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Connecté OAuth 2.0
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-600">Non connecté</span>
                    )}
                  </div>
                </div>
                <Link
                  to="/youtube-connect"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0000] text-white text-sm font-bold hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-settings-3-line" />
                  Gérer la connexion
                </Link>
              </div>

              {oauthStatus?.connected && (
                <div className="flex items-center gap-4">
                  <select
                    value={privacyStatus}
                    onChange={(e) => setPrivacyStatus(e.target.value as typeof privacyStatus)}
                    className="px-3 py-2 rounded-xl border border-background-200 text-sm font-bold text-foreground-700 bg-white cursor-pointer"
                  >
                    <option value="private">Privée</option>
                    <option value="unlisted">Non répertoriée</option>
                    <option value="public">Publique</option>
                  </select>
                  <button
                    onClick={handlePublishYouTube}
                    disabled={publishing || !oauthStatus?.connected}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {publishing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publication...
                      </>
                    ) : (
                      <>
                        <i className="ri-upload-cloud-line" />
                        Publier tous les brouillons
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Publish Results */}
            {publishResult && (
              <div className={`rounded-2xl p-5 border mb-6 ${
                publishResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <i className={`${publishResult.success ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-error-warning-fill text-red-500'} text-lg`} />
                  <h3 className="font-bold text-foreground-950">
                    {publishResult.success
                      ? `${publishResult.published_count} vidéo(s) publiée(s) sur YouTube`
                      : 'Erreur de publication'}
                  </h3>
                </div>
                {publishResult.results?.map((r) => (
                  <div key={r.queue_id} className={`flex items-center gap-3 p-3 rounded-xl ${
                    r.status === 'published' ? 'bg-white border border-emerald-200' : 'bg-white border border-red-200'
                  }`}>
                    <i className={`${r.status === 'published' ? 'ri-check-line text-emerald-500' : 'ri-close-line text-red-500'} text-lg`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground-950 truncate">{r.title}</p>
                      {r.youtube_url && (
                        <a href={r.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF0000] hover:underline truncate block">
                          {r.youtube_url}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Queue */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-5 border-b border-background-200">
                <h3 className="font-heading text-lg font-bold text-foreground-950">File d'attente YouTube</h3>
              </div>
              {queueItems.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-movie-line text-3xl text-foreground-300" />
                  </div>
                  <p className="text-sm text-foreground-500">Aucune vidéo dans la file d'attente</p>
                </div>
              ) : (
                <div className="divide-y divide-background-200">
                  {queueItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FF0000]/10 flex items-center justify-center flex-shrink-0">
                        <i className={`${item.status === 'published' ? 'ri-check-line text-emerald-500' : 'ri-time-line text-amber-500'} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground-950 truncate">{item.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {item.status === 'published' ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500">{formatDate(item.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ LINKEDIN VIEW ═══════════════════ */}
      {activeTab === 'linkedin' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center">
                  <i className="ri-linkedin-fill text-white text-xl" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground-950">LinkedIn — @khepra-experts</h2>
                  <p className="text-xs text-foreground-500">Posts générés automatiquement depuis les scripts YouTube. Copiez et publiez en 1 clic.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {contentItems.map((item) => {
                const linkedinPost = generateLinkedInPost(item);
                return (
                  <div key={item.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-5 bg-[#0A66C2]/5 border-b border-[#0A66C2]/10">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A66C2]/15 text-[#0A66C2]">LINKEDIN POST</span>
                        <span className="text-xs text-foreground-500">Depuis : {item.youtube_title.substring(0, 50)}...</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <pre className="text-sm text-foreground-700 leading-relaxed whitespace-pre-wrap font-sans">{linkedinPost}</pre>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => handleCopyLinkedIn(item)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            copiedId === item.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                          }`}
                        >
                          <i className={copiedId === item.id ? 'ri-check-line' : 'ri-file-copy-line'} />
                          {copiedId === item.id ? 'Copié !' : 'Copier le post'}
                        </button>
                        <button
                          onClick={() => handleShareLinkedIn(item)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-share-forward-line" />
                          Ouvrir LinkedIn Share
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ BLOG VIEW ═══════════════════ */}
      {activeTab === 'blog' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <i className="ri-global-line text-white text-xl" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground-950">Blog / Site Web — khepraexperts.com</h2>
                  <p className="text-xs text-foreground-500">Articles markdown générés depuis les scripts YouTube. Copiez et publiez sur le site.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {contentItems.map((item) => {
                const article = generateBlogArticle(item);
                return (
                  <div key={item.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-5 bg-emerald-50 border-b border-emerald-200">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">ARTICLE BLOG</span>
                        <span className="text-xs text-foreground-500">Format Markdown · SEO optimisé</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground-950 mt-2">{article.title}</h3>
                      <p className="text-sm text-foreground-600 mt-1">{article.excerpt}</p>
                    </div>
                    <div className="p-5">
                      <div className="rounded-lg bg-foreground-950 text-gray-300 p-4 max-h-[300px] overflow-y-auto">
                        <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{article.content}</pre>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => handleCopyBlog(item)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            copiedId === `blog-${item.id}`
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          <i className={copiedId === `blog-${item.id}` ? 'ri-check-line' : 'ri-file-copy-line'} />
                          {copiedId === `blog-${item.id}` ? 'Copié !' : 'Copier article Markdown'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 bg-foreground-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                Générez plus de contenu multicanale
              </h2>
              <p className="text-gray-400 text-sm">
                Studio Média → YouTube Publisher → KOS Multichannel Command. Une seule chaîne de production, 3 canaux de diffusion.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/kos-production-package-factory"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#c4a235' }}
              >
                <i className="ri-folder-open-line" />
                Package Factory
              </Link>
              <Link
                to="/studio-media"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-magic-line" />
                Studio Média
              </Link>
              <Link
                to="/kos-production-package-factory"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#c4a235' }}
              >
                <i className="ri-folder-open-line" />
                Package Factory
              </Link>
              <Link
                to="/youtube-connect"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-youtube-fill" />
                YouTube Connect
              </Link>
              <Link
                to="/kos-voice-ai-studio"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}
              >
                <i className="ri-mic-line" />
                Voice AI Studio
              </Link>
              <Link
                to="/kos-community-manager-command"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-message-2-line" />
                Community Manager
              </Link>
              <Link
                to="/kos-youtube-analytics"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#D97757' }}
              >
                <i className="ri-line-chart-line" />
                YouTube Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





