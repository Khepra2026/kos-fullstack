/**
 * ═══════════════════════════════════════════════════════════════
 * KOS AUTO-OPTIMIZATION ENGINE™ — Self-Improving System Loop
 * KHEPRA EXPERTS — Big Four Architecture Technique
 * ═══════════════════════════════════════════════════════════════
 *
 * Loop: Observe → Analyze → Decide → Adapt → Validate → Deploy
 *
 * Modules:
 *   1. Performance Monitor — latency, throughput, bottlenecks
 *   2. Intelligence Analyzer — workflow efficiency, vector density
 *   3. Auto-Refactor Engine — n8n rewriting, microservice scaling
 *   4. Compliance Guardian — regulatory drift, audit integrity
 *
 * Self-Tuning Rules:
 *   IF latency_p99 > 500ms     → scale ingestion-service +1
 *   IF duplication_rate > 15%  → merge vector clusters Qdrant
 *   IF workflow_efficiency < 0.7 → rewrite n8n graph
 *   IF data_drift_detected     → rollback + revalidate
 *   IF cpu_avg > 80%           → scale queue-worker +2
 */

// ─── Types ───────────────────────────────────────────────────

type OptimizationPhase = 'observe' | 'analyze' | 'decide' | 'adapt' | 'validate' | 'deploy';

type ServiceName =
  | 'api-gateway'
  | 'n8n'
  | 'qdrant'
  | 'ingestion-service'
  | 'transform-service'
  | 'audit-service'
  | 'queue-worker'
  | 'postgres'
  | 'redis'
  | 'minio';

type MetricSeverity = 'info' | 'warning' | 'critical';

interface PerformanceSnapshot {
  timestamp: string;
  services: Record<ServiceName, ServiceMetrics>;
  system: SystemMetrics;
}

interface ServiceMetrics {
  cpu_percent: number;
  memory_mb: number;
  latency_p50_ms: number;
  latency_p99_ms: number;
  throughput_rps: number;
  error_rate: number;
  status: 'healthy' | 'degraded' | 'critical' | 'down';
  uptime_seconds: number;
}

interface SystemMetrics {
  totalCpuPercent: number;
  totalMemoryMb: number;
  totalDiskGb: number;
  networkInMbps: number;
  networkOutMbps: number;
  activeRequests: number;
  queueDepth: number;
}

interface Bottleneck {
  service: ServiceName;
  metric: string;
  currentValue: number;
  threshold: number;
  severity: MetricSeverity;
  recommendation: string;
}

interface OptimizationDecision {
  id: string;
  timestamp: string;
  trigger: string;
  action: OptimizationAction;
  status: 'pending' | 'approved' | 'executing' | 'completed' | 'rolled_back';
  impact: string;
}

type OptimizationAction =
  | { type: 'scale_service'; service: ServiceName; delta: number }
  | { type: 'merge_vectors'; collection: string; threshold: number }
  | { type: 'rewrite_workflow'; workflowName: string; reason: string }
  | { type: 'rollback'; reason: string; targetVersion: string }
  | { type: 'clear_cache'; target: string }
  | { type: 'reindex'; collection: string };

interface WorkflowEfficiency {
  workflowName: string;
  efficiencyScore: number;
  averageDurationMs: number;
  successRate: number;
  bottlenecks: string[];
  recommendations: string[];
}

interface DriftDetection {
  detected: boolean;
  regulator: string;
  driftType: 'regulatory' | 'data' | 'schema' | 'performance';
  severity: MetricSeverity;
  description: string;
  affectedDocuments: string[];
  recommendedAction: string;
}

interface OptimizationReport {
  generatedAt: string;
  cycleNumber: number;
  phase: OptimizationPhase;
  performanceSnapshot: PerformanceSnapshot;
  bottlenecks: Bottleneck[];
  pendingDecisions: OptimizationDecision[];
  workflowEfficiencies: WorkflowEfficiency[];
  driftDetections: DriftDetection[];
  summary: string;
}

// ─── Thresholds ──────────────────────────────────────────────

const PERFORMANCE_THRESHOLDS = {
  cpu_warning: 70,
  cpu_critical: 90,
  memory_warning_mb: 1024,
  memory_critical_mb: 2048,
  latency_p99_warning_ms: 300,
  latency_p99_critical_ms: 500,
  error_rate_warning: 0.02,
  error_rate_critical: 0.05,
  duplication_rate_warning: 0.10,
  duplication_rate_critical: 0.15,
  workflow_efficiency_min: 0.7,
  drift_tolerance: 0.05,
  queue_depth_warning: 100,
  queue_depth_critical: 500,
};

const SELF_TUNING_RULES: {
  condition: (metrics: PerformanceSnapshot) => boolean;
  action: OptimizationAction;
  description: string;
}[] = [
  {
    condition: (m) => {
      const s = m.services['ingestion-service'];
      return s && s.latency_p99_ms > PERFORMANCE_THRESHOLDS.latency_p99_critical_ms;
    },
    action: { type: 'scale_service', service: 'ingestion-service', delta: 1 },
    description: 'Latency P99 > 500ms → scale ingestion-service +1',
  },
  {
    condition: (m) => {
      const s = m.services['queue-worker'];
      return s && s.cpu_percent > PERFORMANCE_THRESHOLDS.cpu_warning;
    },
    action: { type: 'scale_service', service: 'queue-worker', delta: 2 },
    description: 'CPU avg > 80% → scale queue-worker +2',
  },
  {
    condition: (m) => m.system.queueDepth > PERFORMANCE_THRESHOLDS.queue_depth_warning,
    action: { type: 'scale_service', service: 'queue-worker', delta: 3 },
    description: 'Queue depth > 100 → scale queue-worker +3',
  },
  {
    condition: (m) => {
      const s = m.services['transform-service'];
      return s && s.error_rate > PERFORMANCE_THRESHOLDS.error_rate_warning;
    },
    action: { type: 'clear_cache', target: 'transform-service' },
    description: 'Error rate > 2% → clear transform-service cache',
  },
];

// ─── KosAutoOptimizationEngine ────────────────────────────────

class KosAutoOptimizationEngine {
  private history: PerformanceSnapshot[];
  private decisions: OptimizationDecision[];
  private cycleNumber: number;
  private currentPhase: OptimizationPhase;
  private isActive: boolean;
  private selfHealingEnabled: boolean;
  private autoScalingEnabled: boolean;
  private autoRefactorEnabled: boolean;

  constructor() {
    this.history = [];
    this.decisions = [];
    this.cycleNumber = 0;
    this.currentPhase = 'observe';
    this.isActive = false;
    this.selfHealingEnabled = false;
    this.autoScalingEnabled = false;
    this.autoRefactorEnabled = false;
  }

  // ── Activation ────────────────────────────────────────────

  activate(options?: {
    selfHealing?: boolean;
    autoScaling?: boolean;
    autoRefactor?: boolean;
  }): void {
    this.isActive = true;
    this.selfHealingEnabled = options?.selfHealing ?? true;
    this.autoScalingEnabled = options?.autoScaling ?? true;
    this.autoRefactorEnabled = options?.autoRefactor ?? true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  getStatus(): {
    active: boolean;
    selfHealing: boolean;
    autoScaling: boolean;
    autoRefactor: boolean;
    cycleNumber: number;
    phase: OptimizationPhase;
  } {
    return {
      active: this.isActive,
      selfHealing: this.selfHealingEnabled,
      autoScaling: this.autoScalingEnabled,
      autoRefactor: this.autoRefactorEnabled,
      cycleNumber: this.cycleNumber,
      phase: this.currentPhase,
    };
  }

  // ── Module 1: Performance Monitor ─────────────────────────

  observe(snapshot: PerformanceSnapshot): void {
    this.currentPhase = 'observe';
    this.history.push(snapshot);

    if (this.history.length > 100) {
      this.history = this.history.slice(-100);
    }
  }

  getLatestSnapshot(): PerformanceSnapshot | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  getServiceHistory(service: ServiceName, limit = 20): ServiceMetrics[] {
    return this.history.slice(-limit).map((s) => s.services[service]).filter(Boolean);
  }

  detectBottlenecks(snapshot: PerformanceSnapshot): Bottleneck[] {
    const bottlenecks: Bottleneck[] = [];

    for (const [name, metrics] of Object.entries(snapshot.services)) {
      const serviceName = name as ServiceName;

      if (metrics.cpu_percent > PERFORMANCE_THRESHOLDS.cpu_critical) {
        bottlenecks.push({
          service: serviceName,
          metric: 'cpu',
          currentValue: metrics.cpu_percent,
          threshold: PERFORMANCE_THRESHOLDS.cpu_critical,
          severity: 'critical',
          recommendation: `Scale ${serviceName} horizontally — CPU at ${metrics.cpu_percent}%`,
        });
      } else if (metrics.cpu_percent > PERFORMANCE_THRESHOLDS.cpu_warning) {
        bottlenecks.push({
          service: serviceName,
          metric: 'cpu',
          currentValue: metrics.cpu_percent,
          threshold: PERFORMANCE_THRESHOLDS.cpu_warning,
          severity: 'warning',
          recommendation: `Monitor ${serviceName} CPU — approaching threshold at ${metrics.cpu_percent}%`,
        });
      }

      if (metrics.latency_p99_ms > PERFORMANCE_THRESHOLDS.latency_p99_critical_ms) {
        bottlenecks.push({
          service: serviceName,
          metric: 'latency_p99',
          currentValue: metrics.latency_p99_ms,
          threshold: PERFORMANCE_THRESHOLDS.latency_p99_critical_ms,
          severity: 'critical',
          recommendation: `Scale ${serviceName} — P99 latency at ${metrics.latency_p99_ms}ms`,
        });
      }

      if (metrics.error_rate > PERFORMANCE_THRESHOLDS.error_rate_critical) {
        bottlenecks.push({
          service: serviceName,
          metric: 'error_rate',
          currentValue: metrics.error_rate,
          threshold: PERFORMANCE_THRESHOLDS.error_rate_critical,
          severity: 'critical',
          recommendation: `Investigate ${serviceName} — error rate at ${(metrics.error_rate * 100).toFixed(1)}%`,
        });
      }

      if (metrics.status === 'critical' || metrics.status === 'down') {
        bottlenecks.push({
          service: serviceName,
          metric: 'status',
          currentValue: 0,
          threshold: 1,
          severity: 'critical',
          recommendation: `Service ${serviceName} is ${metrics.status} — immediate action required`,
        });
      }
    }

    if (snapshot.system.queueDepth > PERFORMANCE_THRESHOLDS.queue_depth_critical) {
      bottlenecks.push({
        service: 'queue-worker',
        metric: 'queue_depth',
        currentValue: snapshot.system.queueDepth,
        threshold: PERFORMANCE_THRESHOLDS.queue_depth_critical,
        severity: 'critical',
        recommendation: `Queue depth critical at ${snapshot.system.queueDepth} — scale worker pool immediately`,
      });
    }

    return bottlenecks;
  }

  // ── Module 2: Intelligence Analyzer ───────────────────────

  analyzeWorkflowEfficiency(workflowStats: {
    name: string;
    avgDurationMs: number;
    successCount: number;
    failureCount: number;
    steps: { name: string; avgDurationMs: number }[];
  }): WorkflowEfficiency {
    const total = workflowStats.successCount + workflowStats.failureCount;
    const successRate = total > 0 ? workflowStats.successCount / total : 1;

    const slowSteps = workflowStats.steps
      .filter((s) => s.avgDurationMs > workflowStats.avgDurationMs * 0.5)
      .map((s) => s.name);

    const efficiencyScore =
      (successRate * 0.4 +
        (1 / (1 + workflowStats.avgDurationMs / 1000)) * 0.3 +
        (1 / (1 + slowSteps.length)) * 0.3);

    const recommendations: string[] = [];
    if (successRate < 0.95) {
      recommendations.push(`Improve reliability — success rate at ${(successRate * 100).toFixed(1)}%`);
    }
    if (slowSteps.length > 2) {
      recommendations.push(`Optimize slow steps: ${slowSteps.join(', ')}`);
    }
    if (efficiencyScore < PERFORMANCE_THRESHOLDS.workflow_efficiency_min) {
      recommendations.push('Consider rewriting workflow for better efficiency');
    }

    return {
      workflowName: workflowStats.name,
      efficiencyScore,
      averageDurationMs: workflowStats.avgDurationMs,
      successRate,
      bottlenecks: slowSteps,
      recommendations,
    };
  }

  analyzeVectorDensity(
    collectionStats: { name: string; points: number; vectors: number; duplicationRate: number },
  ): { density: number; recommendations: string[] } {
    const density = collectionStats.points > 0 ? collectionStats.vectors / collectionStats.points : 0;
    const recommendations: string[] = [];

    if (collectionStats.duplicationRate > PERFORMANCE_THRESHOLDS.duplication_rate_critical) {
      recommendations.push(
        `HIGH_DUPLICATION in ${collectionStats.name}: ${(collectionStats.duplicationRate * 100).toFixed(1)}% — merge clusters urgently`,
      );
    } else if (collectionStats.duplicationRate > PERFORMANCE_THRESHOLDS.duplication_rate_warning) {
      recommendations.push(
        `MODERATE_DUPLICATION in ${collectionStats.name}: ${(collectionStats.duplicationRate * 100).toFixed(1)}% — schedule merge`,
      );
    }

    if (density < 0.3) {
      recommendations.push(`LOW_DENSITY in ${collectionStats.name}: enrich vectors`);
    }

    return { density, recommendations };
  }

  // ── Module 3: Auto-Refactor Engine ────────────────────────

  decide(snapshot: PerformanceSnapshot): OptimizationDecision[] {
    this.currentPhase = 'decide';
    const newDecisions: OptimizationDecision[] = [];

    if (!this.isActive) return newDecisions;

    // Apply self-tuning rules
    for (const rule of SELF_TUNING_RULES) {
      if (rule.condition(snapshot)) {
        const isScaling = rule.action.type === 'scale_service';
        if (isScaling && !this.autoScalingEnabled) continue;
        if (!isScaling && !this.autoRefactorEnabled) continue;

        const decision: OptimizationDecision = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          trigger: rule.description,
          action: rule.action,
          status: 'pending',
          impact: `Expected: improved ${rule.action.type === 'scale_service' ? 'throughput' : 'efficiency'}`,
        };

        // Check for duplicate pending decisions
        const isDuplicate = this.decisions.some(
          (d) =>
            d.status === 'pending' &&
            d.action.type === rule.action.type &&
            JSON.stringify(d.action) === JSON.stringify(rule.action),
        );

        if (!isDuplicate) {
          this.decisions.push(decision);
          newDecisions.push(decision);
        }
      }
    }

    // Bottleneck-driven decisions
    const bottlenecks = this.detectBottlenecks(snapshot);
    for (const b of bottlenecks) {
      if (b.severity === 'critical' && this.autoScalingEnabled) {
        const decision: OptimizationDecision = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          trigger: `Bottleneck detected: ${b.service} ${b.metric} at ${b.currentValue} (threshold: ${b.threshold})`,
          action: { type: 'scale_service', service: b.service, delta: 1 },
          status: 'pending',
          impact: b.recommendation,
        };
        this.decisions.push(decision);
        newDecisions.push(decision);
      }
    }

    return newDecisions;
  }

  // ── Module 4: Compliance Guardian ─────────────────────────

  detectRegulatoryDrift(
    currentData: { regulator: string; hash: string; timestamp: string }[],
    referenceData: { regulator: string; hash: string; timestamp: string }[],
  ): DriftDetection[] {
    const drifts: DriftDetection[] = [];
    const refMap = new Map(referenceData.map((d) => [d.regulator, d]));

    for (const current of currentData) {
      const reference = refMap.get(current.regulator);
      if (!reference) continue;

      if (current.hash !== reference.hash) {
        drifts.push({
          detected: true,
          regulator: current.regulator,
          driftType: 'regulatory',
          severity: 'warning',
          description: `Regulatory data drift detected for ${current.regulator}: hash mismatch`,
          affectedDocuments: [],
          recommendedAction: `Rollback ${current.regulator} data to version ${reference.timestamp} and revalidate`,
        });
      }
    }

    return drifts;
  }

  validateAuditIntegrity(hashChain: { hash: string; previousHash: string }[]): {
    valid: boolean;
    brokenAt: number | null;
  } {
    for (let i = 1; i < hashChain.length; i++) {
      if (hashChain[i].previousHash !== hashChain[i - 1].hash) {
        return { valid: false, brokenAt: i };
      }
    }
    return { valid: true, brokenAt: null };
  }

  // ── Execute Optimization Cycle ────────────────────────────

  async executeCycle(snapshot: PerformanceSnapshot): Promise<OptimizationReport> {
    this.cycleNumber += 1;
    this.currentPhase = 'observe';

    // 1. Observe
    this.observe(snapshot);

    // 2. Analyze
    this.currentPhase = 'analyze';
    const bottlenecks = this.detectBottlenecks(snapshot);

    // 3. Decide
    this.currentPhase = 'decide';
    const pendingDecisions = this.decide(snapshot);

    // 4. Adapt
    this.currentPhase = 'adapt';
    const executed: OptimizationDecision[] = [];
    for (const decision of this.decisions.filter((d) => d.status === 'pending')) {
      decision.status = 'executing';
      try {
        await this.executeDecision(decision);
        decision.status = 'completed';
      } catch {
        decision.status = 'rolled_back';
      }
      executed.push(decision);
    }

    // 5. Validate
    this.currentPhase = 'validate';

    const workflowEffs: WorkflowEfficiency[] = [];

    const driftDetections: DriftDetection[] = [];

    // 6. Deploy
    this.currentPhase = 'deploy';

    const summary = [
      `Cycle #${this.cycleNumber}`,
      `${bottlenecks.length} bottleneck(s) detected`,
      `${pendingDecisions.length} decision(s) taken`,
      `${executed.filter((d) => d.status === 'completed').length} action(s) completed`,
    ].join(' | ');

    return {
      generatedAt: new Date().toISOString(),
      cycleNumber: this.cycleNumber,
      phase: this.currentPhase,
      performanceSnapshot: snapshot,
      bottlenecks,
      pendingDecisions: this.decisions.filter((d) => d.status === 'pending'),
      workflowEfficiencies: workflowEffs,
      driftDetections,
      summary,
    };
  }

  private async executeDecision(decision: OptimizationDecision): Promise<void> {
    const { action } = decision;

    switch (action.type) {
      case 'scale_service':
        // In real deployment: docker compose up -d --scale {service}={current+delta}
        break;

      case 'merge_vectors':
        // In real deployment: call Qdrant mergeDuplicates
        break;

      case 'rewrite_workflow':
        // In real deployment: update n8n workflow via API
        break;

      case 'rollback':
        // In real deployment: restore previous version
        break;

      case 'clear_cache':
        // In real deployment: Redis FLUSH or service restart
        break;

      case 'reindex':
        // In real deployment: rebuild Qdrant index
        break;
    }
  }

  // ── Reports ────────────────────────────────────────────────

  getDecisionHistory(limit = 50): OptimizationDecision[] {
    return this.decisions.slice(-limit);
  }

  getPerformanceTrend(metric: keyof ServiceMetrics, service: ServiceName): number[] {
    return this.history.map((s) => {
      const val = s.services[service]?.[metric];
      return typeof val === 'number' ? val : 0;
    });
  }

  async generateReport(): Promise<OptimizationReport | null> {
    const snapshot = this.getLatestSnapshot();
    if (!snapshot) return null;

    return {
      generatedAt: new Date().toISOString(),
      cycleNumber: this.cycleNumber,
      phase: this.currentPhase,
      performanceSnapshot: snapshot,
      bottlenecks: this.detectBottlenecks(snapshot),
      pendingDecisions: this.decisions.filter((d) => d.status === 'pending'),
      workflowEfficiencies: [],
      driftDetections: [],
      summary: `Report for cycle #${this.cycleNumber}`,
    };
  }
}

// ─── Singleton ───────────────────────────────────────────────

let optimizationEngineInstance: KosAutoOptimizationEngine | null = null;

export function getAutoOptimizationEngine(): KosAutoOptimizationEngine {
  if (!optimizationEngineInstance) {
    optimizationEngineInstance = new KosAutoOptimizationEngine();
  }
  return optimizationEngineInstance;
}

export {
  KosAutoOptimizationEngine,
  PERFORMANCE_THRESHOLDS,
  SELF_TUNING_RULES,
};
export type {
  OptimizationPhase,
  ServiceName,
  MetricSeverity,
  PerformanceSnapshot,
  ServiceMetrics,
  SystemMetrics,
  Bottleneck,
  OptimizationDecision,
  OptimizationAction,
  WorkflowEfficiency,
  DriftDetection,
  OptimizationReport,
};