import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Activity,
  ArrowRight,
  Shield,
  FileCheck,
  Building2,
  Settings,
  MoreVertical
} from "lucide-react";
import { PageTransition, StaggerContainer, StaggerItem } from "../PageTransition";
import {
  IssuerIcon,
  VerifierIcon,
  MintCredentialIcon,
} from "../icons/LumenIcons";
import { twTransitions } from "../../styles/animations";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import adminService from "../../api/adminService";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap = {
    MintCredentialIcon,
    CheckCircle2,
    Clock,
    Users
  };

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getStats();
        // Map icon components if they come as strings from API
        const mappedStats = data.map(stat => ({
          ...stat,
          icon: iconMap[stat.iconName] || stat.icon || Activity
        }));
        setStats(mappedStats);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = useMemo(() => [
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
  ], []);

  return (
    <PageTransition>
      <div className="flex flex-col gap-12 w-full pb-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-card/40 border border-border/50 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Admin Command Center
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              Monitor network activity, manage organizational issuers, and oversee verification operations across the system.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity text-white border-0 shadow-lg shadow-emerald-500/20 h-11 px-6 rounded-xl font-medium">
              <Settings className="w-5 h-5 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-card/20 animate-pulse border border-border/30" />
              ))
            ) : (
              stats.map((stat, i) => {
                const Icon = stat.icon;
                const isPositive = stat.change.startsWith('+');
                return (
                  <StaggerItem key={stat.label} delay={i * 100}>
                    <Card className="border border-border/50 bg-card/60 backdrop-blur-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md group rounded-2xl overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 ${stat.bgClass} rounded-xl flex items-center justify-center ${stat.textClass} group-hover:scale-110 ${twTransitions.base}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`rounded-lg px-2.5 py-0.5 text-xs font-semibold ${isPositive ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}`}
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <p className="text-4xl font-black text-foreground mb-1 tracking-tight">{stat.value}</p>
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })
            )}
          </div>
        </StaggerContainer>

        {/* Portals / Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.title} 
                className={`overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl group cursor-pointer ${twTransitions.cardHover}`}
                onClick={() => navigate(action.path)}
              >
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${action.gradient} rounded-full blur-[100px] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2`} />
                
                <CardHeader className="p-8 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-2">
                    <div className="flex items-start gap-5">
                      <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 ${twTransitions.slow}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 mt-1">
                        <CardTitle className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-foreground">{action.title}</CardTitle>
                        <CardDescription className="text-base font-medium">{action.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-border/30 backdrop-blur-sm transition-colors">
                      <p className="text-3xl font-black text-yellow-500 mb-1">{action.stats.pending}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pending Action</p>
                    </div>
                    <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-border/30 backdrop-blur-sm transition-colors">
                      <p className="text-3xl font-black text-emerald-500 mb-1">{action.stats.completed}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Completed</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase mb-4">Portal Capabilities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {action.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-3 rounded-xl bg-accent/20 border border-border/30">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${action.gradient} flex-shrink-0 mt-2`} />
                          <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate(action.path)}
                    className={`w-full bg-gradient-to-r ${action.gradient} hover:opacity-90 transition-opacity text-white border-0 shadow-lg h-14 rounded-xl text-lg font-semibold group/btn`}
                  >
                    Launch {action.title.split(' ')[0]}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Status Banner */}
        <div className="flex items-center gap-5 p-6 rounded-3xl bg-green-500/10 border border-green-500/20 backdrop-blur-md">
           <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-green-500/20">
             <Activity className="w-6 h-6 text-white" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-green-500 mb-1">System Operational</h3>
             <p className="text-sm font-medium text-green-500/80">
               All nodes active • Network uptime: 99.8% • Sync status: Perfect
             </p>
           </div>
        </div>
      </div>
    </PageTransition>
  );
}
