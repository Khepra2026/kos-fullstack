import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';
import ScrollReveal from '@/components/feature/ScrollReveal';

export default function CharteDeontologiquePage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/charte-deontologique#webpage`,
    name: isEn ? 'Ethics Charter — KHEPRA EXPERTS' : 'Charte Déontologique — KHEPRA EXPERTS',
    description: isEn
      ? 'Ethical charter and professional commitments of KHEPRA EXPERTS — consulting firm in strategy, finance and compliance in West Africa.'
      : 'Charte déontologique et engagements professionnels de KHEPRA EXPERTS — cabinet de conseil en stratégie, finance et conformité en Afrique de l\'Ouest.',
    url: `${SITE_URL}/charte-deontologique`,
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS' },
  };

  const chapters = isEn ? [
    { id: 'independence', num: '01', title: 'Independence & Objectivity', icon: 'ri-scales-line' },
    { id: 'confidentiality', num: '02', title: 'Confidentiality & Professional Secrecy', icon: 'ri-lock-line' },
    { id: 'conflicts', num: '03', title: 'Conflict of Interest Management', icon: 'ri-git-branch-line' },
    { id: 'quality', num: '04', title: 'Quality & Rigor of Deliverables', icon: 'ri-award-line' },
    { id: 'compliance', num: '05', title: 'Regulatory Compliance & Anti-Corruption', icon: 'ri-shield-check-line' },
    { id: 'data', num: '06', title: 'Data Protection & Client Rights', icon: 'ri-fingerprint-line' },
    { id: 'signalement', num: '07', title: 'Reporting Ethical Violations', icon: 'ri-alert-line' },
  ] : [
    { id: 'independence', num: '01', title: 'Indépendance & Objectivité', icon: 'ri-scales-line' },
    { id: 'confidentiality', num: '02', title: 'Confidentialité & Secret Professionnel', icon: 'ri-lock-line' },
    { id: 'conflicts', num: '03', title: 'Gestion des Conflits d\'Intérêts', icon: 'ri-git-branch-line' },
    { id: 'quality', num: '04', title: 'Qualité & Rigueur des Livrables', icon: 'ri-award-line' },
    { id: 'compliance', num: '05', title: 'Conformité Réglementaire & Anti-Corruption', icon: 'ri-shield-check-line' },
    { id: 'data', num: '06', title: 'Protection des Données & Droits du Client', icon: 'ri-fingerprint-line' },
    { id: 'signalement', num: '07', title: 'Signalement des Violations Éthiques', icon: 'ri-alert-line' },
  ];

  return (
    <>
      <SeoHead
        title={isEn ? 'Ethics Charter — KHEPRA EXPERTS' : 'Charte Déontologique — KHEPRA EXPERTS'}
        description={isEn
          ? 'Ethical charter and professional commitments of KHEPRA EXPERTS — consulting firm in strategy, finance and compliance in West Africa.'
          : 'Charte déontologique et engagements professionnels de KHEPRA EXPERTS — cabinet de conseil en stratégie, finance et conformité en Afrique de l\'Ouest.'}
        keywords={isEn
          ? 'ethics charter, professional secrecy, consulting compliance, OHADA, KHEPRA EXPERTS, corporate governance Africa'
          : 'charte déontologique, secret professionnel, conformité cabinet conseil, OHADA, KHEPRA EXPERTS, gouvernance entreprise Afrique'}
        canonicalPath="/charte-deontologique"
        ogImage={OG_DEFAULT_IMAGE}
        ogImageAlt={OG_DEFAULT_IMAGE_ALT}
        ogImageWidth="1200"
        ogImageHeight="630"
        structuredData={schema}
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main className="pt-0 pb-16">
          {/* Breadcrumb */}
          <div className="bg-background-100 border-b border-secondary-100 pt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <Breadcrumb
                variant="dark"
                items={[
                  { label: isEn ? 'Home' : 'Accueil', href: '/' },
                  { label: isEn ? 'Ethics Charter' : 'Charte déontologique' },
                ]}
              />
            </div>
          </div>

          {/* Hero */}
          <div
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #050c18 0%, #0a1525 50%, #050c18 100%)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,42,0.4), transparent)' }} />
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>
                  {isEn ? 'Professional Ethics' : 'Déontologie professionnelle'}
                </span>
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                {isEn ? 'Ethics Charter' : 'Charte Déontologique'}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {isEn
                  ? 'This charter formalizes the ethical and professional commitments of KHEPRA EXPERTS to its clients, partners, and regulatory authorities. It governs every mandate, every interaction, and every deliverable produced by our teams.'
                  : 'Cette charte formalise les engagements éthiques et professionnels de KHEPRA EXPERTS envers ses clients, ses partenaires et les autorités de régulation. Elle régit chaque mandat, chaque interaction et chaque livrable produit par nos équipes.'}
              </p>
            </div>
          </div>

          {/* Sommaire */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <ScrollReveal animation="fadeSlideUp">
              <div className="mb-14">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-6">
                  {isEn ? 'Our 7 Pillars of Professional Ethics' : 'Nos 7 piliers de déontologie professionnelle'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapters.map((ch) => (
                    <a
                      key={ch.id}
                      href={`#${ch.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}>
                        <i className={`${ch.icon} text-sm`} style={{ color: '#86BC25' }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{ch.num}</span>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{ch.title}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Chapitres */}
            <div className="space-y-16">
              {/* Chapitre 1 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="independence" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>01</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Independence & Objectivity' : 'Indépendance & Objectivité'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'KHEPRA EXPERTS maintains strict independence from all clients, financial institutions, and public authorities. Our analyses, recommendations, and diagnoses are conducted without external pressure, patronage, or any form of influence that could compromise the intellectual integrity of our deliverables.'
                        : 'KHEPRA EXPERTS maintient une indépendance stricte à l\'égard de tous ses clients, des institutions financières et des autorités publiques. Nos analyses, recommandations et diagnostics sont réalisés sans pression extérieure, sans patronage et sans aucune forme d\'influence pouvant compromettre l\'intégrité intellectuelle de nos livrables.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'Our consultants are formally prohibited from holding any financial interest — direct or indirect — in the entities they audit or advise. Any shareholding, board membership, or commercial relationship with a client is systematically declared and, if necessary, constitutes a ground for recusal.'
                        : 'Nos consultants sont formellement interdits de détenir tout intérêt financier — direct ou indirect — dans les entités qu\'ils auditent ou conseillent. Toute participation au capital, mandat d\'administrateur ou relation commerciale avec un client est systématiquement déclarée et, le cas échéant, constitue un motif de récusation.'}
                    </p>
                    <p>
                      {isEn
                        ? 'The objectivity of our opinions is guaranteed by a dual-review process: every strategic report, financial model, and governance assessment is validated by a senior partner before transmission to the client.'
                        : 'L\'objectivité de nos opinions est garantie par un processus de double relecture : chaque rapport stratégique, chaque modèle financier et chaque évaluation de gouvernance sont validés par un partenaire senior avant transmission au client.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 2 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="confidentiality" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>02</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Confidentiality & Professional Secrecy' : 'Confidentialité & Secret Professionnel'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'Professional secrecy is the absolute and non-negotiable foundation of the relationship between KHEPRA EXPERTS and its clients. All information, data, documents, and strategic insights exchanged during a mission are treated as strictly confidential, regardless of the contractual form or duration of the engagement.'
                        : 'Le secret professionnel constitue le fondement absolu et non négociable de la relation entre KHEPRA EXPERTS et ses clients. Toute information, donnée, document et analyse stratégique échangés dans le cadre d\'une mission sont traités comme strictement confidentiels, quelle que soit la forme contractuelle ou la durée de l\'engagement.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'KHEPRA EXPERTS never discloses the identity of its clients, their logos, or their operational data on its website, in its case studies, or in its marketing materials. All public references are anonymized and aggregated to preserve institutional confidentiality.'
                        : 'KHEPRA EXPERTS ne divulgue jamais l\'identité de ses clients, leurs logos ni leurs données opérationnelles sur son site internet, dans ses études de cas ou dans ses supports de communication. Toute référence publique est anonymisée et agrégée pour préserver la confidentialité institutionnelle.'}
                    </p>
                    <p>
                      {isEn
                        ? 'Upon simple request, a bilateral Non-Disclosure Agreement (NDA) can be signed before the start of any mission. Our data infrastructure is hosted on ISO 27001 certified servers, and all our consultants are bound by a strict confidentiality clause in their employment contracts.'
                        : 'Sur simple demande, un accord de confidentialité bilatéral (NDA) peut être signé avant le démarrage de toute mission. Notre infrastructure de données est hébergée sur des serveurs certifiés ISO 27001, et l\'ensemble de nos consultants est lié par une clause stricte de confidentialité dans leurs contrats de travail.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 3 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="conflicts" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>03</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Conflict of Interest Management' : 'Gestion des Conflits d\'Intérêts'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'Before any mission begins, KHEPRA EXPERTS systematically conducts a conflict of interest check. This process involves cross-referencing the client, its subsidiaries, its major shareholders, and its key partners with our active and past client portfolio.'
                        : 'Avant tout démarrage de mission, KHEPRA EXPERTS effectue systématiquement une vérification des conflits d\'intérêts. Ce processus consiste à croiser le client, ses filiales, ses actionnaires majoritaires et ses partenaires clés avec notre portefeuille de clients actifs et passés.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'In the event of a real or potential conflict, the situation is immediately brought to the attention of the client. Three options are then proposed: recusal of the team member concerned, structural separation of the engagement teams, or, if the conflict is irreconcilable, polite refusal of the mandate.'
                        : 'En cas de conflit réel ou potentiel, la situation est immédiatement portée à la connaissance du client. Trois options sont alors proposées : la récusation du collaborateur concerné, la séparation structurelle des équipes de mission, ou, si le conflit est irréconciliable, le refus poli du mandat.'}
                    </p>
                    <p>
                      {isEn
                        ? 'KHEPRA EXPERTS also refrains from accepting mandates that could lead to a situation of economic dependence on a single client, thus preserving its freedom of analysis and strategic recommendations.'
                        : 'KHEPRA EXPERTS s\'abstient également d\'accepter des mandats qui pourraient conduire à une situation de dépendance économique vis-à-vis d\'un seul client, préservant ainsi sa liberté d\'analyse et de recommandation stratégique.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 4 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="quality" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>04</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Quality & Rigor of Deliverables' : 'Qualité & Rigueur des Livrables'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'Every deliverable produced by KHEPRA EXPERTS undergoes a three-tier quality control: technical validation by the consultant, methodological review by the engagement manager, and final approval by the partner in charge. This process ensures the accuracy, consistency, and strategic relevance of our recommendations.'
                        : 'Chaque livrable produit par KHEPRA EXPERTS est soumis à un contrôle qualité en trois niveaux : validation technique par le consultant, relecture méthodologique par le chef de mission, et approbation finale par le partenaire responsable. Ce processus garantit la justesse, la cohérence et la pertinence stratégique de nos recommandations.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'Our methodologies are aligned with international standards (COSO, CAMELS, IFC Performance Standards, Basel III) and the regulatory frameworks of the BCEAO, COBAC, and OHADA. We do not compromise on the rigor of our financial models, governance diagnostics, or compliance assessments.'
                        : 'Nos méthodologies sont alignées sur les standards internationaux (COSO, CAMELS, Normes de Performance IFC, Bâle III) et les cadres réglementaires de la BCEAO, du COBAC et de l\'OHADA. Nous ne transigeons pas sur la rigueur de nos modèles financiers, de nos diagnostics de gouvernance ni de nos évaluations de conformité.'}
                    </p>
                    <p>
                      {isEn
                        ? 'In the event of an error or omission in a delivered report, KHEPRA EXPERTS undertakes to correct it within 72 hours and to communicate transparently with the client on the corrective measures implemented.'
                        : 'En cas d\'erreur ou d\'omission dans un rapport livré, KHEPRA EXPERTS s\'engage à la corriger dans un délai de 72 heures et à communiquer de manière transparente avec le client sur les mesures correctives mises en œuvre.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 5 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="compliance" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>05</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Regulatory Compliance & Anti-Corruption' : 'Conformité Réglementaire & Anti-Corruption'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'KHEPRA EXPERTS strictly complies with the legal and regulatory provisions applicable in the jurisdictions where it operates, including OHADA law, the BCEAO and COBAC prudential frameworks, and the anti-corruption laws of the UEMOA and CEMAC zones.'
                        : 'KHEPRA EXPERTS se conforme strictement aux dispositions légales et réglementaires applicables dans les juridictions où il intervient, notamment le droit OHADA, les cadres prudentiels de la BCEAO et du COBAC, ainsi que les lois anti-corruption des zones UEMOA et CEMAC.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'Our firm has a zero-tolerance policy toward corruption, bribery, and influence peddling. No consultant may accept gifts, benefits, or commissions from a client, a supplier, or a third party in connection with a professional mission. This policy is formalized in an internal code of conduct signed by all employees.'
                        : 'Notre cabinet applique une politique de tolérance zéro envers la corruption, le pot-de-vin et le trafic d\'influence. Aucun consultant ne peut accepter de cadeaux, avantages ou commissions d\'un client, d\'un fournisseur ou d\'un tiers dans le cadre d\'une mission professionnelle. Cette politique est formalisée dans un code de conduite interne signé par l\'ensemble des collaborateurs.'}
                    </p>
                    <p>
                      {isEn
                        ? 'KHEPRA EXPERTS is registered with the CFE of Lomé under RCCM TG-LFW-01-2026-B13-01347, holds NIF 1002124216, and operates under the RÉEL tax regime. These credentials guarantee our legal transparency and our compliance with the tax obligations of the Republic of Togo.'
                        : 'KHEPRA EXPERTS est immatriculé au CFE de Lomé sous le RCCM TG-LFW-01-2026-B13-01347, détient le NIF 1002124216 et est soumis au régime fiscal RÉEL. Ces credentials garantissent notre transparence juridique et notre conformité aux obligations fiscales de la République togolaise.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 6 */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="data" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>06</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Data Protection & Client Rights' : 'Protection des Données & Droits du Client'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'KHEPRA EXPERTS complies with the provisions of Togolese Law No. 2019-014 of October 29, 2019 on the protection of personal data (APDP Togo). All personal data collected during our missions are processed lawfully, fairly, and transparently, with a defined purpose and a limited retention period.'
                        : 'KHEPRA EXPERTS se conforme aux dispositions de la loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République togolaise (APDP Togo). Toutes les données personnelles collectées dans le cadre de nos missions sont traitées légalement, loyalement et de manière transparente, avec une finalité définie et une durée de conservation limitée.'}
                    </p>
                    <p className="mb-4">
                      {isEn
                        ? 'The client retains full ownership of all data, documents, and models produced during the mission. KHEPRA EXPERTS undertakes not to reuse, resell, or exploit this data for purposes other than the execution of the agreed assignment. At the end of the contract, all original files are returned to the client or securely destroyed upon their request.'
                        : 'Le client conserve la pleine propriété de l\'ensemble des données, documents et modèles produits dans le cadre de la mission. KHEPRA EXPERTS s\'engage à ne pas réutiliser, revendre ou exploiter ces données à d\'autres fins que l\'exécution du mandat convenu. À l\'issue du contrat, l\'ensemble des fichiers originaux est restitué au client ou détruit de manière sécurisée sur sa demande.'}
                    </p>
                    <p>
                      {isEn
                        ? 'Every client has the right to access, rectify, and delete their personal data. Requests in this regard must be sent to contact@khepraexperts.com and are processed within 30 days, in accordance with the APDP Togo regulatory framework.'
                        : 'Chaque client dispose d\'un droit d\'accès, de rectification et de suppression de ses données à caractère personnel. Les demandes en ce sens doivent être adressées à contact@khepraexperts.com et sont traitées dans un délai de 30 jours, conformément au cadre réglementaire de l\'APDP Togo.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Chapitre 7 — Signalement des violations */}
              <ScrollReveal animation="fadeSlideUp">
                <section id="signalement" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,168,42,0.09)', color: '#6B9B1F', border: '1px solid rgba(212,168,42,0.18)' }}>07</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-5">
                    {isEn ? 'Reporting of Ethical Violations' : 'Signalement des Violations Éthiques'}
                  </h3>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      {isEn
                        ? 'KHEPRA EXPERTS has established a secure and confidential mechanism for reporting any violation of this Ethics Charter, professional standards, or applicable regulations. Any employee, consultant, client, partner, or third party who becomes aware of a breach of our ethical commitments is encouraged to report it without delay.'
                        : 'KHEPRA EXPERTS a mis en place un mécanisme sécurisé et confidentiel de signalement de toute violation de la présente Charte Déontologique, des standards professionnels ou des réglementations applicables. Tout collaborateur, consultant, client, partenaire ou tiers ayant connaissance d\'un manquement à nos engagements éthiques est invité à le signaler sans délai.'}
                    </p>
                    <p className="mb-4 font-semibold">
                      {isEn ? 'Reporting channels:' : 'Canaux de signalement :'}
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                      <li>
                        {isEn
                          ? 'Email (confidential): ethics@khepraexperts.com — accessible only to the Managing Partner and the DPO'
                          : 'Email (confidentiel) : ethique@khepraexperts.com — accessible uniquement au Directeur Associé et au DPO'}
                      </li>
                      <li>
                        {isEn
                          ? 'Postal mail (confidential): KHEPRA EXPERTS — Ethics Officer — LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)'
                          : 'Courrier postal (confidentiel) : KHEPRA EXPERTS — Responsable Éthique — LOGOGOMÈ, Rue CARREFOUR AISED, LOMÉ (Togo)'}
                      </li>
                      <li>
                        {isEn
                          ? 'In-person meeting: upon request, with the Managing Partner or the DPO, under strict confidentiality'
                          : 'Entretien en personne : sur demande, avec le Directeur Associé ou le DPO, sous stricte confidentialité'}
                      </li>
                    </ul>
                    <p className="mb-4 font-semibold">
                      {isEn ? 'Our commitments to the reporter:' : 'Nos engagements envers le lanceur d\'alerte :'}
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                      <li>
                        {isEn
                          ? 'Absolute confidentiality of the reporter\'s identity, unless expressly authorized by them'
                          : 'Confidentialité absolue de l\'identité du lanceur d\'alerte, sauf autorisation expresse de sa part'}
                      </li>
                      <li>
                        {isEn
                          ? 'Protection against any form of retaliation, discrimination, or disciplinary sanction'
                          : 'Protection contre toute forme de représailles, discrimination ou sanction disciplinaire'}
                      </li>
                      <li>
                        {isEn
                          ? 'Systematic acknowledgment of receipt within 48 hours and a written follow-up on the status of the investigation within 30 days'
                          : 'Accusé de réception systématique sous 48h et suivi écrit de l\'état d\'avancement de l\'enquête sous 30 jours'}
                      </li>
                      <li>
                        {isEn
                          ? 'Thorough, impartial investigation conducted by the DPO or an external independent expert if the situation so requires'
                          : 'Enquête approfondie et impartiale menée par le DPO ou un expert externe indépendant si la situation l\'exige'}
                      </li>
                      <li>
                        {isEn
                          ? 'Corrective and preventive measures implemented within 60 days of the investigation\'s conclusion'
                          : 'Mesures correctives et préventives mises en œuvre dans les 60 jours suivant la conclusion de l\'enquête'}
                      </li>
                    </ul>
                    <p>
                      {isEn
                        ? 'KHEPRA EXPERTS maintains a register of ethical reports, strictly confidential and accessible only to the Managing Partner and the DPO. This register is audited annually by the Quality Review AI Agent as part of the Big Four compliance process.'
                        : 'KHEPRA EXPERTS tient un registre des signalements éthiques, strictement confidentiel et accessible uniquement au Directeur Associé et au DPO. Ce registre est audité annuellement par l\'Agent Quality Review AI dans le cadre du processus de conformité Big Four.'}
                    </p>
                  </div>
                </section>
              </ScrollReveal>
            </div>

            {/* CTA Final */}
            <ScrollReveal animation="fadeSlideUp">
              <div className="mt-20 rounded-2xl p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #050c18 0%, #0a1525 100%)', border: '1px solid rgba(212,168,42,0.18)' }}>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-5" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.25)' }}>
                  <i className="ri-file-shield-line text-2xl" style={{ color: '#86BC25' }} />
                </div>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-3">
                  {isEn ? 'Download our Ethics Charter' : 'Télécharger notre Charte Déontologique'}
                </h3>
                <p className="text-sm leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {isEn
                    ? 'A signed PDF version of this charter can be provided upon request for your calls for tender, governance committees, or compliance audits.'
                    : 'Une version PDF signée de cette charte peut être fournie sur demande pour vos appels d\'offres, comités de gouvernance ou audits de conformité.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#050c18' }}
                  >
                    <i className="ri-mail-send-line" />
                    {isEn ? 'Request the signed version' : 'Demander la version signée'}
                  </Link>
                  <Link
                    to="/legal"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:opacity-80 cursor-pointer"
                    style={{ border: '1px solid rgba(212,168,42,0.35)', color: '#86BC25', background: 'transparent' }}
                  >
                    <i className="ri-arrow-right-line" />
                    {isEn ? 'Legal Notice' : 'Mentions légales'}
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Date de mise à jour */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {isEn ? 'Last updated: June 25, 2026 — Version 1.0' : 'Dernière mise à jour : 25 Juin 2026 — Version 1.0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isEn
                  ? '© KHEPRA EXPERTS. This charter is an integral part of our service contracts and is binding on all our consultants and partners.'
                  : '© KHEPRA EXPERTS. Cette charte fait partie intégrante de nos contrats de prestation et est contraignante pour l\'ensemble de nos consultants et partenaires.'}
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}