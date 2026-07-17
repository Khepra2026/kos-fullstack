import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

export default function MerciSolvabilitePage() {
  const nav = useNavigate();

  return (
    <>
      <SeoHead
        title="Merci — Votre Rapport BCEAO 2026 est prêt | KOS Simulateur Solvabilité UEMOA"
        description="Votre rapport de simulation solvabilité BCEAO 2026 est prêt. Téléchargez le Template Plan de Capitalisation BCEAO — KBR exclusive KOS."
        canonicalPath="/tools/merci-solvabilite"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative bg-emerald-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950/30"></div>
          <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border-2 border-emerald-400/30 flex items-center justify-center">
              <i className="ri-check-double-line text-4xl text-emerald-400"></i>
            </div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold mb-4">Votre Rapport BCEAO 2026 est prêt !</h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-4">
              Votre simulation de solvabilité a été générée avec succès. 
              Vous allez recevoir votre rapport détaillé par email dans les prochaines minutes.
            </p>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Vérifiez votre boîte de réception et vos spams. L'email provient de <strong className="text-gray-400">noreply@khepra-experts.com</strong>.
            </p>
          </div>
        </section>

        {/* Upsell KBR */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 py-10">
          <div className="p-6 md:p-8 rounded-2xl bg-background-50 border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-background-50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-28 h-36 bg-foreground-950 rounded-lg flex items-center justify-center shadow-lg">
                  <div className="text-center text-white p-3">
                    <div className="text-[10px] font-bold text-amber-400 mb-1">KOS KBR</div>
                    <div className="text-xs font-heading font-bold leading-tight">Template Plan Capitalisation BCEAO</div>
                    <div className="mt-2 w-12 h-0.5 bg-amber-500 mx-auto"></div>
                    <div className="text-[9px] text-gray-400 mt-2">Knowledge Brief R02</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-3">
                  <i className="ri-vip-crown-line"></i>KBR Exclusive
                </span>
                <h2 className="text-xl font-heading font-bold text-foreground-950 mb-2">
                  Téléchargez le Template Plan de Capitalisation BCEAO
                </h2>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                  Cette KBR exclusive vous donne un <strong>modèle complet de plan de capitalisation</strong> aligné 
                  sur les exigences BCEAO 2026 : structure du document, jalons trimestriels, 
                  simulations d'impact, annexes réglementaires et checklist de soumission à la Commission Bancaire.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {['Plan 12 mois', 'Jalons BCEAO', 'Simulation Fonds Propres', 'Modèle Conseil', 'Checklist Soumission'].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-background-100 border border-background-200/70 text-foreground-500">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => nav('/tools/simulateur-solvabilite-resultat')}
                  className="whitespace-nowrap px-6 py-3 rounded-full bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <i className="ri-download-2-line"></i>
                  Télécharger la KBR (Gratuit)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What's next */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-8">
          <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 text-center">Prochaines étapes recommandées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: 'ri-file-chart-line',
                title: 'Diagnostic 360 Complet',
                desc: 'Audit intégral de votre conformité prudentielle sur 8 piliers BCEAO.',
                link: '/contact',
                cta: 'Planifier'
              },
              {
                icon: 'ri-linkedin-line',
                title: 'Partager sur LinkedIn',
                desc: 'Publiez votre démarche de conformité et gagnez en crédibilité.',
                link: '/tools/social-kit-solvabilite',
                cta: 'Kit Social'
              },
              {
                icon: 'ri-book-open-line',
                title: 'Explorer les KBR',
                desc: 'Accédez à notre bibliothèque de Knowledge Briefs réglementaires.',
                link: '/khepra-business-review',
                cta: 'Voir les KBR'
              }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="p-5 bg-background-50 rounded-xl border border-background-200/70 hover:border-amber-200 transition-colors cursor-pointer text-center group"
              >
                <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <h3 className="text-sm font-semibold text-foreground-950 mb-1">{item.title}</h3>
                <p className="text-xs text-foreground-500 mb-3">{item.desc}</p>
                <span className="text-xs font-semibold text-amber-600">{item.cta} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/tools/simulateur-solvabilite-uemoa" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-arrow-left-line mr-1.5"></i>Nouvelle Simulation
            </a>
            <a href="/tools/simulateur-solvabilite-resultat" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-file-chart-line mr-1.5"></i>Voir le Résultat
            </a>
            <a href="/" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-home-line mr-1.5"></i>Accueil KOS
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}