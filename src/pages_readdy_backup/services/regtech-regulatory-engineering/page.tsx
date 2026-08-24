import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const PAGE_PATH = '/services/regtech-regulatory-engineering';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=modern%20african%20digital%20regulatory%20technology%20infrastructure%20futuristic%20fintech%20regtech%20platform%20architecture%20with%20KYC%20AML%20compliance%20dashboard%20holographic%20screens%20digital%20identity%20verification%20biometric%20scanning%2C%20sleek%20professional%20office%20in%20West%20African%20innovation%20hub%2C%20warm%20ambient%20lighting%20with%20teal%20dark%20green%20and%20gold%20accents%2C%20abstract%20circuit%20patterns%20representing%20cybersecurity%20data%20protection%20cross-border%20compliance%2C%20clean%20minimalist%20corporate%20aesthetic%20showing%20pan-African%20digital%20sovereignty%20concept%2C%20multiple%20interconnected%20regulatory%20frameworks%20visualization%20across%20UEMOA%20CEMAC%20region&width=1600&height=800&seq=svc-regtech-eng-hero&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}${PAGE_PATH}#service`,
      name: isEn
        ? 'RegTech Regulatory Engineering — Compliance Architecture for Technology Providers in UEMOA/CEMAC'
        : 'Ingénierie Réglementaire RegTech — Architecture de Conformité pour Prestataires Technologiques en zone UEMOA/CEMAC',
      description: isEn
        ? 'KHEPRA EXPERTS helps RegTech, FinTech and SaaS providers secure their compliance architecture across UEMOA/CEMAC jurisdictions. 4-phase methodology: Technical Discovery, Multi-Jurisdictional Regulatory Audit, Legal Engineering & Data Privacy, Commercial Framework. Regulatory Data Room delivery. BCEAO/COBAC/GAFI compliance.'
        : 'KHEPRA EXPERTS accompagne les prestataires RegTech, FinTech et SaaS dans la sécurisation de leur architecture de conformité sur les juridictions UEMOA/CEMAC. Méthodologie en 4 phases : Discovery Technique, Audit Réglementaire Multi-Juridictionnel, Ingénierie Juridique & Data Privacy, Dispositif Commercial. Livraison d\'une Regulatory Data Room. Conformité BCEAO/COBAC/GAFI.',
      provider: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      areaServed: [
        { '@type': 'Country', name: 'TG' },
        { '@type': 'Country', name: 'BJ' },
        { '@type': 'Country', name: 'CI' },
        { '@type': 'Country', name: 'SN' },
        { '@type': 'Country', name: 'CM' },
        { '@type': 'Country', name: 'GA' },
      ],
      serviceType: isEn ? 'Regulatory Engineering' : 'Ingénierie Réglementaire',
      offers: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isEn
            ? 'RegTech Regulatory Architecture & Compliance Package'
            : 'Package Architecture Réglementaire & Conformité RegTech',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Services' : 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'RegTech Regulatory Engineering' : 'Ingénierie Réglementaire RegTech' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${PAGE_PATH}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: isEn
            ? 'Why do RegTech and SaaS providers need regulatory engineering for UEMOA/CEMAC markets?'
            : 'Pourquoi les prestataires RegTech et SaaS ont-ils besoin d\'ingénierie réglementaire pour les marchés UEMOA/CEMAC ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEn
              ? 'RegTech providers operating in UEMOA/CEMAC face a complex regulatory matrix: BCEAO/COBAC banking supervision, GIABA/GABAC AML/CFT directives, national data protection laws, and digital sovereignty requirements. Without proper regulatory architecture, they risk being blocked by bank vendor due diligence, requalified as "critical outsourced providers," and unable to contract with institutional clients.'
              : 'Les prestataires RegTech opérant en zone UEMOA/CEMAC font face à une matrice réglementaire complexe : supervision bancaire BCEAO/COBAC, directives AML/CFT du GIABA/GABAC, lois nationales de protection des données et exigences de souveraineté numérique. Sans architecture réglementaire adéquate, ils risquent le blocage par la due diligence bancaire, la requalification en « prestataire critique externalisé » et l\'impossibilité de contractualiser avec les clients institutionnels.',
          },
        },
        {
          '@type': 'Question',
          name: isEn
            ? 'What is a Regulatory Data Room and why is it critical for RegTech companies?'
            : 'Qu\'est-ce qu\'une Regulatory Data Room et pourquoi est-elle critique pour les RegTech ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEn
              ? 'A Regulatory Data Room is a pre-structured, auditable compliance dossier that demonstrates regulatory maturity to banking supervisors and institutional clients. It includes processing registers, DPAs, Cloud Compliance Assessments, AML/CFT manuals, auditability frameworks, and vendor due diligence packages. For RegTech companies selling to banks, it transforms compliance from a cost center into a competitive advantage, reducing institutional sales cycles by 40-60%.'
              : 'Une Regulatory Data Room est un dossier de conformité pré-structuré et auditable qui démontre la maturité réglementaire aux superviseurs bancaires et clients institutionnels. Elle inclut registres de traitement, DPA, Cloud Compliance Assessment, manuels AML/CFT, cadres d\'auditabilité et packages de vendor due diligence. Pour les RegTech vendant aux banques, elle transforme la conformité en avantage concurrentiel, réduisant les cycles de vente institutionnelle de 40 à 60%.',
          },
        },
      ],
    },
  ],
});

export default function RegTechRegulatoryEngineeringPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const contactRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ogTitle = isEn
    ? 'RegTech Regulatory Engineering | UEMOA/CEMAC Compliance | KHEPRA'
    : 'Ingénierie Réglementaire RegTech | Conformité UEMOA/CEMAC | KHEPRA';

  const ogDescription = isEn
    ? 'KHEPRA EXPERTS helps RegTech, FinTech & SaaS providers build compliance architectures that unlock institutional banking deals across UEMOA/CEMAC. 4-phase methodology, Regulatory Data Room, BCEAO/COBAC/GAFI compliance.'
    : 'KHEPRA EXPERTS aide les prestataires RegTech, FinTech & SaaS à bâtir des architectures de conformité qui débloquent les deals bancaires institutionnels en zone UEMOA/CEMAC. Méthodologie 4 phases, Regulatory Data Room, conformité BCEAO/COBAC/GAFI.';

  const scrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'RegTech regulatory engineering Africa, RegTech compliance UEMOA CEMAC, KYC KYB compliance architecture, AML CFT SaaS vendor due diligence, BCEAO COBAC outsourcing contracts, data protection Francophone Africa, digital sovereignty OHADA, KHEPRA EXPERTS regulatory engineering, fintech regtech compliance, tech provider bank compliance, API contract regulatory compliance'
          : 'ingénierie réglementaire RegTech Afrique, conformité RegTech UEMOA CEMAC, architecture conformité KYC KYB, due diligence fournisseur SaaS AML CFT, contrats externalisation BCEAO COBAC, protection données Afrique francophone, souveraineté numérique OHADA, KHEPRA EXPERTS ingénierie réglementaire, conformité fintech regtech, prestataire tech conformité bancaire, contrat API conformité réglementaire'}
        canonicalPath={PAGE_PATH}
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageAlt={isEn
          ? 'RegTech Regulatory Engineering Service — KHEPRA EXPERTS'
          : 'Service Ingénierie Réglementaire RegTech — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Methodology' : 'Méthodologie'}
        twitterData1="4 phases"
        twitterLabel2={isEn ? 'Duration' : 'Durée indicative'}
        twitterData2="12-16 semaines"
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'Why do RegTech and SaaS providers need regulatory engineering for UEMOA/CEMAC markets?',
                  answer: 'RegTech providers operating in UEMOA/CEMAC face a complex regulatory matrix: BCEAO/COBAC banking supervision, GIABA/GABAC AML/CFT directives, national data protection laws, and digital sovereignty requirements. Without proper regulatory architecture, they risk being blocked by bank vendor due diligence, requalified as "critical outsourced providers," and unable to contract with institutional clients.',
                },
                {
                  question: 'What is a Regulatory Data Room and why is it critical for RegTech companies?',
                  answer: 'A Regulatory Data Room is a pre-structured, auditable compliance dossier that demonstrates regulatory maturity to banking supervisors and institutional clients. It includes processing registers, DPAs, Cloud Compliance Assessments, AML/CFT manuals, auditability frameworks, and vendor due diligence packages. For RegTech companies selling to banks, it transforms compliance from a cost center into a competitive advantage, reducing institutional sales cycles by 40-60%.',
                },
              ]
            : [
                {
                  question: 'Pourquoi les prestataires RegTech et SaaS ont-ils besoin d\'ingénierie réglementaire pour les marchés UEMOA/CEMAC ?',
                  answer: 'Les prestataires RegTech opérant en zone UEMOA/CEMAC font face à une matrice réglementaire complexe : supervision bancaire BCEAO/COBAC, directives AML/CFT du GIABA/GABAC, lois nationales de protection des données et exigences de souveraineté numérique. Sans architecture réglementaire adéquate, ils risquent le blocage par la due diligence bancaire, la requalification en « prestataire critique externalisé » et l\'impossibilité de contractualiser avec les clients institutionnels.',
                },
                {
                  question: 'Qu\'est-ce qu\'une Regulatory Data Room et pourquoi est-elle critique pour les RegTech ?',
                  answer: 'Une Regulatory Data Room est un dossier de conformité pré-structuré et auditable qui démontre la maturité réglementaire aux superviseurs bancaires et clients institutionnels. Elle inclut registres de traitement, DPA, Cloud Compliance Assessment, manuels AML/CFT, cadres d\'auditabilité et packages de vendor due diligence. Pour les RegTech vendant aux banques, elle transforme la conformité en avantage concurrentiel, réduisant les cycles de vente institutionnelle de 40 à 60%.',
                },
              ]
        }
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Services' : 'Services', href: '/services' },
              { label: isEn ? 'RegTech Regulatory Engineering' : 'Ingénierie Réglementaire RegTech' },
            ]}
          />
        </div>
      </div>

      <main>
        {/* ── HERO ── */}
        <HeroSection isEn={isEn} scrollToContact={scrollToContact} />

        {/* ── PAIN POINT : LE BLOCAGE SILENCIEUX ── */}
        <PainPointSection isEn={isEn} />

        {/* ── POUR QUI ? ── */}
        <TargetAudienceSection isEn={isEn} />

        {/* ── MÉTHODOLOGIE 4 PHASES ── */}
        <MethodologySection isEn={isEn} />

        {/* ── CE QUE VOUS OBTENEZ ── */}
        <DeliverablesSection isEn={isEn} />

        {/* ── AVANT / APRÈS ── */}
        <BeforeAfterSection isEn={isEn} />

        {/* ── PREUVE : ÉTUDE DE CAS ── */}
        <CaseStudyProofSection isEn={isEn} navigate={navigate} />

        {/* ── FAQ ── */}
        <FAQSection isEn={isEn} openFaq={openFaq} setOpenFaq={setOpenFaq} />

        {/* ── CTA FINAL ── */}
        <CTASection isEn={isEn} scrollToContact={scrollToContact} contactRef={contactRef} />
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}${PAGE_PATH}/`}
            title={isEn ? 'RegTech Regulatory Engineering — KHEPRA EXPERTS' : 'Ingénierie Réglementaire RegTech — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ═══════════════════════ HERO ═══════════════════════
function HeroSection({ isEn, scrollToContact }: { isEn: boolean; scrollToContact: () => void }) {
  return (
    <section className="relative min-h-[580px] md:min-h-[640px] flex items-end pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt={isEn
            ? 'RegTech Regulatory Engineering — Compliance Architecture for Technology Providers — KHEPRA EXPERTS'
            : 'Ingénierie Réglementaire RegTech — Architecture de Conformité pour Prestataires Technologiques — KHEPRA EXPERTS'}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-500/20 border border-accent-400/40 text-accent-300">
              <i className="ri-shield-star-line"></i>
              {isEn ? 'Premium Service' : 'Service Premium'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-tools-line"></i>
              {isEn ? '4-phase methodology' : 'Méthodologie 4 phases'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-global-line"></i>
              UEMOA / CEMAC
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Regulatory Engineering for RegTech & SaaS Providers — Unlock Institutional Banking Deals in Francophone Africa'
              : 'Ingénierie Réglementaire pour Prestataires RegTech & SaaS — Débloquez les Deals Bancaires Institutionnels en Afrique Francophone'}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed mb-8">
            {isEn
              ? 'Your technology is ready. Your compliance architecture isn\'t. We transform regulatory complexity into your strongest sales asset — a pre-packaged, auditable compliance dossier that accelerates vendor due diligence, satisfies BCEAO/COBAC supervisors, and closes institutional deals 40-60% faster.'
              : 'Votre technologie est prête. Votre architecture de conformité ne l\'est pas. Nous transformons la complexité réglementaire en votre meilleur atout commercial — un dossier de conformité pré-structuré et auditable qui accélère les due diligences fournisseurs, satisfait les superviseurs BCEAO/COBAC et conclut les deals institutionnels 40 à 60% plus rapidement.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-lg hover:bg-accent-600 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
            >
              <i className="ri-calendar-check-line text-lg"></i>
              {isEn ? 'Book a Free Regulatory Diagnostic' : 'Réserver un Diagnostic Réglementaire Gratuit'}
            </button>
            <BrochureDownloadButton
              variant="secondary"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
              trackingLocation="regtech_regulatory_engineering_hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ PAIN POINT ═══════════════════════
function PainPointSection({ isEn }: { isEn: boolean }) {
  const painPoints = [
    {
      icon: 'ri-close-circle-line',
      color: 'bg-red-100 text-red-700',
      border: 'border-red-200',
      title: isEn
        ? 'Blocked by Bank Vendor Due Diligence'
        : 'Bloqué par la Due Diligence Fournisseur des Banques',
      desc: isEn
        ? 'Your RegTech solution is technically superior. But the bank\'s procurement team asks for your GDPR-equivalent Data Processing Agreement, your AML/CFT compliance manual, and your BCEAO outsourcing contract framework. You don\'t have them. The deal stalls. This happens in 80% of RegTech-to-bank sales cycles in UEMOA/CEMAC.'
        : 'Votre solution RegTech est techniquement supérieure. Mais l\'équipe procurement de la banque vous demande votre Data Processing Agreement équivalent RGPD, votre manuel de conformité AML/CFT et votre cadre contractuel d\'externalisation BCEAO. Vous ne les avez pas. Le deal s\'enlise. Cela arrive dans 80% des cycles de vente RegTech-to-bank en zone UEMOA/CEMAC.',
    },
    {
      icon: 'ri-alert-line',
      color: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
      title: isEn
        ? 'Risk of Regulatory Requalification'
        : 'Risque de Requalification Réglementaire',
      desc: isEn
        ? 'Banking supervisors (BCEAO, COBAC) can unilaterally classify your SaaS platform as a "critical outsourced provider." This triggers mandatory auditability, business continuity certifications (ISO 27001, SOC 2), and potential direct regulatory oversight. Without a pre-architected compliance framework, this requalification can kill your business model overnight.'
        : 'Les superviseurs bancaires (BCEAO, COBAC) peuvent qualifier unilatéralement votre plateforme SaaS de « prestataire critique externalisé ». Cela déclenche des obligations d\'auditabilité obligatoire, de certifications de continuité (ISO 27001, SOC 2) et potentiellement une supervision directe. Sans cadre de conformité pré-architecturé, cette requalification peut tuer votre modèle d\'affaires du jour au lendemain.',
    },
    {
      icon: 'ri-global-line',
      color: 'bg-blue-100 text-blue-700',
      border: 'border-blue-200',
      title: isEn
        ? 'Multi-Jurisdictional Fragmentation'
        : 'Fragmentation Multi-Juridictionnelle',
      desc: isEn
        ? 'Each UEMOA/CEMAC country imposes distinct data protection, digital sovereignty, and AML/CFT requirements. Benin mandates local data hosting (Law 2019-22, Art. 45). Senegal requires enhanced biometric data declarations. Côte d\'Ivoire has its own registration framework. Operating across 6-14 jurisdictions without a unified compliance architecture creates asymmetric regulatory risk.'
        : 'Chaque pays UEMOA/CEMAC impose des exigences distinctes de protection des données, de souveraineté numérique et de LBC/FT. Le Bénin impose l\'hébergement local (Loi 2019-22, art. 45). Le Sénégal exige des déclarations renforcées pour les données biométriques. La Côte d\'Ivoire a son propre cadre d\'enregistrement. Opérer sur 6 à 14 juridictions sans architecture de conformité unifiée crée un risque réglementaire asymétrique.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-error-warning-line">
            {isEn ? 'THE SILENT KILLER' : 'LE TUEUR SILENCIEUX'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEn
              ? 'Your Technology Works. Your Regulatory Architecture Doesn\'t.'
              : 'Votre Technologie Fonctionne. Votre Architecture Réglementaire, Non.'}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'The most technically advanced RegTech platforms get blocked — not by code quality, but by compliance gaps that banks\' procurement and risk teams flag instantly. These three blockers cost RegTech companies millions in lost institutional revenue every year.'
              : 'Les plateformes RegTech les plus avancées techniquement sont bloquées — non par la qualité du code, mais par des lacunes de conformité que les équipes procurement et risques des banques identifient instantanément. Ces trois bloqueurs coûtent chaque année des millions de revenus institutionnels aux entreprises RegTech.'}
          </p>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((pp, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 100}>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 h-full hover:border-accent-200 transition-all">
                <div className={`w-12 h-12 rounded-xl ${pp.color} flex items-center justify-center mb-4`}>
                  <i className={`${pp.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pp.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pp.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ TARGET AUDIENCE ═══════════════════════
function TargetAudienceSection({ isEn }: { isEn: boolean }) {
  const audiences = [
    {
      icon: 'ri-fingerprint-line',
      label: isEn ? 'KYC/KYB & Identity Verification Platforms' : 'Plateformes KYC/KYB & Vérification d\'Identité',
      desc: isEn
        ? 'Biometric verification, document authentication, liveness detection, UBO traceability. Your platform processes sensitive identity data on behalf of regulated institutions — triggering AML/CFT and data protection obligations across every jurisdiction you operate in.'
        : 'Vérification biométrique, authentification documentaire, détection du vivant, traçabilité UBO. Votre plateforme traite des données d\'identité sensibles pour le compte d\'institutions régulées — déclenchant des obligations AML/CFT et de protection des données dans chaque juridiction où vous opérez.',
    },
    {
      icon: 'ri-shield-check-line',
      label: isEn ? 'AML/CFT Compliance & Sanctions Screening SaaS' : 'SaaS de Conformité AML/CFT & Screening Sanctions',
      desc: isEn
        ? 'Sanctions screening (OFAC, UN, EU), PEP identification, transaction monitoring. Your platform is positioned directly in the compliance chain of regulated financial institutions. This makes you a de facto component of their regulatory obligations — and a prime candidate for requalification by BCEAO/COBAC supervisors.'
        : 'Screening sanctions (OFAC, ONU, UE), identification PPE, monitoring des transactions. Votre plateforme est positionnée directement dans la chaîne de conformité des institutions financières régulées. Cela fait de vous un composant de facto de leurs obligations réglementaires — et un candidat privilégié à la requalification par les superviseurs BCEAO/COBAC.',
    },
    {
      icon: 'ri-smartphone-line',
      label: isEn ? 'Digital Onboarding & E-Signature Solutions' : 'Solutions d\'Onboarding Digital & Signature Électronique',
      desc: isEn
        ? 'Remote customer onboarding, digital signature, electronic document management for banks and fintechs. You face the convergence of eIDAS-equivalent frameworks, OHADA electronic evidence rules, and national digital trust service requirements across UEMOA/CEMAC.'
        : 'Onboarding client à distance, signature électronique, gestion documentaire digitale pour banques et fintechs. Vous faites face à la convergence des cadres équivalents eIDAS, des règles de preuve électronique OHADA et des exigences nationales de services de confiance numérique en zone UEMOA/CEMAC.',
    },
    {
      icon: 'ri-brain-line',
      label: isEn ? 'AI-Powered Compliance & RegTech Infrastructure' : 'Infrastructure RegTech & Conformité Augmentée par l\'IA',
      desc: isEn
        ? 'AI-driven risk scoring, automated compliance workflows, regulatory change management platforms. Your AI/ML components introduce additional regulatory layers: algorithmic governance, explainability requirements, bias control, and automated decision documentation — all under emerging African AI governance frameworks.'
        : 'Scoring de risque par IA, workflows de conformité automatisés, plateformes de veille réglementaire. Vos composants IA/ML introduisent des couches réglementaires supplémentaires : gouvernance algorithmique, exigences d\'explicabilité, contrôle des biais et documentation des décisions automatisées — sous des cadres émergents de gouvernance de l\'IA en Afrique.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-user-search-line">
            {isEn ? 'WHO THIS IS FOR' : 'POUR QUI'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEn
              ? 'Built for Technology Providers Selling to African Financial Institutions'
              : 'Conçu pour les Prestataires Technologiques qui Vendent aux Institutions Financières Africaines'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((aud, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                    <i className={`${aud.icon} text-accent-600 text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{aud.label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{aud.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ METHODOLOGY ═══════════════════════
function MethodologySection({ isEn }: { isEn: boolean }) {
  const phases = [
    {
      num: '1',
      icon: 'ri-search-eye-line',
      title: isEn ? 'Technical Discovery & Model Qualification' : 'Discovery Technique & Qualification du Modèle',
      duration: isEn ? '2–3 weeks' : '2–3 semaines',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      bgColor: 'bg-blue-50',
      activities: isEn
        ? [
            'Deep-dive analysis of your technology stack: API architecture, data flow mapping, AI/ML components, infrastructure topology',
            'Business model qualification: identifying all regulatory touchpoints across your value chain',
            'Cross-border data flow analysis: entry points, processing, storage, international transfers, sub-processors, retention',
            'Risk taxonomy: scoring regulatory, legal, technical and commercial risks — 5 legal qualification hypotheses tested',
            'Complete UEMOA/CEMAC regulatory mapping: applicable texts, competent authorities, declarations, deadlines, sanctions',
          ]
        : [
            'Analyse approfondie de votre stack technologique : architecture API, cartographie des flux de données, composants IA/ML, topologie d\'infrastructure',
            'Qualification du modèle d\'affaires : identification de tous les points de contact réglementaires dans votre chaîne de valeur',
            'Analyse des flux transfrontaliers de données : entrées, traitements, stockage, transferts internationaux, sous-traitants, conservation',
            'Taxonomie des risques : scoring des risques réglementaires, juridiques, techniques et commerciaux — 5 hypothèses de qualification juridique testées',
            'Cartographie réglementaire complète UEMOA/CEMAC : textes applicables, autorités compétentes, déclarations, délais, sanctions',
          ],
      deliverables: isEn
        ? 'Comprehensive regulatory audit report (80+ pages). UEMOA/CEMAC regulatory mapping matrix. Cross-border data flow map. 8-risk mitigation matrix. 24-month strategic compliance roadmap.'
        : 'Rapport d\'audit réglementaire complet (80+ pages). Matrice de cartographie réglementaire UEMOA/CEMAC. Cartographie des flux transfrontaliers. Matrice de mitigation des 8 risques. Feuille de route stratégique de conformité sur 24 mois.',
    },
    {
      num: '2',
      icon: 'ri-file-search-line',
      title: isEn ? 'Multi-Jurisdictional Regulatory Audit' : 'Audit Réglementaire Multi-Juridictionnel',
      duration: isEn ? '2–3 weeks' : '2–3 semaines',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      bgColor: 'bg-amber-50',
      activities: isEn
        ? [
            'Gap analysis against FATF 40 Recommendations: AML/CFT obligation coverage assessment',
            'GIABA/GABAC directive analysis: regional evaluation frameworks and country-specific requirements',
            '14-country data protection law matrix: Togo, Benin, Côte d\'Ivoire, Senegal, Burkina Faso, Mali, Niger, Cameroon, Gabon, Congo +',
            'Cloud Compliance Assessment: data center localization, provider certifications, digital sovereignty compliance',
            'Cybersecurity requirements mapping: BCEAO/COBAC prudential standards, ISO 27001, SOC 2 readiness',
          ]
        : [
            'Analyse des écarts vs 40 Recommandations GAFI : évaluation de la couverture des obligations AML/CFT',
            'Analyse des directives GIABA/GABAC : cadres d\'évaluation régionaux et exigences spécifiques par pays',
            'Matrice 14 pays des lois de protection des données : Togo, Bénin, Côte d\'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Cameroun, Gabon, Congo +',
            'Cloud Compliance Assessment : localisation des datacenters, certifications du fournisseur, conformité souveraineté numérique',
            'Cartographie des exigences de cybersécurité : normes prudentielles BCEAO/COBAC, préparation ISO 27001, SOC 2',
          ],
      deliverables: isEn
        ? 'Multi-jurisdictional gap analysis report. 14-country data protection matrix. Cloud Compliance Assessment. FATF 40 compliance matrix. Cross-border transfer restriction map.'
        : 'Rapport d\'analyse des écarts multi-juridictionnels. Matrice 14 pays de protection des données. Cloud Compliance Assessment. Matrice conformité 40 Recommandations GAFI. Carte des restrictions de transfert transfrontalier.',
    },
    {
      num: '3',
      icon: 'ri-shield-check-line',
      title: isEn ? 'Legal Engineering & Data Privacy Architecture' : 'Ingénierie Juridique & Architecture Data Privacy',
      duration: isEn ? '3–4 weeks' : '3–4 semaines',
      color: 'bg-green-100 text-green-700 border-green-200',
      bgColor: 'bg-green-50',
      activities: isEn
        ? [
            'Precise legal qualification: controller, co-controller, or processor — by data processing type and by client category',
            'GDPR-inspired compliance framework: data subject rights, processing register, privacy by design/default',
            'Data Processing Agreement (DPA) drafting: multi-jurisdictional model adaptable to each institutional client',
            'National DPA adaptation: alignment with local laws for each target country, declarations and registrations',
            'Incident management playbooks: detection, regulatory notification, data subject notification, documentation',
            'AI Governance Framework: algorithmic explainability, bias control, automated decision documentation',
          ]
        : [
            'Qualification juridique précise : responsable, co-responsable ou sous-traitant — par type de traitement et par catégorie de client',
            'Cadre de conformité inspiré du RGPD : droits des personnes, registre de traitement, privacy by design/default',
            'Rédaction du Data Processing Agreement (DPA) : modèle multi-juridictionnel adaptable à chaque client institutionnel',
            'Adaptation nationale aux APDP : alignement sur les lois locales de chaque pays cible, déclarations et enregistrements',
            'Playbooks de gestion des incidents : détection, notification réglementaire, notification aux personnes, documentation',
            'AI Governance Framework : explicabilité algorithmique, contrôle des biais, documentation des décisions automatisées',
          ],
      deliverables: isEn
        ? 'Complete processing register. Public & internal privacy policies. Multi-jurisdictional DPA model. Cloud Compliance Assessment report. Data breach management playbooks. Data retention and archiving policy. AI Governance Framework.'
        : 'Registre de traitement complet. Politiques de confidentialité publique et interne. Modèle DPA multi-juridictionnel. Rapport Cloud Compliance Assessment. Playbooks de gestion des violations. Politique de conservation et d\'archivage. AI Governance Framework.',
    },
    {
      num: '4',
      icon: 'ri-article-line',
      title: isEn ? 'Commercial Framework & Institutional Contracting' : 'Dispositif Commercial & Contractualisation Institutionnelle',
      duration: isEn ? '3–4 weeks' : '3–4 semaines',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      bgColor: 'bg-purple-50',
      activities: isEn
        ? [
            'SaaS General Terms & Conditions: regulatory-compliant, negotiable, with SLAs, liability, data protection, auditability',
            'API contract framework: technical specs, quotas, pricing, security, confidentiality, service levels',
            'BCEAO/COBAC-compliant outsourcing agreements: auditability, reversibility, business continuity, exit clauses',
            'Vendor Due Diligence package: pre-structured questionnaire, procedure, and assessment report model',
            'International data transfer clauses: contractual guarantee mechanisms adapted to each destination country',
            'NDA suite: 3 versions — prospect, technology partner, employee',
          ]
        : [
            'Conditions Générales de Service SaaS : conformes, négociables, avec SLA, responsabilité, protection des données, auditabilité',
            'Contrat-cadre API : spécifications techniques, quotas, tarification, sécurité, confidentialité, niveaux de service',
            'Contrats d\'externalisation conformes BCEAO/COBAC : auditabilité, réversibilité, continuité d\'activité, clauses de sortie',
            'Package Vendor Due Diligence : questionnaire, procédure et modèle de rapport d\'évaluation pré-structurés',
            'Clauses de transfert international de données : mécanismes de garantie contractuelle adaptés à chaque pays de destination',
            'Suite NDA : 3 versions — prospect, partenaire technologique, employé',
          ],
      deliverables: isEn
        ? 'SaaS GTCs — complete negotiable document. API contract framework. BCEAO/COBAC-compliant outsourcing agreement. Vendor Due Diligence package. International data transfer clauses. NDA suite (3 versions). Full Regulatory Data Room assembled.'
        : 'CGS SaaS — document complet et négociable. Contrat-cadre API. Contrat d\'externalisation conforme BCEAO/COBAC. Package Vendor Due Diligence. Clauses de transfert international de données. Suite NDA (3 versions). Regulatory Data Room complète assemblée.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-tools-line">
            {isEn ? 'THE KHEPRA METHOD' : 'LA MÉTHODE KHEPRA'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEn
              ? '4 Phases. 12-16 Weeks. One Complete Regulatory Architecture.'
              : '4 Phases. 12-16 Semaines. Une Architecture Réglementaire Complète.'}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'An integrated Big Four-grade methodology that doesn\'t stop at diagnosis — it produces operational, executable deliverables ready for immediate institutional deployment.'
              : 'Une méthodologie intégrée de niveau Big Four qui ne s\'arrête pas au diagnostic — elle produit des livrables opérationnels et exécutoires, prêts pour un déploiement institutionnel immédiat.'}
          </p>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.num} className={`${phase.bgColor} rounded-2xl border ${phase.color.split(' ')[2]} p-6 md:p-8`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className={`w-12 h-12 rounded-xl ${phase.color.split(' ')[0]} ${phase.color.split(' ')[1]} flex items-center justify-center shrink-0`}>
                  <span className="text-xl font-extrabold">{phase.num}</span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                      <i className={`${phase.icon} text-gray-700`}></i>
                      {phase.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                      <i className="ri-time-line"></i>
                      {phase.duration}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                      {isEn ? 'Activities' : 'Activités'}
                    </h4>
                    <ul className="space-y-1.5">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-gray-500 mt-0.5 shrink-0"></i>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                      {isEn ? 'Key Deliverables' : 'Livrables Clés'}
                    </h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{phase.deliverables}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ DELIVERABLES ═══════════════════════
function DeliverablesSection({ isEn }: { isEn: boolean }) {
  const assets = [
    {
      icon: 'ri-folder-shield-2-line',
      title: isEn ? 'Regulatory Data Room' : 'Regulatory Data Room',
      desc: isEn
        ? 'A pre-structured, auditable compliance dossier: processing register, privacy policies, DPA, Cloud Compliance Assessment, AML/CFT manual, auditability framework, AI Governance Framework, BCP/DRP documentation, full vendor due diligence package. Ready for immediate submission to any tier-1 bank\'s procurement team.'
        : 'Un dossier de conformité pré-structuré et auditable : registre de traitement, politiques de confidentialité, DPA, Cloud Compliance Assessment, manuel AML/CFT, cadre d\'auditabilité, AI Governance Framework, documentation PCA/PRA, package vendor due diligence complet. Prêt pour soumission immédiate à l\'équipe procurement de toute banque de premier rang.',
    },
    {
      icon: 'ri-file-list-3-line',
      title: isEn ? 'Commercial Contract Suite' : 'Suite Contractuelle Commerciale',
      desc: isEn
        ? 'SaaS GTCs, API contract framework, BCEAO/COBAC-compliant outsourcing agreements, international data transfer clauses, NDA suite. Every document designed for immediate execution with institutional clients — eliminating the 3-6 month legal negotiation bottleneck.'
        : 'CGS SaaS, contrat-cadre API, contrats d\'externalisation conformes BCEAO/COBAC, clauses de transfert international de données, suite NDA. Chaque document conçu pour exécution immédiate avec les clients institutionnels — éliminant le goulot d\'étranglement de 3 à 6 mois de négociation juridique.',
    },
    {
      icon: 'ri-shield-star-line',
      title: isEn ? 'Immunized Business Model' : 'Modèle d\'Affaires Immunisé',
      desc: isEn
        ? 'Five legal qualification hypotheses stress-tested, primary qualification defended, all risks mitigated. A documented risk mitigation strategy for the most dangerous scenarios. The company can confidently engage with banking supervisors, demonstrating proactive regulatory maturity.'
        : 'Cinq hypothèses de qualification juridique testées en stress, qualification principale défendue, tous risques mitigés. Une stratégie documentée de mitigation pour les scénarios les plus dangereux. L\'entreprise peut engager sereinement les superviseurs bancaires en démontrant une maturité réglementaire proactive.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-gift-line">
            {isEn ? 'WHAT YOU WALK AWAY WITH' : 'CE QUE VOUS REPARTEZ AVEC'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEn
              ? 'Three Strategic Assets That Transform Compliance Into Competitive Advantage'
              : 'Trois Actifs Stratégiques Qui Transforment La Conformité En Avantage Concurrentiel'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="space-y-6">
          {assets.map((asset, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 100}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-md transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                    <i className={`${asset.icon} text-accent-600 text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{asset.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{asset.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ BEFORE / AFTER ═══════════════════════
function BeforeAfterSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-arrow-left-right-line">
            {isEn ? 'THE TRANSFORMATION' : 'LA TRANSFORMATION'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEn ? 'Before KHEPRA vs. After KHEPRA' : 'Avant KHEPRA vs. Après KHEPRA'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-2xl p-6 md:p-8 border border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-close-circle-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-red-900 text-xl">{isEn ? 'Before KHEPRA' : 'Avant KHEPRA'}</h3>
            </div>
            <ul className="space-y-3">
              {[
                isEn
                  ? 'No documented regulatory framework — unable to respond to institutional due diligence'
                  : 'Aucun cadre réglementaire documenté — incapacité à répondre aux due diligences institutionnelles',
                isEn
                  ? 'Undefined legal qualification — exposure to BCEAO/COBAC requalification risk'
                  : 'Qualification juridique indéterminée — exposition au risque de requalification BCEAO/COBAC',
                isEn
                  ? 'No outsourcing agreement templates — every bank negotiation starts from scratch (3-6 months)'
                  : 'Aucun contrat d\'externalisation type — chaque négociation bancaire repart de zéro (3-6 mois)',
                isEn
                  ? 'Fragmented awareness of country-specific data protection and digital sovereignty requirements'
                  : 'Connaissance fragmentée des exigences pays de protection des données et souveraineté numérique',
                isEn
                  ? 'Compliance perceived as cost center — no competitive positioning around regulatory maturity'
                  : 'Conformité perçue comme centre de coûts — aucun positionnement concurrentiel autour de la maturité réglementaire',
                isEn
                  ? 'Sales cycles blocked at procurement stage — inability to pass bank vendor risk assessments'
                  : 'Cycles de vente bloqués au stade procurement — incapacité à passer les évaluations risques fournisseurs des banques',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                  <i className="ri-close-line text-red-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 md:p-8 border border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-green-900 text-xl">{isEn ? 'After KHEPRA' : 'Après KHEPRA'}</h3>
            </div>
            <ul className="space-y-3">
              {[
                isEn
                  ? 'Complete Regulatory Data Room — pre-packaged, auditable, ready for immediate submission'
                  : 'Regulatory Data Room complète — pré-structurée, auditable, prête pour soumission immédiate',
                isEn
                  ? 'Validated legal qualification — 5 hypotheses stress-tested, primary qualification defended'
                  : 'Qualification juridique validée — 5 hypothèses testées en stress, qualification principale défendue',
                isEn
                  ? 'BCEAO/COBAC-compliant contract suite — SaaS GTCs, API contracts, outsourcing agreements'
                  : 'Suite contractuelle conforme BCEAO/COBAC — CGS SaaS, contrats API, contrats d\'externalisation',
                isEn
                  ? '14-country data protection matrix — precise, jurisdiction-by-jurisdiction compliance architecture'
                  : 'Matrice 14 pays de protection des données — architecture de conformité précise, juridiction par juridiction',
                isEn
                  ? 'Compliance transformed into competitive advantage — Regulatory Data Room as key sales asset'
                  : 'Conformité transformée en avantage concurrentiel — Regulatory Data Room comme actif clé de vente',
                isEn
                  ? 'Institutional sales cycles reduced by 40-60% — procurement-ready from day one'
                  : 'Cycles de vente institutionnelle réduits de 40-60% — procurement-ready dès le premier jour',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-green-800">
                  <i className="ri-check-line text-green-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ CASE STUDY PROOF ═══════════════════════
function CaseStudyProofSection({ isEn, navigate }: { isEn: boolean; navigate: ReturnType<typeof useNavigate> }) {
  return (
    <section className="py-14 md:py-20 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-trophy-line">
            {isEn ? 'PROOF OF CONCEPT' : 'PREUVE DE CONCEPT'}
          </BigFourSubtitleBar>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {isEn
              ? 'We\'ve Done This Before — For a Pan-African RegTech Leader'
              : 'Nous l\'Avons Déjà Fait — Pour un Leader RegTech Panafricain'}
          </h2>
          <p className="text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'KHEPRA EXPERTS deployed this exact methodology for a major pan-African digital trust infrastructure operator. The result: a complete compliance architecture covering 8 UEMOA/CEMAC countries, a full Regulatory Data Room, and an immunized business model ready for tier-1 bank contracting.'
              : 'KHEPRA EXPERTS a déployé cette méthodologie exacte pour un opérateur majeur d\'infrastructure de confiance numérique panafricaine. Résultat : une architecture de conformité complète couvrant 8 pays UEMOA/CEMAC, une Regulatory Data Room exhaustive et un modèle d\'affaires immunisé, prêt pour la contractualisation avec les banques de premier rang.'}
          </p>
          <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: '8', label: isEn ? 'UEMOA/CEMAC countries' : 'Pays UEMOA/CEMAC', icon: 'ri-global-line' },
            { value: '5', label: isEn ? 'Legal hypotheses tested' : 'Hypothèses juridiques testées', icon: 'ri-scales-3-line' },
            { value: '100%', label: isEn ? 'Multi-jurisdictional compliance' : 'Conformité multi-juridictionnelle', icon: 'ri-shield-check-line' },
            { value: '16 sem.', label: isEn ? 'End-to-end delivery' : 'Livraison complète', icon: 'ri-time-line' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-3">
                <i className={`${stat.icon} text-accent-400 text-lg`}></i>
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-accent-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/60 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/case-studies/regtech-conformite-uemoa-cemac')}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer"
          >
            <i className="ri-eye-line"></i>
            {isEn ? 'Read the Full Case Study' : 'Lire l\'Étude de Cas Complète'}
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ FAQ ═══════════════════════
function FAQSection({ isEn, openFaq, setOpenFaq }: { isEn: boolean; openFaq: number | null; setOpenFaq: (v: number | null) => void }) {
  const faqs = isEn
    ? [
        {
          q: 'How long does a complete RegTech regulatory engineering engagement take?',
          a: '12 to 16 weeks from kickoff to final Regulatory Data Room delivery. Phase 1 (Technical Discovery): 2-3 weeks. Phase 2 (Multi-Jurisdictional Audit): 2-3 weeks. Phase 3 (Legal Engineering & Data Privacy): 3-4 weeks. Phase 4 (Commercial Framework): 3-4 weeks. Timeline varies based on your technology stack complexity and number of target jurisdictions.',
        },
        {
          q: 'What makes KHEPRA EXPERTS different from a law firm or compliance consultancy?',
          a: 'We integrate three disciplines that traditional firms keep separate: (1) technical understanding of your code base, APIs, AI/ML components and data architecture; (2) deep regulatory expertise across BCEAO, COBAC, GIABA/GABAC, FATF, and national data protection frameworks; (3) commercial contracting expertise — we don\'t just tell you what\'s wrong, we produce the actual SaaS GTCs, API contracts, and outsourcing agreements you need to close bank deals. Law firms advise. We architect and deliver.',
        },
        {
          q: 'Our product is still in development. When should we engage KHEPRA EXPERTS?',
          a: 'Ideally 3-6 months before your first institutional sales conversations. Regulatory architecture should be designed in parallel with your product — not retrofitted after the fact. Retrofitting compliance into a built product is 2-3x more expensive and often requires architectural changes. Early engagement allows us to bake compliance requirements into your product roadmap.',
        },
        {
          q: 'Do you only cover UEMOA/CEMAC jurisdictions?',
          a: 'Our core expertise is UEMOA (8 countries) and CEMAC (6 countries) — the Francophone African banking regulatory ecosystem. We also cover OHADA corporate law (17 member states) and can integrate with your existing GDPR, DIFC, or other international compliance frameworks. For jurisdictions outside our core, we partner with specialist local counsel.',
        },
        {
          q: 'What is the investment for a full engagement?',
          a: 'Every engagement is scoped based on your technology stack, number of jurisdictions, and commercial complexity. We offer a free 30-minute strategic diagnostic to assess your regulatory exposure and provide a fixed-fee proposal. Contact us to schedule.',
        },
      ]
    : [
        {
          q: 'Combien de temps dure une mission complète d\'ingénierie réglementaire RegTech ?',
          a: '12 à 16 semaines du lancement à la livraison de la Regulatory Data Room complète. Phase 1 (Discovery Technique) : 2-3 semaines. Phase 2 (Audit Multi-Juridictionnel) : 2-3 semaines. Phase 3 (Ingénierie Juridique & Data Privacy) : 3-4 semaines. Phase 4 (Dispositif Commercial) : 3-4 semaines. Le délai varie selon la complexité de votre stack technologique et le nombre de juridictions cibles.',
        },
        {
          q: 'Qu\'est-ce qui différencie KHEPRA EXPERTS d\'un cabinet d\'avocats ou d\'un consultant en conformité ?',
          a: 'Nous intégrons trois disciplines que les cabinets traditionnels maintiennent séparées : (1) compréhension technique de votre base de code, APIs, composants IA/ML et architecture de données ; (2) expertise réglementaire approfondie sur BCEAO, COBAC, GIABA/GABAC, GAFI et les cadres nationaux de protection des données ; (3) expertise en contractualisation commerciale — nous ne nous contentons pas de vous dire ce qui ne va pas, nous produisons les CGS SaaS, contrats API et contrats d\'externalisation dont vous avez besoin pour conclure des deals bancaires. Les cabinets d\'avocats conseillent. Nous architecturons et livrons.',
        },
        {
          q: 'Notre produit est encore en développement. Quand devons-nous engager KHEPRA EXPERTS ?',
          a: 'Idéalement 3 à 6 mois avant vos premières conversations commerciales institutionnelles. L\'architecture réglementaire doit être conçue en parallèle de votre produit — pas rétrofitée après coup. Le retrofitting de la conformité dans un produit déjà construit est 2 à 3 fois plus coûteux et nécessite souvent des changements architecturaux. Un engagement précoce nous permet d\'intégrer les exigences de conformité dans votre roadmap produit.',
        },
        {
          q: 'Couvrez-vous uniquement les juridictions UEMOA/CEMAC ?',
          a: 'Notre expertise cœur couvre l\'UEMOA (8 pays) et la CEMAC (6 pays) — l\'écosystème réglementaire bancaire d\'Afrique francophone. Nous couvrons également le droit des sociétés OHADA (17 États membres) et pouvons nous intégrer avec vos frameworks de conformité existants (RGPD, DIFC, etc.). Pour les juridictions hors de notre cœur d\'expertise, nous collaborons avec des cabinets locaux spécialisés.',
        },
        {
          q: 'Quel est l\'investissement pour une mission complète ?',
          a: 'Chaque mission est calibrée en fonction de votre stack technologique, du nombre de juridictions et de la complexité commerciale. Nous offrons un diagnostic stratégique gratuit de 30 minutes pour évaluer votre exposition réglementaire et vous fournir une proposition à prix fixe. Contactez-nous pour planifier.',
        },
      ];

  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base md:text-lg font-bold text-gray-900 pr-8">{faq.q}</h3>
                <i className={`ri-arrow-down-s-line text-gray-400 transition-transform text-xl shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaq === i && (
                <div className="px-5 md:px-6 pb-5 border-t border-gray-100">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ CTA ═══════════════════════
function CTASection({ isEn, scrollToContact, contactRef }: { isEn: boolean; scrollToContact: () => void; contactRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[16rem] font-bold text-accent-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          RT
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 mb-6">
          <i className="ri-chat-quote-line text-accent-400 text-sm"></i>
          <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">
            {isEn ? 'Ready to Unlock Institutional Deals?' : 'Prêt à Débloquer les Deals Institutionnels ?'}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Don\'t Let Regulatory Gaps Block Your Next Bank Deal'
            : 'Ne Laissez Pas les Lacunes Réglementaires Bloquer Votre Prochain Deal Bancaire'}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'Book a free 30-minute strategic diagnostic. We\'ll analyze your regulatory exposure, identify the gaps that banks\' procurement teams will flag, and outline a compliance architecture tailored to your technology and target jurisdictions.'
            : 'Réservez un diagnostic stratégique gratuit de 30 minutes. Nous analyserons votre exposition réglementaire, identifierons les lacunes que les équipes procurement des banques signaleront, et esquisserons une architecture de conformité adaptée à votre technologie et à vos juridictions cibles.'}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10" ref={contactRef} id="contact-form">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-lg hover:bg-accent-600 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            {isEn ? 'Book a Free Regulatory Diagnostic' : 'Réserver un Diagnostic Réglementaire Gratuit'}
          </button>
          <BrochureDownloadButton
            variant="secondary"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            trackingLocation="regtech_regulatory_engineering_cta"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/10">
          {[
            { icon: 'ri-shield-check-line', label: isEn ? 'Confidential' : 'Confidentiel' },
            { icon: 'ri-time-line', label: isEn ? '30 minutes' : '30 minutes' },
            { icon: 'ri-hand-heart-line', label: isEn ? 'No commitment' : 'Sans engagement' },
            { icon: 'ri-global-line', label: 'FR / EN' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className={`${b.icon} text-emerald-400 text-lg`}></i>
              <span className="text-sm text-white/70 font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



