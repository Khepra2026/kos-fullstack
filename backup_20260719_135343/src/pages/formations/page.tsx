import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import CourseSchema from '@/components/feature/CourseSchema';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  modules_count: number;
  price_xof: number;
  price_eur: number;
  is_free: boolean;
  thumbnail_url: string;
  instructor_name: string;
  objectives: string[];
  target_audience: string;
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  Gouvernance: 'ri-building-line',
  Finance: 'ri-bank-line',
  Digital: 'ri-smartphone-line',
  Entrepreneuriat: 'ri-rocket-line',
};

export default function FormationsPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedLevel, setSelectedLevel] = useState('Tous');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('sort_order');
    if (!error && data) setCourses(data);
    setLoading(false);
  };

  const categories = ['Tous', ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ['Tous', 'beginner', 'intermediate', 'advanced'];

  const filtered = courses.filter(c => {
    const catOk = selectedCategory === 'Tous' || c.category === selectedCategory;
    const lvlOk = selectedLevel === 'Tous' || c.level === selectedLevel;
    return catOk && lvlOk;
  });

  const formationsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/formations#webpage`,
        url: `${SITE_URL}/formations`,
        name: 'Formations Professionnelles — KHEPRA EXPERTS | Gouvernance, Finance, Digital',
        description: 'Formations e-learning premium pour professionnels africains : gouvernance, analyse de crédit, transformation digitale, levée de fonds, conformité LCB-FT. Certificats reconnus.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'KHEPRA EXPERTS' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Formations', item: `${SITE_URL}/formations` },
          ],
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#educational-org`,
        name: 'KHEPRA EXPERTS — Plateforme e-learning',
        url: `${SITE_URL}/formations`,
        description: 'Plateforme de formation professionnelle en ligne pour les décideurs et professionnels africains. Gouvernance, finance, digital, entrepreneuriat.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lomé',
          addressCountry: 'TG',
        },
        sameAs: ['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/'],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Formations Professionnelles | Khepra Experts — Gouvernance, Finance & Digital Afrique"
        description="Formations e-learning premium pour professionnels africains : gouvernance, analyse de crédit, transformation digitale, LCB-FT. Certificats reconnus, accès à vie."
        keywords="formations professionnelles Afrique, e-learning gouvernance, formation finance Afrique, certification digitale, LCB-FT formation, microfinance formation, UEMOA formation"
        canonicalPath="/formations"
        schemaJson={formationsSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Schema.org — Course pour chaque formation */}
        {filtered.slice(0, 20).map(course => (
          <CourseSchema
            key={course.id}
            name={course.title}
            description={course.description}
            url={`/formations/${course.slug}`}
            educationalLevel={LEVEL_LABELS[course.level] || course.level}
            teaches={course.objectives?.slice(0, 5)}
            image={course.thumbnail_url}
          />
        ))}

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-stone-50 via-white to-amber-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
              <i className="ri-graduation-cap-line text-amber-700"></i>
              <span className="text-sm font-medium text-amber-900">Plateforme e-learning Khepra Experts</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Formations <span className="text-amber-600">Professionnelles</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Des programmes conçus par des experts africains, pour des professionnels africains. Gouvernance, finance, digital, entrepreneuriat — montez en compétences et obtenez votre certificat.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2"><i className="ri-award-line text-amber-600"></i> Certificat reconnu</div>
              <div className="flex items-center gap-2"><i className="ri-time-line text-amber-600"></i> Accès à vie</div>
              <div className="flex items-center gap-2"><i className="ri-smartphone-line text-amber-600"></i> Mobile-first</div>
              <div className="flex items-center gap-2"><i className="ri-user-star-line text-amber-600"></i> Experts praticiens</div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 px-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '5', label: 'Formations', icon: 'ri-book-open-line' },
              { value: '32', label: 'Modules', icon: 'ri-stack-line' },
              { value: '70h+', label: 'De contenu', icon: 'ri-time-line' },
              { value: '500+', label: 'Apprenants', icon: 'ri-group-line' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-amber-50 rounded-xl">
                  <i className={`${s.icon} text-2xl text-amber-600`}></i>
                </div>
                <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Filtres */}
        <section className="py-8 px-6 bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedLevel === lvl ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lvl === 'Tous' ? 'Tous niveaux' : LEVEL_LABELS[lvl]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grille des formations */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(course => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-amber-300 transition-all cursor-pointer group"
                    onClick={() => navigate(`/formations/${course.slug}`)}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${LEVEL_COLORS[course.level] || 'bg-gray-100 text-gray-700'}`}>
                          {LEVEL_LABELS[course.level] || course.level}
                        </span>

                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                          <i className={`${CATEGORY_ICONS[course.category] || 'ri-book-line'} text-amber-600`}></i>
                          {course.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-amber-700 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line text-amber-600"></i>
                          {course.duration_hours}h de formation
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-stack-line text-amber-600"></i>
                          {course.modules_count} modules
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-award-line text-amber-600"></i>
                          Certificat
                        </span>
                      </div>

                      <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap">
                          Voir la formation
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Abonnement */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Accès illimité à toutes les formations
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Abonnez-vous et accédez à l&apos;ensemble du catalogue, aux mises à jour et aux ressources téléchargeables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/mon-espace')}
                className="px-8 py-4 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-user-line mr-2"></i>
                Mon espace apprenant
              </button>
              <a href="/contact" className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">
                Nous contacter
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}




