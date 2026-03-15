import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

/**
 * Custom hook for auth forms - handles loading, validation, submission
 * @param {Object} options
 * @param {string} options.redirect - post-success path
 * @param {string} [options.role='customer'] - auth role
 * @param {boolean} [options.logout=false] - logout instead of login
 */
export const useAuthForm = ({ redirect, role = 'customer', logout = false, isSignup = false }) => {
  const { login, signup, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (values) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (logout) {
        authLogout();
        toast.success('Logged out successfully');
      } else if (isSignup) {
        await signup(values);
        toast.success('Account created successfully!');
      } else {
        await login(values.email, values.password, role);
        toast.success('Authentication successful!');
      }

      setTimeout(() => {
        navigate(redirect);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      toast.error(error.message || 'Authentication failed. Please try again.');
      setIsLoading(false);
    }
  }, [login, signup, authLogout, navigate, redirect, role, logout, isSignup, isLoading]);

  return {
    handleSubmit,
    isLoading
  };
};

