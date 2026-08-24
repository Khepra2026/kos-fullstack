import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  variant?: 'default' | 'compact';
  accentColor?: string;
}

export function FAQAccordion({
  items,
  title = 'Questions Fréquentes',
  variant = 'default',
  accentColor = 'gold',
}: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const colorClasses = {
    gold: {
      bg: 'bg-gold-50',
      border: 'border-gold-200',
      text: 'text-gold-700',
      icon: 'text-gold-600',
      hover: 'hover:bg-gold-100',
    },
    brand: {
      bg: 'bg-brand-50',
      border: 'border-brand-200',
      text: 'text-brand-700',
      icon: 'text-brand-600',
      hover: 'hover:bg-brand-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      icon: 'text-emerald-600',
      hover: 'hover:bg-emerald-100',
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.gold;

  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${colors.bg} rounded-lg overflow-hidden border ${colors.border}`}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-5 py-4 flex items-center justify-between text-left ${colors.hover} transition-colors cursor-pointer`}
              aria-expanded={expandedIndex === index}
            >
              <span className="font-semibold text-gray-900 pr-4 text-sm">
                {item.question}
              </span>
              <i
                className={expandedIndex === index ? `ri-arrow-up-s-line text-lg ${colors.icon} flex-shrink-0` : `ri-arrow-down-s-line text-lg ${colors.icon} flex-shrink-0`}
              ></i>
            </button>
            {expandedIndex === index && (
              <div className="px-5 pb-4">
                <p
                  className="text-gray-700 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            <i className="ri-question-line"></i>
            FAQ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors cursor-pointer"
                aria-expanded={expandedIndex === index}
              >
                <span className="font-semibold text-gray-900 pr-4 text-base">
                  {item.question}
                </span>
                <i
                  className={expandedIndex === index ? `ri-arrow-up-s-line text-xl ${colors.icon} flex-shrink-0` : `ri-arrow-down-s-line text-xl ${colors.icon} flex-shrink-0`}
                ></i>
              </button>
              {expandedIndex === index && (
                <div className="px-6 pb-5 border-t border-gray-200 pt-4">
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



