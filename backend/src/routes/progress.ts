import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/progress/stats - Get user's overall progress stats
router.get('/stats', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;

    const progress = await prisma.progress.findMany({
      where: { userId },
    });

    const stats = {
      totalConcepts: progress.length,
      masteredConcepts: progress.filter(p => p.masteryLevel >= 80).length,
      learningConcepts: progress.filter(p => p.masteryLevel >= 40 && p.masteryLevel < 80).length,
      startedConcepts: progress.filter(p => p.masteryLevel > 0 && p.masteryLevel < 40).length,
      totalAttempts: progress.reduce((sum, p) => sum + p.attempts, 0),
      correctAttempts: progress.reduce((sum, p) => sum + p.correctAttempts, 0),
      averageMastery: progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + p.masteryLevel, 0) / progress.length)
        : 0,
    };

    // Get progress by language
    const byLanguage = progress.reduce((acc, p) => {
      if (!acc[p.language]) {
        acc[p.language] = { concepts: 0, avgMastery: 0 };
      }
      acc[p.language].concepts++;
      acc[p.language].avgMastery += p.masteryLevel;
      return acc;
    }, {} as Record<string, { concepts: number; avgMastery: number }>);

    // Calculate averages
    Object.keys(byLanguage).forEach(lang => {
      byLanguage[lang].avgMastery = Math.round(byLanguage[lang].avgMastery / byLanguage[lang].concepts);
    });

    res.json({ stats, byLanguage });
  } catch (error) {
    console.error('Get progress stats error:', error);
    res.status(500).json({ error: 'Failed to get progress stats' });
  }
});

// GET /api/progress/concepts - Get all concepts progress
router.get('/concepts', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const language = req.query.language as string;

    const where: { userId: string; language?: string } = { userId };
    if (language) where.language = language;

    const progress = await prisma.progress.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ progress });
  } catch (error) {
    console.error('Get concepts progress error:', error);
    res.status(500).json({ error: 'Failed to get concepts progress' });
  }
});

// POST /api/progress/track - Track concept progress
router.post('/track', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      concept: z.string(),
      language: z.string(),
      isCorrect: z.boolean(),
      hintsUsed: z.number().default(0),
    });

    const { concept, language, isCorrect, hintsUsed } = schema.parse(req.body);
    const userId = req.user!.userId;

    // Get existing progress
    const existing = await prisma.progress.findUnique({
      where: {
        userId_concept_language: {
          userId,
          concept,
          language,
        },
      },
    });

    // Calculate new mastery level
    let masteryDelta = isCorrect ? 15 : 5;
    if (hintsUsed > 0) masteryDelta -= hintsUsed * 3;
    masteryDelta = Math.max(1, masteryDelta);

    const newMastery = Math.min(100, (existing?.masteryLevel || 0) + masteryDelta);

    const progress = await prisma.progress.upsert({
      where: {
        userId_concept_language: {
          userId,
          concept,
          language,
        },
      },
      update: {
        masteryLevel: newMastery,
        attempts: { increment: 1 },
        correctAttempts: isCorrect ? { increment: 1 } : undefined,
        lastAttemptAt: new Date(),
      },
      create: {
        userId,
        concept,
        language,
        masteryLevel: newMastery,
        attempts: 1,
        correctAttempts: isCorrect ? 1 : 0,
        lastAttemptAt: new Date(),
      },
    });

    // Update user XP and streak
    const xpGain = isCorrect ? 10 : 2;
    
    // Check if user was active yesterday for streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastActive: true, streak: true },
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const lastActive = user?.lastActive ? new Date(user.lastActive) : null;
    lastActive?.setHours(0, 0, 0, 0);

    let newStreak = user?.streak || 0;
    if (lastActive && lastActive.getTime() === yesterday.getTime()) {
      newStreak++;
    } else if (!lastActive || lastActive.getTime() < yesterday.getTime()) {
      newStreak = 1;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGain },
        streak: newStreak,
        lastActive: new Date(),
      },
    });

    // Check for level up
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, level: true },
    });

    let leveledUp = false;
    if (updatedUser) {
      const newLevel = Math.floor(updatedUser.xp / 100) + 1;
      if (newLevel > updatedUser.level) {
        await prisma.user.update({
          where: { id: userId },
          data: { level: newLevel },
        });
        leveledUp = true;
      }
    }

    res.json({
      progress,
      xpGain,
      newStreak,
      leveledUp,
      newLevel: leveledUp ? (updatedUser?.level || 0) + 1 : undefined,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Track progress error:', error);
    res.status(500).json({ error: 'Failed to track progress' });
  }
});

// GET /api/progress/leaderboard - Get leaderboard
router.get('/leaderboard', authenticate, async (req: AuthRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

    const leaders = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        avatar: true,
        xp: true,
        level: true,
        streak: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
    });

    // Add rank
    const ranked = leaders.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: ranked });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

export default router;
