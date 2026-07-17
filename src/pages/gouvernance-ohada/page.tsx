import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/base/Toast';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function GouvernanceOHADAPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/gouvernance-ohada#webpage`,
        url: `${SITE_URL}/gouvernance-ohada`,
        name: 'Gouvernance OHADA — KHEPRA EXPERTS | Conseil d\'Administration, Conformité, Risques',
        description: 'Gouvernance d\'entreprise en Afrique francophone : Conseil d\'Administration, conformité OHADA, cartographie des risques, contrôle interne. 22 ans d\'expertise.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        datePublished: '2024-01-01',
        dateModified: '2026-05-07',
        about: { '@type': 'Service', name: 'Gouvernance OHADA' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Gouvernance OHADA', item: `${SITE_URL}/gouvernance-ohada` },
          ],
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/gouvernance-ohada#service`,
        name: 'Gouvernance OHADA',
        serviceType: 'Gouvernance d\'entreprise, conseil d\'administration, contrôle interne, risques',
        description: 'Accompagnement en gouvernance d\'entreprise pour les organisations africaines : Conseil d\'Administration, conformité OHADA, cartographie des risques, contrôle interne, audit.',
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
          { '@type': 'Country', name: 'Tchad' },
          { '@type': 'Country', name: 'Guinée' },
          { '@type': 'Country', name: 'Guinée-Bissau' },
          { '@type': 'Country', name: 'Guinée Équatoriale' },
          { '@type': 'Country', name: 'Comores' },
          { '@type': 'Country', name: 'République Centrafricaine' },
          { '@type': 'Country', name: 'RDC' },
          { '@type': 'Country', name: 'Congo' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de Gouvernance',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Évaluation du Conseil d\'Administration' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conformité OHADA & SYSCOHADA' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cartographie des Risques' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contrôle Interne & Audit' } },
          ],
        },
      },
    ],
  };

  const linkedInShareUrl = getOgPreviewUrl('/gouvernance-ohada');
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/gouvernance-ohada`)}&text=${encodeURIComponent('Gouvernance OHADA — KHEPRA EXPERTS | Conseil d\'Administration, Conformité, Risques')}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent('Gouvernance OHADA — KHEPRA EXPERTS | Conseil d\'Administration, Conformité, Risques ' + `${SITE_URL}/gouvernance-ohada`)}`;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Gouvernance OHADA — KHEPRA EXPERTS | Conseil d'Administration, Conformité, Risques"
        description="Gouvernance d'entreprise en Afrique francophone : Conseil d'Administration, conformité OHADA, cartographie des risques, contrôle interne. 22 ans d'expertise. Diagnostic gratuit."
        keywords="gouvernance entreprise Afrique, conseil administration OHADA, conformité SYSCOHADA, cartographie risques, contrôle interne, audit gouvernance, référentiel OCDE, gouvernance PME Afrique, comité audit Afrique"
        canonicalPath="/gouvernance-ohada"
        ogType="website"
        ogImage={OG_IMAGES.SOLUTIONS}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt="Gouvernance OHADA — KHEPRA EXPERTS"
        ogUrl={`${SITE_URL}/gouvernance-ohada`}
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
              Gouvernance d'Entreprise
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Renforcer votre <span className="text-gold-400">Gouvernance</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conseil d'Administration efficace, conformité <strong className="text-white">OHADA</strong>, <strong className="text-white">SYSCOHADA</strong>, cartographie des risques, contrôle interne. Structurez votre organisation pour des décisions solides et documentées.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30"
              >
                Renforcer votre gouvernance
                <i className="ri-arrow-right-line"></i>
              </button>
              <a
                href="#lead-magnet"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg whitespace-nowrap cursor-pointer border border-gold-400/30 px-6 py-3.5 rounded-full hover:bg-gold-400/10 transition-all"
              >
                <i className="ri-download-line"></i>
                Télécharger le guide
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-gold-400 text-lg"></i>
                <span>Conformité OHADA & SYSCOHADA</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-team-line text-gold-400 text-lg"></i>
                <span>Conseil d'Administration efficace</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-line text-gold-400 text-lg"></i>
                <span>Cartographie des risques</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-award-line text-gold-400 text-lg"></i>
                <span>Missions de gouvernance</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-calendar-check-line text-gold-400 text-lg"></i>
                <span>Intervention sous 10 jours</span>
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
                  Une gouvernance structurée est la <span className="text-amber-600">condition</span> de la résilience organisationnelle
                </h2>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Le Conseil d'Administration se réunit sans agenda structuré ni PV d'orientation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Aucune cartographie des risques — les crises arrivent comme des surprises</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>Le contrôle interne existe sur papier mais n'est pas opérationnel</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-500"></i>
                    </div>
                    <p>La relève de direction n'est pas préparée — départ brutal du DG = crise</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-50 to-gray-50 rounded-2xl p-8 border border-brand-100">
                <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-4">
                  Notre solution : KHEPRA GOUVERNANCE
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Évaluation du Conseil d'Administration</strong> avec scoring OCDE et plan d'action</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Cartographie des risques</strong> structurée avec plans de mitigation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Contrôle interne opérationnel</strong> conforme référentiel COSO et cadre OHADA</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-emerald-600"></i>
                    </div>
                    <p><strong>Plan de relève</strong> structuré avec identification des talents clés</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-time-line text-brand-700 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Délai de mission</p>
                      <p className="text-lg font-bold text-brand-900">60 jours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 PILIERS ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-left mb-14">
              <span className="section-label mb-4" style={{ background: 'rgba(212,168,42,0.15)', borderColor: 'rgba(212,168,42,0.4)', color: '#D4A82A' }}>
                Cadre de Gouvernance
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Les 4 Piliers de la <span className="text-gold-600">Gouvernance OHADA</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre approche intègre les standards internationaux (OCDE, COSO) avec les spécificités du droit des affaires africain.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Conseil d\'Administration', desc: 'Évaluation de l\'efficacité du CA, composition et diversité, rôles du Président et du DG, comités spécialisés (Audit, Risques, Rémunération).', icon: 'ri-team-line', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                { title: 'Conformité OHADA', desc: 'Conformité des statuts et règlement intérieur avec les Actes Uniformes OHADA. Revue des procédures de décision, AGO, AGE, reporting aux associés.', icon: 'ri-file-shield-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { title: 'Cartographie des Risques', desc: 'Identification, évaluation et hiérarchisation des risques stratégiques, opérationnels, financiers, juridiques et de réputation. Plans de mitigation.', icon: 'ri-map-pin-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { title: 'Contrôle Interne', desc: 'Mise en place du référentiel COSO adapté au contexte africain. Procédures, séparation des fonctions, audit interne, reporting au Comité d\'Audit.', icon: 'ri-shield-check-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              ].map((pilier, i) => (
                <div key={i} className={`rounded-xl p-6 border ${pilier.color} bg-white hover:shadow-lg transition-all`}>
                  <div className={`w-12 h-12 rounded-xl ${pilier.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                    <i className={`${pilier.icon} text-2xl ${pilier.color.split(' ')[1]}`}></i>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{pilier.title}</h3>
                  <p className="text-sm text-gray-600">{pilier.desc}</p>
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
                  Guide PDF : <span className="text-gold-400">Gouvernance OHADA pour Dirigeants</span>
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  32 pages pour structurer la gouvernance de votre organisation en conformité OHADA. Conseil d'Administration, cartographie des risques, contrôle interne, référentiel COSO, templates de PV et d'audit.
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Scoring du Conseil d'Administration avec grille OCDE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Template de cartographie des risques Excel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Modèle de contrôle interne conforme COSO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-gold-400"></i>
                    <span>Templates de PV de CA et Comité d'Audit</span>
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
                  id="lead-magnet-gouvernance"
                  action="https://readdy.ai/api/form/d8vaofa181e9e92u8qeg"
                  method="POST"
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const honeypot = (data.get('company_alt') as string || '').trim();
                    if (honeypot) {
                      showToast('Merci ! Votre guide vous a été envoyé par email.', 'success');
                      form.reset();
                      return;
                    }
                    data.delete('company_alt');
                    const formData = new URLSearchParams();
                    data.forEach((value, key) => formData.append(key, value as string));
                    fetch('https://readdy.ai/api/form/d8vaofa181e9e92u8qeg', {
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
                    <label htmlFor="gov-nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" id="gov-nom" name="nom" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="gov-email" className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                    <input type="email" id="gov-email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="vous@entreprise.com" />
                  </div>
                  <div>
                    <label htmlFor="gov-entreprise" className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                    <input type="text" id="gov-entreprise" name="entreprise" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Nom de votre organisation" />
                  </div>
                  <div>
                    <label htmlFor="gov-fonction" className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                    <select id="gov-fonction" name="fonction" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white">
                      <option value="">Sélectionnez...</option>
                      <option value="dg">Directeur Général</option>
                      <option value="president">Président du CA</option>
                      <option value="administrateur">Administrateur</option>
                      <option value="daf">DAF / CFO</option>
                      <option value="juridique">Directeur Juridique</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="kos-hp-field" />
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
              <a href="/blog/diagnostic-organisationnel-gouvernance-bceao-cobac-ocde/" onClick={(e) => { e.preventDefault(); navigate('/blog/diagnostic-organisationnel-gouvernance-bceao-cobac-ocde/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Diagnostic Organisationnel & Gouvernance</h4>
                  <p className="text-sm text-gray-500 mt-1">Méthodologie complète d'évaluation de gouvernance</p>
                </div>
              </a>
              <a href="/blog/pilotage-financier-pme-ohada-indicateurs-performance/" onClick={(e) => { e.preventDefault(); navigate('/blog/pilotage-financier-pme-ohada-indicateurs-performance/'); }} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-article-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Pilotage Financier vs Intuition</h4>
                  <p className="text-sm text-gray-500 mt-1">Passer du résultat comptable aux indicateurs de performance</p>
                </div>
              </a>
              <a href="/services/diagnostic-organisationnel" className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-service-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Service Diagnostic Organisationnel</h4>
                  <p className="text-sm text-gray-500 mt-1">Notre offre commerciale de gouvernance</p>
                </div>
              </a>
              <a href="/tools/evaluation-gouvernance" className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0">
                  <i className="ri-tools-line text-brand-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Outil Évaluation Gouvernance</h4>
                  <p className="text-sm text-gray-500 mt-1">Testez la maturité de votre gouvernance en ligne</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transformez votre organisation en <span className="text-gold-600">structure de décision solide</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe intervient dans les 10 jours ouvrés. Consultation initiale de 30 minutes pour évaluer la maturité de votre gouvernance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-lg whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/20"
              >
                <i className="ri-calendar-check-line"></i>
                Renforcer votre gouvernance
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