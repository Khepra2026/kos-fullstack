import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

interface Question {
  idFr: string;
  idEn: string;
  optionsFr: string[];
  optionsEn: string[];
  weights: number[];
}

const QUESTIONS: Question[] = [
  {
    idFr: 'Votre gouvernance : avez-vous un Conseil d\'Administration structuré et opérationnel ?',
    idEn: 'Governance: do you have a structured, operational Board of Directors?',
    optionsFr: ['Oui, CA formel avec PV et comités', 'CA informel ou en cours de structuration', 'Pas de CA structuré'],
    optionsEn: ['Yes, formal board with minutes & committees', 'Informal board or being structured', 'No structured board'],
    weights: [10, 5, 0],
  },
  {
    idFr: 'Performance financière : disposez-vous d\'un reporting mensuel fiable ?',
    idEn: 'Financial performance: do you have reliable monthly reporting?',
    optionsFr: ['Tableau de bord mensuel avec KPIs clés', 'Reporting trimestriel ou partiel', 'Pas de reporting structuré'],
    optionsEn: ['Monthly dashboard with key KPIs', 'Quarterly or partial reporting', 'No structured reporting'],
    weights: [10, 5, 0],
  },
  {
    idFr: 'Conformité : êtes-vous en règle avec la réglementation BCEAO/BEAC/OHADA ?',
    idEn: 'Compliance: are you compliant with BCEAO/BEAC/OHADA regulations?',
    optionsFr: ['Audit de conformité < 12 mois, zéro observation majeure', 'Conformité partielle ou audit ancien', 'Non audité ou observations non résolues'],
    optionsEn: ['Compliance audit < 12 months, no major findings', 'Partial compliance or outdated audit', 'Not audited or unresolved findings'],
    weights: [10, 5, 0],
  },
  {
    idFr: 'Stratégie digitale : votre organisation est-elle engagée dans sa transformation numérique ?',
    idEn: 'Digital strategy: is your organization engaged in digital transformation?',
    optionsFr: ['Stratégie digitale formalisée et en déploiement', 'Projets isolés ou en réflexion', 'Pas de stratégie digitale'],
    optionsEn: ['Formalized digital strategy being deployed', 'Isolated projects or under consideration', 'No digital strategy'],
    weights: [10, 5, 0],
  },
  {
    idFr: 'Fonction RH : disposez-vous d\'une politique RH formalisée et d\'un suivi des performances ?',
    idEn: 'HR function: do you have a formalized HR policy and performance tracking?',
    optionsFr: ['Politique RH complète avec évaluation et formation', 'Politique partielle ou informelle', 'Aucune politique RH structurée'],
    optionsEn: ['Complete HR policy with evaluation and training', 'Partial or informal policy', 'No structured HR policy'],
    weights: [10, 5, 0],
  },
  {
    idFr: 'ESG & Impact : mesurez-vous votre empreinte carbone et votre impact social ?',
    idEn: 'ESG & Impact: do you measure your carbon footprint and social impact?',
    optionsFr: ['Reporting ESG complet avec objectifs chiffrés', 'Actions ponctuelles sans reporting', 'Aucune démarche ESG'],
    optionsEn: ['Complete ESG reporting with quantified targets', 'Occasional actions without reporting', 'No ESG approach'],
    weights: [10, 5, 0],
  },
];

type Level = 'critical' | 'moderate' | 'good';

interface ScoreResult {
  level: Level;
  scoreFr: string;
  scoreEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  color: string;
  icon: string;
  ctaFr: string;
  ctaEn: string;
  ctaHref: string;
}

function getResult(score: number): ScoreResult {
  if (score <= 20) {
    return {
      level: 'critical',
      scoreFr: `${score}/60`,
      scoreEn: `${score}/60`,
      titleFr: 'Risques élevés — Intervention urgente',
      titleEn: 'High risks — Urgent intervention',
      descFr: 'Votre organisation présente des vulnérabilités structurelles importantes. Sans action rapide, vous êtes exposé à des pertes financières, des sanctions réglementaires ou une crise de gouvernance et de capital humain.',
      descEn: 'Your organization has significant structural vulnerabilities. Without quick action, you face financial losses, regulatory sanctions, or a governance and human capital crisis.',
      color: '#ef4444',
      icon: 'ri-error-warning-line',
      ctaFr: 'Obtenir un diagnostic d\'urgence gratuit',
      ctaEn: 'Get a free urgent diagnostic',
      ctaHref: '/tools/diagnostic-organisationnel',
    };
  }
  if (score <= 40) {
    return {
      level: 'moderate',
      scoreFr: `${score}/60`,
      scoreEn: `${score}/60`,
      titleFr: 'Maturité partielle — Consolidation nécessaire',
      titleEn: 'Partial maturity — Consolidation needed',
      descFr: 'Des bases existent mais plusieurs zones de fragilité freinent votre croissance. Une structuration ciblée sur RH, ESG et digital vous permettrait de débloquer un potentiel significatif.',
      descEn: 'Foundations exist but several fragility zones are limiting your growth. Targeted structuring on HR, ESG and digital would unlock significant potential.',
      color: '#86BC25',
      icon: 'ri-alert-line',
      ctaFr: 'Voir comment consolider — Diagnostic gratuit',
      ctaEn: 'See how to consolidate — Free diagnostic',
      ctaHref: '/tools/diagnostic-rh-strategique',
    };
  }
  return {
    level: 'good',
    scoreFr: `${score}/60`,
    scoreEn: `${score}/60`,
    titleFr: 'Bonne maturité — Optimisation possible',
    titleEn: 'Good maturity — Optimization possible',
    descFr: 'Votre organisation est bien structurée. Un accompagnement stratégique ciblé sur l\'ESG, l\'innovation et la performance vous permettrait d\'atteindre l\'excellence.',
    descEn: 'Your organization is well structured. Targeted strategic support on ESG, innovation and performance would help you reach excellence.',
    color: '#10b981',
    icon: 'ri-check-double-line',
    ctaFr: 'Accélérer ma croissance — Parler à un expert',
    ctaEn: 'Accelerate my growth — Talk to an expert',
    ctaHref: '/tools/diagnostic-esg-impact',
  };
}

export default function DiagnosticFlash() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [step, setStep] = useState<'intro' | 'questions' | 'email' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const totalScore = answers.reduce((sum, w) => sum + w, 0);

  const handleAnswer = (weight: number) => {
    const newAnswers = [...answers, weight];
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setStep('email');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);

    const score = answers.reduce((sum, w) => sum + w, 0);
    const res = getResult(score);

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('company', company);
      formData.append('score', String(score));
      formData.append('level', res.level);
      formData.append('language', isEn ? 'en' : 'fr');
      await fetch('https://readdy.ai/api/form/d7jj0fcbgqmqj6e8smk0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
    } catch {
      // continue silently
    }

    setResult(getResult(score));
    setStep('result');
    setIsSubmitting(false);
  };

  const reset = () => {
    setStep('intro');
    setCurrentQ(0);
    setAnswers([]);
    setEmail('');
    setCompany('');
    setResult(null);
  };

  const progress = step === 'questions' ? ((currentQ) / QUESTIONS.length) * 100 : step === 'email' ? 90 : step === 'result' ? 100 : 0;

  return (
    <section
      id="diagnostic-flash"
      className="py-24 relative overflow-hidden"
      style={{ background: '#fafaf8' }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)' }}>
              <i className="ri-stethoscope-line text-xs" style={{ color: '#10b981' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#10b981' }}>
                {isEn ? 'Interactive Tool · Free' : 'Outil interactif · Gratuit'}
              </span>
            </div>
            <h2 className="font-playfair font-bold text-gray-900 leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>Diagnostic flash<br /><span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>maturité digitale & ESG</span></>
              ) : (
                <>Diagnostic flash<br /><span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>maturité digitale & ESG</span></>
              )}
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed text-gray-500">
              {isEn
                ? '4 targeted questions. Instant score. Concrete personalized recommendations — in 2 minutes.'
                : '4 questions ciblées. Score instantané. Recommandations concrètes et personnalisées — en 2 minutes.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Main card */}
        <ScrollReveal animation="scaleIn" delay={100}>
          <div className="rounded-3xl overflow-hidden" style={{ background: '#ffffff', border: '1.5px solid rgba(212,168,42,0.18)' }}>
            
            {/* Progress bar */}
            <div className="h-1 w-full" style={{ background: 'rgba(212,168,42,0.12)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #86BC25, #f4d03f)' }}
              />
            </div>

            <div className="p-8 md:p-12">
              
              {/* STEP: INTRO */}
              {step === 'intro' && (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(212,168,42,0.10)', border: '2px solid rgba(212,168,42,0.25)' }}>
                    <i className="ri-stethoscope-line text-4xl" style={{ color: '#86BC25' }} />
                  </div>
                  <h3 className="font-playfair font-bold text-gray-900 text-2xl mb-4">
                    {isEn ? 'What is your digital & ESG maturity score?' : 'Quel est votre score de maturité digitale & ESG ?'}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {isEn
                      ? 'This 6-question flash diagnostic evaluates your governance, financial performance, regulatory compliance, digital transformation, HR maturity and ESG impact. Receive your personalized score instantly.'
                      : 'Ce diagnostic flash en 6 questions évalue votre gouvernance, performance financière, conformité réglementaire, transformation digitale, maturité RH et impact ESG. Recevez votre score personnalisé instantanément.'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: 'ri-government-line', labelFr: 'Gouvernance', labelEn: 'Governance' },
                      { icon: 'ri-funds-line', labelFr: 'Performance', labelEn: 'Performance' },
                      { icon: 'ri-shield-check-line', labelFr: 'Conformité', labelEn: 'Compliance' },
                      { icon: 'ri-smartphone-line', labelFr: 'Digital', labelEn: 'Digital' },
                      { icon: 'ri-team-line', labelFr: 'RH', labelEn: 'HR' },
                      { icon: 'ri-leaf-line', labelFr: 'ESG', labelEn: 'ESG' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(212,168,42,0.05)', border: '1px solid rgba(212,168,42,0.12)' }}>
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,42,0.12)' }}>
                          <i className={`${item.icon} text-sm`} style={{ color: '#86BC25' }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{isEn ? item.labelEn : item.labelFr}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('questions')}
                    className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 8px 28px rgba(212,168,42,0.40)' }}
                  >
                    <i className="ri-play-circle-line text-xl" />
                    {isEn ? 'Start my diagnostic — 3 min' : 'Démarrer mon diagnostic — 3 min'}
                  </button>
                </div>
              )}

              {/* STEP: QUESTIONS */}
              {step === 'questions' && (
                <div className="max-w-2xl mx-auto">
                  {/* Progress indicator */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>
                      {isEn ? `Question ${currentQ + 1} of ${QUESTIONS.length}` : `Question ${currentQ + 1} sur ${QUESTIONS.length}`}
                    </span>
                    <div className="flex gap-1.5">
                      {QUESTIONS.map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={{ width: i <= currentQ ? 24 : 8, height: 8, background: i < currentQ ? '#10b981' : i === currentQ ? '#86BC25' : 'rgba(212,168,42,0.20)' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-5" style={{ background: 'rgba(212,168,42,0.10)', border: '1.5px solid rgba(212,168,42,0.25)' }}>
                      <i className="ri-questionnaire-line text-2xl" style={{ color: '#86BC25' }} />
                    </div>
                    <h3 className="font-playfair font-bold text-gray-900 text-xl leading-snug mb-6">
                      {isEn ? QUESTIONS[currentQ].idEn : QUESTIONS[currentQ].idFr}
                    </h3>

                    <div className="space-y-3">
                      {(isEn ? QUESTIONS[currentQ].optionsEn : QUESTIONS[currentQ].optionsFr).map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(QUESTIONS[currentQ].weights[i])}
                          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left cursor-pointer transition-all duration-200 group"
                          style={{ background: 'rgba(212,168,42,0.04)', border: '1.5px solid rgba(212,168,42,0.14)' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(212,168,42,0.10)';
                            e.currentTarget.style.borderColor = 'rgba(212,168,42,0.40)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(212,168,42,0.04)';
                            e.currentTarget.style.borderColor = 'rgba(212,168,42,0.14)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 font-bold text-sm" style={{ background: 'rgba(212,168,42,0.12)', color: '#86BC25' }}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1 leading-relaxed">
                            {option}
                          </span>
                          <i className="ri-arrow-right-line text-gray-300 group-hover:text-gold-500 flex-shrink-0 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP: EMAIL */}
              {step === 'email' && (
                <div className="max-w-xl mx-auto text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.10)', border: '2px solid rgba(16,185,129,0.25)' }}>
                    <i className="ri-mail-send-line text-3xl" style={{ color: '#10b981' }} />
                  </div>
                  <h3 className="font-playfair font-bold text-gray-900 text-2xl mb-3">
                    {isEn ? 'Your score is ready!' : 'Votre score est prêt !'}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {isEn
                      ? 'Enter your professional email to receive your score and personalized recommendations.'
                      : 'Entrez votre email professionnel pour recevoir votre score et vos recommandations personnalisées.'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4 text-left" data-readdy-form>
                    <div>
                      <label htmlFor="diag-email" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {isEn ? 'Professional email *' : 'Email professionnel *'}
                      </label>
                      <input
                        id="diag-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={isEn ? 'name@company.com' : 'prenom@entreprise.com'}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                        style={{ background: 'rgba(212,168,42,0.05)', border: '1.5px solid rgba(212,168,42,0.20)', color: '#111' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                      />
                    </div>
                    <div>
                      <label htmlFor="diag-company" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {isEn ? 'Organization / Company' : 'Organisation / Entreprise'}
                      </label>
                      <input
                        id="diag-company"
                        type="text"
                        name="company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder={isEn ? 'Your organization name' : 'Nom de votre organisation'}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                        style={{ background: 'rgba(212,168,42,0.05)', border: '1.5px solid rgba(212,168,42,0.20)', color: '#111' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#86BC25')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,42,0.20)')}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!email || isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 6px 24px rgba(212,168,42,0.40)' }}
                    >
                      {isSubmitting ? (
                        <><i className="ri-loader-4-line animate-spin" /> {isEn ? 'Calculating...' : 'Calcul en cours...'}</>
                      ) : (
                        <><i className="ri-bar-chart-fill" /> {isEn ? 'See my score & recommendations' : 'Voir mon score & recommandations'}</>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-400">
                      {isEn
                        ? 'No spam. Results sent once. Unsubscribe anytime.'
                        : 'Pas de spam. Résultats envoyés une seule fois. Désinscription à tout moment.'}
                    </p>
                  </form>
                </div>
              )}

              {/* STEP: RESULT */}
              {step === 'result' && result && (
                <div className="max-w-2xl mx-auto">
                  {/* Score display */}
                  <div className="text-center mb-8">
                    <div
                      className="w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-5 ring-4"
                      style={{ background: `${result.color}14`, border: `3px solid ${result.color}` }}
                    >
                      <div className="text-center">
                        <div className="font-playfair font-bold text-2xl" style={{ color: result.color }}>{totalScore}</div>
                        <div className="text-xs font-bold text-gray-400">/60</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3" style={{ background: `${result.color}12`, border: `1px solid ${result.color}28` }}>
                      <i className={`${result.icon} text-sm`} style={{ color: result.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: result.color }}>
                        {isEn ? result.titleEn : result.titleFr}
                      </span>
                    </div>
                    <h3 className="font-playfair font-bold text-gray-900 text-xl mb-4">
                      {isEn ? result.titleEn : result.titleFr}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {isEn ? result.descEn : result.descFr}
                    </p>
                  </div>

                  {/* Score bars by axis */}
                  <div className="rounded-2xl p-6 mb-7" style={{ background: 'rgba(212,168,42,0.05)', border: '1px solid rgba(212,168,42,0.14)' }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">
                      {isEn ? 'Score by axis' : 'Score par axe'}
                    </p>
                    <div className="space-y-3">
                      {QUESTIONS.map((q, i) => {
                        const w = answers[i] ?? 0;
                        const pct = (w / 10) * 100;
                        const labels = isEn
                          ? ['Governance', 'Financial Performance', 'Compliance', 'Digital Strategy', 'HR Function', 'ESG & Impact']
                          : ['Gouvernance', 'Performance Financière', 'Conformité', 'Stratégie Digitale', 'Fonction RH', 'ESG & Impact'];
                        const c = w === 10 ? '#10b981' : w === 5 ? '#86BC25' : '#ef4444';
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-gray-600 w-36 flex-shrink-0">{labels[i]}</span>
                            <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: c, transitionDelay: `${i * 150}ms` }} />
                            </div>
                            <span className="text-xs font-bold w-10 text-right" style={{ color: c }}>{w}/10</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={result.ctaHref}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 6px 24px rgba(212,168,42,0.40)' }}
                    >
                      <i className="ri-stethoscope-line" />
                      {isEn ? result.ctaEn : result.ctaFr}
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                      style={{ border: '1.5px solid rgba(212,168,42,0.30)', color: '#86BC25', background: 'transparent' }}
                    >
                      <i className="ri-refresh-line" />
                      {isEn ? 'Restart' : 'Recommencer'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
