import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BulletinReglementaireNewsletter from '@/components/feature/BulletinReglementaireNewsletter';
import publicHubCrossLinks from '@/components/feature/publicHubCrossLinks';
import {
  observatoireKPIs,
  regulateurs,
  alertesRecentes,
  axesAnalyse,
  barometreStats,
  cartographieTextes,
  faqs,
} from '@/mocks/observatoireReglementaireAfricain';

const impactBadge = (impact: string) => {
  if (impact === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
  if (impact === 'Élevé') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-foreground-100 text-foreground-600 border-foreground-200';
};

export default function ObservatoireReglementaireAfricainPage() {
  const [selectedRegulateur, setSelectedRegulateur] = useState<string>('bceao');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const regulateur = regulateurs.find(r => r.id === selectedRegulateur) || regulateurs[0];

  return (
    <>
      <SeoHead
        title="Observatoire Réglementaire Africain — Veille BCEAO COBAC CIMA COSUMAF AMF-UEMOA | KHEPRA EXPERTS"
        description="Observatoire Réglementaire Africain KHEPRA : veille réglementaire panafricaine BCEAO, COBAC, CIMA, COSUMAF, AMF-UEMOA. 1247 textes suivis, 43 alertes mensuelles, analyses d'impact conformité bancaire, directives prudentielles UEMOA CEMAC, baromètre réglementaire, agréments et supervision. 17 pays Afrique francophone."
        keywords="Observatoire Réglementaire Africain, veille réglementaire BCEAO COBAC, directives prudentielles BCEAO, conformité bancaire UEMOA CEMAC, agréments microfinance Afrique, textes réglementaires CIMA COSUMAF AMF-UEMOA, supervision bancaire Afrique francophone, KHEPRA EXPERTS"
        canonicalPath="/observatoire-reglementaire-africain"
      />

      <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20pan-African%20regulatory%20intelligence%20command%20center%20with%20warm%20copper%20and%20emerald%20ambient%20lighting%2C%20abstract%20geometric%20map%20of%20Africa%20made%20of%20holographic%20data%20streams%2C%20clean%20minimalist%20aesthetic%2C%20institutional%20premium%20financial%20atmosphere%20with%20soft%20natural%20daylight%20filtering%20through%20glass%20panels%2C%20warm%20neutral%20gray%20marble%20textures%20with%20subtle%20brass%20accents%2C%20editorial%20architectural%20photography&width=1600&height=720&seq=obs-africain-hero&orientation=landscape"
            alt="Observatoire Réglementaire Africain"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-radar-line text-emerald-600"></i>
              Observatoire Réglementaire Africain — KHEPRA Knowledge Institute™
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Observatoire Réglementaire Africain
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Veille réglementaire panafricaine. {observatoireKPIs.totalTextesSuivis} textes suivis sur {observatoireKPIs.totalRegulateurs} régulateurs, {observatoireKPIs.alertesCeMois} alertes ce mois.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 mb-10">
            {[
              { label: 'Textes Suivis', value: observatoireKPIs.totalTextesSuivis, icon: 'ri-file-text-line' },
              { label: 'Régulateurs', value: observatoireKPIs.totalRegulateurs, icon: 'ri-building-line' },
              { label: 'Alertes/Mois', value: observatoireKPIs.alertesCeMois, icon: 'ri-notification-3-line' },
              { label: 'Pays', value: observatoireKPIs.paysCouverts, icon: 'ri-global-line' },
              { label: 'Publications', value: observatoireKPIs.publications, icon: 'ri-book-open-line' },
              { label: 'Analyses Impact', value: observatoireKPIs.analysesImpact, icon: 'ri-bar-chart-line' },
              { label: "Score d'Impact", value: `${observatoireKPIs.scoreImpact}/100`, icon: 'ri-trophy-line' },
              { label: 'Fréquence', value: observatoireKPIs.frequency, icon: 'ri-calendar-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-emerald-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bulletin Réglementaire Newsletter */}
          <BulletinReglementaireNewsletter context="observatoire-reglementaire-africain" />

          {/* Flux de conversion — Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Votre institution est-elle conforme aux derniers textes ?</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Recevez un diagnostic flash gratuit de 30 minutes avec un expert KHEPRA. Analyse de votre conformité face aux dernières exigences BCEAO, COBAC et CIMA. Offre limitée aux institutions financières en Afrique francophone.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Régulateurs — Selector + Detail */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-4">Régulateurs Couverts</h2>
            <p className="text-sm text-foreground-500 mb-6">Sélectionnez un régulateur pour voir les détails, textes récents et indicateurs.</p>

            {/* Selector pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {regulateurs.map(reg => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegulateur(reg.id)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedRegulateur === reg.id
                      ? 'text-white border-transparent'
                      : 'bg-background-50 text-foreground-600 border-background-200 hover:border-foreground-300'
                  }`}
                  style={selectedRegulateur === reg.id ? { backgroundColor: reg.color } : {}}
                >
                  <i className={`${reg.icon} mr-1.5`}></i>
                  {reg.nom}
                </button>
              ))}
            </div>

            {/* Regulator Detail Card */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-10">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl" style={{ backgroundColor: regulateur.color }}>
                      <i className={regulateur.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground-950">{regulateur.nom}</h3>
                      <div className="flex items-center gap-2 text-xs text-foreground-500">
                        <span className="px-2 py-0.5 rounded-full bg-background-100 border border-background-200">{regulateur.zone}</span>
                        <span>{regulateur.pays} pays</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">{regulateur.description}</p>

                  <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Derniers Textes</h4>
                  <div className="space-y-2 mb-4">
                    {regulateur.derniersTextes.map((texte, j) => (
                      <div key={j} className="p-3 rounded-lg bg-background-100 border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${impactBadge(texte.impact)}`}>{texte.impact}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-foreground-950">{texte.ref}</span>
                          <p className="text-[11px] text-foreground-600">{texte.titre}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-foreground-400 whitespace-nowrap">
                          <span>{new Date(texte.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span className="px-2 py-0.5 rounded-full bg-background-50 border border-background-200">{texte.domaine}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-1/3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold" style={{ color: regulateur.color }}>{regulateur.textesSuivis}</div>
                      <div className="text-[10px] text-foreground-500">Textes suivis</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold" style={{ color: regulateur.color }}>{regulateur.alertesMois}</div>
                      <div className="text-[10px] text-foreground-500">Alertes/mois</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold" style={{ color: regulateur.color }}>{regulateur.scoreConformite}/100</div>
                      <div className="text-[10px] text-foreground-500">Score Conformité</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold" style={{ color: regulateur.color }}>{regulateur.pays}</div>
                      <div className="text-[10px] text-foreground-500">Pays couverts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Baromètre UEMOA vs CEMAC */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Baromètre UEMOA vs CEMAC</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5" style={{ borderLeft: '4px solid #0D7B5F' }}>
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Zone UEMOA (BCEAO)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-emerald-700">{barometreStats.uemoa.tauxBancarisation}%</div>
                    <div className="text-[10px] text-foreground-500">Bancarisation</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-emerald-700">{barometreStats.uemoa.mobileMoney}%</div>
                    <div className="text-[10px] text-foreground-500">Mobile Money</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-emerald-700">{barometreStats.uemoa.institutions}</div>
                    <div className="text-[10px] text-foreground-500">Institutions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-emerald-700">{barometreStats.uemoa.conformiteGlobale}/100</div>
                    <div className="text-[10px] text-foreground-500">Conformité</div>
                  </div>
                </div>
                <Link to="/barometre-bceao-2026" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer">
                  Baromètre BCEAO 2026 <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5" style={{ borderLeft: '4px solid #C2410C' }}>
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Zone CEMAC (COBAC)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-orange-700">{barometreStats.cemac.tauxBancarisation}%</div>
                    <div className="text-[10px] text-foreground-500">Bancarisation</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-orange-700">{barometreStats.cemac.mobileMoney}%</div>
                    <div className="text-[10px] text-foreground-500">Mobile Money</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-orange-700">{barometreStats.cemac.institutions}</div>
                    <div className="text-[10px] text-foreground-500">Institutions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 text-center">
                    <div className="text-lg font-bold text-orange-700">{barometreStats.cemac.conformiteGlobale}/100</div>
                    <div className="text-[10px] text-foreground-500">Conformité</div>
                  </div>
                </div>
                <Link to="/barometre-cemac-2026" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-800 cursor-pointer">
                  Baromètre CEMAC 2026 <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Alertes Récentes */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">
              <i className="ri-notification-3-line text-red-500 mr-2"></i>Alertes Récentes
            </h2>
            <div className="space-y-2 mb-10">
              {alertesRecentes.map(alerte => (
                <div key={alerte.id} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-bold whitespace-nowrap ${impactBadge(alerte.impact)}`}>{alerte.impact}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-background-100 border border-background-200 whitespace-nowrap">{alerte.regulateur}</span>
                      <span className="text-[10px] text-foreground-400">{alerte.zone}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground-950">{alerte.titre}</p>
                  </div>
                  <span className="text-[11px] text-foreground-400 whitespace-nowrap">{new Date(alerte.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Axes d'Analyse */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Axes d'Analyse</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {axesAnalyse.map(axe => (
                <div key={axe.id} className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-emerald-300 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <i className={`${axe.icon} text-lg`}></i>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950">{axe.name}</h3>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed">{axe.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Cartographie des Textes */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Cartographie des Textes par Domaine</h2>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5 md:p-6 overflow-x-auto mb-10">
              <table className="w-full text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left py-3 px-3 font-bold text-foreground-500 uppercase tracking-wide">Domaine</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">BCEAO</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">COBAC</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">CIMA</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">COSUMAF</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">AMF-UEMOA</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">GAFI</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide" style={{ color: '#0D7B5F' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartographieTextes.map(row => (
                    <tr key={row.domaine} className="border-b border-background-100 hover:bg-background-100/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-foreground-900">{row.domaine}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.bceao}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.cobac}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.cima}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.cosumaf}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.crepmf}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{row.gafi}</td>
                      <td className="text-center py-3 px-2 font-bold" style={{ color: '#0D7B5F' }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Liens rapides vers les pages dédiées */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Pages Dédiées</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {[
                { label: 'Observatoire COBAC', path: '/observatoire-cobac', icon: 'ri-scales-3-line', color: '#C2410C' },
                { label: 'Observatoire SFD', path: '/observatoire-sfd', icon: 'ri-hand-heart-line', color: '#E11D48' },
                { label: 'Baromètre BCEAO 2026', path: '/barometre-bceao-2026', icon: 'ri-bank-line', color: '#0D7B5F' },
                { label: 'Baromètre CEMAC 2026', path: '/barometre-cemac-2026', icon: 'ri-global-line', color: '#F59E0B' },
                { label: 'Hub Réglementations Nationales', path: '/hub-reglementations-nationales', icon: 'ri-government-line', color: '#059669' },
                { label: 'PME & Startups', path: '/observatoires-sectoriels/pme', icon: 'ri-rocket-line', color: '#d4a82a' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="p-4 rounded-xl bg-background-50 border border-background-200/70 hover:border-foreground-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg" style={{ backgroundColor: `${link.color}15`, color: link.color }}>
                    <i className={link.icon}></i>
                  </div>
                  <span className="text-sm font-bold text-foreground-950 group-hover:text-emerald-700">{link.label}</span>
                  <i className="ri-arrow-right-line ml-2 text-foreground-400 group-hover:text-emerald-600 transition-colors"></i>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA final */}
          <div className="text-center p-8 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Abonnez-vous à l'Observatoire Réglementaire Africain</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Recevez notre bulletin mensuel de veille réglementaire panafricaine. Alertes, analyses d'impact et baromètres BCEAO, COBAC, CIMA, COSUMAF & AMF-UEMOA.</p>
            <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-mail-line"></i>S'abonner
            </Link>
          </div>
          {/* KOS Cross-Links */}
          <publicHubCrossLinks currentPage="observatoire" />
        </div>
      </div>
    </>
  );
}



