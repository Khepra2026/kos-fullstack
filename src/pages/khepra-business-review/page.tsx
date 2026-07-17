import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { kbrArticles, kbrCategories, KBRArticle } from '@/mocks/khepraBusinessReview';
import { trackEvent } from '@/utils/analytics';
import { useKbrReadingTracker } from '@/hooks/useKbrReadingTracker';
import ArticleCard from './components/ArticleCard';
import KBRArticleModal from './components/KBRArticleModal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = 'https://khepraexperts.com';

export default function KhepraBusinessReviewPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const currentLang = isEn ? 'en-US' : 'fr-FR';
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KBRArticle | null>(null);
  const modalOpenTime = useRef<number>(0);

  // ── Supabase reading tracker (parallel to GA4) ──
  const { trackReading } = useKbrReadingTracker();

  // Lecture du paramètre URL ?article=slug au chargement initial (liens directs)
  useEffect(() => {
    const articleSlug = searchParams.get('article');
    if (articleSlug && !selectedArticle) {
      const article = kbrArticles.find((a) => a.slug === articleSlug);
      if (article) {
        setSelectedArticle(article);
        document.body.style.overflow = 'hidden';
        modalOpenTime.current = Date.now();
        trackEvent('kbr_article_read_direct', {
          article_id: article.id,
          article_slug: article.slug,
          article_title: article.title,
          article_category: article.category,
          source: 'direct_link',
        });
        trackReading({
          article_id: String(article.id),
          article_slug: article.slug,
          article_title: article.title,
          article_category: article.category,
          article_edition: article.edition,
          article_reading_time: article.readingTime,
          article_author: article.author,
          event_type: 'direct_link',
          source: 'url_param',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenArticle = useCallback((article: KBRArticle) => {
    setSelectedArticle(article);
    setSearchParams({ article: article.slug }, { replace: true });
    document.body.style.overflow = 'hidden';
    modalOpenTime.current = Date.now();
    trackEvent('kbr_article_read', {
      article_id: article.id,
      article_slug: article.slug,
      article_title: article.title,
      article_category: article.category,
      article_edition: article.edition,
      article_reading_time: article.readingTime,
      article_author: article.author,
    });
    trackReading({
      article_id: String(article.id),
      article_slug: article.slug,
      article_title: article.title,
      article_category: article.category,
      article_edition: article.edition,
      article_reading_time: article.readingTime,
      article_author: article.author,
      event_type: 'read',
      source: 'article_open',
    });
  }, [setSearchParams, trackReading]);

  const handleCloseModal = useCallback(() => {
    if (selectedArticle && modalOpenTime.current > 0) {
      const timeSpent = Math.round((Date.now() - modalOpenTime.current) / 1000);
      trackEvent('kbr_article_close', {
        article_id: selectedArticle.id,
        article_slug: selectedArticle.slug,
        article_title: selectedArticle.title,
        article_category: selectedArticle.category,
        time_spent_seconds: timeSpent,
        engagement_level: timeSpent > 120 ? 'deep' : timeSpent > 30 ? 'medium' : 'shallow',
      });
      trackReading({
        article_id: String(selectedArticle.id),
        article_slug: selectedArticle.slug,
        article_title: selectedArticle.title,
        article_category: selectedArticle.category,
        article_edition: selectedArticle.edition,
        article_reading_time: selectedArticle.readingTime,
        article_author: selectedArticle.author,
        event_type: 'close',
        source: 'handleCloseModal',
      });
      modalOpenTime.current = 0;
    }
    setSelectedArticle(null);
    setSearchParams({}, { replace: true });
    document.body.style.overflow = '';
  }, [selectedArticle, setSearchParams, trackReading]);

  const handleCategoryChange = useCallback((catKey: string) => {
    setActiveCategory(catKey);
    setSearchQuery('');
    if (catKey !== 'all') {
      const cat = kbrCategories.find((c) => c.key === catKey);
      trackEvent('kbr_filter_category', {
        category_key: catKey,
        category_label: cat ? (isEn ? (cat.labelEn || cat.labelFr) : cat.labelFr) : catKey,
      });
    }
  }, [isEn]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      trackEvent('kbr_search', { query, results_count: 0 });
    }
  }, []);

  const featuredArticle = kbrArticles.find((a) => a.featured) || kbrArticles[0];

  const filteredArticles = useMemo(() => {
    let articles = kbrArticles;
    if (activeCategory !== 'all') {
      articles = articles.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.abstract.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return articles;
  }, [activeCategory, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
      },
      {
        '@type': 'Periodical',
        '@id': `${SITE_URL}/khepra-business-review#periodical`,
        name: 'Khepra Business Review',
        issn: '3000-000X',
        publisher: { '@id': `${SITE_URL}/#organization` },
        description: isEn
          ? 'Premium economic and regulatory analysis for Francophone Africa. Big Four quality, Harvard Business Review standard. Published by Khepra Experts.'
          : "Analyse économique et réglementaire premium pour l'Afrique francophone. Qualité Big Four, standard Harvard Business Review. Publié par Khepra Experts.",
        inLanguage: currentLang,
        url: `${SITE_URL}/khepra-business-review`,
        image: 'https://readdy.ai/api/search-image?query=Premium%20business%20review%20publication%20cover%20design%20dark%20green%20and%20gold%20color%20palette%2C%20sophisticated%20editorial%20layout%2C%20Harvard%20Business%20Review%20style%2C%20African%20economic%20analysis%2C%20professional%20financial%20publication%20with%20elegant%20typography&width=1200&height=630&seq=kbr-og-main&orientation=landscape',
      },
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/khepra-business-review#webpage`,
        url: `${SITE_URL}/khepra-business-review`,
        name: isEn ? 'Khepra Business Review — Premium African Economic Analysis' : 'Khepra Business Review — Analyse Économique Africaine Premium',
        description: isEn
          ? '16 in-depth articles on finance, governance, compliance, digital transformation and ESG in Francophone Africa. Big Four quality analysis.'
          : "16 articles de fond sur la finance, la gouvernance, la conformité, la transformation digitale et l'ESG en Afrique francophone. Analyses qualité Big Four.",
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/khepra-business-review#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/khepra-business-review#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL + '/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Khepra Business Review',
            item: `${SITE_URL}/khepra-business-review`,
          },
        ],
      },
      ...kbrArticles.slice(0, 6).map((article, idx) => ({
        '@type': 'Article',
        '@id': `${SITE_URL}/khepra-business-review#article-${article.id}`,
        headline: article.title,
        description: article.abstract,
        author: { '@type': 'Person', name: article.author, description: article.authorCredentials },
        publisher: { '@id': `${SITE_URL}/#organization` },
        datePublished: article.date,
        inLanguage: currentLang,
        url: `${SITE_URL}/khepra-business-review`,
        image: article.image,
        articleSection: article.category,
        wordCount: article.readingTime * 200,
        about: article.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
        position: idx + 1,
      })),
    ],
  };

  const handleNewsletterSubmit = useCallback(() => {
    trackEvent('kbr_newsletter_signup', { source: 'kbr_page' });
  }, []);

  return (
    <>
      <SeoHead
        title={
          isEn
            ? 'Khepra Business Review — African Financial Analysis UEMOA'
            : 'Khepra Business Review — Analyses Financières Afrique UEMOA'
        }
        description={
          isEn
            ? 'Khepra Business Review: financial analysis, BCEAO/COBAC compliance, governance & ESG across Francophone Africa. 16 in-depth Big Four quality studies.'
            : "Khepra Business Review : analyses financières, conformité BCEAO/COBAC, gouvernance et ESG en Afrique francophone. 16 études de fond, qualité Big Four."
        }
        keywords={
          isEn
            ? 'Khepra Business Review, African economic analysis, BCEAO compliance, COBAC regulation, UEMOA finance, CEMAC banking, governance Africa, ESG Africa, digital transformation Africa, Fintech Francophone Africa, Big Four quality analysis'
            : 'Khepra Business Review, analyse économique Afrique, conformité BCEAO, régulation COBAC, finance UEMOA, banque CEMAC, gouvernance Afrique, ESG Afrique, transformation digitale Afrique, Fintech Afrique francophone, analyse qualité Big Four'
        }
        canonicalPath="/khepra-business-review"
        ogType="website"
        ogImage="https://readdy.ai/api/search-image?query=Premium%20business%20review%20publication%20cover%20design%20dark%20green%20and%20gold%20color%20palette%2C%20sophisticated%20editorial%20layout%2C%20Harvard%20Business%20Review%20style%2C%20African%20economic%20analysis%2C%20professional%20financial%20publication%20with%20elegant%20typography&width=1200&height=630&seq=kbr-og-main&orientation=landscape"
        ogImageAlt="Khepra Business Review — Analyse Économique Africaine Premium"
        ogImageWidth={1200}
        ogImageHeight={630}
        structuredData={jsonLd}
        twitterLabel1={isEn ? 'Khepra Business Review' : 'Khepra Business Review'}
        twitterData1="16"
        twitterLabel2={isEn ? 'Expert articles' : "Articles d'experts"}
        twitterData2="250+"
      />

      <Navigation />

      <div className="min-h-screen bg-background-50">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', href: '/' },
            {
              label: 'Khepra Business Review',
              href: '/khepra-business-review',
            },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-foreground-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06] bg-gradient-radial from-primary-400 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04] bg-gradient-radial from-accent-400 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pt-32 md:pb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <BigFourSubtitleBar
                label={isEn ? 'Big Four Quality' : 'Qualité Big Four'}
                variant="left-accent"
                accentColor="primary"
              />
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-foreground-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-400">
                {isEn ? 'Francophone Africa' : 'Afrique Francophone'}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl">
              Khepra Business{' '}
              <span className="block text-primary-400 mt-2">Review</span>
            </h1>
            <p className="text-base md:text-xl text-foreground-300 leading-relaxed mb-8 max-w-2xl">
              {isEn
                ? 'The premier publication for economic, financial and regulatory analysis in Francophone Africa. Big Four rigor, Harvard Business Review standard.'
                : "La publication de référence pour l'analyse économique, financière et réglementaire en Afrique francophone. Rigueur Big Four, standard Harvard Business Review."}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/15 text-primary-400 border border-primary-500/30">
                <i className="ri-check-double-line mr-1.5" />
                {isEn ? 'Triple Ancrage ISO + Institutional + Local' : 'Triple Ancrage ISO + Institutionnel + Local'}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-500/15 text-accent-400 border border-accent-500/30">
                <i className="ri-brain-line mr-1.5" />Pyramide de Minto
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary-500/15 text-secondary-400 border border-secondary-500/30">
                <i className="ri-fingerprint-line mr-1.5" />Data Lineage
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground-800 text-foreground-300 border border-foreground-700">
                <i className="ri-article-line mr-1.5" />
                {isEn ? '16 In-Depth Articles' : '16 Articles de Fond'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-foreground-800/50">
              {[
                { value: '16', label: isEn ? 'Expert Articles' : "Articles d'Experts" },
                { value: '4', label: isEn ? 'Senior Analysts' : 'Analystes Seniors' },
                { value: '48+', label: isEn ? 'Cited Sources' : 'Sources Cités' },
                { value: '350+', label: isEn ? 'Minutes of Reading' : 'Minutes de Lecture' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-foreground-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BigFourSubtitleBar
              label={isEn ? 'Featured Article' : 'Article à la Une'}
              variant="double-stroke"
              accentColor="accent"
              className="mb-8"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div
                onClick={() => handleOpenArticle(featuredArticle)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenArticle(featuredArticle); } }}
                role="button" tabIndex={0}
                aria-label={`${isEn ? 'Read featured article' : "Lire l'article à la une"} : ${isEn ? featuredArticle.titleEn : featuredArticle.title}`}
                className="relative h-56 sm:h-[360px] md:h-[440px] w-full rounded-xl overflow-hidden bg-foreground-100 cursor-pointer group"
              >
                <img
                  src={featuredArticle.image}
                  alt={`${isEn ? featuredArticle.titleEn : featuredArticle.title} — ${featuredArticle.category} | Khepra Business Review`}
                  title={`${isEn ? featuredArticle.titleEn : featuredArticle.title} — Khepra Business Review`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                  width="800" height="500"
                  loading="eager" decoding="async"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-accent-500 text-background-50">{featuredArticle.category}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2.5 rounded-lg bg-primary-500 text-background-50 font-semibold text-sm whitespace-nowrap">
                    <i className="ri-book-open-line mr-2" />{isEn ? 'Read Article' : "Lire l'Article"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-foreground-500 mb-3">
                  <span className="font-semibold text-accent-600">{featuredArticle.edition}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground-400" />
                  <span><i className="ri-time-line mr-1" />{featuredArticle.readingTime} min</span>
                </div>
                <h2
                  className="font-heading text-xl md:text-3xl font-bold text-foreground-950 mb-3 leading-tight cursor-pointer hover:text-primary-600 transition-colors"
                  onClick={() => handleOpenArticle(featuredArticle)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenArticle(featuredArticle); } }}
                  role="button" tabIndex={0}
                  aria-label={`${isEn ? 'Read' : 'Lire'} : ${isEn ? featuredArticle.titleEn : featuredArticle.title}`}
                >{isEn ? featuredArticle.titleEn : featuredArticle.title}</h2>
                <p className="text-sm md:text-base text-foreground-600 mb-4 leading-relaxed">{isEn ? featuredArticle.subtitleEn : featuredArticle.subtitle}</p>
                <p className="text-[15px] leading-[1.7] text-foreground-600 mb-5 line-clamp-4">{isEn ? featuredArticle.abstractEn : featuredArticle.abstract}</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-foreground-200 flex-shrink-0">
                    <img
                      src={featuredArticle.authorImage}
                      alt={featuredArticle.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground-900">{featuredArticle.author}</div>
                    <div className="text-xs text-foreground-500">{featuredArticle.authorCredentials.split('—')[0].trim()}</div>
                  </div>
                </div>
                <div className="mb-5 p-4 md:p-5 rounded-lg bg-background-100 border border-background-200/70">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground-500 mb-3 block">
                    <i className="ri-lightbulb-line mr-1.5 text-accent-500" />{isEn ? 'Key Insights' : 'Points Clés'}
                  </span>
                  <ul className="space-y-2">
                    {featuredArticle.keyInsights.slice(0, 3).map((insight, idx) => (
                      <li key={isEn ? featuredArticle.keyInsightsEn[idx] : insight} className="flex items-start gap-2.5 text-sm text-foreground-700 leading-relaxed">
                        <i className="ri-arrow-right-s-line text-accent-500 mt-0.5 flex-shrink-0" />{isEn ? featuredArticle.keyInsightsEn[idx] : insight}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenArticle(featuredArticle); }}
                  className="inline-flex items-center gap-2 self-start px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm bg-primary-500 text-background-50 hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-book-open-line" />{isEn ? 'Read Full Article' : "Lire l'Article Complet"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FILTERS + SEARCH */}
        <section className="py-6 md:py-8 border-y border-background-200/70 sticky top-0 z-30 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto -mx-1 px-1 md:flex-wrap">
                {kbrCategories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex-shrink-0 ${
                      activeCategory === cat.key
                        ? 'bg-primary-500 text-background-50'
                        : 'text-foreground-600 hover:bg-background-100'
                    }`}
                  >
                    <i className={`${cat.icon} text-sm`} />
                    {isEn ? (cat.labelEn || cat.labelFr) : cat.labelFr}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-72 flex-shrink-0">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400" />
                <input
                  type="text"
                  placeholder={isEn ? 'Search articles...' : 'Rechercher un article...'}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label={isEn ? 'Search KBR articles' : 'Rechercher un article KBR'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-foreground-950 bg-background-50 border border-background-200/70 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-background-100 mb-4">
                  <i className="ri-file-search-line text-2xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">
                  {isEn ? 'No articles found' : 'Aucun article trouvé'}
                </h3>
                <p className="text-sm text-foreground-500">
                  {isEn ? 'Try adjusting your search or filters.' : 'Essayez de modifier votre recherche ou vos filtres.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-950">
                    {isEn ? 'All Articles' : 'Tous les Articles'}
                    <span className="text-sm font-normal text-foreground-500 ml-2">({filteredArticles.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" id="articles-grid">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} isEn={isEn} onRead={() => handleOpenArticle(article)} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* METHODOLOGY */}
        <section className="py-16 md:py-20 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] bg-gradient-radial from-primary-400 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <BigFourSubtitleBar
                label={isEn ? 'Rigor & Quality' : 'Rigueur & Qualité'}
                variant="centered-pillars"
                accentColor="primary"
                className="mb-6"
              />
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">
                {isEn ? 'A Publication Standard Worthy of the Big Four' : "Un Standard de Publication Digne des Big Four"}
              </h2>
              <p className="text-sm md:text-base text-foreground-400 max-w-3xl mx-auto">
                {isEn
                  ? 'Every KBR article follows a rigorous methodology: Minto Pyramid structure, triple anchoring (ISO standards + institutional benchmarks + African realities), and complete data lineage. Nothing is published without verification.'
                  : "Chaque article KBR suit une méthodologie rigoureuse : structure Pyramide de Minto, triple ancrage (normes ISO + benchmarks institutionnels + réalités africaines), et data lineage complet. Rien n'est publié sans vérification."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: 'ri-stack-line', title: isEn ? 'Pyramide de Minto' : 'Pyramide de Minto', desc: isEn ? 'Conclusion and recommendations first. Structuring arguments MECE. Evidence data at the base. No academic suspense.' : 'Conclusion et recommandations en premier. Arguments structurants MECE. Données de preuve à la base. Pas de suspense académique.' },
                { icon: 'ri-anchor-line', title: isEn ? 'Triple Anchoring' : 'Triple Ancrage', desc: isEn ? 'ISO international standards + institutional benchmarks (World Bank, AfDB, OECD, BCEAO, COBAC) + Francophone Africa realities. Every article carries this triple grounding.' : 'Normes internationales ISO + benchmarks institutionnels (Banque Mondiale, BAD, OCDE, BCEAO, COBAC) + réalités Afrique francophone. Chaque article est triplement ancré.' },
                { icon: 'ri-dna-line', title: isEn ? 'Data Lineage' : 'Data Lineage', desc: isEn ? 'Every fact, figure, and regulatory reference is traced to its primary source. Full audit trail. Zero regulatory hallucination. IBM watsonx compliant.' : "Chaque fait, chiffre et référence réglementaire est tracé jusqu'à sa source primaire. Piste d'audit complète. Zéro hallucination réglementaire. Conforme IBM watsonx." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-foreground-800/40 bg-foreground-900/50 p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-500/15 mb-4">
                    <i className={`${item.icon} text-xl text-primary-400`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-primary-100 mb-5">
              <i className="ri-mail-send-line text-2xl text-primary-600" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
              {isEn ? 'Receive the Khepra Business Review' : 'Recevez la Khepra Business Review'}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 mb-8 max-w-xl mx-auto">
              {isEn
                ? 'A new edition every month. In-depth articles on African finance, governance, compliance and digital transformation. No spam, unsubscribe anytime.'
                : 'Une nouvelle édition chaque mois. Articles de fond sur la finance, la gouvernance, la conformité et la transformation digitale en Afrique. Sans spam, désabonnement à tout moment.'}
            </p>
            <form
              data-readdy-form
              action="https://readdy.ai/api/form/d8vr7h46ci2plld1o890"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email" name="email" required
                placeholder={isEn ? 'your@email.com' : 'votre@email.com'}
                className="flex-1 px-4 py-3 rounded-lg text-sm text-foreground-950 bg-background-50 border border-background-200/70 focus:outline-none focus:ring-1 focus:ring-primary-300 transition-all"
              />
              <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="kbr-honeypot" />
              <button type="submit" className="px-6 py-3 rounded-lg font-semibold text-sm bg-primary-500 text-background-50 hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-send-plane-line mr-2" />{isEn ? 'Subscribe' : "S'abonner"}
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] bg-gradient-radial from-primary-400 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? 'Need a Custom Strategic Analysis?' : "Besoin d'une Analyse Stratégique sur Mesure ?"}
            </h2>
            <p className="text-sm md:text-base text-foreground-400 max-w-2xl mx-auto mb-8">
              {isEn
                ? 'Our experts can develop a tailored research study aligned with your strategic challenges and sector. Contact the KBR Editorial Board.'
                : 'Nos experts peuvent développer une étude personnalisée alignée sur vos enjeux stratégiques et votre secteur. Contactez la Direction de Rédaction KBR.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 rounded-lg font-semibold text-sm bg-primary-500 text-background-50 hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-calendar-line" />{isEn ? 'Request a Consultation' : 'Demander une Consultation'}
              </a>
              <a href="/kbr-dashboard/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 rounded-lg font-semibold text-sm border border-accent-400/50 text-accent-400 bg-accent-500/10 hover:bg-accent-500/20 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-dashboard-line" />{isEn ? 'KBR Editorial Dashboard' : 'Tableau de Bord Éditorial KBR'}
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {selectedArticle && createPortal(
        <KBRArticleModal article={selectedArticle} isEn={isEn} onClose={handleCloseModal} />,
        document.body
      )}

      <style>{`
        .kbr-honeypot{position:absolute;left:-9999px;opacity:0;height:0;width:0;pointer-events:none}
        @keyframes kbr-modal-in{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .kbr-modal-animate-in{animation:kbr-modal-in 0.2s ease-out forwards}
        @keyframes kbr-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .kbr-skeleton{background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:kbr-shimmer 1.5s infinite}
      `}</style>
    </>
  );
}