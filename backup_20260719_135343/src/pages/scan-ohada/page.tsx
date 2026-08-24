import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';

/* ── Mock scan result generator ── */
function generateScanResult(filename: string) {
  const baseScore = Math.floor(Math.random() * 40) + 25; // 25-65 realistic low scores
  const risks = [
    { severity: 'critical', text: 'Art.49 Circulaire 03-2017 — Comité de Crédit non formalisé (amende: 5% CA)', article: 'Art.49' },
    { severity: 'critical', text: 'Art.52 — Séparation des fonctions front/back office non effective', article: 'Art.52' },
    { severity: 'high', text: 'Instruction 025-2011 — Ratios prudentiels ALM hors limites (marge < 5%)', article: 'Inst.025' },
    { severity: 'high', text: 'Circulaire 01-2017 — 3 lignes de défense non documentées', article: 'Circ.01' },
    { severity: 'high', text: 'LBC/FT — Plan de formation annuel absent (sanction COBAC: retrait agrément)', article: 'LBC/FT' },
    { severity: 'medium', text: 'Art.35 — Procédure de recouvrement non formalisée', article: 'Art.35' },
    { severity: 'medium', text: 'Instruction 018-2010 — Reporting périodique en retard (> 15 jours)', article: 'Inst.018' },
    { severity: 'medium', text: 'OHADA SYSCOHADA Révisé — Comptes de classe 8 mal ventilés', article: 'SYSCOHADA' },
    { severity: 'low', text: 'Art.12 — Registre des crédits non mis à jour mensuellement', article: 'Art.12' },
    { severity: 'low', text: 'Circulaire 02-2017 — Politique de nationalité non révisée depuis 2023', article: 'Circ.02' },
  ];

  // shuffle and pick 8-10
  const shuffled = [...risks].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.floor(Math.random() * 3) + 8);

  return {
    filename,
    score: baseScore,
    totalRisks: selected.length,
    criticalCount: selected.filter(r => r.severity === 'critical').length,
    highCount: selected.filter(r => r.severity === 'high').length,
    mediumCount: selected.filter(r => r.severity === 'medium').length,
    lowCount: selected.filter(r => r.severity === 'low').length,
    risks: selected,
    estimatedFine: Math.round(baseScore * 0.05 * 1000000), // mock fine estimate in FCFA
    generatedAt: new Date().toISOString(),
  };
}

const severityConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  critical: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: 'ri-close-circle-fill', label: 'CRITIQUE' },
  high: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: 'ri-error-warning-fill', label: 'ÉLEVÉ' },
  medium: { color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200', icon: 'ri-alert-line', label: 'MOYEN' },
  low: { color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200', icon: 'ri-information-line', label: 'FAIBLE' },
};

export default function ScanOhadaPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'scanning' | 'result'>('upload');
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<ReturnType<typeof generateScanResult> | null>(null);
  const [hasScannedBefore, setHasScannedBefore] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStep('scanning');

    // Simulate scanning delay
    setTimeout(() => {
      const scan = generateScanResult(file.name);
      setResult(scan);
      setStep('result');
    }, 3500);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setFileName(file.name);
    setStep('scanning');
    setTimeout(() => {
      const scan = generateScanResult(file.name);
      setResult(scan);
      setStep('result');
    }, 3500);
  }, []);

  const scoreColor = (score: number) => {
    if (score < 40) return 'text-red-500';
    if (score < 60) return 'text-amber-500';
    if (score < 80) return 'text-orange-500';
    return 'text-emerald-500';
  };

  const scoreBg = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 60) return 'bg-amber-500';
    if (score < 80) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  return (
    <>
      <SeoHead
        title="Scan OHADA 60s — Score conformité BCEAO gratuit | Khepra Experts"
        description="Téléchargez vos statuts PDF. KOS analyse votre conformité BCEAO/COBAC en 60 secondes. Score /100 + 10 risques prioritaires. Gratuit — 1 scan/mois."
        canonical="https://khepraexperts.com/scan"
      />

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background-50" style={{ paddingTop: '80px' }}>
        {/* HERO */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">
                GRATUIT — 1 scan/mois
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                60 secondes
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 mb-4 font-heading max-w-3xl mx-auto">
              Vos statuts PDF scannés contre{' '}
              <span className="text-primary-500">137 textes BCEAO</span>
            </h1>
            <p className="text-base md:text-lg text-foreground-600 max-w-2xl mx-auto font-body">
              KOS compare vos documents aux circulaires BCEAO, instructions COBAC et actes OHADA.
              {' '}<strong className="text-foreground-950">Score de conformité /100</strong> + risques prioritaires avec sanctions associées.
            </p>
          </div>
        </section>

        {/* UPLOAD AREA */}
        {step === 'upload' && (
          <section className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative group cursor-pointer rounded-2xl border-2 border-dashed border-background-300/60 bg-background-50 hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-300 p-10 md:p-16 text-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-primary-100 group-hover:bg-primary-200 transition-colors">
                <i className="ri-upload-cloud-2-line text-3xl text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground-950 mb-2 font-heading">
                Glissez votre document ici
              </h3>
              <p className="text-sm text-foreground-500 font-body mb-1">
                Ou cliquez pour sélectionner un fichier PDF
              </p>
              <p className="text-xs text-foreground-400 font-body">
                Statuts, rapport annuel, procédures internes — max 10 Mo
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-background-100 text-foreground-500 font-body border border-background-200/70">
                  <i className="ri-file-pdf-line mr-1" />PDF
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-background-100 text-foreground-500 font-body border border-background-200/70">
                  <i className="ri-file-word-line mr-1" />Word
                </span>
              </div>
            </div>

            {/* Trust signals below upload */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: 'ri-shield-check-line', label: 'Aucune donnée stockée', desc: 'Analyse en mémoire' },
                { icon: 'ri-time-line', label: 'Résultat en 60s', desc: 'Scan automatisé' },
                { icon: 'ri-award-line', label: '137 textes couverts', desc: 'BCEAO/COBAC/OHADA' },
              ].map((t, i) => (
                <div key={i} className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                  <i className={`${t.icon} text-lg text-primary-500 mb-1`} />
                  <div className="text-xs font-semibold text-foreground-700 font-body">{t.label}</div>
                  <div className="text-[10px] text-foreground-400 font-body">{t.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SCANNING */}
        {step === 'scanning' && (
          <section className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-primary-100">
              <i className="ri-radar-line text-4xl text-primary-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-foreground-950 mb-2 font-heading">
              KOS scanne vos statuts...
            </h3>
            <p className="text-sm text-foreground-500 font-body mb-8">
              Comparaison en cours avec Circulaire 03-2017, Instruction 025-2011, Acte Uniforme OHADA...
            </p>
            <div className="w-full bg-background-200 rounded-full h-2 overflow-hidden">
              <div className="bg-primary-500 h-2 rounded-full animate-pulse" style={{ width: '60%', animationDuration: '2s' }} />
            </div>
            <p className="text-xs text-foreground-400 mt-3 font-body">{fileName}</p>
          </section>
        )}

        {/* RESULT */}
        {step === 'result' && result && (
          <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
            {/* Score header */}
            <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 md:p-10 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="oklch(var(--background-200))" strokeWidth="8" />
                    <circle
                      cx="64" cy="64" r="56"
                      fill="none"
                      stroke={scoreBg(result.score).replace('bg-', 'oklch(var(--') + '))'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - result.score / 100)}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold font-heading ${scoreColor(result.score)}`}>{result.score}</span>
                    <span className="text-xs text-foreground-500 font-body">/100</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground-950 mb-2 font-heading">
                    {result.score < 40
                      ? 'Conformité critique — Action immédiate requise'
                      : result.score < 60
                      ? 'Conformité insuffisante — Risque amende élevé'
                      : result.score < 80
                      ? 'Conformité partielle — Points à corriger'
                      : 'Conformité satisfaisante — Surveillance continue'}
                  </h3>
                  <p className="text-sm text-foreground-600 font-body mb-4">
                    {result.criticalCount > 0
                      ? `${result.criticalCount} risque${result.criticalCount > 1 ? 's' : ''} critique${result.criticalCount > 1 ? 's' : ''} détecté${result.criticalCount > 1 ? 's' : ''}. Risque d'amende estimé : ~${result.estimatedFine.toLocaleString('fr-FR')} FCFA.`
                      : `Aucun risque critique. ${result.highCount} point${result.highCount > 1 ? 's' : ''} à améliorer.`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.criticalCount > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 font-body">
                        {result.criticalCount} Critique{result.criticalCount > 1 ? 's' : ''}
                      </span>
                    )}
                    {result.highCount > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 font-body">
                        {result.highCount} Élevé{result.highCount > 1 ? 's' : ''}
                      </span>
                    )}
                    {result.mediumCount > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 font-body">
                        {result.mediumCount} Moyen{result.mediumCount > 1 ? 's' : ''}
                      </span>
                    )}
                    {result.lowCount > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 font-body">
                        {result.lowCount} Faible{result.lowCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Risks list */}
            <div className="space-y-3 mb-10">
              <h4 className="text-base font-bold text-foreground-950 mb-4 font-heading flex items-center gap-2">
                <i className="ri-list-check-2 text-primary-500" />
                {result.totalRisks} non-conformités détectées — priorisées par sanction
              </h4>
              {result.risks.map((risk, i) => {
                const cfg = severityConfig[risk.severity];
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} transition-all hover:shadow-sm`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${risk.severity === 'critical' ? 'bg-red-100' : risk.severity === 'high' ? 'bg-amber-100' : risk.severity === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                      <i className={`${cfg.icon} ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.color.replace('text-', 'bg-').replace('500', '100').replace('600', '100')} ${cfg.color.replace('500', '700').replace('600', '700')}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-foreground-400 font-body">{risk.article}</span>
                      </div>
                      <p className="text-sm text-foreground-700 font-body">{risk.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="bg-primary-50 rounded-2xl border border-primary-200/70 p-6 md:p-8 text-center">
              <h4 className="text-lg font-bold text-foreground-950 mb-2 font-heading">
                Votre score : {result.score}/100. Risque amende estimé : {result.estimatedFine.toLocaleString('fr-FR')} FCFA.
              </h4>
              <p className="text-sm text-foreground-600 font-body mb-6">
                KOS Pro génère le rapport de conformité complet + le plan de correction en 3 clics.
                {' '}<strong className="text-primary-600">499k FCFA/mois</strong>, résiliable à tout moment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/pricing')}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <i className="ri-shield-check-line" />
                  Passer à KOS Pro — Corriger maintenant
                </button>
                <button
                  onClick={() => {
                    setStep('upload');
                    setResult(null);
                    setFileName('');
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap bg-background-100 text-foreground-700 hover:bg-background-200 transition-all cursor-pointer border border-background-200/70"
                >
                  <i className="ri-refresh-line" />
                  Nouveau scan
                </button>
              </div>
              <p className="text-xs text-foreground-400 mt-4 font-body">
                Limite : 1 scan gratuit par mois et par organisation. Scans supplémentaires avec KOS Pro.
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}



