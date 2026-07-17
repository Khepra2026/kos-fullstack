import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { officialStats } from '@/data/stats';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';

const C = {
  vert: '#6B9B1F',
  vertLight: '#86BC25',
  or: '#c4a235',
  orLight: '#d4a82a',
  surface: '#ffffff',
  surfaceAlt: '#fafaf9',
  surfaceCard: '#f9f8f5',
  surfaceHover: '#f3f0e8',
  border: 'rgba(134,188,37,0.18)',
  borderSubtle: 'rgba(0,0,0,0.06)',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  textDim: '#9ca3af',
  textDark: '#374151',
};

const STAT_ICONS = ['ri-time-line', 'ri-briefcase-4-line', 'ri-global-line', 'ri-shield-check-line'];

const METHODOLOGY_STEPS_FR = [
  {
    number: '01', icon: 'ri-search-eye-line', title: 'Diagnostic — Audit initial',
    desc: 'Analyse documentaire approfondie, entretiens avec les parties prenantes, revue des processus existants, cartographie des risques et identification des écarts réglementaires. Livrable : rapport de diagnostic.',
    accent: C.vertLight,
  },
  {
    number: '02', icon: 'ri-lightbulb-flash-line', title: 'Co-construction — Stratégie sur mesure',
    desc: 'Ateliers collaboratifs avec vos équipes, élaboration de la feuille de route, modélisation des scénarios, plan d\'action chiffré avec indicateurs de suivi. Livrable : plan stratégique détaillé.',
    accent: C.vertLight,
  },
  {
    number: '03', icon: 'ri-tools-line', title: 'Mise en œuvre — Transformation terrain',
    desc: 'Déploiement opérationnel sur site, formation des équipes, transfert de compétences, accompagnement au changement. Suivi hebdomadaire des jalons. Livrable : rapports d\'avancement.',
    accent: C.vertLight,
  },
  {
    number: '04', icon: 'ri-line-chart-line', title: 'Évaluation — Mesure d\'impact',
    desc: 'Audit de performance post-déploiement, mesure des KPIs, ajustements correctifs, bilan de mission et recommandations pour la pérennisation. Livrable : rapport d\'impact final.',
    accent: C.vertLight,
  },
];

const METHODOLOGY_STEPS_EN = [
  {
    number: '01', icon: 'ri-search-eye-line', title: 'Diagnosis — Initial Audit',
    desc: 'In-depth document analysis, stakeholder interviews, existing process review, risk mapping and regulatory gap identification. Deliverable: diagnostic report.',
    accent: C.vertLight,
  },
  {
    number: '02', icon: 'ri-lightbulb-flash-line', title: 'Co-creation — Tailored Strategy',
    desc: 'Collaborative workshops with your teams, roadmap development, scenario modeling, quantified action plan with monitoring indicators. Deliverable: detailed strategic plan.',
    accent: C.vertLight,
  },
  {
    number: '03', icon: 'ri-tools-line', title: 'Implementation — Field Transformation',
    desc: 'On-site operational deployment, team training, skills transfer, change management support. Weekly milestone tracking. Deliverable: progress reports.',
    accent: C.vertLight,
  },
  {
    number: '04', icon: 'ri-line-chart-line', title: 'Evaluation — Impact Measurement',
    desc: 'Post-deployment performance audit, KPI measurement, corrective adjustments, mission review and sustainability recommendations. Deliverable: final impact report.',
    accent: C.vertLight,
  },
];

const CERTIFICATIONS_FR = [
  {
    icon: 'ri-graduation-cap-line',
    title: 'MBA — Gestion des Organisations',
    institution: 'Université Laval, Québec, Canada',
    year: '2018',
    detail: 'Spécialisation en gouvernance, stratégie et performance organisationnelle. Programme accrédité AACSB et EQUIS.',
  },
  {
    icon: 'ri-book-open-line',
    title: 'Maîtrise en Sciences de Gestion',
    institution: 'Université de Lomé, Togo',
    year: '2003',
    detail: 'Formation approfondie en management, finance et contrôle de gestion. Major de promotion.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Expert certifié — Cadre réglementaire UEMOA/CEMAC',
    institution: 'BCEAO · COBAC · Commission Bancaire',
    year: 'Depuis 2011',
    detail: 'Maîtrise complète des Instructions BCEAO, Règlements COBAC, ratios Bâle III, normes LBC/FT et dispositifs prudentiels.',
  },
  {
    icon: 'ri-award-line',
    title: 'Membre — Réseau des consultants ouest-africains',
    institution: 'Ordre des Experts-Comptables · UEMOA',
    year: 'Depuis 2015',
    detail: 'Reconnu par les institutions régionales pour l\'expertise en conformité prudentielle et gouvernance des SFD/EMF.',
  },
  {
    icon: 'ri-building-4-line',
    title: 'Partenaire institutionnel — Programmes IFC, BAD, PNUD',
    institution: 'IFC · BAD · PNUD · BCEAO',
    year: 'Aligné IFC Performance Standards',
    detail: 'Méthodologie alignée sur les standards IFC, exigences ESG et cadres de due diligence des bailleurs internationaux.',
  },
];

const CERTIFICATIONS_EN = [
  {
    icon: 'ri-graduation-cap-line',
    title: 'MBA — Organizational Management',
    institution: 'Laval University, Quebec, Canada',
    year: '2018',
    detail: 'Specialization in governance, strategy and organizational performance. AACSB and EQUIS accredited program.',
  },
  {
    icon: 'ri-book-open-line',
    title: 'Master in Management Sciences',
    institution: 'University of Lomé, Togo',
    year: '2003',
    detail: 'In-depth training in management, finance and management control. Top of class.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Certified Expert — UEMOA/CEMAC Regulatory Framework',
    institution: 'BCEAO · COBAC · Banking Commission',
    year: 'Since 2011',
    detail: 'Complete mastery of BCEAO Instructions, COBAC Regulations, Basel III ratios, AML/CFT standards and prudential frameworks.',
  },
  {
    icon: 'ri-award-line',
    title: 'Member — West African Consultants Network',
    institution: 'Order of Chartered Accountants · UEMOA',
    year: 'Since 2015',
    detail: 'Recognized by regional institutions for expertise in prudential compliance and MFI/SFD governance.',
  },
  {
    icon: 'ri-building-4-line',
    title: 'Institutional Partner — IFC, AfDB, UNDP Programs',
    institution: 'IFC · AfDB · UNDP · BCEAO',
    year: 'Aligned with IFC Performance Standards',
    detail: 'Methodology aligned with IFC standards, ESG requirements and due diligence frameworks of international funders.',
  },
];

const REFERENCES_FR = [
  {
    icon: 'ri-bank-line',
    name: 'FINAM Gabon',
    role: 'Auditeur Senior — Contrôle interne & Conformité',
    period: '2011 – 2015 · 4 ans',
    result: 'Mise en conformité COBAC · 0 observation aux inspections',
    description: 'Supervision des missions d\'audit interne, revue des dispositifs de contrôle permanent, préparation aux inspections COBAC, mise en conformité du reporting prudentiel.',
  },
  {
    icon: 'ri-building-4-line',
    name: 'Atlantique Microfinance (AMIFA)',
    role: 'Directeur Général — Pilotage stratégique',
    period: '2016 – 2020 · 4 ans',
    result: 'Croissance du portefeuille de 180% · Agrément SFD maintenu',
    description: 'Direction générale d\'un SFD de premier plan, pilotage stratégique, relation régulateur BCEAO, structuration de la gouvernance et levée de fonds institutionnels.',
  },
  {
    icon: 'ri-government-line',
    name: 'Ministère de l\'Inclusion Financière — Togo',
    role: 'Conseiller Technique National — Stratégie & Régulation',
    period: '2021 – 2023 · 2 ans',
    result: 'Stratégie nationale d\'inclusion financière déployée',
    description: 'Conseil stratégique au Ministre, élaboration de la SNIF 2022-2026, coordination avec la BCEAO, cadrage des réformes du secteur de la microfinance.',
  },
  {
    icon: 'ri-user-star-line',
    name: 'SYNERGIE FINANCE SA',
    role: 'Administrateur — Conseil & Supervision',
    period: 'Depuis 2020 · Mandat en cours',
    result: 'Gouvernance renforcée · Notation institutionnelle améliorée',
    description: 'Membre du Conseil d\'Administration, supervision de la stratégie d\'investissement, validation des politiques de risque et conformité.',
  },
];

const REFERENCES_EN = [
  {
    icon: 'ri-bank-line',
    name: 'FINAM Gabon',
    role: 'Senior Auditor — Internal Control & Compliance',
    period: '2011 – 2015 · 4 years',
    result: 'COBAC compliance achieved · 0 inspection findings',
    description: 'Supervision of internal audit missions, review of permanent control frameworks, COBAC inspection preparation, prudential reporting compliance.',
  },
  {
    icon: 'ri-building-4-line',
    name: 'Atlantic Microfinance (AMIFA)',
    role: 'CEO — Strategic Management',
    period: '2016 – 2020 · 4 years',
    result: '180% portfolio growth · SFD license maintained',
    description: 'CEO of a leading SFD, strategic management, BCEAO regulatory relationship, governance structuring and institutional fundraising.',
  },
  {
    icon: 'ri-government-line',
    name: 'Ministry of Financial Inclusion — Togo',
    role: 'National Technical Advisor — Strategy & Regulation',
    period: '2021 – 2023 · 2 years',
    result: 'National financial inclusion strategy deployed',
    description: 'Strategic advisory to the Minister, development of SNIF 2022-2026, coordination with BCEAO, framing of microfinance sector reforms.',
  },
  {
    icon: 'ri-user-star-line',
    name: 'SYNERGIE FINANCE SA',
    role: 'Board Member — Advisory & Oversight',
    period: 'Since 2020 · Ongoing mandate',
    result: 'Strengthened governance · Improved institutional rating',
    description: 'Board member, investment strategy oversight, risk and compliance policy validation.',
  },
];

type TabId = 'methodology' | 'certifications' | 'references';

export default function PourquoiNousFaireConfiance() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('methodology');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const tabs: { id: TabId; icon: string; labelFr: string; labelEn: string }[] = [
    { id: 'methodology', icon: 'ri-route-line', labelFr: 'Méthodologie', labelEn: 'Methodology' },
    { id: 'certifications', icon: 'ri-award-line', labelFr: 'Certifications & Affiliations', labelEn: 'Certifications & Affiliations' },
    { id: 'references', icon: 'ri-building-2-line', labelFr: 'Références vérifiables', labelEn: 'Verifiable References' },
  ];

  const steps = isEn ? METHODOLOGY_STEPS_EN : METHODOLOGY_STEPS_FR;
  const certs = isEn ? CERTIFICATIONS_EN : CERTIFICATIONS_FR;
  const refs = isEn ? REFERENCES_EN : REFERENCES_FR;

  return (
    <section
      id="pourquoi-nous-faire-confiance"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #fdfaf5 0%, #ffffff 50%, #fdfaf5 100%)` }}
      aria-labelledby="trust-heading"
    >
      {/* Grille subtile */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(rgba(134,188,37,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(134,188,37,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Lueur supérieure centrée */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '900px', height: '200px', background: 'radial-gradient(ellipse, rgba(134,188,37,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══════════ HEADER ═══════════ */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-5">
            <BigFourSubtitleBar
              label={isEn ? 'Why Trust Us' : 'Pourquoi nous faire confiance'}
              variant="double-stroke"
              icon="ri-verified-badge-fill"
              accentColor="primary"
            />
          </div>
          <h2
            id="trust-heading"
            className="font-playfair font-bold leading-tight mb-5"
            style={{ color: C.text, fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            {isEn
              ? <>Verified expertise.<br /><span style={{ color: C.vertLight }}>Measurable results.</span></>
              : <>Expertise vérifiable.<br /><span style={{ color: C.vertLight }}>Résultats mesurables.</span></>}
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed text-justify" style={{ color: C.textMuted }}>
            {isEn
              ? '22 years of documented track record across West and Central Africa. Not marketing claims — verifiable facts, named institutions, and a transparent methodology.'
              : "22 ans de parcours documenté en Afrique de l'Ouest et Centrale. Pas des slogans marketing — des faits vérifiables, des institutions nommées, et une méthodologie transparente."}
          </p>
        </div>

        {/* ═══════════ STATS BAR ═══════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {officialStats.map((stat, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-5 md:p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
              style={{ background: C.surfaceCard, border: `1px solid ${C.borderSubtle}` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${C.vertLight}08 0%, transparent 70%)` }}
              />
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl mb-3 relative z-10"
                style={{ background: `${C.vertLight}14`, border: `1px solid ${C.vertLight}28` }}
              >
                <i className={`${STAT_ICONS[idx]} text-lg`} style={{ color: C.vertLight }} />
              </div>
              <div
                className="font-playfair font-bold leading-none mb-1 relative z-10"
                style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: C.vertLight }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm font-semibold relative z-10" style={{ color: C.text }}>
                {isEn ? stat.labelEn : stat.labelFr}
              </div>
              {(isEn ? stat.subLabelEn : stat.subLabelFr) && (
                <div className="text-xs mt-1 relative z-10" style={{ color: C.textDim }}>
                  {isEn ? stat.subLabelEn : stat.subLabelFr}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ═══════════ TABS ═══════════ */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${C.vertLight}, ${C.vert})`
                  : C.surfaceCard,
                color: activeTab === tab.id ? '#0a0a0a' : C.textMuted,
                border: activeTab === tab.id ? 'none' : `1px solid ${C.borderSubtle}`,
              }}
            >
              <i className={`${tab.icon} text-sm`} />
              {isEn ? tab.labelEn : tab.labelFr}
            </button>
          ))}
        </div>

        {/* ═══════════ TAB CONTENT ═══════════ */}
        <div className="min-h-[400px]">
          {/* ── MÉTHODOLOGIE ── */}
          {activeTab === 'methodology' && (
            <div className="space-y-4 animate-fadeIn">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 md:gap-6 p-5 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-x-1"
                  style={{ background: C.surfaceCard, border: `1px solid ${C.borderSubtle}` }}
                >
                  <div
                    className="font-playfair font-bold leading-none flex-shrink-0 text-center"
                    style={{ fontSize: '2.5rem', color: C.vertLight, minWidth: '3rem' }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
                        style={{ background: `${C.vertLight}14`, border: `1px solid ${C.vertLight}22` }}
                      >
                        <i className={`${step.icon} text-base`} style={{ color: C.vertLight }} />
                      </div>
                      <h3 className="font-bold text-base md:text-lg" style={{ color: C.text }}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-justify" style={{ color: C.textMuted }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <a
                  href="/approche/"
                  onClick={(e) => { e.preventDefault(); navigate('/approche/'); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 no-underline"
                  style={{ background: 'transparent', border: `1.5px solid ${C.vertLight}40`, color: C.vertLight }}
                >
                  {isEn ? 'See our full methodology' : 'Voir notre méthodologie complète'}
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          )}

          {/* ── CERTIFICATIONS ── */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 animate-fadeIn">
              {certs.map((cert, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: C.surfaceCard, border: `1px solid ${C.borderSubtle}` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${C.vertLight}06 0%, transparent 70%)` }}
                  />
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 relative z-10"
                    style={{ background: `${C.vertLight}12`, border: `1px solid ${C.vertLight}25` }}
                  >
                    <i className={`${cert.icon} text-xl`} style={{ color: C.vertLight }} />
                  </div>
                  <h3 className="font-bold text-base mb-1 relative z-10" style={{ color: C.text }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm mb-1 relative z-10" style={{ color: C.textMuted }}>
                    {cert.institution}
                  </p>
                  <div
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 relative z-10"
                    style={{ background: `${C.vertLight}10`, color: C.vertLight, border: `1px solid ${C.vertLight}20` }}
                  >
                    {cert.year}
                  </div>
                  <p className="text-xs leading-relaxed text-justify relative z-10" style={{ color: C.textDim }}>
                    {cert.detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ── RÉFÉRENCES VÉRIFIABLES ── */}
          {activeTab === 'references' && (
            <div className="space-y-4 animate-fadeIn">
              {refs.map((ref, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-x-1"
                  style={{ background: C.surfaceCard, border: `1px solid ${C.borderSubtle}` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {/* Icon + name */}
                    <div className="flex items-center gap-4 md:min-w-[240px] flex-shrink-0">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                        style={{ background: `${C.vertLight}14`, border: `1px solid ${C.vertLight}25` }}
                      >
                        <i className={`${ref.icon} text-xl`} style={{ color: C.vertLight }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-base leading-snug" style={{ color: C.text }}>
                          {ref.name}
                        </h3>
                        <p className="text-xs" style={{ color: C.textMuted }}>
                          {ref.role}
                        </p>
                        <p className="text-xs font-semibold mt-1" style={{ color: C.vertLight }}>
                          {ref.period}
                        </p>
                      </div>
                    </div>

                    {/* Description + Result */}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-justify mb-3" style={{ color: C.textMuted }}>
                        {ref.description}
                      </p>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ background: `${C.vertLight}10`, border: `1px solid ${C.vertLight}18` }}
                      >
                        <i className="ri-checkbox-circle-fill text-sm" style={{ color: C.vertLight }} />
                        <span className="text-xs font-semibold" style={{ color: C.vertLight }}>
                          {ref.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <a
                  href="/case-studies/"
                  onClick={(e) => { e.preventDefault(); navigate('/case-studies/'); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 no-underline"
                  style={{ background: 'transparent', border: `1.5px solid ${C.vertLight}40`, color: C.vertLight }}
                >
                  {isEn ? 'See all case studies' : 'Voir toutes les études de cas'}
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════ BOTTOM CTA ═══════════ */}
        <div className="mt-14 md:mt-16">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: `linear-gradient(135deg, #f9f6ee 0%, #fdf9f0 100%)`, border: `1px solid rgba(196,162,53,0.22)` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <h3 className="font-playfair text-xl md:text-2xl font-bold mb-2" style={{ color: C.text }}>
                  {isEn
                    ? 'Ready to verify our expertise firsthand?'
                    : 'Prêt à vérifier notre expertise par vous-même ?'}
                </h3>
                <p className="text-sm leading-relaxed text-justify max-w-lg" style={{ color: C.textMuted }}>
                  {isEn
                    ? 'Book a 30-minute confidential consultation with a senior expert. Present your challenge, get an initial diagnosis and a clear roadmap — no commitment.'
                    : "Réservez une consultation confidentielle de 30 minutes avec un expert senior. Présentez votre enjeu, recevez un diagnostic initial et une feuille de route claire — sans engagement."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${C.vertLight}, ${C.vert})`, color: '#ffffff', boxShadow: `0 6px 24px ${C.vertLight}35` }}
                >
                  <i className="ri-calendar-check-line text-lg" />
                  {isEn ? 'Book a strategic consultation' : 'Réserver un entretien stratégique'}
                </button>
                <BrochureDownloadButton
                  variant="secondary"
                  size="md"
                  lang={isEn ? 'en' : undefined}
                  source="trust_section_cta"
                >
                  <i className="ri-file-download-line" />
                  {isEn ? 'Download brochure' : 'Télécharger la brochure'}
                </BrochureDownloadButton>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}