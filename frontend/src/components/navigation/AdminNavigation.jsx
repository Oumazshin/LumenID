import { useLocation, useNavigate } from "react-router";
import { Shield, Building2, ShieldCheck, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { BaseNavigation, NavButton, MobileNavButton } from "./BaseNavigation";
import { logoutHandler } from "../../utils/auth";

export function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logoutHandler(logout, navigate);
  };

  const isOnDashboard = location.pathname === "/admin/dashboard";
  const isOnIssuer = location.pathname === "/admin/issuer";
  const isOnVerifier = location.pathname === "/admin/verifier";

  const leftContent = (
    <>
      <NavButton
        onClick={() => navigate("/admin/dashboard")}
        icon={LayoutDashboard}
        label="Dashboard"
        isActive={isOnDashboard}
      />
      <NavButton
        onClick={() => navigate("/admin/issuer")}
        icon={Building2}
        label="Issuer"
        isActive={isOnIssuer}
      />
      <NavButton
        onClick={() => navigate("/admin/verifier")}
        icon={ShieldCheck}
        label="Verifier"
        isActive={isOnVerifier}
      />
    </>
  );

  const rightContent = (
    <>
      <div className="flex md:hidden items-center gap-2">
        <MobileNavButton
          onClick={() => navigate("/admin/dashboard")}
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={isOnDashboard}
        />
        <MobileNavButton
          onClick={() => navigate("/admin/issuer")}
          icon={Building2}
          label="Issuer"
          isActive={isOnIssuer}
        />
        <MobileNavButton
          onClick={() => navigate("/admin/verifier")}
          icon={ShieldCheck}
          label="Verifier"
          isActive={isOnVerifier}
        />
      </div>

      <button
        onClick={handleLogout}
        className="h-10 px-4 rounded-lg touch-target border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50 transition-all duration-200"
        aria-label="Logout"
      >
        <span className="flex items-center gap-2">
          <LogOut className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Logout</span>
        </span>
      </button>
    </>
  );

  return (
    <BaseNavigation
      logo={{
        to: "/admin/dashboard",
        icon: Shield,
        iconGradient: "from-emerald-500 via-teal-500 to-cyan-500",
        text: "LumenID Admin",
        textGradient: "from-emerald-400 via-teal-400 to-cyan-400",
        ariaLabel: "LumenID Admin Portal - Go to Dashboard"
      }}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
}