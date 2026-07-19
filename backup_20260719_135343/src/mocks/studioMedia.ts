// ============================================================
// KHEPRA EXPERTS — Studio Média — Mock Data
// 4 Frameworks : Podcast · YouTube · GEO · Business Development
// Standard Big Four — Institutionnel, Actionnable, Mesurable
// ============================================================

// ─── STATISTIQUES DU STUDIO ───
export const studioStats = {
  episodesProduits: 48,
  frameworksActifs: 4,
  formatsDeclines: 28,
  audiencesCibles: 7,
  tauxConversionMoyen: '12.4%',
  paysCouverts: 15,
};

// ═══════════════════════════════════════════════════════
// FRAMEWORK 1 : PODCAST — 8 SECTIONS
// ═══════════════════════════════════════════════════════

export interface PodcastSection {
  id: string;
  number: string;
  title: string;
  duree: string;
  description: string;
  conseils: string[];
  template: string;
}

export const podcastFramework = {
  id: 'podcast',
  title: 'Podcast Institutionnel',
  subtitle: 'Format audio — 15 à 30 minutes — Standard Big Four',
  icon: 'ri-mic-line',
  theme: 'primary',
  description: 'Production d\'épisodes de podcast professionnels pour renforcer la crédibilité de KHEPRA EXPERTS, valoriser les meilleures pratiques africaines et internationales, citer les normes applicables et fournir des recommandations actionnables.',
  publicCible: 'Conseils d\'administration, directions générales, responsables conformité, responsables risques, investisseurs, autorités de supervision, SFD, banques, organismes publics.',
  sections: [
    {
      id: 'pod-sec-1',
      number: '01',
      title: 'Introduction',
      duree: '2-3 min',
      description: 'Accroche, présentation du sujet, de l\'invité et des objectifs de l\'épisode. Pose le cadre de la discussion.',
      conseils: [
        'Commencer par une statistique choc ou une question provocante',
        'Présenter l\'invité avec son titre complet et sa légitimité sur le sujet',
        'Annoncer les 3 points clés qui seront abordés',
      ],
      template: `[INTRODUCTION — 2-3 min]

PRÉSENTATEUR : "Bonjour et bienvenue dans [Nom du podcast], le podcast de KHEPRA EXPERTS qui décrypte les enjeux de gouvernance, conformité et transformation en Afrique francophone. Je suis [Nom], [Fonction].

Aujourd'hui, nous abordons [Sujet]. Saviez-vous que [statistique choc ou fait marquant] ? C'est précisément ce que nous allons analyser.

Pour en parler, j'ai le plaisir d'accueillir [Nom de l'invité], [Titre et organisation]. [1 phrase sur sa légitimité].

[Prénom de l'invité], merci d'être avec nous."

INVITÉ : "Merci [Prénom du présentateur], ravi d'être là."`,
    },
    {
      id: 'pod-sec-2',
      number: '02',
      title: 'Contexte',
      duree: '3-4 min',
      description: 'Mise en perspective macro-économique, réglementaire et sectorielle. Cadrage du sujet dans son environnement.',
      conseils: [
        'Citer les textes réglementaires applicables avec dates',
        'Donner des chiffres de marché crédibles',
        'Expliquer pourquoi le sujet est pertinent maintenant',
      ],
      template: `[CONTEXTE — 3-4 min]

PRÉSENTATEUR : "Pour planter le décor, [Prénom de l'invité], quel est le contexte actuel autour de [Sujet] ?"

INVITÉ : "Le contexte est marqué par trois évolutions majeures :

1️⃣ [Évolution 1 — cadre réglementaire, ex: nouvelle circulaire BCEAO n°X du JJ/MM/AAAA]
2️⃣ [Évolution 2 — tendance de marché, ex: +X% de digitalisation des SFD en zone UEMOA]
3️⃣ [Évolution 3 — pression externe, ex: exigences accrues du GAFI]

Ces trois facteurs créent une situation où [synthèse en une phrase]."`,
    },
    {
      id: 'pod-sec-3',
      number: '03',
      title: 'Analyse',
      duree: '5-7 min',
      description: 'Analyse approfondie des enjeux, décryptage des mécanismes et des implications. Cœur expert de l\'épisode.',
      conseils: [
        'Structurer en 2-3 sous-parties distinctes',
        'Utiliser des exemples concrets pour illustrer',
        'Croiser les perspectives (régulateur, institution, opérateur)',
      ],
      template: `[ANALYSE — 5-7 min]

PRÉSENTATEUR : "Entrons dans le vif du sujet. Selon vous, quels sont les véritables enjeux derrière [Sujet] ?"

INVITÉ : "Il faut distinguer trois niveaux d'analyse :

D'abord, sur le plan [Dimension 1 — ex: réglementaire] :
[Analyse détaillée — 2 min]

Ensuite, sur le plan [Dimension 2 — ex: opérationnel] :
[Analyse détaillée — 2 min]

Enfin, sur le plan [Dimension 3 — ex: financier] :
[Analyse détaillée — 2 min]

Ce qui est frappant, c'est que [insight clé — 30 secondes]."`,
    },
    {
      id: 'pod-sec-4',
      number: '04',
      title: 'Risques',
      duree: '2-3 min',
      description: 'Identification et hiérarchisation des risques pour les institutions concernées. Analyse des vulnérabilités.',
      conseils: [
        'Utiliser la matrice probabilité × impact',
        'Distinguer risques immédiats et risques structurels',
        'Donner des ordres de grandeur financiers si possible',
      ],
      template: `[RISQUES — 2-3 min]

PRÉSENTATEUR : "Quels sont les principaux risques si les acteurs ne prennent pas ce sujet au sérieux ?"

INVITÉ : "Je vois trois catégories de risques :

🔴 Risque [N°1 — ex: réglementaire] :
[Description + conséquence probable — 40 secondes]

🟠 Risque [N°2 — ex: réputationnel] :
[Description + conséquence probable — 40 secondes]

🟡 Risque [N°3 — ex: financier] :
[Description + conséquence probable — 40 secondes]

La bonne nouvelle, c'est que ces risques sont tous maîtrisables si on anticipe."`,
    },
    {
      id: 'pod-sec-5',
      number: '05',
      title: 'Opportunités',
      duree: '2-3 min',
      description: 'Identification des leviers de création de valeur et des avantages compétitifs pour les organisations proactives.',
      conseils: [
        'Présenter un cas concret d\'organisation qui a transformé le risque en opportunité',
        'Quantifier le bénéfice potentiel',
        'Montrer l\'avantage du "first mover"',
      ],
      template: `[OPPORTUNITÉS — 2-3 min]

PRÉSENTATEUR : "Parlons du verre à moitié plein. Quelles opportunités se cachent derrière ces enjeux ?"

INVITÉ : "C'est un point crucial. Trois opportunités majeures se dégagent :

✅ Opportunité [N°1 — ex: différenciation concurrentielle] :
[Description — 40 secondes]

✅ Opportunité [N°2 — ex: accès à des financements] :
[Description — 40 secondes]

✅ Opportunité [N°3 — ex: attractivité des talents] :
[Description — 40 secondes]

Les organisations qui agissent maintenant auront [avantage — 20 secondes]."`,
    },
    {
      id: 'pod-sec-6',
      number: '06',
      title: 'Étude de cas',
      duree: '3-4 min',
      description: 'Présentation d\'un cas réel ou d\'un benchmark illustrant les bonnes pratiques. Concret et mémorable.',
      conseils: [
        'Choisir un cas africain ou adapté au contexte UEMOA/CEMAC',
        'Présenter la situation initiale, l\'action menée, le résultat',
        'Extraire 2-3 enseignements généralisables',
      ],
      template: `[ÉTUDE DE CAS — 3-4 min]

PRÉSENTATEUR : "Pour rendre ça concret, avez-vous un exemple d'organisation qui a bien géré [Sujet] ?"

INVITÉ : "Absolument. Prenons le cas de [Organisation], [secteur/pays] :

📋 Situation initiale :
[Description du problème — 30 secondes]

🔧 Action menée :
[Description de l'intervention — 1 min]

📊 Résultat :
[Résultat chiffré — 30 secondes]

Ce qui est intéressant, c'est que [enseignement n°1] et [enseignement n°2]. Ce sont des leçons applicables à toutes les organisations."`,
    },
    {
      id: 'pod-sec-7',
      number: '07',
      title: 'Recommandations',
      duree: '3-4 min',
      description: 'Recommandations opérationnelles priorisées, actionnables par les décideurs. Roadmap à 90 jours.',
      conseils: [
        'Limiter à 3 recommandations maximum',
        'Chaque recommandation doit être spécifique et actionnable',
        'Indiquer qui doit agir et dans quel délai',
      ],
      template: `[RECOMMANDATIONS — 3-4 min]

PRÉSENTATEUR : "Quelles sont vos recommandations pour un dirigeant qui nous écoute ?"

INVITÉ : "Trois actions prioritaires, par ordre d'urgence :

1️⃣ À FAIRE DEMAIN (J+1 à J+30) :
[Action concrète n°1 — 45 secondes]
→ Responsable : [Fonction]
→ Livrable : [Document ou action]

2️⃣ À FAIRE CE TRIMESTRE (J+30 à J+90) :
[Action concrète n°2 — 45 secondes]
→ Responsable : [Fonction]
→ Livrable : [Document ou action]

3️⃣ À PLANIFIER CETTE ANNÉE :
[Action concrète n°3 — 45 secondes]
→ Responsable : [Fonction]
→ Livrable : [Document ou action]

Si vous ne deviez retenir qu'une chose : [synthèse en 20 secondes]."`,
    },
    {
      id: 'pod-sec-8',
      number: '08',
      title: 'Conclusion',
      duree: '2-3 min',
      description: 'Synthèse des messages clés, recommandation finale et appel à l\'action (rendez-vous, téléchargement, contact).',
      conseils: [
        'Résumer en 3 points maximum',
        'Inclure un CTA clair vers une ressource KHEPRA',
        'Annoncer le prochain épisode',
      ],
      template: `[CONCLUSION — 2-3 min]

PRÉSENTATEUR : "Nous arrivons à la fin de cet épisode. [Prénom de l'invité], quel est le message essentiel que vous voulez laisser à nos auditeurs ?"

INVITÉ : "Trois messages clés :
1. [Message 1 — 15 secondes]
2. [Message 2 — 15 secondes]
3. [Message 3 — 15 secondes]

Le plus important : [Phrase de conclusion percutante]."

PRÉSENTATEUR : "Merci [Prénom de l'invité] pour cette analyse éclairante.

Pour approfondir ce sujet, je vous invite à :
📥 Télécharger notre [Guide/Livre blanc] sur khepraexperts.com
📞 Réserver un diagnostic gratuit avec nos experts

Retrouvez-nous [jour] prochain pour un nouvel épisode. D'ici là, gouvernez avec confiance."

[MUSIQUE SIGNATURE — 15 secondes]`,
    },
  ],
};

// ═══════════════════════════════════════════════════════
// FRAMEWORK 2 : YOUTUBE — 10 LIVRABLES
// ═══════════════════════════════════════════════════════

export interface YouTubeLivrable {
  id: string;
  number: string;
  title: string;
  icon: string;
  description: string;
  conseils: string[];
  template: string;
  theme: string;
}

export const youtubeFramework = {
  id: 'youtube',
  title: 'YouTube Studio',
  subtitle: '10 livrables standardisés par émission',
  icon: 'ri-video-line',
  theme: 'accent',
  description: 'Création d\'émissions éducatives premium destinées à renforcer l\'autorité de KHEPRA EXPERTS. Chaque émission génère 10 livrables standardisés optimisés pour la découvrabilité et l\'engagement.',
  livrables: [
    {
      id: 'yt-liv-1',
      number: 'L1',
      title: 'Titre optimisé YouTube',
      icon: 'ri-hashtag',
      description: 'Titre percutant, 60 caractères max, incluant les mots-clés principaux. Optimisé pour le CTR (taux de clic).',
      theme: 'primary',
      conseils: [
        'Max 60 caractères (troncature YouTube au-delà)',
        'Inclure le mot-clé principal en début de titre',
        'Utiliser un modificateur : [2026], [Guide complet], [Analyse]',
        'Provoquer la curiosité sans clickbait',
      ],
      template: `[TITRE — 60 CARACTÈRES MAX]

Format recommandé :
"[Mot-clé principal] : [Sous-titre accrocheur] | KHEPRA EXPERTS"

Exemples :
• "Gouvernance SFD UEMOA : 3 Réformes qui Changent Tout | KHEPRA EXPERTS"
• "Inspection COBAC 2026 : Comment Réussir sans Stress | KHEPRA EXPERTS"
• "Conformité LCB/FT : Nouvelles Exigences GAFI | KHEPRA EXPERTS"

Checklist :
☐ ≤ 60 caractères
☐ Mot-clé principal présent
☐ Mention KHEPRA EXPERTS
☐ Pas de clickbait
☐ Pas de majuscules abusives`,
    },
    {
      id: 'yt-liv-2',
      number: 'L2',
      title: 'Hook d\'ouverture',
      icon: 'ri-flashlight-line',
      description: 'Les 30 premières secondes qui déterminent si le spectateur reste ou part. Accroche percutante.',
      theme: 'primary',
      conseils: [
        'Première phrase = statistique choc OU question provocante',
        'Ne pas commencer par "Bonjour je m\'appelle..."',
        'Plan visuel dynamique (pas de face caméra statique)',
        'Texte à l\'écran pour renforcer le message',
      ],
      template: `[HOOK — 30 SECONDES]

── SCÈNE (0:00-0:05) ──
[PLAN : Fond noir + texte choc en vert]
[TEXTE À L'ÉCRAN : "X% des [entités] ne sont pas conformes à [norme]"]

── SCÈNE (0:05-0:15) ──
[PLAN : Face caméra, fond institutionnel]
PRÉSENTATEUR : "[Statistique choc]. Vous dirigez [type d'organisation] ? Cette vidéo est pour vous."

── SCÈNE (0:15-0:30) ──
[PLAN : Face caméra + bullet points]
PRÉSENTATEUR : "Dans les 15 prochaines minutes, je vous explique :
1️⃣ [Point 1]
2️⃣ [Point 2]  
3️⃣ [Point 3]
Restez jusqu'au bout — la recommandation n°3 pourrait sauver votre prochaine inspection."`,
    },
    {
      id: 'yt-liv-3',
      number: 'L3',
      title: 'Script complet',
      icon: 'ri-file-text-line',
      description: 'Script détaillé de 10 à 20 minutes, synchronisé avec les visuels et les transitions.',
      theme: 'primary',
      conseils: [
        'Structurer en 7 scènes maximum',
        'Indiquer les plans caméra et les visuels',
        'Prévoir les transitions entre scènes',
        'Durée idéale : 12-18 minutes',
      ],
      template: `[SCRIPT COMPLET — 15 MINUTES]

── SCÈNE 1 : HOOK (0:00-0:30) ──
[Voir Livrable L2 — Hook d'ouverture]

── SCÈNE 2 : INTRODUCTION (0:30-1:30) ──
[PLAN : Face caméra, fond institutionnel, logo KHEPRA en bas à droite]
PRÉSENTATEUR : "Je suis [Nom], [Fonction] chez KHEPRA EXPERTS, cabinet de conseil spécialisé en gouvernance, conformité et transformation en Afrique francophone."
[INCISE GRAPHIQUE : Logo KHEPRA + baseline]
PRÉSENTATEUR : "[Annonce des 3 parties de la vidéo]"

── SCÈNE 3 : CONTEXTE (1:30-4:00) ──
[PLAN : Slides — graphiques, carte UEMOA/CEMAC, chronologie réglementaire]
PRÉSENTATEUR (VOIX OFF) : "[Contexte macro — 3 points clés avec visuels]"
[TRANSITION : Fondu au noir]

── SCÈNE 4 : ANALYSE (4:00-8:00) ──
[PLAN : Alternance face caméra + slides techniques]
PRÉSENTATEUR : "[Analyse détaillée — 3 sous-parties]"
[INCISE GRAPHIQUE : Statistiques clés]

── SCÈNE 5 : CAS CONCRET (8:00-10:30) ──
[PLAN : Face caméra + schéma / organigramme]
PRÉSENTATEUR : "[Étude de cas ou exemple concret]"
[INCISE GRAPHIQUE : Logo organisation + chiffres clés]

── SCÈNE 6 : RECOMMANDATIONS (10:30-13:30) ──
[PLAN : Face caméra + bullet points numérotés]
PRÉSENTATEUR : "[3 recommandations actionnables]"

── SCÈNE 7 : CONCLUSION + CTA (13:30-15:00) ──
[PLAN : Face caméra, chaleureux]
PRÉSENTATEUR : "Pour résumer : [3 points clés]. Si cette vidéo vous a été utile, abonnez-vous et activez la cloche. Pour aller plus loin, téléchargez notre guide complet — lien dans la description."
[ÉCRAN FINAL : CTA graphique + ressources + liens]`,
    },
    {
      id: 'yt-liv-4',
      number: 'L4',
      title: 'Moments forts',
      icon: 'ri-timer-flash-line',
      description: 'Identification des 5 moments clés de la vidéo, horodatés, pour les chapitres YouTube et les extraits.',
      theme: 'accent',
      conseils: [
        'Sélectionner les 5 passages les plus percutants',
        'Chaque moment doit pouvoir être consommé indépendamment',
        'Horodater précisément (MM:SS)',
      ],
      template: `[MOMENTS FORTS — 5 TIMECODES]

🎬 00:00 — HOOK : [Phrase d'accroche]

📊 03:15 — CHIFFRE CLÉ : "[Statistique marquante]"

⚠️ 07:40 — ALERTE : "[Avertissement ou risque majeur]"

💡 10:20 — RECOMMANDATION N°1 : "[Action prioritaire]"

🎯 13:45 — CONCLUSION : "[Message à retenir]"

── POUR LES SHORTS/REELS ──
Extraire ces 5 moments en clips verticaux de 30-60 secondes.`,
    },
    {
      id: 'yt-liv-5',
      number: 'L5',
      title: 'Questions fréquentes',
      icon: 'ri-question-answer-line',
      description: '5 questions anticipées du public, avec réponses structurées. Base pour le SEO et l\'engagement.',
      theme: 'accent',
      conseils: [
        'Utiliser des questions formulées comme le public les tape dans Google',
        'Réponses concises (2-3 phrases)',
        'Inclure des mots-clés longue traîne',
      ],
      template: `[QUESTIONS FRÉQUENTES — 5 Q&R]

Q1 : "[Question en langage naturel, ex: Comment préparer une inspection COBAC en 2026 ?]"
R1 : [Réponse 2-3 phrases, incluant référence réglementaire]

Q2 : "[Question en langage naturel]"
R2 : [Réponse 2-3 phrases]

Q3 : "[Question en langage naturel]"
R3 : [Réponse 2-3 phrases]

Q4 : "[Question en langage naturel]"
R4 : [Réponse 2-3 phrases]

Q5 : "[Question en langage naturel]"
R5 : [Réponse 2-3 phrases]

→ Utiliser ces Q&R dans la description YouTube et les commentaires épinglés.`,
    },
    {
      id: 'yt-liv-6',
      number: 'L6',
      title: 'Description YouTube SEO',
      icon: 'ri-search-line',
      description: 'Description optimisée pour le référencement YouTube et Google, incluant liens, chapitres et CTA.',
      theme: 'primary',
      conseils: [
        '200+ mots minimum pour le SEO',
        'Première ligne = résumé + mot-clé principal',
        'Inclure 3-5 liens pertinents',
        'Hashtags en fin de description',
      ],
      template: `[DESCRIPTION YOUTUBE — OPTIMISÉE SEO]

[Résumé 2-3 phrases — mot-clé principal inclus]

📌 AU PROGRAMME :
00:00 — Introduction
01:30 — [Sujet Partie 1]
04:00 — [Sujet Partie 2]
08:00 — [Sujet Partie 3]
10:30 — Recommandations
13:30 — Conclusion

🔗 RESSOURCES MENTIONNÉES :
📥 Guide complet : [Lien khepraexperts.com]
📋 Diagnostic gratuit : [Lien diagnostic]
📧 Newsletter exécutive : [Lien newsletter]

👤 À PROPOS DE KHEPRA EXPERTS :
KHEPRA EXPERTS est un cabinet de conseil international spécialisé en gouvernance, conformité, risques et transformation en Afrique francophone. Nous accompagnons les conseils d'administration, directions générales, SFD, banques et organismes publics en zone UEMOA et CEMAC.

🌐 khepraexperts.com
💼 LinkedIn : [Lien]

#Gouvernance #Conformité #[MotClé1] #[MotClé2] #KhepraExperts`,
    },
    {
      id: 'yt-liv-7',
      number: 'L7',
      title: 'Chapitres YouTube',
      icon: 'ri-list-ordered',
      description: 'Découpage horodaté de la vidéo en chapitres pour la navigation et le référencement.',
      theme: 'accent',
      conseils: [
        '8-12 chapitres maximum',
        'Format : 00:00 Titre du chapitre',
        'Premier chapitre toujours à 00:00',
        'Titres courts (max 40 caractères)',
      ],
      template: `[CHAPITRES YOUTUBE]

00:00 Introduction
00:30 [Hook / Accroche]
01:30 [Contexte macro]
04:00 [Analyse — Partie 1]
06:30 [Analyse — Partie 2]
08:00 [Étude de cas]
10:30 [Recommandation 1]
11:30 [Recommandation 2]
12:30 [Recommandation 3]
13:30 Conclusion et CTA`,
    },
    {
      id: 'yt-liv-8',
      number: 'L8',
      title: 'Hashtags optimisés',
      icon: 'ri-hashtag',
      description: '15-20 hashtags stratégiques couvrant le sujet, la géographie, l\'audience et la marque.',
      theme: 'primary',
      conseils: [
        'Mix de hashtags larges et de niche',
        'Inclure la géographie (UEMOA, CEMAC, Afrique)',
        'Inclure la marque KHEPRA',
        'Max 3 à 5 dans la description YouTube',
      ],
      template: `[HASHTAGS – 15-20 HASHTAGS]

── LARGES ──
#Gouvernance #Conformité #Risques #Audit #Régulation

── GÉOGRAPHIQUES ──
#UEMOA #CEMAC #BCEAO #COBAC #Afrique #OHADA

── SECTORIELS ──
#Microfinance #Banque #SFD #Fintech #Assurance

── MARQUE ──
#KhepraExperts #KHEPRA #ConseilBigFour

── LONGUE TRAÎNE ──
#[MotCléSpécifique1] #[MotCléSpécifique2]

→ Dans la description YouTube : sélectionner les 3 plus pertinents.`,
    },
    {
      id: 'yt-liv-9',
      number: 'L9',
      title: 'Script Shorts / Reels',
      icon: 'ri-smartphone-line',
      description: 'Déclinaison en 3 formats courts verticaux (YouTube Shorts, Reels, TikTok) de 30-60 secondes.',
      theme: 'accent',
      conseils: [
        'Format vertical 9:16',
        'Moins de 60 secondes',
        'Sous-titres obligatoires',
        'Hook dans les 3 premières secondes',
      ],
      template: `[SHORTS — 3 DÉCLINAISONS × 60 SECONDES]

── SHORT 1 : CHIFFRE CHOC ──
[VISUEL : Fond vert KHEPRA + texte choc]
[TEXTE À L'ÉCRAN : "X% des [entités] échouent à [exigence]"]
PRÉSENTATEUR (45s) : "[Explication du chiffre + implication + 'Suivez pour plus d'insights']"

── SHORT 2 : RECOMMANDATION RAPIDE ──
[VISUEL : Face caméra + bullet points]
[TEXTE À L'ÉCRAN : "3 actions immédiates"]
PRÉSENTATEUR (50s) : "[Recommandation 1 (15s)] → [Recommandation 2 (15s)] → [Recommandation 3 (15s)] + CTA"

── SHORT 3 : MYTHE vs RÉALITÉ ──
[VISUEL : Split screen ou alternance]
[TEXTE À L'ÉCRAN : MYTHE vs RÉALITÉ]
PRÉSENTATEUR (55s) : "Mythe : [Idée reçue]... Réalité : [Fait vérifié]. Voici pourquoi [explication]. Abonnez-vous pour ne plus jamais tomber dans ce piège."`,
    },
    {
      id: 'yt-liv-10',
      number: 'L10',
      title: 'Ressources complémentaires',
      icon: 'ri-links-line',
      description: 'Ensemble des ressources à lier dans la description, les commentaires et la communication cross-canal.',
      theme: 'primary',
      conseils: [
        'Lister 5-8 ressources pertinentes',
        'Mix de contenus KHEPRA et de sources officielles',
        'Chaque ressource avec un call-to-action',
      ],
      template: `[RESSOURCES COMPLÉMENTAIRES]

── KHEPRA EXPERTS ──
📥 Guide complet : [Lien]
📊 Diagnostic gratuit : [Lien]
📧 Newsletter exécutive : [Lien]
🎙 Podcast apparenté : [Lien épisode]
📄 Article blog : [Lien article]

── SOURCES OFFICIELLES ──
📜 [Texte réglementaire 1] : [Lien BCEAO/COBAC]
📜 [Texte réglementaire 2] : [Lien OHADA/GAFI]
📊 [Données marché] : [Lien BCEAO/BM/IFC]

── CONTACT ──
📞 Réserver une consultation : [Lien Calendly]
📩 Email : [Adresse]
🌐 khepraexperts.com`,
    },
  ],
};

// ═══════════════════════════════════════════════════════
// FRAMEWORK 3 : GEO — GENERATIVE ENGINE OPTIMIZATION
// ═══════════════════════════════════════════════════════

export interface GEOLivrable {
  id: string;
  number: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  theme: string;
}

export const geoFramework = {
  id: 'geo',
  title: 'GEO Optimization',
  subtitle: 'Generative Engine Optimization — Visibilité IA',
  icon: 'ri-robot-line',
  theme: 'primary',
  description: 'Optimisation systématique de chaque contenu pour les moteurs de recherche traditionnels (Google) et les moteurs d\'IA générative (ChatGPT, Gemini, Perplexity). Positionnement de KHEPRA EXPERTS comme source de référence en Afrique francophone.',
  optimisations: [
    {
      id: 'geo-opt-1',
      number: '01',
      title: 'Optimisation Google',
      icon: 'ri-google-line',
      description: 'SEO traditionnel : mots-clés, balisage, backlinks, Core Web Vitals, EEAT.',
      theme: 'primary',
      deliverables: [
        'Titre SEO < 60 caractères avec mot-clé principal',
        'Meta description 120-155 caractères avec CTA',
        'Balisage H1-H2-H3 cohérent',
        'URL canonique propre',
        'Maillage interne (3-5 liens)',
        'Balises alt sur toutes les images',
        'Schema.org : Article, FAQPage, HowTo, BreadcrumbList',
      ],
    },
    {
      id: 'geo-opt-2',
      number: '02',
      title: 'Optimisation Moteurs IA',
      icon: 'ri-brain-line',
      description: 'Stratégies pour apparaître dans les réponses de ChatGPT, Gemini, Perplexity, Claude.',
      theme: 'accent',
      deliverables: [
        'Contenu structuré en Q&R claires',
        'Résumés exécutifs en début de page (150 mots)',
        'Citations de sources officielles vérifiables',
        'Données chiffrées datées et attribuées',
        'Format "Définition + Exemple + Application"',
        'Entités nommées explicites (BCEAO, COBAC, OHADA, GAFI)',
        'Paragraphes courts (< 150 mots) avec sous-titres',
      ],
    },
    {
      id: 'geo-opt-3',
      number: '03',
      title: 'Optimisation LLM',
      icon: 'ri-cpu-line',
      description: 'Préparation du contenu pour l\'entraînement et l\'inférence des grands modèles de langage.',
      theme: 'primary',
      deliverables: [
        'Format markdown propre et sémantique',
        'Métadonnées enrichies (auteur, date, source)',
        'Contenu factuel vérifiable',
        'Structure hiérarchique logique',
        'Absence de contenu dupliqué ou contradictoire',
        'Fichiers llms.txt / llms-full.txt à jour',
        'Annotations de confiance et de fraîcheur du contenu',
      ],
    },
    {
      id: 'geo-opt-4',
      number: '04',
      title: 'Optimisation Assistants Conversationnels',
      icon: 'ri-chat-3-line',
      description: 'Formatage pour les assistants vocaux et textuels (Siri, Alexa, Google Assistant, Copilot).',
      theme: 'accent',
      deliverables: [
        'Réponses directes < 40 mots aux questions fréquentes',
        'Phrases déclaratives simples',
        'Format "Question : Réponse" explicite',
        'Speakable Schema markup',
        'Contenu audio-friendly (phrases courtes, pas de jargon)',
        'FAQ structurée en Q&R distinctes',
      ],
    },
    {
      id: 'geo-opt-5',
      number: '05',
      title: 'Optimisation Recherche Vocale',
      icon: 'ri-voiceprint-line',
      description: 'Adaptation du contenu aux requêtes en langage naturel et aux recherches conversationnelles.',
      theme: 'primary',
      deliverables: [
        'Questions en langage naturel dans les H2/H3',
        'Réponses en une phrase (Featured Snippet)',
        'Contenu localisé (pays, ville, région UEMOA/CEMAC)',
        'Mots-clés longue traîne conversationnels',
        'Temps de chargement < 2 secondes',
        'Structure en liste pour les réponses vocales',
      ],
    },
  ],
  livrablesGlobaux: [
    {
      id: 'geo-glob-1',
      title: 'Questions-Réponses Expertes',
      icon: 'ri-question-answer-line',
      description: 'Génération de 10-15 Q&R structurées par sujet, optimisées pour les Featured Snippets Google et les réponses IA.',
      theme: 'primary',
    },
    {
      id: 'geo-glob-2',
      title: 'Entités Nommées',
      icon: 'ri-node-tree',
      description: 'Identification et balisage des entités (organisations, personnes, lieux, réglementations) pour le Knowledge Graph.',
      theme: 'accent',
    },
    {
      id: 'geo-glob-3',
      title: 'Données Structurées',
      icon: 'ri-code-s-slash-line',
      description: 'Implémentation Schema.org : Article, FAQPage, HowTo, BreadcrumbList, Organization, Person, WebSite.',
      theme: 'primary',
    },
    {
      id: 'geo-glob-4',
      title: 'FAQ Optimisée',
      icon: 'ri-question-line',
      description: 'Module FAQ avec 10-15 questions structurées, balisage FAQPage, optimisé GEO/SEO.',
      theme: 'accent',
    },
    {
      id: 'geo-glob-5',
      title: 'Résumés Exécutifs',
      icon: 'ri-file-list-3-line',
      description: 'Synthèse 150 mots en haut de page, conçue pour être reprise par les moteurs IA.',
      theme: 'primary',
    },
    {
      id: 'geo-glob-6',
      title: 'Citations de Sources',
      icon: 'ri-double-quotes-l',
      description: 'Références officielles, datées et vérifiables : BCEAO, COBAC, OHADA, GAFI, ISSB, ISO.',
      theme: 'accent',
    },
    {
      id: 'geo-glob-7',
      title: 'Mots-Clés Stratégiques',
      icon: 'ri-key-2-line',
      description: 'Sélection de 20-30 mots-clés par contenu, couvrant large, niche, géographie et longue traîne.',
      theme: 'primary',
    },
    {
      id: 'geo-glob-8',
      title: 'Liens Internes',
      icon: 'ri-link',
      description: 'Maillage vers 3-5 pages pertinentes du site KHEPRA pour renforcer l\'autorité thématique.',
      theme: 'accent',
    },
    {
      id: 'geo-glob-9',
      title: 'Opportunités Backlinks',
      icon: 'ri-share-forward-line',
      description: 'Identification de 5-10 sites cibles pour des backlinks : médias africains, institutions, annuaires.',
      theme: 'primary',
    },
  ],
};

// ═══════════════════════════════════════════════════════
// FRAMEWORK 4 : BUSINESS DEVELOPMENT
// ═══════════════════════════════════════════════════════

export interface BDLivrable {
  id: string;
  number: string;
  title: string;
  icon: string;
  description: string;
  template: string;
  theme: string;
}

export const businessDevFramework = {
  id: 'business-dev',
  title: 'Conversion Commerciale',
  subtitle: 'Transformer le contenu en opportunités mesurables',
  icon: 'ri-line-chart-line',
  theme: 'accent',
  description: 'Pour chaque contenu publié, identification systématique des prospects, des offres pertinentes et conception des séquences de conversion. Objectif : transformer l\'audience en pipeline commercial qualifié.',
  etapes: [
    {
      id: 'bd-etape-1',
      number: '01',
      title: 'Identifier les Prospects',
      icon: 'ri-user-search-line',
      description: 'Cartographier les organisations et décideurs directement concernés par le sujet traité.',
      theme: 'primary',
      template: `[PROSPECTS POTENTIELS]

── PROFIL DÉCIDEUR ──
• Fonction 1 : [ex: Directeur Général SFD] → Douleur : [ex: inspection COBAC imminente]
• Fonction 2 : [ex: Responsable Conformité] → Douleur : [ex: mise à jour LCB/FT]
• Fonction 3 : [ex: Président CA] → Douleur : [ex: responsabilité solidaire]
• Fonction 4 : [ex: DAF Banque] → Douleur : [ex: provisionnement PAR]
• Fonction 5 : [ex: Directeur des Risques] → Douleur : [ex: cartographie risques]

── SECTEURS ──
• Secteur 1 : [Microfinance / SFD]
• Secteur 2 : [Banque commerciale]
• Secteur 3 : [Assurance]
• Secteur 4 : [Fintech / Établissement de paiement]
• Secteur 5 : [Organisme public / Régulateur]

── ZONES GÉOGRAPHIQUES ──
• UEMOA : [Pays prioritaires]
• CEMAC : [Pays prioritaires]`,
    },
    {
      id: 'bd-etape-2',
      number: '02',
      title: 'Identifier les Offres Pertinentes',
      icon: 'ri-briefcase-line',
      description: 'Associer chaque contenu aux offres de service KHEPRA EXPERTS les plus adaptées.',
      theme: 'accent',
      template: `[OFFRES KHEPRA EXPERTS — MATCHING]

── OFFRES D'AUDIT ──
🔍 Audit de pré-inspection BCEAO/COBAC
🔍 Audit du dispositif LCB/FT
🔍 Audit de gouvernance (COSO 2013 / ISO 37000)
🔍 Audit des systèmes d'information
🔍 Due diligence réglementaire

── OFFRES DE CONFORMITÉ ──
📋 Mise en conformité réglementaire
📋 Cartographie des risques (5×5)
📋 Plan de remédiation post-inspection
📋 Politiques et procédures internes
📋 Registre des risques et KRI

── OFFRES DE GOUVERNANCE ──
🏛 Conseil d'administration — Advisory
🏛 Formalisation des comités spécialisés
🏛 Charte de gouvernance
🏛 Évaluation du CA (auto-évaluation)
🏛 Plan de succession dirigeants

── OFFRES D'ASSISTANCE TECHNIQUE ──
🛠 Accompagnement agrément SFD
🛠 Business plan et modèle financier
🛠 Sélection et déploiement CBS
🛠 Formation des équipes
🛠 PMO — Pilotage de transformation`,
    },
    {
      id: 'bd-etape-3',
      number: '03',
      title: 'Concevoir les Appels à l\'Action',
      icon: 'ri-hand-heart-line',
      description: 'Créer des CTA progressifs adaptés à chaque niveau de maturité du prospect.',
      theme: 'primary',
      template: `[APPELS À L'ACTION — PROGRESSIFS]

── NIVEAU 1 : DÉCOUVERTE (froid) ──
🎯 CTA : "Téléchargez notre guide gratuit"
📄 Lead Magnet : [Guide / Checklist / Modèle]
⏱ Délai de conversion : 7-14 jours

── NIVEAU 2 : INTÉRÊT (tiède) ──
🎯 CTA : "Réservez un diagnostic flash gratuit (15 min)"
📄 Lead Magnet : Rapport de diagnostic personnalisé
⏱ Délai de conversion : 3-7 jours

── NIVEAU 3 : CONSIDÉRATION (chaud) ──
🎯 CTA : "Planifiez une consultation stratégique (45 min)"
📄 Lead Magnet : Proposition de mission préliminaire
⏱ Délai de conversion : 1-3 jours

── NIVEAU 4 : DÉCISION (très chaud) ──
🎯 CTA : "Demandez une proposition commerciale"
📄 Lead Magnet : Proposition détaillée + calendrier
⏱ Délai de conversion : 24-48h`,
    },
    {
      id: 'bd-etape-4',
      number: '04',
      title: 'Concevoir les Lead Magnets',
      icon: 'ri-download-2-line',
      description: 'Créer des ressources téléchargeables à haute valeur perçue pour capturer des leads qualifiés.',
      theme: 'accent',
      template: `[LEAD MAGNETS — PAR FORMAT]

── FORMATS STANDARD ──
📥 Checklist : "[Nombre] points de contrôle pour [Objectif]"
📥 Template : "Modèle de [Document] prêt à l'emploi"
📥 Guide : "Guide pratique : [Sujet] en [Nombre] étapes"
📥 Infographie : "[Statistique clé] — ce que ça signifie pour vous"
📥 Mini-audit : "Auto-diagnostic [Thème] en 5 minutes"

── FORMATS PREMIUM ──
📥 Livre blanc : "[Titre] — Analyse complète [Année]"
📥 Étude de cas : "Comment [Client] a [Résultat]"
📥 Webinar : "Masterclass [Sujet] avec [Expert]"
📥 Outil : "Simulateur / Calculateur [Thème]"
📥 Benchmark : "Comparatif sectoriel [Zone géographique]"

── CHECKLIST LEAD MAGNET ──
☐ Résout un problème spécifique
☐ Livrable en < 5 minutes de consommation
☐ Inclut le branding KHEPRA EXPERTS
☐ Formulaire de capture : Nom + Email + Fonction + Organisation
☐ Page de remerciement avec CTA secondaire`,
    },
    {
      id: 'bd-etape-5',
      number: '05',
      title: 'Concevoir les Séquences de Suivi',
      icon: 'ri-mail-send-line',
      description: 'Construire des séquences email automatisées pour convertir les leads en missions.',
      theme: 'primary',
      template: `[SÉQUENCE DE SUIVI — 7 EMAILS SUR 21 JOURS]

── JOUR 1 : EMAIL DE BIENVENUE ──
Objet : "Votre [Lead Magnet] est prêt — et la suite ?"
Contenu : Confirmation + lien téléchargement + 1 insight exclusif

── JOUR 3 : EMAIL DE VALEUR ──
Objet : "[Statistique] que tout [Fonction] devrait connaître"
Contenu : Insight + lien article blog + 1 recommandation

── JOUR 5 : EMAIL SOCIAL PROOF ──
Objet : "Comment [Client similaire] a résolu [Problème]"
Contenu : Mini étude de cas + résultats chiffrés

── JOUR 8 : EMAIL DIAGNOSTIC ──
Objet : "Où en êtes-vous vraiment sur [Sujet] ?"
Contenu : 5 questions d'auto-évaluation + CTA diagnostic

── JOUR 12 : EMAIL URGENCE ──
Objet : "[Échéance réglementaire] approche — êtes-vous prêt ?"
Contenu : Risques de non-conformité + CTA consultation

── JOUR 16 : EMAIL OFFRE ──
Objet : "Notre proposition pour [Organisation]"
Contenu : Offre de service personnalisée + CTA rendez-vous

── JOUR 21 : EMAIL DE CLÔTURE ──
Objet : "Dernier message — [Prénom]"
Contenu : Récapitulatif + ultime CTA + désabonnement

── RÈGLES ──
• Personnaliser avec prénom et organisation
• Un seul CTA par email
• Tracking des ouvertures et clics
• Sortie automatique si 3 emails sans ouverture`,
    },
    {
      id: 'bd-etape-6',
      number: '06',
      title: 'Propositions de Missions',
      icon: 'ri-file-paper-2-line',
      description: 'Structurer les propositions commerciales alignées sur les besoins identifiés.',
      theme: 'accent',
      template: `[PROPOSITION DE MISSION — STRUCTURE]

1. LETTRE DE MISSION
• Compréhension du besoin
• Approche méthodologique KHEPRA
• Équipe projet et qualifications
• Calendrier prévisionnel

2. OFFRE TECHNIQUE
• Périmètre détaillé
• Livrables par phase
• Méthodologie et outils
• Références similaires

3. OFFRE FINANCIÈRE
• Honoraires par phase
• Frais et débours
• Modalités de paiement
• Conditions de validité

4. ANNEXES
• CV des intervenants clés
• Références clients
• Charte déontologique
• CGV`,
    },
    {
      id: 'bd-etape-7',
      number: '07',
      title: 'Formations Associées',
      icon: 'ri-graduation-cap-line',
      description: 'Identifier les formations KHEPRA EXPERTS pertinentes pour chaque contenu.',
      theme: 'primary',
      template: `[FORMATIONS ASSOCIÉES]

── FORMATIONS STANDARD ──
🎓 Gouvernance d'entreprise — Niveau Conseil d'Administration
🎓 Conformité réglementaire BCEAO/COBAC — Niveau Opérationnel
🎓 LCB/FT — Niveau Responsable Conformité
🎓 Gestion des risques — Niveau Direction
🎓 Audit interne — Niveau Professionnel

── FORMATIONS SUR MESURE ──
🎓 Préparation à l'inspection COBAC/BCEAO
🎓 Cartographie des risques — Atelier pratique
🎓 Due diligence — Formation intensive
🎓 ESG et reporting durabilité — Niveau Direction
🎓 Prix de transfert — Documentation BEPS

── FORMATS ──
• Présentiel : 1-3 jours sur site client
• Distanciel : 4-8 modules de 2h
• Hybride : Mix présentiel + e-learning
• Certification : Évaluation et attestation KHEPRA`,
    },
  ],
};



