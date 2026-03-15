import * as React from "react";

// Context initialization without TypeScript generics
const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize auth state from sessionStorage on mount
  React.useEffect(() => {
    const initAuth = () => {
      try {
        const storedAuth = sessionStorage.getItem("auth");
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth.user);
        }
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        sessionStorage.removeItem("auth");
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

  const login = React.useCallback(
    async (email, password, role) => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock authentication
        const mockUser = {
          id: `user-${Date.now()}`,
          email,
          role,
          name: email.split("@")[0],
        };

        setUser(mockUser);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = React.useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("auth");
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