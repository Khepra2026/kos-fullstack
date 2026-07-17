import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

export interface LeadMagnet {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  pages: number;
  icon: string;
  accent: string;
  slug: string;
  badgeFr: string;
  badgeEn: string;
  targetFr: string;
  targetEn: string;
}

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: 'guide-due-diligence',
    titleFr: 'Guide Due Diligence Afrique',
    titleEn: 'Due Diligence Africa Guide',
    subtitleFr: 'Checklist 127 points pour investisseurs — secteurs, risques, valorisation',
    subtitleEn: '127-point checklist for investors — sectors, risks, valuation',
    pages: 48,
    icon: 'ri-search-eye-line',
    accent: '#86BC25',
    slug: '/guide-due-diligence-afrique',
    badgeFr: 'PE/VC · DFI · Fonds impact',
    badgeEn: 'PE/VC · DFI · Impact funds',
    targetFr: 'Investisseurs institutionnels',
    targetEn: 'Institutional investors',
  },
  {
    id: 'guide-esg',
    titleFr: 'Guide ESG Afrique',
    titleEn: 'ESG Africa Guide',
    subtitleFr: 'IFC PS 1-8, GRI, ISSB, PGES — conformité pour financements DFI',
    subtitleEn: 'IFC PS 1-8, GRI, ISSB, ESMP — compliance for DFI financing',
    pages: 52,
    icon: 'ri-leaf-line',
    accent: '#86BC25',
    slug: '/guide-esg-afrique',
    badgeFr: 'DFI · Fonds impact · Promoteurs',
    badgeEn: 'DFI · Impact funds · Developers',
    targetFr: 'Organisations en levée de fonds',
    targetEn: 'Fundraising organizations',
  },
  {
    id: 'guide-investment-readiness',
    titleFr: 'Guide Investment Readiness',
    titleEn: 'Investment Readiness Guide',
    subtitleFr: '89 critères pour préparer votre levée — pitch deck, data room, IM',
    subtitleEn: '89 criteria to prepare your fundraise — pitch deck, data room, IM',
    pages: 56,
    icon: 'ri-funds-line',
    accent: '#86BC25',
    slug: '/guide-investment-readiness',
    badgeFr: 'PE/VC · DFI · Banques · Angels',
    badgeEn: 'PE/VC · DFI · Banks · Angels',
    targetFr: 'PME et startups en levée',
    targetEn: 'SMEs and startups fundraising',
  },
  {
    id: 'guide-gouvernance-imf',
    titleFr: 'Guide Gouvernance IMF',
    titleEn: 'IMF Governance Guide',
    subtitleFr: 'BCEAO, COBAC, OHADA — cadre GRC, 3 lignes de défense, LCB-FT',
    subtitleEn: 'BCEAO, COBAC, OHADA — GRC framework, 3 lines of defense, AML/CFT',
    pages: 44,
    icon: 'ri-shield-check-line',
    accent: '#86BC25',
    slug: '/guide-gouvernance-imf',
    badgeFr: 'SFD · EMF · Banques · ONG',
    badgeEn: 'SFD · EMF · Banks · NGOs',
    targetFr: 'Institutions financières',
    targetEn: 'Financial institutions',
  },
];

const LeadMagnetCard = memo(function LeadMagnetCard({
  magnet,
  index,
  isEn,
  navigate,
}: {
  magnet: LeadMagnet;
  index: number;
  isEn: boolean;
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <ScrollReveal delay={index * 100}>
      <div
        className="group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
          borderColor: `${magnet.accent}25`,
        }}
        onClick={() => navigate(magnet.slug)}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${magnet.accent}, ${magnet.accent}80)` }} />

        {/* Badge + pages */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: `${magnet.accent}12`,
              color: magnet.accent,
              border: `1px solid ${magnet.accent}25`,
            }}
          >
            <i className={magnet.icon} />
            {isEn ? magnet.badgeEn : magnet.badgeFr}
          </span>
          <span className="text-xs font-bold text-gray-400">
            {magnet.pages}p
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
          style={{ background: `${magnet.accent}10`, border: `1px solid ${magnet.accent}20` }}
        >
          <i className={`${magnet.icon} text-xl`} style={{ color: magnet.accent }} />
        </div>

        {/* Title */}
        <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-tight">
          {isEn ? magnet.titleEn : magnet.titleFr}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {isEn ? magnet.subtitleEn : magnet.subtitleFr}
        </p>

        {/* Target */}
        <p className="text-xs font-medium mb-4" style={{ color: 'rgba(107,114,128,0.7)' }}>
          <i className="ri-user-line mr-1" />
          {isEn ? magnet.targetEn : magnet.targetFr}
        </p>

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(magnet.slug);
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${magnet.accent}, ${magnet.accent}cc)`,
            color: '#ffffff',
            boxShadow: `0 4px 16px ${magnet.accent}40`,
          }}
        >
          {isEn ? 'Download the guide' : 'Télécharger le guide'}
          <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </ScrollReveal>
  );
});

export const LeadMagnetsSection = memo(function LeadMagnetsSection() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section id="lead-magnets" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(201,162,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}
          >
            <i className="ri-file-download-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
              {isEn ? 'Free Expert Resources' : 'Ressources Expert Gratuites'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {isEn
              ? '4 guides to de-risk your decisions'
              : '4 guides pour sécuriser vos décisions'}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
            {isEn
              ? 'Download our premium guides — written by senior experts with 22+ years of field experience in Africa. Zero cost. Zero spam. Immediate access.'
              : 'Téléchargez nos guides premium — rédigés par des experts seniors avec 22+ ans d\'expérience terrain en Afrique. Zéro coût. Zéro spam. Accès immédiat.'}
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#86BC25' }} />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
          </div>
        </div>

        {/* Grid 4 guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {LEAD_MAGNETS.map((magnet, index) => (
            <LeadMagnetCard key={magnet.id} magnet={magnet} index={index} isEn={isEn} navigate={navigate} />
          ))}
        </div>

        {/* Bottom trust bar */}
        <ScrollReveal delay={200}>
          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)', border: '1.5px solid rgba(212,168,42,0.20)' }}>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.20)' }}>
                  <i className="ri-file-download-line text-lg" style={{ color: '#86BC25' }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">200+</p>
                  <p className="text-xs text-gray-500">{isEn ? 'downloads per month' : 'téléchargements par mois'}</p>
                </div>
              </div>
              <div className="hidden lg:block w-px h-8" style={{ background: 'rgba(212,168,42,0.20)' }} />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(34,160,90,0.12)', border: '1px solid rgba(34,160,90,0.20)' }}>
                  <i className="ri-user-star-line text-lg" style={{ color: '#86BC25' }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">22+ ans</p>
                  <p className="text-xs text-gray-500">{isEn ? 'expertise' : 'd\'expertise'}</p>
                </div>
              </div>
              <div className="hidden lg:block w-px h-8" style={{ background: 'rgba(212,168,42,0.20)' }} />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.20)' }}>
                  <i className="ri-shield-check-line text-lg" style={{ color: '#86BC25' }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500">{isEn ? 'confidential · no spam' : 'confidentiel · pas de spam'}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});