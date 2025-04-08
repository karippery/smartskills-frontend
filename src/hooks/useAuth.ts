import { useState } from 'react';
import { api } from '../utils/api';
import { useAuthContext } from '../contexts/AuthContext';
import axios from 'axios';


export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/users/token/create', {
        email,
        password
      });

      // Save the token to context and localStorage
      dispatch({ type: 'LOGIN', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return true;
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail || error.message;
      }
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
  
    const register = async (userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        sex: string;
        title?: string;
        location?: string;
    }) => {
      setIsLoading(true);
      setError(null);
  
      try {
        console.log('Registering user:', userData);
        const response = await api.post('/users/', userData); // Update endpoint as needed
        
        // Automatically login after registration
        const loginResponse = await api.post('/users/token/create', {
          email: userData.email,
          password: userData.password
        });
  
        dispatch({ type: 'LOGIN', payload: loginResponse.data });
        localStorage.setItem('user', JSON.stringify(loginResponse.data));
        
        return true;
      } catch (error) {
        let errorMessage = 'Registration failed';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.detail || error.message;
        }
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { register, isLoading, error };
  };