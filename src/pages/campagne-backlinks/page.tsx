import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { backlinkTargets, statsBacklinks, KPIsBacklinks, contenuLinkable, type BacklinkTarget } from '@/mocks/backlinksCampaign';

type CategorieFilter = 'Toutes' | BacklinkTarget['categorie'];
type StatutFilter = 'Tous' | BacklinkTarget['statut'];
type PrioriteFilter = 'Toutes' | BacklinkTarget['priorite'];

const STATUT_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  'Acquis': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'ri-check-double-fill' },
  'En discussion': { bg: 'bg-amber-100', text: 'text-amber-700', icon: 'ri-chat-3-line' },
  'Contacté': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'ri-mail-send-line' },
  'À contacter': { bg: 'bg-background-200', text: 'text-foreground-500', icon: 'ri-time-line' },
  'Refusé': { bg: 'bg-red-100', text: 'text-red-700', icon: 'ri-close-circle-line' },
};

const PRIORITE_STYLES: Record<string, string> = {
  'Critique': '#DC2626', 'Élevée': '#F59E0B', 'Moyenne': '#6366F1',
};

const CATEGORIE_COLORS: Record<string, string> = {
  'Institution Financière': '#0D7B5F', 'Organisation Internationale': '#1A1A2E', 'Université & Think Tank': '#4A7A1E', 'Média Économique': '#C2410C', 'Plateforme Fintech': '#6366F1',
};

export default function CampagneBacklinksPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [categorieFilter, setCategorieFilter] = useState<CategorieFilter>('Toutes');
  const [statutFilter, setStatutFilter] = useState<StatutFilter>('Tous');
  const [prioriteFilter, setPrioriteFilter] = useState<PrioriteFilter>('Toutes');
  const [search, setSearch] = useState('');
  const [selectedCible, setSelectedCible] = useState<BacklinkTarget | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = useMemo(() => {
    return backlinkTargets.filter(b => {
      if (categorieFilter !== 'Toutes' && b.categorie !== categorieFilter) return false;
      if (statutFilter !== 'Tous' && b.statut !== statutFilter) return false;
      if (prioriteFilter !== 'Toutes' && b.priorite !== prioriteFilter) return false;
      if (search && !b.nom.toLowerCase().includes(search.toLowerCase()) && !b.url.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const ordre: Record<string, number> = { 'Acquis': 0, 'En discussion': 1, 'Contacté': 2, 'À contacter': 3, 'Refusé': 4 };
      return ordre[a.statut] - ordre[b.statut];
    });
  }, [categorieFilter, statutFilter, prioriteFilter, search]);

  const categories: CategorieFilter[] = ['Toutes', 'Institution Financière', 'Organisation Internationale', 'Université & Think Tank', 'Média Économique', 'Plateforme Fintech'];
  const statuts: StatutFilter[] = ['Tous', 'Acquis', 'En discussion', 'Contacté', 'À contacter', 'Refusé'];
  const priorites: PrioriteFilter[] = ['Toutes', 'Critique', 'Élevée', 'Moyenne'];

  const daGained = KPIsBacklinks.daCible - KPIsBacklinks.daActuel;
  const progressPct = Math.round((KPIsBacklinks.backlinksAcquis / 100) * 100);

  return (
    <>
      <SeoHead
        title={isEn ? 'Backlinks Campaign 2026 | KHEPRA EXPERTS Authority Building' : 'Campagne Backlinks 2026 | Construction d\'Autorité KHEPRA EXPERTS'}
        description={isEn ? 'KHEPRA EXPERTS backlinks acquisition campaign tracking. 35 target domains, institutional and media partners, content linkable assets. Authority building for UEMOA financial regulation leadership.' : 'Suivi de campagne d\'acquisition de backlinks KHEPRA EXPERTS. 35 domaines cibles, partenaires institutionnels et médias, contenus linkables. Construction d\'autorité pour le leadership en régulation financière UEMOA.'}
        keywords="backlinks campagne, autorité domaine, acquisition backlinks, partenariats institutionnels, SEO Afrique, KHEPRA EXPERTS backlinks"
        canonicalPath="/campagne-backlinks"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: isEn ? 'Backlinks Campaign' : 'Campagne Backlinks', path: '/campagne-backlinks' }]} />

        {/* ── HERO ── */}
        <section className="relative bg-foreground-950 text-white overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(13,123,95,0.06) 0%, transparent 60%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-400">{isEn ? 'Authority Building — Active Campaign' : 'Construction d\'Autorité — Campagne Active'}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">{isEn ? 'Backlinks & Authority Campaign 2026' : 'Campagne Backlinks & Autorité 2026'}</h1>
                <p className="text-sm text-foreground-400 leading-relaxed">
                  {isEn ? 'Strategic backlinks acquisition across 35 institutional, academic, and media domains. Target: 100+ quality backlinks, Domain Authority 35+, 15K monthly organic traffic. Powered by KHEPRA OS 2 Content & Growth Engines.' : 'Acquisition stratégique de backlinks auprès de 35 domaines institutionnels, académiques et médias. Objectif : 100+ backlinks de qualité, Domain Authority 35+, 15K trafic organique mensuel. Propulsé par KHEPRA OS 2 Content & Growth Engines.'}
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Link to="/barometre-bceao-2026" className="px-5 py-2.5 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                    <i className="ri-bar-chart-line mr-2" />{isEn ? 'BCEAO Barometer 2026' : 'Baromètre BCEAO 2026'}
                  </Link>
                  <Link to="/think-tank" className="px-5 py-2.5 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                    <i className="ri-lightbulb-line mr-2" />{isEn ? 'Think Tank' : 'Think Tank'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KPI CARDS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: isEn ? 'Acquired' : 'Acquis', value: KPIsBacklinks.backlinksAcquis, sub: isEn ? 'backlinks' : 'backlinks', color: '#10B981', icon: 'ri-check-double-fill' },
              { label: isEn ? 'In Progress' : 'En cours', value: KPIsBacklinks.backlinksEnCours, sub: isEn ? 'discussions' : 'discussions', color: '#F59E0B', icon: 'ri-chat-3-line' },
              { label: isEn ? 'Ref. Domains' : 'Domaines Réf.', value: KPIsBacklinks.domainesReferents, sub: `${isEn ? 'target:' : 'cible:'} ${KPIsBacklinks.domainesCible}`, color: '#6366F1', icon: 'ri-global-line' },
              { label: isEn ? 'Current DA' : 'DA Actuel', value: KPIsBacklinks.daActuel, sub: `${isEn ? 'target:' : 'cible:'} ${KPIsBacklinks.daCible}`, color: '#0D7B5F', icon: 'ri-bar-chart-2-line' },
              { label: isEn ? 'Crit. Targets' : 'Cibles Crit.', value: backlinkTargets.filter(b => b.priorite === 'Critique').length, sub: statsBacklinks.aContacter > 0 ? `${statsBacklinks.aContacter} ${isEn ? 'pending' : 'en attente'}` : '', color: '#DC2626', icon: 'ri-alert-fill' },
              { label: isEn ? 'DA Gained' : 'DA Gagné', value: `+${daGained}`, sub: isEn ? 'in 6 months' : 'en 6 mois', color: '#4A7A1E', icon: 'ri-arrow-up-line' },
              { label: isEn ? 'Org. Traffic' : 'Trafic Org.', value: `${(KPIsBacklinks.traficOrganiqueMensuel / 1000).toFixed(1)}K`, sub: `${isEn ? 'target:' : 'cible:'} ${(KPIsBacklinks.traficCibleMensuel / 1000).toFixed(0)}K/mois`, color: '#C2410C', icon: 'ri-line-chart-line' },
              { label: isEn ? 'Progress' : 'Progression', value: `${statsBacklinks.scoreProgression}%`, sub: `${isEn ? 'target:' : 'cible:'} ${statsBacklinks.scoreCible90jours}%`, color: '#6366F1', icon: 'ri-rocket-line' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-background-200/70 flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${s.color}12` }}>
                  <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] text-foreground-400">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROGRESS BAR ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="bg-white rounded-2xl border border-background-200/70 p-5">
            <div className="flex items-end justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold font-heading text-foreground-950">{isEn ? 'Campaign Progress — J+90 Target: 55%' : 'Progression Campagne — Objectif J+90 : 55%'}</h3>
                <p className="text-xs text-foreground-500 mt-0.5">{backlinkTargets.filter(b => b.statut === 'Acquis' || b.statut === 'En discussion').length} {isEn ? 'targets engaged out of' : 'cibles engagées sur'} {statsBacklinks.totalCibles}</p>
              </div>
              <span className="text-lg font-bold font-heading" style={{ color: '#6366F1' }}>{statsBacklinks.scoreProgression}%</span>
            </div>
            <div className="h-3 rounded-full bg-background-100 overflow-hidden mb-4">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-500 transition-all duration-1000" style={{ width: `${statsBacklinks.scoreProgression}%` }} />
            </div>
            <div className="flex items-center gap-4 text-[10px] text-foreground-400">
              {[
                { l: isEn ? 'Acquired' : 'Acquis', v: statsBacklinks.acquis, c: '#10B981' },
                { l: isEn ? 'In Discussion' : 'En discussion', v: statsBacklinks.enDiscussion, c: '#F59E0B' },
                { l: isEn ? 'Contacted' : 'Contactés', v: statsBacklinks.contactes, c: '#3B82F6' },
                { l: isEn ? 'To Contact' : 'À contacter', v: statsBacklinks.aContacter, c: '#9CA3AF' },
                { l: isEn ? 'Refused' : 'Refusés', v: statsBacklinks.refuses, c: '#EF4444' },
              ].map(s => (
                <div key={s.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                  <span>{s.l}: <strong className="text-foreground-700">{s.v}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
          <div className="bg-white rounded-2xl border border-background-200/70 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input type="text" placeholder={isEn ? 'Search domain or target...' : 'Rechercher un domaine...'} value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={statutFilter} onChange={e => setStatutFilter(e.target.value as StatutFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {statuts.map(s => <option key={s} value={s}>{s === 'Tous' ? (isEn ? 'All Statuses' : 'Tous Statuts') : s}</option>)}
                </select>
                <select value={categorieFilter} onChange={e => setCategorieFilter(e.target.value as CategorieFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {categories.map(c => <option key={c} value={c}>{c === 'Toutes' ? (isEn ? 'All Categories' : 'Toutes Catégories') : c}</option>)}
                </select>
                <select value={prioriteFilter} onChange={e => setPrioriteFilter(e.target.value as PrioriteFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {priorites.map(p => <option key={p} value={p}>{p === 'Toutes' ? (isEn ? 'All Priorities' : 'Toutes Priorités') : p}</option>)}
                </select>
                {(categorieFilter !== 'Toutes' || statutFilter !== 'Tous' || prioriteFilter !== 'Toutes' || search) && (
                  <button onClick={() => { setCategorieFilter('Toutes'); setStatutFilter('Tous'); setPrioriteFilter('Toutes'); setSearch(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── TABLE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center"><i className="ri-inbox-line text-3xl text-foreground-300 mb-3 block" /><p className="text-foreground-500 text-sm">{isEn ? 'No targets found.' : 'Aucune cible trouvée.'}</p></div>
            ) : (
              <div className="divide-y divide-background-100">
                {filtered.map(cible => {
                  const sStat = STATUT_STYLES[cible.statut];
                  return (
                    <div key={cible.id} className="hover:bg-background-50/50 transition-colors">
                      <div className="flex items-center gap-3 md:gap-4 p-4 cursor-pointer" onClick={() => { setSelectedCible(cible); setShowDetail(true); }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${CATEGORIE_COLORS[cible.categorie] || '#374151'}12` }}>
                          <i className="ri-building-4-line text-sm" style={{ color: CATEGORIE_COLORS[cible.categorie] || '#374151' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-foreground-950">{cible.nom}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600">{cible.categorie}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${sStat.bg} ${sStat.text}`}>
                              <i className={`${sStat.icon} mr-0.5`} />{cible.statut}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                            <span className="truncate max-w-[180px]">{cible.url}</span>
                            <span className="font-bold text-foreground-600">DA {cible.da}</span>
                            <span>{isEn ? 'Traffic' : 'Trafic'} {(cible.traficMensuel / 1000).toFixed(0)}K/mois</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${PRIORITE_STYLES[cible.priorite]}12`, color: PRIORITE_STYLES[cible.priorite] }}>{cible.priorite}</span>
                          <span className="hidden md:inline text-[10px] text-foreground-400">{cible.typeLien}</span>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedCible(cible); setShowDetail(true); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 hover:bg-accent-100 transition-colors cursor-pointer">
                            <i className="ri-eye-line text-sm text-foreground-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CONTENU LINKABLE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Linkable Content Assets' : 'Contenus Linkables'}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contenuLinkable.map(content => (
              <div key={content.titre} className="bg-white rounded-2xl border border-background-200/70 p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${content.statut === 'Publié' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{content.statut}</span>
                  <span className="text-[10px] text-foreground-400">{content.datePublication}</span>
                </div>
                <h3 className="text-sm font-bold font-heading text-foreground-950 mb-2 leading-snug">{content.titre}</h3>
                <div className="text-[10px] text-foreground-500 mb-3">{content.type}</div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                  {content.backlinks > 0 && <span><i className="ri-link mr-1" />{content.backlinks} {isEn ? 'backlinks' : 'backlinks'}</span>}
                  {content.telechargements > 0 && <span><i className="ri-download-line mr-1" />{content.telechargements} {isEn ? 'dls' : 'téléch.'}</span>}
                  {content.backlinks === 0 && content.telechargements === 0 && <span className="text-foreground-300">{isEn ? 'Coming soon' : 'À venir'}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUTREACH STRATEGY ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8">
            <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Outreach Strategy — 4 Templates' : 'Stratégie Outreach — 4 Templates'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { titre: isEn ? 'Institutional Partners' : 'Partenaires Institutionnels', icon: 'ri-building-4-line', desc: isEn ? 'BCEAO, BEAC, BOAD, AfDB, IMF, World Bank. Approach: co-branding reports, joint webinars, data partnerships.' : 'BCEAO, BEAC, BOAD, BAD, FMI, Banque Mondiale. Approche : co-branding rapports, webinaires conjoints, partenariats données.' },
                { titre: isEn ? 'Media Outlets' : 'Médias Économiques', icon: 'ri-newspaper-line', desc: isEn ? 'Jeune Afrique, The Africa Report, Financial Afrik, TechCabal. Approach: expert bylines, interviews, exclusive data sharing.' : 'Jeune Afrique, The Africa Report, Financial Afrik, TechCabal. Approche : tribunes expert, interviews, partage données exclusives.' },
                { titre: isEn ? 'Universities & Think Tanks' : 'Universités & Think Tanks', icon: 'ri-graduation-cap-line', desc: isEn ? 'Harvard, Brookings, Chatham House, AERC, CERDI. Approach: joint research, guest lectures, case studies.' : 'Harvard, Brookings, Chatham House, AERC, CERDI. Approche : recherches conjointes, guest lectures, études de cas.' },
                { titre: isEn ? 'Fintech & Industry' : 'Fintech & Industrie', icon: 'ri-smartphone-line', desc: isEn ? 'GSMA, Africa Fintech Network, APIM-UEMOA, APBEF. Approach: event sponsorships, association memberships, industry reports.' : 'GSMA, Africa Fintech Network, APIM-UEMOA, APBEF. Approche : sponsoring événements, adhésions, rapports sectoriels.' },
              ].map((t, i) => (
                <div key={i} className="bg-background-50 rounded-xl p-4 border border-background-200/50">
                  <h3 className="text-sm font-bold font-heading text-foreground-950 mb-2 flex items-center gap-2">
                    <i className={`${t.icon} text-accent-500`} />{t.titre}
                  </h3>
                  <p className="text-xs text-foreground-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(13,123,95,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Ready to Build Your Domain Authority?' : 'Prêt à Construire Votre Autorité de Domaine ?'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'KHEPRA OS 2 Content & Growth Engines automate backlink acquisition, content distribution, and authority building for financial institutions in UEMOA and CEMAC.' : 'Les moteurs Content & Growth de KHEPRA OS 2 automatisent l\'acquisition de backlinks, la distribution de contenu et la construction d\'autorité pour les institutions financières en UEMOA et CEMAC.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                  <i className="ri-mail-line mr-2" />{isEn ? 'Contact an Expert' : 'Contacter un Expert'}
                </Link>
                <Link to="/barometre-bceao-2026" className="px-6 py-3 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                  <i className="ri-bar-chart-line mr-2" />{isEn ? 'BCEAO Barometer 2026' : 'Baromètre BCEAO 2026'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── CIBLE DETAIL MODAL ── */}
      {showDetail && selectedCible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CATEGORIE_COLORS[selectedCible.categorie] || '#374151'}15` }}>
                  <i className="ri-building-4-line text-sm" style={{ color: CATEGORIE_COLORS[selectedCible.categorie] || '#374151' }} />
                </div>
                <span className="text-sm font-bold text-foreground-950">{selectedCible.nom}</span>
              </div>
              <button onClick={() => setShowDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600">{selectedCible.categorie}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUT_STYLES[selectedCible.statut].bg} ${STATUT_STYLES[selectedCible.statut].text}`}>
                  <i className={`${STATUT_STYLES[selectedCible.statut].icon} mr-0.5`} />{selectedCible.statut}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${PRIORITE_STYLES[selectedCible.priorite]}12`, color: PRIORITE_STYLES[selectedCible.priorite] }}>{selectedCible.priorite}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-background-50 rounded-xl p-3">
                  <div className="text-[10px] text-foreground-400 uppercase">{isEn ? 'Domain Authority' : 'Domain Authority'}</div>
                  <div className="text-lg font-bold text-foreground-950">{selectedCible.da}</div>
                </div>
                <div className="bg-background-50 rounded-xl p-3">
                  <div className="text-[10px] text-foreground-400 uppercase">{isEn ? 'Monthly Traffic' : 'Trafic Mensuel'}</div>
                  <div className="text-lg font-bold text-foreground-950">{(selectedCible.traficMensuel / 1000).toFixed(0)}K</div>
                </div>
              </div>

              <div className="space-y-3 mb-4 text-xs text-foreground-700">
                <div><strong className="text-foreground-500">URL :</strong> <a href={selectedCible.url} target="_blank" rel="nofollow" className="text-accent-600 hover:underline">{selectedCible.url}</a></div>
                <div><strong className="text-foreground-500">{isEn ? 'Page Target:' : 'Page Cible :'}</strong> <Link to={selectedCible.pageCible} className="text-accent-600 hover:underline">{selectedCible.pageCible}</Link></div>
                <div><strong className="text-foreground-500">{isEn ? 'Link Type:' : 'Type de Lien :'}</strong> {selectedCible.typeLien}</div>
                {selectedCible.contactNom && <div><strong className="text-foreground-500">{isEn ? 'Contact:' : 'Contact :'}</strong> {selectedCible.contactNom}</div>}
                {selectedCible.dateContact && <div><strong className="text-foreground-500">{isEn ? 'Contacted:' : 'Contacté le :'}</strong> {new Date(selectedCible.dateContact).toLocaleDateString('fr-FR')}</div>}
                {selectedCible.dateAcquisition && <div><strong className="text-foreground-500">{isEn ? 'Acquired:' : 'Acquis le :'}</strong> {new Date(selectedCible.dateAcquisition).toLocaleDateString('fr-FR')}</div>}
                {selectedCible.notes && <div className="bg-accent-50 border border-accent-200 rounded-xl p-3"><strong className="text-foreground-500">{isEn ? 'Notes:' : 'Notes :'}</strong><br />{selectedCible.notes}</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}