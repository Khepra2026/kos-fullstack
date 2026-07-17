import type { DiagnosticToolConfig } from '../components/types';

const FORM_URL = 'https://readdy.ai/api/form/d7b9jge8177dosp0ivag';

function getScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#0e7490';
  if (score >= 40) return '#d97706';
  return '#dc2626';
}

function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Excellent' : 'Excellent';
  if (score >= 60) return isFr ? 'Bon' : 'Good';
  if (score >= 40) return isFr ? 'Moyen' : 'Average';
  return isFr ? 'Critique' : 'Critical';
}

function getMaturityLevel(score: number, lang: string): string {
  return getScoreLabel(score, lang);
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Posture de cybersécurité excellente — maintenez vos standards' : 'Excellent cybersecurity posture — maintain your standards';
  if (score >= 60) return isFr ? 'Posture de sécurité bonne — des renforcements ciblés sont recommandés' : 'Good security posture — targeted reinforcements recommended';
  if (score >= 40) return isFr ? 'Posture de sécurité moyenne — des améliorations significatives sont nécessaires' : 'Average security posture — significant improvements needed';
  return isFr ? 'Posture de sécurité critique — une action immédiate est requise' : 'Critical security posture — immediate action required';
}

function getRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = !lang.startsWith('en');
  const risks: (string | { fr: string; en: string })[] = [];

  if ((perAxis['infrastructure'] ?? 100) < 50) {
    risks.push({ fr: 'Infrastructure — Score faible : risque d\'intrusion et de compromission des systèmes', en: 'Infrastructure — Low score: risk of intrusion and system compromise' });
  }
  if ((perAxis['politiques'] ?? 100) < 50) {
    risks.push({ fr: 'Politiques — Score faible : absence de gouvernance sécurité formalisée', en: 'Policies — Low score: lack of formalized security governance' });
  }
  if ((perAxis['reponse-incidents'] ?? 100) < 50) {
    risks.push({ fr: 'Réponse aux Incidents — Score faible : incapacité à gérer une cyberattaque', en: 'Incident Response — Low score: inability to handle a cyberattack' });
  }
  if ((perAxis['conformite'] ?? 100) < 50) {
    risks.push({ fr: 'Conformité — Score faible : risque de sanctions réglementaires (RGPD, BCEAO)', en: 'Compliance — Low score: risk of regulatory sanctions (GDPR, BCEAO)' });
  }
  if ((perAxis['sensibilisation'] ?? 100) < 50) {
    risks.push({ fr: 'Sensibilisation — Score faible : le facteur humain reste le maillon faible', en: 'Awareness — Low score: human factor remains the weakest link' });
  }
  if (risks.length === 0) {
    risks.push({ fr: 'Risques de cybersécurité globalement maîtrisés', en: 'Cybersecurity risks generally under control' });
  }
  return risks;
}

function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  const infraScore = perAxis['infrastructure'] ?? 0;
  const policiesScore = perAxis['politiques'] ?? 0;
  const incidentScore = perAxis['reponse-incidents'] ?? 0;
  const complianceScore = perAxis['conformite'] ?? 0;
  const awarenessScore = perAxis['sensibilisation'] ?? 0;

  if (infraScore < 50) {
    recs.push({
      title: isFr ? 'Renforcer l\'infrastructure de sécurité' : 'Strengthen security infrastructure',
      items: isFr
        ? ['Segmenter votre réseau avec des zones de sécurité distinctes (DMZ, LAN, WAN)', 'Déployer un pare-feu NGFW avec inspection approfondie', 'Mettre en place un IDS/IPS avec monitoring 24/7', 'Implémenter le chiffrement systématique (TLS 1.3, AES-256)']
        : ['Segment your network with distinct security zones (DMZ, LAN, WAN)', 'Deploy NGFW with deep inspection', 'Implement IDS/IPS with 24/7 monitoring', 'Implement systematic encryption (TLS 1.3, AES-256)'],
    });
  }
  if (policiesScore < 50) {
    recs.push({
      title: isFr ? 'Formaliser les politiques de sécurité' : 'Formalize security policies',
      items: isFr
        ? ['Formaliser une politique de sécurité de l\'information (PSSI)', 'Nommer un RSSI dédié avec équipe et budget', 'Réaliser une analyse de risques cyber complète (ISO 27005)', 'Mettre en place une politique IAM avec moindre privilège']
        : ['Formalize an information security policy', 'Appoint a dedicated CISO with team and budget', 'Conduct a complete cyber risk assessment (ISO 27005)', 'Implement IAM policy with least privilege'],
    });
  }
  if (incidentScore < 50) {
    recs.push({
      title: isFr ? 'Préparer la réponse aux incidents' : 'Prepare incident response',
      items: isFr
        ? ['Formaliser un plan de réponse aux incidents (PSIR)', 'Créer une équipe CSIRT/CERT dédiée', 'Mettre en place des procédures de notification (clients, CNIL)', 'Déployer des outils de forensique et d\'analyse post-incident']
        : ['Formalize an incident response plan (SIRP)', 'Create a dedicated CSIRT/CERT team', 'Set up notification procedures (clients, DPA)', 'Deploy forensic and post-incident analysis tools'],
    });
  }
  if (complianceScore < 50) {
    recs.push({
      title: isFr ? 'Atteindre la conformité réglementaire' : 'Achieve regulatory compliance',
      items: isFr
        ? ['Mettre en conformité RGPD avec nomination DPO et registre des traitements', 'Engager une démarche de certification ISO 27001', 'Se conformer aux directives BCEAO/COBAC sur la cybersécurité bancaire', 'Implémenter les contrôles PCI DSS si applicable']
        : ['Achieve GDPR compliance with DPO appointment and processing register', 'Engage ISO 27001 certification process', 'Comply with BCEAO/COBAC banking cybersecurity directives', 'Implement PCI DSS controls if applicable'],
    });
  }
  if (awarenessScore < 50) {
    recs.push({
      title: isFr ? 'Développer la culture cybersécurité' : 'Develop cybersecurity culture',
      items: isFr
        ? ['Déployer un programme de formation cybersécurité obligatoire pour tous', 'Lancer des campagnes de simulation de phishing trimestrielles', 'Faire signer une charte informatique par tous les collaborateurs', 'Créer un réseau d\'ambassadeurs sécurité dans chaque département']
        : ['Deploy mandatory cybersecurity training program for all', 'Launch quarterly phishing simulation campaigns', 'Have all employees sign an IT charter', 'Create a security ambassador network in each department'],
    });
  }
  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence' : 'Maintain excellence',
      items: isFr
        ? ['Maintenir les certifications avec audits de surveillance réguliers', 'Anticiper les évolutions réglementaires (NIS2, DORA)', 'Optimiser la veille réglementaire avec comité de conformité', 'Développer une culture sécurité forte avec reconnaissance']
        : ['Maintain certifications with regular surveillance audits', 'Anticipate regulatory changes (NIS2, DORA)', 'Optimize regulatory monitoring with compliance committee', 'Develop a strong security culture with recognition'],
    });
  }
  return recs;
}

const infraQuestions = [
  {
    id: 'infra_1', questionFr: 'Votre infrastructure réseau est-elle segmentée avec des zones de sécurité distinctes ?', questionEn: 'Is your network infrastructure segmented with distinct security zones?',
    opts: [{ v: 0, fr: 'Aucune segmentation', en: 'No segmentation' }, { v: 33, fr: 'Segmentation basique', en: 'Basic segmentation' }, { v: 67, fr: 'Segmentation avancée avec DMZ', en: 'Advanced segmentation with DMZ' }, { v: 100, fr: 'Architecture Zero Trust complète', en: 'Complete Zero Trust architecture' }],
  },
  {
    id: 'infra_2', questionFr: 'Disposez-vous d\'un système de détection et prévention des intrusions (IDS/IPS) ?', questionEn: 'Do you have an intrusion detection and prevention system (IDS/IPS)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'IDS uniquement', en: 'IDS only' }, { v: 67, fr: 'IDS/IPS avec monitoring manuel', en: 'IDS/IPS with manual monitoring' }, { v: 100, fr: 'IDS/IPS avec SOC 24/7', en: 'IDS/IPS with 24/7 SOC' }],
  },
  {
    id: 'infra_3', questionFr: 'Vos systèmes critiques sont-ils protégés par des pare-feu de nouvelle génération (NGFW) ?', questionEn: 'Are your critical systems protected by next-generation firewalls (NGFW)?',
    opts: [{ v: 0, fr: 'Pas de pare-feu', en: 'No firewall' }, { v: 33, fr: 'Pare-feu traditionnels', en: 'Traditional firewalls' }, { v: 67, fr: 'NGFW partiellement déployés', en: 'Partially deployed NGFW' }, { v: 100, fr: 'NGFW complets avec WAF', en: 'Complete NGFW with WAF' }],
  },
  {
    id: 'infra_4', questionFr: 'Utilisez-vous le chiffrement pour protéger les données en transit et au repos ?', questionEn: 'Do you use encryption to protect data in transit and at rest?',
    opts: [{ v: 0, fr: 'Aucun chiffrement', en: 'No encryption' }, { v: 33, fr: 'Chiffrement partiel', en: 'Partial encryption' }, { v: 67, fr: 'Chiffrement systématique (TLS 1.3, AES-256)', en: 'Systematic encryption (TLS 1.3, AES-256)' }, { v: 100, fr: 'Chiffrement + HSM pour clés sensibles', en: 'Encryption + HSM for sensitive keys' }],
  },
  {
    id: 'infra_5', questionFr: 'Avez-vous mis en place une authentification multi-facteurs (MFA) ?', questionEn: 'Have you implemented multi-factor authentication (MFA)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'MFA pour administrateurs uniquement', en: 'MFA for administrators only' }, { v: 67, fr: 'MFA pour tous les accès distants', en: 'MFA for all remote access' }, { v: 100, fr: 'MFA obligatoire pour tous les utilisateurs', en: 'Mandatory MFA for all users' }],
  },
  {
    id: 'infra_6', questionFr: 'Disposez-vous d\'une solution de sauvegarde et de reprise après sinistre (DRP) ?', questionEn: 'Do you have a backup and disaster recovery solution (DRP)?',
    opts: [{ v: 0, fr: 'Pas de sauvegarde formelle', en: 'No formal backup' }, { v: 33, fr: 'Sauvegardes manuelles irrégulières', en: 'Irregular manual backups' }, { v: 67, fr: 'Sauvegardes automatisées quotidiennes', en: 'Daily automated backups' }, { v: 100, fr: 'DRP complet avec RTO/RPO documentés et testés', en: 'Complete DRP with documented and tested RTO/RPO' }],
  },
  {
    id: 'infra_7', questionFr: 'Vos systèmes sont-ils régulièrement mis à jour avec les correctifs de sécurité ?', questionEn: 'Are your systems regularly updated with security patches?',
    opts: [{ v: 0, fr: 'Mises à jour ad hoc', en: 'Ad hoc updates' }, { v: 33, fr: 'Mises à jour trimestrielles', en: 'Quarterly updates' }, { v: 67, fr: 'Mises à jour mensuelles', en: 'Monthly updates' }, { v: 100, fr: 'Patch management automatisé avec tests', en: 'Automated patch management with testing' }],
  },
  {
    id: 'infra_8', questionFr: 'Utilisez-vous des solutions de protection des endpoints (EDR/XDR) ?', questionEn: 'Do you use endpoint protection solutions (EDR/XDR)?',
    opts: [{ v: 0, fr: 'Antivirus basique uniquement', en: 'Basic antivirus only' }, { v: 33, fr: 'EDR sur serveurs critiques', en: 'EDR on critical servers' }, { v: 67, fr: 'EDR sur tous les endpoints', en: 'EDR on all endpoints' }, { v: 100, fr: 'XDR avec threat intelligence', en: 'XDR with threat intelligence' }],
  },
  {
    id: 'infra_9', questionFr: 'Avez-vous déployé une solution SIEM pour la corrélation des événements de sécurité ?', questionEn: 'Have you deployed a SIEM solution for security event correlation?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Logs centralisés sans corrélation', en: 'Centralized logs without correlation' }, { v: 67, fr: 'SIEM avec règles basiques', en: 'SIEM with basic rules' }, { v: 100, fr: 'SIEM avancé avec IA et threat hunting', en: 'Advanced SIEM with AI and threat hunting' }],
  },
  {
    id: 'infra_10', questionFr: 'Votre infrastructure cloud est-elle sécurisée selon les bonnes pratiques (CASB, CSPM) ?', questionEn: 'Is your cloud infrastructure secured according to best practices (CASB, CSPM)?',
    opts: [{ v: 0, fr: 'Pas de cloud ou non sécurisé', en: 'No cloud or unsecured' }, { v: 33, fr: 'Sécurité cloud basique', en: 'Basic cloud security' }, { v: 67, fr: 'CASB ou CSPM déployé', en: 'CASB or CSPM deployed' }, { v: 100, fr: 'Architecture cloud-native sécurisée complète', en: 'Complete secure cloud-native architecture' }],
  },
];

const policyQuestions = [
  {
    id: 'policy_1', questionFr: 'Disposez-vous d\'une politique de sécurité de l\'information formalisée et approuvée ?', questionEn: 'Do you have a formalized and approved information security policy?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Politique en cours de rédaction', en: 'Policy being drafted' }, { v: 67, fr: 'Politique approuvée mais non communiquée', en: 'Approved but not communicated policy' }, { v: 100, fr: 'Politique complète, communiquée et revue annuellement', en: 'Complete policy, communicated and reviewed annually' }],
  },
  {
    id: 'policy_2', questionFr: 'Avez-vous nommé un responsable de la sécurité des systèmes d\'information (RSSI) ?', questionEn: 'Have you appointed a Chief Information Security Officer (CISO)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Responsabilité partagée sans rôle dédié', en: 'Shared responsibility without dedicated role' }, { v: 67, fr: 'RSSI à temps partiel', en: 'Part-time CISO' }, { v: 100, fr: 'RSSI dédié avec équipe', en: 'Dedicated CISO with team' }],
  },
  {
    id: 'policy_3', questionFr: 'Effectuez-vous des analyses de risques cyber régulières ?', questionEn: 'Do you conduct regular cyber risk assessments?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Analyse ponctuelle il y a plus de 2 ans', en: 'One-time assessment over 2 years ago' }, { v: 67, fr: 'Analyse annuelle', en: 'Annual assessment' }, { v: 100, fr: 'Analyse continue avec mise à jour trimestrielle', en: 'Continuous assessment with quarterly updates' }],
  },
  {
    id: 'policy_4', questionFr: 'Avez-vous une politique de gestion des accès et des identités (IAM) ?', questionEn: 'Do you have an identity and access management (IAM) policy?',
    opts: [{ v: 0, fr: 'Gestion ad hoc', en: 'Ad hoc management' }, { v: 33, fr: 'Politique basique', en: 'Basic policy' }, { v: 67, fr: 'IAM avec principe du moindre privilège', en: 'IAM with least privilege principle' }, { v: 100, fr: 'IAM avancé avec PAM et revue trimestrielle', en: 'Advanced IAM with PAM and quarterly review' }],
  },
  {
    id: 'policy_5', questionFr: 'Disposez-vous d\'une politique de classification des données ?', questionEn: 'Do you have a data classification policy?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Classification informelle', en: 'Informal classification' }, { v: 67, fr: 'Classification formelle (Public/Interne/Confidentiel)', en: 'Formal classification (Public/Internal/Confidential)' }, { v: 100, fr: 'Classification avec DLP et contrôles automatisés', en: 'Classification with DLP and automated controls' }],
  },
  {
    id: 'policy_6', questionFr: 'Avez-vous une politique de gestion des fournisseurs et tiers (supply chain security) ?', questionEn: 'Do you have a vendor and third-party management policy (supply chain security)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Évaluation informelle', en: 'Informal assessment' }, { v: 67, fr: 'Due diligence sécurité pour fournisseurs critiques', en: 'Security due diligence for critical vendors' }, { v: 100, fr: 'Programme complet avec audits réguliers', en: 'Complete program with regular audits' }],
  },
  {
    id: 'policy_7', questionFr: 'Disposez-vous d\'une politique de sécurité pour le télétravail et les appareils mobiles ?', questionEn: 'Do you have a security policy for remote work and mobile devices?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Recommandations informelles', en: 'Informal recommendations' }, { v: 67, fr: 'Politique BYOD avec MDM', en: 'BYOD policy with MDM' }, { v: 100, fr: 'Politique complète avec VPN, MDM et conteneurisation', en: 'Complete policy with VPN, MDM and containerization' }],
  },
  {
    id: 'policy_8', questionFr: 'Avez-vous une politique de gestion des mots de passe conforme aux standards ?', questionEn: 'Do you have a password management policy compliant with standards?',
    opts: [{ v: 0, fr: 'Pas de politique', en: 'No policy' }, { v: 33, fr: 'Politique basique (8 caractères)', en: 'Basic policy (8 characters)' }, { v: 67, fr: 'Politique ANSSI/NIST (12+ caractères, complexité)', en: 'ANSSI/NIST policy (12+ characters, complexity)' }, { v: 100, fr: 'Gestionnaire de mots de passe entreprise + MFA', en: 'Enterprise password manager + MFA' }],
  },
  {
    id: 'policy_9', questionFr: 'Effectuez-vous des audits de sécurité internes ou externes ?', questionEn: 'Do you conduct internal or external security audits?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Audit ponctuel il y a plus de 2 ans', en: 'One-time audit over 2 years ago' }, { v: 67, fr: 'Audit annuel interne', en: 'Annual internal audit' }, { v: 100, fr: 'Audits réguliers internes + externes + pentests', en: 'Regular internal + external audits + pentests' }],
  },
  {
    id: 'policy_10', questionFr: 'Votre organisation dispose-t-elle d\'un budget dédié à la cybersécurité ?', questionEn: 'Does your organization have a dedicated cybersecurity budget?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Budget ad hoc selon besoins', en: 'Ad hoc budget as needed' }, { v: 67, fr: 'Budget annuel défini', en: 'Defined annual budget' }, { v: 100, fr: 'Budget stratégique pluriannuel avec KPIs', en: 'Multi-year strategic budget with KPIs' }],
  },
];

const incidentQuestions = [
  {
    id: 'incident_1', questionFr: 'Disposez-vous d\'un plan de réponse aux incidents de sécurité (PSIR) ?', questionEn: 'Do you have a security incident response plan (SIRP)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Plan informel', en: 'Informal plan' }, { v: 67, fr: 'Plan formalisé mais non testé', en: 'Formalized but untested plan' }, { v: 100, fr: 'Plan testé régulièrement avec exercices', en: 'Regularly tested plan with exercises' }],
  },
  {
    id: 'incident_2', questionFr: 'Avez-vous une équipe de réponse aux incidents (CSIRT/CERT) ?', questionEn: 'Do you have an incident response team (CSIRT/CERT)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Responsabilité partagée sans équipe dédiée', en: 'Shared responsibility without dedicated team' }, { v: 67, fr: 'Équipe interne à temps partiel', en: 'Part-time internal team' }, { v: 100, fr: 'CSIRT dédié 24/7 + SOC externe', en: 'Dedicated 24/7 CSIRT + external SOC' }],
  },
  {
    id: 'incident_3', questionFr: 'Disposez-vous d\'un processus de gestion des incidents documenté ?', questionEn: 'Do you have a documented incident management process?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Processus informel', en: 'Informal process' }, { v: 67, fr: 'Processus documenté (détection, analyse, containment, éradication, recovery)', en: 'Documented process (detection, analysis, containment, eradication, recovery)' }, { v: 100, fr: 'Processus mature avec métriques et amélioration continue', en: 'Mature process with metrics and continuous improvement' }],
  },
  {
    id: 'incident_4', questionFr: 'Effectuez-vous des exercices de simulation d\'incidents (tabletop, red team) ?', questionEn: 'Do you conduct incident simulation exercises (tabletop, red team)?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Exercice ponctuel il y a plus de 2 ans', en: 'One-time exercise over 2 years ago' }, { v: 67, fr: 'Exercices annuels', en: 'Annual exercises' }, { v: 100, fr: 'Exercices trimestriels avec scénarios variés', en: 'Quarterly exercises with varied scenarios' }],
  },
  {
    id: 'incident_5', questionFr: 'Avez-vous des procédures de notification des incidents (clients, régulateurs, CNIL) ?', questionEn: 'Do you have incident notification procedures (clients, regulators, CNIL)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Procédures informelles', en: 'Informal procedures' }, { v: 67, fr: 'Procédures documentées', en: 'Documented procedures' }, { v: 100, fr: 'Procédures testées avec délais conformes RGPD (72h)', en: 'Tested procedures with GDPR-compliant timelines (72h)' }],
  },
  {
    id: 'incident_6', questionFr: 'Conservez-vous des logs et traces d\'audit pour l\'investigation forensique ?', questionEn: 'Do you retain logs and audit trails for forensic investigation?',
    opts: [{ v: 0, fr: 'Logs non conservés', en: 'Logs not retained' }, { v: 33, fr: 'Logs conservés partiellement', en: 'Partially retained logs' }, { v: 67, fr: 'Logs centralisés avec rétention 6-12 mois', en: 'Centralized logs with 6-12 month retention' }, { v: 100, fr: 'Logs complets avec chaîne de custody et rétention conforme', en: 'Complete logs with chain of custody and compliant retention' }],
  },
  {
    id: 'incident_7', questionFr: 'Disposez-vous d\'outils de forensique et d\'analyse post-incident ?', questionEn: 'Do you have forensic and post-incident analysis tools?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Outils basiques', en: 'Basic tools' }, { v: 67, fr: 'Suite forensique professionnelle', en: 'Professional forensic suite' }, { v: 100, fr: 'Plateforme complète avec threat intelligence', en: 'Complete platform with threat intelligence' }],
  },
  {
    id: 'incident_8', questionFr: 'Effectuez-vous des analyses post-mortem après chaque incident ?', questionEn: 'Do you conduct post-mortem analyses after each incident?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Analyse informelle', en: 'Informal analysis' }, { v: 67, fr: 'Rapport post-mortem systématique', en: 'Systematic post-mortem report' }, { v: 100, fr: 'Analyse approfondie avec plan d\'amélioration et suivi', en: 'In-depth analysis with improvement plan and follow-up' }],
  },
  {
    id: 'incident_9', questionFr: 'Avez-vous une assurance cyber risques ?', questionEn: 'Do you have cyber risk insurance?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'En cours d\'évaluation', en: 'Under evaluation' }, { v: 67, fr: 'Assurance basique', en: 'Basic insurance' }, { v: 100, fr: 'Assurance complète avec couverture ransomware et assistance', en: 'Complete insurance with ransomware coverage and assistance' }],
  },
  {
    id: 'incident_10', questionFr: 'Avez-vous des contrats avec des prestataires de réponse aux incidents (IR retainer) ?', questionEn: 'Do you have contracts with incident response providers (IR retainer)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Contacts informels', en: 'Informal contacts' }, { v: 67, fr: 'Contrat avec un prestataire', en: 'Contract with one provider' }, { v: 100, fr: 'Contrats multiples avec SLA garantis', en: 'Multiple contracts with guaranteed SLAs' }],
  },
];

const complianceQuestions = [
  {
    id: 'compliance_1', questionFr: 'Êtes-vous conforme au RGPD (Règlement Général sur la Protection des Données) ?', questionEn: 'Are you compliant with GDPR (General Data Protection Regulation)?',
    opts: [{ v: 0, fr: 'Non conforme', en: 'Non-compliant' }, { v: 33, fr: 'Conformité partielle', en: 'Partial compliance' }, { v: 67, fr: 'Conforme avec DPO nommé', en: 'Compliant with appointed DPO' }, { v: 100, fr: 'Conformité complète avec audits réguliers', en: 'Full compliance with regular audits' }],
  },
  {
    id: 'compliance_2', questionFr: 'Êtes-vous certifié ISO 27001 (Système de Management de la Sécurité de l\'Information) ?', questionEn: 'Are you ISO 27001 certified (Information Security Management System)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'En cours de certification', en: 'Certification in progress' }, { v: 67, fr: 'Certifié ISO 27001', en: 'ISO 27001 certified' }, { v: 100, fr: 'Certifié ISO 27001 + ISO 27017/27018 (cloud)', en: 'ISO 27001 + ISO 27017/27018 (cloud) certified' }],
  },
  {
    id: 'compliance_3', questionFr: 'Respectez-vous les directives de la BCEAO/COBAC en matière de cybersécurité bancaire ?', questionEn: 'Do you comply with BCEAO/COBAC directives on banking cybersecurity?',
    opts: [{ v: 0, fr: 'Non applicable ou non conforme', en: 'Not applicable or non-compliant' }, { v: 33, fr: 'Conformité partielle', en: 'Partial compliance' }, { v: 67, fr: 'Conforme aux directives principales', en: 'Compliant with main directives' }, { v: 100, fr: 'Conformité complète avec reporting régulier', en: 'Full compliance with regular reporting' }],
  },
  {
    id: 'compliance_4', questionFr: 'Êtes-vous conforme à la norme PCI DSS (si vous traitez des paiements par carte) ?', questionEn: 'Are you PCI DSS compliant (if you process card payments)?',
    opts: [{ v: 0, fr: 'Non applicable ou non conforme', en: 'Not applicable or non-compliant' }, { v: 33, fr: 'Conformité partielle', en: 'Partial compliance' }, { v: 67, fr: 'Conforme PCI DSS', en: 'PCI DSS compliant' }, { v: 100, fr: 'Conforme avec audits annuels et scans trimestriels', en: 'Compliant with annual audits and quarterly scans' }],
  },
  {
    id: 'compliance_5', questionFr: 'Disposez-vous d\'un registre des traitements de données personnelles ?', questionEn: 'Do you have a register of personal data processing activities?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Registre incomplet', en: 'Incomplete register' }, { v: 67, fr: 'Registre complet', en: 'Complete register' }, { v: 100, fr: 'Registre avec analyses d\'impact (PIA) pour traitements à risque', en: 'Register with impact assessments (PIA) for high-risk processing' }],
  },
  {
    id: 'compliance_6', questionFr: 'Avez-vous mis en place des mesures de protection contre le blanchiment d\'argent (LBC/FT) ?', questionEn: 'Have you implemented anti-money laundering measures (AML/CFT)?',
    opts: [{ v: 0, fr: 'Non applicable ou non conforme', en: 'Not applicable or non-compliant' }, { v: 33, fr: 'Mesures basiques', en: 'Basic measures' }, { v: 67, fr: 'Programme LBC/FT complet', en: 'Complete AML/CFT program' }, { v: 100, fr: 'Programme mature avec KYC renforcé et monitoring', en: 'Mature program with enhanced KYC and monitoring' }],
  },
  {
    id: 'compliance_7', questionFr: 'Effectuez-vous des audits de conformité réglementaire réguliers ?', questionEn: 'Do you conduct regular regulatory compliance audits?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Audit ponctuel il y a plus de 2 ans', en: 'One-time audit over 2 years ago' }, { v: 67, fr: 'Audits annuels', en: 'Annual audits' }, { v: 100, fr: 'Audits réguliers avec suivi des plans d\'action', en: 'Regular audits with action plan follow-up' }],
  },
  {
    id: 'compliance_8', questionFr: 'Disposez-vous de contrats de sous-traitance conformes (DPA, clauses RGPD) ?', questionEn: 'Do you have compliant subcontracting agreements (DPA, GDPR clauses)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Contrats sans clauses spécifiques', en: 'Contracts without specific clauses' }, { v: 67, fr: 'DPA pour sous-traitants principaux', en: 'DPA for main subcontractors' }, { v: 100, fr: 'DPA systématiques avec audits fournisseurs', en: 'Systematic DPA with vendor audits' }],
  },
  {
    id: 'compliance_9', questionFr: 'Avez-vous documenté vos procédures de gestion des droits des personnes (accès, rectification, effacement) ?', questionEn: 'Have you documented your procedures for managing data subject rights (access, rectification, erasure)?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Procédures informelles', en: 'Informal procedures' }, { v: 67, fr: 'Procédures documentées', en: 'Documented procedures' }, { v: 100, fr: 'Procédures automatisées avec portail self-service', en: 'Automated procedures with self-service portal' }],
  },
  {
    id: 'compliance_10', questionFr: 'Effectuez-vous une veille réglementaire en cybersécurité et protection des données ?', questionEn: 'Do you conduct regulatory monitoring in cybersecurity and data protection?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Veille informelle', en: 'Informal monitoring' }, { v: 67, fr: 'Veille structurée', en: 'Structured monitoring' }, { v: 100, fr: 'Veille automatisée avec comité de conformité', en: 'Automated monitoring with compliance committee' }],
  },
];

const awarenessQuestions = [
  {
    id: 'awareness_1', questionFr: 'Organisez-vous des formations de sensibilisation à la cybersécurité pour tous les employés ?', questionEn: 'Do you organize cybersecurity awareness training for all employees?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Formation ponctuelle à l\'embauche', en: 'One-time training at onboarding' }, { v: 67, fr: 'Formation annuelle obligatoire', en: 'Mandatory annual training' }, { v: 100, fr: 'Programme continu avec modules interactifs et tests', en: 'Continuous program with interactive modules and tests' }],
  },
  {
    id: 'awareness_2', questionFr: 'Effectuez-vous des campagnes de simulation de phishing ?', questionEn: 'Do you conduct phishing simulation campaigns?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Campagne ponctuelle', en: 'One-time campaign' }, { v: 67, fr: 'Campagnes trimestrielles', en: 'Quarterly campaigns' }, { v: 100, fr: 'Campagnes mensuelles avec formation ciblée', en: 'Monthly campaigns with targeted training' }],
  },
  {
    id: 'awareness_3', questionFr: 'Disposez-vous d\'une charte informatique signée par tous les employés ?', questionEn: 'Do you have an IT charter signed by all employees?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Charte existante mais non signée', en: 'Existing but unsigned charter' }, { v: 67, fr: 'Charte signée à l\'embauche', en: 'Charter signed at onboarding' }, { v: 100, fr: 'Charte revue annuellement avec signature électronique', en: 'Charter reviewed annually with electronic signature' }],
  },
  {
    id: 'awareness_4', questionFr: 'Avez-vous des ambassadeurs sécurité dans chaque département ?', questionEn: 'Do you have security ambassadors in each department?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Responsables informels', en: 'Informal contacts' }, { v: 67, fr: 'Ambassadeurs nommés', en: 'Appointed ambassadors' }, { v: 100, fr: 'Réseau d\'ambassadeurs avec formation dédiée', en: 'Ambassador network with dedicated training' }],
  },
  {
    id: 'awareness_5', questionFr: 'Communiquez-vous régulièrement sur les menaces et bonnes pratiques de sécurité ?', questionEn: 'Do you regularly communicate about threats and security best practices?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Communication ad hoc', en: 'Ad hoc communication' }, { v: 67, fr: 'Newsletter mensuelle', en: 'Monthly newsletter' }, { v: 100, fr: 'Communication multi-canal (email, intranet, affichage, vidéos)', en: 'Multi-channel communication (email, intranet, posters, videos)' }],
  },
  {
    id: 'awareness_6', questionFr: 'Organisez-vous des événements dédiés à la cybersécurité (Cybersecurity Awareness Month) ?', questionEn: 'Do you organize cybersecurity-dedicated events (Cybersecurity Awareness Month)?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Événement ponctuel', en: 'One-time event' }, { v: 67, fr: 'Événement annuel', en: 'Annual event' }, { v: 100, fr: 'Programme annuel avec événements trimestriels', en: 'Annual program with quarterly events' }],
  },
  {
    id: 'awareness_7', questionFr: 'Mesurez-vous le niveau de maturité sécurité de vos employés ?', questionEn: 'Do you measure the security maturity level of your employees?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Évaluation informelle', en: 'Informal assessment' }, { v: 67, fr: 'Tests de connaissances annuels', en: 'Annual knowledge tests' }, { v: 100, fr: 'Évaluation continue avec KPIs et tableaux de bord', en: 'Continuous assessment with KPIs and dashboards' }],
  },
  {
    id: 'awareness_8', questionFr: 'Intégrez-vous la sécurité dans le processus d\'onboarding des nouveaux employés ?', questionEn: 'Do you integrate security into the onboarding process for new employees?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Mention informelle', en: 'Informal mention' }, { v: 67, fr: 'Module sécurité obligatoire', en: 'Mandatory security module' }, { v: 100, fr: 'Parcours complet avec certification', en: 'Complete path with certification' }],
  },
  {
    id: 'awareness_9', questionFr: 'Avez-vous un processus de signalement des incidents de sécurité accessible à tous ?', questionEn: 'Do you have a security incident reporting process accessible to all?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Email générique', en: 'Generic email' }, { v: 67, fr: 'Formulaire dédié', en: 'Dedicated form' }, { v: 100, fr: 'Plateforme avec suivi et feedback automatique', en: 'Platform with tracking and automatic feedback' }],
  },
  {
    id: 'awareness_10', questionFr: 'La cybersécurité est-elle intégrée dans la culture d\'entreprise et les valeurs ?', questionEn: 'Is cybersecurity integrated into company culture and values?',
    opts: [{ v: 0, fr: 'Non', en: 'No' }, { v: 33, fr: 'Mentionnée occasionnellement', en: 'Occasionally mentioned' }, { v: 67, fr: 'Valeur affichée', en: 'Stated value' }, { v: 100, fr: 'Culture sécurité forte avec reconnaissance et incentives', en: 'Strong security culture with recognition and incentives' }],
  },
];

function mapQuestions(qs: typeof infraQuestions, axisId: string) {
  return qs.map((q) => ({
    id: q.id,
    axisId,
    questionFr: q.questionFr,
    questionEn: q.questionEn,
    options: q.opts.map((o) => ({ value: o.v, labelFr: o.fr, labelEn: o.en })),
  }));
}

export const evaluationCybersecuriteConfig: DiagnosticToolConfig = {
  toolId: 'evaluation-cybersecurite',
  toolNameFr: 'Évaluation Cybersécurité Institutionnelle',
  toolNameEn: 'Institutional Cybersecurity Assessment',
  toolSubtitleFr: 'Évaluez votre posture de cybersécurité en 50 questions sur 5 axes : Infrastructure, Politiques, Réponse aux Incidents, Conformité et Sensibilisation.',
  toolSubtitleEn: 'Assess your cybersecurity posture in 50 questions across 5 axes: Infrastructure, Policies, Incident Response, Compliance and Awareness.',

  seoTitleFr: 'Évaluation Cybersécurité Institutionnelle | KHEPRA EXPERTS',
  seoTitleEn: 'Institutional Cybersecurity Assessment | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez votre posture de cybersécurité en 50 questions. Obtenez un diagnostic personnalisé et des recommandations d\'experts.',
  seoDescriptionEn: 'Evaluate your security posture in 50 questions. Get a personalized diagnosis and expert recommendations.',
  seoKeywordsFr: 'évaluation cybersécurité, audit sécurité, diagnostic cybersécurité, conformité sécurité, ISO 27001, RGPD',
  seoKeywordsEn: 'cybersecurity assessment, security audit, cybersecurity diagnosis, security compliance, ISO 27001, GDPR',
  canonicalPath: '/tools/evaluation-cybersecurite',

  axes: [
    {
      id: 'infrastructure',
      titleFr: 'Infrastructure & Architecture',
      titleEn: 'Infrastructure & Architecture',
      descriptionFr: 'Réseau, pare-feu, chiffrement, MFA, sauvegardes, EDR, SIEM, cloud',
      descriptionEn: 'Network, firewalls, encryption, MFA, backups, EDR, SIEM, cloud',
      icon: 'ri-server-line',
      color: '#dc2626',
      questions: mapQuestions(infraQuestions, 'infrastructure'),
    },
    {
      id: 'politiques',
      titleFr: 'Politiques & Gouvernance',
      titleEn: 'Policies & Governance',
      descriptionFr: 'PSSI, RSSI, analyses de risques, IAM, classification, fournisseurs',
      descriptionEn: 'Security policy, CISO, risk assessments, IAM, classification, vendors',
      icon: 'ri-file-shield-line',
      color: '#d97706',
      questions: mapQuestions(policyQuestions, 'politiques'),
    },
    {
      id: 'reponse-incidents',
      titleFr: 'Réponse aux Incidents',
      titleEn: 'Incident Response',
      descriptionFr: 'PSIR, CSIRT, processus, simulations, notification, forensique',
      descriptionEn: 'SIRP, CSIRT, process, simulations, notification, forensic',
      icon: 'ri-alarm-warning-line',
      color: '#0e7490',
      questions: mapQuestions(incidentQuestions, 'reponse-incidents'),
    },
    {
      id: 'conformite',
      titleFr: 'Conformité Réglementaire',
      titleEn: 'Regulatory Compliance',
      descriptionFr: 'RGPD, ISO 27001, BCEAO/COBAC, PCI DSS, DPA, veille réglementaire',
      descriptionEn: 'GDPR, ISO 27001, BCEAO/COBAC, PCI DSS, DPA, regulatory monitoring',
      icon: 'ri-checkbox-circle-line',
      color: '#7c3aed',
      questions: mapQuestions(complianceQuestions, 'conformite'),
    },
    {
      id: 'sensibilisation',
      titleFr: 'Sensibilisation & Culture',
      titleEn: 'Awareness & Culture',
      descriptionFr: 'Formation, phishing, charte IT, ambassadeurs, communication, culture sécurité',
      descriptionEn: 'Training, phishing, IT charter, ambassadors, communication, security culture',
      icon: 'ri-user-star-line',
      color: '#059669',
      questions: mapQuestions(awarenessQuestions, 'sensibilisation'),
    },
  ],

  howToNameFr: 'Évaluation Cybersécurité KHEPRA™',
  howToNameEn: 'Cybersecurity Assessment KHEPRA™',
  howToDescriptionFr: 'Évaluez votre posture de cybersécurité en 50 questions sur 5 catégories. Score de maturité et recommandations d\'experts.',
  howToDescriptionEn: 'Evaluate your security posture in 50 questions across 5 categories. Maturity score and expert recommendations.',
  howToTotalTime: '18M',
  howToSteps: [
    { name: 'Infrastructure & Architecture', text: 'Évaluez la segmentation réseau, IDS/IPS, NGFW, chiffrement, MFA, sauvegardes, patch management, EDR/XDR, SIEM et sécurité cloud.' },
    { name: 'Politiques & Gouvernance', text: 'Examinez la PSSI, la nomination RSSI, les analyses de risques, l\'IAM, la classification des données, la gestion des fournisseurs et le budget sécurité.' },
    { name: 'Réponse aux Incidents', text: 'Évaluez le plan de réponse, CSIRT/CERT, processus de gestion, exercices de simulation, procédures de notification et capacités forensiques.' },
    { name: 'Conformité Réglementaire', text: 'Vérifiez la conformité RGPD, certification ISO 27001, directives BCEAO/COBAC, PCI DSS, registre des traitements et mesures LBC/FT.' },
    { name: 'Sensibilisation & Culture', text: 'Évaluez les formations, simulations de phishing, charte informatique, ambassadeurs sécurité, communication interne et maturité de la culture sécurité.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 67) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 33) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 67) return 'ri-check-line';
    if (value === 33) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 67) return 'text-sky-600';
    if (value === 33) return 'text-accent-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['Cybersecurite', 'SecuriteInformatique', 'CyberSecurityAfrica', 'ISO27001'],

  showRadarChart: false,

  badgeIcon: 'ri-shield-check-line',
  badgeTextFr: '5 axes · 50 questions · 18 min',
  badgeTextEn: '5 axes · 50 questions · 18 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement cybersécurité ?',
    titleEn: 'Need cybersecurity support?',
    descriptionFr: 'Nos experts en cybersécurité peuvent vous aider à renforcer votre posture de sécurité avec un audit complet, des tests d\'intrusion et un plan de remédiation.',
    descriptionEn: 'Our cybersecurity experts can help you strengthen your security posture with a complete audit, penetration testing and a remediation plan.',
    ctaFr: 'Planifier un diagnostic',
    ctaEn: 'Schedule a diagnosis',
    ctaLink: '/contact',
  },
};