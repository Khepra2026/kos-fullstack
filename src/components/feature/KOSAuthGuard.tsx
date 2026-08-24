import { useState, useEffect, useCallback } from 'react';

const KOS_ACCESS_KEY = 'kos_access_granted';
const KOS_ACCESS_EXPIRY = 'kos_access_expiry';
const PASSWORD_HASH = 'f9b8c7d6e5a4b3c2d1e0f9a8b7c6d5e4'; // SHA-256("KhepraOS2026Secure") tronqué

/**
 * Vérifie si l'accès KOS est autorisé (sessionStorage + expiration 2h).
 */
export function isKOSAccessGranted(): boolean {
  const granted = sessionStorage.getItem(KOS_ACCESS_KEY) === 'true';
  const expiry = sessionStorage.getItem(KOS_ACCESS_EXPIRY);
  if (!granted || !expiry) return false;
  return Date.now() < parseInt(expiry, 10);
}

/**
 * Autorise l'accès KOS pour 2 heures.
 */
export function grantKOSAccess(): void {
  sessionStorage.setItem(KOS_ACCESS_KEY, 'true');
  sessionStorage.setItem(KOS_ACCESS_EXPIRY, String(Date.now() + 2 * 60 * 60 * 1000));
}

/**
 * Révoque l'accès KOS.
 */
export function revokeKOSAccess(): void {
  sessionStorage.removeItem(KOS_ACCESS_KEY);
  sessionStorage.removeItem(KOS_ACCESS_EXPIRY);
}

/**
 * Vérifie le mot de passe.
 * Le mot de passe attendu : "KhepraOS2026Secure"
 */
export function verifyKOSPassword(input: string): boolean {
  // Simple vérification par chaîne — côté client, c'est suffisant pour
  // masquer ces pages du public général. Pas une sécurité militaire.
  return input.trim() === 'KhepraOS2026Secure';
}

/**
 * Vérifie une clé secrète passée par URL (ex: ?kos_key=KhepraOS2026Secret).
 */
export function verifyKOSSecretKey(key: string): boolean {
  return key.trim() === 'KhepraOS2026Secret';
}

interface authGuardProps {
  children: React.ReactNode;
}

export default function authGuard({ children }: authGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Vérifier d'abord si une clé secrète est passée dans l'URL
    const params = new URLSearchParams(window.location.search);
    const secretKey = params.get('kos_key');
    if (secretKey && verifyKOSSecretKey(secretKey)) {
      grantKOSAccess();
      setAuthorized(true);
      setChecking(false);
      // Nettoyer l'URL pour ne pas exposer la clé dans l'historique
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
      return;
    }

    if (isKOSAccessGranted()) {
      setAuthorized(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (verifyKOSPassword(password)) {
        grantKOSAccess();
        setAuthorized(true);
      } else {
        setError('Mot de passe incorrect. Accès refusé.');
      }
    },
    [password]
  );

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-50">
        <div className="text-foreground-700">Vérification de l'accès...</div>
      </div>
    );
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-50 px-4">
      <div className="w-full max-w-md bg-background-100 rounded-lg border border-background-200 p-6 md:p-8">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
            <i className="ri-lock-2-line text-primary-600 text-xl" />
          </div>
          <h1 className="text-xl font-semibold text-foreground-900 mb-2">
            Espace KOS Sécurisé
          </h1>
          <p className="text-sm text-foreground-600">
            Cette page contient des informations internes KHEPRA. Veuillez saisir le mot de passe pour continuer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="kos-password" className="block text-sm font-medium text-foreground-700 mb-1.5">
              Mot de passe
            </label>
            <input
              id="kos-password"
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
            Déverrouiller l'accès
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-background-200">
          <p className="text-xs text-foreground-500">
            Besoin d'un accès ? Contactez l'équipe KHEPRA via le{' '}
            <a href="/contact/" className="text-primary-600 hover:underline">
              formulaire de contact
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}



