// ⚠️ WARNING: This is a MOCK authentication system for development only
// DO NOT use in production - implement proper backend authentication

export type UserRole = 'operador' | 'supervisor' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

// Mock users for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'operador@test.com',
    fullName: 'Juan Pérez',
    role: 'operador',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'supervisor@test.com',
    fullName: 'Ana García',
    role: 'supervisor',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'admin@test.com',
    fullName: 'Carlos Rodríguez',
    role: 'admin',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const MOCK_PASSWORD = 'Test123456';

export const mockAuth = {
  login: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === email && u.isActive);
    
    if (!user || password !== MOCK_PASSWORD) {
      return { user: null, error: 'Email o contraseña incorrectos' };
    }

    // Store user in localStorage (TEMPORARY - replace with real auth)
    localStorage.setItem('auth_user', JSON.stringify(user));
    
    return { user, error: null };
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_user');
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('auth_user');
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  hasRole: (user: User | null, allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  },

  getAllUsers: (): User[] => {
    return MOCK_USERS;
  },
};
