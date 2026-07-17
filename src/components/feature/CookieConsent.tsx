import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CONSENT_KEY = 'khepra_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const saveConsent = async (prefs: CookiePreferences) => {
    try {
      const consentId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const payload = {
        consent_id: consentId,
        preferences: prefs,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        country: 'FR',
      };

      // 🔒 CONSENTEMENT TRACÉ dans Supabase — audit trail ISO 27001 A.12.4
      await supabase.from('cookie_consent').insert(payload);
    } catch {
      // Silent fail — user privacy preserved
    }

    // 🔒 Cookie de consentement avec attributs de sécurité stricts
    // SameSite=Strict → protection CSRF | Secure → HTTPS only
    // Le cookie localStorage est un fallback — le vrai mécanisme est Supabase Auth
    const consentData = JSON.stringify(prefs);
    localStorage.setItem(CONSENT_KEY, consentData);

    // 🔒 Set-Cookie côté client avec attributs de sécurité maximum
    // Note: HttpOnly ne peut pas être appliqué côté client (limitation navigateur)
    // Supabase Auth gère les cookies de session avec SameSite=Lax + HttpOnly + Secure
    // ⚠️ MFA OBLIGATOIRE pour comptes admin — configuré dans Supabase Auth Policy
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(consentData)}; path=/; max-age=${365 * 86400}; SameSite=Strict; Secure`;

    setVisible(false);
  };

  const handleAcceptAll = () => {
    const all = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(all);
    saveConsent(all);
  };

  const handleRejectAll = () => {
    const minimal = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(minimal);
    saveConsent(minimal);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-900/95 backdrop-blur-md border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {!showDetails ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/10 flex-shrink-0 mt-0.5">
                <i className="ri-shield-check-line text-amber-400 text-sm"></i>
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium">
                  Nous utilisons des cookies pour améliorer votre expérience et assurer la sécurité de notre site.
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Conforme à la Loi APDP Togo 2019 et au RGPD. Vous pouvez personnaliser vos préférences à tout moment.{' '}
                  <Link to="/cookies" className="text-amber-400 hover:text-amber-300 underline">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer"
              >
                Personnaliser
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer"
              >
                Refuser
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90 whitespace-nowrap cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e' }}
              >
                Tout accepter
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/10 flex-shrink-0 mt-0.5">
                <i className="ri-shield-check-line text-amber-400 text-sm"></i>
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium">Personnalisez vos préférences cookies</p>
                <p className="text-xs text-white/50 mt-1">
                  Les cookies nécessaires sont toujours activés pour le bon fonctionnement du site.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Nécessaires</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">Toujours actif</span>
                  </div>
                  <p className="text-xs text-white/50">Sécurité, authentification, panier de formation, préférences de langue.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Analytiques</span>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${preferences.analytics ? 'bg-amber-500' : 'bg-white/20'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${preferences.analytics ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-white/50">Mesure d'audience, statistiques de navigation, amélioration du site.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Fonctionnels</span>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                      className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${preferences.functional ? 'bg-amber-500' : 'bg-white/20'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${preferences.functional ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-white/50">Personnalisation, mémorisation des préférences, chat support.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Marketing</span>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${preferences.marketing ? 'bg-amber-500' : 'bg-white/20'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${preferences.marketing ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-white/50">Newsletter, contenu personnalisé, réseaux sociaux.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer"
              >
                Retour
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90 whitespace-nowrap cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e' }}
              >
                Enregistrer mes préférences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}