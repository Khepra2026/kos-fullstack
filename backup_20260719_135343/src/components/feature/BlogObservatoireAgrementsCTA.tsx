/* ============================================================
   KOS — Blog Contextual CTA for Observatoire & Agréments
   Reusable component to cross-link new pages from blog articles
   ============================================================ */

import { useNavigate } from 'react-router-dom';

interface BlogObservatoireAgrementsCTAProps {
  variant?: 'observatoire' | 'agrements' | 'both' | 'compliance-factory';
  context?: 'observatoire' | 'agrement' | 'compliance' | 'general';
}

export default function BlogObservatoireAgrementsCTA({
  variant = 'both',
  context = 'general',
}: BlogObservatoireAgrementsCTAProps) {
  const navigate = useNavigate();

  const cards = [];

  if (variant === 'observatoire' || variant === 'both') {
    cards.push({
      id: 'observatoire',
      title: 'Observatoire Réglementaire Africain',
      desc: '8 régulateurs couverts — BCEAO, COBAC, CIMA, COSUMAF, AMF-UEMOA, GAFI/GIABA/GABAC, Banques Centrales, Autorités FinTech. 1 247 textes suivis, alertes en temps réel.',
      href: '/observatoire-reglementaire-africain/',
      icon: 'ri-radar-line',
      accent: '#2E8B57',
      bg: 'rgba(46,139,87,0.05)',
      border: 'rgba(46,139,87,0.12)',
      cta: 'Explorer l\'Observatoire',
      show: context === 'observatoire' || context === 'compliance' || context === 'general',
    });
  }

  if (variant === 'agrements' || variant === 'both') {
    cards.push({
      id: 'agrements',
      title: 'Hub Agréments Afrique',
      desc: '6 types d\'agrément — Banques, EMF/SFD, FinTech & Paiement, PSP, Assurance CIMA, Marchés Financiers. Guides complets, checklists, simulateurs.',
      href: '/agrements-afrique/',
      icon: 'ri-shield-check-line',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.05)',
      border: 'rgba(212,175,55,0.12)',
      cta: 'Découvrir le Hub',
      show: context === 'agrement' || context === 'compliance' || context === 'general',
    });
  }

  if (variant === 'compliance-factory') {
    cards.push({
      id: 'compliance-factory',
      title: 'Digital Compliance Factory™',
      desc: 'Bibliothèque documentaire — 78 documents, 6 catégories. Politiques, procédures, cartographies des risques, matrices de contrôle, plans d\'audit.',
      href: '/digital-compliance-factory/',
      icon: 'ri-file-list-3-line',
      accent: '#6B9B1F',
      bg: 'rgba(107,155,31,0.05)',
      border: 'rgba(107,155,31,0.12)',
      cta: 'Accéder à la Bibliothèque',
      show: true,
    });
  }

  const visibleCards = cards.filter((c) => c.show);
  if (visibleCards.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-background-200 overflow-hidden bg-background-50">
      <div className="px-5 py-3 border-b border-background-200 bg-background-100 flex items-center gap-2">
        <i className="ri-sparkling-line text-primary-600 text-sm" />
        <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">
          KOS Big Four Expansion — Nouveautés
        </span>
      </div>
      <div className={`p-5 grid gap-4 ${visibleCards.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{ background: card.bg, borderColor: card.border }}
            onClick={() => navigate(card.href)}
          >
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ background: `${card.accent}12`, border: `1px solid ${card.accent}25` }}
            >
              <i className={`${card.icon} text-lg`} style={{ color: card.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground-950 mb-1">{card.title}</h4>
              <p className="text-xs text-foreground-600 leading-relaxed mb-2">{card.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: card.accent }}>
                {card.cta}
                <i className="ri-arrow-right-line text-xs" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



