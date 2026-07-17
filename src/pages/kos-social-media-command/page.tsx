import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useSocialAutomation } from '@/hooks/useSocialAutomation';
import { useLinkedInShare, LINKEDIN_COMPANY_PAGE, LINKEDIN_ADMIN_POSTS, LINKEDIN_COMPANY_HANDLE } from '@/hooks/useLinkedInShare';
import { SOCIAL_PLATFORM_STATS, WEEKLY_SCHEDULE_TEMPLATE, type SocialQueueItem } from '@/mocks/socialAutomationQueue';
import { MOCK_MULTILINGUAL_SOCIAL_QUEUE, MOCK_MULTILINGUAL_STATS } from '@/mocks/socialMediaLocalLanguages';
import SocialAutomationPaceDashboard from './components/SocialAutomationPaceDashboard';
import SocialUrlHealthPanel from './components/SocialUrlHealthPanel';
import SocialQualityPanel from './components/SocialQualityPanel';
import IntelligentOrchestratorPanel from './components/IntelligentOrchestratorPanel';
import KOSTotalSystemScanPanel from './components/KOSTotalSystemScanPanel';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import { Link, useSearchParams } from 'react-router-dom';
import GeneratePostPanel from './components/GeneratePostPanel';
import MetaContentPanel from './components/MetaContentPanel';

const PLATFORM_COLORS: Record<string, { bg: string; text: string; border: string; fill: string }> = {
  linkedin: { bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]', border: 'border-[#0A66C2]/20', fill: '#0A66C2' },
  x: { bg: 'bg-[#1A1A1A]/10', text: 'text-[#1A1A1A]', border: 'border-[#1A1A1A]/20', fill: '#1A1A1A' },
  youtube: { bg: 'bg-[#FF0000]/10', text: 'text-[#FF0000]', border: 'border-[#FF0000]/20', fill: '#FF0000' },
  facebook: { bg: 'bg-[#1877F2]/10', text: 'text-[#1877F2]', border: 'border-[#1877F2]/20', fill: '#1877F2' },
  instagram: { bg: 'bg-[#E1306C]/10', text: 'text-[#E1306C]', border: 'border-[#E1306C]/20', fill: '#E1306C' },
};

const STATUS_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Brouillon' },
  scheduled: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Programmé' },
  published: { bg: 'bg-secondary-50', text: 'text-secondary-900', label: 'Publié' },
  archived: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Archivé' },
};

const ENGAGEMENT_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Engagement Élevé' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Engagement Moyen' },
  low: { bg: 'bg-red-50', text: 'text-red-700', label: 'Engagement Faible' },
};

function formatDate(iso: string | null): string {
  if (!iso) return 'Non programmé';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function copyToClipboard(text: string, cb: () => void) {
  navigator.clipboard.writeText(text).then(cb);
}

export default function KOSSocialMediaCommandPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [searchParams] = useSearchParams();
  const { queue, stats, source, loading } = useSocialAutomation();
  const { shareToLinkedIn, openAdminPosts, openCompanyPage, copyLinkedInPostText, LINKEDIN_COMPANY_PAGE, LINKEDIN_ADMIN_POSTS } = useLinkedInShare();
  const [activeTab, setActiveTab] = useState<'queue' | 'calendar' | 'platforms' | 'pace' | 'url-health' | 'qualite' | 'orchestrator' | 'scan-total' | 'generate' | 'multilingual' | 'meta'>('queue');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [queueFilter, setQueueFilter] = useState<'all' | 'program-linkedin' | 'auto-generated' | 'x-auto' | 'sse'>('all');

  // Auto-select SSE filter if navigated from Social Selling Engine
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'sse') {
      setQueueFilter('sse');
      setActiveTab('queue');
    }
  }, [searchParams]);

  const scheduledPosts = useMemo(() => {
    let filtered = queue;
    if (queueFilter === 'program-linkedin') {
      filtered = queue.filter(p => p.template_id === 'LI-LEADMAGNET-2026-S26');
    } else if (queueFilter === 'auto-generated') {
      filtered = queue.filter(p => p.metadata?.auto_generated === true);
    } else if (queueFilter === 'x-auto') {
      filtered = queue.filter(p => p.platform === 'x' && p.metadata?.auto_generated === true);
    } else if (queueFilter === 'sse') {
      filtered = queue.filter(p => p.metadata?.source === 'kos-linkedin-social-selling-engine' || p.metadata?.sse_approved === true);
    }
    return filtered.filter(p => p.status === 'scheduled').sort((a, b) =>
      (a.scheduled_for || '').localeCompare(b.scheduled_for || '')
    );
  }, [queue, queueFilter]);

  const draftPosts = useMemo(() => {
    let filtered = queue;
    if (queueFilter === 'program-linkedin') {
      filtered = queue.filter(p => p.template_id === 'LI-LEADMAGNET-2026-S26');
    } else if (queueFilter === 'auto-generated') {
      filtered = queue.filter(p => p.metadata?.auto_generated === true);
    } else if (queueFilter === 'x-auto') {
      filtered = queue.filter(p => p.platform === 'x' && p.metadata?.auto_generated === true);
    } else if (queueFilter === 'sse') {
      filtered = queue.filter(p => p.metadata?.source === 'kos-linkedin-social-selling-engine' || p.metadata?.sse_approved === true);
    }
    return filtered.filter(p => p.status === 'draft');
  }, [queue, queueFilter]);

  const handleCopy = useCallback((post: SocialQueueItem) => {
    copyToClipboard(post.content, () => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  }, []);

  const handleShareX = useCallback((post: SocialQueueItem) => {
    const text = encodeURIComponent(post.content.substring(0, 240));
    const baseUrl = post.source_url || 'https://khepraexperts.com';
    const ogUrl = getOgPreviewUrl(baseUrl);
    const xUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(ogUrl)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  }, []);

  return (
    <KOSHubLayout hubId={28}>
      <SeoHead
        title="KOS Social Media Command™ — Automatisation Réseaux Sociaux | KHEPRA EXPERTS"
        description="Hub de commandement réseaux sociaux automatisé : génération IA de posts LinkedIn/X/YouTube, planification, file d'attente, copy 1-clic. 6 posts/semaine LinkedIn. KOS Content Generator. Zéro effort manuel."
        keywords="KOS Social Media Command, automatisation réseaux sociaux, LinkedIn automation, social media management, KHEPRA EXPERTS"
        canonicalPath="/kos-social-media-command"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                  <i className="ri-share-line"></i>KOS Social Media Command™
                </div>
                <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                  Visibilité Réseaux Sociaux — 100% Automatisée par KOS
                </h1>
                <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                  Génération IA de posts LinkedIn depuis les articles KHEPRA. Planification hebdomadaire automatique. Copy 1-clic. Zéro effort manuel.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    to="/kos-multichannel-command"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-radar-line" />
                    Multichannel Command
                  </Link>
                  <Link
                    to="/kos-social-media-board"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-950 text-background-50 text-xs font-bold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-dashboard-line" />
                    Board
                  </Link>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                    {stats.scheduled} posts programmés
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold">
                    {stats.draft} brouillons
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    {stats.this_week} cette semaine
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Distribution Program Banner */}
          <div className="border-t border-background-200/70 mt-8 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to="/kos-linkedin-distribution-program"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-download-2-line text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold mb-1">LI-LEADMAGNET-2026-S26</span>
                  <h3 className="font-bold text-foreground-950 text-sm">Programme Lead Magnets LinkedIn — 8 Ressources Gratuites Ultra-Conversion</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">17 posts pré-formatés · 3 phases · 23 juin → 5 juillet 2026 · Guides, Checklists, Diagnostics, Simulations</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 mr-2">
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">17</span>
                    <span className="text-[10px] text-foreground-400">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">46.3K</span>
                    <span className="text-[10px] text-foreground-400">Reach Est.</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-amber-600">5.1%</span>
                    <span className="text-[10px] text-foreground-400">Eng. Rate</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap group-hover:bg-emerald-700 transition-colors">
                  <span>Voir le programme</span>
                  <i className="ri-arrow-right-line" />
                </div>
              </Link>
            </div>
          </div>

          {/* YouTube Channel Connected Banner */}
          <div className="border-t border-background-200/70 mt-4 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#FF0000]/10 to-[#FF0000]/5 border border-[#FF0000]/20">
                <div className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center flex-shrink-0">
                  <i className="ri-youtube-fill text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FF0000]/15 text-[#FF0000] text-[10px] font-bold mb-1">YOUTUBE CONNECTÉ</span>
                  <h3 className="font-bold text-foreground-950 text-sm">Chaîne @KHEPRAEXPERTS — Publication Automatique via OAuth 2.0</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">Génération de scripts vidéo · Descriptions optimisées SEO · Tags automatiques · Miniatures briefées · Publication API v3</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 mr-2">
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-[#FF0000]">4</span>
                    <span className="text-[10px] text-foreground-400">Vidéos/sem</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">1,2K</span>
                    <span className="text-[10px] text-foreground-400">Abonnés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-amber-600">3.1%</span>
                    <span className="text-[10px] text-foreground-400">Eng. Rate</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/youtube-connect"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0000] text-white text-sm font-bold whitespace-nowrap hover:bg-[#CC0000] transition-colors cursor-pointer"
                  >
                    <span>Publier sur YouTube</span>
                    <i className="ri-upload-cloud-line" />
                  </Link>
                  <a
                    href="https://www.youtube.com/@KHEPRAEXPERTS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF0000]/20 text-[#FF0000] text-sm font-bold whitespace-nowrap hover:bg-[#FF0000]/5 transition-colors cursor-pointer"
                  >
                    <span>Chaîne</span>
                    <i className="ri-external-link-line" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Company Page — Rattachement */}
          <div className="border-t border-background-200/70 mt-4 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#0A66C2]/10 to-[#0A66C2]/5 border border-[#0A66C2]/20">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
                  <i className="ri-linkedin-fill text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0A66C2]/15 text-[#0A66C2] text-[10px] font-bold mb-1">PAGE ENTREPRISE RATTACHÉE</span>
                  <h3 className="font-bold text-foreground-950 text-sm">Tous les partages LinkedIn sont rattachés à linkedin.com/company/{LINKEDIN_COMPANY_HANDLE}/</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">Chaque bouton Partager LinkedIn génère le hook de partage correct avec URL OG preview + hashtags optimisés pour la page entreprise KHEPRA EXPERTS</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openCompanyPage}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-bold whitespace-nowrap hover:bg-[#004182] transition-colors cursor-pointer"
                  >
                    <span>Page Entreprise</span>
                    <i className="ri-external-link-line" />
                  </button>
                  <button
                    onClick={openAdminPosts}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0A66C2]/20 text-[#0A66C2] text-sm font-bold whitespace-nowrap hover:bg-[#0A66C2]/5 transition-colors cursor-pointer"
                  >
                    <span>Posts Publiés</span>
                    <i className="ri-external-link-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Facebook Page Banner */}
          <div className="border-t border-background-200/70 mt-4 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#1877F2]/10 to-[#1877F2]/5 border border-[#1877F2]/20">
                <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                  <i className="ri-facebook-fill text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1877F2]/15 text-[#1877F2] text-[10px] font-bold mb-1">PAGE FACEBOOK CONNECTÉE</span>
                  <h3 className="font-bold text-foreground-950 text-sm">KHEPRA EXPERTS — Page Facebook — Publication Automatique Activée</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">3 420 abonnés · 5 posts/semaine · Contenus réglementaires, formations, actualités BCEAO/COBAC/OHADA · Publication automatique KOS</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 mr-2">
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-[#1877F2]">3.4K</span>
                    <span className="text-[10px] text-foreground-400">Abonnés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">5</span>
                    <span className="text-[10px] text-foreground-400">Posts/sem</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-amber-600">3.8%</span>
                    <span className="text-[10px] text-foreground-400">Eng. Rate</span>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/khepraexperts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white text-sm font-bold whitespace-nowrap hover:bg-[#0d5bbd] transition-colors cursor-pointer"
                >
                  <span>Page Facebook</span>
                  <i className="ri-external-link-line" />
                </a>
              </div>
            </div>
          </div>

          {/* Instagram Account Banner */}
          <div className="border-t border-background-200/70 mt-4 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#E1306C]/10 to-[#E1306C]/5 border border-[#E1306C]/20">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}>
                  <i className="ri-instagram-fill text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E1306C]/15 text-[#E1306C] text-[10px] font-bold mb-1">COMPTE INSTAGRAM CONNECTÉ</span>
                  <h3 className="font-bold text-foreground-950 text-sm">@khepraexperts — Instagram — Reels & Carrousels Automatiques</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">1 850 abonnés · 4 posts/semaine · Reels éducatifs, infographies réglementaires, carrousels expertise · Pipeline KOS automatique</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 mr-2">
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-[#E1306C]">1.8K</span>
                    <span className="text-[10px] text-foreground-400">Abonnés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">4</span>
                    <span className="text-[10px] text-foreground-400">Posts/sem</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-amber-600">5.1%</span>
                    <span className="text-[10px] text-foreground-400">Eng. Rate</span>
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/khepraexperts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
                  style={{ background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}
                >
                  <span>@khepraexperts</span>
                  <i className="ri-external-link-line" />
                </a>
              </div>
            </div>
          </div>

          {/* SSE Bridge Banner — Connexion Social Selling Engine */}
          <div className="border-t border-background-200/70 mt-4 pt-4 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to="/kos-linkedin-social-selling-engine"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SSE BIG FOUR CONNECTÉ
                  </span>
                  <h3 className="font-bold text-foreground-950 text-sm">KOS LinkedIn Social Selling Engine — Audit & Génération Niveau Big Four</h3>
                  <p className="text-xs text-foreground-500 mt-0.5">Articles approuvés (score ≥ 90/100) automatiquement injectés dans cette file d'attente. Audit 7 points. 10 livrables par article. Scoring Big Four.</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 mr-2">
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">2</span>
                    <span className="text-[10px] text-foreground-400">Approuvés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-emerald-600">6</span>
                    <span className="text-[10px] text-foreground-400">Posts SSE</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold font-heading text-amber-600">90+</span>
                    <span className="text-[10px] text-foreground-400">Score Min</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap group-hover:bg-emerald-700 transition-colors">
                  <span>Social Selling Engine</span>
                  <i className="ri-arrow-right-line" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Source badge */}
        <section className="py-3 bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${source === 'live' ? 'bg-accent-500 animate-pulse' : 'bg-secondary-500'}`} />
              <span className={`text-xs font-semibold ${source === 'live' ? 'text-accent-700' : 'text-secondary-700'}`}>
                {source === 'live' ? 'Données Live — Supabase' : 'Données Mock — Démo'}
              </span>
            </div>
            <span className="text-xs text-foreground-400">
              {stats.total} posts · {stats.engagement_high} haute priorité
            </span>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {[
                { id: 'queue', label: 'File d\'Attente', icon: 'ri-list-check', count: String(stats.total) },
                { id: 'calendar', label: 'Calendrier', icon: 'ri-calendar-line', count: String(stats.this_week) },
                { id: 'platforms', label: 'Plateformes', icon: 'ri-share-line', count: '5' },
                { id: 'pace', label: 'Rythme Max', icon: 'ri-speed-up-line', count: 'MAX' },
                { id: 'url-health', label: 'Santé URLs', icon: 'ri-shield-check-line', count: 'NEW' },
                { id: 'qualite', label: 'Qualité Big Four', icon: 'ri-shield-star-line', count: 'BIG4' },
                { id: 'orchestrator', label: 'Orchestrateur', icon: 'ri-cpu-line', count: 'KOS' },
                { id: 'scan-total', label: 'Scan Total', icon: 'ri-radar-line', count: '360°' },
                { id: 'generate', label: 'Générer un Post', icon: 'ri-magic-fill', count: 'NEW' },
                { id: 'multilingual', label: 'Langues Locales', icon: 'ri-global-line', count: String(MOCK_MULTILINGUAL_SOCIAL_QUEUE.length) },
                { id: 'meta', label: 'Facebook & Instagram', icon: 'ri-meta-line', count: 'META' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Posts Total', value: stats.total, icon: 'ri-file-list-3-line', color: '#0A66C2' },
                { label: 'Programmés', value: stats.scheduled, icon: 'ri-calendar-check-line', color: '#059669' },
                { label: 'Brouillons', value: stats.draft, icon: 'ri-draft-line', color: '#D97706' },
                { label: 'Cette Semaine', value: stats.this_week, icon: 'ri-timer-line', color: '#7C3AED' },
                { label: 'Haute Priorité', value: stats.engagement_high, icon: 'ri-fire-line', color: '#DC2626' },
              ].map((card) => (
                <div key={card.label} className="rounded-xl bg-white border border-background-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                      <i className={`${card.icon} text-sm`} style={{ color: card.color }} />
                    </div>
                    <span className="text-xs text-foreground-400">{card.label}</span>
                  </div>
                  <span className="text-2xl font-bold font-heading text-foreground-950">{card.value}</span>
                </div>
              ))}
              {[
                { label: 'Facebook', value: '3.4K', icon: 'ri-facebook-fill', color: '#1877F2' },
                { label: 'Instagram', value: '1.8K', icon: 'ri-instagram-fill', color: '#E1306C' },
              ].map((card) => (
                <div key={card.label} className="rounded-xl bg-white border border-background-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                      <i className={`${card.icon} text-sm`} style={{ color: card.color }} />
                    </div>
                    <span className="text-xs text-foreground-400">{card.label}</span>
                  </div>
                  <span className="text-2xl font-bold font-heading text-foreground-950">{card.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TAB: Queue */}
        {activeTab === 'queue' && (
          <>
            {/* Queue Filter Bar */}
            <section className="py-4 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Filtrer :</span>
                  <button
                    onClick={() => setQueueFilter('all')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      queueFilter === 'all'
                        ? 'bg-foreground-950 text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                    }`}
                  >
                    <i className="ri-stack-line text-base" />
                    Tous ({queue.length})
                  </button>
                  <button
                    onClick={() => setQueueFilter('program-linkedin')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      queueFilter === 'program-linkedin'
                        ? 'bg-[#0A66C2] text-white'
                        : 'bg-white border border-[#0A66C2]/20 text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/5'
                    }`}
                  >
                    <i className="ri-linkedin-fill text-base" />
                    Programme Lead Magnets S26/S27
                  </button>
                  <button
                    onClick={() => setQueueFilter('auto-generated')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      queueFilter === 'auto-generated'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white border border-violet-200 text-violet-600 hover:border-violet-400 hover:bg-violet-50'
                    }`}
                  >
                    <i className="ri-magic-line text-base" />
                    Auto-Générés (Nouveaux Articles)
                  </button>
                  <button
                    onClick={() => setQueueFilter('x-auto')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      queueFilter === 'x-auto'
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                    }`}
                  >
                    <i className="ri-twitter-x-fill text-base" />
                    X/Twitter Auto-Générés
                  </button>
                  <button
                    onClick={() => setQueueFilter('sse')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      queueFilter === 'sse'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-emerald-200 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    <i className="ri-shield-check-line text-base" />
                    SSE Big Four 90+
                  </button>
                </div>
              </div>
            </section>
            {/* Programmed Posts */}
            {scheduledPosts.length > 0 && (
              <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h2 className="font-heading text-xl font-bold text-foreground-950">
                      Programmés — {scheduledPosts.length} posts
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {scheduledPosts.map((post) => {
                      const pColors = PLATFORM_COLORS[post.platform] || PLATFORM_COLORS.linkedin;
                      const sBadge = STATUS_BADGES[post.status] || STATUS_BADGES.draft;
                      const eBadge = ENGAGEMENT_BADGES[post.engagement_estimate] || ENGAGEMENT_BADGES.medium;
                      const isExpanded = expandedPost === post.id;
                      const isCopied = copiedId === post.id;

                      return (
                        <div key={post.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                          <div className={`p-5 ${pColors.bg} border-b ${pColors.border}`}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pColors.bg}`}>
                                <i className={`${post.platform === 'linkedin' ? 'ri-linkedin-fill' : post.platform === 'x' ? 'ri-twitter-x-fill' : 'ri-youtube-fill'} text-lg ${pColors.text}`} />
                              </div>
                              <span className={`text-xs font-bold uppercase ${pColors.text}`}>
                                {post.platform} · {post.post_type}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sBadge.bg} ${sBadge.text}`}>
                                {sBadge.label}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${eBadge.bg} ${eBadge.text}`}>
                                {eBadge.label}
                              </span>
                              {post.metadata?.auto_generated && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700">
                                  <i className="ri-magic-line" /> AUTO
                                </span>
                              )}
                              {post.metadata?.sse_approved && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <i className="ri-shield-check-line" /> BIG FOUR 90+
                                </span>
                              )}
                              <span className="ml-auto text-xs text-foreground-500">
                                <i className="ri-calendar-line mr-1" />
                                {formatDate(post.scheduled_for)}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="font-bold text-foreground-950 mb-2">{post.title}</h3>
                            <div className={`rounded-xl border border-background-200 p-4 bg-background-50/50 transition-all ${isExpanded ? '' : 'max-h-[150px] overflow-hidden relative'}`}>
                              <p className="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">{post.content}</p>
                              {!isExpanded && (
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background-50/50 to-transparent" />
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                              <button
                                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                                className="text-xs font-bold text-foreground-500 hover:text-foreground-700 cursor-pointer flex items-center gap-1"
                              >
                                <i className={`ri-${isExpanded ? 'arrow-up' : 'arrow-down'}-line`} />
                                {isExpanded ? 'Réduire' : 'Voir complet'}
                              </button>
                              <button
                                onClick={() => handleCopy(post)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                  isCopied ? 'bg-emerald-600 text-white' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                                }`}
                              >
                                <i className={`${isCopied ? 'ri-check-line' : 'ri-file-copy-line'} text-sm`} />
                                {isCopied ? 'Copié !' : 'Copier'}
                              </button>
                              <button
                                onClick={() => post.platform === 'x' ? handleShareX(post) : shareToLinkedIn(post)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                                  post.platform === 'x'
                                    ? 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                                    : 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                                }`}
                              >
                                <i className={`${post.platform === 'x' ? 'ri-twitter-x-fill' : 'ri-linkedin-fill'} text-sm`} />
                                Partager
                              </button>
                              {post.source_url && (
                                <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-400 hover:text-foreground-600 ml-auto truncate max-w-[200px]">
                                  <i className="ri-link mr-1" />
                                  {post.source_url.replace('https://khepraexperts.com/', '')}
                                </a>
                              )}
                            </div>
                            {post.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {post.hashtags.map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0A66C2]/10 text-[#0A66C2]">
                                    {tag}
                                  </span>
                                ))}
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

            {/* Drafts */}
            {draftPosts.length > 0 && (
              <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h2 className="font-heading text-xl font-bold text-foreground-950">
                      Brouillons — {draftPosts.length} posts en attente
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {draftPosts.map((post) => {
                      const isCopied = copiedId === post.id;
                      const eBadge = ENGAGEMENT_BADGES[post.engagement_estimate] || ENGAGEMENT_BADGES.medium;
                      return (
                        <div key={post.id} className="rounded-xl bg-white border border-amber-200 p-4">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${eBadge.bg} ${eBadge.text}`}>
                              {eBadge.label}
                            </span>
                            {post.metadata?.auto_generated && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700">
                                <i className="ri-magic-line" /> AUTO
                              </span>
                            )}
                            {post.metadata?.sse_approved && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <i className="ri-shield-check-line" /> BIG FOUR 90+
                              </span>
                            )}
                            <span className="text-xs text-foreground-400">Priorité {post.priority}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground-950 mb-2">{post.title}</h4>
                          <p className="text-xs text-foreground-500 leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(post)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                isCopied ? 'bg-emerald-600 text-white' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                              }`}
                            >
                              <i className={`${isCopied ? 'ri-check-line' : 'ri-file-copy-line'} text-sm`} />
                              {isCopied ? 'Copié !' : 'Copier'}
                            </button>
                            <button
                              onClick={() => shareToLinkedIn(post)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#004182] cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-linkedin-fill text-sm" />
                              Partager
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* TAB: Calendar */}
        {activeTab === 'calendar' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* LinkedIn Lead Magnet Distribution Calendar */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                    <i className="ri-download-2-line text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground-950">Programme Lead Magnets LinkedIn — S26/S27</h2>
                    <p className="text-sm text-foreground-500">3 phases · 23 juin → 5 juillet 2026 · 8 Lead Magnets · 17 posts</p>
                  </div>
                  <Link
                    to="/kos-linkedin-distribution-program"
                    className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-external-link-line" />
                    Programme complet
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    { date: 'Lun 23/06', phase: 'Phase 1', phaseColor: 'bg-emerald-600', posts: ['Guide BCEAO 2026 — Teaser (08:00)'] },
                    { date: 'Mar 24/06', phase: 'Phase 1', phaseColor: 'bg-emerald-600', posts: ['Checklist Conformité 127pts — Teaser (09:00)'] },
                    { date: 'Mer 25/06', phase: 'Phase 1', phaseColor: 'bg-emerald-600', posts: ['Diagnostic Flash Conformité — Teaser (08:00)'] },
                    { date: 'Jeu 26/06', phase: 'Phase 1→2', phaseColor: 'bg-amber-500', posts: ['Guide Levée de Fonds — Teaser (09:00)', 'Guide BCEAO — Insight Erreurs (12:00)'] },
                    { date: 'Ven 27/06', phase: 'Phase 1', phaseColor: 'bg-emerald-600', posts: ['Checklist — Insight Domaines (14:00)'] },
                    { date: 'Sam 28/06', phase: 'Phase 2', phaseColor: 'bg-amber-500', posts: ['Mini Rapport Due Diligence — Teaser (08:00)'] },
                    { date: 'Dim 29/06', phase: 'Phase 2', phaseColor: 'bg-amber-500', posts: ['Diagnostic ESG — Teaser (08:00)', 'Levée Fonds — Insight Signaux (12:00)'] },
                    { date: 'Lun 30/06', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['Guide BCEAO — CTA Download (08:30)'] },
                    { date: 'Mar 01/07', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['Template Gouvernance — Teaser (14:00)', 'Diag Flash — CTA Question (10:00)'] },
                    { date: 'Mer 02/07', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['Simulation Risque — Teaser (08:00)', 'Due Diligence — Insight Pièges (11:00)'] },
                    { date: 'Jeu 03/07', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['ESG — Insight Financements DFI (09:00)'] },
                    { date: 'Ven 04/07', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['Template Gouvernance — CTA Question (10:30)'] },
                    { date: 'Sam 05/07', phase: 'Phase 3', phaseColor: 'bg-violet-500', posts: ['Simulation Risque — Insight Coût (08:30)'] },
                  ].map((day) => (
                    <div key={day.date} className="rounded-xl bg-white border border-background-200 overflow-hidden">
                      <div className={`${day.phaseColor} px-3 py-2`}>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-xs font-bold">{day.date}</span>
                          <span className="text-white/80 text-[10px] font-semibold">{day.phase}</span>
                        </div>
                      </div>
                      <div className="p-3 space-y-1.5">
                        {day.posts.map((post, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                            <span className="text-xs text-foreground-600 leading-snug">{post}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Recurring Template */}
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Planning Hebdomadaire Récurrent</h2>
                <p className="text-foreground-500">6 créneaux LinkedIn · 4 créneaux X · Publication automatique</p>
              </div>

              <div className="space-y-3">
                {WEEKLY_SCHEDULE_TEMPLATE.map((daySchedule) => (
                  <div key={daySchedule.day} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="bg-foreground-950 px-5 py-3 text-white">
                      <h3 className="font-heading text-lg font-bold">{daySchedule.day}</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {daySchedule.slots.map((slot, si) => {
                        const pColors = PLATFORM_COLORS[slot.platform] || PLATFORM_COLORS.linkedin;
                        const matchingPost = scheduledPosts.find(p =>
                          p.scheduled_for && new Date(p.scheduled_for).toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase() === daySchedule.day.toLowerCase() &&
                          p.platform === slot.platform
                        );
                        return (
                          <div key={si} className={`flex items-center gap-3 p-3 rounded-xl ${pColors.bg} border ${pColors.border}`}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                              <i className={`${slot.platform === 'linkedin' ? 'ri-linkedin-fill' : 'ri-twitter-x-fill'} text-lg ${pColors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground-950">{slot.time}</span>
                                <span className={`text-xs font-semibold ${pColors.text}`}>{slot.type}</span>
                              </div>
                              {matchingPost ? (
                                <p className="text-xs text-foreground-600 truncate mt-0.5">{matchingPost.title}</p>
                              ) : (
                                <p className="text-xs text-foreground-400 italic mt-0.5">Créneau disponible</p>
                              )}
                            </div>
                            {matchingPost ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" title="Post programmé" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-foreground-300 flex-shrink-0" title="En attente" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB: Platforms */}
        {activeTab === 'platforms' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(SOCIAL_PLATFORM_STATS).map(([key, platform]) => {
                  const pColors = PLATFORM_COLORS[key] || PLATFORM_COLORS.linkedin;
                  return (
                    <div key={key} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className={`p-5 border-b ${pColors.border}`} style={{ backgroundColor: `${pColors.fill}12` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${pColors.fill}20` }}>
                            {key === 'instagram' ? (
                              <i className={`${platform.icon} text-2xl`} style={{ color: pColors.fill }} />
                            ) : (
                              <i className={`${platform.icon} text-2xl ${pColors.text}`} />
                            )}
                          </div>
                          <div>
                            <h3 className="font-heading text-lg font-bold text-foreground-950">{platform.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`w-2 h-2 rounded-full ${
                                platform.status === 'active' ? 'bg-emerald-500 animate-pulse' :
                                platform.status === 'inactive' ? 'bg-amber-500' : 'bg-gray-400'
                              }`} />
                              <span className="text-xs text-foreground-400">
                                {platform.status === 'active' ? 'Actif' : platform.status === 'inactive' ? 'Inactif' : 'Planifié'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground-500">Posts / semaine</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{platform.posts_week}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground-500">Engagement moyen</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{platform.engagement_avg}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground-500">Followers</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{platform.followers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-foreground-500">Meilleur créneau</span>
                          <span className="text-sm text-foreground-700 text-right">{platform.best_time}</span>
                        </div>
                        {key === 'linkedin' && (
                          <div className="pt-3 border-t border-background-200">
                            <button
                              onClick={openAdminPosts}
                              className="flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:text-[#004182] cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-external-link-line text-sm" />
                              Voir les posts publiés
                            </button>
                            <button
                              onClick={openCompanyPage}
                              className="flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:text-[#004182] cursor-pointer transition-colors whitespace-nowrap mt-1"
                            >
                              <i className="ri-building-line text-sm" />
                              Page entreprise
                            </button>
                          </div>
                        )}
                        {key === 'facebook' && (
                          <div className="pt-3 border-t border-background-200">
                            <a
                              href="https://www.facebook.com/khepraexperts"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-bold text-[#1877F2] hover:text-[#0d5bbd] cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-external-link-line text-sm" />
                              Page Facebook KHEPRA EXPERTS
                            </a>
                          </div>
                        )}
                        {key === 'instagram' && (
                          <div className="pt-3 border-t border-background-200">
                            <a
                              href="https://www.instagram.com/khepraexperts"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-bold text-[#E1306C] hover:text-[#b02258] cursor-pointer transition-colors whitespace-nowrap"
                            >
                              <i className="ri-external-link-line text-sm" />
                              @khepraexperts sur Instagram
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media Auto-Publishing Status */}
              <div className="mt-8 rounded-2xl bg-foreground-950 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <i className="ri-broadcast-line text-accent-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">Publication Automatique Multi-Plateformes — KOS Social Engine™</h3>
                    <p className="text-xs text-gray-400">5 plateformes connectées · Pipeline unifié · Contenu adapté par plateforme</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  {[
                    { name: 'LinkedIn', icon: 'ri-linkedin-fill', color: '#0A66C2', posts: '6/sem', status: 'Actif' },
                    { name: 'Facebook', icon: 'ri-facebook-fill', color: '#1877F2', posts: '5/sem', status: 'Actif' },
                    { name: 'Instagram', icon: 'ri-instagram-fill', color: '#E1306C', posts: '4/sem', status: 'Actif' },
                    { name: 'X/Twitter', icon: 'ri-twitter-x-fill', color: '#FFFFFF', posts: '4/sem', status: 'Actif' },
                    { name: 'YouTube', icon: 'ri-youtube-fill', color: '#FF0000', posts: '4/sem', status: 'Actif' },
                  ].map((p) => (
                    <div key={p.name} className="p-3 rounded-xl bg-white/8 border border-white/10">
                      <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${p.color}25` }}>
                        <i className={`${p.icon} text-base`} style={{ color: p.color }} />
                      </div>
                      <span className="block text-xs font-bold">{p.name}</span>
                      <span className="block text-[10px] text-emerald-400 font-semibold">{p.posts}</span>
                      <span className="block text-[9px] text-gray-400">{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: Rythme Max */}
        {activeTab === 'pace' && <SocialAutomationPaceDashboard />}

        {/* TAB: Santé URLs — Correction Automatique */}
        {activeTab === 'url-health' && <SocialUrlHealthPanel queue={queue} />}

        {/* TAB: Qualité Big Four — Scoring & Conformité */}
        {activeTab === 'qualite' && <SocialQualityPanel queue={queue} />}

        {/* TAB: Orchestrateur Intelligent — Arbitrage & Décision */}
        {activeTab === 'orchestrator' && <IntelligentOrchestratorPanel queue={queue} />}

        {/* TAB: Scan Total — Audit 360° Big Four */}
        {activeTab === 'scan-total' && <KOSTotalSystemScanPanel />}

        {/* TAB: Générateur de Posts */}
        {activeTab === 'generate' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">Générateur de Posts IA</h2>
                <p className="text-sm text-foreground-500">Créez des posts LinkedIn et X de niveau Big Four en 30 secondes. Choisissez le type, le sujet et publiez en 1 clic.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GeneratePostPanel />
                <div className="space-y-4">
                  <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                    <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-amber-500" />
                      Meilleures pratiques LinkedIn KHEPRA
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { icon: 'ri-time-line', text: 'Meilleurs horaires : Mardi-Jeudi 8h-10h GMT', color: '#0A66C2' },
                        { icon: 'ri-hashtag', text: '3-6 hashtags max de la liste officielle', color: '#0A66C2' },
                        { icon: 'ri-building-line', text: "Toujours mentionner 'Publi\u00e9 par KHEPRA EXPERTS'", color: '#059669' },
                        { icon: 'ri-bar-chart-2-line', text: 'Inclure un chiffre impactant dans les 3 premi\u00e8res lignes', color: '#DC2626' },
                        { icon: 'ri-question-line', text: "Terminer par une question pour l'engagement", color: '#7C3AED' },
                        { icon: 'ri-link', text: "Ajouter l'URL en commentaire (pas dans le post)", color: '#D97706' },
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-foreground-700">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${tip.color}15` }}>
                            <i className={`${tip.icon} text-xs`} style={{ color: tip.color }} />
                          </div>
                          {tip.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                    <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-hashtag text-[#0A66C2]" />
                      Hashtags officiels autoris\u00e9s
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['#BCEAO','#COBAC','#OHADA','#UEMOA','#CEMAC','#Gouvernance','#Conformit\u00e9','#AuditInterne','#GestionDesRisques','#LBCFT','#ESG','#PrixDeTransfert','#Fiscalit\u00e9','#TransformationDigitale','#KHEPRAExperts'].map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#0A66C2]/10 text-[#0A66C2] cursor-default">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                    <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-twitter-x-fill text-foreground-950" />
                      Format X/Twitter
                    </h3>
                    <ul className="space-y-2">
                      {[
                        '280 caract\u00e8res max pour compatibilit\u00e9 large',
                        '1-2 hashtags seulement sur X',
                        'Commence par un fait chiffr\u00e9 ou une stat choc',
                        'URL en fin de tweet ou dans les r\u00e9ponses',
                        'Meilleurs horaires : Mardi-Jeudi 10h-12h GMT',
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground-400 flex-shrink-0 mt-1" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: Langues Locales — Programme Multilingue */}
        {activeTab === 'multilingual' && (
          <>
            {/* Program Header */}
            <section className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-accent-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-global-line text-white text-2xl" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-500/15 text-accent-700 text-[10px] font-bold mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                          PROGRAMME ACTIF — LI-MULTILINGUE-2026-Q3
                        </span>
                        <h2 className="font-heading text-2xl font-bold text-foreground-950">KOS Multilingue — 14 Langues Africaines</h2>
                        <p className="text-sm text-foreground-600 mt-1 max-w-2xl">
                          Publication automatisée en langues locales : Wolof, Swahili, Haoussa, Lingala, Amharique, Portugais, Arabe, Igbo, Yoruba, Mooré, Duala, Xhosa, Zoulou, Fulfulde. Audience potentielle : 1 milliard+ de locuteurs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
                    {[
                      { label: 'Langues', value: MOCK_MULTILINGUAL_STATS.languages_covered, icon: 'ri-global-line', color: '#7C3AED' },
                      { label: 'Posts', value: MOCK_MULTILINGUAL_STATS.total_posts, icon: 'ri-file-list-3-line', color: '#0A66C2' },
                      { label: 'Pays', value: MOCK_MULTILINGUAL_STATS.countries_reached, icon: 'ri-earth-line', color: '#059669' },
                      { label: 'Audience', value: '1Md+', icon: 'ri-group-line', color: '#DC2626' },
                      { label: 'Programmés', value: MOCK_MULTILINGUAL_STATS.posts_scheduled, icon: 'ri-calendar-check-line', color: '#D97706' },
                    ].map((card) => (
                      <div key={card.label} className="rounded-xl bg-white/80 border border-background-200 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                            <i className={`${card.icon} text-xs`} style={{ color: card.color }} />
                          </div>
                          <span className="text-[10px] text-foreground-400">{card.label}</span>
                        </div>
                        <span className="text-xl font-bold font-heading text-foreground-950">{card.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Language Grid */}
            <section className="py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" />
                  <h3 className="font-heading text-lg font-bold text-foreground-950">
                    {MOCK_MULTILINGUAL_STATS.languages_covered} Langues Programmes — {MOCK_MULTILINGUAL_STATS.posts_scheduled} Posts du 11 au 25 Juillet
                  </h3>
                </div>

                {/* Language Coverage Bar */}
                <div className="rounded-2xl bg-white border border-background-200 p-4 mb-6 overflow-x-auto">
                  <div className="flex flex-wrap gap-2">
                    {MOCK_MULTILINGUAL_STATS.languages.map((lang) => (
                      <div key={lang.code} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background-50 border border-background-200 hover:border-accent-300 transition-colors cursor-default">
                        <span className="text-xs font-bold text-foreground-700 uppercase">{lang.code}</span>
                        <div className="w-px h-4 bg-background-300" />
                        <span className="text-xs text-foreground-500">{lang.name}</span>
                        <span className="text-[10px] text-foreground-400 bg-background-200 px-1.5 py-0.5 rounded-full">{lang.speakers}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Multilingual Posts */}
            <section className="py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                  {MOCK_MULTILINGUAL_SOCIAL_QUEUE.map((post) => {
                    const langInfo = MOCK_MULTILINGUAL_STATS.languages.find(l => l.code === (post.metadata as Record<string, string>)?.language);
                    const isCopied = copiedId === post.id;
                    return (
                      <div key={post.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden hover:border-accent-200 transition-colors">
                        <div className="p-4 border-b border-background-100 bg-background-50/50">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-bold">
                              <i className="ri-global-line text-sm" />
                              {langInfo?.name || 'Langue locale'} ({langInfo?.code.toUpperCase() || ''})
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-foreground-400">
                              <i className="ri-map-pin-line text-sm" />
                              {langInfo?.country || ''}
                            </div>
                            <span className="text-xs text-foreground-400">
                              <i className="ri-group-line mr-1" />
                              {langInfo?.speakers || ''} locuteurs
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              post.priority === 1 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {post.priority === 1 ? 'Priorité Haute' : 'Priorité Standard'}
                            </span>
                            <span className="ml-auto text-xs text-foreground-400 flex items-center gap-1">
                              <i className="ri-calendar-line" />
                              {formatDate(post.scheduled_for)}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-foreground-950 mb-3">{post.title}</h4>
                          <div className="rounded-xl border border-background-200 p-4 bg-background-50/50 max-h-[200px] overflow-y-auto">
                            <p className="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">{post.content}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-4 flex-wrap">
                            <button
                              onClick={() => handleCopy(post)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                isCopied ? 'bg-emerald-600 text-white' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                              }`}
                            >
                              <i className={`${isCopied ? 'ri-check-line' : 'ri-file-copy-line'} text-sm`} />
                              {isCopied ? 'Copié !' : 'Copier le texte'}
                            </button>
                            <button
                              onClick={() => shareToLinkedIn(post)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#004182] cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-linkedin-fill text-sm" />
                              Partager sur LinkedIn
                            </button>
                            {post.source_url && (
                              <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-400 hover:text-foreground-600 ml-auto truncate max-w-[200px] cursor-pointer">
                                <i className="ri-link mr-1" />
                                {post.source_url.replace('https://khepraexperts.com/', '')}
                              </a>
                            )}
                          </div>
                          {post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {post.hashtags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-10 bg-accent-500/5 border-t border-accent-500/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 border border-accent-200 mb-4">
                  <i className="ri-flashlight-line text-accent-600 text-sm" />
                  <span className="text-sm font-semibold text-accent-700">KOS Multilingue — Expansion Panafricaine</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
                  Votre contenu KHEPRA, dans la langue de vos clients
                </h2>
                <p className="text-foreground-500 max-w-2xl mx-auto mb-6">
                  1 milliard+ de locuteurs atteints. 14 langues africaines. Publication automatique LinkedIn. Le programme KOS Multilingue rend KHEPRA EXPERTS accessible à toute l'Afrique — du Sénégal au Kenya, du Nigéria à l'Afrique du Sud.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/kos-social-media-board"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-dashboard-line" />
                    Social Media Board
                  </Link>
                  <Link
                    to="/kos-linkedin-social-selling-engine"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-accent-200 text-accent-600 font-bold text-sm hover:bg-accent-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-shield-check-line" />
                    Social Selling Engine
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB: Facebook & Instagram — Meta Content Generator */}
        {activeTab === 'meta' && <MetaContentPanel />}

        {/* CTA — Navigation vers autres modules */}
        <section className="py-12 sm:py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 to-foreground-950/70" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-4">
                  <i className="ri-flashlight-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">KOS Social Media — Module Croissance</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Génération & Planification Automatique
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  10 articles KHEPRA convertis en posts LinkedIn chaque semaine. Planning automatique : lundi, mercredi, vendredi — 8h et 12h GMT. Hashtags optimisés, CTA contextuels, liens canoniques.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Génération IA', 'LinkedIn 6x/semaine', 'Copy 1-clic', 'Hashtags optimisés', 'Calendrier auto'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                      <i className="ri-check-line text-emerald-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/kos-web-operations-deployment" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-rocket-line" />
                  Web Operations
                </a>
                <a href="/kos-ai-visibility-command" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-radar-line" />
                  AI Visibility Command
                </a>
              </div>
            </div>
          </div>
        </section>

    </KOSHubLayout>
  );
}