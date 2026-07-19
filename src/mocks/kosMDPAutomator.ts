export interface MDPChecklistStep {
  id: string;
  num: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  duration: string;
  automated: boolean;
  deliverables: string[];
  actionUrl?: string;
}

export interface MDPFormField {
  field: string;
  value: string;
  copyable: boolean;
}

export interface MDPVideoScriptStep {
  timestamp: string;
  duration: string;
  title: string;
  script: string;
  action: string;
  icon: string;
}

export interface MDPQuickStatus {
  label: string;
  status: string;
  detail: string;
  icon: string;
  color: string;
  statusColor: string;
}

export interface MDPAgentTier {
  id: string;
  name: string;
  mission: string;
  icon: string;
  color: string;
  status: 'active' | 'standby' | 'blocked';
  score: number;
  responsibilities: string[];
  kpis: { label: string; current: string; target: string; icon: string }[];
}

export const MDP_CHECKLIST: MDPChecklistStep[] = [
  {
    id: 'app-exists',
    num: 1,
    title: "Vérifier que l'app LinkedIn Developer existe et est active",
    description: "Confirmer que l'application KHEPRA EXPERTS API est créée sur le LinkedIn Developer Portal avec les scopes OAuth2 de base (openid, profile, email).",
    icon: 'ri-verified-badge-line',
    color: '#86BC25',
    status: 'completed',
    duration: '~2 min',
    automated: true,
    deliverables: ['App ID confirmé', 'Scopes OAuth2 actifs', 'Logo 174x174px uploadé'],
    actionUrl: 'https://developer.linkedin.com/',
  },
  {
    id: 'privacy-policy',
    num: 2,
    title: 'Vérifier que la Privacy Policy et les CGU sont en ligne',
    description: "Les URLs de la Privacy Policy et des Conditions Générales d'Utilisation doivent être accessibles publiquement et contenir les mentions légales requises par LinkedIn.",
    icon: 'ri-file-text-line',
    color: '#86BC25',
    status: 'completed',
    duration: '~3 min',
    automated: true,
    deliverables: ['Privacy Policy en ligne', 'CGU en ligne', 'Mentions légales conformes'],
    actionUrl: 'https://khepraexperts.com/privacy',
  },
  {
    id: 'logo-upload',
    num: 3,
    title: "Vérifier que le logo de l'app est téléchargé sur le Developer Portal",
    description: "Le logo doit faire au minimum 174x174px et représenter clairement la marque KHEPRA EXPERTS. Format PNG ou JPG accepté.",
    icon: 'ri-image-line',
    color: '#86BC25',
    status: 'completed',
    duration: '~5 min',
    automated: false,
    deliverables: ['Logo 174x174px minimum', 'Format PNG', 'Représente la marque'],
  },
  {
    id: 'video-record',
    num: 4,
    title: 'Enregistrer la vidéo de démonstration (2-3 minutes)',
    description: "Suivre le script fourni (Section Script Vidéo). Montrer le dashboard /agents-experts, le bandeau Social Metrics, le rafraîchissement, le panel debug. Utiliser Loom, OBS ou QuickTime.",
    icon: 'ri-vidicon-line',
    color: '#E8C547',
    status: 'in_progress',
    duration: '~15 min',
    automated: false,
    deliverables: ['Vidéo de démonstration', "Durée 2-3 minutes", "Fichier .mp4 ou lien Loom"],
    actionUrl: '/agents-experts',
  },
  {
    id: 'video-host',
    num: 5,
    title: 'Héberger la vidéo sur YouTube (non listée) ou Loom',
    description: "Uploader la vidéo sur YouTube en mode 'Non répertoriée' ou utiliser Loom pour générer un lien de partage. Le lien doit être accessible sans authentification.",
    icon: 'ri-youtube-line',
    color: '#E8C547',
    status: 'pending',
    duration: '~5 min',
    automated: false,
    deliverables: ['Lien YouTube non listé', 'ou lien Loom', 'Accessible sans auth'],
  },
  {
    id: 'fill-form',
    num: 6,
    title: 'Remplir le formulaire MDP sur le Developer Portal',
    description: "Utiliser les réponses pré-remplies de la section 'Formulaire de Candidature'. Copier-coller chaque champ dans le formulaire du Developer Portal LinkedIn.",
    icon: 'ri-survey-line',
    color: '#E8C547',
    status: 'pending',
    duration: '~10 min',
    automated: false,
    deliverables: ['Formulaire complété', 'Vidéo link inséré', 'Tous les champs vérifiés'],
    actionUrl: 'https://developer.linkedin.com/',
  },
  {
    id: 'submit',
    num: 7,
    title: 'Soumettre la candidature MDP',
    description: "Cliquer sur 'Submit' dans le Developer Portal. Vérifier que tous les champs obligatoires sont remplis et que la vidéo est bien attachée.",
    icon: 'ri-send-plane-line',
    color: '#0891B2',
    status: 'pending',
    duration: '~2 min',
    automated: false,
    deliverables: ['Candidature soumise', 'Email de confirmation reçu', 'Numéro de ticket LinkedIn'],
  },
  {
    id: 'follow-up',
    num: 8,
    title: "Suivre les emails LinkedIn pour d'éventuelles questions",
    description: "Surveiller la boîte email (contact@khepraexperts.com) pour les questions complémentaires de LinkedIn. Répondre dans un délai de 48h. Les réponses types sont dans la FAQ du dossier.",
    icon: 'ri-mail-check-line',
    color: '#9B7B2C',
    status: 'pending',
    duration: '2-4 semaines',
    automated: false,
    deliverables: ['Boîte email surveillée', 'Réponses FAQ prêtes', 'Délai 48h respecté'],
  },
  {
    id: 'update-scopes',
    num: 9,
    title: "Une fois approuvé : mettre à jour les scopes dans l'app LinkedIn",
    description: "Dans l'app LinkedIn Developer Portal, onglet 'Auth' → 'OAuth 2.0 Scopes' → cocher r_organization_social et r_organization_admin.",
    icon: 'ri-key-2-line',
    color: '#C2410C',
    status: 'blocked',
    duration: '~5 min',
    automated: false,
    deliverables: ['Scopes MDP activés', 'r_organization_social', 'r_organization_admin'],
  },
  {
    id: 'regenerate-token',
    num: 10,
    title: 'Régénérer le token OAuth2 avec les nouveaux scopes',
    description: "Refaire le flux OAuth2 pour obtenir un nouveau token incluant les scopes MDP. Mettre à jour le token dans la table social_api_tokens de Supabase.",
    icon: 'ri-refresh-line',
    color: '#C2410C',
    status: 'blocked',
    duration: '~10 min',
    automated: false,
    deliverables: ['Nouveau token OAuth2', 'Token stocké dans Supabase', 'Ancien token révoqué'],
  },
];

export const MDP_FORM_FIELDS: MDPFormField[] = [
  { field: 'Company Name', value: 'KHEPRA EXPERTS SARL', copyable: true },
  { field: 'App Name', value: 'KHEPRA EXPERTS API', copyable: true },
  { field: 'Use Case Title', value: 'Internal Dashboard — Company Page Social Metrics Monitoring', copyable: true },
  { field: 'Use Case Description', value: 'We display real-time LinkedIn Company Page follower counts, industry, and description on our internal KHEPRA OS 2 dashboard used by 1-3 administrators. This data helps our consulting team monitor our digital presence in Francophone Africa. We use the /v2/organizations and /v2/networkSizes endpoints via a secure server-side Edge Function. No user data is shared with third parties.', copyable: true },
  { field: 'API Products Requested', value: 'Marketing Developer Platform', copyable: true },
  { field: 'Scopes Requested', value: 'r_organization_social, r_organization_admin', copyable: true },
  { field: 'Target Audience', value: 'Internal administrators only (1-3 users)', copyable: true },
  { field: 'API Call Volume', value: '< 100 calls/day', copyable: true },
  { field: 'Data Storage', value: 'Displayed in real-time on dashboard only — no persistent storage of LinkedIn data beyond token management', copyable: true },
  { field: 'Privacy Policy URL', value: 'https://khepraexperts.com/privacy', copyable: true },
  { field: 'Terms of Service URL', value: 'https://khepraexperts.com/cgu', copyable: true },
  { field: 'Video Demo URL', value: '[À fournir — lien YouTube/Loom]', copyable: false },
];

export const MDP_VIDEO_SCRIPT: MDPVideoScriptStep[] = [
  {
    timestamp: '00:00-00:15',
    duration: '15 sec',
    title: 'Introduction',
    script: "Bonjour, je suis [Nom], [Fonction] chez KHEPRA EXPERTS, cabinet de conseil en régulation financière et gouvernance basé à Lomé, opérant dans 15 pays d'Afrique francophone. Cette vidéo présente notre intégration avec l'API LinkedIn pour notre dashboard interne de monitoring des métriques sociales.",
    action: 'Se présenter face caméra, montrer son nom/fonction à l\'écran.',
    icon: 'ri-user-voice-line',
  },
  {
    timestamp: '00:15-00:45',
    duration: '30 sec',
    title: 'Présentation du Dashboard',
    script: "Voici notre dashboard KHEPRA OS 2. Il intègre un module de monitoring des réseaux sociaux qui affiche en temps réel les métriques de notre présence digitale. Actuellement, nous avons 6 cartes : les followers Twitter, la Page Entreprise LinkedIn, le Profil du Fondateur, les tweets, le statut des APIs, et le top tweet.",
    action: 'Naviguer sur /agents-experts, scroller jusqu\'au bandeau "Digital Communication & Social Networks Performance Audit Engine". Pointer les 6 cartes une par une.',
    icon: 'ri-dashboard-line',
  },
  {
    timestamp: '00:45-01:15',
    duration: '30 sec',
    title: 'Intégration LinkedIn Existante (Profil Fondateur)',
    script: "Le Profil Fondateur fonctionne en direct via l'API LinkedIn — nous utilisons l'endpoint /v2/me pour récupérer le headline et /v2/networkSizes pour le nombre de followers. Vous pouvez voir ici le point vert qui indique que les données sont live, et le nombre de followers s'affiche correctement.",
    action: 'Pointer la carte Profil Fondateur avec le point vert. Montrer le nombre de followers et le headline.',
    icon: 'ri-user-star-line',
  },
  {
    timestamp: '01:15-01:45',
    duration: '30 sec',
    title: 'Le Problème : Page Entreprise en Mock',
    script: "En revanche, la Page Entreprise affiche un point ambré car nous utilisons des données de secours. L'API /v2/organizations retourne une erreur 403 parce que notre application n'a pas encore les scopes MDP r_organization_social et r_organization_admin. Nous avons besoin de ces scopes pour afficher les vrais followers, l'industrie et la description de notre page entreprise.",
    action: 'Pointer la carte LinkedIn Page avec le point ambré. Montrer le message "Partial" et expliquer.',
    icon: 'ri-error-warning-line',
  },
  {
    timestamp: '01:45-02:15',
    duration: '30 sec',
    title: 'Démonstration du Rafraîchissement',
    script: "Quand l'utilisateur clique sur Rafraîchir, notre Edge Function Supabase interroge les APIs LinkedIn et Twitter en parallèle, aggrège les résultats, et met à jour le dashboard. Les tokens sont stockés de manière sécurisée côté serveur — jamais exposés au client.",
    action: 'Cliquer sur le bouton "Rafraîchir". Montrer le chargement et la mise à jour des données.',
    icon: 'ri-refresh-line',
  },
  {
    timestamp: '02:15-02:45',
    duration: '30 sec',
    title: 'Panel Debug Technique',
    script: "Pour la transparence, nous avons un panel de debug qui montre la réponse JSON brute de l'API. Cela permet à notre équipe technique de diagnostiquer rapidement tout problème. Actuellement on voit que la Company Page est en mock à cause de l'absence des scopes MDP.",
    action: 'Ouvrir le panel "Détails techniques". Montrer la réponse JSON avec le statut 403 pour la Company Page.',
    icon: 'ri-code-line',
  },
  {
    timestamp: '02:45-03:00',
    duration: '15 sec',
    title: 'Conclusion',
    script: "Avec l'approbation MDP, nous pourrons remplacer ces données mock par des données réelles, offrant un dashboard 100% live à notre équipe. L'utilisation est strictement interne, avec un volume d'appels inférieur à 100 par jour pour 1 à 3 administrateurs. Merci de votre attention.",
    action: 'Revenir sur le dashboard complet. Sourire, remercier. Terminer l\'enregistrement.',
    icon: 'ri-check-double-line',
  },
];

export const MDP_QUICK_STATUS: MDPQuickStatus[] = [
  {
    label: 'App LinkedIn',
    status: 'Active',
    detail: 'KHEPRA EXPERTS API',
    icon: 'ri-verified-badge-line',
    color: '#86BC25',
    statusColor: 'text-emerald-600',
  },
  {
    label: 'Scopes OAuth2',
    status: '3/5 actifs',
    detail: 'openid, profile, email',
    icon: 'ri-key-2-line',
    color: '#E8C547',
    statusColor: 'text-amber-600',
  },
  {
    label: 'Profil Fondateur',
    status: 'Live',
    detail: '/v2/me + /v2/networkSizes',
    icon: 'ri-user-star-line',
    color: '#86BC25',
    statusColor: 'text-emerald-600',
  },
  {
    label: 'Page Entreprise',
    status: 'Bloqué — MDP requis',
    detail: 'HTTP 403',
    icon: 'ri-building-line',
    color: '#C2410C',
    statusColor: 'text-red-600',
  },
  {
    label: 'Token LinkedIn',
    status: 'Valide',
    detail: 'Expire le 12 Août 2026',
    icon: 'ri-shield-check-line',
    color: '#86BC25',
    statusColor: 'text-emerald-600',
  },
  {
    label: 'Privacy Policy',
    status: 'En ligne',
    detail: '/privacy',
    icon: 'ri-file-text-line',
    color: '#86BC25',
    statusColor: 'text-emerald-600',
  },
  {
    label: 'CGU',
    status: 'En ligne',
    detail: '/cgu',
    icon: 'ri-scales-3-line',
    color: '#86BC25',
    statusColor: 'text-emerald-600',
  },
  {
    label: 'Vidéo Démo',
    status: 'À enregistrer',
    detail: 'Script prêt',
    icon: 'ri-vidicon-line',
    color: '#E8C547',
    statusColor: 'text-amber-600',
  },
];

export const MDP_AGENTS: MDPAgentTier[] = [
  {
    id: 'social-auditor',
    name: 'KOS Social Connectivity Auditor',
    mission: 'Audit continu de la connectivité API LinkedIn et Twitter. Diagnostic des scopes manquants, alertes expiration token et monitoring de la santé des endpoints.',
    icon: 'ri-radar-line',
    color: '#C2410C',
    status: 'active',
    score: 8.5,
    responsibilities: [
      'Scan quotidien des endpoints LinkedIn API',
      'Détection des scopes manquants',
      'Alerte expiration token (J-7, J-3, J-1)',
      'Fallback automatique mock → live',
    ],
    kpis: [
      { label: 'Uptime API', current: '99.7', target: '99.9', icon: 'ri-server-line' },
      { label: 'Scopes actifs', current: '3', target: '5', icon: 'ri-key-2-line' },
      { label: 'Temps réponse', current: '320', target: '200', icon: 'ri-time-line' },
    ],
  },
  {
    id: 'mdp-orchestrator',
    name: 'KOS MDP Application Orchestrator',
    mission: 'Orchestration complète du processus de candidature MDP. Suivi des étapes, génération automatique du dossier, pré-remplissage du formulaire et tracking du statut.',
    icon: 'ri-git-branch-line',
    color: '#4F46E5',
    status: 'active',
    score: 9.0,
    responsibilities: [
      'Suivi en temps réel des 10 étapes de candidature',
      'Génération automatique du dossier MDP',
      'Pré-remplissage du formulaire Developer Portal',
      'Alertes de progression et blocages',
    ],
    kpis: [
      { label: 'Étapes complétées', current: '3', target: '10', icon: 'ri-check-double-line' },
      { label: 'Progression', current: '30', target: '100', icon: 'ri-bar-chart-line' },
      { label: 'Blocages actifs', current: '2', target: '0', icon: 'ri-error-warning-line' },
    ],
  },
  {
    id: 'content-scripter',
    name: 'KOS Video Script Generator',
    mission: "Génération et maintenance du script de la vidéo de démonstration. Adaptation du script en fonction de l'évolution du dashboard et des exigences LinkedIn MDP.",
    icon: 'ri-quill-pen-line',
    color: '#4A7A1E',
    status: 'active',
    score: 7.8,
    responsibilities: [
      'Génération du script vidéo minute par minute',
      'Instructions de tournage détaillées',
      'Mise à jour automatique si le dashboard évolue',
      'Export script en format prompt pour téléprompteur',
    ],
    kpis: [
      { label: 'Script prêt', current: '100', target: '100', icon: 'ri-check-line' },
      { label: 'Durée estimée', current: '3', target: '3', icon: 'ri-timer-line' },
      { label: 'Sections', current: '7', target: '7', icon: 'ri-list-check' },
    ],
  },
  {
    id: 'post-approval',
    name: 'KOS Post-Approval Activator',
    mission: "Activation automatique post-approbation MDP : mise à jour des scopes, régénération du token, mise à jour Supabase et test du dashboard live.",
    icon: 'ri-rocket-2-line',
    color: '#5B21B6',
    status: 'standby',
    score: 6.5,
    responsibilities: [
      'Détection approbation MDP',
      'Mise à jour automatique des scopes',
      'Régénération token OAuth2',
      'Test dashboard → passage au vert',
    ],
    kpis: [
      { label: 'Prêt activation', current: '100', target: '100', icon: 'ri-check-line' },
      { label: 'Délai activation', current: '—', target: '< 5 min', icon: 'ri-time-line' },
      { label: 'Tests OK', current: '—', target: '6/6', icon: 'ri-check-double-line' },
    ],
  },
];

export const MDP_AUTOMATOR_STATS = {
  totalSteps: 10,
  completedSteps: 3,
  inProgressSteps: 1,
  pendingSteps: 4,
  blockedSteps: 2,
  totalAgents: 4,
  activeAgents: 3,
  standbyAgents: 1,
  progressPercent: 30,
  estimatedTotalDuration: '2-4 semaines (délai LinkedIn)',
  estimatedHumanTime: '~37 minutes de manipulation',
  lastUpdated: '2026-06-13T10:00:00Z',
  dossierGenerated: true,
  dossierPath: 'DOSSIER_MDP_LINKEDIN_KHEPRA.md',
  appLinkedInUrl: 'https://developer.linkedin.com/',
  dashboardUrl: '/agents-experts',
  privacyUrl: 'https://khepraexperts.com/privacy',
  cguUrl: 'https://khepraexperts.com/cgu',
};





