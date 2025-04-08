import React from 'react';
import { Header } from "@/components/Header";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-100 bg-[url('/src/assets/images/bg-image.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <main className="flex flex-grow items-center justify-center p-4">
        <div className="w-full sm:max-w-md bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
          {title && (
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};
