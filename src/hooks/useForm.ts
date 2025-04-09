import { useState } from 'react';

/**
 * Custom Form Hook (useForm)
 * 
 * A reusable hook for managing form state with:
 * - Controlled input handling (text, checkboxes)
 * - Form reset functionality
 * - Type-safe form values (generic T)
 * 
 * Returns:
 * - values: Current form state (T)
 * - handleChange: Universal change handler for inputs
 * - resetForm: Resets to initial values
 * - setValues: Direct state setter (for programmatic updates)
 * 
 * Usage:
 * const { values, handleChange } = useForm({ email: '', remember: false });
 */

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
    setValues,
  };
};