import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Wifi, WifiOff, Check, ArrowLeft, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';
import { useTranslation, type LanguageCode } from '@/store';
import { languages } from '@/store/languageStore';
import { toast } from 'sonner';
import { cacheOfflineData } from '@/lib/offlineSync';
import { useIDEStore } from '@/store/ideStore';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function OnboardingSection() {
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const langButtonsRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState('NCERT');
  const [selectedGrade, setSelectedGrade] = useState('11');
  const [isOffline, setIsOffline] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulate download and cache actual problem sets in IndexedDB
  useEffect(() => {
    if (isOffline && isDownloading && downloadProgress < 100) {
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + Math.random() * 25;
          return next > 100 ? 100 : next;
        });
      }, 300);
      return () => clearInterval(interval);
    } else if (downloadProgress >= 100) {
      setIsDownloading(false);
      // Cache syllabus and basic exercises locally inside browser IndexedDB
      cacheOfflineData('challenges', [
        { id: 'ncert-basics', title: 'Python Operators', type: 'ncert', difficulty: 'EASY' },
        { id: 'ncert-loops', title: 'NCERT range() Loops', type: 'ncert', difficulty: 'MEDIUM' },
        { id: 'vtu-functions', title: 'VTU Reusable Functions', type: 'vtu', difficulty: 'HARD' }
      ]).then(() => {
        toast.success('Offline coding modules successfully cached locally!');
      }).catch(err => {
        console.error('Offline caching failed:', err);
      });
    }
  }, [isOffline, isDownloading, downloadProgress]);

  const handleOfflineToggle = (enabled: boolean) => {
    setIsOffline(enabled);
    if (enabled) {
      setIsDownloading(true);
    } else {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

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

      // Map outline draw-on
      const mapPath = mapRef.current?.querySelector('path');
      if (mapPath) {
        const length = mapPath.getTotalLength();
        gsap.set(mapPath, { strokeDasharray: length, strokeDashoffset: length });
        scrollTl.to(mapPath, { strokeDashoffset: 0, ease: 'none' }, 0);
      }

      // Card entrance
      scrollTl.fromTo(
        cardRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Language buttons stagger
      const buttons = langButtonsRef.current?.children || [];
      if (buttons.length > 0) {
        scrollTl.fromTo(
          buttons,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'back.out(1.7)' },
          0.15
        );
      }

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 0.98, y: '-6vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      if (mapPath) {
        scrollTl.to(mapPath, { opacity: 0.2, ease: 'power2.in' }, 0.7);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleGetStarted = () => {
    // Generate specialized board files in student's active editor workspace
    useIDEStore.getState().initializeBoardSyllabusProject(selectedBoard, selectedGrade);
    
    toast.success(`Welcome to CodeSahayak!`, {
      description: `Learning in ${languages[currentLanguage as keyof typeof languages]?.nativeName || 'English'} aligned with ${selectedBoard} Syllabus for Class ${selectedGrade}!`,
    });
    navigate('/ide');
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F6F7FB] flex items-center justify-center"
      data-settle-ratio="0.5"
    >
      {/* India Map Background */}
      <svg
        ref={mapRef}
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 800 900"
        fill="none"
      >
        <path
          d="M400 50 C450 50, 500 80, 520 120 C540 160, 550 200, 580 230 C610 260, 650 280, 680 320 C710 360, 720 400, 700 450 C680 500, 640 540, 620 580 C600 620, 610 660, 630 700 C650 740, 680 780, 670 820 C660 860, 620 880, 580 890 C540 900, 500 890, 460 870 C420 850, 380 820, 350 780 C320 740, 300 700, 280 660 C260 620, 240 580, 220 540 C200 500, 180 460, 160 420 C140 380, 120 340, 100 300 C80 260, 60 220, 50 180 C40 140, 50 100, 80 80 C110 60, 150 50, 200 45 C250 40, 300 40, 350 42 C380 43, 400 50, 400 50 Z"
          stroke="#2E86AB"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative w-[90%] max-w-4xl bg-white rounded-[22px] shadow-2xl overflow-hidden"
        style={{ opacity: 1 }}
      >
        <div className="p-6 lg:p-8">
          {step === 0 ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E86AB] to-[#FF6B35] flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1D2B]">
                  {t('onboardingTitle') || 'Configure Your AI Assistant'}
                </h2>
                <p className="text-[#5A6078] mt-2">{t('onboardingSubtitle') || 'Learn coding locally in your regional language'}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Language Selection */}
                <div>
                  <h3 className="font-semibold text-[#1A1D2B] mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#2E86AB]" />
                    {t('selectLanguage') || 'Select Language'}
                  </h3>
                  <div ref={langButtonsRef} className="grid grid-cols-2 gap-2 lg:max-h-none max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                    {Object.values(languages).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as LanguageCode)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl transition-all w-full text-left ${
                          currentLanguage === lang.code
                            ? 'bg-[#2E86AB]/15 ring-2 ring-[#2E86AB]'
                            : 'bg-[#F6F7FB] hover:bg-[#F0F4FA]'
                        }`}
                      >
                        <span className={`text-sm shrink-0 flex items-center justify-center w-7 h-7 rounded-lg font-bold ${
                          currentLanguage === lang.code ? 'bg-[#2E86AB]/20 text-[#2E86AB]' : 'bg-black/5 text-[#5A6078]'
                        }`}>
                          {lang.flag}
                        </span>
                        <span className="text-xs font-semibold text-[#1A1D2B] truncate">
                          {lang.nativeName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offline Mode */}
                <div>
                  <h3 className="font-semibold text-[#1A1D2B] mb-3 flex items-center gap-2">
                    {isOffline ? (
                      <WifiOff className="w-4 h-4 text-[#FF6B35]" />
                    ) : (
                      <Wifi className="w-4 h-4 text-[#2E86AB]" />
                    )}
                    {t('enableOffline') || 'Enable Offline Caching'}
                  </h3>
                  <div className="bg-[#F6F7FB] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-[#1A1D2B] text-sm">{t('downloadSize') || 'Package Size (14.2 MB)'}</p>
                        <p className="text-xs text-[#5A6078]">{t('problemsAvailable') || '250+ standard coding tasks'}</p>
                      </div>
                      <button
                        onClick={() => handleOfflineToggle(!isOffline)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          isOffline ? 'bg-[#2E86AB]' : 'bg-[#5A6078]/30'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            isOffline ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {isOffline && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-[#5A6078]">
                            {downloadProgress >= 100 ? 'Ready!' : 'Downloading...'}
                          </span>
                          <span className="font-medium text-[#2E86AB]">
                            {Math.round(downloadProgress)}%
                          </span>
                        </div>
                        <div className="h-2 bg-[#F0F4FA] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2E86AB] rounded-full transition-all duration-300"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('back') || 'Back'}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white px-4 py-2 rounded-xl"
                >
                  {t('next') || 'Configure Board Syllabus'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Step 1: Syllabus Selection */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1D2B]">
                  Align Your Syllabus Board
                </h2>
                <p className="text-[#5A6078] mt-2">Personalize lessons to match your school textbooks</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Board Selection */}
                <div>
                  <h3 className="font-semibold text-[#1A1D2B] mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#6C5CE7]" />
                    Syllabus Board
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['NCERT', 'CBSE', 'VTU', 'Anna University'].map((board) => (
                      <button
                        key={board}
                        onClick={() => setSelectedBoard(board)}
                        className={`p-3 rounded-xl transition-all font-medium text-sm flex flex-col items-center ${
                          selectedBoard === board
                            ? 'bg-[#6C5CE7]/10 ring-2 ring-[#6C5CE7] text-[#6C5CE7]'
                            : 'bg-[#F6F7FB] hover:bg-[#F0F4FA] text-gray-700'
                        }`}
                      >
                        {board}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade / Level selection */}
                <div>
                  <h3 className="font-semibold text-[#1A1D2B] mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#6C5CE7]" />
                    Class Standard
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map((gradeText) => {
                      const gradeNum = gradeText.split(' ')[1];
                      return (
                        <button
                          key={gradeNum}
                          onClick={() => setSelectedGrade(gradeNum)}
                          className={`p-3 rounded-xl transition-all font-medium text-sm flex flex-col items-center ${
                            selectedGrade === gradeNum
                              ? 'bg-[#6C5CE7]/10 ring-2 ring-[#6C5CE7] text-[#6C5CE7]'
                              : 'bg-[#F6F7FB] hover:bg-[#F0F4FA] text-gray-700'
                          }`}
                        >
                          {gradeText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(0)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('back') || 'Back'}
                </button>
                <button
                  onClick={handleGetStarted}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white px-4 py-2 rounded-xl"
                >
                  {t('getStarted') || 'Launch Coding Workspace'}
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
