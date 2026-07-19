import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import publicHubCrossLinks from '@/components/feature/publicHubCrossLinks';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  complianceFactoryKPIs,
  categoriesDocumentaires,
  commentCaMarche,
  faqs,
} from '@/mocks/digitalComplianceFactoryPublic';

export default function DigitalComplianceFactoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(categoriesDocumentaires[0].id);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categorie = categoriesDocumentaires.find(c => c.id === selectedCategory) || categoriesDocumentaires[0];

  return (
    <>
      <SeoHead
        title="Digital Compliance Factory™ — Bibliothèque Documentaire Conformité | KHEPRA EXPERTS"
        description="Digital Compliance Factory KHEPRA : 78 documents de conformité prêts à l'emploi. Politiques LBC/FT, procédures bancaires, cartographies des risques, matrices de contrôle interne, plans d'audit, rapports réglementaires BCEAO COBAC. Templates conformité UEMOA CEMAC, ISO 31000, COSO 2013. 127+ institutions utilisatrices."
        keywords="Digital Compliance Factory, bibliothèque documentaire conformité, templates conformité bancaire, politiques LBC/FT, matrices contrôle interne, plans d'audit, rapports réglementaires BCEAO COBAC, procédures bancaires Afrique, KHEPRA EXPERTS"
        canonicalPath="/digital-compliance-factory"
      />

      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Industrial%20document%20factory%20aesthetic%20with%20warm%20copper%20and%20emerald%20tones%2C%20automated%20conveyor%20systems%20transforming%20regulatory%20texts%20into%20structured%20bound%20documents%2C%20geometric%20architectural%20elements%20inspired%20by%20manufacturing%20precision%2C%20warm%20soft%20daylight%20filtering%20through%20industrial%20glass%20roof%2C%20institutional%20Big%20Four%20consulting%20grade%20visual%20identity%20with%20brass%20copper%20emerald%20gradients%2C%20clean%20organized%20document%20library%20atmosphere&width=1600&height=700&seq=dcf-hero-2026&orientation=landscape"
            alt="Digital Compliance Factory"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-building-2-line text-emerald-600"></i>
              Digital Compliance Factory™ — KHEPRA EXPERTS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Digital Compliance Factory™
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Bibliothèque documentaire de conformité : {complianceFactoryKPIs.totalDocuments} documents prêts à l'emploi dans {complianceFactoryKPIs.categories} catégories. Utilisé par {complianceFactoryKPIs.institutionsUtilisatrices}+ institutions en Afrique francophone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'Documents', value: complianceFactoryKPIs.totalDocuments, icon: 'ri-file-text-line' },
              { label: 'Catégories', value: complianceFactoryKPIs.categories, icon: 'ri-folder-line' },
              { label: 'Téléchargements', value: complianceFactoryKPIs.telechargementsTotal.toLocaleString(), icon: 'ri-download-line' },
              { label: 'Institutions', value: complianceFactoryKPIs.institutionsUtilisatrices, icon: 'ri-building-line' },
              { label: 'Référentiels', value: 'BCEAO, COBAC, OHADA, GAFI, CIMA, ISO', icon: 'ri-shield-check-line' },
              { label: 'Dernier Ajout', value: new Date(complianceFactoryKPIs.dernierAjout).toLocaleDateString('fr-FR'), icon: 'ri-calendar-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-emerald-600 text-lg mb-1 block`}></i>
                <div className={`text-xl font-bold text-foreground-950 ${i === 4 ? 'text-[11px]' : ''}`}>{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Flux de conversion — Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Vos documents de conformité sont-ils à jour ?</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Diagnostic flash gratuit de 30 minutes. Audit rapide de votre documentation conformité : politiques, procédures, matrices de contrôle et rapports réglementaires. Identification des écarts aux standards BCEAO, COBAC et GAFI. Offre limitée aux institutions financières en Afrique francophone.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Comment ça marche */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Comment ça marche</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {commentCaMarche.map(etape => (
                <div key={etape.etape} className="p-5 rounded-xl bg-background-50 border border-background-200/70 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-black">{etape.etape}</div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{etape.titre}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed">{etape.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Category Selector */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-4">Catégories Documentaires</h2>
            <p className="text-sm text-foreground-500 mb-6">Sélectionnez une catégorie pour parcourir les documents disponibles.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {categoriesDocumentaires.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'text-white border-transparent'
                      : 'bg-background-50 text-foreground-600 border-background-200 hover:border-foreground-300'
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: cat.couleur } : {}}
                >
                  <i className={cat.icone}></i>
                  {cat.nom}
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-background-100 border border-background-200'}`}>
                    {cat.documents.length}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Category Detail */}
          <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-10" style={{ borderTop: `4px solid ${categorie.couleur}` }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl" style={{ backgroundColor: categorie.couleur }}>
                <i className={categorie.icone}></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground-950">{categorie.nom}</h3>
                <p className="text-xs text-foreground-500">{categorie.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {categorie.documents.map((doc, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200/70 hover:border-emerald-300 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-xs font-bold text-foreground-950 group-hover:text-emerald-700">{doc.titre}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-50 border border-background-200">{doc.version}</span>
                        <span className="text-[10px] text-foreground-400">{doc.pages} pages</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {doc.conforme.map(ref => (
                          <span key={ref} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{ref}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-center">
                        <div className="text-sm font-bold" style={{ color: categorie.couleur }}>{doc.telechargements}</div>
                        <div className="text-[9px] text-foreground-400">téléchargements</div>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-foreground-950 text-background-50 text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-foreground-800 transition-colors flex items-center gap-1.5">
                        <i className="ri-download-line"></i>Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All categories overview */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Toutes les Catégories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {categoriesDocumentaires.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-5 rounded-xl text-left transition-all cursor-pointer border ${
                    selectedCategory === cat.id ? 'border-foreground-300 bg-foreground-50' : 'bg-background-50 border-background-200/70 hover:border-background-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: cat.couleur }}>
                      <i className={cat.icone}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{cat.nom}</h3>
                      <span className="text-[11px] text-foreground-500">{cat.documents.length} documents</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed line-clamp-2">{cat.description}</p>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Cross-link to KOS hub */}
          <div className="text-center p-8 rounded-2xl bg-emerald-50 border border-emerald-200 mb-8">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Vous êtes un client KHEPRA ?</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">
              Accédez au KOS Compliance Factory Engine™ pour générer automatiquement des documents personnalisés, des matrices de contrôle et des packs de conformité sur mesure.
            </p>
            <Link to="/kos-compliance-factory-engine" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-building-2-line"></i>Accéder au Compliance Factory Engine
            </Link>
          </div>

          <div className="text-center p-8 rounded-2xl bg-background-50 border border-background-200/70">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Besoin d'un document personnalisé ?</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Notre équipe d'experts réglementaires peut générer des documents sur mesure pour votre institution. Contactez-nous pour une demande spécifique.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-200 text-foreground-700 text-sm font-semibold hover:border-foreground-300 transition-colors cursor-pointer">
                <i className="ri-mail-line"></i>Demander un document personnalisé
              </Link>
              <Link to="/diagnostic-flash/" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors cursor-pointer">
                <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
              </Link>
            </div>
          </div>
          {/* KOS Cross-Links */}
          <publicHubCrossLinks currentPage="compliance-factory" />
        </div>
      </div>
    </>
  );
}



