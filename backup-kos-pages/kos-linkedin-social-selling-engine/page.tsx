import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSLinkedInSocialSellingEngine } from '@/hooks/useKOSLinkedInSocialSellingEngine';
import type { SocialSellingArticle } from '@/mocks/linkedInSocialSellingEngine';
import { getScoreColor, getScoreLabel } from '@/mocks/linkedInSocialSellingEngine';

// ─── Mini-Components ─────────────────────────────────────────────────

function ScoreGauge({ score, label, max = 100, size = 'md' }: { score: number; label: string; max?: number; size?: 'sm' | 'md' | 'lg' }) {
  const pct = Math.round((score / max) * 100);
  const color = getScoreColor(score);
  const dims = size === 'lg' ? 'w-24 h-24' : size === 'sm' ? 'w-14 h-14' : 'w-20 h-20';
  const fontSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  const strokeW = size === 'lg' ? 6 : 4;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`${dims} relative`}>
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth={strokeW} />
          <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth={strokeW}
            strokeDasharray={`${(pct / 100) * 176} 176`} strokeLinecap="round" />
        </svg>
        <div className={`${dims} flex items-center justify-center`}>
          <span className={`${fontSize} font-bold font-heading text-foreground-950`}>{score}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-foreground-500 text-center leading-tight">{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: SocialSellingArticle['status'] }) {
  const map: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
    approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Approuvé ≥ 90' },
    blocked: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', label: 'Bloqué < 90' },
    scored: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Scoring' },
    generated: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500', label: 'Généré' },
    audited: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', dot: 'bg-sky-500', label: 'Audité' },
  };
  const s = map[status] || map.audited;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.bg} ${s.text} ${s.border} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function AuditCheckCard({ check, index }: { check: { key: string; label: string; icon: string; score: number; status: string; details: string[]; feedback: string; regeneratedHook?: string; generatedCTA?: string }; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = check.status === 'pass' ? 'border-emerald-300 bg-emerald-50' : check.status === 'warn' ? 'border-amber-300 bg-amber-50' : 'border-red-300 bg-red-50';
  const statusIcon = check.status === 'pass' ? 'ri-check-line text-emerald-500' : check.status === 'warn' ? 'ri-error-warning-line text-amber-500' : 'ri-close-line text-red-500';
  const scoreColor = check.status === 'pass' ? 'text-emerald-600' : check.status === 'warn' ? 'text-amber-600' : 'text-red-600';

  return (
    <div className={`rounded-2xl border-2 ${statusColor} overflow-hidden transition-all`}>
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-background-200 flex items-center justify-center">
            <i className={`${check.icon} text-lg text-foreground-700`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">#{index + 1}</span>
              <h4 className="font-heading text-sm font-bold text-foreground-950">{check.label}</h4>
              <i className={`${statusIcon} text-sm`} />
            </div>
            <p className="text-xs text-foreground-500 mt-0.5">{check.feedback}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold font-heading ${scoreColor}`}>{check.score}/100</span>
          <i className={`ri-${expanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-2">
          {check.details.map((d, i) => (
            <div key={i} className="text-xs flex items-start gap-2">
              <span className="mt-0.5">{d.startsWith('✅') ? '✅' : d.startsWith('❌') ? '❌' : '•'}</span>
              <span className={d.startsWith('❌') ? 'text-red-600 font-medium' : 'text-foreground-600'}>{d.replace(/^[✅❌]\s*/, '')}</span>
            </div>
          ))}
          {check.regeneratedHook && (
            <div className="mt-2 pt-2 border-t border-background-200/70">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Hook Régénéré :</span>
              <p className="text-xs text-foreground-700 mt-1 italic bg-red-50 p-2 rounded-lg border border-red-100">{check.regeneratedHook}</p>
            </div>
          )}
          {check.generatedCTA && (
            <div className="mt-2 pt-2 border-t border-background-200/70">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">CTA Généré :</span>
              <p className="text-xs text-foreground-700 mt-1 italic bg-amber-50 p-2 rounded-lg border border-amber-100">{check.generatedCTA}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DeliverableCard({ item, index }: { item: { key: string; label: string; icon: string; content?: string; score?: number; color: string; detail?: { title: string; wordCount: number; sections: { heading: string }[] }; prompt?: string; slides?: { slide: number; title: string }[]; tags?: string[]; utm?: { fullTrackedURL: string; utm_source: string; utm_campaign: string } }; index: number }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  return (
    <div className="rounded-2xl bg-white border border-background-200/70 overflow-hidden hover:shadow-md transition-all">
      <div className="p-4 flex items-center gap-3 border-b border-background-200/70" style={{ borderLeftWidth: '3px', borderLeftColor: item.color }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
          <i className={`${item.icon} text-sm`} style={{ color: item.color }} />
        </div>
        <div>
          <span className="text-[10px] text-foreground-400 font-bold uppercase tracking-wider">#{index + 1}</span>
          <h4 className="font-heading text-sm font-bold text-foreground-950">{item.label}</h4>
        </div>
        {item.score !== undefined && (
          <span className="ml-auto text-sm font-bold font-heading" style={{ color: getScoreColor(item.score) }}>{item.score}/100</span>
        )}
      </div>

      <div className="p-4">
        {/* Text content */}
        {item.content && (
          <>
            <div className={`text-xs text-foreground-600 leading-relaxed whitespace-pre-line ${expanded ? '' : 'max-h-[120px] overflow-hidden relative'}`}>
              {item.content}
              {!expanded && item.content.length > 200 && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
            {item.content.length > 200 && (
              <button onClick={() => setExpanded(!expanded)} className="text-[10px] text-foreground-400 hover:text-foreground-700 font-medium mt-1 cursor-pointer">
                {expanded ? 'Réduire' : 'Voir tout'}
              </button>
            )}
            <button
              onClick={() => handleCopy(item.content!)}
              className={`mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                copied ? 'bg-emerald-500 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <i className={`text-xs ${copied ? 'ri-check-line' : 'ri-file-copy-line'}`} />
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </>
        )}

        {/* Article natif */}
        {item.detail && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground-800">{item.detail.title}</p>
            <div className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-file-text-line" />
              <span>{item.detail.wordCount.toLocaleString()} mots</span>
              <span>·</span>
              <span>{item.detail.sections.length} sections</span>
            </div>
            <div className="space-y-1 mt-2">
              {item.detail.sections.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-foreground-700">{s.heading}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banner prompt */}
        {item.prompt && (
          <>
            <p className="text-xs text-foreground-500 leading-relaxed italic line-clamp-3 mb-2">{item.prompt}</p>
            <button
              onClick={() => handleCopy(item.prompt!)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                copied ? 'bg-emerald-500 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <i className={`text-xs ${copied ? 'ri-check-line' : 'ri-file-copy-line'}`} />
              {copied ? 'Copié !' : 'Copier le prompt'}
            </button>
          </>
        )}

        {/* Carousel slides */}
        {item.slides && (
          <div className="space-y-2">
            {item.slides.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-background-50 border border-background-100">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{s.slide}</span>
                <div>
                  <span className="font-bold text-foreground-800">{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hashtags */}
        {item.tags && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/5 text-[#0A66C2] border border-[#0A66C2]/10">{t}</span>
            ))}
          </div>
        )}

        {/* UTM URL */}
        {item.utm && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-foreground-400">Campagne :</span>
              <span className="font-bold text-foreground-700">{item.utm.utm_campaign}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-foreground-400">Source :</span>
              <span className="font-bold text-foreground-700">{item.utm.utm_source}</span>
            </div>
            <p className="text-[10px] text-foreground-400 break-all">{item.utm.fullTrackedURL}</p>
            <button
              onClick={() => handleCopy(item.utm!.fullTrackedURL)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                copied ? 'bg-emerald-500 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <i className={`text-xs ${copied ? 'ri-check-line' : 'ri-file-copy-line'}`} />
              {copied ? 'Copié !' : 'Copier l\'URL'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────

export default function linkedInSocialSellingEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const navigate = useNavigate();
  const {
    loading, articles, selectedArticle, selectedArticleId, selectArticle,
    kpis, rules, approvedArticles, blockedArticles,
    auditChecks, deliverables,
  } = useKOSLinkedInSocialSellingEngine();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'audit' | 'contenu' | 'scoring'>('pipeline');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [pushedToQueue, setPushedToQueue] = useState<Set<string>>(new Set());

  const pushToQueue = useCallback((article: SocialSellingArticle) => {
    setPushedToQueue((prev) => new Set(prev).add(article.id));
    setTimeout(() => {
      navigate('/kos-social-media-command?filter=sse');
    }, 800);
  }, [navigate]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPostId(id);
      setTimeout(() => setCopiedPostId(null), 2000);
    });
  };

  const shareOnLinkedIn = (article: SocialSellingArticle) => {
    const text = encodeURIComponent(article.contentBundle.postLinkedIn.split('\n\n')[0]);
    const url = encodeURIComponent(article.contentBundle.trackedURL.fullTrackedURL);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  const tabs = [
    { id: 'pipeline', label: 'Pipeline', icon: 'ri-stack-line', count: articles.length },
    { id: 'audit', label: 'Audit 7 Points', icon: 'ri-shield-check-line', count: selectedArticle ? 7 : 0 },
    { id: 'contenu', label: '10 Livrables', icon: 'ri-file-list-3-line', count: selectedArticle ? 10 : 0 },
    { id: 'scoring', label: 'Scoring', icon: 'ri-bar-chart-line', count: selectedArticle ? 5 : 0 },
  ];

  return (
    <hubLayout hubId={85}>
      <SeoHead
        title="KOS LinkedIn Social Selling Engine™ — Audit & Génération Niveau Big Four | KHEPRA EXPERTS"
        description="Moteur de social selling LinkedIn niveau Deloitte/PwC/EY/KPMG. Audit 7 points, 10 livrables par article, scoring 5 dimensions, blocage automatique si score < 90/100. UTM tracking, hashtags stratégiques."
        keywords="LinkedIn social selling, Big Four, génération contenu LinkedIn, audit qualité LinkedIn, KHEPRA EXPERTS, scoring publication, automatisation LinkedIn"
        canonicalPath="/kos-linkedin-social-selling-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20professional%20social%20media%20engine%20concept%20with%20LinkedIn%20blue%20and%20emerald%20green%20gradient%20representing%20automated%20social%20selling%20orchestration%20for%20Big%20Four%20consulting%20firm%2C%20sophisticated%20network%20nodes%20and%20flowing%20data%20streams%20in%20dark%20environment%2C%20premium%20corporate%20aesthetic%2C%20no%20text%2C%20no%20people&width=1920&height=500&seq=li-sse-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            width="1920"
            height="500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-18 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/30 backdrop-blur-sm mb-6">
              <i className="ri-linkedin-fill text-[#0A66C2] text-sm" />
              <span className="text-sm font-bold text-[#0A66C2] uppercase tracking-wider">
                KOS LinkedIn Social Selling Engine™
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
              Chaque article devient une machine à leads.{' '}
              <span className="block text-[#0A66C2] mt-2">Audit 7 points. 10 livrables. Scoring Big Four.</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Le moteur transforme automatiquement tout contenu KHEPRA EXPERTS en actif LinkedIn de niveau{' '}
              <strong className="text-white">Deloitte, PwC, EY, KPMG</strong>.{' '}
              Audit obligatoire avant publication.{' '}
              <strong className="text-red-400">Score &lt; 90/100 → Publication bloquée.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: `${kpis.articlesApproved} Approuvés`, color: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' },
                { label: `${kpis.articlesBlocked} Bloqué`, color: 'bg-red-500/20 border-red-400/30 text-red-300' },
                { label: `${kpis.totalDeliverablesGenerated} Livrables`, color: 'bg-amber-500/20 border-amber-400/30 text-amber-300' },
                { label: `Seuil ≥ 90/100`, color: 'bg-[#0A66C2]/20 border-[#0A66C2]/30 text-[#0A66C2]' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${item.color}`}>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KPIs Bar */}
      <section className="py-5 bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Articles', value: String(kpis.totalArticles), icon: 'ri-article-line', color: '#0A66C2' },
              { label: 'Score Global Moyen', value: String(kpis.averageGlobalScore), icon: 'ri-bar-chart-line', color: kpis.averageGlobalScore >= 90 ? '#059669' : '#EA580C' },
              { label: 'Hook Moyen', value: String(kpis.averageHookScore), icon: 'ri-flashlight-line', color: '#DC2626' },
              { label: 'Lead Magnet Moyen', value: String(kpis.averageLeadMagnetScore), icon: 'ri-download-line', color: '#7C3AED' },
              { label: 'Engagement Moyen', value: String(kpis.averageEngagementScore), icon: 'ri-thumb-up-line', color: '#EA580C' },
              { label: 'Authority Moyen', value: String(kpis.averageAuthorityScore), icon: 'ri-verified-badge-line', color: '#059669' },
              { label: 'Conversion Moyen', value: String(kpis.averageConversionScore), icon: 'ri-rocket-line', color: '#DC2626' },
            ].map((kpi, i) => (
              <div key={i} className="text-center py-3 px-2 rounded-lg bg-white border border-background-200/70">
                <i className={`${kpi.icon} text-sm mb-1 block`} style={{ color: kpi.color }} />
                <span className="block text-lg font-bold text-foreground-950 font-heading">{kpi.value}</span>
                <span className="text-[10px] text-foreground-400">{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge Banner — Connexion Social Media Command */}
      <section className="py-3 bg-gradient-to-r from-emerald-500/5 via-accent-100/30 to-[#0A66C2]/5 border-b border-accent-200/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/kos-social-media-command?filter=sse"
            className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-accent-200/50 hover:border-accent-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
              <i className="ri-git-merge-line text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  BRIDGE ACTIF
                </span>
                <span className="text-sm font-bold text-foreground-950">
                  Social Selling Engine → Social Media Command
                </span>
              </div>
              <p className="text-xs text-foreground-500 mt-0.5">
                {kpis.articlesApproved} article(s) approuvé(s) automatiquement converti(s) en {kpis.articlesApproved * 3} posts programmés dans la file d'attente LinkedIn. Audit Big Four 90+ → Publication auto.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="block text-lg font-bold font-heading text-emerald-600">{kpis.articlesApproved * 3}</span>
                <span className="text-[10px] text-foreground-400">Posts SSE</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white text-sm font-bold whitespace-nowrap group-hover:bg-accent-600 transition-colors">
                <span>File d'attente</span>
                <i className="ri-arrow-right-line" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Bridge Banner — Connexion YouTube Production Pipeline */}
      <section className="py-3 bg-gradient-to-r from-red-500/5 via-red-400/10 to-emerald-500/5 border-b border-red-200/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-red-200/50 hover:border-red-300 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
              <i className="ri-youtube-fill text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  BRIDGE ACTIF
                </span>
                <span className="text-sm font-bold text-foreground-950">
                  Social Selling Engine → Big Four YouTube Production Factory
                </span>
              </div>
              <p className="text-xs text-foreground-500 mt-0.5">
                {kpis.articlesApproved} article(s) approuvé(s) automatiquement convertis en {kpis.articlesApproved} scripts vidéo Big Four. Audience détectée, voix KHEPRA recommandée (Célestin Koffi · Fatoumata Diallo · Aminata Sow), structure éditoriale pré-remplie.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <span className="block text-lg font-bold font-heading text-red-600">{kpis.articlesApproved}</span>
                <span className="text-[10px] text-foreground-400">Scripts SSE</span>
              </div>
              <Link
                to="/kos-youtube-download"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold whitespace-nowrap hover:bg-red-700 transition-colors cursor-pointer"
              >
                <i className="ri-play-circle-line" />Lancer Production Big Four
              </Link>
              <Link
                to="/kos-youtube-production-pipeline?tab=scripts&filter=sse"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-200 text-red-700 text-sm font-bold whitespace-nowrap hover:bg-red-50 transition-colors cursor-pointer"
              >
                <i className="ri-git-branch-line" />Pipeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
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
                {tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Selector (if not on Pipeline tab) */}
      {activeTab !== 'pipeline' && (
        <section className="py-4 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Article analysé :</span>
              {articles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => selectArticle(a.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-2 ${
                    selectedArticleId === a.id
                      ? 'bg-foreground-950 text-white'
                      : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                >
                  <StatusBadge status={a.status} />
                  {a.title.slice(0, 40)}...
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Loading state */}
      {loading && (
        <div className="py-20 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-background-200 border-t-[#0A66C2] animate-spin" />
          <p className="text-foreground-500">Initialisation du Social Selling Engine...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* ═══════════ TAB 1 : PIPELINE ═══════════ */}
          {activeTab === 'pipeline' && (
            <section className="py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Alert if blocked articles exist */}
                {blockedArticles.length > 0 && (
                  <div className="mb-8 p-5 rounded-2xl bg-red-50 border-2 border-red-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                        <i className="ri-error-warning-line text-red-500 text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-red-700 mb-1">
                          {blockedArticles.length} article(s) bloqué(s) — Score &lt; 90/100
                        </h3>
                        <p className="text-sm text-red-600 mb-3">Ces articles ne seront pas publiés tant que leur score global n'atteint pas 90/100. Un plan d'action correctif a été généré.</p>
                        <button
                          onClick={() => {
                            if (blockedArticles.length > 0) {
                              selectArticle(blockedArticles[0].id);
                              setActiveTab('scoring');
                            }
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-tools-line" />
                          Voir le plan correctif
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {articles.map((article) => {
                    const statusColor = getScoreColor(article.scoring.globalScore);
                    const statusLabel = getScoreLabel(article.scoring.globalScore);
                    const isBlocked = article.status === 'blocked';

                    return (
                      <div key={article.id} className={`rounded-2xl bg-white border-2 overflow-hidden hover:shadow-lg transition-all ${isBlocked ? 'border-red-200' : 'border-background-200'}`}>
                        <div className="h-1.5" style={{ backgroundColor: statusColor }} />
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <StatusBadge status={article.status} />
                            <span className="text-[10px] text-foreground-400">{article.date}</span>
                          </div>

                          <h3 className="font-heading font-bold text-foreground-950 text-sm mb-3 leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Mini scoring */}
                          <div className="grid grid-cols-5 gap-1.5 mb-4">
                            {[
                              { label: 'Hook', score: article.scoring.hookScore },
                              { label: 'Lead', score: article.scoring.leadMagnetScore },
                              { label: 'Eng.', score: article.scoring.engagementScore },
                              { label: 'Auth.', score: article.scoring.authorityScore },
                              { label: 'Conv.', score: article.scoring.conversionScore },
                            ].map((s) => (
                              <div key={s.label} className="text-center">
                                <span className="block text-xs font-bold" style={{ color: getScoreColor(s.score) }}>{s.score}</span>
                                <span className="text-[9px] text-foreground-400">{s.label}</span>
                              </div>
                            ))}
                          </div>

                          {/* Global Score */}
                          <div className="flex items-center justify-between mb-4 py-3 px-4 rounded-xl bg-background-50 border border-background-200/70">
                            <span className="text-xs font-bold text-foreground-500 uppercase tracking-wider">Score Global</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold font-heading" style={{ color: statusColor }}>{article.scoring.globalScore}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${statusColor}15`, color: statusColor, borderColor: `${statusColor}30`, borderWidth: '1px' }}>{statusLabel}</span>
                            </div>
                          </div>

                          {/* Publication Gate */}
                          <div className={`py-2 px-3 rounded-lg text-center mb-4 ${article.scoring.authorized ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                            {article.scoring.authorized ? (
                              <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                                <i className="ri-check-double-line" />
                                PUBLICATION AUTORISÉE — Score ≥ 90
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-red-700 flex items-center justify-center gap-1">
                                <i className="ri-close-circle-line" />
                                PUBLICATION BLOQUÉE — Score &lt; 90
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => { selectArticle(article.id); setActiveTab('audit'); }}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-background-50 border border-background-200 text-foreground-700 hover:border-foreground-300 transition-all cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-shield-check-line" />
                              Audit
                            </button>
                            <button
                              onClick={() => { selectArticle(article.id); setActiveTab('contenu'); }}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-background-50 border border-background-200 text-foreground-700 hover:border-foreground-300 transition-all cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-file-list-3-line" />
                              Contenu
                            </button>
                            <button
                              onClick={() => { selectArticle(article.id); setActiveTab('scoring'); }}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-background-50 border border-background-200 text-foreground-700 hover:border-foreground-300 transition-all cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-bar-chart-line" />
                              Scoring
                            </button>
                            {article.scoring.authorized && (
                              <>
                                <button
                                  onClick={() => shareOnLinkedIn(article)}
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#004182] transition-all cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-linkedin-fill" />
                                  Publier
                                </button>
                                {pushedToQueue.has(article.id) ? (
                                  <Link
                                    to="/kos-social-media-command?filter=sse"
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer whitespace-nowrap"
                                  >
                                    <i className="ri-check-double-line" />
                                    Programmée →
                                  </Link>
                                ) : (
                                  <button
                                    onClick={() => pushToQueue(article)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all cursor-pointer whitespace-nowrap"
                                  >
                                    <i className="ri-send-plane-line" />
                                    Programmer
                                  </button>
                                )}
                                <Link
                                  to="/kos-youtube-production-pipeline?tab=scripts&filter=sse"
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-youtube-fill" />
                                  Lancer Production Big Four
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ TAB 2 : AUDIT 7 POINTS ═══════════ */}
          {activeTab === 'audit' && selectedArticle && (
            <section className="py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                    Audit Obligatoire Avant Publication — {selectedArticle.title}
                  </h2>
                  <p className="text-foreground-600">7 vérifications systématiques. Tolérance zéro pour publication inférieure au standard Big Four.</p>
                </div>

                <div className="space-y-3 max-w-4xl">
                  {auditChecks.map((check, i) => (
                    <AuditCheckCard key={check.key} check={check} index={i} />
                  ))}
                </div>

                {/* Audit Summary */}
                <div className="mt-8 p-6 rounded-2xl bg-white border border-background-200 max-w-4xl">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Résumé d'Audit</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-xl bg-background-50">
                      <span className="block text-2xl font-bold text-foreground-950">{auditChecks.filter(c => c.status === 'pass').length}</span>
                      <span className="text-xs text-emerald-600 font-bold">Conformes</span>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background-50">
                      <span className="block text-2xl font-bold text-foreground-950">{auditChecks.filter(c => c.status === 'warn').length}</span>
                      <span className="text-xs text-amber-600 font-bold">Avertissements</span>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background-50">
                      <span className="block text-2xl font-bold text-foreground-950">{auditChecks.filter(c => c.status === 'fail').length}</span>
                      <span className="text-xs text-red-600 font-bold">Échecs</span>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background-50">
                      <span className="block text-2xl font-bold" style={{ color: getScoreColor(Math.round(auditChecks.reduce((s, c) => s + c.score, 0) / auditChecks.length)) }}>
                        {Math.round(auditChecks.reduce((s, c) => s + c.score, 0) / auditChecks.length)}
                      </span>
                      <span className="text-xs text-foreground-600 font-bold">Score Audit Moyen</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ TAB 3 : 10 LIVRABLES ═══════════ */}
          {activeTab === 'contenu' && selectedArticle && (
            <section className="py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                    10 Livrables Obligatoires — {selectedArticle.title}
                  </h2>
                  <p className="text-foreground-600">Pour chaque article KHEPRA, le Social Selling Engine génère automatiquement ces 10 actifs LinkedIn.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {deliverables.map((item, i) => (
                    <DeliverableCard key={item.key} item={item} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ TAB 4 : SCORING ═══════════ */}
          {activeTab === 'scoring' && selectedArticle && (
            <section className="py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                    Scoring 5 Dimensions — {selectedArticle.title}
                  </h2>
                  <p className="text-foreground-600">Score global calculé sur 5 dimensions. Seuil de publication : 90/100. Tolérance : ZÉRO.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Scoring Gauges */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl bg-white border border-background-200 p-6 md:p-8">
                      <h3 className="font-heading text-lg font-bold text-foreground-950 mb-6">Décomposition du Score</h3>
                      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                        {[
                          { label: 'Hook Score', score: selectedArticle.scoring.hookScore, color: '#DC2626' },
                          { label: 'Lead Magnet\nScore', score: selectedArticle.scoring.leadMagnetScore, color: '#7C3AED' },
                          { label: 'Engagement\nScore', score: selectedArticle.scoring.engagementScore, color: '#EA580C' },
                          { label: 'Authority\nScore', score: selectedArticle.scoring.authorityScore, color: '#059669' },
                          { label: 'Conversion\nScore', score: selectedArticle.scoring.conversionScore, color: '#0A66C2' },
                        ].map((dim) => (
                          <ScoreGauge key={dim.label} score={dim.score} label={dim.label} size="md" />
                        ))}
                      </div>

                      {/* Global Score Bar */}
                      <div className="border-t border-background-200/70 pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-heading text-sm font-bold text-foreground-950">Score Global</span>
                          <span className="text-3xl font-bold font-heading" style={{ color: getScoreColor(selectedArticle.scoring.globalScore) }}>
                            {selectedArticle.scoring.globalScore}
                            <span className="text-lg text-foreground-400 font-normal">/100</span>
                          </span>
                        </div>
                        <div className="w-full h-4 rounded-full bg-background-100 overflow-hidden mb-2">
                          <div
                            className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                            style={{ width: `${selectedArticle.scoring.globalScore}%`, backgroundColor: getScoreColor(selectedArticle.scoring.globalScore) }}
                          >
                            {selectedArticle.scoring.globalScore >= 90 && (
                              <span className="text-[10px] font-bold text-white">BIG FOUR</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-400">0</span>
                          <div className="flex items-center gap-2">
                            <div className="w-0.5 h-3 rounded-full bg-red-400" />
                            <span className="text-red-500 font-bold">Seuil 90</span>
                          </div>
                          <span className="text-foreground-400">100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publication Gate */}
                  <div className="lg:col-span-1">
                    <div className={`rounded-2xl border-2 p-6 md:p-8 ${selectedArticle.scoring.authorized ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'}`}>
                      {selectedArticle.scoring.authorized ? (
                        <>
                          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                            <i className="ri-check-double-line text-emerald-500 text-3xl" />
                          </div>
                          <h3 className="font-heading text-lg font-bold text-emerald-700 text-center mb-2">PUBLICATION AUTORISÉE</h3>
                          <p className="text-sm text-emerald-600 text-center mb-4">Score global ≥ 90/100. Tous les critères Big Four sont satisfaits.</p>
                          <button
                            onClick={() => shareOnLinkedIn(selectedArticle)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-[#0A66C2] hover:bg-[#004182] transition-all cursor-pointer whitespace-nowrap text-sm mb-3"
                          >
                            <i className="ri-linkedin-fill" />
                            Publier sur LinkedIn
                          </button>
                          {pushedToQueue.has(selectedArticle.id) ? (
                            <Link
                              to="/kos-social-media-command?filter=sse"
                              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all cursor-pointer whitespace-nowrap text-sm mb-3"
                            >
                              <i className="ri-check-double-line" />
                              Programmée — Voir la file d'attente →
                            </Link>
                          ) : (
                            <button
                              onClick={() => pushToQueue(selectedArticle)}
                              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-emerald-600 bg-white border-2 border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer whitespace-nowrap text-sm mb-3"
                            >
                              <i className="ri-send-plane-line" />
                              Programmer dans la file d'attente
                            </button>
                          )}
                          <Link
                            to="/kos-youtube-production-pipeline?tab=scripts&filter=sse"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-red-600 bg-white border-2 border-red-400 hover:bg-red-50 transition-all cursor-pointer whitespace-nowrap text-sm mb-3"
                          >
                            <i className="ri-youtube-fill" />
                            Générer le script YouTube
                          </Link>
                          <button
                            onClick={() => { selectArticle(selectedArticle.id); setActiveTab('contenu'); }}
                            className="w-full mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-file-list-3-line" />
                            Voir les 10 livrables
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <i className="ri-close-circle-line text-red-500 text-3xl" />
                          </div>
                          <h3 className="font-heading text-lg font-bold text-red-700 text-center mb-2">PUBLICATION BLOQUÉE</h3>
                          <p className="text-sm text-red-600 text-center mb-4">
                            Score global {selectedArticle.scoring.globalScore}/100 &lt; seuil 90/100.{' '}
                            Un plan d'action correctif a été généré.
                          </p>

                          {/* Corrective Plan */}
                          {selectedArticle.scoring.correctivePlan && (
                            <div className="mb-4 space-y-2">
                              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Plan d'Action Correctif :</span>
                              {selectedArticle.scoring.correctivePlan.map((action, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-white border border-red-100">
                                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-bold text-red-600 shrink-0">{i + 1}</span>
                                  <span className="text-red-700">{action}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <button
                            onClick={() => { selectArticle(selectedArticle.id); setActiveTab('audit'); }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 transition-all cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-tools-line" />
                            Corriger les problèmes
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scoring Reference */}
                <div className="mt-8 p-6 rounded-2xl bg-white border border-background-200 max-w-4xl">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Référentiel de Scoring — Big Four Digital Thought Leadership Standard™</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { range: '95-100', label: 'BIG FOUR SUPREME', color: '#059669', desc: 'Publication immédiate. Niveau Deloitte/PwC/EY/KPMG.' },
                      { range: '90-94', label: 'BIG FOUR STANDARD', color: '#0A66C2', desc: 'Publication autorisée. Standards professionnels satisfaits.' },
                      { range: '80-89', label: 'CORRECTIONS MINEURES', color: '#D97706', desc: 'Publication différée. 2-3 ajustements requis.' },
                      { range: '60-79', label: 'RÉVISIONS SIGNIFICATIVES', color: '#EA580C', desc: 'Publication bloquée. Plan correctif obligatoire.' },
                      { range: '< 60', label: 'NON CONFORME', color: '#DC2626', desc: 'Publication interdite. Refonte complète requise.' },
                    ].map((ref) => (
                      <div key={ref.range} className="p-3 rounded-xl bg-background-50 border border-background-200/70 text-center">
                        <span className="block text-xl font-bold font-heading" style={{ color: ref.color }}>{ref.range}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ref.color }}>{ref.label}</span>
                        <p className="text-[11px] text-foreground-500 mt-1">{ref.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-12 md:py-16 bg-foreground-950">
            <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                Automatisez votre Social Selling LinkedIn
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Le KOS LinkedIn Social Selling Engine™ transforme chaque contenu KHEPRA EXPERTS en actif LinkedIn niveau Big Four. Audit automatique, génération des 10 livrables, scoring 5 dimensions, blocage si score &lt; 90/100.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/kos-social-media-command"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-amber-400 hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-share-line" />
                  Social Media Command
                </Link>
                <Link
                  to="/kos-linkedin-distribution-program"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-send-plane-line" />
                  Programme Distribution
                </Link>
                <Link
                  to="/kos-content-factory-command"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-stack-line" />
                  Content Factory
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </hubLayout>
  );
}





