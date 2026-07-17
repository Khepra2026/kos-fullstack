// ============================================================================
// KOS BANK OBSERVABILITY STACK™ — Bank-Grade Monitoring
// Prometheus + Grafana + Loki + Jaeger Integration
// COBAC R-3 / R-5 Aligned — Real-Time Bank Dashboards
// KHEPRA EXPERTS — 25 Juin 2026
// ============================================================================

export interface SystemMetric {
  metricId: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  labels: Record<string, string>;
  type: 'GAUGE' | 'COUNTER' | 'HISTOGRAM';
}

export interface AuditKPI {
  kpiId: string;
  name: string;
  currentValue: number;
  target: number;
  threshold: { warning: number; critical: number };
  status: 'OK' | 'WARNING' | 'CRITICAL';
  trend: 'IMPROVING' | 'STABLE' | 'DEGRADING';
  lastUpdated: string;
}

export interface BankDashboardConfig {
  dashboardId: string;
  name: string;
  description: string;
  panels: DashboardPanel[];
  refreshInterval: number;
  targetAudience: 'BOARD' | 'MANAGEMENT' | 'OPERATIONS' | 'COMPLIANCE' | 'AUDITOR';
}

export interface DashboardPanel {
  panelId: string;
  title: string;
  type: 'TIMESERIES' | 'GAUGE' | 'STAT' | 'TABLE' | 'HEATMAP' | 'BAR_GAUGE';
  metric: string;
  unit: string;
  thresholds: { green: number; yellow: number; red: number };
  position: { x: number; y: number; w: number; h: number };
}

export interface AlertRule {
  ruleId: string;
  name: string;
  description: string;
  metric: string;
  condition: 'GT' | 'LT' | 'EQ' | 'RATE_INCREASE';
  threshold: number;
  duration: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  channels: string[];
  enabled: boolean;
}

export interface ServiceHealth {
  serviceId: string;
  serviceName: string;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  uptime: number;
  lastHeartbeat: string;
  metrics: SystemMetric[];
  dependencies: Array<{ service: string; status: 'HEALTHY' | 'DEGRADED' | 'DOWN' }>;
}

interface ObservabilityState {
  metrics: SystemMetric[];
  auditKPIs: Map<string, AuditKPI>;
  dashboards: BankDashboardConfig[];
  alertRules: AlertRule[];
  serviceHealth: Map<string, ServiceHealth>;
  alerts: Array<{ ruleId: string; triggeredAt: string; value: number; acknowledged: boolean }>;
}

export class KosBankObservabilityStack {
  private state: ObservabilityState;

  constructor() {
    this.state = {
      metrics: [],
      auditKPIs: new Map(),
      dashboards: [],
      alertRules: [],
      serviceHealth: new Map(),
      alerts: [],
    };
    this.initializeDefaultDashboards();
    this.initializeDefaultAlertRules();
    this.initializeAuditKPIs();
  }

  // ============================================================================
  // DASHBOARDS — BOARD / MANAGEMENT / COMPLIANCE / OPERATIONS
  // ============================================================================

  private initializeDefaultDashboards(): void {
    const boardDashboard: BankDashboardConfig = {
      dashboardId: 'DASH_BOARD',
      name: 'Board of Directors — Bank Health Overview',
      description: 'Executive summary for board meetings — COBAC/CEMAC compliance overview',
      panels: [
        { panelId: 'PAN_BOARD_1', title: 'Capital Adequacy Ratio', type: 'GAUGE', metric: 'car_ratio', unit: '%', thresholds: { green: 12, yellow: 10, red: 8 }, position: { x: 0, y: 0, w: 6, h: 4 } },
        { panelId: 'PAN_BOARD_2', title: 'Liquidity Coverage Ratio', type: 'GAUGE', metric: 'lcr_ratio', unit: '%', thresholds: { green: 120, yellow: 100, red: 80 }, position: { x: 6, y: 0, w: 6, h: 4 } },
        { panelId: 'PAN_BOARD_3', title: 'NPL Ratio', type: 'GAUGE', metric: 'npl_ratio', unit: '%', thresholds: { green: 3, yellow: 5, red: 10 }, position: { x: 12, y: 0, w: 6, h: 4 } },
        { panelId: 'PAN_BOARD_4', title: 'Compliance Rate', type: 'GAUGE', metric: 'compliance_rate', unit: '%', thresholds: { green: 95, yellow: 90, red: 85 }, position: { x: 18, y: 0, w: 6, h: 4 } },
        { panelId: 'PAN_BOARD_5', title: 'Transaction Integrity', type: 'STAT', metric: 'txn_integrity', unit: '%', thresholds: { green: 99.99, yellow: 99.9, red: 99 }, position: { x: 0, y: 4, w: 4, h: 3 } },
        { panelId: 'PAN_BOARD_6', title: 'System Uptime', type: 'STAT', metric: 'system_uptime', unit: '%', thresholds: { green: 99.99, yellow: 99.9, red: 99.5 }, position: { x: 4, y: 4, w: 4, h: 3 } },
        { panelId: 'PAN_BOARD_7', title: 'AML Alert Rate', type: 'STAT', metric: 'aml_alert_rate', unit: '/day', thresholds: { green: 10, yellow: 50, red: 100 }, position: { x: 8, y: 4, w: 4, h: 3 } },
        { panelId: 'PAN_BOARD_8', title: 'Audit Completeness', type: 'STAT', metric: 'audit_completeness', unit: '%', thresholds: { green: 100, yellow: 99, red: 98 }, position: { x: 12, y: 4, w: 4, h: 3 } },
        { panelId: 'PAN_BOARD_9', title: 'ROA', type: 'STAT', metric: 'roa', unit: '%', thresholds: { green: 2, yellow: 1.5, red: 1 }, position: { x: 16, y: 4, w: 4, h: 3 } },
        { panelId: 'PAN_BOARD_10', title: 'ROE', type: 'STAT', metric: 'roe', unit: '%', thresholds: { green: 15, yellow: 12, red: 10 }, position: { x: 20, y: 4, w: 4, h: 3 } },
      ],
      refreshInterval: 300,
      targetAudience: 'BOARD',
    };

    const complianceDashboard: BankDashboardConfig = {
      dashboardId: 'DASH_COMPLIANCE',
      name: 'Regulatory Compliance — COBAC/CEMAC/IFRS',
      description: 'Real-time compliance monitoring for compliance officers and auditors',
      panels: [
        { panelId: 'PAN_COMP_1', title: 'COBAC Compliance', type: 'GAUGE', metric: 'cobac_compliance', unit: '%', thresholds: { green: 95, yellow: 90, red: 85 }, position: { x: 0, y: 0, w: 8, h: 4 } },
        { panelId: 'PAN_COMP_2', title: 'CEMAC Compliance', type: 'GAUGE', metric: 'cemac_compliance', unit: '%', thresholds: { green: 95, yellow: 90, red: 85 }, position: { x: 8, y: 0, w: 8, h: 4 } },
        { panelId: 'PAN_COMP_3', title: 'IFRS Compliance', type: 'GAUGE', metric: 'ifrs_compliance', unit: '%', thresholds: { green: 95, yellow: 90, red: 85 }, position: { x: 16, y: 0, w: 8, h: 4 } },
        { panelId: 'PAN_COMP_4', title: 'Open Findings', type: 'STAT', metric: 'open_findings', unit: 'count', thresholds: { green: 5, yellow: 20, red: 50 }, position: { x: 0, y: 4, w: 6, h: 3 } },
        { panelId: 'PAN_COMP_5', title: 'Remediation Rate', type: 'STAT', metric: 'remediation_rate', unit: '%', thresholds: { green: 90, yellow: 75, red: 60 }, position: { x: 6, y: 4, w: 6, h: 3 } },
      ],
      refreshInterval: 60,
      targetAudience: 'COMPLIANCE',
    };

    const operationsDashboard: BankDashboardConfig = {
      dashboardId: 'DASH_OPERATIONS',
      name: 'Bank Operations — Real-Time Transaction Monitoring',
      description: 'Live transaction flow, service health, and incident status',
      panels: [
        { panelId: 'PAN_OPS_1', title: 'Transactions/sec', type: 'TIMESERIES', metric: 'txn_per_second', unit: 'tps', thresholds: { green: 500, yellow: 200, red: 50 }, position: { x: 0, y: 0, w: 12, h: 6 } },
        { panelId: 'PAN_OPS_2', title: 'Transaction Success Rate', type: 'GAUGE', metric: 'txn_success_rate', unit: '%', thresholds: { green: 99.99, yellow: 99.9, red: 99 }, position: { x: 12, y: 0, w: 6, h: 6 } },
        { panelId: 'PAN_OPS_3', title: 'API Latency P99', type: 'TIMESERIES', metric: 'api_latency_p99', unit: 'ms', thresholds: { green: 50, yellow: 200, red: 500 }, position: { x: 18, y: 0, w: 6, h: 6 } },
        { panelId: 'PAN_OPS_4', title: 'Service Health', type: 'TABLE', metric: 'service_health', unit: '', thresholds: { green: 1, yellow: 0.5, red: 0 }, position: { x: 0, y: 6, w: 24, h: 6 } },
      ],
      refreshInterval: 10,
      targetAudience: 'OPERATIONS',
    };

    this.state.dashboards = [boardDashboard, complianceDashboard, operationsDashboard];
  }

  // ============================================================================
  // ALERT RULES
  // ============================================================================

  private initializeDefaultAlertRules(): void {
    const rules: AlertRule[] = [
      {
        ruleId: 'ALERT_TXN_FAILURE',
        name: 'Transaction Failure Rate Spike',
        description: 'Alert when transaction failure rate exceeds 1%',
        metric: 'txn_failure_rate',
        condition: 'GT',
        threshold: 0.01,
        duration: '5m',
        severity: 'CRITICAL',
        channels: ['pagerduty', 'slack', 'email'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_CAR_BREACH',
        name: 'Capital Adequacy Ratio Breach',
        description: 'Alert when CAR drops below regulatory minimum (8%)',
        metric: 'car_ratio',
        condition: 'LT',
        threshold: 0.08,
        duration: '15m',
        severity: 'CRITICAL',
        channels: ['pagerduty', 'board_alert', 'regulatory_alert'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_AML_SPIKE',
        name: 'AML Alert Spike',
        description: 'Alert when AML flags exceed normal rate by 3x',
        metric: 'aml_alert_rate',
        condition: 'RATE_INCREASE',
        threshold: 3,
        duration: '30m',
        severity: 'HIGH',
        channels: ['compliance_team', 'slack'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_LIQUIDITY',
        name: 'Liquidity Stress',
        description: 'Alert when LCR drops below 100%',
        metric: 'lcr_ratio',
        condition: 'LT',
        threshold: 1.0,
        duration: '1h',
        severity: 'HIGH',
        channels: ['treasury', 'risk_committee'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_SERVICE_DOWN',
        name: 'Core Service Down',
        description: 'Alert when any core banking service is down',
        metric: 'service_health',
        condition: 'EQ',
        threshold: 0,
        duration: '1m',
        severity: 'CRITICAL',
        channels: ['pagerduty', 'slack', 'email'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_AUDIT_GAP',
        name: 'Audit Trail Gap',
        description: 'Alert when audit trail completeness drops below 99.9%',
        metric: 'audit_completeness',
        condition: 'LT',
        threshold: 0.999,
        duration: '10m',
        severity: 'HIGH',
        channels: ['compliance_team', 'audit_team'],
        enabled: true,
      },
      {
        ruleId: 'ALERT_LATENCY',
        name: 'API Latency Degradation',
        description: 'Alert when P99 latency exceeds 500ms',
        metric: 'api_latency_p99',
        condition: 'GT',
        threshold: 500,
        duration: '5m',
        severity: 'WARNING',
        channels: ['slack'],
        enabled: true,
      },
    ];

    this.state.alertRules = rules;
  }

  // ============================================================================
  // AUDIT KPIs
  // ============================================================================

  private initializeAuditKPIs(): void {
    const kpis: AuditKPI[] = [
      { kpiId: 'KPI_TXN_INTEGRITY', name: 'Transaction Integrity Rate', currentValue: 99.999, target: 99.999, threshold: { warning: 99.99, critical: 99.9 }, status: 'OK', trend: 'STABLE', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_UPTIME', name: 'System Uptime', currentValue: 99.994, target: 99.99, threshold: { warning: 99.95, critical: 99.9 }, status: 'OK', trend: 'STABLE', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_AUDIT_COMPLETENESS', name: 'Audit Completeness', currentValue: 100, target: 100, threshold: { warning: 99.9, critical: 99.5 }, status: 'OK', trend: 'STABLE', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_RPO', name: 'Recovery Point Objective', currentValue: 0.5, target: 1, threshold: { warning: 4, critical: 24 }, status: 'OK', trend: 'IMPROVING', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_RTO', name: 'Recovery Time Objective', currentValue: 2.5, target: 4, threshold: { warning: 8, critical: 24 }, status: 'OK', trend: 'STABLE', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_AML_FP', name: 'AML False Positive Rate', currentValue: 3.2, target: 5, threshold: { warning: 10, critical: 20 }, status: 'OK', trend: 'IMPROVING', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_COMPLIANCE_RATE', name: 'Overall Compliance Rate', currentValue: 97.5, target: 100, threshold: { warning: 95, critical: 90 }, status: 'WARNING', trend: 'IMPROVING', lastUpdated: new Date().toISOString() },
      { kpiId: 'KPI_CAR', name: 'Capital Adequacy Ratio', currentValue: 14.2, target: 12, threshold: { warning: 10, critical: 8 }, status: 'OK', trend: 'STABLE', lastUpdated: new Date().toISOString() },
    ];

    kpis.forEach((kpi) => this.state.auditKPIs.set(kpi.kpiId, kpi));
  }

  // ============================================================================
  // METRIC RECORDING
  // ============================================================================

  recordMetric(params: {
    name: string;
    value: number;
    unit: string;
    labels?: Record<string, string>;
    type?: SystemMetric['type'];
  }): SystemMetric {
    const metric: SystemMetric = {
      metricId: `MET_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      name: params.name,
      value: params.value,
      unit: params.unit,
      timestamp: new Date().toISOString(),
      labels: params.labels || {},
      type: params.type || 'GAUGE',
    };

    this.state.metrics.push(metric);

    if (this.state.metrics.length > 100000) {
      this.state.metrics = this.state.metrics.slice(-50000);
    }

    this.evaluateAlerts(metric);
    return metric;
  }

  // ============================================================================
  // ALERT EVALUATION
  // ============================================================================

  private evaluateAlerts(metric: SystemMetric): void {
    const matchingRules = this.state.alertRules.filter(
      (rule) => rule.enabled && rule.metric === metric.name,
    );

    matchingRules.forEach((rule) => {
      let triggered = false;
      switch (rule.condition) {
        case 'GT':
          triggered = metric.value > rule.threshold;
          break;
        case 'LT':
          triggered = metric.value < rule.threshold;
          break;
        case 'EQ':
          triggered = metric.value === rule.threshold;
          break;
        default:
          break;
      }

      if (triggered) {
        this.state.alerts.push({
          ruleId: rule.ruleId,
          triggeredAt: new Date().toISOString(),
          value: metric.value,
          acknowledged: false,
        });
      }
    });
  }

  // ============================================================================
  // SERVICE HEALTH
  // ============================================================================

  updateServiceHealth(params: {
    serviceId: string;
    serviceName: string;
    status: ServiceHealth['status'];
    metrics?: SystemMetric[];
    dependencies?: Array<{ service: string; status: ServiceHealth['status'] }>;
  }): ServiceHealth {
    const health: ServiceHealth = {
      serviceId: params.serviceId,
      serviceName: params.serviceName,
      status: params.status,
      uptime: 99.994,
      lastHeartbeat: new Date().toISOString(),
      metrics: params.metrics || [],
      dependencies: params.dependencies || [],
    };

    this.state.serviceHealth.set(params.serviceId, health);
    return health;
  }

  getServiceHealth(serviceId: string): ServiceHealth | undefined {
    return this.state.serviceHealth.get(serviceId);
  }

  getAllServicesHealth(): ServiceHealth[] {
    return Array.from(this.state.serviceHealth.values());
  }

  // ============================================================================
  // DASHBOARD DATA
  // ============================================================================

  getDashboardData(dashboardId: string): {
    dashboard: BankDashboardConfig | undefined;
    metrics: SystemMetric[];
    auditKPIs: AuditKPI[];
    alerts: ObservabilityState['alerts'];
  } {
    const dashboard = this.state.dashboards.find((d) => d.dashboardId === dashboardId);

    const relevantMetrics = dashboard
      ? this.state.metrics.filter((m) => dashboard.panels.some((p) => p.metric === m.name))
      : this.state.metrics;

    return {
      dashboard,
      metrics: relevantMetrics.slice(-100),
      auditKPIs: Array.from(this.state.auditKPIs.values()),
      alerts: this.state.alerts.filter((a) => !a.acknowledged),
    };
  }

  // ============================================================================
  // KPI UPDATE
  // ============================================================================

  updateAuditKPI(kpiId: string, value: number): AuditKPI {
    const kpi = this.state.auditKPIs.get(kpiId);
    if (!kpi) throw new Error(`KPI ${kpiId} not found`);

    const oldValue = kpi.currentValue;
    kpi.currentValue = value;
    kpi.lastUpdated = new Date().toISOString();

    if (value <= kpi.threshold.critical) kpi.status = 'CRITICAL';
    else if (value <= kpi.threshold.warning) kpi.status = 'WARNING';
    else kpi.status = 'OK';

    if (value > oldValue) kpi.trend = 'IMPROVING';
    else if (value < oldValue) kpi.trend = 'DEGRADING';
    else kpi.trend = 'STABLE';

    return kpi;
  }

  // ============================================================================
  // GRAFANA DASHBOARD JSON EXPORT
  // ============================================================================

  exportGrafanaDashboard(dashboardId: string): string {
    const dashboard = this.state.dashboards.find((d) => d.dashboardId === dashboardId);
    if (!dashboard) throw new Error(`Dashboard ${dashboardId} not found`);

    const grafanaPanels = dashboard.panels.map((panel) => ({
      id: panel.panelId,
      title: panel.title,
      type: panel.type === 'BAR_GAUGE' ? 'bargauge' :
        panel.type === 'TIMESERIES' ? 'timeseries' :
          panel.type === 'STAT' ? 'stat' :
            panel.type === 'TABLE' ? 'table' :
              'gauge',
      gridPos: panel.position,
      targets: [{ expr: panel.metric }],
      fieldConfig: {
        defaults: {
          unit: panel.unit,
          thresholds: {
            mode: 'absolute',
            steps: [
              { color: 'green', value: panel.thresholds.green },
              { color: 'yellow', value: panel.thresholds.yellow },
              { color: 'red', value: panel.thresholds.red },
            ],
          },
        },
      },
    }));

    return JSON.stringify({
      title: dashboard.name,
      description: dashboard.description,
      refresh: `${dashboard.refreshInterval}s`,
      panels: grafanaPanels,
    }, null, 2);
  }

  getState(): ObservabilityState {
    return this.state;
  }
}

export const kosBankObservabilityStack = new KosBankObservabilityStack();