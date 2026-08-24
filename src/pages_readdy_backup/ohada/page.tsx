import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useOHADARegulations } from '@/hooks/useOHADARegulations';
import { type OHADAAct } from '@/mocks/ohadaActs';

type DomaineFilter = 'Tous' | OHADAAct['domaine'];
type NiveauFilter = 'Tous' | OHADAAct['niveau'];
type TypeFilter = 'Tous' | OHADAAct['type'];

const DOMAINE_COLORS: Record<string, string> = {
  'Droit des Sociétés': '#4A7A1E', Sûretés: '#C2410C', 'Procédures Collectives': '#8B3A4A', 'Droit Comptable': '#0D7B5F', Arbitrage: '#9B7B2C', Médiation: '#B8543A', 'Droit du Travail': '#6B4A3A', 'Transactions Électroniques': '#1A1A2E',
};

export default function OHADADashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const { regulations: OHADAActs, loading, error, isLive, refetch } = useOHADARegulations();

  const [domaineFilter, setDomaineFilter] = useState<DomaineFilter>('Tous');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAct, setSelectedAct] = useState<OHADAAct | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return OHADAActs.filter(a => {
      if (domaineFilter !== 'Tous' && a.domaine !== domaineFilter) return false;
      if (niveauFilter !== 'Tous' && a.niveau !== niveauFilter) return false;
      if (typeFilter !== 'Tous' && a.type !== typeFilter) return false;
      if (searchQuery && !a.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !a.reference.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [domaineFilter, niveauFilter, typeFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: OHADAActs.length,
    rouge: OHADAActs.filter(a => a.niveau === 'ROUGE').length,
    enVigueur: OHADAActs.filter(a => a.statut === 'En vigueur').length,
    enConsultation: OHADAActs.filter(a => a.statut === 'En consultation').length,
  }), []);

  const domaines: DomaineFilter[] = ['Tous', 'Droit des Sociétés', 'Sûretés', 'Procédures Collectives', 'Droit Comptable', 'Arbitrage', 'Médiation', 'Transactions Électroniques', 'Droit du Travail'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE'];
  const types: TypeFilter[] = ['Tous', 'Acte Uniforme', 'Règlement', 'Décision'];

  return (
    <>
      <SeoHead
        title={isEn ? 'OHADA Uniform Acts Dashboard | African Business Law | KHEPRA OS 2' : 'Dashboard Actes Uniformes OHADA | Droit des Affaires Africain | KHEPRA OS 2'}
        description={isEn ? 'Interactive dashboard of OHADA Uniform Acts. Company law (AUSCGIE), securities, collective proceedings, accounting (SYSCOHADA), arbitration, mediation, electronic transactions.' : 'Dashboard interactif des Actes Uniformes OHADA. Droit des sociétés (AUSCGIE), sûretés, procédures collectives, comptabilité (SYSCOHADA), arbitrage, médiation, transactions électroniques.'}
        keywords="OHADA, Actes Uniformes, AUSCGIE, SYSCOHADA, droit des sociétés, sûretés, procédures collectives, OHADA business law, Africa corporate law, CCJA"
        canonicalPath="/ohada"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'OHADA', path: '/ohada' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? '17 States — Module M5' : '17 États — Module M5'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'OHADA Uniform Acts' : 'Actes Uniformes OHADA'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Interactive mapping of OHADA Uniform Acts harmonizing business law across 17 African states. Company law, securities, accounting, arbitration, and more. Powered by KHEPRA OS 2.' : 'Cartographie interactive des Actes Uniformes OHADA harmonisant le droit des affaires dans 17 États africains. Droit des sociétés, sûretés, comptabilité, arbitrage et plus. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: isEn ? 'Uniform Acts' : 'Actes Uniformes', value: stats.total, color: '#4A7A1E', icon: 'ri-file-text-line' },
              { label: isEn ? 'Critical' : 'Critiques', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'In Force' : 'En Vigueur', value: stats.enVigueur, color: '#0D7B5F', icon: 'ri-check-double-fill' },
              { label: isEn ? 'Under Consultation' : 'En Consultation', value: stats.enConsultation, color: '#9B7B2C', icon: 'ri-chat-3-line' },
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
                <input type="text" placeholder={isEn ? 'Search OHADA acts...' : 'Rechercher un Acte Uniforme...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={niveauFilter} onChange={e => setNiveauFilter(e.target.value as NiveauFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {niveaux.map(n => <option key={n} value={n}>{n === 'Tous' ? (isEn ? 'All Levels' : 'Tous Niveaux') : n}</option>)}
                </select>
                <select value={domaineFilter} onChange={e => setDomaineFilter(e.target.value as DomaineFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {domaines.map(d => <option key={d} value={d}>{d === 'Tous' ? (isEn ? 'All Domains' : 'Tous Domaines') : d}</option>)}
                </select>
                {(domaineFilter !== 'Tous' || niveauFilter !== 'Tous' || searchQuery) && (
                  <button onClick={() => { setDomaineFilter('Tous'); setNiveauFilter('Tous'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(act => (
              <div key={act.id} className="bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300/40 cursor-pointer transition-colors" onClick={() => { setSelectedAct(act); setShowingDetail(true); }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${DOMAINE_COLORS[act.domaine] || '#374151'}15`, color: DOMAINE_COLORS[act.domaine] || '#374151' }}>{act.domaine}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${act.niveau === 'ROUGE' ? 'bg-red-50 text-red-700' : act.niveau === 'ORANGE' ? 'bg-amber-50 text-amber-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    <i className="ri-alert-fill mr-0.5" />{act.niveau}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground-950 mb-2">{act.titre}</h3>
                <p className="text-xs text-foreground-500 line-clamp-2 mb-3">{act.description}</p>
                <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                  <span><i className="ri-calendar-line mr-1" />{new Date(act.date).toLocaleDateString('fr-FR')}</span>
                  <span className={`font-semibold ${act.statut === 'En vigueur' ? 'text-emerald-600' : 'text-amber-500'}`}>{act.statut}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(74,122,30,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(194,65,12,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Master OHADA business law' : 'Maîtrisez le droit des affaires OHADA'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the complete OHADA module of KHEPRA OS 2. Interactive Uniform Acts, impact analysis for your business, and dedicated OHADA legal expert support.' : 'Activez le module OHADA complet de KHEPRA OS 2. Actes Uniformes interactifs, analyse d\'impact pour votre entreprise et accompagnement expert juridique OHADA dédié.'}
              </p>
              <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors inline-block">
                <i className="ri-mail-line mr-2" />{isEn ? 'Contact an OHADA Expert' : 'Contacter un Expert OHADA'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showingDetail && selectedAct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <span className="text-sm font-bold text-foreground-950">{selectedAct.reference}</span>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${DOMAINE_COLORS[selectedAct.domaine] || '#374151'}15`, color: DOMAINE_COLORS[selectedAct.domaine] || '#374151' }}>{selectedAct.domaine}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedAct.niveau === 'ROUGE' ? 'bg-red-50 text-red-700' : selectedAct.niveau === 'ORANGE' ? 'bg-amber-50 text-amber-700' : 'bg-yellow-50 text-yellow-700'}`}>{selectedAct.niveau}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedAct.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedAct.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Key Articles' : 'Articles Clés'}</h3>
                  <ul className="space-y-1.5">{selectedAct.articles_cles.map((a, i) => <li key={i} className="text-sm text-foreground-700 flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5" />{a}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Business Impact' : 'Impact Business'}</h3>
                  <p className="text-sm text-foreground-700 leading-relaxed mb-3">{selectedAct.impact}</p>
                </div>
              </div>
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                <h3 className="text-xs font-bold text-accent-700 uppercase tracking-wide mb-2">{isEn ? 'Recommended Action' : 'Action Recommandée'}</h3>
                <p className="text-sm text-accent-800 leading-relaxed">{selectedAct.action_recommandee}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



