import { useState } from 'react';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';
import { useLinkedInShare } from '@/hooks/useLinkedInShare';
import { getOgPreviewUrl } from '@/utils/ogPreview';

const CONTENT_TEMPLATES = [
  { id: 'insight', label: 'Insight Réglementaire', icon: 'ri-scales-3-line', platform: 'linkedin', color: '#0A66C2' },
  { id: 'guide', label: 'Guide / Ressource Gratuite', icon: 'ri-download-2-line', platform: 'linkedin', color: '#0A66C2' },
  { id: 'analyse', label: 'Analyse de Tendance', icon: 'ri-bar-chart-2-line', platform: 'linkedin', color: '#0A66C2' },
  { id: 'question', label: 'Question / Engagement', icon: 'ri-question-answer-line', platform: 'linkedin', color: '#0A66C2' },
  { id: 'x_stat', label: 'X — Stat Choc', icon: 'ri-twitter-x-fill', platform: 'x', color: '#1A1A1A' },
  { id: 'x_thread', label: 'X — Thread Takeaways', icon: 'ri-list-check', platform: 'x', color: '#1A1A1A' },
];

const KHEPRA_TOPICS = [
  { label: 'Conformité BCEAO 2026', url: 'https://khepraexperts.com/diagnostic-flash', hashtags: ['#BCEAO', '#Conformité', '#UEMOA'] },
  { label: 'Gouvernance & Conseil d\'Administration', url: 'https://khepraexperts.com/services/gouvernance-fiscalite-internationale', hashtags: ['#Gouvernance', '#OHADA', '#KHEPRAExperts'] },
  { label: 'Prix de Transfert BEPS Afrique', url: 'https://khepraexperts.com/prix-de-transfert', hashtags: ['#PrixDeTransfert', '#Fiscalité', '#UEMOA'] },
  { label: 'ESG & Financement DFI', url: 'https://khepraexperts.com/services/due-diligence-acquisition', hashtags: ['#ESG', '#Gouvernance', '#KHEPRAExperts'] },
  { label: 'LBC/FT & GAFI 2026', url: 'https://khepraexperts.com/diagnostic-flash', hashtags: ['#LBCFT', '#Conformité', '#COBAC'] },
  { label: 'Inspection COBAC', url: 'https://khepraexperts.com/services/audit-pre-inspection-bceao', hashtags: ['#COBAC', '#AuditInterne', '#CEMAC'] },
  { label: 'Transformation Digitale SFD', url: 'https://khepraexperts.com/services/transformation-digitale', hashtags: ['#TransformationDigitale', '#BCEAO', '#UEMOA'] },
  { label: 'Levée de Fonds Afrique', url: 'https://khepraexperts.com/services/levee-de-fonds', hashtags: ['#PrixDeTransfert', '#Gouvernance', '#OHADA'] },
];

const POST_GENERATORS: Record<string, (topic: string, url: string, hashtags: string[]) => string> = {
  insight: (topic, url, hashtags) =>
    `🔍 ${topic} — Ce que vous devez absolument savoir en 2026.\n\nAprès 22 ans de missions terrain en zone UEMOA et CEMAC, un constat s'impose : les dirigeants qui anticipent les exigences réglementaires évitent les sanctions coûteuses.\n\n📊 Nos 3 points clés :\n\n1️⃣ La régulation évolue — vos processus doivent suivre\n2️⃣ L'anticipation coûte 10x moins que la remédiation forcée\n3️⃣ Les meilleures institutions font de la conformité un avantage compétitif\n\n🔗 Notre analyse complète : ${url}\n\nPublié par KHEPRA EXPERTS\n\n${hashtags.join(' ')} #KHEPRAExperts`,

  guide: (topic, url, hashtags) =>
    `📥 [RESSOURCE GRATUITE] ${topic}\n\nNous publions aujourd'hui une ressource que nos clients utilisent depuis des années — maintenant accessible gratuitement.\n\nCe que vous obtenez :\n✅ Méthodologie éprouvée sur 50+ missions\n✅ Templates prêts à l'emploi\n✅ Plan d'action priorisé sur 90 jours\n✅ Checklist de conformité\n\n📊 Résultat : 85% de réussite au premier dépôt pour les institutions qui l'ont appliqué.\n\n🔗 Téléchargement gratuit : ${url}\n\nPublié par KHEPRA EXPERTS\n\n${hashtags.join(' ')} #KHEPRAExperts`,

  analyse: (topic, url, hashtags) =>
    `📊 ${topic} — Notre analyse exclusive 2026.\n\nLe paysage réglementaire africain est en mutation profonde. Voici les 3 tendances que vous ne pouvez pas ignorer :\n\n🔴 Tendance 1 : Le régulateur impose une documentation plus exigeante\n🟡 Tendance 2 : Les inspections sont plus fréquentes et plus ciblées\n🟢 Tendance 3 : Les institutions proactives négocient des transitions favorables\n\n💡 Notre recommandation : commencez votre gap analysis maintenant.\n\n🔗 Analyse complète : ${url}\n\nPublié par KHEPRA EXPERTS\n\n${hashtags.join(' ')} #KHEPRAExperts`,

  question: (topic, url, hashtags) =>
    `🤔 Une question pour les dirigeants d'institutions financières :\n\n${topic} — êtes-vous vraiment prêts ?\n\n90% des établissements découvrent leurs gaps de conformité lors d'une inspection. Ne soyez pas l'un d'eux.\n\n👇 En commentaire : quel est votre plus grand défi de conformité en 2026 ?\n\n🔗 Notre diagnostic gratuit : ${url}\n\nPublié par KHEPRA EXPERTS\n\n${hashtags.join(' ')} #KHEPRAExperts`,

  x_stat: (topic, url, hashtags) => {
    const short = `⚡ ${topic}\n\n90% des institutions découvrent leurs gaps lors de l'inspection. Un diagnostic KHEPRA en 10 min peut vous épargner 12 mois de remédiation.\n\n${url.replace('https://khepraexperts.com', '')} ${hashtags[0]}`;
    return short.substring(0, 270);
  },

  x_thread: (topic, url, hashtags) => {
    const short = `${topic} — les 3 points clés :\n\n1️⃣ Anticipez la réglementation avant l'inspecteur\n2️⃣ Documentez chaque décision du Conseil\n3️⃣ Testez votre dispositif en conditions réelles\n\n📎 Analyse complète : ${url}\n\n${hashtags[0]}`;
    return short.substring(0, 280);
  },
};

interface GeneratePostPanelProps {
  onPostGenerated?: (post: Partial<SocialQueueItem>) => void;
}

export default function GeneratePostPanel({ onPostGenerated }: GeneratePostPanelProps) {
  const { shareToLinkedIn, LINKEDIN_COMPANY_PAGE } = useLinkedInShare();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('insight');
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [customTopic, setCustomTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useCustomTopic, setUseCustomTopic] = useState(false);

  const topic = KHEPRA_TOPICS[selectedTopic];
  const template = CONTENT_TEMPLATES.find(t => t.id === selectedTemplate);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedContent('');

    const topicLabel = useCustomTopic && customTopic.trim()
      ? customTopic.trim()
      : topic.label;
    const topicUrl = topic.url;
    const topicHashtags = topic.hashtags;

    const generator = POST_GENERATORS[selectedTemplate];
    if (generator) {
      setTimeout(() => {
        const content = generator(topicLabel, topicUrl, topicHashtags);
        setGeneratedContent(content);
        setIsGenerating(false);
        if (onPostGenerated) {
          onPostGenerated({
            platform: template?.platform || 'linkedin',
            post_type: selectedTemplate,
            title: topicLabel,
            content,
            source_url: topicUrl,
            hashtags: topicHashtags,
            status: 'draft',
            priority: 3,
            engagement_estimate: 'medium',
          });
        }
      }, 600);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShareLinkedIn = () => {
    const fakePost: SocialQueueItem = {
      id: Date.now(),
      platform: 'linkedin',
      post_type: selectedTemplate,
      title: useCustomTopic && customTopic ? customTopic : topic.label,
      content: generatedContent,
      excerpt: generatedContent.substring(0, 200),
      source_url: topic.url,
      hashtags: topic.hashtags,
      template_id: null,
      scheduled_for: null,
      generated_at: new Date().toISOString(),
      status: 'draft',
      priority: 3,
      engagement_estimate: 'medium',
      agent_generated: 'kos-manual-generator',
      metadata: {},
      created_at: new Date().toISOString(),
    };
    shareToLinkedIn(fakePost);
  };

  const handleShareX = () => {
    const text = encodeURIComponent(generatedContent.substring(0, 240));
    const ogUrl = getOgPreviewUrl(topic.url);
    const xUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(ogUrl)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-background-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
          <i className="ri-magic-line text-white text-base" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground-950">Générateur de Posts KOS</h3>
          <p className="text-[11px] text-foreground-400">LinkedIn & X — Niveau Big Four — Publier en 1 clic</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Template Selection */}
        <div>
          <label className="block text-xs font-bold text-foreground-500 mb-2 uppercase tracking-wider">Type de post</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CONTENT_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                  selectedTemplate === tmpl.id
                    ? 'border-transparent text-white'
                    : 'border-background-200 text-foreground-600 bg-background-50 hover:border-foreground-300'
                }`}
                style={selectedTemplate === tmpl.id ? { backgroundColor: tmpl.color } : undefined}
              >
                <i className={`${tmpl.icon} text-sm`} />
                <span className="truncate">{tmpl.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        <div>
          <label className="block text-xs font-bold text-foreground-500 mb-2 uppercase tracking-wider">Sujet KHEPRA</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {KHEPRA_TOPICS.map((t, i) => (
              <button
                key={i}
                onClick={() => { setSelectedTopic(i); setUseCustomTopic(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  !useCustomTopic && selectedTopic === i
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ou entrez votre propre sujet..."
              value={customTopic}
              onChange={(e) => { setCustomTopic(e.target.value); setUseCustomTopic(!!e.target.value); }}
              className="flex-1 rounded-xl border border-background-200 bg-background-50 px-3 py-2 text-xs text-foreground-900 placeholder:text-foreground-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <i className="ri-magic-fill text-base" />
              Générer le post {template?.platform === 'x' ? 'X/Twitter' : 'LinkedIn'}
            </>
          )}
        </button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-3">
            <div className="rounded-xl border border-background-200 bg-background-50 p-4">
              <p className="text-xs text-foreground-700 leading-relaxed whitespace-pre-line">{generatedContent}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  copied ? 'bg-emerald-600 text-white' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                }`}
              >
                <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} text-sm`} />
                {copied ? 'Copié !' : 'Copier'}
              </button>

              {template?.platform === 'linkedin' || template?.id.includes('insight') || template?.id.includes('guide') || template?.id.includes('analyse') || template?.id.includes('question') ? (
                <button
                  onClick={handleShareLinkedIn}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#004182] cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-linkedin-fill text-sm" />
                  Partager sur LinkedIn
                </button>
              ) : (
                <button
                  onClick={handleShareX}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#1A1A1A] text-white hover:bg-[#333] cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-twitter-x-fill text-sm" />
                  Partager sur X
                </button>
              )}

              {template?.platform !== 'x' && !template?.id.startsWith('x_') && (
                <button
                  onClick={handleShareX}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-background-100 text-[#1A1A1A] hover:bg-background-200 border border-[#1A1A1A]/20 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-twitter-x-fill text-sm" />
                  Adapter pour X
                </button>
              )}

              <a
                href={LINKEDIN_COMPANY_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-foreground-400 hover:text-foreground-600 ml-auto transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-building-line text-xs" />
                Page entreprise
              </a>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1">
              {KHEPRA_TOPICS[selectedTopic]?.hashtags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0A66C2]/10 text-[#0A66C2]">
                  {tag}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background-200 text-foreground-600">
                #KHEPRAExperts
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}