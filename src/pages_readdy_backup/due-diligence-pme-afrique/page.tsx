import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/base/Toast';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function DueDiligencePMEAfriquePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/due-diligence-pme-afrique#webpage`,
        url: `${SITE_URL}/due-diligence-pme-afrique`,
        name: 'Due Diligence PME Afrique — KHEPRA EXPERTS | Achat, Fusion, Levée de Fonds',
        description: 'Due diligence pluridisciplinaire pour PME africaines : financière, légale, technique, ESG. Méthodologie Big Four adaptée à l\'Afrique francophone. UEMOA/CEMAC.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        datePublished: '2024-01-01',
        dateModified: '2026-05-07',
        about: { '@type': 'Service', name: 'Due Diligence PME Afrique' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Due Diligence PME Afrique', item: `${SITE_URL}/due-diligence-pme-afrique` },
          ],
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/due-diligence-pme-afrique#service`,
        name: 'Due Diligence PME Afrique',
        serviceType: 'Due diligence, M&A, valorisation entreprise, levée de fonds',
        description: 'Due diligence pluridisciplinaire pour les opérations d\'achat, fusion et levée de fonds des PME en Afrique francophone. Méthodologie inspirée des Big Four.',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'Togo' },
          { '@type': 'Country', name: 'Bénin' },
          { '@type': 'Country', name: 'Côte d\'Ivoire' },
          { '@type': 'Country', name: 'Sénégal' },
          { '@type': 'Country', name: 'Burkina Faso' },
          { '@type': 'Country', name: 'Mali' },
          { '@type': 'Country', name: 'Niger' },
          { '@type': 'Country', name: 'Cameroun' },
          { '@type': 'Country', name: 'Gabon' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services Due Diligence',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Financière' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Légale & Fiscale' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence Technique & Opérationnelle' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence ESG' } },
          ],
        },
      },
    ],
  };

  const linkedInShareUrl = getOgPreviewUrl('/due-diligence-pme-afrique');
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/due-diligence-pme-afrique`)}&text=${encodeURIComponent('Due Diligence PME Afrique — KHEPRA EXPERTS | Achat, Fusion, Levée de Fonds')}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent('Due Diligence PME Afrique — KHEPRA EXPERTS | Achat, Fusion, Levée de Fonds ' + `${SITE_URL}/due-diligence-pme-afrique`)}`;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Due Diligence PME Afrique — KHEPRA EXPERTS | Achat, Fusion, Levée de Fonds"
        description="Due diligence pluridisciplinaire pour PME africaines : financière, légale, technique, ESG. Méthodologie Big Four adaptée à l'Afrique francophone. Red flags, risques clés, recommandations de négociation."
        keywords="due diligence Afrique, acquisition PME Afrique, fusion acquisition Afrique, valorisation entreprise Afrique, levée de fonds PME Afrique, M&A Afrique francophone, audit pré-acquisition, due diligence OHADA, private equity Afrique"
        canonicalPath="/due-diligence-pme-afrique"
        ogType="website"
        ogImage={OG_IMAGES.SOLUTIONS}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt="Due Diligence PME Afrique — KHEPRA EXPERTS"
        ogUrl={`${SITE_URL}/due-diligence-pme-afrique`}
        schemaJson={pageSchema}
      />
      <Navigation />

      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label mb-6" style={{ background: 'rgba(212,168,42,0.15)', borderColor: 'rgba(212,168,42,0.4)', color: '#D4A82A' }}>
              Opérations & Transactions
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Due Diligence <span className="text-gold-400">PME Afrique</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Pluridisciplinaire : financière, légale, technique, <strong className="text-white">ESG</strong>. Méthodologie inspirée des Big Four, adaptée au contexte OHADA et aux réalités de l'Afrique francophone. Red flags, risques clés, recommandations de négociation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                Obtenir un audit initial
                <i className="ri-arrow-right-line"></i>
              </button>
              <a
                href="#lead-magnet"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-download-line"></i>
                Télécharger la checklist
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-gold-400 text-lg"></i>
                <span>4 volets : financier, légal, technique, ESG</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-file-search-line text-gold-400 text-lg"></i>
                <span>Rapport intégré avec red flags</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-gold-400 text-lg"></i>
                <span>Accompagnement jusqu'au closing</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-money-euro-circle-line text-gold-400 text-lg"></i>
                <span>€500M+ de transactions</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 VOLETS ── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-left mb-14">
              <span className="section-label mb-4" style={{ background: 'rgba(212,168,42,0.15)', borderColor: 'rgba(212,168,42,0.4)', color: '#D4A82A' }}>
                Méthodologie
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                4 Volets de Due Diligence <span className="text-gold-600">Intégrée</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chaque volet est audité par des experts spécialisés et synthétisé dans un rapport unique avec matrice de risques.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Due Diligence Financière', desc: 'Analyse des états financiers 3 ans, retraitement conforme SYSCOHADA, calcul des ratios, identification des pertes latentes, projection du BFR post-acquisition.', icon: 'ri-bar-chart-box-line', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                { title: 'Due Diligence Légale & Fiscale', desc: 'Vérification des statuts, contrats majeurs, litiges en cours, conformité fiscale OHADA, licences et agréments en vigueur.', icon: 'ri-scales-3-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { title: 'Due Diligence Technique', desc: 'Audit des actifs immobiliers et industriels, évaluation des stocks, analyse des processus opérationnels, qualité de la gouvernance.', icon: 'ri-settings-4-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { title: 'Due Diligence ESG', desc: 'Conformité environnementale, sociale et de gouvernance. Alignement avec les standards IFC et les exigences des investisseurs institutionnels.', icon: 'ri-leaf-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              ].map((volet, i) => (
                <div key={i} className={`rounded-xl p-6 border ${volet.color} bg-white hover:shadow-lg transition-all`}>
                  <div className={`w-12 h-12 rounded-xl ${volet.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                    <i className={`${volet.icon} text-2xl ${volet.color.split(' ')[1]}`}></i>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{volet.title}</h3>
                  <p className="text-sm text-gray-600">{volet.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESSUS ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Processus sur <span className="text-gold-600">90 jours</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                De la lettre d'intention au closing, nous vous accompagnons à chaque étape avec des livrables concrets.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Phase Exploration (J0-J15)', desc: 'Signature de la lettre d\'intention, accès à la data room, revue documentaire initiale. Identification des premiers red flags et des zones à risque.', color: 'bg-brand-100 text-brand-700' },
                { step: '2', title: 'Phase Confirmatoire (J15-J45)', desc: 'Audit sur site, entretiens avec la direction, analyse détaillée des 4 volets. Calcul des ajustements de prix et des garanties nécessaires.', color: 'bg-gold-100 text-gold-700' },
                { step: '3', title: 'Rapport & Négociation (J45-J60)', desc: 'Livrable du rapport intégré avec matrice de risques, red flags classés par criticité, recommandations de négociation. Accompagnement dans la fixation du prix.', color: 'bg-emerald-100 text-emerald-700' },
                { step: '4', title: 'Closing & Post-Acquisition (J60-J90)', desc: 'Accompagnement jusqu\'au closing, structuration des garanties, plan d\'intégration post-acquisition. Suivi à 90 jours.', color: 'bg-purple-100 text-purple-700' },
              ].map((phase, i) => (
                <div key={i} className="flex items-start gap-5 bg-white rounded-xl p-6 border border-gray-100">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0 font-bold text-lg`}>
                    {phase.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{phase.title}</h3>
                    <p className="text-gray-600">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET ── */}
        <section id="lead-magnet" className="py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gold-500/20 rounded-full px-4 py-2 mb-6">
                  <i className="ri-gift-line text-gold-400"></i>
                  <span className="text-gold-400 text-sm font-semibold">Checklist Gratuite</span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                  Checklist Due Diligence : <span className="text-gold-400">PME Africaine</span>
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  La checklist complète pour auditer une PME africaine avant acquisition. 120 points de contrôle couvrant les 4 volets : financier, légal, technique, ESG. Compatible SYSCOHADA et OHADA.
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>120 points de contrôle par volet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Matrice de scoring des risques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Modèle de data room structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Template de rapport de synthèse</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-linkedin-fill"></i> Partager
                  </a>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-twitter-x-line"></i> X
                  </a>
                  <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-whatsapp-line"></i> WhatsApp
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Recevez la checklist PDF</h3>
                <p className="text-gray-500 text-sm mb-6">Remplissez le formulaire pour recevoir la checklist gratuite</p>
                <form
                  data-readdy-form
                  id="lead-magnet-dd"
                  action="https://readdy.ai/api/form/d8vaofa181e9e92u8qe0"
                  method="POST"
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const honeypot = (data.get('website_alt') as string || '').trim();
                    if (honeypot) {
                      showToast('Merci ! Votre checklist vous a été envoyée par email.', 'success');
                      form.reset();
                      return;
                    }
                    data.delete('website_alt');
                    const formData = new URLSearchParams();
                    data.forEach((value, key) => formData.append(key, value as string));
                    fetch('https://readdy.ai/api/form/d8vaofa181e9e92u8qe0', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: formData.toString(),
                    }).then(() => {
                      showToast('Merci ! Votre checklist vous a été envoyée par email.', 'success');
                      form.reset();
                    }).catch(() => {
                      showToast('Erreur. Veuillez réessayer ou nous contacter directement.', 'error');
                    });
                  }}
                >
                  <div>
                    <label htmlFor="dd-nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" id="dd-nom" name="nom" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="dd-email" className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                    <input type="email" id="dd-email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="vous@entreprise.com" />
                  </div>
                  <div>
                    <label htmlFor="dd-entreprise" className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                    <input type="text" id="dd-entreprise" name="entreprise" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Nom de votre entreprise" />
                  </div>
                  <div>
                    <label htmlFor="dd-projet" className="block text-sm font-medium text-gray-700 mb-1">Type de projet</label>
                    <select id="dd-projet" name="projet" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white">
                      <option value="">Sélectionnez...</option>
                      <option value="acquisition">Acquisition d'entreprise</option>
                      <option value="fusion">Fusion</option>
                      <option value="levee">Levée de fonds</option>
                      <option value="cession">Cession</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="kos-hp-field" />
                  <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3.5 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <i className="ri-download-line"></i>
                    Recevoir la checklist
                  </button>
                  <p className="text-xs text-gray-400 text-center">Confidentialité garantie. Pas de spam.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIENS INTERNES ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
              Ressources connexes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/blog/due-diligence-acquisition-afrique-ohada-guide/" onClick={(e) => { e.preventDefault(); navigate('/blog/due-diligence-acquisition-afrique-ohada-guide/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Due Diligence Avancée</h4>
                  <p className="text-sm text-gray-500 mt-1">Méthodologie complète d'audit pré-acquisition en Afrique</p>
                </div>
              </a>
              <a href="/blog/levee-fonds-investor-readiness-valorisation-dcf-afrique/" onClick={(e) => { e.preventDefault(); navigate('/blog/levee-fonds-investor-readiness-valorisation-dcf-afrique/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Investor Readiness</h4>
                  <p className="text-sm text-gray-500 mt-1">Préparer votre entreprise à la levée de fonds</p>
                </div>
              </a>
              <a href="/services/due-diligence-acquisition" className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-service-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Service Due Diligence</h4>
                  <p className="text-sm text-gray-500 mt-1">Notre offre commerciale complète</p>
                </div>
              </a>
              <a href="/investisseurs" className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-building-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Espace Investisseurs</h4>
                  <p className="text-sm text-gray-500 mt-1">Services dédiés aux fonds et investisseurs</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Projet d'acquisition ou de <span className="text-gold-600">levée de fonds</span> ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos experts interviennent dans les 10 jours ouvrés. Premier entretien gratuit de 30 minutes pour qualifier votre projet et établir un plan de mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/20"
              >
                <i className="ri-calendar-check-line"></i>
                Demander une analyse stratégique
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap cursor-pointer"
              >
                <i className="ri-calendar-check-line text-amber-500 text-xl"></i>
                Réserver un entretien stratégique
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



