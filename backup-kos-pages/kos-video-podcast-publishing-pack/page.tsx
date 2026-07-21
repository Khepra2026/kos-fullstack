import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSVideoPodcastPublishingPack } from '@/hooks/useKOSVideoPodcastPublishingPack';
import type { PublishingPack, ComplianceCheckItem } from '@/mocks/videoPodcastPublishingPack';

const CATEGORY_COLORS: Record<string, string> = {
  juridique: '#D97757',
  qualite: '#86BC25',
  seo: '#0A66C2',
  branding: '#FF0000',
  reglementaire: '#D4A853',
  technique: '#6B7280',
  design: '#CA8A04',
  marketing: '#C2410C',
};

function statusBadge(status: string) {
  if (status === 'APPROVED') return { bg: '#D1FAE5', text: '#065F46', icon: 'ri-check-double-line', label: 'APPROUVÉ — Publication Autorisée' };
  if (status === 'BLOCKED') return { bg: '#FEE2E2', text: '#991B1B', icon: 'ri-close-circle-fill', label: 'BLOQUÉ — Actions Correctives Requises' };
  return { bg: '#FEF3C7', text: '#92400E', icon: 'ri-time-line', label: 'BROUILLON' };
}

function scoreColor(score: number, min: number) {
  if (score >= min) return '#059669';
  if (score >= min - 10) return '#CA8A04';
  return '#DC2626';
}

export default function videoPodcastPublishingPackPage() {
  const data = useKOSVideoPodcastPublishingPack();
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);

  const tabs = [
    { id: 'pipeline', label: 'Pipeline Packs', icon: 'ri-stack-line', count: `${data.packs.length}` },
    { id: 'pack', label: 'Détail Pack', icon: 'ri-file-list-3-line', count: data.selectedPack ? '1' : '' },
    { id: 'structure', label: 'Structure Big Four', icon: 'ri-layout-masonry-line' },
    { id: 'kpis', label: 'KPIs', icon: 'ri-bar-chart-line' },
  ];

  return (
    <hubLayout hubId={86}>
      <SeoHead
        title="KOS Video Podcast Publishing Pack™ — 10 Livrables par Vidéo, Standard Big Four | KHEPRA EXPERTS"
        description="Générez automatiquement un pack de publication complet pour chaque vidéo YouTube : vidéo master, miniature, titre SEO, description, mots-clés, posts LinkedIn, article long, shorts, carrousel, rapport conformité. Scoring qualité ≥ 90/100 requis."
        keywords="YouTube publishing pack, vidéo podcast Big Four, KHEPRA EXPERTS, BCEAO, COBAC, conformité bancaire, publication vidéo, pack livrable"
        canonicalPath="/kos-video-podcast-publishing-pack"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 50%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-movie-2-line" />KOS Video Podcast Publishing Pack™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              BIG FOUR VIDEO PODCAST PUBLISHING PACK
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl">
              10 livrables par vidéo. Scoring qualité ≥ 90/100 requis. Publication YouTube @KHEPRAEXPERTS au standard des grands cabinets de conseil et d&apos;audit. Vidéo Master · Miniature · Titre SEO · Description · Mots-clés · Posts LinkedIn · Article long · Shorts · Carrousel · Rapport Conformité.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <i className="ri-check-double-line" />{data.approvedCount} pack(s) approuvé(s)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 text-xs font-bold border border-red-500/30">
                  <i className="ri-close-circle-fill" />{data.blockedCount} bloqué(s)
                </span>
              </div>
              <Link to="/kos-youtube-production-pipeline" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-git-branch-line" />Production Pipeline
              </Link>
              <Link to="/kos-linkedin-social-selling-engine" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-shield-check-line" />Social Selling Engine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />{tab.label}
                {tab.count && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PIPELINE — Vue d'Ensemble ═══════════════ */}
      {activeTab === 'pipeline' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Pipeline — Packs de Publication</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chaque vidéo produite par KOS génère un pack complet de 10 livrables. Score global ≥ 90/100 requis pour autoriser la publication sur YouTube @KHEPRAEXPERTS.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total Packs', value: data.kpis.totalPacks, color: '#6B7280', icon: 'ri-stack-line' },
                { label: 'Approuvés', value: data.kpis.packsApproved, color: '#059669', icon: 'ri-check-double-line' },
                { label: 'Bloqués', value: data.kpis.packsBlocked, color: '#DC2626', icon: 'ri-close-circle-fill' },
                { label: 'Score Moyen', value: `${data.kpis.avgGlobalScore}/100`, color: '#CA8A04', icon: 'ri-bar-chart-line' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <i className={`${s.icon} text-xl mb-1 block`} style={{ color: s.color }} />
                  <span className="block text-2xl font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Pack Cards */}
            <div className="space-y-4">
              {data.packs.map((pack: PublishingPack) => {
                const badge = statusBadge(pack.status);
                return (
                  <div key={pack.packId} className={`rounded-2xl border-2 transition-all bg-background-50 ${
                    pack.status === 'APPROVED' ? 'border-emerald-200 hover:border-emerald-300' :
                    pack.status === 'BLOCKED' ? 'border-red-200 hover:border-red-300' :
                    'border-background-200/70 hover:border-foreground-200'
                  }`}>
                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Status + Naming */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            pack.status === 'APPROVED' ? 'bg-emerald-100' : 'bg-red-100'
                          }`}>
                            <i className={`${badge.icon} text-xl ${
                              pack.status === 'APPROVED' ? 'text-emerald-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: badge.bg, color: badge.text }}>
                              {badge.label}
                            </span>
                            <p className="text-[10px] text-foreground-400 mt-1 font-mono">{pack.namingConvention}</p>
                          </div>
                        </div>

                        {/* Title + Meta */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-foreground-950 mb-1 line-clamp-2">{pack.videoTitle}</h3>
                          <div className="flex items-center gap-3 text-[10px] text-foreground-400 flex-wrap">
                            <span><i className="ri-calendar-line mr-1" />{pack.date}</span>
                            <span><i className="ri-timer-line mr-1" />{pack.videoMaster.duration}</span>
                            <span><i className="ri-file-copy-line mr-1" />{pack.deliverablesReady}/{pack.totalDeliverables} livrables prêts</span>
                          </div>
                        </div>

                        {/* Score + Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {/* Score Gauge */}
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center mx-auto mb-1" style={{ borderColor: scoreColor(pack.globalScore, pack.minScoreRequired) }}>
                              <span className="text-lg font-bold text-foreground-950">{pack.globalScore}</span>
                            </div>
                            <span className="text-[9px] text-foreground-400">/100</span>
                          </div>
                          <button
                            onClick={() => { data.selectPack(pack.packId); setActiveTab('pack'); }}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-foreground-950 text-white text-xs font-bold hover:bg-foreground-800 cursor-pointer whitespace-nowrap transition-colors"
                          >
                            <i className="ri-eye-line" />Détail
                          </button>
                        </div>
                      </div>

                      {/* Corrective Actions (if blocked) */}
                      {pack.status === 'BLOCKED' && pack.correctiveActions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-red-200/50">
                          <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2">
                            <i className="ri-error-warning-line mr-1" />{pack.correctiveActions.length} actions correctives requises
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                            {pack.correctiveActions.slice(0, 8).map((action, i) => (
                              <span key={i} className="text-[10px] text-red-700 bg-red-50 rounded-lg px-2 py-1 line-clamp-1">{action}</span>
                            ))}
                            {pack.correctiveActions.length > 8 && (
                              <span className="text-[10px] text-red-500 bg-red-50 rounded-lg px-2 py-1 font-bold">
                                +{pack.correctiveActions.length - 8} actions...
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ DÉTAIL PACK — 10 Livrables ═══════════════ */}
      {activeTab === 'pack' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!data.selectedPack ? (
              <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-background-200/70 flex items-center justify-center mb-4">
                  <i className="ri-file-list-3-line text-4xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">Sélectionnez un pack</h3>
                <p className="text-sm text-foreground-500 mb-6">Cliquez sur &quot;Détail&quot; depuis l&apos;onglet Pipeline pour afficher les 10 livrables.</p>
                <button onClick={() => setActiveTab('pipeline')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground-950 text-white text-sm font-bold cursor-pointer whitespace-nowrap">
                  <i className="ri-stack-line" />Voir les packs
                </button>
              </div>
            ) : (
              (() => {
                const pack = data.selectedPack;
                const badge = statusBadge(pack.status);
                return (
                  <div className="space-y-6">
                    {/* Pack Header */}
                    <div className="rounded-2xl border-2 p-6" style={{ borderColor: pack.status === 'APPROVED' ? '#6EE7B7' : '#FCA5A5', backgroundColor: pack.status === 'APPROVED' ? '#F0FDF4' : '#FEF2F2' }}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: badge.bg, color: badge.text }}>
                            <i className={badge.icon} />{badge.label}
                          </span>
                          <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{pack.videoTitle}</h2>
                          <div className="flex items-center gap-3 text-xs text-foreground-500 flex-wrap">
                            <span className="font-mono">{pack.namingConvention}</span>
                            <span>·</span>
                            <span>{pack.videoMaster.duration}</span>
                            <span>·</span>
                            <span>{pack.deliverablesReady}/{pack.totalDeliverables} livrables</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center mx-auto" style={{ borderColor: scoreColor(pack.globalScore, pack.minScoreRequired) }}>
                              <span className="text-xl font-bold text-foreground-950">{pack.globalScore}</span>
                            </div>
                            <span className="text-[10px] text-foreground-400">/100 (min {pack.minScoreRequired})</span>
                          </div>
                          {pack.status === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold">
                              <i className="ri-upload-cloud-line" />Prêt pour YouTube
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 10 Livrables Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* 01 — VIDÉO MASTER */}
                      <div className={`rounded-2xl border p-5 ${pack.videoMaster.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-foreground-950 text-white flex items-center justify-center text-[10px] font-bold">01</span>
                          <h3 className="text-sm font-bold text-foreground-950">VIDÉO MASTER</h3>
                          {pack.videoMaster.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between"><span className="text-foreground-400">Fichier</span><span className="font-mono text-foreground-700">{pack.videoMaster.fileName}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Format</span><span className="text-foreground-700">{pack.videoMaster.format} · {pack.videoMaster.resolution} · {pack.videoMaster.audio}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Durée</span><span className="font-bold text-foreground-700">{pack.videoMaster.duration}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Taille</span><span className="text-foreground-700">{pack.videoMaster.sizeMB} MB</span></div>
                          <div className="flex gap-3 mt-2">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pack.videoMaster.hasIntro ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {pack.videoMaster.hasIntro ? '✓ Intro' : '✗ Intro'}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pack.videoMaster.hasOutro ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {pack.videoMaster.hasOutro ? '✓ Outro' : '✗ Outro'}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pack.videoMaster.hasSubtitles ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {pack.videoMaster.hasSubtitles ? '✓ Sous-titres' : '✗ Sous-titres'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 02 — THUMBNAIL */}
                      <div className={`rounded-2xl border p-5 ${pack.thumbnail.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#FF0000] text-white flex items-center justify-center text-[10px] font-bold">02</span>
                          <h3 className="text-sm font-bold text-foreground-950">THUMBNAIL YOUTUBE</h3>
                          {pack.thumbnail.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between"><span className="text-foreground-400">Fichier</span><span className="font-mono text-foreground-700">{pack.thumbnail.fileName}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Résolution</span><span className="text-foreground-700">{pack.thumbnail.resolution}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Texte</span><span className="font-bold text-foreground-700">&quot;{pack.thumbnail.titleText}&quot;</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Contraste</span><span className={`font-bold ${pack.thumbnail.contrastLevel === 'Très élevé' ? 'text-emerald-600' : 'text-amber-600'}`}>{pack.thumbnail.contrastLevel}</span></div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pack.thumbnail.hasLogo ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {pack.thumbnail.hasLogo ? '✓ Logo KHEPRA' : '✗ Logo KHEPRA'}
                          </span>
                        </div>
                      </div>

                      {/* 03 — TITRE YOUTUBE */}
                      <div className={`rounded-2xl border p-5 ${pack.youtubeTitle.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold">03</span>
                          <h3 className="text-sm font-bold text-foreground-950">TITRE YOUTUBE SEO</h3>
                          {pack.youtubeTitle.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <p className="text-xs text-foreground-700 leading-relaxed mb-2">&quot;{pack.youtubeTitle.text}&quot;</p>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className={`font-bold ${pack.youtubeTitle.seoOptimized ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {pack.youtubeTitle.charCount}/{pack.youtubeTitle.limit} caractères
                          </span>
                          <span className={`px-1.5 py-0.5 rounded-full ${pack.youtubeTitle.seoOptimized ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {pack.youtubeTitle.seoOptimized ? '✓ SEO optimisé' : '✗ SEO sous-optimisé'}
                          </span>
                        </div>
                      </div>

                      {/* 04 — DESCRIPTION */}
                      <div className={`rounded-2xl border p-5 ${pack.youtubeDescription.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#86BC25] text-white flex items-center justify-center text-[10px] font-bold">04</span>
                          <h3 className="text-sm font-bold text-foreground-950">DESCRIPTION YOUTUBE</h3>
                          {pack.youtubeDescription.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <p className="text-[11px] text-foreground-600 leading-relaxed mb-2 line-clamp-4">{pack.youtubeDescription.summary}</p>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="text-foreground-400">{pack.youtubeDescription.summaryWordCount} mots</span>
                          <span className="text-foreground-400">{pack.youtubeDescription.points.length} points</span>
                          <span className="text-foreground-400">{pack.youtubeDescription.resources.length} ressources</span>
                          <span className="text-foreground-400">{pack.youtubeDescription.chapters.length} chapitres</span>
                          <span className="text-foreground-400">{pack.youtubeDescription.hashtags.length} hashtags</span>
                        </div>
                      </div>

                      {/* 05 — KEYWORDS */}
                      <div className={`rounded-2xl border p-5 ${pack.keywords.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#D4A853] text-white flex items-center justify-center text-[10px] font-bold">05</span>
                          <h3 className="text-sm font-bold text-foreground-950">MOTS-CLÉS SEO</h3>
                          <span className="text-[10px] font-bold text-foreground-400">{pack.keywords.count} mots-clés</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pack.keywords.keywords.map((kw, i) => (
                            <span key={i} className="text-[9px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 font-medium">{kw}</span>
                          ))}
                        </div>
                      </div>

                      {/* 06 — POSTS LINKEDIN */}
                      <div className={`rounded-2xl border p-5 ${pack.linkedinPosts.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold">06</span>
                          <h3 className="text-sm font-bold text-foreground-950">POSTS LINKEDIN</h3>
                          {pack.linkedinPosts.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Version Dirigeant</span>
                            <p className="text-[11px] text-foreground-600 leading-relaxed mt-0.5 line-clamp-3 whitespace-pre-wrap">{pack.linkedinPosts.dirigeant.slice(0, 200)}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Version Page Entreprise</span>
                            <p className="text-[11px] text-foreground-600 leading-relaxed mt-0.5 line-clamp-3 whitespace-pre-wrap">{pack.linkedinPosts.pageEntreprise.slice(0, 200)}</p>
                          </div>
                        </div>
                      </div>

                      {/* 07 — ARTICLE */}
                      <div className={`rounded-2xl border p-5 ${pack.article.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#C2410C] text-white flex items-center justify-center text-[10px] font-bold">07</span>
                          <h3 className="text-sm font-bold text-foreground-950">ARTICLE LONG</h3>
                          {pack.article.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <p className="font-bold text-foreground-700 line-clamp-2">&quot;{pack.article.title}&quot;</p>
                          <div className="flex justify-between"><span className="text-foreground-400">Mots</span><span className={`font-bold ${pack.article.wordCount >= 1200 ? 'text-emerald-600' : 'text-amber-600'}`}>{pack.article.wordCount} / {pack.article.targetWordCount}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Statut</span><span className="text-foreground-700">{pack.article.status}</span></div>
                          {pack.article.url && <div className="flex justify-between"><span className="text-foreground-400">URL</span><span className="text-[10px] text-accent-700 truncate max-w-[200px]">{pack.article.url}</span></div>}
                        </div>
                      </div>

                      {/* 08 — SHORTS */}
                      <div className={`rounded-2xl border p-5 ${pack.shorts.every((s) => s.ready) ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#FF0000] text-white flex items-center justify-center text-[10px] font-bold">08</span>
                          <h3 className="text-sm font-bold text-foreground-950">SHORTS YOUTUBE</h3>
                          <span className="text-[10px] text-foreground-400">{pack.shorts.filter((s) => s.ready).length}/{pack.shorts.length} prêts</span>
                        </div>
                        <div className="space-y-2">
                          {pack.shorts.map((short) => (
                            <div key={short.shortId} className="flex items-center gap-2 p-2 rounded-lg bg-background-100">
                              {short.ready ? <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0" /> : <i className="ri-time-line text-amber-500 text-sm flex-shrink-0" />}
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-foreground-700 line-clamp-1">{short.title}</p>
                                <span className="text-[9px] text-foreground-400">{short.duration} · {short.resolution}</span>
                              </div>
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500 whitespace-nowrap">{short.objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 09 — CARROUSEL */}
                      <div className={`rounded-2xl border p-5 ${pack.carrousel.ready ? 'bg-background-50 border-background-200/70' : 'bg-amber-50/30 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-[#CA8A04] text-white flex items-center justify-center text-[10px] font-bold">09</span>
                          <h3 className="text-sm font-bold text-foreground-950">CARROUSEL LINKEDIN</h3>
                          {pack.carrousel.ready ? <i className="ri-check-line text-emerald-500 text-sm" /> : <i className="ri-close-line text-amber-500 text-sm" />}
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between"><span className="text-foreground-400">Slides</span><span className={`font-bold ${pack.carrousel.slides >= 8 ? 'text-emerald-600' : 'text-amber-600'}`}>{pack.carrousel.slides} slides</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Format</span><span className="text-foreground-700">{pack.carrousel.format}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Statut</span><span className="text-foreground-700">{pack.carrousel.status}</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">CTA</span><span className="text-foreground-700 text-[11px] line-clamp-1">&quot;{pack.carrousel.ctaText}&quot;</span></div>
                        </div>
                      </div>

                      {/* 10 — COMPLIANCE REPORT */}
                      <div className={`rounded-2xl border p-5 col-span-1 lg:col-span-2 ${
                        pack.complianceReport.authorized ? 'bg-emerald-50/30 border-emerald-200' : 'bg-red-50/30 border-red-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-md bg-foreground-950 text-white flex items-center justify-center text-[10px] font-bold">10</span>
                          <h3 className="text-sm font-bold text-foreground-950">RAPPORT DE CONFORMITÉ</h3>
                          <span className={`text-sm font-bold ${pack.complianceReport.authorized ? 'text-emerald-600' : 'text-red-600'}`}>
                            {pack.complianceReport.globalScore}/100
                          </span>
                          {pack.complianceReport.authorized ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Publication Autorisée</span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">Publication Bloquée</span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pack.complianceReport.checks.map((check: ComplianceCheckItem) => (
                            <div
                              key={check.checkId}
                              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                expandedCheckId === check.checkId ? 'border-foreground-300 bg-background-50' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
                              }`}
                              onClick={() => setExpandedCheckId(expandedCheckId === check.checkId ? null : check.checkId)}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  check.passed ? 'bg-emerald-100' : 'bg-red-100'
                                }`}>
                                  <i className={`${check.passed ? 'ri-check-line text-emerald-600' : 'ri-close-line text-red-600'} text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-bold text-foreground-800">{check.name}</span>
                                    <span className="text-[9px] px-1 py-0.5 rounded-full" style={{ backgroundColor: `${CATEGORY_COLORS[check.category] || '#6B7280'}15`, color: CATEGORY_COLORS[check.category] || '#6B7280' }}>
                                      {check.category}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold" style={{ color: check.passed ? '#059669' : '#DC2626' }}>
                                    {check.score}/{check.maxScore}
                                  </span>
                                </div>
                                {check.autoFixed && <i className="ri-robot-line text-[10px] text-emerald-500" title="Corrigé automatiquement" />}
                              </div>
                              {expandedCheckId === check.checkId && (
                                <p className="mt-2 text-[10px] text-foreground-500 leading-relaxed">{check.detail}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                      <h3 className="text-sm font-bold text-foreground-950 mb-3">
                        <i className="ri-checkbox-circle-line mr-2 text-emerald-500" />
                        Checklist Publication YouTube — {pack.checklist.filter((c) => c.checked).length}/{pack.checklist.length} validés
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                        {pack.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-background-100">
                            <i className={`${item.checked ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line text-foreground-300'} text-sm flex-shrink-0`} />
                            <span className={`text-[11px] ${item.checked ? 'text-foreground-700' : 'text-foreground-400'}`}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ STRUCTURE BIG FOUR ═══════════════ */}
      {activeTab === 'structure' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Structure Visuelle Big Four</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chaque vidéo produite par KOS suit cette structure en 7 sections, conforme au standard de communication institutionnelle des grands cabinets de conseil et d&apos;audit.
              </p>
            </div>

            <div className="rounded-2xl bg-foreground-950 p-6 text-white">
              <div className="space-y-4">
                {data.videoStructure.map((section, i) => (
                  <div key={section.sectionId} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        section.sectionId === 'INTRO' || section.sectionId === 'OUTRO' ? 'bg-[#D4A853] text-foreground-950' : 'bg-white/10 text-white'
                      }`}>
                        {section.sectionId === 'INTRO' ? <i className="ri-play-circle-line" /> :
                         section.sectionId === 'OUTRO' ? <i className="ri-stop-circle-line" /> :
                         <span>{section.order}</span>}
                      </div>
                      {i < data.videoStructure.length - 1 && <div className="w-0.5 flex-1 bg-white/20 my-1" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">{section.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">{section.duration}</span>
                      </div>
                      <p className="text-xs text-gray-400">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Naming Convention */}
            <div className="mt-6 rounded-2xl bg-background-50 border border-background-200/70 p-5">
              <h3 className="text-sm font-bold text-foreground-950 mb-3">
                <i className="ri-file-code-line mr-2" />Naming Convention
              </h3>
              <div className="rounded-xl bg-background-100 p-4">
                <p className="text-xs text-foreground-700 font-mono mb-2">YYYY-MM-DD_TOPIC_VERSION</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                  <div><span className="text-foreground-400 font-bold">DATE :</span> <span className="text-foreground-700">2026-06-23 (ISO 8601)</span></div>
                  <div><span className="text-foreground-400 font-bold">TOPIC :</span> <span className="text-foreground-700">BCEAO-AGREMENT-GUIDE (tireté, majuscules)</span></div>
                  <div><span className="text-foreground-400 font-bold">VERSION :</span> <span className="text-foreground-700">V1, V2, FINAL</span></div>
                  <div><span className="text-foreground-400 font-bold">Exemple :</span> <span className="text-emerald-600 font-bold">2026-06-23_BCEAO-AGREMENT-GUIDE_V1.mp4</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ KPIs ═══════════════ */}
      {activeTab === 'kpis' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs — Video Podcast Publishing Pack</h2>
              <p className="text-sm text-foreground-500">Indicateurs clés de performance du Publishing Pack™.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Packs', value: data.kpis.totalPacks, icon: 'ri-stack-line', color: '#6B7280' },
                { label: 'Approuvés (≥ 90)', value: data.kpis.packsApproved, icon: 'ri-check-double-line', color: '#059669' },
                { label: 'Bloqués (< 90)', value: data.kpis.packsBlocked, icon: 'ri-close-circle-fill', color: '#DC2626' },
                { label: 'Score Global Moyen', value: `${data.kpis.avgGlobalScore}/100`, icon: 'ri-bar-chart-line', color: '#CA8A04' },
                { label: 'Livrables Prêts', value: `${data.kpis.totalDeliverablesReady}/${data.kpis.totalDeliverablesTotal}`, icon: 'ri-file-copy-line', color: '#86BC25' },
                { label: 'Vidéos Durée Moy.', value: data.kpis.avgVideoDuration, icon: 'ri-timer-line', color: '#C2410C' },
                { label: 'Shorts Produits', value: data.kpis.totalShortsProduced, icon: 'ri-smartphone-line', color: '#FF0000' },
                { label: 'Articles Générés', value: data.kpis.totalArticlesGenerated, icon: 'ri-article-line', color: '#0A66C2' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <i className={`${kpi.icon} text-lg`} style={{ color: kpi.color }} />
                    </div>
                    <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-foreground-950">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Score Threshold */}
            <div className="rounded-2xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-4">Seuil de Publication — Score ≥ 90/100</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">0</span>
                    <span className="font-bold text-[#D4A853]">Seuil minimum : 90</span>
                    <span className="text-gray-400">100</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" style={{ width: '100%' }} />
                    <div className="relative -top-5">
                      <div className="absolute left-[90%] -translate-x-1/2" style={{ top: '-20px' }}>
                        <div className="w-0.5 h-6 bg-[#D4A853]" />
                        <span className="text-[9px] text-[#D4A853] font-bold block mt-1">90</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <span className="block text-red-400 font-bold mb-1">Zone Rouge</span>
                  <span className="text-red-300">0-79</span>
                  <p className="text-red-400/70 mt-1 text-[10px]">Publication bloquée</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="block text-amber-400 font-bold mb-1">Zone Orange</span>
                  <span className="text-amber-300">80-89</span>
                  <p className="text-amber-400/70 mt-1 text-[10px]">Actions correctives requises</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="block text-emerald-400 font-bold mb-1">Zone Verte</span>
                  <span className="text-emerald-300">90-100</span>
                  <p className="text-emerald-400/70 mt-1 text-[10px]">Publication YouTube autorisée</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème KOS — Publication Vidéo Big Four</h2>
              <p className="text-gray-400 text-sm">
                Social Selling Engine → Production Pipeline → Hybrid Studio → Publishing Pack. Chaque vidéo KHEPRA EXPERTS est livrée avec 10 livrables professionnels prêts pour YouTube @KHEPRAEXPERTS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-linkedin-social-selling-engine" className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#DC2626' }}>
                <i className="ri-shield-check-line" />Social Selling Engine
              </Link>
              <Link to="/kos-youtube-production-pipeline" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-git-branch-line" />Production Pipeline
              </Link>
              <Link to="/kos-youtube-download" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                <i className="ri-youtube-fill" />Hybrid Studio
              </Link>
              <Link to="/kos-youtube-analytics" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <i className="ri-line-chart-line" />YouTube Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





