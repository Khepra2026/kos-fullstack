/* ============================================================
   KOS — Regional Language Landing Page (12 pays ISO2)
   Réutilisable : /sn, /tz, /ng, /et, /za, /cd, /cm, /bf, /mz, /ke, /ne, /ci
   ============================================================ */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { REGIONAL_LANG_PAGES } from '@/data/regionalLangPages';
import type { RegionalLangPageData } from '@/data/regionalLangPages';

function useRegionFromPath(): RegionalLangPageData | null {
  const location = useLocation();
  const code = location.pathname.replace(/^\//, '').split('/')[0];
  return REGIONAL_LANG_PAGES[code] || null;
}

export default function RegionalLangPage() {
  const region = useRegionFromPath();
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [websiteAlt, setWebsiteAlt] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  if (!region) return null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteAlt.trim()) return;
    if (!email) { setError('Veuillez entrer votre email.'); return; }
    setSending(true);
    const params = new URLSearchParams({ email, organization: org });
    fetch('https://form.readdy.ai/api/v1/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    }).then(() => {
      setSubmitted(true);
    }).catch(() => {
      setError('Erreur. Réessayez.');
    }).finally(() => setSending(false));
  };

  const zoneColor = region.zone === 'UEMOA' ? '#0D7B5F' : region.zone === 'CEMAC' ? '#C2410C' : region.accentColor;

  return (
    <>
      <SeoHead
        title={region.metaTitle}
        description={region.metaDescription}
        keywords={`${region.pays}, ${region.languePrincipale}, ${region.regulateurPrincipal}, conformité, gouvernance, audit, KHEPRA EXPERTS, ${region.zone}`}
        canonicalPath={`/${region.iso2}`}
      />
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[480px] md:min-h-[580px] flex items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${region.accentColor}dd 0%, ${region.accentColor}99 30%, #1a1a2e 100%)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-semibold mb-6">
              <span className="text-xl">{region.drapeauEmoji}</span>
              {region.pays} · {region.regulateurPrincipal}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}>
              {region.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4">
              {region.heroSubtitle}
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                <i className="ri-global-line mr-1"></i>{region.languePrincipale}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/diagnostic-flash/"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-all hover:scale-105"
              >
                <i className="ri-flashlight-line"></i>
                Diagnostic Gratuit
              </Link>
              <Link
                to="/compliance-score/"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/40 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-white/10 transition-all"
              >
                <i className="ri-bar-chart-2-line"></i>
                Compliance Score™
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div className="bg-foreground-950 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {region.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-foreground-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

          {/* ─── CONTEXT LOCAL ─── */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: region.accentColor }}>
                  <span>{region.drapeauEmoji}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950">Contexte — {region.pays}</h2>
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed">{region.contexteLocal}</p>
            </div>
          </ScrollReveal>

          {/* ─── REGULATEURS ─── */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-2">Régulateurs Couverts</h2>
            <p className="text-sm text-foreground-500 mb-6">Textes suivis et alertes en temps réel pour {region.pays}.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {region.regulateurs.map((reg, i) => (
                <div key={i} className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${region.accentColor}15`, color: region.accentColor }}>
                    <i className={`${reg.icon} text-lg`}></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1" title={reg.nom}>{reg.nom}</h3>
                  <p className="text-xs text-foreground-500 mb-2">{reg.role}</p>
                  <div className="text-lg font-bold" style={{ color: region.accentColor }}>{reg.textes}</div>
                  <div className="text-[10px] text-foreground-400">textes suivis</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ─── SERVICES ─── */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-2">Nos Services — {region.pays}</h2>
            <p className="text-sm text-foreground-500 mb-6">Expertise terrain et méthodologie Big Four, déployés en {region.languePrincipale}.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {region.services.map((service, i) => (
                <Link
                  key={i}
                  to={service.lien}
                  className="group p-6 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 hover:-translate-y-1 transition-all cursor-pointer block"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: region.accentColor }}>
                      <i className={`${service.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-2 group-hover:text-foreground-700">{service.titre}</h3>
                      <p className="text-xs text-foreground-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          {/* ─── OBSERVATOIRE ─── */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground-950 mb-2">
                    <i className="ri-radar-line mr-2" style={{ color: region.accentColor }}></i>
                    Observatoire Réglementaire — {region.pays}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{region.observatoireInfo}</p>
                </div>
                <Link
                  to="/observatoire-reglementaire-africain/"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: region.accentColor }}
                >
                  <i className="ri-radar-line"></i>
                  Accéder à l'Observatoire
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── AGREMENTS ─── */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground-950 mb-2">
                    <i className="ri-award-line mr-2" style={{ color: region.accentColor }}></i>
                    Hub Agréments — {region.pays}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{region.agrementsInfo}</p>
                </div>
                <Link
                  to="/agrements-afrique/"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer border hover:bg-background-100 transition-colors"
                  style={{ borderColor: region.accentColor, color: region.accentColor }}
                >
                  <i className="ri-award-line"></i>
                  Voir le Hub Agréments
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── COMPLIANCE FACTORY ─── */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 md:p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground-950 mb-2">
                    <i className="ri-file-list-3-line mr-2" style={{ color: region.accentColor }}></i>
                    Digital Compliance Factory™
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{region.complianceFactoryInfo}</p>
                </div>
                <Link
                  to="/digital-compliance-factory/"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer border hover:bg-background-100 transition-colors"
                  style={{ borderColor: region.accentColor, color: region.accentColor }}
                >
                  <i className="ri-file-list-3-line"></i>
                  Explorer la Bibliothèque
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── DIAGNOSTIC CTA ─── */}
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 md:p-10 text-center mb-12"
              style={{ background: `linear-gradient(135deg, ${region.accentColor}10 0%, ${region.accentColor}05 100%)`, border: `1px solid ${region.accentColor}25` }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white" style={{ backgroundColor: region.accentColor }}>
                <i className="ri-flashlight-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-foreground-950 mb-2">Diagnostic Flash Gratuit — {region.pays}</h3>
              <p className="text-sm text-foreground-600 mb-6 max-w-md mx-auto">
                30 minutes avec un expert KHEPRA. Analyse de votre exposition réglementaire, identification des gaps prioritaires, feuille de route personnalisée.
              </p>
              <Link
                to="/diagnostic-flash/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:opacity-90 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}
              >
                <i className="ri-flashlight-line"></i>
                Diagnostic Flash — Gratuit
              </Link>
            </div>
          </ScrollReveal>

          {/* ─── NEWSLETTER ─── */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-12">
              <h3 className="text-base font-bold text-foreground-950 mb-2">
                <i className="ri-mail-line mr-2" style={{ color: region.accentColor }}></i>
                Bulletin Réglementaire — {region.pays}
              </h3>
              <p className="text-sm text-foreground-600 mb-5">{region.newsletterInfo}</p>
              {!submitted ? (
                <form data-readdy-form="" onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                    className="flex-1 px-4 py-3 rounded-lg border border-background-200 text-sm outline-none bg-background-50"
                  />
                  <input
                    type="text"
                    name="organization"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Organisation (optionnel)"
                    className="flex-1 px-4 py-3 rounded-lg border border-background-200 text-sm outline-none bg-background-50"
                  />
                  <div style={{ height: '1px', width: '1px', position: 'absolute', left: '-9999px', overflow: 'hidden' }}>
                    <input
                      type="text"
                      name="website_alt"
                      value={websiteAlt}
                      onChange={(e) => setWebsiteAlt(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                  </div>
                  {error && <p className="text-xs text-red-600 col-span-full">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-6 py-3 rounded-lg text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:opacity-90 flex-shrink-0"
                    style={{ backgroundColor: region.accentColor }}
                  >
                    {sending ? 'Envoi...' : "S'abonner"}
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-sm text-foreground-700">
                  <i className="ri-check-double-line text-lg" style={{ color: region.accentColor }}></i>
                  Abonnement confirmé ! Vous recevrez le prochain bulletin.
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* ─── CROSS-LINKS ─── */}
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Observatoire Réglementaire', icon: 'ri-radar-line', href: '/observatoire-reglementaire-africain/' },
                { label: 'Hub Agréments Afrique', icon: 'ri-award-line', href: '/agrements-afrique/' },
                { label: 'Digital Compliance Factory™', icon: 'ri-file-list-3-line', href: '/digital-compliance-factory/' },
                { label: 'KHEPRA Compliance Score™', icon: 'ri-bar-chart-2-line', href: '/compliance-score/' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="p-4 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all cursor-pointer group flex items-center gap-3"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: `${region.accentColor}12`, color: region.accentColor }}>
                    <i className={link.icon}></i>
                  </div>
                  <span className="text-xs font-semibold text-foreground-800 group-hover:text-foreground-950 line-clamp-2">{link.label}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />
    </>
  );
}