// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useRegister } from '../hooks/useAuth';
import { AuthLayout } from '@/layouts/AuthLayout';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  sex: string;
  title: string;
  location: string;
  acceptTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>> & {
  general?: string;
};

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: '',
    title: '',
    location: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.sex) newErrors.sex = 'Sex is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        sex: formData.sex,
        title: formData.title || undefined,
        location: formData.location || undefined,
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Registration failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create a new account"
      subtitle="Fill in the form below to create your account"
    >
      <RegisterForm
        {...formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </AuthLayout>
  );
};