import { toast } from 'sonner';

/**
 * Shared logout handler used across navigations
 * @param {Function} logoutFn - from useAuth()
 * @param {Function} navigateFn - useNavigate()
 * @param {string} [redirect='/auth/role-selection'] - redirect path
 */
export const logoutHandler = (logoutFn, navigateFn, redirect = '/auth/role-selection') => {
  logoutFn();
  toast.success('Logged out successfully');
  setTimeout(() => navigateFn(redirect), 500);
};

