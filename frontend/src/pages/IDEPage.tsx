import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Bell, User, Settings, LogOut, Bot, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useIDEStore } from '@/store/ideStore';
import { FileExplorer } from '@/components/ide/FileExplorer';
import { TabBar } from '@/components/ide/TabBar';
import { CodeEditor } from '@/components/ide/CodeEditor';
import { Terminal } from '@/components/ide/Terminal';
import { AIAssistant } from '@/components/ide/AIAssistant';
import { Toolbar } from '@/components/ide/Toolbar';
import { VisualDebugger } from '@/components/ide/VisualDebugger';
import { InputModal } from '@/components/ide/InputModal';
import { toast } from 'sonner';

export default function IDEPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const {
    files,
    openTabs,
    activeTabId,
    sidebarVisible,
    terminalVisible,
    aiPanelVisible,
    initializeSampleProject,
    isInputModalOpen,
    inputModalCount,
    closeInputModal,
    inputModalOnSubmit,
    toggleAIPanel,
    toggleTerminal,
  } = useIDEStore();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const activeTab = openTabs.find(t => t.id === activeTabId);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Initialize sample project only if workspace files are empty
    if (!files || files.length === 0) {
      initializeSampleProject();
    }
  }, [isAuthenticated, navigate, files, initializeSampleProject]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Ctrl+Shift+P to toggle command palette
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsCommandPaletteOpen(open => !open);
      }
      // Escape to close command palette
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);
  
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#6C5CE7] border-t-transparent rounded-full" />
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-12 flex items-center justify-between px-4 bg-white border-b border-[#E8EAF6] shadow-sm">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-lg flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#1A1D2B]">CodeSahayak</span>
          </div>
          
          <div className="h-6 w-px bg-[#E8EAF6]" />
          
          {/* Project Name */}
          <div className="flex items-center gap-2 text-sm text-[#636E72]">
            <span>my-project</span>
          </div>
        </div>
        
        {/* Center: Navigation */}
        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6C5CE7] bg-[#6C5CE7]/10 hover:bg-[#6C5CE7]/20"
          >
            Editor
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/learning')}
            className="text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
          >
            Learning
          </Button>
        </nav>
        
        {/* Right: User Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
          >
            <Bell className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[#1A1D2B] hover:bg-[#F6F7FB]"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center shadow-md">
                  <span className="text-xs text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-500">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden bg-[#F6F7FB]">
        {/* Sidebar: File Explorer */}
        <AnimatePresence>
          {sidebarVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-[#E8EAF6] bg-white overflow-hidden"
            >
              <FileExplorer />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Center: Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Toolbar */}
          <Toolbar />
          
          {/* Tabs */}
          <TabBar />
          
          {/* Editor */}
          <CodeEditor />
          
          {/* Visual Tracer Debugger */}
          <VisualDebugger />
          
          {/* Terminal */}
          <AnimatePresence>
            {terminalVisible ? (
              <Terminal key="terminal-panel" />
            ) : (
              <motion.button
                key="terminal-toggle-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={toggleTerminal}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-[#6C5CE7] text-white rounded-lg shadow-lg hover:bg-[#5B4BD6] transition-colors"
              >
                <TerminalIcon className="w-4 h-4" />
                <span className="text-sm">Terminal</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {/* Right: AI Assistant */}
        <AnimatePresence>
          {aiPanelVisible ? (
            <AIAssistant key="ai-assistant" />
          ) : (
            <motion.button
              key="ai-toggle-button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={toggleAIPanel}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 bg-[#6C5CE7] text-white rounded-l-lg shadow-lg hover:bg-[#5B4BD6] transition-colors"
            >
              <Bot className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {/* Premium IDE Status Bar */}
      <footer className="h-8 flex items-center justify-between px-4 bg-[#1E1E2E] border-t border-[#2D2D3A] text-[11px] text-gray-400 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-green-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span>WASM Sandbox: Ready</span>
          </div>
          <span>Developed by <span className="text-[#6C5CE7] font-medium">Hood_Technoid</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          {activeTab && (
            <>
              <span className="font-mono text-gray-500">{activeTab.name}</span>
              <span>Lines: {activeTab.content.split('\n').length}</span>
              <span className="uppercase text-indigo-400 font-semibold">{activeTab.language}</span>
            </>
          )}
          <span>UTF-8</span>
          <span className="hidden sm:inline bg-[#2D2D3A] px-2 py-0.5 rounded text-[10px] uppercase font-semibold text-gray-400 border border-[#3D3D4A]">Ctrl+Shift+P Palette</span>
        </div>
      </footer>

      <InputModal
        isOpen={isInputModalOpen}
        count={inputModalCount}
        onClose={closeInputModal}
        onSubmit={(values) => {
          if (inputModalOnSubmit) inputModalOnSubmit(values);
          closeInputModal();
        }}
      />

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-lg bg-[#252532] border border-[#3D3D4A] rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans"
            >
              {/* Search input */}
              <div className="p-3 border-b border-[#2D2D3A] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#6C5CE7]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-500"
                />
                <button
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="text-xs text-gray-500 hover:text-white px-2 py-1 bg-[#2D2D3A] rounded"
                >
                  ESC
                </button>
              </div>
              
              {/* Command list */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                {[
                  { name: 'Run Active File', shortcut: 'Ctrl+Enter', action: () => {
                      // trigger run code
                      toast.info("Select Run button in Toolbar or run file inside Terminal.");
                    }
                  },
                  { name: 'Toggle Terminal', shortcut: 'Ctrl+`', action: toggleTerminal },
                  { name: 'Toggle AI Assistant', shortcut: 'Ctrl+A', action: toggleAIPanel },
                  { name: 'Clear Terminal Output', shortcut: '', action: () => useIDEStore.getState().clearTerminal() },
                  { name: 'Increase Font Size', shortcut: 'Ctrl++', action: () => useIDEStore.getState().setFontSize(Math.min(24, useIDEStore.getState().fontSize + 1)) },
                  { name: 'Decrease Font Size', shortcut: 'Ctrl+-', action: () => useIDEStore.getState().setFontSize(Math.max(10, useIDEStore.getState().fontSize - 1)) },
                  { name: 'Reset Workspace Project', shortcut: '', action: () => { if (confirm('Reset workspace to default?')) useIDEStore.getState().initializeSampleProject(); } }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.action();
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3D3D4A] rounded-lg text-left transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.shortcut && <kbd className="text-[10px] text-gray-500 bg-[#1E1E2E] px-1.5 py-0.5 rounded font-mono">{item.shortcut}</kbd>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
