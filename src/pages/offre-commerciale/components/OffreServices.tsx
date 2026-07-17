import { useState } from 'react';

interface ServiceTier {
  name: string;
  scope: string;
  duration: string;
  price: string;
  highlight: boolean;
}

interface Service {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  sectors: string[];
  deliverables: string[];
  tiers: ServiceTier[];
  color: string;
  buNumber: string;
}

const services: Service[] = [
  {
    icon: 'ri-shield-check-line',
    title: 'Régulation Financière & Conformité',
    subtitle: 'BU1 — Bouclier Réglementaire',
    desc: 'Protection absolue de votre établissement face aux exigences des régulateurs. Méthodologie complète d\'audit à blanc, plan de remédiation et dossier de preuves. Alignement intégral BCEAO, COBAC, BEAC, GABAC, OHADA. La BU prioritaire du cabinet.',
    sectors: ['Banques', 'Assurances', 'SFD / IMF', 'FinTech', 'Institutions financières'],
    deliverables: [
      'Audit à blanc 95+ points de contrôle — simulation inspection réelle',
      'Plan de remédiation priorisé avec échéancier et matrice de criticité',
      'Dossier de preuves réglementaires structuré et opposable',
      'Manuel de conformité et procédures de contrôle interne',
      'Abonnement veille réglementaire KOS — alertes temps réel',
    ],
    tiers: [
      { name: 'Diagnostic', scope: 'Audit éclair conformité 8min — Score /100', duration: 'Gratuit', price: 'Sur devis', highlight: false },
      { name: 'Premium', scope: 'Audit complet + Plan de remédiation + Dossier preuves', duration: '3-6 mois', price: 'Sur devis', highlight: true },
      { name: 'Enterprise', scope: 'Conformité continue KOS + Audit annuel + Hotline régulateur', duration: '12 mois', price: 'Sur devis', highlight: false },
    ],
    color: '#86BC25',
    buNumber: 'BU1',
  },
  {
    icon: 'ri-search-eye-line',
    title: 'Gouvernance & Due Diligence',
    subtitle: 'BU2 — Observatoire de la Gouvernance',
    desc: 'Analyse pluridisciplinaire de la performance des Boards et due diligence pour fusions, acquisitions et investissements. Détection des conflits, évaluation des administrateurs, cartographie des risques de gouvernance. Standards COSO, ISO 37000, OHADA AUSCGIE.',
    sectors: ['Private Equity', 'Fonds d\'investissement', 'Banques d\'affaires', 'Groupes industriels', 'Promoteurs'],
    deliverables: [
      'Audit de gouvernance — performance Board, indépendance, comités spécialisés',
      'Due diligence pré-acquisition — financière, juridique, ESG, gouvernance',
      'Rapport red flags et recommandations de négociation',
      'Politique de gouvernance — charte CA, comités, rémunération, éthique',
      'Due diligence continue — suivi post-acquisition et tableaux de bord',
    ],
    tiers: [
      { name: 'Express', scope: 'Diagnostic gouvernance 8min — Score /100', duration: 'Gratuit', price: 'Sur devis', highlight: false },
      { name: 'Standard', scope: 'Due diligence complète multi-dimensionnelle', duration: '4-8 semaines', price: 'Sur devis', highlight: true },
      { name: 'Premium', scope: 'DD + Audit Board + Accompagnement post-transaction', duration: '3-6 mois', price: 'Sur devis', highlight: false },
    ],
    color: '#c4a235',
    buNumber: 'BU2',
  },
  {
    icon: 'ri-leaf-line',
    title: 'Climat, Transition & ESG',
    subtitle: 'BU3 — Ingénierie de Décarbonation',
    desc: 'Valorisation et sécurisation des actifs industriels face aux risques climatiques. Ingénierie de décarbonation, reporting ISSB/GRI/CSRD, stratégie ESG intégrée. Transformation des contraintes environnementales en avantage compétitif et accès aux financements verts.',
    sectors: ['Industries extractives', 'Énergie', 'Agro-industrie', 'Infrastructures', 'Manufacturing'],
    deliverables: [
      'Bilan carbone complet — Scope 1, 2, 3 — et trajectoire de décarbonation',
      'Cartographie des risques climatiques physiques et de transition',
      'Reporting ESG conforme ISSB, GRI, CSRD, SDG — dossier investisseurs',
      'Stratégie ESG intégrée — gouvernante, objectifs, KPI, roadmap',
      'Due diligence ESG pré-acquisition et valorisation actifs verts',
    ],
    tiers: [
      { name: 'Diagnostic', scope: 'Score ESG 8min — Alignement ISSB/GRI', duration: 'Gratuit', price: 'Sur devis', highlight: false },
      { name: 'Advanced', scope: 'Bilan carbone + Stratégie ESG + Reporting', duration: '3-6 mois', price: 'Sur devis', highlight: true },
      { name: 'Enterprise', scope: 'Décarbonation intégrée + Suivi 24 mois + Financements verts', duration: '12-24 mois', price: 'Sur devis', highlight: false },
    ],
    color: '#2E7D32',
    buNumber: 'BU3',
  },
  {
    icon: 'ri-brain-line',
    title: 'KBR-Model & Intelligence d\'Affaires',
    subtitle: 'BU4 — Monétisation de la Propriété Intellectuelle',
    desc: 'Articles premium, études sectorielles payantes et intelligence économique actionnable pour décideurs. Le KBR (Knowledge-Based Revenue) Model transforme la connaissance en revenus récurrents. Research Institute, baromètres réglementaires, notes de conjoncture.',
    sectors: ['Décideurs C-level', 'Investisseurs', 'Régulateurs', 'Think Tanks', 'Médias financiers'],
    deliverables: [
      'Études sectorielles premium — Banques, FinTech, Assurance, Microfinance',
      'Notes de conjoncture trimestrielles — UEMOA, CEMAC, OHADA',
      'Baromètres réglementaires — BCEAO, COBAC, BEAC, GAFI',
      'Position Papers & Policy Briefs pour décideurs et régulateurs',
      'Accès KOS Knowledge Graph — 100K documents, 2.78M embeddings',
    ],
    tiers: [
      { name: 'Insight', scope: 'Articles gratuits + Baromètres publics', duration: 'Gratuit', price: 'Sur devis', highlight: false },
      { name: 'Premium', scope: 'Études sectorielles + Notes de conjoncture', duration: 'Paiement unique', price: 'Sur devis', highlight: true },
      { name: 'Corporate', scope: 'Abonnement KOS + Research Institute + Accès illimité', duration: '12 mois', price: 'Sur devis', highlight: false },
    ],
    color: '#1a2d4a',
    buNumber: 'BU4',
  },
];

export default function OffreServices() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28" id="offre-services" style={{ background: 'linear-gradient(180deg, #f8f6f0 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-apps-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>4 Business Units — Constitution KHEPRA Art. 2</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Architecture{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              100% Big Four
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Quatre Business Units exclusives opérant en synergie via le KOS Knowledge Operating System™. Chaque mission fait l&apos;objet d&apos;un <strong>devis confidentiel sur mesure</strong> — aucun prix public, aucune offre standardisée.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-6">
          {services.map((s, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300 gradient-border glow-gold-hover"
                style={{ background: '#ffffff', boxShadow: isOpen ? `0 8px 40px ${s.color}12` : '0 2px 16px rgba(0,0,0,0.03)' }}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center gap-5 p-6 lg:p-8 text-left cursor-pointer transition-all hover:bg-gray-50/50"
                >
                  {/* BU Badge */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                      <i className={`${s.icon} text-xl`} style={{ color: s.color }} />
                    </div>
                    <span className="text-[10px] font-black tracking-wider" style={{ color: s.color }}>{s.buNumber}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-playfair text-lg font-bold" style={{ color: '#0a1628' }}>{s.title}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${s.color}12`, color: s.color }}>{s.subtitle}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed truncate">{s.desc}</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                    <i className={`${isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-xl`} style={{ color: s.color }} />
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 lg:px-8 pb-8 pt-2 border-t border-gray-100">
                    {/* Priority badge for BU1 */}
                    {s.buNumber === 'BU1' && (
                      <div className="mb-5 px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.08), rgba(107,155,31,0.04))', border: '1px solid rgba(134,188,37,0.2)' }}>
                        <i className="ri-alert-fill text-lg" style={{ color: '#86BC25' }} />
                        <div>
                          <span className="text-xs font-bold uppercase" style={{ color: '#86BC25' }}>Priorité Absolue</span>
                          <span className="text-xs text-gray-500 ml-2">— Cette BU constitue le cœur de métier historique de KHEPRA EXPERTS. Toutes les missions sont supervisées directement par le Directeur Associé.</span>
                        </div>
                      </div>
                    )}

                    {/* Sectors */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.sectors.map((sec, si) => (
                        <span key={si} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(10,22,40,0.04)', color: '#0a1628', border: '1px solid rgba(10,22,40,0.08)' }}>
                          {sec}
                        </span>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Deliverables */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: s.color }}>Livrables standards</div>
                        <div className="space-y-3">
                          {s.deliverables.map((d, di) => (
                            <div key={di} className="flex items-start gap-3">
                              <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                                <i className="ri-check-line text-xs" style={{ color: s.color }} />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tiers */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: s.color }}>Niveaux de service — Sur devis confidentiel</div>
                        <div className="space-y-3">
                          {s.tiers.map((t, ti) => (
                            <div
                              key={ti}
                              className="rounded-xl p-4 transition-all gradient-border glow-gold-hover"
                              style={{
                                background: t.highlight ? `${s.color}08` : 'rgba(10,22,40,0.02)',
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm" style={{ color: t.highlight ? s.color : '#0a1628' }}>{t.name}</span>
                                  {t.highlight && (
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: s.color }}>Recommandé</span>
                                  )}
                                </div>
                                <span className="text-xs font-semibold text-gray-500">{t.duration}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">{t.scope}</span>
                                <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>Sur devis</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <i className="ri-shield-check-line text-green-500" />
                        <span>NDA systématique — Confidentialité absolue — Devis sous 24h</span>
                      </div>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}cc 100%)`, color: '#ffffff' }}
                      >
                        <i className="ri-calendar-check-line" />
                        Demander un devis personnalisé
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Badge tout sur devis */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.04)', border: '1px solid rgba(10,22,40,0.08)' }}>
            <i className="ri-lock-line text-lg" style={{ color: '#86BC25' }} />
            <div className="text-left">
              <p className="text-sm font-bold" style={{ color: '#0a1628' }}>Aucun prix public — Tout est sur devis confidentiel</p>
              <p className="text-xs text-gray-500">Chaque mission est unique. Nous établissons un devis sur mesure après un diagnostic gratuit de vos besoins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}