import { useState, useCallback } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSHybridYoutubeStudio } from '@/hooks/useKOSHybridYoutubeStudio';
import type { ContentItem, ContentStage, PendingQueueItem, BigFourScore, CorrectivePlan, CorrectiveAction, EditorialBlock, RegulatoryComplianceCheck, DownloadFile, AudienceSegment } from '@/mocks/hybridYoutubeStudio';

const STAGE_COLORS: Record<string, string> = {
  TOPIC_DEFINED: '#6B7280',
  SCRIPT_MASTER_GENERATED: '#86BC25',
  SCRIPT_GENERATED: '#86BC25',
  SCRIPT_VALIDATED: '#059669',
  VOICE_GENERATED: '#CA8A04',
  VOICE_VALIDATED: '#059669',
  THUMBNAIL_GENERATED: '#D4A853',
  THUMBNAIL_VALIDATED: '#059669',
  VIDEO_ASSEMBLED: '#FF0000',
  VIDEO_VALIDATED: '#059669',
  METADATA_GENERATED: '#0A66C2',
  COMPLIANCE_CHECKED: '#7C3AED',
  PACKAGE_GENERATED: '#059669',
  READY: '#059669',
  UPLOADED: '#C2410C',
  PUBLISHED: '#86BC25',
  ARCHIVED: '#6B7280',
  QC_FAILED: '#DC2626',
  BLOCKED_BIG_FOUR: '#DC2626',
};

const STAGE_LABELS: Record<string, string> = {
  TOPIC_DEFINED: 'Sujet Défini',
  SCRIPT_MASTER_GENERATED: 'Script Maître',
  SCRIPT_GENERATED: 'Script Généré',
  SCRIPT_VALIDATED: 'Script Validé',
  VOICE_GENERATED: 'Voix IA',
  VOICE_VALIDATED: 'Voix Validée',
  THUMBNAIL_GENERATED: 'Miniature',
  THUMBNAIL_VALIDATED: 'Miniature Validée',
  VIDEO_ASSEMBLED: 'Vidéo Assemblée',
  VIDEO_VALIDATED: 'Vidéo Validée',
  METADATA_GENERATED: 'Métadonnées OK',
  COMPLIANCE_CHECKED: 'Conformité ✓',
  PACKAGE_GENERATED: 'Package Final',
  READY: 'Prêt',
  UPLOADED: 'Uploadé',
  PUBLISHED: 'Publié',
  ARCHIVED: 'Archivé',
  QC_FAILED: 'QC Échoué',
  BLOCKED_BIG_FOUR: 'BLOQUÉ < 90',
};

const STAGE_ICONS: Record<string, string> = {
  TOPIC_DEFINED: 'ri-lightbulb-line',
  SCRIPT_MASTER_GENERATED: 'ri-file-text-line',
  SCRIPT_GENERATED: 'ri-file-text-line',
  SCRIPT_VALIDATED: 'ri-check-double-line',
  VOICE_GENERATED: 'ri-mic-line',
  VOICE_VALIDATED: 'ri-check-double-line',
  THUMBNAIL_GENERATED: 'ri-image-line',
  THUMBNAIL_VALIDATED: 'ri-check-double-line',
  VIDEO_ASSEMBLED: 'ri-movie-line',
  VIDEO_VALIDATED: 'ri-check-double-line',
  METADATA_GENERATED: 'ri-search-eye-line',
  COMPLIANCE_CHECKED: 'ri-shield-check-line',
  PACKAGE_GENERATED: 'ri-archive-line',
  READY: 'ri-checkbox-circle-fill',
  UPLOADED: 'ri-upload-cloud-2-fill',
  PUBLISHED: 'ri-global-line',
  ARCHIVED: 'ri-archive-line',
  QC_FAILED: 'ri-close-circle-fill',
  BLOCKED_BIG_FOUR: 'ri-alert-fill',
};

const DELIVERABLE_CATEGORY_ICONS: Record<string, string> = { core: 'ri-file-text-line', audio: 'ri-mic-line', visual: 'ri-movie-line', metadata: 'ri-code-s-slash-line', social: 'ri-share-line', compliance: 'ri-shield-check-line' };
const DELIVERABLE_CATEGORY_LABELS: Record<string, string> = { core: 'Core', audio: 'Audio', visual: 'Visuel', metadata: 'Métadonnées', social: 'Social', compliance: 'Conformité' };

function formatBytes(bytes: number): string {
  if (bytes === 0) return '—';
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function BigFourGauge({ score, maxScore, label, color, icon, passed }: { score: number; maxScore: number; label: string; color: string; icon: string; passed: boolean }) {
  const pct = Math.round((score / maxScore) * 100);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[72px] h-[72px] flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--background-200)" strokeWidth="5" />
          <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <i className={`${icon} text-[10px]`} style={{ color }} />
        <span className="text-[9px] font-bold text-foreground-600 text-center leading-tight">{label}</span>
      </div>
      {!passed && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">ÉCHEC</span>}
    </div>
  );
}

export default function bigFourYoutubeFactoryPage() {
  const studio = useKOSHybridYoutubeStudio();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'big-four' | 'compliance' | 'downloads' | 'editorial' | 'corrective' | 'queue' | 'upload-guide' | 'kpi' | 'voices'>('pipeline');
  const [expandedContent, setExpandedContent] = useState<string | null>('CONT-001');
  const [localTopic, setLocalTopic] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  // ─── Audience + Voice selection state ───
  const [selectedAudiences, setSelectedAudiences] = useState<AudienceSegment[]>([]);
  const [selectedVideoType, setSelectedVideoType] = useState<string>('analyse');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('vp-celestin-koffi');
  const [voiceAutoSelected, setVoiceAutoSelected] = useState(true);

  const toggleAudience = useCallback((seg: AudienceSegment) => {
    setSelectedAudiences((prev) => {
      const next = prev.includes(seg) ? prev.filter((s) => s !== seg) : [...prev, seg];
      // Auto-select recommended voice based on primary audience
      if (voiceAutoSelected && next.length > 0) {
        const recVoice = studio.getRecommendedVoice(next);
        setSelectedVoiceId(recVoice);
      }
      return next;
    });
  }, [studio, voiceAutoSelected]);

  const handleNewScript = async () => {
    if (!localTopic.trim()) return;
    const audienceLabel = selectedAudiences.length > 0
      ? selectedAudiences.map((s) => s.replace(/_/g, ' ')).join(', ')
      : 'Institutions financières africaines';
    const content = await studio.generateScript(localTopic, selectedVideoType, audienceLabel, selectedAudiences);
    // Auto-generate voice with selected profile
    if (selectedVoiceId) {
      const voiceName = studio.allVoiceProfiles.find((v) => v.id === selectedVoiceId)?.name || 'Dr. Célestin Koffi — Expert Institutionnel';
      await studio.generateVoice(content.contentId, voiceName);
    }
    setExpandedContent(content.contentId);
    setLocalTopic('');
  };

  const handlePublish = async (contentId: string) => {
    const result = await studio.publishToYoutube(contentId);
    setPublishMessage(result.message);
    setTimeout(() => setPublishMessage(null), 5000);
  };

  const tabs = [
    { id: 'pipeline' as const, label: 'Pipeline Factory', icon: 'ri-git-branch-line', count: `${studio.contentItems.length}` },
    { id: 'voices' as const, label: 'Voix KHEPRA', icon: 'ri-mic-fill', count: `${studio.khepraVoiceProfiles.length}` },
    { id: 'big-four' as const, label: 'Scoring Big Four', icon: 'ri-award-line', count: '6D' },
    { id: 'compliance' as const, label: 'Conformité', icon: 'ri-scales-3-line', count: '5' },
    { id: 'downloads' as const, label: 'Pack Final', icon: 'ri-archive-line', count: `${studio.contentItems.filter((c) => c.status === 'READY').length}` },
    { id: 'editorial' as const, label: 'Structure Big Four', icon: 'ri-layout-5-line', count: '5' },
    { id: 'corrective' as const, label: 'Plan Correctif', icon: 'ri-tools-line', count: `${studio.contentItems.filter((c) => c.correctivePlan).length}` },
    { id: 'queue' as const, label: 'File d\'Attente', icon: 'ri-stack-line', count: `${studio.pendingQueue.length}` },
    { id: 'upload-guide' as const, label: 'Guide Upload', icon: 'ri-guide-line' },
    { id: 'kpi' as const, label: 'KPIs', icon: 'ri-bar-chart-line' },
  ];

  const modeColors = studio.mode === 'MODE_A'
    ? { bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', icon: 'ri-download-cloud-2-line', label: 'MODE A — Téléchargement Manuel' }
    : { bg: '#D1FAE5', border: '#6EE7B7', text: '#065F46', icon: 'ri-rocket-2-line', label: 'MODE B — Publication Automatique' };

  const VIDEO_TYPES = [
    { id: 'analyse', label: 'Analyse', icon: 'ri-bar-chart-2-line' },
    { id: 'formation', label: 'Formation', icon: 'ri-book-open-line' },
    { id: 'podcast', label: 'Podcast', icon: 'ri-headphone-line' },
    { id: 'capsule', label: 'Capsule', icon: 'ri-video-line' },
    { id: 'interview', label: 'Interview', icon: 'ri-user-voice-line' },
    { id: 'reportage', label: 'Reportage', icon: 'ri-news-line' },
  ];

  return (
    <hubLayout hubId={80}>
      <SeoHead
        title="KOS™ Big Four YouTube Hybrid Production Factory 2026 — Standards Institutionnels | KHEPRA EXPERTS"
        description="Production vidéo YouTube Big Four autonome KHEPRA EXPERTS. Scoring 6 dimensions, conformité BCEAO/COBAC/OHADA, 13+ livrables, plan correctif automatique. Standards PwC, Deloitte, EY, KPMG."
        keywords="Big Four YouTube Production, KHEPRA EXPERTS, scoring qualité vidéo, conformité réglementaire BCEAO COBAC OHADA, production vidéo institutionnelle"
        canonicalPath="/kos-youtube-download"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 50%)' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-3 backdrop-blur-sm">
              <i className="ri-building-4-line" />KOS™ Big Four YouTube Hybrid Production Factory 2026
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight">
              Production Média Institutionnelle — Standards PwC · Deloitte · EY · KPMG
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-2 max-w-3xl">
              Chaque sujet → Audience → Voix KHEPRA → Scoring 6D Big Four → 13+ livrables → Package Final. Score &lt; 90/100 = BLOQUÉ avec plan correctif.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: modeColors.bg, color: modeColors.text, border: `1px solid ${modeColors.border}` }}>
                <i className={modeColors.icon} />{modeColors.label}
              </div>
              {studio.mode === 'MODE_A' && (
                <Link to="/youtube-connect" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF0000] text-white text-xs font-bold hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-youtube-fill" />Connecter OAuth
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Auto Publishing Pack Banner — déclenché quand READY ≥ 90 */}
      {studio.autoPackTriggerCount > 0 && (
        <section className="py-2 bg-gradient-to-r from-emerald-500/5 via-emerald-400/10 to-emerald-500/5 border-b border-emerald-200/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-emerald-200/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                <i className="ri-archive-fill text-white text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AUTO PUBLISHING PACK DÉCLENCHÉ
                  </span>
                  <span className="text-sm font-bold text-foreground-950">
                    {studio.autoPackTriggerCount} contenu(s) READY ≥ 90 → Pack de Publication généré
                  </span>
                </div>
                <p className="text-xs text-foreground-500 mt-0.5">
                  Chaque contenu atteignant READY avec score ≥ 90/100 génère automatiquement un pack complet de 10 livrables dans le Video Podcast Publishing Pack.
                </p>
              </div>
              <a
                href="/kos-video-podcast-publishing-pack"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer whitespace-nowrap transition-colors"
              >
                <i className="ri-archive-line" />Voir les Packs
              </a>
            </div>
          </div>
        </section>
      )}

      {/* SSE → Big Four Factory Bridge Banner */}
      {studio.sseReadyCount > 0 && (
        <section className="py-2 bg-gradient-to-r from-red-500/5 via-red-400/10 to-emerald-500/5 border-b border-red-200/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-red-200/50">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                <i className="ri-git-merge-line text-white text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    SSE BIG FOUR CONNECTÉ
                  </span>
                  <span className="text-sm font-bold text-foreground-950">
                    Social Selling Engine → Big Four Factory
                  </span>
                </div>
                <p className="text-xs text-foreground-500 mt-0.5">
                  {studio.sseReadyCount} article(s) approuvé(s) (score ≥ 90/100) automatiquement convertis en scripts vidéo Big Four, avec audience détectée et voix KHEPRA recommandée.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-center">
                  <span className="block text-lg font-bold font-heading text-red-600">{studio.sseReadyCount}</span>
                  <span className="text-[10px] text-foreground-400">Scripts SSE</span>
                </div>
                <button
                  onClick={() => { studio.autoProduceFromSSE(); }}
                  disabled={studio.isProducing}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer whitespace-nowrap disabled:opacity-50 transition-colors"
                >
                  <i className="ri-play-circle-line" />Lancer Production Big Four
                </button>
                <Link
                  to="/kos-linkedin-social-selling-engine"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 text-red-700 text-xs font-bold hover:bg-red-50 cursor-pointer whitespace-nowrap transition-colors"
                >
                  <i className="ri-arrow-right-line" />Voir SSE
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* KPI Strip */}
      <section className="bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2">
            {[
              { label: 'Scripts', value: studio.kpis.totalScriptsProduced, icon: 'ri-file-text-line', color: '#86BC25' },
              { label: 'Vidéos', value: studio.kpis.totalVideosGenerated, icon: 'ri-movie-line', color: '#FF0000' },
              { label: 'READY', value: studio.kpis.totalContentReady, icon: 'ri-checkbox-circle-line', color: '#059669' },
              { label: 'Bloqués', value: studio.kpis.totalBlocked, icon: 'ri-alert-fill', color: '#DC2626' },
              { label: 'Uploadés', value: studio.kpis.totalContentUploaded, icon: 'ri-upload-cloud-line', color: '#C2410C' },
              { label: 'Publiés', value: studio.kpis.totalContentPublished, icon: 'ri-global-line', color: '#86BC25' },
              { label: 'QC Pass', value: `${studio.kpis.qualityPassRate}%`, icon: 'ri-shield-check-line', color: '#D4A853' },
              { label: 'BF Pass', value: `${studio.kpis.bigFourPassRate}%`, icon: 'ri-award-line', color: '#7C3AED' },
              { label: 'Temps Moyen', value: studio.kpis.avgProductionTime, icon: 'ri-timer-line', color: '#6B7280' },
            ].map((k, i) => (
              <div key={i} className="rounded-lg bg-background-50 border border-background-200/70 p-2 text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}15` }}>
                  <i className={`${k.icon} text-[9px]`} style={{ color: k.color }} />
                </div>
                <span className="block text-xs font-bold text-foreground-950">{k.value}</span>
                <span className="text-[8px] text-foreground-400">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />{tab.label}
                {tab.count && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publish Message Toast */}
      {publishMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-bold ${publishMessage.includes('succès') || publishMessage.includes('Publié') ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>
            <i className={publishMessage.includes('succès') || publishMessage.includes('Publié') ? 'ri-check-line' : 'ri-information-line'} />{publishMessage}
          </div>
        </div>
      )}

      {/* ═══════════════ VOIX KHEPRA TAB ═══════════════ */}
      {activeTab === 'voices' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Voix KHEPRA — 3 Profils Officiels Big Four</h2>
              <p className="text-sm text-foreground-500">Les 3 voix signature KHEPRA EXPERTS assignées automatiquement selon le segment d'audience cible.</p>
            </div>

            {/* KHEPRA Official Voices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {studio.khepraVoiceProfiles.map((voice) => (
                <div
                  key={voice.id}
                  className={`rounded-2xl border-2 p-6 cursor-pointer transition-all ${selectedVoiceId === voice.id ? 'border-foreground-950 bg-foreground-950 text-white' : 'border-background-200/70 bg-background-50 hover:border-foreground-300'}`}
                  onClick={() => { setSelectedVoiceId(voice.id); setVoiceAutoSelected(false); }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: selectedVoiceId === voice.id ? 'rgba(255,255,255,0.15)' : `${voice.color}15` }}>
                      <i className={`${voice.icon} text-2xl`} style={{ color: selectedVoiceId === voice.id ? 'white' : voice.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: selectedVoiceId === voice.id ? 'rgba(255,255,255,0.2)' : `${voice.color}20`, color: selectedVoiceId === voice.id ? 'white' : voice.color }}>
                          {voice.gender === 'masculin' ? '♂ Masculin' : '♀ Féminin'}
                        </span>
                      </div>
                      <h3 className={`font-heading text-sm font-bold ${selectedVoiceId === voice.id ? 'text-white' : 'text-foreground-950'}`}>{voice.name}</h3>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed mb-3 ${selectedVoiceId === voice.id ? 'text-white/80' : 'text-foreground-500'}`}>{voice.description}</p>
                  <div className={`text-[10px] mb-2 ${selectedVoiceId === voice.id ? 'text-white/60' : 'text-foreground-400'}`}>
                    <i className="ri-map-pin-line mr-1" />{voice.accent}
                  </div>
                  <div className="text-[10px] italic border-t border-white/10 pt-2 mt-2">
                    <span className={selectedVoiceId === voice.id ? 'text-white/70' : 'text-foreground-400'}>"{voice.sampleText}"</span>
                  </div>
                  {selectedVoiceId === voice.id && (
                    <div className="mt-3 flex items-center gap-1.5 text-white">
                      <i className="ri-check-double-line text-sm" />
                      <span className="text-xs font-bold">Voix sélectionnée</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Audience → Voice Mapping */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Mappage Audience → Voix KHEPRA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {studio.audienceConfigs.slice(0, 10).map((config) => {
                  const voice = studio.khepraVoiceProfiles.find((v) => v.id === config.recommendedVoiceId);
                  return (
                    <div key={config.segment} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-background-200/50">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${config.color}15` }}>
                        <i className={`${config.icon} text-xs`} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground-950 truncate">{config.label}</p>
                        <p className="text-[10px] text-foreground-400 truncate">{voice?.name || config.recommendedVoiceName}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${voice?.color || '#86BC25'}20` }}>
                        <i className={`${voice?.icon || 'ri-mic-fill'} text-[10px]`} style={{ color: voice?.color || '#86BC25' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PIPELINE TAB ═══════════════ */}
      {activeTab === 'pipeline' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quick Create — avec sélecteurs audience et voix */}
            <div className="rounded-2xl bg-background-50 border border-background-200 p-5 mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Nouveau Sujet — Production Big Four</h3>

              {/* Audience Selector */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">
                  <i className="ri-user-line mr-1" />Audience Cible
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {studio.audienceConfigs.map((config) => {
                    const isSelected = selectedAudiences.includes(config.segment);
                    return (
                      <button
                        key={config.segment}
                        onClick={() => toggleAudience(config.segment)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                          isSelected
                            ? 'text-white'
                            : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                        }`}
                        style={isSelected ? { backgroundColor: config.color, borderColor: config.color } : {}}
                      >
                        <i className={`${config.icon} text-[10px]`} />
                        {config.label}
                      </button>
                    );
                  })}
                </div>
                {selectedAudiences.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100">
                      <i className="ri-mic-fill text-emerald-600 text-[10px]" />
                    </div>
                    <span className="text-[10px] text-foreground-500">
                      Voix recommandée : <strong className="text-foreground-800">
                        {studio.allVoiceProfiles.find((v) => v.id === studio.getRecommendedVoice(selectedAudiences))?.name || 'Dr. Célestin Koffi'}
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Type de vidéo */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">
                  <i className="ri-movie-line mr-1" />Type de Vidéo
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {VIDEO_TYPES.map((vt) => (
                    <button
                      key={vt.id}
                      onClick={() => setSelectedVideoType(vt.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                        selectedVideoType === vt.id
                          ? 'bg-foreground-950 text-white'
                          : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                      }`}
                    >
                      <i className={`${vt.icon} text-[10px]`} />
                      {vt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice selector (KHEPRA profiles) */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-xs font-bold text-foreground-500 uppercase tracking-wider">
                    <i className="ri-mic-fill mr-1" />Voix KHEPRA
                  </label>
                  <button
                    onClick={() => {
                      setVoiceAutoSelected(true);
                      if (selectedAudiences.length > 0) {
                        setSelectedVoiceId(studio.getRecommendedVoice(selectedAudiences));
                      }
                    }}
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold cursor-pointer transition-all whitespace-nowrap ${voiceAutoSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}
                  >
                    {voiceAutoSelected ? '✓ Auto' : 'Auto'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {studio.khepraVoiceProfiles.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => { setSelectedVoiceId(voice.id); setVoiceAutoSelected(false); }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-left cursor-pointer transition-all ${
                        selectedVoiceId === voice.id
                          ? 'border-2 bg-foreground-950 text-white'
                          : 'border border-background-200 bg-white hover:border-foreground-200'
                      }`}
                      style={selectedVoiceId === voice.id ? { borderColor: voice.color } : {}}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: selectedVoiceId === voice.id ? `${voice.color}30` : `${voice.color}15` }}>
                        <i className={`${voice.icon} text-sm`} style={{ color: voice.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[10px] font-bold truncate ${selectedVoiceId === voice.id ? 'text-white' : 'text-foreground-900'}`}>{voice.name}</p>
                        <p className={`text-[9px] truncate ${selectedVoiceId === voice.id ? 'text-white/60' : 'text-foreground-400'}`}>{voice.accent}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sujet + boutons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={localTopic} onChange={(e) => setLocalTopic(e.target.value)} placeholder="Sujet... (ex: Réforme ratio solvabilité UEMOA 2026)" className="flex-1 px-4 py-2.5 rounded-xl border border-background-200 bg-white text-sm text-foreground-950 placeholder:text-foreground-300 focus:outline-none focus:border-[#FF0000]/40" />
                <button onClick={handleNewScript} disabled={!localTopic.trim() || studio.isProducing} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                  {studio.isProducing ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Production...</> : <><i className="ri-add-line" />Créer + Voix IA</>}
                </button>
                <button onClick={studio.produceAllPending} disabled={studio.isProducing} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 cursor-pointer whitespace-nowrap disabled:opacity-50" style={{ backgroundColor: '#86BC25' }}>
                  <i className="ri-play-circle-line" />Tout Produire
                </button>
              </div>
              {studio.isProducing && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-xs text-foreground-500 mb-1"><span className="w-3 h-3 border-2 border-foreground-400 border-t-transparent rounded-full animate-spin" />{studio.productionProgress.step} — {studio.productionProgress.percent}%</div>
                  <div className="w-full h-1.5 rounded-full bg-background-200"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${studio.productionProgress.percent}%` }} /></div>
                </div>
              )}
            </div>

            {/* Content List */}
            <div className="space-y-3">
              {studio.contentItems.map((content) => {
                const isExpanded = expandedContent === content.contentId;
                const isBlocked = content.status === 'BLOCKED';
                const isSSE = (content as Record<string, unknown>).sseGenerated === true;
                const sseScore = (content as Record<string, unknown>).sseGlobalScore as number | undefined;
                const recVoiceName = (content as Record<string, unknown>).recommendedVoiceName as string | undefined;

                return (
                  <div key={content.contentId} className={`rounded-2xl border transition-all bg-background-50 ${isSSE ? 'border-red-200/70 bg-red-50/20 hover:border-red-300' : isBlocked ? 'border-red-300 bg-red-50/30' : isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedContent(isExpanded ? null : content.contentId)} className="w-full p-4 text-left flex items-start gap-3 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STAGE_COLORS[content.stage] || '#6B7280'}15` }}>
                        <i className={`${STAGE_ICONS[content.stage] || 'ri-question-line'} text-lg`} style={{ color: STAGE_COLORS[content.stage] || '#6B7280' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          {isSSE && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold whitespace-nowrap">
                              <i className="ri-shield-check-line text-[9px]" />
                              SSE BIG FOUR{sseScore ? ` ${sseScore}/100` : ' 90+'}
                            </span>
                          )}
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[content.stage] || '#6B7280'}15`, color: STAGE_COLORS[content.stage] || '#6B7280' }}>
                            {STAGE_LABELS[content.stage] || content.stage}
                          </span>
                          {isBlocked && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">BLOQUÉ &lt; 90</span>}
                          {(content.bigFourScore?.passed) && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Big Four ✓</span>}
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{content.script?.title || content.topic}</h3>
                        <div className="flex items-center gap-2 mt-1 text-[9px] text-foreground-400 flex-wrap">
                          <span><i className="ri-time-line mr-1" />{content.script?.estimatedDuration || '—'}</span>
                          <span><i className="ri-movie-line mr-1" />{content.videoType}</span>
                          {content.audienceSegments.length > 0 && (
                            <span className="text-foreground-500"><i className="ri-user-line mr-1" />{content.audienceSegments.slice(0, 2).map((s) => s.replace(/_/g, ' ')).join(', ')}</span>
                          )}
                          {recVoiceName && (
                            <span className="text-foreground-500"><i className="ri-mic-fill mr-1" />{recVoiceName.split(' — ')[0]}</span>
                          )}
                          {content.bigFourScore && (
                            <span className="font-bold" style={{ color: content.bigFourScore.passed ? '#059669' : '#DC2626' }}>BF: {content.bigFourScore.global}/100</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] text-foreground-400">{content.priority === 'critical' ? '🔴 P0' : content.priority === 'high' ? '🟠 P1' : '🟡 P2'}</span>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 space-y-4">
                        {/* SSE Info */}
                        {isSSE && (
                          <div className="rounded-xl bg-red-50 border border-red-200 p-3">
                            <div className="flex items-center gap-2 mb-1.5">
                              <i className="ri-shield-check-line text-red-600 text-sm" />
                              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Script généré depuis le Social Selling Engine</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
                              {sseScore && <div><span className="text-foreground-400">Score SSE</span><p className="font-bold text-emerald-600">{sseScore}/100</p></div>}
                              {recVoiceName && <div><span className="text-foreground-400">Voix recommandée</span><p className="font-bold text-foreground-700 truncate">{recVoiceName}</p></div>}
                              {content.audienceSegments.length > 0 && <div><span className="text-foreground-400">Audiences</span><p className="font-bold text-foreground-700">{content.audienceSegments.map((s) => s.replace(/_/g, ' ')).join(', ')}</p></div>}
                            </div>
                          </div>
                        )}

                        {/* Voice Info */}
                        {recVoiceName && !content.voice && (
                          <div className="rounded-xl bg-background-100 p-3">
                            <div className="flex items-center gap-2">
                              <i className="ri-mic-fill text-[#86BC25] text-sm" />
                              <span className="text-[10px] font-bold text-foreground-700">Voix recommandée : {recVoiceName}</span>
                              <button
                                onClick={() => { studio.generateVoice(content.contentId, recVoiceName); }}
                                disabled={studio.isProducing}
                                className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#86BC25] text-white text-[10px] font-bold cursor-pointer whitespace-nowrap disabled:opacity-50"
                              >
                                <i className="ri-play-fill" />Générer Voix
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-1.5">
                          {(!content.script || content.stage === 'TOPIC_DEFINED') && (
                            <button onClick={() => { studio.generateScript(content.topic, content.videoType, content.audience, content.audienceSegments); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#86BC25] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-magic-line" />Script Maître
                            </button>
                          )}
                          {content.stage === 'SCRIPT_MASTER_GENERATED' && (
                            <button onClick={() => {
                              const voiceName = recVoiceName || studio.allVoiceProfiles.find((v) => v.id === 'vp-celestin-koffi')?.name || 'Dr. Célestin Koffi — Expert Institutionnel';
                              studio.generateVoice(content.contentId, voiceName);
                            }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#CA8A04] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-mic-line" />Voix IA
                            </button>
                          )}
                          {['VOICE_GENERATED', 'VOICE_VALIDATED'].includes(content.stage) && (
                            <button onClick={() => { studio.generateThumbnail(content.contentId, 'big-four-expert'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4A853] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-image-line" />Miniature
                            </button>
                          )}
                          {['THUMBNAIL_GENERATED', 'THUMBNAIL_VALIDATED'].includes(content.stage) && (
                            <button onClick={() => { studio.assembleVideo(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF0000] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-movie-line" />Vidéo 1080p
                            </button>
                          )}
                          {['VIDEO_ASSEMBLED', 'VIDEO_VALIDATED'].includes(content.stage) && (
                            <button onClick={() => { studio.generateMetadata(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-search-eye-line" />Métadonnées
                            </button>
                          )}
                          {content.stage === 'METADATA_GENERATED' && (
                            <button onClick={() => { studio.runComplianceCheck(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-scales-3-line" />Conformité
                            </button>
                          )}
                          {['METADATA_GENERATED', 'COMPLIANCE_CHECKED', 'VIDEO_ASSEMBLED'].includes(content.stage) && (
                            <button onClick={() => { studio.generateFullPackage(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                              <i className="ri-archive-line" />Package Final
                            </button>
                          )}
                          <button onClick={() => { studio.runBigFourScore(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                            <i className="ri-award-line" />Score BF
                          </button>
                          {isBlocked && (
                            <button onClick={() => { studio.retryBlockedContent(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold cursor-pointer whitespace-nowrap animate-pulse">
                              <i className="ri-restart-line" />Débloquer
                            </button>
                          )}
                          {content.status === 'READY' && (
                            <>
                              <button onClick={() => { handlePublish(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                                <i className="ri-upload-cloud-line" />Publier
                              </button>
                              <button onClick={() => { studio.downloadAllFiles(content.contentId); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-foreground-950 text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                                <i className="ri-download-cloud-2-line" />Tout Télécharger
                              </button>
                            </>
                          )}
                        </div>

                        {/* Big Four Score Mini */}
                        {content.bigFourScore && (
                          <div className="rounded-xl bg-background-100 p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <i className="ri-award-line text-sm text-foreground-700" />
                              <span className="text-[10px] font-bold text-foreground-700 uppercase tracking-wider">Scoring Big Four — {content.bigFourScore.global}/100 {content.bigFourScore.passed ? '✅' : '❌'}</span>
                            </div>
                            <div className="flex flex-wrap gap-3 justify-center">
                              {[content.bigFourScore.editorial, content.bigFourScore.technique, content.bigFourScore.seo, content.bigFourScore.conformite, content.bigFourScore.branding, content.bigFourScore.impactCommercial, content.bigFourScore.autoriteMetier].map((dim) => (
                                <BigFourGauge key={dim.dimension} score={dim.score} maxScore={dim.maxScore} label={dim.label} color={dim.color} icon={dim.icon} passed={dim.passed} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Editorial Structure Preview */}
                        {content.editorialStructure.length > 0 && (
                          <div>
                            <h4 className="text-[9px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Structure Éditoriale</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {content.editorialStructure.map((block) => (
                                <span key={block.section} className="text-[9px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${block.color}15`, color: block.color }}>
                                  <i className={`${block.icon} mr-1 text-[9px]`} />{block.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Downloads Mini */}
                        <div>
                          <h4 className="text-[9px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Livrables — {content.downloads.filter((d) => d.ready).length}/{content.downloads.length} prêts</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                            {content.downloads.filter((d) => d.ready).slice(0, 8).map((dl) => (
                              <button key={dl.fileId} onClick={() => { studio.downloadFile(content.contentId, dl.fileId); }} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold cursor-pointer whitespace-nowrap hover:bg-emerald-100">
                                <i className={`${dl.icon} text-[10px]`} />{dl.label.split('_')[1]?.split(' ').slice(0, 2).join(' ') || dl.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ BIG FOUR SCORING TAB ═══════════════ */}
      {activeTab === 'big-four' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Scoring Big Four — 6 Dimensions + Score Global</h2>
              <p className="text-sm text-foreground-500">Chaque vidéo est évaluée sur 6 dimensions critiques. Score global &lt; 90/100 = BLOQUÉ automatiquement.</p>
            </div>

            {studio.contentItems.filter((c) => c.bigFourScore).map((content) => {
              const bf = content.bigFourScore!;
              if (!bf) return null;
              const dims = [bf.editorial, bf.technique, bf.seo, bf.conformite, bf.branding, bf.impactCommercial, bf.autoriteMetier];
              const isBlocked = !bf.passed;
              return (
                <div key={content.contentId} className={`rounded-2xl border p-6 mb-4 ${isBlocked ? 'border-red-300 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{content.script?.title || content.topic}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] text-foreground-400">{content.script?.estimatedDuration} · {content.videoType}</span>
                        {content.audienceSegments.length > 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">
                            {content.audienceSegments.slice(0, 2).map((s) => s.replace(/_/g, ' ')).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-3xl font-heading font-bold ${bf.passed ? 'text-emerald-600' : 'text-red-600'}`}>{bf.global}</div>
                        <div className="text-[9px] text-foreground-400">/100</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${bf.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {bf.passed ? '✅ AUTORISÉ' : '❌ BLOQUÉ < 90'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center mb-5">
                    {dims.map((dim) => (
                      <div key={dim.dimension} className="flex flex-col items-center gap-1.5">
                        <div className="relative w-[80px] h-[80px] flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--background-200)" strokeWidth="6" />
                            <circle cx="40" cy="40" r="32" fill="none" stroke={dim.color} strokeWidth="6" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 - (dim.score / dim.maxScore) * 2 * Math.PI * 32} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold" style={{ color: dim.color }}>{dim.score}</span>
                            <span className="text-[8px] text-foreground-400">/100</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className={`${dim.icon} text-[10px]`} style={{ color: dim.color }} />
                          <span className="text-[10px] font-bold text-foreground-600 text-center leading-tight max-w-[80px]">{dim.label}</span>
                        </div>
                        {!dim.passed && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">ÉCHEC</span>}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dims.map((dim) => (
                      <div key={dim.dimension} className="rounded-lg bg-background-100 p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <i className={`${dim.icon} text-xs`} style={{ color: dim.color }} />
                          <span className="text-[10px] font-bold text-foreground-800">{dim.label}</span>
                          <span className={`ml-auto text-xs font-bold ${dim.passed ? 'text-emerald-600' : 'text-red-600'}`}>{dim.score}/100</span>
                        </div>
                        {dim.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[9px] text-emerald-700"><i className="ri-check-line text-emerald-500 mt-0.5 text-[10px]" />{d}</div>
                        ))}
                        {dim.issues.map((iss, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[9px] text-red-600"><i className="ri-close-line text-red-500 mt-0.5 text-[10px]" />{iss}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {studio.contentItems.filter((c) => c.bigFourScore).length === 0 && (
              <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-background-200 flex items-center justify-center mb-4"><i className="ri-award-line text-3xl text-foreground-400" /></div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun scoring Big Four effectué</h3>
                <p className="text-sm text-foreground-500">Lancez un scoring Big Four depuis l&apos;onglet Pipeline.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ COMPLIANCE TAB ═══════════════ */}
      {activeTab === 'compliance' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Conformité Réglementaire — BCEAO · COBAC · OHADA · UEMOA · CEMAC</h2>
              <p className="text-sm text-foreground-500">Chaque contenu est vérifié contre 5 cadres réglementaires + copyright. Aucune affirmation non sourcée autorisée.</p>
            </div>

            {studio.contentItems.filter((c) => c.complianceChecks.length > 0).map((content) => (
              <div key={content.contentId} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 mb-4">
                <h3 className="text-sm font-bold text-foreground-950 mb-4">{content.script?.title || content.topic}</h3>
                <div className="space-y-2">
                  {content.complianceChecks.map((check: RegulatoryComplianceCheck) => (
                    <div key={check.checkId} className="flex items-start gap-3 p-3 rounded-lg bg-background-100">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${check.passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        <i className={`${check.passed ? 'ri-check-line text-emerald-600' : 'ri-close-line text-red-600'} text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground-800">{check.label}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500 font-bold">{check.regulator}</span>
                        </div>
                        <p className="text-[10px] text-foreground-500 mt-0.5">{check.detail}</p>
                        <p className="text-[9px] text-foreground-400 mt-0.5">Réf: {check.reference}</p>
                      </div>
                      <span className={`text-xs font-bold flex-shrink-0 ${check.passed ? 'text-emerald-600' : 'text-red-600'}`}>{check.score}/{check.maxScore}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { studio.runComplianceCheck(content.contentId); }} className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white text-xs font-bold cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line" />Relancer Vérification
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ EDITORIAL TAB ═══════════════ */}
      {activeTab === 'editorial' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Structure Éditoriale Big Four — Adaptée par Audience</h2>
              <p className="text-sm text-foreground-500">Chaque vidéo suit la structure Big Four : Introduction → Contexte → Analyse → Recommandations → Conclusion. Le contenu de chaque section est adapté au segment d&apos;audience sélectionné.</p>
            </div>

            {studio.contentItems.filter((c) => c.editorialStructure.length > 0).map((content) => {
              const isSSE = (content as Record<string, unknown>).sseGenerated === true;
              return (
                <div key={content.contentId} className={`rounded-2xl border p-5 mb-4 ${isSSE ? 'border-red-200/70 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{content.script?.title || content.topic}</h3>
                      {content.audienceSegments.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {content.audienceSegments.map((seg) => {
                            const config = studio.audienceConfigs.find((c) => c.segment === seg);
                            return config ? (
                              <span key={seg} className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
                                <i className={`${config.icon} mr-0.5 text-[9px]`} />{config.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    {isSSE && (
                      <span className="text-[9px] px-2 py-1 rounded-full bg-red-600 text-white font-bold whitespace-nowrap">SSE BIG FOUR</span>
                    )}
                  </div>
                  <div className="space-y-0">
                    {content.editorialStructure.map((block: EditorialBlock, idx: number) => (
                      <div key={block.section} className="flex gap-3">
                        <div className="flex flex-col items-center flex-shrink-0 pt-2">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: block.color }}>
                            <i className={block.icon} />
                          </div>
                          {idx < content.editorialStructure.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ backgroundColor: block.color, opacity: 0.3 }} />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xs font-bold text-foreground-950">{block.title}</h4>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{block.duration}</span>
                          </div>
                          <p className="text-[10px] text-foreground-500 mb-1">{block.content}</p>
                          <div className="flex flex-wrap gap-1">
                            {block.keywordsCovered.map((kw) => (
                              <span key={kw} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-400">{kw}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════ CORRECTIVE TAB ═══════════════ */}
      {activeTab === 'corrective' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Plan Correctif — Contenus Bloqués (Score &lt; 90/100)</h2>
              <p className="text-sm text-foreground-500">Chaque contenu bloqué reçoit un plan d&apos;actions correctives.</p>
            </div>

            {studio.contentItems.filter((c) => c.correctivePlan).map((content) => {
              const plan = content.correctivePlan!;
              return (
                <div key={content.contentId} className="rounded-2xl border border-red-300 bg-red-50/20 p-5 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{content.script?.title || content.topic}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">Score: {plan.blockedScore}/100</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Cible: {plan.targetScore}/100</span>
                        <span className="text-[10px] text-foreground-400">· {plan.fixedActions}/{plan.totalActions} corrigées</span>
                        <span className="text-[10px] text-foreground-400">· ETA: {plan.estimatedTotalTime}</span>
                      </div>
                    </div>
                    <button onClick={() => { studio.retryBlockedContent(content.contentId); }} disabled={studio.isProducing} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 cursor-pointer whitespace-nowrap disabled:opacity-50">
                      <i className="ri-play-line" />Appliquer TOUT
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {plan.actions.map((action: CorrectiveAction) => (
                      <div key={action.actionId} className={`flex items-start gap-3 p-2.5 rounded-lg ${action.fixed ? 'bg-emerald-50 border border-emerald-200' : 'bg-white border border-background-200'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${action.fixed ? 'bg-emerald-100' : 'bg-red-100'}`}>
                          <i className={`${action.fixed ? 'ri-check-line text-emerald-600' : 'ri-close-line text-red-600'} text-xs`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${action.priority === 'critical' ? 'bg-red-100 text-red-700' : action.priority === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'}`}>{action.priority}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{action.category}</span>
                            {action.autoFixable && <span className="text-[8px] px-1 py-0.5 rounded-full bg-emerald-100 text-emerald-600">Auto</span>}
                          </div>
                          <p className="text-[10px] font-bold text-foreground-800 mt-1">{action.issue}</p>
                          <p className="text-[9px] text-foreground-500">→ {action.remedy}</p>
                          <span className="text-[8px] text-foreground-400">⏱ {action.estimatedTime}</span>
                        </div>
                        {!action.fixed && (
                          <button onClick={() => { studio.applyCorrectiveAction(content.contentId, action.actionId); }} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-foreground-950 text-white text-[10px] font-bold cursor-pointer whitespace-nowrap hover:bg-foreground-800">
                            <i className="ri-play-fill" />Corriger
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {studio.contentItems.filter((c) => c.correctivePlan).length === 0 && (
              <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center mb-4"><i className="ri-check-double-line text-3xl text-emerald-500" /></div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun contenu bloqué</h3>
                <p className="text-sm text-foreground-500">Tous les contenus ont un score Big Four ≥ 90/100.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ DOWNLOADS TAB ═══════════════ */}
      {activeTab === 'downloads' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Package Final — 18 Livrables par Vidéo</h2>
              <p className="text-sm text-foreground-500">Core · Audio · Visuel · Métadonnées · Social · Conformité.</p>
            </div>

            {studio.contentItems.filter((c) => c.status === 'READY' || c.downloads.some((d) => d.ready)).map((content) => {
              const byCategory = content.downloads.reduce((acc: Record<string, DownloadFile[]>, dl) => {
                if (!acc[dl.category]) acc[dl.category] = [];
                acc[dl.category].push(dl);
                return acc;
              }, {});
              return (
                <div key={content.contentId} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{content.script?.title || content.topic}</h3>
                      <div className="flex items-center gap-2 text-[9px] text-foreground-400">
                        <span>{content.script?.estimatedDuration}</span>
                        <span>·</span>
                        <span>{content.downloads.filter((d) => d.ready).length}/{content.downloads.length} prêts</span>
                        {content.bigFourScore && <span>· <span style={{ color: content.bigFourScore.passed ? '#059669' : '#DC2626' }}>BF: {content.bigFourScore.global}/100</span></span>}
                      </div>
                    </div>
                    <button onClick={() => { studio.downloadAllFiles(content.contentId); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 cursor-pointer whitespace-nowrap">
                      <i className="ri-download-cloud-2-line" />Tout Télécharger
                    </button>
                  </div>

                  {Object.entries(byCategory).map(([cat, files]) => (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <i className={`${DELIVERABLE_CATEGORY_ICONS[cat] || 'ri-file-line'} text-[10px] text-foreground-500`} />
                        <span className="text-[9px] font-bold text-foreground-500 uppercase tracking-wider">{DELIVERABLE_CATEGORY_LABELS[cat] || cat}</span>
                        <span className="text-[8px] text-foreground-400">({files.filter((f: DownloadFile) => f.ready).length}/{files.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                        {files.map((dl: DownloadFile) => (
                          <button key={dl.fileId} onClick={() => { dl.ready && studio.downloadFile(content.contentId, dl.fileId); }} disabled={!dl.ready}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${dl.ready ? 'border border-emerald-200 bg-emerald-50 hover:bg-emerald-100' : 'border border-background-200 bg-background-50 cursor-not-allowed opacity-50'}`}>
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${dl.ready ? 'bg-emerald-500/15' : 'bg-background-200'}`}>
                              <i className={`${dl.icon} text-xs ${dl.ready ? 'text-emerald-600' : 'text-foreground-300'}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-foreground-800 truncate">{dl.label}</p>
                              <p className="text-[8px] text-foreground-400">{dl.ready ? formatBytes(dl.sizeBytes) : 'En attente'} · .{dl.format}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════ QUEUE TAB ═══════════════ */}
      {activeTab === 'queue' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">File d&apos;Attente</h2>
              <p className="text-sm text-foreground-500">{studio.pendingQueue.length} contenus — {studio.pendingQueue.filter((q) => q.status === 'READY').length} prêts</p>
            </div>
            <div className="space-y-3">
              {studio.pendingQueue.map((item: PendingQueueItem) => (
                <div key={item.queueId} className={`rounded-2xl border p-4 flex items-center gap-3 ${item.status === 'BLOCKED' ? 'border-red-300 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STAGE_COLORS[item.stage] || '#6B7280'}15` }}>
                    <i className={`${STAGE_ICONS[item.stage] || 'ri-question-line'} text-lg`} style={{ color: STAGE_COLORS[item.stage] || '#6B7280' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[item.stage] || '#6B7280'}15`, color: STAGE_COLORS[item.stage] || '#6B7280' }}>
                        {STAGE_LABELS[item.stage] || item.stage}
                      </span>
                      {item.status === 'BLOCKED' && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">BLOQUÉ</span>}
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[9px] text-foreground-400">
                      <span>{item.downloadsReady}/{item.totalDownloads}</span>
                      <span>ETA: {item.etaToReady}</span>
                    </div>
                  </div>
                  <button onClick={() => { studio.selectContent(item.contentId); setActiveTab('pipeline'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-foreground-950 text-white text-[10px] font-bold cursor-pointer whitespace-nowrap">
                    <i className="ri-arrow-right-line" />Voir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ UPLOAD GUIDE TAB ═══════════════ */}
      {activeTab === 'upload-guide' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Guide d&apos;Upload Manuel YouTube — 11 Étapes</h2>
            </div>
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="space-y-4">
                {studio.uploadChecklist.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-foreground-950 text-white flex items-center justify-center text-xs font-bold">{step.step}</div>
                      {step.step < 11 && <div className="w-0.5 flex-1 bg-background-200 my-1" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <i className={`${step.icon} text-foreground-700 text-sm`} />
                        <h3 className="text-xs font-bold text-foreground-950">{step.title}</h3>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-400">{step.category}</span>
                      </div>
                      <p className="text-[10px] text-foreground-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ KPI TAB ═══════════════ */}
      {activeTab === 'kpi' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs — Big Four Production Factory</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Scripts Produits', value: studio.kpis.totalScriptsProduced, target: '∞', icon: 'ri-file-text-line', color: '#86BC25' },
                { label: 'Vidéos Générées', value: studio.kpis.totalVideosGenerated, target: '∞', icon: 'ri-movie-line', color: '#FF0000' },
                { label: 'Contenus READY', value: studio.kpis.totalContentReady, target: '∞', icon: 'ri-checkbox-circle-line', color: '#059669' },
                { label: 'Contenus Bloqués', value: studio.kpis.totalBlocked, target: '0', icon: 'ri-alert-fill', color: '#DC2626' },
                { label: 'Contenus Publiés', value: studio.kpis.totalContentPublished, target: '∞', icon: 'ri-global-line', color: '#86BC25' },
                { label: 'Temps Moyen', value: studio.kpis.avgProductionTime, target: '< 3h', icon: 'ri-timer-line', color: '#6B7280' },
                { label: 'Taux Réussite QC', value: `${studio.kpis.successRate}%`, target: '≥ 95%', icon: 'ri-check-double-line', color: '#0A66C2' },
                { label: 'Taux Big Four Pass', value: `${studio.kpis.bigFourPassRate}%`, target: '100%', icon: 'ri-award-line', color: '#7C3AED' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <i className={`${kpi.icon} text-lg`} style={{ color: kpi.color }} />
                    </div>
                    <div>
                      <span className="text-[9px] text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                      <p className="font-heading text-2xl font-bold text-foreground-950">{kpi.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-foreground-400">Objectif</span>
                    <span className="font-bold text-foreground-600">{kpi.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-10 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div>
              <h2 className="font-heading text-xl font-bold text-white mb-2">KOS™ Big Four YouTube Production Factory</h2>
              <p className="text-gray-400 text-sm">Voix KHEPRA : Célestin Koffi · Fatoumata Diallo · Aminata Sow. Standards PwC · Deloitte · EY · KPMG.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/kos-voice-ai-studio" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#86BC25] text-white font-bold text-sm hover:opacity-90 cursor-pointer whitespace-nowrap">
                <i className="ri-mic-fill" />Voice AI Studio
              </Link>
              <Link to="/kos-video-podcast-publishing-pack" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-archive-line" />Publishing Pack
              </Link>
              <Link to="/kos-youtube-production-pipeline" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-git-branch-line" />Production Pipeline
              </Link>
              <Link to="/kos-linkedin-social-selling-engine" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 cursor-pointer whitespace-nowrap">
                <i className="ri-shield-check-line" />Social Selling Engine
              </Link>
              <Link to="/kos-audience-dashboard" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-group-2-line" />Gestion Audiences
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





