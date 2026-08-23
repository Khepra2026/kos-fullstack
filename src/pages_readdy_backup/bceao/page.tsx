import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useBCEAORegulations } from '@/hooks/useBCEAORegulations';
import { type BCEAORegulation } from '@/mocks/bceaoRegulations';

type DomaineFilter = 'Tous' | BCEAORegulation['domaine'];
type NiveauFilter = 'Tous' | BCEAORegulation['niveau'];
type TypeFilter = 'Tous' | BCEAORegulation['type'];

const NIVEAU_STYLES: Record<string, { bg: string; text: string }> = {
  ROUGE: { bg: 'bg-red-50', text: 'text-red-700' },
  ORANGE: { bg: 'bg-amber-50', text: 'text-amber-700' },
  JAUNE: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
};

const TYPE_COLORS: Record<string, string> = {
  Circulaire: '#991b1b', Instruction: '#0D7B5F', Décision: '#4A5568', Directive: '#C2410C', Avis: '#9B7B2C',
};

const DOMAINE_COLORS: Record<string, string> = {
  SFD: '#0D7B5F', Bancaire: '#1A1A2E', 'LBC/FT': '#8B3A4A', Gouvernance: '#4A7A1E', Prudentiel: '#C2410C', 'Systèmes Paiement': '#B8543A', 'Inclusion Financière': '#9B7B2C',
};

export default function BCEAODashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const { regulations: BCEAORegulations, loading, error, isLive, refetch } = useBCEAORegulations();

  const [domaineFilter, setDomaineFilter] = useState<DomaineFilter>('Tous');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReg, setSelectedReg] = useState<BCEAORegulation | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return BCEAORegulations.filter(r => {
      if (domaineFilter !== 'Tous' && r.domaine !== domaineFilter) return false;
      if (niveauFilter !== 'Tous' && r.niveau !== niveauFilter) return false;
      if (typeFilter !== 'Tous' && r.type !== typeFilter) return false;
      if (searchQuery && !r.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !r.reference.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [domaineFilter, niveauFilter, typeFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: BCEAORegulations.length,
    rouge: BCEAORegulations.filter(r => r.niveau === 'ROUGE').length,
    sfd: BCEAORegulations.filter(r => r.domaine === 'SFD').length,
    enVigueur: BCEAORegulations.filter(r => r.statut === 'En vigueur').length,
  }), []);

  const domaines: DomaineFilter[] = ['Tous', 'SFD', 'Bancaire', 'LBC/FT', 'Gouvernance', 'Prudentiel', 'Systèmes Paiement', 'Inclusion Financière'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE'];
  const types: TypeFilter[] = ['Tous', 'Circulaire', 'Instruction', 'Décision', 'Directive', 'Avis'];

  return (
    <>
      <SeoHead
        title={isEn ? 'BCEAO Regulatory Dashboard | UEMOA Financial Regulation | KHEPRA OS 2' : 'Dashboard Réglementaire BCEAO | UEMOA | KHEPRA OS 2'}
        description={isEn ? 'Complete BCEAO regulatory dashboard for UEMOA financial institutions. SFD instructions, prudential ratios, AML/CFT directives, governance circulars, digital financial services.' : 'Dashboard réglementaire BCEAO complet pour les institutions financières UEMOA. Instructions SFD, ratios prudentiels, directives LBC/FT, circulaires gouvernance, services financiers numériques.'}
        keywords="BCEAO, UEMOA financial regulation, BCEAO instructions, SFD UEMOA, BCEAO prudential, BCEAO AML, BCEAO governance, BCEAO digital finance, agrément SFD"
        canonicalPath="/bceao"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'BCEAO', path: '/bceao' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? 'UEMOA — Module M3' : 'UEMOA — Module M3'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'BCEAO Regulatory Framework' : 'Cadre Réglementaire BCEAO'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Complete BCEAO regulatory framework: instructions, circulars, decisions, and directives governing banks, SFDs, fintechs, and payment systems in the UEMOA zone. Powered by KHEPRA OS 2.' : 'Cadre réglementaire BCEAO complet : instructions, circulaires, décisions et directives régissant les banques, SFD, fintechs et systèmes de paiement en zone UEMOA. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: isEn ? 'Total Regulations' : 'Total Textes', value: stats.total, color: '#0D7B5F', icon: 'ri-scales-3-line' },
              { label: isEn ? 'Critical' : 'Critiques', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'SFD Specific' : 'Spécifiques SFD', value: stats.sfd, color: '#C2410C', icon: 'ri-bank-line' },
              { label: isEn ? 'In Force' : 'En Vigueur', value: stats.enVigueur, color: '#4A7A1E', icon: 'ri-check-double-fill' },
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
                <input type="text" placeholder={isEn ? 'Search BCEAO texts...' : 'Rechercher un texte BCEAO...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={niveauFilter} onChange={e => setNiveauFilter(e.target.value as NiveauFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {niveaux.map(n => <option key={n} value={n}>{n === 'Tous' ? (isEn ? 'All Levels' : 'Tous Niveaux') : n}</option>)}
                </select>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as TypeFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {types.map(t => <option key={t} value={t}>{t === 'Tous' ? (isEn ? 'All Types' : 'Tous Types') : t}</option>)}
                </select>
                <select value={domaineFilter} onChange={e => setDomaineFilter(e.target.value as DomaineFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {domaines.map(d => <option key={d} value={d}>{d === 'Tous' ? (isEn ? 'All Domains' : 'Tous Domaines') : d}</option>)}
                </select>
                {(domaineFilter !== 'Tous' || niveauFilter !== 'Tous' || typeFilter !== 'Tous' || searchQuery) && (
                  <button onClick={() => { setDomaineFilter('Tous'); setNiveauFilter('Tous'); setTypeFilter('Tous'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center"><i className="ri-inbox-line text-3xl text-foreground-300 mb-3 block" /><p className="text-foreground-500 text-sm">{isEn ? 'No regulations found.' : 'Aucun texte trouvé.'}</p></div>
            ) : (
              <div className="divide-y divide-background-100">
                {filtered.map(reg => (
                  <div key={reg.id} className="hover:bg-background-50/50 transition-colors">
                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 cursor-pointer" onClick={() => { setSelectedReg(reg); setShowingDetail(true); }}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${reg.niveau === 'ROUGE' ? 'bg-red-600' : reg.niveau === 'ORANGE' ? 'bg-amber-500' : 'bg-yellow-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-foreground-950">{reg.reference}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ background: `${TYPE_COLORS[reg.type] || '#374151'}15`, color: TYPE_COLORS[reg.type] || '#374151' }}>{reg.type}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ background: `${DOMAINE_COLORS[reg.domaine] || '#374151'}15`, color: DOMAINE_COLORS[reg.domaine] || '#374151' }}>{reg.domaine}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${NIVEAU_STYLES[reg.niveau]?.bg || 'bg-background-100'} ${NIVEAU_STYLES[reg.niveau]?.text || 'text-foreground-600'}`}>
                            <i className="ri-alert-fill mr-0.5" />{reg.niveau}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground-900 line-clamp-1">{reg.titre}</p>
                        <p className="text-xs text-foreground-500 line-clamp-2 mt-0.5">{reg.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                          <span><i className="ri-calendar-line mr-1" />{new Date(reg.date).toLocaleDateString('fr-FR')}</span>
                          <span className={`font-semibold ${reg.statut === 'En vigueur' ? 'text-emerald-600' : 'text-red-500'}`}>{reg.statut}</span>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedReg(reg); setShowingDetail(true); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 hover:bg-accent-100 cursor-pointer">
                        <i className="ri-eye-line text-sm text-foreground-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(13,123,95,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(234,88,12,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Master the BCEAO regulatory framework' : 'Maîtrisez le cadre réglementaire BCEAO'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the complete BCEAO module of KHEPRA OS 2. Interactive regulations, impact analysis, compliance gap analysis, and dedicated UEMOA expert access.' : 'Activez le module BCEAO complet de KHEPRA OS 2. Textes interactifs, analyses d\'impact, gap analysis conformité et accès expert UEMOA dédié.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                  <i className="ri-mail-line mr-2" />{isEn ? 'Contact an Expert' : 'Contacter un Expert'}
                </Link>
                <Link to="/diagnostic-flash" className="px-6 py-3 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                  <i className="ri-lightbulb-flash-line mr-2" />{isEn ? 'Free Compliance Diagnostic' : 'Diagnostic Conformité Gratuit'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showingDetail && selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <span className="text-sm font-bold text-foreground-950">{selectedReg.reference}</span>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${TYPE_COLORS[selectedReg.type] || '#374151'}15`, color: TYPE_COLORS[selectedReg.type] || '#374151' }}>{selectedReg.type}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${DOMAINE_COLORS[selectedReg.domaine] || '#374151'}15`, color: DOMAINE_COLORS[selectedReg.domaine] || '#374151' }}>{selectedReg.domaine}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${NIVEAU_STYLES[selectedReg.niveau]?.bg || 'bg-background-100'} ${NIVEAU_STYLES[selectedReg.niveau]?.text || 'text-foreground-600'}`}>{selectedReg.niveau}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedReg.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedReg.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Key Articles' : 'Articles Clés'}</h3>
                  <ul className="space-y-1.5">{selectedReg.articles_cles.map((a, i) => <li key={i} className="text-sm text-foreground-700 flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5" />{a}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Business Impact' : 'Impact Business'}</h3>
                  <p className="text-sm text-foreground-700 leading-relaxed mb-3">{selectedReg.impact}</p>
                </div>
              </div>
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                <h3 className="text-xs font-bold text-accent-700 uppercase tracking-wide mb-2">{isEn ? 'Recommended Action' : 'Action Recommandée'}</h3>
                <p className="text-sm text-accent-800 leading-relaxed">{selectedReg.action_recommandee}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



