import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

/**
 * ExitIntentLeadMagnet — Popup de conversion avancée
 * 
 * Stratégie de conversion multicanal :
 * 1. Exit Intent : Détection souris quittant la fenêtre → popup immédiat
 * 2. Scroll Trigger : Après 50% de scroll → popup différé
 * 3. Time Delay : Après 45 secondes sans action → popup discret
 * 4. Inactivité : 3 minutes d'inactivité → rappel
 * 
 * Optimisé pour la conversion de leads qualifiés avec :
 * - Proposition de valeur immédiate (diagnostic gratuit)
 * - Preuve sociale (nombre d'utilisateurs, taux de succès)
 * - Urgence douce (offre limitée dans le temps)
 * - Double CTA (primaire + secondaire)
 */

interface LeadMagnetOffer {
  id: string;
  title: string;
  subtitle: string;
  toolSlug: string;
  icon: string;
  accentColor: string;
  timeMinutes: string;
  usersCount?: string;
  successRate?: string;
}

interface ExitIntentLeadMagnetProps {
  /** Offre à afficher */
  offer: LeadMagnetOffer;
  /** Activer le déclencheur exit intent */
  enableExitIntent?: boolean;
  /** Activer le déclencheur scroll */
  enableScrollTrigger?: boolean;
  /** Activer le déclencheur time delay */
  enableTimeDelay?: boolean;
  /** Pourcentage de scroll déclencheur (défaut: 50) */
  scrollThreshold?: number;
  /** Délai en secondes avant déclenchement automatique (défaut: 45) */
  timeDelay?: number;
  /** Ne pas afficher avant X secondes */
  minTimeOnPage?: number;
}

export default function ExitIntentLeadMagnet({
  offer,
  enableExitIntent = true,
  enableScrollTrigger = false,
  enableTimeDelay = false,
  scrollThreshold = 80,
  timeDelay = 120,
  minTimeOnPage = 30,
}: ExitIntentLeadMagnetProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [entryTime] = useState(Date.now());
  const triggeredRef = useRef(false);

  const showPopup = useCallback(() => {
    if (triggeredRef.current || hasBeenShown) return;
    // Vérifier temps minimum sur la page
    if (Date.now() - entryTime < minTimeOnPage * 1000) return;
    triggeredRef.current = true;
    setIsVisible(true);
  }, [hasBeenShown, entryTime, minTimeOnPage]);

  // Exit Intent Detection — uniquement après minTimeOnPage
  useEffect(() => {
    if (!enableExitIntent) return;

    let canTrigger = false;
    const minTimer = setTimeout(() => {
      canTrigger = true;
    }, minTimeOnPage * 1000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!canTrigger) return;
      // Détecter sortie par le haut (desktop uniquement)
      if (e.clientY <= 0 && e.relatedTarget === null) {
        showPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(minTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableExitIntent, showPopup, minTimeOnPage]);

  // Scroll Trigger Detection — uniquement après minTimeOnPage
  useEffect(() => {
    if (!enableScrollTrigger) return;

    let canTrigger = false;
    const minTimer = setTimeout(() => {
      canTrigger = true;
    }, minTimeOnPage * 1000);

    const handleScroll = () => {
      if (!canTrigger) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return; // pas de scroll possible
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      if (scrollPercent >= scrollThreshold) {
        showPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableScrollTrigger, scrollThreshold, showPopup, minTimeOnPage]);

  // Time Delay Detection — uniquement après minTimeOnPage
  useEffect(() => {
    if (!enableTimeDelay) return;

    const totalDelay = Math.max(timeDelay, minTimeOnPage) * 1000;
    const timer = setTimeout(() => {
      showPopup();
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [enableTimeDelay, timeDelay, showPopup, minTimeOnPage]);

  const handleClose = () => {
    setIsVisible(false);
    setHasBeenShown(true);
  };

  const handleNavigate = () => {
    setIsVisible(false);
    setHasBeenShown(true);
    navigate(offer.toolSlug);
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Popup Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300 my-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
          aria-label={isEn ? 'Close' : 'Fermer'}
        >
          <i className="ri-close-line text-gray-500" />
        </button>

        {/* Header gradient */}
        <div
          className="h-3 w-full"
          style={{ background: `linear-gradient(90deg, ${offer.accentColor}, ${offer.accentColor}cc, ${offer.accentColor})` }}
        />

        <div className="p-6 md:p-8">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: `${offer.accentColor}15`, color: offer.accentColor, border: `1px solid ${offer.accentColor}25` }}
            >
              <i className="ri-gift-line" />
              {isEn ? 'Free Diagnostic' : 'Diagnostic Gratuit'}
            </div>
            <span className="text-xs text-gray-400">{offer.timeMinutes}</span>
          </div>

          {/* Title */}
          <h3
            id="exit-popup-title"
            className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-heading), serif' }}
          >
            {isEn ? offer.title : offer.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">{offer.subtitle}</p>

          {/* Benefit highlight */}
          <div className="rounded-xl p-4 mb-6" style={{ background: `${offer.accentColor}08`, border: `1px solid ${offer.accentColor}15` }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${offer.accentColor}15` }}>
                <i className={`${offer.icon} text-lg`} style={{ color: offer.accentColor }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  {isEn
                    ? 'Get your personalized score in just a few clicks'
                    : 'Obtenez votre score personnalisé en quelques clics'}
                </p>
                <p className="text-xs text-gray-400">
                  {isEn
                    ? `100% free · Instant results · No commitment`
                    : `100% gratuit · Résultats immédiats · Sans engagement`}
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {offer.usersCount && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: offer.accentColor, opacity: 1 - i * 0.2 }}
                    >
                      <i className="ri-user-line" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {isEn
                    ? `+${offer.usersCount} professionals`
                    : `+${offer.usersCount} professionnels`}
                </span>
              </div>
            )}
            {offer.successRate && (
              <div className="flex items-center gap-1.5">
                <i className="ri-star-fill text-xs" style={{ color: offer.accentColor }} />
                <span className="text-xs text-gray-500">
                  {isEn ? `${offer.successRate} satisfaction` : `${offer.successRate} satisfaction`}
                </span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNavigate}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${offer.accentColor}, ${offer.accentColor}cc)`,
                boxShadow: `0 4px 20px ${offer.accentColor}35`,
              }}
            >
              <i className={offer.icon} />
              {isEn ? 'Start the diagnostic' : 'Lancer le diagnostic'}
              <i className="ri-arrow-right-line" />
            </button>
            <button
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-all"
            >
              {isEn ? 'Not now' : 'Pas maintenant'}
            </button>
          </div>

          {/* Trust signal */}
          <p className="text-xs text-gray-400 text-center mt-4">
            <i className="ri-lock-2-line mr-1" />
            {isEn
              ? 'Confidential · No spam · Unsubscribe in 1 click'
              : 'Confidentiel · Pas de spam · Désabonnement en 1 clic'}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}



