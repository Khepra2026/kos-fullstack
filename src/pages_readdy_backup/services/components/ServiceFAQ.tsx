import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faq: FAQItem[];
  serviceName: string;
}

export function ServiceFAQ({ faq, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  if (!faq || faq.length === 0) return null;

  return (
    <section className="py-20" style={{ background: '#f9f7f2' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)', color: '#6B9B1F' }}
          >
            <i className="ri-question-answer-line" />
            {isEn ? 'Frequently Asked Questions' : 'Questions fréquentes'}
          </div>
          <h2
            className="font-display text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}
          >
            FAQ —{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #86BC25, #a5d936)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {serviceName}
            </span>
          </h2>
          <p className="text-base" style={{ color: '#6b7280', maxWidth: '36rem', margin: '0 auto', lineHeight: '1.618' }}>
            {isEn
              ? `Everything you need to know about our ${serviceName} service in Africa.`
              : `Tout ce que vous devez savoir sur notre service de ${serviceName.toLowerCase()} en Afrique.`}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faq.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                border: openIndex === index ? '1px solid rgba(201,162,39,0.4)' : '1px solid rgba(0,0,0,0.08)',
                background: '#ffffff',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer transition-all duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-sm lg:text-base pr-4" style={{ color: '#0a0a0a', lineHeight: '1.5' }}>
                  {item.question}
                </span>
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: openIndex === index ? 'linear-gradient(135deg, #86BC25, #a5d936)' : 'rgba(201,162,39,0.1)',
                    color: openIndex === index ? '#0a0a0a' : '#86BC25',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <i className="ri-add-line text-sm font-bold" />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.3), transparent)' }} />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#4b5563', lineHeight: '1.618', textAlign: 'justify', hyphens: 'auto' }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA bas de FAQ */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>
            {isEn ? 'Have more questions?' : "Vous avez d'autres questions ?"}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}
          >
            <i className="ri-mail-send-line" />
            {isEn ? 'Contact our experts' : 'Contactez nos experts'}
          </a>
        </div>
      </div>
    </section>
  );
}

export default ServiceFAQ;




