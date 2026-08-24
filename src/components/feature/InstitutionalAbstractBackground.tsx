/* ============================================================
   KOS REGTECH AI — Institutional Abstract Background
   Motif géométrique abstrait style rapport annuel Big Four
   Signature visuelle cohérente Khepra Experts — Juin 2026
   Usage : fond ultra-subtil des dashboards, cartes, sections data
   ============================================================ */

const INSTITUTIONAL_ABSTRACT_IMAGE =
  'https://readdy.ai/api/search-image?query=Abstract%20geometric%20pattern%20with%20interconnected%20nodes%20and%20fine%20lines%20corporate%20institutional%20annual%20report%20background%20Deloitte%20PwC%20style%20subtle%20grid%20networks%20soft%20green%20and%20gold%20accents%20on%20off%20white%20minimal%20elegant%20data%20visualization%20aesthetic%20professional%20consulting%20firm%20report%20interior%20clean%20lines%20low%20contrast%20sophisticated%20abstract%20geometry%20very%20subtle%20understated&width=800&height=800&seq=kos-dashboard-abstract-2026-v2&orientation=squarish';

interface InstitutionalAbstractBackgroundProps {
  /** Opacité du fond abstrait. Défaut 0.04 (4%) */
  opacity?: number;
  /** Classes additionnelles */
  className?: string;
}

export default function InstitutionalAbstractBackground({
  opacity = 0.04,
  className = '',
}: InstitutionalAbstractBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={INSTITUTIONAL_ABSTRACT_IMAGE}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        style={{ opacity }}
      />
    </div>
  );
}



