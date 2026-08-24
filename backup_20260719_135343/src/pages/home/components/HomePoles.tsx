import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const ADVISORY_OFFERS = [
  {
    icon: 'ri-shield-check-line',
    title: 'Conformité BCEAO & COBAC',
    desc: 'Agrément IMF/SFD, gouvernance prudentielle, conformité Bâle II/III.',
    href: '/sfd-conformite',
  },
  {
    icon: 'ri-scales-line',
    title: 'Due diligence réglementaire',
    desc: 'Audit financier, contrôle interne, analyse des risques BCEAO/COBAC.',
    href: '/services/due-diligence-acquisition',
  },
  {
    icon: 'ri-government-line',
    title: 'Gouvernance OHADA',
    desc: 'Conseil d\'administration, comités spécialisés, conformité sociétaire.',
    href: '/gouvernance-ohada',
  },
  {
    icon: 'ri-file-chart-line',
    title: 'Plans préventifs de redressement',
    desc: 'Conformité Circulaire N°001-2020/CB/C, scénarios de stress.',
    href: '/blog/plans-preventifs-redressement-circulaire-001-2020',
  },
];

const CAPITAL_OFFERS = [
  {
    icon: 'ri-funds-line',
    title: 'Investment Readiness',
    desc: 'Préparation au fundraising, pitch deck, data room, modèle financier.',
    href: '/services/levee-de-fonds',
  },
  {
    icon: 'ri-file-search-line',
    title: 'Due diligence ESG',
    desc: 'Conformité IFC, GRI, ISSB — PGES et reporting investisseurs.',
    href: '/guide-esg-afrique',
  },
  {
    icon: 'ri-building-2-line',
    title: 'Structuration de projets',
    desc: 'Business plan, modélisation financière, montage juridique et fiscal.',
    href: '/services/gestion-de-projets',
  },
  {
    icon: 'ri-bar-chart-grouped-line',
    title: 'Études de faisabilité',
    desc: 'Étude marché, technique, financière conforme BAD/BIDC/IFC.',
    href: '/services/conseil-strategique',
  },
];

export default function HomePoles() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeTab, setActiveTab] = useState<'advisory' | 'capital'>('advisory');

  const advisory = isEn ? ADVISORY_OFFERS : ADVISORY_OFFERS;
  const capital = isEn ? CAPITAL_OFFERS : CAPITAL_OFFERS;

  return (
    <section id="poles" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-focus-3-line text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
                {isEn ? 'Two poles, one expertise' : 'Deux pôles, une expertise'}
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {isEn ? (
                <>
                  <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Khepra Advisory
                  </span>{' '}
                  vs{' '}
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Khepra Capital
                  </span>
                </>
              ) : (
                <>
                  <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Khepra Advisory
                  </span>{' '}
                  vs{' '}
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Khepra Capital
                  </span>
                </>
              )}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed text-justify">
              {isEn
                ? 'We separate regulatory compliance from capital structuring to give each client the exact expertise they need. No confusion. No diluted advice. Two specialized teams, one rigorous methodology.'
                : 'Nous séparons la conformité réglementaire de la structuration financière pour offrir à chaque client l\'expertise exacte dont il a besoin. Pas de confusion. Pas de conseil dilué. Deux équipes spécialisées, une méthodologie rigoureuse.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Why separated */}
        <ScrollReveal delay={100}>
          <div className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.14)' }}>
            <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-question-mark text-xl" style={{ color: '#86BC25' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {isEn ? 'Why are they separated?' : 'Pourquoi les séparer ?'}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed text-justify">
                {isEn
                  ? 'A bank director facing a BCEAO inspection needs a compliance expert, not an investment banker. An entrepreneur raising funds needs a deal structurer, not a regulatory auditor. Mixing both dilutes the expertise and confuses the client. At Khepra, each pole has its own team, methodology and track record.'
                  : 'Un directeur de banque face à une inspection BCEAO a besoin d\'un expert conformité, pas d\'un banquier d\'affaires. Un entrepreneur en levée de fonds a besoin d\'un structurateur de deals, pas d\'un auditeur réglementaire. Mélanger les deux dilue l\'expertise et confond le client. Chez Khepra, chaque pôle a sa propre équipe, sa méthodologie et son track record.'}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full" style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}>
            <button
              onClick={() => setActiveTab('advisory')}
              className="px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-300"
              style={{
                background: activeTab === 'advisory' ? 'linear-gradient(135deg, #86BC25, #6B9B1F)' : 'transparent',
                color: activeTab === 'advisory' ? '#fff' : '#6B9B1F',
              }}
            >
              <i className="ri-shield-check-line mr-2" />
              {isEn ? 'Khepra Advisory' : 'Khepra Advisory'}
            </button>
            <button
              onClick={() => setActiveTab('capital')}
              className="px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-300"
              style={{
                background: activeTab === 'capital' ? 'linear-gradient(135deg, #c9a227, #e8c04a)' : 'transparent',
                color: activeTab === 'capital' ? '#fff' : '#c9a227',
              }}
            >
              <i className="ri-funds-line mr-2" />
              {isEn ? 'Khepra Capital' : 'Khepra Capital'}
            </button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {(activeTab === 'advisory' ? advisory : capital).map((offer, index) => (
            <ScrollReveal key={offer.title} delay={index * 80}>
              <div
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
                  border: `1px solid ${activeTab === 'advisory' ? 'rgba(134,188,37,0.15)' : 'rgba(201,162,39,0.15)'}`,
                }}
                onClick={() => navigate(offer.href)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{ background: activeTab === 'advisory' ? 'rgba(134,188,37,0.10)' : 'rgba(201,162,39,0.10)', border: `1px solid ${activeTab === 'advisory' ? 'rgba(134,188,37,0.22)' : 'rgba(201,162,39,0.22)'}` }}>
                  <i className={`${offer.icon} text-xl`} style={{ color: activeTab === 'advisory' ? '#86BC25' : '#c9a227' }} />
                </div>
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed text-justify mb-4">
                  {offer.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: activeTab === 'advisory' ? '#86BC25' : '#c9a227' }}>
                  <span>{isEn ? 'Explore' : 'Explorer'}</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={150}>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                color: '#0a1f33',
                boxShadow: '0 4px 24px rgba(212,168,42,0.45)',
              }}
            >
              <i className="ri-calendar-check-line" />
              {isEn ? 'Book a consultation' : 'Prendre rendez-vous'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



