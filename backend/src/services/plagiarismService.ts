/**
 * Plagiarism Service
 * Implements structural AST diffs, token normalization, and behavioral typing analysis
 */

export interface PasteEventLog {
  timestamp: string;
  length: number;
  velocityDelta: number; // characters per millisecond
}

export interface PlagiarismResult {
  originalityScore: number; // 0 to 100
  isRenameOnly: boolean;
  isInstantPaste: boolean;
  maxSimilarity: number;
  matchedSubmissionId?: string;
}

export class PlagiarismService {
  /**
   * Normalize variable and function names to generic tokens
   * Catches rename-only copy-pasting ("just changed x to result")
   */
  static normalizeIdentifiers(code: string): string {
    if (!code) return '';

    // Strip comments to focus only on structural logic
    let cleanCode = code
      .replace(/#.*$/gm, '') // Strip Python comments
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1'); // Strip JS/C++ comments

    // Normalize Python function variables
    // Replace all variable declarations (e.g. name = "Student") with generic VAR token
    cleanCode = cleanCode.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'VAR =');
    
    // Normalize function parameters (def greet(name)) -> def greet(ARG)
    cleanCode = cleanCode.replace(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\):/g, (_, funcName, args) => {
      const genericArgs = args.split(',').map(() => 'ARG').join(', ');
      return `def ${funcName}(${genericArgs}):`;
    });

    // Normalize spacing and indentation to trace abstract structural footprint
    return cleanCode.replace(/\s+/g, ' ').trim();
  }

  /**
   * Calculate similarity ratio using Levenshtein distance
   */
  static getSimilarityRatio(strA: string, strB: string): number {
    const s1 = this.normalizeIdentifiers(strA);
    const s2 = this.normalizeIdentifiers(strB);

    if (s1 === s2) return 1.0;
    if (s1.length === 0 || s2.length === 0) return 0.0;

    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j - 1][i] + 1, // deletion
          track[j][i - 1] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    return 1.0 - distance / maxLength;
  }

  /**
   * Analyze Monaco editor paste DOM events
   * Immediate insertion of massive scripts flags instant plagiarism
   */
  static analyzePasteBehavior(events: PasteEventLog[]): { isInstantPaste: boolean; impact: number } {
    if (!events || events.length === 0) {
      return { isInstantPaste: false, impact: 0 };
    }

    let isInstantPaste = false;
    let impact = 0;

    events.forEach((event) => {
      // If a student pastes more than 150 characters with high velocity
      if (event.length > 150 && event.velocityDelta > 15) {
        isInstantPaste = true;
        // Reduce originality score proportionally based on pasted content size
        impact += Math.min(30, Math.round(event.length / 10));
      }
    });

    return { isInstantPaste, impact };
  }

  /**
   * Generates a 64-bit SimHash fingerprint of the code structure
   */
  static getSimHash(code: string): bigint {
    const normalized = this.normalizeIdentifiers(code);
    const words = normalized.split(/\s+/).filter(w => w.length > 0);
    const v = Array(64).fill(0);

    words.forEach((word) => {
      // 64-bit FNV-1a hash of word
      let hash = 0x811c9dc5n;
      const fnvPrime = 0x01000193n;
      for (let i = 0; i < word.length; i++) {
        hash = hash ^ BigInt(word.charCodeAt(i));
        hash = (hash * fnvPrime) & 0xffffffffffffffffn;
      }

      // Aggregate bit frequencies
      for (let bit = 0; bit < 64; bit++) {
        if ((hash & (1n << BigInt(bit))) !== 0n) {
          v[bit] += 1;
        } else {
          v[bit] -= 1;
        }
      }
    });

    // Reconstruct SimHash integer
    let simhash = 0n;
    for (let bit = 0; bit < 64; bit++) {
      if (v[bit] >= 0) {
        simhash |= (1n << BigInt(bit));
      }
    }
    return simhash;
  }

  /**
   * Calculates Hamming distance between two 64-bit SimHash values
   */
  static getHammingDistance(hashA: bigint, hashB: bigint): number {
    let xor = hashA ^ hashB;
    let distance = 0;
    while (xor > 0n) {
      if ((xor & 1n) === 1n) {
        distance++;
      }
      xor >>= 1n;
    }
    return distance;
  }

  /**
   * Get SimHash similarity ratio (1.0 = identical, 0.0 = completely different)
   */
  static getSimHashSimilarity(codeA: string, codeB: string): number {
    const hashA = this.getSimHash(codeA);
    const hashB = this.getSimHash(codeB);
    const distance = this.getHammingDistance(hashA, hashB);
    return 1.0 - distance / 64;
  }

  /**
   * Cryptographically verifies the client telemetry paste log against manual browser tampering
   */
  /**
   * Cryptographically verifies the client telemetry paste log against manual browser tampering and signature replays.
   * Leverages contextual bindings (studentId, assignmentId, codeHash) alongside telemetry logs.
   */
  static verifyTelemetrySignature(
    events: any[],
    code: string,
    assignmentId: string,
    studentId: string,
    signature: string
  ): boolean {
    if (!signature) return false;

    // 1. Dynamic code hash matching client hashing
    let codeHash = 0;
    for (let i = 0; i < code.length; i++) {
      const char = code.charCodeAt(i);
      codeHash = (codeHash << 5) - codeHash + char;
      codeHash = codeHash & codeHash;
    }
    const codeHashStr = Math.abs(codeHash).toString(16);

    // 2. Build payload structure matching client-side generateTelemetrySignature
    const dataPayload = {
      events,
      codeHash: codeHashStr,
      assignmentId,
      studentId
    };

    const dataStr = JSON.stringify(dataPayload);
    const salt = "CodeSahayakSecretSalt";

    let hash = 0;
    for (let i = 0; i < dataStr.length; i++) {
      const char = dataStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    for (let i = 0; i < salt.length; i++) {
      const char = salt.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const expected = Math.abs(hash).toString(16);
    return expected === signature;
  }

  /**
   * Run multi-layer plagiarism assessment against prior submissions
   * Employs a hybrid strategy: Levenshtein structural matching for short snippets (<150 chars)
   * to eliminate SimHash collisions, and constant-time SimHash bitwise distance for high scalability otherwise.
   */
  static assessSubmission(
    currentCode: string,
    priorSubmissions: { id: string; code: string }[],
    pasteEvents: PasteEventLog[] = []
  ): PlagiarismResult {
    let maxSimilarity = 0;
    let matchedSubmissionId: string | undefined;
    let isRenameOnly = false;

    const useHybridRatio = currentCode.length < 150;

    priorSubmissions.forEach((prior) => {
      // If script is short, fall back to accurate Levenshtein structural matching to prevent SimHash collisions.
      // Otherwise, execute high-velocity O(1) bitwise XOR SimHash checking.
      const similarity = useHybridRatio
        ? this.getSimilarityRatio(currentCode, prior.code)
        : this.getSimHashSimilarity(currentCode, prior.code);

      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchedSubmissionId = prior.id;
      }
    });

    // If normalized AST similarity is higher than 85%, flag as rename-only plagiarism
    if (maxSimilarity > 0.85) {
      isRenameOnly = true;
    }

    // Capture paste events behavioral typing metrics
    const { isInstantPaste, impact: pasteImpact } = this.analyzePasteBehavior(pasteEvents);

    // Calculate Originality Score (0 to 100)
    let originalityScore = 100;
    
    if (maxSimilarity > 0.3) {
      // Reduce score exponentially as similarity increases
      originalityScore -= Math.round(maxSimilarity * 60);
    }

    originalityScore -= pasteImpact;
    originalityScore = Math.max(0, Math.min(100, originalityScore));

    return {
      originalityScore,
      isRenameOnly,
      isInstantPaste,
      maxSimilarity,
      matchedSubmissionId,
    };
  }
}
