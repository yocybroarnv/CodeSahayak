import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Globe, Wifi, WifiOff } from 'lucide-react';
import { useTranslation, type LanguageCode } from '@/store';
import { useUIStore } from '@/store/uiStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export function OnboardingModal() {
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage, languages } = useTranslation();
  const { isOnboardingOpen, closeOnboarding, isOfflineMode, setOfflineMode, downloadProgress, setDownloadProgress } = useUIStore();
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulate download progress
  useEffect(() => {
    if (isOfflineMode && isDownloading && downloadProgress < 100) {
      const interval = setInterval(() => {
        setDownloadProgress(downloadProgress + Math.random() * 15);
      }, 500);
      return () => clearInterval(interval);
    } else if (downloadProgress >= 100) {
      setIsDownloading(false);
      toast.success('Offline content ready!', {
        description: '500+ problems available offline.',
      });
    }
  }, [isOfflineMode, isDownloading, downloadProgress, setDownloadProgress]);

  const handleOfflineToggle = (enabled: boolean) => {
    setOfflineMode(enabled);
    if (enabled) {
      setIsDownloading(true);
    } else {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleGetStarted = () => {
    closeOnboarding();
    toast.success(`Welcome to CodeSahayak!`, {
      description: `Learning in ${languages[currentLanguage].nativeName}`,
    });
    // Navigate to auth page (sign in/sign up)
    navigate('/auth');
  };

  return (
    <Dialog open={isOnboardingOpen} onOpenChange={closeOnboarding}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-[#1A1D2B] flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2E86AB] to-[#FF6B35] flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-base sm:text-2xl">{t('onboardingTitle')}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-sm sm:text-base text-[#5A6078] mb-4 sm:mb-6">{t('onboardingSubtitle')}</p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Language Selection */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#1A1D2B] mb-3 sm:mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2E86AB]" />
                {t('selectLanguage')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(languages).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as LanguageCode)}
                    className={`flex items-center gap-2 p-2 sm:p-3 rounded-xl transition-all text-left touch-manipulation w-full ${
                      currentLanguage === lang.code
                        ? 'bg-[#2E86AB]/15 ring-2 ring-[#2E86AB]'
                        : 'bg-[#F6F7FB] hover:bg-[#F0F4FA]'
                    }`}
                  >
                    <span className={`text-sm shrink-0 flex items-center justify-center w-7 h-7 rounded-lg font-bold ${
                      currentLanguage === lang.code ? 'bg-[#2E86AB]/20 text-[#2E86AB]' : 'bg-black/5 text-[#5A6078]'
                    }`}>
                      {lang.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#1A1D2B] text-xs sm:text-sm truncate">{lang.nativeName}</p>
                      <p className="text-[10px] sm:text-xs text-[#5A6078] truncate">{lang.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Offline Mode */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#1A1D2B] mb-3 sm:mb-4 flex items-center gap-2">
                {isOfflineMode ? (
                  <WifiOff className="w-4 h-4 text-[#FF6B35]" />
                ) : (
                  <Wifi className="w-4 h-4 text-[#2E86AB]" />
                )}
                {t('enableOffline')}
              </h3>
              
              <div className="bg-[#F6F7FB] rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="font-medium text-sm sm:text-base text-[#1A1D2B]">{t('downloadSize')}</p>
                    <p className="text-xs sm:text-sm text-[#5A6078]">{t('problemsAvailable')}</p>
                  </div>
                  <button
                    onClick={() => handleOfflineToggle(!isOfflineMode)}
                    className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors touch-manipulation ${
                      isOfflineMode ? 'bg-[#2E86AB]' : 'bg-[#5A6078]/30'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white transition-transform ${
                        isOfflineMode ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {isOfflineMode && (
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                      <span className="text-[#5A6078]">
                        {isDownloading ? 'Downloading...' : 'Ready!'}
                      </span>
                      <span className="font-medium text-[#2E86AB]">
                        {Math.round(downloadProgress)}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F0F4FA] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2E86AB] rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    {downloadProgress >= 100 && (
                      <div className="flex items-center gap-2 mt-2 text-green-600 text-xs sm:text-sm">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Download complete!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
            <button
              onClick={closeOnboarding}
              className="btn-secondary w-full sm:w-auto"
            >
              {t('back')}
            </button>
            <button
              onClick={handleGetStarted}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              {t('getStarted')}
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
