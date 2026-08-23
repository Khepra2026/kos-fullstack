import { useRef, useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BoardHero from '';
import BoardCredibility from '';
import BoardHowItWorks from '';
import BoardForm from '';
import BoardOutput from '';
import BoardStickyBar from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

interface FormData {
  nomEntreprise: string;
  secteur: string;
  pays: string;
  nomPrenom: string;
  fonction: string;
  email: string;
  telephone: string;
  frequenceConseils: string;
  nombreAdministrateurs: string;
  comites: string[];
  chiffreAffaires: string;
  resultatNet: string;
  croissance: string;
  problemesFinanciers: string;
  projetsCours: string;
  defis: string;
  priorites: string;
  risques: string[];
  niveauConformite: string;
  besoinAccompagnement: string[];
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Générateur de Board Report du Conseil d\'Administration — KHEPRA EXPERTS',
  description: 'Outil gratuit pour générer un reporting complet de Conseil d\'Administration structuré, conforme BCEAO/OHADA, en moins de 30 minutes. Pour PME, banques, ONG en Afrique francophone.',
  url: `${SITE_URL}/board-report`,
  publisher: {
    '@type': 'Organization',
    name: 'KHEPRA EXPERTS',
    url: SITE_URL,
  },
  inLanguage: 'fr',
  keywords: 'board report, reporting conseil administration, gouvernance PME Afrique, BCEAO, OHADA, rapport CA, gouvernance entreprise',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce qu\'un Board Report (rapport Conseil d\'Administration) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un Board Report est un document de gouvernance structuré présenté lors des réunions du Conseil d\'Administration. Il synthétise la performance financière, la stratégie, les risques et la conformité réglementaire de l\'organisation pour permettre aux administrateurs de prendre des décisions éclairées.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment générer un rapport du Conseil d\'Administration conforme BCEAO/OHADA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notre outil gratuit vous guide en 5 étapes pour structurer votre rapport du Conseil d\'Administration selon les standards BCEAO et OHADA. Remplissez le formulaire intelligent, et votre rapport est généré instantanément avec un score de gouvernance et des recommandations personnalisées.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet outil est-il adapté aux PME africaines ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, notre générateur de Board Report est spécialement conçu pour les PME, banques, institutions de microfinance et ONG en Afrique francophone (UEMOA, CEMAC). Il tient compte des spécificités réglementaires locales (BCEAO, OHADA) et des réalités du tissu économique africain.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il pour générer un Board Report ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le formulaire prend environ 10 à 15 minutes à remplir. Le rapport est généré instantanément après soumission. L\'ensemble du processus prend moins de 30 minutes, sans compétence technique requise.',
      },
    },
  ],
};

export default function BoardReportPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSuccess = (data: FormData) => {
    setSubmittedData(data);
    setTimeout(() => {
      document.getElementById('board-output')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Générateur de Board Report du Conseil d'Administration gratuit — PME Afrique | KHEPRA EXPERTS"
        description="Produisez un rapport du Conseil d'Administration structuré, conforme BCEAO/OHADA en moins de 30 minutes. Outil gratuit pour PME, banques et ONG en Afrique francophone. Gouvernance entreprise OHADA."
        keywords="board report, reporting conseil administration modèle, gouvernance entreprise OHADA, rapport CA PME Afrique, BCEAO conformité, gouvernance PME Afrique francophone, UEMOA"
        canonicalPath="/board-report"
        ogType="website"
        ogImage="https://readdy.ai/api/search-image?query=executive%20african%20boardroom%20meeting%20with%20senior%20directors%20reviewing%20strategic%20financial%20reports%20on%20large%20screens%20professional%20governance%20council%20administration%20high%20level%20corporate%20setting%20with%20dark%20charcoal%20green%20accent%20lighting%20representing%20premium%20advisory%20services%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1200&height=630&seq=board-report-og-green&orientation=landscape"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="Générateur Board Report CA — KHEPRA EXPERTS"
        schemaJson={[pageSchema, faqSchema]}
      />

      <Navigation />

      {/* Hero */}
      <BoardHero onCTAClick={scrollToForm} />

      {/* Crédibilité */}
      <BoardCredibility />

      {/* Comment ça marche */}
      <BoardHowItWorks />

      {/* Formulaire */}
      <div ref={formRef}>
        {!submittedData ? (
          <BoardForm onSubmitSuccess={handleFormSuccess} />
        ) : (
          <div id="board-output">
            <BoardOutput data={submittedData} />
          </div>
        )}
      </div>

      {/* FAQ SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Questions fréquentes sur le Board Report
            </h2>
            <p className="text-gray-500 text-sm">Tout ce que vous devez savoir sur le reporting Conseil d&apos;Administration</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Qu'est-ce qu'un Board Report (rapport Conseil d'Administration) ?",
                a: "Un Board Report est un document de gouvernance structuré présenté lors des réunions du Conseil d'Administration. Il synthétise la performance financière, la stratégie, les risques et la conformité réglementaire de l'organisation pour permettre aux administrateurs de prendre des décisions éclairées. Selon les standards OHADA et BCEAO, ce document est obligatoire pour les institutions financières et fortement recommandé pour toutes les organisations.",
              },
              {
                q: "Comment générer un rapport du Conseil d'Administration conforme BCEAO/OHADA ?",
                a: "Notre outil gratuit vous guide en 5 étapes pour structurer votre rapport du Conseil d'Administration selon les standards BCEAO et OHADA. Remplissez le formulaire intelligent en 10-15 minutes, et votre rapport est généré instantanément avec un score de gouvernance, des analyses par domaine et des recommandations personnalisées.",
              },
              {
                q: "Cet outil est-il adapté aux PME africaines ?",
                a: "Oui, notre générateur de Board Report est spécialement conçu pour les PME, banques, institutions de microfinance (SFD) et ONG en Afrique francophone (UEMOA, CEMAC). Il tient compte des spécificités réglementaires locales (BCEAO, OHADA) et des réalités du tissu économique africain.",
              },
              {
                q: "Combien de temps faut-il pour générer un Board Report ?",
                a: "Le formulaire prend environ 10 à 15 minutes à remplir. Le rapport est généré instantanément après soumission. L'ensemble du processus prend moins de 30 minutes, sans compétence technique requise.",
              },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors list-none">
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <i className="ri-arrow-down-s-line text-gray-400 text-lg group-open:rotate-180 transition-transform duration-300 flex-shrink-0"></i>
                </summary>
                <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final avant footer */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à structurer votre gouvernance ?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Rejoignez les 600+ organisations africaines qui font confiance à KHEPRA EXPERTS pour leur gouvernance et leur performance financière.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4a82a, #b8891a)', color: '#06111e', boxShadow: '0 8px 32px rgba(212,168,42,0.4)' }}
            >
              <i className="ri-file-chart-line text-xl"></i>
              Créer mon Board Report gratuit
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(212,168,42,0.35)', color: '#d4a82a', background: 'rgba(212,168,42,0.06)' }}
            >
              <i className="ri-calendar-check-line text-xl"></i>
              Réserver un entretien stratégique
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky bar */}
      <BoardStickyBar onCTAClick={scrollToForm} />
    </div>
  );
}




