// astDebugger.ts — records execution snapshots for step-back support

export interface Snapshot {
  line: number;
  variables: Record<string, any>;
  callStack: string[];
  output: string;
  step: number;
}

export class ASTDebugger {
  private snapshots: Snapshot[] = [];
  private currentStep = -1;

  // Call this from Pyodide trace function
  addSnapshot(snap: Snapshot): void {
    // Discard any "future" snapshots if we stepped back then continued
    this.snapshots = this.snapshots.slice(0, this.currentStep + 1);
    this.snapshots.push({ ...snap, step: this.snapshots.length });
    this.currentStep = this.snapshots.length - 1;
  }

  stepForward(): Snapshot | null {
    if (this.currentStep < this.snapshots.length - 1) {
      this.currentStep++;
      return this.snapshots[this.currentStep];
    }
    return null;
  }

  stepBack(): Snapshot | null {
    if (this.currentStep > 0) {
      this.currentStep--;
      return this.snapshots[this.currentStep];
    }
    return null;
  }

  jumpTo(step: number): Snapshot | null {
    if (step >= 0 && step < this.snapshots.length) {
      this.currentStep = step;
      return this.snapshots[step];
    }
    return null;
  }

  reset(): void { this.snapshots = []; this.currentStep = -1; }
  get total(): number { return this.snapshots.length; }
  get position(): number { return this.currentStep; }
  get canGoBack(): boolean { return this.currentStep > 0; }
  get canGoForward(): boolean { return this.currentStep < this.snapshots.length - 1; }
  get allSnapshots(): Snapshot[] { return [...this.snapshots]; }
}

// Pyodide trace setup (inject into Python before running):
export const TRACE_SETUP_PYTHON = `
import sys, json

__snapshots__ = []
__trace_vars__ = {}
__call_stack__ = []

def __trace__(frame, event, arg):
    global __call_stack__
    if event == "call":
        __call_stack__.append(frame.f_code.co_name)
    elif event == "return" and __call_stack__:
        __call_stack__.pop()
    elif event == "line":
        local_vars = {}
        for k, v in frame.f_locals.items():
            if not k.startswith("__"):
                try:
                    local_vars[k] = str(v)[:100]
                except:
                    local_vars[k] = "<unevaluatable>"
        __snapshots__.append({
            "line": frame.f_lineno,
            "variables": local_vars,
            "callStack": list(__call_stack__),
        })
    return __trace__

sys.settrace(__trace__)
`;
