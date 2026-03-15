import { useLocation, useNavigate } from "react-router";
import { Vault, UserCircle, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { BaseNavigation, NavButton, MobileNavButton } from "./BaseNavigation";
import { logoutHandler } from "../../utils/auth";

export function CustomerNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logoutHandler(logout, navigate);
  };

  const isOnDashboard = location.pathname === "/customer/dashboard";
  const isOnVault = location.pathname === "/customer/vault";
  const isOnProfile = location.pathname === "/customer/profile";

  const leftContent = (
    <>
      <NavButton
        onClick={() => navigate("/customer/dashboard")}
        icon={LayoutDashboard}
        label="Dashboard"
        isActive={isOnDashboard}
      />
      <NavButton
        onClick={() => navigate("/customer/vault")}
        icon={Vault}
        label="My Vault"
        isActive={isOnVault}
      />
      <NavButton
        onClick={() => navigate("/customer/profile")}
        icon={UserCircle}
        label="Profile"
        isActive={isOnProfile}
      />
    </>
  );

  const rightContent = (
    <>
      <div className="flex md:hidden items-center gap-2">
        <MobileNavButton
          onClick={() => navigate("/customer/dashboard")}
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={isOnDashboard}
        />
        <MobileNavButton
          onClick={() => navigate("/customer/vault")}
          icon={Vault}
          label="My Vault"
          isActive={isOnVault}
        />
        <MobileNavButton
          onClick={() => navigate("/customer/profile")}
          icon={UserCircle}
          label="Profile"
          isActive={isOnProfile}
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
        to: "/customer/dashboard",
        icon: Vault,
        iconGradient: "from-cyan-500 via-blue-500 to-indigo-500",
        text: "LumenID",
        textGradient: "from-cyan-400 via-blue-400 to-indigo-400",
        ariaLabel: "LumenID Customer Portal - Go to Dashboard"
      }}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
}