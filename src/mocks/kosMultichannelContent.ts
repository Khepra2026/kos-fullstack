export interface VideoScriptSection {
  title: string;
  duration: string;
  script: string;
  visual_notes: string;
}

export interface VideoScript {
  hook: string;
  sections: VideoScriptSection[];
  cta: string;
  total_duration: string;
}

export interface MultichannelItem {
  id: string;
  youtube_title: string;
  youtube_url: string | null;
  youtube_status: 'draft' | 'published';
  linkedin_hook: string;
  linkedin_status: 'draft' | 'ready';
  blog_status: 'draft' | 'ready';
  video_type: string;
  youtube_script: VideoScript;
  tags: string[];
  engagement_estimate: 'high' | 'medium' | 'low';
  status: 'draft' | 'ready' | 'published';
}

export const MULTICHANNEL_CONTENT: MultichannelItem[] = [
  {
    id: 'mc-001',
    youtube_title: 'Conformité BCEAO 2026 : Le Guide Complet pour les Institutions Financières',
    youtube_url: null,
    youtube_status: 'draft',
    linkedin_hook: "80% des institutions financières UEMOA ne sont pas encore conformes aux nouvelles exigences BCEAO 2026. Voici ce qui change.",
    linkedin_status: 'ready',
    blog_status: 'ready',
    video_type: 'analyse_reglementaire',
    tags: ['BCEAO', 'conformité réglementaire', 'banque africaine', 'UEMOA', 'régulation financière', 'KHEPRA EXPERTS'],
    engagement_estimate: 'high',
    status: 'ready',
    youtube_script: {
      hook: "Saviez-vous que 90% des institutions financières sous-estiment l'impact de la nouvelle circulaire BCEAO 2026 sur leur conformité ? Voici le chiffre qui change tout.",
      sections: [
        {
          title: 'Accroche',
          duration: '0:00-0:30',
          script: "Saviez-vous que 90% des institutions financières sous-estiment l'impact de la nouvelle circulaire BCEAO 2026 sur leur conformité ? Voici le chiffre qui change tout.",
          visual_notes: 'Texte choc en plein écran + musique montante + logo KHEPRA EXPERTS en bas à droite',
        },
        {
          title: 'Contexte Réglementaire',
          duration: '0:30-2:30',
          script: "La BCEAO a publié une nouvelle circulaire qui redéfinit les exigences de conformité pour toutes les institutions financières de l'UEMOA. Cette réforme, entrée en vigueur en janvier 2026, introduit 47 nouvelles obligations. L'inaction coûte plus cher que l'action.",
          visual_notes: 'Carte UEMOA animée + citations réglementaires + timeline des échéances',
        },
        {
          title: 'Les 5 Piliers de la Réforme',
          duration: '2:30-6:00',
          script: "La réforme s'articule autour de 5 piliers : (1) Gouvernance renforcée des organes de contrôle, (2) Cartographie des risques actualisée trimestriellement, (3) Dispositif LCB/FT intégrant les recommandations GAFI 2025, (4) Reporting prudentiel harmonisé, (5) Audit externe annuel certifié.",
          visual_notes: 'Infographie 5 piliers + icônes animés + schéma de gouvernance',
        },
        {
          title: 'Cas Concret : Mise en Conformité',
          duration: '6:00-9:00',
          script: "Nous avons accompagné une banque panafricaine dans sa mise en conformité. Diagnostic initial : 12 des 47 obligations non couvertes. Notre plan d'action priorisé a permis la conformité totale en 90 jours. La clé : un pilotage par les risques et une feuille de route réaliste.",
          visual_notes: 'Dashboard conformité avant/après + KPI + témoignage client masqué',
        },
        {
          title: 'Conclusion & Recommandations',
          duration: '9:00-12:00',
          script: "Ne tardez pas. Les premières inspections ciblées BCEAO débutent en septembre 2026. Contactez KHEPRA EXPERTS pour un diagnostic flash de votre niveau de conformité. Abonnez-vous à @KHEPRAEXPERTS pour nos prochaines analyses réglementaires.",
          visual_notes: 'QR code vers diagnostic + CTA abonnement + logo KHEPRA EXPERTS',
        },
      ],
      cta: "Contactez KHEPRA EXPERTS pour un diagnostic flash de votre niveau de conformité BCEAO 2026. Lien dans la description.",
      total_duration: '12 min',
    },
  },
  {
    id: 'mc-002',
    youtube_title: 'Gouvernance Bancaire UEMOA — Ce que les Administrateurs Doivent Savoir en 2026',
    youtube_url: 'https://www.youtube.com/watch?v=khepra-gov-001',
    youtube_status: 'published',
    linkedin_hook: "Être administrateur de banque en 2026, c'est assumer une responsabilité sans précédent. La circulaire BCEAO 01-2017 change la donne.",
    linkedin_status: 'ready',
    blog_status: 'ready',
    video_type: 'guide_pratique',
    tags: ['gouvernance bancaire', 'conseil administration', 'BCEAO', 'UEMOA', 'OHADA', 'KHEPRA EXPERTS'],
    engagement_estimate: 'high',
    status: 'published',
    youtube_script: {
      hook: "Être administrateur de banque en 2026, c'est assumer une responsabilité sans précédent devant la BCEAO. Voici les 7 obligations que chaque administrateur doit maîtriser.",
      sections: [
        {
          title: 'Introduction',
          duration: '0:00-0:30',
          script: "Être administrateur de banque en 2026, c'est assumer une responsabilité sans précédent devant la BCEAO. Voici les 7 obligations que chaque administrateur doit maîtriser.",
          visual_notes: 'Texte impact + logo KHEPRA + musique institutionnelle',
        },
        {
          title: 'Le Nouveau Cadre de Gouvernance',
          duration: '0:30-3:00',
          script: "La circulaire 01-2017 de la BCEAO a introduit des comités spécialisés obligatoires : comité d'audit, comité des risques, comité de nomination et de rémunération. Chaque administrateur doit désormais justifier de compétences spécifiques et d'une formation continue de 40 heures par an.",
          visual_notes: 'Organigramme de gouvernance + schéma des comités + références circulaires',
        },
        {
          title: 'Responsabilité Personnelle des Administrateurs',
          duration: '3:00-6:30',
          script: "La BCEAO peut désormais engager la responsabilité personnelle des administrateurs en cas de manquement grave. Sanctions : amendes jusqu'à 50 millions FCFA, interdiction d'exercer, voire poursuites pénales. L'indépendance et la compétence ne sont plus optionnelles.",
          visual_notes: 'Tableau des sanctions + cas jurisprudence UEMOA + statistiques',
        },
        {
          title: 'Plan d\'Action pour les Conseils',
          duration: '6:30-9:30',
          script: "Notre recommandation en 4 étapes : (1) Auto-évaluation du conseil selon la grille BCEAO, (2) Formation certifiante des administrateurs, (3) Mise en place des comités spécialisés avec chartes, (4) Documentation systématique des délibérations. KHEPRA EXPERTS a accompagné 12 banques dans cette transformation.",
          visual_notes: 'Checklist visuelle 4 étapes + témoignages + KPI transformation',
        },
        {
          title: 'Conclusion',
          duration: '9:30-11:00',
          script: "La gouvernance n'est plus une case à cocher. C'est votre meilleure protection. Téléchargez notre guide complet pour les administrateurs de banque. Abonnez-vous pour la suite de notre série gouvernance.",
          visual_notes: 'QR code guide + CTA abonnement + prochain épisode teaser',
        },
      ],
      cta: "Téléchargez notre guide complet de gouvernance bancaire pour administrateurs. Lien dans la description.",
      total_duration: '11 min',
    },
  },
  {
    id: 'mc-003',
    youtube_title: 'ESG en Afrique : Comment Préparer Votre Reporting ISSB Avant l\'Échéance 2027',
    youtube_url: null,
    youtube_status: 'draft',
    linkedin_hook: "Les normes ISSB arrivent en Afrique. 2027, c'est demain. Voici comment préparer votre reporting ESG sans perdre 6 mois.",
    linkedin_status: 'ready',
    blog_status: 'ready',
    video_type: 'tendance_marche',
    tags: ['ESG Afrique', 'ISSB', 'reporting ESG', 'durabilité', 'finance durable', 'KHEPRA EXPERTS'],
    engagement_estimate: 'medium',
    status: 'ready',
    youtube_script: {
      hook: "2027 paraît loin, mais pour votre reporting ESG, c'est dans 6 mois. Les normes ISSB vont transformer l'accès au financement des entreprises africaines.",
      sections: [
        {
          title: 'Accroche',
          duration: '0:00-0:30',
          script: "2027 paraît loin, mais pour votre reporting ESG, c'est dans 6 mois. Les normes ISSB vont transformer l'accès au financement des entreprises africaines.",
          visual_notes: 'Compte à rebours 2027 + globe Afrique + logos ISSB/IFRS',
        },
        {
          title: 'Qu\'est-ce que l\'ISSB ?',
          duration: '0:30-2:30',
          script: "L'International Sustainability Standards Board a publié ses premières normes IFRS S1 et S2 en juin 2023. Elles deviennent la référence mondiale pour le reporting de durabilité. Pour les entreprises africaines, l'enjeu est double : accès aux financements internationaux et conformité réglementaire anticipée.",
          visual_notes: 'Frise chronologique ISSB + carte des pays adoptants + logos investisseurs',
        },
        {
          title: 'Les 3 Défis Africains',
          duration: '2:30-5:00',
          script: "Trois défis spécifiques à l'Afrique : (1) La disponibilité des données — peu d'entreprises ont un historique ESG, (2) La double matérialité — comment évaluer l'impact environnemental dans des contextes à faible données, (3) Le coût de mise en conformité — entre 50K et 200K USD selon la taille de l'entreprise.",
          visual_notes: 'Infographie 3 défis + comparatif coûts par région + graphiques',
        },
        {
          title: 'La Méthode KHEPRA en 4 Étapes',
          duration: '5:00-8:30',
          script: "Notre approche : (1) Diagnostic maturité ESG en 2 semaines, (2) Collecte et structuration des données via notre plateforme, (3) Calcul des indicateurs ISSB avec double matérialité, (4) Production du rapport auditable. Nous avons déjà accompagné 8 entreprises dans cette démarche.",
          visual_notes: 'Process 4 étapes + dashboard ESG + exemples de rapports',
        },
        {
          title: 'Conclusion',
          duration: '8:30-10:00',
          script: "Ne sous-estimez pas le temps nécessaire. Commencez maintenant. Contactez KHEPRA EXPERTS pour un diagnostic ESG gratuit. Abonnez-vous pour nos prochains contenus sur la finance durable en Afrique.",
          visual_notes: 'CTA diagnostic + QR code + prochain épisode',
        },
      ],
      cta: "Contactez KHEPRA EXPERTS pour un diagnostic ESG gratuit. Préparez votre reporting ISSB dès aujourd'hui.",
      total_duration: '10 min',
    },
  },
  {
    id: 'mc-004',
    youtube_title: 'Levée de Fonds en Afrique : 5 Erreurs Fatales Dans Votre Business Plan',
    youtube_url: 'https://www.youtube.com/watch?v=khepra-bp-002',
    youtube_status: 'published',
    linkedin_hook: "J'ai analysé 200 business plans de startups africaines en 2025. 85% contiennent la même erreur fatale. La voici.",
    linkedin_status: 'ready',
    blog_status: 'ready',
    video_type: 'etude_cas',
    tags: ['levée de fonds Afrique', 'business plan', 'investissement', 'PME croissance', 'due diligence', 'KHEPRA EXPERTS'],
    engagement_estimate: 'high',
    status: 'published',
    youtube_script: {
      hook: "J'ai analysé 200 business plans de startups africaines en 2025. 85% contiennent la même erreur fatale qui fait fuir les investisseurs en 30 secondes.",
      sections: [
        {
          title: 'Accroche',
          duration: '0:00-0:30',
          script: "J'ai analysé 200 business plans de startups africaines en 2025. 85% contiennent la même erreur fatale qui fait fuir les investisseurs en 30 secondes.",
          visual_notes: 'Statistique choc + compteur animé + musique percutante',
        },
        {
          title: 'Erreur N°1 : Projections Irréalistes',
          duration: '0:30-2:00',
          script: "La première erreur : des projections de croissance à 300% par an sans justification. Les investisseurs internationaux connaissent les réalités du marché africain. Ils veulent des hypothèses solides, pas des courbes exponentielles sans fondement.",
          visual_notes: 'Graphique projections vs réalité + comparatif marchés africains',
        },
        {
          title: 'Erreurs N°2 à N°5',
          duration: '2:00-7:00',
          script: "Erreur 2 : Absence d'analyse de la concurrence locale. Erreur 3 : Sous-estimation du besoin en fonds de roulement. Erreur 4 : Plan de sortie inexistant. Erreur 5 : Négligence des risques réglementaires spécifiques à la zone UEMOA/CEMAC.",
          visual_notes: 'Liste visuelle 5 erreurs + icônes + exemples concrets',
        },
        {
          title: 'Le Business Plan qui a Levé 5M USD',
          duration: '7:00-10:30',
          script: "Nous avons structuré le business plan d'une fintech ouest-africaine qui a levé 5 millions USD en série A. Les clés du succès : hypothèses conservatrices validées par des études terrain, analyse comparative régionale, plan de mitigation des risques pays, gouvernance solide avec administrateurs indépendants.",
          visual_notes: 'Business plan visuel + KPI clés + témoignage fondateur anonymisé',
        },
        {
          title: 'Conclusion',
          duration: '10:30-12:00',
          script: "Votre business plan est votre premier produit. Traitez-le comme tel. Téléchargez notre template de business plan investisseur. Abonnez-vous pour nos prochains conseils sur la levée de fonds en Afrique.",
          visual_notes: 'CTA template + QR code + KHEPRA EXPERTS',
        },
      ],
      cta: "Téléchargez notre template de business plan optimisé pour les investisseurs internationaux. Lien dans la description.",
      total_duration: '12 min',
    },
  },
  {
    id: 'mc-005',
    youtube_title: 'LBC/FT en Afrique : Nouvelles Exigences GAFI 2026 — Êtes-Vous Prêt ?',
    youtube_url: null,
    youtube_status: 'draft',
    linkedin_hook: "Le GAFI a durci ses recommandations pour l'Afrique. 12 pays sont sur liste grise. Votre institution est-elle exposée ?",
    linkedin_status: 'ready',
    blog_status: 'ready',
    video_type: 'analyse_reglementaire',
    tags: ['LBC/FT', 'GAFI', 'conformité bancaire', 'KYC', 'blanchiment', 'KHEPRA EXPERTS'],
    engagement_estimate: 'high',
    status: 'ready',
    youtube_script: {
      hook: "Le GAFI a placé 12 pays africains sur sa liste grise en 2026. Chaque transaction internationale de votre institution est désormais scrutée. Voici les 10 mesures que vous devez déployer.",
      sections: [
        {
          title: 'Accroche',
          duration: '0:00-0:30',
          script: "Le GAFI a placé 12 pays africains sur sa liste grise en 2026. Chaque transaction internationale de votre institution est désormais scrutée. Voici les 10 mesures que vous devez déployer.",
          visual_notes: 'Carte Afrique avec pays liste grise + alerte rouge clignotante',
        },
        {
          title: 'Contexte GAFI 2026',
          duration: '0:30-3:00',
          script: "Le Groupe d'Action Financière a renforcé ses 40 recommandations en février 2026. Focus sur l'Afrique : 12 pays en liste grise, des délais de mise en conformité raccourcis à 12 mois, et des sanctions renforcées pour les institutions qui ne démontrent pas un dispositif LBC/FT robuste.",
          visual_notes: 'Timeline GAFI + carte liste grise + statistiques sanctions',
        },
        {
          title: 'Les 10 Mesures Clés',
          duration: '3:00-8:00',
          script: "1. Cartographie nationale des risques. 2. Due diligence renforcée sur les PPE. 3. Bénéficiaires effectifs — registre central. 4. Déclaration de soupçon systématisée. 5. Formation obligatoire du personnel. 6. Audit externe annuel LBC/FT. 7. Procédures gel des avoirs. 8. Contrôle des correspondants bancaires. 9. Nouvelles technologies — RegTech. 10. Coopération internationale.",
          visual_notes: 'Checklist 10 mesures + icônes + pourcentage de conformité par pays',
        },
        {
          title: 'Cas Pratique : Sortie de Liste Grise',
          duration: '8:00-10:30',
          script: "Nous avons accompagné un pays africain dans son processus de sortie de liste grise GAFI. Résultat : conformité atteinte en 10 mois au lieu des 24 estimés initialement. La méthode : un plan d'action national coordonné, un comité interministériel, et des réformes législatives ciblées.",
          visual_notes: 'Dashboard de suivi + étapes clés + résultats',
        },
        {
          title: 'Conclusion',
          duration: '10:30-12:00',
          script: "La conformité LBC/FT est un investissement, pas un coût. Elle protège votre institution et facilite vos relations avec les correspondants internationaux. Contactez KHEPRA EXPERTS pour un audit LBC/FT.",
          visual_notes: 'CTA audit + QR code + KHEPRA EXPERTS',
        },
      ],
      cta: "Contactez KHEPRA EXPERTS pour un audit LBC/FT complet. Protégez votre institution.",
      total_duration: '12 min',
    },
  },
  {
    id: 'mc-006',
    youtube_title: 'Transformation Digitale des SFD : Le Modèle BCEAO pour l\'Inclusion Financière',
    youtube_url: null,
    youtube_status: 'draft',
    linkedin_hook: "Les SFD africains ont 18 mois pour se digitaliser. La BCEAO a publié son cadre. Voici comment réussir cette transformation.",
    linkedin_status: 'ready',
    blog_status: 'draft',
    video_type: 'guide_pratique',
    tags: ['microfinance', 'SFD', 'BCEAO', 'inclusion financière', 'transformation digitale', 'KHEPRA EXPERTS'],
    engagement_estimate: 'medium',
    status: 'ready',
    youtube_script: {
      hook: "La BCEAO donne 18 mois aux SFD pour adopter un système d'information conforme. C'est le plus grand défi technologique de l'histoire de la microfinance africaine.",
      sections: [
        {
          title: 'Accroche',
          duration: '0:00-0:30',
          script: "La BCEAO donne 18 mois aux SFD pour adopter un système d'information conforme. C'est le plus grand défi technologique de l'histoire de la microfinance africaine.",
          visual_notes: 'Compte à rebours + carte SFD UEMOA + logo BCEAO',
        },
        {
          title: 'Le Cadre BCEAO',
          duration: '0:30-2:30',
          script: "La BCEAO a publié en mars 2026 son cadre de digitalisation des Systèmes Financiers Décentralisés. 4 axes : interopérabilité des plateformes, sécurité des données, reporting automatisé, et inclusion des populations non bancarisées via mobile money.",
          visual_notes: 'Schéma 4 axes + chiffres inclusion financière + timeline',
        },
        {
          title: 'Les Solutions Technologiques',
          duration: '2:30-5:30',
          script: "Deux approches : (1) Adopter une plateforme SaaS conforme — coût 5K-15K USD/an, (2) Développer une solution sur mesure — coût 50K-150K USD. Pour 80% des SFD, l'approche SaaS est la plus pertinente. Nous recommandons 3 plateformes certifiées.",
          visual_notes: 'Comparatif SaaS vs Sur Mesure + logos plateformes + fourchettes de coûts',
        },
        {
          title: 'Méthodologie de Déploiement',
          duration: '5:30-8:00',
          script: "Phase 1 (mois 1-3) : diagnostic et choix de la solution. Phase 2 (mois 4-9) : paramétrage et migration des données. Phase 3 (mois 10-15) : formation des équipes et tests. Phase 4 (mois 16-18) : go-live et audit de conformité.",
          visual_notes: 'Roadmap 4 phases + jalons + livrables par phase',
        },
        {
          title: 'Conclusion',
          duration: '8:00-10:00',
          script: "Ne sous-estimez pas ce projet. 18 mois, c'est court. Commencez votre diagnostic dès maintenant. Contactez KHEPRA EXPERTS pour un accompagnement sur mesure. Abonnez-vous pour nos prochains guides pratiques.",
          visual_notes: 'CTA diagnostic + QR code + abonnement',
        },
      ],
      cta: "Contactez KHEPRA EXPERTS pour un diagnostic de digitalisation de votre SFD. 18 mois, c'est demain.",
      total_duration: '10 min',
    },
  },
];