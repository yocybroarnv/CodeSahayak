"""
CodeSahayak — Adaptive Learning Engine v1.0
Covers:
  - Per-student knowledge graph (concept mastery tracking)
  - Problem recommendation (next best topic)
  - Error pattern NLP clustering for teacher dashboard
  - Difficulty auto-adjustment per student
"""

from dataclasses import dataclass, field
from typing import Optional
import math

# ── KNOWLEDGE GRAPH ────────────────────────────────────────────

# Concept dependency graph — what must be learned before what
CONCEPT_PREREQUISITES: dict[str, list[str]] = {
    "variables":         [],
    "datatypes":         ["variables"],
    "operators":         ["datatypes"],
    "conditionals":      ["operators"],
    "loops":             ["conditionals"],
    "strings":           ["loops"],
    "lists":             ["strings"],
    "tuples_sets_dicts": ["lists"],
    "functions":         ["tuples_sets_dicts"],
    "file_handling":     ["functions"],
    "exceptions":        ["functions"],
    "oop_basics":        ["exceptions"],
    "oop_inheritance":   ["oop_basics"],
    "recursion":         ["functions"],
    "stack":             ["oop_basics"],
    "queue":             ["stack"],
    "linked_list":       ["oop_basics"],
    "trees":             ["linked_list","recursion"],
    "graphs":            ["trees"],
    "sorting":           ["lists","recursion"],
    "searching":         ["sorting"],
    "sql_basics":        ["functions"],
    "sql_joins":         ["sql_basics"],
    "networks":          ["functions"],
    "algorithms_basics": [],
    "design_patterns":   ["oop_inheritance"],
}

# Error type → concept mapping (for auto-tagging errors)
ERROR_TO_CONCEPT: dict[str, str] = {
    "NameError":          "variables",
    "SyntaxError":        "variables",
    "TypeError":          "datatypes",
    "ZeroDivisionError":  "operators",
    "IndexError":         "lists",
    "KeyError":           "tuples_sets_dicts",
    "AttributeError":     "oop_basics",
    "RecursionError":     "recursion",
    "StopIteration":      "loops",
    "ValueError":         "datatypes",
    "UnboundLocalError":  "functions",
    "ImportError":        "functions",
}

@dataclass
class ConceptState:
    concept_id: str
    mastery: float = 0.0        # 0.0 – 1.0
    attempts: int = 0
    successes: int = 0
    last_error_type: Optional[str] = None
    consecutive_correct: int = 0

@dataclass
class StudentKnowledgeGraph:
    student_id: str
    concepts: dict[str, ConceptState] = field(default_factory=dict)

    def get_or_create(self, concept_id: str) -> ConceptState:
        if concept_id not in self.concepts:
            self.concepts[concept_id] = ConceptState(concept_id)
        return self.concepts[concept_id]

    def update_after_submission(
        self,
        concept_id: str,
        passed: bool,
        error_type: Optional[str] = None
    ) -> None:
        state = self.get_or_create(concept_id)
        state.attempts += 1
        if passed:
            state.successes += 1
            state.consecutive_correct += 1
        else:
            state.consecutive_correct = 0
            if error_type:
                state.last_error_type = error_type

        # Mastery = weighted success rate with recency bonus
        base = state.successes / state.attempts
        recency_bonus = min(state.consecutive_correct * 0.05, 0.2)
        state.mastery = min(base + recency_bonus, 1.0)

    def is_concept_ready(self, concept_id: str) -> bool:
        """Can student attempt this concept? All prerequisites mastered >= 0.6"""
        prereqs = CONCEPT_PREREQUISITES.get(concept_id, [])
        return all(
            self.concepts.get(p, ConceptState(p)).mastery >= 0.6
            for p in prereqs
        )

    def mastery_summary(self) -> dict[str, float]:
        return {cid: state.mastery for cid, state in self.concepts.items()}

    def weak_concepts(self, threshold: float = 0.5) -> list[str]:
        return [
            cid for cid, state in self.concepts.items()
            if state.attempts > 0 and state.mastery < threshold
        ]

    def ready_concepts(self) -> list[str]:
        """All concepts the student is ready to attempt next."""
        return [
            cid for cid in CONCEPT_PREREQUISITES
            if cid not in self.concepts or self.concepts[cid].mastery < 0.8
            if self.is_concept_ready(cid)
        ]


# ── PROBLEM RECOMMENDATION ENGINE ─────────────────────────────

def recommend_next_topic(
    knowledge_graph: StudentKnowledgeGraph,
    available_topic_ids: list[str],
    target_mastery: float = 0.8,
) -> list[str]:
    """
    Returns up to 3 recommended topic IDs in priority order.

    Priority:
    1. Weak concepts (attempted but mastery < 0.5) — remediation first
    2. Ready concepts with low mastery (0.0–0.6) — progression
    3. New concepts the student hasn't tried — exploration
    """
    scored: list[tuple[str, float]] = []

    for topic_id in available_topic_ids:
        concept_ids = _extract_concepts_from_topic(topic_id)

        for concept_id in concept_ids:
            state = knowledge_graph.concepts.get(concept_id)
            ready = knowledge_graph.is_concept_ready(concept_id)

            if not ready:
                continue

            if state is None:
                # Never attempted — exploration
                score = 0.3
            elif state.mastery < 0.5 and state.attempts > 0:
                # Weak — remediation (high priority)
                score = 1.0 - state.mastery
            elif state.mastery < target_mastery:
                # In progress — progression
                score = 0.6 - state.mastery
            else:
                # Already mastered — skip
                continue

            scored.append((topic_id, score))
            break  # One score per topic

    # Sort by score descending, return top 3
    scored.sort(key=lambda x: x[1], reverse=True)
    return [tid for tid, _ in scored[:3]]


def _extract_concepts_from_topic(topic_id: str) -> list[str]:
    """Map topic IDs to concept IDs. Extend as curriculum grows."""
    TOPIC_CONCEPT_MAP: dict[str, list[str]] = {
        "cbse11_intro_py":      ["variables"],
        "cbse11_datatypes":     ["datatypes"],
        "cbse11_operators":     ["operators"],
        "cbse11_if":            ["conditionals"],
        "cbse11_loops":         ["loops"],
        "cbse11_strings":       ["strings"],
        "cbse11_lists":         ["lists"],
        "cbse11_tuples_dicts":  ["tuples_sets_dicts"],
        "cbse11_functions":     ["functions","recursion"],
        "cbse11_files":         ["file_handling"],
        "cbse11_sql_intro":     ["sql_basics"],
        "cbse12_exceptions":    ["exceptions"],
        "cbse12_oop":           ["oop_basics","oop_inheritance"],
        "cbse12_stack":         ["stack"],
        "cbse12_queue":         ["queue"],
        "vtu_c_basics":         ["variables","datatypes"],
        "vtu_arrays":           ["lists","sorting"],
        "vtu_linked_list":      ["linked_list"],
        "vtu_trees":            ["trees"],
        "vtu_sorting":          ["sorting"],
        "vtu_graph":            ["graphs"],
        "cbse12_networks":      ["networks"],
        "au_algo_basics":       ["algorithms_basics"],
        "au_oop_design":        ["design_patterns"],
        "kerala9_hello":        ["variables"],
    }
    return TOPIC_CONCEPT_MAP.get(topic_id, [])


# ── DIFFICULTY AUTO-ADJUSTMENT ─────────────────────────────────

def compute_next_difficulty(
    knowledge_graph: StudentKnowledgeGraph,
    concept_id: str,
) -> str:
    """
    Returns 'easy' | 'medium' | 'hard' based on mastery.
    Easy    → mastery < 0.4
    Medium  → 0.4 – 0.75
    Hard    → > 0.75
    """
    state = knowledge_graph.concepts.get(concept_id)
    if not state or state.attempts == 0:
        return "easy"
    if state.mastery < 0.4:
        return "easy"
    if state.mastery < 0.75:
        return "medium"
    return "hard"


# ── ERROR PATTERN CLUSTERING (NLP-light) ──────────────────────

@dataclass
class ErrorCluster:
    concept_id: str
    error_type: str
    count: int
    student_ids: list[str]
    example_code_snippets: list[str]

def cluster_class_errors(
    submissions: list[dict],  # [{student_id, error_type, code, assignment_id}]
) -> list[ErrorCluster]:
    """
    Groups errors by concept for teacher dashboard heatmap.
    Input: list of failed submission metadata
    Output: list of ErrorCluster sorted by count desc
    """
    from collections import defaultdict
    cluster_map: dict[str, dict] = defaultdict(lambda: {
        "count": 0,
        "student_ids": set(),
        "snippets": []
    })

    for sub in submissions:
        error_type = sub.get("error_type")
        if not error_type:
            continue
        concept = ERROR_TO_CONCEPT.get(error_type, "unknown")
        key = f"{concept}::{error_type}"
        cluster_map[key]["count"] += 1
        cluster_map[key]["student_ids"].add(sub["student_id"])
        if len(cluster_map[key]["snippets"]) < 3:
            snippet = sub.get("code", "")[:150]
            cluster_map[key]["snippets"].append(snippet)

    clusters = []
    for key, data in cluster_map.items():
        concept_id, error_type = key.split("::", 1)
        clusters.append(ErrorCluster(
            concept_id=concept_id,
            error_type=error_type,
            count=data["count"],
            student_ids=list(data["student_ids"]),
            example_code_snippets=data["snippets"]
        ))

    return sorted(clusters, key=lambda c: c.count, reverse=True)


def generate_teacher_insight(clusters: list[ErrorCluster], lang_id: str = "en") -> str:
    """
    Generates a plain-English (or localized) diagnostic summary
    for the teacher dashboard.
    """
    if not clusters:
        return "No errors detected. Great work from your class!"

    top = clusters[:3]
    lines = ["📊 Class Diagnostic Summary\n"]
    for i, cluster in enumerate(top, 1):
        students = len(cluster.student_ids)
        lines.append(
            f"{i}. {cluster.count} {cluster.error_type}s "
            f"({students} student{'s' if students != 1 else ''}) "
            f"→ Concept: {cluster.concept_id.replace('_',' ').title()}"
        )

    lines.append(f"\n💡 Recommendation: Review '{top[0].concept_id.replace('_',' ')}' "
                 f"— {top[0].count} students are struggling here.")
    return "\n".join(lines)


# ── STREAK AND XP SYSTEM ──────────────────────────────────────

XP_TABLE = {
    "assignment_passed":     50,
    "assignment_perfect":    100,
    "daily_login":           10,
    "streak_7_days":         200,
    "streak_30_days":        500,
    "concept_mastered":      75,
    "first_submission":      25,
    "helped_classmate":      30,
}

def level_from_xp(xp: int) -> int:
    """Level = floor(1 + sqrt(xp / 100))"""
    return max(1, int(1 + math.sqrt(xp / 100)))

def xp_for_level(level: int) -> int:
    """XP needed to reach a given level"""
    return int(((level - 1) ** 2) * 100)

def award_xp(current_xp: int, event: str) -> tuple[int, int, bool]:
    """
    Returns (new_xp, new_level, leveled_up).
    """
    gain = XP_TABLE.get(event, 0)
    new_xp = current_xp + gain
    old_level = level_from_xp(current_xp)
    new_level = level_from_xp(new_xp)
    return new_xp, new_level, new_level > old_level


# ── PYTEST TESTS ───────────────────────────────────────────────

import pytest

class TestKnowledgeGraph:
    def test_mastery_increases_on_success(self):
        g = StudentKnowledgeGraph("stu_001")
        g.update_after_submission("variables", passed=True)
        assert g.concepts["variables"].mastery > 0

    def test_mastery_stays_low_on_failures(self):
        g = StudentKnowledgeGraph("stu_001")
        for _ in range(5):
            g.update_after_submission("variables", passed=False, error_type="NameError")
        assert g.concepts["variables"].mastery < 0.3

    def test_consecutive_correct_gives_bonus(self):
        g = StudentKnowledgeGraph("stu_001")
        for _ in range(4):
            g.update_after_submission("variables", passed=True)
        assert g.concepts["variables"].mastery >= 0.8

    def test_prerequisites_block_advanced_concepts(self):
        g = StudentKnowledgeGraph("stu_001")
        # functions requires tuples_sets_dicts → lists → strings → ... → variables
        assert not g.is_concept_ready("functions")

    def test_ready_after_prerequisites_met(self):
        g = StudentKnowledgeGraph("stu_001")
        for concept in ["variables","datatypes","operators","conditionals",
                        "loops","strings","lists","tuples_sets_dicts"]:
            g.concepts[concept] = ConceptState(concept, mastery=0.8, attempts=5, successes=4)
        assert g.is_concept_ready("functions")

    def test_weak_concepts_list(self):
        g = StudentKnowledgeGraph("stu_001")
        g.concepts["loops"] = ConceptState("loops", mastery=0.3, attempts=3, successes=1)
        assert "loops" in g.weak_concepts(threshold=0.5)

class TestRecommendation:
    def test_recommends_weak_concept_first(self):
        g = StudentKnowledgeGraph("stu_001")
        # Make prerequisites ready
        for c in ["variables","datatypes","operators","conditionals"]:
            g.concepts[c] = ConceptState(c, mastery=0.9, attempts=5, successes=5)
        # Make loops weak
        g.concepts["loops"] = ConceptState("loops", mastery=0.2, attempts=3, successes=1)

        recs = recommend_next_topic(g, ["cbse11_loops","cbse11_strings"])
        assert "cbse11_loops" in recs

    def test_no_recommendations_if_all_mastered(self):
        g = StudentKnowledgeGraph("stu_001")
        for c in CONCEPT_PREREQUISITES:
            g.concepts[c] = ConceptState(c, mastery=0.95, attempts=10, successes=10)
        recs = recommend_next_topic(g, ["cbse11_loops"])
        assert len(recs) == 0

class TestDifficultyAdjustment:
    def test_easy_for_new_student(self):
        g = StudentKnowledgeGraph("stu_001")
        assert compute_next_difficulty(g, "variables") == "easy"

    def test_hard_after_high_mastery(self):
        g = StudentKnowledgeGraph("stu_001")
        g.concepts["variables"] = ConceptState("variables", mastery=0.9, attempts=10, successes=9)
        assert compute_next_difficulty(g, "variables") == "hard"

class TestErrorClustering:
    def test_clusters_errors_by_concept(self):
        submissions = [
            {"student_id": "s1", "error_type": "NameError", "code": "print(x)"},
            {"student_id": "s2", "error_type": "NameError", "code": "print(y)"},
            {"student_id": "s3", "error_type": "IndexError", "code": "lst[10]"},
        ]
        clusters = cluster_class_errors(submissions)
        name_cluster = next((c for c in clusters if c.error_type == "NameError"), None)
        assert name_cluster is not None
        assert name_cluster.count == 2
        assert name_cluster.concept_id == "variables"

    def test_teacher_insight_mentions_top_error(self):
        clusters = [
            ErrorCluster("variables","NameError",8,["s1","s2","s3"],[]),
            ErrorCluster("lists","IndexError",3,["s4"],[]),
        ]
        insight = generate_teacher_insight(clusters)
        assert "NameError" in insight
        assert "variables" in insight.lower() or "Variables" in insight

class TestXPSystem:
    def test_xp_increases_on_pass(self):
        xp, level, leveled = award_xp(0, "assignment_passed")
        assert xp == 50

    def test_level_increases(self):
        _, level, leveled = award_xp(9900, "assignment_perfect")
        assert leveled or level >= 10

    def test_level_1_at_zero_xp(self):
        assert level_from_xp(0) == 1

    def test_xp_for_level_increases(self):
        assert xp_for_level(5) > xp_for_level(3)
