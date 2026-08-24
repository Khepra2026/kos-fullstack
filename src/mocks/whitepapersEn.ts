export interface Whitepaper {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  year: string;
  image: string;
}

export const whitepapersEn: Whitepaper[] = [
  {
    id: 'wp-inclusion-financiere-afrique',
    title: 'Financial Inclusion in West Africa: State of Play and Outlook 2025 — UEMOA and CEMAC',
    description: 'Institutional analysis of financial inclusion dynamics in the UEMOA (BCEAO) and CEMAC (BEAC/COBAC) zones. Comparative banking penetration rates, role of mobile money, DFS/MFI regulatory frameworks, structural barriers and strategic recommendations for decision-makers and regulators. Sources: BCEAO (bceao.int), BEAC (beac.int), COBAC (cobac.org).',
    category: 'Finance & Inclusion',
    pages: 48,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20financial%20inclusion%20in%20West%20Africa%2C%20elegant%20dark%20navy%20and%20gold%20design%20with%20abstract%20map%20of%20UEMOA%20region%2C%20charts%20showing%20banking%20penetration%20rates%2C%20premium%20consulting%20firm%20publication%20aesthetic%2C%20clean%20minimalist%20layout%20with%20sophisticated%20typography&width=600&height=800&seq=wp001&orientation=portrait'
  },
  {
    id: 'wp-gouvernance-institutions-microfinance',
    title: 'DFS/MFI Governance: Institutional Reference Framework UEMOA (BCEAO) and CEMAC (COBAC)',
    description: 'Institutional reference framework for strengthening DFS (UEMOA) and MFI (CEMAC) governance: BCEAO obligations (Circular 2021), COBAC EMF-2017 Regulation, internal control, ALM risk management, comparative prudential ratios and regulatory compliance. Sources: BCEAO (bceao.int), COBAC (cobac.org).',
    category: 'Governance',
    pages: 56,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20microfinance%20governance%20best%20practices%2C%20sophisticated%20dark%20blue%20and%20gold%20design%20with%20abstract%20governance%20framework%20diagram%2C%20premium%20African%20consulting%20publication%2C%20clean%20corporate%20layout%20with%20elegant%20typography%20and%20subtle%20geometric%20patterns&width=600&height=800&seq=wp002&orientation=portrait'
  },
  {
    id: 'wp-transformation-digitale-banques',
    title: 'Digital Transformation of African Banks: Strategic Roadmap — BCEAO/COBAC Framework',
    description: 'Strategic guide for African banking executives: IS architecture compliant with BCEAO (UEMOA) and COBAC (CEMAC) requirements, ALM module, open banking, cybersecurity and change management. Sources: BCEAO (bceao.int), COBAC (cobac.org), BEAC (beac.int).',
    category: 'Digital Transformation',
    pages: 62,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20digital%20transformation%20of%20African%20banks%2C%20modern%20dark%20background%20with%20digital%20network%20patterns%20and%20gold%20accents%2C%20fintech%20and%20banking%20technology%20theme%2C%20premium%20consulting%20firm%20publication%20design%2C%20sophisticated%20minimalist%20layout&width=600&height=800&seq=wp003&orientation=portrait'
  },
  {
    id: 'wp-financement-pme-uemoa',
    title: 'SME Financing in UEMOA and CEMAC Zones: Barriers, Mechanisms and Solutions',
    description: 'Institutional study on SME access to finance in the UEMOA and CEMAC spaces: gap analysis, guarantee mechanisms (FAGACE, GARI, FOGADAC), role of fintechs, OHADA framework and recommendations for financial institutions and public decision-makers. Sources: BCEAO, BEAC, OHADA, BOAD, BDEAC.',
    category: 'Finance & SME',
    pages: 44,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20SME%20financing%20in%20UEMOA%20zone%20West%20Africa%2C%20elegant%20gold%20and%20dark%20navy%20design%20with%20abstract%20economic%20growth%20charts%2C%20premium%20African%20business%20publication%2C%20clean%20sophisticated%20layout%20with%20subtle%20map%20elements%20and%20financial%20data%20visualization&width=600&height=800&seq=wp004&orientation=portrait'
  },
  {
    id: 'wp-cybersecurite-institutions-financieres',
    title: 'Cybersecurity for African Financial Institutions: BCEAO/COBAC Framework and Resilience Strategies',
    description: 'Overview of cyber threats facing African financial institutions and strategic framework compliant with BCEAO (UEMOA) and COBAC (CEMAC) requirements: security governance, incident management, regulatory compliance and business continuity plan. Sources: BCEAO (bceao.int), COBAC (cobac.org).',
    category: 'Cybersecurity',
    pages: 52,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20cybersecurity%20for%20African%20financial%20institutions%2C%20dark%20dramatic%20background%20with%20digital%20security%20shield%20and%20network%20protection%20elements%2C%20gold%20and%20deep%20blue%20color%20scheme%2C%20premium%20consulting%20publication%20design%2C%20sophisticated%20tech%20security%20aesthetic&width=600&height=800&seq=wp005&orientation=portrait'
  },
  {
    id: 'wp-mobile-money-afrique-subsaharienne',
    title: 'Mobile Money in Sub-Saharan Africa: Business Models and UEMOA/CEMAC Regulatory Frameworks',
    description: 'Comparative analysis of mobile money models: BCEAO Instruction No. 008-05-2015 (UEMOA) vs BEAC Regulation (CEMAC), STAR-UEMOA / SYSTAC-SYGMA interoperability, user protection, AML/CFT and regulatory outlook. Sources: BCEAO (bceao.int), BEAC (beac.int), COBAC (cobac.org).',
    category: 'Fintech & Innovation',
    pages: 38,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20mobile%20money%20in%20sub-Saharan%20Africa%2C%20vibrant%20yet%20sophisticated%20design%20with%20smartphone%20and%20digital%20payment%20icons%20on%20dark%20background%2C%20gold%20accents%20with%20African%20continent%20silhouette%2C%20premium%20fintech%20consulting%20publication%2C%20clean%20modern%20layout&width=600&height=800&seq=wp006&orientation=portrait'
  }
];






