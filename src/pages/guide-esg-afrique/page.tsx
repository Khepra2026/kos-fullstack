import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const FORM_URL = 'https://readdy.ai/api/form/d8m5b9l0ihgem5t5p3tg';

const CONTENTS = [
  'Les 3 piliers ESG (Environmental, Social, Governance) appliqués à l\'Afrique',
  '6 standards internationaux : IFC PS 1-8, GRI, ISSB S1/S2, SASB, TCFD, GIABA',
  'Matrice de conformité ESG par type de projet (industrie, agro, finance, énergie)',
  'Checklist ESG pré-investissement pour fonds d\'impact et DFI',
  'Guide PGES (Plan de Gestion Environnementale et Sociale) step-by-step',
  'Cadre réglementaire BCEAO, COBAC, GIABA et directives nationales',
  'Cas pratiques : 3 projets africains avec leurs plans de remédiation ESG',
  'FAQ 15 questions sur l\'ESG en Afrique francophone',
];

const FAQS = [
  {
    q: 'Qu\'est-ce que l\'ESG Advisory en Afrique ?',
    a: 'L\'ESG Advisory est le conseil en matière de durabilité environnementale, sociale et de gouvernance. En Afrique, il s\'adapte aux contextes locaux tout en respectant les standards internationaux (IFC, GRI, ISSB) pour garantir l\'éligibilité aux financements DFI.',
  },
  {
    q: 'Les standards IFC PS 1-8 sont-ils applicables en zone UEMOA ?',
    a: 'Oui, les Normes de Performance IFC sont le référentiel de facto pour tous les projets financés par des DFI (IFC, BOAD, Proparco, BIDC) en Afrique. Elles s\'appliquent indépendamment du cadre national.',
  },
  {
    q: 'Quel est le délai pour réaliser un PGES ?',
    a: 'Un PGES (Plan de Gestion Environnementale et Sociale) prend 4 à 8 semaines selon la taille du projet. Pour les projets complexes (infrastructures, mines), le délai peut atteindre 12 semaines avec des études de base détaillées.',
  },
  {
    q: 'Un PGES est-il obligatoire pour obtenir un financement DFI ?',
    a: 'Oui, la quasi-totalité des financements DFI (IFC, BOAD, Proparco, BIDC, DEG) exigent un PGES conforme aux Normes de Performance IFC. Sans PGES, le projet est inéligible.',
  },
  {
    q: 'Quelle est la différence entre GRI, ISSB et SASB ?',
    a: 'GRI est un standard de reporting large (impact de l\'entreprise sur le monde). ISSB S1/S2 est le nouveau standard IFRS pour la disclosure financière des risques climatiques. SASB est sectoriel (metrics financièrement material). Les trois se complètent.',
  },
  {
    q: 'Comment intégrer l\'ESG dans une due diligence ?',
    a: 'L\'ESG DD couvre 4 axes : (1) conformité réglementaire et licences, (2) risques environnementaux (biodiversité, eau, déchets), (3) risques sociaux (communautés, droits humains, travail), (4) gouvernance (lutte anti-corruption, chaîne de valeur).',
  },
];

export default function GuideESGAfriquePage() {
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
      const body = new URLSearchParams();
      body.append('fullName', form.fullName.trim());
      body.append('email', form.email.trim().toLowerCase());
      body.append('organization', form.organization.trim() || '');
      body.append('position', form.position.trim() || '');
      body.append('source_page', '/guide-esg-afrique');
      body.append('form_type', 'lead_magnet');
      body.append('lead_category', 'investisseur');

      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      setStatus('success');
      setForm({ fullName: '', email: '', organization: '', position: '' });
    } catch (_err) {
      setStatus('error');
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/guide-esg-afrique#webpage`,
        url: `${SITE_URL}/guide-esg-afrique`,
        name: 'Guide ESG Afrique — KHEPRA EXPERTS',
        description: 'Téléchargez gratuitement le guide ESG en Afrique : standards IFC, GRI, ISSB, checklist pré-investissement, PGES step-by-step et FAQ.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/guide-esg-afrique#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/guide-esg-afrique#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/resources` },
          { '@type': 'ListItem', position: 3, name: 'Guide ESG Afrique', item: `${SITE_URL}/guide-esg-afrique` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/guide-esg-afrique#faq`,
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
        title="Guide ESG Afrique — Téléchargement Gratuit | KHEPRA EXPERTS"
        description="Guide ESG complet pour l'Afrique francophone : standards IFC PS 1-8, GRI, ISSB, matrice de conformité, PGES step-by-step et FAQ. Téléchargez gratuitement."
        keywords="ESG afrique, guide ESG uemoa, IFC PS 1-8, PGES afrique, ESG advisory afrique, GRI ISSB afrique, conformité ESG bceao cobac"
        canonicalPath="/guide-esg-afrique"
        ogType="article"
        ogImage={OG_IMAGES.RESOURCES}
        ogImageAlt="Guide ESG Afrique — KHEPRA EXPERTS"
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        structuredData={jsonLd}
      />

      <Navigation />

      <div className="min-h-screen bg-background-50">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/resources' },
            { label: 'Guide ESG Afrique', href: '/guide-esg-afrique' },
          ]}
        />

        <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-foreground-950 via-foreground-900 to-foreground-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-radial from-primary-500/40 to-transparent" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-radial from-accent-400/40 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary-500/15 border border-primary-500/30">
                  <i className="ri-file-download-line text-primary-400" />
                  <span className="text-sm font-medium text-primary-400">Guide Gratuit — 52 pages</span>
                </div>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-background-50 mb-6 leading-tight">
                  Guide ESG Afrique
                </h1>
                <p className="text-lg text-foreground-300 mb-8 leading-relaxed">
                  Le référentiel complet pour intégrer les critères ESG dans vos investissements et projets en Afrique. Standards IFC, GRI, ISSB, matrice de conformité par secteur, et modèle de PGES.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-foreground-400">
                    <i className="ri-check-line text-primary-400" />
                    6 standards maîtrisés
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-foreground-400">
                    <i className="ri-check-line text-primary-400" />
                    22 ans expertise
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-foreground-400">
                    <i className="ri-check-line text-primary-400" />
                    UEMOA · CEMAC · OHADA
                  </span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl mb-6">
                    <i className="ri-leaf-line text-5xl text-primary-400" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-background-50 mb-3">Contenu du guide</h3>
                  <ul className="space-y-3">
                    {CONTENTS.slice(0, 4).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-300">
                        <i className="ri-check-line text-primary-400 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                    <li className="text-sm text-primary-400 font-medium">+ 4 chapitres supplémentaires</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-32 bg-background-50 rounded-2xl border border-secondary-200 p-8">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-6">
                  <i className="ri-download-cloud-line text-2xl text-background-50" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-foreground-950 mb-3">
                  Téléchargez gratuitement
                </h2>
                <p className="text-sm text-foreground-600 mb-6">
                  Remplissez le formulaire pour recevoir instantanément le guide PDF. Vos données ne seront jamais partagées.
                </p>

                {status === 'success' ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-check-line text-3xl text-primary-600" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-foreground-950 mb-2">Merci !</h3>
                    <p className="text-sm text-foreground-600 mb-4">
                      Votre guide vous a été envoyé par email. Vérifiez votre boîte de réception (et vos spams).
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground-950 text-background-50 text-sm font-medium rounded-lg hover:bg-foreground-800 transition-colors cursor-pointer"
                    >
                      <i className="ri-calendar-line" />
                      Réserver un appel stratégique
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} data-readdy-form="" className="space-y-4">
                    <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 pointer-events-none w-0 h-0" />
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1">Nom complet *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1">Email professionnel *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="jean.dupont@entreprise.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1">Organisation</label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="Nom du fonds ou de la société"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1">Fonction</label>
                      <input
                        type="text"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-background-50 font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-60 cursor-pointer whitespace-nowrap"
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

                    <p className="text-xs text-foreground-500 text-center">
                      En téléchargeant, vous acceptez de recevoir nos analyses mensuelles (désinscription possible à tout moment).
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="font-playfair text-3xl font-bold text-foreground-950 mb-6">
                Ce que vous allez apprendre
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {CONTENTS.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-lg flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-primary-600" />
                    </div>
                    <span className="text-sm text-foreground-700 leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-foreground-950 to-foreground-900 rounded-2xl p-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary-500/20 rounded-full flex-shrink-0">
                    <i className="ri-double-quotes-l text-primary-300 text-xl" />
                  </div>
                  <div>
                    <p className="text-background-50 text-base italic leading-relaxed mb-4">
                      "Le guide ESG de KHEPRA nous a permis de structurer notre PGES pour un projet agro-industriel au Sénégal. La matrice de conformité par secteur a été un gain de temps énorme."
                    </p>
                    <div className="text-sm text-foreground-300">
                      <strong className="text-primary-300">Responsable Développement Durable</strong>
                      <span className="block">Fonds d'impact, Côte d'Ivoire</span>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-playfair text-3xl font-bold text-foreground-950 mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4 mb-12">
                {FAQS.map((f, i) => (
                  <div key={i} className="border border-secondary-200 rounded-xl p-5">
                    <h3 className="font-semibold text-foreground-950 mb-2 flex items-start gap-2">
                      <i className="ri-question-line text-primary-500 mt-1" />
                      {f.q}
                    </h3>
                    <p className="text-sm text-foreground-600 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border border-secondary-200">
                <h3 className="font-playfair text-2xl font-bold text-foreground-950 mb-3">
                  Besoin d'un accompagnement ESG sur mesure ?
                </h3>
                <p className="text-sm text-foreground-600 mb-6">
                  Nos équipes réalisent des PGES, des ESG DD et des stratégies de durabilité pour des investisseurs, des promoteurs et des entreprises en Afrique francophone depuis 22 ans.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/services/conseil-strategique"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-background-50 font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-arrow-right-line" />
                    Découvrir nos services ESG
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-foreground-950 text-foreground-950 font-semibold rounded-lg hover:bg-foreground-950 hover:text-background-50 transition-all cursor-pointer whitespace-nowrap"
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