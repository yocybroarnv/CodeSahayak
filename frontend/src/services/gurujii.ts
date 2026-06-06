import { useAuthStore } from '@/store/authStore';
import { analyzeOriginality } from '@/lib/plagiarismEngine';

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const GURUJII_API_URL = VITE_API_URL.replace(/\/api\/?$/, '');

export interface GurujiRequest {
  code: string;
  message: string;
  language?: string;
}

export interface GurujiResponse {
  explanation: string;
  hasError: boolean;
  errorType?: string;
  voiceUrl?: string;
  detectedLanguage: string;
}

const fallbacks: Record<string, string> = {
  en: "Gurujii is currently offline. Please check your syntax and try again.",
  hi: "गुरुजी वर्तमान में ऑफ़लाइन हैं। कृपया अपने सिंटैक्स की जांच करें और पुन: प्रयास करें।",
  ta: "குருஜி தற்போது ஆஃப்லைனில் உள்ளார். உங்கள் குறியீட்டைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
  bn: "গুরুজি এই মুহূর্তে অফলাইন আছেন। অনুগ্রহ করে আপনার কোড সিনট্যাক্স পরীক্ষা করুন এবং আবার চেষ্টা করুন।",
  te: "గురుజీ ప్రస్తుతం ఆఫ్-లైన్ లో ఉన్నారు. దయచేసి మీ సింటాక్స్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
  mr: "गुरुजी सध्या ऑफलाइन आहेत. कृपया तुमचे सिंटॅक्स तपासा आणि पुन्हा प्रयत्न करा.",
  gu: "ગુરુજી હાલમાં ઑફલાઇન છે. કૃપા કરીને તમારા સિન્ટેક્સ તપાસો અને ફરીથી પરીક્ષણ કરો.",
  kn: "ಗುರುಜಿ ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದಾರೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಿಂಟ್ಯಾಕ್ಸ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  ml: "ഗുരുജി ഇപ്പോൾ ഓഫ്‌ലൈനിലാണ്. നിങ്ങളുടെ വാക്യഘടന പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
  as: "গুৰুজী বৰ্তমান অফলাইনত আছে। অনুগ্ৰহ কৰি আপোনাৰ কোডৰ চিনটেক্স পৰীক্ষা কৰক আৰু পুনৰ চেষ্টা কৰক।",
  brx: "Gurujii is currently offline. Please check syntax and try again.",
  doi: "गुरुजी इस वेले ऑफलाइन न। अपनी सिंटैक्स जांची करी फेर कोशिश करो।",
  kas: "گُرو جی چھہِ ونہِ آف لائن۔ مہربانی کرتھ پنہہ سِنٹیکس سہی کرتھ دوبارہ کوشش کِریو۔",
  kok: "गुरुजी सध्या ऑफलाइन आसात. तुमचो सिंटॅक्स तपासून परत प्रयत्न करात.",
  mai: "गुरुजी वर्तमान मे ऑफलाइन छथि। अपन सिंटैक्स जाँइच कऽ पुनः प्रयास करू।",
  mni: "ꯒꯨꯔꯨꯖꯤ ꯍꯧꯖꯤꯛ ꯑꯣꯐꯂꯥꯏꯟ ꯑꯣꯏꯔꯤ ꯫ ꯆꯥꯟꯕꯤꯗꯨꯅꯥ ꯅꯍꯥꯛꯀꯤ ꯁꯤꯟꯇꯦꯛꯁ ꯌꯦꯡꯁꯤꯜꯂꯨ ꯑꯃꯁꯨꯡ ꯑꯃꯨꯛ ꯍꯟꯅꯥ ꯍꯣꯠꯅꯧ ꯫",
  ne: "गुरुजी हाल अफलाइन हुनुहुन्छ। कृपया आफ्नो सिंट्याक्स जाँच गरी फेरि प्रयास गर्नुहोस्।",
  or: "ଗୁରୁଜୀ ବର୍ତ୍ତମାନ ଅଫଲାଇନ ଅଛନ୍ତି। ଦୟାକରି ଆପଣଙ୍କ ସିଣ୍ଟାକ୍ସ ଯାଞ୍ଚ କରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।",
  pa: "ਗੁਰੂਜੀ ਇਸ ਸਮੇਂ ਔਫਲਾਈਨ ਹਨ। ਕਿਰਪา ਕਰਕੇ ਆਪਣੇ ਸਿੰਟੈਕਸ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
  sa: "गुरुजी सम्प्रति ऑफलाइन वर्तते। कृपया स्वकीय सिंटैक्स परिशोधय पुनर्प्रयतताम्।",
  sat: "Gurujii is currently offline. Please check syntax and try again.",
  sd: "گروجي هن وقت آف لائن آهي. مهرباني ڪري پنهنجي سنٽيڪس چيڪ ڪريو ۽ ٻيهر ڪوشش ڪريو.",
  ur: "گوروجی اس وقت آف لائن ہیں۔ براہ کرم اپنا سنٹیکس چیک کریں اور دوبارہ کوشش کریں۔"
};

export class GurujiService {
  private static activeAudio: HTMLAudioElement | null = null;
  private static activeAudioContext: AudioContext | null = null;
  private static activeAudioSource: AudioBufferSourceNode | null = null;

  /**
   * Helper fetch command supporting request timeouts
   */
  private static async fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 8000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  /**
   * Analyze code and get explanation from Gurujii
   */
  static async analyzeCode(data: GurujiRequest): Promise<GurujiResponse> {
    try {
      const token = useAuthStore.getState().token;
      const response = await this.fetchWithTimeout(`${GURUJII_API_URL}/api/gurujii/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Gurujii API Error:', error);
      const lang = data.language || 'en';
      return {
        explanation: fallbacks[lang] || fallbacks.en,
        hasError: false,
        detectedLanguage: lang,
      };
    }
  }

  /**
   * Get error explanation from Gurujii
   */
  static async explainError(code: string, error: string, language: string = 'en'): Promise<GurujiResponse> {
    try {
      const token = useAuthStore.getState().token;
      const response = await this.fetchWithTimeout(`${GURUJII_API_URL}/api/gurujii/explain-error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ code, error, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Gurujii Error Explanation Failed:', err);
      return {
        explanation: fallbacks[language] || fallbacks.en,
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
      const token = useAuthStore.getState().token;
      const response = await this.fetchWithTimeout(`${GURUJII_API_URL}/api/gurujii/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ code, context, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.suggestion;
    } catch (error) {
      console.error('Gurujii Suggestions Failed:', error);
      return fallbacks[language] || fallbacks.en;
    }
  }

  /**
   * Check if Gurujii API is available
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${GURUJII_API_URL}/health`, {
        method: 'GET',
      }, 3000);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Client-side Code Originality and Plagiarism analysis
   */
  static analyzeCodeOriginality(
    currentCode: string,
    referenceTemplate: string,
    telemetry: {
      characterCount: number;
      typingDurationMs: number;
      pasteCount: number;
      pastedCharCount: number;
      keystrokeTimestamps: number[];
    },
    language: string = 'javascript'
  ) {
    return analyzeOriginality(currentCode, referenceTemplate, telemetry, language);
  }

  /**
   * Play voice explanation (voiceUrl is served from Python app, normally http://localhost:5000)
   * Safely manages a single-threaded active audio mutex, pausing any currently running playbacks.
   */
  static playVoice(voiceUrl: string, onEnded?: () => void): void {
    this.stopVoice();

    if (!voiceUrl) {
      if (onEnded) onEnded();
      return;
    }
    
    const resolvedUrl = voiceUrl.startsWith('http') ? voiceUrl : `http://localhost:5000${voiceUrl}`;
    
    try {
      const audio = new Audio(resolvedUrl);
      this.activeAudio = audio;
      
      if (onEnded) {
        audio.onended = () => {
          if (this.activeAudio === audio) {
            this.activeAudio = null;
          }
          onEnded();
        };
        audio.onerror = () => {
          if (this.activeAudio === audio) {
            this.activeAudio = null;
          }
          onEnded();
        };
      }
      
      audio.play().catch(err => {
        console.error('Failed to play voice:', err);
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        if (onEnded) onEnded();
      });
    } catch (err) {
      console.error('Failed to instantiate Audio object:', err);
      if (onEnded) onEnded();
    }
  }

  /**
   * Cascading Binary voice streamer with Web Audio API hardware-accelerated playback
   * Returns decoded base64 explanation text via callback, and triggers onEnded when voice finishes.
   */
  static async streamVoiceExplain(
    data: GurujiRequest,
    onExplanation: (text: string) => void,
    onEnded?: () => void
  ): Promise<void> {
    try {
      this.stopVoice();

      const token = useAuthStore.getState().token;
      const response = await this.fetchWithTimeout(`${GURUJII_API_URL}/api/gurujii/stream-voice-explain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      }, 12000); // Higher timeout for streaming endpoints

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const explanationHeader = response.headers.get('X-Gurujii-Explanation');
      if (explanationHeader) {
        try {
          const decodedExplanation = decodeURIComponent(
            atob(explanationHeader)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          onExplanation(decodedExplanation);
        } catch (headerErr) {
          console.error('Error decoding X-Gurujii-Explanation header:', headerErr);
        }
      }

      const arrayBuffer = await response.arrayBuffer();
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('Web Audio API is not supported on this browser.');
      }

      const ctx = new AudioContextClass();
      this.activeAudioContext = ctx;

      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      this.activeAudioSource = source;

      if (onEnded) {
        source.onended = () => {
          if (this.activeAudioSource === source) {
            this.activeAudioSource = null;
          }
          if (this.activeAudioContext === ctx) {
            this.activeAudioContext = null;
            ctx.close().catch(() => {});
          }
          onEnded();
        };
      }

      source.start(0);
    } catch (error) {
      console.error('Gurujii Audio Streaming Error:', error);
      if (onEnded) onEnded();
      throw error;
    }
  }

  /**
   * Safe clean-up method to pause, unregister listeners, and release resources of any active TTS playback.
   */
  static stopVoice(): void {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.onended = null;
        this.activeAudio.onerror = null;
        this.activeAudio.src = '';
        this.activeAudio.load();
      } catch (err) {
        console.error('Failed to clear active audio resources:', err);
      }
      this.activeAudio = null;
    }

    if (this.activeAudioSource) {
      try {
        this.activeAudioSource.stop();
        this.activeAudioSource.disconnect();
      } catch (err) {
        // ignore
      }
      this.activeAudioSource = null;
    }

    if (this.activeAudioContext) {
      try {
        this.activeAudioContext.close();
      } catch (err) {
        console.error('Failed to close active AudioContext:', err);
      }
      this.activeAudioContext = null;
    }
  }
}
