import { useState } from 'react';
import { Lightbulb, HelpCircle, Check, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/store';
import { useUIStore } from '@/store/uiStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export function DebugWalkthroughModal() {
  const { t } = useTranslation();
  const { isDebugModalOpen, closeDebugModal, debugStep, setDebugStep } = useUIStore();
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const steps = [
    { id: 1, label: t('step1') },
    { id: 2, label: t('step2') },
    { id: 3, label: t('step3') },
  ];

  const handleNext = () => {
    if (debugStep < 3) {
      setDebugStep(debugStep + 1);
    } else {
      closeDebugModal();
      toast.success('Great job! You fixed the bug!', {
        description: 'Keep practicing to master debugging.',
      });
    }
  };

  const handleCheck = () => {
    if (userInput.toLowerCase().includes('range(len(numbers))') || 
        userInput.toLowerCase().includes('numbers[i]')) {
      setIsCorrect(true);
      toast.success('Correct! You identified the issue.');
    } else {
      toast.error('Not quite. Think about the loop range.');
    }
  };

  return (
    <Dialog open={isDebugModalOpen} onOpenChange={closeDebugModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1A1D2B] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
            </div>
            Debug Walkthrough
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    debugStep >= step.id
                      ? 'bg-[#2E86AB] text-white'
                      : 'bg-[#F0F4FA] text-[#5A6078]'
                  }`}
                >
                  {debugStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      debugStep > step.id ? 'bg-[#2E86AB]' : 'bg-[#F0F4FA]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Step Content */}
          <div className="bg-[#F6F7FB] rounded-xl p-6">
            {debugStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A1D2B]">{t('whatsWrong')}</h3>
                <div className="code-block">
                  <pre>{`def calculate_average(numbers):
    total = 0
    for i in range(len(numbers)):
        total += numbers[i]  # ← Error on this line
    average = total / len(numbers)
    return average

# Test
nums = [10, 20, 30]
print(calculate_average(nums))`}</pre>
                </div>
                <p className="text-[#5A6078]">
                  Look at line 4. What could go wrong when accessing <code>numbers[i]</code>?
                </p>
              </div>
            )}
            
            {debugStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A1D2B]">{t('whyHappens')}</h3>
                <div className="bg-white rounded-lg p-4 border-l-4 border-[#FF6B35]">
                  <p className="text-[#1A1D2B] italic">
                    "{t('chaiAnalogy')}"
                  </p>
                </div>
                <p className="text-[#5A6078]">
                  The loop tries to access an index that might not exist. When <code>i</code> equals 
                  <code>len(numbers)</code>, you&apos;re trying to access beyond the last element.
                </p>
                <div className="bg-[#2E86AB]/10 rounded-lg p-4">
                  <p className="text-sm text-[#2E86AB] font-medium">
                    <strong>Tip:</strong> Python lists are 0-indexed. The last valid index is <code>len(numbers) - 1</code>.
                  </p>
                </div>
              </div>
            )}
            
            {debugStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A1D2B]">{t('youFixIt')}</h3>
                <p className="text-[#5A6078]">
                  Type the corrected line 4 below:
                </p>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t('typeCorrection')}
                  className="input-field font-mono min-h-[100px]"
                />
                {isCorrect && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Correct! The loop should iterate properly now.</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => toast.info('Community help coming soon!')}
              className="btn-secondary flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              {t('askCommunity')}
            </button>
            
            {debugStep === 3 && !isCorrect ? (
              <button
                onClick={handleCheck}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                {debugStep === 3 ? 'Complete' : t('nextStep')}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
