import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SitemapSection } from './components/SitemapSection';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CATEGORIES = [
  {
    id: 'principales',
    title: 'Pages principales',
    icon: 'ri-home-4-line',
    accentColor: 'dark',
    links: [
      { label: 'Accueil', href: '/', description: 'Page d\'accueil KHEPRA EXPERTS' },
      { label: 'À propos', href: '/about', description: 'Notre histoire, mission et valeurs' },
      { label: 'Services', href: '/services', description: 'Nos 10 domaines d\'expertise' },
      { label: 'Approche', href: '/approche', description: 'Notre méthodologie de conseil' },
      { label: 'Industries', href: '/industries', description: 'Secteurs d\'activité accompagnés' },
      { label: 'Insights', href: '/insights', description: 'Analyses et publications stratégiques' },
      { label: 'Blog', href: '/blog', description: 'Articles et actualités' },
      { label: 'Études de cas', href: '/case-studies', description: 'Nos réalisations clients' },
      { label: 'Ressources', href: '/resources', description: 'Guides et documents téléchargeables' },
      { label: 'Industries', href: '/industries', description: 'Secteurs d\'activité accompagnés' },
      { label: 'Rapport CA gratuit', href: '/board-report', description: 'Générez votre rapport du Conseil d\'Administration', badge: 'Gratuit' },
      { label: 'Partenaires', href: '/partenaires', description: 'Nos partenaires stratégiques' },
      { label: 'Équipe', href: '/equipe', description: 'Notre équipe d\'experts' },
      { label: 'Contact', href: '/contact', description: 'Nous contacter' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    icon: 'ri-briefcase-4-line',
    accentColor: 'gold',
    links: [
      { label: 'Conseil Stratégique', href: '/services/conseil-strategique', description: 'Accompagnement stratégique sur mesure', badge: 'Phare' },
      { label: 'Transformation Digitale', href: '/services/transformation-digitale', description: 'Accompagnement à la digitalisation', badge: 'Phare' },
      { label: 'Gestion de Projets', href: '/services/gestion-de-projets', description: 'Pilotage et coordination de projets' },
      { label: 'Développement Organisationnel', href: '/services/developpement-organisationnel', description: 'Structuration et performance organisationnelle' },
      { label: 'Renforcement des Capacités', href: '/services/renforcement-capacites', description: 'Formation et montée en compétences' },
      { label: 'Diagnostic Organisationnel', href: '/services/diagnostic-organisationnel', description: 'Évaluation approfondie de l\'organisation' },
      { label: 'Audit Social', href: '/services/audit-social', description: 'Audit des pratiques sociales et RH' },
      { label: 'Ressources Humaines', href: '/services/ressources-humaines', description: 'Gestion et optimisation des RH' },
      { label: 'Communication Stratégique', href: '/services/communication-strategique', description: 'Stratégie de communication institutionnelle' },
      { label: 'Levée de Fonds', href: '/services/levee-de-fonds', description: 'Accompagnement au financement' },
    ],
  },
  {
    id: 'industries',
    title: 'Industries',
    icon: 'ri-building-2-line',
    accentColor: 'green',
    links: [
      { label: 'Microfinance & SFD', href: '/industries/microfinance', description: 'Accompagnement des institutions de microfinance' },
      { label: 'PME & Startups', href: '/industries/pme', description: 'Structuration et croissance des PME' },
      { label: 'Secteur Public', href: '/industries/public-sector', description: 'Modernisation des institutions publiques' },
      { label: 'Fintech & Innovation', href: '/industries/fintech', description: 'Lancement et scaling de fintechs' },
    ],
  },
  {
    id: 'regions',
    title: 'Régions géographiques',
    icon: 'ri-map-pin-2-line',
    accentColor: 'teal',
    links: [
      { label: 'Afrique', href: '/regions/afrique', description: 'Vue d\'ensemble du continent africain' },
      { label: 'Afrique francophone', href: '/regions/afrique-francophone', description: 'Expertise dans 15+ pays francophones' },
      { label: 'Afrique de l\'Ouest', href: '/regions/west-africa', description: 'Présence renforcée en Afrique de l\'Ouest' },
      { label: 'UEMOA & CEMAC', href: '/regions/uemoa-cemac', description: 'Conformité réglementaire BCEAO/BEAC' },
      { label: 'Africa (EN)', href: '/regions/africa', description: 'Africa regional expertise (English)' },
    ],
  },
  {
    id: 'outils',
    title: 'Outils interactifs',
    icon: 'ri-tools-line',
    accentColor: 'gold',
    links: [
      { label: 'Diagnostic organisationnel', href: '/tools/diagnostic-organisationnel', description: 'Évaluez la performance de votre organisation', badge: 'Gratuit' },
      { label: 'Maturité digitale', href: '/tools/maturite-digitale', description: 'Mesurez votre niveau de digitalisation', badge: 'Gratuit' },
      { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance', description: 'Auditez votre gouvernance d\'entreprise', badge: 'Gratuit' },
      { label: 'Diagnostic transformation digitale', href: '/tools/diagnostic-transformation-digitale', description: 'Évaluez votre transformation digitale', badge: 'Gratuit' },
      { label: 'Évaluation maturité fintech', href: '/tools/evaluation-maturite-fintech', description: 'Benchmark fintech UEMOA', badge: 'Gratuit' },
      { label: 'Audit inclusion financière', href: '/tools/audit-inclusion-financiere', description: 'Conformité BCEAO/UEMOA', badge: 'Gratuit' },
      { label: 'Évaluation cybersécurité', href: '/tools/evaluation-cybersecurite', description: 'Audit de votre posture cybersécurité', badge: 'Gratuit' },
      { label: 'Tous les outils', href: '/tools', description: 'Accéder à tous les outils diagnostics' },
    ],
  },
  {
    id: 'contenus',
    title: 'Contenus & Ressources',
    icon: 'ri-file-text-line',
    accentColor: 'green',
    links: [
      { label: 'Blog', href: '/blog', description: 'Articles et analyses sectorielles' },
      { label: 'Publications', href: '/publications', description: 'Rapports et publications officielles' },
      { label: 'Ressources téléchargeables', href: '/resources', description: 'Guides, templates et outils PDF' },
      { label: 'Livres blancs', href: '/whitepapers', description: 'Études approfondies et recherches' },
      // Désactivé temporairement — page /formations non publique
      // { label: 'Formations', href: '/formations', description: 'Programmes de formation professionnelle' },
      { label: 'Études de cas', href: '/case-studies', description: 'Retours d\'expérience clients' },
    ],
  },
  {
    id: 'piliers',
    title: 'Pages piliers (SEO)',
    icon: 'ri-article-line',
    accentColor: 'teal',
    links: [
      { label: 'Transformation digitale Afrique', href: '/pillar/digital-transformation-africa', description: 'Guide complet transformation digitale' },
      { label: 'Inclusion financière Afrique', href: '/pillar/financial-inclusion-africa', description: 'Stratégies d\'inclusion financière' },
      { label: 'Fintech Advisory Africa', href: '/pillar/fintech-advisory-africa', description: 'Conseil fintech en Afrique' },
      { label: 'Microfinance Transformation', href: '/pillar/microfinance-transformation-africa', description: 'Modernisation des SFD' },
      { label: 'SME Development Africa', href: '/pillar/sme-development-africa', description: 'Développement des PME africaines' },
    ],
  },
  {
    id: 'specialisees',
    title: 'Pages spécialisées',
    icon: 'ri-star-line',
    accentColor: 'gold',
    links: [
      { label: 'Rapport CA gratuit', href: '/board-report', description: 'Générez votre rapport du Conseil d\'Administration', badge: 'Gratuit' },
      { label: 'Offre commerciale premium', href: '/offre-commerciale', description: 'Programmes Executive sur-mesure', badge: 'Premium' },
      { label: 'Décideurs & Dirigeants', href: '/decideurs', description: 'Solutions pour dirigeants et décideurs' },
      { label: 'SFD Conformité', href: '/sfd-conformite', description: 'Accompagnement conformité SFD' },
      // Désactivé temporairement — page /formations non publique
      // { label: 'Formations', href: '/formations', description: 'Programmes de formation professionnelle' },
      { label: 'Rapport stratégique', href: '/strategic-report', description: 'Rapport stratégique annuel' },
      { label: 'Solutions', href: '/solutions', description: 'Solutions intégrées Khepra' },
      { label: 'Experts', href: '/experts', description: 'Notre réseau d\'experts' },
      { label: 'Expertises', href: '/expertises', description: 'Domaines d\'expertise détaillés' },
      { label: 'Carrières', href: '/careers', description: 'Rejoindre KHEPRA EXPERTS' },
      { label: 'Mon espace', href: '/mon-espace', description: 'Espace client personnel' },
    ],
  },
  {
    id: 'legal',
    title: 'Informations légales',
    icon: 'ri-shield-check-line',
    accentColor: 'dark',
    links: [
      { label: 'Mentions légales', href: '/legal', description: 'Informations légales et CGU' },
      { label: 'Politique de confidentialité', href: '/privacy/', description: 'Protection des données personnelles' },
    ],
  },
];

const TOTAL_PAGES = CATEGORIES.reduce((acc, cat) => acc + cat.links.length, 0);

const ogSiteUrl = `${SITE_URL}/`;

const SHARE_LINKS = [
  {
    name: 'Facebook',
    icon: 'ri-facebook-fill',
    color: 'bg-[#1877F2] hover:bg-[#166FE5]',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ogSiteUrl)}&quote=${encodeURIComponent('KHEPRA EXPERTS — Cabinet de conseil stratégique de référence en Afrique francophone. Gouvernance, transformation digitale, inclusion financière.')}`,
  },
  {
    name: 'LinkedIn',
    icon: 'ri-linkedin-fill',
    color: 'bg-[#0A66C2] hover:bg-[#0958A8]',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogSiteUrl)}`,
  },
  {
    name: 'WhatsApp',
    icon: 'ri-whatsapp-fill',
    color: 'bg-[#25D366] hover:bg-[#1EBE5A]',
    url: `https://wa.me/?text=${encodeURIComponent('KHEPRA EXPERTS — Cabinet de conseil stratégique en Afrique francophone : ' + SITE_URL)}`,
  },
  {
    name: 'X / Twitter',
    icon: 'ri-twitter-x-fill',
    color: 'bg-[#0f0f0f] hover:bg-[#333]',
    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(ogSiteUrl)}&text=${encodeURIComponent('KHEPRA EXPERTS — Cabinet de conseil stratégique de référence en Afrique francophone. Gouvernance, transformation digitale, inclusion financière.')}`,
  },
  {
    name: 'Email',
    icon: 'ri-mail-fill',
    color: 'bg-gray-600 hover:bg-gray-700',
    url: `mailto:?subject=${encodeURIComponent('KHEPRA EXPERTS — Cabinet Conseil Stratégie Afrique')}&body=${encodeURIComponent('Découvrez KHEPRA EXPERTS, cabinet de conseil stratégique de référence en Afrique francophone : ' + SITE_URL)}`,
  },
];

const schemaJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/sitemap#webpage`,
      url: `${SITE_URL}/sitemap`,
      name: 'Plan du site — Toutes les pages | KHEPRA EXPERTS',
      description: 'Plan du site complet KHEPRA EXPERTS : services, industries, régions, outils interactifs, blog, ressources. Navigation facilitée vers toutes nos pages.',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/sitemap#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Plan du site' },
      ],
    },
  ],
};

export default function SitemapPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SITE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <SeoHead
        title="Plan du site — Toutes les pages | KHEPRA EXPERTS"
        description="Plan du site complet KHEPRA EXPERTS : services, industries, régions, outils interactifs, blog, ressources. Navigation facilitée vers toutes nos pages."
        keywords="plan du site, sitemap, navigation, services conseil Afrique, outils diagnostic, ressources"
        canonicalPath="/sitemap"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        ogLocale="fr_FR"
        structuredData={schemaJson}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-foreground-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, oklch(var(--accent-400)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(var(--primary-600)) 0%, transparent 40%)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Plan du site' },
            ]}
          />
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-background-50/10 text-foreground-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4 border border-background-50/10">
                <i className="ri-map-2-line text-accent-400"></i>
                Navigation complète du site
              </div>
              <h1 className="font-space-grotesk text-4xl lg:text-5xl font-bold text-background-50 mb-3">
                Plan du site
              </h1>
              <p className="text-lg text-foreground-300 max-w-2xl">
                Accédez rapidement à toutes les pages et ressources de KHEPRA EXPERTS — organisées par catégorie pour une navigation intuitive.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
              {[
                { value: String(TOTAL_PAGES) + '+', label: 'Pages', icon: 'ri-pages-line' },
                { value: String(CATEGORIES.length), label: 'Catégories', icon: 'ri-grid-line' },
                { value: '15+', label: 'Pays couverts', icon: 'ri-global-line' },
              ].map((stat, i) => (
                <div key={i} className="bg-background-50/5 border border-background-50/10 rounded-xl px-5 py-3 text-center min-w-[90px]">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <i className={`${stat.icon} text-accent-400 text-lg`}></i>
                  </div>
                  <div className="text-2xl font-bold text-background-50">{stat.value}</div>
                  <div className="text-xs text-foreground-400 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share bar */}
      <div className="bg-background-50 border-b border-secondary-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-foreground-500">
            <i className="ri-share-line text-accent-400"></i>
            <span className="font-medium text-foreground-700">Partager ce site :</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {SHARE_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${s.color}`}
                title={`Partager sur ${s.name}`}
              >
                <i className={`${s.icon} text-sm`}></i>
                <span className="hidden sm:inline">{s.name}</span>
              </a>
            ))}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-secondary-100 hover:bg-secondary-200 text-foreground-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
              title="Copier le lien"
            >
              <i className={copied ? 'ri-check-line text-primary-600' : 'ri-link text-sm'}></i>
              <span className="hidden sm:inline">{copied ? 'Copié !' : 'Copier le lien'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-14 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-background-50 border border-secondary-200 text-foreground-600 hover:border-accent-300 hover:text-accent-700 hover:bg-accent-50 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className={`${cat.icon} text-sm`}></i>
                {cat.title}
              </a>
            ))}
          </div>

          {/* Grid by category */}
          <div className="space-y-10">
            {/* Row 1: Pages principales + Services */}
            <div id="principales" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-accent-400 flex-shrink-0"></span>
                <h2 className="text-xs font-bold text-foreground-400 uppercase tracking-widest">Navigation principale</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <SitemapSection
                  title={CATEGORIES[0].title}
                  icon={CATEGORIES[0].icon}
                  links={CATEGORIES[0].links}
                  accentColor={CATEGORIES[0].accentColor}
                  count={CATEGORIES[0].links.length}
                />
                <div id="services" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[1].title}
                    icon={CATEGORIES[1].icon}
                    links={CATEGORIES[1].links}
                    accentColor={CATEGORIES[1].accentColor}
                    count={CATEGORIES[1].links.length}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Industries + Régions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-primary-500 flex-shrink-0"></span>
                <h2 className="text-xs font-bold text-foreground-400 uppercase tracking-widest">Secteurs & Géographies</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div id="industries" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[2].title}
                    icon={CATEGORIES[2].icon}
                    links={CATEGORIES[2].links}
                    accentColor={CATEGORIES[2].accentColor}
                    count={CATEGORIES[2].links.length}
                  />
                </div>
                <div id="regions" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[3].title}
                    icon={CATEGORIES[3].icon}
                    links={CATEGORIES[3].links}
                    accentColor={CATEGORIES[3].accentColor}
                    count={CATEGORIES[3].links.length}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Outils + Contenus */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-primary-500 flex-shrink-0"></span>
                <h2 className="text-xs font-bold text-foreground-400 uppercase tracking-widest">Outils & Contenus</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div id="outils" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[4].title}
                    icon={CATEGORIES[4].icon}
                    links={CATEGORIES[4].links}
                    accentColor={CATEGORIES[4].accentColor}
                    count={CATEGORIES[4].links.length}
                  />
                </div>
                <div id="contenus" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[5].title}
                    icon={CATEGORIES[5].icon}
                    links={CATEGORIES[5].links}
                    accentColor={CATEGORIES[5].accentColor}
                    count={CATEGORIES[5].links.length}
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Piliers + Spécialisées + Légal */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full bg-secondary-400 flex-shrink-0"></span>
                <h2 className="text-xs font-bold text-foreground-400 uppercase tracking-widest">Pages avancées & Légal</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div id="piliers" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[6].title}
                    icon={CATEGORIES[6].icon}
                    links={CATEGORIES[6].links}
                    accentColor={CATEGORIES[6].accentColor}
                    count={CATEGORIES[6].links.length}
                  />
                </div>
                <div id="specialisees" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[7].title}
                    icon={CATEGORIES[7].icon}
                    links={CATEGORIES[7].links}
                    accentColor={CATEGORIES[7].accentColor}
                    count={CATEGORIES[7].links.length}
                  />
                </div>
                <div id="legal" className="scroll-mt-20">
                  <SitemapSection
                    title={CATEGORIES[8].title}
                    icon={CATEGORIES[8].icon}
                    links={CATEGORIES[8].links}
                    accentColor={CATEGORIES[8].accentColor}
                    count={CATEGORIES[8].links.length}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 bg-foreground-950 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-background-50 mb-2">Vous ne trouvez pas ce que vous cherchez ?</h3>
              <p className="text-foreground-300 text-sm">Notre équipe est disponible pour vous orienter vers la bonne ressource.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contact@khepraexperts.com"
                className="inline-flex items-center gap-2 bg-accent-400 hover:bg-accent-300 text-background-50 font-semibold px-6 py-3 rounded-full transition-all cursor-pointer whitespace-nowrap text-sm"
              >
                <i className="ri-mail-line"></i>
                Nous écrire
              </a>
              <a
                href="tel:+22893984909"
                className="inline-flex items-center gap-2 bg-background-50/10 hover:bg-background-50/20 text-background-50 font-semibold px-6 py-3 rounded-full transition-all cursor-pointer whitespace-nowrap text-sm border border-background-50/20"
              >
                <i className="ri-phone-line"></i>
                +228 93 98 49 09
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-background-50/5 hover:bg-background-50/10 text-foreground-300 hover:text-background-50 font-medium px-5 py-3 rounded-full transition-all cursor-pointer whitespace-nowrap text-sm border border-background-50/10"
              >
                <i className="ri-code-line"></i>
                Sitemap XML
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
