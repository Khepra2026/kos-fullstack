import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Alert {
  id: string;
  type: 'bceao' | 'beac' | 'cobac' | 'sgcb' | 'giaba';
  date: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  urgency: 'high' | 'medium' | 'low';
  ref: string;
}

const REGULATORY_ALERTS: Alert[] = [
  {
    id: 'bceao-monnaie-elec-2026',
    type: 'bceao',
    date: 'Mai 2026',
    titleFr: 'BCEAO — Monnaie Électronique : Nouvelles exigences de cantonnement',
    titleEn: 'BCEAO — Electronic Money: New ring-fencing requirements',
    descFr: 'Mise à jour de l\'Instruction N°008-05-2015 : renforcement des obligations de cantonnement des fonds des EME et nouvelles exigences de reporting mensuel auprès de la BCEAO.',
    descEn: 'Update to Instruction N°008-05-2015: strengthened ring-fencing obligations for EME funds and new monthly reporting requirements to the BCEAO.',
    urgency: 'high',
    ref: 'Instr. BCEAO N°008-05-2015',
  },
  {
    id: 'cobac-externalisation-2026',
    type: 'cobac',
    date: 'Avr. 2026',
    titleFr: 'COBAC — Externalisation IT : Directives sur les prestataires critiques',
    titleEn: 'COBAC — IT Outsourcing: Guidelines on critical service providers',
    descFr: 'La COBAC publie de nouvelles directives sur l\'externalisation bancaire et les prestataires IT critiques : obligation de cartographie des risques technologiques et de plan de sortie documenté.',
    descEn: 'COBAC publishes new guidelines on banking outsourcing and critical IT providers: mandatory technology risk mapping and documented exit plan.',
    urgency: 'high',
    ref: 'Règl. CEMAC N°04/18',
  },
  {
    id: 'sgcb-basel3-2026',
    type: 'sgcb',
    date: 'Avr. 2026',
    titleFr: 'SG-CB-UMOA — Bâle III : Ratio LCR et reporting prudentiel T2 2026',
    titleEn: 'SG-CB-UMOA — Basel III: LCR ratio and Q2 2026 prudential reporting',
    descFr: 'Le Secrétariat Général de la Commission Bancaire de l\'UMOA rappelle les échéances T2 2026 pour le reporting LCR (Liquidity Coverage Ratio) et les nouvelles exigences de division des risques.',
    descEn: 'The SG-Commission Bancaire de l\'UMOA reminds Q2 2026 deadlines for LCR reporting and new risk division requirements.',
    urgency: 'high',
    ref: 'Bâle III — LCR UEMOA',
  },
  {
    id: 'bceao-kyc-digital-2026',
    type: 'bceao',
    date: 'Mar. 2026',
    titleFr: 'BCEAO — KYC Digital : Cadre d\'onboarding électronique conforme',
    titleEn: 'BCEAO — Digital KYC: Compliant electronic onboarding framework',
    descFr: 'Nouveau cadre BCEAO pour le KYC digital et l\'onboarding électronique des clients : exigences d\'authentification forte (DSP2-like), traçabilité des vérifications et conservation des preuves numériques.',
    descEn: 'New BCEAO framework for digital KYC and electronic customer onboarding: strong authentication requirements (DSP2-like), verification traceability and digital evidence retention.',
    urgency: 'medium',
    ref: 'BCEAO — KYC Digital 2026',
  },
  {
    id: 'beac-pca-2026',
    type: 'beac',
    date: 'Mar. 2026',
    titleFr: 'BEAC — PCA/PCI : Tests annuels obligatoires pour les établissements de crédit',
    titleEn: 'BEAC — BCP/DRP: Mandatory annual testing for credit institutions',
    descFr: 'La BEAC renforce les exigences de Plan de Continuité d\'Activité (PCA) et Plan de Continuité Informatique (PCI) : tests annuels documentés, DRS géographiquement distincts et rapport soumis à la COBAC.',
    descEn: 'BEAC strengthens Business Continuity Plan (BCP) and IT Continuity Plan (ICP) requirements: documented annual tests, geographically distinct DRS and report submitted to COBAC.',
    urgency: 'medium',
    ref: 'BEAC — Directive PCA 2026',
  },
  {
    id: 'giaba-lbcft-2026',
    type: 'giaba',
    date: 'Fév. 2026',
    titleFr: 'GIABA/GABAC — LBC/FT : Mise à jour des recommandations GAFI applicables',
    titleEn: 'GIABA/GABAC — AML/CFT: Update to applicable FATF recommendations',
    descFr: 'Mise à jour des recommandations GAFI appliquées en zones UEMOA et CEMAC : nouvelles exigences de déclarations d\'opérations suspectes (DOS), renforcement du dispositif LBC/FT pour les fintechs et EME.',
    descEn: 'Update to FATF recommendations applied in UEMOA and CEMAC zones: new suspicious transaction reporting requirements, strengthened AML/CFT framework for fintechs and EMEs.',
    urgency: 'medium',
    ref: 'GIABA · GABAC — GAFI 2026',
  },
];

const TYPE_CONFIG = {
  bceao: { label: 'BCEAO', bg: 'rgba(212,168,42,0.12)', border: 'rgba(212,168,42,0.30)', text: '#86BC25', icon: 'ri-bank-line' },
  beac:  { label: 'BEAC',  bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.28)', text: '#10b981', icon: 'ri-bank-line' },
  cobac: { label: 'COBAC', bg: 'rgba(212,168,42,0.10)', border: 'rgba(212,168,42,0.25)', text: '#86BC25', icon: 'ri-shield-check-line' },
  sgcb:  { label: 'SG-CB-UMOA', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)', text: '#10b981', icon: 'ri-government-line' },
  giaba: { label: 'GIABA/GABAC', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.70)', icon: 'ri-eye-line' },
};

const URGENCY_CONFIG = {
  high:   { labelFr: 'Prioritaire', labelEn: 'Priority',   dot: '#ef4444' },
  medium: { labelFr: 'Important',   labelEn: 'Important',  dot: '#f59e0b' },
  low:    { labelFr: 'Informatif',  labelEn: 'Informative', dot: '#10b981' },
};

type FilterType = 'all' | 'bceao' | 'beac' | 'cobac' | 'sgcb' | 'giaba';

export default function VeilleReglementaire() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered = activeFilter === 'all' ? REGULATORY_ALERTS : REGULATORY_ALERTS.filter(a => a.type === activeFilter);

  const FILTERS: { id: FilterType; label: string }[] = [
    { id: 'all',   label: isEn ? 'All' : 'Tout' },
    { id: 'bceao', label: 'BCEAO' },
    { id: 'sgcb',  label: 'SG-CB-UMOA' },
    { id: 'beac',  label: 'BEAC' },
    { id: 'cobac', label: 'COBAC' },
    { id: 'giaba', label: 'GIABA/GABAC' },
  ];

  return (
    <section
      id="veille-reglementaire"
      className="py-20 sm:py-24"
      style={{ background: 'linear-gradient(135deg, #050c18 0%, #091528 60%, #0d1c36 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#10b981' }}>
                {isEn ? 'Regulatory Watch · Real-time' : 'Veille Réglementaire · Temps réel'}
              </span>
            </div>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight mb-3"
            >
              {isEn ? (
                <>BCEAO · BEAC · COBAC · <span style={{ color: '#86BC25' }}>SG-CB-UMOA</span></>
              ) : (
                <>BCEAO · BEAC · COBAC · <span style={{ color: '#86BC25' }}>SG-CB-UMOA</span></>
              )}
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {isEn
                ? 'Real-time monitoring of regulatory and prudential circulars from the BCEAO, SG-Commission Bancaire de l\'UMOA, BEAC, COBAC, GIABA and GABAC applicable to financial institutions in UEMOA and CEMAC zones.'
                : 'Suivi en temps réel des circulaires réglementaires et prudentielles de la BCEAO, du SG-Commission Bancaire de l\'UMOA, de la BEAC, de la COBAC, du GIABA et du GABAC applicables aux institutions financières en zones UEMOA et CEMAC.'}
            </p>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {[
              { n: '6', labelFr: 'alertes actives', labelEn: 'active alerts', c: '#86BC25' },
              { n: '4', labelFr: 'prioritaires', labelEn: 'priority', c: '#ef4444' },
              { n: '2', labelFr: 'zones couvertes', labelEn: 'zones covered', c: '#10b981' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-playfair text-2xl font-bold" style={{ color: s.c }}>{s.n}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{isEn ? s.labelEn : s.labelFr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 whitespace-nowrap"
              style={{
                background: activeFilter === f.id ? '#86BC25' : 'rgba(255,255,255,0.06)',
                color: activeFilter === f.id ? '#050c18' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${activeFilter === f.id ? '#86BC25' : 'rgba(255,255,255,0.10)'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Alert grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
          {filtered.map(alert => {
            const tc = TYPE_CONFIG[alert.type];
            const uc = URGENCY_CONFIG[alert.urgency];
            return (
              <div
                key={alert.id}
                className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)` }}
              >
                {/* Type + urgency header */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                  >
                    <i className={`${tc.icon} mr-1.5`} />
                    {tc.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: uc.dot }} />
                    <span className="text-xs font-semibold" style={{ color: uc.dot }}>
                      {isEn ? uc.labelEn : uc.labelFr}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{alert.date}</p>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug">
                  {isEn ? alert.titleEn : alert.titleFr}
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {isEn ? alert.descEn : alert.descFr}
                </p>

                {/* Reference */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-mono font-semibold" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    {alert.ref}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#86BC25' }}>
                    {isEn ? 'Action required →' : 'Action requise →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: 'rgba(212,168,42,0.07)', border: '1px solid rgba(212,168,42,0.18)' }}
        >
          <div>
            <p className="text-sm font-bold text-white mb-1">
              {isEn
                ? 'Receive compliance alerts directly in your inbox'
                : 'Recevez les alertes conformité directement dans votre boîte mail'}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>
              {isEn
                ? 'Our experts monitor and synthesize every regulatory update from BCEAO, BEAC, COBAC and SG-CB-UMOA.'
                : 'Nos experts veillent et synthétisent chaque mise à jour réglementaire de la BCEAO, BEAC, COBAC et SG-CB-UMOA.'}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18' }}
            >
              <i className="ri-mail-send-line" />
              {isEn ? 'Subscribe to watch' : "S'abonner à la veille"}
            </a>
            <a
              href="/tools/evaluation-conformite-reglementaire/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-xs cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
              style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#86BC25', background: 'transparent' }}
            >
              {isEn ? 'Compliance assessment' : 'Évaluation conformité'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



