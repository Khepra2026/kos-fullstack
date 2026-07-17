// ═══════════════════════════════════════════════════════════════
// KOS REGTECH AI™ — API Client Immunisé
// Axios + Retry automatique + Validation Zod + Logs structurés
// ISO 27001 A.14.2.1 — Secure Development Policy
// ═══════════════════════════════════════════════════════════════

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { z, type ZodSchema } from 'zod';
import { logger } from '@/core/logger';

// ── Types ──

interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatuses: number[];
}

interface ApiClientOptions {
  baseURL: string;
  timeout?: number;
  retry?: Partial<RetryConfig>;
  headers?: Record<string, string>;
  /** Token provider — appelé à chaque requête pour obtenir un token frais */
  getAuthToken?: () => Promise<string | null> | string | null;
}

interface SafeRequestOptions<T extends ZodSchema> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  schema: T;
  /** Override le retry global pour cette requête */
  retry?: Partial<RetryConfig>;
  /** Timeout spécifique pour cette requête */
  timeout?: number;
}

type SafeResult<T> =
  | { ok: true; data: T; response: AxiosResponse }
  | { ok: false; error: string; status?: number; details?: unknown };

// ── Defaults ──

const DEFAULT_RETRY: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

const REQUEST_ID_HEADER = 'X-KOS-Request-Id';

function generateRequestId(): string {
  return `kos-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function isRetryableError(error: AxiosError, retryableStatuses: number[]): boolean {
  // Timeout
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return true;

  // Erreur réseau
  if (!error.response && error.code !== 'ERR_CANCELED') return true;

  // Status retryable
  if (error.response && retryableStatuses.includes(error.response.status)) return true;

  return false;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Factory ──

export function createApiClient(options: ApiClientOptions): AxiosInstance {
  const retryConfig: RetryConfig = { ...DEFAULT_RETRY, ...options.retry };
  const log = logger.child({ module: 'api-client', baseURL: options.baseURL });

  const client = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout ?? 15000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  // ── Request Interceptor — Auth + RequestId + Log ──
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const reqId = generateRequestId();
      config.headers.set(REQUEST_ID_HEADER, reqId);

      // Inject auth token
      if (options.getAuthToken) {
        try {
          const token = await options.getAuthToken();
          if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (authErr) {
          log.warn('Failed to get auth token, proceeding without', { error: String(authErr) });
        }
      }

      log.debug(`${config.method?.toUpperCase()} ${config.url}`, {
        requestId: reqId,
        hasAuth: !!config.headers.get('Authorization'),
      });

      return config;
    },
    (error) => {
      log.error('Request interceptor error', error);
      return Promise.reject(error);
    },
  );

  // ── Response Interceptor — Log + metrics ──
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const reqId = response.config.headers.get(REQUEST_ID_HEADER);
      log.debug(`✓ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        requestId: reqId,
        status: response.status,
        duration: Date.now() - (response.config as Record<string, never> & { _startTime?: number })._startTime ?? 0,
      });
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as (InternalAxiosRequestConfig & { _retryCount?: number; _startTime?: number }) | undefined;

      if (config) {
        config._retryCount = (config._retryCount ?? 0) + 1;

        if (config._retryCount <= retryConfig.maxRetries && isRetryableError(error, retryConfig.retryableStatuses)) {
          const waitMs = retryConfig.retryDelay * Math.pow(2, config._retryCount - 1); // Exponential backoff
          log.warn(`Retry ${config._retryCount}/${retryConfig.maxRetries} in ${waitMs}ms`, {
            url: config.url,
            status: error.response?.status,
            error: error.message,
          });

          await delay(waitMs);
          return client(config);
        }
      }

      // Log l'erreur finale
      log.error(`✗ ${error.response?.status ?? 'NETWORK'} ${config?.method?.toUpperCase()} ${config?.url}`, error, {
        status: error.response?.status,
        url: config?.url,
        retriesExhausted: (config?._retryCount ?? 0) >= retryConfig.maxRetries,
      });

      return Promise.reject(error);
    },
  );

  return client;
}

// ── Safe Request Wrapper — Zod validation + error handling ──

export async function safeRequest<T extends ZodSchema>(
  client: AxiosInstance,
  options: SafeRequestOptions<T>,
): Promise<SafeResult<z.infer<T>>> {
  const log = logger.child({ module: 'safe-request', url: options.url });

  try {
    const response = await client({
      method: options.method,
      url: options.url,
      data: options.data,
      params: options.params,
      timeout: options.timeout,
    });

    // Validation Zod
    const parseResult = options.schema.safeParse(response.data);

    if (!parseResult.success) {
      log.warn('Schema validation failed', {
        url: options.url,
        issues: parseResult.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
      });
      return {
        ok: false,
        error: `Invalid response shape: ${parseResult.error.issues.map((i) => i.message).join('; ')}`,
        status: response.status,
        details: parseResult.error.issues,
      };
    }

    return { ok: true, data: parseResult.data, response };
  } catch (err) {
    const axiosErr = err as AxiosError;
    return {
      ok: false,
      error: axiosErr.message ?? 'Unknown request error',
      status: axiosErr.response?.status,
      details: axiosErr.response?.data,
    };
  }
}

// ── Instance API KOS par défaut ──

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined;

export const kosApiClient = createApiClient({
  baseURL: supabaseUrl ? `${supabaseUrl}/functions/v1` : '/api',
  timeout: 20000,
  retry: { maxRetries: 2, retryDelay: 800 },
});

export default createApiClient;