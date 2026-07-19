export type WebinarStatus = 'upcoming' | 'replay';

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  speaker: string;
  status: WebinarStatus;
  image: string;
  category: string;
}

export const webinars: Webinar[] = [
  {
    id: 'webinar-pre-inspection-bceao-2026',
    title: "Pré-Inspection BCEAO 2026 : Les 10 Points Critiques qui Font Échouer 70% des Banques",
    description: "Webinaire exclusif décryptant les résultats des 200 dernières inspections BCEAO. Analyse des 10 écarts les plus fréquents, méthodologie de remédiation accélérée et plan d'action 90 jours. Témoignage d'un ancien inspecteur de la Commission Bancaire.",
    date: '25 Juin 2026',
    duration: '1h30',
    speaker: 'Dr. Koffi Mensah — Associé, Régulation Financière',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20BCEAO%20pre%20inspection%20banking%20compliance%20dark%20elegant%20background%20with%20deloitte%20green%20accent%20financial%20regulatory%20authority%20symbols%20presentation%20screen%20and%20speaker%20portrait%20premium%20consulting%20webcast%20design%20with%20sleek%20modern%20aesthetic&width=800&height=450&seq=web001-pillar&orientation=landscape',
    category: 'Conformité & Réglementation'
  },
  {
    id: 'webinar-lcbft-uemoa-cemac',
    title: "LBC/FT UEMOA-CEMAC : Mise en Conformité Complète en 120 Jours — Guide Pratique",
    description: "Workshop pratique sur la mise en conformité LBC/FT accélérée. Démonstration de la checklist 127 points KHEPRA, analyse des dernières évaluations GIABA/GABAC, cas pratique de remédiation et outil d'auto-diagnostic interactif.",
    date: '09 Juillet 2026',
    duration: '2h00',
    speaker: 'Mme Aminata Diallo — Senior Manager, Conformité Réglementaire',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20AML%20CFT%20compliance%20UEMOA%20CEMAC%20dark%20sophisticated%20background%20with%20deloitte%20green%20compliance%20checklist%20and%20regulatory%20shield%20symbols%20speaker%20presentation%20screen%20premium%20consulting%20webcast%20design%20with%20authoritative%20clean%20layout&width=800&height=450&seq=web002-pillar&orientation=landscape',
    category: 'Conformité & Réglementation'
  },
  {
    id: 'webinar-agrement-sfd-strategie',
    title: "Agrément SFD BCEAO : Stratégie Gagnante et Dossier Type — Retour d'Expérience 15 Dossiers",
    description: "Webinaire basé sur l'expérience de 15 dossiers d'agrément SFD traités avec succès. Déroulé complet de la procédure, architecture du dossier type, pièges à éviter et facteurs clés de succès identifiés par les régulateurs.",
    date: '18 Août 2026',
    duration: '1h45',
    speaker: 'M. Jean-Baptiste Kouassi — Directeur, Microfinance & Inclusion Financière',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20SFD%20microfinance%20licensing%20BCEAO%20procedure%20dark%20elegant%20background%20with%20deloitte%20green%20institutional%20approval%20symbols%20and%20document%20dossier%20visualization%20speaker%20portrait%20premium%20consulting%20webcast%20with%20strategic%20advisory%20aesthetic&width=800&height=450&seq=web003-pillar&orientation=landscape',
    category: 'Conformité & Réglementation'
  },
  {
    id: 'webinar-icaap-ilaap-bale',
    title: "ICAAP/ILAAP sous Bâle II/III : Implémentation Pratique pour Banques UEMOA",
    description: "Webinaire technique sur l'implémentation des processus ICAAP (Internal Capital Adequacy Assessment Process) et ILAAP (Internal Liquidity Adequacy Assessment Process). Méthodologie, modèles de calcul, stress tests et reporting au Conseil.",
    date: '22 Septembre 2026',
    duration: '2h00',
    speaker: 'Dr. Koffi Mensah — Associé, Régulation Financière',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20ICAAP%20ILAAP%20Basel%20banking%20capital%20adequacy%20dark%20technical%20background%20with%20deloitte%20green%20financial%20risk%20modeling%20charts%20and%20stress%20test%20visualization%20speaker%20presentation%20premium%20consulting%20webcast%20design%20with%20quantitative%20finance%20aesthetic&width=800&height=450&seq=web004-pillar&orientation=landscape',
    category: 'Conformité & Réglementation'
  },
  {
    id: 'webinar-beps-action13-afrique',
    title: "BEPS Action 13 en Afrique : Documentation Prix de Transfert — Cas Pratiques et Solutions",
    description: "Workshop interactif sur la documentation prix de transfert BEPS Action 13 appliquée au contexte UEMOA/CEMAC. Analyse fonctionnelle en direct, sélection de comparables africains, démonstration de l'outil KHEPRA Benchmarking.",
    date: '15 Juillet 2026',
    duration: '1h30',
    speaker: 'M. Philippe Tano — Associé, Prix de Transfert & Fiscalité Internationale',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20BEPS%20Action%2013%20transfer%20pricing%20documentation%20Africa%20dark%20sophisticated%20background%20with%20deloitte%20green%20international%20taxation%20diagrams%20global%20value%20chain%20visualization%20speaker%20portrait%20premium%20consulting%20webcast%20with%20cross%20border%20finance%20aesthetic&width=800&height=450&seq=web005-pillar&orientation=landscape',
    category: 'Finance & Investissement'
  },
  {
    id: 'webinar-controle-fiscal-defense',
    title: "Contrôle Fiscal Prix de Transfert : Comment Défendre son Dossier Face à l'Administration",
    description: "Stratégies de défense en contrôle fiscal prix de transfert. Analyse des arguments fiscaux gagnants, préparation aux entretiens, gestion de la charge de la preuve et négociation des redressements. Témoignage d'un contribuable ayant gagné son contentieux.",
    date: '05 Août 2026',
    duration: '1h45',
    speaker: 'M. Philippe Tano — Associé, Prix de Transfert & Fiscalité Internationale',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20tax%20audit%20defense%20transfer%20pricing%20strategy%20dark%20elegant%20background%20with%20deloitte%20green%20legal%20scales%20and%20negotiation%20symbols%20speaker%20presentation%20screen%20premium%20consulting%20webcast%20design%20with%20confident%20authoritative%20aesthetic&width=800&height=450&seq=web006-pillar&orientation=landscape',
    category: 'Finance & Investissement'
  },
  {
    id: 'webinar-masterfile-local-file',
    title: "Master File & Local File : Rédaction Conforme en 4 Semaines — Méthodologie Accélérée",
    description: "Formation pratique à la rédaction de la documentation prix de transfert. Templates, listes de données, calendrier de production et revue qualité. Démonstration de l'outil KHEPRA Master File Generator.",
    date: '02 Septembre 2026',
    duration: '2h00',
    speaker: 'Mme Fatoumata Bamba — Senior Manager, Prix de Transfert',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20transfer%20pricing%20Master%20File%20Local%20File%20documentation%20guide%20dark%20sophisticated%20background%20with%20deloitte%20green%20structured%20document%20templates%20and%20compliance%20framework%20visualization%20speaker%20portrait%20premium%20consulting%20webcast%20design%20with%20organized%20precision%20aesthetic&width=800&height=450&seq=web007-pillar&orientation=landscape',
    category: 'Finance & Investissement'
  },
  {
    id: 'webinar-fiscalite-internationale-groupes',
    title: "Fiscalité Internationale des Groupes Africains : Conventions Fiscales, Retenues à la Source et Optimisation",
    description: "Panorama des conventions fiscales applicables en Afrique francophone, analyse des clauses de non-discrimination, gestion des retenues à la source sur dividendes/intérêts/redevances et stratégies d'optimisation fiscale conformes.",
    date: '14 Octobre 2026',
    duration: '1h30',
    speaker: 'M. Philippe Tano — Associé, Prix de Transfert & Fiscalité Internationale',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20international%20taxation%20African%20corporate%20groups%20dark%20elegant%20background%20with%20deloitte%20green%20global%20tax%20treaty%20network%20visualization%20and%20cross%20border%20finance%20diagrams%20speaker%20portrait%20premium%20consulting%20webcast%20with%20multinational%20strategic%20aesthetic&width=800&height=450&seq=web008-pillar&orientation=landscape',
    category: 'Finance & Investissement'
  },
  {
    id: 'webinar-cartographie-risques-entreprise',
    title: "Cartographie des Risques : De la Théorie à la Pratique — Atelier Interactif COSO ERM",
    description: "Atelier pratique de cartographie des risques. Les participants construiront leur propre heat map en direct. Méthodologie COSO ERM 2017, identification des risques top-down/bottom-up, évaluation probabilité × impact et définition de l'appétit au risque.",
    date: '08 Juillet 2026',
    duration: '2h00',
    speaker: 'Mme Célestine Akakpo — Associée, Gouvernance, Risques & Conformité',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20enterprise%20risk%20mapping%20COSO%20ERM%20interactive%20workshop%20dark%20elegant%20background%20with%20deloitte%20green%20heat%20map%20visualization%20and%20risk%20matrix%20diagrams%20speaker%20presentation%20screen%20premium%20consulting%20webcast%20design%20with%20analytical%20institutional%20aesthetic&width=800&height=450&seq=web009-pillar&orientation=landscape',
    category: 'Gouvernance & Management'
  },
  {
    id: 'webinar-gouvernance-groupes-familiaux',
    title: "Gouvernance des Groupes Familiaux : Structurer sa Succession sans Détruire l'Entreprise",
    description: "Webinaire dédié aux dirigeants d'entreprises familiales. Architecture de gouvernance, conseil de famille, charte familiale, plan de relève générationnelle et transition dirigeant. Témoignage d'un family office ayant réussi sa transmission sur 3 générations.",
    date: '20 Août 2026',
    duration: '1h30',
    speaker: 'Mme Célestine Akakpo — Associée, Gouvernance, Risques & Conformité',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20African%20family%20business%20governance%20and%20succession%20planning%20dark%20warm%20background%20with%20deloitte%20green%20family%20tree%20and%20institutional%20structure%20symbols%20speaker%20portrait%20premium%20consulting%20webcast%20design%20with%20generational%20legacy%20aesthetic&width=800&height=450&seq=web010-pillar&orientation=landscape',
    category: 'Gouvernance & Management'
  },
  {
    id: 'webinar-audit-interne-coso-iia',
    title: "Audit Interne : Mettre en Place une Fonction Conforme au COSO 2023 et aux Normes IIA",
    description: "Guide complet de création ou de renforcement de la fonction d'audit interne. Charte d'audit, cartographie des risques audités, plan d'audit annuel, programmes de travail, techniques d'investigation et reporting au Comité d'Audit.",
    date: '16 Septembre 2026',
    duration: '2h00',
    speaker: 'Mme Célestine Akakpo — Associée, Gouvernance, Risques & Conformité',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20internal%20audit%20function%20COSO%202023%20IIA%20standards%20implementation%20dark%20elegant%20background%20with%20deloitte%20green%20audit%20trail%20symbols%20and%20control%20framework%20diagrams%20speaker%20portrait%20premium%20consulting%20webcast%20design%20with%20systematic%20rigorous%20aesthetic&width=800&height=450&seq=web011-pillar&orientation=landscape',
    category: 'Gouvernance & Management'
  },
  {
    id: 'webinar-protection-donnees-malabo',
    title: "Protection des Données Personnelles en Afrique : Convention de Malabo, RGPD et Conformité Pratique",
    description: "Panorama complet des obligations de protection des données en Afrique francophone. Convention de Malabo (UA), Règlement UEMOA, lois nationales et RGPD. Méthodologie de mise en conformité, registre de traitement, AIPD et rôle du DPO.",
    date: '28 Octobre 2026',
    duration: '1h45',
    speaker: 'Mme Aminata Diallo — Senior Manager, Conformité Réglementaire',
    status: 'upcoming',
    image: 'https://readdy.ai/api/search-image?query=professional%20webinar%20thumbnail%20data%20protection%20privacy%20Africa%20Malabo%20Convention%20GDPR%20compliance%20dark%20sophisticated%20background%20with%20deloitte%20green%20data%20security%20shield%20and%20privacy%20framework%20symbols%20speaker%20portrait%20premium%20consulting%20webcast%20design%20with%20digital%20trust%20aesthetic&width=800&height=450&seq=web012-pillar&orientation=landscape',
    category: 'Gouvernance & Management'
  }
];



