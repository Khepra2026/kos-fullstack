import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BulletinReglementaireNewsletter from '@/components/feature/BulletinReglementaireNewsletter';
import { observatoireSFDKPIs, sfdIndicators, sfdActualites, sfdFaqs } from '@/mocks/observatoiresPublic';

export default function ObservatoireSFDPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const kpi = observatoireSFDKPIs;

  const impactBadge = (impact: string) => {
    if (impact === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
    if (impact === 'Élevé') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  return (
    <>
      <SeoHead
        title="Observatoire SFD UEMOA — Microfinance & Inclusion Financière | KHEPRA EXPERTS"
        description="Observatoire SFD UEMOA : veille réglementaire microfinance, ratios prudentiels SFD, inclusion financière (24.7%), encours crédit 1245 Mds FCFA. 245 institutions suivies, directives BCEAO, agréments microfinance, supervision bancaire UEMOA. Bénin Burkina Côte d'Ivoire Guinée-Bissau Mali Niger Sénégal Togo."
        keywords="Observatoire SFD, microfinance UEMOA, ratios prudentiels SFD, inclusion financière Afrique de l'Ouest, BCEAO SFD microfinance, agréments établissements de microfinance, conformité SFD UEMOA, supervision BCEAO, KHEPRA EXPERTS"
        canonicalPath="/observatoire-sfd"
      />

      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://readdy.ai/api/search-image?query=Warm%20community%20microfinance%20scene%20in%20West%20Africa%2C%20small%20business%20owners%2C%20market%20stalls%20with%20vibrant%20textiles%2C%20warm%20golden%20hour%20light%2C%20inclusive%20financial%20services%2C%20professional%20yet%20accessible%20atmosphere%2C%20warm%20terracotta%20and%20amber%20tones%2C%20documentary%20photography&width=1600&height=700&seq=obs-sfd-hero&orientation=landscape" alt="Observatoire SFD UEMOA" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-hand-heart-line text-rose-600"></i>
              Observatoire SFD — KHEPRA Knowledge Institute™
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Observatoire SFD & Inclusion Financière
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              {kpi.totalSFD} SFD suivis en zone UEMOA. Taux d'inclusion financière : {kpi.tauxInclusion}. 
              Encours de crédit : {kpi.encoursCreditTotal}.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'SFD Actifs', value: kpi.totalSFD, icon: 'ri-building-line' },
              { label: 'Sous Surveillance', value: kpi.sfdsousSurveillance, icon: 'ri-alert-line' },
              { label: 'Ratio Solvabilité', value: kpi.ratioSolvabiliteMoyen, icon: 'ri-shield-check-line' },
              { label: 'Inclusion Fin.', value: kpi.tauxInclusion, icon: 'ri-user-heart-line' },
              { label: 'Encours Crédit', value: kpi.encoursCreditTotal, icon: 'ri-funds-line' },
              { label: 'Publications', value: kpi.publications, icon: 'ri-book-open-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-rose-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bulletin Réglementaire Newsletter */}
          <BulletinReglementaireNewsletter context="observatoire-sfd" />

          {/* Flux de conversion — Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Votre SFD respecte-t-il les ratios prudentiels BCEAO ?</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Diagnostic flash gratuit de 30 minutes avec un expert SFD BCEAO. Analyse de vos ratios prudentiels, conformité réglementaire et gouvernance face aux instructions BCEAO. Offre limitée aux SFD et EMF en zone UEMOA.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-rose-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Actualités */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Actualités SFD</h2>
            <div className="space-y-3 mb-10">
              {sfdActualites.map((actu, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-medium whitespace-nowrap ${impactBadge(actu.impact)}`}>{actu.impact}</span>
                  <p className="text-xs text-foreground-700 leading-relaxed flex-1">{actu.titre}</p>
                  <span className="text-[10px] text-foreground-400 whitespace-nowrap">{new Date(actu.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Indicateurs */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Indicateurs Clés</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {sfdIndicators.map((ind, i) => (
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
              {sfdFaqs.map((faq, i) => (
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

          <div className="text-center p-8 rounded-2xl bg-rose-50 border border-rose-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Abonnez-vous à l'Observatoire SFD</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Bulletin mensuel sur le secteur de la microfinance. Ratios prudentiels, actualités réglementaires, analyses sectorielles.</p>
            <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-mail-line"></i>S'abonner
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}