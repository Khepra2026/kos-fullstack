import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

interface Profile {
  id: string;
  full_name: string;
  company: string;
  role: string;
  plan: string;
  system_role: string;
  avatar_url: string;
}

interface Enrollment {
  id: string;
  course_id: string;
  progress_percent: number;
  enrolled_at: string;
  completed_at: string | null;
  courses: {
    slug: string;
    title: string;
    category: string;
    duration_hours: number;
    modules_count: number;
    thumbnail_url: string;
    level: string;
  };
}

interface Certificate {
  id: string;
  formation_slug: string;
  formation_name: string;
  score: number;
  issued_at: string;
  certificate_id: string;
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Gratuit',
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  starter: 'bg-emerald-100 text-emerald-700',
  pro: 'bg-amber-100 text-amber-700',
  enterprise: 'bg-purple-100 text-purple-700',
};

export default function MonEspacePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'formations' | 'certificats' | 'profil'>('formations');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id);
      }
    } catch (err) {
      console.error('[MonEspace] Session check failed:', err);
      setPageError('Impossible de vérifier la session. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      const [profileRes, enrollRes, certRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('enrollments').select('*, courses(slug, title, category, duration_hours, modules_count, thumbnail_url, level)').eq('user_id', userId).order('enrolled_at', { ascending: false }),
        supabase.from('certificates').select('*').eq('user_id', userId).order('issued_at', { ascending: false }),
      ]);
      if (profileRes.data) setProfile(profileRes.data);
      if (enrollRes.data) setEnrollments(enrollRes.data as Enrollment[]);
      if (certRes.data) setCertificates(certRes.data);
    } catch (err) {
      console.error('[MonEspace] loadUserData failed:', err);
      setPageError('Erreur lors du chargement des données utilisateur.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) {
        setLoginError('Email ou mot de passe incorrect.');
      } else if (data.user) {
        setUser(data.user);
        await loadUserData(data.user.id);
      }
    } catch (err) {
      console.error('[MonEspace] Login failed:', err);
      setLoginError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[MonEspace] Logout failed:', err);
    }
    setUser(null);
    setProfile(null);
    setEnrollments([]);
    setCertificates([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <SeoHead title="Mon Espace — KHEPRA EXPERTS" description="Accédez à vos formations, certificats et progression." canonicalPath="/mon-espace" noIndex={true} />
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-graduation-cap-line text-3xl text-amber-600"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Mon Espace Apprenant</h1>
              <p className="text-gray-500 text-sm">Connectez-vous pour accéder à vos formations</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {loginLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Pas encore de compte ?</p>
              <a href="/contact" className="text-amber-600 text-sm font-medium hover:underline">Nous contacter pour s&apos;inscrire</a>
            </div>
          </div>
        </div>
      </>
    );
  }

  const completedCount = enrollments.filter(e => e.completed_at).length;
  const inProgressCount = enrollments.filter(e => !e.completed_at && e.progress_percent > 0).length;

  return (
    <>
      <SeoHead title="Mon Espace — KHEPRA EXPERTS" description="Tableau de bord apprenant" canonicalPath="/mon-espace" noIndex={true} />
      <div className="min-h-screen bg-stone-50">
        <Navigation />

        {/* Header profil */}
        <div className="pt-24 pb-8 px-6 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <i className="ri-user-line text-3xl text-amber-600"></i>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name || user.email}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">{profile?.company || 'Apprenant Khepra'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_COLORS[profile?.plan || 'free']}`}>
                    {PLAN_LABELS[profile?.plan || 'free']}
                  </span>
                  {profile?.system_role === 'superadmin' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">SuperAdmin</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Formations désactivées temporairement
              <button
                onClick={() => navigate('/formations')}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-add-line mr-1"></i>
                Nouvelle formation
              </button>
              */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <i className="ri-logout-box-line mr-1"></i>
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Formations inscrites', value: enrollments.length, icon: 'ri-book-open-line', color: 'text-amber-600' },
              { label: 'En cours', value: inProgressCount, icon: 'ri-play-circle-line', color: 'text-blue-600' },
              { label: 'Terminées', value: completedCount, icon: 'ri-checkbox-circle-line', color: 'text-emerald-600' },
              { label: 'Certificats', value: certificates.length, icon: 'ri-award-line', color: 'text-purple-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <i className={`${s.icon} text-2xl ${s.color}`}></i>
                  <span className="text-3xl font-bold text-gray-900">{s.value}</span>
                </div>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
            {(['formations', 'certificats', 'profil'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer capitalize ${
                  activeTab === tab ? 'bg-white text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'formations' ? 'Mes formations' : tab === 'certificats' ? 'Mes certificats' : 'Mon profil'}
              </button>
            ))}
          </div>

          {/* Tab: Formations */}
          {activeTab === 'formations' && (
            <div>
              {enrollments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <i className="ri-book-open-line text-5xl text-gray-300 mb-4 block"></i>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucune formation inscrite</h3>
                  <p className="text-gray-500 mb-6">Découvrez notre catalogue et commencez votre parcours</p>
                  {/* Formations désactivées temporairement
                  <button
                    onClick={() => navigate('/formations')}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
                  >
                    Voir les formations
                  </button>
                  */}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.map(enr => (
                    <div
                      key={enr.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-amber-300 transition-all"
                    >
                      <div className="h-36 overflow-hidden relative">
                        <img src={enr.courses?.thumbnail_url} alt={enr.courses?.title} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {enr.completed_at && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <i className="ri-checkbox-circle-line"></i> Terminé
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{enr.courses?.title}</h3>
                        <p className="text-xs text-gray-500 mb-3">{enr.courses?.category} • {enr.courses?.duration_hours}h</p>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progression</span>
                            <span className="font-medium text-amber-600">{enr.progress_percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full transition-all"
                              style={{ width: `${enr.progress_percent}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="w-full mt-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors whitespace-nowrap">
                          {enr.progress_percent === 0 ? 'Commencer' : enr.completed_at ? 'Revoir' : 'Continuer'}
                          <i className="ri-arrow-right-line ml-1"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Certificats */}
          {activeTab === 'certificats' && (
            <div>
              {certificates.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <i className="ri-award-line text-5xl text-gray-300 mb-4 block"></i>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun certificat obtenu</h3>
                  <p className="text-gray-500">Terminez une formation pour obtenir votre certificat</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map(cert => (
                    <div key={cert.id} className="bg-white rounded-xl border border-amber-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className="ri-award-fill text-3xl text-amber-600"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{cert.formation_name}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Obtenu le {new Date(cert.issued_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-emerald-600">Score : {cert.score}/100</span>
                            <span className="text-xs text-gray-400">#{cert.certificate_id}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-2 border border-amber-300 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors whitespace-nowrap">
                        <i className="ri-download-line mr-1"></i>
                        Télécharger le certificat
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Profil */}
          {activeTab === 'profil' && profile && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Informations du profil</h2>
              <div className="space-y-4">
                {[
                  { label: 'Nom complet', value: profile.full_name, icon: 'ri-user-line' },
                  { label: 'Email', value: user.email, icon: 'ri-mail-line' },
                  { label: 'Entreprise', value: profile.company, icon: 'ri-building-line' },
                  { label: 'Rôle', value: profile.role, icon: 'ri-briefcase-line' },
                  { label: 'Plan', value: PLAN_LABELS[profile.plan || 'free'], icon: 'ri-vip-crown-line' },
                ].map(field => (
                  <div key={field.label} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className={`${field.icon} text-amber-600 text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{field.label}</p>
                      <p className="text-sm font-medium text-gray-900">{field.value || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a href="/contact" className="text-sm text-amber-600 hover:underline">
                  Modifier mes informations →
                </a>
              </div>
            </div>
          )}

          {pageError && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              <i className="ri-error-warning-line mr-1"></i>
              {pageError}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}



