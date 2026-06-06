import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Landing Page Components
import { Navbar } from './components/Navbar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HeroSection } from './sections/HeroSection';
import { ImpactSection } from './sections/ImpactSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { StudentsSection } from './sections/StudentsSection';
import { TeachersSection } from './sections/TeachersSection';
import { EditorSection } from './sections/EditorSection';
import { DebugModalSection } from './sections/DebugModalSection';
import { ProgressSection } from './sections/ProgressSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PricingSection } from './sections/PricingSection';
import { OnboardingSection } from './sections/OnboardingSection';
import { WhatsAppSection } from './sections/WhatsAppSection';
import { FAQSection } from './sections/FAQSection';
import { Footer } from './sections/Footer';
import { TeacherModal } from './components/TeacherModal';
import { DebugWalkthroughModal } from './components/DebugWalkthroughModal';
import { OnboardingModal } from './components/OnboardingModal';
import { MobileMenu } from './components/MobileMenu';
import { Toaster } from '@/components/ui/sonner';

// Auth & Dashboard Pages
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import EditorPage from './pages/EditorPage';
import IDEPage from './pages/IDEPage';
import { useAuth } from './hooks/useAuth';

gsap.registerPlugin(ScrollTrigger);

// Landing Page Component
function LandingPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <Navbar />
      <MobileMenu />
      
      <main ref={mainRef} className="relative">
        <div className="relative z-10">
          <HeroSection />
        </div>
        <div className="relative z-20">
          <ImpactSection />
        </div>
        <div className="relative z-30">
          <FeaturesSection />
        </div>
        <div className="relative z-40">
          <StudentsSection />
        </div>
        <div className="relative z-50">
          <TeachersSection />
        </div>
        <div className="relative z-[60]">
          <EditorSection />
        </div>
        <div className="relative z-[70]">
          <DebugModalSection />
        </div>
        <div className="relative z-[80]">
          <ProgressSection />
        </div>
        <div className="relative z-[90]">
          <TestimonialsSection />
        </div>
        <div className="relative z-[100]">
          <PricingSection />
        </div>
        <div className="relative z-[110]">
          <OnboardingSection />
        </div>
        <div className="relative z-[120]">
          <WhatsAppSection />
        </div>
        <div className="relative z-[130]">
          <FAQSection />
        </div>
        <div className="relative z-[140]">
          <Footer />
        </div>
      </main>
      
      <WhatsAppButton />
      <TeacherModal />
      <DebugWalkthroughModal />
      <OnboardingModal />
      <Toaster position="bottom-right" />
    </div>
  );
}

// Protected Route Component with Smart Redirect
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'STUDENT' | 'TEACHER' | 'ADMIN' }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#6C5CE7] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  // Smart redirect based on user role
  if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
    // Redirect to appropriate dashboard based on user role
    if (user.role === 'TEACHER') {
      return <Navigate to="/teacher-dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Smart dashboard router - redirects to correct dashboard based on role */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRole="STUDENT">
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher-dashboard" 
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <TeacherDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Other protected routes */}
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ide" 
          element={
            <ProtectedRoute>
              <IDEPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
