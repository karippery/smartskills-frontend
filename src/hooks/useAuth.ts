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
        password,
      });

      const { access_token, refresh_token, user } = response.data;

      // Save tokens
      localStorage.setItem('access_token', access_token);
      document.cookie = `refresh_token=${refresh_token}; path=/; secure; HttpOnly`;

      // Save user context
      dispatch({ type: 'LOGIN', payload: { ...user, token: access_token } });

      return true;
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage =
            error.response?.data?.error?.message ||
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
    try {
      // Register the user
      await api.post('/users/', userData);
      
      // Auto-login after registration
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
      
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle 400 error with your specific backend structure
        if (error.response?.status === 400) {
          const errorData = error.response.data;
          
          // Extract the duplicate email message from your backend's structure
          if (errorData.error?.details?.message) {
            return {
              success: false,
              error: errorData.error.details.message[0] || 'User already exists'
            };
          }
          
          // Fallback for other 400 errors
          return {
            success: false,
            error: errorData.error?.message || 'Please check your registration details'
          };
        }
        
        // Handle other HTTP errors
        return {
          success: false,
          error: error.message || 'Registration failed'
        };
      }
      
      // Handle non-Axios errors
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  };

  return { register };
};