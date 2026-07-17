import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveIdToSlug } from '@/data/articleSlugMap';

interface Article {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  author: string;
  tags: string[];
}

interface InsightsArticlesGridProps {
  articles: Article[];
  searchQuery: string;
}

type SectorFilter = 'all' | 'finance' | 'gouvernance' | 'microfinance' | 'pme' | 'digital' | 'risques';
type SortType = 'recent' | 'popular';

export default function InsightsArticlesGrid({ articles, searchQuery }: InsightsArticlesGridProps) {
  const navigate = useNavigate();
  const [sector, setSector] = useState<SectorFilter>('all');
  const [sort, setSort] = useState<SortType>('recent');
  const [country, setCountry] = useState('all');

  const sectors: { id: SectorFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Tous', icon: 'ri-grid-line' },
    { id: 'finance', label: 'Finance', icon: 'ri-funds-line' },
    { id: 'gouvernance', label: 'Gouvernance', icon: 'ri-scales-line' },
    { id: 'microfinance', label: 'Microfinance', icon: 'ri-hand-coin-line' },
    { id: 'pme', label: 'PME', icon: 'ri-rocket-line' },
    { id: 'digital', label: 'Digital', icon: 'ri-smartphone-line' },
    { id: 'risques', label: 'Risques', icon: 'ri-alarm-warning-line' },
  ];

  const countries = ['all', 'Togo', 'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Cameroun', 'UEMOA'];

  const filtered = useMemo(() => {
    let list = articles.filter(a => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
      const matchSector = sector === 'all' || a.category.toLowerCase().includes(sector) || a.tags.some(t => t.toLowerCase().includes(sector));
      const matchCountry = country === 'all' || a.title.toLowerCase().includes(country.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(country.toLowerCase()));
      return matchSearch && matchSector && matchCountry;
    });
    if (sort === 'popular') list = [...list].sort((a, b) => b.views - a.views);
    else list = [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list;
  }, [articles, searchQuery, sector, sort, country]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Publications & Analyses</h2>
            <p className="text-gray-500 text-sm mt-1">{filtered.length} résultat{filtered.length > 1 ? 's' : ''} — Intelligence stratégique pour dirigeants africains</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Country filter */}
            <select value={country} onChange={(e) => setCountry(e.target.value)}
              className="text-sm border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer font-medium bg-white">
              {countries.map(c => <option key={c} value={c}>{c === 'all' ? 'Tous pays' : c}</option>)}
            </select>
            {/* Sort */}
            <select value={sort} onChange={(e) => setSort(e.target.value as SortType)}
              className="text-sm border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer font-medium bg-white">
              <option value="recent">Plus récents</option>
              <option value="popular">Plus populaires</option>
            </select>
          </div>
        </div>

        {/* Sector pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {sectors.map(s => (
            <button key={s.id} onClick={() => setSector(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                sector === s.id ? 'bg-brand-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-400 hover:text-gold-700'
              }`}>
              <i className={`${s.icon} text-sm`} />
              {s.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <i className="ri-file-search-line text-5xl text-gray-300 mb-4 block" />
            <p className="text-gray-500 font-semibold">Aucune publication trouvée</p>
            <p className="text-sm text-gray-400 mt-1">Modifiez vos filtres ou votre recherche</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <div onClick={() => navigate(`/blog/${resolveIdToSlug(String(featured.id)) || featured.id}/`)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-200 transition-all duration-300 cursor-pointer mb-8 grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="800" height="500" loading="eager" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full">{featured.category}</span>
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                    Publication phare
                  </span>
                </div>
                <div className="md:col-span-3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><i className="ri-calendar-line text-gold-500" />{featured.date}</span>
                    <span className="flex items-center gap-1"><i className="ri-time-line text-gold-500" />{featured.readTime}</span>
                    <span className="flex items-center gap-1"><i className="ri-eye-line text-gold-500" />{featured.views.toLocaleString()}</span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors leading-tight">{featured.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-gold-600 font-bold text-sm group-hover:gap-3 transition-all">
                    Lire la publication <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(article => (
                <article key={article.id} onClick={() => navigate(`/blog/${resolveIdToSlug(String(article.id)) || article.id}/`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-200 transition-all duration-300 cursor-pointer flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width="600" height="400" decoding="async" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full">{article.category}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><i className="ri-calendar-line text-gold-500" />{article.date}</span>
                      <span className="flex items-center gap-1"><i className="ri-time-line text-gold-500" />{article.readTime}</span>
                    </div>
                    <h3 className="font-playfair text-base font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2 leading-tight">{article.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-xs text-gray-400"><i className="ri-eye-line text-gold-500" />{article.views.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1.5 text-gold-600 font-bold text-xs group-hover:gap-2.5 transition-all">
                        Lire <i className="ri-arrow-right-line" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
