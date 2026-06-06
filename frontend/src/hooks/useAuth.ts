import { useCallback, useEffect } from 'react';
import { useAuthStore, api, type User, type UserRole } from '@/store/authStore';
import { toast } from 'sonner';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, logout, updateUser, setLoading } = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!token && isAuthenticated) {
        logout();
        return;
      }
      if (token && !user) {
        try {
          setLoading(true);
          const { user: userData } = await api.getMe();
          useAuthStore.setState({ user: userData, isAuthenticated: true });
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [token, user, isAuthenticated, logout, setLoading]);

  const handleSignup = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    language: string;
    institution?: string;
    department?: string;
  }) => {
    try {
      setLoading(true);
      const response = await api.signup(data);
      login(response.user, response.token);
      toast.success('Account created successfully!');
      return { success: true, user: response.user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [login, setLoading]);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.login(email, password);
      login(response.user, response.token);
      toast.success('Welcome back!');
      return { success: true, user: response.user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [login, setLoading]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success('Logged out successfully');
  }, [logout]);

  const handleUpdateProfile = useCallback(async (updates: Partial<User>) => {
    try {
      const response = await api.updateProfile(updates);
      updateUser(response.user);
      toast.success('Profile updated!');
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      toast.error(message);
      return { success: false, error: message };
    }
  }, [updateUser]);

  const isVerifying = !!(token && !user);
  const loading = isLoading || isVerifying;

  return {
    user,
    isAuthenticated: isAuthenticated && !!token,
    isLoading: loading,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };
};

export const useRequireAuth = (requiredRole?: UserRole | UserRole[]) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const hasRequiredRole = () => {
    if (!requiredRole || !user) return true;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    hasAccess: isAuthenticated && hasRequiredRole(),
  };
};
