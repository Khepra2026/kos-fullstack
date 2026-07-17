import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { ComplianceControls, type ComplianceControl } from '@/mocks/complianceControls';

type PilierFilter = 'Tous' | ComplianceControl['pilier'];
type NiveauFilter = 'Tous' | ComplianceControl['niveau'];
type StatutFilter = 'Tous' | ComplianceControl['statut'];
type AutoriteFilter = 'Toutes' | ComplianceControl['autorite'];

const STATUT_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  'Conforme': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-check-double-fill' },
  'En cours': { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-time-line' },
  'Non conforme': { bg: 'bg-red-50', text: 'text-red-700', icon: 'ri-close-circle-fill' },
  'Non applicable': { bg: 'bg-background-100', text: 'text-foreground-500', icon: 'ri-subtract-line' },
};

const PILIER_COLORS: Record<string, string> = {
  Gouvernance: '#4A7A1E', 'Contrôle Interne': '#1A1A2E', 'LBC/FT': '#8B3A4A', Prudentiel: '#C2410C', Reporting: '#0D7B5F', RH: '#9B7B2C',
};

const AUTORITE_COLORS: Record<string, string> = {
  BCEAO: '#0D7B5F', COBAC: '#1A1A2E', GAFI: '#8B3A4A', OHADA: '#4A7A1E', UEMOA: '#C2410C', CEMAC: '#0D7B5F',
};

export default function ComplianceManagementDashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [pilierFilter, setPilierFilter] = useState<PilierFilter>('Tous');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [statutFilter, setStatutFilter] = useState<StatutFilter>('Tous');
  const [autoriteFilter, setAutoriteFilter] = useState<AutoriteFilter>('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCtrl, setSelectedCtrl] = useState<ComplianceControl | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return ComplianceControls.filter(c => {
      if (pilierFilter !== 'Tous' && c.pilier !== pilierFilter) return false;
      if (niveauFilter !== 'Tous' && c.niveau !== niveauFilter) return false;
      if (statutFilter !== 'Tous' && c.statut !== statutFilter) return false;
      if (autoriteFilter !== 'Toutes' && c.autorite !== autoriteFilter) return false;
      if (searchQuery && !c.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !c.reference_reglementaire.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [pilierFilter, niveauFilter, statutFilter, autoriteFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: ComplianceControls.length,
    rouge: ComplianceControls.filter(c => c.niveau === 'ROUGE').length,
    conforme: ComplianceControls.filter(c => c.statut === 'Conforme').length,
    nonConforme: ComplianceControls.filter(c => c.statut === 'Non conforme').length,
    enCours: ComplianceControls.filter(c => c.statut === 'En cours').length,
  }), []);

  const piliers: PilierFilter[] = ['Tous', 'Gouvernance', 'Contrôle Interne', 'LBC/FT', 'Prudentiel', 'Reporting', 'RH'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE'];
  const statuts: StatutFilter[] = ['Tous', 'Conforme', 'En cours', 'Non conforme', 'Non applicable'];
  const autorites: AutoriteFilter[] = ['Toutes', 'BCEAO', 'COBAC', 'GAFI', 'OHADA', 'UEMOA', 'CEMAC'];

  return (
    <>
      <SeoHead
        title={isEn ? 'Compliance Management Dashboard | Regulatory Controls | KHEPRA OS 2' : 'Dashboard Compliance Management | Contrôles Réglementaires | KHEPRA OS 2'}
        description={isEn ? 'Interactive compliance management dashboard. Track controls, action plans, gap analysis, and audit trails across BCEAO, COBAC, GAFI, and OHADA frameworks. KHEPRA OS 2 M8.' : 'Dashboard interactif de gestion de la conformité. Suivez les contrôles, plans d\'actions, écarts et audit trail sur les référentiels BCEAO, COBAC, GAFI et OHADA. KHEPRA OS 2 M8.'}
        keywords="compliance management, contrôle réglementaire, plan d'action conformité, gap analysis, audit trail, BCEAO, COBAC, GAFI, OHADA, compliance dashboard"
        canonicalPath="/compliance-management"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'Compliance Management', path: '/compliance-management' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? 'M8 — Compliance Management' : 'M8 — Compliance Management'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'Compliance Management' : 'Gestion de la Conformité'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Centralized compliance control tracking across all regulatory frameworks. Action plans, gap analysis, audit trails, and real-time compliance status. Powered by KHEPRA OS 2.' : 'Suivi centralisé des contrôles de conformité sur tous les référentiels réglementaires. Plans d\'actions, analyse des écarts, audit trail et statut conformité en temps réel. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: isEn ? 'Total Controls' : 'Total Contrôles', value: stats.total, color: '#1A1A2E', icon: 'ri-checkbox-multiple-line' },
              { label: isEn ? 'Critical' : 'Critiques', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'Compliant' : 'Conformes', value: stats.conforme, color: '#0D7B5F', icon: 'ri-check-double-fill' },
              { label: isEn ? 'In Progress' : 'En Cours', value: stats.enCours, color: '#92400e', icon: 'ri-time-line' },
              { label: isEn ? 'Non-compliant' : 'Non Conformes', value: stats.nonConforme, color: '#991b1b', icon: 'ri-close-circle-fill' },
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
                <input type="text" placeholder={isEn ? 'Search controls...' : 'Rechercher un contrôle...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={statutFilter} onChange={e => setStatutFilter(e.target.value as StatutFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {statuts.map(s => <option key={s} value={s}>{s === 'Tous' ? (isEn ? 'All Statuses' : 'Tous Statuts') : s}</option>)}
                </select>
                <select value={niveauFilter} onChange={e => setNiveauFilter(e.target.value as NiveauFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {niveaux.map(n => <option key={n} value={n}>{n === 'Tous' ? (isEn ? 'All Levels' : 'Tous Niveaux') : n}</option>)}
                </select>
                <select value={pilierFilter} onChange={e => setPilierFilter(e.target.value as PilierFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {piliers.map(p => <option key={p} value={p}>{p === 'Tous' ? (isEn ? 'All Pillars' : 'Tous Piliers') : p}</option>)}
                </select>
                <select value={autoriteFilter} onChange={e => setAutoriteFilter(e.target.value as AutoriteFilter)} className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700">
                  {autorites.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {(pilierFilter !== 'Tous' || niveauFilter !== 'Tous' || statutFilter !== 'Tous' || autoriteFilter !== 'Toutes' || searchQuery) && (
                  <button onClick={() => { setPilierFilter('Tous'); setNiveauFilter('Tous'); setStatutFilter('Tous'); setAutoriteFilter('Toutes'); setSearchQuery(''); }} className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-background-100 bg-background-50">
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Control' : 'Contrôle'}</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Reference' : 'Référence'}</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Pillar' : 'Pilier'}</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Status' : 'Statut'}</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Due Date' : 'Échéance'}</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-foreground-500 uppercase">{isEn ? 'Owner' : 'Responsable'}</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-foreground-500 uppercase w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background-100">
                  {filtered.map(ctrl => {
                    const s = STATUT_STYLES[ctrl.statut] || STATUT_STYLES['Non applicable'];
                    return (
                      <tr key={ctrl.id} className="hover:bg-background-50/50 transition-colors cursor-pointer" onClick={() => { setSelectedCtrl(ctrl); setShowingDetail(true); }}>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ctrl.niveau === 'ROUGE' ? 'bg-red-500' : ctrl.niveau === 'ORANGE' ? 'bg-amber-500' : 'bg-yellow-500'}`} />
                            <span className="text-xs font-semibold text-foreground-900 line-clamp-1">{ctrl.titre}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${AUTORITE_COLORS[ctrl.autorite] || '#374151'}15`, color: AUTORITE_COLORS[ctrl.autorite] || '#374151' }}>{ctrl.reference_reglementaire}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${PILIER_COLORS[ctrl.pilier] || '#374151'}15`, color: PILIER_COLORS[ctrl.pilier] || '#374151' }}>{ctrl.pilier}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                            <i className={`${s.icon} mr-0.5`} />{ctrl.statut}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-foreground-500">{new Date(ctrl.date_echeance).toLocaleDateString('fr-FR')}</td>
                        <td className="px-4 py-3.5 text-xs text-foreground-600">{ctrl.responsable}</td>
                        <td className="px-4 py-3.5 text-center">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedCtrl(ctrl); setShowingDetail(true); }} className="w-7 h-7 flex items-center justify-center rounded-full bg-background-100 hover:bg-accent-100 cursor-pointer">
                            <i className="ri-eye-line text-xs text-foreground-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(13,123,95,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,58,74,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Automate your compliance management' : 'Automatisez votre gestion de la conformité'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the complete Compliance Management module of KHEPRA OS 2. Automated control tracking, real-time dashboards, automated alerts, and audit-ready documentation.' : 'Activez le module Compliance Management complet de KHEPRA OS 2. Suivi automatisé des contrôles, dashboards en temps réel, alertes automatiques et documentation prête pour l\'audit.'}
              </p>
              <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors inline-block">
                <i className="ri-mail-line mr-2" />{isEn ? 'Contact a Compliance Expert' : 'Contacter un Expert Conformité'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {showingDetail && selectedCtrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground-950">{isEn ? 'Control Detail' : 'Détail du Contrôle'}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUT_STYLES[selectedCtrl.statut]?.bg || ''} ${STATUT_STYLES[selectedCtrl.statut]?.text || ''}`}>{selectedCtrl.statut}</span>
              </div>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedCtrl.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedCtrl.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Reference' : 'Référence'}</span><span className="font-semibold text-foreground-900">{selectedCtrl.reference_reglementaire}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Authority' : 'Autorité'}</span><span className="font-semibold text-foreground-900">{selectedCtrl.autorite}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Pillar' : 'Pilier'}</span><span className="font-semibold text-foreground-900">{selectedCtrl.pilier}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Frequency' : 'Fréquence'}</span><span className="font-semibold text-foreground-900">{selectedCtrl.frequence}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Owner' : 'Responsable'}</span><span className="font-semibold text-foreground-900">{selectedCtrl.responsable}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-500">{isEn ? 'Due Date' : 'Échéance'}</span><span className={`font-semibold ${new Date(selectedCtrl.date_echeance) < new Date() && selectedCtrl.statut !== 'Conforme' ? 'text-red-600' : 'text-foreground-900'}`}>{new Date(selectedCtrl.date_echeance).toLocaleDateString('fr-FR')}</span></div>
                </div>
                <div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                    <h4 className="text-xs font-bold text-red-700 uppercase mb-1">{isEn ? 'Gap' : 'Écart'}</h4>
                    <p className="text-xs text-red-700">{selectedCtrl.ecart}</p>
                  </div>
                  <div className="bg-accent-50 border border-accent-200 rounded-xl p-3">
                    <h4 className="text-xs font-bold text-accent-700 uppercase mb-1">{isEn ? 'Action Plan' : 'Plan d\'Action'}</h4>
                    <p className="text-xs text-accent-800 leading-relaxed">{selectedCtrl.plan_action}</p>
                  </div>
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