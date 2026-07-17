import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

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
  instructor_title: string;
  objectives: string[];
  target_audience: string;
  certificate_enabled: boolean;
}

interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  order_index: number;
  duration_minutes: number;
  is_free_preview: boolean;
  lessons?: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  content_type: string;
  duration_minutes: number;
  order_index: number;
  is_free_preview: boolean;
}

const LEVEL_LABELS: Record<string, string> = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' };

export default function FormationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<any>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (slug) loadCourse(slug);
    checkUser();
  }, [slug]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }
  };

  const loadCourse = async (courseSlug: string) => {
    setLoading(true);
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', courseSlug)
      .maybeSingle();

    if (!courseData) { navigate('/formations'); return; }
    setCourse(courseData);

    const { data: modulesData } = await supabase
      .from('course_modules')
      .select('*, lessons(*)')
      .eq('course_id', courseData.id)
      .order('order_index');

    if (modulesData) {
      const sorted = modulesData.map(m => ({
        ...m,
        lessons: (m.lessons || []).sort((a: Lesson, b: Lesson) => a.order_index - b.order_index),
      }));
      setModules(sorted);
      if (sorted.length > 0) setExpandedModule(sorted[0].id);
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: enr } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('course_id', courseData.id)
        .maybeSingle();
      setEnrolled(!!enr);

      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('lesson_id, completed')
        .eq('user_id', session.user.id)
        .eq('course_id', courseData.id);
      if (progress) {
        const map: Record<string, boolean> = {};
        progress.forEach(p => { map[p.lesson_id] = p.completed; });
        setLessonProgress(map);
      }
    }
    setLoading(false);
  };

  const handleEnroll = async () => {
    if (!user) { navigate('/mon-espace'); return; }
    if (!course) return;
    setEnrolling(true);
    const { error } = await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: course.id,
      progress_percent: 0,
    });
    if (!error) setEnrolled(true);
    setEnrolling(false);
  };

  const handleLessonComplete = async (lesson: Lesson) => {
    if (!user || !course) return;
    await supabase.from('lesson_progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      course_id: course.id,
      completed: true,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });
    setLessonProgress(prev => ({ ...prev, [lesson.id]: true }));

    const allLessons = modules.flatMap(m => m.lessons || []);
    const completedCount = Object.values({ ...lessonProgress, [lesson.id]: true }).filter(Boolean).length;
    const percent = Math.round((completedCount / allLessons.length) * 100);
    await supabase.from('enrollments').update({ progress_percent: percent })
      .eq('user_id', user.id).eq('course_id', course.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!course) return null;

  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const completedLessons = Object.values(lessonProgress).filter(Boolean).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/formations/${course.slug}#course`,
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        },
        educationalLevel: LEVEL_LABELS[course.level] || course.level,
        timeRequired: `PT${course.duration_hours}H`,
        numberOfLessons: totalLessons,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          inLanguage: 'fr-FR',
          isAccessibleForFree: course.is_free,
        },
        image: course.thumbnail_url,
        url: `${SITE_URL}/formations/${course.slug}`,
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/formations/${course.slug}#webpage`,
        url: `${SITE_URL}/formations/${course.slug}`,
        name: `${course.title} — Formation KHEPRA EXPERTS`,
        description: course.description,
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        about: { '@id': `${SITE_URL}/formations/${course.slug}#course` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Formations', item: `${SITE_URL}/formations` },
            { '@type': 'ListItem', position: 3, name: course.title, item: `${SITE_URL}/formations/${course.slug}` },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={`${course.title} — Formation KHEPRA EXPERTS`}
        description={course.description}
        canonicalPath={`/formations/${course.slug}`}
        schemaJson={courseSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="pt-20">
          {/* Hero formation */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">{course.category}</span>
                  <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">{LEVEL_LABELS[course.level]}</span>
                </div>
                <h1 className="font-playfair text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-2"><i className="ri-time-line text-amber-400"></i>{course.duration_hours}h de formation</span>
                  <span className="flex items-center gap-2"><i className="ri-book-2-line text-amber-400"></i>{course.modules_count} modules</span>
                  <span className="flex items-center gap-2"><i className="ri-file-list-3-line text-amber-400"></i>{totalLessons} leçons</span>
                  {course.certificate_enabled && <span className="flex items-center gap-2"><i className="ri-award-line text-amber-400"></i>Certificat inclus</span>}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white"></i>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{course.instructor_name}</p>
                    <p className="text-gray-400 text-xs">{course.instructor_title}</p>
                  </div>
                </div>
              </div>

              {/* Card d'inscription */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 text-gray-900 sticky top-24">
                  <div className="h-40 rounded-xl overflow-hidden mb-4">
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover object-top" width="800" height="450" loading="lazy" decoding="async" />
                  </div>
                  {enrolled ? (
                    <div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium text-amber-600">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-700 text-center mb-3">
                        <i className="ri-checkbox-circle-line mr-1"></i>
                        Vous êtes inscrit à cette formation
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap disabled:opacity-50 mb-3"
                    >
                      {enrolling ? 'Inscription...' : user ? "S'inscrire maintenant" : 'Se connecter pour s\'inscrire'}
                    </button>
                  )}

                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      { icon: 'ri-infinity-line', text: 'Accès à vie' },
                      { icon: 'ri-smartphone-line', text: 'Accessible sur mobile' },
                      { icon: 'ri-award-line', text: 'Certificat de réussite' },
                      { icon: 'ri-download-line', text: 'Ressources téléchargeables' },
                    ].map(item => (
                      <li key={item.text} className="flex items-center gap-2">
                        <i className={`${item.icon} text-amber-600`}></i>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Objectifs */}
              {course.objectives && course.objectives.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que vous apprendrez</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-lg p-3">
                        <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                        <span className="text-sm text-gray-700">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Programme */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Programme de la formation</h2>
                <div className="space-y-3">
                  {modules.map(mod => (
                    <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {mod.order_index}
                          </span>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900 text-sm">{mod.title}</p>
                            <p className="text-xs text-gray-500">{mod.lessons?.length || 0} leçons • {mod.duration_minutes} min</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className={expandedModule === mod.id ? 'ri-arrow-up-s-line text-gray-400' : 'ri-arrow-down-s-line text-gray-400'}></i>
                        </div>
                      </button>

                      {expandedModule === mod.id && mod.lessons && mod.lessons.length > 0 && (
                        <div className="divide-y divide-gray-100">
                          {mod.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              className={`flex items-center justify-between p-4 hover:bg-amber-50 transition-colors ${(enrolled || mod.is_free_preview) ? 'cursor-pointer' : 'opacity-60'}`}
                              onClick={() => (enrolled || mod.is_free_preview) && setActiveLesson(lesson)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 ${lessonProgress[lesson.id] ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                                  <i className={`text-sm ${lessonProgress[lesson.id] ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-play-circle-line text-gray-400'}`}></i>
                                </div>
                                <span className="text-sm text-gray-700">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{lesson.duration_minutes} min</span>
                                {!enrolled && !mod.is_free_preview && <i className="ri-lock-line"></i>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Public cible */}
              {course.target_audience && (
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="ri-group-line text-amber-600"></i>
                    À qui s&apos;adresse cette formation ?
                  </h3>
                  <p className="text-gray-700 text-sm">{course.target_audience}</p>
                </div>
              )}
            </div>

            {/* Sidebar lecteur de leçon */}
            <div className="lg:col-span-1">
              {activeLesson ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-sm">{activeLesson.title}</h3>
                    <button onClick={() => setActiveLesson(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-700 mb-6 max-h-96 overflow-y-auto">
                    {activeLesson.content ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{activeLesson.content}</p>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <i className="ri-file-text-line text-4xl mb-2 block"></i>
                        <p className="text-sm">Contenu de la leçon disponible après inscription</p>
                      </div>
                    )}
                  </div>
                  {enrolled && !lessonProgress[activeLesson.id] && (
                    <button
                      onClick={() => handleLessonComplete(activeLesson)}
                      className="w-full py-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-checkbox-circle-line mr-1"></i>
                      Marquer comme terminé
                    </button>
                  )}
                  {lessonProgress[activeLesson.id] && (
                    <div className="text-center py-2 text-emerald-600 text-sm font-medium">
                      <i className="ri-checkbox-circle-fill mr-1"></i>
                      Leçon terminée
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sticky top-24">
                  <h3 className="font-bold text-gray-900 mb-3">Votre progression</h3>
                  {enrolled ? (
                    <div>
                      <div className="text-4xl font-bold text-amber-600 mb-1">{progressPercent}%</div>
                      <p className="text-sm text-gray-600 mb-3">{completedLessons}/{totalLessons} leçons terminées</p>
                      <div className="w-full bg-white rounded-full h-3 mb-4">
                        <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500">Cliquez sur une leçon pour commencer</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <i className="ri-lock-line text-3xl text-amber-400 mb-2 block"></i>
                      <p className="text-sm text-gray-600 mb-4">Inscrivez-vous pour accéder au contenu complet</p>
                      <button
                        onClick={handleEnroll}
                        className="w-full py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
                      >
                        {user ? "S'inscrire" : 'Se connecter'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
