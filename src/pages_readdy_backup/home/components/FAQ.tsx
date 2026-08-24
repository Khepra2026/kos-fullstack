import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <SchemaFAQPage faqs={faqs} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left column */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <span className="section-label">{t('faq.badge')}</span>
            <h2 className="section-title mb-6 leading-tight">
              {t('faq.title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t('faq.description')}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
              title="Nous contacter pour plus d'informations"
              aria-label="Nous contacter"
            >
              <i className="ri-chat-3-line" aria-hidden="true"></i>
              {t('nav.contact')}
            </a>

            <div className="mt-12 p-6 bg-brand-50 rounded-2xl border border-brand-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-700 rounded-full">
                  <i className="ri-customer-service-2-line text-white text-lg" aria-hidden="true"></i>
                </div>
                <span className="font-semibold text-gray-900">{t('contact.title')}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t('contact.subtitle')}
              </p>
              <a
                href="https://wa.me/22893984909?text=Bonjour%20KHEPRA%20EXPERTS%2C%20j%27ai%20une%20question%20sur%20vos%20services."
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors cursor-pointer"
                title="Nous contacter via WhatsApp"
                aria-label="Contacter via WhatsApp"
              >
                <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right column — accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-gold-400 shadow-md shadow-gold-100'
                      : 'border-gray-200 hover:border-gold-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-white hover:bg-brand-50/50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-gold-700' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-gold-500 rotate-180' : 'bg-gray-100'
                    }`}>
                      <i className={`ri-arrow-down-s-line text-lg ${isOpen ? 'text-white' : 'text-gray-500'}`} aria-hidden="true"></i>
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-1">
                      <div className="w-10 h-0.5 bg-gold-400 mb-4 rounded-full"></div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



