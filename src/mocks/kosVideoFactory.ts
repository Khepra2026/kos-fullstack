// ============================================================================
// KOS VIDEO FACTORY™ — Hub 97
// Big Four Automatic Video Production Chain
// Storyboard × Scènes × Animations × Sous-titres × Transitions × CTA
// YouTube Shorts / Long Form / LinkedIn Video / Facebook Video
// ============================================================================

export interface VideoProject {
  id: string;
  title: string;
  format: 'youtube-shorts' | 'youtube-long' | 'linkedin-video' | 'facebook-video';
  formatLabel: string;
  formatIcon: string;
  formatColor: string;
  durationSec: number;
  durationLabel: string;
  domain: string;
  domainIcon: string;
  synopsis: string;
  productionDate: string;
  storyboard: VideoScene[];
  retentionOptimizations: RetentionOptimization[];
  seoOptimizations: SEOOptimization[];
  engagementHooks: EngagementHook[];
}

export interface VideoScene {
  sceneNumber: number;
  title: string;
  durationSec: number;
  visualDescription: string;
  narration: string;
  animation: string;
  transitionTo: string;
  onScreenText: string;
  audioCue: string;
}

export interface RetentionOptimization {
  technique: string;
  description: string;
  expectedImpact: string;
  icon: string;
}

export interface SEOOptimization {
  element: string;
  optimizedValue: string;
  platform: string;
  bestPractice: string;
  icon: string;
}

export interface EngagementHook {
  hookType: string;
  timing: string;
  script: string;
  visual: string;
  icon: string;
}

export const VIDEO_PROJECTS: VideoProject[] = [
  // ======================================================================
  // PROJECT 1 — YouTube Shorts — Ratio Solvabilité (60 sec)
  // ======================================================================
  {
    id: 'VID-001', title: 'Ratio Solvabilité UEMOA 2026 en 60 Secondes', format: 'youtube-shorts', formatLabel: 'YouTube Shorts', formatIcon: 'ri-youtube-line', formatColor: 'accent',
    durationSec: 60, durationLabel: '≤ 60 sec', domain: 'BCEAO', domainIcon: 'ri-bank-line',
    synopsis: 'La BCEAO a relevé le ratio de solvabilité minimum à 12% pour les banques systémiques. En 60 secondes, tout ce que les DG et DAF doivent savoir : nouveau seuil, calendrier, et les 3 actions immédiates à prendre.',
    productionDate: '2026-06-23',
    storyboard: [
      { sceneNumber: 1, title: 'Hook — Alerte Réglementaire', durationSec: 5, visualDescription: 'Fond rouge institutionnel. Texte "ALERTE BCEAO" en surimpression. Son alarme discrète.', narration: 'ALERTE BCEAO ! Le ratio de solvabilité change.', animation: 'Zoom avant rapide + flash', transitionTo: 'Cut sec', onScreenText: 'ALERTE BCEAO', audioCue: 'Alerte sonore courte, impact' },
      { sceneNumber: 2, title: 'Le Chiffre Clé', durationSec: 8, visualDescription: 'Animation chiffre 12% qui grossit. Fond bleu marine. Jauge qui monte.', narration: '12%. C\'est le nouveau ratio minimum pour les banques systémiques UEMOA. Applicable dès maintenant.', animation: 'Scale up 12% + barre progression', transitionTo: 'Slide gauche', onScreenText: '12%', audioCue: 'Son compteur qui monte' },
      { sceneNumber: 3, title: 'Le Calendrier', durationSec: 10, visualDescription: 'Timeline animée : Décembre 2026 (50%), Décembre 2027 (100%).', narration: 'Calendrier : 50% de l\'effort d\'ici décembre 2026. Conformité totale : décembre 2027.', animation: 'Défilement timeline avec points', transitionTo: 'Fondu', onScreenText: 'Déc 2026 → 50%\nDéc 2027 → 100%', audioCue: 'Tic-tac horloge' },
      { sceneNumber: 4, title: 'Les 3 Actions', durationSec: 15, visualDescription: '3 icônes en colonne qui apparaissent successivement. Numéros 1, 2, 3.', narration: '3 actions immédiates. 1 : diagnostic de solvabilité. 2 : modéliser les 3 scénarios de renforcement. 3 : préparer votre plan de transition pour la Commission Bancaire.', animation: 'Fade-in séquentiel icônes', transitionTo: 'Slide droite', onScreenText: '1. Diagnostic\n2. Modélisation\n3. Plan', audioCue: 'Ding à chaque action' },
      { sceneNumber: 5, title: 'Call to Action', durationSec: 12, visualDescription: 'Logo KHEPRA EXPERTS. QR code. Texte "Diagnostic Flash Gratuit".', narration: 'KHEPRA EXPERTS vous offre un diagnostic flash confidentiel. Scannez le QR code ou visitez khepraexperts.com.', animation: 'QR code pulse + logo fade-in', transitionTo: 'Fondu noir', onScreenText: 'Diagnostic Flash Gratuit\nkhepraexperts.com', audioCue: 'Jingle KHEPRA 3 secondes' },
      { sceneNumber: 6, title: 'End Screen', durationSec: 10, visualDescription: 'Miniatures vidéos suggérées + bouton abonnement + like.', narration: 'Abonnez-vous pour ne rien manquer de l\'actualité réglementaire africaine.', animation: 'Cartes suggestions slide-up', transitionTo: 'Fin', onScreenText: 'ABONNEZ-VOUS', audioCue: 'Musique sortie' },
    ],
    retentionOptimizations: [
      { technique: 'Hook en 3 secondes', description: 'Alerte BCEAO + animation flash dans les 3 premières secondes', expectedImpact: '+40% rétention 3s', icon: 'ri-flashlight-line' },
      { technique: 'Pattern Interrupt', description: 'Changement brusque de couleur (rouge → bleu) à 5 secondes', expectedImpact: '+25% rétention 5s', icon: 'ri-contrast-line' },
      { technique: 'Texte dynamique', description: 'Mots clés en surimpression synchronisés avec la voix off', expectedImpact: '+30% taux de complétion', icon: 'ri-text-wrap' },
      { technique: 'CTA milieu (12s)', description: 'QR code + offre gratuite en milieu de vidéo', expectedImpact: '+35% CTR', icon: 'ri-qr-code-line' },
    ],
    seoOptimizations: [
      { element: 'Titre', optimizedValue: 'Ratio Solvabilité UEMOA 2026 : Tout Savoir en 60 Secondes #BCEAO', platform: 'YouTube', bestPractice: 'Mot-clé principal en début de titre, hashtag pertinent', icon: 'ri-hashtag' },
      { element: 'Description', optimizedValue: 'La BCEAO relève le ratio de solvabilité à 12% pour les banques systémiques UEMOA. Calendrier, implications et actions immédiates. Diagnostic flash gratuit → khepraexperts.com', platform: 'YouTube', bestPractice: '200+ caractères, 3-5 hashtags, lien CTA', icon: 'ri-file-text-line' },
      { element: 'Tags', optimizedValue: 'BCEAO, ratio solvabilité, UEMOA, banques africaines, régulation bancaire, Bâle III, fonds propres, KHEPRA EXPERTS', platform: 'YouTube', bestPractice: '10-20 tags, mélange broad + spécifiques', icon: 'ri-price-tag-3-line' },
      { element: 'Miniature', optimizedValue: 'Fond rouge institutionnel, texte "12%" en énorme, logo BCEAO stylisé, visage expert', platform: 'YouTube', bestPractice: 'Contraste élevé, texte lisible, visage si possible', icon: 'ri-image-line' },
      { element: 'Hashtags', optimizedValue: '#BCEAO #UEMOA #Banque #Régulation #FinanceAfrique', platform: 'YouTube Shorts', bestPractice: '3-5 hashtags ciblés', icon: 'ri-hashtag' },
    ],
    engagementHooks: [
      { hookType: 'Question rhétorique', timing: '0-3s', script: 'Savez-vous que votre banque doit trouver 2 milliards de fonds propres supplémentaires ?', visual: 'Texte "2 milliards FCFA" qui pulse', icon: 'ri-question-mark' },
      { hookType: 'Statistique choc', timing: '3-5s', script: '15% des banques UEMOA sont SOUS le seuil actuel de 9.5%...', visual: 'Graphique camembert rouge 15%', icon: 'ri-bar-chart-line' },
      { hookType: 'Urgence temporelle', timing: '15-20s', script: 'Vous avez 6 mois pour atteindre 50% de l\'objectif. L\'horloge tourne.', visual: 'Compte à rebours animé', icon: 'ri-timer-line' },
      { hookType: 'Offre gratuite', timing: '45-50s', script: 'Diagnostic flash OFFERT. 100% confidentiel. 48h pour vos résultats.', visual: 'QR code + badge "GRATUIT"', icon: 'ri-gift-line' },
    ],
  },

  // ======================================================================
  // PROJECT 2 — YouTube Long Form — Cybersécurité COBAC (12 min)
  // ======================================================================
  {
    id: 'VID-002', title: 'Cybersécurité Bancaire — Directive COBAC 2027 : Guide Complet', format: 'youtube-long', formatLabel: 'YouTube Long Form', formatIcon: 'ri-youtube-fill', formatColor: 'primary',
    durationSec: 720, durationLabel: '12 min', domain: 'COBAC', domainIcon: 'ri-building-2-line',
    synopsis: 'Guide complet (12 minutes) sur la directive COBAC 2027 de résilience opérationnelle numérique. 5 piliers décryptés, checklist pratique, budget type, et pièges à éviter. Pour DSI, RSSI, DG et Risk Managers.',
    productionDate: '2026-06-23',
    storyboard: [
      { sceneNumber: 1, title: 'Intro — Pourquoi cette directive ?', durationSec: 60, visualDescription: 'Plan large expert KHEPRA en studio. Incrustation "Directive COBAC 2027 — Résilience Numérique".', narration: 'Le 1er janvier 2027, la directive COBAC sur la cybersécurité bancaire entre en vigueur. Dans 6 mois. Toutes les banques, SFD, établissements de paiement CEMAC sont concernés. Aujourd\'hui, je vous donne la checklist complète.', animation: 'Fade-in présentateur + overlay texte', transitionTo: 'Cut', onScreenText: 'Directive COBAC 2027\nRésilience Opérationnelle Numérique', audioCue: 'Générique KHEPRA (8s)' },
      { sceneNumber: 2, title: 'Le Contexte — DORA Africain', durationSec: 45, visualDescription: 'Split screen : carte CEMAC + captures écran directive. Comparaison DORA Europe.', narration: 'Cette directive est le "DORA africain". Elle s\'inscrit dans un mouvement mondial de renforcement de la cybersécurité financière. 5 piliers à connaître.', animation: 'Carte zoom + parallaxe', transitionTo: 'Slide', onScreenText: 'DORA Africain', audioCue: 'Musique fond tech' },
      { sceneNumber: 3, title: 'Pilier 1 — Gouvernance ICT', durationSec: 75, visualDescription: 'Diagramme organigramme COMEX avec poste RSSI. Texte clé en surimpression.', narration: 'Pilier 1 : la gouvernance ICT. Vous devez désigner un responsable ICT au niveau du COMEX. Pas un simple chef de projet — un RSSI avec autorité et budget. Budget minimum recommandé : 5-8% du budget IT.', animation: 'Apparition boîtes organigramme', transitionTo: 'Slide', onScreenText: 'PILIER 1\nGouvernance ICT\nRSSI au COMEX', audioCue: 'Son validation' },
      { sceneNumber: 4, title: 'Pilier 2 — Gestion des Risques ICT', durationSec: 90, visualDescription: 'Matrice risques 5×5 interactive. Assets IT listés.', narration: 'Pilier 2 : cartographiez TOUS vos actifs ICT et leurs risques. Matériel, logiciels, données, réseaux, prestataires. Pour chaque actif : probabilité × impact. Les banques sous-estiment systématiquement le risque "prestataire".', animation: 'Heatmap animée', transitionTo: 'Slide', onScreenText: 'PILIER 2\nCartographie des Risques ICT', audioCue: 'Son alerte modéré' },
      { sceneNumber: 5, title: 'Pilier 3 — Gestion des Incidents', durationSec: 90, visualDescription: 'Timeline incident : détection → classification → notification → résolution. Chronomètre 24h.', narration: 'Pilier 3 : en cas d\'incident majeur, vous avez 24h pour notifier la COBAC. Pas 48h, pas 72h — 24h. Vous devez avoir un processus rodé. Testez-le ! La plupart des banques découvrent qu\'elles mettent 72h en moyenne.', animation: 'Flux timeline avec compte à rebours', transitionTo: 'Slide', onScreenText: 'PILIER 3\nNotification COBAC\nsous 24h', audioCue: 'Tic-tac urgence' },
      { sceneNumber: 6, title: 'Pilier 4 — Tests de Résilience', durationSec: 90, visualDescription: 'Animation pentest, simulateur crise, rapport. Écran divisé : avant/après.', narration: 'Pilier 4 : un test de résilience annuel est obligatoire. Pentest, simulation de crise cyber, test de reprise. Le rapport doit être transmis à la COBAC. Budget moyen : 25-50M FCFA par test.', animation: 'Simulation visuelle pentest', transitionTo: 'Slide', onScreenText: 'PILIER 4\nTest de Résilience Annuel', audioCue: 'Son alerte + résolution' },
      { sceneNumber: 7, title: 'Pilier 5 — Prestataires Tiers', durationSec: 75, visualDescription: 'Roue de fournisseurs ICT. Certains en rouge (critiques), orange, vert.', narration: 'Pilier 5 : auditez vos prestataires ICT critiques. Cloud, datacenter, core banking, messagerie. Si votre core banking est dans le cloud, votre prestataire cloud doit être audité. C\'est le pilier le plus souvent négligé.', animation: 'Roue tournante fournisseurs', transitionTo: 'Slide', onScreenText: 'PILIER 5\nAudit Prestataires ICT', audioCue: 'Son vérification' },
      { sceneNumber: 8, title: 'Checklist Pratique — 6 Mois', durationSec: 90, visualDescription: 'Calendrier 6 mois en tableau. Septembre à Décembre 2026.', narration: 'Voici votre feuille de route des 6 prochains mois. Septembre : cartographie ICT complète. Octobre : politique cybersécurité et nomination RSSI. Novembre : test de résilience. Décembre : rapport de conformité initial. Budget total : 150-400M FCFA selon votre taille.', animation: 'Calendrier cases cochées', transitionTo: 'Slide', onScreenText: 'Sept → Cartographie\nOct → Politique\nNov → Test\nDéc → Rapport', audioCue: 'Ding à chaque mois' },
      { sceneNumber: 9, title: 'Les 3 Pièges à Éviter', durationSec: 60, visualDescription: '3 panneaux DANGER avec texte. Animation avertissement.', narration: 'Piège 1 : sous-estimer le budget. Piège 2 : nommer un RSSI sans autorité réelle. Piège 3 : attendre le dernier moment — les prestataires qualifiés seront saturés en décembre. Commencez MAINTENANT.', animation: 'Panneaux qui clignotent', transitionTo: 'Slide', onScreenText: '⚠️ Budget\n⚠️ Autorité RSSI\n⚠️ Délai', audioCue: 'Alerte sonore' },
      { sceneNumber: 10, title: 'Conclusion + CTA', durationSec: 60, visualDescription: 'Expert face caméra + QR code + offre KHEPRA.', narration: 'La directive COBAC 2027 n\'est pas une option. Les sanctions peuvent aller jusqu\'à la suspension d\'agrément. KHEPRA EXPERTS a développé une méthodologie accélérée de mise en conformité. Contactez-nous pour un diagnostic flash. Lien dans la description.', animation: 'QR code pulse + texte', transitionTo: 'Fondu', onScreenText: 'Diagnostic Flash COBAC 2027\nkhepraexperts.com/cobac-cyber', audioCue: 'Jingle KHEPRA' },
      { sceneNumber: 11, title: 'End Screen', durationSec: 15, visualDescription: 'Écran fin : vidéos recommandées + abonnement + like + commentaire.', narration: 'Si cette vidéo vous a été utile, likez, commentez "COBAC 2027" et abonnez-vous pour plus de contenu réglementaire.', animation: 'Cartes suggestions', transitionTo: 'Fin', onScreenText: 'ABONNEZ-VOUS\nCOBAC 2027', audioCue: 'Musique sortie' },
    ],
    retentionOptimizations: [
      { technique: 'Chapitrage YouTube', description: '11 chapitres cliquables dans la barre de progression', expectedImpact: '+50% temps de visionnage', icon: 'ri-list-check' },
      { technique: 'Pattern Interrupt visuel', description: 'Changement de plan toutes les 8-10 secondes, pas de plan fixe > 15s', expectedImpact: '+35% rétention milieu', icon: 'ri-movie-line' },
      { technique: 'Texte Key Message', description: 'Mots clés en surimpression (PILIER 1, 24h, 400M FCFA)', expectedImpact: '+40% mémorisation', icon: 'ri-text-wrap' },
      { technique: 'Question mi-vidéo', description: 'Question posée à 5:00 pour relancer l\'attention', expectedImpact: '+25% rétention 2e moitié', icon: 'ri-question-answer-line' },
      { technique: 'Boucle ouverte', description: '"Les 3 pièges à éviter" annoncé au début, révélé à la fin', expectedImpact: '+45% taux de complétion', icon: 'ri-loop-right-line' },
    ],
    seoOptimizations: [
      { element: 'Titre', optimizedValue: 'Directive COBAC 2027 Cybersécurité Bancaire : Checklist Complète (6 mois pour être prêt)', platform: 'YouTube', bestPractice: 'Mot-clé principal + promesse + timeframe', icon: 'ri-hashtag' },
      { element: 'Description', optimizedValue: 'Guide complet directive COBAC 2027. 5 piliers décryptés. Checklist 6 mois. Budget. Pièges. Pour DSI, RSSI, DG, banques CEMAC. Diagnostic gratuit → lien.', platform: 'YouTube', bestPractice: 'Description détaillée 500+ caractères avec timestamps', icon: 'ri-file-text-line' },
      { element: 'Miniature', optimizedValue: 'Fond noir tech, bouclier vert "COBAC 2027", texte "CHECKLIST 6 MOIS", visage expert inquiet', platform: 'YouTube', bestPractice: 'Contraste fort, texte < 5 mots, émotion visible', icon: 'ri-image-line' },
      { element: 'Playlist', optimizedValue: 'Ajout playlist "Régulation Bancaire CEMAC" et "Cybersécurité Finance"', platform: 'YouTube', bestPractice: '2-3 playlists thématiques pertinentes', icon: 'ri-play-list-2-line' },
    ],
    engagementHooks: [
      { hookType: 'Urgence temporelle', timing: '0-5s', script: 'Dans 6 mois, cette directive entre en vigueur. Êtes-vous prêt ? 70% des banques ne le sont pas.', visual: 'Compte à rebours 6 mois', icon: 'ri-timer-line' },
      { hookType: 'Promesse valeur', timing: '10-15s', script: 'À la fin de cette vidéo, vous aurez une checklist complète et actionable.', visual: 'Aperçu checklist', icon: 'ri-checkbox-line' },
      { hookType: 'Statistique choc', timing: '120-125s', script: 'Savez-vous que la plupart des banques mettent 72h à notifier un incident, alors que le délai COBAC est de 24h ?', visual: 'Graphique 72h vs 24h', icon: 'ri-bar-chart-line' },
      { hookType: 'Question communauté', timing: '600-605s', script: 'Votre banque a-t-elle déjà nommé un RSSI au COMEX ? Dites-le moi en commentaire.', visual: 'Zone commentaire animée', icon: 'ri-chat-3-line' },
    ],
  },

  // ======================================================================
  // PROJECT 3 — LinkedIn Video — Gouvernance SFD (3 min)
  // ======================================================================
  {
    id: 'VID-003', title: 'Les 7 Piliers de Gouvernance SFD qui Attirent les Investisseurs', format: 'linkedin-video', formatLabel: 'LinkedIn Video', formatIcon: 'ri-linkedin-box-line', formatColor: 'secondary',
    durationSec: 180, durationLabel: '3 min', domain: 'Microfinance', domainIcon: 'ri-hand-coin-line',
    synopsis: 'Vidéo LinkedIn 3 minutes sur les 7 piliers de gouvernance SFD exigés par la BCEAO. Format carré (1:1) optimisé pour le feed LinkedIn. Objectif : attirer les DG de SFD et les investisseurs en microfinance.',
    productionDate: '2026-06-23',
    storyboard: [
      { sceneNumber: 1, title: 'Hook LinkedIn', durationSec: 10, visualDescription: 'Format carré. Texte "7 PILIERS" en gros. Fond dégradé KHEPRA. Sous-titres FR.', narration: 'Vous dirigez une SFD et vous voulez attirer des investisseurs ? Voici les 7 piliers de gouvernance que la BCEAO exige.', animation: 'Texte scale-up + fondu', transitionTo: 'Slide', onScreenText: '7 PILIERS\nGouvernance SFD', audioCue: 'Son impact' },
      { sceneNumber: 2, title: 'Piliers 1-3', durationSec: 45, visualDescription: '3 icônes en ligne. CA → Indépendance → Comités.', narration: 'Pilier 1 : un Conseil d\'Administration d\'au moins 5 membres avec 30% d\'indépendants. Pilier 2 : le CA définit la stratégie, contrôle le DG, et valide les risques. Pilier 3 : des comités spécialisés — Audit et Risques obligatoires pour les SFD de catégorie 3.', animation: 'Icônes fade-in séquentiel', transitionTo: 'Slide', onScreenText: '1. CA ≥ 5 membres\n2. Rôle Stratégique\n3. Comités Spécialisés', audioCue: 'Ding à chaque pilier' },
      { sceneNumber: 3, title: 'Piliers 4-5', durationSec: 40, visualDescription: 'Graphique transparence + icône balance.', narration: 'Pilier 4 : transparence — reporting financier régulier, états financiers audités publiés. Pilier 5 : gestion des conflits d\'intérêts — politique écrite, registre, procédure d\'abstention.', animation: 'Documents qui s\'empilent', transitionTo: 'Slide', onScreenText: '4. Transparence\n5. Conflits d\'Intérêts', audioCue: 'Son validation' },
      { sceneNumber: 4, title: 'Piliers 6-7', durationSec: 40, visualDescription: 'Icône clients + icône évaluation.', narration: 'Pilier 6 : protection des clients — tarification transparente, traitement des réclamations. Pilier 7 : évaluation annuelle du CA avec plan d\'amélioration.', animation: 'Bouclier protection + check', transitionTo: 'Slide', onScreenText: '6. Protection Clients\n7. Évaluation Annuelle', audioCue: 'Son validation' },
      { sceneNumber: 5, title: 'Cas Pratique Express', durationSec: 25, visualDescription: 'Texte "32 → 78 /100" + "2.5 Mrd FCFA levés". Graphique simple avant/après.', narration: 'Une SFD burkinabé est passée d\'une note de gouvernance de 32 à 78 sur 100. Résultat : 2,5 milliards FCFA levés auprès d\'investisseurs.', animation: 'Compteur qui monte 32 → 78', transitionTo: 'Slide', onScreenText: 'Score 32 → 78\nLevée 2.5 Mrd FCFA', audioCue: 'Son succès' },
      { sceneNumber: 6, title: 'CTA LinkedIn', durationSec: 20, visualDescription: 'Logo KHEPRA + "Téléchargez le Guide" + QR code / lien. Sous-titres.', narration: 'Téléchargez notre guide complet "7 Piliers de Gouvernance SFD" et notre outil d\'auto-évaluation. Lien dans le post.', animation: 'QR code pulse', transitionTo: 'Fondu', onScreenText: 'Guide Gratuit\nkhepraexperts.com/gouvernance-sfd', audioCue: 'Jingle KHEPRA' },
    ],
    retentionOptimizations: [
      { technique: 'Format carré 1:1', description: 'Occupation 78% de l\'écran mobile vs 51% en 16:9', expectedImpact: '+45% visibilité feed', icon: 'ri-aspect-ratio-line' },
      { technique: 'Sous-titres obligatoires', description: '85% des vidéos LinkedIn sont regardées sans son', expectedImpact: '+70% taux complétion', icon: 'ri-closed-captioning-line' },
      { technique: 'Hook valeur en 3s', description: 'Promesse "attirer des investisseurs" dès la première phrase', expectedImpact: '+60% rétention 3s', icon: 'ri-flashlight-line' },
      { technique: 'Preuve sociale', description: 'Cas chiffré réel (32→78, 2.5 Mrd levés)', expectedImpact: '+40% crédibilité', icon: 'ri-verified-badge-line' },
    ],
    seoOptimizations: [
      { element: 'Texte du post', optimizedValue: 'Les 7 piliers de gouvernance SFD exigés par la BCEAO pour attirer les investisseurs. Guide complet + outil d\'auto-évaluation offerts. #Microfinance #Gouvernance #BCEAO #SFD #Investissement', platform: 'LinkedIn', bestPractice: '1300-3000 car, 3-5 hashtags, CTA', icon: 'ri-file-text-line' },
      { element: 'Hashtags', optimizedValue: '#Microfinance #Gouvernance #BCEAO #SFD #InvestissementAfrique', platform: 'LinkedIn', bestPractice: '3-5 hashtags en fin de post', icon: 'ri-hashtag' },
      { element: 'Tag personnes', optimizedValue: '@DG SFD influents, @Investisseurs microfinance, @BCEAO', platform: 'LinkedIn', bestPractice: 'Tag 3-5 personnes/entreprises pertinentes', icon: 'ri-at-line' },
    ],
    engagementHooks: [
      { hookType: 'Question directe', timing: '0-3s', script: 'Vous dirigez une SFD et vous voulez attirer des investisseurs ?', visual: 'Texte question en gros', icon: 'ri-question-mark' },
      { hookType: 'Listicle promesse', timing: '5-10s', script: 'Voici les 7 piliers de gouvernance que la BCEAO exige.', visual: 'Numéros 1 à 7', icon: 'ri-list-check' },
      { hookType: 'Preuve sociale', timing: '140-150s', script: 'Une SFD est passée de 32 à 78/100 et a levé 2.5 milliards.', visual: 'Compteur 32→78', icon: 'ri-line-chart-line' },
    ],
  },

  // ======================================================================
  // PROJECT 4 — Facebook Video — ESG ISSB (2 min)
  // ======================================================================
  {
    id: 'VID-004', title: 'ESG : Pourquoi les Banques Africaines Doivent Agir MAINTENANT', format: 'facebook-video', formatLabel: 'Facebook Video', formatIcon: 'ri-facebook-box-line', formatColor: 'primary',
    durationSec: 120, durationLabel: '2 min', domain: 'ESG', domainIcon: 'ri-seedling-line',
    synopsis: 'Vidéo Facebook 2 minutes sur l\'urgence ESG pour les banques africaines. Standards ISSB, bilan carbone, attentes des investisseurs. Format carré optimisé mobile. Ton accessible mais institutionnel.',
    productionDate: '2026-06-23',
    storyboard: [
      { sceneNumber: 1, title: 'Hook — Question choc', durationSec: 8, visualDescription: 'Format 1:1 carré. Fond vert nature. Texte "ESG = URGENT". Sous-titres FR.', narration: 'Savez-vous que dans 18 mois, vos investisseurs exigeront un rapport ESG conforme aux standards ISSB ?', animation: 'Texte zoom + pulse', transitionTo: 'Slide', onScreenText: 'ESG = URGENT\n18 MOIS', audioCue: 'Son impact nature' },
      { sceneNumber: 2, title: 'Qu\'est-ce que l\'ISSB ?', durationSec: 25, visualDescription: 'Logo IFRS/ISSB. Graphique simple : IFRS S1 (général) + IFRS S2 (climat).', narration: 'L\'ISSB a publié deux standards : IFRS S1 sur la durabilité, IFRS S2 sur le climat. Ces standards deviennent la référence mondiale. La BCEAO et la COBAC préparent leur adoption.', animation: 'Split screen S1/S2', transitionTo: 'Slide', onScreenText: 'IFRS S1 — Durabilité\nIFRS S2 — Climat', audioCue: 'Musique fond douce' },
      { sceneNumber: 3, title: 'Impact sur les Banques', durationSec: 30, visualDescription: 'Animation portefeuille de prêts → bilan carbone. Icônes secteurs (agriculture, énergie, transport).', narration: 'Pour une banque, le plus gros défi c\'est le scope 3 : les émissions de vos clients. Chaque prêt que vous accordez a une empreinte carbone. Les investisseurs vont vous demander de la mesurer.', animation: 'Flux prêts → carbone', transitionTo: 'Slide', onScreenText: 'SCOPE 3\nÉmissions Financées', audioCue: 'Son transition' },
      { sceneNumber: 4, title: 'Par où commencer ?', durationSec: 30, visualDescription: '3 étapes numérotées. Icône diagnostic → bilan → rapport.', narration: 'Étape 1 : un diagnostic ESG de votre portefeuille. Étape 2 : un premier bilan carbone simplifié. Étape 3 : un rapport pilote ISSB. Budget estimé : 100-300 millions FCFA sur 2 ans. C\'est moins que le coût d\'une non-conformité.', animation: 'Check-list animée', transitionTo: 'Slide', onScreenText: '1. Diagnostic\n2. Bilan Carbone\n3. Rapport ISSB', audioCue: 'Ding à chaque étape' },
      { sceneNumber: 5, title: 'Opportunité, pas Contrainte', durationSec: 15, visualDescription: 'Texte "Avantage Compétitif" + étoiles. Icône investisseurs.', narration: 'Les banques pionnières en ESG attirent de nouveaux investisseurs. C\'est une opportunité, pas une contrainte.', animation: 'Étoiles qui apparaissent', transitionTo: 'Slide', onScreenText: 'OPPORTUNITÉ\nAvantage Compétitif', audioCue: 'Son positif' },
      { sceneNumber: 6, title: 'CTA', durationSec: 12, visualDescription: 'Logo KHEPRA + "Diagnostic ESG Flash Gratuit". Lien en commentaire.', narration: 'KHEPRA EXPERTS vous offre un diagnostic ESG flash. Lien en commentaire.', animation: 'QR code + texte', transitionTo: 'Fondu', onScreenText: 'Diagnostic ESG Gratuit\nkhepraexperts.com/esg', audioCue: 'Jingle KHEPRA' },
    ],
    retentionOptimizations: [
      { technique: 'Texte permanent', description: 'Texte clé toujours visible (pas seulement sous-titres)', expectedImpact: '+55% rétention sans son', icon: 'ri-text-wrap' },
      { technique: 'Rythme rapide', description: 'Plan max 5 secondes, beaucoup de mouvements', expectedImpact: '+40% rétention mobile', icon: 'ri-speed-mini-line' },
      { technique: 'Cadre émotionnel positif', description: 'Terminer sur l\'opportunité, pas la menace', expectedImpact: '+30% partages', icon: 'ri-emotion-happy-line' },
    ],
    seoOptimizations: [
      { element: 'Texte du post', optimizedValue: '🌍 Pourquoi toutes les banques africaines doivent intégrer l\'ESG dès maintenant. Standards ISSB, bilan carbone, attentes investisseurs. On vous explique tout en 2 minutes.', platform: 'Facebook', bestPractice: 'Texte 100-300 car, emoji d\'accroche, CTA clair', icon: 'ri-file-text-line' },
      { element: 'Miniature Facebook', optimizedValue: 'Fond vert, texte "ESG BANQUES", visage femme africaine professionnelle', platform: 'Facebook', bestPractice: 'Texte minimal, contraste fort, visage humain', icon: 'ri-image-line' },
    ],
    engagementHooks: [
      { hookType: 'Question urgence', timing: '0-5s', script: 'Dans 18 mois, vos investisseurs exigeront un rapport ESG. Êtes-vous prêt ?', visual: 'Compte à rebours 18 mois', icon: 'ri-timer-line' },
      { hookType: 'Vulgarisation', timing: '30-40s', script: 'Le scope 3, c\'est simple : c\'est le carbone de vos clients. Chaque prêt = du CO2.', visual: 'Animation prêt → CO2', icon: 'ri-lightbulb-line' },
      { hookType: 'Avantage compétitif', timing: '100-110s', script: 'Les banques pionnières ESG attirent plus d\'investisseurs.', visual: 'Graphique croissance', icon: 'ri-trophy-line' },
    ],
  },

  // ======================================================================
  // PROJECT 5 — YouTube Shorts — GAFI 2026 (60 sec)
  // ======================================================================
  {
    id: 'VID-005', title: 'GAFI 2026 : Les 5 Nouveautés en 60 Secondes #LCBFT', format: 'youtube-shorts', formatLabel: 'YouTube Shorts', formatIcon: 'ri-youtube-line', formatColor: 'accent',
    durationSec: 60, durationLabel: '≤ 60 sec', domain: 'AML/CFT', domainIcon: 'ri-police-car-line',
    synopsis: 'Les 5 changements clés des recommandations GAFI 2026 pour les banques africaines. Bénéficiaires effectifs à 10%, déclaration soupçon sous 24h, crypto-actifs... Tout ce qu\'il faut savoir en 60 secondes.',
    productionDate: '2026-06-23',
    storyboard: [
      { sceneNumber: 1, title: 'Hook', durationSec: 4, visualDescription: 'Fond noir + jaune. Texte "GAFI 2026". Son alarme discrète. Sous-titres.', narration: 'GAFI 2026 : 5 changements majeurs pour les banques africaines.', animation: 'Flash jaune', transitionTo: 'Cut', onScreenText: 'GAFI 2026', audioCue: 'Alerte courte' },
      { sceneNumber: 2, title: 'Changements 1-2', durationSec: 12, visualDescription: 'Numéros 1 et 2 en gros. Icône bénéficiaire + PPE.', narration: '1 : bénéficiaires effectifs — seuil abaissé à 10%. 2 : PPE élargies aux dirigeants d\'entreprises publiques.', animation: 'Slide-up numéros', transitionTo: 'Slide', onScreenText: '1. BE à 10%\n2. PPE élargies', audioCue: 'Ding ×2' },
      { sceneNumber: 3, title: 'Changements 3-4', durationSec: 12, visualDescription: 'Numéros 3 et 4. Horloge 24h + icône bitcoin.', narration: '3 : déclaration de soupçon sous 24h pour les cas graves. 4 : nouvelles obligations sur les crypto-actifs.', animation: 'Slide-up numéros', transitionTo: 'Slide', onScreenText: '3. DS sous 24h\n4. Crypto obligatoire', audioCue: 'Ding ×2' },
      { sceneNumber: 4, title: 'Changement 5 + Plan Action', durationSec: 20, visualDescription: 'Numéro 5. Puis 3 cases check-list.', narration: '5 : coopération renforcée entre cellules de renseignement financier. Votre plan d\'action : mettez à jour votre politique KYC, révisez votre classification PPE, formez vos équipes.', animation: 'Check-list animée', transitionTo: 'Slide', onScreenText: '5. Coopération CENTIF\n→ KYC → PPE → Formation', audioCue: 'Ding ×4' },
      { sceneNumber: 5, title: 'CTA', durationSec: 12, visualDescription: 'QR code + "Checklist GAFI 2026 Gratuite". Logo KHEPRA.', narration: 'Téléchargez notre checklist de mise en conformité GAFI 2026. Gratuite. Lien en description.', animation: 'QR code pulse', transitionTo: 'Fondu', onScreenText: 'Checklist Gratuite\nkhepraexperts.com/gafi-2026', audioCue: 'Jingle KHEPRA' },
    ],
    retentionOptimizations: [
      { technique: 'Hook immédiat', description: 'Flash + alerte dans la première seconde', expectedImpact: '+45% rétention 3s', icon: 'ri-flashlight-line' },
      { technique: 'Listicle rapide', description: 'Structure 5 points numérotés, rythme soutenu', expectedImpact: '+35% taux de complétion', icon: 'ri-list-ordered' },
      { technique: 'Contraste couleurs', description: 'Alternance fond noir/jaune pour maintenir l\'attention', expectedImpact: '+25% rétention visuelle', icon: 'ri-contrast-2-line' },
    ],
    seoOptimizations: [
      { element: 'Titre', optimizedValue: 'GAFI 2026 : Les 5 Nouveautés en 60 Secondes #LCBFT #Compliance #Banque', platform: 'YouTube Shorts', bestPractice: 'Mot-clé principal + hashtags', icon: 'ri-hashtag' },
      { element: 'Tags', optimizedValue: 'GAFI, LCB/FT, blanchiment, conformité, banques africaines, GIABA, GABAC, KYC, PPE', platform: 'YouTube', bestPractice: '10-15 tags', icon: 'ri-price-tag-3-line' },
    ],
    engagementHooks: [
      { hookType: 'Urgence réglementaire', timing: '0-3s', script: 'GAFI 2026 : 5 changements qui impactent votre banque.', visual: 'Alerte rouge', icon: 'ri-alert-line' },
      { hookType: 'Check-list utile', timing: '30-35s', script: 'KYC → PPE → Formation. Votre plan d\'action en 3 étapes.', visual: '3 checkboxes', icon: 'ri-checkbox-line' },
    ],
  },
];

// --- VIDEO FACTORY KPIs ---
export interface VideoFactoryKPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  history: { month: string; value: number }[];
}

export const VIDEO_FACTORY_KPIS: VideoFactoryKPI[] = [
  { id: 'projects', name: 'Projets Vidéo', current: 5, target: 100, unit: '', icon: 'ri-film-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 5 }],
  },
  { id: 'formats', name: 'Formats Vidéo', current: 4, target: 4, unit: '/4', icon: 'ri-stack-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 4 }],
  },
  { id: 'scenes', name: 'Scènes Storyboardées', current: 34, target: 500, unit: '', icon: 'ri-layout-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 34 }],
  },
  { id: 'retention', name: 'Score Rétention Moyen', current: 78, target: 90, unit: '%', icon: 'ri-user-follow-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 78 }],
  },
  { id: 'engagement', name: 'Score Engagement', current: 82, target: 92, unit: '%', icon: 'ri-chat-3-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 82 }],
  },
  { id: 'seo', name: 'Score SEO Vidéo', current: 85, target: 95, unit: '/100', icon: 'ri-search-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 85 }],
  },
];

export const VIDEO_FACTORY_STATS = {
  totalProjects: 5,
  totalScenes: 34,
  totalFormats: 4,
  totalRetentionOptimizations: 18,
  totalSEOOptimizations: 12,
  totalEngagementHooks: 16,
  averageDuration: '2.5 min',
  maturityScore: 68,
  targetMaturity: 95,
  standardLevel: 'Big Four — Production Vidéo Institutionnelle',
  engineVersion: 'v1.0 — Industrial Video Production Chain',
};