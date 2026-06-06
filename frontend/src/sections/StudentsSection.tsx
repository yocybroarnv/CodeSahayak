import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Code2, Trophy, Zap } from 'lucide-react';
import { useTranslation } from '@/store';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function StudentsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text block animation
      gsap.fromTo(
        textRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Code block reveal
      const codeBlock = cardRef.current?.querySelector('.code-reveal');
      if (codeBlock) {
        gsap.fromTo(
          codeBlock,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
            transformOrigin: 'left',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'top 35%',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const bullets = [
    t('studentsBullet1'),
    t('studentsBullet2'),
    t('studentsBullet3'),
  ];

  const handleTryTask = () => {
    toast.info('Daily tasks coming soon!', {
      description: 'Stay tuned for personalized daily coding challenges.',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="students"
      className="relative py-20 lg:py-28 bg-[#F6F7FB]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div ref={textRef}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] mb-6">
              {t('studentsTitle')}
            </h2>

            <ul className="space-y-4 mb-8">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E86AB]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#2E86AB]" />
                  </div>
                  <span className="text-[#5A6078]">{bullet}</span>
                </li>
              ))}
            </ul>

            <button onClick={handleTryTask} className="btn-primary flex items-center gap-2">
              {t('tryTask')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Task Card */}
          <div ref={cardRef} className="card overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1D2B]">{t('todaysTask')}</h3>
                  <p className="text-sm text-[#5A6078]">NCERT Class 11</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Easy
              </span>
            </div>

            <div className="code-reveal code-block mb-4">
              <pre>{`# ${t('factorialTask')}
def factorial(n):
    # Your code here
    pass

# Test
print(factorial(5))  # Expected: 120`}</pre>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-[#5A6078]">
                  <Trophy className="w-4 h-4 text-[#FF6B35]" />
                  <span>50 XP</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5A6078]">
                  <Zap className="w-4 h-4 text-[#2E86AB]" />
                  <span>Loops</span>
                </div>
              </div>
              <button
                onClick={handleTryTask}
                className="text-[#2E86AB] font-medium text-sm hover:underline"
              >
                Start solving →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
