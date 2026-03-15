import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Activity,
  ArrowRight
} from "lucide-react";
import { PageTransition, StaggerContainer, StaggerItem } from "../PageTransition";
import {
  IssuerIcon,
  VerifierIcon,
  MintCredentialIcon,
} from "../icons/LumenIcons";

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      icon: MintCredentialIcon,
      label: "Credentials Issued",
      value: "2,847",
      change: "+12%",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: CheckCircle2,
      label: "Verifications Today",
      value: "1,394",
      change: "+8%",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      label: "Pending Reviews",
      value: "23",
      change: "-5%",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: Users,
      label: "Active Users",
      value: "15,429",
      change: "+18%",
      gradient: "from-cyan-500 to-blue-500"
    },
  ];

  const quickActions = [
    {
      title: "Issuers Terminal",
      description: "Create and manage digital credentials",
      icon: IssuerIcon,
      path: "/admin/issuer",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      features: [
        "W3C-Compliant Credential Minting",
        "Multi-Signature Authorization",
        "Bulk Issuance Management",
        "DID Document Control"
      ],
      stats: { pending: 5, completed: 142 }
    },
    {
      title: "Verification Portal",
      description: "Review and verify credential submissions",
      icon: VerifierIcon,
      path: "/admin/verifier",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      features: [
        "Zero-Trust Verification Engine",
        "Real-Time Status Checking",
        "Cryptographic Validation",
        "DID Resolution & Analysis"
      ],
      stats: { pending: 23, completed: 1394 }
    }
  ];

  return (
    <PageTransition>
      <div className="page-shell">
        <div className="page-container flex flex-col gap-8">
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage credential issuance and verification operations
            </p>
          </div>

          <StaggerContainer>
            <div className="grid md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <StaggerItem key={stat.label}>
                    <Card className="border hover:border-primary/30 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${stat.change.startsWith('+') ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}`}
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-3xl font-bold mb-1">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>

          <div className="grid md:grid-cols-2 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={action.path}
                  className="border hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${action.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <CardHeader className="relative z-10 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-2xl mb-1">{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                        <p className="text-2xl font-bold text-yellow-400">{action.stats.pending}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                        <p className="text-2xl font-bold text-green-400">{action.stats.completed}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Key Features</h4>
                      <ul className="space-y-2">
                        {action.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-start gap-2 text-muted-foreground">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${action.gradient} flex-shrink-0 mt-2`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => navigate(action.path)}
                      className={`w-full bg-gradient-to-r ${action.gradient} hover:opacity-90 text-white border-0 shadow-lg group/btn`}
                    >
                      Open Portal
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">System Status: Operational</h3>
                    <p className="text-sm text-muted-foreground">
                      All systems running normally • Network uptime: 99.8%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
