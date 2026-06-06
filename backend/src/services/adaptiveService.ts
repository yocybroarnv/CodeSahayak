// adaptiveService.ts — Knowledge graph + XP system
// From fixes_bundle1.py ADAPTIVE_SERVICE_TS

import prisma from '../lib/prisma.js';

export async function updateKnowledgeGraph({
  studentId,
  concept,
  passed,
  errorType,
  language = 'py',
}: {
  studentId: string;
  concept: string;
  passed: boolean;
  errorType: string | null;
  language?: string;
}) {
  // Use Progress table with concept as the topic, scoped by language
  const existing = await prisma.progress.findFirst({
    where: { userId: studentId, concept, language },
  });

  const attempts = (existing?.attempts ?? 0) + 1;
  const correctAttempts = (existing?.correctAttempts ?? 0) + (passed ? 1 : 0);
  const mastery = Math.min(Math.round((correctAttempts / attempts) * 100), 100);

  if (existing) {
    await prisma.progress.update({
      where: { id: existing.id },
      data: {
        masteryLevel: mastery,
        attempts,
        correctAttempts,
        lastAttemptAt: new Date(),
      },
    });
  } else {
    await prisma.progress.create({
      data: {
        userId: studentId,
        concept,
        language,
        masteryLevel: mastery,
        attempts,
        correctAttempts,
        lastAttemptAt: new Date(),
      },
    });
  }
}

export async function getRecommendations(studentId: string): Promise<string[]> {
  const progress = await prisma.progress.findMany({
    where: { userId: studentId },
    orderBy: { masteryLevel: 'asc' },
  });

  // Concepts with mastery < 60 and at least 1 attempt
  const weak = progress
    .filter((p) => p.masteryLevel < 60 && p.attempts > 0)
    .slice(0, 3)
    .map((p) => p.concept);

  return weak;
}

const XP_TABLE: Record<string, number> = {
  assignment_passed: 50,
  assignment_perfect: 100,
  daily_login: 10,
  concept_mastered: 75,
};

export function awardXp(
  currentXp: number,
  event: string | null
): { newXp: number; newLevel: number; leveledUp: boolean } {
  const gain = event ? (XP_TABLE[event] ?? 0) : 0;
  const newXp = currentXp + gain;
  const levelFn = (xp: number) => Math.max(1, Math.floor(1 + Math.sqrt(xp / 100)));
  const oldLevel = levelFn(currentXp);
  const newLevel = levelFn(newXp);
  return { newXp, newLevel, leveledUp: newLevel > oldLevel };
}
