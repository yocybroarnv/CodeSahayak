import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Check, ArrowRight, Smartphone, Wifi, Zap } from 'lucide-react';
import { useTranslation } from '@/store';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function WhatsAppSection() {
  const { t, currentLanguage } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Phone animation
      gsap.fromTo(
        phoneRef.current,
        { x: '-8vw', opacity: 0 },
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

      // Text animation
      gsap.fromTo(
        textRef.current,
        { x: '8vw', opacity: 0 },
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

      // Chat bubbles stagger
      const bubbles = bubblesRef.current?.children || [];
      gsap.fromTo(
        bubbles,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
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

  const bullets = [
    t('whatsappBullet1'),
    t('whatsappBullet2'),
    t('whatsappBullet3'),
  ];

  const getWhatsAppLink = () => {
    const messages: Record<string, string> = {
      en: 'Hello CodeSahayak! I need help with coding.',
      hi: 'नमस्ते CodeSahayak! मुझे कोडिंग में मदद चाहिए।',
      ta: 'வணக்கம் CodeSahayak! எனக்கு குறியீட்டு உதவி தேவை.',
    };
    const message = encodeURIComponent(messages[currentLanguage] || messages.en);
    return `https://wa.me/919999999999?text=${message}`;
  };

  const handleStartWhatsApp = () => {
    toast.info('Opening WhatsApp...');
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#F0F4FA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone Mockup */}
          <div ref={phoneRef} className="flex justify-center">
            <div className="relative w-[280px] h-[560px] bg-[#1A1D2B] rounded-[40px] p-3 shadow-2xl">
              {/* Phone Frame */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1A1D2B] rounded-full z-10" />
              
              {/* Screen */}
              <div className="w-full h-full bg-[#F6F7FB] rounded-[32px] overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] text-white p-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E86AB] to-[#FF6B35] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">CodeSahayak</p>
                      <p className="text-xs opacity-70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div ref={bubblesRef} className="flex-1 p-4 space-y-3 overflow-hidden">
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-[#1A1D2B]">Help me with this code</p>
                      <code className="text-xs bg-black/5 px-1 rounded mt-1 block">
                        for i in range(5):
                      </code>
                      <span className="text-[10px] text-[#5A6078] float-right mt-1">10:30 AM ✓✓</span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-sm text-[#1A1D2B]">
                        This loop runs 5 times (i = 0 to 4). Think of it like counting 5 cups!
                      </p>
                      <span className="text-[10px] text-[#5A6078]">10:31 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-3 py-2 max-w-[80%]">
                      <p className="text-sm text-[#1A1D2B]">Thank you! Now I understand.</p>
                      <span className="text-[10px] text-[#5A6078] float-right mt-1">10:32 AM ✓</span>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-[#e5e7eb]">
                  <div className="flex items-center gap-2 bg-[#F6F7FB] rounded-full px-4 py-2">
                    <span className="text-sm text-[#5A6078]">Type a message</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div ref={textRef}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <span className="px-3 py-1 bg-[#25D366]/10 text-[#25D366] text-sm font-medium rounded-full">
                New Feature
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] mb-6">
              {t('whatsappTitle')}
            </h2>

            <ul className="space-y-4 mb-8">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <span className="text-[#5A6078]">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="flex items-center gap-1 px-3 py-1.5 bg-[#F6F7FB] rounded-full text-sm text-[#5A6078]">
                <Smartphone className="w-4 h-4" />
                Any phone
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 bg-[#F6F7FB] rounded-full text-sm text-[#5A6078]">
                <Wifi className="w-4 h-4" />
                2G compatible
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 bg-[#F6F7FB] rounded-full text-sm text-[#5A6078]">
                <Zap className="w-4 h-4" />
                Instant replies
              </span>
            </div>

            <button
              onClick={handleStartWhatsApp}
              className="btn-primary flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E]"
            >
              <MessageCircle className="w-5 h-5" />
              {t('startOnWhatsApp')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
