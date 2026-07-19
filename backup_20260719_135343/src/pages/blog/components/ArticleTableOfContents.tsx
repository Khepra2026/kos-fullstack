import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { extractFirstHeadingFromBlock, blockHeadingId } from '';

interface ArticleTableOfContentsProps {
  content: string[];
  isEn: boolean;
}

interface TocEntry {
  blockIndex: number;
  label: string;
  id: string;
}

function buildTocEntries(content: string[]): TocEntry[] {
  const entries: TocEntry[] = [];
  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    if (!block || block.includes('FAQ SEO / IA') || block.includes('CTA CONVERSION')) continue;

    const heading = extractFirstHeadingFromBlock(block);
    if (heading) {
      entries.push({
        blockIndex: i,
        label: heading.length > 60 ? heading.substring(0, 57) + '...' : heading,
        id: blockHeadingId(i),
      });
    }
  }
  return entries;
}

export function ArticleTableOfContents({ content, isEn }: ArticleTableOfContentsProps) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const entries = buildTocEntries(content);

  // Highlight active section based on scroll position
  useEffect(() => {
    if (entries.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 130;
      let current: string | null = null;

      for (const entry of entries) {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = entry.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [entries]);

  const handleClick = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const navOffset = 110;
    const elementTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - navOffset, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 max-h-[60vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-list-check text-gold-600 text-base"></i>
        </div>
        <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
          {t('articleDetail.tableOfContents', isEn ? 'Table of Contents' : 'Sommaire')}
        </h4>
      </div>

      <nav aria-label={isEn ? 'Table of contents' : 'Sommaire'}>
        <ol className="space-y-1">
          {entries.map(({ id, label }, idx) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={`w-full text-left flex items-start gap-2 group cursor-pointer transition-all rounded-lg px-2 py-1.5 ${
                  activeId === id
                    ? 'bg-gold-50 text-gold-700'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold mt-0.5 transition-all ${
                    activeId === id
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="text-xs leading-relaxed line-clamp-2">{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}



