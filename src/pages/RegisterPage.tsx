import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useRegister } from '../hooks/useAuth';


export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    sex?: string;
    acceptTerms?: string;
    general?: string;
  }>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form');
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: typeof errors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.sex) newErrors.sex = 'Sex is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      navigate('/');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'An unknown error occurred',
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
        firstName={formData.firstName}
        lastName={formData.lastName}
        email={formData.email}
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        sex={formData.sex}
        title={formData.title}
        location={formData.location}
        acceptTerms={formData.acceptTerms}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </AuthLayout>
  );
};