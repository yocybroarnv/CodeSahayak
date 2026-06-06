import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { GurujiService } from '../services/gurujii.js';
import axios from 'axios';

const GURUJII_API_URL = process.env.GURUJII_API_URL || 'http://localhost:5000';

const router = Router();

/**
 * POST /api/gurujii/analyze
 * Analyze code and provide explanation
 */
router.post('/analyze', authenticate, async (req, res) => {
  try {
    const { code, message, language } = req.body;

    if (!code && !message) {
      return res.status(400).json({
        error: 'Code or message is required',
      });
    }

    const result = await GurujiService.analyzeCode({
      code: code || '',
      message: message || '',
      language: language || 'en',
    });

    res.json(result);
  } catch (error) {
    console.error('Gurujii analyze error:', error);
    res.status(500).json({
      error: 'Failed to analyze code',
    });
  }
});

/**
 * POST /api/gurujii/explain-error
 * Explain a specific error
 */
router.post('/explain-error', authenticate, async (req, res) => {
  try {
    const { code, error, language } = req.body;

    if (!code || !error) {
      return res.status(400).json({
        error: 'Code and error are required',
      });
    }

    const result = await GurujiService.explainError(code, error, language || 'en');

    res.json(result);
  } catch (err) {
    console.error('Gurujii explain error:', err);
    res.status(500).json({
      error: 'Failed to explain error',
    });
  }
});

/**
 * POST /api/gurujii/suggest
 * Get code suggestions
 */
router.post('/suggest', authenticate, async (req, res) => {
  try {
    const { code, context, language } = req.body;

    if (!code) {
      return res.status(400).json({
        error: 'Code is required',
      });
    }

    const suggestion = await GurujiService.getSuggestions(
      code,
      context || '',
      language || 'en'
    );

    res.json({ suggestion });
  } catch (error) {
    console.error('Gurujii suggest error:', error);
    res.status(500).json({
      error: 'Failed to get suggestions',
    });
  }
});

/**
 * GET /api/gurujii/health
 * Check Gurujii service health
 */
router.get('/health', async (req, res) => {
  try {
    const isHealthy = await GurujiService.healthCheck();
    
    res.json({
      status: isHealthy ? 'healthy' : 'unavailable',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * POST /api/gurujii/stream-voice-explain
 * Stream voice explanation (proxies directly to Python backend)
 */
router.post('/stream-voice-explain', authenticate, async (req, res) => {
  try {
    const { code, message, language } = req.body;

    if (!code) {
      return res.status(400).json({
        error: 'Code is required',
      });
    }

    // Call the Python server stream-voice-explain endpoint using axios
    const response = await axios.post(`${GURUJII_API_URL}/api/gurujii/stream-voice-explain`, {
      code,
      message,
      language: language || 'en',
    }, {
      responseType: 'arraybuffer', // Ensure we receive raw binary WAV bytes
      timeout: 60000, // 60 seconds timeout
    });

    // Extract custom header
    const explanationHeader = response.headers['x-gurujii-explanation'];
    if (explanationHeader) {
      res.setHeader('X-Gurujii-Explanation', explanationHeader);
      res.setHeader('Access-Control-Expose-Headers', 'X-Gurujii-Explanation');
    }

    res.setHeader('Content-Type', 'audio/wav');
    res.send(response.data);
  } catch (error: any) {
    console.error('Gurujii stream error:', error?.message);
    res.status(500).json({
      error: 'Failed to stream explanation from AI voice agent',
      details: error?.message,
    });
  }
});

export default router;
