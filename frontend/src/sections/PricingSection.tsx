import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Zap, Building2, GraduationCap } from 'lucide-react';
import { useTranslation } from '@/store';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
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
    }, section);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: t('studentPlan'),
      price: t('freeForever'),
      priceValue: 0,
      icon: GraduationCap,
      features: [t('dailyTasks'), t('hints'), t('oneLanguage')],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: t('proPlan'),
      price: '₹199',
      priceValue: 199,
      period: t('perMonth'),
      icon: Zap,
      features: [t('unlimitedExplain'), t('allLanguages'), t('offlineDownloads')],
      cta: 'Upgrade to Pro',
      highlighted: true,
    },
    {
      name: t('institutionPlan'),
      price: t('contactUs'),
      priceValue: null,
      icon: Building2,
      features: [t('teacherDashboard'), t('analytics'), t('sso')],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const handlePlanClick = (planName: string) => {
    if (planName === 'Institution') {
      toast.info('Contact us at sales@codesahayak.com');
    } else if (planName === 'Pro') {
      toast.success('Redirecting to payment...');
    } else {
      toast.success('Welcome to CodeSahayak!');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#F6F7FB]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] text-center mb-12 lg:mb-16"
        >
          {t('pricingTitle')}
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-[#2E86AB]' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-[#2E86AB] text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-[#2E86AB]/10'
                      : 'bg-[#F0F4FA]'
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${
                      plan.highlighted ? 'text-[#2E86AB]' : 'text-[#5A6078]'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1D2B]">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-[#1A1D2B]">{plan.price}</span>
                {plan.period && (
                  <span className="text-[#5A6078] ml-1">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-[#5A6078]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan.name)}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
