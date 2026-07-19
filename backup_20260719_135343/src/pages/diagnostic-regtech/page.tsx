import { useState, useCallback, useEffect } from 'react';
import QuestionnaireForm from '';
import ResultsDashboard from '';
import { useRegtechDiagnostic } from '@/hooks/useRegtechDiagnostic';

type PageStep = 'form' | 'loading' | 'results' | 'error';

export default function DiagnosticRegtechPage() {
  const [step, setStep] = useState<PageStep>('form');
  const { loading, error, result, runDiagnosticFromForm } = useRegtechDiagnostic();

  const handleFormComplete = useCallback(async (
    countryCode: string,
    sectorCode: string,
    revenueValue: string,
    employeeValue: string,
    creationYearValue: string,
    formData: Record<string, string | string[]>,
  ) => {
    setStep('loading');
    try {
      await runDiagnosticFromForm(countryCode, sectorCode, revenueValue, employeeValue, creationYearValue);
      setStep('results');
    } catch {
      setStep('error');
    }
  }, [runDiagnosticFromForm]);

  const handleReset = useCallback(() => {
    setStep('form');
  }, []);

  useEffect(() => {
    document.title = 'Diagnostic Réglementaire Gratuit — KHEPRA RegTech | Score Conformité PME Afrique';
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background-50">
        {step === 'form' && (
          <QuestionnaireForm onComplete={handleFormComplete} />
        )}
        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-foreground-700 text-lg font-medium">Analyse de votre profil réglementaire en cours...</p>
            <p className="text-foreground-500 text-sm">Interrogation des bases BCEAO, OHADA, COBAC et GAFI</p>
          </div>
        )}
        {step === 'results' && result && (
          <ResultsDashboard result={result} onRestart={handleReset} />
        )}
        {step === 'error' && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <i className="ri-error-warning-line text-5xl text-red-500" />
            <p className="text-foreground-700 text-lg font-medium">Une erreur est survenue</p>
            <p className="text-foreground-500 text-sm">{error || 'Erreur inconnue'}</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-primary-500 text-background-50 rounded-lg font-medium hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </>
  );
}



