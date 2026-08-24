import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ShareButtons } from '@/pages/blog/components/ShareButtons';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { ArticleNewsletterInline } from '@/pages/blog/components/ArticleNewsletterInline';
import { DAF_DATA } from '';
import { buildArticleHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}/blog/daf-externalise-pilotage-financier-pme-afrique/`;

function buildArticleSchema(d: typeof DAF_DATA.fr, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title.replace('\n', ' '),
    description: d.seo.description,
    image: 'https://readdy.ai/api/search-image?query=senior%20african%20CFO%20chief%20financial%20officer%20working%20with%20executive%20team%20modern%20boardroom%20reviewing%20financial%20dashboards%20strategic%20reports%20budget%20forecasts%20large%20screens%20outsourced%20financial%20direction%20expertise%20governance%20strategic%20financial%20management%20SMEs%20west%20africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=800&height=500&seq=blog22-daf-green&orientation=landscape',
    datePublished: '2025-04-20',
    dateModified: '2025-04-20',
    author: { '@type': 'Person', name: 'SIMDA Essoyomèwè', url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.seo.keywords,
    articleSection: d.category,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

function buildFaqSchema(d: typeof DAF_DATA.fr) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export default function DAFBlogPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const d = isEn ? DAF_DATA.en : DAF_DATA.fr;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const articleSchema = buildArticleSchema(d, isEn);
  const faqSchema = buildFaqSchema(d);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonicalPath="/blog/daf-externalise-pilotage-financier-pme-afrique/"
        hreflangLinks={buildArticleHreflang('daf-externalise-pilotage-financier-pme-afrique', isEn ? 'en' : 'fr')}
        ogUrl={ARTICLE_URL}
        ogType="article"
        ogImage="https://readdy.ai/api/search-image?query=senior%20african%20CFO%20chief%20financial%20officer%20working%20with%20executive%20team%20modern%20boardroom%20reviewing%20financial%20dashboards%20strategic%20reports%20budget%20forecasts%20large%20screens%20outsourced%20financial%20direction%20expertise%20governance%20strategic%20financial%20management%20SMEs%20west%20africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=800&height=500&seq=blog22-daf-green&orientation=landscape"
        ogImageWidth="800"
        ogImageHeight="500"
        ogImageAlt="Direction Financière Externalisée DAF – KHEPRA EXPERTS"
        articlePublishedTime="2025-04-20"
        articleModifiedTime="2025-04-20"
        articleAuthor="SIMDA Essoyomèwè"
        articleSection={d.category}
        articleTags={d.tagsLabel}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={[articleSchema, faqSchema]}
      />

      <Navigation />

      {/* Hero image */}
      <div className="relative pt-20 h-80 md:h-[440px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=senior%20african%20CFO%20chief%20financial%20officer%20working%20with%20executive%20team%20modern%20boardroom%20reviewing%20financial%20dashboards%20strategic%20reports%20budget%20forecasts%20large%20screens%20outsourced%20financial%20direction%20expertise%20governance%20strategic%20financial%20management%20SMEs%20west%20africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1200&height=440&seq=blog22-daf-hero-green&orientation=landscape"
          alt="Direction Financière Externalisée – KHEPRA EXPERTS"
          className="w-full h-full object-cover object-top"
          width={1200}
          height={440}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb
            variant="light"
            items={[
              { label: d.breadcrumb.home, href: '/' },
              { label: d.breadcrumb.blog, href: '/blog/' },
              { label: d.breadcrumb.current },
            ]}
          />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-brand-100 text-brand-800">
            {d.badge}
          </span>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {d.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < d.title.split('\n').length - 1 && <br className="hidden md:block" />}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article */}
          <main className="flex-1 min-w-0" id="main-content">

            {/* Meta author */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-300 flex-shrink-0">
                  <img
                    src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                    alt="SIMDA Essoyomèwè — Directeur Associé & Fondateur, KHEPRA EXPERTS"
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                  <p className="text-xs text-gray-500">{d.authorRole}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 ml-auto">
                <span className="flex items-center gap-1.5"><i className="ri-calendar-line text-gold-500"></i>{d.date}</span>
                <span className="flex items-center gap-1.5"><i className="ri-time-line text-gold-500"></i>{d.readTime}</span>
                <span className="flex items-center gap-1.5"><i className="ri-eye-line text-gold-500"></i>{d.isNew}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-gold-400 pl-5 italic">
              {d.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {d.tagsLabel.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  <i className="ri-price-tag-3-line text-xs text-gold-500"></i>
                  {tag}
                </span>
              ))}
            </div>

            {/* ═══ EXECUTIVE SUMMARY (Big Four) ═══ */}
            <section id="executive-summary" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl overflow-hidden mb-8" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'rgba(201,162,39,0.12)' }}>
                      <i className="ri-file-list-3-line text-base" style={{ color: '#c9a227' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Thought Leadership — Senior Partner</p>
                      <p className="font-playfair text-lg font-bold text-white leading-snug">{d.executiveSummary.heading}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 ml-11 mb-3">{d.executiveSummary.subheading}</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-3">
                  {d.executiveSummary.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-white/75 leading-relaxed">{p}</p>
                  ))}
                  <div className="space-y-3 pt-2">
                    {d.executiveSummary.keyPoints.map((kp, i) => (
                      <div key={i} className="flex gap-3 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: '#c9a227' }}></div>
                        <div>
                          <p className="font-bold text-sm mb-1" style={{ color: '#d4a82a' }}>{kp.label}</p>
                          <p className="text-sm text-white/70 leading-relaxed">{kp.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 sm:px-8 pb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Actions requises</p>
                  <div className="space-y-2">
                    {d.executiveSummary.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#c9a227' }}></i>
                        </div>
                        <p className="text-sm text-white/70">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ GEO — Réponse directe IA (Big Four) ═══ */}
            <section id="geo-reponse" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl p-5 border-2" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.22)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                    <i className="ri-sparkling-line text-sm" style={{ color: '#c9a227' }}></i>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Réponse directe</p>
                </div>
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-snug">
                  {d.geoAnswer.title}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: d.geoAnswer.text }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {d.geoAnswer.columns.map((col, i) => (
                    <div key={i} className="rounded-xl p-3 bg-white border border-gray-100">
                      <p className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-2" style={{ color: '#c9a227' }}>{col.label}</p>
                      <ul className="space-y-1">
                        {col.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <i className="ri-arrow-right-s-line text-xs flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }}></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA offer inline */}
            <div className="my-8 rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-gold-50 to-gold-50 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-gold-300 bg-white flex-shrink-0">
                  <i className="ri-funds-line text-gold-600 text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">{d.offerBadge}</p>
                  <h4 className="font-bold text-gray-900 text-base mb-1 leading-snug">{d.offerTitle}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{d.offerDesc}</p>
                </div>
                <a href={d.cta1.url} onClick={(e) => { e.preventDefault(); navigate(d.cta1.url); }}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 hover:shadow-lg">
                  {d.cta1.label}
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Section — Definition */}
            <section id="definition" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>III</span>
                {d.section1Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p dangerouslySetInnerHTML={{ __html: d.section1p1 }} />
                <p dangerouslySetInnerHTML={{ __html: d.section1p2 }} />
                <p>{d.section1p3}</p>
              </div>
            </section>

            <section id="paradoxe" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>IV</span>
                {d.section2Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>{d.section2p1}</p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                  <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">{d.costLabel}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-xs font-bold text-red-700 uppercase mb-1">{d.section2fullTime}</p>
                      <p className="text-2xl font-bold text-red-800">{d.section2fullTimeValue}</p>
                      <p className="text-xs text-red-600 mt-1">{d.section2fullTimeSub}</p>
                    </div>
                    <div className="bg-strategic-50 border border-strategic-200 rounded-lg p-4">
                      <p className="text-xs font-bold text-strategic-700 uppercase mb-1">{d.section2outsourced}</p>
                      <p className="text-2xl font-bold text-strategic-800">{d.section2outsourcedValue}</p>
                      <p className="text-xs text-strategic-600 mt-1">{d.section2outsourcedSub}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">{d.section2economy}</p>
                </div>
                <p>{d.section2p2}</p>
              </div>
            </section>

            <ArticleNewsletterInline />

            <section id="missions" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>V</span>
                {d.section3Title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {d.missions.map((m, i) => (
                  <div key={i} className={`rounded-xl border ${m.border} ${m.bg} p-5`}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white border ${m.border} mb-3`}>
                      <i className={`${m.icon} ${m.color} text-xl`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mid-article CTA */}
            <div className="my-10 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-800 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-xl flex-shrink-0">
                    <i className="ri-lightbulb-flash-line text-gold-400 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-1">{d.diagBadge}</p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">{d.diagTitle}</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xl">
                  {d.diagDesc} <strong className="text-gold-400">{d.diagValue}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={d.ctaFreeDiag.url} onClick={(e) => { e.preventDefault(); navigate(d.ctaFreeDiag.url); }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer whitespace-nowrap">
                    {d.ctaFreeDiag.label}
                    <i className="ri-arrow-right-line"></i>
                  </a>
                  <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-whatsapp-line text-green-400"></i>
                    {d.ctaWhatsapp}
                  </a>
                </div>
              </div>
            </div>

            <section id="resultats" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VI</span>
                {d.section4Title}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {d.results.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                    <div className="w-10 h-10 flex items-center justify-center mx-auto mb-3 bg-gray-50 rounded-lg">
                      <i className={`${r.icon} ${r.color} text-xl`}></i>
                    </div>
                    <p className={`text-2xl font-bold ${r.color} mb-1`}>{r.value}</p>
                    <p className="text-xs text-gray-500 leading-tight">{r.label}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>{d.section4p1}</p>
                <p dangerouslySetInnerHTML={{ __html: d.section4p2 }} />
              </div>
            </section>

            <section id="choisir" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VII</span>
                {d.section5Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>{d.section5p1}</p>
                <ul className="space-y-3 list-none pl-0">
                  {d.criteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 flex-shrink-0 mt-0.5">
                        <i className={`${item.icon} text-gold-600 text-sm`}></i>
                      </div>
                      <div>
                        <strong className="text-gray-900 text-sm">{item.label}</strong>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="faq" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VIII</span>
                {d.section6Title}
              </h2>
              <div className="space-y-3">
                {d.faq.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-gray-900 text-sm leading-snug">{item.q}</span>
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <i className={`ri-arrow-down-s-line text-gray-400 text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}></i>
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed pt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══ RÉFÉRENCES OFFICIELLES (Big Four) ═══ */}
            <section id="references" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>IX</span>
                {d.referencesSection.heading}
              </h2>
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Sources institutionnelles et réglementaires</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {d.referencesSection.references.map((ref, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white flex-shrink-0 mt-0.5">
                        <i className={`${ref.icon} text-sm`} style={{ color: '#c9a227' }}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-snug mb-0.5">{ref.title}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500">{ref.institution}</span>
                          <span className="text-xs text-gray-400">— {ref.year}</span>
                          <a href={ref.link} target="_blank" rel="noopener noreferrer nofollow" className="text-xs font-medium flex items-center gap-1 hover:underline cursor-pointer" style={{ color: '#c9a227' }}>
                            <i className="ri-external-link-line text-xs"></i>
                            Source officielle
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <div className="my-10 rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-gold-50 via-gold-50 to-white p-8">
              <div className="text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-gold-100 rounded-2xl mx-auto mb-4">
                  <i className="ri-calendar-check-line text-gold-600 text-2xl"></i>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">{d.ctaFinalTitle}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">{d.ctaFinalDesc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={d.cta1.url} onClick={(e) => { e.preventDefault(); navigate(d.cta1.url); }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer whitespace-nowrap shadow-lg">
                    {d.cta1.label}
                    <i className="ri-arrow-right-line"></i>
                  </a>
                  <a href={d.cta2.url} onClick={(e) => { e.preventDefault(); navigate(d.cta2.url); }}
                    className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-gold-400 hover:text-gold-700 transition-all cursor-pointer whitespace-nowrap">
                    {d.cta2.label}
                    <i className="ri-mail-line"></i>
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-4">{d.ctaFooterSub}</p>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <SocialSharePremium
                url={ARTICLE_URL}
                title={d.shareTitle}
                description={d.shareExcerpt}
                variant="compact"
                className="mb-5"
              />
              <div className="border-t border-gray-100 pt-5">
                <ShareButtons
                  url={ARTICLE_URL}
                  title={d.shareTitle}
                  excerpt={d.shareExcerpt}
                  isEn={isEn}
                />
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">{d.relatedTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {d.relatedArticles.map((rel, i) => (
                  <a key={i} href={rel.href} onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                    className="flex gap-3 group cursor-pointer bg-white rounded-xl border border-gray-100 p-3 hover:border-gold-200 hover:shadow-md transition-all">
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={`https://readdy.ai/api/search-image?query=professional%20african%20business%20governance%20finance%20strategy%20modern%20office%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=80&height=64&seq=related-daf-${i}-green&orientation=landscape`}
                        alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" width={80} height={64} loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gold-700 mb-1 block">{rel.category}</span>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gold-700 transition-colors leading-snug">{rel.title}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{rel.readTime}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="sticky top-28 space-y-6">

              {/* Table of contents */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{d.tocTitle}</p>
                <nav className="space-y-2">
                  {d.sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 group">
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-gold-300 group-hover:bg-gold-50 transition-all flex-shrink-0">
                        <i className={`${s.icon} text-xs text-gray-400 group-hover:text-gold-600`}></i>
                      </div>
                      <span className="leading-snug">{s.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-2xl p-6 text-white">
                <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-xl mb-4">
                  <i className="ri-funds-line text-gold-400 text-xl"></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug">{d.sidebarTitle}</h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{d.sidebarDesc}</p>
                <a href={d.cta1.url} onClick={(e) => { e.preventDefault(); navigate(d.cta1.url); }}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer flex items-center justify-center gap-2">
                  {d.cta1.label}
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer"
                  className="mt-2 w-full bg-white/10 border border-white/20 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-whatsapp-line text-green-400"></i>
                  {d.sidebarWhatsapp}
                </a>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{d.sidebarContact}</p>
                <div className="space-y-3">
                  <a href="tel:+22893984909" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold-700 transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <i className="ri-phone-line text-gold-600 text-sm"></i>
                    </div>
                    +228 93 98 49 09
                  </a>
                  <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold-700 transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <i className="ri-mail-line text-gold-600 text-sm"></i>
                    </div>
                    contact@khepraexperts.com
                  </a>
                </div>
              </div>

              {/* Back to blog */}
              <a href="/blog/" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2">
                <i className="ri-arrow-left-line"></i>
                {d.allArticles}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}




