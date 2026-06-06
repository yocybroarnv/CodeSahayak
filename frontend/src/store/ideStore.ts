import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { programmingLanguages, type ProgrammingLanguage } from '@/lib/programmingLanguages';

export interface FileNode {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isFolder: boolean;
  isOpen?: boolean;
  isModified?: boolean;
  children?: FileNode[];
  parentId?: string | null;
}

export interface Tab {
  id: string;
  fileId: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isModified: boolean;
}

export interface TerminalOutput {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface IDEState {
  // Files
  files: FileNode[];
  activeFileId: string | null;
  openTabs: Tab[];
  activeTabId: string | null;
  
  // UI State
  sidebarVisible: boolean;
  sidebarWidth: number;
  terminalVisible: boolean;
  terminalHeight: number;
  aiPanelVisible: boolean;
  aiPanelWidth: number;
  
  // Terminal
  terminalOutputs: TerminalOutput[];
  
  // AI Chat
  aiMessages: AIChatMessage[];
  isAIStreaming: boolean;
  
  // Editor Settings
  theme: 'dark' | 'light';
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  
  // Selected Language
  selectedLanguage: ProgrammingLanguage;
  
  // Actions
  setFiles: (files: FileNode[]) => void;
  addFile: (file: FileNode, parentId?: string | null) => void;
  updateFile: (fileId: string, updates: Partial<FileNode>) => void;
  deleteFile: (fileId: string) => void;
  setActiveFile: (fileId: string | null) => void;
  openTab: (file: FileNode) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
  saveTab: (tabId: string) => void;
  
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  toggleAIPanel: () => void;
  addTerminalOutput: (output: Omit<TerminalOutput, 'id' | 'timestamp'>) => void;
  clearTerminal: () => void;
  
  addAIMessage: (message: Omit<AIChatMessage, 'id' | 'timestamp'>) => void;
  updateAIMessage: (messageId: string, content: string) => void;
  clearAIChat: () => void;
  
  setTheme: (theme: 'dark' | 'light') => void;
  setFontSize: (size: number) => void;
  toggleWordWrap: () => void;
  toggleMinimap: () => void;
  toggleLineNumbers: () => void;
  
  setSelectedLanguage: (language: ProgrammingLanguage) => void;
  
  // Initialize with sample project
  initializeSampleProject: () => void;
  initializeBoardSyllabusProject: (board: string, grade: string) => void;

  // Input Modal
  isInputModalOpen: boolean;
  inputModalCount: number;
  inputModalOnSubmit: ((values: string[]) => void) | null;
  openInputModal: (count: number, onSubmit: (values: string[]) => void) => void;
  closeInputModal: () => void;

  // Command history and execution timer
  commandHistory: string[];
  addCommandHistory: (cmd: string) => void;
  executionTimer: number;
  setExecutionTimer: (time: number) => void;
}

const defaultFiles: FileNode[] = [
  {
    id: 'root',
    name: 'my-project',
    path: '/',
    content: '',
    language: 'folder',
    isFolder: true,
    isOpen: true,
    children: [
      {
        id: 'src',
        name: 'src',
        path: '/src',
        content: '',
        language: 'folder',
        isFolder: true,
        isOpen: true,
        parentId: 'root',
        children: [
          {
            id: 'main-py',
            name: 'main.py',
            path: '/src/main.py',
            content: `# Welcome to CodeSahayak IDE!
# This is your main Python file

def greet(name):
    \"\"\"A simple greeting function\"\"\"
    return f"Hello, {name}! Welcome to coding."

def factorial(n):
    \"\"\"Calculate factorial using recursion\"\"\"
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Main execution
if __name__ == "__main__":
    print(greet("Student"))
    print(f"Factorial of 5 is: {factorial(5)}")
    
    # Try modifying this code!
    # Add your own functions below`,
            language: 'python',
            isFolder: false,
            parentId: 'src',
          },
          {
            id: 'utils-py',
            name: 'utils.py',
            path: '/src/utils.py',
            content: `# Utility functions for your project

def is_prime(n):
    \"\"\"Check if a number is prime\"\"\"
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def fibonacci(n):
    \"\"\"Generate Fibonacci sequence\"\"\"
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib`,
            language: 'python',
            isFolder: false,
            parentId: 'src',
          },
        ],
      },
      {
        id: 'readme',
        name: 'README.md',
        path: '/README.md',
        content: `# My First Project

Welcome to your CodeSahayak project!

## Getting Started

1. Open any file from the sidebar
2. Edit the code in the editor
3. Click "Run" to execute your code
4. Ask the AI tutor for help anytime!

## Files

- \`src/main.py\` - Main Python file
- \`src/utils.py\` - Utility functions

Happy Coding!`,
        language: 'markdown',
        isFolder: false,
        parentId: 'root',
      },
    ],
  },
];

export const useIDEStore = create<IDEState>()(
  persist(
    (set) => ({
      files: defaultFiles,
      activeFileId: 'main-py',
      openTabs: [
        {
          id: 'tab-main-py',
          fileId: 'main-py',
          name: 'main.py',
          path: '/src/main.py',
          content: defaultFiles[0].children![0].children![0].content,
          language: 'python',
          isModified: false,
        },
      ],
      activeTabId: 'tab-main-py',
      
      sidebarVisible: true,
      sidebarWidth: 260,
      terminalVisible: true,
      terminalHeight: 200,
      aiPanelVisible: true,
      aiPanelWidth: 320,
      
      terminalOutputs: [
        { id: '1', type: 'output', content: 'CodeSahayak IDE v1.0.0', timestamp: new Date() },
        { id: '2', type: 'output', content: 'Ready to code! Select a file to start.', timestamp: new Date() },
      ],
      
      aiMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Welcome to CodeSahayak IDE!\n\nI\'m your AI coding assistant. I can help you with:\n\n• Explaining code concepts\n• Debugging errors\n• Writing better code\n• Answering programming questions\n\nJust type your question or select code and ask!',
          timestamp: new Date(),
        },
      ],
      isAIStreaming: false,
      
      theme: 'dark',
      fontSize: 14,
      wordWrap: true,
      minimap: true,
      lineNumbers: true,
      
      selectedLanguage: programmingLanguages[0],

      isInputModalOpen: false,
      inputModalCount: 0,
      inputModalOnSubmit: null,
      openInputModal: (count, onSubmit) => set({
        isInputModalOpen: true,
        inputModalCount: count,
        inputModalOnSubmit: onSubmit
      }),
      closeInputModal: () => set({
        isInputModalOpen: false,
        inputModalCount: 0,
        inputModalOnSubmit: null
      }),

      commandHistory: [],
      executionTimer: 0,
      addCommandHistory: (cmd) => set((state) => {
        if (state.commandHistory.length > 0 && state.commandHistory[state.commandHistory.length - 1] === cmd) {
          return state;
        }
        return {
          commandHistory: [...state.commandHistory.slice(-99), cmd]
        };
      }),
      setExecutionTimer: (time) => set({ executionTimer: time }),
      
      setFiles: (files) => set({ files }),
      
      addFile: (file, parentId = null) => set((state) => {
        const addToParent = (nodes: FileNode[]): FileNode[] => {
          return nodes.map((node) => {
            if (node.id === parentId && node.isFolder) {
              return {
                ...node,
                children: [...(node.children || []), file],
                isOpen: true,
              };
            }
            if (node.children) {
              return { ...node, children: addToParent(node.children) };
            }
            return node;
          });
        };
        
        if (parentId === null) {
          return { files: [...state.files, file] };
        }
        return { files: addToParent(state.files) };
      }),
      
      updateFile: (fileId, updates) => set((state) => {
        const updateInTree = (nodes: FileNode[]): FileNode[] => {
          return nodes.map((node) => {
            if (node.id === fileId) {
              return { ...node, ...updates };
            }
            if (node.children) {
              return { ...node, children: updateInTree(node.children) };
            }
            return node;
          });
        };
        return { files: updateInTree(state.files) };
      }),
      
      deleteFile: (fileId) => set((state) => {
        const deleteFromTree = (nodes: FileNode[]): FileNode[] => {
          return nodes
            .filter((node) => node.id !== fileId)
            .map((node) => {
              if (node.children) {
                return { ...node, children: deleteFromTree(node.children) };
              }
              return node;
            });
        };
        
        // Also close tab if open
        const tabToClose = state.openTabs.find((t) => t.fileId === fileId);
        const newTabs = state.openTabs.filter((t) => t.fileId !== fileId);
        const newActiveTab = state.activeTabId === tabToClose?.id
          ? newTabs[0]?.id || null
          : state.activeTabId;
        
        return {
          files: deleteFromTree(state.files),
          openTabs: newTabs,
          activeTabId: newActiveTab,
        };
      }),
      
      setActiveFile: (fileId) => set({ activeFileId: fileId }),
      
      openTab: (file) => set((state) => {
        const existingTab = state.openTabs.find((t) => t.fileId === file.id);
        if (existingTab) {
          return { activeTabId: existingTab.id };
        }
        
        const newTab: Tab = {
          id: `tab-${file.id}`,
          fileId: file.id,
          name: file.name,
          path: file.path,
          content: file.content,
          language: file.language,
          isModified: false,
        };
        
        return {
          openTabs: [...state.openTabs, newTab],
          activeTabId: newTab.id,
        };
      }),
      
      closeTab: (tabId) => set((state) => {
        const newTabs = state.openTabs.filter((t) => t.id !== tabId);
        const newActiveTab = state.activeTabId === tabId
          ? newTabs[newTabs.length - 1]?.id || null
          : state.activeTabId;
        return { openTabs: newTabs, activeTabId: newActiveTab };
      }),
      
      setActiveTab: (tabId) => set({ activeTabId: tabId }),
      
      updateTabContent: (tabId, content) => set((state) => ({
        openTabs: state.openTabs.map((t) =>
          t.id === tabId ? { ...t, content, isModified: true } : t
        ),
      })),
      
      saveTab: (tabId) => set((state) => {
        const tab = state.openTabs.find((t) => t.id === tabId);
        if (!tab) return state;
        
        // Update file content
        const updateFileContent = (nodes: FileNode[]): FileNode[] => {
          return nodes.map((node) => {
            if (node.id === tab.fileId) {
              return { ...node, content: tab.content };
            }
            if (node.children) {
              return { ...node, children: updateFileContent(node.children) };
            }
            return node;
          });
        };
        
        return {
          files: updateFileContent(state.files),
          openTabs: state.openTabs.map((t) =>
            t.id === tabId ? { ...t, isModified: false } : t
          ),
        };
      }),
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      
      toggleSidebar: () => set((state) => ({ sidebarVisible: !state.sidebarVisible })),
      toggleTerminal: () => set((state) => ({ terminalVisible: !state.terminalVisible })),
      toggleAIPanel: () => set((state) => ({ aiPanelVisible: !state.aiPanelVisible })),
      
      addTerminalOutput: (output) => set((state) => ({
        terminalOutputs: [
          ...state.terminalOutputs,
          { ...output, id: Date.now().toString(), timestamp: new Date() },
        ],
      })),
      
      clearTerminal: () => set({ terminalOutputs: [] }),
      
      addAIMessage: (message) => set((state) => ({
        aiMessages: [
          ...state.aiMessages,
          { ...message, id: Date.now().toString(), timestamp: new Date() },
        ],
      })),
      
      updateAIMessage: (messageId, content) => set((state) => ({
        aiMessages: state.aiMessages.map((m) =>
          m.id === messageId ? { ...m, content } : m
        ),
      })),
      
      clearAIChat: () => set({
        aiMessages: [{
          id: 'welcome',
          role: 'assistant',
          content: 'Chat cleared. How can I help you?',
          timestamp: new Date(),
        }],
      }),
      
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleWordWrap: () => set((state) => ({ wordWrap: !state.wordWrap })),
      toggleMinimap: () => set((state) => ({ minimap: !state.minimap })),
      toggleLineNumbers: () => set((state) => ({ lineNumbers: !state.lineNumbers })),
      
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      
      initializeSampleProject: () => set({
        files: defaultFiles,
        activeFileId: 'main-py',
        openTabs: [
          {
            id: 'tab-main-py',
            fileId: 'main-py',
            name: 'main.py',
            path: '/src/main.py',
            content: defaultFiles[0].children![0].children![0].content,
            language: 'python',
            isModified: false,
          },
        ],
        activeTabId: 'tab-main-py',
      }),

      initializeBoardSyllabusProject: (board, grade) => set(() => {
        let mainContent = '';
        let utilsContent = '';
        let readmeContent = '';

        if (board === 'VTU' || board === 'Anna University') {
          // Engineering Syllabus
          mainContent = `# CodeSahayak - ${board} Data Structures Lab Practical
# Grade Level: College UG (Sem ${grade === '11' ? '1' : '3'})

def linear_search(arr, target):
    """Linear search implementation"""
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def bubble_sort(arr):
    """Bubble sort algorithm implementation"""
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

if __name__ == "__main__":
    practical_data = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original Practical Array: {practical_data}")
    
    sorted_data = bubble_sort(practical_data.copy())
    print(f"Sorted Array (Bubble Sort): {sorted_data}")
    
    search_target = 22
    search_idx = linear_search(sorted_data, search_target)
    print(f"Searching for {search_target} in sorted array: Found at Index {search_idx}")
`;
          utilsContent = `# Helper algorithms for ${board} Laboratory
def gcd(a, b):
    """Euclidean algorithm for greatest common divisor"""
    while b:
        a, b = b, a % b
    return a
`;
          readmeContent = `# ${board} Computer Science Workspace

Welcome to your university laboratory workspace! This workspace contains lab practicals for **Data Structures & Algorithms**.

## Practicals:
1. Bubble Sort Algorithms
2. Linear Search Implementation
3. GCD using Euclidean Algorithm
`;
        } else {
          // School Syllabus (NCERT / CBSE)
          mainContent = `# CodeSahayak - NCERT Class ${grade} Computer Science
# Topic: Basics of Programming & Problem Solving

def calculate_simple_interest(p, r, t):
    """NCERT CS Workbook: Chapter 4 Interest Calculator"""
    return (p * r * t) / 100

def list_range_demo():
    """Demonstrate loops and lists in NCERT syllabus"""
    numbers = []
    for i in range(1, 11):
        if i % 2 == 0:
            numbers.append(i)
    return numbers

if __name__ == "__main__":
    print("Welcome to NCERT Class Room!")
    
    principal = 5000
    rate = 7.5
    time = 3
    si = calculate_simple_interest(principal, rate, time)
    print(f"Simple Interest for Principal {principal} at {rate}% for {time} years is: Rs.{si}")
    
    even_range = list_range_demo()
    print(f"Accumulated Even Numbers range(1, 11) loop: {even_range}")
`;
          utilsContent = `# NCERT Math & Utility functions
def is_even(n):
    """Check if number is even"""
    return n % 2 == 0
`;
          readmeContent = `# NCERT Class ${grade} Computer Science

Welcome to your CBSE/NCERT computer science student workbook!

## Workspace Chapters:
- Chapter 3: Introduction to Variables
- Chapter 4: Basic Math Operators
- Chapter 5: Control Flow Loops (range() & while)
`;
        }

        const customFiles: FileNode[] = [
          {
            id: 'root',
            name: `${board.toLowerCase().replace(/\s+/g, '-')}-project`,
            path: '/',
            content: '',
            language: 'folder',
            isFolder: true,
            isOpen: true,
            children: [
              {
                id: 'src',
                name: 'src',
                path: '/src',
                content: '',
                language: 'folder',
                isFolder: true,
                isOpen: true,
                parentId: 'root',
                children: [
                  {
                    id: 'main-py',
                    name: 'main.py',
                    path: '/src/main.py',
                    content: mainContent,
                    language: 'python',
                    isFolder: false,
                    parentId: 'src',
                  },
                  {
                    id: 'utils-py',
                    name: 'utils.py',
                    path: '/src/utils.py',
                    content: utilsContent,
                    language: 'python',
                    isFolder: false,
                    parentId: 'src',
                  },
                ],
              },
              {
                id: 'readme',
                name: 'README.md',
                path: '/README.md',
                content: readmeContent,
                language: 'markdown',
                isFolder: false,
                parentId: 'root',
              },
            ],
          },
        ];

        return {
          files: customFiles,
          activeFileId: 'main-py',
          openTabs: [
            {
              id: 'tab-main-py',
              fileId: 'main-py',
              name: 'main.py',
              path: '/src/main.py',
              content: mainContent,
              language: 'python',
              isModified: false,
            },
          ],
          activeTabId: 'tab-main-py',
        };
      }),
    }),
    {
      name: 'codesahayak-ide',
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
        wordWrap: state.wordWrap,
        minimap: state.minimap,
        lineNumbers: state.lineNumbers,
        sidebarWidth: state.sidebarWidth,
        terminalHeight: state.terminalHeight,
        aiPanelWidth: state.aiPanelWidth,
        files: state.files,
        activeFileId: state.activeFileId,
        openTabs: state.openTabs,
        activeTabId: state.activeTabId,
        commandHistory: state.commandHistory,
      }),
    }
  )
);
