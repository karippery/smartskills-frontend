import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'; // Import your Input component
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

  /* Step 1 – Enter Email (Send Code):
     User enters their email.
     App calls POST /auth/send-reset-code/ to send a verification code to that email.
     If successful, we move to the verify step.
  */
  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

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

    /* Step 2 – Verify Code:
    User enters the 6-digit verification code they received by email.
    App calls POST /auth/verify-reset-code/ with the email and code.
    If the code is valid, we move to the reset password step.
  */
  const handleVerifyCode = async () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }

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
    /* Step 3 – Reset Password:
      User sets a new password.
      App calls PATCH /smartskills/v1/users/{id}/ with the new password.
      If the update is successful, the modal closes and optionally triggers onSuccess.
  */
  const handleResetPassword = async () => {
    if (!password) {
      setError('Please enter a new password');
      return;
    }

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
                        <Button
                          onClick={handleSendCode}
                          disabled={!email || isLoading}
                          className="w-full"
                        >
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
                            // Allow only numbers and limit to 6 digits
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setCode(value);
                            if (error) setError('');
                          }}
                          placeholder="Enter 6-digit code"
                          error={error}
                          required
                        />
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              resetModal();
                              setStep('request');
                            }}
                            variant="outline"
                            className="w-1/3"
                          >
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
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        {successMessage}
                      </div>
                    )}
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