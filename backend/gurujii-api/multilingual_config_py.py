# -*- coding: utf-8 -*-
"""
Python Port of Multilingual Configuration
Maps BCP47/language IDs to MMS-TTS models.
"""

MMS_TTS_MODELS = {
    "hi": "facebook/mms-tts-hin",
    "ta": "facebook/mms-tts-tam",
    "te": "facebook/mms-tts-tel",
    "kn": "facebook/mms-tts-kan",
    "ml": "facebook/mms-tts-mal",
    "bn": "facebook/mms-tts-ben",
    "mr": "facebook/mms-tts-mar",
    "gu": "facebook/mms-tts-guj",
    "pa": "facebook/mms-tts-pan",
    "or": "facebook/mms-tts-ory",
    "ur": "facebook/mms-tts-urd",
    "en": "facebook/mms-tts-eng",
    "as": "facebook/mms-tts-asm",
    "mai": "facebook/mms-tts-mai",
    "bho": "facebook/mms-tts-bho",
    "sat": "facebook/mms-tts-sat",
    "mni": "facebook/mms-tts-mni",
    "kok": "facebook/mms-tts-kok",
    "brx": "facebook/mms-tts-brx",
    "doi": "facebook/mms-tts-dgo",
    "sd": "facebook/mms-tts-snd",
    "ks": "facebook/mms-tts-kas",
    "ne": "facebook/mms-tts-npi",
    "ar": "facebook/mms-tts-arb",
    "fr": "facebook/mms-tts-fra",
    "zh": "facebook/mms-tts-cmn",
    "es": "facebook/mms-tts-spa"
}

def get_mms_model(lang_id: str) -> str:
    """Returns the correct MMS-TTS model ID for the given language identifier"""
    return MMS_TTS_MODELS.get(lang_id, "facebook/mms-tts-hin")
