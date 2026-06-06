import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, ArrowRight, Award, Star, Target, Zap } from 'lucide-react';
import { useTranslation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

gsap.registerPlugin(ScrollTrigger);

export function ProgressSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // Card animation with 3D effect
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
          perspective: 1000,
        }
      );

      // Ring animation
      if (ringRef.current) {
        const circumference = 2 * Math.PI * 52;
        gsap.fromTo(
          ringRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * (1 - 0.72),
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'top 30%',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const badges = [
    { name: t('hindiHelper'), icon: Star, color: '#D94B5E', unlocked: true },
    { name: t('ethicalCoder'), icon: Award, color: '#2E86AB', unlocked: true },
    { name: 'Loop Master', icon: Zap, color: '#FF6B35', unlocked: false },
  ];

  const concepts = [
    { name: t('loops'), progress: 85 },
    { name: t('functions'), progress: 62 },
  ];

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="relative py-20 lg:py-28 bg-[#F6F7FB] dot-pattern"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div ref={textRef}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] mb-6">
              {t('progressTitle')}
            </h2>
            <p className="text-lg text-[#5A6078] mb-8">
              {t('progressBody')}
            </p>
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth?tab=signup')}
              className="btn-primary flex items-center gap-2"
            >
              {t('openDashboard')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Dashboard Card */}
          <div ref={cardRef} className="card" style={{ transformStyle: 'preserve-3d' }}>
            {/* Streak Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F18F01] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1A1D2B]">5</p>
                  <p className="text-sm text-[#5A6078]">{t('dayStreak')}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium rounded-full">
                Keep it up!
              </span>
            </div>

            {/* Progress Rings */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {concepts.map((concept, index) => (
                <div key={index} className="bg-[#F6F7FB] rounded-xl p-4 text-center">
                  <div className="relative w-28 h-28 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="52"
                        fill="none"
                        stroke="#F0F4FA"
                        strokeWidth="8"
                      />
                      <circle
                        ref={index === 0 ? ringRef : undefined}
                        cx="56"
                        cy="56"
                        r="52"
                        fill="none"
                        stroke="#2E86AB"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={2 * Math.PI * 52 * (1 - concept.progress / 100)}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1A1D2B]">
                        {concept.progress}%
                      </span>
                    </div>
                  </div>
                  <p className="font-medium text-[#1A1D2B]">{concept.name}</p>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="mb-6">
              <p className="text-sm text-[#5A6078] mb-3">Achievements</p>
              <div className="flex gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      badge.unlocked
                        ? 'bg-[#F6F7FB]'
                        : 'bg-[#F0F4FA] opacity-50'
                    }`}
                  >
                    <badge.icon
                      className="w-4 h-4"
                      style={{ color: badge.unlocked ? badge.color : '#5A6078' }}
                    />
                    <span className="text-sm text-[#1A1D2B]">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guru Network CTA */}
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth?tab=signup')}
              className="w-full py-3 bg-gradient-to-r from-[#2E86AB] to-[#FF6B35] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" />
              {t('joinGuru')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
