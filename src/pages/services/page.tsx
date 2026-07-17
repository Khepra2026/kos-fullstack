import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { ServicesContact } from './components/ServicesContact';
import { useNavigate } from 'react-router-dom';
import BUBilingualCrossLinks from '@/components/feature/BUBilingualCrossLinks';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: 'KOS — 4 Business Units | Intelligence Réglementaire, Due Diligence, Solutions Technologiques & Observatoire | Afrique Francophone',
      description: '4 Business Units en Afrique francophone : BU1 — Intelligence Réglementaire (Veille, Alertes, Briefs), BU2 — Due Diligence Réglementaire (Full Scope, LBC/FT, Gouvernance), BU3 — Solutions Technologiques Réglementaires (Compliance Score, Inspection Simulator), BU4 — Observatoire Africain (COBAC, BCEAO, FinTech). Plateforme d\'Intelligence Réglementaire — 17 pays UEMOA/CEMAC. Devis confidentiel sur mesure.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '4 Business Units', item: `${SITE_URL}/services` },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment KOS organise-t-il ses services en Business Units ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KOS structure son offre en 4 Business Units : BU1 — Intelligence Réglementaire (veille, alertes, notes d\'interprétation), BU2 — Due Diligence Réglementaire (KOS Investability Score™, DD Full Scope, DD LBC/FT), BU3 — Solutions Technologiques Réglementaires (déploiement sur mission), BU4 — Observatoire Africain (benchmarks, indices, rapports sectoriels). Chaque mission fait l\'objet d\'un devis confidentiel sur mesure.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment obtenir un devis pour une mission KOS ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Toutes nos missions sont établies sur devis confidentiel après un diagnostic initial. Contactez-nous via le formulaire ou par téléphone pour un échange exploratoire gratuit de 30 minutes avec un Directeur de Business Unit. Nous analysons votre contexte et vous transmettons une proposition commerciale détaillée sous 72 heures.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels pays couvre KOS en Afrique francophone ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KOS couvre 17 pays en zones UEMOA et CEMAC : Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo (UEMOA) ; Cameroun, Centrafrique, Congo, Gabon, Guinée Équatoriale, Tchad (CEMAC) ; plus RDC, Ghana et Nigeria pour certaines missions. Nos équipes sont basées à Lomé avec des partenaires dans chaque pays.',
          },
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS — KOS Platform',
      url: SITE_URL,
      foundingDate: '2002',
      areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'CM', 'ML', 'NE', 'GA', 'CD'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+228-93-98-49-09',
        contactType: 'customer service',
        email: 'contact@khepraexperts.com',
        availableLanguage: ['French', 'English'],
      },
    },
  ],
};

const fourBUs = [
  {
    id: 'bu1',
    number: 'BU1',
    label: 'Intelligence Réglementaire',
    tagline: 'Veille, Alertes, Briefs & Notes d\'Interprétation',
    icon: 'ri-radar-line',
    accent: '#86BC25',
    accentBg: 'rgba(134,188,37,0.06)',
    accentBorder: 'rgba(134,188,37,0.16)',
    description: 'Détection proactive des évolutions réglementaires en Afrique francophone. Veille continue sur 8 régulateurs, analyse d\'impact et recommandations actionnables pour les COMEX.',
    products: [
      { name: 'Regulatory Watch™', desc: 'Veille continue multi-régulateurs avec alertes personnalisées', icon: 'ri-radar-line' },
      { name: 'Executive Briefs™', desc: 'Synthèses décisionnelles trimestrielles pour COMEX', icon: 'ri-file-list-3-line' },
      { name: 'Compliance Radar™', desc: 'Cartographie dynamique des obligations réglementaires', icon: 'ri-bar-chart-2-line', badge: 'NEW' },
      { name: 'Interpretation Notes™', desc: 'Notes d\'interprétation juridique des textes complexes', icon: 'ri-book-open-line' },
    ],
    stats: [
      { value: '8', label: 'Régulateurs' },
      { value: '1 500+', label: 'Institutions servies' },
    ],
    href: '/bu1-regulatory-intelligence/',
    ctaLabel: 'Explorer BU1',
  },
  {
    id: 'bu2',
    number: 'BU2',
    label: 'Due Diligence Réglementaire',
    tagline: 'KOS Investability Score™ · DD Full Scope · DD LBC/FT',
    icon: 'ri-search-eye-line',
    accent: '#D4AF37',
    accentBg: 'rgba(212,175,55,0.06)',
    accentBorder: 'rgba(212,175,55,0.16)',
    description: 'Due diligence réglementaire complète pour investisseurs, banques et fonds. 8 axes d\'analyse, scoring exclusif KOS Investability Score™, rapport en 20 jours.',
    products: [
      { name: 'KOS Investability Score™', desc: 'Score 8 axes — gouvernance, conformité, LBC/FT, ESG, cybersécurité', icon: 'ri-star-line', badge: 'Score' },
      { name: 'Regulatory DD — Full Scope', desc: 'Due diligence réglementaire 360° pré-acquisition', icon: 'ri-search-eye-line', badge: 'Premium' },
      { name: 'Compliance DD — LBC/FT', desc: 'Due diligence LBC/FT et conformité GAFI', icon: 'ri-fingerprint-line' },
      { name: 'Governance DD', desc: 'Évaluation approfondie de la gouvernance', icon: 'ri-government-line' },
    ],
    stats: [
      { value: '8', label: 'Axes d\'analyse' },
      { value: '20j', label: 'Délai moyen' },
    ],
    href: '/bu2-regulatory-due-diligence/',
    ctaLabel: 'Explorer BU2',
  },
  {
    id: 'bu3',
    number: 'BU3',
    label: 'Solutions Technologiques',
    tagline: 'Compliance Score™ · Inspection Simulator™ · Veille Automatisée',
    icon: 'ri-cloud-line',
    accent: '#6B9B1F',
    accentBg: 'rgba(107,155,31,0.06)',
    accentBorder: 'rgba(107,155,31,0.16)',
    description: 'Plateforme technologique de pilotage de la conformité. Automatisation de la veille, scoring continu, simulation d\'inspections. 95% d\'automatisation.',
    products: [
      { name: 'KOS Regulatory Watch™', desc: 'Déploiement de veille réglementaire automatisée', icon: 'ri-radar-line' },
      { name: 'KOS Compliance Score™', desc: 'Scoring continu de conformité avec alertes', icon: 'ri-bar-chart-2-line' },
      { name: 'KOS Inspection Simulator™', desc: 'Simulation d\'inspection en conditions réelles', icon: 'ri-stethoscope-line' },
      { name: 'KOS Governance Monitor™', desc: 'Monitoring continu de la gouvernance', icon: 'ri-shield-check-line' },
    ],
    stats: [
      { value: '95%', label: 'Automatisation' },
      { value: '4', label: 'Solutions' },
    ],
    href: '/bu3-regtech-saas/',
    ctaLabel: 'Explorer BU3',
  },
  {
    id: 'bu4',
    number: 'BU4',
    label: 'Observatoire Africain',
    tagline: 'Benchmarks · Indices · Rapports Sectoriels · Policy Briefs',
    icon: 'ri-eye-line',
    accent: '#2E8B57',
    accentBg: 'rgba(46,139,87,0.06)',
    accentBorder: 'rgba(46,139,87,0.16)',
    description: 'Production de connaissance sur la régulation en Afrique francophone. 4 observatoires thématiques, 12 indices KOS, 16 publications annuelles.',
    products: [
      { name: 'Observatoire COBAC', desc: 'Veille et analyse de la régulation bancaire CEMAC', icon: 'ri-bank-line', badge: 'Quarterly' },
      { name: 'Observatoire BCEAO', desc: 'Suivi des évolutions réglementaires UEMOA', icon: 'ri-building-2-line', badge: 'Quarterly' },
      { name: 'Observatoire FinTech', desc: 'Cartographie de l\'écosystème FinTech africain', icon: 'ri-smartphone-line', badge: 'Semi-Annual' },
      { name: 'Observatoire Gouvernance', desc: 'Benchmarks de gouvernance en Afrique francophone', icon: 'ri-government-line', badge: 'Annual' },
    ],
    stats: [
      { value: '4', label: 'Observatoires' },
      { value: '16', label: 'Publications/an' },
    ],
    href: '/bu4-african-observatory/',
    ctaLabel: 'Explorer BU4',
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="4 Business Units — Intelligence Réglementaire Afrique | KOS"
        description="KOS structure son offre en 4 Business Units : Régulation Financière, Due Diligence, RegTech, Observatoire Africain. 17 pays UEMOA/CEMAC. Devis confidentiel sur mesure."
        keywords="KOS business units, intelligence réglementaire Afrique, due diligence, RegTech, observatoire africain, BCEAO, COBAC, conformité Afrique francophone, devis confidentiel"
        canonicalPath="/services"
        ogType="website"
        structuredData={servicesSchema}
      />
      <Navigation />

      <main id="main-content" className="pt-28">

        {/* ═══ HERO — 4 BUs Plateforme ═══ */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-background-900 via-background-800 to-background-900">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 65%)' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <BigFourSubtitleBar variant="centered-pillars" accentColor="primary" icon="ri-global-line">
                KOS — Francophone Africa Regulatory Intelligence Platform™
              </BigFourSubtitleBar>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                4 Business Units.
                <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #6B9B1F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Une plateforme d'intelligence réglementaire.</span>
              </h1>
              <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed text-foreground-300">
                De la veille réglementaire à la due diligence, des solutions technologiques à l'observatoire africain. KOS est la première plateforme intégrée d'intelligence réglementaire pour l'Afrique francophone. <strong className="text-white font-semibold">Chaque mission fait l'objet d'un devis confidentiel sur mesure.</strong>
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #a5d936 100%)', color: '#080c14', boxShadow: '0 8px 32px rgba(107,155,31,0.35)' }}>
                  <i className="ri-mail-send-line text-lg" />
                  Demander un devis confidentiel
                </button>
                <button onClick={() => navigate('/diagnostic-flash')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:-translate-y-0.5" style={{ color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}>
                  <i className="ri-flashlight-line" />
                  Diagnostic Flash gratuit
                </button>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/8">
                {[
                  { value: '17', label: 'Pays UEMOA/CEMAC', icon: 'ri-global-line' },
                  { value: '4', label: 'Business Units', icon: 'ri-stack-line' },
                  { value: '22+', label: 'Ans d\'expertise', icon: 'ri-award-line' },
                  { value: 'Dev.', label: 'Confidentiel', icon: 'ri-lock-line' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <i className={`${s.icon} text-lg mb-2 block`} style={{ color: '#86BC25' }} />
                    <div className="font-heading text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs mt-1 text-foreground-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4 BUSINESS UNITS ═══ */}
        <section className="py-16 md:py-24 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-stack-line">
                Architecture KOS — 4 Business Units
              </BigFourSubtitleBar>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Des services conçus pour l'intelligence réglementaire en Afrique</h2>
              <p className="text-base max-w-2xl mx-auto text-foreground-600">
                Chaque BU adresse un besoin spécifique du marché. Devis confidentiel sur mesure pour chaque mission.
              </p>
            </div>

            <div className="space-y-8">
              {fourBUs.map((bu, idx) => (
                <div key={bu.id} className="rounded-2xl p-6 md:p-8 transition-all duration-300 bg-white" style={{ border: '1px solid rgba(134,188,37,0.06)' }}>
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: BU Identity */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: bu.accentBg, border: `1px solid ${bu.accentBorder}` }}>
                          <i className={`${bu.icon} text-xl`} style={{ color: bu.accent }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-foreground-400">{bu.number}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: bu.accentBg, color: bu.accent }}>{bu.tagline.split('·')[0].trim()}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground-950">{bu.label}</h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed mb-5 text-foreground-600">{bu.description}</p>
                      <div className="flex items-center gap-5 mb-5">
                        {bu.stats.map((stat, si) => (
                          <div key={si}>
                            <span className="text-lg font-bold block" style={{ color: bu.accent }}>{stat.value}</span>
                            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-400">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => navigate(bu.href)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#ffffff' }}>
                        {bu.ctaLabel}
                        <i className="ri-arrow-right-line" />
                      </button>
                    </div>

                    {/* Right: Products */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bu.products.map((product, pi) => (
                        <div key={pi} className="group rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer" style={{ background: bu.accentBg, border: `1px solid ${bu.accentBorder}` }} onClick={() => navigate(bu.href)}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 bg-white/90" style={{ border: `1px solid ${bu.accentBorder}` }}>
                              <i className={`${product.icon} text-base`} style={{ color: bu.accent }} />
                            </div>
                            {product.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${bu.accent}20`, color: bu.accent }}>{product.badge}</span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold mb-1 text-foreground-950">{product.name}</h4>
                          <p className="text-xs leading-relaxed text-foreground-500">{product.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ POURQUOI KOS — DIFFÉRENCIATEURS ═══ */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Pourquoi choisir KOS ?</h2>
              <p className="text-base max-w-2xl mx-auto text-foreground-600">Une plateforme, quatre Business Units, un seul interlocuteur pour toute votre intelligence réglementaire en Afrique francophone.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'ri-global-line', title: 'Couverture Panafricaine', desc: '17 pays UEMOA/CEMAC, 8 régulateurs suivis en continu, présence terrain depuis 22 ans.', accent: '#86BC25' },
                { icon: 'ri-stack-line', title: 'Plateforme Intégrée', desc: 'De la veille aux solutions technologiques, de la due diligence à l\'observatoire — un écosystème cohérent.', accent: '#D4AF37' },
                { icon: 'ri-lock-line', title: 'Devis Confidentiel', desc: 'Chaque mission est unique. Pas de grille tarifaire standard — proposition sur mesure après diagnostic.', accent: '#6B9B1F' },
                { icon: 'ri-shield-check-line', title: 'Exigence Institutionnelle', desc: 'Méthodologies structurées inspirées des meilleures pratiques internationales, adaptées au contexte réglementaire africain. Livrables documentés, traçabilité totale.', accent: '#2E8B57' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 bg-background-50" style={{ border: '1px solid rgba(134,188,37,0.06)' }}>
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl mb-4" style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}25` }}>
                    <i className={`${item.icon} text-xl`} style={{ color: item.accent }} />
                  </div>
                  <h4 className="font-heading text-base font-bold mb-2 text-foreground-950">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-foreground-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BILINGUAL BU CROSS-LINKS ═══ */}
        <BUBilingualCrossLinks />

        {/* ═══ PROCESSUS — Comment ça marche ═══ */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-route-line">
                Processus
              </BigFourSubtitleBar>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Comment démarrer avec KOS</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: 'ri-chat-3-line', title: 'Échange exploratoire', desc: '30 minutes avec un Directeur BU pour comprendre votre contexte.', accent: '#86BC25' },
                { step: '02', icon: 'ri-search-eye-line', title: 'Diagnostic contextuel', desc: 'Analyse de votre exposition réglementaire et besoins spécifiques.', accent: '#D4AF37' },
                { step: '03', icon: 'ri-file-text-line', title: 'Devis confidentiel', desc: 'Proposition commerciale détaillée sous 72 heures.', accent: '#6B9B1F' },
                { step: '04', icon: 'ri-rocket-line', title: 'Déploiement', desc: 'Équipe dédiée, méthodologie KOS, livrables documentés.', accent: '#2E8B57' },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl mb-4" style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}25` }}>
                    <i className={`${item.icon} text-2xl`} style={{ color: item.accent }} />
                  </div>
                  <div className="absolute top-2 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: item.accent }}>{item.step}</div>
                  <h4 className="font-heading text-base font-bold mb-2 text-foreground-950">{item.title}</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 -right-3 text-lg" style={{ color: 'rgba(134,188,37,0.3)' }}>
                      <i className="ri-arrow-right-line" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <ServicesContact />

        {/* ═══ SHARE ═══ */}
        <section className="py-12 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SocialSharePremium
              url={`${SITE_URL}/services/`}
              title="KOS — 4 Business Units | Intelligence Réglementaire, Due Diligence, Solutions Technologiques & Observatoire"
              description="Plateforme d'Intelligence Réglementaire pour l'Afrique francophone. 4 Business Units. Devis confidentiel sur mesure."
              variant="horizontal"
              className="justify-center"
            />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}