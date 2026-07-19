import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';
import { LEAD_MAGNETS, getLeadMagnetBySlug } from '@/mocks/leadMagnets';
import LeadMagnetCaptureForm from '@/components/feature/LeadMagnetCaptureForm';
import LeadMagnetCard from '@/components/feature/LeadMagnetCard';

const FORM_URLS: Record<string, string> = {
  'checklist-conformite-bceao-cobac': 'https://readdy.ai/api/form/d8g0of3tvf9bji89p1e0',
  'guide-levee-fonds-afrique': 'https://readdy.ai/api/form/d8g0ofrtvf9bji89p1eg',
  'simulation-risque-reglementaire': 'https://readdy.ai/api/form/d8g0ofrtvf9bji89p1f0',
  'template-audit-gouvernance': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1fg',
  'mini-rapport-due-diligence': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1g0',
  'diagnostic-esg-maturite': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1gg',
  'diagnostic-flash-conformite-bceao-cobac-2026': 'https://readdy.ai/api/form/d8isqi3700fk75v20mlg',
  'guide-prix-transfert-beps-afrique': 'https://readdy.ai/api/form/d8tpnc4al24muhn2r9r0',
  'simulateur-agrement-microfinance-cemac': 'https://readdy.ai/api/form/d8uer2r9akq3s3aso8jg',
  'barometre-regtech-uemoa-2026': 'https://readdy.ai/api/form/d96m2jf0d76aer3t5610',
  'compliance-ohada-kos-ai': 'https://readdy.ai/api/form/d96m2jf0d76aer3t561g',
  'cartographie-risques-bancaires-afrique': 'https://readdy.ai/api/form/d96m2jf0d76aer3t5620',
};

interface LeadMagnetDetailPageProps {
  slug: string;
}

export default function LeadMagnetDetailPage({ slug }: LeadMagnetDetailPageProps) {
  const [showAllInside, setShowAllInside] = useState(false);

  const lm = getLeadMagnetBySlug(slug);
  const formUrl = FORM_URLS[slug] || '';

  if (!lm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground-900 mb-2">Ressource non trouvée</h1>
          <Link to="/lead-magnets" className="text-teal-600 hover:underline">
            Voir toutes les ressources
          </Link>
        </div>
      </div>
    );
  }

  const pageUrl = `/lead-magnets/${lm.slug}`;

  const relatedMagnets = LEAD_MAGNETS.filter(
    (m) => m.id !== lm.id && (m.category === lm.category || m.conversionOffer === lm.conversionOffer)
  ).slice(0, 3);

  const inside = showAllInside ? lm.whatsInside : lm.whatsInside.slice(0, 4);

  return (
    <>
      <SeoHead
        title={lm.seoTitle}
        description={lm.seoDescription}
        canonicalPath={pageUrl}
        keywords={lm.seoKeywords}
      />
      <SchemaWebPage
        name={lm.seoTitle}
        description={lm.seoDescription}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Accueil', url: '/' },
          { name: 'Ressources', url: '/lead-magnets' },
          { name: lm.title, url: pageUrl },
        ]}
      />

      {/* Hero — Pain point + Form */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 min-h-[80px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={lm.imageUrl}
            alt={lm.title}
            className="w-full h-full object-cover object-top opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-teal-900/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-14 w-full">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link to="/" className="hover:text-white/80">Accueil</Link></li>
              <li><i className="ri-arrow-right-s-line"></i></li>
              <li><Link to="/lead-magnets" className="hover:text-white/80">Ressources</Link></li>
              <li><i className="ri-arrow-right-s-line"></i></li>
              <li className="text-white/80">{lm.format}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Pain point + solution */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${lm.accentColor}30` }}
                >
                  <i className={`${lm.icon} text-xl`} style={{ color: lm.accentColor }}></i>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: `${lm.accentColor}25`, color: lm.accentColor }}
                >
                  {lm.format} Gratuit
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {lm.title}
              </h1>
              <p className="text-lg text-white/70 mb-6">
                {lm.subtitle}
              </p>

              {/* Pain → Consequence → Solution */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg flex-shrink-0 mt-0.5">
                    <i className="ri-alert-line text-red-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-400 mb-1">Le problème</p>
                    <p className="text-sm text-white/70">{lm.painPoint}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500/20 rounded-lg flex-shrink-0 mt-0.5">
                    <i className="ri-close-circle-line text-orange-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-400 mb-1">Les conséquences</p>
                    <p className="text-sm text-white/70">{lm.consequences}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${lm.accentColor}25` }}
                  >
                    <i
                      className="ri-lightbulb-line text-sm"
                      style={{ color: lm.accentColor }}
                    ></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: lm.accentColor }}>
                      La solution
                    </p>
                    <p className="text-sm text-white/70">{lm.solution}</p>
                  </div>
                </div>
              </div>

              {/* Proof */}
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ borderColor: `${lm.accentColor}40`, backgroundColor: `${lm.accentColor}10` }}
              >
                {lm.stats && (
                  <div className="text-center flex-shrink-0">
                    <div className="text-2xl font-bold" style={{ color: lm.accentColor }}>
                      {lm.stats.value}
                    </div>
                    <div className="text-xs text-white/60">{lm.stats.label}</div>
                  </div>
                )}
                <div className="text-sm text-white/70 flex-1">{lm.proof}</div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-background-50 rounded-2xl p-6 lg:sticky lg:top-24">
              <LeadMagnetCaptureForm
                leadMagnet={lm}
                formUrl={formUrl}
                variant="inline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* What's inside */}
            <section>
              <h2 className="text-2xl font-bold text-foreground-900 mb-6 flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${lm.accentColor}15` }}
                >
                  <i className="ri-layout-4-line text-sm" style={{ color: lm.accentColor }}></i>
                </div>
                Contenu de la ressource
              </h2>
              <div className="space-y-2">
                {inside.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-background-50 border border-background-100 rounded-xl"
                  >
                    <div
                      className="w-6 h-6 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 text-xs font-bold"
                      style={{ backgroundColor: `${lm.accentColor}15`, color: lm.accentColor }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground-800 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              {lm.whatsInside.length > 4 && (
                <button
                  onClick={() => setShowAllInside(!showAllInside)}
                  className="mt-3 text-sm font-medium flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: lm.accentColor }}
                >
                  {showAllInside ? (
                    <>
                      <i className="ri-arrow-up-s-line"></i>
                      Voir moins
                    </>
                  ) : (
                    <>
                      <i className="ri-arrow-down-s-line"></i>
                      Voir les {lm.whatsInside.length - 4} sections restantes
                    </>
                  )}
                </button>
              )}
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-foreground-900 mb-6 flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${lm.accentColor}15` }}
                >
                  <i className="ri-star-line text-sm" style={{ color: lm.accentColor }}></i>
                </div>
                Ce que vous obtenez
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lm.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${lm.accentColor}20` }}
                    >
                      <i
                        className="ri-check-line text-xs font-bold"
                        style={{ color: lm.accentColor }}
                      ></i>
                    </div>
                    <p className="text-sm text-foreground-800">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Meta info */}
            <section className="grid grid-cols-3 gap-4">
              <div className="bg-background-50 border border-background-100 rounded-xl p-4 text-center">
                <i className={`${lm.icon} text-2xl mb-2 block`} style={{ color: lm.accentColor }}></i>
                <p className="text-xs text-foreground-500 mb-1">Format</p>
                <p className="text-sm font-bold text-foreground-900">{lm.format}</p>
              </div>
              <div className="bg-background-50 border border-background-100 rounded-xl p-4 text-center">
                <i className="ri-time-line text-2xl mb-2 block text-foreground-400"></i>
                <p className="text-xs text-foreground-500 mb-1">Durée</p>
                <p className="text-sm font-bold text-foreground-900">{lm.timeToComplete}</p>
              </div>
              <div className="bg-background-50 border border-background-100 rounded-xl p-4 text-center">
                <i className="ri-bar-chart-fill text-2xl mb-2 block text-foreground-400"></i>
                <p className="text-xs text-foreground-500 mb-1">Niveau</p>
                <p className="text-sm font-bold text-foreground-900">{lm.difficulty}</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Sticky form */}
            <div className="bg-background-50 border border-background-200 rounded-2xl p-5 lg:sticky lg:top-24">
              <div className="text-center mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-3"
                  style={{ backgroundColor: `${lm.accentColor}15` }}
                >
                  <i className={`${lm.icon} text-2xl`} style={{ color: lm.accentColor }}></i>
                </div>
                <p className="text-sm font-bold text-foreground-900">
                  Accès immédiat après inscription
                </p>
                <p className="text-xs text-foreground-500 mt-1">
                  100% gratuit — Aucune carte requise
                </p>
              </div>
              <LeadMagnetCaptureForm
                leadMagnet={lm}
                formUrl={formUrl}
                variant="inline"
              />
            </div>

            {/* Target audience */}
            <div className="bg-background-50 border border-background-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                <i className="ri-user-line" style={{ color: lm.accentColor }}></i>
                Pour qui ?
              </h3>
              <p className="text-sm text-foreground-700">{lm.targetAudience}</p>
            </div>
          </aside>
        </div>

        {/* Related resources */}
        {relatedMagnets.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground-900 mb-6">
              Autres ressources recommandées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedMagnets.map((rm) => (
                <LeadMagnetCard
                  key={rm.id}
                  leadMagnet={rm}
                  formUrl={FORM_URLS[rm.id] || ''}
                  compact
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}



