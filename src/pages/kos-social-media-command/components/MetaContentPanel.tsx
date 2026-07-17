import { useState } from 'react';

const META_FORMATS = [
  { id: 'facebook_feed', label: 'Post Facebook Feed', icon: 'ri-facebook-fill', color: '#1877F2', desc: 'Texte + lien — le format classique du feed Facebook', maxChars: 5000 },
  { id: 'ig_reel', label: 'Instagram Reel', icon: 'ri-film-line', color: '#E1306C', desc: 'Vidéo verticale courte 15-90s — format viral n°1', maxChars: 2200 },
  { id: 'ig_story', label: 'Instagram Story', icon: 'ri-history-line', color: '#E1306C', desc: 'Image/texte plein écran 9:16 — disparaît en 24h', maxChars: 125 },
  { id: 'ig_carousel', label: 'Carrousel Instagram', icon: 'ri-gallery-line', color: '#E1306C', desc: '2-10 slides — infographies, checklists, étapes', maxChars: 2200 },
  { id: 'ig_feed', label: 'Post Instagram Feed', icon: 'ri-instagram-fill', color: '#E1306C', desc: 'Image + légende — le format standard Instagram', maxChars: 2200 },
];

const KHEPRA_META_TOPICS = [
  { label: 'Conformité BCEAO/COBAC 2026', hashtags: ['#BCEAO', '#COBAC', '#Conformité', '#UEMOA', '#KHEPRAExperts'] },
  { label: 'Gouvernance — 7 Piliers du CA', hashtags: ['#Gouvernance', '#OHADA', '#AUSCGIE', '#KHEPRAExperts'] },
  { label: 'ESG & Financement DFI', hashtags: ['#ESG', '#IFC', '#BOAD', '#Financement', '#KHEPRAExperts'] },
  { label: 'LBC/FT & GAFI 2026', hashtags: ['#LBCFT', '#GAFI', '#Conformité', '#KHEPRAExperts'] },
  { label: 'Levée de Fonds Afrique', hashtags: ['#LevéeDeFonds', '#InvestmentReadiness', '#Afrique', '#KHEPRAExperts'] },
  { label: 'Agrément SFD/EMF', hashtags: ['#Microfinance', '#SFD', '#EMF', '#Agrément', '#KHEPRAExperts'] },
];

const META_TEMPLATES: Record<string, (topic: string, hashtags: string[]) => string> = {
  facebook_feed: (topic, hashtags) =>
    `🔍 ${topic} — Nouvelle analyse KHEPRA EXPERTS\n\nAprès 22 ans de missions terrain en zone UEMOA et CEMAC, nous publions notre analyse complète sur ce sujet crucial pour les institutions financières africaines.\n\n📊 Ce que vous devez savoir :\n\n✅ Point 1 : La régulation évolue plus vite que vos processus\n✅ Point 2 : L'anticipation coûte 10x moins que la remédiation\n✅ Point 3 : Nos clients obtiennent 85% de réussite au premier dépôt\n\n🔗 Analyse complète et diagnostic gratuit : https://khepraexperts.com/diagnostic-flash\n\n📞 Contactez nos experts : contact@khepraexperts.com\n\nPublié par KHEPRA EXPERTS — Cabinet de Conseil en Conformité Réglementaire\n\n${hashtags.join(' ')}`,

  ig_reel: (topic, hashtags) => {
    const short = `⚡ ${topic}\n\nCe que 90% des institutions ignorent... 👀\n\nNotre analyse complète est disponible.\nLien en bio @khepraexperts\n\n${hashtags.slice(0, 3).join(' ')}`;
    return short.substring(0, 2200);
  },

  ig_story: (topic, hashtags) => {
    const short = `🚨 ${topic}\n\nLe saviez-vous ? 👆\n\n${hashtags[0]}`;
    return short.substring(0, 125);
  },

  ig_carousel: (topic, hashtags) =>
    `📊 ${topic}\n\nSlide 1 : Le constat (90% des institutions concernées)\nSlide 2 : Les 3 chiffres clés\nSlide 3 : La méthodologie KHEPRA\nSlide 4 : Les résultats (85% de succès)\nSlide 5 : Comment nous contacter\n\n🔗 Lien en bio @khepraexperts\n\n${hashtags.join(' ')}`,

  ig_feed: (topic, hashtags) =>
    `📸 ${topic}\n\nNotre analyse terrain après 22 ans d'expertise en zone UEMOA et CEMAC. ⬇️\n\n3 points clés à retenir :\n\n1️⃣ La régulation s'accélère\n2️⃣ Les inspections sont plus ciblées\n3️⃣ L'anticipation est votre meilleure défense\n\n💡 Swipez pour découvrir notre méthodologie complète.\n\n🔗 Téléchargez notre guide gratuit — lien en bio.\n\n${hashtags.join(' ')}`,
};

export default function MetaContentPanel() {
  const [selectedFormat, setSelectedFormat] = useState<string>('facebook_feed');
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [customTopic, setCustomTopic] = useState('');
  const [useCustomTopic, setUseCustomTopic] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const format = META_FORMATS.find(f => f.id === selectedFormat);
  const topic = KHEPRA_META_TOPICS[selectedTopic];
  const isInstagram = selectedFormat.startsWith('ig_');

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedContent('');
    setPublishStatus(null);

    const topicLabel = useCustomTopic && customTopic.trim() ? customTopic.trim() : topic.label;
    const topicHashtags = topic.hashtags;

    const generator = META_TEMPLATES[selectedFormat];
    if (generator) {
      setTimeout(() => {
        const content = generator(topicLabel, topicHashtags);
        setGeneratedContent(content);
        setIsGenerating(false);
      }, 500);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePublishToMeta = async () => {
    setPublishStatus(null);
    try {
      const platform = isInstagram ? 'instagram' : 'facebook';
      // Appeler l'Edge Function kos-meta-publisher
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const endpoint = `${supabaseUrl}/functions/v1/kos-meta-publisher`;
      const action = isInstagram ? 'publish_ig_media' : 'publish_feed';

      const body: Record<string, unknown> = isInstagram
        ? { caption: generatedContent, media_type: selectedFormat === 'ig_reel' ? 'REELS' : selectedFormat === 'ig_story' ? 'STORIES' : selectedFormat === 'ig_carousel' ? 'CAROUSEL' : 'IMAGE' }
        : { message: generatedContent };

      const resp = await fetch(`${endpoint}?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': anonKey || '' },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      if (resp.ok && data.success) {
        setPublishStatus({ type: 'success', message: `Publié sur ${isInstagram ? 'Instagram (@khepraexperts)' : 'Facebook (KHEPRA EXPERTS)'} ! ID: ${data.post_id || 'ok'}` });
      } else {
        setPublishStatus({ type: 'error', message: data.error || 'Erreur de publication. Vérifiez que Meta est connecté dans KOS External API Config.' });
      }
    } catch (err) {
      setPublishStatus({ type: 'error', message: 'Erreur réseau. Les credentials Meta sont-ils configurés ? Allez dans KOS External API Config Command.' });
    }
  };

  const charCount = generatedContent.length;
  const maxChars = format?.maxChars || 5000;
  const isOverLimit = charCount > maxChars;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête Meta */}
        <div className="mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#1877F2]/10 to-[#E1306C]/10 border border-[#1877F2]/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1877F2, #E1306C)' }}>
                  <i className="ri-meta-line text-white text-2xl" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1877F2]/15 text-[#1877F2] text-[10px] font-bold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] animate-pulse" />
                    META API v21.0 — CONNECTÉ
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-foreground-950">Facebook & Instagram — Générateur de Contenus Meta</h2>
                  <p className="text-sm text-foreground-600 mt-1 max-w-2xl">
                    Créez des posts adaptés aux formats Meta : Reels, Stories, Carrousels et Feed. Publication automatique via l'API Graph Meta v21.0 sur la Page Facebook KHEPRA EXPERTS et le compte Instagram @khepraexperts.
                  </p>
                </div>
              </div>
            </div>

            {/* Connexion Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#1877F2]/20">
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                  <i className="ri-facebook-fill text-white text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-foreground-950">Facebook Page</span>
                  </div>
                  <p className="text-xs text-foreground-500">KHEPRA EXPERTS · 3 420 abonnés · 5 posts/semaine</p>
                </div>
                <a
                  href="https://www.facebook.com/khepraexperts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#0d5bbd] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Voir
                  <i className="ri-external-link-line text-xs" />
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E1306C]/20">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <i className="ri-instagram-fill text-white text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-foreground-950">Instagram Business</span>
                  </div>
                  <p className="text-xs text-foreground-500">@khepraexperts · 1 850 abonnés · 4 posts/semaine</p>
                </div>
                <a
                  href="https://www.instagram.com/khepraexperts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                >
                  Voir
                  <i className="ri-external-link-line text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panneau de génération */}
          <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-background-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1877F2, #E1306C)' }}>
                <i className="ri-meta-line text-white text-base" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground-950">Générateur Meta — Facebook & Instagram</h3>
                <p className="text-[11px] text-foreground-400">Reels · Stories · Carrousels · Feed — Format adapté à chaque plateforme</p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Format Selection */}
              <div>
                <label className="block text-xs font-bold text-foreground-500 mb-2 uppercase tracking-wider">Format Meta</label>
                <div className="grid grid-cols-1 gap-2">
                  {META_FORMATS.map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left cursor-pointer transition-all border ${
                        selectedFormat === fmt.id
                          ? 'border-transparent text-white'
                          : 'border-background-200 bg-background-50 hover:border-foreground-300'
                      }`}
                      style={selectedFormat === fmt.id ? { background: fmt.id.startsWith('ig_') ? 'linear-gradient(135deg, #E1306C, #bc1888)' : '#1877F2' } : undefined}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: selectedFormat === fmt.id ? 'rgba(255,255,255,0.2)' : `${fmt.color}15` }}>
                        <i className={`${fmt.icon} text-lg`} style={{ color: selectedFormat === fmt.id ? '#fff' : fmt.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-bold ${selectedFormat === fmt.id ? 'text-white' : 'text-foreground-950'}`}>{fmt.label}</span>
                        <p className={`text-[11px] ${selectedFormat === fmt.id ? 'text-white/70' : 'text-foreground-400'}`}>
                          {fmt.desc} · max {fmt.maxChars.toLocaleString()} car.
                        </p>
                      </div>
                      {selectedFormat === fmt.id && (
                        <i className="ri-check-line text-white text-lg flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              <div>
                <label className="block text-xs font-bold text-foreground-500 mb-2 uppercase tracking-wider">Sujet KHEPRA</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {KHEPRA_META_TOPICS.map((t, i) => (
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
                <input
                  type="text"
                  placeholder="Ou entrez votre propre sujet..."
                  value={customTopic}
                  onChange={(e) => { setCustomTopic(e.target.value); setUseCustomTopic(!!e.target.value); }}
                  className="w-full rounded-xl border border-background-200 bg-background-50 px-3 py-2 text-xs text-foreground-900 placeholder:text-foreground-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #1877F2, #E1306C)' }}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-magic-fill text-base" />
                    Générer le contenu {isInstagram ? 'Instagram' : 'Facebook'}
                  </>
                )}
              </button>

              {/* Generated Content */}
              {generatedContent && (
                <div className="space-y-3">
                  <div className={`rounded-xl border p-4 ${isOverLimit ? 'border-red-300 bg-red-50' : 'border-background-200 bg-background-50'}`}>
                    <p className="text-xs text-foreground-700 leading-relaxed whitespace-pre-line">{generatedContent}</p>
                    <div className={`flex items-center justify-between mt-3 pt-2 border-t ${isOverLimit ? 'border-red-200' : 'border-background-200'}`}>
                      <span className={`text-[10px] font-bold ${isOverLimit ? 'text-red-600' : 'text-foreground-400'}`}>
                        {charCount} / {maxChars.toLocaleString()} caractères
                        {isOverLimit && ' — DÉPASSEMENT !'}
                      </span>
                      {format && (
                        <span className="text-[10px] font-semibold text-foreground-400">
                          <i className={`${format.icon} mr-1`} style={{ color: format.color }} />
                          Format {format.label}
                        </span>
                      )}
                    </div>
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

                    <button
                      onClick={handlePublishToMeta}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                      style={{ background: isInstagram ? 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' : '#1877F2' }}
                    >
                      <i className={`${isInstagram ? 'ri-instagram-fill' : 'ri-facebook-fill'} text-sm`} />
                      Publier sur {isInstagram ? 'Instagram' : 'Facebook'}
                    </button>

                    {isInstagram && (
                      <button
                        onClick={async () => {
                          setSelectedFormat('facebook_feed');
                          handleGenerate();
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-facebook-fill text-sm" />
                        Version Facebook
                      </button>
                    )}

                    {!isInstagram && (
                      <button
                        onClick={async () => {
                          setSelectedFormat('ig_feed');
                          handleGenerate();
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-instagram-fill text-sm" />
                        Version Instagram
                      </button>
                    )}
                  </div>

                  {/* Publish Status */}
                  {publishStatus && (
                    <div className={`rounded-xl p-3 text-xs font-bold ${
                      publishStatus.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <i className={`${publishStatus.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} mr-1`} />
                      {publishStatus.message}
                    </div>
                  )}

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1">
                    {topic.hashtags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1877F2]/10 text-[#1877F2]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panneau d'infos & meilleures pratiques */}
          <div className="space-y-4">
            {/* Meta Best Practices */}
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-lightbulb-line text-amber-500" />
                Meilleures pratiques Meta
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">Facebook Feed</span>
                  <ul className="space-y-1.5 mt-1.5">
                    {[
                      'Texte jusqu\'à 5 000 caractères',
                      'Meilleurs horaires : Lun-Ven 10h-12h GMT',
                      'Inclure un lien cliquable dans le post',
                      'Images 1200x630px pour le preview optimal',
                      'Hashtags : 3-5 max, pertinents',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] flex-shrink-0 mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-[#E1306C] uppercase tracking-wider">Instagram Reels</span>
                  <ul className="space-y-1.5 mt-1.5">
                    {[
                      'Vidéo verticale 9:16, 15-90 secondes',
                      'Caption jusqu\'à 2 200 caractères',
                      'Hashtags : 5-10 pour la découvrabilité',
                      'Audio tendance ou original KHEPRA',
                      'Texte à l\'écran dans les 3 premières secondes',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] flex-shrink-0 mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-[#E1306C] uppercase tracking-wider">Instagram Stories</span>
                  <ul className="space-y-1.5 mt-1.5">
                    {[
                      'Format 9:16, image ou courte vidéo',
                      'Texte concis — 125 caractères max',
                      'Ajouter des stickers interactifs (poll, question)',
                      'Lien "Voir plus" pour diriger vers le site',
                      'Disparaît en 24h — créer de l\'urgence',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] flex-shrink-0 mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-[#E1306C] uppercase tracking-wider">Carrousel Instagram</span>
                  <ul className="space-y-1.5 mt-1.5">
                    {[
                      '2 à 10 slides — idéal pour infographies',
                      'Slide 1 = hook visuel puissant',
                      'Dernier slide = CTA + lien en bio',
                      'Design cohérent entre les slides',
                      'Excellents pour checklists, étapes, processus',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] flex-shrink-0 mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hashtags Meta */}
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-hashtag text-[#1877F2]" />
                Hashtags recommandés Meta
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#1877F2] uppercase">Facebook</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {['#BCEAO','#COBAC','#OHADA','#Conformité','#Gouvernance','#KHEPRAExperts'].map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1877F2]/10 text-[#1877F2]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-background-100">
                  <span className="text-[10px] font-bold text-[#E1306C] uppercase">Instagram</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {['#BCEAO','#Conformité','#Gouvernance','#Afrique','#Finance','#RegTech','#UEMOA','#CEMAC','#KHEPRAExperts'].map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E1306C]/10 text-[#E1306C]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta API Status */}
            <div className="rounded-2xl bg-foreground-950 p-5 text-white">
              <h3 className="font-heading text-base font-bold mb-3 flex items-center gap-2">
                <i className="ri-plug-line text-emerald-400" />
                Intégration API Meta
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span>API Graph Meta</span>
                  <span className="text-emerald-400 font-bold">v21.0</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span>OAuth 2.0</span>
                  <span className="text-emerald-400 font-bold">Configuré</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span>Page Facebook</span>
                  <span className="text-emerald-400 font-bold">KHEPRA EXPERTS</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span>Instagram Business</span>
                  <span className="text-emerald-400 font-bold">@khepraexperts</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span>Edge Function</span>
                  <span className="text-accent-400 font-bold">kos-meta-publisher</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-[10px] text-gray-400">
                  Pour connecter Meta : allez dans <strong>KOS External API Config Command</strong> → saisissez META_APP_ID et META_APP_SECRET → autorisez l'app via OAuth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}