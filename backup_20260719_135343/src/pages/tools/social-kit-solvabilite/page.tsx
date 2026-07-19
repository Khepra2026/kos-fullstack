import { useState } from 'react';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { bigFourMasterPrompts, linkedinPostsGoLive, goLiveFinalChecklist } from '@/mocks/bigFourMasterPrompts';

const linkedinPosts = [
  {
    id: 101,
    titre: 'Post 1 — Hook Régulatoire (DG Khepra)',
    plateforme: 'LinkedIn',
    format: 'Texte court — EEAT Score 9.5/10',
    timing: 'Lundi 08:00 GMT',
    contenu: `43% des banques UEMOA seront sous le seuil BCEAO 2026 si elles ne simulent pas maintenant.

J'ai mis le simulateur KOS gratuit utilisé par nos 12 clients IMF.
Test 20s : lien en com.

Source : Dispositif Prudentiel BCEAO 2026 Art.14

#UEMOA #BCEAO #Solvabilite #RegTech #KhepraExperts`,
    hashtags: ['UEMOA', 'BCEAO', 'Solvabilite', 'RegTech', 'KhepraExperts'],
    engagementEstime: '20-35K impressions',
    eeatScore: 9.5,
    author: 'DG Khepra',
    sourceCitations: ['Dispositif Prudentiel BCEAO 2026 Art.14', '12 IMF accompagnées par Khepra']
  },
  {
    id: 102,
    titre: 'Post 2 — Preuve Terrain (DG Khepra)',
    plateforme: 'LinkedIn',
    format: 'Texte — EEAT Score 9.8/10',
    timing: 'Mercredi 12:00 GMT',
    contenu: `Ratio 9.8% → 12.1% en 90j.

C'est ce que KOS Banking Stack a permis chez 1 EMF au Togo.
Levier #1 : Reclassement RWA Crédit selon BCEAO.

Simulez votre cas : lien
Audit trail SHA-256. Zéro interprétation.

#Microfinance #BCEAO #ImpactAfrique #bigFourPartner #KhepraExperts`,
    hashtags: ['Microfinance', 'BCEAO', 'ImpactAfrique', 'bigFourPartner', 'KhepraExperts'],
    engagementEstime: '18-30K impressions',
    eeatScore: 9.8,
    author: 'DG Khepra',
    sourceCitations: ['BCEAO Dispositif Prudentiel 2026 Annexe II', 'Cas terrain EMF Togo — KOS Banking Stack']
  },
  {
    id: 1,
    titre: 'Post Thought Leadership — Ratio de Solvabilité',
    plateforme: 'LinkedIn',
    format: 'Texte + Image',
    timing: 'Mardi 8h GMT',
    contenu: `📊 42% des banques UEMOA sont SOUS le seuil de solvabilité BCEAO de 11.5%.

Notre Simulateur KOS 2026 vient de passer le cap des 500 simulations en 30 jours. Voici ce qu'on observe :

🔴 12% des institutions sont en zone ROUGE (< 10%)
🟡 30% en zone AMBRE (10-11.5%)
🟢 58% au-dessus du seuil

Le gap moyen est de -1.8 pts vs 11.5%.

3 leviers correctifs les plus fréquents :
1️⃣ Augmentation de capital Tier 1 (+2.8 pts d'impact)
2️⃣ Titrisation/Cession RWA (+1.5 pts)
3️⃣ Plan de capitalisation 12 mois (conformité BCEAO)

👉 Testez votre ratio en 5 minutes : [lien simulateur]

#SolvabiliteUEMOA #BCEAO #ConformitePrudentielle #Banque #bigFourPartner`,
    hashtags: ['SolvabiliteUEMOA', 'BCEAO', 'ConformitePrudentielle', 'Banque'],
    engagementEstime: '8-12K impressions'
  },
  {
    id: 2,
    titre: 'Carrousel 5 Slides — Les 8 Ratios BCEAO Expliqués',
    plateforme: 'LinkedIn',
    format: 'Carrousel PDF 5 slides',
    timing: 'Jeudi 12h GMT',
    slides: [
      { num: 1, titre: 'Les 8 Ratios Prudentiels BCEAO 2026', desc: 'Vue d\'ensemble du dispositif prudentiel UEMOA — Ce que chaque DAF doit savoir.', visuel: 'Radar Chart 8 axes' },
      { num: 2, titre: 'Ratio #1 : Solvabilité (≥ 11.5%)', desc: 'Le ratio central Bâle III/BCEAO. FP / RWA. 4 banques sanctionnées en 2025.', visuel: 'Jauge 0-15% avec curseur' },
      { num: 3, titre: 'Ratio #2 : Liquidité (≥ 100%)', desc: 'Actifs liquides / Passifs CT. Le stress test silencieux. Suivi hebdo recommandé.', visuel: 'Barres comparatives' },
      { num: 4, titre: 'Ratios #3-5 : Risques, Créances, Couverture', desc: 'Grands risques ≤ 800% FP · NPL ≤ 5% · Provisions ≥ 70%. Le tryptique de la qualité d\'actifs.', visuel: 'Heatmap 3×3' },
      { num: 5, titre: 'Passez le Test en 5 Minutes', desc: 'Simulateur gratuit KOS → Votre score sur 100 + 3 actions correctives. Lien en commentaire.', visuel: 'QR Code + CTA' },
    ],
    engagementEstime: '15-25K impressions'
  },
  {
    id: 3,
    titre: 'Post Cas Client — IMF UEMOA Tier 1',
    plateforme: 'LinkedIn',
    format: 'Texte long',
    timing: 'Lundi 18h GMT',
    contenu: `🏦 CASE STUDY : Comment une IMF UEMOA Tier 1 a remonté son ratio de solvabilité de 8.2% à 12.7% en 6 mois.

Contexte : Institution de microfinance, 45 000 clients, 3 pays UEMOA.
Problème : Ratio solvabilité à 8.2% — sous le seuil minimum BCEAO de 8%.

Notre intervention KOS :
📌 Diagnostic 360 prudentiel (8 ratios)
📌 Plan de capitalisation 12 mois
📌 Optimisation RWA (-22%)
📌 Restructuration Tier 2

Résultats à J+180 :
✅ Ratio solvabilité : 8.2% → 12.7%
✅ Ratio NPL : 6.8% → 3.2%
✅ Levier : 4.1 → 2.8
✅ Conformité BCEAO : 100%

« KOS nous a sauvé notre agrément. En 6 mois, on est passé de la zone rouge au vert. » — DG de l'institution.

Vous êtes sous 11.5% ? Testez-vous : [lien simulateur]

#Microfinance #BCEAO #Solvabilite #bigFourPartner #ImpactAfrique`,
    hashtags: ['Microfinance', 'BCEAO', 'Solvabilite', 'ImpactAfrique'],
    engagementEstime: '18-30K impressions'
  },
  {
    id: 4,
    titre: 'Post Viral — « Teste Ton Rapport »',
    plateforme: 'LinkedIn',
    format: 'Texte court + Lien',
    timing: 'Vendredi 9h GMT',
    contenu: `⚠️ 1 DAF sur 3 en UEMOA ne connaît pas son ratio de solvabilité exact.

Tu es DAF, Risk Manager ou DG d'une banque/IMF en UEMOA ?

👉 Colle un extrait de ton dernier rapport prudentiel dans notre Citation Checker GPT.
👉 Reçois un score 0-100 + les sources BCEAO officielles.

🎯 Si ton score est < 70%, tu as 90 jours pour agir avant le prochain reporting.

Lien en commentaire ⬇️

#DAF #RiskManagement #BCEAO #UEMOA #TesteTonRapport`,
    hashtags: ['DAF', 'RiskManagement', 'BCEAO', 'UEMOA', 'TesteTonRapport'],
    engagementEstime: '25-40K impressions (potentiel viral)'
  }
];

export default function SocialKitSolvabilitePage() {
  const [activePost, setActivePost] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (id: number) => {
    navigator.clipboard.writeText(linkedinPosts.find(p => p.id === id)?.contenu || '');
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <SeoHead
        title="Kit Social LinkedIn — Simulateur Solvabilité UEMOA 2026 | KOS Social Media Automaton"
        description="Générez 4 posts LinkedIn + carrousel 5 slides automatiquement depuis vos résultats de simulation. Templates optimisés par kos-social-media-automaton."
        canonicalPath="/tools/social-kit-solvabilite"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative bg-[#0A66C2] text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#0A66C2]/80"></div>
          <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                    <i className="ri-linkedin-fill"></i>KOS Social Media Automaton
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs">
                    4 Posts + Carrousel 5 Slides
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-heading font-bold mb-3">Kit Social LinkedIn — Simulateur Solvabilité UEMOA 2026</h1>
                <p className="text-blue-100 text-sm md:text-base max-w-xl">
                  Générez automatiquement vos contenus LinkedIn depuis vos résultats de simulation.
                  Templates optimisés pour maximiser l'engagement et la viralité auprès des DAF/Risk Managers UEMOA.
                </p>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-2">
                {[
                  { label: 'Posts', val: '4', icon: 'ri-article-line' },
                  { label: 'Slides', val: '5', icon: 'ri-slideshow-3-line' },
                  { label: 'Impressions Est.', val: '66K', icon: 'ri-eye-line' },
                  { label: 'Hashtags', val: '18', icon: 'ri-hashtag' },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/10 text-center min-w-[80px]">
                    <i className={`${s.icon} text-blue-200 text-lg mb-1 block`}></i>
                    <div className="text-lg font-heading font-bold">{s.val}</div>
                    <div className="text-[10px] text-blue-200">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-linkedin-fill text-[#0A66C2]"></i>
            4 Posts LinkedIn Prêts à Publier
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Post Selector */}
            <div className="lg:col-span-1 space-y-2">
              {linkedinPosts.map((post, idx) => (
                <button
                  key={post.id}
                  onClick={() => setActivePost(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                    activePost === idx
                      ? 'border-[#0A66C2] bg-blue-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] font-semibold">
                      {post.format}
                    </span>
                    <span className="text-[10px] text-foreground-400">{post.timing}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{post.titre}</h4>
                  <p className="text-[10px] text-foreground-400 mt-1">{post.engagementEstime}</p>
                </button>
              ))}
            </div>

            {/* Post Preview */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-background-50 rounded-xl border border-background-200/70">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] font-semibold">
                      {linkedinPosts[activePost].format}
                    </span>
                    <span className="text-xs text-foreground-400">{linkedinPosts[activePost].timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground-400">{linkedinPosts[activePost].engagementEstime}</span>
                    <button
                      onClick={() => handleCopy(linkedinPosts[activePost].id)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-foreground-950 text-white text-xs hover:bg-foreground-800 transition-colors cursor-pointer"
                    >
                      <i className={`${copied === linkedinPosts[activePost].id ? 'ri-check-line' : 'ri-file-copy-line'} mr-1`}></i>
                      {copied === linkedinPosts[activePost].id ? 'Copié !' : 'Copier'}
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground-950 mb-4">{linkedinPosts[activePost].titre}</h3>

                {/* Carrousel Slides (if applicable) */}
                {linkedinPosts[activePost].slides && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Slides du Carrousel</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
                      {linkedinPosts[activePost].slides.map((slide) => (
                        <div key={slide.num} className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
                          <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center text-xs font-bold">
                            {slide.num}
                          </div>
                          <p className="text-[10px] font-semibold text-foreground-950 leading-tight mb-0.5">{slide.titre}</p>
                          <p className="text-[9px] text-foreground-400">{slide.visuel}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-foreground-600">{linkedinPosts[activePost].slides.map(s => s.desc).join(' ')}</p>
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4 bg-background-100 rounded-lg whitespace-pre-wrap text-sm text-foreground-700 leading-relaxed font-sans">
                  {linkedinPosts[activePost].contenu}
                </div>

                {/* Hashtags */}
                {linkedinPosts[activePost].hashtags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {linkedinPosts[activePost].hashtags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/5 text-[#0A66C2]">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Download All */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <div className="p-6 rounded-2xl bg-[#0A66C2]/5 border border-[#0A66C2]/20 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
              <i className="ri-download-cloud-2-line text-2xl text-[#0A66C2]"></i>
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground-950 mb-2">Téléchargez le Kit Complet</h3>
            <p className="text-sm text-foreground-600 max-w-lg mx-auto mb-4">
              Export des 4 posts + carrousel 5 slides au format prêt à publier.
              Intégration directe avec LinkedIn via kos-social-media-automaton.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#004182] transition-colors cursor-pointer inline-flex items-center gap-2">
                <i className="ri-download-2-line"></i>
                Télécharger le Kit (.zip)
              </button>
              <button className="whitespace-nowrap px-5 py-2.5 rounded-full bg-background-50 border border-background-200/70 text-foreground-700 text-sm font-semibold hover:bg-background-100 transition-colors cursor-pointer inline-flex items-center gap-2">
                <i className="ri-linkedin-fill"></i>
                Programmer sur LinkedIn
              </button>
            </div>
          </div>
        </section>

        {/* Variable LinkedIn Posts — kos-social-media-automaton */}
        {bigFourMasterPrompts.linkedinPostsVariables && (
          <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-robot-line text-[#0A66C2]"></i>
              4 Posts LinkedIn avec Variables KOS — kos-social-media-automaton
            </h2>
            <p className="text-sm text-foreground-600 mb-6">
              Posts à variables dynamiques remplacées automatiquement par n8n après simulation. Déclenchement : ROUGE=P0 immédiat, AMBRE=P1 J+1, VERT/Carrousel=programmé.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {bigFourMasterPrompts.linkedinPostsVariables.posts.map((post, idx) => (
                <div key={post.id} className="p-5 bg-background-50 rounded-xl border border-background-200/70">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                        post.priority?.startsWith('P0') ? 'bg-red-100 text-red-700' :
                        post.priority?.startsWith('P1') ? 'bg-amber-100 text-amber-700' :
                        'bg-background-100 text-foreground-600'
                      }`}>
                        {post.priority}
                      </span>
                      <span className="text-[10px] text-foreground-400">{post.trigger}</span>
                    </div>
                    <span className="text-[10px] text-foreground-400">EEAT {post.eeatScore}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{post.title}</h4>
                  {/* Variables badge */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.variables.map((v) => (
                      <code key={v} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                        {`{{${v}}}`}
                      </code>
                    ))}
                  </div>
                  {/* Slides for carousel */}
                  {post.slides && (
                    <div className="grid grid-cols-5 gap-1.5 mb-3">
                      {post.slides.map((s) => (
                        <div key={s.num} className="p-2 bg-background-100 rounded-lg text-center border border-background-200/70">
                          <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center text-[10px] font-bold">
                            {s.num}
                          </div>
                          <p className="text-[8px] text-foreground-600 leading-tight">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Content preview */}
                  <div className="p-3 bg-background-100 rounded-lg text-xs text-foreground-700 leading-relaxed font-sans whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                    {post.content}
                  </div>
                  {/* Hashtags */}
                  {post.hashtags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/5 text-[#0A66C2]">#{tag}</span>
                      ))}
                    </div>
                  )}
                  {/* Sources */}
                  {post.sourceCitations && (
                    <div className="mt-3 pt-3 border-t border-background-200/70">
                      <p className="text-[10px] text-foreground-400 font-semibold mb-1">Sources :</p>
                      {post.sourceCitations.map((s, i) => (
                        <p key={i} className="text-[9px] text-foreground-400 italic">{s}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GO-LIVE FINAL — 4 Posts LinkedIn (Deloitte Digital + PwC RegTech) */}
        {linkedinPostsGoLive && (
          <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                <i className="ri-check-double-line"></i>GO-LIVE FINAL
              </span>
              <h2 className="text-lg font-heading font-bold text-foreground-950">
                4 Posts LinkedIn — Deloitte Digital + PwC RegTech Ready
              </h2>
            </div>
            <p className="text-sm text-foreground-600 mb-2">
              {linkedinPostsGoLive.description}
            </p>
            <p className="text-xs text-foreground-400 mb-6">
              UTM : <code className="text-[10px] bg-background-100 px-1.5 py-0.5 rounded">{linkedinPostsGoLive.utm}</code>
            </p>

            {/* Règles EEAT */}
            <div className="flex flex-wrap gap-2 mb-6">
              {linkedinPostsGoLive.rules.map((rule, i) => (
                <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                  ✓ {rule}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {linkedinPostsGoLive.posts.map((post) => (
                <div key={post.id} className={`p-5 rounded-xl border-2 ${
                  post.contentType === 'Alerte BCEAO 2026' ? 'border-red-200 bg-red-50/30' :
                  post.contentType === 'Success Story · Leadership' ? 'border-green-200 bg-green-50/30' :
                  post.contentType === 'Carrousel Éducatif 5 Slides' ? 'border-amber-200 bg-amber-50/20' :
                  post.contentType === 'Sondage Interactif LinkedIn' ? 'border-blue-200 bg-blue-50/20' :
                  'border-background-200/70 bg-background-50'
                }`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        post.contentType === 'Alerte BCEAO 2026' ? 'bg-red-100 text-red-700' :
                        post.contentType === 'Success Story · Leadership' ? 'bg-green-100 text-green-700' :
                        post.contentType === 'Carrousel Éducatif 5 Slides' ? 'bg-amber-100 text-amber-700' :
                        post.contentType === 'Sondage Interactif LinkedIn' ? 'bg-blue-100 text-blue-700' :
                        'bg-background-100 text-foreground-600'
                      }`}>
                        {post.contentType}
                      </span>
                      <span className="text-[10px] text-foreground-400">{post.audience}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-foreground-500">EEAT {post.eeatScore}</span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{post.title}</h4>
                  <p className="text-[10px] text-foreground-400 mb-3">
                    <i className="ri-time-line mr-1"></i>{post.timing} · <span className="text-foreground-500">{post.trigger}</span>
                  </p>

                  {/* Variables badge */}
                  {post.variables && post.variables.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.variables.map((v) => (
                        <code key={v} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                          {`{{${v}}}`}
                        </code>
                      ))}
                    </div>
                  )}

                  {/* Slides for carousel post */}
                  {post.slides && (
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-foreground-500 mb-2">CARROUSEL 5 SLIDES :</p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {post.slides.map((s) => (
                          <div key={s.num} className="p-2 bg-background-100 rounded-lg text-center border border-background-200/70">
                            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center text-[10px] font-bold">
                              {s.num}
                            </div>
                            <p className="text-[8px] text-foreground-600 leading-tight font-semibold">{s.text}</p>
                            <p className="text-[7px] text-foreground-400 mt-0.5">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Poll options for poll post */}
                  {post.pollOptions && (
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-foreground-500 mb-2">SONDAGE LINKEDIN :</p>
                      <div className="space-y-1.5">
                        {post.pollOptions.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-background-100 rounded-lg border border-background-200/70">
                            <span className="text-sm">{opt.emoji}</span>
                            <span className="text-xs text-foreground-700 flex-1">{opt.label}</span>
                            <span className="text-[10px] font-semibold text-foreground-400">{opt.votes}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-3 bg-background-100 rounded-lg text-xs text-foreground-700 leading-relaxed font-sans whitespace-pre-wrap max-h-[250px] overflow-y-auto mb-3">
                    {post.content}
                  </div>

                  {/* CTA line */}
                  {post.ctaLine && (
                    <p className="text-[11px] font-semibold text-[#0A66C2] mb-3">
                      💬 {post.ctaLine}
                    </p>
                  )}

                  {/* Hashtags */}
                  {post.hashtags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A66C2]/5 text-[#0A66C2]">#{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Sources */}
                  {post.sourceCitations && (
                    <div className="pt-3 border-t border-background-200/70">
                      <p className="text-[10px] text-foreground-400 font-semibold mb-1">Sources EEAT :</p>
                      {post.sourceCitations.map((s, i) => (
                        <p key={i} className="text-[9px] text-foreground-400 italic">{s}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GO-LIVE CHECKLIST 5 MIN */}
        {goLiveFinalChecklist && (
          <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="p-6 rounded-2xl bg-green-50/50 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <i className="ri-check-line text-white text-lg"></i>
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-foreground-950">{goLiveFinalChecklist.title}</h2>
                  <p className="text-xs text-foreground-500">{goLiveFinalChecklist.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {goLiveFinalChecklist.steps.map((step, idx) => (
                  <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-200/70">
                    <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-foreground-950">{step.action}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">{step.duration}</span>
                        <span className="text-[10px] text-green-600 font-bold">{step.statut}</span>
                      </div>
                      <p className="text-xs text-foreground-600 mb-1">{step.detail}</p>
                      <div className="flex items-center gap-2">
                        <code className="text-[10px] bg-background-100 px-1.5 py-0.5 rounded font-mono text-foreground-500">{step.commande}</code>
                      </div>
                      <p className="text-[10px] text-foreground-400 mt-1 italic">Evidence : {step.evidence}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pipeline complet */}
              <div className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                <p className="text-xs font-bold text-foreground-950 mb-1">Pipeline Complet :</p>
                <p className="text-xs text-foreground-600 leading-relaxed">{goLiveFinalChecklist.pipelineComplet}</p>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-bold">
                  <i className="ri-rocket-line"></i>
                  {goLiveFinalChecklist.critereGoLive}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Cross-links */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/tools/simulateur-solvabilite-uemoa" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-bank-line mr-1.5"></i>Simulateur Solvabilité
            </a>
            <a href="/tools/simulateur-solvabilite-resultat" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-file-chart-line mr-1.5"></i>Résultat Simulation
            </a>
            <a href="/tools/api-kos-search" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-code-line mr-1.5"></i>API KOS Search
            </a>
            <a href="/" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-home-line mr-1.5"></i>Accueil KOS
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



