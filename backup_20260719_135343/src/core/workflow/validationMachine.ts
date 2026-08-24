// KOS REGTECH AI — Report Validation State Machine
// XState v5 — Workflow validation des rapports réglementaires
// draft → rcci_review → coo_signoff → sealed
// SoD intégré (Séparation des fonctions), timeouts, escalade
// Conforme Circulaire BCEAO 01-2017 Art.22
// Conforme OHADA AUDCIF Art.111 (piste audit fiable)

import { createMachine, assign, fromPromise } from 'xstate';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { enforce, type User, type Action, type Resource } from '@/core/policy-engine/opa';
import { logger } from '@/core/logger';

const log = logger.child('validation-machine');

// ─── Types ───

export interface ReportContext {
  reportId: string;
  authorId: string;
  rcciId: string;
  cooId: string;
  timeouts: Record<string, number>;
  startedAt: number;
}

export type ReportEvent =
  | { type: 'SUBMIT'; user: User }
  | { type: 'APPROVE'; user: User }
  | { type: 'REJECT'; user: User }
  | { type: 'SEAL'; user: User }
  | { type: 'REASSIGN'; user: User };

export type ReportState =
  | { value: 'draft'; context: ReportContext }
  | { value: 'rcci_review'; context: ReportContext }
  | { value: 'coo_signoff'; context: ReportContext }
  | { value: 'sealed'; context: ReportContext }
  | { value: 'escalated'; context: ReportContext };

// ─── Guards ───

async function guardSubmit({ context, event }: { context: ReportContext; event: ReportEvent & { type: 'SUBMIT' } }) {
  const decision = await enforce(event.user, 'write', 'reports', {
    reportId: context.reportId,
    authorId: context.authorId,
  });

  if (!decision.allow) {
    log.warn('SUBMIT refusé — OPA deny', { user: event.user.id, reasons: decision.reasons });
    return false;
  }

  await merkleLog.append({
    action: 'REPORT_SUBMITTED',
    user: event.user.id,
    resource: 'reports',
    entityId: context.reportId,
    details: { obligations: decision.obligations },
  });

  return true;
}

async function guardApprove({ context, event }: { context: ReportContext; event: ReportEvent & { type: 'APPROVE' } }) {
  const decision = await enforce(event.user, 'validate', 'reports', {
    reportId: context.reportId,
    control: { author_id: context.authorId },
  });

  if (!decision.allow) {
    log.warn('APPROVE refusé — OPA deny', { user: event.user.id, reasons: decision.reasons });
    return false;
  }

  // SoD: L'auteur ne peut pas approuver son propre rapport (Four Eyes)
  if (decision.obligations.includes('FOUR_EYES_REQUIRED') && event.user.id === context.authorId) {
    log.warn('APPROVE refusé — SoD violation (Four Eyes)', {
      user: event.user.id,
      author: context.authorId,
    });
    return false;
  }

  await merkleLog.append({
    action: 'RCCI_APPROVED',
    user: event.user.id,
    resource: 'reports',
    entityId: context.reportId,
    details: { obligations: decision.obligations },
  });

  return true;
}

async function guardSeal({ context, event }: { context: ReportContext; event: ReportEvent & { type: 'SEAL' } }) {
  const decision = await enforce(event.user, 'seal', 'reports', {
    reportId: context.reportId,
    report: { rcci_approved: true, author_id: context.authorId },
  });

  if (!decision.allow) {
    log.warn('SEAL refusé — OPA deny', { user: event.user.id, reasons: decision.reasons });
    return false;
  }

  // SoD: RCCI ne peut pas sceller
  if (decision.obligations.includes('FOUR_EYES_REQUIRED') && event.user.roles.includes('RCCI')) {
    log.warn('SEAL refusé — SoD: RCCI cannot seal', { user: event.user.id });
    return false;
  }

  await merkleLog.append({
    action: 'REPORT_SEALED',
    user: event.user.id,
    resource: 'reports',
    entityId: context.reportId,
    details: { obligations: decision.obligations },
  });

  return true;
}

// ─── Machine ───

export const reportValidationMachine = createMachine({
  id: 'reportValidation',
  initial: 'draft',
  context: () => ({
    reportId: crypto.randomUUID(),
    authorId: '',
    rcciId: '',
    cooId: '',
    timeouts: {},
    startedAt: Date.now(),
  }),

  types: {} as {
    context: ReportContext;
    events: ReportEvent;
  },

  states: {
    draft: {
      entry: assign({
        startedAt: () => Date.now(),
      }),
      on: {
        SUBMIT: {
          target: 'rcci_review',
          guard: ({ context, event }) => {
            if (event.type !== 'SUBMIT') return false;
            // Guard async géré via l'action submit (XState v5 fromPromise)
            return true;
          },
        },
      },
    },

    rcci_review: {
      entry: assign({
        timeouts: ({ context }) => ({
          ...context.timeouts,
          rcci_review_start: Date.now(),
        }),
      }),
      after: {
        259200000: 'escalated', // 72h = 3 jours ouvrés
      },
      on: {
        APPROVE: {
          target: 'coo_signoff',
          guard: ({ context, event }) => {
            if (event.type !== 'APPROVE') return false;
            return true;
          },
        },
        REJECT: {
          target: 'draft',
          actions: assign({
            timeouts: ({ context }) => ({
              ...context.timeouts,
              last_rejection: Date.now(),
            }),
          }),
        },
      },
    },

    coo_signoff: {
      entry: assign({
        timeouts: ({ context }) => ({
          ...context.timeouts,
          coo_signoff_start: Date.now(),
        }),
      }),
      on: {
        SEAL: {
          target: 'sealed',
          guard: ({ context, event }) => {
            if (event.type !== 'SEAL') return false;
            return true;
          },
        },
        REJECT: {
          target: 'rcci_review',
        },
      },
    },

    sealed: {
      type: 'final',
      entry: assign({
        timeouts: ({ context }) => ({
          ...context.timeouts,
          sealed_at: Date.now(),
        }),
      }),
    },

    escalated: {
      entry: assign({
        timeouts: ({ context }) => ({
          ...context.timeouts,
          escalated_at: Date.now(),
        }),
      }),
      on: {
        REASSIGN: 'rcci_review',
        SEAL: {
          target: 'sealed',
          guard: ({ context, event }) => {
            if (event.type !== 'SEAL') return false;
            // Le COO/CEO peut sceller directement en cas d'escalade
            return true;
          },
        },
      },
    },
  },
});

// ─── Service de validation (wrappe la machine avec les guards async) ───

export interface ValidationService {
  state: string;
  context: ReportContext;
  submit: (user: User) => Promise<{ success: boolean; newState: string; error?: string }>;
  approve: (user: User) => Promise<{ success: boolean; newState: string; error?: string }>;
  reject: (user: User) => Promise<{ success: boolean; newState: string }>;
  seal: (user: User) => Promise<{ success: boolean; newState: string; error?: string }>;
  reassign: (user: User) => Promise<{ success: boolean; newState: string }>;
  getSnapshot: () => { state: string; context: ReportContext };
}

export function createValidationService(reportId: string, authorId: string, rcciId: string, cooId: string): ValidationService {
  const actor = reportValidationMachine.withContext({
    reportId,
    authorId,
    rcciId,
    cooId,
    timeouts: {},
    startedAt: Date.now(),
  });

  let currentSnapshot = actor.getSnapshot();

  async function transition(event: ReportEvent): Promise<{ success: boolean; newState: string; error?: string }> {
    try {
      // Vérifier les guards avant transition
      if (event.type === 'SUBMIT') {
        const allowed = await guardSubmit({ context: currentSnapshot.context, event: event as ReportEvent & { type: 'SUBMIT' } });
        if (!allowed) return { success: false, newState: currentSnapshot.value as string, error: 'OPA policy denied SUBMIT' };
      }

      if (event.type === 'APPROVE') {
        const allowed = await guardApprove({ context: currentSnapshot.context, event: event as ReportEvent & { type: 'APPROVE' } });
        if (!allowed) return { success: false, newState: currentSnapshot.value as string, error: 'OPA policy denied APPROVE (SoD or permissions)' };
      }

      if (event.type === 'SEAL') {
        const allowed = await guardSeal({ context: currentSnapshot.context, event: event as ReportEvent & { type: 'SEAL' } });
        if (!allowed) return { success: false, newState: currentSnapshot.value as string, error: 'OPA policy denied SEAL (insufficient role or SoD)' };
      }

      const nextSnapshot = actor.getSnapshot();
      // La transition est gérée par la machine via les événements
      // En XState v5, on utilise actor.send()
      actor.send(event);
      currentSnapshot = actor.getSnapshot();

      log.info('Transition validation', {
        event: event.type,
        from: nextSnapshot.value,
        to: currentSnapshot.value,
        reportId,
      });

      return { success: true, newState: currentSnapshot.value as string };
    } catch (err) {
      log.error('Erreur transition', { event: event.type, error: String(err) });
      return { success: false, newState: currentSnapshot.value as string, error: String(err) };
    }
  }

  return {
    state: currentSnapshot.value as string,
    context: currentSnapshot.context,
    submit: (user) => transition({ type: 'SUBMIT', user }),
    approve: (user) => transition({ type: 'APPROVE', user }),
    reject: (user) => transition({ type: 'REJECT', user }),
    seal: (user) => transition({ type: 'SEAL', user }),
    reassign: (user) => transition({ type: 'REASSIGN', user }),
    getSnapshot: () => ({
      state: currentSnapshot.value as string,
      context: currentSnapshot.context,
    }),
  };
}

// ─── États disponibles ───

export const VALIDATION_STATES = {
  DRAFT: 'draft',
  RCCI_REVIEW: 'rcci_review',
  COO_SIGNOFF: 'coo_signoff',
  SEALED: 'sealed',
  ESCALATED: 'escalated',
} as const;

export type ValidationState = (typeof VALIDATION_STATES)[keyof typeof VALIDATION_STATES];



