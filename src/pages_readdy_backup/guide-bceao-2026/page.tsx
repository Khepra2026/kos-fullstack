import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const guideBceaoSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}/guide-bceao-2026#article`,
      url: `${SITE_URL}/guide-bceao-2026`,
      headline: 'Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément',
      description: 'Téléchargez le guide des 7 contrôles BCEAO qui bloquent 80% des agréments. 15 pages de méthodologie, basé sur les circulaires 2024-2025 et 50+ missions terrain.',
      inLanguage: 'fr-FR',
      author: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
      },
      datePublished: '2026-01-01',
      dateModified: '2026-06-03',
      about: { '@type': 'Thing', name: 'Conformité BCEAO et agrément IMF UEMOA' },
      keywords: 'agrément BCEAO 2026, contrôles réglementaires IMF, conformité BCEAO, agrément SFD, circulaire BCEAO 2024',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guide-bceao-2026#webpage`,
      url: `${SITE_URL}/guide-bceao-2026`,
      name: 'Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément | KHEPRA',
      description: 'Téléchargez le guide des 7 contrôles BCEAO qui bloquent 80% des agréments. 15 pages de méthodologie, basé sur les circulaires 2024-2025 et 50+ missions terrain.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_URL}/lead-magnets` },
          { '@type': 'ListItem', position: 3, name: 'Guide BCEAO 2026', item: `${SITE_URL}/guide-bceao-2026` },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quels sont les 7 contrôles BCEAO qui bloquent les agréments ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les 7 contrôles critiques sont : (1) Gouvernance & Comités Spécialisés (Circulaire 01-2017), (2) Rémunération & Conflits d\'Intérêts, (3) Ratios Prudentiels Bâle III (Circulaire 03-2017), (4) LBC/FT & KYC (Directive 02-2015), (5) Systèmes d\'Information & Cyber-résilience, (6) ALM & Liquidité, (7) PCA/PCI & Continuité d\'Activité.',
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi 80% des agréments BCEAO sont-ils rejetés ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La majorité des rejets viennent d\'une documentation insuffisante sur les 7 contrôles critiques identifiés dans le guide. Chaque rejet entraîne 3 à 6 mois de retard supplémentaire et un coût d\'opportunité important pour l\'institution.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment obtenir le guide BCEAO 2026 gratuitement ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le guide PDF de 15 pages est téléchargeable gratuitement en remplissant le formulaire sur cette page. Vous recevrez immédiatement le guide par email avec les 7 contrôles détaillés et les templates de résolution.',
          },
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
    },
  ],
};

const FORM_URL = 'https://readdy.ai/api/form/d8g5dtbtvf9bji89p3k0';
const FORM_ID = 'guide-bceao-2026';

const ACCENT_COLOR = '#c9a227';

const SEVEN_CONTROLS = [
  {
    id: 1,
    title: 'Gouvernance & Comités Spécialisés',
    subtitle: 'Circulaire 01-2017',
    problem: 'Absence de comités spécialisés (Audit, Risques, Rémunération) ou composition non conforme (indépendance < 2/3).',
    fix: 'Template de chartes de comités, grille de compétences, et procédure de nomination conforme BCEAO.',
    delay: '0.1s',
  },
  {
    id: 2,
    title: 'Rémunération & Conflits d\'Intérêts',
    subtitle: 'Circulaire 01-2017',
    problem: 'Politique de rémunération non formalisée, absence de plafond variable, conflits non déclarés.',
    fix: 'Modèle de politique de rémunération avec ratios fixes/variables, registre des conflits.',
    delay: '0.2s',
  },
  {
    id: 3,
    title: 'Ratios Prudentiels Bâle III',
    subtitle: 'Circulaire 03-2017',
    problem: 'Ratio Cooke < 10%, ratio de liquidité à court terme < 100%, dépassement des limites de concentration.',
    fix: 'Calculateur de ratios, scénarios de stress test, plan de recapitalisation si nécessaire.',
    delay: '0.3s',
  },
  {
    id: 4,
    title: 'LBC/FT & KYC',
    subtitle: 'Directive 02-2015',
    problem: 'Manuel AML obsolète, profils de risque client non actualisés, STR non déposés dans les délais.',
    fix: 'Mise à jour du manuel AML, cartographie des risques client, procédure de déclaration automatique.',
    delay: '0.4s',
  },
  {
    id: 5,
    title: 'Systèmes d\'Information & Cyber-résilience',
    subtitle: 'Circulaire IT / COBAC R-01-2023',
    problem: 'Plan de continuité informatique non testé, backups non externalisés, audit de sécurité > 3 ans.',
    fix: 'PCA/PCI SI, test d\'intrusion annuel, politique de sécurité conforme ISO 27001.',
    delay: '0.5s',
  },
  {
    id: 6,
    title: 'ALM & Liquidité',
    subtitle: 'Réglementation monétaire BCEAO',
    problem: 'Maturité des actifs/passifs non appariée, absence de limites ALM, stress test liquidité non réalisé.',
    fix: 'Cadre ALM avec limites par bucket, scénarios de crise liquidité, plan de financement.',
    delay: '0.6s',
  },
  {
    id: 7,
    title: 'PCA / PCI & Continuité d\'Activité',
    subtitle: 'Circulaire 01-2017 / COBAC',
    problem: 'PCA testé > 1 an, site de secours inexistant, absence de plan de crise opérationnel.',
    fix: 'PCA annuel avec scénarios, exercice de crise documenté, site de secours opérationnel.',
    delay: '0.7s',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Nous avons obtenu notre agrément BCEAO en 4 mois au lieu des 12 mois prévus. Le guide nous a évité 3 rejets.',
    author: 'Directeur Général, SFD de 45 000 clients',
    location: 'Côte d\'Ivoire',
  },
  {
    quote: 'Le contrôle sur les comités spécialisés nous avait bloqué 2 fois. Avec le template, passage du 1er coup.',
    author: 'DGA, EMF agréée en 2025',
    location: 'Bénin',
  },
  {
    quote: 'Nous avons identifié 5 red flags grâce au guide. Le régulateur les a confirmés — mais nous avions déjà corrigé.',
    author: 'Directeur des Risques, Banque régionale',
    location: 'Sénégal',
  },
];

export default function GuideBCEAO2026Page() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    organization: '',
    position: '',
    country: '',
    balance_size: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>();

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.full_name.trim() || formData.full_name.length < 2) {
      errors.full_name = 'Veuillez indiquer votre nom complet';
    }
    if (!formData.email.trim()) {
      errors.email = 'Veuillez indiquer votre email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email invalide';
    }
    if (!formData.organization.trim()) {
      errors.organization = 'Veuillez indiquer le nom de votre institution';
    }
    if (!formData.position) {
      errors.position = 'Veuillez sélectionner votre fonction';
    }
    if (!formData.country) {
      errors.country = 'Veuillez sélectionner votre pays';
    }
    if (!formData.balance_size) {
      errors.balance_size = 'Veuillez indiquer la taille du bilan';
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormStatus('submitting');
    try {
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => params.append(k, v));
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <SeoHead
        title="Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément | KHEPRA"
        description="Téléchargez le guide des 7 contrôles BCEAO qui bloquent 80% des agréments. 15 pages de méthodologie, basé sur les circulaires 2024-2025 et 50+ missions terrain."
        keywords="agrément BCEAO 2026, contrôles réglementaires IMF, conformité BCEAO, agrément SFD, circulaire BCEAO 2024, audit BCEAO, guide conformité UEMOA"
        canonicalPath="/guide-bceao-2026"
        ogType="article"
        ogImage="https://readdy.ai/api/search-image?query=Professional%20African%20banking%20regulatory%20compliance%20guide%20document%20with%20BCEAO%20official%20stamps%20on%20mahogany%20desk%20warm%20golden%20amber%20lighting%20premium%20consulting%20firm%20atmosphere%20dark%20charcoal%20background%20with%20gold%20accents%20editorial%20photography%20style%20sophisticated%20and%20authoritative&width=1600&height=900&seq=guide-bceao-2026-og&orientation=landscape"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="Guide BCEAO 2026 - Les 7 contrôles qui bloquent votre agrément"
        schemaJson={guideBceaoSchema}
      />

      <div className="min-h-screen bg-white">
        {/* === A — ATTENTION : Hero === */}
        <section className="relative bg-brand-950 min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20African%20banking%20regulatory%20compliance%20guide%20document%20with%20BCEAO%20official%20stamps%20on%20mahogany%20desk%20warm%20golden%20amber%20lighting%20premium%20consulting%20firm%20atmosphere%20dark%20charcoal%20background%20with%20gold%20accents%20editorial%20photography%20style%20sophisticated%20and%20authoritative&width=1600&height=900&seq=guide-bceao-2026-hero&orientation=landscape"
              alt="Guide BCEAO 2026"
              className="w-full h-full object-cover object-top opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link to="/" className="hover:text-white/70">Accueil</Link></li>
                <li><i className="ri-arrow-right-s-line" /></li>
                <li><Link to="/lead-magnets" className="hover:text-white/70">Ressources</Link></li>
                <li><i className="ri-arrow-right-s-line" /></li>
                <li className="text-white/60">Guide BCEAO 2026</li>
              </ol>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              {/* Left: Hook */}
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500/15">
                    <i className="ri-file-shield-line text-2xl text-amber-400" />
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-bold bg-amber-500/15 text-amber-400">
                    PDF Gratuit — 15 pages
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                  Les 7 contrôles qui{' '}
                  <span className="text-amber-400">bloquent</span> votre agrément BCEAO
                </h1>
                <p className="text-lg text-white/70 mb-6 leading-relaxed">
                  <strong className="text-white">80% des dossiers sont rejetés au premier dépôt.</strong>{' '}
                  Ce guide identifie les 7 points de blocage que les IMF ignorent — et comment les résoudre en 90 jours.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <i className="ri-check-line text-amber-400" />
                    <span>Basé sur les 10 dernières circulaires BCEAO</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <i className="ri-check-line text-amber-400" />
                    <span>50+ missions terrain UEMOA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <i className="ri-check-line text-amber-400" />
                    <span>Templates prêts à l&apos;emploi</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400">85%</div>
                    <div className="text-xs text-white/50">de réussite au 1er dépôt</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400">15</div>
                    <div className="text-xs text-white/50">pages de méthodologie</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400">7</div>
                    <div className="text-xs text-white/50">contrôles décryptés</div>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-white rounded-2xl p-6 lg:sticky lg:top-24 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 mx-auto mb-3">
                    <i className="ri-file-shield-line text-2xl text-amber-600" />
                  </div>
                  <p className="text-sm font-bold text-foreground-900">Recevez le guide PDF</p>
                  <p className="text-xs text-foreground-500 mt-1">100% gratuit — Aucune carte requise</p>
                </div>
                {formStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 mx-auto mb-4">
                      <i className="ri-check-line text-3xl text-green-600" />
                    </div>
                    <p className="text-lg font-bold text-foreground-900 mb-2">Guide envoyé !</p>
                    <p className="text-sm text-foreground-600 mb-6">Vérifiez votre boîte email. Si vous ne voyez rien, vérifiez vos spams.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                    >
                      <i className="ri-arrow-left-line" />
                      Retour à l&apos;accueil
                    </Link>
                  </div>
                ) : (
                  <form
                    id={FORM_ID}
                    data-readdy-form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="full_name" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Dr. Amadou Koné"
                        className="w-full px-4 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                      />
                      {formErrors.full_name && <p className="text-xs text-red-500 mt-1">{formErrors.full_name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                        Email professionnel *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="amadou.kone@banque.ci"
                        className="w-full px-4 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                      />
                      {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                        Nom de la banque / institution *
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="SFD Avenir Plus"
                        className="w-full px-4 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                      />
                      {formErrors.organization && <p className="text-xs text-red-500 mt-1">{formErrors.organization}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="position" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                          Fonction *
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white"
                        >
                          <option value="">Choisir...</option>
                          <option value="dg">Directeur Général</option>
                          <option value="dga">Directeur Général Adjoint</option>
                          <option value="drc">Directeur des Risques</option>
                          <option value="rci">Responsable Contrôle Interne</option>
                          <option value="rlbc">Responsable LBC/FT</option>
                          <option value="ditc">Directeur IT</option>
                          <option value="autre">Autre</option>
                        </select>
                        {formErrors.position && <p className="text-xs text-red-500 mt-1">{formErrors.position}</p>}
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                          Pays *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white"
                        >
                          <option value="">Choisir...</option>
                          <option value="CI">Côte d&apos;Ivoire</option>
                          <option value="SN">Sénégal</option>
                          <option value="BJ">Bénin</option>
                          <option value="TG">Togo</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="ML">Mali</option>
                          <option value="CM">Cameroun</option>
                          <option value="GA">Gabon</option>
                          <option value="CG">Congo</option>
                          <option value="GN">Guinée</option>
                          <option value="NE">Niger</option>
                          <option value="autre">Autre</option>
                        </select>
                        {formErrors.country && <p className="text-xs text-red-500 mt-1">{formErrors.country}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="balance_size" className="block text-xs font-semibold text-foreground-700 mb-1.5">
                        Taille du bilan (FCFA) *
                      </label>
                      <select
                        id="balance_size"
                        name="balance_size"
                        value={formData.balance_size}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-foreground-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white"
                      >
                        <option value="">Choisir...</option>
                        <option value="moins-500m">Moins de 500M</option>
                        <option value="500m-1mrd">500M — 1Mrd</option>
                        <option value="1mrd-5mrd">1Mrd — 5Mrd</option>
                        <option value="5mrd-10mrd">5Mrd — 10Mrd</option>
                        <option value="plus-10mrd">Plus de 10Mrd</option>
                      </select>
                      {formErrors.balance_size && <p className="text-xs text-red-500 mt-1">{formErrors.balance_size}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3.5 rounded-lg font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ background: ACCENT_COLOR, color: '#0a0a0a' }}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <i className="ri-download-line" />
                          Recevoir le guide PDF gratuit
                        </>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-xs text-red-500 text-center">Une erreur est survenue. Veuillez réessayer.</p>
                    )}
                    <p className="text-xs text-foreground-400 text-center leading-relaxed">
                      Vos données sont protégées conformément au RGPD. Aucun spam. Vous pouvez vous désinscrire à tout moment.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* === I — INTÉRÊT : Le problème === */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
                <i className="ri-alert-line text-red-500" />
                <span className="text-sm font-bold text-red-700">Le problème réel</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-5">
                Pourquoi 80% des agréments sont rejetés
              </h2>
              <p className="text-lg text-foreground-600 leading-relaxed">
                Ce n&apos;est pas la volonté des équipes qui manque. C&apos;est la connaissance des <strong>contrôles spécifiques</strong> que l&apos;inspecteur BCEAO va vérifier — et comment structurer les documents pour passer ces contrôles du premier coup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 mb-4">
                  <i className="ri-close-circle-line text-2xl text-red-500" />
                </div>
                <p className="text-sm font-bold text-red-700 mb-2">Rejet au premier dépôt</p>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  80% des dossiers sont rejetés faute de documentation suffisante sur les 7 contrôles critiques. Chaque rejet = 3 à 6 mois de retard.
                </p>
              </div>
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 mb-4">
                  <i className="ri-time-line text-2xl text-orange-500" />
                </div>
                <p className="text-sm font-bold text-orange-700 mb-2">Retard cumulatif</p>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  En moyenne, 2 à 3 rejets successifs avant agrément. Soit 12 à 18 mois de retard — et une fenêtre de financement qui se ferme.
                </p>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-100 mb-4">
                  <i className="ri-coins-line text-2xl text-amber-600" />
                </div>
                <p className="text-sm font-bold text-amber-700 mb-2">Coût d&apos;opportunité</p>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Chaque mois de retard = perte de revenus, coûts de rémunération des équipes, et dégradation de la crédibilité auprès des bailleurs.
                </p>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-foreground-50 rounded-2xl border border-foreground-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground-900">80%</p>
                <p className="text-xs text-foreground-500 mt-1">de rejet au 1er dépôt</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground-900">14 mois</p>
                <p className="text-xs text-foreground-500 mt-1">délai moyen d&apos;agrément</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground-900">200M+</p>
                <p className="text-xs text-foreground-500 mt-1">FCFA de coût d&apos;opportunité</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground-900">2.3</p>
                <p className="text-xs text-foreground-500 mt-1">rejets en moyenne avant succès</p>
              </div>
            </div>
          </div>
        </section>

        {/* === D — DÉSIR : Les 7 contrôles === */}
        <section className="py-20 bg-foreground-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-6">
                <i className="ri-file-list-3-line text-amber-600" />
                <span className="text-sm font-bold text-amber-700">Contenu du guide</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-5">
                Les 7 contrôles décryptés un par un
              </h2>
              <p className="text-lg text-foreground-600 leading-relaxed">
                Pour chaque contrôle : le problème exact, le texte réglementaire applicable, et le template de résolution que nous utilisons sur le terrain.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {SEVEN_CONTROLS.map((control) => (
                <div
                  key={control.id}
                  className="bg-white rounded-xl border border-foreground-100 p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 text-sm font-bold"
                      style={{ backgroundColor: `${ACCENT_COLOR}15`, color: ACCENT_COLOR }}>
                      {control.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-bold text-foreground-900">{control.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-foreground-100 text-foreground-600">
                          {control.subtitle}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-xs font-bold text-red-700 mb-1">Le blocage</p>
                          <p className="text-sm text-foreground-700 leading-relaxed">{control.problem}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-xs font-bold text-green-700 mb-1">La solution</p>
                          <p className="text-sm text-foreground-700 leading-relaxed">{control.fix}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === D — DÉSIR : Preuves sociales === */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-4">
                Ils ont obtenu leur agrément avec cette méthode
              </h2>
              <p className="text-lg text-foreground-600">3 témoignages anonymisés de dirigeants d&apos;IMF en UEMOA</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-6 bg-foreground-50 rounded-2xl border border-foreground-100">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 mb-4">
                    <i className="ri-double-quotes-l text-amber-600" />
                  </div>
                  <p className="text-sm text-foreground-700 leading-relaxed mb-4 italic">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground-200 flex items-center justify-center text-xs font-bold text-foreground-600">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground-800">{t.author}</p>
                      <p className="text-xs text-foreground-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === A — ACTION : CTA final === */}
        <section className="py-20 bg-brand-950">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Ne laissez pas votre agrément bloquer par un contrôle que vous ignorez
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Recevez le guide PDF de 15 pages en 2 minutes. Identifiez les 7 contrôles qui bloquent votre agrément — et comment les résoudre avant le dépôt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="#guide-bceao-2026"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 hover:-translate-y-0.5"
                style={{ background: ACCENT_COLOR, color: '#0a0a0a' }}
              >
                <i className="ri-download-line" />
                Recevoir le guide PDF gratuit
              </a>
              <Link
                to="/diagnostic-flash"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm border border-white/30 text-white hover:bg-white/10 cursor-pointer whitespace-nowrap transition-all"
              >
                <i className="ri-flashlight-line" />
                Diagnostic flash gratuit
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <i className="ri-shield-check-line" /> Données RGPD
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-mail-close-line" /> Aucun spam
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-time-line" /> Lecture 30 min
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-file-pdf-line" /> PDF 15 pages
              </span>
            </div>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="py-8 bg-brand-900 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png"
                alt="KHEPRA EXPERTS"
                className="h-8 w-8 object-contain rounded-full"
              />
              <span className="text-sm font-bold text-white">KHEPRA EXPERTS</span>
            </div>
            <p className="text-xs text-white/40 text-center">
              © 2026 KHEPRA EXPERTS — Cabinet de conseil en conformité BCEAO/COBAC et gouvernance OHADA
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy/" className="text-xs text-white/40 hover:text-white/70 cursor-pointer">RGPD</Link>
              <Link to="/legal" className="text-xs text-white/40 hover:text-white/70 cursor-pointer">Mentions légales</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}



