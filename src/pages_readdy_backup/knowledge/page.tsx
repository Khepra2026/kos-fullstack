import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import aILeadForm from '@/components/aILeadForm';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

interface KbPage {
  id: string;
  slug: string;
  doc_ids: string[];
  title: string;
  meta_desc: string;
  h1: string;
  content_html: string;
  faq_json: Array<{ q: string; a: string }>;
  eeat_reviewed_by: string;
  sitemap_priority: number;
  created_at: string;
  updated_at: string;
}

export default function KnowledgeBasePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<KbPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Fetch page from kb_pages ───────────────────────────────────────
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('Slug manquant');
      return;
    }

    let cancelled = false;

    const fetchPage = async () => {
      try {
        setLoading(true);
        setError('');

        const { data, error: dbError } = await supabase
          .from('kb_pages')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (cancelled) return;

        if (dbError) {
          setError(`Erreur de chargement: ${dbError.message}`);
          setLoading(false);
          return;
        }

        if (!data) {
          setError('Page introuvable');
          setLoading(false);
          return;
        }

        setPage(data as KbPage);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur inconnue');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ── Log KOS AI pour auto-développement ─────────────────────────────
  useEffect(() => {
    if (!page) return;

    const logRender = async () => {
      const retention = new Date();
      retention.setFullYear(retention.getFullYear() + 1);

      try {
        await supabase.from('kos_audit_log').insert({
          user_id: 'ssr',
          prompt_hash: 'page_render',
          response_hash: page.slug,
          model_version: 'kos-v2.1',
          sources: page.doc_ids || [],
          iso_compliant: true,
          retention_until: retention.toISOString().split('T')[0],
        });
      } catch {
        // Silencieux — le log ne doit pas bloquer le rendu
      }
    };

    logRender();
  }, [page]);

  // ── Loading state ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <i className="ri-loader-4-line text-4xl text-primary-500 animate-spin"></i>
            <p className="text-sm text-foreground-500">Chargement de la page...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Error / Not Found ─────────────────────────────────────────────
  if (error || !page) {
    return (
      <div className="min-h-screen bg-background-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-secondary-100 rounded-full mb-6">
            <i className="ri-article-line text-4xl text-foreground-400"></i>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-foreground-950 mb-4">
            {error === 'Page introuvable' ? 'Page non trouvée' : 'Erreur de chargement'}
          </h1>
          <p className="text-foreground-500 mb-8 max-w-md">
            {error === 'Page introuvable'
              ? "Cette page de la base de connaissances n'existe pas ou a été déplacée."
              : error}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 px-6 py-3 rounded-full font-semibold transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            Retour à l'accueil
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ── SEO & Schema.org ─────────────────────────────────────────────
  const canonicalUrl = `${SITE_URL}/knowledge/${page.slug}`;
  const isoDate = page.updated_at
    ? new Date(page.updated_at).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Schema.org FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (page.faq_json || []).map((faq) => ({
      '@type': 'Question',
      name: faq.q || faq.question || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a || faq.answer || '',
      },
    })),
  };

  // Schema.org TechArticle
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.h1 || page.title,
    author: {
      '@type': 'Person',
      name: page.eeat_reviewed_by || 'SIMDA Essoyomèwè',
    },
    dateModified: isoDate,
    about: ['BCEAO', 'OHADA', 'ISO 42001', 'Conformité bancaire', 'Gouvernance financière'],
    publisher: {
      '@type': 'Organization',
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
    },
  };

  // Combine both schemas into a graph
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [faqSchema, articleSchema],
  };

  const ogTitle = page.title || page.h1 || 'Base de connaissances | KHEPRA EXPERTS';
  const ogDescription = page.meta_desc || ogTitle;

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <SeoHead
        title={`${ogTitle} | KHEPRA EXPERTS`}
        description={ogDescription}
        keywords="KHEPRA EXPERTS, BCEAO, OHADA, conformité, gouvernance, finance, régulation, Afrique francophone, UEMOA, CEMAC"
        canonicalPath={`/knowledge/${page.slug}`}
        ogType="article"
        ogUrl={canonicalUrl}
        ogLocale="fr_FR"
        articlePublishedTime={isoDate}
        articleModifiedTime={isoDate}
        articleAuthor={page.eeat_reviewed_by || 'SIMDA Essoyomèwè'}
        articleSection="Base de connaissances"
        schemaJson={schemaJson}
      />

      <Navigation />

      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-foreground-500 mb-8">
            <Link to="/" className="hover:text-primary-500 transition-colors cursor-pointer">
              Accueil
            </Link>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <Link to="/knowledge-institute" className="hover:text-primary-500 transition-colors cursor-pointer">
              Knowledge Institute
            </Link>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <span className="text-foreground-700 font-medium truncate max-w-[200px]">
              {page.h1 || page.title}
            </span>
          </nav>

          <article className="prose max-w-none">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground-950 leading-tight mb-4">
              {page.h1 || page.title}
            </h1>

            <p className="text-sm text-foreground-500 mb-8 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <i className="ri-calendar-line text-primary-500"></i>
                Mis à jour: {new Date(page.updated_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-user-line text-primary-500"></i>
                Revu par: {page.eeat_reviewed_by || 'SIMDA Essoyomèwè'}
              </span>
            </p>

            {/* Contenu HTML généré par GPT-4o */}
            <div
              className="prose-headings:font-playfair prose-headings:text-foreground-950 prose-p:text-foreground-700 prose-p:leading-relaxed prose-li:text-foreground-700 prose-strong:text-foreground-900 prose-a:text-primary-600 prose-a:hover:text-primary-700"
              dangerouslySetInnerHTML={{ __html: page.content_html || '<p>Contenu en cours de rédaction.</p>' }}
            />

            {/* FAQ Section */}
            {page.faq_json && page.faq_json.length > 0 && (
              <section className="mt-12 pt-8 border-t border-secondary-200">
                <h2 className="font-playfair text-2xl font-bold text-foreground-950 mb-6">
                  Questions fréquentes
                </h2>
                <div className="space-y-4">
                  {page.faq_json.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-secondary-200 bg-background-50 overflow-hidden"
                    >
                      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none hover:bg-secondary-50 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 flex-shrink-0">
                          <i className="ri-question-mark text-sm"></i>
                        </div>
                        <span className="font-semibold text-foreground-950 text-sm flex-1">
                          {faq.q || faq.question}
                        </span>
                        <i className="ri-arrow-down-s-line text-foreground-400 group-open:rotate-180 transition-transform"></i>
                      </summary>
                      <div className="px-5 pb-4 pl-[4.5rem]">
                        <p className="text-sm text-foreground-700 leading-relaxed">
                          {faq.a || faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* KOS AI Lead Form */}
            <aILeadForm slug={page.slug} />

            {/* CTA final */}
            <div className="mt-10 rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
              <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                    <i className="ri-shield-keyhole-line text-2xl" style={{ color: '#c9a227' }}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>
                      Expertise KHEPRA EXPERTS
                    </p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">
                      Besoin d'un accompagnement sur ce sujet ?
                    </h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                  Nos équipes Big Four accompagnent les institutions financières, les entreprises et les organismes publics sur l'ensemble des sujets de conformité BCEAO, OHADA, gouvernance et transformation digitale en Afrique francophone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                  >
                    Prendre rendez-vous
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <Link
                    to="/solutions"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Découvrir nos solutions
                    <i className="ri-external-link-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}



