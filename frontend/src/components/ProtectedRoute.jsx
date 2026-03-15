import * as React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requireAuth = true 
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to="/auth/role-selection" 
        replace 
        state={{ from: location.pathname, message: "Please sign in to access this page" }} 
      />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    if (isAuthenticated) {
      return <Navigate to="/access-denied" replace />;
    }
    
    return (
      <Navigate 
        to="/auth/role-selection" 
        replace 
        state={{ from: location.pathname, message: "Please sign in with appropriate credentials" }} 
      />
    );
  }

  return <>{children}</>;
}