import FinancialDiagnosticForm from './components/FinancialDiagnosticForm';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-amber-400">
            Khepra RegTech Hub
          </h1>
          <p className="text-slate-400 mt-2">
            Plateforme de Conseil Stratégique, d'Ingénierie Financière & Conformité
          </p>
        </header>
        
        <FinancialDiagnosticForm />
      </div>
    </main>
  );
}
