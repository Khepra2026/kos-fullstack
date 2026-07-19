import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* ============================================================
   KHEPRA EXPERTS — Hero Light Version (Juin 2026)
   4 Business Units Reconfigurées — Standards Internationaux Adaptés
   ============================================================ */

const C = {
  bg: '#faf8f5',
  card: '#ffffff',
  textTitle: '#111827',
  textSubtitle: '#4b5563',
  textBody: '#6b7280',
  textMuted: '#9ca3af',
  textLight: '#d1d5db',
  border: '#e5e7eb',
  green: '#86BC25',
  greenLight: '#f0fdf4',
  greenDark: '#6B9B1F',
  gold: '#D4AF37',
  goldLight: '#fefce8',
  goldDark: '#b8941f',
  emerald: '#2E8B57',
  emeraldLight: '#ecfdf5',
} as const;

const SERVICE_CARDS = [
  {
    id: 'bu1-regulation',
    icon: 'ri-shield-check-line',
    titleFr: 'Régulation Financière & Conformité',
    titleEn: 'Financial Regulation & Compliance',
    badge: 'BU1 · Priorité Absolue',
    badgeColor: C.gold,
    badgeBg: '#fef3c7',
    iconBg: C.goldLight,
    iconColor: C.gold,
    descFr: 'Bouclier Réglementaire — BCEAO/COBAC pré-inspection, agrément, LBC/FT, veille 24/7, 137+ textes couverts.',
    descEn: 'Regulatory Shield — BCEAO/COBAC pre-inspection, licensing, AML/CFT, 24/7 watch, 137+ texts covered.',
    href: '/kos-bu1-financial-regulation',
  },
  {
    id: 'bu2-governance',
    icon: 'ri-government-line',
    titleFr: 'Gouvernance & Due Diligence',
    titleEn: 'Governance & Due Diligence',
    badge: 'BU2 · Haute',
    badgeColor: C.green,
    badgeBg: '#dcfce7',
    iconBg: C.greenLight,
    iconColor: C.green,
    descFr: 'Observatoire de la Gouvernance — Performance Boards, DD Full Scope, Conseil CA, KOS REGTECH AI Investability Score™.',
    descEn: 'Governance Observatory — Board Performance, Full Scope DD, Board Advisory, KOS REGTECH AI Investability Score™.',
    href: '/kos-bu2-governance-due-diligence',
  },
  {
    id: 'bu3-climate',
    icon: 'ri-leaf-line',
    titleFr: 'Climat, Transition & ESG',
    titleEn: 'Climate, Transition & ESG',
    badge: 'BU3 · Haute',
    badgeColor: C.emerald,
    badgeBg: '#d1fae5',
    iconBg: C.emeraldLight,
    iconColor: C.emerald,
    descFr: 'Ingénierie de Décarbonation — Bilan carbone Scope 1-2-3, stratégie ISSB/GRI/CSRD, financements verts.',
    descEn: 'Decarbonation Engineering — Carbon footprint Scope 1-2-3, ISSB/GRI/CSRD strategy, green finance.',
    href: '/kos-bu3-climate-esg',
  },
  {
    id: 'bu4-kbr',
    icon: 'ri-line-chart-line',
    titleFr: 'KBR-Model & Intelligence d\'Affaires',
    titleEn: 'KBR-Model & Business Intelligence',
    badge: 'BU4 · Stratégique',
    badgeColor: C.textSubtitle,
    badgeBg: '#f3f4f6',
    badge2: 'Nouveau',
    badge2Color: C.green,
    badge2Bg: '#dcfce7',
    iconBg: '#fefce8',
    iconColor: '#c9a227',
    descFr: 'Monétisation PI — Études sectorielles, monographies, rapports High-Ticket. 3 niveaux KBR (L1/L2/L3).',
    descEn: 'IP Monetization — Sector studies, monographs, High-Ticket reports. 3 KBR levels (L1/L2/L3).',
    href: '/kos-bu4-kbr-model',
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background-50"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(134,188,37,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(212,175,55,0.04) 0%, transparent 45%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">

          {/* COLONNE GAUCHE */}
          <div className="flex-1 lg:max-w-[52%]">
            <h1
              className={`font-bold mb-5 transition-all duration-700 text-foreground-950 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-heading), Georgia, serif',
              }}
            >
              {isEn ? (
                <>
                  <span className="block">Financial regulation,</span>
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #a5d936 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    governance, climate ESG
                  </span>
                  <span className="block">and KBR-Model intelligence</span>
                  <span className="block text-foreground-700" style={{ fontSize: '0.78em', marginTop: '0.15em' }}>
                    for banks, fintechs and institutional investors
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Régulation financière,</span>
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #a5d936 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    gouvernance, climat ESG
                  </span>
                  <span className="block">et intelligence KBR-Model</span>
                  <span className="block text-foreground-700" style={{ fontSize: '0.78em', marginTop: '0.15em' }}>
                    pour banques, fintechs et investisseurs institutionnels
                  </span>
                </>
              )}
            </h1>

            <p
              className={`text-base leading-relaxed mb-8 max-w-lg text-justify transition-all duration-700 delay-100 text-foreground-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {isEn
                ? 'KHEPRA EXPERTS is the reference advisory firm in Francophone Africa. 4 reconfigured Business Units — inspired by international standards and adapted to the African context: Financial Regulation & Compliance, Governance & Due Diligence, Climate Transition & ESG, and KBR-Model & Business Intelligence. No public pricing — everything is on confidential quote.'
                : 'KHEPRA EXPERTS est le cabinet de référence en Afrique francophone. 4 Business Units reconfigurées — inspirées des standards internationaux et adaptées au contexte africain : Régulation Financière & Conformité, Gouvernance & Due Diligence, Climat Transition & ESG, et KBR-Model & Intelligence d\'Affaires. Aucun prix public — tout est sur devis confidentiel.'}
            </p>

            <div
              className={`flex flex-wrap items-center gap-3 mb-5 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${C.greenDark}, ${C.green})`,
                  color: '#ffffff',
                  boxShadow: `0 4px 20px ${C.green}50`,
                }}
              >
                <i className="ri-calendar-check-line text-lg" />
                {isEn ? 'Book a consultation' : 'Réserver une consultation'}
              </button>

              <button
                onClick={() => navigate('/diagnostic-flash')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-foreground-950 border border-background-200 bg-white"
                style={{
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.green;
                  e.currentTarget.style.color = C.green;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textTitle;
                }}
              >
                <i className="ri-flashlight-line text-lg" />
                {isEn ? 'Free Diagnostic' : 'Diagnostic gratuit'}
              </button>
            </div>

            <p
              className={`text-xs transition-all duration-700 delay-300 text-foreground-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {isEn
                ? 'Confidential · Free initial consultation · Senior expert · International Standards'
                : 'Confidentiel · Consultation initiale offerte · Expert senior · Standards Internationaux'}
            </p>
          </div>

          {/* COLONNE DROITE — 4 cartes BU */}
          <div className="flex-1 lg:max-w-[46%] w-full">
            <div className="flex flex-col gap-4">
              {SERVICE_CARDS.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => navigate(card.href)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative w-full text-left cursor-pointer rounded-2xl p-5 transition-all duration-400 bg-white ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{
                    border: `1px solid ${hoveredCard === card.id ? card.iconColor + '40' : C.border}`,
                    boxShadow: hoveredCard === card.id
                      ? '0 8px 30px rgba(0,0,0,0.08)'
                      : '0 1px 4px rgba(0,0,0,0.03)',
                    transform: hoveredCard === card.id ? 'translateY(-3px)' : 'translateY(0)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                  aria-label={isEn ? card.titleEn : card.titleFr}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl"
                      style={{ background: card.iconBg }}
                    >
                      <i className={`${card.icon} text-xl`} style={{ color: card.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-sm text-foreground-950">
                          {isEn ? card.titleEn : card.titleFr}
                        </span>
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold"
                          style={{ background: card.badgeBg, color: card.badgeColor }}
                        >
                          {card.badge}
                        </span>
                        {'badge2' in card && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold"
                            style={{ background: (card as any).badge2Bg, color: (card as any).badge2Color }}
                          >
                            {(card as any).badge2}
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-justify text-foreground-600">
                        {isEn ? card.descEn : card.descFr}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 mt-5">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-sm text-white"
                style={{
                  background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                }}
              >
                <i className="ri-phone-line text-sm" />
                {isEn ? 'Free consultation' : 'Consultation offerte'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-sm text-white"
                style={{
                  background: `linear-gradient(135deg, ${C.greenDark}, #4a7a16)`,
                }}
              >
                <i className="ri-customer-service-2-line text-sm" />
                {isEn ? 'Talk with Us' : 'Parlez-nous'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



