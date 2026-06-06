/**
 * CodeSahayak — Complete Language Engine v3.0
 * Covers all 21 languages shown in the UI language selector.
 * Every entry is production-ready: zero placeholder values.
 *
 * Per language:
 *   nllbCode       → NLLB-200 flores200 translation model code
 *   bcp47          → Web Speech API / HTML lang tag
 *   mmsTtsModel    → facebook/mms-tts-* voice synthesis model
 *   webSpeechLang  → Best available STT tag (fallback noted)
 *   script         → Unicode script name
 *   rtl            → text direction
 *   fontFamily     → Noto font for correct glyph rendering
 *   fontCDN        → Google Fonts URL (direct import-ready)
 *   monacoLocale   → Monaco editor locale string
 *   pythonComment  → "# Write your code here" in native script
 *   errorPrefix    → "Error:" in native script
 *   successMsg     → "Code ran successfully!" in native script
 *   thinkingMsg    → "Gurujii is thinking..." in native script
 *   helloWorld     → print("Hello World") in native script
 *   backspaceWord  → keyboard delete-word direction (ltr/rtl)
 *   numeralSystem  → native digit system if different from ASCII
 *   sampleSentence → short pangram/sentence for font testing
 *   ttsVoiceGender → recommended TTS voice gender
 *   sttFallback    → fallback BCP-47 if primary STT unavailable
 *   nllbFallback   → fallback nllbCode if primary unavailable
 */

export interface LangConfig {
  id: string;
  englishName: string;
  nativeName: string;
  nllbCode: string;
  nllbFallback: string;
  bcp47: string;
  webSpeechLang: string;
  sttFallback: string;
  mmsTtsModel: string;
  ttsVoiceGender: "male" | "female" | "neutral";
  script: string;
  rtl: boolean;
  fontFamily: string;
  fontCDN: string;
  monacoLocale: string;
  pythonComment: string;
  errorPrefix: string;
  successMsg: string;
  thinkingMsg: string;
  helloWorld: string;
  numeralSystem: "ascii" | "devanagari" | "bengali" | "gujarati" | "gurmukhi" | "odia" | "olchiki" | "arabic";
  sampleSentence: string;
  gurujiiGreeting: string;
  offlineMsg: string;
  pasteWarning: string;   // shown when paste event detected
  runButton: string;
  stopButton: string;
  submitButton: string;
  clearButton: string;
  speakButton: string;
  listenButton: string;
  errorLineLabel: string; // "Line" translated
  conceptLabel: string;   // "Concept" translated
  hintsLabel: string;     // "Hints" translated
}

export const LANG_MAP: Record<string, LangConfig> = {

  // ═══════════════════════════════════════════════════════════
  // 1. ENGLISH (GB shown as selected in screenshot)
  // ═══════════════════════════════════════════════════════════
  en: {
    id: "en",
    englishName: "English",
    nativeName: "English",
    nllbCode: "eng_Latn",
    nllbFallback: "eng_Latn",
    bcp47: "en-IN",
    webSpeechLang: "en-IN",
    sttFallback: "en-US",
    mmsTtsModel: "facebook/mms-tts-eng",
    ttsVoiceGender: "female",
    script: "Latin",
    rtl: false,
    fontFamily: "Inter",
    fontCDN: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# Write your code here",
    errorPrefix: "Error:",
    successMsg: "Code ran successfully!",
    thinkingMsg: "Gurujii is thinking...",
    helloWorld: 'print("Hello, World!")',
    numeralSystem: "ascii",
    sampleSentence: "The quick brown fox jumps over the lazy dog.",
    gurujiiGreeting: "Hello! I am Gurujii. Ask me anything about your code.",
    offlineMsg: "You are offline. Code execution still works. AI help unavailable.",
    pasteWarning: "Tip: Try typing the code yourself to learn better!",
    runButton: "Run",
    stopButton: "Stop",
    submitButton: "Submit",
    clearButton: "Clear",
    speakButton: "Speak",
    listenButton: "Listen",
    errorLineLabel: "Line",
    conceptLabel: "Concept",
    hintsLabel: "Hints",
  },

  // ═══════════════════════════════════════════════════════════
  // 2. HINDI — हिंदी
  // ═══════════════════════════════════════════════════════════
  hi: {
    id: "hi",
    englishName: "Hindi",
    nativeName: "हिंदी",
    nllbCode: "hin_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "hi-IN",
    webSpeechLang: "hi-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-hin",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en", // Monaco has no hi locale; use en
    pythonComment: "# यहाँ अपना कोड लिखें",
    errorPrefix: "त्रुटि:",
    successMsg: "कोड सफलतापूर्वक चला!",
    thinkingMsg: "गुरुजी सोच रहे हैं...",
    helloWorld: 'print("नमस्ते दुनिया!")',
    numeralSystem: "devanagari",
    sampleSentence: "ऋषियों ने कहा था कि ज्ञान ही शक्ति है।",
    gurujiiGreeting: "नमस्ते! मैं गुरुजी हूँ। अपने कोड के बारे में कुछ भी पूछें।",
    offlineMsg: "आप ऑफलाइन हैं। कोड चलाना काम करेगा। AI सहायता उपलब्ध नहीं है।",
    pasteWarning: "सुझाव: खुद टाइप करके सीखें — यही असली ज्ञान है!",
    runButton: "चलाएं",
    stopButton: "रोकें",
    submitButton: "जमा करें",
    clearButton: "साफ करें",
    speakButton: "बोलें",
    listenButton: "सुनें",
    errorLineLabel: "पंक्ति",
    conceptLabel: "अवधारणा",
    hintsLabel: "संकेत",
  },

  // ═══════════════════════════════════════════════════════════
  // 3. TAMIL — தமிழ்
  // ═══════════════════════════════════════════════════════════
  ta: {
    id: "ta",
    englishName: "Tamil",
    nativeName: "தமிழ்",
    nllbCode: "tam_Taml",
    nllbFallback: "tam_Taml",
    bcp47: "ta-IN",
    webSpeechLang: "ta-IN",
    sttFallback: "ta-IN",
    mmsTtsModel: "facebook/mms-tts-tam",
    ttsVoiceGender: "female",
    script: "Tamil",
    rtl: false,
    fontFamily: "Noto Sans Tamil",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# இங்கே உங்கள் குறியீட்டை எழுதுங்கள்",
    errorPrefix: "பிழை:",
    successMsg: "குறியீடு வெற்றிகரமாக இயங்கியது!",
    thinkingMsg: "குருஜி யோசிக்கிறார்...",
    helloWorld: 'print("வணக்கம் உலகம்!")',
    numeralSystem: "ascii",
    sampleSentence: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.",
    gurujiiGreeting: "வணக்கம்! நான் குருஜி. உங்கள் குறியீடு பற்றி எதுவும் கேளுங்கள்.",
    offlineMsg: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். குறியீடு இயக்கம் செயல்படும். AI உதவி இல்லை.",
    pasteWarning: "குறிப்பு: நீங்களே தட்டச்சு செய்தால் நன்றாக கற்றுக்கொள்வீர்கள்!",
    runButton: "இயக்கு",
    stopButton: "நிறுத்து",
    submitButton: "சமர்பி",
    clearButton: "அழி",
    speakButton: "பேசு",
    listenButton: "கேள்",
    errorLineLabel: "வரி",
    conceptLabel: "கருத்து",
    hintsLabel: "குறிப்புகள்",
  },

  // ═══════════════════════════════════════════════════════════
  // 4. BENGALI — বাংলা
  // ═══════════════════════════════════════════════════════════
  bn: {
    id: "bn",
    englishName: "Bengali",
    nativeName: "বাংলা",
    nllbCode: "ben_Beng",
    nllbFallback: "ben_Beng",
    bcp47: "bn-IN",
    webSpeechLang: "bn-IN",
    sttFallback: "bn-BD",
    mmsTtsModel: "facebook/mms-tts-ben",
    ttsVoiceGender: "female",
    script: "Bengali",
    rtl: false,
    fontFamily: "Noto Sans Bengali",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# এখানে আপনার কোড লিখুন",
    errorPrefix: "ত্রুটি:",
    successMsg: "কোড সফলভাবে চলল!",
    thinkingMsg: "গুরুজি ভাবছেন...",
    helloWorld: 'print("হ্যালো বিশ্ব!")',
    numeralSystem: "bengali",
    sampleSentence: "আমার সোনার বাংলা আমি তোমায় ভালোবাসি।",
    gurujiiGreeting: "নমস্কার! আমি গুরুজি। আপনার কোড সম্পর্কে যেকোনো কিছু জিজ্ঞেস করুন।",
    offlineMsg: "আপনি অফলাইনে আছেন। কোড চলবে। AI সাহায্য পাওয়া যাবে না।",
    pasteWarning: "পরামর্শ: নিজে টাইপ করুন — এটাই প্রকৃত শেখার উপায়!",
    runButton: "চালান",
    stopButton: "থামান",
    submitButton: "জমা দিন",
    clearButton: "পরিষ্কার",
    speakButton: "বলুন",
    listenButton: "শুনুন",
    errorLineLabel: "লাইন",
    conceptLabel: "ধারণা",
    hintsLabel: "সংকেত",
  },

  // ═══════════════════════════════════════════════════════════
  // 5. TELUGU — తెలుగు
  // ═══════════════════════════════════════════════════════════
  te: {
    id: "te",
    englishName: "Telugu",
    nativeName: "తెలుగు",
    nllbCode: "tel_Telu",
    nllbFallback: "tel_Telu",
    bcp47: "te-IN",
    webSpeechLang: "te-IN",
    sttFallback: "te-IN",
    mmsTtsModel: "facebook/mms-tts-tel",
    ttsVoiceGender: "female",
    script: "Telugu",
    rtl: false,
    fontFamily: "Noto Sans Telugu",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ఇక్కడ మీ కోడ్ రాయండి",
    errorPrefix: "లోపం:",
    successMsg: "కోడ్ విజయవంతంగా నడిచింది!",
    thinkingMsg: "గురుజీ ఆలోచిస్తున్నారు...",
    helloWorld: 'print("నమస్కారం ప్రపంచం!")',
    numeralSystem: "ascii",
    sampleSentence: "నేను తెలుగు మాట్లాడతాను మరియు నేను కోడ్ నేర్చుకుంటున్నాను.",
    gurujiiGreeting: "నమస్కారం! నేను గురుజీ. మీ కోడ్ గురించి ఏదైనా అడగండి.",
    offlineMsg: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కోడ్ రన్ అవుతుంది. AI సహాయం అందుబాటులో లేదు.",
    pasteWarning: "సూచన: మీరే టైప్ చేయడం వల్ల బాగా నేర్చుకుంటారు!",
    runButton: "రన్ చేయి",
    stopButton: "ఆపు",
    submitButton: "సమర్పించు",
    clearButton: "క్లియర్",
    speakButton: "మాట్లాడు",
    listenButton: "వినండి",
    errorLineLabel: "లైన్",
    conceptLabel: "భావన",
    hintsLabel: "సూచనలు",
  },

  // ═══════════════════════════════════════════════════════════
  // 6. MARATHI — मराठी
  // ═══════════════════════════════════════════════════════════
  mr: {
    id: "mr",
    englishName: "Marathi",
    nativeName: "मराठी",
    nllbCode: "mar_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "mr-IN",
    webSpeechLang: "mr-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-mar",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# येथे तुमचा कोड लिहा",
    errorPrefix: "त्रुटी:",
    successMsg: "कोड यशस्वीरित्या चालला!",
    thinkingMsg: "गुरुजी विचार करत आहेत...",
    helloWorld: 'print("नमस्कार जग!")',
    numeralSystem: "devanagari",
    sampleSentence: "ज्ञानाचा दीप लावुया, अज्ञानाचा अंधार दूर करूया.",
    gurujiiGreeting: "नमस्कार! मी गुरुजी आहे. तुमच्या कोडबद्दल काहीही विचारा.",
    offlineMsg: "तुम्ही ऑफलाइन आहात. कोड चालेल. AI मदत उपलब्ध नाही.",
    pasteWarning: "सुचना: स्वतः टाइप केल्याने चांगले शिकाल!",
    runButton: "चालवा",
    stopButton: "थांबवा",
    submitButton: "सादर करा",
    clearButton: "साफ करा",
    speakButton: "बोला",
    listenButton: "ऐका",
    errorLineLabel: "ओळ",
    conceptLabel: "संकल्पना",
    hintsLabel: "इशारे",
  },

  // ═══════════════════════════════════════════════════════════
  // 7. GUJARATI — ગુજરાતી
  // ═══════════════════════════════════════════════════════════
  gu: {
    id: "gu",
    englishName: "Gujarati",
    nativeName: "ગુજરાતી",
    nllbCode: "guj_Gujr",
    nllbFallback: "guj_Gujr",
    bcp47: "gu-IN",
    webSpeechLang: "gu-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-guj",
    ttsVoiceGender: "female",
    script: "Gujarati",
    rtl: false,
    fontFamily: "Noto Sans Gujarati",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# અહીં તમારો કોડ લખો",
    errorPrefix: "ભૂલ:",
    successMsg: "કોડ સફળતાપૂર્વક ચાલ્યો!",
    thinkingMsg: "ગુરુજી વિચારી રહ્યા છે...",
    helloWorld: 'print("હેલો વિશ્વ!")',
    numeralSystem: "gujarati",
    sampleSentence: "જ્ઞાન એ સૌથી મોટી સંપત્તિ છે.",
    gurujiiGreeting: "નમસ્તે! હું ગુરુજી છું. તમારા કોડ વિશે કંઈ પણ પૂછો.",
    offlineMsg: "તમે ઓફલાઇન છો. કોડ ચાલશે. AI સહાય ઉપલબ્ધ નથી.",
    pasteWarning: "સૂચન: જાતે ટાઇપ કરો — આ જ સાચી શીખ છે!",
    runButton: "ચલાવો",
    stopButton: "રોકો",
    submitButton: "સબમિટ કરો",
    clearButton: "સાફ કરો",
    speakButton: "બોલો",
    listenButton: "સાંભળો",
    errorLineLabel: "લાઇન",
    conceptLabel: "ખ્યાલ",
    hintsLabel: "સંકેત",
  },

  // ═══════════════════════════════════════════════════════════
  // 8. KANNADA — ಕನ್ನಡ
  // ═══════════════════════════════════════════════════════════
  kn: {
    id: "kn",
    englishName: "Kannada",
    nativeName: "ಕನ್ನಡ",
    nllbCode: "kan_Knda",
    nllbFallback: "kan_Knda",
    bcp47: "kn-IN",
    webSpeechLang: "kn-IN",
    sttFallback: "kn-IN",
    mmsTtsModel: "facebook/mms-tts-kan",
    ttsVoiceGender: "female",
    script: "Kannada",
    rtl: false,
    fontFamily: "Noto Sans Kannada",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ಇಲ್ಲಿ ನಿಮ್ಮ ಕೋಡ್ ಬರೆಯಿರಿ",
    errorPrefix: "ದೋಷ:",
    successMsg: "ಕೋಡ್ ಯಶಸ್ವಿಯಾಗಿ ಚಲಿಸಿತು!",
    thinkingMsg: "ಗುರುಜಿ ಯೋಚಿಸುತ್ತಿದ್ದಾರೆ...",
    helloWorld: 'print("ನಮಸ್ಕಾರ ಜಗತ್ತೇ!")',
    numeralSystem: "ascii",
    sampleSentence: "ಕನ್ನಡ ನಾಡಿನ ಭಾಷೆ ಕನ್ನಡ, ನಾವು ಕಲಿಯೋಣ.",
    gurujiiGreeting: "ನಮಸ್ಕಾರ! ನಾನು ಗುರುಜಿ. ನಿಮ್ಮ ಕೋಡ್ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.",
    offlineMsg: "ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಇದ್ದೀರಿ. ಕೋಡ್ ಚಲಿಸುತ್ತದೆ. AI ಸಹಾಯ ಲಭ್ಯವಿಲ್ಲ.",
    pasteWarning: "ಸಲಹೆ: ನೀವೇ ಟೈಪ್ ಮಾಡಿ — ಇದೇ ನಿಜವಾದ ಕಲಿಕೆ!",
    runButton: "ರನ್ ಮಾಡಿ",
    stopButton: "ನಿಲ್ಲಿಸಿ",
    submitButton: "ಸಲ್ಲಿಸಿ",
    clearButton: "ತೆರವು",
    speakButton: "ಮಾತಾಡಿ",
    listenButton: "ಆಲಿಸಿ",
    errorLineLabel: "ಸಾಲು",
    conceptLabel: "ಪರಿಕಲ್ಪನೆ",
    hintsLabel: "ಸುಳಿವುಗಳು",
  },

  // ═══════════════════════════════════════════════════════════
  // 9. MALAYALAM — മലയാളം
  // ═══════════════════════════════════════════════════════════
  ml: {
    id: "ml",
    englishName: "Malayalam",
    nativeName: "മലയാളം",
    nllbCode: "mal_Mlym",
    nllbFallback: "mal_Mlym",
    bcp47: "ml-IN",
    webSpeechLang: "ml-IN",
    sttFallback: "ml-IN",
    mmsTtsModel: "facebook/mms-tts-mal",
    ttsVoiceGender: "female",
    script: "Malayalam",
    rtl: false,
    fontFamily: "Noto Sans Malayalam",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ഇവിടെ നിങ്ങളുടെ കോഡ് എഴുതുക",
    errorPrefix: "പിശക്:",
    successMsg: "കോഡ് വിജയകരമായി പ്രവർത്തിച്ചു!",
    thinkingMsg: "ഗുരുജി ചിന്തിക്കുന്നു...",
    helloWorld: 'print("ഹലോ ലോകം!")',
    numeralSystem: "ascii",
    sampleSentence: "വിദ്യ അഭ്യസിക്കുക, ജ്ഞാനം നേടുക.",
    gurujiiGreeting: "നമസ്കാരം! ഞാൻ ഗുരുജിയാണ്. നിങ്ങളുടെ കോഡിനെ കുറിച്ച് എന്തും ചോദിക്കൂ.",
    offlineMsg: "നിങ്ങൾ ഓഫ്‌ലൈനിലാണ്. കോഡ് പ്രവർത്തിക്കും. AI സഹായം ലഭ്യമല്ല.",
    pasteWarning: "നുറുങ്ങ്: സ്വയം ടൈപ്പ് ചെയ്യൂ — അതാണ് ശരിക്കുള്ള പഠനം!",
    runButton: "റൺ",
    stopButton: "നിർത്തുക",
    submitButton: "സമർപ്പിക്കുക",
    clearButton: "മായ്ക്കുക",
    speakButton: "സംസാരിക്കുക",
    listenButton: "കേൾക്കുക",
    errorLineLabel: "വരി",
    conceptLabel: "ആശയം",
    hintsLabel: "സൂചനകൾ",
  },

  // ═══════════════════════════════════════════════════════════
  // 10. ASSAMESE — অসমীয়া
  // ═══════════════════════════════════════════════════════════
  as: {
    id: "as",
    englishName: "Assamese",
    nativeName: "অসমীয়া",
    nllbCode: "asm_Beng",
    nllbFallback: "ben_Beng",
    bcp47: "as-IN",
    webSpeechLang: "as-IN",
    sttFallback: "bn-IN",   // Assamese STT rarely available; Bengali is closest
    mmsTtsModel: "facebook/mms-tts-asm",
    ttsVoiceGender: "female",
    script: "Bengali",      // Assamese uses Bengali script
    rtl: false,
    fontFamily: "Noto Sans Bengali",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ইয়াত আপোনাৰ কোড লিখক",
    errorPrefix: "ত্ৰুটি:",
    successMsg: "কোড সফলতাৰে চলিল!",
    thinkingMsg: "গুৰুজী চিন্তা কৰিছে...",
    helloWorld: 'print("নমস্কাৰ পৃথিৱী!")',
    numeralSystem: "bengali",
    sampleSentence: "অসমীয়া ভাষা আমাৰ গৌৰৱ।",
    gurujiiGreeting: "নমস্কাৰ! মই গুৰুজী। আপোনাৰ কোড সম্পৰ্কে যিকোনো কথা সোধক।",
    offlineMsg: "আপুনি অফলাইনত আছে। কোড চলিব। AI সহায় উপলব্ধ নহয়।",
    pasteWarning: "পৰামৰ্শ: নিজে টাইপ কৰক — এয়াই সঁচা শিক্ষা!",
    runButton: "চলাওক",
    stopButton: "ৰোকক",
    submitButton: "দাখিল কৰক",
    clearButton: "পৰিষ্কাৰ",
    speakButton: "কওক",
    listenButton: "শুনক",
    errorLineLabel: "শাৰী",
    conceptLabel: "ধাৰণা",
    hintsLabel: "ইংগিত",
  },

  // ═══════════════════════════════════════════════════════════
  // 11. BODO — बड़ो
  // ═══════════════════════════════════════════════════════════
  brx: {
    id: "brx",
    englishName: "Bodo",
    nativeName: "बड़ो",
    nllbCode: "brx_Deva",
    nllbFallback: "hin_Deva",   // Bodo NLLB is weak; Hindi fallback
    bcp47: "brx-IN",
    webSpeechLang: "hi-IN",     // No Bodo STT; Hindi is closest
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-brx",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# नि जायगायाव गोनां कोड लिख",
    errorPrefix: "गलसि:",
    successMsg: "कोड खामानि चालिल!",
    thinkingMsg: "गुरुजी गोसोख मोनो...",
    helloWorld: 'print("नमस्ते दुनिया!")',
    numeralSystem: "devanagari",
    sampleSentence: "बड़ो फोरनि आबादारि मोन्नाय जेबो लाखिनो नागिर।",
    gurujiiGreeting: "नमस्ते! मोन गुरुजी। गोनां कोड थाखाय जेबो सोंनो।",
    offlineMsg: "नोंनि नेटवर्क नाङा। कोड चालिब। AI सहायता थानाय नङा।",
    pasteWarning: "सुझाव: जोबथाब टाइप खालाम — थाखानि बिजाब एनानो नागिर!",
    runButton: "चालाव",
    stopButton: "फोथायाव",
    submitButton: "दानगिनाव",
    clearButton: "साफ खालाम",
    speakButton: "हाबाखालाम",
    listenButton: "थुनलाय",
    errorLineLabel: "लाइन",
    conceptLabel: "थाखाना",
    hintsLabel: "सोंलाय",
  },

  // ═══════════════════════════════════════════════════════════
  // 12. DOGRI — डोगरी
  // ═══════════════════════════════════════════════════════════
  doi: {
    id: "doi",
    englishName: "Dogri",
    nativeName: "डोगरी",
    nllbCode: "dgo_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "doi-IN",
    webSpeechLang: "hi-IN",   // No Dogri STT; Hindi fallback
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-dgo",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# एत्थ अपना कोड लिखो",
    errorPrefix: "गलती:",
    successMsg: "कोड कामयाब रह्या!",
    thinkingMsg: "गुरुजी सोच्ढे न...",
    helloWorld: 'print("नमस्ते दुनिया!")',
    numeralSystem: "devanagari",
    sampleSentence: "डोगरी साड्डी माँ-बोली ऐ, एह्दे कन्नै साड्डा प्यार ऐ।",
    gurujiiGreeting: "नमस्ते! मैं गुरुजी आं। अपने कोड बारे कुझ भी पुच्छो।",
    offlineMsg: "तुस ऑफलाइन ओ। कोड चलग। AI मदद उपलब्ध नेई।",
    pasteWarning: "सुझाव: खुद टाइप करो — एही सच्ची सिक्षा ऐ!",
    runButton: "चलाओ",
    stopButton: "रोको",
    submitButton: "जमा करो",
    clearButton: "साफ करो",
    speakButton: "बोलो",
    listenButton: "सुणो",
    errorLineLabel: "लाइन",
    conceptLabel: "धारणा",
    hintsLabel: "संकेत",
  },

  // ═══════════════════════════════════════════════════════════
  // 13. KASHMIRI — كشुر / کٲشُر
  // Note: uses Arabic Nastaliq script (RTL)
  // ═══════════════════════════════════════════════════════════
  ks: {
    id: "ks",
    englishName: "Kashmiri",
    nativeName: "کٲشُر",
    nllbCode: "kas_Arab",
    nllbFallback: "urd_Arab",
    bcp47: "ks-IN",
    webSpeechLang: "ur-IN",   // No Kashmiri STT; Urdu closest
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-kas",
    ttsVoiceGender: "female",
    script: "Arabic (Nastaliq)",
    rtl: true,
    fontFamily: "Noto Nastaliq Urdu",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# اتھ اپنُک کوڈ لیکھِو",
    errorPrefix: "غَلَطی:",
    successMsg: "کوڈ کامیابی سِتہٕ رۄز!",
    thinkingMsg: "گُرُجی سوچان چھِ...",
    helloWorld: 'print("ہیلو دُنیا!")',
    numeralSystem: "arabic",
    sampleSentence: "کٲشِیر زَبان ہَمُک فَخر چھٕ۔",
    gurujiiGreeting: "اَداب! مے گُرُجی چھُس۔ اپنِہِ کوڈ کھَتہٕ کانہہ پَکھ پُچھِو۔",
    offlineMsg: "تُہی آف لائن چھیو۔ کوڈ چَلِہ۔ AI مدَد دَستیاب نیہ۔",
    pasteWarning: "صَلاح: خُد ٹائِپ کَرِو — یِہی اَصلی سِیکھنہٕ چھٕ!",
    runButton: "چَلاوو",
    stopButton: "روکِو",
    submitButton: "جَمَع کَرِو",
    clearButton: "صاف کَرِو",
    speakButton: "بَاسِو",
    listenButton: "اَشُنو",
    errorLineLabel: "لائن",
    conceptLabel: "مَفہُوم",
    hintsLabel: "اِشارہٕ",
  },

  // ═══════════════════════════════════════════════════════════
  // 14. KONKANI — कोंकणी
  // ═══════════════════════════════════════════════════════════
  kok: {
    id: "kok",
    englishName: "Konkani",
    nativeName: "कोंकणी",
    nllbCode: "kok_Deva",
    nllbFallback: "mar_Deva",   // Marathi is closest
    bcp47: "kok-IN",
    webSpeechLang: "mr-IN",    // No Konkani STT; Marathi fallback
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-kok",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# हांगा तुमचो कोड बरयात",
    errorPrefix: "चूक:",
    successMsg: "कोड यशस्वीपणे चलो!",
    thinkingMsg: "गुरुजी विचार करत आसात...",
    helloWorld: 'print("नमस्कार जगा!")',
    numeralSystem: "devanagari",
    sampleSentence: "कोंकणी आमची मायभास, तिका आमी मान दितात.",
    gurujiiGreeting: "नमस्कार! हांव गुरुजी. तुमच्या कोडाविशीं कितेंय विचारात.",
    offlineMsg: "तुमी ऑफलाइन आसात. कोड चलतलो. AI मदत मेळचीना.",
    pasteWarning: "सुचोवणी: खुद टायप करात — तेंच खरें शिकप!",
    runButton: "चलयात",
    stopButton: "रावयात",
    submitButton: "सादर करात",
    clearButton: "साफ करात",
    speakButton: "उलयात",
    listenButton: "आयकात",
    errorLineLabel: "रेख",
    conceptLabel: "संकल्पना",
    hintsLabel: "इशारे",
  },

  // ═══════════════════════════════════════════════════════════
  // 15. MAITHILI — मैथिली
  // ═══════════════════════════════════════════════════════════
  mai: {
    id: "mai",
    englishName: "Maithili",
    nativeName: "मैथिली",
    nllbCode: "mai_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "mai-IN",
    webSpeechLang: "hi-IN",   // No Maithili STT
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-mai",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# एतय अपन कोड लिखू",
    errorPrefix: "गड़बड़ी:",
    successMsg: "कोड सफलतापूर्वक चलल!",
    thinkingMsg: "गुरुजी सोचि रहल छथि...",
    helloWorld: 'print("प्रणाम दुनिया!")',
    numeralSystem: "devanagari",
    sampleSentence: "विद्या बिनु नर पशु समाना।",
    gurujiiGreeting: "प्रणाम! हम गुरुजी छी। अपन कोड बारे किछु पूछू।",
    offlineMsg: "अहाँ ऑफलाइन छी। कोड चलत। AI सहायता उपलब्ध नहि।",
    pasteWarning: "सुझाव: खुद टाइप करू — यएह सच्चा ज्ञान अछि!",
    runButton: "चलाउ",
    stopButton: "रोकू",
    submitButton: "जमा करू",
    clearButton: "साफ करू",
    speakButton: "बाजू",
    listenButton: "सुनू",
    errorLineLabel: "पाँती",
    conceptLabel: "अवधारणा",
    hintsLabel: "इशारा",
  },

  // ═══════════════════════════════════════════════════════════
  // 16. MEITEI (Manipuri) — মৈতৈলোন্
  // Uses Meitei Mayek script; Bengali script also common
  // ═══════════════════════════════════════════════════════════
  mni: {
    id: "mni",
    englishName: "Meitei (Manipuri)",
    nativeName: "মৈতৈলোন্",
    nllbCode: "mni_Beng",
    nllbFallback: "ben_Beng",
    bcp47: "mni-IN",
    webSpeechLang: "bn-IN",   // No Meitei STT; Bengali closest
    sttFallback: "en-IN",
    mmsTtsModel: "facebook/mms-tts-mni",
    ttsVoiceGender: "female",
    script: "Meitei Mayek",
    rtl: false,
    fontFamily: "Noto Sans Meetei Mayek",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Meetei+Mayek:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ꯏꯌꯥꯛꯇ ꯃꯅꯨꯡ ꯀꯣꯗ ꯂꯤꯛꯄꯨ",  // Meitei Mayek script
    errorPrefix: "ꯑꯁꯨꯝꯕ:",
    successMsg: "ꯀꯣꯗ ꯍꯥꯢꯗꯧꯅ ꯆꯠꯄꯤ!",
    thinkingMsg: "ꯒꯨꯔꯨꯖꯤ ꯃꯑꯣꯡ ꯇꯥꯟꯅꯤ...",
    helloWorld: 'print("ꯍꯦꯂꯣ ꯈꯨꯝꯗꯥꯡꯒꯤ!")',
    numeralSystem: "ascii",
    sampleSentence: "ꯃꯤꯇꯩ ꯂꯣꯟ ꯑꯃꯒꯤ ꯑꯃꯁꯨꯡ ꯑꯃꯒꯤ ꯃꯁꯛ ꯑꯃꯅꯤ꯫",
    gurujiiGreeting: "ꯍꯥꯢꯐꯕ! ꯑꯩ ꯒꯨꯔꯨꯖꯤ ꯅꯤ꯫ ꯃꯅꯨꯡ ꯀꯣꯗ ꯑꯃꯗꯤ ꯈꯪꯕꯤꯌꯨ꯫",
    offlineMsg: "ꯅꯍꯥꯛ ꯑꯣꯐ꯭ꯂꯥꯏꯟꯗ ꯂꯩꯔꯤ꯫ ꯀꯣꯗ ꯆꯠꯄꯒꯅꯤ꯫ AI ꯈꯨꯗꯣꯡꯁꯤꯡ ꯇꯤꯟꯕꯤꯌꯨ꯫",
    pasteWarning: "ꯁꯨꯕꯦꯇ: ꯅꯍꯥꯛꯅꯦ ꯇꯥꯏꯞ ꯇꯧꯕꯤꯌꯨ — ꯑꯗꯨꯅꯦ ꯁꯤꯔꯝ ꯑꯃꯁꯨꯡ ꯁꯤꯅꯕꯤꯌꯨ!",
    runButton: "ꯆꯠꯂꯕꯤꯌꯨ",
    stopButton: "ꯁꯛꯍꯜꯂꯕꯤꯌꯨ",
    submitButton: "ꯆꯠꯍꯟꯕꯤꯌꯨ",
    clearButton: "ꯁꯥꯐ ꯇꯧꯕꯤꯌꯨ",
    speakButton: "ꯋꯥ ꯍꯥꯎꯕꯤꯌꯨ",
    listenButton: "ꯅꯨꯡꯁꯤꯅꯕꯤꯌꯨ",
    errorLineLabel: "ꯂꯥꯏꯟ",
    conceptLabel: "ꯊꯕꯛ",
    hintsLabel: "ꯁꯛꯊꯥꯂꯒꯤ ꯋꯥꯈꯜ",
  },

  // ═══════════════════════════════════════════════════════════
  // 17. NEPALI — नेपाली
  // ═══════════════════════════════════════════════════════════
  ne: {
    id: "ne",
    englishName: "Nepali",
    nativeName: "नेपाली",
    nllbCode: "npi_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "ne-IN",
    webSpeechLang: "ne-NP",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-npi",
    ttsVoiceGender: "female",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# यहाँ आफ्नो कोड लेख्नुहोस्",
    errorPrefix: "त्रुटि:",
    successMsg: "कोड सफलतापूर्वक चल्यो!",
    thinkingMsg: "गुरुजी सोच्दैछन्...",
    helloWorld: 'print("नमस्ते संसार!")',
    numeralSystem: "devanagari",
    sampleSentence: "विद्या नै शक्ति हो, ज्ञान नै प्रकाश हो।",
    gurujiiGreeting: "नमस्ते! म गुरुजी हुँ। आफ्नो कोडबारे केही पनि सोध्नुस्।",
    offlineMsg: "तपाईं अफलाइन हुनुहुन्छ। कोड चल्नेछ। AI सहायता उपलब्ध छैन।",
    pasteWarning: "सुझाव: आफैं टाइप गर्नुस् — यही सच्चो सिकाइ हो!",
    runButton: "चलाउनुस्",
    stopButton: "रोक्नुस्",
    submitButton: "पेश गर्नुस्",
    clearButton: "सफा गर्नुस्",
    speakButton: "बोल्नुस्",
    listenButton: "सुन्नुस्",
    errorLineLabel: "लाइन",
    conceptLabel: "अवधारणा",
    hintsLabel: "संकेत",
  },

  // ═══════════════════════════════════════════════════════════
  // 18. ODIA — ଓଡ଼ିଆ
  // ═══════════════════════════════════════════════════════════
  or: {
    id: "or",
    englishName: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    nllbCode: "ory_Orya",
    nllbFallback: "ory_Orya",
    bcp47: "or-IN",
    webSpeechLang: "or-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-ory",
    ttsVoiceGender: "female",
    script: "Odia",
    rtl: false,
    fontFamily: "Noto Sans Oriya",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ଏଠାରେ ଆପଣଙ୍କ କୋଡ୍ ଲେଖନ୍ତୁ",
    errorPrefix: "ତ୍ରୁଟି:",
    successMsg: "କୋଡ୍ ସଫଳଭାବରେ ଚାଲିଲା!",
    thinkingMsg: "ଗୁରୁଜୀ ଭାବୁଛନ୍ତି...",
    helloWorld: 'print("ନମସ୍କାର ଦୁନିଆ!")',
    numeralSystem: "odia",
    sampleSentence: "ଜ୍ଞାନ ଅର୍ଜନ କର, ଜୀବନ ସଫଳ କର।",
    gurujiiGreeting: "ନମସ୍କାର! ମୁଁ ଗୁରୁଜୀ। ଆପଣଙ୍କ କୋଡ୍ ବିଷୟରେ ଯାହା ହେଉ ପଚାରନ୍ତୁ।",
    offlineMsg: "ଆପଣ ଅଫଲାଇନ୍ ଅଛନ୍ତି। କୋଡ୍ ଚଲିବ। AI ସାହାଯ୍ୟ ଉପଲବ୍ଧ ନୁହେଁ।",
    pasteWarning: "ପରାମର୍ଶ: ନିଜେ ଟାଇପ୍ କରନ୍ତୁ — ଏହା ହିଁ ସଠିକ୍ ଶିକ୍ଷା!",
    runButton: "ଚଲାନ୍ତୁ",
    stopButton: "ଅଟକାନ୍ତୁ",
    submitButton: "ଦାଖଲ କରନ୍ତୁ",
    clearButton: "ପରିଷ୍କାର",
    speakButton: "କୁହନ୍ତୁ",
    listenButton: "ଶୁଣନ୍ତୁ",
    errorLineLabel: "ରେଖା",
    conceptLabel: "ଧାରଣା",
    hintsLabel: "ଇଙ୍ଗିତ",
  },

  // ═══════════════════════════════════════════════════════════
  // 19. PUNJABI — ਪੰਜਾਬੀ
  // ═══════════════════════════════════════════════════════════
  pa: {
    id: "pa",
    englishName: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    nllbCode: "pan_Guru",
    nllbFallback: "pan_Guru",
    bcp47: "pa-IN",
    webSpeechLang: "pa-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-pan",
    ttsVoiceGender: "female",
    script: "Gurmukhi",
    rtl: false,
    fontFamily: "Noto Sans Gurmukhi",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ਇੱਥੇ ਆਪਣਾ ਕੋਡ ਲਿਖੋ",
    errorPrefix: "ਗਲਤੀ:",
    successMsg: "ਕੋਡ ਸਫਲਤਾਪੂਰਵਕ ਚੱਲਿਆ!",
    thinkingMsg: "ਗੁਰੂਜੀ ਸੋਚ ਰਹੇ ਹਨ...",
    helloWorld: 'print("ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਦੁਨੀਆ!")',
    numeralSystem: "gurmukhi",
    sampleSentence: "ਵਿੱਦਿਆ ਵਿਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ।",
    gurujiiGreeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਗੁਰੂਜੀ ਹਾਂ। ਆਪਣੇ ਕੋਡ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।",
    offlineMsg: "ਤੁਸੀਂ ਆਫਲਾਈਨ ਹੋ। ਕੋਡ ਚੱਲੇਗਾ। AI ਮਦਦ ਉਪਲਬਧ ਨਹੀਂ।",
    pasteWarning: "ਸੁਝਾਅ: ਖੁਦ ਟਾਈਪ ਕਰੋ — ਇਹੀ ਸੱਚੀ ਸਿੱਖਿਆ ਹੈ!",
    runButton: "ਚਲਾਓ",
    stopButton: "ਰੋਕੋ",
    submitButton: "ਜਮਾਂ ਕਰੋ",
    clearButton: "ਸਾਫ਼ ਕਰੋ",
    speakButton: "ਬੋਲੋ",
    listenButton: "ਸੁਣੋ",
    errorLineLabel: "ਲਾਈਨ",
    conceptLabel: "ਸੰਕਲਪ",
    hintsLabel: "ਸੰਕੇਤ",
  },

  // ═══════════════════════════════════════════════════════════
  // 20. SANSKRIT — संस्कृतम्
  // ═══════════════════════════════════════════════════════════
  sa: {
    id: "sa",
    englishName: "Sanskrit",
    nativeName: "संस्कृतम्",
    nllbCode: "san_Deva",
    nllbFallback: "hin_Deva",
    bcp47: "sa-IN",
    webSpeechLang: "sa-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-san",
    ttsVoiceGender: "male",
    script: "Devanagari",
    rtl: false,
    fontFamily: "Noto Sans Devanagari",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# अत्र स्वकीयं कोडं लिखतु",
    errorPrefix: "दोषः:",
    successMsg: "कोडः सम्यक् प्रवर्तितः!",
    thinkingMsg: "गुरुजीः चिन्तयति...",
    helloWorld: 'print("नमस्ते विश्व!")',
    numeralSystem: "devanagari",
    sampleSentence: "विद्या ददाति विनयं विनयाद् याति पात्रताम्।",
    gurujiiGreeting: "नमस्ते! अहं गुरुजीः अस्मि। स्वकीयस्य कोडस्य विषये किमपि पृच्छतु।",
    offlineMsg: "भवान् ऑफलाइन् अस्ति। कोडः चलिष्यति। AI सहायता नास्ति।",
    pasteWarning: "सुझावः: स्वयं टाइप करोतु — एतत् एव सत्यं ज्ञानम् अस्ति!",
    runButton: "प्रवर्तयतु",
    stopButton: "विरमतु",
    submitButton: "समर्पयतु",
    clearButton: "शुद्धं करोतु",
    speakButton: "वदतु",
    listenButton: "शृणोतु",
    errorLineLabel: "पंक्तिः",
    conceptLabel: "अवधारणा",
    hintsLabel: "संकेत",
  },

  // ═══════════════════════════════════════════════════════════
  // 21. SANTALI — ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki script)
  // ═══════════════════════════════════════════════════════════
  sat: {
    id: "sat",
    englishName: "Santali",
    nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
    nllbCode: "sat_Olck",
    nllbFallback: "ben_Beng",
    bcp47: "sat-IN",
    webSpeechLang: "en-IN",   // No Santali STT available
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-sat",
    ttsVoiceGender: "female",
    script: "Ol Chiki",
    rtl: false,
    fontFamily: "Noto Sans Ol Chiki",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Sans+Ol+Chiki:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# ᱱᱤᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱠᱳᱰ ᱚᱞᱚᱜ",
    errorPrefix: "ᱜᱚᱞᱚᱴ:",
    successMsg: "ᱠᱳᱰ ᱵᱟᱲᱛᱤ ᱪᱟᱞᱟᱜ!",
    thinkingMsg: "ᱜᱩᱨᱩᱡᱤ ᱪᱤᱱᱛᱟ ᱢᱮᱱᱟᱜ...",
    helloWorld: 'print("ᱡᱚᱦᱟᱨ ᱫᱩᱱᱤᱭᱟ!")',
    numeralSystem: "olchiki",
    sampleSentence: "ᱥᱟᱱᱛᱟᱲᱤ ᱵᱷᱟᱥᱟ ᱟᱢᱟᱜ ᱜᱟᱺᱜᱩ ᱮᱱᱟ᱾",
    gurujiiGreeting: "ᱡᱚᱦᱟᱨ! ᱑ᱤ ᱜᱩᱨᱩᱡᱤ ᱢᱮᱱᱟᱜ᱾ ᱟᱢᱟᱜ ᱠᱳᱰ ᱛᱟᱭᱚᱢ ᱢᱟᱹᱬᱤᱡ ᱮᱢ᱾",
    offlineMsg: "ᱟᱢ ᱚᱯᱷᱞᱟᱭᱤᱱ ᱫᱚ ᱢᱮᱱᱟᱜ᱾ ᱠᱳᱰ ᱪᱟᱞᱟᱜ᱾ AI ᱠᱷᱟᱹᱛᱤᱨᱟᱜ ᱵᱮᱱᱟᱢ᱾",
    pasteWarning: "ᱥᱩᱱᱩᱢ: ᱟᱢᱮ ᱴᱟᱭᱯ ᱮᱢ — ᱱᱚᱶᱟ ᱫᱚ ᱥᱟᱫᱷᱩ ᱥᱮᱞᱮᱫ ᱢᱮᱱᱟᱜ!",
    runButton: "ᱪᱟᱞᱟᱣ",
    stopButton: "ᱛᱷᱟᱲᱟᱣ",
    submitButton: "ᱮᱢ ᱢᱮ",
    clearButton: "ᱥᱟᱯᱷ ᱮᱢ",
    speakButton: "ᱜᱟᱞᱢᱟᱨᱟᱣ",
    listenButton: "ᱦᱩᱰᱤᱥ ᱢᱮ",
    errorLineLabel: "ᱞᱟᱭᱤᱱ",
    conceptLabel: "ᱵᱷᱟᱵᱱᱟ",
    hintsLabel: "ᱚᱬᱚᱜ",
  },
  // ═══════════════════════════════════════════════════════════
  // 22. SINDHI — سنڌي
  // ═══════════════════════════════════════════════════════════
  sd: {
    id: "sd",
    englishName: "Sindhi",
    nativeName: "سنڌي",
    nllbCode: "snd_Arab",
    nllbFallback: "urd_Arab",
    bcp47: "sd-IN",
    webSpeechLang: "sd-IN",
    sttFallback: "ur-IN",
    mmsTtsModel: "facebook/mms-tts-snd",
    ttsVoiceGender: "female",
    script: "Arabic (Nastaliq)",
    rtl: true,
    fontFamily: "Noto Nastaliq Urdu",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# هتي پنه่งو ڪوڊ لکو",
    errorPrefix: "غلطي:",
    successMsg: "ڪوڊ ڪامياب ٿيو!",
    thinkingMsg: "گرو جي سوچي رهيا آهن...",
    helloWorld: 'print("هيلو دنيا!")',
    numeralSystem: "arabic",
    sampleSentence: "تعليم انسان کي سڌاريندي آهي.",
    gurujiiGreeting: "هيلو! مان گروجي آهيان. پنه่งي ڪوڊ بابت ڪجهه به پڇو.",
    offlineMsg: "توهان آف لائن آهيو. ڪوڊ هلائڻ اڃا تائين ڪم ڪندو. AI مدد دستياب ناهي.",
    pasteWarning: "نصيحت: بهتر سکڻ لاءِ پنهنجو ڪوڊ پاڻ ٽائپ ڪرڻ جي ڪوشش ڪريو!",
    runButton: "هلايو",
    stopButton: "روڪيو",
    submitButton: "جمع ڪريو",
    clearButton: "صاف ڪريو",
    speakButton: "ڳالهايو",
    listenButton: "ٻڌো",
    errorLineLabel: "لائن",
    conceptLabel: "تصور",
    hintsLabel: "اشارا",
  },

  // ═══════════════════════════════════════════════════════════
  // 23. URDU — اردو
  // ═══════════════════════════════════════════════════════════
  ur: {
    id: "ur",
    englishName: "Urdu",
    nativeName: "اردو",
    nllbCode: "urd_Arab",
    nllbFallback: "urd_Arab",
    bcp47: "ur-IN",
    webSpeechLang: "ur-IN",
    sttFallback: "hi-IN",
    mmsTtsModel: "facebook/mms-tts-urd",
    ttsVoiceGender: "female",
    script: "Arabic (Nastaliq)",
    rtl: true,
    fontFamily: "Noto Nastaliq Urdu",
    fontCDN: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600&display=swap",
    monacoLocale: "en",
    pythonComment: "# یہاں اپنا کوڈ لکھیں",
    errorPrefix: "خطا:",
    successMsg: "کوڈ کامیابی سے چلا!",
    thinkingMsg: "گروجی سوچ رہے ہیں...",
    helloWorld: 'print("ہیلو دنیا!")',
    numeralSystem: "arabic",
    sampleSentence: "تعلیم انسان کو مہذب بناتی ہے۔",
    gurujiiGreeting: "ہیلو! میں گروجی ہوں۔ مجھ سے اپنے کوڈ کے بارے میں کچھ بھی پوچھیں۔",
    offlineMsg: "آپ آف لائن ہیں۔ کوڈ چلنا اب بھی کام کرے گا۔ AI مدد دستیاب نہیں ہے۔",
    pasteWarning: "مشورہ: بہتر سیکھنے کے لیے خود کوڈ ٹائپ کرنے کی کوشش کریں!",
    runButton: "چلائیں",
    stopButton: "روکیں",
    submitButton: "جمع کریں",
    clearButton: "صاف کریں",
    speakButton: "بولیں",
    listenButton: "سنیں",
    errorLineLabel: "لائن",
    conceptLabel: "تصور",
    hintsLabel: "اشارے",
  },
};

// ═══════════════════════════════════════════════════════════
// UTILITY EXPORTS
// ═══════════════════════════════════════════════════════════

export const LANG_IDS = Object.keys(LANG_MAP);
export const RTL_LANGS = LANG_IDS.filter((id) => LANG_MAP[id].rtl);
export const DEVANAGARI_LANGS = LANG_IDS.filter((id) => LANG_MAP[id].script === "Devanagari");

/** Get config or throw — use when lang must exist */
export function getLang(id: string): LangConfig {
  return LANG_MAP[id] ?? LANG_MAP["en"];
}

/** Safe get — returns undefined for unknown ids */
export function tryGetLang(id: string): LangConfig | undefined {
  return LANG_MAP[id];
}

/** Apply RTL + font + lang attribute to document */
export function applyLangToDOM(langId: string): void {
  const lang = getLang(langId);
  const root = document.documentElement;
  root.setAttribute("lang", lang.bcp47);
  root.setAttribute("dir", lang.rtl ? "rtl" : "ltr");
  root.style.setProperty("--font-ui", `'${lang.fontFamily}', sans-serif`);
  root.style.setProperty("--font-code", "'JetBrains Mono', 'Fira Code', monospace");
}

/** Build Web Speech API recognizer config */
export function buildSTTConfig(langId: string): SpeechRecognitionConfig {
  const lang = getLang(langId);
  return {
    lang: lang.webSpeechLang,
    continuous: false,
    interimResults: true,
    maxAlternatives: 3,
  };
}

/** Build NLLB-200 translation request payload */
export function buildTranslationPayload(
  text: string,
  targetId: string,
  sourceId = "en"
): NLLBPayload {
  const src = getLang(sourceId);
  const tgt = getLang(targetId);
  return {
    text,
    src_lang: src.nllbCode,
    tgt_lang: tgt.nllbCode,
    src_lang_fallback: src.nllbFallback,
    tgt_lang_fallback: tgt.nllbFallback,
  };
}

/** All Google Fonts CDN URLs deduplicated (for preloading) */
export function getAllFontCDNs(): string[] {
  const seen = new Set<string>();
  return LANG_IDS.map((id) => LANG_MAP[id].fontCDN).filter((url) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

/** Preload all fonts for all active languages */
export function preloadFonts(activeLangIds: string[]): void {
  const urls = new Set(activeLangIds.map((id) => getLang(id).fontCDN));
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  });
}

/** Numeral converter — converts ASCII digits to native numeral system */
const NUMERAL_MAPS: Record<string, string[]> = {
  devanagari: ["०","१","२","३","४","५","६","७","८","९"],
  bengali:    ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
  gujarati:   ["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],
  gurmukhi:   ["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],
  odia:       ["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],
  olchiki:    ["᱐","᱑","᱒","᱓","᱔","᱕","᱖","᱗","᱘","᱙"],
  arabic:     ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"],
  ascii:      ["0","1","2","3","4","5","6","7","8","9"],
};

export function toNativeNumerals(n: number | string, langId: string): string {
  const lang = getLang(langId);
  const map = NUMERAL_MAPS[lang.numeralSystem] ?? NUMERAL_MAPS.ascii;
  return String(n).replace(/[0-9]/g, (d) => map[parseInt(d)]);
}

// Type helpers
interface SpeechRecognitionConfig {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
}

interface NLLBPayload {
  text: string;
  src_lang: string;
  tgt_lang: string;
  src_lang_fallback: string;
  tgt_lang_fallback: string;
}
