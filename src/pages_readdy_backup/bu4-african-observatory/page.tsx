/* ============================================================
   KOS BU4 — African Regulatory Observatory™
   Landing Page — L'autorité de référence pour l'Afrique Francophone
   Modèle : 100% contractuel, publications sur contrat institutionnel
   ============================================================ */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const OBSERVATORIES = [
  {
    id: 'cobac',
    icon: 'ri-bank-line',
    name: 'Observatoire COBAC',
    subtitle: 'Régulation Bancaire CEMAC',
    description: 'Suivi des agréments, sanctions, ratios prudentiels, gouvernance et tendances réglementaires dans la zone CEMAC. Cameroun, Gabon, Congo, RCA, Tchad, Guinée Équatoriale.',
    publications: [
      { name: 'Rapport Trimestriel — Conformité Bancaire CEMAC', freq: 'Trimestrielle' },
      { name: 'Rapport Annuel — État de la Régulation CEMAC', freq: 'Annuelle' },
      { name: 'Baromètre — Gouvernance Bancaire CEMAC', freq: 'Semestrielle' },
    ],
    indices: ['KOS COBAC Compliance Index™', 'KOS Banking Governance Score™', 'KOS CEMAC Risk Barometer™'],
    color: '#2d7518',
    zone: 'CEMAC — 6 pays',
  },
  {
    id: 'bceao',
    icon: 'ri-building-2-line',
    name: 'Observatoire BCEAO',
    subtitle: 'Microfinance & Inclusion Financière UEMOA',
    description: 'Suivi des agréments SFD, ratios prudentiels, inclusion financière et digitalisation. Sénégal, Côte d\'Ivoire, Burkina Faso, Mali, Niger, Togo, Bénin, Guinée-Bissau.',
    publications: [
      { name: 'Rapport Trimestriel — Secteur SFD UEMOA', freq: 'Trimestrielle' },
      { name: 'Rapport Annuel — Microfinance en Afrique de l\'Ouest', freq: 'Annuelle' },
      { name: 'Benchmark — Performance SFD par pays', freq: 'Semestrielle' },
    ],
    indices: ['KOS SFD Health Score™', 'KOS Financial Inclusion Index™', 'KOS Digital MFI Readiness™'],
    color: '#5ba832',
    zone: 'UEMOA — 8 pays',
  },
  {
    id: 'fintech',
    icon: 'ri-smartphone-line',
    name: 'Observatoire FinTech',
    subtitle: 'Régulation Innovation Afrique',
    description: 'Suivi des licenses FinTech, bacs à sable réglementaires, open banking et tendances d\'innovation dans les deux zones monétaires.',
    publications: [
      { name: 'Rapport Semestriel — FinTech Regulatory Landscape', freq: 'Semestrielle' },
      { name: 'Rapport Annuel — State of African FinTech Regulation', freq: 'Annuelle' },
    ],
    indices: ['KOS FinTech Regulatory Maturity Index™', 'KOS Open Banking Readiness™'],
    color: '#d4a82a',
    zone: 'UEMOA + CEMAC',
  },
  {
    id: 'governance',
    icon: 'ri-government-line',
    name: 'Observatoire Gouvernance',
    subtitle: 'Standards CA & ESG Institutions Financières',
    description: 'Pratiques de gouvernance dans les institutions financières africaines : composition CA, indépendance, diversité, ESG, conformité circulaires COBAC.',
    publications: [
      { name: 'Rapport Annuel — Gouvernance des Institutions Financières', freq: 'Annuelle' },
      { name: 'Benchmark — Pratiques ESG Secteur Financier', freq: 'Annuelle' },
    ],
    indices: ['KOS Governance Excellence Index™', 'KOS Board Diversity Score™'],
    color: '#378e1d',
    zone: 'UEMOA + CEMAC',
  },
];

const CALENDAR = [
  { quarter: 'T1', month: 'Janvier–Mars', publications: ['Rapport Trimestriel — Conformité Bancaire CEMAC', 'Rapport Trimestriel — Secteur SFD UEMOA'] },
  { quarter: 'T2', month: 'Avril–Juin', publications: ['Baromètre — Gouvernance Bancaire CEMAC', 'Benchmark — Performance SFD par pays', 'Rapport Semestriel — FinTech Regulatory Landscape'] },
  { quarter: 'T3', month: 'Juillet–Septembre', publications: ['Rapport Trimestriel — Conformité Bancaire CEMAC', 'Rapport Trimestriel — Secteur SFD UEMOA'] },
  { quarter: 'T4', month: 'Octobre–Décembre', publications: ['Rapport Annuel — État de la Régulation CEMAC', 'Rapport Annuel — Microfinance en Afrique de l\'Ouest', 'Rapport Annuel — State of African FinTech Regulation', 'Rapport Annuel — Gouvernance des Institutions Financières Africaines'] },
];

const AUDIENCE = [
  { type: 'Banques & Groupes', icon: 'ri-bank-line', desc: 'Banques commerciales CEMAC/UEMOA' },
  { type: 'Investisseurs', icon: 'ri-funds-line', desc: 'PE, VC, DFI, Fonds Souverains' },
  { type: 'Régulateurs', icon: 'ri-government-line', desc: 'Autorités de supervision' },
  { type: 'Cabinets & Avocats', icon: 'ri-briefcase-line', desc: 'Big Four, cabinets d\'avocats' },
  { type: 'Média & Think Tanks', icon: 'ri-newspaper-line', desc: 'Publications financières africaines' },
  { type: 'Académiques', icon: 'ri-graduation-cap-line', desc: 'Universités, centres de recherche' },
];

const ENGAGEMENT_TYPES = [
  { num: '01', title: 'Contrat institutionnel', desc: 'Accès à l\'ensemble des publications annuelles pour votre organisation', icon: 'ri-file-text-line' },
  { num: '02', title: 'Publication à la demande', desc: 'Acquisition ponctuelle d\'un rapport ou benchmark spécifique', icon: 'ri-file-copy-line' },
  { num: '03', title: 'Licence de données', desc: 'Données brutes et indices pour institutions et cabinets de conseil', icon: 'ri-database-2-line' },
  { num: '04', title: 'Co-édition partenariale', desc: 'Rapports co-brandés pour institutions partenaires', icon: 'ri-award-line' },
  { num: '05', title: 'Événements exclusifs', desc: 'Dîners-débats, conférences réservées aux institutions partenaires', icon: 'ri-calendar-event-line' },
];

export default function BU4AfricanObservatoryPage() {
  const navigate = useNavigate();
  const [selectedObs, setSelectedObs] = useState(0);

  return (
    <>
      <SeoHead
        title="BU4 — African Regulatory Observatory | COBAC, BCEAO, FinTech, Gouvernance — KOS Authority"
        description="KOS BU4 est l'observatoire de référence pour la régulation financière en Afrique Francophone. 4 observatoires : COBAC, BCEAO, FinTech, Gouvernance. Indices KOS, benchmarks sectoriels, rapports trimestriels. 17 pays UEMOA/CEMAC. Contrat institutionnel sur devis."
        keywords="observatoire régulation Afrique, COBAC observatory, BCEAO observatory, FinTech Africa regulation, indices réglementaires Afrique Francophone"
        canonicalPath="/bu4-african-observatory/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3ec 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(91,168,50,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(45,117,24,0.12)', border: '1px solid rgba(45,117,24,0.25)' }}>
                <i className="ri-eye-line text-lg" style={{ color: '#2d7518' }} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(45,117,24,0.08)', color: '#2d7518', border: '1px solid rgba(45,117,24,0.18)' }}>BU4 — AFRICAN REGULATORY OBSERVATORY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 max-w-4xl leading-tight">
              L'observatoire de référence de la{' '}
              <span style={{ color: '#2d7518' }}>régulation financière</span>{' '}
              en Afrique Francophone
            </h1>
            <p className="text-xl text-foreground-600 mb-10 max-w-3xl leading-relaxed">
              4 observatoires sectoriels, 16 publications annuelles, 12 indices propriétaires. COBAC, BCEAO, FinTech, Gouvernance — la donnée de référence pour toute décision d'investissement ou de conformité en zone franc. <strong className="text-foreground-900">Accès sur contrat institutionnel.</strong>
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                Demander un accès institutionnel
              </button>
              <button onClick={() => navigate('/observatoire-reglementaire-africain/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#2d7518', borderColor: 'rgba(45,117,24,0.3)', background: 'rgba(45,117,24,0.04)' }}>
                <i className="ri-radar-line" />
                Observatoire Réglementaire Africain — 8 régulateurs
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { value: '4', label: 'Observatoires actifs' },
                { value: '8', label: 'Régulateurs suivis', href: '/observatoire-reglementaire-africain/', linkLabel: 'Hub unifié →' },
                { value: '16', label: 'Publications/an' },
                { value: '12', label: 'Indices KOS™' },
                { value: '17', label: 'Pays UEMOA/CEMAC' },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl p-4 text-center bg-white/60 border border-background-200 ${s.href ? 'cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all' : ''}`} onClick={s.href ? () => navigate(s.href) : undefined}>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#2d7518' }}>{s.value}</div>
                  <div className="text-xs text-foreground-500 font-medium">{s.label}</div>
                  {s.linkLabel && <div className="text-xs font-bold mt-1 text-emerald-600">{s.linkLabel}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4 OBSERVATORIES ── */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="4 Observatoires" variant="left-accent" icon="ri-eye-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Couverture totale de la régulation financière africaine</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATORIES.map((obs, i) => (
                <div key={i} className={`rounded-2xl p-8 bg-white border-2 transition-all cursor-pointer ${selectedObs === i ? 'shadow-lg scale-102' : 'border-background-200 hover:border-background-300'}`} style={selectedObs === i ? { borderColor: obs.color } : {}} onClick={() => setSelectedObs(i)}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${obs.color}15`, border: `1px solid ${obs.color}30` }}>
                      <i className={`${obs.icon} text-xl`} style={{ color: obs.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-display font-bold text-foreground-950 line-clamp-2" title={obs.name}>{obs.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: obs.color }}>{obs.zone}</span>
                      </div>
                      <p className="text-sm text-foreground-600">{obs.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 mb-5 leading-relaxed">{obs.description}</p>
                  <div className="mb-5">
                    <p className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-2">Publications</p>
                    <div className="space-y-2">
                      {obs.publications.map((pub, pi) => (
                        <div key={pi} className="flex items-center justify-between bg-background-50 rounded-lg px-3 py-2">
                          <div className="flex-1 mr-3">
                            <div className="text-xs font-medium text-foreground-950">{pub.name}</div>
                            <div className="text-xs text-foreground-500">{pub.freq}</div>
                          </div>
                          <span className="text-xs font-bold flex-shrink-0" style={{ color: obs.color }}>Sur contrat</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-background-200">
                    <p className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-2">Indices propriétaires</p>
                    <div className="flex flex-wrap gap-1.5">
                      {obs.indices.map((idx, ii) => (
                        <span key={ii} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: `${obs.color}10`, color: obs.color }}>{idx}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALENDAR ── */}
        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Calendrier" variant="left-accent" icon="ri-calendar-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">16 publications sur l'année</h2>
              <p className="text-foreground-600 max-w-xl mx-auto">Cadence trimestrielle garantissant une veille continue et la capacité de prendre des décisions informées à chaque trimestre.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {CALENDAR.map((q, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>{q.quarter}</div>
                    <div>
                      <div className="text-xs font-bold text-foreground-950 line-clamp-1">{q.month}</div>
                      <div className="text-xs text-foreground-500">{q.publications.length} publication{q.publications.length > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {q.publications.map((pub, pi) => (
                      <div key={pi} className="text-xs text-foreground-600 bg-background-50 rounded-lg px-3 py-1.5 leading-snug">{pub}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUDIENCE ── */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Audience" variant="left-accent" icon="ri-user-settings-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Pour qui ?</h2>
              <p className="text-foreground-600 max-w-xl mx-auto">L'Observatory est la référence pour tout acteur de l'écosystème financier africain.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {AUDIENCE.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(45,117,24,0.1)', border: '1px solid rgba(45,117,24,0.2)' }}>
                    <i className={`${s.icon} text-base`} style={{ color: '#2d7518' }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground-950 line-clamp-1" title={s.type}>{s.type}</div>
                    <div className="text-xs text-foreground-500">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODALITÉS D'ACCÈS ── */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Modalités d'Accès" variant="left-accent" icon="ri-key-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Modalités d'accès — Sur contrat institutionnel</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Chaque accès est formalisé par un contrat. Pas d'abonnement en ligne — nos équipes vous accompagnent.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {ENGAGEMENT_TYPES.map((m, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mx-auto mb-3" style={{ background: 'rgba(45,117,24,0.1)', border: '1px solid rgba(45,117,24,0.2)' }}>
                    <i className={`${m.icon} text-base`} style={{ color: '#2d7518' }} />
                  </div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block text-white" style={{ background: '#2d7518' }}>{m.num}</div>
                  <div className="text-sm font-bold text-foreground-950 mb-1">{m.title}</div>
                  <div className="text-xs text-foreground-500">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-eye-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence réglementaire africaine</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Contrat institutionnel, publication à la demande ou partenariat stratégique — notre équipe vous accompagne dans le choix de la modalité d'accès adaptée à vos besoins.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                Demander un accès institutionnel
              </button>
              <button onClick={() => navigate('/kos-africa-observatories/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all">
                <i className="ri-eye-line" />
                Explorer les observatoires
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}



