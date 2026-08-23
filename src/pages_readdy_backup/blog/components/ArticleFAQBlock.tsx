import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItemRaw {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

function normalizeFAQItem(item: FAQItemRaw): FAQItem {
  return {
    question: item.question || item.q || '',
    answer: item.answer || item.a || '',
  };
}

interface ArticleFAQBlockProps {
  items: FAQItemRaw[];
  articleId: string;
}

export function ArticleFAQBlock({ items, articleId }: ArticleFAQBlockProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const normalizedItems = items.map(normalizeFAQItem);

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
  const faqPageId = `${SITE_URL}/blog/${articleId}/#faqpage`;

  // Inject FAQPage schema via DOM with a unique ID so SeoHead doesn't clobber it
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': faqPageId,
      mainEntity: normalizedItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    };
    const scriptId = `faq-schema-${articleId}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      // Mark as external (not managed by SeoHead) so SeoHead won't remove it
      script.setAttribute('data-faq-schema', articleId);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [normalizedItems, articleId, faqPageId]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div
        id={`faq-${articleId}`}
        className="my-12 rounded-2xl border border-gray-200 bg-white overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary-50/50 to-white flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-primary-100 rounded-xl flex-shrink-0">
            <i className="ri-question-answer-line text-primary-600 text-lg"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground-950" style={{ fontFamily: 'var(--font-heading), serif' }}>
              {isEn ? 'Frequently Asked Questions' : 'Questions fréquentes'}
            </h3>
            <p className="text-xs text-foreground-500">
              {isEn
                ? 'Structured answers for investors and regulators'
                : 'Réponses structurées pour investisseurs et régulateurs'}
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {normalizedItems.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start gap-3 px-6 py-4 text-left hover:bg-gray-50/60 transition-colors cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-xs font-bold transition-all duration-200 ${
                    openIndex === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="flex-1 text-sm font-semibold text-foreground-800 leading-relaxed">
                  {item.question}
                </span>
                <i
                  className={`ri-arrow-down-s-line text-foreground-400 text-lg transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                ></i>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="ml-9 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-foreground-700 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



