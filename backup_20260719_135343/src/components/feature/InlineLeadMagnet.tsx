import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { LEAD_MAGNETS, type LeadMagnet } from '';

// ─── ULTRA LEAD MAGNETS : Diagnostics Interactifs ──────────────────────────
// Ces outils interactifs sont bien plus puissants que des PDF :
// l'utilisateur obtient un score/classification immédiat et personnalisé,
// ce qui crée un engagement émotionnel fort et rend l'upsell naturel.
interface ToolLeadMagnet {
  id: string;
  toolSlug: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  icon: string;
  accent: string;
  pages: string;
  ctaFr: string;
  ctaEn: string;
  benefitFr: string;
  benefitEn: string;
  statsFr: string;
  statsEn: string;
  timeFr: string;
  timeEn: string;
  /** Preuve sociale — nombre de professionnels ayant utilisé l'outil */
  usersCountFr?: string;
  usersCountEn?: string;
  /** Preuve sociale — taux de satisfaction */
  satisfactionRate?: string;
  /** Urgence — message de rareté */
  urgencyFr?: string;
  urgencyEn?: string;
}

const TOOL_LEAD_MAGNETS: Record<string, ToolLeadMagnet> = {
  'diagnostic-pre-inspection-bceao-cobac': {
    id: 'diagnostic-pre-inspection-bceao-cobac',
    toolSlug: '/tools/diagnostic-pre-inspection-bceao-cobac',
    titleFr: 'Diagnostic Pré-Inspection BCEAO/COBAC',
    titleEn: 'BCEAO/COBAC Pre-Inspection Diagnostic',
    subtitleFr: '25 constats critiques · Classification de risque immédiate (Faible/Modéré/Élevé/Critique) · Plan d\'action prioritaire personnalisé',
    subtitleEn: '25 critical findings · Immediate risk classification (Low/Moderate/High/Critical) · Personalized priority action plan',
    icon: 'ri-search-eye-line',
    accent: '#b45309',
    pages: '5 axes',
    ctaFr: 'Obtenir mon Score de Préparation',
    ctaEn: 'Get My Readiness Score',
    benefitFr: 'En 8 minutes, découvrez exactement ce que le régulateur trouverait dans votre institution — avant qu\'il ne le trouve.',
    benefitEn: 'In 8 minutes, discover exactly what the regulator would find in your institution — before they do.',
    statsFr: '25 constats · 5 axes · Classification immédiate',
    statsEn: '25 findings · 5 axes · Immediate classification',
    timeFr: '8 min',
    timeEn: '8 min',
    usersCountFr: '1 200+ dirigeants',
    usersCountEn: '1,200+ executives',
    satisfactionRate: '96%',
    urgencyFr: 'Utilisé par 45+ institutions financières ce trimestre',
    urgencyEn: 'Used by 45+ financial institutions this quarter',
  },
  'evaluation-maturite-fintech': {
    id: 'evaluation-maturite-fintech',
    toolSlug: '/tools/evaluation-maturite-fintech',
    titleFr: 'Évaluation Maturité Fintech',
    titleEn: 'Fintech Maturity Assessment',
    subtitleFr: '6 dimensions · Benchmark sectoriel UEMOA · Score global + analyse par dimension · Recommandations personnalisées',
    subtitleEn: '6 dimensions · UEMOA sector benchmark · Global score + per-dimension analysis · Personalized recommendations',
    icon: 'ri-smartphone-line',
    accent: '#0f766e',
    pages: '6 dimensions',
    ctaFr: 'Évaluer ma Maturité Fintech',
    ctaEn: 'Assess my Fintech Maturity',
    benefitFr: 'Comparez votre maturité digitale au benchmark UEMOA et identifiez les leviers pour devenir irrésistible aux yeux du régulateur.',
    benefitEn: 'Benchmark your digital maturity against UEMOA standards and identify the levers to become irresistible to the regulator.',
    statsFr: '18 questions · 6 dimensions · Benchmark UEMOA',
    statsEn: '18 questions · 6 dimensions · UEMOA benchmark',
    timeFr: '10 min',
    timeEn: '10 min',
    usersCountFr: '800+ fintechs',
    usersCountEn: '800+ fintechs',
    satisfactionRate: '94%',
    urgencyFr: 'Benchmark UEMOA 2026 — données à jour ce mois',
    urgencyEn: 'UEMOA 2026 Benchmark — data updated this month',
  },
  'diagnostic-maturite-pilotage-strategique': {
    id: 'diagnostic-maturite-pilotage-strategique',
    toolSlug: '/tools/diagnostic-maturite-pilotage-strategique',
    titleFr: 'Score de Maturité du Pilotage Stratégique',
    titleEn: 'Strategic Steering Maturity Score',
    subtitleFr: '5 axes · 5 niveaux de maturité (Rudimentaire → Excellence) · Recommandations prioritaires · Radar de performance',
    subtitleEn: '5 axes · 5 maturity levels (Rudimentary → Excellence) · Priority recommendations · Performance radar',
    icon: 'ri-lightbulb-flash-line',
    accent: '#b45309',
    pages: '5 axes',
    ctaFr: 'Calculer mon Score de Maturité',
    ctaEn: 'Calculate my Maturity Score',
    benefitFr: 'En 8 minutes, mesurez si votre pilotage stratégique vous expose à des angles morts qui coûtent des centaines de millions FCFA.',
    benefitEn: 'In 8 minutes, measure whether your strategic steering exposes you to blind spots that cost hundreds of millions FCFA.',
    statsFr: '25 questions · 5 niveaux · Recommandations',
    statsEn: '25 questions · 5 levels · Recommendations',
    timeFr: '8 min',
    timeEn: '8 min',
    usersCountFr: '650+ CEO/CODIR',
    usersCountEn: '650+ CEOs',
    satisfactionRate: '92%',
    urgencyFr: 'Les comités de direction les plus performants l\'utilisent',
    urgencyEn: 'Top-performing executive committees use it',
  },
  'diagnostic-perennite-familiale': {
    id: 'diagnostic-perennite-familiale',
    toolSlug: '/tools/diagnostic-perennite-familiale',
    titleFr: 'Diagnostic de Pérennité Familiale',
    titleEn: 'Family Sustainability Diagnostic',
    subtitleFr: '4 piliers · Score de pérennité (Fragile → Blindé) · Cartographie des risques familiaux · Plan d\'action prioritaire',
    subtitleEn: '4 pillars · Sustainability score (Fragile → Fortified) · Family risk mapping · Priority action plan',
    icon: 'ri-building-4-line',
    accent: '#059669',
    pages: '4 piliers',
    ctaFr: 'Obtenir mon Score de Pérennité',
    ctaEn: 'Get My Sustainability Score',
    benefitFr: 'En 8 minutes, découvrez si votre patrimoine familial survivra à la prochaine génération — et ce qu\'il faut protéger en priorité.',
    benefitEn: 'In 8 minutes, discover whether your family wealth will survive the next generation — and what needs to be protected first.',
    statsFr: '25 questions · 4 piliers · Score immédiat',
    statsEn: '25 questions · 4 pillars · Immediate score',
    timeFr: '8 min',
    timeEn: '8 min',
    usersCountFr: '400+ family offices',
    usersCountEn: '400+ family offices',
    satisfactionRate: '91%',
    urgencyFr: 'Protégez votre patrimoine avant la prochaine génération',
    urgencyEn: 'Protect your wealth before the next generation',
  },
  'evaluation-conformite-reglementaire': {
    id: 'evaluation-conformite-reglementaire',
    toolSlug: '/tools/evaluation-conformite-reglementaire',
    titleFr: 'Évaluation de Conformité Réglementaire',
    titleEn: 'Regulatory Compliance Assessment',
    subtitleFr: '6 domaines · Score de conformité · Écarts identifiés · Recommandations priorisées · Benchmark sectoriel',
    subtitleEn: '6 domains · Compliance score · Identified gaps · Prioritized recommendations · Sector benchmark',
    icon: 'ri-shield-check-line',
    accent: '#475569',
    pages: '6 domaines',
    ctaFr: 'Évaluer ma Conformité',
    ctaEn: 'Assess my Compliance',
    benefitFr: 'En 6 minutes, identifiez vos angles morts réglementaires avant que le régulateur ne les trouve — et recevez un plan d\'action priorisé.',
    benefitEn: 'In 6 minutes, identify your regulatory blind spots before the regulator does — and receive a prioritized action plan.',
    statsFr: '20 questions · 6 domaines · Score immédiat',
    statsEn: '20 questions · 6 domains · Immediate score',
    timeFr: '6 min',
    timeEn: '6 min',
    usersCountFr: '550+ compliance officers',
    usersCountEn: '550+ compliance officers',
    satisfactionRate: '93%',
    urgencyFr: 'Nouvelles circulaires BCEAO/COBAC — restez conforme',
    urgencyEn: 'New BCEAO/COBAC circulars — stay compliant',
  },
};

// ─── CONTEXT MAP ──────────────────────────────────────────────────────────
// Maps page context → (guide-based magnet | tool-based magnet)
type ContextType = 
  | 'due-diligence' | 'investment-readiness' | 'esg' | 'gouvernance'
  | 'pre-inspection-bceao' | 'agrement-fintech' | 'ceo-advisory-board'
  | 'family-office-afrique' | 'regulatory-intelligence';

interface InlineLeadMagnetProps {
  context: ContextType;
  variant?: 'banner' | 'card';
}

const GUIDE_CONTEXT_MAP: Record<string, string> = {
  'due-diligence': 'guide-due-diligence',
  'investment-readiness': 'guide-investment-readiness',
  'esg': 'guide-esg',
  'gouvernance': 'guide-gouvernance-imf',
};

const TOOL_CONTEXT_MAP: Record<string, string> = {
  'pre-inspection-bceao': 'diagnostic-pre-inspection-bceao-cobac',
  'agrement-fintech': 'evaluation-maturite-fintech',
  'ceo-advisory-board': 'diagnostic-maturite-pilotage-strategique',
  'family-office-afrique': 'diagnostic-perennite-familiale',
  'regulatory-intelligence': 'evaluation-conformite-reglementaire',
};

export const InlineLeadMagnet = memo(function InlineLeadMagnet({
  context,
  variant = 'banner',
}: InlineLeadMagnetProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  // ─── Tool-based Ultra Lead Magnet ──────────────────────────────────────
  const toolKey = TOOL_CONTEXT_MAP[context];
  if (toolKey) {
    const tool = TOOL_LEAD_MAGNETS[toolKey];
    if (!tool) return null;

    if (variant === 'banner') {
      return (
        <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${tool.accent} 0%, transparent 70%)` }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: `${tool.accent}15`, border: `1px solid ${tool.accent}35` }}>
                <i className={`${tool.icon} text-sm`} style={{ color: tool.accent }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: tool.accent }}>
                  {isEn ? `Free Diagnostic — ${tool.timeEn}` : `Diagnostic Gratuit — ${tool.timeFr}`}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading), serif' }}>
                {isEn ? tool.titleEn : tool.titleFr}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-base leading-relaxed">{isEn ? tool.subtitleEn : tool.subtitleFr}</p>

              {/* Stats bar */}
              <div className="inline-flex flex-wrap items-center justify-center gap-4 mt-6 px-6 py-3 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="text-xs text-white/50"><i className="ri-time-line mr-1" />{isEn ? tool.timeEn : tool.timeFr}</span>
                <span className="text-white/20">|</span>
                <span className="text-xs text-white/50"><i className="ri-lock-line mr-1" />{isEn ? '100% confidential' : '100% confidentiel'}</span>
                <span className="text-white/20">|</span>
                <span className="text-xs text-white/50"><i className="ri-file-chart-line mr-1" />{isEn ? 'Instant results' : 'Résultats immédiats'}</span>
              </div>

              {/* Social proof + urgency strip */}
              {(tool.usersCountFr || tool.satisfactionRate) && (
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-5">
                  {tool.usersCountFr && (
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-5 h-5 rounded-full border border-[#0a1628] flex items-center justify-center" style={{ background: tool.accent, opacity: 1 - i * 0.25, zIndex: 3 - i }}>
                            <i className="ri-user-fill text-[8px] text-white" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-white/50">{isEn ? tool.usersCountEn : tool.usersCountFr}</span>
                    </div>
                  )}
                  {tool.satisfactionRate && (
                    <div className="flex items-center gap-1.5">
                      <i className="ri-star-fill text-xs" style={{ color: tool.accent }} />
                      <span className="text-xs text-white/50">
                        {isEn ? `${tool.satisfactionRate} satisfaction` : `${tool.satisfactionRate} satisfaction`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Urgency signal */}
              {(tool.urgencyFr) && (
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium animate-pulse" style={{ background: `${tool.accent}10`, border: `1px solid ${tool.accent}25`, color: tool.accent }}>
                    <i className="ri-fire-line text-xs" />
                    {isEn ? tool.urgencyEn : tool.urgencyFr}
                  </div>
                </div>
              )}
            </div>

            {/* Benefit + CTA */}
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl p-6 md:p-8 mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${tool.accent}20` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${tool.accent}15` }}>
                    <i className={`${tool.icon} text-xl`} style={{ color: tool.accent }} />
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {isEn ? tool.benefitEn : tool.benefitFr}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => navigate(tool.toolSlug)}
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${tool.accent}, ${tool.accent}cc)`, color: '#ffffff', boxShadow: `0 4px 24px ${tool.accent}40` }}
                      >
                        <i className={tool.icon} />
                        {isEn ? tool.ctaEn : tool.ctaFr}
                        <i className="ri-arrow-right-line" />
                      </button>
                      <span className="inline-flex items-center gap-2 text-xs font-medium self-center" style={{ color: 'rgba(255,255,255,0.40)' }}>
                        <i className="ri-check-line" style={{ color: tool.accent }} />
                        {isEn ? 'No spam · Instant access' : 'Pas de spam · Accès immédiat'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                {isEn ? tool.statsEn : tool.statsFr}
              </p>
            </div>
          </div>
        </section>
      );
    }

    // Card variant
    return (
      <div
        className="rounded-2xl p-6 border cursor-pointer transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)', borderColor: `${tool.accent}25` }}
        onClick={() => navigate(tool.toolSlug)}
      >
        <div className="h-1 w-full rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${tool.accent}, ${tool.accent}80)` }} />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${tool.accent}10`, border: `1px solid ${tool.accent}20` }}>
            <i className={`${tool.icon} text-lg`} style={{ color: tool.accent }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${tool.accent}12`, color: tool.accent }}>
              {isEn ? 'Free' : 'Gratuit'}
            </span>
            <span className="text-xs text-gray-400">{isEn ? tool.timeEn : tool.timeFr}</span>
          </div>
        </div>
        <h4 className="font-bold text-lg text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading), serif' }}>{isEn ? tool.titleEn : tool.titleFr}</h4>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{isEn ? tool.subtitleEn : tool.subtitleFr}</p>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(tool.toolSlug); }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${tool.accent}, ${tool.accent}cc)`, color: '#ffffff' }}
        >
          {isEn ? tool.ctaEn : tool.ctaFr}
          <i className="ri-arrow-right-line" />
        </button>
      </div>
    );
  }

  // ─── Guide-based Lead Magnet (existing logic) ───────────────────────────
  const primaryMagnet = LEAD_MAGNETS.find((m) => m.id === GUIDE_CONTEXT_MAP[context]);
  if (!primaryMagnet) return null;

  const otherMagnets = LEAD_MAGNETS.filter((m) => m.id !== primaryMagnet.id);

  if (variant === 'banner') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-3xl p-8 lg:p-10 relative overflow-hidden cursor-pointer transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)',
              border: `1px solid ${primaryMagnet.accentColor}25`,
            }}
            onClick={() => navigate(primaryMagnet.slug)}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: `radial-gradient(circle at 80% 20%, ${primaryMagnet.accentColor}10 0%, transparent 60%)` }}
            />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: `${primaryMagnet.accentColor}15`,
                      color: primaryMagnet.accentColor,
                      border: `1px solid ${primaryMagnet.accentColor}30`,
                    }}
                  >
                    <i className="ri-gift-line" />
                    {isEn ? 'Free Guide — Premium Resource' : 'Guide Gratuit — Ressource Premium'}
                  </div>
                  <span className="text-xs font-bold text-gray-500">{primaryMagnet.pages} pages</span>
                </div>
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
                  {isEn
                    ? `Download our ${primaryMagnet.titleEn}`
                    : `Téléchargez notre ${primaryMagnet.titleFr}`}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {isEn ? primaryMagnet.subtitleEn : primaryMagnet.subtitleFr}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(primaryMagnet.slug);
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryMagnet.accentColor}, ${primaryMagnet.accentColor}cc)`,
                      color: '#ffffff',
                      boxShadow: `0 4px 20px ${primaryMagnet.accentColor}40`,
                    }}
                  >
                    <i className="ri-file-download-line" />
                    {isEn ? 'Download the guide' : 'Télécharger le guide'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <i className="ri-check-line" style={{ color: primaryMagnet.accentColor }} />
                    {isEn ? 'No spam · Instant access' : 'Pas de spam · Accès immédiat'}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="grid grid-cols-1 gap-3">
                  {otherMagnets.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.accentColor}15` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(m.slug);
                      }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${m.accentColor}15` }}>
                        <i className={`${m.icon} text-sm`} style={{ color: m.accentColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{isEn ? m.title : m.title}</p>
                        <p className="text-xs text-gray-500">{m.pages}p</p>
                      </div>
                      <i className="ri-arrow-right-line text-xs text-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Card variant (compact)
  return (
    <div
      className="rounded-2xl p-6 border cursor-pointer transition-all hover:-translate-y-1"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
        borderColor: `${primaryMagnet.accentColor}25`,
      }}
      onClick={() => navigate(primaryMagnet.slug)}
    >
      <div className="h-1 w-full rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${primaryMagnet.accentColor}, ${primaryMagnet.accentColor}80)` }} />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${primaryMagnet.accentColor}10`, border: `1px solid ${primaryMagnet.accentColor}20` }}>
          <i className={`${primaryMagnet.icon} text-lg`} style={{ color: primaryMagnet.accentColor }} />
        </div>
        <div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${primaryMagnet.accentColor}12`, color: primaryMagnet.accentColor }}>
            {isEn ? 'Free' : 'Gratuit'}
          </span>
          <span className="text-xs text-gray-400 ml-2">{primaryMagnet.pages}p</span>
        </div>
      </div>
      <h4 className="font-playfair text-lg font-bold text-gray-900 mb-2">
        {isEn ? primaryMagnet.title : primaryMagnet.title}
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        {isEn ? primaryMagnet.subtitleEn : primaryMagnet.subtitleFr}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(primaryMagnet.slug);
        }}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${primaryMagnet.accentColor}, ${primaryMagnet.accentColor}cc)`,
          color: '#ffffff',
        }}
      >
        {isEn ? 'Download' : 'Télécharger'}
        <i className="ri-arrow-right-line" />
      </button>
    </div>
  );
});



