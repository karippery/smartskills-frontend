import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useLogin } from '../hooks/useAuth';


export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error: loginError } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      return; // Let LoginForm handle the validation error display
    }
    
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    }
  };
  
  return (
    <LoginForm
      email={email}
      password={password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errors={loginError ? { general: loginError } : undefined}
    />
  );
};