import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

/**
 * Authentication Context
 * 
 * Provides global auth state management with:
 * - User login/logout functionality
 * - JWT token persistence in localStorage
 * - Type-safe state and actions
 * 
 * Key Features:
 * - Reducer-based state management
 * - Auto-persistence to localStorage
 * - Initial state hydration from localStorage
 * - Context provider with built-in type checking
 * 
 * Exports:
 * - AuthProvider: Wrapper component for the context
 * - useAuthContext: Hook to access auth state and dispatch
 * 
 * State Structure:
 * {
 *   user: { email: string, token: string } | null
 *   dispatch: (action: AuthAction) => void
 * }
 * 
 * Available Actions:
 * - LOGIN: Sets authenticated user
 * - LOGOUT: Clears auth state
 */


type User = {
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
};

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

type AuthContextType = AuthState & {
  dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer to manage auth actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// Helper to load initial state from localStorage
const getInitialAuthState = (): AuthState => {
  const user = localStorage.getItem('user');
  return {
    user: user ? JSON.parse(user) : null,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialAuthState);

  // Keep localStorage in sync with context state
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
