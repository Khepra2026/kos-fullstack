import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';

const KEY_TEXTS = [
  { ref: 'Instruction BCEAO n°010-08-2010', descFr: 'Instruction relative aux règles prudentielles applicables aux SFD dans l\'UMOA — ratios de solvabilité, de liquidité et division des risques.', descEn: 'Instruction on prudential rules applicable to Decentralized Financial Systems (DFS) in UEMOA — solvency, liquidity and risk diversification ratios.', type: 'SFD/Microfinance' },
  { ref: 'Décision n°013/24/06/2016/CM/UMOA', descFr: 'Dispositif prudentiel Bâle II/III applicable aux établissements de crédit et compagnies financières de l\'UMOA (CET1, Tier 1, Total Capital, coussins de conservation).', descEn: 'Basel II/III prudential framework applicable to credit institutions and financial companies in UMOA (CET1, Tier 1, Total Capital, conservation buffers).', type: 'Banques / Bâle III' },
  { ref: 'Règlement N°15/2002/CM/UEMOA', descFr: 'Relatif aux systèmes de paiement dans les États membres de l\'UEMOA. Socle juridique de STAR-UEMOA.', descEn: 'Relating to payment systems in UEMOA member states. Legal basis of STAR-UEMOA.', type: 'Systèmes de paiement' },
  { ref: 'Instruction BCEAO n°001/01/2024', descFr: 'Services de paiement dans l\'UMOA — interopérabilité PI-SPI, transparence tarifaire (notification 30 jours avant changement), protection des utilisateurs.', descEn: 'Payment services in UMOA — PI-SPI interoperability, tariff transparency (30-day notification before changes), user protection.', type: 'Fintech/Paiement' },
  { ref: 'Directive UEMOA n°02/2015/CM/UEMOA', descFr: 'Lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT) — Approche Fondée sur les Risques (AFR), KYC, déclarations de soupçon CENTIF, RCLBC/FT.', descEn: 'Anti-money laundering and terrorist financing (AML/CFT) — Risk-Based Approach (RBA), KYC, CENTIF suspicious transaction reports, AML Officer.', type: 'LBC/FT' },
  { ref: 'Instructions BCEAO n°010-08-2010 et n°017-12-2010', descFr: 'Règles prudentielles applicables aux SFD (ratios de solvabilité, liquidité, division des risques) et organisation du contrôle interne des SFD.', descEn: 'Prudential rules applicable to DFS (solvency, liquidity and risk division ratios) and internal control organization for DFS.', type: 'SFD / Contrôle interne' },
  { ref: 'Décision n°019/CM/UMOA du 21 décembre 2023', descFr: 'Loi Uniforme sur la Microfinance dans l\'UEMOA — texte fondateur le plus récent en cours de transposition dans les 8 États membres, modernisant le cadre juridique des SFD et IMF (agrément, fonctionnement, surveillance prudentielle).', descEn: 'Uniform Law on Microfinance in UEMOA — the most recent foundational text currently being transposed in the 8 member states, modernizing the legal framework for DFS and MFIs (licensing, operations, prudential supervision).', type: 'SFD/Microfinance — Loi Uniforme 2023' },
];

const RATIOS = [
  { name: 'Ratio de Solvabilité — Banques (CET1)', value: '≥ 4,5%', descFr: 'CET1 / Actifs pondérés par les risques (Décision n°013/24/06/2016/CM/UMOA — Bâle III). Avec coussin de conservation de 2,5%, l\'objectif cible est 7,0% CET1 / 10,5% Total Capital.', descEn: 'CET1 / Risk-weighted assets (Decision No. 013/24/06/2016/CM/UMOA — Basel III). With 2.5% conservation buffer, target is 7.0% CET1 / 10.5% Total Capital.', color: '#86BC25' },
  { name: 'Ratio de Liquidité', value: '≥ 100%', descFr: 'Actifs liquides / Passifs exigibles à court terme — applicable aux banques et aux SFD (Instruction n°010-08-2010 pour les SFD ; Instructions n°026-029-2016 pour les banques). Seuil impératif : 100%.', descEn: 'Liquid assets / Short-term liabilities — applicable to banks and DFS (Instruction No. 010-08-2010 for DFS; Instructions 026-029-2016 for banks). Mandatory threshold: 100%.', color: '#86BC25' },
  { name: 'Division des Risques — Banques', value: '≤ 75%', descFr: 'Engagements sur un seul bénéficiaire / Fonds propres nets des établissements de crédit. Source : Instructions n°026-029-11-2016. Note : les SFD ont des plafonds différents (25% par bénéficiaire — Instruction n°010-08-2010).', descEn: 'Commitments to a single beneficiary / Net equity of credit institutions. Source: Instructions 026-029-11-2016. Note: DFS have different ceilings (25% per beneficiary — Instruction 010-08-2010).', color: '#86BC25' },
  { name: 'Ratio de Solvabilité — SFD', value: '≥ 15%', descFr: 'Fonds propres nets / Actifs pondérés pour les SFD unitaires ; 10% pour les SFD affiliés à un réseau. Source : Instruction BCEAO n°010-08-2010. Distinct du ratio des banques commerciales.', descEn: 'Net equity / Risk-weighted assets for standalone DFS; 10% for network-affiliated DFS. Source: BCEAO Instruction No. 010-08-2010. Different from commercial bank ratio.', color: '#86BC25' },
];

const RATIO_DISCLAIMER = 'Les ratios présentés sont basés sur les textes réglementaires officiels en vigueur à la date de publication. Certains seuils peuvent varier selon la catégorie d\'institution. Il est recommandé de consulter directement les textes BCEAO (bceao.int) et le SG-CB-UMOA (cb-umoa.org) pour les valeurs exactes applicables à votre situation.';

const FAQS = [
  {
    qFr: 'Qu\'est-ce que la BCEAO ?',
    qEn: 'What is the BCEAO?',
    aFr: 'La Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO) est la banque centrale commune aux 8 États membres de l\'Union Économique et Monétaire Ouest-Africaine (UEMOA) : Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo. Elle est chargée de définir et de mettre en œuvre la politique monétaire, de réguler et superviser les établissements de crédit et les SFD.',
    aEn: 'The Central Bank of West African States (BCEAO) is the common central bank of the 8 member states of the West African Economic and Monetary Union (UEMOA): Benin, Burkina Faso, Ivory Coast, Guinea-Bissau, Mali, Niger, Senegal, Togo. It is responsible for defining and implementing monetary policy, regulating and supervising credit institutions and MFIs.',
  },
  {
    qFr: 'Qu\'est-ce que la Commission Bancaire de l\'UEMOA ?',
    qEn: 'What is the UEMOA Banking Commission?',
    aFr: 'La Commission Bancaire de l\'UEMOA (SG-Commission Bancaire) est l\'organe de surveillance des établissements de crédit et établissements de monnaie électronique dans l\'espace UEMOA. Elle prononce les sanctions et retraits d\'agréments. Khepra Experts a une expertise spécifique dans la préparation des dossiers d\'agrément et la gestion des mises en conformité post-inspection.',
    aEn: 'The UEMOA Banking Commission (SG-Banking Commission) is the supervisory body for credit institutions and electronic money institutions in the UEMOA area. It pronounces sanctions and withdrawal of authorizations. Khepra Experts has specific expertise in preparing authorization files and managing post-inspection compliance.',
  },
  {
    qFr: 'Comment obtenir un agrément BCEAO pour une fintech ou EME ?',
    qEn: 'How to obtain BCEAO authorization for a fintech or EME?',
    aFr: 'Le dossier d\'agrément BCEAO pour un Établissement de Monnaie Électronique (EME) ou un Établissement de Paiement comprend : actionnariat qualifié et capital minimum (1 Md CFA), business plan 5 ans, manuels de procédures opérationnelles, dispositif LBC/FT, plan de sécurité informatique, dispositif de protection des fonds des utilisateurs. Délai moyen d\'instruction : 12 à 24 mois. Khepra Experts accompagne de A à Z.',
    aEn: 'The BCEAO authorization file for an Electronic Money Institution (EMI) or Payment Institution includes: qualified shareholders and minimum capital (1 Bn CFA), 5-year business plan, operational procedure manuals, AML/CFT framework, IT security plan, user fund protection framework. Average processing time: 12 to 24 months. Khepra Experts supports the entire process.',
  },
  {
    qFr: 'Que risque une institution non conforme BCEAO ?',
    qEn: 'What does a non-compliant BCEAO institution risk?',
    aFr: 'Les sanctions de la Commission Bancaire de l\'UMOA (SG-CB-UMOA) vont de l\'injonction de mise en conformité à la restriction d\'activité, à la mise sous administration provisoire, ou au retrait d\'agrément dans les cas les plus graves. Des amendes administratives peuvent atteindre 10% des fonds propres requis selon la nature du manquement. La BCEAO élabore la réglementation ; le SG-CB-UMOA prononce les sanctions. Ces décisions relèvent de l\'appréciation souveraine des autorités compétentes. Ce document est fourni à titre informatif uniquement — toute décision doit être validée par les autorités compétentes.',
    aEn: 'UEMOA Banking Commission (SG-CB-UMOA) sanctions range from compliance injunction to activity restrictions, provisional administration, or license withdrawal in the most serious cases. Administrative fines can reach 10% of required own funds. The BCEAO sets the regulations; the SG-CB-UMOA issues sanctions. These decisions are at the sovereign discretion of the competent authorities. This document is for informational purposes only — all decisions must be validated by competent authorities.',
  },
];

export default function BCEAOHubPage() {
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
          ? 'BCEAO Guide — Prudential Compliance UEMOA, Ratios, Licensing | Khepra Experts'
          : 'Guide BCEAO — Conformité Prudentielle UEMOA, Ratios, Agrément | Khepra Experts'}
        description={isEn
          ? 'Complete guide to BCEAO regulatory compliance: prudential ratios Basel II/III, MFI licensing, UEMOA Banking Commission, AML/CFT GIABA. 22 years of BCEAO expertise. Khepra Experts.'
          : 'Guide complet sur la conformité réglementaire BCEAO : ratios prudentiels Bâle II/III, agrément SFD, Commission Bancaire UEMOA, LBC/FT GIABA. 22 ans d\'expertise BCEAO. Khepra Experts.'}
        keywords={isEn
          ? 'BCEAO compliance, UEMOA prudential ratios, Basel II III UEMOA, BCEAO licensing, banking commission UEMOA, MFI BCEAO, fintech BCEAO authorization, Khepra BCEAO expert'
          : 'conformité BCEAO, ratios prudentiels UEMOA, Bâle II III UEMOA, agrément BCEAO, commission bancaire UEMOA, SFD BCEAO, fintech agrément BCEAO, Khepra expert BCEAO'}
        canonicalPath="/knowledge-hub/bceao"
        schemaJson={schemaFaq}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #121928 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(212,168,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,42,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8">
              <button onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Khepra Experts</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <button onClick={() => navigate('/knowledge-hub')} className="cursor-pointer hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Knowledge Hub</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <span className="font-semibold" style={{ color: '#86BC25' }}>Gouvernance BCEAO</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.28)' }}>
              <i className="ri-bank-line text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>Knowledge Hub · BCEAO / UEMOA</span>
            </div>

            <h1 className="font-playfair font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>BCEAO Regulatory Guide<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Prudential Compliance UEMOA
                  </span>
                </>
              ) : (
                <>Guide Réglementaire BCEAO<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Conformité Prudentielle UEMOA
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {isEn
                ? 'Complete reference guide to BCEAO regulatory compliance in the UEMOA zone: prudential ratios, Basel II/III, MFI authorization, UEMOA Banking Commission, AML/CFT GIABA. By Khepra Experts — 22 years of expertise.'
                : 'Guide de référence complet sur la conformité réglementaire BCEAO dans la zone UEMOA : ratios prudentiels, Bâle II/III, agrément SFD, Commission Bancaire UEMOA, LBC/FT GIABA. Par Khepra Experts — 22 ans d\'expertise.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
              >
                <i className="ri-shield-check-line" />
                {isEn ? 'Free BCEAO Audit' : 'Audit BCEAO Gratuit'}
              </button>
              <button
                onClick={() => navigate('/sfd-conformite')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              >
                <i className="ri-file-list-3-line" />
                {isEn ? 'Licensing File' : 'Dossier d\'agrément'}
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
                {isEn ? 'Key BCEAO regulatory texts' : 'Principaux textes réglementaires BCEAO'}
              </h2>
              <div className="space-y-3">
                {KEY_TEXTS.map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.12)' }}>
                    <div className="flex-shrink-0 px-2 py-1 rounded-md text-xs font-bold" style={{ background: 'rgba(212,168,42,0.12)', color: '#6B9B1F' }}>
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

          {/* Prudential ratios */}
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                {isEn ? 'Key prudential ratios Basel II/III — UEMOA' : 'Principaux ratios prudentiels Bâle II/III — UEMOA'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RATIOS.map((r, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: `${r.color}06`, border: `1px solid ${r.color}20` }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-sm text-gray-900">{r.name}</p>
                      <span className="font-playfair text-xl font-bold" style={{ color: r.color }}>{r.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{isEn ? r.descEn : r.descFr}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 italic p-3 rounded-lg" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.12)' }}>
                {isEn
                  ? 'The ratios presented are based on the official regulatory texts in force at the date of publication. Thresholds may vary depending on the institution category. Consult bceao.int and cb-umoa.org for exact applicable values.'
                  : RATIO_DISCLAIMER}
              </p>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">FAQ — Conformité BCEAO</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.12)' }}>
                    <p className="font-bold text-gray-900 mb-2">{isEn ? faq.qEn : faq.qFr}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{isEn ? faq.aEn : faq.aFr}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)', borderTop: '1px solid rgba(212,168,42,0.15)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {isEn ? 'Secure your BCEAO compliance' : 'Sécurisez votre conformité BCEAO'}
            </h2>
            <p className="text-gray-500 mb-8">
              {isEn
                ? 'Our BCEAO experts guide you through all stages: audit, action plan, regulatory file, regulator support.'
                : 'Nos experts BCEAO vous guident à toutes les étapes : audit, plan d\'action, dossier réglementaire, accompagnement auprès des régulateurs.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a', boxShadow: '0 6px 24px rgba(212,168,42,0.35)' }}
              >
                <i className="ri-shield-check-line" />
                {isEn ? 'Start free audit' : 'Démarrer l\'audit gratuit'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#6B9B1F' }}
              >
                <i className="ri-mail-line" />
                {isEn ? 'Contact our BCEAO experts' : 'Contacter nos experts BCEAO'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}