# lang_detect.py — Language detection from message text
# From fixes_bundle2.py FIX8
# Detects: script-based languages, Hinglish, Marathi vs Hindi, etc.

import re

# Script Unicode ranges
DEVANAGARI = (0x0900, 0x097F)
BENGALI     = (0x0980, 0x09FF)
TAMIL       = (0x0B80, 0x0BFF)
TELUGU      = (0x0C00, 0x0C7F)
KANNADA     = (0x0C80, 0x0CFF)
MALAYALAM   = (0x0D00, 0x0D7F)
GUJARATI    = (0x0A80, 0x0AFF)
GURMUKHI    = (0x0A00, 0x0A7F)
ODIA        = (0x0B00, 0x0B7F)
OLCHIKI     = (0x1C50, 0x1C7F)
MEETEI      = (0xAAE0, 0xAAF6)
ARABIC      = (0x0600, 0x06FF)

SCRIPT_LANG_MAP = {
    "devanagari": ["hi", "mr", "mai", "ne", "sa", "brx", "doi", "kok"],
    "bengali":    ["bn", "as", "mni"],
    "tamil":      ["ta"],
    "telugu":     ["te"],
    "kannada":    ["kn"],
    "malayalam":  ["ml"],
    "gujarati":   ["gu"],
    "gurmukhi":   ["pa"],
    "odia":       ["or"],
    "olchiki":    ["sat"],
    "meetei":     ["mni"],
    "arabic":     ["ur", "ks", "sd"],
}

def detect_script(text: str) -> str:
    """Returns dominant script name."""
    counts = {
        "devanagari": 0, "bengali": 0, "tamil": 0, "telugu": 0,
        "kannada": 0, "malayalam": 0, "gujarati": 0, "gurmukhi": 0,
        "odia": 0, "olchiki": 0, "meetei": 0, "arabic": 0, "latin": 0,
    }
    ranges = {
        "devanagari": DEVANAGARI, "bengali": BENGALI, "tamil": TAMIL,
        "telugu": TELUGU, "kannada": KANNADA, "malayalam": MALAYALAM,
        "gujarati": GUJARATI, "gurmukhi": GURMUKHI, "odia": ODIA,
        "olchiki": OLCHIKI, "meetei": MEETEI, "arabic": ARABIC,
    }
    for ch in text:
        cp = ord(ch)
        matched = False
        for script, (lo, hi) in ranges.items():
            if lo <= cp <= hi:
                counts[script] += 1
                matched = True
                break
        if not matched and ch.isalpha():
            counts["latin"] += 1

    if max(counts.values()) == 0:
        return "latin"
    return max(counts, key=counts.get)

def detect_lang_from_message(text: str, fallback: str = "en") -> str:
    """
    Detects language from message text.
    Handles Hinglish (mixed Latin+Devanagari) → returns "hi"
    """
    if not text or len(text.strip()) < 3:
        return fallback

    script = detect_script(text)
    if script == "latin":
        # Check for Hinglish patterns: Latin words with Hindi context
        hinglish_markers = ["kya", "kyu", "nahi", "chal", "kar", "mera",
                            "mujhe", "hai", "hota", "kaise", "kyun", "aur",
                            "bhi", "agar", "toh", "yeh", "woh", "mere"]
        lower = text.lower()
        if any(m in lower.split() for m in hinglish_markers):
            return "hi"
        return fallback

    if script == "devanagari":
        # Distinguish Hindi/Marathi/Maithili by common words
        marathi_markers = ["आहे", "आहेत", "केले", "करा", "नाही", "आणि", "मला", "तुम्ही"]
        if any(m in text for m in marathi_markers):
            return "mr"
        maithili_markers = ["अछि", "छथि", "करू", "छी", "अहाँ"]
        if any(m in text for m in maithili_markers):
            return "mai"
        return "hi"  # default Devanagari → Hindi

    # All other scripts have unique language mapping
    first_lang = SCRIPT_LANG_MAP.get(script, ["en"])[0]
    return first_lang
