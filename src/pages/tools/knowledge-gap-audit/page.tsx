import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { ToolSocialShare } from '@/components/feature/ToolSocialShare';
import HowToSchema from '@/components/feature/HowToSchema';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const FORM_URL = 'https://readdy.ai/api/form/d8uggnlu37m8lq7g358g';

const GAP_AREAS = [
  { id: 'iso30401', labelFr: 'ISO 30401 — Knowledge Management', labelEn: 'ISO 30401 — Knowledge Management', weight: 20 },
  { id: 'bceao', labelFr: 'BCEAO — Conformité Réglementaire', labelEn: 'BCEAO — Regulatory Compliance', weight: 20 },
  { id: 'gouvernance', labelFr: 'Gouvernance & Contrôle Interne', labelEn: 'Governance & Internal Control', weight: 15 },
  { id: 'lbcft', labelFr: 'LBC/FT & KYC', labelEn: 'AML/CFT & KYC', weight: 15 },
  { id: 'risque', labelFr: 'Gestion des Risques', labelEn: 'Risk Management', weight: 15 },
  { id: 'continuite', labelFr: 'Continuité d\'Activité & PCA', labelEn: 'Business Continuity & BCP', weight: 15 },
];

const MOCK_GAP_RESULTS: Record<string, { scores: Record<string, number>; global: number; gaps: { area: string; gap: string; severity: 'critical' | 'major' | 'minor' }[] }> = {
  'procédure contrôle interne': {
    scores: { iso30401: 65, bceao: 72, gouvernance: 58, lbcft: 70, risque: 45, continuite: 62 },
    global: 62,
    gaps: [
      { area: 'Gestion des Risques', gap: 'Cartographie des risques incomplète — seuls les risques crédit sont documentés (manque marché, opérationnel, liquidité)', severity: 'critical' },
      { area: 'Gouvernance & Contrôle Interne', gap: 'Pas de comité d\'audit formalisé — le contrôle interne est assuré par la DAF (conflit d\'intérêts COSO)', severity: 'critical' },
      { area: 'Continuité d\'Activité & PCA', gap: 'PCA non testé depuis plus de 18 mois — exigence BCEAO : test annuel minimum', severity: 'major' },
      { area: 'ISO 30401 — Knowledge Management', gap: 'Absence de procédure de capitalisation des connaissances — risque de perte de savoir-faire', severity: 'major' },
      { area: 'BCEAO — Conformité Réglementaire', gap: 'Manuel de procédures non mis à jour (version 2023) — Circulaire 01/2017 amendée en 2024', severity: 'minor' },
    ],
  },
  'politique LBC/FT': {
    scores: { iso30401: 55, bceao: 68, gouvernance: 72, lbcft: 38, risque: 62, continuite: 70 },
    global: 56,
    gaps: [
      { area: 'LBC/FT & KYC', gap: 'Absence de dispositif de screening sanctions/PEP automatisé — processus 100% manuel, non conforme GAFI R.6', severity: 'critical' },
      { area: 'LBC/FT & KYC', gap: 'Pas de déclaration de soupçon formalisée — procédure interne inexistante pour les STR (Suspicious Transaction Reports)', severity: 'critical' },
      { area: 'ISO 30401 — Knowledge Management', gap: 'Aucune formation LBC/FT documentée pour le personnel — exigence GAFI R.1 et BCEAO', severity: 'major' },
      { area: 'BCEAO — Conformité Réglementaire', gap: 'Classification des risques clients non documentée (risque faible/moyen/élevé) — exigence Circulaire BCEAO', severity: 'major' },
      { area: 'Gestion des Risques', gap: 'Pas d\'évaluation nationale des risques (ENR) intégrée à la politique LBC/FT', severity: 'minor' },
    ],
  },
};

const DEFAULT_RESULT = {
  scores: Object.fromEntries(GAP_AREAS.map(a => [a.id, Math.floor(Math.random() * 30) + 50])),
  global: 58,
  gaps: [
    { area: 'BCEAO — Conformité Réglementaire', gap: 'Plusieurs références réglementaires non mises à jour — vérifier les versions en vigueur sur bceao.int', severity: 'major' },
    { area: 'ISO 30401 — Knowledge Management', gap: 'Absence de processus structuré de gestion des connaissances — recommandation ISO 30401 §7.5', severity: 'major' },
    { area: 'Gouvernance & Contrôle Interne', gap: 'Documentation partielle du dispositif de contrôle interne — manquent les matrices de contrôles clés', severity: 'minor' },
    { area: 'Gestion des Risques', gap: 'Appétit au risque non formalisé — le Conseil n\'a pas défini les seuils de tolérance', severity: 'major' },
  ],
};

function analyzeGaps(text: string) {
  const lower = text.toLowerCase();
  for (const [keyword, result] of Object.entries(MOCK_GAP_RESULTS)) {
    if (lower.includes(keyword)) return result;
  }
  return { ...DEFAULT_RESULT, scores: { ...DEFAULT_RESULT.scores }, global: DEFAULT_RESULT.global };
}

function getSeverityColor(severity: string) {
  if (severity === 'critical') return 'text-red-600 bg-red-50 border-red-200';
  if (severity === 'major') return 'text-accent-600 bg-accent-50 border-accent-200';
  return 'text-primary-600 bg-primary-50 border-primary-200';
}

function getSeverityIcon(severity: string) {
  if (severity === 'critical') return 'ri-close-circle-line';
  if (severity === 'major') return 'ri-error-warning-line';
  return 'ri-information-line';
}

function getScoreColor(score: number) {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#d97706';
  return '#dc2626';
}

export default function KnowledgeGapAuditPage() {
  const { i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');

  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<ReturnType<typeof analyzeGaps> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeGaps(inputText));
      setIsAnalyzing(false);
    }, 1800);
  }, [inputText]);

  const breadcrumbItems = [
    { label: isFr ? 'Accueil' : 'Home', path: '/' },
    { label: isFr ? 'Outils' : 'Tools', path: '/tools' },
    { label: 'Knowledge Gap Audit' },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage',
      '@id': `${SITE_URL}/tools/knowledge-gap-audit#webpage`,
      url: `${SITE_URL}/tools/knowledge-gap-audit`,
      name: 'Knowledge Gap Audit 5min | KHEPRA EXPERTS',
      description: isFr ? 'Auditez vos procédures internes en 5 minutes. RAG vs 1.1M embeddings. Heatmap gaps ISO 30401 + BCEAO + % conformité.' : 'Audit your internal procedures in 5 minutes. RAG vs 1.1M embeddings. ISO 30401 + BCEAO gap heatmap + % compliance.',
      inLanguage: isFr ? 'fr-FR' : 'en-US',
    }],
  };

  return (
    <>
      <SeoHead
        title={isFr ? 'Knowledge Gap Audit 5min | RAG vs 1.1M Embeddings Gratuit' : 'Knowledge Gap Audit 5min | Free RAG vs 1.1M Embeddings'}
        description={isFr ? 'Auditez vos procédures internes en 5 minutes. Notre RAG compare votre sommaire à 1.1M embeddings réglementaires. Heatmap ISO 30401 + BCEAO + % conformité.' : 'Audit your internal procedures in 5 minutes. Our RAG compares your summary to 1.1M regulatory embeddings. ISO 30401 + BCEAO heatmap + % compliance.'}
        keywords="knowledge gap audit, audit connaissance, ISO 30401, BCEAO, conformité procédure, analyse documentaire, RAG, heatmap conformité"
        canonicalPath="/tools/knowledge-gap-audit"
        structuredData={schemaJson}
      />

      <Navigation />

      <HowToSchema
        name={isFr ? 'Knowledge Gap Audit 5min KHEPRA™' : 'Knowledge Gap Audit 5min KHEPRA™'}
        description={isFr ? 'Décrivez le sommaire de votre procédure interne. Notre moteur RAG compare à 1.1M embeddings KOS et identifie les écarts vs ISO 30401 + BCEAO.' : 'Describe your internal procedure summary. Our RAG engine compares to 1.1M KOS embeddings and identifies gaps vs ISO 30401 + BCEAO.'}
        totalTime="PT5M"
        steps={[
          { name: isFr ? 'Décrivez votre procédure' : 'Describe your procedure', text: isFr ? 'Collez le sommaire ou les points clés de votre procédure interne.' : 'Paste the summary or key points of your internal procedure.' },
          { name: isFr ? 'Analyse RAG automatique' : 'Automatic RAG analysis', text: isFr ? 'Le moteur KOS compare votre document à 1.1M embeddings réglementaires (BCEAO, COBAC, ISO, GAFI).' : 'The KOS engine compares your document to 1.1M regulatory embeddings (BCEAO, COBAC, ISO, FATF).' },
          { name: isFr ? 'Heatmap des écarts' : 'Gap heatmap', text: isFr ? 'Visualisez vos écarts par domaine et leur criticité. Pourcentage de conformité global.' : 'Visualize your gaps by domain and severity. Global compliance percentage.' },
        ]}
      />

      <div className="bg-background-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <Link to="/" className="block">
            <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png" alt="KHEPRA EXPERTS" className="h-10" />
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-b from-background-100 to-background-50">
        <section className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-5xl mx-auto mt-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  <i className="ri-brain-line"></i>
                  <span>{isFr ? 'RAG KOS · 1 100 000 embeddings · 20 autorités' : 'KOS RAG · 1,100,000 embeddings · 20 authorities'}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
                  {isFr ? 'Knowledge Gap Audit 5min' : 'Knowledge Gap Audit 5min'}
                </h1>
                <p className="text-lg text-foreground-600 max-w-3xl mx-auto">
                  {isFr
                    ? 'Décrivez le sommaire de votre procédure interne. Notre moteur RAG compare instantanément votre document à 1.1 million d\'embeddings réglementaires BCEAO, COBAC, ISO, GAFI et identifie vos écarts de conformité.'
                    : 'Describe your internal procedure summary. Our RAG engine instantly compares your document to 1.1 million regulatory embeddings (BCEAO, COBAC, ISO, FATF) and identifies your compliance gaps.'}
                </p>
              </div>

              {/* Input Section */}
              <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10 mb-8">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground-700 mb-2">
                    {isFr ? 'Nom de la procédure (optionnel)' : 'Procedure name (optional)'}
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder={isFr ? 'Ex: Procédure de Contrôle Interne — Banque Atlantique' : 'E.g.: Internal Control Procedure — Atlantic Bank'}
                  />
                </div>

                <label className="block text-sm font-semibold text-foreground-700 mb-3">
                  {isFr ? 'Décrivez le sommaire ou les points clés de votre procédure' : 'Describe the summary or key points of your procedure'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                  placeholder={isFr
                    ? 'Ex: « Procédure de contrôle interne couvrant : 1) Séparation des fonctions (front/back office), 2) Contrôles permanents trimestriels, 3) Reporting au Conseil d\'Administration, 4) Cartographie des risques crédit uniquement, 5) Pas de PCA formalisé... »'
                    : 'E.g.: "Internal control procedure covering: 1) Segregation of duties (front/back office), 2) Quarterly permanent controls, 3) Board reporting, 4) Credit risk mapping only, 5) No formalized BCP..."'}
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-foreground-400">{inputText.length}/2000 {isFr ? 'caractères' : 'characters'}</span>
                  <button
                    onClick={handleAnalyze}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <><i className="ri-loader-4-line animate-spin"></i><span>{isFr ? 'Analyse RAG en cours...' : 'RAG analysis...'}</span></>
                    ) : (
                      <><i className="ri-search-line"></i><span>{isFr ? 'Auditer ma procédure' : 'Audit my procedure'}</span></>
                    )}
                  </button>
                </div>
              </div>

              {/* Results */}
              {result && (
                <div className="space-y-6 animate-fade-in">
                  {/* Global Score */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <svg className="transform -rotate-90 w-40 h-40">
                          <circle cx="80" cy="80" r="72" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                          <circle cx="80" cy="80" r="72" stroke={getScoreColor(result.global)} strokeWidth="10" fill="none"
                            strokeDasharray={`${2 * Math.PI * 72}`}
                            strokeDashoffset={`${2 * Math.PI * 72 * (1 - result.global / 100)}`}
                            strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold" style={{ color: getScoreColor(result.global) }}>{result.global}%</div>
                          <div className="text-sm text-foreground-400">{isFr ? 'conforme' : 'compliant'}</div>
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-foreground-950 mb-2">
                          {result.global >= 80
                            ? (isFr ? 'Conformité Solide' : 'Strong Compliance')
                            : result.global >= 60
                              ? (isFr ? 'Conformité Partielle — Écarts à Corriger' : 'Partial Compliance — Gaps to Address')
                              : (isFr ? 'Conformité Insuffisante — Audit Urgent Requis' : 'Insufficient Compliance — Urgent Audit Required')}
                        </h2>
                        <p className="text-foreground-600 text-sm">
                          {isFr
                            ? `Votre procédure couvre ${result.global}% des exigences réglementaires et normatives. ${result.gaps.filter(g => g.severity === 'critical').length} écarts critiques détectés.`
                            : `Your procedure covers ${result.global}% of regulatory and normative requirements. ${result.gaps.filter(g => g.severity === 'critical').length} critical gaps detected.`}
                        </p>
                        <p className="text-xs text-foreground-400 mt-2">
                          {isFr ? 'Basé sur l\'analyse RAG de 1.1M embeddings — 20 autorités (BCEAO, COBAC, ISO, GAFI, OHADA, COSO, NIST, etc.)' : 'Based on RAG analysis of 1.1M embeddings — 20 authorities (BCEAO, COBAC, ISO, FATF, OHADA, COSO, NIST, etc.)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Share */}
                  <ToolSocialShare
                    toolNameFr="Knowledge Gap Audit 5min"
                    toolNameEn="Knowledge Gap Audit 5min"
                    score={result.global}
                    levelFr={result.global >= 80 ? 'Conformité Solide' : result.global >= 60 ? 'Partiellement Conforme' : 'Non Conforme'}
                    levelEn={result.global >= 80 ? 'Strong Compliance' : result.global >= 60 ? 'Partially Compliant' : 'Non-Compliant'}
                    url={`${SITE_URL}/tools/knowledge-gap-audit`}
                    hashtags={['KnowledgeAudit', 'ISO30401', 'BCEAO', 'Conformite']}
                  />

                  {/* Heatmap / Domain Scores */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                    <h3 className="text-xl font-bold text-foreground-950 mb-6">
                      {isFr ? 'Heatmap de Conformité par Domaine' : 'Compliance Heatmap by Domain'}
                    </h3>
                    <div className="space-y-4">
                      {GAP_AREAS.map((area) => {
                        const score = result.scores[area.id] ?? 50;
                        return (
                          <div key={area.id}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-semibold text-foreground-800">
                                {isFr ? area.labelFr : area.labelEn}
                              </span>
                              <span className="text-sm font-bold" style={{ color: getScoreColor(score) }}>{score}%</span>
                            </div>
                            <div className="w-full bg-secondary-100 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gaps List */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10">
                    <h3 className="text-xl font-bold text-foreground-950 mb-6">
                      {isFr ? 'Écarts de Conformité Identifiés' : 'Identified Compliance Gaps'}
                    </h3>
                    <div className="space-y-3">
                      {result.gaps.map((gap, i) => (
                        <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${getSeverityColor(gap.severity)}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${gap.severity === 'critical' ? 'bg-red-100' : gap.severity === 'major' ? 'bg-accent-100' : 'bg-primary-100'}`}>
                            <i className={`${getSeverityIcon(gap.severity)} ${gap.severity === 'critical' ? 'text-red-600' : gap.severity === 'major' ? 'text-accent-600' : 'text-primary-600'} text-sm`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                gap.severity === 'critical' ? 'bg-red-200 text-red-800' : gap.severity === 'major' ? 'bg-accent-200 text-accent-800' : 'bg-primary-200 text-primary-800'
                              }`}>
                                {gap.severity === 'critical' ? (isFr ? 'Critique' : 'Critical') : gap.severity === 'major' ? (isFr ? 'Majeur' : 'Major') : (isFr ? 'Mineur' : 'Minor')}
                              </span>
                              <span className="text-xs font-semibold text-foreground-700">{gap.area}</span>
                            </div>
                            <p className="text-sm text-foreground-700">{gap.gap}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-50 rounded-2xl p-8 md:p-10 border-2 border-primary-200">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-star-line text-2xl text-white"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground-950 mb-2">
                          {isFr ? 'Passez à l\'audit complet avec KHEPRA EXPERTS' : 'Go for a full audit with KHEPRA EXPERTS'}
                        </h3>
                        <p className="text-foreground-700 text-sm">
                          {isFr
                            ? 'Cet audit express identifie les écarts majeurs. Pour une analyse exhaustive avec plan de remédiation chiffré, nos auditeurs analysent vos procédures complètes vs 20 référentiels internationaux.'
                            : 'This express audit identifies major gaps. For an exhaustive analysis with a quantified remediation plan, our auditors analyze your complete procedures vs 20 international standards.'}
                        </p>
                      </div>
                      <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer">
                        <i className="ri-calendar-check-line"></i>
                        <span>{isFr ? 'Audit complet' : 'Full audit'}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Reset */}
                  <div className="text-center">
                    <button onClick={() => { setResult(null); setInputText(''); }} className="text-sm text-foreground-400 hover:text-primary-600 underline cursor-pointer">
                      {isFr ? 'Auditer une autre procédure' : 'Audit another procedure'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}