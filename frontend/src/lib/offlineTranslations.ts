import type { LanguageCode } from '../store/languageStore';

export interface OfflineLangConfig {
  explainHeader: string;
  explainLinesAndFunc: (lines: number, funcName: string) => string;
  explainLinesOnly: (lines: number) => string;
  explainConcepts: string;
  conceptDef: string;
  conceptSeq: string;
  conceptLoop: string;
  conceptLinear: string;
  conceptCond: string;
  conceptDirect: string;
  conceptRet: string;
  conceptPrint: string;
  explainTipFunc: (funcName: string) => string;
  explainTipNoFunc: string;
  explainOfflineFooter: string;
  explainNoCode: string;
  
  debugHeader: string;
  debugSyntax: string;
  debugIndent: string;
  debugExceptOk: string;
  debugExceptWarn: string;
  debugInputWarn: string;
  debugSuggestionsHeader: string;
  debugSuggest1: string;
  debugSuggest2: string;
  debugSuggest3: string;
  debugOfflineFooter: string;
  debugNoCode: string;

  hintHeader: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4: string;
  hint5: string;
  hintPractice: string;
  hintOfflineFooter: string;

  helloHeader: string;
  helloHelpWith: string;
  helloHelpExplain: string;
  helloHelpDebug: string;
  helloHelpHint: string;
  helloHelpImprove: string;
  helloPrompt: string;
  helloOfflineFooter: string;

  defaultUnderstood: (msg: string) => string;
  defaultWorkingWith: (lines: number) => string;
  defaultExplain: string;
  defaultDebug: string;
  defaultHint: string;
  defaultImprove: string;
  defaultNoCode: string;
  defaultOfflineFooter: string;
}

export const offlineTranslations: Record<LanguageCode, OfflineLangConfig> = {
  en: {
    explainHeader: "📖 **Code Explanation:**",
    explainLinesAndFunc: (lines: number, funcName: string) => `This code has **${lines} lines** and defines a function called \`${funcName}()\`.`,
    explainLinesOnly: (lines: number) => `This code has **${lines} lines** and contains executable logic.`,
    explainConcepts: "**Key concepts used:**",
    conceptDef: "Function definitions",
    conceptSeq: "Sequential execution",
    conceptLoop: "Loops (iteration)",
    conceptLinear: "Linear flow",
    conceptCond: "Conditional logic (if/else)",
    conceptDirect: "Direct execution",
    conceptRet: "Return values",
    conceptPrint: "Print output",
    explainTipFunc: (funcName: string) => `💡 **Tip:** The function \`${funcName}()\` can be called with different arguments to test various inputs!`,
    explainTipNoFunc: "💡 **Tip:** Try breaking this code into smaller functions for better readability!",
    explainOfflineFooter: "*[Offline Mode — Connect Gurujii API for deeper AI-powered analysis]*",
    explainNoCode: "📖 Please open a file in the editor so I can explain the code in detail.\n\n*[Offline Mode]*",
    
    debugHeader: "🔍 **Debug Analysis:**",
    debugSyntax: "✅ **Syntax check:** No obvious syntax errors detected",
    debugIndent: "✅ **Indentation:** Looks consistent",
    debugExceptOk: "✅ **Error handling:** Exception handling present",
    debugExceptWarn: "⚠️ **Warning:** Consider adding try/except blocks for error handling",
    debugInputWarn: "⚠️ **Warning:** User input should be validated",
    debugSuggestionsHeader: "**Suggestions:**",
    debugSuggest1: "1. Add input validation for edge cases",
    debugSuggest2: "2. Consider adding docstrings to functions",
    debugSuggest3: "3. Test with boundary values (0, negative numbers, empty strings)",
    debugOfflineFooter: "*[Offline Mode — Connect Gurujii API for AI-powered debugging]*",
    debugNoCode: "🔍 Please open a file with code so I can debug it for you!\n\n*[Offline Mode]*",

    hintHeader: "💡 **Improvement Hints:**",
    hint1: "1. **Use meaningful variable names** — Makes code self-documenting",
    hint2: "2. **Add type hints** — e.g., \`def greet(name: str) -> str:\`",
    hint3: "3. **Write docstrings** — Explain what each function does",
    hint4: "4. **Handle edge cases** — What if input is None or empty?",
    hint5: "5. **Follow PEP 8** — Python's official style guide",
    hintPractice: "📝 **Practice:** Try refactoring your current code with these tips!",
    hintOfflineFooter: "*[Offline Mode — Connect Gurujii API for personalized recommendations]*",

    helloHeader: "🙏 Namaste! I'm Gurujii, your AI coding tutor.",
    helloHelpWith: "I can help you with:",
    helloHelpExplain: "• 📖 **Explain Code** — Understand what your code does",
    helloHelpDebug: "• 🐛 **Debug** — Find and fix errors",
    helloHelpHint: "• 💡 **Get Hints** — Learn best practices",
    helloHelpImprove: "• ✨ **Improve** — Make your code better",
    helloPrompt: "Just type your question or use the quick action buttons above!",
    helloOfflineFooter: "*[Running in Offline Mode]*",

    defaultUnderstood: (msg: string) => `🤖 I understood your question: "${msg}"`,
    defaultWorkingWith: (lines: number) => `I can see you're working with code that has **${lines} lines**. Here are some things I can help with:`,
    defaultExplain: "• Click **\"Explain Code\"** for a detailed walkthrough",
    defaultDebug: "• Click **\"Debug\"** to find potential issues",
    defaultHint: "• Click **\"Get Hint\"** for improvement suggestions",
    defaultImprove: "• Click **\"Improve\"** for best practices",
    defaultNoCode: "Open a file in the editor and I can help you understand, debug, or improve your code!",
    defaultOfflineFooter: "*[Offline Mode — For full AI responses, start the Gurujii API server]*",
  },
  hi: {
    explainHeader: "📖 **कोड स्पष्टीकरण:**",
    explainLinesAndFunc: (lines: number, funcName: string) => `इस कोड में **${lines} लाइनें** हैं और यह \`${funcName}()\` नामक एक फ़ंक्शन को परिभाषित करता है।`,
    explainLinesOnly: (lines: number) => `इस कोड में **${lines} लाइनें** हैं और इसमें निष्पादन योग्य लॉजिक है।`,
    explainConcepts: "**उपयोग की गई मुख्य अवधारणाएं:**",
    conceptDef: "फ़ंक्शन परिभाषाएँ (Function definitions)",
    conceptSeq: "क्रमिक निष्पादन (Sequential execution)",
    conceptLoop: "लूप / लूपिंग (Loops / Iteration)",
    conceptLinear: "रैखिक प्रवाह (Linear flow)",
    conceptCond: "सशर्त तर्क / इफ-एल्स (Conditional logic / if-else)",
    conceptDirect: "प्रत्यक्ष निष्पादन (Direct execution)",
    conceptRet: "रिटर्न मान (Return values)",
    conceptPrint: "प्रिंट आउटपुट (Print output)",
    explainTipFunc: (funcName: string) => `💡 **सुझाव:** विभिन्न इनपुट के साथ फ़ंक्शन \`${funcName}()\` को कॉल करके इसका परीक्षण किया जा सकता है!`,
    explainTipNoFunc: "💡 **सुझाव:** बेहतर पठनीयता के लिए इस कोड को छोटे फ़ंक्शंस में विभाजित करने का प्रयास करें!",
    explainOfflineFooter: "*[ऑफ़लाइन मोड — गहरे एआई-संचालित विश्लेषण के लिए गुरुजी एपीआई से कनेक्ट करें]*",
    explainNoCode: "📖 कृपया संपादक में एक फ़ाइल खोलें ताकि मैं कोड को विस्तार से समझा सकूं।\n\n*[ऑफ़लाइन मोड]*",

    debugHeader: "🔍 **डीबग विश्लेषण:**",
    debugSyntax: "✅ **सिंटैक्स जांच:** कोई स्पष्ट सिंटैक्स त्रुटियां नहीं मिलीं",
    debugIndent: "✅ **इंडेंटेशन:** सुसंगत लग रहा है",
    debugExceptOk: "✅ **त्रुटि प्रबंधन:** एक्सेप्शन हैंडलिंग उपस्थित है",
    debugExceptWarn: "⚠️ **चेतावनी:** त्रुटियों को संभालने के लिए try/except ब्लॉक जोड़ने पर विचार करें",
    debugInputWarn: "⚠️ **चेतावनी:** उपयोगकर्ता इनपुट को सत्यापित (validate) किया जाना चाहिए",
    debugSuggestionsHeader: "**सुझाव:**",
    debugSuggest1: "1. सीमांत मामलों (edge cases) के लिए इनपुट सत्यापन जोड़ें",
    debugSuggest2: "2. फ़ंक्शंस में डॉकस्ट्रिंग (docstrings) जोड़ने पर विचार करें",
    debugSuggest3: "3. सीमा मूल्यों (0, नकारात्मक संख्याएं, खाली स्ट्रिंग) के साथ परीक्षण करें",
    debugOfflineFooter: "*[ऑफ़लाइन मोड — एआई-संचालित डीबगिंग के लिए गुरुजी एपीआई से कनेक्ट करें]*",
    debugNoCode: "🔍 कृपया कोड वाली फ़ाइल खोलें ताकि मैं आपके लिए इसे डीबग कर सकूं!\n\n*[ऑफ़लाइन मोड]*",

    hintHeader: "💡 **सुधार के संकेत:**",
    hint1: "1. **सार्थक चर नामों का उपयोग करें** — कोड को स्व-दस्तावेजी (self-documenting) बनाता है",
    hint2: "2. **प्रकार संकेत (type hints) जोड़ें** — उदा., \`def greet(name: str) -> str:\`",
    hint3: "3. **डॉकस्ट्रिंग लिखें** — समझाएं कि प्रत्येक फ़ंक्शन क्या करता है",
    hint4: "4. **सीमांत मामलों को संभालें** — क्या होगा यदि इनपुट None या खाली है?",
    hint5: "5. **PEP 8 का पालन करें** — पायथन की आधिकारिक शैली गाइड",
    hintPractice: "📝 **अभ्यास:** इन सुझावों के साथ अपने वर्तमान कोड को रिफैक्टर करने का प्रयास करें!",
    hintOfflineFooter: "*[ऑफ़लाइन मोड — व्यक्तिगत सिफारिशों के लिए गुरुजी एपीआई से कनेक्ट करें]*",

    helloHeader: "🙏 नमस्ते! मैं गुरुजी हूँ, आपका एआई कोडिंग ट्यूटर।",
    helloHelpWith: "मैं आपकी इसमें मदद कर सकता हूँ:",
    helloHelpExplain: "• 📖 **कोड स्पष्टीकरण** — समझें कि आपका कोड क्या करता है",
    helloHelpDebug: "• 🐛 **डीबग** — त्रुटियों को ढूंढें और ठीक करें",
    helloHelpHint: "• 💡 **संकेत प्राप्त करें** — सर्वोत्तम अभ्यास सीखें",
    helloHelpImprove: "• ✨ **सुधार करें** — अपने कोड को बेहतर बनाएं",
    helloPrompt: "बस अपना प्रश्न टाइप करें या ऊपर दिए गए त्वरित कार्रवाई बटनों का उपयोग करें!",
    helloOfflineFooter: "*[ऑफ़लाइन मोड में चल रहा है]*",

    defaultUnderstood: (msg: string) => `🤖 मैं आपका प्रश्न समझ गया: "${msg}"`,
    defaultWorkingWith: (lines: number) => `मैं देख सकता हूँ कि आप उस कोड पर काम कर रहे हैं जिसमें **${lines} लाइनें** हैं। यहाँ कुछ चीजें दी गई हैं जिनमें मैं मदद कर सकता हूँ:`,
    defaultExplain: "• विस्तृत वॉकथ्रू के लिए **\"कोड स्पष्टीकरण\"** पर क्लिक करें",
    defaultDebug: "• संभावित समस्याओं को खोजने के लिए **\"डीबग\"** पर क्लिक करें",
    defaultHint: "• सुधार के सुझावों के लिए **\"संकेत प्राप्त करें\"** पर क्लिक करें",
    defaultImprove: "• सर्वोत्तम प्रथाओं के लिए **\"सुधार करें\"** पर क्लिक करें",
    defaultNoCode: "संपादक में एक फ़ाइल खोलें और मैं आपके कोड को समझने, डीबग करने या सुधारने में आपकी सहायता कर सकता हूँ!",
    defaultOfflineFooter: "*[ऑफ़लाइन मोड — पूर्ण एआई प्रतिक्रियाओं के लिए, गुरुजी एपीआई सर्वर शुरू करें]*",
  },
  ta: {
    explainHeader: "📖 **குறியீடு விளக்கம்:**",
    explainLinesAndFunc: (lines: number, funcName: string) => `இந்த குறியீட்டில் **${lines} வரிகள்** உள்ளன மற்றும் இது \`${funcName}()\` என்ற செயல்பாட்டை வரையறுக்கிறது.`,
    explainLinesOnly: (lines: number) => `இந்த குறியீட்டில் **${lines} வரிகள்** உள்ளன மற்றும் இயக்கக்கூடிய தர்க்கத்தைக் கொண்டுள்ளது.`,
    explainConcepts: "**பயன்படுத்தப்பட்ட முக்கிய கருத்துக்கள்:**",
    conceptDef: "செயல்பாட்டு வரையறைகள் (Function definitions)",
    conceptSeq: "செயல்முறை குறியீடு இயக்கம் (Sequential execution)",
    conceptLoop: "மடக்குகள் (Loops / Iteration)",
    conceptLinear: "நேரியல் ஓட்டம் (Linear flow)",
    conceptCond: "நிபந்தனை தர்க்கம் (Conditional logic / if-else)",
    conceptDirect: "நேரடி இயக்கம் (Direct execution)",
    conceptRet: "மதிப்புகளைத் திருப்புதல் (Return values)",
    conceptPrint: "வெளியீட்டை அச்சிடுதல் (Print output)",
    explainTipFunc: (funcName: string) => `💡 **உதவிக்குறிப்பு:** வெவ்வேறு உள்ளீடுகளுடன் \`${funcName}()\` செயல்பாட்டை அழைத்துச் சோதிக்கலாம்!`,
    explainTipNoFunc: "💡 **உதவிக்குறிப்பு:** சிறந்த வாசிப்புத்திறனுக்காக இந்தக் குறியீட்டைச் சிறிய செயல்பாடுகளாகப் பிரிக்க முயற்சிக்கவும்!",
    explainOfflineFooter: "*[ஆஃப்லைன் பயன்முறை — ஆழ்ந்த AI-ஆற்றல் கொண்ட பகுப்பாய்விற்கு குருஜி API ஐ இணைக்கவும்]*",
    explainNoCode: "📖 குறியீட்டை விரிவாக விளக்குவதற்கு எடிட்டரில் ஒரு கோப்பைத் திறக்கவும்.\n\n*[ஆஃப்லைன் பயன்முறை]*",

    debugHeader: "🔍 **பிழைத்திருத்த பகுப்பாய்வு:**",
    debugSyntax: "✅ **தொடரியல் சரிபார்ப்பு:** தெளிவான தொடரியல் பிழைகள் எதுவும் கண்டறியப்படவில்லை",
    debugIndent: "✅ **உள்வாங்கல் (Indentation):** சீராக உள்ளது",
    debugExceptOk: "✅ **பிழை கையாளுதல்:** எக்ஸ்செப்ஷன் கையாளுதல் உள்ளது",
    debugExceptWarn: "⚠️ **எச்சரிக்கை:** பிழைகளைக் கையாள try/except தொகுதிகளைச் சேர்ப்பதைக் கவனியுங்கள்",
    debugInputWarn: "⚠️ **எச்சரிக்கை:** பயனர் உள்ளீடு சரிபார்க்கப்பட வேண்டும்",
    debugSuggestionsHeader: "**பரிந்துரைகள்:**",
    debugSuggest1: "1. எல்லை வழக்குகளுக்கு (edge cases) உள்ளீட்டு சரிபார்ப்பைச் சேர்க்கவும்",
    debugSuggest2: "2. செயல்பாடுகளுக்கு டாக்ஸ்ட்ரிங்ஸ் (docstrings) சேர்ப்பதைக் கவனியுங்கள்",
    debugSuggest3: "3. எல்லை மதிப்புகளுடன் (0, எதிர்மறை எண்கள், காலியான சரங்கள்) சோதனை செய்யவும்",
    debugOfflineFooter: "*[ஆஃப்லைன் பயன்முறை — AI-ஆற்றல் கொண்ட பிழைத்திருத்தத்திற்கு குருஜி API ஐ இணைக்கவும்]*",
    debugNoCode: "🔍 நான் உங்களுக்காகப் பிழைத்திருத்த குறியீட்டைக் கொண்ட கோப்பைத் திறக்கவும்!\n\n*[ஆஃப்லைன் பயன்முறை]*",

    hintHeader: "💡 **மேம்பாட்டு குறிப்புகள்:**",
    hint1: "1. **பொருளுள்ள மாறிகளின் பெயர்களைப் பயன்படுத்தவும்** — குறியீட்டைத் தானே விளக்கும்படி செய்கிறது",
    hint2: "2. **வகை குறிப்புகளைச் சேர்க்கவும்** — எ.கா., \`def greet(name: str) -> str:\`",
    hint3: "3. **டாக்ஸ்ட்ரிங்ஸ் எழுதவும்** — ஒவ்வொரு செயல்பாடும் என்ன செய்கிறது என்பதை விளக்குங்கள்",
    hint4: "4. **எல்லை வழக்குகளைக் கையாளுங்கள்** — உள்ளீடு None அல்லது காலியாக இருந்தால் என்ன செய்வது?",
    hint5: "5. **PEP 8 ஐப் பின்பற்றுங்கள்** — பைத்தானின் அதிகாரப்பூர்வ பாணி வழிகாட்டி",
    hintPractice: "📝 **பயிற்சி:** இந்த உதவிக்குறிப்புகளுடன் உங்கள் தற்போதைய குறியீட்டை மீண்டும் மாற்றியமைக்க முயற்சிக்கவும்!",
    hintOfflineFooter: "*[ஆஃப்லைன் பயன்முறை — தனிப்பயனாக்கப்பட்ட பரிந்துரைகளுக்கு குருஜி API ஐ இணைக்கவும்]*",

    helloHeader: "🙏 வணக்கம்! நான் குருஜி, உங்கள் AI குறியீட்டு ஆசிரியர்.",
    helloHelpWith: "நான் உங்களுக்கு உதவ முடியும்:",
    helloHelpExplain: "• 📖 **குறியீடு விளக்கம்** — உங்கள் குறியீடு என்ன செய்கிறது என்பதைப் புரிந்து கொள்ளுங்கள்",
    helloHelpDebug: "• 🐛 **பிழைத்திருத்தம்** — பிழைகளைக் கண்டுபிடித்து சரிசெய்யவும்",
    helloHelpHint: "• 💡 **குறிப்புகளைப் பெறுங்கள்** — சிறந்த நடைமுறைகளைக் கற்றுக்கொள்ளுங்கள்",
    helloHelpImprove: "• ✨ **மேம்படுத்துங்கள்** — உங்கள் குறியீட்டைச் சிறந்ததாக்குங்கள்",
    helloPrompt: "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் அல்லது மேலே உள்ள விரைவு நடவடிக்கை பொத்தான்களைப் பயன்படுத்தவும்!",
    helloOfflineFooter: "*[ஆஃப்லைன் பயன்முறையில் இயங்குகிறது]*",

    defaultUnderstood: (msg: string) => `🤖 உங்கள் கேள்வியை நான் புரிந்துகொண்டேன்: "${msg}"`,
    defaultWorkingWith: (lines: number) => `நீங்கள் **${lines} வரிகள்** கொண்ட குறியீட்டில் வேலை செய்கிறீர்கள் என்பதை என்னால் பார்க்க முดูกிறது. நான் உதவக்கூடிய சில விஷயங்கள் இங்கே உள்ளன:`,
    defaultExplain: "• விரிவான வழிகாட்டிக்கு **\"குறியீடு விளக்கம்\"** என்பதைக் கிளிக் செய்யவும்",
    defaultDebug: "• சாத்தியமான சிக்கல்களைக் கண்டறிய **\"பிழைத்திருத்தம்\"** என்பதைக் கிளிக் செய்யவும்",
    defaultHint: "• மேம்பாட்டு பரிந்துரைகளுக்கு **\"குறிப்பைப் பெறுங்கள்\"** என்பதைக் கிளிக் செய்யவும்",
    defaultImprove: "• சிறந்த நடைமுறைகளுக்கு **\"மேம்படுத்துங்கள்\"** என்பதைக் கிளிக் செய்யவும்",
    defaultNoCode: "எடிட்டரில் ஒரு கோப்பைத் திறக்கவும், உங்கள் குறியீட்டைப் புரிந்துகொள்ள, பிழைத்திருத்த அல்லது மேம்படுத்த நான் உங்களுக்கு உதவ முடியும்!",
    defaultOfflineFooter: "*[ஆஃப்லைன் பயன்முறை — முழுமையான AI பதில்களுக்கு, குருஜி API சேவையகத்தைத் தொடங்கவும்]*",
  },
  bn: {
    explainHeader: "📖 **কোড ব্যাখ্যা:**",
    explainLinesAndFunc: (lines: number, funcName: string) => `এই কোডটিতে **${lines}টি লাইন** আছে এবং এটি \`${funcName}()\` নামক একটি ফাংশন সংজ্ঞায়িত করে।`,
    explainLinesOnly: (lines: number) => `এই কোডটিতে **${lines}টি লাইন** আছে এবং এতে কার্যকারী লজিক রয়েছে।`,
    explainConcepts: "**ব্যবহৃত মূল ধারণাসমূহ:**",
    conceptDef: "ফাংশন সংজ্ঞা (Function definitions)",
    conceptSeq: "ক্রমিক নির্বাহ (Sequential execution)",
    conceptLoop: "লুপ / পুনরাবৃত্তি (Loops / Iteration)",
    conceptLinear: "রৈখিক প্রবাহ (Linear flow)",
    conceptCond: "শর্তাধীন লজিক / ইফ-এলস (Conditional logic / if-else)",
    conceptDirect: "সরাসরি নির্বাহ (Direct execution)",
    conceptRet: "রিটার্ন মান (Return values)",
    conceptPrint: "আউটপুট প্রিন্ট করা (Print output)",
    explainTipFunc: (funcName: string) => `💡 **টিপ:** বিভিন্ন ইনপুট দিয়ে \`${funcName}()\` ফাংশনটি কল করে পরীক্ষা করতে পারেন!`,
    explainTipNoFunc: "💡 **টিপ:** আরও ভালো পঠনযোগ্যতার জন্য এই কোডটিকে ছোট ছোট ফাংশনে ভাগ করার চেষ্টা করুন!",
    explainOfflineFooter: "*[অফলাইন মোড — আরও গভীর এআর-চালিত বিশ্লেষণের জন্য গুরুজি এপিআই সংযুক্ত করুন]*",
    explainNoCode: "📖 অনুগ্রহ করে এডিটরে একটি ফাইল খুলুন যাতে আমি কোডটি বিস্তারিত ব্যাখ্যা করতে পারি।\n\n*[অফলাইন মোড]*",

    debugHeader: "🔍 **ডিবাগ বিশ্লেষণ:**",
    debugSyntax: "✅ **সিনট্যাক্স চেক:** কোনো স্পষ্ট সিনট্যাক্স ত্রুটি সনাক্ত করা যায়নি",
    debugIndent: "✅ **ইন্ডেন্টেশন:** সামঞ্জস্যপূর্ণ মনে হচ্ছে",
    debugExceptOk: "✅ **ত্রুটি হ্যান্ডলিং:** এক্সেপশন হ্যান্ডলিং উপস্থিত রয়েছে",
    debugExceptWarn: "⚠️ **সতর্কতা:** ত্রুটিগুলি পরিচালনা করতে try/except ব্লক যুক্ত করার কথা বিবেচনা করুন",
    debugInputWarn: "⚠️ **সতর্কতা:** ব্যবহারকারীর ইনপুট যাচাই (validate) করা উচিত",
    debugSuggestionsHeader: "**পরামর্শ:**",
    debugSuggest1: "1. প্রান্তিক ক্ষেত্রের (edge cases) জন্য ইনপুট যাচাইকরণ যুক্ত করুন",
    debugSuggest2: "2. ফাংশনগুলিতে ডকস্ট্রিং (docstrings) যুক্ত করার কথা বিবেচনা করুন",
    debugSuggest3: "3. সীমানা মান (0, ঋণাত্মক সংখ্যা, খালি স্ট্রিং) দিয়ে পরীক্ষা করুন",
    debugOfflineFooter: "*[অফলাইন মোড — এআই-চালিত ডিবাগিংয়ের জন্য গুরুজি এপিআই সংযুক্ত করুন]*",
    debugNoCode: "🔍 অনুগ্রহ করে কোড সহ একটি ফাইল খুলুন যাতে আমি আপনার জন্য এটি ডিবাগ করতে পারি!\n\n*[অফলাইন মোড]*",

    hintHeader: "💡 **উন্নতিকরণের ইঙ্গিত:**",
    hint1: "1. **অর্থপূর্ণ ভেরিয়েবলের নাম ব্যবহার করুন** — কোডটিকে স্ব-নথিপত্রিত (self-documenting) করে তোলে",
    hint2: "2. **টাইপ হিন্টস যুক্ত করুন** — যেমন, \`def greet(name: str) -> str:\`",
    hint3: "3. **ডকস্ট্রিং লিখুন** — প্রতিটি ফাংশন কী কাজ করে তা ব্যাখ্যা করুন",
    hint4: "4. **প্রান্তিক কেসগুলি পরিচালনা করুন** — ইনপুট None বা খালি হলে কী হবে?",
    hint5: "5. **PEP 8 অনুসরণ করুন** — পাইথনের অফিসিয়াল স্টাইল গাইড",
    hintPractice: "📝 **অনুশীলন:** এই টিপসগুলির সাহায্যে আপনার বর্তমান কোডটি রিফ্যাক্টর করার চেষ্টা করুন!",
    hintOfflineFooter: "*[অফলাইন মোড — ব্যক্তিগতকৃত সুপারিশের জন্য গুরুজি এপিআই সংযুক্ত করুন]*",

    helloHeader: "🙏 নমস্কার! আমি গুরুজি, আপনার এআই কোডিং টিউটর।",
    helloHelpWith: "আমি আপনাকে সাহায্য করতে পারি:",
    helloHelpExplain: "• 📖 **কোড ব্যাখ্যা** — আপনার কোড কী করে তা বুঝুন",
    helloHelpDebug: "• 🐛 **ডিবাগ** — ত্রুটিগুলি খুঁজুন এবং ঠিক করুন",
    helloHelpHint: "• 💡 **ইঙ্গিত পান** — সর্বোত্তম অনুশীলনগুলি শিখুন",
    helloHelpImprove: "• ✨ **উন্নত করুন** — আপনার কোডকে আরও ভালো করুন",
    helloPrompt: "শুধু আপনার প্রশ্নটি টাইপ করুন বা উপরের দ্রুত অ্যাকশন বোতামগুলি ব্যবহার করুন!",
    helloOfflineFooter: "*[অফলাইন মোডে চলছে]*",

    defaultUnderstood: (msg: string) => `🤖 আমি আপনার প্রশ্নটি বুঝতে পেরেছি: "${msg}"`,
    defaultWorkingWith: (lines: number) => `আমি দেখতে পাচ্ছি যে আপনি এমন কোড নিয়ে কাজ করছেন যার **${lines}টি লাইন** রয়েছে। এখানে কিছু জিনিস রয়েছে যা আমি সাহায্য করতে পারি:`,
    defaultExplain: "• বিস্তারিত নির্দেশিকার জন্য **\"কোড ব্যাখ্যা\"** ক্লিক করুন",
    defaultDebug: "• সম্ভাব্য সমস্যাগুলি খুঁজতে **\"ডিবাগ\"** ক্লিক করুন",
    defaultHint: "• উন্নতিকরণের পরামর্শের জন্য **\"ইঙ্গিত পান\"** ক্লিক করুন",
    defaultImprove: "• সর্বোত্তম অনুশীলনের জন্য **\"উন্নত করুন\"** ক্লিক করুন",
    defaultNoCode: "এডিটরে একটি ফাইল খুলুন এবং আমি আপনাকে আপনার কোডটি বুঝতে, ডিবাগ করতে বা উন্নত করতে সাহায্য করতে পারি!",
    defaultOfflineFooter: "*[অফলাইন মোড — সম্পূর্ণ এআই প্রতিক্রিয়ার জন্য, গুরুজি এপিআই সার্ভার শুরু করুন]*",
  },
  te: buildGenericTutorData("తెలుగు", "నమస్కారం! నేను గురుజీ, మీ AI కోడింగ్ ట్యూటర్.", "కోడ్ వివరణ", "డీబగ్ విశ్లేషణ", "మెరుగుదల సూచనలు", "దయచేసి ఎడిటర్ లో ఒక ఫైల్ తెరవండి.", "ఆఫ్ లైన్ మోడ్"),
  mr: buildGenericTutorData("मराठी", "नमस्कार! मी गुरुजी आहे, तुमचा एआय कोडिंग ट्यूटर.", "कोड स्पष्टीकरण", "डीबग विश्लेषण", "सुधारणेचे संकेत", "कृपया आधी एडिटरमध्ये एक फाईल उघडा.", "ऑफलाइन मोड"),
  gu: buildGenericTutorData("ગુજરાતી", "નમસ્તે! હું ગુરુજી છું, તમારો AI કોડિંગ ટ્યુટર.", "કોડ સ્પષ્ટીકરણ", "ડીબગ વિશ્લેષણ", "સુધારણા માટેના સંકેતો", "કૃપા કરીને પહેલા એડિટરમાં ફાઇલ ખોલો.", "ઓફલાઇન મોડ"),
  kn: buildGenericTutorData("ಕನ್ನಡ", "ನಮಸ್ಕಾರ! ನಾನು ಗುರುಜಿ, ನಿಮ್ಮ AI ಕೋಡಿಂಗ್ ಬೋಧಕ.", "ಕೋಡ್ ವಿವರಣೆ", "ಡೀಬಗ್ ವಿಶ್ಲೇಷಣೆ", "ಸುಧಾರಣೆಯ ಸುಳಿವುಗಳು", "ದಯವಿಟ್ಟು ಮೊದಲು ಎಡಿಟರ್‌ನಲ್ಲಿ ಫೈಲ್ ತೆರೆಯಿರಿ.", "ಆಫ್‌ಲೈನ್ ಮೋಡ್"),
  ml: buildGenericTutorData("മലയാളം", "നമസ്കാരം! ഞാൻ ഗുരുജി, നിങ്ങളുടെ AI കോഡിംഗ് ട്യൂട്ടർ.", "കോഡ് വിശദീകരണം", "ഡീബഗ് വിശകലനം", "മെച്ചപ്പെടുത്തൽ നിർദ്ദേശങ്ങൾ", "ദയവായി ആദ്യം എഡിറ്ററില് ഒരു ഫയല് തുറക്കുക.", "ഓഫ്‌ലൈൻ മോഡ്"),
  as: buildGenericTutorData("অসমীয়া", "নমস্কাৰ! মই গুৰুজী, আপোনাৰ এআই ক’ডিং টিউটৰ।", "কোড ব্যাখ্যা", "ডিবাগ বিশ্লেষণ", "উন্নতিকৰণৰ ইংগিত", "অনুগ্ৰহ কৰি প্ৰথমে এডিটৰত এটা ফাইল খোলক।", "অফলাইন মোড"),
  pa: buildGenericTutorData("ਪੰਜਾਬੀ", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਗੁਰੂਜੀ ਹਾਂ, ਤੁਹਾਡਾ AI ਕੋਡਿੰਗ ਟਿਊਟਰ।", "ਕੋਡ ਦੀ ਵਿਆਖਿਆ", "ਡੀਬੱਗ ਵਿਸ਼ਲੇਸ਼ਣ", "ਸੁਧਾਰ ਦੇ ਸੰਕੇਤ", "ਕਿਰਪा ਕਰਕੇ ਪਹਿਲਾਂ ਸੰਪਾਦਕ ਵਿੱਚ ਇੱਕ ਫਾਈਲ ਖੋਲ੍ਹੋ।", "ਔਫਲਾਈਨ ਮੋਡ"),
  or: buildGenericTutorData("ଓଡ଼ିଆ", "ନମସ୍କାର! ମୁଁ ଗୁରୁଜୀ, ଆପଣଙ୍କ ଏଆଇ କୋଡିଂ ଟ୍ୟୁଟର।", "କୋଡ୍ ବ୍ୟାଖ୍ୟା", "ଡିବଗ୍ ବିଶ୍ଳେଷଣ", "ସୁଧାର ସଂକେତ", "ଦୟାକରି ପ୍ରଥମେ ଏଡିଟରରେ ଏକ ଫାଇଲ୍ ଖୋଲନ୍ତୁ ।", "ଅଫଲାଇନ ମୋଡ"),
  ur: buildGenericTutorData("اردو", "السلام علیکم! میں گورو جی ہوں، آپ کا اے آئی کوڈنگ ٹیوٹر۔", "کوڈ کی وضاحت", "ڈیبگ تجزیہ", "بہتری کے اشارے", "براہ کرم پہلے ایڈیٹر میں ایک فائل کھولیں۔", "آف لائن موڈ"),
  sd: buildGenericTutorData("سنڌي", "سلام! مان گرو جي آهيان، توهان جو AI ڪوڊنگ ٽيوٽر.", "ڪوڊ جي وضاحت", "ڊيبگ تجزيو", "بهتريءَ جا اشارا", "مهرباني ڪري پهريان ايڊيٽر ۾ هڪ فائل کوليو.", "آف لائن موڊ"),
  sa: buildGenericTutorData("संस्कृतम्", "नमो नमः! अहं गुरुजी अस्मि, भवतः एआई कोडिंग शिक्षकः।", "कोडविवरणम्", "दोषविश्लेषणम्", "सुधारसङ्केताः", "कृपया प्रथमं सम्पादके सञ्चिकां उद्घाटयतु।", "ऑफ़लाइन पद्धतिः"),
  ne: buildGenericTutorData("नेपाली", "नमस्ते! म गुरुजी हुँ, तपाइँको एआई कोडिङ ट्युटर।", "कोड स्पष्टीकरण", "डिबग विश्लेषण", "सुधारका संकेतहरू", "कृपया पहिले सम्पादकमा फाइल खोल्नुहोस्।", "अफ़लाइन मोड"),
  kok: buildGenericTutorData("कोंकणी", "नमस्कार! हांव गुरुजी, तुमचो एआय कोडींग ट्युटर.", "कोड स्पष्टीकरण", "डीबग विश्लेषण", "सुधारणेचे संकेत", "कृपया पयलीं एडिटर हातूंत एक फाइल उगडात.", "ऑफलाइन मोड"),
  brx: buildGenericTutorData("बड़ो", "खुलुमबाय! आं गुरुजी, नोंथांनि एआई कडिंग ट्यूटर।", "कोड बेखेवनाय", "डीबग बिजिरनाय", "मोजां खालामनायनि इसारा", "अननानै सिगां एडिटराव मोनसे फाइल खेव।", "ऑफलाइन मोड"),
  doi: buildGenericTutorData("डोगरी", "नमस्ते! मैं गुरुजी आं, तुंदा एआई कोडिंग ट्यूटर।", "कोड दी व्याख्या", "डीबग विश्लेषण", "सुधार दे संकेत", "कृपया पैले एडिटर च इक फाइल खोलो।", "ऑफलाइन मोड"),
  kas: buildGenericTutorData("كٲشُر", "اسلام علیکم! بہٕ چھُس گورو جی، تُہند اے آئی کوڈنگ ٹیوٹر।", "کوڈ تشریح", "ڈیبگ تجزیہ", "بہتری ہند اشارہ", "مہربانی کٔرتھ کھولیو گوڈہ ایڈیٹرس منز فائل।", "آف لائن موڈ"),
  mai: buildGenericTutorData("मैथिली", "प्रणाम! हम गुरुजी छी, अहाँक एআই कोडिंग ट्यूटर।", "कोड स्पष्टीकरण", "डीबग विश्लेषण", "सुधार क संकेत", "कृपया पहिने संपादक में एकटा फाइल खोलू।", "ऑफलाइन मोड"),
  mni: buildGenericTutorData("Manipuri", "ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯑꯩꯍꯥꯛ ꯒꯨꯔꯨꯖꯤꯅꯤ, ꯅꯍꯥꯛꯀꯤ ꯑꯦꯑꯥꯏ ꯀꯣꯗꯤꯡ ꯇ꯭ꯌꯨꯇꯔꯅꯤ꯫", "ꯀꯣꯗ ꯁꯟꯗꯣꯛꯅ ꯇꯥꯛꯄ", "ꯗꯤꯕꯒ ꯊꯤꯖꯤꯟꯕ", "ꯐꯒꯠꯍꯟꯅꯕ ꯇꯥꯛꯄ", "ꯆꯥꯟꯕꯤꯗꯨꯅꯥ ꯑꯍꯥꯟꯕꯗ ꯑꯦꯗꯤꯇꯔꯗ ꯐꯥꯏꯜ ꯑꯃꯥ ꯍꯥꯡꯗꯣꯛꯄꯤꯌꯨ꯫", "ꯑꯣꯐꯂꯥꯏꯟ ꯃꯣꯗ"),
  sat: buildGenericTutorData("Santali", "Johar! Inged Gurujii, abenah AI coding tutor.", "Code Explanation", "Debug Analysis", "Improvement Hints", "Daya kate layah me editor re file kholo me.", "Offline Mode"),
};

// Generic translator generator that constructs type-safe entries with native hooks
function buildGenericTutorData(
  langNativeName: string,
  hello: string,
  explainHeader: string,
  debugHeader: string,
  hintHeader: string,
  nocode: string,
  offlineLabel: string
): OfflineLangConfig {
  return {
    explainHeader: `📖 **${explainHeader}:**`,
    explainLinesAndFunc: (lines: number, funcName: string) => `This code has **${lines} lines** and defines a function called \`${funcName}()\` in ${langNativeName}.`,
    explainLinesOnly: (lines: number) => `This code has **${lines} lines** and contains executable logic in ${langNativeName}.`,
    explainConcepts: `**Key concepts used (${langNativeName}):**`,
    conceptDef: "Function definitions",
    conceptSeq: "Sequential execution",
    conceptLoop: "Loops (iteration)",
    conceptLinear: "Linear flow",
    conceptCond: "Conditional logic (if/else)",
    conceptDirect: "Direct execution",
    conceptRet: "Return values",
    conceptPrint: "Print output",
    explainTipFunc: (funcName: string) => `💡 **Tip:** The function \`${funcName}()\` can be called with different arguments to test various inputs!`,
    explainTipNoFunc: "💡 **Tip:** Try breaking this code into smaller functions for better readability!",
    explainOfflineFooter: `*[${offlineLabel} — Connect Gurujii API for deeper AI-powered analysis]*`,
    explainNoCode: `📖 ${nocode}\n\n*[${offlineLabel}]*`,
    
    debugHeader: `🔍 **${debugHeader}:**`,
    debugSyntax: "✅ **Syntax check:** No obvious syntax errors detected",
    debugIndent: "✅ **Indentation:** Looks consistent",
    debugExceptOk: "✅ **Error handling:** Exception handling present",
    debugExceptWarn: "⚠️ **Warning:** Consider adding try/except blocks for error handling",
    debugInputWarn: "⚠️ **Warning:** User input should be validated",
    debugSuggestionsHeader: "**Suggestions:**",
    debugSuggest1: "1. Add input validation for edge cases",
    debugSuggest2: "2. Consider adding docstrings to functions",
    debugSuggest3: "3. Test with boundary values (0, negative numbers, empty strings)",
    debugOfflineFooter: `*[${offlineLabel} — Connect Gurujii API for AI-powered debugging]*`,
    debugNoCode: `🔍 ${nocode}\n\n*[${offlineLabel}]*`,

    hintHeader: `💡 **${hintHeader}:**`,
    hint1: "1. **Use meaningful variable names** — Makes code self-documenting",
    hint2: "2. **Add type hints** — e.g., \`def greet(name: str) -> str:\`",
    hint3: "3. **Write docstrings** — Explain what each function does",
    hint4: "4. **Handle edge cases** — What if input is None or empty?",
    hint5: "5. **Follow PEP 8** — Python's official style guide",
    hintPractice: "📝 **Practice:** Try refactoring your current code with these tips!",
    hintOfflineFooter: `*[${offlineLabel} — Connect Gurujii API for personalized recommendations]*`,

    helloHeader: `🙏 ${hello}`,
    helloHelpWith: "I can help you with:",
    helloHelpExplain: `• 📖 **${explainHeader}** — Understand what your code does`,
    helloHelpDebug: `• 🐛 **Debug** — Find and fix errors`,
    helloHelpHint: `• 💡 **${hintHeader}** — Learn best practices`,
    helloHelpImprove: "• ✨ **Improve** — Make your code better",
    helloPrompt: "Just type your question or use the quick action buttons above!",
    helloOfflineFooter: `*[${offlineLabel}]*`,

    defaultUnderstood: (msg: string) => `🤖 I understood your question in ${langNativeName}: "${msg}"`,
    defaultWorkingWith: (lines: number) => `I can see you're working with code that has **${lines} lines**. Here are some things I can help with:`,
    defaultExplain: `• Click **"${explainHeader}"** for a detailed walkthrough`,
    defaultDebug: "• Click **\"Debug\"** to find potential issues",
    defaultHint: `• Click **"${hintHeader}"** for improvement suggestions`,
    defaultImprove: "• Click **\"Improve\"** for best practices",
    defaultNoCode: `${nocode}`,
    defaultOfflineFooter: `*[${offlineLabel} — For full AI responses, start the Gurujii API server]*`,
  };
}
