import { useCallback, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { sql } from '@codemirror/lang-sql';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { Code } from 'lucide-react';
import { useIDEStore } from '@/store/ideStore';
import { getLanguageFromFilename } from '@/lib/fileIcons';

const getLanguageExtension = (filename: string) => {
  const lang = getLanguageFromFilename(filename);
  
  switch (lang) {
    case 'python':
    case 'mojo':
      return python();
    case 'javascript':
    case 'typescript':
    case 'graphql':
      return javascript({ jsx: true, typescript: lang === 'typescript' });
    case 'java':
    case 'kotlin':
    case 'scala':
      return java();
    case 'cpp':
    case 'c':
    case 'csharp':
    case 'go':
    case 'rust':
    case 'swift':
    case 'dart':
    case 'zig':
      return cpp();
    case 'sql':
      return sql();
    case 'html':
    case 'markdown':
      return html();
    default:
      return [];
  }
};

export function CodeEditor() {
  const {
    openTabs,
    activeTabId,
    updateTabContent,
    theme,
    fontSize,
    lineNumbers,
    saveTab,
  } = useIDEStore();
  
  const activeTab = openTabs.find((t) => t.id === activeTabId);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);
  
  const handleChange = useCallback(
    (value: string) => {
      if (activeTabId) {
        updateTabContent(activeTabId, value);
      }
    },
    [activeTabId, updateTabContent]
  );
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (activeTabId) {
          saveTab(activeTabId);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabId, saveTab]);

  // Keystroke typing pattern telemetry
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
      const now = Date.now();
      const telemetry = (window as any).typingTelemetry || {
        characterCount: 0,
        typingDurationMs: 0,
        pasteCount: 0,
        pastedCharCount: 0,
        keystrokeTimestamps: [],
        firstKeystrokeTime: 0,
        lastKeystrokeTime: 0
      };
      
      if (!telemetry.firstKeystrokeTime) {
        telemetry.firstKeystrokeTime = now;
      }
      telemetry.lastKeystrokeTime = now;
      telemetry.typingDurationMs = now - telemetry.firstKeystrokeTime;
      telemetry.keystrokeTimestamps.push(now);
      
      if (telemetry.keystrokeTimestamps.length > 1000) {
        telemetry.keystrokeTimestamps.shift();
      }
      
      telemetry.characterCount = activeTabRef.current?.content.length || 0;
      (window as any).typingTelemetry = telemetry;
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text');
    if (!text) return;
    
    const timestamp = Date.now();
    const length = text.length;
    const velocityDelta = length / 2;
    
    const telemetry = (window as any).typingTelemetry || {
      characterCount: 0,
      typingDurationMs: 0,
      pasteCount: 0,
      pastedCharCount: 0,
      keystrokeTimestamps: [],
      firstKeystrokeTime: 0,
      lastKeystrokeTime: 0
    };
    
    telemetry.pasteCount += 1;
    telemetry.pastedCharCount += length;
    (window as any).typingTelemetry = telemetry;
    
    const eventLog = { 
      timestamp: new Date(timestamp).toISOString(), 
      length, 
      velocityDelta,
      textSnippet: text.substring(0, 100)
    };
    
    const globalLogs = (window as any).pasteEvents || [];
    globalLogs.push(eventLog);
    (window as any).pasteEvents = globalLogs;
    
    console.log('Intercepted paste event for plagiarism assessment:', eventLog);
  };
  
  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1E1E2E]">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#2D2D3A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-10 h-10 text-[#2E86AB]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Welcome to CodeSahayak IDE
          </h3>
          <p className="text-gray-400 max-w-md">
            Select a file from the explorer to start coding, or create a new file to begin your project.
          </p>
          <div className="mt-6 flex gap-4 justify-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#2D2D3A] rounded">Ctrl+N</kbd>
              <span>New File</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#2D2D3A] rounded">Ctrl+O</kbd>
              <span>Open File</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#2D2D3A] rounded">Ctrl+S</kbd>
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col bg-[#1E1E2E] overflow-hidden">
      {/* Breadcrumbs */}
      <div className="h-8 flex items-center px-4 bg-[#252532] border-b border-[#2D2D3A]">
        <span className="text-xs text-gray-500">{activeTab.path}</span>
        {activeTab.isModified && (
          <span className="ml-2 text-xs text-yellow-500">● Modified</span>
        )}
      </div>
      
      {/* Editor Wrapper with Paste/Keystroke Interception */}
      <div className="flex-1 overflow-auto" onPaste={handlePaste} onKeyDown={handleKeyDown}>
        <CodeMirror
          value={activeTab.content}
          height="100%"
          theme={theme === 'dark' ? oneDark : 'light'}
          extensions={[getLanguageExtension(activeTab.name)]}
          onChange={handleChange}
          basicSetup={{
            lineNumbers,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            highlightSelectionMatches: true,
          }}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: '"JetBrains Mono", "Fira Code", "Source Code Pro", monospace',
          }}
        />
      </div>
    </div>
  );
}
