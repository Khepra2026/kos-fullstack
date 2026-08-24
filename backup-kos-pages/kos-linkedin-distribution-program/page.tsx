import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { LINKEDIN_DISTRIBUTION_PROGRAM, DISTRIBUTION_SCHEDULE_DAYS, type LinkedInPostDraft } from '@/mocks/linkedInDistributionProgram';

const program = LINKEDIN_DISTRIBUTION_PROGRAM;

function getPostTypeLabel(type: string) {
  switch (type) {
    case 'article_share': return { label: 'Partage Article', icon: 'ri-article-line', color: '#0A66C2' };
    case 'teaser': return { label: 'Teaser', icon: 'ri-fire-line', color: '#EA580C' };
    case 'insight_snippet': return { label: 'Insight Data', icon: 'ri-lightbulb-line', color: '#059669' };
    case 'framework_highlight': return { label: 'Framework', icon: 'ri-stack-line', color: '#BE123C' };
    case 'cta_promo': return { label: 'CTA Lead Gen', icon: 'ri-rocket-line', color: '#DC2626' };
    default: return { label: 'Post', icon: 'ri-share-line', color: '#0A66C2' };
  }
}

function getPhaseColor(phase: string) {
  if (phase.includes('Phase 1')) return { bg: 'bg-[#0A66C2]/5', border: 'border-[#0A66C2]/20', text: 'text-[#0A66C2]', dot: 'bg-[#0A66C2]' };
  if (phase.includes('Phase 2')) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' };
  if (phase.includes('Phase 3')) return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500' };
}

export default function linkedInDistributionProgram() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [articleFilter, setArticleFilter] = useState<string>('all');

  const filteredPosts = articleFilter === 'all'
    ? program.posts
    : program.posts.filter(p => p.articleId === articleFilter);

  const copyPost = async (post: LinkedInPostDraft) => {
    try {
      await navigator.clipboard.writeText(post.postContent);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = post.postContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const shareOnLinkedIn = (post: LinkedInPostDraft) => {
    const url = `https://khepraexperts.com${post.articleUrl}`;
    const text = encodeURIComponent(post.postContent.split('\n\n')[0]);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${text}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  const articleColors: Record<string, { color: string; bg: string; border: string }> = {
    'lm-1': { color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    'lm-2': { color: '#0D7B5F', bg: 'bg-teal-50', border: 'border-teal-200' },
    'lm-3': { color: '#BE123C', bg: 'bg-[#BE123C]/5', border: 'border-[#BE123C]/20' },
    'lm-4': { color: '#EA580C', bg: 'bg-orange-50', border: 'border-orange-200' },
    'lm-5': { color: '#9B7B2C', bg: 'bg-amber-50', border: 'border-amber-200' },
    'lm-6': { color: '#86BC25', bg: 'bg-lime-50', border: 'border-lime-200' },
    'lm-7': { color: '#6D28D9', bg: 'bg-purple-50', border: 'border-purple-200' },
    'lm-8': { color: '#DC2626', bg: 'bg-red-50', border: 'border-red-200' },
  };

  return (
    <>
      <SeoHead
        title="LinkedIn Distribution Program — 8 Lead Magnets Ultra-Conversion | KHEPRA EXPERTS"
        description="Programme de distribution LinkedIn S26/S27 : 8 Lead Magnets, 17 posts, 46 300+ reach estimé. Guide BCEAO, Checklist Conformité, Diagnostic Flash, Levée de Fonds, Due Diligence, ESG, Gouvernance, Simulation Risque."
        keywords="LinkedIn distribution, lead magnets, content distribution, KHEPRA EXPERTS, BCEAO, conformité, levée de fonds, ESG, due diligence, gouvernance"
        canonicalPath="/kos-linkedin-distribution-program"
        ogType="website"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground-950">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Abstract%20professional%20social%20media%20distribution%20concept%20with%20flowing%20network%20nodes%20and%20LinkedIn%20blue%20gradient%20elements%20representing%20content%20amplification%20in%20African%20financial%20consulting%20context%2C%20dark%20sophisticated%20background%20with%20subtle%20connection%20lines%2C%20no%20text%2C%20no%20people%2C%20modern%20editorial%20illustration&width=1920&height=500&seq=li-dist-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/30 backdrop-blur-sm mb-6">
                <i className="ri-linkedin-fill text-[#0A66C2] text-sm" />
                <span className="text-sm font-bold text-[#0A66C2] uppercase tracking-wider">
                  LinkedIn Distribution Program
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                Distribution LinkedIn.{' '}
                <span className="block text-[#0A66C2] mt-2">8 lead magnets. 17 posts. 3 phases.</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
                Programme de distribution LinkedIn optimisé pour les 8 Lead Magnets Ultra-Conversion S26/S27.{' '}
                <strong className="text-white">46 300+ reach estimé</strong>,{' '}
                <strong className="text-white">2 350 engagements</strong> attendus.{' '}
                Posts pré-formatés avec hashtags stratégiques sectoriels.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                  <span className="text-sm text-[#0A66C2] font-semibold">{program.kpis.totalPosts} Posts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="text-sm text-emerald-300 font-semibold">{program.kpis.totalArticles} Articles</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="text-sm text-amber-300 font-semibold">3 Phases</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="text-sm text-red-300 font-semibold">{program.kpis.estimatedTotalReach.toLocaleString()}+ Reach</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPIs Bar */}
        <section className="py-6 bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Posts Programmes', value: String(program.kpis.totalPosts), icon: 'ri-send-plane-line', color: '#0A66C2' },
                { label: 'Articles Couverts', value: String(program.kpis.totalArticles), icon: 'ri-article-line', color: '#BE123C' },
                { label: 'Reach Estimé', value: (program.kpis.estimatedTotalReach / 1000).toFixed(1) + 'K', icon: 'ri-eye-line', color: '#059669' },
                { label: 'Engagement Est.', value: program.kpis.estimatedTotalEngagement.toLocaleString(), icon: 'ri-thumb-up-line', color: '#EA580C' },
                { label: 'Taux Engagement', value: program.kpis.avgEngagementRate + '%', icon: 'ri-bar-chart-line', color: '#DC2626' },
                { label: 'Hashtags Uniques', value: String(program.kpis.hashtagsUsed), icon: 'ri-hashtag', color: '#9B7B2C' },
                { label: 'Meilleur Jour', value: program.kpis.bestDays[0], icon: 'ri-calendar-check-line', color: '#86BC25' },
                { label: 'Phases', value: '3', icon: 'ri-stack-line', color: '#8B3040' },
              ].map((stat, i) => (
                <div key={i} className="text-center py-3 px-2 rounded-lg bg-white border border-background-200/70">
                  <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                  <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                  <span className="text-[10px] text-foreground-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Timeline */}
        <section className="py-10 md:py-14 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">Calendrier de Distribution — 7 Jours</h2>
              <p className="text-foreground-600">3 phases de publication, du 29 juin au 6 juillet 2026</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-background-200/70 hidden lg:block" style={{ transform: 'translateX(-50%)' }} />
              <div className="space-y-6">
                {DISTRIBUTION_SCHEDULE_DAYS.map((day, i) => {
                  const phaseStyle = getPhaseColor(day.phase);
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={day.date} className={`relative flex flex-col lg:flex-row items-start gap-4 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      <div className={`flex-1 ${isLeft ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                        <div className={`p-4 rounded-xl ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-md bg-white border border-background-200/70`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${phaseStyle.bg} ${phaseStyle.text} border ${phaseStyle.border}`}>
                              {day.phase}
                            </span>
                            <span className="text-xs text-foreground-400">{day.posts} post{day.posts > 1 ? 's' : ''}</span>
                          </div>
                          <h3 className="font-bold text-foreground-950 text-sm mb-1">{day.articles.join(' + ')}</h3>
                          <div className="flex items-center gap-2 text-xs text-foreground-500">
                            <i className="ri-calendar-line" />
                            <span>{new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:flex absolute left-1/2 w-4 h-4 rounded-full border-2 border-background-200 bg-white" style={{ transform: 'translate(-50%, 20px)', zIndex: 10 }}>
                        <div className={`w-2 h-2 rounded-full m-auto ${phaseStyle.dot}`} />
                      </div>
                      <div className="flex-1 hidden lg:block" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Phases Overview */}
        <section className="py-10 md:py-14 bg-background-100 border-t border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">Les 3 Phases de Distribution</h2>
              <p className="text-foreground-600">Une stratégie en escalier : lancement → amplification → lead generation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.schedule.map((phase) => {
                const phaseStyle = getPhaseColor(phase.phase);
                return (
                  <div key={phase.phase} className={`p-6 rounded-2xl border ${phaseStyle.border} ${phaseStyle.bg} relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-full h-1 ${phaseStyle.dot}`} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${phaseStyle.bg} border ${phaseStyle.border} flex items-center justify-center`}>
                        <i className={`text-lg ${phaseStyle.text} ${phase.phase.includes('Phase 1') ? 'ri-rocket-line' : phase.phase.includes('Phase 2') ? 'ri-megaphone-line' : 'ri-treasure-map-line'}`} />
                      </div>
                      <div>
                        <h3 className={`font-heading text-sm font-bold ${phaseStyle.text}`}>{phase.phase}</h3>
                        <p className="text-xs text-foreground-400">{phase.startDate} → {phase.endDate}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-600">Posts / Semaine</span>
                        <span className="font-bold text-foreground-950">{phase.postsPerWeek}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-600">Total Posts</span>
                        <span className="font-bold text-foreground-950">{phase.totalPosts}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground-600">Types</span>
                        <span className="font-bold text-foreground-950">
                          {phase.phase.includes('Phase 1') ? 'Article Share' : phase.phase.includes('Phase 2') ? 'Insight Snippet' : 'Framework + CTA'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Articles Covered */}
        <section className="py-10 md:py-14 bg-background-50 border-t border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">Les 8 Lead Magnets du Programme</h2>
              <p className="text-foreground-600">Lead magnets ultra-conversion S26/S27 — LI-LEADMAGNET-2026-S26</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {program.articles.map((article) => {
                const colors = articleColors[article.id] || { color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' };
                const postCount = program.posts.filter(p => p.articleId === article.id).length;
                const articleReach = program.posts.filter(p => p.articleId === article.id).reduce((sum, p) => sum + p.expectedReach, 0);
                return (
                  <Link
                    key={article.id}
                    to={`/lead-magnets/${article.slug}`}
                    className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} hover:shadow-md transition-all cursor-pointer block`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.color}20` }}>
                        <i className="ri-article-line text-lg" style={{ color: colors.color }} />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold border" style={{ color: colors.color, borderColor: colors.color, backgroundColor: `${colors.color}10` }}>
                        {postCount} posts
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground-950 text-sm mb-2 line-clamp-3 leading-snug">{article.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-foreground-500">
                      <i className="ri-user-line" />
                      <span>{article.author}</span>
                      <span className="text-foreground-300">·</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-foreground-400">
                      <i className="ri-eye-line" />
                      <span>Reach estimé : {articleReach.toLocaleString()}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Posts Drafts — Filterable Grid */}
        <section className="py-10 md:py-14 bg-background-100 border-t border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-1 font-heading">Posts LinkedIn — Prêts à Publier</h2>
                <p className="text-foreground-600">9 posts pré-formatés, copiables en 1 clic, hashtags stratégiques inclus</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Filtrer :</span>
                <button
                  onClick={() => setArticleFilter('all')}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${articleFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}
                >
                  Tout ({program.posts.length})
                </button>
                {program.articles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setArticleFilter(a.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${articleFilter === a.id ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}
                  >
                    {a.id === 'lm-1' ? 'Guide BCEAO' : a.id === 'lm-2' ? 'Checklist' : a.id === 'lm-3' ? 'Diag. Flash' : a.id === 'lm-4' ? 'Levée Fonds' : a.id === 'lm-5' ? 'Due Dil.' : a.id === 'lm-6' ? 'ESG' : a.id === 'lm-7' ? 'Gouvernance' : 'Sim. Risque'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredPosts.map((post) => {
                const typeStyle = getPostTypeLabel(post.postType);
                const articleColor = articleColors[post.articleId] || articleColors['article-9'];
                const isExpanded = expandedPost === post.id;
                const isCopied = copiedId === post.id;
                const displayContent = isExpanded ? post.postContent : post.postContent.slice(0, 200) + '...';

                return (
                  <div key={post.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden hover:shadow-md transition-all">
                    {/* Post header */}
                    <div className="p-4 border-b border-background-200/70 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${typeStyle.color}15`, color: typeStyle.color, borderColor: `${typeStyle.color}30`, borderWidth: '1px' }}>
                          <i className={`${typeStyle.icon} mr-1`} />
                          {typeStyle.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${articleColor.color}10`, color: articleColor.color, borderColor: `${articleColor.color}20`, borderWidth: '1px' }}>
                          {post.articleId === 'lm-1' ? 'BCEAO' : post.articleId === 'lm-2' ? 'Checklist' : post.articleId === 'lm-3' ? 'Diag Flash' : post.articleId === 'lm-4' ? 'Levée' : post.articleId === 'lm-5' ? 'Due Dil' : post.articleId === 'lm-6' ? 'ESG' : post.articleId === 'lm-7' ? 'Gouv' : 'Sim Risque'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground-400">
                        <span>{post.characterCount} car.</span>
                        <span>·</span>
                        <span>Reach ~{post.expectedReach.toLocaleString()}</span>
                        <span>·</span>
                        <span>Eng. ~{post.expectedEngagement}</span>
                      </div>
                    </div>

                    {/* Post content */}
                    <div className="p-4">
                      <div className="text-sm text-foreground-700 leading-relaxed whitespace-pre-line mb-3">
                        {displayContent}
                      </div>
                      {post.postContent.length > 200 && (
                        <button
                          onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          className="text-xs text-[#0A66C2] hover:text-[#004182] font-medium cursor-pointer mb-3 whitespace-nowrap"
                        >
                          {isExpanded ? 'Voir moins' : 'Voir le post complet'}
                        </button>
                      )}

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.hashtags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/5 text-[#0A66C2] border border-[#0A66C2]/10">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Best time slots */}
                      <div className="flex items-center gap-2 mb-4 text-xs text-foreground-400 flex-wrap">
                        <i className="ri-timer-line" />
                        {post.bestTimeSlots.slice(0, 2).map((slot, i) => (
                          <span key={i} className="text-foreground-600">
                            {slot.day} {slot.time.replace(' UTC', '')}
                            {i < Math.min(post.bestTimeSlots.length, 2) - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>

                      {/* Target audience */}
                      <div className="text-[10px] text-foreground-400 mb-4 flex items-center gap-1">
                        <i className="ri-user-settings-line" />
                        <span>{post.targetAudience}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-3 border-t border-background-200/70">
                        <button
                          onClick={() => copyPost(post)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                            isCopied
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white border border-background-200 text-foreground-700 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                          }`}
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className={`text-sm ${isCopied ? 'ri-check-line' : 'ri-file-copy-line'}`} />
                          </div>
                          {isCopied ? 'Copié !' : 'Copier le post'}
                        </button>
                        <button
                          onClick={() => shareOnLinkedIn(post)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-bold cursor-pointer transition-all whitespace-nowrap"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-linkedin-fill" />
                          </div>
                          Partager
                        </button>
                        <Link
                          to={`/lead-magnets/${post.articleSlug}`}
                          className="flex items-center gap-1 text-xs text-foreground-400 hover:text-foreground-700 transition-colors cursor-pointer whitespace-nowrap ml-auto"
                        >
                          Lead Magnet
                          <i className="ri-arrow-right-line text-[10px]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-foreground-950">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
              Prêt à amplifier votre visibilité LinkedIn ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ce programme de distribution est le premier d'une série. KHEPRA EXPERTS automatise la syndication de vos articles sur LinkedIn avec des posts optimisés pour l'engagement, des hashtags stratégiques et des créneaux de publication à fort impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kos-blog-writing-automates"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-amber-400 hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-robot-line" />
                Voir les Automates Blog
              </Link>
              <Link
                to="/lead-magnets"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line" />
                Explorer les Lead Magnets
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}





