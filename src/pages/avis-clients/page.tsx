import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { avisClients, avisCategories } from '@/mocks/avisClients';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`ri-star-fill text-sm ${
            i < rating ? 'text-amber-400' : 'text-background-200'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof avisClients.reviews)[0] }) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 md:p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-primary-700 font-heading">{review.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground-950 font-heading">{review.author}</h3>
            {review.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 font-body">
                <i className="ri-verified-badge-line text-[10px]" />
                Avis vérifié
              </span>
            )}
          </div>
          <p className="text-xs text-foreground-500 font-body mt-0.5">{review.role}</p>
        </div>
        <div className="text-xs text-foreground-400 font-body flex-shrink-0">
          {new Date(review.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>
      <blockquote className="text-sm text-foreground-700 leading-relaxed font-body mb-4">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2 py-1 rounded-full bg-secondary-100 text-secondary-700 font-body">
          {review.service}
        </span>
        <span className="text-[10px] text-foreground-400 font-body flex items-center gap-1">
          <i className="ri-google-fill text-[10px]" />
          {review.source}
        </span>
      </div>
    </div>
  );
}

export default function AvisClientsPage() {
  const [categoryFilter, setCategoryFilter] = useState('Toutes');

  const filteredReviews = useMemo(() => {
    if (categoryFilter === 'Toutes') return avisClients.reviews;
    return avisClients.reviews.filter(r => r.service.includes(categoryFilter.split(' ')[0]));
  }, [categoryFilter]);

  const avgStars = avisClients.rating.average;
  const totalReviews = avisClients.rating.total;

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero */}
      <section className="bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="text-xs text-foreground-400 hover:text-primary-500 font-body cursor-pointer">
                Accueil
              </Link>
              <i className="ri-arrow-right-s-line text-xs text-foreground-300" />
              <span className="text-xs text-foreground-500 font-body">Avis Clients</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-4 font-heading">
              Ce que nos clients disent de KHEPRA
            </h1>
            <p className="text-base text-foreground-600 font-body mb-6 max-w-2xl">
              {avisClients.stats.totalClients} organisations nous ont fait confiance à travers
              {avisClients.stats.countries.length} pays d&apos;Afrique francophone. Découvrez leurs retours d&apos;expérience.
            </p>

            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-background-50 rounded-xl border border-background-200/70">
              <div className="text-center sm:text-left">
                <div className="text-5xl font-bold text-foreground-950 font-heading">{avgStars.toFixed(1)}</div>
                <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                  <StarRating rating={Math.round(avgStars)} />
                </div>
                <div className="text-xs text-foreground-500 font-body mt-1">{totalReviews} avis Google</div>
              </div>
              <div className="flex-1 w-full sm:w-auto">
                {avisClients.rating.distribution.map(d => (
                  <div key={d.stars} className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-foreground-500 font-body w-3">{d.stars}</span>
                    <i className="ri-star-fill text-amber-400 text-xs" />
                    <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${(d.count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-foreground-400 font-body w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={avisClients.gmb.reviewCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-google-fill" />
                  Laisser un avis Google
                </a>
                <span className="text-[10px] text-foreground-400 font-body text-center">
                  Ça prend 2 minutes. Merci !
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground-950 font-heading">{avisClients.stats.satisfactionRate}%</div>
              <div className="text-xs text-foreground-500 font-body">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground-950 font-heading">{avisClients.stats.recommendRate}%</div>
              <div className="text-xs text-foreground-500 font-body">Recommandent KHEPRA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground-950 font-heading">{avisClients.stats.nps}</div>
              <div className="text-xs text-foreground-500 font-body">Net Promoter Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground-950 font-heading">{avisClients.stats.responseTimeAvg}</div>
              <div className="text-xs text-foreground-500 font-body">Temps de réponse moyen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-xs text-foreground-400 font-body mr-2">Filtrer par service :</span>
          {avisCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-body transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-100 text-foreground-500 hover:bg-background-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-background-100">
              <i className="ri-chat-off-line text-2xl text-foreground-400" />
            </div>
            <p className="text-foreground-500 font-body">Aucun avis dans cette catégorie.</p>
          </div>
        )}
      </section>

      {/* CTA Footer */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-center">
          <h2 className="text-xl font-bold text-foreground-950 mb-3 font-heading">
            Vous aussi, partagez votre expérience KHEPRA
          </h2>
          <p className="text-sm text-foreground-600 font-body mb-6 max-w-lg mx-auto">
            Votre avis aide les décideurs africains à choisir le bon partenaire stratégique. Chaque retour compte.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={avisClients.gmb.reviewCta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-google-fill" />
              Laisser un avis sur Google
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background-100 hover:bg-background-200 text-foreground-700 text-sm font-semibold border border-background-200/70 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}