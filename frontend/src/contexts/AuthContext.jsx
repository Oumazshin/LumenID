import * as React from "react";
import { authService } from "../services/auth-service";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize auth state from sessionStorage on mount
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        // First check sessionStorage for quick initialization
        const storedAuth = sessionStorage.getItem("auth");
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth.user);
        }

        // Then verify session with backend
        const response = await authService.getSession();
        if (response.success && response.data) {
          setUser(response.data);
        } else if (storedAuth) {
          // Session expired, clear local storage
          sessionStorage.removeItem("auth");
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        sessionStorage.removeItem("auth");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Persist auth state to sessionStorage whenever it changes
  React.useEffect(() => {
    if (user) {
      sessionStorage.setItem("auth", JSON.stringify({ user }));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [user]);

  // Listen for global unauthorized events to keep session state accurate
  React.useEffect(() => {
    const handleUnauthorized = () => {
      console.warn("Unauthorized API call detected, syncing session state...");
      setUser(null);
      sessionStorage.removeItem("auth");
    };

    window.addEventListener("lumen_unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("lumen_unauthorized", handleUnauthorized);
    };
  }, []);

  const login = React.useCallback(
    async (email, password, role) => {
      setIsLoading(true);
      try {
        const response = await authService.login({ email, password, role });

        if (!response.success) {
          throw new Error(response.error || "Login failed");
        }

        if (response.data) {
          setUser(response.data);
        }

        // Note: Navigation is now handled by the login components
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = React.useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      sessionStorage.removeItem("auth");
      // Note: Navigation is now handled by the components that call logout
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      setUser,
    }),
    [user, isLoading, login, logout]
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