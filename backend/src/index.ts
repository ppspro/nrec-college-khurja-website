import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

import connectDB from './config/database';
import logger from './utils/logger';
import { requestId } from './middleware/requestId';
import { errorHandler, notFound } from './middleware/errorHandler';

// Version 1.0 Public & CMS Routes
import authRoutes from './routes/auth';
import settingsRoutes from './routes/settings';
import departmentRoutes from './routes/departments';
import courseRoutes from './routes/courses';
import facultyPublicRoutes from './routes/faculty';
import noticeRoutes from './routes/notices';
import newsRoutes from './routes/news';
import eventRoutes from './routes/events';
import curriculumRoutes from './routes/curriculum';
import downloadRoutes from './routes/downloads';
import galleryRoutes from './routes/gallery';
import contactRoutes from './routes/contact';
import pageRoutes from './routes/pages';
import mediaRoutes from './routes/media';
import menuRoutes from './routes/menus';

const app = express();

// Connect DB
connectDB();

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(requestId);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
      write: (message: string) => {
        logger.info('HTTP', { access: message.trim() });
      },
    },
    skip: (_req, res) => res.statusCode < 400 && process.env.NODE_ENV === 'production',
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Specific Auth Throttling
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 attempts per 15 min
  message: 'Too many login attempts from this IP, please try again later.'
});
app.use('/api/auth', authLimiter);

// Static files (uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ─── Health Check ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ─── API Routes (Version 1.0 Public & CMS) ────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/faculty', facultyPublicRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/menus', menuRoutes);

// ─── Error Handling ──────────────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ─── Server Startup ──────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || '5005', 10);

const server = app.listen(PORT, () => {
  logger.info('NREC College Website API started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  });
});

// ─── Graceful Shutdown ───────────────────────────────────────────────────────

const shutdown = (signal: string) => {
  logger.info(`${signal} received – shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception – shutting down', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection – shutting down', {
    reason: String(reason),
  });
  process.exit(1);
});

export default app;
