import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function CaseStudies() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      icon: 'ri-organization-chart',
      title: isEn ? 'Organizational Restructuring' : 'Restructuration organisationnelle',
      client: isEn ? 'Regional Microfinance Institution' : 'Institution de microfinance régionale',
      challenge: isEn 
        ? 'A microfinance institution with 15 branches faced governance issues, unclear processes, and declining financial performance. The board lacked strategic oversight and internal controls were insufficient.'
        : 'Une institution de microfinance avec 15 agences faisait face à des problèmes de gouvernance, des processus flous et une performance financière en baisse. Le conseil d\'administration manquait de supervision stratégique et les contrôles internes étaient insuffisants.',
      solution: isEn
        ? 'We conducted a comprehensive organizational diagnostic, redesigned the governance structure, implemented a new organizational chart with clear reporting lines, established board committees (Audit, Risk, HR), and trained management teams on their new roles.'
        : 'Nous avons réalisé un diagnostic organisationnel complet, redessiné la structure de gouvernance, mis en place un nouvel organigramme avec des lignes hiérarchiques claires, créé des comités du conseil (Audit, Risques, RH) et formé les équipes de direction à leurs nouveaux rôles.',
      results: [
        isEn ? '40% improvement in decision-making speed' : '40% d\'amélioration de la rapidité de prise de décision',
        isEn ? 'Board meeting effectiveness increased by 60%' : 'Efficacité des réunions du conseil augmentée de 60%',
        isEn ? 'Return to profitability within 12 months' : 'Retour à la rentabilité en 12 mois',
        isEn ? '25% reduction in operational costs' : '25% de réduction des coûts opérationnels'
      ],
      color: 'teal'
    },
    {
      icon: 'ri-line-chart-line',
      title: isEn ? 'Financial Performance Improvement' : 'Amélioration de la performance financière',
      client: isEn ? 'SME in Agribusiness Sector' : 'PME du secteur agroalimentaire',
      challenge: isEn
        ? 'A growing agribusiness company struggled with cash flow management, lacked financial visibility, and couldn\'t secure bank financing due to weak financial reporting. The management team had limited financial expertise.'
        : 'Une entreprise agroalimentaire en croissance rencontrait des difficultés de gestion de trésorerie, manquait de visibilité financière et ne parvenait pas à obtenir des financements bancaires en raison de rapports financiers faibles. L\'équipe dirigeante avait une expertise financière limitée.',
      solution: isEn
        ? 'We implemented a financial management system, established monthly reporting dashboards, trained the finance team on cash flow forecasting, restructured the balance sheet, and prepared a comprehensive business plan for bank presentations.'
        : 'Nous avons mis en place un système de gestion financière, établi des tableaux de bord mensuels, formé l\'équipe financière à la prévision de trésorerie, restructuré le bilan et préparé un business plan complet pour les présentations bancaires.',
      results: [
        isEn ? 'Cash flow visibility improved by 100%' : 'Visibilité de la trésorerie améliorée de 100%',
        isEn ? 'Secured $500K bank financing' : 'Obtention de 500K$ de financement bancaire',
        isEn ? '35% increase in profit margins' : '35% d\'augmentation des marges bénéficiaires',
        isEn ? 'Financial reporting cycle reduced from 30 to 7 days' : 'Cycle de reporting financier réduit de 30 à 7 jours'
      ],
      color: 'amber'
    },
    {
      icon: 'ri-funds-line',
      title: isEn ? 'Fundraising Structuring' : 'Structuration de levée de fonds',
      client: isEn ? 'Tech Startup in Fintech' : 'Startup tech dans la fintech',
      challenge: isEn
        ? 'A promising fintech startup with a solid product struggled to attract investors. They lacked a compelling pitch deck, had unclear financial projections, and didn\'t understand investor expectations in the African market.'
        : 'Une startup fintech prometteuse avec un produit solide peinait à attirer des investisseurs. Elle manquait d\'un pitch deck convaincant, avait des projections financières floues et ne comprenait pas les attentes des investisseurs sur le marché africain.',
      solution: isEn
        ? 'We prepared an investor-ready pitch deck, built a 5-year financial model with realistic assumptions, conducted market research to validate the business case, coached the founding team on investor presentations, and facilitated introductions to our investor network.'
        : 'Nous avons préparé un pitch deck prêt pour les investisseurs, construit un modèle financier sur 5 ans avec des hypothèses réalistes, réalisé une étude de marché pour valider le business case, coaché l\'équipe fondatrice sur les présentations investisseurs et facilité les introductions à notre réseau d\'investisseurs.',
      results: [
        isEn ? 'Successfully raised $1.2M in seed funding' : 'Levée réussie de 1,2M$ en seed',
        isEn ? 'Pitch deck rated 9/10 by investors' : 'Pitch deck noté 9/10 par les investisseurs',
        isEn ? 'Connected with 15+ qualified investors' : 'Mise en relation avec 15+ investisseurs qualifiés',
        isEn ? 'Valuation increased by 40% during negotiations' : 'Valorisation augmentée de 40% lors des négociations'
      ],
      color: 'gold'
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-label">
            {isEn ? 'Case Studies' : 'Études de cas'}
          </span>
          <h2 className="section-title">
            {isEn ? <>Results We&apos;ve <span className="accent">Achieved</span></> : <>Résultats <span className="accent">obtenus</span></>}
          </h2>
          <div className="section-divider">
            <span className="section-divider-dot"></span>
          </div>
          <p className="section-subtitle px-4">
            {isEn 
              ? 'Discover how we\'ve helped organizations transform their challenges into measurable success'
              : 'Découvrez comment nous avons aidé des organisations à transformer leurs défis en succès mesurables'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 gradient-border glow-gold-hover"
            >
              <div className={`p-8 bg-gradient-to-br ${
                study.color === 'teal' ? 'from-teal-500 to-teal-600' :
                study.color === 'amber' ? 'from-amber-500 to-amber-600' :
                'from-gold-500 to-gold-600'
              }`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <i className={`${study.icon} text-4xl text-white`} aria-hidden="true"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {study.title}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  {study.client}
                </p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <i className="ri-error-warning-line text-red-500"></i>
                    {isEn ? 'Challenge' : 'Défi'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {expandedCase === index ? study.challenge : `${study.challenge.substring(0, 120)}...`}
                  </p>
                </div>

                {expandedCase === index && (
                  <>
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <i className="ri-lightbulb-line text-blue-500"></i>
                        {isEn ? 'Our Approach' : 'Notre approche'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {study.solution}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-500"></i>
                        {isEn ? 'Results' : 'Résultats'}
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <i className="ri-arrow-right-s-line text-green-500 mt-0.5 flex-shrink-0"></i>
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <button
                  onClick={() => setExpandedCase(expandedCase === index ? null : index)}
                  className="w-full mt-4 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {expandedCase === index ? (
                    <>
                      <i className="ri-arrow-up-s-line"></i>
                      <span>{isEn ? 'Show Less' : 'Réduire'}</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-arrow-down-s-line"></i>
                      <span>{isEn ? 'Read Full Case' : 'Lire le cas complet'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollToSection('diagnostic-offer')}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white px-8 sm:px-10 py-4 rounded-full hover:from-brand-700 hover:to-brand-800 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer text-base sm:text-lg min-h-[44px]"
          >
            <i className="ri-calendar-check-line text-xl"></i>
            <span>{isEn ? 'Get Your Strategic Diagnostic' : 'Obtenir votre diagnostic stratégique'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}