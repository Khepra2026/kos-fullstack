export interface Partner {
  name: string;
  role: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  expertise: string[];
  image: string;
  linkedin?: string;
  website?: string;
}

export const partners: Partner[] = [
  {
    name: "Meba K. Consulting LLC",
    role: {
      fr: "Partenaire Conseil en Finance Digitale & Fintech",
      en: "Digital Finance & Fintech Advisory Partner"
    },
    description: {
      fr: "Cabinet de conseil basé aux États-Unis, spécialisé dans la stratégie de plateforme, la collaboration digitale, la concurrence et le risque réglementaire dans les services financiers modernes. Conseil stratégique et opérationnel pour les banques, grandes entreprises technologiques et Fintechs.",
      en: "United States-based advisory firm specializing in platform strategy, digital collaboration, competition and regulatory risk in modern financial services. Strategic and operational advisory for banks, big technology companies and FinTechs."
    },
    expertise: [
      "Fintech & Banques",
      "Stratégie de Plateforme",
      "Risque Réglementaire",
      "Finance Digitale"
    ],
    image: "https://readdy.ai/api/search-image?query=Professional%20financial%20advisory%20consulting%20firm%20office%20in%20United%20States%2C%20modern%20fintech%20and%20banking%20strategy%20workspace%2C%20diverse%20professionals%20in%20business%20attire%20collaborating%20on%20digital%20finance%20projects%2C%20sleek%20contemporary%20corporate%20environment%20with%20screens%20showing%20financial%20data%2C%20clean%20bright%20lighting%2C%20sophisticated%20advisory%20atmosphere&width=400&height=400&seq=partner-meba-k-consulting-llc&orientation=squarish",
    website: "https://mebakconsulting.com/"
  },
  {
    name: "ATINFOCOM GABON",
    role: {
      fr: "Partenaire Technologies & Numérique",
      en: "Technology & Digital Partner"
    },
    description: {
      fr: "Entreprise gabonaise spécialisée dans les technologies de l'information et de la communication. Expert en solutions numériques, infrastructure IT et transformation digitale pour les entreprises et institutions d'Afrique Centrale.",
      en: "Gabonese company specializing in information and communication technologies. Expert in digital solutions, IT infrastructure and digital transformation for companies and institutions in Central Africa."
    },
    expertise: [
      "Technologies de l'Information",
      "Solutions Numériques",
      "Infrastructure IT",
      "Transformation Digitale"
    ],
    image: "https://readdy.ai/api/search-image?query=Modern%20technology%20company%20office%20in%20Gabon%20Central%20Africa%2C%20professional%20IT%20and%20digital%20solutions%20workspace%20with%20servers%20and%20computers%2C%20African%20tech%20professionals%20working%20in%20a%20contemporary%20digital%20environment%2C%20clean%20corporate%20tech%20atmosphere%2C%20bright%20modern%20lighting%2C%20innovative%20digital%20workspace%20with%20African%20professional%20touch&width=400&height=400&seq=partner-atinfocom-gabon&orientation=squarish"
  },
  {
    name: "Me AUGE François Roland",
    role: {
      fr: "Partenaire Juridique & Conformité",
      en: "Legal & Compliance Partner"
    },
    description: {
      fr: "Avocat spécialisé en droit des affaires, droit bancaire et conformité réglementaire. Conseil juridique de référence du consortium pour l'accompagnement des institutions financières, la structuration des opérations et la gestion des risques juridiques en Afrique.",
      en: "Lawyer specializing in business law, banking law and regulatory compliance. The consortium's reference legal counsel for supporting financial institutions, structuring operations and managing legal risks in Africa."
    },
    expertise: [
      "Droit des Affaires",
      "Droit Bancaire & Financier",
      "Conformité Réglementaire",
      "Conseil Juridique"
    ],
    image: "https://readdy.ai/api/search-image?query=Professional%20African%20lawyer%20attorney%20in%20elegant%20formal%20suit%2C%20authoritative%20and%20trustworthy%20demeanor%2C%20sophisticated%20law%20office%20with%20legal%20books%20and%20documents%2C%20warm%20professional%20lighting%2C%20high-end%20legal%20environment%2C%20confident%20legal%20expert%20portrait%2C%20sharp%20professional%20appearance%2C%20executive%20legal%20professional%20in%20his%2040s%2C%20African%20business%20law%20setting&width=400&height=400&seq=partner-auge-francois-roland&orientation=squarish"
  },
  {
    name: "AWITAZI Tchagou Rodolphe",
    role: {
      fr: "Expert ESG",
      en: "ESG Expert"
    },
    description: {
      fr: "Responsable d'élaboration et de mise en œuvre des EIES, des plans de restauration des moyens de subsistance, des mécanismes de gestion des plaintes et de l'application des mesures HQSE sur les chantiers. Participation aux évaluations environnementales des projets de développement, gestion des aires protégées et conservation de la biodiversité. Contribution à la mise en œuvre des conventions sur la biodiversité, la désertification, les changements climatiques, la CITES et les zones humides (Ramsar).",
      en: "Responsible for developing and implementing EIAs, livelihood restoration plans, grievance management mechanisms and HSSE measures on construction sites. Participation in environmental assessments of development projects, protected area management and biodiversity conservation. Contribution to the implementation of conventions on biodiversity, desertification, climate change, CITES and wetlands (Ramsar)."
    },
    expertise: [
      "Évaluations Environnementales (EIES)",
      "Biodiversité & Aires Protégées",
      "Conventions Internationales (CITES, Ramsar)",
      "HQSE & Changements Climatiques"
    ],
    image: "https://readdy.ai/api/search-image?query=Professional%20African%20environmental%20ESG%20expert%20consultant%20in%20business%20attire%2C%20confident%20demeanor%2C%20outdoor%20natural%20environment%20with%20lush%20green%20vegetation%20and%20protected%20area%20landscape%20in%20background%2C%20sustainability%20and%20biodiversity%20conservation%20atmosphere%2C%20professional%20portrait%20with%20nature%20elements%2C%20warm%20natural%20lighting%2C%20expert%20in%20environmental%20impact%20assessment%2C%20African%20conservation%20professional&width=400&height=400&seq=partner-awitazi-rodolphe-esg&orientation=squarish",
    linkedin: "https://www.linkedin.com/in/awitazi-rodolphe-64309a131/"
  }
];





