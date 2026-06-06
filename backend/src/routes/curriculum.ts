// curriculum.ts — Board/grade/topic curriculum routes
// Serves NCERT/VTU/Anna University topic trees with starter code

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Inline curriculum data (subset — covers the most common boards)
// The full curriculum_seed.ts data would be imported here in production
const CURRICULUM: Record<string, Record<string, {
  boardId: string;
  programId: string;
  name: string;
  topics: Array<{
    id: string;
    name: string;
    concepts: string[];
    starterCode?: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  }>;
}>> = {
  'NCERT': {
    'CS-11': {
      boardId: 'NCERT',
      programId: 'CS-11',
      name: 'NCERT Class 11 Computer Science',
      topics: [
        {
          id: 'variables',
          name: 'Variables & Data Types',
          concepts: ['variables', 'data_types', 'input_output'],
          difficulty: 'EASY',
          starterCode: `# Variables & Data Types\n# Let's learn about different types of data in Python\n\n# Integer\nage = 16\nprint(f"Age: {age}")\n\n# String\nname = "Priya"\nprint(f"Name: {name}")\n\n# Float\nmarks = 85.5\nprint(f"Marks: {marks}")\n\n# Boolean\nis_student = True\nprint(f"Is Student: {is_student}")\n\n# Your turn: Create variables for your own data\n`,
        },
        {
          id: 'control_flow',
          name: 'Control Flow (if/else)',
          concepts: ['conditionals', 'boolean_logic', 'nested_if'],
          difficulty: 'EASY',
          starterCode: `# Control Flow\n# Decide what to do based on conditions\n\nmarks = float(input("Enter your marks: "))\n\nif marks >= 90:\n    print("Grade: A+ - Excellent!")\nelif marks >= 75:\n    print("Grade: A - Very Good")\nelif marks >= 60:\n    print("Grade: B - Good")\nelif marks >= 45:\n    print("Grade: C - Average")\nelse:\n    print("Grade: F - Please try harder")\n`,
        },
        {
          id: 'loops',
          name: 'Loops (for, while)',
          concepts: ['for_loop', 'while_loop', 'break_continue'],
          difficulty: 'EASY',
          starterCode: `# Loops\n# Repeat actions efficiently\n\n# for loop\nprint("Counting 1 to 5:")\nfor i in range(1, 6):\n    print(i)\n\n# while loop\nprint("\\nCountdown:")\nn = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Done!")\n`,
        },
        {
          id: 'functions',
          name: 'Functions',
          concepts: ['functions', 'parameters', 'return_values', 'scope'],
          difficulty: 'MEDIUM',
          starterCode: `# Functions\n# Reusable blocks of code\n\ndef greet(name, language="en"):\n    """Greet someone in their language"""\n    greetings = {\n        "en": "Hello",\n        "hi": "नमस्ते",\n        "ta": "வணக்கம்",\n        "bn": "নমস্কার"\n    }\n    greeting = greetings.get(language, "Hello")\n    return f"{greeting}, {name}!"\n\n# Call the function\nprint(greet("Rahul"))\nprint(greet("Priya", "hi"))\nprint(greet("Kumar", "ta"))\n`,
        },
        {
          id: 'lists',
          name: 'Lists & Arrays',
          concepts: ['lists', 'indexing', 'slicing', 'list_methods'],
          difficulty: 'MEDIUM',
          starterCode: `# Lists\n# Store multiple values\n\nstudents = ["Priya", "Rahul", "Ananya", "Mohammed", "Divya"]\n\n# Access elements\nprint("First student:", students[0])\nprint("Last student:", students[-1])\n\n# List operations\nstudents.append("Kiran")\nprint("After adding:", students)\n\nstudents.sort()\nprint("Sorted:", students)\n\n# Find average marks\nmarks = [85, 92, 78, 95, 88]\naverage = sum(marks) / len(marks)\nprint(f"Average marks: {average:.1f}")\n`,
        },
        {
          id: 'strings',
          name: 'String Operations',
          concepts: ['strings', 'string_methods', 'formatting', 'slicing'],
          difficulty: 'EASY',
          starterCode: `# String Operations\n# Work with text data\n\nname = "CodeSahayak"\n\n# String methods\nprint(name.upper())       # Uppercase\nprint(name.lower())       # Lowercase\nprint(len(name))          # Length\nprint(name.replace("Code", "कोड"))  # Replace\n\n# String slicing\nprint(name[0:4])          # First 4 chars\nprint(name[::-1])         # Reverse\n\n# Format strings\nlang = "Python"\nprint(f"Learning {lang} with {name}!")\n`,
        },
        {
          id: 'sorting',
          name: 'Sorting Algorithms',
          concepts: ['bubble_sort', 'selection_sort', 'insertion_sort', 'complexity'],
          difficulty: 'HARD',
          starterCode: `# Sorting Algorithms\n# Learn how computers organize data\n\ndef bubble_sort(arr):\n    """Sort array using bubble sort"""\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# Test it\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nprint("Original:", numbers)\nsorted_numbers = bubble_sort(numbers.copy())\nprint("Sorted:", sorted_numbers)\n\n# Challenge: Can you implement selection sort?\n`,
        },
      ],
    },
    'CS-12': {
      boardId: 'NCERT',
      programId: 'CS-12',
      name: 'NCERT Class 12 Computer Science',
      topics: [
        {
          id: 'recursion',
          name: 'Recursion',
          concepts: ['recursion', 'base_case', 'call_stack', 'memoization'],
          difficulty: 'HARD',
          starterCode: `# Recursion\n# A function that calls itself\n\ndef factorial(n):\n    """Calculate factorial using recursion"""\n    if n == 0 or n == 1:  # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n\ndef fibonacci(n):\n    """Fibonacci sequence"""\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint("5! =", factorial(5))\nprint("Fibonacci(10) =", fibonacci(10))\n`,
        },
        {
          id: 'oop',
          name: 'Object-Oriented Programming',
          concepts: ['classes', 'objects', 'inheritance', 'encapsulation', 'polymorphism'],
          difficulty: 'HARD',
          starterCode: `# Object-Oriented Programming\n# Model real-world things as objects\n\nclass Student:\n    def __init__(self, name, roll_no, marks):\n        self.name = name\n        self.roll_no = roll_no\n        self.__marks = marks  # Private\n    \n    def get_grade(self):\n        if self.__marks >= 90: return "A+"\n        elif self.__marks >= 75: return "A"\n        elif self.__marks >= 60: return "B"\n        else: return "C"\n    \n    def __str__(self):\n        return f"Student({self.name}, Roll: {self.roll_no}, Grade: {self.get_grade()})"\n\n# Create students\ns1 = Student("Priya", "CS001", 95)\ns2 = Student("Rahul", "CS002", 72)\nprint(s1)\nprint(s2)\n`,
        },
      ],
    },
  },
  'VTU': {
    'CSE-1': {
      boardId: 'VTU',
      programId: 'CSE-1',
      name: 'VTU CSE Semester 1',
      topics: [
        {
          id: 'c_basics',
          name: 'C Programming Basics',
          concepts: ['variables', 'data_types', 'operators', 'io'],
          difficulty: 'EASY',
          starterCode: `# C equivalent in Python for VTU students\n# (We'll use Python but follow C concepts)\n\n# Variables and data types\nnum = 42          # int in C: int num = 42;\ndecimal = 3.14    # float in C: float decimal = 3.14;\ncharacter = 'A'   # char in C: char ch = 'A';\n\nprint(f"Integer: {num}")\nprint(f"Float: {decimal}")\nprint(f"Character: {character}")\n\n# Operators\na, b = 10, 3\nprint(f"Addition: {a + b}")\nprint(f"Division: {a / b:.2f}")\nprint(f"Modulo: {a % b}")\n`,
        },
      ],
    },
  },
};

// GET /api/curriculum — list all available boards
router.get('/', authenticate, (_req, res) => {
  const boards = Object.keys(CURRICULUM).map((boardId) => ({
    boardId,
    programs: Object.keys(CURRICULUM[boardId]).map((programId) => ({
      programId,
      name: CURRICULUM[boardId][programId].name,
      topicCount: CURRICULUM[boardId][programId].topics.length,
    })),
  }));
  res.json({ boards });
});

// GET /api/curriculum/:boardId/:programId — get full curriculum
router.get('/:boardId/:programId', authenticate, (req, res) => {
  const boardId = req.params.boardId as string;
  const programId = req.params.programId as string;
  const curriculum = CURRICULUM[boardId]?.[programId];
  if (!curriculum) {
    return res.status(404).json({ error: 'Curriculum not found' });
  }
  // Return topics without full starter code for list view
  res.json({
    ...curriculum,
    topics: curriculum.topics.map((t: any) => ({
      id: t.id,
      name: t.name,
      concepts: t.concepts,
      difficulty: t.difficulty,
    })),
  });
});

// GET /api/curriculum/:boardId/:programId/topic/:topicId — get topic with starter code
router.get('/:boardId/:programId/topic/:topicId', authenticate, (req, res) => {
  const boardId = req.params.boardId as string;
  const programId = req.params.programId as string;
  const topicId = req.params.topicId as string;
  const curriculum = CURRICULUM[boardId]?.[programId];
  if (!curriculum) {
    return res.status(404).json({ error: 'Curriculum not found' });
  }
  const topic = curriculum.topics.find((t: any) => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  res.json({ topic });
});

export default router;
