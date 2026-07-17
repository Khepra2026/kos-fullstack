import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function KOSBU2GovernanceDueDiligencePage() {
  return (
    <>
      <SeoHead
        title="BU2 Gouvernance & Due Diligence — Performance des Boards, Audits Pré-Acquisition | KHEPRA EXPERTS"
        description="Business Unit 2 — Gouvernance & Due Diligence. Audit de performance des conseils d'administration, due diligence pré-acquisition, cartographie des risques de gouvernance. Études sectorielles et monographies sur devis. KOS Knowledge Operating System™."
        keywords="gouvernance entreprise, due diligence, audit board, performance conseil administration, acquisition, ISO 37000, COSO, OHADA, KHEPRA EXPERTS"
        canonicalPath="/kos-bu2-governance-due-diligence"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20governance%20concept%20with%20interconnected%20golden%20nodes%20forming%20a%20boardroom%20table%20constellation%20radiating%20authority%20and%20oversight%2C%20emerald%20green%20accents%20symbolizing%20due%20diligence%20and%20transparency%2C%20premium%20corporate%20dark%20background%20with%20subtle%20geometric%20patterns%20suggesting%20organizational%20hierarchy%2C%20sophisticated%20minimal%20aesthetic%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu2-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu2" currentLang="fr" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/20 border border-secondary-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
            <span className="text-sm font-bold text-secondary-500 uppercase tracking-wider">Business Unit 2 — Priorité Haute</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Gouvernance & Due Diligence
            <span className="block text-secondary-500 mt-2 text-xl md:text-2xl font-normal">Observatoire de la Gouvernance — Performance Boards · Audits Pré-Acquisition</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            La gouvernance défaillante est la cause racine de 73% des crises institutionnelles en Afrique. Nous auditons, mesurons et renforçons la performance de vos organes de gouvernance avec <strong className="text-white">la rigueur méthodologique des standards COSO, ISO 37000 et OHADA AUSCGIE.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'COSO 2013/2017',
              'ISO 37000',
              'OHADA AUSCGIE',
              'IIA IPPF',
              'GRI 2021',
              'ISSB',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-secondary-500 hover:bg-secondary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Demander un devis confidentiel
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
              </section>

      {/* Positionnement */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              La Gouvernance comme Avantage Compétitif
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              La BU2 transforme la gouvernance d'obligation réglementaire en levier de valorisation pour attirer investisseurs et partenaires stratégiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-user-star-line',
                title: 'Audit de Performance du Board',
                desc: 'Évaluation indépendance, comités spécialisés, diversité, politique de rémunération, éthique. Score de maturité gouvernance /100.',
              },
              {
                icon: 'ri-search-eye-line',
                title: 'Due Diligence Pré-Acquisition',
                desc: 'Audit complet : financier, juridique, ESG, gouvernance. Cartographie des risques cachés, red flags, recommandations.',
              },
              {
                icon: 'ri-scales-3-line',
                title: 'Conformité OHADA & Internationale',
                desc: 'Alignement AUSCGIE, ISO 37000, COSO. Politique de gouvernance, charte CA, rémunération, éthique, conformité.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-secondary-600 text-xl`} />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Études Sectorielles */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
              <i className="ri-book-2-line text-secondary-600" />
              <span className="text-sm font-bold text-secondary-700 uppercase tracking-wider">Études & Monographies — Sur Devis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Intelligence Gouvernance Premium
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Baromètre Gouvernance — Banques UEMOA 2026', desc: 'Analyse comparative de la gouvernance des 128 banques UEMOA. Indépendance, comités, diversité, rémunération.' },
              { title: 'Monographie — Due Diligence OHADA', desc: 'Guide complet de la due diligence pré-acquisition en zone OHADA. Checklist 150 points, red flags, études de cas.' },
              { title: 'Étude — Conflits d\'Intérêts dans les Boards Africains', desc: 'Typologie des conflits, mécanismes de prévention, benchmark international, recommandations COSO/ISO 37000.' },
              { title: 'Rapport — Performance des Comités d\'Audit', desc: 'Évaluation des comités d\'audit UEMOA/CEMAC, conformité circulaires BCEAO/COBAC, plan d\'amélioration.' },
              { title: 'Guide — Politique de Rémunération des Dirigeants', desc: 'Benchmark sectoriel, alignement performance, conformité réglementaire, recommandations OHADA.' },
              { title: 'Étude — Gouvernance des SFD en zone UEMOA', desc: 'Analyse des 7 piliers de gouvernance BCEAO, gaps par pays, feuille de route de mise en conformité.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-secondary-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-secondary-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">Sur devis</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-secondary-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">Pour les Décideurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: 'ri-user-received-line', label: 'Présidents de Conseil d\'Administration', desc: 'Évaluez la performance de votre Board. Benchmark, indépendance, comités spécialisés.' },
              { icon: 'ri-briefcase-line', label: 'Directeurs Généraux & DGAs', desc: 'Sécurisez votre gouvernance avant une levée de fonds, une acquisition ou une inspection.' },
              { icon: 'ri-funds-line', label: 'Fonds d\'Investissement & PE', desc: 'Due diligence governance pré-acquisition. Détection des conflits et risques cachés.' },
              { icon: 'ri-government-line', label: 'Régulateurs & Autorités de Tutelle', desc: 'Benchmark de la gouvernance sectorielle, études comparatives, recommandations.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-secondary-600 text-lg`} />
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
            Votre gouvernance est votre premier actif immatériel. Auditons-la.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Un diagnostic gouvernance gratuit en 8 minutes. Un devis confidentiel en 48h. <strong className="text-white">Aucun prix public — chaque mission est calibrée sur votre contexte.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-secondary-500 hover:bg-secondary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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