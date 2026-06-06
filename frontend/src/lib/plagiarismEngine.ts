/**
 * PlagiarismEngine — NLP-based code originality detection and similarity analysis.
 * Provides structural fingerprinting, typing velocity analysis, and similarity scoring.
 */

export interface OriginalityReport {
  originalityScore: number; // 0 to 100 (100% means fully original)
  isPasteDetected: boolean;
  pasteVelocityCharPerSec: number;
  structuralSimilarityScore: number; // 0 to 100
  keystrokeConsistency: number; // 0 to 100
  verdict: 'Original' | 'Likely Typed' | 'Suspicious Paste' | 'Likely Plagiarized';
  details: {
    totalChars: number;
    pasteEvents: number;
    typingTimeSec: number;
    normalizedJaccard: number;
  };
}

/**
 * Normalizes code by removing comments, whitespaces, and standardizing variable/function names.
 * This reveals the underlying structural fingerprint of the code.
 */
export function generateStructuralFingerprint(code: string, language: string = 'javascript'): string {
  let normalized = code;

  // 1. Remove comments
  if (['python', 'mojo', 'ruby', 'r', 'php', 'elixir'].includes(language)) {
    // Remove single line comments starting with #
    normalized = normalized.replace(/#.*$/gm, '');
  }
  if (['javascript', 'typescript', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'swift', 'kotlin', 'scala', 'dart', 'zig'].includes(language)) {
    // Remove single line comments
    normalized = normalized.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    normalized = normalized.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  if (['sql', 'haskell'].includes(language)) {
    normalized = normalized.replace(/--.*$/gm, '');
  }

  // 2. Standardize variable/identifier names to a generic token 'V'
  // Avoid replacing language keywords
  const keywords = new Set([
    'def', 'function', 'class', 'public', 'private', 'static', 'void', 'int', 'double',
    'float', 'char', 'string', 'bool', 'boolean', 'let', 'const', 'var', 'if', 'else',
    'for', 'while', 'return', 'import', 'from', 'package', 'fn', 'struct', 'impl', 'use',
    'puts', 'print', 'printf', 'println', 'console', 'log', 'fmt', 'std', 'io', 'using',
    'namespace', 'nil', 'null', 'true', 'false', 'new', 'try', 'catch', 'throw'
  ]);

  // Replace words that aren't keywords or built-ins
  normalized = normalized.replace(/\b[a-zA-Z_]\w*\b/g, (match) => {
    if (keywords.has(match) || match.length <= 1) {
      return match;
    }
    return 'V';
  });

  // 3. Remove all whitespace, newlines, and punctuation that don't affect structure
  normalized = normalized.replace(/\s+/g, '');

  return normalized;
}

/**
 * Calculates Jaccard Similarity between two sets of n-grams.
 */
export function calculateJaccardSimilarity(str1: string, str2: string, n = 3): number {
  if (!str1 || !str2) return 0;
  
  const getNGrams = (str: string, size: number): Set<string> => {
    const ngrams = new Set<string>();
    for (let i = 0; i <= str.length - size; i++) {
      ngrams.add(str.substring(i, i + size));
    }
    return ngrams;
  };

  const setA = getNGrams(str1, n);
  const setB = getNGrams(str2, n);

  if (setA.size === 0 || setB.size === 0) return 0;

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

interface TypistTelemetry {
  characterCount: number;
  typingDurationMs: number;
  pasteCount: number;
  pastedCharCount: number;
  keystrokeTimestamps: number[];
}

/**
 * Analyses code input telemetry to produce an originality and integrity report.
 * Compares against a reference template if available.
 */
export function analyzeOriginality(
  currentCode: string,
  referenceTemplate: string,
  telemetry: TypistTelemetry,
  language: string = 'javascript'
): OriginalityReport {
  const normalizedCurrent = generateStructuralFingerprint(currentCode, language);
  const normalizedReference = generateStructuralFingerprint(referenceTemplate, language);

  // Structural similarity with the base template (if user only added a bit of code, Jaccard could be high.
  // But if similarity is 1.0, they wrote exactly the template).
  const jaccard = calculateJaccardSimilarity(normalizedCurrent, normalizedReference, 3);
  const structuralSimilarity = Math.round(jaccard * 100);

  // Evaluate paste impact
  const isPasteDetected = telemetry.pasteCount > 0 || telemetry.pastedCharCount > 50;
  const pasteVelocityCharPerSec = telemetry.typingDurationMs > 0
    ? (telemetry.pastedCharCount / (telemetry.typingDurationMs / 1000))
    : 0;

  // Keystroke typing speed consistency
  // If typing manually, intervals between keypresses have natural variance.
  // If pasted or automated, variance is extremely low or extremely high at points.
  let keystrokeConsistency = 100;
  if (telemetry.keystrokeTimestamps.length > 2) {
    const intervals: number[] = [];
    for (let i = 1; i < telemetry.keystrokeTimestamps.length; i++) {
      intervals.push(telemetry.keystrokeTimestamps[i] - telemetry.keystrokeTimestamps[i - 1]);
    }
    
    // Calculate standard deviation of typing intervals
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const sqDiffs = intervals.map(val => Math.pow(val - avgInterval, 2));
    const variance = sqDiffs.reduce((a, b) => a + b, 0) / intervals.length;
    const stdDev = Math.sqrt(variance);

    // Human typing typically has stdDev between 30ms and 300ms.
    // Extremely small stdDev (e.g. < 5ms) suggests programmatic entry.
    if (stdDev < 5 && intervals.length > 10) {
      keystrokeConsistency = 10; // Highly suspicious
    } else {
      // Normalize consistency score based on reasonable typing flow
      keystrokeConsistency = Math.max(0, Math.min(100, Math.round(100 - (stdDev / 10))));
    }
  }

  // Calculate Originality Score (0 - 100)
  // Higher score = More original
  let originalityScore = 100;

  // Deduction for copying starter code completely
  if (structuralSimilarity > 95 && currentCode.length === referenceTemplate.length) {
    originalityScore -= 30; // Simply didn't change the template
  }

  // Deduct based on pasted character ratio
  const totalChars = currentCode.length;
  if (totalChars > 0) {
    const pasteRatio = telemetry.pastedCharCount / totalChars;
    originalityScore -= Math.min(60, Math.round(pasteRatio * 70));
  }

  // Deduct for suspicious typing patterns
  if (keystrokeConsistency < 30) {
    originalityScore -= 20;
  }

  // Ensure score stays in bounds
  originalityScore = Math.max(0, Math.min(100, originalityScore));

  // Determine Verdict
  let verdict: OriginalityReport['verdict'] = 'Original';
  if (originalityScore < 40) {
    verdict = 'Likely Plagiarized';
  } else if (originalityScore < 70) {
    verdict = 'Suspicious Paste';
  } else if (originalityScore < 90) {
    verdict = 'Likely Typed';
  }

  return {
    originalityScore,
    isPasteDetected,
    pasteVelocityCharPerSec: Math.round(pasteVelocityCharPerSec * 10) / 10,
    structuralSimilarityScore: structuralSimilarity,
    keystrokeConsistency,
    verdict,
    details: {
      totalChars,
      pasteEvents: telemetry.pasteCount,
      typingTimeSec: Math.round(telemetry.typingDurationMs / 100) / 10,
      normalizedJaccard: jaccard
    }
  };
}
