import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Languages, BookMarked, Lightbulb, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/store';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.children || [];
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Languages,
      title: t('multilingualAI'),
      description: t('multilingualAIDesc'),
      color: '#2E86AB',
    },
    {
      icon: BookMarked,
      title: t('syllabusAware'),
      description: t('syllabusAwareDesc'),
      color: '#FF6B35',
    },
    {
      icon: Lightbulb,
      title: t('teachesNotReplaces'),
      description: t('teachesNotReplacesDesc'),
      color: '#4ECDC4',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-12 sm:py-16 lg:py-20 xl:py-28 bg-[#F0F4FA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1D2B] text-center mb-8 sm:mb-12 lg:mb-16"
        >
          {t('featuresTitle')}
        </h2>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group cursor-pointer"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: feature.color }}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1A1D2B] mb-2 sm:mb-3">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-[#5A6078] mb-4 sm:mb-5 leading-relaxed">
                {feature.description}
              </p>

              <button className="flex items-center gap-2 text-[#2E86AB] font-medium text-sm sm:text-base group/btn touch-manipulation">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
