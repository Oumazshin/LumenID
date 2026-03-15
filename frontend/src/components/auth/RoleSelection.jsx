import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { HolderIcon, VerifierIcon, IssuerIcon } from "../icons/LumenIcons";
import { twTransitions } from "../../styles/animations";

export function RoleSelection() {
  const navigate = useNavigate();

  // Handle going back - always go to home
  const handleGoBack = () => {
    navigate("/");
  };

  const roles = [
    {
      type: "customer",
      title: "General Customer",
      description: "Students, Alumni, and Credential Holders",
      icon: HolderIcon,
      path: "/auth/customer/signup",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      iconBg: "from-cyan-500 to-blue-500",
      features: [
        "Create your digital identity profile",
        "Store verifiable credentials securely",
        "Share selective data with employers",
        "Control access to your information"
      ]
    },
    {
      type: "verifier",
      title: "Authorized Verifier",
      description: "Employers, Institutions, and Organizations",
      icon: VerifierIcon,
      path: "/auth/verifier/login",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      iconBg: "from-emerald-500 to-teal-500",
      features: [
        "Verify candidate credentials instantly",
        "Check cryptographic proofs",
        "Ensure data hasn't been tampered with",
        "Request specific credential information"
      ]
    }
  ];

  return (
    <div className="flex items-center justify-center py-8 md:py-16 relative">
      {/* Back Button */}
      <Button 
        onClick={handleGoBack}
        variant="outline" 
        className={`absolute top-4 left-4 sm:top-8 sm:left-8 text-muted-foreground hover:text-foreground border-border/50 bg-background/50 backdrop-blur-xl ${twTransitions.buttonHover}`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="w-full max-w-5xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select how you want to use LumenID. Your experience will be tailored to your specific needs and responsibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            const roleStyles = {
              customer: {
                hoverBorder: "hover:border-cyan-500/50",
                shadow: "shadow-cyan-500/20",
              },
              verifier: {
                hoverBorder: "hover:border-emerald-500/50",
                shadow: "shadow-emerald-500/20",
              },
            };
            const styles = roleStyles[role.type];
            return (
              <Card 
                key={role.type}
                className={`
                  border border-border/50 bg-card/60 backdrop-blur-xl relative overflow-hidden group ${styles.hoverBorder} ${twTransitions.cardHover}
                `}
              >
                {/* Background glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 blur-xl ${twTransitions.slow}`} />
                
                <CardHeader className="relative z-10 p-8">
                  <div className="flex items-center gap-5 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.iconBg} flex items-center justify-center shadow-lg ${styles.shadow} shrink-0`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-1">{role.title}</CardTitle>
                      <CardDescription className="text-base">{role.description}</CardDescription>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">What You Can Do</h4>
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.gradient} shrink-0 mt-2`} />
                          <span className="text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 p-8 pt-0">
                  <Button
                    onClick={() => navigate(role.path)}
                    className={`w-full bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white border-0 shadow-lg shadow-primary/20 h-12 text-base font-semibold group/btn ${twTransitions.buttonHover}`}
                  >
                    Continue as {role.title}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
