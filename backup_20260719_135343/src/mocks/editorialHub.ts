// ============================================================
// KHEPRA EXPERTS — Centre Éditorial — Mock Data
// Matrice 8 Axes d'Analyse × 8 Formats de Production
// Niveau Big Four — Institutionnel, Neutre, Référencé
// ============================================================

export const analysisAxes = [
  {
    id: 'axe-1',
    number: '01',
    title: 'Enjeux Stratégiques',
    icon: 'ri-focus-3-line',
    theme: 'primary',
    description: 'Identification des enjeux de positionnement, de compétitivité et de transformation structurelle. Analyse SWOT contextualisée au marché africain francophone.',
    deliverables: ['Note de positionnement stratégique', 'Matrice SWOT UEMOA/CEMAC', 'Cartographie des parties prenantes'],
    keywords: ['Positionnement', 'Compétitivité', 'Transformation', 'Marché', 'Croissance'],
  },
  {
    id: 'axe-2',
    number: '02',
    title: 'Risques',
    icon: 'ri-alert-line',
    theme: 'accent',
    description: 'Cartographie exhaustive des risques : opérationnels, financiers, réglementaires, réputationnels. Matrice probabilité × impact avec plans de mitigation.',
    deliverables: ['Matrice des risques 5×5', 'Registre des risques', 'Plan de mitigation', 'Indicateurs de risque clés (KRI)'],
    keywords: ['Risques opérationnels', 'Risques financiers', 'Mitigation', 'KRI', 'Due diligence'],
  },
  {
    id: 'axe-3',
    number: '03',
    title: 'Opportunités',
    icon: 'ri-lightbulb-flash-line',
    theme: 'primary',
    description: 'Détection et évaluation des opportunités de marché, de financement, de partenariat et d\'innovation. Analyse du potentiel de croissance.',
    deliverables: ['Matrice opportunités × faisabilité', 'Étude de marché sectorielle', 'Business case chiffré', 'Roadmap de capture'],
    keywords: ['Marché', 'Financement', 'Partenariat', 'Innovation', 'Croissance'],
  },
  {
    id: 'axe-4',
    number: '04',
    title: 'Implications Réglementaires',
    icon: 'ri-scales-line',
    theme: 'accent',
    description: 'Analyse du cadre réglementaire applicable : BCEAO, COBAC, OHADA, GAFI, BEPS, ISSB. Identification des obligations et des échéances.',
    deliverables: ['Matrice de conformité réglementaire', 'Calendrier des échéances', 'Analyse d\'impact réglementaire', 'Plan de mise en conformité'],
    keywords: ['BCEAO', 'COBAC', 'OHADA', 'GAFI', 'BEPS', 'ISSB', 'Conformité'],
  },
  {
    id: 'axe-5',
    number: '05',
    title: 'Impacts Financiers',
    icon: 'ri-funds-line',
    theme: 'primary',
    description: 'Quantification des impacts financiers : coûts, revenus, investissements, retour sur investissement. Modélisation financière avec scénarios.',
    deliverables: ['Modèle financier (3-5 ans)', 'Analyse coût-bénéfice', 'Scénarios stress tests', 'Plan de financement'],
    keywords: ['ROI', 'Coûts', 'Revenus', 'Investissement', 'Modélisation', 'Stress test'],
  },
  {
    id: 'axe-6',
    number: '06',
    title: 'Implications de Gouvernance',
    icon: 'ri-government-line',
    theme: 'accent',
    description: 'Évaluation des structures de gouvernance : conseil d\'administration, comités spécialisés, dispositif de contrôle interne. Alignement COSO 2013 / ISO 37000.',
    deliverables: ['Matrice RACI gouvernance', 'Charte des comités', 'Tableau de bord gouvernance', 'Plan de renforcement'],
    keywords: ['Gouvernance', 'CA', 'Comités', 'COSO', 'ISO 37000', 'Contrôle interne'],
  },
  {
    id: 'axe-7',
    number: '07',
    title: 'Bonnes Pratiques Internationales',
    icon: 'ri-global-line',
    theme: 'primary',
    description: 'Benchmark international des meilleures pratiques : standards ISO, recommandations GAFI, principes de Bâle, guidelines IFC. Adaptation au contexte africain.',
    deliverables: ['Benchmark international', 'Gap analysis vs standards', 'Recommandations adaptées', 'Plan d\'alignement progressif'],
    keywords: ['ISO', 'Bâle', 'GAFI', 'IFC', 'Benchmark', 'Standards'],
  },
  {
    id: 'axe-8',
    number: '08',
    title: 'Recommandations Opérationnelles',
    icon: 'ri-tools-line',
    theme: 'accent',
    description: 'Traduction des analyses en plan d\'action concret : priorisation, ressources, calendrier, indicateurs de suivi. Feuille de route exécutable à 90 jours.',
    deliverables: ['Plan d\'action 90 jours', 'Matrice priorisation (impact × effort)', 'Fiches actions détaillées', 'Tableau de suivi KPI'],
    keywords: ['Plan d\'action', 'Priorisation', 'Ressources', 'Calendrier', 'KPI', 'Suivi'],
  },
];

export const outputFormats = [
  {
    id: 'format-1',
    number: 'F1',
    title: 'Synopsis Exécutif',
    subtitle: 'Note de synthèse — Niveau COMEX',
    icon: 'ri-file-text-line',
    theme: 'primary',
    audience: 'DG, DAF, Président CA, COMEX',
    length: '2-3 pages (800-1 200 mots)',
    frequency: 'Par mission / Par trimestre',
    structure: [
      'En-tête confidentiel + classification',
      'Résumé exécutif (5 lignes max)',
      'Contexte et périmètre',
      'Constats clés (3-5 points)',
      'Analyse des 8 axes',
      'Recommandations prioritaires',
      'Prochaines étapes et calendrier',
    ],
    template: `[CONFIDENTIEL — NIVEAU COMEX]

RÉSUMÉ EXÉCUTIF
[Synthèse en 5 lignes — l'essentiel pour la décision]

1. CONTEXTE & PÉRIMÈTRE
[Mission, périmètre géographique, secteur, période]

2. CONSTATS CLÉS
• Constat 1 : [Donnée chiffrée + implication]
• Constat 2 : [Donnée chiffrée + implication]
• Constat 3 : [Donnée chiffrée + implication]

3. ANALYSE SYNTHÉTIQUE
[Tableau synthétique des 8 axes avec scores]

4. RECOMMANDATIONS
[3 recommandations classées par priorité/impact]

5. PROCHAINES ÉTAPES
[Calendrier, responsables, ressources]`,
  },
  {
    id: 'format-2',
    number: 'F2',
    title: 'Script Podcast',
    subtitle: 'Format audio — 25-35 minutes',
    icon: 'ri-mic-line',
    theme: 'accent',
    audience: 'Dirigeants, Cadres supérieurs, Investisseurs',
    length: '3 500-4 500 mots (25-35 min)',
    frequency: 'Hebdomadaire / Bi-mensuel',
    structure: [
      'Introduction + accroche (2 min)',
      'Présentation du sujet et de l\'invité (2 min)',
      'Contexte macro-économique / réglementaire (5 min)',
      'Analyse des enjeux (8 min)',
      'Focus sur 2-3 axes clés (8 min)',
      'Recommandations pratiques (5 min)',
      'Conclusion + CTA (3 min)',
    ],
    template: `[SCRIPT PODCAST — Durée : 30 min]

── INTRO (0:00-2:00) ──
[Musique signature KHEPRA — 15s]
HÔTE : "Bonjour et bienvenue dans [Nom du podcast], le podcast de KHEPRA EXPERTS qui décrypte les enjeux de gouvernance, conformité et transformation en Afrique. Je suis [Nom], et aujourd'hui nous parlons de [Sujet] avec [Invité]."

── ACCROCHE (2:00-4:00) ──
HÔTE : "[Question d'accroche — chiffre choc ou actualité brûlante]"

── CONTEXTE (4:00-9:00) ──
INVITÉ : "[Contexte macro / réglementaire — 3 points clés]"

── ANALYSE (9:00-17:00) ──
HÔTE : "[Question sur les enjeux stratégiques]"
INVITÉ : "[Analyse détaillée — 2-3 axes]"

── RECOMMANDATIONS (17:00-22:00) ──
INVITÉ : "[3 recommandations opérationnelles concrètes]"

── CONCLUSION (22:00-28:00) ──
HÔTE : "[Question de synthèse]"
INVITÉ : "[Message clé à retenir]"
HÔTE : "Merci [Invité]. Pour approfondir, téléchargez notre [Livre blanc/Guide] sur khepraexperts.com."

── OUTRO (28:00-30:00) ──
[Musique signature + CTA + mentions légales]`,
  },
  {
    id: 'format-3',
    number: 'F3',
    title: 'Script Vidéo YouTube',
    subtitle: 'Format vidéo — 12-18 minutes',
    icon: 'ri-video-line',
    theme: 'primary',
    audience: 'Professionnels, Entrepreneurs, Étudiants',
    length: '1 800-2 500 mots (12-18 min)',
    frequency: 'Mensuel / Bi-mensuel',
    structure: [
      'Hook visuel + titre (30s)',
      'Introduction et agenda (1 min)',
      'Partie 1 : Contexte et chiffres clés (3 min)',
      'Partie 2 : Analyse approfondie (5 min)',
      'Partie 3 : Solutions et recommandations (4 min)',
      'Conclusion + CTA + abonnement (1 min)',
      'Écran final : ressources + liens',
    ],
    template: `[SCRIPT VIDÉO YOUTUBE — Durée : 15 min]

── SCÈNE 1 : HOOK (0:00-0:30) ──
[PLAN : Face caméra, fond institutionnel KHEPRA]
[TEXTE À L'ÉCRAN : Titre de la vidéo]
PRÉSENTATEUR : "[Phrase d'accroche — statistique choc ou question provocante]"

── SCÈNE 2 : INTRODUCTION (0:30-1:30) ──
[PLAN : Face caméra + incrustation graphique]
PRÉSENTATEUR : "Dans cette vidéo, nous allons aborder [3 points clés]. Je suis [Nom], [Fonction] chez KHEPRA EXPERTS."

── SCÈNE 3 : CONTEXTE (1:30-4:30) ──
[PLAN : Graphiques, cartes, données chiffrées]
PRÉSENTATEUR (VOIX OFF) : "[Présentation du contexte avec données visuelles]"

── SCÈNE 4 : ANALYSE (4:30-9:30) ──
[PLAN : Alternance face caméra + slides]
PRÉSENTATEUR : "[Analyse détaillée — 3 sous-parties]"

── SCÈNE 5 : SOLUTIONS (9:30-13:30) ──
[PLAN : Face caméra + bullet points]
PRÉSENTATEUR : "[Recommandations concrètes — 3 points]"

── SCÈNE 6 : CONCLUSION (13:30-14:30) ──
[PLAN : Face caméra]
PRÉSENTATEUR : "Pour résumer : [3 points clés]. Abonnez-vous pour ne pas manquer nos prochaines analyses."

── SCÈNE 7 : ÉCRAN FINAL (14:30-15:00) ──
[PLAN : Écran graphique]
[TEXTE : khepraexperts.com | LinkedIn | Newsletter]
[TEXTE : Ressources mentionnées + liens]`,
  },
  {
    id: 'format-4',
    number: 'F4',
    title: 'Article Blog Expert',
    subtitle: 'Analyse approfondie — 2 500-3 500 mots',
    icon: 'ri-article-line',
    theme: 'accent',
    audience: 'Professionnels, Régulateurs, Recherche Google',
    length: '2 500-3 500 mots (8-12 min de lecture)',
    frequency: '3-5 par mois',
    structure: [
      'Titre SEO + meta description',
      'Executive Summary (150 mots)',
      'Contexte macro (300 mots)',
      'Analyse experte 3 parties (1 500 mots)',
      'Framework propriétaire KHEPRA (400 mots)',
      'Cas d\'usage / exemple concret (300 mots)',
      'FAQ intégrée (3-5 questions)',
      'CTA + Lead Magnet',
    ],
    template: `[ARTICLE BLOG EXPERT — 3 000 mots]

---
title: "[Titre SEO — 60 caractères max]"
description: "[Meta description — 155 caractères max]"
author: "[Nom], [Fonction]"
date: "[Date]"
---

## Executive Summary
[Synthèse 150 mots — l'essentiel pour le décideur pressé]

---

## 1. Contexte Macro
[Analyse du contexte économique, réglementaire, sectoriel — 300 mots]

## 2. Analyse Experte

### 2.1 [Sous-partie 1 — 500 mots]
[Analyse factuelle, données chiffrées, références]

### 2.2 [Sous-partie 2 — 500 mots]
[Analyse comparative, implications pratiques]

### 2.3 [Sous-partie 3 — 500 mots]
[Perspectives, tendances, prospective]

## 3. Framework KHEPRA : [Nom du framework]
[Framework propriétaire — 400 mots]
[Schéma / Tableau / Modèle]

## 4. Cas d'Usage : [Exemple concret]
[Situation réelle — entreprise, pays, secteur — 300 mots]

## FAQ
**Q1 : [Question fréquente]**
[Réponse concise 2-3 phrases]

**Q2 : [Question fréquente]**
[Réponse concise 2-3 phrases]

**Q3 : [Question fréquente]**
[Réponse concise 2-3 phrases]

---

## Passez à l'action
[Téléchargez notre guide complet / Réservez un diagnostic gratuit / Contactez notre équipe]`,
  },
  {
    id: 'format-5',
    number: 'F5',
    title: 'Publication LinkedIn',
    subtitle: 'Format social — 1 200-2 000 caractères',
    icon: 'ri-linkedin-line',
    theme: 'primary',
    audience: 'Réseau professionnel, Décideurs, Influenceurs',
    length: '1 200-2 000 caractères',
    frequency: '3-5 par semaine',
    structure: [
      'Hook — première ligne percutante',
      'Contexte — 2-3 phrases',
      'Analyse — 3 points clés',
      'Insight exclusif — 1 phrase',
      'Question d\'engagement',
      'CTA — lien vers ressource',
      'Hashtags — 3-5 pertinents',
    ],
    template: `[PUBLICATION LINKEDIN]

[Hook — première ligne qui donne envie de cliquer "voir plus"]

[Contexte — 2-3 phrases qui plantent le décor]

Ce qu'il faut retenir :

1️⃣ [Point clé 1 — une phrase]
2️⃣ [Point clé 2 — une phrase]  
3️⃣ [Point clé 3 — une phrase]

Notre analyse chez KHEPRA EXPERTS : [Insight exclusif — 1 phrase qui démontre l'expertise]

👉 [Question d'engagement ouverte]

Pour approfondir : [Lien vers article / guide / webinaire]

#Gouvernance #Conformité #BCEAO #KhepraExperts #[Secteur]`,
  },
  {
    id: 'format-6',
    number: 'F6',
    title: 'Newsletter Exécutive',
    subtitle: 'Email — Diffusion mensuelle',
    icon: 'ri-mail-send-line',
    theme: 'accent',
    audience: 'Abonnés, Clients, Partenaires, Prospects qualifiés',
    length: '800-1 200 mots',
    frequency: 'Mensuelle',
    structure: [
      'Objet email — accroche + personnalisation',
      'Header — logo + date + numéro',
      'Édito du Managing Partner (200 mots)',
      'Article principal — analyse (400 mots)',
      'Veille réglementaire — 3 alertes (200 mots)',
      'Ressource du mois — Lead Magnet (100 mots)',
      'Agenda — événements à venir (100 mots)',
      'Footer — contacts + réseaux + désabonnement',
    ],
    template: `[NEWSLETTER EXÉCUTIVE — Mensuelle]

OBJET : [Accroche] — Newsletter KHEPRA EXPERTS #[Numéro]

── HEADER ──
KHEPRA EXPERTS — Newsletter Exécutive
[N°] — [Mois Année]

── ÉDITO ──
Chers lecteurs,

[Message du Managing Partner — 200 mots]
[Vision, actualité du cabinet, thème du mois]

Dr. [Nom], Managing Partner

── À LA UNE ──
## [Titre de l'article principal]

[Analyse approfondie — 400 mots]
[Données chiffrées, références réglementaires]

[Lien : Lire l'article complet →]

── VEILLE RÉGLEMENTAIRE ──
📌 [Alerte 1 — 2 phrases + lien source]
📌 [Alerte 2 — 2 phrases + lien source]
📌 [Alerte 3 — 2 phrases + lien source]

── RESSOURCE DU MOIS ──
📥 [Titre du Lead Magnet]
[Télécharger →]

── AGENDA ──
🗓 [Date] — [Événement 1]
🗓 [Date] — [Événement 2]

── FOOTER ──
KHEPRA EXPERTS — Conseil stratégique pour l'Afrique
[Adresse] | [Email] | [Téléphone]
[LinkedIn] | [Site web]
[Se désabonner]`,
  },
  {
    id: 'format-7',
    number: 'F7',
    title: 'FAQ Institutionnelle',
    subtitle: 'Questions-Réponses — Référencement SEO/GEO',
    icon: 'ri-question-answer-line',
    theme: 'primary',
    audience: 'Clients, Prospects, Moteurs de recherche, IA génératives',
    length: '10-15 questions (1 500-2 500 mots)',
    frequency: 'Par sujet / Par page',
    structure: [
      'Introduction — périmètre de la FAQ',
      '10-15 questions structurées',
      'Réponses concises 40-80 mots',
      'Schema.org FAQPage markup',
      'Liens internes vers ressources',
      'Optimisation GEO (ChatGPT, Gemini, Perplexity)',
    ],
    template: `[FAQ — [Sujet]]

## Foire aux Questions — [Sujet]

### Q1 : [Question — mots-clés inclus naturellement]
[Réponse 40-80 mots, factuelle, référencée si nécessaire]

### Q2 : [Question — mots-clés inclus naturellement]
[Réponse 40-80 mots, incluant une statistique ou une référence]

### Q3 : [Question — mots-clés inclus naturellement]
[Réponse 40-80 mots]

### Q4 : [Question]
[Réponse 40-80 mots]

### Q5 : [Question]
[Réponse 40-80 mots]

### Q6 : [Question]
[Réponse 40-80 mots]

### Q7 : [Question]
[Réponse 40-80 mots]

### Q8 : [Question]
[Réponse 40-80 mots]

### Q9 : [Question]
[Réponse 40-80 mots]

### Q10 : [Question]
[Réponse 40-80 mots]

---

Pour aller plus loin :
📥 [Guide complet →]
📞 [Prendre rendez-vous avec un expert →]`,
  },
  {
    id: 'format-8',
    number: 'F8',
    title: 'Appel à l\'Action Commercial',
    subtitle: 'CTA — Conversion B2B',
    icon: 'ri-hand-heart-line',
    theme: 'accent',
    audience: 'Prospects qualifiés, Décideurs, DG, DAF',
    length: '200-400 mots',
    frequency: 'À chaque contenu',
    structure: [
      'Accroche — bénéfice principal',
      'Preuve sociale — chiffre ou témoignage',
      'Offre — claire et spécifique',
      'Urgence — raison d\'agir maintenant',
      'Bouton CTA — visible et actionnable',
      'Option secondaire — pour les non-prêts',
    ],
    template: `[CTA COMMERCIAL]

## [Bénéfice principal — une phrase percutante]

[Preuve sociale] : "Nous avons accompagné [X] organisations dont [Y] institutions financières de premier plan en Afrique de l'Ouest et centrale."

**Votre prochaine étape :**

🎯 **[Action principale]**
[Bénéfice en une phrase]

[→ Bouton CTA : Texte actionnable]

---

💡 *Vous n'êtes pas encore prêt ?*
[Téléchargez notre guide gratuit] ou [Abonnez-vous à notre newsletter] pour rester informé.`,
  },
];

export const frameworkMatrix = {
  title: 'Matrice Éditoriale KHEPRA',
  subtitle: '8 Axes d\'Analyse × 8 Formats de Production — Standard Big Four',
  description: 'Chaque croisement de la matrice représente un contenu spécifique, calibré pour un public et un format précis, respectant les standards de rigueur, de neutralité et de référencement des cabinets de conseil de niveau Big Four.',
  axes: analysisAxes,
  formats: outputFormats,
};

export const editorialStats = {
  publicationsAnnuelles: 64,
  formatsActifs: 8,
  axesAnalyse: 8,
  audiencesCibles: 7,
  paysCouverts: 15,
  scoreQualite: 9.7,
};

export const editorialPrinciples = [
  {
    id: 'principe-1',
    title: 'Rigueur Factuelle',
    description: 'Chaque affirmation est vérifiée et sourcée. Les références réglementaires sont datées et leur statut juridique est confirmé.',
    icon: 'ri-check-double-line',
  },
  {
    id: 'principe-2',
    title: 'Neutralité Institutionnelle',
    description: 'Le ton est neutre, objectif, sans parti pris. L\'analyse présente les faits et les implications sans orientation politique ou commerciale.',
    icon: 'ri-scales-3-line',
  },
  {
    id: 'principe-3',
    title: 'Orientation Décideurs',
    description: 'Chaque contenu est conçu pour répondre aux besoins des dirigeants : synthétique, actionnable, stratégique.',
    icon: 'ri-user-star-line',
  },
  {
    id: 'principe-4',
    title: 'Référencement Vérifié',
    description: 'Les sources sont officielles, publiques et traçables : journaux officiels, circulaires, instructions, normes internationales.',
    icon: 'ri-file-search-line',
  },
  {
    id: 'principe-5',
    title: 'Standard Big Four',
    description: 'Structure, mise en page, niveau de détail et qualité de rédaction alignés sur les standards Deloitte, PwC, EY, KPMG.',
    icon: 'ri-building-4-line',
  },
  {
    id: 'principe-6',
    title: 'Zéro Hallucination',
    description: 'Aucune donnée n\'est inventée. Les projections sont explicitement qualifiées comme telles. Les incertitudes sont documentées.',
    icon: 'ri-shield-check-line',
  },
];



