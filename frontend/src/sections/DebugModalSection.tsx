import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, ChevronRight, HelpCircle, Check } from 'lucide-react';
import { useTranslation } from '@/store';
import { useUIStore } from '@/store/uiStore';

gsap.registerPlugin(ScrollTrigger);

export function DebugModalSection() {
  const { t } = useTranslation();
  const { openDebugModal } = useUIStore();
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
        modalRef.current,
        { scale: 0.92, y: '10vh', opacity: 0 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Stepper dots stagger
      const dots = stepperRef.current?.querySelectorAll('.step-dot') || [];
      scrollTl.fromTo(
        dots,
        { scale: 0 },
        { scale: 1, stagger: 0.03, ease: 'back.out(1.7)' },
        0.1
      );

      // Content fade in
      scrollTl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%): Modal readable

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        modalRef.current,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 0.96, y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    { id: 1, label: t('step1') },
    { id: 2, label: t('step2') },
    { id: 3, label: t('step3') },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F6F7FB]/80 backdrop-blur-sm flex items-center justify-center"
      data-settle-ratio="0.5"
    >
      {/* Modal Card */}
      <div
        ref={modalRef}
        className="w-[90%] max-w-3xl bg-white rounded-[22px] shadow-2xl overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e5e7eb]">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1D2B]">Debug Walkthrough</h3>
        </div>

        {/* Stepper */}
        <div ref={stepperRef} className="flex items-center justify-center gap-2 py-4 bg-[#F6F7FB]">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`step-dot w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  index === 1
                    ? 'bg-[#2E86AB] text-white'
                    : 'bg-white text-[#5A6078] border border-[#e5e7eb]'
                }`}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 mx-2 bg-[#e5e7eb]" />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-6">
          <h4 className="text-xl font-semibold text-[#1A1D2B] mb-4">{t('whyHappens')}</h4>

          {/* Code Snippet */}
          <div className="code-block mb-4">
            <pre>{`def calculate_average(numbers):
    total = 0
    for i in range(len(numbers)):
        total += numbers[i]  # ← This line
    average = total / len(numbers)
    return average`}</pre>
          </div>

          {/* Analogy Card */}
          <div className="bg-[#FF6B35]/5 border-l-4 border-[#FF6B35] rounded-r-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1A1D2B] mb-1">Cultural Analogy</p>
                <p className="text-[#5A6078] italic">&quot;{t('chaiAnalogy')}&quot;</p>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-[#2E86AB]/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-[#2E86AB]">
              <strong>Tip:</strong> Python lists are 0-indexed. The last valid index is{' '}
              <code>len(numbers) - 1</code>. When your loop runs with{' '}
              <code>range(len(numbers))</code>, the last value of <code>i</code> is actually valid—
              but the error occurs when the list is empty!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => alert('Community help coming soon!')}
              className="btn-secondary flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              {t('askCommunity')}
            </button>
            <button
              onClick={openDebugModal}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Try Fixing It
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
