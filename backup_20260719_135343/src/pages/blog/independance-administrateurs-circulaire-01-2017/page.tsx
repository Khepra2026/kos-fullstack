import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ShareButtons } from '@/pages/blog/components/ShareButtons';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { ArticleNewsletterInline } from '@/pages/blog/components/ArticleNewsletterInline';
import { MiniGuideCTA } from '@/pages/blog/components/MiniGuideCTA';
import { ARTICLE_INDEPENDANCE_DATA, ARTICLE_INDEPENDANCE_CONTENT } from '';
import { buildArticleHreflang } from '@/utils/hreflang';
import { useTranslation } from 'react-i18next';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}${ARTICLE_INDEPENDANCE_DATA.meta.canonicalPath}`;

function buildArticleSchema(d: typeof ARTICLE_INDEPENDANCE_DATA, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.seo.description,
    image: d.heroImage,
    datePublished: d.meta.publishedDate,
    dateModified: d.meta.modifiedDate,
    author: {
      '@type': 'Person',
      name: d.meta.author,
      url: `${SITE_URL}/about`,
      jobTitle: d.meta.authorTitle,
    },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.seo.keywords,
    articleSection: d.meta.category,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

function buildFaqSchema(d: typeof ARTICLE_INDEPENDANCE_DATA, isEn: boolean) {
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <h2
      id={id}
      className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
    >
      <span
        className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5"
        style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}
      >
        {number}
      </span>
      {title}
    </h2>
  );
}

function RegulatoryBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
      <i className="ri-alert-line text-xs"></i>
      {text}
    </span>
  );
}

function FrictionCard({
  f,
}: {
  f: typeof ARTICLE_INDEPENDANCE_CONTENT.pointsFriction.frictions[0];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${f.borderClass} overflow-hidden mb-6`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${open ? f.bgClass : 'bg-white hover:bg-gray-50/50'}`}
      >
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${f.borderClass} bg-white flex-shrink-0 mt-0.5`}>
          <i className={`${f.icon} ${f.colorClass} text-lg`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${f.badgeClass}`}>{f.id}</span>
            <span className="text-xs text-gray-500 font-mono">{f.subtitle}</span>
          </div>
          <p className="font-bold text-base text-gray-900 leading-snug">{f.title}</p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
          <i className={`ri-arrow-down-s-line text-gray-400 text-xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${f.bgClass} border-t-2 ${f.borderClass} px-5 sm:px-6 pb-6 pt-5`}>
          <p className="text-sm text-gray-700 leading-relaxed mb-5">{f.description}</p>

          <div className="space-y-4 mb-5">
            {f.subPoints.map((sp, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${f.colorClass} bg-current`}></span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{sp.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{sp.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-red-200">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 flex-shrink-0">
              <i className="ri-scales-3-line text-red-600 text-base"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Risque réglementaire</p>
              <p className="text-sm text-gray-700 leading-relaxed">{f.regulatoryRisk}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PillarCard({ pillar }: { pillar: typeof ARTICLE_INDEPENDANCE_CONTENT.architectureSolution.pillars[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${pillar.borderClass} overflow-hidden mb-5`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${open ? pillar.bgClass : 'bg-white hover:bg-gray-50/50'}`}
      >
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border-2 ${pillar.borderClass} bg-white`}>
          <span className={`font-playfair font-bold text-base ${pillar.colorClass}`}>{pillar.number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-gray-900 leading-snug">{pillar.title}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <i className="ri-file-text-line"></i> {pillar.deliverable}
          </p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
          <i className={`ri-arrow-down-s-line text-gray-400 text-xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${pillar.bgClass} border-t-2 ${pillar.borderClass} px-5 sm:px-6 pb-6 pt-5`}>
          <div className="space-y-3">
            {pillar.steps.map((s, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100">
                <span className={`flex-shrink-0 font-mono text-xs font-bold ${pillar.colorClass} mt-0.5 w-7`}>{s.step}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{s.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MaturityDimension({ dim }: { dim: typeof ARTICLE_INDEPENDANCE_CONTENT.outilPremium.dimensions[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${dim.border} overflow-hidden mb-4`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 text-left cursor-pointer transition-colors ${open ? dim.bg : 'bg-white hover:bg-gray-50/50'}`}
      >
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 ${dim.border} bg-white flex-shrink-0`}>
          <i className={`${dim.icon} ${dim.color} text-base`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">{dim.id}</span>
          <span className="font-bold text-gray-900 text-sm">{dim.title}</span>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-1">{dim.description}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`w-2 h-4 rounded-sm ${dim.bg} ${dim.border} border`}></span>
          ))}
          <i className={`ri-arrow-down-s-line text-gray-400 text-xl transition-transform duration-300 ml-1 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${dim.bg} border-t-2 ${dim.border} px-5 pb-5 pt-4`}>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{dim.description}</p>
          <div className="space-y-2">
            {dim.levels.map((l, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <div className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border-2 ${dim.border} font-bold text-xs ${dim.color}`}>
                  {l.score}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-bold text-xs ${dim.color} uppercase tracking-wide mr-2`}>{l.label}</span>
                  <span className="text-xs text-gray-600">{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function IndependanceAdministrateursPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const d = ARTICLE_INDEPENDANCE_DATA;
  const c = ARTICLE_INDEPENDANCE_CONTENT;
  const articleSchema = buildArticleSchema(d, isEn);
  const faqSchema = buildFaqSchema(d, isEn);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonicalPath={d.meta.canonicalPath}
        hreflangLinks={buildArticleHreflang('independance-administrateurs-circulaire-01-2017', isEn ? 'en' : 'fr')}
        ogUrl={ARTICLE_URL}
        ogType="article"
        ogImage={d.heroImage}
        ogImageWidth="1400"
        ogImageHeight="520"
        ogImageAlt={d.heroAlt}
        articlePublishedTime={d.meta.publishedDate}
        articleModifiedTime={d.meta.modifiedDate}
        articleAuthor={d.meta.author}
        articleSection={d.meta.category}
        articleTags={d.meta.tags}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={[articleSchema, faqSchema]}
        twitterLabel1="Temps de lecture"
        twitterData1={d.meta.readTime}
        twitterLabel2="Catégorie"
        twitterData2={d.meta.category}
      />

      <Navigation />

      {/* ── Hero ── */}
      <div className="relative pt-20 overflow-hidden" style={{ height: '520px' }}>
        <img
          src={d.heroImage}
          alt={d.heroAlt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1400}
          height={520}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />

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

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(201,162,39,0.15)', color: '#d4a82a', border: '1px solid rgba(201,162,39,0.35)' }}
            >
              <i className="ri-award-line text-xs"></i>
              {d.badge}
            </span>
            <RegulatoryBadge text="Circulaire n°01-2017/CB/C" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-time-line text-xs"></i>
              {d.meta.readTime}
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg mb-2">
            {d.title}
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-3xl">{d.subtitle}</p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Article ── */}
          <main className="flex-1 min-w-0" id="main-content">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: '#c9a227' }}>
                  <img
                    src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                    alt={d.meta.author}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{d.meta.author}</p>
                  <p className="text-xs text-gray-500">{d.meta.authorTitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 ml-auto">
                <span className="flex items-center gap-1.5">
                  <i className="ri-calendar-line" style={{ color: '#c9a227' }}></i>
                  30 mai 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-time-line" style={{ color: '#c9a227' }}></i>
                  {d.meta.readTime}
                </span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#c9a227' }}>
              {d.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {d.meta.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  <i className="ri-price-tag-3-line text-xs" style={{ color: '#c9a227' }}></i>
                  {tag}
                </span>
              ))}
            </div>

            {/* ─── SÉRIE ÉDITORIALE ─── */}
            <div className="mb-10 p-5 rounded-2xl border" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.2)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
                <i className="ri-booklet-line mr-1.5"></i>
                Série Thought Leadership — Quintilogie Gouvernance Bancaire UEMOA
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { num: 'Sujet A', label: 'A', title: "L'Indépendance des Administrateurs (Circ. 01-2017)", href: '/blog/independance-administrateurs-circulaire-01-2017/', current: true },
                  { num: 'Sujet B', label: 'B', title: 'Verrou de la Nationalité (Circ. 02-2017)', href: '/blog/verrou-nationalite-competences-executives-circulaire-02-2017/', current: false },
                  { num: 'Sujet C', label: 'C', title: 'Les 3 Lignes de Défense (Circ. 03-2017)', href: '/blog/3-lignes-defense-circulaire-03-2017/', current: false },
                  { num: 'Sujet D', label: 'D', title: "Lanceurs d'Alerte — Art. 44", href: '/blog/protection-lanceurs-alerte-circulaire-01-2017/', current: false },
                  { num: 'Sujet E', label: 'E', title: 'Comités Spécialisés — Art. 55-62', href: '/blog/comites-specialises-circulaire-01-2017/', current: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={item.href && !item.current ? () => navigate(item.href!) : undefined}
                    className={`rounded-xl p-3 flex items-start gap-2.5 ${item.href && !item.current ? 'cursor-pointer hover:border-yellow-300 transition-all' : ''} ${item.current ? 'border-2' : 'border'} border-gray-200 bg-white`}
                    style={item.current ? { borderColor: '#c9a227' } : {}}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold" style={item.current ? { background: 'rgba(201,162,39,0.15)', color: '#c9a227' } : { background: '#f8f8f8', color: '#999' }}>
                      {item.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold mb-0.5" style={item.current ? { color: '#c9a227' } : { color: '#666' }}>{item.num}</p>
                      <p className="text-xs text-gray-700 leading-snug">{item.title}</p>
                    </div>
                    {item.current && <i className="ri-bookmark-fill text-sm flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }}></i>}
                  </div>
                ))}
              </div>
            </div>

            {/* ─── EXECUTIVE SUMMARY ─── */}
            <section id="executive-summary" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl overflow-hidden mb-8" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'rgba(201,162,39,0.12)' }}>
                      <i className="ri-file-list-3-line text-base" style={{ color: '#c9a227' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Thought Leadership — Senior Partner</p>
                      <p className="font-playfair text-lg font-bold text-white leading-snug">{c.executiveSummary.heading}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 ml-11 mb-3">{c.executiveSummary.subheading}</p>
                </div>

                <div className="px-6 sm:px-8 py-6 space-y-3">
                  {c.executiveSummary.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-white/75 leading-relaxed">{p}</p>
                  ))}
                  <div className="space-y-3 pt-2">
                    {c.executiveSummary.keyPoints.map((kp, i) => (
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
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Actions requises du Conseil d'Administration</p>
                  <div className="space-y-2">
                    {c.executiveSummary.actionItems.map((item, i) => (
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

            <MiniGuideCTA guide="gouvernance-imf" />

            {/* ─── CADRE REGLEMENTAIRE ─── */}
            <section id="cadre-reglementaire" className="mb-14 scroll-mt-28">
              <SectionHeading id="cadre-reglementaire" number="II" title={c.cadreReglementaire.heading} />

              {c.cadreReglementaire.blocks.map((block) => (
                <div key={block.id} className={`rounded-2xl border-2 ${block.border} overflow-hidden mb-6`}>
                  <div className={`flex items-center gap-3 px-5 sm:px-6 py-4 ${block.bg} border-b-2 ${block.border}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-xl border-2 ${block.border} bg-white flex-shrink-0`}>
                      <i className={`${block.icon} ${block.color} text-base`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{block.title}</h3>
                  </div>

                  <div className="px-5 sm:px-6 py-5 space-y-4">
                    {block.id === 'A' ? (
                      <>
                        <p className="text-sm text-gray-600 leading-relaxed">L'indépendance des administrateurs s'inscrit dans un corpus normatif à plusieurs niveaux :</p>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="w-full text-xs min-w-[600px]">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                {block.tableHeaders!.map((h, i) => (
                                  <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {block.tableRows!.map((row, ri) => (
                                <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                                  {row.map((cell, ci) => (
                                    <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-400 italic">{block.sourceNote}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 leading-relaxed">{block.intro}</p>
                        <ul className="space-y-2.5">
                          {block.bullets!.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#c9a227' }}></span>
                              <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-400 italic">{block.sourceNote}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* ─── POINTS DE FRICTION ─── */}
            <section id="points-friction" className="mb-14 scroll-mt-28">
              <SectionHeading id="points-friction" number="III" title={c.pointsFriction.heading} />
              <p className="text-sm text-gray-600 leading-relaxed mb-8">{c.pointsFriction.intro}</p>

              {c.pointsFriction.frictions.map((f) => (
                <FrictionCard key={f.id} f={f} />
              ))}
            </section>

            <ArticleNewsletterInline />

            <MiniGuideCTA guide="gouvernance-imf" />

            {/* ─── ARCHITECTURE SOLUTION ─── */}
            <section id="architecture-solution" className="mb-14 scroll-mt-28">
              <SectionHeading id="architecture-solution" number="IV" title={c.architectureSolution.heading} />
              <p className="text-sm text-gray-600 leading-relaxed mb-8">{c.architectureSolution.intro}</p>

              {/* 5 critères d'indépendance visuel */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
                {[
                  { label: 'Financière', icon: 'ri-money-dollar-circle-line', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Aucun lien commercial ou crédit avec l\'établissement' },
                  { label: 'Familiale', icon: 'ri-parent-line', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Aucun lien de parenté avec les dirigeants' },
                  { label: 'Hiérarchique', icon: 'ri-organization-chart', color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', desc: 'Période de carence 2 ans pour anciens dirigeants' },
                  { label: 'Temporelle', icon: 'ri-time-line', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', desc: '4 ans renouvelable une fois — 3 mandats max' },
                  { label: 'Comportementale', icon: 'ri-chat-quote-line', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', desc: 'Désaccords documentés, absence de capture cognitive' },
                ].map((crit, i) => (
                  <div key={i} className={`rounded-2xl border-2 ${crit.border} ${crit.bg} p-4`}>
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 ${crit.border} bg-white mb-2`}>
                      <i className={`${crit.icon} ${crit.color} text-lg`}></i>
                    </div>
                    <p className={`font-bold text-xs ${crit.color} uppercase tracking-wide mb-1`}>{crit.label}</p>
                    <p className="text-xs text-gray-600 leading-snug">{crit.desc}</p>
                  </div>
                ))}
              </div>

              {c.architectureSolution.pillars.map((pillar) => (
                <PillarCard key={pillar.number} pillar={pillar} />
              ))}
            </section>

            {/* ─── OUTIL PREMIUM ─── */}
            <section id="outil-premium" className="mb-14 scroll-mt-28">
              <SectionHeading id="outil-premium" number="V" title={c.outilPremium.heading} />

              <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="px-6 sm:px-8 py-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.25)' }}>
                      <i className="ri-shield-user-line text-2xl" style={{ color: '#c9a227' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Outil Premium Propriétaire</p>
                      <h3 className="font-playfair font-bold text-white text-xl leading-snug">{c.outilPremium.subheading}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-2">{c.outilPremium.intro}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{c.outilPremium.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-grouped-line" style={{ color: '#c9a227' }}></i>
                  5 Dimensions d'évaluation — Score de 1 (Initié) à 5 (Optimisé)
                </p>
                {c.outilPremium.dimensions.map((dim) => (
                  <MaturityDimension key={dim.id} dim={dim} />
                ))}
              </div>

              {/* Access CTA */}
              <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: 'linear-gradient(135deg, #f8f6ef 0%, #fdf4d5 100%)', border: '2px solid rgba(201,162,39,0.3)' }}>
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
                  <i className="ri-lock-password-line text-2xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h4 className="font-playfair text-xl font-bold text-gray-900 mb-3">{c.outilPremium.accessInfo.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">{c.outilPremium.accessInfo.text}</p>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105 mb-3"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  {c.outilPremium.accessInfo.cta}
                  <i className="ri-arrow-right-line"></i>
                </button>
                <p className="text-xs text-gray-400 italic">{c.outilPremium.accessInfo.note}</p>
              </div>
            </section>

            {/* ─── DISCLAIMER ─── */}
            <div className="mb-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-300 flex-shrink-0">
                  <i className="ri-information-line text-amber-700 text-base"></i>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Avertissement :</strong> Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l'UMOA ainsi qu'à leurs conseils spécialisés.
                </p>
              </div>
            </div>

            {/* ─── FAQ ─── */}
            <section id="faq" className="mb-14 scroll-mt-28">
              <SectionHeading id="faq" number="VI" title="Questions Fréquentes — Niveau Expert" />
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

            {/* ─── RÉFÉRENCES OFFICIELLES ─── */}
            <section id="references-officielles" className="mb-14 scroll-mt-28">
              <SectionHeading id="references-officielles" number="VII" title="Références Officielles" />
              <div className="space-y-3">
                {[
                  { title: 'Circulaire n°01-2017/CB/C relative à la gouvernance des établissements de crédit (Art. 18-20)', institution: 'Commission Bancaire de l\'UMOA', year: '2017', url: 'https://www.bceao.int' },
                  { title: 'Circulaire n°03-2017/CB/C relative au contrôle interne, à la gestion des risques et à la conformité', institution: 'Commission Bancaire de l\'UMOA', year: '2017', url: 'https://www.bceao.int' },
                  { title: 'Principes de gouvernance d\'entreprise du G20 et de l\'OCDE', institution: 'OCDE', year: '2023', url: 'https://www.oecd.org' },
                  { title: 'Basel Committee on Banking Supervision — Principles for enhancing corporate governance', institution: 'BCBS', year: '2015', url: 'https://www.bis.org' },
                  { title: 'Acte Uniforme relatif au droit des Sociétés Commerciales et du Groupement d\'Intérêt Économique (AUSCGIE révisé)', institution: 'OHADA', year: '2014', url: 'https://www.ohada.com' },
                ].map((ref, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <i className="ri-file-text-line text-sm flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }}></i>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs leading-snug mb-0.5">{ref.title}</p>
                      <p className="text-xs text-gray-500">{ref.institution} — {ref.year}</p>
                      <a href={ref.url} target="_blank" rel="nofollow noopener noreferrer" className="text-xs hover:underline" style={{ color: '#c9a227' }}>{ref.url}</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <MiniGuideCTA guide="gouvernance-imf" />
            <div
              className="my-10 rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}
            >
              <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                    <i className="ri-shield-user-line text-2xl" style={{ color: '#c9a227' }}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Mission de Gouvernance KHEPRA EXPERTS</p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">Certifiez l'indépendance réelle des administrateurs de votre institution</h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                  Notre mission KHEPRA INDEPENDENCE-Matrix™ vous fournit un score d'indépendance confidentiel sur 5 dimensions, une cartographie des liens conflictuels et un plan d'action de mise en conformité priorisé par niveau de risque réglementaire (Commission Bancaire UMOA).
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                  >
                    Demander la mission de diagnostic
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    onClick={() => navigate('/blog/3-lignes-defense-circulaire-03-2017/')}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Sujet C — 3 Lignes de Défense
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    onClick={() => navigate('/charte-deontologique')}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Charte Déontologique
                    <i className="ri-external-link-line"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <SocialSharePremium
                url={ARTICLE_URL}
                title={d.title}
                description={d.excerpt}
                variant="compact"
                className="mb-5"
              />
              <div className="border-t border-gray-100 pt-5">
                <ShareButtons
                  url={ARTICLE_URL}
                  title={d.title}
                  excerpt={d.excerpt}
                  isEn={false}
                />
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">Articles connexes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {d.relatedArticles.map((rel, i) => (
                  <a
                    key={i}
                    href={rel.href}
                    onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                    className="flex gap-3 group cursor-pointer bg-white rounded-xl border border-gray-100 p-3 hover:border-yellow-200 hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={`https://readdy.ai/api/search-image?query=professional%20african%20banking%20governance%20finance%20compliance%20meeting%20boardroom%20strategy&width=64&height=48&seq=${rel.seq}&orientation=landscape`}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        width={64}
                        height={48}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold mb-1 block" style={{ color: '#c9a227' }}>{rel.category}</span>
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-700 transition-colors leading-snug">{rel.title}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{rel.readTime}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="sticky top-28 space-y-6">

              {/* Table of contents */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Sommaire</p>
                <nav className="space-y-1.5">
                  {d.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-start gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors cursor-pointer py-1 leading-snug group"
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-yellow-300 flex-shrink-0 mt-0.5">
                        <i className={`${s.icon} text-xs text-gray-400 group-hover:text-yellow-600`}></i>
                      </div>
                      <span>{s.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Série éditoriale sidebar */}
              <div className="rounded-2xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Quintilogie Gouvernance Bancaire</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg" style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.2)' }}>
                    <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)', color: '#c9a227', fontSize: '10px', fontWeight: 'bold' }}>A</div>
                    <div>
                      <p className="font-semibold text-xs leading-snug" style={{ color: '#c9a227' }}>Sujet A (en cours)</p>
                      <p className="text-xs text-gray-600">Indépendance des administrateurs — Circ. 01-2017</p>
                    </div>
                  </div>
                  <a
                    href="/blog/verrou-nationalite-competences-executives-circulaire-02-2017/"
                    onClick={(e) => { e.preventDefault(); navigate('/blog/verrou-nationalite-competences-executives-circulaire-02-2017/'); }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-yellow-200 cursor-pointer transition-all group"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-white border border-gray-200 text-gray-500" style={{ fontSize: '10px', fontWeight: 'bold' }}>B</div>
                    <div>
                      <p className="font-semibold text-xs text-gray-700 group-hover:text-yellow-700 leading-snug">Sujet B</p>
                      <p className="text-xs text-gray-500">Verrou Nationalité — Circ. 02-2017</p>
                    </div>
                  </a>
                  <a
                    href="/blog/3-lignes-defense-circulaire-03-2017/"
                    onClick={(e) => { e.preventDefault(); navigate('/blog/3-lignes-defense-circulaire-03-2017/'); }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-yellow-200 cursor-pointer transition-all group"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-white border border-gray-200 text-gray-500" style={{ fontSize: '10px', fontWeight: 'bold' }}>C</div>
                    <div>
                      <p className="font-semibold text-xs text-gray-700 group-hover:text-yellow-700 leading-snug">Sujet C</p>
                      <p className="text-xs text-gray-500">3 Lignes de Défense — Circ. 03-2017</p>
                    </div>
                  </a>
                  <a
                    href="/blog/protection-lanceurs-alerte-circulaire-01-2017/"
                    onClick={(e) => { e.preventDefault(); navigate('/blog/protection-lanceurs-alerte-circulaire-01-2017/'); }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-yellow-200 cursor-pointer transition-all group"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-white border border-gray-200 text-gray-500" style={{ fontSize: '10px', fontWeight: 'bold' }}>D</div>
                    <div>
                      <p className="font-semibold text-xs text-gray-700 group-hover:text-yellow-700 leading-snug">Sujet D</p>
                      <p className="text-xs text-gray-500">Lanceurs d'Alerte — Art. 44, Circ. 01-2017</p>
                    </div>
                  </a>
                  <a
                    href="/blog/comites-specialises-circulaire-01-2017/"
                    onClick={(e) => { e.preventDefault(); navigate('/blog/comites-specialises-circulaire-01-2017/'); }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-yellow-200 cursor-pointer transition-all group"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-white border border-gray-200 text-gray-500" style={{ fontSize: '10px', fontWeight: 'bold' }}>E</div>
                    <div>
                      <p className="font-semibold text-xs text-gray-700 group-hover:text-yellow-700 leading-snug">Sujet E</p>
                      <p className="text-xs text-gray-500">Comités Spécialisés — Art. 55-62</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* CTA sidebar */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-shield-user-line text-xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug text-white">Diagnostic KHEPRA INDEPENDENCE-Matrix™</h4>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Score d'indépendance confidentiel sur 5 dimensions. Plan de conformité priorisé.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  Demander le diagnostic
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>

              <MiniGuideCTA guide="gouvernance-imf" variant="sidebar" />

              {/* Regulatory sources */}
              <div className="rounded-2xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Références réglementaires</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Circulaire n°01-2017/CB/C', sub: 'Gouvernance — UMOA', icon: 'ri-file-text-line' },
                    { label: 'Circulaire n°03-2017/CB/C', sub: 'Contrôle interne — UMOA', icon: 'ri-file-text-line' },
                    { label: 'Principes G20/OCDE (2023)', sub: 'Gouvernance d\'entreprise', icon: 'ri-global-line' },
                    { label: 'Bâle III — BCBS', sub: 'Principes de gouvernance', icon: 'ri-bar-chart-line' },
                    { label: 'AUSCGIE révisé 2014', sub: 'Droit des sociétés — OHADA', icon: 'ri-scales-3-line' },
                  ].map((ref, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                      <i className={`${ref.icon} text-sm flex-shrink-0 mt-0.5`} style={{ color: '#c9a227' }}></i>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs leading-snug">{ref.label}</p>
                        <p className="text-xs text-gray-500">{ref.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charte link */}
              <a
                href="/charte-deontologique/"
                onClick={(e) => { e.preventDefault(); navigate('/charte-deontologique'); }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-white hover:border-yellow-300 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 group-hover:border-yellow-300 flex-shrink-0">
                  <i className="ri-shield-keyhole-line text-sm" style={{ color: '#c9a227' }}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-yellow-700 transition-colors">Charte Déontologique</p>
                  <p className="text-xs text-gray-500">Secret professionnel absolu</p>
                </div>
                <i className="ri-arrow-right-line text-gray-300 group-hover:text-yellow-500 transition-colors flex-shrink-0"></i>
              </a>

              {/* Back to blog */}
              <a
                href="/blog/"
                onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2"
              >
                <i className="ri-arrow-left-line"></i>
                Retour au blog
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}



