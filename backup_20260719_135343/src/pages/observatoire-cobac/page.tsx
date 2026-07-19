import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';
import BulletinReglementaireNewsletter from '@/components/feature/BulletinReglementaireNewsletter';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  observatoireCOBACKPIs,
  cobacTextesRecents,
  cobacIndicators,
  cobacAxesAnalyse,
  cobacFaqs,
} from '@/mocks/observatoiresPublic';

export default function ObservatoireCOBACPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const kpi = observatoireCOBACKPIs;
  const impactBadge = (impact: string) => {
    if (impact === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
    if (impact === 'Élevé') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  return (
    <>
      <SeoHead
        title="Observatoire COBAC CEMAC — Veille Réglementaire Bancaire Afrique Centrale | KHEPRA EXPERTS"
        description="Observatoire COBAC : veille réglementaire bancaire CEMAC, 42 textes réglementaires suivis, 17 alertes mensuelles, directives prudentielles COBAC, conformité bancaire Afrique Centrale, agréments et supervision Gabon Cameroun Congo RCA Tchad Guinée Équatoriale. Analyses d'impact et baromètre CEMAC."
        keywords="Observatoire COBAC, réglementation bancaire CEMAC, veille COBAC, directives prudentielles COBAC, conformité bancaire Afrique Centrale, textes COBAC, agréments bancaires CEMAC, supervision bancaire GABAC, KHEPRA EXPERTS"
        canonicalPath="/observatoire-cobac"
      />

      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20corporate%20headquarters%20in%20Central%20Africa%2C%20glass%20and%20steel%20architecture%2C%20tropical%20vegetation%2C%20warm%20sunset%20light%2C%20premium%20financial%20district%2C%20clean%20professional%20aesthetic%2C%20emerald%20green%20accents%2C%20architectural%20photography%2C%20no%20people&width=1600&height=700&seq=obs-cobac-hero&orientation=landscape"
            alt="Observatoire COBAC CEMAC"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-bank-line text-emerald-600"></i>
              Observatoire COBAC — KHEPRA Knowledge Institute™
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Observatoire COBAC CEMAC
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Veille réglementaire continue sur la Commission Bancaire de l'Afrique Centrale. 
              {kpi.totalTextesSuivis} textes suivis, {kpi.alertesCeMois} alertes ce mois.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'Textes Suivis', value: kpi.totalTextesSuivis, icon: 'ri-file-text-line' },
              { label: 'Alertes/Mois', value: kpi.alertesCeMois, icon: 'ri-notification-3-line' },
              { label: 'Publications', value: kpi.publications, icon: 'ri-book-open-line' },
              { label: 'Pays CEMAC', value: kpi.paysCouverts, icon: 'ri-global-line' },
              { label: 'Fréquence', value: kpi.frequency, icon: 'ri-calendar-line' },
              { label: "Score d'Impact", value: `${kpi.scoreImpact}/100`, icon: 'ri-bar-chart-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-emerald-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bulletin Réglementaire Newsletter */}
          <BulletinReglementaireNewsletter context="observatoire-cobac" />

          {/* Flux de conversion — Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Votre banque CEMAC est-elle prête pour la prochaine inspection COBAC ?</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Diagnostic flash gratuit de 30 minutes avec un expert COBAC. Analyse de votre conformité prudentielle, gouvernance et LBC/FT face aux exigences réglementaires CEMAC. Offre limitée aux établissements de crédit en zone CEMAC.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Axes d'Analyse */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Axes d'Analyse</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {cobacAxesAnalyse.map((axe) => (
                <div key={axe.id} className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all">
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

          {/* Textes Récents */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Derniers Textes COBAC</h2>
            <div className="space-y-3 mb-10">
              {cobacTextesRecents.map((texte) => (
                <div key={texte.id} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-medium whitespace-nowrap ${impactBadge(texte.impact)}`}>{texte.impact}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-foreground-950">{texte.reference}</span>
                    <p className="text-xs text-foreground-600 mt-0.5">{texte.titre}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400 whitespace-nowrap">
                    <span>{new Date(texte.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{texte.categorie}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Indicateurs */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Indicateurs Clés</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {cobacIndicators.map((ind, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                  <div className="text-lg font-bold text-foreground-950">{ind.value}</div>
                  <div className="text-xs text-foreground-500">{ind.name}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">{ind.period}</div>
                  <i className={`text-xs ${ind.trend === 'up' ? 'ri-arrow-up-line text-green-500' : 'ri-arrow-down-line text-red-500'}`}></i>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {cobacFaqs.map((faq, i) => (
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

          {/* Cross-link: Hub Agréments & Observatoire Africain */}
          <BlogObservatoireAgrementsCTA variant="compliance-factory" context="observatoire" />

          {/* CTA */}
          <div className="text-center p-8 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Abonnez-vous à l'Observatoire COBAC</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Recevez chaque mois notre bulletin de veille réglementaire COBAC. Analyses, alertes et recommandations.</p>
            <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-mail-line"></i>S'abonner
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}



