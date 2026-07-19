import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HomeIMF() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const offers = [
    {
      id: 'agrement',
      icon: 'ri-government-line',
      accent: '#86BC25',
      title: isFr ? 'Démarche d\'Agrément' : 'Licensing Process',
      hook: isFr ? 'Dossier clé-en-main, de la constitution au dépôt BCEAO/BEAC' : 'Turnkey file, from preparation to BCEAO/BEAC submission',
      metric: '100%',
      metricLabel: isFr ? 'dossiers instruits avec succès' : 'files successfully processed',
      description: isFr
        ? 'Constitution et instruction complète du dossier d\'agrément selon les normes BCEAO (UEMOA) et BEAC (CEMAC). Revue des statuts, plan d\'affaires, politique de crédit, manuels de procédures, et accompagnement aux entretiens avec les régulateurs.'
        : 'Complete preparation and processing of licensing files according to BCEAO (UEMOA) and BEAC (CEMAC) standards. Review of statutes, business plan, credit policy, procedure manuals, and support for regulator interviews.',
      items: [
        { label: isFr ? 'Constitution du dossier réglementaire' : 'Regulatory file preparation', href: '/sfd-conformite' },
        { label: isFr ? 'Plan d\'affaires et modèle financier' : 'Business plan & financial model', href: '/services/etudes-faisabilite' },
        { label: isFr ? 'Manuels de procédures' : 'Procedure manuals', href: '/sfd-conformite' },
        { label: isFr ? 'Accompagnement entretiens régulateurs' : 'Regulator interview coaching', href: '/sfd-conformite' },
      ],
      cta: isFr ? 'Démarrer ma démarche →' : 'Start my process →',
      ctaHref: '/sfd-conformite',
    },
    {
      id: 'conformite',
      icon: 'ri-shield-check-line',
      accent: '#86BC25',
      title: isFr ? 'Conformité Réglementaire' : 'Regulatory Compliance',
      hook: isFr ? 'Alignez vos pratiques sur la nouvelle loi uniforme BCEAO/BEAC' : 'Align your practices with the new uniform law BCEAO/BEAC',
      metric: '50+',
      metricLabel: isFr ? 'SFD/IMF accompagnés' : 'MFIs supported',
      description: isFr
        ? 'Diagnostic complet de conformité aux normes prudentielles BCEAO et BEAC. Évaluation des ratios de solvabilité, liquidité, fonds propres, politique tarifaire, KYC, protection des membres et conformité monnaie électronique.'
        : 'Complete compliance diagnostic against BCEAO and BEAC prudential standards. Evaluation of solvency, liquidity, equity, pricing policy, KYC, member protection, and e-money compliance.',
      items: [
        { label: isFr ? 'Diagnostic de conformité' : 'Compliance diagnostic', href: '/sfd-conformite' },
        { label: isFr ? 'Plan de mise en conformité' : 'Compliance action plan', href: '/sfd-conformite' },
        { label: isFr ? 'Reporting réglementaire' : 'Regulatory reporting', href: '/sfd-conformite' },
        { label: isFr ? 'Suivi post-audit' : 'Post-audit follow-up', href: '/sfd-conformite' },
      ],
      cta: isFr ? 'Auditer ma conformité →' : 'Audit my compliance →',
      ctaHref: '/tools/evaluation-conformite-reglementaire',
    },
    {
      id: 'diagnostic-org',
      icon: 'ri-stethoscope-line',
      accent: '#86BC25',
      title: isFr ? 'Diagnostic Organisationnel' : 'Organizational Diagnostic',
      hook: isFr ? 'Identifiez vos forces, faiblesses et leviers de performance' : 'Identify your strengths, weaknesses, and performance levers',
      metric: '600+',
      metricLabel: isFr ? 'organisations évaluées' : 'organizations evaluated',
      description: isFr
        ? 'Analyse organisationnelle approfondie couvrant la structure, les processus, la gouvernance, le système d\'information et les ressources humaines. Cartographie des dysfonctionnements et plan d\'action priorisé pour transformer les résultats.'
        : 'In-depth organizational analysis covering structure, processes, governance, IT systems, and human resources. Mapping of dysfunctions and prioritized action plan to transform results.',
      items: [
        { label: isFr ? 'Analyse structure & processus' : 'Structure & process analysis', href: '/services/diagnostic-organisationnel' },
        { label: isFr ? 'Évaluation du SI & digital' : 'IT & digital assessment', href: '/tools/diagnostic-transformation-digitale' },
        { label: isFr ? 'Audit des ressources humaines' : 'HR audit', href: '/tools/diagnostic-rh-strategique' },
        { label: isFr ? 'Plan d\'action priorisé' : 'Prioritized action plan', href: '/services/diagnostic-organisationnel' },
      ],
      cta: isFr ? 'Faire mon diagnostic →' : 'Run my diagnostic →',
      ctaHref: '/tools/diagnostic-organisationnel',
    },
    {
      id: 'gouvernance',
      icon: 'ri-scales-line',
      accent: '#86BC25',
      title: isFr ? 'Évaluation de la Gouvernance' : 'Governance Assessment',
      hook: isFr ? 'Renforcez la crédibilité auprès des investisseurs et régulateurs' : 'Strengthen credibility with investors and regulators',
      metric: '4.9/5',
      metricLabel: isFr ? 'note moyenne client' : 'average client rating',
      description: isFr
        ? 'Évaluation structurée de la gouvernance d\'entreprise selon les standards internationaux et régionaux. Analyse du Conseil d\'Administration, des comités spécialisés, du dispositif de contrôle interne, de la gestion des risques, et de la conformité ESG.'
        : 'Structured corporate governance assessment according to international and regional standards. Analysis of the Board of Directors, specialized committees, internal control framework, risk management, and ESG compliance.',
      items: [
        { label: isFr ? 'Audit du Conseil d\'Administration' : 'Board of Directors audit', href: '/tools/evaluation-gouvernance' },
        { label: isFr ? 'Mise en place du contrôle interne' : 'Internal control setup', href: '/tools/evaluation-gouvernance' },
        { label: isFr ? 'Politique de gestion des risques' : 'Risk management policy', href: '/tools/evaluation-gouvernance' },
        { label: isFr ? 'Conformité ESG & IFC' : 'ESG & IFC compliance', href: '/tools/diagnostic-esg-impact' },
      ],
      cta: isFr ? 'Évaluer ma gouvernance →' : 'Assess my governance →',
      ctaHref: '/tools/evaluation-gouvernance',
    },
  ];

  return (
    <section id="imf" className="py-20 md:py-28 bg-brand-950 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <i className="ri-hand-coin-line" />
            {isFr ? 'IMF, SFD & EMF' : 'MFIs, SFDs & EMFs'}
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {isFr
              ? <>Offres Spécialisées <span className="text-gold-400">Microfinance</span></>
              : <>Specialized <span className="text-gold-400">Microfinance</span> Offers</>}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isFr
              ? 'Solutions dédiées aux Institutions de Microfinance et Systèmes Financiers Décentralisés : de l\'agrément réglementaire à la gouvernance d\'entreprise, en passant par la conformité BCEAO/BEAC et le diagnostic organisationnel. Notre accompagnement intègre la prise en compte de la Décision n°019/CM/UMOA du 21 décembre 2023 (Loi Uniforme sur la Microfinance dans l\'UEMOA), texte fondateur en cours de transposition dans les 8 États membres.'
              : 'Dedicated solutions for Microfinance Institutions and Decentralized Financial Systems: from regulatory licensing to corporate governance, through BCEAO/BEAC compliance and organizational diagnostics. Our support integrates the Decision n°019/CM/UMOA of December 21, 2023 (Uniform Law on Microfinance in UEMOA), the foundational text currently being transposed in the 8 member states.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-12">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-brand-900/60 rounded-2xl p-6 md:p-7 gradient-border-dark glow-gold-hover transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${offer.accent}, transparent)` }} />

              {/* Header row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-800/80 flex-shrink-0">
                  <i className={`${offer.icon} text-xl`} style={{ color: offer.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gold-400/80 italic leading-tight">{offer.hook}</p>
                </div>
              </div>

              {/* Metric */}
              <div className="flex items-baseline gap-2 mb-3 pl-16">
                <span className="text-3xl font-bold" style={{ color: offer.accent }}>{offer.metric}</span>
                <span className="text-sm text-gray-500">{offer.metricLabel}</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 pl-0 md:pl-16">
                {offer.description}
              </p>

              {/* Items */}
              <div className="space-y-2 mb-6 flex-1 pl-0 md:pl-16">
                {offer.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); navigate(item.href); }}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors group/item cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-xs text-gray-600 group-hover/item:text-gold-400 flex-shrink-0" />
                    <span className="group-hover/item:underline underline-offset-2">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="pl-0 md:pl-16">
                <a
                  href={offer.ctaHref}
                  onClick={(e) => { e.preventDefault(); navigate(offer.ctaHref); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-brand-950 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                  style={{ background: offer.accent }}
                >
                  {offer.cta}
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="bg-gradient-to-r from-brand-900/80 to-brand-800/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 gradient-border-dark">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-500/10 flex-shrink-0">
              <i className="ri-hand-coin-line text-2xl text-gold-400" />
            </div>
            <div>
              <p className="text-white font-bold text-base md:text-lg">{isFr ? 'Accompagnement SFD/IMF complet' : 'Full SFD/MFI support'}</p>
              <p className="text-gray-400 text-sm">{isFr ? '50+ institutions accompagnées · UEMOA · CEMAC · BCEAO · BEAC' : '50+ institutions supported · WAEMU · CEMAC · BCEAO · BEAC'}</p>
            </div>
          </div>
          <a
            href="/sfd-conformite"
            onClick={(e) => { e.preventDefault(); navigate('/sfd-conformite'); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500/40 text-gold-400 text-sm font-bold hover:bg-gold-500/10 transition-all cursor-pointer whitespace-nowrap"
          >
            {isFr ? 'Explorer l\'espace SFD' : 'Explore SFD space'}
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}



