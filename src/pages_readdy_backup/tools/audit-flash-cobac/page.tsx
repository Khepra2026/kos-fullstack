import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SeoHead from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { supabase } from '@/lib/supabase';

const FORM_URL = 'https://readdy.ai/api/form/d96jafn0d76aer3t558g';

interface RedFlag {
  text: string;
  article: string;
}

interface McKinseyMemo {
  insight: string;
  so_what: string;
  now_what: string;
  risk_level: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE';
  articles_cites: string[];
  sanction_potentielle: string;
}

interface QuizResult {
  score: number;
  status: 'CRITIQUE' | 'CONFORME';
  red_flags: RedFlag[];
  cta: string;
  cta_label: string;
  mckinsey_memo: McKinseyMemo;
  mckinsey_memo_text: string;
  lead_logged: boolean;
  brevo_synced: boolean;
}

export default function AuditFlashCobacPage() {
  const [step, setStep] = useState<'quiz' | 'results'>('quiz');
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<QuizResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizError, setQuizError] = useState('');

  const handleCalculate = async () => {
    if (!email.includes('@')) {
      setQuizError('Veuillez saisir une adresse email valide.');
      return;
    }
    setQuizError('');
    setQuizSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke<QuizResult & { error?: string; latency_ms?: number }>('kos-quiz-cobac-v5', {
        body: {
          email,
          nb_independants: q1,
          reunions_an: q2,
          charte: q3 === 1,
          pv_transmis: q4 === 1,
        },
      });

      if (error || !data || data.error) {
        setQuizError(data?.error || error?.message || 'Erreur du serveur. Veuillez réessayer.');
        setQuizSubmitting(false);
        return;
      }

      setResults({
        score: data.score,
        status: data.status,
        red_flags: data.red_flags,
        cta: data.cta,
        cta_label: data.cta_label,
        mckinsey_memo: data.mckinsey_memo,
        mckinsey_memo_text: data.mckinsey_memo_text,
        lead_logged: data.lead_logged,
        brevo_synced: data.brevo_synced,
      });
      setStep('results');
    } catch {
      setQuizError('Erreur réseau. Veuillez vérifier votre connexion et réessayer.');
    }
    setQuizSubmitting(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const honeypot = formData.get('phone_alt') as string;
    if (honeypot && honeypot.trim() !== '') {
      setFormSubmitted(true);
      setFormSubmitting(false);
      return;
    }
    formData.delete('phone_alt');

    if (results) {
      formData.append('score', String(results.score));
      formData.append('red_flags', results.red_flags.map((f) => `${f.article}: ${f.text}`).join(' | '));
      formData.append('source', 'Audit Flash COBAC 60s');
      formData.append('q1_independants', q1 === 2 ? '2_ou_plus' : String(q1));
      formData.append('q2_reunions', q2 === 2 ? '4_ou_plus' : q2 === 1 ? '2_3' : '0_1');
      formData.append('q3_charte', q3 === 1 ? 'oui' : 'non');
      formData.append('q4_pv', q4 === 1 ? 'oui' : 'non');
      formData.append('mckinsey_risk', results.mckinsey_memo.risk_level);
      formData.append('sanction_exposure', results.mckinsey_memo.sanction_potentielle);
      formData.append('articles_cites', results.mckinsey_memo.articles_cites.join(', '));
    }

    try {
      const body = new URLSearchParams(formData as unknown as Record<string, string>).toString();
      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const responseText = await response.text();
      let serverMsg = '';
      try {
        const parsed = JSON.parse(responseText);
        serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || '';
      } catch {
        serverMsg = responseText;
      }
      if (!response.ok || (serverMsg && serverMsg.toLowerCase().includes('spam'))) {
        setFormError(serverMsg || 'Une erreur est survenue. Veuillez réessayer.');
        setFormSubmitting(false);
        return;
      }
      setFormSubmitted(true);
    } catch {
      setFormError('Erreur réseau. Veuillez vérifier votre connexion et réessayer.');
    }
    setFormSubmitting(false);
  };

  const isCritical = results && results.score < 50;
  const memo = results?.mckinsey_memo;

  return (
    <>
      <SeoHead
        title="Audit Flash COBAC Gratuit — Score de Conformité en 60s | KHEPRA EXPERTS"
        description="Évaluez la conformité de votre Comité d'Audit en 60 secondes. Score instantané basé sur COBAC R-2020/01, COBAC CO-2024-02 et COSO 2016. Risquez-vous une amende T1 ? Testez maintenant gratuitement."
        keywords="audit COBAC gratuit, comité audit COBAC, conformité COBAC R-2020/01, administrateurs indépendants, amende T1 COBAC, diagnostic COBAC, KHEPRA EXPERTS"
        canonicalPath="/tools/audit-flash-cobac"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Combien de membres indépendants pour un Comité d\'Audit COBAC ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Selon COBAC R-2020/01 Art.12 : Minimum 3 membres dont 2 administrateurs indépendants. Sanction de niveau T1 si non-conforme.',
                },
              },
              {
                '@type': 'Question',
                name: 'Quelle est la fréquence minimale des réunions du Comité d\'Audit selon la COBAC ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Selon COBAC CO-2024-02 Art.8 : 4 réunions par an minimum avec procès-verbaux transmis au régulateur.',
                },
              },
              {
                '@type': 'Question',
                name: 'La charte du Comité d\'Audit est-elle obligatoire ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Oui. Selon le référentiel COSO 2016, la charte du Comité d\'Audit doit être approuvée par le Conseil d\'Administration et couvrir le périmètre des risques.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qu\'est-ce que l\'Audit Flash COBAC de KHEPRA EXPERTS ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Un diagnostic gratuit en 60 secondes qui évalue la conformité de votre Comité d\'Audit selon les normes COBAC R-2020/01, CO-2024-02 et COSO 2016. 5 questions, score immédiat, plan d\'action personnalisé.',
                },
              },
            ],
          }),
        }}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero Section */}
        <section className="relative min-h-[400px] md:min-h-[480px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20corporate%20boardroom%20with%20warm%20ambient%20lighting%2C%20large%20conference%20table%20with%20polished%20wood%20surface%2C%20elegant%20leather%20chairs%2C%20subtle%20green%20and%20amber%20accent%20lighting%2C%20large%20windows%20with%20city%20skyline%20view%2C%20professional%20atmosphere%2C%20clean%20architectural%20lines%2C%20abstract%20data%20visualization%20overlay%2C%20warm%20neutral%20color%20palette%2C%20editorial%20corporate%20photography%2C%20soft%20shadows%2C%20high%20detail&width=1600&height=700&seq=audit-cobac-hero-v2&orientation=landscape"
              alt="Audit Flash COBAC — KHEPRA EXPERTS"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
                <i className="ri-timer-flash-line text-accent-600"></i>
                60 Secondes · 100% Gratuit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                Votre Comité d'Audit est-il conforme COBAC ?
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-3">
                5 questions. 60 secondes. Découvrez si vous risquez une <strong className="text-white">amende T1 COBAC</strong>.
              </p>
              <p className="text-sm text-white/60 mb-8">
                Basé sur <strong className="text-white/90">COBAC R-2020/01</strong>, <strong className="text-white/90">COBAC CO-2024-02</strong> et <strong className="text-white/90">COSO 2016</strong>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="max-w-2xl mx-auto px-4 md:px-6 -mt-12 pb-16">
          {step === 'quiz' && (
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-background-200/70 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <i className="ri-shield-check-line text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground-950">Audit Flash COBAC</h2>
                    <p className="text-xs text-foreground-500">5 questions pour évaluer votre risque</p>
                  </div>
                </div>

                {/* Q1 */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground-950 mb-2">
                    1. Combien d'administrateurs <strong className="text-red-600">indépendants</strong> siègent à votre Comité d'Audit ?
                  </label>
                  <p className="text-xs text-foreground-500 mb-3">COBAC R-2020/01 exige minimum 2 indépendants sur 3 membres.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 0, label: '0', desc: 'Aucun' },
                      { value: 1, label: '1', desc: 'Insuffisant' },
                      { value: 2, label: '2 ou +', desc: 'Conforme' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setQ1(opt.value)}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                          q1 === opt.value
                            ? 'bg-red-50 border-red-400 text-foreground-950 font-semibold'
                            : 'bg-background-50 border-background-200/70 text-foreground-700 hover:bg-background-100'
                        }`}
                      >
                        <div className="text-lg font-bold">{opt.label}</div>
                        <div className="text-[10px] text-foreground-500">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground-950 mb-2">
                    2. Combien de <strong className="text-red-600">réunions</strong> votre Comité d'Audit tient-il par an ?
                  </label>
                  <p className="text-xs text-foreground-500 mb-3">COBAC CO-2024-02 Art.8 impose 4 réunions annuelles minimum.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 0, label: '0-1', desc: 'Très insuffisant' },
                      { value: 1, label: '2-3', desc: 'Insuffisant' },
                      { value: 2, label: '4 ou +', desc: 'Conforme' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setQ2(opt.value)}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                          q2 === opt.value
                            ? 'bg-red-50 border-red-400 text-foreground-950 font-semibold'
                            : 'bg-background-50 border-background-200/70 text-foreground-700 hover:bg-background-100'
                        }`}
                      >
                        <div className="text-lg font-bold">{opt.label}</div>
                        <div className="text-[10px] text-foreground-500">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground-950 mb-2">
                    3. Votre Comité d'Audit dispose-t-il d'une <strong className="text-red-600">charte</strong> approuvée par le CA ?
                  </label>
                  <p className="text-xs text-foreground-500 mb-3">Exigence COSO 2016 — charte couvrant le périmètre des risques.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 0, label: 'Non', icon: 'ri-close-line', color: 'text-red-600' },
                      { value: 1, label: 'Oui', icon: 'ri-check-line', color: 'text-emerald-600' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setQ3(opt.value)}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                          q3 === opt.value
                            ? opt.value === 0 ? 'bg-red-50 border-red-400' : 'bg-emerald-50 border-emerald-400'
                            : 'bg-background-50 border-background-200/70 text-foreground-700 hover:bg-background-100'
                        } font-semibold text-sm`}
                      >
                        <i className={`${opt.icon} ${opt.color} mr-1`}></i>{opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q4 */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground-950 mb-2">
                    4. Les <strong className="text-red-600">procès-verbaux</strong> du Comité d'Audit sont-ils transmis au régulateur ?
                  </label>
                  <p className="text-xs text-foreground-500 mb-3">Transmission obligatoire des PV à la COBAC après chaque réunion.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 0, label: 'Non', icon: 'ri-close-line', color: 'text-red-600' },
                      { value: 1, label: 'Oui', icon: 'ri-check-line', color: 'text-emerald-600' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setQ4(opt.value)}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                          q4 === opt.value
                            ? opt.value === 0 ? 'bg-red-50 border-red-400' : 'bg-emerald-50 border-emerald-400'
                            : 'bg-background-50 border-background-200/70 text-foreground-700 hover:bg-background-100'
                        } font-semibold text-sm`}
                      >
                        <i className={`${opt.icon} ${opt.color} mr-1`}></i>{opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q5 - Email */}
                <div className="mb-1">
                  <label className="block text-sm font-semibold text-foreground-950 mb-2">
                    5. Votre <strong className="text-red-600">email professionnel</strong> pour recevoir le Score + Plan d'Action 90 jours
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dg@votre-etablissement.com"
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 text-sm outline-none focus:border-red-400 bg-background-50"
                    required
                  />
                </div>

                {quizError && (
                  <p className="text-xs text-red-600 mb-3 mt-2">{quizError}</p>
                )}

                <button
                  onClick={handleCalculate}
                  disabled={quizSubmitting}
                  className="whitespace-nowrap w-full mt-5 px-6 py-3.5 rounded-full bg-red-600 text-white font-bold text-sm cursor-pointer hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {quizSubmitting ? (
                    <><i className="ri-loader-4-line animate-spin"></i>Analyse en cours...</>
                  ) : (
                    <><i className="ri-flashlight-line"></i>Obtenir mon Score en 3 secondes →</>
                  )}
                </button>

                <p className="text-[10px] text-foreground-400 text-center mt-3">
                  100% confidentiel · Conforme RGPD · Résultat immédiat
                </p>
              </div>
            </ScrollReveal>
          )}

          {step === 'results' && results && memo && (
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-background-200/70 shadow-sm p-6 md:p-8">
                {/* Score Banner */}
                <div className={`text-center p-6 rounded-xl mb-6 ${isCritical ? 'bg-red-50 border-2 border-red-400' : 'bg-emerald-50 border-2 border-emerald-400'}`}>
                  <div className={`text-6xl font-bold font-heading ${isCritical ? 'text-red-600' : 'text-emerald-600'}`}>
                    {results.score}<span className="text-2xl text-foreground-400">/100</span>
                  </div>
                  <div className={`text-lg font-bold mt-2 ${isCritical ? 'text-red-700' : 'text-emerald-700'}`}>
                    {isCritical ? 'CRITIQUE — Risque Amende T1 COBAC' : 'CONFORME — Bonne Préparation'}
                  </div>
                  <p className={`text-sm mt-1 ${isCritical ? 'text-red-600' : 'text-emerald-600'}`}>
                    {isCritical
                      ? 'Votre Comité d\'Audit présente des non-conformités majeures. Une action urgente est requise.'
                      : 'Votre Comité d\'Audit est globalement conforme. Maintenez vos bonnes pratiques.'}
                  </p>
                </div>

                {/* McKinsey Executive Memo */}
                <div className="mb-6 rounded-xl overflow-hidden border-2 border-foreground-900">
                  <div className="bg-foreground-950 text-white px-5 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-accent-600/30">
                      <i className="ri-file-text-line text-accent-400"></i>
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-wide">NOTE EXÉCUTIVE McKINSEY</div>
                      <div className="text-xs text-white/60">
                        Score : {results.score}/100 | Risque : {memo.risk_level} | v5.0
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-4 bg-background-50">
                    {/* Insight */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-100">
                        <span className="text-accent-600 font-bold text-xs">🔍</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1">INSIGHT — Diagnostic</h4>
                        <p className="text-sm text-foreground-800 leading-relaxed">{memo.insight}</p>
                      </div>
                    </div>

                    {/* So What */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100">
                        <span className="text-red-600 font-bold text-xs">⚠️</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">SO WHAT — Enjeux</h4>
                        <p className="text-sm text-foreground-800 leading-relaxed">{memo.so_what}</p>
                      </div>
                    </div>

                    {/* Now What */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100">
                        <span className="text-emerald-600 font-bold text-xs">📋</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">NOW WHAT — Plan d'Action</h4>
                        <p className="text-sm text-foreground-800 leading-relaxed">{memo.now_what}</p>
                      </div>
                    </div>

                    {/* Meta footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-background-200/70">
                      <div className="flex items-center gap-2 text-xs text-foreground-500">
                        <i className="ri-article-line text-accent-600"></i>
                        <span className="font-semibold">Articles :</span>
                        <span>{memo.articles_cites && memo.articles_cites.length > 0 ? memo.articles_cites.join(', ') : 'COBAC R-2020/01, CO-2024-02, COSO 2016'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground-500">
                        <i className="ri-alert-line text-red-600"></i>
                        <span className="font-semibold">Exposition :</span>
                        <span>{memo.sanction_potentielle}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Red Flags */}
                {results.red_flags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-foreground-950 mb-3 inline-flex items-center gap-2">
                      <i className="ri-error-warning-line text-red-500"></i>
                      Points de Non-Conformité
                    </h3>
                    <div className="space-y-2">
                      {results.red_flags.map((flag, i) => (
                        <div key={i} className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2">
                          <i className="ri-alert-line text-red-600 mt-0.5"></i>
                          <div>
                            <p className="text-sm text-foreground-900 font-medium">{flag.text}</p>
                            <p className="text-xs text-red-600">{flag.article}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className="mb-8">
                  {isCritical ? (
                    <div className="bg-red-600 rounded-xl p-5 text-center">
                      <h3 className="text-white font-bold text-lg mb-2">Ne restez pas exposé à une amende T1</h3>
                      <p className="text-red-100 text-sm mb-4">Réservez un diagnostic gratuit de 15 minutes avec un expert COBAC.</p>
                      <a
                        href={results.cta}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-red-600 font-bold text-sm cursor-pointer hover:bg-red-50 transition-colors"
                      >
                        <i className="ri-calendar-line"></i>{results.cta_label}
                      </a>
                    </div>
                  ) : (
                    <div className="bg-emerald-600 rounded-xl p-5 text-center">
                      <h3 className="text-white font-bold text-lg mb-2">Excellent — Renforcez votre avance</h3>
                      <p className="text-emerald-100 text-sm mb-4">Téléchargez le Plan 100 Jours pour maintenir votre conformité.</p>
                      <Link
                        to={results.cta}
                        className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-600 font-bold text-sm cursor-pointer hover:bg-emerald-50 transition-colors"
                      >
                        <i className="ri-download-line"></i>{results.cta_label}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Lead Capture Form */}
                {!formSubmitted ? (
                  <div className="border-t border-background-200/70 pt-6">
                    <h3 className="text-base font-bold text-foreground-950 mb-1">Recevez votre Plan d'Action Personnalisé</h3>
                    <p className="text-xs text-foreground-500 mb-4">
                      Rapport détaillé avec analyse article par article, échéancier de mise en conformité et recommandations KHEPRA EXPERTS.
                    </p>
                    <form onSubmit={handleFormSubmit} data-readdy-form="" className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1">Nom Complet *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-background-200/70 text-sm outline-none focus:border-red-400 bg-background-50"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1">Email Professionnel *</label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={email}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-background-200/70 text-sm outline-none focus:border-red-400 bg-background-50"
                          placeholder="vous@etablissement.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-600 mb-1">Organisation</label>
                        <input
                          type="text"
                          name="organization"
                          className="w-full px-4 py-2.5 rounded-lg border border-background-200/70 text-sm outline-none focus:border-red-400 bg-background-50"
                          placeholder="Votre établissement"
                        />
                      </div>
                      <div className="kos-hp-field">
                        <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
                      </div>
                      {formError && <p className="text-xs text-red-600">{formError}</p>}
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="whitespace-nowrap w-full px-6 py-3 rounded-full bg-foreground-950 text-white font-bold text-sm cursor-pointer hover:bg-foreground-800 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {formSubmitting ? (
                          <><i className="ri-loader-4-line animate-spin"></i>Envoi en cours...</>
                        ) : (
                          <><i className="ri-mail-send-line"></i>Recevoir mon Plan d'Action</>
                        )}
                      </button>
                      <p className="text-[10px] text-foreground-400 text-center">
                        Confidentiel · Pas de spam · Conforme RGPD
                      </p>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6 border-t border-background-200/70">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <i className="ri-check-line text-2xl text-emerald-600"></i>
                    </div>
                    <h3 className="text-base font-bold text-foreground-950 mb-1">Plan d'Action envoyé !</h3>
                    <p className="text-sm text-foreground-600 mb-4 max-w-md mx-auto">
                      Vérifiez votre boîte de réception. Vous recevrez votre analyse détaillée dans quelques minutes.
                    </p>
                    <button
                      onClick={() => { setStep('quiz'); setResults(null); setFormSubmitted(false); setEmail(''); }}
                      className="whitespace-nowrap px-5 py-2.5 rounded-full border border-background-200/70 text-foreground-700 text-sm font-medium cursor-pointer hover:bg-background-100 transition-colors inline-flex items-center gap-2"
                    >
                      <i className="ri-refresh-line"></i>Refaire l'Audit
                    </button>
                  </div>
                )}

                {/* Bottom actions */}
                {!formSubmitted && (
                  <div className="text-center mt-4 pt-4 border-t border-background-200/70">
                    <button
                      onClick={() => { setStep('quiz'); setResults(null); setFormError(''); }}
                      className="whitespace-nowrap text-sm text-foreground-600 cursor-pointer hover:text-foreground-900 inline-flex items-center gap-1"
                    >
                      <i className="ri-arrow-left-line"></i>Modifier mes réponses
                    </button>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </section>

        {/* Trust Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8">
              <h2 className="text-lg font-bold text-foreground-950 text-center mb-6">Pourquoi faire confiance à KHEPRA EXPERTS ?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 mx-auto mb-3">
                    <i className="ri-government-line text-xl text-accent-600"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">22 ans d'expertise</h3>
                  <p className="text-xs text-foreground-500">Cabinet de référence en gouvernance UEMOA/CEMAC. Expertise BCEAO, COBAC, OHADA.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 mx-auto mb-3">
                    <i className="ri-user-star-line text-xl text-accent-600"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">Fondateur expérimenté</h3>
                  <p className="text-xs text-foreground-500">Simda Essoyomèwè, ex-Directeur Général AMIFA Gabon, ex-Ministère des Finances Togo.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 mx-auto mb-3">
                    <i className="ri-shield-check-line text-xl text-accent-600"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">100% indépendant</h3>
                  <p className="text-xs text-foreground-500">Cabinet indépendant, non affilié aux Big Four. Conseil objectif, sans conflit d'intérêts.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 md:px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-foreground-950 text-center mb-6">Questions Fréquentes</h2>
            <div className="space-y-3">
              {[
                { q: "Combien de membres indépendants pour un Comité d'Audit COBAC ?", a: "Selon COBAC R-2020/01 Art.12 : Minimum 3 membres dont 2 administrateurs indépendants. Les administrateurs indépendants ne doivent pas avoir de relation d'affaires, familiale ou financière avec l'établissement ou sa direction." },
                { q: "Quelle est la fréquence minimale des réunions du Comité d'Audit ?", a: "COBAC CO-2024-02 Art.8 impose 4 réunions par an minimum. Les procès-verbaux doivent être transmis au régulateur dans les 15 jours suivant chaque réunion." },
                { q: "Quelles sanctions en cas de non-conformité ?", a: "La COBAC peut prononcer des sanctions de niveau T1 (amende, injonction, mise en demeure) pouvant aller jusqu'à la suspension de dirigeants ou le retrait d'agrément dans les cas les plus graves." },
                { q: "L'audit est-il vraiment gratuit ?", a: "Oui, totalement gratuit et confidentiel. Vous recevez votre score instantanément avec un plan d'action 90 jours. Si vous souhaitez un accompagnement, nos experts sont disponibles pour un diagnostic approfondi." },
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-background-200/70 overflow-hidden group">
                  <summary className="p-4 cursor-pointer text-sm font-semibold text-foreground-950 list-none flex items-center justify-between hover:bg-background-50 transition-colors">
                    {faq.q}
                    <i className="ri-arrow-down-s-line text-foreground-400 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-foreground-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}



