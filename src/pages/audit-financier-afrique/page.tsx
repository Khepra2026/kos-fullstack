import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/base/Toast';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function AuditFinancierAfriquePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/audit-financier-afrique#webpage`,
        url: `${SITE_URL}/audit-financier-afrique`,
        name: 'Audit Financier Afrique — KHEPRA EXPERTS | Conformité BCEAO, COBAC, OHADA',
        description: 'Cabinet spécialisé en audit financier en Afrique francophone. Conformité BCEAO, COBAC, SYSCOHADA. Diagnostic, reporting prudentiel, gouvernance. 22 ans d\'expertise UEMOA/CEMAC.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        datePublished: '2024-01-01',
        dateModified: '2026-05-07',
        about: { '@type': 'Service', name: 'Audit Financier Afrique' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Audit Financier Afrique', item: `${SITE_URL}/audit-financier-afrique` },
          ],
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/audit-financier-afrique#service`,
        name: 'Audit Financier Afrique',
        serviceType: 'Audit financier, conformité réglementaire, gouvernance',
        description: 'Diagnostic financier complet des institutions africaines : conformité BCEAO/COBAC, ratios prudentiels, SYSCOHADA, reporting au Conseil d\'Administration.',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'Togo' },
          { '@type': 'Country', name: 'Bénin' },
          { '@type': 'Country', name: 'Côte d\'Ivoire' },
          { '@type': 'Country', name: 'Sénégal' },
          { '@type': 'Country', name: 'Burkina Faso' },
          { '@type': 'Country', name: 'Mali' },
          { '@type': 'Country', name: 'Niger' },
          { '@type': 'Country', name: 'Ghana' },
          { '@type': 'Country', name: 'Cameroun' },
          { '@type': 'Country', name: 'Gabon' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services d\'Audit Financier',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diagnostic Bilantiel BCEAO/COBAC' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audit ALM Liquidité' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conformité LBC/FT' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reporting Prudentiel au CA' } },
          ],
        },
      },
    ],
  };

  const linkedInShareUrl = getOgPreviewUrl('/audit-financier-afrique');
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/audit-financier-afrique`)}&text=${encodeURIComponent('Audit Financier Afrique — KHEPRA EXPERTS | Conformité BCEAO, COBAC, OHADA')}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/audit-financier-afrique`)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent('Audit Financier Afrique — KHEPRA EXPERTS | Conformité BCEAO, COBAC, OHADA ' + `${SITE_URL}/audit-financier-afrique`)}`;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Audit Financier Afrique — KHEPRA EXPERTS | Conformité BCEAO, COBAC, OHADA"
        description="Cabinet spécialisé en audit financier en Afrique francophone. Conformité BCEAO, COBAC, SYSCOHADA. Diagnostic bilantiel, ratios prudentiels, reporting gouvernance. 22 ans d'expertise UEMOA/CEMAC."
        keywords="audit financier Afrique, conformité BCEAO SFD, audit COBAC EMF, ratios prudentiels UEMOA, diagnostic bilantiel, SYSCOHADA PME, reporting prudentiel, cabinet audit Lomé, gouvernance financière Afrique"
        canonicalPath="/audit-financier-afrique"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt="Audit Financier Afrique — KHEPRA EXPERTS"
        ogUrl={`${SITE_URL}/audit-financier-afrique`}
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
              Service Spécialisé
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Audit Financier <span className="text-gold-400">Afrique</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Diagnostic financier complet de vos institutions. Conformité <strong className="text-white">BCEAO</strong>, <strong className="text-white">COBAC</strong>, <strong className="text-white">SYSCOHADA</strong>. Ratios prudentiels, reporting au Conseil d'Administration, gouvernance financière renforcée.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                Demander une analyse stratégique
                <i className="ri-arrow-right-line"></i>
              </button>
              <a
                href="#lead-magnet"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-download-line"></i>
                Télécharger le guide gratuit
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-gold-400 text-lg"></i>
                <span>Conformité BCEAO/COBAC</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-bar-chart-box-line text-gold-400 text-lg"></i>
                <span>6 ratios prudentiels</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-gold-400 text-lg"></i>
                <span>Diagnostic sous 10 jours</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-global-line text-gold-400 text-lg"></i>
                <span>15 pays couverts</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME / SOLUTION ── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Un bilan mal structuré <span className="text-red-600">fragilise silencieusement</span> votre institution
                </h2>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Le ratio de solvabilité descend sous les 9,5 % sans que le CA ne l'anticipe</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Le taux de couverture des NPL tombe à 42 % — le résultat affiché est une fiction</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Le Comité ALM ne se réunit pas trimestriellement — la BCEAO peut intervenir</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Sans tableau de bord bilantiel mensuel, le CA pilote sans radar</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-50 to-gray-50 rounded-2xl p-8 border border-brand-100">
                <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-4">
                  Notre solution : KHEPRA BILAN
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Retraitement comptable</strong> conforme BCEAO/COBAC avec identification des pertes latentes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Calcul des 6 ratios prudentiels</strong> vs seuils réglementaires avec alertes automatiques</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Plan de redressement priorisé</strong> : provisions, fonds propres, restructuration portefeuille</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Tableau de bord mensuel</strong> pour le CA avec reporting conforme Commission Bancaire</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-time-line text-brand-700 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Délai de mission</p>
                      <p className="text-lg font-bold text-brand-900">90 jours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RATIOS PRUDENTIELS ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-left mb-14">
              <span className="section-label mb-4" style={{ background: 'rgba(212,168,42,0.15)', borderColor: 'rgba(212,168,42,0.4)', color: '#D4A82A' }}>
                Cadre Réglementaire
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Les 6 Ratios Prudentiels <span className="text-gold-600">BCEAO & COBAC</span>
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Chaque ratio est calculé, comparé au seuil réglementaire, et intégré dans votre tableau de bord de gouvernance.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Solvabilité (Cooke)', desc: 'Fonds propres / Actifs pondérés. Seuil BCEAO : 9,5 % — COBAC : 8 %', icon: 'ri-safe-2-line', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                { title: 'Liquidité (LCR)', desc: 'Actifs liquides / Ressources CT. Seuil : 100 % minimum pour les deux zones', icon: 'ri-drop-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { title: 'Division des Risques', desc: 'Max 75 % BCEAO — 45 % COBAC. Contrainte de diversification forcée', icon: 'ri-pie-chart-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { title: 'Taux NPL', desc: 'Créances douteuses / Total créances. Seuil critique : 10 %', icon: 'ri-alert-line', color: 'bg-red-50 text-red-700 border-red-200' },
                { title: 'Couverture NPL', desc: 'Provisions / Créances douteuses. Seuil : 70 % minimum', icon: 'ri-shield-check-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                { title: 'Rentabilité (ROE)', desc: 'Résultat net / Fonds propres. Objectif : supérieur à 12 %', icon: 'ri-line-chart-line', color: 'bg-purple-50 text-purple-700 border-purple-200' },
              ].map((ratio, i) => (
                <div key={i} className={`rounded-xl p-6 border ${ratio.color} bg-white`}>
                  <div className={`w-12 h-12 rounded-xl ${ratio.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                    <i className={`${ratio.icon} text-2xl ${ratio.color.split(' ')[1]}`}></i>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{ratio.title}</h3>
                  <p className="text-sm text-gray-600">{ratio.desc}</p>
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
                  <span className="text-gold-400 text-sm font-semibold">Guide Gratuit</span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                  Guide PDF : <span className="text-gold-400">L'Audit Financier en Afrique</span>
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  28 pages de méthodologie pratique pour auditer vos institutions financières en zone UEMOA/CEMAC. Ratios, cadres réglementaires, checklists opérationnelles et modèles de reporting au CA.
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Les 6 ratios prudentiels expliqués avec exemples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Checklist BCEAO vs COBAC comparée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Modèle de tableau de bord mensuel Excel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Plan d'action de redressement sur 90 jours</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-linkedin-fill"></i> Partager sur LinkedIn
                  </a>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-twitter-x-line"></i> Partager sur X
                  </a>
                  <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-whatsapp-line"></i> WhatsApp
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Téléchargez votre guide</h3>
                <p className="text-gray-500 text-sm mb-6">Remplissez le formulaire pour recevoir le PDF gratuitement</p>
                <form
                  data-readdy-form
                  id="lead-magnet-audit"
                  action="https://readdy.ai/api/form/d7u89l1jlv0i8kopu8lg"
                  method="POST"
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    // Honeypot anti-spam
                    const honeypot = data.get('website_alt') as string;
                    if (honeypot && honeypot.trim() !== '') {
                      showToast('Merci ! Votre guide vous a été envoyé par email.', 'success');
                      form.reset();
                      return;
                    }
                    data.delete('website_alt');
                    const formData = new URLSearchParams();
                    data.forEach((value, key) => formData.append(key, value as string));
                    fetch('https://readdy.ai/api/form/d7u89l1jlv0i8kopu8lg', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: formData.toString(),
                    }).then(() => {
                      showToast('Merci ! Votre guide vous a été envoyé par email.', 'success');
                      form.reset();
                    }).catch(() => {
                      showToast('Erreur. Veuillez réessayer ou nous contacter directement.', 'error');
                    });
                  }}
                >
                  <div>
                    <label htmlFor="audit-nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" id="audit-nom" name="nom" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="audit-email" className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                    <input type="email" id="audit-email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="vous@entreprise.com" />
                  </div>
                  <div>
                    <label htmlFor="audit-entreprise" className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                    <input type="text" id="audit-entreprise" name="entreprise" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Nom de votre institution" />
                  </div>
                  <div>
                    <label htmlFor="audit-fonction" className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                    <select id="audit-fonction" name="fonction" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white">
                      <option value="">Sélectionnez...</option>
                      <option value="dg">Directeur Général</option>
                      <option value="daf">DAF / CFO</option>
                      <option value="conseil">Membre du Conseil d'Administration</option>
                      <option value="compliance">Responsable Conformité</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div className="relative overflow-hidden" style={{ height: '1px', width: '1px', position: 'absolute', left: '-9999px' }}>
                    <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3.5 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <i className="ri-download-line"></i>
                    Recevoir le guide PDF
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
              <a href="/blog/bilan-bancaire-uemoa-ratios-bceao-solvabilite/" onClick={(e) => { e.preventDefault(); navigate('/blog/bilan-bancaire-uemoa-ratios-bceao-solvabilite/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Bilan Bancaire UEMOA</h4>
                  <p className="text-sm text-gray-500 mt-1">Ce que la BCEAO voit et que votre CA ne voit pas</p>
                </div>
              </a>
              <a href="/blog/bilan-bancaire-cemac-ratios-cobac-solvabilite/" onClick={(e) => { e.preventDefault(); navigate('/blog/bilan-bancaire-cemac-ratios-cobac-solvabilite/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Bilan Bancaire CEMAC</h4>
                  <p className="text-sm text-gray-500 mt-1">Ratios COBAC, division des risques à 45 %</p>
                </div>
              </a>
              <a href="/blog/alm-microfinance-uemoa-risque-liquidite-sfd/" onClick={(e) => { e.preventDefault(); navigate('/blog/alm-microfinance-uemoa-risque-liquidite-sfd/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">ALM Microfinance UEMOA</h4>
                  <p className="text-sm text-gray-500 mt-1">Le risque de liquidité qui tue les SFD rentables</p>
                </div>
              </a>
              <a href="/blog/conformite-bceao-exigences-prudentielles-sfd-uemoa/" onClick={(e) => { e.preventDefault(); navigate('/blog/conformite-bceao-exigences-prudentielles-sfd-uemoa/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Conformité BCEAO 2026</h4>
                  <p className="text-sm text-gray-500 mt-1">Les nouvelles exigences prudentielles pour les SFD</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prêt à sécuriser votre <span className="text-gold-600">conformité financière</span> ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos experts interviennent dans les 10 jours ouvrés. Diagnostic initial gratuit de 30 minutes pour identifier vos priorités réglementaires.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/20"
              >
                <i className="ri-calendar-check-line"></i>
                Évaluer votre conformité financière
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