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
  
        dispatch({ type: 'LOGIN', payload: response.data });
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      } catch (error) {
        let errorMessage = 'Login failed';
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            errorMessage = 'Invalid email or password';
          } else {
            errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message;
          }
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
        console.log('Sending registration data:', userData);
        
        // Simple POST request without CSRF
        const response = await api.post('/users/', userData);
        console.log('Registration response:', response.data);
        
        // Optional: Auto-login after registration
        try {
          const loginResponse = await api.post('/users/token/create', {
            email: userData.email,
            password: userData.password
          });
          dispatch({ type: 'LOGIN', payload: loginResponse.data });
          localStorage.setItem('user', JSON.stringify(loginResponse.data));
        } catch (loginError) {
          console.warn('Registration succeeded but auto-login failed:', loginError);
          // Continue even if auto-login fails
        }
        
        return true;
      } catch (error) {
        let errorMessage = 'Registration failed';
        if (axios.isAxiosError(error)) {
          console.error('Registration error details:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
          });
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