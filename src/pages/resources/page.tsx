import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ResourceDownloadModal from './components/ResourceDownloadModal';
import { ResourcesRelatedLinks } from './components/ResourcesRelatedLinks';
import { resources } from '@/mocks/resources';
import { resourcesEn } from '@/mocks/resourcesEn';
import { SeoHead } from '@/components/feature/SeoHead';
import { ResourceCard } from './components/ResourceCard';
import ScrollReveal from '@/components/feature/ScrollReveal';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const ResourcesPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const currentResources = i18n.language === 'en' ? resourcesEn : resources;

  const categories = ['Tous', 'Régulation', 'Due Diligence', 'Gouvernance', 'ESG & Durabilité'];
  const categoriesEn = ['All', 'Regulation', 'Due Diligence', 'Governance', 'ESG & Sustainability'];
  const displayCategories = i18n.language === 'en' ? categoriesEn : categories;

  const filteredResources = selectedCategory === 'Tous' || selectedCategory === 'All'
    ? currentResources
    : currentResources.filter(r => {
        if (selectedCategory === 'Régulation' || selectedCategory === 'Regulation') return r.category === 'Gouvernance' || r.category === 'Governance' || r.category === 'Finance';
        if (selectedCategory === 'Due Diligence') return r.category === 'Finance' || r.category === 'Gouvernance' || r.category === 'Governance';
        if (selectedCategory === 'Gouvernance' || selectedCategory === 'Governance') return r.category === 'Gouvernance' || r.category === 'Governance';
        return r.category === selectedCategory;
      });

  const handleDownloadClick = (resource: any) => {
    setSelectedResource(resource);
    setDownloadModalOpen(true);
  };

  const resourcesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/resources#collectionpage`,
        name: 'KOS — Ressources Gratuites | Guides, Outils & Lead Magnets | Afrique Francophone',
        description: 'Téléchargez gratuitement nos guides, checklists et outils pratiques pour l\'intelligence réglementaire, la due diligence, la gouvernance et la conformité en Afrique francophone. 12 Ultra Lead Magnets disponibles.',
        url: `${SITE_URL}/resources`,
        inLanguage: i18n.language === 'en' ? 'en-US' : 'fr-FR',
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Ressources gratuites', item: `${SITE_URL}/resources` },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS — KOS Platform',
        url: SITE_URL,
        description: 'Plateforme d\'intelligence réglementaire pour l\'Afrique francophone',
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Ressources Gratuites KOS | Guides, Outils & Lead Magnets | Intelligence Réglementaire Afrique"
        description="Téléchargez gratuitement nos guides, checklists et outils pratiques pour l'intelligence réglementaire en Afrique francophone. 12 Ultra Lead Magnets, 26 outils de diagnostic. KOS Platform."
        keywords="ressources gratuites Afrique, guides réglementaires, lead magnets, outils diagnostic, due diligence, gouvernance Afrique, KOS platform, conformité BCEAO COBAC"
        canonicalPath="/resources"
        structuredData={resourcesSchema}
      />

      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.18)' }}>
              <i className="ri-gift-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#86BC25' }}>KOS — Ressources gratuites</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Du savoir pour
              <span className="block" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #6B9B1F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>décider en confiance</span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Guides, checklists, modèles et outils pratiques conçus par les experts KOS pour les réalités réglementaires de l'Afrique francophone. <strong className="text-white font-semibold">Tout est gratuit. Pour l'accompagnement, devis confidentiel sur mesure.</strong>
            </p>

            {/* CTA Ultra Lead Magnets */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 mt-8 p-5 rounded-2xl" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(212,175,55,0.15)' }}>
                  <i className="ri-gift-line text-xl" style={{ color: '#D4AF37' }} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">12 Ultra Lead Magnets gratuits</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>4.3 Md FCFA de pipeline généré — Filtrables par BU et Tier</div>
                </div>
              </div>
              <button onClick={() => navigate('/kos-ultra-lead-magnets')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: '#D4AF37', color: '#080c14' }}>
                <i className="ri-arrow-right-line" />
                Accéder aux 12 Magnets
              </button>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {displayCategories.map((category, index) => {
                const originalCategory = i18n.language === 'en' ? categoriesEn[index] : categories[index];
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(originalCategory)}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === originalCategory
                        ? 'text-white shadow-md'
                        : 'text-foreground-600 hover:bg-background-100'
                    }`}
                    style={selectedCategory === originalCategory ? { background: 'linear-gradient(135deg, #6B9B1F, #86BC25)' } : { background: '#f3f4f6' }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  lang={i18n.language}
                  onDownload={handleDownloadClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Liens vers pages connexes */}
        <ResourcesRelatedLinks />

        {/* CTA — Devis */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Les ressources sont gratuites. L'accompagnement stratégique fait l'objet d'un <strong className="text-white font-semibold">devis confidentiel sur mesure</strong>, adapté à votre contexte et vos enjeux réglementaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#080c14' }}>
                  <i className="ri-mail-send-line" />
                  Demander un devis confidentiel
                </button>
                <button onClick={() => navigate('/services')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:-translate-y-0.5" style={{ border: '1.5px solid rgba(212,175,55,0.35)', color: '#D4AF37', background: 'rgba(212,175,55,0.06)' }}>
                  <i className="ri-stack-line" />
                  Découvrir les 4 Business Units
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>

      <ResourceDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        resource={selectedResource}
      />
    </>
  );
};

export default ResourcesPage;