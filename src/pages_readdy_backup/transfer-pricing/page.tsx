import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { TransferPricingCases, type TransferPricingCase } from '@/mocks/transferPricingCases';

type TypeFilter = 'Tous' | TransferPricingCase['type'];
type ZoneFilter = 'Toutes' | TransferPricingCase['zone'];
type NiveauFilter = 'Tous' | TransferPricingCase['niveau'];
type StatutFilter = 'Tous' | TransferPricingCase['statut'];
type SecteurFilter = 'Tous' | TransferPricingCase['secteur'];

const STATUT_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  'Conforme': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-check-double-fill' },
  'En cours': { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-time-line' },
  'À faire': { bg: 'bg-red-50', text: 'text-red-700', icon: 'ri-alert-fill' },
};

const TYPE_COLORS: Record<string, string> = {
  'Master File': '#1A1A2E', 'Local File': '#C2410C', Benchmarking: '#0D7B5F', 'Analyse FAR': '#4A7A1E', APA: '#9B7B2C', CbCR: '#8B3A4A', Documentation: '#B8543A',
};

const ZONE_COLORS: Record<string, string> = { UEMOA: '#0D7B5F', CEMAC: '#1A1A2E', International: '#4A5568' };
const SECTEUR_COLORS: Record<string, string> = { Banque: '#1A1A2E', Microfinance: '#0D7B5F', Télécoms: '#C2410C', Mines: '#8B3A4A', 'Agro-industrie': '#4A7A1E', Services: '#9B7B2C', Industrie: '#B8543A' };

export default function TransferPricingDashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [typeFilter, setTypeFilter] = useState<TypeFilter>('Tous');
  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>('Toutes');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [statutFilter, setStatutFilter] = useState<StatutFilter>('Tous');
  const [secteurFilter, setSecteurFilter] = useState<SecteurFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTP, setSelectedTP] = useState<TransferPricingCase | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return TransferPricingCases.filter(tp => {
      if (typeFilter !== 'Tous' && tp.type !== typeFilter) return false;
      if (zoneFilter !== 'Toutes' && tp.zone !== zoneFilter) return false;
      if (niveauFilter !== 'Tous' && tp.niveau !== niveauFilter) return false;
      if (statutFilter !== 'Tous' && tp.statut !== statutFilter) return false;
      if (secteurFilter !== 'Tous' && tp.secteur !== secteurFilter) return false;
      if (searchQuery && !tp.titre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [typeFilter, zoneFilter, niveauFilter, statutFilter, secteurFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: TransferPricingCases.length,
    rouge: TransferPricingCases.filter(tp => tp.niveau === 'ROUGE').length,
    aFaire: TransferPricingCases.filter(tp => tp.statut === 'À faire').length,
    enCours: TransferPricingCases.filter(tp => tp.statut === 'En cours').length,
  }), []);

  const types: TypeFilter[] = ['Tous', 'Master File', 'Local File', 'Benchmarking', 'Analyse FAR', 'APA', 'CbCR', 'Documentation'];
  const zones: ZoneFilter[] = ['Toutes', 'UEMOA', 'CEMAC', 'International'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE'];
  const statuts: StatutFilter[] = ['Tous', 'À faire', 'En cours', 'Conforme'];
  const secteurs: SecteurFilter[] = ['Tous', 'Banque', 'Microfinance', 'Télécoms', 'Mines', 'Agro-industrie', 'Services', 'Industrie'];

  return (
    <>
      <SeoHead
        title={isEn ? 'Transfer Pricing Dashboard | BEPS Documentation | KHEPRA OS 2' : 'Dashboard Prix de Transfert | Documentation BEPS | KHEPRA OS 2'}
        description={isEn ? 'Interactive transfer pricing dashboard. Master File, Local File, benchmarking, FAR analysis, CbCR, APA. BEPS Action 13 compliance for UEMOA and CEMAC multinational groups.' : 'Dashboard interactif prix de transfert. Master File, Local File, benchmarking, analyse FAR, CbCR, APA. Conformité BEPS Action 13 pour les groupes multinationaux UEMOA et CEMAC.'}
        keywords="transfer pricing, prix de transfert, BEPS Action 13, Master File, Local File, benchmarking, FAR analysis, CbCR, APA, OECD transfer pricing, UEMOA, CEMAC"
        canonicalPath="/transfer-pricing"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'Transfer Pricing', path: '/transfer-pricing' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? 'BEPS — Module M9' : 'BEPS — Module M9'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'Transfer Pricing' : 'Prix de Transfert'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Complete transfer pricing documentation management: Master File, Local File, benchmarking, FAR analysis, CbCR, and APA. BEPS Action 13 compliant for UEMOA and CEMAC groups. Powered by KHEPRA OS 2.' : 'Gestion complète de la documentation prix de transfert : Master File, Local File, benchmarking, analyse FAR, CbCR et APA. Conforme BEPS Action 13 pour les groupes UEMOA et CEMAC. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: isEn ? 'Total Cases' : 'Total Dossiers', value: stats.total, color: '#1A1A2E', icon: 'ri-folder-3-line' },
              { label: isEn ? 'Critical' : 'Critiques', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'To Do' : 'À Faire', value: stats.aFaire, color: '#C2410C', icon: 'ri-todo-line' },
              { label: isEn ? 'In Progress' : 'En Cours', value: stats.enCours, color: '#0D7B5F', icon: 'ri-time-line' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-background-200/70 flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${s.color}12` }}>
                  <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-foreground-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="bg-white rounded-2xl border border-background-200/70 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input type="text" placeholder={isEn ? 'Search TP cases...' : 'Rechercher un dossier TP...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={statutFilter} onChange={e => setStatutFilter(e.target.value as StatutFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {statuts.map(s => <option key={s} value={s}>{s === 'Tous' ? (isEn ? 'All Statuses' : 'Tous Statuts') : s}</option>)}
                </select>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as TypeFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {types.map(t => <option key={t} value={t}>{t === 'Tous' ? (isEn ? 'All Types' : 'Tous Types') : t}</option>)}
                </select>
                <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value as ZoneFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {zones.map(z => <option key={z} value={z}>{z === 'Toutes' ? (isEn ? 'All Zones' : 'Toutes Zones') : z}</option>)}
                </select>
                <select value={secteurFilter} onChange={e => setSecteurFilter(e.target.value as SecteurFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {secteurs.map(s => <option key={s} value={s}>{s === 'Tous' ? (isEn ? 'All Sectors' : 'Tous Secteurs') : s}</option>)}
                </select>
                {(typeFilter !== 'Tous' || zoneFilter !== 'Toutes' || statutFilter !== 'Tous' || secteurFilter !== 'Tous' || searchQuery) && (
                  <button onClick={() => { setTypeFilter('Tous'); setZoneFilter('Toutes'); setStatutFilter('Tous'); setSecteurFilter('Tous'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(tp => {
              const s = STATUT_STYLES[tp.statut] || STATUT_STYLES['À faire'];
              return (
                <div key={tp.id} className="bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300/40 cursor-pointer transition-colors" onClick={() => { setSelectedTP(tp); setShowingDetail(true); }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${TYPE_COLORS[tp.type] || '#374151'}15`, color: TYPE_COLORS[tp.type] || '#374151' }}>{tp.type}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${ZONE_COLORS[tp.zone] || '#374151'}15`, color: ZONE_COLORS[tp.zone] || '#374151' }}>{tp.zone}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${SECTEUR_COLORS[tp.secteur] || '#374151'}15`, color: SECTEUR_COLORS[tp.secteur] || '#374151' }}>{tp.secteur}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                      <i className={`${s.icon} mr-0.5`} />{tp.statut}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950 mb-2">{tp.titre}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-2">{tp.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] text-foreground-400">
                    <span className={`font-semibold ${tp.niveau === 'ROUGE' ? 'text-red-600' : tp.niveau === 'ORANGE' ? 'text-amber-600' : 'text-yellow-600'}`}>{tp.niveau}</span>
                    <span>·</span>
                    <span>{new Date(tp.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(234,88,12,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(13,123,95,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Secure your transfer pricing documentation' : 'Sécurisez votre documentation prix de transfert'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the complete Transfer Pricing module of KHEPRA OS 2. Automated documentation, benchmarking studies, FAR analysis, and dedicated OECD TP expert support.' : 'Activez le module Prix de Transfert complet de KHEPRA OS 2. Documentation automatisée, études de benchmarking, analyse FAR et accompagnement expert OCDE dédié.'}
              </p>
              <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors inline-block">
                <i className="ri-mail-line mr-2" />{isEn ? 'Contact a TP Expert' : 'Contacter un Expert TP'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showingDetail && selectedTP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground-950">{selectedTP.type}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUT_STYLES[selectedTP.statut]?.bg || ''} ${STATUT_STYLES[selectedTP.statut]?.text || ''}`}>{selectedTP.statut}</span>
              </div>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${SECTEUR_COLORS[selectedTP.secteur] || '#374151'}15`, color: SECTEUR_COLORS[selectedTP.secteur] || '#374151' }}>{selectedTP.secteur}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${ZONE_COLORS[selectedTP.zone] || '#374151'}15`, color: ZONE_COLORS[selectedTP.zone] || '#374151' }}>{selectedTP.zone}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedTP.niveau === 'ROUGE' ? 'bg-red-50 text-red-700' : selectedTP.niveau === 'ORANGE' ? 'bg-amber-50 text-amber-700' : 'bg-yellow-50 text-yellow-700'}`}>{selectedTP.niveau}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedTP.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedTP.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Key Requirements' : 'Exigences Clés'}</h3>
                  <ul className="space-y-1.5">{selectedTP.exigences_cles.map((e, i) => <li key={i} className="text-sm text-foreground-700 flex items-start gap-2"><i className="ri-checkbox-circle-line text-foreground-400 mt-0.5" />{e}</li>)}</ul>
                </div>
                <div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                    <h4 className="text-xs font-bold text-red-700 uppercase mb-1">{isEn ? 'Risks' : 'Risques'}</h4>
                    <p className="text-xs text-red-700">{selectedTP.risques}</p>
                  </div>
                </div>
              </div>
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                <h3 className="text-xs font-bold text-accent-700 uppercase tracking-wide mb-2">{isEn ? 'Recommended Action' : 'Action Recommandée'}</h3>
                <p className="text-sm text-accent-800 leading-relaxed">{selectedTP.action_recommandee}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



