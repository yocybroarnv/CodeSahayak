"""
Gurujii v4 — PhD-Level Intelligent Tutor
Fixes all gaps from previous versions. Single source of truth.
"""

import ast, re, time, os, json
from dataclasses import dataclass, field
from typing import Optional
from collections import deque

# ══════════════════════════════════════════════════════════════
# 1. PERSONALITY & PEDAGOGY ENGINE
# ══════════════════════════════════════════════════════════════

GURUJII_SYSTEM_PROMPT = """You are Gurujii — a PhD-level computer science tutor who is also a warm, encouraging best friend to every student.

PERSONALITY:
- Warm, patient, never condescending
- Celebrates every small win ("Wah! Excellent thinking!")
- Uses the student's name naturally
- Shares excitement about programming ("This concept is one of my favourites!")
- Occasionally uses Hindi/regional phrases naturally if student's language is not English
- Never says "As an AI" — you ARE Gurujii, a real tutor

TEACHING PHILOSOPHY (Socratic + PhD-level):
- Never give answers directly — guide discovery
- Ask ONE powerful question that leads the student to the answer
- When student is stuck: give a tiny hint, not the solution
- Use analogies from Indian daily life (chai, cricket, train journeys, rickshaws)
- Explain WHY, not just HOW — always connect to fundamentals
- Link new concepts to what student already knows
- After every explanation, ask "Does this make sense? Try modifying the code and tell me what happens"

EXPERTISE LEVELS — adapt automatically:
- Grade 9–10: Simple analogies, no jargon, lots of encouragement
- Grade 11–12: NCERT curriculum depth, board exam focus
- B.E./B.Tech: DSA, OOP, system design depth
- Advanced: Time/space complexity, design patterns, CS theory

WHEN STUDENT HAS AN ERROR:
1. First: acknowledge their effort ("Good attempt!")
2. Ask: "What do you think this line is doing?"
3. Give a hint about the error category, not the fix
4. If still stuck after 2 hints: show the fix WITH deep explanation
5. Always explain WHY the error happened (root cause)

WHEN STUDENT ASKS TO WRITE THEIR HOMEWORK:
- Gently decline: "I won't write it for you — but I'll make sure YOU can write it!"
- Break the problem into smaller questions
- Guide them step by step until THEY write it

PROGRAMMING KNOWLEDGE (you know everything at PhD+ level):
- Python, C, C++, Java, JavaScript, SQL, HTML/CSS
- Data Structures: arrays, linked lists, trees, graphs, heaps, hash maps
- Algorithms: sorting, searching, dynamic programming, greedy, backtracking
- OOP: SOLID principles, design patterns (all 23 GoF patterns)
- System design, databases, networking, OS concepts
- Competitive programming, time complexity analysis
- Web development, APIs, databases, cloud basics

MULTILINGUAL RULES:
- Respond in the SAME LANGUAGE the student wrote in
- If Hindi: use Devanagari script naturally, mix code terms in English
- If Tamil/Telugu/etc: full response in that script
- If mixed (Hinglish): match their mixed style
- Technical terms (variable, function, loop) stay in English always
- Never translate code keywords

OUTPUT FORMAT:
- Keep responses SHORT (3–5 sentences max for simple questions)
- Use code blocks for any code
- One concept at a time — never overwhelm
- End with ONE question or ONE action for the student
"""

GURUJII_PERSONALITIES = {
    "encouraging": [
        "Bahut badhiya! {}", "Shandaar! {}", "Wah! {}",
        "Excellent thinking! {}", "You're getting it! {}",
    ],
    "hint_prefix": [
        "Ek chhota sa hint: ", "Think about this: ",
        "What if I told you: ", "Dekho, ", "Consider: ",
    ],
    "error_empathy": [
        "Don't worry — this trips up everyone at first.",
        "This is actually a very common mistake. You're not alone!",
        "Even experienced programmers make this error.",
        "Good attempt! Let's figure this out together.",
    ],
    "discovery_questions": [
        "What do you think will happen if you change {} to {}?",
        "Can you tell me what this line is trying to do?",
        "What does Python do when it sees this keyword?",
        "If you were Python, how would you read this line?",
    ],
}


# ══════════════════════════════════════════════════════════════
# 2. INTENT CLASSIFICATION (rule-based + keyword, no model needed)
# ══════════════════════════════════════════════════════════════

INTENT_RULES = {
    "explain_error":      ["error", "why does", "what does.*error", "traceback", "exception", "त्रुटि", "பிழை", "లోపం"],
    "debug_help":         ["fix", "wrong", "not working", "debug", "help me", "मदद", "சரி", "సరి"],
    "concept_clarify":    ["what is", "explain", "how does", "difference between", "क्या है", "என்ன", "ఏమిటి"],
    "suggest_improvement":["better", "improve", "optimize", "efficient", "faster", "बेहतर", "மேம்படுத்த"],
    "write_solution":     ["write.*for me", "do my", "complete.*assignment", "give.*answer", "homework", "लिख दो", "solve it for me"],
    "test_understanding": ["quiz", "test me", "give me a problem", "practice", "challenge"],
    "code_review":        ["review", "check.*code", "is this correct", "feedback"],
    "next_topic":         ["next", "what.*learn", "what.*after", "आगे", "அடுத்து"],
}

def classify_intent(message: str, code: str = "") -> str:
    text = (message + " " + code).lower()
    for intent, patterns in INTENT_RULES.items():
        if any(re.search(p, text) for p in patterns):
            return intent
    return "general_help"

BLOCKED_INTENTS = {"write_solution"}

def should_block(intent: str) -> tuple[bool, str]:
    if intent in BLOCKED_INTENTS:
        return True, (
            "I won't write it for you — but I promise I'll make sure YOU can write it! "
            "Let's break this problem into smaller pieces. "
            "Tell me: what's the first thing your code needs to do?"
        )
    return False, ""


# ══════════════════════════════════════════════════════════════
# 3. CODE ANALYSIS ENGINE (replaces sending raw code to LLM)
# ══════════════════════════════════════════════════════════════

@dataclass
class CodeContext:
    error_type: Optional[str]
    error_line: int
    error_msg: str
    snippet: str           # 3 lines around error with arrow
    scope: str             # enclosing function/class or "global"
    defined_names: list[str]
    complexity_hints: list[str]  # e.g. ["nested loop detected", "recursion without base case"]
    concept_tags: list[str]      # what CS concepts are in this code

ERROR_TO_CONCEPT = {
    "NameError":         ("variables",    "Variable used before assignment"),
    "TypeError":         ("datatypes",    "Wrong data type for operation"),
    "ZeroDivisionError": ("operators",    "Division by zero"),
    "IndexError":        ("lists",        "List index out of range"),
    "KeyError":          ("dicts",        "Dictionary key not found"),
    "AttributeError":    ("oop",          "Object doesn't have that attribute"),
    "RecursionError":    ("recursion",    "Missing or wrong base case"),
    "SyntaxError":       ("syntax",       "Code structure is wrong"),
    "IndentationError":  ("syntax",       "Indentation is incorrect"),
    "ValueError":        ("datatypes",    "Wrong value for the operation"),
    "UnboundLocalError": ("scope",        "Variable used before assignment in scope"),
    "StopIteration":     ("iterators",    "Iterator exhausted"),
    "ImportError":       ("modules",      "Module not found or wrong import"),
    "FileNotFoundError": ("files",        "File path is wrong"),
}

CONCEPT_DETECTORS = {
    "recursion":    lambda code: "def " in code and re.search(r'(\w+)\(.*\)', code) is not None,
    "loops":        lambda code: "for " in code or "while " in code,
    "oop":          lambda code: "class " in code or "self." in code,
    "lists":        lambda code: "[" in code and "]" in code,
    "dicts":        lambda code: "{" in code and ":" in code,
    "file_io":      lambda code: "open(" in code,
    "exceptions":   lambda code: "try:" in code or "except" in code,
    "generators":   lambda code: "yield" in code,
    "decorators":   lambda code: "@" in code,
    "comprehension":lambda code: bool(re.search(r'\[.*for.*in', code)),
    "lambda":       lambda code: "lambda " in code,
    "sql":          lambda code: any(k in code.upper() for k in ["SELECT","INSERT","CREATE","FROM"]),
}

def analyze_code(code: str, error_type: str = None,
                 error_msg: str = "", error_line: int = 0) -> CodeContext:
    lines = code.splitlines()
    total = len(lines)

    # Snippet around error
    if error_line > 0:
        start = max(0, error_line - 4)
        end = min(total, error_line + 2)
        snippet = "\n".join(
            f"{'→' if i+start+1==error_line else ' '} {i+start+1}: {lines[i+start]}"
            for i in range(end-start)
        )
    else:
        snippet = "\n".join(f"  {i+1}: {l}" for i,l in enumerate(lines[:15]))

    # Scope detection
    scope = "global"
    try:
        tree = ast.parse(code)
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                if hasattr(node,'lineno') and node.lineno <= error_line:
                    if getattr(node,'end_lineno', total) >= error_line:
                        scope = f"function '{node.name}'"
            elif isinstance(node, ast.ClassDef):
                if hasattr(node,'lineno') and node.lineno <= error_line:
                    if getattr(node,'end_lineno', total) >= error_line:
                        scope = f"class '{node.name}'"
    except SyntaxError:
        pass

    # Defined names
    defined = []
    try:
        for node in ast.walk(ast.parse("\n".join(lines[:error_line or total]))):
            if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store):
                if node.id not in defined:
                    defined.append(node.id)
    except SyntaxError:
        pass

    # Complexity hints
    hints = []
    for i, line in enumerate(lines, 1):
        indent = len(line) - len(line.lstrip())
        if indent >= 8:
            hints.append(f"Deeply nested code at line {i}")
    if "while True" in code:
        hints.append("Infinite loop detected — ensure there's a break")
    if code.count("for ") > 2:
        hints.append("Multiple nested loops — O(n²) or worse complexity")

    # Concept tags
    concepts = [c for c,fn in CONCEPT_DETECTORS.items() if fn(code)]

    return CodeContext(
        error_type=error_type,
        error_line=error_line,
        error_msg=error_msg,
        snippet=snippet,
        scope=scope,
        defined_names=defined[:8],
        complexity_hints=hints,
        concept_tags=concepts,
    )


# ══════════════════════════════════════════════════════════════
# 4. PROMPT BUILDER — PhD-quality prompts for LLM
# ══════════════════════════════════════════════════════════════

def build_error_prompt(ctx: CodeContext, student_name: str,
                       lang_id: str, grade_level: str,
                       prev_hints: int = 0) -> str:
    concept, root_cause = ERROR_TO_CONCEPT.get(
        ctx.error_type, ("general", "Something unexpected happened")
    )

    # Escalating hint depth based on how many times student has asked
    if prev_hints == 0:
        depth = "Give ONE empathetic sentence acknowledging the error, then ask what they think the highlighted line does. Do NOT reveal the fix."
    elif prev_hints == 1:
        depth = "Give a CATEGORY hint (mention the concept, not the fix). Ask: what is the variable's value at that point?"
    else:
        depth = "Now explain the fix clearly with the corrected code AND a thorough explanation of WHY this happened at root-cause level."

    lang_instruction = _lang_instruction(lang_id)

    return f"""
Student: {student_name} | Grade: {grade_level} | Language: {lang_id}
Error type: {ctx.error_type} — Root cause category: {root_cause}
Scope: {ctx.scope}
Defined variables: {ctx.defined_names}
Code snippet (→ marks error line):
{ctx.snippet}
Error message: {ctx.error_msg}
Concepts in code: {ctx.concept_tags}
Complexity notes: {ctx.complexity_hints}
Hint depth level: {prev_hints}/2

INSTRUCTION: {depth}
{lang_instruction}
Keep response under 80 words unless showing code.
""".strip()


def build_concept_prompt(concept: str, student_question: str,
                         student_name: str, lang_id: str,
                         grade_level: str, known_concepts: list[str]) -> str:
    lang_instruction = _lang_instruction(lang_id)
    return f"""
Student: {student_name} | Grade: {grade_level} | Language: {lang_id}
Question: {student_question}
Concept being asked about: {concept}
Concepts student already knows: {known_concepts}

INSTRUCTION: Explain using a relatable Indian analogy first, then the technical explanation, then a tiny code example. 
Socratic close: end with ONE question that tests their understanding.
{lang_instruction}
Max 100 words + code block.
""".strip()


def build_review_prompt(code: str, ctx: CodeContext,
                        student_name: str, lang_id: str,
                        grade_level: str) -> str:
    lang_instruction = _lang_instruction(lang_id)
    return f"""
Student: {student_name} | Grade: {grade_level} | Language: {lang_id}
Code to review:
{ctx.snippet}
Concepts used: {ctx.concept_tags}
Complexity notes: {ctx.complexity_hints}

INSTRUCTION: Give a PhD-level code review covering:
1. Correctness (does it work?)
2. Code quality (naming, readability)
3. Efficiency (time/space complexity if relevant)
4. One specific improvement suggestion with example
5. One thing they did WELL (always find something to praise)
{lang_instruction}
""".strip()


def _lang_instruction(lang_id: str) -> str:
    instructions = {
        "hi":  "RESPOND IN HINDI (Devanagari). Keep code keywords in English.",
        "ta":  "RESPOND IN TAMIL. Keep code keywords in English.",
        "te":  "RESPOND IN TELUGU. Keep code keywords in English.",
        "bn":  "RESPOND IN BENGALI. Keep code keywords in English.",
        "mr":  "RESPOND IN MARATHI. Keep code keywords in English.",
        "gu":  "RESPOND IN GUJARATI. Keep code keywords in English.",
        "kn":  "RESPOND IN KANNADA. Keep code keywords in English.",
        "ml":  "RESPOND IN MALAYALAM. Keep code keywords in English.",
        "pa":  "RESPOND IN PUNJABI (Gurmukhi). Keep code keywords in English.",
        "or":  "RESPOND IN ODIA. Keep code keywords in English.",
        "as":  "RESPOND IN ASSAMESE. Keep code keywords in English.",
        "mai": "RESPOND IN MAITHILI. Keep code keywords in English.",
        "ne":  "RESPOND IN NEPALI. Keep code keywords in English.",
        "sa":  "RESPOND IN SANSKRIT. Keep code keywords in English.",
        "ks":  "RESPOND IN KASHMIRI (Arabic Nastaliq). Keep code keywords in English.",
        "kok": "RESPOND IN KONKANI. Keep code keywords in English.",
        "doi": "RESPOND IN DOGRI. Keep code keywords in English.",
        "brx": "RESPOND IN BODO. Keep code keywords in English.",
        "mni": "RESPOND IN MEITEI (Meetei Mayek script). Keep code keywords in English.",
        "sat": "RESPOND IN SANTALI (Ol Chiki script). Keep code keywords in English.",
        "en":  "RESPOND IN ENGLISH.",
    }
    return instructions.get(lang_id, "RESPOND IN ENGLISH.")


# ══════════════════════════════════════════════════════════════
# 5. CONFIDENCE SCORING + FALLBACK ROUTING
# ══════════════════════════════════════════════════════════════

CONFIDENCE_THRESHOLD = 0.68

def score_response(text: str, error_type: str = None) -> float:
    if not text or len(text) < 30:
        return 0.1

    score = 0.6
    low_quality = [
        "i don't know", "i cannot", "as an ai", "i'm not sure",
        "please consult", "it depends on", "i am unable",
    ]
    if any(p in text.lower() for p in low_quality):
        score -= 0.4

    if error_type and error_type.lower() in text.lower():
        score += 0.15
    if any(kw in text for kw in ["```", "print(", "def ", "class ", "for ", "while "]):
        score += 0.1
    if len(text) > 50:
        score += 0.1
    if "?" in text:         # Socratic question present
        score += 0.05

    return min(1.0, max(0.0, score))


def route_to_model(prompt: str, system: str,
                   tinyllama_fn, claude_fn=None,
                   error_type: str = None) -> dict:
    """Try TinyLlama first; fall back to Claude Haiku if weak."""
    primary = tinyllama_fn(system=system, prompt=prompt)
    conf = score_response(primary, error_type)

    use_fallback = (
        conf < CONFIDENCE_THRESHOLD
        and claude_fn is not None
        and os.getenv("USE_CLAUDE_FALLBACK", "false") == "true"
    )

    if use_fallback:
        result = claude_fn(
            model="claude-haiku-4-5-20251001",
            max_tokens=400,
            system=system,
            messages=[{"role": "user", "content": prompt}]
        )
        return {"text": result.content[0].text, "model": "claude-haiku", "confidence": 0.95}

    return {"text": primary, "model": "tinyllama", "confidence": conf}


# ══════════════════════════════════════════════════════════════
# 6. SESSION MEMORY (in-memory; swap Redis key for production)
# ══════════════════════════════════════════════════════════════

@dataclass
class Turn:
    role: str
    content: str
    ts: float = field(default_factory=time.time)

@dataclass
class GurujiiSession:
    student_id: str
    student_name: str
    lang_id: str
    grade_level: str
    turns: deque = field(default_factory=lambda: deque(maxlen=6))
    hint_counts: dict = field(default_factory=dict)  # concept → hint count
    mastered_today: list = field(default_factory=list)
    last_active: float = field(default_factory=time.time)
    mood: str = "neutral"  # neutral | struggling | thriving

_sessions: dict[str, GurujiiSession] = {}

def get_session(student_id: str, student_name: str = "Student",
                lang_id: str = "en", grade_level: str = "11") -> GurujiiSession:
    s = _sessions.get(student_id)
    if not s or (time.time() - s.last_active) > 1800:
        s = GurujiiSession(student_id, student_name, lang_id, grade_level)
        _sessions[student_id] = s
    s.last_active = time.time()
    return s

def add_turn(session: GurujiiSession, role: str, content: str):
    session.turns.append(Turn(role=role, content=content))

def get_hint_count(session: GurujiiSession, concept: str) -> int:
    return session.hint_counts.get(concept, 0)

def increment_hint(session: GurujiiSession, concept: str):
    session.hint_counts[concept] = session.hint_counts.get(concept, 0) + 1

def reset_hint(session: GurujiiSession, concept: str):
    session.hint_counts.pop(concept, None)

def detect_mood(session: GurujiiSession) -> str:
    """Detect if student is struggling based on repeated errors on same concept."""
    counts = list(session.hint_counts.values())
    if any(c >= 3 for c in counts):
        return "struggling"
    if len(session.mastered_today) >= 2:
        return "thriving"
    return "neutral"

def build_context_messages(session: GurujiiSession, new_msg: str) -> list[dict]:
    msgs = []
    for t in session.turns:
        msgs.append({"role": t.role, "content": t.content})
    msgs.append({"role": "user", "content": new_msg})
    return msgs


# ══════════════════════════════════════════════════════════════
# 7. MAIN GURUJII HANDLER — single entry point
# ══════════════════════════════════════════════════════════════

def gurujii_respond(
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

    session = get_session(student_id, student_name, lang_id, grade_level)
    intent = classify_intent(message, code)

    # Gate: block homework requests
    blocked, block_msg = should_block(intent)
    if blocked:
        add_turn(session, "user", message)
        add_turn(session, "assistant", block_msg)
        return {"reply": block_msg, "intent": intent, "blocked": True}

    # Analyze code
    ctx = analyze_code(code, error_type, error_msg, error_line)

    # Detect mood — adjust tone
    mood = detect_mood(session)
    mood_prefix = ""
    if mood == "struggling":
        mood_prefix = "This student has been struggling. Be extra warm and encouraging. "
    elif mood == "thriving":
        mood_prefix = "This student is doing great! Add an extra challenge. "

    # Build prompt based on intent
    concept = ctx.concept_tags[0] if ctx.concept_tags else "general"
    prev_hints = get_hint_count(session, concept)

    if intent in ("explain_error", "debug_help") and error_type:
        prompt = build_error_prompt(ctx, student_name, lang_id,
                                    grade_level, prev_hints)
        increment_hint(session, concept)

    elif intent == "code_review":
        prompt = build_review_prompt(code, ctx, student_name, lang_id, grade_level)
        reset_hint(session, concept)

    elif intent == "concept_clarify":
        known = session.mastered_today
        prompt = build_concept_prompt(concept, message, student_name,
                                      lang_id, grade_level, known)
    else:
        # General help — use session context
        history = build_context_messages(session, message)
        prompt = json.dumps(history)

    full_system = GURUJII_SYSTEM_PROMPT + "\n" + mood_prefix

    result = route_to_model(prompt, full_system, tinyllama_fn,
                            claude_fn, error_type)
    reply = result["text"]

    # Track mastery: if student got answer on first hint
    if prev_hints == 0 and intent == "explain_error":
        session.mastered_today.append(concept)

    add_turn(session, "user", message)
    add_turn(session, "assistant", reply)

    return {
        "reply": reply,
        "intent": intent,
        "concept": concept,
        "confidence": result["confidence"],
        "model": result["model"],
        "hint_level": prev_hints,
        "mood": mood,
        "blocked": False,
    }


# ══════════════════════════════════════════════════════════════
# 8. FLASK ROUTES — drop-in replacement for existing app.py routes
# ══════════════════════════════════════════════════════════════

"""
@app.route('/api/gurujii/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    result = gurujii_respond(
        student_id   = data['studentId'],
        student_name = data.get('studentName', 'Student'),
        message      = data.get('message', ''),
        code         = data.get('code', ''),
        error_type   = data.get('errorType', ''),
        error_msg    = data.get('errorMsg', ''),
        error_line   = data.get('errorLine', 0),
        lang_id      = data.get('language', 'en'),
        grade_level  = data.get('gradeLevel', '11'),
        tinyllama_fn = tinyllama_generate,   # your existing fn
        claude_fn    = anthropic_client.messages.create if USE_CLAUDE_FALLBACK else None,
    )
    # SECURITY: strip if student role
    if g.user['role'] != 'TEACHER':
        result.pop('hint_level', None)
    return jsonify(result)
"""


# ══════════════════════════════════════════════════════════════
# 9. TESTS — pytest
# ══════════════════════════════════════════════════════════════

import pytest

class TestIntentClassifier:
    def test_blocks_homework(self):
        assert classify_intent("write my homework for me") == "write_solution"
        assert classify_intent("do my assignment") == "write_solution"

    def test_allows_error_help(self):
        assert classify_intent("why does this error happen") == "explain_error"

    def test_concept_clarify(self):
        assert classify_intent("what is recursion") == "concept_clarify"

    def test_hindi_help_intent(self):
        assert classify_intent("मदद करो") == "debug_help"

    def test_tamil_error(self):
        assert classify_intent("பிழை என்ன") == "explain_error"

class TestCodeAnalysis:
    def test_detects_name_error_scope(self):
        code = "def foo():\n    print(undefined_var)\nfoo()"
        ctx = analyze_code(code, "NameError", "name 'undefined_var' not defined", 2)
        assert ctx.scope == "function 'foo'"
        assert ctx.error_type == "NameError"

    def test_detects_concepts(self):
        code = "class Dog:\n    def __init__(self): self.name='Rex'"
        ctx = analyze_code(code)
        assert "oop" in ctx.concept_tags

    def test_detects_recursion(self):
        code = "def fact(n):\n    return 1 if n<=1 else n*fact(n-1)"
        ctx = analyze_code(code)
        assert "recursion" in ctx.concept_tags

    def test_complexity_hint_nested_loop(self):
        code = "for i in range(n):\n    for j in range(n):\n        for k in range(n):\n            pass"
        ctx = analyze_code(code)
        assert any("nested" in h.lower() or "loop" in h.lower() for h in ctx.complexity_hints)

    def test_snippet_marks_error_line(self):
        code = "x = 1\ny = 2\nprint(z)\nw = 4"
        ctx = analyze_code(code, "NameError", "z not defined", 3)
        assert "→" in ctx.snippet

class TestConfidenceScoring:
    def test_low_score_for_ai_refusal(self):
        assert score_response("I don't know how to help with this.") < 0.4

    def test_high_score_for_code_response(self):
        resp = "The NameError happens because `x` is not defined.\n```python\nx = 5\nprint(x)\n```\nDo you see how we defined x first?"
        assert score_response(resp, "NameError") > 0.7

    def test_socratic_question_boosts_score(self):
        with_q = "The issue is indentation. What do you think Python expects here?"
        without_q = "The issue is indentation."
        assert score_response(with_q) > score_response(without_q)

class TestSession:
    def test_hint_count_increments(self):
        s = get_session("s1", "Priya", "hi", "11")
        increment_hint(s, "variables")
        increment_hint(s, "variables")
        assert get_hint_count(s, "variables") == 2

    def test_mood_struggling_after_3_hints(self):
        s = get_session("s2", "Rohit", "en", "12")
        s.hint_counts["loops"] = 3
        assert detect_mood(s) == "struggling"

    def test_mood_thriving(self):
        s = get_session("s3", "Ananya", "ta", "11")
        s.mastered_today = ["variables", "datatypes"]
        assert detect_mood(s) == "thriving"

    def test_session_expires_after_30min(self):
        s = get_session("s4", "Kiran", "en", "10")
        s.last_active = time.time() - 1801
        new_s = get_session("s4", "Kiran", "en", "10")
        assert len(new_s.turns) == 0  # fresh session

class TestBlocker:
    def test_blocks_write_solution(self):
        blocked, msg = should_block("write_solution")
        assert blocked
        assert "YOU" in msg or "you" in msg

    def test_allows_debug_help(self):
        blocked, _ = should_block("debug_help")
        assert not blocked

class TestLangInstruction:
    def test_all_21_langs_covered(self):
        langs = ["en","hi","ta","te","bn","mr","gu","kn","ml","pa","or",
                 "as","mai","ne","sa","ks","kok","doi","brx","mni","sat"]
        for lid in langs:
            inst = _lang_instruction(lid)
            assert inst, f"Missing instruction for {lid}"
            assert "code keywords in English" in inst or lid == "en"

    def test_unknown_lang_defaults_english(self):
        assert _lang_instruction("xx") == "RESPOND IN ENGLISH."
