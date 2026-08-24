/**
 * Moteur de lead scoring avancé inspiré des standards B2B
 * Calcule un score de 0 à 100 basé sur des critères multiples
 */

export interface LeadData {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  position?: string;
  organizationType?: string;
  budget?: string;
  timeline?: string;
  priority?: string;
  source_page: string;
  form_type: string;
  metadata?: Record<string, any>;
}

export interface LeadScore {
  total: number;
  category: 'hot' | 'warm' | 'cold';
  breakdown: {
    engagement: number;
    fit: number;
    urgency: number;
    budget: number;
  };
  recommendations: string[];
}

/**
 * Calcule le score d'un lead basé sur plusieurs critères
 * Score total sur 100 points
 */
export function calculateLeadScore(lead: LeadData): LeadScore {
  let engagementScore = 0;
  let fitScore = 0;
  let urgencyScore = 0;
  let budgetScore = 0;
  const recommendations: string[] = [];

  // 1. Score d'engagement (30 points max)
  if (lead.phone) engagementScore += 10;
  if (lead.organization) engagementScore += 10;
  if (lead.position) engagementScore += 5;
  if (lead.metadata?.message && lead.metadata.message.length > 100) engagementScore += 5;

  // 2. Score de fit organisationnel (25 points max)
  const highValueOrgTypes = ['grande-entreprise', 'institution-publique', 'microfinance'];
  const mediumValueOrgTypes = ['pme', 'ong'];
  
  if (lead.organizationType) {
    if (highValueOrgTypes.includes(lead.organizationType)) {
      fitScore += 25;
    } else if (mediumValueOrgTypes.includes(lead.organizationType)) {
      fitScore += 15;
    } else {
      fitScore += 10;
    }
  }

  const seniorPositions = ['dg', 'ceo', 'directeur', 'director', 'président', 'president', 'fondateur', 'founder'];
  if (lead.position && seniorPositions.some(pos => lead.position!.toLowerCase().includes(pos))) {
    fitScore += 10;
    recommendations.push('Décideur senior identifié - Prioriser le contact');
  }

  // 3. Score d'urgence (25 points max)
  const urgencyMap: Record<string, number> = {
    'critique': 25,
    'urgent': 20,
    'haute': 15,
    'court-terme': 12,
    'moyenne': 8,
    'moyen-terme': 8,
    'basse': 5,
    'long-terme': 5,
  };

  if (lead.priority && urgencyMap[lead.priority]) {
    urgencyScore += urgencyMap[lead.priority] * 0.6;
  }

  if (lead.timeline && urgencyMap[lead.timeline]) {
    urgencyScore += urgencyMap[lead.timeline] * 0.4;
  }

  // 4. Score de budget (20 points max)
  const budgetMap: Record<string, number> = {
    'plus-50m': 20,
    '25m-50m': 16,
    '10m-25m': 12,
    '5m-10m': 8,
    'moins-5m': 5,
    'a-definir': 3,
  };

  if (lead.budget && budgetMap[lead.budget]) {
    budgetScore += budgetMap[lead.budget];
  }

  // Calcul du score total
  const total = Math.round(engagementScore + fitScore + urgencyScore + budgetScore);

  // Catégorisation
  let category: 'hot' | 'warm' | 'cold';
  if (total >= 70) {
    category = 'hot';
    recommendations.push('🔥 Lead chaud - Contact immédiat recommandé');
    recommendations.push('Proposer une consultation stratégique dans les 24h');
  } else if (total >= 45) {
    category = 'warm';
    recommendations.push('⚡ Lead qualifié - Contact sous 48h');
    recommendations.push('Envoyer une documentation personnalisée');
  } else {
    category = 'cold';
    recommendations.push('📧 Lead à nurturer - Ajouter à la séquence email');
    recommendations.push('Proposer des ressources gratuites (webinaires, guides)');
  }

  // Recommandations spécifiques par type de formulaire
  const formTypeRecommendations: Record<string, string> = {
    'conseil-strategique': 'Préparer une analyse préliminaire du secteur',
    'transformation-digitale': 'Proposer un audit digital gratuit',
    'levee-fonds': 'Partager des success stories de levées de fonds',
    'gestion-projets': 'Envoyer la méthodologie de gestion de projet',
    'ressources-humaines': 'Proposer un diagnostic RH',
    'developpement-organisationnel': 'Partager le framework de développement organisationnel',
  };

  if (lead.form_type && formTypeRecommendations[lead.form_type]) {
    recommendations.push(formTypeRecommendations[lead.form_type]);
  }

  // Recommandations basées sur le budget
  if (budgetScore >= 16) {
    recommendations.push('💰 Budget significatif - Impliquer un senior partner');
  }

  // Recommandations basées sur l\'urgence
  if (urgencyScore >= 20) {
    recommendations.push('⏰ Urgence élevée - Réponse prioritaire requise');
  }

  return {
    total,
    category,
    breakdown: {
      engagement: Math.round(engagementScore),
      fit: Math.round(fitScore),
      urgency: Math.round(urgencyScore),
      budget: Math.round(budgetScore),
    },
    recommendations,
  };
}

/**
 * Détermine la séquence d'emails appropriée pour un lead
 */
export function getEmailSequence(score: LeadScore): string[] {
  if (score.category === 'hot') {
    return [
      'email_immediate_response',
      'email_consultation_booking',
      'email_case_study_relevant',
    ];
  } else if (score.category === 'warm') {
    return [
      'email_welcome_qualified',
      'email_resources_sharing',
      'email_consultation_offer',
      'email_follow_up_1',
    ];
  } else {
    return [
      'email_welcome_nurture',
      'email_educational_content',
      'email_webinar_invitation',
      'email_follow_up_1',
      'email_follow_up_2',
    ];
  }
}

/**
 * Calcule le délai de réponse recommandé en heures
 */
export function getRecommendedResponseTime(score: LeadScore): number {
  if (score.category === 'hot') return 2; // 2 heures
  if (score.category === 'warm') return 24; // 24 heures
  return 72; // 72 heures
}

/**
 * Détermine le niveau de priorité pour l'équipe commerciale
 */
export function getSalesPriority(score: LeadScore): 'P0' | 'P1' | 'P2' | 'P3' {
  if (score.total >= 80) return 'P0'; // Critique
  if (score.total >= 70) return 'P1'; // Haute
  if (score.total >= 45) return 'P2'; // Moyenne
  return 'P3'; // Basse
}

/**
 * Génère un résumé du lead pour l'équipe commerciale
 */
export function generateLeadSummary(lead: LeadData, score: LeadScore): string {
  const priority = getSalesPriority(score);
  const responseTime = getRecommendedResponseTime(score);
  
  return `
🎯 NOUVEAU LEAD [${priority}] - Score: ${score.total}/100 (${score.category.toUpperCase()})

👤 Contact:
- Nom: ${lead.full_name}
- Email: ${lead.email}
- Téléphone: ${lead.phone || 'Non fourni'}
- Poste: ${lead.position || 'Non spécifié'}

🏢 Organisation:
- Nom: ${lead.organization || 'Non spécifié'}
- Type: ${lead.organizationType || 'Non spécifié'}

📊 Qualification:
- Budget: ${lead.budget || 'Non spécifié'}
- Délai: ${lead.timeline || 'Non spécifié'}
- Priorité: ${lead.priority || 'Non spécifiée'}

🎯 Service demandé: ${lead.form_type}
📄 Page source: ${lead.source_page}

⏰ Temps de réponse recommandé: ${responseTime}h

💡 Recommandations:
${score.recommendations.map(r => `- ${r}`).join('\n')}

📈 Détail du score:
- Engagement: ${score.breakdown.engagement}/30
- Fit organisationnel: ${score.breakdown.fit}/25
- Urgence: ${score.breakdown.urgency}/25
- Budget: ${score.breakdown.budget}/20
  `.trim();
}



