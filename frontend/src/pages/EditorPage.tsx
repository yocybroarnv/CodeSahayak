import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Lightbulb,
  MessageCircle,
  Bug,
  BookOpen,
  RotateCcw,
  Send,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  Code2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageStore } from '@/store/languageStore';
import { api } from '@/store/authStore';
import { 
  programmingLanguages, 
  getLanguageById, 
  getSupportedLanguages,
  simulateCodeExecution,
  type ProgrammingLanguage,
} from '@/lib/programmingLanguages';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Hint {
  level: number;
  content: string;
}

export default function EditorPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentLanguage } = useLanguageStore();
  
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(programmingLanguages[0]);
  const [code, setCode] = useState(programmingLanguages[0].starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [hints, setHints] = useState<Hint[]>([]);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [debugStep, setDebugStep] = useState(0);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLanguageChange = (languageId: string) => {
    const lang = getLanguageById(languageId);
    if (lang) {
      setSelectedLanguage(lang);
      setCode(lang.starterCode);
      setOutput('');
      toast.success(`Switched to ${lang.name}`);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      const result = simulateCodeExecution(code, selectedLanguage.id);
      setOutput(result);
      setIsRunning(false);
      
      // Track progress
      if (!result.includes('Error')) {
        toast.success('Code executed successfully!');
      }
    }, 1000);
  };

  const handleGetHint = async () => {
    if (isLoadingHint) return;
    
    setIsLoadingHint(true);
    try {
      const response = await api.getHint({
        code,
        attempt: currentHintLevel + 1,
        userLanguage: currentLanguage,
      });
      
      const newHint: Hint = {
        level: currentHintLevel + 1,
        content: response.hint,
      };
      
      setHints(prev => [...prev, newHint]);
      setCurrentHintLevel(prev => prev + 1);
      
      const hintMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Hint ${newHint.level}: ${newHint.content}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, hintMessage]);
      
      toast.success('New hint available!');
    } catch (error) {
      toast.error('Failed to get hint');
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleExplain = async () => {
    try {
      const response = await api.getExplanation({
        code,
        language: selectedLanguage.id,
        userLanguage: currentLanguage,
      });
      
      const explainMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `${response.explanation}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, explainMessage]);
    } catch (error) {
      toast.error('Failed to get explanation');
    }
  };

  const handleDebug = async () => {
    setIsDebugMode(true);
    setDebugStep(1);
    
    try {
      const response = await api.getDebugHelp({
        code,
        error: 'Index out of range',
        language: selectedLanguage.id,
        userLanguage: currentLanguage,
        step: 1,
      });
      
      const debugMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `${response.title}: ${response.explanation}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, debugMessage]);
    } catch (error) {
      toast.error('Failed to start debug mode');
    }
  };

  const handleNextDebugStep = async () => {
    if (debugStep >= 3) {
      setIsDebugMode(false);
      setDebugStep(0);
      return;
    }
    
    const nextStep = debugStep + 1;
    setDebugStep(nextStep);
    
    try {
      const response = await api.getDebugHelp({
        code,
        error: 'Index out of range',
        language: selectedLanguage.id,
        userLanguage: currentLanguage,
        step: nextStep,
      });
      
      const debugMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `${response.title}: ${response.explanation}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, debugMessage]);
    } catch (error) {
      toast.error('Failed to get next step');
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand your question about ${selectedLanguage.name}. Let me help you with that...`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleReset = () => {
    setCode(selectedLanguage.starterCode);
    setOutput('');
    setMessages([]);
    setHints([]);
    setCurrentHintLevel(0);
    setDebugStep(0);
    setIsDebugMode(false);
  };

  const supportedLanguages = getSupportedLanguages();

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#DFE6E9] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <span className="text-white font-bold">CS</span>
            </div>
            <span className="font-bold text-xl text-[#2D3436]">Code Editor</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span>{selectedLanguage.icon}</span>
                  <span>{selectedLanguage.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {supportedLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className="gap-2"
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                    {selectedLanguage.id === lang.id && (
                      <CheckCircle className="w-4 h-4 ml-auto text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Run
            </Button>
          </div>
        </div>
      </header>

      {/* Language Info Bar */}
      <div className="bg-white border-b border-[#DFE6E9] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#636E72]">
              <span className="font-medium text-[#2D3436]">{selectedLanguage.icon} {selectedLanguage.name}:</span>{' '}
              {selectedLanguage.description}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSyllabus(!showSyllabus)}
            className="text-[#6C5CE7]"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showSyllabus ? 'Hide' : 'Show'} Syllabus
          </Button>
        </div>
      </div>

      {/* Syllabus Panel */}
      {showSyllabus && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-[#6C5CE7]/5 to-[#A29BFE]/5 border-b border-[#DFE6E9]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="font-medium text-[#2D3436] mb-3">
              {selectedLanguage.name} Syllabus
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedLanguage.syllabus.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-[#636E72] border border-[#DFE6E9]"
                >
                  {index + 1}. {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left: Code Editor */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="py-3 px-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Code2 className="w-4 h-4" style={{ color: selectedLanguage.color }} />
                    main.{selectedLanguage.extension}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#636E72]">{selectedLanguage.name}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm bg-[#1E1E1E] text-[#D4D4D4] resize-none focus:outline-none"
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="h-48">
              <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {output.includes('Error') ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : output ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="font-mono text-sm text-[#636E72] whitespace-pre-wrap">
                  {output || 'Click "Run" to see output...'}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Right: AI Assistant */}
          <Card className="flex flex-col">
            <CardHeader className="py-3 px-4 border-b">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#6C5CE7]" />
                AI Tutor
              </CardTitle>
            </CardHeader>

            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="mx-4 mt-2">
                <TabsTrigger value="chat" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="hints" className="gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Hints ({hints.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-[#636E72] py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Ask me anything about your {selectedLanguage.name} code!</p>
                        <p className="text-sm mt-2">I can explain, debug, or give hints.</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-[#6C5CE7] text-white'
                                : 'bg-[#F6F7FB] text-[#2D3436]'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <span className="text-xs opacity-60 mt-1 block">
                              {msg.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExplain}
                      className="text-xs"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      Explain Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDebug}
                      className="text-xs"
                    >
                      <Bug className="w-3 h-3 mr-1" />
                      Debug
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGetHint}
                      disabled={isLoadingHint || currentHintLevel >= 4}
                      className="text-xs"
                    >
                      <Lightbulb className="w-3 h-3 mr-1" />
                      Get Hint ({currentHintLevel}/4)
                    </Button>
                    {isDebugMode && debugStep < 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextDebugStep}
                        className="text-xs"
                      >
                        <ChevronRight className="w-3 h-3 mr-1" />
                        Next Step
                      </Button>
                    )}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={`Ask about ${selectedLanguage.name}...`}
                      className="flex-1 px-4 py-2 border border-[#DFE6E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hints" className="flex-1 p-4 m-0">
                {hints.length === 0 ? (
                  <div className="text-center text-[#636E72] py-8">
                    <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hints yet</p>
                    <p className="text-sm mt-2">Click "Get Hint" to receive progressive hints</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hints.map((hint) => (
                      <motion.div
                        key={hint.level}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span className="font-medium text-amber-800">
                            Hint {hint.level}
                          </span>
                        </div>
                        <p className="text-sm text-amber-900">{hint.content}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
