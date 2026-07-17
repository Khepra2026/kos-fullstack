import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';

const COBAC_TEXTS = [
  { ref: 'Règlement COBAC n°01/17/CEMAC/UMAC/COBAC (27 sept. 2017)', descFr: 'Règlement de base régissant les Établissements de Microfinance (EMF) en CEMAC : classification en 3 catégories, conditions d\'agrément, exigences de gouvernance et de capital.', descEn: 'Core regulation governing Microfinance Institutions (MFIs) in CEMAC: 3-category classification, authorization conditions, governance and capital requirements.', type: 'EMF/Microfinance' },
  { ref: 'Règlement COBAC R-2016/03', descFr: 'Fonds propres nets des établissements de crédit en CEMAC — adhésion progressive aux standards Bâle III (CET1, Tier 1, Total Capital, coussin de conservation 2,5%).', descEn: 'Net equity of credit institutions in CEMAC — progressive alignment with Basel III standards (CET1, Tier 1, Total Capital, 2.5% conservation buffer).', type: 'Capital / Bâle III' },
  { ref: 'Règlement COBAC R-2020/01', descFr: 'Réforme de la division des risques — abaissement progressif du plafond par bénéficiaire de 45% à 25% des fonds propres nets (transition achève au 1er janvier 2023).', descEn: 'Risk concentration reform — progressive reduction of per-beneficiary ceiling from 45% to 25% of net equity (transition completed January 1, 2023).', type: 'Division des risques' },
  { ref: 'Règlement COBAC R-2016/04', descFr: 'Contrôle interne dans les établissements de crédit CEMAC (a abrogé le R-2001/07 et le R-93/08). Cartographie des risques, audit interne indépendant, manuel de procédures.', descEn: 'Internal control in CEMAC credit institutions (replaced R-2001/07 and R-93/08). Risk mapping, independent internal audit, procedures manual.', type: 'Contrôle interne' },
  { ref: 'Règlement COBAC R-2024/01 (en vigueur 1er jan. 2025)', descFr: 'Gouvernance des systèmes d\'information — responsabilité du Conseil d\'Administration, notification des incidents de sécurité au SG-COBAC, période transitoire 12-18 mois.', descEn: 'Information systems governance — Board of Directors accountability, security incident notification to SG-COBAC, 12-18 month transitional period.', type: 'Cybersécurité SI' },
  { ref: 'Règlement CEMAC n°01/16/CEMAC/UMAC/CM (11 avril 2016)', descFr: 'Prévention et répression du blanchiment des capitaux, du financement du terrorisme et de la prolifération (LBC/FT/FP) en Afrique Centrale. A abrogé et remplacé le Règlement n°01/03 de 2003.', descEn: 'Prevention and repression of money laundering, terrorist financing and proliferation financing (AML/CFT/CPF) in Central Africa. Repealed and replaced Regulation No. 01/03 of 2003.', type: 'LBC/FT/FP' },
];

const CEMAC_COUNTRIES = [
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', capital: 'Yaoundé' },
  { code: 'CF', name: 'Rép. Centrafricaine', flag: '🇨🇫', capital: 'Bangui' },
  { code: 'TD', name: 'Tchad', flag: '🇹🇩', capital: 'N\'Djamena' },
  { code: 'GQ', name: 'Guinée Équatoriale', flag: '🇬🇶', capital: 'Malabo' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', capital: 'Libreville' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', capital: 'Brazzaville' },
];

const FAQS = [
  {
    qFr: 'Qu\'est-ce que le COBAC ?',
    qEn: 'What is COBAC?',
    aFr: 'La Commission Bancaire de l\'Afrique Centrale (COBAC) est l\'organe supranational de supervision bancaire des 6 États membres de la Communauté Économique et Monétaire de l\'Afrique Centrale (CEMAC). Créée en 1992, elle assure la surveillance des banques, des microfinances (EMF) et des établissements financiers opérant dans la zone BEAC. La COBAC est un organe institué au sein de la BEAC (Banque des États de l\'Afrique Centrale), qui est l\'institution d\'émission de la zone CEMAC — ces deux institutions sont distinctes. La COBAC dispose de pouvoirs disciplinaires autonomes (injonction, restriction d\'activité, retrait d\'agrément).',
    aEn: 'The Banking Commission of Central Africa (COBAC) is the supranational banking supervisory body of the 6 member states of the Economic and Monetary Community of Central Africa (CEMAC). Created in 1992, it supervises banks, microfinances (MFIs) and financial institutions operating in the BEAC zone. COBAC is an organ established within the BEAC (Bank of Central African States), which is the issuing central bank of the CEMAC zone — these two institutions are distinct. COBAC has autonomous disciplinary powers (injunction, activity restriction, license withdrawal).',
  },
  {
    qFr: 'Quelles sont les principales différences entre BCEAO/SG-CB-UMOA et BEAC/COBAC ?',
    qEn: 'What are the main differences between BCEAO/SG-CB-UMOA and BEAC/COBAC?',
    aFr: 'La BCEAO est l\'institution d\'émission UEMOA — elle élabore la réglementation prudentielle. Le Secrétariat Général de la Commission Bancaire de l\'UMOA (SG-CB-UMOA) assure la supervision prudentielle des établissements dans les 8 pays UEMOA. La COBAC supervise les 6 pays CEMAC et est un organe de la BEAC (institution d\'émission CEMAC). Principales différences réglementaires : division des risques ≤ 75% (UEMOA, établissements de crédit) vs ≤ 25% (CEMAC, depuis le 1er janvier 2023, Règlement R-2020/01) ; le cadre LBC/FT UEMOA repose sur la Directive n°02/2015/CM/UEMOA, celui de la CEMAC sur le Règlement n°01/16/CEMAC/UMAC/CM du 11 avril 2016 (qui a abrogé et remplacé le Règlement n°01/03 de 2003). Attention : confondre BCEAO et SG-CB-UMOA, ou BEAC et COBAC, constitue une erreur juridique fréquente.',
    aEn: 'The BCEAO is the UEMOA issuing institution — it sets prudential regulations. The Secretariat General of the UMOA Banking Commission (SG-CB-UMOA) supervises credit institutions in 8 UEMOA countries. COBAC supervises the 6 CEMAC countries and is an organ of the BEAC (CEMAC issuing institution). Key regulatory differences: risk concentration ≤ 75% (UEMOA, credit institutions) vs ≤ 25% (CEMAC, since January 1, 2023, Regulation R-2020/01); the UEMOA AML/CFT framework is based on Directive 02/2015/CM/UEMOA, CEMAC\'s on Regulation 01/16/CEMAC/UMAC/CM of April 11, 2016 (which repealed and replaced Regulation 01/03 of 2003).',
  },
  {
    qFr: 'Comment obtenir un agrément COBAC pour un EMF ?',
    qEn: 'How to obtain COBAC authorization for an MFI?',
    aFr: 'L\'agrément d\'un EMF est délivré par le Ministre des Finances de l\'État membre concerné, sur avis conforme obligatoire de la COBAC et avis technique de la BEAC. Le dossier comprend notamment : étude de faisabilité avec business plan sur 5 ans, capital social intégralement libéré (300 M FCFA catégorie 2, 150 M FCFA catégorie 3 — Règlement COBAC R-2017/03), manuels de procédures, politique LBC/FT conforme au Règlement CEMAC n°01/16 de 2016, composition du Conseil d\'Administration (SA obligatoire pour les catégories 2 et 3 — COBAC EMF R-2017/04), CV et agrément des dirigeants. Délai d\'instruction variable selon la complétude du dossier.',
    aEn: 'MFI authorization is granted by the Minister of Finance of the member state, after COBAC\'s mandatory binding opinion and BEAC\'s technical opinion. The file includes: feasibility study with 5-year business plan, fully paid-up capital (CFAF 300M category 2, CFAF 150M category 3 — COBAC R-2017/03), procedure manuals, AML/CFT policy compliant with CEMAC Regulation 01/16 of 2016, Board of Directors composition (SA required for categories 2 and 3 — COBAC EMF R-2017/04), management CVs and authorization. Processing time varies based on file completeness.',
  },
  {
    qFr: 'Khepra Experts opère-t-il dans toute la zone CEMAC ?',
    qEn: 'Does Khepra Experts operate throughout the CEMAC zone?',
    aFr: 'Oui, Khepra Experts opère dans les 6 pays CEMAC (Cameroun, Congo, Gabon, Guinée Équatoriale, RCA, Tchad) ainsi que dans les 8 pays UEMOA. Nos équipes maîtrisent les spécificités réglementaires locales en plus du cadre COBAC/BEAC supranational et les textes nationaux de transposition.',
    aEn: 'Yes, Khepra Experts operates in all 6 CEMAC countries (Cameroon, Congo, Gabon, Equatorial Guinea, CAR, Chad) as well as in the 8 UEMOA countries. Our teams master local regulatory specificities in addition to the supranational COBAC/BEAC framework and national transposition texts.',
  },
];

export default function COBACHubPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: isEn ? faq.qEn : faq.qFr,
      acceptedAnswer: { '@type': 'Answer', text: isEn ? faq.aEn : faq.aFr },
    })),
  };

  return (
    <>
      <SeoHead
        title={isEn
          ? 'COBAC Guide — Regulatory Compliance CEMAC, MFI Authorization, BEAC | Khepra Experts'
          : 'Guide COBAC — Conformité Réglementaire CEMAC, Agrément EMF, BEAC | Khepra Experts'}
        description={isEn
          ? 'Complete guide to COBAC regulatory compliance in the CEMAC zone: Basel II prudential ratios, MFI authorization (1st, 2nd, 3rd category), GABAC AML/CFT, BEAC. Khepra Experts — 20+ countries.'
          : 'Guide complet sur la conformité réglementaire COBAC dans la zone CEMAC : ratios prudentiels Bâle II, agrément EMF (1ère, 2ème, 3ème catégorie), LBC/FT GABAC, BEAC. Khepra Experts — 20+ pays.'}
        keywords={isEn
          ? 'COBAC compliance, CEMAC prudential ratios, COBAC authorization, EMF COBAC, Basel II CEMAC, BEAC banking, Khepra COBAC expert, microfinance CEMAC authorization'
          : 'conformité COBAC, ratios prudentiels CEMAC, agrément COBAC, EMF COBAC, Bâle II CEMAC, banque BEAC, expert COBAC Khepra, agrément microfinance CEMAC'}
        canonicalPath="/knowledge-hub/cobac"
        schemaJson={schemaFaq}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #061810 0%, #0a1f14 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(34,160,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,160,90,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8">
              <button onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Khepra Experts</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <button onClick={() => navigate('/knowledge-hub')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Knowledge Hub</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <span className="font-semibold" style={{ color: '#22a05a' }}>Conformité COBAC</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(34,160,90,0.12)', border: '1px solid rgba(34,160,90,0.30)' }}>
              <i className="ri-shield-check-line text-xs" style={{ color: '#22a05a' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#22a05a' }}>Knowledge Hub · COBAC / CEMAC</span>
            </div>

            <h1 className="font-playfair font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>COBAC Regulatory Guide<br />
                  <span style={{ background: 'linear-gradient(90deg, #86efac, #22a05a, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Compliance CEMAC, MFI &amp; BEAC
                  </span>
                </>
              ) : (
                <>Guide Réglementaire COBAC<br />
                  <span style={{ background: 'linear-gradient(90deg, #86efac, #22a05a, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Conformité CEMAC, EMF &amp; BEAC
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {isEn
                ? 'Complete reference guide to COBAC regulatory compliance in the CEMAC zone: prudential ratios, MFI authorization, GABAC AML/CFT, BEAC. By Khepra Experts — 22 years of COBAC/CEMAC expertise in 6 countries.'
                : 'Guide de référence complet sur la conformité réglementaire COBAC dans la zone CEMAC : ratios prudentiels, agrément EMF, LBC/FT GABAC, BEAC. Par Khepra Experts — 22 ans d\'expertise COBAC/CEMAC dans 6 pays.'}
            </p>

            {/* CEMAC countries */}
            <div className="flex flex-wrap gap-3 mb-8">
              {CEMAC_COUNTRIES.map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span>{c.flag}</span>
                  <span className="text-white">{c.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #22a05a, #34d399)', color: '#fff' }}
              >
                <i className="ri-shield-check-line" />
                {isEn ? 'Free COBAC Audit' : 'Audit COBAC Gratuit'}
              </button>
              <button
                onClick={() => navigate('/sfd-conformite')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              >
                <i className="ri-file-list-3-line" />
                {isEn ? 'MFI Authorization File' : 'Dossier agrément EMF'}
              </button>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key texts */}
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                {isEn ? 'Key COBAC regulatory texts' : 'Principaux textes réglementaires COBAC'}
              </h2>
              <div className="space-y-3">
                {COBAC_TEXTS.map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.04)', border: '1px solid rgba(34,160,90,0.12)' }}>
                    <div className="flex-shrink-0 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap" style={{ background: 'rgba(34,160,90,0.12)', color: '#1a6b3c' }}>
                      {text.type}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 mb-1">{text.ref}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{isEn ? text.descEn : text.descFr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">FAQ — Conformité COBAC/CEMAC</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(34,160,90,0.04)', border: '1px solid rgba(34,160,90,0.12)' }}>
                    <p className="font-bold text-gray-900 mb-2">{isEn ? faq.qEn : faq.qFr}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{isEn ? faq.aEn : faq.aFr}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f0faf5 0%, #f9fffe 100%)', borderTop: '1px solid rgba(34,160,90,0.15)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {isEn ? 'Secure your COBAC compliance' : 'Sécurisez votre conformité COBAC'}
            </h2>
            <p className="text-gray-500 mb-8">
              {isEn
                ? 'Our COBAC/CEMAC experts support you in 6 CEMAC countries: regulatory audit, MFI authorization file, post-inspection action plan.'
                : 'Nos experts COBAC/CEMAC vous accompagnent dans les 6 pays CEMAC : audit réglementaire, dossier agrément EMF, plan d\'action post-inspection.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #22a05a, #34d399)', color: '#fff', boxShadow: '0 6px 24px rgba(34,160,90,0.35)' }}
              >
                <i className="ri-shield-check-line" />
                {isEn ? 'Start COBAC audit' : 'Démarrer l\'audit COBAC'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                style={{ border: '1.5px solid rgba(34,160,90,0.35)', color: '#1a6b3c' }}
              >
                <i className="ri-mail-line" />
                {isEn ? 'Contact our COBAC experts' : 'Contacter nos experts COBAC'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}