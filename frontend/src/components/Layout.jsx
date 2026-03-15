import { Outlet, useLocation } from "react-router";
import { PublicNavigation } from "./navigation/PublicNavigation";
import { CustomerNavigation } from "./navigation/CustomerNavigation";
import { AdminNavigation } from "./navigation/AdminNavigation";
import { useAuth } from "../contexts/AuthContext";

export function Layout() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const hideNavigationPaths = [
    "/customer/profile-creation",
  ];

  const shouldHideNavigation = hideNavigationPaths.includes(location.pathname);

  const getNavigation = () => {
    if (shouldHideNavigation) {
      return null;
    }

    if (!isAuthenticated || location.pathname.startsWith("/auth") || location.pathname === "/") {
      return <PublicNavigation />;
    }

    if (user?.role === "customer" && location.pathname.startsWith("/customer")) {
      return <CustomerNavigation />;
    }

    if (user?.role === "verifier" && location.pathname.startsWith("/admin")) {
      return <AdminNavigation />;
    }

    return <PublicNavigation />;
  };

  return (
    <div className="min-h-screen bg-background">
      {getNavigation()}
      <main>
        <Outlet />
      </main>
    </div>
  );
}