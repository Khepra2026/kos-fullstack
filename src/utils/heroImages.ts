/**
 * Mapping centralisé de TOUTES les images critiques du site
 * Catégories : hero, team, testimonials, about, services, expertise
 *
 * Chaque clé = identifiant unique de l'image
 * Chaque valeur = chemin local WebP dans /public/images/ + fallback readdy.ai
 *
 * Quand une image locale existe, elle est servie directement.
 * Sinon, le fallback vers readdy.ai est utilisé automatiquement.
 */

export interface HeroImageConfig {
  /** Chemin local WebP (relatif à /public) */
  local: string;
  /** URL readdy.ai de fallback */
  fallback: string;
  /** Largeur intrinsèque */
  width: number;
  /** Hauteur intrinsèque */
  height: number;
  /** Alt text FR */
  altFr: string;
  /** Alt text EN */
  altEn: string;
}

// ─────────────────────────────────────────────
// HERO PAGES
// ─────────────────────────────────────────────
const HERO_PAGE_IMAGES: Record<string, HeroImageConfig> = {
  'home-hero-bg': {
    local: '/images/hero-home-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=dramatic%20aerial%20view%20of%20modern%20African%20financial%20district%20at%20golden%20hour%20with%20sleek%20glass%20skyscrapers%20reflecting%20warm%20golden%20light%20against%20deep%20black%20sky%20Abidjan%20Lagos%20Nairobi%20skyline%20ultra%20sharp%20cinematic%20drone%20shot%20luxury%20corporate%20architecture%20emerald%20green%20glass%20facades%20gold%20metallic%20accents%20premium%20business%20hub%20Africa%20prosperity%20growth&width=1920&height=1080&seq=hero-noir-vert-or-2025&orientation=landscape',
    width: 1920,
    height: 1080,
    altFr: 'KHEPRA EXPERTS — Conseil Stratégique Afrique',
    altEn: 'KHEPRA EXPERTS — Strategic Advisory Africa',
  },
  'home-hero-infographic': {
    local: '/images/hero-home-infographic.webp',
    fallback: 'https://readdy.ai/api/search-image?query=abstract%20Africa%20continent%20silhouette%20glowing%20network%20nodes%20connections%20data%20visualization%20dark%20background%20emerald%20green%20gold%20tones%20pan-african%20business%20connectivity%20digital%20transformation%20modern%20infographic%20minimal&width=600&height=400&seq=hero-infographic-noir-or-v3&orientation=landscape',
    width: 600,
    height: 400,
    altFr: '',
    altEn: '',
  },
  'about-hero-bg': {
    local: '/images/hero-about-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20african%20business%20consultants%20team%20in%20modern%20bright%20office%20Lome%20Togo%2C%20diverse%20group%20of%20experts%20in%20elegant%20business%20attire%20collaborating%20around%20conference%20table%20with%20strategic%20documents%20and%20laptops%2C%20warm%20natural%20lighting%20through%20large%20windows%2C%20contemporary%20workspace%20with%20plants%20and%20african%20art%2C%20authentic%20corporate%20photography%20showing%20expertise%20and%20professionalism&width=1920&height=1080&seq=about-hero-khepra-authority-v3&orientation=landscape',
    width: 1920,
    height: 1080,
    altFr: 'Équipe KHEPRA EXPERTS - Cabinet de conseil stratégique à Lomé, Togo',
    altEn: 'KHEPRA EXPERTS Team - Strategic Advisory Firm in Lomé, Togo',
  },
  'services-hero-bg': {
    local: '/images/hero-services-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20african%20business%20consultants%20presenting%20strategic%20solutions%20to%20corporate%20executives%20in%20modern%20boardroom%20elegant%20conference%20setting%20with%20financial%20charts%20and%20governance%20frameworks%20warm%20professional%20lighting%20diverse%20team%20of%20experts%20collaborative%20atmosphere%20high%20quality%20business%20photography%20conveying%20trust%20expertise%20and%20transformation&width=1400&height=600&seq=services-hero-premium-001&orientation=landscape',
    width: 1400,
    height: 600,
    altFr: 'Services KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Services',
  },
  'case-studies-hero-bg': {
    local: '/images/hero-case-studies-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=modern%20African%20financial%20district%20aerial%20view%20with%20glass%20office%20towers%20and%20business%20professionals%20walking%20in%20Lome%20Togo%20city%20center%2C%20warm%20golden%20hour%20sunlight%20casting%20long%20shadows%20on%20contemporary%20architecture%2C%20vibrant%20economic%20hub%20atmosphere%20with%20lush%20tropical%20greenery%20interspersed%20between%20buildings%2C%20high%20altitude%20drone%20photography%20with%20rich%20warm%20tones%20and%20deep%20blue%20sky%2C%20professional%20corporate%20cityscape%20photography%20showcasing%20West%20African%20economic%20growth%20and%20prosperity&width=1600&height=700&seq=case-studies-hero-v1&orientation=landscape',
    width: 1600,
    height: 700,
    altFr: 'Études de cas KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Case Studies',
  },
  'contact-hero-bg': {
    local: '/images/hero-contact-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=modern%20professional%20office%20workspace%20with%20african%20business%20professionals%20collaborating%20on%20strategic%20planning%20clean%20minimalist%20background%20natural%20lighting%20corporate%20atmosphere&width=1920&height=800&seq=contact-hero-bg&orientation=landscape',
    width: 1920,
    height: 800,
    altFr: 'Contact KHEPRA EXPERTS',
    altEn: 'Contact KHEPRA EXPERTS',
  },
  'careers-hero-bg': {
    local: '/images/hero-careers-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=abstract%20professional%20business%20team%20collaboration%20pattern%20with%20connecting%20lines%20on%20dark%20background%2C%20modern%20corporate%20texture%2C%20elegant%20design%20suggesting%20growth%20and%20opportunity&width=1920&height=600&seq=careers-hero-bg-v1&orientation=landscape',
    width: 1920,
    height: 600,
    altFr: 'Carrières KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Careers',
  },
  'careers-cta-bg': {
    local: '/images/hero-careers-cta.webp',
    fallback: 'https://readdy.ai/api/search-image?query=abstract%20professional%20business%20growth%20pattern%20with%20upward%20arrows%20on%20dark%20background%2C%20modern%20corporate%20texture%2C%20elegant%20design&width=1920&height=400&seq=careers-cta-bg-v1&orientation=landscape',
    width: 1920,
    height: 400,
    altFr: '',
    altEn: '',
  },
};

// ─────────────────────────────────────────────
// TEAM IMAGES
// ─────────────────────────────────────────────
const TEAM_IMAGES: Record<string, HeroImageConfig> = {
  'team-founder': {
    local: '/images/team-founder-real.webp',
    fallback: 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg',
    width: 400,
    height: 500,
    altFr: 'SIMDA Essoyomèwè - Directeur Associé & Fondateur, KHEPRA EXPERTS',
    altEn: 'SIMDA Essoyomèwè - Associate Director & Founder, KHEPRA EXPERTS',
  },
  'team-member-1': {
    local: '/images/team-member-1-real.webp',
    fallback: 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg',
    width: 400,
    height: 480,
    altFr: 'SIMDA Essoyomèwè - Directeur Associé & Fondateur, KHEPRA EXPERTS',
    altEn: 'SIMDA Essoyomèwè - Associate Director & Founder, KHEPRA EXPERTS',
  },
  'team-member-2': {
    local: '/images/team-member-2.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20male%20consultant%20portrait%2C%20business%20attire%2C%20office%20background%2C%20corporate%20photography%2C%20confident%20expression&width=400&height=480&seq=team2&orientation=portrait',
    width: 400,
    height: 480,
    altFr: 'Expert en gestion de projets KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Project Management Expert',
  },
  'team-member-3': {
    local: '/images/team-member-3.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20female%20executive%20portrait%2C%20business%20suit%2C%20warm%20smile%2C%20neutral%20background%2C%20corporate%20photography&width=400&height=480&seq=team3&orientation=portrait',
    width: 400,
    height: 480,
    altFr: 'Experte RH KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS HR Expert',
  },
  'exit-popup-consultant': {
    local: '/images/team-exit-popup.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20business%20consultant%20in%20modern%20office%20Lome%20Togo%20holding%20documents%20confident%20smile%20warm%20neutral%20background%20corporate%20attire%20natural%20light%20clean%20minimal%20setting%20high%20quality%20portrait&width=176&height=320&seq=exit-popup-img-01&orientation=portrait',
    width: 176,
    height: 320,
    altFr: 'Consultant KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Consultant',
  },
};

// ─────────────────────────────────────────────
// TESTIMONIAL IMAGES
// ─────────────────────────────────────────────
const TESTIMONIAL_IMAGES: Record<string, HeroImageConfig> = {
  'testimonial-amina': {
    local: '/images/testimonial-amina.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20businesswoman%20CEO%20microfinance%20director%20confident%20smile%20modern%20office%20Benin%20West%20Africa%20corporate%20attire%20natural%20light%20warm%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-amina-01&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Directrice Générale, Institution Microfinance, Bénin',
    altEn: 'Chief Executive Officer, Microfinance Institution, Benin',
  },
  'testimonial-kofi': {
    local: '/images/testimonial-kofi.webp',
    fallback: 'https://readdy.ai/api/search-image?query=young%20African%20entrepreneur%20tech%20startup%20founder%20confident%20smile%20modern%20workspace%20Ghana%20West%20Africa%20casual%20business%20attire%20natural%20light%20innovative%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-kofi-02&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Directeur Général, Startup AgriTech, Ghana',
    altEn: 'Managing Director, AgriTech Startup, Ghana',
  },
  'testimonial-marie': {
    local: '/images/testimonial-marie.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20businesswoman%20CFO%20financial%20director%20confident%20smile%20modern%20office%20Ivory%20Coast%20West%20Africa%20elegant%20business%20suit%20natural%20light%20corporate%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-marie-03&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Directrice Financière, Groupe Industriel, Côte d\'Ivoire',
    altEn: 'CFO, Industrial Group, Ivory Coast',
  },
  'testimonial-ibrahim': {
    local: '/images/testimonial-ibrahim.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20businessman%20managing%20director%20transport%20logistics%20confident%20smile%20modern%20office%20Burkina%20Faso%20West%20Africa%20business%20attire%20natural%20light%20professional%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-ibrahim-04&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Directeur Général, PME Transport & Logistique, Afrique de l\'Ouest',
    altEn: 'General Manager, SME Transport & Logistics, West Africa',
  },
  'testimonial-fatou': {
    local: '/images/testimonial-fatou.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20businesswoman%20president%20women%20entrepreneurs%20network%20confident%20smile%20modern%20office%20Senegal%20West%20Africa%20elegant%20attire%20natural%20light%20inspiring%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-fatou-05&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Présidente, Réseau d\'Entrepreneurs, Sénégal',
    altEn: 'President, Entrepreneurs Network, Senegal',
  },
  'testimonial-kwame': {
    local: '/images/testimonial-kwame.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20African%20executive%20director%20NGO%20development%20expert%20confident%20smile%20modern%20office%20Ghana%20West%20Africa%20formal%20business%20attire%20natural%20light%20professional%20background%20high%20quality%20portrait&width=120&height=120&seq=testimonial-kwame-06&orientation=squarish',
    width: 120,
    height: 120,
    altFr: 'Directeur Exécutif, ONG Développement, Afrique de l\'Ouest',
    altEn: 'Executive Director, Development NGO, West Africa',
  },
};

// ─────────────────────────────────────────────
// ABOUT / MISSION / PRESENCE IMAGES
// ─────────────────────────────────────────────
const ABOUT_IMAGES: Record<string, HeroImageConfig> = {
  'about-mission': {
    local: '/images/about-mission.webp',
    fallback: 'https://readdy.ai/api/search-image?query=professional%20african%20business%20strategy%20meeting%20in%20bright%20modern%20boardroom%2C%20diverse%20team%20of%20consultants%20reviewing%20charts%20and%20strategic%20documents%20on%20large%20screen%2C%20collaborative%20atmosphere%20with%20natural%20light%2C%20contemporary%20office%20interior%20with%20plants%20and%20wooden%20accents%2C%20authentic%20corporate%20photography%20showing%20leadership%20and%20vision&width=700&height=520&seq=about-mission-khepera-v1&orientation=landscape',
    width: 700,
    height: 520,
    altFr: 'Mission KHEPRA EXPERTS - Conseil stratégique Afrique',
    altEn: 'KHEPRA EXPERTS Mission - Strategic Advisory Africa',
  },
  'about-presence-map': {
    local: '/images/about-presence-map.webp',
    fallback: 'https://readdy.ai/api/search-image?query=detailed%20illustrated%20map%20of%20Africa%20highlighting%20West%20Africa%20and%20Central%20Africa%20regions%20with%20golden%20glowing%20dots%20on%20major%20cities%2C%20dark%20navy%20background%20with%20subtle%20grid%20lines%2C%20professional%20cartographic%20style%20showing%20Togo%20Benin%20Cameroon%20Congo%20Ghana%20Senegal%20with%20warm%20amber%20accent%20colors%2C%20elegant%20business%20infographic%20aesthetic&width=700&height=700&seq=africa-map-about-khepera-v1&orientation=squarish',
    width: 700,
    height: 700,
    altFr: 'Présence KHEPRA EXPERTS en Afrique de l\'Ouest et Centrale',
    altEn: 'KHEPRA EXPERTS Presence in West and Central Africa',
  },
};

// ─────────────────────────────────────────────
// SERVICES / EXPERTISE IMAGES
// ─────────────────────────────────────────────
const SERVICE_IMAGES: Record<string, HeroImageConfig> = {
  'service-conseil': {
    local: '/images/service-conseil.webp',
    fallback: 'https://readdy.ai/api/search-image?query=strategic%20advisory%20board%20meeting%20corporate%20executives%20around%20modern%20conference%20table%20reviewing%20business%20strategy%20documents%20Africa%20professional%20consultants%20bright%20office%20natural%20light%20authentic%20leadership&width=800&height=560&seq=svc-conseil-v3&orientation=landscape',
    width: 800,
    height: 560,
    altFr: 'Conseil stratégique KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Strategic Advisory',
  },
  'service-diagnostic': {
    local: '/images/service-diagnostic.webp',
    fallback: 'https://readdy.ai/api/search-image?query=organizational%20diagnosis%20audit%20process%20professional%20consultant%20analyzing%20business%20structure%20charts%20documents%20laptop%20modern%20office%20Africa%20West%20corporate%20governance%20process%20mapping%20clean%20environment&width=800&height=560&seq=svc-diagnostic-v3&orientation=landscape',
    width: 800,
    height: 560,
    altFr: 'Diagnostic organisationnel KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Organizational Diagnosis',
  },
  'service-digital': {
    local: '/images/service-digital.webp',
    fallback: 'https://readdy.ai/api/search-image?query=digital%20transformation%20team%20Africa%20modern%20tech%20office%20diverse%20professionals%20working%20on%20digital%20strategy%20mobile%20apps%20fintech%20screens%20dashboards%20vibrant%20innovative%20workspace%20Togo%20Ivory%20Coast%20startup%20hub&width=800&height=560&seq=svc-digital-v3&orientation=landscape',
    width: 800,
    height: 560,
    altFr: 'Transformation digitale KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Digital Transformation',
  },
  'service-fonds': {
    local: '/images/service-fonds.webp',
    fallback: 'https://readdy.ai/api/search-image?query=fundraising%20investment%20pitch%20business%20professionals%20investors%20meeting%20startup%20Africa%20modern%20boardroom%20confident%20entrepreneur%20presenting%20financial%20projections%20charts%20warm%20professional%20atmosphere&width=800&height=560&seq=svc-fonds-v3&orientation=landscape',
    width: 800,
    height: 560,
    altFr: 'Levée de fonds KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Fundraising',
  },
};

// ─────────────────────────────────────────────
// EXPERTISE SHOWCASE IMAGES
// ─────────────────────────────────────────────
const EXPERTISE_IMAGES: Record<string, HeroImageConfig> = {
  'expertise-microfinance': {
    local: '/images/expertise-microfinance.webp',
    fallback: 'https://readdy.ai/api/search-image?query=microfinance%20banking%20institution%20Africa%20professional%20interior%20modern%20office%20with%20diverse%20team%20working%20on%20financial%20documents%20computers%20bright%20clean%20environment%20showing%20financial%20inclusion%20and%20banking%20services%20in%20West%20Africa&width=600&height=400&seq=exp-microfinance-v2&orientation=landscape',
    width: 600,
    height: 400,
    altFr: 'Expertise microfinance KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Microfinance Expertise',
  },
  'expertise-fintech': {
    local: '/images/expertise-fintech.webp',
    fallback: 'https://readdy.ai/api/search-image?query=fintech%20startup%20Africa%20young%20entrepreneurs%20working%20on%20mobile%20payment%20app%20modern%20co-working%20space%20vibrant%20energy%20digital%20innovation%20hub%20Togo%20Senegal%20Ivory%20Coast%20agile%20team%20with%20laptops%20and%20smartphones%20clean%20bright%20workspace&width=600&height=400&seq=exp-fintech-v2&orientation=landscape',
    width: 600,
    height: 400,
    altFr: 'Expertise fintech KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Fintech Expertise',
  },
  'expertise-pme': {
    local: '/images/expertise-pme.webp',
    fallback: 'https://readdy.ai/api/search-image?query=African%20SME%20business%20owner%20entrepreneur%20confident%20professional%20in%20modern%20office%20small%20business%20growth%20strategy%20meeting%20boardroom%20diverse%20team%20discussing%20plans%20charts%20Africa%20West%20Central%20corporate%20setting%20natural%20light&width=600&height=400&seq=exp-pme-v2&orientation=landscape',
    width: 600,
    height: 400,
    altFr: 'Expertise PME KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS SME Expertise',
  },
  'expertise-public': {
    local: '/images/expertise-public.webp',
    fallback: 'https://readdy.ai/api/search-image?query=public%20sector%20government%20institution%20Africa%20modern%20ministry%20official%20building%20professional%20meeting%20conference%20room%20policy%20makers%20discussing%20financial%20inclusion%20strategy%20national%20development%20Togo%20West%20Africa%20formal%20setting&width=600&height=400&seq=exp-public-v2&orientation=landscape',
    width: 600,
    height: 400,
    altFr: 'Expertise secteur public KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Public Sector Expertise',
  },
};

// ─────────────────────────────────────────────
// CASE STUDIES IMAGES
// ─────────────────────────────────────────────
const CASE_STUDY_IMAGES: Record<string, HeroImageConfig> = {
  'case-study-1': {
    local: '/images/case-study-1.webp',
    fallback: 'https://readdy.ai/api/search-image?query=modern%20african%20microfinance%20institution%20building%20with%20digital%20screens%20showing%20financial%20data%20clean%20professional%20atmosphere%20bright%20daylight%20contemporary%20architecture&width=800&height=600&seq=case1&orientation=landscape',
    width: 800,
    height: 600,
    altFr: 'Étude de cas microfinance KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Microfinance Case Study',
  },
  'case-study-2': {
    local: '/images/case-study-2.webp',
    fallback: 'https://readdy.ai/api/search-image?query=african%20fintech%20startup%20office%20with%20modern%20technology%20mobile%20payment%20systems%20young%20professionals%20working%20on%20laptops%20bright%20innovative%20workspace&width=800&height=600&seq=case2&orientation=landscape',
    width: 800,
    height: 600,
    altFr: 'Étude de cas fintech KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Fintech Case Study',
  },
  'case-study-3': {
    local: '/images/case-study-3.webp',
    fallback: 'https://readdy.ai/api/search-image?query=african%20government%20building%20with%20digital%20transformation%20elements%20modern%20public%20service%20center%20citizens%20using%20digital%20services%20professional%20clean%20environment&width=800&height=600&seq=case3&orientation=landscape',
    width: 800,
    height: 600,
    altFr: 'Étude de cas secteur public KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Public Sector Case Study',
  },
};

// ─────────────────────────────────────────────
// WHY KHEPRA IMAGES
// ─────────────────────────────────────────────
const WHY_KHEPRA_IMAGES: Record<string, HeroImageConfig> = {
  'why-local': {
    local: '/images/why-local.webp',
    fallback: 'https://readdy.ai/api/search-image?query=African%20business%20professionals%20in%20a%20modern%20office%20in%20Lome%20Togo%20reviewing%20strategic%20documents%20together%20diverse%20team%20of%20consultants%20around%20a%20table%20with%20maps%20and%20charts%20warm%20natural%20light%20authentic%20African%20corporate%20environment%20showing%20local%20expertise%20and%20regional%20knowledge&width=700&height=500&seq=why-khepra-local&orientation=landscape',
    width: 700,
    height: 500,
    altFr: 'Expertise locale KHEPRA EXPERTS - Lomé, Togo',
    altEn: 'KHEPRA EXPERTS Local Expertise - Lomé, Togo',
  },
  'why-expertise': {
    local: '/images/why-expertise.webp',
    fallback: 'https://readdy.ai/api/search-image?query=specialized%20financial%20consultant%20presenting%20governance%20audit%20framework%20to%20executives%20in%20a%20bright%20modern%20boardroom%20with%20data%20visualizations%20on%20screen%20professional%20African%20business%20setting%20showing%20expertise%20and%20certification%20documents%20clean%20minimalist%20corporate%20photography&width=700&height=500&seq=why-khepra-expertise&orientation=landscape',
    width: 700,
    height: 500,
    altFr: 'Expertise certifiée KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Certified Expertise',
  },
  'why-results': {
    local: '/images/why-results.webp',
    fallback: 'https://readdy.ai/api/search-image?query=business%20performance%20dashboard%20with%20measurable%20results%20charts%20showing%20growth%20metrics%20and%20KPIs%20on%20large%20screen%20African%20executive%20reviewing%20impact%20report%20with%20consultant%20modern%20office%20environment%20clean%20data%20visualization%20showing%20concrete%20business%20transformation%20results&width=700&height=500&seq=why-khepra-results&orientation=landscape',
    width: 700,
    height: 500,
    altFr: 'Résultats mesurables KHEPRA EXPERTS',
    altEn: 'KHEPRA EXPERTS Measurable Results',
  },
};

// ─────────────────────────────────────────────
// MISC IMAGES
// ─────────────────────────────────────────────
const MISC_IMAGES: Record<string, HeroImageConfig> = {
  'newsletter-bg': {
    local: '/images/newsletter-bg.webp',
    fallback: 'https://readdy.ai/api/search-image?query=abstract%20geometric%20african%20pattern%20gold%20lines%20dark%20background%20elegant%20minimal%20texture%20luxury%20consulting%20firm&width=1400&height=600&seq=home-newsletter-bg&orientation=landscape',
    width: 1400,
    height: 600,
    altFr: '',
    altEn: '',
  },
};

// ─────────────────────────────────────────────
// EXPORT GLOBAL
// ─────────────────────────────────────────────
export const HERO_IMAGES: Record<string, HeroImageConfig> = {
  ...HERO_PAGE_IMAGES,
  ...TEAM_IMAGES,
  ...TESTIMONIAL_IMAGES,
  ...ABOUT_IMAGES,
  ...SERVICE_IMAGES,
  ...EXPERTISE_IMAGES,
  ...CASE_STUDY_IMAGES,
  ...WHY_KHEPRA_IMAGES,
  ...MISC_IMAGES,
};

/**
 * Retourne l'URL locale (prioritaire) pour une image.
 * Le fallback readdy.ai est géré via le hook useHeroImage ou l'attribut onError.
 */
export function getHeroImageUrl(key: keyof typeof HERO_IMAGES): string {
  const config = HERO_IMAGES[key];
  if (!config) return '';
  return config.local;
}

/**
 * Retourne la config complète d'une image.
 */
export function getHeroImageConfig(key: keyof typeof HERO_IMAGES): HeroImageConfig {
  return HERO_IMAGES[key];
}

/**
 * Retourne toutes les clés d'images par catégorie pour faciliter le téléchargement.
 */
export const IMAGE_CATEGORIES = {
  hero: Object.keys(HERO_PAGE_IMAGES),
  team: Object.keys(TEAM_IMAGES),
  testimonials: Object.keys(TESTIMONIAL_IMAGES),
  about: Object.keys(ABOUT_IMAGES),
  services: Object.keys(SERVICE_IMAGES),
  expertise: Object.keys(EXPERTISE_IMAGES),
  caseStudies: Object.keys(CASE_STUDY_IMAGES),
  whyKhepra: Object.keys(WHY_KHEPRA_IMAGES),
  misc: Object.keys(MISC_IMAGES),
} as const;




