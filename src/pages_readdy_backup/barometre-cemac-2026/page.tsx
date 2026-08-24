import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useToast } from '@/components/base/Toast';
import { paysCEMAC, tendancesSectoriellesCEMAC, textesPharesCOBAC, statsGlobalesCEMAC, type CEMACCountryIndicator } from '@/mocks/cemacBarometer2026';

const COUNTRY_COLORS: Record<string, string> = {
  CM: '#0D7B5F', GA: '#C2410C', CG: '#DC2626', TD: '#F59E0B',
  CF: '#991b1b', GQ: '#6366F1',
};

const STATUT_COLORS: Record<string, { bg: string; text: string }> = {
  'Conforme': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Sous surveillance': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Non conforme': { bg: 'bg-red-100', text: 'text-red-700' },
};

const NIVEAU_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  ROUGE: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  ORANGE: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  JAUNE: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
};

export default function BarometreCEMAC2026Page() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [selectedPays, setSelectedPays] = useState<CEMACCountryIndicator | null>(null);
  const [showPaysDetail, setShowPaysDetail] = useState(false);
  const [paysFilter, setPaysFilter] = useState<string>('Tous');
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  const paysFiltres = useMemo(() => {
    if (paysFilter === 'Tous') return paysCEMAC;
    if (paysFilter === 'Conforme') return paysCEMAC.filter(p => p.statutAgrement === 'Conforme');
    if (paysFilter === 'Sous surveillance') return paysCEMAC.filter(p => p.statutAgrement === 'Sous surveillance');
    if (paysFilter === 'Non conforme') return paysCEMAC.filter(p => p.statutAgrement === 'Non conforme');
    return paysCEMAC;
  }, [paysFilter]);

  const { showToast } = useToast();

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const honeypot = formData.get('company_alt') as string;
    if (honeypot && honeypot.trim() !== '') return;
    formData.delete('company_alt');
    fetch('https://readdy.ai/api/form/d8m6uuo80ubi47thloq0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    }).then(() => {
      setShowDownloadForm(false);
      showToast(isEn ? 'Download email sent! Check your inbox.' : 'Email de téléchargement envoyé ! Vérifiez votre boîte de réception.', 'success');
    }).catch(() => {
      showToast(isEn ? 'Error. Please try again.' : 'Erreur. Veuillez réessayer.', 'error');
    });
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'CEMAC COBAC Financial Barometer 2026 | Central Africa | KHEPRA EXPERTS' : 'Baromètre CEMAC COBAC 2026 — Inclusion Financière Afrique Centrale | KHEPRA EXPERTS'}
        description={isEn ? 'Complete CEMAC COBAC 2026 barometer: financial inclusion indicators for 6 Central African countries, regulatory compliance scores under COBAC/BEAC, sector trends, key regulatory texts. Independent KHEPRA EXPERTS research.' : 'Baromètre CEMAC COBAC 2026 complet : indicateurs inclusion financière 6 pays Afrique Centrale, scores de conformité COBAC/BEAC, tendances sectorielles, textes réglementaires phares. Recherche indépendante KHEPRA EXPERTS.'}
        keywords="Baromètre CEMAC 2026, inclusion financière CEMAC, conformité COBAC BEAC, taux bancarisation Afrique Centrale, mobile money CEMAC, EMF microfinance CEMAC, fintech Afrique Centrale, ratios prudentiels COBAC, régulation financière CEMAC"
        canonicalPath="/barometre-cemac-2026"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: isEn ? 'CEMAC Barometer 2026' : 'Baromètre CEMAC 2026', path: '/barometre-cemac-2026' }]} />

        {/* ── HERO ── */}
        <section className="relative bg-foreground-950 text-white overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(194,65,12,0.10) 0%, transparent 60%), radial-gradient(ellipse at 85% 50%, rgba(13,123,95,0.08) 0%, transparent 60%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-400">{isEn ? 'Independent Research — June 2026' : 'Recherche Indépendante — Juin 2026'}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">{isEn ? 'CEMAC COBAC Financial Barometer 2026' : 'Baromètre Inclusion Financière CEMAC COBAC 2026'}</h1>
                <p className="text-sm text-foreground-400 leading-relaxed max-w-2xl">
                  {isEn ? 'Independent analysis of CEMAC financial inclusion: 6 countries, 20+ indicators, banking penetration, mobile money, microfinance compliance under COBAC/BEAC, fintech ecosystem. Powered by KHEPRA EXPERTS regulatory intelligence.' : 'Analyse indépendante de l\'inclusion financière CEMAC : 6 pays, 20+ indicateurs, bancarisation, mobile money, conformité microfinance COBAC/BEAC, écosystème fintech. Propulsé par l\'intelligence réglementaire KHEPRA EXPERTS.'}
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <button onClick={() => setShowDownloadForm(true)} className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                    <i className="ri-download-line mr-2" />{isEn ? 'Download the Full Report' : 'Télécharger le Rapport Complet'}
                  </button>
                  <Link to="/cobac" className="px-6 py-3 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                    <i className="ri-scales-3-line mr-2" />{isEn ? 'COBAC Regulatory Dashboard' : 'Dashboard COBAC'}
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block text-right flex-shrink-0">
                <div className="text-5xl font-bold font-heading text-orange-400">{statsGlobalesCEMAC.scoreConformiteMoyen}<span className="text-lg text-foreground-400">/100</span></div>
                <div className="text-xs text-foreground-400 mt-1">{isEn ? 'CEMAC Average Compliance Score' : 'Score Conformité Moyen CEMAC'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS GLOBALES ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: isEn ? 'Banking Rate' : 'Taux Bancarisation', value: `${statsGlobalesCEMAC.tauxBancarisationCEMAC}%`, sub: statsGlobalesCEMAC.progressionBancarisation, color: '#0D7B5F' },
              { label: isEn ? 'Mobile Money' : 'Mobile Money', value: `${statsGlobalesCEMAC.penetrationMobileMoneyCEMAC}%`, sub: statsGlobalesCEMAC.progressionMobileMoney, color: '#C2410C' },
              { label: isEn ? 'Institutions' : 'Institutions', value: statsGlobalesCEMAC.nbInstitutionsFinancieres, sub: `${statsGlobalesCEMAC.nbBanquesTotal} banques · ${statsGlobalesCEMAC.nbEMFTotal} EMF`, color: '#1A1A2E' },
              { label: isEn ? 'Fintechs' : 'Fintechs', value: statsGlobalesCEMAC.nbFintechsTotal, sub: isEn ? '+18 vs 2025' : '+18 vs 2025', color: '#6366F1' },
              { label: isEn ? 'Credit Vol. (B FCFA)' : 'Vol. Crédits (Mds FCFA)', value: Math.round(statsGlobalesCEMAC.volumeCreditsMilliardsFCFA / 1000), sub: statsGlobalesCEMAC.progressionCredits, color: '#4A7A1E' },
              { label: isEn ? 'Compliant' : 'Conformes', value: `${statsGlobalesCEMAC.paysConformes}/6`, sub: isEn ? 'countries' : 'pays', color: '#10B981' },
              { label: isEn ? 'Watch List' : 'Surveillance', value: `${statsGlobalesCEMAC.paysSurveillance}/6`, sub: isEn ? 'countries' : 'pays', color: '#F59E0B' },
              { label: isEn ? 'Cyber Incidents' : 'Incidents Cyber', value: statsGlobalesCEMAC.incidentsCyberTotal, sub: statsGlobalesCEMAC.progressionCyber, color: '#DC2626' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-500 font-bold uppercase tracking-wide mb-1">{s.label}</div>
                <div className="text-xl font-bold font-heading" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-foreground-400 mt-0.5 whitespace-nowrap">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PAYS CEMAC ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground-950">{isEn ? 'CEMAC Countries — COBAC Compliance Scorecard' : 'Pays CEMAC — Scorecard Conformité COBAC'}</h2>
              <p className="text-xs text-foreground-500 mt-1">{isEn ? 'COBAC/BEAC regulatory compliance scores across 6 member states' : 'Scores de conformité réglementaire COBAC/BEAC pour les 6 États membres'}</p>
            </div>
            <div className="flex rounded-full bg-background-100 p-1">
              {['Tous', 'Conforme', 'Sous surveillance', 'Non conforme'].map(f => (
                <button key={f} onClick={() => setPaysFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${paysFilter === f ? 'bg-white shadow-sm text-foreground-950' : 'text-foreground-500 hover:text-foreground-700'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paysFiltres.map(pays => {
              const scorePct = (pays.scoreConformiteCOBAC / 100) * 100;
              return (
                <div key={pays.code} className="bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300 transition-colors cursor-pointer group" onClick={() => { setSelectedPays(pays); setShowPaysDetail(true); }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold font-heading text-foreground-950">{pays.nom}</div>
                      <div className="text-[10px] text-foreground-400 uppercase tracking-wide">{pays.capitale}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-heading" style={{ background: `${COUNTRY_COLORS[pays.code]}15`, color: COUNTRY_COLORS[pays.code] }}>{pays.code}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-end justify-between mb-1">
                      <span className="text-xs text-foreground-500">{isEn ? 'COBAC Compliance' : 'Conformité COBAC'}</span>
                      <span className="text-lg font-bold font-heading" style={{ color: COUNTRY_COLORS[pays.code] }}>{pays.scoreConformiteCOBAC}/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-background-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${scorePct}%`, background: COUNTRY_COLORS[pays.code] }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { l: isEn ? 'Banking' : 'Bancarisation', v: `${pays.tauxBancarisation}%` },
                      { l: isEn ? 'Mobile Money' : 'Mobile Money', v: `${pays.penetrationMobileMoney}%` },
                      { l: isEn ? 'AML/CFT' : 'LBC/FT', v: `${pays.scoreLBCFT}/100` },
                      { l: isEn ? 'Prudential' : 'Prudentiel', v: `${pays.scorePrudentiel}/100` },
                    ].map((m, j) => (
                      <div key={j} className="bg-background-50 rounded-lg p-2.5">
                        <div className="text-[9px] text-foreground-400 uppercase">{m.l}</div>
                        <div className="text-sm font-bold text-foreground-900">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUT_COLORS[pays.statutAgrement].bg} ${STATUT_COLORS[pays.statutAgrement].text}`}>{pays.statutAgrement}</span>
                    <span className="text-xs text-foreground-400">{pays.nbEMF} EMF · {pays.nbBanques} {isEn ? 'banks' : 'banques'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── COMPARAISON DÉTAILLÉE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="bg-white rounded-2xl border border-background-200/70 p-5 md:p-6 overflow-x-auto">
            <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Comparative Analysis — CEMAC 2026' : 'Analyse Comparative — CEMAC 2026'}</h2>
            <table className="w-full text-xs min-w-[900px]">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left py-3 px-3 font-bold text-foreground-500 uppercase tracking-wide whitespace-nowrap">{isEn ? 'Country' : 'Pays'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Pop. (M)' : 'Pop. (M)'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Banking %' : 'Bancarisation %'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Mobile %' : 'Mobile %'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'EMFs' : 'EMF'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Banks' : 'Banques'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Fintechs' : 'Fintechs'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Solvency' : 'Solvabilité'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Liquidity' : 'Liquidité'}</th>
                  <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Score' : 'Score'}</th>
                </tr>
              </thead>
              <tbody>
                {paysCEMAC.map(p => {
                  const isLow = p.scoreConformiteCOBAC < 65;
                  return (
                    <tr key={p.code} className={`border-b border-background-100 hover:bg-background-50/50 transition-colors cursor-pointer ${isLow ? 'bg-red-50/30' : ''}`} onClick={() => { setSelectedPays(p); setShowPaysDetail(true); }}>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COUNTRY_COLORS[p.code] }} />
                          <span className="font-bold text-foreground-900">{p.nom}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-2 text-foreground-700">{p.population}</td>
                      <td className="text-center py-3 px-2">
                        <span className="font-bold" style={{ color: p.tauxBancarisation >= 18 ? '#10B981' : '#DC2626' }}>{p.tauxBancarisation}%</span>
                        <span className="text-[9px] block text-foreground-400">+{(p.tauxBancarisation - p.tauxBancarisation2020).toFixed(1)} pts</span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="font-bold" style={{ color: p.penetrationMobileMoney >= 40 ? '#0D7B5F' : '#F59E0B' }}>{p.penetrationMobileMoney}%</span>
                      </td>
                      <td className="text-center py-3 px-2 text-foreground-700">{p.nbEMF}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{p.nbBanques}</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{p.fintechsActives}</td>
                      <td className="text-center py-3 px-2 font-bold" style={{ color: p.ratioSolvabilite >= 8 ? '#10B981' : '#DC2626' }}>{p.ratioSolvabilite}%</td>
                      <td className="text-center py-3 px-2 text-foreground-700">{p.ratioLiquidite}%</td>
                      <td className="text-center py-3 px-2">
                        <span className="font-bold text-sm" style={{ color: p.scoreConformiteCOBAC >= 80 ? '#10B981' : p.scoreConformiteCOBAC >= 65 ? '#F59E0B' : '#DC2626' }}>{p.scoreConformiteCOBAC}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TENDANCES SECTORIELLES ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Sector Trends 2026' : 'Tendances Sectorielles 2026'}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tendancesSectoriellesCEMAC.map(secteur => (
              <div key={secteur.secteur} className="bg-white rounded-2xl border border-background-200/70 p-5">
                <h3 className="text-sm font-bold font-heading text-foreground-950 mb-4 pb-3 border-b border-background-100">{secteur.secteur}</h3>
                <div className="space-y-3">
                  {secteur.indicateurs.map((ind, j) => (
                    <div key={j} className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-foreground-700 leading-tight">{ind.label}</div>
                        <div className="text-[10px] text-foreground-400 mt-0.5">{ind.detail}</div>
                      </div>
                      <span className={`text-xs font-bold whitespace-nowrap flex-shrink-0 ${ind.evolution === 'positive' ? 'text-emerald-600' : ind.evolution === 'negative' ? 'text-red-500' : 'text-amber-600'}`}>
                        {ind.evolution === 'positive' ? '▲' : ind.evolution === 'negative' ? '▼' : '■'} {ind.valeur}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEXTES PHARES COBAC ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <h2 className="text-lg font-bold font-heading text-foreground-950 mb-4">{isEn ? 'Key COBAC/BEAC Regulatory Texts — 2026' : 'Textes Réglementaires Phares COBAC/BEAC — 2026'}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {textesPharesCOBAC.map(texte => {
              const s = NIVEAU_STYLES[texte.niveau];
              return (
                <div key={texte.reference} className={`bg-white rounded-2xl border ${s.border} p-5`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.bg} ${s.text}`}>{texte.niveau}</span>
                    <span className="text-[10px] text-foreground-400">{new Date(texte.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="text-xs font-bold text-foreground-500 mb-1">{texte.reference}</div>
                  <h3 className="text-sm font-bold font-heading text-foreground-950 mb-2 leading-snug">{texte.titre}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-3">{texte.impact}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600">{texte.domaine}</span>
                    <span className={`text-[10px] font-semibold ${texte.statut === 'En vigueur' ? 'text-emerald-600' : 'text-amber-500'}`}>{texte.statut}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── METHODOLOGIE + SOURCES ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold font-heading text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-microscope-line text-accent-500" />
                  {isEn ? 'Methodology' : 'Méthodologie'}
                </h3>
                <ul className="space-y-2 text-xs text-foreground-600 leading-relaxed">
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5" />{isEn ? 'Data collected from COBAC/BEAC official publications (beac.int), CEMAC Commission statistics, and national banking commissions of 6 member states' : 'Données collectées auprès des publications officielles COBAC/BEAC (beac.int), statistiques Commission CEMAC et commissions bancaires nationales des 6 États'}</li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5" />{isEn ? 'Compliance scores calculated using the KHEPRA Regulatory Compliance Framework™ (20 indicators across 4 pillars tailored for COBAC requirements)' : 'Scores de conformité calculés selon le KHEPRA Regulatory Compliance Framework™ (20 indicateurs sur 4 piliers, adaptés au référentiel COBAC)'}</li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5" />{isEn ? 'Cutoff date: 01 June 2026. Next update: Q3 2026' : 'Date d\'arrêté : 1er juin 2026. Prochaine mise à jour : T3 2026'}</li>
                  <li className="flex items-start gap-2"><i className="ri-check-line text-emerald-500 mt-0.5" />{isEn ? 'Peer review conducted by KHEPRA Regulatory Intelligence AI and KHEPRA Quality Review AI — CEMAC module' : 'Revue par les pairs effectuée par KHEPRA Regulatory Intelligence AI et KHEPRA Quality Review AI — module CEMAC'}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-book-open-line text-accent-500" />
                  {isEn ? 'Official Sources' : 'Sources Officielles'}
                </h3>
                <ul className="space-y-2 text-xs text-foreground-600">
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />COBAC — Rapports de Supervision Bancaire 2025 (beac.int)</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />BEAC — Bulletin du Marché Monétaire CEMAC T4 2025</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />Commission CEMAC — Rapport Intégration Régionale 2025</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />GAFI/GABAC — Évaluations Mutuelles 2024-2025</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />GSMA — State of the Industry Report on Mobile Money 2025</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />Banque Mondiale — Global Findex Database 2024</li>
                  <li className="flex items-start gap-2"><i className="ri-article-line text-foreground-400 mt-0.5 flex-shrink-0" />Commissions Bancaires Nationales — Rapports annuels 2025</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-background-100">
                  <p className="text-[10px] text-foreground-400 italic">
                    {isEn ? 'Disclaimer: This barometer is an independent research publication by KHEPRA EXPERTS. It does not constitute an official COBAC or BEAC publication. For regulatory decisions, always refer to beac.int.' : 'Avertissement : Ce baromètre est une publication de recherche indépendante de KHEPRA EXPERTS. Il ne constitue pas une publication officielle de la COBAC ou de la BEAC. Pour les décisions réglementaires, référez-vous toujours à beac.int.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CROSS-LINK UEMOA ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
          <Link to="/barometre-bceao-2026/" className="block bg-white rounded-2xl border border-background-200/70 p-5 hover:border-accent-300 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(13,123,95,0.1)' }}>
                <i className="ri-bar-chart-line text-2xl" style={{ color: '#0D7B5F' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">{isEn ? 'Also available — West Africa' : 'Également disponible — Afrique de l\'Ouest'}</span>
                </div>
                <h3 className="text-sm font-bold font-heading text-foreground-950 group-hover:text-accent-600 transition-colors">{isEn ? 'Also discover: BCEAO UEMOA Barometer 2026' : 'Découvrez aussi : Baromètre BCEAO UEMOA 2026'}</h3>
                <p className="text-xs text-foreground-500 mt-0.5">{isEn ? '8 West African countries, BCEAO compliance scores, banking & mobile money indicators' : '8 pays d\'Afrique de l\'Ouest, scores conformité BCEAO, indicateurs bancarisation & mobile money'}</p>
              </div>
              <i className="ri-arrow-right-line text-foreground-400 group-hover:text-accent-500 transition-colors text-lg" />
            </div>
          </Link>
        </section>

        {/* ── CTA DOWNLOAD ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Download the Full CEMAC 2026 Barometer' : 'Téléchargez le Baromètre CEMAC 2026 Complet'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? '40+ pages of detailed analysis, 6 country profiles, COBAC compliance deep-dive, methodology, strategic recommendations. Essential for executives, regulators, and investors in the CEMAC financial ecosystem.' : '40+ pages d\'analyse détaillée, 6 profils pays, analyse approfondie conformité COBAC, méthodologie, recommandations stratégiques. Indispensable pour les dirigeants, régulateurs et investisseurs de l\'écosystème financier CEMAC.'}
              </p>
              <button onClick={() => setShowDownloadForm(true)} className="px-8 py-3.5 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors inline-flex items-center gap-2">
                <i className="ri-download-cloud-2-line text-lg" />{isEn ? 'Download the PDF Report' : 'Télécharger le Rapport PDF'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── PAYS DETAIL MODAL ── */}
      {showPaysDetail && selectedPays && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowPaysDetail(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-heading text-white" style={{ background: COUNTRY_COLORS[selectedPays.code] }}>{selectedPays.code}</div>
                <div>
                  <div className="text-sm font-bold text-foreground-950">{selectedPays.nom}</div>
                  <div className="text-[10px] text-foreground-400">{selectedPays.capitale}</div>
                </div>
              </div>
              <button onClick={() => setShowPaysDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { l: isEn ? 'Population' : 'Population', v: `${selectedPays.population} M` },
                  { l: isEn ? 'GDP (B FCFA)' : 'PIB (Mds FCFA)', v: (selectedPays.pibMilliardsFCFA / 1000).toFixed(0) },
                  { l: isEn ? 'Banking Rate' : 'Bancarisation', v: `${selectedPays.tauxBancarisation}%`, c: `+${(selectedPays.tauxBancarisation - selectedPays.tauxBancarisation2020).toFixed(1)} pts vs 2020` },
                  { l: isEn ? 'Mobile Money' : 'Mobile Money', v: `${selectedPays.penetrationMobileMoney}%`, c: `+${(selectedPays.penetrationMobileMoney - selectedPays.penetrationMobileMoney2020).toFixed(1)} pts vs 2020` },
                  { l: isEn ? 'EMFs' : 'EMF', v: selectedPays.nbEMF },
                  { l: isEn ? 'Banks' : 'Banques', v: selectedPays.nbBanques },
                  { l: isEn ? 'Fintechs' : 'Fintechs', v: selectedPays.fintechsActives },
                  { l: isEn ? 'Cyber Incidents' : 'Incidents Cyber', v: selectedPays.incidentsCybersecurite, c: selectedPays.incidentsCybersecurite >= 5 ? '⚠ Élevé' : '✓ Acceptable' },
                ].map((m, j) => (
                  <div key={j} className="bg-background-50 rounded-xl p-3">
                    <div className="text-[10px] text-foreground-400 uppercase">{m.l}</div>
                    <div className="text-base font-bold text-foreground-950">{m.v}</div>
                    {m.c && <div className="text-[10px] text-foreground-500 mt-0.5">{m.c}</div>}
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wide mb-2">{isEn ? 'COBAC Compliance Scores' : 'Scores de Conformité COBAC'}</h4>
              <div className="space-y-2 mb-5">
                {[
                  { l: isEn ? 'Overall COBAC' : 'Global COBAC', v: selectedPays.scoreConformiteCOBAC, color: COUNTRY_COLORS[selectedPays.code] },
                  { l: 'LBC/FT', v: selectedPays.scoreLBCFT, color: '#DC2626' },
                  { l: isEn ? 'Prudential' : 'Prudentiel', v: selectedPays.scorePrudentiel, color: '#0D7B5F' },
                  { l: isEn ? 'Governance' : 'Gouvernance', v: selectedPays.scoreGouvernance, color: '#4A7A1E' },
                ].map(s => (
                  <div key={s.l} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-600 w-20">{s.l}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-background-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.color }} />
                    </div>
                    <span className="text-xs font-bold text-foreground-900 w-8 text-right">{s.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-background-50 border border-background-200/50">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUT_COLORS[selectedPays.statutAgrement].bg} ${STATUT_COLORS[selectedPays.statutAgrement].text}`}>{selectedPays.statutAgrement}</span>
                <div className="text-xs text-foreground-600">{isEn ? `Solvency ratio: ${selectedPays.ratioSolvabilite}% · Liquidity ratio: ${selectedPays.ratioLiquidite}%` : `Ratio solvabilité : ${selectedPays.ratioSolvabilite}% · Ratio liquidité : ${selectedPays.ratioLiquidite}%`}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DOWNLOAD FORM MODAL ── */}
      {showDownloadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowDownloadForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-background-100 flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-foreground-950">{isEn ? 'Download the Full Report' : 'Télécharger le Rapport Complet'}</h3>
              <button onClick={() => setShowDownloadForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line" /></button>
            </div>
            <form onSubmit={handleDownload} data-readdy-form="" className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Full Name' : 'Nom Complet'} *</label>
                <input type="text" name="name" required className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder={isEn ? 'Your name' : 'Votre nom'} />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground-600 mb-1.5">Email *</label>
                <input type="email" name="email" required className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder="vous@organisation.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Organization' : 'Organisation'}</label>
                <input type="text" name="organization" className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder={isEn ? 'Your organization' : 'Votre organisation'} />
              </div>
              <div className="relative overflow-hidden" style={{ height: '1px', width: '1px', position: 'absolute', left: '-9999px' }}>
                <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Position' : 'Fonction'}</label>
                <input type="text" name="position" className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 bg-background-50" placeholder={isEn ? 'Your position' : 'Votre fonction'} />
              </div>
              <button type="submit" className="w-full px-6 py-3 rounded-full bg-foreground-950 text-white font-bold text-sm cursor-pointer hover:bg-foreground-800 transition-colors whitespace-nowrap">
                <i className="ri-download-line mr-2" />{isEn ? 'Get the Report' : 'Recevoir le Rapport'}
              </button>
              <p className="text-[10px] text-foreground-400 text-center">{isEn ? 'We respect your privacy. No spam, ever.' : 'Nous respectons votre vie privée. Pas de spam.'}</p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



