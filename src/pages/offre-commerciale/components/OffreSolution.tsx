import { useState } from 'react';

export default function OffreSolution() {
  const [activePhase, setActivePhase] = useState(0);

  const solutions = [
    {
      icon: 'ri-shield-check-line',
      title: 'Protection réglementaire absolue',
      desc: 'Audit à blanc 95+ points de contrôle, plan de remédiation et dossier de preuves opposable aux régulateurs. Conformité intégrale BCEAO, COBAC, BEAC, GABAC, OHADA.',
    },
    {
      icon: 'ri-search-eye-line',
      title: 'Gouvernance & Due Diligence',
      desc: 'Performance des Boards, détection des conflits, due diligence pré-acquisition. Cartographie des risques de gouvernance et recommandations actionnables.',
    },
    {
      icon: 'ri-leaf-line',
      title: 'Climat, Transition & ESG',
      desc: 'Bilan carbone Scope 1-2-3, trajectoire de décarbonation, reporting ISSB/GRI. Valorisation et sécurisation des actifs industriels face aux risques climatiques.',
    },
    {
      icon: 'ri-brain-line',
      title: 'KBR-Model & Intelligence d\'Affaires',
      desc: 'Études sectorielles premium, baromètres réglementaires, notes de conjoncture. KOS Knowledge Graph — 100K documents, 2.78M embeddings, 18 sources actives.',
    },
  ];

  const methodologySteps = [
    { num: '01', name: 'DISCOVERY', label: 'Diagnostic 360°', desc: 'Analyse complète de votre situation avec cartographie des risques et matrice de conformité.' },
    { num: '02', name: 'DESIGN', label: 'Conception sur-mesure', desc: 'Plan d\'action structuré avec modèle financier prévisionnel et architecture de gouvernance.' },
    { num: '03', name: 'DEPLOY', label: 'Déploiement terrain', desc: 'Mise en œuvre des procédures avec formation des équipes et accompagnement opérationnel.' },
    { num: '04', name: 'DRIVE', label: 'Pilotage & optimisation', desc: 'Comités de pilotage mensuels, ajustements stratégiques et audit de conformité intermédiaire.' },
    { num: '05', name: 'DELIVER', label: 'Livrables & transfert', desc: 'Rapport d\'impact financier, dossier de conformité et équipes autonomes à 90%.' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" id="offre-solution">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Gauche : Image + badge */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '480px' }}>
              <img
                src="https://readdy.ai/api/search-image?query=professional%20african%20financial%20consultant%20presenting%20strategic%20financial%20roadmap%20to%20business%20executives%20in%20modern%20boardroom%20charts%20and%20graphs%20on%20screen%20confident%20professional%20atmosphere%20West%20Africa%20corporate%20setting%20green%20accent%20lighting%20dark%20charcoal%20tones%20business%20meeting%20high%20quality%20photography%20no%20blue%20no%20purple&width=800&height=960&seq=offre-solution-green&orientation=portrait"
                alt="KHEPRA EXPERTS - Direction Financière Externalisée"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,22,40,0.8) 100%)' }} />
            </div>

            {/* Badge flottant */}
            <div
              className="absolute -bottom-6 -right-6 p-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', minWidth: '180px' }}
            >
              <div className="text-2xl font-bold text-white font-playfair">BU1</div>
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider mt-1">Régulation</div>
              <div className="text-xs text-white/60 mt-1">Priorité absolue</div>
            </div>

            {/* Badge certif */}
            <div
              className="absolute -top-4 -left-4 p-4 rounded-xl"
              style={{ background: '#0a1628', border: '1px solid rgba(212,168,42,0.3)' }}
            >
              <div className="flex items-center gap-2">
                <i className="ri-verified-badge-fill text-xl" style={{ color: '#86BC25' }} />
                <div>
                  <div className="text-xs font-bold text-white">BCEAO</div>
                  <div className="text-xs text-white/50">Certifié</div>
                </div>
              </div>
            </div>
          </div>

          {/* Droite : Contenu + méthodologie */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-focus-3-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Notre Solution</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
              4 Business Units{' '}
              <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                100% Big Four
              </span>
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              KHEPRA EXPERTS a dépassé le modèle traditionnel du cabinet de conseil. Notre Knowledge Operating System™ (KOS) intègre 4 Business Units exclusives qui opèrent en synergie, produisant des livrables de niveau Big Four adaptés aux réalités africaines. Chaque mission fait l'objet d'un devis confidentiel sur mesure.
            </p>

            <div className="space-y-5 mb-10">
              {solutions.map((s, i) => (
                <div key={i} className="flex items-start gap-4 group gradient-border glow-gold-hover p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}
                  >
                    <i className={`${s.icon} text-lg`} style={{ color: '#86BC25' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-checkbox-circle-fill text-sm text-green-500" />
                      <h3 className="font-bold text-sm" style={{ color: '#0a1628' }}>{s.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* KHEPRA FRAMEWORK preview */}
            <div className="rounded-2xl p-6 mb-8 gradient-border glow-gold-hover transition-all duration-300" style={{ background: 'linear-gradient(135deg, #f8f6f0 0%, #ffffff 100%)' }}>
              <div className="flex items-center gap-2 mb-5">
                <i className="ri-award-line text-sm" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Méthodologie KOS — 5 Phases · Standards Big Four</span>
              </div>
              <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                {methodologySteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhase(i)}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all cursor-pointer border ${activePhase === i ? 'border-transparent' : 'border-gray-100'}`}
                    style={{ background: activePhase === i ? '#0a1628' : '#ffffff', minWidth: '100px' }}
                  >
                    <div className="text-xs font-black" style={{ color: activePhase === i ? '#86BC25' : '#86BC25' }}>{step.num}</div>
                    <div className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: activePhase === i ? '#ffffff' : '#0a1628' }}>{step.name}</div>
                  </button>
                ))}
              </div>
              <div className="p-5 rounded-xl gradient-border glow-gold-hover transition-all duration-300" style={{ background: 'rgba(212,168,42,0.05)' }}>
                <h4 className="font-bold text-sm mb-1" style={{ color: '#0a1628' }}>{methodologySteps[activePhase].label}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{methodologySteps[activePhase].desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', color: '#86BC25', border: '1px solid rgba(212,168,42,0.3)' }}
              >
                <i className="ri-calendar-check-line text-lg" />
                Réserver un entretien stratégique
              </button>
              <a
                href="#offre-methodology"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
              >
                <i className="ri-award-line" />
                Voir la méthodologie complète
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}