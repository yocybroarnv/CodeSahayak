import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Send, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from '@/store';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error(t('invalidEmail'));
      return;
    }
    toast.success(t('success'), {
      description: 'You\'ll receive updates at ' + email,
    });
    setEmail('');
  };

  const footerLinks = {
    product: [
      { label: t('features'), href: '#features' },
      { label: t('forStudents'), href: '#students' },
      { label: t('forTeachers'), href: '#teachers' },
      { label: t('pricingTitle'), href: '#pricing' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    legal: [
      { label: t('privacy'), href: '#' },
      { label: t('terms'), href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#1A1D2B] text-white py-16 lg:py-20"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Left: Logo & Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E86AB] to-[#FF6B35] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CodeSahayak</span>
            </div>
            <p className="text-white/60 mb-6 max-w-sm">{t('footerTagline')}</p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#2E86AB] transition-all"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-[#2E86AB] rounded-xl hover:bg-[#257a9e] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">{t('product')}</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('resources')}</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('legal')}</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} CodeSahayak. All rights reserved.
            </p>
            <p className="text-white/60 text-sm font-medium mt-1">
              Developed by :- <span className="text-[#2E86AB]">Arnav Raj (Cybroarnv)</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E86AB] transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
