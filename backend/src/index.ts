import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import paymentRoutes from './routes/payment.js';
import assignmentRoutes from './routes/assignment.js';
import progressRoutes from './routes/progress.js';
import gurujiiRoutes from './routes/gurujii.js';
import teacherRoutes from './routes/teacher.js';
import curriculumRoutes from './routes/curriculum.js';
import aiRoutes from './routes/ai.js';
import { csrfMiddleware } from './middleware/csrf.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Cookie parser (needed for CSRF)
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  skip: (req) => process.env.NODE_ENV === 'test' && req.headers['x-bypass-rate-limit'] === 'true',
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CSRF protection (after body parsing, before routes)
app.use(csrfMiddleware);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/gurujii', gurujiiRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/curriculum', curriculumRoutes);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 CodeSahayak API running on port ${PORT}`);
    console.log(`   CSRF: enabled (dev mode skips check)`);
    console.log(`   Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  });
}

export { app };
export default app;
