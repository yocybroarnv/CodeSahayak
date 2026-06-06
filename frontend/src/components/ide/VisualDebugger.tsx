import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight, ChevronLeft, Eye, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIDEStore } from '@/store/ideStore';

interface VariableState {
  name: string;
  value: string;
  type: string;
}

interface DebugFrame {
  lineNo: number;
  codeLine: string;
  variables: VariableState[];
  stack: string[];
}

export function VisualDebugger() {
  const { openTabs, activeTabId } = useIDEStore();
  const activeTab = openTabs.find((t) => t.id === activeTabId);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [debugFrames, setDebugFrames] = useState<DebugFrame[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Parse lines to simulate step-by-step variable evolution
  useEffect(() => {
    if (!activeTab || activeTab.language !== 'python') {
      setDebugFrames([]);
      return;
    }

    const lines = activeTab.content.split('\n');
    const parsedFrames: DebugFrame[] = [];
    const currentVars: Record<string, { value: string; type: string }> = {};
    const callStack: string[] = ['__main__'];

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      // Track function definitions
      if (trimmed.startsWith('def ')) {
        const funcName = trimmed.substring(4, trimmed.indexOf('('));
        currentVars[funcName] = { value: '<function>', type: 'function' };
      }

      // Track basic variable assignments (e.g. name = "Student")
      const matchAssignment = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      if (matchAssignment) {
        const varName = matchAssignment[1];
        let varVal = matchAssignment[2].trim();
        let varType = 'int';

        if (varVal.startsWith('"') || varVal.startsWith("'")) {
          varType = 'str';
        } else if (varVal.startsWith('[') || varVal.endsWith(']')) {
          varType = 'list';
        } else if (varVal.includes('(')) {
          varType = 'call';
          // Simulate recursion call stack growth
          if (trimmed.includes('factorial')) {
            callStack.push(`factorial(${callStack.length})`);
          }
        }

        currentVars[varName] = { value: varVal, type: varType };
      }

      // Capture frame
      parsedFrames.push({
        lineNo: index + 1,
        codeLine: line,
        variables: Object.entries(currentVars).map(([name, detail]) => ({
          name,
          value: detail.value,
          type: detail.type,
        })),
        stack: [...callStack],
      });
    });

    setDebugFrames(parsedFrames);
    setCurrentStep(0);
  }, [activeTab]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && debugFrames.length > 0) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= debugFrames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, debugFrames]);

  if (!activeTab || activeTab.language !== 'python' || debugFrames.length === 0) {
    return null;
  }

  const activeFrame = debugFrames[currentStep];

  return (
    <div className="border-t border-[#E8EAF6] bg-[#F6F7FB] px-4 py-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#6C5CE7] animate-pulse" />
          <span className="text-xs font-bold text-[#1A1D2B] uppercase tracking-wider">
            Visual Execution Flow (Gurujii Tracer)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="h-8 gap-2 text-[#636E72] hover:text-[#1A1D2B]"
          >
            <Eye className="w-4 h-4" />
            <span className="text-xs">{isVisible ? 'Hide' : 'Show'}</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Step Controls */}
            <div className="flex flex-col gap-3 justify-center p-4 bg-white rounded-xl shadow-sm border border-[#E8EAF6]">
              <span className="text-xs text-[#636E72]">
                Executing line {activeFrame?.lineNo}: <code className="bg-[#F6F7FB] px-1 py-0.5 rounded text-red-500 font-mono">{activeFrame?.codeLine.trim()}</code>
              </span>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-lg"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-8 gap-2 bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white rounded-lg px-4"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-xs font-medium">{isPlaying ? 'Pause' : 'Auto Play'}</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-lg"
                  disabled={currentStep === debugFrames.length - 1}
                  onClick={() => setCurrentStep((prev) => Math.min(debugFrames.length - 1, prev + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg"
                  onClick={() => {
                    setCurrentStep(0);
                    setIsPlaying(false);
                  }}
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              {/* Progress Slider */}
              <div className="w-full flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={debugFrames.length - 1}
                  value={currentStep}
                  onChange={(e) => setCurrentStep(Number(e.target.value))}
                  className="w-full h-1 bg-[#E8EAF6] rounded-lg appearance-none cursor-pointer accent-[#6C5CE7]"
                />
                <span className="text-[10px] font-mono text-[#636E72]">
                  {currentStep + 1}/{debugFrames.length}
                </span>
              </div>
            </div>

            {/* Variable Tracker */}
            <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-[#E8EAF6] min-h-[120px]">
              <span className="text-xs font-semibold text-[#1A1D2B]">Variable Inspector</span>
              {activeFrame?.variables.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-gray-400">
                  No active variables in scope
                </div>
              ) : (
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[100px] pr-1">
                  {activeFrame?.variables.map((v, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#F6F7FB] px-2 py-1 rounded text-xs">
                      <span className="font-mono text-[#6C5CE7]">{v.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 bg-white border border-[#E8EAF6] px-1 rounded">{v.type}</span>
                        <span className="font-mono text-gray-700 font-bold">{v.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Call Stack Visualizer */}
            <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-[#E8EAF6]">
              <span className="text-xs font-semibold text-[#1A1D2B]">Active Call Stack</span>
              <div className="flex flex-wrap gap-1.5 overflow-y-auto max-h-[100px]">
                {activeFrame?.stack.map((frame, index) => (
                  <div
                    key={index}
                    className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${
                      index === activeFrame.stack.length - 1
                        ? 'bg-[#6C5CE7]/10 border-[#6C5CE7] text-[#6C5CE7] font-bold'
                        : 'bg-white border-[#E8EAF6] text-gray-500'
                    }`}
                  >
                    {frame}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
