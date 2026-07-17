/* ============================================================
   KOS — Section Ressources Stratégiques Homepage
   Entre UltraLeadMagnets et PourquoiNousFaireConfiance
   Mise en avant des 4 nouvelles pages publiques
   ============================================================ */

import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import ComplianceScorePreloader from '@/components/feature/ComplianceScorePreloader';

const RESSOURCES = [
  {
    id: 'observatoire',
    badge: 'Veille Réglementaire',
    badgeColor: '#0D7B5F',
    title: 'Observatoire Réglementaire Africain',
    subtitle: 'BCEAO · COBAC · CIMA · COSUMAF · AMF-UEMOA · GAFI',
    desc: "Surveillance en temps réel de 8 régulateurs panafricains. 1 247 textes suivis, alertes mensuelles, baromètres UEMOA/CEMAC et analyses d'impact conformité. Indispensable pour les institutions financières en Afrique francophone.",
    href: '/observatoire-reglementaire-africain/',
    icon: 'ri-radar-line',
    imgSrc: 'https://readdy.ai/api/search-image?query=Sophisticated%20African%20regulatory%20intelligence%20observatory%20room%20with%20soft%20emerald%20ambient%20lighting%2C%20holographic%20continental%20Africa%20map%20with%20glowing%20data%20streams%20in%20warm%20teal%20and%20copper%20tones%2C%20clean%20minimalist%20institutional%20atmosphere%20with%20warm%20natural%20daylight%2C%20premium%20architectural%20glass%20elements%2C%20editorial%20documentary%20photography%20style%2C%20high-end%20consulting%20firm%20aesthetic&width=640&height=380&seq=ress-observatoire-2026&orientation=landscape',
    stats: [
      { value: '1 247', label: 'Textes suivis' },
      { value: '8', label: 'Régulateurs' },
      { value: '43', label: 'Alertes/mois' },
    ],
    accent: '#0D7B5F',
    ctaLabel: 'Explorer l\'Observatoire',
  },
  {
    id: 'agrements',
    badge: 'Guides Pratiques',
    badgeColor: '#D4AF37',
    title: 'Hub Agréments Afrique',
    subtitle: 'Banques · EMF/SFD · FinTech · PSP · Assurance · Marchés',
    desc: "Guides complets pour 6 types d'agrément en zone UEMOA et CEMAC. Checklists exhaustives, FAQ experts, simulateurs de délais, 5 étapes détaillées et 3 études de cas réels. Taux de réussite accompagnée : 94%.",
    href: '/agrements-afrique/',
    icon: 'ri-award-line',
    imgSrc: 'https://readdy.ai/api/search-image?query=Prestigious%20African%20institutional%20licensing%20ceremony%20context%20with%20warm%20copper%20brass%20and%20deep%20emerald%20architectural%20details%2C%20official%20regulatory%20approval%20documents%20and%20formal%20certification%20aesthetic%2C%20warm%20natural%20daylight%20through%20tall%20windows%2C%20institutional%20authority%20and%20trust%20visual%20metaphor%2C%20premium%20clean%20minimalist%20luxury%20atmosphere%2C%20editorial%20architectural%20photography&width=640&height=380&seq=ress-agrements-2026&orientation=landscape',
    stats: [
      { value: '6', label: "Types d'agrément" },
      { value: '94%', label: 'Taux de réussite' },
      { value: '47', label: 'Agréments obtenus' },
    ],
    accent: '#D4AF37',
    ctaLabel: 'Accéder au Hub',
  },
  {
    id: 'compliance-factory',
    badge: 'Bibliothèque Documentaire',
    badgeColor: '#6B9B1F',
    title: 'Digital Compliance Factory™',
    subtitle: 'Politiques · Procédures · Matrices · Rapports',
    desc: "78 documents de conformité prêts à l'emploi : politiques LBC/FT, procédures bancaires, cartographies des risques, matrices de contrôle interne, plans d'audit et rapports réglementaires. Standards BCEAO, COBAC, GAFI, OHADA, ISO 31000, COSO 2013.",
    href: '/digital-compliance-factory/',
    icon: 'ri-file-list-3-line',
    imgSrc: 'https://readdy.ai/api/search-image?query=Industrial%20automated%20document%20production%20factory%20with%20warm%20copper%20and%20emerald%20tones%2C%20precision%20organized%20compliance%20document%20library%20shelves%2C%20soft%20warm%20industrial%20daylight%2C%20institutional%20Big%20Four%20consulting%20grade%20visual%2C%20structured%20document%20conveyor%20aesthetic%20with%20brass%20metallic%20accents%2C%20clean%20editorial%20architectural%20photography%20style&width=640&height=380&seq=ress-compliance-factory-2026&orientation=landscape',
    stats: [
      { value: '78', label: 'Documents' },
      { value: '6', label: 'Catégories' },
      { value: '127+', label: 'Institutions' },
    ],
    accent: '#6B9B1F',
    ctaLabel: 'Explorer la Bibliothèque',
  },
  {
    id: 'compliance-score',
    badge: 'Diagnostic Gratuit',
    badgeColor: '#86BC25',
    title: 'KHEPRA Compliance Score™',
    subtitle: 'Gouvernance · LBC/FT · Prudentiel · Risques · Digital · ESG',
    desc: "Évaluez la maturité réglementaire de votre institution en 8 minutes. Diagnostic gratuit sur 6 domaines (24 questions), scoring automatisé, rapport PDF personnalisé avec plan d'action priorisé et benchmark sectoriel.",
    href: '/compliance-score/',
    icon: 'ri-bar-chart-2-line',
    imgSrc: 'https://readdy.ai/api/search-image?query=Modern%20regulatory%20compliance%20assessment%20dashboard%20interface%20scene%2C%20professional%20corporate%20office%20with%20subtle%20green%20accent%20lighting%2C%20abstract%20compliance%20scoring%20data%20visualization%20in%20warm%20amber%20and%20teal%20tones%2C%20clean%20minimal%20professional%20aesthetic%20with%20warm%20natural%20daylight%20through%20large%20windows%2C%20high-end%20consulting%20firm%20atmosphere%2C%20editorial%20photography%20style&width=640&height=380&seq=ress-compliance-score-2026&orientation=landscape',
    stats: [
      { value: '8 min', label: 'Diagnostic' },
      { value: '6', label: 'Domaines' },
      { value: '100%', label: 'Gratuit' },
    ],
    accent: '#86BC25',
    ctaLabel: 'Tester ma conformité',
  },
];

export default function HomeRessourcesStrategiques() {
  const navigate = useNavigate();

  return (
    <section
      id="ressources-strategiques"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafaf8 50%, #f5f4f0 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── HEADER ─── */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label="Ressources Stratégiques"
                variant="left-accent"
                icon="ri-building-2-line"
                accentColor="accent"
              />
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground-950 leading-tight mb-5"
              style={{ fontFamily: 'var(--font-heading), Georgia, serif', letterSpacing: '-0.02em' }}
            >
              4 dispositifs institutionnels<br />
              <span style={{ color: '#86BC25' }}>à votre service</span>
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto text-base leading-relaxed">
              Observatoire réglementaire, guides d'agréments, bibliothèque documentaire et diagnostic de maturité — quatre ressources gratuites pour transformer la conformité en avantage compétitif.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── GRID 2+2 ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {RESSOURCES.map((item, idx) => {
            const card = (
              <article
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
                onClick={() => navigate(item.href)}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    width={640}
                    height={220}
                    loading="lazy"
                  />
                  {/* Overlay subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                      style={{ background: `${item.badgeColor}dd` }}
                    >
                      <i className={`${item.icon} text-[10px]`} />
                      {item.badge}
                    </span>
                  </div>

                  {/* Stats en bas de l'image */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center gap-4">
                    {item.stats.map((stat, si) => (
                      <div key={si} className="text-center">
                        <div className="text-base font-bold text-white leading-none">{stat.value}</div>
                        <div className="text-[10px] text-white/70 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Subtitle */}
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: item.accent }}>
                    {item.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground-950 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-sm text-foreground-600 leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
                      style={{ color: item.accent }}
                    >
                      {item.ctaLabel}
                      <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                    </span>
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-full transition-all group-hover:scale-110"
                      style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}25` }}
                    >
                      <i className={`${item.icon} text-base`} style={{ color: item.accent }} />
                    </div>
                  </div>
                </div>
              </article>
            );

            if (item.id === 'compliance-score') {
              return (
                <ScrollReveal key={item.id} delay={idx * 80}>
                  <ComplianceScorePreloader>
                    {card}
                  </ComplianceScorePreloader>
                </ScrollReveal>
              );
            }

            return (
              <ScrollReveal key={item.id} delay={idx * 80}>
                {card}
              </ScrollReveal>
            );
          })}
        </div>

        {/* ─── BOTTOM CTA STRIP ─── */}
        <ScrollReveal delay={300}>
          <div
            className="mt-14 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            style={{ background: 'linear-gradient(135deg, #f9f6ee 0%, #fdf9f0 100%)', border: '1px solid rgba(196,162,53,0.22)' }}
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-foreground-950 mb-1">
                Besoin d'un accompagnement personnalisé ?
              </h3>
              <p className="text-sm text-foreground-600">
                Diagnostic flash gratuit de 30 minutes avec un expert KHEPRA. Analyse de votre situation, identification des gaps et feuille de route sur mesure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => navigate('/diagnostic-flash/')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a', boxShadow: '0 6px 24px rgba(134,188,37,0.3)' }}
              >
                <i className="ri-flashlight-line" />
                Diagnostic Flash — Gratuit
              </button>
              <button
                onClick={() => navigate('/observatoire-reglementaire-africain/')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'transparent', border: '1.5px solid rgba(134,188,37,0.4)', color: '#6B9B1F' }}
              >
                <i className="ri-radar-line" />
                Voir l'Observatoire
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}