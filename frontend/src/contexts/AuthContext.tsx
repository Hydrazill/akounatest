
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('akounamatata_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler l'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Utilisateur admin par défaut
    if (email === 'admin@akounamatata.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Administrateur',
        email: 'admin@akounamatata.com',
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('akounamatata_user', JSON.stringify(adminUser));
      return true;
    }
    
    // Utilisateur normal
    if (email && password) {
      const normalUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
      };
      setUser(normalUser);
      localStorage.setItem('akounamatata_user', JSON.stringify(normalUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    
    setUser(newUser);
    localStorage.setItem('akounamatata_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('akounamatata_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
