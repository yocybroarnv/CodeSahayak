"""
Gurujii v4.1 — Final Wiring + English Native + All Gaps Closed
Connects gurujii_v4.py + gurujii_languages.py into one working system.
Drop this into gurujii-api/ and import in app.py.
"""

from gurujii_v4 import (
    gurujii_respond, get_session, GURUJII_SYSTEM_PROMPT,
    classify_intent, analyze_code, score_response,
    NATIVE_LANG_KNOWLEDGE as V4_LANG  # extend with our new data
)
from gurujii_languages import (
    NATIVE_LANG_KNOWLEDGE, PROG_LANG_KNOWLEDGE,
    get_native_error_explanation, get_native_analogy,
    get_encouragement, get_coding_term, get_teaching_phrase,
    detect_prog_language, build_enriched_system_prompt,
)

# ── ADD ENGLISH to NATIVE_LANG_KNOWLEDGE (was missing) ────────

NATIVE_LANG_KNOWLEDGE["en"] = {
    "name": "English", "script": "Latin", "family": "Germanic",
    "grammar_notes": "SVO word order. No grammatical gender. Articles (a/an/the).",
    "coding_vocab": {
        "variable": "variable", "function": "function", "loop": "loop",
        "condition": "condition", "class": "class", "object": "object",
        "error": "error", "list": "list", "dictionary": "dictionary",
        "string": "string", "integer": "integer", "boolean": "boolean (True/False)",
        "recursion": "recursion", "algorithm": "algorithm",
    },
    "analogies": {
        "variable": "A variable is like a labelled box — you can put anything inside and change it",
        "function": "A function is like a recipe — write it once, use it many times",
        "loop": "A loop is like doing laps in a swimming pool — same path, repeated",
        "recursion": "Recursion is like standing between two mirrors — you see yourself inside yourself",
        "stack": "A stack is like a pile of plates — last in, first out",
        "queue": "A queue is like a line at a ticket counter — first in, first out",
        "class": "A class is like a cookie cutter — same shape every time, different dough",
        "list": "A list is like a train — carriages linked one after another",
        "dictionary": "A dictionary is like a real dictionary — look up a word, get its meaning",
    },
    "encouragement": [
        "Excellent!", "Well done!", "Brilliant!", "Spot on!",
        "That's exactly right!", "You're getting it!", "Keep going!",
        "Perfect thinking!", "Great work!", "Nailed it!",
    ],
    "gentle_correction": [
        "Almost there — think about",
        "Good attempt! Just one thing —",
        "Close! Consider this —",
    ],
    "error_explanations": {
        "NameError": "Python can't find the variable you used. It's like calling someone who isn't in your contacts. Define the variable before using it.",
        "TypeError": "You're mixing incompatible types — like adding a number to a word. Check what types you're working with.",
        "ZeroDivisionError": "You can't divide by zero — not in maths, not in Python either!",
        "IndexError": "You're trying to access a position in the list that doesn't exist. Lists start at index 0.",
        "KeyError": "That key doesn't exist in your dictionary. Check the key name carefully.",
        "SyntaxError": "Python can't read your code. Usually a missing colon (:), bracket, or wrong indentation.",
        "IndentationError": "Python uses indentation (spaces) for structure. Use exactly 4 spaces per level.",
        "AttributeError": "That object doesn't have that method or property. Check the type and available methods.",
        "RecursionError": "Your function keeps calling itself forever. Add or fix the base case.",
        "ValueError": "The value you passed is the right type but wrong value for that operation.",
        "UnboundLocalError": "Variable is referenced before it's assigned inside this scope.",
        "ImportError": "The module wasn't found. Check the name and whether it's installed.",
        "FileNotFoundError": "The file path is wrong or the file doesn't exist.",
        "StopIteration": "The iterator ran out of items. You've gone past the end.",
    },
    "teaching_phrases": {
        "what_do_you_think": "What do you think this line is doing?",
        "try_it": "Try running it yourself and tell me what happens.",
        "good_question": "Great question!",
        "think_about": "Think about this —",
        "do_you_understand": "Does that make sense?",
        "lets_try": "Let's work through this together.",
        "modify_and_see": "Try changing {} to {} and see what happens.",
        "what_happens_if": "What do you think happens if we remove this line?",
    },
}


# ══════════════════════════════════════════════════════════════
# ENRICHED GURUJII HANDLER
# Overrides gurujii_v4.gurujii_respond with richer context
# ══════════════════════════════════════════════════════════════

def gurujii_respond_enriched(
    student_id: str,
    student_name: str,
    message: str,
    code: str,
    error_type: str,
    error_msg: str,
    error_line: int,
    lang_id: str,
    grade_level: str,
    tinyllama_fn,
    claude_fn=None,
) -> dict:
    """
    Drop-in replacement for gurujii_v4.gurujii_respond.
    Adds:
    - Native language error explanations pre-injected into prompt
    - Programming language auto-detection
    - Native analogy injection
    - Enriched system prompt with vocab + teaching phrases
    """
    # Auto-detect programming language from code
    prog_lang = detect_prog_language(code) if code.strip() else "python"

    # Get native language context
    native_error_exp = get_native_error_explanation(error_type, lang_id)
    native_analogy = ""
    if error_type:
        from gurujii_v4 import ERROR_TO_CONCEPT
        concept = ERROR_TO_CONCEPT.get(error_type, ("general",))[0]
        native_analogy = get_native_analogy(concept, lang_id)

    encouragement = get_encouragement(lang_id)
    what_do_you_think = get_teaching_phrase("what_do_you_think", lang_id)
    do_you_understand = get_teaching_phrase("do_you_understand", lang_id)

    # Build enriched system prompt
    enriched_system = build_enriched_system_prompt(lang_id, prog_lang, grade_level)

    # Inject native context into message sent to LLM
    enriched_message = message
    if native_error_exp:
        enriched_message += f"\n\n[NATIVE_CONTEXT: Use this explanation as base: {native_error_exp}]"
    if native_analogy:
        enriched_message += f"\n[USE_ANALOGY: {native_analogy}]"
    if encouragement:
        enriched_message += f"\n[START_WITH_ENCOURAGEMENT: {encouragement}]"
    if what_do_you_think:
        enriched_message += f"\n[CLOSE_WITH: {what_do_you_think}]"

    # Temporarily patch the system prompt in gurujii_v4
    import gurujii_v4
    original_system = gurujii_v4.GURUJII_SYSTEM_PROMPT
    gurujii_v4.GURUJII_SYSTEM_PROMPT = enriched_system

    result = gurujii_respond(
        student_id=student_id,
        student_name=student_name,
        message=enriched_message,
        code=code,
        error_type=error_type,
        error_msg=error_msg,
        error_line=error_line,
        lang_id=lang_id,
        grade_level=grade_level,
        tinyllama_fn=tinyllama_fn,
        claude_fn=claude_fn,
    )

    # Restore
    gurujii_v4.GURUJII_SYSTEM_PROMPT = original_system

    # Add enrichment metadata to response
    result["prog_lang_detected"] = prog_lang
    result["native_analogy_used"] = bool(native_analogy)
    result["prog_lang_context"] = {
        "common_error": PROG_LANG_KNOWLEDGE.get(prog_lang, {})
                                            .get("common_errors", {})
                                            .get(error_type, ""),
        "teaching_tip": PROG_LANG_KNOWLEDGE.get(prog_lang, {})
                                            .get("teaching_tips", ""),
    }
    return result


# ══════════════════════════════════════════════════════════════
# FLASK ROUTES — complete drop-in for app.py
# ══════════════════════════════════════════════════════════════

FLASK_ROUTES = '''
# Add to gurujii-api/app.py

from flask import Flask, request, jsonify, g
from gurujii_wiring import gurujii_respond_enriched
from lang_engine_py import get_lang, get_ui_strings
from tts_service import generate_voice_chunked
from pathlib import Path
import jwt, os

app = Flask(__name__)
JWT_SECRET = os.environ["JWT_SECRET"]
AUDIO_DIR = Path("./static/audio")
AUDIO_DIR.mkdir(exist_ok=True)

# ── AUTH MIDDLEWARE ────────────────────────────────────────────
@app.before_request
def authenticate():
    if request.path in ["/api/gurujii/health"]:
        return
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        g.user = payload
    except Exception:
        return jsonify({"error": "Unauthorized"}), 401

# ── ANALYZE + EXPLAIN ─────────────────────────────────────────
@app.route("/api/gurujii/analyze", methods=["POST"])
def analyze():
    d = request.get_json()
    result = gurujii_respond_enriched(
        student_id   = g.user["userId"],
        student_name = d.get("studentName", "Student"),
        message      = d.get("message", ""),
        code         = d.get("code", ""),
        error_type   = d.get("errorType", ""),
        error_msg    = d.get("errorMsg", ""),
        error_line   = d.get("errorLine", 0),
        lang_id      = d.get("language", "en"),
        grade_level  = d.get("gradeLevel", "11"),
        tinyllama_fn = tinyllama_generate,
        claude_fn    = anthropic_client.messages.create
                       if os.getenv("USE_CLAUDE_FALLBACK") == "true" else None,
    )
    # Strip teacher-only fields from student response
    if g.user.get("role") not in ("TEACHER", "ADMIN"):
        result.pop("hint_level", None)
    return jsonify(result)

# ── TTS ENDPOINT ──────────────────────────────────────────────
@app.route("/api/gurujii/tts", methods=["POST"])
def tts():
    d = request.get_json()
    lang_id  = d.get("lang", "en")
    text     = d.get("text", "")[:500]  # CS-008: hard cap
    lang     = get_lang(lang_id)
    paths    = generate_voice_chunked(text, lang_id, lang.mms_tts_model, AUDIO_DIR)
    return jsonify({"audioPaths": paths, "chunkCount": len(paths)})

# ── TRANSLATE ─────────────────────────────────────────────────
@app.route("/api/gurujii/translate", methods=["POST"])
def translate():
    d = request.get_json()
    from translation_service import translate_with_fallback
    from lang_engine_py import LANG_MAP
    result = translate_with_fallback(
        text         = d.get("text", ""),
        target_lang_id = d.get("tgt_lang_id", "en"),
        nllb_model   = nllb_model,
        lang_map     = LANG_MAP,
    )
    return jsonify({"translated_text": result})

# ── HEALTH ────────────────────────────────────────────────────
@app.route("/api/gurujii/health")
def health():
    return jsonify({"status": "healthy", "models": {
        "tinyllama": "loaded",
        "nllb": "loaded",
        "tts": "loaded",
    }})
'''


# ══════════════════════════════════════════════════════════════
# COMPLETE PROG LANG ADDITIONS (fills gaps in gurujii_languages.py)
# ══════════════════════════════════════════════════════════════

PROG_LANG_KNOWLEDGE.update({

    "php": {
        "versions": ["PHP 7.4", "PHP 8.0", "PHP 8.1", "PHP 8.2", "PHP 8.3"],
        "paradigms": ["procedural", "OOP", "scripting"],
        "key_concepts": ["superglobals", "namespaces", "traits", "generators",
                         "type declarations", "match expressions", "fibers"],
        "common_errors": {
            "undefined variable": "Variables must be declared before use",
            "call to undefined function": "Function not defined or not imported",
            "cannot redeclare": "Function/class defined twice — check includes",
        },
        "teaching_tips": "PHP is server-side web scripting. echo = print to browser.",
        "ecosystem": ["Laravel", "Symfony", "WordPress", "Composer"],
    },

    "ruby": {
        "versions": ["Ruby 2.7", "Ruby 3.0", "Ruby 3.1", "Ruby 3.2", "Ruby 3.3"],
        "paradigms": ["OOP", "functional", "scripting", "metaprogramming"],
        "key_concepts": ["blocks", "procs", "lambdas", "mixins", "modules",
                         "method_missing", "open classes", "symbol"],
        "common_errors": {
            "NoMethodError": "Method doesn't exist on that object",
            "NameError": "Variable or constant not defined",
            "TypeError": "Wrong type for operation",
        },
        "teaching_tips": "Everything in Ruby is an object — even nil and true.",
        "ecosystem": ["Ruby on Rails", "RSpec", "Bundler", "Sinatra"],
    },

    "csharp": {
        "versions": ["C# 8", "C# 9", "C# 10", "C# 11", "C# 12"],
        "paradigms": ["OOP", "functional", "async"],
        "key_concepts": ["CLR", "LINQ", "async/await", "delegates", "events",
                         "generics", "nullable types", "records", "pattern matching"],
        "common_errors": {
            "NullReferenceException": "Null object access — use null-conditional (?.) operator",
            "InvalidCastException": "Wrong type cast — use 'as' operator and check null",
            "StackOverflowException": "Infinite recursion",
        },
        "teaching_tips": "C# is Java-like but more expressive. LINQ is powerful — learn it.",
        "ecosystem": [".NET", "ASP.NET Core", "Entity Framework", "Unity (games)"],
    },

    "matlab": {
        "paradigms": ["matrix-oriented", "procedural", "OOP"],
        "key_concepts": ["matrices", "element-wise operations", "vectorization",
                         "toolboxes", "simulink", "plotting"],
        "common_errors": {
            "undefined variable": "Variable not yet assigned in workspace",
            "matrix dimension mismatch": "Matrix dimensions must agree for operations",
            "index out of range": "MATLAB arrays start at 1, not 0",
        },
        "teaching_tips": "MATLAB indices start at 1! Everything is a matrix by default.",
    },

    "lua": {
        "key_concepts": ["tables (only data structure)", "metatables", "coroutines",
                         "closures", "multiple return values", "1-based indexing"],
        "common_errors": {
            "attempt to index nil": "Variable is nil — not initialised",
            "stack overflow": "Infinite recursion",
        },
        "teaching_tips": "Lua is used in game modding (Roblox, World of Warcraft).",
    },

    "perl": {
        "key_concepts": ["regular expressions", "context sensitivity", "sigils",
                         "references", "modules (CPAN)"],
        "teaching_tips": "Perl is best for text processing. Famous for regex power.",
    },

    "cobol": {
        "key_concepts": ["IDENTIFICATION DIVISION", "DATA DIVISION", "PROCEDURE DIVISION",
                         "PIC clause", "PERFORM", "MOVE", "COMPUTE"],
        "teaching_tips": "COBOL runs most of the world's banking systems. Still relevant.",
    },

    "fortran": {
        "versions": ["Fortran 77", "Fortran 90", "Fortran 95", "Fortran 2003", "Fortran 2018"],
        "key_concepts": ["arrays", "subroutines", "modules", "implicit typing"],
        "teaching_tips": "Fortran is still #1 for numerical/scientific computing speed.",
    },

    "julia": {
        "key_concepts": ["multiple dispatch", "just-in-time compilation", "macros",
                         "type system", "broadcasting", "parallel computing"],
        "teaching_tips": "Julia: Python ease + C speed. Great for scientific computing.",
    },

    "solidity": {
        "key_concepts": ["smart contracts", "ABI", "gas", "mappings", "events",
                         "modifiers", "fallback functions", "ERC-20/ERC-721"],
        "common_errors": {
            "reentrancy": "External call before state update — checks-effects-interactions pattern",
            "integer overflow": "Use SafeMath or Solidity 0.8+ built-in overflow checks",
            "out of gas": "Loop too expensive — avoid unbounded loops in contracts",
        },
        "teaching_tips": "Solidity is Ethereum's language. Bugs cost real money — test thoroughly.",
    },

    "vhdl": {
        "key_concepts": ["concurrent signal assignment", "processes", "entities",
                         "architectures", "components", "testbenches"],
        "teaching_tips": "VHDL describes hardware — think parallel, not sequential.",
    },

    "verilog": {
        "key_concepts": ["modules", "always blocks", "wire vs reg", "blocking vs non-blocking",
                         "simulation vs synthesis"],
        "teaching_tips": "Verilog is for FPGA/ASIC design. Hardware runs in parallel.",
    },

    "prolog": {
        "key_concepts": ["facts", "rules", "queries", "unification",
                         "backtracking", "cut operator", "lists"],
        "teaching_tips": "Prolog is declarative — you describe what, not how.",
    },

    "lisp": {
        "dialects": ["Common Lisp", "Scheme", "Racket", "Clojure"],
        "key_concepts": ["s-expressions", "car/cdr", "macros", "tail recursion",
                         "homoiconicity", "lambda"],
        "teaching_tips": "LISP: code is data, data is code. Parentheses everywhere!",
    },

    "elixir": {
        "key_concepts": ["actor model", "pattern matching", "pipe operator",
                         "OTP", "GenServer", "supervision trees", "immutability"],
        "teaching_tips": "Elixir runs on Erlang VM — built for fault-tolerant systems.",
        "ecosystem": ["Phoenix (web framework)", "Ecto (DB)", "LiveView"],
    },

    "dart": {
        "versions": ["Dart 2.x", "Dart 3.x"],
        "key_concepts": ["null safety", "async/await", "streams", "mixins",
                         "extension methods", "Flutter widgets"],
        "common_errors": {
            "null safety violation": "Variable might be null — use ? or ! operator",
            "type mismatch": "Dart is strongly typed — check return types",
        },
        "teaching_tips": "Dart + Flutter = cross-platform apps from one codebase.",
    },

    "powershell": {
        "key_concepts": ["cmdlets", "pipeline", "objects (not text)", "modules",
                         "providers", "remoting"],
        "teaching_tips": "PowerShell passes objects through pipeline, not text strings.",
    },

    "groovy": {
        "key_concepts": ["dynamic typing", "closures", "builders", "Groovy truth",
                         "metaclasses", "GDK"],
        "teaching_tips": "Groovy is used heavily in Jenkins pipelines and Gradle build scripts.",
    },

    "awk": {
        "key_concepts": ["pattern-action", "field splitting", "built-in variables",
                         "BEGIN/END blocks", "printf"],
        "teaching_tips": "AWK is perfect for one-liner data transformation in terminal.",
    },

    "makefile": {
        "key_concepts": ["targets", "dependencies", "recipes", "variables",
                         "automatic variables", "pattern rules"],
        "common_errors": {
            "missing tab": "Recipe lines MUST start with TAB, not spaces",
            "circular dependency": "Target depends on itself",
        },
    },

    "regex": {
        "key_concepts": ["character classes", "quantifiers", "anchors", "groups",
                         "lookahead/lookbehind", "backreferences", "flags"],
        "common_errors": {
            "catastrophic backtracking": "Nested quantifiers on ambiguous patterns",
            "greedy vs lazy": ".* matches everything — use .*? for lazy",
        },
        "teaching_tips": "Regex is a mini-language inside other languages. Test at regex101.com",
    },
})


# ══════════════════════════════════════════════════════════════
# FINAL TESTS
# ══════════════════════════════════════════════════════════════

import pytest

class TestWiring:
    def test_english_in_native_knowledge(self):
        assert "en" in NATIVE_LANG_KNOWLEDGE
        assert "error_explanations" in NATIVE_LANG_KNOWLEDGE["en"]
        assert "NameError" in NATIVE_LANG_KNOWLEDGE["en"]["error_explanations"]

    def test_english_has_all_required_keys(self):
        en = NATIVE_LANG_KNOWLEDGE["en"]
        for key in ["coding_vocab", "analogies", "encouragement",
                    "error_explanations", "teaching_phrases"]:
            assert key in en, f"English missing {key}"

    def test_all_21_plus_english_covered(self):
        all_langs = ["en","hi","ta","te","bn","mr","gu","kn","ml","pa","or",
                     "as","mai","ne","sa","ks","kok","doi","brx","mni","sat"]
        for lid in all_langs:
            assert lid in NATIVE_LANG_KNOWLEDGE, f"Missing: {lid}"

    def test_additional_prog_langs_added(self):
        for lang in ["php","ruby","csharp","lua","julia","solidity","elixir",
                     "regex","makefile","groovy","fortran","cobol"]:
            assert lang in PROG_LANG_KNOWLEDGE, f"Missing prog lang: {lang}"

    def test_total_prog_langs_count(self):
        assert len(PROG_LANG_KNOWLEDGE) >= 35

    def test_get_coding_term_english(self):
        assert get_coding_term("variable", "en") == "variable"

    def test_teaching_phrase_english(self):
        phrase = get_teaching_phrase("what_do_you_think", "en")
        assert "line" in phrase.lower() or "doing" in phrase.lower()

    def test_native_error_explanation_english(self):
        exp = get_native_error_explanation("NameError", "en")
        assert len(exp) > 20
        assert "variable" in exp.lower()
