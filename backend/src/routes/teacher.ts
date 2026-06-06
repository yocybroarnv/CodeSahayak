// teacher.ts — Teacher-scoped routes with class ownership guard
// FIX7: Teacher only sees own classes

import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole, type AuthRequest } from '../middleware/auth.js';

const router = Router();

// All teacher routes require authentication and TEACHER role
router.use(authenticate);
router.use(requireRole(['TEACHER', 'ADMIN']));

/**
 * Asserts that the authenticated teacher owns (or has access to) this assignment.
 * Throws a 403 if not.
 */
async function assertOwnsAssignment(teacherId: string, assignmentId: string) {
  const assignment = await prisma.assignment.findFirst({
    where: { id: assignmentId, teacherId },
  });
  if (!assignment) throw { status: 403, message: 'Access denied to this assignment' };
  return assignment;
}

// GET /api/teacher/assignments — list teacher's own assignments
router.get('/assignments', async (req: AuthRequest, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { teacherId: req.user!.userId },
      include: {
        _count: { select: { submissions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ assignments });
  } catch (error) {
    console.error('List assignments error:', error);
    res.status(500).json({ error: 'Failed to list assignments' });
  }
});

// GET /api/teacher/assignments/:id/submissions — all submissions for one assignment
router.get('/assignments/:id/submissions', async (req: AuthRequest, res) => {
  try {
    const assignmentId = req.params.id as string;
    await assertOwnsAssignment(req.user!.userId, assignmentId);

    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      include: {
        student: {
          select: { id: true, name: true, email: true, language: true, xp: true, level: true },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    res.json({ submissions });
  } catch (err: any) {
    if (err.status === 403) return res.status(403).json({ error: err.message });
    console.error('Fetch submissions error:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// GET /api/teacher/assignments/:id/plagiarism-report
router.get('/assignments/:id/plagiarism-report', async (req: AuthRequest, res) => {
  try {
    const assignmentId = req.params.id as string;
    await assertOwnsAssignment(req.user!.userId, assignmentId);

    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      select: {
        id: true,
        studentId: true,
        code: true,
        status: true,
        score: true,
        originalityScore: true,
        isRenameOnly: true,
        isInstantPaste: true,
        maxSimilarity: true,
        submittedAt: true,
        student: { select: { name: true, email: true } },
      },
      orderBy: { originalityScore: 'asc' },
    });

    // Classify each submission
    const classified = submissions.map((s) => ({
      ...s,
      originalityFlag:
        (s.originalityScore ?? 100) < 40
          ? 'LIKELY_COPIED'
          : (s.originalityScore ?? 100) < 60
          ? 'REVIEW'
          : 'ORIGINAL',
    }));

    res.json({ submissions: classified });
  } catch (err: any) {
    if (err.status === 403) return res.status(403).json({ error: err.message });
    console.error('Plagiarism report error:', err);
    res.status(500).json({ error: 'Failed to generate plagiarism report' });
  }
});

// GET /api/teacher/assignments/:id/error-heatmap — cluster errors for this assignment
router.get('/assignments/:id/error-heatmap', async (req: AuthRequest, res) => {
  try {
    const assignmentId = req.params.id as string;
    await assertOwnsAssignment(req.user!.userId, assignmentId);

    // Fetch all failed/reviewed submissions
    const submissions = await prisma.submission.findMany({
      where: {
        assignmentId,
        status: { in: ['FAILED', 'REVIEWED'] },
      },
      select: { studentId: true, code: true, feedback: true, status: true },
    });

    // Try to call Gurujii clustering endpoint if available
    try {
      const gurujiiUrl = process.env.GURUJII_API_URL || 'http://localhost:5000';
      const clusterRes = await fetch(`${gurujiiUrl}/api/internal/cluster-errors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions }),
        signal: AbortSignal.timeout(5000),
      });
      if (clusterRes.ok) {
        return res.json(await clusterRes.json());
      }
    } catch {
      // Gurujii unavailable — return basic stats
    }

    // Fallback: basic error grouping by status
    const groups: Record<string, number> = {};
    for (const sub of submissions) {
      const key = sub.status;
      groups[key] = (groups[key] ?? 0) + 1;
    }
    
    res.json({
      clusters: Object.entries(groups).map(([errorType, count]) => ({
        conceptId: 'unknown',
        errorType,
        count,
        studentCount: count,
      })),
      insight: `${submissions.length} failed submissions found. Connect Gurujii API for detailed clustering.`,
    });
  } catch (err: any) {
    if (err.status === 403) return res.status(403).json({ error: err.message });
    console.error('Error heatmap error:', err);
    res.status(500).json({ error: 'Failed to generate error heatmap' });
  }
});

// POST /api/teacher/assignments — create assignment
router.post('/assignments', async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      syllabus: z.string().default('NCERT'),
      subject: z.string().default('Computer Science'),
      difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
      dueDate: z.string().optional(),
      starterCode: z.string().optional(),
      testCases: z.string().optional(),
    });

    const data = schema.parse(req.body);

    const assignment = await prisma.assignment.create({
      data: {
        ...data,
        teacherId: req.user!.userId,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
    });

    res.status(201).json({ assignment });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Create assignment error:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// GET /api/teacher/stats — overview stats for the teacher
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const [totalAssignments, totalSubmissions, students] = await Promise.all([
      prisma.assignment.count({ where: { teacherId: req.user!.userId } }),
      prisma.submission.count({
        where: { assignment: { teacherId: req.user!.userId } },
      }),
      prisma.submission.findMany({
        where: { assignment: { teacherId: req.user!.userId } },
        select: { studentId: true },
        distinct: ['studentId'],
      }),
    ]);

    const passedSubmissions = await prisma.submission.count({
      where: {
        assignment: { teacherId: req.user!.userId },
        status: 'PASSED',
      },
    });

    res.json({
      stats: {
        totalAssignments,
        totalSubmissions,
        totalStudents: students.length,
        passRate: totalSubmissions > 0
          ? Math.round((passedSubmissions / totalSubmissions) * 100)
          : 0,
      },
    });
  } catch (error) {
    console.error('Teacher stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

export default router;
