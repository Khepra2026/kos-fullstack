import { Link } from 'react-router-dom';
import { getBUByID, buildBUHreflangLinks } from '@/data/buHreflangMap';

interface BULanguageSwitcherProps {
  /** Identifiant court de la BU : 'bu1' | 'bu2' | 'bu3' | 'bu4' */
  buId: string;
  /** Langue de la page courante */
  currentLang: 'fr' | 'en';
}

/**
 * ═══════════════════════════════════════════════════════════════
 * BU LANGUAGE SWITCHER — Badge discret + Hreflang SEO
 * ═══════════════════════════════════════════════════════════════
 *
 * Affiche un badge FR/EN discret en haut à droite du hero
 * ET injecte les 3 balises hreflang obligatoires dans le <head> :
 *   - hreflang="fr"  → version française
 *   - hreflang="en"  → version anglaise
 *   - hreflang="x-default" → version FR (langue primaire)
 *
 * Google a besoin des DEUX versions sur chaque page pour
 * établir correctement la relation bilingue.
 *
 * Consomme le mapping centralisé src/data/buHreflangMap.ts.
 */
export default function BULanguageSwitcher({ buId, currentLang }: BULanguageSwitcherProps) {
  const entry = getBUByID(buId);

  // Fallback silencieux si le buId n'est pas trouvé — ne casse pas la page
  if (!entry) {
    return null;
  }

  const hreflangLinks = buildBUHreflangLinks(entry);
  const alternatePath = currentLang === 'fr' ? entry.pathEn : entry.pathFr;
  const alternateLabel = currentLang === 'fr' ? entry.labelFr : entry.labelEn;

  return (
    <>
      {/* ═══ Hreflang Tags — 3 balises obligatoires (fr, en, x-default) ═══ */}
      {hreflangLinks.map((link) => (
        <link
          key={link.lang}
          rel="alternate"
          hrefLang={link.lang}
          href={link.href}
        />
      ))}

      {/* ═══ Badge Visuel — Bouton discret de changement de langue ═══ */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
        <Link
          to={alternatePath}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-medium text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <i className="ri-global-line text-[13px]" />
          <span>{alternateLabel}</span>
        </Link>
      </div>
    </>
  );
}