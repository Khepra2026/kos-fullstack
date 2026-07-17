import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

const SECTORS = [
  {
    id: 'banques',
    icon: 'ri-bank-line',
    name: 'Banques & Établissements de Crédit',
    zone: 'UEMOA + CEMAC',
    description: 'Suivi des agréments, ratios prudentiels, gouvernance, conformité LCB/FT, IFRS 9, stress tests et transformation digitale des banques commerciales africaines.',
    publications: ['Rapport trimestriel — Conformité Bancaire', 'Benchmark — Ratios Prudentiels', 'Baromètre — Gouvernance Bancaire'],
    indices: ['KOS Banking Compliance Index™', 'KOS Bank Governance Score™', 'KOS Credit Risk Barometer™'],
    color: '#2d7518',
  },
  {
    id: 'fintechs',
    icon: 'ri-smartphone-line',
    name: 'FinTechs & Établissements de Paiement',
    zone: 'UEMOA + CEMAC + Diaspora',
    description: 'Licenses FinTech, bacs à sable réglementaires, open banking, mobile money, néobanques, agrégateurs de paiement et évolution du cadre réglementaire.',
    publications: ['Rapport semestriel — FinTech Regulatory Landscape', 'Benchmark — Mobile Money & Inclusion', 'Baromètre — Innovation Financière'],
    indices: ['KOS FinTech Maturity Index™', 'KOS Open Banking Readiness™', 'KOS Digital Payment Tracker™'],
    color: '#d4a82a',
  },
  {
    id: 'pme',
    icon: 'ri-store-2-line',
    name: 'PME & ETI — Afrique Francophone',
    zone: '17 pays UEMOA/CEMAC',
    description: 'Financement des PME, mécanismes de garantie (FAGACE, ARIZ), due diligence investisseurs, transformation digitale, conformité ESG et accès aux marchés.',
    publications: ['Rapport annuel — Financement PME Afrique', 'Benchmark — ESG PME', 'Guide — Due Diligence Investisseurs'],
    indices: ['KOS SME Health Index™', 'KOS Investment Readiness Score™', 'KOS SME ESG Maturity™'],
    color: '#378e1d',
  },
  {
    id: 'energie',
    icon: 'ri-flashlight-line',
    name: 'Énergie & Infrastructures',
    zone: 'UEMOA + CEMAC + CEDEAO',
    description: 'Projets énergétiques, PPP, financement d\'infrastructures, due diligence ESG, conformité réglementaire secteur extractif et transition énergétique.',
    publications: ['Rapport semestriel — Énergie & Infrastructures', 'Benchmark — ESG Projets Extractifs', 'Baromètre — PPP & Financement'],
    indices: ['KOS Energy Project Viability™', 'KOS Extractives Compliance™', 'KOS Infrastructure ESG Score™'],
    color: '#5ba832',
  },
  {
    id: 'agriculture',
    icon: 'ri-plant-line',
    name: 'Agriculture & Agro-Industrie',
    zone: 'UEMOA + CEMAC + CEDEAO',
    description: 'Financement agricole, chaînes de valeur, certification bio et commerce équitable, gestion des risques climatiques, conformité foncière et ESG.',
    publications: ['Rapport annuel — Agri-Business Afrique', 'Benchmark — Chaînes de Valeur', 'Baromètre — Risques Climatiques'],
    indices: ['KOS Agri Value Chain Index™', 'KOS Climate Risk Score™', 'KOS Land Compliance Index™'],
    color: '#2d7518',
  },
  {
    id: 'esg',
    icon: 'ri-leaf-line',
    name: 'ESG & Développement Durable',
    zone: 'Panafricain — 54 pays',
    description: 'Notation ESG, conformité ISSB/IFRS S1-S2, taxonomie verte, obligations durables, due diligence chaîne d\'approvisionnement et reporting extra-financier.',
    publications: ['Rapport trimestriel — ESG Regulatory Update', 'Benchmark — Notation ESG Secteurs', 'Baromètre — Finance Durable'],
    indices: ['KOS ESG Compliance Score™', 'KOS Green Finance Tracker™', 'KOS Supply Chain ESG™'],
    color: '#d4a82a',
  },
  {
    id: 'microfinance',
    icon: 'ri-hand-heart-line',
    name: 'Microfinance & Inclusion Financière',
    zone: 'UEMOA — 8 pays',
    description: 'Agréments SFD, ratios prudentiels BCEAO, digitalisation, finance islamique, protection des clients et inclusion financière en zone UEMOA.',
    publications: ['Rapport trimestriel — Secteur SFD', 'Benchmark — Performance SFD', 'Baromètre — Inclusion Financière'],
    indices: ['KOS SFD Health Score™', 'KOS Financial Inclusion Index™', 'KOS Digital MFI Readiness™'],
    color: '#378e1d',
  },
];

const CALENDAR = [
  { q: 'T1', m: 'Jan–Mars', pubs: ['Conformité Bancaire', 'Secteur SFD UEMOA', 'ESG Regulatory Update'] },
  { q: 'T2', m: 'Avr–Juin', pubs: ['FinTech Regulatory Landscape', 'Gouvernance Bancaire', 'Performance SFD', 'Énergie & Infrastructures'] },
  { q: 'T3', m: 'Juil–Sept', pubs: ['Conformité Bancaire', 'Secteur SFD UEMOA', 'ESG Regulatory Update'] },
  { q: 'T4', m: 'Oct–Déc', pubs: ['Rapports Annuels (7 secteurs)', 'Financement PME', 'Agri-Business', 'Finance Durable'] },
];

const KPIS = [
  { value: '7', label: 'Secteurs couverts', icon: 'ri-pie-chart-line' },
  { value: '24', label: 'Publications/an', icon: 'ri-book-open-line' },
  { value: '21', label: 'Indices KOS™', icon: 'ri-bar-chart-line' },
  { value: '17', label: 'Pays UEMOA/CEMAC', icon: 'ri-global-line' },
  { value: '54', label: 'Pays ESG', icon: 'ri-earth-line' },
  { value: '8', label: 'Régulateurs suivis', icon: 'ri-building-line' },
];

export default function ObservatoiresSectorielsPage() {
  const navigate = useNavigate();
  const { lang, setLang, isEn, t, translateText, translateBatch, translating, cacheCount, exportCache, targetLang, setTargetLang, targetLabels } = useRAGTranslation();
  const [selectedSector, setSelectedSector] = useState(0);
  const [translatedSectors, setTranslatedSectors] = useState<Record<string, string>>({});
  const [translatedPublications, setTranslatedPublications] = useState<Record<string, string>>({});
  const [translatedIndices, setTranslatedIndices] = useState<Record<string, string>>({});
  const [translatedCalendar, setTranslatedCalendar] = useState<Record<string, string>>({});
  const [translatedMethodology, setTranslatedMethodology] = useState<Record<string, string>>({});

  const getTranslated = (original: string, cache: Record<string, string>) => (
    isEn && cache[original] ? cache[original] : original
  );

  const totalTranslatable = (() => {
    let count = 0;
    count += SECTORS.length; // descriptions
    count += SECTORS.reduce((s, sec) => s + sec.publications.length + sec.indices.length, 0);
    count += CALENDAR.reduce((s, q) => s + q.pubs.length, 0);
    count += 3; // methodology descriptions
    return count;
  })();

  const allTranslatedCaches = { ...translatedSectors, ...translatedPublications, ...translatedIndices, ...translatedCalendar, ...translatedMethodology };
  const totalTranslated = Object.keys(allTranslatedCaches).length;

  const handleTranslateAll = useCallback(async () => {
    const sectorDescs = SECTORS.map((s) => s.description);
    const pubNames = SECTORS.flatMap((s) => s.publications);
    const indexNames = SECTORS.flatMap((s) => s.indices);
    const calendarPubs = CALENDAR.flatMap((q) => q.pubs);
    const methodologyTexts = [
      'Sources réglementaires officielles, données BC EAO/COBAC, états financiers audités, rapports annuels. Validation croisée multi-sources.',
      'Méthodologies ISA 315/330, matrices de risques, scoring quantitatif et qualitatif, benchmarks internationaux (FMI, Banque Mondiale).',
      'Rapports multilingues FR/EN/PT, SEO optimisé, diffusion LinkedIn/YouTube/TikTok, citations académiques, backlinks institutionnels.',
    ];

    const allTexts = [...sectorDescs, ...pubNames, ...indexNames, ...calendarPubs, ...methodologyTexts];
    const translated = await translateBatch(allTexts);

    let idx = 0;
    const sMap: Record<string, string> = {};
    sectorDescs.forEach((n) => { sMap[n] = translated[idx++] || n; });
    const pMap: Record<string, string> = {};
    pubNames.forEach((n) => { pMap[n] = translated[idx++] || n; });
    const iMap: Record<string, string> = {};
    indexNames.forEach((n) => { iMap[n] = translated[idx++] || n; });
    const cMap: Record<string, string> = {};
    calendarPubs.forEach((n) => { cMap[n] = translated[idx++] || n; });
    const mMap: Record<string, string> = {};
    methodologyTexts.forEach((n) => { mMap[n] = translated[idx++] || n; });

    setTranslatedSectors((prev) => ({ ...prev, ...sMap }));
    setTranslatedPublications((prev) => ({ ...prev, ...pMap }));
    setTranslatedIndices((prev) => ({ ...prev, ...iMap }));
    setTranslatedCalendar((prev) => ({ ...prev, ...cMap }));
    setTranslatedMethodology((prev) => ({ ...prev, ...mMap }));
  }, [translateBatch]);

  const translateSingle = useCallback(async (text: string, cache: Record<string, string>, setter: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
    if (cache[text]) return;
    const res = await translateText(text);
    if (res !== text) setter((prev) => ({ ...prev, [text]: res }));
  }, [translateText]);

  return (
    <>
      <SeoHead
        title="Observatoires Sectoriels — Banques, FinTech, PME, Énergie, Agriculture, ESG, Microfinance — KOS Authority"
        description="7 observatoires sectoriels KOS : Banques, FinTechs, PME, Énergie & Infrastructures, Agriculture & Agro-Industrie, ESG & Développement Durable, Microfinance. 24 publications annuelles, 21 indices KOS™, benchmarks UEMOA/CEMAC. Accès sur contrat institutionnel."
        keywords="observatoires sectoriels Afrique, banques UEMOA CEMAC, FinTech Africa, PME Afrique financement, énergie infrastructures Afrique, agriculture agro-industrie Afrique, ESG Afrique, microfinance BCEAO, KOS Authority"
        canonicalPath="/observatoires-sectoriels/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3ec 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label={t('KOS Authority — Intelligence Sectorielle', 'KOS Authority — Sector Intelligence')} variant="centered-pillars" icon="ri-radar-line" accentColor="primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 text-center leading-tight">
              {t('Observatoires', 'Observatories')}{' '}
              <span style={{ color: '#2d7518' }}>{t('Sectoriels', 'Sectoral')}</span>{' '}
              {t('Afrique Francophone', 'Francophone Africa')}
            </h1>
            <p className="text-xl text-foreground-600 mb-10 max-w-3xl mx-auto text-center leading-relaxed">
              {isEn
                ? <>7 key sectors, 24 annual publications, 21 proprietary indices. The reference data for any investment or compliance decision in Francophone Africa. <strong className="text-foreground-900">Access by institutional contract.</strong></>
                : <>7 secteurs clés, 24 publications annuelles, 21 indices propriétaires. La donnée de référence pour toute décision d&apos;investissement ou de conformité en Afrique francophone. <strong className="text-foreground-900">Accès sur contrat institutionnel.</strong></>
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
              <button
                onClick={handleTranslateAll}
                disabled={translating}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                  totalTranslated >= totalTranslatable && totalTranslatable > 0
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-accent-100 text-accent-700 border border-accent-200 hover:bg-accent-200'
                }`}
              >
                {translating ? (
                  <><i className="ri-loader-4-line animate-spin"></i>Translating...</>
                ) : totalTranslated >= totalTranslatable && totalTranslatable > 0 ? (
                  <>{t('Tout traduit', 'All Translated')} <i className="ri-check-double-line"></i></>
                ) : (
                  <>{t('Traduire tout', 'Translate All')}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      totalTranslated > totalTranslatable / 2 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                    }`}>{totalTranslated}/{totalTranslatable}</span>
                  </>
                )}
              </button>
              {cacheCount > 0 && (
                <div className="relative group">
                  <button className="whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 cursor-pointer bg-white/70 border border-background-200 text-foreground-500 hover:text-foreground-700 transition-colors">
                    <i className="ri-download-2-line"></i>
                    <span className="hidden sm:inline">{t('Exporter', 'Export')}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 hidden group-hover:block min-w-[120px]">
                    <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-xs text-foreground-700 hover:bg-background-50 flex items-center gap-2 cursor-pointer whitespace-nowrap">
                      <i className="ri-file-excel-2-line text-emerald-600"></i>CSV
                    </button>
                    <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-xs text-foreground-700 hover:bg-background-50 flex items-center gap-2 cursor-pointer whitespace-nowrap">
                      <i className="ri-code-line text-amber-600"></i>JSON
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
              {KPIS.map((kpi, i) => (
                <div key={i} className="bg-white/70 rounded-xl p-4 text-center border border-background-200">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#2d7518' }}>{kpi.value}</div>
                  <div className="text-xs text-foreground-500 font-medium flex items-center justify-center gap-1.5">
                    <i className={kpi.icon} style={{ color: '#5ba832' }} />
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                {t('Demander un accès institutionnel', 'Request Institutional Access')}
              </button>
              <button onClick={() => navigate('/observatoires-sectoriels/comparatif/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#d4a82a', borderColor: 'rgba(212,168,42,0.4)', background: 'rgba(212,168,42,0.06)' }}>
                <i className="ri-bar-chart-grouped-line" />
                {t('Benchmark Comparatif 7 Secteurs', 'Benchmark 7-Sector Comparison')}
              </button>
              <button onClick={() => navigate('/observatoire-reglementaire-africain/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#2d7518', borderColor: 'rgba(45,117,24,0.3)', background: 'rgba(45,117,24,0.04)' }}>
                <i className="ri-radar-line" />
                {t('Hub Réglementaire — 8 régulateurs', 'Regulatory Hub — 8 regulators')}
              </button>
              <button onClick={() => navigate('/hub-reglementations-nationales/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#d4a82a', borderColor: 'rgba(212,168,42,0.4)', background: 'rgba(212,168,42,0.06)' }}>
                <i className="ri-government-line" />
                {t('Hub National — 17 pays', 'National Hub — 17 countries')}
              </button>
            </div>
          </div>
        </section>

        {/* 7 Sectors Grid */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label={t('7 Secteurs Prioritaires', '7 Priority Sectors')} variant="left-accent" icon="ri-stack-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">{t("Couverture exhaustive de l'économie africaine", 'Exhaustive coverage of the African economy')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SECTORS.map((sector, i) => (
                <div
                  key={sector.id}
                  className={`rounded-2xl p-6 bg-white border-2 transition-all cursor-pointer ${selectedSector === i ? 'shadow-lg' : 'border-background-200 hover:border-background-300'}`}
                  style={selectedSector === i ? { borderColor: sector.color } : {}}
                  onClick={() => setSelectedSector(i)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${sector.color}15`, border: `1px solid ${sector.color}30` }}>
                      <i className={`${sector.icon} text-xl`} style={{ color: sector.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-display font-bold text-foreground-950">{sector.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex-shrink-0" style={{ background: sector.color }}>{sector.zone}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 mb-5 leading-relaxed">
                    {getTranslated(sector.description, translatedSectors)}
                    {isEn && translatedSectors[sector.description] && (
                      <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                    )}
                  </p>
                  {isEn && !translatedSectors[sector.description] && (
                    <button
                      onClick={(e) => { e.stopPropagation(); translateSingle(sector.description, translatedSectors, setTranslatedSectors); }}
                      className="mb-3 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                    >{t('Traduire', 'Translate')}</button>
                  )}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-2">{t('Publications', 'Publications')}</p>
                    <div className="space-y-1.5">
                      {sector.publications.map((pub, pi) => (
                        <div key={pi} className="text-xs text-foreground-700 bg-background-50 rounded-lg px-3 py-1.5 flex items-center gap-2">
                          <i className="ri-file-text-line text-xs" style={{ color: sector.color }} />
                          {getTranslated(pub, translatedPublications)}
                          {isEn && translatedPublications[pub] && (
                            <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-background-200">
                    <p className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-2">Indices KOS™</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.indices.map((idx, ii) => (
                        <span key={ii} className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: `${sector.color}10`, color: sector.color }}>
                          {getTranslated(idx, translatedIndices)}
                          {isEn && translatedIndices[idx] && (
                            <span className="ml-0.5 text-[9px]"> ✓</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(sector.id === 'banques' || sector.id === 'fintechs' || sector.id === 'pme' || sector.id === 'energie' || sector.id === 'agriculture' || sector.id === 'esg' || sector.id === 'microfinance') && (
                    <div className="mt-4 pt-4 border-t border-background-200 flex justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/observatoires-sectoriels/${sector.id}/`); }}
                        className="flex items-center gap-1.5 text-xs font-bold cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                        style={{ color: sector.color }}
                      >
                        <i className="ri-dashboard-line" />
                        {t('Dashboard détaillé', 'Detailed Dashboard')}
                        <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label={t('Calendrier Annuel', 'Annual Calendar')} variant="left-accent" icon="ri-calendar-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">{t('24 publications synchronisées', '24 synchronized publications')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {CALENDAR.map((q, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>{q.q}</div>
                    <div>
                      <div className="text-xs font-bold text-foreground-950">{q.m}</div>
                      <div className="text-xs text-foreground-500">{q.pubs.length} {t('publications', 'publications')}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {q.pubs.map((pub, pi) => (
                      <div key={pi} className="text-xs text-foreground-600 bg-background-50 rounded-lg px-3 py-1.5">
                        {getTranslated(pub, translatedCalendar)}
                        {isEn && translatedCalendar[pub] && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label={t('Méthodologie Big Four', 'Big Four Methodology')} variant="left-accent" icon="ri-scales-3-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-4">{t('Standards ISA/IFRS — Certification ISO 27001', 'ISA/IFRS Standards — ISO 27001 Certification')}</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">{isEn ? 'Each observatory applies Big Four audit methodologies, IFRS standards, and ISO/IEC 27001 data governance standards.' : 'Chaque observatoire applique les méthodologies d\'audit Big Four, les normes IFRS et les standards de gouvernance des données ISO/IEC 27001.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: t('Collecte & Validation', 'Collection & Validation'), icon: 'ri-database-2-line', desc: 'Sources réglementaires officielles, données BC EAO/COBAC, états financiers audités, rapports annuels. Validation croisée multi-sources.' },
                { title: t('Analyse & Scoring', 'Analysis & Scoring'), icon: 'ri-bar-chart-box-line', desc: 'Méthodologies ISA 315/330, matrices de risques, scoring quantitatif et qualitatif, benchmarks internationaux (FMI, Banque Mondiale).' },
                { title: t('Publication & Diffusion', 'Publication & Distribution'), icon: 'ri-send-plane-line', desc: 'Rapports multilingues FR/EN/PT, SEO optimisé, diffusion LinkedIn/YouTube/TikTok, citations académiques, backlinks institutionnels.' },
              ].map((m, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-background-200 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-4" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}>
                    <i className={`${m.icon} text-lg`} style={{ color: '#d4a82a' }} />
                  </div>
                  <h3 className="text-base font-bold text-foreground-950 mb-2">{m.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {getTranslated(m.desc, translatedMethodology)}
                    {isEn && translatedMethodology[m.desc] && (
                      <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-radar-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t("Accédez à l'intelligence sectorielle africaine", 'Access African Sector Intelligence')}</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">{isEn ? '7 sectors, 24 publications/year, 21 KOS™ indices. Institutional contract by quote — our experts guide you.' : '7 secteurs, 24 publications/an, 21 indices KOS™. Contrat institutionnel sur devis — nos experts vous accompagnent.'}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                {t('Demander un devis', 'Request a Quote')}
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}