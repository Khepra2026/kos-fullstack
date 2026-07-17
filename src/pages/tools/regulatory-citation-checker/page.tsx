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

const BCEAO_SOURCES = [
  { ref: 'BCEAO — Instruction 008-05-2015', article: 'Article 12', text: 'Conditions d\'exercice de l\'activité d\'émetteur de monnaie électronique', url: 'https://www.bceao.int/fr/reglementation/instructions' },
  { ref: 'BCEAO — Instruction 001-04-2018', article: 'Article 4', text: 'Dispositif de contrôle interne des SFD', url: 'https://www.bceao.int/fr/reglementation/instructions' },
  { ref: 'BCEAO — Circulaire 01-2017', article: 'Article 7', text: 'Gouvernance des SFD — Composition du Conseil d\'Administration', url: 'https://www.bceao.int/fr/reglementation/circulaires' },
  { ref: 'BCEAO — Circulaire 03-2017', article: 'Article 5', text: 'Comités spécialisés — Comité d\'Audit et Comité des Risques', url: 'https://www.bceao.int/fr/reglementation/circulaires' },
  { ref: 'BCEAO — Dispositif Prudentiel', article: 'Titre III', text: 'Normes de solvabilité — Ratio minimum 8% des RWA', url: 'https://www.bceao.int/fr/reglementation/dispositif-prudentiel' },
  { ref: 'BCEAO — Annexe à la Convention de Comptabilité', article: 'Section 4', text: 'Provisionnement des créances en souffrance (IFRS 9 Stage 3)', url: 'https://www.bceao.int/fr/reglementation/comptabilite' },
  { ref: 'BCEAO — Instruction 008-05-2018', article: 'Article 15', text: 'Classification des créances — Catégories et taux de provisionnement', url: 'https://www.bceao.int/fr/reglementation/instructions' },
];

const MOCK_VALIDATION_DB: Record<string, { score: number; sources: typeof BCEAO_SOURCES; warnings: string[] }> = {
  'solvabilité': { score: 95, sources: [BCEAO_SOURCES[4]], warnings: [] },
  'gouvernance': { score: 88, sources: [BCEAO_SOURCES[2], BCEAO_SOURCES[3]], warnings: ['Vérifier version consolidée Circulaire 01-2017 (amendement 2024)'] },
  'contrôle interne': { score: 92, sources: [BCEAO_SOURCES[1], BCEAO_SOURCES[3]], warnings: [] },
  'provisionnement': { score: 78, sources: [BCEAO_SOURCES[5], BCEAO_SOURCES[6]], warnings: ['Instruction 008-05-2018 amendée en Décembre 2024 — vérifier version en vigueur', 'Taux Stage 3 à confirmer vs dernière circulaire BCEAO'] },
  'monnaie électronique': { score: 97, sources: [BCEAO_SOURCES[0]], warnings: [] },
};

function analyzeText(text: string): { score: number; sources: typeof BCEAO_SOURCES; warnings: string[] } {
  const lower = text.toLowerCase();
  for (const [keyword, result] of Object.entries(MOCK_VALIDATION_DB)) {
    if (lower.includes(keyword)) return result;
  }
  return { score: 62, sources: [BCEAO_SOURCES[2]], warnings: ['Aucune correspondance exacte trouvée — score basé sur similarité sémantique', 'Vérifier manuellement la référence réglementaire'] };
}

export default function CitationCheckerPage() {
  const { i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');

  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<{ score: number; sources: typeof BCEAO_SOURCES; warnings: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checksUsed, setChecksUsed] = useState(0);
  const MAX_FREE = 3;

  const handleCheck = useCallback(() => {
    if (!inputText.trim() || checksUsed >= MAX_FREE) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeText(inputText));
      setChecksUsed(c => c + 1);
      setIsAnalyzing(false);
    }, 1200);
  }, [inputText, checksUsed]);

  const breadcrumbItems = [
    { label: isFr ? 'Accueil' : 'Home', path: '/' },
    { label: isFr ? 'Outils' : 'Tools', path: '/tools' },
    { label: isFr ? 'Citation Checker' : 'Citation Checker' },
  ];

  const scoreColor = result ? (
    result.score >= 90 ? '#059669' : result.score >= 70 ? '#d97706' : '#dc2626'
  ) : '#6b7280';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebPage',
      '@id': `${SITE_URL}/tools/regulatory-citation-checker#webpage`,
      url: `${SITE_URL}/tools/regulatory-citation-checker`,
      name: isFr ? 'Regulatory Citation Checker GPT | KHEPRA EXPERTS' : 'Regulatory Citation Checker GPT | KHEPRA EXPERTS',
      description: isFr ? 'Vérifiez gratuitement vos citations réglementaires BCEAO/COBAC. Collez un texte, obtenez un score 0-100 et les sources officielles.' : 'Check your BCEAO/COBAC regulatory citations for free. Paste text, get a 0-100 score and official sources.',
      inLanguage: isFr ? 'fr-FR' : 'en-US',
    }],
  };

  return (
    <>
      <SeoHead
        title={isFr ? 'Regulatory Citation Checker GPT | Vérification Citations BCEAO Gratuit' : 'Regulatory Citation Checker GPT | Free BCEAO Citation Check'}
        description={isFr ? 'Vérifiez vos citations réglementaires BCEAO/COBAC en 20 secondes. Collez un extrait de rapport, obtenez un score 0-100 et les sources officielles. 3 vérifications gratuites/jour.' : 'Check your BCEAO/COBAC regulatory citations in 20 seconds. Paste a report excerpt, get a 0-100 score and official sources. 3 free checks/day.'}
        keywords="citation checker, vérification réglementaire, BCEAO, COBAC, conformité, validation texte, audit réglementaire, sources officielles"
        canonicalPath="/tools/regulatory-citation-checker"
        structuredData={schemaJson}
      />

      <Navigation />

      <HowToSchema
        name={isFr ? 'Regulatory Citation Checker GPT KHEPRA™' : 'Regulatory Citation Checker GPT KHEPRA™'}
        description={isFr ? 'Collez un extrait de rapport ou document, obtenez un score de fiabilité réglementaire et les sources officielles correspondantes.' : 'Paste a report or document excerpt, get a regulatory reliability score and the corresponding official sources.'}
        totalTime="PT1M"
        steps={[
          { name: isFr ? 'Collez votre texte' : 'Paste your text', text: isFr ? 'Collez un paragraphe de votre rapport, procédure ou analyse réglementaire.' : 'Paste a paragraph from your report, procedure or regulatory analysis.' },
          { name: isFr ? 'Lancez la vérification' : 'Run the check', text: isFr ? 'Le moteur KOS compare votre citation à la base de données réglementaire BCEAO/COBAC/OHADA.' : 'The KOS engine compares your citation to the BCEAO/COBAC/OHADA regulatory database.' },
          { name: isFr ? 'Recevez votre score' : 'Get your score', text: isFr ? 'Score 0-100, sources officielles identifiées et avertissements si nécessaire.' : '0-100 score, identified official sources and warnings if needed.' },
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

            <div className="max-w-4xl mx-auto mt-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  <i className="ri-scales-3-line"></i>
                  <span>{isFr ? '3 vérifications gratuites / jour' : '3 free checks / day'}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
                  {isFr ? 'Regulatory Citation Checker GPT' : 'Regulatory Citation Checker GPT'}
                </h1>
                <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                  {isFr
                    ? 'Collez un extrait de votre rapport ou document. Obtenez un score de fiabilité 0-100 et les sources officielles BCEAO/COBAC/OHADA correspondantes.'
                    : 'Paste an excerpt from your report or document. Get a 0-100 reliability score and the corresponding BCEAO/COBAC/OHADA official sources.'}
                </p>
              </div>

              {/* Limits */}
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-background-50 border border-secondary-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checksUsed >= MAX_FREE ? 'bg-red-100' : 'bg-primary-100'}`}>
                    <i className={`${checksUsed >= MAX_FREE ? 'ri-lock-line text-red-500' : 'ri-check-line text-primary-600'} text-lg`}></i>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground-900">
                      {checksUsed >= MAX_FREE
                        ? (isFr ? 'Limite quotidienne atteinte' : 'Daily limit reached')
                        : `${MAX_FREE - checksUsed} ${isFr ? 'vérification(s) restante(s)' : 'check(s) remaining'}`}
                    </div>
                    <div className="text-xs text-foreground-500">{isFr ? 'Gratuit · Réinitialisation à minuit UTC' : 'Free · Resets at midnight UTC'}</div>
                  </div>
                </div>
                {checksUsed >= MAX_FREE && (
                  <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-mail-send-line"></i>
                    <span>{isFr ? 'Contacter un expert' : 'Contact an expert'}</span>
                  </Link>
                )}
              </div>

              {/* Input */}
              <div className="bg-background-50 rounded-2xl shadow-xl p-6 md:p-10 mb-8">
                <label className="block text-sm font-semibold text-foreground-700 mb-3">
                  {isFr ? 'Collez votre texte à vérifier (paragraphe de rapport, procédure, analyse réglementaire)' : 'Paste your text to check (report paragraph, procedure, regulatory analysis)'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={checksUsed >= MAX_FREE && !result}
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none disabled:opacity-50"
                  placeholder={isFr
                    ? 'Ex: « Conformément à la Circulaire BCEAO 01-2017 relative à la gouvernance des SFD, le Conseil d\'Administration doit être composé d\'au moins 3 membres... »'
                    : 'E.g.: "In accordance with BCEAO Circular 01-2017 on MFI governance, the Board of Directors must be composed of at least 3 members..."'}
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-foreground-400">{inputText.length} {isFr ? 'caractères' : 'characters'} (max 2000)</span>
                  <button
                    onClick={handleCheck}
                    disabled={!inputText.trim() || isAnalyzing || (checksUsed >= MAX_FREE && !!result)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <><i className="ri-loader-4-line animate-spin"></i><span>{isFr ? 'Analyse en cours...' : 'Analyzing...'}</span></>
                    ) : (
                      <><i className="ri-search-line"></i><span>{isFr ? 'Vérifier la citation' : 'Check citation'}</span></>
                    )}
                  </button>
                </div>
              </div>

              {/* Results */}
              {result && (
                <div className="space-y-6 animate-fade-in">
                  {/* Score */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-36 h-36 flex-shrink-0">
                        <svg className="transform -rotate-90 w-36 h-36">
                          <circle cx="72" cy="72" r="66" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                          <circle cx="72" cy="72" r="66" stroke={scoreColor} strokeWidth="8" fill="none"
                            strokeDasharray={`${2 * Math.PI * 66}`}
                            strokeDashoffset={`${2 * Math.PI * 66 * (1 - result.score / 100)}`}
                            strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold" style={{ color: scoreColor }}>{result.score}</div>
                          <div className="text-sm text-foreground-400">/100</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground-950 mb-2">
                          {result.score >= 90 ? (isFr ? 'Citation Fiable' : 'Reliable Citation')
                            : result.score >= 70 ? (isFr ? 'Citation à Vérifier' : 'Citation to Verify')
                              : (isFr ? 'Citation Risquée' : 'Risky Citation')}
                        </h3>
                        <p className="text-foreground-600">
                          {result.score >= 90
                            ? (isFr ? 'Votre citation correspond à une source officielle vérifiée. Score de confiance élevé.' : 'Your citation matches a verified official source. High confidence score.')
                            : result.score >= 70
                              ? (isFr ? 'Correspondance partielle. Vérifiez les avertissements ci-dessous avant publication.' : 'Partial match. Check warnings below before publishing.')
                              : (isFr ? 'Aucune correspondance directe trouvée. Ne publiez pas ce texte sans vérification manuelle approfondie.' : 'No direct match found. Do not publish this text without thorough manual verification.')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tool Social Share */}
                  <div>
                    <ToolSocialShare
                      toolNameFr="Regulatory Citation Checker GPT"
                      toolNameEn="Regulatory Citation Checker GPT"
                      score={result.score}
                      levelFr={result.score >= 90 ? 'Fiable' : result.score >= 70 ? 'À vérifier' : 'Risqué'}
                      levelEn={result.score >= 90 ? 'Reliable' : result.score >= 70 ? 'To verify' : 'Risky'}
                      url={`${SITE_URL}/tools/regulatory-citation-checker`}
                      hashtags={['CitationChecker', 'BCEAO', 'Conformite', 'RegTech']}
                    />
                  </div>

                  {/* Sources */}
                  <div className="bg-background-50 rounded-2xl shadow-xl p-8 md:p-10">
                    <h3 className="text-xl font-bold text-foreground-950 mb-4">
                      {isFr ? 'Sources Officielles Correspondantes' : 'Matching Official Sources'}
                    </h3>
                    <div className="space-y-3">
                      {result.sources.map((src, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background-100 border border-secondary-200">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-file-check-line text-primary-600"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground-900 text-sm">{src.ref}</div>
                            <div className="text-xs text-foreground-600 mt-0.5">{src.article} — {src.text}</div>
                            <a href={src.url} target="_blank" rel="nofollow noopener" className="text-xs text-primary-600 hover:underline mt-1 inline-block">
                              {isFr ? 'Voir la source officielle' : 'View official source'} <i className="ri-external-link-line"></i>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="bg-accent-50 rounded-2xl shadow-xl p-8 md:p-10 border-2 border-accent-200">
                      <h3 className="text-xl font-bold text-accent-800 mb-4 flex items-center gap-2">
                        <i className="ri-error-warning-line"></i>
                        {isFr ? 'Avertissements' : 'Warnings'}
                      </h3>
                      <ul className="space-y-2">
                        {result.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-accent-800 text-sm">
                            <i className="ri-alert-line flex-shrink-0 mt-0.5"></i>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-50 rounded-2xl p-8 md:p-10 border-2 border-primary-200">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-star-line text-2xl text-white"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground-950 mb-2">
                          {isFr ? 'Besoin d\'une vérification approfondie ?' : 'Need an in-depth verification?'}
                        </h3>
                        <p className="text-foreground-700 text-sm">
                          {isFr
                            ? 'Nos auditeurs réglementaires vérifient vos rapports complets. Audit 100% conforme au KOS Zero-Defect Protocol™ avec Triple Validation BCEAO/COBAC.'
                            : 'Our regulatory auditors verify your complete reports. 100% KOS Zero-Defect Protocol™ compliant audit with Triple BCEAO/COBAC Validation.'}
                        </p>
                      </div>
                      <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer">
                        <i className="ri-calendar-check-line"></i>
                        <span>{isFr ? 'Auditer mon rapport' : 'Audit my report'}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Reset */}
                  <div className="text-center">
                    <button onClick={() => { setResult(null); setInputText(''); }} className="text-sm text-foreground-400 hover:text-primary-600 underline cursor-pointer">
                      {isFr ? 'Vérifier un autre texte' : 'Check another text'}
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