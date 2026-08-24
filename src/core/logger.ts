 // ═══════════════════════════════════════════════════════════════
 // KOS REGTECH AI™ — Logger Structuré (Pino-compatible Browser API)
 // Traçabilité complète front — ISO 27001 A.12.4.1 Event Logging
 // FIX: __READDY_VERSION_ID__ safe
 // ═══════════════════════════════════════════════════════════════

 type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

 interface LogEntry {
   level: LogLevel;
   time: string;
   msg: string;
   ctx?: Record<string, any>;
   err?: string;
   stack?: string;
 }

 interface LoggerOptions {
   level?: LogLevel;
   pretty?: boolean;
   remoteEndpoint?: string;
   appVersion?: string;
 }

 const LEVEL_WEIGHT: Record<LogLevel, number> = {
   trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60,
 };

 function safeSerialize(value: unknown): string {
   try { return JSON.stringify(value, null, 0); } catch { return '[Unserializable]'; }
 }
 function extractErrorStack(err: unknown): { message: string; stack: string } {
   if (err instanceof Error) return { message: err.message, stack: err.stack?? '' };
   return { message: safeSerialize(err), stack: '' };
 }

 class Logger {
   private minLevel: LogLevel;
   private pretty: boolean;
   private remoteEndpoint?: string;
   private appVersion: string;
   private buffer: LogEntry[] = [];
   private flushTimer: ReturnType<typeof setTimeout> | null = null;
   private readonly MAX_BUFFER = 50;
   constructor(options: LoggerOptions = {}) {
     this.minLevel = options.level?? (import.meta.env.DEV? 'debug' : 'info');
     this.pretty = options.pretty?? import.meta.env.DEV;
     this.remoteEndpoint = options.remoteEndpoint;
     this.appVersion = options.appVersion?? '0.0.0';
   }
   private shouldLog(level: LogLevel): boolean { return LEVEL_WEIGHT[level] >= LEVEL_WEIGHT[this.minLevel]; }
   private formatConsole(entry: LogEntry): void {
     const prefix = `[${entry.time}] ${entry.level.toUpperCase()}`;
     const ctxStr = entry.ctx? ` ${safeSerialize(entry.ctx)}` : '';
     if (this.pretty) {
       const styles: Record<LogLevel, string> = {
         trace: 'color: #9ca3af', debug: 'color: #6b7280', info: 'color: #3b82f6',
         warn: 'color: #f59e0b; font-weight: bold', error: 'color: #ef4444; font-weight: bold',
         fatal: 'color: #dc2626; font-weight: bold; background: #fef2f2',
       };
       console.log(`%c${prefix}%c ${entry.msg}${ctxStr}`, styles[entry.level], '');
       if (entry.err) console.error(` ↳ ${entry.err}`);
       if (entry.stack) console.debug(` ${entry.stack}`);
     } else {
       const json = safeSerialize({...entry, version: this.appVersion });
       const method = entry.level === 'error' || entry.level === 'fatal'? 'error' : 'log';
       console[method](json);
     }
   }
   private enqueueRemote(entry: LogEntry): void {
     if (!this.remoteEndpoint) return;
     this.buffer.push(entry);
     if (this.buffer.length >= this.MAX_BUFFER) this.flushRemote();
     else if (!this.flushTimer) this.flushTimer = setTimeout(() => this.flushRemote(), 2000);
   }
   private flushRemote(): void {
     if (this.flushTimer) { clearTimeout(this.flushTimer); this.flushTimer = null; }
     if (this.buffer.length === 0 ||!this.remoteEndpoint) return;
     const batch = [...this.buffer]; this.buffer = [];
     fetch(this.remoteEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: safeSerialize({ logs: batch, version: this.appVersion }), keepalive: true }).catch(() => {});
   }
   private log(level: LogLevel, msg: string, ctx?: Record<string, unknown>, err?: unknown): void {
     if (!this.shouldLog(level)) return;
     const entry: LogEntry = { level, time: new Date().toISOString(), msg, ctx };
     if (err) { const extracted = extractErrorStack(err); entry.err = extracted.message; entry.stack = extracted.stack; }
     this.formatConsole(entry); this.enqueueRemote(entry);
   }
   trace(msg: string, ctx?: Record<string, unknown>): void { this.log('trace', msg, ctx); }
   debug(msg: string, ctx?: Record<string, unknown>): void { this.log('debug', msg, ctx); }
   info(msg: string, ctx?: Record<string, unknown>): void { this.log('info', msg, ctx); }
   warn(msg: string, ctx?: Record<string, unknown>): void { this.log('warn', msg, ctx); }
   error(msg: string, err?: unknown, ctx?: Record<string, unknown>): void { this.log('error', msg, ctx, err); }
   fatal(msg: string, err?: unknown, ctx?: Record<string, unknown>): void { this.log('fatal', msg, ctx, err); }
   child(bindings: Record<string, unknown>): Logger {
     const childLogger = new Logger({ level: this.minLevel, pretty: this.pretty, remoteEndpoint: this.remoteEndpoint, appVersion: this.appVersion });
     const originalLog = childLogger.log.bind(childLogger);
     // @ts-ignore
     childLogger.log = (level, msg, ctx, err) => { originalLog(level, msg, {...bindings,...(ctx?? {}) }, err); };
     return childLogger;
   }
   flush(): void { this.flushRemote(); }
 }

 function getAppVersion(): string {
   try {
     // @ts-ignore
     const v = typeof __READDY_VERSION_ID__!== 'undefined'? __READDY_VERSION_ID__ : undefined;
     if (typeof v === 'string' && v.length > 0) return v;
     if (typeof v === 'number') return String(v);
     if (v && typeof v === 'object' && 'version' in v) {
       // @ts-ignore
       const inner = (v as any).version;
       if (typeof inner === 'string') return inner;
     }
     return '0.0.0';
   } catch {
     return '0.0.0';
   }
 }

 export const logger = new Logger({
   level: import.meta.env.DEV? 'debug' : 'info',
   pretty: import.meta.env.DEV,
   appVersion: getAppVersion(),
 });

 if (typeof window!== 'undefined') {
   window.addEventListener('error', (event) => {
     logger.fatal('Unhandled global error', event.error, { filename: event.filename, lineno: event.lineno, colno: event.colno });
   });
   window.addEventListener('unhandledrejection', (event) => {
     logger.fatal('Unhandled promise rejection', event.reason, { type: 'unhandledrejection' });
   });
   window.addEventListener('beforeunload', () => { logger.flush(); });
 }

 export default logger;
