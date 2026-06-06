import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation, type LanguageCode } from '@/store';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const navigate = useNavigate();
  const { t, languages, setLanguage, currentLanguage } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation (not scroll-driven)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          '-=0.8'
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );

      // Language panel
      tl.fromTo(
        panelRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        '-=0.3'
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      );

      // Scroll-driven EXIT animation (70% - 100%)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back
            gsap.set([headlineRef.current, subtitleRef.current, panelRef.current, ctaRef.current, taglineRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            gsap.set(imageRef.current, { opacity: 1, scale: 1 });
          },
        },
      });

      // SETTLE phase: 0% - 70% (elements static)
      // EXIT phase: 70% - 100%
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subtitleRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0.2, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        taglineRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.6, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    toast.success(`Language changed to ${languages[code].nativeName}`);
  };

  const handleStartLearning = () => {
    navigate('/auth?tab=signup');
  };

  // Split headline into words for animation
  const headlineWords = t('heroTitle').split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      data-settle-ratio="0.5"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-student.jpg"
          alt="Student coding"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(246,247,251,0.95) 0%, rgba(246,247,251,0.75) 45%, rgba(246,247,251,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center py-20 sm:py-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <h1
                ref={headlineRef}
                className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1D2B] leading-tight mb-4 sm:mb-6"
              >
                {headlineWords.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </h1>

              <p
                ref={subtitleRef}
                className="text-base sm:text-lg md:text-xl text-[#5A6078] mb-6 sm:mb-8"
                style={{ opacity: 0 }}
              >
                {t('heroSubtitle')}
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" style={{ opacity: 0 }}>
                <button onClick={handleStartLearning} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  {t('startLearning')}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('teachers');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <GraduationCap className="w-4 h-4" />
                  {t('imTeacher')}
                </button>
              </div>
            </div>

            {/* Right: Language Selector Panel */}
            <div
              ref={panelRef}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl"
              style={{ opacity: 0 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1D2B] mb-3 sm:mb-4">
                {t('selectLanguage')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:max-h-none max-h-[350px] overflow-y-auto pr-1">
                {Object.values(languages).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code as LanguageCode)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation w-full ${
                      currentLanguage === lang.code
                        ? 'bg-[#2E86AB] text-white shadow-lg'
                        : 'bg-[#F6F7FB] hover:bg-[#F0F4FA] text-[#1A1D2B]'
                    }`}
                  >
                    <span className={`text-sm shrink-0 flex items-center justify-center w-7 h-7 rounded-lg font-bold ${
                      currentLanguage === lang.code ? 'bg-white/20 text-white' : 'bg-black/5 text-[#5A6078]'
                    }`}>
                      {lang.flag}
                    </span>
                    <span className="text-xs font-semibold text-left leading-tight truncate">
                      {lang.nativeName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <p
        ref={taglineRef}
        className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xs sm:text-sm text-[#5A6078]"
        style={{ opacity: 0 }}
      >
        {t('builtFor')}
      </p>
    </section>
  );
}
