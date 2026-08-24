import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ShareButtons } from '@/pages/blog/components/ShareButtons';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { buildArticleHreflang } from '@/utils/hreflang';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogArticleSeoProps {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  hreflangSlug?: string;
  ogUrl: string;
  ogImage: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
  ogLocale?: string;
  twitterLabel1?: string;
  twitterData1?: string;
  twitterLabel2?: string;
  twitterData2?: string;
}

export interface BlogArticleRelatedArticle {
  href: string;
  title: string;
  category: string;
  readTime: string;
  image?: string;
  seq?: number;
}

export interface BlogArticleLayoutProps {
  seo: BlogArticleSeoProps;
  heroImage: string;
  heroAlt: string;
  heroHeight?: string;
  breadcrumbHome: string;
  breadcrumbBlog: string;
  breadcrumbCurrent: string;
  heroBadges?: ReactNode;
  heroTitle: ReactNode;
  heroSubtitle?: string;
  heroOverlayExtra?: ReactNode;
  authorName: string;
  authorTitle: string;
  authorImage?: string;
  date: string;
  readTime: string;
  tags?: string[];
  excerpt?: string;
  excerptBorderColor?: string;
  articleUrl: string;
  shareTitle: string;
  shareExcerpt: string;
  schemaJson?: any[];
  sidebar?: ReactNode;
  relatedArticles?: BlogArticleRelatedArticle[];
  relatedTitle?: string;
  children: ReactNode;
}

// ─── Section Heading (shared sub-component) ───────────────────────────────────

export function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <h2
      id={id}
      className="font-playfair text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
    >
      <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
        {number}
      </span>
      {title}
    </h2>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function BlogArticleLayout({
  seo,
  heroImage,
  heroAlt,
  heroHeight = '520px',
  breadcrumbHome,
  breadcrumbBlog,
  breadcrumbCurrent,
  heroBadges,
  heroTitle,
  heroSubtitle,
  heroOverlayExtra,
  authorName,
  authorTitle,
  authorImage,
  date,
  readTime,
  tags,
  excerpt,
  excerptBorderColor,
  articleUrl,
  shareTitle,
  shareExcerpt,
  schemaJson,
  sidebar,
  relatedArticles,
  relatedTitle,
  children,
}: BlogArticleLayoutProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalPath={seo.canonicalPath}
        hreflangLinks={seo.hreflangSlug ? buildArticleHreflang(seo.hreflangSlug, isEn ? 'en' : 'fr') : undefined}
        ogUrl={seo.ogUrl}
        ogType="article"
        ogImage={seo.ogImage}
        ogImageWidth={seo.ogImageWidth}
        ogImageHeight={seo.ogImageHeight}
        ogImageAlt={seo.ogImageAlt}
        articlePublishedTime={seo.articlePublishedTime}
        articleModifiedTime={seo.articleModifiedTime}
        articleAuthor={seo.articleAuthor}
        articleSection={seo.articleSection}
        articleTags={seo.articleTags}
        ogLocale={seo.ogLocale ?? (isEn ? 'en_US' : 'fr_FR')}
        schemaJson={schemaJson}
        twitterLabel1={seo.twitterLabel1}
        twitterData1={seo.twitterData1}
        twitterLabel2={seo.twitterLabel2}
        twitterData2={seo.twitterData2}
      />

      <Navigation />

      {/* ── Hero ── */}
      <div className="relative pt-20 overflow-hidden" style={{ height: heroHeight }}>
        <img
          src={heroImage}
          alt={heroAlt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1400}
          height={520}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
        {heroOverlayExtra}

        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb
            variant="light"
            items={[
              { label: breadcrumbHome, href: '/' },
              { label: breadcrumbBlog, href: '/blog/' },
              { label: breadcrumbCurrent },
            ]}
          />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          {heroBadges && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {heroBadges}
            </div>
          )}
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg mb-2">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="text-white/80 text-sm leading-relaxed max-w-3xl">{heroSubtitle}</p>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Article ── */}
          <main className="flex-1 min-w-0" id="main-content">

            {/* Meta line */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-secondary-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-300 flex-shrink-0">
                  <img
                    src={authorImage || 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg'}
                    alt={authorName}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">{authorName}</p>
                  <p className="text-xs text-foreground-500">{authorTitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-500 ml-auto">
                <span className="flex items-center gap-1.5">
                  <i className="ri-calendar-line text-accent-500"></i>
                  {date}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-time-line text-accent-500"></i>
                  {readTime}
                </span>
              </div>
            </div>

            {/* Excerpt */}
            {excerpt && (
              <p
                className="text-lg text-foreground-700 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic"
                style={excerptBorderColor ? { borderColor: excerptBorderColor } : { borderColor: '#c9a227' }}
              >
                {excerpt}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-foreground-700 border border-secondary-200">
                    <i className="ri-price-tag-3-line text-xs text-accent-500"></i>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ─── Article content (children) ─── */}
            {children}

            {/* ─── Share ─── */}
            <div className="mt-12 pt-8 border-t border-secondary-200">
              <SocialSharePremium
                url={articleUrl}
                title={shareTitle}
                description={shareExcerpt}
                variant="compact"
                className="mb-5"
              />
              <div className="border-t border-secondary-200 pt-5">
                <ShareButtons
                  url={articleUrl}
                  title={shareTitle}
                  excerpt={shareExcerpt}
                  isEn={isEn}
                />
              </div>
            </div>

            {/* ─── Related articles ─── */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="mt-12 pt-8 border-t border-secondary-200">
                <h3 className="font-playfair text-xl font-bold text-foreground-950 mb-6">
                  {relatedTitle || (isEn ? 'Related articles' : 'Articles connexes')}
                </h3>
                <div className={`grid grid-cols-1 ${relatedArticles.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
                  {relatedArticles.map((rel, i) => (
                    <a
                      key={i}
                      href={rel.href}
                      onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                      className="flex gap-3 group cursor-pointer bg-background-50 rounded-xl border border-secondary-200 p-3 hover:border-accent-200 hover:shadow-md transition-all"
                    >
                      {rel.image && (
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-secondary-100">
                          <img
                            src={rel.image}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            width={64}
                            height={48}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold mb-1 block text-accent-600">{rel.category}</span>
                        <p className="text-xs font-semibold text-foreground-950 line-clamp-2 group-hover:text-accent-700 transition-colors leading-snug">{rel.title}</p>
                        <span className="text-xs text-foreground-400 mt-1 block">{rel.readTime}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* ── Sidebar ── */}
          {sidebar && (
            <aside className="lg:w-80 flex-shrink-0 space-y-6">
              <div className="sticky top-28 space-y-6">
                {sidebar}
              </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}



