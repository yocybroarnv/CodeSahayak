import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LanguageCode =
  | 'en' | 'hi' | 'ta' | 'bn' | 'te' | 'mr' | 'gu' | 'kn' | 'ml'
  | 'as' | 'brx' | 'doi' | 'kas' | 'kok' | 'mai' | 'mni' | 'ne' | 'or' | 'pa' | 'sa' | 'sat' | 'sd' | 'ur';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
}

export const languages: Record<LanguageCode, Language> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', color: '#6C7A89' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', color: '#D94B5E' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', color: '#FF9A8B' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', color: '#A29BFE' },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', color: '#F18F01' },
  mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', color: '#4ECDC4' },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', color: '#95E1D3' },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', color: '#F38181' },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', color: '#AA96DA' },
  as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', color: '#E15D44' },
  brx: { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', flag: '🇮🇳', color: '#88B04B' },
  doi: { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳', color: '#7FCDCD' },
  kas: { code: 'kas', name: 'Kashmiri', nativeName: 'كٲشुर', flag: '🇮🇳', color: '#BC243C' },
  kok: { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳', color: '#C3447A' },
  mai: { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳', color: '#98B4D4' },
  mni: { code: 'mni', name: 'Manipuri', nativeName: 'ꯃꯩꯇꯩꯂꯣꯟ', flag: '🇮🇳', color: '#55B4B0' },
  ne: { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', color: '#DFCFBE' },
  or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', color: '#EFC050' },
  pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', color: '#5B5EA6' },
  sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳', color: '#9B2335' },
  sat: { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳', color: '#DF6589' },
  sd: { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮🇳', color: '#88B04B' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', color: '#5B5EA6' },
};

// Translation keys type
export type TranslationKey = 
  | 'home' | 'features' | 'forStudents' | 'forTeachers' | 'dashboard' | 'editor' | 'getStarted' | 'help'
  | 'heroTitle' | 'heroSubtitle' | 'startLearning' | 'imTeacher' | 'builtFor' | 'selectLanguage'
  | 'impactTitle' | 'impactBody' | 'languagesSupported' | 'ncertAligned' | 'offlineMode'
  | 'featuresTitle' | 'multilingualAI' | 'multilingualAIDesc' | 'syllabusAware' | 'syllabusAwareDesc'
  | 'teachesNotReplaces' | 'teachesNotReplacesDesc'
  | 'studentsTitle' | 'studentsBullet1' | 'studentsBullet2' | 'studentsBullet3' | 'tryTask' | 'todaysTask' | 'factorialTask'
  | 'teachersTitle' | 'teachersBullet1' | 'teachersBullet2' | 'teachersBullet3' | 'seeDashboard' | 'labReport' | 'university' | 'syllabusCode' | 'students'
  | 'yourHelper' | 'explainThis' | 'debugStep' | 'quizMe' | 'exampleError' | 'offline' | 'loopMaster'
  | 'step1' | 'step2' | 'step3' | 'whatsWrong' | 'whyHappens' | 'youFixIt' | 'chaiAnalogy' | 'typeCorrection' | 'askCommunity' | 'nextStep'
  | 'progressTitle' | 'progressBody' | 'openDashboard' | 'dayStreak' | 'loops' | 'functions' | 'hindiHelper' | 'ethicalCoder' | 'joinGuru'
  | 'testimonialsTitle' | 'testimonial1' | 'testimonial1Author' | 'testimonial2' | 'testimonial2Author' | 'testimonial3' | 'testimonial3Author'
  | 'pricingTitle' | 'studentPlan' | 'freeForever' | 'dailyTasks' | 'hints' | 'oneLanguage' | 'proPlan' | 'perMonth' | 'unlimitedExplain' | 'allLanguages' | 'offlineDownloads' | 'institutionPlan' | 'contactUs' | 'teacherDashboard' | 'analytics' | 'sso'
  | 'onboardingTitle' | 'onboardingSubtitle' | 'enableOffline' | 'downloadSize' | 'problemsAvailable' | 'back' | 'next'
  | 'whatsappTitle' | 'whatsappBullet1' | 'whatsappBullet2' | 'whatsappBullet3' | 'startOnWhatsApp'
  | 'faqTitle' | 'faq1Q' | 'faq1A' | 'faq2Q' | 'faq2A' | 'faq3Q' | 'faq3A' | 'faq4Q' | 'faq4A' | 'faq5Q' | 'faq5A' | 'faq6Q' | 'faq6A'
  | 'footerTagline' | 'emailPlaceholder' | 'getUpdates' | 'product' | 'resources' | 'legal' | 'privacy' | 'terms'
  | 'loading' | 'save' | 'cancel' | 'continue' | 'submit' | 'success' | 'error' | 'invalidEmail' | 'required';

// English translations
const en: Record<TranslationKey, string> = {
  home: 'Home',
  features: 'Features',
  forStudents: 'For Students',
  forTeachers: 'For Teachers',
  dashboard: 'Dashboard',
  editor: 'Editor',
  getStarted: 'Get Started',
  help: 'Help',
  heroTitle: 'Learn to code in your mother tongue',
  heroSubtitle: 'CodeSahayak explains programming in 22 Indian languages—so you understand, not just copy.',
  startLearning: 'Start Learning',
  imTeacher: 'I\'m a Teacher',
  builtFor: 'Built for NCERT, university labs & beyond.',
  selectLanguage: 'Select your language',
  impactTitle: 'Most coding help is in English. Most Indian students aren\'t.',
  impactBody: 'We built CodeSahayak to close that gap—real-time explanations in the language you think in, aligned to your syllabus, with hints that teach rather than hand out answers.',
  languagesSupported: 'Languages',
  ncertAligned: 'NCERT + University Aligned',
  offlineMode: 'Offline Mode',
  featuresTitle: 'Everything you need to learn—explained clearly.',
  multilingualAI: 'Multilingual AI',
  multilingualAIDesc: 'Explain code in Hindi, Tamil, Bengali, and more—without losing the logic.',
  syllabusAware: 'Syllabus Aware',
  syllabusAwareDesc: 'References NCERT, VTU, Anna University, and common lab patterns.',
  teachesNotReplaces: 'Teaches, Doesn\'t Replace',
  teachesNotReplacesDesc: 'Hints, analogies, and step-by-step guidance—never full copy-paste.',
  studentsTitle: 'Practice every day. In your language.',
  studentsBullet1: 'Daily tasks matched to your class/university syllabus',
  studentsBullet2: 'Get hints when you\'re stuck—never the full answer',
  studentsBullet3: 'Track streaks, XP, and concept mastery',
  tryTask: 'Try a Task',
  todaysTask: 'Today\'s Task',
  factorialTask: 'Write a function to calculate factorial',
  teachersTitle: 'Assign labs. Track progress. In every language.',
  teachersBullet1: 'Create assignments aligned to your university syllabus',
  teachersBullet2: 'See where the class is struggling—in real time',
  teachersBullet3: 'Support 22 languages without extra effort',
  seeDashboard: 'See Teacher Dashboard',
  labReport: 'Lab Report',
  university: 'University',
  syllabusCode: 'Syllabus Code',
  students: 'Students',
  yourHelper: 'Your Helper',
  explainThis: 'Explain this',
  debugStep: 'Debug step-by-step',
  quizMe: 'Quiz me',
  exampleError: 'Line 4 looks like it\'s trying to access an index that doesn\'t exist. Think of it like asking for the 6th cup of chai when only 5 were made.',
  offline: 'Offline',
  loopMaster: 'Loop Master',
  step1: 'Step 1',
  step2: 'Step 2',
  step3: 'Step 3',
  whatsWrong: 'What\'s wrong here?',
  whyHappens: 'Why does this happen?',
  youFixIt: 'Now you fix it',
  chaiAnalogy: 'Like returning a wrong note to the chai-wallah—you need to check what you ordered before handing it over.',
  typeCorrection: 'Type your corrected line...',
  askCommunity: 'Ask Community',
  nextStep: 'Next Step',
  progressTitle: 'See how far you\'ve come.',
  progressBody: 'Streaks, concept mastery, and community rank—built to keep you learning.',
  openDashboard: 'Open Dashboard',
  dayStreak: 'day streak!',
  loops: 'Loops',
  functions: 'Functions',
  hindiHelper: 'Hindi Helper',
  ethicalCoder: 'Ethical Coder',
  joinGuru: 'Join Guru Network',
  testimonialsTitle: 'What learners say.',
  testimonial1: 'I finally understood loops when Sahayak explained it in Tamil.',
  testimonial1Author: 'Priya, B.Sc CS',
  testimonial2: 'My students ask better questions now.',
  testimonial2Author: 'Prof. Sharma, Delhi University',
  testimonial3: 'I practice on the train using WhatsApp.',
  testimonial3Author: 'Arjun, Class 12',
  pricingTitle: 'Start free. Upgrade when you\'re ready.',
  studentPlan: 'Student',
  freeForever: 'Free forever',
  dailyTasks: 'Daily tasks',
  hints: 'Hints',
  oneLanguage: '1 language',
  proPlan: 'Pro',
  perMonth: '/month',
  unlimitedExplain: 'Unlimited explanations',
  allLanguages: 'All 22 languages',
  offlineDownloads: 'Offline downloads',
  institutionPlan: 'Institution',
  contactUs: 'Contact us',
  teacherDashboard: 'Teacher dashboard',
  analytics: 'Analytics',
  sso: 'SSO',
  onboardingTitle: 'Let\'s set up your learning space.',
  onboardingSubtitle: 'You can change this anytime.',
  enableOffline: 'Enable offline mode',
  downloadSize: 'Download 80MB',
  problemsAvailable: '500+ problems available offline.',
  back: 'Back',
  next: 'Next',
  whatsappTitle: 'Code on WhatsApp. Anytime.',
  whatsappBullet1: 'Send code snippets and get explanations',
  whatsappBullet2: 'Works on 2G and low-end phones',
  whatsappBullet3: 'No install needed',
  startOnWhatsApp: 'Start on WhatsApp',
  faqTitle: 'Questions? Answered.',
  faq1Q: 'Which languages are supported?',
  faq1A: 'We support 22 languages: Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Assamese, Bodo, Dogri, Kashmiri, Konkani, Maithili, Manipuri, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Urdu, and English.',
  faq2Q: 'Is it free?',
  faq2A: 'Yes! Our Student plan is free forever. Pro plans start at ₹199/month for unlimited explanations and offline downloads.',
  faq3Q: 'Does it work offline?',
  faq3A: 'Yes, with Pro you can download 500+ problems and explanations to use without internet.',
  faq4Q: 'Is it only for students?',
  faq4A: 'No—we have tools for teachers too, including assignment tracking and class analytics.',
  faq5Q: 'How is this different from ChatGPT?',
  faq5A: 'We never give full solutions—only hints and explanations. We\'re also aligned to Indian curricula and work in 22 regional languages.',
  faq6Q: 'Can teachers track progress?',
  faq6A: 'Yes, with our Institution plan teachers can see where students are struggling and assign targeted practice.',
  footerTagline: 'CodeSahayak — Learn in your language.',
  emailPlaceholder: 'Enter your email',
  getUpdates: 'Get Updates',
  product: 'Product',
  resources: 'Resources',
  legal: 'Legal',
  privacy: 'Privacy',
  terms: 'Terms',
  loading: 'Loading...',
  save: 'Save',
  cancel: 'Cancel',
  continue: 'Continue',
  submit: 'Submit',
  success: 'Success!',
  error: 'Error',
  invalidEmail: 'Please enter a valid email',
  required: 'This field is required',
};

// Hindi translations
const hi: Record<TranslationKey, string> = {
  ...en,
  home: 'होम',
  features: 'फीचर्स',
  forStudents: 'छात्रों के लिए',
  forTeachers: 'शिक्षकों के लिए',
  dashboard: 'डैशबोर्ड',
  editor: 'एडिटर',
  getStarted: 'शुरू करें',
  help: 'मदद',
  heroTitle: 'अपनी मातृभाषा में कोडिंग सीखें',
  heroSubtitle: 'CodeSahayak 22 भारतीय भाषाओं में प्रोग्रामिंग समझाता है—ताकि आप केवल कॉपी न करें, बल्कि समझें।',
  startLearning: 'सीखना शुरू करें',
  imTeacher: 'मैं शिक्षक हूँ',
  builtFor: 'NCERT, यूनिवर्सिटी लैब्स और उससे आगे के लिए बनाया गया।',
  selectLanguage: 'अपनी भाषा चुनें',
  impactTitle: 'अधिकांश कोडिंग सहायता अंग्रेजी में है। अधिकांश भारतीय छात्र नहीं।',
  impactBody: 'हमने CodeSahayak इस अंतर को पाटने के लिए बनाया—आपकी सोच की भाषा में रीयल-टाइम व्याख्या, आपके पाठ्यक्रम के अनुसार, संकेत जो सिखाते हैं न कि केवल उत्तर देते हैं।',
  languagesSupported: 'भाषाएँ',
  ncertAligned: 'NCERT + यूनिवर्सिटी अनुकूलित',
  offlineMode: 'ऑफलाइन मोड',
  featuresTitle: 'सीखने के लिए आवश्यक सब कुछ—स्पष्ट रूप से समझाया गया।',
  multilingualAI: 'बहुभाषी AI',
  multilingualAIDesc: 'हिंदी, तमिल, बंगाली और अन्य में कोड समझाएँ—तर्क खोए बिना।',
  syllabusAware: 'पाठ्यक्रम जागरूक',
  syllabusAwareDesc: 'NCERT, VTU, अन्ना यूनिवर्सिटी और सामान्य लैब पैटर्न का संदर्भ।',
  teachesNotReplaces: 'सिखाता है, बदलता नहीं',
  teachesNotReplacesDesc: 'संकेत, उपमा और चरण-दर-चरण मार्गदर्शन—कभी भी पूरी कॉपी-पेस्ट नहीं।',
  studentsTitle: 'हर दिन अभ्यास करें। अपनी भाषा में।',
  studentsBullet1: 'आपकी कक्षा/यूनिवर्सिटी पाठ्यक्रम से मेल खाते दैनिक कार्य',
  studentsBullet2: 'जब आप अटक जाएँ तो संकेत पाएँ—कभी भी पूरा उत्तर नहीं',
  studentsBullet3: 'स्ट्रीक, XP और अवधारणा महारत ट्रैक करें',
  tryTask: 'एक कार्य आज़माएँ',
  todaysTask: 'आज का कार्य',
  factorialTask: 'फैक्टोरियल गणना करने के लिए एक फ़ंक्शन लिखें',
  teachersTitle: 'लैब असाइन करें। प्रगति ट्रैक करें। हर भाषा में।',
  teachersBullet1: 'अपने यूनिवर्सिटी पाठ्यक्रम के अनुसार असाइनमेंट बनाएँ',
  teachersBullet2: 'देखें कि कक्षा कहाँ संघर्ष कर रही है—रीयल-टाइम में',
  teachersBullet3: 'अतिरिक्त प्रयास के बिना 22 भाषाओं का समर्थन करें',
  seeDashboard: 'शिक्षक डैशबोर्ड देखें',
  labReport: 'लैब रिपोर्ट',
  university: 'यूनिवर्सिटी',
  syllabusCode: 'पाठ्यक्रम कोड',
  students: 'छात्र',
  yourHelper: 'आपका सहायक',
  explainThis: 'इसे समझाएँ',
  debugStep: 'चरण-दर-चरण डीबग करें',
  quizMe: 'मुझे क्विज़ दें',
  exampleError: 'लाइन 4 ऐसा लगता है कि यह एक ऐसे इंडेक्स तक पहुँचने की कोशिश कर रहा है जो मौजूद नहीं है। इसे ऐसे सोचें जैसे केवल 5 चाय बनी हों और आप 6वीँ कप माँग रहे हों।',
  offline: 'ऑफलाइन',
  loopMaster: 'लूप मास्टर',
  step1: 'चरण 1',
  step2: 'चरण 2',
  step3: 'चरण 3',
  whatsWrong: 'यहाँ क्या गलत है?',
  whyHappens: 'ऐसा क्यों होता है?',
  youFixIt: 'अब आप इसे ठीक करें',
  chaiAnalogy: 'चाय-वाले को गलत नोट वापस करने की तरह—सौंपने से पहले आपको यह जाँचना होगा कि आपने क्या ऑर्डर किया था।',
  typeCorrection: 'अपनी सुधारित लाइन टाइप करें...',
  askCommunity: 'समुदाय से पूछें',
  nextStep: 'अगला चरण',
  progressTitle: 'देखें कि आप कितनी दूर आ गए हैं।',
  progressBody: 'स्ट्रीक, अवधारणा महारत और समुदाय रैंक—आपको सीखते रखने के लिए बनाया गया।',
  openDashboard: 'डैशबोर्ड खोलें',
  dayStreak: 'दिन की स्ट्रीक!',
  loops: 'लूप्स',
  functions: 'फ़ंक्शन्स',
  hindiHelper: 'हिंदी हेल्पर',
  ethicalCoder: 'नैतिक कोडर',
  joinGuru: 'गुरु नेटवर्क में शामिल हों',
  testimonialsTitle: 'सीखने वाले क्या कहते हैं।',
  testimonial1: 'मुझे आखिरकार लूप समझ में आया जब Sahayak ने इसे तमिल में समझाया।',
  testimonial1Author: 'प्रिया, B.Sc CS',
  testimonial2: 'मेरे छात्र अब बेहतर सवाल पूछते हैं।',
  testimonial2Author: 'प्रो. शर्मा, दिल्ली यूनिवर्सिटी',
  testimonial3: 'मैं व्हाट्सएप का उपयोग करके ट्रेन में अभ्यास करता हूँ।',
  testimonial3Author: 'अर्जुन, कक्षा 12',
  pricingTitle: 'मुफ़्त शुरू करें। जब तैयार हों तो अपग्रेड करें।',
  studentPlan: 'छात्र',
  freeForever: 'हमेशा के लिए मुफ़्त',
  dailyTasks: 'दैनिक कार्य',
  hints: 'संकेत',
  oneLanguage: '1 भाषा',
  proPlan: 'प्रो',
  perMonth: '/माह',
  unlimitedExplain: 'असीमित व्याख्या',
  allLanguages: 'सभी 22 भाषाएँ',
  offlineDownloads: 'ऑफलाइन डाउनलोड',
  institutionPlan: 'संस्थान',
  contactUs: 'हमसे संपर्क करें',
  teacherDashboard: 'शिक्षक डैशबोर्ड',
  analytics: 'एनालिटिक्स',
  sso: 'SSO',
  onboardingTitle: 'आइए अपनी सीखने की जगह सेट अप करें।',
  onboardingSubtitle: 'आप इसे कभी भी बदल सकते हैं।',
  enableOffline: 'ऑफलाइन मोड सक्षम करें',
  downloadSize: '80MB डाउनलोड करें',
  problemsAvailable: '500+ समस्याएँ ऑफलाइन उपलब्ध हैं।',
  back: 'वापस',
  whatsappTitle: 'व्हाट्सएप पर कोड करें। कभी भी।',
  whatsappBullet1: 'कोड स्निपेट भेजें और व्याख्या प्राप्त करें',
  whatsappBullet2: '2G और कम-स्पेसिफिकेशन फोन पर काम करता है',
  whatsappBullet3: 'इंस्टॉलेशन की आवश्यकता नहीं',
  startOnWhatsApp: 'व्हाट्सएप पर शुरू करें',
  faqTitle: 'सवाल? जवाब दिए गए।',
  faq1Q: 'कौन सी भाषाएँ समर्थित हैं?',
  faq1A: 'हम 22 भाषाओं का समर्थन करते हैं: हिंदी, तमिल, बंगाली, तेलुगु, मराठी, गुजराती, कन्नड़, मलयालम, असमिया, बोडो, डोगरी, कश्मीरी, कोंकणी, मैथिली, मणिपुरी, नेपाली, ओडिया, पंजाबी, संस्कृत, संथाली, सिंधी, उर्दू और अंग्रेजी।',
  faq2Q: 'क्या यह मुफ़्त है?',
  faq2A: 'हाँ! हमारा छात्र योजना हमेशा के लिए मुफ़्त है। प्रो योजनाएँ असीमित व्याख्या और ऑफलाइन डाउनलोड के लिए ₹199/माह से शुरू होती हैं।',
  faq3Q: 'क्या यह ऑफलाइन काम करता है?',
  faq3A: 'हाँ, प्रो के साथ आप 500+ समस्याएँ और व्याख्या इंटरनेट के बिना उपयोग करने के लिए डाउनलोड कर सकते हैं।',
  faq4Q: 'क्या यह केवल छात्रों के लिए है?',
  faq4A: 'नहीं—हमारे पास शिक्षकों के लिए भी उपकरण हैं, जिसमें असाइनमेंट ट्रैकिंग और कक्षा एनालिटिक्स शामिल हैं।',
  faq5Q: 'यह ChatGPT से कैसे अलग है?',
  faq5A: 'हम कभी भी पूर्ण समाधान नहीं देते—केवल संकेत और व्याख्या। हम भारतीय पाठ्यक्रमों के अनुसार भी हैं और 22 क्षेत्रीय भाषाओं में काम करते हैं।',
  faq6Q: 'क्या शिक्षक प्रगति ट्रैक कर सकते हैं?',
  faq6A: 'हाँ, हमारी संस्थान योजना के साथ शिक्षक देख सकते हैं कि छात्र कहाँ संघर्ष कर रहे हैं और लक्षित अभ्यास असाइन कर सकते हैं।',
  footerTagline: 'CodeSahayak — अपनी भाषा में सीखें।',
  emailPlaceholder: 'अपना ईमेल दर्ज करें',
  getUpdates: 'अपडेट प्राप्त करें',
  product: 'उत्पाद',
  resources: 'संसाधन',
  legal: 'कानूनी',
  privacy: 'गोपनीयता',
  terms: 'नियम',
  loading: 'लोड हो रहा है...',
  save: 'सहेजें',
  cancel: 'रद्द करें',
  continue: 'जारी रखें',
  submit: 'जमा करें',
  success: 'सफल!',
  error: 'त्रुटि',
  invalidEmail: 'कृपया एक वैध ईमेल दर्ज करें',
  required: 'यह फ़ील्ड आवश्यक है',
};

// Tamil translations
const ta: Record<TranslationKey, string> = {
  ...en,
  home: 'முகப்பு',
  features: 'அம்சங்கள்',
  forStudents: 'மாணவர்களுக்கு',
  forTeachers: 'ஆசிரியர்களுக்கு',
  dashboard: 'டாஷ்போர்டு',
  editor: 'எடிட்டர்',
  getStarted: 'தொடங்குங்கள்',
  help: 'உதவி',
  heroTitle: 'உங்கள் தாய்மொழியில் குறியீட்டைக் கற்றுக்கொள்ளுங்கள்',
  heroSubtitle: 'CodeSahayak 22 இந்திய மொழிகளில் நிரலாக்கத்தை விளக்குகிறது—நீங்கள் நகலெடுக்காமல் புரிந்துகொள்ள உதவுகிறது.',
  startLearning: 'கற்றலைத் தொடங்குங்கள்',
  imTeacher: 'நான் ஆசிரியர்',
  builtFor: 'NCERT, பல்கலைக்கழக ஆய்வகங்கள் மற்றும் அதற்கு அப்பாற்பட்டவைக்காக உருவாக்கப்பட்டது.',
  selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
  impactTitle: 'பெரும்பாலான குறியீட்டு உதவி ஆங்கிலத்தில் உள்ளது. பெரும்பாலான இந்திய மாணவர்கள் அல்ல.',
  impactBody: 'இந்த இடைவெளியை நிரப்ப CodeSahayak-ஐ உருவாக்கினோம்—நீங்கள் சிந்திக்கும் மொழியில் நேரடி விளக்கங்கள், உங்கள் பாடத்திட்டத்திற்கு ஏற்ப, பதில்களை வழங்காமல் கற்பிக்கும் குறிப்புகள்.',
  languagesSupported: 'மொழிகள்',
  ncertAligned: 'NCERT + பல்கலைக்கழக பொருத்தம்',
  offlineMode: 'ஆஃப்லைன் பயன்முறை',
  featuresTitle: 'கற்றலுக்கு தேவையான அனைத்தும்—தெளிவாக விளக்கப்பட்டுள்ளது.',
  multilingualAI: 'பன்மொழி AI',
  multilingualAIDesc: 'தமிழ், இந்தி, வங்காளம் மற்றும் பலவற்றில் குறியீட்டை விளக்கவும்—தர்க்கத்தை இழக்காமல்.',
  syllabusAware: 'பாடத்திட்ட விழிப்புணர்வு',
  syllabusAwareDesc: 'NCERT, VTU, அண்ணா பல்கலைக்கழகம் மற்றும் பொதுவான ஆய்வக முறைகளைக் குறிப்பிடுகிறது.',
  teachesNotReplaces: 'கற்பிக்கிறது, மாற்றாது',
  teachesNotReplacesDesc: 'குறிப்புகள், உவமைகள் மற்றும் படிப்படியான வழிகாட்டுதல்—முழு நகலெடுப்பு இல்லை.',
  studentsTitle: 'ஒவ்வொரு நாளும் பயிற்சி செய்யுங்கள். உங்கள் மொழியில்.',
  studentsBullet1: 'உங்கள் வகுப்பு/பல்கலைக்கழக பாடத்திட்டத்திற்கு ஏற்ப தினசரி பணிகள்',
  studentsBullet2: 'நீங்கள் சிக்கிக்கொண்டால் குறிப்புகளைப் பெறுங்கள்—முழு பதில் இல்லை',
  studentsBullet3: 'ஸ்ட்ரீக்ஸ், XP மற்றும் கருத்து திறனைக் கண்காணிக்கவும்',
  tryTask: 'ஒரு பணியை முயற்சிக்கவும்',
  todaysTask: 'இன்றைய பணி',
  factorialTask: 'ஃபேக்டோரியல் கணக்கிட ஒரு செயல்பாட்டை எழுதவும்',
  teachersTitle: 'ஆய்வகங்களை ஒதுக்கவும். முன்னேற்றத்தைக் கண்காணிக்கவும். ஒவ்வொரு மொழியிலும்.',
  teachersBullet1: 'உங்கள் பல்கலைக்கழக பாடத்திட்டத்திற்கு ஏற்ப பணிகளை உருவாக்கவும்',
  teachersBullet2: 'வகுப்பு எங்கு போராடுகிறது என்பதை நேரடியாகப் பார்க்கவும்',
  teachersBullet3: 'கூடுதல் முயற்சி இல்லாமல் 22 மொழிகளை ஆதரிக்கவும்',
  seeDashboard: 'ஆசிரியர் டாஷ்போர்டைப் பார்க்கவும்',
  labReport: 'ஆய்வக அறிக்கை',
  university: 'பல்கலைக்கழகம்',
  syllabusCode: 'பாடத்திட்ட குறியீடு',
  students: 'மாணவர்கள்',
  yourHelper: 'உங்கள் உதவியாளர்',
  explainThis: 'இதை விளக்கவும்',
  debugStep: 'படிப்படியாக பிழைத்திருத்தம்',
  quizMe: 'என்னை வினாடி வினா செய்யுங்கள்',
  exampleError: 'வரி 4 இருக்காத ஒரு குறியீட்டை அணுக முயற்சிக்கிறது போல் தெரிகிறது. 5 கோப்பைகள் மட்டுமே இருக்கும்போது 6வது கோப்பையைக் கேட்பது போல் யோசியுங்கள்.',
  offline: 'ஆஃப்லைன்',
  loopMaster: 'லூப் மாஸ்டர்',
  step1: 'படி 1',
  step2: 'படி 2',
  step3: 'படி 3',
  whatsWrong: 'இங்கே என்ன தவறு?',
  whyHappens: 'இது ஏன் நடக்கிறது?',
  youFixIt: 'இப்போது நீங்கள் சரிசெய்யுங்கள்',
  chaiAnalogy: 'தேநீர் விற்பவருக்கு தவறான நோட்டைத் திருப்பித் தருவது போல—கொடுப்பதற்கு முன் நீங்கள் என்ன ஆர்டர் செய்தீர்கள் என்பதைச் சரிபார்க்க வேண்டும்.',
  typeCorrection: 'உங்கள் சரிசெய்யப்பட்ட வரியைத் தட்டச்சு செய்யுங்கள்...',
  askCommunity: 'சமூகத்தைக் கேளுங்கள்',
  nextStep: 'அடுத்த படி',
  progressTitle: 'நீங்கள் எவ்வளவு தூரம் வந்துள்ளீர்கள் என்பதைப் பாருங்கள்.',
  progressBody: 'ஸ்ட்ரீக்ஸ், கருத்து திறன் மற்றும் சமூக தரவரிசை—உங்களைக் கற்றலில் வைத்திருக்க உருவாக்கப்பட்டது.',
  openDashboard: 'டாஷ்போர்டைத் திறக்கவும்',
  dayStreak: 'நாள் ஸ்ட்ரீக்!',
  loops: 'லூப்ஸ்',
  functions: 'செயல்பாடுகள்',
  hindiHelper: 'இந்தி உதவியாளர்',
  ethicalCoder: 'நெறிமுறை கோடர்',
  joinGuru: 'குரு நெட்வொர்க்கில் சேரவும்',
  testimonialsTitle: 'கற்றலாளர்கள் என்ன கூறுகிறார்கள்.',
  testimonial1: 'Sahayak இதைத் தமிழில் விளக்கியபோது லூப்ஸ் பற்றி இறுதியாகப் புரிந்துகொண்டேன்.',
  testimonial1Author: 'பிரியா, B.Sc CS',
  testimonial2: 'என் மாணவர்கள் இப்போது சிறந்த கேள்விகளைக் கேட்கிறார்கள்.',
  testimonial2Author: 'பேரா. சர்மா, டெல்லி பல்கலைக்கழகம்',
  testimonial3: 'வாட்ஸ்அப் பயன்படுத்தி ரயிலில் பயிற்சி செய்கிறேன்.',
  testimonial3Author: 'அர்ஜூன், வகுப்பு 12',
  pricingTitle: 'இலவசமாகத் தொடங்குங்கள். தயாரானபோது மேம்படுத்தவும்.',
  studentPlan: 'மாணவர்',
  freeForever: 'எப்போதும் இலவசம்',
  dailyTasks: 'தினசரி பணிகள்',
  hints: 'குறிப்புகள்',
  oneLanguage: '1 மொழி',
  proPlan: 'ப்ரோ',
  perMonth: '/மாதம்',
  unlimitedExplain: 'வரம்பற்ற விளக்கங்கள்',
  allLanguages: 'அனைத்து 22 மொழிகள்',
  offlineDownloads: 'ஆஃப்லைன் பதிவிறக்கங்கள்',
  institutionPlan: 'நிறுவனம்',
  contactUs: 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
  teacherDashboard: 'ஆசிரியர் டாஷ்போர்டு',
  analytics: 'பகுப்பாய்வு',
  sso: 'SSO',
  onboardingTitle: 'உங்கள் கற்றல் இடத்தை அமைக்கலாம்.',
  onboardingSubtitle: 'நீங்கள் இதை எப்போது வேண்டுமானாலும் மாற்றலாம்.',
  enableOffline: 'ஆஃப்லைன் பயன்முறையை இயக்கவும்',
  downloadSize: '80MB பதிவிறக்கவும்',
  problemsAvailable: '500+ சிக்கல்கள் ஆஃப்லைனில் கிடைக்கின்றன.',
  back: 'பின்செல்',
  whatsappTitle: 'வாட்ஸ்அப்பில் குறியீடு. எந்நேரமும்.',
  whatsappBullet1: 'குறியீடு துண்டுகளை அனுப்பி விளக்கங்களைப் பெறுங்கள்',
  whatsappBullet2: '2G மற்றும் குறைந்த-அம்ச ஃபோன்களில் வேலை செய்கிறது',
  whatsappBullet3: 'நிறுவல் தேவையில்லை',
  startOnWhatsApp: 'வாட்ஸ்அப்பில் தொடங்குங்கள்',
  faqTitle: 'கேள்விகள்? பதிலளிக்கப்பட்டன.',
  faq1Q: 'எந்த மொழிகள் ஆதரிக்கப்படுகின்றன?',
  faq1A: 'நாங்கள் 22 மொழிகளை ஆதரிக்கிறோம்: தமிழ், இந்தி, வங்காளம், தெலுங்கு, மராத்தி, குஜராத்தி, கன்னடம், மலையாளம், அஸ்ஸாமி, போடோ, டோக்ரி, காஷ்மீரி, கொங்கணி, மைதிலி, மணிப்புரி, நேபாளி, ஒடியா, பஞ்சாபி, சமஸ்கிருதம், சந்தாலி, சிந்தி, உருது மற்றும் ஆங்கிலம்.',
  faq2Q: 'இது இலவசமா?',
  faq2A: 'ஆம்! எங்கள் மாணவர் திட்டம் எப்போதும் இலவசம். ப்ரோ திட்டங்கள் வரம்பற்ற விளக்கங்கள் மற்றும் ஆஃப்லைன் பதிவிறக்கங்களுக்கு ₹199/மாதம் முதல் தொடங்குகின்றன.',
  faq3Q: 'இது ஆஃப்லைனில் வேலை செய்கிறதா?',
  faq3A: 'ஆம், ப்ரோவுடன் நீங்கள் 500+ சிக்கல்கள் மற்றும் விளக்கங்களை இணையம் இல்லாமல் பயன்படுத்த பதிவிறக்கம் செய்யலாம்.',
  faq4Q: 'இது மாணவர்களுக்கு மட்டுமா?',
  faq4A: 'இல்லை—ஆசிரியர்களுக்கும் எங்களிடம் கருவிகள் உள்ளன, அதில் பணி கண்காணிப்பு மற்றும் வகுப்பு பகுப்பாய்வு ஆகியவை அடங்கும்.',
  faq5Q: 'இது ChatGPT-யிலிருந்து எப்படி வேறுபடுகிறது?',
  faq5A: 'நாங்கள் எப்போதும் முழு தீர்வுகளை வழங்குவதில்லை—குறிப்புகள் மற்றும் விளக்கங்கள் மட்டுமே. இந்திய பாடத்திட்டங்களுக்கு ஏற்பவும், 22 பிராந்திய மொழிகளிலும் செயல்படுகிறோம்.',
  faq6Q: 'ஆசிரியர்கள் முன்னேற்றத்தைக் கண்காணிக்க முடியுமா?',
  faq6A: 'ஆம், எங்கள் நிறுவன திட்டத்துடன் ஆசிரியர்கள் மாணவர்கள் எங்கு போராடுகிறார்கள் என்பதைப் பார்க்கலாம் மற்றும் இலக்கு பயிற்சியை ஒதுக்கலாம்.',
  footerTagline: 'CodeSahayak — உங்கள் மொழியில் கற்றுக்கொள்ளுங்கள்.',
  emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
  getUpdates: 'புதுப்பிப்புகளைப் பெறவும்',
  product: 'தயாரிப்பு',
  resources: 'வளங்கள்',
  legal: 'சட்டபூர்வ',
  privacy: 'தனியுரிமை',
  terms: 'விதிமுறைகள்',
  loading: 'ஏற்றுகிறது...',
  save: 'சேமிக்கவும்',
  cancel: 'ரத்து செய்',
  continue: 'தொடரவும்',
  submit: 'சமர்ப்பிக்கவும்',
  success: 'வெற்றி!',
  error: 'பிழை',
  invalidEmail: 'சரியான மின்னஞ்சலை உள்ளிடவும்',
  required: 'இந்த புலம் தேவை',
};

// Other languages use English as fallback
const bn: Record<TranslationKey, string> = { ...en, home: 'হোম', features: 'বৈশিষ্ট্য', forStudents: 'ছাত্রদের জন্য', forTeachers: 'শিক্ষকদের জন্য', dashboard: 'ড্যাশবোর্ড', editor: 'এডিটর', getStarted: 'শুরু করুন', help: 'সাহায্য', heroTitle: 'আপনার মাতৃভাষায় কোডিং শিখুন', heroSubtitle: 'CodeSahayak ২২টি ভারতীয় ভাষায় প্রোগ্রামিং ব্যাখ্যা করে।' };
const te: Record<TranslationKey, string> = { ...en, home: 'హోమ్', features: 'ఫీచర్లు', forStudents: 'విద్యార్థుల కోసం', forTeachers: 'ఉపాధ్యాయుల కోసం', dashboard: 'డాష్‌బోర్డ్', editor: 'ఎడిటర్', getStarted: 'ప్రారంభించండి', help: 'సహాయం', heroTitle: 'మీ మాతృభాషలో కోడింగ్ నేర్చుకోండి', heroSubtitle: 'CodeSahayak 22 భారతీయ భాషలలో ప్రోగ్రామింగ్ వివరిస్తుంది.' };
const mr: Record<TranslationKey, string> = { ...en, home: 'होम', features: 'वैशिष्ट्ये', forStudents: 'विद्यार्थ्यांसाठी', forTeachers: 'शिक्षकांसाठी', dashboard: 'डॅशबोर्ड', editor: 'एडिटर', getStarted: 'सुरू करा', help: 'मदत', heroTitle: 'तुमच्या मातृभाषेत कोडिंग शिका', heroSubtitle: 'CodeSahayak 22 भारतीय भाषांमध्ये प्रोग्रामिंग स्पष्ट करते.' };
const gu: Record<TranslationKey, string> = { ...en, home: 'હોમ', features: 'વિશેષતાઓ', forStudents: 'વિદ્યાર્થીઓ માટે', forTeachers: 'શિક્ષકો માટે', dashboard: 'ડેશબોર્ડ', editor: 'એડિટર', getStarted: 'શરૂ કરો', help: 'મદદ', heroTitle: 'તમારી માતૃભાષામાં કોડિંગ શીખો', heroSubtitle: 'CodeSahayak 22 ભારતીય ભાષાઓમાં પ્રોગ્રામિંગ સમજાવે છે.' };
const kn: Record<TranslationKey, string> = { ...en, home: 'ಹೋಮ್', features: 'ವೈಶಿಷ್ಟ್ಯಗಳು', forStudents: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ', forTeachers: 'ಶಿಕ್ಷಕರಿಗೆ', dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', editor: 'ಎಡಿಟರ್', getStarted: 'ಪ್ರಾರಂಭಿಸಿ', help: 'ಸಹಾಯ', heroTitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಕೋಡಿಂಗ್ ಕಲಿಯಿರಿ', heroSubtitle: 'CodeSahayak 21 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ವಿವರಿಸುತ್ತದೆ.' };
const ml: Record<TranslationKey, string> = { ...en, home: 'ഹോം', features: 'ഫീച്ചറുകൾ', forStudents: 'വിദ്യാർത്ഥികൾക്ക്', forTeachers: 'അധ്യാപകർക്ക്', dashboard: 'ഡാഷ്ബോർഡ്', editor: 'എഡിറ്റർ', getStarted: 'ആരംഭിക്കുക', help: 'സഹായം', heroTitle: 'നിങ്ങളുടെ മാതൃഭാഷയിൽ കോഡിംഗ് പഠിക്കുക', heroSubtitle: 'CodeSahayak 21 ഇന്ത്യൻ ഭാഷകളിൽ പ്രോഗ്രാമ്മിംഗ് വിശദീകരിക്കുന്നു.' };

const as: Record<TranslationKey, string> = { ...en, home: 'অসমীয়া', features: 'বৈশিষ্ট্য', forStudents: 'শিক্ষাৰ্থীৰ বাবে', forTeachers: 'শিক্ষকৰ বাবে', dashboard: 'ড্যাশবোর্ড', editor: 'সম্পাদক', getStarted: 'আৰম্ভ কৰক', help: 'সহায়', heroTitle: 'আপোনাৰ মাতৃভাষাত ক’ডিং শিকক', heroSubtitle: 'CodeSahayak-এ ২১টা ভাৰতীয় ভাষাত প্ৰগ্ৰেমিং ব্যাখ্যা কৰে।' };
const brx: Record<TranslationKey, string> = { ...en };
const doi: Record<TranslationKey, string> = { ...en };
const kas: Record<TranslationKey, string> = { ...en };
const kok: Record<TranslationKey, string> = { ...en };
const mai: Record<TranslationKey, string> = { ...en };
const mni: Record<TranslationKey, string> = { ...en };
const ne: Record<TranslationKey, string> = { ...en };
const or: Record<TranslationKey, string> = { ...en };
const pa: Record<TranslationKey, string> = { ...en };
const sa: Record<TranslationKey, string> = { ...en };
const sat: Record<TranslationKey, string> = { ...en };
const sd: Record<TranslationKey, string> = { ...en, home: 'گھر', features: 'خصوصيات', forStudents: 'شاگردن لاءِ', forTeachers: 'استادن لاءِ', dashboard: 'ڊيش بورڊ', getStarted: 'شروع ڪريو', heroTitle: 'پنهنجي مادري ٻولي ۾ ڪوڊنگ سکو', heroSubtitle: 'CodeSahayak 22 هندستاني ٻولين ۾ پروگرامنگ بيان ڪندو آهي.' };
const ur: Record<TranslationKey, string> = { ...en, home: 'ہوم', features: 'خصوصیات', forStudents: 'طلباء کے لیے', forTeachers: 'اساتذہ کے لیے', dashboard: 'ڈیش بورڈ', getStarted: 'شروع کریں', heroTitle: 'اپنی مادری زبان میں کوڈنگ سیکھیں', heroSubtitle: 'CodeSahayak 22 ہندوستانی زبانوں میں پروگرامنگ سمجھاتا ہے۔' };

export const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en, hi, ta, bn, te, mr, gu, kn, ml, as, brx, doi, kas, kok, mai, mni, ne, or, pa, sa, sat, sd, ur
};

interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      setLanguage: (code: LanguageCode) => set({ currentLanguage: code }),
      t: (key: TranslationKey) => {
        let { currentLanguage } = get();
        if (!languages[currentLanguage]) {
          currentLanguage = 'en';
        }
        const langTranslations = translations[currentLanguage] || translations.en;
        return langTranslations[key] || translations.en[key] || key;
      },
    }),
    {
      name: 'codesahayak-language',
      onRehydrateStorage: () => (state) => {
        if (state && (!state.currentLanguage || !languages[state.currentLanguage])) {
          state.currentLanguage = 'en';
        }
      }
    }
  )
);

// Hook for easy translation access
export const useTranslation = () => {
  const { t, currentLanguage, setLanguage } = useLanguageStore();
  const safeLanguage = languages[currentLanguage] ? currentLanguage : 'en';
  return { t, currentLanguage: safeLanguage, setLanguage, languages };
};
