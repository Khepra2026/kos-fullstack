import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const PAGE_PATH = '/case-studies/ingenierie-financiere-projet-industriel-cedao';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=aerial%20panoramic%20view%20of%20modern%20industrial%20granite%20quarry%20with%20large%20Metso%20crushing%20machinery%20and%20conveyor%20systems%20in%20West%20African%20savanna%20landscape%20Togo%20region%2C%20solar%20panel%20array%20integrated%20into%20mining%20site%20for%20hybrid%20renewable%20energy%2C%20heavy%20excavators%20and%20dump%20trucks%20operating%20in%20open%20pit%2C%20piles%20of%20crushed%20stone%20aggregates%20in%20various%20gradations%2C%20professional%20financial%20documents%20and%20investment%20charts%20floating%20subtly%20in%20foreground%2C%20warm%20golden%20hour%20light%20over%20industrial%20site%2C%20clean%20institutional%20aesthetic%20with%20warm%20amber%20and%20earth%20tones%2C%20premium%20consulting%20photography%20style%20showing%20the%20intersection%20of%20heavy%20industry%20and%20financial%20engineering&width=1600&height=800&seq=cs-fineng-hero-v1&orientation=landscape';

const CTX_IMAGE = 'https://readdy.ai/api/search-image?query=modern%20african%20industrial%20mining%20site%20in%20West%20Africa%20Togo%20region%2C%20granite%20quarry%20with%20Metso%20crushing%20plant%20and%20conveyor%20belts%20under%20blue%20sky%2C%20piles%20of%20crushed%20stone%20aggregates%20in%20multiple%20gradations%200-6%205-15%2010-14%2010-20%2015-25%200-31%2C%20heavy%20mining%20trucks%20and%20excavators%20operating%2C%20dust%20particles%20in%20morning%20sunlight%2C%20wide%20angle%20shot%20showing%20full%20scale%20of%20industrial%20quarry%20operations%20with%2028%20hectare%20site%2C%20professional%20industrial%20documentary%20photography%20with%20financial%20engineering%20overlay%2C%20clean%20warm%20earth%20tones&width=800&height=500&seq=cs-fineng-context-v1&orientation=landscape';

const SOLAR_IMAGE = 'https://readdy.ai/api/search-image?query=hybrid%20solar%20photovoltaic%20power%20plant%20installation%20at%20african%20industrial%20mining%20quarry%20site%20in%20Togo%2C%20large%20solar%20panel%20arrays%20covering%20several%20hectares%20adjacent%20to%20granite%20crushing%20facility%2C%20modern%20renewable%20energy%20integration%20with%20industrial%20operations%2C%20blue%20solar%20panels%20gleaming%20under%20bright%20african%20sun%2C%20clean%20energy%20transition%20at%20heavy%20industry%20site%2C%20wide%20angle%20view%20showing%20contrast%20between%20industrial%20mining%20equipment%20and%20green%20energy%20infrastructure%2C%20professional%20environmental%20engineering%20photography%20with%20warm%20natural%20lighting%2C%20ESG%20compliance%20visual&width=800&height=500&seq=cs-fineng-solar-v1&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Financial Engineering & Senior Debt Structuring for a Major Industrial Granite Project — 15.6 Billion FCFA Financing | KHEPRA EXPERTS'
        : 'Étude de cas : Ingénierie financière & Structuration de dette senior pour un projet industriel d\'envergure — Financement de 15,6 Mds FCFA | KHEPRA EXPERTS',
      description: isEn
        ? 'How KHEPRA EXPERTS structured a 15.6 billion FCFA dual-debt financing for an industrial granite quarry expansion from pilot phase (265,000 t/year) to full industrial production (795,000 t/year by 2028). NPV 3.28 Bn FCFA, Project IRR 17.2%, average DSCR 2.41x. ESG-compliant with 35% decarbonation via hybrid solar plant.'
        : 'Comment KHEPRA EXPERTS a structuré un financement dual de 15,6 milliards FCFA pour l\'expansion d\'une carrière de granite de la phase pilote (265 000 t/an) à la production industrielle (795 000 t/an horizon 2028). VAN 3,28 Mds FCFA, TRI Projet 17,2%, DSCR moyen 2,41x. Conforme ESG avec 35% de décarbonation via centrale solaire hybride.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-04',
      dateModified: '2026-06-04',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'Ingénierie financière Togo' },
        { '@type': 'Thing', name: 'Levée de fonds Afrique de l\'Ouest' },
        { '@type': 'Thing', name: 'Business Plan industriel ESG' },
        { '@type': 'Thing', name: 'Modélisation financière UEMOA' },
        { '@type': 'Thing', name: 'Bancabilité projet minier CEDEAO' },
        { '@type': 'Thing', name: 'DSCR dette senior structurée' },
        { '@type': 'Thing', name: 'SYSCOHADA OHADA financement projet' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'Financial Engineering — Industrial Project' : 'Ingénierie financière — Projet industriel' },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
      address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
    },
  ],
});

export default function IngenierieFinanciereIndustrielCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const ogTitle = isEn
    ? 'Case Study: Financial Engineering — 15.6 Bn FCFA Industrial Project Financing | KHEPRA EXPERTS Lomé'
    : 'Étude de cas : Ingénierie financière — Financement de 15,6 Mds FCFA pour projet industriel | KHEPRA EXPERTS Lomé';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS structured a dual-debt financing of 15.6 billion FCFA for an industrial granite quarry expansion from pilot to full production. NPV 3.28 Bn, IRR 17.2%, DSCR 2.41x, 35% decarbonation via solar. IFC Performance Standards compliant.'
    : 'Comment KHEPRA EXPERTS a structuré un financement dual de 15,6 milliards FCFA pour l\'expansion d\'une carrière de granite de la phase pilote à la production industrielle. VAN 3,28 Mds, TRI 17,2%, DSCR 2,41x, 35% de décarbonation via solaire. Conforme IFC Performance Standards.';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'financial engineering Togo Lomé, industrial project fundraising West Africa, senior debt structuring ECOWAS, mining project bankability CEDEAO, DSCR financial modeling UEMOA, ESG IFC Performance Standards, OHADA SYSCOHADA business plan, ALPHA MINING granite quarry, KHEPRA EXPERTS investment advisory'
          : 'cabinet conseil stratégie financière Lomé, ingénierie financière Togo, levée de fonds investissement Afrique de l\'Ouest, Business Plan industriel conformité ESG, modélisation financière zone UEMOA, bancabilité projet minier CEDEAO, financement de projet capital-investissement Afrique, structuration dette senior OHADA, KHEPRA EXPERTS Lomé quartier Logogomè'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn ? 'Financial Engineering Case Study — Industrial Project CEDEAO — KHEPRA EXPERTS' : 'Étude de cas Ingénierie financière — Projet industriel CEDEAO — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Financing' : 'Financement'}
        twitterData1="15,6 Mds FCFA"
        twitterLabel2={isEn ? 'DSCR' : 'DSCR'}
        twitterData2="2,41x"
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['Financial Engineering', 'Senior Debt', 'Industrial Project', 'ESG', 'DSCR', 'IFC Performance Standards', 'SYSCOHADA', 'Mining', 'Granite Quarry', 'DFI', 'ECOWAS'] : ['Ingénierie financière', 'Dette senior', 'Projet industriel', 'ESG', 'DSCR', 'IFC Performance Standards', 'SYSCOHADA', 'Minier', 'Carrière de granite', 'IFD', 'CEDEAO']}
        articlePublishedTime="2026-06-04"
        articleModifiedTime="2026-06-04"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                { question: 'What financial metrics make an industrial mining project bankable in West Africa?', answer: 'Key metrics validated by KHEPRA EXPERTS: positive NPV at 12% discount rate (3,280 M FCFA), Project IRR above 15% (17.2%), Equity IRR above 20% (21.6%), average DSCR above 1.5x (2.41x with controlled low point of 1.68x). ESG compliance — 35% decarbonation via 3-4 MWc hybrid solar plant (1,712 M FCFA) — ensures Green Bank eligibility under IFC Performance Standards.' },
                { question: 'How is a dual debt structure designed for an industrial project in the ECOWAS zone?', answer: 'KHEPRA EXPERTS designed: (1) Senior CAPEX debt of 8,899 M FCFA (8%, 8yr, 24mo grace) with a Regional DFI; (2) Working capital line of 2,541 M FCFA with a Lomé commercial bank. Gap covered by paid-in capital (2,500 M FCFA) and phased shareholder contributions (1,657 M FCFA over 2027-2028). Conservative gearing ratio acceptable to both credit committees.' },
                { question: 'How does ESG compliance improve industrial project bankability in Africa?', answer: 'A 3-4 MWc hybrid solar plant (1,712 M FCFA) delivers 35% carbon reduction — triggering Green Bank eligibility and cutting energy costs ~40%. Full IFC Performance Standards (PS1-PS8) compliance transforms the project from conventional extractive to sustainable infrastructure investment — a critical differentiator in DFI credit committee evaluations.' },
                { question: 'Why choose a Lomé-based firm for industrial project financial engineering in Francophone Africa?', answer: 'Three advantages: (1) OHADA/SYSCOHADA mastery for financial models acceptable to DFIs and banks; (2) Institutional intimacy with ECOWAS development finance institutions — understanding unpublished credit committee dynamics; (3) On-the-ground presence enabling continuous dialogue with notaries, mining administration, tax authorities, and banks within the Lomé financial ecosystem.' },
              ]
            : [
                { question: 'Quels indicateurs financiers rendent un projet minier industriel bancable en Afrique de l\'Ouest ?', answer: 'Indicateurs clés validés par KHEPRA EXPERTS : VAN positive à 12% (3 280 M FCFA), TRI Projet supérieur à 15% (17,2%), TRI Actionnaire supérieur à 20% (21,6%), DSCR moyen supérieur à 1,5x (2,41x avec point bas maîtrisé à 1,68x). La conformité ESG — 35% de décarbonation via centrale solaire hybride 3-4 MWc (1 712 M FCFA) — garantit l\'éligibilité aux critères Banque Verte selon les IFC Performance Standards.' },
                { question: 'Comment structure-t-on une dette duale (senior + BFR) pour un projet industriel en zone CEDEAO ?', answer: 'KHEPRA EXPERTS a conçu : (1) Dette senior CAPEX de 8 899 M FCFA (8%, 8 ans, différé 24 mois) auprès d\'une IFD régionale ; (2) Ligne BFR de 2 541 M FCFA auprès d\'une banque commerciale de Lomé. Gap couvert par capital libéré (2 500 M FCFA) et CCA échelonné (1 657 M FCFA sur 2027-2028). Ratio de gearing conservateur acceptable par les deux comités de crédit.' },
                { question: 'Comment la conformité ESG améliore-t-elle la bancabilité d\'un projet industriel en Afrique ?', answer: 'Une centrale solaire hybride de 3-4 MWc (1 712 M FCFA) permet 35% de réduction carbone — déclenchant l\'éligibilité Banque Verte et réduisant les coûts énergétiques d\'environ 40%. La conformité aux huit IFC Performance Standards (PS1-PS8) transforme le projet d\'une opération extractive conventionnelle en investissement d\'infrastructure durable — un différenciateur critique en comité de crédit IFD.' },
                { question: 'Pourquoi choisir un cabinet basé à Lomé pour l\'ingénierie financière de projets industriels en Afrique francophone ?', answer: 'Trois avantages : (1) Maîtrise du cadre OHADA/SYSCOHADA pour des modèles financiers acceptables par les IFD et banques ; (2) Intimité institutionnelle avec les institutions de financement du développement de la CEDEAO — compréhension des dynamiques de comité de crédit non publiées ; (3) Présence terrain permettant un dialogue continu avec le Notaire de la place de Lomé, l\'administration minière, les autorités fiscales et la banque commerciale au sein de l\'écosystème financier loméen.' },
              ]
        }
      />
      <Navigation />

      <div className="pt-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Case Studies' : 'Études de cas', href: '/case-studies' },
              { label: isEn ? 'Financial Engineering — Industrial Project' : 'Ingénierie financière — Projet industriel' },
            ]}
          />
        </div>
      </div>

      <main>
        <HeroSection isEn={isEn} />
        <ExecutiveSummary isEn={isEn} />
        <DefiSection isEn={isEn} />
        <SolutionSection isEn={isEn} />
        <ResultatsSection isEn={isEn} />
        <ConclusionSection isEn={isEn} />
        <FAQSection isEn={isEn} />
        <CTASection isEn={isEn} />
      </main>

      <Footer />
    </div>
  );
}

// ═══════════════════════ HERO ═══════════════════════
function HeroSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="relative min-h-[500px] md:min-h-[580px] flex items-end pb-14 md:pb-18 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt={isEn ? 'Industrial granite quarry with financial engineering overlay — KHEPRA EXPERTS case study' : 'Carrière de granite industrielle avec ingénierie financière — Étude de cas KHEPRA EXPERTS'} className="w-full h-full object-cover object-top" loading="eager" width="1600" height="800" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/80"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/25 border border-amber-400/45 text-amber-300">
              <i className="ri-funds-box-line"></i>
              {isEn ? 'Financial Engineering — 15.6 Bn FCFA' : 'Ingénierie financière — 15,6 Mds FCFA'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>2025-2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-sun-line"></i>
              {isEn ? 'ESG — 35% Decarbonation' : 'ESG — 35% Décarbonation'}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Financial Engineering & Senior Debt Structuring: 15.6 Billion FCFA Financing for an Industrial Granite Mega-Project in the ECOWAS Zone'
              : 'Ingénierie financière & Structuration de dette senior : Financement de 15,6 milliards FCFA pour un méga-projet industriel de granite en zone CEDEAO'}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS designed a dual-debt financial architecture — 8.9 Bn FCFA senior CAPEX + 2.5 Bn FCFA working capital — to transform ALPHA MINING & INFRASTRUCTURE SA from a pilot quarry (265,000 t/year) into a 795,000 t/year industrial flagship. NPV 3.28 Bn, IRR 17.2%, average DSCR 2.41x, 35% carbon reduction via hybrid solar plant. IFC Performance Standards compliant. Updated June 2026.'
              : 'Comment KHEPRA EXPERTS a conçu une architecture financière duale — 8,9 Mds FCFA de dette senior CAPEX + 2,5 Mds FCFA de ligne BFR — pour transformer ALPHA MINING & INFRASTRUCTURE SA d\'une carrière pilote (265 000 t/an) en fleuron industriel de 795 000 t/an. VAN 3,28 Mds, TRI 17,2%, DSCR moyen 2,41x, 35% de réduction carbone via centrale solaire hybride. Conforme IFC Performance Standards. Actualisé Juin 2026.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ EXECUTIVE SUMMARY ═══════════════════════
function ExecutiveSummary({ isEn }: { isEn: boolean }) {
  const kpis = [
    { value: '15 597 M', label: isEn ? 'Total Envelope (FCFA)' : 'Enveloppe totale (FCFA)', icon: 'ri-funds-box-line', color: 'amber' },
    { value: '2,41x', label: isEn ? 'Average DSCR' : 'DSCR Moyen', icon: 'ri-line-chart-line', color: 'emerald' },
    { value: '17,2%', label: isEn ? 'Project IRR' : 'TRI Projet', icon: 'ri-percent-line', color: 'teal' },
    { value: '35%', label: isEn ? 'Decarbonation (Solar)' : 'Décarbonation (Solaire)', icon: 'ri-sun-line', color: 'green' },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <i className="ri-file-text-line text-amber-600 text-lg"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {isEn ? 'Executive Summary — The Dual Challenge of Capital Intensity & Bankability' : 'Résumé Exécutif — Le double défi de l\'intensité capitalistique et de la bancabilité'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              {isEn
                ? 'ALPHA MINING & INFRASTRUCTURE SA (AMI SA) had successfully validated its pilot phase (2024-2026), reaching 265,000 tons/year of granite aggregate production and accumulating 2,156 M FCFA in tangible assets entirely from equity. However, scaling to industrial production — 795,000 tons/year with international-standard Metso technology — required mobilizing 15,597 M FCFA, an amount exceeding the capacity of any single financing source in the ECOWAS zone. The challenge was not merely raising capital: it was proving to a Regional Development Finance Institution (DFI) and a Lomé-based commercial bank that a dual-debt structure could be designed with robust coverage ratios, even under conservative stress scenarios, while meeting increasingly stringent ESG criteria.'
                : 'ALPHA MINING & INFRASTRUCTURE SA (AMI SA) avait validé avec succès sa phase pilote (2024-2026), atteignant 265 000 tonnes/an de production de granulats de granite et accumulant 2 156 M FCFA d\'actifs corporels entièrement sur fonds propres. Cependant, le passage à l\'échelle industrielle — 795 000 tonnes/an avec une technologie Metso standard international — nécessitait de mobiliser 15 597 M FCFA, un montant dépassant la capacité d\'une source unique de financement dans la zone CEDEAO. Le défi n\'était pas simplement de lever des capitaux : il s\'agissait de prouver à une Institution Financière de Développement Régionale (IFD) et à une banque commerciale de la place de Lomé qu\'une structure de dette duale pouvait être conçue avec des ratios de couverture robustes, même sous scénarios de stress conservateurs, tout en satisfaisant des critères ESG de plus en plus exigeants.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi, i) => {
              const colorMap: Record<string, string> = { amber: 'from-amber-50 to-white border-amber-100', emerald: 'from-emerald-50 to-white border-emerald-100', teal: 'from-teal-50 to-white border-teal-100', green: 'from-green-50 to-white border-green-100' };
              const iconColorMap: Record<string, string> = { amber: 'text-amber-600 bg-amber-100', emerald: 'text-emerald-600 bg-emerald-100', teal: 'text-teal-600 bg-teal-100', green: 'text-green-600 bg-green-100' };
              return (
                <div key={i} className={`text-center p-4 rounded-xl bg-gradient-to-br ${colorMap[kpi.color]} border`}>
                  <div className={`w-10 h-10 rounded-full ${iconColorMap[kpi.color]} flex items-center justify-center mx-auto mb-2`}>
                    <i className={`${kpi.icon} text-lg`}></i>
                  </div>
                  <div className={`text-2xl md:text-3xl font-extrabold ${kpi.color === 'amber' ? 'text-amber-600' : kpi.color === 'emerald' ? 'text-emerald-600' : kpi.color === 'teal' ? 'text-teal-600' : 'text-green-600'} mb-1`}>{kpi.value}</div>
                  <div className="text-xs text-gray-600 leading-tight">{kpi.label}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-amber-800">{isEn ? 'Update — June 2026: ' : 'Mise à jour — Juin 2026 : '}</strong>
              {isEn
                ? 'This case study has been updated to reflect the 2026 financial engineering milestones: the definitive business plan has been validated, the dual-debt term sheet has been structured (8,899 M FCFA senior + 2,541 M FCFA working capital), and advanced negotiations are underway with the Regional DFI and the Lomé-based commercial bank. The project is currently in the credit committee review phase. KHEPRA EXPERTS continues to lead the financial advisory mandate, including sensitivity analysis defense and ESG compliance documentation.'
                : 'Cette étude de cas a été actualisée pour refléter les jalons d\'ingénierie financière 2026 : le Business Plan définitif a été validé, le term sheet de la dette duale a été structuré (8 899 M FCFA senior + 2 541 M FCFA BFR), et les négociations avancées sont en cours avec l\'IFD régionale et la banque commerciale de la place de Lomé. Le projet est actuellement en phase d\'examen par les comités de crédit. KHEPRA EXPERTS continue de piloter le mandat de conseil financier, incluant la défense des analyses de sensibilité et la documentation de conformité ESG.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ I. LE DÉFI ═══════════════════════
function DefiSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>{isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'The Challenge — Proving Bankability for a Capital-Intensive Industrial Project in a Structurally Under-Supplied Market' : 'Le Défi — Prouver la bancabilité d\'un projet industriel capitalistique dans un marché structurellement sous-approvisionné'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Context */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {isEn
                ? 'The Plateaux Region mining site in Togo represents a strategic granite deposit with exceptional mechanical properties — ideal for producing crushed aggregates in six gradations (0/6, 5/15, 10/14, 10/20, 15/25, 0/31 mm) and premium dimension stone slabs destined for major BTP contractors and cement manufacturers across the sub-region. The 28+ hectare concession, validated during the 2024-2026 pilot phase, demonstrated a production capacity of 265,000 tons/year. Market analysis revealed a structural supply deficit in the ECOWAS construction materials market, with demand projected to grow at 8-12% annually driven by infrastructure mega-projects across Togo, Benin, Burkina Faso, and beyond.'
                : 'Le site minier de la Région des Plateaux (Togo) représente un gisement stratégique de granite aux propriétés mécaniques exceptionnelles — idéal pour la production de granulats concassés en six granulométries (0/6, 5/15, 10/14, 10/20, 15/25, 0/31 mm) et de dalles de pierre dimensionnelle premium destinées aux majors du BTP et aux cimentiers de premier plan de la sous-région. La concession de 28+ hectares, validée durant la phase pilote 2024-2026, a démontré une capacité de production de 265 000 tonnes/an. L\'analyse de marché a révélé un déficit d\'approvisionnement structurel du marché des matériaux de construction en zone CEDEAO, avec une demande projetée en croissance de 8 à 12% par an, tirée par les méga-projets d\'infrastructure au Togo, au Bénin, au Burkina Faso et au-delà.'}
            </p>
          </div>

          {/* Image contextuelle */}
          <div className="rounded-2xl overflow-hidden">
            <img src={CTX_IMAGE} alt={isEn ? 'Industrial granite quarry operations — AMI SA' : 'Exploitation industrielle de carrière de granite — AMI SA'} className="w-full h-auto object-cover" loading="lazy" width="800" height="500" decoding="async" />
          </div>

          {/* Les 3 dimensions critiques */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <i className="ri-alert-line text-amber-600"></i>
              {isEn ? 'The Three Critical Dimensions of Bankability' : 'Les trois dimensions critiques de la bancabilité'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: isEn ? '1. Capital Intensity' : '1. Intensité capitalistique',
                  desc: isEn
                    ? 'The CAPEX requirement — 8,899 M FCFA for Metso crushing equipment, civil works, and the hybrid solar plant — represented 57% of the total envelope. A single-source financing was structurally impossible in the ECOWAS banking ecosystem, requiring innovative dual-debt architecture.'
                    : 'Le besoin en CAPEX — 8 899 M FCFA pour les équipements de concassage Metso, le génie civil et la centrale solaire hybride — représentait 57% de l\'enveloppe totale. Un financement mono-source était structurellement impossible dans l\'écosystème bancaire CEDEAO, imposant une architecture de dette duale innovante.',
                  icon: 'ri-money-dollar-circle-line',
                },
                {
                  title: isEn ? '2. Financial Modeling Rigor' : '2. Rigueur de la modélisation',
                  desc: isEn
                    ? 'A 10-year horizon (2026-2036) financial model was required by the DFI — integrating TAM/SAM/SOM market sizing, SWOT-TOWS cross-analysis, SYSCOHADA-compliant accounting, and three-tier sensitivity scenarios to withstand credit committee scrutiny.'
                    : 'Un modèle financier sur horizon décennal (2026-2036) était exigé par l\'IFD — intégrant le dimensionnement de marché TAM/SAM/SOM, l\'analyse croisée SWOT-TOWS, la comptabilité SYSCOHADA révisée et des scénarios de sensibilité à trois niveaux pour résister à l\'examen des comités de crédit.',
                  icon: 'ri-bar-chart-grouped-line',
                },
                {
                  title: isEn ? '3. ESG Compliance Imperative' : '3. Impératif de conformité ESG',
                  desc: isEn
                    ? 'The Regional DFI\'s Green Bank criteria required demonstrated environmental commitment. Without a decarbonation strategy, the project risked disqualification. The answer: a 3-4 MWc hybrid solar plant reducing carbon footprint by 35% and energy costs by ~40%.'
                    : 'Les critères Banque Verte de l\'IFD régionale exigeaient un engagement environnemental démontré. Sans stratégie de décarbonation, le projet risquait la disqualification. La réponse : une centrale solaire hybride de 3-4 MWc réduisant l\'empreinte carbone de 35% et les coûts énergétiques d\'environ 40%.',
                  icon: 'ri-leaf-line',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                    <i className={`${item.icon} text-amber-600 text-lg`}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ II. LA SOLUTION ═══════════════════════
function SolutionSection({ isEn }: { isEn: boolean }) {
  const debtItems = [
    {
      label: isEn ? 'Senior CAPEX Debt' : 'Dette senior CAPEX',
      value: '8 899 M FCFA',
      detail: isEn ? 'Fixed 8% · 8 years · 24-month grace · Regional DFI' : 'Taux fixe 8% · 8 ans · Différé 24 mois · IFD régionale',
      icon: 'ri-bank-line',
    },
    {
      label: isEn ? 'Working Capital Line' : 'Ligne de crédit BFR',
      value: '2 541 M FCFA',
      detail: isEn ? 'Lomé-based commercial bank · Operational ramp-up' : 'Banque commerciale de la place de Lomé · Montée en puissance',
      icon: 'ri-exchange-funds-line',
    },
    {
      label: isEn ? 'Paid-in Capital' : 'Capital social libéré',
      value: '2 500 M FCFA',
      detail: isEn ? 'Shareholder equity · Fully paid' : 'Fonds propres actionnaires · Entièrement libéré',
      icon: 'ri-shield-check-line',
    },
    {
      label: isEn ? 'Shareholder Current Account' : 'Compte Courant d\'Associés',
      value: '1 657 M FCFA',
      detail: isEn ? 'Phased 2027-2028 · Bridging contribution' : 'Échelonné 2027-2028 · Apport complémentaire',
      icon: 'ri-calendar-check-line',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-flash-line"></i>{isEn ? 'PART II' : 'PARTIE II'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'KHEPRA EXPERTS\' Strategic Response — Advanced Financial Engineering, Dual-Debt Architecture & ESG Integration' : 'La Réponse Stratégique de KHEPRA EXPERTS — Ingénierie financière avancée, architecture de dette duale & intégration ESG'}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {isEn
              ? 'KHEPRA EXPERTS deployed a comprehensive three-axis financial engineering methodology, transforming a promising but unfinanceable pilot project into a bankable industrial flagship. Each axis addressed a specific dimension of the credit committee\'s evaluation framework.'
              : 'KHEPRA EXPERTS a déployé une méthodologie d\'ingénierie financière complète en trois axes, transformant un projet pilote prometteur mais non finançable en fleuron industriel bancable. Chaque axe adressait une dimension spécifique de la grille d\'évaluation des comités de crédit.'}
          </p>
          <div className="w-20 h-1 bg-amber-500 rounded-full mt-4"></div>
        </div>

        <div className="space-y-8">
          {/* Axis 1: Financial Modeling */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-white font-extrabold text-xl">1</span></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Axis 1: Decennial Financial Modeling — TAM/SAM/SOM, SWOT-TOWS & Sensitivity Analysis' : 'Axe 1 : Modélisation financière décennale — TAM/SAM/SOM, SWOT-TOWS & Analyse de sensibilité'}
                  </h3>
                  <p className="text-amber-200 text-sm mt-0.5">{isEn ? 'SYSCOHADA Revised · IFC Performance Standards · 3 Stress Scenarios' : 'SYSCOHADA Révisé · IFC Performance Standards · 3 Scénarios de stress'}</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'Our Approach' : 'Notre Approche'}</h4>
                <ul className="space-y-1.5">
                  {[
                    isEn ? 'TAM/SAM/SOM market analysis: Total Addressable Market (ECOWAS construction materials), Serviceable Addressable Market (Togo + border regions of Benin, Burkina Faso, Ghana), Serviceable Obtainable Market (targeted 795,000 t/year by 2028, representing ~12% SOM penetration)' : 'Analyse de marché TAM/SAM/SOM : Marché Total Adressable (matériaux de construction CEDEAO), Marché Adressable Desservable (Togo + régions frontalières Bénin, Burkina Faso, Ghana), Marché Obtenable (795 000 t/an ciblées horizon 2028, représentant ~12% de pénétration SOM)',
                    isEn ? 'SWOT-TOWS cross-analysis matrix: translating internal strengths/weaknesses and external opportunities/threats into actionable strategic initiatives — with specific TOWS-generated strategies for each of the 6 aggregate gradations and premium slab product lines' : 'Matrice d\'analyse croisée SWOT-TOWS : traduction des forces/faiblesses internes et opportunités/menaces externes en initiatives stratégiques actionnables — avec des stratégies TOWS spécifiques pour chacune des 6 granulométries et la ligne de produits dalles premium',
                    isEn ? '10-year financial model (2026-2036): SYSCOHADA-compliant P&L, balance sheet, cash flow statement, with granular CAPEX phasing (Metso equipment delivery timeline), working capital modeling (inventory buffer, receivables cycle), and debt service schedule synchronized with the 24-month grace period' : 'Modèle financier décennal (2026-2036) : compte de résultat, bilan et tableau de flux de trésorerie conformes SYSCOHADA, avec phasage CAPEX granulaire (calendrier de livraison équipements Metso), modélisation du BFR (stock tampon, cycle créances clients) et échéancier du service de la dette synchronisé avec le différé de 24 mois',
                    isEn ? 'Three-tier sensitivity scenarios: conservative (demand -15%, price -10%), base case, and optimistic (demand +10%, price +5%) — with DSCR, IRR, and NPV trajectories computed for each scenario to demonstrate robustness under stress' : 'Scénarios de sensibilité à trois niveaux : conservateur (demande -15%, prix -10%), cas de base et optimiste (demande +10%, prix +5%) — avec trajectoires DSCR, TRI et VAN calculées pour chaque scénario afin de démontrer la robustesse sous stress',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><i className="ri-checkbox-circle-fill text-amber-500 mt-0.5 shrink-0"></i><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3">{isEn ? 'Key Deliverable' : 'Livrable clé'}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'A 340-page Definitive Business Plan — structured as a DFI-format investment memorandum — including: executive summary, market analysis, technical dimensioning (Metso 200-250 t/h crushing unit), financial model with integrated financial statements, risk matrix with mitigation strategies, ESG compliance appendix (IFC PS1-PS8 self-assessment), and the complete sensitivity analysis package for credit committee defense.'
                    : 'Un Business Plan Définitif de 340 pages — structuré comme un mémorandum d\'investissement format IFD — incluant : synthèse exécutive, analyse de marché, dimensionnement technique (unité de concassage Metso 200-250 t/h), modèle financier avec états financiers intégrés, matrice des risques avec stratégies de mitigation, annexe de conformité ESG (auto-évaluation IFC PS1-PS8) et le package complet d\'analyse de sensibilité pour la défense en comité de crédit.'}
                </p>
              </div>
            </div>
          </div>

          {/* Axis 2: Dual-Debt Architecture */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-white font-extrabold text-xl">2</span></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Axis 2: Dual-Debt Architecture — Senior CAPEX + Working Capital Line' : 'Axe 2 : Architecture de dette duale — Dette senior CAPEX + Ligne de crédit BFR'}
                  </h3>
                  <p className="text-teal-200 text-sm mt-0.5">{isEn ? '8,899 M + 2,541 M FCFA · Fixed Rate 8% · 24-Month Grace Period' : '8 899 M + 2 541 M FCFA · Taux fixe 8% · Différé 24 mois'}</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {debtItems.map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-2">
                      <i className={`${item.icon} text-teal-600 text-lg`}></i>
                    </div>
                    <div className="text-xl font-extrabold text-teal-700 mb-1">{item.value}</div>
                    <div className="text-xs font-bold text-gray-800 mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500 leading-tight">{item.detail}</div>
                  </div>
                ))}
              </div>
              <div className="bg-teal-50 rounded-xl p-5 border border-teal-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The dual-debt structure is deliberately asymmetrical: the senior CAPEX debt (8,899 M FCFA, 57% of the envelope) covers long-term capital expenditure — Metso crushing equipment, civil works, and the hybrid solar plant — with a fixed 8% rate, 8-year maturity, and 24-month grace period aligned with the construction and commissioning timeline. The working capital line (2,541 M FCFA, 16%) covers operational ramp-up, raw material buffer stock, and receivables financing during the transition from 265,000 to 795,000 t/year. The remaining 27% is covered by equity (2,500 M FCFA paid-in capital) and phased shareholder contributions (1,657 M FCFA over 2027-2028). This structure achieves a conservative gearing ratio while ensuring that the DSCR never falls below 1.68x — even in 2029, the year of the first full annuity post-grace period.'
                    : 'La structure de dette duale est délibérément asymétrique : la dette senior CAPEX (8 899 M FCFA, 57% de l\'enveloppe) couvre les dépenses d\'investissement long terme — équipements de concassage Metso, génie civil et centrale solaire hybride — avec un taux fixe de 8%, une maturité de 8 ans et un différé de 24 mois aligné sur le calendrier de construction et de mise en service. La ligne de crédit BFR (2 541 M FCFA, 16%) couvre la montée en puissance opérationnelle, le stock tampon de matières premières et le financement des créances clients durant la transition de 265 000 à 795 000 t/an. Les 27% restants sont couverts par les fonds propres (2 500 M FCFA de capital libéré) et les apports échelonnés en CCA (1 657 M FCFA sur 2027-2028). Cette structure atteint un ratio de gearing conservateur tout en garantissant que le DSCR ne tombe jamais sous 1,68x — même en 2029, année de la première annuité complète post-différé.'}
                </p>
              </div>
            </div>
          </div>

          {/* Axis 3: ESG Integration */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-white font-extrabold text-xl">3</span></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Axis 3: ESG Integration — Hybrid Solar Plant & IFC Performance Standards Compliance' : 'Axe 3 : Intégration ESG — Centrale solaire hybride & Conformité IFC Performance Standards'}
                  </h3>
                  <p className="text-green-200 text-sm mt-0.5">{isEn ? '3-4 MWc · 1,712 M FCFA · 35% Decarbonation · Green Bank Eligible' : '3-4 MWc · 1 712 M FCFA · 35% Décarbonation · Éligible Banque Verte'}</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={SOLAR_IMAGE} alt={isEn ? 'Hybrid solar plant at industrial quarry — ESG compliance' : 'Centrale solaire hybride sur carrière industrielle — Conformité ESG'} className="w-full rounded-xl object-cover" loading="lazy" width="800" height="500" decoding="async" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'ESG Value Proposition' : 'Proposition de valeur ESG'}</h4>
                <ul className="space-y-2">
                  {[
                    isEn ? '3-4 MWc hybrid solar plant: 1,712 M FCFA investment, integrated into the senior CAPEX debt envelope — reducing dependence on the unstable national grid and cutting energy operating costs by ~40% versus grid-only power' : 'Centrale solaire hybride 3-4 MWc : investissement de 1 712 M FCFA intégré dans l\'enveloppe de dette senior CAPEX — réduisant la dépendance au réseau national instable et diminuant les coûts opérationnels énergétiques d\'environ 40% par rapport à l\'alimentation réseau seule',
                    isEn ? '35% carbon footprint reduction: quantified through the GHG Protocol methodology, directly triggering eligibility for the Regional DFI\'s Green Bank credit line — a concessional window with preferential pricing terms versus standard DFI lending' : 'Réduction de 35% de l\'empreinte carbone : quantifiée via la méthodologie GHG Protocol, déclenchant directement l\'éligibilité à la ligne de crédit Banque Verte de l\'IFD régionale — un guichet concessionnel avec des conditions tarifaires préférentielles par rapport au prêt IFD standard',
                    isEn ? 'Full IFC Performance Standards compliance (PS1-PS8): environmental and social management system, labor and working conditions, resource efficiency and pollution prevention, community health and safety, land acquisition and involuntary resettlement, biodiversity conservation, indigenous peoples, cultural heritage — documented in a dedicated ESG appendix to the business plan' : 'Conformité intégrale aux IFC Performance Standards (PS1-PS8) : système de gestion environnementale et sociale, conditions de travail, efficience des ressources et prévention de la pollution, santé et sécurité communautaires, acquisition de terres et réinstallation involontaire, conservation de la biodiversité, peuples autochtones, patrimoine culturel — documentés dans une annexe ESG dédiée au Business Plan',
                    isEn ? 'Product diversification strategy validated at 55% EBITDA margin for premium dimension stone slabs — a high-value-add product line that improves the project\'s overall profitability profile while reducing exposure to commodity aggregate price volatility' : 'Stratégie de diversification produit validée à 55% de marge EBITDA pour les dalles de pierre dimensionnelle premium — une ligne de produits à haute valeur ajoutée qui améliore le profil de rentabilité global du projet tout en réduisant l\'exposition à la volatilité des prix des granulats',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><i className="ri-checkbox-circle-fill text-green-500 mt-0.5 shrink-0"></i><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ III. RÉSULTATS ═══════════════════════
function ResultatsSection({ isEn }: { isEn: boolean }) {
  const indicators = [
    { label: 'VAN (12%)', value: '3 280 M FCFA', detail: isEn ? 'Positive NPV at DFI discount rate' : 'VAN positive au taux d\'actualisation IFD', icon: 'ri-funds-line' },
    { label: isEn ? 'Project IRR' : 'TRI Projet', value: '17,2%', detail: isEn ? 'Above 15% DFI threshold' : 'Supérieur au seuil IFD de 15%', icon: 'ri-line-chart-line' },
    { label: isEn ? 'Equity IRR' : 'TRI Actionnaire', value: '21,6%', detail: isEn ? 'Strong shareholder return' : 'Rendement actionnarial solide', icon: 'ri-pie-chart-2-line' },
    { label: isEn ? 'Avg. DSCR' : 'DSCR Moyen', value: '2,41x', detail: isEn ? 'Low point 1.68x (2029)' : 'Point bas 1,68x (2029)', icon: 'ri-bar-chart-grouped-line' },
    { label: isEn ? 'Gearing Ratio' : 'Ratio Gearing', value: isEn ? 'Conservative' : 'Conservateur', detail: isEn ? 'DFI + Bank acceptable' : 'Acceptable IFD + Banque', icon: 'ri-scales-3-line' },
    { label: isEn ? 'EBITDA Margin (Slabs)' : 'Marge EBITDA (Dalles)', value: '55%', detail: isEn ? 'Premium product line' : 'Ligne de produits premium', icon: 'ri-stack-line' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-trophy-line"></i>{isEn ? 'PART III' : 'PARTIE III'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Measurable Results & Strategic Value Creation — A Bankable Dossier, a Controlled Risk Profile' : 'Résultats mesurables & Création de valeur stratégique — Un dossier bancable, un profil de risque maîtrisé'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl border border-gray-200 p-6 md:p-10 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {indicators.map((ind, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                  <i className={`${ind.icon} text-amber-600 text-lg`}></i>
                </div>
                <div className="text-xl font-extrabold text-gray-900 mb-0.5">{ind.value}</div>
                <div className="text-xs font-bold text-amber-700 mb-0.5">{ind.label}</div>
                <div className="text-xs text-gray-500 leading-tight">{ind.detail}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <i className="ri-arrow-left-right-line text-amber-600"></i>
            {isEn ? 'Before / After — The Transformation' : 'Avant / Après — La Transformation'}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left p-3 md:p-4 font-semibold w-1/4">{isEn ? 'Dimension' : 'Dimension'}</th>
                  <th className="text-left p-3 md:p-4 font-semibold w-3/8">{isEn ? 'Before KHEPRA EXPERTS' : 'Avant KHEPRA EXPERTS'}</th>
                  <th className="text-left p-3 md:p-4 font-semibold w-3/8">{isEn ? 'After KHEPRA EXPERTS' : 'Après KHEPRA EXPERTS'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: isEn ? 'Production Capacity' : 'Capacité de production', before: '265 000 t/an (pilote)', after: '795 000 t/an horizon 2028 (triplement via Metso)' },
                  { dim: isEn ? 'Financial Structuring' : 'Structuration financière', before: isEn ? 'Self-financed pilot — no institutional debt' : 'Pilote autofinancé — aucune dette institutionnelle', after: isEn ? 'Dual-debt: 8,899 M senior + 2,541 M BFR + 2,500 M equity' : 'Dette duale : 8 899 M senior + 2 541 M BFR + 2 500 M fonds propres' },
                  { dim: isEn ? 'DSCR Coverage' : 'Couverture DSCR', before: isEn ? 'Not applicable (no debt)' : 'Non applicable (pas de dette)', after: '2,41x moyen — Point bas 1,68x (2029) maîtrisé' },
                  { dim: isEn ? 'ESG Profile' : 'Profil ESG', before: isEn ? 'Grid-only power — no ESG documentation' : 'Alimentation réseau seule — aucune documentation ESG', after: isEn ? '35% decarbonation · IFC PS1-PS8 · Green Bank eligible' : '35% décarbonation · IFC PS1-PS8 · Éligible Banque Verte' },
                  { dim: isEn ? 'Investor Readiness' : 'Investor Readiness', before: isEn ? 'No structured investment memorandum' : 'Pas de mémorandum d\'investissement structuré', after: isEn ? '340-page Definitive Business Plan · Sensitivity Package' : 'Business Plan Définitif 340 pages · Package Sensibilité' },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 md:p-4 font-semibold text-gray-900">{row.dim}</td>
                    <td className="p-3 md:p-4 text-gray-500 text-xs md:text-sm"><i className="ri-close-circle-fill text-red-400 mr-1.5"></i>{row.before}</td>
                    <td className="p-3 md:p-4 text-gray-800 text-xs md:text-sm"><i className="ri-checkbox-circle-fill text-emerald-500 mr-1.5"></i>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: isEn ? 'Bankable Dossier Validated' : 'Dossier bancable validé',
              desc: isEn
                ? 'The definitive business plan — with its integrated financial model, TAM/SAM/SOM market analysis, SWOT-TOWS matrix, and three-tier sensitivity scenarios — has been validated by the client\'s shareholders and presented to the Regional DFI. The project is currently in advanced credit committee review.'
                : 'Le Business Plan définitif — avec son modèle financier intégré, son analyse de marché TAM/SAM/SOM, sa matrice SWOT-TOWS et ses scénarios de sensibilité à trois niveaux — a été validé par les actionnaires du client et présenté à l\'IFD régionale. Le projet est en phase avancée d\'examen par les comités de crédit.',
              icon: 'ri-file-check-line',
            },
            {
              title: isEn ? 'Risk Profile Mastered' : 'Profil de risque maîtrisé',
              desc: isEn
                ? 'Average DSCR of 2.41x — well above the 1.5x threshold typically required by ECOWAS DFIs. The controlled low point of 1.68x in 2029 (first full annuity year post-grace period) has been stress-tested under conservative scenarios and remains above the minimum 1.2x covenant level. The dual-debt structure with fixed-rate senior debt eliminates interest rate risk.'
                : 'DSCR moyen de 2,41x — bien au-dessus du seuil de 1,5x typiquement exigé par les IFD de la CEDEAO. Le point bas maîtrisé de 1,68x en 2029 (première annuité complète post-différé) a été stress-testé sous scénarios conservateurs et reste au-dessus du niveau minimum de covenant de 1,2x. La structure de dette duale avec dette senior à taux fixe élimine le risque de taux d\'intérêt.',
              icon: 'ri-shield-check-line',
            },
            {
              title: isEn ? 'Diversification Strategy' : 'Stratégie de diversification',
              desc: isEn
                ? 'The business plan validates a two-tier product strategy: (1) commodity crushed aggregates in 6 gradations for BTP contractors and cement manufacturers — the volume engine; (2) premium dimension stone slabs at 55% EBITDA margin — the profitability engine. This diversification reduces exposure to construction cycle volatility while maximizing shareholder value.'
                : 'Le Business Plan valide une stratégie produit à deux niveaux : (1) granulats concassés en 6 granulométries pour les cimentiers et majors du BTP — le moteur de volume ; (2) dalles de pierre dimensionnelle premium à 55% de marge EBITDA — le moteur de rentabilité. Cette diversification réduit l\'exposition à la volatilité du cycle de la construction tout en maximisant la valeur actionnariale.',
              icon: 'ri-stack-line',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                <i className={`${item.icon} text-amber-600 text-lg`}></i>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ IV. CONCLUSION ═══════════════════════
function ConclusionSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-line"></i>{isEn ? 'PART IV' : 'PARTIE IV'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Conclusion & EEAT Insights — Why Combined Financial, Technical & ESG Expertise Makes the Difference' : 'Conclusion & Enseignements EEAT — Pourquoi l\'expertise combinée financière, technique & ESG fait la différence'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {isEn
                ? 'The ALPHA MINING & INFRASTRUCTURE SA project crystallizes a fundamental truth about industrial project finance in Francophone Africa: technical viability is necessary but insufficient. The decisive dimension lies at the intersection of financial engineering (structuring a dual-debt architecture acceptable to both a Regional DFI and a commercial bank), ESG compliance (transforming a carbon-intensive extractive operation into a Green Bank-eligible sustainable infrastructure investment), and institutional diplomacy (navigating the specific credit committee cultures of ECOWAS development finance institutions).'
                : 'Le projet ALPHA MINING & INFRASTRUCTURE SA cristallise une vérité fondamentale du financement de projets industriels en Afrique francophone : la viabilité technique est nécessaire mais insuffisante. La dimension décisive se situe à l\'intersection de l\'ingénierie financière (structurer une architecture de dette duale acceptable par une IFD régionale et une banque commerciale), de la conformité ESG (transformer une opération extractive carbonée en investissement d\'infrastructure durable éligible Banque Verte) et de la diplomatie institutionnelle (naviguer les cultures spécifiques des comités de crédit des institutions de financement du développement de la CEDEAO).'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
              {[
                { letter: 'E', color: 'amber', title: isEn ? 'Experience' : 'Expérience', desc: isEn ? '22+ years of financial advisory in the ECOWAS zone. The DSCR trajectory, gearing structure, and sensitivity scenarios in this case study are not theoretical exercises — they are the product of having structured, defended, and closed industrial project financings with the same DFIs and commercial banks that are currently evaluating this dossier.' : '22+ années de conseil financier en zone CEDEAO. Les trajectoires de DSCR, la structure de gearing et les scénarios de sensibilité présentés dans cette étude de cas ne sont pas des exercices théoriques — ils sont le produit de financements de projets industriels structurés, défendus et clos auprès des mêmes IFD et banques commerciales qui évaluent actuellement ce dossier.' },
                { letter: 'E', color: 'teal', title: isEn ? 'Expertise' : 'Expertise', desc: isEn ? 'Mastery of the SYSCOHADA revised accounting framework, IFC Performance Standards (PS1-PS8), OHADA security package structuring, and the specific credit committee evaluation criteria of ECOWAS DFIs. This expertise is deployed in every deliverable — from the 340-page business plan to the term sheet negotiations with the Lomé-based commercial bank.' : 'Maîtrise du cadre comptable SYSCOHADA révisé, des IFC Performance Standards (PS1-PS8), de la structuration des packages de sûretés OHADA et des critères d\'évaluation spécifiques des comités de crédit des IFD de la CEDEAO. Cette expertise est déployée dans chaque livrable — du Business Plan de 340 pages aux négociations du term sheet avec la banque commerciale de la place de Lomé.' },
                { letter: 'A', color: 'green', title: isEn ? 'Authority' : 'Autorité', desc: isEn ? 'KHEPRA EXPERTS is the sole financial advisor on this mandate — holding end-to-end responsibility from business plan design through term sheet negotiation to credit committee defense. The firm\'s 100% success rate on completed mandates signals to both the client and the financing institutions that this dossier has been prepared to the highest standards of the ECOWAS project finance ecosystem.' : 'KHEPRA EXPERTS est le conseil financier unique sur ce mandat — détenant la responsabilité de bout en bout, de la conception du Business Plan à la négociation du term sheet jusqu\'à la défense en comité de crédit. Le taux de succès de 100% sur les mandats menés à terme signale à la fois au client et aux institutions financières que ce dossier a été préparé aux plus hauts standards de l\'écosystème de financement de projet CEDEAO.' },
                { letter: 'T', color: 'red', title: isEn ? 'Trustworthiness' : 'Fiabilité', desc: isEn ? 'Trust in ECOWAS project finance is built through demonstrated competence, not brand recognition. KHEPRA EXPERTS\' credibility with the Regional DFI and the Lomé commercial bank is a strategic asset accumulated over two decades — an asset that directly reduces transaction friction, accelerates the path from term sheet to financial close, and ensures that the client\'s interests are represented with institutional authority at every stage of the credit process.' : 'La confiance dans le financement de projet CEDEAO se construit par la compétence démontrée, non par la notoriété de marque. La crédibilité de KHEPRA EXPERTS auprès de l\'IFD régionale et de la banque commerciale de Lomé est un actif stratégique accumulé sur deux décennies — un actif qui réduit directement les frictions transactionnelles, accélère le chemin du term sheet au closing financier et garantit que les intérêts du client sont représentés avec autorité institutionnelle à chaque étape du processus de crédit.' },
              ].map((item, i) => {
                const colorMap: Record<string, string> = { amber: 'bg-amber-50 border-amber-200', teal: 'bg-teal-50 border-teal-200', green: 'bg-green-50 border-green-200', red: 'bg-red-50 border-red-200' };
                const badgeMap: Record<string, string> = { amber: 'bg-amber-500', teal: 'bg-teal-500', green: 'bg-green-500', red: 'bg-red-500' };
                return (
                  <div key={i} className={`rounded-xl p-5 border ${colorMap[item.color]}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${badgeMap[item.color]} flex items-center justify-center`}>
                        <span className="text-white font-extrabold text-lg">{item.letter}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-teal-50 rounded-xl p-6 border border-amber-200">
              <p className="text-gray-900 font-bold text-base md:text-lg">
                {isEn
                  ? 'Our conviction: « No theoretical reports. Rigorous diagnostics. Executable deliverables. Measurable results. »'
                  : 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isEn
                  ? '— KHEPRA EXPERTS, Financial Engineering & Industrial Project Advisory for Francophone Africa since 2003'
                  : '— KHEPRA EXPERTS, Ingénierie Financière & Conseil en Projets Industriels pour l\'Afrique Francophone depuis 2003'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ FAQ ═══════════════════════
function FAQSection({ isEn }: { isEn: boolean }) {
  const faqs = isEn
    ? [
        { q: 'What financial metrics make an industrial mining project bankable in West Africa?', a: 'Key metrics validated by KHEPRA EXPERTS: positive NPV at 12% discount rate (3,280 M FCFA for this project), Project IRR above 15% (17.2% achieved), Equity IRR above 20% (21.6% achieved), and average DSCR above 1.5x (2.41x achieved with a controlled low point of 1.68x in 2029). Additionally, DFIs increasingly require ESG compliance — this project\'s 35% decarbonation via a hybrid solar plant (3-4 MWc, 1,712 M FCFA) ensures Green Bank eligibility under IFC Performance Standards (PS1-PS8). The 340-page business plan includes three-tier sensitivity scenarios demonstrating robustness even under conservative assumptions.' },
        { q: 'How is a dual-debt structure designed for an industrial project in the ECOWAS zone?', a: 'KHEPRA EXPERTS designed: (1) Senior CAPEX debt of 8,899 M FCFA — fixed rate 8%, 8-year maturity, 24-month grace period — placed with a Regional DFI for long-term capital expenditure (Metso equipment, civil works, solar plant); (2) Working capital line of 2,541 M FCFA — placed with a Lomé-based commercial bank — for operational ramp-up, raw material buffer stock, and receivables financing. Gap covered by equity (2,500 M FCFA paid-in capital) and phased shareholder current account contributions (1,657 M FCFA over 2027-2028). Conservative gearing ratio acceptable to both credit committees.' },
        { q: 'How does ESG compliance (solar energy, IFC Standards) improve industrial project bankability in Africa?', a: 'The 3-4 MWc hybrid solar plant (1,712 M FCFA) delivers 35% carbon reduction — triggering Green Bank eligibility with preferential terms versus standard DFI lending and cutting energy costs ~40% versus grid-only power. Full IFC Performance Standards (PS1-PS8) compliance transforms the project from a conventional extractive operation into a sustainable infrastructure investment — a critical differentiator in competitive DFI credit committee evaluations. The ESG appendix documents environmental and social management systems, labor conditions, community engagement, biodiversity conservation, and cultural heritage preservation.' },
        { q: 'Why choose a Lomé-based consulting firm for industrial project financial engineering in Francophone Africa?', a: 'KHEPRA EXPERTS brings three decisive advantages: (1) OHADA/SYSCOHADA mastery — essential for financial models and security packages acceptable to DFIs and local banks; (2) Institutional intimacy with ECOWAS development finance institutions — understanding unpublished credit committee dynamics, risk appetite thresholds, and informal evaluation criteria; (3) On-the-ground presence in Lomé enabling continuous dialogue with the Notaire instrumentaire de la place de Lomé, the mining administration, tax authorities, and the commercial bank — reducing transaction friction and accelerating the path from term sheet to financial close.' },
      ]
    : [
        { q: 'Quels indicateurs financiers rendent un projet minier industriel bancable en Afrique de l\'Ouest ?', a: 'Indicateurs clés validés par KHEPRA EXPERTS : VAN positive au taux d\'actualisation de 12% (3 280 M FCFA pour ce projet), TRI Projet supérieur à 15% (17,2% atteint), TRI Actionnaire supérieur à 20% (21,6% atteint), et DSCR moyen supérieur à 1,5x (2,41x atteint avec un point bas maîtrisé à 1,68x en 2029). Les IFD exigent de plus en plus la conformité ESG — la décarbonation de 35% via la centrale solaire hybride (3-4 MWc, 1 712 M FCFA) garantit l\'éligibilité Banque Verte selon les IFC Performance Standards (PS1-PS8). Le Business Plan de 340 pages inclut trois scénarios de sensibilité démontrant la robustesse même sous hypothèses conservatrices.' },
        { q: 'Comment structure-t-on une dette duale (senior + BFR) pour un projet industriel en zone CEDEAO ?', a: 'KHEPRA EXPERTS a conçu : (1) Dette senior CAPEX de 8 899 M FCFA — taux fixe 8%, maturité 8 ans, différé 24 mois — placée auprès d\'une IFD régionale pour les dépenses d\'investissement long terme (équipements Metso, génie civil, centrale solaire) ; (2) Ligne de crédit BFR de 2 541 M FCFA — placée auprès d\'une banque commerciale de la place de Lomé — pour la montée en puissance opérationnelle, le stock tampon et le financement des créances clients. Gap couvert par les fonds propres (2 500 M FCFA de capital libéré) et les apports échelonnés en CCA (1 657 M FCFA sur 2027-2028). Ratio de gearing conservateur acceptable par les deux comités de crédit.' },
        { q: 'Comment la conformité ESG (énergie solaire, normes IFC) améliore-t-elle la bancabilité d\'un projet industriel en Afrique ?', a: 'La centrale solaire hybride de 3-4 MWc (1 712 M FCFA) permet 35% de réduction carbone — déclenchant l\'éligibilité Banque Verte avec des conditions préférentielles versus le prêt IFD standard et réduisant les coûts énergétiques d\'environ 40% par rapport à l\'alimentation réseau seule. La conformité intégrale aux IFC Performance Standards (PS1-PS8) transforme le projet d\'une opération extractive conventionnelle en investissement d\'infrastructure durable — un différenciateur critique en évaluation compétitive des comités de crédit IFD. L\'annexe ESG documente les systèmes de gestion environnementale et sociale, les conditions de travail, l\'engagement communautaire, la conservation de la biodiversité et la préservation du patrimoine culturel.' },
        { q: 'Pourquoi choisir un cabinet de conseil basé à Lomé pour l\'ingénierie financière de projets industriels en Afrique francophone ?', a: 'KHEPRA EXPERTS apporte trois avantages décisifs : (1) Maîtrise du cadre OHADA/SYSCOHADA — essentiel pour des modèles financiers et packages de sûretés acceptables par les IFD et banques locales ; (2) Intimité institutionnelle avec les institutions de financement du développement de la CEDEAO — compréhension des dynamiques de comité de crédit non publiées, des seuils d\'appétit au risque et des critères d\'évaluation informels ; (3) Présence terrain à Lomé permettant un dialogue continu avec le Notaire instrumentaire de la place de Lomé, l\'administration minière, les autorités fiscales et la banque commerciale — réduisant les frictions transactionnelles et accélérant le chemin du term sheet au closing financier.' },
      ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}</h2>
        <div className="w-20 h-1 bg-amber-500 rounded-full mb-8"></div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="text-base md:text-lg font-bold text-gray-900 pr-8">{faq.q}</h3>
                <i className="ri-arrow-down-s-line text-gray-400 group-open:rotate-180 transition-transform text-xl shrink-0"></i>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6"><p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════ CTA ═══════════════════════
function CTASection({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[16rem] font-bold text-amber-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          CFA
        </span>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-6">
          <i className="ri-chat-quote-line text-amber-400 text-sm"></i>
          <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
            {isEn ? 'Industrial project to finance?' : 'Projet industriel à financer ?'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Structure your industrial project financing with the most experienced financial engineering team in Francophone Africa'
            : 'Structurez le financement de votre projet industriel avec l\'équipe d\'ingénierie financière la plus expérimentée d\'Afrique francophone'}
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS delivers end-to-end financial engineering — from decennial financial modeling and dual-debt structuring to ESG compliance and credit committee defense. A free 30-minute strategic consultation to assess your project\'s bankability and financing roadmap.'
            : 'KHEPRA EXPERTS livre une ingénierie financière de bout en bout — de la modélisation financière décennale et la structuration de dette duale à la conformité ESG et la défense en comité de crédit. Une consultation stratégique gratuite de 30 minutes pour évaluer la bancabilité de votre projet et sa feuille de route de financement.'}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="/diagnostic-flash"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-700 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:to-amber-800 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            {isEn ? 'Book a free diagnostic' : 'Réserver un diagnostic gratuit'}
          </a>
          <BrochureDownloadButton
            variant="secondary"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            trackingLocation="ingenierie_financiere_industriel_case_study_cta"
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
              <i className={`${b.icon} text-amber-400 text-lg`}></i>
              <span className="text-sm text-white/70 font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}