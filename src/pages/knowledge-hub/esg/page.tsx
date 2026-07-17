import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';

const PILLARS = [
  { icon: 'ri-leaf-line', labelFr: 'Environnement', labelEn: 'Environment', color: '#22a05a', descFr: 'Gestion des risques climatiques, biodiversité, eau, déchets, empreinte carbone, CCNUCC.', descEn: 'Climate risk management, biodiversity, water, waste, carbon footprint, UNFCCC.' },
  { icon: 'ri-team-line', labelFr: 'Social', labelEn: 'Social', color: '#d4a82a', descFr: 'Droits du travail, genre, inclusion, conditions de travail, engagement communautaire.', descEn: 'Labor rights, gender, inclusion, working conditions, community engagement.' },
  { icon: 'ri-government-line', labelFr: 'Gouvernance', labelEn: 'Governance', color: '#22a05a', descFr: 'Conseil d\'administration, transparence, anti-corruption, droits des actionnaires, audit interne.', descEn: 'Board of directors, transparency, anti-corruption, shareholder rights, internal audit.' },
];

const STANDARDS = [
  { name: 'IFC Performance Standards (PS 1–8)', url: '#', descFr: 'Référentiel des banques de développement et fonds d\'investissement impact pour projets en pays émergents.', descEn: 'Reference framework for development banks and impact investment funds for projects in emerging countries.' },
  { name: 'GRI Standards (G4 / GRI 2021)', url: '#', descFr: 'Standards internationaux de reporting RSE, utilisés par 73% des 250 plus grandes entreprises mondiales.', descEn: 'International CSR reporting standards, used by 73% of the 250 largest global companies.' },
  { name: 'ISSB IFRS S1 & S2', url: '#', descFr: 'Normes IFRS sur la divulgation des risques ESG. Obligatoire dans 20+ juridictions à partir de 2026.', descEn: 'IFRS standards on ESG risk disclosure. Mandatory in 20+ jurisdictions from 2026.' },
  { name: 'SASB Industry Standards', url: '#', descFr: 'Standards sectoriels de matérialité pour 77 industries. Référence des investisseurs institutionnels.', descEn: 'Sector materiality standards for 77 industries. Reference for institutional investors.' },
  { name: 'TCFD', url: '#', descFr: 'Recommandations du Task Force on Climate-related Financial Disclosures pour les risques climatiques financiers.', descEn: 'Task Force on Climate-related Financial Disclosures recommendations for financial climate risks.' },
  { name: 'GIABA/GABAC & LBC/FT', url: '#', descFr: 'Cadre anti-blanchiment et financement du terrorisme UEMOA/CEMAC, intégré à l\'ESG réglementaire.', descEn: 'Anti-money laundering and terrorist financing framework UEMOA/CEMAC, integrated into regulatory ESG.' },
];

const FAQS = [
  {
    qFr: 'Qu\'est-ce que l\'ESG Advisory ?',
    qEn: 'What is ESG Advisory?',
    aFr: 'L\'ESG Advisory est un service de conseil spécialisé qui aide les entreprises, investisseurs et institutions financières à intégrer les critères Environnementaux, Sociaux et de Gouvernance (ESG) dans leur stratégie, leur gestion des risques et leur communication financière. En Afrique, l\'ESG Advisory intègre les standards IFC, GRI, ISSB et les exigences BCEAO/COBAC.',
    aEn: 'ESG Advisory is a specialized consulting service that helps companies, investors and financial institutions integrate Environmental, Social and Governance (ESG) criteria into their strategy, risk management and financial communication. In Africa, ESG Advisory integrates IFC, GRI, ISSB standards and BCEAO/COBAC requirements.',
  },
  {
    qFr: 'Pourquoi l\'ESG est-il important pour les banques en Afrique ?',
    qEn: 'Why is ESG important for banks in Africa?',
    aFr: 'Les banques africaines font face à une double pression : les banques de développement (BAD, Banque Mondiale, SFI) conditionnent leurs financements à la conformité ESG, et les circulaires BCEAO/COBAC 2024–2026 intègrent progressivement les risques climatiques et de gouvernance dans les exigences prudentielles. Une banque non-conforme ESG voit ses lignes de refinancement se réduire drastiquement.',
    aEn: 'African banks face dual pressure: development banks (ADB, World Bank, IFC) condition their financing on ESG compliance, and 2024–2026 BCEAO/COBAC circulars progressively integrate climate and governance risks into prudential requirements. A non-ESG compliant bank sees its refinancing lines drastically reduced.',
  },
  {
    qFr: 'Que sont les Standards de Performance IFC ?',
    qEn: 'What are IFC Performance Standards?',
    aFr: 'Les 8 Standards de Performance IFC (PS 1 à 8) couvrent : PS1 - Évaluation et gestion des risques E&S ; PS2 - Main-d\'œuvre et conditions de travail ; PS3 - Efficacité des ressources et prévention de la pollution ; PS4 - Santé, sécurité et sûreté communautaires ; PS5 - Acquisition de terrains et réinstallation involontaire ; PS6 - Conservation de la biodiversité ; PS7 - Peuples autochtones ; PS8 - Patrimoine culturel.',
    aEn: 'The 8 IFC Performance Standards (PS 1 to 8) cover: PS1 - E&S risk assessment and management; PS2 - Labor and working conditions; PS3 - Resource efficiency and pollution prevention; PS4 - Community health, safety and security; PS5 - Land acquisition and involuntary resettlement; PS6 - Biodiversity conservation; PS7 - Indigenous peoples; PS8 - Cultural heritage.',
  },
  {
    qFr: 'Quelle est la différence entre GRI et ISSB ?',
    qEn: 'What is the difference between GRI and ISSB?',
    aFr: 'Les GRI Standards se concentrent sur l\'impact de l\'organisation sur l\'économie, l\'environnement et la société (perspective stakeholders). Les ISSB IFRS S1/S2 se concentrent sur les informations ESG matérielles pour les investisseurs (perspective financière). Khepra Experts recommande les deux pour les institutions cherchant des financements internationaux en Afrique.',
    aEn: 'GRI Standards focus on the organization\'s impact on the economy, environment and society (stakeholder perspective). ISSB IFRS S1/S2 focus on material ESG information for investors (financial perspective). Khepra Experts recommends both for institutions seeking international financing in Africa.',
  },
];

export default function ESGHubPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: isEn ? faq.qEn : faq.qFr,
      acceptedAnswer: { '@type': 'Answer', text: isEn ? faq.aEn : faq.aFr },
    })),
  };

  return (
    <>
      <SeoHead
        title={isEn
          ? 'ESG Advisory Africa — IFC, GRI, ISSB Standards Guide | Khepra Experts'
          : 'ESG Advisory Afrique — Guide Standards IFC, GRI, ISSB | Khepra Experts'}
        description={isEn
          ? 'Complete guide to ESG Advisory in Africa: IFC Performance Standards, GRI Standards, ISSB IFRS S1/S2, SASB. ESG due diligence, ESG reporting, BCEAO/COBAC regulatory integration. Khepra Experts — 20+ countries.'
          : 'Guide complet sur l\'ESG Advisory en Afrique : Standards de Performance IFC, GRI Standards, ISSB IFRS S1/S2, SASB. Due diligence ESG, reporting ESG, intégration réglementaire BCEAO/COBAC. Khepra Experts — 20+ pays.'}
        keywords={isEn
          ? 'ESG advisory Africa, IFC performance standards, GRI standards Africa, ISSB IFRS S1 S2, ESG due diligence Africa, ESG reporting BCEAO, ESG compliance COBAC, ESG investment Africa'
          : 'ESG advisory Afrique, standards performance IFC, GRI standards Afrique, ISSB IFRS S1 S2, due diligence ESG Afrique, reporting ESG BCEAO, conformité ESG COBAC, investissement ESG Afrique'}
        canonicalPath="/knowledge-hub/esg"
        schemaJson={schemaFaq}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #061a10 0%, #0a2a1a 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(34,160,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,160,90,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(34,160,90,0.15) 0%, transparent 60%)' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs mb-8">
              <button onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Khepra Experts</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <button onClick={() => navigate('/knowledge-hub')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Knowledge Hub</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <span className="font-semibold" style={{ color: '#22a05a' }}>ESG Advisory</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(34,160,90,0.12)', border: '1px solid rgba(34,160,90,0.30)' }}>
              <i className="ri-leaf-line text-xs" style={{ color: '#22a05a' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#22a05a' }}>Knowledge Hub · ESG</span>
            </div>

            <h1 className="font-playfair font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>ESG Advisory in Africa<br />
                  <span style={{ background: 'linear-gradient(90deg, #86efac, #22a05a, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    IFC, GRI, ISSB Standards Guide
                  </span>
                </>
              ) : (
                <>ESG Advisory en Afrique<br />
                  <span style={{ background: 'linear-gradient(90deg, #86efac, #22a05a, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Guide Standards IFC, GRI, ISSB
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {isEn
                ? 'Guide to ESG integration for African institutions: IFC Performance Standards, GRI Standards, ISSB IFRS S1/S2, BCEAO/COBAC regulatory requirements. By Khepra Experts — ESG reference firm in Francophone Africa.'
                : 'Guide d\'intégration ESG pour les institutions africaines : Standards de Performance IFC, GRI Standards, ISSB IFRS S1/S2, exigences réglementaires BCEAO/COBAC. Par Khepra Experts — cabinet de référence ESG en Afrique francophone.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/tools/diagnostic-esg-impact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #22a05a, #34d399)', color: '#fff' }}
              >
                <i className="ri-leaf-line" />
                {isEn ? 'Free ESG Diagnostic' : 'Diagnostic ESG Gratuit'}
              </button>
              <button
                onClick={() => navigate('/services/conseil-strategique')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              >
                <i className="ri-phone-line" />
                {isEn ? 'Talk to an ESG Expert' : 'Parler à un expert ESG'}
              </button>
            </div>
          </div>
        </section>

        {/* ESG Pillars */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">
                {isEn ? 'The 3 ESG pillars' : 'Les 3 piliers ESG'}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {isEn
                  ? 'ESG covers three dimensions that increasingly determine access to international financing and regulatory compliance.'
                  : 'L\'ESG couvre trois dimensions qui déterminent de plus en plus l\'accès aux financements internationaux et la conformité réglementaire.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="rounded-2xl p-6 border text-center" style={{ background: `${p.color}05`, borderColor: `${p.color}18` }}>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-4" style={{ background: `${p.color}12`, border: `1.5px solid ${p.color}25` }}>
                    <i className={`${p.icon} text-xl`} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">{isEn ? p.labelEn : p.labelFr}</h3>
                  <p className="text-sm text-gray-500">{isEn ? p.descEn : p.descFr}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Standards grid */}
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                {isEn ? 'Main ESG standards mastered by Khepra' : 'Principaux standards ESG maîtrisés par Khepra'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STANDARDS.map((std, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.04)', border: '1px solid rgba(34,160,90,0.12)' }}>
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,160,90,0.12)' }}>
                      <i className="ri-check-line text-sm" style={{ color: '#22a05a' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 mb-1">{std.name}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{isEn ? std.descEn : std.descFr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">FAQ — ESG en Afrique</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(34,160,90,0.04)', border: '1px solid rgba(34,160,90,0.12)' }}>
                    <p className="font-bold text-gray-900 mb-2">{isEn ? faq.qEn : faq.qFr}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{isEn ? faq.aEn : faq.aFr}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Related hubs strip */}
        <section className="py-10 border-t" style={{ borderColor: 'rgba(212,168,42,0.15)', background: '#fffdf7' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold text-gray-700">{isEn ? 'Explore related Knowledge Hubs:' : 'Explorer les Knowledge Hubs associés :'}</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Due Diligence', href: '/knowledge-hub/due-diligence', icon: 'ri-search-eye-line' },
                { label: 'Gouvernance BCEAO', href: '/knowledge-hub/bceao', icon: 'ri-bank-line' },
                { label: 'Conformité COBAC', href: '/knowledge-hub/cobac', icon: 'ri-shield-check-line' },
              ].map((link, i) => (
                <button key={i} onClick={() => navigate(link.href)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all hover:opacity-80"
                  style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)', color: '#b8891a' }}
                >
                  <i className={`${link.icon} text-xs`} />
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}