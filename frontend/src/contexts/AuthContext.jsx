import * as React from "react";
import authService from "../api/authService";

// Context initialization without TypeScript generics
const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize auth state on mount
  React.useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("lumen_auth_token");
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch {
          authService.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = React.useCallback(
    async (email, password, role) => {
      setIsLoading(true);
      try {
        const data = await authService.login({ email, password, role });
        setUser(data.user);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signup = React.useCallback(
    async (userData) => {
      setIsLoading(true);
      try {
        const data = await authService.signup(userData);
        setUser(data.user);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = React.useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      setUser,
    }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}