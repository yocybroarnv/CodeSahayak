# response_cache.py — In-memory response caching for Gurujii
# From fixes_bundle2.py FIX18
# Prevents repeated LLM calls for same error + language combination

import hashlib
import time

_response_cache: dict = {}
CACHE_TTL = 3600    # 1 hour
MAX_RESPONSES = 5000

def _cache_key(error_type: str, error_msg: str, lang_id: str,
               code_snippet: str, hint_level: int) -> str:
    raw = f"{error_type}:{lang_id}:{hint_level}:{error_msg[:80]}:{code_snippet[:100]}"
    return hashlib.md5(raw.encode()).hexdigest()

def get_cached_response(error_type: str, error_msg: str, lang_id: str,
                         code_snippet: str, hint_level: int) -> dict | None:
    key = _cache_key(error_type, error_msg, lang_id, code_snippet, hint_level)
    entry = _response_cache.get(key)
    if entry and (time.time() - entry["ts"]) < CACHE_TTL:
        result = dict(entry)
        result["cache_hit"] = True
        return result
    return None

def cache_response(error_type: str, error_msg: str, lang_id: str,
                   code_snippet: str, hint_level: int, response: dict) -> None:
    if len(_response_cache) >= MAX_RESPONSES:
        # Evict oldest 10%
        oldest = sorted(_response_cache.items(), key=lambda x: x[1]["ts"])
        for k, _ in oldest[:MAX_RESPONSES // 10]:
            del _response_cache[k]
    key = _cache_key(error_type, error_msg, lang_id, code_snippet, hint_level)
    _response_cache[key] = {**response, "ts": time.time(), "cache_hit": False}

def get_cache_stats() -> dict:
    """Returns cache statistics for monitoring."""
    now = time.time()
    valid = sum(1 for v in _response_cache.values() if now - v["ts"] < CACHE_TTL)
    return {
        "total_entries": len(_response_cache),
        "valid_entries": valid,
        "ttl_seconds": CACHE_TTL,
        "max_entries": MAX_RESPONSES,
    }
