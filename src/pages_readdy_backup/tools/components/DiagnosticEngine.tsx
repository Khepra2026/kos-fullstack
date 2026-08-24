import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { ToolSocialShare } from '@/components/feature/ToolSocialShare';
import HowToSchema from '@/components/feature/HowToSchema';
import type { DiagnosticToolConfig, LeadFormFields } from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const LOGO_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png';

interface DiagnosticEngineProps {
  config: DiagnosticToolConfig;
}

export default function DiagnosticEngine({ config }: DiagnosticEngineProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isFr = !currentLang.startsWith('en');
  const reportRef = useRef<HTMLDivElement>(null);

  // ── State ──
  const [currentAxisIdx, setCurrentAxisIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadFormFields>({ name: '', email: '', organization: '', position: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [userOrg, setUserOrg] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  // ── Derived ──
  const axes = config.axes;
  const totalQuestions = axes.reduce((sum, a) => sum + a.questions.length, 0);
  const currentAxis = axes[currentAxisIdx];
  const currentQuestion = currentAxis.questions[currentQuestionIdx];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  // ── Baseline (comparison) ──
  const getBaseline = (): { date: string; globalScore: number; perAxis: Record<string, number> } | null => {
    if (!config.comparison) return null;
    try {
      const raw = localStorage.getItem(config.comparison.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };
  const saveBaseline = () => {
    if (!config.comparison) return;
    try {
      localStorage.setItem(config.comparison.storageKey, JSON.stringify({
        date: new Date().toISOString(),
        globalScore,
        perAxis,
      }));
    } catch { /* ignore */ }
  };
  const clearBaseline = () => {
    if (!config.comparison) return;
    try { localStorage.removeItem(config.comparison.storageKey); } catch { /* ignore */ }
  };
  const baseline = getBaseline();

  // ── Scoring ──
  const calculateScores = useCallback(() => {
    const axisData: Record<string, { total: number; count: number; weight: number }> = {};
    axes.forEach((axis) => {
      const weight = axis.weight ?? 100 / axes.length;
      axisData[axis.id] = { total: 0, count: 0, weight };
      axis.questions.forEach((q) => {
        const val = answers[q.id];
        if (val !== undefined && val >= 0) {
          axisData[axis.id].total += val;
          axisData[axis.id].count += 1;
        }
      });
    });

    const perAxis: Record<string, number> = {};
    let globalTotal = 0;
    let globalWeight = 0;

    Object.entries(axisData).forEach(([id, data]) => {
      perAxis[id] = data.count > 0 ? Math.round(data.total / data.count) : 0;
      globalTotal += perAxis[id] * data.weight;
      globalWeight += data.weight;
    });

    return { globalScore: globalWeight > 0 ? Math.round(globalTotal / globalWeight) : 0, perAxis };
  }, [answers, axes]);

  const { globalScore, perAxis } = showResults ? calculateScores() : { globalScore: 0, perAxis: {} };

  // ── Navigation ──
  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (currentQuestionIdx < currentAxis.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIdx((p) => p + 1), 200);
    } else if (currentAxisIdx < axes.length - 1) {
      setTimeout(() => { setCurrentAxisIdx((p) => p + 1); setCurrentQuestionIdx(0); }, 200);
    } else {
      if (config.showLeadForm) {
        setTimeout(() => setShowLeadForm(true), 300);
      } else {
        setTimeout(() => setShowResults(true), 300);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((p) => p - 1);
    } else if (currentAxisIdx > 0) {
      const prevAxis = axes[currentAxisIdx - 1];
      setCurrentAxisIdx((p) => p - 1);
      setCurrentQuestionIdx(prevAxis.questions.length - 1);
    }
  };

  const handleAxisJump = (idx: number) => {
    setCurrentAxisIdx(idx);
    setCurrentQuestionIdx(0);
  };

  // ── Lead form ──
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.formUrl) return;
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const { globalScore: score, perAxis: axisScores } = calculateScores();
      const params = new URLSearchParams();
      params.append('nom', leadData.name);
      params.append('email', leadData.email);
      params.append('telephone', leadData.phone);
      params.append('organisation', leadData.organization);
      params.append('fonction', leadData.position);
      params.append('score_global', String(score));
      params.append('niveau_maturite', config.getMaturityLevel(score, currentLang));
      params.append('scores_axes', JSON.stringify(axisScores));
      params.append('nb_questions', String(Object.keys(answers).length));
      params.append('langue', currentLang);
      params.append('outil', config.toolId);

      await fetch(config.formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setSubmitSuccess(true);
      setTimeout(() => { setShowResults(true); setShowLeadForm(false); }, 1200);
    } catch {
      setSubmitError(isFr ? 'Une erreur est survenue. Vos résultats seront affichés.' : 'An error occurred. Your results will be displayed.');
      setTimeout(() => { setShowResults(true); setShowLeadForm(false); }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectResults = () => {
    setShowResults(true);
    setShowLeadForm(false);
  };

  // ── PDF ──
  const generatePDF = useCallback(() => {
    setPdfGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    const addText = (text: string, size = 11, bold = false, color?: string) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      if (color) doc.setTextColor(color); else doc.setTextColor('#1f2937');
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * (size * 0.45) + 2;
    };

    const addLine = () => {
      y += 2;
      doc.setDrawColor('#e5e7eb');
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;
    };

    // Header
    doc.setFillColor(config.getScoreColor(globalScore));
    doc.rect(0, 0, pageWidth, 14, 'F');
    doc.setTextColor('#ffffff');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('KHEPRA EXPERTS', margin, 10);
    doc.setFont('helvetica', 'normal');
    doc.text(isFr ? config.toolNameFr : config.toolNameEn, pageWidth - margin, 10, { align: 'right' });

    y = 24;
    addText((isFr ? 'RAPPORT DE ' : 'REPORT — ') + (isFr ? config.toolNameFr.toUpperCase() : config.toolNameEn.toUpperCase()), 16, true, config.getScoreColor(globalScore));
    addText(`${isFr ? 'Généré le' : 'Generated on'} ${new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US')}`, 9, false, '#6b7280');
    addLine();

    addText(isFr ? 'SCORE GLOBAL' : 'GLOBAL SCORE', 13, true, config.getScoreColor(globalScore));
    addText(`${globalScore}/100`, 28, true, config.getScoreColor(globalScore));
    addText(config.getScoreLabel(globalScore, currentLang), 12, true);
    addText(config.getReadinessIndicator(globalScore, currentLang), 10, false, '#6b7280');
    addLine();

    addText(isFr ? 'SCORES PAR AXE' : 'SCORES BY AXIS', 13, true, config.getScoreColor(globalScore));
    axes.forEach((axis) => {
      const score = perAxis[axis.id] ?? 0;
      addText(`${(isFr ? axis.titleFr : axis.titleEn)}: ${score}/100`, 10, false, config.getScoreColor(score));
    });
    addLine();

    const risks = config.getRisks(perAxis, globalScore, currentLang);
    addText(isFr ? 'PRINCIPAUX RISQUES IDENTIFIÉS' : 'KEY IDENTIFIED RISKS', 13, true, config.getScoreColor(globalScore));
    risks.forEach((risk, i) => {
      const riskText = typeof risk === 'string' ? risk : (isFr ? risk.fr : risk.en);
      addText(`${i + 1}. ${riskText}`, 9);
    });
    addLine();

    const recs = config.getRecommendations(perAxis, globalScore, currentLang);
    addText(isFr ? 'RECOMMANDATIONS PRIORITAIRES' : 'PRIORITY RECOMMENDATIONS', 13, true, config.getScoreColor(globalScore));
    recs.forEach((rec) => {
      addText(rec.title, 10, true, '#374151');
      rec.items.forEach((item) => addText(`  • ${item}`, 9));
      y += 2;
    });

    // Footer
    doc.setFillColor('#f3f4f6');
    doc.rect(0, doc.internal.pageSize.getHeight() - 18, pageWidth, 18, 'F');
    doc.setTextColor('#6b7280');
    doc.setFontSize(8);
    doc.text(isFr ? 'Ce rapport est généré automatiquement à titre indicatif. Pour un accompagnement complet, contactez KHEPRA EXPERTS.' : 'This report is automatically generated for indicative purposes. For full support, contact KHEPRA EXPERTS.', margin, doc.internal.pageSize.getHeight() - 8);
    doc.text('khepraexperts.com', pageWidth - margin, doc.internal.pageSize.getHeight() - 8, { align: 'right' });

    const orgName = leadData.organization || userOrg || (isFr ? 'Organisation' : 'Organization');
    doc.save(`${config.toolId}-${orgName}-${new Date().toISOString().split('T')[0]}.pdf`);
    setPdfGenerating(false);
  }, [globalScore, perAxis, currentLang, isFr, leadData.organization, userOrg, axes, config]);

  // ── Breadcrumb ──
  const breadcrumbItems = [
    { label: isFr ? 'Accueil' : 'Home', path: '/' },
    { label: isFr ? 'Outils' : 'Tools', path: '/tools' },
    { label: isFr ? config.toolNameFr : config.toolNameEn, path: config.canonicalPath },
  ];

  // ── Schema ──
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${config.canonicalPath}#webpage`,
        url: `${SITE_URL}${config.canonicalPath}`,
        name: isFr ? config.seoTitleFr : config.seoTitleEn,
        description: isFr ? config.seoDescriptionFr : config.seoDescriptionEn,
        inLanguage: isFr ? 'fr-FR' : 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'KHEPRA EXPERTS' },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}${config.canonicalPath}#app`,
        name: isFr ? config.toolNameFr : config.toolNameEn,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: isFr ? config.seoDescriptionFr : config.seoDescriptionEn,
        url: `${SITE_URL}${config.canonicalPath}`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'XOF' },
        provider: { '@type': 'Organization', name: 'Khepera Experts', url: SITE_URL },
      },
    ],
  };

  // ── Utils ──
  const resolveRiskText = (risk: string | { fr: string; en: string }): string =>
    typeof risk === 'string' ? risk : (isFr ? risk.fr : risk.en);

  const resolveRiskBanner = (riskText: string): string => {
    const critical = ['RISQUE CRITIQUE', 'CRITICAL RISK', 'RISQUE MAJEUR', 'MAJOR RISK'];
    const high = ['RISQUE ÉLEVÉ', 'HIGH RISK'];
    if (critical.some((k) => riskText.includes(k))) return 'border-red-200 bg-red-50';
    if (high.some((k) => riskText.includes(k))) return 'border-accent-200 bg-accent-50';
    return 'border-secondary-100 bg-background-100';
  };

  const resolveRiskIcon = (riskText: string): string => {
    const critical = ['RISQUE CRITIQUE', 'CRITICAL RISK', 'RISQUE MAJEUR', 'MAJOR RISK'];
    const high = ['RISQUE ÉLEVÉ', 'HIGH RISK'];
    if (critical.some((k) => riskText.includes(k))) return 'ri-error-warning-line text-red-500';
    if (high.some((k) => riskText.includes(k))) return 'ri-alert-line text-accent-500';
    return 'ri-check-line text-primary-500';
  };

  const resolveRiskIconBg = (riskText: string): string => {
    const critical = ['RISQUE CRITIQUE', 'CRITICAL RISK', 'RISQUE MAJEUR', 'MAJOR RISK'];
    const high = ['RISQUE ÉLEVÉ', 'HIGH RISK'];
    if (critical.some((k) => riskText.includes(k))) return 'bg-red-100';
    if (high.some((k) => riskText.includes(k))) return 'bg-accent-100';
    return 'bg-primary-100';
  };

  // ── Render ──
  return (
    <>
      <SeoHead
        title={isFr ? config.seoTitleFr : config.seoTitleEn}
        description={isFr ? config.seoDescriptionFr : config.seoDescriptionEn}
        keywords={isFr ? config.seoKeywordsFr : config.seoKeywordsEn}
        canonicalPath={config.canonicalPath}
        structuredData={schemaJson}
      />

      <Navigation />

      <HowToSchema
        name={isFr ? config.howToNameFr : config.howToNameEn}
        description={isFr ? config.howToDescriptionFr : config.howToDescriptionEn}
        totalTime={config.howToTotalTime}
        steps={config.howToSteps.map((s) => ({
          name: s.name,
          text: s.text,
        }))}
      />

      {/* Logo bar */}
      <div className="bg-background-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <Link to="/" className="block">
            <img src={LOGO_URL} alt="KHEPRA EXPERTS" className="h-10" />
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-b from-background-100 to-background-50">

        {/* ═══════════ QUESTIONNAIRE ═══════════ */}
        {!showLeadForm && !showResults && (
          <section className="pt-24 pb-20">
            <div className="container mx-auto px-4">
              <Breadcrumb items={breadcrumbItems} />

              {/* Hero */}
              <div className="max-w-4xl mx-auto mt-6 mb-10 text-center">
                {config.badgeIcon && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                    <i className={config.badgeIcon}></i>
                    <span>{isFr ? (config.badgeTextFr || '') : (config.badgeTextEn || '')}</span>
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
                  {isFr ? config.toolNameFr : config.toolNameEn}
                </h1>
                <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                  {isFr ? config.toolSubtitleFr : config.toolSubtitleEn}
                </p>
              </div>

              {/* User info (optional pre-questionnaire) */}
              {config.userInfoPreQuestionnaire && (
                <div className="max-w-4xl mx-auto mb-8 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1">{isFr ? 'Votre nom' : 'Your name'}</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'Ex: Jean Dupont' : 'E.g.: John Doe'} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1">{isFr ? 'Organisation' : 'Organization'}</label>
                    <input type="text" value={userOrg} onChange={(e) => setUserOrg(e.target.value)} className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'Nom de votre entreprise' : 'Your company name'} />
                  </div>
                </div>
              )}

              {/* Axis Navigator */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  {axes.map((axis, idx) => {
                    const isActive = idx === currentAxisIdx;
                    const isCompleted = idx < currentAxisIdx;
                    const axisAnswered = axis.questions.filter((q) => answers[q.id] !== undefined).length;
                    const axisTotal = axis.questions.length;
                    return (
                      <button
                        key={axis.id}
                        onClick={() => handleAxisJump(idx)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                          isActive ? 'bg-primary-500 text-background-50 shadow-md' : isCompleted ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'bg-secondary-100 text-foreground-500 border border-secondary-200 hover:bg-secondary-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isCompleted ? 'bg-primary-500 text-background-50' : isActive ? 'bg-background-50/20 text-background-50' : 'bg-secondary-300 text-foreground-600'}`}>
                          {isCompleted ? <i className="ri-check-line text-xs"></i> : idx + 1}
                        </div>
                        <span className="hidden sm:inline">{isFr ? axis.titleFr : axis.titleEn}</span>
                        <span className="text-xs opacity-70">{axisAnswered}/{axisTotal}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress */}
              <div className="max-w-3xl mx-auto mb-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground-600">{isFr ? 'Progression' : 'Progress'}</span>
                  <span className="text-sm font-bold text-primary-600">{answeredCount}/{totalQuestions} — {progress}%</span>
                </div>
                <div className="h-3 bg-secondary-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-foreground-400 mt-2 text-center">
                  {isFr ? `Axe ${currentAxisIdx + 1}/${axes.length} — ${currentAxis.titleFr}` : `Axis ${currentAxisIdx + 1}/${axes.length} — ${currentAxis.titleEn}`}
                </p>
              </div>

              {/* Question Card */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${currentAxis.color}15` }}>
                      <i className={`${currentAxis.icon}`} style={{ color: currentAxis.color }}></i>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${currentAxis.color}15`, color: currentAxis.color }}>
                      {isFr ? currentAxis.titleFr : currentAxis.titleEn}
                    </div>
                    <span className="text-sm text-foreground-400 ml-auto">{currentQuestionIdx + 1}/{currentAxis.questions.length}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6 leading-relaxed">
                    {isFr ? currentQuestion.questionFr : currentQuestion.questionEn}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${config.getOptionStyle(option.value, answers[currentQuestion.id] === option.value)}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers[currentQuestion.id] === option.value
                              ? 'border-foreground-950 bg-foreground-950'
                              : 'border-secondary-300'
                          }`}>
                            {answers[currentQuestion.id] === option.value ? <i className={`${config.getOptionIcon(option.value)} text-background-50 text-sm`} /> : null}
                          </div>
                          <div className="flex-1">
                            <span className={`text-base font-medium ${config.getOptionColor(option.value)}`}>{isFr ? option.labelFr : option.labelEn}</span>
                          </div>
                          {option.value >= 0 && <span className="text-xs font-bold text-foreground-400">{option.value} pts</span>}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button onClick={handlePrevious} disabled={currentAxisIdx === 0 && currentQuestionIdx === 0} className="inline-flex items-center gap-2 px-4 py-2 text-foreground-600 hover:text-primary-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                      <i className="ri-arrow-left-line"></i>
                      <span>{isFr ? 'Précédent' : 'Previous'}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      {currentAxis.questions.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentQuestionIdx ? 'bg-primary-500 w-4' : idx < currentQuestionIdx ? 'bg-primary-400' : 'bg-secondary-200'}`} />
                      ))}
                    </div>
                    <div className="w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ LEAD FORM ═══════════ */}
        {showLeadForm && config.showLeadForm && (
          <section className="pt-24 pb-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-file-chart-line text-3xl text-background-50"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground-950 mb-3">{isFr ? 'Votre diagnostic est terminé !' : 'Your diagnostic is complete!'}</h2>
                    <p className="text-lg text-foreground-600">
                      {isFr ? 'Recevez votre rapport complet avec score, analyse et recommandations personnalisées.' : 'Receive your complete report with score, analysis and personalized recommendations.'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-primary-50 to-primary-50 rounded-xl p-6 mb-8 border border-primary-200">
                    <div className="text-center">
                      <span className="text-sm text-primary-700 font-medium">{isFr ? 'Score préliminaire' : 'Preliminary score'}</span>
                      <div className="text-4xl font-bold text-primary-700 mt-1">{calculateScores().globalScore}/100</div>
                    </div>
                  </div>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3">
                      <i className="ri-checkbox-circle-line text-2xl text-primary-600"></i>
                      <span className="text-primary-800 font-medium">{isFr ? 'Envoyé avec succès !' : 'Sent successfully!'}</span>
                    </div>
                  )}

                  {submitError && (
                    <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-lg flex items-center gap-3">
                      <i className="ri-alert-line text-2xl text-accent-600"></i>
                      <span className="text-accent-800">{submitError}</span>
                    </div>
                  )}

                  <form data-readdy-form id={`${config.toolId}-lead-form`} onSubmit={handleLeadSubmit} className="space-y-5">
                    <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 pointer-events-none w-0 h-0" />
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-2">{isFr ? 'Nom complet' : 'Full name'} *</label>
                      <input type="text" name="nom" required value={leadData.name} onChange={(e) => setLeadData({ ...leadData, name: e.target.value })} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'Votre nom' : 'Your name'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-2">Email *</label>
                      <input type="email" name="email" required value={leadData.email} onChange={(e) => setLeadData({ ...leadData, email: e.target.value })} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'votre@email.com' : 'your@email.com'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-2">{isFr ? 'Organisation' : 'Organization'} *</label>
                      <input type="text" name="organisation" required value={leadData.organization} onChange={(e) => setLeadData({ ...leadData, organization: e.target.value })} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'Nom de votre organisation' : 'Your organization name'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-2">{isFr ? 'Fonction' : 'Position'} *</label>
                      <input type="text" name="fonction" required value={leadData.position} onChange={(e) => setLeadData({ ...leadData, position: e.target.value })} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder={isFr ? 'Ex: DG, Responsable...' : 'E.g.: CEO, Manager...'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-2">{isFr ? 'Téléphone' : 'Phone'} *</label>
                      <input type="tel" name="telephone" required value={leadData.phone} onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="+228 XX XX XX XX" />
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-foreground-500 mb-4">
                        {isFr ? 'En soumettant ce formulaire, vous acceptez de recevoir votre rapport et nos communications. Données protégées, jamais partagées.' : 'By submitting this form, you agree to receive your report and our communications. Data protected, never shared.'}
                      </p>
                      <button type="submit" disabled={isSubmitting || submitSuccess} className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-background-50 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                        {isSubmitting && <i className="ri-loader-4-line animate-spin text-xl"></i>}
                        {submitSuccess && <i className="ri-check-line text-xl"></i>}
                        <span>
                          {isSubmitting ? (isFr ? 'Envoi en cours...' : 'Sending...') : submitSuccess ? (isFr ? 'Envoyé !' : 'Sent!') : isFr ? 'Recevoir mon rapport' : 'Receive my report'}
                        </span>
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <button onClick={handleDirectResults} className="text-sm text-foreground-400 hover:text-primary-600 underline cursor-pointer">
                      {isFr ? 'Voir les résultats sans envoyer mes coordonnées' : 'View results without submitting my details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ RESULTS ═══════════ */}
        {showResults && (
          <section className="pt-24 pb-20" ref={reportRef}>
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">

                {/* Score Global */}
                <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <svg className="transform -rotate-90 w-40 h-40">
                        <circle cx="80" cy="80" r="72" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                        <circle cx="80" cy="80" r="72" stroke={config.getScoreColor(globalScore)} strokeWidth="10" fill="none" strokeDasharray={`${2 * Math.PI * 72}`} strokeDashoffset={`${2 * Math.PI * 72 * (1 - globalScore / 100)}`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold" style={{ color: config.getScoreColor(globalScore) }}>{globalScore}</div>
                        <div className="text-sm text-foreground-400">/100</div>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-foreground-950 mb-2">{config.getScoreLabel(globalScore, currentLang)}</h2>
                      <p className="text-lg text-foreground-600 mb-4">{config.getReadinessIndicator(globalScore, currentLang)}</p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: `${config.getScoreColor(globalScore)}15`, color: config.getScoreColor(globalScore) }}>
                          <i className="ri-shield-check-line"></i>
                          {isFr ? 'Niveau' : 'Level'}: {config.getMaturityLevel(globalScore, currentLang)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-secondary-100 text-foreground-700">
                          <i className="ri-questionnaire-line"></i>
                          {answeredCount}/{totalQuestions} {isFr ? 'questions répondues' : 'questions answered'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Share */}
                <div className="mb-8">
                  <ToolSocialShare
                    toolNameFr={config.toolNameFr}
                    toolNameEn={config.toolNameEn}
                    score={globalScore}
                    levelFr={config.getScoreLabel(globalScore, 'fr')}
                    levelEn={config.getScoreLabel(globalScore, 'en')}
                    url={`${SITE_URL}${config.canonicalPath}`}
                    hashtags={config.hashtags || []}
                  />
                </div>

                {/* Custom above-results slot */}
                {config.renderAboveResults?.(globalScore, perAxis, isFr)}

                {/* Radar Chart */}
                {config.showRadarChart !== false && config.renderRadarChart && (
                  <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                    <h3 className="text-2xl font-bold text-foreground-950 mb-6 text-center">{isFr ? 'Cartographie' : 'Mapping'}</h3>
                    <div className="flex justify-center">
                      {config.renderRadarChart(280, perAxis, axes, isFr)}
                    </div>
                    <div className={`grid grid-cols-${Math.min(axes.length, 5)} gap-4 mt-6`} style={{ gridTemplateColumns: `repeat(${Math.min(axes.length, 5)}, 1fr)` }}>
                      {axes.map((axis) => {
                        const score = perAxis[axis.id] ?? 0;
                        return (
                          <div key={axis.id} className="text-center p-3 rounded-xl bg-background-100">
                            <div className="text-2xl font-bold" style={{ color: axis.color }}>{score}</div>
                            <div className="text-xs text-foreground-600 mt-1">{isFr ? axis.titleFr : axis.titleEn}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Axis Scores */}
                <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                  <h3 className="text-2xl font-bold text-foreground-950 mb-8">{isFr ? 'Scores par axe' : 'Scores by axis'}</h3>
                  <div className="grid gap-5">
                    {axes.map((axis) => {
                      const score = perAxis[axis.id] ?? 0;
                      return (
                        <div key={axis.id}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${axis.color}15` }}>
                                <i className={`${axis.icon} text-sm`} style={{ color: axis.color }}></i>
                              </div>
                              <span className="font-semibold text-foreground-950 text-sm md:text-base">{isFr ? axis.titleFr : axis.titleEn}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold" style={{ color: config.getScoreColor(score) }}>{score}/100</span>
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.getScoreColor(score) }}></div>
                            </div>
                          </div>
                          <div className="w-full bg-secondary-100 rounded-full h-3 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: axis.color }} />
                          </div>
                          <p className="text-xs text-foreground-500 mt-1">{isFr ? axis.descriptionFr : axis.descriptionEn}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Comparison */}
                {config.comparison && baseline && (
                  <div className="mb-6">
                    <button onClick={() => setShowComparison((p) => !p)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-background-50 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all cursor-pointer">
                      <i className={showComparison ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                      <span>{showComparison ? (isFr ? 'Masquer la comparaison' : 'Hide comparison') : (isFr ? 'Voir la comparaison avec le diagnostic précédent' : 'Compare with previous diagnostic')}</span>
                    </button>
                  </div>
                )}

                {config.comparison && showComparison && baseline && (
                  <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in">
                    <h3 className="text-2xl font-bold text-foreground-950 mb-6">{isFr ? 'Évolution de votre maturité' : 'Your maturity evolution'}</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 rounded-xl bg-background-100 border border-secondary-200">
                        <div className="text-sm text-foreground-500 mb-1">{isFr ? 'Diagnostic précédent' : 'Previous diagnostic'}</div>
                        <div className="text-3xl font-bold text-foreground-400">{baseline.globalScore}/100</div>
                        <div className="text-xs text-foreground-400 mt-1">{new Date(baseline.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      </div>
                      <div className="p-6 rounded-xl bg-primary-50 border border-primary-200">
                        <div className="text-sm text-primary-600 mb-1">{isFr ? 'Diagnostic actuel' : 'Current diagnostic'}</div>
                        <div className="text-3xl font-bold text-primary-600">{globalScore}/100</div>
                        <div className="flex items-center gap-2 mt-2">
                          <i className={`${config.comparison.getDeltaIcon(globalScore - baseline.globalScore)} text-lg`} style={{ color: config.comparison.getDeltaColor(globalScore - baseline.globalScore) }}></i>
                          <span className="text-sm font-semibold" style={{ color: config.comparison.getDeltaColor(globalScore - baseline.globalScore) }}>
                            {globalScore > baseline.globalScore ? '+' : ''}{globalScore - baseline.globalScore} pts — {config.comparison.getDeltaLabel(globalScore - baseline.globalScore, currentLang)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {axes.map((axis) => {
                        const current = perAxis[axis.id] ?? 0;
                        const previous = baseline.perAxis[axis.id] ?? 0;
                        const delta = current - previous;
                        return (
                          <div key={axis.id} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${axis.color}15` }}>
                              <i className={`${axis.icon} text-sm`} style={{ color: axis.color }}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-foreground-700">{isFr ? axis.titleFr : axis.titleEn}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-foreground-400">{previous}/100</span>
                                  <i className="ri-arrow-right-line text-foreground-300 text-xs"></i>
                                  <span className="text-sm font-bold" style={{ color: config.getScoreColor(current) }}>{current}/100</span>
                                  {delta !== 0 && <span className="text-xs font-semibold" style={{ color: config.comparison.getDeltaColor(delta) }}>{delta > 0 ? '+' : ''}{delta}</span>}
                                </div>
                              </div>
                              <div className="relative h-3 bg-secondary-100 rounded-full overflow-hidden">
                                <div className="absolute h-full rounded-full bg-secondary-400 opacity-40" style={{ width: `${previous}%` }} />
                                <div className="absolute h-full rounded-full transition-all duration-700" style={{ width: `${current}%`, backgroundColor: axis.color }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Risks */}
                <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                  <h3 className="text-2xl font-bold text-foreground-950 mb-6">{isFr ? 'Risques identifiés' : 'Identified risks'}</h3>
                  <div className="space-y-4">
                    {config.getRisks(perAxis, globalScore, currentLang).map((risk, i) => {
                      const text = resolveRiskText(risk);
                      return (
                        <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${resolveRiskBanner(text)}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${resolveRiskIconBg(text)}`}>
                            <i className={`${resolveRiskIcon(text)} text-sm`}></i>
                          </div>
                          <span className="text-sm text-foreground-700 leading-relaxed">{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                  <h3 className="text-2xl font-bold text-foreground-950 mb-6">{isFr ? 'Recommandations prioritaires' : 'Priority recommendations'}</h3>
                  <div className="space-y-6">
                    {config.getRecommendations(perAxis, globalScore, currentLang).map((rec, i) => (
                      <div key={i}>
                        <h4 className="text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-600 font-bold text-xs">{i + 1}</span>
                          </div>
                          <span className="line-clamp-2" title={rec.title}>{rec.title}</span>
                        </h4>
                        <ul className="space-y-2 ml-8">
                          {rec.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground-700">
                              <i className="ri-arrow-right-s-line text-primary-500 mt-0.5 flex-shrink-0"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ultra-Closing CTA */}
                {config.ultraClosing && (() => {
                  const msg = config.ultraClosing.getMessage(globalScore, currentLang);
                  const color = config.getScoreColor(globalScore);
                  return (
                    <div className="rounded-2xl p-8 md:p-12 mb-8 border-2" style={{ backgroundColor: `${color}08`, borderColor: `${color}40` }}>
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${color}15` }}>
                          <i className={`${globalScore < 30 ? 'ri-alarm-warning-line' : globalScore < 50 ? 'ri-lightbulb-flash-line' : globalScore < 70 ? 'ri-rocket-line' : 'ri-trophy-line'} text-3xl`} style={{ color }}></i>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3">{msg.title}</h3>
                        <p className="text-lg text-foreground-600 max-w-2xl mx-auto">{msg.subtitle}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap text-background-50" style={{ backgroundColor: color }}>
                          <i className="ri-calendar-check-line"></i>
                          <span>{msg.cta}</span>
                        </Link>
                        <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-background-50 border-2 border-secondary-300 text-foreground-700 font-semibold rounded-xl hover:bg-background-100 transition-all duration-300 whitespace-nowrap">
                          <i className="ri-briefcase-line"></i>
                          <span>{isFr ? 'Découvrir nos services' : 'Discover our services'}</span>
                        </Link>
                      </div>
                    </div>
                  );
                })()}

                {/* Expert CTA */}
                {config.expertCTA && (
                  <div className="bg-gradient-to-br from-primary-50 to-primary-50 rounded-2xl p-8 md:p-10 mb-8 border-2 border-primary-200">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-star-line text-2xl text-background-50"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground-950 mb-2">{isFr ? config.expertCTA.titleFr : config.expertCTA.titleEn}</h3>
                        <p className="text-foreground-700 text-sm leading-relaxed">{isFr ? config.expertCTA.descriptionFr : config.expertCTA.descriptionEn}</p>
                      </div>
                      <Link to={config.expertCTA.ctaLink} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-background-50 font-semibold rounded-xl hover:bg-primary-600 transition-colors whitespace-nowrap flex-shrink-0">
                        <i className="ri-calendar-check-line"></i>
                        <span>{isFr ? config.expertCTA.ctaFr : config.expertCTA.ctaEn}</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Custom below-results slot */}
                {config.renderBelowResults?.(globalScore, perAxis, isFr)}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  <button onClick={generatePDF} disabled={pdfGenerating} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-foreground-800 to-foreground-950 text-background-50 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 whitespace-nowrap cursor-pointer">
                    {pdfGenerating ? <i className="ri-loader-4-line animate-spin text-xl"></i> : <i className="ri-file-download-line text-xl"></i>}
                    <span>{pdfGenerating ? (isFr ? 'Génération...' : 'Generating...') : isFr ? 'Télécharger mon rapport PDF' : 'Download my PDF report'}</span>
                  </button>
                  {config.comparison && (
                    <button onClick={saveBaseline} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background-50 border-2 border-primary-500 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                      <i className="ri-save-line"></i>
                      <span>{isFr ? 'Sauvegarder comme référence' : 'Save as baseline'}</span>
                    </button>
                  )}
                  <button onClick={() => { setAnswers({}); setCurrentAxisIdx(0); setCurrentQuestionIdx(0); setShowResults(false); setShowLeadForm(false); setSubmitSuccess(false); setShowComparison(false); }} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background-50 border-2 border-primary-500 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                    <i className="ri-refresh-line"></i>
                    <span>{isFr ? 'Refaire le diagnostic' : 'Retake diagnostic'}</span>
                  </button>
                  {config.comparison && baseline && (
                    <button onClick={clearBaseline} className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-background-50 border-2 border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                      <span>{isFr ? 'Effacer la référence' : 'Clear baseline'}</span>
                    </button>
                  )}
                  <Link to="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background-50 border-2 border-secondary-300 text-foreground-600 font-bold rounded-xl hover:bg-background-100 transition-all duration-300 whitespace-nowrap">
                    <i className="ri-arrow-left-line"></i>
                    <span>{isFr ? 'Retour aux outils' : 'Back to tools'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}



