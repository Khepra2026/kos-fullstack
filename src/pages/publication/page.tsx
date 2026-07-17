import { useParams } from 'react-router-dom';
import { usePublicationDetail } from '@/hooks/usePublicationDetail';
import { useState, useEffect, useRef, useCallback } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  blog: { label: 'Article Blog', icon: 'ri-article-line', color: 'bg-primary-100 text-primary-700' },
  kbr: { label: 'Knowledge Brief Report', icon: 'ri-file-search-line', color: 'bg-accent-100 text-accent-700' },
  etude_flash: { label: 'Étude Flash', icon: 'ri-flashlight-line', color: 'bg-amber-100 text-amber-700' },
  note_strategique: { label: 'Note Stratégique', icon: 'ri-lightbulb-flash-line', color: 'bg-emerald-100 text-emerald-700' },
};

const WORDS_PER_MINUTE = 200;

function auteurInitiales(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function calculerTempsLecture(text: string): number {
  const mots = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().split(' ').length;
  return Math.max(1, Math.ceil(mots / WORDS_PER_MINUTE));
}

function formaterTempsLecture(minutes: number): string {
  if (minutes === 1) return '1 min de lecture';
  if (minutes <= 10) return `${minutes} min de lecture`;
  return `${minutes} min de lecture`;
}

export default function PublicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { publication, loading, error } = usePublicationDetail(slug);
  const [cited, setCited] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculer le temps de lecture estimé
  const rawText = publication?.content_html
    ? publication.content_html.replace(/<[^>]*>/g, '')
    : publication?.content_md || '';
  const readingTime = calculerTempsLecture(rawText);

  // Barre de progression au scroll
  const handleScroll = useCallback(() => {
    const article = contentRef.current;
    if (!article) return;

    const rect = article.getBoundingClientRect();
    const articleTop = rect.top;
    const articleHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // On commence à mesurer dès que l'article entre dans le viewport
    const totalScrollable = articleHeight - viewportHeight;
    if (totalScrollable <= 0) {
      setReadingProgress(100);
      return;
    }

    const scrolled = -articleTop;
    const progress = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
    setReadingProgress(progress);
  }, []);

  useEffect(() => {
    if (loading) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, handleScroll]);

  if (loading) {
    return (
      <KOSHubLayout hubId={150} activeTab="publications" tabLabel="Publication">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
          <div className="flex items-center justify-center gap-3 text-foreground-500">
            <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            <span className="text-sm">Chargement de l&apos;article...</span>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error || !publication) {
    return (
      <KOSHubLayout hubId={150} activeTab="publications" tabLabel="Publication">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl" />
            </div>
            <p className="text-sm font-medium" style={{ color: '#b91c1c' }}>Article introuvable</p>
            <p className="text-xs text-foreground-500">{error || 'Aucune publication trouvée pour ce slug'}</p>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  const typeInfo = TYPE_LABELS[publication.pub_type] || TYPE_LABELS.blog;
  const formattedDate = publication.publication_date
    ? new Date(publication.publication_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Date à confirmer';
  const yearPublished = publication.publication_date ? new Date(publication.publication_date).getFullYear() : 2026;

  // Schema.org Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/publication/${publication.slug}#article`,
    headline: publication.title,
    description: publication.abstract || publication.subtitle || publication.title,
    inLanguage: publication.language,
    datePublished: publication.publication_date,
    dateModified: publication.updated_at || publication.publication_date,
    url: `${SITE_URL}/publication/${publication.slug}`,
    wordCount: rawText.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
    keywords: publication.keywords.join(', '),
    identifier: publication.doi ? `doi:${publication.doi}` : undefined,
    sameAs: publication.doi ? `https://doi.org/${publication.doi}` : undefined,
    author: publication.authors.map(a => ({
      '@type': 'Person',
      name: a.name,
      affiliation: a.affiliation ? { '@type': 'Organization', name: a.affiliation } : undefined,
      jobTitle: a.role || undefined,
    })),
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KOS — KHEPRA EXPERTS',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/hero-executive.webp`,
      },
    },
    isPartOf: {
      '@type': 'PublicationIssue',
      name: `KHEPRA KOS — ${typeInfo.label}`,
      issn: '3000-0001',
    },
    about: publication.keywords.map(kw => ({ '@type': 'Thing', name: kw })),
    ...(publication.peer_reviewed && {
      creativeWorkStatus: 'PeerReviewed',
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/publication/${publication.slug}#webpage`,
    },
  };

  return (
    <KOSHubLayout hubId={150} activeTab="publications" tabLabel="Publication">
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Barre de progression sticky */}
      <div className="sticky top-0 z-50 w-full h-1 bg-background-100">
        <div
          className="h-full bg-primary-500 transition-all duration-150 ease-out"
          style={{ width: `${Math.round(readingProgress)}%` }}
        />
      </div>

      <article ref={contentRef} className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb + Type */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <a href="/publications" className="text-xs text-foreground-500 hover:text-primary-600 transition-colors">
            <i className="ri-arrow-left-line mr-1" />Publications
          </a>
          <span className="text-foreground-300">/</span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium ${typeInfo.color}`}>
            <i className={`${typeInfo.icon} text-xs`} />
            {typeInfo.label}
          </span>
          {publication.peer_reviewed && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-medium">
              <i className="ri-shield-check-line text-xs" />Peer-Reviewed
            </span>
          )}
          <span className="text-[11px] text-foreground-400">{publication.language.toUpperCase()}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3 leading-tight">
          {publication.title}
        </h1>

        {/* Subtitle */}
        {publication.subtitle && (
          <p className="text-base md:text-lg text-foreground-600 mb-6 leading-relaxed">{publication.subtitle}</p>
        )}

        {/* Reading time estimation */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground-500">
            <i className="ri-time-line text-sm" />
            {formaterTempsLecture(readingTime)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground-500">
            <i className="ri-file-text-line text-sm" />
            {rawText.replace(/\s+/g, ' ').trim().split(' ').length.toLocaleString()} mots
          </span>
          {readingTime <= 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Lecture rapide</span>
          )}
          {readingTime >= 12 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Lecture approfondie</span>
          )}
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 py-4 border-y border-background-200/60">
          {/* Authors */}
          <div className="flex items-center gap-2">
            {publication.authors.slice(0, 3).map((auteur, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700 shrink-0">
                  {auteurInitiales(auteur.name)}
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-foreground-900">{auteur.name}</p>
                  <p className="text-[10px] text-foreground-500">{auteur.role || auteur.affiliation}</p>
                </div>
              </div>
            ))}
            {publication.authors.length > 3 && (
              <span className="text-xs text-foreground-400">+{publication.authors.length - 3} auteurs</span>
            )}
          </div>

          <div className="flex-1" />

          {/* Date */}
          <div className="text-right">
            <p className="text-xs text-foreground-500">Publié le</p>
            <p className="text-xs font-semibold text-foreground-800">{formattedDate}</p>
          </div>
        </div>

        {/* DOI Badge */}
        {publication.doi && (
          <div className="flex items-center gap-3 mb-6 p-3 bg-background-100 rounded-lg border border-background-200/60">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
              <i className="ri-barcode-line text-accent-600 text-lg" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-foreground-500 uppercase tracking-widest">Identifiant Numérique</p>
              <p className="text-xs text-foreground-800 font-mono truncate">
                <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="nofollow noopener" className="hover:text-primary-600 transition-colors">
                  {publication.doi}
                </a>
              </p>
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(publication.doi || ''); setCited(true); setTimeout(() => setCited(false), 2000); }}
              className="shrink-0 ml-auto px-3 py-1.5 rounded-full text-[10px] font-medium bg-background-50 border border-background-200 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap text-foreground-600"
            >
              {cited ? <><i className="ri-check-line mr-1" />Copié</> : <><i className="ri-file-copy-line mr-1" />Citer</>}
            </button>
          </div>
        )}

        {/* Abstract */}
        {publication.abstract && (
          <div className="mb-6 p-4 bg-background-50 rounded-xl border border-background-200/60">
            <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-2">Résumé</p>
            <p className="text-sm text-foreground-700 leading-relaxed">{publication.abstract}</p>
          </div>
        )}

        {/* Stats pills */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-500">
            <i className="ri-eye-line" />{publication.views_count || 0} vues
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-500">
            <i className="ri-download-line" />{publication.downloads_count || 0} téléchargements
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-500">
            <i className="ri-chat-quote-line" />{publication.citations_count || 0} citations
          </span>
          {publication.region && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">
              <i className="ri-earth-line" />{publication.region}
            </span>
          )}
        </div>

        {/* Content — Rich HTML rendering */}
        <div className="mb-10">
          {publication.content_html ? (
            <div
              className="prose prose-sm max-w-none kos-article-content"
              dangerouslySetInnerHTML={{ __html: publication.content_html }}
            />
          ) : publication.content_md ? (
            <div className="whitespace-pre-wrap text-sm leading-relaxed space-y-4">
              {publication.content_md.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-foreground-950 mt-6 mb-2">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-foreground-900 mt-4 mb-1">{line.replace('### ', '')}</h3>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm text-foreground-700">{line.replace('- ', '')}</li>;
                if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 text-sm text-foreground-700">{line.replace(/^\d+\.\s/, '')}</li>;
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return <p key={i} className="text-sm text-foreground-700 leading-relaxed">{line}</p>;
              })}
            </div>
          ) : (
            <p className="text-sm text-foreground-400 italic">Contenu complet disponible prochainement.</p>
          )}
        </div>

        {/* Keywords */}
        {publication.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {publication.keywords.map((kw, i) => (
              <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200/60">
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Citation block */}
        <div className="mb-10 p-5 bg-background-50 rounded-xl border border-background-200/60">
          <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-2">Comment citer</p>
          <p className="text-xs text-foreground-600 font-mono leading-relaxed">
            {publication.authors.map(a => a.name).join(', ')}. ({yearPublished}). <em>{publication.title}</em>. KHEPRA KOS Cognitive OS. DOI: {publication.doi || 'N/A'}
          </p>
        </div>

        {/* CTA */}
        <div className="p-5 bg-accent-100/60 rounded-xl border border-accent-200/40 text-center">
          <p className="text-sm font-semibold text-accent-900 mb-2">Vous avez une question sur ce sujet ?</p>
          <p className="text-xs text-accent-700 mb-4">Nos experts KHEPRA sont disponibles pour approfondir cette thématique avec vous.</p>
          <a href="/contact" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent-500 text-background-50 text-xs font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-message-3-line" />Contacter un expert
          </a>
        </div>
      </article>
    </KOSHubLayout>
  );
}