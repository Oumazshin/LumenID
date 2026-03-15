import { useLocation } from "react-router";
import { Wallet, LogIn } from "lucide-react";
import { BaseNavigation } from "./BaseNavigation";

export function PublicNavigation() {
  const location = useLocation();

  // Navigation is hidden on landing and auth pages
  if (location.pathname === "/") return null;
  if (location.pathname.startsWith("/auth")) return null;

  const rightContent = (
    <button
      onClick={() => window.location.href = "/auth/role-selection"}
className="h-10 px-4 rounded-lg touch-target bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white border-0 shadow-lg transition-all duration-200"
      aria-label="Sign in to LumenID"
    >
      <span className="flex items-center gap-2">
        <LogIn className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Sign In</span>
      </span>
    </button>
  );

  return (
    <BaseNavigation
      logo={{
        to: "/",
        icon: Wallet,
        iconGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        text: "LumenID",
        textGradient: "from-cyan-400 via-purple-400 to-pink-400",
        ariaLabel: "LumenID - Go to Home"
      }}
      rightContent={rightContent}
    />
  );
}