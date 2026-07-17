import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BlogArticleLayout, { SectionHeading, type BlogArticleSeoProps, type BlogArticleRelatedArticle } from '@/pages/blog/components/BlogArticleLayout';
import { ArticleNewsletterInline } from '@/pages/blog/components/ArticleNewsletterInline';
import { MiniGuideCTA } from '@/pages/blog/components/MiniGuideCTA';
import { ARTICLE_3_LIGNES_DATA, ARTICLE_3_LIGNES_CONTENT } from './data.tsx';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}${ARTICLE_3_LIGNES_DATA.meta.canonicalPath}`;
const d = ARTICLE_3_LIGNES_DATA;
const c = ARTICLE_3_LIGNES_CONTENT;

// ─── Sub-components ───────────────────────────────────────────────────────────

function RegulatoryBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
      <i className="ri-alert-line text-xs"></i>
      {text}
    </span>
  );
}

function FrictionCard({ f }: { f: typeof c.pointsFriction.frictions[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${f.borderClass} overflow-hidden mb-6`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${open ? f.bgClass : 'bg-background-50 hover:bg-secondary-50/50'}`}
      >
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${f.borderClass} bg-background-50 flex-shrink-0 mt-0.5`}>
          <i className={`${f.icon} ${f.colorClass} text-lg`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${f.badgeClass}`}>
              {f.id}
            </span>
            <span className="text-xs text-foreground-500 font-mono">{f.subtitle}</span>
          </div>
          <p className="font-bold text-base text-foreground-950 leading-snug">{f.title}</p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
          <i className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${f.bgClass} border-t-2 ${f.borderClass} px-5 sm:px-6 pb-6 pt-5`}>
          <p className="text-sm text-foreground-700 leading-relaxed mb-5">{f.description}</p>

          <div className="space-y-4 mb-5">
            {f.subPoints.map((sp, i) => (
              <div key={i} className="flex gap-3 bg-background-50 rounded-xl p-4 border border-secondary-200">
                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${f.colorClass} bg-current`}></span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground-950 text-sm mb-1">{sp.title}</p>
                  <p className="text-sm text-foreground-600 leading-relaxed">{sp.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-background-50 rounded-xl p-4 border-2 border-red-200">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 flex-shrink-0">
              <i className="ri-scales-3-line text-red-600 text-base"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">Risque réglementaire</p>
              <p className="text-sm text-foreground-700 leading-relaxed">{f.regulatoryRisk}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PillarCard({ pillar }: { pillar: typeof c.architectureSolution.pillars[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${pillar.borderClass} overflow-hidden mb-5`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${open ? pillar.bgClass : 'bg-background-50 hover:bg-secondary-50/50'}`}
      >
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border-2 ${pillar.borderClass} bg-background-50`}>
          <span className={`font-playfair font-bold text-base ${pillar.colorClass}`}>{pillar.number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-foreground-950 leading-snug">{pillar.title}</p>
          <p className="text-xs text-foreground-500 mt-1 flex items-center gap-1">
            <i className="ri-file-text-line"></i> {pillar.deliverable}
          </p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
          <i className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${pillar.bgClass} border-t-2 ${pillar.borderClass} px-5 sm:px-6 pb-6 pt-5`}>
          <div className="space-y-3">
            {pillar.steps.map((s, i) => (
              <div key={i} className="flex gap-4 bg-background-50 rounded-xl p-4 border border-secondary-200">
                <span className={`flex-shrink-0 font-mono text-xs font-bold ${pillar.colorClass} mt-0.5 w-7`}>{s.step}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground-950 text-sm mb-1">{s.title}</p>
                  <p className="text-sm text-foreground-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MaturityDimension({ dim }: { dim: typeof c.outilPremium.dimensions[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border-2 ${dim.border} overflow-hidden mb-4`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 text-left cursor-pointer transition-colors ${open ? dim.bg : 'bg-background-50 hover:bg-secondary-50/50'}`}
      >
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 ${dim.border} bg-background-50 flex-shrink-0`}>
          <i className={`${dim.icon} ${dim.color} text-base`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground-400 mr-2">{dim.id}</span>
          <span className="font-bold text-foreground-950 text-sm">{dim.title}</span>
          <p className="text-xs text-foreground-500 mt-0.5 leading-snug line-clamp-1">{dim.description}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} className={`w-2 h-4 rounded-sm ${dim.bg} ${dim.border} border`}></span>
          ))}
          <i className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform duration-300 ml-1 ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {open && (
        <div className={`${dim.bg} border-t-2 ${dim.border} px-5 pb-5 pt-4`}>
          <p className="text-sm text-foreground-600 leading-relaxed mb-4">{dim.description}</p>
          <div className="space-y-2">
            {dim.levels.map((l, i) => (
              <div key={i} className="flex items-start gap-3 bg-background-50 rounded-xl p-3 border border-secondary-200">
                <div className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border-2 ${dim.border} font-bold text-xs ${dim.color}`}>
                  {l.score}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-bold text-xs ${dim.color} uppercase tracking-wide mr-2`}>{l.label}</span>
                  <span className="text-xs text-foreground-600">{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Schema builders ──────────────────────────────────────────────────────────

function buildArticleSchema(isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.seo.description,
    image: d.heroImage,
    datePublished: d.meta.publishedDate,
    dateModified: d.meta.modifiedDate,
    author: { '@type': 'Person', name: d.meta.author, url: `${SITE_URL}/about`, jobTitle: d.meta.authorTitle },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.seo.keywords,
    articleSection: d.meta.category,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TroisLignesDefensePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const seo: BlogArticleSeoProps = {
    title: d.seo.title,
    description: d.seo.description,
    keywords: d.seo.keywords,
    canonicalPath: d.meta.canonicalPath,
    hreflangSlug: '3-lignes-defense-circulaire-03-2017',
    ogUrl: ARTICLE_URL,
    ogImage: d.heroImage,
    ogImageWidth: '1400',
    ogImageHeight: '520',
    ogImageAlt: d.heroAlt,
    articlePublishedTime: d.meta.publishedDate,
    articleModifiedTime: d.meta.modifiedDate,
    articleAuthor: d.meta.author,
    articleSection: d.meta.category,
    articleTags: d.meta.tags,
    twitterLabel1: isEn ? 'Reading time' : 'Temps de lecture',
    twitterData1: d.meta.readTime,
    twitterLabel2: isEn ? 'Category' : 'Catégorie',
    twitterData2: d.meta.category,
  };

  const relatedArticles: BlogArticleRelatedArticle[] = d.relatedArticles.map((rel) => ({
    href: rel.href,
    title: rel.title,
    category: rel.category,
    readTime: rel.readTime,
  }));

  const heroBadges = (
    <>
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-500/15 text-accent-400 border border-accent-500/35">
        <i className="ri-award-line text-xs"></i>
        {d.badge}
      </span>
      <RegulatoryBadge text="Circulaire n°03-2017/CB/C" />
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
        <i className="ri-time-line text-xs"></i>
        {d.meta.readTime}
      </span>
    </>
  );

  const heroOverlay = (
    <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />
  );

  const sidebar = (
    <>
      {/* Table of contents */}
      <div className="bg-secondary-100 rounded-2xl p-5 border border-secondary-200">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground-500 mb-4">Sommaire</p>
        <nav className="space-y-1.5">
          {d.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-start gap-2 text-sm text-foreground-600 hover:text-accent-700 transition-colors cursor-pointer py-1 leading-snug group"
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-md bg-background-50 border border-secondary-200 group-hover:border-accent-300 flex-shrink-0 mt-0.5">
                <i className={`${s.icon} text-xs text-foreground-400 group-hover:text-accent-600`}></i>
              </div>
              <span>{s.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Série éditoriale sidebar */}
      <div className="rounded-2xl p-5 border border-secondary-200 bg-background-50">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground-500 mb-4">Quintilogie Gouvernance Bancaire</p>
        <div className="space-y-2.5">
          <a href="/blog/independance-administrateurs-circulaire-01-2017/" onClick={(e) => { e.preventDefault(); navigate('/blog/independance-administrateurs-circulaire-01-2017/'); }} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary-100 border border-secondary-200 hover:border-accent-200 cursor-pointer transition-all group">
            <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-background-50 border border-secondary-200 text-foreground-500 font-bold text-xs">A</div>
            <div>
              <p className="font-semibold text-xs text-foreground-700 group-hover:text-accent-700 leading-snug">Sujet A</p>
              <p className="text-xs text-foreground-500">Indépendance des administrateurs — Circ. 01-2017</p>
            </div>
          </a>
          <a href="/blog/verrou-nationalite-competences-executives-circulaire-02-2017/" onClick={(e) => { e.preventDefault(); navigate('/blog/verrou-nationalite-competences-executives-circulaire-02-2017/'); }} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary-100 border border-secondary-200 hover:border-accent-200 cursor-pointer transition-all group">
            <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-background-50 border border-secondary-200 text-foreground-500 font-bold text-xs">B</div>
            <div>
              <p className="font-semibold text-xs text-foreground-700 group-hover:text-accent-700 leading-snug">Sujet B</p>
              <p className="text-xs text-foreground-500">Verrou Nationalité — Circ. 02-2017</p>
            </div>
          </a>
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-accent-100/50 border border-accent-200">
            <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-accent-200/50 text-accent-600 font-bold text-xs">C</div>
            <div>
              <p className="font-semibold text-xs leading-snug text-accent-600">Sujet C (en cours)</p>
              <p className="text-xs text-foreground-600">3 Lignes de Défense — Circ. 03-2017</p>
            </div>
          </div>
          <a href="/blog/protection-lanceurs-alerte-circulaire-01-2017/" onClick={(e) => { e.preventDefault(); navigate('/blog/protection-lanceurs-alerte-circulaire-01-2017/'); }} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary-100 border border-secondary-200 hover:border-accent-200 cursor-pointer transition-all group">
            <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-background-50 border border-secondary-200 text-foreground-500 font-bold text-xs">D</div>
            <div>
              <p className="font-semibold text-xs text-foreground-700 group-hover:text-accent-700 leading-snug">Sujet D</p>
              <p className="text-xs text-foreground-500">Lanceurs d'Alerte — Art. 44, Circ. 01-2017</p>
            </div>
          </a>
          <a href="/blog/comites-specialises-circulaire-01-2017/" onClick={(e) => { e.preventDefault(); navigate('/blog/comites-specialises-circulaire-01-2017/'); }} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary-100 border border-secondary-200 hover:border-accent-200 cursor-pointer transition-all group">
            <div className="w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 bg-background-50 border border-secondary-200 text-foreground-500 font-bold text-xs">E</div>
            <div>
              <p className="font-semibold text-xs text-foreground-700 group-hover:text-accent-700 leading-snug">Sujet E</p>
              <p className="text-xs text-foreground-500">Comités Spécialisés — Art. 55-62</p>
            </div>
          </a>
        </div>
      </div>

      {/* CTA sidebar */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
        <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
          <i className="ri-shield-star-line text-xl" style={{ color: '#c9a227' }}></i>
        </div>
        <h4 className="font-playfair font-bold text-lg mb-2 leading-snug text-white">Diagnostic KHEPRA 3LD-Matrix™</h4>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Score de maturité confidentiel sur 5 dimensions. Plan d'action priorisé par risque réglementaire.
        </p>
        <button onClick={() => navigate('/contact')} className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}>
          Demander le diagnostic
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>

      <MiniGuideCTA guide="gouvernance-imf" variant="sidebar" />

      {/* Regulatory sources */}
      <div className="rounded-2xl p-5 border border-secondary-200 bg-background-50">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground-500 mb-4">Références réglementaires</p>
        <div className="space-y-2.5">
          {[
            { label: 'Circulaire n°03-2017/CB/C', sub: 'Contrôle interne — UMOA', icon: 'ri-file-text-line' },
            { label: 'Circulaire n°01-2017/CB/C', sub: 'Gouvernance — UMOA', icon: 'ri-file-text-line' },
            { label: 'IIA Three Lines Model 2020', sub: 'Institut des Auditeurs Internes', icon: 'ri-shield-check-line' },
            { label: 'Instructions CB-UMOA n°026-029', sub: 'Bâle II/III — Ratios prudentiels', icon: 'ri-bar-chart-line' },
            { label: 'Directive UEMOA n°02/2015', sub: 'LBC/FT — CENTIF', icon: 'ri-lock-line' },
          ].map((ref, i) => (
            <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-secondary-200 bg-secondary-100">
              <i className={`${ref.icon} text-sm flex-shrink-0 mt-0.5 text-accent-500`}></i>
              <div>
                <p className="font-semibold text-foreground-950 text-xs leading-snug">{ref.label}</p>
                <p className="text-xs text-foreground-500">{ref.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charte link */}
      <a href="/charte-deontologique/" onClick={(e) => { e.preventDefault(); navigate('/charte-deontologique'); }} className="flex items-center gap-3 p-4 rounded-2xl border border-secondary-200 bg-background-50 hover:border-accent-300 transition-all cursor-pointer group">
        <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-secondary-200 group-hover:border-accent-300 flex-shrink-0">
          <i className="ri-shield-keyhole-line text-sm text-accent-500"></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground-950 group-hover:text-accent-700 transition-colors">Charte Déontologique</p>
          <p className="text-xs text-foreground-500">Secret professionnel absolu</p>
        </div>
        <i className="ri-arrow-right-line text-foreground-300 group-hover:text-accent-500 transition-colors flex-shrink-0"></i>
      </a>

      {/* Back to blog */}
      <a href="/blog/" onClick={(e) => { e.preventDefault(); navigate('/blog'); }} className="flex items-center justify-center gap-2 text-sm text-foreground-500 hover:text-foreground-800 transition-colors cursor-pointer py-2">
        <i className="ri-arrow-left-line"></i>
        Retour au blog
      </a>
    </>
  );

  return (
    <BlogArticleLayout
      seo={seo}
      heroImage={d.heroImage}
      heroAlt={d.heroAlt}
      breadcrumbHome={d.breadcrumb.home}
      breadcrumbBlog={d.breadcrumb.blog}
      breadcrumbCurrent={d.breadcrumb.current}
      heroBadges={heroBadges}
      heroTitle={d.title}
      heroSubtitle={d.subtitle}
      heroOverlayExtra={heroOverlay}
      authorName={d.meta.author}
      authorTitle={d.meta.authorTitle}
      date="29 mai 2026"
      readTime={d.meta.readTime}
      tags={d.meta.tags}
      excerpt={d.excerpt}
      articleUrl={ARTICLE_URL}
      shareTitle={d.title}
      shareExcerpt={d.excerpt}
      schemaJson={[buildArticleSchema(isEn), buildFaqSchema()]}
      sidebar={sidebar}
      relatedArticles={relatedArticles}
      relatedTitle="Articles connexes"
    >
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
              <div className={`w-8 h-8 flex items-center justify-center rounded-xl border-2 ${block.border} bg-background-50 flex-shrink-0`}>
                <i className={`${block.icon} ${block.color} text-base`}></i>
              </div>
              <h3 className="font-bold text-foreground-950 text-base leading-snug">{block.title}</h3>
            </div>

            <div className="px-5 sm:px-6 py-5 space-y-4">
              {block.id === 'A' ? (
                <>
                  <p className="text-sm text-foreground-600 leading-relaxed">Le dispositif de contrôle interne et de gestion des risques repose sur un corpus normatif à trois niveaux :</p>
                  <div className="overflow-x-auto rounded-xl border border-secondary-200">
                    <table className="w-full text-xs min-w-[600px]">
                      <thead>
                        <tr className="bg-secondary-50 border-b border-secondary-200">
                          {block.tableHeaders!.map((h, i) => (
                            <th key={i} className="px-3 py-3 text-left font-bold text-foreground-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-100">
                        {block.tableRows!.map((row, ri) => (
                          <tr key={ri} className="hover:bg-secondary-50/50 transition-colors">
                            {row.map((cell, ci) => (
                              <td key={ci} className={`px-3 py-2.5 text-foreground-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-foreground-950' : ''}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-foreground-400 italic">{block.sourceNote}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground-600 leading-relaxed">{block.intro}</p>
                  <ul className="space-y-2.5">
                    {block.bullets!.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 bg-secondary-100 rounded-xl p-3 border border-secondary-200">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-accent-500"></span>
                        <p className="text-sm text-foreground-700 leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-foreground-400 italic">{block.sourceNote}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ─── POINTS DE FRICTION ─── */}
      <section id="points-friction" className="mb-14 scroll-mt-28">
        <SectionHeading id="points-friction" number="III" title={c.pointsFriction.heading} />
        <p className="text-sm text-foreground-600 leading-relaxed mb-8">{c.pointsFriction.intro}</p>

        {c.pointsFriction.frictions.map((f) => (
          <FrictionCard key={f.id} f={f} />
        ))}
      </section>

      <ArticleNewsletterInline />

      <MiniGuideCTA guide="gouvernance-imf" />

      {/* ─── ARCHITECTURE SOLUTION ─── */}
      <section id="architecture-solution" className="mb-14 scroll-mt-28">
        <SectionHeading id="architecture-solution" number="IV" title={c.architectureSolution.heading} />
        <p className="text-sm text-foreground-600 leading-relaxed mb-8">{c.architectureSolution.intro}</p>

        {/* 3 lignes diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { line: '1ère Ligne', sub: 'Opérations', icon: 'ri-settings-3-line', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', items: ["Unités opérationnelles (commercial, crédit, opérations)", "Propriétaires des risques au quotidien", "Auto-contrôles et gestion de première instance"] },
            { line: '2ème Ligne', sub: 'Supervision & Contrôle', icon: 'ri-eye-line', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', items: ["Conformité (RCLBC/FT, politique réglementaire)", "Gestion des Risques (cartographie, limites)", "Contrôle permanent et surveillance réglementaire"] },
            { line: '3ème Ligne', sub: 'Assurance Indépendante', icon: 'ri-shield-star-line', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', items: ["Direction d'Audit Interne (DAI) totalement indépendante", "Rapport fonctionnel direct au Comité d'Audit (CA)", "Plan d'audit fondé sur les risques (Circulaire n°03-2017, Art. 49)"] },
          ].map((ln, i) => (
            <div key={i} className={`rounded-2xl border-2 ${ln.border} ${ln.bg} p-5`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${ln.border} bg-background-50 mb-3`}>
                <i className={`${ln.icon} ${ln.color} text-xl`}></i>
              </div>
              <p className={`font-bold text-sm ${ln.color} uppercase tracking-wide mb-0.5`}>{ln.line}</p>
              <p className="font-playfair font-bold text-foreground-950 text-base mb-3 leading-snug">{ln.sub}</p>
              <ul className="space-y-1.5">
                {ln.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-foreground-700">
                    <i className={`ri-arrow-right-s-line ${ln.color} flex-shrink-0 mt-0.5`}></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                <i className="ri-tools-line text-2xl" style={{ color: '#c9a227' }}></i>
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
          <p className="text-sm font-semibold text-foreground-700 mb-4 flex items-center gap-2">
            <i className="ri-bar-chart-grouped-line text-accent-500"></i>
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
          <h4 className="font-playfair text-xl font-bold text-foreground-950 mb-3">{c.outilPremium.accessInfo.title}</h4>
          <p className="text-sm text-foreground-600 leading-relaxed mb-6 max-w-xl mx-auto">{c.outilPremium.accessInfo.text}</p>
          <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105 mb-3" style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}>
            {c.outilPremium.accessInfo.cta}
            <i className="ri-arrow-right-line"></i>
          </button>
          <p className="text-xs text-foreground-400 italic">{c.outilPremium.accessInfo.note}</p>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <div className="mb-8 rounded-2xl border-2 border-accent-200 bg-accent-50 p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-accent-100 border border-accent-300 flex-shrink-0">
            <i className="ri-information-line text-accent-700 text-base"></i>
          </div>
          <p className="text-xs text-accent-800 leading-relaxed">
            <strong>Avertissement :</strong> Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l'UMOA ainsi qu'à leurs conseils spécialisés.
          </p>
        </div>
      </div>

      {/* ─── FAQ ─── */}
      <section id="faq" className="mb-14 scroll-mt-28">
        <SectionHeading id="faq" number="VI" title="Questions Fréquentes — Niveau Expert" />
        <div className="space-y-3">
          {d.faq.map((item, i) => (
            <div key={i} className="border border-secondary-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-background-50 hover:bg-secondary-50 transition-colors cursor-pointer">
                <span className="font-semibold text-foreground-950 text-sm leading-snug">{item.q}</span>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <i className={`ri-arrow-down-s-line text-foreground-400 text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}></i>
                </div>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 bg-secondary-50 border-t border-secondary-100">
                  <p className="text-sm text-foreground-600 leading-relaxed pt-4">{item.a}</p>
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
            { title: 'Circulaire n°03-2017/CB/C relative au contrôle interne, à la gestion des risques et à la conformité', institution: "Commission Bancaire de l'UMOA", year: '2017', url: 'https://www.bceao.int' },
            { title: 'Circulaire n°01-2017/CB/C relative à la gouvernance des établissements de crédit', institution: "Commission Bancaire de l'UMOA", year: '2017', url: 'https://www.bceao.int' },
            { title: "The IIA's Three Lines Model (2020)", institution: 'Institut des Auditeurs Internes (IIA)', year: '2020', url: 'https://www.theiia.org' },
            { title: 'Instructions CB-UMOA n°026 à 029-11-2016 (ratios prudentiels Bale II/III)', institution: "Commission Bancaire de l'UMOA", year: '2016', url: 'https://www.bceao.int' },
            { title: 'Directive UEMOA n°02/2015/CM/UEMOA relative à la LBC/FT', institution: 'UEMOA', year: '2015', url: 'https://www.uemoa.int' },
            { title: 'Basel Committee on Banking Supervision — Principles for enhancing corporate governance', institution: 'BCBS', year: '2015', url: 'https://www.bis.org' },
          ].map((ref, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-secondary-200 bg-secondary-100">
              <i className="ri-file-text-line text-sm flex-shrink-0 mt-0.5 text-accent-500"></i>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground-950 text-xs leading-snug mb-0.5">{ref.title}</p>
                <p className="text-xs text-foreground-500">{ref.institution} — {ref.year}</p>
                <a href={ref.url} target="_blank" rel="nofollow noopener noreferrer" className="text-xs hover:underline text-accent-600">{ref.url}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MiniGuideCTA guide="gouvernance-imf" />
      <div className="my-10 rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
        <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
              <i className="ri-shield-keyhole-line text-2xl" style={{ color: '#c9a227' }}></i>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Mission de Gouvernance KHEPRA EXPERTS</p>
              <h3 className="font-playfair text-xl font-bold text-white leading-snug">Évaluez la maturité du dispositif des 3 lignes de défense de votre institution</h3>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
            Notre mission de diagnostic KHEPRA 3LD-Matrix™ vous fournit un score de maturité confidentiel sur 5 dimensions, une cartographie des conflits de responsabilités et un plan d'action priorisé par niveau de risque réglementaire (Commission Bancaire UMOA).
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/contact')} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}>
              Demander la mission de diagnostic
              <i className="ri-arrow-right-line"></i>
            </button>
            <button onClick={() => navigate('/charte-deontologique')} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap">
              Consulter notre charte déontologique
              <i className="ri-external-link-line"></i>
            </button>
          </div>
        </div>
      </div>
    </BlogArticleLayout>
  );
}