import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  IssuerIcon,
  BlockchainAnchorIcon,
  ZKProofIcon,
  TrustTriangle,
} from "./icons/LumenIcons";

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
      <div className="max-w-4xl w-full mx-auto text-center flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mt-8">
            LumenID
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Blockchain-Based Digital Credential Management
          </p>
          <p className="text-base text-muted-foreground/80 max-w-xl mx-auto">
            Powered by Decentralized Identifiers (DIDs), On-Chain Revocation Registry, and Multi-Sig Authorization
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg ${feature.glow}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center mt-6">
          <p className="text-xs font-semibold text-muted-foreground mb-6 text-center tracking-widest uppercase">
            The Trust Triangle
          </p>
          <TrustTriangle size="md" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/auth/role-selection")}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0 shadow-lg shadow-cyan-500/20 px-8 py-6 text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="w-full flex justify-center pt-12 border-t border-border">
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-muted-foreground mb-6 text-center tracking-wide uppercase">Quick Access</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-base w-full max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={() => navigate("/auth/customer/login")}
                className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10"
              >
                Customer Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auth/verifier/login")}
                className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10"
              >
                Verifier Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auth/customer/signup")}
                className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10 sm:col-span-2"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
