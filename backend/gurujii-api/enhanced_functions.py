"""
Enhanced Gurujii AI Functions
Advanced code analysis, explanation, debugging, and improvement features
"""

import ast
import re

def analyze_code_structure(code):
    """Analyze code structure and extract information"""
    analysis = {
        'functions': [],
        'variables': [],
        'loops': [],
        'conditionals': [],
        'imports': [],
        'complexity': 'Simple'
    }
    
    try:
        tree = ast.parse(code)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                analysis['functions'].append(node.name)
            elif isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        analysis['variables'].append(target.id)
            elif isinstance(node, (ast.For, ast.While)):
                analysis['loops'].append(type(node).__name__)
            elif isinstance(node, ast.If):
                analysis['conditionals'].append('if')
            elif isinstance(node, (ast.Import, ast.ImportFrom)):
                analysis['imports'].append('import')
        
        # Determine complexity
        total_constructs = len(analysis['functions']) + len(analysis['loops']) + len(analysis['conditionals'])
        if total_constructs > 5:
            analysis['complexity'] = 'Complex'
        elif total_constructs > 2:
            analysis['complexity'] = 'Moderate'
            
    except:
        pass
    
    return analysis

def explain_code_detailed(code, generator=None, translate_func=None, user_language="en"):
    """Provide detailed code explanation"""
    
    # Analyze code structure
    analysis = analyze_code_structure(code)
    
    # Generate explanation using LLM if available
    if generator:
        prompt = f"""<|system|>
You are Gurujii, an expert coding teacher. Explain this Python code clearly.
<|user|>
Explain this code:

{code}

Provide:
1. What the code does
2. Step-by-step breakdown
3. Key concepts
<|assistant|>"""

        try:
            result = generator(prompt, max_new_tokens=250, do_sample=True, temperature=0.7)
            explanation = result[0]["generated_text"]
            
            # Extract only the assistant's response
            if "<|assistant|>" in explanation:
                explanation = explanation.split("<|assistant|>")[-1].strip()
            elif "Provide:" in explanation:
                parts = explanation.split("Provide:")
                if len(parts) > 1:
                    explanation = parts[0].strip()
            
            # Add code analysis
            explanation_parts = [f"📚 Code Explanation:\n\n{explanation}"]
            
            if analysis['functions']:
                explanation_parts.append(f"\n\n🔧 Functions: {', '.join(analysis['functions'])}")
            
            if analysis['loops']:
                explanation_parts.append(f"\n🔄 Loops: {len(analysis['loops'])}")
            
            if analysis['conditionals']:
                explanation_parts.append(f"\n🔀 Conditionals: {len(analysis['conditionals'])}")
            
            explanation_parts.append(f"\n\n📊 Complexity: {analysis['complexity']}")
            
            full_explanation = ''.join(explanation_parts)
            
            # Translate if needed
            if user_language != "en" and translate_func:
                full_explanation = translate_func(full_explanation, user_language)
            
            return {
                "explanation": full_explanation,
                "hasError": False,
                "analysis": analysis,
                "detectedLanguage": user_language
            }
            
        except Exception as e:
            print(f"LLM explanation error: {e}")
    
    # Fallback explanation
    explanation = f"""📚 Code Analysis:

This code contains:
- {len(analysis['functions'])} function(s)
- {len(analysis['variables'])} variable(s)
- {len(analysis['loops'])} loop(s)
- {len(analysis['conditionals'])} conditional(s)

Complexity: {analysis['complexity']}

The code appears to be working correctly!"""
    
    return {
        "explanation": explanation,
        "hasError": False,
        "analysis": analysis,
        "detectedLanguage": user_language
    }

def generate_auto_fix(code, error_type, error_message):
    """Generate automatic code fix suggestions"""
    
    fixes = []
    
    if error_type == "SyntaxError":
        if "expected ':'" in error_message or "invalid syntax" in error_message:
            fixes.append("🔧 Suggested Fix: Add a colon (:) at the end of the line")
            fixes.append("Example: if condition:")
        elif "unexpected EOF" in error_message:
            fixes.append("🔧 Suggested Fix: Check for unclosed brackets or quotes")
    
    elif error_type == "NameError":
        if "is not defined" in error_message:
            var_name = error_message.split("'")[1] if "'" in error_message else "variable"
            fixes.append(f"🔧 Suggested Fix: Define '{var_name}' before using it")
            fixes.append(f"Example: {var_name} = value")
    
    elif error_type == "IndentationError":
        fixes.append("🔧 Suggested Fix: Use consistent indentation (4 spaces)")
        fixes.append("Tip: Make sure all code blocks are properly indented")
    
    elif error_type == "TypeError":
        fixes.append("🔧 Suggested Fix: Check data types being used")
        fixes.append("Tip: Use str(), int(), or float() to convert types")
    
    if fixes:
        return "\n".join(fixes)
    
    return "🔧 Review the error message and check the syntax carefully"

def get_code_hints(code, translate_func=None, user_language="en"):
    """Provide helpful hints for improving code"""
    
    hints = []
    
    # Analyze code for common issues
    if "print" in code and "(" not in code:
        hints.append("💡 Hint: Use parentheses with print() in Python 3")
    
    if "for" in code and ":" not in code:
        hints.append("💡 Hint: Add a colon (:) after for loops")
    
    if "if" in code and ":" not in code:
        hints.append("💡 Hint: Add a colon (:) after if statements")
    
    if "def" in code:
        if "return" not in code:
            hints.append("💡 Hint: Consider adding a return statement")
        if '"""' not in code and "'''" not in code:
            hints.append("💡 Hint: Add a docstring to explain your function")
    
    # Check for variable naming
    variables = re.findall(r'\b([a-z])\s*=', code)
    if len(variables) > 2:
        hints.append("💡 Hint: Use descriptive variable names")
    
    # Check for comments
    if "#" not in code and len(code.split('\n')) > 5:
        hints.append("💡 Hint: Add comments to explain complex logic")
    
    if not hints:
        hints = [
            "💡 Your code looks good! General tips:",
            "• Use meaningful variable names",
            "• Add comments for complex logic",
            "• Handle edge cases and errors",
            "• Test with different inputs"
        ]
    
    response = "🎯 Coding Hints:\n\n" + "\n".join(hints)
    
    if user_language != "en" and translate_func:
        response = translate_func(response, user_language)
    
    return {
        "explanation": response,
        "hints": hints,
        "detectedLanguage": user_language
    }

def improve_code_suggestions(code, translate_func=None, user_language="en"):
    """Provide code improvement suggestions"""
    
    suggestions = []
    analysis = analyze_code_structure(code)
    
    suggestions.append("✨ Code Improvement Suggestions:\n")
    
    # Check for best practices
    if not code.strip().startswith('"""') and not code.strip().startswith("'''"):
        suggestions.append("1. Add a module docstring at the top")
    
    if analysis['functions']:
        suggestions.append("2. Ensure all functions have docstrings")
        suggestions.append("3. Use type hints for parameters")
    
    if len(code.split('\n')) > 20:
        suggestions.append("4. Break code into smaller functions")
    
    if "print" in code:
        suggestions.append("5. Consider using logging for production")
    
    # Add complexity analysis
    suggestions.append(f"\n📊 Current Complexity: {analysis['complexity']}")
    
    if analysis['complexity'] == 'Complex':
        suggestions.append("💡 Tip: Simplify by breaking into smaller functions")
    
    # Best practices
    suggestions.append("\n🌟 Best Practices:")
    suggestions.append("• Use meaningful names")
    suggestions.append("• Add error handling (try-except)")
    suggestions.append("• Write unit tests")
    suggestions.append("• Follow PEP 8 style guidelines")
    suggestions.append("• Add type hints")
    
    response = "\n".join(suggestions)
    
    if user_language != "en" and translate_func:
        response = translate_func(response, user_language)
    
    return {
        "explanation": response,
        "suggestions": suggestions,
        "complexity": analysis['complexity'],
        "detectedLanguage": user_language
    }
