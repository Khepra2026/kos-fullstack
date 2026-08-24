import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { supabase } from '@/lib/supabase';
import { errorTracker } from '@/utils/errorTracking';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CONTENTS = [
  'Les 4 piliers de la GRC : Gouvernance, ERM, LCB-FT, Contrôle Interne (3 lignes)',
  'Cadre réglementaire BCEAO (6 textes clés) et COBAC (6 textes clés)',
  'Ratios prudentiels et seuils de vigilance pour SFD et EMF',
  'Modèle de Conseil d\'Administration : composition, comités, indépendance',
  'Plan de continuité d\'activité (PCA) et plan de redressement (PPR)',
  'LCB-FT : KYC, détection des opérations suspectes, reporting CENTIF/ANIF',
  'Audit interne et 3 lignes de défense : rôles, responsabilités, reporting',
  'FAQ 15 questions sur la gouvernance des IMF en Afrique',
];

const FAQS = [
  {
    q: 'Qu\'est-ce que la gouvernance des IMF en Afrique ?',
    a: 'La gouvernance des IMF (Institutions de Microfinance) en Afrique est le cadre de règles, processus et structures qui dirigent et contrôlent les SFD (UEMOA) et EMF (CEMAC). Elle repose sur le Conseil d\'Administration, les comités spécialisés, le contrôle interne, la gestion des risques et la conformité réglementaire BCEAO/COBAC.',
  },
  {
    q: 'Quels sont les textes réglementaires cles pour les SFD en UEMOA ?',
    a: 'Les 6 textes cles sont : la Circulaire BCEAO 2021 (gouvernance), l\'Instruction 005-06-2010 (agrément), les Circulaires 01, 02, 03-2017 (comités, verrou, 3 lignes), et la Circulaire 001-2020 (plans préventifs).',
  },
  {
    q: 'Quels sont les ratios prudentiels minimaux pour les SFD ?',
    a: 'Les ratios prudentiels des SFD en UEMOA sont définis par les Instructions BCEAO n°010-08-2010 et n°017-12-2010. Les exigences clés incluent notamment : un ratio de solvabilité (fonds propres nets / actifs pondérés) de 15% pour les SFD unitaires et 10% pour les SFD affiliés à un réseau ; un ratio de liquidité de 100% minimum ; une limite de division des risques à 25% des fonds propres nets par bénéficiaire. Pour les EMF en CEMAC, le Règlement n°01/17/CEMAC/UMAC/COBAC fixe les exigences applicables. Il est impératif de vérifier les valeurs exactes directement dans les textes en vigueur sur bceao.int et beac.int.',
  },
  {
    q: 'Quelle est la difference entre SFD et EMF ?',
    a: 'SFD (Systèmes Financiers Décentralisés) est le terme utilisé en zone UEMOA (BCEAO). EMF (Établissements de Microfinance) est le terme utilisé en zone CEMAC (COBAC). Les deux désignent des institutions de microfinance soumises à des cadres réglementaires distincts mais convergents.',
  },
  {
    q: 'Le Conseil d\'Administration d\'une IMF doit-il etre independant ?',
    a: 'Oui, la Circulaire n°01-2017/CB/C de la Commission Bancaire de l\'UMOA et le Règlement COBAC n°01/17/CEMAC/UMAC/COBAC (complété par COBAC EMF R-2017/04) imposent des critères d\'indépendance. Les exigences exactes de composition et le pourcentage d\'administrateurs indépendants varient selon la catégorie d\'institution et les textes règlementaires applicables. Il est recommandé de consulter directement les textes officiels de la Commission Bancaire de l\'UMOA et de la COBAC.',
  },
  {
    q: 'Quel est le role du comite de risques dans une IMF ?',
    a: 'Le comité de risques supervise la politique de gestion des risques, valide les limites de risque, examine les rapports du contrôle interne, et s\'assure de la conformité avec les exigences prudentielles BCEAO/COBAC.',
  },
  {
    q: 'Quelle est la dernière évolution réglementaire majeure pour les SFD en UEMOA ?',
    a: 'La Décision n°019/CM/UMOA du 21 décembre 2023 portant Loi Uniforme sur la Microfinance dans l\'UEMOA est le texte fondateur le plus récent. En cours de transposition dans les 8 États membres, ce texte modernise le cadre juridique des Systèmes Financiers Décentralisés (SFD) et Institutions de Microfinance (IMF) en harmonisant les règles d\'agrément, de fonctionnement et de surveillance prudentielle. Les institutions doivent anticiper cette évolution pour sécuriser leur conformité future.',
  },
];

export default function GuideGouvernanceIMFPage() {
  const [form, setForm] = useState({ fullName: '', email: '', organization: '', position: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg('');
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Veuillez saisir votre nom complet.';
    if (!form.email.trim()) return 'Veuillez saisir votre email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Veuillez saisir un email valide.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setErrorMsg(err); return; }
    setStatus('loading');
    try {
      const { error: dbError } = await supabase.from('leads').insert({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        organization: form.organization.trim() || null,
        position: form.position.trim() || null,
        source_page: '/guide-gouvernance-imf',
        form_type: 'lead_magnet',
        lead_category: 'imf',
        status: 'new',
        lead_score: 65,
      });
      if (dbError) throw dbError;
      setStatus('success');
      setForm({ fullName: '', email: '', organization: '', position: '' });
    } catch (err) {
      errorTracker.captureError({
        message: (err as Error).message,
        stack: (err as Error).stack,
        type: 'error',
        context: { context: 'GuideGouvernanceIMFForm', page: '/guide-gouvernance-imf' },
      });
      setStatus('error');
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/guide-gouvernance-imf#webpage`,
        url: `${SITE_URL}/guide-gouvernance-imf`,
        name: 'Guide Gouvernance IMF Afrique — KHEPRA EXPERTS',
        description: 'Téléchargez gratuitement le guide de gouvernance des IMF en Afrique : cadre BCEAO/COBAC, ratios prudentiels, contrôle interne, LCB-FT et FAQ.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/guide-gouvernance-imf#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/guide-gouvernance-imf#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/resources` },
          { '@type': 'ListItem', position: 3, name: 'Guide Gouvernance IMF', item: `${SITE_URL}/guide-gouvernance-imf` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/guide-gouvernance-imf#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Guide Gouvernance IMF Afrique — Téléchargement Gratuit | KHEPRA EXPERTS"
        description="Guide complet de gouvernance des IMF en Afrique : cadre BCEAO/COBAC, ratios prudentiels, contrôle interne, LCB-FT, comités spécialisés et FAQ. Téléchargez gratuitement."
        keywords="gouvernance IMF afrique, guide BCEAO SFD, conformité COBAC EMF, ratios prudentiels microfinance, contrôle interne IMF, LCB-FT afrique, comités administrateurs BCEAO"
        canonicalPath="/guide-gouvernance-imf"
        ogType="article"
        ogImage={OG_IMAGES.RESOURCES}
        ogImageAlt="Guide Gouvernance IMF Afrique — KHEPRA EXPERTS"
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        structuredData={jsonLd}
      />

      <Navigation />

      <div className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/resources' },
            { label: 'Guide Gouvernance IMF', href: '/guide-gouvernance-imf' },
          ]}
        />

        <section
          className="relative pt-28 pb-16 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)' }} />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #22a05a 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
                  <i className="ri-file-download-line text-gold-400" />
                  <span className="text-sm font-medium text-gold-400">Guide Gratuit — 44 pages</span>
                </div>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Guide Gouvernance IMF
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Le référentiel complet de gouvernance pour les SFD, IMF et EMF en Afrique francophone. Cadre réglementaire BCEAO et COBAC, ratios prudentiels, contrôle interne, LCB-FT et modèles de comités.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <i className="ri-check-line text-green-400" />
                    50+ SFD accompagnés
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <i className="ri-check-line text-green-400" />
                    22 ans expertise
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <i className="ri-check-line text-green-400" />
                    UEMOA · CEMAC · OHADA
                  </span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-2xl mb-6">
                    <i className="ri-government-line text-5xl text-gold-400" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-3">Contenu du guide</h3>
                  <ul className="space-y-3">
                    {CONTENTS.slice(0, 4).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <i className="ri-check-line text-gold-400 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                    <li className="text-sm text-gold-400 font-medium">+ 4 chapitres supplémentaires</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-32 bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl mb-6">
                  <i className="ri-download-cloud-line text-2xl text-white" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
                  Téléchargez gratuitement
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Remplissez le formulaire pour recevoir instantanément le guide PDF. Vos données ne seront jamais partagées.
                </p>

                {status === 'success' ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-check-line text-3xl text-green-600" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Merci !</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Votre guide vous a été envoyé par email. Vérifiez votre boîte de réception (et vos spams).
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white text-sm font-medium rounded-lg hover:bg-brand-800 transition-colors cursor-pointer"
                    >
                      <i className="ri-calendar-line" />
                      Réserver un appel stratégique
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                        placeholder="jean.dupont@entreprise.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                        placeholder="Nom du SFD ou de la cooperative"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                      <input
                        type="text"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                        placeholder="Directeur General, DAF, etc."
                      />
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <i className="ri-error-warning-line text-red-500 mt-0.5" />
                        <p className="text-sm text-red-700">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-900 to-brand-800 text-white font-semibold rounded-lg hover:from-brand-800 hover:to-brand-700 transition-all disabled:opacity-60 cursor-pointer whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <i className="ri-download-line" />
                          Recevoir le guide PDF
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      En téléchargeant, vous acceptez de recevoir nos analyses mensuelles (désinscription possible à tout moment).
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="font-playfair text-3xl font-bold text-brand-900 mb-6">
                Ce que vous allez apprendre
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {CONTENTS.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-gold-100 rounded-lg flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-gold-600" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-2xl p-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-full flex-shrink-0">
                    <i className="ri-double-quotes-l text-gold-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-white text-base italic leading-relaxed mb-4">
                      "Ce guide nous a permis de restructurer notre Conseil d'Administration et de mettre en place les 3 comités réglementaires en 3 mois. Les modèles de PV et de reporting sont directement utilisables."
                    </p>
                    <div className="text-sm text-gray-300">
                      <strong className="text-gold-400">Directeur General</strong>
                      <span className="block">SFD, Togo</span>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-playfair text-3xl font-bold text-brand-900 mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4 mb-12">
                {FAQS.map((f, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-brand-900 mb-2 flex items-start gap-2">
                      <i className="ri-question-line text-gold-500 mt-1" />
                      {f.q}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-3">
                  Besoin d'un accompagnement gouvernance sur mesure ?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Nos équipes accompagnent les SFD, EMF et cooperatives dans leur mise en conformité réglementaire, leur structuration de gouvernance et leur audit interne depuis 22 ans.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/services/transformation-digitale"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-900 to-brand-800 text-white font-semibold rounded-lg hover:from-brand-800 hover:to-brand-700 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-arrow-right-line" />
                    Découvrir nos services GRC
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-brand-900 text-brand-900 font-semibold rounded-lg hover:bg-brand-900 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-calendar-line" />
                    Réserver un appel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}



