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
  'Les 5 dimensions de l\'Investment Readiness (financier, gouvernance, modèle, équipe, croissance)',
  'Checklist investor-grade : 89 critères évalués par les fonds PE/VC et DFI',
  'Pitch deck, Teaser et Information Memorandum — modèles et best practices',
  'Modèle financier 5 ans : structure, hypothèses et ratios clés',
  'Data room virtuelle : documents obligatoires et organisation',
  'Due diligence interne (pre-DD) : anticiper les questions des investisseurs',
  'Mapping des investisseurs en Afrique francophone (PE, VC, DFI, impact)',
  'FAQ 15 questions sur la levée de fonds en Afrique',
];

const FAQS = [
  {
    q: 'Qu\'est-ce que l\'Investment Readiness ?',
    a: 'L\'Investment Readiness est l\'état de préparation d\'une entreprise pour recevoir un investissement institutionnel. Il couvre 5 dimensions : financière (books clean, modèle solide), gouvernance (board, compliance), modèle (scalabilité, unit economics), équipe (complétude, compétences) et croissance (trajectoire crédible).',
  },
  {
    q: 'Combien de temps faut-il pour devenir investment-ready ?',
    a: 'Le délai moyen est de 90 à 180 jours selon le point de départ. Une entreprise avec des books déjà structurés peut accélérer à 60 jours. Une entreprise nécessitant une refonte gouvernance et financière peut prendre 6 à 9 mois.',
  },
  {
    q: 'Quels documents sont indispensables pour une levée de fonds ?',
    a: 'Les documents essentiels sont : pitch deck (15-20 slides), business plan détaillé, modèle financier 5 ans (3 scénarios), Information Memorandum (20-30 pages), data room organisée (légal, financier, commercial, RH), et PGES si projet impact.',
  },
  {
    q: 'Quels types d\'investisseurs ciblent les PME africaines ?',
    a: 'Les 6 principaux types sont : fonds PE locaux (Adenia, Ascent), fonds régionaux (AfricInvest, TLcom), DFI (IFC, BOAD, Proparco, BIDC), fonds d\'impact (SAMA, Alitheia), business angels réseaux, et banques de développement.',
  },
  {
    q: 'Quelle valorisation est realiste pour une PME africaine ?',
    a: 'Les valorisations varient fortement selon le secteur. En agro-business : 3-5x EBITDA. En fintech : 5-10x revenus (selon la croissance). En industrie : 4-6x EBITDA. La méthode DCF reste le standard pour les investisseurs institutionnels.',
  },
  {
    q: 'Le guide couvre-t-il les spécificités UEMOA et CEMAC ?',
    a: 'Oui, le guide integre les cadres comptables SYSCOHADA (UEMOA) et OHADA (CEMAC), les exigences reglementaires BCEAO et COBAC, et les spécificités fiscales par zone pour les modèles financiers.',
  },
];

export default function GuideInvestmentReadinessPage() {
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
        source_page: '/guide-investment-readiness',
        form_type: 'lead_magnet',
        lead_category: 'investisseur',
        status: 'new',
        lead_score: 80,
      });
      if (dbError) throw dbError;
      setStatus('success');
      setForm({ fullName: '', email: '', organization: '', position: '' });
    } catch (err) {
      errorTracker.captureError({
        message: (err as Error).message,
        stack: (err as Error).stack,
        type: 'error',
        context: { context: 'GuideInvestmentReadinessForm', page: '/guide-investment-readiness' },
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
        '@id': `${SITE_URL}/guide-investment-readiness#webpage`,
        url: `${SITE_URL}/guide-investment-readiness`,
        name: 'Guide Investment Readiness Afrique — KHEPRA EXPERTS',
        description: 'Téléchargez gratuitement le guide Investment Readiness : 5 dimensions, checklist 89 critères, pitch deck, modèle financier, data room et mapping investisseurs Afrique.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/guide-investment-readiness#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/guide-investment-readiness#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/resources` },
          { '@type': 'ListItem', position: 3, name: 'Guide Investment Readiness', item: `${SITE_URL}/guide-investment-readiness` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/guide-investment-readiness#faq`,
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
        title="Guide Investment Readiness Afrique — Téléchargement Gratuit | KHEPRA EXPERTS"
        description="Guide Investment Readiness complet pour l'Afrique : 5 dimensions, checklist 89 critères, pitch deck, modèle financier, data room et mapping investisseurs. Téléchargez gratuitement."
        keywords="investment readiness afrique, guide levée de fonds afrique, pitch deck pme africaine, data room virtuelle, modèle financier 5 ans, investisseurs afrique francophone, PE VC afrique"
        canonicalPath="/guide-investment-readiness"
        ogType="article"
        ogImage={OG_IMAGES.RESOURCES}
        ogImageAlt="Guide Investment Readiness Afrique — KHEPRA EXPERTS"
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
            { label: 'Guide Investment Readiness', href: '/guide-investment-readiness' },
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
                  <span className="text-sm font-medium text-gold-400">Guide Gratuit — 56 pages</span>
                </div>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Guide Investment Readiness
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Le playbook complet pour préparer votre entreprise a une levée de fonds institutionnelle en Afrique. Checklist 89 critères, modèles de pitch deck et IM, data room, et mapping des investisseurs actifs en UEMOA et CEMAC.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <i className="ri-check-line text-green-400" />
                    120M+ EUR levés
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
                    <i className="ri-funds-line text-5xl text-gold-400" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-3">Contenu du guide</h3>
                  <ul className="space-y-3">
                    {CONTENTS.slice(0, 4).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <i className="ri-check-line text-gold-400 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                    <li className="text-sm text-gold-400 font-medium">+ 4 chapitres supplementaires</li>
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
                        placeholder="Nom du fonds ou de la société"
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
                        placeholder="Directeur des Investissements, DAF, etc."
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
                      "Grâce à ce guide, nous avons restructuré notre data room et notre modèle financier en 6 semaines. Le mapping des investisseurs nous a permis de cibler 3 fonds pertinents et de lever 2.5M EUR."
                    </p>
                    <div className="text-sm text-gray-300">
                      <strong className="text-gold-400">CEO & Fondateur</strong>
                      <span className="block">Fintech, Côte d'Ivoire</span>
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
                  Vous souhaitez lever des fonds avec un accompagnement expert ?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Nos équipes accompagnent des entreprises africaines dans leur préparation investor-ready, leur structuration et leur mise en relation avec des investisseurs institutionnels depuis 22 ans.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/services/levee-de-fonds"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-900 to-brand-800 text-white font-semibold rounded-lg hover:from-brand-800 hover:to-brand-700 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-arrow-right-line" />
                    Découvrir nos services
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