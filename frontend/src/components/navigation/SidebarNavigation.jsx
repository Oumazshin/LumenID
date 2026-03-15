import { useLocation, useNavigate, Link } from "react-router";
import { 
  Vault, 
  UserCircle, 
  LogOut, 
  LayoutDashboard,
  Shield,
  Building2,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { twTransitions, modalVariants } from "../../styles/animations";

export function SidebarNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/role-selection");
  };

  const isCustomer = user?.role === "customer";
  const isVerifier = user?.role === "verifier";

  // Define Links based on role
  const customerLinks = [
    { name: "Dashboard", path: "/customer/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/customer/profile", icon: UserCircle },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Issuer", path: "/admin/issuer", icon: Building2 },
    { name: "Verifier", path: "/admin/verifier", icon: ShieldCheck },
  ];

  const links = isCustomer ? customerLinks : isVerifier ? adminLinks : [];
  const LogoIcon = isCustomer ? Vault : Shield;
  const logoText = isCustomer ? "LumenID" : "LumenAdmin";
  const logoGradient = isCustomer ? "from-cyan-400 via-blue-400 to-indigo-400" : "from-emerald-400 via-teal-400 to-cyan-400";
  const iconGradient = isCustomer ? "from-cyan-500 via-blue-500 to-indigo-500" : "from-emerald-500 via-teal-500 to-cyan-500";
  const dashPath = isCustomer ? "/customer/dashboard" : "/admin/dashboard";

  const renderNavLinks = () => (
    <div className="flex flex-col gap-2 mt-8">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        const Icon = link.icon;
        
        return (
          <button
            key={link.path}
            onClick={() => {
              navigate(link.path);
              setIsMobileOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${twTransitions.base} ${
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground border border-transparent"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{link.name}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconGradient} flex items-center justify-center`}>
            <LogoIcon className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold text-lg bg-gradient-to-r ${logoGradient} bg-clip-text text-transparent`}>
            {logoText}
          </span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-2xl z-40 p-4 border-t border-border/50 flex flex-col"
          >
            <div className="flex-1">
              {renderNavLinks()}
            </div>
            <div className="pb-8">
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/20 transition-all ${twTransitions.buttonHover}`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 h-screen flex-col border-r border-border/50 bg-card/30 backdrop-blur-xl p-6 sticky top-0">
        {/* Logo */}
        <Link to={dashPath} className="flex items-center gap-3 group px-2 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          <span className={`font-bold text-xl bg-gradient-to-r ${logoGradient} bg-clip-text text-transparent tracking-tight`}>
            {logoText}
          </span>
        </Link>

        {/* Links */}
        <div className="flex-1">
          {renderNavLinks()}
        </div>

        {/* Footer / Logout */}
        <div className="pt-6 border-t border-border/50 mt-auto">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 ${twTransitions.base}`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
