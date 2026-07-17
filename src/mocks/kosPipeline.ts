import { http, HttpResponse } from 'msw';

export const kosPipelineHandlers = [
  // VeilleAgent → kos-regulatory-intelligence-engine
  http.post('*/functions/v1/kos-regulatory-intelligence-engine', async () => {
    return HttpResponse.json({
      id: 'REG-20260708-001',
      source: 'BCEAO',
      docId: '2026-07-INST-001',
      title: 'Instruction BCEAO 2026-07-INST-001 — Renforcement LBC-FT',
      summary: 'La BCEAO publie une nouvelle instruction renforçant le dispositif de lutte contre le blanchiment des capitaux et le financement du terrorisme pour les institutions financières de l\'UEMOA. Le texte introduit 12 nouveaux points de contrôle et réduit les délais de mise en conformité à 90 jours.',
      impactLevel: 'HIGH',
      keyPoints: [
        'Renforcement des obligations de due diligence',
        'Nouveaux seuils de déclaration de soupçon',
        'Obligation de formation continue des équipes',
        'Mise en place d\'un dispositif de contrôle interne dédié',
      ],
      affectedSectors: ['Banques', 'SFD', 'Fintechs', 'Assurances'],
      deadline: '2026-10-06',
      sources: [
        'https://www.bceao.int/fr/instructions/2026-07-INST-001',
      ],
      rawText: 'Instruction complète BCEAO 2026...',
    });
  }),

  // SEOAgent RAG → rag-semantic-search
  http.post('*/functions/v1/rag-semantic-search', async ({ request }) => {
    const body = await request.json() as { text?: string };
    const text = body?.text || '';
    return HttpResponse.json({
      pages: [
        { url: 'https://khepraexperts.com/services/audit-reglementaire', bestAnchor: 'audit réglementaire BCEAO', relevance: 0.94 },
        { url: 'https://khepraexperts.com/expertises/conformite-cobac', bestAnchor: 'conformité COBAC', relevance: 0.91 },
        { url: 'https://khepraexperts.com/blog/lbcft-nouvelles-exigences-gafi-2026', bestAnchor: 'exigences LBC-FT GAFI 2026', relevance: 0.89 },
        { url: 'https://khepraexperts.com/contact', bestAnchor: 'prendre rendez-vous', relevance: 0.88 },
        { url: 'https://khepraexperts.com/services/controle-interne-bancaire', bestAnchor: 'contrôle interne bancaire', relevance: 0.86 },
      ],
    });
  }),

  // CopywritingAgent → kos-ai-router-v2
  http.post('*/functions/v1/kos-ai-router-v2', async () => {
    return HttpResponse.json({
      content: {
        title: 'BCEAO durcit la lutte anti-blanchiment : ce que les SFD doivent savoir',
        hook: 'La BCEAO vient de durcir les exigences LBC-FT. Êtes-vous prêts pour le 6 octobre 2026 ?',
        contexte: 'Nouvelle instruction 2026-07-INST-001 publiée le 08 juillet 2026. Le régulateur ouest-africain accélère la mise aux normes GAFI.',
        problematique: 'Les SFD et établissements financiers de l\'UEMOA doivent mettre à jour leurs dispositifs LBC-FT sous 90 jours. Une non-conformité expose à des sanctions pouvant aller jusqu\'au retrait d\'agrément.',
        analyse: 'La nouvelle instruction introduit 12 points de contrôle renforcés : classification des risques clients, due diligence renforcée pour les PEP, surveillance continue des transactions, obligation de déclaration dans les 24h, formation obligatoire du personnel, audit externe annuel du dispositif LBC-FT, et nomination d\'un responsable LBC-FT au niveau direction générale...',
        recommandations: [
          'Cartographier les risques LBC-FT',
          'Mettre à jour la classification des clients',
          'Former les équipes conformité',
          'Déployer un outil de monitoring des transactions',
        ],
        valeurAjoutee: 'Khepra Experts a déjà accompagné 23 institutions financières sur leur mise en conformité LBC-FT. Notre équipe combine expertise réglementaire BCEAO et maîtrise des standards GAFI.',
        summary: 'Analyse détaillée de la nouvelle instruction BCEAO sur le renforcement LBC-FT.',
        body: 'Contenu détaillé de 2000+ mots sur l\'instruction BCEAO 2026-07-INST-001...'.repeat(15),
        faq: [
          { q: 'Quel est le délai de mise en conformité ?', a: '90 jours à compter de la publication, soit le 6 octobre 2026.' },
          { q: 'Qui est concerné par cette instruction ?', a: 'Toutes les institutions financières de l\'UEMOA : banques, SFD, fintechs, assurances.' },
        ],
        affectedSectors: ['Banques', 'SFD', 'Fintechs'],
        deadline: '2026-10-06',
        sources: ['BCEAO Instruction 2026-07-INST-001'],
      },
    });
  }),

  // SEOAgent sitemap → kos-sitemap-xml-dynamic-v3
  http.post('*/functions/v1/kos-sitemap-xml-dynamic-v3', () => {
    return HttpResponse.json([
      { url: '/services', title: 'Services' },
      { url: '/services/audit-reglementaire', title: 'Audit Réglementaire' },
      { url: '/services/controle-interne-bancaire', title: 'Contrôle Interne Bancaire' },
      { url: '/expertises/conformite-cobac', title: 'Expertise Conformité COBAC' },
      { url: '/expertises/ifrs', title: 'Expertise IFRS' },
      { url: '/blog', title: 'Blog' },
      { url: '/blog/lbcft-nouvelles-exigences-gafi-2026', title: 'LBC-FT GAFI 2026' },
      { url: '/contact', title: 'Contact' },
    ]);
  }),

  // PublishAgent → kos-social-copy
  http.post('*/functions/v1/kos-social-copy', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json({
      id: crypto.randomUUID(),
      url: `https://khepraexperts.com/post/${Date.now()}`,
    });
  }),

  // PublishAgent audit → kos-audit-insert
  http.post('*/functions/v1/kos-audit-insert', () => {
    return HttpResponse.json({ status: 'logged' });
  }),

  // Dashboard KPI → kos-kpi-recalculation-engine
  http.post('*/functions/v1/kos-kpi-recalculation-engine', async () => {
    return HttpResponse.json({
      production: { contenus: 142, delaiMoyen: '18min' },
      seo: { trafic: 28451, motsCles: 1842 },
      commercial: { prospects: 37, rdv: 12 },
      quality: { avgScore: 97.2 },
      audit: [
        { id: 'AUD-20260708-001', channel: 'linkedin', score: 98, timestamp: new Date().toISOString() },
        { id: 'AUD-20260708-002', channel: 'web', score: 96, timestamp: new Date().toISOString() },
        { id: 'AUD-20260708-003', channel: 'newsletter', score: 99, timestamp: new Date().toISOString() },
        { id: 'AUD-20260707-015', channel: 'x', score: 94, timestamp: new Date(Date.now() - 86400000).toISOString() },
      ],
    });
  }),
];