import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const EXPERTISES_FR = [
  {
    icon: 'ri-government-line',
    tag: 'Gouvernance',
    title: "Votre CA devient un actif stratégique",
    desc: "Chartes, comités, conformité OHADA, reporting. Un Conseil d'Administration structuré multiplie par 3 vos chances d'accès au financement.",
    kpi: '90 jours pour un CA opérationnel',
    href: '/tools/evaluation-gouvernance',
    cta: 'Tester ma gouvernance',
    accent: '#86BC25',
  },
  {
    icon: 'ri-funds-line',
    tag: 'Finance',
    title: 'Chaque mois sans pilotage coûte 3 à 8 pts de marge',
    desc: 'DAF externalisée, contrôle interne, BFR optimisé, reporting BCEAO/BEAC. Les résultats arrivent dès le 3e mois.',
    kpi: '+3 à 8 pts de marge nette',
    href: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
    cta: 'Calculer mon manque à gagner',
    accent: '#86BC25',
  },
  {
    icon: 'ri-map-2-line',
    tag: 'Stratégie',
    title: 'Une stratégie sans exécution est un document',
    desc: 'Plans 3–5 ans, diagnostic organisationnel, gestion de projets complexes. Nous ne rédigeons pas des rapports — nous déployons des transformations.',
    kpi: '+25 à 40% de croissance observée',
    href: '/services/conseil-strategique',
    cta: 'Voir notre approche',
    accent: '#86BC25',
  },
  {
    icon: 'ri-leaf-line',
    tag: 'ESG & Éthique',
    title: 'Performance durable : ESG intégré à chaque mission',
    desc: 'Gouvernance éthique, inclusion financière, impact social mesurable. Nos interventions sont alignées sur les ODD et les standards ESG internationaux — sans compromis déontologique.',
    kpi: 'Alignement ODD · Déontologie stricte',
    href: '/about#esg',
    cta: 'Notre engagement ESG',
    accent: '#86BC25',
  },
];

const EXPERTISES_EN = [
  {
    icon: 'ri-government-line',
    tag: 'Governance',
    title: 'Your Board becomes a strategic asset',
    desc: 'Charters, committees, OHADA compliance, reporting. A structured Board multiplies your access to financing by 3.',
    kpi: '90 days to a fully operational Board',
    href: '/tools/evaluation-gouvernance',
    cta: 'Test my governance',
    accent: '#86BC25',
  },
  {
    icon: 'ri-funds-line',
    tag: 'Finance',
    title: 'Every month without steering costs 3–8 margin points',
    desc: 'Outsourced CFO, internal control, optimized WCR, BCEAO/BEAC reporting. Results arrive from the 3rd month.',
    kpi: '+3 to 8 pts net margin',
    href: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
    cta: 'Calculate my shortfall',
    accent: '#86BC25',
  },
  {
    icon: 'ri-map-2-line',
    tag: 'Strategy',
    title: 'A strategy without execution is just a document',
    desc: '3–5 year plans, organizational diagnosis, complex project management. We don\'t write reports — we deploy transformations.',
    kpi: '+25 to 40% observed growth',
    href: '/services/conseil-strategique',
    cta: 'See our approach',
    accent: '#86BC25',
  },
  {
    icon: 'ri-leaf-line',
    tag: 'ESG & Ethics',
    title: 'Sustainable performance: ESG integrated into every mission',
    desc: 'Ethical governance, financial inclusion, measurable social impact. Our interventions are aligned with SDGs and international ESG standards.',
    kpi: 'SDG alignment · Strict ethics',
    href: '/about#esg',
    cta: 'Our ESG commitment',
    accent: '#86BC25',
  },
];

const RESULTS_FR = [
  { value: '+3–8pts', label: 'de marge nette', accent: '#86BC25' },
  { value: '−45j', label: 'de recouvrement', accent: '#86BC25' },
  { value: '×3', label: 'accès financement', accent: '#86BC25' },
  { value: '100%', label: 'conformité BCEAO/BEAC', accent: '#86BC25' },
  { value: '+40%', label: 'vitesse décisionnelle', accent: '#86BC25' },
  { value: '6 ODD', label: 'alignement développement durable', accent: '#86BC25' },
  { value: '90j', label: 'CA pleinement opérationnel', accent: '#86BC25' },
  { value: '100%', label: 'confidentialité garantie', accent: '#86BC25' },
];

const RESULTS_EN = [
  { value: '+3–8pts', label: 'net margin', accent: '#86BC25' },
  { value: '−45d', label: 'recovery time', accent: '#86BC25' },
  { value: '×3', label: 'financing access', accent: '#86BC25' },
  { value: '100%', label: 'BCEAO/BEAC compliance', accent: '#86BC25' },
  { value: '+40%', label: 'decision speed', accent: '#86BC25' },
  { value: '6 SDGs', label: 'sustainable development', accent: '#86BC25' },
  { value: '90d', label: 'Board fully operational', accent: '#86BC25' },
  { value: '100%', label: 'guaranteed confidentiality', accent: '#86BC25' },
];

const SECTORS_FR = [
  { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', count: '80+' },
  { icon: 'ri-building-line', label: 'PME & Startups', count: '200+' },
  { icon: 'ri-heart-line', label: 'ONG', count: '120+' },
  { icon: 'ri-bank-line', label: 'Banques', count: '45+' },
  { icon: 'ri-government-line', label: 'Secteur Public', count: '35+' },
  { icon: 'ri-smartphone-line', label: 'Fintech', count: '60+' },
];

const SECTORS_EN = [
  { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', count: '80+' },
  { icon: 'ri-building-line', label: 'SMEs & Startups', count: '200+' },
  { icon: 'ri-heart-line', label: 'NGOs', count: '120+' },
  { icon: 'ri-bank-line', label: 'Banks', count: '45+' },
  { icon: 'ri-government-line', label: 'Public Sector', count: '35+' },
  { icon: 'ri-smartphone-line', label: 'Fintech', count: '60+' },
];

export default function AboutAuthorityNew() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const EXPERTISES = isEn ? EXPERTISES_EN : EXPERTISES_FR;
  const RESULTS = isEn ? RESULTS_EN : RESULTS_FR;
  const SECTORS = isEn ? SECTORS_EN : SECTORS_FR;

  return (
    <section className="py-24 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {isEn ? 'Our expertise' : 'Nos expertises'}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-playfair text-4xl font-bold text-gray-900 leading-tight max-w-xl">
                {isEn ? (
                  <>Three levers. Results<br />
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #a5d936)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      measurable from the first quarter.
                    </span>
                  </>
                ) : (
                  <>Trois leviers. Des résultats<br />
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #a5d936)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      mesurables dès le premier trimestre.
                    </span>
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                {isEn
                  ? "We don't intervene on everything. We excel in three specific areas — and we prove it with numbers."
                  : "Nous n'intervenons pas sur tout. Nous excellons sur trois domaines précis — et nous le prouvons avec des chiffres."}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Expertise cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {EXPERTISES.map((exp, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group flex flex-col"
                onClick={() => navigate(exp.href)}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25` }}>
                      <i className={`${exp.icon} text-lg`} style={{ color: exp.accent }} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: exp.accent }}>{exp.tag}</span>
                  </div>
                  <i className="ri-arrow-right-up-line text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2" title={exp.title}>{exp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{exp.desc}</p>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                  <i className="ri-check-line text-sm" style={{ color: exp.accent }} />
                  <span className="text-xs font-bold text-gray-700">{exp.kpi}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Results dark strip */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="rounded-3xl overflow-hidden mb-16" style={{ background: '#0a0a0a' }}>
            <div className="px-8 py-10 md:px-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#86BC25' }}>
                    {isEn ? 'Results — founder track record (22 years)' : 'Résultats — parcours du fondateur (22 ans)'}
                  </p>
                  <h3 className="font-playfair text-2xl font-bold text-white">
                    {isEn ? 'What our clients gain' : 'Ce que nos clients gagnent'}
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/case-studies')}
                  className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer whitespace-nowrap transition-all hover:gap-3"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {isEn ? 'View case studies' : 'Voir les études de cas'} <i className="ri-arrow-right-line" />
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {RESULTS.map((r, i) => (
                  <div key={i} className="text-center">
                    <div className="font-playfair text-2xl font-black mb-1" style={{ color: r.accent }}>{r.value}</div>
                    <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Sectors */}
        <ScrollReveal animation="fadeSlideUp" delay={100}>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {isEn ? 'Sectors mastered · Founder track record' : 'Secteurs maîtrisés · Parcours fondateur'}
              </span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {SECTORS.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-gray-200 transition-all">
                  <i className={`${s.icon} text-xl text-gray-400 mb-2 block`} />
                  <div className="font-playfair text-xl font-black text-gray-900 mb-0.5">{s.count}</div>
                  <div className="text-xs text-gray-400 leading-tight line-clamp-2" title={s.label}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fadeSlideUp" delay={150}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-gray-100 bg-white">
            <p className="font-playfair text-lg font-bold text-gray-900 italic max-w-md">
              {isEn
                ? '"The real risk is not hiring a consulting firm. It\'s continuing without one."'
                : '"Le vrai risque, ce n\'est pas de faire appel à un cabinet. C\'est de continuer sans."'}
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => navigate('/tools/diagnostic-organisationnel')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}
              >
                <i className="ri-stethoscope-line" />
                {isEn ? 'Free diagnostic' : 'Diagnostic gratuit'}
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all border border-gray-200 hover:border-gray-300 text-gray-700"
              >
                {isEn ? 'Talk to an expert' : 'Parler à un expert'}
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}




