import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SeoHead from '@/components/feature/SeoHead';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';
import { knowledgeDocuments, type KnowledgeDocument } from '@/mocks/knowledgeHubDocuments';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const TYPE_ICONS: Record<string, string> = {
  Circulaire: 'ri-file-text-line', Règlement: 'ri-scales-line', Instruction: 'ri-file-list-3-line',
  Loi: 'ri-scales-3-line', Directive: 'ri-compass-3-line', Recommandation: 'ri-lightbulb-line',
  'Acte Uniforme': 'ri-book-open-line', Rapport: 'ri-bar-chart-line', Guide: 'ri-book-2-line', Norme: 'ri-award-line',
};

const AUTORITE_COLORS: Record<string, string> = {
  BCEAO: '#0D7B5F', COBAC: '#1A1A2E', GAFI: '#8B3A4A', OHADA: '#4A7A1E', UEMOA: '#C2410C',
  CEMAC: '#0D7B5F', OCDE: '#4A5568', GIABA: '#9B7B2C', ISO: '#2563eb', COSO: '#7c3aed', CIMA: '#B8543A',
};

// ─── Schema.org DataCatalog — enrichit la page Knowledge Hub ──────────────────
function buildKnowledgeHubSchema(isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/knowledge-hub#collectionpage`,
        url: `${SITE_URL}/knowledge-hub`,
        name: isEn
          ? 'Knowledge Hub — Regulatory Intelligence Library | KHEPRA EXPERTS'
          : 'Knowledge Hub — Bibliothèque Réglementaire & Intelligence Réglementaire | KHEPRA EXPERTS',
        description: isEn
          ? 'Searchable library of 16+ regulatory documents covering BCEAO, COBAC, GAFI/FATF, OHADA, UEMOA, CEMAC, OECD and ISO standards for Francophone Africa. Circulaires, regulations, directives, norms.'
          : 'Bibliothèque consultable de 16+ documents réglementaires couvrant BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OCDE et normes ISO pour l\'Afrique francophone. Circulaires, règlements, directives, normes.',
        inLanguage: isEn ? 'en-US' : 'fr-FR',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: isEn ? 'Knowledge Hub' : 'Knowledge Hub', item: `${SITE_URL}/knowledge-hub` },
          ],
        },
        mainEntity: {
          '@type': 'DataCatalog',
          '@id': `${SITE_URL}/knowledge-hub#datacatalog`,
          name: isEn ? 'KHEPRA Regulatory Documents Catalog' : 'Catalogue de Documents Réglementaires KHEPRA',
          description: isEn
            ? 'A curated collection of regulatory documents from BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OECD and ISO.'
            : 'Une collection organisée de documents réglementaires de la BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OCDE et ISO.',
          url: `${SITE_URL}/knowledge-hub`,
          keywords: 'BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OCDE, ISO, compliance, regulatory, Afrique francophone',
          dataset: knowledgeDocuments.map((doc) => ({
            '@type': 'Dataset',
            name: doc.titre,
            description: doc.description,
            url: `${SITE_URL}/knowledge-hub`,
            keywords: doc.mots_cles.join(', '),
            datePublished: doc.date_publication,
            identifier: doc.id,
            version: doc.version || '1.0',
            author: {
              '@type': 'Organization',
              name: doc.autorite,
            },
          })),
        },
      },
    ],
  };
}

export default function KnowledgeHubPage() {
  const { i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('Toutes');
  const [autoriteFilter, setAutoriteFilter] = useState<string>('Toutes');
  const [domaineFilter, setDomaineFilter] = useState<string>('Tous');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);

  // Translation
  const { lang, setLang, isEn: ragIsEn, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, { titre?: string; desc?: string }>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  const translatableTotal = useMemo(() => knowledgeDocuments.length * 2, []);
  const translatedCount = useMemo(() => {
    let count = 0;
    for (const doc of knowledgeDocuments) {
      if (translatedItems[doc.id]?.titre) count++;
      if (translatedItems[doc.id]?.desc) count++;
    }
    return count;
  }, [translatedItems]);

  const handleTranslateAll = useCallback(async () => {
    if (!ragIsEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];
    const newTranslated: Record<string, { titre?: string; desc?: string }> = { ...translatedItems };
    for (const doc of knowledgeDocuments) {
      if (!newTranslated[doc.id]?.titre) batch.push(doc.titre);
      if (!newTranslated[doc.id]?.desc) batch.push(doc.description);
    }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try {
      const translated = await translateBatch(batch);
      let idx = 0;
      for (const doc of knowledgeDocuments) {
        if (!newTranslated[doc.id]?.titre && idx < translated.length) { newTranslated[doc.id] = { ...newTranslated[doc.id], titre: translated[idx] }; idx++; }
        if (!newTranslated[doc.id]?.desc && idx < translated.length) { newTranslated[doc.id] = { ...newTranslated[doc.id], desc: translated[idx] }; idx++; }
      }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
    setTranslatingAll(false);
  }, [ragIsEn, translatedItems, translateBatch]);

  const handleTranslateDoc = useCallback(async (doc: KnowledgeDocument) => {
    if (!ragIsEn) return;
    const batch: string[] = [];
    if (!translatedItems[doc.id]?.titre) batch.push(doc.titre);
    if (!translatedItems[doc.id]?.desc) batch.push(doc.description);
    if (batch.length === 0) return;
    try {
      const translated = await translateBatch(batch);
      const newTranslated = { ...translatedItems };
      let idx = 0;
      if (!newTranslated[doc.id]?.titre && idx < translated.length) { newTranslated[doc.id] = { ...newTranslated[doc.id], titre: translated[idx] }; idx++; }
      if (!newTranslated[doc.id]?.desc && idx < translated.length) { newTranslated[doc.id] = { ...newTranslated[doc.id], desc: translated[idx] }; idx++; }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
  }, [ragIsEn, translatedItems, translateBatch]);

  const isEn = ragIsEn || i18n.language === 'en';

  const filtered = useMemo(() => {
    return knowledgeDocuments.filter(d => {
      if (zoneFilter !== 'Toutes' && d.zone !== zoneFilter) return false;
      if (autoriteFilter !== 'Toutes' && d.autorite !== autoriteFilter) return false;
      if (domaineFilter !== 'Tous' && d.domaine !== domaineFilter) return false;
      if (searchQuery && !d.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !d.description.toLowerCase().includes(searchQuery.toLowerCase()) && !d.mots_cles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      return true;
    }).sort((a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime());
  }, [searchQuery, zoneFilter, autoriteFilter, domaineFilter]);

  const zones = useMemo(() => [...new Set(knowledgeDocuments.map(d => d.zone))].sort(), []);
  const autorites = useMemo(() => [...new Set(knowledgeDocuments.map(d => d.autorite))].sort(), []);
  const domaines = useMemo(() => [...new Set(knowledgeDocuments.map(d => d.domaine))].sort(), []);

  const getStatutColor = (statut: string) => {
    const map: Record<string, string> = { 'En vigueur': 'bg-emerald-50 text-emerald-700 border-emerald-200', 'Révisé': 'bg-amber-50 text-amber-700 border-amber-200', 'Abrogé': 'bg-red-50 text-red-700 border-red-200', 'En consultation': 'bg-blue-50 text-blue-700 border-blue-200' };
    return map[statut] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Knowledge Hub | Regulatory Library | KHEPRA OS 2' : 'Knowledge Hub | Bibliothèque Réglementaire | KHEPRA OS 2'}
        description={isEn ? 'Searchable library of 16+ regulatory documents — BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OECD, ISO. Circulaires, regulations, directives, and standards for Francophone Africa.' : 'Bibliothèque consultable de 16+ documents réglementaires — BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OCDE, ISO. Circulaires, règlements, directives et normes pour l\'Afrique francophone.'}
        keywords="knowledge hub, regulatory library, BCEAO documents, COBAC regulations, GAFI recommendations, OHADA acts, regulatory intelligence, compliance library, KHEPRA OS 2"
        canonicalPath="/knowledge-hub"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={buildKnowledgeHubSchema(isEn)}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* ── HEADER ── */}
        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'Knowledge Hub' : 'Knowledge Hub'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Searchable library of regulatory documents, standards, and legal texts for Francophone Africa. Powered by KHEPRA OS 2.' : 'Bibliothèque consultable de documents réglementaires, normes et textes juridiques pour l\'Afrique francophone. Propulsé par KHEPRA OS 2.'}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-foreground-800 text-foreground-300">{knowledgeDocuments.length} documents</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-foreground-800 text-foreground-300">{autorites.length} autorités</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-foreground-800 text-foreground-300">{domaines.length} domaines</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
                {ragIsEn && (
                  <>
                  <button
                    onClick={handleTranslateAll}
                    disabled={translatingAll || translatedCount >= translatableTotal}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border whitespace-nowrap ${
                      translatedCount >= translatableTotal
                        ? 'bg-emerald-50/15 text-emerald-300 border-emerald-400/30'
                        : translatingAll
                        ? 'bg-foreground-800 text-foreground-400 border-foreground-700'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {translatingAll ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                        {isEn ? 'Translating...' : 'Traduction...'}
                      </>
                    ) : translatedCount >= translatableTotal ? (
                      <>
                        <i className="ri-check-double-line text-sm"></i>
                        {isEn ? 'All Translated' : 'Tout traduit'}
                      </>
                    ) : (
                      <>
                        <i className="ri-translate-2 text-sm"></i>
                        {isEn ? 'Translate All' : 'Traduire tout'}
                        {translatedCount > 0 && (
                          <span className={`ml-1 px-1 py-0.5 rounded-full text-[10px] font-bold ${translatedCount >= translatableTotal / 2 ? 'bg-emerald-500/30 text-emerald-200' : 'bg-amber-500/30 text-amber-200'}`}>
                            {translatedCount}/{translatableTotal}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  {cacheCount > 0 && (
                    <div className="relative group">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-download-line text-sm"></i>
                        Export
                      </button>
                      <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[90px]">
                        <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                          <i className="ri-file-excel-2-line mr-1.5"></i>CSV
                        </button>
                        <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                          <i className="ri-code-line mr-1.5"></i>JSON
                        </button>
                      </div>
                    </div>
                  )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="bg-white rounded-2xl border border-background-200/70 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input
                  type="text"
                  placeholder={isEn ? 'Search by title, keyword, or description...' : 'Rechercher par titre, mot-clé ou description...'}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  <option value="Toutes">{isEn ? 'All Zones' : 'Toutes Zones'}</option>
                  {zones.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
                <select value={autoriteFilter} onChange={e => setAutoriteFilter(e.target.value)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  <option value="Toutes">{isEn ? 'All Authorities' : 'Toutes Autorités'}</option>
                  {autorites.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={domaineFilter} onChange={e => setDomaineFilter(e.target.value)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  <option value="Tous">{isEn ? 'All Domains' : 'Tous Domaines'}</option>
                  {domaines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {(zoneFilter !== 'Toutes' || autoriteFilter !== 'Toutes' || domaineFilter !== 'Tous' || searchQuery) && (
                  <button onClick={() => { setZoneFilter('Toutes'); setAutoriteFilter('Toutes'); setDomaineFilter('Tous'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3 text-xs text-foreground-400">{filtered.length} {isEn ? 'document(s) found' : 'document(s) trouvé(s)'}</div>
          </div>
        </section>

        {/* ── DOCUMENTS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(doc => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300 cursor-pointer transition-all group relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${AUTORITE_COLORS[doc.autorite] || '#374151'}12` }}>
                      <i className={`${TYPE_ICONS[doc.type_document] || 'ri-file-text-line'} text-sm`} style={{ color: AUTORITE_COLORS[doc.autorite] || '#374151' }} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${AUTORITE_COLORS[doc.autorite] || '#374151'}12`, color: AUTORITE_COLORS[doc.autorite] || '#374151' }}>{doc.autorite}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {ragIsEn && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleTranslateDoc(doc); }}
                        disabled={!!(translatedItems[doc.id]?.titre && translatedItems[doc.id]?.desc)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer whitespace-nowrap border transition-all ${
                          translatedItems[doc.id]?.titre && translatedItems[doc.id]?.desc
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-background-100 text-foreground-500 border-background-200 hover:bg-accent-50 hover:text-accent-600 hover:border-accent-200'
                        }`}
                      >
                        {translatedItems[doc.id]?.titre && translatedItems[doc.id]?.desc ? 'EN ✓' : 'EN'}
                      </button>
                    )}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatutColor(doc.statut)}`}>{doc.statut}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 mb-2 line-clamp-2 leading-snug group-hover:text-accent-700 transition-colors">{isEn && translatedItems[doc.id]?.titre ? translatedItems[doc.id].titre : doc.titre}</h3>
                <p className="text-xs text-foreground-500 line-clamp-2 mb-3">{isEn && translatedItems[doc.id]?.desc ? translatedItems[doc.id].desc : doc.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {doc.mots_cles.slice(0, 4).map((mk, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-background-100 text-foreground-500">{mk}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 pt-3 border-t border-background-100">
                  <span><i className="ri-calendar-line mr-1" />{new Date(doc.date_publication).toLocaleDateString('fr-FR')}</span>
                  <span><i className="ri-price-tag-3-line mr-1" />{doc.type_document}</span>
                  <span><i className="ri-global-line mr-1" />{doc.zone}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <i className="ri-inbox-line text-3xl text-foreground-300 mb-3 block" />
              <p className="text-foreground-500 text-sm">{isEn ? 'No documents match your search.' : 'Aucun document ne correspond à votre recherche.'}</p>
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-accent-50 rounded-2xl p-8 md:p-10 text-center border border-accent-200">
            <i className="ri-database-2-line text-3xl text-accent-600 mb-3 block" />
            <h2 className="text-xl font-bold font-heading text-foreground-950 mb-2">{isEn ? 'Full Access to 52+ Documents' : 'Accès Complet à 52+ Documents'}</h2>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">
              {isEn ? 'This is a preview of the KHEPRA OS 2 Knowledge Hub. The full library contains 52+ regulatory documents with semantic search (RAG), real-time updates, and personalized alerts.' : 'Ceci est un aperçu du Knowledge Hub KHEPRA OS 2. La bibliothèque complète contient 52+ documents réglementaires avec recherche sémantique (RAG), mises à jour en temps réel et alertes personnalisées.'}
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-accent-600 transition-colors">
              <i className="ri-mail-line" />{isEn ? 'Request Full Access' : 'Demander l\'Accès Complet'}
            </a>
          </div>
        </section>
      </main>

      {/* ── DETAIL MODAL ── */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setSelectedDoc(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${AUTORITE_COLORS[selectedDoc.autorite] || '#374151'}12` }}>
                  <i className={`${TYPE_ICONS[selectedDoc.type_document] || 'ri-file-text-line'} text-sm`} style={{ color: AUTORITE_COLORS[selectedDoc.autorite] || '#374151' }} />
                </div>
                <span className="text-sm font-bold text-foreground-950">{selectedDoc.autorite}</span>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatutColor(selectedDoc.statut)}`}>{selectedDoc.statut}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{selectedDoc.type_document}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{selectedDoc.zone}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{selectedDoc.domaine}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-1">{isEn && translatedItems[selectedDoc.id]?.titre ? translatedItems[selectedDoc.id].titre : selectedDoc.titre}</h2>
              <p className="text-xs text-foreground-400 mb-3">{selectedDoc.version} · {new Date(selectedDoc.date_publication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-sm text-foreground-700 leading-relaxed mb-4">{isEn && translatedItems[selectedDoc.id]?.desc ? translatedItems[selectedDoc.id].desc : selectedDoc.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedDoc.mots_cles.map((mk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-accent-50 text-accent-700 border border-accent-200">{mk}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}