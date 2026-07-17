import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { kbrArticles } from '@/mocks/khepraBusinessReview';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

/* ============================================================
   KOS — HomeKhepraBusinessReview v3.0
   Juin 2026 — Refonte lisibilité. 3 articles au lieu de 4.
   Grid 3 colonnes desktop. Textes plus grands. Cartes plus aérées.
   Vert foncé feuille d'arbre + Or.
   ============================================================ */

export default function HomeKhepraBusinessReview() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  /* 3 articles : les 2 featured + le plus récent non-featured */
  const featuredArticles = kbrArticles.filter((a) => a.featured).slice(0, 2);
  const restArticles = kbrArticles.filter((a) => !a.featured);
  const selectedArticles = [...featuredArticles, ...restArticles].slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-background-100 border-y border-background-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — plus aéré */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
            <div>
              <BigFourSubtitleBar
                label={isEn ? 'Premium Publication' : 'Publication Premium'}
                variant="double-stroke"
                icon="ri-book-open-line"
                accentColor="primary"
                className="mb-5"
              />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950" style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}>
                Khepra Business{' '}
                <span className="text-primary-600">Review</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-foreground-600 text-left lg:text-right">
                {isEn
                  ? 'Premium analysis on African finance, governance, compliance, digital transformation and ESG.'
                  : 'Analyses premium sur la finance, la gouvernance, la conformité, la transformation digitale et l\'ESG.'}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Articles Grid — 1 col mobile, 2 cols tablette, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10">
          {selectedArticles.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 80}>
              <article
                className="group bg-background-50 rounded-xl border border-background-200/70 overflow-hidden hover:border-primary-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/khepra-business-review/?article=${article.slug}`)}
              >
                {/* Image — plus haute pour la respiration */}
                <div className="relative h-48 md:h-44 overflow-hidden bg-foreground-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary-500/90 text-white">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold bg-foreground-950/70 text-white">
                      <i className="ri-time-line" />
                      {article.readingTime} min
                    </span>
                  </div>
                </div>

                {/* Content — plus spacieux, texte plus grand */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Édition */}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400 mb-2">
                    {article.edition.split('—')[0].trim()}
                  </span>

                  {/* Titre — lisible */}
                  <h3
                    className="font-bold text-[15px] leading-[1.35] text-foreground-950 mb-2.5 line-clamp-2 group-hover:text-primary-600 transition-colors"
                    style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}
                  >
                    {article.title}
                  </h3>

                  {/* Sous-titre — plus grand */}
                  <p className="text-[13px] leading-relaxed text-foreground-600 mb-4 line-clamp-2">
                    {article.subtitle}
                  </p>

                  {/* Tags — plus visibles */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-background-100 text-foreground-600 border border-background-200/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Auteur — bien visible */}
                  <div className="flex items-center gap-3 mt-auto pt-3.5 border-t border-background-200/60">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-foreground-200 flex-shrink-0">
                      <img
                        src={article.authorImage}
                        alt={article.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-foreground-900 truncate">
                        {article.author}
                      </div>
                      <div className="text-[10px] text-foreground-500 truncate">
                        {article.authorCredentials.split('—')[0].trim()}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={200}>
          <div className="text-center">
            <button
              onClick={() => navigate('/khepra-business-review/')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-primary-500 text-white"
              style={{ boxShadow: '0 8px 28px oklch(0.50 0.14 148 / 0.28)' }}
            >
              <i className="ri-book-open-line text-lg" />
              {isEn ? 'Read Khepra Business Review' : 'Lire la Khepra Business Review'}
              <i className="ri-arrow-right-line" />
            </button>
            <p className="text-xs text-foreground-400 mt-3">
              {isEn
                ? '16 in-depth articles · Premium quality · New edition every month'
                : '16 articles de fond · Qualité premium · Nouvelle édition chaque mois'}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}