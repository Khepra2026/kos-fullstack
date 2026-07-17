import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function KOSBU1FinancialRegulationPage() {
  return (
    <>
      <SeoHead
        title="BU1 Régulation Financière & Conformité — Bouclier Réglementaire BCEAO/COBAC | KHEPRA EXPERTS"
        description="Business Unit 1 — Régulation Financière & Conformité. Audit à blanc, pré-inspection, plans de remédiation pour banques, assurances, SFD en zone UEMOA/CEMAC. Études sectorielles et monographies sur devis. KOS Knowledge Operating System™ — 120 Hubs."
        keywords="régulation financière, conformité BCEAO, conformité COBAC, audit réglementaire, bouclier réglementaire, UEMOA, CEMAC, KHEPRA EXPERTS"
        canonicalPath="/kos-bu1-financial-regulation"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20financial%20regulation%20concept%20with%20a%20luminous%20shield%20emblem%20radiating%20emerald%20and%20gold%20light%20beams%20over%20a%20dark%20grid%20representing%20regulatory%20compliance%20frameworks%2C%20premium%20corporate%20aesthetic%20with%20geometric%20patterns%20suggesting%20banking%20architecture%20and%20prudential%20standards%2C%20sophisticated%20dark%20background%20with%20golden%20filaments%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu1-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu1" currentLang="fr" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-sm font-bold text-accent-500 uppercase tracking-wider">Business Unit 1 — Priorité Absolue</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Régulation Financière & Conformité
            <span className="block text-accent-500 mt-2 text-xl md:text-2xl font-normal">Bouclier Réglementaire — BCEAO · COBAC · BEAC · GABAC</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Protection absolue de votre établissement face aux exigences des régulateurs. Méthodologie d'audit à blanc, plan de remédiation priorisé et dossier de preuves conforme aux standards Big Four. <strong className="text-white">95+ points de contrôle, simulation d'inspection réelle.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'BCEAO Circ. 01-03/2017',
              'COBAC R-2001/07',
              'GAFI 2023',
              'Bâle II/III',
              'IFRS',
              'OHADA',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-accent-500 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Demander un devis confidentiel
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* Positionnement BU1 */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Votre Bouclier Réglementaire en Zone UEMOA/CEMAC
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              La BU1 est la première ligne de défense de KHEPRA EXPERTS. Nous sécurisons les établissements financiers face aux exigences croissantes des régulateurs africains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-shield-check-line',
                title: 'Audit à Blanc 95+ Points',
                desc: 'Simulation complète d\'inspection réglementaire. Cartographie des écarts, scoring de conformité, rapport exécutif 40+ pages.',
              },
              {
                icon: 'ri-file-chart-line',
                title: 'Plan de Remédiation Priorisé',
                desc: 'Feuille de route corrective avec priorisation par criticité. Dossier de preuves, procédures conformes, manuel de conformité.',
              },
              {
                icon: 'ri-radar-line',
                title: 'Veille Réglementaire KOS',
                desc: 'Abonnement continu : alertes temps réel, mises à jour automatiques, audit annuel, support permanent.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-accent-600 text-xl`} />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Études Sectorielles & Monographies */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-4">
              <i className="ri-book-2-line text-accent-600" />
              <span className="text-sm font-bold text-accent-700 uppercase tracking-wider">Études Sectorielles & Monographies — Sur Devis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Intelligence Réglementaire Premium
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              Des études sectorielles approfondies et des monographies réglementaires produites par nos experts et le KOS Knowledge Graph™. Chaque livrable est tarifé sur devis selon la profondeur d'analyse requise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Baromètre Conformité BCEAO 2026', desc: 'Analyse complète des 22 instructions en vigueur, gaps de conformité par pays UEMOA, benchmark des pratiques sectorielles.' },
              { title: 'Monographie COBAC — Exigences 2026-2027', desc: 'Nouvelles circulaires, réglementation fintech, exigences de fonds propres, calendrier de mise en conformité.' },
              { title: 'Étude Sectorielle — Banques UEMOA', desc: 'Analyse des 128 banques, ratios prudentiels, stress tests, projection du paysage bancaire 2026-2028.' },
              { title: 'Guide LCB/FT — Exigences GAFI 2026', desc: 'Mise à jour complète des 40 recommandations, évaluation nationale des risques, procédures KYC/CDD.' },
              { title: 'Rapport Stress Tests — Pilier 2', desc: 'Méthodologie BCEAO, scénarios macroéconomiques, impact sur les ratios de solvabilité, plan de mitigation.' },
              { title: 'Veille Réglementaire Mensuelle', desc: 'Synthèse exécutive des nouveaux textes, analyses d\'impact, recommandations opérationnelles. Abonnement annuel.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-accent-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-accent-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">Sur devis</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-accent-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    Demander <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profils Cibles */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">Vous êtes concerné si...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: 'ri-bank-line', label: 'Banques & Établissements Financiers', desc: 'Soumises aux exigences BCEAO/COBAC — ratios prudentiels, gouvernance, reporting.' },
              { icon: 'ri-building-line', label: 'Assurances & Réassurance', desc: 'Conformité CIMA/CRCA, exigences de solvabilité, reporting prudentiel.' },
              { icon: 'ri-hand-coin-line', label: 'SFD & Institutions de Microfinance', desc: 'Instructions BCEAO 001-030, agrément, ratios prudentiels, gouvernance SFD.' },
              { icon: 'ri-smartphone-line', label: 'Fintechs & Établissements de Paiement', desc: 'Nouvelles réglementations fintech UEMOA/CEMAC, licensing, conformité opérationnelle.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-accent-600 text-lg`} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{item.label}</h3>
                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-foreground-950">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            Protégez votre établissement. Anticipez l'inspection.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nos experts analysent votre exposition réglementaire et vous fournissent un devis confidentiel en 48h. <strong className="text-white">Aucun prix public. Chaque mission est unique.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-accent-500 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-base"
            >
              <i className="ri-mail-send-line" />
              Demander un devis
            </Link>
            <Link
              to="/offre-commerciale"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-text-line" />
              Brochure complète
            </Link>
            <Link
              to="/lead-magnets/diagnostic-scoring-kbr"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-flashlight-line" />
              Diagnostic Gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}