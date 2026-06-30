/**
 * Structured JSON logger for NREC College Backend.
 *
 * Outputs one JSON object per line – compatible with any log aggregator
 * (Loki, CloudWatch, Datadog, ELK, etc.).
 *
 * Usage:
 *   import logger from '../utils/logger';
 *   logger.info('Server started', { port: 5000 });
 *   logger.error('DB error', { error: err.message });
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  requestId?: string;
  [key: string]: unknown;
}

const SERVICE_NAME = 'nrec-backend';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getMinLevel(): LogLevel {
  const env = process.env.LOG_LEVEL?.toLowerCase();
  if (env && env in LEVEL_ORDER) return env as LogLevel;
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

function write(level: LogLevel, message: string, meta: Record<string, unknown> = {}): void {
  const minLevel = getMinLevel();
  if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) return;

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    message,
    ...meta,
  };

  const line = JSON.stringify(entry);

  if (level === 'error') {
    process.stderr.write(line + '\n');
  } else {
    process.stdout.write(line + '\n');
  }
}

const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => write('debug', message, meta),
  info:  (message: string, meta?: Record<string, unknown>) => write('info',  message, meta),
  warn:  (message: string, meta?: Record<string, unknown>) => write('warn',  message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
};

export default logger;
