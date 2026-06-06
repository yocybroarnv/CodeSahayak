import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, BookOpen, Wifi } from 'lucide-react';
import { useTranslation } from '@/store';

gsap.registerPlugin(ScrollTrigger);

export function ImpactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Body animation
      gsap.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Metrics animation
      const metrics = metricsRef.current?.children || [];
      gsap.fromTo(
        metrics,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { icon: Globe, value: '22', label: t('languagesSupported') },
    { icon: BookOpen, value: 'NCERT', label: t('ncertAligned') },
    { icon: Wifi, value: '24/7', label: t('offlineMode') },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#F6F7FB] dot-pattern"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D2B] mb-6"
        >
          {t('impactTitle')}
        </h2>

        <p
          ref={bodyRef}
          className="text-lg text-[#5A6078] mb-12 max-w-2xl mx-auto"
        >
          {t('impactBody')}
        </p>

        <div
          ref={metricsRef}
          className="flex flex-wrap justify-center gap-8 lg:gap-12"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2E86AB]/10 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-[#2E86AB]" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1A1D2B]">{metric.value}</p>
                <p className="text-sm text-[#5A6078]">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
