import { useState, useCallback } from 'react';

interface LinkedInPost {
  id: string;
  letter: string;
  title: string;
  circulaire: string;
  excerpt: string;
  complianceNote: string;
  canonicalUrl: string;
  hashtags: string[];
  icon: string;
  color: string;
}

const ARTICLES_LINKEDIN: LinkedInPost[] = [
  {
    id: 'sujet-a',
    letter: 'A',
    title: "L'Indépendance des Administrateurs — Circulaire 01-2017/CB/C",
    circulaire: 'Circulaire n°01-2017/CB/C, Art. 18-20',
    excerpt:
      "Analyse de l'indépendance réelle des administrateurs sur cinq dimensions : financière, familiale, hiérarchique, temporelle et comportementale. Cumul de mandats, dépassement de temporalité, capture cognitive et conflits d'intérêts. Matrice KHEPRA INDEPENDENCE-Matrix™ d'évaluation à 5 niveaux.",
    complianceNote:
      'Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l\'UMOA.',
    canonicalUrl: 'https://khepraexperts.com/blog/independance-administrateurs-circulaire-01-2017/',
    hashtags: [
      '#GouvernanceBancaire',
      '#UEMOA',
      '#BCEAO',
      '#AdministrateursIndependants',
      '#Compliance',
      '#KHEPRA',
      '#ConseilAdministration',
    ],
    icon: 'ri-user-settings-line',
    color: 'amber',
  },
  {
    id: 'sujet-b',
    letter: 'B',
    title: 'Verrou de la Nationalité — Circulaire 02-2017/CB/C',
    circulaire: 'Circulaire n°02-2017/CB/C, Art. 12-16',
    excerpt:
      "Le verrou de la nationalité (50% maximum de non-ressortissants), le processus d'avis conforme pour les dirigeants non-ressortissants, et le transfert de compétences vers les ressortissants locaux. Matrice KHEPRA VISA-Matrix™ d'évaluation à 5 niveaux.",
    complianceNote:
      'Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l\'UMOA.',
    canonicalUrl: 'https://khepraexperts.com/blog/verrou-nationalite-competences-executives-circulaire-02-2017/',
    hashtags: [
      '#GouvernanceBancaire',
      '#UEMOA',
      '#BCEAO',
      '#DirigeantsEffectifs',
      '#FitAndProper',
      '#Compliance',
      '#KHEPRA',
    ],
    icon: 'ri-passport-line',
    color: 'emerald',
  },
  {
    id: 'sujet-c',
    letter: 'C',
    title: 'Les 3 Lignes de Défense — Circulaire 03-2017/CB/C',
    circulaire: 'Circulaire n°03-2017/CB/C, Art. 22-58',
    excerpt:
      "Étanchéité des trois lignes de défense, indépendance de l'Audit Interne, conflits de gouvernance holding/filiale, digitalisation de la piste d'audit et conservation décennale. Matrice KHEPRA 3LD-Matrix™ d'évaluation à 5 niveaux.",
    complianceNote:
      'Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l\'UMOA.',
    canonicalUrl: 'https://khepraexperts.com/blog/3-lignes-defense-circulaire-03-2017/',
    hashtags: [
      '#GouvernanceBancaire',
      '#UEMOA',
      '#BCEAO',
      '#LignesDeDefense',
      '#AuditInterne',
      '#Compliance',
      '#KHEPRA',
    ],
    icon: 'ri-shield-keyhole-line',
    color: 'teal',
  },
  {
    id: 'sujet-d',
    letter: 'D',
    title: "Protection des Lanceurs d'Alerte — Art. 44, Circulaire 01-2017",
    circulaire: "Art. 44, Circulaire n°01-2017/CB/C + GAFI + Directive UE 2019/1937",
    excerpt:
      "Canal de signalement conforme, protection contre les représailles, confidentialité vs droit de défense, digitalisation des canaux et alignement GAFI/Directive (UE) 2019/1937. Matrice KHEPRA WHISTLEBLOWER-Matrix™ d'évaluation à 5 niveaux.",
    complianceNote:
      'Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO, de la Commission Bancaire de l\'UMOA et du GAFI.',
    canonicalUrl: 'https://khepraexperts.com/blog/protection-lanceurs-alerte-circulaire-01-2017/',
    hashtags: [
      '#GouvernanceBancaire',
      '#UEMOA',
      '#BCEAO',
      '#LanceursAlerte',
      '#GAFI',
      '#Compliance',
      '#KHEPRA',
    ],
    icon: 'ri-shield-user-line',
    color: 'indigo',
  },
  {
    id: 'sujet-e',
    letter: 'E',
    title: 'Les Comités Spécialisés — Circulaire 01-2017/CB/C, Art. 55-62',
    circulaire: 'Circulaire n°01-2017/CB/C, Art. 55-62',
    excerpt:
      "Composition obligatoire à majorité d'indépendants, procès-verbaux conformes (vote détaillé, transmission en 15 jours), pouvoirs délégués formalisés. Les articles procéduriers les plus contrôlés par le SG-CB-UMOA lors des inspections. Matrice KHEPRA COMMITTEE-Matrix™ d'évaluation à 5 niveaux.",
    complianceNote:
      'Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l\'UMOA.',
    canonicalUrl: 'https://khepraexperts.com/blog/comites-specialises-circulaire-01-2017/',
    hashtags: [
      '#GouvernanceBancaire',
      '#UEMOA',
      '#BCEAO',
      '#ComitesSpecialises',
      '#ConseilAdministration',
      '#Compliance',
      '#KHEPRA',
    ],
    icon: 'ri-group-line',
    color: 'rose',
  },
];

const CAMPAIGN_POSTS: LinkedInPost[] = [
  {
    id: 'campaign-diagnostic-flash-conformite-2026',
    letter: 'C1',
    title: '[AGENT 10] Diagnostic Flash Conformité BCEAO/COBAC 2026 — Post Exécutif LinkedIn',
    circulaire: 'Campagne 001 · Cible DRC & Compliance Officers · UEMOA/CEMAC',
    excerpt:
      "🚨 90% des institutions financières découvrent leurs gaps de conformité le jour de l'inspection BCEAO/COBAC.\n\nJe le sais parce que nous les accompagnons en mode urgence — 45 jours pour produire un plan de redressement crédible après un avis défavorable.\n\nCe n'est pas une fatalité.\n\nIl existe un moyen simple de savoir EXACTEMENT où vous en êtes avant que l'inspecteur ne frappe à la porte.\n\n👉 Le Diagnostic Flash Conformité BCEAO/COBAC 2026\n\n25 questions. 10 minutes. Un score immédiat sur 100.\n\nLes 5 domaines scannés :\n① Gouvernance & Contrôle Interne (Circulaire 01-2017/CB)\n② Ratios Prudentiels & Solvabilité (Bâle III, Circulaire 03-2017/CB)\n③ LBC/FT & Conformité KYC (Directive 02-2015)\n④ Systèmes d'Information & Cyber-résilience\n⑤ ALM, Liquidité & Reporting\n\nCe que vous obtenez immédiatement :\n✅ Score global sur 100 avec matrice des risques 5×5\n✅ Benchmark sectoriel — comparez-vous aux institutions de votre catégorie\n✅ Plan d'action priorisé sur 90 jours avec jalons réglementaires\n✅ Références exactes aux circulaires BCEAO et règlements COBAC\n\n📊 94% des institutions qui ont appliqué le plan d'action ont réussi leur inspection sans réserve majeure.\n\n🎯 Conçu pour les DRC, RCI, Compliance Officers, DG et DGA des banques, SFD, EMF et fintechs en zones UEMOA et CEMAC.\n\n⏱️ C'est gratuit. C'est immédiat. Et ça peut vous éviter des sanctions jusqu'à 500M FCFA.",
    complianceNote:
      'Cette publication marketing est conforme aux règles déontologiques de KHEPRA EXPERTS. Les données chiffrées (94%, 500M FCFA) sont issues de l\'historique réel des missions KHEPRA sur la période 2021-2025. Le diagnostic est gratuit et sans engagement commercial. Publication encadrée par l\'AGENT 10 (Growth & Revenue Partner) et validée par l\'AGENT 8 (Quality Controller).',
    canonicalUrl: 'https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026/',
    hashtags: [
      '#Conformité',
      '#BCEAO',
      '#COBAC',
      '#GouvernanceBancaire',
      '#UEMOA',
      '#CEMAC',
      '#RiskManagement',
      '#Compliance',
      '#Banque',
      '#Microfinance',
      '#KHEPRAExperts',
      '#RegulatoryCompliance',
    ],
    icon: 'ri-megaphone-line',
    color: 'premium',
  },
];

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  amber: {
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    badge: 'bg-amber-100',
  },
  emerald: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100',
  },
  teal: {
    border: 'border-teal-200',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    badge: 'bg-teal-100',
  },
  indigo: {
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100',
  },
  rose: {
    border: 'border-rose-200',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    badge: 'bg-rose-100',
  },
};

const CAMPAIGN_COLORS: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  premium: {
    border: 'border-amber-300',
    bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
    text: 'text-amber-800',
    badge: 'bg-amber-200',
  },
};

// Merge color maps
const ALL_COLORS: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  ...COLOR_MAP,
  ...CAMPAIGN_COLORS,
};

function generateLinkedInPost(post: LinkedInPost): string {
  return `${post.title}

${post.excerpt}

${post.complianceNote}

🔗 ${post.canonicalUrl}

${post.hashtags.join(' ')}`;
}

function generateLinkedInUrl(post: LinkedInPost): string {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.canonicalUrl)}`;
  return url;
}

export function LinkedInPublisher() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const copyPost = useCallback((post: LinkedInPost) => {
    const text = generateLinkedInPost(post);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  }, []);

  const openLinkedInShare = useCallback((post: LinkedInPost) => {
    const url = generateLinkedInUrl(post);
    window.open(url, '_blank', 'width=600,height=600,noopener,noreferrer');
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0A66C2]/10">
            <i className="ri-linkedin-fill text-2xl text-[#0A66C2]"></i>
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">LinkedIn Publisher — Série Gouvernance Bancaire UEMOA</h2>
            <p className="text-sm text-gray-500">
              5 posts pré-formatés avec encadrés de conformité, liens canoniques et hashtags optimisés
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <i className="ri-shield-check-line"></i>
            Conformité réglementaire intégrée
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            <i className="ri-link"></i>
            Liens canoniques
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            <i className="ri-hashtag"></i>
            Hashtags optimisés
          </span>
        </div>
      </div>

      {/* Posts */}
      {ARTICLES_LINKEDIN.map((post) => {
        const c = ALL_COLORS[post.color] || COLOR_MAP.amber;
        const isExpanded = expandedPost === post.id;
        const isCopied = copiedId === post.id;

        return (
          <div
            key={post.id}
            className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${c.border}`}
          >
            {/* Header */}
            <div className={`${c.bg} px-6 py-4 border-b ${c.border}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg border-2 ${c.border} bg-white ${c.text}`}
                >
                  {post.letter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
                      <i className={`${post.icon} mr-1`}></i>
                      {post.circulaire}
                    </p>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-0.5">{post.title}</h3>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Post preview */}
                <div
                  className={`rounded-xl border border-gray-200 p-4 bg-gray-50/50 transition-all ${
                    isExpanded ? '' : 'max-h-[200px] overflow-hidden relative'
                  }`}
                >
                  <p className="text-sm font-bold text-gray-800 mb-2">{post.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-3">{post.excerpt}</p>
                  <div className="rounded-lg border border-amber-200 p-3 bg-amber-50/50 mb-3">
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      <i className="ri-shield-check-line text-amber-600 mr-1"></i>
                      {post.complianceNote}
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">{post.canonicalUrl}</p>
                  <p className="text-sm text-[#0A66C2] font-medium">
                    {post.hashtags.join(' ')}
                  </p>

                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
                  )}
                </div>

                {/* Toggle preview */}
                <button
                  onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <i className="ri-arrow-up-line"></i>
                      Réduire l&apos;aperçu
                    </>
                  ) : (
                    <>
                      <i className="ri-arrow-down-line"></i>
                      Voir l&apos;aperçu complet
                    </>
                  )}
                </button>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => copyPost(post)}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                      isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {isCopied ? (
                        <i className="ri-check-line text-lg"></i>
                      ) : (
                        <i className="ri-file-copy-line text-lg"></i>
                      )}
                    </div>
                    {isCopied ? 'Post copié !' : 'Copier le post LinkedIn'}
                  </button>

                  <button
                    onClick={() => openLinkedInShare(post)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all bg-[#0A66C2] hover:bg-[#004182] text-white cursor-pointer whitespace-nowrap flex-1"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-linkedin-fill text-lg"></i>
                    </div>
                    Ouvrir LinkedIn
                  </button>
                </div>

                {/* Copy link */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-link"></i>
                  <span className="truncate">{post.canonicalUrl}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Campaign Posts Section */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500">
            <i className="ri-megaphone-line text-2xl text-white"></i>
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">Campagnes Marketing — AGENT 10</h2>
            <p className="text-sm text-gray-500">
              Posts exécutifs pour campagnes Growth & Revenue — ciblage DRC, Compliance Officers, DG
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-200 text-amber-800">
            <i className="ri-flashlight-line"></i>
            AGENT 10 — Growth & Revenue Partner
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <i className="ri-check-double-line"></i>
            Validé AGENT 8 — Quality Controller
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <i className="ri-user-star-line"></i>
            Niveau Opus — Exécutif
          </span>
        </div>
      </div>

      {CAMPAIGN_POSTS.map((post) => {
        const c = ALL_COLORS[post.color] || CAMPAIGN_COLORS.premium;
        const isExpanded = expandedPost === post.id;
        const isCopied = copiedId === post.id;

        return (
          <div
            key={post.id}
            className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${c.border}`}
          >
            {/* Header */}
            <div className={`${c.bg} px-6 py-4 border-b ${c.border}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg border-2 ${c.border} bg-white ${c.text}`}
                >
                  {post.letter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
                      <i className={`${post.icon} mr-1`}></i>
                      {post.circulaire}
                    </p>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-0.5">{post.title}</h3>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Post preview */}
                <div
                  className={`rounded-xl border border-gray-200 p-4 bg-gray-50/50 transition-all ${
                    isExpanded ? '' : 'max-h-[250px] overflow-hidden relative'
                  }`}
                >
                  <p className="text-sm font-bold text-gray-800 mb-2">{post.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-3">{post.excerpt}</p>
                  <div className="rounded-lg border border-amber-200 p-3 bg-amber-50/50 mb-3">
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      <i className="ri-shield-check-line text-amber-600 mr-1"></i>
                      {post.complianceNote}
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">{post.canonicalUrl}</p>
                  <p className="text-sm text-[#0A66C2] font-medium">
                    {post.hashtags.join(' ')}
                  </p>

                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
                  )}
                </div>

                {/* Toggle preview */}
                <button
                  onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <i className="ri-arrow-up-line"></i>
                      Réduire l&apos;aperçu
                    </>
                  ) : (
                    <>
                      <i className="ri-arrow-down-line"></i>
                      Voir l&apos;aperçu complet du post
                    </>
                  )}
                </button>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => copyPost(post)}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex-1 ${
                      isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {isCopied ? (
                        <i className="ri-check-line text-lg"></i>
                      ) : (
                        <i className="ri-file-copy-line text-lg"></i>
                      )}
                    </div>
                    {isCopied ? 'Post copié !' : 'Copier le post LinkedIn'}
                  </button>

                  <button
                    onClick={() => openLinkedInShare(post)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all bg-[#0A66C2] hover:bg-[#004182] text-white cursor-pointer whitespace-nowrap flex-1"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-linkedin-fill text-lg"></i>
                    </div>
                    Partager sur LinkedIn
                  </button>
                </div>

                {/* Copy link */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-link"></i>
                  <span className="truncate">{post.canonicalUrl}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* All posts summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-list-check text-teal-600"></i>
          Récapitulatif de publication
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Sujet</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Titre</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Circulaire</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Lien canonique</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Hashtags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ARTICLES_LINKEDIN.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-bold text-xs ${ALL_COLORS[post.color]?.badge || ''} ${ALL_COLORS[post.color]?.text || ''}`}>
                      {post.letter}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{post.circulaire}</td>
                  <td className="px-4 py-3">
                    <a
                      href={post.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline truncate block max-w-[200px]"
                    >
                      {post.canonicalUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {post.hashtags.length} hashtags
                  </td>
                </tr>
              ))}
              {CAMPAIGN_POSTS.map((post) => (
                <tr key={post.id} className="hover:bg-amber-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-bold text-xs ${ALL_COLORS[post.color]?.badge || ''} ${ALL_COLORS[post.color]?.text || ''}`}>
                      {post.letter}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{post.circulaire}</td>
                  <td className="px-4 py-3">
                    <a
                      href={post.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline truncate block max-w-[200px]"
                    >
                      {post.canonicalUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {post.hashtags.length} hashtags
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LinkedInPublisher;



