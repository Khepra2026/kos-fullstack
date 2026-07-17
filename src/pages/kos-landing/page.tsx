import SeoHead from '@/components/feature/SeoHead';

export default function KOSLandingPage() {
  return (
    <>
      <SeoHead
        title="KHEPRA — KOS REGTECH AI — Application Interne Khepra Experts"
        description="KHEPRA — KOS REGTECH AI est l'application interne de gestion des connaissances, de conformité réglementaire et d'automatisation de Khepra Experts. Plateforme de pilotage stratégique pour le cabinet de conseil en régulation financière, prix de transfert et gouvernance en Afrique francophone."
        keywords="KOS REGTECH AI-REGTECH-AI, KOS REGTECH AI, KHEPRA Operating System, application interne, conformité réglementaire, gestion connaissances, automatisation, Khepra Experts"
        ogType="website"
        canonicalPath="/kos"
      />

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <header className="w-full py-6 px-4 md:px-6 border-b border-background-200/70">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-background-50 font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground-900">
                  KOS REGTECH AI
                </h1>
                <p className="text-xs text-foreground-500">Application Interne Khepra Experts</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
          {/* Hero Section */}
          <section className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-4">
              KOS REGTECH AI — Application Interne Khepra Experts
            </h2>
            <p className="text-base md:text-lg text-foreground-600 leading-relaxed max-w-3xl">
              KHEPRA — KOS REGTECH AI est la plateforme interne de pilotage stratégique
              du cabinet Khepra Experts. Elle centralise la gestion des connaissances, l&apos;automatisation
              des processus de conformité réglementaire, et le pilotage des missions de conseil
              en Afrique francophone.
            </p>
          </section>

          {/* Info Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 md:mb-14">
            <div className="bg-background-100 rounded-lg border border-background-200 p-5 md:p-6">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <i className="ri-building-2-line text-primary-600 text-lg" />
              </div>
              <h3 className="text-base font-semibold text-foreground-900 mb-2">
                Khepra Experts
              </h3>
              <p className="text-sm text-foreground-600 leading-relaxed">
                Cabinet boutique premium — Régulation financière (BCEAO, COBAC, BEAC),
                Prix de transfert (BEPS) et Gouvernance &amp; Risques (ERM, audit interne).
                22 ans d&apos;expertise, 15 pays UEMOA/CEMAC.
              </p>
            </div>

            <div className="bg-background-100 rounded-lg border border-background-200 p-5 md:p-6">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-accent-600 text-lg" />
              </div>
              <h3 className="text-base font-semibold text-foreground-900 mb-2">
                Accès Sécurisé
              </h3>
              <p className="text-sm text-foreground-600 leading-relaxed">
                Cette application est réservée aux collaborateurs et partenaires autorisés
                de Khepra Experts. L&apos;accès est protégé par authentification.
              </p>
            </div>
          </section>

          {/* Legal Links — Google Cloud Console OAuth Validation */}
          <section className="bg-background-100 rounded-lg border border-background-200 p-5 md:p-6 mb-10">
            <h3 className="text-base font-semibold text-foreground-900 mb-4">
              Informations Légales &amp; Contact
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://khepraexperts.com/privacy"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-lock-line" />
                  Politique de Confidentialité
                </a>
                <a
                  href="/terms/"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-file-text-line" />
                  Conditions d&apos;Utilisation
                </a>
                <a
                  href="/legal/"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-scales-line" />
                  Mentions Légales
                </a>
              </div>
              <div className="pt-3 border-t border-background-200">
                <p className="text-xs text-foreground-500">
                  <strong>Application :</strong> KOS REGTECH AI &mdash;
                  <strong> Email Support :</strong> essochamanu@gmail.com &mdash;
                  <strong> Éditeur :</strong> KHEPRA EXPERTS SARL U — RCCM TG-LFW-01-2026-B13-01347, NIF 1002124216, Régime RÉEL, Lomé (Togo)
                </p>
              </div>
            </div>
          </section>

          {/* What KOS Does */}
          <section>
            <h3 className="text-lg font-semibold text-foreground-900 mb-4">
              Fonctionnalités Principales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  icon: 'ri-brain-line',
                  title: 'Gestion des Connaissances',
                  desc: 'Base documentaire réglementaire BCEAO, COBAC, GAFI, OHADA.',
                },
                {
                  icon: 'ri-robot-line',
                  title: 'Automatisation',
                  desc: 'Agents IA pour la conformité, le SEO, la veille réglementaire.',
                },
                {
                  icon: 'ri-bar-chart-box-line',
                  title: 'Pilotage Stratégique',
                  desc: 'Dashboards exécutifs, KPI, suivi des missions et de la performance.',
                },
                {
                  icon: 'ri-shield-flash-line',
                  title: 'Conformité Réglementaire',
                  desc: 'Outils d\'audit pré-inspection, LCB/FT, due diligence.',
                },
                {
                  icon: 'ri-global-line',
                  title: 'Visibilité Institutionnelle',
                  desc: 'SEO, GEO Authority, veille concurrentielle et positionnement.',
                },
                {
                  icon: 'ri-file-pdf-2-line',
                  title: 'Production Documentaire',
                  desc: 'Génération de livrables, business plans, rapports d\'audit.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background-100 rounded-lg border border-background-200 p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mb-3">
                    <i className={`${feature.icon} text-secondary-600 text-sm`} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Access CTA */}
          <section className="mt-10 md:mt-14 text-center">
            <a
              href="/kos-access/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-500 text-background-50 text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-login-box-line" />
              Accéder à KOS REGTECH AI
            </a>
            <p className="mt-3 text-xs text-foreground-400">
              Accès réservé aux collaborateurs Khepra Experts
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-4 md:px-6 border-t border-background-200/70 bg-background-100">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-foreground-400">
              &copy; {new Date().getFullYear()} KHEPRA EXPERTS SARL. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://khepraexperts.com/privacy" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">
                Confidentialité
              </a>
              <a href="/terms/" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">
                Conditions d&apos;Utilisation
              </a>
              <a href="/legal/" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">
                Mentions Légales
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}