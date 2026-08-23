import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU4KBRModelPage() {
  return (
    <>
      <SeoHead
        title="BU4 KBR-Model & Intelligence d'Affaires — Études Sectorielles Premium, Monétisation PI | KHEPRA EXPERTS"
        description="Business Unit 4 — KBR-Model & Intelligence d'Affaires. Articles premium, études sectorielles payantes, baromètres réglementaires, notes de conjoncture. Monétisation de la Propriété Intellectuelle via le KOS Knowledge Graph™ (100K documents). Tout sur devis."
        keywords="KBR-Model, intelligence affaires, études sectorielles, monétisation PI, articles premium, baromètres réglementaires, veille économique, KHEPRA EXPERTS, KOS Knowledge Graph"
        canonicalPath="/kos-bu4-kbr-model"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20knowledge%20monetization%20concept%20with%20golden%20data%20streams%20flowing%20from%20a%20luminous%20crystalline%20brain-like%20structure%20into%20interconnected%20revenue%20nodes%2C%20premium%20dark%20background%20with%20emerald%20and%20amber%20light%20trails%20representing%20intellectual%20property%20transformation%20into%20business%20intelligence%2C%20geometric%20honeycomb%20patterns%20suggesting%20knowledge%20architecture%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu4-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu4" currentLang="fr" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-bold text-primary-400 uppercase tracking-wider">Business Unit 4 — Levier Stratégique</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            KBR-Model & Intelligence d'Affaires
            <span className="block text-primary-400 mt-2 text-xl md:text-2xl font-normal">Monétisation de la Propriété Intellectuelle — Knowledge-Based Revenue</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            La connaissance est notre matière première. Le KBR-Model transforme le capital intellectuel de KHEPRA EXPERTS en revenus récurrents via <strong className="text-white">28 études sectorielles par an, des baromètres réglementaires, des notes de conjoncture et des articles premium.</strong> Le tout alimenté par le KOS Knowledge Graph™ — 100K documents, 2.78M embeddings, 18 sources.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              '28 Études/an',
              '100K Documents',
              '3 Niveaux KBR',
              '18 Sources',
              '500+ Citations',
              'KOS Knowledge Graph™',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Demander un devis confidentiel
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* Les 3 Niveaux KBR */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Le KBR-Model — 3 Niveaux de Monétisation
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              La BU4 est le moteur de monétisation de la Propriété Intellectuelle de KHEPRA EXPERTS. Chaque niveau correspond à un degré de profondeur d'analyse et d'exclusivité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                level: 'KBR Level 1',
                label: 'Lead Magnet — Gratuit',
                icon: 'ri-download-line',
                color: 'bg-primary-100',
                iconColor: 'text-primary-600',
                desc: 'Executive Summaries, aperçus d\'articles, simulateurs de scores. Conçu pour démontrer notre expertise et capturer des leads qualifiés.',
                items: ['Résumés exécutifs (2 pages)', 'Aperçus d\'études sectorielles', 'Simulateurs de scores réglementaires', 'Baromètres synthétiques'],
              },
              {
                level: 'KBR Level 2',
                label: 'Premium — Sur Devis',
                icon: 'ri-vip-crown-line',
                color: 'bg-amber-100',
                iconColor: 'text-amber-600',
                desc: 'Articles approfondis, études sectorielles complètes, notes de conjoncture, monographies. Le cœur de notre offre de monétisation.',
                items: ['Études sectorielles complètes (30-60 pages)', 'Notes de conjoncture trimestrielles', 'Monographies réglementaires', 'Articles premium avec données exclusives'],
              },
              {
                level: 'KBR Level 3',
                label: 'High-Ticket — Sur Devis',
                icon: 'ri-shield-star-line',
                color: 'bg-accent-100',
                iconColor: 'text-accent-600',
                desc: 'Rapports d\'audit privés, cartographies des risques clients, intelligence sur mesure pour des décisions à haut enjeu.',
                items: ['Rapports d\'audit confidentiels', 'Cartographies de risques personnalisées', 'Due diligence intelligence', 'Briefings exécutifs sur mesure'],
              },
            ].map((tier, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${tier.color} flex items-center justify-center mb-4`}>
                  <i className={`${tier.icon} ${tier.iconColor} text-xl`} />
                </div>
                <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">{tier.level}</span>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2 mt-1">{tier.label}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed mb-4">{tier.desc}</p>
                <ul className="space-y-2">
                  {tier.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                      <i className="ri-check-line text-emerald-500 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Premium */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <i className="ri-book-open-line text-primary-600" />
              <span className="text-sm font-bold text-primary-700 uppercase tracking-wider">Publications Premium KBR — Sur Devis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Nos Publications Phares
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Baromètre Conformité UEMOA 2026', desc: 'Analyse trimestrielle des évolutions réglementaires, gaps de conformité, benchmark des pratiques sectorielles.' },
              { title: 'Baromètre Conformité CEMAC 2026', desc: 'Miroir CEMAC du baromètre UEMOA. COBAC, BEAC, GABAC. Analyse trimestrielle exclusive.' },
              { title: 'Note de Conjoncture — Finance Africaine', desc: 'Analyse macroéconomique, tendances réglementaires, signaux faibles. Publication trimestrielle.' },
              { title: 'Policy Brief — Régulation Fintech UEMOA', desc: 'Décryptage des nouvelles orientations réglementaires fintech. Implications pour banques et startups.' },
              { title: 'Position Paper — Gouvernance OHADA 2026', desc: 'Analyse des évolutions AUSCGIE, recommandations pour les Boards, benchmark international.' },
              { title: 'Étude — Stress Tests Climatiques Pilier 2', desc: 'Méthodologie NGFS appliquée aux banques UEMOA/CEMAC. Scénarios, impacts, recommandations.' },
              { title: 'Monographie — Finance Islamique UEMOA', desc: 'Analyse complète du cadre réglementaire, opportunités, études de cas, potentiel de marché.' },
              { title: 'Rapport Annuel — KOS Intelligence Review', desc: 'Synthèse annuelle des tendances réglementaires, technologiques et économiques en Afrique francophone.' },
              { title: 'Executive Summary — KBR Monthly Digest', desc: 'Résumé exécutif mensuel gratuit. Aperçu des publications premium, signaux faibles, agenda réglementaire.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-primary-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">Sur devis</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-primary-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    Demander <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
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
            L'intelligence n'a de valeur que si elle est actionnable.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Accédez à des études sectorielles, des baromètres réglementaires et des notes de conjoncture qui transforment votre prise de décision. <strong className="text-white">Aucun prix public. Chaque publication est tarifée sur devis.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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
            <a
              href="https://www.linkedin.com/company/khepraexperts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-linkedin-fill" />
              Suivre sur LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}



