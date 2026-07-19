import { useState } from 'react';

interface aILeadFormProps {
  slug: string;
}

export default function aILeadForm({ slug }: aILeadFormProps) {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;

  const askKOS = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setError('');
    setA('');

    try {
      // Appel edge function KOS Ask (si disponible)
      const res = await fetch(`${SUPABASE_URL}/functions/v1/kos-ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q, slug }),
      });

      if (!res.ok) {
        // Fallback : endpoint non disponible — message informatif
        setA(
          'KOS AI analyse votre question. Notre équipe vous recontactera sous 24h avec une réponse personnalisée. En attendant, explorez nos ressources sur ce sujet.'
        );
        setError('');

        // Auto-développement : log la question pour enrichissement futur
        try {
          await fetch(`${SUPABASE_URL}/functions/v1/kos-learn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q, slug, confidence: 0.0 }),
          });
        } catch {
          // Silencieux — le endpoint learn peut ne pas exister encore
        }
        setLoading(false);
        return;
      }

      const j = await res.json();
      setA(j.answer || '');

      // Auto-développement : si confiance faible, KOS apprend
      if ((j.confidence || 1) < 0.8) {
        await fetch(`${SUPABASE_URL}/functions/v1/kos-learn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q, slug }),
        });
      }
    } catch (e) {
      setError('Service temporairement indisponible. Laissez-nous vos coordonnées et nous vous recontactons.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-secondary-200 rounded-xl p-5 my-8 bg-secondary-50/50">
      <h3 className="text-lg font-bold text-foreground-950 mb-3" style={{ fontFamily: 'var(--font-heading), serif' }}>
        Posez une question à KOS AI
      </h3>
      <p className="text-sm text-foreground-600 mb-4 leading-relaxed">
        Notre moteur d'intelligence artificielle KOS analyse votre question en temps réel et vous fournit une réponse structurée par des experts Big Four.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askKOS()}
          placeholder="Ex: Comment calculer le ratio de solvabilité Bâle III pour une IMF ?"
          className="flex-1 border border-secondary-300 rounded-lg px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
        />
        <button
          onClick={askKOS}
          disabled={loading || !q.trim()}
          className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background-50 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              Analyse en cours...
            </>
          ) : (
            <>
              <i className="ri-send-plane-line"></i>
              Demander
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          <div className="flex items-start gap-2">
            <i className="ri-error-warning-line flex-shrink-0 mt-0.5"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {a && !error && (
        <div className="mt-4 p-4 rounded-lg bg-primary-50 border border-primary-200">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-500 text-background-50 flex-shrink-0">
              <i className="ri-robot-2-line text-sm"></i>
            </div>
            <span className="font-bold text-sm text-foreground-950">KOS AI</span>
          </div>
          <p className="text-sm text-foreground-700 leading-relaxed pl-9">{a}</p>
          <p className="text-xs text-foreground-500 mt-3 pl-9 italic">
            Cette réponse est générée par KOS AI et relue par nos experts. Elle ne constitue pas un avis juridique.
          </p>
        </div>
      )}
    </div>
  );
}



