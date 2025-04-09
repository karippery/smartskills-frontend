import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

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
