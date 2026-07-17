type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  downloads?: number;
  downloadUrl?: string;
  coverImage?: string;
  type?: string;
  chapters: string[];
}

export const resourcesEn: Resource[] = [
  {
    id: 'guide-gouvernance-pme',
    title: 'SME Governance Guide — OHADA / AUSC Framework',
    description: 'Institutional guide to implementing governance compliant with the OHADA Uniform Act on Commercial Companies (Revised AUSC 2014): board of directors, statutory audit, internal control and SYSCOHADA compliance. Applicable in the 17 OHADA member states (UEMOA + CEMAC).',
    category: 'Governance',
    downloads: 1247,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=Professional%20business%20governance%20meeting%20with%20diverse%20African%20executives%20around%20modern%20conference%20table%2C%20clean%20minimalist%20office%20interior%20with%20natural%20light%2C%20documents%20and%20laptops%2C%20corporate%20professional%20atmosphere%2C%20deloitte%20green%20accents%20on%20dark%20charcoal%20background%2C%20high%20quality%20business%20photography&width=800&height=600&seq=res1-en-green&orientation=landscape',
    chapters: [
      'OHADA Legal Framework — Revised AUSC 2014',
      'Structuring Your Board of Directors (AUSC Obligations)',
      'Statutory Audit — OHADA Thresholds and Obligations',
      'Internal Control and Task Separation',
      'SYSCOHADA Compliance — Financial Statements and Reporting',
      'Regulated Agreements and Conflicts of Interest (AUSC)',
      '90-Day Action Plan — OHADA Compliance',
    ]
  },
  {
    id: 'checklist-conformite-sfd',
    title: 'DFS/MFI Compliance Checklist — UEMOA (BCEAO) and CEMAC (COBAC)',
    description: 'Comprehensive checklist to ensure regulatory compliance of your DFS (UEMOA) or MFI (CEMAC): BCEAO/COBAC prudential ratios, AML/CFT framework, governance and internal control. Reference: UEMOA Uniform DFS Law, COBAC EMF-2017 Regulation.',
    category: 'Finance',
    downloads: 892,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=Financial%20compliance%20checklist%20document%20on%20modern%20desk%20with%20calculator%20and%20pen%2C%20African%20banking%20regulatory%20papers%2C%20organized%20workspace%2C%20professional%20financial%20setting%2C%20dark%20charcoal%20and%20green%20professional%20background%2C%20top%20view%20flat%20lay%20photography&width=800&height=600&seq=res2-en-green&orientation=landscape',
    chapters: [
      'BCEAO / UEMOA Regulatory Framework — Uniform DFS Law',
      'COBAC / CEMAC Regulatory Framework — EMF-2017 Regulation',
      'Mandatory Prudential Ratios (solvency, liquidity, transformation)',
      'AML/CFT Framework — UEMOA Directive No. 02/2015 and CEMAC Regulation No. 01/03',
      'DFS/MFI Governance and Internal Control',
      'Full Operational Checklist UEMOA / CEMAC',
      'Compliance Implementation Timeline and Sanctions',
    ]
  },
  {
    id: 'guide-levee-fonds-afrique',
    title: 'Fundraising Guide in Africa — OHADA, AMF-UEMOA (UEMOA) and COSUMAF (CEMAC)',
    description: 'Strategies and best practices to succeed in your fundraising in Francophone Africa: OHADA framework (AUSC, SAS), BRVM/AMF-UEMOA (UEMOA) and DSX/COSUMAF (CEMAC) financial markets, SYSCOHADA financial modeling, data room and due diligence.',
    category: 'Entrepreneurship',
    downloads: 1534,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20business%20pitch%20to%20investors%20in%20professional%20setting%20with%20presentation%20screen%2C%20professional%20business%20meeting%2C%20diverse%20team%2C%20deloitte%20green%20and%20dark%20charcoal%20contemporary%20space%2C%20inspiring%20entrepreneurial%20atmosphere&width=800&height=600&seq=res3-en-green&orientation=landscape',
    chapters: [
      'Overview of Investors in Africa (I&P, Cauris, BOAD, ADB, IFC)',
      'OHADA Legal Framework — SAS, Capital Increase, Shareholder Agreements',
      'UEMOA Financial Markets (BRVM/AMF-UEMOA) and CEMAC (DSX/COSUMAF)',
      'Preparing Your File — Data Room and SYSCOHADA Financial Statements',
      'Financial Modeling — DSCR, WCR, Scenarios',
      'Guarantee Mechanisms — FAGACE, GARI (UEMOA) / FOGADAC (CEMAC)',
      'Closing and Managing Investor Relations',
    ]
  },
  {
    id: 'transformation-digitale-pme',
    title: 'Financial Digital Transformation for SMEs — BCEAO/COBAC Framework',
    description: 'Practical roadmap to digitalize the finance of your African SME: SYSCOHADA-compliant ERP, ALM module for MFIs/DFS/EMFs, BCEAO (UEMOA) and COBAC (CEMAC) regulatory compliance, prioritized ROI and practical case studies.',
    category: 'Digital Transformation',
    downloads: 1089,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=Modern%20digital%20transformation%20concept%20with%20African%20business%20professional%20using%20tablet%20and%20cloud%20technology%2C%20futuristic%20office%20environment%2C%20digital%20interface%20elements%2C%20dark%20green%20and%20black%20tech%20aesthetic%2C%20deloitte%20green%20accent%20highlights%2C%20bright%20innovative%20workspace&width=800&height=600&seq=res4-en-green&orientation=landscape',
    chapters: [
      'Financial Digital Maturity Assessment',
      'IS Regulatory Framework — BCEAO (UEMOA) and COBAC (CEMAC)',
      'ERP and SYSCOHADA Chart of Accounts — Configuration and Deployment',
      'ALM Module for MFIs/DFS/EMFs — BCEAO and COBAC Requirements',
      '3-Phase Roadmap — Prioritized ROI',
      'Change Management and Training',
      'Measuring Financial Digital Transformation ROI',
    ]
  },
  {
    id: 'audit-financier-checklist',
    title: 'Financial Audit Checklist — SYSCOHADA and BCEAO/COBAC Standards',
    description: 'Methodological guide to prepare and succeed in your financial audit compliant with Revised SYSCOHADA 2017 (OHADA) and BCEAO (UEMOA) and COBAC (CEMAC) regulator requirements: required documents, control points, provisioning and communication with auditors.',
    category: 'Finance',
    downloads: 756,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=Financial%20audit%20preparation%20with%20organized%20documents%20folders%20and%20financial%20statements%2C%20professional%20accounting%20workspace%2C%20calculator%20and%20reports%2C%20clean%20organized%20desk%2C%20dark%20green%20and%20charcoal%20professional%20background%2C%20business%20photography&width=800&height=600&seq=res5-en-green&orientation=landscape',
    chapters: [
      'Revised SYSCOHADA 2017 Framework — Mandatory Financial Statements',
      'Required Accounting and Financial Documents (balance sheet, P&L, CFS, notes)',
      'Priority Control Points — NPL Provisioning, WCR, Ratios',
      'BCEAO (UEMOA) and COBAC (CEMAC) Requirements for Financial Institutions',
      'Typical SYSCOHADA Audit Timeline',
      'Communication with Auditors and Statutory Auditors',
      'Handling Recommendations and Compliance Plan',
    ]
  },
  {
    id: 'guide-business-plan-afrique',
    title: 'Africa Business Plan Guide — OHADA, SYSCOHADA and Financial Markets',
    description: 'Complete business plan template adapted to the African market: OHADA framework, SYSCOHADA financial projections, sector market analysis, WCR and DSCR modeling, access to UEMOA and CEMAC guarantee mechanisms.',
    category: 'Entrepreneurship',
    downloads: 1621,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=African%20entrepreneur%20working%20on%20business%20plan%20with%20laptop%20and%20documents%2C%20modern%20coworking%20space%2C%20strategic%20planning%20charts%20and%20graphs%2C%20professional%20startup%20environment%2C%20deloitte%20green%20and%20dark%20charcoal%20motivational%20setting%2C%20clean%20contemporary%20workspace&width=800&height=600&seq=res6-en-green&orientation=landscape',
    chapters: [
      'Complete Business Plan Structure — OHADA Compliant',
      'Market Analysis in the African Context (UEMOA / CEMAC)',
      'Business Model and Value Proposition',
      'SYSCOHADA 3-Year Financial Projections (WCR, DSCR, CFS)',
      'Go-to-Market Strategy',
      'Guarantee Mechanisms — FAGACE, GARI (UEMOA) / FOGADAC (CEMAC)',
      'Appendices and Supporting Documents (data room)',
    ]
  },
  {
    id: 'guide-analyse-risque-credit',
    title: 'Credit Risk Analysis Guide — BCEAO (UEMOA) and COBAC (CEMAC)',
    description: 'Comprehensive methodology to assess credit file risk compliant with BCEAO (Instruction No. 94-05) and COBAC (Regulation R-93/13) classifications: SYSCOHADA financial analysis, repayment capacity, DSCR, collateral, scoring and lending decision.',
    category: 'Finance',
    downloads: 438,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=Professional%20credit%20risk%20analysis%20with%20African%20bank%20officer%20reviewing%20loan%20application%20documents%2C%20financial%20statements%20spread%20on%20clean%20modern%20desk%2C%20calculator%20and%20risk%20assessment%20forms%2C%20organized%20professional%20banking%20environment%2C%20deloitte%20green%20accent%20lighting%2C%20focused%20analytical%20atmosphere%2C%20high%20quality%20business%20photography&width=800&height=600&seq=res7-en-green&orientation=landscape',
    chapters: [
      'Regulatory Framework — BCEAO Classification (Instruction No. 94-05) and COBAC (Regulation R-93/13)',
      'Collecting and Verifying Application Documents (SYSCOHADA)',
      'Borrower Financial Capacity Analysis',
      'Repayment Capacity Assessment (DSCR)',
      'Collateral and Security Analysis (OHADA Uniform Act on Securities)',
      'Scoring and Internal Rating Methods',
      'Warning Signs and Red Flags',
      'Writing the Credit Note and Lending Decision',
    ]
  },
  {
    id: 'guide-impayes-recouvrement',
    title: 'Debt Management & Receivables Recovery Guide — OHADA and BCEAO/COBAC',
    description: 'Practical strategies and tools to prevent non-performing loans and optimize recovery within the OHADA Uniform Act on Enforcement Proceedings (AUVE) and BCEAO (UEMOA) and COBAC (CEMAC) provisioning requirements.',
    category: 'Finance',
    downloads: 312,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=African%20financial%20professional%20reviewing%20overdue%20accounts%20and%20debt%20recovery%20documents%20at%20modern%20office%20desk%2C%20organized%20folders%20with%20payment%20records%20and%20collection%20notices%2C%20professional%20banking%20environment%20with%20calculator%20and%20laptop%2C%20deloitte%20green%20accent%20lighting%2C%20dark%20charcoal%20background%2C%20serious%20analytical%20atmosphere&width=800&height=600&seq=res8-en-green&orientation=landscape',
    chapters: [
      'Regulatory Framework — OHADA AUVE and BCEAO/COBAC Requirements',
      'Understanding and Preventing Non-Performing Loans',
      'Early Detection and Warning Signs',
      'Amicable Recovery Procedures',
      'Debt Negotiation and Restructuring',
      'Judicial Recovery — OHADA Enforcement Proceedings (AUVE)',
      'SYSCOHADA Provisioning and Accounting for Doubtful Receivables',
      'Recovery Performance Indicators (KPIs)',
    ]
  },
  {
    id: 'guide-lcb-ft-uemoa',
    title: 'AML/CFT Compliance Guide — DFS (UEMOA) and MFI (CEMAC)',
    description: 'Comprehensive AML/CFT compliance framework for DFS (UEMOA) and MFIs (CEMAC): UEMOA Directive No. 02/2015, CEMAC Regulation No. 01/03, GIABA/GABAC, KYC, CENTIF/ANIF, asset freezing and BCEAO/COBAC regulatory reporting.',
    category: 'Finance',
    downloads: 284,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=African%20compliance%20officer%20reviewing%20anti-money%20laundering%20documents%20and%20regulatory%20files%20at%20a%20modern%20banking%20office%20desk%2C%20organized%20binders%20with%20AML%20CFT%20compliance%20reports%2C%20professional%20financial%20institution%20environment%2C%20serious%20focused%20atmosphere%2C%20dark%20green%20and%20black%20tones%2C%20high%20quality%20corporate%20photography%2C%20professional%20office%20lighting&width=800&height=600&seq=res9-en-green&orientation=landscape',
    chapters: [
      'AML/CFT Regulatory Framework — UEMOA Directive No. 02/2015 and CEMAC Regulation No. 01/03',
      'Regional Bodies — GIABA (UEMOA) and GABAC (CEMAC)',
      'Money Laundering Risk Assessment (Risk-Based Approach)',
      'KYC Framework — Customer Identification and Verification',
      'Transaction Monitoring and Suspicious Activity Detection',
      'Suspicious Transaction Reports — CENTIF (UEMOA) and ANIF (CEMAC)',
      'Asset Freezing and International Sanctions Lists',
      'Internal AML/CFT Audit and BCEAO/COBAC Reporting',
    ]
  },
  {
    id: 'guide-mobile-money-uemoa',
    title: 'Mobile Money & Digital Payments Regulation Guide — UEMOA (BCEAO) and CEMAC (BEAC)',
    description: 'Comprehensive regulatory framework for mobile money and digital payments: BCEAO Instruction No. 008-05-2015 (UEMOA), BEAC Regulation (CEMAC), STAR-UEMOA / SYSTAC-SYGMA interoperability, user protection and AML/CFT.',
    category: 'Finance',
    downloads: 198,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=African%20mobile%20money%20payment%20transaction%20on%20smartphone%20with%20digital%20wallet%20interface%2C%20modern%20fintech%20environment%20in%20West%20Africa%2C%20person%20using%20mobile%20banking%20app%20with%20digital%20payment%20icons%20floating%20around%2C%20clean%20bright%20contemporary%20office%20background%2C%20professional%20financial%20technology%20atmosphere%2C%20deloitte%20green%20and%20dark%20black%20tones%2C%20high%20quality%20photography&width=800&height=600&seq=res10-en-green&orientation=landscape',
    chapters: [
      'BCEAO Regulatory Framework — Instruction No. 008-05-2015 (UEMOA)',
      'BEAC Regulatory Framework — Electronic Money Regulation (CEMAC)',
      'EMI Licensing (UEMOA) and Operating Conditions',
      'Interoperability — STAR-UEMOA System (BCEAO) and SYSTAC/SYGMA (BEAC)',
      'User Protection and Customer Fund Management',
      'AML/CFT Obligations Specific to Mobile Money',
      'BCEAO/COBAC Supervision and Regulatory Reporting',
      'Outlook — Open Banking and Digital Finance in UEMOA/CEMAC Zones',
    ]
  },
  {
    id: 'guide-okr-methode',
    title: 'OKR Method Guide',
    description: 'Master the OKR (Objectives & Key Results) method to align your teams and drive strategic performance with agility.',
    category: 'Governance',
    type: 'guide',
    downloads: 0,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=modern%20business%20team%20collaborating%20around%20digital%20dashboard%20displaying%20objectives%20and%20key%20results%20metrics%20in%20bright%20contemporary%20office%20with%20glass%20walls%20and%20natural%20light%20professional%20corporate%20atmosphere%20clean%20minimalist%20design%20focus%20on%20goal%20alignment%20and%20performance%20tracking%20deloitte%20green%20and%20dark%20charcoal%20tones%20high%20tech%20environment&width=800&height=600&seq=okr001-en-green&orientation=landscape',
    chapters: [
      'OKR Principles and History',
      'OKR vs KPI vs MBO Differences',
      'Structuring Objectives and Key Results',
      'Cascade Deployment (company → team → individual)',
      'Quarterly OKR Cycles',
      'Weekly Check-ins and Reviews',
      'OKR Scoring and Evaluation',
      'Pitfalls to Avoid and Success Factors'
    ]
  },
  {
    id: 'guide-kpi-indicateurs',
    title: 'KPI Indicators Guide',
    description: 'Build an effective performance management system with the right indicators for every dimension of your organization.',
    category: 'Governance',
    type: 'guide',
    downloads: 0,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20business%20analytics%20dashboard%20with%20deloitte%20green%20charts%20graphs%20and%20key%20performance%20indicators%20displayed%20on%20large%20screens%20in%20modern%20corporate%20office%20data%20visualization%20metrics%20tracking%20clean%20contemporary%20design%20dark%20charcoal%20and%20green%20lighting%20focus%20on%20financial%20operational%20and%20strategic%20KPIs%20professional%20atmosphere&width=800&height=600&seq=kpi001-en-green&orientation=landscape',
    chapters: [
      'KPI Definition and Typologies',
      'Financial KPIs',
      'Operational KPIs',
      'HR and Social KPIs',
      'Sales and Marketing KPIs',
      'Building a Dashboard',
      'Monitoring and Variance Analysis',
      'Measurement Culture and Continuous Improvement'
    ]
  },
  {
    id: 'guide-gestion-performance',
    title: 'Performance Management Guide',
    description: 'Deploy a comprehensive individual and collective performance management system to develop your talents and achieve your goals.',
    category: 'Governance',
    type: 'guide',
    downloads: 0,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20performance%20review%20meeting%20between%20manager%20and%20employee%20in%20modern%20office%20discussing%20goals%20and%20development%20plans%20with%20laptop%20and%20documents%20on%20table%20deloitte%20green%20accent%20lighting%20collaborative%20atmosphere%20focus%20on%20talent%20development%20and%20objective%20setting%20contemporary%20corporate%20environment&width=800&height=600&seq=perf001-en-green&orientation=landscape',
    chapters: [
      'Performance Management Fundamentals',
      'Annual Performance Cycle',
      'Setting SMART Objectives',
      'Performance Reviews',
      'High Potential Management',
      'Individual Development Plans',
      'Performance-Compensation Link',
      'HR Dashboard and Reporting'
    ]
  },
  {
    id: 'guide-audit-social',
    title: 'Social Audit Guide',
    description: 'Assess the compliance and effectiveness of your HR function with a comprehensive social audit methodology adapted to the OHADA context.',
    category: 'Governance',
    type: 'guide',
    downloads: 0,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20HR%20audit%20scene%20with%20auditor%20reviewing%20employee%20files%20and%20social%20compliance%20documents%20in%20modern%20office%20setting%20organized%20workspace%20with%20folders%20laptop%20and%20legal%20documentation%20deloitte%20green%20professional%20atmosphere%20focus%20on%20labor%20law%20compliance%20and%20social%20indicators%20contemporary%20corporate%20design&width=800&height=600&seq=audit-social001-en-green&orientation=landscape',
    chapters: [
      'Legal and Regulatory HR Framework',
      'Payroll and Social Charges Audit',
      'Employment Contract Compliance',
      'Leave and Absence Management',
      'Health, Safety and Working Conditions',
      'Labor Relations and Social Dialogue',
      'Key Social Indicators',
      'Social Audit Report and Action Plan'
    ]
  },
  {
    id: 'guide-audit-organisation',
    title: 'Organizational Audit Guide',
    description: 'Diagnose and optimize your organizational structure with a comprehensive audit methodology to improve operational efficiency.',
    category: 'Governance',
    type: 'guide',
    downloads: 0,
    downloadUrl: '/khepera-experts-brochure.pdf',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20organizational%20audit%20concept%20with%20business%20consultants%20analyzing%20company%20structure%20charts%20and%20process%20flows%20on%20whiteboard%20in%20modern%20meeting%20room%20strategic%20planning%20session%20deloitte%20green%20and%20dark%20charcoal%20contemporary%20office%20focus%20on%20organizational%20design%20and%20efficiency%20optimization%20collaborative%20atmosphere&width=800&height=600&seq=audit-org001-en-green&orientation=landscape',
    chapters: [
      'Structural Diagnosis',
      'Process Mapping',
      'Roles and Responsibilities Analysis',
      'Governance Assessment',
      'Dysfunction Identification',
      'Organizational Benchmarking',
      'Recommendations and Reorganization Plan',
      'Implementation Monitoring'
    ]
  }
];
