import { create } from 'zustand';

interface UIState {
  // Modals
  isTeacherModalOpen: boolean;
  isDebugModalOpen: boolean;
  isOnboardingOpen: boolean;
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  
  // Debug walkthrough step
  debugStep: number;
  
  // Offline mode
  isOfflineMode: boolean;
  downloadProgress: number;
  
  // Actions
  openTeacherModal: () => void;
  closeTeacherModal: () => void;
  openDebugModal: () => void;
  closeDebugModal: () => void;
  setDebugStep: (step: number) => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setOfflineMode: (enabled: boolean) => void;
  setDownloadProgress: (progress: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isTeacherModalOpen: false,
  isDebugModalOpen: false,
  isOnboardingOpen: false,
  isMobileMenuOpen: false,
  debugStep: 1,
  isOfflineMode: false,
  downloadProgress: 0,
  
  // Actions
  openTeacherModal: () => set({ isTeacherModalOpen: true }),
  closeTeacherModal: () => set({ isTeacherModalOpen: false }),
  openDebugModal: () => set({ isDebugModalOpen: true, debugStep: 1 }),
  closeDebugModal: () => set({ isDebugModalOpen: false }),
  setDebugStep: (step: number) => set({ debugStep: step }),
  openOnboarding: () => set({ isOnboardingOpen: true }),
  closeOnboarding: () => set({ isOnboardingOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setOfflineMode: (enabled: boolean) => set({ isOfflineMode: enabled }),
  setDownloadProgress: (progress: number) => set({ downloadProgress: Math.min(100, Math.max(0, progress)) }),
}));
