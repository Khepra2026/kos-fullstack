import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { newsroomArticles } from '@/mocks/newsroomArticles';

const categories = ['Tous', 'Régulation', 'Gouvernance', 'Conformité', 'Analyse'];
const regions = ['Tous', 'UEMOA', 'CEMAC', 'OHADA', 'CIMA', 'International'];

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeRegion, setActiveRegion] = useState('Tous');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredArticles = newsroomArticles.filter((a) => {
    if (activeCategory !== 'Tous' && a.category !== activeCategory) return false;
    if (activeRegion !== 'Tous' && a.region !== activeRegion) return false;
    return true;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubscribed(true);
    setSubmitting(false);
  };

  const newsroomSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Newsroom — Actualités Réglementaires BCEAO/COBAC/BEAC en temps réel | Khepra Experts',
    description: 'Veille réglementaire en temps réel : BCEAO, COBAC, BEAC, OHADA, CIMA, GAFI. Analyses exclusives par SIMDA Essoyomèwè, 22 ans d\'expertise. 3 articles/semaine.',
    url: 'https://khepraexperts.com/newsroom',
    dateModified: '2026-07-02T08:00:00Z',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredArticles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'NewsArticle',
          headline: a.title,
          description: a.summary,
          url: a.url,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          author: {
            '@type': 'Person',
            name: a.author,
            jobTitle: a.authorTitle,
          },
        },
      })),
    },
  };

  return (
    <>
      <SeoHead
        title="Newsroom — Actualités Réglementaires BCEAO/COBAC/BEAC | Khepra Experts"
        description="Veille réglementaire temps réel : BCEAO, COBAC, BEAC, OHADA, CIMA, GAFI. Analyses exclusives par SIMDA Essoyomèwè, 22 ans BCEAO. 3 articles/semaine."
        keywords="newsroom réglementaire, actualités BCEAO, actualités COBAC, veille réglementaire, BEAC, OHADA, CIMA, GAFI, Khepra Experts"
        canonicalPath="/newsroom"
        ogType="website"
        ogImage="https://readdy.ai/api/search-image?query=Professional%20newsroom%20with%20financial%20regulatory%20documents%20and%20African%20maps%20on%20a%20clean%20modern%20desk%20setup%2C%20warm%20ambient%20lighting%2C%20editorial%20photography%20style%2C%20minimalist%20composition%20with%20documents%20stacked%20neatly&width=1200&height=630&seq=newsroom-og-2026&orientation=landscape"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="Newsroom — Actualités Réglementaires BCEAO/COBAC/BEAC en temps réel"
        schemaJson={newsroomSchema}
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 px-4 md:px-6">
            <div className="max-w-6xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-900 text-xs font-semibold tracking-wider uppercase mb-4">
                Newsroom — Mise à jour 02/07/2026
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
                Actualités Réglementaires<br />
                <span className="text-primary-500">en temps réel</span>
              </h1>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto mb-6">
                Veille continue BCEAO, COBAC, BEAC, OHADA, CIMA et GAFI. Analyses exclusives par SIMDA Essoyomèwè, 22 ans d'expertise réglementaire. 3 articles/semaine.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-foreground-500">
                <i className="ri-article-line"></i>
                <span>{newsroomArticles.length} analyses publiées</span>
                <span className="text-foreground-300">|</span>
                <i className="ri-time-line"></i>
                <span>Mise à jour quotidienne</span>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="pb-8 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground-600 mr-2 whitespace-nowrap">Catégorie :</span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-primary-500 text-background-50'
                          : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground-600 mr-2 whitespace-nowrap">Zone :</span>
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setActiveRegion(reg)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        activeRegion === reg
                          ? 'bg-secondary-500 text-background-50'
                          : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="pb-16 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg border border-background-200 overflow-hidden hover:border-primary-300 transition-colors group flex flex-col">
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-accent-100 text-accent-900 text-[10px] font-semibold uppercase tracking-wider">
                          {article.regulator}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 text-[10px] font-medium uppercase">
                          {article.region}
                        </span>
                        <span className="text-[11px] text-foreground-400 ml-auto whitespace-nowrap">
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="text-base font-heading font-semibold text-foreground-950 mb-2 leading-snug group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-foreground-600 mb-4 leading-relaxed flex-1">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-background-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700">
                            SK
                          </div>
                          <span className="text-xs text-foreground-500">{article.authorTitle}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-foreground-400">
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line text-[11px]"></i>
                            {article.readingTime} min
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-background-100 text-foreground-500 text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <i className="ri-article-line text-4xl text-foreground-300 mb-3 block"></i>
                  <p className="text-foreground-500">Aucun article ne correspond à ces filtres.</p>
                </div>
              )}
            </div>
          </section>

          {/* Subscribe */}
          <section className="py-16 px-4 md:px-6 bg-background-100">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground-950 mb-3">
                Recevez les alertes réglementaires en avant-première
              </h3>
              <p className="text-foreground-600 mb-6">
                3 analyses/semaine dans votre boîte mail. Zéro spam. 100% valeur. Désabonnement 1 clic.
              </p>
              {subscribed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
                  <i className="ri-check-line mr-2"></i>
                  Merci ! Vous recevrez la prochaine analyse réglementaire dès sa publication.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="flex-1 px-4 py-2.5 rounded-lg border border-background-200 bg-white text-sm text-foreground-900 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-primary-500 text-background-50 text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
                  >
                    {submitting ? 'Inscription...' : 'S\'abonner'}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground-950 mb-3">
                Votre organisation est-elle conforme aux dernières exigences ?
              </h3>
              <p className="text-foreground-600 mb-6">
                KOS scanne votre conformité en 60 secondes. Score /100 + 10 risques critiques identifiés.
              </p>
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary-500 text-background-50 font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Lancer un scan gratuit
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}