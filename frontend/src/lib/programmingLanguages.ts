export interface ProgrammingLanguage {
  id: string;
  name: string;
  extension: string;
  icon: string;
  color: string;
  isSupported: boolean;
  description: string;
  starterCode: string;
  syllabus: string[];
}

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    icon: 'Py',
    color: '#3776AB',
    isSupported: true,
    description: 'Beginner-friendly, perfect for learning programming concepts',
    starterCode: `# Welcome to Python!
# Let's write your first program

def greet(name):
    return f"Hello, {name}!"

# Test the function
print(greet("World"))
`,
    syllabus: ['Variables & Data Types', 'Operators & Expressions', 'Control Flow (if-else)', 'Loops (for, while)', 'Functions', 'Lists & Tuples', 'Dictionaries', 'File I/O', 'OOP & Classes', 'Exception Handling']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    icon: 'JS',
    color: '#F7DF1E',
    isSupported: true,
    description: 'The language of the web, essential for web development',
    starterCode: `// Welcome to JavaScript!
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,
    syllabus: ['Variables (let, const, var)', 'Data Types & Arrays', 'Operators', 'Conditional Statements', 'Loops', 'Functions', 'DOM Manipulation', 'Event Handling', 'Asynchronous JS (Promises)', 'JSON & APIs']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    icon: 'TS',
    color: '#3178C6',
    isSupported: true,
    description: 'Type-safe superset of JavaScript that scales',
    starterCode: `// Welcome to TypeScript!
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,
    syllabus: ['Static Typing', 'Interfaces & Types', 'Classes & OOP', 'Generics', 'Modules & Namespaces']
  },
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    icon: 'Jv',
    color: '#007396',
    isSupported: true,
    description: 'Enterprise-standard, object-oriented programming language',
    starterCode: `// Welcome to Java!
public class Main {
    public static void main(String[] args) {
        String name = "World";
        System.out.println("Hello, " + name + "!");
    }
}
`,
    syllabus: ['JVM Basics', 'Control Statements', 'Arrays & Collections', 'OOP (Inheritance, Polymorphism)', 'Java Exception Handling']
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: 'cpp',
    icon: 'C+',
    color: '#00599C',
    isSupported: true,
    description: 'Powerful language for system programming and competitive coding',
    starterCode: `// Welcome to C++!
#include <iostream>
using namespace std;

int main() {
    string name = "World";
    cout << "Hello, " << name << "!" << endl;
    return 0;
}
`,
    syllabus: ['C++ Basics', 'Pointers & References', 'OOP Classes & Structs', 'Memory Management', 'STL Container Framework']
  },
  {
    id: 'c',
    name: 'C',
    extension: 'c',
    icon: 'C',
    color: '#A8B9CC',
    isSupported: true,
    description: 'Foundation of modern programming, great for understanding computers',
    starterCode: `/* Welcome to C! */
#include <stdio.h>

int main() {
    char name[] = "World";
    printf("Hello, %s!\\n", name);
    return 0;
}
`,
    syllabus: ['Variables & Expressions', 'Conditional Statements', 'Pointers & Addresses', 'Arrays & Strings', 'Dynamic Memory Allocation']
  },
  {
    id: 'csharp',
    name: 'C#',
    extension: 'cs',
    icon: 'C#',
    color: '#178600',
    isSupported: true,
    description: 'Elegant object-oriented language managed by .NET SDK',
    starterCode: `// Welcome to C#!
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}
`,
    syllabus: ['.NET Framework Core', 'Object Oriented Patterns', 'LINQ Queries', 'Asynchronous Programming']
  },
  {
    id: 'go',
    name: 'Go',
    extension: 'go',
    icon: 'Go',
    color: '#00ADD8',
    isSupported: true,
    description: 'Statically typed systems language built by Google',
    starterCode: `// Welcome to Go!
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
`,
    syllabus: ['Goroutines & Channels', 'Slices & Maps', 'Go Build & Modules', 'JSON Serialization']
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    icon: 'Rs',
    color: '#DEA584',
    isSupported: true,
    description: 'Extremely safe systems programming language with Cargo build tool',
    starterCode: `// Welcome to Rust!
fn main() {
    println!("Hello, World!");
}
`,
    syllabus: ['Ownership & Borrowing', 'Lifetimes & References', 'Cargo Build Toolchain', 'Pattern Matching', 'Concurrency Safety']
  },
  {
    id: 'php',
    name: 'PHP',
    extension: 'php',
    icon: 'PH',
    color: '#4F5D95',
    isSupported: true,
    description: 'Popular server-side scripting language for web apps',
    starterCode: `<?php
// Welcome to PHP!
echo "Hello, World!\n";
?>`,
    syllabus: ['Composer Dependency Management', 'PHP Syntax linting (php -l)', 'PHPStan Static Analysis', 'PHPUnit Testing']
  },
  {
    id: 'ruby',
    name: 'Ruby',
    extension: 'rb',
    icon: 'Rb',
    color: '#701516',
    isSupported: true,
    description: 'Dynamic scripting language focused on simplicity and productivity',
    starterCode: `# Welcome to Ruby!
puts "Hello, World!"
`,
    syllabus: ['Gems & Bundler', 'RSpec testing', 'Rails framework conventions', 'RuboCop reformatting']
  },
  {
    id: 'swift',
    name: 'Swift',
    extension: 'swift',
    icon: 'Sw',
    color: '#F05138',
    isSupported: true,
    description: 'Apples compiled systems language for iOS/macOS',
    starterCode: `// Welcome to Swift!
print("Hello, World!")
`,
    syllabus: ['Swift Package Manager (SPM)', 'XCTest framework', 'Optionality & Memory Safety', 'SwiftUI Views']
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    extension: 'kt',
    icon: 'Kt',
    color: '#7F52FF',
    isSupported: true,
    description: 'JVM language built by JetBrains, standard for Android',
    starterCode: `// Welcome to Kotlin!
fun main() {
    println("Hello, World!")
}
`,
    syllabus: ['Gradle Build tasks', 'Kotlin Multiplatform (KMP)', 'Null Safety', 'Coroutines & Flows', 'Espresso Testing']
  },
  {
    id: 'scala',
    name: 'Scala',
    extension: 'scala',
    icon: 'Sc',
    color: '#DC322F',
    isSupported: true,
    description: 'High-level language combining OO and functional programming on JVM',
    starterCode: `// Welcome to Scala!
object Main extends App {
    println("Hello, World!")
}
`,
    syllabus: ['sbt compile & assembly', 'Functional Design Patterns', 'ScalaTest suites', 'Property Based Testing']
  },
  {
    id: 'dart',
    name: 'Dart',
    extension: 'dart',
    icon: 'Dr',
    color: '#00B4AB',
    isSupported: true,
    description: 'Google client-optimized language for cross-platform Flutter apps',
    starterCode: `// Welcome to Dart!
void main() {
    print("Hello, World!");
}
`,
    syllabus: ['pub get dependencies', 'flutter build commandlines', 'Widget UI Validation', 'Integration testing']
  },
  {
    id: 'r',
    name: 'R',
    extension: 'r',
    icon: 'R',
    color: '#276DC3',
    isSupported: true,
    description: 'Statistical computing and data science environment',
    starterCode: `# Welcome to R!
numbers <- c(10, 20, 30, 40, 50)
mean_value <- mean(numbers)
print(paste("Mean:", mean_value))
`,
    syllabus: ['R CMD check', 'devtools documentation', 'styler visual formatting', 'testthat logic assertions']
  },
  {
    id: 'sql',
    name: 'SQL',
    extension: 'sql',
    icon: 'DB',
    color: '#336791',
    isSupported: true,
    description: 'Query language for managing databases',
    starterCode: `-- Welcome to SQL!
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    marks INTEGER
);
INSERT INTO students VALUES (1, 'Rahul', 85);
SELECT * FROM students;
`,
    syllabus: ['SELECT and WHERE', 'sqlfluff database lints', 'pgTAP schema assertions', 'JOIN tables']
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    extension: 'graphql',
    icon: 'GQ',
    color: '#E10098',
    isSupported: true,
    description: 'Query language for APIs and schema types',
    starterCode: `# Welcome to GraphQL!
type Query {
    hello: String!
}
`,
    syllabus: ['Schema definition types', 'graphql-codegen', 'EasyGraphQL validations']
  },
  {
    id: 'zig',
    name: 'Zig',
    extension: 'zig',
    icon: 'Zg',
    color: '#EC915F',
    isSupported: true,
    description: 'General purpose systems language focused on robustness',
    starterCode: `// Welcome to Zig!
const std = @import("std");

pub fn main() !void {
    std.debug.print("Hello, World!\\n", .{});
}
`,
    syllabus: ['zig build buildsystem', 'std.testing assertions', 'Zig manual memory tracking']
  },
  {
    id: 'mojo',
    name: 'Mojo',
    extension: 'mojo',
    icon: 'Mj',
    color: '#FF4C4C',
    isSupported: true,
    description: 'Bridges Python simplicity with C++ systems speed and GPU',
    starterCode: `# Welcome to Mojo!
fn main():
    print("Hello, World!")
`,
    syllabus: ['mojo build static binaries', 'Modular packages', 'Mojo GPU tensor kernels']
  },
  {
    id: 'haskell',
    name: 'Haskell',
    extension: 'hs',
    icon: 'Hs',
    color: '#5D4F85',
    isSupported: true,
    description: 'Purely functional lazy programming language',
    starterCode: `-- Welcome to Haskell!
main :: IO ()
main = putStrLn "Hello, World!"
`,
    syllabus: ['cabal build environments', 'GHCi REPL playground', 'QuickCheck property checks', 'Tasty assertions']
  },
  {
    id: 'elixir',
    name: 'Elixir',
    extension: 'ex',
    icon: 'Ex',
    color: '#6E4A7E',
    isSupported: true,
    description: 'Concurrent language built on the Erlang BEAM VM',
    starterCode: `# Welcome to Elixir!
IO.puts "Hello, World!"
`,
    syllabus: ['mix deps & compiles', 'ExUnit test assertions', 'Dialyzer processes tracking', 'BEAM VM clustering']
  },
  {
    id: 'julia',
    name: 'Julia',
    extension: 'jl',
    icon: 'Jl',
    color: '#A270BA',
    isSupported: true,
    description: 'High-performance LLVM-driven language for array computing',
    starterCode: `# Welcome to Julia!
println("Hello, World!")
`,
    syllabus: ['Pkg.instantiate dependencies', 'Julia LLVM Engine', 'using Test assertions', 'Microbenchmarks libraries']
  }
];

export const getLanguageById = (id: string): ProgrammingLanguage | undefined => {
  return programmingLanguages.find(lang => lang.id === id);
};

export const getSupportedLanguages = (): ProgrammingLanguage[] => {
  return programmingLanguages.filter(lang => lang.isSupported);
};

export const getLanguageColor = (id: string): string => {
  const lang = getLanguageById(id);
  return lang?.color || '#6C5CE7';
};

// Monaco language code parser
export const getMonacoLanguage = (languageId: string): string => {
  const mapping: Record<string, string> = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'typescript',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'csharp',
    go: 'go',
    rust: 'rust',
    php: 'php',
    ruby: 'ruby',
    swift: 'swift',
    kotlin: 'kotlin',
    scala: 'scala',
    dart: 'dart',
    r: 'r',
    sql: 'sql',
    graphql: 'graphql',
    zig: 'zig',
    mojo: 'python', // Mojo is Python syntax compatible
    haskell: 'haskell',
    elixir: 'elixir',
    julia: 'julia'
  };
  return mapping[languageId] || 'plaintext';
};

export const simulateCodeExecution = (code: string, languageId: string): string => {
  if (!code.trim()) {
    return 'Error: Code is empty';
  }

  // Check for common syntax mistakes based on language
  if (languageId === 'python') {
    if (code.includes('print ') && !code.includes('print(')) {
      return 'SyntaxError: Missing parentheses in call to \'print\'. Did you mean print(...)?';
    }
    if (code.includes('def ') && !code.includes(':')) {
      return 'SyntaxError: expected \':\' at the end of function definition';
    }
    if (code.includes('indent') || (code.includes('  ') && !code.includes('    ') && code.includes('\n'))) {
      return 'IndentationError: unexpected indent';
    }
    // Simulate successful run
    if (code.includes('greet("World")')) {
      return 'Hello, World!';
    }
    return '✓ Code executed successfully!\n(No print statements executed or dynamic output generated)';
  }

  if (languageId === 'javascript' || languageId === 'typescript') {
    if (code.includes('greet("World")') || code.includes('greet(\'World\')')) {
      return 'Hello, World!';
    }
    if (code.includes('console.log') && !code.includes(';')) {
      return 'Hello, World!';
    }
    return '✓ Code executed successfully!';
  }

  if (languageId === 'cpp' || languageId === 'c') {
    if (code.includes('cout <<') && !code.includes(';')) {
      return 'error: expected \';\' before \'return\'';
    }
    if (code.includes('printf') && !code.includes(';')) {
      return 'error: expected \';\' before \'return\'';
    }
    return 'Hello, World!\n\nProcess exited with status 0';
  }

  if (languageId === 'java') {
    if (!code.includes('class Main') && !code.includes('class ')) {
      return 'error: class Main not found, please define class Main';
    }
    if (code.includes('System.out.println') && !code.includes(';')) {
      return 'error: \';\' expected';
    }
    return 'Hello, World!';
  }

  // Fallback for all other languages
  return `✓ ${languageId.toUpperCase()} compiled and run successfully!\nOutput: Hello from CodeSahayak Polyglot sandbox!`;
};
