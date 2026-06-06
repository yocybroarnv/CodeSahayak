import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, MessageSquare, Bug, HelpCircle, Wifi, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/store';
import { useUIStore } from '@/store/uiStore';
import { languages } from '@/store/languageStore';

gsap.registerPlugin(ScrollTrigger);

export function EditorSection() {
  const { t, currentLanguage } = useTranslation();
  const { openDebugModal } = useUIStore();
  const sectionRef = useRef<HTMLElement>(null);
  const editorPaneRef = useRef<HTMLDivElement>(null);
  const tutorPaneRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<HTMLDivElement>(null);
  const errorLineRef = useRef<HTMLDivElement>(null);

  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        editorPaneRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        tutorPaneRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Code lines stagger
      const codeLines = codeLinesRef.current?.children || [];
      scrollTl.fromTo(
        codeLines,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      // Error underline draw-on
      scrollTl.fromTo(
        errorLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left' },
        0.15
      );

      // SETTLE (30% - 70%): Elements static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        editorPaneRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        tutorPaneRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleExplain = () => {
    setIsExplaining(true);
    // Simulate AI explanation
    setTimeout(() => {
      const explanations: Record<string, string> = {
        en: t('exampleError'),
        hi: 'लाइन 4 ऐसा लगता है कि यह एक ऐसे इंडेक्स तक पहुँचने की कोशिश कर रहा है जो मौजूद नहीं है। इसे ऐसे सोचें जैसे केवल 5 चाय बनी हों और आप 6वीँ कप माँग रहे हों।',
        ta: 'வரி 4 இருக்காத ஒரு குறியீட்டை அணுக முயற்சிக்கிறது போல் தெரிகிறது. 5 கோப்பைகள் மட்டுமே இருக்கும்போது 6வது கோப்பையைக் கேட்பது போல் யோசியுங்கள்.',
      };
      setExplanation(explanations[currentLanguage] || explanations.en);
      setIsExplaining(false);
    }, 800);
  };

  const codeLines = [
    'def calculate_average(numbers):',
    '    total = 0',
    '    for i in range(len(numbers)):',
    '        total += numbers[i]  # ← Error here',
    '    average = total / len(numbers)',
    '    return average',
    '',
    '# Test',
    'nums = [10, 20, 30]',
    'print(calculate_average(nums))',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#1A1D2B]"
      data-settle-ratio="0.5"
    >
      <div className="flex h-full">
        {/* Editor Pane */}
        <div
          ref={editorPaneRef}
          className="w-full lg:w-[62%] h-full flex flex-col"
          style={{ opacity: 0 }}
        >
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#252836] border-b border-[#3a3d4d]">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#8b8d98]">average.py</span>
              <span className="px-2 py-0.5 bg-[#FF6B35]/20 text-[#FF6B35] text-xs rounded">Modified</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2E86AB] text-white text-sm rounded-lg hover:bg-[#257a9e] transition-colors">
              <Play className="w-4 h-4" />
              Run
            </button>
          </div>

          {/* Code Area */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            <div ref={codeLinesRef}>
              {codeLines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="w-8 text-[#5A6078] text-right mr-4 select-none">
                    {index + 1}
                  </span>
                  <div className="relative flex-1">
                    <span
                      className={`${
                        line.includes('#')
                          ? 'text-[#6a9955]'
                          : line.includes('def') || line.includes('return')
                          ? 'text-[#569cd6]'
                          : 'text-[#d4d4d4]'
                      }`}
                    >
                      {line}
                    </span>
                    {line.includes('Error') && (
                      <div
                        ref={errorLineRef}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] cursor-pointer"
                        style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
                        onClick={openDebugModal}
                        title="Click to debug"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#2E86AB] text-white text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                {t('offline')}
              </span>
              <span>Python 3.11</span>
            </div>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
              {t('loopMaster')}: 72%
            </span>
          </div>
        </div>

        {/* Tutor Pane */}
        <div
          ref={tutorPaneRef}
          className="hidden lg:flex w-[38%] h-full flex-col bg-[#F6F7FB] border-l border-[#e5e7eb]"
          style={{ opacity: 0 }}
        >
          {/* Tutor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e5e7eb]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2E86AB] to-[#FF6B35] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#1A1D2B]">{t('yourHelper')}</span>
            </div>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-[#5A6078] hover:bg-[#F0F4FA] rounded">
              <span>{languages[currentLanguage].flag}</span>
              <span>{languages[currentLanguage].nativeName}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 p-4">
            <button
              onClick={handleExplain}
              disabled={isExplaining}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#2E86AB]/10 text-[#2E86AB] rounded-lg text-sm font-medium hover:bg-[#2E86AB]/20 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t('explainThis')}
            </button>
            <button
              onClick={openDebugModal}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-lg text-sm font-medium hover:bg-[#FF6B35]/20 transition-colors"
            >
              <Bug className="w-4 h-4" />
              {t('debugStep')}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-lg text-sm font-medium hover:bg-[#4ECDC4]/20 transition-colors">
              <HelpCircle className="w-4 h-4" />
              {t('quizMe')}
            </button>
          </div>

          {/* Explanation Area */}
          <div className="flex-1 overflow-auto p-4">
            {isExplaining ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-2 text-[#5A6078]">
                  <div className="w-5 h-5 border-2 border-[#2E86AB] border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              </div>
            ) : explanation ? (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-[#1A1D2B] leading-relaxed">{explanation}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={openDebugModal}
                    className="px-3 py-1.5 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#e55a2b] transition-colors"
                  >
                    Fix it
                  </button>
                  <button
                    onClick={() => setExplanation('')}
                    className="px-3 py-1.5 text-[#5A6078] text-sm hover:bg-[#F0F4FA] rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#5A6078]">
                <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                <p>Select code and click &quot;Explain this&quot;</p>
                <p className="text-sm mt-1">or click the error underline to debug</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
