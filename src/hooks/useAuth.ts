import { useState, useEffect } from 'react';
import { mockAuth, User, UserRole } from '@/lib/mockAuth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { user, error } = await mockAuth.login(email, password);
    if (user) {
      setUser(user);
    }
    return { user, error };
  };

  const logout = async () => {
    await mockAuth.logout();
    setUser(null);
  };

  const hasRole = (allowedRoles: UserRole[]) => {
    return mockAuth.hasRole(user, allowedRoles);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
  };
}
