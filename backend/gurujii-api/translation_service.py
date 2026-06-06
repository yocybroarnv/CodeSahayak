# translation_service.py — NLLB-200 singleton with caching
# From fixes_bundle1.py FIX2

import os
import threading
from typing import Optional

_nllb_model = None
_nllb_tokenizer = None
_nllb_lock = threading.Lock()

def get_nllb():
    """Singleton loader — loads model once at startup, thread-safe."""
    global _nllb_model, _nllb_tokenizer
    if _nllb_model is not None:
        return _nllb_model, _nllb_tokenizer
    with _nllb_lock:
        if _nllb_model is not None:   # double-check after lock
            return _nllb_model, _nllb_tokenizer
        try:
            from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
            model_name = os.getenv("NLLB_MODEL", "facebook/nllb-200-distilled-600M")
            cache_dir  = os.getenv("MODEL_CACHE_DIR", "./models")
            print(f"[NLLB] Loading {model_name} — once only...")
            _nllb_tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir=cache_dir)
            _nllb_model = AutoModelForSeq2SeqLM.from_pretrained(model_name, cache_dir=cache_dir)
            _nllb_model.eval()
            print("[NLLB] Loaded ✓")
        except Exception as e:
            print(f"[NLLB] Warning: Could not load model: {e}")
            print("[NLLB] Running in mock mode — translations will be passthrough")
            _nllb_model = None
            _nllb_tokenizer = None
    return _nllb_model, _nllb_tokenizer

# Response cache — same text + target lang = cached result
_translation_cache: dict = {}
MAX_CACHE = 2000

def translate_cached(text: str, src_lang: str, tgt_lang: str) -> str:
    """Translate text with caching. Falls back to passthrough if model unavailable."""
    if src_lang == tgt_lang or not text.strip():
        return text

    key = f"{src_lang}:{tgt_lang}:{text[:100]}"
    if key in _translation_cache:
        return _translation_cache[key]

    model, tokenizer = get_nllb()
    if model is None or tokenizer is None:
        # Model not available — return original text with note
        return text

    try:
        inputs = tokenizer(text, return_tensors="pt",
                           src_lang=src_lang, truncation=True, max_length=512)
        
        # Get the BOS token for the target language
        if tgt_lang in tokenizer.lang_code_to_id:
            forced_bos = tokenizer.lang_code_to_id[tgt_lang]
        else:
            # Language code not found — return original
            return text
            
        out = model.generate(**inputs, forced_bos_token_id=forced_bos,
                             max_new_tokens=256, num_beams=4)
        result = tokenizer.batch_decode(out, skip_special_tokens=True)[0]

        if len(_translation_cache) >= MAX_CACHE:
            # Evict oldest 10%
            keys = list(_translation_cache.keys())
            for k in keys[:MAX_CACHE // 10]:
                del _translation_cache[k]
        _translation_cache[key] = result
        return result
    except Exception as e:
        print(f"[NLLB] Translation error: {e}")
        return text  # Passthrough on error
