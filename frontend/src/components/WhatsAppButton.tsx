import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/store';

export function WhatsAppButton() {
  const { t, currentLanguage } = useTranslation();
  
  const getWhatsAppLink = () => {
    const messages: Record<string, string> = {
      en: 'Hello CodeSahayak! I need help with coding.',
      hi: 'नमस्ते CodeSahayak! मुझे कोडिंग में मदद चाहिए।',
      ta: 'வணக்கம் CodeSahayak! எனக்கு குறியீட்டு உதவி தேவை.',
      bn: 'হ্যালো CodeSahayak! আমাকে কোডিং-এ সাহায্য দরকার.',
      te: 'హలో CodeSahayak! నాకు కోడింగ్‌లో సహాయం కావాలి.',
      mr: 'नमस्कार CodeSahayak! मला कोडिंगमध्ये मदत हवी आहे.',
      gu: 'હેલો CodeSahayak! મને કોડિંગમાં મદદ જોઈએ છે.',
      kn: 'ಹಲೋ CodeSahayak! ನನಗೆ ಕೋಡಿಂಗ್‌ನಲ್ಲಿ ಸಹಾಯ ಬೇಕು.',
      ml: 'ഹലോ CodeSahayak! എനിക്ക് കോഡിംഗിൽ സഹായം വേണം.',
    };
    
    const message = encodeURIComponent(messages[currentLanguage] || messages.en);
    return `https://wa.me/919999999999?text=${message}`;
  };

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[500] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      aria-label={t('help')}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        {t('help')}
      </span>
    </a>
  );
}
