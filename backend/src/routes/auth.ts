import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { generateToken } from '../lib/jwt.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { setCsrfCookie } from '../middleware/csrf.js';
import { blacklistToken } from '../lib/tokenBlacklist.js';

const router = Router();

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['STUDENT', 'TEACHER']).default('STUDENT'),
  language: z.string().default('en'),
  institution: z.string().optional(),
  department: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/auth/signup or /api/auth/register
router.post(['/signup', '/register'], async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      res.status(409).json({ error: 'User already exists with this email' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
        language: data.language,
        institution: data.institution,
        department: data.department,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        language: true,
        isPro: true,
        streak: true,
        xp: true,
        level: true,
        createdAt: true,
      }
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set CSRF cookie for state-changing requests
    const csrfToken = setCsrfCookie(res);

    res.status(201).json({
      message: 'User created successfully',
      user,
      token,
      csrfToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set CSRF cookie
    const csrfToken = setCsrfCookie(res);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
      csrfToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        language: true,
        avatar: true,
        isPro: true,
        proExpiresAt: true,
        streak: true,
        lastActive: true,
        xp: true,
        level: true,
        institution: true,
        department: true,
        createdAt: true,
      }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req: AuthRequest, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
    if (token) {
      await blacklistToken(token);
    }
    // Clear CSRF cookie
    res.clearCookie('csrf_token');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.json({ message: 'Logout successful' }); // Always succeed
  }
});

// PUT /api/auth/profile
router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const updateSchema = z.object({
      name: z.string().min(2).optional(),
      language: z.string().optional(),
      avatar: z.string().optional(),
      institution: z.string().optional(),
      department: z.string().optional(),
    });

    const data = updateSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        language: true,
        avatar: true,
        institution: true,
        department: true,
      }
    });

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
