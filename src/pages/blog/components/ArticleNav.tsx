import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveIdToSlug } from '@/data/articleSlugMap';

interface ArticleRef {
  id: string;
  title: string;
  category: string;
  date: string;
}

interface ArticleNavProps {
  currentArticleId: string;
  allArticles: ArticleRef[];
}

function parseDate(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;
  const frMonths: Record<string, string> = {
    janvier: '01', février: '02', mars: '03', avril: '04',
    mai: '05', juin: '06', juillet: '07', août: '08',
    septembre: '09', octobre: '10', novembre: '11', décembre: '12',
  };
  const enMonths: Record<string, string> = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
  };
  const lower = dateStr.toLowerCase();
  for (const [name, num] of Object.entries({ ...frMonths, ...enMonths })) {
    if (lower.includes(name)) {
      const dayMatch = lower.match(/\d+/);
      const yearMatch = lower.match(/\d{4}/);
      const day = dayMatch ? dayMatch[0].padStart(2, '0') : '01';
      const year = yearMatch ? yearMatch[0] : '2024';
      return Date.parse(`${year}-${num}-${day}`);
    }
  }
  return 0;
}

export function ArticleNav({ currentArticleId, allArticles }: ArticleNavProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  if (!allArticles || allArticles.length < 2) return null;

  const currentIdx = allArticles.findIndex(a => a.id === currentArticleId);
  if (currentIdx === -1) return null;

  const sorted = [...allArticles].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const sortedIdx = sorted.findIndex(a => a.id === currentArticleId);

  const prevArticle = sortedIdx > 0 ? sorted[sortedIdx - 1] : null;
  const nextArticle = sortedIdx < sorted.length - 1 ? sorted[sortedIdx + 1] : null;

  if (!prevArticle && !nextArticle) return null;

  const prevSlug = prevArticle ? (resolveIdToSlug(prevArticle.id) ?? prevArticle.id) : null;
  const nextSlug = nextArticle ? (resolveIdToSlug(nextArticle.id) ?? nextArticle.id) : null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-gray-100"
      aria-label={isEn ? 'Article navigation' : 'Navigation entre articles'}
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        {prevArticle && prevSlug ? (
          <Link
            to={`/blog/${prevSlug}/`}
            className="group flex-1 flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <i className="ri-arrow-left-line text-lg"></i>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                {isEn ? 'Previous article' : 'Article précédent'}
              </p>
              <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-700 transition-colors leading-snug">
                {prevArticle.title}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextArticle && nextSlug ? (
          <Link
            to={`/blog/${nextSlug}/`}
            className="group flex-1 flex items-center justify-end gap-4 p-5 rounded-2xl bg-gradient-to-l from-orange-50 to-amber-50 border border-orange-200/60 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer text-right"
          >
            <div className="flex-1 min-w-0 text-right">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                {isEn ? 'Next article' : 'Article suivant'}
              </p>
              <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-700 transition-colors leading-snug">
                {nextArticle.title}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <i className="ri-arrow-right-line text-lg"></i>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}