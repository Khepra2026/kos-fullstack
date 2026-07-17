import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

interface TunnelLevel {
  id: string;
  level: number;
  icon: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  ctaFr: string;
  ctaEn: string;
  link: string;
  conversionFr: string;
  conversionEn: string;
  accentColor: string;
  bgAccent: string;
  borderAccent: string;
  metrics: { value: string; labelFr: string; labelEn: string }[];
  requirementFr: string;
  requirementEn: string;
}

const TUNNEL_LEVELS: TunnelLevel[] = [
  {
    id: 'diagnostic',
    level: 1,
    icon: 'ri-stethoscope-line',
    titleFr: 'Diagnostic Flash Gratuit',
    titleEn: 'Free Flash Diagnostic',
    descriptionFr: 'Évaluez en 8 minutes votre exposition aux risques réglementaires, votre maturité de gouvernance ou votre conformité LBC/FT. 5 diagnostics sectoriels disponibles, sans inscription.',
    descriptionEn: 'Assess your regulatory risk exposure, governance maturity, or AML/CFT compliance in 8 minutes. 5 sector-specific diagnostics available, no registration required.',
    ctaFr: 'Faire mon diagnostic gratuit',
    ctaEn: 'Start my free diagnostic',
    link: '/diagnostic-flash',
    conversionFr: 'Objectif : 15% → Lead Magnet',
    conversionEn: 'Target: 15% → Lead Magnet',
    accentColor: '#86BC25',
    bgAccent: 'rgba(134,188,37,0.08)',
    borderAccent: 'rgba(134,188,37,0.25)',
    metrics: [
      { value: '8 min', labelFr: 'Sans inscription', labelEn: 'No signup' },
      { value: '5', labelFr: 'Diagnostics disponibles', labelEn: 'Diagnostics available' },
    ],
    requirementFr: 'Aucune — accès immédiat',
    requirementEn: 'None — instant access',
  },
  {
    id: 'lead-magnet',
    level: 2,
    icon: 'ri-file-download-line',
    titleFr: 'Lead Magnet Premium',
    titleEn: 'Premium Lead Magnet',
    descriptionFr: 'Téléchargez un guide, une checklist ou un template expert. Livre blanc BCEAO 2026, checklist conformité 127 points, simulation risque réglementaire. Email requis.',
    descriptionEn: 'Download an expert guide, checklist, or template. BCEAO 2026 white paper, 127-point compliance checklist, regulatory risk simulation. Email required.',
    ctaFr: 'Télécharger une ressource gratuite',
    ctaEn: 'Download a free resource',
    link: '/lead-magnets',
    conversionFr: 'Objectif : 25% → Consultation',
    conversionEn: 'Target: 25% → Consultation',
    accentColor: '#D4AF37',
    bgAccent: 'rgba(212,175,55,0.08)',
    borderAccent: 'rgba(212,175,55,0.25)',
    metrics: [
      { value: '7', labelFr: 'Lead magnets premium', labelEn: 'Premium lead magnets' },
      { value: '94%', labelFr: 'Taux de pertinence', labelEn: 'Relevance rate' },
    ],
    requirementFr: 'Email professionnel requis',
    requirementEn: 'Professional email required',
  },
  {
    id: 'consultation',
    level: 3,
    icon: 'ri-calendar-check-line',
    titleFr: 'Consultation Stratégique',
    titleEn: 'Strategic Consultation',
    descriptionFr: 'Un diagnostic approfondi de 45 minutes avec un expert senior. Analyse personnalisée, premières recommandations opérationnelles, cadrage de votre besoin.',
    descriptionEn: 'A 45-minute deep-dive diagnostic with a senior expert. Personalized analysis, initial operational recommendations, scoping of your needs.',
    ctaFr: 'Réserver ma consultation',
    ctaEn: 'Book my consultation',
    link: '/contact',
    conversionFr: 'Objectif : 40% → Mission',
    conversionEn: 'Target: 40% → Mission',
    accentColor: '#6B9B1F',
    bgAccent: 'rgba(107,155,31,0.08)',
    borderAccent: 'rgba(107,155,31,0.25)',
    metrics: [
      { value: '45 min', labelFr: 'Avec un expert senior', labelEn: 'With a senior expert' },
      { value: '100%', labelFr: 'Confidentiel', labelEn: 'Confidential' },
    ],
    requirementFr: 'Prise de rendez-vous',
    requirementEn: 'Appointment booking',
  },
  {
    id: 'mission',
    level: 4,
    icon: 'ri-briefcase-line',
    titleFr: 'Mission & Proposition',
    titleEn: 'Mission & Proposal',
    descriptionFr: 'Proposition commerciale personnalisée avec NDA. Périmètre, méthodologie, équipe, calendrier, budget. Références sectorielles pertinentes incluses.',
    descriptionEn: 'Personalized commercial proposal with NDA. Scope, methodology, team, timeline, budget. Relevant sector references included.',
    ctaFr: 'Demander une proposition',
    ctaEn: 'Request a proposal',
    link: '/contact',
    conversionFr: 'Sur proposition — devis personnalisé',
    conversionEn: 'On proposal — personalized quote',
    accentColor: '#0a0a0a',
    bgAccent: 'rgba(10,10,10,0.05)',
    borderAccent: 'rgba(10,10,10,0.20)',
    metrics: [
      { value: 'Devis', labelFr: 'Sur demande · Confidentiel', labelEn: 'On request · Confidential' },
      { value: 'NDA', labelFr: 'Protection garantie', labelEn: 'Guaranteed protection' },
    ],
    requirementFr: 'Sur proposition uniquement',
    requirementEn: 'By proposal only',
  },
];

export default function ConversionTunnel() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)' }}>
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label={isEn ? 'Your path to regulatory excellence' : 'Votre parcours vers l\'excellence réglementaire'}
                variant="left-accent"
                accentColor="primary"
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {isEn ? '4 steps to secure your institution' : '4 étapes pour sécuriser votre institution'}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-justify">
              {isEn
                ? 'A proven 4-level conversion path — from a free diagnostic to a tailored commercial proposal. Each step builds on the previous one, with no commitment until you\'re ready.'
                : 'Un parcours de conversion éprouvé en 4 niveaux — du diagnostic gratuit jusqu\'à la proposition commerciale. Chaque étape s\'appuie sur la précédente, sans engagement tant que vous n\'êtes pas prêt.'}
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
              <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            </div>
          </div>
        </ScrollReveal>

        {/* Funnel visualization + Level cards */}
        <div className="space-y-0">
          {TUNNEL_LEVELS.map((level, index) => (
            <ScrollReveal key={level.id} delay={index * 150}>
              <div className="relative">
                {/* Connecting arrow between levels */}
                {index < TUNNEL_LEVELS.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 flex flex-col items-center">
                    <div className="w-px h-10" style={{ background: `linear-gradient(180deg, ${level.accentColor}60, ${TUNNEL_LEVELS[index + 1].accentColor}40)` }} />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent" style={{ borderTopColor: TUNNEL_LEVELS[index + 1].accentColor + '40' }} />
                    <span className="text-[10px] font-bold mt-2 whitespace-nowrap" style={{ color: level.accentColor }}>
                      {isEn ? level.conversionEn : level.conversionFr}
                    </span>
                  </div>
                )}

                {/* Level card — progressively narrower */}
                <div
                  className="relative mx-auto rounded-2xl border p-5 md:p-7 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  style={{
                    maxWidth: `${100 - index * 8}%`,
                    minWidth: '280px',
                    background: level.bgAccent,
                    borderColor: level.borderAccent,
                  }}
                  onClick={() => navigate(level.link)}
                >
                  {/* Level number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${level.accentColor}, ${level.accentColor}cc)` }}
                    >
                      {level.level}
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start gap-5 md:gap-7 mt-3">
                    {/* Icon + Title + Description */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl flex-shrink-0"
                        style={{ background: `${level.accentColor}15`, border: `1.5px solid ${level.accentColor}30` }}
                      >
                        <i className={`${level.icon} text-xl md:text-2xl`} style={{ color: level.accentColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ background: `${level.accentColor}15`, color: level.accentColor }}
                          >
                            {isEn ? `Level ${level.level}` : `Niveau ${level.level}`}
                          </span>
                          <span className="text-xs font-medium text-gray-400">
                            {isEn ? level.requirementEn : level.requirementFr}
                          </span>
                        </div>

                        <h3
                          className="text-lg md:text-xl font-bold mb-2 leading-tight"
                          style={{ color: '#0a0a0a', fontFamily: 'var(--font-heading)' }}
                        >
                          {isEn ? level.titleEn : level.titleFr}
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed text-justify max-w-2xl mb-3">
                          {isEn ? level.descriptionEn : level.descriptionFr}
                        </p>

                        {/* Metrics badges */}
                        <div className="flex flex-wrap gap-2">
                          {level.metrics.map((m, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                              style={{ background: `${level.accentColor}10`, color: level.accentColor, border: `1px solid ${level.accentColor}20` }}
                            >
                              <span className="font-extrabold">{m.value}</span>
                              <span className="opacity-70">{isEn ? m.labelEn : m.labelFr}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0 self-stretch flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(level.link);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${level.accentColor}, ${level.accentColor}cc)`,
                          color: '#ffffff',
                          boxShadow: `0 4px 20px ${level.accentColor}30`,
                        }}
                      >
                        {isEn ? level.ctaEn : level.ctaFr}
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom trust signal */}
        <ScrollReveal delay={600}>
          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)', border: '1.5px solid rgba(212,168,42,0.20)' }}>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
              {[
                { icon: 'ri-shield-check-line', value: '22+', labelFr: 'ans d\'expertise réglementaire', labelEn: 'years regulatory expertise' },
                { icon: 'ri-building-2-line', value: '15', labelFr: 'pays UEMOA/CEMAC', labelEn: 'UEMOA/CEMAC countries' },
                { icon: 'ri-file-text-line', value: '50+', labelFr: 'missions BCEAO/COBAC', labelEn: 'BCEAO/COBAC missions' },
                { icon: 'ri-lock-line', value: '100%', labelFr: 'confidentiel · NDA systématique', labelEn: 'confidential · systematic NDA' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(134,188,37,0.10)', border: '1px solid rgba(134,188,37,0.18)' }}>
                    <i className={`${item.icon} text-base`} style={{ color: '#86BC25' }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-extrabold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500">{isEn ? item.labelEn : item.labelFr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}