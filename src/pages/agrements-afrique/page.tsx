import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import KOSPublicHubCrossLinks from '@/components/feature/KOSPublicHubCrossLinks';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  agrementsKPIs,
  typesAgrement,
  casesEtudes,
  checklistGlobale,
} from '@/mocks/agrementsAfrique';

const impactBadge = (priorite: string) => {
  if (priorite === 'P0') return 'bg-red-100 text-red-700 border-red-200';
  if (priorite === 'P1') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-foreground-100 text-foreground-600 border-foreground-200';
};

export default function AgrementsAfriquePage() {
  const [selectedType, setSelectedType] = useState(typesAgrement[0].id);
  const agrement = typesAgrement.find(t => t.id === selectedType) || typesAgrement[0];

  return (
    <>
      <SeoHead
        title="Hub Agréments Afrique — Banques EMF FinTech PSP Assurance Marchés Financiers | KHEPRA EXPERTS"
        description="Hub Agréments Afrique KHEPRA : 6 types d'agrément (Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers). Guides complets, FAQ, checklists, simulateurs et accompagnement expert. Capital minimum, délais, autorités de supervision BCEAO COBAC CIMA COSUMAF AMF-UEMOA. UEMOA + CEMAC. 47 agréments obtenus, taux de réussite 94%."
        keywords="agrément bancaire UEMOA CEMAC, agrément microfinance SFD EMF, agrément FinTech Afrique, agrément PSP paiement, agrément assurance CIMA, agrément marchés financiers AMF-UEMOA COSUMAF, capital minimum agrément BCEAO, délai agréments bancaires Afrique, conformité agrément supervision, KHEPRA EXPERTS"
        canonicalPath="/agrements-afrique"
      />

      <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Premium%20African%20financial%20institution%20headquarters%20lobby%20with%20warm%20copper%20brass%20and%20deep%20emerald%20architectural%20details%2C%20modern%20regulatory%20licensing%20and%20certification%20symbolism%2C%20abstract%20legal%20framework%20visual%20elements%2C%20warm%20natural%20daylight%20through%20tall%20windows%2C%20institutional%20authority%20and%20trust%20aesthetic%2C%20clean%20minimalist%20luxury%2C%20marble%20textures%20with%20metallic%20accents%2C%20editorial%20architectural%20photography&width=1600&height=720&seq=agrements-hero&orientation=landscape"
            alt="Hub Agréments Afrique"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-award-line text-emerald-600"></i>
              Hub Agréments Afrique — KHEPRA EXPERTS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Hub Agréments Afrique
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Guides complets, FAQ, checklists et accompagnement expert pour {agrementsKPIs.totalTypes} types d'agrément. {agrementsKPIs.agrementsObtenus} agréments obtenus, taux de réussite {agrementsKPIs.tauxReussite}%.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: "Types d'Agrément", value: agrementsKPIs.totalTypes, icon: 'ri-award-line' },
              { label: 'Agréments Obtenus', value: agrementsKPIs.agrementsObtenus, icon: 'ri-check-double-line' },
              { label: 'Taux de Réussite', value: `${agrementsKPIs.tauxReussite}%`, icon: 'ri-trophy-line' },
              { label: 'Pages Documentation', value: agrementsKPIs.pagesDocumentation, icon: 'ri-book-open-line' },
              { label: 'Délai Moyen', value: agrementsKPIs.dureeMoyenne, icon: 'ri-timer-line' },
              { label: 'Accompagnements', value: agrementsKPIs.accompagnementsActifs, icon: 'ri-user-star-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-emerald-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Flux de conversion — Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Préparez votre dossier d'agrément avec un expert</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Diagnostic flash gratuit de 30 minutes. Évaluation de votre maturité réglementaire, identification des gaps et feuille de route personnalisée pour votre agrément BCEAO, COBAC ou CIMA. Offre limitée aux promoteurs en Afrique francophone.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Type Selector */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-4">Types d'Agrément</h2>
            <p className="text-sm text-foreground-500 mb-6">Sélectionnez un type d'agrément pour accéder au guide complet, aux étapes, exigences et FAQ.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
              {typesAgrement.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-xl p-4 text-center transition-all cursor-pointer border ${
                    selectedType === type.id
                      ? 'border-foreground-300 bg-foreground-50'
                      : 'bg-background-50 border-background-200/70 hover:border-background-300'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${type.couleur}15`, color: type.couleur }}>
                    <i className={type.icone}></i>
                  </div>
                  <span className={`text-xs font-bold block ${selectedType === type.id ? 'text-foreground-950' : 'text-foreground-600'}`}>{type.nom}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Agrément Detail */}
          <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-10" style={{ borderTop: `4px solid ${agrement.couleur}` }}>
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl" style={{ backgroundColor: agrement.couleur }}>
                    <i className={agrement.icone}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground-950">{agrement.nom}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-500">
                      <span className="px-2 py-0.5 rounded-full bg-background-100 border border-background-200">{agrement.zone}</span>
                      <span>Autorité : {agrement.autorite}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">{agrement.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-background-100 border border-background-200 text-center">
                    <div className="text-sm font-bold" style={{ color: agrement.couleur }}>{agrement.capitalMinimum}</div>
                    <div className="text-[10px] text-foreground-500">Capital Minimum</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 border border-background-200 text-center">
                    <div className="text-sm font-bold" style={{ color: agrement.couleur }}>{agrement.delai}</div>
                    <div className="text-[10px] text-foreground-500">Délai Estimé</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background-100 border border-background-200 text-center">
                    <div className="text-sm font-bold" style={{ color: agrement.couleur }}>{agrement.etapes.length} étapes</div>
                    <div className="text-[10px] text-foreground-500">Processus</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Exigences Clés</h4>
                <div className="space-y-2">
                  {agrement.exigences.map((ex, j) => (
                    <div key={j} className="flex items-start gap-2 p-2.5 rounded-lg bg-background-100 border border-background-200/70">
                      <i className="ri-check-line text-emerald-600 text-xs mt-0.5 flex-shrink-0"></i>
                      <span className="text-[11px] text-foreground-700">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Les Étapes */}
            <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Les {agrement.etapes.length} Étapes du Processus</h4>
            <div className="space-y-3 mb-8">
              {agrement.etapes.map(etape => (
                <div key={etape.numero} className="flex items-start gap-4 p-4 rounded-xl bg-background-100 border border-background-200/70">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: agrement.couleur, color: '#fff' }}>{etape.numero}</div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground-950">{etape.titre}</h5>
                    <p className="text-xs text-foreground-600 mt-0.5">{etape.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Questions Fréquentes</h4>
            <div className="space-y-3">
              {agrement.faq.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200/70">
                  <p className="text-sm font-bold text-foreground-950 mb-1">{faq.q}</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">{faq.r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist Globale */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Checklist Globale — Tous Agréments</h2>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5 mb-10">
              <div className="space-y-2">
                {checklistGlobale.map(item => (
                  <div key={item.item} className="flex items-start gap-3 p-3 rounded-lg bg-background-100 border border-background-200/70">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold whitespace-nowrap flex-shrink-0 ${impactBadge(item.priorite)}`}>{item.priorite}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-foreground-800">{item.item}</span>
                      <span className="text-[10px] text-foreground-400 block">{item.domaine}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Cas d'Études */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Cas d'Études — Agréments Réussis</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {casesEtudes.map((cas, i) => (
                <Link key={i} to={cas.lien} className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-emerald-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-check-double-line text-emerald-600"></i>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Cas d'Étude</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2 group-hover:text-emerald-700">{cas.titre}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-3">{cas.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700">{cas.resultat}</span>
                    <span className="text-foreground-400">{cas.delaiReel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          {/* Existing pages link */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Pages Existantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              <Link to="/agrement-beac" className="p-4 rounded-xl bg-background-50 border border-background-200/70 hover:border-foreground-300 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg" style={{ backgroundColor: '#C2410C15', color: '#C2410C' }}>
                  <i className="ri-bank-line"></i>
                </div>
                <span className="text-sm font-bold text-foreground-950 group-hover:text-emerald-700">Agrément BEAC/COBAC — Dossier & Accompagnement</span>
                <p className="text-[11px] text-foreground-500 mt-1">Guide complet pour l'agrément en zone CEMAC</p>
              </Link>
              <Link to="/conformite-cemac" className="p-4 rounded-xl bg-background-50 border border-background-200/70 hover:border-foreground-300 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg" style={{ backgroundColor: '#0D7B5F15', color: '#0D7B5F' }}>
                  <i className="ri-shield-check-line"></i>
                </div>
                <span className="text-sm font-bold text-foreground-950 group-hover:text-emerald-700">Conformité CEMAC — COBAC, GABAC</span>
                <p className="text-[11px] text-foreground-500 mt-1">Cadre réglementaire complet CEMAC</p>
              </Link>
              <Link to="/case-studies/agrement-multinational-sfd-uemoa-cemac" className="p-4 rounded-xl bg-background-50 border border-background-200/70 hover:border-foreground-300 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg" style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
                  <i className="ri-article-line"></i>
                </div>
                <span className="text-sm font-bold text-foreground-950 group-hover:text-emerald-700">Case Study — Agrément Multinational SFD</span>
                <p className="text-[11px] text-foreground-500 mt-1">UEMOA + CEMAC — étude de cas complète</p>
              </Link>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <div className="text-center p-8 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Démarrez votre projet d'agrément</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Bénéficiez de notre expérience terrain et de notre méthodologie éprouvée. Diagnostic gratuit de votre projet en 30 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
                <i className="ri-calendar-check-line"></i>Réserver un diagnostic gratuit
              </a>
              <Link to="/diagnostic-flash/" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-200 text-foreground-700 text-sm font-semibold hover:border-foreground-300 transition-colors cursor-pointer">
                <i className="ri-flashlight-line"></i>Diagnostic Flash en ligne
              </Link>
            </div>
          </div>
          {/* KOS Cross-Links */}
          <KOSPublicHubCrossLinks currentPage="agrements" />
        </div>
      </div>
    </>
  );
}