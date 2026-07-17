import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/feature/ScrollReveal';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function SolutionsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const currentLang = currentLanguage === 'en' ? 'en-US' : 'fr-FR';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/solutions#webpage`,
        url: `${SITE_URL}/solutions`,
        name: 'Solutions KOS | Diagnostics, Outils & Accompagnement | Afrique Francophone',
        description: 'Solutions KOS pour décideurs, investisseurs et institutions en Afrique francophone. Diagnostics gratuits, outils d\'évaluation, accompagnement sur devis confidentiel. 26 outils, 17 pays UEMOA/CEMAC.',
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/solutions#breadcrumb` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/solutions#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE_URL}/solutions` },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS — KOS Platform',
        url: SITE_URL,
        description: 'Plateforme d\'intelligence réglementaire pour l\'Afrique francophone',
        address: { '@type': 'PostalAddress', streetAddress: 'Lomé', addressLocality: 'Lomé', addressCountry: 'TG' },
      },
    ],
  };

  const audienceSolutions = [
    {
      id: 'decideurs',
      title: 'Décideurs & COMEX',
      subtitle: 'Gouvernance, conformité et pilotage stratégique',
      description: 'Pour les dirigeants qui pilotent la transformation de leur organisation face aux exigences réglementaires BCEAO, COBAC et OHADA.',
      icon: 'ri-user-settings-line',
      accent: '#86BC25',
      href: '/decideurs/',
      items: ['Évaluation de gouvernance', 'Diagnostic organisationnel', 'Rapport CA gratuit', 'Conseil stratégique sur devis'],
    },
    {
      id: 'investisseurs',
      title: 'Investisseurs & Fonds',
      subtitle: 'Due diligence, scoring et sécurisation',
      description: 'Pour les investisseurs qui exigent une due diligence réglementaire rigoureuse avant d\'engager des capitaux en Afrique francophone.',
      icon: 'ri-funds-line',
      accent: '#D4AF37',
      href: '/investisseurs/',
      items: ['KOS Investability Score™', 'Due Diligence Full Scope', 'Étude de faisabilité', 'Levée de fonds — sur devis'],
    },
    {
      id: 'projets',
      title: 'Projets Industriels',
      subtitle: 'Ingénierie financière et structuration',
      description: 'Pour les promoteurs de projets qui doivent structurer leur financement et leur gouvernance selon les standards BAD, BIDC et IFC.',
      icon: 'ri-building-2-line',
      accent: '#6B9B1F',
      href: '/projets-industriels/',
      items: ['Étude de faisabilité intégrée', 'Business plan bancable', 'Due diligence ESG', 'Montage financier — sur devis'],
    },
    {
      id: 'sfd',
      title: 'SFD & Microfinance',
      subtitle: 'Conformité, agrément et transformation',
      description: 'Pour les SFD qui naviguent dans l\'environnement réglementaire UEMOA : instructions BCEAO, ratios prudentiels, digitalisation.',
      icon: 'ri-bank-line',
      accent: '#2E8B57',
      href: '/sfd-conformite/',
      items: ['Diagnostic conformité SFD', 'Dossier d\'agrément', 'Transformation digitale', 'Accompagnement — sur devis'],
    },
  ];

  const tools = [
    {
      id: 'diagnostic-organisationnel',
      title: 'Diagnostic Organisationnel',
      subtitle: 'Maturité de votre organisation',
      icon: 'ri-organization-chart',
      color: 'from-amber-600 to-yellow-700',
      url: '/tools/diagnostic-organisationnel',
      duration: '10 min',
      deliverable: 'Rapport PDF avec score et recommandations',
    },
    {
      id: 'maturite-digitale',
      title: 'Maturité Digitale',
      subtitle: 'Niveau de transformation digitale',
      icon: 'ri-smartphone-line',
      color: 'from-teal-600 to-emerald-700',
      url: '/tools/maturite-digitale',
      duration: '8 min',
      deliverable: 'Rapport de maturité digitale',
    },
    {
      id: 'evaluation-gouvernance',
      title: 'Évaluation Gouvernance',
      subtitle: 'Auditez votre gouvernance',
      icon: 'ri-shield-check-line',
      color: 'from-slate-600 to-gray-700',
      url: '/tools/evaluation-gouvernance',
      duration: '12 min',
      deliverable: 'Rapport conformité BCEAO/OHADA',
    },
    {
      id: 'evaluation-maturite-fintech',
      title: 'Maturité Fintech',
      subtitle: 'Positionnement fintech',
      icon: 'ri-bank-card-line',
      color: 'from-green-600 to-emerald-700',
      url: '/tools/evaluation-maturite-fintech',
      duration: '10 min',
      deliverable: 'Rapport positionnement fintech',
    },
    {
      id: 'evaluation-cybersecurite',
      title: 'Évaluation Cybersécurité',
      subtitle: 'Auditez votre sécurité IT',
      icon: 'ri-shield-keyhole-line',
      color: 'from-red-600 to-rose-700',
      url: '/tools/evaluation-cybersecurite',
      duration: '10 min',
      deliverable: 'Rapport sécurité IT',
    },
    {
      id: 'benchmark-sectoriel',
      title: 'Benchmark Sectoriel',
      subtitle: 'Comparez votre performance',
      icon: 'ri-bar-chart-line',
      color: 'from-indigo-600 to-blue-700',
      url: '/tools/benchmark-sectoriel',
      duration: '8 min',
      deliverable: 'Rapport comparatif sectoriel',
    },
  ];

  return (
    <>
      <SeoHead
        title="Solutions KOS | Diagnostics, Outils & Accompagnement sur Devis | Afrique Francophone"
        description="Solutions d'intelligence réglementaire KOS pour l'Afrique francophone. Diagnostics gratuits, outils d'évaluation, accompagnement sur devis confidentiel. Décideurs, investisseurs, SFD, projets industriels. 17 pays UEMOA/CEMAC."
        keywords="solutions Afrique, diagnostic réglementaire, outils conformité, accompagnement stratégique, devis confidentiel, KOS plateforme, due diligence, SFD conformité"
        canonicalPath="/solutions"
        ogType="website"
        structuredData={jsonLd}
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* ═══ HERO ═══ */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.18)' }}>
                  <i className="ri-puzzle-2-line text-sm" style={{ color: '#86BC25' }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#86BC25' }}>KOS — Solutions</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Des solutions conçues pour
                  <span className="block" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #6B9B1F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>l'Afrique francophone</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Que vous soyez dirigeant, investisseur, promoteur de projet ou institution financière, KOS met à votre disposition des diagnostics gratuits, des outils d'évaluation et un accompagnement sur devis confidentiel. <strong className="text-white font-semibold">Pas de prix catalogue — chaque solution est calibrée sur votre réalité.</strong>
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {[
                    { value: '26', label: 'Outils gratuits', icon: 'ri-tools-line' },
                    { value: '4', label: 'Parcours par audience', icon: 'ri-user-settings-line' },
                    { value: '17', label: 'Pays UEMOA/CEMAC', icon: 'ri-global-line' },
                    { value: 'Dev.', label: 'Confidentiel', icon: 'ri-lock-line' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <i className={`${stat.icon} text-2xl mb-2 block`} style={{ color: '#86BC25' }} />
                      <div className="font-heading text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ 4 PARCOURS PAR AUDIENCE ═══ */}
        <section className="py-16 md:py-24" style={{ background: '#fafaf8' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(134,188,37,0.06)', border: '1px solid rgba(134,188,37,0.12)' }}>
                <i className="ri-user-settings-line text-sm" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B9B1F' }}>Parcours par audience</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Trouvez votre solution</h2>
              <p className="text-base max-w-2xl mx-auto text-foreground-600">Chaque audience a des besoins spécifiques. KOS a conçu des parcours dédiés.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {audienceSolutions.map((sol, idx) => (
                <ScrollReveal key={sol.id} delay={idx * 80}>
                  <div
                    className="group rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    style={{ background: '#ffffff', border: '1px solid rgba(134,188,37,0.06)' }}
                    onClick={() => navigate(sol.href)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${sol.accent}12`, border: `1px solid ${sol.accent}25` }}>
                        <i className={`${sol.icon} text-xl`} style={{ color: sol.accent }} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground-950">{sol.title}</h3>
                        <p className="text-sm text-foreground-500">{sol.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-5 text-foreground-600">{sol.description}</p>
                    <div className="space-y-2">
                      {sol.items.map((item, ii) => (
                        <div key={ii} className="flex items-center gap-2 text-sm text-foreground-700">
                          <i className="ri-check-line text-xs flex-shrink-0" style={{ color: sol.accent }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: sol.accent }}>
                      Explorer ce parcours
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OUTILS GRATUITS ═══ */}
        <section className="py-16 md:py-24 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.16)' }}>
                <i className="ri-tools-line text-sm" style={{ color: '#D4AF37' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#b8941e' }}>26 outils gratuits</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Diagnostics et outils d'évaluation</h2>
              <p className="text-base max-w-2xl mx-auto text-foreground-600">Évaluez gratuitement votre organisation en quelques minutes. Des outils conçus par nos experts pour le contexte africain.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <ScrollReveal key={tool.id} delay={index * 80}>
                  <Link to={tool.url} className="group block h-full">
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border border-background-200/70 hover:border-primary-200/60 flex flex-col">
                      <div className={`bg-gradient-to-r ${tool.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                        <div className="relative z-10">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                            <i className={`${tool.icon} text-2xl`} />
                          </div>
                          <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                          <p className="text-white/85 text-sm">{tool.subtitle}</p>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 mb-4 text-sm text-foreground-500">
                          <div className="flex items-center gap-1.5"><i className="ri-time-line" /><span>{tool.duration}</span></div>
                        </div>
                        <div className="bg-background-100 rounded-lg p-4 mb-5 border border-background-200/70">
                          <div className="flex items-start gap-3">
                            <i className="ri-file-text-line text-primary-600 text-lg mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-foreground-400 uppercase mb-1">Livrable</div>
                              <div className="text-sm font-medium text-foreground-700">{tool.deliverable}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-background-100 mt-auto">
                          <span className="text-sm font-semibold text-foreground-700">Démarrer le diagnostic</span>
                          <i className="ri-arrow-right-line text-xl text-primary-500 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/tools/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#ffffff' }}>
                <i className="ri-grid-line" />
                Voir les 26 outils
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CTA — DEVIS CONFIDENTIEL ═══ */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Besoin d'un accompagnement sur mesure ?
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Nos Directeurs de Business Unit analysent votre contexte et vous proposent une solution calibrée. <strong className="text-white font-semibold">Devis confidentiel sous 72 heures.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/contact')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#080c14' }}>
                  <i className="ri-mail-send-line" />
                  Demander un devis confidentiel
                </button>
                <button onClick={() => navigate('/diagnostic-flash')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:-translate-y-0.5" style={{ border: '1.5px solid rgba(212,175,55,0.35)', color: '#D4AF37', background: 'rgba(212,175,55,0.06)' }}>
                  <i className="ri-flashlight-line" />
                  Diagnostic Flash gratuit
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}