import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  IssuerIcon,
  BlockchainAnchorIcon,
  ZKProofIcon,
  TrustTriangle,
} from "./icons/LumenIcons";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { twTransitions } from "../styles/animations";
import { motion } from "framer-motion";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: IssuerIcon,
      title: "W3C-Compliant",
      description: "Industry-standard verifiable credentials",
      color: "from-violet-500 to-fuchsia-500",
      glow: "shadow-violet-500/20",
    },
    {
      icon: BlockchainAnchorIcon,
      title: "Polygon Network",
      description: "Secure blockchain infrastructure",
      color: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/20",
    },
    {
      icon: ZKProofIcon,
      title: "Zero-Knowledge Proofs",
      description: "Privacy-preserving verification",
      color: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/20",
    },
  ];

  return (
    <div className="flex items-center justify-center py-8 md:py-16">
      <div className="max-w-4xl w-full mx-auto text-center flex flex-col gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl mt-8">
            LumenID
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-foreground tracking-tight max-w-2xl mx-auto">
            Blockchain-Based Digital Credential Management
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
            Powered by Decentralized Identifiers (DIDs), On-Chain Revocation Registry, and Multi-Sig Authorization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-3xl bg-card/40 backdrop-blur-2xl border border-border/40 ${twTransitions.cardHover} group relative overflow-hidden`}
              >
                {/* Subtle background glow on card hover */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] blur-2xl transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg ${feature.glow} group-hover:scale-110 group-hover:rotate-3 ${twTransitions.base}`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground/90">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground/90">{feature.description}</p>
                
                {/* Decorative bottom line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${feature.color} group-hover:w-1/3 transition-all duration-500 opacity-50`} />
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-center mt-4 relative px-4">
          {/* Subtle background glow for the whole diagram */}
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-bold text-foreground/80 tracking-[0.2em] uppercase">
              Decentralized Trust Architecture
            </span>
          </div>
          
          <TrustTriangle size="md" className="w-full max-w-4xl" />
          
          <p className="mt-6 text-sm text-muted-foreground/60 max-w-md mx-auto italic">
            A secure ecosystem where identity is sovereign and verification is instant.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-2 -mt-4">
          <Button
            size="lg"
            onClick={() => navigate("/auth/role-selection")}
            className={`
              relative group overflow-hidden
              bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 
              hover:opacity-100 text-white border-0 
              shadow-[0_0_20px_rgba(6,182,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
              px-10 py-7 text-xl font-bold rounded-2xl
              ${twTransitions.buttonHover}
            `}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        <div className="w-full flex justify-center pt-12 border-t border-border/50">
          <div className="flex flex-col items-center w-full">
            <p className="text-xs font-bold text-muted-foreground mb-8 text-center tracking-[0.2em] uppercase opacity-70">
              Quick Access Portals
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl px-4">
              {[
                { 
                  label: "Customer Login", 
                  path: "/auth/customer/login", 
                  icon: LogIn,
                  bg: "hover:bg-cyan-500/10",
                  border: "hover:border-cyan-500/30",
                  text: "text-cyan-400"
                },
                { 
                  label: "Verifier Login", 
                  path: "/auth/verifier/login", 
                  icon: ShieldCheck,
                  bg: "hover:bg-emerald-500/10",
                  border: "hover:border-emerald-500/30",
                  text: "text-emerald-400"
                },
                { 
                  label: "Create Account", 
                  path: "/auth/customer/signup", 
                  icon: UserPlus,
                  bg: "hover:bg-violet-500/10",
                  border: "hover:border-violet-500/30",
                  text: "text-violet-400"
                }
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 ${item.border} ${item.bg} ${twTransitions.base} group ${twTransitions.buttonHover}`}
                >
                  <div className={`p-3 rounded-xl bg-background/50 border border-border/50 group-hover:scale-110 ${twTransitions.base}`}>
                    <item.icon className={`w-5 h-5 ${item.text}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
