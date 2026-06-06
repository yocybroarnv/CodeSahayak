import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  School,
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageStore, type LanguageCode } from '@/store/languageStore';
import { languages } from '@/store/languageStore';

interface FormData {
  email: string;
  password: string;
  name: string;
  role: 'STUDENT' | 'TEACHER';
  language: LanguageCode;
  institution?: string;
  department?: string;
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const initialRole = searchParams.get('role')?.toUpperCase() === 'TEACHER' ? 'TEACHER' : 'STUDENT';
  const defaultEmail = searchParams.get('email') || '';
  const defaultPassword = searchParams.get('password') || '';
  
  const { t, currentLanguage } = useLanguageStore();
  const { login, signup, isLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: defaultEmail,
    password: defaultPassword,
    name: '',
    role: initialRole,
    language: currentLanguage,
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success && result.user) {
      // Redirect based on user role
      if (result.user.role === 'TEACHER' || result.user.role === 'ADMIN') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    const result = await signup({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role,
      language: formData.language,
      institution: formData.institution,
      department: formData.department,
    });
    
    if (result.success && result.user) {
      // Redirect based on user role
      if (result.user.role === 'TEACHER' || result.user.role === 'ADMIN') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const languageOptions = Object.entries(languages).map(([code, lang]) => ({
    value: code as LanguageCode,
    label: `${lang.flag} ${lang.nativeName}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7FB] to-[#E8EAF6] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CS</span>
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-[#2D3436]">CodeSahayak</h1>
          <p className="text-[#636E72] mt-1">{t('heroSubtitle')}</p>
        </div>

        {/* Auth Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          layout
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 rounded-none h-14">
              <TabsTrigger value="login" className="text-base font-medium">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-base font-medium">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636E72] hover:text-[#2D3436]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:opacity-90 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="p-6">
              <form onSubmit={handleSignup}>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                          <Input
                            id="signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10 h-12"
                            minLength={8}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636E72] hover:text-[#2D3436]"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>I am a...</Label>
                        <RadioGroup
                          value={formData.role}
                          onValueChange={(value) => handleInputChange('role', value as 'STUDENT' | 'TEACHER')}
                          className="grid grid-cols-2 gap-3"
                        >
                          <div>
                            <RadioGroupItem
                              value="STUDENT"
                              id="student"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="student"
                              className="flex flex-col items-center justify-center p-4 border-2 border-[#DFE6E9] rounded-xl cursor-pointer hover:border-[#6C5CE7] peer-data-[state=checked]:border-[#6C5CE7] peer-data-[state=checked]:bg-[#6C5CE7]/5 transition-all"
                            >
                              <GraduationCap className="w-6 h-6 mb-2 text-[#6C5CE7]" />
                              <span className="font-medium">Student</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="TEACHER"
                              id="teacher"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="teacher"
                              className="flex flex-col items-center justify-center p-4 border-2 border-[#DFE6E9] rounded-xl cursor-pointer hover:border-[#6C5CE7] peer-data-[state=checked]:border-[#6C5CE7] peer-data-[state=checked]:bg-[#6C5CE7]/5 transition-all"
                            >
                              <School className="w-6 h-6 mb-2 text-[#6C5CE7]" />
                              <span className="font-medium">Teacher</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:opacity-90 text-white font-semibold"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-[#6C5CE7] hover:underline flex items-center gap-1"
                      >
                        ← Back
                      </button>

                      <div className="space-y-2">
                        <Label>Preferred Language</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {languageOptions.map((lang) => (
                            <button
                              key={lang.value}
                              type="button"
                              onClick={() => handleInputChange('language', lang.value)}
                              className={`p-3 rounded-lg border-2 text-left transition-all ${
                                formData.language === lang.value
                                  ? 'border-[#6C5CE7] bg-[#6C5CE7]/5'
                                  : 'border-[#DFE6E9] hover:border-[#6C5CE7]/50'
                              }`}
                            >
                              <span className="text-sm">{lang.label}</span>
                              {formData.language === lang.value && (
                                <CheckCircle2 className="w-4 h-4 text-[#6C5CE7] float-right" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.role === 'TEACHER' && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="institution">Institution</Label>
                            <Input
                              id="institution"
                              type="text"
                              placeholder="e.g., Delhi University"
                              value={formData.institution || ''}
                              onChange={(e) => handleInputChange('institution', e.target.value)}
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              type="text"
                              placeholder="e.g., Computer Science"
                              value={formData.department || ''}
                              onChange={(e) => handleInputChange('department', e.target.value)}
                              className="h-12"
                            />
                          </div>
                        </>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:opacity-90 text-white font-semibold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-[#636E72] mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#6C5CE7] hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-[#6C5CE7] hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
}
