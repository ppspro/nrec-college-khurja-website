import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Global error handler.
 *
 * - Returns a consistent JSON shape for all errors.
 * - Includes requestId for log correlation.
 * - Never leaks stack traces or internal details to clients in production.
 * - Logs the full error server-side with requestId.
 */
export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err.statusCode || 500;
  const requestId = req.requestId || 'unknown';

  // Determine client-facing message
  const isOperational = err.isOperational || statusCode < 500;
  const clientMessage = isOperational
    ? err.message || 'An error occurred'
    : 'Internal Server Error';

  // Log server-side with full detail
  logger.error('Unhandled error', {
    requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    error: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message: clientMessage,
    requestId,
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        error: err.message,
        stack: err.stack,
      },
    }),
  });
};

/**
 * 404 handler – catches any route that was not matched.
 */
export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
  const requestId = req.requestId || 'unknown';

  logger.warn('Route not found', {
    requestId,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    requestId,
  });
};

/**
 * Helper – creates an operational AppError with a given HTTP status code.
 * Use this in controllers for known error conditions.
 *
 * Example:
 *   throw createError(404, 'Department not found');
 */
export const createError = (statusCode: number, message: string): AppError => {
  const err = new Error(message) as AppError;
  err.statusCode = statusCode;
  err.isOperational = true;
  return err;
};
