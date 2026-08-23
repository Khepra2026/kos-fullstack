import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import { ARTICLES_GENERATED } from '@/mocks/generatedArticles';
import ArticleCrossLinks from '@/components/feature/ArticleCrossLinks';
import BigFourSections from '';

const article = ARTICLES_GENERATED.find(a => a.id === 'audit-credit-scoring-2026');

function getStatusColor(color: string) {
  switch (color) {
    case '#DC2626': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
    case '#E8C547': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
    case '#86BC25': return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' };
    case '#10B981': return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' };
    case '#F59E0B': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
  }
}

export default function ArticleAuditCreditScoring() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-background-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-foreground-500">Article introuvable.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${article.title} | KHEPRA EXPERTS`}
        description={article.executive_insight.summary.slice(0, 155)}
        keywords={article.tags.join(', ')}
        canonicalPath={`/blog/${article.slug}`}
        ogType="article"
        articlePublishedTime="2026-06-22T08:00:00+00:00"
        articleAuthor="Dr. Amadou Sow"
        articleSection="Gouvernance des Données & Intelligence Artificielle"
        articleTags={article.tags}
        datePublished="2026-06-22"
        dateModified="2026-06-22"
      />
      <SchemaWebPage
        name={article.title}
        description={article.executive_insight.summary.slice(0, 155)}
        url={`/blog/${article.slug}`}
      />
      <SchemaFAQPage faqs={article.faq.map(f => ({ question: f.q, answer: f.a }))} />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="h-[420px] md:h-[540px] w-full bg-cover bg-top relative" style={{ backgroundImage: `url(${article.hero_image_url})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(13,123,95,0.2)', border: '1px solid rgba(13,123,95,0.4)', color: '#0D7B5F' }}>
                  <i className="ri-cpu-line" /> {article.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">{article.title}</h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{article.subtitle}</p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/60">
                  <span><i className="ri-user-line mr-1" />{article.author}</span>
                  <span><i className="ri-briefcase-line mr-1" />{article.authorRole}</span>
                  <span><i className="ri-calendar-line mr-1" />{article.date}</span>
                  <span><i className="ri-time-line mr-1" />{article.readTime} de lecture</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          {/* Executive Insight */}
          <div className="p-6 md:p-8 rounded-2xl mb-10 border-l-4 bg-amber-50 border-amber-400">
            <div className="flex items-center gap-3 mb-4">
              <i className="ri-lightbulb-flash-line text-2xl text-amber-600" />
              <h2 className="text-xl font-bold text-foreground-950">Executive Insight — Résumé Stratégique COMEX</h2>
            </div>
            <p className="text-foreground-700 leading-relaxed mb-5">{article.executive_insight.summary}</p>
            <div className="space-y-3">
              <h3 className="font-bold text-foreground-950 text-sm uppercase tracking-wider">4 Insights Critiques</h3>
              {article.executive_insight.insights.map((ins, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground-700">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                  {ins}
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-xs font-bold text-red-800 uppercase mb-1"><i className="ri-error-warning-line mr-1" />Risque sous-estimé</p>
                <p className="text-sm text-red-700">{article.executive_insight.underestimated_risk}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-bold text-emerald-800 uppercase mb-1"><i className="ri-treasure-map-line mr-1" />Opportunité immédiate</p>
                <p className="text-sm text-emerald-700">{article.executive_insight.immediate_opportunity}</p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="p-5 rounded-2xl bg-background-100 border border-background-200 mb-10">
            <h3 className="text-sm font-bold text-foreground-950 mb-3 uppercase tracking-wider">Table des Matières</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {article.sections.map((sec, i) => (
                <a key={i} href={`#section-${i}`} className="flex items-center gap-2 text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className={`${sec.icon} text-xs`} />
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          {article.sections.map((sec, i) => (
            <section key={i} id={`section-${i}`} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i className={`${sec.icon} text-primary-500`} />
                </span>
                {sec.title}
              </h2>
              <p className="text-foreground-700 leading-relaxed mb-4">{sec.content}</p>
              {sec.highlights && (
                <div className="space-y-2 mt-4">
                  {sec.highlights.map((h, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-foreground-600 pl-12">
                      <i className="ri-arrow-right-s-line text-primary-500 flex-shrink-0 mt-0.5" />
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* KOS Framework */}
          <section className="mb-10">
            <div className="p-6 md:p-8 rounded-2xl border-2 border-primary-500/30 bg-gradient-to-br from-background-50 to-emerald-500/5">
              <div className="flex items-center gap-3 mb-2">
                <i className={`${article.framework.icon} text-2xl`} style={{ color: article.framework.color }} />
                <h2 className="text-xl md:text-2xl font-bold text-foreground-950 font-heading">{article.framework.name}</h2>
              </div>
              <p className="text-foreground-600 mb-6">{article.framework.description}</p>
              <div className="space-y-4">
                {article.framework.pillars.map((p, i) => {
                  const statusColors = getStatusColor(p.color);
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-background-200">
                      <span className="text-xs font-bold text-foreground-400 w-6">{i + 1}</span>
                      <span className="text-sm font-bold text-foreground-950 flex-1">{p.label}</span>
                      <span className="text-lg font-bold text-foreground-950 font-heading">{p.score}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Cas d'Usage */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading">Cas d'Usage — Afrique Réelle</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {article.cas_usage.map((cas, i) => (
                <div key={i} className="p-5 rounded-2xl bg-background-100 border border-background-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                    <i className={`${cas.icon} text-primary-500 text-lg`} />
                  </div>
                  <h3 className="font-bold text-foreground-950 text-sm mb-2">{cas.title}</h3>
                  <p className="text-xs text-foreground-600 mb-3">{cas.description}</p>
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs text-amber-800 font-medium"><strong>Impact :</strong> {cas.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Implications Stratégiques */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-5 font-heading">Implications Stratégiques</h2>
            <div className="space-y-4">
              {article.implications.map((imp, i) => (
                <div key={i} className="p-5 rounded-2xl bg-background-100 border border-background-200">
                  <h3 className="text-sm font-bold text-foreground-950 mb-2 flex items-center gap-2">
                    <i className={`${imp.icon} text-primary-500`} />
                    {imp.audience}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{imp.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ KOS BIG FOUR SECTIONS — FAQ, Références, Méthodologie, Avertissement ═══ */}
          <BigFourSections
            articleId={article.id}
            existingFaq={article.faq}
            existingRefs={article.references}
          />

          <ArticleCrossLinks articleSlug={article.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}



