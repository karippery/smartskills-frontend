import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/utils/api';

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ForgotPasswordForm({ onClose, onSuccess }: Props) {
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendCode = async () => {
    if (!email) return setError('Please enter your email');

    setIsLoading(true);
    setError('');
    try {
      await api.post('/auth/send-reset-code/', { email });
      setStep('verify');
      setSuccessMessage('Verification code sent to your email.');
    } catch {
      setError('Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return setError('Please enter the verification code');

    setIsLoading(true);
    setError('');
    try {
      await api.post('/auth/verify-reset-code/', { email, code });
      setStep('reset');
      setSuccessMessage('Code verified successfully! Now set a new password.');
    } catch {
      setError('Invalid or expired verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password) return setError('Please enter a new password');

    setIsLoading(true);
    setError('');
    try {
      const userId = 'USER_ID_HERE'; // Replace this appropriately
      await api.patch(`/smartskills/v1/users/${userId}/`, { password });
      setSuccessMessage('Password updated successfully!');
      onSuccess?.();
      onClose();
    } catch {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('request');
    setEmail('');
    setCode('');
    setPassword('');
    setError('');
    setSuccessMessage('');
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      {step === 'request' && (
        <>
          <Input
            label="Enter your Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="you@example.com"
            error={error}
            required
          />
          <Button onClick={handleSendCode} disabled={!email || isLoading} className="w-full">
            Send Code
          </Button>
        </>
      )}

      {step === 'verify' && (
        <>
          <p className="text-sm text-primary-900">
            A verification code was sent to <span className="font-semibold">{email}</span>.
          </p>
          <Input
            label="Verification Code"
            type="text"
            name="code"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCode(value);
              if (error) setError('');
            }}
            placeholder="Enter 6-digit code"
            error={error}
            required
          />
          <div className="flex space-x-2">
            <Button onClick={resetForm} variant="outline" className="w-1/3">
              Back
            </Button>
            <Button
              onClick={handleVerifyCode}
              disabled={code.length < 6 || isLoading}
              className="flex-1"
            >
              Verify Code
            </Button>
          </div>
        </>
      )}

      {step === 'reset' && (
        <>
          <p className="text-sm text-primary-900">
            Set a new password for <span className="font-semibold">{email}</span>.
          </p>
          <Input
            label="New Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter new password"
            error={error}
            required
          />
          <Button
            onClick={handleResetPassword}
            disabled={!password || isLoading}
            className="w-full"
          >
            Set New Password
          </Button>
        </>
      )}

      {successMessage && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">{successMessage}</div>
      )}
    </div>
  );
}
