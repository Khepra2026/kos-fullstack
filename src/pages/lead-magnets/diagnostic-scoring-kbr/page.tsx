import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';

const FORM_URL = 'https://readdy.ai/api/form/d90b3kms51g94qljs5ag';

const SCORING_AXES = [
  { key: 'regulation', label: 'Régulation & Conformité', weight: 35, icon: 'ri-shield-check-line', color: '#c9a227', questions: [
    'Votre organisation est-elle soumise à la réglementation BCEAO, COBAC ou BEAC ?',
    'Avez-vous subi une inspection réglementaire dans les 24 derniers mois ?',
    'Disposez-vous d\'un dispositif LBC/FT documenté et approuvé par le Conseil ?',
    'Vos ratios prudentiels sont-ils conformes aux dernières exigences ?',
  ]},
  { key: 'gouvernance', label: 'Gouvernance & Due Diligence', weight: 30, icon: 'ri-building-2-line', color: '#22a05a', questions: [
    'Votre Conseil d\'Administration compte-t-il au moins 1/3 d\'administrateurs indépendants ?',
    'Avez-vous réalisé un audit de gouvernance externe dans les 36 derniers mois ?',
    'Disposez-vous de comités spécialisés (Audit, Risques, Rémunération) fonctionnels ?',
    'Avez-vous une cartographie des risques actualisée et validée par le Conseil ?',
  ]},
  { key: 'carbone', label: 'Climat, Transition & ESG', weight: 25, icon: 'ri-leaf-line', color: '#3b82f6', questions: [
    'Avez-vous initié un reporting ESG aligné sur les standards ISSB ou GRI ?',
    'Disposez-vous d\'un plan de décarbonation avec des objectifs chiffrés à 2030 ?',
    'Avez-vous réalisé un stress test climatique sur votre portefeuille d\'actifs ?',
    'Vos financements intègrent-ils des critères ESG dans la politique de crédit ?',
  ]},
  { key: 'intelligence', label: 'Intelligence d\'Affaires & KBR', weight: 20, icon: 'ri-brain-line', color: '#d946ef', questions: [
    'Disposez-vous d\'études sectorielles récentes pour vos marchés cibles ?',
    'Avez-vous une veille concurrentielle structurée sur votre secteur ?',
    'Utilisez-vous des benchmarks internationaux pour calibrer votre stratégie ?',
    'Avez-vous identifié des opportunités de monétisation de votre capital intellectuel ?',
  ]},
];

const SCORE_THRESHOLDS = [
  { min: 75, grade: 'A', label: 'Excellent — Leadership', color: '#22c55e', description: 'Votre organisation démontre une maturité avancée. Vous êtes en position de force.', action: 'Accédez à notre consultation stratégique offerte pour explorer les opportunités de leadership sectoriel.' },
  { min: 55, grade: 'B', label: 'Bon — Proactif', color: '#86BC25', description: 'Bonne dynamique avec des axes d\'amélioration identifiés. Vous anticipez les exigences.', action: 'Recevez votre rapport personnalisé avec 5 recommandations prioritaires et une proposition de diagnostic approfondi.' },
  { min: 30, grade: 'C', label: 'Intermédiaire — Vigilance', color: '#f59e0b', description: 'Des fondamentaux en place mais des écarts significatifs subsistent sur certains axes.', action: 'Téléchargez votre rapport détaillé avec un plan d\'action correctif et une offre d\'accompagnement dédiée.' },
  { min: 0, grade: 'D', label: 'À développer — Urgence', color: '#ef4444', description: 'Des lacunes critiques exposent votre organisation à des risques réglementaires et concurrentiels.', action: 'Bénéficiez d\'un diagnostic flash gratuit de 30 minutes avec un expert KHEPRA pour prioriser vos actions.' },
];

export default function DiagnosticScoringKBRPage() {
  const [currentStep, setCurrentStep] = useState<'form' | 'calculating' | 'results'>('form');
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({ full_name: '', email: '', organization: '', position: '', country: '', sector: '' });
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleResponseChange = (axisKey: string, qIndex: number, value: number) => {
    setResponses((prev) => ({ ...prev, [`${axisKey}_${qIndex}`]: value }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const allQuestionsAnswered = SCORING_AXES.every((axis) =>
    axis.questions.every((_, qIndex) => responses[`${axis.key}_${qIndex}`] !== undefined)
  );

  const calculateScores = async () => {
    setCurrentStep('calculating');

    const axisScores: Record<string, number> = {};
    let weightedTotal = 0;

    SCORING_AXES.forEach((axis) => {
      const axisResponses = axis.questions.map((_, qIndex) => responses[`${axis.key}_${qIndex}`] || 0);
      const avg = axisResponses.reduce((sum, r) => sum + r, 0) / axisResponses.length;
      const normalized = Math.round((avg / 5) * 100);
      axisScores[axis.key] = normalized;
      weightedTotal += normalized * (axis.weight / 100);
    });

    setScores(axisScores);
    setTotalScore(Math.round(weightedTotal));

    const selectedGrade = SCORE_THRESHOLDS.find((t) => weightedTotal >= t.min) || SCORE_THRESHOLDS[SCORE_THRESHOLDS.length - 1];

    if (formData.email) {
      try {
        const body = new URLSearchParams();
        body.append('email', formData.email);
        body.append('full_name', formData.full_name);
        body.append('organization', formData.organization);
        body.append('position', formData.position);
        body.append('country', formData.country);
        body.append('sector', formData.sector);
        body.append('total_score', String(Math.round(weightedTotal)));
        body.append('score_grade', selectedGrade.grade);
        body.append('score_regulation', String(axisScores.regulation));
        body.append('score_gouvernance', String(axisScores.gouvernance));
        body.append('score_carbone', String(axisScores.carbone));
        body.append('score_intelligence', String(axisScores.intelligence));
        body.append('lead_magnet', 'diagnostic-scoring-kbr');

        await fetch(FORM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
      } catch {
        // Silencieux — le rapport s'affiche quand même
      }
    }

    setTimeout(() => setCurrentStep('results'), 2000);
  };

  const getGrade = () => SCORE_THRESHOLDS.find((t) => totalScore >= t.min) || SCORE_THRESHOLDS[SCORE_THRESHOLDS.length - 1];
  const grade = getGrade();

  return (
    <>
      <SeoHead
        title="Diagnostic Scoring KBR — Évaluez votre Maturité Réglementaire | KHEPRA EXPERTS"
        description="Diagnostic gratuit en 5 minutes — Scoring 4 axes (Régulation, Gouvernance, ESG, Intelligence d'Affaires). Rapport personnalisé avec recommandations. Modèle KBR."
        canonicalPath="/lead-magnets/diagnostic-scoring-kbr"
        keywords="diagnostic conformité BCEAO, scoring réglementaire, évaluation gouvernance, ESG scoring, KBR model, maturité réglementaire"
      />

      <div className="min-h-screen bg-background-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-foreground-900">KHEPRA EXPERTS</span>
            </Link>
            <Link to="/lead-magnets" className="text-xs text-foreground-600 hover:text-foreground-900 transition-colors font-medium">
              <i className="ri-arrow-left-line mr-1"></i>
              Retour aux ressources
            </Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          {currentStep === 'form' && (
            <div className="space-y-10">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,162,42,0.10)', border: '1px solid rgba(201,162,42,0.20)' }}>
                  <i className="ri-flashlight-line text-xs" style={{ color: '#c9a227' }}></i>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#b8941f' }}>
                    Diagnostic Gratuit — 5 minutes
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-3 leading-tight">
                  Diagnostic Scoring KBR
                </h1>
                <p className="text-foreground-600 max-w-2xl mx-auto text-base leading-relaxed">
                  Évaluez la maturité réglementaire et stratégique de votre organisation sur 4 axes critiques. 
                  Recevez votre rapport personnalisé avec des recommandations actionnables, benchmarkées sur les standards Big Four.
                </p>
              </div>

              {/* Scoring axes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SCORING_AXES.map((axis) => (
                  <div key={axis.key} className="rounded-2xl p-5 md:p-6 bg-white border border-background-200/70">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${axis.color}15` }}>
                        <i className={`${axis.icon} text-xl`} style={{ color: axis.color }}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground-900 text-sm">{axis.label}</h3>
                        <span className="text-xs text-foreground-500">Poids : {axis.weight}%</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {axis.questions.map((question, qIndex) => (
                        <div key={qIndex}>
                          <p className="text-xs text-foreground-700 mb-2 font-medium">{question}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <button
                                key={val}
                                onClick={() => handleResponseChange(axis.key, qIndex, val)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  responses[`${axis.key}_${qIndex}`] === val
                                    ? 'text-white'
                                    : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                                }`}
                                style={responses[`${axis.key}_${qIndex}`] === val ? { backgroundColor: axis.color } : {}}
                              >
                                {val}
                              </button>
                            ))}
                            <span className="ml-2 text-foreground-400 text-[10px]">
                              {valIdxToLabel(responses[`${axis.key}_${qIndex}`] || 0)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Identity form */}
              <div className="rounded-2xl p-5 md:p-6 bg-white border border-background-200/70">
                <h3 className="font-bold text-foreground-900 mb-4 text-sm flex items-center gap-2">
                  <i className="ri-user-line"></i>
                  Vos informations pour recevoir le rapport personnalisé
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={(e) => handleFormChange('full_name', e.target.value)} placeholder="Votre nom" className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Email professionnel <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} placeholder="vous@organisation.com" className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Organisation</label>
                    <input type="text" name="organization" value={formData.organization} onChange={(e) => handleFormChange('organization', e.target.value)} placeholder="Nom de votre structure" className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Fonction</label>
                    <input type="text" name="position" value={formData.position} onChange={(e) => handleFormChange('position', e.target.value)} placeholder="DG, DAF, RCSI..." className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Pays</label>
                    <select name="country" value={formData.country} onChange={(e) => handleFormChange('country', e.target.value)} className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300">
                      <option value="">Sélectionner...</option>
                      {['CI','SN','BJ','TG','BF','ML','CM','GA','CG','GN','NE','CD','TD','CF','GQ'].map((c) => (
                        <option key={c} value={c}>{c} — {countryLabel(c)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Secteur</label>
                    <select name="sector" value={formData.sector} onChange={(e) => handleFormChange('sector', e.target.value)} className="w-full px-3 py-2.5 border border-background-200 rounded-lg text-sm bg-white text-foreground-900 outline-none focus:ring-2 focus:ring-background-300">
                      <option value="">Sélectionner...</option>
                      <option value="banque">Banque</option>
                      <option value="microfinance">Microfinance / SFD</option>
                      <option value="assurance">Assurance</option>
                      <option value="fintech">FinTech</option>
                      <option value="industrie">Industrie</option>
                      <option value="services">Services</option>
                      <option value="public">Secteur Public</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <p className="text-[10px] text-foreground-400 mt-3 flex items-center gap-1">
                  <i className="ri-lock-2-line"></i>
                  Rapport envoyé par email. Confidentiel. Pas de spam. Désabonnement en 1 clic.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={calculateScores}
                  disabled={!allQuestionsAnswered}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: allQuestionsAnswered ? 'linear-gradient(135deg, #c9a227, #e0c340)' : '#d1d5db',
                    boxShadow: allQuestionsAnswered ? '0 4px 20px rgba(201,162,42,0.30)' : 'none',
                  }}
                >
                  <i className="ri-flashlight-line"></i>
                  Générer mon rapport personnalisé
                </button>
                {!allQuestionsAnswered && (
                  <p className="text-xs text-foreground-500 mt-2">
                    Répondez aux 16 questions ci-dessus pour débloquer votre rapport.
                  </p>
                )}
              </div>
            </div>
          )}

          {currentStep === 'calculating' && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(201,162,42,0.15), rgba(201,162,42,0.05))' }}>
                <i className="ri-loader-4-line text-4xl animate-spin" style={{ color: '#c9a227' }}></i>
              </div>
              <h2 className="text-2xl font-bold text-foreground-900 mb-2">Analyse en cours...</h2>
              <p className="text-foreground-600 max-w-md mx-auto">
                Notre moteur KBR calcule votre score sur les 4 axes — Régulation, Gouvernance, ESG, Intelligence d'Affaires.
                Nous benchmarkons vos résultats par rapport aux standards Big Four.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {SCORING_AXES.map((axis) => (
                  <div key={axis.key} className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: axis.color, animationDelay: `${SCORING_AXES.indexOf(axis) * 200}ms` }}></div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'results' && (
            <div className="space-y-10">
              {/* Grade Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: `${grade.color}15`, border: `1px solid ${grade.color}30` }}>
                  <span className="text-xs font-bold" style={{ color: grade.color }}>Rapport Généré</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-2">
                  Votre Diagnostic KBR
                </h1>
                <div className="flex items-center justify-center gap-3 mt-4 mb-4">
                  <div className="text-5xl md:text-6xl font-bold" style={{ color: grade.color, fontFamily: 'var(--font-heading), serif' }}>
                    {totalScore}
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-foreground-900">/100</div>
                    <div className="text-sm font-bold" style={{ color: grade.color }}>Grade {grade.grade}</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${grade.color}15` }}>
                  <i className={`${grade.grade === 'A' ? 'ri-star-fill' : grade.grade === 'B' ? 'ri-thumb-up-fill' : grade.grade === 'C' ? 'ri-alert-fill' : 'ri-error-warning-fill'} text-sm`} style={{ color: grade.color }}></i>
                  <span className="text-sm font-bold" style={{ color: grade.color }}>{grade.label}</span>
                </div>
                <p className="text-foreground-600 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{grade.description}</p>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SCORING_AXES.map((axis) => {
                  const score = scores[axis.key] || 0;
                  const barColor = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : score >= 25 ? '#f97316' : '#ef4444';
                  return (
                    <div key={axis.key} className="rounded-2xl p-5 bg-white border border-background-200/70">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${axis.color}15` }}>
                          <i className={`${axis.icon} text-xl`} style={{ color: axis.color }}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-foreground-900 text-sm">{axis.label}</h3>
                            <span className="text-lg font-bold" style={{ color: barColor }}>{score}%</span>
                          </div>
                          <div className="text-xs text-foreground-500">Poids : {axis.weight}%</div>
                        </div>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${score}%`, backgroundColor: barColor }}
                        ></div>
                      </div>
                      <p className="text-xs text-foreground-600 mt-2">{getAxisInsight(axis.key, score)}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recommendations */}
              <div className="rounded-2xl p-6 bg-white border border-background-200/70">
                <h3 className="font-bold text-foreground-900 mb-4 flex items-center gap-2">
                  <i className="ri-lightbulb-line" style={{ color: '#c9a227' }}></i>
                  Recommandations Personnalisées
                </h3>
                <div className="space-y-3">
                  {generateRecommendations(scores).map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background-50">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: rec.priority === 'critical' ? '#fef2f2' : rec.priority === 'high' ? '#fffbeb' : '#f0fdf4' }}>
                        <i className={`${rec.priority === 'critical' ? 'ri-error-warning-fill text-red-500' : rec.priority === 'high' ? 'ri-alert-fill text-amber-500' : 'ri-check-fill text-green-500'} text-xs`}></i>
                      </div>
                      <p className="text-sm text-foreground-700">{rec.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA: Action */}
              <div className="text-center rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', color: '#ffffff' }}>
                <h3 className="text-xl font-bold mb-2">{grade.action.split('.')[0]}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">{grade.action}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap cursor-pointer hover:scale-105"
                    style={{ background: '#c9a227' }}
                  >
                    <i className="ri-calendar-line"></i>
                    Réserver une consultation
                  </Link>
                  <Link
                    to="/lead-magnets"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white/80 hover:text-white transition-all whitespace-nowrap cursor-pointer border border-white/20"
                  >
                    <i className="ri-file-download-line"></i>
                    Explorer nos ressources
                  </Link>
                </div>
              </div>

              {/* Bottom trust */}
              <div className="text-center">
                <p className="text-xs text-foreground-400">
                  Votre rapport complet a été envoyé à <strong>{formData.email || 'votre adresse email'}</strong>. 
                  Vérifiez vos spams si vous ne le recevez pas sous 5 minutes.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function valIdxToLabel(val: number): string {
  const labels: Record<number, string> = { 1: 'Très faible', 2: 'Faible', 3: 'Moyen', 4: 'Bon', 5: 'Excellent' };
  return labels[val] || '';
}

function countryLabel(code: string): string {
  const map: Record<string, string> = {
    CI: "Côte d'Ivoire", SN: 'Sénégal', BJ: 'Bénin', TG: 'Togo', BF: 'Burkina Faso',
    ML: 'Mali', CM: 'Cameroun', GA: 'Gabon', CG: 'Congo', GN: 'Guinée',
    NE: 'Niger', CD: 'RDC', TD: 'Tchad', CF: 'Centrafrique', GQ: 'Guinée Équatoriale',
  };
  return map[code] || code;
}

function getAxisInsight(axis: string, score: number): string {
  if (score >= 75) return 'Domaine maîtrisé — Vous êtes au-dessus des standards. Continuez à innover.';
  if (score >= 50) return 'Des bases solides avec des axes d\'amélioration. Un plan de renforcement est recommandé.';
  if (score >= 25) return 'Écarts significatifs — Une mise à niveau est nécessaire pour éviter les risques.';
  return 'Situation critique — Intervention urgente recommandée. Contactez nos experts.';
}

function generateRecommendations(scores: Record<string, number>): { text: string; priority: 'critical' | 'high' | 'normal' }[] {
  const recs: { text: string; priority: 'critical' | 'high' | 'normal' }[] = [];

  if ((scores.regulation || 0) < 60) {
    recs.push({ text: 'Prioriser un audit de conformité réglementaire complet (BCEAO/COBAC/BEAC) pour identifier les écarts critiques avant la prochaine inspection.', priority: 'critical' });
    recs.push({ text: 'Mettre en place un dispositif LBC/FT documenté et approuvé par le Conseil, aligné sur les 40 Recommandations du GAFI.', priority: 'high' });
  }
  if ((scores.gouvernance || 0) < 60) {
    recs.push({ text: 'Renforcer l\'indépendance du Conseil d\'Administration avec au moins 1/3 d\'administrateurs indépendants, conformément aux standards OHADA.', priority: 'critical' });
    recs.push({ text: 'Formaliser et activer les comités spécialisés (Audit, Risques, Rémunération) avec des chartes de fonctionnement.', priority: 'high' });
  }
  if ((scores.carbone || 0) < 55) {
    recs.push({ text: 'Initier un reporting ESG structuré selon les standards ISSB IFRS S1/S2 pour anticiper les exigences des bailleurs internationaux.', priority: 'high' });
  }
  if ((scores.intelligence || 0) < 50) {
    recs.push({ text: 'Mettre en place une veille sectorielle et concurrentielle structurée pour identifier les opportunités de marché.', priority: 'normal' });
    recs.push({ text: 'Capitaliser votre expertise interne en publications (études, benchmarks, notes sectorielles) pour renforcer votre autorité.', priority: 'normal' });
  }

  if (recs.length === 0) {
    recs.push({ text: 'Votre organisation est mature sur tous les axes. Continuez à maintenir l\'excellence et explorez les opportunités de leadership sectoriel.', priority: 'normal' });
  }

  return recs;
}