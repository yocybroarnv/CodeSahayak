import axios from 'axios';

// Gurujii API configuration
const GURUJII_API_URL = process.env.GURUJII_API_URL || 'http://localhost:5000';

interface GurujiRequest {
  code: string;
  message: string;
  language?: string;
}

interface GurujiResponse {
  explanation: string;
  hasError: boolean;
  errorType?: string;
  voiceUrl?: string;
  detectedLanguage: string;
}

const TIMEOUT = process.env.NODE_ENV === 'test' ? 1000 : 30000;
const HEALTH_TIMEOUT = process.env.NODE_ENV === 'test' ? 1000 : 5000;

export class GurujiService {
  /**
   * Send code and message to Gurujii for analysis
   */
  static async analyzeCode(data: GurujiRequest): Promise<GurujiResponse> {
    try {
      const response = await axios.post(`${GURUJII_API_URL}/api/gurujii/analyze`, {
        code: data.code,
        message: data.message,
        language: data.language || 'en',
      }, {
        timeout: TIMEOUT,
      });

      return response.data;
    } catch (error) {
      console.error('Gurujii API Error:', error);
      
      // Fallback response if Gurujii API is unavailable
      return {
        explanation: 'Gurujii is currently unavailable. Please try again later.',
        hasError: false,
        detectedLanguage: data.language || 'en',
      };
    }
  }

  /**
   * Get error explanation from Gurujii
   */
  static async explainError(code: string, error: string, language: string = 'en'): Promise<GurujiResponse> {
    try {
      const response = await axios.post(`${GURUJII_API_URL}/api/gurujii/explain-error`, {
        code,
        error,
        language,
      }, {
        timeout: TIMEOUT,
      });

      return response.data;
    } catch (err) {
      console.error('Gurujii Error Explanation Failed:', err);
      
      return {
        explanation: 'Unable to explain the error at this moment.',
        hasError: true,
        detectedLanguage: language,
      };
    }
  }

  /**
   * Get code suggestions from Gurujii
   */
  static async getSuggestions(code: string, context: string, language: string = 'en'): Promise<string> {
    try {
      const response = await axios.post(`${GURUJII_API_URL}/api/gurujii/suggest`, {
        code,
        context,
        language,
      }, {
        timeout: TIMEOUT,
      });

      return response.data.suggestion;
    } catch (error) {
      console.error('Gurujii Suggestions Failed:', error);
      return 'Unable to provide suggestions at this moment.';
    }
  }

  /**
   * Check if Gurujii API is available
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${GURUJII_API_URL}/health`, {
        timeout: HEALTH_TIMEOUT,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}
