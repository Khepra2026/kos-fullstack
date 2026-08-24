import { useNavigate } from 'react-router-dom';

const ESG_PILLARS = [
  {
    letter: 'E',
    label: 'Environnemental',
    icon: 'ri-leaf-line',
    accent: '#86BC25',
    title: 'Conseil à impact environnemental positif',
    desc: 'Nous intégrons les critères environnementaux dans chaque diagnostic stratégique : empreinte carbone des opérations, efficience énergétique, gestion des ressources naturelles. Nos recommandations visent une performance durable — pas seulement immédiate.',
    points: [
      'Intégration des critères environnementaux dans les plans stratégiques',
      'Accompagnement des institutions de microfinance vers le financement vert',
      'Évaluation de l\'impact environnemental des projets financés',
      'Alignement avec les ODD (Objectifs de Développement Durable)',
    ],
  },
  {
    letter: 'S',
    label: 'Social',
    icon: 'ri-community-line',
    accent: '#86BC25',
    title: 'Inclusion financière & impact social mesurable',
    desc: 'L\'inclusion financière est au cœur de notre ADN. Nous avons co-rédigé la Stratégie Nationale d\'Inclusion Financière du Togo (SNIF). Chaque mission est évaluée à l\'aune de son impact sur les populations les plus vulnérables.',
    points: [
      'Co-rédaction de la SNIF Togo — inclusion financière des femmes et ruraux',
      'Accompagnement de 80+ SFD au service des populations non bancarisées',
      'Intégration des indicateurs d\'impact social dans les tableaux de bord',
      'Gouvernance participative et équitable des institutions accompagnées',
    ],
  },
  {
    letter: 'G',
    label: 'Gouvernance',
    icon: 'ri-scales-line',
    accent: '#86BC25',
    title: 'Gouvernance éthique, transparente & déontologique',
    desc: 'La gouvernance n\'est pas un exercice de conformité — c\'est un engagement éthique. Nous structurons des Conseils d\'Administration qui rendent des comptes, des processus décisionnels transparents et des mécanismes de contrôle indépendants.',
    points: [
      'Chartes de gouvernance avec principes éthiques explicites',
      'Comités d\'audit et de conformité indépendants',
      'Politiques anti-corruption et de gestion des conflits d\'intérêts',
      'Reporting ESG intégré aux rapports de Conseil d\'Administration',
    ],
  },
];

const ETHICS_COMMITMENTS = [
  {
    icon: 'ri-shield-star-line',
    title: 'Confidentialité absolue',
    desc: 'Chaque mission est protégée par un accord de confidentialité strict. Vos données stratégiques, financières et organisationnelles ne quittent jamais le périmètre de la mission.',
    accent: '#86BC25',
  },
  {
    icon: 'ri-hand-heart-line',
    title: 'Indépendance & objectivité',
    desc: 'Nous n\'avons aucun intérêt financier dans les décisions que nous recommandons. Notre seul alignement est avec les résultats de nos clients — pas avec des commissions ou des partenariats commerciaux cachés.',
    accent: '#86BC25',
  },
  {
    icon: 'ri-eye-line',
    title: 'Transparence des honoraires',
    desc: 'Nos honoraires sont définis en amont, par écrit, sans surprise. Nous pratiquons une tarification claire, proportionnelle à la valeur créée — jamais opaque.',
    accent: '#86BC25',
  },
  {
    icon: 'ri-user-follow-line',
    title: 'Transfert de compétences',
    desc: 'Nous ne créons pas de dépendance. Chaque mission inclut un volet de renforcement des capacités internes — pour que vos équipes soient autonomes à l\'issue de notre intervention.',
    accent: '#86BC25',
  },
];

const ODD_ALIGNMENT = [
  { num: '1', label: 'Pas de pauvreté', icon: 'ri-hand-coin-line', color: '#e5243b' },
  { num: '5', label: 'Égalité des sexes', icon: 'ri-women-line', color: '#ff3a21' },
  { num: '8', label: 'Travail décent', icon: 'ri-briefcase-line', color: '#a21942' },
  { num: '10', label: 'Inégalités réduites', icon: 'ri-scales-line', color: '#dd1367' },
  { num: '16', label: 'Paix & Justice', icon: 'ri-government-line', color: '#00689d' },
  { num: '17', label: 'Partenariats', icon: 'ri-global-line', color: '#19486a' },
];

export default function AboutESG() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white" id="esg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Engagement ESG & Éthique</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 leading-tight max-w-2xl">
              La performance durable<br />
              <span style={{ background: 'linear-gradient(90deg, #86BC25, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                commence par une gouvernance éthique.
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              ESG, déontologie et développement durable ne sont pas des options — ils sont intégrés dans chacune de nos interventions.
            </p>
          </div>
        </div>

        {/* ── ESG Pillars ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {ESG_PILLARS.map((pillar, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all overflow-hidden group">
              {/* Header band */}
              <div className="px-6 pt-6 pb-4 flex items-center gap-4" style={{ borderBottom: `2px solid ${pillar.accent}20` }}>
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 font-playfair text-2xl font-black"
                  style={{ background: `${pillar.accent}12`, color: pillar.accent, border: `1px solid ${pillar.accent}25` }}
                >
                  {pillar.letter}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: pillar.accent }}>{pillar.label}</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2" title={pillar.title}>{pillar.title}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{pillar.desc}</p>
                <ul className="space-y-2.5">
                  {pillar.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: `${pillar.accent}15` }}>
                        <i className="ri-check-line text-xs" style={{ color: pillar.accent }} />
                      </div>
                      <span className="text-xs text-gray-600 leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── Engagements éthiques — dark block ── */}
        <div className="rounded-3xl p-10 md:p-14 mb-16 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
          <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(34,160,90,0.07) 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(201,162,39,0.05) 0%, transparent 60%)' }} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#86BC25' }}>Notre charte déontologique</span>
            </div>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
              4 engagements non négociables<br />
              <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                envers chaque client.
              </span>
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {ETHICS_COMMITMENTS.map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.accent}18` }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${c.accent}15`, border: `1px solid ${c.accent}25` }}>
                    <i className={`${c.icon} text-lg`} style={{ color: c.accent }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1.5 line-clamp-2" title={c.title}>{c.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alignement ODD ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Alignement ODD · Agenda 2030</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 leading-tight">
                Nos missions contribuent directement<br />aux Objectifs de Développement Durable.
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Chaque intervention de KHEPRA EXPERTS est conçue pour générer un impact positif mesurable — sur les organisations, sur les individus et sur les territoires. Nous rapportons cet impact dans nos livrables.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 flex-shrink-0">
              {ODD_ALIGNMENT.map((odd, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: `${odd.color}15` }}>
                    <i className={`${odd.icon} text-lg`} style={{ color: odd.color }} />
                  </div>
                  <span className="font-playfair text-lg font-black text-gray-900">{odd.num}</span>
                  <span className="text-xs text-gray-400 text-center leading-tight">{odd.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ESG ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-gray-100 bg-gray-50/60">
          <div>
            <p className="font-bold text-gray-900 text-base mb-1">
              Votre organisation est-elle prête pour un audit ESG ?
            </p>
            <p className="text-sm text-gray-500">
              Nous évaluons votre maturité ESG et vous proposons une feuille de route concrète.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => navigate('/tools/evaluation-gouvernance')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #34d399)', color: '#fff' }}
            >
              <i className="ri-leaf-line" />
              Évaluer ma gouvernance ESG
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all border border-gray-200 hover:border-gray-300 text-gray-700"
            >
              Parler à un expert
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}




