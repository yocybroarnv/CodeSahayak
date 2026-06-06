import { Router } from 'express';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { GurujiService } from '../services/gurujii.js';

const router = Router();

// Apply authentication middleware to all AI routes
router.use(authenticate);

// POST /api/ai/explain
router.post('/explain', async (req: AuthRequest, res) => {
  try {
    const { code, language, userLanguage, concept } = req.body;
    const result = await GurujiService.analyzeCode({
      code: code || '',
      message: concept ? `Please explain the concept of ${concept} in this code` : 'Please explain this code in detail',
      language: userLanguage || language || 'en',
    });
    res.json({ explanation: result.explanation });
  } catch (error) {
    console.error('AI Explain route error:', error);
    res.status(500).json({ error: 'Failed to explain code' });
  }
});

// POST /api/ai/hint
router.post('/hint', async (req: AuthRequest, res) => {
  try {
    const { code, attempt, userLanguage } = req.body;
    const result = await GurujiService.analyzeCode({
      code: code || '',
      message: `Give me a hint about how to improve this code (attempt ${attempt || 1})`,
      language: userLanguage || 'en',
    });
    res.json({ hint: result.explanation });
  } catch (error) {
    console.error('AI Hint route error:', error);
    res.status(500).json({ error: 'Failed to get hint' });
  }
});

// POST /api/ai/debug
router.post('/debug', async (req: AuthRequest, res) => {
  try {
    const { code, error, language, userLanguage, step } = req.body;
    const result = await GurujiService.analyzeCode({
      code: code || '',
      message: `Please debug this code and find any errors, specifically: ${error || 'unknown error'} (step ${step || 1})`,
      language: userLanguage || language || 'en',
    });
    res.json({
      title: `Debug Step ${step || 1}`,
      explanation: result.explanation,
    });
  } catch (error) {
    console.error('AI Debug route error:', error);
    res.status(500).json({ error: 'Failed to get debug help' });
  }
});

export default router;
