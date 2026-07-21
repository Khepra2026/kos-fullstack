import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU3ClimateESGPage() {
  return (
    <>
      <SeoHead
        title="BU3 Climat, Transition & ESG — Ingénierie de Décarbonation, Stratégie ESG | KHEPRA EXPERTS"
        description="Business Unit 3 — Climat, Transition & ESG. Bilan carbone Scope 1-2-3, stratégie ESG intégrée ISSB/GRI/CSRD, valorisation des actifs industriels face aux risques climatiques. Études sectorielles et monographies sur devis. KOS Knowledge Operating System™."
        keywords="ESG, climat, décarbonation, bilan carbone, ISSB, GRI, CSRD, transition écologique, finance verte, KHEPRA EXPERTS, Afrique"
        canonicalPath="/kos-bu3-climate-esg"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20climate%20transition%20concept%20with%20emerald%20green%20energy%20waves%20flowing%20through%20a%20dark%20industrial%20landscape%2C%20golden%20sustainability%20metrics%20glowing%20like%20constellation%20points%2C%20geometric%20carbon%20reduction%20pathways%20intersecting%20with%20financial%20valuation%20curves%2C%20premium%20corporate%20aesthetic%20with%20organic%20flowing%20lines%20suggesting%20ecological%20transformation%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu3-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu3" currentLang="fr" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Business Unit 3 — Priorité Haute</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Climat, Transition & ESG
            <span className="block text-emerald-400 mt-2 text-xl md:text-2xl font-normal">Ingénierie de Décarbonation — Valorisation des Actifs Industriels</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Le carbone est devenu un actif financier à part entière. Nous accompagnons les industriels et institutions financières dans la mesure, la réduction et la valorisation de leur empreinte carbone avec <strong className="text-white">les standards ISSB, GRI, CSRD et les recommandations NGFS.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'ISSB',
              'GRI 2021',
              'CSRD',
              'NGFS',
              'TCFD',
              'ISO 14064',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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
              Votre Stratégie Climat comme Levier de Valorisation
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              La BU3 transforme la contrainte carbone en opportunité stratégique. Nous sécurisons vos actifs industriels et votre accès aux financements verts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-leaf-line',
                title: 'Bilan Carbone Scope 1-2-3',
                desc: 'Mesure complète de l\'empreinte carbone, trajectoire de décarbonation alignée Accord de Paris Art. 6, plan de réduction priorisé.',
              },
              {
                icon: 'ri-line-chart-line',
                title: 'Stratégie ESG Intégrée',
                desc: 'Reporting conforme ISSB, GRI, CSRD. Dossier investisseurs, due diligence climat, préparation aux exigences de place.',
              },
              {
                icon: 'ri-seedling-line',
                title: 'Financements Verts & Taxonomie',
                desc: 'Éligibilité taxonomie verte UE, montage de dossiers de financement climat, obligations vertes, crédits carbone.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-emerald-600 text-xl`} />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <i className="ri-book-2-line text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Études & Monographies — Sur Devis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Intelligence Climat & ESG Premium
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Baromètre ESG — Banques Africaines 2026', desc: 'État des lieux du reporting ESG des banques UEMOA/CEMAC. Alignement ISSB, gaps, benchmark sectoriel.' },
              { title: 'Monographie — Marché Carbone Africain', desc: 'Analyse des mécanismes de crédits carbone, potentiel des projets Article 6, cartographie des initiatives.' },
              { title: 'Étude Sectorielle — Décarbonation Industrielle', desc: 'Trajectoires sectorielles de décarbonation pour les industries extractives et manufacturières en Afrique.' },
              { title: 'Rapport — Taxonomie Verte & Financements Climat', desc: 'Critères d\'éligibilité, cartographie des guichets de financement, montage de dossiers.' },
              { title: 'Guide — Reporting CSRD pour Filiales Africaines', desc: 'Obligations des filiales de groupes européens, calendrier de mise en conformité, indicateurs clés.' },
              { title: 'Étude — Risques Physiques & Transition', desc: 'Cartographie des risques climatiques par zone géographique, stress tests NGFS, plans d\'adaptation.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-emerald-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-emerald-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Sur devis</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
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
              { icon: 'ri-oil-line', label: 'Industries Extractives & Manufacturières', desc: 'Décarbonation, bilan carbone, conformité CSRD, accès aux financements verts.' },
              { icon: 'ri-bank-line', label: 'Banques & Institutions Financières', desc: 'Reporting ESG Pillier 3, stress tests climatiques NGFS, taxonomie verte.' },
              { icon: 'ri-building-2-line', label: 'Infrastructures & Énergie', desc: 'Évaluation carbone des projets, due diligence climat, financements concessionnels.' },
              { icon: 'ri-global-line', label: 'Groupes Européens — Filiales Africaines', desc: 'Mise en conformité CSRD, reporting ESG consolidé, audits climat.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-emerald-600 text-lg`} />
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
            Le carbone est un passif — ou un actif. À vous de choisir.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Un diagnostic ESG gratuit en 8 minutes. Un devis confidentiel en 48h. <strong className="text-white">Aucun prix public — chaque mission est unique.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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





