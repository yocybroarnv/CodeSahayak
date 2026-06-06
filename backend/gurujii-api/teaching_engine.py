"""
Gurujii Teaching Engine
Advanced AI teaching features for CodeSahayak
Implements logic explanation, hints, concept detection, and more
"""

import ast
import re
from typing import Dict, List, Tuple, Optional

# Offline Error Database with multilingual explanations
OFFLINE_ERROR_DB = {
    "IndentationError": {
        "en": {
            "explanation": "Python uses indentation to define code blocks. Without proper indentation, Python cannot know which code belongs together.",
            "why": "Python relies on indentation (spaces/tabs) instead of brackets {} to group code. This makes code readable but requires consistency.",
            "fix": "Use 4 spaces for each indentation level. Make sure all code inside loops, functions, or if statements is indented.",
            "concept": "Indentation & Code Blocks"
        },
        "hi": {
            "explanation": "Python indentation का उपयोग code blocks को define करने के लिए करता है।",
            "why": "Python brackets {} की जगह indentation का उपयोग करता है।",
            "fix": "हर indentation level के लिए 4 spaces का उपयोग करें।",
            "concept": "Indentation और Code Blocks"
        },
        "ta": {
            "explanation": "Python indentation ஐ code blocks வரையறுக்க பயன்படுத்துகிறது.",
            "why": "Python brackets {} க்கு பதிலாக indentation பயன்படுத்துகிறது.",
            "fix": "ஒவ்வொரு indentation level க்கும் 4 spaces பயன்படுத்தவும்.",
            "concept": "Indentation மற்றும் Code Blocks"
        }
    },
    "SyntaxError": {
        "en": {
            "explanation": "There is a syntax mistake in your code. Python has specific rules for how code should be written.",
            "why": "Programming languages have grammar rules just like human languages. Breaking these rules causes syntax errors.",
            "fix": "Check for missing colons (:), brackets, quotes, or incorrect keywords.",
            "concept": "Python Syntax Rules"
        },
        "hi": {
            "explanation": "आपके code में syntax की गलती है। Python में code लिखने के specific rules हैं।",
            "why": "Programming languages में भी grammar rules होते हैं जैसे human languages में।",
            "fix": "Missing colons (:), brackets, quotes या incorrect keywords check करें।",
            "concept": "Python Syntax नियम"
        }
    },
    "NameError": {
        "en": {
            "explanation": "You're trying to use a variable or function that hasn't been defined yet.",
            "why": "Python needs to know what a name means before you can use it. You must define variables before using them.",
            "fix": "Define the variable before using it, or check for spelling mistakes in the name.",
            "concept": "Variables & Scope"
        },
        "hi": {
            "explanation": "आप एक variable या function use कर रहे हैं जो अभी तक define नहीं हुआ है।",
            "why": "Python को पहले से पता होना चाहिए कि name का क्या मतलब है।",
            "fix": "Variable को use करने से पहले define करें, या spelling mistakes check करें।",
            "concept": "Variables और Scope"
        }
    },
    "TypeError": {
        "en": {
            "explanation": "You're mixing incompatible data types. For example, trying to add a number to a string.",
            "why": "Different data types have different operations. You can't add '5' (string) to 5 (number) directly.",
            "fix": "Convert data types using int(), str(), float() functions, or check your operations.",
            "concept": "Data Types & Type Conversion"
        },
        "hi": {
            "explanation": "आप incompatible data types को mix कर रहे हैं।",
            "why": "Different data types के different operations होते हैं।",
            "fix": "int(), str(), float() functions का उपयोग करके data types convert करें।",
            "concept": "Data Types और Type Conversion"
        }
    }
}

# Concept Detection Database
CONCEPT_PATTERNS = {
    "loops": {
        "patterns": [r'\bfor\b', r'\bwhile\b', r'\brange\('],
        "name": "Loops",
        "difficulty": "Beginner",
        "explanation": {
            "en": "Loops allow you to repeat code multiple times. The 'for' loop iterates over a sequence, while 'while' loop continues until a condition is false.",
            "hi": "Loops आपको code को कई बार repeat करने देते हैं। 'for' loop एक sequence पर iterate करता है।",
            "ta": "Loops code ஐ பல முறை repeat செய்ய அனுமதிக்கிறது."
        }
    },
    "functions": {
        "patterns": [r'\bdef\b', r'\breturn\b'],
        "name": "Functions",
        "difficulty": "Beginner",
        "explanation": {
            "en": "Functions are reusable blocks of code. They help organize your program and avoid repetition.",
            "hi": "Functions reusable code blocks हैं। वे आपके program को organize करने में मदद करते हैं।",
            "ta": "Functions மீண்டும் பயன்படுத்தக்கூடிய code blocks ஆகும்."
        }
    },
    "conditionals": {
        "patterns": [r'\bif\b', r'\belif\b', r'\belse\b'],
        "name": "Conditionals",
        "difficulty": "Beginner",
        "explanation": {
            "en": "Conditionals let your program make decisions. Code runs only if certain conditions are true.",
            "hi": "Conditionals आपके program को decisions लेने देते हैं।",
            "ta": "Conditionals உங்கள் program முடிவுகளை எடுக்க அனுமதிக்கிறது."
        }
    },
    "recursion": {
        "patterns": [r'def\s+(\w+).*:\s*.*\1\('],
        "name": "Recursion",
        "difficulty": "Intermediate",
        "explanation": {
            "en": "Recursion is when a function calls itself. It's like a mirror reflecting another mirror. Useful for problems that can be broken into smaller similar problems.",
            "hi": "Recursion तब होता है जब एक function खुद को call करता है। यह एक mirror की तरह है जो दूसरे mirror को reflect करता है।",
            "ta": "Recursion என்பது ஒரு function தன்னைத்தானே அழைப்பது."
        }
    },
    "lists": {
        "patterns": [r'\[.*\]', r'\.append\(', r'\.extend\('],
        "name": "Lists",
        "difficulty": "Beginner",
        "explanation": {
            "en": "Lists store multiple items in a single variable. You can add, remove, and access items by their position.",
            "hi": "Lists एक single variable में multiple items store करते हैं।",
            "ta": "Lists ஒரே variable இல் பல items சேமிக்கிறது."
        }
    },
    "dictionaries": {
        "patterns": [r'\{.*:.*\}', r'\.keys\(', r'\.values\('],
        "name": "Dictionaries",
        "difficulty": "Intermediate",
        "explanation": {
            "en": "Dictionaries store data in key-value pairs. Like a real dictionary where you look up a word (key) to find its meaning (value).",
            "hi": "Dictionaries data को key-value pairs में store करते हैं।",
            "ta": "Dictionaries தரவை key-value pairs இல் சேமிக்கிறது."
        }
    }
}

# Three-Level Hint System
def generate_hints(code: str, error_type: str, error_message: str, language: str = "en") -> List[str]:
    """Generate three levels of hints instead of direct answers"""
    
    hints = []
    
    if error_type == "IndentationError":
        hints = [
            "💡 Hint 1: Look at the spacing before your code lines",
            "💡 Hint 2: Code inside loops, functions, or if statements must be indented",
            "💡 Hint 3: Use 4 spaces (or 1 tab) before the print statement"
        ]
    
    elif error_type == "SyntaxError":
        if ":" in error_message or "expected ':'" in error_message:
            hints = [
                "💡 Hint 1: Check the end of your for/if/while/def line",
                "💡 Hint 2: Python requires a colon (:) after certain statements",
                "💡 Hint 3: Add a colon (:) at the end of the line mentioned in the error"
            ]
        elif "(" in error_message or ")" in error_message:
            hints = [
                "💡 Hint 1: Count your opening and closing brackets",
                "💡 Hint 2: Every ( needs a matching )",
                "💡 Hint 3: Check if you closed all your brackets properly"
            ]
        else:
            hints = [
                "💡 Hint 1: Read the error message carefully - it tells you what's wrong",
                "💡 Hint 2: Check for missing colons, brackets, or quotes",
                "💡 Hint 3: Look at the line number mentioned in the error"
            ]
    
    elif error_type == "NameError":
        var_name = error_message.split("'")[1] if "'" in error_message else "variable"
        hints = [
            f"💡 Hint 1: Python doesn't know what '{var_name}' means",
            f"💡 Hint 2: Did you define '{var_name}' before using it?",
            f"💡 Hint 3: Add a line like: {var_name} = some_value before using it"
        ]
    
    elif error_type == "TypeError":
        hints = [
            "💡 Hint 1: You're mixing different types of data",
            "💡 Hint 2: Check if you're adding numbers to text, or similar mismatches",
            "💡 Hint 3: Use int(), str(), or float() to convert between types"
        ]
    
    else:
        hints = [
            "💡 Hint 1: Read the error message - it contains clues",
            "💡 Hint 2: Check the line number where the error occurred",
            "💡 Hint 3: Look for common mistakes like typos or missing symbols"
        ]
    
    return hints

def detect_concepts(code: str, language: str = "en") -> List[Dict]:
    """Automatically detect what concepts the student is learning"""
    
    detected = []
    
    for concept_id, concept_data in CONCEPT_PATTERNS.items():
        for pattern in concept_data["patterns"]:
            if re.search(pattern, code, re.IGNORECASE):
                detected.append({
                    "concept": concept_data["name"],
                    "difficulty": concept_data["difficulty"],
                    "explanation": concept_data["explanation"].get(language, concept_data["explanation"]["en"])
                })
                break
    
    return detected

def explain_logic_step_by_step(code: str, language: str = "en") -> str:
    """Explain the logic and thinking process, not just the fix"""
    
    explanation = "🧠 Let's understand the logic:\n\n"
    
    try:
        tree = ast.parse(code)
        step = 1
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                explanation += f"Step {step}: Define a function called '{node.name}'\n"
                explanation += f"   → This creates a reusable block of code\n"
                step += 1
            
            elif isinstance(node, ast.For):
                explanation += f"Step {step}: Create a loop that repeats\n"
                explanation += f"   → The loop will execute multiple times\n"
                step += 1
            
            elif isinstance(node, ast.If):
                explanation += f"Step {step}: Check a condition\n"
                explanation += f"   → Code runs only if the condition is true\n"
                step += 1
            
            elif isinstance(node, ast.Return):
                explanation += f"Step {step}: Return a value from the function\n"
                explanation += f"   → This sends the result back to whoever called the function\n"
                step += 1
        
        explanation += "\n💡 This is the thinking process behind your code!"
        
    except:
        explanation = "🧠 Your code structure:\n\n"
        explanation += "The code defines logic that will execute step by step.\n"
        explanation += "Each line is processed in order from top to bottom."
    
    return explanation

def visualize_execution(code: str, language: str = "en") -> Optional[str]:
    """Create a visual tree of code execution (especially for recursion)"""
    
    # Check if code contains recursion
    try:
        tree = ast.parse(code)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                func_name = node.name
                # Check if function calls itself
                for child in ast.walk(node):
                    if isinstance(child, ast.Call):
                        if isinstance(child.func, ast.Name) and child.func.id == func_name:
                            # Found recursion!
                            return f"""🌳 Execution Visualization:

{func_name}(n)
  └─ {func_name}(n-1)
     └─ {func_name}(n-2)
        └─ {func_name}(n-3)
           └─ ... continues until base case

💡 Each call waits for the next one to finish, then returns its result back up the tree."""
    
    except:
        pass
    
    return None

def generate_practice_problems(concept: str, language: str = "en") -> List[Dict]:
    """Generate practice problems based on detected concept"""
    
    problems = {
        "loops": [
            {
                "title": "Print Numbers 1-10",
                "description": "Write a loop that prints numbers from 1 to 10",
                "difficulty": "Easy",
                "hint": "Use range(1, 11)"
            },
            {
                "title": "Even Numbers",
                "description": "Print only even numbers from 1 to 20",
                "difficulty": "Medium",
                "hint": "Use the modulo operator % to check if a number is even"
            },
            {
                "title": "Multiplication Table",
                "description": "Print the multiplication table of 5",
                "difficulty": "Medium",
                "hint": "Multiply 5 by each number in the loop"
            }
        ],
        "functions": [
            {
                "title": "Square Function",
                "description": "Create a function that returns the square of a number",
                "difficulty": "Easy",
                "hint": "Use def and return keywords"
            },
            {
                "title": "Max of Two",
                "description": "Write a function that returns the larger of two numbers",
                "difficulty": "Medium",
                "hint": "Use an if statement to compare"
            }
        ],
        "conditionals": [
            {
                "title": "Positive or Negative",
                "description": "Check if a number is positive, negative, or zero",
                "difficulty": "Easy",
                "hint": "Use if, elif, and else"
            },
            {
                "title": "Grade Calculator",
                "description": "Convert a score (0-100) to a letter grade (A, B, C, D, F)",
                "difficulty": "Medium",
                "hint": "Use multiple if-elif statements"
            }
        ]
    }
    
    return problems.get(concept.lower(), [])

def explain_thinking_process(code: str, error_type: Optional[str], language: str = "en") -> str:
    """Explain the student's thinking and guide them to better logic"""
    
    response = "🎯 Understanding Your Thinking:\n\n"
    
    # Analyze what the student was trying to do
    if "for" in code and error_type == "IndentationError":
        response += "✓ Your idea is correct: You want to use a loop\n"
        response += "✗ Implementation issue: The code inside the loop needs to be indented\n\n"
        response += "💡 Better approach:\n"
        response += "Think of indentation as showing what's 'inside' the loop.\n"
        response += "Everything that should repeat must be indented."
    
    elif "def" in code and "return" not in code:
        response += "✓ Your idea is correct: You're creating a function\n"
        response += "💡 Consider adding: A return statement to send back a result\n\n"
        response += "Functions are like machines - they take input and give output.\n"
        response += "Use 'return' to specify what output the function gives."
    
    elif error_type == "NameError":
        response += "✓ Your thinking: You want to use a variable\n"
        response += "✗ Missing step: You need to create the variable first\n\n"
        response += "💡 Better logic:\n"
        response += "1. First, create the variable: x = 10\n"
        response += "2. Then, use it: print(x)"
    
    else:
        response += "Your approach shows good problem-solving thinking!\n"
        response += "Let's refine the implementation to match your logic."
    
    return response

def get_curriculum_content(grade: int, language: str = "en") -> Dict:
    """Get structured learning content aligned with school curriculum"""
    
    curriculum = {
        9: {
            "topics": ["Variables", "Data Types", "Input/Output", "Basic Operators"],
            "description": "Introduction to Programming Concepts"
        },
        10: {
            "topics": ["Conditionals", "Loops", "Lists", "Strings"],
            "description": "Control Flow and Data Structures"
        },
        11: {
            "topics": ["Functions", "Recursion", "File Handling", "Dictionaries"],
            "description": "Advanced Programming Concepts"
        },
        12: {
            "topics": ["OOP", "Data Structures", "Algorithms", "Database"],
            "description": "Object-Oriented Programming and Applications"
        }
    }
    
    return curriculum.get(grade, curriculum[9])
