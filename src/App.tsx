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