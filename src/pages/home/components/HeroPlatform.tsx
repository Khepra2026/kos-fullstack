import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/base/OptimizedImage';

/* ============================================================
   KOS — Hero v5.0 — Page d'accueil Institutionnelle
   Alignement Institutionnel Juin 2026 :
   ZÉRO pipeline, ZÉRO prix, ZÉRO SaaS, ZÉRO "plateforme"
   ============================================================ */

const C = {
  cream: '#fdfaf5',
  creamAlt: '#f9f4e8',
  white: '#ffffff',
  green: '#86BC25',
  greenDark: '#6B9B1F',
  greenDeep: '#4a7a14',
  gold: '#c4a235',
  goldLight: '#d4a82a',
  goldPale: '#e8c547',
  goldBg: 'rgba(196,162,53,0.07)',
  greenBg: 'rgba(134,188,37,0.06)',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  textDim: '#9ca3af',
  borderLight: 'rgba(0,0,0,0.06)',
  borderGreen: 'rgba(134,188,37,0.20)',
  borderGold: 'rgba(196,162,53,0.25)',
} as const;

const BUSINESS_UNITS = [
  {
    id: 'bu1',
    icon: 'ri-shield-check-line',
    titleFr: 'Régulation Financière & Conformité',
    titleEn: 'Financial Regulation & Compliance',
    subtitleFr: 'Bouclier Réglementaire — BCEAO, COBAC, GABAC, GAFI',
    subtitleEn: 'Regulatory Shield — BCEAO, COBAC, GABAC, GAFI',
    accent: '#D4AF37',
    badge: 'BU1',
    stat: '137+',
    statLabelFr: 'textes réglementaires couverts',
    statLabelEn: 'regulatory texts covered',
    href: '/kos-bu1-financial-regulation/',
  },
  {
    id: 'bu2',
    icon: 'ri-government-line',
    titleFr: 'Gouvernance & Due Diligence',
    titleEn: 'Governance & Due Diligence',
    subtitleFr: 'Observatoire de la Gouvernance — Performance Boards, DD, Conseil CA',
    subtitleEn: 'Governance Observatory — Board Performance, DD, Board Advisory',
    accent: '#86BC25',
    badge: 'BU2',
    stat: '200+',
    statLabelFr: 'missions réalisées',
    statLabelEn: 'missions completed',
    href: '/kos-bu2-governance-due-diligence/',
  },
  {
    id: 'bu3',
    icon: 'ri-leaf-line',
    titleFr: 'Climat, Transition & ESG',
    titleEn: 'Climate, Transition & ESG',
    subtitleFr: 'Ingénierie de Décarbonation — ISSB, GRI, CSRD, Financements Verts',
    subtitleEn: 'Decarbonation Engineering — ISSB, GRI, CSRD, Green Finance',
    accent: '#2E8B57',
    badge: 'BU3',
    stat: '3',
    statLabelFr: 'standards (ISSB/GRI/CSRD)',
    statLabelEn: 'standards (ISSB/GRI/CSRD)',
    href: '/kos-bu3-climate-esg/',
  },
  {
    id: 'bu4',
    icon: 'ri-line-chart-line',
    titleFr: 'KBR-Model & Intelligence d\'Affaires',
    titleEn: 'KBR-Model & Business Intelligence',
    subtitleFr: 'Monétisation PI — Études, Monographies, Rapports High-Ticket',
    subtitleEn: 'IP Monetization — Studies, Monographs, High-Ticket Reports',
    accent: '#c9a227',
    badge: 'BU4',
    stat: '3',
    statLabelFr: 'niveaux KBR (L1/L2/L3)',
    statLabelEn: 'KBR levels (L1/L2/L3)',
    href: '/kos-bu4-kbr-model/',
  },
];

const ANALYSES_STRATEGIQUES = [
  { icon: 'ri-file-chart-line', labelFr: 'Audit BCEAO 360°', labelEn: 'BCEAO 360° Audit', tier: 'S', accent: '#86BC25' },
  { icon: 'ri-calculator-line', labelFr: 'Calculateur IFRS 9', labelEn: 'IFRS 9 Calculator', tier: 'S', accent: '#86BC25' },
  { icon: 'ri-funds-line', labelFr: 'Kit Levée de Fonds', labelEn: 'Fundraising Kit', tier: 'A', accent: '#c4a235' },
  { icon: 'ri-shield-check-line', labelFr: 'Checklist Conformité 127 pts', labelEn: '127-pt Compliance Checklist', tier: 'A', accent: '#c4a235' },
];

const INSTITUTIONAL_STATS = [
  { value: '12', labelFr: 'Analyses stratégiques disponibles', labelEn: 'Strategic analyses available' },
  { value: '17', labelFr: 'Pays UEMOA/CEMAC couverts', labelEn: 'UEMOA/CEMAC countries covered' },
  { value: '22+', labelFr: 'Ans d\'expertise réglementaire', labelEn: 'Years of regulatory expertise' },
  { value: '200+', labelFr: 'Missions institutionnelles', labelEn: 'Institutional missions' },
];

export default function HeroPlatform() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [visible, setVisible] = useState(false);
  const [hoveredBu, setHoveredBu] = useState<string | null>(null);
  const [hoveredMagnet, setHoveredMagnet] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center overflow-hidden"
      style={{ background: `linear-gradient(175deg, ${C.cream} 0%, ${C.creamAlt} 30%, ${C.white} 60%, ${C.cream} 100%)` }}
    >
      {/* Background decorative pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(rgba(134,188,37,0.7) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #c4a23540 30%, #c4a23560 50%, #c4a23540 70%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-col items-center text-center">

          {/* === Bandeau Analyses Stratégiques === */}
          <div
            className={`w-full max-w-4xl mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div
              className="relative rounded-2xl p-5 md:p-6 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fdf9f0 0%, #faf3e0 50%, #fdf8ec 100%)',
                border: '1.5px solid rgba(196,162,53,0.22)',
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.06]" style={{ background: 'radial-gradient(circle at 100% 0%, #c4a235, transparent 70%)' }} />

              <div className="flex flex-col lg:flex-row items-center gap-5 relative z-10">
                {/* Badge + Title */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #c4a235, #d4a82a)', boxShadow: '0 4px 20px rgba(196,162,53,0.30)' }}>
                    <i className="ri-file-chart-line text-xl" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider" style={{ background: '#c4a235', color: '#ffffff' }}>
                        {isEn ? 'ANALYSES STRATÉGIQUES' : 'ANALYSES STRATÉGIQUES'}
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold" style={{ color: '#3a2a08', fontFamily: 'var(--font-heading), Georgia, serif' }}>
                      {isEn ? '12 analyses stratégiques' : '12 analyses stratégiques'}
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: '#7a6a3a' }}>
                      {isEn
                        ? 'Diagnostics, simulateurs, checklists — mis à disposition des institutions'
                        : 'Diagnostics, simulateurs, checklists — mis à disposition des institutions'}
                    </p>
                  </div>
                </div>

                {/* Analyses preview pills */}
                <div className="flex flex-wrap items-center gap-2 flex-1 justify-center lg:justify-end">
                  {ANALYSES_STRATEGIQUES.map((m, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredMagnet(i)}
                      onMouseLeave={() => setHoveredMagnet(null)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: hoveredMagnet === i ? '#ffffff' : 'rgba(255,255,255,0.6)',
                        border: `1px solid ${hoveredMagnet === i ? m.accent + '40' : 'rgba(196,162,53,0.20)'}`,
                        boxShadow: hoveredMagnet === i ? `0 4px 16px rgba(0,0,0,0.06)` : 'none',
                      }}
                      onClick={() => navigate('/kos-ultra-lead-magnets/')}
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: `${m.accent}15` }}>
                        <i className={`${m.icon} text-[10px]`} style={{ color: m.accent }} />
                      </span>
                      <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#3a2a08' }}>
                        {isEn ? m.labelEn : m.labelFr}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: m.tier === 'S' ? '#86BC25' : '#c4a235',
                          color: '#ffffff',
                        }}
                      >
                        {m.tier}
                      </span>
                    </div>
                  ))}
                  <button
                    onClick={() => navigate('/kos-ultra-lead-magnets/')}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{ background: '#c4a235', color: '#ffffff' }}
                  >
                    <span className="text-xs font-bold whitespace-nowrap">{isEn ? 'Les 12' : 'Les 12'}</span>
                    <i className="ri-arrow-right-line text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* === H1 — Institutionnel === */}
          <h1
            className={`font-bold max-w-4xl transition-all duration-700 leading-none mb-5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: C.text,
              fontFamily: 'var(--font-heading), Georgia, serif',
            }}
          >
            {isEn ? (
              <>
                {'Regulatory intelligence '}
                <span style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 40%, #c4a235 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  that turns compliance
                </span>
                <br />
                {'into competitive advantage'}
              </>
            ) : (
              <>
                {'L\'intelligence réglementaire '}
                <span style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 40%, #c4a235 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  qui transforme la conformité
                </span>
                <br />
                {'en avantage compétitif'}
              </>
            )}
          </h1>

          {/* Subtitle — institutionnel, pas de "plateforme" */}
          <p
            className={`mb-8 text-base md:text-lg max-w-3xl transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ color: C.textMuted, lineHeight: 1.7 }}
          >
            {isEn
              ? 'Four reconfigured Business Units. 17 UEMOA/CEMAC countries. From financial regulation to governance, from climate ESG to KBR-Model intelligence — KOS REGTECH AI delivers institutional-grade expertise through contractual expert missions for African financial institutions, inspired by international standards and adapted to the realities of Francophone Africa.'
              : 'Quatre Business Units reconfigurées. 17 pays UEMOA/CEMAC. De la régulation financière à la gouvernance, du climat ESG à l\'intelligence KBR-Model — KOS REGTECH AI délivre l\'expertise institutionnelle à travers des missions contractuelles d\'experts pour les institutions financières africaines, inspirée des standards internationaux et adaptée aux réalités de l\'Afrique Francophone.'}
          </p>

          {/* === 4 Domaines d'Expertise Grid === */}
          <div
            className={`w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {BUSINESS_UNITS.map((bu) => (
              <button
                key={bu.id}
                onClick={() => navigate(bu.href)}
                onMouseEnter={() => setHoveredBu(bu.id)}
                onMouseLeave={() => setHoveredBu(null)}
                className="group relative rounded-2xl p-4 text-left cursor-pointer transition-all duration-400 hover:-translate-y-1.5 flex flex-col gap-2"
                style={{
                  background: hoveredBu === bu.id ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${hoveredBu === bu.id ? bu.accent + '45' : C.borderLight}`,
                  boxShadow: hoveredBu === bu.id ? `0 8px 32px rgba(0,0,0,0.07)` : '0 1px 3px rgba(0,0,0,0.03)',
                }}
                aria-label={isEn ? bu.titleEn : bu.titleFr}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${bu.accent}10`, border: `1px solid ${bu.accent}25` }}
                >
                  <i className={bu.icon} style={{ color: bu.accent, fontSize: '1.1rem' }} />
                </div>

                {/* Badge + Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: `${bu.accent}12`, color: bu.accent }}>
                      {bu.badge}
                    </span>
                  </div>
                  <span className="text-sm font-bold block group-hover:underline leading-tight" style={{ color: C.text }}>
                    {isEn ? bu.titleEn : bu.titleFr}
                  </span>
                </div>

                {/* Subtitle */}
                <span className="text-xs leading-relaxed block" style={{ color: C.textDim }}>
                  {isEn ? bu.subtitleEn : bu.subtitleFr}
                </span>

                {/* Stat — Pas de métriques financières */}
                <div className="flex items-baseline gap-1 mt-auto pt-1">
                  <span className="text-lg font-bold" style={{ color: bu.accent }}>{bu.stat}</span>
                  <span className="text-[10px]" style={{ color: C.textDim }}>
                    {isEn ? bu.statLabelEn : bu.statLabelFr}
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: `${bu.accent}12` }}>
                  <i className="ri-arrow-right-up-line text-xs" style={{ color: bu.accent }} />
                </div>
              </button>
            ))}
          </div>

          {/* === CTAs — Institutionnels === */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 mb-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Primary CTA */}
            <button
              onClick={() => navigate('/kos-ultra-lead-magnets/')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #86BC25 0%, #a5d936 50%, #86BC25 100%)',
                color: '#ffffff',
                boxShadow: '0 6px 32px rgba(134,188,37,0.30)',
              }}
            >
              <i className="ri-file-chart-line text-lg" />
              {isEn ? 'Découvrir les 12 analyses stratégiques' : 'Découvrir les 12 analyses stratégiques'}
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate('/diagnostic-flash/')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                color: C.greenDark,
                border: '1.5px solid rgba(134,188,37,0.28)',
                background: 'rgba(134,188,37,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#86BC25';
                e.currentTarget.style.background = 'rgba(134,188,37,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(134,188,37,0.28)';
                e.currentTarget.style.background = 'rgba(134,188,37,0.04)';
              }}
            >
              <i className="ri-flashlight-line text-lg" />
              {isEn ? 'Diagnostic offert — 10 min' : 'Diagnostic offert — 10 min'}
            </button>
          </div>

          {/* Trust line — institutionnel */}
          <p
            className={`text-xs transition-all duration-700 delay-400 mb-10 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ color: C.textDim }}
          >
            {isEn
              ? 'Confidentiel · 22 ans d\'expertise · Approche structurée · Mission contractuelle'
              : 'Confidentiel · 22 ans d\'expertise · Approche structurée · Mission contractuelle'}
          </p>

          {/* === Stats Bar — Institutionnelles === */}
          <div
            className={`w-full max-w-4xl transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Separator */}
            <div className="w-full flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25))' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.textDim }}>
                {isEn ? 'Chiffres clés' : 'Chiffres clés'}
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.25), transparent)' }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {INSTITUTIONAL_STATS.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: i % 2 === 0 ? C.greenDark : C.gold, fontFamily: 'var(--font-heading)' }}>
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: C.textMuted }}>
                    {isEn ? s.labelEn : s.labelFr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #86BC25 38.2%, #c4a235 61.8%, transparent 100%)', opacity: 0.25 }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: C.textDim }}>
          {isEn ? 'Discover' : 'Découvrir'}
        </span>
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(134,188,37,0.25)' }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: C.green }} />
        </div>
      </div>
    </section>
  );
}