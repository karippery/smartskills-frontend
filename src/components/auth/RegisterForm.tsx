import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Link } from 'react-router-dom';

type RegisterFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  sex: string;
  title?: string;
  location?: string;
  acceptTerms: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    sex?: string;
    acceptTerms?: string;
    title?: string;
    location?: string;
    general?: string;
  };
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  sex,
  title,
  location,
  acceptTerms,
  onChange,
  onSubmit,
  isLoading,
  errors,
}) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {errors?.general && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <Input
          label="First name"
          name="firstName"
          type="text"
          value={firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last name"
          name="lastName"
          type="text"
          value={lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />
      </div>

      <Input
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={onChange}
        error={errors?.email}
        required
      />

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          error={errors?.password}
          required
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
          error={errors?.confirmPassword}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sex <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="male"
                name="sex"
                type="radio"
                value="male"
                checked={sex === 'male'}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required
              />
              <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                name="sex"
                type="radio"
                value="female"
                checked={sex === 'female'}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                Female
              </label>
            </div>
          </div>
          {errors?.sex && <p className="mt-1 text-sm text-red-600">{errors.sex}</p>}
        </div>

        <Input
          label="Title (optional)"
          name="title"
          type="text"
          value={title || ''}
          onChange={onChange}
          error={errors?.title}
        />
      </div>

      <Input
        label="Location (optional)"
        name="location"
        type="text"
        value={location || ''}
        onChange={onChange}
        error={errors?.location}
      />

      <Checkbox
        label="I accept the terms and conditions"
        name="acceptTerms"
        checked={acceptTerms}
        onChange={onChange}
        required
      />

      <div>
        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </div>

      <div className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>
    </form>
  );
};