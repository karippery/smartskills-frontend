import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';

type LoginFormProps = {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errors?: {
    email?: string;
    password?: string;
    general?: string;
  };
};

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onChange,
  onSubmit,
  isLoading,
  errors,
}) => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-primary-300">
      <h2 className="text-2xl font-bold text-center text-primary-900 mb-6">Sign in to Smart Skills</h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        {errors?.general && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        <Input
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          error={errors?.email}
          required
          className="border-primary-300 focus:border-primary-500 focus:ring-primary-500"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          error={errors?.password}
          required
          className="border-primary-300 focus:border-primary-500 focus:ring-primary-500"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-primary-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
          <button
              onClick={() => setIsForgotPasswordOpen(true)}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </button>
            </div>
            <ForgotPasswordPage
              isOpen={isForgotPasswordOpen}
              onClose={() => setIsForgotPasswordOpen(false)}
            />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <Link
          to="/register"
          className="w-full flex justify-center py-2 px-4 border border-primary-500 rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create New Account
        </Link>
      </div>
    </div>
  );
};
