import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useRegulatoryAlerts } from '@/hooks/useRegulatoryAlerts';
import { type RegulatoryAlert } from '@/mocks/regulatoryAlerts';

type ZoneFilter = 'Toutes' | RegulatoryAlert['zone'];
type AutoriteFilter = 'Toutes' | RegulatoryAlert['autorite'];
type NiveauFilter = 'Tous' | RegulatoryAlert['niveau'];

const NIVEAU_STYLES: Record<RegulatoryAlert['niveau'], { bg: string; text: string; border: string; icon: string; label: string }> = {
  ROUGE: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: 'ri-alert-fill', label: 'Critique' },
  ORANGE: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: 'ri-error-warning-fill', label: 'Élevé' },
  JAUNE: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: 'ri-information-fill', label: 'Modéré' },
  VERT: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: 'ri-check-double-fill', label: 'Information' },
};

const AUTORITE_COLORS: Record<string, string> = {
  BCEAO: '#0D7B5F', COBAC: '#1A1A2E', GAFI: '#8B3A4A', OHADA: '#4A7A1E', UEMOA: '#C2410C',
  CEMAC: '#0D7B5F', OCDE: '#4A5568', GIABA: '#9B7B2C', GABAC: '#6B4A3A', BEAC: '#1A1A2E', CIMA: '#B8543A',
};

export default function RegulatoryIntelligenceDashboardPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const { alerts: regulatoryAlerts, loading, error, isLive, refetch } = useRegulatoryAlerts();

  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>('Toutes');
  const [autoriteFilter, setAutoriteFilter] = useState<AutoriteFilter>('Toutes');
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<RegulatoryAlert | null>(null);
  const [showingDetail, setShowingDetail] = useState(false);

  const filtered = useMemo(() => {
    return regulatoryAlerts.filter(a => {
      if (zoneFilter !== 'Toutes' && a.zone !== zoneFilter) return false;
      if (autoriteFilter !== 'Toutes' && a.autorite !== autoriteFilter) return false;
      if (niveauFilter !== 'Tous' && a.niveau !== niveauFilter) return false;
      if (searchQuery && !a.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !a.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [zoneFilter, autoriteFilter, niveauFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: regulatoryAlerts.length,
    rouge: regulatoryAlerts.filter(a => a.niveau === 'ROUGE').length,
    orange: regulatoryAlerts.filter(a => a.niveau === 'ORANGE').length,
    jaune: regulatoryAlerts.filter(a => a.niveau === 'JAUNE').length,
  }), []);

  const autorites = useMemo(() => [...new Set(regulatoryAlerts.map(a => a.autorite))].sort(), []);
  const zones: ZoneFilter[] = ['Toutes', 'UEMOA', 'CEMAC', 'International', 'OHADA'];
  const niveaux: NiveauFilter[] = ['Tous', 'ROUGE', 'ORANGE', 'JAUNE', 'VERT'];

  const openDetail = (alert: RegulatoryAlert) => {
    setSelectedAlert(alert);
    setShowingDetail(true);
  };

  const getBgColor = (niveau: RegulatoryAlert['niveau']) => {
    const map: Record<string, string> = { ROUGE: '#991b1b', ORANGE: '#92400e', JAUNE: '#854d0e', VERT: '#065f46' };
    return map[niveau] || '#374151';
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Regulatory Intelligence Dashboard | KHEPRA OS 2 | KHEPRA EXPERTS' : 'Dashboard Regulatory Intelligence | KHEPRA OS 2 | KHEPRA EXPERTS'}
        description={isEn ? 'Real-time regulatory monitoring dashboard. Track BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC regulatory changes. Instant alerts, impact analysis, compliance recommendations.' : 'Dashboard de veille réglementaire en temps réel. Suivez les changements BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC. Alertes instantanées, analyse d\'impact, recommandations de conformité.'}
        keywords="regulatory intelligence dashboard, BCEAO alerts, COBAC monitoring, GAFI compliance, OHADA regulatory, UEMOA CEMAC financial regulation, RegTech Africa, compliance dashboard"
        canonicalPath="/regulatory-intelligence"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'Regulatory Intelligence', path: '/regulatory-intelligence' }]} />

        {/* ── HEADER ── */}
        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{isEn ? 'Live Monitoring' : 'Surveillance en Direct'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">{isEn ? 'Regulatory Intelligence' : 'Regulatory Intelligence'}</h1>
                <p className="text-sm text-foreground-400 mt-1 max-w-xl">
                  {isEn ? 'Real-time tracking of regulatory changes across 11 authorities in UEMOA, CEMAC and international jurisdictions. Powered by KHEPRA OS 2.' : 'Suivi en temps réel des changements réglementaires sur 11 autorités en zones UEMOA, CEMAC et international. Propulsé par KHEPRA OS 2.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {isLive && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                  </span>
                )}
                {loading && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                    <i className="ri-loader-4-line animate-spin" />
                    {isEn ? 'Loading...' : 'Chargement...'}
                  </span>
                )}
                {error && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">{error}</span>
                )}
                <span className="text-xs text-foreground-400">{isEn ? 'Source' : 'Source'} : {isLive ? 'Supabase LIVE' : 'Mock Fallback'}</span>
                <button onClick={refetch} className="px-4 py-2 rounded-full bg-foreground-800 text-xs font-bold cursor-pointer hover:bg-foreground-700 transition-colors whitespace-nowrap">
                  <i className="ri-refresh-line mr-1" />{isEn ? 'Refresh' : 'Actualiser'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: isEn ? 'Active Alerts' : 'Alertes Actives', value: stats.total, color: '#374151', icon: 'ri-notification-3-line' },
              { label: isEn ? 'Critical' : 'Critiques', value: stats.rouge, color: '#991b1b', icon: 'ri-alert-fill' },
              { label: isEn ? 'High Priority' : 'Priorité Élevée', value: stats.orange, color: '#92400e', icon: 'ri-error-warning-fill' },
              { label: isEn ? 'Moderate' : 'Modérées', value: stats.jaune, color: '#854d0e', icon: 'ri-information-fill' },
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

        {/* ── FILTERS + SEARCH ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="bg-white rounded-2xl border border-background-200/70 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input
                  type="text"
                  placeholder={isEn ? 'Search alerts...' : 'Rechercher une alerte...'}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex rounded-full bg-background-100 p-1">
                  {niveaux.map(n => (
                    <button
                      key={n}
                      onClick={() => setNiveauFilter(n)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${niveauFilter === n ? 'bg-white shadow-sm text-foreground-950' : 'text-foreground-500 hover:text-foreground-700'}`}
                    >
                      {n === 'Tous' ? (isEn ? 'All' : 'Tous') : n === 'ROUGE' ? '🔴' : n === 'ORANGE' ? '🟠' : n === 'JAUNE' ? '🟡' : '🟢'}
                    </button>
                  ))}
                </div>

                <select
                  value={zoneFilter}
                  onChange={e => setZoneFilter(e.target.value as ZoneFilter)}
                  className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700"
                >
                  {zones.map(z => (
                    <option key={z} value={z}>{z === 'Toutes' ? (isEn ? 'All Zones' : 'Toutes Zones') : z}</option>
                  ))}
                </select>

                <select
                  value={autoriteFilter}
                  onChange={e => setAutoriteFilter(e.target.value as AutoriteFilter)}
                  className="rounded-full border border-background-200 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer bg-background-50 text-foreground-700"
                >
                  <option value="Toutes">{isEn ? 'All Authorities' : 'Toutes Autorités'}</option>
                  {autorites.map(a => <option key={a} value={a}>{a}</option>)}
                </select>

                {(zoneFilter !== 'Toutes' || autoriteFilter !== 'Toutes' || niveauFilter !== 'Tous' || searchQuery) && (
                  <button
                    onClick={() => { setZoneFilter('Toutes'); setAutoriteFilter('Toutes'); setNiveauFilter('Tous'); setSearchQuery(''); }}
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-close-line mr-1" />{isEn ? 'Clear' : 'Effacer'}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3 text-xs text-foreground-400">
              {filtered.length} {isEn ? 'alert(s) found' : 'alerte(s) trouvée(s)'}
            </div>
          </div>
        </section>

        {/* ── ALERTS TABLE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <i className="ri-inbox-line text-3xl text-foreground-300 mb-3 block" />
                <p className="text-foreground-500 text-sm">{isEn ? 'No alerts match your filters.' : 'Aucune alerte ne correspond à vos filtres.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-background-100">
                {filtered.map(alert => {
                  const s = NIVEAU_STYLES[alert.niveau];
                  const expanded = expandedId === alert.id;
                  return (
                    <div key={alert.id} className="hover:bg-background-50/50 transition-colors">
                      <div
                        className="flex items-start gap-3 md:gap-4 p-4 md:p-5 cursor-pointer"
                        onClick={() => setExpandedId(expanded ? null : alert.id)}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} style={{ background: getBgColor(alert.niveau) }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-foreground-950">{alert.titre}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ background: `${AUTORITE_COLORS[alert.autorite] || '#374151'}15`, color: AUTORITE_COLORS[alert.autorite] || '#374151' }}>{alert.autorite}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap bg-background-100 text-foreground-600">{alert.zone}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${s.bg} ${s.text}`}>
                              <i className={`${s.icon} mr-0.5`} />{alert.niveau}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-2 mt-0.5">{alert.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                            <span><i className="ri-calendar-line mr-1" />{new Date(alert.date).toLocaleDateString('fr-FR')}</span>
                            <span><i className="ri-price-tag-3-line mr-1" />{alert.domaine}</span>
                            <span className={`font-semibold ${alert.statut === 'En vigueur' ? 'text-emerald-600' : alert.statut === 'Abrogé' ? 'text-red-500' : 'text-amber-500'}`}>{alert.statut}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); openDetail(alert); }}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 hover:bg-accent-100 transition-colors cursor-pointer"
                            title={isEn ? 'View details' : 'Voir détails'}
                          >
                            <i className="ri-eye-line text-sm text-foreground-600" />
                          </button>
                          <i className={`text-sm text-foreground-400 transition-transform ${expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                        </div>
                      </div>

                      {expanded && (
                        <div className="px-4 md:px-5 pb-5 pl-12 md:pl-14">
                          <div className="bg-background-50 rounded-xl p-4 border border-background-200/50">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-xs font-bold text-foreground-700 mb-2 uppercase tracking-wide">{isEn ? 'Key Articles' : 'Articles Clés'}</h4>
                                <ul className="space-y-1">
                                  {alert.articles_cles.map((a, i) => (
                                    <li key={i} className="text-xs text-foreground-600 flex items-start gap-2">
                                      <i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />{a}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground-700 mb-2 uppercase tracking-wide">{isEn ? 'Impact' : 'Impact'}</h4>
                                <p className="text-xs text-foreground-600 leading-relaxed">{alert.impact}</p>
                                <h4 className="text-xs font-bold text-accent-700 mt-3 mb-1 uppercase tracking-wide">{isEn ? 'Recommended Action' : 'Action Recommandée'}</h4>
                                <p className="text-xs text-foreground-600 leading-relaxed">{alert.action_recommandee}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── COUVERTURE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="bg-white rounded-2xl border border-background-200/70 p-6">
            <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Monitoring Coverage' : 'Couverture de Surveillance'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {autorites.map(a => (
                <div key={a} className="flex items-center gap-2 p-3 rounded-xl bg-background-50 border border-background-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${AUTORITE_COLORS[a] || '#374151'}18` }}>
                    <span className="text-xs font-bold" style={{ color: AUTORITE_COLORS[a] || '#374151' }}>{a.substring(0, 2)}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground-900">{a}</div>
                    <div className="text-[10px] text-foreground-400">{regulatoryAlerts.filter(r => r.autorite === a).length} alertes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Never miss a regulatory change again' : 'Ne manquez plus jamais un changement réglementaire'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Activate the full Regulatory Intelligence module of KHEPRA OS 2. Real-time alerts, personalized taxonomy, quarterly impact notes, and dedicated expert access.' : 'Activez le module Regulatory Intelligence complet de KHEPRA OS 2. Alertes en temps réel, taxonomie personnalisée, notes d\'impact trimestrielles et accès expert dédié.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                  <i className="ri-mail-line mr-2" />{isEn ? 'Contact an Expert' : 'Contacter un Expert'}
                </Link>
                <Link to="/tools/evaluation-conformite-reglementaire" className="px-6 py-3 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                  <i className="ri-lightbulb-flash-line mr-2" />{isEn ? 'Free Compliance Diagnostic' : 'Diagnostic Conformité Gratuit'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── DETAIL MODAL ── */}
      {showingDetail && selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowingDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: getBgColor(selectedAlert.niveau) }} />
                <span className="text-sm font-bold text-foreground-950">{selectedAlert.autorite}</span>
              </div>
              <button onClick={() => setShowingDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${AUTORITE_COLORS[selectedAlert.autorite] || '#374151'}15`, color: AUTORITE_COLORS[selectedAlert.autorite] || '#374151' }}>{selectedAlert.autorite}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600">{selectedAlert.zone}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${NIVEAU_STYLES[selectedAlert.niveau].bg} ${NIVEAU_STYLES[selectedAlert.niveau].text}`}>{selectedAlert.niveau}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedAlert.titre}</h2>
              <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedAlert.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Key Articles' : 'Articles Clés'}</h3>
                  <ul className="space-y-1.5">
                    {selectedAlert.articles_cles.map((a, i) => (
                      <li key={i} className="text-sm text-foreground-700 flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5" />{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'Business Impact' : 'Impact Business'}</h3>
                  <p className="text-sm text-foreground-700 leading-relaxed mb-3">{selectedAlert.impact}</p>
                </div>
              </div>

              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-4">
                <h3 className="text-xs font-bold text-accent-700 uppercase tracking-wide mb-2">{isEn ? 'Recommended Action' : 'Action Recommandée'}</h3>
                <p className="text-sm text-accent-800 leading-relaxed">{selectedAlert.action_recommandee}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-foreground-400">
                <span><i className="ri-calendar-line mr-1" />{new Date(selectedAlert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>·</span>
                <span>{selectedAlert.domaine}</span>
                <span>·</span>
                <span className={`font-semibold ${selectedAlert.statut === 'En vigueur' ? 'text-emerald-600' : 'text-red-500'}`}>{selectedAlert.statut}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}