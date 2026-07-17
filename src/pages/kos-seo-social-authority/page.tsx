import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  socialSEOOverview,
  linkedInAuthority,
  socialPlatformBreakdown,
  socialContentROI,
  socialQuickWins,
  socialAlerts,
} from '@/mocks/seoSocialAuthority';

type TabId = 'overview' | 'authority' | 'content' | 'platforms' | 'quickwins';

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

export default function KOSSeoSocialAuthorityPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const overview = socialSEOOverview;

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.totalScore}/100` },
    { id: 'authority', label: 'Autorité LinkedIn', icon: 'ri-linkedin-fill', count: `${overview.linkedinFollowers}` },
    { id: 'content', label: 'ROI Contenu Social', icon: 'ri-bar-chart-2-line', count: String(socialContentROI.length) },
    { id: 'platforms', label: 'Plateformes', icon: 'ri-share-line', count: '3' },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(socialQuickWins.filter(q => q.impact === 'Critique').length) },
  ];

  return (
    <KOSHubLayout hubId={73}>
      <SeoHead
        title="KOS Social SEO & LinkedIn Authority — Signaux Sociaux, Autorité LinkedIn | KHEPRA EXPERTS"
        description="Social SEO & LinkedIn Authority : Score social 54/100, 4 850 followers LinkedIn, 45 backlinks sociaux, SSI 62/100. Optimisation signaux sociaux pour SEO. KHEPRA EXPERTS."
        keywords="social SEO, LinkedIn authority, signaux sociaux SEO, social signals, LinkedIn SSI, content amplification, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-social-authority"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/10 via-transparent to-amber-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] text-xs font-bold mb-4">
                <i className="ri-linkedin-fill" />
                SOCIAL SEO — {formatNumber(overview.linkedinFollowers)} Followers · SSI {overview.totalScore}/100
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Social SEO & LinkedIn Authority — Transformez vos signaux sociaux en rankings
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{formatNumber(overview.linkedinFollowers)} followers LinkedIn</strong> (cible {formatNumber(overview.linkedinTarget)}) ·{' '}
                <strong className="text-[#0A66C2]">{formatNumber(overview.linkedinImpressions)} impressions/mois</strong> · Engagement <strong className="text-emerald-600">{overview.linkedinEngagement}%</strong>.{' '}
                <strong className="text-amber-600">{overview.socialBacklinks} backlinks</strong> générés par les réseaux sociaux. Trafic de référence social : <strong className="text-emerald-600">{formatNumber(overview.socialReferralTraffic)} sessions/mois</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] text-xs font-bold">
                  <i className="ri-linkedin-fill" />SSI {overview.totalScore}/100
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-share-forward-line" />{overview.shareOfVoice}% Share of Voice
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-950 text-background-50 text-xs font-semibold">
                  <i className="ri-search-line" />{formatNumber(overview.brandSearchesMonthly)} Brand Searches
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#0A66C2" strokeWidth="8"
                    strokeDasharray={`${(overview.totalScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.totalScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score Social</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === TAB: OVERVIEW === */}
      {activeTab === 'overview' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Followers LinkedIn', value: formatNumber(overview.linkedinFollowers), sub: `Cible ${formatNumber(overview.linkedinTarget)}`, icon: 'ri-linkedin-fill', color: '#0A66C2' },
                { label: 'Impressions/mois', value: formatNumber(overview.linkedinImpressions), sub: `${overview.linkedinPostsMonth} posts`, icon: 'ri-eye-line', color: '#86BC25' },
                { label: 'Engagement', value: `${overview.linkedinEngagement}%`, sub: 'Moyen par post', icon: 'ri-heart-line', color: '#DC2626' },
                { label: 'Trafic Social', value: formatNumber(overview.socialReferralTraffic), sub: 'sessions/mois', icon: 'ri-share-forward-line', color: '#D97706' },
                { label: 'Backlinks Sociaux', value: `${overview.socialBacklinks}`, sub: `Cible ${overview.socialBacklinksTarget}`, icon: 'ri-link', color: '#CA8A04' },
                { label: 'Brand Searches', value: formatNumber(overview.brandSearchesMonthly), sub: '/mois', icon: 'ri-search-line', color: '#C05A3A' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                  <span className="block text-[9px] text-foreground-400 mt-0.5">{s.sub}</span>
                </div>
              ))}
            </div>

            {/* Platform Overview + Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-share-line text-[#0A66C2]" />Vue d'Ensemble par Plateforme
                </h3>
                <div className="space-y-4">
                  {socialPlatformBreakdown.map((pf) => (
                    <div key={pf.platform} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: `${pf.color}08` }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${pf.color}15` }}>
                        <i className={`${pf.icon} text-lg`} style={{ color: pf.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground-950">{pf.platform}</span>
                          <span className="text-xs text-foreground-500">{formatNumber(pf.followers)} followers</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-500">
                          <span>{pf.postsMonth} posts/mois</span>
                          <span>·</span>
                          <span>{pf.engagementAvg}% engagement</span>
                          <span>·</span>
                          <span>{formatNumber(pf.impressionsMonthly)} imp.</span>
                          <span>·</span>
                          <span className="font-semibold" style={{ color: pf.color }}>Impact SEO : {pf.seoImpact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Alertes Social SEO</h3>
                <div className="space-y-2">
                  {socialAlerts.map(alt => (
                    <div key={alt.id} className={`rounded-xl p-3 ${alt.severity === 'Critique' ? 'bg-red-50/60 border border-red-200' : alt.severity === 'Haute' ? 'bg-amber-50/60 border border-amber-200' : 'bg-background-100 border border-background-200'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${
                          alt.severity === 'Critique' ? 'bg-red-50 text-red-700 border-red-200' :
                          alt.severity === 'Haute' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-background-100 text-foreground-500'
                        }`}>{alt.type}</span>
                        <span className={`text-[10px] font-bold ${alt.severity === 'Critique' ? 'text-red-600' : alt.severity === 'Haute' ? 'text-amber-600' : 'text-foreground-600'}`}>{alt.severity}</span>
                      </div>
                      <p className="text-xs text-foreground-700">{alt.message}</p>
                      <p className="text-[10px] text-foreground-500 mt-1">{alt.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: AUTHORITY === */}
      {activeTab === 'authority' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">LinkedIn Authority — 8 Métriques d'Autorité</h2>
              <p className="text-foreground-600 text-sm">SSI : {linkedInAuthority[0].value}/100 · Croissance followers : +{linkedInAuthority[1].value}%/mois · Leads sociaux : {linkedInAuthority[4].value}/mois</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {linkedInAuthority.map((la) => (
                <div key={la.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0A66C2' + '15' }}>
                      <i className="ri-bar-chart-2-line text-[#0A66C2]" />
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${la.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {la.trend === 'up' ? '▲' : '—'} {la.change}
                      </span>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-foreground-950">{la.value}{la.unit ? la.unit : ''}</span>
                  <span className="text-xs font-semibold text-foreground-700 mt-1">{la.metric}</span>
                  <div className="mt-2 pt-2 border-t border-background-200/50">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="text-foreground-400">Moy. secteur : {la.industryAvg}</span>
                      <span className="text-[#0A66C2] font-bold">Cible : {la.target}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-background-200 mt-1 overflow-hidden">
                      <div className="h-full rounded-full bg-[#0A66C2]" style={{ width: `${(la.value / la.target) * 100}%` }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground-400 mt-2">{la.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: CONTENT ROI === */}
      {activeTab === 'content' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">ROI Contenu Social — {socialContentROI.length} Publications Traquées</h2>
              <p className="text-foreground-600 text-sm">
                {socialContentROI.reduce((s, c) => s + c.shares, 0)} partages · {socialContentROI.reduce((s, c) => s + c.clicks, 0)} clics · {socialContentROI.reduce((s, c) => s + c.leads, 0)} leads · {socialContentROI.reduce((s, c) => s + c.backlinks, 0)} backlinks
              </p>
            </div>

            <div className="space-y-3">
              {socialContentROI.map((sc) => (
                <div key={sc.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: sc.platform === 'LinkedIn' ? '#0A66C215' : sc.platform === 'X' ? '#1A1A1A15' : '#FF000015' }}>
                        <i className={`text-lg ${sc.platform === 'LinkedIn' ? 'ri-linkedin-fill text-[#0A66C2]' : sc.platform === 'X' ? 'ri-twitter-x-fill text-[#1A1A1A]' : 'ri-youtube-fill text-[#FF0000]'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{sc.id}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{sc.type}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground-950 mt-1 leading-snug">{sc.title}</h4>
                        <p className="text-[10px] text-foreground-500">{sc.platform} · {sc.postedDate}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Partages</span><span className="text-xs font-bold text-[#0A66C2]">{sc.shares}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Clics → Site</span><span className="text-xs font-bold text-emerald-600">{sc.clicks}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Leads</span><span className="text-xs font-bold text-amber-600">{sc.leads}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Backlinks</span><span className="text-xs font-bold text-accent-600">{sc.backlinks}</span></div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><i className="ri-arrow-up-line" />{sc.kwUplift}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: PLATFORMS === */}
      {activeTab === 'platforms' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {socialPlatformBreakdown.map((pf) => (
                <div key={pf.platform} className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <div className="p-5" style={{ backgroundColor: `${pf.color}08`, borderBottom: `1px solid ${pf.color}20` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${pf.color}15` }}>
                        <i className={`${pf.icon} text-2xl`} style={{ color: pf.color }} />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground-950">{pf.platform}</h3>
                        <span className="text-xs text-foreground-500">{formatNumber(pf.followers)} followers · +{pf.growth}%/mois</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground-500">Posts / mois</span>
                      <span className="text-lg font-bold font-heading text-foreground-950">{pf.postsMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground-500">Engagement moyen</span>
                      <span className="text-lg font-bold font-heading text-foreground-950">{pf.engagementAvg}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground-500">Impressions / mois</span>
                      <span className="text-lg font-bold font-heading text-foreground-950">{formatNumber(pf.impressionsMonthly)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground-500">Clics → Site</span>
                      <span className="text-lg font-bold font-heading text-foreground-950">{formatNumber(pf.clicksToSite)}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-foreground-500">Contenu Top</span>
                      <span className="text-sm text-foreground-700 text-right">{pf.topContentType}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-foreground-500">Meilleur créneau</span>
                      <span className="text-sm text-foreground-700 text-right">{pf.bestDay} — {pf.bestTime}</span>
                    </div>
                    <div className="pt-2 border-t border-background-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-500">Impact SEO</span>
                        <span className="text-sm font-bold" style={{ color: pf.color }}>{pf.seoImpact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: QUICK WINS === */}
      {activeTab === 'quickwins' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins — {socialQuickWins.length} Actions Prioritaires</h2>
              <p className="text-foreground-600 text-sm">{socialQuickWins.filter(q => q.impact === 'Critique').length} critiques · Reach additionnel estimé : {formatNumber(socialQuickWins.reduce((s, q) => s + q.expectedReach, 0))} · Leads : {socialQuickWins.reduce((s, q) => s + q.expectedLeads, 0)}</p>
            </div>

            <div className="space-y-3">
              {socialQuickWins.map((qw) => (
                <div key={qw.id} className={`rounded-2xl border p-5 ${qw.impact === 'Critique' ? 'border-red-200 bg-red-50/20' : qw.impact === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: qw.impact === 'Critique' ? '#FEE2E2' : qw.impact === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                      <i className={`text-lg ${qw.impact === 'Critique' ? 'ri-flashlight-fill text-red-600' : 'ri-flashlight-line text-amber-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-foreground-950">{qw.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${
                          qw.impact === 'Critique' ? 'bg-red-50 border-red-200 text-red-700' : qw.impact === 'Haute' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-background-100 text-foreground-500'
                        }`}>{qw.impact}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: qw.platform === 'LinkedIn' ? '#0A66C215' : qw.platform === 'X' ? '#1A1A1A15' : qw.platform === 'YouTube' ? '#FF000015' : '#F3F4F6', color: qw.platform === 'SEO' ? '#86BC25' : '#0A66C2' }}>{qw.platform}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground-950">{qw.action}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-foreground-500">
                        <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                        <span className="text-[#0A66C2] font-bold"><i className="ri-eye-line mr-1" />+{formatNumber(qw.expectedReach)} reach</span>
                        <span className="text-emerald-600 font-bold"><i className="ri-user-add-line mr-1" />+{qw.expectedLeads} leads</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — Social SEO</h2>
            <p className="text-foreground-600">Interconnexion avec les hubs SEO et réseaux sociaux.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Social SEO Authority', path: '/kos-seo-social-authority', icon: 'ri-share-line', color: '#0A66C2', current: true },
              { label: 'Social Media Command', path: '/kos-social-media-command', icon: 'ri-share-circle-line', color: '#C05A3A' },
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-file-text-line', color: '#F59E0B' },
              { label: 'SEO Analytics', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#CA8A04' },
              { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#C05A3A' },
              { label: 'AI Visibility', path: '/kos-ai-visibility-command', icon: 'ri-radar-line', color: '#9B7B2C' },
              { label: 'Local SEO & GEO', path: '/kos-seo-local-geo', icon: 'ri-global-line', color: '#D97706' },
            ].map((link) => (
              <a key={link.path} href={link.path}
                className={`rounded-xl border p-4 text-center cursor-pointer block transition-all ${link.current ? 'border-[#0A66C2]/30 bg-[#0A66C2]/5 ring-2 ring-[#0A66C2]/40' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-[#0A66C2] font-bold mt-1">Actif — En cours</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}