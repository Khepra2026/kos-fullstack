import { useState, useCallback } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { CalendlyWidget } from '@/components/feature/CalendlyWidget';
import { trackFormStart, trackFormSubmission } from '@/components/feature/ConversionTracker';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';
import { Breadcrumb } from '@/components/feature/Breadcrumb';

const DEVIS_FORM_URL = 'https://readdy.ai/api/form/d9552hdcb7lqctnurof0';

const TIERS = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    description: 'Pour les PME et IMF qui découvrent la conformité réglementaire',
    features: [
      'KOS Standard RAG : 50 requêtes/mois',
      '1 Board Report auto OHADA/mois',
      'Email support — réponse sous 72h',
      'Accès au baromètre UEMOA 2026',
      'Scanner conformité Art.49 (1/mois)',
      'Veille réglementaire standard',
    ],
    icon: 'ri-seedling-line',
    color: 'secondary',
  },
  {
    id: 'professionnel',
    name: 'Professionnel',
    description: 'Pour les DAF et directeurs conformité qui veulent dormir tranquilles',
    features: [
      'KOS Premium : 500 requêtes/mois',
      '5 Rapports Board + 3LD-Matrix illimité',
      'API accès lecture seule',
      'Support prioritaire — réponse sous 48h',
      'Scanner conformité illimité',
      'Veille réglementaire 24/7 personnalisée',
      'Export PDF Board Report COBAC',
      'Accès anticipé aux nouvelles réglementations',
    ],
    icon: 'ri-building-2-line',
    color: 'primary',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Pour les groupes bancaires et les institutions régionales',
    features: [
      'KOS White-label + marque propre',
      'API complète (lecture + écriture)',
      'SLA 99.99% + CSM dédié C-Level',
      'Déploiement on-premise BCEAO/COBAC',
      'Formation équipes internes',
      'Audit trimestriel par nos experts',
      'Intégration Core Banking (CBS)',
      'Conformité ISO 27001 & 42001 incluse',
    ],
    icon: 'ri-bank-line',
    color: 'accent',
  },
];

const COMPARISON_ROWS = [
  { label: 'Requêtes KOS RAG/mois', essentiel: '50', professionnel: '500', enterprise: 'Illimité' },
  { label: 'Board Report OHADA/mois', essentiel: '1', professionnel: '5', enterprise: 'Illimité' },
  { label: '3LD-Matrix™', essentiel: '—', professionnel: '✓', enterprise: '✓' },
  { label: 'API accès', essentiel: '—', professionnel: 'Lecture', enterprise: 'Complète' },
  { label: 'Support', essentiel: '72h email', professionnel: '48h prioritaire', enterprise: 'CSM dédié C-Level' },
  { label: 'Scanner conformité', essentiel: '1/mois', professionnel: 'Illimité', enterprise: 'Illimité + API' },
  { label: 'Veille réglementaire', essentiel: 'Standard', professionnel: 'Personnalisée 24/7', enterprise: 'Intégrée CBS' },
  { label: 'Déploiement', essentiel: 'Cloud', professionnel: 'Cloud', enterprise: 'On-premise BCEAO' },
  { label: 'White-label', essentiel: '—', professionnel: '—', enterprise: '✓' },
  { label: 'Formation interne', essentiel: '—', professionnel: '—', enterprise: '✓' },
  { label: 'ISO 27001 / 42001', essentiel: '—', professionnel: '—', enterprise: '✓' },
  { label: 'Engagement', essentiel: 'Mensuel', professionnel: 'Mensuel', enterprise: 'Annuel' },
];

function PricingCard({ tier }: { tier: typeof TIERS[0] }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
        tier.popular
          ? 'border-primary-300 bg-background-50 shadow-xl shadow-primary-500/10 scale-[1.02] z-10'
          : 'border-background-200/70 bg-background-50 hover:border-background-300/60 hover:shadow-lg'
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-xs font-bold bg-primary-500 text-white whitespace-nowrap shadow-md">
            LE PLUS DEMANDÉ
          </span>
        </div>
      )}

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${tier.color}-100 mb-4`}>
            <i className={`${tier.icon} text-2xl text-${tier.color}-600`} />
          </div>
          <h3 className="text-xl font-bold text-foreground-950 mb-2">{tier.name}</h3>
          <p className="text-sm text-foreground-600 leading-relaxed">{tier.description}</p>
        </div>

        <div className="mb-6">
          <span className="text-2xl font-bold text-foreground-950">Sur devis</span>
          <p className="text-xs text-foreground-400 mt-1">Tarification personnalisée selon vos besoins</p>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-700">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 flex-shrink-0 mt-0.5">
                <i className="ri-check-line text-xs text-emerald-600" />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="#devis-form"
          className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-${tier.color}-500 text-white hover:bg-${tier.color}-600`}
        >
          <i className="ri-mail-send-line" />
          Demander un devis
        </a>
      </div>
    </div>
  );
}

export default function DevisPage() {
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot('devis');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', organization: '', country: '',
    position: '', plan: '', employees: '', budget: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.organization.trim()) newErrors.organization = "L'organisation est requise";
    if (!formData.message.trim()) newErrors.message = 'Décrivez brièvement vos besoins';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstInput = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      trackFormStart('devis_page', 'Formulaire Demande de Devis KOS');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.message.length > 500) return;
    if (validateHoneypot()) { setErrors({ form: 'Soumission rejetée pour des raisons de sécurité.' }); return; }
    if (checkRateLimit()) { setErrors({ form: 'Veuillez patienter quelques secondes avant de renvoyer.' }); return; }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload: Record<string, string> = {
      nom: formData.name,
      email: formData.email,
      telephone: formData.phone,
      organisation: formData.organization,
      pays: formData.country,
      poste: formData.position,
      plan: formData.plan,
      employes: formData.employees,
      budget: formData.budget,
      message: formData.message,
    };

    const result = await submitFormSecure(payload, DEVIS_FORM_URL, {
      honeypotValue: inputRef.current?.value || '',
      formId: 'devis',
    });

    if (result.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', organization: '', country: '', position: '', plan: '', employees: '', budget: '', message: '' });
      setErrors({});
      trackFormSubmission('devis_page', 'Formulaire Demande de Devis KOS');
    } else {
      setSubmitStatus('error');
      if (result.error) setErrors({ form: result.error });
    }
    setIsSubmitting(false);
  };

  const scrollToForm = useCallback(() => {
    const el = document.getElementById('devis-form');
    if (el) {
      const nav = document.querySelector('nav');
      const navHeight = nav?.getBoundingClientRect().height || 0;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navHeight - 16, behavior: 'smooth' });
    }
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Demande de Devis — KOS RegTech | Khepra Experts",
    "description": "Demandez un devis personnalisé pour KOS, la plateforme RegTech de conformité BCEAO/COBAC. Solutions modulables pour banques, IMF, fintechs — sans prix publié.",
    "url": "https://khepraexperts.com/devis",
    "inLanguage": "fr-FR",
  };

  return (
    <>
      <SeoHead
        title="Demande de Devis — KOS RegTech | Conformité BCEAO/COBAC | Khepra Experts"
        description="Demandez un devis personnalisé pour KOS, la solution RegTech de conformité réglementaire. Intelligence automatisée BCEAO, COBAC, OHADA. Banques, IMF, Fintechs — audit, veille 24/7, board reports. Sans prix publié."
        keywords="devis KOS RegTech, demande devis conformité BCEAO, tarification conformité COBAC, solution conformité réglementaire Afrique, KOS pricing sur devis, RegTech Afrique francophone"
        canonical="https://khepraexperts.com/devis"
        ogType="website"
        schemaJson={schemaData}
      />

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background-50" style={{ paddingTop: '80px' }}>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background-900 via-background-800 to-background-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <Breadcrumb
              variant="light"
              items={[{ label: 'Accueil', href: '/' }, { label: 'Demande de Devis' }]}
            />

            <div className="text-center mt-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-300 border border-accent-500/30">
                  KOS — Kernel of Synthesis
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  Sur devis uniquement
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Une solution RegTech{' '}
                <span className="text-primary-400">sur mesure</span> pour votre conformité
              </h1>
              <p className="text-lg text-foreground-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Chaque institution a des besoins uniques. Nos experts analysent votre contexte réglementaire,
                vos volumes et vos enjeux pour vous proposer une tarification adaptée — sans prix public standardisé.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm whitespace-nowrap bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-primary-500/30"
                >
                  <i className="ri-mail-send-line" />
                  Demander un devis maintenant
                </button>
                <CalendlyWidget
                  prefill={{ name: '', email: '' }}
                  utm={{ utmSource: 'website', utmMedium: 'devis_page', utmCampaign: 'devis_kos' }}
                />
              </div>
              <p className="text-xs text-foreground-400 mt-4">
                Réponse sous 24h ouvrées · Échange confidentiel · Sans engagement
              </p>
            </div>
          </div>
        </section>

        {/* PLANS OVERVIEW */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
              Trois niveaux de service, un seul engagement : votre conformité
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              Du module découverte à l'intégration enterprise on-premise, KOS s'adapte à la taille et aux exigences de votre institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {TIERS.map(tier => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="bg-background-100 border-y border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-8 text-center">
              Comparaison détaillée des fonctionnalités
            </h2>
            <div className="overflow-x-auto rounded-xl border border-background-200/70 bg-background-50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200 bg-background-100">
                    <th className="text-left py-4 px-5 font-semibold text-foreground-600">Fonctionnalité</th>
                    <th className="text-center py-4 px-5 font-semibold text-secondary-600">Essentiel</th>
                    <th className="text-center py-4 px-5 font-semibold text-primary-600">Professionnel</th>
                    <th className="text-center py-4 px-5 font-semibold text-accent-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-background-200/50 hover:bg-background-50/50 transition-colors">
                      <td className="py-3 px-5 text-foreground-700">{row.label}</td>
                      <td className="py-3 px-5 text-center text-foreground-500">{row.essentiel}</td>
                      <td className="py-3 px-5 text-center text-primary-600 font-semibold">{row.professionnel}</td>
                      <td className="py-3 px-5 text-center text-accent-600 font-semibold">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHY SUR DEVIS */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">
              Pourquoi un devis personnalisé ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { icon: 'ri-shield-check-line', title: 'Conformité sur mesure', desc: 'Chaque institution a des obligations réglementaires différentes selon sa taille, son pays et son secteur. Un devis adapté garantit que vous ne payez que ce dont vous avez besoin.' },
                { icon: 'ri-scales-3-line', title: 'Tarification équitable', desc: 'Une IMF de 500 clients n\'a pas les mêmes besoins qu\'une banque régionale. Notre tarification reflète votre volume réel d\'activité et vos exigences de conformité.' },
                { icon: 'ri-user-voice-line', title: 'Accompagnement dédié', desc: 'Avant tout devis, un expert réglementaire analyse votre situation. Vous recevez une proposition chiffrée ET des recommandations stratégiques — gratuitement.' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-background-100 border border-background-200/70">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 mb-3">
                    <i className={`${item.icon} text-lg text-primary-600`} />
                  </div>
                  <h3 className="font-semibold text-foreground-950 mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS */}
        <section className="bg-background-100 border-y border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '3.77 Mds', label: 'FCFA d\'actifs sous gestion KOS', icon: 'ri-funds-line' },
                { value: '98%', label: 'Taux de succès réglementaire', icon: 'ri-shield-check-line' },
                { value: '47M', label: 'FCFA d\'amende évitée (cas IMF Togo)', icon: 'ri-error-warning-line' },
                { value: '60s', label: 'pour générer un rapport Art.49', icon: 'ri-time-line' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-xl bg-background-50 border border-background-200/70">
                  <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-lg bg-primary-100">
                    <i className={`${stat.icon} text-lg text-primary-600`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground-950 mb-1">{stat.value}</div>
                  <div className="text-xs text-foreground-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 mb-8 text-center">
            Questions fréquentes sur nos devis
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Pourquoi KOS ne publie-t-il pas ses prix ?',
                a: 'Parce que chaque institution financière a des besoins uniques. Une IMF au Sénégal n\'a pas les mêmes contraintes qu\'une banque au Cameroun. Notre approche sur devis garantit que vous recevez une proposition parfaitement adaptée à votre volume d\'activité, votre pays de régulation et vos exigences spécifiques.',
              },
              {
                q: 'Combien coûte KOS en moyenne ?',
                a: 'Le coût dépend de trois facteurs : (1) le nombre d\'utilisateurs et de requêtes mensuelles, (2) le périmètre réglementaire (BCEAO seul, COBAC seul, ou les deux), (3) le mode de déploiement (cloud vs on-premise). Nos clients dépensent généralement entre 99 000 et plusieurs millions de FCFA par mois. Demandez un devis pour obtenir votre chiffrage personnalisé.',
              },
              {
                q: 'Y a-t-il un engagement minimum ?',
                a: 'Le plan Essentiel et Professionnel sont sans engagement — vous pouvez résilier à tout moment. Le plan Enterprise implique un engagement annuel compte tenu de la complexité du déploiement on-premise et de la formation des équipes.',
              },
              {
                q: 'Le devis est-il vraiment gratuit et sans engagement ?',
                a: 'Oui, absolument. L\'analyse de vos besoins et l\'établissement du devis sont entièrement gratuits. Vous recevez une proposition détaillée avec le périmètre, les délais et les tarifs. Rien n\'est facturé tant que vous n\'avez pas validé la proposition.',
              },
              {
                q: 'Quels modes de paiement acceptez-vous ?',
                a: 'Nous acceptons le virement bancaire UEMOA/CEMAC, le mobile money (pour les plans Essentiel/Pro), et la carte bancaire. Pour Enterprise, le virement bancaire avec délai de 30 jours est le mode de paiement standard.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-foreground-950 pr-4">{faq.q}</span>
                  <i className="ri-arrow-down-s-line text-lg text-foreground-400 transition-transform group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-sm text-foreground-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* DEVIS FORM */}
        <section id="devis-form" className="bg-background-100 border-t border-background-200/70">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 mb-4">
                Réponse sous 24h
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
                Demandez votre devis personnalisé
              </h2>
              <p className="text-foreground-600 max-w-xl mx-auto">
                Remplissez ce formulaire et un expert réglementaire vous recontacte avec une proposition adaptée à votre institution.
              </p>
            </div>

            <div className="bg-background-50 rounded-2xl p-6 md:p-10 border border-background-200/70">
              <form
                id="devis-contact-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                <HoneypotField inputRef={inputRef} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" id="nom" name="nom" required
                      value={formData.name}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, name: e.target.value}); if (errors.name) setErrors({...errors, name: ''}); }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm ${errors.name ? 'border-red-500' : 'border-background-200'}`}
                      placeholder="Votre nom et prénom"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600"><i className="ri-error-warning-line" /> {errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Email professionnel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: ''}); }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm ${errors.email ? 'border-red-500' : 'border-background-200'}`}
                      placeholder="vous@institution.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600"><i className="ri-error-warning-line" /> {errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-foreground-700 mb-1.5">Téléphone</label>
                    <input
                      type="tel" id="telephone" name="telephone"
                      value={formData.phone}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, phone: e.target.value}); }}
                      className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="+228 93 98 49 09"
                    />
                  </div>
                  <div>
                    <label htmlFor="organisation" className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Organisation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" id="organisation" name="organisation" required
                      value={formData.organization}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, organization: e.target.value}); if (errors.organization) setErrors({...errors, organization: ''}); }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm ${errors.organization ? 'border-red-500' : 'border-background-200'}`}
                      placeholder="Nom de votre institution"
                    />
                    {errors.organization && <p className="mt-1 text-xs text-red-600"><i className="ri-error-warning-line" /> {errors.organization}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="pays" className="block text-sm font-medium text-foreground-700 mb-1.5">Pays</label>
                    <input
                      type="text" id="pays" name="pays"
                      value={formData.country}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, country: e.target.value}); }}
                      className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Togo, Bénin, Sénégal..."
                    />
                  </div>
                  <div>
                    <label htmlFor="poste" className="block text-sm font-medium text-foreground-700 mb-1.5">Poste / Fonction</label>
                    <input
                      type="text" id="poste" name="poste"
                      value={formData.position}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, position: e.target.value}); }}
                      className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Directeur Conformité, DAF, CEO..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="plan" className="block text-sm font-medium text-foreground-700 mb-1.5">Plan souhaité</label>
                    <select
                      id="plan" name="plan"
                      value={formData.plan}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, plan: e.target.value}); }}
                      className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez un plan</option>
                      <option value="essentiel">Essentiel — Starter</option>
                      <option value="professionnel">Professionnel — Le plus demandé</option>
                      <option value="enterprise">Enterprise — Sur mesure</option>
                      <option value="a-definir">Je ne sais pas encore</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="employes" className="block text-sm font-medium text-foreground-700 mb-1.5">Taille de l'institution</label>
                    <select
                      id="employes" name="employes"
                      value={formData.employees}
                      onChange={(e) => { handleFirstInput(); setFormData({...formData, employees: e.target.value}); }}
                      className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="1-10">1-10 employés</option>
                      <option value="11-50">11-50 employés</option>
                      <option value="51-200">51-200 employés</option>
                      <option value="201-500">201-500 employés</option>
                      <option value="500+">Plus de 500 employés</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-foreground-700 mb-1.5">Budget annuel estimé (optionnel)</label>
                  <select
                    id="budget" name="budget"
                    value={formData.budget}
                    onChange={(e) => { handleFirstInput(); setFormData({...formData, budget: e.target.value}); }}
                    className="w-full px-4 py-3 border border-background-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-sm cursor-pointer"
                  >
                    <option value="">Non précisé</option>
                    <option value="<1M">Moins de 1M FCFA/an</option>
                    <option value="1M-5M">1M - 5M FCFA/an</option>
                    <option value="5M-15M">5M - 15M FCFA/an</option>
                    <option value="15M+">Plus de 15M FCFA/an</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Décrivez vos besoins <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={5} maxLength={500}
                    value={formData.message}
                    onChange={(e) => { handleFirstInput(); setFormData({...formData, message: e.target.value}); if (errors.message) setErrors({...errors, message: ''}); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all resize-none text-sm ${errors.message ? 'border-red-500' : 'border-background-200'}`}
                    placeholder="Décrivez votre contexte réglementaire, vos besoins en conformité, le nombre d'utilisateurs prévus..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && <p className="text-xs text-red-600"><i className="ri-error-warning-line" /> {errors.message}</p>}
                    <p className={`text-xs ml-auto ${formData.message.length > 450 ? 'text-red-600' : 'text-foreground-400'}`}>{formData.message.length}/500</p>
                  </div>
                </div>

                {errors.form && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-error-warning-fill" />
                      <span>{errors.form}</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-checkbox-circle-fill text-lg" />
                      <span>Votre demande de devis a été envoyée avec succès ! Un expert vous recontacte sous 24h.</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-error-warning-fill" />
                      <span>Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm whitespace-nowrap bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line" />
                      Envoyer ma demande de devis
                    </>
                  )}
                </button>
                <p className="text-xs text-foreground-400 text-center">
                  Vos informations sont strictement confidentielles et ne seront jamais partagées.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-primary-500">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à sécuriser votre conformité réglementaire ?
            </h2>
            <p className="text-base text-white/80 max-w-xl mx-auto mb-8">
              Rejoignez les 200+ institutions qui ont déjà automatisé leur veille BCEAO/COBAC avec KOS.
              Premier diagnostic gratuit. Déploiement sous 72h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm whitespace-nowrap bg-white text-primary-500 hover:bg-background-50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <i className="ri-mail-send-line" />
                Demander un devis
              </button>
              <CalendlyWidget
                prefill={{ name: '', email: '' }}
                utm={{ utmSource: 'website', utmMedium: 'devis_page_bottom', utmCampaign: 'devis_kos' }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



