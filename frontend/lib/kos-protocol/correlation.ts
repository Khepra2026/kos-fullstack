export interface AuditEvent { correlationId: string; step: string; status: "started"|"success"|"failed"|"retry"; timestamp: string; error?: string; metadata?: any; }
export function createCorrelationId() { return "KOS-"+new Date().toISOString().slice(0,10)+"-"+Math.random().toString(36).substring(2,10).toUpperCase() }
export class AuditTrail {
  private events: AuditEvent[] = []
  constructor(public correlationId = createCorrelationId()) {}
  log(step: string, status: AuditEvent["status"], meta?: Partial<AuditEvent>) {
    const ev = { correlationId: this.correlationId, step, status, timestamp: new Date().toISOString(), ...meta } as AuditEvent
    this.events.push(ev); return ev
  }
  getTrail() { return this.events }
}
export function withRetry<T>(fn: () => Promise<T>, retries = 3, backoffMs = 1000): Promise<T> {
  return fn().catch(async (e) => { if (retries <= 0) throw e; await new Promise(r => setTimeout(r, backoffMs)); return withRetry(fn, retries-1, backoffMs*2) })
}
export class CircuitBreaker {
  private failures=0; private lastFailure=0
  constructor(private threshold=5, private resetMs=60000) {}
  async exec<T>(fn: () => Promise<T>): Promise<T> {
    if (this.failures>=this.threshold && Date.now()-this.lastFailure<this.resetMs) throw new Error("CIRCUIT_OPEN")
    try { const r=await fn(); this.failures=0; return r } catch(e){ this.failures++; this.lastFailure=Date.now(); throw e }
  }
}
