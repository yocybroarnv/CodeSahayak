import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Trash2,
  ChevronDown,
  Play,
} from 'lucide-react';
import { useIDEStore, type FileNode } from '@/store/ideStore';
import { useLanguageStore } from '@/store/languageStore';
import { Button } from '@/components/ui/button';
import { GurujiService } from '@/services/gurujii';
import { runPythonCodeLocally } from '@/lib/pyodideRunner';
import { executeCode, executeJavaScript, executeTypeScript } from '@/lib/codeAnalysisEngine';

const findFileInTree = (nodes: FileNode[], name: string): FileNode | null => {
  for (const node of nodes) {
    if (node.name.toLowerCase() === name.toLowerCase()) {
      return node;
    }
    if (node.children) {
      const found = findFileInTree(node.children, name);
      if (found) return found;
    }
  }
  return null;
};

const listFilesInTree = (nodes: FileNode[], prefix = ''): string => {
  let output = '';
  for (const node of nodes) {
    if (node.isFolder) {
      output += `${prefix}📁 ${node.name}/\n`;
      if (node.children) {
        output += listFilesInTree(node.children, `${prefix}  `);
      }
    } else {
      output += `${prefix}📄 ${node.name}\n`;
    }
  }
  return output;
};

export function Terminal() {
  const {
    terminalOutputs,
    terminalHeight,
    toggleTerminal,
    addTerminalOutput,
    clearTerminal,
    commandHistory,
    addCommandHistory,
  } = useIDEStore();
  
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [height, setHeight] = useState(terminalHeight);
  const [isResizing, setIsResizing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutputs]);
  
  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - 40 - e.clientY;
        setHeight(Math.max(100, Math.min(500, newHeight)));
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  
  const executePython = async (content: string, inputValues: string[] = []) => {
    try {
      const startTime = performance.now();
      const result = await runPythonCodeLocally(content, inputValues);
      const elapsed = performance.now() - startTime;
      
      if (!result.success) {
        addTerminalOutput({
          type: 'error',
          content: `⚠️ Traceback Error Detected!\n${result.error}\n\nCoaching with Gurujii...\n`,
        });
        
        const { currentLanguage } = useLanguageStore.getState();
        const coachResult = await GurujiService.explainError(
          content,
          result.error || 'SyntaxError: unexpected EOF while parsing',
          currentLanguage
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
          content: `${result.output || '✓ Code executed successfully! No output produced.'}\nProcess exited with code 0 (${elapsed.toFixed(1)}ms)`,
        });
      }
    } catch (error) {
      console.error('Code execution error:', error);
      addTerminalOutput({
        type: 'error',
        content: `❌ Failed to execute code: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check your internet connection and syntax.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const trimmed = input.trim();
      addTerminalOutput({ type: 'input', content: `> ${trimmed}` });
      
      setTimeout(async () => {
        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const arg = parts[1];
        
        addCommandHistory(trimmed);
        setHistoryIndex(-1);

        if (cmd === 'help') {
          addTerminalOutput({
            type: 'output',
            content: 'CodeSahayak Terminal v1.2\nAvailable commands:\n  help                    - Show this help menu\n  clear                   - Clear terminal\n  ls                      - List workspace files\n  cat <file>              - View file content\n  run <file>              - Run a code file (auto-detects language)\n\nSupported compiler toolchains:\n  python, node, tsc, gcc, g++, javac, go run, cargo run, swift, dart, r',
          });
        } else if (cmd === 'clear') {
          clearTerminal();
        } else if (cmd === 'ls') {
          const { files } = useIDEStore.getState();
          const listStr = listFilesInTree(files);
          addTerminalOutput({
            type: 'output',
            content: listStr || '(Empty directory)',
          });
        } else if (cmd === 'cat') {
          if (!arg) {
            addTerminalOutput({ type: 'error', content: 'usage: cat <filename>' });
            return;
          }
          const { files } = useIDEStore.getState();
          const targetFile = findFileInTree(files, arg);
          if (targetFile) {
            addTerminalOutput({ type: 'output', content: targetFile.content });
          } else {
            addTerminalOutput({ type: 'error', content: `cat: ${arg}: No such file in workspace` });
          }
        } else {
          // Execute runner commands
          const { files, openTabs, activeTabId, openInputModal } = useIDEStore.getState();
          
          let targetFile: any = null;
          if (arg) {
            targetFile = findFileInTree(files, arg);
          } else {
            const activeTab = openTabs.find((t) => t.id === activeTabId);
            if (activeTab) {
              targetFile = findFileInTree(files, activeTab.name);
            }
          }
          
          const cmdToLang: Record<string, string> = {
            python: 'python',
            node: 'javascript',
            javascript: 'javascript',
            tsc: 'typescript',
            typescript: 'typescript',
            gcc: 'c',
            'g++': 'cpp',
            javac: 'java',
            go: 'go',
            cargo: 'rust',
            rust: 'rust',
            swift: 'swift',
            dart: 'dart',
            julia: 'julia',
            r: 'r',
            php: 'php',
            ruby: 'ruby',
            zig: 'zig',
            mojo: 'mojo',
            haskell: 'haskell',
            elixir: 'elixir'
          };

          const lang = cmdToLang[cmd] || (targetFile ? targetFile.language : 'python');

          if (!targetFile && cmd !== 'cargo' && cmd !== 'go' && !cmdToLang[cmd]) {
            addTerminalOutput({
              type: 'error',
              content: `Command not found: "${cmd}". Type 'help' for info.`,
            });
            return;
          }

          if (lang === 'python') {
            const { countInputCalls } = await import('@/lib/pyodideRunner');
            const inputCount = countInputCalls(targetFile?.content || '');
            if (inputCount > 0) {
              openInputModal(inputCount, (inputValues) => {
                executePython(targetFile?.content || '', inputValues);
              });
              return;
            }
            await executePython(targetFile?.content || '');
          } else {
            addTerminalOutput({ type: 'output', content: `Compiling and executing ${targetFile?.name || 'project'}...\n` });
            const startTime = performance.now();
            let result: any;
            
            if (lang === 'javascript') {
              result = executeJavaScript(targetFile?.content || '');
            } else if (lang === 'typescript') {
              result = executeTypeScript(targetFile?.content || '');
            } else {
              result = executeCode(targetFile?.content || '', lang, targetFile?.name || 'main');
            }
            
            const elapsed = performance.now() - startTime;
            
            if (!result.success) {
              addTerminalOutput({
                type: 'error',
                content: `⚠️ Run Error:\n${result.error || 'Unknown syntax error'}`,
              });
            } else {
              addTerminalOutput({
                type: 'output',
                content: result.output || `✓ Program executed successfully. Process exited with code 0 (${elapsed.toFixed(1)}ms)`,
              });
            }
          }
        }
      }, 100);
      
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? -1 : historyIndex + 1;
      if (newIndex >= commandHistory.length || newIndex === -1) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const tokens = input.split(' ');
      const lastToken = tokens[tokens.length - 1];
      if (!lastToken) return;

      const availableCommands = [
        'help', 'clear', 'ls', 'cat', 'run', 'python', 'node', 'tsc',
        'gcc', 'g++', 'javac', 'go', 'cargo', 'swift', 'dart', 'julia',
        'r', 'php', 'ruby', 'zig', 'mojo', 'haskell', 'elixir'
      ];
      
      const matches = availableCommands.filter(c => c.startsWith(lastToken));
      
      const { files } = useIDEStore.getState();
      const allFileNames: string[] = [];
      const collectNames = (nodes: any[]) => {
        for (const n of nodes) {
          if (!n.isFolder) allFileNames.push(n.name);
          if (n.children) collectNames(n.children);
        }
      };
      collectNames(files);
      
      const fileMatches = allFileNames.filter(n => n.startsWith(lastToken));
      const allMatches = [...matches, ...fileMatches];

      if (allMatches.length === 1) {
        tokens[tokens.length - 1] = allMatches[0];
        setInput(tokens.join(' '));
      } else if (allMatches.length > 1) {
        addTerminalOutput({
          type: 'output',
          content: `\n${allMatches.join('  ')}`,
        });
      }
    }
  };
  
  const runCode = async () => {
    const { openTabs, activeTabId, openInputModal } = useIDEStore.getState();
    const activeTab = openTabs.find((t) => t.id === activeTabId);
    
    if (!activeTab) {
      addTerminalOutput({ 
        type: 'error', 
        content: '❌ Error: No file is currently open. Please open a file to run code.' 
      });
      return;
    }
    
    const lang = activeTab.language || 'python';
    
    addTerminalOutput({ type: 'input', content: `$ run ${activeTab.name}` });
    
    if (lang === 'python') {
      const { countInputCalls } = await import('@/lib/pyodideRunner');
      const inputCount = countInputCalls(activeTab.content);
      if (inputCount > 0) {
        openInputModal(inputCount, (inputValues) => {
          executePython(activeTab.content, inputValues);
        });
        return;
      }
      await executePython(activeTab.content);
    } else {
      addTerminalOutput({ type: 'output', content: `Compiling and executing ${activeTab.name}...\n` });
      const startTime = performance.now();
      let result: any;
      
      if (lang === 'javascript') {
        result = executeJavaScript(activeTab.content);
      } else if (lang === 'typescript') {
        result = executeTypeScript(activeTab.content);
      } else {
        result = executeCode(activeTab.content, lang, activeTab.name);
      }
      
      const elapsed = performance.now() - startTime;
      
      if (!result.success) {
        addTerminalOutput({
          type: 'error',
          content: `⚠️ Run Error:\n${result.error || 'Unknown syntax error'}`,
        });
      } else {
        addTerminalOutput({
          type: 'output',
          content: result.output || `✓ Program executed successfully. Process exited with code 0 (${elapsed.toFixed(1)}ms)`,
        });
      }
    }
  };
  
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height }}
      exit={{ height: 0 }}
      className="flex flex-col bg-[#1E1E2E] border-t border-[#2D2D3A]"
    >
      {/* Resize Handle */}
      <div
        onMouseDown={() => setIsResizing(true)}
        className="h-1 cursor-ns-resize hover:bg-[#6C5CE7] transition-colors"
      />
      
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#252532] border-b border-[#2D2D3A]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Terminal
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-white"
            onClick={runCode}
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-white"
            onClick={clearTerminal}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-white"
            onClick={toggleTerminal}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-sm terminal-scrollbar"
        style={{ maxHeight: '100%' }}
      >
        {terminalOutputs.map((output) => (
          <div
            key={output.id}
            className={`mb-1 ${
              output.type === 'input'
                ? 'text-green-400'
                : output.type === 'error'
                ? 'text-red-400'
                : 'text-gray-300'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words">{output.content}</pre>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 border-t border-[#2D2D3A]">
        <span className="text-green-400 mr-2">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 bg-transparent text-gray-300 outline-none font-mono text-sm"
          autoComplete="off"
        />
      </form>
    </motion.div>
  );
}
