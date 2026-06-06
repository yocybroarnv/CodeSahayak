"""
CodeSahayak — Gurujii AI Language Engine (Python mirror of lang_engine_v3.ts)
Used by Flask backend for: NLLB translation routing, MMS-TTS model selection,
STT fallback logic, and response payload building.
"""

from dataclasses import dataclass, field
from typing import Optional

@dataclass
class LangConfig:
    id: str
    english_name: str
    native_name: str
    nllb_code: str
    nllb_fallback: str
    bcp47: str
    web_speech_lang: str
    stt_fallback: str
    mms_tts_model: str
    tts_voice_gender: str   # male / female / neutral
    script: str
    rtl: bool
    font_family: str
    numeral_system: str     # ascii / devanagari / bengali / gujarati / gurmukhi / odia / olchiki / arabic
    error_prefix: str
    success_msg: str
    thinking_msg: str
    gurujii_greeting: str
    offline_msg: str
    paste_warning: str
    run_button: str
    error_line_label: str
    concept_label: str


LANG_MAP: dict[str, LangConfig] = {

    "en": LangConfig(
        id="en", english_name="English", native_name="English",
        nllb_code="eng_Latn", nllb_fallback="eng_Latn",
        bcp47="en-IN", web_speech_lang="en-IN", stt_fallback="en-US",
        mms_tts_model="facebook/mms-tts-eng", tts_voice_gender="female",
        script="Latin", rtl=False, font_family="Inter", numeral_system="ascii",
        error_prefix="Error:", success_msg="Code ran successfully!",
        thinking_msg="Gurujii is thinking...",
        gurujii_greeting="Hello! I am Gurujii. Ask me anything about your code.",
        offline_msg="You are offline. Code execution still works. AI help unavailable.",
        paste_warning="Tip: Try typing the code yourself to learn better!",
        run_button="Run", error_line_label="Line",
        concept_label="Concept",
    ),

    "hi": LangConfig(
        id="hi", english_name="Hindi", native_name="हिंदी",
        nllb_code="hin_Deva", nllb_fallback="hin_Deva",
        bcp47="hi-IN", web_speech_lang="hi-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-hin", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="त्रुटि:", success_msg="कोड सफलतापूर्वक चला!",
        thinking_msg="गुरुजी सोच रहे हैं...",
        gurujii_greeting="नमस्ते! मैं गुरुजी हूँ। अपने कोड के बारे में कुछ भी पूछें।",
        offline_msg="आप ऑफलाइन हैं। कोड चलाना काम करेगा। AI सहायता उपलब्ध नहीं है।",
        paste_warning="सुझाव: खुद टाइप करके सीखें — यही असली ज्ञान है!",
        run_button="चलाएं", error_line_label="पंक्ति", concept_label="अवधारणा",
    ),

    "ta": LangConfig(
        id="ta", english_name="Tamil", native_name="தமிழ்",
        nllb_code="tam_Taml", nllb_fallback="tam_Taml",
        bcp47="ta-IN", web_speech_lang="ta-IN", stt_fallback="ta-IN",
        mms_tts_model="facebook/mms-tts-tam", tts_voice_gender="female",
        script="Tamil", rtl=False, font_family="Noto Sans Tamil",
        numeral_system="ascii",
        error_prefix="பிழை:", success_msg="குறியீடு வெற்றிகரமாக இயங்கியது!",
        thinking_msg="குருஜி யோசிக்கிறார்...",
        gurujii_greeting="வணக்கம்! நான் குருஜி. உங்கள் குறியீடு பற்றி எதுவும் கேளுங்கள்.",
        offline_msg="நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். குறியீடு இயக்கம் செயல்படும்.",
        paste_warning="குறிப்பு: நீங்களே தட்டச்சு செய்தால் நன்றாக கற்றுக்கொள்வீர்கள்!",
        run_button="இயக்கு", error_line_label="வரி", concept_label="கருத்து",
    ),

    "bn": LangConfig(
        id="bn", english_name="Bengali", native_name="বাংলা",
        nllb_code="ben_Beng", nllb_fallback="ben_Beng",
        bcp47="bn-IN", web_speech_lang="bn-IN", stt_fallback="bn-BD",
        mms_tts_model="facebook/mms-tts-ben", tts_voice_gender="female",
        script="Bengali", rtl=False, font_family="Noto Sans Bengali",
        numeral_system="bengali",
        error_prefix="ত্রুটি:", success_msg="কোড সফলভাবে চলল!",
        thinking_msg="গুরুজি ভাবছেন...",
        gurujii_greeting="নমস্কার! আমি গুরুজি। আপনার কোড সম্পর্কে যেকোনো কিছু জিজ্ঞেস করুন।",
        offline_msg="আপনি অফলাইনে আছেন। কোড চলবে।",
        paste_warning="পরামর্শ: নিজে টাইপ করুন — এটাই প্রকৃত শেখার উপায়!",
        run_button="চালান", error_line_label="লাইন", concept_label="ধারণা",
    ),

    "te": LangConfig(
        id="te", english_name="Telugu", native_name="తెలుగు",
        nllb_code="tel_Telu", nllb_fallback="tel_Telu",
        bcp47="te-IN", web_speech_lang="te-IN", stt_fallback="te-IN",
        mms_tts_model="facebook/mms-tts-tel", tts_voice_gender="female",
        script="Telugu", rtl=False, font_family="Noto Sans Telugu",
        numeral_system="ascii",
        error_prefix="లోపం:", success_msg="కోడ్ విజయవంతంగా నడిచింది!",
        thinking_msg="గురుజీ ఆలోచిస్తున్నారు...",
        gurujii_greeting="నమస్కారం! నేను గురుజీ. మీ కోడ్ గురించి ఏదైనా అడగండి.",
        offline_msg="మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కోడ్ రన్ అవుతుంది.",
        paste_warning="సూచన: మీరే టైప్ చేయడం వల్ల బాగా నేర్చుకుంటారు!",
        run_button="రన్ చేయి", error_line_label="లైన్", concept_label="భావన",
    ),

    "mr": LangConfig(
        id="mr", english_name="Marathi", native_name="मराठी",
        nllb_code="mar_Deva", nllb_fallback="hin_Deva",
        bcp47="mr-IN", web_speech_lang="mr-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-mar", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="त्रुटी:", success_msg="कोड यशस्वीरित्या चालला!",
        thinking_msg="गुरुजी विचार करत आहेत...",
        gurujii_greeting="नमस्कार! मी गुरुजी आहे. तुमच्या कोडबद्दल काहीही विचारा.",
        offline_msg="तुम्ही ऑफलाइन आहात. कोड चालेल.",
        paste_warning="सुचना: स्वतः टाइप केल्याने चांगले शिकाल!",
        run_button="चालवा", error_line_label="ओळ", concept_label="संकल्पना",
    ),

    "gu": LangConfig(
        id="gu", english_name="Gujarati", native_name="ગુજરાતી",
        nllb_code="guj_Gujr", nllb_fallback="guj_Gujr",
        bcp47="gu-IN", web_speech_lang="gu-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-guj", tts_voice_gender="female",
        script="Gujarati", rtl=False, font_family="Noto Sans Gujarati",
        numeral_system="gujarati",
        error_prefix="ભૂલ:", success_msg="કોડ સફળતાપૂર્વક ચાલ્યો!",
        thinking_msg="ગુરુજી વિચારી રહ્યા છે...",
        gurujii_greeting="નમસ્તે! હું ગુરુજી છું. તમારા કોડ વિશે કંઈ પણ પૂછો.",
        offline_msg="તમે ઓફલાઇન છો. કોડ ચાલશે.",
        paste_warning="સૂચન: જાતે ટાઇપ કરો — આ જ સાચી શીખ છે!",
        run_button="ચલાવો", error_line_label="લાઇન", concept_label="ખ્યાલ",
    ),

    "kn": LangConfig(
        id="kn", english_name="Kannada", native_name="ಕನ್ನಡ",
        nllb_code="kan_Knda", nllb_fallback="kan_Knda",
        bcp47="kn-IN", web_speech_lang="kn-IN", stt_fallback="kn-IN",
        mms_tts_model="facebook/mms-tts-kan", tts_voice_gender="female",
        script="Kannada", rtl=False, font_family="Noto Sans Kannada",
        numeral_system="ascii",
        error_prefix="ದೋಷ:", success_msg="ಕೋಡ್ ಯಶಸ್ವಿಯಾಗಿ ಚಲಿಸಿತು!",
        thinking_msg="ಗುರುಜಿ ಯೋಚಿಸುತ್ತಿದ್ದಾರೆ...",
        gurujii_greeting="ನಮಸ್ಕಾರ! ನಾನು ಗುರುಜಿ. ನಿಮ್ಮ ಕೋಡ್ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.",
        offline_msg="ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಇದ್ದೀರಿ. ಕೋಡ್ ಚಲಿಸುತ್ತದೆ.",
        paste_warning="ಸಲಹೆ: ನೀವೇ ಟೈಪ್ ಮಾಡಿ — ಇದೇ ನಿಜವಾದ ಕಲಿಕೆ!",
        run_button="ರನ್ ಮಾಡಿ", error_line_label="ಸಾಲು", concept_label="ಪರಿಕಲ್ಪನೆ",
    ),

    "ml": LangConfig(
        id="ml", english_name="Malayalam", native_name="മലയാളം",
        nllb_code="mal_Mlym", nllb_fallback="mal_Mlym",
        bcp47="ml-IN", web_speech_lang="ml-IN", stt_fallback="ml-IN",
        mms_tts_model="facebook/mms-tts-mal", tts_voice_gender="female",
        script="Malayalam", rtl=False, font_family="Noto Sans Malayalam",
        numeral_system="ascii",
        error_prefix="പിശക്:", success_msg="കോഡ് വിജയകരമായി പ്രവർത്തിച്ചു!",
        thinking_msg="ഗുരുജി ചിന്തിക്കുന്നു...",
        gurujii_greeting="നമസ്കാരം! ഞാൻ ഗുരുജിയാണ്. നിങ്ങളുടെ കോഡിനെ കുറിച്ച് എന്തും ചോദിക്കൂ.",
        offline_msg="നിങ്ങൾ ഓഫ്‌ലൈനിലാണ്. കോഡ് പ്രവർത്തിക്കും.",
        paste_warning="നുറുങ്ങ്: സ്വയം ടൈപ്പ് ചെയ്യൂ — അതാണ് ശരിക്കുള്ള പഠനം!",
        run_button="റൺ", error_line_label="വരി", concept_label="ആശയം",
    ),

    "as": LangConfig(
        id="as", english_name="Assamese", native_name="অসমীয়া",
        nllb_code="asm_Beng", nllb_fallback="ben_Beng",
        bcp47="as-IN", web_speech_lang="as-IN", stt_fallback="bn-IN",
        mms_tts_model="facebook/mms-tts-asm", tts_voice_gender="female",
        script="Bengali", rtl=False, font_family="Noto Sans Bengali",
        numeral_system="bengali",
        error_prefix="ত্ৰুটি:", success_msg="কোড সফলতাৰে চলিল!",
        thinking_msg="গুৰুজী চিন্তা কৰিছে...",
        gurujii_greeting="নমস্কাৰ! মই গুৰুজী। আপোনাৰ কোড সম্পৰ্কে যিকোনো কথা সোধক।",
        offline_msg="আপুনি অফলাইনত আছে। কোড চলিব।",
        paste_warning="পৰামৰ্শ: নিজে টাইপ কৰক — এয়াই সঁচা শিক্ষা!",
        run_button="চলাওক", error_line_label="শাৰী", concept_label="ধাৰণা",
    ),

    "brx": LangConfig(
        id="brx", english_name="Bodo", native_name="बड़ो",
        nllb_code="brx_Deva", nllb_fallback="hin_Deva",
        bcp47="brx-IN", web_speech_lang="hi-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-brx", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="गलसि:", success_msg="कोड खामानि चालिल!",
        thinking_msg="गुरुजी गोसोख मोनो...",
        gurujii_greeting="नमस्ते! मोन गुरुजी। गोनां कोड थाखाय जेबो सोंनो।",
        offline_msg="नोंनि नेटवर्क नाङा। कोड चालिब।",
        paste_warning="सुझाव: जोबथाब टाइप खालाम — थाखानि बिजाब एनानो नागिर!",
        run_button="चालाव", error_line_label="लाइन", concept_label="थाखाना",
    ),

    "doi": LangConfig(
        id="doi", english_name="Dogri", native_name="डोगरी",
        nllb_code="dgo_Deva", nllb_fallback="hin_Deva",
        bcp47="doi-IN", web_speech_lang="hi-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-dgo", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="गलती:", success_msg="कोड कामयाब रह्या!",
        thinking_msg="गुरुजी सोच्ढे न...",
        gurujii_greeting="नमस्ते! मैं गुरुजी आं। अपने कोड बारे कुझ भी पुच्छो।",
        offline_msg="तुस ऑफलाइन ओ। कोड चलग।",
        paste_warning="सुझाव: खुद टाइप करो — एही सच्ची सिक्षा ऐ!",
        run_button="चलाओ", error_line_label="लाइन", concept_label="धारणा",
    ),

    "ks": LangConfig(
        id="ks", english_name="Kashmiri", native_name="کٲشُر",
        nllb_code="kas_Arab", nllb_fallback="urd_Arab",
        bcp47="ks-IN", web_speech_lang="ur-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-kas", tts_voice_gender="female",
        script="Arabic (Nastaliq)", rtl=True, font_family="Noto Nastaliq Urdu",
        numeral_system="arabic",
        error_prefix="غَلَطی:", success_msg="کوڈ کامیابی سِتہٕ رۄز!",
        thinking_msg="گُرُجی سوچان چھِ...",
        gurujii_greeting="اَداب! مے گُرُجی چھُس۔ اپنِہِ کوڈ کھَتہٕ کانہہ پَکھ پُچھِو۔",
        offline_msg="تُہی آف لائن چھیو۔ کوڈ چَلِہ۔",
        paste_warning="صَلاح: خُد ٹائِپ کَرِو — یِہی اَصلی سِیکھنہٕ چھٕ!",
        run_button="چَلاوو", error_line_label="لائن", concept_label="مَفہُوم",
    ),

    "kok": LangConfig(
        id="kok", english_name="Konkani", native_name="कोंकणी",
        nllb_code="kok_Deva", nllb_fallback="mar_Deva",
        bcp47="kok-IN", web_speech_lang="mr-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-kok", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="चूक:", success_msg="कोड यशस्वीपणे चलो!",
        thinking_msg="गुरुजी विचार करत आसात...",
        gurujii_greeting="नमस्कार! हांव गुरुजी. तुमच्या कोडाविशीं कितेंय विचारात.",
        offline_msg="तुमी ऑफलाइन आसात. कोड चलतलो.",
        paste_warning="सुचोवणी: खुद टायप करात — तेंच खरें शिकप!",
        run_button="चलयात", error_line_label="रेख", concept_label="संकल्पना",
    ),

    "mai": LangConfig(
        id="mai", english_name="Maithili", native_name="मैथिली",
        nllb_code="mai_Deva", nllb_fallback="hin_Deva",
        bcp47="mai-IN", web_speech_lang="hi-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-mai", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="गड़बड़ी:", success_msg="कोड सफलतापूर्वक चलल!",
        thinking_msg="गुरुजी सोचि रहल छथि...",
        gurujii_greeting="प्रणाम! हम गुरुजी छी। अपन कोड बारे किछु पूछू।",
        offline_msg="अहाँ ऑफलाइन छी। कोड चलत।",
        paste_warning="सुझाव: खुद टाइप करू — यएह सच्चा ज्ञान अछि!",
        run_button="चलाउ", error_line_label="पाँती", concept_label="अवधारणा",
    ),

    "mni": LangConfig(
        id="mni", english_name="Meitei (Manipuri)", native_name="মৈতৈলোন্",
        nllb_code="mni_Beng", nllb_fallback="ben_Beng",
        bcp47="mni-IN", web_speech_lang="bn-IN", stt_fallback="en-IN",
        mms_tts_model="facebook/mms-tts-mni", tts_voice_gender="female",
        script="Meitei Mayek", rtl=False, font_family="Noto Sans Meetei Mayek",
        numeral_system="ascii",
        error_prefix="ꯑꯁꯨꯝꯕ:", success_msg="ꯀꯣꯗ ꯍꯥꯢꯗꯧꯅ ꯆꯠꯄꯤ!",
        thinking_msg="ꯒꯨꯔꯨꯖꯤ ꯃꯑꯣꯡ ꯇꯥꯟꯅꯤ...",
        gurujii_greeting="ꯍꯥꯢꯐꯕ! ꯑꯩ ꯒꯨꯔꯨꯖꯤ ꯅꯤ꯫",
        offline_msg="ꯅꯍꯥꯛ ꯑꯣꯐ꯭ꯂꯥꯏꯟꯗ ꯂꯩꯔꯤ꯫",
        paste_warning="ꯁꯨꯕꯦꯇ: ꯅꯍꯥꯛꯅꯦ ꯇꯥꯏꯞ ꯇꯧꯕꯤꯌꯨ!",
        run_button="ꯆꯠꯂꯕꯤꯌꯨ", error_line_label="ꯂꯥꯏꯟ", concept_label="ꯊꯕꯛ",
    ),

    "ne": LangConfig(
        id="ne", english_name="Nepali", native_name="नेपाली",
        nllb_code="npi_Deva", nllb_fallback="hin_Deva",
        bcp47="ne-IN", web_speech_lang="ne-NP", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-npi", tts_voice_gender="female",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="त्रुटि:", success_msg="कोड सफलतापूर्वक चल्यो!",
        thinking_msg="गुरुजी सोच्दैछन्...",
        gurujii_greeting="नमस्ते! म गुरुजी हुँ। आफ्नो कोडबारे केही पनि सोध्नुस्।",
        offline_msg="तपाईं अफलाइन हुनुहुन्छ। कोड चल्नेछ।",
        paste_warning="सुझाव: आफैं टाइप गर्नुस् — यही सच्चो सिकाइ हो!",
        run_button="चलाउनुस्", error_line_label="लाइन", concept_label="अवधारणा",
    ),

    "or": LangConfig(
        id="or", english_name="Odia", native_name="ଓଡ଼ିଆ",
        nllb_code="ory_Orya", nllb_fallback="ory_Orya",
        bcp47="or-IN", web_speech_lang="or-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-ory", tts_voice_gender="female",
        script="Odia", rtl=False, font_family="Noto Sans Oriya",
        numeral_system="odia",
        error_prefix="ତ୍ରୁଟି:", success_msg="କୋଡ୍ ସଫଳଭାବରେ ଚାଲିଲା!",
        thinking_msg="ଗୁରୁଜୀ ଭାବୁଛନ୍ତି...",
        gurujii_greeting="ନମସ୍କାର! ମୁଁ ଗୁରୁଜୀ। ଆପଣଙ୍କ କୋଡ୍ ବିଷୟରେ ଯାହା ହେଉ ପଚାରନ୍ତୁ।",
        offline_msg="ଆପଣ ଅଫଲାଇନ୍ ଅଛନ୍ତି। କୋଡ୍ ଚଲିବ।",
        paste_warning="ପରାମର୍ଶ: ନିଜେ ଟାଇପ୍ କରନ୍ତୁ — ଏହା ହିଁ ସଠିକ୍ ଶିକ୍ଷା!",
        run_button="ଚଲାନ୍ତୁ", error_line_label="ରେଖା", concept_label="ଧାରଣା",
    ),

    "pa": LangConfig(
        id="pa", english_name="Punjabi", native_name="ਪੰਜਾਬੀ",
        nllb_code="pan_Guru", nllb_fallback="pan_Guru",
        bcp47="pa-IN", web_speech_lang="pa-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-pan", tts_voice_gender="female",
        script="Gurmukhi", rtl=False, font_family="Noto Sans Gurmukhi",
        numeral_system="gurmukhi",
        error_prefix="ਗਲਤੀ:", success_msg="ਕੋਡ ਸਫਲਤਾਪੂਰਵਕ ਚੱਲਿਆ!",
        thinking_msg="ਗੁਰੂਜੀ ਸੋਚ ਰਹੇ ਹਨ...",
        gurujii_greeting="ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਗੁਰੂਜੀ ਹਾਂ। ਆਪਣੇ ਕੋਡ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।",
        offline_msg="ਤੁਸੀਂ ਆਫਲਾਈਨ ਹੋ। ਕੋਡ ਚੱਲੇਗਾ।",
        paste_warning="ਸੁਝਾਅ: ਖੁਦ ਟਾਈਪ ਕਰੋ — ਇਹੀ ਸੱਚੀ ਸਿੱਖਿਆ ਹੈ!",
        run_button="ਚਲਾਓ", error_line_label="ਲਾਈਨ", concept_label="ਸੰਕਲਪ",
    ),

    "sa": LangConfig(
        id="sa", english_name="Sanskrit", native_name="संस्कृतम्",
        nllb_code="san_Deva", nllb_fallback="hin_Deva",
        bcp47="sa-IN", web_speech_lang="sa-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-san", tts_voice_gender="male",
        script="Devanagari", rtl=False, font_family="Noto Sans Devanagari",
        numeral_system="devanagari",
        error_prefix="दोषः:", success_msg="कोडः सम्यक् प्रवर्तितः!",
        thinking_msg="गुरुजीः चिन्तयति...",
        gurujii_greeting="नमस्ते! अहं गुरुजीः अस्मि। स्वकीयस्य कोडस्य विषये किमपि पृच्छतु।",
        offline_msg="भवान् ऑफलाइन् अस्ति। कोडः चलिष्यति।",
        paste_warning="सुझावः: स्वयं टाइप करोतु — एतत् एव सत्यं ज्ञानम् अस्ति!",
        run_button="प्रवर्तयतु", error_line_label="पंक्तिः", concept_label="अवधारणा",
    ),

    "sat": LangConfig(
        id="sat", english_name="Santali", native_name="ᱥᱟᱱᱛᱟᱲᱤ",
        nllb_code="sat_Olck", nllb_fallback="ben_Beng",
        bcp47="sat-IN", web_speech_lang="en-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-sat", tts_voice_gender="female",
        script="Ol Chiki", rtl=False, font_family="Noto Sans Ol Chiki",
        numeral_system="olchiki",
        error_prefix="ᱜᱚᱞᱚᱴ:", success_msg="ᱠᱳᱰ ᱵᱟᱲᱛᱤ ᱪᱟᱞᱟᱜ!",
        thinking_msg="ᱜᱩᱨᱩᱡᱤ ᱪᱤᱱᱛᱟ ᱢᱮᱱᱟᱜ...",
        gurujii_greeting="ᱡᱚᱦᱟᱨ! ᱑ᱤ ᱜᱩᱨᱩᱡᱤ ᱢᱮᱱᱟᱜ᱾",
        offline_msg="ᱟᱢ ᱚᱯᱷᱞᱟᱭᱤᱱ ᱫᱚ ᱢᱮᱱᱟᱜ᱾",
        paste_warning="ᱥᱩᱱᱩᱢ: ᱟᱢᱮ ᱴᱟᱭᱯ ᱮᱢ!",
        run_button="ᱪᱟᱞᱟᱣ", error_line_label="ᱞᱟᱭᱤᱱ", concept_label="ᱵᱷᱟᱵᱱᱟ",
    ),

    "sd": LangConfig(
        id="sd", english_name="Sindhi", native_name="سنڌي",
        nllb_code="snd_Arab", nllb_fallback="urd_Arab",
        bcp47="sd-IN", web_speech_lang="sd-IN", stt_fallback="ur-IN",
        mms_tts_model="facebook/mms-tts-snd", tts_voice_gender="female",
        script="Arabic (Nastaliq)", rtl=True, font_family="Noto Nastaliq Urdu",
        numeral_system="arabic",
        error_prefix="غلطي:", success_msg="ڪوڊ ڪامياب ٿيو!",
        thinking_msg="گرو جي سوچي رهيا آهن...",
        gurujii_greeting="هيلو! مان گروجي آهيان. پنهنجي ڪوڊ بابت ڪجهه به پڇو.",
        offline_msg="توهان آف لائن آهيو. ڪوڊ هلائڻ اڃา تائين ڪم ڪندو.",
        paste_warning="نصيحت: بهتر سکڻ لاءِ پنهنجو ڪوڊ پاڻ ٽائپ ڪرڻ جي ڪوشش ڪريو!",
        run_button="هلايو", error_line_label="لائن", concept_label="تصور",
    ),

    "ur": LangConfig(
        id="ur", english_name="Urdu", native_name="اردو",
        nllb_code="urd_Arab", nllb_fallback="urd_Arab",
        bcp47="ur-IN", web_speech_lang="ur-IN", stt_fallback="hi-IN",
        mms_tts_model="facebook/mms-tts-urd", tts_voice_gender="female",
        script="Arabic (Nastaliq)", rtl=True, font_family="Noto Nastaliq Urdu",
        numeral_system="arabic",
        error_prefix="خطا:", success_msg="کوڈ کامیابی سے چلا!",
        thinking_msg="گروجی سوچ رہے ہیں...",
        gurujii_greeting="ہیلو! میں گروجی ہوں۔ مجھ سے اپنے کوڈ کے بارے میں کچھ بھی پوچھیں۔",
        offline_msg="آپ آف لائن ہیں۔ کوڈ چلنا اب بھی کام کرے گا۔",
        paste_warning="مشورہ: بہتر سیکھنے کے لیے خود کوڈ ٹائپ کرنے کی کوشش کریں!",
        run_button="چلائیں", error_line_label="لائن", concept_label="تصور",
    ),
}

# ── HELPERS ────────────────────────────────────────────────────

def get_lang(lang_id: str) -> LangConfig:
    """Returns config or falls back to English. Never raises."""
    return LANG_MAP.get(lang_id, LANG_MAP["en"])

def get_mms_model(lang_id: str) -> str:
    return get_lang(lang_id).mms_tts_model

def get_nllb_code(lang_id: str, use_fallback: bool = False) -> str:
    lang = get_lang(lang_id)
    return lang.nllb_fallback if use_fallback else lang.nllb_code

def get_stt_lang(lang_id: str) -> str:
    return get_lang(lang_id).web_speech_lang

def is_rtl(lang_id: str) -> bool:
    return get_lang(lang_id).rtl

def build_translation_payload(text: str, target_id: str, source_id: str = "en") -> dict:
    src = get_lang(source_id)
    tgt = get_lang(target_id)
    return {
        "text": text,
        "src_lang": src.nllb_code,
        "tgt_lang": tgt.nllb_code,
        "src_lang_fallback": src.nllb_fallback,
        "tgt_lang_fallback": tgt.nllb_fallback,
    }

def get_ui_strings(lang_id: str) -> dict:
    """Returns all UI strings for a language — used by Gurujii response builder."""
    lang = get_lang(lang_id)
    return {
        "error_prefix": lang.error_prefix,
        "success_msg": lang.success_msg,
        "thinking_msg": lang.thinking_msg,
        "greeting": lang.gurujii_greeting,
        "offline_msg": lang.offline_msg,
        "paste_warning": lang.paste_warning,
        "run_button": lang.run_button,
        "error_line_label": lang.error_line_label,
        "concept_label": lang.concept_label,
    }

RTL_LANGS = [k for k, v in LANG_MAP.items() if v.rtl]
ALL_LANG_IDS = list(LANG_MAP.keys())
DEVANAGARI_LANGS = [k for k, v in LANG_MAP.items() if v.script == "Devanagari"]
