import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { StatusBadge } from "../../utils/badge.jsx";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Share2,
  FileText,
  ShieldCheck,
  MoreVertical,
  Download,
  Building2,
  Loader2
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { PageTransition, StaggerContainer, StaggerItem } from "../PageTransition";
import { useCredentials } from "../../hooks/useCredentials";
import { twTransitions } from "../../styles/animations";

export function CustomerDashboard() {
  const { data: credentials, isLoading, error } = useCredentials("current-user");
  const [selectedCredential, setSelectedCredential] = useState(null);

  const stats = useMemo(() => ({
    total: credentials.length,
    verified: credentials.filter(c => c.status === "active").length,
    pending: credentials.filter(c => c.status === "pending").length,
    rejected: credentials.filter(c => c.status === "revoked").length
  }), [credentials]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Loading identity vault...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-lg font-bold text-destructive">Error Loading Vault</p>
        <p className="text-sm font-medium text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-8 w-full pb-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 border border-border/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              My Identity Vault
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              Manage, share, and securely track all of your verifiable digital credentials in one place.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition-opacity text-white border-0 shadow-lg shadow-cyan-500/20 h-11 px-6 rounded-xl font-medium">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Request Credential
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            <StaggerItem>
              <Card className={`group border-border/50 bg-card/40 backdrop-blur-xl ${twTransitions.cardHover} cursor-pointer`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-foreground mb-1 tracking-tight">{stats.total}</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Total Credentials</p>
                </CardContent>
              </Card>
            </StaggerItem>
            
            <StaggerItem delay={100}>
              <Card className="border border-border/50 bg-card/60 backdrop-blur-xl hover:border-success/50 transition-all shadow-sm hover:shadow-md group rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success group-hover:scale-110 group-hover:bg-success/20 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-success mb-1 tracking-tight">{stats.verified}</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Active & Verified</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem delay={200}>
              <Card className="border border-border/50 bg-card/60 backdrop-blur-xl hover:border-warning/50 transition-all shadow-sm hover:shadow-md group rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center text-warning group-hover:scale-110 group-hover:bg-warning/20 transition-all duration-300">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-warning mb-1 tracking-tight">{stats.pending}</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Pending Review</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem delay={300}>
              <Card className="border border-border/50 bg-card/60 backdrop-blur-xl hover:border-destructive/50 transition-all shadow-sm hover:shadow-md group rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center text-destructive group-hover:scale-110 group-hover:bg-destructive/20 transition-all duration-300">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-destructive mb-1 tracking-tight">{stats.rejected}</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Revoked</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </div>
        </StaggerContainer>

        {/* Credentials List Section */}
        <Card className="border border-border/50 bg-card/40 backdrop-blur-xl shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-5 pt-8 bg-card/30">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Recent Credentials</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">View your individual digital documents below</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex mt-4 sm:mt-0 rounded-lg">
              Filter Log
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {credentials.map((credential) => (
                <div 
                  key={credential.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:px-8 hover:bg-white/5 dark:hover:bg-white-[0.02] transition-colors"
                >
                  <div className="flex items-start gap-5 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 shadow-sm border border-primary/10">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <h4 className="font-bold text-foreground text-lg mb-1">{credential.type}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap font-medium">
                        <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/> {credential.issuer}</span>
                        <span className="opacity-50">•</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Issued: {credential.issuedDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 ml-17 md:ml-0 border-t md:border-t-0 border-border/30 pt-4 md:pt-0">
                    <StatusBadge status={credential.status} />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg h-9" onClick={() => setSelectedCredential(credential)}>
                        View Details
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9 rounded-lg hidden sm:flex">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Credential Details Dialog */}
      <Dialog open={!!selectedCredential} onOpenChange={() => setSelectedCredential(null)}>
        <DialogContent className="max-w-2xl border border-white/10 bg-background/95 backdrop-blur-3xl p-0 overflow-hidden shadow-2xl rounded-3xl sm:rounded-[2rem]">
          {selectedCredential && (
            <>
              <div className="p-6 sm:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-white/5 relative">
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                   <StatusBadge status={selectedCredential.status} />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner border border-primary/20 backdrop-blur-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <DialogTitle className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-foreground">{selectedCredential.type}</DialogTitle>
                <DialogDescription className="text-base sm:text-lg">
                  Issued by <span className="font-bold text-foreground mx-1">{selectedCredential.issuer}</span> on {selectedCredential.issuedDate}
                </DialogDescription>
              </div>
              
              <div className="p-6 sm:p-10 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">Verified Claims</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(selectedCredential.claims || {}).map(([key, value]) => (
                      <div key={key} className="p-5 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-foreground text-sm">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCredential.hash && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">Blockchain Verification</h4>
                    <div className="p-5 rounded-2xl bg-black/20 border border-white/5 flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Transaction Hash</p>
                      <p className="font-mono text-sm break-all text-primary/90 bg-black/20 p-3 rounded-lg border border-white/5">{selectedCredential.hash}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-black/20 p-5 sm:px-10 border-t border-white/5 flex flex-col-reverse sm:flex-row justify-end gap-3 backdrop-blur-xl">
                <Button 
                  className={`w-full bg-primary text-primary-foreground h-12 text-base font-semibold ${twTransitions.buttonHover}`}
                  onClick={() => setSelectedCredential(null)}
                >
                  Done
                </Button>
                <Button variant="outline" className="sm:w-auto w-full group rounded-xl h-11 border-white/10 hover:bg-white/5">
                  <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                  Download
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 sm:w-auto w-full text-white shadow-lg shadow-primary/20 rounded-xl h-11 px-8 font-semibold">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Proof
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
