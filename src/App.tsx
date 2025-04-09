import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrivateRoute } from './routes/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

/**
 * Main App Component
 * 
 * Sets up the application routes with authentication handling:
 * - Public routes (/, /login, /register) use AuthLayout
 * - Protected route (/home) requires auth via PrivateRoute and uses AppLayout
 * - AuthProvider manages global auth state
 * - Header/Footer appear on all pages
 * 
 * Layouts:
 * - AuthLayout: Clean auth pages (centered card, background image)
 * - AppLayout: Main app structure (nav, sidebar, etc.)
 */

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <main className="flex-grow">
        <Header />
          <Routes>
            {/* Root path uses AuthLayout */}
            <Route path="/" element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            } />
            
            {/* Auth routes with background image */}
            <Route path="/login" element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            } />
            
            <Route path="/register" element={
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            } />
            
            {/* Protected home route with AppLayout */}
            <Route path="/home" element={
              <PrivateRoute>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};