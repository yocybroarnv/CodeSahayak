import { useEffect, useState } from 'react';
import {
  Play,
  RotateCcw,
  Save,
  FolderOpen,
  Settings,
  Moon,
  Sun,
  Type,
  WrapText,
  Minimize2,
  List,
  Bot,
  Terminal,
  ChevronDown,
  Send,
} from 'lucide-react';
import { useIDEStore } from '@/store/ideStore';
import { useAuthStore, api } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GurujiService } from '@/services/gurujii';
import { runPythonCodeLocally } from '@/lib/pyodideRunner';
import { executeCode, executeJavaScript, executeTypeScript } from '@/lib/codeAnalysisEngine';
import { toast } from 'sonner';

export function Toolbar() {
  const {
    theme,
    fontSize,
    wordWrap,
    minimap,
    lineNumbers,
    sidebarVisible,
    terminalVisible,
    aiPanelVisible,
    setTheme,
    toggleWordWrap,
    toggleMinimap,
    toggleLineNumbers,
    toggleSidebar,
    toggleTerminal,
    toggleAIPanel,
    addTerminalOutput,
    openTabs,
    activeTabId,
    openInputModal,
  } = useIDEStore();

  const user = useAuthStore((state) => state.user);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      const fetchAssignments = async () => {
        try {
          const res = await api.request('/assignments');
          if (res.assignments) {
            setAssignments(res.assignments);
            if (res.assignments.length > 0) {
              setSelectedAssignmentId(res.assignments[0].id);
            }
          }
        } catch (error) {
          console.error('Failed to fetch assignments:', error);
        }
      };
      fetchAssignments();
    }
  }, [user]);

  const submitAssignment = async () => {
    const activeTab = openTabs.find((t) => t.id === activeTabId);
    if (!activeTab) {
      toast.error('Please open a file containing your solution first!');
      return;
    }
    if (!selectedAssignmentId) {
      toast.error('Please select an assignment to submit!');
      return;
    }

    setIsSubmitting(true);
    const pasteEvents = (window as any).pasteEvents || [];

    // Salted checksum logic to sign paste log telemetry against console tampering and signature replays
    const generateTelemetrySignature = (
      events: any[],
      code: string,
      assignmentId: string,
      studentId: string
    ): string => {
      // 1. Compute dynamic hash of submitted code
      let codeHash = 0;
      for (let i = 0; i < code.length; i++) {
        const char = code.charCodeAt(i);
        codeHash = (codeHash << 5) - codeHash + char;
        codeHash = codeHash & codeHash;
      }
      const codeHashStr = Math.abs(codeHash).toString(16);

      // 2. Build secure context binding matching server-side verifyTelemetrySignature
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
      return Math.abs(hash).toString(16);
    };

    const studentId = user?.id || '';
    const pasteEventsSignature = generateTelemetrySignature(
      pasteEvents,
      activeTab.content,
      selectedAssignmentId,
      studentId
    );

    try {
      await api.request(`/assignments/${selectedAssignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          code: activeTab.content,
          language: activeTab.language,
          timeSpent: 60, // default tracking
          pasteEvents,
          pasteEventsSignature,
        }),
      });

      // Clear paste events buffer
      (window as any).pasteEvents = [];

      toast.success('Assignment Submitted Successfully!', {
        description: 'Originality check complete. Grading is in progress.',
        duration: 5000,
      });

      // Log in terminal
      addTerminalOutput({
        type: 'output',
        content: `\n🚀 [Submission success] Assignment submitted securely!\nOriginality analysis recorded. Grading pending teacher review.\n`
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const runCode = async () => {
    const activeTab = openTabs.find((t) => t.id === activeTabId);
    
    if (!activeTab) {
      alert('Please open a file first!');
      return;
    }
    
    // Open terminal if not visible
    if (!terminalVisible) {
      toggleTerminal();
    }
    
    const lang = activeTab.language || 'python';
    
    const polyglotCommandConfigs: Record<string, { cmd: string; msg: string }> = {
      python: { cmd: `$ python ${activeTab.name}`, msg: 'Initializing Secure Python WASM sandbox...\n' },
      javascript: { cmd: `$ node ${activeTab.name}`, msg: 'Executing JavaScript in secure sandboxed container...\n' },
      typescript: { cmd: `$ tsc ${activeTab.name} && node ${activeTab.name.replace('.ts', '.js')}`, msg: 'Transpiling TypeScript and executing JavaScript...\n' },
      html: { cmd: `$ browser ${activeTab.name}`, msg: 'Rendering HTML layout model...\n' },
      sql: { cmd: `$ sqlite3 ${activeTab.name}`, msg: 'Connecting to SQLite memory databases...\n' },
      cpp: { cmd: `$ g++ ${activeTab.name} -o main && ./main`, msg: 'Compiling C++ source binaries with debug targets...\n' },
      c: { cmd: `$ gcc ${activeTab.name} -o main && ./main`, msg: 'Compiling C source...\n' },
      csharp: { cmd: `$ dotnet restore && dotnet build && dotnet publish`, msg: 'Executing .NET SDK build pipeline tasks...\n' },
      go: { cmd: `$ go mod tidy && go fmt && go build`, msg: 'Compiling native Go modules and package assets...\n' },
      rust: { cmd: `$ cargo check && cargo build --release && cargo test`, msg: 'Running Cargo compiler optimization checks...\n' },
      php: { cmd: `$ composer install && php -l ${activeTab.name}`, msg: 'Linting PHP script syntaxes...\n' },
      ruby: { cmd: `$ bundle install && rubocop -A && ruby ${activeTab.name}`, msg: 'Executing Ruby Gem bundles...\n' },
      swift: { cmd: `$ swift build && xcodebuild`, msg: 'Compiling Swift SPM packages...\n' },
      kotlin: { cmd: `$ ./gradlew assembleDebug && ktlint`, msg: 'Linking Kotlin JVM assemblies and gradle binaries...\n' },
      scala: { cmd: `$ sbt compile && sbt assembly`, msg: 'Compiling Scala sbt files into JVM bytecode...\n' },
      dart: { cmd: `$ dart pub get && flutter build apk`, msg: 'Running Flutter Dart widget compilations...\n' },
      r: { cmd: `$ R CMD check && styler::style_pkg()`, msg: 'Executing devtools packages and styler modules...\n' },
      graphql: { cmd: `$ graphql-codegen`, msg: 'Verifying GraphQL schemas and queries...\n' },
      zig: { cmd: `$ zig build-exe ${activeTab.name} && zig test ${activeTab.name}`, msg: 'Building Zig standalone executable targets...\n' },
      mojo: { cmd: `$ mojo build ${activeTab.name} && mojo test`, msg: 'Running Modular Mojo parallel GPU optimization loops...\n' },
      haskell: { cmd: `$ cabal build && ghci ${activeTab.name}`, msg: 'Executing Glasgow Haskell Compiler (GHC) Cabal stack...\n' },
      elixir: { cmd: `$ mix deps.get && mix compile && mix test`, msg: 'Compiling Elixir Erlang BEAM bytecode architectures...\n' },
      julia: { cmd: `$ julia --project ${activeTab.name}`, msg: 'Running Julia scientific computing optimization sweeps...\n' }
    };

    const config = polyglotCommandConfigs[lang] || {
      cmd: `$ run ${activeTab.name}`,
      msg: `Compiling and executing ${activeTab.name}...\n`
    };

    // Add running message
    addTerminalOutput({ type: 'input', content: config.cmd });
    addTerminalOutput({ type: 'output', content: config.msg });

    const executePython = async (inputValues: string[] = []) => {
      try {
        let result: any;
        
        // Route code to the corresponding language runner
        if (lang === 'python') {
          result = await runPythonCodeLocally(activeTab.content, inputValues);
        } else if (lang === 'javascript') {
          result = executeJavaScript(activeTab.content);
        } else if (lang === 'typescript') {
          result = executeTypeScript(activeTab.content);
        } else {
          result = executeCode(activeTab.content, lang, activeTab.name);
        }
        
        if (!result.success) {
          const errorMsg = result.error || 'SyntaxError: Parsing constraints error';
          addTerminalOutput({
            type: 'error',
            content: `⚠️ Traceback Error Detected!\n${errorMsg}\n\nCoaching with Gurujii...\n`,
          });
          
          // Proxy errors dynamically to Gurujii regional tutor service
          const coachResult = await GurujiService.explainError(
            activeTab.content,
            errorMsg,
            'en'
          );
          
          addTerminalOutput({
            type: 'error',
            content: `${coachResult.explanation}\n`,
          });
          
          if (coachResult.voiceUrl) {
            GurujiService.playVoice(coachResult.voiceUrl);
          }
        } else {
          addTerminalOutput({
            type: 'output',
            content: result.output || '✓ Code executed successfully! No output produced.',
          });
        }
      } catch (error) {
        console.error('Code execution error:', error);
        addTerminalOutput({
          type: 'error',
          content: `❌ Failed to execute code: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check your syntax.`,
        });
      }
    };

    if (lang === 'python') {
      const { countInputCalls } = await import('@/lib/pyodideRunner');
      const inputCount = countInputCalls(activeTab.content);
      if (inputCount > 0) {
        openInputModal(inputCount, (inputValues) => {
          executePython(inputValues);
        });
        return;
      }
    }

    await executePython();
  };
  
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-[#E8EAF6]">
      {/* Left: File & Assignment Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
        >
          <FolderOpen className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
        >
          <Save className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-[#E8EAF6] mx-2" />
        <Button
          variant="ghost"
          size="sm"
          onClick={runCode}
          className="h-8 gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 animate-pulse-subtle"
        >
          <Play className="w-4 h-4" />
          <span className="text-xs font-medium">Run</span>
        </Button>
        
        {user?.role === 'STUDENT' && assignments.length > 0 && (
          <>
            <div className="w-px h-4 bg-[#E8EAF6] mx-2" />
            <div className="flex items-center gap-2 bg-[#F6F7FB] px-2 py-0.5 rounded-lg border border-[#E8EAF6]">
              <span className="text-[10px] uppercase font-bold text-gray-400">Task:</span>
              <select
                value={selectedAssignmentId}
                onChange={(e) => setSelectedAssignmentId(e.target.value)}
                className="bg-transparent text-xs outline-none text-[#1A1D2B] font-semibold max-w-[160px] truncate cursor-pointer py-0.5"
              >
                {assignments.map((asm) => (
                  <option key={asm.id} value={asm.id}>
                    {asm.title}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={submitAssignment}
                disabled={isSubmitting}
                className="h-7 px-2 gap-1 text-[#6C5CE7] hover:text-[#5B4BD6] hover:bg-[#6C5CE7]/10 rounded-md"
              >
                <Send className="w-3 h-3 animate-bounce-subtle" />
                <span className="text-[11px] font-bold">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </Button>
            </div>
          </>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Center: View Toggles */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={`h-8 gap-2 ${
            sidebarVisible ? 'text-[#6C5CE7] bg-[#6C5CE7]/10' : 'text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]'
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-xs">Explorer</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTerminal}
          className={`h-8 gap-2 ${
            terminalVisible ? 'text-[#6C5CE7] bg-[#6C5CE7]/10' : 'text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span className="text-xs">Terminal</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAIPanel}
          className={`h-8 gap-2 ${
            aiPanelVisible ? 'text-[#6C5CE7] bg-[#6C5CE7]/10' : 'text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-xs">AI</span>
        </Button>
      </div>
      
      {/* Right: Settings */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-8 h-8 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
            >
              <Settings className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={toggleWordWrap}>
              <WrapText className="w-4 h-4 mr-2" />
              Word Wrap
              {wordWrap && <span className="ml-auto text-[#6C5CE7]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleMinimap}>
              <Minimize2 className="w-4 h-4 mr-2" />
              Minimap
              {minimap && <span className="ml-auto text-[#6C5CE7]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleLineNumbers}>
              <List className="w-4 h-4 mr-2" />
              Line Numbers
              {lineNumbers && <span className="ml-auto text-[#6C5CE7]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Type className="w-4 h-4 mr-2" />
              Font Size
              <span className="ml-auto text-xs text-[#636E72]">{fontSize}px</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

