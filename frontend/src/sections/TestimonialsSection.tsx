import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { useTranslation } from '@/store';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Avatar scale animation
      const avatars = cardsRef.current?.querySelectorAll('.avatar') || [];
      gsap.fromTo(
        avatars,
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 35%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: t('testimonial1'),
      author: t('testimonial1Author'),
      avatar: '/avatar-1.jpg',
      language: 'Tamil',
    },
    {
      quote: t('testimonial2'),
      author: t('testimonial2Author'),
      avatar: '/avatar-2.jpg',
      language: 'Hindi',
    },
    {
      quote: t('testimonial3'),
      author: t('testimonial3Author'),
      avatar: '/avatar-3.jpg',
      language: 'WhatsApp',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#F0F4FA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] text-center mb-12 lg:mb-16"
        >
          {t('testimonialsTitle')}
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#2E86AB] flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Content */}
              <p className="text-[#1A1D2B] leading-relaxed mb-6 pt-2">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="avatar w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[#1A1D2B]">{testimonial.author}</p>
                  <span className="text-xs text-[#5A6078] bg-[#F0F4FA] px-2 py-0.5 rounded-full">
                    via {testimonial.language}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
