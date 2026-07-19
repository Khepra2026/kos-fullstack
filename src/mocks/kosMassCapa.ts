// ============================================================
// KOS MASS CAPA — Actions Correctives de Masse
// Conformité Big Four + ISO — Piste d'Audit Complète
// Version 2026.07.04
// ============================================================

export interface MassCapaAction {
  id: string;
  ref: string;
  title: string;
  rootCause: 'Process' | 'People' | 'Tech' | 'External' | 'Data';
  severity: 'Critical' | 'Major' | 'Minor';
  entities: string[];
  owner: string;
  dueDate: string;
  status: 'Open' | 'InProgress' | 'Closed' | 'Verified';
  isoClause?: string;
  evidenceUrl?: string;
  auditTrail: Array<{
    ts: string;
    user: string;
    action: string;
    hash: string;
  }>;
}

export const INITIAL_MASS_CAPA_ACTIONS: MassCapaAction[] = [
  {
    id: 'capa-001',
    ref: 'CAPA-2026-0001',
    title: 'Mise à jour politique KYC BCEAO Circulaire 01-2024 — Alignement GAFI R.12',
    rootCause: 'Process',
    severity: 'Critical',
    entities: ['KHEPRA Conseil', 'SFD Division', 'Compliance Office'],
    owner: 'compliance@khepraexperts.com',
    dueDate: '2026-09-15T00:00:00Z',
    status: 'Open',
    isoClause: 'ISO9001:2015-10.2',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'a1b2c3d4e5f6789012345678abcdef01',
      },
    ],
  },
  {
    id: 'capa-002',
    ref: 'CAPA-2026-0002',
    title: 'Déploiement MFA sur tous les accès KOS Platform — Renforcement A.8.5',
    rootCause: 'Tech',
    severity: 'Critical',
    entities: ['KOS Platform', 'IT Division', 'Security Ops'],
    owner: 'rssi@khepraexperts.com',
    dueDate: '2026-08-30T00:00:00Z',
    status: 'InProgress',
    isoClause: 'ISO27001:2022-A.8.5',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'b2c3d4e5f6789012345678abcdef0123',
      },
    ],
  },
  {
    id: 'capa-003',
    ref: 'CAPA-2026-0003',
    title: 'Formation équipe LBC/FT — Nouvelles exigences GAFI 2026 + Typologies UEMOA',
    rootCause: 'People',
    severity: 'Major',
    entities: ['Audit Division', 'Conseil', 'Formation KHEPRA'],
    owner: 'rh@khepraexperts.com',
    dueDate: '2026-10-15T00:00:00Z',
    status: 'Open',
    isoClause: 'ISO37001:2016-7.2',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'c3d4e5f6789012345678abcdef012345',
      },
    ],
  },
  {
    id: 'capa-004',
    ref: 'CAPA-2026-0004',
    title: 'Audit conformité COBAC CEMAC — Établissement ProBoutik Gabon avant agrément',
    rootCause: 'External',
    severity: 'Major',
    entities: ['CEMAC Division', 'ProBoutik Gabon', 'BGFI AMIFA'],
    owner: 'cemac@khepraexperts.com',
    dueDate: '2026-11-30T00:00:00Z',
    status: 'Open',
    isoClause: 'ISO19011:2018-6.4',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'd4e5f6789012345678abcdef01234567',
      },
    ],
  },
  {
    id: 'capa-005',
    ref: 'CAPA-2026-0005',
    title: 'Migration Data Lake KOS — Schéma SKOS normalisé + mappings Dublin Core',
    rootCause: 'Data',
    severity: 'Minor',
    entities: ['Data Team', 'Knowledge Hub', 'CTO Office'],
    owner: 'cto@khepraexperts.com',
    dueDate: '2027-01-31T00:00:00Z',
    status: 'Open',
    isoClause: 'ISO30401:2018-5.3',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'e5f6789012345678abcdef0123456789',
      },
    ],
  },
  {
    id: 'capa-006',
    ref: 'CAPA-2026-0006',
    title: 'Révision charte déontologique KHEPRA — Suite conformité EU AI Act Art. 14-15',
    rootCause: 'Process',
    severity: 'Major',
    entities: ['AI Ethics Board', 'Legal Division', 'Managing Partner'],
    owner: 'legal@khepraexperts.com',
    dueDate: '2026-09-30T00:00:00Z',
    status: 'InProgress',
    isoClause: 'ISO42001:2023-6.2',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: 'f6789012345678abcdef012345678901',
      },
    ],
  },
  {
    id: 'capa-007',
    ref: 'CAPA-2026-0007',
    title: 'Mise en place SIEM temps réel — Objectif MTTD < 5min + Threat Intelligence',
    rootCause: 'Tech',
    severity: 'Critical',
    entities: ['Security Ops', 'SOC Manager', 'RSSI'],
    owner: 'rssi@khepraexperts.com',
    dueDate: '2026-12-15T00:00:00Z',
    status: 'Open',
    isoClause: 'ISO27001:2022-A.8.15',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: '789012345678abcdef01234567890123',
      },
    ],
  },
  {
    id: 'capa-008',
    ref: 'CAPA-2026-0008',
    title: 'Standardisation méthodologie Due Diligence UEMOA — Template KOS Automaton',
    rootCause: 'Process',
    severity: 'Major',
    entities: ['BU2 Governance', 'Methodology Office', 'PMO'],
    owner: 'pmo@khepraexperts.com',
    dueDate: '2026-10-31T00:00:00Z',
    status: 'Verified',
    isoClause: 'ISO9001:2015-8.1',
    auditTrail: [
      {
        ts: '2026-07-04T08:00:00Z',
        user: 'essochamanu@khepraexperts.com',
        action: 'CREATED_BULK',
        hash: '8901234567890abcdef0123456789012',
      },
      {
        ts: '2026-07-02T14:30:00Z',
        user: 'pmo@khepraexperts.com',
        action: 'VERIFIED',
        hash: '901234567890abcdef01234567890123',
      },
    ],
  },
];





