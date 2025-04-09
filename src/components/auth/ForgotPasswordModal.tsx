import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/Button'; // Adjust path if needed
import { api } from '@/utils/api';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose, onSuccess }: ForgotPasswordModalProps) {
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
      setSuccessMessage('Code verified successfully! Now set a new password.');
      setStep('reset');
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

  const resetModal = () => {
    setStep('request');
    setEmail('');
    setCode('');
    setPassword('');
    setError('');
    setSuccessMessage('');
    setIsLoading(false);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { resetModal(); onClose(); }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-6 pb-6 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="text-center">
                  <Dialog.Title as="h3" className="text-lg font-bold text-primary-900">
                    Forgot Password
                  </Dialog.Title>

                  <div className="mt-4 space-y-4">
                    {step === 'request' && (
                      <>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-primary-900">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (error) setError('');
                            }}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                        <Button
                          onClick={handleSendCode}
                          disabled={!email || isLoading}
                          className="w-full"
                        >
                          {isLoading ? 'Sending...' : 'Send Code'}
                        </Button>
                      </>
                    )}

                    {step === 'verify' && (
                      <>
                        <p className="text-sm text-primary-900">
                          A verification code was sent to <span className="font-semibold">{email}</span>.
                        </p>
                        <div>
                          <label htmlFor="code" className="block text-sm font-medium text-primary-900">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                              if (error) setError('');
                            }}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Enter the code"
                          />
                        </div>
                        <Button
                          onClick={handleVerifyCode}
                          disabled={!code || isLoading}
                          className="w-full"
                        >
                          {isLoading ? 'Verifying...' : 'Verify Code'}
                        </Button>
                      </>
                    )}

                    {step === 'reset' && (
                      <>
                        <p className="text-sm text-primary-900">
                          Set a new password for <span className="font-semibold">{email}</span>.
                        </p>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-primary-900">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (error) setError('');
                            }}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Enter new password"
                          />
                        </div>
                        <Button
                          onClick={handleResetPassword}
                          disabled={!password || isLoading}
                          className="w-full"
                        >
                          {isLoading ? 'Resetting...' : 'Set New Password'}
                        </Button>
                      </>
                    )}

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
