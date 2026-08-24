import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { grantKOSAccess, verifyKOSPassword, verifyKOSSecretKey } from '@/components/feature/authGuard';

export default function accessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Vérifier immédiatement si une clé secrète est passée dans l'URL
  const secretKey = searchParams.get('kos_key');
  if (secretKey && verifyKOSSecretKey(secretKey) && !success) {
    grantKOSAccess();
    // Nettoyer l'URL
    window.history.replaceState({}, document.title, '/kos-access');
    setSuccess(true);
    setTimeout(() => navigate('/kos-dashboard'), 1500);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (verifyKOSPassword(password)) {
      grantKOSAccess();
      setSuccess(true);
      setTimeout(() => navigate('/kos-dashboard'), 1500);
    } else {
      setError('Mot de passe incorrect. Accès refusé.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-50 px-4">
      <div className="w-full max-w-md bg-background-100 rounded-lg border border-background-200 p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-keyhole-line text-primary-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground-900 mb-2">
            Accès KOS Interne
          </h1>
          <p className="text-sm text-foreground-600">
            Portail d'accès aux modules et dashboards internes du KHEPRA Operating System.
          </p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-xl" />
            </div>
            <p className="text-foreground-800 font-medium mb-1">Accès autorisé</p>
            <p className="text-sm text-foreground-500">Redirection vers le dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="kos-access-password" className="block text-sm font-medium text-foreground-700 mb-1.5">
                Mot de passe
              </label>
              <input
                id="kos-access-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border border-background-300 bg-background-50 text-foreground-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                placeholder="••••••••••••••"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-md bg-primary-500 text-background-50 text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Accéder à l'espace KOS
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-background-200 space-y-3">
          <p className="text-xs text-foreground-500">
            Cet espace est réservé aux collaborateurs et partenaires KHEPRA. Si vous avez besoin d'un accès,{' '}
            <a href="/contact/" className="text-primary-600 hover:underline">
              contactez-nous
            </a>.
          </p>
          <p className="text-xs text-foreground-400">
            L'accès reste valide pendant 2 heures. Vous pouvez aussi utiliser une{' '}
            <a href="/kos-access?kos_key=KhepraOS2026Secret" className="text-primary-600 hover:underline">
              URL secrète
            </a>{' '}
            pour un accès direct.
          </p>
        </div>
      </div>
    </div>
  );
}



