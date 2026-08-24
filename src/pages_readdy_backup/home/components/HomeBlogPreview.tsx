import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { resolveIdToSlug } from '@/data/articleSlugMap';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import OptimizedImage from '@/components/base/OptimizedImage';

const CATEGORY_COLORS: Record<string, string> = {
  'Gouvernance':            'bg-amber-50 text-amber-800 border border-amber-200',
  'Governance':             'bg-amber-50 text-amber-800 border border-amber-200',
  'Finance':                'bg-emerald-50 text-emerald-800 border border-emerald-200',
  'Entrepreneuriat':        'bg-orange-50 text-orange-800 border border-orange-200',
  'Entrepreneurship':       'bg-orange-50 text-orange-800 border border-orange-200',
  'Transformation digitale':'bg-teal-50 text-teal-800 border border-teal-200',
  'Digital Transformation': 'bg-teal-50 text-teal-800 border border-teal-200',
  'Politiques publiques':   'bg-violet-50 text-violet-800 border border-violet-200',
  'Public Policy':          'bg-violet-50 text-violet-800 border border-violet-200',
  'Ressources Humaines':    'bg-rose-50 text-rose-800 border border-rose-200',
  'Human Resources':        'bg-rose-50 text-rose-800 border border-rose-200',
  'Management':             'bg-teal-50 text-teal-800 border border-teal-200',
};

const POPULAR_THRESHOLD = 4000;

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return String(views);
}

function ReadTimeBadge({ readTime, isEn }: { readTime: string; isEn: boolean }) {
  const minutes = parseInt(readTime, 10) || 0;
  let colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (minutes >= 10 && minutes < 14) colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
  if (minutes >= 14) colorClass = 'bg-rose-50 text-rose-700 border-rose-200';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${colorClass}`}>
      <i className="ri-time-line" style={{ fontSize: '10px' }}></i>
      {readTime} {isEn ? 'read' : 'de lecture'}
    </span>
  );
}

export const HomeBlogPreview = memo(function HomeBlogPreview() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const articles = isEn ? blogArticlesEn : blogArticles;
  const latest = articles.slice(0, 4);
  const [featured, ...rest] = latest;

  const featuredIsPopular = (featured.views ?? 0) >= POPULAR_THRESHOLD;

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24" style={{ background: '#fafaf8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <BigFourSubtitleBar
                label={isEn ? 'Latest Articles' : 'Derniers Articles'}
                variant="minimal-dot"
                accentColor="primary"
              />
              <h2 className="section-title">
                Insights &amp; <span className="accent">Expertise</span>
              </h2>
              <p
                className="mt-3 max-w-xl"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: '#6b7280', lineHeight: 1.618, textAlign: 'justify', hyphens: 'auto' }}
              >
                {isEn
                  ? 'Analyses, practical advice and sector perspectives from our experts.'
                  : 'Analyses, conseils pratiques et perspectives sectorielles de nos experts.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/blog/')}
              className="whitespace-nowrap inline-flex items-center gap-2 text-sm font-semibold transition-colors group cursor-pointer min-h-[44px] py-2 rounded"
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#6B9B1F', fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#86BC25')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B9B1F')}
            >
              {isEn ? 'View all articles' : 'Voir tous les articles'}
              <div className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <i className="ri-arrow-right-line" />
              </div>
            </button>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Featured article */}
          <ScrollReveal animation="fadeSlideLeft" className="lg:col-span-3">
            <article
              onClick={() => navigate(`/blog/${resolveIdToSlug(featured.id) || featured.id}/`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col card-premium h-full"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blog/${resolveIdToSlug(featured.id) || featured.id}/`); } }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <OptimizedImage
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full"
                  aspectRatio="16/10"
                  objectFit="cover"
                  loading="lazy"
                  placeholder="shimmer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  {featuredIsPopular && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#86BC25' }}>
                      <i className="ri-fire-line text-xs" />
                      {isEn ? 'Popular' : 'Populaire'}
                    </span>
                  )}
                </div>

                {featured.views !== undefined && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                    <i className="ri-eye-line text-xs" />
                    <span>{formatViews(featured.views)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex items-center gap-2 flex-wrap mb-2.5">
                  <span className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{featured.date}</span>
                  <span className="text-gray-300 text-xs">·</span>
                  <ReadTimeBadge readTime={featured.readTime} isEn={isEn} />
                </div>
                <h3
                  className="font-bold leading-snug mb-3 transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', color: '#111827', letterSpacing: '-0.02em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#6B9B1F')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#111827')}
                >
                  {featured.title}
                </h3>
                <p
                  className="flex-1 line-clamp-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.618, textAlign: 'justify', hyphens: 'auto' }}
                >
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: '#6B9B1F', fontFamily: "'DM Sans', sans-serif" }}>
                  <span>{isEn ? 'Read article' : "Lire l'article"}</span>
                  <div className="w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* 3 smaller cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((article, idx) => {
              const isPopular = (article.views ?? 0) >= POPULAR_THRESHOLD;
              return (
                <ScrollReveal key={article.id} animation="fadeSlideRight" delay={idx * 80}>
                  <article
                    onClick={() => navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-300 flex gap-4 p-4 card-premium"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`); } }}
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <OptimizedImage
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full"
                        width={96}
                        height={96}
                        aspectRatio="1/1"
                        objectFit="cover"
                        loading="lazy"
                        placeholder="pulse"
                      />
                      {isPopular && (
                        <div className="absolute top-1 left-1">
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#86BC25' }}>
                            <i className="ri-fire-line" style={{ fontSize: '10px' }} />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                          {article.category}
                        </span>
                        <h3
                          className="font-semibold text-sm leading-snug line-clamp-2 transition-colors"
                          style={{ fontFamily: "'Syne', sans-serif", color: '#111827', letterSpacing: '-0.01em' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#6B9B1F')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#111827')}
                        >
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{article.date}</span>
                          <ReadTimeBadge readTime={article.readTime} isEn={isEn} />
                        </div>
                        {article.views !== undefined && (
                          <div className="flex items-center gap-1 text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            <i className="ri-eye-line" />
                            <span>{formatViews(article.views)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal animation="fadeSlideUp" delay={150}>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/blog/')}
              className="whitespace-nowrap inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300 cursor-pointer min-h-[44px] hover:scale-105"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'linear-gradient(135deg, #6B9B1F, #86BC25)',
                boxShadow: '0 4px 20px rgba(34,160,90,0.30)',
              }}
            >
              {isEn ? 'Explore all our articles' : 'Explorer tous nos articles'}
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </div>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
});



