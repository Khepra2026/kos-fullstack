export interface HealthCheck {
  id?: string;
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  message?: string;
  last_checked?: string;
  latency_ms?: number;
}

export interface OrchestratorKPI {
  total_executions?: number;
  success_rate?: number;
  avg_duration_ms?: number;
  active_workflows?: number;
  failed_last_24h?: number;
  recovery_rate?: number;
}

export interface PipelineState {
  id: number | string;
  current_state: string;
  metadata?: unknown;
  content_id?: string;
  started_at?: string;
  updated_at?: string;
  retry_count: number;
  max_retries: number;
  circuit_open: boolean;
  error_message?: string;
}

export interface PipelineEvent {
  id?: string;
  state_id?: number;
  event_type: string;
  event_data?: unknown;
  created_at?: string;
}

export interface FailedJob {
  id?: string;
  state_id?: number;
  error_message: string;
  failed_at?: string;
  recovery_action?: string;
}