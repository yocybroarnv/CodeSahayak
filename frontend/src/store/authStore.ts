import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  language: string;
  avatar?: string;
  isPro: boolean;
  proExpiresAt?: string;
  streak: number;
  lastActive?: string;
  xp: number;
  level: number;
  institution?: string;
  department?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      
      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }),
      
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'codesahayak-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock mode flag - set to true to use mock data without backend
export const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Mock user data
const mockUsers: Record<string, any> = {
  'student@test.com': {
    user: {
      id: '1',
      email: 'student@test.com',
      name: 'Priya Sharma',
      role: 'STUDENT' as UserRole,
      language: 'en',
      isPro: false,
      streak: 7,
      xp: 450,
      level: 5,
      createdAt: new Date().toISOString(),
    },
    password: 'password',
    token: 'mock-student-token-123',
  },
  'teacher@test.com': {
    user: {
      id: '2',
      email: 'teacher@test.com',
      name: 'Dr. Rajesh Kumar',
      role: 'TEACHER' as UserRole,
      language: 'en',
      isPro: true,
      streak: 15,
      xp: 1200,
      level: 12,
      institution: 'IIT Delhi',
      department: 'Computer Science',
      createdAt: new Date().toISOString(),
    },
    password: 'password',
    token: 'mock-teacher-token-456',
  },
};

// API helper functions
export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    // Mock authentication - bypass real API calls
    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Handle mock endpoints
      if (endpoint === '/auth/me') {
        const token = useAuthStore.getState().token;
        const mockUser = Object.values(mockUsers).find(u => u.token === token);
        if (mockUser) {
          return { user: mockUser.user };
        }
        throw new Error('Unauthorized');
      }

      if (endpoint === '/assignments') {
        return {
          assignments: [
            {
              id: '1',
              title: 'Binary Search Implementation',
              subject: 'Algorithms',
              difficulty: 'MEDIUM',
              isActive: true,
              starterCode: 'def binary_search(arr, x):\n    # Write your binary search code here\n    pass',
              _count: { submissions: 28 },
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: '2',
              title: 'React Component Design',
              subject: 'Web Development',
              difficulty: 'HARD',
              isActive: true,
              starterCode: '// Write your React code here',
              _count: { submissions: 15 },
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: '3',
              title: 'SQL Query Practice',
              subject: 'Databases',
              difficulty: 'EASY',
              isActive: true,
              starterCode: '-- Write your SQL queries here',
              _count: { submissions: 42 },
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            }
          ]
        };
      }

      if (endpoint.startsWith('/assignments/') && endpoint.endsWith('/submit')) {
        return {
          submission: {
            id: 'mock-sub-' + Math.random().toString(36).substr(2, 9),
            assignmentId: endpoint.split('/')[2],
            studentId: '1',
            status: 'SUBMITTED',
            submittedAt: new Date().toISOString(),
            originalityScore: 94,
            isRenameOnly: false,
            isInstantPaste: false,
          }
        };
      }
      
      // For other endpoints, return empty data
      return {};
    }

    const token = useAuthStore.getState().token;
    
    const getCookie = (name: string): string | null => {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
      return null;
    };

    const csrfToken = getCookie('csrf_token');
    const method = options.method?.toUpperCase() ?? 'GET';
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(isMutation && csrfToken && { 'X-CSRF-Token': csrfToken }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      const errorMsg = error.error || `HTTP ${response.status}`;
      
      if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/signup') {
        useAuthStore.getState().logout();
      }
      
      throw new Error(errorMsg);
    }

    return response.json();
  },

  // Auth endpoints
  signup: async (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    language: string;
    institution?: string;
    department?: string;
  }) => {
    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        role: data.role,
        language: data.language,
        isPro: false,
        streak: 0,
        xp: 0,
        level: 1,
        institution: data.institution,
        department: data.department,
        createdAt: new Date().toISOString(),
      };
      
      const token = `mock-token-${newUser.id}`;
      
      // Store in mock users
      mockUsers[data.email] = {
        user: newUser,
        password: data.password,
        token,
      };
      
      return { user: newUser, token };
    }
    
    return api.request('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
  },

  login: async (email: string, password: string) => {
    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUser = mockUsers[email];
      if (mockUser && mockUser.password === password) {
        return { user: mockUser.user, token: mockUser.token };
      }
      
      throw new Error('Invalid email or password');
    }
    
    return api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },

  getMe: () => api.request('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    api.request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Payment endpoints
  createOrder: (plan: 'STUDENT_PRO_MONTHLY' | 'STUDENT_PRO_YEARLY') =>
    api.request('/payment/create-order', { method: 'POST', body: JSON.stringify({ plan }) }),

  verifyPayment: (data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => api.request('/payment/verify', { method: 'POST', body: JSON.stringify(data) }),

  // Progress endpoints
  trackProgress: (data: {
    concept: string;
    language: string;
    isCorrect: boolean;
    hintsUsed?: number;
  }) => api.request('/progress/track', { method: 'POST', body: JSON.stringify(data) }),

  getProgressStats: () => api.request('/progress/stats'),

  // AI endpoints
  getExplanation: (data: {
    code: string;
    error?: string;
    language: string;
    userLanguage: string;
    concept?: string;
  }) => api.request('/ai/explain', { method: 'POST', body: JSON.stringify(data) }),

  getHint: (data: {
    code: string;
    error?: string;
    attempt: number;
    userLanguage: string;
  }) => api.request('/ai/hint', { method: 'POST', body: JSON.stringify(data) }),

  getDebugHelp: (data: {
    code: string;
    error: string;
    language: string;
    userLanguage: string;
    step: number;
  }) => api.request('/ai/debug', { method: 'POST', body: JSON.stringify(data) }),
};
