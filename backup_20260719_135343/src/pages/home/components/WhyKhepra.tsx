import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';

const WHY_ITEMS_FR = [
  {
    icon: 'ri-map-2-line',
    title: '22 ans sur le terrain en Afrique de l\'Ouest',
    description: 'Depuis 2002, nos experts travaillent directement avec les institutions financières, PME et programmes de développement au Togo, Bénin, Côte d\'Ivoire, Sénégal, Burkina Faso, Cameroun et dans 16 autres pays africains. Pas de conseil depuis Paris — nous sommes ici.',
    metric: '20+ pays',
    metricLabel: 'présence directe',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Expertise réglementaire BCEAO/COBAC certifiée',
    description: 'Nous maîtrisons le cadre réglementaire UEMOA et CEMAC dans sa totalité : ratios Bâle III, Instructions BCEAO, Règlements COBAC, conformité SFD/EMF, LBC/FT, systèmes de paiement. Nos diagnostics de conformité sont reconnus par les régulateurs.',
    metric: '600+',
    metricLabel: 'missions accomplies',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  {
    icon: 'ri-building-4-line',
    title: 'Résultats mesurables, pas de consultants fantômes',
    description: 'Chaque mission livre un plan d\'action chiffré, des indicateurs de suivi et un accompagnement terrain. Nos clients de Lomé à Douala obtiennent des agréments BCEAO validés, des ratios Bâle III redressés et des organisations transformées — en 90 à 180 jours.',
    metric: '100%',
    metricLabel: 'dossiers instruits',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-team-line',
    title: 'Équipe senior 100% africaine, ancrée localement',
    description: 'Notre fondateur SIMDA Essoyomèwè et notre équipe sont basés à Lomé, Togo. Nous comprenons les réalités locales : gouvernance des conseils d\'administration, culture organisationnelle, contraintes réglementaires spécifiques à chaque pays membre UEMOA/CEMAC.',
    metric: 'Lomé',
    metricLabel: 'siège Togo — UEMOA',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'PME : de la stratégie au financement en 6 mois',
    description: 'Pour les PME d\'Afrique de l\'Ouest, nous intervenons sur la structuration juridique OHADA, le modèle financier, la gouvernance et la levée de fonds. Nos clients ont levé plus de 120M USD via BOAD, IFC et fonds privés africains.',
    metric: '120M+',
    metricLabel: 'USD levés par nos clients',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-award-line',
    title: 'Reconnus par les institutions internationales',
    description: 'Nous travaillons en partenariat avec les programmes IFC, BAD, PNUD et BCEAO. Notre méthode de diagnostic organisationnel est alignée sur les standards IFC Performance Standards et les exigences ESG des bailleurs internationaux actifs en Afrique de l\'Ouest.',
    metric: 'IFC · BAD · PNUD',
    metricLabel: 'partenaires institutionnels',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
];

const WHY_ITEMS_EN = [
  {
    icon: 'ri-map-2-line',
    title: '22 years in the field across West Africa',
    description: 'Since 2002, our experts work directly with financial institutions, SMEs and development programs in Togo, Benin, Côte d\'Ivoire, Senegal, Burkina Faso, Cameroon and 16 other African countries. No remote consulting from Paris — we are here.',
    metric: '20+ countries',
    metricLabel: 'direct presence',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Certified BCEAO/COBAC regulatory expertise',
    description: 'We master the UEMOA and CEMAC regulatory framework in its entirety: Basel III ratios, BCEAO Instructions, COBAC Regulations, SFD/EMF compliance, AML/CFT, payment systems. Our compliance diagnostics are recognized by regulators.',
    metric: '600+',
    metricLabel: 'missions completed',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  {
    icon: 'ri-building-4-line',
    title: 'Measurable results, no ghost consultants',
    description: 'Every mission delivers a quantified action plan, monitoring indicators and field support. Our clients from Lomé to Douala obtain validated BCEAO licenses, corrected Basel III ratios and transformed organizations — within 90 to 180 days.',
    metric: '100%',
    metricLabel: 'files processed',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-team-line',
    title: '100% African senior team, locally anchored',
    description: 'Our founder SIMDA Essoyomèwè and our team are based in Lomé, Togo. We understand local realities: board governance, organizational culture, regulatory constraints specific to each UEMOA/CEMAC member country.',
    metric: 'Lomé',
    metricLabel: 'HQ Togo — UEMOA',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'SMEs: from strategy to funding in 6 months',
    description: 'For West African SMEs, we intervene on OHADA legal structuring, financial modeling, governance and fundraising. Our clients have raised more than $120M through BOAD, IFC and African private funds.',
    metric: '$120M+',
    metricLabel: 'raised by our clients',
    color: '#86BC25',
    bgColor: 'rgba(212,168,42,0.08)',
    borderColor: 'rgba(212,168,42,0.2)',
  },
  {
    icon: 'ri-award-line',
    title: 'Recognized by international institutions',
    description: 'We work in partnership with IFC, AfDB, UNDP and BCEAO programs. Our organizational diagnostic method is aligned with IFC Performance Standards and ESG requirements of international funders active in West Africa.',
    metric: 'IFC · AfDB · UNDP',
    metricLabel: 'institutional partners',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
];

const PROOF_POINTS_FR = [
  { text: '22 ans d\'expérience en Afrique de l\'Ouest', icon: 'ri-time-line' },
  { text: 'Basés à Lomé, Togo — pas offshore', icon: 'ri-map-pin-line' },
  { text: '600+ organisations accompagnées', icon: 'ri-organization-chart' },
  { text: 'Lun–Ven 08:00–18:00, tél. +228 93 98 49 09', icon: 'ri-phone-line' },
  { text: 'Conformité BCEAO/COBAC/OHADA certifiée', icon: 'ri-verified-badge-line' },
  { text: 'Dossiers validés sans observation', icon: 'ri-checkbox-circle-line' },
];

const PROOF_POINTS_EN = [
  { text: '22 years of experience in West Africa', icon: 'ri-time-line' },
  { text: 'Based in Lomé, Togo — not offshore', icon: 'ri-map-pin-line' },
  { text: '600+ organizations supported', icon: 'ri-organization-chart' },
  { text: 'Mon–Fri 08:00–18:00, tel. +228 93 98 49 09', icon: 'ri-phone-line' },
  { text: 'BCEAO/COBAC/OHADA compliance certified', icon: 'ri-verified-badge-line' },
  { text: 'Files validated without observation', icon: 'ri-checkbox-circle-line' },
];

export default function WhyKhepra() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language.startsWith('en');

  const items = isEn ? WHY_ITEMS_EN : WHY_ITEMS_FR;
  const proofPoints = isEn ? PROOF_POINTS_EN : PROOF_POINTS_FR;

  return (
    <section
      id="pourquoi-nous-choisir"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #f9f7f2 0%, #ffffff 100%)' }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-verified-badge-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6B9B1F' }}>
              {isEn ? 'Our expertise · Lomé, Togo' : 'Notre expertise · Lomé, Togo'}
            </span>
          </div>
          <h2
            id="why-heading"
            className="font-playfair font-bold text-gray-900 mb-5"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            {isEn
              ? 'Why choose Khepra Experts?'
              : 'Pourquoi choisir Khepra Experts ?'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            {isEn
              ? '22 years of direct experience in West and Central Africa. Not a generic consulting firm — a team born from the field, for the field.'
              : '22 ans d\'expérience directe en Afrique de l\'Ouest et Centrale. Pas un cabinet généraliste — une équipe née du terrain, pour le terrain.'}
          </p>
        </div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group gradient-border glow-gold-hover"
              style={{ background: item.bgColor }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: item.color + '18', border: `1.5px solid ${item.color}30` }}>
                  <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-xl font-black leading-none" style={{ color: item.color }}>
                    {item.metric}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.metricLabel}</div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug group-hover:text-gray-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Bottom proof bar */}
        <div
          className="rounded-2xl p-8 md:p-10 gradient-border-dark glow-gold-hover"
          style={{ background: 'linear-gradient(135deg, #050c18 0%, #0d1c36 100%)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-playfair text-xl font-bold text-white mb-3">
                {isEn
                  ? 'Khepra Experts in Lomé — the reference for SMEs and financial institutions'
                  : 'Khepra Experts à Lomé — la référence pour les PME et institutions financières'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                {isEn
                  ? 'Our office is open Monday to Friday from 08:00 to 18:00. Call us directly at +228 93 98 49 09 or send us an email. Our experts respond within 24 business hours.'
                  : 'Notre bureau est ouvert du lundi au vendredi de 08h00 à 18h00. Appelez-nous directement au +228 93 98 49 09 ou envoyez un email. Nos experts répondent en moins de 24h ouvrées.'}
              </p>
              <div className="flex flex-wrap gap-4 mt-5">
                {proofPoints.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className={`${p.icon} text-sm`} style={{ color: '#86BC25' }} />
                    </div>
                    <span className="text-xs text-gray-300 font-medium">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href="tel:+22893984909"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 no-underline"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18' }}
                aria-label="Appeler Khepra Experts Lomé Togo"
              >
                <i className="ri-phone-line text-lg" />
                +228 93 98 49 09
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/15"
                style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.07)' }}
              >
                <i className="ri-mail-send-line" />
                {isEn ? 'Send a message' : 'Envoyer un message'}
              </button>
              <BrochureDownloadButton
                variant="secondary"
                size="md"
                lang={isEn ? 'en' : undefined}
                source="why_khepra_cta"
              >
                <i className="ri-file-download-line" />
                {isEn ? 'Download brochure' : 'Télécharger la brochure'}
              </BrochureDownloadButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



