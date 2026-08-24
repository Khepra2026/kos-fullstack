import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useGAFIRegulations } from '@/hooks/useGAFIRegulations';
import { type GAFIRecommendation } from '@/mocks/gafiRecommendations';

type CategorieFilter = 'Toutes' | GAFIRecommendation['categorie'];
type NiveauFilter = 'Tous' | GAFIRecommendation['niveau'];
type StatutFilter = 'Tous' | GAFIRecommendation['statut'];

const STATUT_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  'Conforme': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-check-double-fill' },
  'Largement conforme': { bg: 'bg-green-50', text: 'text-green-700', icon: 'ri-check-fill' },
  'Partiellement conforme': { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-error-warning-fill' },
  'Non conforme': { bg: 'bg-red-50', text: 'text-red-700', icon: 'ri-close-circle-fill' },
};

const CATEGORIE_COLORS: Record<string, string> = {
  'Politiques LBC/FT': '#1A1A2E', 'Blanchiment et confiscation': '#8B3A4A', 'Financement du terrorisme': '#991b1b', 'Mesures préventives': '#C2410C', 'Transparence BE': '#0D7B5F', 'Pouvoirs des autorités': '#4A5568', 'Coopération internationale': '#9B7B2C',
};

export default function GAFIDashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const { regulations: GAFIRecommendations, loading, error, isLive, refetch } = useGAFIRegulations();

  const [categorieFilter, setCategorieFilter] = useState<CategorieFilter>('Toutes');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [statutFilter, setStatutFilter] = useState<StatutFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRec, setSelectedRec] = useState<GAFIRecommendation | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return GAFIRecommendations.filter(r => {
      if (categorieFilter !== 'Toutes' && r.categorie !== categorieFilter) return false;
      if (niveauFilter !== 'Tous' && r.niveau !== niveauFilter) return false;
      if (statutFilter !== 'Tous' && r.statut !== statutFilter) return false;
      if (searchQuery && !r.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !r.reference.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [categorieFilter, niveauFilter, statutFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: GAFIRecommendations.length,
    rouge: GAFIRecommendations.filter(r => r.niveau === 'ROUGE').length,
    conforme: GAFIRecommendations.filter(r => r.statut === 'Conforme' || r.statut === 'Largement conforme').length,
    nonConforme: GAFIRecommendations.filter(r => r.statut === 'Partiellement conforme' || r.statut === 'Non conforme').length,
  }), []);

  const categories: CategorieFilter[] = ['Toutes', 'Politiques LBC/FT', 'Blanchiment et confiscation', 'Financement du terrorisme', 'Mesures préventives', 'Transparence BE', 'Pouvoirs des autorités', 'Coopération internationale'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE'];
  const statuts: StatutFilter[] = ['Tous', 'Conforme', 'Largement conforme', 'Partiellement conforme', 'Non conforme'];

  return (
    <>
      <SeoHead
        title={isEn ? 'GAFI/FATF Recommendations Dashboard | AML/CFT Africa | KHEPRA OS 2' : 'Dashboard 40 Recommandations GAFI | LBC/FT Afrique | KHEPRA OS 2'}
        description={isEn ? 'Interactive dashboard of FATF 40 Recommendations. AML/CFT compliance, mutual evaluations for UEMOA/CEMAC countries, preventive measures, beneficial ownership transparency.' : 'Dashboard interactif des 40 Recommandations du GAFI. Conformité LBC/FT, évaluations mutuelles pays UEMOA/CEMAC, mesures préventives, transparence des bénéficiaires effectifs.'}
        keywords="GAFI, FATF, 40 Recommendations, LBC/FT, AML/CFT Africa, mutual evaluation, GIABA, GABAC, beneficial ownership, PEP, CDD, EDD"
        canonicalPath="/gafi"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'GAFI', path: '/gafi' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? 'International — Module M4' : 'International — Module M4'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'GAFI 40 Recommendations' : '40 Recommandations du GAFI'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Interactive mapping of FATF 40 Recommendations against LBC/FT compliance for UEMOA and CEMAC countries. Mutual evaluations, conformity ratings, and key requirements. Powered by KHEPRA OS 2.' : 'Cartographie interactive des 40 Recommandations du GAFI face à la conformité LBC/FT des pays UEMOA et CEMAC. Évaluations mutuelles, notes de conformité et exigences clés. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: isEn ? 'Recommendations' : 'Recommandations', value: stats.total, color: '#1A1A2E', icon: 'ri-file-list-3-line' },
              { label: isEn ? 'Critical Priority' : 'Priorité Critique', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'Compliant / Largely' : 'Conformes / Largement', value: stats.conforme, color: '#0D7B5F', icon: 'ri-check-double-fill' },
              { label: isEn ? 'Partial / Non-compliant' : 'Partielles / Non conformes', value: stats.nonConforme, color: '#C2410C', icon: 'ri-error-warning-fill' },
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
                <input type="text" placeholder={isEn ? 'Search recommendations...' : 'Rechercher une recommandation...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={niveauFilter} onChange={e => setNiveauFilter(e.target.value as NiveauFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {niveaux.map(n => <option key={n} value={n}>{n === 'Tous' ? (isEn ? 'All Levels' : 'Tous Niveaux') : n}</option>)}
                </select>
                <select value={statutFilter} onChange={e => setStatutFilter(e.target.value as StatutFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {statuts.map(s => <option key={s} value={s}>{s === 'Tous' ? (isEn ? 'All Statuses' : 'Tous Statuts') : s}</option>)}
                </select>
                <select value={categorieFilter} onChange={e => setCategorieFilter(e.target.value as CategorieFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {categories.map(c => <option key={c} value={c}>{c === 'Toutes' ? (isEn ? 'All Categories' : 'Toutes Catégories') : c.length > 20 ? c.substring(0, 20) + '...' : c}</option>)}
                </select>
                {(categorieFilter !== 'Toutes' || niveauFilter !== 'Tous' || statutFilter !== 'Tous' || searchQuery) && (
                  <button onClick={() => { setCategorieFilter('Toutes'); setNiveauFilter('Tous'); setStatutFilter('Tous'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(rec => {
              const s = STATUT_STYLES[rec.statut] || { bg: 'bg-background-100', text: 'text-foreground-600', icon: 'ri-question-mark' };
              return (
                <div key={rec.id} className="bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300/40 cursor-pointer transition-colors" onClick={() => { setSelectedRec(rec); setShowingDetail(true); }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-foreground-400">{rec.reference}</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${rec.niveau === 'ROUGE' ? 'bg-red-50 text-red-700' : rec.niveau === 'ORANGE' ? 'bg-amber-50 text-amber-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        <i className="ri-alert-fill mr-0.5" />{rec.niveau}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                        <i className={`${s.icon} mr-0.5`} />{rec.statut}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950 mb-2">{rec.titre}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-2 mb-3">{rec.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ background: `${CATEGORIE_COLORS[rec.categorie] || '#374151'}15`, color: CATEGORIE_COLORS[rec.categorie] || '#374151' }}>{rec.categorie}</span>
                    {rec.pays_evalues.slice(0, 3).map(p => (
                      <span key={p} className="px-2 py-0.5 rounded-full text-[10px] bg-background-100 text-foreground-600">{p}</span>
                    ))}
                    {rec.pays_evalues.length > 3 && <span className="px-2 py-0.5 rounded-full text-[10px] bg-background-100 text-foreground-400">+{rec.pays_evalues.length - 3}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,58,74,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Achieve full FATF compliance' : 'Atteignez la conformité GAFI complète'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the complete GAFI module of KHEPRA OS 2. Full 40 recommendations mapping, mutual evaluation preparation, gap analysis /32, and AML/CFT expert support.' : 'Activez le module GAFI complet de KHEPRA OS 2. Cartographie des 40 recommandations, préparation aux évaluations mutuelles, gap analysis /32 et accompagnement expert LBC/FT.'}
              </p>
              <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors inline-block">
                <i className="ri-mail-line mr-2" />{isEn ? 'Contact an AML/CFT Expert' : 'Contacter un Expert LBC/FT'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showingDetail && selectedRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground-950">{selectedRec.reference}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUT_STYLES[selectedRec.statut]?.bg || ''} ${STATUT_STYLES[selectedRec.statut]?.text || ''}`}>{selectedRec.statut}</span>
              </div>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedRec.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedRec.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Key Requirements' : 'Exigences Clés'}</h3>
                  <ul className="space-y-1.5">{selectedRec.exigences_cles.map((e, i) => <li key={i} className="text-sm text-foreground-700 flex items-start gap-2"><i className="ri-checkbox-circle-line text-foreground-400 mt-0.5" />{e}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Evaluated Countries' : 'Pays Évalués'}</h3>
                  <div className="flex flex-wrap gap-1.5">{selectedRec.pays_evalues.map(p => <span key={p} className="px-2 py-1 rounded-full text-xs bg-background-100 text-foreground-700">{p}</span>)}</div>
                  <p className="text-xs text-foreground-500 mt-3">{isEn ? 'Conformity rating' : 'Note de conformité'} : <strong>{selectedRec.note_conformite}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



