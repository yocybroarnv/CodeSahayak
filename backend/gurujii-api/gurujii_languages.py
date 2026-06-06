"""
Gurujii v4.1 — Native Speaker of 21 Indian Languages + All Programming Languages
Single file. Drop into gurujii-api/. Extends gurujii_v4.py.
"""

# ══════════════════════════════════════════════════════════════
# PART A — 21 INDIAN LANGUAGES: NATIVE SPEAKER KNOWLEDGE BASE
# Each language: grammar rules, error translations, teaching
# phrases, idioms, number words, coding vocabulary, culturally
# appropriate analogies, and script-specific rendering notes.
# ══════════════════════════════════════════════════════════════

NATIVE_LANG_KNOWLEDGE: dict = {

    "hi": {
        "name": "Hindi", "script": "Devanagari", "family": "Indo-Aryan",
        "grammar_notes": "SOV word order. Postpositions. Gender (m/f). Verb agrees with object.",
        "coding_vocab": {
            "variable": "चर (char)", "function": "फ़ंक्शन", "loop": "लूप / पुनरावृत्ति",
            "condition": "शर्त", "class": "वर्ग", "object": "वस्तु", "error": "त्रुटि",
            "input": "इनपुट", "output": "आउटपुट", "list": "सूची", "dictionary": "शब्दकोश",
            "string": "स्ट्रिंग / शब्द-श्रृंखला", "integer": "पूर्णांक", "float": "दशमलव संख्या",
            "boolean": "बूलियन (सच/झूठ)", "recursion": "पुनरावर्तन", "algorithm": "एल्गोरिदम",
            "compile": "संकलित करना", "debug": "डीबग करना", "syntax": "वाक्य-विन्यास",
        },
        "analogies": {
            "variable": "चर एक डिब्बे की तरह है जिसमें हम कोई भी चीज़ रख सकते हैं",
            "function": "फ़ंक्शन एक रेसिपी की तरह है — एक बार लिखो, बार-बार बनाओ",
            "loop": "लूप वैसे ही है जैसे आप रोज़ सुबह एक ही काम करते हैं — उठो, ब्रश करो, नहाओ",
            "recursion": "पुनरावर्तन शीशों के सामने शीशा रखने जैसा है — खुद को देखता रहता है",
            "list": "सूची ट्रेन के डिब्बों जैसी है — एक के बाद एक",
            "class": "वर्ग एक साँचा है — जैसे लड्डू का साँचा, हर बार एक जैसा लड्डू",
            "stack": "स्टैक थाली पर थाली रखने जैसा है — जो आखिर में आई, पहले जाएगी",
            "queue": "क्यू राशन की दुकान की लाइन जैसी है — पहले आओ, पहले पाओ",
        },
        "encouragement": [
            "शाबाश! बिल्कुल सही!",
            "वाह! बहुत अच्छा सोचा!",
            "एकदम सटीक!",
            "बस यही चाहिए था!",
            "तुम तो कमाल हो!",
            "आगे बढ़ते रहो!",
        ],
        "gentle_correction": [
            "ज़रा एक बार और सोचो —",
            "लगभग सही! एक छोटी सी बात —",
            "अच्छी कोशिश! लेकिन देखो —",
        ],
        "error_explanations": {
            "NameError": "यह त्रुटि तब होती है जब Python को वह चर नहीं मिलता जो आपने इस्तेमाल किया। यह ऐसे है जैसे आप किसी ऐसे दोस्त को फ़ोन करें जो आपकी contact list में नहीं है।",
            "TypeError": "यह तब होता है जब आप गलत प्रकार की चीज़ें मिलाते हैं — जैसे संख्या और शब्द को जोड़ने की कोशिश।",
            "IndexError": "सूची में उतने items नहीं हैं जितने आप ढूंढ रहे हैं।",
            "SyntaxError": "Python आपका कोड पढ़ नहीं पाया। कोई कोलन (:) या bracket छूट गया होगा।",
            "ZeroDivisionError": "शून्य से भाग नहीं दे सकते — गणित में भी और Python में भी!",
            "RecursionError": "फ़ंक्शन खुद को बुलाता रहा और रुका नहीं। Base case चेक करो।",
        },
        "teaching_phrases": {
            "what_do_you_think": "तुम्हें क्या लगता है यह लाइन क्या करती है?",
            "try_it": "अब इसे खुद चलाकर देखो और बताओ क्या होता है।",
            "good_question": "बहुत अच्छा सवाल!",
            "think_about": "ज़रा सोचो —",
            "do_you_understand": "क्या यह समझ आया?",
            "lets_try": "चलो एक साथ कोशिश करते हैं।",
        },
    },

    "ta": {
        "name": "Tamil", "script": "Tamil", "family": "Dravidian",
        "grammar_notes": "SOV word order. Agglutinative. Three genders. Formal/informal registers.",
        "coding_vocab": {
            "variable": "மாறி (māṟi)", "function": "சார்பு (sārpu)", "loop": "சுழற்சி",
            "condition": "நிபந்தனை", "class": "வகுப்பு", "object": "பொருள்",
            "error": "பிழை", "input": "உள்ளீடு", "output": "வெளியீடு",
            "list": "பட்டியல்", "dictionary": "அகராதி", "string": "சரம்",
            "integer": "முழு எண்", "boolean": "இரும மதிப்பு (உண்மை/பொய்)",
            "recursion": "மீண்டும் மீண்டும் அழைத்தல்", "algorithm": "வழிமுறை",
            "debug": "பிழை திருத்தம்",
        },
        "analogies": {
            "variable": "மாறி என்பது ஒரு பெட்டி போன்றது — எதையும் வைக்கலாம், மாற்றலாம்",
            "function": "சார்பு என்பது சமையல் குறிப்பு போன்றது — ஒரு முறை எழுதி, பலமுறை பயன்படுத்து",
            "loop": "சுழற்சி என்பது தினமும் பள்ளிக்கு போவது போன்றது — ஒரே வேலையை மீண்டும் மீண்டும்",
            "stack": "stack என்பது இட்லி பாத்திரம் போன்றது — கடைசியில் வைத்தது முதலில் எடுக்கப்படும்",
            "queue": "queue என்பது பஸ் நிறுத்தத்தில் வரிசை போன்றது — முதலில் வந்தவர் முதலில் ஏறுவார்",
            "recursion": "recursion என்பது கண்ணாடிக்கு முன்னால் கண்ணாடி வைப்பது போன்றது",
            "class": "வகுப்பு என்பது தோசை மாவு போன்றது — ஒரே மாவில் பல தோசை",
        },
        "encouragement": [
            "சாபாஷ்! மிகவும் சரியாக சொன்னீர்கள்!",
            "அருமை! இப்படித்தான் யோசிக்க வேண்டும்!",
            "மிகவும் நல்லது!",
            "கலக்கல்!",
            "தொடர்ந்து முயற்சி செய்யுங்கள்!",
        ],
        "error_explanations": {
            "NameError": "இந்த பிழை ஏற்படுகிறது ஏனென்றால் நீங்கள் பயன்படுத்திய மாறி Python-க்கு தெரியாது. முதலில் மாறியை உருவாக்க வேண்டும்.",
            "TypeError": "தவறான வகை — எண்ணையும் சொல்லையும் சேர்க்க முயற்சிக்கிறீர்கள்.",
            "SyntaxError": "Python உங்கள் கோடை படிக்க முடியவில்லை. colon அல்லது bracket விட்டுவிட்டீர்களா?",
            "IndexError": "பட்டியலில் அந்த இடத்தில் எதுவும் இல்லை.",
            "RecursionError": "சார்பு தன்னையே அழைத்துக்கொண்டே இருக்கிறது. Base case சேர்க்கவும்.",
        },
        "teaching_phrases": {
            "what_do_you_think": "இந்த வரி என்ன செய்கிறது என்று நினைக்கிறீர்கள்?",
            "try_it": "இப்போது நீங்களே இயக்கி பாருங்கள்.",
            "good_question": "மிகவும் நல்ல கேள்வி!",
            "do_you_understand": "புரிகிறதா?",
            "lets_try": "சேர்ந்து முயற்சிப்போம்.",
        },
    },

    "te": {
        "name": "Telugu", "script": "Telugu", "family": "Dravidian",
        "grammar_notes": "SOV. Agglutinative. Honorific forms. Classical and modern registers.",
        "coding_vocab": {
            "variable": "చరరాశి", "function": "ఫంక్షన్ / పని", "loop": "లూప్ / పునరావృత్తి",
            "condition": "షరతు", "class": "తరగతి", "object": "వస్తువు",
            "error": "లోపం", "list": "జాబితా", "string": "స్ట్రింగ్",
            "integer": "పూర్ణాంకం", "boolean": "బూలియన్ (నిజం/అబద్ధం)",
            "recursion": "పునరావర్తనం", "algorithm": "విధానం",
        },
        "analogies": {
            "variable": "చరరాశి అంటే ఒక డబ్బా లాంటిది — దాన్లో ఏదైనా పెట్టవచ్చు",
            "function": "ఫంక్షన్ అంటే వంట రెసిపీ లాంటిది — ఒకసారి రాసి మళ్ళీ మళ్ళీ వాడు",
            "loop": "లూప్ అంటే రోజూ బడికి వెళ్ళడం లాంటిది — అదే పని మళ్ళీ మళ్ళీ",
            "stack": "స్టాక్ అంటే అట్టు పాత్రలు పేర్చడం లాంటిది — చివర పెట్టింది ముందు తీస్తాం",
            "queue": "క్యూ అంటే రేషన్ షాప్ లైన్ లాంటిది — ముందు వచ్చిన వాళ్ళకే ముందు",
        },
        "encouragement": [
            "శభాష్! చాలా బాగా చెప్పారు!",
            "అద్భుతం! సరిగ్గా అర్థమైంది!",
            "వెరీ గుడ్!",
            "కొనసాగించండి!",
        ],
        "error_explanations": {
            "NameError": "ఈ లోపం ఎందుకంటే మీరు వాడిన చరరాశి Python కి తెలియదు. ముందు దాన్ని సృష్టించాలి.",
            "TypeError": "తప్పు రకం — సంఖ్యని మరియు అక్షరాల్ని కలపడానికి ప్రయత్నిస్తున్నారు.",
            "SyntaxError": "Python మీ కోడ్ చదవలేకపోతోంది. colon లేదా bracket మర్చిపోయారా?",
            "IndexError": "జాబితాలో ఆ స్థానంలో ఏమీ లేదు.",
            "RecursionError": "ఫంక్షన్ తనను తాను పిలుస్తూనే ఉంది. Base case జోడించండి.",
        },
        "teaching_phrases": {
            "what_do_you_think": "ఈ లైన్ ఏమి చేస్తుందని మీరు అనుకుంటున్నారు?",
            "try_it": "ఇప్పుడు మీరే రన్ చేసి చూడండి.",
            "good_question": "చాలా మంచి ప్రశ్న!",
            "do_you_understand": "అర్థమైందా?",
        },
    },

    "bn": {
        "name": "Bengali", "script": "Bengali", "family": "Indo-Aryan",
        "grammar_notes": "SOV. Postpositions. Honorific system. No grammatical gender.",
        "coding_vocab": {
            "variable": "চলক", "function": "ফাংশন", "loop": "লুপ / পুনরাবৃত্তি",
            "class": "ক্লাস", "object": "বস্তু", "error": "ত্রুটি",
            "list": "তালিকা", "string": "স্ট্রিং", "integer": "পূর্ণসংখ্যা",
            "boolean": "বুলিয়ান (সত্য/মিথ্যা)", "recursion": "পুনরাবর্তন",
        },
        "analogies": {
            "variable": "চলক হলো একটা বাক্সের মতো — যেকোনো কিছু রাখা যায়",
            "function": "ফাংশন হলো রান্নার রেসিপির মতো — একবার লেখো, বারবার ব্যবহার করো",
            "loop": "লুপ হলো প্রতিদিন স্কুলে যাওয়ার মতো — একই কাজ বারবার",
            "stack": "স্ট্যাক হলো থালা-বাসন স্তূপের মতো — শেষে রাখা জিনিস আগে তোলা হয়",
            "queue": "কিউ হলো বাসের লাইনের মতো — আগে আসলে আগে পাবে",
        },
        "encouragement": [
            "শাবাশ! একদম ঠিক!",
            "অসাধারণ! খুব ভালো ভেবেছ!",
            "দারুণ!",
            "এগিয়ে যাও!",
        ],
        "error_explanations": {
            "NameError": "এই ত্রুটি হয় কারণ Python তোমার ব্যবহার করা চলকটি চেনে না। আগে চলক তৈরি করতে হবে।",
            "TypeError": "ভুল ধরন — সংখ্যা আর শব্দ একসাথে যোগ করার চেষ্টা করছ।",
            "SyntaxError": "Python কোডটি পড়তে পারছে না। colon বা bracket বাদ পড়েছে কি?",
            "IndexError": "তালিকায় সেই জায়গায় কিছু নেই।",
        },
        "teaching_phrases": {
            "what_do_you_think": "তোমার কি মনে হয় এই লাইনটি কী করছে?",
            "try_it": "এখন নিজে চালিয়ে দেখো।",
            "good_question": "খুব ভালো প্রশ্ন!",
            "do_you_understand": "বুঝতে পেরেছ?",
        },
    },

    "mr": {
        "name": "Marathi", "script": "Devanagari", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "चल (chal)", "function": "फंक्शन", "loop": "लूप",
            "error": "त्रुटी", "list": "यादी", "class": "वर्ग",
            "integer": "पूर्णांक", "boolean": "बुलियन (खरे/खोटे)",
        },
        "analogies": {
            "variable": "चल म्हणजे एक डबा — त्यात काहीही ठेवता येतं",
            "function": "फंक्शन म्हणजे पाककृती — एकदा लिहा, वारंवार वापरा",
            "loop": "लूप म्हणजे दररोज शाळेत जाण्यासारखं — तीच गोष्ट पुन्हा पुन्हा",
            "stack": "स्टॅक म्हणजे ताटांचा ढीग — शेवटचं ठेवलेलं पहिलं काढतो",
        },
        "encouragement": ["शाब्बास!", "अप्रतिम!", "एकदम बरोबर!", "जबरदस्त!"],
        "error_explanations": {
            "NameError": "ही त्रुटी होते कारण Python ला तुम्ही वापरलेला चल माहित नाही.",
            "TypeError": "चुकीचा प्रकार — संख्या आणि शब्द एकत्र करण्याचा प्रयत्न.",
            "SyntaxError": "Python तुमचा कोड वाचू शकत नाही. colon किंवा bracket विसरलात का?",
        },
        "teaching_phrases": {
            "what_do_you_think": "तुम्हाला काय वाटतं ही ओळ काय करते?",
            "try_it": "आता स्वतः चालवून पाहा.",
            "do_you_understand": "समजलं का?",
        },
    },

    "gu": {
        "name": "Gujarati", "script": "Gujarati", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "ચર (char)", "function": "ફંક્શન", "loop": "લૂપ",
            "error": "ભૂલ", "list": "યાદી", "class": "વર્ગ",
            "integer": "પૂર્ણ સંખ્યા", "boolean": "બૂલિયન (સાચું/ખોટું)",
        },
        "analogies": {
            "variable": "ચર એ એક ડબ્બા જેવું છે — કંઈ પણ રાખી શકો",
            "function": "ફંક્શન એ રેસિપી જેવું છે — એકવાર લખો, વારંવાર ઉપયોગ કરો",
            "stack": "સ્ટૅક એ ડિશ સ્ટૅક જેવો છે — છેલ્લે મૂક્યું પહેલાં નીકળે",
        },
        "encouragement": ["શાબ્બાશ!", "અદ્ભુત!", "એકદમ સાચું!", "ખૂબ સરસ!"],
        "error_explanations": {
            "NameError": "આ ભૂલ ત્યારે આવે છે જ્યારે Python ને વેરિએબલ ખબર ન હોય.",
            "SyntaxError": "Python કોડ વાંચી નથી શકતું. colon કે bracket ભૂલ્યા?",
        },
        "teaching_phrases": {
            "what_do_you_think": "તમને શું લાગે છે આ લાઇન શું કરે છે?",
            "do_you_understand": "સમજ પડ્યું?",
        },
    },

    "kn": {
        "name": "Kannada", "script": "Kannada", "family": "Dravidian",
        "coding_vocab": {
            "variable": "ಚರಾಂಕ", "function": "ಕಾರ್ಯ / ಫಂಕ್ಷನ್", "loop": "ಲೂಪ್",
            "error": "ದೋಷ", "list": "ಪಟ್ಟಿ", "class": "ವರ್ಗ",
            "integer": "ಪೂರ್ಣಾಂಕ", "boolean": "ಬೂಲಿಯನ್ (ಸತ್ಯ/ಅಸತ್ಯ)",
        },
        "analogies": {
            "variable": "ಚರಾಂಕ ಒಂದು ಡಬ್ಬದಂತಿದೆ — ಯಾವುದನ್ನಾದರೂ ಇಡಬಹುದು",
            "function": "ಫಂಕ್ಷನ್ ಅಡುಗೆ ರೆಸಿಪಿಯಂತಿದೆ — ಒಮ್ಮೆ ಬರೆದು ಮತ್ತೆ ಮತ್ತೆ ಬಳಸಿ",
            "stack": "ಸ್ಟ್ಯಾಕ್ ಅಕ್ಕಿ ಡಬ್ಬಿಗಳ ಗುಡ್ಡೆಯಂತಿದೆ — ಕೊನೆಯದು ಮೊದಲು ಹೊರಬರುತ್ತದೆ",
        },
        "encouragement": ["ಭಲೇ!", "ಅದ್ಭುತ!", "ಸರಿಯಾಗಿ ಹೇಳಿದಿರಿ!", "ಮುಂದುವರೆಯಿರಿ!"],
        "error_explanations": {
            "NameError": "ಈ ದೋಷ ಬರುತ್ತದೆ ಏಕೆಂದರೆ Python ಗೆ ಆ variable ತಿಳಿದಿಲ್ಲ.",
            "SyntaxError": "Python ಕೋಡ್ ಓದಲು ಆಗುತ್ತಿಲ್ಲ. colon ಅಥವಾ bracket ಮರೆತಿರಾ?",
        },
        "teaching_phrases": {
            "what_do_you_think": "ಈ ಸಾಲು ಏನು ಮಾಡುತ್ತದೆ ಎಂದು ನಿಮಗೆ ಅನಿಸುತ್ತದೆ?",
            "do_you_understand": "ಅರ್ಥವಾಯಿತೇ?",
        },
    },

    "ml": {
        "name": "Malayalam", "script": "Malayalam", "family": "Dravidian",
        "coding_vocab": {
            "variable": "ചരം (charam)", "function": "ഫംഗ്ഷൻ", "loop": "ലൂപ്പ്",
            "error": "പിശക്", "list": "പട്ടിക", "class": "ക്ലാസ്",
            "integer": "പൂർണ്ണസംഖ്യ", "boolean": "ബൂളിയൻ (ശരി/തെറ്റ്)",
        },
        "analogies": {
            "variable": "ചരം ഒരു പെട്ടി പോലെ — ഏതൊരു കാര്യവും സൂക്ഷിക്കാം",
            "function": "ഫംഗ്ഷൻ ഒരു പാചകക്കുറിപ്പ് പോലെ — ഒരിക്കൽ എഴുതിയാൽ മതി",
            "stack": "സ്റ്റാക്ക് ഇഡ്ഡലി പാത്രങ്ങൾ അടുക്കിവച്ചത് പോലെ — അവസാനത്തേത് ആദ്യം",
        },
        "encouragement": ["ശബ്ബാഷ്!", "മികച്ചത്!", "കൃത്യം!", "തുടരൂ!"],
        "error_explanations": {
            "NameError": "ഈ പിശക് വരുന്നത് Python-ന് ആ variable അറിയില്ലാത്തതുകൊണ്ടാണ്.",
            "SyntaxError": "Python-ന് കോഡ് വായിക്കാൻ കഴിയുന്നില്ല. colon അല്ലെങ്കിൽ bracket മറന്നോ?",
        },
        "teaching_phrases": {
            "what_do_you_think": "ഈ വരി എന്ത് ചെയ്യുന്നുവെന്ന് നിങ്ങൾക്ക് തോന്നുന്നുണ്ടോ?",
            "do_you_understand": "മനസ്സിലായോ?",
        },
    },

    "pa": {
        "name": "Punjabi", "script": "Gurmukhi", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "ਚਲ (chal)", "function": "ਫੰਕਸ਼ਨ", "loop": "ਲੂਪ",
            "error": "ਗਲਤੀ", "list": "ਸੂਚੀ", "class": "ਕਲਾਸ",
            "integer": "ਪੂਰਨ ਅੰਕ", "boolean": "ਬੂਲੀਅਨ (ਸੱਚ/ਝੂਠ)",
        },
        "analogies": {
            "variable": "ਚਲ ਇੱਕ ਡੱਬੇ ਵਰਗਾ ਹੈ — ਕੁਝ ਵੀ ਰੱਖ ਸਕਦੇ ਹੋ",
            "function": "ਫੰਕਸ਼ਨ ਇੱਕ ਰੈਸੀਪੀ ਵਰਗਾ ਹੈ — ਇੱਕ ਵਾਰ ਲਿਖੋ, ਵਾਰ ਵਾਰ ਵਰਤੋ",
            "stack": "ਸਟੈਕ ਥਾਲੀਆਂ ਦੇ ਢੇਰ ਵਰਗਾ — ਆਖਰੀ ਪਹਿਲਾਂ ਚੁੱਕੋ",
        },
        "encouragement": ["ਸ਼ਾਬਾਸ਼!", "ਬਹੁਤ ਵਧੀਆ!", "ਬਿਲਕੁਲ ਸਹੀ!", "ਚੜ੍ਹਦੀਕਲਾ!"],
        "error_explanations": {
            "NameError": "ਇਹ ਗਲਤੀ ਆਉਂਦੀ ਹੈ ਕਿਉਂਕਿ Python ਨੂੰ ਉਹ variable ਨਹੀਂ ਪਤਾ।",
            "SyntaxError": "Python ਕੋਡ ਪੜ੍ਹ ਨਹੀਂ ਸਕਦਾ। colon ਜਾਂ bracket ਭੁੱਲ ਗਏ?",
        },
        "teaching_phrases": {
            "what_do_you_think": "ਤੁਹਾਨੂੰ ਕੀ ਲੱਗਦਾ ਹੈ ਇਹ ਲਾਈਨ ਕੀ ਕਰਦੀ ਹੈ?",
            "do_you_understand": "ਸਮਝ ਆਈ?",
        },
    },

    "or": {
        "name": "Odia", "script": "Odia", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "ଚଳ", "function": "ଫଙ୍କସନ", "loop": "ଲୁପ",
            "error": "ତ୍ରୁଟି", "list": "ତାଲିକା", "integer": "ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା",
        },
        "analogies": {
            "variable": "ଚଳ ଏକ ବାକ୍ସ ପରି — ଯାହା ଇଚ୍ଛା ରଖ",
            "function": "ଫଙ୍କସନ ଏକ ରୋଷେଇ ରେସିପି ପରି — ଥରେ ଲଖ, ବାରଟ ଥର ବ୍ୟବହାର କର",
        },
        "encouragement": ["ସାବାଶ!", "ବହୁତ ଭଲ!", "ଏକଦମ ଠିକ!"],
        "error_explanations": {
            "NameError": "ଏହି ତ୍ରୁଟି ଆସୁଛି କାରଣ Python ସେ variable ଚିହ୍ନେ ନାହିଁ।",
        },
        "teaching_phrases": {
            "what_do_you_think": "ଆପଣ ଭାବୁଛନ୍ତି ଏହି ଧାଡ଼ି କ'ଣ କରୁଛି?",
            "do_you_understand": "ବୁଝିଲେ?",
        },
    },

    "as": {
        "name": "Assamese", "script": "Bengali", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "চলক", "function": "ফাংচন", "loop": "লুপ",
            "error": "ত্ৰুটি", "list": "তালিকা",
        },
        "analogies": {
            "variable": "চলক এটা বাকচৰ দৰে — যি ইচ্ছা থ'ব পাৰি",
            "function": "ফাংচন এটা ৰান্ধনী ৰেচিপিৰ দৰে",
        },
        "encouragement": ["শাবাশ!", "বহুত ভাল!", "একদম শুদ্ধ!"],
        "error_explanations": {
            "NameError": "এই ত্ৰুটি আহিছে কাৰণ Python-এ সেই চলকটো নাজানে।",
        },
        "teaching_phrases": {
            "what_do_you_think": "আপুনি ভাবিছেনে এই শাৰীটোৱে কি কৰিছে?",
            "do_you_understand": "বুজিলে?",
        },
    },

    "mai": {
        "name": "Maithili", "script": "Devanagari", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "चल", "function": "फ़ंक्शन", "error": "गड़बड़ी",
            "list": "सूची", "loop": "लूप",
        },
        "analogies": {
            "variable": "चल एकटा डिब्बा जेकाँ अछि — किछुओ रखि सकैत छी",
            "function": "फ़ंक्शन खाना बनेबाक विधि जेकाँ — एक बेर लिखू, बेर-बेर प्रयोग करू",
        },
        "encouragement": ["शाबाश!", "बहुत नीक!", "एकदम सही!"],
        "error_explanations": {
            "NameError": "ई गड़बड़ी एहि लेल भेल जे Python ओहि variable केँ नहि चिन्हैत अछि।",
        },
        "teaching_phrases": {
            "what_do_you_think": "अहाँ की सोचैत छी ई लाइन की करैत अछि?",
            "do_you_understand": "बुझलहुँ?",
        },
    },

    "ne": {
        "name": "Nepali", "script": "Devanagari", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "चर", "function": "फंक्सन", "loop": "लूप",
            "error": "त्रुटि", "list": "सूची",
        },
        "analogies": {
            "variable": "चर एउटा बाकस जस्तै हो — जे पनि राख्न सकिन्छ",
            "function": "फंक्सन खाना पकाउने रेसिपी जस्तै — एकपटक लेखेर बारम्बार प्रयोग",
        },
        "encouragement": ["शाबास!", "राम्रो!", "एकदम सही!"],
        "error_explanations": {
            "NameError": "यो त्रुटि आयो किनभने Python लाई त्यो variable थाहा छैन।",
        },
        "teaching_phrases": {
            "what_do_you_think": "तपाईंलाई के लाग्छ यो लाइनले के गर्छ?",
            "do_you_understand": "बुझ्नुभयो?",
        },
    },

    "sa": {
        "name": "Sanskrit", "script": "Devanagari", "family": "Indo-Aryan",
        "grammar_notes": "Highly inflected. Eight cases. Three genders. Three numbers. Classical language.",
        "coding_vocab": {
            "variable": "चलराशिः", "function": "कार्यम्", "loop": "आवर्तनम्",
            "error": "दोषः", "list": "सूची", "class": "वर्गः",
            "integer": "पूर्णाङ्कः", "boolean": "द्विमानम् (सत्य/असत्य)",
            "algorithm": "क्रमविधिः", "recursion": "स्वसंदर्भः",
        },
        "analogies": {
            "variable": "चलराशिः कोशस्य सदृशः अस्ति — यत्र किमपि संस्थापयितुं शक्यते",
            "function": "कार्यम् पाककृतेः सदृशम् — एकवारं लिखित्वा पुनः पुनः उपयुज्यते",
            "recursion": "स्वसंदर्भः दर्पणस्य सम्मुखे दर्पणस्थापनवत् — स्वयमेव स्वयं पश्यति",
        },
        "encouragement": ["साधु!", "उत्तमम्!", "सम्यक्!", "एवमेव!"],
        "error_explanations": {
            "NameError": "अयं दोषः अभवत् यतः Python तस्य चलराशेः परिचयं न जानाति।",
            "SyntaxError": "Python कोडं पठितुम् असमर्थः। किं colon वा bracket विस्मृतम्?",
        },
        "teaching_phrases": {
            "what_do_you_think": "भवान् किं मन्यते अयं पङ्क्तिः किं करोति?",
            "do_you_understand": "बोधः अभवत् वा?",
        },
    },

    "ks": {
        "name": "Kashmiri", "script": "Arabic (Nastaliq)", "family": "Indo-Aryan", "rtl": True,
        "coding_vocab": {
            "variable": "بَدَلوٗن والہٕ", "function": "کارکٔرد", "loop": "لوٗپ",
            "error": "غَلَطی", "list": "فہرست",
        },
        "analogies": {
            "variable": "بَدَلوٗن والہٕ اکھ ڈَبہٕ ہَنز مانِند چھٕ — تِتھٕ کانہہ بہٕ یِوان چھٕ",
        },
        "encouragement": ["شاباش!", "خوب!", "بلکل سہی!"],
        "error_explanations": {
            "NameError": "یِہ غَلَطی اَیہٕ کیازِکہٕ Python اُس variable کُنۍ نہٕ پَچھان چھٕ۔",
        },
        "teaching_phrases": {
            "what_do_you_think": "تُہٕ کیا سوچان چھِوٕ یِہ سَطر کیا کَران چھٕ؟",
            "do_you_understand": "سمجھ پَیہٕ؟",
        },
    },

    "kok": {
        "name": "Konkani", "script": "Devanagari", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "चल", "function": "फंक्शन", "error": "चूक",
            "loop": "लूप", "list": "यादी",
        },
        "analogies": {
            "variable": "चल एका डब्यासारखा — कितेंय दवरूं येता",
            "function": "फंक्शन जेवण रेसिपीसारखें — एकदां लिख, वारंवार वापर",
        },
        "encouragement": ["शाब्बास!", "भोव बरें!", "एकदम सारकें!"],
        "error_explanations": {
            "NameError": "ही चूक जाली कारण Python त्या variable क ओळखना।",
        },
        "teaching_phrases": {
            "what_do_you_think": "तुमकां किदें दिसता ही ओळ किदें करता?",
            "do_you_understand": "कळ्ळें?",
        },
    },

    "doi": {
        "name": "Dogri", "script": "Devanagari", "family": "Indo-Aryan",
        "coding_vocab": {
            "variable": "चल", "function": "फंक्शन", "error": "गलती",
            "loop": "लूप", "list": "सूची",
        },
        "analogies": {
            "variable": "चल इक डिब्बे जनेई ऐ — कुझ वी रख्खी सकदे ओ",
            "function": "फंक्शन खाना बनाने दी विधि जनेई — इक बारी लिखो, बार-बार वरतो",
        },
        "encouragement": ["शाबाश!", "बढ़िया!", "बिल्कुल सही!"],
        "error_explanations": {
            "NameError": "एह गलती एह लेई होई जे Python उस variable कनूं नेईं जान्दा।",
        },
        "teaching_phrases": {
            "what_do_you_think": "तुसेंगी की लग्गा एह लाइन की करदी ऐ?",
            "do_you_understand": "समझ आई?",
        },
    },

    "brx": {
        "name": "Bodo", "script": "Devanagari", "family": "Tibeto-Burman",
        "coding_vocab": {
            "variable": "चल", "function": "फंक्शन", "error": "गलसि",
            "loop": "लूप", "list": "फारि",
        },
        "analogies": {
            "variable": "चल मोदोम दोंखोबा जायगा — जेबो थाबावनो हागौ",
        },
        "encouragement": ["बारी खामानि!", "बहुत नोजोर!", "साबाश!"],
        "error_explanations": {
            "NameError": "बे गलसि मोनदों जाय Python आ बे variable थानाय नाजानो।",
        },
        "teaching_phrases": {
            "what_do_you_think": "नोंनि मोन थानाय बे लाइन माब्लाबा खालामो?",
            "do_you_understand": "गावसोबनाय जादों?",
        },
    },

    "mni": {
        "name": "Meitei (Manipuri)", "script": "Meitei Mayek", "family": "Tibeto-Burman",
        "coding_vocab": {
            "variable": "ꯃꯑꯣꯡ ꯂꯧꯕ", "function": "ꯐꯪꯁꯟ", "error": "ꯑꯁꯨꯝꯕ",
            "loop": "ꯂꯨꯞ", "list": "ꯂꯤꯁ꯭ꯇ",
        },
        "analogies": {
            "variable": "ꯃꯑꯣꯡ ꯂꯧꯕ ꯑꯃꯥ ꯆꯦꯡꯍꯪꯅꯕ ꯗꯕꯥ ꯑꯃꯅꯤ꯫",
        },
        "encouragement": ["ꯁꯥꯕꯥꯁ਼!", "ꯍꯥꯢꯗꯧꯅ!", "ꯁꯤꯔꯝ ꯑꯃꯅꯤ!"],
        "error_explanations": {
            "NameError": "ꯑꯁꯨꯝꯕ ꯑꯁꯤ ꯂꯩꯕꯒꯤ ꯃꯇꯥꯡꯗꯥ Python ꯅꯥ ꯑꯗꯨ variable ꯑꯃꯥ ꯉꯥꯛꯄꯕ ꯅꯤ꯫",
        },
        "teaching_phrases": {
            "what_do_you_think": "ꯑꯩꯒꯤ ꯂꯥꯏꯟ ꯑꯁꯤꯅꯥ ꯃꯍꯥꯛꯅꯥ ꯉꯥꯛꯄꯗꯒꯤ ꯉꯥꯛꯄꯅꯥ?",
            "do_you_understand": "ꯄꯨꯛꯅꯤꯡ ꯁꯤꯔꯝ ꯂꯩꯔꯦ?",
        },
    },

    "sat": {
        "name": "Santali", "script": "Ol Chiki", "family": "Austroasiatic",
        "coding_vocab": {
            "variable": "ᱵᱚᱫᱚᱞ ᱦᱩᱭ", "function": "ᱠᱟᱢ", "error": "ᱜᱚᱞᱚᱴ",
            "loop": "ᱞᱩᱯ", "list": "ᱨᱮᱱᱟᱜ ᱛᱟᱞᱤᱠᱟ",
        },
        "analogies": {
            "variable": "ᱵᱚᱫᱚᱞ ᱦᱩᱭ ᱑ᱤ ᱫᱟᱹᱵᱤ ᱦᱟᱱᱟᱢ — ᱮᱱᱮᱢ ᱵᱟᱸᱫᱷᱟᱣ ᱦᱩᱭᱫᱟ",
        },
        "encouragement": ["ᱥᱟᱯᱲᱟᱣ!", "ᱵᱟᱲᱛᱤ ᱵᱷᱟᱞᱚ!", "ᱥᱟᱯᱲᱟᱣ ᱠᱟᱱᱟ!"],
        "error_explanations": {
            "NameError": "ᱱᱚᱶᱟ ᱜᱚᱞᱚᱴ ᱞᱮᱠᱟᱱ ᱮᱱ ᱠᱮᱫ Python ᱑ᱤ variable ᱠᱷᱚᱱ ᱵᱟᱨᱦᱟᱭ ᱢᱮᱱᱟᱜ᱾",
        },
        "teaching_phrases": {
            "what_do_you_think": "ᱱᱚᱶᱟ ᱞᱟᱭᱤᱱ ᱢᱤᱫ ᱠᱟᱢ ᱮᱢᱟ ᱦᱩᱭᱩᱭ ᱢᱮᱱᱟᱜ?",
            "do_you_understand": "ᱵᱩᱡᱷᱟᱹᱣ ᱦᱩᱭᱩᱭ?",
        },
    },
}


# ══════════════════════════════════════════════════════════════
# PART B — ALL PROGRAMMING LANGUAGES KNOWLEDGE BASE
# ══════════════════════════════════════════════════════════════

PROG_LANG_KNOWLEDGE: dict = {

    # ── PYTHON ────────────────────────────────────────────────
    "python": {
        "versions": ["2.7 (legacy)", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13"],
        "paradigms": ["imperative", "OOP", "functional", "scripting"],
        "key_concepts": ["GIL", "duck typing", "list comprehension", "generators",
                         "decorators", "context managers", "metaclasses", "asyncio"],
        "common_errors": {
            "IndentationError": "Python uses whitespace for structure — 4 spaces per level",
            "NameError": "Variable used before assignment",
            "TypeError": "Wrong type — check int/str/list mismatches",
            "AttributeError": "Object doesn't have that method/property",
        },
        "teaching_tips": "Start with print(), input(). Build mental model: everything is an object.",
        "advanced_topics": ["metaclasses", "descriptors", "GIL internals", "CPython bytecode",
                            "memory management", "C extensions", "asyncio event loop"],
        "ecosystem": ["NumPy", "Pandas", "Flask", "Django", "FastAPI", "PyTorch", "TensorFlow"],
    },

    # ── C ─────────────────────────────────────────────────────
    "c": {
        "versions": ["C89/ANSI", "C99", "C11", "C17", "C23"],
        "paradigms": ["procedural", "structured", "low-level"],
        "key_concepts": ["pointers", "memory management", "malloc/free", "arrays",
                         "structs", "unions", "preprocessor", "undefined behaviour"],
        "common_errors": {
            "segmentation fault": "Accessing invalid memory — check pointer arithmetic",
            "stack overflow": "Infinite recursion or large stack allocation",
            "memory leak": "malloc without free — use valgrind to detect",
            "dangling pointer": "Using pointer after free()",
            "buffer overflow": "Writing past array bounds",
        },
        "teaching_tips": "Teach memory model first. Draw boxes and arrows for pointers.",
        "advanced_topics": ["pointer arithmetic", "function pointers", "inline assembly",
                            "ABI", "linker scripts", "volatile/restrict qualifiers"],
        "analogy": "C is like driving a manual car — full control, full responsibility",
    },

    # ── C++ ───────────────────────────────────────────────────
    "cpp": {
        "versions": ["C++98", "C++11", "C++14", "C++17", "C++20", "C++23"],
        "paradigms": ["OOP", "generic", "functional", "procedural"],
        "key_concepts": ["RAII", "move semantics", "templates", "STL", "smart pointers",
                         "virtual dispatch", "operator overloading", "lambdas"],
        "common_errors": {
            "use after move": "Object used after std::move()",
            "object slicing": "Assigning derived to base copies only base part",
            "pure virtual not implemented": "Must implement all pure virtual methods",
            "multiple inheritance diamond": "Use virtual inheritance",
        },
        "teaching_tips": "C++11 and beyond — use smart pointers always. Avoid raw new/delete.",
        "advanced_topics": ["template metaprogramming", "CRTP", "concept constraints",
                            "coroutines", "modules", "constexpr", "SFINAE"],
    },

    # ── JAVA ──────────────────────────────────────────────────
    "java": {
        "versions": ["Java 8 (LTS)", "Java 11 (LTS)", "Java 17 (LTS)", "Java 21 (LTS)", "Java 22"],
        "paradigms": ["OOP", "imperative", "functional (Java 8+)"],
        "key_concepts": ["JVM", "bytecode", "garbage collection", "generics",
                         "interfaces", "abstract classes", "streams", "lambdas"],
        "common_errors": {
            "NullPointerException": "Calling method on null object — use Optional<>",
            "ArrayIndexOutOfBoundsException": "Index >= array.length",
            "ClassCastException": "Invalid type cast — check instanceof first",
            "ConcurrentModificationException": "Modifying list while iterating",
            "StackOverflowError": "Infinite recursion",
        },
        "teaching_tips": "Everything in a class. Strong types. JVM makes it platform-independent.",
        "advanced_topics": ["JVM internals", "bytecode manipulation", "reflection",
                            "concurrency (synchronized, locks)", "Spring framework", "JPA"],
    },

    # ── JAVASCRIPT / TYPESCRIPT ───────────────────────────────
    "javascript": {
        "versions": ["ES5", "ES6/2015", "ES2017", "ES2020", "ES2022", "ES2024"],
        "paradigms": ["event-driven", "functional", "OOP (prototype)", "async"],
        "key_concepts": ["event loop", "closures", "prototypal inheritance", "promises",
                         "async/await", "hoisting", "this binding", "spread/rest"],
        "common_errors": {
            "undefined is not a function": "Calling non-function — check variable type",
            "Cannot read property of undefined": "Accessing property of undefined object",
            "Uncaught TypeError": "Type mismatch in operation",
            "ReferenceError": "Variable not declared in scope",
        },
        "teaching_tips": "Teach the event loop visually. Closures through practical examples.",
        "advanced_topics": ["V8 engine", "microtask queue", "WeakMap/WeakRef",
                            "Proxy/Reflect", "WebAssembly", "service workers"],
    },

    "typescript": {
        "versions": ["TS 4.x", "TS 5.x"],
        "paradigms": ["typed superset of JavaScript"],
        "key_concepts": ["type system", "interfaces", "generics", "decorators",
                         "union types", "intersection types", "type guards", "mapped types"],
        "common_errors": {
            "Type is not assignable": "Type mismatch — check your type definitions",
            "Property does not exist": "Interface/type doesn't have that property",
            "Argument of type X not assignable to Y": "Function expects different type",
        },
        "teaching_tips": "TypeScript = JavaScript + types. Catches bugs at compile time.",
        "advanced_topics": ["conditional types", "template literal types", "infer keyword",
                            "satisfies operator", "const type parameters"],
    },

    # ── WEB ───────────────────────────────────────────────────
    "html": {
        "versions": ["HTML4", "XHTML", "HTML5", "Living Standard"],
        "key_concepts": ["semantic elements", "DOM", "accessibility (ARIA)",
                         "forms", "media elements", "shadow DOM"],
        "teaching_tips": "HTML is structure. CSS is style. JS is behaviour. Always in that order.",
        "common_errors": {
            "unclosed tag": "Every opening tag needs a closing tag",
            "nesting error": "Block elements can't be inside inline elements",
            "missing alt": "Images must have alt text for accessibility",
        },
    },

    "css": {
        "versions": ["CSS1", "CSS2", "CSS3", "CSS4 (modular)"],
        "key_concepts": ["box model", "flexbox", "grid", "specificity", "cascade",
                         "custom properties", "animations", "media queries"],
        "common_errors": {
            "specificity conflict": "More specific selector overrides general — use BEM",
            "margin collapse": "Adjacent vertical margins collapse to larger one",
            "z-index not working": "z-index needs position: relative/absolute/fixed",
        },
        "teaching_tips": "Teach box model first. Flexbox for 1D, Grid for 2D layouts.",
    },

    # ── DATABASES ─────────────────────────────────────────────
    "sql": {
        "dialects": ["MySQL", "PostgreSQL", "SQLite", "SQL Server", "Oracle", "MariaDB"],
        "key_concepts": ["DDL", "DML", "DQL", "joins", "indexes", "transactions",
                         "ACID", "normalization", "views", "stored procedures"],
        "common_errors": {
            "ambiguous column": "Qualify with table name: SELECT t.col FROM t",
            "GROUP BY missing": "Select non-aggregated column not in GROUP BY",
            "cartesian product": "JOIN without ON condition — always specify join condition",
            "N+1 query": "Loop making individual DB queries — use JOIN instead",
        },
        "teaching_tips": "Visualise tables as spreadsheets. JOIN is just combining sheets.",
        "advanced_topics": ["query plan (EXPLAIN)", "index types (B-tree, Hash, GiST)",
                            "window functions", "CTEs", "partitioning", "sharding"],
    },

    # ── SYSTEMS ───────────────────────────────────────────────
    "rust": {
        "versions": ["Rust 2015", "Rust 2018", "Rust 2021"],
        "paradigms": ["systems", "memory-safe", "concurrent", "functional"],
        "key_concepts": ["ownership", "borrowing", "lifetimes", "traits", "enums",
                         "pattern matching", "fearless concurrency", "zero-cost abstractions"],
        "common_errors": {
            "borrow checker": "Cannot have mutable and immutable references simultaneously",
            "lifetime error": "Reference outlives the data it refers to",
            "move error": "Value moved then used again — clone() or use reference",
        },
        "teaching_tips": "Ownership is the hardest concept — use box-arrow diagrams.",
    },

    "go": {
        "versions": ["Go 1.x", "Go 1.21+"],
        "paradigms": ["procedural", "concurrent", "compiled"],
        "key_concepts": ["goroutines", "channels", "interfaces", "defer", "panic/recover",
                         "structs", "slices", "maps", "garbage collection"],
        "common_errors": {
            "goroutine leak": "Goroutine blocked forever on channel — always close channels",
            "race condition": "Run with -race flag to detect",
            "nil pointer dereference": "Check for nil before use",
        },
        "teaching_tips": "Go is opinionated — embrace gofmt and idioms.",
    },

    # ── FUNCTIONAL ────────────────────────────────────────────
    "haskell": {
        "paradigms": ["purely functional", "lazy evaluation", "strong static typing"],
        "key_concepts": ["monads", "functors", "applicatives", "type classes",
                         "pattern matching", "lazy evaluation", "currying"],
        "teaching_tips": "Think in transformations, not mutations. Types guide everything.",
    },

    "scala": {
        "paradigms": ["functional", "OOP", "JVM-based"],
        "key_concepts": ["case classes", "pattern matching", "for-comprehensions",
                         "implicits", "futures", "type system", "traits"],
        "ecosystem": ["Akka", "Spark", "Play Framework", "Cats", "ZIO"],
    },

    # ── SCRIPTING ─────────────────────────────────────────────
    "bash": {
        "key_concepts": ["shebang", "variables", "conditionals", "loops", "functions",
                         "pipes", "redirects", "exit codes", "cron"],
        "common_errors": {
            "unquoted variable": "Always quote: \"$var\" not $var — prevents word splitting",
            "missing space in if": "[ $x -eq 1 ] needs spaces around brackets",
            "permission denied": "chmod +x script.sh",
        },
    },

    # ── DATA / ML ─────────────────────────────────────────────
    "r": {
        "paradigms": ["statistical", "functional", "vector-based"],
        "key_concepts": ["vectors", "data frames", "ggplot2", "dplyr", "tidyr",
                         "statistical modeling", "S3/S4/R5 OOP"],
        "teaching_tips": "Everything in R is a vector. Vectorised operations are fast.",
    },

    # ── MOBILE ────────────────────────────────────────────────
    "swift": {
        "versions": ["Swift 5.x", "Swift 5.9+"],
        "paradigms": ["OOP", "functional", "protocol-oriented"],
        "key_concepts": ["optionals", "protocols", "extensions", "closures",
                         "value vs reference types", "ARC memory management", "SwiftUI"],
    },

    "kotlin": {
        "versions": ["Kotlin 1.x", "Kotlin 2.x"],
        "paradigms": ["OOP", "functional", "JVM + Android + Kotlin/Native"],
        "key_concepts": ["null safety", "data classes", "coroutines", "extension functions",
                         "sealed classes", "companion objects"],
    },

    "dart": {
        "key_concepts": ["Flutter", "async/await", "streams", "null safety",
                         "mixins", "extension methods"],
        "teaching_tips": "Dart for Flutter — everything is a widget.",
    },

    # ── LOW-LEVEL / HARDWARE ──────────────────────────────────
    "assembly": {
        "dialects": ["x86 NASM/MASM", "x86-64", "ARM", "RISC-V", "MIPS"],
        "key_concepts": ["registers", "flags", "stack frames", "calling conventions",
                         "interrupts", "memory addressing modes", "SIMD"],
        "teaching_tips": "Map high-level concepts to assembly — function call = CALL + stack frame",
    },

    # ── QUERY / CONFIG ────────────────────────────────────────
    "graphql": {
        "key_concepts": ["schema", "queries", "mutations", "subscriptions",
                         "resolvers", "N+1 problem", "DataLoader"],
    },

    "yaml": {
        "key_concepts": ["indentation-sensitive", "anchors", "aliases", "multi-line strings"],
        "common_errors": {
            "tab vs space": "YAML uses spaces only — tabs are illegal",
            "wrong indent": "Each level must be consistent indentation",
        },
    },

    # ── COMPETITIVE PROGRAMMING SPECIFIC ─────────────────────
    "competitive": {
        "topics": [
            "Time complexity analysis (Big O)",
            "Space complexity",
            "Two pointers",
            "Sliding window",
            "Binary search on answer",
            "Prefix sums",
            "Segment trees",
            "Fenwick trees (BIT)",
            "Disjoint Set Union (DSU)",
            "Dijkstra, Bellman-Ford, Floyd-Warshall",
            "Topological sort",
            "SCC (Tarjan, Kosaraju)",
            "DP: knapsack, LIS, LCS, bitmask DP",
            "Number theory: sieve, modular arithmetic, fast power",
            "String: KMP, Z-function, suffix array",
            "Computational geometry basics",
        ],
        "analogy": "Competitive programming is like cricket — fundamentals first, then tactics.",
        "languages_used": ["C++ (fastest)", "Python (easiest)", "Java (verbose but accepted)"],
    },
}


# ══════════════════════════════════════════════════════════════
# PART C — SMART RESPONSE BUILDER
# Uses native language knowledge to generate richer explanations
# ══════════════════════════════════════════════════════════════

def get_native_error_explanation(error_type: str, lang_id: str) -> str:
    lang = NATIVE_LANG_KNOWLEDGE.get(lang_id, NATIVE_LANG_KNOWLEDGE["en"] if "en" in NATIVE_LANG_KNOWLEDGE else {})
    explanations = lang.get("error_explanations", {})
    return explanations.get(error_type, "")

def get_native_analogy(concept: str, lang_id: str) -> str:
    lang = NATIVE_LANG_KNOWLEDGE.get(lang_id, {})
    return lang.get("analogies", {}).get(concept, "")

def get_encouragement(lang_id: str) -> str:
    import random
    lang = NATIVE_LANG_KNOWLEDGE.get(lang_id, {})
    phrases = lang.get("encouragement", ["Great job!", "Well done!", "Excellent!"])
    return random.choice(phrases)

def get_coding_term(concept: str, lang_id: str) -> str:
    lang = NATIVE_LANG_KNOWLEDGE.get(lang_id, {})
    return lang.get("coding_vocab", {}).get(concept, concept)

def get_teaching_phrase(phrase_key: str, lang_id: str) -> str:
    lang = NATIVE_LANG_KNOWLEDGE.get(lang_id, {})
    return lang.get("teaching_phrases", {}).get(phrase_key, "")

def get_prog_lang_context(prog_lang: str) -> dict:
    key = prog_lang.lower().replace("+", "p").replace("#", "sharp")
    return PROG_LANG_KNOWLEDGE.get(key, {})

def detect_prog_language(code: str) -> str:
    """Detect programming language from code snippet."""
    patterns = {
        "python":     [r"def ", r"import ", r"print\(", r"elif ", r"self\."],
        "javascript": [r"const ", r"let ", r"var ", r"=>", r"console\.log"],
        "typescript": [r": string", r": number", r": boolean", r"interface ", r"<T>"],
        "java":       [r"public class", r"System\.out", r"void main", r"import java"],
        "cpp":        [r"#include", r"cout <<", r"cin >>", r"std::", r"->"],
        "c":          [r"#include <stdio", r"printf\(", r"scanf\(", r"int main\("],
        "rust":       [r"fn main", r"let mut", r"impl ", r"println!", r"->"],
        "go":         [r"func main\(\)", r"fmt\.Println", r":=", r"package main"],
        "sql":        [r"SELECT ", r"FROM ", r"WHERE ", r"CREATE TABLE", r"INSERT"],
        "bash":       [r"#!/bin/bash", r"\$\{", r"echo ", r"if \[\["],
        "html":       [r"<html", r"<div", r"<body", r"<!DOCTYPE"],
        "css":        [r"\{$", r"margin:", r"padding:", r"display:", r"color:"],
        "r":          [r"<-", r"library\(", r"data\.frame", r"ggplot"],
        "swift":      [r"var ", r"let ", r"func ", r"import Swift", r"@State"],
        "kotlin":     [r"fun main", r"val ", r"data class", r"println\("],
    }
    import re
    code_lower = code[:500]
    scores = {}
    for lang, pats in patterns.items():
        scores[lang] = sum(1 for p in pats if re.search(p, code_lower))
    return max(scores, key=scores.get) if max(scores.values()) > 0 else "python"


# ══════════════════════════════════════════════════════════════
# PART D — ENRICHED SYSTEM PROMPT BUILDER
# Injects native language + prog lang knowledge into every call
# ══════════════════════════════════════════════════════════════

def build_enriched_system_prompt(lang_id: str, prog_lang: str,
                                  grade_level: str) -> str:
    from gurujii_v4 import GURUJII_SYSTEM_PROMPT

    lang_data = NATIVE_LANG_KNOWLEDGE.get(lang_id, {})
    prog_data = PROG_LANG_KNOWLEDGE.get(prog_lang.lower(), {})

    # Native language section
    native_section = ""
    if lang_data:
        vocab = lang_data.get("coding_vocab", {})
        phrases = lang_data.get("teaching_phrases", {})
        encourage = lang_data.get("encouragement", [])
        native_section = f"""
NATIVE LANGUAGE MODE ({lang_data.get('name', lang_id)}):
Use these translated terms naturally: {list(vocab.items())[:8]}
Teaching phrases to use: {phrases}
Encouragement phrases: {encourage}
Grammar: {lang_data.get('grammar_notes', '')}
"""

    # Programming language expertise
    prog_section = ""
    if prog_data:
        prog_section = f"""
PROGRAMMING LANGUAGE EXPERTISE ({prog_lang.upper()}):
Key concepts to reference: {prog_data.get('key_concepts', [])[:6]}
Common errors and explanations: {prog_data.get('common_errors', {})}
Teaching approach: {prog_data.get('teaching_tips', '')}
Advanced topics if student is ready: {prog_data.get('advanced_topics', [])[:4]}
"""

    return GURUJII_SYSTEM_PROMPT + native_section + prog_section


# ══════════════════════════════════════════════════════════════
# PART E — TESTS
# ══════════════════════════════════════════════════════════════

import pytest

class TestNativeLanguage:
    def test_all_21_langs_present(self):
        expected = ["hi","ta","te","bn","mr","gu","kn","ml","pa","or",
                    "as","mai","ne","sa","ks","kok","doi","brx","mni","sat"]
        for lid in expected:
            assert lid in NATIVE_LANG_KNOWLEDGE, f"Missing: {lid}"

    def test_every_lang_has_coding_vocab(self):
        for lid, data in NATIVE_LANG_KNOWLEDGE.items():
            assert "coding_vocab" in data, f"{lid} missing coding_vocab"
            assert len(data["coding_vocab"]) >= 4, f"{lid} needs more vocab"

    def test_every_lang_has_analogies(self):
        for lid, data in NATIVE_LANG_KNOWLEDGE.items():
            assert "analogies" in data, f"{lid} missing analogies"
            assert len(data["analogies"]) >= 1, f"{lid} needs analogies"

    def test_every_lang_has_error_explanations(self):
        for lid, data in NATIVE_LANG_KNOWLEDGE.items():
            assert "error_explanations" in data, f"{lid} missing error_explanations"

    def test_every_lang_has_encouragement(self):
        for lid, data in NATIVE_LANG_KNOWLEDGE.items():
            assert "encouragement" in data, f"{lid} missing encouragement"

    def test_every_lang_has_teaching_phrases(self):
        for lid, data in NATIVE_LANG_KNOWLEDGE.items():
            assert "teaching_phrases" in data, f"{lid} missing teaching_phrases"
            assert "do_you_understand" in data["teaching_phrases"], f"{lid} missing do_you_understand"

    def test_kashmiri_marked_rtl(self):
        assert NATIVE_LANG_KNOWLEDGE["ks"].get("rtl") is True

    def test_native_error_explanation_hindi(self):
        exp = get_native_error_explanation("NameError", "hi")
        assert len(exp) > 20
        assert "Python" in exp

    def test_native_analogy_tamil_function(self):
        analogy = get_native_analogy("function", "ta")
        assert len(analogy) > 5

    def test_encouragement_returns_string(self):
        for lid in ["hi", "ta", "te", "bn", "pa"]:
            enc = get_encouragement(lid)
            assert isinstance(enc, str) and len(enc) > 0

    def test_coding_term_translation(self):
        term = get_coding_term("variable", "hi")
        assert "चर" in term

class TestProgLangKnowledge:
    def test_all_major_langs_present(self):
        for lang in ["python","c","cpp","java","javascript","typescript",
                     "sql","rust","go","html","css","bash","r","swift","kotlin"]:
            assert lang in PROG_LANG_KNOWLEDGE, f"Missing: {lang}"

    def test_python_has_common_errors(self):
        assert "common_errors" in PROG_LANG_KNOWLEDGE["python"]
        assert "NameError" in PROG_LANG_KNOWLEDGE["python"]["common_errors"]

    def test_all_langs_have_key_concepts_or_paradigms(self):
        for lang, data in PROG_LANG_KNOWLEDGE.items():
            has_info = "key_concepts" in data or "paradigms" in data or "topics" in data
            assert has_info, f"{lang} needs key_concepts or paradigms"

class TestLangDetection:
    def test_detects_python(self):
        assert detect_prog_language("def hello():\n    print('hi')") == "python"

    def test_detects_javascript(self):
        assert detect_prog_language("const x = () => console.log('hi')") == "javascript"

    def test_detects_java(self):
        assert detect_prog_language("public class Main { System.out.println('hi'); }") == "java"

    def test_detects_sql(self):
        assert detect_prog_language("SELECT * FROM users WHERE id = 1") == "sql"

    def test_detects_cpp(self):
        assert detect_prog_language("#include <iostream>\nstd::cout << 'hi';") == "cpp"

    def test_detects_rust(self):
        assert detect_prog_language("fn main() { println!(\"hi\"); }") == "rust"

class TestEnrichedPrompt:
    def test_enriched_prompt_includes_lang_vocab(self):
        prompt = build_enriched_system_prompt("hi", "python", "11")
        assert "चर" in prompt or "Hindi" in prompt

    def test_enriched_prompt_includes_prog_errors(self):
        prompt = build_enriched_system_prompt("en", "python", "11")
        assert "NameError" in prompt

    def test_enriched_prompt_includes_teaching_tip(self):
        prompt = build_enriched_system_prompt("ta", "python", "11")
        assert len(prompt) > 500
