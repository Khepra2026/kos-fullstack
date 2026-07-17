export interface AutomateTool {
  name: string;
  type: 'scraper' | 'ai' | 'notification' | 'storage' | 'api' | 'analysis' | 'generator' | 'connector';
  status: 'operational' | 'degraded' | 'missing' | 'planned';
  description: string;
  criticality: 'vital' | 'important' | 'nice-to-have';
}

export interface AutomateSkill {
  name: string;
  level: number; // 0-100
  category: string;
  description: string;
  certified: boolean;
}

export interface AutomateGap {
  description: string;
  severity: 'critical' | 'major' | 'minor';
  impact: string;
  remediation: string;
  estimated_effort: string;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface AutomateNotificationCapability {
  channel: string;
  supported: boolean;
  latency: string;
  format: string;
  status: 'active' | 'configured' | 'not_configured';
}

export interface AutomateAudit {
  id: string;
  name: string;
  icon: string;
  role: string;
  short_desc: string;
  status: 'optimal' | 'operational' | 'degraded' | 'critical';
  readiness_score: number;
  reliability_score: number;
  uptime_30d: number;
  last_activity: string;
  tools: AutomateTool[];
  skills: AutomateSkill[];
  gaps: AutomateGap[];
  notification_capabilities: AutomateNotificationCapability[];
  metrics: {
    ao_detected_30d: number;
    ao_qualified_30d: number;
    alerts_sent_30d: number;
    avg_response_time_ms: number;
    false_positive_rate: number;
  };
  verdict: string;
}

export const automatesAudit: AutomateAudit[] = [
  {
    id: 'auto-01',
    name: 'KOS Source Discovery Bot™',
    icon: 'ri-radar-line',
    role: 'Découverte & Surveillance des Sources AO/AMI',
    short_desc: 'Agent autonome chargé de découvrir, monitorer et qualifier les sources d\'appels d\'offres et AMI. Scan 16 sources 24h/24 — institutions internationales, portails nationaux, réseaux sociaux professionnels.',
    status: 'optimal',
    readiness_score: 96,
    reliability_score: 94,
    uptime_30d: 99.8,
    last_activity: '2026-06-15T09:30:00Z',
    tools: [
      { name: 'Web Crawler Multi-Source', type: 'scraper', status: 'operational', description: 'Moteur de crawl distribué couvrant 16 sources simultanées avec rotation d\'IP et respect des robots.txt', criticality: 'vital' },
      { name: 'RSS/Atom Feed Aggregator', type: 'connector', status: 'operational', description: 'Agrégateur de flux RSS pour les portails institutionnels (Banque Mondiale, BAD, PNUD)', criticality: 'vital' },
      { name: 'LinkedIn API Connector', type: 'api', status: 'operational', description: 'Connecteur LinkedIn pour la veille AO/AMI sur les groupes professionnels', criticality: 'important' },
      { name: 'Telegram Channel Monitor', type: 'connector', status: 'operational', description: 'Surveillance des canaux Telegram spécialisés marchés publics Afrique', criticality: 'important' },
      { name: 'Email Alert Parser', type: 'connector', status: 'operational', description: 'Parser d\'alertes email provenant des inscriptions aux newsletters AO', criticality: 'nice-to-have' },
      { name: 'Source Reliability Scorer', type: 'ai', status: 'operational', description: 'Scoring automatique de fiabilité des sources basé sur l\'historique de qualité des données', criticality: 'vital' },
      { name: 'Duplicate Detection Engine', type: 'ai', status: 'operational', description: 'Détection de doublons cross-sources pour éviter les alertes redondantes', criticality: 'important' },
      { name: 'WhatsApp Business API', type: 'api', status: 'planned', description: 'Intégration WhatsApp pour la réception d\'AO partagés par le réseau', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Web Scraping Avancé', level: 95, category: 'Technique', description: 'Maîtrise du scraping de sites dynamiques, bypass anti-bot, extraction structurée', certified: true },
      { name: 'Classification de Sources', level: 92, category: 'IA/ML', description: 'Classification automatique des sources par type, zone géographique et fiabilité', certified: true },
      { name: 'Détection de Nouveaux Portails', level: 88, category: 'IA/ML', description: 'Identification proactive de nouveaux portails de marchés publics non surveillés', certified: true },
      { name: 'Gestion de Rotation IP', level: 90, category: 'Infrastructure', description: 'Rotation de proxies et gestion des limites de rate limiting', certified: true },
      { name: 'Parsing Multilingue', level: 85, category: 'Linguistique', description: 'Extraction et parsing en Français, Anglais, Portugais (zones UEMOA/CEMAC/CEDEAO)', certified: true },
      { name: 'Veille Réglementaire Marchés Publics', level: 78, category: 'Métier', description: 'Connaissance des cadres légaux de passation des marchés en zones UEMOA/CEMAC', certified: false },
    ],
    gaps: [
      { description: 'Couverture insuffisante des portails lusophones (Guinée-Bissau, Cap-Vert)', severity: 'minor', impact: 'Perte potentielle de 5-8 AO/an', remediation: 'Ajouter le parsing portugais aux crawlers existants', estimated_effort: '3 jours', status: 'open' },
      { description: 'Absence de surveillance des journaux officiels papier', severity: 'minor', impact: 'AO publiés uniquement au Journal Officiel non détectés', remediation: 'Partenariat avec services de numérisation de JO', estimated_effort: '2 semaines', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: '< 2 min', format: 'HTML + Texte brut', status: 'active' },
      { channel: 'WhatsApp', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Telegram', supported: true, latency: '< 1 min', format: 'Texte enrichi', status: 'active' },
      { channel: 'Teams', supported: true, latency: '< 1 min', format: 'Carte adaptative', status: 'active' },
      { channel: 'Slack', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 38,
      alerts_sent_30d: 42,
      avg_response_time_ms: 850,
      false_positive_rate: 3.2,
    },
    verdict: 'Pleinement opérationnel. Excellente couverture des sources prioritaires. Deux lacunes mineures identifiées (lusophone + JO papier) sans impact critique sur les objectifs.',
  },
  {
    id: 'auto-02',
    name: 'KOS Scraper Engine™',
    icon: 'ri-download-cloud-2-line',
    role: 'Extraction & Téléchargement des Documents AO/AMI',
    short_desc: 'Agent d\'extraction automatique des documents d\'appels d\'offres (TOR, DAO, cahiers des charges, annexes). Téléchargement, classification et stockage structuré dans KOS_TENDERS.',
    status: 'operational',
    readiness_score: 90,
    reliability_score: 88,
    uptime_30d: 97.5,
    last_activity: '2026-06-15T10:30:00Z',
    tools: [
      { name: 'Document Downloader', type: 'scraper', status: 'operational', description: 'Téléchargeur automatique de PDF, DOCX, XLSX depuis les portails AO', criticality: 'vital' },
      { name: 'PDF Text Extractor', type: 'scraper', status: 'operational', description: 'Extraction de texte depuis PDF avec OCR pour les documents scannés', criticality: 'vital' },
      { name: 'Document Classifier', type: 'ai', status: 'operational', description: 'Classification automatique : TOR, Cahier des Charges, Bordereau de Prix, Annexes', criticality: 'vital' },
      { name: 'Metadata Extractor', type: 'ai', status: 'operational', description: 'Extraction des métadonnées clés : budget, délai, pays, organisme, langue', criticality: 'vital' },
      { name: 'KOS_TENDERS File System', type: 'storage', status: 'operational', description: 'Arborescence structurée par pays/organisme : Sénégal/BCEAO/, Côte d\'Ivoire/BAD/, etc.', criticality: 'vital' },
      { name: 'OCR Engine (Tesseract)', type: 'ai', status: 'operational', description: 'Reconnaissance optique pour documents scannés et images', criticality: 'important' },
      { name: 'Anti-Corruption Checker', type: 'analysis', status: 'planned', description: 'Vérification automatique des incohérences dans les documents (budgets, dates)', criticality: 'nice-to-have' },
      { name: 'Translation Layer', type: 'ai', status: 'planned', description: 'Traduction automatique des documents anglais/portugais vers le français', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Extraction PDF/OCR', level: 90, category: 'Technique', description: 'Extraction fiable depuis PDF natifs et scannés avec préservation de la structure', certified: true },
      { name: 'Classification Documentaire', level: 88, category: 'IA/ML', description: 'Classification par type de document avec 94% de précision', certified: true },
      { name: 'Gestion de Volume', level: 85, category: 'Infrastructure', description: 'Capacité à traiter 200+ documents/jour sans dégradation', certified: true },
      { name: 'Extraction d\'Entités Nommées', level: 82, category: 'IA/ML', description: 'Extraction des entités : montants, dates, organisations, personnes', certified: true },
      { name: 'Stockage Structuré', level: 92, category: 'Infrastructure', description: 'Organisation automatique en arborescence normalisée KOS_TENDERS', certified: true },
    ],
    gaps: [
      { description: 'OCR dégradé sur documents manuscrits ou de mauvaise qualité', severity: 'major', impact: 'Perte d\'information sur 8-12% des documents scannés', remediation: 'Upgrade vers un modèle OCR spécialisé documents administratifs africains', estimated_effort: '2 semaines', status: 'open' },
      { description: 'Pas de détection automatique des documents corrompus', severity: 'minor', impact: '1-2% de documents téléchargés sont illisibles', remediation: 'Ajouter un validateur d\'intégrité post-téléchargement', estimated_effort: '2 jours', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: '< 5 min', format: 'Rapport de téléchargement', status: 'active' },
      { channel: 'WhatsApp', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Telegram', supported: true, latency: '< 3 min', format: 'Logs de scraping', status: 'active' },
      { channel: 'Teams', supported: true, latency: '< 1 min', format: 'Notification canal', status: 'active' },
      { channel: 'Slack', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 44,
      alerts_sent_30d: 30,
      avg_response_time_ms: 3200,
      false_positive_rate: 5.8,
    },
    verdict: 'Opérationnel avec une marge d\'amélioration sur l\'OCR. Le cœur du moteur est robuste. Priorité : améliorer la qualité OCR pour les documents scannés de faible qualité.',
  },
  {
    id: 'auto-03',
    name: 'KOS AI Qualification Engine™',
    icon: 'ri-brain-line',
    role: 'Qualification Intelligente & Scoring des AO/AMI',
    short_desc: 'Agent IA de scoring et qualification automatique des appels d\'offres. Analyse multicritères : adéquation métier, zone géographique, budget, probabilité de gain, historique client. Score de pertinence sur 100.',
    status: 'optimal',
    readiness_score: 98,
    reliability_score: 96,
    uptime_30d: 99.9,
    last_activity: '2026-06-15T11:00:00Z',
    tools: [
      { name: 'Multi-Criteria Scoring Engine', type: 'ai', status: 'operational', description: 'Moteur de scoring 5 axes pondérés : métier (40%), géographie (20%), budget (15%), probabilité gain (15%), historique (10%)', criticality: 'vital' },
      { name: 'Match Category Classifier', type: 'ai', status: 'operational', description: 'Classification en 11 catégories métier : Audit, Conformité, Prix de Transfert, ESG, etc.', criticality: 'vital' },
      { name: 'Competitive Analysis Engine', type: 'ai', status: 'operational', description: 'Analyse concurrentielle automatique par benchmark des cabinets Big Four et régionaux', criticality: 'important' },
      { name: 'Required Documents Checker', type: 'analysis', status: 'operational', description: 'Extraction et vérification de la liste des documents requis pour soumission', criticality: 'vital' },
      { name: 'Historical Win Rate Predictor', type: 'ai', status: 'operational', description: 'Prédiction de probabilité de gain basée sur l\'historique Khepra par type d\'AO', criticality: 'important' },
      { name: 'Deadline Urgency Calculator', type: 'analysis', status: 'operational', description: 'Calcul automatique de l\'urgence basé sur J-x et complexité du dossier', criticality: 'vital' },
      { name: 'Consortium Opportunity Detector', type: 'ai', status: 'planned', description: 'Détection des AO nécessitant un consortium et recommandation de partenaires', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Scoring Multicritères', level: 96, category: 'IA/ML', description: 'Scoring de pertinence avec 92% de corrélation avec les décisions humaines', certified: true },
      { name: 'Analyse Concurrentielle', level: 90, category: 'Métier', description: 'Connaissance du paysage concurrentiel Big Four et cabinets régionaux', certified: true },
      { name: 'Classification Sectorielle', level: 94, category: 'IA/ML', description: 'Classification en 11 catégories avec 97% de précision', certified: true },
      { name: 'Prédiction de Gain', level: 82, category: 'IA/ML', description: 'Modèle prédictif basé sur 300+ AO historiques', certified: true },
      { name: 'Connaissance Métier Big Four', level: 88, category: 'Métier', description: 'Compréhension approfondie des services Khepra et de leur adéquation aux AO', certified: true },
      { name: 'Évaluation Budgétaire', level: 85, category: 'Finance', description: 'Analyse de la taille du marché et de l\'attractivité financière', certified: true },
    ],
    gaps: [
      { description: 'Pas de détection des conflits d\'intérêts ou mandats incompatibles', severity: 'minor', impact: 'Risque de qualifier un AO où Khepra a un conflit d\'intérêt', remediation: 'Intégrer une base de données des mandats actifs et vérification croisée', estimated_effort: '1 semaine', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: '< 1 min', format: 'Fiche de qualification détaillée', status: 'active' },
      { channel: 'WhatsApp', supported: true, latency: '< 30 sec', format: 'Alerte critique uniquement', status: 'active' },
      { channel: 'Telegram', supported: true, latency: '< 30 sec', format: 'Notification enrichie', status: 'active' },
      { channel: 'Teams', supported: true, latency: '< 1 min', format: 'Carte adaptative', status: 'active' },
      { channel: 'Slack', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 47,
      alerts_sent_30d: 47,
      avg_response_time_ms: 420,
      false_positive_rate: 1.2,
    },
    verdict: 'Excellent — le moteur le plus performant de la chaîne. Scoring précis, classification fiable, analyse concurrentielle pertinente. Une lacune mineure sur les conflits d\'intérêts à combler.',
  },
  {
    id: 'auto-04',
    name: 'KOS Bid Alert Engine™',
    icon: 'ri-notification-3-line',
    role: 'Notification Multicanal des AO/AMI Prioritaires',
    short_desc: 'Agent de notification automatique des appels d\'offres qualifiés. Distribution multicanal : Email, WhatsApp, Telegram, Teams. Priorisation par criticité et personnalisation par destinataire.',
    status: 'operational',
    readiness_score: 88,
    reliability_score: 90,
    uptime_30d: 98.2,
    last_activity: '2026-06-15T08:45:00Z',
    tools: [
      { name: 'Multi-Channel Dispatcher', type: 'notification', status: 'operational', description: 'Dispatch multicanal avec fallback automatique : Email → WhatsApp → Telegram', criticality: 'vital' },
      { name: 'Priority-Based Router', type: 'ai', status: 'operational', description: 'Routage intelligent : CRITICAL = tous canaux, HIGH = Email+WhatsApp, NORMAL = Email', criticality: 'vital' },
      { name: 'Email Template Engine', type: 'generator', status: 'operational', description: 'Générateur d\'emails HTML professionnels formatés Khepra Experts', criticality: 'vital' },
      { name: 'WhatsApp Business API', type: 'api', status: 'operational', description: 'Envoi de messages WhatsApp pour les alertes critiques', criticality: 'important' },
      { name: 'Telegram Bot API', type: 'api', status: 'operational', description: 'Bot Telegram KOS Tender pour notifications instantanées', criticality: 'important' },
      { name: 'Microsoft Teams Webhook', type: 'connector', status: 'operational', description: 'Webhook Teams pour publication dans le canal AO', criticality: 'important' },
      { name: 'Delivery Tracker', type: 'analysis', status: 'operational', description: 'Suivi de délivrabilité : delivered, opened, clicked, bounced', criticality: 'important' },
      { name: 'SMS Gateway (Twilio)', type: 'api', status: 'planned', description: 'Alerte SMS pour les AO avec deadline < 7 jours', criticality: 'nice-to-have' },
      { name: 'Voice Call Alert', type: 'api', status: 'planned', description: 'Appel vocal automatique pour les AO CRITICAL avec deadline < 48h', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Routage Multicanal', level: 92, category: 'Technique', description: 'Distribution fiable avec fallback et déduplication cross-canal', certified: true },
      { name: 'Template HTML Email', level: 90, category: 'Design', description: 'Emails professionnels au format Khepra Experts', certified: true },
      { name: 'Gestion de Files d\'Attente', level: 85, category: 'Infrastructure', description: 'Gestion de pics de notifications sans perte de messages', certified: true },
      { name: 'Suivi de Délivrabilité', level: 78, category: 'Analyse', description: 'Tracking des statuts de livraison par canal', certified: false },
      { name: 'Personnalisation Dynamique', level: 82, category: 'IA/ML', description: 'Adaptation du contenu selon le destinataire et le type d\'AO', certified: true },
    ],
    gaps: [
      { description: 'Pas de canal SMS pour les urgences absolues', severity: 'major', impact: 'Un AO critique avec deadline < 48h pourrait ne pas être vu à temps', remediation: 'Intégrer Twilio SMS Gateway avec règles de déclenchement strictes', estimated_effort: '1 semaine', status: 'open' },
      { description: 'Délivrabilité email non monitorée en continu', severity: 'minor', impact: 'Risque de blacklist email non détecté rapidement', remediation: 'Mettre en place un monitoring de réputation email 24/7', estimated_effort: '3 jours', status: 'in_progress' },
      { description: 'Pas de confirmation de lecture obligatoire', severity: 'minor', impact: 'Pas de garantie que les destinataires ont bien lu les alertes critiques', remediation: 'Ajouter un mécanisme de read receipt avec escalation si non-lu sous 2h', estimated_effort: '5 jours', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: '< 2 min', format: 'HTML formaté Khepra', status: 'active' },
      { channel: 'WhatsApp', supported: true, latency: '< 30 sec', format: 'Message texte + lien', status: 'active' },
      { channel: 'Telegram', supported: true, latency: '< 30 sec', format: 'Message enrichi', status: 'active' },
      { channel: 'Teams', supported: true, latency: '< 1 min', format: 'Carte adaptative', status: 'active' },
      { channel: 'SMS', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 38,
      alerts_sent_30d: 38,
      avg_response_time_ms: 1800,
      false_positive_rate: 0.5,
    },
    verdict: 'Bon système de notification mais il manque le canal SMS pour les cas d\'urgence absolue. La délivrabilité email doit être monitorée en continu. Le routage par priorité fonctionne bien.',
  },
  {
    id: 'auto-05',
    name: 'KOS Deadline Monitor™',
    icon: 'ri-timer-line',
    role: 'Surveillance des Délais & Relances Automatiques',
    short_desc: 'Agent de surveillance continue des échéances de soumission. Calcul des jours restants, alertes de seuil (J-30, J-15, J-7, J-3, J-1), relances automatiques et suivi de progression des dossiers.',
    status: 'operational',
    readiness_score: 85,
    reliability_score: 87,
    uptime_30d: 96.8,
    last_activity: '2026-06-15T07:00:00Z',
    tools: [
      { name: 'Countdown Engine', type: 'analysis', status: 'operational', description: 'Calcul en temps réel des jours restants avec fuseau horaire local', criticality: 'vital' },
      { name: 'Threshold Alert System', type: 'notification', status: 'operational', description: 'Alertes automatiques aux seuils J-30, J-15, J-7, J-3, J-1', criticality: 'vital' },
      { name: 'Auto-Relance Scheduler', type: 'notification', status: 'operational', description: 'Relances automatiques programmées à fréquence croissante', criticality: 'important' },
      { name: 'Submission Status Tracker', type: 'analysis', status: 'operational', description: 'Suivi de l\'état du dossier : non démarré, en préparation, prêt, soumis', criticality: 'vital' },
      { name: 'Completion Progress Meter', type: 'analysis', status: 'operational', description: 'Jauge de complétion du dossier basée sur les composants générés', criticality: 'important' },
      { name: 'Calendar Integration (Google)', type: 'connector', status: 'planned', description: 'Synchronisation avec Google Calendar pour échéances', criticality: 'nice-to-have' },
      { name: 'Calendar Integration (Outlook)', type: 'connector', status: 'planned', description: 'Synchronisation avec Outlook/Exchange pour échéances', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Gestion des Délais', level: 90, category: 'Métier', description: 'Calcul précis des J-x avec prise en compte des jours ouvrés et fériés', certified: true },
      { name: 'Escalade Automatique', level: 82, category: 'Processus', description: 'Mécanisme d\'escalade si le dossier n\'avance pas aux seuils critiques', certified: true },
      { name: 'Suivi de Progression', level: 85, category: 'Analyse', description: 'Mesure automatique de la complétion du dossier de soumission', certified: true },
      { name: 'Planification de Charge', level: 72, category: 'Métier', description: 'Anticipation des conflits de deadlines et recommandation de priorisation', certified: false },
    ],
    gaps: [
      { description: 'Pas d\'intégration calendrier (Google/Outlook)', severity: 'major', impact: 'Les échéances ne remontent pas dans les agendas des experts', remediation: 'Développer les connecteurs Google Calendar API et Microsoft Graph API', estimated_effort: '2 semaines', status: 'open' },
      { description: 'Planification de charge insuffisante', severity: 'major', impact: 'Risque de goulot d\'étranglement quand plusieurs deadlines coïncident', remediation: 'Ajouter un module de capacity planning avec alertes de surcharge', estimated_effort: '3 semaines', status: 'open' },
      { description: 'Jours fériés non pris en compte pour toutes les zones', severity: 'minor', impact: 'Calcul J-x légèrement imprécis pour certaines zones CEMAC', remediation: 'Compléter la base de jours fériés UEMOA/CEMAC/CEDEAO', estimated_effort: '1 jour', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: 'Seuils programmés', format: 'Rapport hebdomadaire + alertes seuil', status: 'active' },
      { channel: 'WhatsApp', supported: true, latency: 'Alerte J-3 et J-1', format: 'Message urgent', status: 'active' },
      { channel: 'Telegram', supported: true, latency: 'Seuils programmés', format: 'Notification + lien', status: 'active' },
      { channel: 'Teams', supported: true, latency: 'Seuils programmés', format: 'Carte adaptative', status: 'active' },
      { channel: 'SMS', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 38,
      alerts_sent_30d: 85,
      avg_response_time_ms: 600,
      false_positive_rate: 0.0,
    },
    verdict: 'Fonctionnel mais nécessite les intégrations calendrier pour être vraiment efficace. La planification de charge est le principal point faible : sans elle, risque de deadlines manquées par surcharge.',
  },
  {
    id: 'auto-06',
    name: 'KOS Bid Knowledge Engine™',
    icon: 'ri-database-2-line',
    role: 'Base de Connaissances AO & Capitalisation',
    short_desc: 'Agent de capitalisation des connaissances AO/AMI. Base vectorielle RAG des offres gagnées, perdues, réponses techniques, CV et références. Moteur de similarité pour réutilisation intelligente.',
    status: 'optimal',
    readiness_score: 92,
    reliability_score: 93,
    uptime_30d: 99.5,
    last_activity: '2026-06-15T06:00:00Z',
    tools: [
      { name: 'RAG Vector Database', type: 'storage', status: 'operational', description: 'Base vectorielle des documents AO avec embeddings pour recherche sémantique', criticality: 'vital' },
      { name: 'Similarity Search Engine', type: 'ai', status: 'operational', description: 'Moteur de recherche de similarité pour trouver les AO passés pertinents', criticality: 'vital' },
      { name: 'Template Library', type: 'storage', status: 'operational', description: 'Bibliothèque de templates réutilisables : méthodologies, offres techniques, CV', criticality: 'vital' },
      { name: 'Win/Loss Analysis Engine', type: 'ai', status: 'operational', description: 'Analyse des causes de gain/perte pour amélioration continue', criticality: 'important' },
      { name: 'Document Auto-Tagger', type: 'ai', status: 'operational', description: 'Tagging automatique des documents par mots-clés, secteur, zone géographique', criticality: 'important' },
      { name: 'Reference Portfolio Builder', type: 'generator', status: 'operational', description: 'Génération automatique de portefeuilles de références par pays/secteur', criticality: 'important' },
      { name: 'Lessons Learned Extractor', type: 'ai', status: 'operational', description: 'Extraction automatique des leçons apprises depuis les retours d\'expérience', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Recherche Sémantique', level: 94, category: 'IA/ML', description: 'Recherche vectorielle avec 95% de pertinence sur les AO similaires', certified: true },
      { name: 'Capitalisation de Connaissances', level: 90, category: 'Métier', description: 'Structuration et indexation systématique de tout le capital AO', certified: true },
      { name: 'Génération de Références', level: 88, category: 'Génération', description: 'Création automatique de dossiers de références personnalisés', certified: true },
      { name: 'Analyse de Performance', level: 85, category: 'Analyse', description: 'Analyse win/loss avec identification des patterns de succès', certified: true },
      { name: 'Détection d\'Obsolescence', level: 72, category: 'Maintenance', description: 'Identification des documents obsolètes nécessitant mise à jour', certified: false },
    ],
    gaps: [
      { description: 'Pas de détection automatique d\'obsolescence des templates', severity: 'minor', impact: 'Risque d\'utiliser des templates avec des informations datées', remediation: 'Mettre en place un système de revue périodique avec alertes', estimated_effort: '1 semaine', status: 'open' },
      { description: 'Base de connaissances non multilingue (français uniquement)', severity: 'minor', impact: 'AO en anglais non capitalisés dans la base', remediation: 'Ajouter le support multilingue avec traduction automatique', estimated_effort: '3 semaines', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'WhatsApp', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Telegram', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Teams', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Interface Web', supported: true, latency: 'Instantané', format: 'Dashboard RAG', status: 'active' },
    ],
    metrics: { ao_detected_30d: 0, ao_qualified_30d: 0, alerts_sent_30d: 0, avg_response_time_ms: 150, false_positive_rate: 0.0 },
    verdict: 'Excellente base de capitalisation. La recherche sémantique et la bibliothèque de templates sont des atouts majeurs. Pas de notifications sortantes (normal pour ce type d\'automate).',
  },
  {
    id: 'auto-07',
    name: 'KOS Auto Response Preparation™',
    icon: 'ri-file-text-line',
    role: 'Préparation Automatique des Dossiers de Réponse',
    short_desc: 'Agent de génération automatique des composants de réponse aux AO : note de compréhension, méthodologie, planning, CV, matrice des risques. Accélère la préparation des offres de 60%.',
    status: 'operational',
    readiness_score: 82,
    reliability_score: 80,
    uptime_30d: 94.2,
    last_activity: '2026-06-15T09:00:00Z',
    tools: [
      { name: 'Response Component Generator', type: 'generator', status: 'operational', description: 'Générateur des 8 composants standard d\'une réponse AO sur 11 catégories métier', criticality: 'vital' },
      { name: 'Methodology Builder', type: 'generator', status: 'operational', description: 'Constructeur de méthodologie basé sur les templates Khepra et le contexte de l\'AO', criticality: 'vital' },
      { name: 'CV Formatter', type: 'generator', status: 'operational', description: 'Mise en forme automatique des CV experts au format requis par l\'AO', criticality: 'important' },
      { name: 'Risk Matrix Generator', type: 'generator', status: 'operational', description: 'Génération de la matrice des risques projet adaptée au contexte', criticality: 'important' },
      { name: 'Planning Generator', type: 'generator', status: 'operational', description: 'Génération de planning Gantt basé sur la durée et les phases du projet', criticality: 'important' },
      { name: 'Commercial Proposal Builder', type: 'generator', status: 'operational', description: 'Constructeur de proposition commerciale avec grille tarifaire Khepra', criticality: 'important' },
      { name: 'Executive Summary Writer', type: 'ai', status: 'planned', description: 'Rédaction automatique du résumé exécutif personnalisé', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Génération de Contenu Structuré', level: 85, category: 'IA/ML', description: 'Génération de documents professionnels formatés', certified: true },
      { name: 'Connaissance des Standards AO', level: 80, category: 'Métier', description: 'Respect des formats requis par les bailleurs (BM, BAD, UE, AFD)', certified: true },
      { name: 'Personnalisation Contextuelle', level: 75, category: 'IA/ML', description: 'Adaptation du contenu au contexte spécifique de chaque AO', certified: false },
      { name: 'Mise en Forme Professionnelle', level: 88, category: 'Design', description: 'Mise en page et formatage conformes aux standards Khepra Experts', certified: true },
      { name: 'Gestion des Exigences Documentaires', level: 82, category: 'Métier', description: 'Identification et satisfaction de toutes les exigences documentaires de l\'AO', certified: true },
    ],
    gaps: [
      { description: 'Personnalisation contextuelle encore limitée', severity: 'major', impact: 'Les offres générées nécessitent 30-40% de retouche humaine', remediation: 'Améliorer le fine-tuning sur le corpus d\'offres gagnées Khepra', estimated_effort: '4 semaines', status: 'open' },
      { description: 'Pas de résumé exécutif automatique', severity: 'major', impact: 'Le composant le plus lu par les évaluateurs doit être rédigé manuellement', remediation: 'Développer l\'Executive Summary Writer avec le ton Khepra', estimated_effort: '3 semaines', status: 'open' },
      { description: 'Couverture limitée à 8/11 catégories métier', severity: 'minor', impact: '3 catégories non couvertes pour la génération automatique', remediation: 'Étendre les templates aux catégories restantes', estimated_effort: '2 semaines', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: '< 5 min', format: 'Notification de génération terminée', status: 'active' },
      { channel: 'WhatsApp', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Telegram', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Teams', supported: true, latency: '< 2 min', format: 'Lien vers le dossier généré', status: 'active' },
      { channel: 'Slack', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 47,
      ao_qualified_30d: 38,
      alerts_sent_30d: 12,
      avg_response_time_ms: 45000,
      false_positive_rate: 0.0,
    },
    verdict: 'Bon générateur mais nécessite encore trop d\'intervention humaine. La personnalisation contextuelle et le résumé exécutif sont les deux points critiques à améliorer pour atteindre l\'autonomie complète.',
  },
  {
    id: 'auto-08',
    name: 'KOS Donor Intelligence Engine™',
    icon: 'ri-building-4-line',
    role: 'Intelligence Bailleurs & Stratégie de Positionnement',
    short_desc: 'Agent d\'intelligence sur les bailleurs internationaux. Suivi de 28 bailleurs, analyse des cycles de financement, scoring de match Khepra, recommandations stratégiques de positionnement.',
    status: 'operational',
    readiness_score: 86,
    reliability_score: 84,
    uptime_30d: 97.1,
    last_activity: '2026-06-15T08:00:00Z',
    tools: [
      { name: 'Donor Portfolio Tracker', type: 'analysis', status: 'operational', description: 'Suivi des portefeuilles de 28 bailleurs avec budgets, cycles et priorités', criticality: 'vital' },
      { name: 'Khepra Match Scorer', type: 'ai', status: 'operational', description: 'Scoring de compatibilité Khepra-Bailleur sur 10 dimensions', criticality: 'vital' },
      { name: 'Funding Cycle Calendar', type: 'analysis', status: 'operational', description: 'Calendrier des cycles de financement avec alertes de fenêtres à venir', criticality: 'vital' },
      { name: 'Win Rate Analyzer', type: 'analysis', status: 'operational', description: 'Analyse des taux de succès par bailleur avec identification des patterns', criticality: 'important' },
      { name: 'Relationship Strength Meter', type: 'analysis', status: 'operational', description: 'Mesure de la force de la relation Khepra-Bailleur', criticality: 'important' },
      { name: 'Strategic Recommendation Engine', type: 'ai', status: 'operational', description: 'Recommandations stratégiques : cibler, consolider, partenariat, veille', criticality: 'important' },
      { name: 'Accreditation Tracker', type: 'analysis', status: 'operational', description: 'Suivi des statuts d\'accréditation et des démarches en cours', criticality: 'important' },
      { name: 'Competitor Positioning Map', type: 'ai', status: 'planned', description: 'Cartographie du positionnement concurrentiel par bailleur', criticality: 'nice-to-have' },
    ],
    skills: [
      { name: 'Intelligence Bailleurs', level: 88, category: 'Métier', description: 'Connaissance approfondie des mécanismes de financement des 28 bailleurs', certified: true },
      { name: 'Analyse Stratégique', level: 85, category: 'Métier', description: 'Capacité à identifier les opportunités stratégiques par bailleur', certified: true },
      { name: 'Scoring de Compatibilité', level: 82, category: 'IA/ML', description: 'Évaluation multidimensionnelle de l\'adéquation Khepra-Bailleur', certified: true },
      { name: 'Veille des Cycles de Financement', level: 90, category: 'Veille', description: 'Suivi proactif des cycles IDA, ADF, FED, NDICI et autres', certified: true },
      { name: 'Gestion des Accréditations', level: 78, category: 'Administratif', description: 'Suivi des processus d\'accréditation complexes (PADOR, UNGM, SAM.gov)', certified: false },
    ],
    gaps: [
      { description: '14 bailleurs non accrédités sur 28', severity: 'major', impact: 'Impossibilité de soumissionner directement pour 50% des bailleurs suivis', remediation: 'Plan d\'accréditation priorisé : UE (PADOR), UNGM, GIZ, USAID (SAM.gov)', estimated_effort: '6 mois (processus administratifs)', status: 'open' },
      { description: 'Pas de cartographie concurrentielle par bailleur', severity: 'minor', impact: 'Visibilité limitée sur qui gagne quoi par bailleur', remediation: 'Développer le Competitor Positioning Map', estimated_effort: '3 semaines', status: 'open' },
    ],
    notification_capabilities: [
      { channel: 'Email', supported: true, latency: 'Hebdomadaire', format: 'Rapport d\'intelligence bailleurs', status: 'active' },
      { channel: 'WhatsApp', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Telegram', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
      { channel: 'Teams', supported: true, latency: 'Hebdomadaire', format: 'Rapport + recommandations', status: 'active' },
      { channel: 'Slack', supported: false, latency: 'N/A', format: 'N/A', status: 'not_configured' },
    ],
    metrics: {
      ao_detected_30d: 0,
      ao_qualified_30d: 0,
      alerts_sent_30d: 4,
      avg_response_time_ms: 250,
      false_positive_rate: 0.0,
    },
    verdict: 'Bonne intelligence bailleurs. Le principal frein est externe : les processus d\'accréditation qui dépendent des bailleurs eux-mêmes. L\'automate fait bien son travail de veille et recommandation.',
  },
];

export const auditSummary = {
  total_automates: 8,
  optimal: 3,
  operational: 5,
  degraded: 0,
  critical: 0,
  global_readiness_score: 90,
  global_reliability_score: 89,
  total_tools: 61,
  tools_operational: 48,
  tools_planned: 10,
  tools_missing: 3,
  total_skills: 43,
  skills_certified: 33,
  skills_uncertified: 10,
  total_gaps: 16,
  gaps_critical: 0,
  gaps_major: 7,
  gaps_minor: 9,
  notification_channels_active: 32,
  notification_channels_missing: 18,
  total_ao_detected_30d: 47,
  total_ao_qualified_30d: 38,
  total_alerts_sent_30d: 218,
  estimated_annual_ao_capacity: 450,
  coverage_zones: ['UEMOA', 'CEMAC', 'CEDEAO'],
  coverage_gaps: ['Lusophone (Guinée-Bissau, Cap-Vert)', 'Afrique Anglophone', 'Afrique du Nord'],
  verdict_global: 'Le KOS Tender Intelligence Engine est pleinement opérationnel et correctement outillé pour sa mission de veille, qualification et notification des AO/AMI. Les 8 automates disposent de 48 outils opérationnels sur 61, couvrent 16 sources 24h/24, et ont détecté 47 AO en 30 jours. Les lacunes identifiées (7 majeures, 9 mineures) n\'empêchent pas l\'exécution de la mission mais représentent des axes d\'amélioration pour atteindre l\'excellence opérationnelle.',
};

export const notificationCoverageMatrix = [
  { channel: 'Email', active_automates: 6, total_automates: 8, coverage_pct: 75, status: 'bon' },
  { channel: 'WhatsApp', active_automates: 3, total_automates: 8, coverage_pct: 37.5, status: 'faible' },
  { channel: 'Telegram', active_automates: 4, total_automates: 8, coverage_pct: 50, status: 'moyen' },
  { channel: 'Teams', active_automates: 6, total_automates: 8, coverage_pct: 75, status: 'bon' },
  { channel: 'SMS', active_automates: 0, total_automates: 8, coverage_pct: 0, status: 'absent' },
  { channel: 'Slack', active_automates: 0, total_automates: 8, coverage_pct: 0, status: 'absent' },
  { channel: 'Interface Web', active_automates: 8, total_automates: 8, coverage_pct: 100, status: 'excellent' },
];