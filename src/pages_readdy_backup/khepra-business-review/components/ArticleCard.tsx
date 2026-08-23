import { useState } from 'react';
import type { KBRArticle } from '@/mocks/khepraBusinessReview';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

interface ArticleCardProps {
  article: KBRArticle;
  isEn: boolean;
  onRead: () => void;
}

export default function ArticleCard({ article, isEn, onRead }: ArticleCardProps) {
  const [cardImgFailed, setCardImgFailed] = useState(false);
  const [authorImgFailed, setAuthorImgFailed] = useState(false);
  const [cardImgLoaded, setCardImgLoaded] = useState(false);
  const [authorImgLoaded, setAuthorImgLoaded] = useState(false);

  const cardImgSrc = cardImgFailed
    ? 'https://readdy.ai/api/search-image?query=Premium%20editorial%20publication%20cover%20design%2C%20minimal%20abstract%20geometric%20composition%20with%20green%20and%20gold%20color%20palette%2C%20sophisticated%20business%20publication%20aesthetic%2C%20clean%20typography-friendly%20background%2C%20warm%20professional%20tones&width=800&height=500&seq=kbr-card-fallback&orientation=landscape'
    : article.image;
  const authorImgSrc = authorImgFailed
    ? 'https://readdy.ai/api/search-image?query=Professional%20corporate%20avatar%20placeholder%2C%20simple%20abstract%20silhouette%20on%20clean%20background%2C%20minimalist%20professional%20style%2C%20neutral%20warm%20tones%2C%20square%20format&width=200&height=200&seq=kbr-author-fallback&orientation=squarish'
    : article.authorImage;

  return (
    <article id={`article-${article.id}`} className="group rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col bg-background-50 border border-background-200/70">
      <div
        onClick={onRead}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRead(); } }}
        role="button" tabIndex={0}
        aria-label={`${isEn ? 'Read' : 'Lire'} : ${isEn ? article.titleEn : article.title}`}
        className="relative h-48 sm:h-56 w-full overflow-hidden bg-foreground-100 cursor-pointer"
      >
        {!cardImgLoaded && !cardImgFailed && <div className="absolute inset-0 kbr-skeleton" />}
        <img
          src={cardImgSrc}
          alt={`${isEn ? article.titleEn : article.title} — ${article.category} | Khepra Business Review`}
          title={`${isEn ? article.titleEn : article.title} — Khepra Business Review`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          width="600" height="400" loading="lazy" decoding="async"
          onError={() => setCardImgFailed(true)}
          onLoad={() => setCardImgLoaded(true)}
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary-500/90 text-background-50">{article.category}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-foreground-950/70 text-white">
            <i className="ri-time-line" />{article.readingTime} min
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2.5 rounded-lg bg-primary-500 text-background-50 font-semibold text-xs whitespace-nowrap">
            <i className="ri-book-open-line mr-1.5" />{isEn ? 'Read Article' : "Lire l'Article"}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1 bg-background-50">
        <BigFourSubtitleBar
          label={article.edition}
          variant="minimal-dot"
          accentColor="primary"
          className="mb-3"
        />

        <h3
          onClick={onRead}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRead(); } }}
          role="button" tabIndex={0}
          className="font-heading text-base md:text-lg font-bold mb-2.5 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors cursor-pointer text-foreground-950"
          aria-label={`${isEn ? 'Read' : 'Lire'} : ${isEn ? article.titleEn : article.title}`}
        >
          {isEn ? article.titleEn : article.title}
        </h3>

        <p className="text-[13px] mb-3.5 line-clamp-2 leading-relaxed text-foreground-600">{isEn ? article.subtitleEn : article.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary-100 text-foreground-600 border border-background-200/70">{tag}</span>
          ))}
        </div>

        <div className="mb-3.5 flex items-center gap-1.5 text-[11px] text-foreground-400">
          <i className="ri-dna-line text-xs" />
          <span>{article.dataLineage.length} {isEn ? 'cited sources' : 'sources citées'}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-background-200/70">
          <div className="flex items-center gap-2.5 md:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden flex-shrink-0 bg-background-200">
              {!authorImgLoaded && !authorImgFailed && <div className="w-full h-full kbr-skeleton rounded-full" />}
              <img
                src={authorImgSrc}
                alt={article.author}
                className="w-full h-full object-cover"
                onError={() => setAuthorImgFailed(true)}
                onLoad={() => setAuthorImgLoaded(true)}
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate text-foreground-950">{article.author}</div>
              <div className="text-[11px] truncate text-foreground-400">{article.authorCredentials.split('—')[0].trim()}</div>
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRead(); }}
            type="button"
            className="ml-2 md:ml-3 flex-shrink-0 inline-flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg font-semibold text-xs bg-primary-500 text-background-50 hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-book-open-line" />{isEn ? 'Read' : 'Lire'}<i className="ri-arrow-right-line text-[10px]" />
          </button>
        </div>
      </div>
    </article>
  );
}



