/**
 * Pyodide WebAssembly Runner
 * Safely executes Python code inside the browser sandbox using Pyodide
 */

let pyodideInstance: any = null;

export async function getPyodide() {
  if (!pyodideInstance) {
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide CDN script'));
        document.head.appendChild(script);
      });
    }
    // @ts-ignore
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
    });
  }
  return pyodideInstance;
}

export interface PyodideResult {
  success: boolean;
  output: string;
  error: string | null;
  errorType?: string;
}

/**
 * Run Python code with proper input() support.
 * inputValues: pre-supplied list of strings for each input() call.
 */
export async function runPythonCodeLocally(
  code: string,
  inputValues: string[] = []
): Promise<PyodideResult> {
  try {
    const pyodide = await getPyodide();

    // Auto-load libraries (like numpy, pandas) from Pyodide CDN
    await pyodide.loadPackagesFromImports(code);

    // Override sys.stdout, sys.stderr, sys.stdin
    pyodide.globals.set("__stdout_lines__", []);
    pyodide.globals.set("__input_values__", inputValues);
    pyodide.globals.set("__input_index__", 0);

    const setupCode = `
import sys
import io

class _FakeStdout(io.StringIO):
    def write(self, s):
        __stdout_lines__.append(s)
        return len(s)

class _FakeStdin:
    def readline(self):
        global __input_index__
        vals = __input_values__
        if __input_index__ < len(vals):
            val = vals[__input_index__]
            __input_index__ += 1
        else:
            val = ""   # FIX: never hang — use empty string fallback
        __stdout_lines__.append(val + "\\n")  # echo input to output
        return val + "\\n"

sys.stdout = _FakeStdout()
sys.stderr = _FakeStdout()
sys.stdin  = _FakeStdin()

# Patch input() to use our fake stdin
import builtins
def _patched_input(prompt=""):
    if prompt:
        sys.stdout.write(str(prompt))
    return sys.stdin.readline().rstrip("\\n")
builtins.input = _patched_input
`;

    await pyodide.runPythonAsync(setupCode);
    await pyodide.runPythonAsync(code);

    const stdoutVar = pyodide.globals.get("__stdout_lines__");
    const outLines = typeof stdoutVar?.toJs === 'function' ? stdoutVar.toJs() : stdoutVar;
    return {
      success: true,
      output: Array.isArray(outLines) ? outLines.join("") : String(outLines),
      error: null,
    };
  } catch (err: any) {
    const msg = err?.message ?? String(err);
    const typeMatch = msg.match(/^(\w+Error|SyntaxError|IndentationError)/);
    const pyodide = await getPyodide();
    let stdoutAcc = "";
    try {
      const stdoutVar = pyodide.globals.get("__stdout_lines__");
      const outLines = typeof stdoutVar?.toJs === 'function' ? stdoutVar.toJs() : stdoutVar;
      if (outLines) {
        stdoutAcc = Array.isArray(outLines) ? outLines.join("") : String(outLines);
      }
    } catch {}
    
    return {
      success: false,
      output: stdoutAcc,
      error: msg,
      errorType: typeMatch?.[1] ?? "Error",
    };
  }
}

/**
 * Pre-scan code for input() calls to know how many inputs needed.
 * Returns count so UI can prompt user before running.
 */
export function countInputCalls(code: string): number {
  const matches = code.match(/\binput\s*\(/g);
  return matches?.length ?? 0;
}
