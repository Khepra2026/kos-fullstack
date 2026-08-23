import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InstitutionalAbstractBackground from '@/components/feature/InstitutionalAbstractBackground';

/* ============================================================
   KOS — Hero Ultra Lead Magnet™ v10.0
   Inspiration des standards internationaux
   Juin 2026 — Split autorité : Texte + Dashboard Crédibilité
   Sobre, data-driven, institutionnel. Vert + Or minimalistes.
   ============================================================ */

/* ── Business Units ── */
const BUSINESS_UNITS = [
  {
    id: 'bu1',
    icon: 'ri-shield-check-line',
    number: 'BU1',
    labelFr: 'Régulation Financière & Conformité',
    labelEn: 'Financial Regulation & Compliance',
    descFr: 'Bouclier BCEAO/COBAC, agrément, LBC/FT',
    descEn: 'BCEAO/COBAC Shield, licensing, AML/CFT',
    href: '/kos-bu1-financial-regulation/',
  },
  {
    id: 'bu2',
    icon: 'ri-government-line',
    number: 'BU2',
    labelFr: 'Gouvernance & Due Diligence',
    labelEn: 'Governance & Due Diligence',
    descFr: 'Performance Boards, DD, Conseil CA',
    descEn: 'Board Performance, DD, Board Advisory',
    href: '/kos-bu2-governance-due-diligence/',
  },
  {
    id: 'bu3',
    icon: 'ri-leaf-line',
    number: 'BU3',
    labelFr: 'Climat, Transition & ESG',
    labelEn: 'Climate, Transition & ESG',
    descFr: 'Bilan carbone, ISSB/GRI/CSRD, FVC',
    descEn: 'Carbon footprint, ISSB/GRI/CSRD, GCF',
    href: '/kos-bu3-climate-esg/',
  },
  {
    id: 'bu4',
    icon: 'ri-line-chart-line',
    number: 'BU4',
    labelFr: 'KBR-Model & Intelligence d\'Affaires',
    labelEn: 'KBR-Model & Business Intelligence',
    descFr: 'Études sectorielles, monographies, L1/L2/L3',
    descEn: 'Sector studies, monographs, L1/L2/L3',
    href: '/kos-bu4-kbr-model/',
  },
];

/* ── Dashboard crédibilité ── */
const CREDIBILITY_METRICS = [
  { value: '22+', labelFr: 'Années d\'expertise', labelEn: 'Years of expertise' },
  { value: '17', labelFr: 'Pays UEMOA/CEMAC', labelEn: 'UEMOA/CEMAC countries' },
  { value: '20', labelFr: 'Autorités réglementaires', labelEn: 'Regulatory authorities' },
  { value: '178', labelFr: 'Citations vérifiées', labelEn: 'Verified citations' },
];

/* ── Stats bottom bar ── */
const BOTTOM_STATS = [
  { value: '1 500+', labelFr: 'Institutions suivies', labelEn: 'Institutions tracked' },
  { value: '200+', labelFr: 'Missions réalisées', labelEn: 'Missions completed' },
  { value: 'Confidentiel', labelFr: 'Sur devis', labelEn: 'On quote' },
  { value: '92%', labelFr: 'Taux de succès', labelEn: 'Success rate' },
];

export default function HeroUltraLeadMagnet() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-background-50">
      {/* ── Split principal — Texte + Dashboard ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pt-28 md:pb-12 lg:pt-32 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16 xl:gap-24">

          {/* ═══════════════════════════════════════════
              COLONNE GAUCHE — Message institutionnel
              ═══════════════════════════════════════════ */}
          <div className={`flex-1 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-5 h-0.5 bg-accent-400" />
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-foreground-400">
                KOS REGTECH AI — KHEPRA EXPERTS
              </span>
            </div>

            {/* H1 — Bold, direct, institutional style */}
            <h1
              className="font-bold text-foreground-950 mb-5"
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {isEn
                ? 'Regulatory intelligence that drives performance.'
                : 'L\'intelligence réglementaire au service de votre performance.'}
            </h1>

            {/* Description — concise, professionnelle */}
            <p className="text-[15px] leading-relaxed text-foreground-600 max-w-[540px] mb-7">
              {isEn
                ? 'KOS REGTECH AI delivers institutional-grade regulatory intelligence across Francophone Africa. 22 years of expertise. 17 countries. 20 regulatory authorities. One command center.'
                : 'KOS REGTECH AI délivre l\'intelligence réglementaire de niveau institutionnel en Afrique Francophone. 22 ans d\'expertise. 17 pays. 20 autorités réglementaires. Un cockpit de commandement.'}
            </p>

            {/* CTAs — Hiérarchie claire */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <button
                onClick={() => navigate('/kos-ultra-lead-magnets/')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 bg-primary-500 text-white hover:bg-primary-600"
              >
                {isEn ? 'Explore our analyses' : 'Explorer nos analyses'}
                <i className="ri-arrow-right-line text-base" />
              </button>
              <button
                onClick={() => navigate('/khepra-business-review/')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 border border-foreground-200 text-foreground-700 hover:border-foreground-400 hover:text-foreground-900"
              >
                <i className="ri-book-open-line text-base" />
                Khepra Business Review
              </button>
            </div>

            {/* Trust line */}
            <p className="text-[11px] text-foreground-400 flex items-center gap-2">
              <i className="ri-lock-line" style={{ fontSize: '0.75rem' }} />
              {isEn
                ? 'Confidential · Institutional-grade · No external dependencies'
                : 'Confidentiel · Niveau institutionnel · Zéro dépendance externe'}
            </p>
          </div>

          {/* ═══════════════════════════════════════════
              COLONNE DROITE — Dashboard Crédibilité
              ═══════════════════════════════════════════ */}
          <div className={`lg:w-[380px] xl:w-[420px] flex-shrink-0 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div
              className="rounded-lg p-6 md:p-7 relative overflow-hidden"
              style={{
                background: 'oklch(0.50 0.14 148 / 0.04)',
                border: '1px solid oklch(0.50 0.14 148 / 0.10)',
              }}
            >
              {/* Fond abstrait institutionnel — style rapport annuel Deloitte */}
              <InstitutionalAbstractBackground opacity={0.06} className="rounded-lg" />

              {/* Étiquette dashboard */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-foreground-400">
                  {isEn ? 'Credibility Dashboard' : 'Tableau de Bord Crédibilité'}
                </span>
              </div>

              {/* Grille de métriques 2×2 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {CREDIBILITY_METRICS.map((metric, i) => (
                  <div key={i} className="group">
                    <div
                      className="text-3xl md:text-[2rem] font-bold tracking-tight text-foreground-950 mb-0.5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-[11px] leading-snug text-foreground-500">
                      {isEn ? metric.labelEn : metric.labelFr}
                    </div>
                  </div>
                ))}
              </div>

              {/* Séparateur */}
              <div className="h-px mb-5" style={{ background: 'oklch(0.50 0.14 148 / 0.08)' }} />

              {/* Ligne d'accréditation */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'oklch(0.71 0.15 86 / 0.10)',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                  }}
                >
                  <i className="ri-verified-badge-line" style={{ fontSize: '1rem', color: 'oklch(0.71 0.15 86)' }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground-900 mb-0.5">
                    {isEn ? 'Institutional Accreditation' : 'Accréditation Institutionnelle'}
                  </div>
                  <div className="text-[11px] leading-relaxed text-foreground-500">
                    {isEn
                      ? 'KOS Automaton v2 engine. TF-IDF Cosine Similarity across 52 African regulatory documents. No external dependency.'
                      : 'Moteur KOS Automaton v2. TF-IDF Cosine Similarity sur 100+ documents réglementaires africains. Sans dépendance externe.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            4 BUSINESS UNITS — Ligne horizontale
            ═══════════════════════════════════════════ */}
        <div className={`mt-10 lg:mt-14 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-foreground-400">
              {isEn ? 'Our Expertise Domains' : 'Nos Domaines d\'Expertise'}
            </span>
            <div className="flex-1 h-px bg-foreground-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BUSINESS_UNITS.map((bu) => (
              <button
                key={bu.id}
                onClick={() => navigate(bu.href)}
                className="group flex items-start gap-3.5 px-4 py-3.5 rounded-md text-left cursor-pointer transition-all duration-200 bg-background-50 border border-background-200 hover:border-foreground-200 hover:-translate-y-0.5"
              >
                {/* Icône */}
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{
                    background: 'oklch(0.50 0.14 148 / 0.06)',
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                  }}
                >
                  <i className={bu.icon} style={{ fontSize: '1rem', color: 'oklch(0.50 0.14 148)' }} />
                </div>

                {/* Texte */}
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-foreground-400 mb-0.5">
                    {bu.number}
                  </div>
                  <div className="text-sm font-bold text-foreground-900 leading-tight mb-0.5 truncate">
                    {isEn ? bu.labelEn : bu.labelFr}
                  </div>
                  <div className="text-[11px] text-foreground-500 leading-snug truncate">
                    {isEn ? bu.descEn : bu.descFr}
                  </div>
                </div>

                {/* Flèche hover */}
                <div className="flex-shrink-0 self-center ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <i className="ri-arrow-right-s-line text-foreground-400" style={{ fontSize: '1rem' }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          STATS BAR — Bottom full-width
          ═══════════════════════════════════════════ */}
      <div className={`border-t border-background-200 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background-200">
            {BOTTOM_STATS.map((stat, i) => (
              <div key={i} className="py-4 px-4 md:px-6 text-center first:pl-0 last:pr-0">
                <div
                  className="text-xl md:text-2xl font-bold tracking-tight text-foreground-950 mb-0.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-foreground-500">
                  {isEn ? stat.labelEn : stat.labelFr}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



