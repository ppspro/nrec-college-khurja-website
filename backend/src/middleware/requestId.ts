import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

/**
 * Attaches a unique X-Request-ID header to every request and response.
 * Uses the client-supplied value if present, otherwise generates a new UUID v4.
 *
 * The requestId is available via `req.requestId` in all downstream middleware
 * and controllers.
 */

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }
}

export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const id = (req.headers['x-request-id'] as string) || randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-ID', id);
  next();
};
