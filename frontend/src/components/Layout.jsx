import { Outlet, useLocation } from "react-router";
import { SidebarNavigation } from "./navigation/SidebarNavigation";
import { useAuth } from "../contexts/AuthContext";

export function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isCustomerRoute = location.pathname.startsWith("/customer");
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Keep navigation hidden on profile creation step or auth paths
  const shouldRenderSidebar = isAuthenticated && (isCustomerRoute || isAdminRoute) && location.pathname !== "/customer/profile-creation";

  if (shouldRenderSidebar) {
    return (
      <div className="min-h-screen bg-background flex flex-col lg:flex-row w-full overflow-hidden">
        <SidebarNavigation />
        <main className="flex-1 lg:h-screen lg:overflow-y-auto page-shell pt-20 lg:pt-8 custom-scrollbar">
          <div className="page-container w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  // Public/Auth routes get no navigation at all, just content
  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="page-shell">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}